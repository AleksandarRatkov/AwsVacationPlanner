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

	Vue.use(VueMaterial);
	Vue.use(VueResource);

	export default {
		name: 'App'
	}
</script>

<style>
</style>

