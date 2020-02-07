const state = ["recipe", "position", "radius", "color"];

const renderRecipe = world => {
  // const cwidth = world.canvas.width;
  // const cheight = world.canvas.height;
  const context = world.context;
  world.setSystem(world => {
    const ids = world.getEntities(state);
    for (let id of ids) {
      const position = world.getComponent(id, "position");
      const radius = world.getComponent(id, "radius");
      const color = world.getComponent(id, "color");

      context.fillStyle = color;
      context.fillRect(position.x, position.y, radius, radius);
    }
  });
};

export default renderRecipe;
