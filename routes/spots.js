const express = require('express');
const route = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Spots = require('../models/spot');

route.get('/api/spots', async function (request, response) {
    let spots = await Spots.find()
    console.log(spots)
    response.status(200).json(spots)
});

route.post('/api/spots', passport.authenticate('jwt', { session: false }), async function (request, response) {
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
    return response.send({ newSpot })
})

route.put('/api/spots', passport.authenticate('jwt', { session: false }), async function (request, response) {
    let thisSpot = await Spots.findOneAndUpdate({ _id: request.body.id },
        {
            spotNotes: request.body.details.spotNotes,
            spotType: request.body.details.spotType,
            isSpotTaken: request.body.details.isSpotTaken
        })
    return response.status(200).json({message: "success"})
})

route.delete('/api/spots', passport.authenticate('jwt', { session: false }), async function (request, response) {
    let thisSpot = await Spots.findOneAndRemove({ _id: request.body.id });
    return response.status(200).json({message: "success"})
})

module.exports = route;