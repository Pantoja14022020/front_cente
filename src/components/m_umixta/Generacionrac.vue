 <template>  
<v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
      <v-flex v-if="showpage">
        <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Generación de RACS</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>

                        <v-tooltip bottom>
                                <template v-slot:activator="{ on }"> 
                                    <v-btn class="mx-2" slot="activator" v-on="on" @click="agregar" fab dark small color="success">
                                        <v-icon dark>add</v-icon>
                                    </v-btn>
                                </template>
                                <span>Agregar registro</span>
                        </v-tooltip> 
            
                    
        </v-toolbar>
        <v-data-table
                :headers="headers"
                :items="oficios"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                 >
                
                <template slot="items" class="white" slot-scope="props">
                    
                    <td>{{ props.item.rac}}</td>   
                    <td>{{ props.item.ndenuncia}}</td>  
                    <td>
                        <div v-if="props.item.asignado == true">
                            <span class="blue--text">Si</span>
                        </div>
                        <div v-else>
                            <span class="red--text">No</span>
                        </div>
                    </td>                       
                    <td class="justify-center layout px-0">  
                        <div v-if="props.item.asignado == false">    
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on"  
                                        @click="dialogomodulosver(props.item)"
                                        >
                                       note_add
                                    </v-icon> 
                                </template>
                                <span>Asignar modulo</span>
                            </v-tooltip> 
                        </div>  
                        <div v-if="props.item.asignado == true">    
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" color="warning"
                                        @click="imprimir(props.item)"
                                        >
                                       print
                                    </v-icon> 
                                </template>
                                <span>Imprimir</span>
                            </v-tooltip> 
                        </div>  
                    </td>       
                    
                </template>
                <template slot="no-data">
                <v-btn color="primary"  >Resetear</v-btn>
                </template>
                
        </v-data-table>


        <v-dialog  v-model="modalAdd"  max-width="1000px" >
        
            <v-card>
            <v-toolbar dark color="primary">
                
                <v-toolbar-title>Nuevo RAC</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
            
                <v-btn   @click ="generarac()" color="success" >Generar RAC</v-btn>
                
                
                <v-btn icon   @click="modalAdd = false">
                <v-icon>close</v-icon>
                </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-flex mx-5>
                   <v-card-text>
                       <v-form data-vv-scope="rac">  
                       <br>
                       <br>
                       
                        
                        <v-container grid-list-md  >
                            <v-layout row wrap>
                                <v-flex class ="espaciado" xs12 sm12 md12 lg12>  
                                    
                                    <v-text-field 
                                        name="número de denuncia o oficio" 
                                        label="*Número de denuncia o oficio:" 
                                        v-model="numerooficiodenuncia"
                                        v-validate="'required'"
                                        data-vv-scope="rac"
                                        :error-messages="errors.collect('rac.número de denuncia o oficio')">                                          
                                    </v-text-field>    

                                </v-flex>

                            </v-layout>
                        </v-container>
                        

                       </v-form>
                  </v-card-text>
                  
      
           
            </v-flex>
            </v-card>
        </v-dialog>


        <v-dialog  v-model="dialogoasignar"  max-width="1000px" >

            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">info</v-icon>
                    </v-avatar>
                    
                    <v-toolbar-title class="subheading">Información completa</v-toolbar-title>
                    <v-spacer></v-spacer>                  
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" data-vv-scope="modulo" >
                        <v-container grid-list-md text-xs-center>
                            <v-layout wrap>
                                <v-flex  class="espaciado" xs12 sm12 md6 lg6 >
                                    <v-text-field 
                                        name="número de oficio" 
                                        label="*Número de oficio:" 
                                        v-model="numerooficio"
                                        v-validate="'required'"
                                        data-vv-scope="modulo"
                                        :error-messages="errors.collect('modulo.número de oficio')">                                          
                                    </v-text-field>       
   

                                </v-flex>

                                <v-flex  class="espaciado" xs12 sm12 md6 lg6 >
                                    <v-autocomplete 
                                        name="modulo"   
                                        :items="modulos"
                                        v-model="modulo"
                                        return-object 
                                        v-validate="'required'" 
                                        data-vv-scope="modulo"
                                        label="*Modulo:"
                                        :error-messages="errors.collect('modulo.modulo')">
                                    </v-autocomplete>  
                                </v-flex>

                                <v-flex  xs12 sm12 md12 lg12>   
                                    <v-card elevation="0"  >
                                        
                                        <v-card-title  ><h3>Texto del oficio:</h3></v-card-title>
                                        <v-divider ></v-divider>
                                                <v-card-text>
                                                    <v-form   data-vv-scope="form1"> 
                                                        <vue-editor  
                                                            name="descripcíon"
                                                            v-model="texto" 
                                                            :editorToolbar="customToolbar">
                                                        </vue-editor>
                                                    </v-form>
                                                </v-card-text>   
                                        </v-card> 
                                </v-flex>                           
                            </v-layout>
                        </v-container>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click.native="dialogoasignar=false" >Cerrar</v-btn> 
                            <v-btn color="success" @click.native="vistaprevia" >Vista previa</v-btn>                                    
                        </v-card-actions> 
                    </v-form>
                
                </v-card-text> 
            </v-card>

        </v-dialog>




        <v-dialog v-model="modaldocumento" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
               
                <v-toolbar-title>Documento.</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn  color=success text @click.native="guardar()">Guardar</v-btn>
                <v-btn icon   @click="modaldocumento = false">
                <v-icon>close</v-icon>
                </v-btn>

                </v-toolbar-items>
            </v-toolbar> 
                <v-card-text>
                     <iframe id="iframepdf" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no"  ></iframe>
                </v-card-text>
            </v-card>
        </v-dialog>


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
        fechas:'',
        numerooficio:'',
        numerooficiodenuncia:'',
        modulos:[],
        modulo:'',
        rac:'',
        ndenuncia:'',
        racid:'',
        headers: [
            
            { text: 'Rac', value: 'rac', sortable: true  }, 
            { text: 'Número de denuncia', value: 'ndenuncia', sortable: true  }, 
            { text: 'Asignado', value: 'asignado', sortable: true  }, 
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
       
        //*************** */
        
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
        modalAdd:false,
        modaldocumento:false,
        aux: false,
        dialogoasignar:false,


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
        u_email:'',
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
                me.u_email=me.$store.state.usuario.email;

                //*********************************************** */
                me.listarLogo();
                me.listar();      
                me.listarmodulos();
                me.informacionagencia();          
        
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
        
        listarLogo(){
        
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};  
                this.$conf.get('api/ConfGlobals/Listar').then(function(response){
                    me.logo1= response.data.logo1;
                    me.logo2= response.data.logo2;
                    me.logo3= response.data.logo3;
                    me.logo4= response.data.logo4;
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
        generarpdf(){
            this.$validator.validate().then(result => {
                    if (result) {
                    this.fechas = this.generarfecha();
                    this.downloadPdf(this.u_nombre,this.u_puesto,this.u_agencia); 
                    }  
                })  
        },
        imprimir(item){

            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  

            this.$cat.get('api/RAtencions/ListarPorrac/'+ item.idrac,configuracion).then(function(response){
               
                    me.fechas = response.data.fechaHoraRegistro.substring(8,10) +" de "+ me.obtenermes(response.data.fechaHoraRegistro.substring(5,7)-1)+" del "+response.data.fechaHoraRegistro.substring(0,4) 
                this.$cat.get('api/RHechoes/ListarPorrAtencionId2/'+ response.data.idRAtencion,configuracion).then(function(response){
                    
                    me.rac = item.rac
                    me.ndenuncia = item.ndenuncia;
                    me.numerooficio = response.data.nDenunciaOficio
                    me.texto = response.data.texto
                    me.fechas = 
                    me.mostrarpdf(me.u_nombre,me.u_puesto,me.u_agencia);
                    me.modaldocumento = false; 

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
        generarfecha(){
            var fecha;
            fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY");
            return fecha;      
        }, 
        agregar(){
            this.limpiar();           
            this.modalAdd= true;
        },
        close () {
                this.dialog = false;
                this.limpiar();
        },      
        limpiar(){    
            this.numerooficio =""
            this.numerooficiodenuncia = ""
            this.modulo = ""
            this.texto = "";    
        },

        listar(){
          let me=this;  
          let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
                this.$cat.get('api/Racs/ListarporAgencia/'+ me.u_idagencia,configuracion).then(function(response){
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
        generarac(){

            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$validator.validateAll("rac").then(result => {
                if (result) {

                    this.$cat.post('api/Racs/GenerarRac',{
                            'distritoId': me.u_iddistrito,
                            'agenciaId': me.u_idagencia, 
                            'Ndenuncia': me.numerooficiodenuncia,
                            'Asignado': false
                    },configuracion).then(function(response){ 

                        me.$notify('La información se guardo correctamente \n RAC: '+ response.data.rac,'success') 
                        me.modalAdd = false
                        me.listar();
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
                            me.$notify("El recurso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar crear el registro!!!','error')  
                        } 
                    });
                }
            })

        }, 
        listarmodulos(){ 

            var moduloarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/ModuloServicios/ListarPorAgencia/'+me.u_idagencia,configuracion).then(function(response){

                moduloarray = response.data;
                moduloarray.map(function(x){
                    me.modulos.push({text: x.nombre,value: x.idModuloServicio , value2: x.agenciaId});
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
        dialogomodulosver(item){

            this.limpiar();
            this.rac = item.rac
            this.racid = item.idrac
            this.ndenuncia = item.ndenuncia
            this.idrhecho = item.rHechoId
            this.dialogoasignar = true
        },
        vistaprevia(){
            this.$validator.validateAll("modulo").then(result => {
                if (result) {
                    this.downloadPdf(this.u_nombre,this.u_puesto,this.u_agencia); 
                }
            })
        },
        informacionagencia(){
                    let me=this;  
                    let header={"Authorization" : "Bearer " + this.$store.state.token};
                    let configuracion= {headers : header};  
                    me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia,configuracion).then(function(response){
                        me.agenciainfo=response.data;
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
        generarfecha(){
            var fecha;
            fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY")+ ", "+ moment().format('h:mm:ss a');
            return fecha;      
        },   
        guardar(){ 
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$validator.validateAll('dialogoagregar').then(result => {
      
                if (result) { 
          
                    this.$cat.post('api/RAtencions/Crear',{
                            'distritoInicial': me.u_distrito,  
                            'agenciaInicial': me.u_agencia,
                            'dirSubProcuInicial': me.u_dirSubPro,
                            'agenciaId': me.u_idagencia,
                            'racId':me.racid,
                            'pInicio': true,
                            'Numerooficio': me.modulo.text,

                    },configuracion).then(function(response){  
                        me.$notify('La información se guardo correctamente !!!','success')   


                        this.$cat.post('api/RHechoes/CrearPI',{
                            'RAtencionId': response.data.idatencion,  
                            'ModuloServicioId': me.modulo.value,
                            'Agenciaid': me.modulo.value2,
                            'Status': false,
                            'RBreve': "",
                            'FechaReporte': me.generarfecha(),
                            'NDenunciaOficio': me.numerooficio,
                            'Texto': me.texto,

                        },configuracion).then(function(response){  
                            me.$notify('La información se guardo correctamente !!!','success')   

                            this.$cat.put('api/Racs/Actualizar',{
                    
                                'Idrac':me.racid,

                            },configuracion).then(function(response){                            
                                    me.$notify('La información se actualizo correctamente !!!','success')  
                                    me.dialogoasignar=false;    
                                    me.mostrarpdf(me.u_nombre,me.u_puesto,me.u_agencia); 
                                    me.modaldocumento = false;
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
            
            }) 
          
        },
        mostrarpdf(nombre,puesto,agencia){

                let me=this; 
                var dd = me.downloadPdf();
                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");

            if (pdfMake.vfs == undefined){
                        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                        pdfMake.vfs = pdfFonts.vfs; 
                }


                var dd = me.downloadPdf(nombre,puesto,agencia);
                var doc = pdfMake.createPdf(dd);
                me.modaldocumento=true;    
                
                var doc = pdfMake.createPdf(dd).print();
                
        },
            downloadPdf(nombre,puesto,agencia) {

                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");

                if (pdfMake.vfs == undefined){
                        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                        pdfMake.vfs = pdfFonts.vfs; 
                }

                //***************************************************************************** */
                // VARIABLES
                //***************************************************************************** */
                var logo1 = this.logo1;
                var logo2 = this.logo2;
                var logo3 = this.logo3;
                var logo4 = this.logo4;
                var u_dirSubPro = this.u_dirSubPro;
                var u_agencia = this.u_agencia;
                var rac = this.rac;
                //***************************************************************************** */
                var html =htmlToPdfmake(
                    this.texto
                );
                //***************************************************************************** */
                var agenciainfodr = this.agenciainfo["direccion"];
                var agenciainfotel = this.agenciainfo["telefono"];

                //***************************************************************************** */
                var dd = {
                    pageSize: 'LEGAL',
                    pageOrientation: 'portrait',
                    pageMargins: [ 85, 130, 72, 60 ],
                    footer: function (currentPage, pageCount) {
                        return {
                            columns: [
                            {
                                image: logo4,
                                width: 612,
                                absolutePosition: {x:0, y:0},
                            },
                                {
                                    text: agenciainfodr +"\n"+agenciainfotel+"\n"+ 'www.hidalgo.gob.mx',
                                    style: 'subheaderlogo', 
                                    style: 'PiePagina', 
                                    margin: [312,12,72,0],
                                    alignment:'right',
                                    fontSize: 7,
                                    color: 'white',
                                    absolutePosition: {x: 0, y: 30}
                                },
                            ] 
                        };
                    },
                    header: function(currentPage, pageCount, pageSize) {
                            
                            return [
                                { 
                                    // image: logo1,
                                    // width: 150, 
                                    // absolutePosition: {x: 75, y: 30},
                                    
                                },
                                { 
                                    // image: logo2,
                                    // width: 50,  
                                    // absolutePosition: {x: 495, y: 30},
                                },
                                {
                                image: logo3,
                                width: 612,
                                absolutePosition: {x: 0, y: 0},
                                }
                            ]
                    
                    },
                
                    content: [
                        {
                            text:  u_dirSubPro +"\n"+u_agencia,
                            style: 'Adscripcion',
                            absolutePosition: {x: 85, y: 95},
                        },
                        {
                            text:"RAC: "+rac,   
                            style: 'Titulo', 
                            alignment: 'right',
                            margin: [0, 40, 72, 0],
                            absolutePosition: {x: 85, y: 150},
                        },
                        {
                            text:"\nNumero de denuncia: "+this.ndenuncia + "\n\n"+
                            'Número de oficio: ' +this.numerooficio ,                        
                            style: 'Nooficio',
                            alignment: 'right', 
                        },
                        {
                            text:
                            '\n'+this.u_distrito+", Hidalgo a "+this.fechas+ "\n\n\n\n\n\n\n\n",                        
                            style: 'Fecha',
                            alignment: 'right', 
                        },               
                        {
                            text: html ,                        
                            style: 'Texto',
                        },
                        {
                            text: "\n\n\n\n\n_________________________________________\n"+nombre,   
                            alignment :'center',                     
                            style: 'DePara',                                                           
                        },
                        {
                            text: '\n\n\n\n\n'+ "A T E N T A M E N T E"+'\n\n\n\n\n',   
                            alignment :'justify',                     
                            style: 'DePara',                                                           
                        },
                        {
                            text: nombre +"\n\n",   
                            alignment :'justify',                     
                            style: 'DePara',                                                           
                        },
                        {
                            text: puesto +"\n\n",   
                            alignment :'justify',                     
                            style: 'DePara',                                                           
                        },
                        {
                            text: agencia +"\n\n",   
                            alignment :'justify',                     
                            style: 'DePara',                                                           
                        },
                        
                        
                    ],
                
                    
                    styles: {
                        
                            Adscripcion:{
                            fontSize: 10,
                            bold:true
                        },
                        Fecha:{
                            fontSize: 9,
                        },
                        Nooficio:{
                            fontSize: 8,
                            bold:true
                        },
                        DePara:{
                            fontSize: 10,
                            bold:true  
                        },
                        DeParaCargo:{
                            fontSize: 9,
                        },
                        PiePagina:{
                            fontSize: 7,
                        },
                        Texto:{
                            fontSize: 11,
                            alignment:'justify'
                        },
                        Titulo:{
                            fontSize: 12,
                            bold:true 
                        },
                    
                    }
        
            }
            

            
                var doc = pdfMake.createPdf(dd);
                var f = document.getElementById('iframepdf');
                var callback = function(url) { f.setAttribute('src',url); }
                doc.getDataUrl(callback, doc);
                this.modaldocumento=true;
                return dd;
                
            
            },
        
      } 
   }
</script>

<style> 
.espaciado{
    padding: 30px !important; 
}  
</style>
