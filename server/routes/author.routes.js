const AuthorController= require("./../controllers/author.controller")

module.exports = (app) => {
    app.post("/api/authors", AuthorController.addAuthor)
    app.get("/api/authors", AuthorController.allAuthors)
    app.get("/api/authors/:id", AuthorController.oneAuthor)
    app.put("/api/authors/:id/edit", AuthorController.updateAuthor)
    app.delete("/api/authors/:id", AuthorController.deleteAuthor)
}