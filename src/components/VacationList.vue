<template>
	<div class="page-container" id="app">
		<md-dialog-confirm
				:md-active.sync="activeSignOut"
				md-title="Sign Out"
				md-content="Are you really sure you want to sign out?"
				md-confirm-text="Agree"
				md-cancel-text="Disagree"
				@md-cancel="onCancel"
				@md-confirm="onConfirm"/>

		<div>
			<md-dialog :md-active.sync="activeVacation">
				<br/>
				<md-dialog-title>Vacation details</md-dialog-title>
				<div style="margin: auto">
					<md-field>
						<label>Vacation description</label>
						<md-input v-model="vacation.description" readonly/>
					</md-field>

					<md-field>
						<label>Vacation Start Date</label>
						<md-input v-model="vacation.startDate" readonly/>
					</md-field>

					<md-field>
						<label>Vacation End Date</label>
						<md-input v-model="vacation.endDate" readonly/>
					</md-field>

					<md-field>
						<label>Vacation Number Of Days</label>
						<md-input v-model="vacation.numberOfDays" readonly/>
					</md-field>
				</div>


				<md-dialog-actions>
					<md-button v-if="privileges === 'admin'" class="md-primary" @click="approveVacation(vacation)">Approve</md-button>
					<md-button v-if="privileges === 'admin'" class="md-primary" @click="activeVacation = false">Cancel</md-button>

					<md-button v-if="privileges === 'user'" class="md-primary" @click="activeVacation = false">Close</md-button>
				</md-dialog-actions>
			</md-dialog>
		</div>

		<div>
			<md-dialog :md-active.sync="activeRole">
				<br/>
				<md-dialog-title>Select user role:</md-dialog-title>
				<div style="margin: auto">
					<md-radio v-model="privileges" value="admin">Admin</md-radio>
					<md-radio v-model="privileges" value="user">User</md-radio>
				</div>


				<md-dialog-actions>
					<md-button class="md-primary" @click="changeUserRole">Save</md-button>
				</md-dialog-actions>
			</md-dialog>
		</div>

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

					<md-list-item @click="activeRole = true">
						<md-icon>https</md-icon>
						<span class="md-list-item-text">User role</span>
					</md-list-item>

					<md-list-item @click="activeSignOut = true">
						<md-icon>account_circle</md-icon>
						<span class="md-list-item-text">Sign out</span>
					</md-list-item>
				</md-list>
			</md-app-drawer>
			<md-app-content class="screen-size">
				<div class="container" v-cloak>
					<div>
						<h3 v-if="privileges === 'user'">Welcome user {{username}}! Here you can see all vacation request that you
							created!</h3>
						<h3 v-if="privileges === 'admin'">Welcome admin {{username}}! Here you can see and approved all vacation
							request that are created!</h3>
						<br>
					</div>
					<md-table v-model="vacations" md-sort="name" md-sort-order="asc" md-card>
						<md-table-row slot="md-table-row" slot-scope="{ item }" @click="editVacation(item)"
						              :class="{pointer : !item.isApproved, approvedVacation : item.isApproved, contextMenu: item.isApproved && privileges === 'user'}">
							<md-table-cell md-label="Start date" md-sort-by="startDate">{{ item.startDate | moment("YYYY-MM-DD") }}
							</md-table-cell>
							<md-table-cell md-label="End date" md-sort-by="endDate">{{ item.endDate | moment("YYYY-MM-DD") }}
							</md-table-cell>
							<md-table-cell md-label="Number of days" md-sort-by="numberOfDays">{{ item.numberOfDays }}
							</md-table-cell>
							<md-table-cell md-label="Description" md-sort-by="description">{{ item.description |
								strippedDescription}}
							</md-table-cell>
						</md-table-row>
					</md-table>
				</div>
			</md-app-content>
		</md-app>
	</div>
</template>

<script>
	import Vue from 'vue'
	import {Auth} from 'aws-amplify'
	import moment from 'moment'

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
					description: "",
					userId: '',
					isApproved: false
				},
				errors: [],
				menuVisible: false,
				username: '',
				activeSignOut: false,
				activeVacation: false,
				activeRole: false,
				privileges: 'user'
			};
		},
		filters: {
			strippedDescription(value)
			{
				if (value.length > 40)
				{
					return value.slice(0, 39) + '...';
				}
				else
				{
					return value;
				}
			}
		},
		created()
		{
			this.getUserInfo();
		},
		methods: {
			getUserVacations: function (userId) {
				this.$http.get('https://vglbyiygsh.execute-api.eu-central-1.amazonaws.com/dev/user/' + userId + '/vacation')
					.then((response) => {
						this.vacations = response.data;
					})
					.catch((e) => {
						this.errors.push(e);
					});
			},
			getAllVacations: function () {
				this.$http.get('https://vglbyiygsh.execute-api.eu-central-1.amazonaws.com/dev/vacation')
					.then((response) => {
						this.vacations = response.data;
					})
					.catch((e) => {
						this.errors.push(e);
					});
			},
			getVacation: function (userId, vacationId) {
				this.$http.get('https://vglbyiygsh.execute-api.eu-central-1.amazonaws.com/dev/user/' + userId + '/vacation/' +
					vacationId)
					.then((response) => {
						this.vacation = response.data[0];
						this.vacation.startDate = this.dateFormatting(this.vacation.startDate);
						this.vacation.endDate = this.dateFormatting(this.vacation.endDate);
					})
					.catch((e) => {
						this.errors.push(e);
					});
			},
			dateFormatting: function (date) {
				return moment(date).format("YYYY-MM-DD");
			},
			editVacation: function (vacation) {
				if (!vacation.isApproved)
				{
					if (this.privileges === 'user')
					{
						this.$router.push({name: 'AddVacation', params: {vacationId: vacation.vacationId}})
					}
					else if (this.privileges === 'admin')
					{
						this.getVacation(vacation.userId, vacation.vacationId);
						this.activeVacation = true;
					}
				}
				else if (vacation.isApproved && this.privileges === 'user')
				{
					this.getVacation(vacation.userId, vacation.vacationId);
					this.activeVacation = true;
				}
			},
			approveVacation: function (vacation) {
				vacation.isApproved = true;
				this.$http.put('https://vglbyiygsh.execute-api.eu-central-1.amazonaws.com/dev/vacation/' + vacation.vacationId, vacation)
					.then(function (response) {
						console.log('Success!:', response.message);
						this.activeVacation = false;
						this.getUserInfo();
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
						this.username = info.username;
						this.vacation.userId = info.id;
						this.privileges = info.attributes['custom:privileges'];

						if (info.attributes['custom:privileges'] === 'user')
						{
							setTimeout(() => {
								this.getUserVacations(this.vacation.userId)
							}, 300);
						}
						else if (info.attributes['custom:privileges'] === 'admin')
						{
							setTimeout(() => {
								this.getAllVacations()
							}, 300);
						}
					})
					.catch(err => console.log('get current credentials err', err));
			},
			changeUserRole: function () {
				Auth.currentAuthenticatedUser().then(user => {
					Auth.updateUserAttributes(user, {
						'custom:privileges': this.privileges
					});
					this.activeRole = false;
					this.menuVisible = false;
					this.getUserInfo();
				});
			}
		}
	};
</script>


<style scoped>
	.md-table-cell {
		width: 25% !important;
	}

	.screen-size {
		height: 768px;
	}

	.pointer {
		cursor: pointer;
	}

	.approvedVacation {
		background-color: lightgrey;
	}
	.contextMenu {
		cursor: context-menu;
	}
</style>
