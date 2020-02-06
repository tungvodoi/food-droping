const state = ["container"];

const renderContainer = world => {
  let context = world.context;
  world.setSystem(wolrd => {
    const ids = world.getEntities(state);
    for (let id of ids) {
      const position = world.getComponent(id, "position");
      const width = world.getComponent(id, "width");
      const height = world.getComponent(id, "height");
      context.fillStyle = "red";
      context.fillRect(position.x, position.y, width, height);
      // context.drawImage(image, position.x, position.y, width, height);
    }
  });
};

export default renderContainer;
