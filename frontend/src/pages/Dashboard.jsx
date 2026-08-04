import { Link } from 'react-router-dom'

const accesos = [
  { to: '/closet', title: 'Mi closet' },
  { to: '/crear-outfit', title: 'Crear outfit' },
  { to: '/mis-outfits', title: 'Mis outfits' }
]

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-light mb-2" style={{ color: 'var(--color-text)' }}>
        Panel
      </h1>
      <p className="text-sm mb-12" style={{ color: 'var(--color-text-secondary)' }}>
        Todo tu closet, en un solo lugar.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {accesos.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="p-6 rounded-2xl border transition-transform hover:-translate-y-0.5"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
          >
            <h3 className="text-lg mb-1" style={{ color: 'var(--color-text)' }}>{item.title}</h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.text}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

