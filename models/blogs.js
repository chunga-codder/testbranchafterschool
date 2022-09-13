const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// creating a schema (layout of our table and setiings)

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true

    },
    made: {
        type: String,
        required: true

    },
    body: {
        type: String,
        require: true
    }
// creating a model to link our schema and the db using its methods

}, {timestamps: true})

const Blogmodel = mongoose.model('blod', BlogSchema)

module.exports = Blogmodel;