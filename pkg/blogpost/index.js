const mongoose = require('mongoose');

const blogpost = mongoose.model(
    'blogpost',
    {
        recipe_title: String,
        short_description: String,
        recipe: String,
        user_id: String,
        category: String,
        prep_time: Number,
        no_people: Number,
        img: {
            data: Buffer,
            contentType: String
        },
        created: { type: Date, default: Date.now }
    },
    'blogposts',
);

const save = async (data, uid) => {
    let b = new blogpost({ ...data, user_id: uid });
    return await b.save();
};

const getOne = async (id, uid) => {
    return await blogpost.findOne({ _id: id, user_id: uid });
};

const getAll = async (uid) => {
    return await blogpost.find({ user_id: uid });
};
const getAllFree = async (data) => {
    return await blogpost.find( data );
};

const update = async (id, uid, data) => {
    return await blogpost.updateOne({ _id: id, user_id: uid }, data);
};

const remove = async (id, uid) => {
    return await blogpost.deleteOne({ _id: id, user_id: uid });
};

module.exports = {
    save,
    getOne,
    getAll,
    update,
    remove,
    getAllFree
};
