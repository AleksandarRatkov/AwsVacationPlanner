<template>
  <div :style="theme.form">
    <h1 :style="theme.header">Sign Up</h1>
    <div :style="theme.inputRow">
      <input :style="theme.input" v-model="username" placeholder="Username" autofocus />
    </div>
    <div :style="theme.inputRow">
      <input :style="theme.input" v-model="password" type="password" placeholder="Password" />
    </div>
    <div :style="theme.inputRow">
      <input :style="theme.input" v-model="email" placeholder="Email" />
    </div>
    <div :style="theme.inputRow">
      <input :style="theme.input" v-model="phone_number" placeholder="Phone Number" />
    </div>
    <div :style="theme.actionRow">
      <button :style="theme.action" v-on:click="signUp" :disabled="!username || !password">Sign Up</button>
    </div>
    <div :style="theme.footer">
      <div :style="theme.footerLeft">
        <a :style="theme.link" v-on:click="signIn">Back to Sign In</a>
      </div>
      <div :style="theme.footerRight">
        <a :style="theme.link" v-on:click="confirm">Confirm a Code</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import AmplifyStore from '../../AmplifyStore'
import AmplifyTheme from '../../AmplifyTheme'

export default {
  name: 'SignUp',
  data () {
    return {
      username: '',
      password: '',
      email: '',
      phone_number: '',
      theme: AmplifyTheme
    }
  },
  computed: {
    user() { return AmplifyStore.state.user }
  },
  methods: {
    signUp: function(event) {
        Auth.signUp(this.username, this.password, this.email, this.phone_number)
            .then(data => {
                this.$router.push('/auth/confirmSignUp');
            })

    },
    signIn: function() {
        this.$router.push('/auth/signIn');
    },
    confirm: function() {
        this.$router.push('/auth/confirmSignUp');
    }
  }
}
</script>
