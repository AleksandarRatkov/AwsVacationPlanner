<template>
  <div class="auth-greetings">
    <div>
        <span>{{greeting}}</span>
    </div>
    <div v-if="greeting">
        <button v-on:click="signOut">Sign Out</button>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'

import AmplifyStore from '../../AmplifyStore'

export default {
  name: 'Greetings',
  data () {
    return {
        greeting: 'Hi'
    }
  },
  computed: {
    user() { return AmplifyStore.state.user }
  },
  methods: {
    signOut: function(event) {
        Auth.signOut()
            .then(data => {
                logger.debug('sign out success', data);
                AmplifyStore.commit('setUser', null);
                this.$router.push('/auth/signIn');
            })
    }
  }
}
</script>
