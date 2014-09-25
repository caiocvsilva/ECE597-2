#!/usr/bin/env node
var b = require('bonescript');

var spawn = require('child_process').spawn,
	setTMP101 = spawn('./setKimitTMP.sh'),
	getTMP101_1 = spawn('./Temperature.sh');

var alert1 = 'P9_13';
var alert2 = 'P9_15';

b.pinMode(alert1, b.INPUT, 7, 'pulldown');
b.pinMode(alert2, b.INPUT, 7, 'pulldown');

b.attachInterrupt(alert1, true, b.CHANGE, printTemp1);
b.attachInterrupt(alert2, true, b.CHANGE, printTemp2);

// Setting TMP101

setTMP101.stdout.on('data', function(data){
	console.log('Setting Limits: ' + data);
});

setTMP101.stderr.on('data', function(data){
	console.log('Error: ' + data);
});

setTMP101.on('close', function(code){
	console.log('Process exited with code: ' + code);
});

// Alert

function printTemp1(x){
	if(x.value===1){
		getTMP101_1.stdout.on('data', function(data){
			console.log('The temperature in TMP101 is: ' + data);
		});

		getTMP101_1.stderr.on('data', function(data){
			console.log('Error: ' + data);
		});

		getTMP101_1.on('close', function(code){
			console.log('Process exited with code: ' + code);
		});
	}
	console.log('Int error: ' + x.err);
}

function printTemp2(y){
	if(y.value===1){
        	getTMP101_2.stdout.on('data', function(data){
                	console.log('The temperature in TMP101 is: ' + data);
        	});     
        
        	getTMP101_2.stderr.on('data', function(data){
                	console.log('Error: ' + data);
        	});     
        
        	getTMP101_2.on('close', function(code){
                	console.log('Process exited with code: ' + code);
        	});
	}     
	console.log('Int error: ' + y.err);
}