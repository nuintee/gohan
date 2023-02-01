import h from 'haversine-distance'

type Point = Parameters<typeof h>[number]

const calculateDistance = (a: Point, b: Point) => {
  const meter = Math.floor(h(a, b))
  const mile = meter * 0.000621371 //
  const killo = meter / 1000 //
  const yard = meter * 1.09361
  const auto = meter >= 1000 ? killo : meter
  return { meter, mile, killo, yard, auto }
}

export default calculateDistance
