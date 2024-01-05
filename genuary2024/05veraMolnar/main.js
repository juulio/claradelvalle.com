import * as THREE from 'three';
import Utils from './modules/utils';
// import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let cube, utils, renderer, camera, controls, scene;

//----------------------------------------------------------------
// General functionality 
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

// const stats = new Stats();
const squares = 6;
const squareWidth = 0.1;
const squareHeight = 0.1;

let TOP_LEFT,
    BOTTOM_RIGHT;

//----------------------------------------------------------------

function animate() {
	requestAnimationFrame( animate );
  // controls.update();
	renderer.render( scene, camera );
  // stats.update()
}

const init = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 0.5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // controls = new OrbitControls( camera, renderer.domElement );
  // controls.update();
  
  
  const geometry = new THREE.BoxGeometry( squareWidth, squareHeight, 0.01 ); 

  const colors = [
    0xff0000,
    0xffa500,
    0xffff00,
    0x00ff00,
    0x0000ff,
    0xff00ff,
    0xffc0cb
  ]
  
  const renderCube = (posX, posY, rotation, color) => {

    const material = new THREE.MeshBasicMaterial( {
      transparent: true,
      color: colors[posX % 7],}
    );
    material.opacity = 0.03;

    const cubeMesh = new THREE.InstancedMesh( geometry, material, squares);
  
    cubeMesh.position.x = (posX - squares / 2) * squareWidth + squareWidth / 2;
    cubeMesh.position.y = (posY - squares / 2) * squareHeight + squareHeight / 2;
    cubeMesh.rotation.z += posY * rotation;
    cubeMesh.geometry.center();

    return cubeMesh;
  }
  
  const group = new THREE.Group();

  for ( let i = 0; i < squares; i++ ) {
    for ( let j = 0; j < squares; j++) {
      group.add(renderCube(i, j, 1));
      group.add(renderCube(i, j, 2));
      group.add(renderCube(i, j, 3));
    }
  }

  
  utils = new Utils(camera);
  TOP_LEFT = utils.translate2dTo3d(600, 0);
  BOTTOM_RIGHT = utils.translate2dTo3d(SCREEN_WIDTH, SCREEN_HEIGHT-500);

  group.position.x = TOP_LEFT.x;
  group.position.y = BOTTOM_RIGHT.y;
  scene.add( group );

  // stats = new Stats()
  // document.body.appendChild(stats.dom)
  
  window.addEventListener( 'resize', onWindowResize, false );
  
  animate();
}

//----------------------------------------------------------------
// Resize functionality
const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

init();