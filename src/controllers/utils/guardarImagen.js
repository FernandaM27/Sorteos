const hash = require('object-hash');
const base64Img = require('base64-img');

const guardarImagen = (imagedata) => {
    const campos = __dirname.split("\\")
    campos.pop()
    campos.pop()
    const path = campos.join("\\") + "/imagenes";
    try {
        console.log(path)
        const imagenHash = hash({ imagen: imagedata, millis: new Date().getTime() })
        base64Img.img(imagedata, path, imagenHash, function (err, filepath) { });
        return imagenHash;
    } catch (e) {
        return {
            status: 'error',
            message: e.toString()
        };
    }
}

module.exports = guardarImagen;