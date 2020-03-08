const express = require('express');
const handle_endpoints = require('./handle_endpoints');
const app = express();
const port = 5000;

// enable coors to allow *
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// this function handle request
handle_endpoints.process_request(app);

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
})