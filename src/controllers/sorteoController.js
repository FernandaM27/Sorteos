const sorteo = require("../models/sorteo");
const { crearBoletos } = require("./boletoController");

const guardarSorteo = (request, response) => {
  const { numMin, numMax } = request.body;
  const boletos = crearBoletos(numMin, numMax);
  const sort = new sorteo({
    ...request.body,
    boletos,
  });

  sort.save((err) => {
    if (err) {
      response.status(400).json({
        status: "error",
        error: err,
      });
    } else
      response.status(201).json({
        status: "success",
        sort,
      });
  });
};

const getSorteos = (req, res) => {
  sorteo.find((err, sorteo) => {
    if (err) {
      res.status(400).json({
        status: "error",
        message: `Error al obtener los sorteo: ${err}`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: sorteo,
      });
    }
  });
};

const getSorteo = (req, res) => {
  sorteo.findById(req.params.id, (err, sorteo) => {
    if (err) {
      res.status(400).json({
        status: "error",
        message: `Error al obtener a la sorteo: ${err}`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: sorteo,
      });
    }
  });
};

const eliminarSorteo = (req, res) => {
  sorteo.findByIdAndDelete({ _id: req.params.id }, (err, sorteo) => {
    if (err) {
      res.status(400).json({
        status: "error",
        message: `Error al eliminar a el sorteo: ${err}`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: sorteo,
      });
    }
  });
};

const actualizarSorteo = (req, res) => {
  sorteo.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, sort) => {
      if (err) {
        res.status(400).json({
          status: "error",
          message: `Error al actualizar el sorteo: ${err}`,
        });
      } else {
        res.status(200).json({
          status: "success",
          data: sort,
        });
      }
    }
  );
};

module.exports = {
  guardarSorteo,
  getSorteo,
  getSorteos,
  eliminarSorteo,
  actualizarSorteo,
};
