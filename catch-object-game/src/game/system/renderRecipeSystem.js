const state = ["banner", "recipe"];

const renderRecipe = world => {
  const cwidth = world.canvas.width;
  const cheight = world.canvas.height;
  const context = world.context;
  world.setSystem(world => {
    const ids = world.getEntities(state);
    for (let id of ids) {
      const banner = world.getComponent(id, "banner");
      const recipe = world.getComponent(id, "recipe");
      //
      context.fillStyle = "green";
      context.fillRect(cwidth / 4, cheight / 6, cwidth / 2, cheight / 8);
      //
      context.fillSytle = "";
    }
  });
};

export default renderRecipe;
