<template>  
<v-layout align-start>
    <v-flex>
        <v-toolbar flat color="white">
            <v-toolbar-title class="font-weight-regular" >Oficio.</v-toolbar-title>
            
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            
        </v-toolbar>
 
          <v-select
                                    label="datos:" 
                                    v-on:change="agregarvariable()"
                                    v-model="dato"
                                    :items="datoslistos"
                                   > 
                                  </v-select>
          <v-btn color="primary"  @click.native="guardar()"  >Finalizar</v-btn>   
 
             
            <vue-editor   
                outline 
                :editorToolbar="customToolbar" 
                v-model="textohtml"
                label="Reseña breve hechos"  >
            </vue-editor>
   
         <v-dialog v-model="modaldocumento" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
               
                <v-toolbar-title>Documento.</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn  color=success text @click.native="guardar()">
                   GUARDAR</v-btn>
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
  import { VueEditor } from "vue2-editor";
import { error } from 'util';
 
  export default {
     
    components: {
         "vue2-editor": VueEditor
         
    },
    data: () => ({
        datoslistos:['varible1', 'variable2'],
        dato:'',
        logo1:'',
        logo2:'',
        modaldocumento:false,
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
        textohtml:'',
    }),
    mounted() {
       
    },
    created () { 
        this.listarLogo();

    },

    computed: {
    },
    watch: {
         
    },
    methods:{
        agregarvariable(){
            this.textohtml= "Guillermo " + this.dato;
        },
        resizeIframe(obj) {
            obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
        },
        listarLogo(){
        
                let me=this; 
                this.$conf.get('api/ConfGlobals/Listar').then(function(response){
                    me.logo1= response.data.logo1;
                    me.logo2= response.data.logo2;
                    me.logo3 = response.data.logo3;
                    me.logo4 = response.data.logo4;
                    
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
                 let me=this; 
                 var dd = me.downloadPdf();
                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");

                if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.pdfMake.vfs; 
                }
                var doc = pdfMake.createPdf(dd).print();

            },
        downloadPdf() {
 
           var pdfMake = require('pdfmake/build/pdfmake.js')
           var htmlToPdfmake = require("html-to-pdfmake");
            //***************************************************************************** */
            // VARIABLES
            //***************************************************************************** */
            var logo1 = this.logo1;
            var logo2 = this.logo2;
            var logo3 = this.logo3;
            var logo4 = this.logo4;
            //***************************************************************************** */
            var html =htmlToPdfmake(
                this.textohtml
            );
            //***************************************************************************** */
            var dd = {
                pageSize: 'LEGAL',
                pageOrientation: 'portrait',
                pageMargins: [ 30, 150, 30, 100 ],
                footer: function (currentPage, pageCount) {
                    return {
                        columns: [
                             { 
                                image: logo4,
                                width: 612, 
                                absolutePosition: {x: 0, y: 0},
                                
                            },
                            {
                                text: 'Carretera México - Pachuca km 84.5, Circuito Sector Primario s/n Col. Centro Cívico, Pachuca de Soto, Hidalgo. C.P. 42083 Tel. 01 (771) 717 9000 www.hidalgo.gob.mx',style: 'texto',  
                                margin: [30, 20, 0, 0],
                                absolutePosition: {x: 0, y: 30}, 
                            },
                            {
                                text: "Page " + currentPage.toString() + ' de ' + pageCount, alignment: 'right', style: 'texto',  
                                margin: [0, 20, 30, 0] 
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
                            //{ 
                            //    image: logo2,
                            //    width: 70,  
                            //    absolutePosition: {x: 490, y: 30},
                            //}, 
                        ]
                 
                },
              
                content: [
                   
                    {
                        text:  'Header',
                        style: 'header'
                    },
                   
                    {
                        text: 'Subheader 1 - using subheader style',
                        style: 'subheader'
                    }, 
                    {
                        text: html,
                        style: 'texto'
                    },
                     
                ],
             
                
                styles: {
                    
                    header: {
                        fontSize: 18,
                        bold: true,
                       
                    },
                    subheader: {
                        fontSize: 15,
                        bold: true,
                       
                    },
                    texto:{
                        fontSize: 12,
                    },
                   
                }
	
            }
           
return dd
            // pdfMake.createPdf(docDefinition).open();
            
        },

      
        
       
   }
}
</script>
 
