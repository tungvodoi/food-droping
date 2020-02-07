const state = ["recipe"];

const renderRecipe = world => {
  const cwidth = world.canvas.width;
  const cheight = world.canvas.height;
  const context = world.context;
  world.setSystem(world => {
    const ids = world.getEntities(state);
    for (let id of ids) {
      const recipe = world.getComponent(id, "recipe");

      context.fillStyle = recipe.color;
      context.fillRect(
        recipe.position.x,
        recipe.position.y,
        recipe.radius,
        recipe.radius
      );
    }
  });
};

export default renderRecipe;
