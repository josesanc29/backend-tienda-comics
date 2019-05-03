var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var comicSchema = new Schema({
    titulo: { type: String, unique: true , required:[ true , 'El titulo es obligatorio']},
    descripcion: { type: String },
    precio: { type: Number , required:[ true , 'El precio es obligatorio']},
    enStock:{ type: Boolean, default:true , required:[ true , 'El enStock es obligatorio']},
    vendido:{ type: Boolean, default:false, required:[ true , 'El vendido es obligatorio']},
    compra1:{ type: Boolean , default: false },
    cantidadStock: { type: Number , min:0 , max:100 ,required:[ true , 'El cantidad se debe especificar']},
    cliente: {type: Schema.Types.ObjectId , ref: 'Cliente'}, 
    tienda: {type: Schema.Types.ObjectId , ref: 'Tienda'}
});


module.exports = mongoose.model('Comic', comicSchema);