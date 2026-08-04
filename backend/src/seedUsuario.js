import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { connectDB } from './config/db.js'
import Usuario from './models/Usuario.js'
import mongoose from 'mongoose'

const EMAIL = process.argv[2]
const PASSWORD = process.argv[3]

if (!EMAIL || !PASSWORD) {
  console.log('Uso: node src/seedUsuario.js tuemail@ejemplo.com tuPassword123')
  process.exit(1)
}

const run = async () => {
  await connectDB()

  const existente = await Usuario.findOne({ email: EMAIL.toLowerCase() })
  if (existente) {
    console.log('Ya existe un usuario con ese correo.')
    process.exit(0)
  }

  const passwordHash = await bcrypt.hash(PASSWORD, 10)
  await Usuario.create({ email: EMAIL.toLowerCase(), password: passwordHash })

  console.log('Usuario creado correctamente:', EMAIL)
  mongoose.connection.close()
}

run()
