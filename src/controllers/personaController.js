const persona = require('../models/persona');

const guardarPersona = (request, response) => {
    const pers = new persona(req.body);
    pers.save((err) => {
        if (err) {
            response.status(400).json({
                status: 'error',
                error: err,
            });
        } else
            response.status(201).json({
                status: 'success',
                pers,
            });
    });
};

const getPersonas = (req, res) => {
    persona.find((err, persona) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al obtener las personas: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: persona,
            });
        }
    });
};

const getPersona = (req, res) => {
    persona.findById(req.params.id, (err, persona) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al obtener a la persona: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: persona,
            });
        }
    });
};

const eliminarPersona = (req, res) => {
    persona.findByIdAndDelete({ _id: req.params.id }, (err, persona) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al eliminar a la persona: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: persona,
            });
        }
    });
};

const actualizarPersona = (req, res) => {
    persona.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, persona) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al actualizar el administrador: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: persona,
            });
        }
    });
};

module.exports = {
    guardarPersona,
    getPersonas,
    getPersona,
    eliminarPersona,
    actualizarPersona,
};
