<template>
  <div id="login-page">
    <div class="row items-center q-mt-md">
      <div class="col-md-6 text-right">
        <img src="../statics/logo.png" />
      </div>
      <div id="login-title" class="col-md-6">
        <p class="q-ml-md">
          Treinamento Web
        </p>
        <p class="q-ml-md">
          VueJs + Quasar
        </p>
      </div>
    </div>
    <div class="row justify-center">
      <login-form @logged="saveUser"></login-form>
    </div>
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
      this.$router.push(this.redirect)
    }
  }
}
</script>

<style scoped lang="stylus">
#login-title
  font-size 30px
  font-weight bold
</style>
