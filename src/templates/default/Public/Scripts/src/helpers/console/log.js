function replacer(key, value) {
  if (value && typeof value.getTypeName === 'function') {
    return `[ ${value.name || 'Unnamed'} ] ${value.getTypeName() || value.toString()}`;
  }

  return value;
}

export default function (...args) {
  const arrayOfStrings = [...args].map((arg) => {
    if (typeof arg === 'object') {
      if (arg instanceof vec3 || arg instanceof vec2 || arg instanceof vec4) return arg.toString();
      return JSON.stringify(arg, replacer, 4);
    }

    if (typeof arg === 'undefined') {
      return typeof arg;
    }

    return arg;
  });

  // eslint-disable-next-line no-restricted-globals
  print(arrayOfStrings.join(' '));
}
