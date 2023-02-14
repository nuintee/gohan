import analyze from 'rgbaster'

async function getDominantColor(url: string) {
  if (!url) return

  const result = await analyze(url)
  const dominant = result[0].color
  return dominant
}

export { getDominantColor }
