const state = ["position", "height", "container"];
const state2 = ["position", "radius", "loot"];

const takeContainerPosition = world => {
  const idC = world.getEntities(state);
  for (let id of idC) {
    const pC = world.getComponent(id, "position");
    const containerHeight = world.getComponent(id, "height");
    return [pC, containerHeight];
  }
};

const summationSystem = world => {
  const cInfor = takeContainerPosition(world);
  world.setSystem(world => {
    const ids = world.getEntities(state2);
    for (let id of ids) {
      const p = world.getComponent(id, "position");
      const radius = world.getComponent(id, "radius");
      if (cInfor[0].distance(p) <= radius / 2 + cInfor[1] / 2) {
        world.destroyEntity(id);
      }
    }
  });
};
export default summationSystem;
