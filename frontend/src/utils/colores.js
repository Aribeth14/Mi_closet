const MAPA_COLORES = {
  negro: '#1a1a1a',
  blanco: '#f5f5f0',
  gris: '#8c8c8c',
  beige: '#d8c3a5',
  crema: '#f0e6d2',
  café: '#6b4a34',
  cafe: '#6b4a34',
  marrón: '#6b4a34',
  marron: '#6b4a34',
  nude: '#dcb9a0',
  azul: '#3b5ba5',
  celeste: '#7ec8e3',
  rojo: '#b0413e',
  vino: '#6e2035',
  rosa: '#e8a0bf',
  fucsia: '#c2185b',
  verde: '#5c8a5c',
  oliva: '#73785a',
  amarillo: '#e6c94d',
  mostaza: '#c9a227',
  naranja: '#d97b3f',
  morado: '#7d5ba6',
  lila: '#b9a1d9',
  dorado: '#c9a86a',
  plateado: '#b8b8b8'
}

export const colorAHex = (nombreColor) => {
  if (!nombreColor) return '#a8a8a8'
  const limpio = nombreColor.toLowerCase().trim()
  if (limpio.startsWith('#')) return limpio
  return MAPA_COLORES[limpio] || '#a8a8a8'
}
