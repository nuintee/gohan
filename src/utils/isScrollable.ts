export function isScrollable(element: Element | null) {
  if (!element) return false

  const hasScrollableContent = element.scrollHeight > element.clientHeight

  return hasScrollableContent
}
