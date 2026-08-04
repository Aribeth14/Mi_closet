import { useEffect, useState } from 'react'
import api from '../api'

export default function MisOutfits() {
  const [outfits, setOutfits] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/outfits')
      .then(({ data }) => setOutfits(data))
      .catch(() => setOutfits([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-light mb-2" style={{ color: 'var(--color-text)' }}>
        Mis outfits
      </h1>
      <p className="text-sm mb-10" style={{ color: 'var(--color-text-secondary)' }}>
        Combinaciones que ya armaste.
      </p>

      {loading ? (
        <p style={{ color: 'var(--color-text-secondary)' }}>Cargando...</p>
      ) : outfits.length === 0 ? (
        <p style={{ color: 'var(--color-text-secondary)' }}>Todavía no has guardado ningún outfit.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {outfits.map((outfit) => (
            <div
              key={outfit._id}
              className="rounded-2xl border p-4"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
            >
              <p className="text-sm mb-2" style={{ color: 'var(--color-text)' }}>{outfit.nombre}</p>
              <div className="grid grid-cols-3 gap-1">
                {outfit.prendas?.slice(0, 3).map((p) => (
                  <img key={p._id} src={p.imagenURL} alt={p.nombre} className="w-full aspect-square object-cover rounded-md" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

