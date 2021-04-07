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

}
