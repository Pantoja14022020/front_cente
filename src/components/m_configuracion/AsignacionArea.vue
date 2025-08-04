<template>
    <v-layout align-start>

        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <NavDrawer/>
        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Asignación de servicio por agencia / área.</v-toolbar-title>
                   
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
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm12 md12>
                                           <v-autocomplete 
                                                name="distrito"
                                                label="Distrito:" 
                                                v-model="distrito"
                                                :items="distritos"  
                                                v-validate="'required'"
                                                v-on:change="listarDirSub"
                                                :error-messages="errors.collect('distrito')" >
                                            </v-autocomplete>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-autocomplete 
                                                name="direccion o subprocuraduria"
                                                label="Dirección o subprocuraduria:" 
                                                v-model="dspId"
                                                :items="dsps"  
                                                v-validate="'required'"
                                                v-on:change="listarPorDirSub"
                                                :error-messages="errors.collect('direccion o subprocuraduria')" >
                                            </v-autocomplete>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-autocomplete 
                                                name="agencia o area"
                                                label="Agencia / Area:" 
                                                v-model="agenciaId"
                                                :items="agencias"  
                                                v-validate="'required'"
                                                :error-messages="errors.collect('agencia o area')" >
                                            </v-autocomplete> 
                                        </v-flex>
                                        
                                        <v-flex xs12 sm12 md12>
                                            <v-autocomplete 
                                                name="servicio"
                                                label="Servicio:" 
                                                v-model="servicioId"
                                                :items="servicios"  
                                                v-validate="'required'"
                                                :error-messages="errors.collect('servicio')" >
                                            </v-autocomplete> 
                                        </v-flex>
                                          
                                    </v-layout>
                                </v-container>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn  @click.native="close" >Cancelar</v-btn>
                                    <v-btn @click.native="guardar" class="success" >Guardar</v-btn>
                                </v-card-actions>
                        </v-card-text> 
                    </v-card>

                    </v-dialog>
                    
                </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="asps"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">
                    
                    <td>{{ props.item.nombreDirSub }}</td> 
                    <td>{{ props.item.nombreAgencia }}</td> 
                    <td>{{ props.item.nombreServicio }}</td>  
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
          NavDrawer
        },
        data(){
            return {
                             
                dialog: false,
                headers: [
                  
                    { text: 'Dirección o Subprocuraduria', value: 'nombreDistrito' },
                    { text: 'Agencia / Area', value: 'nombreAgencia' },  
                    { text: 'Servicio', value: 'nombreServicio' },  
                    { text: 'Opciones', value: 'opciones', sortable: false },  
                ],
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 10
                },
                editedIndex: -1,

                distritos:[],
                distrito:'',

                asps:[],  
                idASP: '',

                dspId: '', 
                dsps:[], 

                agenciaId:'', 
                agencias:[],

                servicioId:'',
                servicios:[],

                distritoId:1,
                showpage:true,
                e401:false,
                e403:false,
                u_iddistrito:'',
     
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nueva asignacion de servicio pericial' : 'Actualizar la asgnación del servicio pericial'
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

            this.u_iddistrito=this.$store.state.usuario.iddistrito;
            this.listar();
            this.listardistritos()
            this.listarServicios();

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
                this.$conf.get('api/ASPs/Listar',configuracion).then(function(response){
                    //console.log(response);
                    me.asps=response.data;
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
            listardistritos(){   
                let me=this;  
                var array=[]; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/Distritoes/Listar',configuracion).then(function(response){
                    array=response.data;
                    array.map(function(x){
                        me.distritos.push({text: x.nombre ,value:x.idDistrito});
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
            listarDirSub(){
                let me=this;
                var dspsArray=[];
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.dsps = []
                me.agencias = []
                this.$conf.get('api/DSPs/ListarSPporDistrito/'+ me.distrito,configuracion).then(function(response){
                    console.log(response);
                    dspsArray=response.data;
                    dspsArray.map(function(x){
                        me.dsps.push({text: x.nombreSubDir,value:x.idDSP});
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
            listarPorDirSub(){   
                let me=this;  
                var agenciasArray=[]; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.agencias.length = 0;  
                me.agenciaId="";
                me.agencias=[];
                this.$conf.get('api/Agencias/ListarPorDirSubStatus/'+ me.dspId,configuracion).then(function(response){
                    agenciasArray=response.data;
                    agenciasArray.map(function(x){
                        me.agencias.push({text: x.nombre ,value:x.idAgencia});
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
            listarServicios(){ 

                let me=this;
                var serviciosArray=[];
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/ServicioPericials/Listar',configuracion).then(function(response){
                    serviciosArray=response.data;
                    serviciosArray.map(function(x){
                        me.servicios.push({text: x.servicio,value:x.idServicioPericial});
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
                this.idASP= item.idASP;  
                this.dspId = item.dspId;
                this.listarPorDirSub();
                this.agenciaId = item.agenciaId;
                this.servicioId = item.servicioPericialId; 
                this.editedIndex=1;
                this.dialog = true
            },
 

            close () {
                this.dialog = false;
                this.limpiar();
            },
            
            limpiar(){
                this.idASP=""; 
                this.dspId= "";
                this.agenciaId=""; 
                this.servicioId="";   
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
                           var respuesta="";
                            this.$conf.get('api/ASPs/ValidarRegistro/'+ me.agenciaId + ',' + me.servicioId,configuracion).then(function(response){
                               respuesta= response.data;
                          
                               if (respuesta == "Existe registro") {
                                   me.$notify('Este registro ya fue ingresado','error') 
                               } else {
                                   if (respuesta == "No existe registro") {
                                        this.$conf.put('api/ASPs/Actualizar',{
                                            'idASP':me.idASP, 
                                            'agenciaId': me.agenciaId,
                                            'servicioPericialId': me.servicioId 
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
                                   }
                               }
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

                        } else {
                            //Código para guardar
                         
                            let me=this;
                            var respuesta="";
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                            this.$conf.get('api/ASPs/ValidarRegistro/'+ me.agenciaId + ',' + me.servicioId,configuracion).then(function(response){
                               respuesta= response.data;
                          
                               if (respuesta == "Existe registro") {
                                   me.$notify('Este registro ya fue ingresado','error') 
                               } else {
                                   if (respuesta == "No existe registro") {
                              
                                       this.$conf.post('api/ASPs/Crear',{
                                            'agenciaId': me.agenciaId,
                                            'servicioPericialId': me.servicioId 
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


                            
                        }
                    }  
                })
            },
           
            
           
 
        }        
    }
</script>