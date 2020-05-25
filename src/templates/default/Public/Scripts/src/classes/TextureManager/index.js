import console from '../../helpers/console';

export default class TextureManager {
  constructor(textures) {
    this.textures = textures.reduce((acc, texture) => {
      return {
        ...acc,
        [texture.name]: texture,
      };
    }, {});
  }

  find = toBeFound => {
    const [match] = Object.keys(this.textures).filter(name => name.includes(toBeFound));
    return match ? this.textures[match] : null;
  };
}
