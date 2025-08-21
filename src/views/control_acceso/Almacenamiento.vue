
 <template>
    
    <v-layout align-start v-if="isReady">
        <v-navigation-drawer v-model="this.drawer" app  class="primary"  >
            <div class="text-xl-center text-md-center text-xs-center my-4">
                <a href="/Panel"><img src="@/assets/Logo.png" height="110px" alt=""></a> 
            </div>
  
            <v-list dense dark class="pt-0 primary" >
                <template v-if="esAdministrador">
                    <v-list-tile  :to="{name:'control-acceso'}">
                    <v-list-tile-action>
                        <v-icon class="centenarioMenuIcon">home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="white--text">Inicio</v-list-tile-title>
                    </v-list-tile>
                </template>  
         
                <template v-if="esAdministrador">
                    <v-list-group>
                    <v-list-tile slot="activator"> 
                        <v-list-tile-content >
                        <v-list-tile-title class="centenarioMenuAreas">
                        Panel de control
                        </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile :to="{ name: 'control-acceso-panel-control' == '#' ? '' :  'control-acceso-panel-control'}"  active-class="secondary">  
                        <v-list-tile-action>
                        <v-icon class="centenarioMenuIcon">view_module</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title class="centenarioMenuModules">
                            Configuracion del panel de control
                        </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile> 
                    </v-list-group>
                </template>
  
                <template v-if="esAdministrador">
                    <v-list-group>
                    <v-list-tile slot="activator">   
                        <v-list-tile-content >
                        <v-list-tile-title class="centenarioMenuAreas">
                        Roles
                        </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile :to="{ name: 'control-acceso-rol'== '#' ? '' :  'control-acceso-rol'}"  active-class="secondary">  
                        <v-list-tile-action>
                        <v-icon class="centenarioMenuIcon">security</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title class="centenarioMenuModules">
                            Roles
                        </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile> 
                    </v-list-group>
                </template>
  
                <template v-if="esAdministrador">
                    <v-list-group>
                    <v-list-tile slot="activator">   
                        <v-list-tile-content >
                        <v-list-tile-title class="centenarioMenuAreas">
                        Usuarios
                        </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile :to="{ name: 'control-acceso-usuario'== '#' ? '' :  'control-acceso-usuario'}"  active-class="secondary">  
                        <v-list-tile-action>
                        <v-icon class="centenarioMenuIcon">account_circle</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title class="centenarioMenuModules">
                        Gestión de usuarios
                        </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile> 

                    <v-list-tile :to="{ name: 'clonacionesfallidas'== '#' ? '' :  'clonacionesfallidas'}"  active-class="secondary">  
                        <v-list-tile-action>
                            <v-icon class="centenarioMenuIcon">report</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="centenarioMenuModules">
                            Clonaciones fallidas
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile> 
                    
                    </v-list-group>
                </template> 
          
                <template v-if="esAdministrador">
                    <v-list-group>
                    <v-list-tile slot="activator"> 
                        <v-list-tile-content >
                        <v-list-tile-title class="centenarioMenuAreas">
                        Almacenamiento
                        </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile :to="{ name: 'control-acceso-almacenamiento'== '#' ? '' :  'control-acceso-almacenamiento'}"  active-class="secondary">  
                        <v-list-tile-action>
                        <v-icon class="centenarioMenuIcon">storage</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title class="centenarioMenuModules">
                            Administración de discos duros
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
                <v-toolbar-title>Alamcenamiento</v-toolbar-title>
                    <v-divider
                    class="mx-2"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <v-dialog   v-model="dialog"  max-width="600px"> 
                        <v-btn slot="activator" class="mb-2 primary"><v-icon>add</v-icon></v-btn> 

                        <v-card>
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">{{ formIcon }}</v-icon>
                                </v-avatar>
                    
                         
                            <v-toolbar-title class="subheading">{{formTitle}}</v-toolbar-title>
                            <v-spacer></v-spacer> 
                            </v-toolbar>
                            <v-card-text>
                             <v-form ref="form">
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                    <v-flex xs12 sm12 md12>
                                        
                                         <v-text-field name="nombre" 
                                                          label="Nombre de la unidad"
                                                          v-model="nombre"  
                                                          v-show="showcomp" >
                                            </v-text-field>
                                             <v-switch v-model="statusActivo" v-show="!showcomp"  label="¿Activar disco?:" color="success"  hide-details></v-switch>
                                    </v-flex>
                                   
                                   
                                 
                                   
                              
                                    </v-layout>
                                </v-container>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn  @click.native="close" >Cancelar</v-btn>
                                    <v-btn @click.native="guardar" class="success" >Guardar</v-btn>
                                </v-card-actions>
                            </v-form>
                        
                            
                            </v-card-text> 
                        </v-card>

                    </v-dialog>

                </v-toolbar>
          <v-data-table
                :headers="headers"
                :items="dispositivos"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">
                    <td class="justify-center layout px-0">
                        <v-icon
                        small
                        class="mr-2"
                        @click="editItem(props.item)"
                        >
                        edit
                        </v-icon>
                        
                    </td>
                    <td>{{ props.item.nombre }}</td>  
                    <td>{{ props.item.rutaFisica }}</td> 
                    <td> 
                        
                        <div v-if="props.item.statusActivo">
                            <v-icon    class="mr-2" color="blue">storage</v-icon>
                        </div>
                        <div v-else>
                            <v-icon     class="mr-2" color="error">more_horiz</v-icon>
                        </div>
                        
                    </td>    
                    <td> 
                         <div v-if="props.item.statusLLeno ">
                            <v-icon     class="mr-2" color="blue">lens</v-icon>
                        </div>
                        <div v-else>
                            <v-icon     class="mr-2" color="error">panorama_fish_eye</v-icon>
                        </div>
                    </td>  
                    <td>{{ props.item.espacioDsiponible }} Gb</td>  
                    <td>{{ props.item.espacioTotal }} Gb</td> 
                    <td><strong>{{ props.item.espacioUtilizado }} Gb</strong></td>  
                    <td class="text-center" dark>
                        <v-progress-linear
                            v-model="props.item.porcentaje"
                            height="10" color="blue" 
                            reactive
                        > 
                       
                        </v-progress-linear>   
 
                    </td> 
                    
                    
 
                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>
<script>
    import n401 from '../../components/control_acceso/401.vue'
    import n403 from '../../components/control_acceso/403.vue'
    import axios from 'axios'
    import VeeValidate from 'vee-validate' 
    import { error } from 'util';
    export default {
        
        data(){
            return {   
                e401:false, 
                e403:false,
                showpage:true,   
                isReady: false,
                dialog: false,
                headers: [
                    { text: 'Opciones', value: 'opciones', sortable: false },
                    { text: 'Nombre', value: 'nombre' },
                    { text: 'Ruta fisica', value: 'rutafisica' },
                    { text: 'Activo', value: 'statusactivo' },    
                    { text: 'Lleno', value: 'statuslleno' },  
                    { text: 'Espacio disponible', value: 'espaciodisponible' }, 
                    { text: 'Espacio total', value: 'espaciototal' },
                    { text: 'Espacio utilizado', value: 'espacioutilizado' },
                    { text: 'Porcentaje', value: 'porcentaje' },             
                ],
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                rowsPerPage: 10
                },
                editedIndex: -1,
                dispositivos:[],

                idAlmacenamiento: '',
                nombre:'', 
                rutaFisica: '',
                statusActivo:false,
                statusLLeno:false,
                espacioDisponible: '',
                espacioTotal: '',
                espacioUtilizado: '',    
                showcomp:true,
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nuevo modulo' : 'Actualizar modulo'
            },
            formIcon () {
                return this.editedIndex === -1 ? 'add' : 'edit'
            },

            //ESTO LO COLOCAMOS PORQUE LO REQUIERE EL COMPONENTE DE DRAW MENU
            logueado(){
                return this.$store.state.usuario;
            },
            esAdministrador(){ 
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Administrador';
            },
            usuario(){
                return this.$store.state.usuario.usuario;
            },
            email(){
                return this.$store.state.usuario.email;
            },
            drawer(){
                return this.$store.state.drawer //es para acceder al valor que esta almacenado en el storage
            }
        },


       watch: {
            dialog (val) {
            val || this.close()
            }
        },
        mounted(){
          
        },
        created: function() {  

            if(!localStorage.getItem("token"))
            {
                window.location.href = "/"
            }
            else 
            {
              this.isReady = true;
            }

            this.listar(); 
             // Add a request interceptor
            this.axios.interceptors.request.use( (config)=> {
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
              this.axios.interceptors.response.use((response)=>{
                console.log(response);
                this.$store.commit('LOADER',false);
                // Do something with response data
              return response;
              },  (error)=> {
                  // Do something with response error
              return new Promise( (resolve, reject)=> {
                this.$store.dispatch('logout').then(()=>{
                  this.$router.push('/login')
                })
                throw err;
              });
             });
        },
        methods:{
          listar(){
              
                let me=this;  
                 let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$controlacceso.get('api/Almacenamientoes/Listar', configuracion).then(function(response){
                    //console.log(response);
                    me.dispositivos=response.data;
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
            editItem (item) {
                this.showcomp=false;
                this.idAlmacenamiento= item.idAlmacenamiento; 
                this.statusActivo= item.statusActivo; 
                this.editedIndex=1;
                this.dialog = true
            },
 
 

            close () {
                 this.showcomp=true;
                this.dialog = false;
                this.limpiar();
            },
            
            limpiar(){
                this.idAlmacenamiento= "";
                this.statusActivo= false; 
                this.editedIndex=-1;
            },
            guardar () {
                let me=this;
                me.$validator.validate().then(result => {
                    if (result) { 
                        let header={"Authorization" : "Bearer " + me.$store.state.token};
                        let configuracion= {headers : header};
                      
                        //********************************************************************* */
                       
                                   //********************************************************************* */
                        if (me.editedIndex > -1) {
                            //Código para editar 
                           
                            this.$controlacceso.put('api/Almacenamientoes/Actualizar',{
                                'idAlmacenamiento':me.idAlmacenamiento, 
                                'statusActivo':me.statusActivo, 
                            }, configuracion).then(function(response){
                                me.close();
                                me.$notify('La información se actualizo correctamente !!!','success')  
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
                                        me.$notify("No esta autorizado para ver esta página", 'error')
                                        me.e403= true
                                        me.showpage= false 
                                    } else if (err.response.status==404){
                                        me.$notify("El recuso no ha sido encontrado", 'error')
                                    }else{
                                        me.$notify('Error al intentar actualizar el registro!!!','error')   
                                    }  
                            });
                        } else {
                            //Código para guardar
                            this.$controlacceso.get('api/DriveInfos/'+ me.nombre, configuracion).then(function(response){
                          
                             me.rutaFisica = response.data.nu + "Carpetas";
                             me.espacioDisponible = response.data.ed;
                             me.espacioTotal = response.data.et;
                             me.espacioUtilizado = response.data.et - response.data.ed ; 
                             this.$controlacceso.post('api/Almacenamientoes/Crear',{ 
                                'nombre': me.nombre,
                                'rutaFisica': me.rutaFisica,
                                'statusActivo': false,
                                'statusLLeno':false,
                                'espacioDsiponible': me.espacioDisponible,  
                                'espacioTotal': me.espacioTotal,
                                'espacioUtilizado': me.espacioUtilizado,
                                'porcentaje':   ((me.espacioUtilizado / me.espacioTotal) * 100)

                            }, configuracion).then(function(response){
                                me.close();
                                me.$notify('¡La información se guardo correctamente!','success')  
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
                                        me.$notify("No esta autorizado para ver esta página", 'error')
                                        me.e403= true
                                        me.showpage= false 
                                    } else if (err.response.status==404){
                                        me.$notify("El recuso no ha sido encontrado", 'error')
                                    }else{
                                           me.$notify('Error al intentar listar los registros','error')    
                                    }  
                                 
                            });
                        }).catch(err => {  
                                me.$notify('Error al intentar leer la lista de discos de almacenamiento en el servidor por favor verifique si existe la unidad!!!','error')    
                        });
                           
                        }
                        



                 
                    }  
                })
            },


            
           
 
        }        
    }
</script>