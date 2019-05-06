var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tiendaSchema = new Schema({
    nombreTienda:{type: String, require:[true , 'EL nombre es obligatorio']},
    email:{type: String, unique: true , require:[true , 'el email es obligatorio']},
    longitud:{type: Number},
    latitud:{type: Number}
});

// // Indexes this schema in 2dsphere format (critical for running proximity searches)
// tiendaSchema.index({location: '2dsphere'});

module.exports = mongoose.model('Tienda', tiendaSchema);