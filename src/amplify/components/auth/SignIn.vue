<template>
  <div :style="theme.form">
    <h1 :style="theme.header" v-if="!confirmView">Sign In</h1>
    <h1 :style="theme.header" v-if="confirmView">Confirm Sign In</h1>
    <div v-if="!confirmView">
      <div :style="theme.inputRow">
        <input :style="theme.input" v-model="username" placeholder="Username" autofocus v-on:keyup.enter="signIn" />
      </div>
      <div :style="theme.inputRow">
        <input :style="theme.input" v-model="password" type="password" placeholder="Password" v-on:keyup.enter="signIn" />
      </div>
      <div :style="theme.actionRow">
        <button :style="theme.action" v-on:click="signIn" :disabled="!username || !password">Sign In</button>
      </div>
    </div>
    <div v-if="confirmView">
      <div :style="theme.inputRow">
        <input :style="theme.input" v-model="code" placeholder="Code" v-on:keyup.enter="confirm" />
      </div>
      <div :style="theme.actionRow">
        <button :style="theme.action" v-on:click="confirm" :disabled="!code">Confirm</button>
      </div>
    </div>
    <div :style="theme.footer">
      <span :style="theme.footerLeft">
        <a :style="theme.link" v-on:click="forgot">Forgot Password</a>
      </span>
      &nbsp;
      <span :style="theme.footerRight">
        <a :style="theme.link" v-on:click="signUp">Sign Up</a>
      </span>
    </div>
    <div :style="theme.error" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { Auth, JS } from 'aws-amplify'
import AmplifyStore from '../../AmplifyStore'
import AmplifyTheme from '../../AmplifyTheme'

export default {
  name: 'SignIn',
  data () {
    return {
        username: '',
        password: '',

        user: null,
        confirmView: false,
        code: '',

        error: '',
        theme: AmplifyTheme
    }
  },
  methods: {
    signIn: function(event) {
      const that = this
      Auth.signIn(this.username, this.password)
        .then(user => {
          AmplifyStore.commit('setUser', user);
          return user
        })
        .then(user => {
          that.user = user
          if (user.challengeName === 'SMS_MFA') {
            that.confirmView = true
            return
          }
          this.checkUser()
        })
        .catch(err => this.setError(err))

    },
    checkUser: function() {
      const user = this.user;
      if (!user) { return }

      Auth.verifiedContact(user)
        .then(data => {
          AmplifyStore.commit('setUserVerification', data);
          if (!JS.isEmpty(data.verified)) {
            this.$router.push('/');
          } else {
            this.$router.push('/auth/verifyContact');
          }
        });
    },
    confirm: function() {
      Auth.confirmSignIn(this.user, this.code)
        .then(() => {
          this.$router.push('/');
        })
        .catch(err => this.setError(err));
    },
    forgot: function() {
        this.$router.push('/auth/forgotPassword');
    },
    signUp: function() {
        this.$router.push('/auth/signUp');
    },
    setError: function(err) {
        this.error = err.message || err;
    }
  }
}
</script>
