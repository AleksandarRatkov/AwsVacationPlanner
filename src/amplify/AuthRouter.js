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
			path: 'signIn',
			name: 'auth_SignIn',
			component: Components.SignIn
		},
		{
			path: 'signUp',
			name: 'auth_SignUp',
			component: Components.SignUp
		},
		{
			path: 'signUp1',
			name: 'auth_SignUp1',
			component: Components.SignUp1
		},
		{
			path: 'signIn1',
			name: 'auth_SignIn1',
			component: Components.SignIn1
		},
		{
			path: 'signOut',
			name: 'auth_SignOut',
			component: Components.SignOut
		},
		{
			path: 'signOut1',
			name: 'auth_SignOut1',
			component: Components.SignOut1
		},
		{
			path: 'confirmSignUp',
			name: 'auth_ConfirmSignUp',
			component: Components.ConfirmSignUp
		},
		{
			path: 'confirmSignUp1',
			name: 'auth_ConfirmSignUp1',
			component: Components.ConfirmSignUp1
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
		},
		{
			path: 'forgotPassword1',
			name: 'auth_ForgotPassword1',
			component: Components.ForgotPassword1
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
				next('/auth/signIn1')
			}
			else
			{
				next()
			}
		})
};

export default AuthRouter
export {AuthFilter}
