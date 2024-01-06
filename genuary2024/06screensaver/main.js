import { Scene, PerspectiveCamera, WebGLRenderer, TextureLoader, ShaderMaterial, DoubleSide, BoxGeometry, Clock, Mesh} from "three";
import Utils from './modules/utils';
import Stats from 'three/examples/jsm/libs/stats.module'

import winLogo from './images/winLogo.svg';

let cube, utils, renderer, camera, material, scene;

//----------------------------------------------------------------
// General functionality 
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const stats = new Stats();

let horizontalAcceleration = 0,
    verticalAcceleration = 0,
    TOP_LEFT,
    BOTTOM_RIGHT,
    clock,
    shaderMaterial;

//----------------------------------------------------------------

function animate() {
	requestAnimationFrame( animate );

  shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
  
	renderer.render( scene, camera );
  stats.update()
}

const init = () => {
  scene = new Scene();
  camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 5;
  
  renderer = new WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  
  const texture = new TextureLoader().load(winLogo);


  function vertexShader() {
    return `
        varying vec2 vUv;
        uniform float uTime;
        varying vec3 vPos;
        
        void main() {
            vUv = uv;
            vPos = position;
            vec3 transformed = position;
            transformed.x += sin(position.x + uTime);
            transformed.y += sin(position.y + position.x + position.z + uTime);
        
            gl_Position = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );
        }
    `
  }

  function fragmentShader() {
    return `
        varying vec2 vUv;
        varying vec3 vPos;
        uniform float uTime;
        uniform sampler2D uTexture;
        
        void main() {
            float time = uTime / 3.0;
        
            vec2 uv = vUv;
            uv.x += sin(uv.y) * 0.3;
            uv = fract(uv + vec2(0.1, time));
        
            vec4 color = texture2D(uTexture, uv);
            vec3 texture = texture2D(uTexture, uv).rgb;
            gl_FragColor = color;
        }
    `
  }

  shaderMaterial = new ShaderMaterial({
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader(),
    uniforms: {
        uTime: { value: 0},
        uTexture: { value: texture}
    },
    transparent: true,
});


  const geometry = new BoxGeometry(2, 2, 2 ); 
  clock = new Clock();

  cube = new Mesh( geometry, shaderMaterial ); 
  scene.add( cube );

  utils = new Utils(camera);
  TOP_LEFT = utils.translate2dTo3d(0, 0);
  BOTTOM_RIGHT = utils.translate2dTo3d(SCREEN_WIDTH, SCREEN_HEIGHT);
  // stats = new Stats()
  document.body.appendChild(stats.dom)
  
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