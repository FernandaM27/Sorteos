const jwt_decode = require('jwt-decode');
const { getAdminByEmail, actualizarAdmin } = require('../adminController');

const addSorteoToAdmin = async (token, sorteo) => {
    const { correo } = jwt_decode(token);
    const admin = await getAdminByEmail(correo).then((admin) => admin);
    admin.sorteos.push(sorteo);
    const result = actualizarAdmin(admin._id, admin);
    return result;
};

module.exports = {
    addSorteoToAdmin
};