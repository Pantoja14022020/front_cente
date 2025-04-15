<template>  
<v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
      <v-flex v-if="showpage">
        <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Formulación de acusación</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }"> 
                    <v-btn class="mx-2" slot="activator" v-on="on" @click="agregar()" fab dark small color="success">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                </template>
                <span>Agregar registro</span>
            </v-tooltip>
            
                  
                                          
        </v-toolbar>
        
        <v-data-table
                :headers="headers"
                :items="detenidos"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                 >
                
                <template slot="items" class="white" slot-scope="props">
                    

                    <td>{{ props.item.usuario}}</td>   
                    <td>{{ props.item.uModulo}}</td> 
                    <td>{{ props.item.nompersona }}</td>
                    <td>{{ props.item.nuc}}</td>   
                    <td>{{ props.item.fechaIngreso }}</td> 
                    <td>{{ props.item.delito }}</td>                     
                    <td>{{ props.item.autoridadED }}</td>                 
                </template>
                <template slot="no-data">
                <v-btn color="primary"  @click="listar()" >Resetear</v-btn>
                </template>
                
        </v-data-table> 

        <v-dialog v-model="dialogo" fullscreen hide-overlay transition="dialog-bottom-transition">
        
            <v-card>
            <v-toolbar dark color="primary">
                
                <v-toolbar-title>Registrar detenido</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn  color=success text @click="generarpdf()">Vista previa</v-btn>
                <v-btn icon   @click="dialogo = false">
                <v-icon>close</v-icon>
                </v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                    <v-flex class="espaciado" xs12 sm12 md6 lg6 >
                                    <v-text-field 
                                        name="número de oficio" 
                                        label="*Número de oficio:" 
                                        v-model="numoficio"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('número de oficio')">                                          
                                    </v-text-field>   

                                    <v-select name="delito"   
                                        :items="delitos"
                                        v-model="delito" 
                                        v-validate="'required'" 
                                        label="*Delito:"
                                        return-object 
                                        attach
                                        chips
                                        deletable-chips
                                        multiple
                                        v-on:change="ordenar"
                                        :error-messages="errors.collect('delito')">
                                    </v-select>

                                    
                                    <v-text-field 
                                        name="causa penal" 
                                        label="*Causa penal:" 
                                        v-model="causapenal"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('causa penal')">                                          
                                    </v-text-field>   
                        
                    </v-flex>

                    <v-flex class="espaciado" xs12 sm12 md6 lg6 >
                    
                        

                    </v-flex>

                </v-layout>
            

            </v-container>

            
         
        
            </v-card>
        </v-dialog>

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
        numoficio:'',
        delitos:[],
        delito:'',
        causapenal:'',
        detenidos:[],
        texto:'',
        modaldocumento:false,
        comilla:'"',
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

            { text: 'Emitida por', value: 'usuario', sortable: true  }, 
            { text: 'Modulo', value: 'modulo', sortable: true  },             
            { text: 'Imputado', value: 'nompersona' }, 
            { text: 'NUC', value: 'nuc' },
            { text: 'Fecha de Ingreso', value: 'fechaIngreso' },
            { text: 'Delito', value: 'delito' },
            { text: 'Autoridad captura',value: 'autoridadED' },       
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
                me.listardelitos();
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
        agregar(){
            let me = this;
            me.limpiar();
            me.dialogo = true;
        },
        generarpdf(){
            this.texto = "<u><b>CITATORIO</b></u>"+
            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
            "<p class="+this.comilla+"ql-align-justify"+this.comilla+"><br></p>"+
            "<u>DESTINATARIO:</u>"

            this.downloadPdf(this.u_nombre,this.u_puesto,this.u_agencia)
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
        ordenar(){ 
            this.delito.sort((a, b) => (a.value > b.value) ? 1 : -1)
        }, 
        listardelitos(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var delitosArray=[];
            var contador=0;
            this.$cat.get('api/RDHs/ListarPorHecho/'+ me.rHechoId,configuracion).then(function(response){
                //console.log(response.data)
                delitosArray=response.data;
                delitosArray.map(function(x){
                    me.delitos.push({text: x.nombreDelito,value: contador}); 
                    contador++;                  
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
        guardar(){
           this.$validator.validate().then(result => {
                    if (result) { 
                            let me=this;
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                            this.$cat.post('api/Detencion/Crear',{
                                'rHechoId' : me.idrecho ,
                                'personaId' : me.persona.value ,
                                'nuc' : me.nuc.text ,
                                'mpAsignado' : me.mp,
                                'mesa' : me.modulo,
                                'fechaIngreso' : me.fechac,
                                'autoridadED' : me.autoridad.text,
                                'delito' : me.delito.text,
                                'tdelito' : me.delito.tipo,
                                'modalidad' : me.delito.intencion,
                                'mOperandi' : me.modusoperandi,
                                'uDistrito' : me.u_distrito,
                                'uSubproc' : me.u_dirSubPro,
                                'uAgencia' : me.u_agencia,
                                'usuario' : me.u_nombre,
                                'uPuesto' : me.u_puesto,
                                'uModulo' : me.u_modulo,
                            },configuracion).then(function(response){
                                me.$notify('La información se guardo correctamente !!!','success')  
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
        limpiar(){    
            let me = this;
        },
        listar(){
          let me=this;  
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header};
                this.$cat.get('api/ComparecenciaElemento/Listar',configuracion).then(function(response){
                    //console.log(response);
                    me.detenidos=response.data;
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
            var nuc = this.nuc;
            var causapenal = this.causapenal;
            var delitos = this.delitosf
            var nooficio = this.numoficio
            var fecha = this.generarfecha();
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
                pageMargins: [ 30, 220, 30, 100 ],
                footer: function (currentPage, pageCount) {
                    return {
                        columns: [
                             {
                                image:logo4,
                                width:612,
                                absolutePosition:{x:0,y:0}
                            },
                            {
                                text: agenciainfodr +"\n"+agenciainfotel+"\n"+ 'www.hidalgo.gob.mx',
                                style: 'subheaderlogo', 
                                margin: [312,12,72,0],
                                alignment:'right',
                                absolutePosition:{x:0,y:30}  
                            },
                            {
                                text: "Page " + currentPage.toString() + ' de ' + pageCount, alignment: 'right', style: 'normaText', margin: [0, 20, 30, 0] 
                            }
			            ] 
                    };
                },
                header: function(currentPage, pageCount, pageSize) {
                         
                        return [
                            { 
                                image: logo3,
                                width: 612, 
                                absolutePosition: {x: 0, y: 0},
                                
                            },
                            /*{ 
                                image: logo2,
                                width: 70,  
                                absolutePosition: {x: 490, y: 30},
                            },*/
                            
                                               
                        ]
                 
                },
              
                content: [
                    {
                        text:  u_subProc + "\n" + u_dirSubPro +"\n"+u_agencia ,
                        style: 'subheaderlogo',
                        absolutePosition: {x: 85, y: 95},
                    },

                    {
                        text: "OFICIO NO: "+nooficio ,
                        style: 'subheader',
                        absolutePosition: {x: 37, y: 130},
                    },
                    {
                        text:"\nCAUSA PENAL: "+causapenal+"\n"+
                        "NUC: "+nuc+"\n"+
                        "DELITO: "+delitos+"\n\n"+
                        "fecha"+fecha,                 
                        style: 'subheader',                                   
                        alignment: 'right',
                        margin: [200, 132, 30, 0]                                 
                            },    
                    {
                        text: html ,                        
                        style: 'texto',
                        alignment: 'center'
                    },
                    {
                        text: '\n'+'\n'+'\n'+ "ATENTAMENTE"+'\n'+'\n'+'\n'+'\n',   
                        alignment :'center',                     
                        style: 'texton',                                                           
                    },
                    {
                        text: nombre,   
                        alignment :'center',                     
                        style: 'texton',                                                           
                    },
                    {
                        text: puesto,   
                        alignment :'center',                     
                        style: 'texton',                                                           
                    },
                    {
                        text: agencia,   
                        alignment :'center',                     
                        style: 'texton',                                                           
                    },
                    
                    
                ],
             
                
                styles: {
                    
                    header: {
                        fontSize: 18,
                        bold: true,   
                    },
                    subheader: {
                        fontSize: 11,
                        bold: true,
                       
                    },
                    subheaderlogo: {
                        fontSize: 10,
                        bold: true,
                       
                    },
                    texto:{
                        fontSize: 9,
                    },
                     texton:{
                        fontSize: 9,
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