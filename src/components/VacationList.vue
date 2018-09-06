<template>
	<div class="page-container" id="app">
		<md-app md-mode="reveal">
			<md-app-toolbar class="md-primary">
				<md-button class="md-icon-button" @click="menuVisible = !menuVisible">
					<md-icon>menu</md-icon>
				</md-button>
				<span class="md-title">Vacation App</span>
			</md-app-toolbar>

			<md-app-drawer :md-active.sync="menuVisible">
				<md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

				<md-list>
					<md-list-item @click="changeRoute('/')">
						<md-icon>list</md-icon>
						<span class="md-list-item-text">See previous vacations</span>
					</md-list-item>

					<md-list-item @click="changeRoute('/add')">
						<md-icon>add</md-icon>
						<span class="md-list-item-text">Create new vacation</span>
					</md-list-item>

					<md-list-item @click="signOut()">
						<md-icon>account_circle</md-icon>
						<span class="md-list-item-text">Sign out</span>
					</md-list-item>
				</md-list>
			</md-app-drawer>
			<md-app-content>
				<div class="container">
					<div>
						<h3>Previous vacations </h3>
						<br>
					</div>
					<md-table v-model="vacations" md-sort="name" md-sort-order="asc" md-card>
						<md-table-row slot="md-table-row" slot-scope="{ item }" @click="editVacation(item.id)">
							<md-table-cell md-label="Start date" md-sort-by="startDate">{{ item.startDate | moment("YYYY-MM-DD") }}
							</md-table-cell>
							<md-table-cell md-label="End date" md-sort-by="endDate">{{ item.endDate | moment("YYYY-MM-DD") }}
							</md-table-cell>
							<md-table-cell md-label="Number of days" md-sort-by="numberOfDays">{{ item.numberOfDays }}
							</md-table-cell>
							<md-table-cell md-label="Description" md-sort-by="description">{{ item.description | strippedDescription}}</md-table-cell>
						</md-table-row>
					</md-table>
				</div>
			</md-app-content>
		</md-app>
	</div>
</template>

<script>
	import Vue from 'vue'

	Vue.use(require('vue-moment'));

	export default {
		data()
		{
			return {
				vacations: [],
				vacation: {
					startDate: null,
					endDate: null,
					numberOfDays: "",
					description: ""
				},
				errors: [],
				menuVisible: false
			};
		},
		filters: {
			strippedDescription(value) {
				if(value.length > 40) {
					return value.slice(0,39) + '...';
				}else {
					return value;
				}
			}

		},
		created()
		{
			this.getAllVacations();
		},
		methods: {
			getAllVacations: function () {
				this.$http.get('https://sjshl4kukb.execute-api.eu-central-1.amazonaws.com/dev/vacation')
					.then((response) => {
						this.vacations = response.data;
					})
					.catch((e) => {
						this.errors.push(e);
					});
			},
			editVacation: function (vacationId) {
				this.$router.push({name: 'AddVacation', params: {id: vacationId}})
			},
			changeRoute: function (path) {
				this.menuVisible = false;
				this.$router.push(path);
			},
			signOut: function () {
				this.$router.push('/auth/signOut')
			}
		}
	};
</script>


<style scoped>
	.md-table-cell{
		width: 25% !important;
	}
</style>
