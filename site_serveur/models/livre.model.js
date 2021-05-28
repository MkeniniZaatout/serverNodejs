const mongoose = require('mongoose');

const livreSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nom: String,
    auteur: String,
    annee: Number, 
    pages: Number,
    description: String
});

module.exports = mongoose.model("livre", livreSchema);