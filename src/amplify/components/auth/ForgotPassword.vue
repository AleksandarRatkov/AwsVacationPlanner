<template>
  <div :style="theme.form">
    <h1 :style="theme.header">Forgot Password</h1>
    <div :style="theme.inputRow">
      <input :style="theme.input" v-model="username" placeholder="Username" autofocus />
    </div>
    <div :style="theme.inputRow">
      <input :style="theme.input" v-model="code" placeholder="Code" />
    </div>
    <div :style="theme.inputRow">
      <input :style="theme.input" v-model="password" type="password" placeholder="Password" />
    </div>
    <div :style="theme.actionRow">
      <button :style="theme.action" v-on:click="send" :disabled="!username">Send Code</button>
      <button :style="theme.action" v-on:click="submit" :disabled="!username || !code">Submit Code</button>
    </div>
    <div :style="theme.footer">
      <span :style="theme.footerLeft">
        <a :style="theme.link" v-on:click="signIn">Back to Sign In</a>
      </span>
      &nbsp;
    </div>
    <div :style="theme.error" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import AmplifyStore from '../../AmplifyStore'
import AmplifyTheme from '../../AmplifyTheme'

export default {
  name: 'ForgotPassword',
  data () {
    return {
        username: '',
        code: '',
        password: '',
        error: '',
        theme: AmplifyTheme
    }
  },
  computed: {
    user() { return AmplifyStore.state.amplify.user }
  },
  methods: {
    send: function() {
        Auth.forgotPassword(this.username)
            .catch(err => this.setError(err));
    },
    submit: function() {
        Auth.forgotPasswordSubmit(this.username, this.code, this.password)
            .then(() => this.$router.push('/'))
            .catch(err => this.setError(err));
    },
    signIn: function() {
        this.$router.push('/auth/signIn');
    },
    setError: function(err) {
        this.error = err.message || err;
    }
  }
}
</script>
