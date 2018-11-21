<template>
	<div>
		<form novalidate class="md-layout md-alignment-center">
			<md-card class="md-layout-item md-size-50 md-small-size-100">
				<div class="md-layout md-gutter md-alignment-center-center">
					<md-card-header>
						<div class="md-title" v-if="!confirmView">Sign In</div>
						<div class="md-title" v-if="confirmView">Confirm Sign In</div>
					</md-card-header>
				</div>

				<div v-if="!confirmView">
					<md-card-content>
						<md-field>
							<label for="username">Username</label>
							<md-input type="text" name="username" id="username" v-model="username"/>
						</md-field>

						<md-field>
							<label for="password">Password</label>
							<md-input type="password" name="password" id="password" v-model="password"/>
						</md-field>

						<div class="md-layout md-gutter md-alignment-center-center">
							<md-button @click="signIn" :disabled="!username || !password"
							           class="md-primary md-raised">
								Sign In
							</md-button>
						</div>
					</md-card-content>
				</div>

				<div v-if="confirmView">
					<md-card-content>
						<md-field>
							<label for="code">Code</label>
							<md-input type="text" name="code" placeholder="Code" id="code" v-model="code"
							          v-on:keyup.enter="confirm"/>
						</md-field>

						<md-button @click="confirm" :disabled="!code " class="md-primary md-raised">
							Signup
						</md-button>
					</md-card-content>
				</div>


				<md-card-actions>
					<md-button class="md-primary" @click="forgot">Forgot Password</md-button>
					<md-button class="md-primary" @click="signUp">Sign Up</md-button>
				</md-card-actions>
			</md-card>

			<md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar"
			             md-persistent>
				<span>{{error}}</span>
				<md-button class="md-primary" @click="showSnackbar = false">Close</md-button>
			</md-snackbar>
		</form>
	</div>
</template>

<script>
	import {Auth, JS} from 'aws-amplify'
	import AmplifyStore from '../../AmplifyStore'

	export default {
		name: 'SignIn',
		data()
		{
			return {
				username: '',
				password: '',

				user: null,
				confirmView: false,
				code: '',
				error: '',
				showSnackbar: false,
				duration: 6000,
				isInfinity: false,
				position: 'center'
			}
		},
		methods: {
			signIn: function (event) {
				const that = this;
				Auth.signIn(this.username, this.password)
					.then(user => {
						AmplifyStore.commit('setUser', user);
						return user
					})
					.then(user => {
						that.user = user;
						if (user.challengeName === 'SMS_MFA')
						{
							that.confirmView = true;
							return
						}
						this.checkUser();
					})
					.catch(err => this.setError(err))

			},
			checkUser: function () {
				const user = this.user;
				if (!user)
				{
					return
				}

				Auth.verifiedContact(user)
					.then(data => {
						AmplifyStore.commit('setUserVerification', data);
						if (!JS.isEmpty(data.verified))
						{
							this.$router.push('/');
						}
						else
						{
							this.$router.push('/auth/verifyContact');
						}
					});
			},
			confirm: function () {
				Auth.confirmSignIn(this.user, this.code)
					.then(() => {
						this.$router.push('/');
					})
					.catch(err => this.setError(err));
			},
			forgot: function () {
				this.$router.push('/auth/forgotPassword');
			},
			signUp: function () {
				this.$router.push('/auth/signUp');
			},
			setError: function (err) {
				this.showSnackbar = true;
				this.error = err.message || err;
			}
		}
	}
</script>
