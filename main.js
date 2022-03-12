import * as THREE from 'three'
import Sketch from './module';


let sketch = new Sketch({
  dom: document.getElementById('container')
})

let scale = 0
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
let colors = ['white','green','grey','black','purple']
function animate() {
  position += speed; // Position increase with speed
  speed *= 0.8; // Reducing the speed gradually to zero to create an inertia
  objs.forEach((o, i) => {
    o.dist = Math.min(Math.abs(position - i), 1);
    o.dist = 1 - o.dist ** 2;
    elms[i].style.transform = `scale(${1 + 0.4 * o.dist})`;
    scale = 1 + 0.1*o.dist
    sketch.meshes[i].scale.set(scale,scale,scale)
    if(scale > 1.09){
      document.getElementById('block').style.backgroundColor = colors[i]
    }
  });
  
  rounded = Math.round(position);
  let diff = rounded - position;

  position += Math.sign(diff)*Math.pow(Math.abs(diff),0.7)*0.015 // Recalculating the position value for smooth transition
  // block.style.transform = `translate(0,${position*100 + 50}px)`  // Block transition
  wrap.style.transform = `translate(0,${-position * 100 + 50}px)`;
  sketch.meshes.forEach((mesh,i) => {
    mesh.position.y = i*1.2 - position*1.2
    // mesh.scale.set(scale,scale,scale);
  })
  window.requestAnimationFrame(animate);
}

animate();

