'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

// The document client affords developers the use of native JavaScript
// types instead of AttributeValues to simplify the JavaScript development
// experience with Amazon DynamoDB.
// - AWS Documentation
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
	const data = JSON.parse(event.body);

	const params = {
		TableName: process.env.DYNAMODB_TABLE,
		Item: {
			vacationId: uuid.v1(),
			startDate: data.startDate,
			endDate: data.endDate,
			numberOfDays: data.numberOfDays,
			description: data.description,
			userId: data.userId,
			isApproved: data.isApproved
		},
	};

	// write the pet to the database
	dynamoDb.put(params, (error) => {
		// handle potential errors
		if (error)
		{
			console.error(error);
			callback(new Error('Couldn\'t create vacation.'));
			return;
		}

		// create a response
		const response = {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
			},
			body: JSON.stringify(params.Item),
		};
		callback(null, response);
	});
};
