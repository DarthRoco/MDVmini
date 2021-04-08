//variable declaration
//          inputs
var mm = 1 ;
var dr = 1;
var kk = 1;
var ampl = 1;
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
  mm = +document.getElementById('mass').value || 1.00;
  kk = +document.getElementById('k').value || 1.00;
  dr = +document.getElementById('dc').value || 1.00;
  ampl = +document.getElementById('baseamp').value || 1.00;
  ff = +document.getElementById('Omega').value || 1.00;
  m_unit=document.getElementById("m_unit").value;
  k_unit=document.getElementById("k_unit").value;
  baseamp_unit=document.getElementById("y_unit").value;

  //converting to SI unit
  if (m_unit!="kg"){
      if (m_unit=="g"){
          mm=mm/1000;
      }
      else{
          mm=mm*0.453592;
      }

  }
  if(k_unit!="N/m"){
      if (k_unit=="N/mm"){
          kk=kk*1000;
      }
      else{
          kk=kk*175.1268369864;
      }
  }
  if (baseamp_unit!="m"){
      if (baseamp_unit=="mm"){
          ampl=ampl/1000;
      }
      else{
          ampl=ampl*0.0254;
      }

  }

}
function compute()
{
  assign();
  outputVals();
  plot();
}
function outputVals()
{
  wn = Math.sqrt(kk/mm);
  document.getElementById('NAF').innerHTML = wn;
  cc = 2*mm*wn;
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
    freqr[i] = i*dt/wn;
    tr[i] = transmissibility(freqr[i]);
    phse[i] = phase(freqr[i]/15);
  }
}
function transmissibility(frr)
{
  var trs = Math.sqrt((1+Math.pow((2*dr*frr),2))/(Math.pow((1-Math.pow(frr,2)),2)+Math.pow((2*dr*frr),2)));
  return trs;
}
function phase(frr)
{
  var phase_ = Math.atan2((2*dr*frr),(1-frr**2))*180/Math.PI;
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
