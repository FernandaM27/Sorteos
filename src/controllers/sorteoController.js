const sorteo = require('../models/sorteo');
const { addSorteoToAdmin } = require('./utils/addSorteoToAdmin');
const validacionesModificarSorteo = require('./utils/validacionesModificarSorteo');
const guardarImagen = require('./utils/guardarImagen');
const { validateToken } = require('./utils/validateToken');

const guardarSorteo = async (request, response) => {
    const token = request.params.token;

    let { imagen } = request.body;

    if (imagen.trim() !== '') {
        imagen = guardarImagen(imagen);
    }

    const sort = new sorteo({
        ...request.body,
        imagen,
    });
    sort.save((err) => {
        if (err) {
            response.status(400).json({
                status: 'error',
                error: err,
            });
        } else
            response.status(201).json({
                status: 'success',
                sort,
            });
    });
    const result = await addSorteoToAdmin(token, sort);
};

const getSorteos = (req, res) => {
    const token = req.params.token;
    sorteo.find((err, sorteo) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al obtener los sorteo: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: sorteo,
            });
        }
    });
};

const getSorteo = (req, res) => {
    const token = req.params.token;
    validateToken(token).then((isValid) => {
        if (isValid) {
            sorteo.findById(req.params.id, (err, sorteo) => {
                if (err) {
                    res.status(400).json({
                        status: 'error',
                        message: `Error al obtener a la sorteo: ${err}`,
                    });
                } else {
                    res.status(200).json({
                        status: 'success',
                        data: sorteo,
                    });
                }
            });
        } else {
            res.status(401).json({
                status: 'error',
                message: 'Token invalido',
            });
        }
    });
};

const getSorteoTitulo = (req, res) => {
    const token = req.params.token;
    const titulo = req.params.titulo;
    validateToken(token).then((isValid) => {
        if (isValid) {
            sorteo.find(
                { titulo: { $regex: titulo, $options: 'i' } },
                (err, sorteos) => {
                    if (err) {
                        res.status(400).json({
                            status: 'error',
                            message: `Error al obtener a la sorteo: ${err}`,
                        });
                    } else {
                        res.status(200).json({
                            status: 'success',
                            data: sorteos,
                        });
                    }
                }
            );
        } else {
            res.status(401).json({
                status: 'error',
                message: 'Token invalido',
            });
        }
    });
};

const getSorteoEstado = (req, res) => {
    const token = req.params.token;
    const estadoSorteo = req.params.estado;
    validateToken(token).then((isValid) => {
        if (isValid) {
            sorteo.find({ estadoSorteo }, (err, sorteos) => {
                if (err) {
                    res.status(400).json({
                        status: 'error',
                        message: `Error al obtener a la sorteo: ${err}`,
                    });
                } else {
                    res.status(200).json({
                        status: 'success',
                        data: sorteos,
                    });
                }
            });
        } else {
            res.status(401).json({
                status: 'error',
                message: 'Token invalido',
            });
        }
    });
};

const eliminarSorteo = (req, res) => {
    sorteo.findByIdAndDelete({ _id: req.params.id }, (err, sorteo) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al eliminar a el sorteo: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: sorteo,
            });
        }
    });
};

const actualizarSorteo = (req, res) => {
    if (validacionesModificarSorteo(req.body)) {
        actualizar_sorteo(req, res);
    } else {
        res.status(200).json({
            status: 'error',
            message: 'El tiempo de recordatorio no puede ser mayor a 2',
        });
    }
};

const actualizar_sorteo = (req, res) => {
    validateToken(req.params.token).then((isValid) => {
        if (isValid) {
            let { imagen } = req.body;
            if (imagen.trim() !== '') {
                imagen = guardarImagen(imagen);
            }
            sorteo.findByIdAndUpdate(
                { _id: req.params.id },
                { ...req.body, imagen },
                { new: true },
                (err, sorteo) => {
                    if (err) {
                        res.status(400).json({
                            status: 'error',
                            message: `Error al actualizar el sorteo: ${err}`,
                        });
                    } else {
                        res.status(200).json({
                            status: 'success',
                            data: sorteo,
                        });
                    }
                }
            );
        } else {
            res.status(200).json({
                status: 'error',
                message: 'Token invalido',
            });
        }
    });
};


module.exports = {
    guardarSorteo,
    getSorteo,
    getSorteoTitulo,
    getSorteoEstado,
    getSorteos,
    eliminarSorteo,
    actualizarSorteo
};
