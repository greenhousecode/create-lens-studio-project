import console from '../console';
import { handleObjectPrefab, handleComponent, handleSceneObject } from './handlers';

const handlers = {
  'Asset.ObjectPrefab': handleObjectPrefab,
  Component: handleComponent,
  SceneObject: handleSceneObject,
};

const duplicator = (input, options = {}) => {
  if (!input) {
    throw new Error(
      'Please provide a Component, Scene Object or Prefab as the first parameter in method duplicate.',
    );
  }

  try {
    return handlers[input.getTypeName()](input, options);
  } catch (e) {
    return console.log(`Error trying to duplicate: ${e.message}`);
  }
};

export default duplicator;
