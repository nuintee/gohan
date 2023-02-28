import { colors } from '@/config/colors'
import analyze from 'rgbaster'

const COLOR_RANGE = [
  colors['gh-dark'],
  colors['gh-l-blue'],
  colors['gh-l-green'],
  colors['gh-l-orange'],
]
const FALLBACK_COLOR = COLOR_RANGE.random()

async function getDominantColor(url: string) {
  if (!url) return FALLBACK_COLOR

  const task = new Promise<string>((resolve, reject) => {
    analyze(url, { scale: 0.2 }).then((data) => {
      resolve(data[0].color)
    })
  })

  const _racer = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      resolve(FALLBACK_COLOR)
    }, 2000)
  })

  const value = await Promise.race([task, _racer])

  return value
}

export { getDominantColor }
