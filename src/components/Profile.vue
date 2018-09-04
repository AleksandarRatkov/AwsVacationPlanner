<template>
  <div :style="theme.container">
    <a-photo-picker
      :defSrc="'/static/avatar.png'"
      :path="'avatars/' + userId"
      :theme="theme"
      v-if="userId"
    />

    <div v-if="user">{{user.username}}</div>

    <a-simple-form
      :path="'profiles/' + userId"
      :fields="fields"
      :theme="theme"
      v-if="userId"
    />
  </div>
</template>

<script>
import { Auth, Storage, Logger } from 'aws-amplify'

import { AmplifyStore, AmplifyTheme } from '../amplify'

const logger = new Logger('Profile');

export default {
  name: 'Profile',
  data () {
    return {
      fields: [
        { type: 'string', name: 'firstName', label: 'FirstName' },
        { type: 'string', name: 'lastName', label: 'LastName' },
        { type: 'lineBreak' },
        { type: 'string', name: 'nickname', label: 'Nickname' }
      ],
      theme: AmplifyTheme
    }
  },
  computed: {
    user: function() { return AmplifyStore.state.user },
    userId: function() { return AmplifyStore.state.userId }
  }
}
</script>
