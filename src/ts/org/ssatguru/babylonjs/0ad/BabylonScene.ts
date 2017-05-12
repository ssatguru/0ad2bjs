namespace org.ssatguru.babylonjs.zad {

    export class BabylonScene {

        public scene: Object;
        
        constructor() {

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
                "multiMaterials": [

                ],
                "skeletons": [

                ],
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
                        "positions": [
                        ],
                        "normals": [
                        ],
                        "uvs": [
                        ],
                        "indices": [
                        ],
                        "subMeshes": [
                            {
                                "materialIndex": 0,
                                "verticesStart": 0,
                                "verticesCount": 1981,
                                "indexStart": 0,
                                "indexCount": 2898
                            }
                        ],
                        "instances": [

                        ]
                    }
                ],
                "cameras": [
                ],
                "lights": [
                ],
                "shadowGenerators": [
                ]
            }

        }


    }
}


