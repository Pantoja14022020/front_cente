 <template>  
<v-layout align-start>
    <v-navigation-drawer v-model="drawer" app v-if="logueado" class="primary"  >
        <div class="text-xl-center text-md-center text-xs-center my-4">
            <img src="@/assets/Logo.png" height="110px" alt=""> 
        </div>
  
        <v-list dense dark class="pt-0 primary" >
          <template>
            <v-list-tile  :to="{name:'mcaptura'}">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">home</v-icon>
              </v-list-tile-action>
              <v-list-tile-title class="white--text">Inicio</v-list-tile-title>
            </v-list-tile>
          </template>  
            
          
  
          <template v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador">
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                    Carpetas
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-registro'== '#' ? '' :  'mcaptura-registro'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">group</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Registro
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador" :to="{ name: 'mcaptura-listacarpetas'== '#' ? '' :  'mcaptura-listacarpetas'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">view_list</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Lista de carpetas asignadas
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
            </v-list-group>
          </template>
  
          <template v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador">
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Seguimiento a carpeta
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador" :to="{ name: 'mcaptura-informaciongeneral'== '#' ? '' :  'mcaptura-informaciongeneral'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">perm_contact_calendar</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Información general.
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-victimaimputado'== '#' ? '' :  'mcaptura-victimaimputado'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">face</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Víctima(s) directa, indirecta, testigo y/o imputado.
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-delito'== '#' ? '' :  'mcaptura-delito'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">dashboard</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Delito
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-vehiculo'== '#' ? '' :  'mcaptura-vehiculo'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">commute</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Vehiculo
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esFacilitador" :to="{ name: 'mcaptura-justiciarestaurativa'== '#' ? '' :  'mcaptura-justiciarestaurativa'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">event_seat</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Justicia restaurativa
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-medidasproteccion'== '#' ? '' :  'mcaptura-medidasproteccion'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">description</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Medidas de protección
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-medidascautelares'== '#' ? '' :  'mcaptura-medidascautelares'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">label</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Medidas cautelares
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-resolucion'== '#' ? '' :  'mcaptura-resolucion'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">verified_user</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Resolución
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </template>
        
        </v-list>
      </v-navigation-drawer>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
      <v-flex v-if="showpage">
        <v-toolbar flat color="white">

            <v-toolbar-title class="font-weight-regular" >Medidas de Protección</v-toolbar-title>
            
            <v-divider class="mx-2" inset vertical></v-divider>
            
            <v-spacer></v-spacer>

            <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
            <v-flex xs12 sm6 md3>
            
                <v-text-field class="font-weight-regular"
                    v-model="nuc" disabled  prepend-icon="folder"
                    filled
                ></v-text-field>

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
                    
        </v-toolbar>

        <v-data-table
            :headers="headers"
            :items="medidasproteccions"
            :search="search" 
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination">
            
            <template slot="items" class="white" slot-scope="props">
                
                <td>{{ props.item.victima}}</td>  
                <td>{{ props.item.fInicio}}</td> 
                <td>{{ props.item.fVencimiento}}</td>  
                
                <td class="justify-center layout px-0">

                    <v-tooltip bottom   >
                        <template v-slot:activator="{ on }">
                            <v-icon 
                                class="mr-2" v-on="on"  
                                @click="vermedidas(props.item)"
                                >
                                chrome_reader_mode
                            </v-icon> 
                        </template>
                        <span>Ver medidas</span>
                    </v-tooltip>  
                    <v-tooltip  bottom   >
                        <template v-slot:activator="{ on }">
                            <v-icon 
                                class="mr-2" v-on="on"  
                                @click="edititem(props.item)"
                                >
                                edit
                            </v-icon> 
                        </template>
                        <span>Editar medida de proteccíon</span>
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
                    
                    <v-toolbar-title>{{formTitle}}.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>               
                        <v-btn color=success text @click="guardar()">Guardar</v-btn>
                        <v-btn icon   @click="dialogo = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
        
                <v-card-text>
                    <v-form ref="form"  data-vv-scope="agregar">  
                    
                        <v-container grid-list-md >
                            <v-layout row wrap>                              
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                
                                    <v-autocomplete 
                                        name="víctima"   
                                        :items="victimas"
                                        v-model="victima"
                                        v-validate="'required'" 
                                        label="*Víctimas:"
                                        data-vv-scope="agregar"
                                        attach
                                        chips
                                        deletable-chips
                                        multiple
                                        :error-messages="errors.collect('agregar.víctima')">
                                    </v-autocomplete>   

                                    <v-menu
                                        ref="menu2"
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        :return-value.sync="fechavencimiento"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px">
                                            
                                        <template v-slot:activator="{ on }">

                                            <v-text-field
                                                :value="fechav"
                                                label="Fecha de Terminación:"
                                                prepend-icon="event"
                                                clearable 
                                                readonly
                                                v-on="on">
                                            </v-text-field>
                                        </template>

                                        <v-date-picker locale="es-mx"  v-model="fechavencimiento" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>                                      
                                    
                                        
                                </v-flex>

                                
                                <v-flex class="espaciado" xs12 sm12 md6 lg6 >
                                                                                                
                                    <v-menu
                                        ref="menu1"
                                        v-model="menu1"
                                        :close-on-content-click="false"
                                        :return-value.sync="fechainicio"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px">                                      
                                        <template v-slot:activator="{ on }">

                                            <v-text-field
                                                :value="fechai"
                                                label="Fecha de Inicio:"
                                                prepend-icon="event"
                                                clearable 
                                                readonly
                                                v-on="on"
                                            ></v-text-field>

                                        </template>
                                        <v-date-picker  locale="es-mx"  v-model="fechainicio" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                            <v-btn text color="primary"  @click="fechainif()" >OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                        
                                </v-flex>

                                <v-flex  class="espaciado" xs12 sm12 md12 lg12 > 

                                    <v-autocomplete name="medidas de protección" 
                                        :items="nomedidas"
                                        v-model="nomedida" 
                                        label="Medidas de protección:"
                                        return-object 
                                        attach
                                        chips
                                        deletable-chips
                                        multiple
                                        v-on:change="ordenar"
                                        :error-messages="errors.collect('agregar.institucíon')">
                                    </v-autocomplete>   

                                </v-flex>

                            </v-layout>
                        </v-container> 
                    </v-form>
                </v-card-text>
                  
                <v-divider></v-divider>
        
            </v-card>

        </v-dialog>


        <v-dialog  v-model="diaologomedidas"  max-width="1000px" >
                                
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">

                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">chrome_reader_mode</v-icon>
                    </v-avatar>        
                
                    <v-toolbar-title class="subheading">Medidas de protección de registro</v-toolbar-title>

                    <v-spacer></v-spacer>        
            
                </v-toolbar>

                <v-card-text>
                    <v-form  data-vv-scope="datosdestinatario">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>                                      
                                    
                                    <v-data-table
                                        :headers="headers2"
                                        :items="medidasregistro"
                                        :search="search" 
                                        :rows-per-page-items="rowsPerPageItems"
                                        :pagination.sync="pagination" >
                                        
                                        <template slot="items" class="white" slot-scope="props">
                                            
                                            <td>{{ props.item.clave}}</td>   
                                            <td>{{ props.item.descripcion}}</td> 
                                            
                                        </template>                                        
                                    </v-data-table>

                                </v-flex>
                            </v-layout>
                        </v-container>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn   @click="diaologomedidas = false" >Cerrar</v-btn>                                                                                                   
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
  import { WebCam } from "vue-web-cam";
  import { VueEditor } from "vue2-editor";
  import { error } from 'util';
  import moment from 'moment'
  import 'moment/locale/es';
  import alertify from 'alertifyjs';
  import n401 from './401.vue'
  import n403 from './403.vue' 

  

  var assert, curp, persona;
  assert = require('assert');
  curp = require('curp.js');  

  export default {
    components: {
        
        "vue2-editor": VueEditor,
        n401,
        n403
    },
    data: () => ({
        alert:false,
        dialog: false, 
        rahid:'',
        rAtencionId:'',
        rHechoId:'', 
        agenciaid:'',
        nuc:'',
        showpage:true,
        e401:false,
        e403:false,
        //-------Logos-----------------------------------------/
        logo1:'',
        logo2:'',
        //*************** */
           dialogo:'',
           medidasproteccions:[],
           victima:[],
           victimas:[],
           imputados:[],
           imputado:[],
           dia:'',
           mes:'',
           año:'',
           hr:'',
           fecha:'',
           delitos:[],
           delito:[],
           rBreve:'',
           personal:'',
           direccionesc:'',
           domicilioPersona:'',
           medidasdp:'',
           duracion:'',
           instituciones:[],
           institucion:[],
           fechainicio:'',
           fechavencimiento:'',
           fechai:'',
           fechav:'',
           menu1:false,
           menu2:false,
           dialogoampliacion:false,
           menu3:false,
           menu4:false,
           fechaampliacion:'',
           fechaterminaampliacion:'',
           fechaa:'',
           fechat:'',
           idMProteccion:'',
           destinatarion:'',
           domicilion:'',
           dialogodestinatario : false,
           modaldocumento : false,
           texto:'',
           titulo:'',
           tmunicipio:'',
           thora:'',
           comilla:'"',
           agenciainfo:'',
           textodocumento:'',
           textodocumento2:'',
           textodocumento3:'',
           textofinaldestinatario:false,
           textodestinatario: "",
           itemsdestino:'',
           dia : moment().format('DD'),
           mes : moment().format('MMMM'),
           año: moment().format("YYYY") ,
           modaldocumento2:false,
           vistapreviaac:false,
           acnombre:'',
           acpuesto:'',
           acagencia:'',
           numerooficio:'',
           numerooficion:'',
           estadoimputado:false,
           nomedidas:[],
           nomedida:[],
           medidasregistro:[],
           diaologomedidas:false,
           textof:'',
           dialogoinfo:false,
           idelitos:'',
           ivictimas:'',
           iimputados:'',
           iinstitucion:'',
        //*************** */
        
        headers: [

            { text: 'Víctima', value: 'victima', sortable: true  }, 
            { text: 'Fecha de inicio', value: 'fInicio', sortable: true  }, 
            { text: 'Fecha de termino', value: 'fVencimiento', sortable: true  }, 
            { text: 'Opciones', value: 'opciones', sortable: false },

                             
        ],
        headers2: [
            { text: 'Clave', value: 'clave', sortable: true  }, 
            { text: 'Descripcción', value: 'descripcion', sortable: true  },                           
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
        rowsPerPageItems: [5, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
        editedIndex: 0, 
        modalAdd:false,
        
        //********************************/
        

        rac:'',
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
    }),
       
    created () {
        let me = this 
        me.rHechoId =  me.$store.state.rhechoid;
        me.nuc = me.$store.state.nuc;
        me.rAtencionId = me.$store.state.ratencionid;
        if (me.rHechoId== null)
        {
                me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpetas y luego en Lista de carpetas asignadas y  ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.', 
                function(){ 

                        me.$router.push('./mcaptura-listacarpetas')
                })
        }
        else{
                me.$notify('Carpeta abierta correctamente !!!','success')
                

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
               
                me.listar();
                me.listarLogo();
                me.listarPersonas();
                me.listarrHecho(); 
                me.listardelitos();
                me.listarrah();
                me.listarInstituciones();
                me.listarnomedidas();
               
        }
      
      
      // Add a request interceptor
        axios.interceptors.request.use( (config)=> {
          // Do something before request is sent
        console.log(config);
          this.$store.commit('LOADER',true);
          return config;
        }, (error)=> {
          // Do something with request error
          this.$store.commit('LOADER',false);
          return Promise.reject(error);
        });

          // Add a response interceptor
          axios.interceptors.response.use((response)=>{
          console.log(response);
          this.$store.commit('LOADER',false);
          // Do something with response data
          return response;
        },  (err)=> {
        
          // Do something with response error
          return new Promise( (resolve, reject)=> {
            this.$store.dispatch('logout').then(()=>{
              this.$router.push('/login')
            })
            throw err;
          });
        });

    },
    computed: {
        formTitle () {
                return this.editedIndex === -1 ? 'Nueva medida de protección' : 'Actulizar medida de protección'
            },
        formIcon () {
                return this.editedIndex === -1 ? 'add' : 'assignment'
            },
        textosino(){
            if(this.estadoimputado)
            return 'Si'; else return 'No';
        },
        logueado(){
                return this.$store.state.usuario;
        },
        esAdministrador(){ 
            return this.$store.state.usuario && this.$store.state.usuario.rol =='Administrador';
        },
        esRecepcion(){ 
            return this.$store.state.usuario && this.$store.state.usuario.rol =='Recepción';
        },
        esAMPOAMP(){
            return this.$store.state.usuario && this.$store.state.usuario.rol =='AMPO-AMP';
        },
        esDirector(){
            return this.$store.state.usuario && this.$store.state.usuario.rol =='Director';
        },
        esCoordinador(){
            return this.$store.state.usuario && this.$store.state.usuario.rol =='Coordinador';
        },
        esAmpoMixto(){
            return this.$store.state.usuario && this.$store.state.usuario.rol =='AMPO-AMP Mixto';
        },
        esFacilitador(){ 
            return this.$store.state.usuario && this.$store.state.usuario.rol =='Facilitador';
        },
        usuario(){
            return this.$store.state.usuario.usuario;
        },
        email(){
            return this.$store.state.usuario.email;
        },
        drawer(){
            return this.$store.drawer 
        }
    },
    watch: {
        
    },
    methods:{ 
        edititem (item) {  

            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.nomedida = []
            axios.get('api/MedidasProteccion/ListarNoMedidas/'+ item.idMProteccion,configuracion).then(function(response){
                me.medidasregistro=response.data;

                me.medidasregistro.forEach(function(x){
                    me.nomedida.push({text:x.clave +" - " + x.descripcion, value:x.clave +" - " + x.descripcion,numerico:me.convertir(x.clave), clave: x.clave, descripcion: x.descripcion })

                })
                me.nomedida.sort((a, b) => (a.numerico > b.numerico) ? 1 : -1)
                me.editedIndex = 1;    
                me.dialogo = true;
                me.vistapreviaac=false;
                me.idMProteccion = item.idMProteccion;
                me.fecha = item.fechahora;
                me.domicilioPersona = item.domicilio;                            
                me.delito =   item.delito;
                me.medidasdp= item.medidaProtecion;
                me.duracion=item.duracion;
                me.institucion=item.institucionejec;
                me.numeromedida =item.nomedidas;
                me.fechai = item.fInicio;
                me.fechav = item.fVencimiento;       
                me.acnombre=item.usuario;
                me.acpuesto = item.puesto;
                me.acagencia= item.uAgencia;
                me.textof =  item.textofinaldetalle


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
                    me.$notify('Error al intentar listar los registros!!!','error')    
                } 
            });
        },
        cerrarcarpeta () {
                this.$store.state.rhechoid = null;
                this.$store.state.nuc= null;
                this.$router.push('./listacarpetas')
            },
        listarrHecho(){
               

            let me=this;   
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            axios.get('api/RHechoes/ListarPorId/' +me.rHechoId,configuracion).then(function(response){  
                console.log(response.data);

                me.agenciaid = response.data.agenciaid,                 
            
                me.informacionagencia();
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
                    me.$notify('Error al intentar listar los registros!!!','error')    
                } 
            });
                
        },    
        agregar(){
            this.limpiar();
            this.generarfecha();
            this.editedIndex = -1;
            this.dialogo= true;
            this.vistapreviaac=false;
        },
        fechainif(){
            if(this.menu1){
                this.generarfecha2();
            this.$refs.menu1.save(this.fechainicio);
            }
            if(this.menu2){
                this.generarfecha2();
            this.$refs.menu2.save(this.fechavencimiento);
            }
            if(this.menu3){
                this.generarfecha2();
            this.$refs.menu3.save(this.fechaampliacion);
            }
            if(this.menu4){
                this.generarfecha2();
            this.$refs.menu4.save(this.fechaterminaampliacion);
            }          
        },
        listarLogo(){
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/ConfGlobals/Listar').then(function(response){
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
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
    
        },     
        limpiar(){    
            this.listar();
            this.modaldocumento=false;
            this.victima=[];
            this.imputado=[];
            this.delito =[];
            this.medidasdp='';
            this.duracion='';
            this.institucion=[];
            this.nomedida ='';
            this.domicilion ='';
            this.fechai = ''
            this.fechav= ''
            this.domicilioPersona='';
            this.fechaa=''
            this.fechat=''  
            this.numeromedida = '';
            this.textofinaldestinatario=false,
            this.textodestinatario= "",
            this.itemsdestino=''
            this.numerooficio = ''
            this.numerooficion = ''
            this.nomedida = []
            this.textof = ""
        },
        generarfecha(){
            let me=this; 
            me.dia = moment().format('DD');
            me.mes = moment().format('MMMM')
            me.año= moment().format("YYYY") 
            me.hr= moment().format('h:mm a')
            me.fecha = me.hr +" horas del dia "+ me.dia + " de " + me.mes  + " de " + me.año  ;      
        },
        generarfecha2(){
             
            if(this.menu1) 
            this.fechai =this.fechainicio.substring(8,10) +" de "+ this.obtenermes(this.fechainicio.substring(5,7)-1)+
            " del "+ this.fechainicio.substring(0,4);  
            if(this.menu2)
            this.fechav =this.fechavencimiento.substring(8,10) +" de "+ this.obtenermes(this.fechavencimiento.substring(5,7)-1)+
            " del "+ this.fechavencimiento.substring(0,4);  
            if(this.menu3) 
            this.fechaa =this.fechaampliacion.substring(8,10) +" de "+ this.obtenermes(this.fechaampliacion.substring(5,7)-1)+
            " del "+ this.fechaampliacion.substring(0,4);  
            if(this.menu4)
            this.fechat =this.fechaterminaampliacion.substring(8,10) +" de "+ this.obtenermes(this.fechaterminaampliacion.substring(5,7)-1)+
            " del "+ this.fechaterminaampliacion.substring(0,4);  

        },
        generarfecha3(fecha){ 
            var fechaf =fecha.substring(8,10) +" de "+ this.obtenermes(fecha.substring(5,7)-1)+
            " del "+ fecha.substring(0,4);       
            return fechaf;
        },
        obtenermes: function(mes){
            if(mes==0) return "Enero"
            if(mes==1) return "Febrero"
            if(mes==2) return "Marzo"
            if(mes==3) return "Abril"
            if(mes==4) return "Mayo"
            if(mes==5) return "Junio"
            if(mes==6) return "Julio"
            if(mes==7) return "Agosto"
            if(mes==8) return "Septiembre"
            if(mes==9) return "Octubre"
            if(mes==10) return "Noviembre"
            if(mes==11) return "Diciembre"

        },
        agregarampliacion(item){
            this.limpiar();
            this.dialogoampliacion= true;
            this.generarfecha();
            this.idMProteccion = item.idMProteccion;
        },
        listar(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            axios.get('api/MedidasProteccion/Listar/'+ me.rHechoId,configuracion).then(function(response){
                me.medidasproteccions=response.data;
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
                    me.$notify('Error al intentar listar los registros!!!','error')    
                } 
            });
    
        },
        imprimir(item){
            this.textof = item.textofinaldetalle
            this.numerooficio = item.numeroOficio
            this.mostrarpdf(item.usuario, item.puesto, item.uagencia)
            this.modaldocumento = false
        },
        listarPersonas(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var contador=0
            var personasArray=[];
            axios.get('api/RAPs/ListarTodosVic/'+ me.rAtencionId,configuracion).then(function(response){
                //console.log(response.data)
                personasArray=response.data;               
                personasArray.map(function(x){
                    me.victimas.push({text: x.nombreCompleto,value:x.nombreCompleto});
                    contador++;
                });

                axios.get('api/RAPs/ListarTodosImp/'+ me.rAtencionId,configuracion).then(function(response){
                        //console.log(response.data)
                        personasArray=response.data;                                      
                        personasArray.map(function(x){
                            me.imputados.push({text: x.nombreCompleto,value:x.nombreCompleto});                 
                        });
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
                            me.$notify('Error al intentar listar los registros!!!','error')    
                        } 
                    }); 

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
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });  
    
        },
        listardelitos(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var delitosArray=[];
            axios.get('api/RDHs/ListarPorHecho/'+ me.rHechoId,configuracion).then(function(response){
                //console.log(response.data)
                delitosArray=response.data;
                delitosArray.map(function(x){
                me.delitos.push({text: x.nombreDelito,value: x.nombreDelito});
                    
                });
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
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
    
        }, 
        listarnomedidas(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var medidasarray=[];
            me.$conf.get('api/MedidasProteccionC/Listar',configuracion).then(function(response){
                //console.log(response.data)
                medidasarray=response.data;
                medidasarray.map(function(x){
                    me.nomedidas.push({text: x.clave + " - " + x.descripcion,value: x.clave + " - " + x.descripcion,numerico:me.convertir(x.clave), clave: x.clave, descripcion: x.descripcion });            
                });
                me.nomedidas.sort((a, b) => (a.numerico > b.numerico) ? 1 : -1)
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
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
            });
    
        }, 
        convertir(romano){
            if(romano == 'I')
                return 1;
            if(romano == 'II')
                return 2;
            if(romano == 'III')
                return 3;
            if(romano == 'IV')
                return 4;
            if(romano == 'V')
                return 5;
            if(romano == 'VI')
                return 6;
            if(romano == 'VII')
                return 7;
            if(romano == 'VIII')
                return 8;
            if(romano == 'IX')
                return 9;
            if(romano == 'X')
                return 10;
            if(romano == 'XI')
                return 11;
            if(romano == 'XII')
                return 12;
            if(romano == 'XIII')
                return 13;
            if(romano == 'XIV')
                return 14;
            if(romano == 'XV')
                return 15;
            if(romano == 'Na')
                return 99;
        },
        ordenar(){ 
            let me = this;
            this.nomedida.sort((a, b) => (a.numerico > b.numerico) ? 1 : -1)
            this.medidasdp = ""
            this.nomedida.forEach(function(x){
                me.medidasdp += x.text + 
                "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>";
            })   
        }, 
        listarrah(){
               
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            axios.get('api/RHechoes/ListarPorId/' +me.rHechoId,configuracion).then(function(response){                   
                me.rBreve = response.data.rBreve;
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
                    me.$notify('Error al intentar listar los registros!!!','error')    
                } 
            });
        },
        listarInstituciones(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var institucionessArray=[];
            this.$conf.get('api/Instituciones/Listar',configuracion).then(function(response){
                //console.log(response.data)
                institucionessArray=response.data;
                institucionessArray.map(function(x){
                    me.instituciones.push({text: x.nombre,value: x.nombre});
                });
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
                    me.$notify('Error al intentar listar los registros!!!','error')    
                } 
            });  
    
        },
        informacionagencia(){

            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia,configuracion).then(function(response){
                me.agenciainfo=response.data;
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
                    me.$notify('Error al intentar listar los registros!!!','error')    
                } 
            }); 
    
         },
        guardar(){ 
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            
            var imputados="", victimas="",instituciones="", delitos="";
                        
            for(var i = 0 ; i< me.imputado.length; i++){
                imputados += me.imputado[i]

                if(i+1 != me.imputado.length)
                    imputados += ", "
            }

            for(var i = 0 ; i< me.victima.length; i++){
                victimas += me.victima[i]

                if(i+1 != me.victima.length)
                    victimas += ", "
            }

            for(var i = 0 ; i< me.institucion.length; i++){
                instituciones += me.institucion[i]

                if(i+1 != me.institucion.length)
                    instituciones += ", "
            }

            for(var i = 0 ; i< me.delito.length; i++){
                delitos += me.delito[i]

                if(i+1 != me.delito.length)
                    delitos += ", "
            }

                if(this.editedIndex == -1){

                    me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar la información ',           
                    function(){
                        

                    axios.post('api/MedidasProteccion/Crear',{  
                        'rHechoId': me.rHechoId, 
                        'victima': victimas,
                        'imputado': imputados,
                        'lugar': me.u_distrito,
                        'fechahora': me.fecha,
                        'agente': me.u_nombre,
                        'nuc': me.nuc,
                        'delito': delitos,
                        'narrativa': me.rBreve,
                        'domicilio': "",
                        'telefono': "",
                        'medidaProtecion': me.medidasdp,
                        'duracion': 0,
                        'institucionejec': instituciones,
                        'agencia': me.u_agencia,
                        'nomedidas': me.nomedida.length,
                        'destinatarion': "na",
                        'domicilion':"na",
                        'fInicio': me.fechai,
                        'fVencimiento': me.fechav,
                        'ampliacion': false,
                        'fAmpliacion':"na",
                        'FterminoAm': "na",
                        'ratificacion': "na",
                        'distrito': me.u_distrito,
                        'subproc': me.u_dirSubPro,
                        'uagencia': me.u_agencia,
                        'usuario': me.u_nombre,
                        'puesto': me.u_puesto,
                        'modulo': me.u_modulo,
                        'textofinal': me.textodocumento,
                        'textofinal2': me.textodocumento3,
                        'textofinaldetalle' : me.textof,
                        'detalleactivo': false,
                        'numeroOficio': me.numerooficio,
                        'numeroOficioN': ""

                    },configuracion).then(function(response){  

                        me.$notify('La información se guardo correctamente !!!','success') 
                        
                        me.nomedida.forEach(function(x){
                        
                        axios.post('api/MedidasProteccion/CrearNomedida',{   

                            'Clave': x.clave,
                            'Descripcion': x.descripcion,
                            'MedidasproteccionId': response.data.idmedidaprotecion,
                        
                        },configuracion).then(function(response){  

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

                    })
                    
                    me.dialogo=false;    
                    me.listar();
                    me.limpiar(); 
                    
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
                function(){
                alertify.warning('Verifica la información')
            }
            ).set('labels', {ok:'Guardar', cancel:'Cancelar'});

                }else{
                    
                    me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas actualizar la información ',           
                    function(){    
                        
                        
                        axios.delete('api/MedidasProteccion/Eliminar/'+ me.idMProteccion, configuracion).then(function(response){
                         
                     
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
                                me.$notify('Error al intentar lisatar los registros!!!','error')   
                            } 
                        });

                        axios.put('api/MedidasProteccion/Actualizar',{
                            'idMProteccion': me.idMProteccion,
                            'victima': victimas,
                            'imputado': imputados,
                            'delito':delitos,
                            'domicilio': me.domicilioPersona,
                            'telefono':me.victima.telefono,
                            'medidaProtecion': me.medidasdp,
                            'duracion': 0,
                            'institucionejec': instituciones,
                            'nomedidas': me.nomedida.length,
                            'fInicio' : me.fechai,
                            'fVencimiento': me.fechav,
                            'textofinal': me.textodocumento,
                            'textofinal2': me.textodocumento3,
                            'textofinaldetalle' : me.textof

                        },configuracion).then(function(response){                            
                            me.$notify('La información se actualizo correctamente !!!','success')

                            me.nomedida.forEach(function(x){
                                
                                axios.post('api/MedidasProteccion/CrearNomedida',{   
                                    'Clave': x.clave,
                                    'Descripcion': x.descripcion,
                                    'MedidasproteccionId': me.idMProteccion,
                                
                                },configuracion).then(function(response){  

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

                            })
                            me.dialogo=false;    
                            me.listar();
                            me.limpiar();          
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
                                me.$notify('Error al intentar actualizar el registro!!!','error')   
                            } 
                        });  
    
                    },
                    function(){
                    alertify.warning('Verifica la información')
                        }
                     ).set('labels', {ok:'Actualizar', cancel:'Cancelar'});

                }
                
        },
        vermedidas(item){

            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            axios.get('api/MedidasProteccion/ListarNoMedidas/'+ item.idMProteccion,configuracion).then(function(response){
                me.medidasregistro=response.data;
                me.diaologomedidas = true;
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
                    me.$notify('Error al intentar listar los registros!!!','error')    
                } 
            });

        },
        verinfoadiccional(item){
            this.ivictimas = item.victima
            this.iimputados = item.imputado
            this.idelitos = item.delito
            this.iinstitucion = item.institucionejec
            this.dialogoinfo = true
        },  
      } 
   }
</script>
<style>
.espaciado{
    padding: 30px !important; 
}

</style>