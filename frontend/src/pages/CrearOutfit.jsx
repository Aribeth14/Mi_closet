import { useEffect, useState } from 'react'
import api from '../api'
import Maniqui from '../components/Maniqui'

export default function CrearOutfit() {
  const [prendas, setPrendas] = useState([])
  const [seleccionadas, setSeleccionadas] = useState([])
  const [nombre, setNombre] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [medidas, setMedidas] = useState({})

  useEffect(() => {
    api.get('/prendas')
      .then(({ data }) => setPrendas(data))
      .catch(() => setPrendas([]))
  }, [])

  useEffect(() => {
    api.get('/usuarios/perfil')
      .then(({ data }) => setMedidas(data.medidas || {}))
      .catch(() => {})
  }, [])

  const toggle = (id) => {
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const guardar = async () => {
    setGuardando(true)
    setMensaje('')
    try {
      await api.post('/outfits', { nombre, prendas: seleccionadas })
      setMensaje('Outfit guardado')
      setNombre('')
      setSeleccionadas([])
    } catch (err) {
      setMensaje('No se pudo guardar')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h1 className="text-3xl font-light mb-2" style={{ color: 'var(--color-text)' }}>
          Crear outfit
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
          Selecciona las prendas que quieres combinar.
        </p>

        {prendas.length === 0 ? (
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Todavía no tienes prendas. Sube algunas primero en tu closet.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
              {prendas.map((p) => (
                <button
                  key={p._id}
                  onClick={() => toggle(p._id)}
                  className="rounded-xl overflow-hidden border-2 aspect-square"
                  style={{ borderColor: seleccionadas.includes(p._id) ? 'var(--color-green)' : 'var(--color-border)' }}
                >
                  <img src={p.imagenURL} alt={p.nombre} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Nombre del outfit"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full max-w-sm px-4 py-3 rounded-xl border text-sm outline-none mb-4"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
            />

            <div className="flex items-center gap-4">
              <button
                onClick={guardar}
                disabled={!nombre || seleccionadas.length === 0 || guardando}
                className="px-6 py-3 rounded-full text-sm disabled:opacity-50"
                style={{ backgroundColor: 'var(--color-green)', color: 'var(--color-bg)' }}
              >
                {guardando ? 'Guardando...' : 'Guardar outfit'}
              </button>
              {mensaje && (
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{mensaje}</span>
              )}
            </div>
          </>
        )}
      </div>

      <div
        className="rounded-2xl border overflow-hidden min-h-[480px]"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      >
        <Maniqui medidas={medidas} />
      </div>
    </div>
  )
}
