const express = require('express');
const server = express();
const morgan = require("morgan");
const router = require("./router");
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/biblio", {useNewUrlParser:true, useUnifiedTopology:true});
/**
 * CONNEXION :
*/

const livreSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nom: String,
    auteur: String,
    annee: Number, 
    pages: Number 
});

const livreModel = mongoose.model("livre", livreSchema);

const allLivre = 
    livreModel.find()
        .exec()
        .then(livres => {
            console.log("livres",livres);
        })
        .catch();

// NB : Utiliser les modules morgan et nodemon seulement en dev
// pour l'affichage des logs
server.use(morgan('dev'));
server.use(express.static('public'));


server.use("/", router);
server.use("/livres", router);
server.listen(3000);

