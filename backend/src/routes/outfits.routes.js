import { Router } from 'express'
import { verificarToken } from '../middleware/auth.middleware.js'
import { listarOutfits, crearOutfit, eliminarOutfit } from '../controllers/outfits.controller.js'

const router = Router()

router.use(verificarToken)

router.get('/', listarOutfits)
router.post('/', crearOutfit)
router.delete('/:id', eliminarOutfit)

export default router

