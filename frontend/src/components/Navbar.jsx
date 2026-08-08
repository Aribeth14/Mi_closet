import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const ENLACES = [
  { to: '/dashboard', label: 'Panel' },
  { to: '/closet', label: 'Closet' },
  { to: '/generar-outfit', label: 'Generar outfit' },
  { to: '/crear-outfit', label: 'Crear outfit' },
  { to: '/mis-outfits', label: 'Mis outfits' },
  { to: '/perfil', label: 'Perfil' }
]

export default function Navbar() {
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'color-mix(in srgb, var(--color-bg) 88%, transparent)'
      }}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 gap-4 overflow-x-auto">
        <Link
          to="/dashboard"
          className="text-xl shrink-0"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          Mi Closet
        </Link>

        <div className="flex items-center gap-5 text-sm shrink-0">
          {ENLACES.map((e) => (
            <Link
              key={e.to}
              to={e.to}
              className="hover:opacity-70 transition-opacity whitespace-nowrap"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {e.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 rounded-full border text-sm whitespace-nowrap"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          >
            Salir
          </button>
        </div>
      </nav>
    </header>
  )
}
