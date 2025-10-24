import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Landing from './frontend/containers/Landing'
import MapPage from './frontend/containers/MapPage'
import './frontend/styles/index.css'

const Shell = () => (
  <div className="min-h-screen flex flex-col">
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Business Location Analysis</h1>
        <a
          className="text-sm text-gray-600 hover:text-black"
          href="https://developers.google.com/maps/documentation/javascript/overview"
          target="_blank"
          rel="noreferrer"
        >
          Maps Docs
        </a>
      </div>
    </header>
    <main className="flex-1">
      <Outlet />
    </main>
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 text-xs text-gray-500">
        Demo UI. No backend required. Add your Python API later.
      </div>
    </footer>
  </div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'map', element: <MapPage /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
