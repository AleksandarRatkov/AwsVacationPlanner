<template>
	<div>
		<div novalidate class="md-layout md-alignment-center">
			<!--<md-card class="md-layout-item md-size-25"/>-->
			<md-card class="md-layout-item md-size-50 md-small-size-100">
				<div class="md-layout md-gutter md-alignment-center-center">
					<md-card-header>
						<div class="md-title">Sign Up</div>
					</md-card-header>
				</div>

				<md-card-content>
					<md-field>
						<label for="username">Username</label>
						<md-input type="text" name="username" id="username" v-model="username"/>
					</md-field>

					<md-field>
						<label for="password">Password</label>
						<md-input type="password" name="password" id="password" v-model="password"/>
					</md-field>

					<md-field>
						<label for="email">Email</label>
						<md-input type="email" name="email" id="email" v-model="email"/>
					</md-field>

					<md-field>
						<label for="phone_number">Phone number</label>
						<md-input type="text" name="phone_number" id="phone_number" v-model="phone_number"/>
					</md-field>

					<div class="md-layout md-gutter md-alignment-center-center">
						<md-button @click="signUp" class="md-primary md-raised" :disabled="!username || !password">Sign Up
						</md-button>
					</div>
				</md-card-content>

				<md-card-actions>
					<md-button class="md-primary" @click="signIn">Back to Sign In</md-button>
					<md-button class="md-primary" @click="confirm">Confirm a Code</md-button>
				</md-card-actions>
			</md-card>

			<md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar"
			             md-persistent>
				<span>{{error}}</span>
				<md-button class="md-primary" @click="showSnackbar = false">Close</md-button>
			</md-snackbar>
		</div>
	</div>
</template>

<script>
	import {Auth} from 'aws-amplify'
	import AmplifyStore from '../../AmplifyStore'

	export default {
		name: 'SignUp',
		data()
		{
			return {
				username: '',
				password: '',
				email: '',
				name: '',
				error: '',
				showSnackbar: false,
				duration: 6000,
				isInfinity: false,
				phone_number: '',
				position: 'center',
				signUpUser: {
					'username': '',
					'password': '',
					'attributes': {
						'email': '',
						'phone_number': '',
						'custom:privileges': 'user'
					}
				}
			}
		},
		computed: {
			user()
			{
				return AmplifyStore.state.user
			}
		},
		methods: {
			sendWelcomeEmail: function () {
				let emailTemplate = {
					email: this.email,
					username: this.username,
					type: 'welcome',
					text: 'It is nice to have you on board! Now you are able to create vacation requests!',
					title: 'Welcome to our company!'
				};

				this.$http.post(this.$awsLink + 'email/sendEmail', emailTemplate)
					.then(function (response) {
						console.log('Email successfully sent!', response.message);
					}, function (response) {
						console.log('Error sending email!', response.data);
					});
			},
			signUp: function () {
				this.signUpUser.username = this.username;
				this.signUpUser.password = this.password;
				this.signUpUser.attributes.email = this.email;
				this.signUpUser.attributes.phone_number = this.phone_number;

				Auth.signUp(this.signUpUser)
					.then(data => {
						this.sendWelcomeEmail();
						this.$router.push('/auth/confirmSignUp');
					}).catch(err => this.setError(err))
			},
			signIn: function () {
				this.$router.push('/auth/signIn');
			},
			confirm: function () {
				this.$router.push('/auth/confirmSignUp');
			},
			setError: function (err) {
				this.showSnackbar = true;
				this.error = err.message || err;
			}
		}
	}
</script>
