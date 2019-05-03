var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tiendaSchema = new Schema({
    nombreTienda:{type: String, require:[true , 'EL nombre es obligatorio']},
    email:{type: String, unique: true , match: [/\S+@\S+\.\S+/, 'el email no es valido'], require:[true , 'el email es obligatorio']},
    location: {type: [Number], required: true}, // [Long, Lat]
    comics:[{
        type: Schema.Types.ObjectId ,
        ref: 'Comics',
        require: [true , 'la tienda debe tener comics']
    }]
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
tiendaSchema.index({location: '2dsphere'});

module.exports = mongoose.model('Tienda', tiendaSchema);