import Vue from 'vue'

import SignIn from './SignIn'
import SignUp from './SignUp'
import SignOut from './SignOut'
import ConfirmSignUp from './ConfirmSignUp'
import VerifyContact from './VerifyContact'
import ForgotPassword from './ForgotPassword'
import SignIn1 from './SignIn1'
import SignUp1 from './SignUp1'
import SignOut1 from './SignOut1'
import ConfirmSignUp1 from './ConfirmSignUp1'
import ForgotPassword1 from './ForgotPassword1'



Vue.component('a-sign-in', SignIn);
Vue.component('a-sign-up', SignUp);
Vue.component('a-sign-out', SignOut);
Vue.component('a-confirm-sign-up', ConfirmSignUp);
Vue.component('a-verify-contact', VerifyContact);
Vue.component('a-forgot-password', ForgotPassword);
Vue.component('a-sign-in-1', SignIn1);
Vue.component('a-sign-up-1', SignUp1);
Vue.component('a-sign-out-1', SignOut1);
Vue.component('a-confirm-sign-up-1', ConfirmSignUp1);
Vue.component('a-forgot-password-1', ForgotPassword1);


export {
	SignIn,
	SignUp,
	SignOut,
	ConfirmSignUp,
	VerifyContact,
	ForgotPassword,
	SignIn1,
	SignUp1,
	SignOut1,
	ConfirmSignUp1,
	ForgotPassword1
}
