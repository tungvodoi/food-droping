import Vector2 from "gdxjs/lib/vector2";

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
    const inforC = takeContainerInfor(world);
    const inforR = takeRecipeInfo(world);
    const ids = world.getEntities(state2);
    console.log(inforC[0]);
    for (let id of ids) {
      const p = world.getComponent(id, "position");
      const radius = world.getComponent(id, "radius");
      const color = world.getComponent(id, "color");
      const rain = world.getComponent(id, "rain");
      let ate = world.getComponent(world.getEntities(["container"]), "ate");
      let miss = world.getComponent(world.getEntities(["container"]), "miss");
      // console.log(inforC[0]);
      if (
        p.x + radius / 2 >= inforC[0].x - inforC[1] / 2 &&
        p.x - radius / 2 <= inforC[0].x + inforC[1] / 2 &&
        p.y + radius / 2 >= inforC[0].y - inforC[2] / 2 &&
        p.y - radius / 2 <= inforC[0].y
      ) {
        console.log(1);
        world.destroyEntity(id);
        // select material on order board
        for (let i = inforR.colors.length - 1; i >= 0; i--) {
          if (inforR.colors[i] === color) {
            if (!inforR.selected[i]) {
              // console.log(rain);
              if (!rain) {
                inforC[4] -= 1;
              }
              world.setComponentValue(inforC[5], "phase", inforC[4]);
              world.setComponentValue(inforR.idr[i], "selected", true);
              // console.log(ate.length);
              // console.log(1);
              break;
            }
          }
        }
        //  check if take correct material
        for (let i = inforR.colors.length - 1; i >= 0; i--) {
          if (inforR.colors[i] === color) {
            ate.push({
              check: true,
              position: new Vector2(inforC[0].x, inforC[0].y)
            });
            bonuss = true;
            inforC[3] += 100;
            world.setComponentValue(inforC[5], "score", inforC[3]);
            world.setComponentValue(inforC[5], "ate", ate);
            inforC[7].push(color);
            world.setComponentValue(inforC[5], "color", inforC[7]);
            wrongColor = false;
            break;
          } else {
            wrongColor = true;
          }
        }

        // if wrong material
        if (wrongColor) {
          miss.push({
            check: true,
            position: new Vector2(inforC[0].x, inforC[0].y)
          });
          // console.log(miss);
          // console.log(1);
          world.setComponentValue(inforC[5], "miss", miss);
          wrongColor = false;
          wrongCount++;
          inforC[3] -= 100;
          if (inforC[3] < 0) {
            inforC[3] = 0;
          }
          world.setComponentValue(inforC[5], "score", inforC[3]);
          if (wrongCount === 3) {
            bonuss = false;
            if (!rain) {
              inforC[4] = 0;
              world.setComponentValue(inforC[5], "phase", inforC[4]);
            }
            // ci[3] -= 200;
            // world.setComponentValue(ci[5], "score", ci[3]);
          }
        }

        if (inforC[4] === 0) {
          if (bonuss) {
            inforC[3] += 200;
            world.setComponentValue(inforC[5], "score", inforC[3]);
            inforC[6] += 1;
            world.setComponentValue(inforC[5], "bonus", inforC[6]);
          }
          wrongCount = 0;
          world.setComponentValue(inforC[5], "phase", 0);
          for (let i = inforC[7].length - 1; i > 0; i--) {
            inforC[7].splice(i, 1);
          }
          world.setComponentValue(inforC[5], "color", inforC[7]);
          for (let i = 0; i < inforR.idr.length; i++) {
            world.destroyEntity(inforR.idr[i]);
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
