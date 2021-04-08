//variable declaration
//          inputs
var m = 1 ;
var dr = 1;
var k = 1;
var amp = 1;
var fw = new Array(n);
var ff = 0;
var val= "";

//          constants
var n = 200;
var dt = 0.05; //step length of each data interval

//          outputs
var wn;
var wd;
var cc;
var c;
var tr = new Array(n*10);
var phse = new Array(n*10);
var q;
var freqr = new Array(n*10);


function assign()
{
  m = +document.getElementById('mass').value || 1.00;
  k = +document.getElementById('k').value || 1.00;
  dr = +document.getElementById('dr').value || 1.00;
  amp = +document.getElementById('baseamp').value || 1.00;
  ff = +document.getElementById('Omega').value || 1.00;

}
function compute()
{
  assign();
  outputVals();
  plot();
}
function outputVals()
{
  wn = Math.sqrt(k/m);
  document.getElementById('NAF').innerHTML = wn;
  cc = 2*m*wn;
  document.getElementById('CC').innerHTML = cc;
  c = dr*cc;
  document.getElementById('C').innerHTML = c;

  wd = wn*Math.sqrt(1-dr*dr);
  document.getElementById('DAF').innerHTML = wd;

  var trs = transmissibility(ff/wn);
  document.getElementById('TR').innerHTML = trs;

  var ph = phase(ff/wn);
  document.getElementById('PH').innerHTML = ph;
  for (i = 0; i<n*10; i++)
  {
    freqr[i] = i*dt*10/wn;
    tr[i] = transmissibility(freqr[i]);
    phse[i] = phase(freqr[i]);
  }
}
function transmissibility(frr)
{
  var trs = Math.sqrt((1+Math.pow((2*dr*frr),2))/(Math.pow((1-Math.pow(frr,2)),2)+Math.pow((2*dr*frr),2)));
  return trs;
}
function phase(frr)
{
  var phase_ = Math.atan(2*dr*frr/(1-frr**2));
  return phase_;
}
function plot()
{
  var trace = {
          x: freqr,
          y: tr,
          type: 'scatter',
          mode : 'lines'};
  var layout = {
        title: {
          text:'Transmissibility vs Frequency Ratio',
          font: {
          family: 'Courier New, monospace',
          size: 24
        }},
        xaxis: {
          type: 'log',
          title:{
          text: 'Frequency Ratio',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'}},
          autorange: true
        },
        yaxis: {
          type: 'log',
          title:{text: 'Transmissibility',font: {  family: 'Courier New, monospace',  size: 18, color: '#7f7f7f'}},
          autorange: true
        }};
        TRFR= document.getElementById('trvsfreqr');
        Plotly.newPlot( TRFR, [trace], layout);
  var trace = {
          x: freqr,
          y: phse,
          type: 'scatter',
          mode : 'lines'};
  var layout = {
        title: {
          text:'Phase angle vs Frequency Ratio',
          font: {
          family: 'Courier New, monospace',
          size: 24
        }},
        xaxis: {
          title:{
          text: 'Frequency Ratio',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'}},
          autorange: true
        },
        yaxis: {
          title:{text: 'Phase angle',font: {  family: 'Courier New, monospace',  size: 18, color: '#7f7f7f'}},
          autorange: true
        }};
        TRFR= document.getElementById('phvsfreqr');
        Plotly.newPlot( TRFR, [trace], layout);
}
