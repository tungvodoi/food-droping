import { createContainer } from "../util/entitiesFactory";

export const createObject = world => {
  world.setSystem(world => {
    createContainer(world, 5, 5, 5, 5);
  });
};
