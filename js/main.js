function onReady(){
      console.log("page loaded");
      
     setInterval(updateClock, 1000);
     updateClock();

}

function updateClock(){
        
   var date = new Date();
      
      //console.log(date.getHours());
      //console.log(date.getMinutes());
      //console.log(date.getSeconds());
      
      //var hours = document.getElementById('hr');
      //var minutes = document.getElementById('mn');
      //var seconds = document.getElementById('sc');
      //
      //hours.innerHTML = date.getHours();
      //minutes.innerHTML = date.getMinutes();
      //seconds.innerHTML = date.getSeconds();
      
      var clock = document.getElementById('clock');
      
      clock.innerHTML = formatDigits(date.getHours()) + ':' + formatDigits(date.getMinutes()) + ':' + formatDigits(date.getSeconds());
            
}

function formatDigits(val){
        if(val<10){
                val = "0" + val;
        }
        return val;
}

window.onload = onReady();