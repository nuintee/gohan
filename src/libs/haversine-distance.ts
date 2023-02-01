import h from 'haversine-distance'

type Point = Parameters<typeof h>[number]

const calculateDistance = (a: Point, b: Point, withUnit?: boolean) => {
  if (!a || !b) return ''

  const meter = h(a, b)
  const mile = meter * 0.000621371 //
  const killo = meter / 1000 //
  const yard = meter * 1.09361
  const auto = meter >= 1000 ? Math.round(killo) : Math.round(meter)

  const out = {
    meter: `${meter} ${withUnit && 'm'}`,
    mile: `${mile} ${withUnit && 'miles'}`,
    killo: `${killo} ${withUnit && 'km'}`,
    yard: `${yard} ${withUnit && 'yards'}`,
    auto: `${auto} ${withUnit && meter >= 1000 ? 'km' : 'm'}`,
  }
  return out
}

export default calculateDistance
