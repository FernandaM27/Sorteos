require('./database/database');
const app = require('./server/server');
 
app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`);
}); 
