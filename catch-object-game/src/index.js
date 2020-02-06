import "./index.css";
import createWorld from "./ecs/index";
import resizeCanvas from "gdxjs/lib/resizeCanvas";
import createBatch from "gdxjs/lib/createBatch";
import createCamera from "gdxjs/lib/orthoCamera";
import loadTexture from "gdxjs/lib/loadTexture";
import createWhiteTex from "gl-white-texture";
import loadAtlas from "gdxjs/lib/loadAtlas";

const init = async () => {
  const info = document.getElementById("info");
  const canvas = document.getElementById("main");
  const gl = canvas.getContext("webgl");
  const batch = createBatch(gl);
  const [width, height] = resizeCanvas(canvas);
  const world = createWorld();
  world.batch = batch;
  world.canvas = canvas;
  const worldWidth = width / 10;
  const worldHeight = height / 10;
  const cam = createCamera(worldWidth, worldHeight, width, height);

  // const imagePlayer = await loadTexture(gl, "./smile.png");
  const update = delta => {
    world.setDelta(delta);
    world.process();
  };
  const whiteTex = createWhiteTex(gl);

  let lastTime = Date.now();
  let fps = 0;
  gl.clearColor(0, 0, 0, 1);
  (function loop() {
    const delta = Date.now() - lastTime;
    lastTime = Date.now();
    fps = Math.floor(1000 / delta);
    batch.setProjection(cam.combined);
    gl.clear(gl.COLOR_BUFFER_BIT);
    update(delta / 1000);
    requestAnimationFrame(loop);
  })();

  //   setInterval(() => {
  //     info.innerHTML = `FPS: ${fps}`;
  //   }, 1000);
};

init();
