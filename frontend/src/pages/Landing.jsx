import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
      <div className="flex items-center gap-2 mb-10">
        <img src="/Logo.png" alt="Mi Closet" className="h-10 w-10 object-contain" />
        <span className="text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
          Mi Closet
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="animate-fade-in">
          <p className="text-sm uppercase tracking-[0.2em] mb-5" style={{ color: 'var(--color-brown)' }}>
            Proyecto personal
          </p>

          <h1 className="text-5xl sm:text-6xl leading-[1.05] mb-6 font-light" style={{ color: 'var(--color-text)' }}>
            Vestirme
            <br />
            sin pensarlo
            <br />
            dos veces.
          </h1>

          <p className="text-lg leading-relaxed max-w-md mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            Mi Closet organiza cada prenda que tengo y me ayuda a combinar outfits
            antes de decidir qué ponerme — para dejar de perder tiempo cada mañana.
          </p>

          <Link
            to="/login"
            className="inline-block px-8 py-3.5 rounded-full text-sm tracking-wide transition-transform hover:scale-105"
            style={{ backgroundColor: 'var(--color-green)', color: 'var(--color-bg)' }}
          >
            Entrar a mi closet
          </Link>

          <div className="flex flex-wrap gap-3 mt-10">
            {['Closet digital', 'Combinaciones al instante', 'Vista en flat lay'].map((chip) => (
              <span
                key={chip}
                className="text-xs px-4 py-2 rounded-full border"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center animate-fade-in-delay">
          <div
            className="blob w-full max-w-sm aspect-square flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <svg viewBox="0 0 200 220" className="w-2/3" fill="none">
              <path d="M100 20 L85 35 L100 45 L115 35 Z" stroke="var(--color-text)" strokeWidth="2" fill="none" strokeLinejoin="round" />
              <line x1="100" y1="45" x2="100" y2="55" stroke="var(--color-text)" strokeWidth="2" />
              <path
                d="M70 55 L100 70 L130 55 L150 100 L130 110 L125 95 L125 190 Q100 200 75 190 L75 95 L70 110 L50 100 Z"
                stroke="var(--color-text)"
                strokeWidth="2"
                fill="var(--color-bg)"
                strokeLinejoin="round"
              />
              <circle cx="100" cy="85" r="2.5" fill="var(--color-brown)" />
              <circle cx="100" cy="100" r="2.5" fill="var(--color-brown)" />
              <circle cx="100" cy="115" r="2.5" fill="var(--color-brown)" />
            </svg>
          </div>

          <div
            className="blob-alt absolute -top-4 -right-2 w-20 h-20 -z-10"
            style={{ backgroundColor: 'var(--color-green)', opacity: 0.25 }}
          />
          <div
            className="blob absolute -bottom-6 -left-4 w-28 h-28 -z-10"
            style={{ backgroundColor: 'var(--color-brown)', opacity: 0.2 }}
          />

          <div
            className="absolute -bottom-3 right-4 px-5 py-3 rounded-2xl shadow-sm"
            style={{ backgroundColor: 'var(--color-green)', color: 'var(--color-bg)' }}
          >
            <p className="text-xs uppercase tracking-wide opacity-80">Hecho a mi medida</p>
            <p className="text-sm" style={{ fontFamily: 'var(--font-display)' }}>100% personal</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-28 pt-12 border-t border-dashed" style={{ borderColor: 'var(--color-border)' }}>
        {[
          { title: 'Closet digital', text: 'Cada prenda fotografiada, clasificada y siempre a la mano.' },
          { title: 'Outfits a tu gusto', text: 'Combina o deja que la app te sugiera, con reglas de color.' },
          { title: 'Vista en flat lay', text: 'Ve tu outfit acomodado como un bodegón, antes de vestirte.' }
        ].map((item) => (
          <div key={item.title}>
            <h3 className="text-xl mb-2" style={{ color: 'var(--color-text)' }}>{item.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
