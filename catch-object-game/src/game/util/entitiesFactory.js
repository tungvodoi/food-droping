import Vector2 from "gdxjs/lib/vector2";
const colors = ["#ffb69f", "#00848e", "#ebebed", "#800000", "#544d68"];

export const createContainer = (world, x, y, tx, ty) => {
  const id = world.createEntity();
  world.addComponent(id, "position", new Vector2(x, y));
  world.addComponent(id, "target", new Vector2(tx, ty));
  world.addComponent(id, "speed", 600);
  world.addComponent(id, "width", 100);
  world.addComponent(id, "height", 50);
  world.addComponent(id, "container", true);
  world.addComponent(id, "score", 0);
  world.addComponent(id, "phase", 0);
  world.addComponent(id, "time", 60);
  return id;
};

export const createLoot = (world, x, y) => {
  const id = world.createEntity();
  world.addComponent(id, "position", new Vector2(x, y));
  world.addComponent(id, "speed", 200);
  world.addComponent(id, "radius", 30);
  world.addComponent(id, "loot", true);
  world.addComponent(id, "color", colors[Math.floor(Math.random() * 4) + 0]);
  return id;
};
// let i = 0;
const arr = [];

export const createRecipe = (world, x, y) => {
  // let dcm = colors[Math.floor(Math.random() * 4) + 0];
  let b;

  b = colors[Math.floor(Math.random() * 4) + 0];
  if (arr.length === 3) {
    arr.length = 0;
  }
  if (arr.length <= 0) {
    arr.push(b);
  }
  for (const item in arr) {
    if (item === b) {
      b = colors[Math.floor(Math.random() * 4) + 0];
    } else {
      arr.push(b);
    }
  }

  console.log(b);

  const id = world.createEntity();
  world.addComponent(id, "recipe", {
    position: new Vector2(x, y),
    target: new Vector2(0, 0),
    speed: 100,
    radius: 30,
    // color: colors[Math.floor(Math.random() * 4) + 0]
    color: b
  });
  return id;
};
