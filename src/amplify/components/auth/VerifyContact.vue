<template>
  <div :style="theme.form">
    <h1 :style="theme.header" v-if="!submitView">Verify Contact</h1>
    <h1 :style="theme.header" v-if="submitView">Submit Code</h1>
    <div v-if="!submitView">
      <div :style="[theme.inputRow, {textAlign: 'left'}]" v-if="this.unverified.email">
        <input :style="theme.radio" type="radio" v-on:click="verifyEmail" />
        {{this.unverified.email}}
      </div>
      <div :style="[theme.inputRow, {textAlign: 'left'}]" v-if="this.unverified.phone_number">
        <input :style="theme.radio" type="radio"  v-on:click="verifyPhoneNumber" />
        {{this.unverified.phone_number}}
      </div>
      <div :style="theme.actionRow">
        <button :style="theme.action" v-on:click="send">Send Code</button>
      </div>
    </div>
    <div v-if="submitView">
      <div :style="theme.inputRow">
        <input :style="theme.input" v-model="code" placeholder="Code" />
      </div>
      <div :style="theme.actionRow">
        <button :style="theme.action" v-on:click="submit" :disabled="!code">Submit</button>
      </div>
    </div>
    <div :style="theme.footer">
      &nbsp;
      <span :style="theme.footerRight">
        <a :style="theme.link" v-on:click="skip">Skip</a>
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
  name: 'VerifyContact',
  data () {
    return {
      verifyAttr: '',

      submitView: false,
      code: '',

      error: '',
      theme: AmplifyTheme
    }
  },
  computed: {
    unverified() {
      const verification = AmplifyStore.state.userVerification;
      return verification && verification.unverified
        ? verification.unverified
        : []
    }
  },
  created: function() {
    const verification = AmplifyStore.state.userVerification;
    if (!verification) {
      this.$router.push('/')
    }
  },
  methods: {
    verifyEmail: function() { this.verifyAttr = 'email' },
    verifyPhoneNumber: function() { this.verifyAttr = 'phone_number' },
    send: function() {
      Auth.verifyCurrentUserAttribute(this.verifyAttr)
        .then(data => {
            this.submitView = true
        })
        .catch(err => this.setError(err))
    },
    submit: function() {
      Auth.verifyCurrentUserAttributeSubmit(this.verifyAttr, this.code)
        .then(() => {
          this.$router.push('/');
        })
        .catch(err => this.setError(err));
    },
    skip: function() {
        this.$router.push('/');
    },
    setError: function(err) {
        this.error = err.message || err;
    }
  }
}
</script>
