<template>
	<div class="page-container" id="app">
		<md-app md-mode="reveal">
			<md-app-toolbar class="md-primary">
				<md-button class="md-icon-button" @click="menuVisible = !menuVisible">
					<md-icon>menu</md-icon>
				</md-button>
				<span class="md-title">Employee App</span>
			</md-app-toolbar>

			<md-app-drawer :md-active.sync="menuVisible">
				<md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

				<md-list>
					<md-list-item @click="changeRoute('/')">
						<md-icon>list</md-icon>
						<span class="md-list-item-text">See all employees</span>
					</md-list-item>

					<md-list-item @click="changeRoute('/add')">
						<md-icon>add</md-icon>
						<span class="md-list-item-text">Add employee</span>
					</md-list-item>
				</md-list>
			</md-app-drawer>
			<md-app-content>
				<router-view/>
			</md-app-content>
		</md-app>
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
		name: 'App',
		data()
		{
			return {
				menuVisible: false
			};
		},
		methods: {
			changeRoute: function (path) {
				this.menuVisible = false;
				this.$router.push(path);
			}
		}
	}
</script>

<style>
</style>
