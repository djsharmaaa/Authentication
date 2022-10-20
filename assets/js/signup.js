const signin=document.getElementById('signinButton');
const signup=document.getElementById('signupButton');

signin.onclick=function(){
    let k=50;
    let c=setInterval(function(){
        if(k==0){
            clearInterval(c);
        }
     $('#select').css('left',k+"%");
    k--;   
 },0.001);
 $('#select').css('right','');
 }


signup.onclick=function(){
    let k=50;
   let c=setInterval(function(){
       if(k==0){
           clearInterval(c);
       }
    $('#select').css('right',k+"%");
   k=k-2;   
},0.001);
$('#select').css('left','');
}

