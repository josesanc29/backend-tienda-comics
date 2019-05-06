var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var comicSchema = new Schema({
    titulo: { type: String, unique: true , required:[ true , 'El titulo es obligatorio']},
    descripcion: { type: String },
    precio: { type: Number , required:[ true , 'El precio es obligatorio']},
    vendido:{ type: Boolean, default:false, required:[ true , 'El vendido es obligatorio']},
    cantidadStock: { type: Number , min:0 , max:100 ,required:[ true , 'El cantidad se debe especificar']},
});


module.exports = mongoose.model('Comic', comicSchema);