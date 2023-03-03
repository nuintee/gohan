const _SERVERSIDE = ['getServersideProps', 'middleware']
const _STORYBOOK = ['wrapper', 'setUpWrapepr', 'Default', 'decorators', 'stories.(tsx|jsx|ts|js)']
const _DEFAULT = ['default']

const mathes = [..._SERVERSIDE, ..._STORYBOOK, ..._DEFAULT]

module.exports = {
  ignore: mathes.join('|'),
}
