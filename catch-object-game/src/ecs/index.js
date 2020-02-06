export default () => {
  const World = {};

  let currentId = -1;
  let currentDelta = 0;

  const components = {};
  const entities = {};
  const activeSystems = [];
  const passiveSystems = [];

  World.createEntity = () => {
    const id = ++currentId;
    entities[id] = [];
    return id;
  };
  World.destroyEntity = id => {
    const types = entities[id];
    for (let type of types) {
      delete components[type][id];
    }
    delete entities[id];
  };
  World.isActive = id => !!entities[id];

  World.addComponent = (id, type, data) => {
    if (!components[type]) {
      components[type] = {};
    }
    entities[id].push(type);
    components[type][id] = data;
  };

  World.setComponentValue = (id, type, data) => {
    components[type][id] = data;
  };

  World.setSystem = (system, active = true) => {
    if (active) {
      activeSystems.push(system);
    } else {
      passiveSystems.push(system);
    }
  };

  World.setDelta = delta => (currentDelta = delta);
  World.getDelta = () => currentDelta;

  World.process = () => {
    for (let system of activeSystems) {
      system(World);
    }
  };

  World.getActiveSystem = () => activeSystems;
  World.getPassiveSystem = () => passiveSystems;

  World.hasComponent = (id, type) => entities[id].includes(type);
  World.getComponent = (id, type) => components[type][id];

  let compatibleEntities = [];
  World.getEntities = types => {
    // TODO: fix this, slow
    compatibleEntities.length = 0;
    for (let id in entities) {
      const entity = entities[id];
      let compatible = true;
      for (let type of types) {
        if (!entity.includes(type)) {
          compatible = false;
          break;
        }
      }
      if (compatible) {
        compatibleEntities.push(id);
      }
    }
    return compatibleEntities;
  };

  return World;
};
