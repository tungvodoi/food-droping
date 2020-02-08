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
  let checkRightRotate = false;
  let checkLeftRotate = false;
  const rotateAngle = Math.PI / 20;
  const rotatePerDelta = Math.PI / 50;
  let rotate = 0;
  const context = world.context;

  world.setSystem(world => {
    const ids = world.getEntities(stateContainer);
    for (let id of ids) {
      const position = world.getComponent(id, "position");
      let width = world.getComponent(id, "width");
      let height = world.getComponent(id, "height");
      let ate = world.getComponent(id, "ate");
      let miss = world.getComponent(id, "miss");
      let colors = world.getComponent(id, "color");

      // zoom when ate
      // world.canvas.width / 3 is container original width
      if (ate && width <= world.canvas.width / 3 + world.canvas.width / 30) {
        width += 2;
        height += 2;
        world.setComponentValue(id, "width", width);
        world.setComponentValue(id, "height", height);
        if (width >= world.canvas.width / 3 + world.canvas.width / 30) {
          ate = false;
          world.setComponentValue(id, "ate", ate);
        }
      }
      if (!ate && width > world.canvas.width / 3) {
        width -= 2;
        height -= 2;
        world.setComponentValue(id, "width", width);
        world.setComponentValue(id, "height", height);
        if (width <= world.canvas.width / 3) {
          width = world.canvas.width / 3;
        }
      }

      // rotate when miss
      if (miss) {
        if (0 <= rotate && rotate < rotateAngle && !checkRightRotate) {
          rotate += rotatePerDelta;
          if (rotate >= rotateAngle) {
            checkRightRotate = true;
          }
        }
        if (checkRightRotate && rotate > -rotateAngle && !checkLeftRotate) {
          rotate -= rotatePerDelta;
          if (rotate <= -rotateAngle) {
            checkLeftRotate = true;
          }
        }
        if (checkLeftRotate) {
          rotate += rotatePerDelta;
          if (rotate >= 0) {
            checkLeftRotate = false;
            checkRightRotate = false;
            rotate = 0;
            miss = false;
            world.setComponentValue(id, "miss", miss);
          }
        }
      }

      //draw
      for (let color of colors) {
        context.save();
        context.fillStyle = color;
        context.translate(position.x, position.y);
        context.rotate(rotate);
        context.fillRect(-width / 2, -height / 2, width, height);
        context.restore();
      }
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
