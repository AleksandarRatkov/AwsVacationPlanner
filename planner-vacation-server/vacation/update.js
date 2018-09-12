'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

// The document client affords developers the use of native JavaScript
// types instead of AttributeValues to simplify the JavaScript development
// experience with Amazon DynamoDB.
// - AWS Documentation
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
	const data = JSON.parse(event.body);
	const params = {
		TableName: process.env.DYNAMODB_TABLE,
		Key: {
			vacationId: event.pathParameters.vacationId,
			userId : data.userId
		},
		ExpressionAttributeValues: {
			':startDate': data.startDate,
			':endDate': data.endDate,
			':numberOfDays': data.numberOfDays,
			':description': data.description,
			':isApproved': data.isApproved
		},
		UpdateExpression: 'SET startDate = :startDate, endDate = :endDate, numberOfDays = :numberOfDays, description = :description, isApproved = :isApproved',
		ReturnValues: 'ALL_NEW'
	};

	// update the todo in the database
	dynamoDb.update(params, (error, result) => {
		// handle potential errors
		if (error)
		{
			console.error(error);
			callback(new Error('Couldn\'t update the vacation item.'));
			return;
		}

		// create a response
		const response = {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
			},
			body: JSON.stringify(result.Attributes),
		};
		callback(null, response);
	});
};
