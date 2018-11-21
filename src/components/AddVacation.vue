<template v-if="">
	<div class="page-container">
		<md-dialog-confirm
				:md-active.sync="activeSignOut"
				md-title="Sign Out"
				md-content="Are you really sure you want to sign out?"
				md-confirm-text="Agree"
				md-cancel-text="Disagree"
				@md-cancel="onCancel"
				@md-confirm="onConfirm"/>

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

					<md-list-item @click="activeSignOut = true">
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
							<md-button class="md-raised md-primary">See user vacations</md-button>
						</router-link>
					</p>

					<md-datepicker v-model="vacation.startDate" md-immediately>
						<label>Start date(Inclusive)</label>
					</md-datepicker>

					<md-datepicker v-model="vacation.endDate" md-immediately>
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
	import {Auth} from 'aws-amplify'
	import Vue from 'vue'
	import moment from 'moment'

	Vue.use(require('vue-moment'));

	export default {
		data()
		{
			return {
				vacation: {
					startDate: null,
					endDate: null,
					numberOfDays: '',
					description: '',
					userId: '',
					isApproved: false
				},
				vacationId: this.$route.params.vacationId,
				errors: [],
				menuVisible: false,
				activeSignOut: false,
				email: '',
				username: ''
			};
		},
		created()
		{
			this.getUserInfo();
		},
		methods: {
			dateFormatting: function (date) {
				return moment(date).format("YYYY-MM-DD");
			},
			sendVacationCreatedEmail: function () {

				let emailTemplate = {
					email: this.email,
					username: this.username,
					type: 'vacation',
					title: 'Successfully created vacation request!',
					startDate: this.dateFormatting(this.vacation.startDate),
					endDate: this.dateFormatting(this.vacation.endDate),
					numberOfDays: this.vacation.numberOfDays,
					description: this.vacation.description,
				};

				this.$http.post('https://dby71730z7.execute-api.eu-west-1.amazonaws.com/dev/email/sendEmail', emailTemplate)
					.then(function (response) {
						console.log('Success!:', response.message);
						this.$router.push('/')
					}, function (response) {
						console.log('Error!:', response.data);
					});
			},
			saveVacation: function () {
				this.$http.post('https://dby71730z7.execute-api.eu-west-1.amazonaws.com/dev/vacation', this.vacation)
					.then(function (response) {
						console.log('Success!:', response.message);
						this.sendVacationCreatedEmail();
					}, function (response) {
						console.log('Error!:', response.data);
					});
			},
			getVacation: function (userId, vacationId) {
				this.$http.get('https://dby71730z7.execute-api.eu-west-1.amazonaws.com/dev/user/' + userId + '/vacation/' +
					vacationId)
					.then((response) => {
						this.vacation = response.data[0];
					})
					.catch((e) => {
						this.errors.push(e);
					});
			},
			editVacation: function (vacationId) {
				this.$http.put('https://dby71730z7.execute-api.eu-west-1.amazonaws.com/dev/vacation/' + vacationId, this.vacation)
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
			onConfirm: function () {
				Auth.signOut()
					.then(() => {
						this.$router.push('/auth/signIn');
					})
					.catch(err => this.setError(err))
			},
			onCancel: function () {
				this.menuVisible = false;
			},
			getUserInfo: function () {
				Auth.currentUserInfo()
					.then(info => {
						this.vacation.userId = info.id;
						this.email = info.attributes.email;
						this.username = info.username;
						if (this.vacation.userId && this.vacationId)
						{
							this.getVacation(this.vacation.userId, this.vacationId);
						}
					})
					.catch(err => console.log('get current credentials err', err));
			}
		}
	};
</script>


<style scoped>
</style>
