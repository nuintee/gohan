export interface DirectionsAPI {
  routes: Route[]
  code: string
  uuid: string
}

export interface Route {
  geometry: string
  waypoints: Waypoint[]
  legs: Leg[]
  weight_name: string
  weight: number
  duration: number
  distance: number
}

export interface Waypoint {
  name: string
  location: number[]
}

export interface Leg {
  summary: string
  weight: number
  duration: number
  steps: Step[]
  distance: number
}

export interface Step {
  intersections: Intersection[]
  driving_side: string
  geometry: string
  mode: string
  maneuver: Maneuver
  ref?: string
  weight: number
  duration: number
  name: string
  distance: number
  voiceInstructions: VoiceInstruction[]
  bannerInstructions: BannerInstruction[]
}

export interface Intersection {
  out?: number
  in?: number
  entry: boolean[]
  bearings: number[]
  location: number[]
}

export interface Maneuver {
  bearing_after: number
  bearing_before: number
  location: number[]
  modifier?: string
  type: string
  instruction: string
}

export interface VoiceInstruction {
  distanceAlongGeometry: number
  announcement: string
  ssmlAnnouncement: string
}

export interface BannerInstruction {
  distanceAlongGeometry: number
  primary: Primary
  secondary?: Secondary
  sub: any
}

export interface Primary {
  text: string
  components: Component[]
  type: string
  modifier: string
}

export interface Component {
  text: string
}

export interface Secondary {
  text: string
  components: Component2[]
  type?: string
  modifier?: string
}

export interface Component2 {
  text: string
}
