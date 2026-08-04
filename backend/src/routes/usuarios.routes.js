import {Router} from 'express'
import { verificarToken } from '../middleware/auth.middleware.js'
import { obtenerPerfil, actualizarPerfil } from '../controllers/usuario.controller.js'

const router=Router()
router.use(verificarToken)

router.get('/perfil',obtenerPerfil)
router.put('/perfil',actualizarPerfil)

export default router

