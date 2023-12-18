import { Vector3, Mesh, SphereGeometry, MeshBasicMaterial, ShaderMaterial, DoubleSide, TextureLoader, NearestFilter, Clock } from "three";

import lavaTileAsset from '../images/lavatile.jpg';
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

export default class Particle {
    constructor(x, y, z, radius) {
        this.pos = new Vector3(x, y, z);
        this.vel = new Vector3(0, 0, 0);
        this.acc = new Vector3(0, 0, 0);
        this.radius = radius;

        const texture = new TextureLoader().load(lavaTileAsset, (texture) => {
            texture.minFilter = NearestFilter;
        });

        // this.shaderMaterial = new ShaderMaterial({
        //     vertexShader: eruptionVertexShader,
        //     fragmentShader: eruptionFragmentShader,
        //     uniforms: {
        //         uTime: { value: 0},
        //         uTexture: { value: texture}
        //     },
        //     transparent: true,
        //     side: DoubleSide
        // });

        this.geometry = new SphereGeometry( this.radius);
        // this.particleMesh = new Mesh( geometry, this.shaderMaterial );
        this.material = new MeshBasicMaterial( { color: 0x00ff00 } );
        this.particleMesh = new Mesh( this.geometry, this.material );
        
        this.clock = new Clock();
    }

    // updateTimeUniform() {
    //     this.shaderMaterial.uniforms.uTime.value = this.clock.getElapsedTime();
    // }

    /**
     * @param {THREE.Vec2} force
     */
    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        // console.log(this.vel);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0, 0);
        this.particleMesh.position.set(this.pos.x, this.pos.y, this.pos.z);
        // this.updateTimeUniform();
    }

    checkEdges(){
        if (this.pos.x - this.radius < 0) {
            this.pos.x = this.radius; // Prevent from leaving the canvas from the left side
            this.vel.x *= -1;
          } else if (this.pos.x + this.radius > SCREEN_WIDTH) {
            this.pos.x = SCREEN_WIDTH - this.radius; // Prevent from leaving the canvas from the right side
            this.vel.x *= -1;
          }
      
          if (this.pos.y - this.radius < 0) {
              console.log("top");
            this.pos.y = this.radius; // Prevent from leaving the canvas from the top
            this.vel.y *= -1;
          } else if (this.pos.y + this.radius > SCREEN_HEIGHT) {
            this.pos.y = SCREEN_HEIGHT - this.radius; // Prevent from leaving the canvas from the bottom
            this.vel.y *= -1;
          }
    }
}