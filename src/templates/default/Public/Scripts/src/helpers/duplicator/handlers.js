import console from '../console';

const isSceneObject = input => input.getTypeName() === 'SceneObject';

const getScene = (input, { newParent }) => {
  if (newParent && isSceneObject(newParent)) return newParent;
  if (newParent && typeof newParent.getSceneObject === 'function')
    return newParent.getSceneObject();

  if (isSceneObject(input)) return input;
  if (typeof input.getSceneObject === 'function') return input.getSceneObject();

  return script;
};

export const handleObjectPrefab = (input, options) => input.instantiate(getScene(input, options));

export const handleComponent = (input, options) => getScene(input, options).copyComponent(input);

export const handleSceneObject = (input, options) =>
  getScene(input, options).copyWholeHierarchy(input);
