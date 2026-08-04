import { useEffect, useState } from 'react'
import api from '../api'

const CAMPOS = [
  { key: 'estatura', label: 'Estatura (cm)' },
  { key: 'busto', label: 'Busto (cm)' },
  { key: 'cintura', label: 'Cintura (cm)' },
  { key: 'cadera', label: 'Cadera (cm)' },
  { key: 'hombros', label: 'Hombros (cm)' }
]

export default function Perfil() {
  const [medidas, setMedidas] = useState({})
  const [guardado, setGuardado] = useState(false)

  useEffect(() => {
    api.get('/usuarios/perfil')
      .then(({ data }) => setMedidas(data.medidas || {}))
      .catch(() => {})
  }, [])

  const handleChange = (key, value) => {
    setMedidas((prev) => ({ ...prev, [key]: value }))
    setGuardado(false)
  }

  const guardar = async () => {
    await api.put('/usuarios/perfil', { medidas })
    setGuardado(true)
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-light mb-2" style={{ color: 'var(--color-text)' }}>
        Mi perfil
      </h1>
      <p className="text-sm mb-10" style={{ color: 'var(--color-text-secondary)' }}>
        Estas medidas ajustan tu maniquí digital.
      </p>

      <div className="space-y-5">
        {CAMPOS.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>{label}</label>
            <input
              type="number"
              value={medidas[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
            />
          </div>
        ))}

        <button
          onClick={guardar}
          className="w-full py-3 rounded-full text-sm"
          style={{ backgroundColor: 'var(--color-green)', color: 'var(--color-bg)' }}
        >
          {guardado ? 'Guardado' : 'Guardar medidas'}
        </button>
      </div>
    </div>
  )
}

