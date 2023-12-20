import * as THREE from 'three';
import Utils from './modules/utils';
import Stats from 'three/examples/jsm/libs/stats.module'
import Particle from './modules/particle';

let utils, renderer, camera, material, scene, startingPosition, sphereRadius, sphereParticle;

//----------------------------------------------------------------
// General functionality 
const demo_button = document.getElementById("start_demo");
const splashScreen = document.querySelector('.splash');
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const stats = new Stats();

let horizontalAcceleration = 0,
    verticalAcceleration = 0,
    TOP_LEFT,
    BOTTOM_RIGHT;

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
  TOP_LEFT = utils.translate2dTo3d(0, 0);
  BOTTOM_RIGHT = utils.translate2dTo3d(SCREEN_WIDTH, SCREEN_HEIGHT);
  
  // 4 GAME AREA EDGES
  const topBottomEdgeGeometry = new THREE.BoxGeometry( BOTTOM_RIGHT.x*2, 0.1, 0.1 );
  const rightLeftEdgeGeometry = new THREE.BoxGeometry( 0.2, TOP_LEFT.y*2, 0.1 );

  const topEdgeCube = new THREE.Mesh( topBottomEdgeGeometry, material );
  const bottomEdgeCube = new THREE.Mesh( topBottomEdgeGeometry, material );
  const leftEdgeCube = new THREE.Mesh( rightLeftEdgeGeometry, material );
  const rightEdgeCube = new THREE.Mesh( rightLeftEdgeGeometry, material );

  topEdgeCube.position.set(0, TOP_LEFT.y, 0)
  bottomEdgeCube.position.set(0, -TOP_LEFT.y, 0);
  leftEdgeCube.position.set(-TOP_LEFT.x, 0, 0);
  rightEdgeCube.position.set(TOP_LEFT.x, 0, 0);

  scene.add( topEdgeCube );
  scene.add( bottomEdgeCube );
  scene.add( leftEdgeCube );
  scene.add( rightEdgeCube );

}

function animate() {
	requestAnimationFrame( animate );
  TOP_LEFT = utils.translate2dTo3d(0, 0);
  BOTTOM_RIGHT = utils.translate2dTo3d(SCREEN_WIDTH, SCREEN_HEIGHT);

	sphereParticle.update(horizontalAcceleration, verticalAcceleration, TOP_LEFT, BOTTOM_RIGHT);

	renderer.render( scene, camera );

  stats.update()
}

const init = () => {

  
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 5;
  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  
  material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  
  utils = new Utils(camera);
  
  
  // stats = new Stats()
  document.body.appendChild(stats.dom)
  
  sphereRadius = 0.28;
  startingPosition = new THREE.Vector3(0, 0, 0);
  sphereParticle = new Particle(startingPosition, sphereRadius);
  scene.add(sphereParticle.particleMesh);

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