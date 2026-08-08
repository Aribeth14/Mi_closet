import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

const CATEGORIAS = ['todas', 'top', 'bottom', 'vestido', 'calzado', 'accesorio']

export default function Closet() {
  const [prendas, setPrendas] = useState([])
  const [filtro, setFiltro] = useState('todas')
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

  const visibles = filtro === 'todas' ? prendas : prendas.filter((p) => p.categoria === filtro)

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 sm:py-16 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-light" style={{ color: 'var(--color-text)' }}>
            Mi closet
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            {prendas.length} prenda{prendas.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          to="/closet/nueva"
          className="px-5 py-2.5 rounded-full text-sm transition-transform hover:scale-105"
          style={{ backgroundColor: 'var(--color-green)', color: 'var(--color-bg)' }}
        >
          Subir prenda
        </Link>
      </div>

      <div className="flex gap-2 mb-8 flex-wrap">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => setFiltro(cat)}
            className="px-4 py-1.5 rounded-full text-sm border capitalize transition-colors"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: filtro === cat ? 'var(--color-green)' : 'transparent',
              color: filtro === cat ? 'var(--color-bg)' : 'var(--color-text-secondary)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: 'var(--color-text-secondary)' }}>Cargando...</p>
      ) : visibles.length === 0 ? (
        <div
          className="rounded-2xl border border-dashed py-16 text-center"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {filtro === 'todas' ? 'Todavía no hay prendas aquí.' : `No tienes prendas en "${filtro}" todavía.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {visibles.map((prenda) => (
            <div
              key={prenda._id}
              className="group relative rounded-2xl overflow-hidden border transition-shadow hover:shadow-md"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
            >
              <div className="overflow-hidden">
                <img
                  src={prenda.imagenURL}
                  alt={prenda.nombre}
                  className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <button
                onClick={() => handleEliminar(prenda._id)}
                disabled={eliminandoId === prenda._id}
                className="absolute top-2 right-2 w-8 h-8 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
              >
                {eliminandoId === prenda._id ? '···' : '✕'}
              </button>

              <div className="p-3">
                <p className="text-sm truncate" style={{ color: 'var(--color-text)' }}>{prenda.nombre}</p>
                <p className="text-xs capitalize" style={{ color: 'var(--color-text-secondary)' }}>{prenda.categoria}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
