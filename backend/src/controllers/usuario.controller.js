import Usuario from '../models/Usuario.js'

export const obtenerPerfil=async (req,res) => {
    const usuario=await Usuario.findById(req.usuarioId).select('-password')
    res.json(usuario)
}

export const actualizarPerfil=async (req,res) => {
    const {medidas} = req.body
    const usuario= await Usuario.findByIdAndUpdate(
        req.usuarioId,{medidas},{new:true}
    ).select ('-password')
    res.json(usuario)
}



