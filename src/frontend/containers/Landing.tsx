
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Landing() {
  const nav = useNavigate()
  const [business, setBusiness] = useState('coffee shop')
  const [budget, setBudget] = useState<number>(250000)
  const [location, setLocation] = useState('Toronto, ON')

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold">Find the best spot for your next location</h2>
        <p className="text-gray-600 mt-2">Enter a few details and explore the map with recommendations, surrounding businesses, and heatmaps.</p>
      </div>

      <div className="card p-5 grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm text-gray-600">Business type</label>
          <input className="border rounded-md p-2 w-full" value={business} onChange={e=>setBusiness(e.target.value)} placeholder="e.g., coffee shop" />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Approx budget ($)</label>
          <input className="border rounded-md p-2 w-full" type="number" value={budget} onChange={e=>setBudget(parseInt(e.target.value||'0'))} />
        </div>
        <div>
          <label className="block text-sm text-gray-600">City or address</label>
          <input className="border rounded-md p-2 w-full" value={location} onChange={e=>setLocation(e.target.value)} placeholder="City or street address" />
        </div>
        <div className="md:col-span-3">
          <button
            className="px-4 py-2 rounded-md bg-black text-white"
            onClick={() => nav(`/map?business=${encodeURIComponent(business)}&budget=${budget}&q=${encodeURIComponent(location)}`)}
          >
            Show recommendations
          </button>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="font-medium">Map based analysis</div>
          <div className="text-sm text-gray-600">See candidate properties, surrounding competitors, and key amenities.</div>
        </div>
        <div className="card p-4">
          <div className="font-medium">Heatmaps</div>
          <div className="text-sm text-gray-600">Toggle heatmaps from nearby search density or ratings.</div>
        </div>
        <div className="card p-4">
          <div className="font-medium">Filters</div>
          <div className="text-sm text-gray-600">Adjust radius, minimum rating, and open-now to refine results.</div>
        </div>
      </div>
    </section>
  )
}
