## micro:bit firmware BLE protocol

---

Name | UUID
-|-
Service | 0xf005
rxChar | 5261da01-fa7e-42ab-850b-7c80220097cc
txChar | 5261da02-fa7e-42ab-850b-7c80220097cc

---

### rxChar

Read/notify characteristic for sending data from micro:bit to Scratch

rxChar data is a 13 byte array

bytes | data
-|-
[0, 1] | Accelerometer 16-bit signed x-axis tilt value
[2, 3] | Accelerometer 16-bit signed y-axis tilt value
[4, 5] | Push button states
[6, 7, 8] | Pin 0, 1, 2 touch state
[9] | Gesture detection state (0 = shake, 1  = jump, 2 = move)
[10, 11, 12] | Input values for I/O pins 0, 1, 2

### txChar

Write characteristic for sending commands from Scratch to micro:bit


#### CMD_PIN_CONFIG (0x80)
Configure a pin as input, output, or servo

0x80 | pin | mode | value (optional)
-|-|-|-

**pin** - Hardware I/O pin 0, 1, or 2

**mode** - The pin mode (Input, output, or servo)
output = 1
input = 2
servo = 3

**value** (optional) - Used to set pin value in output or servo modes. Ignored for input mode

---

#### CMD_DISPLAY_TEXT (0x81)
Print up to 19 characters on the LED matrix display. ASCII character codes 32 - 126 are supported by the micro:bit font.

0x81 | char 1 | char 2 | char 3 | .... | char 19
-|-|-|-|-|-

---

#### CMD_DISPLAY_LED (0x82)

0x82 | row 1 | row 2 | row 3 | row 4 | row 5
-|-|-|-|-|-

Each row is a 5 bit integer which each bit representing an LED

The 5 bit integer is ordered across the row from left to right with the MSB being the first LED in the row and the LSB being the last LED in the row.


