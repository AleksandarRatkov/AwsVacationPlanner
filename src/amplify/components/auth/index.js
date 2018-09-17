import Vue from 'vue'

import VerifyContact from './VerifyContact'
import SignIn from './SignIn'
import SignUp from './SignUp'
import SignOut from './SignOut'
import ConfirmSignUp from './ConfirmSignUp'
import ForgotPassword from './ForgotPassword'



Vue.component('a-verify-contact', VerifyContact);
Vue.component('a-sign-in', SignIn);
Vue.component('a-sign-up', SignUp);
Vue.component('a-sign-out', SignOut);
Vue.component('a-confirm-sign-up', ConfirmSignUp);
Vue.component('a-forgot-password', ForgotPassword);


export {
	VerifyContact,
	SignIn,
	SignUp,
	SignOut,
	ConfirmSignUp,
	ForgotPassword
}
