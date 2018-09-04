import Vue from 'vue'
import Router from 'vue-router'
import {EmployeeList, AddEmployee} from '@/components'

import {AuthRouter, AuthFilter} from '../amplify'

Vue.use(Router)

const router = new Router({
  routes: [
	  {
		  path: '/',
		  name: 'EmployeeList',
		  component: EmployeeList
	  },
	  {
		  path: '/add/:id?',
		  name: 'AddEmployee',
		  component: AddEmployee,
	  },
	  AuthRouter
  ]
})

router.beforeEach(AuthFilter);

export default router
