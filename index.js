function myfunction(){
    var m =parseFloat(document.getElementById("mass").value);
    var k =parseFloat(document.getElementById("k").value);
    var c =parseFloat(document.getElementById("dc").value);
    var Omega =parseFloat(document.getElementById("Omega").value);
    var baseamp =parseFloat(document.getElementById("baseamp").value);
    m_unit=document.getElementById("m_unit").value;
    k_unit=document.getElementById("k_unit").value;
    baseamp_unit=document.getElementById("y_unit").value;
    
    //converting to SI unit 
    if (m_unit!="kg"){
        if (m_unit=="g"){
            m=m/1000;
        }
        else{
            m=m*0.453592;
        }
         
    }
    if(k_unit!="N/m"){
        if (k_unit=="N/mm"){
            k=k*1000;
        }
        else{
            k=k*175.1268369864;
        }
    }
    if (baseamp_unit!="m"){
        if (baseamp_unit=="mm"){
            baseamp=baseamp/1000;
        }
        else{
            baseamp=baseamp*0.0254;
        }
         
    }
    console.log(m,k,c,Omega,baseamp)

    wn=(k/m)**0.5;
    wd=wn*((1-c**2)**0.5);
    critical_damping=2*m*wn;
    damping_ratio=critical_damping/c;
    n=Omega/wn;
    amplitude_ratio=((1+(2*c*n)**2)/((1-n**2)**2 +(2*c*n)**2))**0.5;
    phase=Math.atan((-2*c*n**3)/(1- (1-4*c**2)*n**2))
    console.log(wn,wd,critical_damping,damping_ratio,amplitude_ratio,phase)

    var myTable = document.getElementById('table2');
    myTable.rows[2].cells[1].innerHTML = wn.toFixed(2);
    myTable.rows[3].cells[1].innerHTML = wd.toFixed(2);
    myTable.rows[4].cells[1].innerHTML = damping_ratio.toFixed(2);
    myTable.rows[5].cells[1].innerHTML =critical_damping.toFixed(2);
    myTable.rows[6].cells[1].innerHTML = 0;
    
    myTable.rows[7].cells[1].innerHTML = amplitude_ratio.toFixed(2);
    myTable.rows[8].cells[1].innerHTML = phase.toFixed(2);
    
}
