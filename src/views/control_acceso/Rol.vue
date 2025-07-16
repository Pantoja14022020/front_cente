<template>

    <v-layout align-start>
        <v-navigation-drawer v-model="this.drawer" app  class="primary"  >
            <div class="text-xl-center text-md-center text-xs-center my-4">
                <a href="/"><img src="@/assets/Logo.png" height="110px" alt=""></a> 
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

                    <v-list-tile :to="{ name: 'control-acceso-clonacionesfallidas'== '#' ? '' :  'control-acceso-clonacionesfallidas'}"  active-class="secondary">  
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
                <v-toolbar-title>Roles</v-toolbar-title>
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
                                                            label="Nombre:"
                                                            v-model="nombre" 
                                                            v-validate="'required'"
                                                            :error-messages="errors.collect('nombre')">
                                            </v-text-field>
                                            
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-text-field name="descripcion" 
                                                            label="Descripcion:"
                                                            v-model="descripcion" 
                                                            v-validate="'required'"
                                                            :error-messages="errors.collect('descripcion')">
                                                </v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-switch v-model="condicion"  label="¿Status?:" color="success"  hide-details></v-switch>
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
                :items="roles"
                :search="search"
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination" 
                class="elevation-1"
            >
                <template slot="items" slot-scope="props">       
                             
                    
                    <td><v-icon  small  class="mr-2" color="success">bookmark</v-icon>{{ props.item.nombre }}</td>
                    <td>{{ props.item.descripcion }}</td>
                    <td>
                        <div v-if="props.item.condicion">
                            <span class="success--text">Activo</span>
                        </div>
                        <div v-else>
                            <span class="red--text">Inactivo</span>
                        </div>
                    </td>
                     <td class="justify-center layout px-0">
                        <v-icon
                        small
                        class="mr-2"
                        @click="editItem(props.item)"
                        >
                        edit
                        </v-icon>
                        
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
        components:{
             n401,
             n403
        },
        data(){
            return {   
                e401:false, 
                e403:false,
                showpage:true,     

                dialog: false,
                headers: [
                 
                    { text: 'Rol', value: 'nombre' },
                    { text: 'Descripción', value: 'descripcion', sortable: false  },
                    { text: 'Status', value: 'condicion', sortable: false  },    
                    { text: 'Opciones', value: 'opciones', sortable: false },             
                ],
                search: '' ,
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 10
                },     
                editedIndex: -1,
                roles:[],  
                idrol:'',
                panelcontrolId:'',
                nombrepc:'',
                nombre:'',
                descripcion:'',
                condicion:false, 
                 
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nuevo rol' : 'Actualizar rol'
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

        created () {
            this.listar(); 
        },
        methods:{
            listar(){
              
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$controlacceso.get('api/Rols/Listar', configuracion).then(function(response){
                    console.log(response);
                    me.roles=response.data;
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
                this.idrol= item.idrol; 
                this.nombrepc = item.nombrpc;
                this.nombre = item.nombre;
                this.descripcion = item.descripcion;
                this.condicion = item.condicion; 
                this.editedIndex=1;
                this.dialog = true
            },
 

            close () {
                this.dialog = false;
                this.limpiar();
            },
            
            limpiar(){
                
                this.idrol= ""; 
                this.nombrepc = "";
                this.nombre = "";
                this.descripcion ="";
                this.condicion="";
                this.editedIndex=-1;
            },
            guardar () {
                this.$validator.validate().then(result => {
                    if (result) { 
                        let header={"Authorization" : "Bearer " + this.$store.state.token};
                        let configuracion= {headers : header};
                        if (this.editedIndex > -1) { 
                            let me=this;
                            this.$controlacceso.put('api/Rols/Actualizar',{
                                'idrol':me.idrol, 
                                'nombre': me.nombre,
                                'descripcion': me.descripcion,
                                'condicion': me.condicion, 
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
                                    this.e401 = true,
                                    this.showpage= false
                                } else if (err.response.status==403){ 
                                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                                    this.e403= true
                                    this.showpage= false
                                    //store.dispatch('logout') 
                                } else if (err.response.status==404){
                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                }else{
                                    me.$notify('Error al intentar actualizar el registro!!!','error')   
                                } 
                            });
                        } else {
                            //Código para guardar
                            let me=this;
                            this.$controlacceso.post('api/Rols/Crear',{
                                'nombre': me.nombre,
                                'descripcion': me.descripcion,
                                'condicion': me.condicion,
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
                                    this.e401 = true,
                                    this.showpage= false
                                } else if (err.response.status==403){ 
                                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                                    this.e403= true
                                    this.showpage= false
                                    //store.dispatch('logout') 
                                } else if (err.response.status==404){
                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                }else{
                                    me.$notify('Error al intentar crear el registro!!!','error')   
                                } 
                            });
                        }
                    }  
                })
            },
           
            
           
 
        }        
    }
</script>