<template>
	<div class="md-layout md-alignment-center">
		<md-card class="md-layout-item md-size-50 md-small-size-100">
			<md-card-header>
				<div class="md-title">Are you sure you want to log out?</div>
			</md-card-header>

			<md-button @click="signOut" class="md-primary md-raised">Confirm</md-button>
			<md-button @click="cancel" class="md-accent md-raised">Cancel</md-button>
		</md-card>
	</div>
</template>

<script>
	import {Auth, JS} from 'aws-amplify'

	export default {
		name: 'SignOut1',
		data()
		{
			return {
				error: ''
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
				this.error = err.message || err;
			}
		}
	}
</script>
