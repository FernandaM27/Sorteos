const admin = require('../models/admin');

const guardarAdmin = (req, res) => {
    const adm = new admin(req.body);
    
    adm.save((err, admin) => {
        if (err) {
            res.status(500).json({
                estatus: 'error',
                mensaje: `Error al crear el administrador: ${err}`,
            });
        } else {
            res.status(200).json({
                estatus: 'success',
                datos: admin,
            });
        }
    });
};

const getAdmins = (req, res) => {
    admin.find((err, admin) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al obtener los administradores: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: admin,
            });
        }
    });
};

const getAdmin = (req, res) => {
    admin.findById(req.params.id, (err, admin) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al obtener el administrador: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: admin,
            });
        }
    });
};

const eliminarAdmin = (req, res) => {
    admin.findByIdAndDelete({ _id: req.params.id }, (err, admin) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al eliminar el administrador: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: admin,
            });
        }
    });
};

const actualizarAdmin = (req, res) => {
    admin.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, admin) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al actualizar el administrador: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: admin,
            });
        }
    });
};

module.exports = {
    guardarAdmin,
    getAdmins,
    getAdmin,
    eliminarAdmin,
    actualizarAdmin,
};
