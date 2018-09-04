<template>
  <div :style="theme.form">
    <div>Are you sure?</div>
    <div :style="theme.actionRow">
        <button :style="theme.action" v-on:click="signOut">Sign Out</button>
    </div>
    <div :style="theme.error" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { Auth, JS } from 'aws-amplify'
import AmplifyTheme from '../../AmplifyTheme'

export default {
  name: 'SignOut',
  data () {
    return {
        error: '',
        theme: AmplifyTheme
    }
  },
  methods: {
    signOut: function(event) {
        Auth.signOut()
            .then(() => {
                this.$router.push('/auth/signIn');
            })
            .catch(err => this.setError(err))
    },
    setError: function(err) {
        this.error = err.message || err;
    }
  }
}
</script>
