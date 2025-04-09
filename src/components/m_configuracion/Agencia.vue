<template>
    <v-layout align-start>
        <NavDrawer/>
        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Agencia / Area / Unidad.</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                            
                     <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn @click="dialog=true" class="mx-2" v-on="on" fab dark small color="primary" ><v-icon>add</v-icon></v-btn>
                        </template>
                        <span>Agregar registro </span>
                        
                    </v-tooltip>
                    <v-dialog   v-model="dialog"  max-width="900px"> 
                        
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
                                             <v-autocomplete name="distrito"
                                                      label="Distrito" 
                                                      v-model="distritoId"
                                                      :items="distritos" 
                                                      return-object
                                                      v-on:change="listarDSP" 
                                                      v-validate="'required'"
                                                      :error-messages="errors.collect('distrito')" >
                                            </v-autocomplete>
                                            <v-autocomplete name="dirección o subprocuraduria"
                                                      label="Direccion o subprocuraduria:" 
                                                      v-model="dspId"
                                                      :items="dsps"  
                                                      v-validate="'required'"
                                                      :error-messages="errors.collect('dirección o subprocuraduria')" >
                                            </v-autocomplete>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-autocomplete name="clave" 
                                                          label="Clave:"
                                                          v-model="clave" 
                                                          :items="claves" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('clave')">
                                            </v-autocomplete>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-text-field name="nombre" 
                                                          label="Nombre:"
                                                          v-model="nombre" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('nombre')">
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                             <v-text-field name="direccion" 
                                                          label="Dirección:"
                                                          v-model="direccion" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('direccion')">
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                             <v-text-field name="municipio" 
                                                          label="Municipio:"
                                                          v-model="municipio" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('municipio')">
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                              <v-text-field name="telefono" 
                                                          label="Telefono:"
                                                          v-model="telefono" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('telefono')">
                                            </v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                             <v-text-field name="contacto" 
                                                          label="Contacto:"
                                                          v-model="contacto" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('contacto')">
                                            </v-text-field>
                                        </v-flex>                                    
                                          <v-flex xs12 sm12 md12>
                                                <v-select name="tipo de servicio"
                                                      label="Tipo de servicio:" 
                                                      v-model="tipoServicio"
                                                      :items="tipoServicios"  
                                                      v-validate="'required'"
                                                      :error-messages="errors.collect('tipo de servicio')" >
                                                </v-select> 
                                                <v-switch 
                                                        v-model="condetenido"
                                                        :label="`Servicio de detenciones: ${textosino}`"
                                                        color="success"
                                                ></v-switch>
                                                <v-switch 
                                                        v-model="activa"
                                                        :label="`¿Agencia activa?: ${activasino}`"
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
                :items="agencias"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">
                    
                    <td>{{ props.item.nombreDistrito }}</td> 
                    <td>{{ props.item.nombreDirSub }}</td>  
                    <td>{{ props.item.clave }}</td>
                    <td>{{ props.item.nombre }}</td>  
                    <td>{{ props.item.direccion }}</td> 
                    <td>{{ props.item.municipio }}</td> 
                    <td>{{ props.item.telefono }}</td> 
                    <td>{{ props.item.contacto }}</td>  
                    <td>{{ props.item.tipoServicio }}</td>  
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
    import NavDrawer from './ConfiguracionNavDrawer.vue'

    import VeeValidate from 'vee-validate' 
    import n401 from './401.vue'
    import n403 from './403.vue'
    import { error } from 'util';
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
                    
                    { text: 'Distrito', value: 'nombreDistrito' },
                    { text: 'Dirección o Subprocuradura', value: 'nombreDirSub' },
                    { text: 'Clave', value: 'clave'},
                    { text: 'Nombre', value: 'nombre' }, 
                    { text: 'Dirección', value: 'direccion',  },
                    { text: 'Municipio', value: 'municipio' },
                    { text: 'Teléfono', value: 'telefono',  },
                    { text: 'Contacto', value: 'contacto',  },  
                    { text: 'Tipo de servicio', value: 'tipoServicio',  },    
                    { text: 'Opciones', value: 'opciones', sortable: false },                              
                ],
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 50
                },
                editedIndex: -1, 


                distritos:[], 
                distritoId: '',


                agencias:[], 
                idAgencia:'',
                claves:[],
                clave:'',
                nombre: '',  
                direccion:'',
                municipio:'',
                telefono:'',
                contacto:'',
                tipoServicio:'', 
                condetenido:false,
                activa:false,

                dsps:[], 
                dspId: '', 
                tipoServicios:[
                    'Servicio interno',
                    'Servicio externo con inicio de carpeta',
                    'Servicio externo sin inicio de carpeta',
                ],
                showpage:true,
                e401:false,
                e403:false,
             
           
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nueva agencia' : 'Actualizar agencia'
            },
            formIcon () {
                return this.editedIndex === -1 ? 'add' : 'edit'
            },
            textosino(){
                if(this.condetenido)
                return 'Sí'; else return 'No';
            },
            activasino(){
                if(this.activa)
                return 'Sí'; else return 'No';
            },
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () {
            this.listar();
            this.listarDistritos();
            this.listarClaves();
            

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
                this.$conf.get('api/Agencias/Listar',configuracion).then(function(response){
                    me.agencias=response.data;
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
            listarDSP(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var dspArray=[];
                var iddistrito='';
                me.dsps=[];
                if (me.editedIndex==1)
                {
                    iddistrito=me.distritoId;
                }
                else
                {
                    iddistrito=me.distritoId.value;
                }
                this.$conf.get('api/DSPs/ListarPorDistritoId/' + iddistrito,configuracion).then(function(response){
                    dspArray=response.data;
                    dspArray.map(function(x){
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
            listarClaves()
            {
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                
                var clavesArray = [];
                me.claves = [];

                me.$controlacceso.get('api/Usuarios/ListarClaves',configuracion).then(function(response)
                {
                    clavesArray=response.data;

                    clavesArray.map(function(x){me.claves.push({text: x.nuevaClave});});

                }).catch(err => 
                { 
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
                this.editedIndex=1; 
                this.distritoId =item.distritoId,
                this.listarDSP();
                this.dspId =item.dspId; 
                this.idAgencia= item.idAgencia; 
                this.clave= item.clave; 
                this.nombre=item.nombre;  
                this.direccion=item.direccion;
                this.municipio=item.municipio;
                this.telefono=item.telefono;
                this.contacto=item.contacto;
                this.tipoServicio= item.tipoServicio;
                this.dspId=item.dspId;
                
                this.dialog = true;
                this.condetenido = item.condetencion;
                this.activa = item.activa;
            }, 
            close () {
                this.dialog = false;
                this.limpiar();
            }, 
            limpiar(){
                this.distritoId="";
                this.idAgencia=""; 
                this.dspId="";
                this.clave="";
                this.nombre=""; 
                this.direccion="";
                this.municipio="";
                this.telefono="";
                this.contacto="";  
                this.tipoServicio="";               
                this.editedIndex=-1;
                this.condetenido = false;
                this.activa = false;
            },
            guardar () {
                this.$validator.validate().then(result => {
                    if (result) { 
                        if (this.editedIndex > -1) {
                            
                            //Código para editar 
                            let me=this;
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                            this.$conf.put('api/Agencias/Actualizar',{
                                'idAgencia':me.idAgencia, 
                                'dSPId':me.dspId,
                                'clave': me.clave,
                                'nombre': me.nombre,
                                'direccion': me.direccion,
                                'municipio': me.municipio,
                                'telefono': me.telefono, 
                                'contacto': me.contacto,
                                'tiposervicio':me.tipoServicio,
                                'Condetencion': me.condetenido,
                                'activa': me.activa,
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
                            debugger
                            let me=this;
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                            this.$conf.post('api/Agencias/Crear',{
                                'dSPId': me.dspId,
                                'clave': me.clave,
                                'nombre': me.nombre,
                                'direccion': me.direccion,
                                'municipio': me.municipio,
                                'telefono': me.telefono, 
                                'contacto': me.contacto,
                                'tiposervicio':me.tipoServicio,
                                'Condetencion': me.condetenido,
                                'activa': me.activa,
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