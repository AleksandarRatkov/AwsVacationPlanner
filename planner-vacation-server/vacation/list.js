'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

// The document client affords developers the use of native JavaScript
// types instead of AttributeValues to simplify the JavaScript development
// experience with Amazon DynamoDB.
// - AWS Documentation
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
	TableName: process.env.DYNAMODB_TABLE,
};

module.exports.list = (event, context, callback) => {
	// fetch all vacations from the database
	dynamoDb.scan(params, (error, result) => {
		// handle potential errors
		if (error)
		{
			console.error(error);
			callback(new Error('Couldn\'t fetch the vacations.'));
			return;
		}

		// create a response
		const response = {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
			},
			body: JSON.stringify(result.Items),
		};
		callback(null, response);
	});
};
