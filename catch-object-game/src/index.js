import createWorld from "./ecs";
import "./index.css";
import createObject from "./game/system/createObjectSystem";
import renderSystem from "./game/system/renderSystem";
import containerPhysicalSystem from "./game/system/physicalSystem";

const canvas = document.getElementById("main");
const context = canvas.getContext("2d");

const world = createWorld();
world.canvas = canvas;
world.context = context;
const imageBackground = new Image();
imageBackground.src = "./yellow.jpg";

createObject(world);
renderSystem(world);
containerPhysicalSystem(world);

const update = delta => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(imageBackground, 0, 0, canvas.width, canvas.height);
  world.setDelta(delta);
  world.process();
};

let lastUpdate = Date.now();
(function loop() {
  const delta = Date.now() - lastUpdate;
  lastUpdate = Date.now();
  update(delta / 1000);

  requestAnimationFrame(loop);
})();
