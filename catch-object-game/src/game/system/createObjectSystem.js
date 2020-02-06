import { createContainer } from "../util/entitiesFactory";

const createObject = world => {
  const canvas = world.canvas;
  let x = 0;
  let y = 0;
  canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  });
  world.setSystem(world => {
    createContainer(world, 5, 5, x, y);
  });
};

export default createObject;
