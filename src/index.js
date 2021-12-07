const mongo = require('./database/database');
const app = require('./server/server');

const server = app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`);
});

module.exports = { server, mongo };
