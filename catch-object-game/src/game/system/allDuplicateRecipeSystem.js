const state = ["recipe", "color"];
const state2 = ["loot", "color"];

const allDuplicateRecipe = world => {
  const context = world.context;
  const w = world.canvas.width;
  const h = world.canvas.height;
  let colors = [];
  const timeLimit = 3;
  let time = 0;
  world.setSystem(world => {
    const ids = world.getEntities(state);
    const delta = world.getDelta();
    for (let id of ids) {
      const color = world.getComponent(id, "color");
      colors.push(color);
    }
    if (colors.length > 0) {
      let check = colors.every((val, i, colors) => val === colors[0]);
      if (check) {
        time += delta;
        //draw countdown
        context.fillStyle = "red";
        context.fillRect(0, (h * 11) / 56, w / 5, h / 12);

        context.font = "25px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.fillText(
          `0:0${Math.round(time)}`,
          w / 10,
          (h * 5) / 21 + h / 90
        );
        //
        const idc = world.getEntities(["container"]);
        let cooldown = world.getComponent(idc, "cooldown");
        cooldown = 0.1;
        world.setComponentValue(idc, "cooldown", cooldown);

        const idL = world.getEntities(state2);
        for (let idl of idL) {
          let colorLoot = world.getComponent(idl, "color");
          let rain = world.getComponent(idl, "rain");
          rain = true;
          colorLoot = colors[0];
          world.setComponentValue(idl, "color", colorLoot);
          world.setComponentValue(idl, "rain", rain);
        }

        if (time >= timeLimit) {
          time = 0;
          world.setComponentValue(
            world.getEntities(["container"]),
            "cooldown",
            1
          );
          world.setComponentValue(world.getEntities(["container"]), "phase", 0);
          for (let idl of idL) {
            world.setComponentValue(idl, "rain", false);
          }
          const idr = world.getEntities(state);
          for (let i of idr) {
            world.destroyEntity(i);
          }
        }
      }
      colors = [];
    }
  });
};

export default allDuplicateRecipe;
