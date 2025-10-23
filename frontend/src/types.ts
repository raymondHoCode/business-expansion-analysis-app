
export type LatLng = google.maps.LatLngLiteral
export type PlaceSummary = {
  place_id: string
  name: string
  location: LatLng
  rating?: number
  user_ratings_total?: number
  types?: string[]
  address?: string
  icon?: string
}
export type Property = {
  id: string
  name: string
  location: LatLng
  price?: number
  size_sqft?: number
  notes?: string
}
