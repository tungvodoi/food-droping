const state = ["position", "height", "width", "container", "score", "phase"];
const state2 = ["position", "radius", "loot"];

const takeContainerInfor = world => {
  const idC = world.getEntities(state);
  for (let id of idC) {
    const pC = world.getComponent(id, "position");
    const height = world.getComponent(id, "height");
    const width = world.getComponent(id, "width");
    const score = world.getComponent(id, "score");
    const phase = world.getComponent(id, "phase");
    return [pC, width, height, score, phase];
  }
};

const summationSystem = world => {
  const ci = takeContainerInfor(world);
  world.setSystem(world => {
    console.log(ci[4]);
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
        ci[4] -= 1;
        console.log(ci[4]);
        world.setComponentValue(0, "phase", ci[4]);
      }
    }
  });
};
export default summationSystem;
