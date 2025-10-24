
import { PlaceSummary } from '../types'

export function nearbySearch(map: google.maps.Map, center: google.maps.LatLngLiteral, keyword: string, radiusMeters: number, minRating?: number, openNow?: boolean): Promise<PlaceSummary[]> {
  return new Promise((resolve, reject) => {
    const svc = new google.maps.places.PlacesService(map)
    const request: google.maps.places.PlaceSearchRequest = {
      location: center,
      radius: radiusMeters,
      keyword,
      openNow
    }
    svc.nearbySearch(request, (results, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
        resolve([])
        return
      }
      const out: PlaceSummary[] = results
        .filter(r => (minRating ? (r.rating || 0) >= minRating : true))
        .map(r => ({
          place_id: r.place_id!,
          name: r.name || 'Unknown',
          location: { lat: r.geometry?.location?.lat() || 0, lng: r.geometry?.location?.lng() || 0 },
          rating: r.rating,
          user_ratings_total: r.user_ratings_total,
          types: r.types,
          address: r.vicinity,
          icon: r.icon
        }))
      resolve(out)
    })
  })
}
