import { createLoot } from "../util/entitiesFactory";

export default function CreateDropLoot(world) {
  let drop = true;
  let i = 0;
  let d = Math.random() * 2;
  // console.log()
  const TYPES = ["loot", "cooldown", "delay"];
  world.setSystem(world => {
    const delta = world.getDelta();
    // console.log(delta + "dcm delta");
    if (drop) {
      let vX = Math.random() * 250 + 25;
      const ids = world.getEntities(TYPES);
      // console.log(ids);
      // for (let id of ids) {
      //   let delay = world.getComponent(id, "delay");
      //   let cooldown = world.getComponent(id, "cooldown");
      // cooldown += delta;
      // console.log(cooldown + "cooldown");
      // console.log(delay + "delay");

      i += delta;
      // console.log(i + "detal");
      if (i > d) {
        createLoot(world, vX, 100);
        i = 0;
        d = Math.random() * 2;
      }
      // if (cooldown >= delay) {

      //   cooldown = 0;
      // }
      // }
    }
  });
}
