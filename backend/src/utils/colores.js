const NEUTROS = ['negro', 'blanco', 'gris', 'beige', 'café', 'crema', 'nude']

export const esNeutro = (color) => {
  if (!color) return true
  return NEUTROS.includes(color.toLowerCase().trim())
}

// Revisa que no haya más de un color "fuerte" (no neutro) en la combinación
export const combinacionValida = (prendas) => {
  const coloresFuertes = prendas
    .map((p) => p.color)
    .filter((c) => !esNeutro(c))

  const unicos = new Set(coloresFuertes.map((c) => c.toLowerCase().trim()))
  return unicos.size <= 1
}

