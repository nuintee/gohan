import h from 'haversine-distance'

type Point = Parameters<typeof h>[number]

const calculateDistance = (a: Point, b: Point) => {
  const meter = h(a, b)
  return { meter }
}

export default calculateDistance
