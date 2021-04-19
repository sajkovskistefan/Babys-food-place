const cfg = require('../../pkg/config');
require('../../pkg/db');
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');

const recipes = require('./handlers/recipes');

const api = express();
api.use(cors());
api.use(bodyParser.json());

api.use(jwt({
    secret: cfg.get('security').jwt_key,
    algorithms: ['HS256']
}).unless({
    path: [
        { url: /\/api\/v1\/recipes\/.*\/rate/, method: ['PUT'] },
        { url: /\/api\/v1\/recipes\/.*/, method: ['GET'] },
        { url: /\/api\/v1\/recipes\/category\/.*/, method: ['GET'] },
        { url: '/api/v1/recipes/popular', method: ['GET'] },
        { url: '/api/v1/recipes/latest', method: ['GET'] }
    ]
}));
api.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Bad Token');
    }
});

api.post('/api/v1/recipes', recipes.save);
api.get('/api/v1/recipes', recipes.getAll);
api.get('/api/v1/recipes/popular', recipes.getAllPopular);
api.get('/api/v1/recipes/latest', recipes.getAllLatest);
api.get('/api/v1/recipes/category/:cat', recipes.getByCategory);
api.get('/api/v1/recipes/:id', recipes.getOne);
api.put('/api/v1/recipes/:id/rate', recipes.rateOne);
api.put('/api/v1/recipes/:id', recipes.update);
api.delete('/api/v1/recipes/:id', recipes.remove);

api.listen(cfg.get('services').recipes.port, err => {
    if (err) {
        return console.log(err);
    }
    console.log('Server successfully started on port', cfg.get('services').recipes.port);
});