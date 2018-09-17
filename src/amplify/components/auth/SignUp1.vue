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
		name: 'SignUp1',
		data()
		{
			return {
				username: '',
				password: '',
				email: '',
				phone_number: '',
				error: '',
				showSnackbar: false,
				duration: 6000,
				isInfinity: false
			}
		},
		computed: {
			user()
			{
				return AmplifyStore.state.user
			}
		},
		methods: {
			signUp: function (event) {
				Auth.signUp(this.username, this.password, this.email, this.phone_number)
					.then(data => {
						this.$router.push('/auth/confirmSignUp1');
					}).catch(err => this.setError(err))
			},
			signIn: function () {
				this.$router.push('/auth/signIn1');
			},
			confirm: function () {
				this.$router.push('/auth/confirmSignUp1');
			},
			setError: function (err) {
				this.showSnackbar = true;
				this.error = err.message || err;
			}
		}
	}
</script>
