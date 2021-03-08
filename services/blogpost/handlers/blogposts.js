const blogpost = require('../../../pkg/blogpost');
const validator = require('../../../pkg/blogpost/validator')

const save = async (req, res) => {
    try {
        req.body.user_id = req.user.uid;
        await validator.validate(req.body, validator.blogpostSchema);
        let b = await blogpost.save(req.body, req.user.uid);
        res.status(201).send(b);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const getAll = async (req, res) => {
    try {
        let b = await blogpost.getAll(req.user.uid);
        res.status(200).send(b);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};
const getAllFree = async (req, res) => {
    try {
        let data = await blogpost.getAllFree();
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const getOne = async (req, res) => {
    try {
        let b = await blogpost.getOne(req.params.id, req.user.uid);
        res.status(200).send(b);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const update = async (req, res) => {
    try {
        await validator.validate(req.body, validator.blogpostSchema);
        let b = await blogpost.update(req.params.id, req.user.uid, req.body);
        res.status(204).send('');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const remove = async (req, res) => {
    try {
        let b = await blogpost.remove(req.params.id, req.user.uid);
        res.status(204).send('');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    save,
    getAll,
    getOne,
    update,
    remove,
    getAllFree
};
