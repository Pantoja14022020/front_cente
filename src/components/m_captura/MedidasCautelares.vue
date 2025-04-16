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

                <v-toolbar-title class="font-weight-regular" >Medidas cautelares  ART. 155 C.N.P.P. </v-toolbar-title>
                
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
                <v-btn class="mx-2" @click="cerrarcarpeta" fab dark small color="primary">
                    <v-icon dark>close</v-icon>
                </v-btn>
                <v-btn class="mx-2" @click="agregar()" fab dark small color="success">
                    <v-icon dark>add</v-icon>
                </v-btn> 
                       
            </v-toolbar>

            <v-data-table
                :headers="headers"
                :items="v_listamcautelares"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">

                    <td>{{ props.item.nombreImputado }}</td> 
                    <td>{{ props.item.medidaCautelar }}</td>  
                    <td>{{ formatearfecha(props.item.fechaInicio) }}</td> 
                    <td>{{ formatearfecha(props.item.fechaTermino) }}</td>   
            
                    
                    <td class="justify-center layout px-0"> 
                        
                        <v-tooltip bottom   >
                            <template v-slot:activator="{ on }">                        
                                <v-icon 
                                    class="mr-2" v-on="on"
                                    @click="editItem(props.item)"
                                    >
                                    edit
                                </v-icon>
                            </template>
                            <span>Actualizar información</span>
                        </v-tooltip>    
                        
                    </td> 
                </template>

                <template slot="no-data">
                    <v-btn color="primary" @click="listarImputados">Resetear</v-btn>
                </template>
            </v-data-table>         
        </v-flex>


        <v-dialog v-model="modalAdd" fullscreen hide-overlay transition="dialog-bottom-transition">

            <v-card>

                <v-toolbar dark color="primary">           
                    <v-toolbar-title>{{formTitle}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn color="success" text @click.native="guardar()">Guardar</v-btn>
                    </v-toolbar-items>
                    <v-btn icon @click="modalAdd = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>


                 <v-card    elevation=0 class="mb-5" height="auto">

                    <v-container grid-list-md >

                        <v-layout row wrap> 

                            <v-flex class="espaciado" xs12 sm12 md6 lg6>

                                <v-autocomplete 
                                    name="imputado"
                                    :items="v_imputados"
                                    v-model="v_imputado" 
                                    v-validate="'required'" 
                                    label="*Imputados:"
                                    :error-messages="errors.collect('imputado')">
                                </v-autocomplete>

                                <v-select
                                    label="*Medidas cautelares ART. 155 C.N.P.P.:"
                                    name ="medidas cautelares"
                                    v-model="v_mcautelar"
                                    :items="v_mcautelares"
                                    return-object
                                    v-validate="'required'"
                                    :error-messages="errors.collect('medidas cautelares')"> 
                                </v-select>

                                <v-text-field
                                    label="*Especificar medida:"
                                    name ="especificar medida"
                                    v-model="otras"
                                    v-validate="'required'"
                                    v-if="v_mcautelar.value == 'Otra'"
                                    :error-messages="errors.collect('especificar medida')"> 
                                </v-text-field>

                            </v-flex>



                            <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                
                                <v-menu
                                    ref="menu1"
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    :return-value.sync="v_fechaInicio"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                    >

                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                        :value="v_fechaInicio"
                                        label="Fecha de Inicio:"
                                        prepend-icon="event"
                                        clearable 
                                        readonly
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    
                                    <v-date-picker locale="es" v-model="v_fechaI" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu1.save(formatearfecha(v_fechaI))">OK</v-btn>
                                    </v-date-picker>

                                </v-menu>

                                <v-menu
                                    ref="menu2"
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    :return-value.sync="v_fechaTermino"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                    >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                        :value="v_fechaTermino"
                                        label="Fecha de termino:"
                                        prepend-icon="event"
                                        clearable 
                                        readonly
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker 
                                        v-model="v_fechaT" 
                                        locale="es-mx" 
                                        class="mt-4"
                                        @change="menu1 = false"
                                        no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu2.save(formatearfecha(v_fechaT))">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>

                            </v-flex>                   
                        
                        </v-layout>
                        
                    </v-container>
                </v-card> 
         
            </v-card>
        </v-dialog>
    </v-layout> 
</template>

 
<script> 
  import axios from 'axios'  
  import VeeValidate from 'vee-validate' 
  import { WebCam } from "vue-web-cam";
  import n401 from './401.vue'
  import n403 from './403.vue' 
    import { error } from 'util';

  import moment from 'moment'
  import 'moment/locale/es';

  var assert, curp, persona;
  assert = require('assert');
  curp = require('curp.js');  

  export default {
    components: {
        "vue-web-cam": WebCam,
        n401,
        n403
    },
    data: () => ({
        showpage:true,
        e401:false,
        e403:false,
        alert:false,
        modalAdd:0,  
        rapid:'',
        rAtencionId:'',
        rHechoId:'', 
        nuc:'',
        //*************** */
        v_listamcautelares:[],
        v_imputados:[],
        v_imputado:'',
        v_mcautelares:[
          {text:'I-La presentación periódica ante el juez o ante autoridad distinta que aquél designe',value:"I-La presentación periódica ante el juez o ante autoridad distinta que aquél designe",value2:"I"},
          {text:'II-La exhibición de una garantía económica',value:"II-La exhibición de una garantía económica",value2:"II"},
          {text:'III-El embargo de bienes',value:"III-El embargo de bienes",value2:"III"},
          {text:'IV-La inmovilización de cuentas y demás valores que se encuentren dentro del sistema financiero',value:"IV-La inmovilización de cuentas y demás valores que se encuentren dentro del sistema financiero",value2:"IV"},
          {text:'V-La prohibición de salir sin autorización del país, de la localidad en la cual reside o del ámbito territorial que fije el juez',value:"V-La prohibición de salir sin autorización del país, de la localidad en la cual reside o del ámbito territorial que fije el juez",value2:"V"},
          {text:'VI-El sometimiento al cuidado o vigilancia de una persona o institución determinada o internamiento a institución determinada',value:"VI-El sometimiento al cuidado o vigilancia de una persona o institución determinada o internamiento a institución determinada",value2:"VI"},
          {text:'VII-La prohibición de concurrir a determinadas reuniones o acercarse o ciertos lugares',value:"VII-La prohibición de concurrir a determinadas reuniones o acercarse o ciertos lugares",value2:"VII"},
          {text:'VIII-La prohibición de convivir, acercarse o comunicarse con determinadas personas, con las víctimas u ofendidos o testigos, siempre que no se afecte el derecho de defensa',value:"VIII-La prohibición de convivir, acercarse o comunicarse con determinadas personas, con las víctimas u ofendidos o testigos, siempre que no se afecte el derecho de defensa",value2:"VIII"},
          {text:'IX-La separación inmediata del domicilio',value:"IX-La separación inmediata del domicilio",value2:"IX"},
          {text:'X-La suspensión temporal en el ejercicio del cargo cuando se le atribuye un delito cometido por servidores públicos',value:"X-La suspensión temporal en el ejercicio del cargo cuando se le atribuye un delito cometido por servidores públicos",value2:"X"},
          {text:'XI-La suspensión temporal en el ejercicio de una determinada actividad profesional o laboral',value:"XI-La suspensión temporal en el ejercicio de una determinada actividad profesional o laboral",value2:"XI"},
          {text:'XII-La colocación de localizadores electrónicos',value:"XII-La colocación de localizadores electrónicos",value2:"XII"},
          {text:'XIII-El resguardo en su propio domicilio con las modalidades que el juez disponga',value:"XIII-El resguardo en su propio domicilio con las modalidades que el juez disponga",value2:"XIII"},
          {text:'INEGI-La prisión preventiva oficiosa',value:"INEGI-La prisión preventiva oficiosa",value2:"INEGI"},
          {text:'INEGI-La prisión preventiva justificada',value:"INEGI-La prisión preventiva justificada",value2:"INEGI"},
          {text:'Otra',value:"Otra",value2:"INEGI"},
        ],
        v_mcautelar:'',
        v_temporalidades:['Menos de 1 mes', 'De 1 a 3 meses', 'De 4 a 6 meses', , 'De 7 meses a  1 año' , 'De 1 año o mas'],
        v_temporalidad:'',
        v_fechaInicio:'',
        v_fechaI:'',
        v_fechaTermino:'',
        v_fechaT:'',
        v_distrito:'',
        v_dirSubPro:'',
        v_agencia:'',
        v_nombre:'',
        v_puesto:'',
        otras:'',
        //*************** */
        headers: [
           
            { text: 'Nombre del Imputado', value: 'nombreImputado' },
            { text: 'Medida cautelar', value: 'medidaCautelar'}, 
            { text: 'Fecha inicio', value: 'fechaInicio', }, 
            { text: 'Fecha termino', value: 'fechaTermino', }, 
            { text: 'Opciones', value: 'opciones', },                               
        ],
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
        editedIndex: -1, 
        //------- VARIABLES-----------------------------------
         
          menu1: false,  
          v_fechaInicio:'',
          menu2: false,  
          v_fechaTermino:'',
          
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
                    me.listarImputados();
                    me.listaMediaCautelar();

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
                    // ****************************************************************************
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
                return this.editedIndex === -1 ? 'Registrar medidas cautelares ART 155 C.N.P.P.' : 'Actualizar medidas cautelares ART 155 C.N.P.P.'
        },
        formIcon () {
            return this.editedIndex === -1 ? 'add' : 'edit'
        },
        device: function() {return this.devices.find(n => n.deviceId === this.deviceId);},
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
        cerrarcarpeta () {
            this.$store.state.rHechoId = null;
            this.$store.state.nuc= null;
            this.$router.push('./listacarpetas')
        },
        formatearfechahora: function(fecha){
                return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
          },
        formatearfecha: function(fecha){
                return moment(fecha).format('DD/MM/YYYY');
          },
        agregar(){
             this.limpiar();
            this.modalAdd= 1;
        },
        close () {
            this.modalAdd = 0;
            this.limpiar();
        },
        limpiar(){
            let me=this;
            me.idMedCautelares="";
            me.v_imputado=""; 
            me.v_mcautelar="";
            me.v_temporalidad="";
            me.v_fechaInicio="";
            me.v_fechaI="";
            me.v_fechaTermino="";
            me.v_fechaT="";
            me.v_distrito="";
            me.v_dirSubPro="";
            me.v_agencia="";
            me.v_nombre="";
            me.v_puesto="";
            me.otras = ""
            me.modalAdd=0;
            me.editedIndex= -1; 


        },
        editItem (item) {  
            let me=this;
            me.idMedCautelares=  item.idMedCautelares;
            me.v_imputado=  item.personaId;
            me.rHechoId=item.rHechoId;
            me.v_mcautelar = new Object();
            me.v_mcautelar.value= item.medidaCautelar;
            me.v_temporalidad=item.tiempo;
            me.v_fechaInicio=me.formatearfecha(item.fechaInicio); 
            me.v_fechaI= item.fechaInicio;
            me.v_fechaTermino=me.formatearfecha(item.fechaTermino);
            me.v_fechaT=item.fechaTermino;
            me.v_distrito=item.distrito;
            me.v_dirSubPro=item.dirSubProc;
            me.v_agencia=item.agencia;
            me.v_nombre=item.usuario;
            me.v_puesto=item.puesto;
            me.modalAdd=1;
            me.editedIndex= 1; 
        },       
        listarImputados(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var imputadosArray=[];
            axios.get('api/RAPs/ListarImputados/'+ me.rAtencionId,configuracion).then(function(response){
                //console.log(response.data);
                imputadosArray=response.data;
                imputadosArray.map(function(x){
                    me.v_imputados.push({text: x.nombreCompleto,value: x.personaId});
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
        listaMediaCautelar(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            axios.get('api/MedidasCautelares/ListarPorRHecho/'+ me.rHechoId,configuracion).then(function(response){
                //console.log(response.data);
                me.v_listamcautelares=response.data; 
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
         
         guardar () {
          let me=this;
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header};
          me.$validator.validate().then(result => {
              if (result) {   
                     if (me.editedIndex > -1) {
                      //Código para editar   
                       me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas actualizar información.', 
                      function(){
                      axios.put('api/MedidasCautelares/Actualizar',{
                          'idMedCautelares': me.idMedCautelares,
                          'personaId': me.v_imputado,
                          'rHechoId': me.rHechoId,
                          'medidaCautelar': me.v_mcautelar.value != 'Otra' ?  me.v_mcautelar.text :"INEGI-" + me.otras,
                          'tiempo': me.v_temporalidad,
                          'fechaInicio': me.v_fechaI,
                          'fechaTermino': me.v_fechaT,
                          'distrito': me.u_distrito,
                          'dirSubProc': me.u_dirSubPro,
                          'agencia': me.u_agencia,
                          'usuario': me.u_nombre,
                          'puesto': me.u_puesto, 
                           
                           
                      },configuracion).then(function(response){
                        
                         
                          me.close();
                          me.$notify('La información se actualizo correctamente !!!','success')  
                          me.listaMediaCautelar();
                                          
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
            ).set('labels', {ok:'Guardar', cancel:'Cancelar'});
                  } else {
                 debugger
                      //Código para guardar
                      me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información.', 
                      function(){   
                        axios.post('api/MedidasCautelares/Crear',{ 
                            'personaId': me.v_imputado,
                            'rHechoId': me.rHechoId,
                            'medidaCautelar': me.v_mcautelar.value != 'Otra' ?  me.v_mcautelar.text :"INEGI-" + me.otras,
                            'tiempo': me.v_temporalidad,
                            'fechaInicio': me.v_fechaI,
                            'fechaTermino': me.v_fechaT,
                            'distrito': me.u_distrito,
                            'dirSubProc': me.u_dirSubPro,
                            'agencia': me.u_agencia,
                            'usuario': me.u_nombre,
                            'puesto': me.u_puesto, 

 
                
                        },configuracion).then(function(response){
                             
                            me.close();
                            me.$notify('La información se actualizo correctamente !!!','success')  
                            me.listaMediaCautelar();
                                  
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
               
                  }
 
                  
              }  
          })
        },
	 
        
       
   }
}
</script>
 