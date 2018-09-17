<template>
	<form novalidate class="md-layout md-alignment-center">
		<!--<md-card class="md-layout-item md-size-25"/>-->
		<md-card class="md-layout-item md-size-50 md-small-size-100">
			<md-card-header>
				<div class="md-title">Confirm Sign Up</div>
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

				<md-button @click="confirm" :disabled="!username || !code" class="md-primary md-raised">Confirm</md-button>
			</md-card-content>

			<md-card-actions>
				<md-button class="md-primary" @click="resend">Resend</md-button>
				<md-button class="md-primary" @click="signIn">Back To Sign In</md-button>
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
	import AmplifyTheme from '../../AmplifyTheme'

	export default {
		name: 'ConfirmSignUp1',
		data()
		{
			return {
				username: '',
				code: '',
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
			confirm: function (event) {
				Auth.confirmSignUp(this.username, this.code)
					.then(() => this.$router.push('/'))
					.catch(err => this.setError(err));
			},
			resend: function () {
				Auth.resendSignUp(this.username)
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
