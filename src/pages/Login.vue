<template>
  <div id="login-page" class="absolute-center">
    <login-form @logged="saveUser"></login-form>
  </div>
</template>

<script>
import LoginForm from '../components/Login.vue'

export default {
  components: {
    LoginForm
  },
  name: 'Login',
  props: ['redirect'],
  methods: {
    saveUser (user) {
      this.$q.localStorage.set('user', user)
      this.$router.push(this.redirect || '/')
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
