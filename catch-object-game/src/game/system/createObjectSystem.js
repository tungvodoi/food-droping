import { createContainer } from "../util/entitiesFactory";

const createObject = world => {
  world.setSystem(world => {
    createContainer(world, 5, 5, 5, 5);
  });
};

export default createObject;
