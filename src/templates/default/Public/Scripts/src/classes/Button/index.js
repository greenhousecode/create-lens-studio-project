import console from '../../helpers/console';

function safeGetComponent(obj, componentType) {
  return obj.getComponentCount(componentType) > 0 ? obj.getFirstComponent(componentType) : null;
}

function getOrAddComponent(obj, componentType) {
  return safeGetComponent(obj, componentType) || obj.createComponent(componentType);
}

export default class Button {
  constructor({ sceneObject }) {
    this.sceneObject = sceneObject;

    const touchComponent = getOrAddComponent(sceneObject, 'Component.TouchComponent');
    const meshVisual = getOrAddComponent(sceneObject, 'Component.MeshVisual');
    const targetScript = sceneObject.createComponent('Component.ScriptComponent');

    touchComponent.addMeshVisual(meshVisual);

    targetScript.createEvent('TouchStartEvent').bind(data => {
      this.callbacks.forEach(callback => {
        if (typeof callback === 'function') callback(data);
      });
    });

    this.reset();
  }

  setTexture = texture => {
    const imageComponent = getOrAddComponent(this.sceneObject, 'Component.Image');
    imageComponent.mainPass.baseTex = texture;
    return this;
  };

  reset = () => {
    this.callbacks = [];
    return this;
  };

  onTap = callback => {
    this.callbacks.push(callback);
    return this;
  };
}
