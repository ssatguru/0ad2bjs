var org;
(function (org) {
    var ssatguru;
    (function (ssatguru) {
        var babylonjs;
        (function (babylonjs) {
            var zad;
            (function (zad) {
                var BabylonScene = (function () {
                    function BabylonScene() {
                        this.scene = {
                            "producer": {
                                "name": "Blender",
                                "version": "2.76 (sub 0)",
                                "exporter_version": "4.6.1",
                                "file": "boats.babylon"
                            },
                            "autoClear": true,
                            "clearColor": [
                                0.0509,
                                0.0509,
                                0.0509
                            ],
                            "ambientColor": [
                                0,
                                0,
                                0
                            ],
                            "gravity": [
                                0,
                                -9.81,
                                0
                            ],
                            "materials": [
                                {
                                    "name": "boats.Material.001",
                                    "id": "boats.Material.001",
                                    "ambient": [
                                        0,
                                        0,
                                        0
                                    ],
                                    "diffuse": [
                                        1,
                                        1,
                                        1,
                                    ],
                                    "specular": [
                                        0,
                                        0,
                                        0
                                    ],
                                    "emissive": [
                                        1,
                                        1,
                                        1
                                    ],
                                    "specularPower": 0,
                                    "alpha": 1,
                                    "backFaceCulling": false,
                                    "checkReadyOnlyOnce": false,
                                    "diffuseTexture": {
                                        "name": "animal_crocodile.png",
                                        "level": 1,
                                        "hasAlpha": 1,
                                        "coordinatesMode": 0,
                                        "uOffset": 0,
                                        "vOffset": 0,
                                        "uScale": 1,
                                        "vScale": 1,
                                        "uAng": 0,
                                        "vAng": 0,
                                        "wAng": 0,
                                        "wrapU": 1,
                                        "wrapV": 1,
                                        "coordinatesIndex": 0
                                    }
                                }
                            ],
                            "multiMaterials": [],
                            "skeletons": [],
                            "meshes": [
                                {
                                    "name": "Cube_000_006_001",
                                    "id": "Cube_000_006_001",
                                    "materialId": "boats.Material.001",
                                    "billboardMode": 0,
                                    "position": [
                                        0,
                                        0,
                                        0
                                    ],
                                    "rotation": [
                                        0,
                                        0,
                                        0
                                    ],
                                    "scaling": [
                                        0.254,
                                        0.254,
                                        0.254
                                    ],
                                    "isVisible": true,
                                    "freezeWorldMatrix": false,
                                    "isEnabled": true,
                                    "checkCollisions": false,
                                    "receiveShadows": false,
                                    "positions": [],
                                    "normals": [],
                                    "uvs": [],
                                    "indices": [],
                                    "subMeshes": [
                                        {
                                            "materialIndex": 0,
                                            "verticesStart": 0,
                                            "verticesCount": 1981,
                                            "indexStart": 0,
                                            "indexCount": 2898
                                        }
                                    ],
                                    "instances": []
                                }
                            ],
                            "cameras": [],
                            "lights": [],
                            "shadowGenerators": []
                        };
                    }
                    return BabylonScene;
                }());
                zad.BabylonScene = BabylonScene;
            })(zad = babylonjs.zad || (babylonjs.zad = {}));
        })(babylonjs = ssatguru.babylonjs || (ssatguru.babylonjs = {}));
    })(ssatguru = org.ssatguru || (org.ssatguru = {}));
})(org || (org = {}));
var org;
(function (org) {
    var ssatguru;
    (function (ssatguru) {
        var babylonjs;
        (function (babylonjs) {
            var zad;
            (function (zad) {
                var Main = (function () {
                    function Main() {
                    }
                    Main.prototype.start = function () {
                        var canvas = document.getElementById("renderCanvas");
                        var engine = new BABYLON.Engine(canvas, true);
                        var createScene = function () {
                            var scene = new BABYLON.Scene(engine);
                            var camera = new BABYLON.ArcRotateCamera("Camera", 7 * Math.PI / 4, Math.PI / 8, 10, BABYLON.Vector3.Zero(), scene);
                            camera.inertia = 0.1;
                            camera.attachControl(canvas, true);
                            var xAxis = BABYLON.Mesh.CreateLines("xAxis", [
                                new BABYLON.Vector3(-10, 0, 0),
                                new BABYLON.Vector3(10, 0, 0),
                                new BABYLON.Vector3(10, 0, 1),
                            ], scene);
                            xAxis.color = BABYLON.Color3.Red();
                            var yAxis = BABYLON.Mesh.CreateLines("yAxis", [
                                new BABYLON.Vector3(0, -10, 0),
                                new BABYLON.Vector3(0, 10, 0),
                                new BABYLON.Vector3(1, 10, 0)
                            ], scene);
                            yAxis.color = BABYLON.Color3.Green();
                            var zAxis = BABYLON.Mesh.CreateLines("zAxis", [
                                new BABYLON.Vector3(0, 0, -10),
                                new BABYLON.Vector3(0, 0, 10),
                                new BABYLON.Vector3(1, 0, 10)
                            ], scene);
                            zAxis.color = BABYLON.Color3.Blue();
                            return scene;
                        };
                        var scene = createScene();
                        engine.runRenderLoop(function () {
                            scene.render();
                        });
                        window.addEventListener("resize", function () {
                            engine.resize();
                        });
                        return scene;
                    };
                    return Main;
                }());
                zad.Main = Main;
            })(zad = babylonjs.zad || (babylonjs.zad = {}));
        })(babylonjs = ssatguru.babylonjs || (ssatguru.babylonjs = {}));
    })(ssatguru = org.ssatguru || (org.ssatguru = {}));
})(org || (org = {}));
var org;
(function (org) {
    var ssatguru;
    (function (ssatguru) {
        var babylonjs;
        (function (babylonjs) {
            var zad;
            (function (zad) {
                var Mesh = BABYLON.Mesh;
                var Skeleton = BABYLON.Skeleton;
                var Bone = BABYLON.Bone;
                var Animation = BABYLON.Animation;
                var StandardMaterial = BABYLON.StandardMaterial;
                var VertexBuffer = BABYLON.VertexBuffer;
                var MeshConverter = (function () {
                    function MeshConverter() {
                        this.mesh = null;
                        this.fileName = "fileName";
                    }
                    MeshConverter.prototype.getStringFileURL = function (text) {
                        try {
                            var fileBlob = new Blob([text]);
                            var URL = window.URL;
                            var link = URL.createObjectURL(fileBlob);
                            return link;
                        }
                        catch (e) {
                            console.log("getStringFileURL error : " + e);
                        }
                    };
                    MeshConverter.prototype.createMesh = function (scene) {
                        this.mesh = new Mesh("mymesh", scene);
                        var material = new StandardMaterial("mat", scene);
                        material.emissiveTexture = new BABYLON.Texture("hele_isp_b.png", scene);
                        this.mesh.material = material;
                        return this.mesh;
                    };
                    MeshConverter.prototype.parsePMDFile = function (evt) {
                        console.log("file loaded");
                        var ab = evt.target.result;
                        console.log("file lenght " + ab.byteLength);
                        var pmdParser = new zad.PMDparser();
                        var meshData = pmdParser.parse(ab);
                        var mesh = this.createMesh(this.scene);
                        mesh.setVerticesData(VertexBuffer.PositionKind, meshData.positions);
                        mesh.setVerticesData(VertexBuffer.NormalKind, meshData.normals);
                        mesh.setVerticesData(VertexBuffer.UVKind, meshData.uvs);
                        mesh.setVerticesData(VertexBuffer.MatricesWeightsKind, meshData.matricesWeights);
                        mesh.setVerticesData(VertexBuffer.MatricesIndicesKind, meshData.matricesIndices);
                        console.log(meshData.matricesIndices);
                        console.log(meshData.matricesWeights);
                        mesh.setIndices(meshData.indices);
                        var submesh = new BABYLON.SubMesh(0, 0, meshData.positions.length, 0, meshData.indices.length, mesh);
                        mesh.subMeshes = [submesh];
                        var skeleton = new Skeleton(this.fileName, this.fileName, this.scene);
                        var numBones = meshData.bones.length;
                        var bones = new Array(numBones);
                        var rootBone = new Bone("rootBone", skeleton, undefined, meshData.bones[0], meshData.bones[0]);
                        bones[0] = rootBone;
                        for (var i = 1; i < numBones; i++) {
                            var bone = new Bone(i.toString(), skeleton, undefined, meshData.bones[i], meshData.bones[i]);
                            bones[i] = bone;
                        }
                        this.mesh.skeleton = skeleton;
                    };
                    MeshConverter.prototype.parsePSAfile = function (evt) {
                        console.log("psa file loaded");
                        var ab = evt.target.result;
                        console.log("file lenght " + ab.byteLength);
                        var psaParser = new zad.PSAparser();
                        var boneMatrices = psaParser.parse(ab);
                        var frameCount = boneMatrices.length;
                        console.log("frameCount " + frameCount);
                        if (this.mesh !== null) {
                            console.log("loading animation");
                            var skeleton = this.mesh.skeleton;
                            var bones = skeleton.bones;
                            var numBones = bones.length;
                            for (var i = 0; i < numBones; i++) {
                                var animation = new Animation("anim", "_matrix", 96, Animation.ANIMATIONTYPE_MATRIX);
                                var anims = new Array(frameCount);
                                for (var j = 0; j < frameCount; j++) {
                                    var boneAnimKey = new BoneAnimKey();
                                    boneAnimKey.frame = j;
                                    boneAnimKey.value = (boneMatrices[j])[i];
                                    anims[j] = boneAnimKey;
                                }
                                animation.setKeys(anims);
                                bones[i].animations = new Array(1);
                                bones[i].animations[0] = animation;
                            }
                            console.log("starting animation");
                            this.scene.beginAnimation(skeleton, 0, frameCount, true);
                        }
                    };
                    MeshConverter.prototype.handleFileSelect = function (evt) {
                        var _this = this;
                        console.log("loading file");
                        var fileLoader = evt.target;
                        var files = fileLoader.files;
                        var file = files[0];
                        var reader = new FileReader();
                        if (file.name.indexOf(".pmd") > -1) {
                            reader.onload = function (e) {
                                return _this.parsePMDFile(e);
                            };
                        }
                        else {
                            if (file.name.indexOf(".psa") > -1) {
                                reader.onload = function (e) {
                                    return _this.parsePSAfile(e);
                                };
                            }
                        }
                        fileLoader.disabled = true;
                        reader.readAsArrayBuffer(file);
                    };
                    MeshConverter.prototype.loadZadFile = function () {
                        var _this = this;
                        document.getElementById('pmdLoader').addEventListener('change', function (e) { return _this.handleFileSelect(e); }, false);
                        document.getElementById('psaLoader').addEventListener('change', function (e) { return _this.handleFileSelect(e); }, false);
                    };
                    MeshConverter.prototype.convert = function (scene) {
                        console.log("converting");
                        this.scene = scene;
                        this.loadZadFile();
                    };
                    return MeshConverter;
                }());
                zad.MeshConverter = MeshConverter;
                var BoneAnimKey = (function () {
                    function BoneAnimKey() {
                    }
                    return BoneAnimKey;
                }());
            })(zad = babylonjs.zad || (babylonjs.zad = {}));
        })(babylonjs = ssatguru.babylonjs || (ssatguru.babylonjs = {}));
    })(ssatguru = org.ssatguru || (org.ssatguru = {}));
})(org || (org = {}));
var org;
(function (org) {
    var ssatguru;
    (function (ssatguru) {
        var babylonjs;
        (function (babylonjs) {
            var zad;
            (function (zad) {
                var Vector3 = BABYLON.Vector3;
                var Quaternion = BABYLON.Quaternion;
                var Matrix = BABYLON.Matrix;
                var PMDparser = (function () {
                    function PMDparser() {
                    }
                    PMDparser.prototype.parse = function (ab) {
                        console.log("PMDparser.parse()");
                        var meshData = new MeshData();
                        var j = 0;
                        var magicView = new Uint8Array(ab, j, 4);
                        j = j + 4;
                        var magic = String.fromCharCode.apply(null, magicView);
                        var next4uint = new Uint32Array(ab, j, 4);
                        j = j + 16;
                        var version = next4uint[0];
                        var data_size = next4uint[1];
                        console.log("magic : " + magic);
                        console.log("version : " + version);
                        console.log("data_size : " + data_size);
                        var numVertices = next4uint[2];
                        var numTexCoords = next4uint[3];
                        console.log("numVertices : " + numVertices);
                        console.log("numTexCoords : " + numTexCoords);
                        for (var i = 0; i < numVertices; i++) {
                            var pos = new Float32Array(ab, j, 3);
                            j = j + 12;
                            meshData.positions.push(pos[0]);
                            meshData.positions.push(pos[1]);
                            meshData.positions.push(pos[2]);
                            var nor = new Float32Array(ab, j, 3);
                            j = j + 12;
                            meshData.normals.push(nor[0]);
                            meshData.normals.push(nor[1]);
                            meshData.normals.push(nor[2]);
                            var tex = new Float32Array(ab, j, 2 * numTexCoords);
                            j = j + 4 * 2 * numTexCoords;
                            meshData.uvs.push(tex[0]);
                            meshData.uvs.push(tex[1]);
                            var vb_bones = new Uint8Array(ab, j, 4);
                            j = j + 4;
                            meshData.matricesIndices.push(this.makeOneBased(vb_bones, 0));
                            meshData.matricesIndices.push(this.makeOneBased(vb_bones, 1));
                            meshData.matricesIndices.push(this.makeOneBased(vb_bones, 2));
                            meshData.matricesIndices.push(this.makeOneBased(vb_bones, 3));
                            var vb_weights = new Float32Array(ab, j, 4);
                            j = j + 16;
                            meshData.matricesWeights.push(vb_weights[0]);
                            meshData.matricesWeights.push(vb_weights[1]);
                            meshData.matricesWeights.push(vb_weights[2]);
                            meshData.matricesWeights.push(vb_weights[3]);
                        }
                        var numFaces = new Uint32Array(ab, j, 1)[0];
                        j = j + 4;
                        console.log("numFaces : " + numFaces);
                        for (var i = 0; i < numFaces; i++) {
                            var face = new Uint16Array(ab, j, 3);
                            j = j + 6;
                            meshData.indices.push(face[0]);
                            meshData.indices.push(face[1]);
                            meshData.indices.push(face[2]);
                        }
                        var numBones = new Uint32Array(ab, j, 1)[0];
                        j = j + 4;
                        console.log("numBones : " + numBones);
                        var trans;
                        var rot;
                        var scale = new Vector3(1, 1, 1);
                        for (var i = 0; i < numBones; i++) {
                            var bonTrans = new Float32Array(ab, j, 3);
                            j = j + 12;
                            trans = new Vector3(bonTrans[0], bonTrans[1], bonTrans[2]);
                            var boneRot = new Float32Array(ab, j, 4);
                            j = j + 16;
                            rot = new Quaternion(boneRot[0], boneRot[1], boneRot[2], boneRot[3]);
                            meshData.bones.push(Matrix.Compose(scale, rot, trans));
                        }
                        var numPropPoints = new Uint32Array(ab, j, 1)[0];
                        j = j + 4;
                        console.log("numPropPoints : " + numPropPoints);
                        var dv;
                        for (var i = 0; i < numPropPoints; i++) {
                            dv = new DataView(ab, j, 4);
                            j = j + 4;
                            var nameLength = dv.getUint32(0, true);
                            console.log(nameLength);
                            var nameView = new Uint8Array(ab, j, nameLength);
                            j = j + nameLength;
                            var name_1 = String.fromCharCode.apply(null, nameView);
                            console.log("prop name " + name_1);
                            dv = new DataView(ab, j, 28);
                            j = j + 28;
                            var propTranX = dv.getUint32(0, true);
                            var propTranY = dv.getUint32(4, true);
                            var propTranZ = dv.getUint32(8, true);
                            var propRotX = dv.getUint32(12, true);
                            var propRotY = dv.getUint32(16, true);
                            var propRotZ = dv.getUint32(20, true);
                            var propRotW = dv.getUint32(24, true);
                            var bone = new Uint8Array(ab, j, 1);
                            j = j + 1;
                        }
                        console.log("j : " + j);
                        return meshData;
                    };
                    PMDparser.prototype.makeOneBased = function (u8a, i) {
                        if (u8a[i] === 0xFF)
                            return 0;
                        else
                            return (u8a[i]);
                    };
                    return PMDparser;
                }());
                zad.PMDparser = PMDparser;
                var MeshData = (function () {
                    function MeshData() {
                        this.indices = new Array();
                        this.positions = new Array();
                        this.normals = new Array();
                        this.uvs = new Array();
                        this.matricesWeights = new Array();
                        this.matricesIndices = new Array();
                        this.bones = new Array();
                    }
                    return MeshData;
                }());
                zad.MeshData = MeshData;
            })(zad = babylonjs.zad || (babylonjs.zad = {}));
        })(babylonjs = ssatguru.babylonjs || (ssatguru.babylonjs = {}));
    })(ssatguru = org.ssatguru || (org.ssatguru = {}));
})(org || (org = {}));
var org;
(function (org) {
    var ssatguru;
    (function (ssatguru) {
        var babylonjs;
        (function (babylonjs) {
            var zad;
            (function (zad) {
                var Vector3 = BABYLON.Vector3;
                var Quaternion = BABYLON.Quaternion;
                var Matrix = BABYLON.Matrix;
                var PSAparser = (function () {
                    function PSAparser() {
                    }
                    PSAparser.prototype.parse = function (ab) {
                        var j = 0;
                        var magicView = new Uint8Array(ab, j, 4);
                        j = j + 4;
                        var magic = String.fromCharCode.apply(null, magicView);
                        var version = new Uint32Array(ab, j, 1)[0];
                        j = j + 4;
                        var data_size = new Uint32Array(ab, j, 1)[0];
                        j = j + 4;
                        console.log("magic : " + magic);
                        console.log("version : " + version);
                        console.log("data_size : " + data_size);
                        var nameLength = new Uint32Array(ab, j, 1)[0];
                        j = j + 4;
                        if (nameLength !== 0) {
                            var name_2 = new Uint8Array(ab, j, nameLength);
                            j = j + nameLength;
                            console.log("nameLength : " + nameLength);
                            console.log("name : " + String.fromCharCode.apply(null, name_2));
                            if (4 * Math.floor(j / 4) !== j) {
                                ab = ab.slice(j);
                                j = 0;
                            }
                        }
                        var frameLength = new Float32Array(ab, j, 1)[0];
                        j = j + 4;
                        console.log("frameLength : " + frameLength);
                        var numBones = new Uint32Array(ab, j, 1)[0];
                        j = j + 4;
                        console.log("numBones : " + numBones);
                        var numFrames = new Uint32Array(ab, j, 1)[0];
                        j = j + 4;
                        console.log("numFrames : " + numFrames);
                        var trans;
                        var rot;
                        var scale = new Vector3(1, 1, 1);
                        var bones = numBones;
                        var frames = numFrames;
                        var boneMatrices = new Array(frames);
                        for (var f = 0; f < frames; f++) {
                            var mats = new Array(bones);
                            for (var b = 0; b < bones; b++) {
                                var bonTrans = new Float32Array(ab, j, 3);
                                j = j + 12;
                                trans = new Vector3(bonTrans[0], bonTrans[1], bonTrans[2]);
                                var boneRot = new Float32Array(ab, j, 4);
                                j = j + 16;
                                rot = new Quaternion(boneRot[0], boneRot[1], boneRot[2], boneRot[3]);
                                mats[b] = Matrix.Compose(scale, rot, trans);
                            }
                            boneMatrices[f] = mats;
                        }
                        console.log("j : " + j);
                        return boneMatrices;
                    };
                    return PSAparser;
                }());
                zad.PSAparser = PSAparser;
            })(zad = babylonjs.zad || (babylonjs.zad = {}));
        })(babylonjs = ssatguru.babylonjs || (ssatguru.babylonjs = {}));
    })(ssatguru = org.ssatguru || (org.ssatguru = {}));
})(org || (org = {}));
