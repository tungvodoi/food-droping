import Vector2 from "gdxjs/lib/vector2";

const TYPES = ["loot", "position", "speed"];

const createPhysicsSystem = world => {
  const tmp = new Vector2();
  world.setSystem(world => {
    const ids = world.getEntities(TYPES);
    const delta = world.getDelta();
    for (let id of ids) {
      const sp = world.getComponent(id, "speed");
      const p = world.getComponent(id, "position");
      p.y += sp * delta;
    }
  });
};

export default createPhysicsSystem;
