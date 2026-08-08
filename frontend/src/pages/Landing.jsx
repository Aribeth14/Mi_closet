import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div>
      <img src="/Logo.png" alt="Mi Closet" className="h-14 w-14 object-contain mb-8" />
      <p className="text-sm uppercase tracking-[0.2em] mb-6" style={{ color: 'var(--color-brown)' }}>
        Proyecto personal
      </p>

      <h1 className="text-5xl md:text-6xl leading-tight mb-8 font-light" style={{ color: 'var(--color-text)' }}>
        Vestirme cada día,
        <br />
        sin pensarlo dos veces.
      </h1>

      <p className="text-lg leading-relaxed max-w-2xl mb-6" style={{ color: 'var(--color-text-secondary)' }}>
        Mi Closet nació de una pregunta que me repito casi todas las mañanas: ¿qué me pongo hoy?
        Entre la ropa que tengo, las combinaciones que olvido y el tiempo que se va pensándolo,
        decidí construir un espacio propio donde organizar mis prendas, armar outfits y verlos
        antes de decidir.
      </p>

      <Link
        to="/login"
        className="inline-block px-8 py-3 rounded-full text-sm tracking-wide transition-opacity hover:opacity-90"
        style={{ backgroundColor: 'var(--color-green)', color: 'var(--color-bg)' }}
      >
        Entrar a mi closet
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-12 border-t" style={{ borderColor: 'var(--color-border)' }}>
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
