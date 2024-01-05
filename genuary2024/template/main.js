import * as THREE from 'three';
import Utils from './modules/utils';
import Stats from 'three/examples/jsm/libs/stats.module'

let cube, utils, renderer, camera, material, scene;

//----------------------------------------------------------------
// General functionality 
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const stats = new Stats();

let horizontalAcceleration = 0,
    verticalAcceleration = 0,
    TOP_LEFT,
    BOTTOM_RIGHT;

//----------------------------------------------------------------

function animate() {
	requestAnimationFrame( animate );

  
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  
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
  
  const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
  cube = new THREE.Mesh( geometry, material ); 
  scene.add( cube );

  utils = new Utils(camera);
  TOP_LEFT = utils.translate2dTo3d(0, 0);
  BOTTOM_RIGHT = utils.translate2dTo3d(SCREEN_WIDTH, SCREEN_HEIGHT);
  // stats = new Stats()
  document.body.appendChild(stats.dom)
  
  window.addEventListener( 'resize', onWindowResize, false );
  
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