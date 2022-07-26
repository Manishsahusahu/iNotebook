const connectToMongo = require('./db');
const express = require('express');

const cors = require('cors')
const app = express()

app.use(cors())

connectToMongo();
const port = 4000;
app.use(express.json()); // middleware used for getting request.body as json to the api hit.


// Available Routes
app.use('/api/auth',require ('./routes/auth'))
app.use('/api/notes',require ('./routes/notes')) 

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})