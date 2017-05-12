/*
 * Reads a 0AD mesh dae file and converts it to babylonjs file
 */
namespace org.ssatguru.babylonjs.zad {

    //import BabylonScene = org.ssatguru.babylonjs.zad.BabylonScene;
    import Scene = BABYLON.Scene;
    import SceneLoader = BABYLON.SceneLoader;
    import Mesh = BABYLON.Mesh;
    import Skeleton = BABYLON.Skeleton;
    import Bone = BABYLON.Bone;
    import Animation = BABYLON.Animation;
    import StandardMaterial = BABYLON.StandardMaterial;
    import VertexBuffer = BABYLON.VertexBuffer;
    import Matrix = BABYLON.Matrix;

    export class MeshConverter {

        private getStringFileURL(text) {
            try {
                let fileBlob = new Blob([text]);
                var URL = window.URL;
                var link = URL.createObjectURL(fileBlob);
                return link;
            } catch (e) {
                console.log("getStringFileURL error : " + e);
                /*
                var blobBuilder=window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder;
                var bb=new blobBuilder();		
                bb.append(text);
                var fileBlob=bb.getBlob();
            }
                                        */
                //var URL=window.URL || window.webkitURL;
            }
        }

        mesh: Mesh = null;

        private createMesh(scene: Scene): Mesh {
            this.mesh = new Mesh("mymesh", scene);
            let material: StandardMaterial = new StandardMaterial("mat", scene);
            //material.diffuseTexture = new BABYLON.Texture("animal_crocodile.png", scene);
            material.emissiveTexture = new BABYLON.Texture("hele_isp_b.png", scene);
            this.mesh.material = material;
            return this.mesh;
        }

        private parsePMDFile(evt: Event) {

            console.log("file loaded");
            let ab: ArrayBuffer = (<any>evt.target).result;
            console.log("file lenght " + ab.byteLength);

            let pmdParser: PMDparser = new PMDparser();
            let meshData: MeshData = pmdParser.parse(ab);

            //create a new mesh
            let mesh: Mesh = this.createMesh(this.scene);

            mesh.setVerticesData(VertexBuffer.PositionKind, meshData.positions);
            mesh.setVerticesData(VertexBuffer.NormalKind, meshData.normals);
            mesh.setVerticesData(VertexBuffer.UVKind, meshData.uvs);
            mesh.setVerticesData(VertexBuffer.MatricesWeightsKind, meshData.matricesWeights);
            mesh.setVerticesData(VertexBuffer.MatricesIndicesKind, meshData.matricesIndices);
            console.log(meshData.matricesIndices);
            console.log(meshData.matricesWeights);
            mesh.setIndices(meshData.indices);

            let submesh: BABYLON.SubMesh = new BABYLON.SubMesh(0, 0, meshData.positions.length, 0, meshData.indices.length, mesh);
            mesh.subMeshes = [submesh];


            //add skeleton data
            let skeleton: Skeleton = new Skeleton(this.fileName, this.fileName, this.scene);

            let numBones: number = meshData.bones.length;
            let bones: Bone[] = new Array(numBones)
            let rootBone: Bone = new Bone("rootBone", skeleton, undefined, meshData.bones[0], meshData.bones[0]);
             bones[0] = rootBone;
            for (let i = 1; i < numBones; i++) {
                //let bone: Bone = new Bone(i.toString(), skeleton, rootBone, meshData.bones[i], meshData.bones[i]);
                let bone: Bone = new Bone(i.toString(), skeleton, undefined, meshData.bones[i], meshData.bones[i]);
                bones[i] = bone;
            }

            this.mesh.skeleton = skeleton;

            /*
            let babylonScene: BabylonScene = new BabylonScene();
            let scene: Object = babylonScene.scene;

            let mesh0: any = scene["meshes"][0];
            mesh0["positions"] = positions;
            mesh0["normals"] = normals;
            mesh0["uvs"] = uvs;
            mesh0["indices"] = indices;
            let submesh0: any = mesh0["subMeshes"][0];
            submesh0["verticesCount"] = positions.length;
            submesh0["indexCount"] = indices.length;
            
            var sceneString: string = JSON.stringify(scene, null, 2);
            SceneLoader.Append("", "data:" + sceneString, this.scene);
            */


        }
        private parsePSAfile(evt: Event) {
            console.log("psa file loaded");
            let ab: ArrayBuffer = (<any>evt.target).result;
            console.log("file lenght " + ab.byteLength);
            
            let psaParser: PSAparser = new PSAparser();
            let boneMatrices:Matrix[][] = psaParser.parse(ab);
            
            let frameCount : number = boneMatrices.length;
            console.log("frameCount " + frameCount);
            if (this.mesh !== null) {
                console.log("loading animation");
                let skeleton: Skeleton = this.mesh.skeleton;
                let bones: Bone[] = skeleton.bones;
                let numBones: number = bones.length;
                for (let i = 0; i < numBones; i++) {
                    let animation: Animation = new Animation("anim", "_matrix", 96, Animation.ANIMATIONTYPE_MATRIX);
                    let anims :BoneAnimKey[] = new Array(frameCount);
                    for (let j= 0;j<frameCount;j++){
                        let boneAnimKey :BoneAnimKey = new BoneAnimKey();
                        boneAnimKey.frame = j;
                        boneAnimKey.value = (boneMatrices[j])[i]
                        anims[j]=boneAnimKey;
                    }
                    animation.setKeys(anims);
                    bones[i].animations = new Array(1);
                    bones[i].animations[0]=animation;
                }
                //skeleton.beginAnimation("anim",true);
                console.log("starting animation");
                this.scene.beginAnimation(skeleton,0,frameCount, true);
                //this.scene.debugLayer.show();
                
            }
        }

        fileName: string = "fileName";

        private handleFileSelect(evt: Event) {
            console.log("loading file");
            let fileLoader: HTMLInputElement = <HTMLInputElement>evt.target;
            let files: FileList = fileLoader.files;
            let file: File = files[0];
            let reader = new FileReader();

            if (file.name.indexOf(".pmd") > -1) {
                reader.onload = (e) => {
                    return this.parsePMDFile(e);
                };
            } else {
                if (file.name.indexOf(".psa") > -1) {
                    reader.onload = (e) => {
                        return this.parsePSAfile(e);
                    };
                }
            }
            fileLoader.disabled = true;
            reader.readAsArrayBuffer(file);
        }

        private loadZadFile() {
            document.getElementById('pmdLoader').addEventListener('change', (e) => { return this.handleFileSelect(e); }, false);
            document.getElementById('psaLoader').addEventListener('change', (e) => { return this.handleFileSelect(e); }, false);
        }
        private scene: Scene;
        public convert(scene: Scene) {
            console.log("converting");
            this.scene = scene;
            
            this.loadZadFile();

        }
    }

    class BoneAnimKey {
        
        frame: number;
        value: Matrix;
    }

}


