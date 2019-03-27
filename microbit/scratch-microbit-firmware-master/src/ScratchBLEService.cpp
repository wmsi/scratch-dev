#include "MicroBitConfig.h"
#include "ble/UUID.h"
#include "MicroBitSerial.h"

#include "ScratchBLEService.h"

ScratchBLEService::ScratchBLEService(MicroBit &_uBit) :
          uBit(_uBit), ble(*uBit.ble), display(uBit.display), accelerometer(uBit.accelerometer), thermometer(uBit.thermometer)
{
  GattCharacteristic txChar(ScratchTxCharUUID, (uint8_t *)txCharBuffer, 0, 20,
      GattCharacteristic::BLE_GATT_CHAR_PROPERTIES_READ | GattCharacteristic::BLE_GATT_CHAR_PROPERTIES_NOTIFY);
  GattCharacteristic rxChar(ScratchRxCharUUID, (uint8_t *)rxCharBuffer, 0, 20,
      GattCharacteristic::BLE_GATT_CHAR_PROPERTIES_WRITE);

  // Initialize the buffers
  for (uint8_t i=0; i<20; i++) {
    txCharBuffer[i] = 0;
    rxCharBuffer[i] = 0;
  }

  memclr(ioPinStates, sizeof(ioPinStates));

  buttonAState = 0;
  buttonBState = 0;
  for (uint8_t i=0; i<3; i++)
    pinStates[i] = 0;

  gestureStates = 0;
  memclr(gestureTimeout, sizeof(gestureTimeout));

  uBit.io.P0.isTouched();
  uBit.io.P1.isTouched();
  uBit.io.P2.isTouched();

  //ledMatrixChar.setReadAuthorizationCallback(this, &ScratchBLEService::onDataRead);

  GattCharacteristic *characteristics[] = {&txChar, &rxChar};
  GattService service(ScratchBLEServiceUUID, characteristics, sizeof(characteristics) / sizeof(GattCharacteristic *));

  ble.addService(service);

  const uint16_t uuidAdvertisingList[] = {ScratchBLEServiceUUID};
  ble.accumulateAdvertisingPayload(GapAdvertisingData::COMPLETE_LIST_16BIT_SERVICE_IDS,
      (uint8_t *) uuidAdvertisingList, sizeof(uuidAdvertisingList));


  txCharHandle = txChar.getValueHandle();
  rxCharHandle = rxChar.getValueHandle();

  ble.onDataWritten(this, &ScratchBLEService::onDataWritten);

  accelerometer.setPeriod(10);
  thermometer.setPeriod(10);

  if (EventModel::defaultEventBus) {
    EventModel::defaultEventBus->listen(MICROBIT_ID_ACCELEROMETER, MICROBIT_ACCELEROMETER_EVT_DATA_UPDATE,
        this, &ScratchBLEService::accelerometerUpdate, MESSAGE_BUS_LISTENER_IMMEDIATE);
    EventModel::defaultEventBus->listen(MICROBIT_ID_GESTURE, MICROBIT_ACCELEROMETER_EVT_3G,
        this, &ScratchBLEService::shakeDetected, MESSAGE_BUS_LISTENER_IMMEDIATE);
    EventModel::defaultEventBus->listen(MICROBIT_ID_GESTURE, MICROBIT_ACCELEROMETER_EVT_FREEFALL,
        this, &ScratchBLEService::jumpDetected, MESSAGE_BUS_LISTENER_IMMEDIATE);
    EventModel::defaultEventBus->listen(MICROBIT_ID_BUTTON_A, MICROBIT_EVT_ANY,
        this, &ScratchBLEService::buttonAUpdate, MESSAGE_BUS_LISTENER_IMMEDIATE);
    EventModel::defaultEventBus->listen(MICROBIT_ID_BUTTON_B, MICROBIT_EVT_ANY,
        this, &ScratchBLEService::buttonBUpdate, MESSAGE_BUS_LISTENER_IMMEDIATE);
    EventModel::defaultEventBus->listen(MICROBIT_ID_IO_P0, MICROBIT_EVT_ANY,
        this, &ScratchBLEService::p0Update, MESSAGE_BUS_LISTENER_IMMEDIATE);
    EventModel::defaultEventBus->listen(MICROBIT_ID_IO_P1, MICROBIT_EVT_ANY,
        this, &ScratchBLEService::p1Update, MESSAGE_BUS_LISTENER_IMMEDIATE);
    EventModel::defaultEventBus->listen(MICROBIT_ID_IO_P2, MICROBIT_EVT_ANY,
        this, &ScratchBLEService::p2Update, MESSAGE_BUS_LISTENER_IMMEDIATE);
    EventModel::defaultEventBus->listen(MICROBIT_ID_THERMOMETER, MICROBIT_THERMOMETER_EVT_UPDATE,
        this, &ScratchBLEService::thermometerUpdate, MESSAGE_BUS_LISTENER_IMMEDIATE);
  }
}

void ScratchBLEService::postUpdate()
{
  uint8_t i;

  txCharBuffer[0] = accelX >> 8;
  txCharBuffer[1] = accelX & 0xFF;
  txCharBuffer[2] = accelY >> 8;
  txCharBuffer[3] = accelY & 0xFF;
  txCharBuffer[4] = buttonAState;
  txCharBuffer[5] = buttonBState;
  txCharBuffer[6] = pinStates[0];
  txCharBuffer[7] = pinStates[1];
  txCharBuffer[8] = pinStates[2];

  checkGestureTimeouts();
  txCharBuffer[9] = gestureStates;

  for (i=0; i<3; i++) {
    if (ioPinStates[i] == PIN_MODE_INPUT)
      txCharBuffer[10+i] = uBit.io.pin[i].getAnalogValue() * 100/1024;
  }

  txCharBuffer[13] = surfaceTemp;

  ble.gattServer().notify(txCharHandle, (uint8_t *)txCharBuffer, sizeof(txCharBuffer));
}

void ScratchBLEService::onDataWritten(const GattWriteCallbackParams *params)
{
  uint8_t *data = (uint8_t *)params->data;

  if (data[0] == CMD_PIN_CONFIG) {
    if (data[2] == PIN_MODE_OUTPUT) {
      if (data[3] <= 100 && data[3] != 0) {
        uBit.io.pin[data[1]].setAnalogValue(data[3]*(1024/100));
      } else {
        uBit.io.pin[data[1]].setDigitalValue(0);
      }
      ioPinStates[data[1]] = PIN_MODE_OUTPUT;
    } else if (data[2] == PIN_MODE_INPUT) {
      ioPinStates[data[1]] = PIN_MODE_INPUT;
    } else if (data[2] == PIN_MODE_SERVO) {
      if (data[3] <= 180 && data[3] != 0) {
        uBit.io.pin[data[1]].setServoValue(data[3]);
      } else {
        uBit.io.pin[data[1]].setServoValue(0);
      }
      ioPinStates[data[1]] = PIN_MODE_SERVO;
    }
  } else if (data[0] == CMD_DISPLAY_TEXT) {
    ManagedString s((char *)(params->data)+1, (params->len)-1);
    display.stopAnimation();
    if (s.length() > 1) {
      display.scrollAsync(s, MICROBIT_DEFAULT_SCROLL_SPEED);
    } else {
      display.print(s);
    }
  } else if(data[0] == CMD_DISPLAY_LED) {
    display.stopAnimation();
    for (uint8_t y=1; y<params->len; y++) {
      for (uint8_t x=0; x<5; x++)
        display.image.setPixelValue(x, y-1, (data[y] & (0x01 << x)) ? 255 : 0);
    }
  }
}

void ScratchBLEService::accelerometerUpdate(MicroBitEvent)
{
  int32_t x, y, z, mag;

  x = accelerometer.getX();
  y = accelerometer.getY();
  z = accelerometer.getZ();
  mag = sqrt(x*x + y*y + z*z) / 1024 * 100;

  accelX = x * ACCEL_FILTER_ALPHA + (accelX * (1.0 - ACCEL_FILTER_ALPHA));
  accelY = y * ACCEL_FILTER_ALPHA + (accelY * (1.0 - ACCEL_FILTER_ALPHA));
  accelMagD = abs(accelMag - mag);
  accelMag = mag * ACCEL_FILTER_ALPHA + (accelMag * (1.0 - ACCEL_FILTER_ALPHA));

  if (accelMagD > 15) moveDetected();
}

void ScratchBLEService::thermometerUpdate(MicroBitEvent)
{
  surfaceTemp = thermometer.getTemperature();
}

void ScratchBLEService::checkGestureTimeouts(void)
{
  uint8_t i;
  for (i=0; i<3; i++)
  {
    if ((int64_t) (system_timer_current_time() - gestureTimeout[i]) >= 0) {
      gestureTimeout[i] = 0;
      gestureStates &= ~(1 << i);
    }
  }
}

void ScratchBLEService::moveDetected(void)
{
  if (gestureTimeout[2]) return;
  gestureStates |= (1 << 2);
  gestureTimeout[2] = system_timer_current_time() + 50;
}

void ScratchBLEService::shakeDetected(MicroBitEvent)
{
  if (gestureTimeout[0]) return;
  gestureStates |= 1;
  gestureTimeout[0] = system_timer_current_time() + 250;
}

void ScratchBLEService::jumpDetected(MicroBitEvent)
{
  if (gestureTimeout[1]) return;
  gestureStates |= (1 << 1);
  gestureTimeout[1] = system_timer_current_time() + 50;
}

void ScratchBLEService::buttonAUpdate(MicroBitEvent e)
{
  if (e.value == MICROBIT_BUTTON_EVT_UP)
    buttonAState = 0;
  else if (e.value == MICROBIT_BUTTON_EVT_DOWN)
    buttonAState = 1;
  else if (e.value == MICROBIT_BUTTON_EVT_HOLD)
    buttonAState = 2;
}

void ScratchBLEService::buttonBUpdate(MicroBitEvent e)
{
  if (e.value == MICROBIT_BUTTON_EVT_UP)
    buttonBState = 0;
  else if (e.value == MICROBIT_BUTTON_EVT_DOWN)
    buttonBState = 1;
  else if (e.value == MICROBIT_BUTTON_EVT_HOLD)
    buttonBState = 2;
}

void ScratchBLEService::pinUpdate(uint8_t pin, uint8_t state)
{
  if (state == MICROBIT_BUTTON_EVT_UP)
    pinStates[pin] = 0;
  else if (state == MICROBIT_BUTTON_EVT_DOWN)
    pinStates[pin] = 1;
}

void ScratchBLEService::p0Update(MicroBitEvent e)
{
  pinUpdate(0, e.value);
}

void ScratchBLEService::p1Update(MicroBitEvent e)
{
  pinUpdate(1, e.value);
}

void ScratchBLEService::p2Update(MicroBitEvent e)
{
  pinUpdate(2, e.value);
}

/*const uint8_t ScratchBLEServiceUUID[16] = {
  0x52, 0x61, 0xda, 0x6a, 0xfa, 0x7e, 0x42, 0xab, 0x85, 0x0b, 0x7c, 0x80, 0x22, 0x00, 0x97, 0xcc
};*/

const uint16_t ScratchBLEServiceUUID = 0xF005;

const uint8_t ScratchTxCharUUID[] = {
  0x52, 0x61, 0xda, 0x01, 0xfa, 0x7e, 0x42, 0xab, 0x85, 0x0b, 0x7c, 0x80, 0x22, 0x00, 0x97, 0xcc
};

const uint8_t ScratchRxCharUUID[] = {
  0x52, 0x61, 0xda, 0x02, 0xfa, 0x7e, 0x42, 0xab, 0x85, 0x0b, 0x7c, 0x80, 0x22, 0x00, 0x97, 0xcc
};
