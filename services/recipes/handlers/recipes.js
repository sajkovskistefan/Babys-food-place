const recipe = require('../../../pkg/recipe');
const validator = require('../../../pkg/recipe/validator')

const save = async (req, res) => {
    try {
        req.body.user_id = req.user.uid;
        await validator.validate(req.body, validator.recipeSchema);
        let b = await recipe.save(req.body, req.user.uid);
        res.status(201).send(b);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const getAll = async (req, res) => {
    try {
        let b = await recipe.getAll(req.user.uid);
        res.status(200).send(b);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const getAllPopular = async (req, res) => {
    try {
        let data = await recipe.getAllPopular();
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const getAllLatest = async (req, res) => {
    try {
        let data = await recipe.getAllLatest();
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const getByCategory = async (req, res) => {
    try {
        let data = await recipe.getByCategory(req.params.cat);
        if (data) {
            return res.status(200).send(data);
        }
        return res.status(404).send('Not Found');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
};

const getOne = async (req, res) => {
    try {
        let b = await recipe.getOne(req.params.id);
        res.status(200).send(b);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const rateOne = async (req, res) => {
    try{
        let id = req.params.id;
        let recipes = await recipe.getOne({ _id: id });
        let ratedRecipe = await recipe.updateRate(id, { rating: recipes.rating + 1 });
        return res.status(200).send(ratedRecipe);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

const update = async (req, res) => {
    try {
        await validator.validate(req.body, validator.recipeSchema);
        let b = await recipe.update(req.params.id, req.body);
        res.status(204).send(b);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const remove = async (req, res) => {
    try {
        let b = await recipe.remove(req.params.id);
        res.status(204).send('');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    save,
    getAll,
    getAllPopular,
    getAllLatest,
    getOne,
    update,
    rateOne,
    remove,
    getByCategory
};
