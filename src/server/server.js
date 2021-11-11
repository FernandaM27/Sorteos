const express = require('express');
const cors = require('cors');
const router = require('../routes/index.routes');
const ErrorHandler = require('../errorHandler/errorHandler');

const app = express();
app.set('port', 3000);
app.use(express.json());

app.use(cors({ origin: '*' }));

app.use('/', router);


app.all('*', (req, resp, next) => {
    next(
        new ErrorHandler(
            `No se pudo acceder a ${req.originalUrl} en el servidor`,
            404
        )
    );
});

app.use(express.urlencoded({ extended: true }));

module.exports = app;
