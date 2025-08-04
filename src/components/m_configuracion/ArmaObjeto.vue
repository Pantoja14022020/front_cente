<template>
    <v-layout align-start>


      <n401 v-if="e401" />
        <n403 v-if="e403" />
        <NavDrawer/>
        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Armas u Objeto.</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>

                    <v-tooltip bottom>
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
                                        
                                        <v-select name="clasificacíon"   
                                        :items="clasificaciones"
                                        v-model="clasificacion" 
                                        v-validate="'required'" 
                                        label="Clasificacion de Arma:"
                                        :error-messages="errors.collect('clasificacíon')">
                                        </v-select>

                                         <v-text-field name="nombre de arma" 
                                                          label="Nombre de arma"
                                                          v-model="nombrearma" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('nombre de arma')">
                                        </v-text-field>
                                            
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
                :items="armaobjetos"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">
                   
                    <td>{{ props.item.nombreAO }}</td>  
                    <td>{{ props.item.nombreClasi }}</td>  
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
    import NavDrawer from './ConfiguracionNavDrawer.vue'

    export default {
        components: {      
            n401,
            n403,
          NavDrawer,
        },
        data(){
            return {             
                dialog: false,
                headers: [
                    { text: 'Nombre', value: 'nombreAO', sortable: true } ,   
                    { text: 'Clasificacíon', value: 'nombreClasi', sortable: true },
                    { text: 'Opciones', value: 'opciones', sortable: false },         
                ],
                search:'',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 10
                },
                editedIndex: -1,
                clasificacion:'',
                clasificaciones:[],
                nombrearma:'',
                armaobjetos:[],
                armaobjeto:'',
                idarmaobjeto:'',
                showpage:true,
                e401:false,
                e403:false,
                          
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nueva Arma u Objeto' : 'Actualizar Arma u Objeto'
            },
              formIcon () {
                return this.editedIndex === -1 ? 'add' : 'edit'
            }
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () {
            this.listar();
            this.listarclasificacion();

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
                this.$conf.get('api/ArmaObjeto/Listar',configuracion).then(function(response){
                    //console.log(response);
                    me.armaobjetos=response.data;
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
            listarclasificacion(){
                var clasificacionarray = [];
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                    me.$conf.get('api/ClasificacionArma/Listarporcatalogo',configuracion).then(function(response){
                        clasificacionarray = response.data;
                        clasificacionarray.map(function(x){
                        me.clasificaciones.push({text: x.nombreC,value: x.idClasificacionArma});
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
            editItem (item) {

                this.idarmaobjeto = item.idArmaObjeto;
                this.nombrearma = item.nombreAO;
                this.clasificacion = item.clasificacionArmaId;
                this.editedIndex=1;
                this.dialog = true
            },
 

            close () {
                this.dialog = false;
                this.limpiar();
            },
            
            limpiar(){
                this.idarmaobjeto='';
                this.clasificacion='';
                this.nombrearma=''; 
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
                            this.$conf.put('api/ArmaObjeto/Actualizar',{
                                'idArmaObjeto':me.idarmaobjeto, 
                                'nombreAO': me.nombrearma,
                                'clasificacionArmaId' : me.clasificacion
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
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                            this.$conf.post('api/ArmaObjeto/Crear',{
                                'nombreAO': me.nombrearma,
                                'clasificacionArmaId': me.clasificacion
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
 
