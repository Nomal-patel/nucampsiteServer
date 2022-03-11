const express = require('express');
const bodyParser = require('body-parser');
const Promotions = require('../models/promotions');

const promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json());
// this  is my main route
promotionsRouter.route('/')
.get((req, res, next) => {
    Promotions.find()
    .then(promotionss => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotionss);
    }).catch(err => next(err));
})
.post((req, res, next) => {
    Promotions.create(req.body)
    .then(promotions => {
        console.log('promotions Created ', promotions);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotionss');
})
.delete((req, res, next) => {
    Promotions.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

promotionsRouter.route('/:promotionsId')
.get((req, res, next) => {
    Promotions.findById(req.params.promotionsId)
    .then(promotions => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotionss/${req.params.promotionsId}`);
})
.put((req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promotionsId, {
        $set: req.body
    }, { new: true })
    .then(promotions => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Promotions.findByIdAndDelete(req.params.promotionsId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});



module.exports = promotionsRouter;
