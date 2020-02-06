import Vector2 from "gdxjs/lib/vector2";
const state = ["container"];
const TYPES = ["loot", "position", "cooldown", "delay"];
const color = ["#ffb69f", "#00848e", "#ebebed", "#800000", "#544d68"];
const renderSystem = world => {
  let context = world.context;
  world.setSystem(wolrd => {
    const ids = world.getEntities(state);
    for (let id of ids) {
      const position = world.getComponent(id, "position");
      const width = world.getComponent(id, "width");
      const height = world.getComponent(id, "height");
      context.fillStyle = "red";
      context.fillRect(position.x, position.y, width, height);
    }
  });
};

const renderLoots = world => {
  let context = world.context;
  world.setSystem(world => {
    const ids = world.getEntities(TYPES);
    for (const id of ids) {
      const p = world.getComponent(id, "position");
      // context.fillStyle = color[2];
      // let g = Math.floor(Math.random) * 4) + 0;
      let tp;
      // console.log(g);
      // for (let i = 0; i < color.length; i++) {
      //   if (i === g) {
      //     tp = color[i];
      //   }
      // }
      const vcl = () => {
        return color[Math.floor(Math.random() * 4 + 0)];
      };
      console.log(vcl() + "vcl");
      context.fillStyle = vcl();
      context.fillStyle = context.fillRect(p.x, p.y, 10, 10);
    }
  });
};

export { renderSystem, renderLoots };
