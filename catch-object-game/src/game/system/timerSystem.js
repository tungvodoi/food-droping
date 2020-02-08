const state = ["container", "time"];

const setTimer = world => {
  let countTimer = 0;
  world.setSystem(world => {
    const delta = world.getDelta();
    const ids = world.getEntities(state);
    for (let id of ids) {
      let time = world.getComponent(id, "time");
      countTimer += delta;
      if (countTimer >= 1) {
        countTimer -= 1;
        time -= 1;
        if (time < 0) {
          time = 0;
        }
        world.setComponentValue(id, "time", time);
      }
    }
  });
};

export default setTimer;
