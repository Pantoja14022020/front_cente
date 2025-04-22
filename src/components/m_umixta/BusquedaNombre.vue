<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular">Busqueda por Nombre.</v-toolbar-title>
        <v-divider class="mx-2" inset vertical />
        <v-spacer />
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line hide-details
        />
        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="mx-2" slot="activator" v-on="on" @click="dialogo = true" color="success">
              Opciones de busqueda
            </v-btn>
          </template>
          <span>Opciones de busqueda</span>
        </v-tooltip>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="carpetas"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.nuc }}</td>
          <td>{{ props.item.persona }}</td>
          <td>{{ props.item.agencia }}</td>
          <td>{{ props.item.modulo }}</td>
        </template>
        <template slot="no-data" />
      </v-data-table>
      <v-dialog v-model="dialogo" max-width="500px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar  size="30">
              <v-icon class="grey lighten-2">search</v-icon>
            </v-avatar>
            <v-toolbar-title class="subheading">Opciones de busqueda</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-autocomplete
                      name="agencia"
                      :items="agencias"
                      v-model="agencia"
                      label="Agencia:"
                      v-if="esDirector || esAdministrador"
                      @change="listarmodulos"
                      clearable
                      :error-messages="errors.collect('agencia')"
                    />
                    <v-autocomplete
                      name="modulo"
                      :items="modulos"
                      v-model="modulo"
                      label="Modulo:"
                      clearable
                      v-if="esDirector || esAdministrador || esCoordinador"
                      :error-messages="errors.collect('modulo')"
                    />
                    <v-text-field
                      name="nuc"
                      label="NUC:"
                      v-model="nuc"
                      :error-messages="errors.collect('nuc')"
                    />
                    <v-text-field
                      name="nombre"
                      label="Nombre:"
                      v-model="nombre"
                      :error-messages="errors.collect('nombre')"
                    />
                    <v-text-field
                      name="apellido paterno"
                      label="Apellido paterno:"
                      v-model="apellidop"
                      :error-messages="errors.collect('apellido paterno')"
                    />
                    <v-text-field
                      name="apellido materno"
                      label="Apellido materno:"
                      v-model="apellidom"
                      :error-messages="errors.collect('apellido materno')"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-spacer />
                <v-btn @click.native="dialogo = false">Cerrar</v-btn>
                <v-btn @click.native="listarconfiltro" class="success">Buscar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios'
  import VeeValidate from 'vee-validate'
  import n401 from './401.vue'
  import n403 from './403.vue'
  import { error } from 'util'

  export default {
    data () {
      return {
        components: {
          n401,
          n403
        },
        showpage: true,
        e401: false,
        e403: false,
        //-----CLAIM------------------------------------------
        u_iddistrito: this.$store.state.usuario.iddistrito,
        u_distrito: this.$store.state.usuario.distrito,
        u_dirSubPro: this.$store.state.usuario.dirSubProc,
        u_idagencia: this.$store.state.usuario.idagencia,
        u_agencia: this.$store.state.usuario.agencia,
        u_idmoduloservicio: this.$store.state.usuario.idmoduloservicio,
        u_modulo: this.$store.state.usuario.modulo,
        u_idusuario: this.$store.state.usuario.idusuario,
        u_nombre: this.$store.state.usuario.usuario,
        u_clave: this.$store.state.usuario.clave,
        u_rol: this.$store.state.usuario.rol,
        u_puesto: this.$store.state.usuario.puesto,
        u_subproc: this.$store.state.usuario.subProc,
        u_iddsp: this.$store.state.usuario.iddsp,
        dialog: false,
        dialogo: false,
        agencias: [],
        agencia: '',
        modulos: [],
        modulo: '',
        agenciaux: '',
        nombre: '',
        apellidop: '',
        apellidom: '',
        nuc: '',
        headers: [
          { text: 'NUC', value: 'nuc', sortable: false },
          { text: 'Persona', value: 'persona', sortable: false },
          { text: 'Agencia', value: 'agencia' },
          { text: 'Modulo', value: 'modulo' },
        ],
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
          rowsPerPage: 20
        },
        editedIndex: -1,
        carpetas: [],
        rHechoId: '',
      }
    },
    computed: {
      esAMPOAMP () {
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'AMPO-AMP'
      },
      esDirector () {
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'Director'
      },
      esCoordinador () {
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'Coordinador'
      },
      esAdministrador () {
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'Administrador'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    created () {
      this.$store.state.nuc = null
      this.$store.state.ratencionid = null
      this.$store.state.rhechoid = null
      if (this.esCoordinador) this.listarmodulos2()
      this.listaragencias()
      axios.interceptors.request.use((config) => {
        // Do something before request is sent
        this.$store.commit('LOADER', true)
        return config
      }, (error) => {
        // Do something with request error
        this.$store.commit('LOADER', false)
        return Promise.reject(error)
      })
      // Add a response interceptor
      axios.interceptors.response.use((response) => {
        this.$store.commit('LOADER', false)
        // Do something with response data
        return response
      }, (error) => {
        // Do something with request error
        this.$store.commit('LOADER', false)
        return Promise.reject(error)
      })
    },
    methods: {
      obtenermes: function (mes) {
        if (mes == 0) return "Enero"
        if (mes == 1) return "Febrero"
        if (mes == 2) return "Marzo"
        if (mes == 3) return "Abril"
        if (mes == 4) return "Mayo"
        if (mes == 5) return "Junio"
        if (mes == 6) return "Julio"
        if (mes == 7) return "Agosto"
        if (mes == 8) return "Septiembre"
        if (mes == 9) return "Octubre"
        if (mes == 10) return "Noviembre"
        if (mes == 11) return "Diciembre"
      },
      listarconfiltro () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        me.$validator.validate().then(result => {
          if (result) {
            var agenciaid, moduloid, indicadoragencia, indicadormodulo, nombre, apellidop, apellidom, rol, nuc
            if (me.agencia == "" || me.agencia == undefined) {
              indicadoragencia = false,
              agenciaid = '00000000-0000-0000-0000-000000000000'
            } else {
              indicadoragencia = true
              agenciaid = me.agencia
            }
            if (me.modulo == "" || me.modulo == undefined) {
              indicadormodulo = false,
              moduloid = '00000000-0000-0000-0000-000000000000'
            } else {
              indicadormodulo = true
              moduloid = me.modulo
            }
            if (me.esDirector || me.esAdministrador) rol = "AD"
            else if (me.esCoordinador) rol = "C"
            if (me.nombre == "" || me.nombre == undefined) {
              nombre = 'ZKR'
            } else nombre = me.nombre
            if (me.apellidop == "" || me.apellidop == undefined) {
              apellidop = 'ZKR'
            }
            else apellidop = me.apellidop
            if (me.apellidom == "" || me.apellidom == undefined) {
              apellidom = 'ZKR'
            } else apellidom = me.apellidom
            if (me.nuc == "" || me.nuc == undefined) {
              nuc = 'ZKR'
            } else nuc = me.nuc
            this.$cat.get('api/RAPs/BusquedaporNombre/' + indicadoragencia + "/" + agenciaid + "/" + indicadormodulo + "/" + moduloid + "/" + me.u_iddsp + "/" + me.u_idagencia + "/" + rol + "/" + nombre + "/" + apellidop + "/" + apellidom + "/" +  nuc, configuracion).then(function(response) {
              me.dialogo = false
              me.carpetas = response.data
            }).catch(err => {
              if (err.response.status == 400) {
                me.$notify("No es un usuario válido", 'error')
              } else if (err.response.status == 401) {
                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                me.e401 = true,
                me.showpage = false
              } else if (err.response.status == 403) {
                me.$notify("No esta autorizado para ver esta pagina", 'error')
                me.e403 = true
                me.showpage = false
              } else if (err.response.status == 404) {
                me.$notify("El recuso no ha sido encontrado", 'error')
              } else {
                me.$notify('Error al intentar listar los registros!!!','error')
              }
            })
          }
        })
      },
      close () {
        this.dialog = false
        this.limpiar()
      },
      limpiar () {
        this.rHechoId = ""
        this.editedIndex = -1
      },
      listaragencias () {
        let me = this;
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        var agenciasarray
        me.$conf.get('api/Agencias/ListarporDSP/' + me.u_iddsp, configuracion).then(function(response) {
          agenciasarray = response.data
          agenciasarray.map(function(x) {
            me.agencias.push({ text: x.nombre, value: x.idAgencia })
          })
        }).catch(err => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", 'error')
          } else if (err.response.status == 401) {
            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
            me.e401 = true,
            me.showpage = false
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta pagina", 'error')
            me.e403 = true
            me.showpage = false
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros!!!', 'error')
          }
        })
      },
      listarmodulos () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        var moduloarray
        me.modulos = []
        me.modulo = ""
        if (me.agencia != undefined) {
          me.$conf.get('api/ModuloServicios/ListarPorAgencia/' + me.agencia, configuracion).then(function(response) {
            moduloarray = response.data
            moduloarray.map(function(x) {
              me.modulos.push({ text: x.nombre, value: x.idModuloServicio })
            })
          }).catch(err => {
            if (err.response.status == 400) {
              me.$notify("No es un usuario válido", 'error')
            } else if (err.response.status == 401) {
              me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
              me.e401 = true,
              me.showpage = false
            } else if (err.response.status == 403) {
              me.$notify("No esta autorizado para ver esta pagina", 'error')
              me.e403 = true
              me.showpage = false
            } else if (err.response.status == 404) {
              me.$notify("El recuso no ha sido encontrado", 'error')
            } else {
              me.$notify('Error al intentar listar los registros!!!', 'error')
            }
          })
        }
      },
      listarmodulos2 () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        var moduloarray
        me.modulos = []
        me.modulo = ""
        if (me.agencia != undefined) {
          me.$conf.get('api/ModuloServicios/ListarPorAgencia/' + me.u_idagencia, configuracion).then(function(response) {
            moduloarray = response.data
            moduloarray.map(function(x) {
              me.modulos.push({ text: x.nombre, value: x.idModuloServicio })
            })
          }).catch(err => {
            if (err.response.status == 400) {
              me.$notify("No es un usuario válido", 'error')
            } else if (err.response.status == 401) {
              me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
              me.e401 = true,
              me.showpage = false
            } else if (err.response.status == 403) {
              me.$notify("No esta autorizado para ver esta pagina", 'error')
              me.e403 = true
              me.showpage = false
            } else if (err.response.status == 404) {
              me.$notify("El recuso no ha sido encontrado", 'error')
            } else {
              me.$notify('Error al intentar listar los registros!!!', 'error')
            }
          })
        }
      },
    }
  }
</script>
