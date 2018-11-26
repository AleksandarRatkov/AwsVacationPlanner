<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	import Vue from 'vue'
	import VueResource from 'vue-resource';
	import VueMaterial from 'vue-material'
	import 'vue-material/dist/vue-material.min.css'
	import 'vue-material/dist/theme/default.css'
	import {Auth} from 'aws-amplify'

	Vue.use(VueMaterial);
	Vue.use(VueResource);

	Vue.prototype.$awsLink = 'https://uelsoc6io9.execute-api.eu-west-1.amazonaws.com/dev/';

	export default {
		name: 'App',
		created()
		{
			Auth.currentSession()
				.then(info => {
					const token = info.idToken.jwtToken;
					if (token) {
						Vue.http.interceptors.push((request) => {
							request.headers.set('Authorization', token);
						});
					}

				})
				.catch(err => console.log('get current tokens err', err));
		}
	}
</script>

<style>
</style>

