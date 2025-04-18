<template>
    <v-container>
        <v-layout text-xs-center wrap>
            <v-flex xs12>
                <v-layout  row> 
                    <v-flex d-flex grow>
                        <v-card elevation="0">
                            <v-card-text>
                                <v-list v-model="delito"> 
                                    <v-list-tile v-for="(delito, i) in delitos" :key="i">
                                        <v-list-tile-action>
                                            <v-icon color="error">report</v-icon>
                                        </v-list-tile-action> 
                                        <v-list-tile-content>
                                            <v-list-tile-title>Delito: {{ delito.nombreDelito }}</v-list-tile-title> 
                                        </v-list-tile-content>  
                                        <v-list-tile-action>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn icon class="mr-2" v-on="on" color="default" ripple @click="informacion(delito)"> 
                                                        <v-icon color="grey lighten-1">info</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>Detalle del delito</span>
                                            </v-tooltip>    
                                        </v-list-tile-action>  
                                    </v-list-tile>
                                </v-list>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex> 
            <v-dialog v-model="modal_Delito" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">       
                        <v-toolbar-title>Documento.</v-toolbar-title>
                        <v-spacer />
                        <v-toolbar-items>
                        <v-btn icon @click="modal_Delito = false">
                        <v-icon>close</v-icon>
                        </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card-text>
                        <iframe id="iframepdf3" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no" />
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios'  
    import jsPDF from 'jspdf'
    import html2canvas from 'html2canvas'
    import VeeValidate from 'vee-validate'    
    import moment from 'moment'
    import 'moment/locale/es';
    import alertify from 'alertifyjs';
    import { VueEditor } from "vue2-editor";
    import { error } from 'util';

    export default {
        data: () => ({
            envioId: '',
            delito: '',
            delitoespecifico: '',
            hipotesis: '',
            delitoId: 0,
            delitos: [],
            nombreDelito: '',
            ofiNoOfic: '',
            altoImpacto: '',
            tipoFuero: '',
            tipoDeclaracion: '',
            resultadoDelito: '',
            graveNoGrave: '',
            intensionDelito: '',
            violenciaSinViolencia:'',
            equiparado:'',
            tipo:'',
            concurso :'',
            clasificaOrdenResult :'',
            armaFuego :'',
            armaBlanca:'',
            conAlgunaParteCuerpo :'',
            conotroElemento :'',
            tipoRobado :'',
            montoRobado :'',
            modal_Delito:false,
        }),
        created () { 
            let me = this  
            me.listar();
            me.listarLogo();  
            // INTERCEPTOR MODULO DE JUSTICIA RESTAURATIVA
            axios.interceptors.request.use((config) => { 
                this.$store.commit('LOADER', true);
                return config;
            }, (error) => {  
                this.$store.commit('LOADER', false);
                return Promise.reject( error);
            }); 
            axios.interceptors.response.use((response) => { 
                this.$store.commit('LOADER', false); 
                return response;
            }, (error) => {  
                this.$store.commit('LOADER', false); 
                return Promise.reject(error);
            });
        },
        methods: { 
            listarLogo () {
                let me = this; 
                this.$conf.get('api/ConfGlobals/Listar').then(function(response) {
                    me.logo3 = response.data.logo3;
                    me.logo4 = response.data.logo4;
                }).catch(function(error) {
                    me.$notify('Error al leer la configuracion global !!!', 'error')    
                });
            }, 
            listar () {
                let me = this; 
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                me.envioId = me.$store.state.idEnvio;
                //console.log(me.envioId)
                me.$justiciarestaurativa.get('api/Delitoes/ListarDelitos/' + me.envioId, configuracion).then(function(response) {
                    me.delitos = response.data;
                }).catch(err => {  
                    if (err.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (err.response.status == 403) { 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage = false 
                    } else if (err.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros!!!', 'error')
                    } 
                });
            },
            informacion (item) {
                let me = this;
                me.nombreDelito = item.nombreDelito;
                me.delitoespecifico = item.delitoEspecifico;
                me.hipotesis = item.hipotesis;
                me.ofiNoOfic = item.ofiNoOfic;
                if (item.altoImpacto == true) {
                    me.altoImpacto = "SI"
                } else {
                    me.altoImpacto = "NO"
                }
                me.tipoFuero = item.tipoFuero,
                me.tipoDeclaracion = item.tipoDeclaracion;
                me.resultadoDelito = item.resultadoDelito;
                me.graveNoGrave = item.graveNoGrave;
                me.intensionDelito = item.intensionDelito;
                me.violenciaSinViolencia = item.violenciaSinViolencia;
                if (item.equiparado == true) {
                    me.equiparado = "SI"
                } else {
                    me.equiparado = "NO"
                }
                me.tipo = item.tipo;
                me.concurso = item.concurso;
                me.clasificaOrdenResult = item.clasificaOrdenResult;
                if (item.armaFuego == true) {
                    me.armaFuego = "SI"
                } else {
                    me.armaFuego = "NO"
                }
                if (item.armaBlanca == true) {
                    me.armaBlanca = "SI"
                } else {
                    me.armaBlanca = "NO"
                }
                me.conAlgunaParteCuerpo = item.conAlgunaParteCuerpo;
                me.conotroElemento = item.conotroElemento;
                me.tipoRobado = item.tipoRobado;
                me.montoRobado = item.montoRobado;
                me.mostrarpdf_Delito();
            },
            crearPdf_Delito () { 
                var pdfMake = require('pdfmake/build/pdfmake.js')
                var logo3 = this.logo3;
                var logo4 = this.logo4;
                var dia = moment().format("DD");
                var mes = moment().format('MMMM');
                var año= moment().format("YYYY");
                var hr= moment().format('h:mm:ss a');
                var fecha = dia + " de " + mes  + " del " + año + ", " + hr 
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
                                    absolutePosition: { x: 0, y: 0 },
                                },
                                {
                                    text: "Page " + currentPage.toString() + ' de ' + pageCount, alignment: 'right', style: 'footertext',  margin: [0, 20, 30, 0] 
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
                        ]
                    },
                    content: [
                        {
                            text:  fecha,
                            style: 'fecha'
                        }, 
                        '\n',
                        {
                            text: 'Número de expediente: ' + this.$store.state.noExpediente,
                            style: 'nuc'
                        },
                        '\n\n',
                        {
                            style: 'table',
                            table: {
                                headerRows: 1,
                                widths: ['*', 'auto', 'auto'], 
                                body: [
                                    [{ colSpan: 3, text: 'Información del delito', fillColor: '#eeeeee', fontSize: 14, bold: true, alignment: 'center' }, '', '',],
                                    ['Delito' + '\n\n' + this.nombreDelito, 'Delito espesifico:' + '\n\n' + this.delitoespecifico , 'Alto impacto:'+ '\n\n' + this.altoImpacto]  ,
                                    [{ colSpan: 3,  text:'Hipótesis:'+ '\n\n' + this.hipotesis }, 'Oficioso o No oficioso:' + '\n\n' + this.ofiNoOfic],
                                    ['Tipo de fuero:' + '\n\n' + this.tipoFuero, 'Tipo de declaración:'+ '\n\n' + this.tipoDeclaracion, 'Resultado:'+ '\n\n' + this.resultadoDelito],
                                    ['Grave o No grave:' + '\n\n' + this.graveNoGrave, 'Intesión del delito:'+ '\n\n' + this.intensionDelito, 'Con Violencia o Sin Violencia:'+ '\n\n' + this.violenciaSinViolencia], 
                                    ['Equiparado:' + '\n\n' + this.equiparado, 'Tipo' + '\n\n' + this.tipo , 'Clasificación por orden de resultado:'+ '\n\n' + this.clasificaOrdenResult, ]  ,
                                    ['Arma de fuego:' + '\n\n' + this.armafuego, 'Arma blanca:'+ '\n\n' + this.armaBlanca, 'Con alguna parte del cuerpo:'+ '\n\n' + this.conAlgunaParteCuerpo],
                                    ['Con otro elemento:' + '\n\n' + this.conotroElemento, 'Tipo de lo Robado:'+ '\n\n' + this.tipoRobado, 'Monto de lo Robado:'+ '\n\n' + this.montoRobado],  
                                    [{ colSpan: 3,  text: 'Concurso:'+ '\n\n' + this.concurso }, ''], 
                                ]
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
                        },
                    ],
                    styles: { 
                        fecha: {
                        fontSize: 9, 
                        regular: true,
                        alignment: 'right',
                    },
                    nuc: {
                        fontSize: 12, 
                        alignment: 'right',
                        bold: true,
                    },
                    titulo: {
                        fontSize: 12,
                        bold: true,
                        alignment: 'center',
                    },
                    subtitulo:{
                        fontSize: 11,
                        bold: true, 
                    },
                    headertext :{
                        fontSize: 10,
                        bold:true,
                        alignment:'left',
                    },
                    footertext: {
                        fontSize: 7,
                        color: 'white'
                    },
                    texto: {
                        fontSize: 10,  
                        regular: true,
                        alignment: 'justify',
                    },
                    textobold: {
                        fontSize: 10,  
                        bold: true,
                        alignment: 'justify',
                    },
                    compareciente: {
                        fontSize: 12, 
                        bold: true,
                        alignment: 'right',
                    },
                    ampo: {
                        fontSize: 10, 
                        bold: true,
                        alignment: 'left',
                    }, 
		            table: {
                        fontSize: 9,
                        margin: [0, 5, 0, 15],
                        alignment: 'center',
                    },
                    cargo: {
                        fontSize: 9, 
                        regular: true,
                        alignment: 'left',
                    },
                }}
                return dd;
            },
            mostrarpdf_Delito () {
                var dd = this.crearPdf_Delito();
                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");
                if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.pdfMake.vfs;
                }
                var doc = pdfMake.createPdf(dd);
                var f = document.getElementById('iframepdf3'); 
                var callback = function(url) { f.setAttribute('src',url); }
                doc.getDataUrl(callback, doc);
                this.modal_Delito = true; 
            },
        }
    }
</script>