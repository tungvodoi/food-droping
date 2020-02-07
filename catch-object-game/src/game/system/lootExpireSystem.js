const createBulletExpireSystem = world => {
  const BULLET_TYPES = ["loot"];
  world.setSystem(world => {
    const ids = world.getEntities(BULLET_TYPES);
    const delta = world.getDelta();
    for (let id of ids) {
      const bullet = world.getComponent(id, "loot");
      bullet.lifespan += delta;
      if (bullet.lifespan >= bullet.expire) {
        world.destroyEntity(id);
      }
    }
  });
};

export default createBulletExpireSystem;
