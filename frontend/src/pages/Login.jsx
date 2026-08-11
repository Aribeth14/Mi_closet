import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'
import { useAuthStore } from '../store/useAuthStore'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      login(data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales incorrectas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Formulario centrado */}
      <div className="flex flex-col items-center justify-center px-8 py-16">
        <div className="max-w-sm w-full animate-fade-in">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <img src="/Logo.png" alt="Mi Closet" className="h-9 w-9 object-contain" />
            <span className="text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
              Mi Closet
            </span>
          </Link>

          <h1 className="text-3xl mb-2 font-light" style={{ color: 'var(--color-text)' }}>
            Bienvenida de vuelta
          </h1>
          <p className="text-sm mb-10" style={{ color: 'var(--color-text-secondary)' }}>
            Este espacio es solo tuyo.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>Correo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border outline-none text-sm"
                style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
              />
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border outline-none text-sm"
                style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
              />
            </div>

            {error && <p className="text-sm" style={{ color: '#B0413E' }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm tracking-wide transition-transform hover:scale-[1.02] disabled:opacity-50"
              style={{ backgroundColor: 'var(--color-green)', color: 'var(--color-bg)' }}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>

      {/* Panel decorativo */}
      <div
        className="hidden lg:flex relative items-center justify-center overflow-hidden"
        style={{ backgroundColor: 'var(--color-green)' }}
      >
        <div className="blob-alt absolute top-10 left-10 w-40 h-40" style={{ backgroundColor: 'var(--color-bg)', opacity: 0.08 }} />
        <div className="blob absolute bottom-16 right-10 w-56 h-56" style={{ backgroundColor: 'var(--color-bg)', opacity: 0.08 }} />

        <div className="relative text-center px-10 animate-fade-in-delay">
          <svg viewBox="0 0 200 220" className="w-48 mx-auto mb-8" fill="none">
            <path d="M100 20 L85 35 L100 45 L115 35 Z" stroke="var(--color-bg)" strokeWidth="2" fill="none" strokeLinejoin="round" />
            <line x1="100" y1="45" x2="100" y2="55" stroke="var(--color-bg)" strokeWidth="2" />
            <path
              d="M70 55 L100 70 L130 55 L150 100 L130 110 L125 95 L125 190 Q100 200 75 190 L75 95 L70 110 L50 100 Z"
              stroke="var(--color-bg)"
              strokeWidth="2"
              fill="none"
              strokeLinejoin="round"
            />
            <circle cx="100" cy="85" r="2.5" fill="var(--color-bg)" />
            <circle cx="100" cy="100" r="2.5" fill="var(--color-bg)" />
            <circle cx="100" cy="115" r="2.5" fill="var(--color-bg)" />
          </svg>
          <p className="text-2xl font-light mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bg)' }}>
            Tu estilo,
            <br />
            siempre a la mano.
          </p>
        </div>
      </div>
    </div>
  )
}
