var express = require('express');
var routeur = express.Router();
const twig = require('twig');

routeur.get('/', (req, res) => {
    res.render("home.html.twig");
});

routeur.get('/test', (req, res) => {
    console.log("demande recue avec la méthode get sur l'url /test");
    console.log(req.path);
    res.end('Demande GET /test recue');
});

routeur.post('/test', (req, res) => {
    console.log("demande recue avec la méthode get sur l'url /test");
    console.log(req.path);
    res.end('Demande POST /test recue');
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