import {Router} from 'express'
import multer from 'multer'
import {storage} from '../config/cloudinary.js'
import { verificarToken } from '../middleware/auth.middleware.js'
import { listarPrendas, crearPrenda, eliminarPrenda,generarOutfit } from '../controllers/prendas.controller.js'

const upload=multer({storage})
const router=Router()
router.use(verificarToken)

router.get('/',listarPrendas)
router.get('/generar-outfit',generarOutfit)
router.post('/',upload.single('imagen'),crearPrenda)
router.delete('/:id',eliminarPrenda)

export default router


