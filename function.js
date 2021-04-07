//variable declaration
//          inputs
var m = 1 ;
var c = 1;
var k = 1;
var amp = 1;
var fw = new Array(n);
var ff = 0;
var val= "";

//          constants
var n = 200;
var time = new Array(n);
var dt = 0.05;

//          outputs
var wn;
var wd;
var cc;
var dr;
var tr = new Array(n*10);
var q;
var freqr = new Array(n*10);


function assign()
{
  m = +document.getElementById('mass').value || 1.00;
  k = +document.getElementById('k').value || 1.00;
  c = +document.getElementById('dc').value || 1.00;
  amp = +document.getElementById('baseamp').value || 1.00;
  ff = +document.getElementById('Omega').value || 1.00;
  for (i = 0; i<n; i++)
  {
    time[i] = i*dt;
    fw[i] = 5*Math.sin(ff*i*dt);
  }

}
function compute()
{
  assign();

  outputVals();
  //plot();
}
function outputVals()
{
  wn = Math.sqrt(k/m);
  document.getElementById('NAF').innerHTML = wn;
  cc = 2*m*wn;
  document.getElementById('CC').innerHTML = cc;
  dr = c/cc;
  document.getElementById('DR').innerHTML = dr;

  wd = wn*Math.sqrt(1-dr*dr);
  document.getElementById('DAF').innerHTML = wd;

  var trs = transmissibility(ff/wn);
  document.getElementById('TR').innerHTML = trs;
}
function transmissibility(frr)
{
  var trs = Math.sqrt((1+Math.pow((2*dr*frr),2))/(Math.pow((1-Math.pow(frr,2)),2)+Math.pow((2*dr*frr),2)));
  return trs;
}
