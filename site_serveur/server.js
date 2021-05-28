const express = require('express');
const server = express();
const morgan = require("morgan");
const router = require("./router");
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/biblio", {useNewUrlParser:true, useUnifiedTopology:true});
const bodyparser = require("body-parser");

/**
 * CONNEXION :
*/

// NB : Utiliser les modules morgan et nodemon seulement en dev
// pour l'affichage des logs
server.use(express.static('public'));
server.use(morgan('dev'));

server.use(bodyparser.urlencoded({extended:false}));

server.use("/", router);
server.use("/livres", router);
server.listen(3000);

