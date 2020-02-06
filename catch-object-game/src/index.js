import createWorld from "./ecs";
import "./index.css";
import createPhysicsLootSystem from "./game/system/physicsLootSystem";
import createObject from "./game/system/createObjectSystem";
import { renderSystem, renderLoots } from "./game/system/renderSystem";
import createDropLoot from "./game/system/renderLoot";
import lootExpire from "./game/system/lootExpireSystem";
const canvas = document.getElementById("main");
const context = canvas.getContext("2d");

const world = createWorld();
world.canvas = canvas;
world.context = context;

const imageBackground = new Image();
imageBackground.src = "./yellow.jpg";
createPhysicsLootSystem(world);
createDropLoot(world);
renderLoots(world);
createObject(world);
renderSystem(world);
// lootExpire(world);
const update = delta => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(imageBackground, 0, 0, canvas.width, canvas.height);
  world.setDelta(delta);
  world.process();
};

console.log();
let lastUpdate = Date.now();
(function loop() {
  const delta = Date.now() - lastUpdate;
  lastUpdate = Date.now();
  update(delta / 1000);

  requestAnimationFrame(loop);
})();
