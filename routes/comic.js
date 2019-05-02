var express = require('express');

var app = express();

var Comic = require('../models/comic');

// ==========================================
// Obtener todos los Comics
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Comic.find({}, 'titulo descripcion precio enStock vendido cantidadStock')
        .skip(desde)
        .limit(5)
        .exec(
            (err, comics) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando comic',
                        errors: err
                    });
                }

                Comic.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        comics: comics,
                        total: conteo
                    });

                })
            });
});
// ==========================================
// Obtener todos los Comics Vendidos
// ==========================================
app.get('/vendidos', (req, res, next) => {

    var desde = req.query.desde || 0;
    var cantidadStock = req.query.cantidadStock;
    desde = Number(desde);

    Comic.find({ vendido: true , cantidadStock:{$gte: 0} }, 'titulo precio enStock cantidadStock')
        .skip(desde)
        .limit(5)
        .exec(
            (err, comics) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando comic',
                        errors: err
                    });
                }
                if (comics.cantidadStock > 100 || comics.cantidadStock < 0) {
                    return res.status(405).json({
                        ok: false,
                        mensaje: 'Error la cantidad de Stock no puede ser mayor de 100 o menor de 0',
                        errors: err
                    });
                }

                Comic.count({vendido: true , cantidadStock: {$gte: 0}}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        comics: comics,
                        total: conteo
                    });

                })

            });
});

// ==========================================
// Obtener todos los Comics en Stock
// ==========================================
app.get('/stock', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Comic.find({ enStock:true , cantidadStock: {$gte: 0} }, 'titulo  descripcion precio cantidadStock')
        .skip(desde)
        .limit(5)
        .exec(
            (err, comics) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando comic',
                        errors: err
                    });
                }
                if (comics.cantidadStock > 100 || comics.cantidadStock < 0) {
                    return res.status(405).json({
                        ok: false,
                        mensaje: 'Error la cantidad de Stock no puede ser mayor de 100 o menor de 0',
                        errors: err
                    });
                }

                Comic.count({ enStock:true , cantidadStock: {$gte: 0} }, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        comics: comics,
                        total: conteo
                    });

                })
            });
});


// ==========================================
// Actualizar comic
// ==========================================
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Comic.findById(id, (err, comic) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar comic',
                errors: err
            });
        }

        if (!comic) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El comic con el id ' + id + ' no existe',
                errors: { message: 'No existe un comic con ese ID' }
            });
        }


        comic.titulo = body.titulo;
        comic.descripcion = body.descripcion;
        comic.precio = body.precio;


        comic.save((err, comicGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar comic',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                comic: comicGuardado
            });

        });

    });

});



// ==========================================
// Crear un nuevo comic
// ==========================================
app.post('/', (req, res) => {

    var body = req.body;

    var comic = new Comic({
        titulo: body.titulo,
        descripcion: body.descripcion,
        precio: body.precio,
        enStock: body.enStock,
        vendido: body.vendido,
        cantidadStock : body.cantidadStock,
    });

    comic.save((err, comicGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear comic',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            comic: comicGuardado,
        });
    });

});


// ============================================
//   Borrar un comic por el id
// ============================================
app.delete('/:id', (req, res) => {

    var id = req.params.id;

    Comic.findByIdAndRemove(id, (err, comicBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar comic',
                errors: err
            });
        }

        if (!comicBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un comic con ese id',
                errors: { message: 'No existe un comic con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            comic: comicBorrado
        });

    });

});


module.exports = app;