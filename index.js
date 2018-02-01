const BABYLON = require('./lib/babylon.custom');
const Boids = require('./src/boids');
const Vector3 = Boids.Vector3;

window.addEventListener('DOMContentLoaded', function(){
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);

    const env = new Boids.Environment();
    const factory = new Boids.Factory(env);
    for(let i = 0; i < 2; i++){
        let velocity = new Vector3(Math.random()*50,Math.random()*50,Math.random()*50);
        let position = new Vector3(Math.random()*50,Math.random()*50,Math.random()*50);
        factory.createBoid(position, velocity);
    }
    let camera;
    const createScene = function(){
        const scene = new BABYLON.Scene(engine);
        camera = new BABYLON.UniversalCamera('camera1', new BABYLON.Vector3(0, 0,-150), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, false);
        let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

        let arr = env.getBoids().map(boid =>{
            let sphere = BABYLON.MeshBuilder.CreateCylinder('sphere'+boid.id, {diameterTop: 0, tessellation: 4}, scene);
            boid.s = sphere;
            sphere.position.x = boid.position.x;
            sphere.position.y = boid.position.y;
            sphere.position.z = boid.position.z;
            return sphere;
        });


        let myMaterial = new BABYLON.StandardMaterial("ground_material", scene);
        myMaterial.alpha = 0.0;
        let ground = BABYLON.Mesh.CreateGround('ground1',1000, 1000, 2, scene);
        ground.material = myMaterial;
        ground.rotate(BABYLON.Axis.X, -Math.PI/2, BABYLON.Space.WORLD);

        ground.position.z = 50;

        return scene;
    };

    let scene = createScene();

    engine.runRenderLoop(function(){
        document.getElementById('fps').innerHTML = engine.getFps().toFixed();
        env.update();
        env.boids.forEach(boid=>{
            //console.log(boid.position);
            let x = boid.velocity.x;
            let y = boid.velocity.y;
            let z = boid.velocity.z;

            if(x!=0 && y!= 0) {
                boid.s.rotation.z = -Math.atan2(x, y);
            }
            if(z!=0 && x !=0) {
                if (boid.s.rotation.z < 0) {
                    boid.s.rotation.y = -Math.atan2(z, x) + Math.PI * 2;
                } else {
                    boid.s.rotation.y = Math.atan2(z, -x);
                }
            }

            boid.s.position.x = boid.position.x;
            boid.s.position.y = boid.position.y;
            boid.s.position.z = boid.position.z;
        });
        scene.render();
    });

    scene.onPointerMove = function () {
        //let p = scene.pick(scene.pointerX, scene.pointerY);
        //Boids.cursor(p.pickedPoint, camera.position);
    };

    window.addEventListener('resize', function(){
        engine.resize();
    });
});