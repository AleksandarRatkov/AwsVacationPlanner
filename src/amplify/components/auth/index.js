import Vue from 'vue'

import VerifyContact from './VerifyContact'
import SignIn1 from './SignIn1'
import SignUp1 from './SignUp1'
import SignOut1 from './SignOut1'
import ConfirmSignUp1 from './ConfirmSignUp1'
import ForgotPassword1 from './ForgotPassword1'



Vue.component('a-verify-contact', VerifyContact);
Vue.component('a-sign-in-1', SignIn1);
Vue.component('a-sign-up-1', SignUp1);
Vue.component('a-sign-out-1', SignOut1);
Vue.component('a-confirm-sign-up-1', ConfirmSignUp1);
Vue.component('a-forgot-password-1', ForgotPassword1);


export {
	VerifyContact,
	SignIn1,
	SignUp1,
	SignOut1,
	ConfirmSignUp1,
	ForgotPassword1
}
