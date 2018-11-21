'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const nodemailer = require("nodemailer");
const ses = new AWS.SES();

module.exports.sendEmail = (event, context, callback) => {
	let data = JSON.parse(event.body);
	let welcomeTemplate = `<p>Welcome <b>${data.username}</b> ${data.text}</p>`;
	let vacationTemplate = `<p>Employee ${data.username} successfully created vacation request with next parameters:</p><ol><li>Dates: ${data.startDate} - ${data.endDate}</li><li>Number of days: ${data.numberOfDays}</li><li>Description: ${data.description}</li></ol>`;

	let mailOptions = {
		from: data.email,
		subject: data.title,
		to: data.email,
		// bcc: Any BCC address you want here in an array,
	};

	if (data.type === 'welcome')
	{
		mailOptions.html = welcomeTemplate;
	}
	else if (data.type === 'vacation')
	{
		mailOptions.html = vacationTemplate;
	}

	// create Nodemailer SES transporter
	let transporter = nodemailer.createTransport(
		{
			SES: ses
		});

	// send email
	transporter.sendMail(mailOptions, function (err) {
		if (err)
		{
			console.log("Error sending email");
			callback(err);
		}
		else
		{
			console.log("Email sent successfully");
			const response = {
				statusCode: 200,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true,
				},
				body: JSON.stringify({'message' : 'Email sent successfully'}),
			};
			callback(null, response);
		}
	});
};
