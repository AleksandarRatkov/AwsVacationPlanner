<template>
	<form novalidate class="md-layout md-alignment-center">
		<!--<md-card class="md-layout-item md-size-25"/>-->
		<md-card class="md-layout-item md-size-50 md-small-size-100">
			<md-card-header>
				<div class="md-title">Forgot Password</div>
			</md-card-header>

			<md-card-content>
				<md-field>
					<label for="username">Username</label>
					<md-input type="text" name="username" id="username" v-model="username"/>
				</md-field>

				<md-field>
					<label for="code">Code</label>
					<md-input type="text" name="code" id="code" v-model="code"/>
				</md-field>

				<md-field>
					<label for="password">New Password</label>
					<md-input type="password" name="password" id="password" v-model="password"/>
				</md-field>
				<div class="md-layout md-gutter md-alignment-center-center">
					<md-button @click="send" class="md-primary md-raised" :disabled="!username">Send code</md-button>
					<md-button @click="submit" class="md-primary md-raised" :disabled="!username || !code || !password">Submit New
						Password
					</md-button>
				</div>
			</md-card-content>

			<md-card-actions>
				<md-button class="md-primary" @click="signIn">Back to Sign In</md-button>
			</md-card-actions>
		</md-card>

		<md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar"
		             md-persistent>
			<span>{{error}}</span>
			<md-button class="md-primary" @click="showSnackbar = false">Close</md-button>
		</md-snackbar>
	</form>
</template>

<script>
	import {Auth} from 'aws-amplify'
	import AmplifyStore from '../../AmplifyStore'

	export default {
		name: 'ForgotPassword1',
		data()
		{
			return {
				username: '',
				code: '',
				password: '',
				error: '',
				showSnackbar: false,
				duration: 6000,
				isInfinity: false
			}
		},
		computed: {
			user()
			{
				return AmplifyStore.state.amplify.user
			}
		},
		methods: {
			send: function () {
				Auth.forgotPassword(this.username)
					.catch(err => this.setError(err));
			},
			submit: function () {
				Auth.forgotPasswordSubmit(this.username, this.code, this.password)
					.then(() => this.$router.push('/'))
					.catch(err => this.setError(err));
			},
			signIn: function () {
				this.$router.push('/auth/signIn1');
			},
			setError: function (err) {
				this.showSnackbar = true;
				this.error = err.message || err;
			}
		}
	}
</script>
