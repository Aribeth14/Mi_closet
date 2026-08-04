import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

const CATEGORIAS = ['top', 'bottom', 'vestido', 'calzado', 'accesorio']

export default function NuevaPrenda() {
  const [form, setForm] = useState({ nombre: '', categoria: 'top', color: '' })
  const [imagen, setImagen] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleImagen = (e) => {
    const file = e.target.files[0]
    setImagen(file)
    setPreview(file ? URL.createObjectURL(file) : null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = new FormData()
      data.append('nombre', form.nombre)
      data.append('categoria', form.categoria)
      data.append('color', form.color)
      if (imagen) data.append('imagen', imagen)

      await api.post('/prendas', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      navigate('/closet')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-light mb-8" style={{ color: 'var(--color-text)' }}>
        Nueva prenda
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label
          className="flex items-center justify-center h-48 rounded-2xl border-2 border-dashed cursor-pointer overflow-hidden"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {preview ? (
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Subir foto de la prenda
            </span>
          )}
          <input type="file" accept="image/*" onChange={handleImagen} className="hidden" />
        </label>

        <input
          type="text"
          placeholder="Nombre de la prenda"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
        />

        <select
          value={form.categoria}
          onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none capitalize"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
        >
          {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <input
          type="text"
          placeholder="Color"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full text-sm disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-green)', color: 'var(--color-bg)' }}
        >
          {loading ? 'Guardando...' : 'Guardar prenda'}
        </button>
      </form>
    </div>
  )
}

