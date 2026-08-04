import Outfit from '../models/Outfit.js'

export const listarOutfits = async (req, res) => {
  const outfits = await Outfit.find({ usuario: req.usuarioId })
    .populate('prendas')
    .sort({ createdAt: -1 })
  res.json(outfits)
}

export const crearOutfit = async (req, res) => {
  try {
    const { nombre, prendas, ocasion } = req.body

    const outfit = await Outfit.create({
      usuario: req.usuarioId,
      nombre,
      prendas,
      ocasion
    })

    res.status(201).json(outfit)
  } catch (error) {
    res.status(400).json({ message: 'No se pudo crear el outfit', error: error.message })
  }
}

export const eliminarOutfit = async (req, res) => {
  const outfit = await Outfit.findOneAndDelete({ _id: req.params.id, usuario: req.usuarioId })
  if (!outfit) return res.status(404).json({ message: 'Outfit no encontrado' })
  res.json({ message: 'Outfit eliminado' })
}
