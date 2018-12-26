<template>
  <q-layout view="hHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        class="justify-between"
        color="dark"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <div class="row">
          <q-btn
            flat
            dense
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
          >
            <q-icon name="menu" />
          </q-btn>

          <q-toolbar-title>
            <img src="../statics/minilogo.png" width="45px">
          </q-toolbar-title>
        </div>

        <q-tabs
          color="dark"
          :glossy="$q.theme === 'mat'"
          :inverted="$q.theme === 'ios'"
        >
          <q-route-tab
            slot="title"
            icon="fas fa-users"
            to="/users"
            replace
            hide="icon"
            :label="capitalize($t('label.user'))"
          />
          <q-route-tab
            slot="title"
            icon="fas fa-code-branch"
            to="/branches"
            replace
            hide="icon"
            :label="capitalize($t('label.branch'))" />
        </q-tabs>

        <q-btn-dropdown :label="$q.localStorage.get.item('user').name">
          <!-- dropdown content -->
          <q-list link>
            <q-item>
              <q-item-main @click.native="logout">
                <q-item-tile label>Logout</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>

    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      :width="200"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-item to="/users">
          <q-item-side icon="fas fa-users" />
          <q-item-main :label="capitalize($t('label.user'))"/>
        </q-item>
        <q-item to="/branches">
          <q-item-side icon="fas fa-code-branch" />
          <q-item-main :label="capitalize($t('label.branch'))"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// destructuring to keep only what is needed
import { format } from 'quasar'
const { capitalize } = format

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      capitalize
    }
  },
  methods: {
    logout () {
      this.$axios.post('/landix/logout/')
        .then((response) => {
          this.$q.localStorage.remove('user')
          this.$router.push('login')
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Erro ao realizar o logout!',
            icon: 'report_problem'
          })
        })
    }
  }
}
</script>

<style>
</style>
