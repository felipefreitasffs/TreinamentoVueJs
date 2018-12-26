<template>
  <q-page padding>
    <q-table
      ref="userTable"
      :data="serverData"
      :columns="columns"
      row-key="name"
      :pagination.sync="serverPagination"
      :loading="loading"
      :filter="filter"
      :rows-per-page-options="[10, 20]"
      @request="request"
    >
      <template slot="top-left" slot-scope="props">
        <q-search hide-underline float-label="Nome" placeholder=" " v-model="filterName" @input="filterTable"/>
        <q-search hide-underline float-label="LDAP UID" placeholder=" " v-model="filterLdapUid" @input="filterTable"/>
        <q-radio v-model="filterActive" val="" label="Todos"  @input="filterTable"/>
        <q-radio v-model="filterActive" val="1" label="Ativos"  @input="filterTable"/>
        <q-radio v-model="filterActive" val="0" label="Inativos"  @input="filterTable"/>
      </template>
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="name" :props="props">{{ props.row.name }}</q-td>
        <q-td key="email" :props="props">{{ props.row.email }}</q-td>
        <q-td key="ldap_uid" :props="props">{{ props.row.ldap_uid }}</q-td>
        <q-td key="created" :props="props">{{ new Date(props.row.created).toLocaleString() }}</q-td>
        <q-td key="active" :props="props">
          <q-chip
            :icon="props.row.active ? 'check' : 'close'"
            :color="props.row.active ? 'positive' : 'negative'"
          >
            {{ props.row.active ? 'Sim' : 'Não' }}
          </q-chip>
        </q-td>
      </q-tr>
    </q-table>
  </q-page>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      filterName: undefined,
      filterLdapUid: undefined,
      filterActive: '',
      loading: false,
      filter: {},
      serverPagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: undefined // specifying this determines pagination is server-side
      },
      serverData: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Nome',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'email',
          required: true,
          label: 'Email',
          align: 'left',
          field: 'email',
          sortable: true
        },
        {
          name: 'ldap_uid',
          required: true,
          label: 'Ldap uid',
          align: 'left',
          field: 'ldap_uid',
          sortable: true
        },
        {
          name: 'created',
          required: true,
          label: 'Data de criação',
          align: 'center',
          field: 'created',
          sortable: true
        },
        {
          name: 'active',
          required: true,
          label: 'Ativo',
          align: 'center',
          field: 'active',
          sortable: true
        }
      ]
    }
  },
  mounted () {
    // once mounted, we need to trigger the initial server data fetch
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  },
  methods: {
    request ({ pagination, filter }) {
      // we set QTable to "loading" state
      this.loading = true

      // we do the server data fetch, based on pagination and filter received
      // (using Axios here, but can be anything; parameters vary based on backend implementation)
      this.$axios
        .get(`/landix/user/`, { params: {
          limit: pagination.rowsPerPage,
          offset: (pagination.page - 1) * pagination.rowsPerPage,
          name__icontains: filter ? filter.name : undefined,
          ldap_uid: filter ? filter.ldapUid : undefined,
          ordering: pagination.sortBy ? (pagination.descending ? '-' : '') + pagination.sortBy : undefined,
          active: filter ? filter.active : undefined
        } })
        .then(({ data }) => {
          // updating pagination to reflect in the UI
          this.serverPagination = pagination

          // we also set (or update) rowsNumber
          this.serverPagination.rowsNumber = data.count

          // then we update the rows with the fetched ones
          this.serverData = data.results

          // finally we tell QTable to exit the "loading" state
          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.error(error)
          // we tell QTable to exit the "loading" state
          this.loading = false
        })
    },

    filterTable () {
      this.filter = {
        name: this.filterName,
        ldapUid: this.filterLdapUid,
        active: this.filterActive
      }
      this.request({
        pagination: this.serverPagination,
        filter: this.filter
      })
    }
  }
}
</script>

<style>
</style>
