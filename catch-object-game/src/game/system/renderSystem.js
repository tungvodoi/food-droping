const stateContainer = ["position", "width", "height", "container"];
const stateLoot = ["position", "radius", "loot", "color"];
export const renderContainer = world => {
  const context = world.context;
  world.setSystem(world => {
    const ids = world.getEntities(stateContainer);
    for (let id of ids) {
      const position = world.getComponent(id, "position");
      const width = world.getComponent(id, "width");
      const height = world.getComponent(id, "height");
      context.fillStyle = "red";
      context.fillRect(
        position.x - width / 2,
        position.y - height / 2,
        width,
        height
      );
    }
  });
};

export const renderLoot = world => {
  const context = world.context;
  world.setSystem(world => {
    const ids = world.getEntities(stateLoot);
    for (let id of ids) {
      const position = world.getComponent(id, "position");
      const radius = world.getComponent(id, "radius");
      let color = world.getComponent(id, "color");
      context.fillStyle = color;
      context.fillRect(
        position.x - radius / 2,
        position.y - radius / 2,
        radius,
        radius
      );
    }
  });
};
