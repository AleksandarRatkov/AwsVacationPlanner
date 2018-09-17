import * as Components from './components'
import AmplifyStore from './AmplifyStore'
import AuthView from './AuthView'

import {Auth} from 'aws-amplify'

const AuthRouter = {
	path: '/auth',
	name: 'auth',
	component: AuthView,
	children: [
		{
			path: 'signUp',
			name: 'auth_SignUp',
			component: Components.SignUp
		},
		{
			path: 'signIn',
			name: 'auth_SignIn',
			component: Components.SignIn
		},
		{
			path: 'signOut',
			name: 'auth_SignOut',
			component: Components.SignOut
		},
		{
			path: 'confirmSignUp',
			name: 'auth_ConfirmSignUp',
			component: Components.ConfirmSignUp
		},
		{
			path: 'verifyContact',
			name: 'auth_VerifyContact',
			component: Components.VerifyContact
		},
		{
			path: 'forgotPassword',
			name: 'auth_ForgotPassword',
			component: Components.ForgotPassword
		}
	]
};

const AuthFilter = (to, from, next) => {
	Auth.currentAuthenticatedUser()
		.then(user => {
			AmplifyStore.commit('setUser', user);
			Auth.currentCredentials()
				.then(credentials => {
					AmplifyStore.commit('setUserId', credentials.identityId)
				})
				.catch(err => logger.debug('get current credentials err', err));
			next()
		})
		.catch(err => {
			AmplifyStore.commit('setUser', null);
			if (!to.name.startsWith('auth'))
			{
				next('/auth/signIn')
			}
			else
			{
				next()
			}
		})
};

export default AuthRouter
export {AuthFilter}
