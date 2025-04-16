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
                    <v-toolbar-title class="font-weight-regular" >Lista de carpetas.</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <v-text-field 
                        name="nuc" 
                        label="NUC:" 
                        v-model="nuc"
                        :error-messages="errors.collect('nuc')">                                          
                    </v-text-field>  

                    <v-btn   @click.native="listar" class="success" >Buscar</v-btn> 
                    
                </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="carpetas"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">
                    <td class="justify-center layout px-0">

                        <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon  class="mr-2" color="warning"  v-on="on" @click="abrircarpeta(props.item)">
                                    folder
                                    </v-icon>
                                </template>
                                <span>Abrir carpeta</span>
                        </v-tooltip>
 
                        
                    </td>
                    <td>{{ props.item.nuc }}</td>  
                    <td>{{ props.item.victima }}</td>  
                    <td>{{ props.item.distritoInicial }}</td> 
                    <td>{{ props.item.dirSubProcuInicial }}</td>  
                    <td>{{ props.item.agenciaInicial}}</td>
                    <td>{{ props.item.u_Nombre }}</td>  
                    <td>{{ props.item.fechaElevaNuc.substring(8,10) +" de "+ obtenermes(props.item.fechaElevaNuc.substring(5,7)-1)+" del "+props.item.fechaElevaNuc.substring(0,4) }}</td> 
               
                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
            </v-data-table>

        </v-flex>
    </v-layout>
</template>
<script>
    import axios from 'axios'  
    import VeeValidate from 'vee-validate' 
    import n401 from './401.vue'
    import n403 from './403.vue' 
      import { error } from 'util';
    export default {
        data(){
            return {      
                components: {  
                    n401,
                    n403
                }, 
                showpage:true,
                e401:false,
                e403:false,
                
                //-----CLAIM------------------------------------------
                u_iddistrito:this.$store.state.usuario.iddistrito,
                u_distrito:this.$store.state.usuario.distrito,
                u_dirSubPro:this.$store.state.usuario.dirSubProc,
                u_idagencia:this.$store.state.usuario.idagencia,
                u_agencia:this.$store.state.usuario.agencia,
                u_idmoduloservicio:this.$store.state.usuario.idmoduloservicio,
                u_modulo:this.$store.state.usuario.modulo,
                u_idusuario:this.$store.state.usuario.idusuario,
                u_nombre:this.$store.state.usuario.usuario,
                u_clave:this.$store.state.usuario.clave,
                u_rol:this.$store.state.usuario.rol,
                u_puesto:this.$store.state.usuario.puesto,
                u_subproc:this.$store.state.usuario.subProc, 
                u_iddsp : this.$store.state.usuario.iddsp,
                //----------------------------------------------------
                dialog: false,
                dialogo:false,
                agencias:[],
                agencia:'',
                modulos:[],
                modulo:'',
                agenciaux:'',
                fechadesde:'',
                fechad:'',
                fechahasta:'',
                fechah:'',
                menu1:false,
                menu2:false,
                nombre:'',
                apellidop:'',
                apellidom:'',
                nuc:'',
                headers: [
                    { text: 'Abrir carpeta', value: 'asignacion', sortable: false },
                    { text: 'NUC', value: 'nuc', sortable: false },  
                    { text: '1ra persona registrada', value: 'victima', sortable: false },      
                    { text: 'Distrito', value: 'distritoInicial' },
                    { text: 'Dirección o Subprocuraduria', value: 'dirSubProcu' },
                    { text: 'Agencia', value: 'agenciaInicial' }, 
                    { text: 'Atendido por', value: 'atendidopor'},  
                    { text: 'Fecha', value: 'fechaelevaNuc', sortable: false },
                                                  
                ],
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 20
                },
                editedIndex: -1, 
                //----------------------------------------------------
                carpetas:[],
                rHechoId:'',
      
             
           
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nueva agencia' : 'Actualizar agencia'
            },
            formIcon () {
                return this.editedIndex === -1 ? 'add' : 'edit'
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
            esAdministrador(){ 
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Administrador';
            },
            logueado(){
                return this.$store.state.usuario;
            },
            esRecepcion(){ 
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Recepción';
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
            dialog (val) {
            val || this.close()
            }
        },

        created () { 
           
            this.$store.state.nuc = null;
            this.$store.state.ratencionid = null;
            this.$store.state.rhechoid = null;
            this.listar();
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
        methods:{
            fechainif(){
                if(this.menu1){
                    this.generarfecha2();
                    this.$refs.menu1.save(this.fechadesde);
                } 
                if(this.menu2){
                    this.generarfecha2();
                    this.$refs.menu2.save(this.fechahasta);
                }            
            },
            generarfecha2(){           
                if(this.menu1) 
                this.fechad =this.fechadesde.substring(8,10) +" de "+ this.obtenermes(this.fechadesde.substring(5,7)-1)+
                " del "+ this.fechadesde.substring(0,4);   
                 if(this.menu2) 
                this.fechah =this.fechahasta.substring(8,10) +" de "+ this.obtenermes(this.fechahasta.substring(5,7)-1)+
                " del "+ this.fechahasta.substring(0,4);   
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
            limpiarfechad(){
                this.fechad = ""
                this.fechadesde = ""
                this.menu1 = false
            },
            limpiarfechah(){
                this.fechah = ""
                this.fechahasta = ""
                this.menu2 = false
            },
            listar(){            
                let me=this;  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.get('api/RHechoes/ListarPorNucMC/' + me.nuc,configuracion).then(function(response){ 
                    me.carpetas=response.data;
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
            abrircarpeta(item) {   

                this.rHechoId = item.rHechoId;
                this.$store.state.nuc= item.nuc;  
                this.$store.state.ratencionid = item.rAtencionId;
                this.$store.state.rhechoid = item.rHechoId ;
                this.$router.push('./informaciongeneral') 
              
            },
 

            close () {
                this.dialog = false;
                this.limpiar();
            },
            
            limpiar(){
                this.rHechoId=""; 
                
                this.editedIndex=-1;
            },    
        }        
    }
</script>
