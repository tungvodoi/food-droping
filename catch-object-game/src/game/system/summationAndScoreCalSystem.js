const state = [
  "position",
  "height",
  "width",
  "container",
  "score",
  "phase",
  "bonus",
  "ate",
  "color"
];
const state2 = ["position", "radius", "loot", "color"];
const state3 = ["recipe", "color", "selected"];

const takeContainerInfor = world => {
  const idC = world.getEntities(state);
  for (let id of idC) {
    // console.log(id);
    const pC = world.getComponent(id, "position");
    const height = world.getComponent(id, "height");
    const width = world.getComponent(id, "width");
    const score = world.getComponent(id, "score");
    const phase = world.getComponent(id, "phase");
    const bonus = world.getComponent(id, "bonus");
    const color = world.getComponent(id, "color");
    return [pC, width, height, score, phase, id, bonus, color];
  }
};

const takeRecipeInfo = world => {
  const ids = world.getEntities(state3);
  let info = { idr: [], colors: [], selected: [] };
  for (let id of ids) {
    const color = world.getComponent(id, "color");
    const sl = world.getComponent(id, "selected");
    info.colors.push(color);
    info.selected.push(sl);
    info.idr.push(id);
  }
  return info;
};

const summationSystem = world => {
  let wrongColor = false;
  let wrongCount = 0;
  let bonuss = true;
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
        p.y - radius / 2 <= ci[0].y
      ) {
        world.destroyEntity(id);
        // select material on order board
        for (let i = infoR.colors.length - 1; i >= 0; i--) {
          if (infoR.colors[i] === color) {
            if (!infoR.selected[i]) {
              ci[4] -= 1;
              world.setComponentValue(ci[5], "phase", ci[4]);
              world.setComponentValue(infoR.idr[i], "selected", true);
              break;
            }
          }
        }
        //  check if take correct material
        for (let i = infoR.colors.length - 1; i >= 0; i--) {
          if (infoR.colors[i] === color) {
            bonuss = true;
            ci[3] += 100;
            world.setComponentValue(ci[5], "score", ci[3]);
            world.setComponentValue(ci[5], "ate", true);
            ci[7].push(color);
            world.setComponentValue(ci[5], "color", ci[7]);
            wrongColor = false;
            break;
          } else {
            wrongColor = true;
          }
        }
        // if wrong material
        if (wrongColor) {
          world.setComponentValue(ci[5], "miss", true);
          wrongColor = false;
          wrongCount++;
          ci[3] -= 100;
          if (ci[3] < 0) {
            ci[3] = 0;
          }
          world.setComponentValue(ci[5], "score", ci[3]);
          if (wrongCount === 3) {
            bonuss = false;
            ci[4] = 0;
            // ci[3] -= 200;
            // world.setComponentValue(ci[5], "score", ci[3]);
          }
        }

        if (ci[4] === 0) {
          if (bonuss) {
            ci[3] += 200;
            world.setComponentValue(ci[5], "score", ci[3]);
            ci[6] += 1;
            world.setComponentValue(ci[5], "bonus", ci[6]);
          }
          wrongCount = 0;
          world.setComponentValue(ci[5], "phase", 0);
          for (let i = 0; i < infoR.idr.length; i++) {
            world.destroyEntity(infoR.idr[i]);
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
