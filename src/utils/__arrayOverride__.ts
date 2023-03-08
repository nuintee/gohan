Array.prototype.random = function () {
  const length = this.length

  if (length <= 0) return ''

  return this[Math.floor(Math.random() * (length - 1))]
}
