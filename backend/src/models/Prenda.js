import mongoose from 'mongoose  '

const prendaSchema = mongoose.Schema(
    {
        usuario:{type:mongoose.Schema.Types.ObjectId, ref:'Usuario',required:true},
        nombre:{type:String,required:true},
        categoria:{
            type:String,
            enum:['top', 'bottom', 'vestido', 'calzado', 'accesorio'],
            required:true
        },
        color:String,
        temporada:{type:String,default:'todo el año'},
        imagenURL:{type:String, required:true}
    },
    {timestamps:true}
)
export default mongoose.model('Prenda', prendaSchema)

