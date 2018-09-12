import Vue from 'vue'
import Router from 'vue-router'
import {VacationList, AddVacation} from '@/components'

import {AuthRouter, AuthFilter} from '../amplify'

Vue.use(Router);

const router = new Router({
  routes: [
	  {
		  path: '/',
		  name: 'VacationList',
		  component: VacationList
	  },
	  {
		  path: '/add/:vacationId?',
		  name: 'AddVacation',
		  component: AddVacation,
	  },
	  AuthRouter
  ]
});

router.beforeEach(AuthFilter);

export default router
