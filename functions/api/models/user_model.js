const database = require("../database");

// Here, we are implementing the class with Singleton design pattern

class UserModel {
    constructor() {
        if (this.instance) return this.instance;
        UserModel.instance = this;
    }

    get() {
        return database.getList("users");
    }

    getById(id) {
        return database.get("users", id);
    }

    create(users) {
        return database.create("users", users);
    }

    delete(id) {
        return database.delete("users", id);
    }

    update(id, users) {
        return database.set("users", id, users);
    }
}

module.exports = new UserModel();