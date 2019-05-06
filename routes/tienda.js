var express = require('express');
var app = express();
var Tienda = require('../models/tienda');

// ==========================================
// Obtener todas las Tiendas
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Tienda.find({}, 'nombreTienda email longitud latitud')
        .skip(desde)
        .limit(5)
        .exec(
            (err, tiendas) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando tiendas',
                        errors: err
                    });
                }

                Tienda.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        tiendas: tiendas,
                        total: conteo
                    });

                })
            });
});

// ==========================================
// Obtener cliente por id
// ==========================================

app.get('/:id', (req, res) => {

    var id = req.params.id;

    Tienda.findById(id)
        .exec((err, tienda) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar tienda',
                    errors: err
                });
            }

            if (!tienda) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El tienda con el id ' + id + ' no existe',
                    errors: { message: 'No existe un tienda con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                tienda: tienda
            });

        })


});

// ==========================================
// Crear un nuevo tienda
// ==========================================
app.post('/', (req, res) => {

    var body = req.body;

    var tienda = new Tienda({
        nombreTienda: body.nombreTienda,
        email: body.email,
        longitud: body.longitud,
        latitud: body.latitud
    });

    tienda.save((err, tiendaGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear cliente',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            tienda: tiendaGuardado,
        });
    });

});

module.exports = app;