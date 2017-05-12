namespace org.ssatguru.babylonjs.zad {
    export class Main {
        public start(): BABYLON.Scene {
            var canvas = <HTMLCanvasElement>document.getElementById("renderCanvas");
            var engine = new BABYLON.Engine(canvas, true);

            var createScene = function() {
                var scene = new BABYLON.Scene(engine);
                var camera = new BABYLON.ArcRotateCamera("Camera", 7 * Math.PI / 4, Math.PI / 8, 10, BABYLON.Vector3.Zero(), scene);
                camera.inertia = 0.1;
                camera.attachControl(canvas, true);
               // var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
                //light.intensity = 0.0;

                // Creation of a lines mesh
                var xAxis = BABYLON.Mesh.CreateLines("xAxis", [
                    new BABYLON.Vector3(-10, 0, 0),
                    new BABYLON.Vector3(10, 0, 0),
                    new BABYLON.Vector3(10, 0, 1),
                ], scene);
                xAxis.color = BABYLON.Color3.Red();
                var yAxis = BABYLON.Mesh.CreateLines("yAxis", [
                    new BABYLON.Vector3(0,-10, 0),
                    new BABYLON.Vector3(0, 10, 0),
                    new BABYLON.Vector3(1, 10, 0)
                ], scene);
                yAxis.color = BABYLON.Color3.Green();
                var zAxis = BABYLON.Mesh.CreateLines("zAxis", [
                    new BABYLON.Vector3(0,0,-10),
                    new BABYLON.Vector3(0,0, 10),
                    new BABYLON.Vector3(1,0, 10)
                ], scene);
                zAxis.color = BABYLON.Color3.Blue();
                return scene;
            };

            var scene = createScene();
            engine.runRenderLoop(function() {
                scene.render();
            });

            // Resize
            window.addEventListener("resize", function() {
                engine.resize();
            });
            return scene;
        }
    }
}


