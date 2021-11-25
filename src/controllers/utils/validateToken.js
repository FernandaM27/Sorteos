const jwt_decode = require('jwt-decode');
const { getAdminByEmail } = require('../adminController');

const validateToken = async (token) => {
    try {
        const { correo } = jwt_decode(token);
        const admin = await getAdminByEmail(correo).then((admin) => admin);
        return admin ? true : false;
    } catch (error) {
        return false;
    }
};

module.exports = { validateToken };
