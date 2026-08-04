import Prenda from "../models/Prenda.js";

export const listarPrendas =async (req,res)=>{
    const prendas = await Prenda.find({usuario:req.usuarioId}).sort({createAt:-1})
    res.json(prendas)
}

export const crearPrenda= async (req,res)=>{
    try{
        console.log('usuarioId recibido: ',req.usuarioId)
        const{nombre,categoria,color,temporada}= req.body

        const prenda= await Prenda.create({
            usuario: req.usuarioId,
            nombre,
            categoria,
            color,
            temporada,
            imagenURL:req.file?.path,
            imagenPublicId: req.file?.filename
        })
        res.status(201).json(prenda)
    }catch(error){
        res.status(400).json({message:'No se puede crear la prenda',error:error.message})
    }
}
export const eliminarPrenda=async (req,res)=>{
    const prenda=await Prenda.findOneAndDelete({_id:req.params.id,usuario:req.usuarioId})
    if(!prenda) return res.status(404).json({message:'Prenda no encontrada'})
    res.json({message:'Prenda eliminada correctamente'})
}

