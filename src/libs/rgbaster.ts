import { colors } from '@/config/colors'

async function getDominantColor() {
  const FALLBACK_COLOR = colors['gh-dark']

  // if (!url) return FALLBACK_COLOR

  // const task = new Promise<string>((resolve, reject) => {
  //   analyze(url, { scale: 0.2 }).then((data) => {
  //     resolve(data[0].color)
  //   })
  // })

  // const _racer = new Promise<string>((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(FALLBACK_COLOR)
  //   }, 2000)
  // })

  // const value = await Promise.race([task, _racer])

  return FALLBACK_COLOR
}

export { getDominantColor }
