import console from '../../helpers/console';

const getPrefabFileName = ({ name: path }) =>
  path
    .split('/')
    .pop()
    .split('.')[0];

export default class PrefabManager {
  constructor(prefabs = []) {
    this.prefabs = prefabs
      .filter(file => file)
      .reduce((acc, prefab) => {
        const name = getPrefabFileName(prefab);

        return {
          ...acc,
          [name]: prefab,
        };
      }, {});
  }

  find = name => this.prefabs[name];
}
