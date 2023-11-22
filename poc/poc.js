// full sensors on js demo https://sensor-js.xyz/demo.html
import * as THREE from 'three';

//----------------------------------------------------------------
// General functionality 
let demo_button = document.getElementById("start_demo");
let direction = "";
//----------------------------------------------------------------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
  console.log(direction)
  if(direction == 'derecha')
    cube.position.x += 0.002;
  if(direction == 'izquierda')
    cube.position.x -= 0.002;
  if(direction == 'adelante')
    cube.position.y += 0.002;
  if(direction == 'atras') 
    cube.position.y -= 0.002;

	renderer.render( scene, camera );
}
animate();


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
  // right and left movement of the device
  if (event.gamma > 0) {
      direction = 'derecha';
      document.getElementById("rightLeft").innerHTML = "&rarr;";
  } else {
      direction = 'izquierda';
      document.getElementById("rightLeft").innerHTML = "&larr;";
  }

  // forward and backward movement of the device
  if (event.beta > 0) {
      direction = 'atras';
      document.getElementById("forwardBack").innerHTML = "&darr;";
  } else {
      direction = 'adelante';
      document.getElementById("forwardBack").innerHTML = "&uarr;";
  }
}