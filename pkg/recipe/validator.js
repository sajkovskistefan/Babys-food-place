const { Validator } = require('node-input-validator');

const recipeSchema = {
        recipe_title: 'required',
        short_description: 'required|maxLength:50',
        recipe: 'required|maxLength:250',
        // user_id: 'required',
        category: 'required',
        prep_time: 'required',
        no_people: 'required'
};

const validate = async (data, schema) => {
    let v = new Validator(data, schema);
    let res = await v.check();
    if (!res) {
        throw v.errors;
    }
    return res;
};

module.exports = {
    recipeSchema,
    validate
};