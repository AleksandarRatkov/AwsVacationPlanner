import Vue from 'vue'
import App from './App'
import router from './router'

import Amplify, { Auth, Logger } from 'aws-amplify'
import aws_exports from './aws-exports'

Vue.config.productionTip = false

Amplify.configure(aws_exports)
Amplify.Logger.LOG_LEVEL = 'DEBUG'

const logger = new Logger('main')

Auth.currentUserInfo()
  .then(user => logger.debug(user))
  .catch(err => logger.debug(err))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})
