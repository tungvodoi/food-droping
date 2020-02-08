const state = ["loot", "position", "speed"];
const lootPhysicalSystem = world => {
  world.setSystem(world => {
    const ids = world.getEntities(state);
    const delta = world.getDelta();
    for (let id of ids) {
      const p = world.getComponent(id, "position");
      const s = world.getComponent(id, "speed");
      p.y += delta * s;
    }
  });
};

export default lootPhysicalSystem;
