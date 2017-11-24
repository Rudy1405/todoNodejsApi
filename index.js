const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // put de app on any avaliable port in that momento or the 3000
const mongoose = require('mongoose'); 
const Task = require("./api/models/todoModel") /// importamos nuestro schema 
const bodyParser = require('body-parser');


mongoose.Promise = global.Promise; // declarando promise
mongoose.connect("mongodb://localhost:27017/todoapp"); // conectando a mongodb

/// handlers de los request

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


let routes = require("./api/routes/todoRoutes"); // se crea el objeto routes que tendra las routas declaradas en todoRoutes
routes(app); // como ese obj tiene codigo node lo usamos como la app para registrar lasrutas

// put the server running
app.listen(port, () => {
    console.log("Amma live on port: " + port);
});

