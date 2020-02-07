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
  return id;
};

export const createLoot = (world, x, y) => {
  const id = world.createEntity();
  world.addComponent(id, "position", new Vector2(x, y));
  world.addComponent(id, "speed", 200);
  world.addComponent(id, "radius", 10);
  world.addComponent(id, "loot", true);
  world.addComponent(id, "dead", false);
  world.addComponent(id, "color", colors[Math.floor(Math.random() * 4) + 0]);
  return id;
};
