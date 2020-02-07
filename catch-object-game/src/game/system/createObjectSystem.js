import { createContainer } from "../util/entitiesFactory";
import { createLoot } from "../util/entitiesFactory";
import { createRecipe } from "../util/entitiesFactory";
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
  createContainer(world, canvas.width / 2, (canvas.height * 5) / 6, 0, x, y);
  world.setSystem(world => {
    const ids = world.getEntities(state1);
    for (let id of ids) {
      const t = world.getComponent(id, "target");
      t.set(x, (canvas.height * 5) / 6);
    }
  });
};

export const createLoots = world => {
  let i = 0;
  let d = 1;
  const canvas = world.canvas;
  world.setSystem(world => {
    const delta = world.getDelta();
    i += delta;
    if (i >= d) {
      createLoot(
        world,
        (Math.random() * canvas.width * 2) / 3 + (canvas.width * 1) / 6,
        (canvas.height * 1) / 3
      );
      i = 0;
    }
  });
};

export const createRecipes = world => {
  let count = 0;
  const cwidth = world.canvas.width;
  const cheight = world.canvas.height;
  const marginLR = (cwidth / 2 - 30 * 3) / 4; // 30 la radius cua recipe
  const marginTB = ((cheight * 7) / 24 - cheight / 6 - 30) / 2;

  const finish = true;

  world.setSystem(world => {
    if (finish === true) {
      createRecipe(
        world,
        (cwidth * 3) / 4 - 30 - marginLR,
        cheight / 6 + marginTB
      );
      createRecipe(
        world,
        (cwidth * 3) / 4 - 30 - marginLR * 2 - 30,
        cheight / 6 + marginTB
      );
      createRecipe(
        world,
        (cwidth * 3) / 4 - 30 - marginLR * 3 - 30 * 2,
        cheight / 6 + marginTB
      );
    }
  });
};
