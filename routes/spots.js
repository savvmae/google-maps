const express = require('express');
const route = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Spots = require('../models/spot');

route.get('/api/spots', async function (request, response) {
    // returns all spots
    let spots = await Spots.find()
    console.log(spots)
    response.status(200).json(spots)
});

route.post('/api/spots', async function (request, response) {
    let newSpot = await Spots.create({
        position: {
            lat: parseFloat(request.body.details.lat),
            lng: parseFloat(request.body.details.lng),
        },
        details: {
            spotType: request.body.details.spotType,
            spotNotes: request.body.details.spotNotes,
            isSpotTaken: request.body.details.isSpotTaken
        }
    })
    console.log(newSpot)
    return response.send({newSpot})
})

module.exports = route;