<template>  
<v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
      <v-flex v-if="showpage">
        <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Reasignación de dirección de escucha</v-toolbar-title>
                   
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
                                    <v-btn class="mx-2" slot="activator" v-on="on" @click="cerrarcarpeta" fab dark small color="primary">
                                        <v-icon dark>close</v-icon>
                                    </v-btn>
                                </template>
                                <span>Cerrar carpeta</span>
                        </v-tooltip>
                    
        </v-toolbar>
        <v-data-table
            :headers="headers"
            :items="personas"
            :search="search" 
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
                >
            
            <template slot="items" class="white" slot-scope="props">
                
                
                <td>{{ props.item.nombreCompleto}}</td>   
                <td>{{ props.item.clasificacionPersona}}</td>   
                <td>{{ props.item.curp}}</td>   
                <td class=" layout "> 
                        <v-tooltip bottom   >
                            <template v-slot:activator="{ on }">
                                <v-icon 
                                    class="mr-2" v-on="on" 
                                    @click="representantesver(props.item)"
                                    >
                                    people_alt
                                </v-icon> 
                            </template>
                            <span>Ver representantes</span>
                        </v-tooltip>    
                </td>       

            </template>
            <template slot="no-data">
                <v-btn color="primary" @click="listar()"  >Resetear</v-btn>
            </template>
                
        </v-data-table>    


        <v-dialog  v-model="dialogorepresentantes"  max-width="1000px" >

            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">people_alt</v-icon>
                    </v-avatar>
                    
                    <v-toolbar-title class="subheading">Representantes</v-toolbar-title>
                    <v-spacer></v-spacer>                  
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" >
                        <v-container >
                            <v-layout wrap>
                                <v-flex  xs12 sm12 md12 lg12 >

                                    <v-data-table
                                        :headers="headers2"
                                        :items="representantes"
                                        :search="search2" 
                                        :rows-per-page-items="rowsPerPageItems"
                                        :pagination.sync="pagination"
                                            >
                                        
                                        <template slot="items" class="white" slot-scope="props">
                                            
                                            
                                            <td>{{ props.item.nombres + " "+ props.item.apellidoPa + " " + props.item.apellidoMa}}</td>   
                                            <td>
                                                <div v-if="props.item.tipo1 >0">
                                                    <span class="blue--text">{{calcularRepresentante(props.item.tipo1)}}</span>
                                                </div>
                                                <div v-else-if="props.item.tipo1 <0">
                                                    <span class="red--text">{{calcularRepresentante(props.item.tipo1)}}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div v-if="props.item.tipo2 > 0">
                                                    <span class="blue--text">{{calcularRepresentante(props.item.tipo2)}}</span>
                                                </div>
                                                <div v-else-if="props.item.tipo2 <0">
                                                    <span class="red--text">{{calcularRepresentante(props.item.tipo2)}}</span>
                                                </div>
                                            </td>     
                                            <td class=" layout "> 
                                                    <v-tooltip bottom   >
                                                        <template v-slot:activator="{ on }">
                                                            <v-icon 
                                                                class="mr-2" v-on="on" 
                                                                @click="actualizardireccion(props.item)"
                                                                >
                                                                update
                                                            </v-icon> 
                                                        </template>
                                                        <span>Actualizar dirección de escucha a la de este representante</span>
                                                    </v-tooltip>    
                                            </td>       

                                        </template>
                                            
                                    </v-data-table>
                                </v-flex>                               
                            </v-layout>
                        </v-container>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click.native="dialogorepresentantes=false" >Cerrar</v-btn>                                   
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
  import { VueEditor } from "vue2-editor";
  import { error } from 'util';
  import moment from 'moment'
  import 'moment/locale/es';
  import n401 from './401.vue'
  import n403 from './403.vue'

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
        personas:[],
        representantes:[],
        dialogorepresentantes:false,
        trepresentantes:[],
        idDE:'',
        //*************** */
        
        headers: [
            { text: 'Nombre de la persona', value: 'nombreCompleto', sortable: true  }, 
            { text: 'Relación en la carpeta', value: 'clasificacionPersona', sortable: true  }, 
            { text: 'Curp', value: 'curp', sortable: true  },  
            { text: 'Opciones', value: 'editar', sortable: false },
                                            
        ],
        headers2: [
            { text: 'Nombre del representante', value: 'personaR', sortable: true  }, 
            { text: 'Tipo 1', value: 'tipo1', sortable: true  }, 
            { text: 'Tipo 2', value: 'tipo2', sortable: true  },  
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
        search2: '',
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
            me.rAtencionId = me.$store.state.ratencionid
            me.nuc = me.$store.state.nuc;
            if (me.rHechoId== null)
        {
                me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpeta y luego en Listar carpeta y   ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.', 
                function(){ 

                        me.$router.push('./umixta-carpetas')
                })
        }
        else{
                me.$notify('Carpeta abierta correctamente !!!','success')
                

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
                me.Listartrepresentantes();
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
        cerrarcarpeta () {
                this.$store.state.rhechoid = null;
                this.$store.state.nuc= null;
                this.$router.push('./umixta-carpetas')
            },        
        limpiar(){    
            this.idDE = ""         
        },
        calcularRepresentante(representante){
            let me = this;
            if(representante>0){     
                for(var i=0;i<me.trepresentantes.length;i++){
                    if(representante == me.trepresentantes[i].value){
                        return me.trepresentantes[i].text + " ACTIVO"
                        
                    }                  
                }
            }else{
                for(var i=0;i<me.trepresentantes.length;i++){
                    if(-(representante) == me.trepresentantes[i].value){
                        return me.trepresentantes[i].text + " INACTIVO"
                    }                       
                }
            }
        },
        Listartrepresentantes(){
            let me=this;  
            var trepresentantearray ;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var cont = 1;
            this.$conf.get('api/TRepresentantes/Listar',configuracion).then(function(response){
                trepresentantearray=response.data;
                trepresentantearray.map(function(x){
                    me.trepresentantes.push({text: x.tipo,value: x.valor});
                    cont++;
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
        representantesver(item){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.idDE = item.idDEscucha
                    this.$cat.get('api/Representante/Representanteslistarporpersona/'+ item.personaId,configuracion).then(function(response){
                        me.representantes=response.data;
                        me.dialogorepresentantes = true
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
        listar(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
                this.$cat.get('api/RAPs/ListarPersonasconIdEscucha/'+ me.rAtencionId,configuracion).then(function(response){
                    me.personas=response.data;
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
        actualizardireccion(item){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$cat.put('api/RAPs/Actualizardireccionescucha',{

                'idDEscucha': me.idDE,
                'calle': item.calle,
                'noint': item.noInt,
                'noext': item.noExt,
                'entrecalle1': item.entreCalle1,
                'entrecalle2': item.entreCalle2,
                'referencia': item.referencia,
                'pais': item.pais,
                'estado': item.estado,
                'municipio': item.municipio,
                'localidad': item.localidad,
                'cp': item.cp,
                'lat': item.lat,
                'lng': item.lng,
                'tipoVialidad': item.tipoVialidad,
                'tipoAsentamiento': item.tipoAsentamiento,
        
            },configuracion).then(function(){   
                me.$notify('La información se actualizo correctamente !!!','success') 
                me.dialogorepresentantes = false
                me.limpiar()

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
            },
       
      } 
   }
</script>
<style>

</style>