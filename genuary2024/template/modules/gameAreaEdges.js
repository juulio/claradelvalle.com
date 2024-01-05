import {  Vector3 } from "three";

/**
 * Renders Plane Mesh floor 
 * @returns THREE.Mesh Floor
 */
export default class GameAreaEdges {
    constructor(x, y, z, width, height) {
        this.pos = new Vector3(x, y, z);

    
        return this.floorMesh;
    }
}