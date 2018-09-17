<template>
	<div class="md-layout md-alignment-center">
		<md-card class="md-layout-item md-size-50 md-small-size-100">
			<md-card-header>
				<div class="md-title">Are you sure you want to log out?</div>
			</md-card-header>

			<md-button @click="signOut" class="md-primary md-raised">Confirm</md-button>
			<md-button @click="cancel" class="md-accent md-raised">Cancel</md-button>
		</md-card>

		<md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar"
		             md-persistent>
			<span>{{error}}</span>
			<md-button class="md-primary" @click="showSnackbar = false">Close</md-button>
		</md-snackbar>
	</div>
</template>

<script>
	import {Auth, JS} from 'aws-amplify'

	export default {
		name: 'SignOut1',
		data()
		{
			return {
				error: '',
				showSnackbar: false,
				duration: 6000,
				isInfinity: false
			}
		},
		methods: {
			signOut: function (event) {
				Auth.signOut()
					.then(() => {
						this.$router.push('/auth/signIn1');
					})
					.catch(err => this.setError(err))
			},
			cancel : function () {
				this.$router.push('/');
			},
			setError: function (err) {
				this.showSnackbar = true;
				this.error = err.message || err;
			}
		}
	}
</script>
