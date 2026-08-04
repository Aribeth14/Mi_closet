import mongoose from "mongoose"

const usuarioSchema = mongoose.Schema(
    {  
        email:{type:String, required: true, unique:true,lowercase:true},
        password:{type:String, required: true},
        medidas:{
            estatura:Number,
            busto:Number,
            cintura:Number,
            cadera:Number,
            hombros:Number,
            TipoCuerpo:String
        }
        },
        {timestamps:true}
    )
export default mongoose.model('Usuario', usuarioSchema)
    
