import Vector2 from "gdxjs/lib/vector2";
const state = ["container", "position", "target", "speed"];

const containerPhysicalSystem = world => {
  const tmp = new Vector2();
  world.setSystem(world => {
    const ids = world.getEntities(state);
    const delta = world.getDelta();
    for (let id of ids) {
      const p = world.getComponent(id, "position");
      const t = world.getComponent(id, "target");
      const speed = world.getComponent(id, "speed");
      tmp
        .setVector(t)
        .subVector(p)
        .nor()
        .scale(delta * speed);
      if (tmp.len2() >= t.distanceSqr(p)) {
        p.setVector(t);
      } else {
        p.addVector(tmp);
      }
    }
  });
};

export default containerPhysicalSystem;
