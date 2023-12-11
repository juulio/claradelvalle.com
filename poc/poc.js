import * as THREE from 'three';
import Utils from './modules/utils';
import ParticleSystem from './modules/particleSystem';

let utils, renderer, camera, cube, material, scene;
let particleSystem, particleSystemPosX, particleSystemPosY, particleSystemPosZ, showParticleSystem;

//----------------------------------------------------------------
// General functionality 
const demo_button = document.getElementById("start_demo");
const splashScreen = document.querySelector('.splash');

let horizontalAcceleration = 0;
let verticalAcceleration = 0;
//----------------------------------------------------------------


function animate() {
	requestAnimationFrame( animate );

  if(cube.position.x >= 1.7 || cube.position.x <= -1.7){
    horizontalAcceleration *= -1;
  }
  if(cube.position.y >= 3.7 || cube.position.y <= -3.7){ 
    verticalAcceleration *= -1;
  }

  cube.position.x += 0.001*horizontalAcceleration;
  cube.position.y -= 0.001*verticalAcceleration;
 
  // scene.add(particleSystem.addParticle());
	particleSystem.run();

	renderer.render( scene, camera );
}

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

    window.addEventListener("deviceorientation", handleOrientation);
    demo_button.classList.remove('btn-success');
    demo_button.classList.add('btn-danger');
    is_running = true;
};

function handleOrientation(event) {
  horizontalAcceleration = event.gamma;
  verticalAcceleration = event.beta;
  // console.log('x Acc: ', horizontalAcceleration + '  y Acc: ', verticalAcceleration);
}



const setScreenEdges = (SCREEN_WIDTH, SCREEN_HEIGHT) => {
  const topLeft = utils.translate2dTo3d(0, 0);
  const bottomRight = utils.translate2dTo3d(SCREEN_WIDTH, SCREEN_HEIGHT);

  // 4 GAME AREA EDGES
  const topBottomEdgeGeometry = new THREE.BoxGeometry( bottomRight.x*2, 0.1, 0.1 );
  const rightLeftEdgeGeometry = new THREE.BoxGeometry( 0.2, topLeft.y*2, 0.1 );

  const topEdgeCube = new THREE.Mesh( topBottomEdgeGeometry, material );
  const bottomEdgeCube = new THREE.Mesh( topBottomEdgeGeometry, material );
  const leftEdgeCube = new THREE.Mesh( rightLeftEdgeGeometry, material );
  const rightEdgeCube = new THREE.Mesh( rightLeftEdgeGeometry, material );

  topEdgeCube.position.set(0, topLeft.y, 0)
  bottomEdgeCube.position.set(0, -topLeft.y, 0);
  leftEdgeCube.position.set(-topLeft.x, 0, 0);
  rightEdgeCube.position.set(topLeft.x, 0, 0);

  scene.add( topEdgeCube );
  scene.add( bottomEdgeCube );
  scene.add( leftEdgeCube );
  scene.add( rightEdgeCube );

}

const init = () => {

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // This material is used in all cubes, for the POC
  material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const geometry = new THREE.BoxGeometry( 0.4, 0.4, 0.4 );
  cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  utils = new Utils(camera);
  
  const SCREEN_WIDTH = window.innerWidth;
  const SCREEN_HEIGHT = window.innerHeight;

	particleSystem = new ParticleSystem(new THREE.Vector3(0, 0, 0), 0.3);
  scene.add(particleSystem.addParticle());
  
  window.addEventListener( 'resize', onWindowResize, false );
  
  // splashScreen functionality
  splashScreen.addEventListener('click',()=>{
    splashScreen.style.opacity = 0;
    setTimeout(()=>{splashScreen.classList.add('hidden')},610);
    setScreenEdges(SCREEN_WIDTH, SCREEN_HEIGHT);
  });
  
  onWindowResize(SCREEN_WIDTH, SCREEN_HEIGHT);
  animate();
}

//----------------------------------------------------------------
// Resize functionality
const onWindowResize = (SCREEN_WIDTH, SCREEN_HEIGHT) => {
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT); 
  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  camera.updateProjectionMatrix();

  renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
}

init();