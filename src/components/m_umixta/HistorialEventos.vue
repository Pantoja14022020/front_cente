<template>  
<v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
      <v-flex v-if="showpage">
        <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Historial eventos</v-toolbar-title>
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
                    <v-btn class="mx-2" @click="cerrarcarpeta" fab dark small color="primary">
                        <v-icon dark>close</v-icon>
                    </v-btn>

            <v-tooltip bottom>
                <template v-slot:activator="{ on }"> 
                    <v-btn class="mx-2" slot="activator" v-on="on" @click="generarpdf()" fab dark small  color="warning">
                        <v-icon dark>print</v-icon>
                    </v-btn>
                </template>
                <span>Imprimir historial</span>
            </v-tooltip>
            
                  
                                          
        </v-toolbar>
        
        <v-data-table
                :headers="headers"
                :items="eventos"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                 >
                
                <template slot="items" class="white" slot-scope="props">
                    

                    <td>{{ props.item.uModulo}}</td>
                    <td>{{ props.item.usuario}}</td> 
                    <td>{{props.item.fechaCitacion.substring(8,10) +" de "+ obtenermes(props.item.fechaCitacion.substring(5,7)-1)+" del "+props.item.fechaCitacion.substring(0,4)+", "+props.item.fechaCitacion.substring(11,16)  }}</td>                        
                    <td>

                        <div v-if="props.item.tipo == 2">
                            <span class>{{calcularevento(props.item.tipo)}}</span>
                        </div>
                        <div v-else-if="props.item.tipo == 3">
                            <span class>{{calcularevento(props.item.tipo)}}</span>
                        </div>
                        <div v-else-if="props.item.tipo == 4">
                            <span class>{{calcularevento(props.item.tipo)}}</span>
                        </div>
                        <div v-else-if="props.item.tipo == 5">
                            <span class>{{calcularevento(props.item.tipo)}}</span>
                        </div>
                        <div v-else-if="props.item.tipo == 6">
                            <span class>{{calcularevento(props.item.tipo)}}</span>
                        </div>
                        <div v-else-if="props.item.tipo == 10">
                            <span class>{{props.item.tipo2}}</span>
                        </div>
                        <div v-else-if="props.item.tipo == 11">
                            <span class>{{props.item.tipo2}}</span>
                        </div>
                        <div v-else-if="props.item.tipo == 12">
                            <span class>{{calcularevento(props.item.tipo)}}</span>
                        </div>
                        
                    </td>  
                    <td>{{ props.item.status}}</td> 
                            
                </template>
                <template slot="no-data">
                    <v-btn color="primary"  @click="listar()" >Resetear</v-btn>
                </template>
                
        </v-data-table> 

        
        <v-dialog v-model="modaldocumento" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
               
                <v-toolbar-title>Documento.</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn color=success text @click.native="guardar()">Guardar formulación</v-btn>
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
  import VeeValidate from 'vee-validate' 
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
         //-------Logos-----------------------------------------/
        logo1:'',
        logo2:'',
        //*************** */
        dialogo:false,
        agenciainfo:[],
        agenciaid:'',
        eventos:[],
        texto:'',
        fecha:'',
        variable:[],
        variablef:[],
        modaldocumento:false,
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

            { text: 'Modulo', value: 'uModulo' },
            { text: 'Emitida por', value: 'usuario' },            
            { text: 'Fecha de citación', value: 'fechaCitacion' }, 
            { text: 'Tipo de evento', value: 'tipo' },           
            { text: 'Status',value: 'status', sortable:false },       
        ],

       // tcita:1,
       tsol:'',
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
        calcularevento: function(evento){
            if(evento==2) return "Audiencia inicial"
            if(evento==3) return "Audiencia inicial con orden de aprehension cumplida"
            if(evento==4) return "Audiencia Orden de Aprehension"
            if(evento==5) return "Audiencia Orden de Comparecencia"
            if(evento==6) return "Formulacion de acusacion"
            if(evento==11) return "Audiencia Orden de Cateo"
        },
        generarpdf(){
            this.fecha = this.generarfecha();
            this.mostrarpdf(this.u_nombre,this.u_puesto,this.u_agencia)
            this.modaldocumento = false;
        },
        generarfecha(){
            var fecha;
            fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY");
            return fecha;      
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
                me.$conf.get('api/Agencias/Listarporid/'+ me.agenciaid,configuracion).then(function(response){
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
        listar(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$IL.get('api/Agenda/ListarTodosporrhechoagendados'+"/"+"0001-01-01"+"/"+ me.rHechoId,configuracion).then(function(response){
                me.eventos=response.data;
            }).catch(err => { 
                if (err.response.status==400){
                    me.$notify("No es un usuario válido", 'error')
                } else if (err.response.status==401){
                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                    this.e401 = true,
                    this.showpage= false
                } else if (err.response.status==403){ 
                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                    this.e403= true
                    this.showpage= false 
                } else if (err.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                    me.$notify('Error al intentar leer la lista roles!!!','error')   
                } 
            });        
        },   
        funcioncalcular(datos){

            return this.variablef[0] 
        },
        mostrarpdf(nombre,puesto,agencia){

            let me=this;        
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

           if (pdfMake.vfs == undefined){
                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                pdfMake.vfs = pdfFonts.pdfMake.vfs; 
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
                pdfMake.vfs = pdfFonts.pdfMake.vfs; 
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
            var u_distrito = this.u_distrito
            var nuc = this.nuc;
            var fecha = this.fecha;
            var bodyd = []
            let me = this;
            bodyd.push([{style:'Texto',text:'Evento', fillColor: '#eeeeee', fontSize: 12, bold: true, alignment: 'center'},{style:'Texto',text: 'Status', fillColor: '#eeeeee', fontSize: 12, bold: true, alignment: 'center' },{style:'Texto',text: 'Fecha', fillColor: '#eeeeee', fontSize: 12, bold: true, alignment: 'center'} ])
            this.eventos.forEach(function(evento){
                bodyd.push( [{style:'Texto',text: (evento.tipo == 2 || evento.tipo == 3 || evento.tipo == 4 || evento.tipo == 5 ||evento.tipo == 6 ||evento.tipo == 12) ? me.calcularevento(evento.tipo) : evento.tipo2 },{style:'Texto',text:evento.status },{style:'Texto',text: evento.fechaCitacion.substring(8,10) +" de "+me.obtenermes(evento.fechaCitacion.substring(5,7)-1)+" del "+evento.fechaCitacion.substring(0,4)+", "+evento.fechaCitacion.substring(11,16) } ])
            })
            
            
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
                        absolutePosition: {x: 85, y: 150},
                    },  
                    {
                        text:
                        '\n'+u_distrito+", Hidalgo a "+fecha+ "\n\n\n\n\n\n",                        
                        style: 'Fecha',
                        alignment: 'right', 
                    },  
                    {
                        text: html ,                        
                        style: 'Titulo',
                        alignment: 'center'
                    },     
                    {
                        style: 'table',
                        table: {
                            headerRows: 1,
                            widths: ['*', 'auto', 'auto'], 
                            body:                           
                                bodyd
                            
                        },
                        layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 2 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                                }, 
                            }
                    }  
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
           

            // pdfMake.createPdf(docDefinition).open();
            var doc = pdfMake.createPdf(dd);
            var f = document.getElementById('iframepdf');
            var callback = function(url) { f.setAttribute('src',url); }
            doc.getDataUrl(callback, doc);
            this.modaldocumento=true;
            return dd;
              
             //iframe.src = doc.output('bloburl');
        },        
      } 
   }
</script>
<style>
.espaciado{
    padding: 30px !important; 
}
</style>