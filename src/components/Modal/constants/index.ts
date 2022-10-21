const placeholders = {
  title: 'You have to sign in',
  sub: 'Liking restaurants',
  button: {
    cancel: {
      label: 'Cancel',
      onClick: () => {},
    },
    proceed: {
      label: 'GO',
      onClick: () => {},
    },
  },
}

const dictionary = {
  consent: {
    like: {
      title: 'You have to sign in',
      sub: 'Liking restaurants',
      button: {
        cancel: {
          label: 'Cancel',
          onClick: () => {},
        },
        proceed: {
          label: 'Singin',
          onClick: () => {},
        },
      },
    },
    navigate: {
      title: 'Are you sure?',
      sub: 'Finish navigation',
      button: {
        cancel: {
          label: 'Cancel',
          onClick: () => {},
        },
        proceed: {
          label: 'Finish',
          onClick: () => {},
        },
      },
    },
    'delete-account': {
      title: 'Are you sure?',
      sub: 'Deleting account',
      button: {
        cancel: {
          label: 'Cancel',
          onClick: () => {},
        },
        proceed: {
          label: 'Delete account',
          onClick: () => {},
        },
      },
    },
    singout: {
      title: 'Are you sure?',
      sub: 'Signing out?',
      button: {
        cancel: {
          label: 'Cancel',
          onClick: () => {},
        },
        proceed: {
          label: 'Sinout',
          onClick: () => {},
        },
      },
    },
  },
}

const users = [
  {
    label: 'Name',
    value: '',
  },
  {
    label: 'Email',
    value: '',
    action: {
      label: 'Change',
      onClick: () => {
        console.log(1)
      },
    },
  },
  {
    label: 'Password',
    type: 'password',
    value: 'AAAA',
    action: {
      label: 'Change',
      onClick: () => {
        console.log(2)
      },
    },
    disabled: true,
  },
]

export { dictionary, placeholders, users }
