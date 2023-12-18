import { Vector3 } from 'three';
import Particle from './particle';

export default class ParticleSystem {
    constructor(position, radius) {
        this.origin = position
        this.particles = [];
        this.radius = radius;
    }

    addParticle(){
        let particle = new Particle(this.origin.x, this.origin.y, this.origin.z, this.radius);
        // console.log(particle.radius);
        this.particles.push(particle);
        // particle.particleMesh.material.color.r = getRandomArbitrary(0.3, 0.85);
        // particle.particleMesh.material.color.g = getRandomArbitrary(0, 0.3);
        // particle.particleMesh.material.color.b = getRandomArbitrary(0, 0.05);
        return particle.particleMesh;
    }

    run(horizontalAcceleration, verticalAcceleration){
        // console.log(this.particles[0].lifespan);
        // console.log("Particles.length: " + this.particles.length) + " Scene.children: " + this.particles.parent;
        for(let particle of this.particles){
            let acceleration = new Vector3(0.0001*horizontalAcceleration, 0.0001*verticalAcceleration, 0);
            particle.applyForce(acceleration);
            particle.update();
             particle.checkEdges();
        }
    }
}