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
    <div
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* PANEL IZQUIERDO */}
      <div
        className="relative flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-14"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
          style={{ backgroundColor: 'var(--color-green)', opacity: 0.025 }}
        />
        <div
          className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ backgroundColor: 'var(--color-brown)', opacity: 0.025 }}
        />

        <div className="relative z-10 w-full max-w-xl animate-fade-in">
          <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
              style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <img src="/Logo.png" alt="Mi Closet" className="h-9 w-9 object-contain" />
            </div>
            <span className="text-xl tracking-wide" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
              Mi Closet
            </span>
          </Link>

          <div className="mb-9">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--color-green)' }}>
              Tu armario digital
            </p>
            <h1
              className="text-5xl sm:text-6xl leading-[1.02] font-light tracking-tight"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
            >
              Bienvenida
              <br />
              <span className="italic">de vuelta.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 mb-9">
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-border)' }} />
            <span className="text-sm" style={{ color: 'var(--color-green)' }}>✦</span>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-border)' }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] mb-3" style={{ color: 'var(--color-text)' }}>
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
                className="w-full h-14 px-5 rounded-xl border outline-none text-sm transition-all duration-300 focus:ring-2 focus:border-transparent"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  '--tw-ring-color': 'var(--color-green)'
                }}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.16em] mb-3" style={{ color: 'var(--color-text)' }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full h-14 px-5 rounded-xl border outline-none text-sm tracking-widest transition-all duration-300 focus:ring-2 focus:border-transparent"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  '--tw-ring-color': 'var(--color-green)'
                }}
              />
            </div>

            {error && (
              <div
                className="flex items-center gap-3 px-5 py-4 rounded-xl text-sm"
                style={{ backgroundColor: 'rgba(176, 65, 62, 0.07)', color: '#B0413E', border: '1px solid rgba(176, 65, 62, 0.15)' }}
              >
                <span
                  className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium"
                  style={{ backgroundColor: 'rgba(176, 65, 62, 0.12)' }}
                >
                  !
                </span>
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full h-14 rounded-xl overflow-hidden text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
              style={{ backgroundColor: 'var(--color-green)', color: 'var(--color-bg)', boxShadow: '0 12px 30px rgba(0,0,0,0.10)' }}
            >
              <span
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ backgroundColor: 'var(--color-brown)' }}
              />
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? 'Ingresando...' : 'Ingresar a mi closet'}
                {!loading && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12H19" />
                    <path d="M13 6L19 12L13 18" />
                  </svg>
                )}
              </span>
            </button>
          </form>

          <div className="flex items-center gap-4 mt-10">
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-border)' }} />
            <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--color-text-secondary)' }}>
              Mi Closet
            </span>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-border)' }} />
          </div>
        </div>
      </div>

      {/* PANEL DERECHO */}
      <div className="hidden lg:flex relative items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--color-green)' }}>
        <div className="absolute -top-28 -right-28 w-[30rem] h-[30rem] rounded-full" style={{ border: '1px solid rgba(245,243,238,0.15)' }} />
        <div className="absolute top-10 right-20 w-[24rem] h-[24rem] rounded-full" style={{ border: '1px solid rgba(245,243,238,0.10)' }} />
        <div className="absolute -bottom-36 -left-36 w-[34rem] h-[34rem] rounded-full" style={{ border: '1px solid rgba(245,243,238,0.13)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] rounded-full" style={{ backgroundColor: 'rgba(245,243,238,0.035)' }} />

        <div className="absolute top-8 right-16 grid grid-cols-4 gap-3">
          {[...Array(12)].map((_, index) => (
            <span key={index} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-bg)', opacity: 0.35 }} />
          ))}
        </div>
        <div className="absolute bottom-20 left-20 grid grid-cols-4 gap-3">
          {[...Array(12)].map((_, index) => (
            <span key={index} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-bg)', opacity: 0.3 }} />
          ))}
        </div>

        <div className="relative z-10 text-center px-12 max-w-2xl animate-fade-in-delay">
          <div className="relative w-72 h-72 mx-auto mb-12 rounded-full flex items-center justify-center" style={{ border: '1px solid rgba(245,243,238,0.17)' }}>
            <div className="absolute inset-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(245,243,238,0.055)' }}>
              <svg viewBox="0 0 200 220" className="w-40" fill="none">
                <path d="M100 20 L85 35 L100 45 L115 35 Z" stroke="var(--color-bg)" strokeWidth="2" strokeLinejoin="round" />
                <line x1="100" y1="45" x2="100" y2="55" stroke="var(--color-bg)" strokeWidth="2" />
                <path
                  d="M70 55 L100 70 L130 55 L150 100 L130 110 L125 95 L125 190 Q100 200 75 190 L75 95 L70 110 L50 100 Z"
                  stroke="var(--color-bg)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="100" cy="85" r="2.5" fill="var(--color-bg)" />
                <circle cx="100" cy="100" r="2.5" fill="var(--color-bg)" />
                <circle cx="100" cy="115" r="2.5" fill="var(--color-bg)" />
              </svg>
            </div>
          </div>

          <h2 className="text-5xl xl:text-6xl font-light leading-[1.05] mb-7" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bg)' }}>
            Tu estilo,
            <br />
            <span className="italic">siempre a la mano.</span>
          </h2>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px" style={{ backgroundColor: 'var(--color-bg)', opacity: 0.3 }} />
            <span style={{ color: 'var(--color-bg)', opacity: 0.7 }}>✦</span>
            <div className="w-12 h-px" style={{ backgroundColor: 'var(--color-bg)', opacity: 0.3 }} />
          </div>

          <p className="text-sm leading-7 max-w-md mx-auto" style={{ color: 'var(--color-bg)', opacity: 0.68 }}>
            Organiza tu ropa, descubre nuevas combinaciones
            <br />
            y crea looks que te representen.
          </p>
        </div>

        <div className="absolute -bottom-8 -right-4 w-40 h-40 opacity-20 rotate-[-15deg]">
          <svg viewBox="0 0 160 160" fill="none">
            <path d="M30 150C45 120 55 90 75 65" stroke="var(--color-bg)" strokeWidth="2" />
            <path d="M52 110C35 100 28 88 27 72C43 76 55 87 58 100" fill="var(--color-bg)" />
            <path d="M68 84C80 67 94 61 108 63C103 78 88 88 72 90" fill="var(--color-bg)" />
            <path d="M48 125C32 120 20 109 16 95C32 96 46 106 53 118" fill="var(--color-bg)" />
          </svg>
        </div>
      </div>
    </div>
  )
}
