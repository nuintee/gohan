import analyze from 'rgbaster'

const FALLBACK_COLOR = 'black'

async function getDominantColor(url: string) {
  if (!url) return FALLBACK_COLOR

  const task = new Promise<string>((resolve, reject) => {
    analyze(url).then((data) => {
      resolve(data[0].color)
    })
  })

  const _racer = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      resolve(FALLBACK_COLOR)
    }, 500)
  })

  const value = await Promise.race([task, _racer])

  return value
}

export { getDominantColor }
