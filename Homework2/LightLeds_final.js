#!/usr/bin/env node
var b = require('bonescript');

//Seting up Leds
var LED1 = 'P9_11';
b.pinMode(LED1, b.OUTPUT);
var LED2 = 'P9_13';
b.pinMode(LED2, b.OUTPUT);
var LED3 = 'P9_15';
b.pinMode(LED3, b.OUTPUT);
var LED4 = 'P9_17';
b.pinMode(LED4, b.OUTPUT);

//Seting up Buttons 
var buttonTop = 'P9_23';
b.pinMode(buttonTop, b.INPUT, 7, 'pulldown');
b.attachInterrupt(buttonTop, true, b.CHANGE, lightUp1);

var buttonDown = 'P9_24';
b.pinMode(buttonDown, b.INPUT, 7, 'pulldown');
b.attachInterrupt(buttonDown, true, b.CHANGE,lightUp2);

var buttonLeft = 'P9_27';
b.pinMode(buttonLeft, b.INPUT, 7, 'pulldown');
b.attachInterrupt(buttonLeft, true, b.CHANGE,lightUp3);

var buttonRight = 'P9_30';
b.pinMode(buttonRight, b.INPUT, 7, 'pulldown');
b.attachInterrupt(buttonRight, true, b.CHANGE,lightUp4);

//Cheking the interrupts to change turn off and on the leds
function lightUp1(w){
   	if(w.value === 1){
		b.digitalWrite(LED1,b.HIGH);
	}else{
		b.digitalWrite(LED1,b.LOW);
	}
}

function lightUp2(s){
    if(s.value === 1){
		b.digitalWrite(LED2,b.HIGH);
	}else{
		b.digitalWrite(LED2,b.LOW);
	}
}

function lightUp3(a){
    console.log("3");
    if(a.value === 1){
		b.digitalWrite(LED3,b.HIGH);
	}else{
		b.digitalWrite(LED3,b.LOW);
	}
}

function lightUp4(d){
    if(d.value === 1){
		b.digitalWrite(LED4,b.HIGH);
	}else{
		b.digitalWrite(LED4,b.LOW);
	}
}