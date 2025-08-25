<template>
    <v-layout align-start>

        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <NavDrawer/>
        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Dependecias de derivación.</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn @click="dialog=true" class="mx-2 pt-2" v-on="on" fab dark small color="primary" ><v-icon class="mt-1">add</v-icon></v-btn>
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
                                            <v-select name="distrito"
                                                      label="Distrito" 
                                                      v-model="distritoId"
                                                      :items="distritos"  
                                                      v-validate="'required'"
                                                      :error-messages="errors.collect('distrito')" >
                                            </v-select>
                                        </v-flex>
                                       <v-flex xs12 sm12 md12>
                                            <v-text-field name="nombre" 
                                                          label="Nombre"
                                                          v-model="nombre" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('nombre')">
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                             <v-text-field name="direccion" 
                                                          label="Dirección"
                                                          v-model="direccion" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('direccion')">
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                              <v-text-field name="telefono" 
                                                          label="Telefono"
                                                          v-model="telefono" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('telefono')">
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                             <v-text-field name="contacto" 
                                                          label="Contacto"
                                                          v-model="contacto" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('contacto')">
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
                :items="dderivacion"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">
                   
                    <td>{{ props.item.nombre }}</td>
                    <td>{{ props.item.nombreDistrito }}</td>  
                    <td>{{ props.item.direccion }}</td> 
                    <td>{{ props.item.telefono }}</td> 
                    <td>{{ props.item.contacto }}</td>  
                     
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
                    { text: 'Nombre', value: 'nombre' },
                    { text: 'Distrito', value: 'nombreDistrito' },
                    { text: 'Dirección', value: 'direccion', sortable: false },
                    { text: 'Teléfono', value: 'telefono', sortable: false },
                    { text: 'Contacto', value: 'contacto', sortable: false },
                    { text: 'Opciones', value: 'opciones', sortable: false }                                 
                ],
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 10
                },
                editedIndex: -1, 

                dderivacion:[],
               
                idDDerivacion:'',
                nombre: '',  
                direccion:'',
                telefono:'',
                contacto:'', 

                distritos:[], 
                distritoId: '',
                showpage:true,
                e401:false,
                e403:false,

          
           
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nueva dependecia de derivación' : 'Actualizar dependencia de derivación'
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
            this.listarDistritos();

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
                this.$conf.get('api/DependeciasDerivacions/Listar',configuracion).then(function(response){
                    me.dderivacion=response.data;
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
            listarDistritos(){
                let me=this;
                var distritosArray=[];
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/Distritoes/Listar',configuracion).then(function(response){
                    distritosArray=response.data;
                    distritosArray.map(function(x){
                        me.distritos.push({text: x.nombre,value:x.idDistrito});
                    });
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
                this.idDDerivacion= item.idDDerivacion; 
                this.nombre=item.nombre;  
                this.direccion=item.direccion;
                this.telefono=item.telefono;
                this.contacto=item.contacto;   
                this.distritoId=item.distritoId;
                this.editedIndex=1;
                this.dialog = true
            },
 

            close () {
                this.dialog = false;
                this.limpiar();
            },
            
            limpiar(){
                this.idDDerivacion=""; 
                this.distritoId="";
                this.nombre=""; 
                this.direccion="";
                this.telefono="";
                this.contacto="";                 
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
                            this.$conf.put('api/DependeciasDerivacions/Actualizar',{
                                'idDDerivacion':me.idDDerivacion, 
                                'distritoId':me.distritoId,
                                'nombre': me.nombre,
                                'direccion': me.direccion,
                                'telefono': me.telefono, 
                                'contacto': me.contacto
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
                            this.$conf.post('api/DependeciasDerivacions/Crear',{
                                'distritoId': me.distritoId,
                                'nombre': me.nombre,
                                'direccion': me.direccion,
                                'telefono': me.telefono, 
                                'contacto': me.contacto,
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