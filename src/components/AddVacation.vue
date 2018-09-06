<template>
	<div class="page-container">
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
					<div v-if="!vacationId">
						<h3>Enter new vacation </h3>
					</div>

					<div v-if="vacationId">
						<h3>Edit vacation </h3>
					</div>

					<p class="float-right">
						<router-link to="/">
							<md-button class="md-raised md-primary">See previous vacations</md-button>
						</router-link>
					</p>

					<md-datepicker v-model="vacation.startDate">
						<label>Start date(Inclusive)</label>
					</md-datepicker>

					<md-datepicker v-model="vacation.endDate">
						<label>End date(Inclusive)</label>
					</md-datepicker>

					<md-field>
						<label>Number of working days</label>
						<md-input v-model="vacation.numberOfDays" type="number"
						          placeholder="Enter a number of working days"></md-input>
					</md-field>

					<md-field>
						<label>Description</label>
						<md-textarea v-model="vacation.description" placeholder="Enter a vacation description"></md-textarea>
					</md-field>


					<div>
						<md-button class="md-raised md-primary" v-if="!vacationId" v-on:click.prevent="saveVacation">Save
						</md-button>
						<md-button class="md-raised md-primary" v-if="vacationId " v-on:click.prevent="editVacation(vacationId)">
							Save
						</md-button>
						<router-link to="/">
							<md-button class="md-raised md-accent">Cancel</md-button>
						</router-link>
					</div>
				</div>

			</md-app-content>
		</md-app>
	</div>
</template>

<script>
	export default {
		data()
		{
			return {
				vacation: {
					startDate: null,
					endDate: null,
					numberOfDays: "",
					description: ""
				},
				vacationId: this.$route.params.id,
				errors: [],
				menuVisible: false
			};
		},
		created()
		{
			if (this.vacationId)
			{
				this.getVacation(this.vacationId);
			}
		},
		methods: {
			saveVacation: function () {
				this.$http.post('https://sjshl4kukb.execute-api.eu-central-1.amazonaws.com/dev/vacation', this.vacation)
					.then(function (response) {
						console.log('Success!:', response.message);
						this.$router.push('/')
					}, function (response) {
						console.log('Error!:', response.data);
					});
			},
			getVacation: function (vacationId) {
				this.$http.get('https://sjshl4kukb.execute-api.eu-central-1.amazonaws.com/dev/vacation/' + vacationId)
					.then((response) => {
						this.vacation = response.data;
					})
					.catch((e) => {
						this.errors.push(e);
					});
			},
			editVacation: function (vacationId) {
				this.$http.put(
					'https://sjshl4kukb.execute-api.eu-central-1.amazonaws.com/dev/vacation/' + vacationId, this.vacation)
					.then(function (response) {
						console.log('Success!:', response.message);
						this.$router.push('/')
					}, function (response) {
						console.log('Error!:', response.data);
					});
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
</style>