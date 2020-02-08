import Vector2 from "gdxjs/lib/vector2";
const colors = ["#ffb69f", "#00848e", "#ebebed", "#800000", "#544d68"];

export const createContainer = world => {
  const id = world.createEntity();
  world.addComponent(
    id,
    "position",
    new Vector2(
      world.canvas.width / 2,
      (world.canvas.height * 5) / 6 + world.canvas.height / 50
    )
  );
  world.addComponent(
    id,
    "target",
    new Vector2(
      world.canvas.width / 2,
      (world.canvas.height * 5) / 6 + world.canvas.height / 50
    )
  );
  world.addComponent(id, "speed", 1000);
  world.addComponent(id, "width", world.canvas.width / 3);
  world.addComponent(id, "height", world.canvas.width / 6);
  world.addComponent(id, "container", true);
  world.addComponent(id, "score", 0);
  world.addComponent(id, "phase", 0);
  world.addComponent(id, "time", 30);
  world.addComponent(id, "gamestate", "gamestart");
  world.addComponent(id, "newgame", false);
  world.addComponent(id, "bonus", 0);
  world.addComponent(id, "ate", false);
  world.addComponent(id, "miss", false);
  world.addComponent(id, "color", ["red"]);
  world.addComponent(id, "cooldown", 1);
  return id;
};

export const createLoot = world => {
  const id = world.createEntity();
  world.addComponent(
    id,
    "position",
    new Vector2(
      (Math.random() * world.canvas.width * 2) / 3 +
        (world.canvas.width * 1) / 6,
      (world.canvas.height * 1) / 3
    )
  );
  world.addComponent(id, "speed", 400);
  world.addComponent(id, "radius", world.canvas.width / 11);
  world.addComponent(id, "loot", true);
  world.addComponent(id, "color", colors[Math.floor(Math.random() * 4) + 0]);
  return id;
};

export const createRecipe = (world, x, y) => {
  const id = world.createEntity();
  world.addComponent(id, "recipe", true);
  world.addComponent(id, "position", new Vector2(x, y));
  world.addComponent(id, "target", new Vector2(0, 0));
  world.addComponent(id, "speed", 100);
  world.addComponent(id, "radius", world.canvas.width / 11);
  world.addComponent(id, "color", colors[Math.floor(Math.random() * 4) + 0]);
  world.addComponent(id, "selected", false);
  return id;
};
