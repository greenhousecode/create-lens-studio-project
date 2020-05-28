import console from '../../helpers/console';

const getAudioFileName = ({ name: path }) => path.split('/').pop().split('.')[0];

export default class AudioManager {
  constructor({ audioFiles, volume }) {
    this.audio = audioFiles
      .filter((file) => file)
      .reduce((acc, audioFile) => {
        const name = getAudioFileName(audioFile);
        const sceneObject = global.scene.createSceneObject(name);
        const component = sceneObject.createComponent('AudioComponent');
        component.audioTrack = audioFile;
        component.volume = volume;

        return {
          ...acc,
          [name]: component,
        };
      }, {});
  }

  find = (name) => this.audio[name];
}
