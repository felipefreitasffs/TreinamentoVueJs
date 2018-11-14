<template>
  <q-card color="dark" class="q-pa-lg">
    <q-card-title>
      <div class="row justify-center items-center">
        <div class="col-md-6 text-center">
          <img src="../statics/logo.png" width="50%"/>
        </div>
        <div id="login-title" class="col-md-6">
          <p class="text-center">
            Treinamento Web
          </p>
          <p class="text-center">
            VueJs + Quasar
          </p>
        </div>
      </div>
    </q-card-title>
    <q-card-separator />
    <q-card-main>
      <q-field
        dark
        icon="fas fa-user"
        :label="capitalize($t('label.user'))"
        helper="entre com seu usuário"
      >
        <q-input color="primary" dark suffix="@landix.com" v-model="username" />
      </q-field>
      <q-field
        dark
        icon="fas fa-key"
        :label="capitalize($t('label.password'))"
        helper="entre com sua senha"
      >
        <q-input color="primary" dark type="password" v-model="password" />
      </q-field>
      <div class="row q-pt-lg">
        <div class="col-md-12 text-right">
          <q-btn icon="fas fa-check" label="Entrar" color="positive" @click="login"/>
        </div>
      </div>
    </q-card-main>
  </q-card>
</template>

<script>
// we import all of `date`
import { format } from 'quasar'
// destructuring to keep only what is needed
const { capitalize } = format

export default {
  name: 'Login',
  data () {
    return {
      username: undefined,
      password: undefined,
      capitalize
    }
  },
  computed: {
    fullUsername: function () { return this.username ? this.username + '@landix.com.br' : undefined }
  },
  methods: {
    login () {
      this.$axios.post('/landix/login/', { username: this.fullUsername, password: this.password })
        .then((response) => {
          this.$emit('logged', response.data)
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Usuário ou senha inválido!',
            icon: 'report_problem'
          })
        })
    }
  }
}
</script>

<style scoped lang="stylus">
#login-title
  font-size 25px
  font-weight bold
</style>
