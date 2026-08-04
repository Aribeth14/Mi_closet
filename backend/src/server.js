import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import prendasRoutes from './routes/prendas.routes.js'
import outfitsRoutes from './routes/outfits.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/prendas', prendasRoutes)
app.use('/api/outfits', outfitsRoutes)
app.use('/api/usuarios', usuariosRoutes)


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mensaje: 'El backend está funcionando' })
})

const PORT = process.env.PORT || 4000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
  })
})

