import { useState } from 'react'
import api from '../api'

const OCASIONES = ['', 'casual', 'formal', 'deportivo', 'fiesta']

export default function GenerarOutfit() {
  const [ocasion, setOcasion] = useState('')
  const [combinacion, setCombinacion] = useState(null)
  const [nombre, setNombre] = useState('')
  const [cargando, setCargando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const generar = async () => {
    setCargando(true)
    setMensaje('')
    setCombinacion(null)
    try {
      const params = ocasion ? { ocasion } : {}
      const { data } = await api.get('/prendas/generar-outfit', { params })
      setCombinacion(data)
    } catch (err) {
      setMensaje(err.response?.data?.message || 'No se pudo generar el outfit')
    } finally {
      setCargando(false)
    }
  }

  const guardar = async () => {
    if (!combinacion || !nombre) return
    try {
      await api.post('/outfits', {
        nombre,
        prendas: combinacion.map((p) => p._id),
        ocasion
      })
      setMensaje('Outfit guardado en Mis outfits')
      setCombinacion(null)
      setNombre('')
    } catch (err) {
      setMensaje('No se pudo guardar')
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-light mb-2" style={{ color: 'var(--color-text)' }}>
        Generar outfit
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
        Deja que la app combine tus prendas por ti.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-10">
        <select
          value={ocasion}
          onChange={(e) => setOcasion(e.target.value)}
          className="px-4 py-2.5 rounded-full border text-sm outline-none capitalize"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
        >
          <option value="">Cualquier ocasión</option>
          {OCASIONES.filter(Boolean).map((o) => <option key={o} value={o}>{o}</option>)}
        </select>

        <button
          onClick={generar}
          disabled={cargando}
          className="px-6 py-2.5 rounded-full text-sm disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-green)', color: 'var(--color-bg)' }}
        >
          {cargando ? 'Combinando...' : combinacion ? 'Generar otra' : 'Generar outfit'}
        </button>
      </div>

      {mensaje && (
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>{mensaje}</p>
      )}

      {combinacion && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {combinacion.map((p) => (
              <div
                key={p._id}
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
              >
                <img src={p.imagenURL} alt={p.nombre} className="w-full aspect-square object-cover" />
                <div className="p-2">
                  <p className="text-xs" style={{ color: 'var(--color-text)' }}>{p.nombre}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Nombre para guardar este outfit"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="px-4 py-2.5 rounded-xl border text-sm outline-none flex-1"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
            />
            <button
              onClick={guardar}
              disabled={!nombre}
              className="px-6 py-2.5 rounded-full text-sm disabled:opacity-50 whitespace-nowrap"
              style={{ backgroundColor: 'var(--color-brown)', color: 'var(--color-bg)' }}
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
