<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />

    <UmixtaNavDrawer />

    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular" >Armas u Objetos</v-toolbar-title>
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
        <v-flex xs12 sm6 md3 lg3>
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
        :items="armasobjetos"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.usuario }}</td>
          <td>{{ props.item.modulo }}</td>
          <td>{{ props.item.tipoAr }}</td>
          <td>{{ props.item.nombreAr }}</td>
          <td>{{ props.item.fechaRegistro }}</td>
          <td class="justify-center layout px-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2" v-on="on" @click="edititem(props.item)">
                  edit
                </v-icon>
              </template>
              <span>Editar Arma u Objeto</span>
            </v-tooltip>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="listar()"  >Resetear</v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="dialogo" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{ formTitle }}.</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
              <v-btn color=success text @click="guardar()" :disabled='clikeado'>Guardar Información</v-btn>
              <v-btn icon @click="dialogo = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs12 xm12 md12 lg12>
                    <v-autocomplete
                      name="clasificacíon arma"
                      :items="clasificacionarmas"
                      v-model="clasificacionarma"
                      return-object
                      @change="listararmayobjeto()"
                      v-validate="'required'"
                      label="*Clasificacíon:"
                      :error-messages="errors.collect('clasificacíon arma')"
                    />
                  </v-flex>
                  <v-flex xs12 xm12 md12 lg12>
                    <v-autocomplete
                      name="arma u objeto"
                      v-if= "nombreclasi['catalogo']"
                      :items="armaobjetocats"
                      v-model="armaobjetocat"
                      v-validate="'required'"
                      label="*Arma u Objeto:"
                      :error-messages="errors.collect('arma u objeto')"
                    />
                  </v-flex>
                  <v-flex xs12 xm12 md12 lg12>
                    <v-text-field
                      name="arma u objeto"
                      v-if= "!nombreclasi['catalogo']"
                      label="*Arma o Objeto:"
                      v-model="nombreAr"
                      v-validate="'required'"
                      :error-messages="errors.collect('arma u objeto')"
                    />
                  </v-flex>
                  <v-flex class="espaciado" xs12 xm12 md6 lg6 >
                    <v-autocomplete
                      name="calibre"
                      v-if="clasificacionarma.text == 'Arma de Fuego'"
                      :items="calibres"
                      v-model="calibre"
                      return-object
                      v-validate="'required'"
                      label="*Calibre:"
                      :error-messages="errors.collect('calibre')"
                    />
                    <v-autocomplete
                      name="marca"
                      v-if="clasificacionarma.text == 'Arma de Fuego'"
                      :items="marcas"
                      v-model="marca"
                      return-object
                      v-validate="'required'"
                      label="*Marcas:"
                      :error-messages="errors.collect('marca')"
                    />
                  </v-flex>
                  <v-flex class="espaciado" xs12 xm12 md6 lg6 >
                    <v-text-field
                      name="matricula"
                      v-if="clasificacionarma.text == 'Arma de Fuego'"
                      label="*Matricula:"
                      v-model="matricula"
                      :error-messages="errors.collect('matricula')"
                    />
                    <v-text-field
                      name="modelo"
                      v-if="clasificacionarma.text == 'Arma de Fuego'"
                      label="*Modelo:"
                      v-model="modelo"
                      :error-messages="errors.collect('modelo')"
                    />
                  </v-flex>
                  <v-flex xs12 xm12 md12 lg12 >
                    <v-card elevation="0" >
                      <v-card-title>
                        <h3>*Descripción del Arma u Objeto</h3>
                      </v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-form>
                          <vue-editor
                            name="decripción del arma"
                            v-model="descripcion"
                            outline  height=350px;
                            style="max-height: 310px; overflow-y: scroll"
                            :editorToolbar="customToolbar"
                            :error-messages="errors.collect('decripción del arma')"
                          />
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
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
      clikeado: false,
      dialog: false,
      rAtencionId: '',
      rHechoId: '',
      nuc: '',
      showpage: true,
      e401: false,
      e403: false,
      clasificacionarmas: [],
      clasificacionarma: '',
      clasificacionarma2: '',
      armaobjetocats: [],
      armaobjetocat: '',
      armasobjetos: [],
      descripcion: '',
      fecha: '',
      nombreAr: '',
      idrarma: '',
      nombreclasi: '',
      estadocatalogo: '',
      armaobjetofinal: '',
      search: '',
      dialogo: false,
      idvehiculo: '',
      calibre: '',
      marca: '',
      matricula: '',
      modelo: '',
      marcas: [],
      calibres: [],
      headers: [
        { text: 'Emitida por', value: 'usuario', sortable: true  },
        { text: 'Módulo', value: 'modulo', sortable: true  },
        { text: 'Clasificacíon', value: 'tipoAr', sortable: true  },
        { text: 'Arma',value: 'nombreAr', sortable: true  },
        { text: 'Fecha de registro',value: 'fechaRegistro', sortable: true  },
        { text: 'Opciones', value: 'editar', sortable: false },
      ],
      customToolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
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
      rowsPerPageItems: [10, 20, 30, 40, 50],
      pagination: {
          rowsPerPage: 20
      },
      editedIndex: 0,
      modalAdd: false,
      rac:'',
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
    }),
    created () {
      let me = this
      me.rHechoId =  me.$store.state.rhechoid;
      me.nuc = me.$store.state.nuc;
      if (me.rHechoId== null) {
        me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpeta y luego en Listar carpeta y ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.',
        function() {
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
        me.listar()
        me.listarClasificacion()
        me.listarMarcas()
        me.listarCalibres()
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
        edititem (item) {
          this.idRarma = item.idRarma
          this.editedIndex = 1
          this.dialogo = true
          this.clasificacionarma2 = item.tipoAr
          this.clasificacionarma = this.selectidmarca(item.tipoAr)
          this.listararmayobjeto2(this.selectidmarca(item.tipoAr))
          this.obteneridarma2(this.selectidmarca(item.tipoAr))
          this.armaobjetocat = item.nombreAr
          this.nombreAr = item.nombreAr
          this.descripcion = item.descripcionAr
          this.generartextval(item.tipoAr)
          this.marca = item.marca
          this.modelo = item.modelo
          this.matricula = item.matricula
          this.calibre = item.calibre
        },
        selectidmarca: function(marca) {
          for (var i = 0; i < this.clasificacionarmas.length; i++) {
            if (this.clasificacionarmas[i].text === marca) {
              return this.clasificacionarmas[i].value
            }
          }
        },
        generartextval: function(val) {
          for (var i = 0; i < this.clasificacionarmas.length; i++) {
            if (this.clasificacionarmas[i].text === val) {
              this.clasificacionarma = new Object()
              this.clasificacionarma.text =this.clasificacionarmas[i].text
              this.clasificacionarma.value = this.clasificacionarmas[i].value
            }
          }
        },
        cerrarcarpeta () {
          this.$store.state.rhechoid = null
          this.$store.state.nuc= null
          this.$router.push('./umixta-carpetas')
        },
        agregar () {
          this.limpiar()
          this.editedIndex = -1
          this.dialogo= true
        },
        close () {
          this.dialogo = false;
          this.limpiar()
        },
        limpiar () {
          this.listar()
          this.armaobjetocat = ''
          this.descripcion = ''
          this.nombreAr = ''
          this.clasificacionarma = ''
          this.calibre = ''
          this.marca = ''
          this.modelo = ''
          this.matricula = ''
        },
        generarfhecha () {
          let me = this
          me.dia = moment().format('DD')
          me.mes = moment().format('MMMM')
          me.año = moment().format("YYYY")
          me.hr = moment().format('h:mm:ss a')
          me.fecha = me.dia + " de " + me.mes  + " del " + me.año + ", " + me.hr
        },
        listar () {
          let me = this;
          let header = { "Authorization" : "Bearer " + this.$store.state.token }
          let configuracion = { headers : header }
          this.$cat.get('api/RArma/Listar/' + me.rHechoId, configuracion).then(function(response) {
            me.armasobjetos = response.data
          }).catch(err => {
            if (err.response.status == 400) {
              me.$notify("No es un usuario válido", 'error')
            } else if (err.response.status == 401) {
              me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
              me.e401 = true,
              me.showpage= false
            } else if (err.response.status == 403) {
              me.$notify("No esta autorizado para ver esta página", 'error')
              me.e403= true
              me.showpage= false
            } else if (err.response.status == 404) {
              me.$notify("El recuso no ha sido encontrado", 'error')
            } else {
              me.$notify('Error al intentar listar los registros', 'error')
            }
          });
        },
        listarClasificacion () {
          var clasificacionarray = []
          let me = this
          let header = { "Authorization" : "Bearer " + this.$store.state.token }
          let configuracion = { headers : header }
          me.$conf.get('api/ClasificacionArma/Listar',configuracion).then(function(response) {
            clasificacionarray = response.data
            clasificacionarray.map(function(x) {
              me.clasificacionarmas.push({ text: x.nombreC, value: x.idClasificacionArma })
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
          });
        },
        listarMarcas(){
          var marcasnarray = []
          let me = this
          let header = { "Authorization" : "Bearer " + this.$store.state.token }
          let configuracion = { headers : header }
          me.$conf.get('api/MarcaArma/Listar',configuracion).then(function(response){
            marcasnarray = response.data
            marcasnarray.map(function(x) {
              me.marcas.push({ text: x.nombre, value: x.nombre, value2: x.idMarcaArma });
            })
          }).catch(err => {
            if (err.response.status == 400) {
              me.$notify("No es un usuario válido", 'error')
            } else if (err.response.status == 401) {
              me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
              me.e401 = true,
              me.showpage= false
            } else if (err.response.status == 403) {
              me.$notify("No esta autorizado para ver esta página", 'error')
              me.e403= true
              me.showpage= false
            } else if (err.response.status == 404) {
              me.$notify("El recuso no ha sido encontrado", 'error')
            } else {
              me.$notify('Error al intentar listar los registros', 'error')
            }
          })
        },
        listarCalibres () {
          var calibresarray = []
          let me = this
          let header = { "Authorization" : "Bearer " + this.$store.state.token }
          let configuracion = { headers : header }
          me.$conf.get('api/Calibre/Listar',configuracion).then(function(response) {
            calibresarray = response.data
            calibresarray.map(function(x) {
              me.calibres.push({ text: x.numero, value: x.numero, value2: x.idCalibre })
            })
          }).catch(err => {
            if (err.response.status == 400) {
              me.$notify("No es un usuario válido", 'error')
            } else if (err.response.status == 401) {
              me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
              me.e401 = true,
              me.showpage= false
            } else if (err.response.status == 403) {
              me.$notify("No esta autorizado para ver esta página", 'error')
              me.e403= true
              me.showpage= false
            } else if (err.response.status == 404) {
              me.$notify("El recuso no ha sido encontrado", 'error')
            } else {
              me.$notify('Error al intentar listar los registros', 'error')
            }
          })
        },
        listararmayobjeto () {
          var armasobjetosarray = []
          let me = this
          let header = { "Authorization" : "Bearer " + this.$store.state.token }
          let configuracion = { headers : header }
          me.obteneridarma()
          me.armaobjetocats = []
          me.$conf.get('api/ArmaObjeto/ListarClasi/' + me.clasificacionarma.value, configuracion).then(function(response) {
            armasobjetosarray = response.data
            armasobjetosarray.map(function(x) {
              me.armaobjetocats.push({text: x.nombreAO,value: x.nombreAO});
            })
          }).catch(err => {
            if (err.response.status == 400) {
              me.$notify("No es un usuario válido", 'error')
            } else if (err.response.status == 401) {
              me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
              me.e401 = true,
              me.showpage= false
            } else if (err.response.status == 403) {
              me.$notify("No esta autorizado para ver esta página", 'error')
              me.e403= true
              me.showpage= false
            } else if (err.response.status == 404) {
              me.$notify("El recuso no ha sido encontrado", 'error')
            } else {
              me.$notify('Error al intentar listar los registros', 'error')
            }
          })
        },
        listararmayobjeto2 (value) {
          var armasobjetosarray = []
          let me = this
          let header = { "Authorization" : "Bearer " + this.$store.state.token }
          let configuracion = { headers : header }
          me.armaobjetocats = []
          me.$conf.get('api/ArmaObjeto/ListarClasi/' + value, configuracion).then(function(response) {
            armasobjetosarray = response.data
            armasobjetosarray.map(function(x) {
              me.armaobjetocats.push({ text: x.nombreAO,value: x.nombreAO })
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
              me.$notify('Error al intentar listar los registros','error')
            }
          })
        },
        obteneridarma () {
          let me = this
          let header = { "Authorization" : "Bearer " + this.$store.state.token }
          let configuracion = { headers : header }
          me.armaobjetocat = ''
          me.$conf.get('api/ClasificacionArma/ListarNombre/' + me.clasificacionarma.value, configuracion).then(function(response) {
            me.nombreclasi = response.data
          }).catch(err => {
            if (err.response.status == 400) {
              me.$notify("No es un usuario válido", 'error')
            } else if (err.response.status == 401) {
              me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
              me.e401 = true,
              me.showpage= false
            } else if (err.response.status == 403) {
              me.$notify("No esta autorizado para ver esta página", 'error')
              me.e403= true
              me.showpage= false
            } else if (err.response.status == 404) {
              me.$notify("El recuso no ha sido encontrado", 'error')
            } else {
              me.$notify('Error al intentar listar los registros', 'error')
            }
          })
        },
        obteneridarma2 (value) {
          let me = this
          let header = { "Authorization" : "Bearer " + this.$store.state.token }
          let configuracion = { headers : header }
          me.armaobjetocat = ''
          me.$conf.get('api/ClasificacionArma/ListarNombre/' + value,configuracion).then(function(response) {
            me.nombreclasi = response.data;
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
        guardar () {
          let me = this
          let header = { "Authorization" : "Bearer " + this.$store.state.token }
          let configuracion = { headers : header }

          var descripcionRegTabI = 'Registro de arma u objeto ' + me.clasificacionarma.text + ', ' + me.armaobjetofinal;

          if (me.nombreclasi['catalogo'])
          me.armaobjetofinal = me.armaobjetocat
          else
          me.armaobjetofinal = me.nombreAr
          me.generarfhecha()
          me.$validator.validate().then(result => {
            if (result) {
              if(this.editedIndex == -1) {
                this.$cat.post('api/RArma/Crear', {
                  'rHechoId': me.rHechoId,
                  'TipoAr':me.clasificacionarma.text,
                  'NombreAr':me.armaobjetofinal,
                  'DescripcionAr':me.descripcion,
                  'fechaRegistro':me.fecha,
                  'distrito':me.u_distrito,
                  'subproc': me.u_dirSubPro,
                  'agencia': me.u_agencia,
                  'usuario': me.u_nombre,
                  'puesto': me.u_puesto,
                  'modulo': me.u_modulo,
                  'matricula': me.matricula,
                  'modelo': me.modelo,
                  'marca':me.marca.text,
                  'calibre': me.calibre.text
              }, configuracion).then(function(response) {
                me.$notify('¡La información se guardo correctamente!', 'success')
                me.dialogo = false
                me.crearRegistroTableroI(descripcionRegTabI);
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
                  me.$notify('Error al intentar actualizar el registro!!!','error')
                }
              })
            } else {
              this.$cat.put('api/RArma/Actualizar', {
                'idRarma':me.idRarma,
                'tipoAr':me.clasificacionarma.text,
                'nombreAr':me.armaobjetofinal,
                'descripcionAr': me.descripcion
              }, configuracion).then(function(response) {
                me.$notify('La información se actualizo correctamente !!!', 'success')
                me.dialogo = false
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
                  me.$notify('Error al intentar actualizar el registro!!!','error')
                }
              })
            }
          }
        })
      },
      crearRegistroTableroI(descripcionRegTabI){
                
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
            
                this.$cat.post('api/RegistroTableroI/Crear',{
                    'RhechoId': me.rHechoId,
                    'TipoRegistroTableroI': descripcionRegTabI,
                    'Distrito': me.u_distrito,
                    'DirSub': me.u_dirSubPro,
                    'Agencia':me.u_agencia,
                    'ModuloServicioId': me.u_idmoduloservicio,
                    'Modulo':me.u_modulo,
                    'UsuarioId':me.u_idusuario,
                    'NombreUsuario': me.u_nombre,
            
                },configuracion).then(function(response){
                    me.$notify('¡La información se guardo correctamente!','success')
                }).catch(err => {
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403= true
                        me.showpage= false
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar crear el  registro!!!','error')
                    }
                });
            
            },
            
    }
  }
</script>

<style>
.espaciado {
  padding: 30px !important
}
</style>
