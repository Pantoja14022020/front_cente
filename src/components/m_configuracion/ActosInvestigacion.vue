<template>
    <v-layout align-start>

        <ConfiguracionNavDrawer/>
        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Actos de Investigación</v-toolbar-title>
                    <v-divider class="mx-2" inset vertical />
                    <v-spacer />
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer />
|                   <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn @click="dialog=true" class="mx-2" v-on="on" fab dark small color="primary" ><v-icon>add</v-icon></v-btn>
                        </template>
                        <span>Agregar Registro </span>    
                    </v-tooltip>

                    <v-dialog   v-model="dialog"  max-width="600px">
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
                                                          label="Nombre"
                                                          v-model="nombre" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('nombre')">
                                            </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                         <v-text-field name="descripcion" 
                                                          label="Descripcion"
                                                          v-model="descripcion" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('descripcion')">
                                            </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                    <v-switch 
                                            v-model="rautorizacionj"
                                            :label="`Requiere Autorización de juez: ${textosino}`"
                                            color="success"
                                    ></v-switch>
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
                :items="actoinvestigacion"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">
                    
                    <td>{{ props.item.nombre }}</td>
                    <td>{{ props.item.descripcion }}</td>
                    <td>
                         <div v-if="props.item.rAutorizacion">
                            <span class="blue--text">Si</span>
                        </div>
                        <div v-else>
                            <span class="red--text">No</span>
                        </div>
    
                    </td>  
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
                                <span>Editar registro</span>
                            </v-tooltip>    
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
    import axios from 'axios' 
    import VeeValidate from 'vee-validate'
    import n401 from './401.vue'
    import n403 from './403.vue'
    import { error } from 'util';
    import ConfiguracionNavDrawer from './ConfiguracionNavDrawer.vue'
    export default {
        components: {      
            n401,
            n403,
            ConfiguracionNavDrawer
        },
        data(){
            return {
                actoinvestigacion:[],                
                dialog: false,
                headers: [
                    { text: 'Nombre', value: 'nombre' }, 
                    { text: 'Descripcion', value: 'descripcion' },
                    { text: 'Requiere Autorización', value: 'rAutorizacion' },
                    { text: 'Opciones', value: 'opciones', sortable: false },      
                ],
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 10
                },
                editedIndex: -1,
                idInstitucion: '',
                nombre: '',   
                nomenclatura:'',
                descripcion:'',
                showpage:true,
                e401:false,
                e403:false,
                rautorizacionj:false,
                          
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nuevo Acto de Investigacion' : 'Actualizar Acto de Investigacion'
            },
              formIcon () {
                return this.editedIndex === -1 ? 'add' : 'edit'
            },
            textosino(){
            if(this.rautorizacionj)
            return 'Si'; else return 'No';
            },

        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () {
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
            listar(){
                let me=this;  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/ActoInvestigacion/ListarTodos',configuracion).then(function(response){
                    //console.log(response);
                    me.actoinvestigacion=response.data;
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
                this.idActoInvestigacion= item.idActonvestigacion;
                this.nombre=item.nombre;
                this.nomenclatura= item.nomenclatura;
                this.descripcion = item.descripcion;
                this.rautorizacionj = item.rAutorizacion
                this.editedIndex=1;
                this.dialog = true
            },
 

            close () {
                this.dialog = false;
                this.limpiar();
            },
            
            limpiar(){
                this.idInstitucion="";
                this.nombre="";
                this.nomenclatura="";
                this.descripcion="";
                this.editedIndex=-1;
            },
            guardar () {
                this.$validator.validate().then(result => {
                    if (result) {
                        if (this.editedIndex > -1) {
                            //Código para editar 
                            let me=this;
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                            this.$conf.put('api/ActoInvestigacion/Actualizar',{
                                'idActonvestigacion': me.idActoInvestigacion, 
                                'nombre': me.nombre, 
                                'nomenclatura': me.nomenclatura,
                                'descripcion': me.descripcion,
                                'rAutorizacion': me.rautorizacionj
                                
                            },configuracion).then(function(response){
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
                            let me=this;
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                            this.$conf.post('api/ActoInvestigacion/Crear',{
                                'nombre': me.nombre,
                                'nomenclatura': me.nomenclatura,
                                'descripcion': me.descripcion,
                                'rAutorizacion': me.rautorizacionj
                                
                            },configuracion).then(function(response){
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
 
