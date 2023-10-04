const Author = require("./../models/author.model")

// Controller holds the logic

// create --- to test in Postman, use post, click body, click x-www-urlencoded, then fill in some key and value info, then send the request and see if it shows up in the area below.
module.exports.addAuthor = (req, res)=>{
    const newAuthor = req.body
    Author.create(newAuthor)
        .then(author => res.json(author))
        .catch(err=> res.status(400).json(err)) // .status(400) allows the frontend to to receive the .catch error status
}

// Get all --- to test in Postman, use get, click params, and press send. It should return an empty array if there are no entries.
module.exports.allAuthors = (req, res)=>{
    Author.find().collation({locale: "en"}).sort({name: 'asc'})
        .then(authors => res.json(authors))
        .catch(err=> res.json(err))
}

// Get one
module.exports.oneAuthor = (req, res)=>{
    // id is obtained by params (params are from URL)
    const idFromParams = req.params.id
    Author.findOne({_id: idFromParams})
        .then(oneAuthor => res.json(oneAuthor))
        .catch(err=> res.json(err))
}

// update -- getOne + create --- to test in Postman, use get, click body, click x-www-urlencoded, send the request and see if it shows up in the area below.
module.exports.updateAuthor = (req, res)=>{
    // grab id from params
    const idFromParams = req.params.id
    const updateValue = req.body
    // update:
    Author.findOneAndUpdate(
        {_id : idFromParams}, // this is the criteria
        updateValue, // this is the req.body, which are the values to be updated
        {new: true, runValidators: true} // The function will still work without this line, but it specifies if you want the updated value (true) or original value (false), and says to run the validations because findOneAndUpdate by default does not check the validations in model.
    )
        .then(updatedAuthor => res.json(updatedAuthor))
        .catch(err=> res.status(400).json(err)) // .status(400) allows the frontend to to receive the .catch error status
}

// delete --- to test in Postman, use delete, click body, click x-www-urlencoded, then fill in some key and value info, then send the request. Then do a get request to see if that entry is still there or not.
module.exports.deleteAuthor = (req, res)=>{
    Author.deleteOne({_id: req.params.id})
        .then(deleteConfirm=>res.json(deleteConfirm))
        .catch(err=>res.json(err))
}