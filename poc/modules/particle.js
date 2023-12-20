import { Vector2, Vector3, Mesh, SphereGeometry, MeshBasicMaterial, ShaderMaterial, DoubleSide, TextureLoader, NearestFilter, Clock } from "three";

import lavaTileAsset from '../images/lavatile.jpg';

export default class Particle {
    constructor(position, radius) {
        this.pos = position;
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

    update(horizontalAcceleration, verticalAcceleration, topLeft, bottomRight) {
        this.acc = new Vector2( 0.001*horizontalAcceleration/30, 0.001*verticalAcceleration/30);
        // console.log(this.acc)
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.particleMesh.position.set(this.pos.x, this.pos.y, 0);
        this.acc.set(0, 0, 0);
        // this.particleMesh.position.set(this.pos.x, this.pos.y, this.pos.z);
        // console.log(this.pos)
        // console.log(this.particleMesh.position);
        // console.log('------------------------------------')
        this.checkEdges(topLeft, bottomRight);
        
        // console.log("velX: " + this.vel.x.toFixed(2) + " velY: ", this.vel.y.toFixed(2) + "  -  posX: " + this.pos.x.toFixed(2) + " posY: ", this.pos.y.toFixed(2));
        // this.updateTimeUniform();
    }

    checkEdges(topLeft, bottomRight){
        if (this.pos.x - this.radius < topLeft.x) {
            this.pos.x = this.radius; // Prevent from leaving the canvas from the left side
            this.vel.x *= -0.17;
        //   } else if (this.pos.x + this.radius > SCREEN_WIDTH) {
          } else if (this.pos.x + this.radius > bottomRight.x) {
            // console.log("right");
            this.pos.x = bottomRight.x - this.radius; // Prevent from leaving the canvas from the right side
            this.vel.x *= -0.17;
          }
      
          if (this.pos.y - this.radius < 0) {
            // console.log("top");
            this.pos.y = this.radius; // Prevent from leaving the canvas from the top
            this.vel.y *= -0.17;
          } else if (this.pos.y + this.radius > bottomRight.y) {
            // console.log("bottom");
            this.pos.y = bottomRight.y - this.radius; // Prevent from leaving the canvas from the bottom
            this.vel.y *= -0.17;
          }
    }
}