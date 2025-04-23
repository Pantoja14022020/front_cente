<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular">Carga de archivos</v-toolbar-title>
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
            <v-btn class="mx-2" slot="activator" v-on="on" @click="cerrarcarpeta" fab dark small color="primary">
              <v-icon dark>close</v-icon>
            </v-btn>
          </template>
          <span>Cerrar carpeta</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="mx-2" slot="activator" v-on="on" @click="agregar" fab dark small color="success">
              <v-icon dark>add</v-icon>
            </v-btn>
          </template>
          <span>Agregar registro</span>
        </v-tooltip>
      </v-toolbar>|
      <v-data-table
        :headers="headers"
        :items="archivos"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.usuario }}</td>
          <td>{{ props.item.uModulo }}</td>
          <td>{{ props.item.fecha }}</td>
          <td>{{ props.item.tipoDocumento }}</td>
          <td class="justify-center layout px-0">
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon class="mr-2" v-on="on" @click=" verimagen (props.item)">
                    pageview
                  </v-icon>
                </template>
                <span>Consultar Archivos</span>
            </v-tooltip>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="dialogo" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-toolbar dark color="primary">
          <v-toolbar-title>SUBIR ARCHIVOS.</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn color=success text @click="guardar()" :disabled='clikeado'>Guardar</v-btn>
            <v-btn icon @click="dialogo = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card>
         <v-card-text>
           <v-form ref="form">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-card>
                    <v-container fluid grid-list-md>
                      <v-layout row wrap>
                        <v-flex class="text-md-center">
                          <img :src="imageUrl" height="250px" />
                          <pdf :src='imageUrl' height='150px' />
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                  <v-text-field
                    name="imagen"
                    label="Selecciona la imagen del documento de identificacion"
                    @click='pickFile'
                    v-model='imageName'
                    prepend-icon='attach_file'
                    :error-messages="errors.collect('imagen')"
                  />
                  <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="image/*, .pdf, .doc, .docx"
                    @change="onFilePicked"
                  >
                  <v-autocomplete
                    name="tipo de archivo"
                    :items="tiposdocumentos"
                    v-model="tiposdocumento"
                    return-object
                    v-validate="'required'"
                    label="*Tipo de archivo:"
                    :error-messages="errors.collect('tipo de archivo')"
                  />
                  <v-text-field
                    name="descripcíon de documento"
                    label="*Descripcíon del documento"
                    v-model='descripciondocumento'
                    v-validate="'required'"
                    :error-messages="errors.collect('descripcíon de documento')"
                  />
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider />
      </v-card>
    </v-dialog>
      <v-dialog v-model="dialogimagen" max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">assignment</v-icon>
            </v-avatar>
            <v-toolbar-title class="subheading">Imagen</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs12 sm12 md12>
                    <v-card auto-grow elevation="0">
                      <v-card-text>
                        <v-list three-line>
                          <p class="text-lg-center font-weight-bold">
                            <a>Informacion detallada del Documento.</a>
                          </p>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="success">subject</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>
                                <p class="body-4 font-weight-bold">
                                  <a>Descripción:</a>
                                </p>
                              </v-list-tile-title>
                              <v-list-tile-sub-title>
                                <p color="accent" class="caption font-weight-regular">
                                  <a>{{ descrip }}</a>
                                </p>
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="success">assignment</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>
                                <p class="body-2 font-weight-bold">
                                  <a>Tipo de documento:</a>
                                </p>
                              </v-list-tile-title>
                              <v-list-tile-sub-title>
                                <p color="accent" class="caption font-weight-regular">
                                  <a>{{ tipo }}</a>
                                </p>
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-card-text>
                    </v-card>
                    <v-img
                      :src="rutaconsulta"
                      aspect-ratio="1"
                      class="black"
                      contain
                    />
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-spacer />
                <v-btn @click.native="dialogimagen=false">Cerrar</v-btn>
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
  import { WebCam } from "vue-web-cam"
  import { VueEditor } from "vue2-editor"
  import { error } from 'util'
  import moment from 'moment'
  import 'moment/locale/es'
  import n401 from './401.vue'
  import n403 from './403.vue'
  import pdf from 'vue-pdf'

  var assert, curp, persona
  assert = require('assert')
  curp = require('curp.js')

  export default {
    components: {
      "vue2-editor": VueEditor,
      n401,
      n403,
      pdf
    },
    data: () => ({
      clikeado: false,
      alert: false,
      dialog: false,
      rAtencionId: '',
      rHechoId: '',
      nuc: '',
      showpage: true,
      e401: false,
      e403: false,
      tiposdocumentos:[
        { text: 'Fotografías', value: '1' },
        { text: 'Documentos', value: '2' },
        { text: 'Resultados', value: '3' },
        { text: 'Indicios', value: '4' },
        { text: 'Identificaciones', value: '5' },
        { text: 'Instrumento de apoderado legal', value: '6' }
      ],
      tiposdocumento: '',
      clasificacionarmas: [],
      clasificacionarma: '',
      clasificacionarma2: '',
      armaobjetocats: [],
      armaobjetocat: '',
      archivo: [],
      descripcion: '',
      fecha: '',
      nombreAr: '',
      idrarma: '',
      nombreclasi: '',
      estadocatalogo: '',
      armaobjetofinal: '',
      descrip: '',
      tipo: '',
      search:'',
      dialogo: false,
      archivos: [],
      dialogimagen: false,
      rutaconsulta: '',
      imageUrl: null,
      imageName: '',
      descripciondocumento: '',
      headers: [
        { text: 'Emitida por', value: 'emitidoPor', sortable: true },
        { text: 'Modulo', value: 'modulo', sortable: true },
        { text: 'Fecha',value: 'fechaRegistro' },
        { text: 'Tipo de archivo',value: 'tipoarch' },
        { text: 'Opciones', value: 'opciones' },
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
      headersar: [
        { text: 'Opciones', value: 'opciones', sortable: false },
      ],
      search: '',
      rowsPerPageItems: [10, 20, 30, 40, 50],
      pagination: {
        rowsPerPage: 20
      },
      editedIndex: 0,
      modalAdd: false,
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
      u_subproc: '',
    }),
    created () {
      let me = this
      me.rHechoId =  me.$store.state.rhechoid
      me.nuc = me.$store.state.nuc
      if (me.rHechoId == null) {
        me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpeta y luego en Listar carpeta y ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.',
        function() {
          me.$router.push('./umixta-carpetas')
        })
      } else {
        me.$notify('Carpeta abierta correctamente !!!', 'success')
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
      }
      axios.interceptors.request.use((config) => {
        // Do something before request is sent
        this.$store.commit('LOADER', true)
        return config
      }, (error) => {
        // Do something with request error
        this.$store.commit('LOADER',false)
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
      doSomething: function() {
        if (this.clikeado) {
          return
        }
        this.clikeado = true
      },
      pickFile () {
        this.removeImage()
        this.$refs.image.click()
      },
      removeImage () {
        this.$refs.image.value = ''
      },
      onFilePicked (e) {
        const files = e.target.files
        if (files[0] !== undefined) {
          this.imageName = files[0].name
          if (this.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
              this.imageUrl = fr.result
              //this.imageUrl = new FileReader().readAsDataURL(new File('../assets/pdf.jpg','pdf'))
              //if(files[])
              this.imageFile = files[0] // this is an image file that can be sent to server...
          })
        } else {
          this.imageName = ''
          this.imageFile = ''
          this.imageUrl = ''
        }
	    },
      consultararchivo (item) {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        this.$cat.get('api/DocsDiligencias/Listar/' + 98, configuracion).then(function(response) {
          me.archivos=response.data
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
      verimagen (item) {
        var tipoArchivo = item.ruta.slice((item.ruta.lastIndexOf(".") - 1 >>> 0) + 2)
        if (!(tipoArchivo == "pdf" || tipoArchivo == "doc" || tipoArchivo == "docx")) {
          this.rutaconsulta = item.ruta
          this.descrip = item.descripcionDocumento
          this.tipo = item.tipoDocumento
          this.dialogimagen = true
        } else {
          var win = window.open(item.ruta, '_blank')
          // Cambiar el foco al nuevo tab (punto opcional)
          win.focus()
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
        this.dialogo = true
      },
      limpiar () {
        let me = this
        me.conclusion = ''
        me.changestatus = ''
        me.tiposdocumento = ''
        me.descripciondocumento = ''
        me.imageName = ""
        me.imageFile = ""
        me.imageUrl = ""
        me.conclusionitem = ""
        me.mensajeitem = ""
      },
      generarfecha () {
        var fecha
        fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY") + ", " + moment().format('h:mm:ss a')
        return fecha
      },
      listar () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }
        this.$cat.get('api/Archivos/Listar/' + me.rHechoId, configuracion).then(function(response) {
          me.archivos=response.data
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
      generateUUID: function() { // Public Domain/MIT
        var d = new Date().getTime()
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
          d += performance.now() //use high-precision timer if available
        }
        var newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0
          d = Math.floor(d / 16)
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
        })
        return newGuid
      },
      guardar () {
        let me = this
        let header = { "Authorization" : "Bearer " + this.$store.state.token }
        let configuracion = { headers : header }

        var descripcionRegTabI = 'Registro de archivo de ' + me.tiposdocumento.text;


        me.$validator.validate().then(result => {
          if (result) {
            var nombreCarpeta
            if (me.imageFile) {
              let formData = new FormData()
              formData.append('file', me.imageFile )
              nombreCarpeta = "C" + me.nuc.substr(1)
              me.GUID = me.generateUUID()
              this.$cat.post('api/Archivos/Post/' + nombreCarpeta + '/' + me.GUID, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }, configuracion).then(function(response) {
                this.$cat.post('api/Archivos/Crear', {
                  'rHechoId': me.rHechoId,
                  'tipoDocumento': me.tiposdocumento.text,
                  'nombreDocumento': "",
                  'descripcionDocumento': me.descripciondocumento,
                  'ruta' : response.data.ruta,
                  'fecha' : me.generarfecha(),
                  'uDistrito' : me.u_distrito,
                  'uSubproc' : me.u_dirSubPro,
                  'uAgencia' : me.u_agencia,
                  'usuario' : me.u_nombre,
                  'uPuesto' : me.u_puesto,
                  'uModulo' : me.u_modulo,
                }, configuracion).then(function(response) {
                  me.$notify('La información se guardo correctamente !!!', 'success')
                  me.modalAdd = false
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
                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                    me.e403 = true
                    me.showpage = false
                  } else if (err.response.status == 404) {
                    me.$notify("El recuso no ha sido encontrado", 'error')
                  } else {
                    me.$notify('Error al intentar crear el  registro!!!','error')
                  }
                })
              }).catch(function() {
                console.log('FAILURE2!!')
              })
            }
          }
        })
        this.doSomething()
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
                    me.$notify('La información se guardo correctamente !!!','success')
                }).catch(err => {
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
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

</style>
