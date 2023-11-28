// full sensors on js demo https://sensor-js.xyz/demo.html
//----------------------------------------------------------------
// General functionality 
let demo_button = document.getElementById("start_demo");
let horizontalDirection, verticalDirection;
let horizontalAcceleration = 0;
let verticalAcceleration = 0;
//----------------------------------------------------------------
//----------------------------------------------------------------
// splashScreen functionality
var splashScreen = document.querySelector('.splash');
splashScreen.addEventListener('click',()=>{
    splashScreen.style.opacity = 0;
    setTimeout(()=>{
        splashScreen.classList.add('hidden')
    },610)
})

//----------------------------------------------------------------
// Sensors functionality
let is_running = false;

demo_button.onclick = function(e) {
  e.preventDefault();
  
  // Request permission for iOS 13+ devices
  if (
    DeviceMotionEvent &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    DeviceMotionEvent.requestPermission();
  }
  
  if (is_running){
    window.removeEventListener("deviceorientation", handleOrientation);
    demo_button.innerHTML = "Start demo";
    demo_button.classList.add('btn-success');
    demo_button.classList.remove('btn-danger');
    is_running = false;
  }else{
    window.addEventListener("deviceorientation", handleOrientation);
    demo_button.classList.remove('btn-success');
    demo_button.classList.add('btn-danger');
    is_running = true;
  }
};


function handleOrientation(event) {
  horizontalAcceleration = event.gamma;
  verticalAcceleration = event.beta;

  console.log('GAMMA: '+ event.gamma + '  - horizontalAcceleration: ', horizontalAcceleration);
  console.log('BETA: '+ event.beta + '  - verticalAcceleration: ', verticalAcceleration);
  // right and left movement of the device
  if (event.gamma > 0) {
      horizontalDirection = 'derecha';
      document.getElementById("rightLeft").innerHTML = "&rarr;";
  } else {
      horizontalDirection = 'izquierda';
      document.getElementById("rightLeft").innerHTML = "&larr;";
  }

  // forward and backward movement of the device
  if (event.beta > 0) {
      verticalDirection = 'atras';
      document.getElementById("forwardBack").innerHTML = "&darr;";
  } else {
      verticalDirection = 'adelante';
      document.getElementById("forwardBack").innerHTML = "&uarr;";
  }
}