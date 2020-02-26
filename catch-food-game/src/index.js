import "./index.css";

import {
  resizeCanvas,
  createOrthoCamera,
  createBatch,
  createGameLoop,
  Vector2,
  loadTexture
} from "gdxjs";

import createWhiteTexture from "gl-white-texture";

const init = async () => {
  const canvas = document.getElementById("main");
  const infor = document.getElementById("infor");

  const [width, height] = resizeCanvas(canvas, 1);

  const gl = canvas.getContext("webgl");
  const worldWidth = 10;
  const worldHeight = (worldWidth * height) / width;
  const cam = createOrthoCamera(worldWidth, worldHeight, width, height);
  const batch = createBatch(gl);
  const whiteTex = createWhiteTexture(gl);

  const foodTex = await loadTexture(gl, "./food.png");
  const FOOD_WIDTH = worldWidth / 10;
  const FOOD_HEIGHT = (FOOD_WIDTH * foodTex.height) / foodTex.width;
  const scaleSpeed = worldWidth / 100;
  const acceleration = worldWidth / 10;

  const food = {
    position: new Vector2(worldWidth / 2, worldHeight / 2),
    scale: worldWidth / 10,
    speed: Math.PI / 100
  };

  const tmp = new Vector2(0, 0);
  const circle = {
    position: new Vector2(-worldHeight / 0.1, worldHeight / 2),
    radius: worldWidth / 2 + worldHeight / 0.1
  };

  let angle = 0;
  const physical = delta => {
    angle -= food.speed * delta;
    tmp.set(circle.radius, 0);
    tmp.rotateRad(angle);
    food.position.setVector(circle.position).addVector(tmp);
  };

  const draw = () => {
    batch.begin();
    // console.log(food.position);
    batch.draw(
      foodTex,
      food.position.x - FOOD_WIDTH / 2,
      food.position.y - FOOD_HEIGHT / 2,
      FOOD_WIDTH,
      FOOD_HEIGHT,
      FOOD_WIDTH / 2,
      FOOD_HEIGHT / 2,
      0,
      food.scale,
      food.scale
    );
    batch.end();
  };

  const zoom = delta => {
    food.scale += scaleSpeed * delta;
  };

  gl.clearColor(0, 0, 0, 1);
  const update = delta => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    batch.setProjection(cam.combined);
    physical(delta);
    draw();
    zoom(delta);
  };

  const game = createGameLoop(update);

  setInterval(() => {
    infor.innerHTML = `FPS: ${Math.round(game.getFps())}`;
  }, 1000);
};

init();
