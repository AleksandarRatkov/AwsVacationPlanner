<template>
	<div class="container">
		<div>
			<h3>All employees </h3>
			<br>
		</div>
		<md-table v-model="employees" md-sort="name" md-sort-order="asc" md-card>
			<md-table-row slot="md-table-row" slot-scope="{ item }" @click="editEmployee(item.id)">
				<md-table-cell md-label="Name" md-sort-by="fullName">{{ item.fullName }}</md-table-cell>
				<md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
				<md-table-cell md-label="Date of birth" md-sort-by="dateOfBirth">{{ item.dateOfBirth | dateFormat('YYYY.MM.DD') }}</md-table-cell>
				<md-table-cell md-label="Pid" md-sort-by="pid">{{ item.pid }}</md-table-cell>
				<md-table-cell md-label="Job Title" md-sort-by="address">{{ item.address }}</md-table-cell>
			</md-table-row>
		</md-table>
 	</div>


</template>


<script>
	export default {
		data()
		{
			return {
				employees: [],
				employee: {
					fullName:"",
					email:"",
					dateOfBirth:"",
					pid:"",
					address:""
				},
				errors: [],
			};
		},
		created() {
			this.getAllEmployees();
		},
		methods: {
			getAllEmployees: function () {
				this.$http.get('https://ds4g18g0l9.execute-api.eu-central-1.amazonaws.com/dev/employee')
					.then((response) => {
						this.employees = response.data;
					})
					.catch((e) => {
						this.errors.push(e);
					});
			},
			editEmployee: function (employeeId) {
				this.$router.push({name:'AddEmployee', params: {id : employeeId}})
			}
		}
	};
</script>


<style scoped>
</style>
