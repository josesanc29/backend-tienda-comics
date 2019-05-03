var express = require('express');
var app = express();
var Cliente = require('../models/cliente');
// ==========================================
// Obtener todas los clientes
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Cliente.find({}, 'nombre telefono email comicsComprados')
        .populate('Comics' , 'titulo descripcion precio')
        .skip(desde)
        .limit(5)
        .exec(
            (err, clientes) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando clientes',
                        errors: err
                    });
                }

                Cliente.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        clientes: clientes,
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

    Cliente.findById(id)
        .populate('Comics')
        .exec((err, cliente) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar cliente',
                    errors: err
                });
            }

            if (!cliente) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El cliente con el id ' + id + ' no existe',
                    errors: { message: 'No existe un cliente con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                cliente: cliente
            });

        })


});

// ==========================================
// Crear un nuevo cliente
// ==========================================
app.post('/', (req, res) => {

    var body = req.body;

    var cliente = new Cliente({
        nombre: body.nombre,
        telefono: body.telefono,
        email: body.email,
        comicsComprados:[{
            comicId : body.comicId
        }] 
        
    });

    cliente.save((err, clienteGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear cliente',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            cliente: clienteGuardado,
        });
    });

});

// ============================================
//   Borrar un cliente por el id
// ============================================
app.delete('/:id', (req, res) => {

    var id = req.params.id;

    Cliente.findByIdAndRemove(id, (err, clienteBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar comic',
                errors: err
            });
        }

        if (!clienteBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un cliente con ese id',
                errors: { message: 'No existe un cliente con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            cliente: clienteBorrado
        });

    });

});


module.exports = app;