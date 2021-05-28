var express = require('express');
var routeur = express.Router();
const twig = require('twig');
const livreSchema = require("./models/livre.model");
const mongoose = require('mongoose');


routeur.get('/', (req, res) => {
    res.render("home.html.twig");    
});
         
routeur.get('/livres', (req, res) => {
    console.log(req.path);
    livreSchema.find()
        .exec()
        .then(livres => {
            res.render("livres/liste.html.twig", {livres:livres});
        })
        .catch(error => {
            console.log(error);
        });
});

routeur.get("/livres/:id", (req,res) => {
    console.log(req.params.id);
    const livre = livreSchema.findById(req.params.id)
    .exec()
    .then(livre => {
        console.log(livre);
        res.render("livres/livre.html.twig", {livre:livre});
    })
    .catch(error=> {
        console.log(error);
    })
});

routeur.post("/livres", (req,res) => {   
    const livre = new livreSchema({
        _id: new mongoose.Types.ObjectId(),
        nom: req.body.nom,
        auteur: req.body.auteur,
        annee: req.body.annee,
        pages: req.body.pages,
        description: req.body.description
    });
    livre.save()
    .then((resultat) => {
        console.log(resultat);
        res.redirect("/livres");
    }).catch(error => {
        console.log(error);
    });
});

routeur.use((req,res, next)=> {
    const erreur = new Error('Error page not found');
    erreur.status = 404;
    next(erreur); 
})

routeur.use((req,res, erreur) => {
    res.status(erreur.status || 500);
    res.end(erreur.messages);
})

module.exports = routeur;