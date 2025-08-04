<template>
    <v-layout align-start>

        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <NavDrawer/>
        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Distrito.</v-toolbar-title>
                   
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

                    <v-dialog   v-model="dialog" max-width="600px" persistent>


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
                                        <v-text-field name="clave" 
                                                        label="Clave:"
                                                        v-model="clave" 
                                                        v-validate="'required'"
                                                        :error-messages="errors.collect('clave')">
                                        </v-text-field>
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
                                             <v-text-field name="nombre JR" 
                                                          label="Nombre para JR"
                                                          v-model="nombrejr" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('nombre JR')">
                                            </v-text-field>
                                            <v-text-field name="url distrito" 
                                                          label="URL del distrito"
                                                          v-model="urlDistrito" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('url distrito')">
                                            </v-text-field>
                                        </v-flex>          
                                             
                                         <v-switch v-model="switch1"   label="¿Distrito default?:" color="success"  hide-details></v-switch>
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
                :items="distritos"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">                  
                    <td>{{ props.item.clave }}</td>
                    <td>{{ props.item.nombre }}</td> 
                    <td>{{ props.item.direccion }}</td> 
                    <td>{{ props.item.telefono }}</td> 
                    <td>{{ props.item.contacto }}</td>  
                    <td>
                        <div v-if="props.item.statusAsginacion">
                           <v-icon  small  class="mr-2" color="success">bookmark</v-icon>
                        </div>
                        <div v-else>
                            <v-icon  small  class="mr-2" color="success">remove</v-icon>
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
            <v-dialog   v-model="bloqueo" max-width="600px" persistent></v-dialog>
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
                   
                    { text: 'Clave', value: 'clave'},
                    { text: 'Nombre', value: 'nombre' },
                    { text: 'Dirección', value: 'direccion',  },
                    { text: 'Teléfono', value: 'telefono',  },
                    { text: 'Contacto', value: 'contacto',  }, 
                    { text: 'Default', value: 'statusAsginacion', sortable: false },   
                     { text: 'Opciones', value: 'opciones', sortable: false },                 
                ],
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 50
                },
                editedIndex: -1,
                distritos:[],
                idDistrito: '',
                clave:'',
                nombre: '',
                direccion:'',
                telefono:'',
                contacto:'', 
                switch1: false,
                showpage:true,
                e401:false,
                e403:false,
                nombrejr:'',
                DistritoCxn: [],
                proceso: '',
                bloqueo: false,
                urlDistrito:''
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nuevo distrito' : 'Actualizar distrito'
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
                this.$conf.get('api/Distritoes/Listar',configuracion).then(function(response){
                    //console.log(response);
                    me.distritos=response.data;
                    me.distritos.map(function(x){
                        me.DistritoCxn.push({text: x.nombre, value: x.idDistrito});
                    });
                    me.bloqueo = false;
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
                this.idDistrito= item.idDistrito;
                this.clave= item.clave; 
                this.nombre=item.nombre; 
                this.direccion=item.direccion;
                this.telefono=item.telefono;
                this.contacto=item.contacto;
                this.nombrejr=item.nombrejr;
                this.urlDistrito = item.urlDistrito;
                this.editedIndex=1;
                this.switch1 = item.statusAsginacion;
                this.dialog = true
            },
 

            close () {
                this.dialog = false;
                this.limpiar();
            },
            
            limpiar(){
                this.idDistrito="";
                this.clave="";
                this.nombre="";
                this.direccion="";
                this.telefono="";
                this.contacto=""; 
                this.nombrejr="";
                this.urlDistrito = "";
                this.switch1= false;
                this.editedIndex=-1;
            },
            guardar () {
                this.$validator.validate().then(result => {
                    if (result) {  
                        this.bloqueo = true;
                        if (this.editedIndex > -1) {
                            //Código para editar
                            let me=this;
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                            this.$conf.put('api/Distritoes/ActualizarPachuca',{
                                'idDistrito':me.idDistrito,
                                'nombre': me.nombre,
                                'clave': me.clave,
                                'direccion': me.direccion,
                                'telefono': me.telefono, 
                                'contacto': me.contacto,
                                'statusAsginacion':me.switch1,
                                'nombrejr':me.nombrejr,
                            'urlDistrito':me.urlDistrito,
                            },configuracion).then(async function(response){
                                let newDistrito = response.data.id;
                                await me.clonacionDistritos(newDistrito);
                                me.$notify('La información se actualizo correctamente !!!','success')
                                me.close();   
                                me.listar();
                                me.limpiar();              
                           }).catch(err => { 
                                me.$notify(`Error al actualizar distrito en Pachuca`, 'error'); 
                            });
                        } else {
                            //Código para guardar
                            let me=this;
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                            this.$conf.post('api/Distritoes/CrearPachuca',{ 
                                'nombre': me.nombre,
                                'clave': me.clave,
                                'direccion': me.direccion,
                                'telefono': me.telefono, 
                                'contacto': me.contacto,
                                'statusAsginacion':me.switch1,
                                'nombrejr':me.nombrejr,
                            'urlDistrito':me.urlDistrito,
                            },configuracion).then(async function(response){
                                let newDistrito = response.data.id;     
                                await me.clonacionDistritos(newDistrito); 
                                me.$notify('La información se guardo correctamente !!!','success') 
                                me.close(); 
                                me.listar();
                                me.limpiar();                        
                            }).catch(err => { 
                                me.$notify(`Error al guardar distrito en Pachuca`, 'error'); 
                            });
                        }
                    }
                })  
            },
            
            async clonacionDistritos(newDistrito){
                let me = this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                for (let i = 0; i < me.DistritoCxn.length; i++) { 
                    var idErrorG = me.DistritoCxn[i]; 
                    try{
                       const response = await this.$conf.post('api/Distritoes/ClonarDistritos',{ 
                                'idDistrito': newDistrito,
                                'nombre': me.nombre,
                                'clave': me.clave,
                                'direccion': me.direccion,
                                'telefono': me.telefono, 
                                'contacto': me.contacto,
                                'statusAsginacion':me.switch1,
                                'nombrejr':me.nombrejr,
                                'urlDistrito':me.urlDistrito,
                                'distritoCnx': me.DistritoCxn[i].value
                            },configuracion);

                            if(response.status == 200){
                                var ActR = true;
                                await me.guardarErrorReplic(idErrorG,newDistrito, ActR)
                            }
                    } catch(error) {
                        me.$notify(`Error al guardar distrito en: ${me.DistritoCxn[i].text}`, 'error');          
                        var ActR = false;
                        await me.guardarErrorReplic(idErrorG,newDistrito, ActR)
                    }             
                }    
            },
            async guardarErrorReplic(idErrorG,newDistrito, ActR){
                let me = this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.proceso = me.editedIndex === -1?'Guardar':'Actualizar'

                try{
                   const response =  await this.$conf.post('api/ErroresReplicacion/RegistrarError',{
                        'registroErrorId': newDistrito,
                        'distritoId': idErrorG.value,
                        'nombreDistrito': idErrorG.text,
                        'modulo': "Distrito",
                        'proceso': me.proceso,
                        'status': true,
                        'ActualizaRegistro': ActR
                    }, configuracion);

                    if(response.status == 201){
                         me.$notify(response.data.mensaje, 'warning');
                    }
                }
                catch(error){
                    me.$notify("No se pudo crear o actualizar el registro del error.", 'error');
                }
               
            }
        }
    }
</script>