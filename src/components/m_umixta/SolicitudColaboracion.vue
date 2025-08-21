<template>  
    <v-layout align-start>
        <n401 v-if="e401" />
        <n403 v-if="e403" />

        <UmixtaNavDrawer />

        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-regular" >Solicitud de Colaboración a MP</v-toolbar-title>
                       
                <v-divider class="mx-2" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-flex xs12 sm6 md3 lg3>
                    <v-text-field class="font-weight-regular"
                        v-model="nuc" disabled  prepend-icon="folder"
                        filled
                    ></v-text-field>
                </v-flex>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }"> 
                        <v-btn class="mx-2 pt-2" slot="activator" v-on="on" @click="cerrarcarpeta" fab dark small color="primary">
                            <v-icon class="mt-1" dark>close</v-icon>
                        </v-btn>
                    </template>
                    <span>Cerrar carpeta</span>
                </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn class="mx-2 pt-2" slot="activator" v-on="on" @click="agregar" fab dark small color="success">
                                <v-icon class="mt-1" dark>add</v-icon>
                            </v-btn>
                        </template>
                        <span>Agregar registro</span>
                    </v-tooltip>
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
                        <td>{{ props.item.uModulo}}</td>                     
                        <td>{{ props.item.tipoColaboracion}}</td>   
                        <td>{{ props.item.usuarioSolicita}}</td>
                        <td>{{ props.item.fechasys.substring(8,10) +" de "+ obtenermes(props.item.fechasys.substring(5,7)-1)+" del "+props.item.fechasys.substring(0,4)}}</td>   
                        <td>{{ props.item.status }}</td>
                        <td class="" >                                                 
                            <div v-if="props.item.status == 'Rechazado'">
                                <v-tooltip bottom  >
                                    <template v-slot:activator="{ on }">
                                        <v-icon 
                                            class="mr-2" v-on="on"  
                                            @click="verinfo(props.item)"
                                            >
                                            highlight_off
                                        </v-icon> 
                                    </template>
                                    <span>Ver msj de rechazo</span>
                                </v-tooltip>
                            </div> 
                            <div v-if="props.item.status == 'Finalizada'" >
                                <v-tooltip bottom  >
                                    <template v-slot:activator="{ on }">
                                        <v-icon 
                                            class="mr-2" v-on="on"  
                                            @click="verinfo(props.item)"
                                            >
                                            check_circle_outline
                                        </v-icon> 
                                    </template>
                                    <span>Ver respuesta</span>
                                </v-tooltip>
                            </div>   
                        </td>
                    </template>
                    <template slot="no-data">
                        <v-btn color="primary" @click="listar()"  >Resetear</v-btn>
                    </template>
            </v-data-table>
            
            <v-dialog v-model="dialogo" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>{{formTitle}}.</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                        <v-btn  color=success text @click="guardar()">Guardar Información</v-btn>
                        <v-btn icon   @click="dialogo = false">
                        <v-icon>close</v-icon>
                        </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
              
                    <v-card-text>
                        <v-form ref="form" >                        
                            <v-container grid-list-md text-xs-center>
                                <v-layout row wrap>  
                                    <v-flex class="espaciado" xs12 xm12 md6 lg6>
                                        <v-autocomplete 
                                            name="distrito"   
                                            :items="distritos"
                                            v-model="distrito"
                                            return-object 
                                            @change="listardsp()" 
                                            v-validate="'required'" 
                                            label="*Distrito:"
                                            :error-messages="errors.collect('distrito')">
                                        </v-autocomplete>
                                        <v-autocomplete 
                                            name="subprocuraduria"   
                                            :items="dsps"
                                            v-model="dps"
                                            return-object 
                                            v-validate="'required'" 
                                            label="*Subprocuraduria:"
                                            @change="listaragencias()" 
                                            :error-messages="errors.collect('subprocuraduria')">
                                        </v-autocomplete>
                                    </v-flex>       
                                    
                                    <v-flex class="espaciado" xs12 xm12 md6 lg6>
                                        <v-autocomplete 
                                            name="agencia"   
                                            :items="agencias"
                                            v-model="agencia"
                                            return-object 
                                            v-validate="'required'" 
                                            label="*Agencia:"
                                            :error-messages="errors.collect('agencia')">
                                        </v-autocomplete>
                                        <v-text-field 
                                            name="tipo de colaboración" 
                                            label="*Tipo de colaboración:" 
                                            v-model="tipocolaboracion"
                                            v-validate="'required'"    
                                            :error-messages="errors.collect('tipo de colaboración')">
                                        </v-text-field>
                                    </v-flex>
    
                                    <v-flex xs12 xm12 md12 lg12 >
                                        <v-card elevation="0" >
                                            <v-card-title ><h3>*Descripción de colaboración</h3></v-card-title>
                                            <v-divider ></v-divider>
                                            <v-card-text>
                                                <v-form  > 
                                                    <vue-editor  
                                                        name="texto"
                                                        v-validate="'required'"
                                                        v-model="texto" 
                                                        outline  height=350px;
                                                        style="max-height: 310px; overflow-y: scroll"
                                                        :editorToolbar="customToolbar"
                                                        :error-messages="errors.collect('texto')">
                                                    </vue-editor>
                                                </v-form>
                                            </v-card-text>
                                        </v-card>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
    
            <v-dialog  v-model="dialogoinfo"  max-width="1000px">
                <v-card>
                    <v-toolbar card dark color="grey lighten-4 primary--text">
                        <v-avatar  size="30">
                            <v-icon class="grey lighten-2">info</v-icon>
                        </v-avatar>
                        <v-toolbar-title class="subheading">Información completa</v-toolbar-title>
                        <v-spacer></v-spacer>                  
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" >
                            <v-container grid-list-md text-xs-center>
                                <v-layout wrap>
                                    <v-flex  class="espaciado" xs12 sm12 md6 lg6>
                                        <v-list two-line   > 
                                            <v-list-tile>  
                                                <v-list-tile-action>
                                                    <v-icon color="success">location_city</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content   >  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Agencia Origen:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ datos.agenciaOrigen }}</a></p>  </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile>
                                            <v-list-tile>  
                                                <v-list-tile-action>
                                                    <v-icon color="success">grid_on</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content   >  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Tipo de colaboración:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ datos.tipoColaboracion }}</a></p>  </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile>                                                       
                                        </v-list>
                                    </v-flex>    
    
                                    <v-flex  class="espaciado" xs12 sm12 md6 lg6>
                                        <v-list two-line> 
                                            <v-list-tile>  
                                                <v-list-tile-action>
                                                    <v-icon color="success">apartment</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content   >  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Agencia destino:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ datos.agenciaDestino }}</a></p>  </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile>   
    
                                            <v-list-tile v-if="datos.status == 'Finalizada'">  
                                                <v-list-tile-action>
                                                    <v-icon color="success">insert_invitation</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content   >  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Fecha de respuesta:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a> {{ datos.fechaRespuesta.substring(8,10) +" de "+ obtenermes(datos.fechaRespuesta.substring(5,7)-1)+" del "+datos.fechaRespuesta.substring(0,4)  }} </a></p>  </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile>   
    
                                            <v-list-tile v-if="datos.status == 'Rechazado'">  
                                                <v-list-tile-action>
                                                    <v-icon color="success">insert_invitation</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content   >  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Fecha de rechazo:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a> {{ datos.fechaRechazo.substring(8,10) +" de "+ obtenermes(datos.fechaRechazo.substring(5,7)-1)+" del "+datos.fechaRechazo.substring(0,4)  }} </a></p>  </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile>                    
                                        </v-list>
                                    </v-flex>    
    
                                    <v-flex  class="espaciado" xs12 sm12 md6 lg6>
                                        <v-list two-line>
                                            <v-list-tile>  
                                                <v-list-tile-action>
                                                    <v-icon color="success">local_post_office</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content>  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Mensaje de solicitud:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title> 
                                                        <p color="accent" class="caption font-weight-regular">
                                                            <span v-html="datos.texto"></span>
                                                            <a>{{ datos.texto }}</a>
                                                        </p>  
                                                    </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile>       
    
                                            <v-list-tile>  
                                                <v-list-tile-action>
                                                    <v-icon color="success">local_post_office</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content>  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Respuesta:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title> 
                                                        <p color="accent" class="caption font-weight-regular">
                                                            <span v-html="datos.respuesta"></span>
                                                            <a>{{ datos.respuesta }}</a>
                                                        </p>
                                                    </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile>
                                        </v-list>
                                    </v-flex>
                                </v-layout>
                            </v-container>
    
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn  @click.native="dialogoinfo=false" >Cerrar</v-btn>                                   
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
    import { VueEditor } from "vue2-editor"
    import { error } from 'util'
    import moment from 'moment'
    import 'moment/locale/es'
    import n401 from './401.vue'
    import n403 from './403.vue'
    import UmixtaNavDrawer from './umixtaNavDrawer.vue'
    
    var assert, curp, persona;
    assert = require('assert');
    curp = require('curp.js');  
    
    export default {
        components: {
            "vue2-editor": VueEditor,
            n401,
            n403,
            UmixtaNavDrawer
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
               
            //*************** */
            
            headers: [
                { text: 'Emitida por', value: 'usuario', sortable: true  }, 
                { text: 'Modulo', value: 'uModulo', sortable: true  }, 
                { text: 'Tipo de Colaboracion', value: 'tipoColaboracion', sortable: true  }, 
                { text: 'Solicitado por',value: 'usuarioSolicita', sortable: true  }, 
                { text: 'Fecha solicitud',value: 'fechasys', sortable: true  }, 
                { text: 'Status',value: 'status', sortable: true  }, 
                { text: 'Opciones',value: 'op', sortable: false  },                                
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
            dialogo:false,
            colaboraciones:[],
            distritos:[],
            distrito:'',
            dsps:[],
            dps:'',
            agencias:[],
            agencia:'',
            tipocolaboracion:'',
            texto:'',
            dialogoinfo:false,
            datos:[],
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
                me.rHechoId =  me.$store.state.rhechoid;
                me.nuc = me.$store.state.nuc;
                if (me.rHechoId== null)
            {
                    me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpeta y luego en Listar carpeta y   ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.', 
                    function(){ 
    
                            me.$router.push('./umixta-carpetas')
                    })
            }
            else{
                    me.$notify('Carpeta abierta correctamente','success')
                    
    
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
                    me.listardistritos();
    
            }
          
          
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
                    return this.editedIndex === -1 ? 'Nueva Arma u Objeto' : 'Solicitud de Colaboración'
                },
          formIcon () {
                    return this.editedIndex === -1 ? 'add' : 'assignment'
                },
    
        },
        watch: {
            
        },
        methods:{ 
       
            cerrarcarpeta () {
                    this.$store.state.rhechoid = null;
                    this.$store.state.nuc= null;
                    this.$router.push('./umixta-carpetas')
            },
            agregar(){
                this.limpiar();
                this.dialogo= true;
            }, 
            limpiar(){    
                this.agencia = ""
                this.dps = ""
                this.distrito =""
                this.texto = ""
                this.tipocolaboracion =""
    
            },
            verinfo(item){
                this.datos = item
                this.dialogoinfo = true
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
            listar(){
              let me=this;  
              let header={"Authorization" : "Bearer " + this.$store.state.token};
              let configuracion= {headers : header};
                    this.$cat.get('api/SColaboracionMP/Listar/'+ me.rHechoId,configuracion).then(function(response){
                        me.colaboraciones=response.data;
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
            listardistritos(){ 
                var distritoarray = [];
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                
                me.$conf.get('api/Distritoes/Listar',configuracion).then(function(response){
                    distritoarray = response.data;
                    distritoarray.map(function(x){
                        me.distritos.push({text: x.nombre,value: x.idDistrito});
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
            listardsp(){ 
                var dsparray = [];
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.dsps = []
    
                me.$conf.get('api/DSPs/ListarPorDistritoyICarpeta/'+me.distrito.value,configuracion).then(function(response){
                    dsparray = response.data;
                    dsparray.map(function(x){
                        me.dsps.push({text: x.nombreSubDir,value: x.idDSP});
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
            listaragencias(){ 
                var agenciasarray = [];
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.agencias = []
    
                me.$conf.get('api/Agencias/ListarcarpetasporDsP/'+me.dps.value,configuracion).then(function(response){
    
                    if(response.data != ""){
                        agenciasarray = response.data;
                        agenciasarray.map(function(x){
                        me.agencias.push({text: x.nombre,value: x.idAgencia});
                    });
                    }else
                        me.$notify("La subprocuraduria no cuenta con agencias de carpeta", 'error')
    
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
    
            guardar(){ 
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
    
                var descripcionRegTabI = 'Registro de solicitud de colaboracion a ' + me.agencia.text + ' por el tipo de colaboracion de ' + me.tipocolaboracion;
    
                me.$validator.validate().then(result => {
                if (result) {             
                        this.$cat.post('api/SColaboracionMP/Crear',{
                        'RHechoId': me.rHechoId, 
                        'AgenciaId':me.agencia.value,
                        'Texto':me.texto,
                        'TipoColaboracion':me.tipocolaboracion,
                        'NUC':me.nuc,
                        'UsuarioSolicita':me.u_nombre,
                        'AgenciaOrigen': me.u_agencia,
                        'AgenciaDestino': me.agencia.text,
                        'Status': "Solicitado",
                        'FechaRespuesta': "0001-01-01",
                        'FechaRechazo': "0001-01-01",
                        'UDistrito': me.u_distrito,
                        'USubproc': me.u_dirSubPro,
                        'Usuario': me.u_nombre,
                        'uPuesto': me.u_puesto,
                        'uModulo': me.u_modulo,
                        'uAgencia': me.u_agencia,
    
                    },configuracion).then(function(response){  
                        me.$notify('¡La información se guardo correctamente!','success')   
                        me.dialogo=false;  
                        me.crearRegistroTableroI(descripcionRegTabI);    
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
        
                }
                
            }) 
              
            },
            crearRegistroTableroI(descripcionRegTabI){
                    
                    let me=this;
                    let header={"Authorization" : "Bearer " + this.$store.state.token};
                    let configuracion= {headers : header};
                
                    this.$cat.post('api/RegistroTableroI/Crear',{
                        'RhechoId': me.rHechoId,
                        'TipoRegistroTableroI': descripcionRegTabI,
                        'Distrito': me.u_distrito,
                        'DirSub': me.u_dirSubPro,
                        'Agencia':me.u_agencia,
                        'ModuloServicioId': me.u_idmoduloservicio,
                        'Modulo':me.u_modulo,
                        'UsuarioId':me.u_idusuario,
                        'NombreUsuario': me.u_nombre,
                
                    },configuracion).then(function(response){
                        me.$notify('¡La información se guardo correctamente!','success')
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
                
                },
                
           
          } 
       }
    </script>
    <style>
    .espaciado{
        padding: 30px !important; 
    }  
    
    </style>