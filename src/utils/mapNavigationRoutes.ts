import { ROUTES } from '@/constants/routes'

type RouteKey = keyof typeof ROUTES
type RoutePath = typeof ROUTES[RouteKey]['path']

export const mapNavigationRoutes = (key: RouteKey | RoutePath) => {
  if (ROUTES.hasOwnProperty(key)) {
    // obj key
    return ROUTES[key as RouteKey]
  } else {
    if (key === '/') return ROUTES.HOME
    const foundKey = Object.keys(ROUTES).find((v) => {
      if (ROUTES[v as RouteKey].path !== '/') {
        return key.includes(ROUTES[v as RouteKey].path)
      }
    })
    return ROUTES[foundKey as RouteKey] || { label: key }
  }
}
