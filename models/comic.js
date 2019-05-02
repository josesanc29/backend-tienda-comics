var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var comicSchema = new Schema({

    titulo: { type: String,unique:true, required: [true, 'El nombre es necesario'] },
    descripcion: { type: String },
    precio: { type: Number, required:[true , 'Debe tener un precio el comic'] },
    enStock:{ type: Boolean, default:true , required: [true, 'El campo Stock es obligatorio marcarlo']},
    vendido:{ type: Boolean, default:false , required:[true , 'Debe estar informado este campo']}
});


module.exports = mongoose.model('Comic', comicSchema);