// Posición, tamaño y rotación de cada categoría dentro del "bodegón"
const DISPOSICION = {
  vestido: { top: '4%', left: '24%', width: '52%', rotate: -3, z: 3 },
  top: { top: '2%', left: '8%', width: '40%', rotate: -6, z: 2 },
  bottom: { top: '40%', left: '48%', width: '38%', rotate: 5, z: 2 },
  calzado: { top: '74%', left: '34%', width: '30%', rotate: -3, z: 4 },
  accesorio: { top: '58%', left: '6%', width: '22%', rotate: 8, z: 5 }
}

export default function FlatLay({ prendas = [] }) {
  const tieneVestido = prendas.some((p) => p.categoria === 'vestido')

  return (
    <div
      className="relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {prendas.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Selecciona prendas para ver tu outfit aquí
          </p>
        </div>
      ) : (
        prendas.map((p) => {
          if (tieneVestido && (p.categoria === 'top' || p.categoria === 'bottom')) return null

          const pos = DISPOSICION[p.categoria]
          if (!pos) return null

          return (
            <img
              key={p._id}
              src={p.imagenURL}
              alt={p.nombre}
              className="absolute drop-shadow-xl transition-transform duration-300"
              style={{
                top: pos.top,
                left: pos.left,
                width: pos.width,
                transform: `rotate(${pos.rotate}deg)`,
                zIndex: pos.z,
                mixBlendMode: 'multiply'
              }}
            />
          )
        })
      )}
    </div>
  )
}
