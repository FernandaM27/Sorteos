const validacionesModificarSorteo = (sorteo) => {
    const tiempoRecordatorio = sorteo.tiempoRecordatorio;
    const tituloSorteo = sorteo.titulo;
    const precioNumeros = sorteo.precioNumeros;
    const boletos = sorteo.boletos;
    const fechaInicioVenta = new Date(sorteo.fechaInicioVenta);
    const fechaFinVenta = new Date(sorteo.fechaFinVenta);
    const fechaSorteo = new Date(sorteo.fechaSorteo);
    const fechaCreacion = new Date(sorteo.fechaCreacion);

    if ( fechaCreacion > fechaSorteo || fechaCreacion > fechaInicioVenta ||fechaCreacion > fechaFinVenta) {
        return false;
    }
    if (fechaInicioVenta > fechaFinVenta) {
        return false;
    }
    if (fechaSorteo < fechaFinVenta) {
        return false;
    }

    if (sorteo.numMin > sorteo.numMax) {
        return false;
    }

    if (boletos === [] && sorteo.estadoSorteo === 'espera') {
        return false;
    }

    if (precioNumeros < 1) {
        return false;
    }

    if (tiempoRecordatorio > 2 || tituloSorteo.trim().length < 1) {
        return false;
    }

    return true;
};

module.exports = validacionesModificarSorteo;
