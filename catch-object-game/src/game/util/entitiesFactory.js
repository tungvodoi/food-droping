import Vector2 from "gdxjs/lib/vector2";
// const loadImage = url =>
//   new Promise(resolve => {
//     const image = new Image();
//     image.onload = () => resolve(image);
//     image.src = url;
//   });
export const createContainer = (world, x, y, tx, ty) => {
  const id = world.createEntity();
  world.addComponent(id, "position", new Vector2(x, y));
  world.addComponent(id, "target", new Vector2(tx, ty));
  world.addComponent(id, "speed", 200);
  world.addComponent(id, "width", 100);
  world.addComponent(id, "height", 50);
  world.addComponent(id, "container", true);
  return id;
};

export const createLoot = (world, x, y) => {
  const id = world.createEntity();
  world.addComponent(id, "position", new Vector2(x, y));
  world.addComponent(id, "speed", 100);
  world.addComponent(id, "radius", 5);
  world.addComponent(id, "loot", true);
  world.addComponent(id, "cooldown", 0);
  world.addComponent(id, "delay", Math.floor(Math.random() * 2) + 1);
  return id;
};
