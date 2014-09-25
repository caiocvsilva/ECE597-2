#import time
import Image
import ImageDraw
import Adafruit_BBIO.GPIO as GPIO

from Adafruit_LED_Backpack import Matrix8x8

# LED Matrix
display = Matrix8x8.Matrix8x8(address=0x70, busnum=1)
display.begin()

# Buttons
GPIO.setup("P9_21", GPIO.IN)
GPIO.setup("P9_23", GPIO.IN)
GPIO.setup("P9_24", GPIO.IN)
GPIO.setup("P9_27", GPIO.IN) 

GPIO.add_event_detect("P9_21", GPIO.FALLING)
GPIO.add_event_detect("P9_23", GPIO.FALLING)
GPIO.add_event_detect("P9_24", GPIO.FALLING)
GPIO.add_event_detect("P9_27", GPIO.FALLING)

matrixSize = 8;
curr_row = 0
curr_col = 0
paint = 0 

while True:

	if GPIO.event_detected("P9_21"):
		if curr_row <= 0:
			curr_row = 0
		else:
			curr_row = curr_row - 1
		paint = 1

	if GPIO.event_detected("P9_23"):
		if curr_row >= matrixSize-1:
			curr_row = matrixSize-1
		else:
			curr_row = curr_row + 1
		paint = 1
		

	if GPIO.event_detected("P9_24"):
		if curr_col <= 0:
			curr_col = 0
		else:
			curr_col = curr_col - 1
		paint = 1

	if GPIO.event_detected("P9_27"):
		if curr_col >= matrixSize-1:
			curr_col = matrixSize-1
		else:
			curr_col = curr_col + 1
		paint = 1

	if paint == 1:
		display.set_pixel(curr_row, curr_col, 1)
		paint = 0

	display.write_display()