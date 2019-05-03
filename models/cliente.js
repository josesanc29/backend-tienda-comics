var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clienteSchema = new Schema({
    nombre:{type: String, require:[true , 'EL nombre es obligatorio']},
    telefono:{type: Number, unique: true, min: 0, max: 9 ,require:[true , 'El telefono es obligatorio']},
    email:{type: String, unique: true , match: [/\S+@\S+\.\S+/, 'el email no es valido'], require:[true , 'el email es obligatorio']},
    comicsComprados:[{
        type: Schema.Types.ObjectId ,
        ref: 'Comics'
    }]
});

module.exports = mongoose.model('Cliente', clienteSchema);