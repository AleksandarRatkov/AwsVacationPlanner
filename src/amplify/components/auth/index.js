import Vue from 'vue'

import SignIn from './SignIn'
import SignUp from './SignUp'
import SignOut from './SignOut'
import ConfirmSignUp from './ConfirmSignUp'
import VerifyContact from './VerifyContact'
import ForgotPassword from './ForgotPassword'
import Greetings from './Greetings'

Vue.component('a-sign-in', SignIn)
Vue.component('a-sign-up', SignUp)
Vue.component('a-sign-out', SignOut)
Vue.component('a-confirm-sign-up', ConfirmSignUp)
Vue.component('a-verify-contact', VerifyContact)
Vue.component('a-forgot-password', ForgotPassword)
Vue.component('a-greetings', Greetings)

export {
  SignIn,
  SignUp,
  SignOut,
  ConfirmSignUp,
  VerifyContact,
  ForgotPassword,
  Greetings
}
