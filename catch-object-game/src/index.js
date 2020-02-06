import "./index.css";
import createWorld from "./ecs/index";
// import resizeCanvas from "gdxjs/lib/resizeCanvas";
// import createBatch from "gdxjs/lib/createBatch";
// import createCamera from "gdxjs/lib/orthoCamera";
// import loadTexture from "gdxjs/lib/loadTexture";
// import createWhiteTex from "gl-white-texture";
// import loadAtlas from "gdxjs/lib/loadAtlas";

import renderContainer from "./game/system/renderSystem";
import { createObject } from "./game/system/createObjectSystem";

const init = async () => {
  const info = document.getElementById("info");
  const canvas = document.getElementById("main");
  const context = canvas.getContext("2d");

  const world = createWorld();
  world.context = context;
  world.canvas = canvas;

  // const imagePlayer = await loadTexture(gl, "./smile.png");
  const update = delta => {
    world.setDelta(delta);
    world.process();
  };

  const imageBackground = new Image();
  imageBackground.src = "./yellow.jpg";
  const imageContainer = new Image();
  imageContainer.src = "./ellipse.png";

  renderContainer(world, imageContainer);
  createObject(world);

  let lastTime = Date.now();
  let fps = 0;

  (function loop() {
    const delta = Date.now() - lastTime;
    lastTime = Date.now();
    fps = Math.floor(1000 / delta);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(imageBackground, 0, 0, canvas.width, canvas.height);
    update(delta / 1000);
    requestAnimationFrame(loop);
  })();

  //   setInterval(() => {
  //     info.innerHTML = `FPS: ${fps}`;
  //   }, 1000);
};

init();
