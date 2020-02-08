const state = ["container", "newgame", "gamestate"];

const inputSystem = world => {
  const ids = world.getEntities(state);
  for (let id of ids) {
    let newgame = world.getComponent(id, "newgame");
    const gamestate = world.getComponent(id, "gamestate");
    document.addEventListener("keydown", e => {
      if (e.keyCode === 13) {
        if (gamestate === "gameover") {
          newgame = true;
          world.setComponentValue(id, "newgame", newgame);
        }
      }
    });
    document.addEventListener("touchstart", () => {
      if (gamestate === "gameover") {
        newgame = true;
        world.setComponentValue(id, "newgame", newgame);
      }
    });
  }
};

export default inputSystem;
