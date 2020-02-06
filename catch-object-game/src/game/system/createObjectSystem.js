import { createContainer } from "../util/entitiesFactory";

const createObject = world => {
  world.setSystem(world => {
    createContainer(world, 50, 50, 50, 50);
  });
};

export default createObject;
