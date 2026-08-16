import { Link } from 'react-router-dom'

const ICONOS = {
  closet: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 3L9 6L12 8L15 6Z" strokeLinejoin="round" />
      <line x1="12" y1="8" x2="12" y2="10" />
      <path d="M7 10L12 12.5L17 10L20 16L17 17.5L16.3 15.8L16.3 21L7.7 21L7.7 15.8L7 17.5L4 16Z" strokeLinejoin="round" />
    </svg>
  ),
  generar: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M5 3L6 6L9 7L6 8L5 11L4 8L1 7L4 6Z" strokeLinejoin="round" />
      <path d="M18 12L19.2 15L22 16L19.2 17L18 20L16.8 17L14 16L16.8 15Z" strokeLinejoin="round" />
      <path d="M11 8L12 11" strokeLinecap="round" />
    </svg>
  ),
  crear: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </svg>
  ),
  outfits: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M6 3H18V21L12 17L6 21Z" strokeLinejoin="round" />
    </svg>
  ),
  perfil: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20C5 16 8 14 12 14C16 14 19 16 19 20" strokeLinecap="round" />
    </svg>
  )
}

const accesos = [
  { to: '/closet', icon: 'closet', color: 'green', eyebrow: 'Armario', title: 'Mi closet', text: 'Explora y organiza tus prendas.' },
  { to: '/generar-outfit', icon: 'generar', color: 'brown', eyebrow: 'Automático', title: 'Generar outfit', text: 'Deja que la app combine por ti.' },
  { to: '/crear-outfit', icon: 'crear', color: 'green', eyebrow: 'A tu manera', title: 'Crear outfit', text: 'Combina prendas manualmente.' },
  { to: '/mis-outfits', icon: 'outfits', color: 'brown', eyebrow: 'Archivo', title: 'Mis outfits', text: 'Revisa las combinaciones guardadas.' },
  { to: '/perfil', icon: 'perfil', color: 'green', eyebrow: 'A tu medida', title: 'Mi perfil', text: 'Actualiza tus medidas corporales.' }
]

export default function Dashboard() {
  return (
    <div
      className="relative min-h-[calc(100vh-64px)] overflow-hidden flex items-center justify-center px-6 py-16 sm:py-20"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div
        className="absolute -top-32 -right-32 w-[30rem] h-[30rem] rounded-full pointer-events-none"
        style={{ backgroundColor: 'var(--color-green)', opacity: 0.045 }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[32rem] h-[32rem] rounded-full pointer-events-none"
        style={{ backgroundColor: 'var(--color-brown)', opacity: 0.035 }}
      />

      <main className="relative z-10 w-full max-w-4xl animate-fade-in">
        <header className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.35em] mb-5" style={{ color: 'var(--color-green)' }}>
            Tu espacio
          </p>

          <h1
            className="text-5xl sm:text-6xl font-light leading-none tracking-tight"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}
          >
            Panel de <span className="italic">control.</span>
          </h1>

          <div className="flex items-center justify-center gap-4 mt-7">
            <div className="w-16 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
            <span className="text-sm" style={{ color: 'var(--color-green)' }}>✦</span>
            <div className="w-16 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
          </div>

          <p className="text-sm mt-6 max-w-sm mx-auto leading-6 text-center" style={{ color: 'var(--color-text-secondary)' }}>
            Todo lo que necesitas para organizar tu closet y crear outfits que representen tu estilo.
          </p>
        </header>

        <div className="flex flex-col gap-4 max-w-xl mx-auto">
          {accesos.map((item) => {
            const colorFondo = item.color === 'green' ? 'var(--color-green)' : 'var(--color-brown)'
            return (
              <Link
                key={item.to}
                to={item.to}
                className="group flex items-center gap-5 p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5"
                style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 12px 28px rgba(75,66,66,0.10)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)')}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: colorFondo, color: 'var(--color-bg)' }}
                >
                  {ICONOS[item.icon]}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.15em] mb-0.5" style={{ color: 'var(--color-brown)' }}>
                    {item.eyebrow}
                  </p>
                  <h3 className="text-lg leading-tight mb-0.5" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs leading-snug" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.text}
                  </p>
                </div>

                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  style={{ backgroundColor: colorFondo, color: 'var(--color-bg)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12H19" />
                    <path d="M13 6L19 12L13 18" />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
