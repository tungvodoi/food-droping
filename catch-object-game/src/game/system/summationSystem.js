const state = ["position", "height", "width", "container", "score"];
const state2 = ["position", "radius", "loot"];

const takeContainerInfor = world => {
  const idC = world.getEntities(state);
  for (let id of idC) {
    const pC = world.getComponent(id, "position");
    const height = world.getComponent(id, "height");
    const width = world.getComponent(id, "width");
    const score = world.getComponent(id, "score");
    return [pC, width, height, score];
  }
};

const summationSystem = world => {
  const ci = takeContainerInfor(world);
  world.setSystem(world => {
    const ids = world.getEntities(state2);
    for (let id of ids) {
      const p = world.getComponent(id, "position");
      const radius = world.getComponent(id, "radius");
      if (
        p.x + radius / 2 >= ci[0].x - ci[1] / 2 &&
        p.x - radius / 2 <= ci[0].x + ci[1] / 2 &&
        p.y + radius / 2 >= ci[0].y - ci[2] / 2
      ) {
        world.destroyEntity(id);
        ci[3] += 100;
        world.setComponentValue(0, "score", ci[3]);
      }
    }
  });
};
export default summationSystem;
