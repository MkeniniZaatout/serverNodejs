var express = require('express');
var server = express();
var morgan = require("morgan");
var router = require("./router");

// NB : Utiliser les modules morgan et nodemon seulement en dev
// pour l'affichage des logs
server.use(morgan('dev'));
server.use("/", router);
server.listen(3000);

