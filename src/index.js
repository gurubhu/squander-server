require('./models/User');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


require('./startup/routes')(app);
require('./startup/db')();

require('./prod')(app);

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`);
})





