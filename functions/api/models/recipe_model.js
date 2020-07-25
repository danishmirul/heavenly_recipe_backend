const database = require("../database");

// Here, we are implementing the class with Singleton design pattern

class RecipeModel {
    constructor() {
        if (this.instance) return this.instance;
        RecipeModel.instance = this;
    }

    get() {
        return database.getList("recipes");
    }

    getById(id) {
        return database.get("recipes", id);
    }

    create(recipes) {
        return database.create("recipes", recipes);
    }

    delete(id) {
        return database.delete("recipes", id);
    }

    update(id, recipes) {
        return database.set("recipes", id, recipes);
    }
}

module.exports = new RecipeModel();