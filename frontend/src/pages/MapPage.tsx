
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GoogleMap, LoadScript, Marker, InfoWindow, HeatmapLayer } from '@react-google-maps/api'
import Sidebar from '../components/Sidebar'
import Filters from '../components/Filters'
import BusinessList from '../components/BusinessList'
import { Property, PlaceSummary } from '../types'
import { nearbySearch } from '../utils/places'

const containerStyle = { width: '100%', height: '100%' }

// Simple mock properties; replace with your Python API later
const mockProps: Property[] = [
  { id: 'p1', name: 'Property A', location: { lat: 43.6532, lng: -79.3832 }, price: 320000, size_sqft: 1800, notes: 'Downtown core' },
  { id: 'p2', name: 'Property B', location: { lat: 43.6617, lng: -79.3950 }, price: 280000, size_sqft: 1500, notes: 'Near university' },
  { id: 'p3', name: 'Property C', location: { lat: 43.6455, lng: -79.3807 }, price: 360000, size_sqft: 2100, notes: 'High foot traffic' },
]

export default function MapPage() {
  const [params] = useSearchParams()
  const business = params.get('business') || 'coffee'
  const budget = Number(params.get('budget') || 0)
  const q = params.get('q') || 'Toronto, ON'

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({ lat: 43.6532, lng: -79.3832 })
  const [properties, setProperties] = useState<Property[]>(mockProps)
  const [selectedId, setSelectedId] = useState<string | undefined>(properties[0]?.id)
  const [businesses, setBusinesses] = useState<PlaceSummary[]>([])

  // filters
  const [keyword, setKeyword] = useState(business)
  const [radius, setRadius] = useState(1500)
  const [minRating, setMinRating] = useState(0)
  const [openNow, setOpenNow] = useState(false)
  const [showHeat, setShowHeat] = useState(false)

  const selectedProperty = useMemo(() => properties.find(p => p.id === selectedId), [properties, selectedId])

  const mapRef = useRef<google.maps.Map | null>(null)
  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map
    // Try to geocode the query to center map initially
    if (q) {
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ address: q }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const loc = results[0].geometry.location
          setMapCenter({ lat: loc.lat(), lng: loc.lng() })
          map.panTo({ lat: loc.lat(), lng: loc.lng() })
        }
      })
    }
  }

  const onUnmount = () => { mapRef.current = null }

  const runSearch = async () => {
    if (!mapRef.current) return
    const center = selectedProperty?.location || mapCenter
    const res = await nearbySearch(mapRef.current, center, keyword, radius, minRating || undefined, openNow || undefined)
    setBusinesses(res)
  }

  useEffect(() => {
    // auto-run initial search after map loads and property selected
    // we trigger when selected property changes
    if (mapRef.current && selectedProperty) {
      runSearch()
      mapRef.current.panTo(selectedProperty.location)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProperty?.id])

  // Heatmap points
  const heatData = useMemo(() => {
    if (!businesses.length) return []
    return businesses.map(b => new google.maps.LatLng(b.location.lat, b.location.lng))
  }, [businesses])

  return (
    <div className="h-[calc(100vh-120px)] flex">
      <Sidebar
        properties={properties.filter(p => (budget ? (p.price || 0) <= budget : true))}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <div className="flex-1 flex flex-col">
        <div className="p-3">
          <div className="mb-2 text-sm text-gray-600">Analyzing for: <span className="font-medium">{business}</span>, Budget: <span className="font-medium">${budget.toLocaleString()}</span>, Area: <span className="font-medium">{q}</span></div>
          <Filters
            keyword={keyword}
            setKeyword={setKeyword}
            radius={radius}
            setRadius={setRadius}
            minRating={minRating}
            setMinRating={setMinRating}
            openNow={openNow}
            setOpenNow={setOpenNow}
            showHeat={showHeat}
            setShowHeat={setShowHeat}
            onSearch={runSearch}
          />
        </div>
        <div className="flex-1 relative">
          {!apiKey && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="card p-6 max-w-md text-center">
                <div className="text-lg font-semibold mb-2">Add your Google Maps API key</div>
                <p className="text-sm text-gray-600">Create a <code>.env</code> with <code>VITE_GOOGLE_MAPS_API_KEY=...</code>. Enable Maps JavaScript API and Places API. Then restart the dev server.</p>
              </div>
            </div>
          )}
          {apiKey && (
            <LoadScript googleMapsApiKey={apiKey} libraries={['places', 'visualization']}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={selectedProperty?.location || mapCenter}
                zoom={14}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{ mapTypeControl: false, streetViewControl: false }}
              >
                {/* Marker for chosen property */}
                {selectedProperty && (
                  <Marker position={selectedProperty.location} label="Chosen" />
                )}

                {/* Markers for surrounding places */}
                {businesses.map(p => (
                  <Marker key={p.place_id} position={p.location} />
                ))}

                {/* Optional Heatmap */}
                {showHeat && heatData.length > 0 && (
                  <HeatmapLayer data={heatData as any} />
                )}
              </GoogleMap>
            </LoadScript>
          )}
        </div>
        <div className="p-3">
          <BusinessList places={businesses} />
        </div>
      </div>
    </div>
  )
}
