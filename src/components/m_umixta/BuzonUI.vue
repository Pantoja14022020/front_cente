<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />

    <UmixtaNavDrawer />

    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular">Buzón de remisión UI</v-toolbar-title>
        <v-divider class="mx-2" inset vertical />
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              class="mx-2 pt-2"
              slot="activator"
              v-on="on"
              @click="listarTodo()"
              fab
              dark
              small
              color="primary"
            >
              <v-icon dark class="mt-1">visibility</v-icon>
            </v-btn>
          </template>
          <span>Ver historial completo</span>
        </v-tooltip>
        <v-spacer />
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        />
        <v-spacer />

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="mx-2" slot="activator" v-on="on" @click="listar()" color="success">
              Recargar el buzón
            </v-btn>
          </template>
          <span>Recargar el buzón</span>
        </v-tooltip>

        
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="colaboraciones"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.usuario }}</td>
          <td>{{ props.item.uSubproc }}</td>
          <td>{{ props.item.uAgencia }}</td>
          <td>{{ props.item.uModulo }}</td>
          <td>{{ props.item.nuc }}</td>
          <td>{{ props.item.fechasys.substring(8, 10) + " de " + obtenermes(props.item.fechasys.substring(5, 7) - 1) + " del " + props.item.fechasys.substring(0, 4) + ", " + props.item.fechasys.substring(11, 19) }}</td>
          <td>{{ props.item.status }}</td>
          <td class="layout pt-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2 mt-1" v-on="on" @click="verinfo(props.item)">
                  drafts
                </v-icon>
              </template>
              <span>Ver información</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2 mt-1" v-on="on" @click="crearcaratula(props.item)">
                  chrome_reader_mode
                </v-icon>
              </template>
              <span>Imprimir caratula del nuc</span>
            </v-tooltip>
            <div v-if="props.item.status == 'Enviada'  "  >
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon class="mr-2 mt-1" v-on="on" @click="actdialogaceptar(props.item)">
                    check
                  </v-icon>
                </template>
                <span>Asignar a modulo</span>
              </v-tooltip>
            </div>
            <div v-if="props.item.status == 'Enviada'" >
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon class="mr-2 mt-1" v-on="on" @click="actdialorechazo(props.item)">
                    close
                  </v-icon>
                </template>
                <span>Rechazar</span>
              </v-tooltip>
            </div>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="dialogoinfo" max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">info</v-icon>
            </v-avatar>
            <v-toolbar-title class="subheading">Información completa</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" >
              <v-container grid-list-md text-xs-center>
                <v-layout wrap>
                  <v-flex class="espaciado" xs12 sm12 md6 lg6>
                    <v-list two-line>
                      <v-list-tile>
                        <v-list-tile-action>
                          <v-icon color="success">location_city</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            <p class="body-2 font-weight-bold">
                              <a>Agencia que envia:</a>
                            </p>
                          </v-list-tile-title>
                          <v-list-tile-sub-title>
                            <p color="accent" class="caption font-weight-regular">
                              <a>{{ datos.uAgencia }}</a>
                            </p>
                          </v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-action>
                          <v-icon color="success">calendar_today</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            <p class="body-2 font-weight-bold">
                              <a>Fecha de envio:</a>
                            </p>
                          </v-list-tile-title>
                          <v-list-tile-sub-title>
                            <p color="accent" class="caption font-weight-regular">
                              <a>{{ fechaenvio }}</a>
                            </p>
                          </v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-action>
                          <v-icon color="success">accessibility</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            <p class="body-2 font-weight-bold">
                              <a>Denunciante:</a>
                            </p>
                          </v-list-tile-title>
                          <v-list-tile-sub-title>
                            <p color="accent" class="caption font-weight-regular">
                              <a>{{ nombrep }}</a>
                            </p>
                          </v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                  <v-flex class="espaciado" xs12 sm12 md6 lg6>
                    <v-list two-line>
                      <v-list-tile>
                        <v-list-tile-action>
                          <v-icon color="success">contact_mail</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            <p class="body-2 font-weight-bold">
                              <a>Modulo que envia:</a>
                            </p>
                          </v-list-tile-title>
                          <v-list-tile-sub-title>
                            <p color="accent" class="caption font-weight-regular">
                              <a>{{ datos.uModulo }}</a>
                            </p>
                          </v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-action>
                          <v-icon color="success">list_alt</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            <p class="body-2 font-weight-bold">
                              <a>Nuc:</a>
                            </p>
                          </v-list-tile-title>
                          <v-list-tile-sub-title>
                            <p color="accent" class="caption font-weight-regular">
                              <a>{{ nuc }}</a></p>  </v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-action>
                          <v-icon color="success">calendar_today</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            <p class="body-2 font-weight-bold">
                              <a>Fecha de elevación:</a>
                            </p>
                          </v-list-tile-title>
                          <v-list-tile-sub-title>
                            <p color="accent" class="caption font-weight-regular">
                              <a>{{ fechaelevacion }}</a>
                            </p>
                          </v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                  <v-flex class="espaciado" xs12 sm12 md12 lg12>
                    <v-list two-line>
                      <v-list-tile>
                        <v-list-tile-action>
                          <v-icon color="success">person_add_disabled</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            <p class="body-2 font-weight-bold">
                              <a>Delito(s):</a>
                            </p>
                          </v-list-tile-title>
                          <v-list-tile-sub-title>
                            <p color="accent" class="caption font-weight-regular">
                              <a>{{ delitosf }}</a>
                            </p>
                          </v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-action>
                          <v-icon color="success">sort</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                              <p class="body-2 font-weight-bold">
                                <a>Reseña breve:</a>
                              </p>
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                              <p color="accent" class="caption font-weight-regular">
                                <span v-html="rbreve"></span>
                                <a>{{ rbreve }}</a>
                              </p>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-spacer />
                <v-btn @click.native="dialogoinfo=false">Cerrar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogoaceptar" max-width="700px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar  size="30">
              <v-icon class="grey lighten-2">info</v-icon>
            </v-avatar>
            <v-toolbar-title class="subheading">Aceptar solicitud</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" data-vv-scope="Aceptar" >
              <v-container grid-list-md text-xs-center>
                <v-layout wrap>
                  <v-flex class="espaciado" xs12 sm12 md12 lg12>
                    <v-autocomplete
                      name="Agencia"
                      :items="agenciasCat"
                      v-model="agencia"
                      return-object
                      v-validate="'required'"
                      data-vv-scope="Aceptar"
                      @change="listarmodulos()"
                      label="*Agencia:"
                      :error-messages="errors.collect('Aceptar.modulo')"
                      v-if="usuarioCatPrimario"
                    />
                    <v-autocomplete
                      name="modulo"
                      :items="modulos"
                      v-model="modulo"
                      return-object
                      v-validate="'required'"
                      data-vv-scope="Aceptar"
                      label="*Modulo:"
                      :error-messages="errors.collect('Aceptar.modulo')"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-spacer />
                <v-btn @click.native="limpiarFormularioAceptacion">Cerrar</v-btn>
                <v-btn color="success" @click.native="aceptarsoli">Guardar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogorechazar" max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">info</v-icon>
            </v-avatar>
            <v-toolbar-title class="subheading">Rechazar solicitud solicitud</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" data-vv-scope="Rechazar">
              <v-container grid-list-md text-xs-center>
                <v-layout wrap>
                  <v-flex class="espaciado" xs12 sm12 md12 lg12>
                    <v-card elevation="0">
                      <v-card-title>
                        <h3>*Razón de rechazo</h3>
                      </v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-form>
                          <vue-editor
                            name="texto"
                            v-validate="'required'"
                            v-model="rechazo"
                            outline
                            height=350px;
                            data-vv-scope="Rechazar"
                            style="max-height: 310px; overflow-y: scroll"
                            :editorToolbar="customToolbar"
                            :error-messages="errors.collect('Rechazar.texto')"
                          />
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-spacer />
                <v-btn @click.native="dialogorechazar=false">Cerrar</v-btn>
                <v-btn color="success" @click.native="rechazarsoli">Guardar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="modal_CaratulaNUC" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Documento.</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
              <v-btn color=success text @click.native="imprimirCaratulaNUC()">IMPRIMIR</v-btn>
              <v-btn icon @click="modal_CaratulaNUC = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <iframe id="iframepdf1" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no" />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios'
  import VeeValidate from 'vee-validate'
  import { WebCam } from "vue-web-cam"
  import { VueEditor } from "vue2-editor"
  import { error } from 'util'
  import moment from 'moment'
  import 'moment/locale/es'
  import n401 from './401.vue'
  import n403 from './403.vue'
  import UmixtaNavDrawer from './umixtaNavDrawer.vue'

  var assert, curp, persona
  assert = require('assert')
  curp = require('curp.js')

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
      rAtencionId: '',
      rHechoId: '',
      nuc: '',
      showpage: true,
      e401: false,
      e403: false,
      //*************** */
      colaboraciones: [],
      dialogo: false,
      modulos: [],
      agenciasCat: [],
      modulo: '',
      agencia: '',
      datos: [],
      dialogoinfo: false,
      dialogoaceptar: false,
      dialogorechazar: false,
      idcolaboracion: '',
      rechazo: '',
      agenciaid: '',
      nuc: '',
      idratencion: '',
      nombrep: '',
      fechaelevacion: '',
      idRhecho: '',
      delitos: [],
      delito: "",
      delitosf: "",
      rbreve: "",
      modal_CaratulaNUC: false,
      distritoinicial: '',
      fecha: '',
      registradopor: '',
      puestoquienregistro: '',
      modulodondefueatendido: '',
      dirsubprocuinicial: '',
      agenciainicial: '',
      direccionAgencia: '',
      telefonosAgencia: '',
      rac: '',
      IdRemisionUI: '',
      agenciaenvio: '',
      moduloenvio: '',
      fechaenvio: '',
      moduloenvian: '',
      agenciaenvian: '',
      headers: [
        { text: 'Emitida por', value: 'usuario', sortable: true },
        { text: 'Subprocuraduria', value: 'uSubproc', sortable: true },
        { text: 'Agencia', value: 'uAgencia', sortable: true },
        { text: 'Módulo', value: 'modulo', sortable: true },
        { text: 'Nuc', value: 'nuc', sortable: true },
        { text: 'Fecha de emisión',value: 'fechasys' },
        { text: 'Status',value: 'status' },
        { text: 'Opciones', value: 'opciones', sortable: false },
      ],
      customToolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['align',{ 'align': 'center'}, { 'align': 'right' }, { 'align': 'justify' }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'color': [] }, { 'background': [] }],
      ],
      search: '',
      rowsPerPageItems: [10, 20, 30, 40, 50],
      pagination: {
        rowsPerPage: 20
      },
      editedIndex: 0,
      modalAdd: false,
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
      u_subproc: '',
      u_claveMS: '',
      usuarioCatPrimario: false,      

      //------------------Distrito origen
      distritoOrigenId:'',
    }),
    created () {
      let me = this
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
      me.u_claveMS = me.$store.state.usuario.claveMS
      me.listar()
      if (me.u_claveMS == 'CAT-PRIMARIO') {
        me.ListarAgenciasCAT()        
      } else {
        me.listarmodulos()        
      }
      me.listarLogo()      

      axios.interceptors.request.use((config) => {
        // Do something before request is sent
        this.$store.commit('LOADER', true)
        return config
      }, (error) => {
        // Do something with request error
        this.$store.commit('LOADER', false)
        return Promise.reject( error)
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
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva Arma u Objeto' : 'Actulizar Arma u Objeto'
      },
      formIcon () {
        return this.editedIndex === -1 ? 'add' : 'assignment'
      },
    },
    watch: {

    },
    methods: {
      listarLogo () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        this.$conf.get('api/ConfGlobals/Listar', configuracion).then(function(response) {
          me.logo1 = response.data.logo1
          me.logo2 = response.data.logo2
          me.logo3 = response.data.logo3
          me.logo4 = response.data.logo4
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
            me.$notify("El recuso no ha sido encontrado", 'error')
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
      limpiar () {
        this.modulo = ""
        this.rechazo = ""
        this.agenciaid = ""
        this.nuc = ""
        this.idratencion = ""
        this.nombrep = ""
        this.fechaelevacion = ""
        this.idRhecho = ""
        this.delitos = ""
        this.delito = ""
        this.delitosf = ""
        this.rbreve = ""
        this.modal_CaratulaNUC = false
        this.distritoinicial = ""
        this.fecha = ""
        this.registradopor = ""
        this.puestoquienregistro = ""
        this.modulodondefueatendido = ""
        this.dirsubprocuinicial = ""
        this.agenciainicial = ""
        this.direccionAgencia = ""
        this.telefonosAgencia = ""
        this.rac = ""
        this.IdRemisionUI = ""
      },
      verinfo (item ){
        this.datos = item
        this.idRhecho = item.rHechoId
        this.listarrHecho()
        this.fechaenvio = item.fechasys.substring(8, 10) + " de " + this.obtenermes(item.fechasys.substring(5, 7) - 1) + " del " + item.fechasys.substring(0, 4)
        this.dialogoinfo = true
      },
      actdialogaceptar (item) {
        this.idRhecho = item.rHechoId
        this.IdRemisionUI = item.idRemisionUI
        if (this.usuarioCatPrimario) {
          this.agencia = ''          
          this.modulos = []
        } else {
          this.modulo = ''
        }
        this.modu
        this.dialogoaceptar = true
      },
      actdialorechazo (item) {
        this.agenciaenvian = item. uAgencia
        this.moduloenvian = item.uModulo
        this.idRhecho = item.rHechoId
        this.agenciaenvio = item.agenciaQueenvia
        this.moduloenvio = item.moduloqueenvia
        this.IdRemisionUI = item.idRemisionUI
        this.dialogorechazar = true
      },
      listar () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers: header }        

        if (me.u_claveMS == 'CAT-PRIMARIO') {          
          me.usuarioCatPrimario = true 
        }
        
        this.$cat.get('api/RemisionesUI/ListarporModulo/' + me.u_idmoduloservicio + '/Enviada', configuracion).then(function(response) {
          me.colaboraciones = response.data
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
            me.$notify("El recuso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros','error')
          }
        })
      },
      limpiarFormularioAceptacion() {
        let me = this

        me.dialogoaceptar = false      

        if (me.usuarioCatPrimario) {
          me.agencia = ''
          me.modulos = []
        }
      },
      listarTodo () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        this.$cat.get('api/RemisionesUI/ListarporModuloTodo/' + me.u_idmoduloservicio , configuracion).then(function(response) {
          me.colaboraciones = response.data
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
            me.$notify("El recuso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros','error')
          }
        })
      },
      ListarAgenciasCAT() {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers: header }

        me.$conf.get(`api/Agencias/ListarCATAgencia/${me.u_iddistrito}`)
          .then(response => {
            response.data.map(agencia => {
              me.agenciasCat.push({ text: agencia.nombre, value: agencia.idAgencia })
            })               
          })
      },
      listarmodulos () {
        var moduloarray = []
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers: header }
        let agenciaId = ''

        if (me.agencia != '') {          
          agenciaId = me.agencia.value
        } else {
          agenciaId = me.u_idagencia
        }
        
        me.$conf.get(`api/ModuloServicios/ListarPorAgencia/${agenciaId}`, configuracion).then(function(response) {
          moduloarray = response.data
          me.modulos = []
          moduloarray.map(function(x) {
            me.modulos.push({ text: x.nombre, value: x.idModuloServicio, value2: x.agenciaId })
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
            me.$notify("El recuso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros', 'error')
          }
        })
      },
      listarrHecho2 () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        this.$cat.get('api/RHechoes/ListarPorId/' + me.idRhecho, configuracion).then(function(response) {
          me.agenciaid = response.data.agenciaid
          me.nuc = response.data.nuc
          me.idratencion = response.data.rAtencionId
          me.fechaelevacion = response.data.fechaElevaNuc.substring(8, 10) + " de " + me.obtenermes(response.data.fechaElevaNuc.substring(5, 7) - 1) + " del " + response.data.fechaElevaNuc.substring(0, 4)
          me.rbreve = response.data.rBreve
          me.distritoinicial = response.data.distritoInicial
          me.registradopor= response.data.u_Nombre
          me.puestoquienregistro = response.data.u_Puesto
          me.modulodondefueatendido = response.data.u_Modulo
          me.dirsubprocuinicial = response.data.dirSubProcuInicial
          me.agenciainicial = response.data.agenciaInicial
          me.informacionagencia2()
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
            me.$notify("El recuso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros', 'error')
          }
        })
      },
      informacionagencia2 () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        me.$conf.get('api/Agencias/Listarporid/' + me.agenciaid, configuracion).then(function(response) {
          me.direccionAgencia = response.data.direccion
          me.telefonosAgencia = response.data.telefono
          me.informacionadicional2()
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
            me.$notify("El recuso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros', 'error')
          }
        })
      },
      informacionadicional2 () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        this.$cat.get('api/RAPs/ListarRatencionPinicio/' + me.idratencion, configuracion).then(function(response) {
          me.nombrep = response.data.nombre + " " + response.data.apellidoPaterno + " " + response.data.apellidoMaterno
          me.rac = response.data.rac
          me.fecha = me.generarfecha()
          me.imprimirCaratulaNUC()
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
            me.$notify("El recuso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros', 'error')
          }
        })
      },
      listarrHecho () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        this.$cat.get('api/RHechoes/ListarPorId/' + me.idRhecho, configuracion).then(function(response) {
          me.agenciaid = response.data.agenciaid
          me.nuc = response.data.nuc
          me.idratencion = response.data.rAtencionId
          me.fechaelevacion = response.data.fechaElevaNuc.substring(8, 10) + " de " + me.obtenermes(response.data.fechaElevaNuc.substring(5, 7) - 1) + " del " + response.data.fechaElevaNuc.substring(0, 4)
          me.rbreve = response.data.rBreve
          me.distritoinicial = response.data.distritoInicial
          me.informacionagencia()
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
            me.$notify("El recuso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros', 'error')
          }
        })
      },
      informacionagencia () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        me.$conf.get('api/Agencias/Listarporid/' + me.agenciaid, configuracion).then(function(response) {
          me.agenciainfo = response.data
          me.informacionadicional()
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
            me.$notify("El recuso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros','error')
          }
        })
      },
      informacionadicional () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        this.$cat.get('api/RAPs/ListarRatencionPinicio/' + me.idratencion, configuracion).then(function(response) {
          me.nombrep = response.data.nombre + " " + response.data.apellidoPaterno + " " + response.data.apellidoMaterno
          me.listardelitos()
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
            me.$notify("El recuso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros', 'error')
          }
        })
      },
      listardelitos () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        var delitosArray = []
        var contador = 0
        me.delitos = []
        this.$cat.get('api/RDHs/ListarPorHecho/' + me.idRhecho,configuracion).then(function(response) {
          delitosArray = response.data
          delitosArray.map(function(x) {
            me.delitos.push({ text: x.nombreDelito, value: x.resultadoDelito })
          })
          me.delitosf = ""
          for (var a = 0; a < me.delitos.length; a++) {
            me.delitosf += me.delitos[a].text
            if (me.delitos.length != a + 1)
              me.delitosf += ", "
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
            me.e403 = true
            me.showpage = false
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros', 'error')
          }
        })
      },
      obtenermes: function(mes) {
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
      aceptarsoli () {
        let me = this
        let header ={ "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }

        var descripcionRegTabI = "Registro de asignación de carpeta al modulo " + me.modulo.text;
        var rhechotem = me.idRhecho;

        me.$validator.validateAll("Aceptar").then(result => {
          if (result) {
            this.$cat.put('api/RHechoes/ActualizarModuloyAgencia', {
              'IdRHecho': me.idRhecho,
              'moduloServicioId': me.modulo.value,
              'agenciaId': me.modulo.value2
            }, configuracion).then(function(response) {
              me.$notify('¡La información se guardo correctamente!', 'success')
              var idremision = me.IdRemisionUI
              this.$cat.post('api/Historialcarpeta/Crear', {
                'RHechoId': me.idRhecho,
                'Detalle': "Asignación a modulo",
                'Modulo': me.modulo.text,
                'Agencia': me.u_agencia,
                'UDistrito': me.u_distrito,
                'USubproc': me.u_dirSubPro,
                'UAgencia': me.u_agencia,
                'Usuario': me.u_nombre,
                'UPuesto': me.u_puesto,
                'UModulo': me.u_modulo
              }, configuracion).then(function(response) {
                me.$notify('¡La información se guardo correctamente!', 'success');
                me.crearRegistroTableroI(descripcionRegTabI,rhechotem);
                this.$cat.put('api/RemisionesUI/Actualizar', {
                  'IdRemisionUI': idremision,
                  'Status': "Asignado"
                },configuracion).then(function(response) {
                  me.$notify('¡La información se guardo correctamente!', 'success');
                  me.listar()
                  me.limpiar()
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
                    me.$notify("El recuso no ha sido encontrado", 'error')
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
                  me.$notify("El recuso no ha sido encontrado", 'error')
                } else {
                  me.$notify('Error al intentar crear el  registro!!!', 'error')
                }
              })
              me.dialogoaceptar = false
              me.listar()
              me.limpiar()
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
                me.$notify("El recuso no ha sido encontrado", 'error')
              } else {
                me.$notify('Error al intentar actualizar el registro!!!', 'error')
              }
            })
          }
        })
      },
      rechazarsoli () 
      {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        var aux;

        var descripcionRegTabI = "Registro de Rechazo de carpeta";
        var rhechotem = me.idRhecho;

        me.$validator.validateAll("Rechazar").then(result => 
        {
          if (result) 
          {
            //Api para obtener el id del distrtito origen
            this.$cat.get('api/RHechoes/ObtenerDistritoOrigen/' + me.agenciaenvio,configuracion).then(function(response)
            {
              //Guardado en variable global por si se requiere en un futuro
              me.distritoOrigenId = response.data.distritoId;

              //Para regresar una carpeta a su respectiva unidad es necesario dos actualizaciones, en la base de datos del distrito origen y en la del dsitrito local
              //En caso de ser remisiones de la misma base no pasa nada, pues solo se actualiza dos veces pero los mismos datos

              //Api para el actualizado en el distrito origen
              this.$cat.put('api/RHechoes/ActualizarModuloyAgenciaRechazo',
              {
                'IdRHecho': me.idRhecho,
                'moduloServicioId': me.moduloenvio,
                'agenciaId': me.agenciaenvio,
                'distritoId':me.distritoOrigenId,

              }, configuracion).then(function(response) 
              {
                //Api para el actualizado en la base de datos local
                this.$cat.put('api/RHechoes/ActualizarModuloyAgencia',
                {
                  'IdRHecho': me.idRhecho,
                  'moduloServicioId': me.moduloenvio,
                  'agenciaId': me.agenciaenvio,

                }, configuracion).then(function(response) 
                {

                  me.$notify('¡La información se guardo correctamente!', 'success')
                  var idremision = me.IdRemisionUI
                  var rechazo = me.rechazo

                  //Api para el guardado del historial que la carpeta fue rechazada
                  this.$cat.post('api/Historialcarpeta/Crear',
                  {
                    'RHechoId': me.idRhecho,
                    'Detalle': "Rechazo de envio",
                    'Modulo': me.moduloenvian,
                    'Agencia':me.agenciaenvian,
                    'UDistrito' : me.u_distrito,
                    'USubproc': me.u_dirSubPro,
                    'UAgencia': me.u_agencia,
                    'Usuario': me.u_nombre,
                    'UPuesto': me.u_puesto,
                    'UModulo': me.u_modulo
                  }, configuracion).then(function(response) 
                  {

                    me.$notify('¡La información se guardo correctamente!', 'success');
                    me.crearRegistroTableroI(descripcionRegTabI,rhechotem);

                    //Api para actualizar la razon del rechazo
                    this.$cat.put('api/RemisionesUI/ActualizarRechazo',
                    {
                      'IdRemisionUI': idremision,
                      'Status': "Rechazado",
                      'Rechazo': rechazo,
                      'distritoId':me.distritoOrigenId,
                      
                    }, configuracion).then(function(response) 
                    {
                      me.$notify('¡La información se guardo correctamente!', 'success')
                      
                      //Cacheo de errores de api/RemisionesUI/ActualizarRechazo
                    }).catch(err => 
                    {
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
                        me.$notify("El recuso no ha sido encontrado", 'error')
                      } else {
                        me.$notify('Error al intentar crear el  registro!!!', 'error')
                      }
                    })
                    //Cacheo de errores de api/Historialcarpeta/Crear
                  }).catch(err => 
                  {
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
                      me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                      me.$notify('Error al intentar crear el  registro!!!', 'error')
                    }
                  })
                  me.dialogorechazar = false
                  me.listar()
                  me.limpiar()

                  //Cacheo de errores de api/RHechoes/ActualizarModuloyAgencia
                }).catch(err => 
                {
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
                    me.$notify("El recuso no ha sido encontrado", 'error')
                  } else {
                    me.$notify('Error al intentar actualizar el registro!!!', 'error')
                  }
                })

                //Cacheo de errores de api/RHechoes/ActualizarModuloyAgenciaRechazo
              }).catch(err => 
              {
                alert("Aun no puedes rechazar esta carpeta por fallas en la conexion a internet, la carpeta seguira en tu buzon, intentalo mas tarde");
              })

              //Cacheo de errores de api/RHechoes/ObtenerDistrtitoOrigen/
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
                me.$notify("El recuso no ha sido encontrado", 'error')
              } else {
                me.$notify('Error al intentar listar los registros', 'error')
              }
            })
          }
        })
      },
      crearRegistroTableroI(descripcionRegTabI,rhechotem)
      {
          let me = this;
          let header = { Authorization: "Bearer " + this.$store.state.token };
          let configuracion = { headers: header };

          this.$cat.post("api/RegistroTableroI/Crear",
          {
              RhechoId: rhechotem,
              TipoRegistroTableroI: descripcionRegTabI,
              Distrito: me.u_distrito,
              DirSub: me.u_dirSubPro,
              Agencia: me.u_agencia,
              ModuloServicioId: me.u_idmoduloservicio,
              Modulo: me.u_modulo,
              UsuarioId: me.u_idusuario,
              NombreUsuario: me.u_nombre,

          },configuracion).then(function (response) 
          {
              me.$notify("¡La información se guardo correctamente!", "success");

          }).catch((err) => 
          {
              if (err.response.status == 400) {
                  me.$notify("No es un usuario válido", "error");
              } else if (err.response.status == 401) {
                  me.$notify(
                  "Por favor inicie sesion para poder navegar en la aplicacion",
                  "error"
                  );
                  (me.e401 = true), (me.showpage = false);
              } else if (err.response.status == 403) {
                  me.$notify("No esta autorizado para ver esta página", "error");
                  me.e403 = true;
                  me.showpage = false;
              } else if (err.response.status == 404) {
                  me.$notify("El recuso no ha sido encontrado", "error");
              } else {
                  me.$notify("Error al intentar crear el  registro!!!", "error");
              }
          });
      },
      generarfecha () {
        var fecha
        fecha = moment().format('DD') + " de " + moment().format('MMMM') + " del " + moment().format("YYYY")
        return fecha
      },
      crearcaratula (item) {
        this.idRhecho = item.rHechoId
        this.listarrHecho2()
      },
      mostrarpdf_CaratulaNUC () {
        this.fecha = this.generarfecha()
        var dd = this.crearPdf_CaratulaNUC()
        var pdfMake = require('pdfmake/build/pdfmake.js')
        var htmlToPdfmake = require("html-to-pdfmake")
        if (pdfMake.vfs == undefined) {
          var pdfFonts = require('pdfmake/build/vfs_fonts.js')
          pdfMake.vfs = pdfFonts.vfs
        }
        var doc = pdfMake.createPdf(dd)
        var f = document.getElementById('iframepdf1')
        var callback = function(url) { f.setAttribute('src', url) }
        doc.getDataUrl(callback, doc)
        this.modal_CaratulaNUC = true
      },
      imprimirCaratulaNUC(){
        let me = this
        var dd = me.crearPdf_CaratulaNUC()
        var pdfMake = require('pdfmake/build/pdfmake.js')
        var htmlToPdfmake = require("html-to-pdfmake")
        if (pdfMake.vfs == undefined) {
          var pdfFonts = require('pdfmake/build/vfs_fonts.js')
          pdfMake.vfs = pdfFonts.vfs
        }
        var doc = pdfMake.createPdf(dd).print()
        me.close()
      },
      // ENTREVISTA  VICTIMA
      crearPdf_CaratulaNUC () {
        var pdfMake = require('pdfmake/build/pdfmake.js')
        var htmlToPdfmake = require("html-to-pdfmake")
        //***************************************************************************** */
        // VARIABLES
        //***************************************************************************** */
        var logo1 = this.logo1
        var logo2 = this.logo2
        var logo3 = this.logo3
        var logo4 = this.logo4
        var dirsubproc = this.dirsubprocuinicial
        var agencia = this.agenciainicial
        var diragencia = this.direccionAgencia
        var telagencia = this.telefonosAgencia
        var nuc = this.nuc
        //***************************************************************************** */
        var date = moment(this.fechaelevanuc, 'YYYY-MM-DD HH:mm:ss')
        var fecha = this.fecha
        //***************************************************************************** */
        var htmltexto = htmlToPdfmake(
          this.rbreve
        )
        var dd = {
          pageSize: 'LEGAL',
          pageOrientation: 'portrait',
          pageMargins: [ 85, 130, 72, 60 ],
          footer: function (currentPage, pageCount) {
            return {
              columns: [
                {
                  image: logo4,
                  width: 612,
                  absolutePosition: { x: 0, y: 0 },
                },
                {
                  text: diragencia + "\n" + telagencia + "\n" + 'www.hidalgo.gob.mx',
                  style: 'subheaderlogo',
                  style: 'PiePagina',
                  margin: [ 312, 12, 72, 0 ],
                  alignment: 'right',
                  absolutePosition: { x: 0, y: 30 },
                },
              ]
            };
          },
          header: function(currentPage, pageCount, pageSize) {
            return [
              {
                image: logo3,
                width: 612,
                absolutePosition: { x: 0, y: 0 },
              },
            ]
          },
          content: [
            {
              text:  dirsubproc + "\n" + agencia,
              style: 'Adscripcion',
              absolutePosition: { x: 85, y: 95 },
            },
            {
              text: "Número Único de Caso: " + nuc,
              style: 'Titulo',
              alignment: 'right',
              margin: [ 0, 40, 72, 0 ],
              absolutePosition: { x: 85, y: 150 },
            },
            {
              text: this.distritoinicial + ", Hidalgo a " + this.fecha + "\n\n\n\n",
              style: 'Fecha',
              alignment: 'right',
            },
            {
              text: 'REGISTRO DE NÚMERO ÚNICO DE CASO\n\n\n\n\n',
              alignment: 'center',
              style: 'Titulo'
            },
            {
              columns: [
                {
                  width: 220,
                  text: 'Registro de Atención Ciudadana(RAC):',
                  style: 'Texto'
                },
                {
                  width: '*',
                  text: this.rac,
                  style: 'Texto',
                  bold: true
                },
              ],
            },
            '\n\n',
            {
              columns: [
                {
                  width: 220,
                  text: 'Nombre del denunciante:',
                  style: 'Texto'
                },
                {
                  width: '*',
                  text: this.nombrep,
                  style: 'Texto',
                  bold: true
                },
              ],
            },
            '\n\n',
            {
              columns: [
                {
                  width: 220,
                  text: 'Numero Único de Caso:',
                  style: 'Texto'
                },
                {
                  width: '*',
                  text: this.nuc,
                  style: 'Texto',
                  bold: true
                },
              ],
            },
            {
              text: '\n\n\n\n\n' + "A T E N T A M E N T E" + '\n\n\n\n\n',
              alignment: 'justify',
              style: 'DePara',
            },
            {
              text: this.registradopor + "\n\n",
              alignment: 'justify',
              style: 'DePara',
            },
            {
              text: this.puestoquienregistro + "\n\n",
              alignment: 'justify',
              style: 'DePara',
            },
            {
              text: this.agenciainicial + "\n\n",
              alignment:'justify',
              style: 'DePara',
            },
          ],
          styles: {
            Adscripcion: {
              fontSize: 10,
              bold: true
            },
            Fecha: {
              fontSize: 9,
            },
            Nooficio: {
              fontSize: 8,
              bold: true
            },
            DePara: {
              fontSize: 10,
              bold: true
            },
            DeParaCargo: {
              fontSize: 9,
              bold: true
            },
            PiePagina: {
              fontSize: 7,
              //color: COLOR_TEXTO_PIE_PAGINA
            },
            Texto: {
              fontSize: 10,
              alignment: 'justify'
            },
            Titulo: {
              fontSize: 12,
              bold: true
            },
            Subtitulo: {
              fontSize: 11,
            },
          }
        }
        return dd;
      },
    }
  }
</script>

<style>
.espaciado {
  padding: 30px !important
}
</style>