import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function Closet() {
  const [prendas, setPrendas] = useState([])
  const [loading, setLoading] = useState(true)
  const [eliminandoId, setEliminandoId] = useState(null)

  useEffect(() => {
    cargarPrendas()
  }, [])

  const cargarPrendas = () => {
    api.get('/prendas')
      .then(({ data }) => setPrendas(data))
      .catch(() => setPrendas([]))
      .finally(() => setLoading(false))
  }

  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Eliminar esta prenda? Esta acción no se puede deshacer.')
    if (!confirmar) return

    setEliminandoId(id)
    try {
      await api.delete(`/prendas/${id}`)
      setPrendas((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      console.error(err)
    } finally {
      setEliminandoId(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-light" style={{ color: 'var(--color-text)' }}>
          Mi closet
        </h1>
        <Link
          to="/closet/nueva"
          className="px-5 py-2.5 rounded-full text-sm"
          style={{ backgroundColor: 'var(--color-green)', color: 'var(--color-bg)' }}
        >
          Subir prenda
        </Link>
      </div>

      {loading ? (
        <p style={{ color: 'var(--color-text-secondary)' }}>Cargando...</p>
      ) : prendas.length === 0 ? (
        <p style={{ color: 'var(--color-text-secondary)' }}>Todavía no hay prendas aquí.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {prendas.map((prenda) => (
            <div
              key={prenda._id}
              className="group relative rounded-2xl overflow-hidden border"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
            >
              <img src={prenda.imagenURL} alt={prenda.nombre} className="w-full aspect-square object-cover" />

              <button
                onClick={() => handleEliminar(prenda._id)}
                disabled={eliminandoId === prenda._id}
                className="absolute top-2 right-2 w-8 h-8 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
              >
                {eliminandoId === prenda._id ? '...' : 'X'}
              </button>

              <div className="p-3">
                <p className="text-sm" style={{ color: 'var(--color-text)' }}>{prenda.nombre}</p>
                <p className="text-xs capitalize" style={{ color: 'var(--color-text-secondary)' }}>{prenda.categoria}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
