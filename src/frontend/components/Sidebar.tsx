
import { Property } from '../types'

type Props = {
  properties: Property[]
  selectedId?: string
  onSelect: (id: string) => void
}

export default function Sidebar({ properties, selectedId, onSelect }: Props) {
  return (
    <aside className="w-full md:w-80 border-r bg-white p-3 space-y-2">
      <div className="font-semibold">Candidate Properties</div>
      <div className="space-y-2">
        {properties.map(p => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={`w-full text-left card p-3 ${selectedId === p.id ? 'ring-2 ring-black' : ''}`}
          >
            <div className="text-sm font-medium">{p.name}</div>
            <div className="text-xs text-gray-500">Lat {p.location.lat.toFixed(4)}, Lng {p.location.lng.toFixed(4)}</div>
            {p.price && <div className="text-xs">Est. price: ${p.price.toLocaleString()}</div>}
            {p.size_sqft && <div className="text-xs">Size: {p.size_sqft.toLocaleString()} sqft</div>}
            {p.notes && <div className="text-xs text-gray-500">{p.notes}</div>}
          </button>
        ))}
        {properties.length === 0 && <div className="text-xs text-gray-500">No properties loaded.</div>}
      </div>
    </aside>
  )
}
