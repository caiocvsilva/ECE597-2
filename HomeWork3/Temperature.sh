#!/bin/bash
echo "The temperature in C:"
echo $(( $(i2cget -y 1 0x48 0)))
echo $(($(i2cget -y 1 0x4a 0)))
echo "The temperature in F:"
echo $((($(i2cget -y 1 0x48 0))*9/5 + 32))
echo $((($(i2cget -y 1 0x4a 0))*9/5 + 32))