import { createContainer } from "../util/entitiesFactory";
import { createLoot } from "../util/entitiesFactory";
const state1 = ["target", "container"];
export const createContainers = world => {
  const canvas = world.canvas;
  let x = 0;
  let y = 0;
  canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  });
  createContainer(world, canvas.width / 2, canvas.height - 50, 0, x, y);
  world.setSystem(world => {
    const ids = world.getEntities(state1);
    for (let id of ids) {
      const t = world.getComponent(id, "target");
      t.set(x, canvas.height - 50);
    }
  });
};

export const createLoots = world => {
  let i = 0;
  let d = 1;
  world.setSystem(world => {
    const delta = world.getDelta();
    i += delta;
    if (i >= d) {
      createLoot(world, Math.random() * 250 + 25, 100);
      i = 0;
    }
  });
};
