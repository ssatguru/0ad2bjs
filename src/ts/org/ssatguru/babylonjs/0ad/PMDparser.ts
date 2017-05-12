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
         * 
         *  Vertex {
                Vector3D position;  12 
                Vector3D normal; 12 
                TexCoord coords[numTextureCoords]; 8 * numTexCoords 
                VertexBlend blend; 20
            }
           
            Vector3D {float x, y, z;}; 12
            Quaternion {float x, y, z, w;}; 16
            TexCoord {float u, v;}; 8
            
            VertexBlend { u8 bones[4]; float weights[4]; }; 20
            Face {u16 vertices[3]; }; 6
            BoneState {
                Vector3D translation; 12
                Quaternion rotation;  16
            }
            PropPoint {
                u32 nameLength;         4
                char name[nameLength];  4*nameLength
 
                Vector3D translation;   12
                Quaternion rotation;    16
                
                u8 bone;                1
            }
 
 
         */

    export class PMDparser {

        public parse(ab: ArrayBuffer): MeshData {
            console.log("PMDparser.parse()");

            let meshData: MeshData = new MeshData();

            //parse the file
            let j: number = 0;

            // char magic[4];
            let magicView = new Uint8Array(ab, j, 4);
            j = j + 4;
            let magic: string = String.fromCharCode.apply(null, magicView);
            let next4uint = new Uint32Array(ab, j, 4);
            j = j + 16;
            //u32 version; 
            let version: number = next4uint[0];
            //u32 data_size;
            let data_size: number = next4uint[1];

            console.log("magic : " + magic);
            console.log("version : " + version);
            console.log("data_size : " + data_size);

            //u32 numVertices;
            let numVertices: number = next4uint[2];
            //u32 numTexCoords;
            let numTexCoords: number = next4uint[3];


            console.log("numVertices : " + numVertices);
            console.log("numTexCoords : " + numTexCoords);


            //Vertex vertices[numVertices];
            for (let i = 0; i < numVertices; i++) {
                //Vector3D position;
                let pos = new Float32Array(ab, j, 3);
                j = j + 12;
                meshData.positions.push(pos[0]);
                meshData.positions.push(pos[1]);
                meshData.positions.push(pos[2]);


                //Vector3D normal;
                let nor = new Float32Array(ab, j, 3);
                j = j + 12;
                meshData.normals.push(nor[0]);
                meshData.normals.push(nor[1]);
                meshData.normals.push(nor[2]);

                //TexCoord coords[numTextureCoords];
                let tex = new Float32Array(ab, j, 2 * numTexCoords);
                j = j + 4 * 2 * numTexCoords;
                meshData.uvs.push(tex[0]);
                meshData.uvs.push(tex[1]);

                //VertexBlend blend;
                let vb_bones = new Uint8Array(ab, j, 4);
                j = j + 4;
                meshData.matricesIndices.push(this.makeOneBased(vb_bones, 0));
                meshData.matricesIndices.push(this.makeOneBased(vb_bones, 1));
                meshData.matricesIndices.push(this.makeOneBased(vb_bones, 2));
                meshData.matricesIndices.push(this.makeOneBased(vb_bones, 3));

                let vb_weights = new Float32Array(ab, j, 4);
                j = j + 16;
                meshData.matricesWeights.push(vb_weights[0]);
                meshData.matricesWeights.push(vb_weights[1]);
                meshData.matricesWeights.push(vb_weights[2]);
                meshData.matricesWeights.push(vb_weights[3]);
            }


            //u32 numFaces;
            let numFaces = new Uint32Array(ab, j, 1)[0];
            j = j + 4;

            console.log("numFaces : " + numFaces);

            //Face faces[numFaces];
            for (let i = 0; i < numFaces; i++) {
                let face = new Uint16Array(ab, j, 3);
                j = j + 6;
                meshData.indices.push(face[0]);
                meshData.indices.push(face[1]);
                meshData.indices.push(face[2]);
            }

            //u32 numBones;
            let numBones: number = new Uint32Array(ab, j, 1)[0];
            j = j + 4;

            console.log("numBones : " + numBones);
            
            let trans: Vector3;
            let rot: Quaternion;
            //let scale: Vector3 = new Vector3(0.254, 0.254, 0.254);
            let scale: Vector3 = new Vector3(1, 1,1);

            //BoneState restStates[numBones];
            for (let i = 0; i < numBones; i++) {
                //Vector3D translation;
                let bonTrans = new Float32Array(ab, j, 3);
                j = j + 12;
                trans = new Vector3(bonTrans[0], bonTrans[1], bonTrans[2]);

                //Quaternion rotation;
                let boneRot = new Float32Array(ab, j, 4);
                j = j + 16
                rot = new Quaternion(boneRot[0], boneRot[1], boneRot[2], boneRot[3]);
                
                meshData.bones.push(Matrix.Compose(scale,rot,trans))
            }

            //u32 numPropPoints;
            let numPropPoints: number = new Uint32Array(ab, j, 1)[0];
            j = j + 4;

            console.log("numPropPoints : " + numPropPoints);
            let dv:DataView;
            //PropPoint propPoints[numPropPoints]
            for (let i = 0; i < numPropPoints; i++) {
                 dv = new DataView(ab,j,4);
                 j = j + 4;
                //u32 nameLength;
                //let nameLength: number = new Uint32Array(ab, j, 1)[0];
                //j = j + 4;
                let nameLength: number = dv.getUint32(0,true);
                console.log(nameLength);
                //char name[nameLength];
                let nameView = new Uint8Array(ab, j, nameLength);
                j = j + nameLength;
                let name = String.fromCharCode.apply(null, nameView);
                console.log("prop name " + name);
                
                dv = new DataView(ab,j,28);
                j=j+28;
                //Vector3D translation;
                //let propTran = new Uint32Array(ab, j, 3);
                //j = j + 12;
                let propTranX:number = dv.getUint32(0,true);
                let propTranY:number = dv.getUint32(4,true);
                let propTranZ:number = dv.getUint32(8,true);
                //
                //Quaternion rotation;
                //let propRot = new Uint32Array(ab, j, 4);
                //j = j + 16;
                let propRotX:number = dv.getUint32(12,true);
                let propRotY:number = dv.getUint32(16,true);
                let propRotZ:number = dv.getUint32(20,true);
                let propRotW:number = dv.getUint32(24,true);

                //u8 bone;
                let bone = new Uint8Array(ab, j, 1);

                j = j + 1
            }
            console.log("j : " + j)

            return meshData;

        }


        /*
             * indices are one base in babylon , 0 implies no bones
             * indices are zero based in 0ad , 0xFF implies no bones
             */
        private makeOneBased(u8a: Uint8Array, i: number): number {
            if (u8a[i] === 0xFF) return 0
            //else return (u8a[i] + 1);
            else return (u8a[i]);
            
            //return (u8a[i]);
        }
    }

    export class MeshData {

        indices: number[] = new Array();
        positions: number[] = new Array();
        normals: number[] = new Array();
        //TODO add more uvs based on numTexCoords
        uvs: number[] = new Array();
        matricesWeights: number[] = new Array();
        matricesIndices: number[] = new Array();
        bones:Matrix[] = new Array();
        

    }

}

