'use strict';

const Responses = require('./API_Responses');
const {connectToDatabase} = require('database/establishConnection');
const UserSchema = require('database/userSchema');


exports.handler = async event => {
    try {
        await connectToDatabase();
        const json = JSON.parse(event["body"])
        const todoItem = {
            name: json.name,
            description: json.description,
            dueDate: json.date,
        }
        const result = await UserSchema.updateOne(
            {_id: event.pathParameters.user_id},
            {$addToSet: { todoItems: [todoItem] } }
        );
        return Responses._200({message: result});
    } catch (e) {
        return Responses._200({message: "insertTodoItem: Failed - " + e});
    }

}