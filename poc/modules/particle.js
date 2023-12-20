import { Vector2, Mesh, SphereGeometry, MeshBasicMaterial, ShaderMaterial, DoubleSide, TextureLoader, NearestFilter, Clock } from "three";

import lavaTileAsset from '../images/lavatile.jpg';

export default class Particle {
    constructor(position, radius) {
        this.pos = position;
        this.vel = new Vector2(0, 0);
        this.acc = new Vector2(0, 0);
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
        this.acc.add(new Vector2( 0.01*horizontalAcceleration/25, 0.01*verticalAcceleration/25));
        // console.log(this.acc)
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0, 0);
        // this.particleMesh.position.set(this.pos.x, this.pos.y, 0);
        // console.log(this.pos.x, this.pos.y)
        this.checkEdges(topLeft, bottomRight);
        
        // console.log("velX: " + this.vel.x.toFixed(2) + " velY: ", this.vel.y.toFixed(2) + "  -  posX: " + this.pos.x.toFixed(2) + " posY: ", this.pos.y.toFixed(2));
        // this.updateTimeUniform();
    }

    checkEdges(topLeft, bottomRight){
        if (this.pos.x - this.radius < topLeft.x) {
            this.pos.x = topLeft.x + this.radius; // Prevent from leaving the canvas from the left side
            this.vel.x *= -1;
        } else if (this.pos.x + this.radius > bottomRight.x) {
            this.pos.x = bottomRight.x - this.radius; // Prevent from leaving the canvas from the right side
            this.vel.x *= -1;
        }
    
        if (this.pos.y + this.radius > topLeft.y) {
            this.pos.y = topLeft.y - this.radius; // Prevent from leaving the canvas from the top
            this.vel.y *= -1;
        } else if (this.pos.y - this.radius < bottomRight.y) {
            this.pos.y = bottomRight.y + this.radius; // Prevent from leaving the canvas from the bottom
            this.vel.y *= -1;
        }
        this.particleMesh.position.set(this.pos.x, this.pos.y, 0);
    }
}