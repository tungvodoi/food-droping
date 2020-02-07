const state = ["loot", "position", "radius"];

const deleteLoot = world => {
  const canvas = world.canvas;
  world.setSystem(world => {
    const ids = world.getEntities(state);
    for (let id of ids) {
      const p = world.getComponent(id, "position");
      const r = world.getComponent(id, "radius");
      if (p.y - r / 2 >= canvas.height) {
        world.destroyEntity(id);
      }
    }
  });
};

export default deleteLoot;
