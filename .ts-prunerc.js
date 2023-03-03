const _SERVERSIDE = ['getServersideProps', 'middleware']
const _STORYBOOK = ['wrapper', 'setUpWrapepr', 'Default', 'decorators', 'stories.(tsx|jsx|ts|js)']
const _DEFAULT = ['default']

const matches = [..._SERVERSIDE, ..._STORYBOOK, ..._DEFAULT]

module.exports = {
  ignore: matches.join('|'),
}
