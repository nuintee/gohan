export default function formatTimeString(time?: string) {
  if (!time) return time
  return time.substring(0, 2) + ':' + time.substring(2)
}
