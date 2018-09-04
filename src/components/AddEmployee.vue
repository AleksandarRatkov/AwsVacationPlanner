<template>
	<div class="container">
		<div v-if="!employeeId">
			<h3>Enter new employee </h3>
		</div>

		<div v-if="employeeId">
			<h3>Edit employee </h3>
		</div>

		<p class="float-right">
			<router-link to="/">
				<md-button class="md-raised md-primary">See all employees</md-button>
			</router-link>
		</p>

		<md-field>
			<label>Name</label>
			<md-input v-model="employee.fullName" placeholder="Enter a Name"></md-input>
		</md-field>

		<md-field>
			<label>Email</label>
			<md-input v-model="employee.email" placeholder="Enter an Email"></md-input>
		</md-field>

			<md-datepicker v-model="employee.dateOfBirth">
				<label>Date Of Birth</label>
			</md-datepicker>

		<md-field>
			<label>Personal identification number</label>
			<md-input v-model="employee.pid" placeholder="Enter a Personal identification number"></md-input>
		</md-field>

		<md-field>
			<label>Address</label>
			<md-input v-model="employee.address" placeholder="Enter an Address"></md-input>
		</md-field>


		<div>
			<md-button class="md-raised md-primary" v-if="!employeeId" v-on:click.prevent="saveEmployee">Save</md-button>
			<md-button class="md-raised md-primary" v-if="employeeId" v-on:click.prevent="editEmployee(employeeId)">Save</md-button>
			<router-link to="/">
				<md-button class="md-raised md-accent">Cancel</md-button>
			</router-link>
		</div>
	</div>

</template>


<script>
	export default {
		data()
		{
			return {
				employee: {
					fullName: "",
					email: "",
					dateOfBirth: null,
					pid: "",
					address: ""
				},
				employeeId: this.$route.params.id,
				errors: [],
			};
		},
		created()
		{
			if (this.employeeId)
			{
				this.getEmployee(this.employeeId);
			}
		},
		methods: {
			saveEmployee: function () {
				this.$http.post('https://ds4g18g0l9.execute-api.eu-central-1.amazonaws.com/dev/employee', this.employee)
					.then(function (response) {
						console.log('Success!:', response.message);
						this.$router.push('/')
					}, function (response) {
						console.log('Error!:', response.data);
					});
			},
			getEmployee: function (employeeId) {
				this.$http.get('https://ds4g18g0l9.execute-api.eu-central-1.amazonaws.com/dev/employee/' + employeeId)
					.then((response) => {
						this.employee = response.data;
					})
					.catch((e) => {
						this.errors.push(e);
					});
			},
			editEmployee: function (employeeId) {
				console.log(this.employee);
				this.$http.put(
					'https://ds4g18g0l9.execute-api.eu-central-1.amazonaws.com/dev/employee/' + employeeId, this.employee)
					.then(function (response) {
						console.log('Success!:', response.message);
						this.$router.push('/')
					}, function (response) {
						console.log('Error!:', response.data);
					});
			}
		}
	};
</script>


<style scoped>
</style>
