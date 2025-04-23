<template>  
<v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
      <v-flex v-if="showpage">
        <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Carpetas devueltas UI</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>



                    
        </v-toolbar>
        <v-data-table
                :headers="headers"
                :items="colaboraciones"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                 >
                
                <template slot="items" class="white" slot-scope="props">
                    
                    
                    <td>{{ props.item.usuario}}</td>   
                    <td>{{ props.item.uSubproc}}</td>
                    <td>{{ props.item.uAgencia}}</td>
                    <td>{{ props.item.uModulo}}</td>     
                    <td>{{ props.item.nuc}}</td>             
                    <td>{{ props.item.fechasys.substring(8,10) +" de "+ obtenermes(props.item.fechasys.substring(5,7)-1)+" del "+props.item.fechasys.substring(0,4)+", "+props.item.fechasys.substring(11,19)}}</td>    
                    <td>{{ props.item.status }}</td>
                    <td class="layout" >       
                        <v-tooltip bottom  >
                            <template v-slot:activator="{ on }">
                                <v-icon 
                                    class="mr-2" v-on="on"  
                                    @click="verinfo(props.item)"
                                    >
                                    question_answer
                                </v-icon> 
                            </template>
                            <span>Ver razón de devolución</span>
                        </v-tooltip>                                            
                      
                    </td>         
 
                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar()"  >Resetear</v-btn>
                </template>
                
        </v-data-table>
        
        
        <v-dialog  v-model="dialogomsjrechazo"  max-width="700px" >

            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">info</v-icon>
                    </v-avatar>
                    
                    <v-toolbar-title class="subheading">Información</v-toolbar-title>
                    <v-spacer></v-spacer>                  
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" data-vv-scope="Aceptar" >
                        <v-container grid-list-md text-xs-center>
                            <v-layout wrap>

                                <v-flex  class="espaciado" xs12 sm12 md12 lg12>
                                    
                                    <v-list two-line   >

                                        <v-list-tile>  
                                            <v-list-tile-action>
                                                <v-icon color="success">location_city</v-icon>
                                            </v-list-tile-action> 
                                            <v-list-tile-content   >  
                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Fecha de devolución:</a></p> </v-list-tile-title> 
                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ frechazo }}</a></p>  </v-list-tile-sub-title>  
                                            </v-list-tile-content> 
                                        </v-list-tile>

                                        <v-list-tile>  
                                            <v-list-tile-action>
                                                <v-icon color="success">location_city</v-icon>
                                            </v-list-tile-action> 
                                            <v-list-tile-content   >  
                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Mensaje de devolución:</a></p> </v-list-tile-title> 
                                                <v-list-tile-sub-title   > <p v-html="rechazo"   color="accent" class="caption font-weight-regular"><a>{{ rechazo }}</a></p>  </v-list-tile-sub-title>  
                                            </v-list-tile-content> 
                                        </v-list-tile> 

                                    </v-list> 
                                        
                                </v-flex>    

                            </v-layout>
                        </v-container>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click.native="dialogomsjrechazo=false" >Cerrar</v-btn>                                  
                        </v-card-actions> 
                    </v-form>
                
                </v-card-text> 
            </v-card>

        </v-dialog>
     
    </v-flex>
</v-layout> 
</template>

 
<script> 
  import axios from 'axios'  
  import VeeValidate from 'vee-validate' 
  import { WebCam } from "vue-web-cam";
  import { VueEditor } from "vue2-editor";
  import { error } from 'util';
  import moment from 'moment'
  import 'moment/locale/es';
  import n401 from './401.vue'
  import n403 from './403.vue'

  var assert, curp, persona;
  assert = require('assert');
  curp = require('curp.js');  

  export default {
    components: {
        "vue2-editor": VueEditor,
        n401,
        n403
    },
    data: () => ({
        alert:false,
        dialog: false, 
        rAtencionId:'',
        rHechoId:'', 
        nuc:'',
        showpage:true,
        e401:false,
        e403:false,
        //*************** */
        colaboraciones:[],
        dialogomsjrechazo: false,
        rechazo:'',
        frechazo:'',
        //*************** */
        
        headers: [
            { text: 'Emitida por', value: 'usuario', sortable: true  },
            { text: 'Subprocuraduria', value: 'uSubproc', sortable: true  }, 
            { text: 'Agencia', value: 'uAgencia', sortable: true  },
            { text: 'Módulo', value: 'modulo', sortable: true  }, 
            { text: 'Nuc', value: 'nuc', sortable: true  },
            { text: 'Fecha de emisión',value: 'fechasys' }, 
            { text: 'Status',value: 'status' }, 
            { text: 'Opciones', value: 'opciones', sortable: false },                             
        ],
        customToolbar: [ 
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            ['align',{ 'align': 'center'}, { 'align': 'right' }, { 'align': 'justify' }  ], 
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }  ],  
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }], 
            [{ 'color': [] }, { 'background': [] }], 
        ],
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
        editedIndex: 0, 
        modalAdd:false,

        //********************************/
   
        //-----CLAIM------------------------------------------
        u_iddistrito:'',
        u_distrito:'',
        u_dirSubPro:'',
        u_idagencia:'',
        u_agencia:'',
        u_idmoduloservicio:'',
        u_modulo:'',
        u_idusuario:'',
        u_nombre:'',
        u_clave:'',
        u_rol:'',
        u_puesto:'',
        u_subproc:'',
        //----------------------------------------------------
    }),
       
    created () {
            let me = this 

                me.u_iddistrito=me.$store.state.usuario.iddistrito;
                me.u_distrito=me.$store.state.usuario.distrito;
                me.u_dirSubPro=me.$store.state.usuario.dirSubProc;
                me.u_idagencia=me.$store.state.usuario.idagencia;
                me.u_agencia=me.$store.state.usuario.agencia;
                me.u_idmoduloservicio=me.$store.state.usuario.idmoduloservicio;
                me.u_modulo=me.$store.state.usuario.modulo;
                me.u_idusuario=me.$store.state.usuario.idusuario;
                me.u_nombre=me.$store.state.usuario.usuario;
                me.u_clave=me.$store.state.usuario.clave;
                me.u_rol=me.$store.state.usuario.rol;
                me.u_puesto=me.$store.state.usuario.puesto;
                me.u_subproc=me.$store.state.usuario.subProc;

                //*********************************************** */
               
                me.listar();
                me.listarLogo();
               
      
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
    computed: {
      formTitle () {
                return this.editedIndex === -1 ? 'Nueva Arma u Objeto' : 'Actulizar Arma u Objeto'
            },
      formIcon () {
                return this.editedIndex === -1 ? 'add' : 'assignment'
            },

    },
    watch: {
        
    },
    methods:{ 
        listarLogo(){
        
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$conf.get('api/ConfGlobals/Listar',configuracion).then(function(response){
                me.logo1= response.data.logo1;
                me.logo2= response.data.logo2;
                
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
        cerrarcarpeta () {
                this.$store.state.rhechoid = null;
                this.$store.state.nuc= null;
                this.$router.push('./umixta-carpetas')
        },
        verinfo(item){

            this.frechazo =  item.fechaRechazo.substring(8,10) +" de "+ this.obtenermes(item.fechaRechazo.substring(5,7)-1)+" del "+item.fechaRechazo.substring(0,4)
            this.rechazo = item.rechazo
            this.dialogomsjrechazo = true
        },
        listar(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$cat.get('api/RemisionesUI/ListarporModuloEnvia/'+ me.u_idmoduloservicio,configuracion).then(function(response){
                me.colaboraciones=response.data;
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
        generarfecha(){
            var fecha;
            fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY");
            return fecha;      
        }, 
        
       
      } 
   }
</script>
<style>
.espaciado{
    padding: 30px !important; 
}  

</style>