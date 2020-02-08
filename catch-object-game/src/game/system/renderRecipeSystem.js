const state = ["recipe", "position", "radius", "color", "selected"];

const renderRecipe = world => {
  // const cwidth = world.canvas.width;
  // const cheight = world.canvas.height;
  // const delta = world.getDelta();
  const context = world.context;
  world.setSystem(world => {
    // const idc = world.getEntities(["container"]);
    const ids = world.getEntities(state);
    for (let id of ids) {
      const position = world.getComponent(id, "position");
      const radius = world.getComponent(id, "radius");
      const color = world.getComponent(id, "color");
      const selected = world.getComponent(id, "selected");

      context.fillStyle = color;
      context.fillRect(position.x, position.y, radius, radius);

      if (selected) {
        context.beginPath();
        context.arc(
          position.x + radius / 2,
          position.y + radius / 2,
          radius / 2,
          0,
          2 * Math.PI
        );
        context.stroke();
      }
    }
  });
};

export default renderRecipe;
