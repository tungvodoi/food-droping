import { createContainer } from "../util/entitiesFactory";
const state = ["container", "gamestate", "time", "newgame"];

const gameStates = world => {
  const ids = world.getEntities(state);
  for (let id of ids) {
    let gameState = world.getComponent(id, "gamestate");
    let time = world.getComponent(id, "time");
    let newgame = world.getComponent(id, "newgame");
    if (time === 0) {
      gameState = "gameover";
      for (let idr of world.getEntities(["recipe"])) {
        world.destroyEntity(idr);
      }
      for (let idl of world.getEntities(["loot"])) {
        world.destroyEntity(idl);
      }
    } else {
      gameState = "gameprocess";
    }

    if (newgame === true) {
      world.destroyEntity(id);
      createContainer(world);
      newgame = false;
    }

    world.setComponentValue(id, "gamestate", gameState);
    world.setComponentValue(id, "time", time);
    world.setComponentValue(id, "newgame", newgame);
  }
};

export default gameStates;
