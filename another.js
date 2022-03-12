import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ------------------------------------------------------------------------------------------

let speed = 0;
let position = 0;
let block = document.getElementById("block");
let wrap = document.getElementById("wrap");
let rounded = 0;
let elms = [...document.querySelectorAll(".n")];

window.addEventListener("wheel", (e) => {
  // Event listener for mouse wheel movement
  speed += e.deltaY * 0.0003; // deltaY represent the speed of mouse movement.
});

let objs = Array(5).fill({ dist: 0 });

function animation() {
//   position += speed; // Position increase with speed
//   speed *= 0.8; // Reducing the speed gradually to zero to create an inertia
  objs.forEach((o, i) => {
    o.dist = Math.min(Math.abs(position - i), 1);
    o.dist = 1 - o.dist ** 2;
    elms[i].style.transform = `scale(${1 + 0.4 * o.dist})`;
  });

  //   rounded = Math.round(position);
  //   let diff = rounded - position;

  //   position += diff * 0.015; // Recalculating the position value for smooth transition
  // block.style.transform = `translate(0,${position*100 + 50}px)`  // Block transition
  //   wrap.style.transform = `translate(0,${-position * 100 + 50}px)`;
  window.requestAnimationFrame(animation);
}

animation();

// ----------------------------------------------------------------------------------------------------

const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
  antialiasing: true,
  alpha: true,
});

const container = document.querySelector("#bg");

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const geometry = new THREE.PlaneGeometry(70, 40);
// const material = new THREE.MeshBasicMaterial({color:'red'})
// const plane = new THREE.Mesh(geometry,material)
// scene.add(plane)

let colors = ["red", "blue", "green", "yellow"];
let objects = [];
let pos = -40;
for (let i = 0; i < colors.length; i++) {
  const material = new THREE.MeshBasicMaterial({ color: colors[i] });
  const plane = new THREE.Mesh(geometry, material);
  plane.position.y = pos;
  pos += 45;
  plane.rotation.y = -0.5;
  scene.add(plane);
  objects.push(plane);
}

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  //   objects.forEach((obj, i) => {
  //     position += speed; // Position increase with speed
  //     speed *= 0.08; // Reducing the speed gradually to zero to create an inertia
  //     obj.position.y += position;
  //   });

  position += speed; // Position increase with speed
  speed *= 0.8; // Reducing the speed gradually to zero to create an inertia
  rounded = Math.round(position);
  let diff = rounded - position;
  console.log(diff);
  position += Math.round(diff * 0.015);
  controls.update();
  renderer.render(scene, camera);
}

animate();
