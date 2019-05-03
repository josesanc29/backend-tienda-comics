var express = require('express');

var app = express();
var Comic = require('../models/comic');
var Cliente = require('../models/cliente');
var Tienda = require('../models/tienda');

// ==============================
// Busqueda por colección
// ==============================
app.get('/coleccion/:tabla/:busqueda', (req, res) => {

    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {

        case 'comics':
            promesa = buscarComics(busqueda, regex);
            break;
        case 'clientes':
            promesa = buscarClientes(busqueda , regex);
            break;
        case 'tiendas': 
            promesa = buscarTiendas(busqueda , regex);
            break;
        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo son: comics',
                error: { message: 'Tipo de tabla/coleccion no válido' }
            });

    }

    promesa.then(data => {

        res.status(200).json({
            ok: true,
            [tabla]: data
        });

    })

});


// ==============================
// Busqueda general
// ==============================
app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');


    Promise.all([
            buscarComics(busqueda, regex),
            buscarClientes(busqueda , regex),
            buscarTiendas(busqueda , regex)
        ])
        .then(respuestas => {

            res.status(200).json({
                ok: true,
                comics: respuestas[0],
                clientes: respuestas[1],
                tiendas: respuestas[2]
            });
        })


});

function buscarComics(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Comic.find({}, 'titulo precio enStock vendido')
            .or([{ 'titulo': regex }, { 'precio': regex }])
            .exec((err, comics) => {

                if (err) {
                    reject('Erro al cargar comics', err);
                } else {
                    resolve(comics);
                }


            })


    });
}

function buscarClientes(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Cliente.find({}, 'titulo precio enStock vendido')
            .or([{ 'titulo': regex }, { 'precio': regex }])
            .exec((err, clientes) => {

                if (err) {
                    reject('Erro al cargar clientes', err);
                } else {
                    resolve(clientes);
                }


            })


    });
}

function buscarTiendas(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Tienda.find({}, 'titulo precio enStock vendido')
            .or([{ 'titulo': regex }, { 'precio': regex }])
            .exec((err, tiendas) => {

                if (err) {
                    reject('Erro al cargar tiendas', err);
                } else {
                    resolve(tiendas);
                }


            })


    });
}


module.exports = app;