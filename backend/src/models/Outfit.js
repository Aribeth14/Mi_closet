import mongoose  from 'mongoose'

const outfitSchema = mongoose.Schema(
    {
        usuario:{type:mongoose.Schema.Types.ObjectId, ref:'Usuario',required:true},
        nombre:{type:String,required:true},
        prendas:[{type:mongoose.Schema.Types.ObjectId, ref:'Prenda'}],
        ocasion:String
    },
    {timestamps:true}
)
export default mongoose.model('Outfit', outfitSchema)
