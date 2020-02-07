const state = ["score", "time", "container"];

const renderEnviroment = world => {
  const w = world.canvas.width;
  const h = world.canvas.height;
  const context = world.context;
  world.setSystem(world => {
    const ids = world.getEntities(state);
    for (let id of ids) {
      const score = world.getComponent(id, "score");
      const time = world.getComponent(id, "time");

      // draw  board
      context.fillStyle = "red";
      context.fillRect(0, 0, w, h / 6);

      //draw order board
      context.fillStyle = "green";
      context.fillRect(w / 4, h / 6, w / 2, h / 8);

      // draw brand image
      context.fillStyle = "yellow";
      context.fillRect(w / 3, h / 18, w / 3, h / 14);

      // draw scoreBoard
      context.fillStyle = "yellow";
      context.fillRect(w / 24, h / 18, w / 4, h / 14);
      context.font = "25px Arial";
      context.fillStyle = "black";
      context.textAlign = "center";
      context.fillText(`${score}`, w / 24 + w / 8, h / 18 + h / 14 - 5); // 5 la vi tri tuong doi

      //draw timeBoard
      context.fillStyle = "yellow";
      context.fillRect((w * 23) / 24 - w / 4, h / 18, w / 4, h / 14);
      context.font = "25px Arial";
      context.fillStyle = "black";
      context.textAlign = "center";
      context.fillText(
        `${time}`,
        (w * 23) / 24 - w / 4 + w / 8,
        h / 18 + h / 14 - 5
      );

      // draw desk
      context.fillStyle = "green";
      context.fillRect(0, (h * 5) / 6, w, h / 6);
    }
  });
};

export default renderEnviroment;
