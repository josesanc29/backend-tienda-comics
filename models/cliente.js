var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clienteSchema = new Schema({
    nombre:{type: String, require:[true , 'EL nombre es obligatorio']},
    telefono:{type: Number, unique: true,require:[true , 'El telefono es obligatorio']},
    email:{type: String, unique: true , require:[true , 'el email es obligatorio']},
    tienda: {type: Schema.Types.ObjectId , ref: 'Tienda'},
    comic: { type: Schema.Types.ObjectId , ref: 'Comic'}
});

module.exports = mongoose.model('Cliente', clienteSchema);