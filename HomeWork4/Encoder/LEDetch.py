#import time
import Image
import ImageDraw
import Adafruit_BBIO.GPIO as GPIO

from subprocess import call
from Adafruit_LED_Backpack import Matrix8x8

# Sets up the encoders
call(["./encoderSetup.sh"])

# Creates display instance and initializes it
display = Matrix8x8.Matrix8x8(address=0x70, busnum=1)
#display = Matrix8x8.Matrix8x8()
display.begin()

# Initializing etch-a-sketch variables
matrix_size=8
curr_row = 0
curr_col = 0
first_stroke = 0 
read_ant1 = 0
read_ant2 = 0

# Clearing the LED matrix to begin:
display.clear()

while True:
	
	eqp1 = open('/sys/devices/ocp.3/48302000.epwmss/48302180.eqep/position','r')
	eqp2 = open('/sys/devices/ocp.3/48304000.epwmss/48304180.eqep/position','r')

	encoder_read1 = int(eqp1.read())/4
	encoder_read2 = int(eqp2.read())/4

	if encoder_read1 < read_ant1:
		if curr_row <= 0:
			curr_row = 0
		else:
			curr_row = curr_row - 1
		first_stroke = 1

	if encoder_read1 > read_ant1:
		if curr_row >= matrix_size-1:
			curr_row = matrix_size-1
		else:
			curr_row = curr_row + 1
		first_stroke = 1

	if encoder_read2 < read_ant2:
		if curr_col <= 0:
			curr_col = 0
		else:
			curr_col = curr_col - 1
		first_stroke = 1

	if encoder_read2 > read_ant2:
		if curr_col >= matrix_size-1:
			curr_col = matrix_size-1
		else:
			curr_col = curr_col + 1
		first_stroke = 1

	if first_stroke != 0:
		disp_row = curr_row
		disp_row = disp_row + 1

		if disp_row >= matrix_size:
			disp_row = 0

		display.set_pixel(disp_row, curr_col, 1)

	display.write_display()

	read_ant1 = encoder_read1
	read_ant2 = encoder_read2

