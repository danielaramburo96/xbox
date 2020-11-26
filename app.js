//Variables for setup
//import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

let container;
let camera;
let renderer;
let scene;
let house, controls, controlx;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 10;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  //Camera setup
  // camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // camera.position.set(10, 0, 20);
  camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
  camera.rotation.y = 2/180*Math.PI;
  camera.position.x = 8;
  camera.position.y = -10;
  camera.position.z = 10;


//LUCES
  hlight = new THREE.AmbientLight (0x404040,8);
  scene.add(hlight);
  directionalLight = new THREE.DirectionalLight(0xffffff,8);
  directionalLight.position.set(0,1,0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  light = new THREE.PointLight(0xc4c4c4,3);
  light.position.set(0,300,500);
  scene.add(light);
  light2 = new THREE.PointLight(0xc4c4c4,3);
  light2.position.set(500,100,0);
  scene.add(light2);
  light3 = new THREE.PointLight(0xc4c4c4,3);
  light3.position.set(0,100,-500);
  scene.add(light3);
  light4 = new THREE.PointLight(0xc4c4c4,3);
  light4.position.set(-500,300,500);
  scene.add(light4);

 
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.update();

  container.appendChild(renderer.domElement);

  //Load Model
   let loaderr = new THREE.GLTFLoader();
   loaderr.load("./house1/scene.gltf", function(gltf) {
     scene.add(gltf.scene);
     house = gltf.scene.children[0];
     house.scale.set(0.5,0.5,0.5);
    house.position.set(0,0,0);    
    animate();
   });

  //Load Model control
  //  let loader = new THREE.GLTFLoader();
  //  loader.load("./control/control.gltf", function(gltf) {
  //    scene.add(gltf.scene);
  //    house = gltf.scene.children[0];
  //    house.position.set(0,-50,0);    
  //    animate();
  //  });
  

}

function animate() {
  requestAnimationFrame(animate);
  house.rotation.z += 0;
  
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
