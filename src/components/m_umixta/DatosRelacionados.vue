<template>  
    <v-layout align-start>
        <n401 v-if="e401" />
        <n403 v-if="e403" />

        <UmixtaNavDrawer />

          <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                        <v-toolbar-title class="font-weight-regular" >Datos Relacionados</v-toolbar-title>
                       
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
                    :items="datos"
                    :search="search" 
                    :rows-per-page-items="rowsPerPageItems"
                    :pagination.sync="pagination"
                     >
                    
                    <template slot="items" class="white" slot-scope="props">
                        
                        
                        <td>{{ props.item.usuario}}</td>   
                        <td>{{ props.item.uModulo}}</td>   
                        <td>{{ props.item.tipo}}</td>   
                        <td>
                            <p>
                                <span v-html="props.item.descripcion"></span>
                                {{ props.item.descripcion }}
                            </p>
                        </td>   
                        <td>{{ props.item.fechasys.substring(8,10) +" de "+ obtenermes(props.item.fechasys.substring(5,7)-1)+" del "+ props.item.fechasys.substring(0,4)+", "+props.item.fechasys.substring(11,19)}}</td> 
                        <td class="justify-center layout px-0"> 
                                <v-tooltip bottom   >
                                    <template v-slot:activator="{ on }">
                                        <v-icon 
                                            class="mr-2" v-on="on" 
                                            @click="edititem(props.item)"
                                            >
                                           edit
                                        </v-icon> 
                                    </template>
                                    <span>Editar registro</span>
                                </v-tooltip>    
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
                    <v-btn  color=success text @click="guardar()" :disabled='clikeado'>Guardar Información</v-btn>
                    <v-btn icon   @click="dialogo = false">
                    <v-icon>close</v-icon>
                    </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
              
                       <v-card-text>
                           <v-form ref="form" >                        
                                <v-container grid-list-md text-xs-center>
                                    <v-layout row wrap>  
    
                                    <v-flex  xs12 xm12 md12 lg12>                       
                                    <v-autocomplete 
                                        name="tipo de dato"   
                                        :items="tipodatos"
                                        v-model="tipodato"
                                        return-object 
                                        v-validate="'required'" 
                                        label="*Tipo de dato:"
                                        :error-messages="errors.collect('tipo de dato')">
                                    </v-autocomplete>
                                    </v-flex>
    
    
                                    <v-flex xs12 xm12 md12 lg12 >
                                        <v-card elevation="0" >
                                            <v-card-title ><h3>*Decripción del dato</h3></v-card-title>
                                                <v-divider ></v-divider>
                                                <v-card-text>
                                                    <v-form  > 
                                                        <vue-editor  
                                                            name="decripción del dato"
                                                            v-validate="'required'"
                                                            v-model="descripcion" 
                                                            outline  height=350px;
                                                            style="max-height: 310px; overflow-y: scroll"
                                                            :editorToolbar="customToolbar"
                                                            :error-messages="errors.collect('decripción del dato')">
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
         
        </v-flex>
    </v-layout> 
    </template>
    
     
    <script> 
      import axios from 'axios'  
      import VeeValidate from 'vee-validate' 
      import { VueEditor } from "vue2-editor";
      import { error } from 'util';
      import moment from 'moment'
      import 'moment/locale/es';
      import n401 from './401.vue'
      import n403 from './403.vue'
      import UmixtaNavDrawer from './umixtaNavDrawer.vue'
    
      export default {
        components: {
            "vue2-editor": VueEditor,
            n401,
            n403,
            UmixtaNavDrawer
        },
        data: () => ({
            alert:false,
            clikeado: false,
            dialog: false, 
            rAtencionId:'',
            rHechoId:'', 
            nuc:'',
            showpage:true,
            e401:false,
            e403:false,
            //*************** */
            dialogo:false,
            datos:[],
            tipodatos:[
                {text:'Numero telefonico de extorsión',value: 'Numero telefonico de extorsión' },
                {text:'Numero  de cuenta extorsión',value: 'Numero  de cuenta extorsión'},
                {text:'Url relacionadas',value: 'Url relacionadas'},
            ],
            tipodato:'',
            descripcion:'',
            IdDatosRelacionados:'',
    
            //*************** */
            
            headers: [
                { text: 'Emitida por', value: 'usuario', sortable: true  }, 
                { text: 'Módulo', value: 'modulo', sortable: true  }, 
                { text: 'Tipo de dato', value: 'tipo', sortable: true  }, 
                { text: 'Descripción',value: 'descripción', sortable: true  }, 
                { text: 'Fecha de registro',value: 'fechasys', sortable: true  }, 
                { text: 'Opciones', value: 'editar', sortable: false },
                                                
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
            
    
            rac:'',
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
                    return this.editedIndex === -1 ? 'Nuevo dato relacionado' : 'Actulizar dato relacionado'
                },
          formIcon () {
                    return this.editedIndex === -1 ? 'add' : 'assignment'
                },
    
        },
        watch: {
            
        },
        methods:{ 
            doSomething: function() {
                if(this.clikeado) {
                    return;
                }
                this.clikeado = true;
            },
            edititem (item) {         
                this.tipodato = new Object() ;          
                this.tipodato.value = item.tipo;
                this.descripcion = item.descripcion;
                this.IdDatosRelacionados = item.idDatosRelacionados;
                this.editedIndex =1;    
                this.dialogo = true;
            },
            cerrarcarpeta () {
                    this.$store.state.rhechoid = null;
                    this.$store.state.nuc= null;
                    this.$router.push('./umixta-carpetas')
                },
            agregar(){
                this.limpiar();
                this.editedIndex = -1;
                this.dialogo= true;
                
    
            },
            close () {
                    this.dialogo = false;
                    this.limpiar();
            },         
            limpiar(){    
                this.listar();
                this.tipodato = '';
                this.descripcion = '';           
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
                    this.$cat.get('api/DatosRelacionados/ListarporIdrhecho/'+ me.rHechoId,configuracion).then(function(response){
                        me.datos=response.data;
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
    
                var descripcionRegTabI = 'Registro de dato relacionado de tipo ' + me.tipodato.text;
    
                me.$validator.validate().then(result => {
                if (result) { 
                    if(this.editedIndex == -1){
                        this.$cat.post('api/DatosRelacionados/Crear',{
                        'rHechoId': me.rHechoId, 
                        'Tipo': me.tipodato.text,
                        'Descripcion': me.descripcion,
                        'udistrito':me.u_distrito,
                        'usubproc': me.u_dirSubPro,
                        'uagencia': me.u_agencia,
                        'usuario': me.u_nombre,
                        'upuesto': me.u_puesto,
                        'umodulo': me.u_modulo
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
                            me.$notify('Error al intentar crear el registro','error')   
                        } 
                    }); 
    
                    }else{
                        this.$cat.put('api/DatosRelacionados/Actualizar',{
                        
                        'idDatosRelacionados':me.IdDatosRelacionados,
                        'Tipo': me.tipodato.value,
                        'Descripcion':me.descripcion,
    
                        },configuracion).then(function(response){                            
                            me.$notify('La información se actualizo correctamente !!!','success')
                            me.dialogo=false;      
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
                            me.$notify('Error al intentar actualizar el registro','error')   
                        } 
                        });
    
                    }
                    
        
                }
                
            }, this.doSomething()) 
              
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
    
    </style>