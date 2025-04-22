 <template>  
<v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
      <v-flex v-if="showpage">
        <v-toolbar flat color="white">
            <v-toolbar-title class="font-weight-regular" >Registro de contenciones.</v-toolbar-title>
            
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>  
            <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :return-value.sync="fechabusqueda"
                transition="scale-transition"
                offset-y
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                <v-text-field
                    name='fecha de contención'
                    :value="fechab"
                    label="*Fecha de contención:"
                    prepend-icon="event"
                    clearable 
                    readonly
                    v-on="on"
                    v-validate="'required'"                                   
                    :error-messages="errors.collect('fecha de contención')">
                ></v-text-field>
                </template>
                    <v-date-picker locale="es"  v-model="fechabusqueda" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                    </v-date-picker>
            </v-menu>
            <v-btn color="success" @click="listar(fechabusqueda); console.log(fechabusqueda)" >Consultar</v-btn>
        </v-toolbar>
        <v-data-table
            :headers="headers"
            :items="oficios"
            :search="search" 
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination">
            
            <template slot="items" class="white" slot-scope="props"> 
                <td>{{ props.item.uUsuario}}</td>   
                <td>{{ props.item.uModulo}}</td>    
                <td>{{ props.item.nombrePersona}}</td>        
                <td>{{ props.item.queRequirio}}</td>      
                <td>{{ props.item.fechaSys.substring(8,10) +" de "+ obtenermes(props.item.fechaSys.substring(5,7)-1)+" del "+props.item.fechaSys.substring(0,4)}}</td>      
            </template>
            <template slot="no-data">
                <v-btn @click="listar()" color="primary"  >Resetear</v-btn>
            </template>
                
        </v-data-table>
    </v-flex>
</v-layout> 
</template>

 
<script> 
    
  import axios from 'axios'  
  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas'
  import VeeValidate from 'vee-validate' 
  import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
  import { debug } from 'util';
  import moment from 'moment'
  import 'moment/locale/es';
  import alertify from 'alertifyjs';
  import { VueEditor } from "vue2-editor"; 
  import n401 from './401.vue'
  import n403 from './403.vue'
    import { error } from 'util';
  

  export default {
    components: {
        "vue2-editor": VueEditor,
        n401,
        n403
    },
    data: () => ({
        alert:false,
        dialog: false, 
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
        texto:'',
        oficios:[],
        fechabusqueda:'',
        fechab: '',
        menu1:false,

        headers: [
            
            { text: 'Emitida por', value: 'uUsuario', sortable: true  }, 
            { text: 'Módulo', value: 'uModulo', sortable: true  }, 
            { text: 'Nombre persona contenida', value: 'nombrePersona' }, 
            { text: '¿Que se requirio ?',value: 'queRequirio' }, 
            { text: 'Fecha y Hora', value: 'fechaSys', sortable: false },                              
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
       
        //*************** */
        
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
        modalAdd:false,
        modaldocumento:false,
        aux: false,
        


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
                me.listar((new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate())) + "T00:00:00");               
        
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
        fechainif(){
            if(this.menu1){
                this.generarfecha2();
            this.$refs.menu1.save(this.fechabusqueda);
            }          
        },
        generarfecha2(){           
            if(this.menu1) 
            this.fechab =this.fechabusqueda.substring(8,10) +" de "+ this.obtenermes(this.fechabusqueda.substring(5,7)-1)+
            " del "+ this.fechabusqueda.substring(0,4);   
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
        listar(fecha = (new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate())) + "T00:00:00"){            
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            this.$cat.get('api/ContencionPersonas/ListarporFecha/'+ me.u_modulo + '/' + fecha,configuracion).then(function(response){
                //console.log(response);
                me.oficios=response.data;
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
        
      } 
   }
</script>

<style> 
.espaciado{
    padding: 30px !important; 
}  
</style>
