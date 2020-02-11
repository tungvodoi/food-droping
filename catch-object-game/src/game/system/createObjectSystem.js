import { createContainer } from "../util/entitiesFactory";
import { createLoot } from "../util/entitiesFactory";
import { createRecipe } from "../util/entitiesFactory";
import InputHandler from "gdxjs/lib/InputHandler";

const state1 = ["target", "container", "phase"];
export const createContainers = world => {
  const canvas = world.canvas;
  const inputHandler = new InputHandler(canvas);
  let touched = false;
  let x = canvas.width / 2;
  // let y = 0;
  inputHandler.addEventListener("touchStart", (xc, yc) => {
    touched = true;
    x = xc;
    // const rect = canvas.getBoundingClientRect();
    // x = e.clientX - rect.left;
    // y = e.clientY - rect.top;
  });
  inputHandler.addEventListener("touchMove", (xc, yc) => {
    if (touched) {
      x = xc;
    }
  });
  inputHandler.addEventListener("touchEnd", (xc, yc) => {
    touched = false;
  });
  createContainer(world);
  world.setSystem(world => {
    const ids = world.getEntities(state1);
    // console.log(ids);
    for (let id of ids) {
      const t = world.getComponent(id, "target");
      const width = world.getComponent(id, "width");
      if (x - width / 2 < 0) {
        x = width / 2;
      }
      if (x + width / 2 > canvas.width) {
        x = canvas.width - width / 2;
      }
      t.set(x, (canvas.height * 5) / 6 + canvas.height / 50);
    }
  });
};

export const createLoots = world => {
  let i = 0;
  let first_Coolown = 0;
  // const canvas = world.canvas;
  world.setSystem(world => {
    const delta = world.getDelta();
    const cooldown = world.getComponent(
      world.getEntities(["container"]),
      "cooldown"
    );
    i += delta;
    if (i >= first_Coolown) {
      createLoot(world);
      i = 0;
    }
    first_Coolown = cooldown;
  });
};

export const createRecipes = world => {
  // let count = 0;
  const cwidth = world.canvas.width;
  const cheight = world.canvas.height;
  const marginLR = (cwidth / 2 - (cwidth / 11) * 3) / 4;
  let cooldown = 0.3;
  let first_Coolown = 0;
  world.setSystem(world => {
    const delta = world.getDelta();
    const ids = world.getEntities(state1);
    for (let id of ids) {
      // console.log(id);
      let phase = world.getComponent(id, "phase");
      // console.log(phase);
      if (phase === 0) {
        first_Coolown = Math.max(0, first_Coolown - delta);
        if (first_Coolown === 0) {
          first_Coolown = cooldown;
          world.setComponentValue(world.getEntities(["container"]), "phase", 3);
          createRecipe(
            world,
            (cwidth * 3) / 4 - cwidth / 11 - marginLR,
            cheight / 6 + cheight / 18
          );
          createRecipe(
            world,
            (cwidth * 3) / 4 - cwidth / 11 - marginLR * 2 - cwidth / 11,
            cheight / 6 + cheight / 18
          );
          createRecipe(
            world,
            (cwidth * 3) / 4 - cwidth / 11 - marginLR * 3 - (cwidth / 11) * 2,
            cheight / 6 + cheight / 18
          );
        }
      }
    }
  });
};
