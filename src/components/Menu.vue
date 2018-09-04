<template>
  <div :style="navStyle">
    <div :style="navStyle.main">
      <a :style="navStyle.item" v-on:click="home">Home</a>
      <a :style="navStyle.item" v-on:click="notes">Notes</a>
    </div>
    <div :style="navStyle.right">
      <span :style="navStyle.greeting" v-if="!user">Please Sign In</span>
      <span :style="navStyle.greeting" v-if="user">{{user.username}}</span>
      <a :style="navStyle.item" v-on:click="profile" v-if="user">Profile</a>
      <a :style="navStyle.item" v-on:click="signOut" v-if="user">Sign Out</a>
    </div>
  </div>
</template>

<script>
import { Auth, Hub } from 'aws-amplify'

import { AmplifyStore, AmplifyTheme } from '../amplify'

export default {
  name: 'Menu',
  data () {
    return {
      navStyle: AmplifyTheme.nav
    }
  },
  computed: {
    user() { return AmplifyStore.state.user }
  },
  methods: {
    home: function() {
        this.$router.push('/')
    },
    notes: function() {
        this.$router.push('/notes')
    },
    profile: function() {
        this.$router.push('/profile')
    },
    signOut: function() {
        this.$router.push('/auth/signOut')
    }
  }
}
</script>
