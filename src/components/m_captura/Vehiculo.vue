 <template>  
<v-layout align-start>
    <v-navigation-drawer v-model="drawer" app v-if="logueado" class="primary"  >
        <div class="text-xl-center text-md-center text-xs-center my-4">
            <a href="/"><img src="@/assets/Logo.png" height="110px" alt=""></a>
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

            <v-toolbar-title class="font-weight-regular" >Vehiculos</v-toolbar-title>
            
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
            :items="vehiculos"
            :search="search" 
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
                >
            
            <template slot="items" class="white" slot-scope="props">
                
                
                <td>{{ props.item.estadov}}</td>  
                <td>{{ props.item.marca}}</td>   
                <td>{{ props.item.tipo }}</td>   
                <td>{{ props.item.modelo }}</td> 
                <td>{{ props.item.serie }}</td> 
                <td>{{ props.item.placas }}</td> 
                <td>{{ props.item.color }}</td> 
                <td>{{ props.item.ano }}</td> 

                <td class=""> 
                    <v-tooltip bottom   >
                        <template v-slot:activator="{ on }">
                            <v-icon 
                                class="mr-2" v-on="on"  
                                @click="edititem(props.item)"
                                >
                                edit
                            </v-icon> 
                        </template>
                        <span>Editar registro </span>
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
                        <v-btn  color=success text @click="guardar()">Guardar</v-btn>
                        <v-btn icon   @click="dialogo = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>

                </v-toolbar>
            
                <v-card-text>
                    <v-form ref="form" data-vv-scope="dialogo1">  

                        <v-container grid-list-md text-xs-center>
                            <v-layout row wrap>
                                            
                            <v-flex class="espaciado" xs6 sm6 md3 lg3 >  
                                    <v-autocomplete 
                                        name="estado"   
                                        :items="estados"
                                        v-model="estadov" 
                                        return-object                                               
                                        label="Estado:" >
                                    </v-autocomplete>
                            </v-flex>

                            <v-flex 
                                    class="espaciado" xs6 sm6 md3 lg3>                           
                                    <v-switch v-if="estadov.value2 == 2"
                                    color="success"
                                    v-model="estadorobado"
                                    :label="`Estado Robado: ${textorobado}`"
                                    ></v-switch>                          
                            </v-flex>

                            <v-flex 
                                    class="espaciado" xs6 sm6 md3 lg3 >                          
                                    <v-switch v-if="estadov.value2 ==  2 "
                                    color="success"
                                    v-model="recuperado"
                                    :label="`Decomisado: ${textosino}`"
                                    ></v-switch>                           
                            </v-flex>

                                <v-flex 
                                    class="espaciado" xs6 sm6 md3 lg3>
                                    <v-switch v-if="estadov.value2 == 2 && recuperado "
                                    color="success"
                                    v-model="devuelto"
                                    :label="`Devuelto: ${textosino2}`"
                                    ></v-switch>
                                </v-flex>

                                <v-flex class="espaciado" xs12 sm12 md6 lg6 >

                                    <v-autocomplete 
                                        name="marca"   
                                        :items="marcas"
                                        v-model="marca" 
                                        return-object
                                        @change="listarModelos()"   
                                        label="Marca:" >
                                    </v-autocomplete>

                                    <v-autocomplete 
                                        name="tipo"   
                                        :items="tipos"
                                        v-model="tipo" 
                                        data-vv-scope="dialogo1"
                                        v-validate="'required'"                          
                                        label="*Tipo:"
                                        :error-messages="errors.collect('dialogo1.tipo')">
                                    </v-autocomplete>

                                    <v-autocomplete 
                                        name="modelo"   
                                        :items="modelos"
                                        v-model="modelo"  
                                        label="Modelo:" >
                                    </v-autocomplete>

                                    <v-text-field 
                                        name="serie" 
                                        label="Serie:" 
                                        v-model="serie">                                        
                                    </v-text-field>   

                                    <v-autocomplete 
                                        name="dueño"   
                                        :items="duenos"
                                        v-model="dueno"                                     
                                        label="*Dueño:"
                                        v-validate="'required'"                          
                                        :error-messages="errors.collect('dueño')">
                                    </v-autocomplete>


                            </v-flex>

                                
                            <v-flex class="espaciado" xs12 sm12 md6 lg6  > 
          
                                    <v-autocomplete 
                                        v-if="estadov.value2 ==  2 && devuelto && recuperado" 
                                        name="defodep"   
                                        :items="definitivaodep"
                                        v-model="defdep"                                     
                                        return-object
                                        label="Status Vehiculo:">
                                    </v-autocomplete>
                                

                                    <v-text-field name="placa" 
                                        label="*Placas:" 
                                        v-model="placa"   
                                        data-vv-scope="dialogo1"
                                        v-validate="'required'"  
                                        :error-messages="errors.collect('dialogo1.placa')"> 
                                    </v-text-field>

                                    <v-autocomplete name="color"   
                                        :items="colores"
                                        v-model="color" 
                                        data-vv-scope="dialogo1"
                                        label="*Color:"
                                        :error-messages="errors.collect('dialogo1.color')">
                                    </v-autocomplete>

                                    <v-autocomplete name="año"   
                                        :items="anos"
                                        v-model="ano" 
                                        data-vv-scope="dialogo1"
                                        v-validate="'required'" 
                                        label="*Año:"
                                        :error-messages="errors.collect('dialogo1.año')">
                                    </v-autocomplete>  

                                    <v-text-field 
                                        name="número de serie de motor" 
                                        label="Número de serie de motor:" 
                                        v-model="motorserie"    >                                        
                                    </v-text-field>  

                                                    
                            </v-flex>

                                <v-flex  class="espaciado" xs12 sm12 md12 lg12  >                           
                                    <v-card elevation="0" >
                                        <v-card-title ><h3>Señas Particulares</h3></v-card-title>
                                        <v-divider ></v-divider>
                                        <v-card-text>
                                            <v-form   data-vv-scope="form1"> 
                                                <vue-editor  
                                                    name="señas particulares" 
                                                    v-model="senasparticulares" 
                                                    :editorToolbar="customToolbar"  >
                                                </vue-editor>
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
  import { WebCam } from "vue-web-cam";
  import { VueEditor } from "vue2-editor";
  import { error } from 'util';
  import n401 from './401.vue'
  import n403 from './403.vue' 
  import moment from 'moment'
  import 'moment/locale/es';

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
        nuc:'',
        showpage:true,
        e401:false,
        e403:false,
        //*************** */
            vehiculos:[],
            estado:false,
            estadorobado:false,
            estadov:'',
            defdep:false,
            marcaid:[],
            placa:'',
            color:'',
            ano:'',
            recuperado:false,
            devuelto:false,  
            senasparticulares:'',  
            marcas:[],
            marca:'',
            marca2:'',
            tipos:[],
            tipo:'',
            modelos:[],
            modelo:'',
            serie:'',
            colores:[],
            duenos:[],
            dueno:'',
           
            anos:[],
            senasparticulares:'',
            fecharegistro: ((new Date().getDate())+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear()),
            fechasys: new Date(),
            search:'',
            dialogo:false,
            idvehiculo:'',
            motorserie:'',
            recepcion:'',
            delitos:[],
            delito:'',
            direcciondelito:'',
            municipiodelito:'',
            propietarios:[],
            propietario:'',
            denunciantes:[],
            denunciante:'',
            domiciliodenunciante:'',
            modaldocumento:false,
            agenciaid:'',
            agenciainfo:[],
            fechahorasuceso:'',
            fechahorasucesof:'',
            numerooficio:'',
            ubicacion:'',
            fechaactual:'',
            dialogarchivo:false,
            idvehiculo:'',
            imageName: '',
            imageUrl: null,
            imageFile: '',
            archivos:[],
            dialogpictures:'',
            descripciondocumento:'',
            tiposdocumentos:[
            {text:'Factura original',value:'1'},
            {text:'Copia de factura',value:'2'},
            {text:'Re-factura',value:'3'},
            {text:'Foto',value:'4'},   
            {text:'Carta de compra-venta',value:'5'},
                        
        ],
        tiposdocumento:'',
        searchar:'',

        headersar: [

            { text: 'TipoDocumento', value: 'fipoDocumento', sortable: true  },            
            { text: 'Opciones', value: 'opciones' }, 
         
        ],
        rutaconsulta:'',
        descrip:'',
        tipo:'',
        dialogimagen:false,
        //*************** */
        
        headers: [

            { text: 'Estado', value: 'estado' }, 
            { text: 'Marca',value: 'marca' }, 
            { text: 'Tipo', value: 'tipo' }, 
            { text: 'Modelo', value: 'modelo' }, 
            { text: 'Serie', value: 'serie' },
            { text: 'Placas', value: 'placas'},
            { text: 'Color', value: 'color'},
            { text: 'Año', value: 'ano' },
            { text: 'Opciones', value: 'opciones', sortable: false },
                                            
        ],

        estados: [

            { text: 'Relacionado', value: 'Relacionado',value2:1}, 
            { text: 'Robado', value: 'Robado',value2:2},
            { text: 'Asegurado',value: 'Asegurado',value2:3}, 
            { text: 'En procesamiento', value: 'En procesamiento',value2:4 }, 
            { text: 'En resguardo', value: 'En resguardo',value2: 5}, 
                                            
        ],

         definitivaodep: [

            { text: 'Definitva', value: true},
            { text: 'Deposito', value: false },
                                            
        ],
        estado: false,
        lugardeposito: '',

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
                me.listarMarcas();
                me.listarTipos();
                me.listarColores();
                me.listarAnos();              
                me.listardelitos();  
                me.listarrHecho();
                me.listarPersonas();
                me.listarLogo();
                me.listar();
                me.listarrap();
        }
      
      
      axios.interceptors.request.use( (config)=> {
          // Do something before request is sent 
          this.$store.commit('LOADER',true);
          return config;
        }, (error)=> { 
          // Do something with request error
          this.$store.commit('LOADER',false);
          return Promise.reject( error);
        });

          // Add a response interceptor
          axios.interceptors.response.use((response)=>{ 
          this.$store.commit('LOADER',false);
          // Do something with response data 
          return response;
        },  (error)=> { 
     // Do something with request error
          this.$store.commit('LOADER',false); 
          return Promise.reject(error);
        });

    },
    computed: {
      formTitle () {
                return this.editedIndex === -1 ? 'Nuevo Vehiculo' : 'Actulizar Vehiculo'
            },
      formIcon () {
                return this.editedIndex === -1 ? 'add' : 'assignment'
            },
        textoestado () {
            if(this.estado)
                return  'Relacionado'; else return 'Robado';
            },
        textorobado () {
            if(this.estadorobado)
                return  'Tentativa'; else return 'Consumado';
            },
        textosino(){
            if(this.recuperado)
            return 'Si'; else return 'No';
        },
        textosino2(){
            if(this.devuelto)
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
                return this.$store.state.drawer
            }
    },
    watch: {
        
    },
    methods:{ 
        listarLogo(){
        
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/ConfGlobals/Listar',configuracion).then(function(response){
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
        informacionagencia(){
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header}; 
                me.$conf.get('api/Agencias/Listarporid/'+ me.agenciaid,configuracion).then(function(response){
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
        edititem (item) {           
                this.editedIndex =1;    
                this.dialogo = true;
                this.idvehiculo = item.idVehiculo;
                this.estado = item.estado;
                this.estadorobado = item.estadoRobado;          
                this.marca = this.selectidmarca(item.marca);
                this.listarModelos2(this.marca);
                this.tipo = item.tipo; 
                this.modelo = item.modelo;
                this.serie = item.serie;
                this.placa = item.placas;
                this.color = item.color;
                this.ano = item.ano;
                this.direcciondelito = item.lugar
                this.municipiodelito = item.municipio
                this.delito = new Object();
                this.delito.text = item.modalidad;
                this.delito.value = item.modalidad;
                this.propietario = new Object();
                this.propietario.text = item.propietario;
                this.propietario.value = item.propietario;
                this.denunciante = new Object();
                this.denunciante.text = item.nombreDenunciante;
                this.denunciante.value = item.nombreDenunciante;
                this.dueno = item.propietario

                this.motorserie = item.noSerieMotor;
                this.recepcion = item.recepcion;
                this.numerooficio = item.numeroOficio;
                this.domiciliodenunciante = item.domicilioDenunciante
                this.fechahorasucesof = this.fechaRobo;

                this.recuperado = item.recuperado;
                this.devuelto = item.devuelto;
                this.senasparticulares = item.senasParticulares;
                this.generartextval(item.marca)

        },
        selectidmarca: function(marca) {      
            for (var i = 0; i < this.marcas.length; i++) {
                if (this.marcas[i].text === marca)
                return this.marcas[i].value;
               
            }
       
        },
        generartextval: function(val) {          
            for (var i = 0; i < this.marcas.length; i++) {            
                if (this.marcas[i].text === val)
                {
                        this.marca =  new Object();
                        this.marca.text =this.marcas[i].text;
                        this.marca.value = this.marcas[i].value;            
                }
            }
        },
        cerrarcarpeta () {
                this.$store.state.rhechoid = null;
                this.$store.state.nuc= null;
                this.$router.push('./listacarpetas')
            },
        agregar(){
            this.limpiar();
            this.editedIndex = -1;
            this.listardirecciondelito();
            this.dialogo= true;
        },
        close () {
                this.dialogo = false;
                this.limpiar();
        },         
        limpiar(){    
            this.listar();
            this.estado = false;
            this.estadorobado = false;
            this.marca = "";
            this.tipo = "";
            this.modelo = "";
            this.serie = "";
            this.placa = "";
            this.color = "";
            this.ano = "";
            this.recuperado = false;
            this.devuelto = false;
            this.senasparticulares = "";
            this.motorserie = "";
            this.recepcion ='';
            this.delito = '';
            this.propietario ='';
            this.denunciante = '';
            this.domiciliodenunciante = '';
            this.numerooficio ='';
            this.lugardeposito='';
            this.ubicacion='';
            this.defdep='';
            this.dueno = ""
            
            
        },
        listar(){
          let me=this;  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header}; 
                me.$cat.get('api/Vehiculos/Listar/'+ me.rHechoId,configuracion).then(function(response){
                    //console.log(response);
                    me.vehiculos=response.data;
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
        generarfecha(){
            var fecha;
            fecha = moment().format('DD') + " de " + moment().format('MMMM')  + " de " + moment().format("YYYY");
            return fecha;      
        },  
        imprimir(item){
      
            this.marca = item.marca;
            this.tipo = item.tipo; 
            this.modelo = item.modelo;
            this.color = item.color;
            this.serie = item.serie;
            this.placa = item.placas;
            this.motorserie = item.noSerieMotor;
            this.recepcion = item.recepcion;

            this.delito = new Object();
            this.delito.text = item.modalidad;
            this.delito.value = item.modalidad;
            this.direcciondelito = item.lugar
            this.municipiodelito = item.municipio
            this.fechahorasucesof = item.fechaRobo;     
            
            this.propietario = new Object();
            this.propietario.text = item.propietario;
            this.propietario.value = item.propietario;

            this.denunciante = new Object();
            this.denunciante.text = item.nombreDenunciante;
            this.denunciante.value = item.nombreDenunciante;
            
            this.numerooficio = item.numeroOficio;
            
            this.domiciliodenunciante = item.domicilioDenunciante
            
            this.fechaactual = item.fechaSys.substring(8,10) +" de "+this.obtenermes(item.fechaSys.substring(5,7)-1)+" del "+item.fechaSys.substring(0,4)
            this.mostrarpdf(item.usuario,item.puesto,item.agencia);
            this.modaldocumento = false;
        },    
        listardireccionpersonal(){
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header}; 
                me.$cat.get('api/RAPs/ListarDP/'+ me.denunciante.value2,configuracion).then(function(response){                  
                    me.domiciliodenunciante=response.data.calle+", No.Int: "+response.data.noint +
                    ", No.Ext: "+response.data.noext+", CP:"+response.data.cp+", "+response.data.municipio;              
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
        listarrHecho(){
               
                let me=this;  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header}; 
                me.$cat.get('api/RHechoes/ListarPorId/' +me.rHechoId,configuracion).then(function(response){  
                    console.log(response.data);

                    me.fechahorasuceso = response.data.fechaHoraSuceso;
                    me.agenciaid = response.data.agenciaid;       
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
        listarMarcas(){ 
            var marcasarray = [];
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            me.$conf.get('api/Marca/Listar',configuracion).then(function(response){
                marcasarray = response.data;
             
                 marcasarray.map(function(x){
                        me.marcas.push({text: x.dato,value: x.idMarca});
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
        listardirecciondelito(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var delitoaray=[];
            me.$cat.get('api/DireccionDelitoes/ListarPoridHecho/'+ me.rHechoId,configuracion).then(function(response){
                me.direcciondelito = "Calle "+response.data.calle +", No.Int: "+response.data.noint +", No.Ext: "+response.data.noext+", CP:"+response.data.cp;
                me.municipiodelito = response.data.municipio;
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
        listarTipos(){ 
            var tiposarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header}; 
            me.$conf.get('api/Tipov/Listar',configuracion).then(function(response){
                tiposarray = response.data;
                 tiposarray.map(function(x){
                        me.tipos.push({text: x.dato,value: x.dato});
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
        listarModelos(){ 
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            var modelosarray = [];       
            me.modelos=[];
            me.$conf.get('api/Modelo/ListarId/'+ me.marca.value,configuracion).then(function(response){
                modelosarray = response.data;
                 modelosarray.map(function(x){
                        me.modelos.push({text: x.dato,value: x.dato});
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
        listarModelos2: function(marca){ 
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            var modelosarray = [];       
            me.modelos=[];  
            me.$conf.get('api/Modelo/ListarId/'+ marca,configuracion).then(function(response){
                modelosarray = response.data;
                 modelosarray.map(function(x){
                        me.modelos.push({text: x.dato,value: x.dato});
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
        listarColores(){ 
            var coloresarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            me.$conf.get('api/Color/Listar',configuracion).then(function(response){
                coloresarray = response.data;
                 coloresarray.map(function(x){
                        me.colores.push({text: x.dato,value: x.dato});
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
        listarAnos(){ 
            var anosarray = [];
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            me.$conf.get('api/Ano/Listar',configuracion).then(function(response){
                anosarray = response.data;
                 anosarray.map(function(x){
                        me.anos.push({text: x.dato,value: x.dato});
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
            me.$cat.get('api/RDHs/ListarPorHecho/'+ me.rHechoId,configuracion).then(function(response){
                //console.log(response.data)
                delitosArray=response.data;
                delitosArray.map(function(x){
                    me.delitos.push({text: x.nombreDelito,value: x.intensionDelito,}); 
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
        listarPersonas(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var contador=0
            var personasArray=[];
            me.$cat.get('api/RAPs/ListarTodosVic/'+ me.rAtencionId,configuracion).then(function(response){
                //console.log(response.data)
                personasArray=response.data;               
                personasArray.map(function(x){
                    me.propietarios.push({text: x.nombreCompleto,value:x.nombreCompleto,value2:x.personaId});
                    me.denunciantes.push({text: x.nombreCompleto,value:x.nombreCompleto,value2:x.personaId});
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
        guardar(){ 
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            me.$validator.validateAll('dialogo1').then(result => {
            if (result) { 
                me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información ',           
                function(){
                    if(me.editedIndex == -1){
                        me.$cat.post('api/Vehiculos/Crear',{  
                        'rHechoId': me.rHechoId, 
                        'estado': me.estado,
                        'estadoRobado': me.estadorobado,
                        'marca': me.marca.text,
                        'tipo': me.tipo,
                        'modelo':me.modelo,
                        'serie': me.serie,
                        'placas':me.placa,
                        'color':me.color,
                        'ano': me.ano,
                        'recuperado': me.recuperado,
                        'devuelto':me.devuelto,
                        'senasParticulares':me.senasparticulares,
                        'fechaSys': me.fechasys,
                        'fechaRegistro': me.fecharegistro,
                        'distrito':me.u_distrito,
                        'subproc': me.u_dirSubPro,
                        'agencia': me.u_agencia,
                        'usuario': me.u_nombre,
                        'puesto': me.u_puesto,
                        'modulo': me.u_modulo,
                        'NoSerieMotor': me.motorserie,
                        'Recepcion': me.recepcion,
                        'Lugar': me.direcciondelito,
                        'Municipio': me.municipiodelito,
                        'Modalidad': me.delito.value,
                        'FechaRobo': me.fechahorasucesof,
                        'Propietario': me.propietario.text,
                        'NombreDenunciante': me.denunciante.text,
                        'DomicilioDenunciante': me.domiciliodenunciante,
                        'NumeroOficio': me.numerooficio,
                        'Lugardeposito': me.lugardeposito,
                        'Estadov' : me.estadov.text,
                        'StatusVehiculo' : me.defdep.value,
                        'Ubicacion': me.ubicacion,        
                        'Propietario': me.dueno        

                    },configuracion).then(function(response){  
                        me.$notify('La información se guardo correctamente !!!','success')   
                        me.dialogo=false;      
                        me.listar();
                        me.modaldocumento = false;
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

                    }else{
                        me.$cat.put('api/Vehiculos/Actualizar',{
                        'IdVehiculo':me.idvehiculo,
                        'estado': me.estado,
                        'estadoRobado': me.estadorobado,
                        'marca': me.marca.text,
                        'tipo': me.tipo,
                        'modelo':me.modelo,
                        'serie': me.serie,
                        'placas':me.placa,
                        'color':me.color,
                        'ano': me.ano,
                        'recuperado': me.recuperado,
                        'devuelto':me.devuelto,
                        'senasParticulares':me.senasparticulares,
                        'NoSerieMotor': me.motorserie,
                        'Recepcion': me.recepcion,
                        'Lugar': me.direcciondelito,
                        'Municipio': me.municipiodelito,
                        'Modalidad': me.delito.value,
                        'FechaRobo': me.fechahorasucesof,
                        'Propietario': me.propietario.text,
                        'NombreDenunciante': me.denunciante.text,
                        'DomicilioDenunciante': me.domiciliodenunciante,
                        'Lugardeposito': me.lugardeposito,
                        'Estadov' : me.estadov.text,
                        'StatusVehiculo' : me.defdep.text,
                        'Ubicacion': me.Ubicacion,
                        'Propietario': me.dueno  

                        },configuracion).then(function(response){                            
                            me.$notify('La información se actualizo correctamente !!!','success')
                            me.dialogo=false;      
                            me.listar();
                            me.modaldocumento = false;
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

                    }

                },
                function(){
                    alertify.warning('Verifica la información')
                }).set('labels', {ok:'Guardar', cancel:'Cancelar'});
        
            }
            
        }) 
          
        },
        loadarchive(item){
            let me = this;
            me.idvehiculo = item.idVehiculo;
            me.dialogarchivo = true;
            me.limpiar(); 
           
        }, 
         pickFile () {
            this.removeImage()
            this.$refs.image.click ()
        },
        onFilePicked (e) {
			const files = e.target.files
                if(files[0] !== undefined) {
                    this.imageName = files[0].name
                    if(this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result
                        this.imageFile = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageUrl = ''
                }
		},  
        removeImage () {
            this.$refs.image.value = ''
        },
        generateUUID: function() { // Public Domain/MIT
            var d = new Date().getTime();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
                d += performance.now(); //use high-precision timer if available
            }
            var newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            
            return newGuid;
        },
        consultararchivo(item){
            let me = this;
            me.dialogpictures = true;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
                    me.$cat.get('api/ArchivoVehiculos/Listar/'+ item.idVehiculo,configuracion).then(function(response){
                        //console.log(response);
                        me.archivos=response.data;
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
        guardarArchivo(){ 
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$validator.validateAll('dialogodocs').then(result => {     
            if (result) { 
                var nombreCarpeta;
                if (me.imageFile){
                    let formData = new FormData();  
                    formData.append('file', me.imageFile ); 
                    nombreCarpeta = "C" + me.nuc.substr(1);
                        me.GUID = me.generateUUID();
                    
                        me.$cat.post('api/ArchivosMediaAfiliacion/Post/'+nombreCarpeta+'/'+me.GUID,
                        formData,
                        {
                        headers: {
                                    'Content-Type': 'multipart/form-data'
                                } 
                        },configuracion  
                    ).then(function(response){
                        console.log('SUCCESS!!');
                            console.log(response.data.ruta);
                            me.$cat.post('api/ArchivoVehiculos/Crear',{  

                                'VehiculoId' : me.idvehiculo,
                                'TipoDocumento' : me.tiposdocumento.text,
                                'DescripcionDocumento' : me.descripciondocumento,  
                                'Ruta' : response.data.ruta,
                                'UDistrito':me.u_distrito,
                                'USubproc': me.u_dirSubPro,
                                'UAgencia': me.u_agencia,
                                'Usuario': me.u_nombre,
                                'UPuesto': me.u_puesto,
                                'UModulo': me.u_modulo,                   

                            },configuracion).then(function(response){  
                                me.$notify('La información se guardo correctamente !!!','success')   
                                me.dialogarchivo = false;      
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
                    })
                    .catch(function(){
                    console.log('FAILURE2!!');
                    }); 
                } 
         
    
            }         
        }) 
    
        },
        verimagen(item){
            let me = this;
                me.rutaconsulta = item.ruta;
                me.descrip = item.descripcionDocumento;
                me.tipo = item.tipoDocumento;
                me.dialogimagen= true;
        },
        listarrap(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var array;
            me.$cat.get('api/RAPs/ListarTodos/'+ me.rAtencionId,configuracion).then(function(response){
                array=response.data;               
                array.map(function(x){
                    me.duenos.push({text: x.nombreCompleto,value:x.nombreCompleto});
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
    
       
    } 
   }
</script>
<style>
.espaciado{
    padding: 30px !important; 
}
</style>