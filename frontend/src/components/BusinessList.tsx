
import { PlaceSummary } from '../types'

export default function BusinessList({ places }: { places: PlaceSummary[] }) {
  return (
    <div className="card p-3">
      <div className="font-semibold mb-2">Surrounding Businesses</div>
      <div className="space-y-2 max-h-64 overflow-auto">
        {places.map(p => (
          <div key={p.place_id} className="border rounded-lg p-2">
            <div className="text-sm font-medium">{p.name}</div>
            <div className="text-xs text-gray-500">{p.address}</div>
            <div className="text-xs">Rating: {p.rating ?? 'N/A'} ({p.user_ratings_total ?? 0})</div>
          </div>
        ))}
        {places.length === 0 && <div className="text-xs text-gray-500">No results. Adjust filters and search.</div>}
      </div>
    </div>
  )
}
