/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace org.ssatguru.babylonjs.zad {
    import Vector3 = BABYLON.Vector3;
    import Quaternion = BABYLON.Quaternion;
    import Matrix = BABYLON.Matrix;
    /*
     * parses the oad PSA file
     * http://trac.wildfiregames.com/wiki/PSA_File_Format
     * PSA {
        char magic[4];  // == "PSSA"
        u32 version;  // == 1
        u32 data_size;  // == filesize-12
 
        u32 nameLength;
        char name[nameLength];  // no longer used in the game
 
        float frameLength;  // no longer used in the game, not valid for most of the animations
 
        u32 numBones;
        u32 numFrames;
 
        BoneState boneStates[numBones * numFrames];
 
        // the state of bone b at frame f is stored in boneStates[f * numBones + b]
    }
 
    BoneState {
        Vector3D translation;
        Quaternion rotation;
        // the bone's final transform matrix is translation * rotation, as in PMD
    }
 
    Vector3D {
        float x, y, z;
    }
 
    Quaternion {
        float x, y, z, w;
    }
     * 
     */
    export class PSAparser {
        public parse(ab: ArrayBuffer): Matrix[][] {
            //parse the file
            let j: number = 0;

            // char magic[4];
            let magicView = new Uint8Array(ab, j, 4);
            j = j + 4;
            let magic: string = String.fromCharCode.apply(null, magicView);
            //u32 version; 
            let version: number = new Uint32Array(ab, j, 1)[0];
            j = j + 4;
            //u32 data_size;
            let data_size: number = new Uint32Array(ab, j, 1)[0];
            j = j + 4;

            console.log("magic : " + magic);
            console.log("version : " + version);
            console.log("data_size : " + data_size);

            //u32 nameLength;
            let nameLength: number = new Uint32Array(ab, j, 1)[0];
            j = j + 4;

            if (nameLength !== 0) {
                
                //char name[nameLength]; 
                let name = new Uint8Array(ab, j, nameLength);
                j = j + nameLength;
                
                console.log("nameLength : " + nameLength);
                console.log("name : " + String.fromCharCode.apply(null, name));
                
                //if we are no longer on 4 byte boundary then reset array to new boundary
                //everything except the name is on 4 byte (word) boundary
                if (4*Math.floor(j/4)!== j){
                    ab = ab.slice(j);
                    j = 0;
                }
                
            }
            
            //float frameLength;
            let frameLength: number = new Float32Array(ab, j, 1)[0];
            j = j + 4;
            console.log("frameLength : " + frameLength);
            
            //skip the next 4 bytes
            //j = j + 4;

            // u32 numBones;
            let numBones: number = new Uint32Array(ab, j, 1)[0];
            j = j + 4;
            console.log("numBones : " + numBones);
            // u32 numFrames;
            let numFrames: number = new Uint32Array(ab, j, 1)[0];
            j = j + 4;
            console.log("numFrames : " + numFrames);

            let trans: Vector3;
            let rot: Quaternion;
            let scale: Vector3 = new Vector3(1, 1, 1);


            //let l = numBones * numFrames;
            let bones: number = numBones;
            let frames: number = numFrames;
            let boneMatrices: Matrix[][] = new Array(frames);
            //0ad stores  animations frames wise - for each frame animations of all bones
            //babylon expects animations bone wise - for each bone animations in all frames
            for (let f = 0; f < frames; f++) {
                let mats: Matrix[] = new Array(bones);

                for (let b = 0; b < bones; b++) {

                    let bonTrans = new Float32Array(ab, j, 3);
                    j = j + 12;
                    trans = new Vector3(bonTrans[0], bonTrans[1], bonTrans[2]);

                    let boneRot = new Float32Array(ab, j, 4);
                    j = j + 16;
                    rot = new Quaternion(boneRot[0], boneRot[1], boneRot[2], boneRot[3]);

                    mats[b] = Matrix.Compose(scale, rot, trans);
                }
                boneMatrices[f] = mats;
            }

            console.log("j : " + j)
            return boneMatrices;
        }
    }
}