const state = ["recipe", "color"];

const allDuplicateRecipe = world => {
  let colors = [];
  world.setSystem(world => {
    const ids = world.getEntities(state);
    for (let id of ids) {
      const color = world.getComponent(id, "color");
      colors.push(color);
    }
    const check = colors.every((val, i, colors) => val === colors[0]);
    if (check) {
      const idc = world.getEntities(["container"]);
      let cooldown = world.getComponent(idc, "cooldown");
      cooldown = 0.1;
      world.setComponentValue(idc, "cooldown", cooldown);
    }
  });
};

export default allDuplicateRecipe;
