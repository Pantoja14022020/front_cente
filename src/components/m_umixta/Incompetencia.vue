<template>  
<v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
      <v-flex v-if="showpage">
        <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Incompetencia</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                     <v-flex xs12 sm6 md3>
                      
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
                        <v-tooltip bottom>
                                <template v-slot:activator="{ on }"> 
                                    <v-btn class="mx-2" slot="activator" v-on="on" @click="additem()" fab dark small color="success">
                                        <v-icon dark>add</v-icon>
                                    </v-btn>
                                </template>
                                <span>Agregar registro</span>
                        </v-tooltip>
            
            
        </v-toolbar>

        <v-data-table
                :headers="headers"
                :items="determinacionarchivo"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                 >
                
                <template slot="items" class="white" slot-scope="props">
                    
                    <td>{{ props.item.usuario }}</td> 
                    <td>{{ props.item.uModulo }}</td>
                    <td>{{ props.item.fecha }}</td>
                    <td class="justify-center layout px-0"> 
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" color="warning" 
                                        @click="imprimirdeterminacion(props.item)"
                                        >
                                       print
                                    </v-icon> 
                                </template>
                                <span>Imprimir Determinación</span>
                            </v-tooltip>    
                    </td>      
 
                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar()"  >Resetear</v-btn>
                </template>
                
        </v-data-table>

        <v-dialog v-model="modalAdd" fullscreen hide-overlay transition="dialog-bottom-transition">
        
            <v-card>
                <v-toolbar dark color="primary">
                    
                    <v-toolbar-title>REGISTRO DE INCOMPETENCIA.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn  color=success text @click="generarpdf()">Vista previa</v-btn>
                        <v-btn icon   @click="modalAdd = false">
                        <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                
                </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" >  
                            <br>
                            <br>

                            <v-container grid-list-md text-xs-center>
                                <v-layout row wrap>

                                <v-flex  class="espaciado" xs12 sm12 md6 lg6>                       
                                    <v-autocomplete 
                                        name="dependencia"   
                                        :items="Incompetencias"
                                        v-model="Incompetencia"
                                        return-object 
                                        label="Dependencia:"
                                        :error-messages="errors.collect('dependencia')">
                                    </v-autocomplete>
                                    
                                </v-flex>
                                <v-flex class="espaciado"  xs12 sm12 md6 lg6> 
                                    <v-text-field 
                                        name="número de oficio" 
                                        label="*Número de oficio:" 
                                        v-model="numerooficio"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('número de oficio')">                                          
                                    </v-text-field> 
                                </v-flex>
                                  
                                    <v-flex class="espaciado" xs12 sm12 md12 lg12 >                      
                                        <v-card elevation="0"  >
                                            <v-card-title class="accent"><h3>*Artículos aplicables sobre la competencia de la dependencia a la que se envía.</h3></v-card-title>
                                                    <v-card-text>
                                                        <v-form  > 
                                                            <vue-editor 
                                                                name = "acto de investigacion"
                                                                v-model="arti"                                        
                                                                outline  height=350px;
                                                                style="max-height: 310px; overflow-y: scroll"
                                                                :editorToolbar="customToolbar" 
                                                                v-validate="'required'" 
                                                                :error-messages="errors.collect('acto de investigacion')">                                                                 >
                                                            </vue-editor>
                                                        </v-form>
                                                    </v-card-text>                                                
                                            </v-card> 
                                    </v-flex>

                                    <v-flex class="espaciado" xs12 sm12 md12 lg12 >                      
                                        <v-card elevation="0"  >
                                            <v-card-title class="accent"><h3>Texto de Incompetencia</h3></v-card-title>
                                                    <v-card-text>
                                                        <v-form  > 
                                                            <vue-editor 
                                                                v-if="control" 
                                                                v-model="texto"                                        
                                                                outline  height=350px;
                                                                style="max-height: 310px; overflow-y: scroll"
                                                                :editorToolbar="customToolbar"                                                                  >
                                                            </vue-editor>
                                                        </v-form>
                                                    </v-card-text>  
                                                    <v-tooltip  bottom>
                                                        <template v-slot:activator="{ on }"> 
                                                            <v-btn class="mx-2" slot="activator" v-on="on" @click="generartexto()"  absolute top right  fab    color="primary">
                                                                <v-icon dark>remove_red_eye</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <span>Generar texto del documento</span>
                                                    </v-tooltip>                                                 
                                            </v-card> 
                                    </v-flex>

                                </v-layout>
                            </v-container>                          
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
                <v-btn  color=success text @click.native="guardar()">Guardar Incompetencia</v-btn>
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
        dialogoeditor: false,
        rahid:'',
        rAtencionId:'',
        rHechoId:'', 
        agenciaid:'',
        nuc:'',
        showpage:true,
        e401:false,
        e403:false,
        test:'',
        control:false,
        fechahorasuhecho:'',
        numerooficio:'',
        //-------Logos-----------------------------------------/
        logo1:'',
        logo2:'',
        //*************** */
        //citatorio
        idcitatorio:'',

        dia : moment().format('DD'),
        mes : moment().format('MMMM'),
        año: moment().format("YYYY") ,
        hr: moment().format('h:mm:ss a'),
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
        texto:'',
        comilla:'"',
        rBreve:'',
        idNuc:'',
        fechaINUC:'',
        mediodenuncia:'',
        personas:[],
        delitos:[],
        delito:"",
        articulos:"",
        arti:"",
        estado1:"radio-1",
        estado2:'radio-1',
        opcion1:'',
        opcion2:'',
        direccionsuceso:'',
        modo:'',
        determinacionarchivo:[],
        Incompetencias:[],
        Incompetencia:"",
        //*************** */
         headers: [

            { text: 'Emitida por', value: 'usuario', sortable: true  }, 
            { text: 'Módulo', value: 'modulo', sortable: true  }, 
            { text: 'Fecha', value: 'Fecha', sortable: true  },
            { text: 'Opciones', value: 'opciones', sortable: false },
                                            
        ],
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
        editedIndex: -1, 
        modalAdd:false,
        modaldocumento:false,
        aux: false,
        
        //generar
        camposactivos: true,
        textodecitatorio: false,   



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
                me.listarLogo();
                me.listar();
                me.listarrHecho();
                me.listarIncompetencias();
                me.listardelitos();
                me.listardireccionhecho();
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
                return this.editedIndex === -1 ? 'Nueva Notificacíon' : 'Editar Notificacíon'
            },
            formIcon () {
                return this.editedIndex === -1 ? 'add' : 'assignment'
            },
    },
    watch: {
        
    },
    
    methods:{ 
        generartexto(){
            this.$validator.validate().then(result => {
            if (result) { 

                this.control = true;
                this.texto = "<p class="+this.comilla+"ql-align-justify"+this.comilla+">En la ciudad de "+ this.u_distrito+" , Hidalgo, siendo las "+this.generarfecha()+" , el agente del Ministerio Publico "+this.u_nombre+" adscrito a "+this.u_agencia+",  al realizar el análisis de los actos de investigación que integran la presente carpeta de investigación advierte que los hechos denunciados no son competencia de esta representación social en atención a lo siguiente "+this.rBreve+" en razón de los anterior remítase la misma a  "+ this.Incompetencia.text + " con fundamento en los artículos 14, 16, 21 de la Constitución Política de los Estados Unidos Mexicanos, 20 del Código Nacional de  Procedimientos Penales, "+this.arti+ "."
                
            }})

        },
        imprimirdeterminacion(item){
                this.numerooficio = item.numeroOficio;
                this.texto = "<p class="+this.comilla+"ql-align-justify"+this.comilla+">En la ciudad de "+ item.uDistrito+" , Hidalgo, siendo las "+item.fecha+" , el agente del Ministerio Publico "+item.usuario+" y "+this.uUAgencia+",  al realizar el análisis de los actos de investigación que integran la presente carpeta de investigación advierte que los hechos denunciados no son competencia de esta representación social en atención a lo siguiente "+item.rBreve+" en razón de los anterior remítase la misma a  "+ item.dependencia + " con fundamento en los artículos 14, 16, 21 de la Constitución Política de los Estados Unidos Mexicanos, 20 del Código Nacional de  Procedimientos Penales, "+this.articulos+ "."
                this.mostrarpdf(item.usuario,item.uPuesto,item.uuAgencia);
                this.modaldocumento = false;
        },
        FechaSysaFechaString(fecha){
            return this.fechai =fecha.substring(8,10) +" de "+ this.obtenermes(fecha.substring(5,7)-1)+
            " del "+ fecha.substring(0,4); 
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
            fecha = moment().format('h:mm a')+ " horas del día "+  moment().format('DD') + " de " + moment().format('MMMM')  + " de " + moment().format("YYYY");
            return fecha;      
        },
        cambiarestado(){
            if(this.estado1)
            this.estado2=false
            if(this.estado2)
            this.estado1=false
        },
        generarpdf(){
            this.$validator.validate().then(result => {
            if (result) { 
                this.downloadPdf(this.u_nombre,this.u_puesto,this.u_agencia);
            }})
        },
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
        listarrHecho(){
               
                let me=this;   
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};  
                this.$cat.get('api/RHechoes/ListarPorId/' +me.rHechoId,configuracion).then(function(response){

                    me.fechaINUC = response.data.fechaElevaNuc
                    me.agenciaid = response.data.agenciaid                 
                    me.rBreve = response.data.rBreve
                    me.idNuc = response.data.nucId
                    me.mediodenuncia = response.data.mediodenuncia
                    me.fechahorasuhecho = response.data.fechaHoraSuceso
                    console.log(me.idNuc)
                    console.log(response.data.rHechoId)
                    me.informacionagencia();
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
                this.$cat.get('api/Terminacion/IncompetencialistarporId/'+ me.rHechoId,configuracion).then(function(response){
                    me.determinacionarchivo=response.data;
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
        listarIncompetencias(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var contador=0;
            var Incompetenciaarray=[];
            me.$conf.get('api/FiscaliaOestado/Listar',configuracion).then(function(response){
                //console.log(response.data)
                Incompetenciaarray = response.data;
                 Incompetenciaarray.map(function(x){
                        me.Incompetencias.push({text: x.nombre,value: x.idFiscaliaOestado});
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
        listardelitos(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
            var delitosArray=[];
            this.$cat.get('api/RDHs/ListarPorHecho/'+ me.rHechoId,configuracion).then(function(response){
                //console.log(response.data)
                me.delitos = response.data;                   
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
        listardireccionhecho(){
                let me=this;   
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$cat.get('api/DireccionDelitoes/ListarPoridHecho/' +me.rHechoId,configuracion).then(function(response){
                   
                    me.direccionsuceso = response.data
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
        crearpdf(){
            this.botonp=false;
            this.crearPDF_CN();
            this.citatorionotificacion =0;
        },
        close () {
                this.dialog = false;
                this.limpiar();
        }, 
        limpiar(){
                this.control = false
                this.Incompetencia = ""
                this.arti = ""
                this.numerooficio = ""
        }, 
        additem(){
            this.limpiar()
            this.modalAdd =true
        },      
        guardar(){ 
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            me.$validator.validate().then(result => {
            if (result) { 
                me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar la información ',           
                function(){
                
                    this.$cat.post('api/Terminacion/CrearIncompetencia',{
                    'rHechoId': me.rHechoId, 
                    'textoFinal': "",
                    'fecha': me.generarfecha(),
                    'uDistrito':me.u_distrito,
                    'uSubproc': me.u_dirSubPro,
                    'uUAgencia': me.u_agencia,
                    'usuario': me.u_nombre,
                    'uPuesto': me.u_puesto,
                    'uModulo': me.u_modulo,
                    'rBreve': me.rBreve,
                    'dependencia': me.Incompetencia.text,
                    'articulos': me.arti,
                    'numeroOficio': me.numerooficio
                    
                },configuracion).then(function(response){  
                    this.$cat.put('api/Nucs/Actualizar',{
                        'idNuc': me.idNuc,
                        'statusNUC': "Incompetencia",  
                    },configuracion).then(function(response){  
                        me.$notify('La información se actualizo correctamente !!!','success')     
                        
                        this.$cat.post('api/Historialcarpeta/Crear',{

                            'RHechoId': me.rHechoId,
                            'Detalle': "Incopetencia",
                            'UDistrito' : me.u_distrito,  
                            'USubproc': me.u_dirSubPro,
                            'UAgencia': me.u_agencia,
                            'Usuario': me.u_nombre,
                            'UPuesto': me.u_puesto,
                            'UModulo': me.u_modulo

                        },configuracion).then(function(response){ 
                        
                            me.$notify('La información se guardo correctamente !!!','success')  
                                
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
                            me.$notify('Error al intentar actualizar el registro!!!','error')   
                        } 
                    });  
                    me.$notify('La información se guardo correctamente !!!','success')   
                    me.modalAdd=false;
                    me.modaldocumento= false;      
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
                },
                    function(){
                        alertify.warning('Verifica la información')
                    }
                    ).set('labels', {ok:'Guardar', cancel:'Cancelar'});

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
            var u_subProc= this.u_subproc;
            var nuc = this.nuc;
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
                            },
                        ]
                 
                },
              
                content: [
                    {
                        text:  u_subProc + "\n" + u_dirSubPro +"\n"+u_agencia ,
                        style: 'Adscripcion',
                        absolutePosition: {x: 85, y: 95},
                    },
                    {
                        text:"Número Único de Caso: "+ nuc,                 
                        style: 'Titulo', 
                        alignment: 'right',
                        margin: [0, 40, 72, 0],
                        absolutePosition: {x: 85, y: 150}
                    },
                    {
                        text:'Número de oficio: ' +this.numerooficio+ "\n\n\n\n\n\n\n\n" ,                        
                        style: 'Nooficio',
                        alignment: 'right', 
                    },   
                    {                     
                        text: 'REGISTRO DE INCOMPETENCIA\n\n\n\n',
                        alignment: 'center',
                        style: 'Titulo',
                    }, 
                    {
                        text: html ,                        
                        style: 'Texto',
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
                        bold:true 
                    },
                    PiePagina:{
                        fontSize: 7,
                    },
                    Texto:{
                        fontSize: 10,
                        alignment:'justify'
                    },
                    Titulo:{
                        fontSize: 12,
                        bold:true ,
                        alignment:'center'
                    },
                    SubTitulo:{
                        fontSize: 11,
                        semibold:true 
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
