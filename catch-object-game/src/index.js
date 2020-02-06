import createWorld from "./ecs";
import "./index.css";
import { createContainers } from "./game/system/createObjectSystem";
import { createLoots } from "./game/system/createObjectSystem";
import { renderContainer } from "./game/system/renderSystem";
import { renderLoot } from "./game/system/renderSystem";
import containerPhysicalSystem from "./game/system/containerPhysicalSystem";
import loopPhysicalSystem from "./game/system/loopPhysicalSystem";
import summationSystem from "./game/system/summationSystem";
// import clearObject from "./game/system/deleteLoot";
const canvas = document.getElementById("main");
const context = canvas.getContext("2d");

const world = createWorld();
world.canvas = canvas;
world.context = context;
const imageBackground = new Image();
imageBackground.src = "./yellow.jpg";

createContainers(world);
createLoots(world);
renderContainer(world);
renderLoot(world);
containerPhysicalSystem(world);
loopPhysicalSystem(world);
summationSystem(world);
// clearObject(world);

const update = delta => {
  context.clearRect(0, 0, 300, 600);
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
