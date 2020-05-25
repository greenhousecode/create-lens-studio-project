const globals = {
  print: true,
  script: true,
  global: true,
  getDeltaTime: true,
  getTime: true,
  isNull: true,
  quat: true,
  vec2: true,
  vec3: true,
  vec4: true,
  mat2: true,
  mat3: true,
  mat4: true,
  vec4b: true,
};

module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  globals,
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'new-cap': ['error', { newIsCapExceptions: Object.keys(globals) }],
    'no-unused-vars': ['warn', { varsIgnorePattern: 'console' }],
  },
};
