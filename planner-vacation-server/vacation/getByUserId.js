'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

// The document client affords developers the use of native JavaScript
// types instead of AttributeValues to simplify the JavaScript development
// experience with Amazon DynamoDB.
// - AWS Documentation
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getByUserId = (event, context, callback) => {
	const params = {
		TableName: process.env.DYNAMODB_TABLE,
		FilterExpression: "#userId =:userId",
		ExpressionAttributeNames:{
			"#userId": "userId"
		},
		ExpressionAttributeValues: {
			":userId": {
				S : "eu-central-1:6d68b91f-cec2-4547-8e72-daeba0e8526d"
			}
		}
	};

	// fetch vacation from the database
	dynamoDb.scan(params, (error, result) => {
		// handle potential errors
		if (error)
		{
			console.error(error);
			callback(new Error('Couldn\'t fetch the vacation item with user id.'));
			return;
		}

		console.log('Result nadjen je: ' + result);
		// create a response
		const response = {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
			},
			body: JSON.stringify(result.Item),
		};
		callback(null, response);
	});
};
