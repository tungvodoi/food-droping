const state = ["container", "score", "bonus"];

const renderEndScreen = world => {
  const width = world.canvas.width;
  const height = world.canvas.height;
  const context = world.context;
  const ids = world.getEntities(state);
  for (let id of ids) {
    const score = world.getComponent(id, "score");
    // const bonus = world.getComponent(id, "bonus");

    // background
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    // result board
    context.fillStyle = "yellow";
    context.fillRect(width / 10, height / 5, (width * 4) / 5, (height * 2) / 3);
    // result

    context.font = "25px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText(
      `${score}`,
      width / 10 + (width * 4) / 5 / 2,
      height / 5 + (height * 2) / 3 / 2
    );
  }
};

export default renderEndScreen;
