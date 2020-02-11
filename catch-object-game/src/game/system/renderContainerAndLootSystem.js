const stateContainer = [
  "position",
  "width",
  "height",
  "container",
  "ate",
  "miss",
  "color"
];
const stateLoot = ["position", "radius", "loot", "color"];

export const renderContainer = world => {
  let checkRotateTwice = false;
  const rotateAngle = Math.PI / 20;
  let rotatePerDelta = Math.PI / 50;
  let rotate = 0;
  const context = world.context;
  let plusPerDelta = 2;
  // let scorePlusY =
  //   (world.canvas.height * 5) / 6 +
  //   world.canvas.height / 50 -
  //   world.canvas.width / 6;
  // let speed = 100;
  // let scoreY = 0;
  // let scoreX = 0;

  world.setSystem(world => {
    const ids = world.getEntities(stateContainer);
    for (let id of ids) {
      // const delta = world.getDelta();
      const position = world.getComponent(id, "position");
      let width = world.getComponent(id, "width");
      let height = world.getComponent(id, "height");
      let ate = world.getComponent(id, "ate");
      let miss = world.getComponent(id, "miss");
      let colors = world.getComponent(id, "color");
      // scorePlusY = ate_position.y - height / 2;
      // scoreX = position.x;
      // container zoom and +100 when ate
      // world.canvas.width / 3 is container original width
      for (let i = 0; i < ate.length; i++) {
        if (ate[i].check) {
          //draw +100
          context.font = "100% Arial";
          context.fillStyle = "rgba(0,0,0,1)";
          context.textAlign = "center";
          context.fillText(
            "+100",
            ate[i].position.x,
            ate[i].position.y - height / 2 - world.canvas.height / 12
          );
          // zoom
          if (
            width <= world.canvas.width / 3 + world.canvas.width / 30 &&
            width >= world.canvas.width / 3
          ) {
            width += plusPerDelta;
            height += plusPerDelta;
            world.setComponentValue(id, "width", width);
            world.setComponentValue(id, "height", height);
            if (width > world.canvas.width / 3 + world.canvas.width / 30) {
              plusPerDelta *= -1;
              width += plusPerDelta;
              height += plusPerDelta;
              world.setComponentValue(id, "width", width);
              world.setComponentValue(id, "height", height);
            }
            if (width < world.canvas.width / 3) {
              width = world.canvas.width / 3;
              height = world.canvas.width / 6;
              world.setComponentValue(id, "width", width);
              world.setComponentValue(id, "height", height);
              plusPerDelta = 2;
              ate[i].check = false;
              world.setComponentValue(id, "ate", ate);
            }
          }
        }
      }

      // rotate and -100 when miss
      for (let i = 0; i < miss.length; i++) {
        if (miss[i].check) {
          //draw -100
          context.font = "100% Arial";
          context.fillStyle = "rgba(0,0,0,1)";
          context.textAlign = "center";
          context.fillText(
            "-100",
            miss[i].position.x,
            miss[i].position.y - height / 2 - world.canvas.height / 12
          );
          if (-rotateAngle < rotate && rotate < rotateAngle) {
            rotate += rotatePerDelta;
            if (rotate >= rotateAngle) {
              rotatePerDelta *= -1;
              rotate += rotatePerDelta;
            }
            if (rotate <= -rotateAngle) {
              rotatePerDelta *= -1;
              rotate += rotatePerDelta;
              checkRotateTwice = true;
            }
            if (rotate >= 0 && checkRotateTwice) {
              checkRotateTwice = false;
              rotate = 0;
              miss[i].check = false;
              world.setComponentValue(id, "miss", miss);
            }
          }
        }
      }

      //draw
      context.save();
      context.fillStyle = colors[colors.length - 1];
      context.translate(position.x, position.y);
      context.rotate(rotate);
      context.fillRect(-width / 2, -height / 2, width, height);
      context.restore();
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
      // console.log(color);
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
