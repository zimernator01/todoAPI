'use strict';

const Responses = require('./API_Responses');
const {connectToDatabase} = require('database/establishConnection');
const UserSchema = require('database/userSchema');

/**
 * @param event
 * Create user into database and returns the user_object
 * @returns User
 */
exports.handler = async event => {
    try {
        await connectToDatabase();
        const json = JSON.parse(event["body"])
        const result = await UserSchema.create({
            firstName: json.firstName,
            lastName: json.lastName,
            email: json.email,
            password: json.password,
        });
        return Responses._200({message: result});
    } catch (e) {
        return Responses._200({message: "insertUser: Failed - " + e});
    }
}