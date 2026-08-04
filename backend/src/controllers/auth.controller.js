import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

export const login= async (req, res) => {
    try{
        const {email, password} = req.body

        const usuario= await Usuario.findOne({email:email.toLowerCase()})
        if(!usuario){
            return res.status(401).json({message:'Credenciales incorrectas'})
        }

        const passwordValida=await bcrypt.compare(password, usuario.password)
        if(!passwordValida){
            return res.status(401).json({message:'Credenciales incorrectas'})
        }

        const token= jwt.sign({id:usuario._id}, process.env.JWT_SECRET,{expiresIn:'7d'})
        res.json({token})
    }catch(error){
        res.status(500).json({message:'Error en el servidor',error:error.message})
    }
}
