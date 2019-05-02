var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var comicSchema = new Schema({

    titulo: { type: String, unique: true , required:[ true , 'El campo titulo es obligatorio']},
    descripcion: { type: String },
    precio: { type: Number , required:[ true , 'El campo precio es obligatorio']},
    enStock:{ type: Boolean, default:true , required:[ true , 'El campo enStock es obligatorio']},
    vendido:{ type: Boolean, default:false, required:[ true , 'El campo vendido es obligatorio']},
    compra1:{ type: Boolean , default: false },
    cantidadStock: { type: Number , required:[ true , 'El campo cantidad se debe especificar']}
});


module.exports = mongoose.model('Comic', comicSchema);