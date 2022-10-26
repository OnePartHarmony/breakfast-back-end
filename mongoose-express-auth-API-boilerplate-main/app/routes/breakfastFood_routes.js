const express = require('express')
const passport = require('passport')

const BreakfastFood = require("../models/breakfastFood")

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

/////GET route to INDEX food/////////
router.get("/breakfastFoods", requireToken, (req, res, next) => {
    BreakfastFood.find()
        .then(breakfastFoods => {
            res.status(200).json({breakfastFoods: breakfastFoods})
        })
        .catch(next)
})

////////GET route to SHOW one food////////////
router.get("/breakfastFoods/:id", requireToken, (req, res, next) => {
    BreakfastFood.findById(req.params.id)
        .then(handle404)
        .then(breakfastFood => {
            res.status(200).json({breakfastFood: breakfastFood})
        })
        .catch(next)
})

////////POST route to CREATE food//////////
router.post("/breakfastFoods", requireToken, (req, res, next) => {
    req.body.breakfastFood.owner = req.user.id

    BreakfastFood.create(req.body.breakfastFood)
        .then(breakfastFood => {
            res.status(201).json({breakfastFood: breakfastFood})
        })
        .catch(next)
})

////////PATCH route to UPDATE one food////////////
router.patch("/breakfastFoods/:id", requireToken, (req, res, next) => {
    delete req.body.breakfastFood.owner
    BreakfastFood.findById(req.params.id)
        .then(handle404)
        .then(breakfastFood => {
            requireOwnership(req, breakfastFood)
            return breakfastFood.updateOne(req.body.breakfastFood)
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

////////DELETE route to DELETE food//////////
router.delete("/breakfastFoods/:id", requireToken, (req, res, next) => {
    BreakfastFood.findById(req.params.id)
        .then(handle404)
        .then(breakfastFood => {
            requireOwnership(req, breakfastFood)
            breakfastFood.deleteOne()
            res.sendStatus(204)
        })
        .catch(next)
})






module.exports = router