import { colors } from '@/config/colors'

async function getDominantColor() {
  const FALLBACK_COLOR = colors['gh-dark']

  return FALLBACK_COLOR
}

export { getDominantColor }
