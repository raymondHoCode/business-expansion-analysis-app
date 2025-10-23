
type Props = {
  keyword: string
  setKeyword: (v: string) => void
  radius: number
  setRadius: (v: number) => void
  minRating: number
  setMinRating: (v: number) => void
  openNow: boolean
  setOpenNow: (v: boolean) => void
  showHeat: boolean
  setShowHeat: (v: boolean) => void
  onSearch: () => void
}

export default function Filters(props: Props) {
  const { keyword, setKeyword, radius, setRadius, minRating, setMinRating, openNow, setOpenNow, showHeat, setShowHeat, onSearch } = props
  return (
    <div className="card p-3 flex flex-wrap items-end gap-3">
      <div>
        <label className="block text-xs text-gray-600">Business type or keyword</label>
        <input value={keyword} onChange={e=>setKeyword(e.target.value)} className="border rounded-md p-2 w-48" placeholder="coffee, gym, grocery" />
      </div>
      <div>
        <label className="block text-xs text-gray-600">Radius (m)</label>
        <input type="number" value={radius} onChange={e=>setRadius(parseInt(e.target.value||'0'))} className="border rounded-md p-2 w-28" />
      </div>
      <div>
        <label className="block text-xs text-gray-600">Min rating</label>
        <input type="number" step="0.1" value={minRating} onChange={e=>setMinRating(parseFloat(e.target.value||'0'))} className="border rounded-md p-2 w-20" />
      </div>
      <div className="flex items-center gap-2">
        <input id="openNow" type="checkbox" checked={openNow} onChange={e=>setOpenNow(e.target.checked)} />
        <label htmlFor="openNow" className="text-sm">Open now</label>
      </div>
      <div className="flex items-center gap-2">
        <input id="heat" type="checkbox" checked={showHeat} onChange={e=>setShowHeat(e.target.checked)} />
        <label htmlFor="heat" className="text-sm">Heatmap</label>
      </div>
      <button onClick={onSearch} className="px-3 py-2 rounded-md bg-black text-white">Search</button>
    </div>
  )
}
