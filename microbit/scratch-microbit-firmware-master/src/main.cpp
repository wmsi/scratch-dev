#include "MicroBit.h"
#include "MicroBitDevice.h"
#include "MicroBitImage.h"
#include "ScratchBLEService.h"

#define UPDATE_FREQ 20

MicroBit uBit;
ScratchBLEService *scratchService;

const uint8_t checkFlash[] __attribute__ ((aligned (4))) = {
  0xff, 0xff, 5, 0, 5, 0, // Create 5x5 pixel image, stored in flash memory
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 1,
  0, 0, 0, 1, 0,
  1, 0, 1, 0, 0,
  0, 1, 0, 0, 0
};

MicroBitImage check((ImageData*)checkFlash);

bool connected;

ManagedString BIT_NAME(microbit_friendly_name());
void onConnected(MicroBitEvent)
{
  connected = true;
  uBit.display.stopAnimation();
  uBit.display.print(check);
  fiber_sleep(2000);
  uBit.display.clear();
}

void onDisconnected(MicroBitEvent)
{
  connected = false;
}

int main()
{
  uBit.init();
  uBit.messageBus.listen(MICROBIT_ID_BLE, MICROBIT_BLE_EVT_CONNECTED, onConnected);
  uBit.messageBus.listen(MICROBIT_ID_BLE, MICROBIT_BLE_EVT_DISCONNECTED, onDisconnected);

  connected = false;

  scratchService = new ScratchBLEService(uBit);

  while(1)
  {
    if (!connected) {
      uBit.display.scroll(BIT_NAME, 125);
      fiber_sleep(500);
    }
    scratchService->postUpdate();
    fiber_sleep(UPDATE_FREQ);
  }
}
