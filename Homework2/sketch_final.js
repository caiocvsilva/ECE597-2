#!/usr/bin/env node
var b = require('bonescript');
//Variables
var mSize = 20;
var panel = new Array(mSize);
var curr_row = 0;
var curr_col = 0;
var rows, cols;

//Setup the buttons
var up = 'P9_23';
b.pinMode(up, b.INPUT, 7, 'pulldown');
b.attachInterrupt(up, true, b.CHANGE, sketchUp);
var down = 'P9_24';
b.pinMode(down, b.INPUT, 7, 'pulldown');
b.attachInterrupt(down, true, b.CHANGE, sketchDown);
var left = 'P9_27';
b.pinMode(left, b.INPUT, 7, 'pulldown');
b.attachInterrupt(left, true, b.CHANGE, sketchLeft);
var right = 'P9_30';
b.pinMode(right, b.INPUT, 7, 'pulldown');
b.attachInterrupt(right, true, b.CHANGE, sketchRight);
var clear = 'P9_21';
b.pinMode(clear, b.INPUT, 7, 'pulldown');
b.attachInterrupt(clear, true, b.CHANGE, clearSketch);

// Create the Matrix
for(rows = 0; rows < mSize; rows++){
	panel[rows] = new Array(mSize);
}

// //Initialize the Matrix

clearSketch(1);
	
// Print the Matrix
updateView();

function updateView(){
for (rows = 0; rows < mSize; rows++){
	console.log(panel[rows].toString());
}
console.log('\n');
}

// Draw X Function
function sketchUp(w){
	if(w.value===1){
			if(curr_row<=0){
				curr_row = 0;
				panel[curr_row][curr_col] = 'x';
			}else{
				curr_row--;
				panel[curr_row][curr_col] = 'x';
			}
		updateView();
	}
}

function sketchLeft(a){
	if(a.value===1){
			if(curr_col<=0){
				curr_col = 0;
				panel[curr_row][curr_col] = 'x';
			}else{
				curr_col--;
				panel[curr_row][curr_col] = 'x';
			}
		updateView();
	}
}

// Sketch Down Function
function sketchDown(s){
	if(s.value===1){
			if(curr_row>=mSize-1){
				curr_row = mSize-1;
				panel[curr_row][curr_col] = 'x';
			}else{
				curr_row++;
				panel[curr_row][curr_col] = 'x';
			}
		updateView();
	}
}

function sketchRight(d){
	if(d.value===1){
			if(curr_col>=mSize-1){
				curr_col = mSize-1;
				panel[curr_row][curr_col] = 'x';
			}else{
				curr_col++;
				panel[curr_row][curr_col] = 'x';
			}
		updateView();
	}
}

//Clear the Matrix Function
function clearSketch(c){
	if(c.value===1){
		for(rows=0;rows<mSize;rows++){
	        for(cols=0;cols<mSize;cols++){
	        	panel[rows][cols] = ' '; // use o for testing
	        }
        }
		updateView();
	}
}


