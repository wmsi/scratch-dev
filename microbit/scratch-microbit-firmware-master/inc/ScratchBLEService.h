#ifndef SCRATCH_BLE_SERVICE_H
#define SCRATCH_BLE_SERVICE_H

#include "MicroBit.h"
#include "MicroBitConfig.h"
#include "ble/BLE.h"
#include "EventModel.h"
#include "MicroBitDisplay.h"
#include "MicroBitAccelerometer.h"

// Default speed for printing text
#define MICROBIT_BLE_MAXIMUM_SCROLLTEXT 20

// Low-pass filter coefficient for accelerometer
#define ACCEL_FILTER_ALPHA 0.3

//Command Definitions
#define CMD_PIN_CONFIG   0x80
#define CMD_DISPLAY_TEXT 0x81
#define CMD_DISPLAY_LED  0x82

//Pin Modes
#define PIN_MODE_OUTPUT 1
#define PIN_MODE_INPUT  2
#define PIN_MODE_SERVO  3

// UUID for the Scratch service
extern const uint16_t ScratchBLEServiceUUID;

// UUIDs for display characteristics
extern const uint8_t ScratchTxCharUUID[];
extern const uint8_t ScratchRxCharUUID[];

/**
 * Class definition for the Scratch BLE Service
 *
 * Provides a BLE service for accessing various features of the micro:bit from
 * Scratch visual programming language.
 */
class ScratchBLEService
{
  private:

  MicroBit &uBit;
  BLEDevice &ble;
  MicroBitDisplay &display;
  MicroBitAccelerometer &accelerometer;
  MicroBitThermometer &thermometer;

  uint8_t txCharBuffer[20];
  uint8_t rxCharBuffer[20];

  GattAttribute::Handle_t txCharHandle;
  GattAttribute::Handle_t rxCharHandle;

  int16_t accelX;
  int16_t accelY;
  int32_t accelMag;
  int32_t accelMagD;

  int16_t surfaceTemp;

  uint8_t buttonAState;
  uint8_t buttonBState;
  uint8_t pinStates[3];
  uint8_t ioPinStates[3];

  uint8_t gestureStates;
  uint64_t gestureTimeout[3];

  /**
   * Accelerometer callback
   */
  void accelerometerUpdate(MicroBitEvent);

  /**
   * Thermometer callback
   */
  void thermometerUpdate(MicroBitEvent);

  void checkGestureTimeouts(void);

  /**
   * Shake gesture function
   */
  void moveDetected(void);

  /**
   * Shake gesture callback
   */
  void shakeDetected(MicroBitEvent);

  /**
   * Jump (freefall)  gesture callback
   */
  void jumpDetected(MicroBitEvent);

  /**
   * Button A callback
   */
  void buttonAUpdate(MicroBitEvent e);

  /**
   * Button B callback
   */
  void buttonBUpdate(MicroBitEvent e);

  /**
   * Called when a pin edge connector changes state
   */
  void pinUpdate(uint8_t pin, uint8_t state);

  /**
   * Pin 0 callback
   */
  void p0Update(MicroBitEvent e);

  /**
   * Pin 1 callback
   */
  void p1Update(MicroBitEvent e);

  /**
   * Pin 2 callback
   */
  void p2Update(MicroBitEvent e);

  public:

  /**
   * Class definition for the Scratch BLE Service
   *
   * Facilitates the communication between the micro:bit and Scratch
   */
  ScratchBLEService(MicroBit &_uBit);

  /**
   * Used to write updates to the BLE characteristics and notify changes
   */
  void postUpdate();

  void onDataWritten(const GattWriteCallbackParams *params);

  //void onDataRead(GattReadAuthCallbackParams *params);
};

#endif
