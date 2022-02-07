'use strict';

const Responses = require('./API_Responses');
const {connectToDatabase} = require('database/establishConnection');
const UserSchema = require('database/userSchema');

// TODO: Find a better way to update todo item, rather than insert new and delete old
exports.handler = async event => {
    try {
        await connectToDatabase();
        let user_id = event.pathParameters.user_id;
        let todo_id = event.pathParameters.todo_id;

        // Create new todo item
        const json = JSON.parse(event["body"])
        const todoItem = {
            name: json.name,
            description: json.description,
            dueDate: json.date,
        }
        const result = await UserSchema.updateOne(
            {_id: user_id},
            {$addToSet: { todoItems: [todoItem] } }
        );

        if (result.modifiedCount == 1) { // If success, remove old todo item
            let deletedResult = await UserSchema.updateOne(
                { _id: user_id },
                { $pull: { 'todoItems': { _id: todo_id } } }
            );
            return Responses._200({message: deletedResult});
        } else {
            return Responses._200({message: result});
        }

    } catch (e) {
        return Responses._200({message: "getTodoItem: Failed" + e});
    }
}