import Prenda from "../models/Prenda.js";
import {combinacionValida} from "../utils/colores.js"


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

export const generarOutfit = async (req, res) => {
  try {
    const { ocasion, temporada } = req.query

    const filtro = { usuario: req.usuarioId }
    if (ocasion) filtro.ocasion = ocasion
    if (temporada) filtro.temporada = temporada

    const prendas = await Prenda.find(filtro)

    const tops = prendas.filter((p) => p.categoria === 'top')
    const bottoms = prendas.filter((p) => p.categoria === 'bottom')
    const vestidos = prendas.filter((p) => p.categoria === 'vestido')
    const calzados = prendas.filter((p) => p.categoria === 'calzado')
    const accesorios = prendas.filter((p) => p.categoria === 'accesorio')

    const hayOpcionSuperior = tops.length > 0 || vestidos.length > 0
    if (!hayOpcionSuperior || calzados.length === 0) {
      return res.status(404).json({ message: 'No tienes suficientes prendas para generar un outfit con esos filtros' })
    }

    const elegirAlAzar = (arr) => arr[Math.floor(Math.random() * arr.length)]

    let intentos = 0
    let combinacion = null

    while (intentos < 20 && !combinacion) {
      intentos++

      const usarVestido = vestidos.length > 0 && Math.random() < 0.4
      const seleccion = []

      if (usarVestido) {
        seleccion.push(elegirAlAzar(vestidos))
      } else {
        if (tops.length === 0 || bottoms.length === 0) continue
        seleccion.push(elegirAlAzar(tops))
        seleccion.push(elegirAlAzar(bottoms))
      }

      seleccion.push(elegirAlAzar(calzados))

      if (accesorios.length > 0 && Math.random() < 0.5) {
        seleccion.push(elegirAlAzar(accesorios))
      }

      if (combinacionValida(seleccion)) {
        combinacion = seleccion
      }
    }

    if (!combinacion) {
      return res.status(404).json({ message: 'No se encontró una combinación de colores compatible, intenta agregar más prendas' })
    }

    res.json(combinacion)
  } catch (error) {
    res.status(500).json({ message: 'Error al generar outfit', error: error.message })
  }
}

