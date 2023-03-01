import { ROUTES } from '@/constants/routes'

type RouteKey = keyof typeof ROUTES
type RoutePath = typeof ROUTES[RouteKey]['path']

export const mapNavigationRoutes = (key: RouteKey | RoutePath) => {
  if (ROUTES.hasOwnProperty(key)) {
    // obj key
    return ROUTES[key as RouteKey]
  } else {
    // path
    const foundKey = Object.keys(ROUTES).find((v) => ROUTES[v]['path'] === key)
    return ROUTES[(foundKey as RouteKey) || 'HOME']
  }
}
