export function isScrollable(element: Element | null) {
  if (element) {
    const hasScrollableContent = element.scrollHeight > element.clientHeight

    return hasScrollableContent
  }
}
