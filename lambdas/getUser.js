'use strict';

const Responses = require('./API_Responses');
const {connectToDatabase} = require('database/establishConnection');
const UserSchema = require('database/userSchema');

/**
 * @param event
 * Takes user_id and returns user
 * @returns User
 */
exports.handler = async event => {
    try {
        await connectToDatabase();
        const result = await UserSchema.findById(event.pathParameters.user_id);
        return Responses._200({message: result});
    } catch (e) {
        return Responses._200({message: "insertUser: Failed - " + e});
    }
}