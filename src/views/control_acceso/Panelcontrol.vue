<template>

    <v-layout align-start>
        <v-navigation-drawer v-model="this.drawer" app  class="primary"  >
            <div class="text-xl-center text-md-center text-xs-center my-4">
                <img src="@/assets/Logo.png" height="110px" alt=""> 
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
                <v-toolbar-title>Panel de control</v-toolbar-title>
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
                                        
                                         <v-text-field name="abreviación" 
                                                          label="Abreviación"
                                                          v-model="abrev" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('abreviación')">
                                            </v-text-field>
                                    </v-flex>
                                   
                                    <v-flex xs12 sm12 md12>
                                         <v-text-field name="nombre" 
                                                          label="Nombre:"
                                                          v-model="nombre" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('nombre')">
                                            </v-text-field>
                                    </v-flex>
                                    <v-flex xs10 sm10 md10>
                                     
                                         <v-text-field name="icono" 
                                                          label="Icono:" 
                                                          v-model="icono"  :prepend-icon="icono"
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('icono')">
                                            </v-text-field>
                                       
                                    </v-flex> 
                                     <v-flex xs2 sm2 md2>
                                        <v-btn class="mx-2" href="https://material.io/resources/icons/?style=baseline" target="_blank" outline fab dark small color="info">
                                            <v-icon dark>list</v-icon>
                                        </v-btn>
                                    </v-flex>
                                     <v-flex xs12 sm12 md12>
                                         <v-text-field name="ruta" 
                                                          label="Ruta:"
                                                          v-model="ruta" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('ruta')">
                                            </v-text-field>
                                    </v-flex>
                                      <v-flex xs12 sm12 md12>
                                          <v-switch v-model="status"  label="Status:" color="success"  hide-details></v-switch>
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
                :items="panel"
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
                    <td>{{ props.item.abrev }}</td>  
                    <td>{{ props.item.nombre }}</td> 
                    <td><v-icon>{{ props.item.icono }}</v-icon></td>    
                    <td>{{ props.item.ruta }}</td>  
                    <td>
                        <div v-if="props.item.status">
                            <span class="success--text">Activo</span>
                        </div>
                        <div v-else>
                            <span class="red--text">Inactivo</span>
                        </div>
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

                dialog: false,
                headers: [
                    { text: 'Opciones', value: 'opciones', sortable: false },
                    { text: 'Abrev', value: 'abrev' },
                    { text: 'Nombre', value: 'nombre' },
                    { text: 'Icono', value: 'icono' },    
                    { text: 'Ruta', value: 'ruta' },  
                    { text: 'Status', value: 'status' }            
                ],
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                rowsPerPage: 10
                },
                editedIndex: -1,
                panel:[],
                idPC: '',
                abrev:'',
                nombre: '',
                icono:'',
                ruta:'',
                status:false,        
            }
        },
        computed: {
            formTitle () {return this.editedIndex === -1 ? 'Nuevo modulo' : 'Actualizar modulo'},
            formIcon () { return this.editedIndex === -1 ? 'add' : 'edit' },

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
                return this.$store.drawer //es para acceder al valor que esta almacenado en el storage
            }
        },

       watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created: function() {  
            this.listar(); 
             // Add a request interceptor
            this.$panel.interceptors.request.use( (config)=> {
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
              this.$panel.interceptors.response.use((response)=>{
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
                this.$panel.get('api/PanelControls/Listar', configuracion).then(function(response){
                    //console.log(response);
                    me.panel=response.data;
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
            editItem (item) {
                this.idPC= item.idPC;
                this.abrev = item.abrev;
                this.nombre = item.nombre;
                this.icono = item.icono;
                this.ruta = item.ruta;
                this.status = item.status;  
                this.editedIndex=1;
                this.dialog = true
            },
 
 

            close () {
                this.dialog = false;
                this.limpiar();
            },
            
            limpiar(){
                this.idPC="";
                this.abrev= "";
                this.nombre="";  
                this.icono="";  
                this.ruta="";  
                this.status=false;
                this.editedIndex=-1;
            },
            guardar () {
                this.$validator.validate().then(result => {
                    if (result) { 
                        let header={"Authorization" : "Bearer " + this.$store.state.token};
                        let configuracion= {headers : header};
                        if (this.editedIndex > -1) {
                            //Código para editar 
                            let me=this;
                            this.$panel.put('api/PanelControls/Actualizar',{
                                'idPC':me.idPC,
                                'abrev':me.abrev, 
                                'nombre': me.nombre,
                                'icono': me.icono,
                                'ruta': me.ruta,
                                'status':me.status, 
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
                                    me.$notify("No esta autorizado para ver esta pagina", 'error')
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
                            let me=this;
                            this.$panel.post('api/PanelControls/Crear',{
                                'abrev':me.abrev, 
                                'nombre': me.nombre,
                                'icono': me.icono,
                                'ruta': me.ruta,
                                'status':me.status,  
                            },configuracion).then(function(response){
                                me.close();
                                me.$notify('La información se guardo correctamente !!!','success')  
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
                        }
                    }  
                })
            },
           
            
           
 
        }        
    }
</script>