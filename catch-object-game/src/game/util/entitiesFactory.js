import Vector2 from "gdxjs/lib/vector2";

export const createContainer = (world, x, y, tx, ty) => {
  const id = world.createEntity();
  world.addComponent(id, "position", new Vector2(x, y));
  world.addComponent(id, "target", new Vector2(tx, ty));
  world.addComponent(id, "speed", 200);
  world.addComponent(id, "width", 10);
  world.addComponent(id, "height", 5);
};

export const createLoot = (world, x, y, tx, ty) => {
  const id = world.createEntity();
  world.addComponent(id, "position", new Vector2(x, y));
  world.addComponent(id, "target", new Vector2(tx, ty));
  world.addComponent(id, "speed", 200);
  world.addComponent(id, "radius", 5);
};
