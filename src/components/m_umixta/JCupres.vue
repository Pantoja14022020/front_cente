<template>  
<v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />

    <UmixtaNavDrawer />

      <v-flex v-if="showpage">
        <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >CUPRES</v-toolbar-title>
                    <v-divider class="mx-2" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <v-flex xs12 sm6 md3>
                      
                        <v-text-field class="font-weight-regular"
                            v-model="nuc" disabled  prepend-icon="folder"
                            filled
                        ></v-text-field>

                    </v-flex>
                    <v-btn class="mx-2 pt-2" @click="cerrarcarpeta" fab dark small color="primary">
                        <v-icon class="mt-2" dark>close</v-icon>
                    </v-btn>

            <v-tooltip bottom>
                <template v-slot:activator="{ on }"> 
                    <v-btn class="mx-2 pt-2" slot="activator" v-on="on" @click="agregar()" fab dark small color="success">
                        <v-icon class="mt-2" dark>add</v-icon>
                    </v-btn>
                </template>
                <span>Agregar registro</span>
            </v-tooltip>                     
        </v-toolbar>
        
        <v-data-table
                :headers="headers"
                :items="eventosf"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                 >
                
                <template slot="items" class="white" slot-scope="props">
                    
                    <td>{{ props.item.usuario}}</td>   
                    <td>{{ props.item.uModulo}}</td> 
                    <td>{{ props.item.tipo2}}</td> 
                    <td>{{ props.item.dirigidoNombre }}</td>
                    <td>{{ props.item.fechaCitacion.substring(8,10) +" de "+ obtenermes(props.item.fechaCitacion.substring(5,7)-1)+" del "+props.item.fechaCitacion.substring(0,4)+", "+props.item.fechaCitacion.substring(11,19) }}</td> 
                    <td>{{ props.item.lugarCitacion }}</td>                     
           
                </template>
                <template slot="no-data">
                <v-btn color="primary"  @click="listar()" >Resetear</v-btn>
                </template>
                
        </v-data-table> 

        <v-dialog v-model="dialogo" fullscreen hide-overlay transition="dialog-bottom-transition">
        
            <v-card>
            <v-toolbar dark color="primary">
                
                <v-toolbar-title>Registrar evento</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn  color=success text @click="guardar()">Guardar evento</v-btn>
                <v-btn icon   @click="dialogo = false">
                <v-icon>close</v-icon>
                </v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                    <v-flex class="espaciado" xs12 sm12 md6 lg6 >


                                    <v-autocomplete 
                                        name="tipo de evento"
                                        :items="eventos" 
                                        label="*Tipo de evento:" 
                                        v-model="evento"
                                        v-validate="'required'"
                                        return-object
                                        :error-messages="errors.collect('evento')">                                          
                                    </v-autocomplete>

                                    <v-text-field 
                                        name="no. cupre" 
                                        label="*No. Cupre:" 
                                        v-model="cupre"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('no. cupre')">                                          
                                    </v-text-field>   

                                    <v-text-field 
                                        name="lugar a presensentarse" 
                                        label="*Lugar a presensentarse:" 
                                        v-model="lugarp"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('lugar a presensentarse')">                                          
                                    </v-text-field>

                                    <v-autocomplete
                                        name="persona a citar"
                                        :items="personas"
                                        v-model="persona"
                                        label="*Persona a citar:" 
                                        v-validate="'required'"
                                        return-object   
                                        :error-messages="errors.collect('persona a citar')">
                                    </v-autocomplete> 

                                    <v-text-field 
                                        name="persona que comparece" 
                                        label="*Persona que comparece:" 
                                        v-model="comparece"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('persona que comparece')">                                          
                                    </v-text-field>
                        
                    </v-flex>

                    <v-flex class="espaciado" xs12 sm12 md6 lg6 >

                        <v-menu
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            :return-value.sync="fechacita"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                            :value="fechac"
                                            label="Fecha de cita:"
                                            prepend-icon="event"
                                            clearable 
                                            readonly
                                            v-on="on"
                                ></v-text-field>
                            </template>
                                <v-date-picker v-model="fechacita" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                </v-date-picker>
                        </v-menu>
                        
                        <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="horac"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                            >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="horac"
                                    label="Hora de cita:"
                                    prepend-icon="access_time"
                                    readonly
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-time-picker
                            v-if="menu2"
                            v-model="horac"
                            full-width
                            @click:minute="$refs.menu2.save(horac)"
                            ></v-time-picker>
                        </v-menu>

                    </v-flex>

                </v-layout>
            

            </v-container>

            
         
        
            </v-card>
        </v-dialog>


    </v-flex>
</v-layout> 
</template>

 
<script> 
  import axios from 'axios'  
  import VeeValidate from 'vee-validate' 
  import moment from 'moment'
  import 'moment/locale/es'
  import alertify from 'alertifyjs'
  import { VueEditor } from "vue2-editor"
  import n401 from './401.vue'
  import n403 from './403.vue'
  import { error } from 'util'
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
        dialog: false, 
        dialogoeditor: false,
        rahid:'',
        rAtencionId:'',
        rHechoId:'', 
        agenciaid:'',
        nuc:'',
        showpage:true,
        e401:false,
        e403:false,
         //-------Logos-----------------------------------------/
        logo1:'',
        logo2:'',
        //*************** */
        dialogo:false,
        agenciainfo:[],
        agenciaid:'',
        eventosf:[],
        eventos:[

            { text: 'Revisión de medidas cautelares', value: 1}, 
            { text: 'Solicitud de orden de aprehensión', value: 2},          
            { text: 'Solicitud de orden de comparecencia', value: 3},  
            { text: 'Solicitud de orden de cateo', value: 4},  
            { text: 'Autorización de suspensión condicional', value: 5}, 
            { text: 'Revisión de suspensión condicional', value: 6},
            { text: 'Prorroga de cierre de investigación', value: 7},
            { text: 'Solicitud de providencias precautorias', value: 8},
            { text: 'Ratificación de medidas de protección', value: 9},
            { text: 'Ratificación de ingreso a lugar cerrado', value: 10},
            { text: 'Impugnación de omisiones del ministerio público', value: 11},
            { text: 'Ingresar acusación', value: 12},
            { text: 'Recordatorio vencimiento', value: 13},
            { text: 'Investigación complementaria ', value: 14},
            { text: 'Juicio oral', value: 15},
            { text: 'Audiencia individualización de sanciones', value: 16},
            { text: 'Sentencia', value: 17}, 
            { text: 'Sentencia condenatoria', value: 18}, 
            { text: 'Sentencia absoluta', value: 19}, 
            { text: 'Otro', value: 20},   
        ],
        evento:'',
        fechacita:'',
        fechac:'',
        horac:'',
        menu1:false,
        menu2:false,        
        personas:[],
        persona:'',
        lugarp:'',
        cupre:'',
        comparece:'',
        //*************** */
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
        headers: [

            { text: 'Emitida por', value: 'usuario'  }, 
            { text: 'Modulo', value: 'modulo' },        
            { text: 'Evento', value: 'tipo2' },     
            { text: 'Persona citada', value: 'dirigidoa' },           
            { text: 'Fecha/ hr citación', value: 'fechaCitacion' },
            { text: 'Lugar citación', value: 'lugarCitacion' },
        ],
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
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
            console.log(me.$store.state.tipo)
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
                me.listarLogo();
                me.listar();
                //me.listarrHecho();
                me.listarpersonas();
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

    },
    watch: {
        
    },
    methods:{ 
        cerrarcarpeta () {
            this.$store.state.rHechoId = null;
            this.$store.state.nuc= null;
            this.$router.push('./umixta-carpetas')
        },
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
        agregar(){
            let me = this;
            me.limpiar();
            me.dialogo = true;
        },
        fechainif(){          
                this.generarfecha2();
                this.$refs.menu1.save(this.fechacita);
               
        },
        generarfecha2(){              
            this.fechac =this.fechacita.substring(8,10) +" de "+ this.obtenermes(this.fechacita.substring(5,7)-1)+
            " del "+ this.fechacita.substring(0,4);         
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
        listarpersonas(){
            let me=this;  
            var personaarray ;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
                this.$cat.get('api/RAPs/ListarTodos/'+me.rAtencionId,configuracion).then(function(response){
                    personaarray=response.data;
                    personaarray.map(function(x){
                    me.personas.push({text: x.nombreCompleto,value: x.idRAP});

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
        listarrHecho(){
               
                let me=this;   
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$cat.get('api/RHechoes/ListarPorId/' +me.rHechoId,configuracion).then(function(response){
                    me.agenciaid = response.data.agenciaid,                 
                    me.informacionagencia();
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
        informacionagencia(){
                 let me=this; 
                 let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header}; 
                me.$conf.get('api/Agencias/Listarporid'+ me.agenciaid,configuracion).then(function(response){
                    me.agenciainfo=response.data;
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
           this.$validator.validate().then(result => {
                    if (result) { 
                            let me=this;
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información ',           
                            function(){ 
                                console.log(me.evento.text)
                                me.$IL.post('api/Agenda/Crear',{ 

                                    'rHechoId' : me.rHechoId ,
                                    'nuc' : me.nuc ,
                                    'tipo': 11,
                                    'tipo2': me.evento.text,
                                    'LugarCitacion': me.lugarp,
                                    'DirigidoNombre': me.persona.text,
                                    'FechaCitacion': me.fechacita + " " + me.horac,
                                    'HoraCitacion' : me.horac,
                                    'status': "Agendado",
                                    'uDistrito' : me.u_distrito,
                                    'uSubproc' : me.u_dirSubPro,
                                    'uAgencia' : me.u_agencia,
                                    'usuario' : me.u_nombre,
                                    'uPuesto' : me.u_puesto,
                                    'uModulo' : me.u_modulo,
                                    'CUPRE' : me.cupre,
                                    'Comparece' : me.comparece,
                                },configuracion).then(function(response){
                                    me.$notify('¡La información se guardo correctamente!','success')  
                                    me.dialogo = false;
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
                            },
                            function(){
                                    alertify.warning('Verifica la información')
                                }
                            ).set('labels', {ok:'Guardar', cancel:'Cancelar'});
                    } 
                })
           
        },
        limpiar(){    
            let me = this;
            me.persona = ''
            me.horac =''
            me.fechacita = ''
            me.fechac = ''
            me.lugarp = ''
            me.evento = ''
            me.cupre = ''
            me.comparece = ''
        },
        listar(){
          let me=this;  
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header};
                me.$IL.get('api/Agenda/ListarTipoRHecho/'+me.rHechoId +"/"+11,configuracion).then(function(response){
                    console.log(response);
                    me.eventosf=response.data;
                }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        this.e401 = true,
                        this.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        this.e403= true
                        this.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('¡Error al intentar leer la lista roles!','error')   
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