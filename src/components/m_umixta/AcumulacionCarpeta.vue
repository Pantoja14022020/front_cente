<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />

    <UmixtaNavDrawer /> 

    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular">Acumulación de carpeta</v-toolbar-title>
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
        <v-flex xs12 sm6 md3>
          <v-text-field
            class="font-weight-regular"
            v-model="nuc"
            disabled
            prepend-icon="folder"
            filled
          />
        </v-flex>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="mx-2 pt-2" slot="activator" v-on="on" @click="cerrarcarpeta" fab dark small color="primary">
              <v-icon class="mt-1" dark>close</v-icon>
            </v-btn>
          </template>
          <span>Cerrar carpeta</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="mx-2 pt-2" slot="activator" v-on="on" @click="agregar" fab dark small color="success">
              <v-icon class="mt-1" dark>add</v-icon>
            </v-btn>
          </template>
          <span>Agregar registro</span>
        </v-tooltip>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="oficios"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.uUsuario }}</td>
          <td>{{ props.item.uModulo }}</td>
          <td>{{ props.item.fechaSys.substring(8, 10) + " de " + obtenermes(props.item.fechaSys.substring(5, 7) - 1) + " del " + props.item.fechaSys.substring(0, 4) }}</td>
          <td>{{ props.item.nucFusion }}</td>
        </template>
        <template slot="no-data">
          <v-btn color="primary">Resetear</v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="modalAdd" max-width="1000px" hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registrar acumulación.</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
              <v-btn v-if="continuar" @click="guardar()" color="success">Guardar</v-btn>
              <v-btn icon @click="modalAdd=false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-flex mx-5>
            <v-card-text>
              <v-form>
                <v-container grid-list-md>
                  <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12>
                      <v-text-field
                        name="NUC de carpeta a la que se acumulara"
                        label="*NUC de carpeta a la que se acumulara:"
                        v-model='nucbusqueda'
                        :append-outer-icon="message ? 'search' : 'search'"
                        @click:append-outer="buscarnuc()"
                        v-validate="'required'"
                        :error-messages="errors.collect('NUC de carpeta a la que se acumulara')"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
          </v-flex>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios'
  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas'
  import VeeValidate from 'vee-validate'
  import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
  import { debug } from 'util'
  import moment from 'moment'
  import 'moment/locale/es'
  import alertify from 'alertifyjs'
  import { VueEditor } from "vue2-editor"
  import n401 from './401.vue'
  import n403 from './403.vue'
  import { error } from 'util'
  import UmixtaNavDrawer from './umixtaNavDrawer.vue'

  export default {
    components: {
      "vue2-editor": VueEditor,
      n401,
      n403,
      UmixtaNavDrawer
    },
    data: () => ({
      alert: false,
      dialog: false,
      rahid: '',
      rAtencionId: '',
      rHechoId: '',
      agenciaid: '',
      nuc: '',
      showpage: true,
      e401: false,
      e403: false,
      //-------Logos-----------------------------------------/
      logo1: '',
      logo2: '',
      //*************** */
      texto: '',
      oficios: [],
      fechas: '',
      distritoid: '',
      idrecho : '',
      nucf: '',
      nucbusqueda: '',
      message: 'Hey',
      continuar: false,
      headers: [
        { text: 'Emitida por', value: 'usuario', sortable: true  },
        { text: 'Módulo', value: 'modulo', sortable: true  },
        { text: 'Fecha de generación', value: 'fechasys' },
        { text: 'Nuc de acumulación', value: 'nucFusion' },
      ],
      customToolbar: [
        [{ 'header': [ 1, 2, 3, 4, 5, 6, false ] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['align',{ 'align': 'center'}, { 'align': 'right' }, { 'align': 'justify' }  ],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }  ],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'color': [] }, { 'background': [] }],
      ],
      search: '',
      rowsPerPageItems: [ 10, 20, 30, 40, 50 ],
      pagination: {
        rowsPerPage: 20
      },
      modalAdd: false,
      modaldocumento: false,
      aux: false,
      rac: '',
      //-----CLAIM------------------------------------------
      u_iddistrito: '',
      u_distrito: '',
      u_dirSubPro: '',
      u_idagencia: '',
      u_agencia: '',
      u_idmoduloservicio: '',
      u_modulo: '',
      u_idusuario: '',
      u_nombre: '',
      u_clave: '',
      u_rol: '',
      u_puesto: '',
      u_subproc: ''
    }),
    created () {
      let me = this
      me.rHechoId =  me.$store.state.rhechoid
      me.rAtencionId = me.$store.state.ratencionid
      me.nuc = me.$store.state.nuc
      if (me.rHechoId == null) {
        me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta, por favor ingrese al menu Carpeta -> Listar carpeta y elija la carpeta. En este momento sera redireccionado al menu correspondiente.',
        function () {
          me.$router.push('./umixta-carpetas')
        })
      } else {
        me.$notify('Carpeta abierta correctamente', 'success')
        me.u_iddistrito = me.$store.state.usuario.iddistrito
        me.u_distrito = me.$store.state.usuario.distrito
        me.u_dirSubPro = me.$store.state.usuario.dirSubProc
        me.u_idagencia = me.$store.state.usuario.idagencia
        me.u_agencia = me.$store.state.usuario.agencia
        me.u_idmoduloservicio = me.$store.state.usuario.idmoduloservicio
        me.u_modulo = me.$store.state.usuario.modulo
        me.u_idusuario = me.$store.state.usuario.idusuario
        me.u_nombre = me.$store.state.usuario.usuario
        me.u_clave = me.$store.state.usuario.clave
        me.u_rol = me.$store.state.usuario.rol
        me.u_puesto = me.$store.state.usuario.puesto
        me.u_subproc = me.$store.state.usuario.subProc
        me.listarLogo()
        me.listar()
        me.listarrHecho()
      }
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
    computed: {

    },
    watch: {

    },
    methods: {
      listarLogo () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion= {headers : header}
        this.$conf.get('api/ConfGlobals/Listar').then(function(response) {
          me.logo1 = response.data.logo1
          me.logo2 = response.data.logo2
        }).catch(err => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", 'error')
          } else if (err.response.status == 401) {
            me.$notify("Por favor inicie sesión para poder navegar en la aplicación", 'error')
            me.e401 = true,
            me.showpage = false
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta página", 'error')
            me.e403 = true
            me.showpage = false
          } else if (err.response.status == 404) {
            me.$notify("El recurso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros', 'error')
          }
        })
      },
      cerrarcarpeta () {
        this.$store.state.rhechoid = null
        this.$store.state.nuc = null
        this.$router.push('./umixta-carpetas')
      },
      listarrHecho () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        this.$cat.get('api/RHechoes/ListarPorId/' + me.rHechoId, configuracion).then(function(response) {
          me.agenciaid = response.data.agenciaid
          me.idNuc = response.data.nucId
        }).catch(err => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", 'error')
          } else if (err.response.status == 401) {
            me.$notify("Por favor inicie sesión para poder navegar en la aplicación", 'error')
            me.e401 = true,
            me.showpage = false
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta página", 'error')
            me.e403 = true
            me.showpage = false
          } else if (err.response.status == 404) {
            me.$notify("El recurso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros', 'error')
          }
        })
      },
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
      buscarnuc(){
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header}
        this.$cat.get('api/Nucs/BuscarExistenciaNuc/' + me.nucbusqueda, configuracion).then(function(response) {
          me.nucf = response.data
          me.idNucBuscado = response.data.idNuc
          me.continuar = true
          me.listarinfocomple()
        }).catch(err => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", 'error')
          } else if (err.response.status == 401) {
            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
            me.e401 = true,
            me.showpage = false
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta página", 'error')
            me.e403 = true
            me.showpage = false
          } else if (err.response.status == 404) {
              me.$notify("El NUC no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros', 'error')
          }
        })
      },
      listarinfocomple () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        this.$cat.get('api/RHechoes/ListarporIdNUC/' + me.nucf.idNuc,configuracion).then(function(response) {
          me.distritoid = response.data.distritoId
          me.idrecho = response.data.idRHecho
          me.moduloidfusion = response.data.idModuloFusion
          me.agenciaidfusion = response.data.idAgenciaFusion
          me.$notify('El nuc ' + me.nucbusqueda + " ha sido encontrado.", 'success')
          if (me.distritoid != me.u_iddistrito) {
            me.$notify("La carpeta no se encuentra en el mismo distrito", 'error')
            me.continuar = false
          }
        }).catch(err => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", 'error')
          } else if (err.response.status == 401) {
            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
            me.e401 = true,
            me.showpage = false
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta página", 'error')
            me.e403= true
            me.showpage = false
          } else if (err.response.status == 404) {
            me.$notify("El recurso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros','error')
          }
        })
      },
      agregar () {
        this.limpiar()
        this.modalAdd = true
      },
      close () {
        this.dialog = false
        this.limpiar()
      },
      limpiar () {
        this.nucf = false
        this.idrecho = ''
        this.distritoid = ''
        this.continuar = false
      },
      listar () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        this.$cat.get('api/AcumulacionCarpetas/Listar/' + me.rHechoId, configuracion).then(function(response) {
          me.oficios = response.data
        }).catch(err => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", 'error')
          } else if (err.response.status == 401) {
            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
            me.e401 = true,
            me.showpage = false
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta página", 'error')
            me.e403 = true
            me.showpage = false
          } else if (err.response.status == 404) {
            me.$notify("El recurso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros', 'error')
          }
        })
      },
      guardar () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        me.$confirm('Esperando confirmación...', 'Se enviará la carpeta ' + me.nuc + ' a la misma ubicación que la Nuc ' + me.nucbusqueda + '. Se renombrará esta última como: ' + me.nucbusqueda + '-Acum' + me.nuc + '. Está seguro(a) que desea proceder?',
        function() {
          this.$cat.post('api/AcumulacionCarpetas/Crear', {
            'RHechoId': me.rHechoId,
            'NUCFusion': me.nucf.nucg,
            'RhechoIdFusion': me.idrecho,
            'USubproc': me.u_dirSubPro,
            'UAgencia': me.u_agencia,
            'UUsuario': me.u_nombre,
            'UPuesto': me.u_puesto,
            'UModulo': me.u_modulo,
            'UDistrito': me.u_distrito
          }, configuracion).then(function(response) {
            me.$notify('Se creó la acumulación satisfactoriamente !!!', 'success')
            this.$cat.put('api/Nucs/ActualizarNucAcum', {
              'idNuc': me.idNucBuscado,
              'NuevoNucAcum': me.nucbusqueda + '-Acum' + me.nuc
            }, configuracion).then(function() {
              me.$notify('Se actualizó el nombre de Nuc de acumulación, correctamente !!!', 'success')
            }).catch(err => {
              if (err.response.status == 400) {
                me.$notify("No es un usuario válido", 'error')
              } else if (err.response.status == 401) {
                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                me.e401 = true,
                me.showpage = false
              } else if (err.response.status == 403) {
                me.$notify("No esta autorizado para ver esta página", 'error')
                me.e403 = true
                me.showpage = false
              } else if (err.response.status == 404) {
                me.$notify("El recurso no ha sido encontrado", 'error')
              } else {
                me.$notify('Error al intentar actualizar el registro!!!', 'error')
              }
            })
            this.$cat.put('api/RHechoes/ActualizarModuloyAgencia',{
              'IdRHecho': me.rHechoId,
              'moduloServicioId': me.moduloidfusion,
              'agenciaId': me.agenciaidfusion
            }, configuracion).then(function(response) {
              me.$notify('Se envió la carpeta a la agencia correspondiente !!!', 'success')
              this.$cat.post('api/Historialcarpeta/Crear', {
                'RHechoId': me.rHechoId,
                'Detalle': "Acumulación de carpeta",
                'Modulo': me.u_modulo,
                'Agencia': me.u_agencia,
                'UDistrito' : me.u_distrito,
                'USubproc': me.u_dirSubPro,
                'UAgencia': me.u_agencia,
                'Usuario': me.u_nombre,
                'UPuesto': me.u_puesto,
                'UModulo': me.u_modulo
              }, configuracion).then(function(response) {
                me.$notify('Se actualizó histórico de la carpeta correctamente !!!', 'success')
              }).catch(err => {
                if (err.response.status == 400) {
                  me.$notify("No es un usuario válido", 'error')
                } else if (err.response.status == 401) {
                  me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                  me.e401 = true,
                  me.showpage = false
                } else if (err.response.status == 403) {
                  me.$notify("No esta autorizado para ver esta página", 'error')
                  me.e403 = true
                  me.showpage = false
                } else if (err.response.status == 404) {
                  me.$notify("El recurso no ha sido encontrado", 'error')
                } else {
                  me.$notify('Error al intentar crear el  registro!!!', 'error')
                }
              })
            }).catch(err => {
              if (err.response.status == 400) {
                me.$notify("No es un usuario válido", 'error')
              } else if (err.response.status == 401) {
                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                me.e401 = true,
                me.showpage = false
              } else if (err.response.status == 403) {
                me.$notify("No esta autorizado para ver esta página", 'error')
                me.e403 = true
                me.showpage = false
              } else if (err.response.status == 404) {
                me.$notify("El recurso no ha sido encontrado", 'error')
              } else {
                me.$notify('Error al intentar crear el  registro!!!', 'error')
              }
            })
            me.modalAdd = false
            me.listar()
            me.limpiar()
            me.$store.state.rhechoid = ""
            me.$store.state.ratencionid = ""
            me.$store.state.nuc = ""
            me.$router.push('./umixta-carpetas')
          }).catch(err => {
            if (err.response.status == 400) {
              me.$notify("No es un usuario válido", 'error')
            } else if (err.response.status == 401) {
              me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
              me.e401 = true,
              me.showpage = false
            } else if (err.response.status == 403) {
              me.$notify("No esta autorizado para ver esta página", 'error')
              me.e403 = true
              me.showpage = false
            } else if (err.response.status == 404) {
              me.$notify("El recurso no ha sido encontrado", 'error')
            } else {
              me.$notify('Error al intentar crear el  registro!!!','error')
            }
          })
        },
        function() {
          alertify.warning('Verificar la información')
        }).set('labels', { ok: 'Guardar', cancel: 'Cancelar' })
      },
    }
  }
</script>

<style>
.espaciado{
  padding: 30px !important
}
</style>
