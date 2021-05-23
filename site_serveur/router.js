var express = require('express');
var routeur = express.Router();
const twig = require('twig');

routeur.get('/', (req, res) => {
    res.render("home.html.twig");    
});
         
routeur.get('/livres', (req, res) => {
    console.log(req.path);
    res.render("livres/liste.html.twig");  
});

routeur.get("/livres/:nom", (req,res) => {
    console.log(req.params.nom);
    res.render("livres/livre.html.twig",{nom: req.params.nom}); 
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