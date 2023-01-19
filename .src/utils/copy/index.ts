const copy = (text: string, onSuccessCopy: Function, onErrorCopy: Function) => {
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Async: Copying to clipboard was successful!')
      onSuccessCopy(text)
    },
    function (err) {
      console.log(err)
      onErrorCopy(err)
    },
  )
}

export default copy
