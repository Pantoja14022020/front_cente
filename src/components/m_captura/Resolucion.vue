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

            <v-toolbar-title class="font-weight-regular" >Resolución</v-toolbar-title>
            
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
            :items="oficios"
            :search="search" 
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination" >
            
            <template slot="items" class="white" slot-scope="props">
                                 
                                        
                <td>{{ props.item.tipo}}</td>  
                <td>{{ props.item.fechaResolucion.substring(8,10) +" de "+ obtenermes(props.item.fechaResolucion.substring(5,7)-1)+" del "+props.item.fechaResolucion.substring(0,4)}}</td>  

            </template>
            <template slot="no-data">
                <v-btn color="primary"  >Resetear</v-btn>
            </template>
                
        </v-data-table>


        <v-dialog v-model="modalAdd" fullscreen hide-overlay transition="dialog-bottom-transition">
        
            <v-card>

                <v-toolbar dark color="primary">
                    
                    <v-toolbar-title>Nueva resolución.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                
                        <v-btn   @click ="guardar()" color="success" >Guardar</v-btn>
                        
                        
                        <v-btn icon   @click="modalAdd = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>

                </v-toolbar>

                <v-card-text>
                    <v-form >                       
                        <v-container grid-list-md  >
                            <v-layout row wrap>
                    
                                <v-flex class = "espaciado" xs12 sm12 md6 lg6>   

                                    <v-autocomplete 
                                        name="tipo de resolución" 
                                        :items="tresoluciones"
                                        v-model="tresolucion" 
                                        v-validate="'required'" 
                                        label="*Tipo de resolución:"
                                        return-object                                 
                                        :error-messages="errors.collect('tipo de resolución')">
                                    </v-autocomplete>

                                </v-flex>

                                <v-flex class = "espaciado" xs12 sm12 md6 lg6>  

                                    <v-menu
                                        ref="menu1"
                                        v-model="menu1"
                                        :close-on-content-click="false"
                                        :return-value.sync="fecharesolucion"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px">

                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                        name='fecha de resolución'
                                                        :value="fechare"
                                                        label='Fecha de resolución'
                                                        prepend-icon="event"
                                                        clearable 
                                                        readonly
                                                        v-on="on"                                   
                                                        :error-messages="errors.collect('fecha de resolución')">
                                            ></v-text-field>
                                        </template>

                                        <v-date-picker locale="es-mx"  v-model="fecharesolucion" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>

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
  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas'
  import VeeValidate from 'vee-validate' 
  import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
  import { debug } from 'util';
  import moment from 'moment'
  import 'moment/locale/es';
  import alertify from 'alertifyjs';
  import { VueEditor } from "vue2-editor"; 
  import n401 from './401.vue'
  import n403 from './403.vue' 
  import { error } from 'util';

  

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
        texto:'',
        oficios:[],      
        menu1:false,
        fecharesolucion:'',
        fechare:'',
        tresoluciones:[
            { text: 'Archivo temporal', value: 1 }, 
            { text: 'Facultad de abstención a investigar', value: 2 }, 
            { text: 'No ejercicio de la acción penal', value: 3 }, 
            { text: 'Criterios de oportunidad', value: 4 }, 
            { text: 'Incompetencia', value: 5 },
            { text: 'Acumulación', value: 6 }, 
            { text: 'Sobreseimiento', value: 7 },  
            { text: 'Procedimiento abreviado', value: 8 }, 
            { text: 'Juicio oral', value: 9 }, 
        ],
        tresolucion:'',
        dialogoact:false,
        IdResolucion:'',
        headers: [                             
            { text: 'Tipo de resolución',value: 'tipo' }, 
            { text: 'Fecha de resolución', value: 'fechaResolucion' },                               
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
       
        //*************** */
        
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
        modalAdd:false,
        modaldocumento:false,
        aux: false,
        


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
                this.$store.state.rhechoid = null;
                this.$store.state.nuc= null;
                this.$router.push('./listacarpetas')
        },

        fechainif(){
            if(this.menu1){
                this.generarfecha2();
                this.$refs.menu1.save(this.fecharesolucion);
            }                 
        },
        generarfecha2(){           
            if(this.menu1) 
            this.fechare =this.fecharesolucion.substring(8,10) +" de "+ this.obtenermes(this.fecharesolucion.substring(5,7)-1)+
            " del "+ this.fecharesolucion.substring(0,4);   
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
            fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY");
            return fecha;      
        }, 
        agregar(){
            this.limpiar();           
            this.modalAdd= true;
        },
        limpiar(){    
            this.fechare = ""
            this.fecharesolucion = ""
            this.tresolucion = "" 
        },
        listar(){
          let me=this;  
          let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            me.$cat.get('api/Resolucion/Listar/'+ me.rHechoId,configuracion).then(function(response){
                    //console.log(response);
                    me.oficios=response.data;
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
             me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información ',           
              function(){


                    var fechare;

                    if(me.fecharesolucion != '' || me.fechare != undefined)
                        fechare = me.fecharesolucion
                    else
                        fechare = "0001-01-01"
                
                        me.$cat.post('api/Resolucion/Crear',{  
                    
                    'RHechoId': me.rHechoId,
                    'Victimas': "",  
                    'Imputados': "",
                    'Delitos': "",
                    'CausaPenal': "",
                    'FechaAutorizacion': "0001-01-01",
                    'FechaConsulta': "0001-01-01",
                    'FechaResolucion': fechare,
                    'Status': "Finalizado",
                    'Tipo': me.tresolucion.text,
                    'SubTipo': "",  
                    'TextoDocumento': me.texto,              
                    'UDistrito': me.u_distrito,
                    'USubproc': me.u_dirSubPro,
                    'UAgencia': me.u_agencia,
                    'Usuario': me.u_nombre,
                    'UPuesto': me.u_puesto,
                    'UModulo': me.u_modulo,
                    'numeroOficio': 0,

                },configuracion).then(function(response){                   
                    me.$notify('La información se guardo correctamente !!!','success')  
                    me.modalAdd=false;      
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
                

        },   
        
      } 
   }
</script>

<style> 
.espaciado{
    padding: 30px !important; 
}  
</style>
