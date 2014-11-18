var b = require('bonescript');

var zeroOffset  = 0.4584;

var conversionFactor = 0.0917;

var resx, resy, resz=0;

var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }



function callADC(){

    b.analogRead('P9_36', printX);

    b.analogRead('P9_38', printY);

    b.analogRead('P9_40', printZ);

    if((resx==0)&&(resy==0)&&(resz==0)) {
         exec("python off.py", puts);
         
         
         
    }
    
    // console.log(resx);



}



function printX(x) {

    var value = (x.value - zeroOffset)/conversionFactor;

    console.log('Analog Read Value x: ' +value.toFixed(2));   
    
    if (value < 4){
        resx=1;
    // exec("~/openpixelcontrol/python_clients/example.py", puts);
    exec("python x.py", puts);
    } else{
        resx=0;
         
        //  exec("~/openpixelcontrol/python_clients/conway.py", puts);
    }

    // when the ADXL335 resting flat on a table or

    //board, then readings should be x:0

}



function printY(x) {

    var value = (x.value - zeroOffset)/conversionFactor;

    console.log('Analog Read Value y: ' +value.toFixed(2));
    
    if (value < 4){
        resy=1;
        exec("python y.py", puts);
    } else {
        resy=0;
        //  exec("cd ~/openpixelcontrol", puts);
        //  exec("~/openpixelcontrol/python_clients/sailor_moon.py  --layout layouts/wall.json", puts);
    }

    // when the ADXL335 resting flat on a table or

    //board, then readings should be y:0
}



function printZ(x) {

    var value = (x.value - zeroOffset)/conversionFactor;

    console.log('Analog Read Value z: ' +value.toFixed(2));    
    
    if (value < 4){
        resz=1;
        exec("python z.py", puts);
    } else {
        resz=0;
        //  exec("cd ~/openpixelcontrol", puts);
        //  exec("~/openpixelcontrol/python_clients/sailor_moon.py  --layout layouts/wall.json", puts);
    }

    // when the ADXL335 resting flat on a table or 

    //board, then readings should be z:1

    console.log('');
}



setInterval( callADC, 500);
    // callADC();