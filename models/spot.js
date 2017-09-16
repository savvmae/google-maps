const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const SpotsSchema = new mongoose.Schema({

    position: {
        lat: Number,
        lng: Number
    },
    details: {
        spotType: String,
        spotNotes: String,
        isSpotTaken: Boolean
    }

});

const Spots = mongoose.model('Spots', SpotsSchema);

module.exports = Spots 
