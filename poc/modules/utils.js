import {  Vector3 } from "three";

/**
 * General utility functions
 */
export default class Utils {
	constructor(camera) {
        this.camera = camera;
    }

    /**
     * Returns a random int between two int values.
     * @param {*} min 
     * @param {*} max 
     * @returns int
     */
    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    /**
     * Returns a random floating point number between two values
     * @param {*} min 
     * @param {*} max 
     * @returns float
     */
    getRandomArbitrary = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    /**
     * Translates 2d coordinates to 3d position
     * Returns a vector with proper World Position
     * @param {number} posX 
     * @param {number} posY
     * @returns THREE.Vector3
     */
    translate2dTo3d = (posX, posY) => {
        var vec = new Vector3();
        var pos = new Vector3();
    
        // calculate position in normalized device coordinates (-1 to +1) for both components
        vec.set(
            ( posX / window.innerWidth ) * 2 - 1,
            - ( posY / window.innerHeight ) * 2 + 1,
            0.5 );
        vec.unproject( this.camera );
    
        vec.sub( this.camera.position ).normalize();
    
        var distance = - this.camera.position.z / vec.z;
    
        pos.copy( this.camera.position ).add( vec.multiplyScalar( distance ) );
        // console.log("translated: (" + posX + ", " + posY + ") to (" + pos.x + ", " + pos.y + ")");
        return pos;
    }
}