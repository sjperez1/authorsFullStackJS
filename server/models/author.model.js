const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true, "Name is required"],
        minlength: [3, "Author name must be at least 3 characters"]
    }
}, {timestamps: true})

module.exports = mongoose.model('Author', AuthorSchema)