<template>  
    <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />

    <UmixtaNavDrawer />

        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-regular" >Historial de Actualizaciones del Sistema Centenario</v-toolbar-title>
                
                <v-divider class="mx-2" inset vertical></v-divider>

                <v-badge v-model="show" color="cyan" right>
                    <!-- <template v-slot:badge> <span>{{  contador  }}</span> </template> -->
                    <v-icon large color="grey lighten-1"> account_box</v-icon>
                </v-badge>

                <v-spacer></v-spacer>
                <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <!-- Habilitamos un boton para habilitar un modal que permitira agregar actualizaciones -->
                <v-tooltip bottom v-if="u_idusuario === 'de814510-4e30-407d-94f3-4efbc536268a'">
                    <template v-slot:activator="{ on }">
                        <v-btn
                        class="mx-2 pt-2"
                        slot="activator"
                        v-on="on"
                        @click="agregarActualizacionDialog = true"
                        fab
                        dark
                        small
                        color="success"
                        >
                        <v-icon class="mt-1" dark>add</v-icon>
                        </v-btn>
                    </template>
                    <span>Agregar registro de actualización</span>
                </v-tooltip>
                <!-- Se coloco un boton para refrescar el listado -->
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn
                        class="mx-2 pt-2"
                        slot="activator"
                        v-on="on"
                        @click="listarActualizaciones()"
                        fab
                        dark
                        small
                        color="success"
                        >
                        <v-icon class="mt-1" dark>refresh</v-icon>
                        </v-btn>
                    </template>
                    <span>Actualizar listado de actualizaciones</span>
                </v-tooltip>
            </v-toolbar>
            <!-- Listado de actualizaciones -->
            <v-data-table :headers="headers" :items="actualizaciones" :search="search"  :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination"  class="elevation-1" >
                <template slot="items" class="white" slot-scope="props">

                    <td>{{ props.item.claveActualizacion }}</td>

                    <td>{{ props.item.fechaActualizacion.substring(8, 10) +" de " + obtenermes(props.item.fechaActualizacion.substring(5, 7) - 1) +" del " + props.item.fechaActualizacion.substring(0, 4) }}</td>
                    
                    <td>{{ props.item.nombreActualizacion }}</td>

                    <td class="justify-center layout px-0">
                        <v-tooltip bottom v-if="u_idusuario === 'de814510-4e30-407d-94f3-4efbc536268a'">
                            <template v-slot:activator="{ on }">
                            <v-icon class="mr-2" v-on="on" @click=" editActualizacion(props.item)">
                                edit
                            </v-icon>
                            </template>
                            <span>Editar actualizacion</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                            <v-icon class="mr-2" v-on="on" @click="verInfo(props.item)">
                                visibility
                            </v-icon>
                            </template>
                            <span>Ver detalles de la actualizacion</span>
                        </v-tooltip>
                        <v-tooltip bottom v-if="props.item.rutaDocumento !== ''">
                            <template v-slot:activator="{ on }">
                            <v-icon class="mr-2" v-on="on" @click="verDoc(props.item)">
                                print
                            </v-icon>
                            </template>
                            <span>Consultar PDF de apoyo</span>
                        </v-tooltip>
                        <v-tooltip bottom v-if="props.item.mostrarAviso && u_idusuario === 'de814510-4e30-407d-94f3-4efbc536268a'">
                            <template v-slot:activator="{ on }">
                            <v-icon class="mr-2" color = "error" v-on="on" @click="desactivarAnuncio(props.item)">
                                cancel
                            </v-icon>
                            </template>
                            <span>Desactivar aviso en panel de control</span>
                        </v-tooltip>
                    </td>
                </template>
            </v-data-table>
        </v-flex>

        <!-- Este dialog habilita la pestaña junto con todos los componentes para dar de alta una actualizacion -->
        <v-dialog   v-model="agregarActualizacionDialog"  fullscreen hide-overlay transition="dialog-bottom-transition">     
            <v-card>
                <v-toolbar dark color="primary">

                    <v-toolbar-title>Registra los datos de la actualización</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn  color=success text @click="guardarDocSiHay()">Guardar</v-btn>
                        <v-btn icon @click="limpiar()">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar> 
                
                <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>

                        <v-flex class="espaciado" xs6 sm6 md6 lg6> 
                            <v-text-field
                                name="clave actualizacion"
                                label="Clave de la actualización:"
                                v-model="claveActualizacion"
                                v-validate="'required'"
                                :error-messages="errors.collect('clave actualizacion')"
                                :rules="[val => /^[a-zA-Z0-9]*$/.test(val) || 'Solo se permiten letras y números']"
                            />
                            <v-menu
                                ref="menu1"
                                v-model="menu1"
                                :close-on-content-click="false"
                                :return-value.sync="fechaActualizacion"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                                >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        name="fecha Actualizacion"
                                        :value="fechaA"
                                        label="*Fecha en que se subió la actualización:"
                                        prepend-icon="event"
                                        readonly
                                        v-on="on"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('fechaActualizacion')" 
                                        data-vv-name="fechaActualizacion"
                                    />

                                </template>
                                <v-date-picker
                                    locale="es"
                                    v-model="fechaActualizacion"
                                    no-title
                                    scrollable
                                >
                                    <v-spacer />
                                    <v-btn text color="primary" @click="menu1 = false"
                                    >Cancel</v-btn
                                    >
                                    <v-btn text color="primary" @click="fechainif()"
                                    >OK</v-btn
                                    >
                                </v-date-picker>
                            </v-menu>
                            <v-text-field 
                                name="nombre actualizacion" 
                                label="Nombre de la actualización:"
                                v-model="nombreActualizacion" 
                                v-validate="'required'"
                                :error-messages="errors.collect('nombre actualizacion')">
                            </v-text-field>
                            <v-text-field 
                                name="sha commit" 
                                label="SHA del commit"
                                v-model="shaCommit"
                                v-validate="'required'"
                                :error-messages="errors.collect('sha commit')">
                            </v-text-field> 
                            <v-text-field 
                                name="ramas relacionadas" 
                                label="Escribe las ramas separadas con ,"
                                v-model="ramasRelacionadas"
                                v-validate="'required'"
                                :error-messages="errors.collect('ramas relacionadas')">
                            </v-text-field>
                            <v-text-field 
                                name="quien registra" 
                                label="¿Quien esta realizando este registro?:"
                                v-model="realizadoPor" 
                                v-validate="'required'"
                                :error-messages="errors.collect('quien registra')">
                            </v-text-field>                  
                            <v-switch
                                v-model="mostrarUsuario"
                                :label="'¿Deseas que esta actualizacion sea visible para los usuarios?'"
                                color="success"
                                hide-details                   
                            />
                            <v-text-field
                                :label="`${textViewUsers}`"
                                v-model="textov"
                                disabled>
                            </v-text-field>                             
                        </v-flex>
    
                        <v-flex class="espaciado" xs6 sm6 md6 lg6> 
                            <v-card>
                                <v-container fluid grid-list-md>
                                <v-layout row wrap>
                                    <v-flex class="text-md-center">
                                    <img :src="imageUrl" height="150px" />
                                    <pdf :src='imageUrl' height='50px' />
                                    </v-flex>
                                </v-layout>
                                </v-container>
                            </v-card>
                            <v-text-field
                                name="imagen"
                                label="Selecciona PDF que subiras con respecto a esta actualización"
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
                        </v-flex>

                        <v-flex xs12 sm12 md12 lg12>
                            <v-text-field 
                                name="descripcion actualización" 
                                label="Agrega una descripcion de la actualización:"
                                v-model="descripcionActualizacion" 
                                v-validate="'required'"
                                :error-messages="errors.collect('quien registra')">
                            </v-text-field>                         
                        </v-flex>

                        <v-flex xs12 sm12 md12 lg12>
                            <v-switch
                                v-model="mostrarEnPanel"
                                :label="'¿Deseas que se haga visible un aviso importante en el panel de control?'"
                                color="success"
                                hide-details                   
                            />
                            <v-text-field 
                                v-if="mostrarEnPanel == true"
                                name="mensaje mostrado" 
                                label="¿Que necesitas que diga el mensaje?:"
                                v-model="mensajeEnPanel" 
                                v-validate="'required'"
                                :error-messages="errors.collect('mensaje mostrado')">
                            </v-text-field>
                            <v-switch
                                v-if="mostrarEnPanel == true"
                                v-model="mostrarPDFPanel"
                                :label="'¿Deseas que puedan ver el documento PDF que estas subiendo?'"
                                color="success"
                                hide-details                   
                            />
                        </v-flex>
                    
                        <v-flex xs12 sm12 md12 lg12>
                            <v-switch
                                v-model="hayQuerys"
                                :label="'¿Se ejecuto algun query para esta actualizacion?'"
                                color="success"
                                hide-details                   
                            />
                            <v-toolbar v-if="hayQuerys == true" color="primary" dark>
                                <v-toolbar-title>Pega en este editor de texto los querys que hayas ejecutado en produccion</v-toolbar-title>
                            </v-toolbar>
                            <vue-editor
                                v-if="hayQuerys == true"
                                name="texto devolucion"
                                v-validate="'required'"
                                :editorToolbar="customToolbar"
                                v-model="querysRelacionados"
                                data-vv-scope="dialogoDevolucion"
                                :error-messages="errors.collect('dialogoDevolucion.texto devolucion')">
                            </vue-editor>
                        </v-flex>

                    </v-layout>
                </v-container>  
            </v-card>
        </v-dialog>
        <!-- Este dialog permite previzualizar el pdf -->
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
      <!-- Este dialog muestra la informacion general de la actualizacion -->
      <v-dialog v-model="dialogoinfo" max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">info</v-icon>
            </v-avatar>
            <v-toolbar-title class="subheading">Información de la actualización</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" >
              <v-container grid-list-md text-xs-center>
                <v-layout wrap>
                  <v-flex class="espaciado" xs12 sm12 md12 lg12>
                    <v-list two-line>

                      <v-list-tile>
                        <v-list-tile-action>
                          <v-icon color="success">fingerprint</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>
                            <p class="body-2 font-weight-bold">
                              <a>Clave de actualización:</a>
                            </p>
                          </v-list-tile-title>
                          <v-list-tile-sub-title>
                            <p color="accent" class="caption font-weight-regular">
                              <a>{{ infoDialog.claveActualizacion }}</a>
                            </p>
                          </v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>

                      <v-list-tile>
                        <v-list-tile-action>
                          <v-icon color="success">event</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                              <p class="body-2 font-weight-bold">
                                <a>Fecha de la actualización:</a>
                              </p>
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                              <p color="accent" class="caption font-weight-regular">
                                <a>{{ infoFecha}}</a>
                              </p>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>

                      <v-list-tile>
                        <v-list-tile-action>
                          <v-icon color="success">badge</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                              <p class="body-2 font-weight-bold">
                                <a>Nombre de la actualización:</a>
                              </p>
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                              <p color="accent" class="caption font-weight-regular">
                                <a>{{ infoDialog.nombreActualizacion }}</a>
                              </p>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>

                      <v-list-tile>
                        <v-list-tile-action>
                          <v-icon color="success">info</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                              <p class="body-2 font-weight-bold">
                                <a>Descripción de la actualización:</a>
                              </p>
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                              <p color="accent" class="caption font-weight-regular">
                                <a>{{ infoDialog.descripcionActualizacion }}</a>
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

    </v-layout> 
</template>
    
     
    <script> 
        import axios from 'axios'  
        import VeeValidate from 'vee-validate' 
        import moment from 'moment'
        import 'moment/locale/es';
        import alertify from 'alertifyjs';
        import { VueEditor } from "vue2-editor";
        import n401 from './401.vue'
        import n403 from './403.vue'
        import { error } from 'util';
        import pdf from 'vue-pdf'
        import UmixtaNavDrawer from './umixtaNavDrawer.vue';
    
        export default 
        {
            components: 
            {      
                "vue2-editor": VueEditor,
                n401,
                n403,
                pdf,
                UmixtaNavDrawer
            },
            data: () => 
            ({
                alert:false,
                showpage:true,
                e401:false,
                e403:false,
                
                //-------Logos-----------------------------------------/
                logo1:'',
                logo2:'',
                today:'',
                modulo:'',
                pospuestoswitch:false,    
                //*************** */
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
                headers: [
        
                    { text: 'Clave de actualización', value: 'claveActualizacion', sortable: true  }, 
                    { text: 'Fecha de actualización', value: 'fechaActualizacion', sortable: true  },             
                    { text: 'Nombre de la actualización', value: 'nombreActualizacion' }, 
                    { text: 'Opciones',value: 'Opciones' },       
                ],
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 20
                },
                //-----CLAIM------------------------------------------
                u_iddistrito:'',
                u_distrito:'',
                u_dirSubPro:'',
                u_idagencia:'',
                u_agencia:'',
                u_idmoduloservicio:'',
                u_modulo:'',
                u_idusuario:'',
                u_nombre:'',
                u_clave:'',
                u_rol:'',
                u_puesto:'',
                u_subproc:'',
                //----------------------------------------------------
                actualizaciones:[],
                show: true,
                agregarActualizacionDialog: false,
                archivoPdf: null, // Aquí se almacena el archivo seleccionado
                claveActualizacion:'',
                fechaActualizacion:'',
                fechaA:'',
                nombreActualizacion:'',
                shaCommit:'',
                realizadoPor:'',
                descripcionActualizacion:'',
                menu1: false,
                ramasRelacionadas:'',
                hayQuerys:false,
                mostrarUsuario:false,
                querysRelacionados:'',
                textov:'',
                urlS:'',
                ruta:'',
                dialogimagen: false,
                rutaconsulta: '',
                editedIndexA: 0,
                idActualizacion:'',
                dialogoinfo: false,
                infoDialog :[],
                //---------------------
                imageUrl: null,
                imageName: '',
                mostrarEnPanel:false,
                mensajeEnPanel:'',
                mostrarPDFPanel:false,
                moduloCentenario:'UMIXTA',
                infoFecha: '',


            }),
           
        created () 
        {
            let me = this 
                    
            me.u_iddistrito=me.$store.state.usuario.iddistrito;
            me.u_distrito=me.$store.state.usuario.distrito;
            me.u_dirSubPro=me.$store.state.usuario.dirSubProc;
            me.u_idagencia=me.$store.state.usuario.idagencia;
            me.u_agencia=me.$store.state.usuario.agencia;
            me.u_idmoduloservicio=me.$store.state.usuario.idmoduloservicio;
            me.u_modulo=me.$store.state.usuario.modulo;
            me.u_idusuario=me.$store.state.usuario.idusuario;
            me.u_nombre=me.$store.state.usuario.usuario;
            me.u_clave=me.$store.state.usuario.clave;
            me.u_rol=me.$store.state.usuario.rol;
            me.u_puesto=me.$store.state.usuario.puesto;
            me.u_subproc=me.$store.state.usuario.subProc;

            //*********************************************** */
            me.listarLogo();
            me.listarActualizaciones();
            
        },
        computed: {
            textViewUsers() 
            {
                if (this.mostrarUsuario) 
                    return "Los usuarios pueden ver esta actualizacion";
                else 
                    return "Los usuarios no pueden ver esta actualizacion";
            },

        },
        watch: {
            
        },
        methods:
        { 
            //Primera api para listar los logos institucionales si los requerimos
            listarLogo()
            {
            
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/ConfGlobals/Listar',configuracion).then(function(response)
                {
                    me.logo1= response.data.logo1;
                    me.logo2= response.data.logo2;
                    
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
                        me.$notify('Error al intentar listar los registros','error')    
                    } 
                });
            }, 
            //Funcion para el listado de Actualizaciones existentes
            listarActualizaciones()
            {
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                //En caso de ser el usuario administrador que ingresa se muetsra todas las actuializaciones
                if(me.u_idusuario == 'de814510-4e30-407d-94f3-4efbc536268a')
                {
                    this.$cat.get('api/Actualizaciones/Listar',configuracion).then(function(response)
                    {
                        me.actualizaciones = response.data;
                        
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
                            me.$notify('Error al intentar listar los registros','error')    
                        } 
                    });
                }
                else
                {
                    //En caso que no solo se listan las que son visibles para el publico en general
                    this.$cat.get('api/Actualizaciones/ListarUsuarios/UMIXTA',configuracion).then(function(response)
                    {
                        me.actualizaciones = response.data;
                        
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
                            me.$notify('Error al intentar listar los registros','error')    
                        } 
                    });
                }
                
            },
            //Funcion para inicial el proceso de guardado de la actualizacion, en este caso decidir si es con PDF y registro o puro registro
            guardarDocSiHay()
            {
                let me = this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                //Valido que todos los campos obligatorios esten corectamente llenados
                me.$validator.validate().then(result => {
                    if (result) 
                    {
                        //Los PDF no son obligatorios pero cabe mencionar que no es comun que no se suba uno, por ello aviso si es el caso.
                        if (me.imageFile) 
                        {
                            let formData = new FormData()
                            formData.append('file', me.imageFile )
                            me.GUID = me.generateUUID()

                            //Primera api para subir el documentop PDF 
                            this.$cat.post('api/Actualizaciones/SubirPdfAct/' + me.claveActualizacion + '/' + me.GUID, formData,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            }, configuracion).then(function(response) 
                            {
                                //Si se guarda correctamente se guardan las rutas envariables para su possterior uso en su guardado
                                me.urlS = response.data.urlS;
                                me.ruta = response.data.ruta;

                                me.guardarActualizacion();

                            }).catch(err => 
                            {
                                //Cacheo en general de un error
                                me.$notify('El documento no se logron guardar, contacta el equipo de Desarrollo de Sistemas', 'error')
                            });
                        }  
                        else
                        {
                            alert("No es obligatorio el PDF pero considera que no estas subiendo ninguno");
                            me.guardarActualizacion();
                        }
                    }
                    
                })
            },
            //Funcion para guarda o editar dependiendo de si selecciono la edicion
            guardarActualizacion()
            {
                let me = this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                //Se evalua si se trata de una actualizacion o un nuevo registro
                if(me.editedIndexA == 0)
                {
                    this.$cat.post('api/Actualizaciones/CrearActualizacion',
                    {
                        'ClaveActualizacion': me.claveActualizacion,
                        'FechaActualizacion': me.fechaActualizacion,
                        'NombreActualizacion' : me.nombreActualizacion,
                        'DescripcionActualizacion' : me.descripcionActualizacion,
                        'LigaServidor' : me.urlS,
                        'RutaDocumento' : me.ruta,
                        'RamasRelacionadas' : me.ramasRelacionadas,
                        'HayQuerys' : me.hayQuerys,
                        'QuerysRelacionados' : me.querysRelacionados,
                        'ShaCommitRepositorioCompilado' : me.shaCommit,
                        'RealizadoPor' : me.realizadoPor,
                        'MostrarUsuarios' : me.mostrarUsuario,
                        'MostrarAviso' : me.mostrarEnPanel,
                        'MensajeAviso' : me.mensajeEnPanel,
                        'MostrarPDFAviso' : me.mostrarPDFPanel,
                        'ModuloCentenario' : me.moduloCentenario,
                        
                    }, configuracion).then(function(response) 
                    {

                        //En caso de fallo se da aviso y tambien en caso de exito
                        if(response.data.exito == 0)
                        {
                            alert(response.data.aviso);
                        }
                        else
                        {
                            me.$notify('¡La información se guardo correctamente!', 'success');
                            me.limpiar();
                            me.listarActualizaciones();
                        }
                        

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
                            me.$notify('Error al intentar crear el  registro!!!','error')
                        }
                    });
                }
                else
                {
                    this.$cat.put('api/Actualizaciones/EditarActualizacion',
                    {
                        'IdActualizacion' : me.idActualizacion,
                        'ClaveActualizacion': me.claveActualizacion,
                        'FechaActualizacion': me.fechaActualizacion,
                        'NombreActualizacion' : me.nombreActualizacion,
                        'DescripcionActualizacion' : me.descripcionActualizacion,
                        'LigaServidor' : me.urlS,
                        'RutaDocumento' : me.ruta,
                        'RamasRelacionadas' : me.ramasRelacionadas,
                        'HayQuerys' : me.hayQuerys,
                        'QuerysRelacionados' : me.querysRelacionados,
                        'ShaCommitRepositorioCompilado' : me.shaCommit,
                        'RealizadoPor' : me.realizadoPor,
                        'MostrarUsuarios' : me.mostrarUsuario,
                        'MostrarAviso' : me.mostrarEnPanel,
                        'MensajeAviso' : me.mensajeEnPanel,
                        'MostrarPDFAviso' : me.mostrarPDFPanel,
                        'ModuloCentenario' : me.moduloCentenario,
                    
                    },configuracion).then(function (response) 
                    {
                        me.$notify('¡La información se guardo correctamente!', 'success');
                        me.limpiar();
                        me.listarActualizaciones();

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
                            me.$notify('Error al intentar crear el  registro!!!','error')
                        }
                    });
                }
                

            },
            desactivarAnuncio(item)
            {
                let me = this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                this.$cat.put('api/Actualizaciones/DesactivarAviso',
                    {
                        'IdActualizacion' : item.idActualizacion,
                        'MostrarAviso' : false,

                    },configuracion).then(function (response) 
                    {
                        me.$notify('¡La información se guardo correctamente!', 'success');
                        me.limpiar();
                        me.listarActualizaciones();

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
                            me.$notify('Error al intentar crear el  registro!!!','error')
                        }
                    });
            },
            //Funcion para cargar la informacion del registro en los componentes para su actualizacion
            editActualizacion(item)
            {

                let me = this;

                me.idActualizacion = item.idActualizacion;
                me.claveActualizacion = item.claveActualizacion;
                me.fechaActualizacion = item.fechaActualizacion.substring(0, 10);
                me.fechaA =item.fechaActualizacion.substring(8, 10) +" de " +me.obtenermes(item.fechaActualizacion.substring(5, 7) - 1) +" del " +item.fechaActualizacion.substring(0, 4);
                me.nombreActualizacion = item.nombreActualizacion;
                me.shaCommit = item.shaCommitRepositorioCompilado;
                me.ramasRelacionadas = item.ramasRelacionadas;
                me.realizadoPor = item.realizadoPor;
                me.hayQuerys = item.hayQuerys;
                me.mostrarUsuario = item.mostrarUsuarios;
                me.descripcionActualizacion = item.descripcionActualizacion;
                me.querysRelacionados = item.querysRelacionados;
                me.urlS = item.ligaServidor;
                me.ruta = item.rutaDocumento;
                me.querysRelacionados = item.querysRelacionados;
                me.urlS = item.ligaServidor;
                me.mostrarEnPanel = item.mostrarAviso;
                me.mensajeEnPanel = item.mensajeAviso;
                me.mostrarPDFPanel = item.mostrarPDFAviso;

                me.agregarActualizacionDialog = true;
                me.editedIndexA = 1;

            },
            //Funcion para habilitar la informacion general
            verInfo(item)
            {
                let me = this;

                me.infoDialog = item;
                me.dialogoinfo = true;

                me.infoFecha = me.formatearfechahora(item.fechaActualizacion)
            },
            handleFileUpload() {
                // Aquí puedes manejar la lógica de lo que ocurre al cargar el archivo
                console.log(this.archivoPdf); // Por ejemplo, podrías revisar la información del archivo subido
            },
            //Inician funciones para carga y vizualizaciones de PDF
            pickFile() 
            {
                this.removeImage()
                this.$refs.image.click()
            },
            onFilePicked(e) 
            {
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
            removeImage () 
            {
                this.$refs.image.value = ''
            },
            verDoc (item) 
            {
                var rutaCompleta = item.ligaServidor + item.rutaDocumento;
                var tipoArchivo = rutaCompleta.slice((rutaCompleta.lastIndexOf(".") - 1 >>> 0) + 2)
                if (!(tipoArchivo == "pdf" || tipoArchivo == "doc" || tipoArchivo == "docx")) 
                {
                this.rutaconsulta = rutaCompleta
                this.dialogimagen = true
                } else 
                {
                var win = window.open(rutaCompleta, '_blank')
                // Cambiar el foco al nuevo tab (punto opcional)
                win.focus()
                }
            },
            //Terminan funciones para carga y vizualizaciones de PDF
            fechainif() {
                if (this.menu1) {
                    this.generarfecha2();
                    this.$refs.menu1.save(this.fechaActualizacion);
                }
            },
            
            generarfecha2() {
                if (this.menu1)
                this.fechaA = 
                    this.fechaActualizacion.substring(8, 10) + 
                    " de " + 
                    this.obtenermes(this.fechaActualizacion.substring(5, 7) - 1) + 
                    " del " + 
                    this.fechaActualizacion.substring(0, 4);
            },
            formatearfechahora: function(fecha){
                return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
            },
            obtenermes: function (mes) {
                if (mes == 0) return "Enero";
                if (mes == 1) return "Febrero";
                if (mes == 2) return "Marzo";
                if (mes == 3) return "Abril";
                if (mes == 4) return "Mayo";
                if (mes == 5) return "Junio";
                if (mes == 6) return "Julio";
                if (mes == 7) return "Agosto";
                if (mes == 8) return "Septiembre";
                if (mes == 9) return "Octubre";
                if (mes == 10) return "Noviembre";
                if (mes == 11) return "Diciembre";
            },
            //Funcion para limpiar los componentes al agregar o editar una actualizacion
            limpiar()
            {
                let me = this;

                me.claveActualizacion = '';
                me.fechaA = '';
                me.fechaActualizacion = '';
                me.nombreActualizacion ='';
                me.shaCommit = '';
                me.realizadoPor = '';
                me.ramasRelacionadas='';
                me.hayQuerys = false;
                me.mostrarUsuario = false;
                me.descripcionActualizacion = '';
                me.querysRelacionados = '';
                me.editedIndexA = 0;
                me.idActualizacion = '';
                me.urlS = '';
                me.ruta = '';
                me.mostrarEnPanel = false;
                me.mensajeEnPanel = '';
                me.mostrarPDFPanel = false;

                me.imageFile = '';
                me.imageUrl= null;
                me.imageName= '';

                me.agregarActualizacionDialog = false;
            },
            //Funcion para generar id de tipo Guid
            generateUUID: function() 
            { 
                var d = new Date().getTime()

                if (typeof performance !== 'undefined' && typeof performance.now === 'function') 
                {
                    d += performance.now() //use high-precision timer if available
                }
                var newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) 
                {
                    var r = (d + Math.random() * 16) % 16 | 0
                    d = Math.floor(d / 16)
                    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
                })

                return newGuid
            },
        } 
    }
    </script>
    <style>

    </style>