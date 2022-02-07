const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoItem = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    dueDate: {type: Date},
});

const user = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    todoItems: [todoItem]
});

module.exports = mongoose.model("Users", user);