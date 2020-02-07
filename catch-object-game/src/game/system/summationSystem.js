const state = ["position", "height", "width", "container", "score", "phase"];
const state2 = ["position", "radius", "loot", "color"];
const state3 = ["recipe", "color", "selected"];

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

const takeRecipeInfo = world => {
  const ids = world.getEntities(state3);
  let info = { id: [], colors: [], selected: [] };
  for (let id of ids) {
    const color = world.getComponent(id, "color");
    const sl = world.getComponent(id, "selected");
    // console.log(sl);
    info.colors.push(color);
    info.selected.push(sl);
    info.id.push(id);
  }
  return info;
};

const summationSystem = world => {
  let wrongColor = false;
  let wrongCount = 0;
  world.setSystem(world => {
    const ci = takeContainerInfor(world);
    const infoR = takeRecipeInfo(world);
    const ids = world.getEntities(state2);
    for (let id of ids) {
      const p = world.getComponent(id, "position");
      const radius = world.getComponent(id, "radius");
      const color = world.getComponent(id, "color");
      if (
        p.x + radius / 2 >= ci[0].x - ci[1] / 2 &&
        p.x - radius / 2 <= ci[0].x + ci[1] / 2 &&
        p.y + radius / 2 >= ci[0].y - ci[2] / 2 &&
        p.y - radius / 2 <= ci[0].y + ci[2] / 2
      ) {
        world.destroyEntity(id);
        // select material on order board
        for (let i = 0; i < infoR.colors.length; i++) {
          if (infoR.colors[i] === color) {
            if (!infoR.selected[i]) {
              ci[4] -= 1;
              world.setComponentValue(0, "phase", ci[4]);
              world.setComponentValue(infoR.id[i], "selected", true);
              break;
            }
          }
        }
        //  check if take correct material
        for (let i = 0; i < infoR.colors.length; i++) {
          if (infoR.colors[i] === color) {
            ci[3] += 100;
            world.setComponentValue(0, "score", ci[3]);
            wrongColor = false;
            break;
          } else {
            wrongColor = true;
          }
        }
        // if wrong material
        if (wrongColor) {
          wrongColor = false;
          wrongCount++;
          ci[3] -= 100;
          if (ci[3] < 0) {
            ci[3] = 0;
          }
          world.setComponentValue(0, "score", ci[3]);
          if (wrongCount === 3) {
            wrongCount = 0;
            ci[4] = 0;
          }
        }

        if (ci[4] === 0) {
          world.setComponentValue(0, "phase", 0);
          for (let i = 0; i < infoR.id.length; i++) {
            world.destroyEntity(infoR.id[i]);
          }
        }
      }
      if (p.y >= world.canvas.height) {
        world.destroyEntity(id);
      }
    }
  });
};
export default summationSystem;
