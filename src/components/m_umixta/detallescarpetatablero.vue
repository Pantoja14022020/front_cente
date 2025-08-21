<template>
    <v-layout  align-start>
        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-regular" >Información general.</v-toolbar-title>
                <v-divider class="mx-2" inset vertical />
                <v-spacer />
                <v-flex xs12 sm6 md3>
                    <v-text-field
                        class="font-weight-regular"
                        v-model="nuc"
                        disabled
                        prepend-icon="folder"
                        filled
                    />
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
                        <v-btn class="mx-2" slot="activator" v-on="on"   @click="comprobarinfo()" fab dark small color="primary">
                            <v-icon dark>print</v-icon>
                        </v-btn>
                    </template>
                    <span>Imprimir caratula del NUC</span>
                </v-tooltip>

            </v-toolbar>
            <v-card v-if="rHechoId" flat color="white" grid-list-md text-md-right fluid fill-height>

                <v-layout row d-flex>
                    <v-card elevation="0">
                        <v-card-title class="accent">
                            <h3>Tablero de inactividad de la carpeta</h3>
                        </v-card-title>
                        <v-card-text>
                            <table>
                                <tr>
                                    <td style="width:180px">Dias inactivos de la carpeta:</td>
                                    <td :style="getColorStyle">
                                        <b>
                                        <v-icon>date_range</v-icon>
                                        {{ diasI }}
                                        </b>
                                    </td>
                                </tr>   
                                                            
                            </table>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="0">
                        <v-card-title class="accent"><h3> <br></h3></v-card-title>
                        <v-card-text>
                            <table>
                                <tr>
                                    <td style="width:180px">Estatus actual:</td>
                                    <td><b>{{ etapacarpeta }}</b></td>
                                </tr>
                                <br>
                            </table>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="0">
                        <v-card-title class="accent"><h3> <br></h3></v-card-title>
                        <v-card-text>
                            <table>
                                <tr>
                                    <td style="width:180px">Etapa actual:</td>
                                    <td><b>{{ statuscarpeta }}</b></td>
                                </tr>
                                <br>
                            </table>
                        </v-card-text>
                    </v-card>
                </v-layout>

                <v-layout row>
                    <v-card elevation="0">
                        <v-card-title class="accent"><h3>Información general de la persona que inicia</h3></v-card-title>
                        <v-card-text>
                            <table>
                                <tr>
                                    <td style="width:180px"></td>
                                    <td><b>{{ acumulada }}</b></td>
                                </tr>
                                <tr>
                                    <td style="width:180px">Nombre de la persona:</td>
                                    <td><b>{{ nombre }}</b></td>
                                </tr>
                                <tr>
                                    <td>Clasificación de la persona:</td>
                                    <td><b> {{ tvictima }}</b></td>
                                </tr>
                                    <tr>
                                    <td>Tipo de persona:</td>
                                    <td><b>{{ tipopersona }}</b></td>
                                </tr>
                                    <tr>
                                    <td>CURP</td>
                                    <td><b>{{ curp }}</b></td>
                                </tr>
                                <tr>
                                    <td>Medio de notificación:</td>
                                    <td><b>{{ medionotificacion }}</b></td>
                                </tr>
                                    <tr>
                                    <td>Teléfonos:</td>
                                    <td><b>{{ tel }}</b></td>
                                </tr>
                                <tr>
                                    <td>Correo:</td>
                                    <td><b>{{ email }}</b></td>
                                </tr>
                                <tr>
                                    <td>Dirección:</td>
                                    <td><b>{{ direccion }} </b></td>
                                </tr>
                                <br>
                            </table>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="0">
                        <v-card-title class="accent"><h3> <br></h3></v-card-title>
                        <v-card-text>
                            <table>
                                <tr>
                                    <td style="width:180px">Nacionalidad:</td>
                                    <td><b>{{ nacionalidad }}</b></td>
                                </tr>
                                <tr>
                                    <td>Estado familiar:</td>
                                    <td><b>{{ estadocivil }}</b></td>
                                </tr>
                                <tr>
                                    <td>Género:</td>
                                    <td><b>{{ genero }}</b></td>
                                </tr>
                                <tr>
                                    <td>Ocupación:</td>
                                    <td><b>{{ ocupacion }}</b></td>
                                </tr>
                                <tr>
                                    <td>Nivel de estudios:</td>
                                    <td><b>{{ nivelestudio }}</b></td>
                                </tr>
                                <tr>
                                    <td>Lengüa</td>
                                    <td><b>{{ lengua }}</b></td>
                                </tr>
                                <tr>
                                    <td>Religión:</td>
                                    <td><b>{{ religion }}</b></td>
                                </tr>
                                <tr>
                                    <td>Discapacidad:</td>
                                    <td><b>{{ tipodiscapacidad }}</b></td>
                                </tr>
                                <br>
                            </table>
                        </v-card-text>
                    </v-card>
                    <v-card elevation="0">
                        <v-card-title class="accent"><h3>Información complementaria</h3></v-card-title>
                        <v-card-text>
                            <table>
                                <tr>
                                    <td style="width:180px">Atendido por:</td>
                                    <td><b>{{ registradopor }}</b></td>
                                </tr>
                                <tr>
                                    <td>Distrito de origen:</td>
                                    <td><b>{{ distritoinicial }}</b></td>
                                </tr>
                                <tr>
                                    <td>Dirección o subprocuraduria:</td>
                                    <td><b> {{ dirsubprocuinicial }}</b></td>
                                </tr>
                                <tr>
                                    <td>Agencia origen:</td>
                                    <td><b>{{ agenciainicial }}</b></td>
                                </tr>
                            </table>
                            <v-divider class="mx-0" inset horizontal />
                            <table>
                                <tr>
                                    <td style="width:180px">Banavim:</td>
                                    <td><b><v-icon>book</v-icon>{{ vanabim2 }}</b></td>
                                </tr>
                                <tr>
                                    <td style="width:180px">Fecha del registro del NUC:</td>
                                    <td style="color:#78BE20">
                                        <b>
                                            <v-icon>access_time</v-icon>
                                            {{ fechaelevanuc.substring(8,10) + " de " + obtenermes(fechaelevanuc.substring(5,7)-1) +
                                            " del " + fechaelevanuc.substring(0,4) + ", " + fechaelevanuc.substring(11,19) }}
                                        </b>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Fecha y hora del suceso:</td>
                                    <td style="color:#78BE20">
                                        <div v-if="fechasuceso !=null">
                                            <b>
                                                <v-icon>access_time</v-icon>
                                                {{ fechasuceso.substring(8,10) + " de " + obtenermes(fechasuceso.substring(5,7)-1) +
                                                " del " + fechasuceso.substring(0,4) + ", " + fechasuceso.substring(11,19) }}
                                            </b>
                                        </div>
                                        <div v-else>
                                            <b><v-icon>access_time</v-icon>{{ fechasuceso }}</b>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dirección principal del suceso:</td>
                                    <td>
                                        <b>
                                            {{ direccionsuceso }}
                                        </b>
                                        
                                    </td>
                                </tr>
                                <br>
                            </table>
                        </v-card-text>
                    </v-card>
                </v-layout>
                <v-layout row d-flex>
                    <v-card elevation="0">
                        <v-card-title class="accent">
                            <h3>Reseña breve</h3>
                        </v-card-title>
                        <v-card-text>
                            <p>
                                <span v-html="rBreve"></span>
                                {{ rBreve }}
                            </p>
                        </v-card-text>
                    </v-card>
                </v-layout>
                <v-layout v-if="false" row d-flex>
                    <v-card elevation="0">
                        <v-card-title class="accent"><h3>*Narrativa de los hechos</h3></v-card-title>
                        <v-card-text>
                            <v-form data-vv-scope="form1">
                                <vue-editor
                                    outline
                                    :editorToolbar="customToolbar"
                                    v-model="narrativaHechos"
                                    label="*Narrativa de los hechos"
                                    :error-messages="errors.collect('form1.narrativa de los hechos')"
                                    v-validate="'required'"
                                    data-vv-name="narrativa de los hechos"
                                    required
                                    :disabled="rnh1"
                                    data-vv-scope="form1"
                                />
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn class="mx-2" slot="activator" v-on="on" @click="mostrarpdf_EntrevistaVictima()" absolute top right fab color="primary">
                                            <v-icon dark>{{ btn_SI }}</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>{{ text_Toltip }}</span>
                                </v-tooltip>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-layout>
                <v-layout row d-flex>
                    <v-card elevation="0">
                        <v-card-title class="accent">
                            <h3>Historial de Registros</h3>
                        </v-card-title>
                        <v-card-text>
                            <v-data-table
                                :headers="headers"
                                :items="registrosT"
                                :search="search"
                                :rows-per-page-items="rowsPerPageItems"
                                :pagination.sync="pagination"
                            >
                            <template slot="items" class="white" slot-scope="props">
                                <td>{{ props.item.tipoRegistroTableroI }}</td>
                                <td>{{ props.item.distrito }}</td>
                                <td>{{ props.item.dirSub }}</td>
                                <td>{{ props.item.agencia }}</td>
                                <td>{{ props.item.modulo }}</td>
                                <td>{{ props.item.nombreUsuario }}</td>
                                <td>{{ props.item.fechaRegistro.substring(8, 10) + " de " + obtenermes(props.item.fechaRegistro.substring(5, 7) - 1) + " del " + props.item.fechaRegistro.substring(0, 4) }}
                                </td>
                                </template>
                                <template slot="no-data">
                                    <v-btn color="primary" @click="listarRegistroTablero">Resetear</v-btn>
                                    </template>
                                </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-layout>
            </v-card>
           
        </v-flex>
        <v-dialog v-model="modal_CaratulaNUC" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer />
                    <v-toolbar-items>
                        <v-btn color=success text @click.native="imprimirCaratulaNUC()">IMPRIMIR</v-btn>
                        <v-btn icon @click="modal_CaratulaNUC = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <iframe id="iframepdf1" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no" />
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="modal_EntrevistaVictima" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer />
                    <v-toolbar-items>
                        <v-btn color=success text @click.native="imprimir_EntrevistaVictima()">{{ text_Modal }}</v-btn>
                        <v-btn icon @click="modal_EntrevistaVictima = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <iframe id="iframepdf2" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no" />
                </v-card-text>
            </v-card>
        </v-dialog>



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
        data () {
            return {
                fechaEntre: '',
                components: {
                    n401,
                    n403
                },
                showpage: true,
                modEditResena: false,
                e401: false,
                e403: false,
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
                rAtencionId: '',
                rHechoId: '',
                agenciaid: '',
                nuc: '',
                diasI:"",
                rac: '',
                dia: "",
                mes: "",
                año: "",
                hr: "",
                //CARATULA DEL NUC
                modal_CaratulaNUC: false,
                registradopor: '',
                puestoquienregistro: '',
                modulodondefueatendido: '',
                distritoinicial: '',
                dirsubprocuinicial: '',
                agenciainicial: '',
                agenciaid: '',
                // ENTREVISTA DE LA VICITMA
                modal_EntrevistaVictima: false,
                fechasuceso: '',
                idDDelito: '',
                direccionsuceso: '',
                fechaelevanuc: '',
                rBreve: '',
                narrativaHechos: '',
                rnh1: false,
                fechaEntrevista: '',
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
                vanabim2: '',
                aux2: [],
                // LECTURA DE DERECHOS
                modal_LecturaDerechosVictima: false,
                //-------Logos-----------------------------------------/
                logo1: '',
                logo2: '',
                logo3: '',
                logo4: '',
                //-----CLAIM------------------------------------------
                u_iddistrito: this.$store.state.usuario.iddistrito,
                u_distrito: this.$store.state.usuario.distrito,
                u_dirSubPro: this.$store.state.usuario.dirSubProc,
                u_idagencia: this.$store.state.usuario.idagencia,
                u_agencia: this.$store.state.usuario.agencia,
                u_idmoduloservicio: this.$store.state.usuario.idmoduloservicio,
                u_modulo: this.$store.state.usuario.modulo,
                u_idusuario: this.$store.state.usuario.idusuario,
                u_nombre: this.$store.state.usuario.usuario,
                u_clave: this.$store.state.usuario.clave,
                u_rol: this.$store.state.usuario.rol,
                u_puesto: this.$store.state.usuario.puesto,
                u_subproc: this.$store.state.usuario.subProc,
                personaId: 0,
                curp: '',
                nombre: '',
                alias: '',
                tel: '',
                email: '',
                tipopersona: '',
                tvictima: '',
                medionotificacion: '',
                acumulada: '',
                comprobar: [],
                clasificacioncom:[],
                sexo: '',
                genero: '',
                fnacimiento: '',
                edad: '',
                estadocivil: '',
                nacionalidad: '',
                ocupacion: '',
                lengua: '',
                religion: '',
                nivelestudio: '',
                tipodiscapacidad: '',
                parentesco: '',
                direccion: '',
                vanabim: '',
                campoVacio: true,
                campoVacio2: true,
                dialogvanabim: false,
                lat2: '',
                lng2: '',
                center2: { lat: 45.508, lng: -73.587 },
                markers2: [],
                places2: [],
                currentPlace2: null,
                geoloc2: 0,
                modalGeolocalizacion2: 0,
                de_lat2: '',
                de_lng2: '',
                opcionesmapa: {
                    zoomControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                    disableDefaultUi: false,
                    noClear: false,
                    panControl: false,
                    disableDefaultUI: false,
                    disableDoubleClickZoom: false,
                    draggable: false,
                    keyboardShortcuts: false,
                    mapTypeControl: false,
                    noClear: false,
                    panControl: false,
                    rotateControl: false,
                    scrollwheel: false,
                    streetViewControl: false,
                    clickableIcons: false,
                    mapTypeId: 'roadmap',
                },
                zoom: 17,
                modaldocumento: false,
                modalFHS: 0,
                fecha: new Date().toISOString().substr(0, 10),
                hora: null,
                modalDS: 0,
                // DIRECCION PERSONAL
                calle: '',
                noExt: '',
                noInt: '',
                entreCalle1: '',
                entreCalle2: '',
                referencia: '',
                pais: 'Mexico',
                estado: '',
                estadoid: '',
                ciudades: [],
                municipio: '',
                municipioid: '',
                municipios: [],
                localidad: '',
                localidadid: '',
                localidades: [],
                cp: '',
                modalGeolocalizacion: 0,
                center: { lat: 45.508, lng: -73.587 },
                markers: [],
                places: [],
                currentPlace: null,
                lat: '',
                lng: '',
                lugarespecifico: '',
                lugaresespecificos:['Vehiculo', 'Casa', 'Calle', 'Carretera', 'Terreno baldio','Estacionamiento','Local comercial','Oficina','Otro'],
                idNuc: '',
                statuses: [],
                status: '',
                dialostatus: false,
                statuscarpeta: '',
                etapacarpeta: '',
                iniciales: '',
                directorPI: '',
                etapas:[
                    { text: "Trámite", value: "Tramite" },
                    { text: "Concluida", value: "Concluida" },
                    { text: "Suspendida", value: "Suspendida" },
                ],
                etapa: '',
                lataux: '',
                lngaux: '',
                editedIndex: 0,
                headers: [
                { text: 'Tipo de Registro', value: 'tipoRegistroTableroI'},
                { text: 'Distrito', value: 'distrito'},
                { text: 'Dirección', value: 'dirSub' },
                { text: 'Agencia', value: 'agencia' },
                { text: 'Modulo', value: 'modulo' },
                { text: 'Usario que realizo la modificacion', value: 'nombreUsuario' },
                { text: 'Fecha de Modificación', value: 'fechaRegistro'},
                ],
                search:"",
                rowsPerPageItems:[10,20,30,40,50],
                pagination:{
                    rowsPerPage:20
                },
                registrosT : [],
            }
        },
        computed: {
            text_Toltip () {
                return this.rnh1 === false ?  'Guardar entrevista' : 'Imprimir entrevista'
            },
            btn_SI () {
                return this.rnh1 === false ?  'save' : 'print'
            },
            text_Modal () {
                return this.rnh1 === false ?  'Guardar e imprimir' : 'Imprimir'
            },
            getColorStyle() {
                if (this.diasI < 25) {
                    return { color: 'green' };
                } 
                if(this.diasI > 30) {
                    return { color: 'red' };
                }
                else{
                    return { color: 'orange' };
                } 
            },

        },
        watch: {

        },
        created () {
            let me = this
            me.rHechoId =  me.$store.state.rhechoid;
            me.rAtencionId = me.$store.state.ratencionid

            console.log(me.rHechoId)
            me.nuc = me.$store.state.nuc;
            if (me.rHechoId == null) {
                me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpeta y luego en Listar carpeta y  ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.',
                function () {
                    me.$router.push('./umixta-carpetas')
                })
            } else {
                me.$notify('Carpeta abierta correctamente','success')
            }
            me.listarrHecho();
            me.listarCiudades();
            me.listarLogo();
            me.listarStatuscarpeta();
            me.obtenerdirectorPI();
            me.listarTableroInactividad();
            me.listar();
            me.listarRegistroTablero();
        },
        methods:{
             listar(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                    let configuracion= {headers : header};
                        this.$cat.get('api/AmpDecs/Listar/'+ me.rHechoId,configuracion).then(function(response){
                            //console.log(response.data[0].fechaS);
                            me.fechaEntre=response.data[0].fechaS;
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
             listarLogo(){

                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/ConfGlobals/Listar',configuracion).then(function(response){
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
                me.$conf.get('api/Agencias/Listarporid/'+ me.agenciaid,configuracion).then(function(response){
                    me.direccionAgencia=response.data.direccion;
                    me.telefonosAgencia= response.data.telefono;
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
            cerrarcarpeta () {
                this.$store.state.rhechoid = null;
                this.$store.state.nuc= null;
                this.$router.push('./umixta-tablerodireccionm')
            },
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
            listarrHecho(){
                console.log('Entra a ListarHecho')
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$cat.get('api/RHechoes/ListarPorId/' +me.rHechoId,configuracion).then(function(response){
                    console.log(response.data.rBreve);

                    me.aux2 = response.data
                    me.rAtencionId= response.data.rAtencionId,
                    me.rHechoId= response.data.rHechoId,
                    me.agenciaid = response.data.agenciaid,

                    me.registradopor= response.data.u_Nombre,
                    me.puestoquienregistro = response.data.u_Puesto,
                    me.modulodondefueatendido = response.data.u_Modulo,

                    me.distritoinicial = response.data.distritoInicial,
                    me.dirsubprocuinicial = response.data.dirSubProcuInicial,
                    me.agenciainicial = response.data.agenciaInicial,
                    me.fechaelevanuc = response.data.fechaElevaNuc,
                    me.fechasuceso = response.data.fechaHoraSuceso,
                    me.rBreve = response.data.rBreve,
                    me.narrativaHechos = response.data.narrativaHechos,
                    me.vanabim2 = response.data.vanabim
                    me.vanabim = response.data.vanabim
                    me.idNuc = response.data.nucId
                    me.statuscarpeta = response.data.statuscarpeta
                    me.etapacarpeta = response.data.etapacarpeta
                    me.listarrap();
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
            listarStatuscarpeta(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var statusArray=[];
                me.$conf.get('api/StatusNUCs/ListarT',configuracion).then(function(response){
                    //console.log(response.data)
                    statusArray=response.data;
                    statusArray.map(function(x){
                        //me.statuses.push({text: x.nombreStatus,value:x.nombreStatus});
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
            listarRegistroTablero(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$cat.get('api/RegistroTableroI/Listar/'+ me.rHechoId,configuracion).then(function(response){
                    me.registrosT=response.data;
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
            //Funcion para saber la fecha de ultimo registro de la carpeta
            listarTableroInactividad(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var inactividadArray=[];
                var fechaIn = '';
                var carpetaResuelta = '';
                var textI = "No hay registro despues de la implementacion de tablero de inactividad"
                var textC = "La carpeta ha sido concluida o se encuentra suspendida"
                this.$cat.get('api/RegistroTableroI/ListarI/' +me.rHechoId,configuracion).then(function(response){

                    inactividadArray=response.data;
                    //Guarda el valor de fecha del ultimo registro y posteriormente calcula los fdias trascurridos
                    fechaIn=response.data.fechaRegistro;
                    carpetaResuelta=response.data.nucId;

                    if(carpetaResuelta == '00000000-0000-0000-0000-000000000000')
                    {
                        var fechaActual = new Date();
                        var fechaIngreso = new Date(fechaIn);
                        var diferenciaEnMilisegundos = fechaActual - fechaIngreso;
                        var diasPasados = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

                        me.diasI = diasPasados; 
                    }
                    else{
                        me.diasI = textC; 
                    }


                }).catch(err => {

                    //En caso de no haber registro captura el error y lanza la leyenda que no hay registro de esa carpeta
                    me.diasI = textI; 

                });
            },
            obtenerdirectorPI(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                me.$controlacceso.get('api/Usuarios/DirectorUECS/'+ me.u_iddistrito,configuracion).then(function(response){
                    me.directorPI=response.data.nombre;
                })
            },
            listarstatus(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var statusArray=[];
                me.statuses = [];
                
                me.$conf.get('api/StatusNUCs/ListarTD/' + this.etapa,configuracion).then(function(response){
                    //console.log(response.data)
                    statusArray=response.data;
                    statusArray.map(function(x){
                        me.statuses.push({text: x.nombreStatus,value:x.nombreStatus});
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
            listarrap(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                console.log('Entre a lsitarrap')
                this.$cat.get('api/RAPs/Listar/' + me.rAtencionId, configuracion).then(function(response){
                    console.log(response.data)
                    me.clasificacionPersona = response.data.clasificacionPersona
                    me.rac= response.data.rac;
                    me.personaId = response.data.personaId;
                    me.curp = response.data.curp;
                    me.nombre = response.data.nombre + " " + response.data.apellidoPaterno + " " + response.data.apellidoMaterno;
                    me.alias=response.data.alias;
                    me.tel = response.data.telefono1 + " , " + response.data.telefono2;
                    me.email = response.data.correo;
                    me.rac= response.data.rac;
                    me.fhreg = response.data.fechaHoraInicio;
                    me.tvictima = response.data.clasificacionPersona;
                    me.tipopersona= response.data.tipoPersona;
                    me.sexo= response.data.sexo;
                    me.genero= response.data.genero;
                    me.fnacimiento= response.data.fechaNacimiento;
                    me.estadocivil = response.data.estadoCivil;
                    me.medionotificacion= response.data.medionotificacion;
                    me.nacionalidad= response.data.nacionalidad;
                    me.ocupacion= response.data.ocupacion;
                    me.lengua= response.data.lengua;
                    me.religion= response.data.religion;
                    me.tipodiscapacidad= response.data.tipoDiscapacidad;
                    me.parentesco=response.data.parentesco;
                    me.nivelestudio= response.data.nivelEstudio;
                    me.docIdentificacion= response.data.docIdentificacion;
                    me.edad = response.data.edad
                    var iniciales = response.data.alias
                    me.iniciales = iniciales
                    // VALIDAMOS  SI YA FUE CAPTURADA LA NARRATIVA DE LOS HECHOS
                    if (me.narrativaHechos == null){
                        me.rnh1=false;

                        if(me.edad >= 18 ){

                            me.narrativaHechos="<p><p><p>Esta representación social le da lectura y le explica los derechos que la Constitución Política de los Estados Unidos Mexicanos y el Código Nacional de Procedimientos Penales le concede al denunciante y/o víctima y le entrega la correspondiente acta de derechos. </p>"+
                                        "<br><br><b>FACULTAD DE ABSTENCIÓN </b><br><br>" +
                                        "<p>De igual forma se le hace saber que conforme a lo establecido en el artículo 361 del Código Nacional de Procedimientos Penales, podrá <strong>abstenerse de declarar</strong>, si es tutor, curador, pupilo, cónyuge, concubina o concubinario, conviviente del imputado, o "+
                                        "si ha vivido en forma permanente con él durante al menos dos años anteriores al hecho, de ser pariente por consanguinidad en la línea recta ascendente o descendente hasta el cuarto grado y en colateral por consanguinidad hasta el segundo grado inclusive, salvo que fuera "+
                                        "denunciante. Pero si acepta rendir su testimonio NO podrán negarse a contestar las preguntas que esta autoridad le formule. A lo que manifestó:<br> <span>*****************</span></p><br><br>"+
                                        "<p>A continuación, el compareciente hace del conocimiento de esta Representación social los siguientes hechos: <span>(texto libre)</span> (máximo 10 hojas)</p><br><br>"+
                                        "<p>Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello.</p>"
                        }else{
                            me.narrativaHechos=""+
                                        "<br><br><b>FACULTAD DE ABSTENCIÓN </b><br><br>" +
                                        "<p>De igual forma se le hace saber que conforme a lo establecido en el artículo 361 del Código Nacional de Procedimientos Penales, podrá <strong>abstenerse de declarar</strong>, si es tutor, curador, pupilo, cónyuge, concubina o concubinario, conviviente del imputado, o "+
                                        "si ha vivido en forma permanente con él durante al menos dos años anteriores al hecho, de ser pariente por consanguinidad en la línea recta ascendente o descendente hasta el cuarto grado y en colateral por consanguinidad hasta el segundo grado inclusive, salvo que fuera "+
                                        "denunciante. Pero si acepta rendir su testimonio NO podrán negarse a contestar las preguntas que esta autoridad le formule. A lo que manifestó:<br> <span>*****************</span></p><br><br>"+
                                        "En relación a lo hechos el(la) menor de identidad reservada de iniciales "+iniciales+", MANIFESTÓ:<br>"+
                                        "XXXXXX (Máximo 10 hojas).<br><br>"+
                                        "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo,los que no, se asienta razón de ello.<br><br><br><br>"+
                                        iniciales+"<br>"+
                                        "VÍCTIMA<br><br><br>"+
                                        "NOMBRE ACOMPAÑANTE VICTIMA<br>"+
                                        "PARENTESCO VICTIMA<br><br><br>"+
                                        "**************************<br>"+
                                        "Representante Coadyuvante de la la Procuraduría de Protección<br>"+
                                        "de niñas, niños, adolescente y la Familia de Hidalgo<br><br><br>"+
                                        "**************************<br>"+
                                        "Psicóloga adscrita a la Procuraduría de Protección<br>"+
                                        "de niñas, niños, adolescente y la Familia de Hidalgo<br><br><br>"

                        }
                    }
                    else{
                        me.rnh1=true;
                    }
                    me.listaracumulada();
                    me.listardireccionpersona();
                    me.listardireccionhecho();
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
            funcionprincipal(){
                let me = this;

                if(me.edad >= 18 && me.tvictima == "Imputado"){ //Si mi edad es mayor a 18 o igual y soy imputado, mando a llamar esa funcion, si no la condicion que sigue y asi
                    me.fila1 = '<p>En este acto, el (la) agente del Ministerio Público hace del conocimiento del imputado <strong>'+ this.nombre + '</strong>'+
                     ' que goza de los siguientes derechos establecidos en el <strong>Artículo 20 apartado B de la Constitución Política de los Estados Unidos Mexicanos:</strong> </p><br><br>'+
                     '<p class="ql-align-justify">I. A que se presuma su inocencia mientras no se declare su responsabilidad mediante sentencia emitida por el juez de la causa; '+
                     '</p><br><br><p>II. A declarar o a guardar silencio. Desde el momento de su detención se le harán saber los motivos de la misma y su derecho a guardar silencio, el cual no podrá ser utilizado en su perjuicio. Queda prohibida y será sancionada por la ley penal, toda incomunicación, intimidación o tortura. La confesión rendida sin la asistencia del defensor carecerá de todo valor probatorio;  '+
                     ' </p><br><br><p>'+
                     'III. A que se le informe, tanto en el momento de su detención como en su comparecencia ante el Ministerio Público o el juez, los hechos que se le imputan y los derechos que le asisten. Tratándose de delincuencia organizada, la autoridad judicial podrá autorizar que se mantenga en reserva el nombre y datos del acusador. La ley establecerá beneficios a favor del inculpado, procesado o sentenciado que preste ayuda eficaz para la investigación y persecución de delitos en materia de delincuencia organizada; '+
                     ' el Ministerio Público estará obligado a solicitar la reparación del daño, sin menoscabo de que la víctima u ofendido lo pueda solicitar directamente, y el juzgador no podrá absolver'+
                     ' </p><br><br><p>'+
                     'IV. Se le recibirán los testigos y demás pruebas pertinentes que ofrezca, concediéndosele el tiempo que la ley estime necesario al efecto y auxiliándosele para obtener la comparecencia de las personas cuyo testimonio solicite, en los términos que señale la ley'+
                     ' </p><br><br><p>'+
                     'V. Será juzgado en audiencia pública por un juez o tribunal. La publicidad sólo podrá restringirse en los casos de excepción que determine la ley, por razones de seguridad nacional, seguridad pública, protección de las víctimas, testigos y menores, cuando se ponga en riesgo la revelación de datos legalmente protegidos, o cuando el tribunal estime que existen razones fundadas para justificarlo. En delincuencia organizada, las actuaciones realizadas en la fase de investigación podrán tener valor probatorio, cuando no puedan ser reproducidas en juicio o exista riesgo para testigos o víctimas. Lo anterior sin perjuicio del derecho del inculpado de objetarlas o impugnarlas y aportar pruebas en contra; '+
                     ' </p><br><br><p>'+
                     'VI. Le serán facilitados todos los datos que solicité para su defensa y que consten en el proceso. El imputado y su defensor tendrán acceso a los registros de la investigación cuando el primero se encuentre detenido y cuando pretenda recibírsele declaración o entrevistarlo. Asimismo, antes de su primera comparecencia ante juez podrán consultar dichos registros, con la oportunidad debida para preparar la defensa. A partir de este momento no podrán mantenerse en reserva las actuaciones de la investigación, salvo los casos excepcionales expresamente señalados en la ley cuando ello sea imprescindible para salvaguardar el éxito de la investigación y siempre que sean oportunamente revelados para no afectar el derecho de defensa; '+
                     ' </p><br><br><p>'+
                     'VII. Será juzgado antes de cuatro meses si se tratare de delitos cuya pena máxima no exceda de dos años de prisión, y antes de un año si la pena excediere de ese tiempo, salvo que solicite mayor plazo para su defensa;'+
                     ' </p><br><br><p>'+
                     'VIII. Tendrá derecho a una defensa adecuada por abogado, al cual elegirá libremente incluso desde el momento de su detención. Si no quiere o no puede nombrar un abogado, después de haber sido requerido para hacerlo, el juez le designará un defensor público. También tendrá derecho a que su defensor comparezca en todos los actos del proceso y éste tendrá obligación de hacerlo cuantas veces se le requiera, '+
                     ' </p><br><br><p>'+
                     'IX. En ningún caso podrá prolongarse la prisión o detención, por falta de pago de honorarios de defensores o por cualquiera otra prestación de dinero, por causa de responsabilidad civil o algún otro motivo análogo. La prisión preventiva no podrá exceder del tiempo que como máximo de pena fije la ley al delito que motivare el proceso y en ningún caso será superior a dos años, salvo que su prolongación se deba al ejercicio del derecho de defensa del imputado. Si cumplido este término no se ha pronunciado sentencia, el imputado será puesto en libertad de inmediato mientras se sigue el proceso, sin que ello obste para imponer otras medidas cautelares. En toda pena de prisión que imponga una sentencia, se computará el tiempo de la detención.'+
                    ' </p><br><br><br><p>'+
                    'De igual forma se le hacen saber los derechos que le confiere el artículo 113 del Código Nacional de Procedimientos Penales:'+
                    ' </p><br><br><br><p>'+
                    'I. A ser considerado y tratado como inocente hasta que se demuestre su responsabilidad; '+
                    ' </p><br><p>'+
                    'II. A comunicarse con un familiar y con su Defensor cuando sea detenido, debiendo brindarle el Ministerio Público todas las facilidades para lograrlo; '+
                    ' </p><br><p>'+
                    'III. A declarar o a guardar silencio, en el entendido que su silencio no podrá ser utilizado en su perjuicio; '+
                    ' </p><br><p>'+
                    'IV. A estar asistido de su Defensor al momento de rendir su declaración, así como en cualquier otra actuación y a entrevistarse en privado previamente con él; '+
                    ' </p><br><p>'+
                    'V. A que se le informe, tanto en el momento de su detención como en su comparecencia ante el Ministerio Público o el Juez de control, los hechos que se le imputan y los derechos que le asisten, así como, en su caso, el motivo de la privación de su libertad y el servidor público que la ordenó, exhibiéndosele, según corresponda, la orden emitida en su contra; '+
                    ' </p><br><p>'+
                    'VI. A no ser sometido en ningún momento del procedimiento a técnicas ni métodos que atenten contra su dignidad, induzcan o alteren su libre voluntad; '+
                    ' </p><br><p>'+
                    'VII. A solicitar ante la autoridad judicial la modificación de la medida cautelar que se le haya impuesto, en los casos en que se encuentre en prisión preventiva, en los supuestos señalados por este Código; '+
                    ' </p><br><p>'+
                    'VIII. A tener acceso él y su defensa, salvo las excepciones previstas en la ley, a los registros de la investigación, así como a obtener copia gratuita, registro fotográfico o electrónico de los mismos, en términos de los artículos 218 y 219 de este Código. '+
                    ' </p><br><p>'+
                    'IX. A que se le reciban los medios pertinentes de prueba que ofrezca, concediéndosele el tiempo necesario para tal efecto y auxiliándosele para obtener la comparecencia de las personas cuyo testimonio solicite y que no pueda presentar directamente, en términos de lo establecido por este Código; '+
                    ' </p><br><p>'+
                    'X. A ser juzgado en audiencia por un Tribunal de enjuiciamiento, antes de cuatro meses si se tratare de delitos cuya pena máxima no exceda de dos años de prisión, y antes de un año si la pena excediere de ese tiempo, salvo que solicite mayor plazo para su defensa;'+
                    ' </p><br><p>'+
                    ' XI. A tener una defensa adecuada por parte de un licenciado en derecho o abogado titulado, con cédula profesional, al cual elegirá libremente incluso desde el momento de su detención y, a falta de éste, por el Defensor público que le corresponda, así como a reunirse o entrevistarse con él en estricta confidencialidad;'+
                    ' </p><br><p>'+
                    ' XII. A ser asistido gratuitamente por un traductor o intérprete en el caso de que no comprenda o hable el idioma español; cuando el imputado perteneciere a un pueblo o comunidad indígena, el Defensor deberá tener conocimiento de su lengua y cultura y, en caso de que no fuere posible, deberá actuar asistido de un intérprete de la cultura y lengua de que se trate; '+
                    ' </p><br><p>'+
                    'XIII. A ser presentado ante el Ministerio Público o ante el Juez de control, según el caso, inmediatamente después de ser detenido o aprehendido;'+
                    ' </p><br><p>'+
                    ' XIV. A no ser expuesto a los medios de comunicación; '+
                    ' </p><br><p>'+
                    'XV. A no ser presentado ante la comunidad como culpable'+
                    ' </p><br><p>'+
                    'XVI. A solicitar desde el momento de su detención, asistencia social para los menores de edad o personas con discapacidad cuyo cuidado personal tenga a su cargo; '+
                    ' </p><br><p>'+
                    'XVII. A obtener su libertad en el caso de que haya sido detenido, cuando no se ordene la prisión preventiva, u otra medida cautelar restrictiva de su libertad;'+
                    ' </p><br><p>'+
                    ' XVIII. A que se informe a la embajada o consulado que corresponda cuando sea detenido, y se le proporcione asistencia migratoria cuando tenga nacionalidad extranjera, y '+
                    ' </p><br><p>'+
                    'XIX. Los demás que establezca este Código y otras disposiciones aplicables. Los plazos a que se refiere la fracción X de este artículo, se contarán a partir de la audiencia inicial hasta el momento en que sea dictada la sentencia emitida por el Órgano jurisdiccional competente.'+
                    ' </p><br><p>'+
                    ' Cuando el imputado tenga a su cuidado menores de edad, personas con discapacidad, o adultos mayores que dependan de él, y no haya otra persona que pueda ejercer ese cuidado, el Ministerio Público deberá canalizarlos a instituciones de asistencia social que correspondan, a efecto de recibir la protección.'+
                    ' </p><br><br><br><p>'+
                    'En el caso de que se encuentre detenido el artículo 152 del Código Nacional de Procedimientos Penales le otorga los siguientes derechos:'+
                    ' </p><br><br><br><p>'+
                    'I. El derecho a informar a alguien de su detención; '+
                    ' </p><br><p>'+
                    'II. El derecho a consultar en privado con su Defensor;'+
                    ' </p><br><p>'+
                    ' III. El derecho a recibir una notificación escrita que establezca los derechos establecidos en las fracciones anteriores y las medidas que debe tomar para la obtención de asesoría legal;'+
                    ' </p><br><p>'+
                    'IV. El derecho a ser colocado en una celda en condiciones dignas y con acceso a aseo personal; '+
                    ' </p><br><p>'+
                    'V. El derecho a no estar detenido desnudo o en prendas íntimas;'+
                    ' </p><br><p>'+
                    'VI. Cuando, para los fines de la investigación sea necesario que el detenido entregue su ropa, se le proveerán prendas de vestir, y'+
                    ' </p><br><p>'+
                    'VII. El derecho a recibir atención clínica si padece una enfermedad física, se lesiona o parece estar sufriendo de un trastorno mental.'+
                    ' </p><br><br>'

                    me.fila2 = '<p>Una vez que me fueron leídos y explicados mis derechos, los comprendo y recibo una copia de los mismos, firmando al calce.</p><br><br><br><br>'+
                     '<strong><p>NOMBRE DEL IMPUTADO</p><br><br><p>'+ this.nombre + '</p><br><br><br><br>'+
                     '<p>A T E N T A M E N T E.</p><br><br><br>' + this.u_nombre + '<br><br>' + this.puestoquienregistro  + '<br><br>'  +  'Adscrito al ' + this.agenciainicial +"</strong>"
                    me.control = 1


                }else if(me.edad < 18 && me.tvictima == "Imputado"){
                    me.fila1 =  '<p>En este acto, el (la) agente del Ministerio Público hace del conocimiento del imputado <strong>'+ this.nombre + '</strong>'+
                     ' que goza de los siguientes derechos establecidos en el <strong>Artículo 20 apartado B de la Constitución Política de los Estados Unidos Mexicanos:</strong> </p><br><br>'+
                     ' </p><br><p>'+
                     'I. A que se presuma su inocencia mientras no se declare su responsabilidad mediante sentencia emitida por el juez de la causa;'+
                     ' </p><br><p>'+
                     'II. A declarar o a guardar silencio. Desde el momento de su detención se le harán saber los motivos de la misma y su derecho a guardar silencio, el cual no podrá ser utilizado en su perjuicio. Queda prohibida y será sancionada por la ley penal, toda incomunicación, intimidación o tortura. La confesión rendida sin la asistencia del defensor carecerá de todo valor probatorio; '+
                     ' </p><br><p>'+
                     'III. A que se le informe, tanto en el momento de su detención como en su comparecencia ante el Ministerio Público o el juez, los hechos que se le imputan y los derechos que le asisten. Tratándose de delincuencia organizada, la autoridad judicial podrá autorizar que se mantenga en reserva el nombre y datos del acusador. La ley establecerá beneficios a favor del inculpado, procesado o sentenciado que preste ayuda eficaz para la investigación y persecución de delitos en materia de delincuencia organizada; '+
                     ' </p><br><p>'+
                     'IV. Se le recibirán los testigos y demás pruebas pertinentes que ofrezca, concediéndosele el tiempo que la ley estime necesario al efecto y auxiliándosele para obtener la comparecencia de las personas cuyo testimonio solicite, en los términos que señale la ley'+
                     ' </p><br><p>'+
                     ' V. Será juzgado en audiencia pública por un juez o tribunal. La publicidad sólo podrá restringirse en los casos de excepción que determine la ley, por razones de seguridad nacional, seguridad pública, protección de las víctimas, testigos y menores, cuando se ponga en riesgo la revelación de datos legalmente protegidos, o cuando el tribunal estime que existen razones fundadas para justificarlo. En delincuencia organizada, las actuaciones realizadas en la fase de investigación podrán tener valor probatorio, cuando no puedan ser reproducidas en juicio o exista riesgo para testigos o víctimas. Lo anterior sin perjuicio del derecho del inculpado de objetarlas o impugnarlas y aportar pruebas en contra; '+
                     ' </p><br><p>'+
                     'VI. Le serán facilitados todos los datos que solicité para su defensa y que consten en el proceso. El imputado y su defensor tendrán acceso a los registros de la investigación cuando el primero se encuentre detenido y cuando pretenda recibírsele declaración o entrevistarlo. Asimismo, antes de su primera comparecencia ante juez podrán consultar dichos registros, con la oportunidad debida para preparar la defensa. A partir de este momento no podrán mantenerse en reserva las actuaciones de la investigación, salvo los casos excepcionales expresamente señalados en la ley cuando ello sea imprescindible para salvaguardar el éxito de la investigación y siempre que sean oportunamente revelados para no afectar el derecho de defensa; '+
                     ' </p><br><p>'+
                     'VII. Será juzgado antes de cuatro meses si se tratare de delitos cuya pena máxima no exceda de dos años de prisión, y antes de un año si la pena excediere de ese tiempo, salvo que solicite mayor plazo para su defensa;'+
                     ' </p><br><p>'+
                     'VIII. Tendrá derecho a una defensa adecuada por abogado, al cual elegirá libremente incluso desde el momento de su detención. Si no quiere o no puede nombrar un abogado, después de haber sido requerido para hacerlo, el juez le designará un defensor público. También tendrá derecho a que su defensor comparezca en todos los actos del proceso y éste tendrá obligación de hacerlo cuantas veces se le requiera, y '+
                     ' </p><br><p>'+
                     'IX. En ningún caso podrá prolongarse la prisión o detención, por falta de pago de honorarios de defensores o por cualquiera otra prestación de dinero, por causa de responsabilidad civil o algún otro motivo análogo. La prisión preventiva no podrá exceder del tiempo que como máximo de pena fije la ley al delito que motivare el proceso y en ningún caso será superior a dos años, salvo que su prolongación se deba al ejercicio del derecho de defensa del imputado. Si cumplido este término no se ha pronunciado sentencia, el imputado será puesto en libertad de inmediato mientras se sigue el proceso, sin que ello obste para imponer otras medidas cautelares. En toda pena de prisión que imponga una sentencia, se computará el tiempo de la detención.'+
                     ' </p><br><br><p>'+
                     'De igual forma se le hacen saber los derechos que le confiere el artículo 113 del Código Nacional de Procedimientos Penales:'+
                     ' </p><br><br><p>'+
                     'I. A ser considerado y tratado como inocente hasta que se demuestre su responsabilidad; '+
                     ' </p><br><p>'+
                     'II. A comunicarse con un familiar y con su Defensor cuando sea detenido, debiendo brindarle el Ministerio Público todas las facilidades para lograrlo; '+
                     ' </p><br><p>'+
                     'III. A declarar o a guardar silencio, en el entendido que su silencio no podrá ser utilizado en su perjuicio; '+
                     ' </p><br><p>'+
                     'IV. A estar asistido de su Defensor al momento de rendir su declaración, así como en cualquier otra actuación y a entrevistarse en privado previamente con él; '+
                     ' </p><br><p>'+
                     'V. A que se le informe, tanto en el momento de su detención como en su comparecencia ante el Ministerio Público o el Juez de control, los hechos que se le imputan y los derechos que le asisten, así como, en su caso, el motivo de la privación de su libertad y el servidor público que la ordenó, exhibiéndosele, según corresponda, la orden emitida en su contra; '+
                     ' </p><br><p>'+
                     'VI. A no ser sometido en ningún momento del procedimiento a técnicas ni métodos que atenten contra su dignidad, induzcan o alteren su libre voluntad; '+
                     ' </p><br><p>'+
                     'VII. A solicitar ante la autoridad judicial la modificación de la medida cautelar que se le haya impuesto, en los casos en que se encuentre en prisión preventiva, en los supuestos señalados por este Código; '+
                     ' </p><br><p>'+
                     'VIII. A tener acceso él y su defensa, salvo las excepciones previstas en la ley, a los registros de la investigación, así como a obtener copia gratuita, registro fotográfico o electrónico de los mismos, en términos de los artículos 218 y 219 de este Código. '+
                     ' </p><br><p>'+
                     'IX. A que se le reciban los medios pertinentes de prueba que ofrezca, concediéndosele el tiempo necesario para tal efecto y auxiliándosele para obtener la comparecencia de las personas cuyo testimonio solicite y que no pueda presentar directamente, en términos de lo establecido por este Código; '+
                     ' </p><br><p>'+
                     'X. A ser juzgado en audiencia por un Tribunal de enjuiciamiento, antes de cuatro meses si se tratare de delitos cuya pena máxima no exceda de dos años de prisión, y antes de un año si la pena excediere de ese tiempo, salvo que solicite mayor plazo para su defensa;'+
                     ' </p><br><p>'+
                     ' XI. A tener una defensa adecuada por parte de un licenciado en derecho o abogado titulado, con cédula profesional, al cual elegirá libremente incluso desde el momento de su detención y, a falta de éste, por el Defensor público que le corresponda, así como a reunirse o entrevistarse con él en estricta confidencialidad;'+
                     ' </p><br><p>'+
                     ' XII. A ser asistido gratuitamente por un traductor o intérprete en el caso de que no comprenda o hable el idioma español; cuando el imputado perteneciere a un pueblo o comunidad indígena, el Defensor deberá tener conocimiento de su lengua y cultura y, en caso de que no fuere posible, deberá actuar asistido de un intérprete de la cultura y lengua de que se trate; '+
                     ' </p><br><p>'+
                     'XIII. A ser presentado ante el Ministerio Público o ante el Juez de control, según el caso, inmediatamente después de ser detenido o aprehendido;'+
                     ' </p><br><p>'+
                     ' XIV. A no ser expuesto a los medios de comunicación; '+
                     ' </p><br><p>'+
                     'XV. A no ser presentado ante la comunidad como culpable'+
                     ' </p><br><p>'+
                     'XVI. A solicitar desde el momento de su detención, asistencia social para los menores de edad o personas con discapacidad cuyo cuidado personal tenga a su cargo; '+
                     ' </p><br><p>'+
                     'XVII. A obtener su libertad en el caso de que haya sido detenido, cuando no se ordene la prisión preventiva, u otra medida cautelar restrictiva de su libertad;'+
                     ' </p><br><p>'+
                     ' XVIII. A que se informe a la embajada o consulado que corresponda cuando sea detenido, y se le proporcione asistencia migratoria cuando tenga nacionalidad extranjera, y '+
                     ' </p><br><p>'+
                     'XIX. Los demás que establezca este Código y otras disposiciones aplicables. Los plazos a que se refiere la fracción X de este artículo, se contarán a partir de la audiencia inicial hasta el momento en que sea dictada la sentencia emitida por el Órgano jurisdiccional competente.'+
                     ' </p><br><p>'+
                     ' Cuando el imputado tenga a su cuidado menores de edad, personas con discapacidad, o adultos mayores que dependan de él, y no haya otra persona que pueda ejercer ese cuidado, el Ministerio Público deberá canalizarlos a instituciones de asistencia social que correspondan, a efecto de recibir la protección.'+
                     ' </p><br><br><p>'+
                     'En el caso de que se encuentre detenido el artículo 152 del Código Nacional de Procedimientos Penales le otorga los siguientes derechos:'+
                     ' </p><br><br><p>'+
                     'I. El derecho a informar a alguien de su detención; '+
                     ' </p><br><p>'+
                     'II. El derecho a consultar en privado con su Defensor;'+
                     ' </p><br><p>'+
                     ' III. El derecho a recibir una notificación escrita que establezca los derechos establecidos en las fracciones anteriores y las medidas que debe tomar para la obtención de asesoría legal;'+
                     ' </p><br><p>'+
                     'IV. El derecho a ser colocado en una celda en condiciones dignas y con acceso a aseo personal; '+
                     ' </p><br><p>'+
                     'V. El derecho a no estar detenido desnudo o en prendas íntimas;'+
                     ' </p><br><p>'+
                     'VI. Cuando, para los fines de la investigación sea necesario que el detenido entregue su ropa, se le proveerán prendas de vestir, y'+
                     ' </p><br><p>'+
                     'VII. El derecho a recibir atención clínica si padece una enfermedad física, se lesiona o parece estar sufriendo de un trastorno mental.'+
                     ' </p><br><br>'
                     me.fila2 =  '<p> <strong>LEY DE  NACIONAL  DEL SISTEMA INTEGRAL DE JUSTICIA PARA ADOLESCNETES </strong></p>'+
                     ' </p><br><br><p>'+
                     '<p> <strong>CAPÍTULO II </strong></p>'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 13. Protección integral de los derechos de la persona adolescente </strong></p>'+
                     ' </p><br><br><p>'+
                     'Las personas adolescentes gozan de todos los derechos humanos inherentes a las personas. Les serán garantizadas las oportunidades y facilidades, a fin de asegurarles las mejores condiciones para su desarrollo físico, psicológico y social, en condiciones de dignidad.'+
                     ' </p><br><br><p>'+
                     'Todas las autoridades del Sistema deberán respetar, proteger y garantizar los derechos de las personas adolescentes mientras se encuentren sujetas al mismo.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 14. Integralidad, indivisibilidad e interdependencia de los derechos de las personas adolescentes</strong></p>'+
                     ' </p><br><br><p>'+
                     'Los derechos de las personas adolescentes son indivisibles y guardan interdependencia unos con otrosy sólo podrán considerarse garantizados en razón de su integralidad.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 15. Prohibición de tortura y otros tratos o penas crueles, inhumanos o degradantes </strong></p>'+
                     ' </p><br><br><p>'+
                     'Estarán prohibidos todos los actos que constituyan tortura y otros tratos o penas crueles, inhumanoso o degradantes.'+
                     ' </p><br><br><p>'+
                     'Las autoridades, dentro de sus respectivos ámbitos de competencia, deberán garantizar la seguridad física, mental y emocional de las personas adolescentes.'+
                     ' </p><br><br><p>'+
                     'Quedan prohibidos los castigos corporales, la reclusión en celda oscura y las penas de aislamiento o de celda solitaria, así como cualquier otra sanción o medida disciplinaria contraria a los derechos humanos de la persona adolescente.'+
                     ' </p><br><br><p>'+
                     'No podrá ser sancionada ninguna persona adolescente más de una vez por el mismo hecho. Quedan prohibidas las sanciones colectivas.'+
                     ' </p><br><br><p>'+
                    '<p> <strong>Artículo 16. No Discriminación e igualdad sustantiva </strong></p>'+
                     ' </p><br><br><p>'+
                     'Los derechos y garantías reconocidos en esta Ley se aplicarán a quienes se les atribuya o compruebe la realización de uno o varios hechos señalados como delitos por las leyes penales federales y locales mientras eran adolescentes, sin que se admita discriminación motivada por origen étnico o nacional, género, edad, discapacidad, condición social, condición de salud, religión, opinión, preferencia sexual, identidad de género, estado civil o cualquier otra, ya sea de la persona adolescente o de quienes ejercen sobre ellas la patria potestad o tutela, que atenten contra su dignidad humana.'+
                     ' </p><br><br><p>'+
                     'Se entiende por igualdad sustantiva el acceso al mismo trato y oportunidades para el reconocimiento, goce o ejercicio de los derechos humanos y las libertades fundamentales.'+
                     ' </p><br><br><p>'+
                     'Las autoridades del sistema velarán por que todas las personas adolescentes sean atendidas teniendo en cuenta sus características, condiciones específicas y necesidades especiales a fin de garantizar el ejercicio de sus derechos sobre la base de la igualdad sustantiva.'+
                     ' </p><br><br><p>'+
                     'Durante el procedimiento, determinación de la medida o sanción y ejecución de la que corresponda, se respetará a la persona adolescente en sus creencias, su religión y sus pautas culturales y éticas.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 17. Aplicación favorable </strong></p>'+
                     ' </p><br><br><p>'+
                     'En ningún caso se podrán imponer a las personas adolescentes medidas más graves ni de mayor duración a las que corresponderían por los mismos hechos a un adulto, ni gozar de menos derechos, prerrogativas o beneficios que se le concedan a estos. De igual forma, bajo ninguna circunstancia se establecerán restricciones en los procesos de solución de conflictos que perjudiquen en mayor medida a la persona adolescente que al adulto.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 18. Mínima intervención y subsidiariedad</strong></p>'+
                     ' </p><br><br><p>'+
                     'La solución de controversias en los que esté involucrada alguna persona adolescente se hará prioritariamente sin recurrir a procedimientos judiciales, con pleno respeto a sus derechos humanos. Se privilegiará el uso de soluciones alternas en términos de esta Ley, el Código Nacional y la Ley de Mecanismos Alternativos.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 19. Autonomía progresiva</strong></p>'+
                     ' </p><br><br><p>'+
                     'Todas las autoridades del sistema deben hacer el reconocimiento pleno de la titularidad de derechos de las personas adolescentes y de su capacidad progresiva para ejercerlos, de acuerdo a la evolución de sus facultades, lo cual significa que a medida que aumenta la edad también se incrementa el nivel de autonomía.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 20. Responsabilidad</strong></p>'+
                     ' </p><br><br><p>'+
                     'La responsabilidad de la persona adolescente se fincará sobre la base del principio de culpabilidad por el acto. No admitirá, en su perjuicio y bajo ninguna circunstancia, consideraciones acerca de la personalidad, vulnerabilidad biológica, temibilidad, peligrosidad, ni de cualquier otra que se funde en circunstancias personales de la persona adolescente imputada.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 21. Justicia Restaurativa</strong></p>'+
                     ' </p><br><br><p>'+
                     'El principio de justicia restaurativa es una respuesta a la conducta que la ley señala como delito, que respeta la dignidad de cada persona, que construye comprensión y promueve armonía social a través de la restauración de la víctima u ofendido, la persona adolescente y la comunidad. Este principio puede desarrollarse de manera individual para las personas mencionadas y sus respectivos entornos y, en la medida de lo posible, entre ellos mismos, a fin de reparar el daño, comprender el origen del conflicto, sus causas y consecuencias.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 22. Principios generales del procedimiento</strong></p>'+
                     ' </p><br><br><p>'+
                     'El Sistema estará basado en un proceso acusatorio y oral en el que se observarán los principios de publicidad, contradicción, concentración, continuidad e inmediación con las adecuaciones y excepciones propias del sistema especializado.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 23. Especialización</strong></p>'+
                     ' </p><br><br><p>'+
                     'Todas las autoridades del Sistema deberán estar formadas, capacitadas y especializadas en materia de justicia para adolescentes en el ámbito de sus atribuciones.'+
                     ' </p><br><br><p>'+
                     'Las instituciones u órganos que intervengan en la operación del Sistema, deberán proveer la formación, capacitación y actualización específica a sus servidores públicos, de acuerdo a su grado de intervención en las diferentes fases o etapas de dicho Sistema, por lo que incluirán lo anterior en sus programas de capacitación, actualización y/o de formación correspondientes.'+
                     ' </p><br><br><p>'+
                     'Asimismo, deberán conocer los fines del Sistema Integral de Justicia Penal para Adolescentes, la importancia de sus fases, particularmente de las condiciones que motivan que las personas sujetas a esta Ley cometan o participen en hechos señalados como delitos por las leyes penales y las circunstancias de la etapa correspondiente a la adolescencia.'+
                     ' </p><br><br><p>'+
                     'Desde el inicio del procedimiento, todas las actuaciones y diligencias estarán a cargo de órganos especializados en el Sistema, en los términos de esta Ley.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 24. Legalidad</strong></p>'+
                     ' </p><br><br><p>'+
                     'Ninguna persona adolescente puede ser procesada ni sometida a medida alguna por actos u omisiones que, al tiempo de su ocurrencia, no estén previamente definidos de manera expresa como delitos en las leyes penales aplicables.'+
                     ' </p><br><br><p>'+
                     'La responsabilidad penal de una persona adolescente solamente podrá determinarse seguido el procedimiento establecido en la presente Ley. En caso de comprobarse la responsabilidad de la persona adolescente, el Órgano Jurisdiccional únicamente podrá sancionarla a cumplir las medidas de sanción señaladas en la presente Ley, conforme a las reglas y criterios establecidos para su determinación.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 25. Ley más favorable</strong></p>'+
                     ' </p><br><br><p>'+
                     'Cuando una misma situación relacionada con personas adolescentes, se encuentre regulada por leyes o normas diversas, siempre se optará por la que resulte más favorable a sus derechos, o a la interpretación más garantista que se haga de las mismas.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 26. Presunción de inocencia</strong></p>'+
                     ' </p><br><br><p>'+
                     'Toda persona adolescente debe ser considerada y tratada como inocente en todas las etapas del procedimiento mientras no se declare su responsabilidad mediante sentencia firme emitida por Órgano Jurisdiccional, en los términos señalados en esta Ley.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 27. Racionalidad y proporcionalidad de las medidas cautelares y de sanción</strong></p>'+
                     ' </p><br><br><p>'+
                     'Las medidas cautelares y de sanción que se impongan a las personas adolescentes deben corresponder a la afectación causada por la conducta, tomando en cuenta las circunstancias personales de la persona adolescente, siempre en su beneficio.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 28. Reintegración social y familiar de la persona adolescente</strong></p>'+
                     ' </p><br><br><p>'+
                     'La reintegración social y familiar es un proceso integral que se debe desarrollar durante la ejecución de la medida de sanción, cuyo objeto es garantizar el ejercicio de los derechos de la persona adolescente encontrada responsable de la comisión de un delito.'+
                     ' </p><br><br><p>'+
                     'La reintegración se llevará a través de diversos programas socioeducativos de intervención destinados a incidir en los factores internos y externos, en los ámbitos familiar, escolar, laboral y comunitario de la persona adolescente para que genere capacidades y competencias que le permitan reducir la posibilidad de reincidencia y adquirir una función constructiva en la sociedad.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 29. Reinserción social</strong></p>'+
                     ' </p><br><br><p>'+
                     'Restitución del pleno ejercicio de los derechos y libertades tras el cumplimiento de las medidas ejecutadas con respeto a los derechos humanos de la persona adolescente.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 30. Carácter socioeducativo de las medidas de sanción</strong></p>'+
                     ' </p><br><br><p>'+
                     'Las medidas de sanción tendrán un carácter socioeducativo, promoverán la formación de la persona adolescente, el respeto por los derechos humanos y las libertades fundamentales, el fomento de vínculos socialmente positivos y el pleno desarrollo de su personalidad y de sus capacidades.'+
                     ' </p><br><br><p>'+
                     'En la ejecución de las medidas de sanción se deberá procurar que la persona adolescente se inserte en su familia y en la sociedad, mediante el pleno desarrollo de sus capacidades y su sentido de la responsabilidad.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 31. Medidas de privación de la libertad como medida extrema y por el menor tiempo posible </strong></p>'+
                     ' </p><br><br><p>'+
                     'Las medidas de privación de la libertad se utilizarán como medida extrema y excepcional, sólo se podrán imponer a personas adolescentes mayores de catorce años, por los hechos constitutivos de delito que esta Ley señala, por un tiempo determinado y la duración más breve que proceda.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 32. Publicidad</strong></p>'+
                     ' </p><br><br><p>'+
                     'Todas las audiencias que se celebren durante el procedimiento y la ejecución de medidas se realizarán a puerta cerrada, salvo que la persona adolescente solicite al Órgano Jurisdiccional que sean públicas, previa consulta con su defensor. El Órgano Jurisdiccional debe asegurarse que el consentimiento otorgado por la persona adolescente, respecto a la publicidad de las audiencias, sea informado. '+
                     ' </p><br><br><p>'+
                     'No vulnera el principio de publicidad de las personas adolescentes, la expedición de audio y video de las audiencias a favor de las partes en el procedimiento, teniendo la prohibición de divulgar su contenido al público. '+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 33. Celeridad procesal</strong></p>'+
                    ' </p><br><br><p>'+
                    'Los procesos en los que están involucradas personas adolescentes se realizarán sin demora y con la mínima duración posible, por lo que las autoridades y órganos operadores del Sistema, deberán ejercer sus funciones y atender las solicitudes de los interesados con prontitud y eficacia, sin causar dilaciones injustificadas, siempre que no afecte el derecho de defensa.'+
                    ' </p><br><br><p>'+
                    '<p> <strong>CAPÍTULO II </strong></p>'+
                    ' </p><br><br><p>'+
                    '<p> <strong>DERECHOS Y DEBERES DE LAS PERSONAS ADOLESCENTES</strong></p>'+
                    ' </p><br><br><p>'+
                    '<p> <strong>Artículo 34. Enunciación no limitativa</strong></p>'+
                    ' </p><br><br><p>'+
                    'Los derechos de las personas adolescentes previstos en la presente Ley son de carácter enunciativo y deberán ser interpretados de conformidad con lo dispuesto en la Constitución, en los Tratados Internacionales de los que el Estado mexicano sea parte y las leyes aplicables en la materia, favoreciendo en todo tiempo la protección más amplia de sus derechos.'+
                    ' </p><br><br><p>'+
                    '<p> <strong>SECCIÓN PRIMERA</strong></p>'+
                    ' </p><br><br><p>'+
                    '<p> <strong>DERECHOS DE LAS PERSONAS ADOLESCENTES SUJETAS AL SISTEMA</strong></p>'+
                    ' </p><br><br><p>'+
                    '<p> <strong>Artículo 35. Protección a la intimidad</strong></p>'+
                    ' </p><br><br><p>'+
                    'La persona adolescente tendrá derecho a que durante todo el procedimiento y la ejecución de las medidas se respete su derecho a la intimidad personal y familiar, evitando cualquier intromisión indebida a su vida privada o a la de su familia. Las autoridades protegerán la información que se refiera a su vida privada, la de su familia y sus datos personales.'+
                    ' </p><br><br><p>'+
                    '<p> <strong>Artículo 36. Confidencialidad y Privacidad</strong></p>'+
                    ' </p><br><br><p>'+
                    'En todas las etapas del proceso y durante la ejecución de las medidas de sanción las autoridades del Sistema garantizarán la protección del derecho de las personas adolescentes a la confidencialidad y privacidad a sus datos personales y familiares.'+
                    ' </p><br><br><p>'+
                    'Desde el inicio de la investigación o el proceso las policías, el Ministerio Público o el Órgano Jurisdiccional, informarán de esta prohibición a quienes intervengan o asistan al proceso y, en su caso, a los medios de comunicación.'+
                    ' </p><br><br><p>'+
                    'Si la información que permite la identificación de la persona adolescente investigado, procesado o sancionado, fuera divulgada por funcionarios públicos, se aplicarán las penas señaladas para el tipo penal básico del delito contra la administración de justicia, cometidos por servidores públicos.'+
                    ' </p><br><br><p>'+
                    'En caso de los medios de comunicación, se aplicarán las sanciones previstas en el artículo 149 de la Ley General y se exigirá la retractación de la misma forma en que se hubiere dado publicidad de la información sobre la persona adolescente investigado, procesado o sancionado.'+
                    ' </p><br><br><p>'+
                    '<p> <strong>Artículo 37. Registro de procesos</strong></p>'+
                    ' </p><br><br><p>'+
                    'Los antecedentes y registros relacionados con personas adolescentes sometidas a proceso o sancionadas conforme a esta Ley en ningún caso podrán ser utilizados en contra de la misma persona, en otro juicio derivado de hechos diferentes.'+
                    ' </p><br><br><p>'+
                    'Si la persona adolescente fuere absuelta mediante sentencia firme, el registro y los antecedentes se destruirán transcurridos tres meses contados desde que la sentencia quede firme. Antes del vencimiento de este plazo, la persona adolescente o su defensor podrán solicitar que estos registros se conserven íntegramente, cuando consideren que su conservación sea en su beneficio. Si el caso se resuelve mediante una salida alterna, los registros relacionados se destruirán dos años después de haberse cumplido con el acuerdo reparatorio o el plan de reparación de la suspensión condicional del procedimiento.'+
                    ' </p><br><br><p>'+
                    'Pasados tres años del cumplimiento de la medida de sanción impuesta o extinguida la acción penal por las causales previstas en esta Ley, se destruirán todos los registros vinculados con el proceso legal.'+
                    ' </p><br><br><p>'+
                    'No obstante lo dispuesto en esta norma, los registros que contengan la sentencia se preservarán, salvaguardando, en todo caso, la información sobre los datos personales de las partes, peritos y testigos  en el proceso. '+
                    ' </p><br><br><p>'+
                    '<p> <strong>Artículo 38. Garantías de la detención</strong></p>'+
                    ' </p><br><br><p>'+
                    'Toda persona adolescente deberá ser presentada inmediatamente ante el Ministerio Público o el Juez de Control especializados dentro de los plazos que establece esta Ley, garantizando sus derechos y seguridad.'+
                    ' </p><br><br><p>'+
                    'Desde el momento de su detención se asegurará que las personas adolescentes permanezcan en lugares distintos a los adultos.'+
                    ' </p><br><br><p>'+
                    'En todos los casos habrá un registro inmediato de la detención.'+
                    ' </p><br><br><p>'+
                    '<p> <strong>Artículo 39. Prohibición de incomunicación</strong></p>'+
                    ' </p><br><br><p>'+
                    'Toda persona adolescente tiene derecho a establecer una comunicación efectiva, por vía telefónica o por cualquier otro medio disponible, inmediatamente luego de ser detenida, con sus familiares, su defensor o con la persona o agrupación a quien desee informar sobre su detención o privación de libertad. '+
                    ' </p><br><br><p>'+
                    'Durante la ejecución de las medidas queda prohibido imponer como medida disciplinaria la incomunicación a cualquier persona adolescente.'+
                    ' </p><br><br><p>'+
                    '<p> <strong>Artículo 40. Información a las personas adolescentes</strong></p>'+
                     ' </p><br><br><p>'+
                     'Toda persona adolescente tiene derecho a ser informada sobre las razones por las que se le detiene, acusa, juzga o impone una medida; el nombre de la persona que le atribuye la realización del hecho señalado como delito; las consecuencias de la atribución del hecho; los derechos y garantías que le asisten y el derecho a disponer de una defensa jurídica gratuita.'+
                     ' </p><br><br><p>'+
                     'La información deberá ser proporcionada en un lenguaje claro, sencillo, comprensible y sin demora, de manera personal y en presencia de la o las personas responsables de la persona adolescente, de su representante legal o de la persona que el adolescente haya designado como de su confianza.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 41. Defensa técnica especializada </strong></p>'+
                     ' </p><br><br><p>'+
                     'Todo adolescente tiene derecho a ser asistido por un licenciado en derecho, con cédula profesional y especializado en el Sistema, en todas las etapas del procedimiento, desde su detención hasta el fin de la ejecución de la medida impuesta.'+
                     ' </p><br><br><p>'+
                     'En caso de que no elija a su propio defensor, el Ministerio Público o el Órgano Jurisdiccional le designará defensor público desde el primer acto del procedimiento. El Órgano Jurisdiccional debe velar por que la persona adolescente goce de defensa técnica y adecuada.'+
                     ' </p><br><br><p>'+
                     'En caso de ser indígenas, extranjeros, tengan alguna discapacidad o no sepan leer ni escribir, la persona adolescente será asistido de oficio y en todos los actos procesales por un defensor que comprenda plenamente su idioma, lengua, dialecto y cultura; o bien, de ser necesario, su defensor será auxiliado por un traductor o intérprete asignado por la autoridad correspondiente o designado por la propia persona adolescente. Cuando este último alegue ser indígena, se tendrá como cierta su sola manifestación.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 42. Presencia y acompañamiento de la persona responsable o por persona en quien confíe</strong></p>'+
                     ' </p><br><br><p>'+
                     'La persona responsable de la o el adolescente, o la persona de su confianza podrán estar presentes durante el procedimiento y durante las audiencias de ejecución. Éstos tendrán derecho a estar presentes en las actuaciones y quienes imparten justicia podrán requerir su presencia en defensa de las personas adolescentes. Este acompañamiento será considerado como una asistencia general a la persona adolescente, de naturaleza psicológica y emotiva, que debe extenderse a lo largo de todo el procedimiento.'+
                     ' </p><br><br><p>'+
                     'Dicho acompañamiento podrá ser denegado por la autoridad jurisdiccional competente cuando existan motivos fundados para presumir que la exclusión es necesaria en defensa de la persona adolescente.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 43. Derecho a ser escuchado</strong></p>'+
                     ' </p><br><br><p>'+
                     'Toda persona adolescente tiene derecho a ser escuchada y tomada en cuenta directamente en cualquier etapa del procedimiento, tomando en consideración su edad, estado de desarrollo evolutivo, cognoscitivo y madurez.'+
                     ' </p><br><br><p>'+
                     'La persona adolescente que no comprenda, ni pueda darse a entender en español, deberá ser provista de un traductor o intérprete a fin de que pueda expresarse en su propia lengua.'+
                     ' </p><br><br><p>'+
                     'Si se trata de una persona adolescente con discapacidad se le nombrará intérprete idóneo que garantice la comunicación efectiva.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 44. Ajustes razonables al procedimiento</strong></p>'+
                     ' </p><br><br><p>'+
                     'En caso de que la persona adolescente tenga alguna discapacidad podrá solicitar por sí o por medio de su defensor, un ajuste razonable al procedimiento para asegurar su efectiva y plena participación.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 45. Abstención de declarar</strong></p>'+
                     ' </p><br><br><p>'+
                     'Toda persona adolescente tiene derecho a abstenerse de declarar y a no incriminarse a sí misma. Su silencio no puede ser valorado en su contra.'+
                     ' </p><br><br><p>'+
                     'Si una persona adolescente, después de haberlo consultado con su defensa, quisiera hacer uso de su derecho a declarar, únicamente podrá hacerlo en presencia del Órgano Jurisdiccional competente y con la presencia de su defensa. En ningún caso se le exigirá protesta de decir verdad'+
                     ' </p><br><br><p>'+
                     'Una vez que me fueron leídos y explicados mis derechos, los comprendo y recibo una copia de los mismos.'+
                     ' </p><br><br><br><br>'+
                    '<strong><p>NOMBRE DEL IMPUTADO</p><br><br><p>'+ this.nombre + '</p><br><br><br><br>'+
                     '<p>A T E N T A M E N T E.</p><br><br><br>' + this.u_nombre + '<br><br>' + this.puestoquienregistro  + '<br><br>'  +  'Adscrito al ' + this.agenciainicial +"</strong>"
                      me.control = 2


                }else if(me.edad < 18 && (me.tvictima == "Victima directa" || me.tvictima == "Victima indirecta")){

                    me.fila1 = '<p>En este acto, el(la) Agente del Ministerio Público hace saber a la víctima (s) u ofendido (s) C. <strong>'+ this.nombre + '</strong>'+
                     ' que el <strong>Artículo 20 apartado C de la Constitución Política de los Estados Unidos Mexicanos </strong> le otorga los siguientes derechos:</p><br><br>'+
                     ' </p><br><p>'+
                     'I. Recibir asesoría jurídica; ser informado de los derechos que en su favor establece la Constitución y, cuando lo solicite, ser informado del desarrollo del procedimiento penal; '+
                     ' </p><br><p>'+
                     'II. Coadyuvar con el Ministerio Público; a que se le reciban todos los datos o elementos de prueba con los que cuente, tanto en la investigación como en el proceso, a que se desahoguen las diligencias correspondientes, y a intervenir en el juicio e interponer los recursos en los términos que prevea la ley. Cuando el Ministerio Público considere que no es necesario el desahogo de la diligencia, deberá fundar y motivar su negativa; '+
                     ' </p><br><p>'+
                     'III. Recibir, desde la comisión del delito, atención médica y psicológica de urgencia; '+
                     ' </p><br><p>'+
                     'IV. Que se le repare el daño. En los casos en que sea procedente, el Ministerio Público estará obligado a solicitar la reparación del daño, sin menoscabo de que la víctima u ofendido lo pueda solicitar directamente, y el juzgador no podrá absolver al sentenciado de dicha reparación si ha emitido una sentencia condenatoria. La ley fijará procedimientos ágiles para ejecutar las sentencias en materia de reparación del daño; '+
                     ' </p><br><p>'+
                     'V. Al resguardo de su identidad y otros datos personales en los siguientes casos: cuando sean menores de edad; cuando se trate de delitos de violación, trata de personas, secuestro o delincuencia organizada; y cuando a juicio del juzgador sea necesario para su protección, salvaguardando en todo caso los derechos de la defensa. El Ministerio Público deberá garantizar la protección de víctimas, ofendidos, testigos y en general todos los sujetos que intervengan en el proceso. Los jueces deberán vigilar el buen cumplimiento de esta obligación; '+
                     ' </p><br><p>'+
                     'VI. Solicitar las medidas cautelares y providencias necesarias para la protección y restitución de sus derechos, y '+
                     ' </p><br><p>'+
                     'VII. Impugnar ante autoridad judicial las omisiones del Ministerio Público en la investigación de los delitos, así como las resoluciones de reserva, no ejercicio, desistimiento de la acción penal o suspensión del procedimiento cuando no esté satisfecha la reparación del daño.'+
                     ' </p><br><br><br><p>'
                     me.fila2 =  '<p>De igual forma se le hace saber que el artículo <strong>109 del Código Nacional de Procedimientos Penales </strong>'+
                     ' le otorga los siguientes derechos:'+
                     ' </p><br><br><p>'+
                     'I. A ser informado de los derechos que en su favor le reconoce la Constitución; '+
                     ' </p><br><p>'+
                     'II. A que el Ministerio Público y sus auxiliares, así como el Órgano jurisdiccional le faciliten el acceso a la justicia y les presten los servicios que constitucionalmente tienen encomendados con legalidad, honradez, lealtad, imparcialidad, profesionalismo, eficiencia y eficacia y con la debida diligencia;'+
                     ' </p><br><p>'+
                     'III. A contar con información sobre los derechos que en su beneficio existan, como ser atendidos por personal del mismo sexo, o del sexo que la víctima elija, cuando así lo requieran y recibir desde la comisión del delito atención médica y psicológica de urgencia, así como asistencia jurídica a través de un Asesor jurídico; '+
                     ' </p><br><p>'+
                     'IV. A comunicarse, inmediatamente después de haberse cometido el delito con un familiar, e incluso con su Asesor jurídico; '+
                     ' </p><br><p>'+
                     'V. A ser informado, cuando así lo solicite, del desarrollo del procedimiento penal por su Asesor jurídico, el Ministerio Público y/o, en su caso, por el Juez o Tribunal; '+
                     ' </p><br><p>'+
                     'VI. A ser tratado con respeto y dignidad; '+
                     ' </p><br><p>'+
                     'VII. A contar con un Asesor jurídico gratuito en cualquier etapa del procedimiento, en los términos de la legislación aplicable; '+
                     ' </p><br><p>'+
                     'VIII. A recibir trato sin discriminación a fin de evitar que se atente contra la dignidad humana y se anulen o menoscaben sus derechos y libertades, por lo que la protección de sus derechos se hará sin distinción alguna; '+
                     ' </p><br><p>'+
                     'IX. A acceder a la justicia de manera pronta, gratuita e imparcial respecto de sus denuncias o querellas; '+
                     ' </p><br><p>'+
                     'X. A participar en los mecanismos alternativos de solución de controversias; '+
                     ' </p><br><p>'+
                     'XI. A recibir gratuitamente la asistencia de un intérprete o traductor desde la denuncia hasta la conclusión del procedimiento penal, cuando la víctima u ofendido pertenezca a un grupo étnico o pueblo indígena o no conozca o no comprenda el idioma español; '+
                     ' </p><br><p>'+
                     'XII. En caso de tener alguna discapacidad, a que se realicen los ajustes al procedimiento penal que sean necesarios para salvaguardar sus derechos; '+
                     ' </p><br><p>'+
                     'XIII. A que se le proporcione asistencia migratoria cuando tenga otra nacionalidad; '+
                     ' </p><br><p>'+
                     'XIV. A que se le reciban todos los datos o elementos de prueba pertinentes con los que cuente, tanto en la investigación como en el proceso, a que se desahoguen las diligencias correspondientes, y a intervenir en el juicio e interponer los recursos en los términos que establece este Código; '+
                     ' </p><br><p>'+
                     'XV. A intervenir en todo el procedimiento por sí o a través de su Asesor jurídico, conforme lo dispuesto en este Código; '+
                     ' </p><br><p>'+
                     'XVI. A que se le provea protección cuando exista riesgo para su vida o integridad personal; '+
                     ' </p><br><p>'+
                     'XVII. A solicitar la realización de actos de investigación que en su caso correspondan, salvo que el Ministerio Público considere que no es necesario, debiendo fundar y motivar su negativa; '+
                     ' </p><br><p>'+
                     'XVIII. A recibir atención médica y psicológica o a ser canalizado a instituciones que le proporcionen estos servicios, así como a recibir protección especial de su integridad física y psíquica cuando así lo solicite, o cuando se trate de delitos que así lo requieran; '+
                     ' </p><br><p>'+
                     'XIX. A solicitar medidas de protección, providencias precautorias y medidas cautelares; '+
                     ' </p><br><p>'+
                     'XX. A solicitar el traslado de la autoridad al lugar en donde se encuentre, para ser interrogada o participar en el acto para el cual fue citada, cuando por su edad, enfermedad grave o por alguna otra imposibilidad física o psicológica se dificulte su comparecencia, a cuyo fin deberá requerir la dispensa, por sí o por un tercero, con anticipación; '+
                     ' </p><br><p>'+
                     'XXI. A impugnar por sí o por medio de su representante, las omisiones o negligencia que cometa el Ministerio Público en el desempeño de sus funciones de investigación, en los términos previstos en este Código y en las demás disposiciones legales aplicables;'+
                     ' </p><br><p>'+
                     ' XXII. A tener acceso a los registros de la investigación durante el procedimiento, así como a obtener copia gratuita de éstos, salvo que la información esté sujeta a reserva así determinada por el Órgano jurisdiccional; '+
                     ' </p><br><p>'+
                     'XXIII. A ser restituido en sus derechos, cuando éstos estén acreditados; '+
                     ' </p><br><p>'+
                     'XXIV. A que se le garantice la reparación del daño durante el procedimiento en cualquiera de las formas previstas en este Código;'+
                     ' </p><br><p>'+
                     ' XXV. A que se le repare el daño causado por la comisión del delito, pudiendo solicitarlo directamente al Órgano jurisdiccional, sin perjuicio de que el Ministerio Público lo solicite; '+
                     ' </p><br><p>'+
                     'XXVI. Al resguardo de su identidad y demás datos personales cuando sean menores de edad, se trate de delitos de violación contra la libertad y el normal desarrollo psicosexual, violencia familiar, secuestro, trata de personas o cuando a juicio del Órgano jurisdiccional sea necesario para su protección, salvaguardando en todo caso los derechos de la defensa; '+
                     ' </p><br><p>'+
                     'XXVII. A ser notificado del desistimiento de la acción penal y de todas las resoluciones que finalicen el procedimiento, de conformidad con las reglas que establece este Código; '+
                     ' </p><br><p>'+
                     'XXVIII. A solicitar la reapertura del proceso cuando se haya decretado su suspensión, y'+
                     ' </p><br><p>'+
                     'XXIX. Los demás que establezcan este Código y otras leyes aplicables.'+
                     ' </p><br><br><p>'+
                     '<p> <strong><u>En el caso de que las víctimas sean personas menores de dieciocho años, el Órgano jurisdiccional o el Ministerio Público tendrán en cuenta los principios del interés superior de los niños o adolescentes, la prevalencia de sus derechos, su protección integral y los derechos consagrados en la Constitución, en los Tratados, así como los previstos en el presente Código.</u></strong></p>'+
                     ' </p><br><br><p>'+
                     'Para los delitos que impliquen violencia contra las mujeres, se deberán observar todos los derechos que en su favor establece la Ley General de Acceso de las Mujeres a una Vida Libre de Violencia y demás disposiciones aplicables.'+
                     ' </p><br><br><p>'+
                     'De igual forma se le hace del conocimiento de la víctima u ofendido menor de edad que goza de los derechos establecidos, por el artículo 86 de la Ley General de los Derechos de Niñas, Niños y Adolescentes que son los siguientes:'+
                     ' </p><br><p>'+
                     'I. Se les informe sobre la naturaleza del procedimiento y el carácter de su participación en el mismo, el que en ningún caso podrá ser el de imputado o probable responsable;'+
                     ' </p><br><p>'+
                     'II. Que su participación en un procedimiento se lleve a cabo de la manera más expedita, asistidos por un profesional en derecho y atendiendo a lo dispuesto por la fracción XI del artículo 83 de esta Ley;'+
                     ' </p><br><p>'+
                     'III. Garantizar el acompañamiento de quien ejerza sobre ellos la patria potestad, tutela o guarda y custodia durante la sustanciación de todo el procedimiento, salvo disposición judicial en contrario, con base en el interés superior de la niñez;'+
                     '</p><br><p>'+
                     'IV. Que se preserve su derecho a la intimidad, que no se divulguen sus datos de identificación en los términos de esta Ley y las demás aplicables;'+
                     ' </p><br><p>'+
                     'V. Tener acceso gratuito a asistencia jurídica, psicológica y cualquier otra necesaria atendiendo a las características del caso, a fin de salvaguardar sus derechos, en términos de las disposiciones aplicables, y'+
                     ' </p><br><p>'+
                     'VI. Adoptar las medidas necesarias para evitar la re-victimización de niñas, niños y adolescentes que presuntamente son víctimas de la comisión de un delito o violación a sus derechos humanos.'+
                     ' </p><br><br><br>'
                     me.fila3 = '<p><strong><c>LEY NACIONAL DEL SISTEMA INTEGRAL DE JUSTICIA PENAL PARA ADOLESCENTES</c></strong>'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 4. Niñas y Niños.</strong></p>'+
                     ' </p><br><p>'+
                     'Las niñas y niños, en términos de la Ley General, a quienes se les atribuya la comisión de un hecho que la ley señale como delito estarán exentos de responsabilidad penal, sin perjuicio de las responsabilidades civiles a las que haya lugar. '+
                     ' </p><br><p>'+
                     'En caso de que la autoridad advierta que los derechos de estas niñas y niños están siendo amenazados o violados, deberá dar aviso a la Procuraduría de Protección competente.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 7. Comprobación de la edad </strong></p>'+
                     ' </p><br><p>'+
                     'Para todos los efectos de esta Ley, la edad a considerar será la que tenía la persona al momento de realizar el hecho que la ley señale como delito, el cual se acreditará mediante acta de nacimiento expedida por el Registro Civil, o bien, tratándose de extranjeros, mediante documento oficial. Cuando esto no sea posible, la comprobación de la edad se hará mediante dictamen médico rendido por el o los peritos que para tal efecto designe la autoridad correspondiente.'+
                     ' </p><br><br><p>'+
                     '<p> <strong>Artículo 12. Interés superior de la niñez </strong></p>'+
                     ' </p><br><p>'+
                     'Para efectos de esta Ley el interés superior de la niñez debe entenderse como derecho, principio y norma de procedimiento dirigido a asegurar el disfrute pleno y efectivo de todos sus derechos, en concordancia con la Ley General de los Derechos de Niñas, Niños y Adolescentes. '+
                     ' </p><br><p>'+
                     'La determinación del interés superior debe apreciar integralmente: '+
                     ' </p><br><p>'+
                     'I. El reconocimiento de éstos como titulares de derechos; '+
                     ' </p><br><p>'+
                     'II. La opinión de la persona adolescente; '+
                     ' </p><br><p>'+
                     'III. Las condiciones sociales, familiares e individuales de la persona adolescente; '+
                     ' </p><br><p>'+
                     'IV. Los derechos y garantías de la persona adolescente y su responsabilidad; '+
                     ' </p><br><p>'+
                     'V. El interés público, los derechos de las personas y de la persona adolescente; '+
                     ' </p><br><p>'+
                     'VI. Los efectos o consecuencias que la decisión que se adopte pueda tener en el futuro de la persona adolescente, y '+
                     ' </p><br><p>'+
                     'VII. La colaboración de las partes intervinientes para garantizar su desarrollo integral e integridad personal. '+
                     ' </p><br><p>'+
                     'En todas las resoluciones se deberá dejar patente que el interés superior ha sido una consideración primordial, señalando la forma en la que se ha examinado y evaluado el interés superior y la importancia que se le ha atribuido en la decisión administrativa o judicial.'+
                     ' </p><br><br><p>'+
                     '<p><strong>Artículo 59. Derechos de las víctimas</strong>'+
                     ' </p><br><p>'+
                     'Las víctimas u ofendidos por la realización de hechos señalados como delitos por las leyes penales federales y de las entidades federativas, tendrán todos los derechos reconocidos en la Constitución, el Código Nacional y demás legislación aplicable.'+
                     ' </p><br><p>'+
                     'La Comisión Ejecutiva de Atención a Víctimas y las comisiones ejecutivas de las entidades federativas, dentro de sus respectivos ámbitos de competencia, proporcionarán la asistencia, ayuda, atención y reparación integral a las víctimas en términos de la Ley General de Víctimas y demás legislación aplicable.'+
                     ' </p><br><p>'+
                     '<p><strong>Artículo 60. Reparación del daño a la víctima u ofendido</strong>'+
                     ' </p><br><p>'+
                     'La persona adolescente tendrá la obligación de resarcir el daño causado a la víctima u ofendido, así como de restituir la cosa dañada por su conducta o entregar un valor sustituto. En todo caso, se procurará que el resarcimiento guarde relación directa con el hecho realizado, el bien jurídico lesionado y provenga del esfuerzo propio de la persona adolescente, sin que provoque un traslado de responsabilidad hacia su padre, madre, representante legal o a algún tercero.'+
                     ' </p><br><p>'+
                     'La restitución se podrá obtener de la siguiente forma:'+
                     ' </p><br><p>'+
                     '      I.	Trabajo material encaminado en favor de la reparación directa del bien dañado;'+
                     ' </p><br><p>'+
                     '      II.	Pago en dinero o en especie mediante los bienes, dinero o patrimonio del adolescente, y'+
                     ' </p><br><p>'+
                     '      III.	Pago en dinero con cargo a los ingresos laborales o de trabajo del adolescente.'+
                     ' </p><br><p>'+
                     'Las medidas a que se refieren las fracciones anteriores se realizarán por el acuerdo de voluntades de las partes; el Ministerio Público Especializado en Adolescentes competente sancionará, en todos los casos, los mecanismos por el que se pretenda realizar la reparación del daño.'+
                     ' </p><br><p>'+
                     'El pago a la víctima u ofendido, podrá aplicarse con cargo al Fondo de Ayuda, Asistencia y Reparación Integral de la Comisión Ejecutiva de Atención a Víctimas o su similar en las entidades federativas, conforme a lo establecido por la Ley General de Víctimas y leyes correspondientes en las entidades federativas, respecto a la compensación subsidiaria.'+
                     ' </p><br><br><p>'
                     me.fila4 = '<p>Una vez que me fueron leídos y explicados mis derechos, los comprendo y recibo una copia de los mismos.</p><br><br><br><br>'+
                    '<strong><p>NOMBRE DE LA VICTIMA</p><br><br><p>'+ this.nombre + '</p><br><br><br><br>'+
                     '<p>A T E N T A M E N T E.</p><br><br><br>' + this.u_nombre + '<br><br>' + this.puestoquienregistro  + '<br><br>'  +  'Adscrito al ' + this.agenciainicial +"</strong>"
                     me.fila4
                      me.control = 3

                }else if((me.edad >= 18 && (me.tvictima == "Victima directa" || me.tvictima == "Victima indirecta")) || me.tvictima == "Testigo"){
                    me.fila1 = '<p>En este acto, el(la) Agente del Ministerio Público hace saber a la víctima (s) u ofendido (s) C.<strong>'+ this.nombre + '</strong>'+
                     ' que el <strong>Artículo 20 apartado C de la Constitución Política de los Estados Unidos Mexicanos</strong> le otorga los siguientes derechos:</p><br><br>'+
                     '<p class="ql-align-justify">I. Recibir asesoría jurídica; ser informado de los derechos que en su favor establece la Constitución y, cuando lo solicite, ser informado del desarrollo '+
                     'del procedimiento penal; </p><br><br><p>II. Coadyuvar con el Ministerio Público; a que se le reciban todos los datos o elementos de prueba con los que cuente, '+
                     'tanto en la investigación como en el proceso, a que se desahoguen las diligencias correspondientes, y a intervenir en el juicio e interponer los recursos en los términos que prevea la ley.'+
                     ' Cuando el Ministerio Público considere que no es necesario el desahogo de la diligencia, deberá fundar y motivar su negativa; </p><br><br><p>'+
                     'III. Recibir, desde la comisión del delito, atención médica y psicológica de urgencia; </p><br><br><p>IV. Que se le repare el daño. En los casos en que sea procedente,'+
                     ' el Ministerio Público estará obligado a solicitar la reparación del daño, sin menoscabo de que la víctima u ofendido lo pueda solicitar directamente, y el juzgador no podrá absolver'+
                     ' al sentenciado de dicha reparación si ha emitido una sentencia condenatoria. La ley fijará procedimientos ágiles para ejecutar las sentencias en materia de reparación del daño; </p>'+
                     '<br><br><p>V. Al resguardo de su identidad y otros datos personales en los siguientes casos: cuando sean menores de edad; cuando se trate de delitos de violación, '+
                     'trata de personas, secuestro o delincuencia organizada; y cuando a juicio del juzgador sea necesario para su protección, salvaguardando en todo caso los derechos de la defensa. '+
                     'El Ministerio Público deberá garantizar la protección de víctimas, ofendidos, testigos y en general todos los sujetos que intervengan en el proceso. Los jueces deberán vigilar el'+
                     ' buen cumplimiento de esta obligación; </p><br><br><p>VI. Solicitar las medidas cautelares y providencias necesarias para la protección y restitución de sus derechos,'+
                     ' y </p><br><br><p>VII. Impugnar ante autoridad judicial las omisiones del Ministerio Público en la investigación de los delitos, así como las resoluciones de reserva,'+
                     ' no ejercicio, desistimiento de la acción penal o suspensión del procedimiento cuando no esté satisfecha la reparación del daño.</p><p><br></p>'

                    me.fila2 =  '<p>De igual forma se le hace saber que el artículo <strong>109 del Código Nacional de Procedimientos Penales</strong> le otorga los siguientes derechos:</p><br><br>'+
                     '<p>I. A ser informado de los derechos que en su favor le reconoce la Constitución; </p><br><br>'+
                     '<p>II. A que el Ministerio Público y sus auxiliares, así como el Órgano jurisdiccional le faciliten el acceso a la justicia y les presten los servicios que constitucionalmente'+
                     ' tienen encomendados con legalidad, honradez, lealtad, imparcialidad, profesionalismo, eficiencia y eficacia y con la debida diligencia;</p><br><br>'+
                     '<p>III. A contar con información sobre los derechos que en su beneficio existan, como ser atendidos por personal del mismo sexo, o del sexo que la víctima elija,'+
                     ' cuando así lo requieran y recibir desde la comisión del delito atención médica y psicológica de urgencia, así como asistencia jurídica a través de un Asesor jurídico; </p><br><br>'+
                     '<p>IV. A comunicarse, inmediatamente después de haberse cometido el delito con un familiar, e incluso con su Asesor jurídico; </p><br><br>'+
                     '<p>V. A ser informado, cuando así lo solicite, del desarrollo del procedimiento penal por su Asesor jurídico, el Ministerio Público y/o, en su caso, por el Juez o Tribunal; </p><br><br>'+
                     '<p>VI. A ser tratado con respeto y dignidad; </p><br><br>'+
                     '<p>VII. A contar con un Asesor jurídico gratuito en cualquier etapa del procedimiento, en los términos de la legislación aplicable; </p>'+
                     '<p>VIII. A recibir trato sin discriminación a fin de evitar que se atente contra la dignidad humana y se anulen o menoscaben sus derechos y libertades, por lo que la protección de sus'+
                     ' derechos se hará sin distinción alguna; </p><br><br><p>IX. A acceder a la justicia de manera pronta, gratuita e imparcial respecto de sus denuncias o querellas; </p><br><br>'+
                     '<p>X. A participar en los mecanismos alternativos de solución de controversias; </p><br><br>'+
                     '<p>XI. A recibir gratuitamente la asistencia de un intérprete o traductor desde la denuncia hasta la conclusión del procedimiento penal, cuando la víctima u ofendido pertenezca '+
                     'a un grupo étnico o pueblo indígena o no conozca o no comprenda el idioma español; </p><br><br>'+
                     '<p>XII. En caso de tener alguna discapacidad, a que se realicen los ajustes al procedimiento penal que sean necesarios para salvaguardar sus derechos; </p><br><br>'+
                     '<p>XIII. A que se le proporcione asistencia migratoria cuando tenga otra nacionalidad;&nbsp;</p>'

                    me.fila3 = '<p>XIV. A que se le reciban todos los datos o elementos de prueba pertinentes con los que cuente, tanto en la investigación como en el proceso, a que se desahoguen las diligencias'+
                     ' correspondientes, y a intervenir en el juicio e interponer los recursos en los términos que establece este Código; </p><br><br><p>XV. A intervenir en todo el procedimiento por sí '+
                     'o a través de su Asesor jurídico, conforme lo dispuesto en este Código; </p><br><br><p>XVI. A que se le provea protección cuando exista riesgo para su vida o integridad personal; </p><br><br>'+
                     '<p>XVII. A solicitar la realización de actos de investigación que en su caso correspondan, salvo que el Ministerio Público considere que no es necesario, debiendo fundar y'+
                     ' motivar su negativa; </p><br><br><p>XVIII. A recibir atención médica y psicológica o a ser canalizado a instituciones que le proporcionen estos servicios,'+
                     ' así como a recibir protección especial de su integridad física y psíquica cuando así lo solicite, o cuando se trate de delitos que así lo requieran; </p><br><br>'+
                     '<p>XIX. A solicitar medidas de protección, providencias precautorias y medidas cautelares; </p><br><br><p>XX. A solicitar el traslado de la autoridad al lugar en donde se encuentre,'+
                     ' para ser interrogada o participar en el acto para el cual fue citada, cuando por su edad, enfermedad grave o por alguna otra imposibilidad física o psicológica se dificulte su '+
                     'comparecencia, a cuyo fin deberá requerir la dispensa, por sí o por un tercero, con anticipación; </p><br><br><p>XXI. A impugnar por sí o por medio de su representante, las omisiones'+
                     ' o negligencia que cometa el Ministerio Público en el desempeño de sus funciones de investigación, en los términos previstos en este Código y en las demás disposiciones legales aplicables;</p><br><br>'+
                     '<p>XXII. A tener acceso a los registros de la investigación durante el procedimiento, así como a obtener copia gratuita de éstos, salvo que la información esté sujeta a reserva así determinada'+
                     ' por el Órgano jurisdiccional; </p><br><br><p>XXIII. A ser restituido en sus derechos, cuando éstos estén acreditados; </p><br><br><p>XXIV. A que se le garantice la reparación del daño durante'+
                     ' el procedimiento en cualquiera de las formas previstas en este Código;</p><br><br><p>XXV. A que se le repare el daño causado por la comisión del delito, pudiendo solicitarlo directamente al Órgano'+
                     ' jurisdiccional, sin perjuicio de que el Ministerio Público lo solicite; </p><br><br><p>XXVI. Al resguardo de su identidad y demás datos personales cuando sean menores de edad, se trate de delitos '+
                     'de violación contra la libertad y el normal desarrollo psicosexual, violencia familiar, secuestro, trata de personas o cuando a juicio del Órgano jurisdiccional sea necesario para su protección, '+
                     'salvaguardando en todo caso los derechos de la defensa; </p><br><br><p>XXVII. A ser notificado del desistimiento de la acción penal y de todas las resoluciones que finalicen el procedimiento,'+
                     ' de conformidad con las reglas que establece este Código; </p><br><br><p>XXVIII. A solicitar la reapertura del proceso cuando se haya decretado su suspensión, y</p><br><br>'+
                     '<p>XXIX. Los demás que establezcan este Código y otras leyes aplicables.</p>'

                    me.fila4 = '<p>Una vez que me fueron leídos y explicados mis derechos, los comprendo y recibo una copia de los mismos, firmando al calce.</p><br><br><br><br>'+
                     '<b><p>NOMBRE DE LA VICTIMA</p><br><br><p><strong>'+ this.nombre + '</strong></p><br><br><br><br>'+
                     '<p>A T E N T A M E N T E.</p><br><br>' + this.u_nombre + '<br><br>' + this.puestoquienregistro  + '<br><br>'  +  'Adscrito al ' + this.agenciainicial +'</b>',


                      me.control = 4

                }
                me.mostrarpdf(me.u_nombre, me.u_puesto, me.u_agencia);
                me.modaldocumento = false
            },
            listardireccionpersona(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$cat.get('api/RAPs/ListarDP/' +me.personaId,configuracion).then(function(response){

                    me.direccion = response.data.calle + " " +response.data.noint + " " +response.data.noext   + " " + response.data.localidad + " " +response.data.municipio + " " +response.data.estado + " " +response.data.pais + " " +response.data.cp
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
                        me.$notify("El recurso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros','error')
                    }
                });
            },

            listaracumulada(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$cat.get('api/AcumulacionCarpetas/Listar/'+ me.rHechoId,configuracion).then(function(response){
                      me.acumulada = response.data[0].nucFusion
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
                        me.$notify("El recurso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros','error')
                    }
                });
            },

               listardireccionhecho(){
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                this.$cat.get('api/DireccionDelitoes/ListarPoridHecho/' + me.rHechoId,configuracion).then(function(response) {
                    me.idDDelito = response.data.idDDelito;
                    me.lugarespecifico = response.data.lugarEspecifico;
                    me.direccionsuceso = response.data.calle + " " +response.data.noint + " " +response.data.noext   + " " + response.data.localidad + " " +response.data.municipio + " " +response.data.estado + " " +response.data.pais + " " +response.data.cp
                    me.calle=response.data.calle;
                    me.noInt=response.data.noint;
                    me.noExt=response.data.noext;
                    me.entreCalle1=response.data.entrecalle1;
                    me.entreCalle2=response.data.entrecalle2;
                    me.referencia=response.data.referencia;
                    me.pais=response.data.pais;

                    me.estado= response.data.estado;
                    me.municipio = response.data.municipio;
                    me.localidad = response.data.localidad;

                    me.cp=response.data.cp;
                    me.lat = response.data.lat;
                    me.lng = response.data.lng;
                    me.lat2 = response.data.lat;
                    me.lng2 = response.data.lng;
                    me.selectEstado(me.estado);
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
            //NUEVA FUNCION PARA COLOCAR CANDADOS AL MOMENTO DE QUERER IMPRIMIR UNA CARATULA DE NUC
            comprobarinfo(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var comprobarArray=[];
                var estatuscom = [];
                var direccionCom = [];
                var fechaCom = [];
                var fechavacia = '';
                var direccionvacia = '';
                var etapavacia = '';
                var clasificacionvacia = '';
                this.$cat.get('api/RHechoes/ComprobarIN/'+ me.rHechoId + '/' + me.rAtencionId,configuracion).then(function(response){

                    comprobarArray = response.data;

                    // MAP PARA ASIGNAR VALOR A fechaCom,direccionCom
                    comprobarArray.map(function(x){
                    fechaCom.push({text: x.fechaHoraSuceso,value: x.fechaHoraSuceso});
                    direccionCom.push({text: x.idDDelito,value: x.idDDelito});
                    estatuscom.push({text: x.etapanuc,value: x.etapanuc});
                    me.clasificacioncom.push({text: x.clasificacionPersona,value: x.clasificacionPersona});
                     });

                     //FOREACH PARA AREGLAR LOS VALORES A LOS QUE LAS APIS DEVUELVEN, EN ESTE CASO LA FECHA Y HORA DEL SUCESO
                        fechaCom.forEach(function(notificacion)
                        {
                            if (typeof notificacion !== null && typeof notificacion !== undefined){
                               if (notificacion == '[object Object]')
                                  {
                                    fechavacia+=notificacion.text;                                   
                                  }
                                  else {
                                    fechavacia+=notificacion;
                                       }
                            };
                        });

                        //FOREACH PARA AREGLAR LOS VALORES A LOS QUE LAS APIS DEVUELVEN, EN ESTE CASO EL LUGAR DEL SUCESO
                        direccionCom.forEach(function(notificacion)
                        {
                            if (typeof notificacion !== null && typeof notificacion !== undefined){
                               if (notificacion == '[object Object]')
                                  {
                                    direccionvacia+=notificacion.text;                                   
                                  }
                                  else {
                                    direccionvacia+=notificacion;
                                       }
                            };
                        });

                        //FOREACH PARA AREGLAR LOS VALORES A LOS QUE LAS APIS DEVUELVEN, EN ESTE CASO LA ETAPA
                        estatuscom.forEach(function(notificacion)
                        {
                            if (typeof notificacion !== null && typeof notificacion !== undefined){
                               if (notificacion == '[object Object]')
                                  {
                                    etapavacia+=notificacion.text;                                   
                                  }
                                  else {
                                    etapavacia+=notificacion;
                                       }
                            };
                        });
                        //FOREACH PARA AREGLAR LOS VALORES A LOS QUE LAS APIS DEVUELVEN, EN ESTE CASO LA CLASIFICACION
                        me.clasificacioncom.forEach(function(notificacion)
                        {
                            if (typeof notificacion !== null && typeof notificacion !== undefined){
                               if (notificacion == '[object Object]')
                                  {
                                    clasificacionvacia+=notificacion.text;                                                        
                                  }
                                  else {
                                    clasificacionvacia+=notificacion;
                                       }
                            };
                        });
                        //CONDICIONALES, RECOREDEMOS QUE LOS VALORES SE ESTAN GUARDANDO EN TEXTO, POR LO QUE ES NECESARIO MANEJARLO COMO TAL
                            if (fechavacia.includes('null') == true || direccionvacia.includes('null') == true|| etapavacia.includes('Inicial')== true ||clasificacionvacia.includes('Victima') == false ||clasificacionvacia.includes('Imputado') == false)
                                {
                                alert("Te hace falta ingresar: "+ (fechavacia.includes('null') == true ? " \n■Fecha y hora del suceso": "")
                                      + (direccionvacia.includes('null') == true ? " \n■Lugar del suceso": "")
                                      + (etapavacia.includes('Inicial') == true ? " \n■Actualizar estatus y etapa": "")
                                      + (clasificacionvacia.includes('Victima') == false ? " \n■Dar de alta una victima": "")
                                      + (clasificacionvacia.includes('Imputado') == false ? " \n■Dar de alta un Imputado": ""));
                                }
                            else
                                {
                                me.mostrarpdf_CaratulaNUC()
                                }
                                  
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
          limpiar(){
                this.calle="";
                this.noInt="";
                this.noExt="";
                this.entreCalle1="";
                this.entreCalle2="";
                this.referencia="";
                this.pais="Mexico";
                this.estadoid="";
                this.municipioid="";
                this.localidadid="";
                this.cp="";

            },
            agregarFHS(){

                    this.modalFHS = 1;

            },
            closeFHS(){
                this.modalFHS = 0;
            },
            guardarFHS(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                 this.$cat.put('api/RHechoes/ActualizarFHS',{
                            'idRHecho': me.rHechoId,
                            'ratencionid': me.rAtencionId,
                            'fechaHoraSuceso': me.fecha + ' ' + me.hora,
                     },configuracion).then(function(response){
                         me.fecha= new Date().toISOString().substr(0, 10),
                         me.hora= null,
                         me.closeFHS();
                         me.listarrHecho();

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
                                            me.$notify('Error al intentar actualizar el registro!!!','error')
                                        }
                                    });
            },
           agregarDS(){

                let me = this;
                me.listardireccionhecho();
                me.editedIndex=1;
                me.modalDS= 1;


            },
            close(){
                this.modal_CaratulaNUC=false;
                this.modal_EntrevistaVictima=false;
            },
             //************************************************************************ */
            // CARATULA DE RAC
            crearPdf_CaratulaNUC() {

                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");

                //***************************************************************************** */
                // VARIABLES
                //***************************************************************************** */
                var logo1 = this.logo1;
                var logo2 = this.logo2;
                var logo3 = this.logo3;
                var logo4 = this.logo4;

                var dirsubproc = this.dirsubprocuinicial;
                var agencia = this.agenciainicial;
                var diragencia = this.direccionAgencia;
                var u_subProc= this.u_subproc;
                console.log(this.$store.state.usuario)
                var telagencia= this.telefonosAgencia;
               var nuc = this.nuc;
                //***************************************************************************** */

                var date = moment(this.fechaelevanuc, 'YYYY-MM-DD HH:mm:ss');
                var dia = moment(date).format("DD");
                var mes = moment(date).format('MMMM');
                var año= moment(date).format("YYYY");
                var hr= moment(date).format('h:mm:ss a');
                var fecha = dia + " de " + mes  + " del " + año
                //***************************************************************************** */
                var htmltexto = htmlToPdfmake(
                    this.rBreve
                );
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
                                    absolutePosition: {x: 0, y: 0},
                                },
                                {
                                    text: diragencia +"\n"+telagencia+"\n"+ 'www.hidalgo.gob.mx',
                                    style: 'subheaderlogo',
                                    style: 'PiePagina',
                                    margin: [312,12,72,0],
                                    alignment:'right',
                                    absolutePosition: {x: 0, y: 30},
                                },
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
                                //    width: 50,
                                //    absolutePosition: {x: 495, y: 30},
                                //},


                            ]

                    },

                    content: [
                        {
                                    text: u_subProc + "\n" + dirsubproc +"\n"+agencia,
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
                            this.distritoinicial+", Hidalgo a "+ fecha + "\n\n\n\n\n\n\n\n",
                            style: 'Fecha',
                            alignment: 'right',
                        },
                        {
                            text:  'REGISTRO DE NÚMERO ÚNICO DE CASO\n\n\n\n\n',
                            alignment:'center',
                            style: 'Titulo'
                        },
                        {
                            columns: [
                                //***************************** */
                                {
                                    width: 220,
                                    text: 'Numero Único de Caso:',
                                    style: 'Texto'
                                },
                                {
                                    width: '*',
                                    text: this.nuc ,
                                    style:'Texto',
                                    bold:true
                                },
                                //***************************** */
                            ],
                        },
                        '\n\n',
                        {
                            columns: [
                                //***************************** */
                                {
                                    width: 220,
                                    text: 'Nombre del ' + this.tvictima + ':',
                                    style: 'Texto'
                                },
                                {
                                    width: '*',
                                    text: this.nombre ,
                                    style:'Texto',
                                    bold:true
                                },
                                //***************************** */
                            ],
                        },
                        '\n\n',
                        {
                            columns: [
                                //***************************** */
                                {
                                    width: 220,
                                    text: 'Narración breve:',
                                    style: 'Texto'
                                },
                                {
                                    width: '*',
                                    text: htmltexto,
                                    alignment :'justify',
                                    style:'texto'
                                },
                                //***************************** */
                            ],
                        },
                        '\n\n',
                        {
                            columns: [
                                //***************************** */
                                {
                                    width: 220,
                                    text: 'Registro de Atención Ciudadana(RAC):',
                                    style: 'Texto'
                                },
                                {
                                    width: '*',
                                    text: this.rac ,
                                    style:'Texto',

                                },
                                //***************************** */
                            ],
                        },

                        {
                            text: '\n\n\n\n\n'+ "A T E N T A M E N T E"+'\n\n\n\n\n',
                            alignment :'justify',
                            style: 'DePara',
                        },
                        {
                            text: this.registradopor +"\n\n",
                            alignment :'justify',
                            style: 'DePara',
                        },
                        {
                            text: this.puestoquienregistro +"\n\n",
                            alignment :'justify',
                            style: 'DePara',
                        },
                        {
                            text: this.agenciainicial +"\n\n",
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
                            color:'white',
                        },
                        Texto:{
                            fontSize: 10,
                            alignment:'justify'
                        },
                        Titulo:{
                            fontSize: 12,
                            bold:true
                        },
                        Subtitulo:{
                            fontSize: 11,
                        },
                        Back: {
                            background: '#000'
                        }


                    }

                }

                    return dd;



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
            
            mostrarpdf_CaratulaNUC(){
                var dd = this.crearPdf_CaratulaNUC();
                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");

                if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs;


                }
                    var doc = pdfMake.createPdf(dd);
                    var f = document.getElementById('iframepdf1');
                    var callback = function(url) { f.setAttribute('src',url); }
                    doc.getDataUrl(callback, doc);
                    this.modal_CaratulaNUC=true;

            },            
            imprimirCaratulaNUC(){
                let me=this;
                var dd = me.crearPdf_CaratulaNUC();
                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");

                if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs;
                }
                var doc = pdfMake.createPdf(dd).print();
                 me.close();
            } ,
             //************************************************************************ */
            // ENTREVISTA  VICTIMA
            crearPdf_EntrevistaVictima(){

                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");
                //***************************************************************************** */
                // VARIABLES
                //***************************************************************************** */
                var logo1 = this.logo1;
                var logo2 = this.logo2;
                var logo3 = this.logo3;
                var logo4 = this.logo4;
                var dirsubproc = this.dirsubprocuinicial;
                var agencia = this.agenciainicial;
                var diragencia = this.direccionAgencia;
                var telagencia= this.telefonosAgencia;

                //***************************************************************************** */

                var date = moment(this.fechaelevanuc, 'YYYY-MM-DD HH:mm:ss');
                var dia = moment(date).format("DD");
                var mes = moment(date).format('MMMM');
                var año= moment(date).format("YYYY");
                var hr= moment(date).format('h:mm:ss a');
                var fecha = dia + " de " + mes  + " del " + año
                //***************************************************************************** */
                var htmltexto = htmlToPdfmake(
                    this.narrativaHechos
                );
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
                                    text: diragencia +"\n"+telagencia+"\n"+ 'www.hidalgo.gob.mx',
                                    style: 'subheaderlogo',
                                    style: 'PiePagina',
                                    margin: [312,12,72,0],
                                    alignment:'right',
                                    absolutePosition: {x: 0, y: 30},
                                },
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
                                //    width: 50,
                                //    absolutePosition: {x: 495, y: 30},
                                //},


                            ]

                    },

                    content: [
                        {
                                    text: u_subProc + "\n" + dirsubproc +"\n"+agencia,
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
                            text:   this.distritoinicial + ' , Hidalgo a '+ fecha,
                            style: 'fecha'
                        },
                         '\n',
                        {
                            text:  'Número único de caso (NUC): ' + this.nuc ,
                            style: 'nuc'
                        },
                        '\n\n\n',
                        this.edad >=18 ?
                        {
                            text:  'ENTREVISTA A CARGO DEL (A) (DENUNCIANTE, VICTIMA U OFENDIDO)\nC. ' + this.nombre ,
                            style: 'titulo'
                        }:"",
                        this.edad <18 ?
                        {
                            text:  'ENTREVISTA A CARGO DE LA VÍCTIMA MENOR DE EDAD DE INICIALES\n' + this.iniciales ,
                            style: 'titulo'
                        }:"",
                         '\n\n',
                        {
                            text:  'Lugar: ' + this.agenciainicial + '\n' + 'Fecha y hora: ' + fecha + '\n' + 'Unidad de investigación: ' + this.modulodondefueatendido + '\n' + 'Agente del Ministerio publico: ' + this.registradopor,
                            style: 'texto'
                        },
                        '\n\n\n',
                        this.edad >=18 ?
                        {
                            text:  'PROTESTA DE LEY\n\n',
                            style: 'titulo'
                        }:"",
                        this.edad >=18 ?
                        {
                            text:  'El (La) agente del Ministerio Público con fundamento en lo establecido por el artículo 49 del Código Nacional de Procedimientos Penales, protesta al C. ' + this.nombre + ' para conducirse con verdad y le advierte que podrá imponerse de tres meses a dos años de prisión a quien se conduzca con falsedad ante una autoridad en ejercicio de sus funciones, conforme a lo previsto por el artículo 313 del Código Penal del estado de Hidalgo, a lo anterior manifiesta: que si se conducirá con verdad. \n\n\n',
                            style: 'texto'
                        }:"",
                        this.edad >=18 ?
                        {
                            style: 'table',
                            table: {
                                headerRows: 1,
                                widths: ['*', 'auto', 'auto'],
                                body: [
                                    [{colSpan: 3,  text: 'DATOS DE LA VÍCTIMA U OFENDIDO', fillColor: '#eeeeee', fontSize: 12, bold: true, alignment: 'center'},'', '', ],
                                    ['Nombre' + '\n\n' + this.nombre, 'Alias:' + '\n\n' + this.alias , 'Clasificación de persona:'+ '\n\n' + this.tvictima]  ,
                                    ['Tipo persona:' + '\n\n' + this.tipopersona, 'CURP:'+ '\n\n' + this.curp, 'Documento de identificación:'+ '\n\n' + this.docIdentificacion],
                                    ['Nacionalidad:'+ '\n\n' + this.nacionalidad, 'Teléfono(s):'+ '\n\n' + this.tel, 'Correo electrónico:'+ '\n\n' + this.email],
                                    [{colSpan: 3,  text:'Dirección:'+ '\n\n' + this.direccion} , ''],
                                    ['Género:' + '\n\n' + this.genero, 'Sexo' + '\n\n' + this.sexo , 'Edad:' + '\n\n' + this.edad, ]  ,
                                    ['Autoriza medio de notificación:'+ '\n\n' + this.medionotificacion, 'Ocupación:'+ '\n\n' + this.ocupacion, 'Nivel estudios:'+ '\n\n' + this.nivelestudio],
                                    ['Religión:'+ '\n\n' + this.religion, 'Idioma  o lengua que habla:'+ '\n\n' + this.lengua, 'Estado familiar:'+ '\n\n' + this.estadocivil],
                                    [{colSpan: 3,  text:'Tiene alguna discapacidad:'+ '\n\n' + this.tipodiscapacidad} , ''],
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
                        }:"",
                        this.edad <18 ?
                        {
                            text:  'EXHORTA/INFORMA\n\n',
                            style: 'titulo'
                        }:"",
                        this.edad <18 ?
                        {
                            text:  "El(La) agente del Ministerio Público con fundamento en lo establecido por el artículo 49 del Código Nacional de Procedimientos Penales, exhorta/informa al menor de iniciales "+this.inciales+" para que se conduzca con verdad en lo que manifieste en su entrevista y se le explica que de conducirse con falsedad incurrirá en una conducta tipificada como delito en la ley penal y se hará acreedor a una medida de conformidad con las disposiciones aplicables, a lo anterior manifiesta: que si se conducirá con verdad.\n\n"+
                            "A continuación, se recaban los datos generales del(la) menor, que de conformidad con el artículo 20 apartado C fracción V de la Constitución Política de los Estados Unidos Mexicanos y 109 fracción XXVI del Código Nacional de Procedimientos Penales quedan reservados.\n\n"+
                            "Una vez que se le hicieron saber a "+this.iniciales+" los derechos que le otorga la Constitución Política de los Estados Unidos Mexicanos, el Código Nacional de Procedimientos Penales, la Ley Nacional Del Sistema Integral De Justicia para Adolescentes y la Ley General de los Derechos de Niñas, Niños y Adolescentes se le entregó la correspondiente acta.",
                            style: 'texto'
                        }:"",
                        {
                            text:  htmltexto,
                            style: 'texto'
                        },
                        this.edad >=18 ?
                        {
                            text:  '\n\n\nCOMPARECIENTE\n\n' + this.nombre,
                            style: 'compareciente'
                        }:"",

                        '\n\n\n\n\n',
                        {
                             text:  'A T E N T A M E N T E.\n\n\n\n\n' + this.u_nombre + '\n' + this.puestoquienregistro  + '\n'  +  'Adscrito al ' + this.agenciainicial,
                             style: 'ampo'
                        },

                    ],


                    styles: {
                        headertext:{
                            fontSize: 10,
                            bold: true,
                        },
                        fecha:{
                            fontSize: 11,
                            alignment: 'right',
                        },
                        nuc:{
                            fontSize: 12,
                            alignment: 'right',
                            bold: true,
                        },
                        titulo: {
                            fontSize: 17,
                            bold: true,
                            alignment: 'center',

                        },
                        subtitulo:{
                            fontSize: 14,
                            bold: true,
                        },

                        footertext:{
                            fontSize: 10,
                        },
                        texto:{
                            fontSize: 12,
                            alignment: 'justify',
                        },
                        compareciente:{
                            fontSize: 12,
                            bold: true,
                            alignment: 'left',
                        },
                        ampo:{
                            fontSize: 12,
                            bold: true,
                            alignment: 'left',
                        },


                    }

                }

                    return dd;



            },
            mostrarpdf_EntrevistaVictima(){
                let me=this;
                 if (me.fechasuceso == null){
                      me.$notify('Ingrese la fecha y hora del suceso','error')
                 }
                 else{
                     if (this.direccionsuceso == ''){
                          me.$notify('Ingrese la  dirección principal del suceso','error')
                    }
                    else{

                        me.$validator.validateAll('form1').then(result => {
                        if (result) {
                            var dd = this.crearPdf_EntrevistaVictima();
                            var pdfMake = require('pdfmake/build/pdfmake.js')
                            var htmlToPdfmake = require("html-to-pdfmake");

                            if (pdfMake.vfs == undefined){
                                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                                pdfMake.vfs = pdfFonts.vfs;


                            }
                                var doc = pdfMake.createPdf(dd);
                                var f = document.getElementById('iframepdf2');
                                var callback = function(url) { f.setAttribute('src',url); }
                                doc.getDataUrl(callback, doc);
                                this.modal_EntrevistaVictima=true;

                            }
                        })
                    }
                 }




            },
            imprimir_EntrevistaVictima(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                if  (me.rnh1 == false){
                     me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información. Una vez realizada esta accion no prodra realizar cambios',
                    function(){
                        this.$cat.put('api/RHechoes/ActualizarNarrativa',{
                                'idrhecho': me.rHechoId,
                                'ratencionid': me.rAtencionId,
                                'narrativaHechos': me.narrativaHechos,
                        },configuracion).then(function(response){
                            //**************************************************** */
                            //ACTUALIZAMOS LA HORA DE CIERRE
                                this.$cat.put('api/RAtencions/AHCierre',{
                                    'idratencion':me.rAtencionId,
                                },configuracion).then(function(response){
                                    var dd = me.crearPdf_EntrevistaVictima();
                                    var pdfMake = require('pdfmake/build/pdfmake.js')
                                    var htmlToPdfmake = require("html-to-pdfmake");
                                    if (pdfMake.vfs == undefined){
                                        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                                        pdfMake.vfs = pdfFonts.vfs;
                                    }
                                    var doc = pdfMake.createPdf(dd).print();
                                    me.rnh1=true;
                                    me.$notify('¡La información se guardo correctamente!','success')
                                    me.close();


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
                                me.$notify("No esta autorizado para ver esta página", 'error')
                                me.e403= true
                                me.showpage= false
                            } else if (err.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar actualizar el registro!!!','error')
                            }
                        });
                    },
                    function(){
                        alertify.warning('Verifica la información')
                    }
                ).set('labels', {ok:'Guardar', cancel:'Cancelar'});
                }
                else{

                    //**************************************************** */
                    me.rnh1=true;
                    var dd = me.crearPdf_EntrevistaVictima();
                    var pdfMake = require('pdfmake/build/pdfmake.js')
                    var htmlToPdfmake = require("html-to-pdfmake");

                    if (pdfMake.vfs == undefined){
                        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                        pdfMake.vfs = pdfFonts.vfs;
                    }
                    var doc = pdfMake.createPdf(dd).print();
                    me.close();

                }
            } ,

            //************************************************************************* */
            //************************************************************************ */
            // ENTREVISTA  VICTIMA
            crearPdf_LecturaDerechosVictima() {

                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");

                //***************************************************************************** */
                // VARIABLES
                //***************************************************************************** */
                var logo1 = this.logo1;
                var logo3 = this.logo3;
                var logo2 = this.logo2;
                var logo4 = this.logo4;
                var dirsubproc = this.dirsubprocuinicial;
                var agencia = this.agenciainicial;
                var diragencia = this.direccionAgencia;
                var telagencia= this.telefonosAgencia;


                //***************************************************************************** */

                var date = moment(this.fechaelevanuc, 'YYYY-MM-DD HH:mm:ss');
                var dia = moment(date).format("DD");
                var mes = moment(date).format('MMMM');
                var año= moment(date).format("YYYY");
                var hr= moment(date).format('h:mm:ss a');
                var fecha = dia + " de " + mes  + " del " + año
                //***************************************************************************** */
                var html_textofila1  = htmlToPdfmake(
                     '<p>En este acto, el(la) Agente del Ministerio Público hace saber a la víctima (s) u ofendido (s) C.<strong>'+ this.nombre + '</strong>'+
                     ' que el <strong>Artículo 20 apartado C de la Constitución Política de los Estados Unidos Mexicanos</strong> le otorga los siguientes derechos:</p><br><br>'+
                     '<p class="ql-align-justify">I. Recibir asesoría jurídica; ser informado de los derechos que en su favor establece la Constitución y, cuando lo solicite, ser informado del desarrollo '+
                     'del procedimiento penal; </p><br><br><p>II. Coadyuvar con el Ministerio Público; a que se le reciban todos los datos o elementos de prueba con los que cuente, '+
                     'tanto en la investigación como en el proceso, a que se desahoguen las diligencias correspondientes, y a intervenir en el juicio e interponer los recursos en los términos que prevea la ley.'+
                     ' Cuando el Ministerio Público considere que no es necesario el desahogo de la diligencia, deberá fundar y motivar su negativa; </p><br><br><p>'+
                     'III. Recibir, desde la comisión del delito, atención médica y psicológica de urgencia; </p><br><br><p>IV. Que se le repare el daño. En los casos en que sea procedente,'+
                     ' el Ministerio Público estará obligado a solicitar la reparación del daño, sin menoscabo de que la víctima u ofendido lo pueda solicitar directamente, y el juzgador no podrá absolver'+
                     ' al sentenciado de dicha reparación si ha emitido una sentencia condenatoria. La ley fijará procedimientos ágiles para ejecutar las sentencias en materia de reparación del daño; </p>'+
                     '<br><br><p>V. Al resguardo de su identidad y otros datos personales en los siguientes casos: cuando sean menores de edad; cuando se trate de delitos de violación, '+
                     'trata de personas, secuestro o delincuencia organizada; y cuando a juicio del juzgador sea necesario para su protección, salvaguardando en todo caso los derechos de la defensa. '+
                     'El Ministerio Público deberá garantizar la protección de víctimas, ofendidos, testigos y en general todos los sujetos que intervengan en el proceso. Los jueces deberán vigilar el'+
                     ' buen cumplimiento de esta obligación; </p><br><br><p>VI. Solicitar las medidas cautelares y providencias necesarias para la protección y restitución de sus derechos,'+
                     ' y </p><br><br><p>VII. Impugnar ante autoridad judicial las omisiones del Ministerio Público en la investigación de los delitos, así como las resoluciones de reserva,'+
                     ' no ejercicio, desistimiento de la acción penal o suspensión del procedimiento cuando no esté satisfecha la reparación del daño.</p><p><br></p>'
                );
                var html_textofila2  = htmlToPdfmake(
                     '<p>De igual forma se le hace saber que el artículo <strong>109 del Código Nacional de Procedimientos Penales</strong> le otorga los siguientes derechos:</p><br><br>'+
                     '<p>I. A ser informado de los derechos que en su favor le reconoce la Constitución; </p><br><br>'+
                     '<p>II. A que el Ministerio Público y sus auxiliares, así como el Órgano jurisdiccional le faciliten el acceso a la justicia y les presten los servicios que constitucionalmente'+
                     ' tienen encomendados con legalidad, honradez, lealtad, imparcialidad, profesionalismo, eficiencia y eficacia y con la debida diligencia;</p><br><br>'+
                     '<p>III. A contar con información sobre los derechos que en su beneficio existan, como ser atendidos por personal del mismo sexo, o del sexo que la víctima elija,'+
                     ' cuando así lo requieran y recibir desde la comisión del delito atención médica y psicológica de urgencia, así como asistencia jurídica a través de un Asesor jurídico; </p><br><br>'+
                     '<p>IV. A comunicarse, inmediatamente después de haberse cometido el delito con un familiar, e incluso con su Asesor jurídico; </p><br><br>'+
                     '<p>V. A ser informado, cuando así lo solicite, del desarrollo del procedimiento penal por su Asesor jurídico, el Ministerio Público y/o, en su caso, por el Juez o Tribunal; </p><br><br>'+
                     '<p>VI. A ser tratado con respeto y dignidad; </p><br><br>'+
                     '<p>VII. A contar con un Asesor jurídico gratuito en cualquier etapa del procedimiento, en los términos de la legislación aplicable; </p>'+
                     '<p>VIII. A recibir trato sin discriminación a fin de evitar que se atente contra la dignidad humana y se anulen o menoscaben sus derechos y libertades, por lo que la protección de sus'+
                     ' derechos se hará sin distinción alguna; </p><br><br><p>IX. A acceder a la justicia de manera pronta, gratuita e imparcial respecto de sus denuncias o querellas; </p><br><br>'+
                     '<p>X. A participar en los mecanismos alternativos de solución de controversias; </p><br><br>'+
                     '<p>XI. A recibir gratuitamente la asistencia de un intérprete o traductor desde la denuncia hasta la conclusión del procedimiento penal, cuando la víctima u ofendido pertenezca '+
                     'a un grupo étnico o pueblo indígena o no conozca o no comprenda el idioma español; </p><br><br>'+
                     '<p>XII. En caso de tener alguna discapacidad, a que se realicen los ajustes al procedimiento penal que sean necesarios para salvaguardar sus derechos; </p><br><br>'+
                     '<p>XIII. A que se le proporcione asistencia migratoria cuando tenga otra nacionalidad;&nbsp;</p>'
                );
                var html_textofila3  = htmlToPdfmake(
                     '<p>XIV. A que se le reciban todos los datos o elementos de prueba pertinentes con los que cuente, tanto en la investigación como en el proceso, a que se desahoguen las diligencias'+
                     ' correspondientes, y a intervenir en el juicio e interponer los recursos en los términos que establece este Código; </p><br><br><p>XV. A intervenir en todo el procedimiento por sí '+
                     'o a través de su Asesor jurídico, conforme lo dispuesto en este Código; </p><br><br><p>XVI. A que se le provea protección cuando exista riesgo para su vida o integridad personal; </p><br><br>'+
                     '<p>XVII. A solicitar la realización de actos de investigación que en su caso correspondan, salvo que el Ministerio Público considere que no es necesario, debiendo fundar y'+
                     ' motivar su negativa; </p><br><br><p>XVIII. A recibir atención médica y psicológica o a ser canalizado a instituciones que le proporcionen estos servicios,'+
                     ' así como a recibir protección especial de su integridad física y psíquica cuando así lo solicite, o cuando se trate de delitos que así lo requieran; </p><br><br>'+
                     '<p>XIX. A solicitar medidas de protección, providencias precautorias y medidas cautelares; </p><br><br><p>XX. A solicitar el traslado de la autoridad al lugar en donde se encuentre,'+
                     ' para ser interrogada o participar en el acto para el cual fue citada, cuando por su edad, enfermedad grave o por alguna otra imposibilidad física o psicológica se dificulte su '+
                     'comparecencia, a cuyo fin deberá requerir la dispensa, por sí o por un tercero, con anticipación; </p><br><br><p>XXI. A impugnar por sí o por medio de su representante, las omisiones'+
                     ' o negligencia que cometa el Ministerio Público en el desempeño de sus funciones de investigación, en los términos previstos en este Código y en las demás disposiciones legales aplicables;</p><br><br>'+
                     '<p>XXII. A tener acceso a los registros de la investigación durante el procedimiento, así como a obtener copia gratuita de éstos, salvo que la información esté sujeta a reserva así determinada'+
                     ' por el Órgano jurisdiccional; </p><br><br><p>XXIII. A ser restituido en sus derechos, cuando éstos estén acreditados; </p><br><br><p>XXIV. A que se le garantice la reparación del daño durante'+
                     ' el procedimiento en cualquiera de las formas previstas en este Código;</p><br><br><p>XXV. A que se le repare el daño causado por la comisión del delito, pudiendo solicitarlo directamente al Órgano'+
                     ' jurisdiccional, sin perjuicio de que el Ministerio Público lo solicite; </p><br><br><p>XXVI. Al resguardo de su identidad y demás datos personales cuando sean menores de edad, se trate de delitos '+
                     'de violación contra la libertad y el normal desarrollo psicosexual, violencia familiar, secuestro, trata de personas o cuando a juicio del Órgano jurisdiccional sea necesario para su protección, '+
                     'salvaguardando en todo caso los derechos de la defensa; </p><br><br><p>XXVII. A ser notificado del desistimiento de la acción penal y de todas las resoluciones que finalicen el procedimiento,'+
                     ' de conformidad con las reglas que establece este Código; </p><br><br><p>XXVIII. A solicitar la reapertura del proceso cuando se haya decretado su suspensión, y</p><br><br>'+
                     '<p>XXIX. Los demás que establezcan este Código y otras leyes aplicables.</p>'
                );
                var html_textofila4  = htmlToPdfmake(
                     '<p>Una vez que me fueron leídos y explicados mis derechos, los comprendo y recibo una copia de los mismos, firmando al calce.</p><br><br><br><br>'+
                     '<p>NOMBRE DE LA VICTIMA</p><br><p><strong>'+ this.nombre + '</strong></p><br><br><br><br>'+
                     '<p>A T E N T A M E N T E.</p><br>' + this.u_nombre + '<br>' + this.puestoquienregistro  + '<br>'  +  'Adscrito al ' + this.agenciainicial,
                );
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
                                    text: diragencia +"\n"+telagencia+"\n"+ 'www.hidalgo.gob.mx',
                                    style: 'subheaderlogo',
                                    style: 'PiePagina',
                                    margin: [312,12,72,0],
                                    alignment:'right',
                                    absolutePosition: {x: 0, y: 30},
                                },
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
                                //    width: 50,
                                //    absolutePosition: {x: 495, y: 30},
                                //},


                            ]

                    },

                    content: [
                        {
                                    text: u_subProc + "\n" + dirsubproc +"\n"+agencia,
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
                            text:  'Número único de caso (NUC): ' + this.nuc ,
                            style: 'nuc'
                        },
                        '\n\n\n',
                        {
                            text:  'ACTA DE LECTURA DE DERECHOS DE LA VÍCTIMA U OFENDIDO' ,
                            style: 'titulo'
                        },

                        '\n\n',
                        {
                            style: 'table',
                            table: {
                                headerRows: 0,
                                widths: ['*', 'auto'],
                                body: [
                                    [{colSpan: 2,  text:'Fecha' + '\n\n' + this.distritoinicial + ' , Hidalgo a '+ fecha, fontSize: 10, alignment: 'justify'},'' ],
                                    [{colSpan: 2,  text:'Lugar en que se practica:', fontSize: 10, alignment: 'justify'},'' ],
                                    [{colSpan: 2,  text:  html_textofila1 , fontSize: 10, alignment: 'justify'},'' ],
                                    [{colSpan: 2,  text:  html_textofila2 , fontSize: 10, alignment: 'justify'},'' ],
                                    [{colSpan: 2,  text:  html_textofila3 , fontSize: 10, alignment: 'justify'},'' ],
                                    [{colSpan: 2,  text:  html_textofila4 , fontSize: 10, alignment: 'justify'},'' ],
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
                        headertext:{
                            fontSize: 10,
                            bold: true,
                        },
                        fecha:{
                            fontSize: 11,
                            alignment: 'right',
                        },
                        nuc:{
                            fontSize: 12,
                            alignment: 'right',
                            bold: true,
                        },
                        titulo: {
                            fontSize: 17,
                            bold: true,
                            alignment: 'center',

                        },
                        subtitulo:{
                            fontSize: 14,
                            bold: true,
                        },

                        footertext:{
                            fontSize: 10,
                        },
                        texto:{
                            fontSize: 12,
                            alignment: 'justify',
                        },
                        compareciente:{
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                        },
                        ampo:{
                            fontSize: 12,
                            bold: true,
                            alignment: 'left',
                        },


                    }

                }

                    return dd;



            },
            mostrarpdf_LecturaDerechosVictima(){


                var dd = this.crearPdf_LecturaDerechosVictima();
                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");

                if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs;


                }
                    var doc = pdfMake.createPdf(dd);
                    var f = document.getElementById('iframepdf3');
                    var callback = function(url) { f.setAttribute('src',url); }
                    doc.getDataUrl(callback, doc);
                    this.modal_LecturaDerechosVictima=true;

            },
            imprimir_LecturaDerechosVictima(){
                let me=this;
                var dd = me.crearPdf_LecturaDerechosVictima();
                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");

                if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs;
                }
                var doc = pdfMake.createPdf(dd).print();
                me.close();
            } ,

            //************************************************************************* */
             //************************************************************************ */
            // ENTREVISTA  VICTIMA
            crearPdf_LecturaDerechosVictima() {

                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");

                //***************************************************************************** */
                // VARIABLES
                //***************************************************************************** */
                var logo1 = this.logo1;
                var logo3 = this.logo3;
                var logo2 = this.logo2;
                var logo4 = this.logo4;
                var dirsubproc = this.dirsubprocuinicial;
                var agencia = this.agenciainicial;
                var diragencia = this.direccionAgencia;
                var telagencia= this.telefonosAgencia;


                //***************************************************************************** */

                var date = moment(this.fechaelevanuc, 'YYYY-MM-DD HH:mm:ss');
                var dia = moment(date).format("DD");
                var mes = moment(date).format('MMMM');
                var año= moment(date).format("YYYY");
                var hr= moment(date).format('h:mm:ss a');
                var fecha = dia + " de " + mes  + " del " + año
                //***************************************************************************** */
                var html_textofila1  = htmlToPdfmake(
                     '<p>En este acto, el(la) Agente del Ministerio Público hace saber a la víctima (s) u ofendido (s) C.<strong>'+ this.nombre + '</strong>'+
                     ' que el <strong>Artículo 20 apartado C de la Constitución Política de los Estados Unidos Mexicanos</strong> le otorga los siguientes derechos:</p><br><br>'+
                     '<p class="ql-align-justify">I. Recibir asesoría jurídica; ser informado de los derechos que en su favor establece la Constitución y, cuando lo solicite, ser informado del desarrollo '+
                     'del procedimiento penal; </p><br><br><p>II. Coadyuvar con el Ministerio Público; a que se le reciban todos los datos o elementos de prueba con los que cuente, '+
                     'tanto en la investigación como en el proceso, a que se desahoguen las diligencias correspondientes, y a intervenir en el juicio e interponer los recursos en los términos que prevea la ley.'+
                     ' Cuando el Ministerio Público considere que no es necesario el desahogo de la diligencia, deberá fundar y motivar su negativa; </p><br><br><p>'+
                     'III. Recibir, desde la comisión del delito, atención médica y psicológica de urgencia; </p><br><br><p>IV. Que se le repare el daño. En los casos en que sea procedente,'+
                     ' el Ministerio Público estará obligado a solicitar la reparación del daño, sin menoscabo de que la víctima u ofendido lo pueda solicitar directamente, y el juzgador no podrá absolver'+
                     ' al sentenciado de dicha reparación si ha emitido una sentencia condenatoria. La ley fijará procedimientos ágiles para ejecutar las sentencias en materia de reparación del daño; </p>'+
                     '<br><br><p>V. Al resguardo de su identidad y otros datos personales en los siguientes casos: cuando sean menores de edad; cuando se trate de delitos de violación, '+
                     'trata de personas, secuestro o delincuencia organizada; y cuando a juicio del juzgador sea necesario para su protección, salvaguardando en todo caso los derechos de la defensa. '+
                     'El Ministerio Público deberá garantizar la protección de víctimas, ofendidos, testigos y en general todos los sujetos que intervengan en el proceso. Los jueces deberán vigilar el'+
                     ' buen cumplimiento de esta obligación; </p><br><br><p>VI. Solicitar las medidas cautelares y providencias necesarias para la protección y restitución de sus derechos,'+
                     ' y </p><br><br><p>VII. Impugnar ante autoridad judicial las omisiones del Ministerio Público en la investigación de los delitos, así como las resoluciones de reserva,'+
                     ' no ejercicio, desistimiento de la acción penal o suspensión del procedimiento cuando no esté satisfecha la reparación del daño.</p><p><br></p>'
                );
                var html_textofila2  = htmlToPdfmake(
                     '<p>De igual forma se le hace saber que el artículo <strong>109 del Código Nacional de Procedimientos Penales</strong> le otorga los siguientes derechos:</p><br><br>'+
                     '<p>I. A ser informado de los derechos que en su favor le reconoce la Constitución; </p><br><br>'+
                     '<p>II. A que el Ministerio Público y sus auxiliares, así como el Órgano jurisdiccional le faciliten el acceso a la justicia y les presten los servicios que constitucionalmente'+
                     ' tienen encomendados con legalidad, honradez, lealtad, imparcialidad, profesionalismo, eficiencia y eficacia y con la debida diligencia;</p><br><br>'+
                     '<p>III. A contar con información sobre los derechos que en su beneficio existan, como ser atendidos por personal del mismo sexo, o del sexo que la víctima elija,'+
                     ' cuando así lo requieran y recibir desde la comisión del delito atención médica y psicológica de urgencia, así como asistencia jurídica a través de un Asesor jurídico; </p><br><br>'+
                     '<p>IV. A comunicarse, inmediatamente después de haberse cometido el delito con un familiar, e incluso con su Asesor jurídico; </p><br><br>'+
                     '<p>V. A ser informado, cuando así lo solicite, del desarrollo del procedimiento penal por su Asesor jurídico, el Ministerio Público y/o, en su caso, por el Juez o Tribunal; </p><br><br>'+
                     '<p>VI. A ser tratado con respeto y dignidad; </p><br><br>'+
                     '<p>VII. A contar con un Asesor jurídico gratuito en cualquier etapa del procedimiento, en los términos de la legislación aplicable; </p>'+
                     '<p>VIII. A recibir trato sin discriminación a fin de evitar que se atente contra la dignidad humana y se anulen o menoscaben sus derechos y libertades, por lo que la protección de sus'+
                     ' derechos se hará sin distinción alguna; </p><br><br><p>IX. A acceder a la justicia de manera pronta, gratuita e imparcial respecto de sus denuncias o querellas; </p><br><br>'+
                     '<p>X. A participar en los mecanismos alternativos de solución de controversias; </p><br><br>'+
                     '<p>XI. A recibir gratuitamente la asistencia de un intérprete o traductor desde la denuncia hasta la conclusión del procedimiento penal, cuando la víctima u ofendido pertenezca '+
                     'a un grupo étnico o pueblo indígena o no conozca o no comprenda el idioma español; </p><br><br>'+
                     '<p>XII. En caso de tener alguna discapacidad, a que se realicen los ajustes al procedimiento penal que sean necesarios para salvaguardar sus derechos; </p><br><br>'+
                     '<p>XIII. A que se le proporcione asistencia migratoria cuando tenga otra nacionalidad;&nbsp;</p>'
                );
                var html_textofila3  = htmlToPdfmake(
                     '<p>XIV. A que se le reciban todos los datos o elementos de prueba pertinentes con los que cuente, tanto en la investigación como en el proceso, a que se desahoguen las diligencias'+
                     ' correspondientes, y a intervenir en el juicio e interponer los recursos en los términos que establece este Código; </p><br><br><p>XV. A intervenir en todo el procedimiento por sí '+
                     'o a través de su Asesor jurídico, conforme lo dispuesto en este Código; </p><br><br><p>XVI. A que se le provea protección cuando exista riesgo para su vida o integridad personal; </p><br><br>'+
                     '<p>XVII. A solicitar la realización de actos de investigación que en su caso correspondan, salvo que el Ministerio Público considere que no es necesario, debiendo fundar y'+
                     ' motivar su negativa; </p><br><br><p>XVIII. A recibir atención médica y psicológica o a ser canalizado a instituciones que le proporcionen estos servicios,'+
                     ' así como a recibir protección especial de su integridad física y psíquica cuando así lo solicite, o cuando se trate de delitos que así lo requieran; </p><br><br>'+
                     '<p>XIX. A solicitar medidas de protección, providencias precautorias y medidas cautelares; </p><br><br><p>XX. A solicitar el traslado de la autoridad al lugar en donde se encuentre,'+
                     ' para ser interrogada o participar en el acto para el cual fue citada, cuando por su edad, enfermedad grave o por alguna otra imposibilidad física o psicológica se dificulte su '+
                     'comparecencia, a cuyo fin deberá requerir la dispensa, por sí o por un tercero, con anticipación; </p><br><br><p>XXI. A impugnar por sí o por medio de su representante, las omisiones'+
                     ' o negligencia que cometa el Ministerio Público en el desempeño de sus funciones de investigación, en los términos previstos en este Código y en las demás disposiciones legales aplicables;</p><br><br>'+
                     '<p>XXII. A tener acceso a los registros de la investigación durante el procedimiento, así como a obtener copia gratuita de éstos, salvo que la información esté sujeta a reserva así determinada'+
                     ' por el Órgano jurisdiccional; </p><br><br><p>XXIII. A ser restituido en sus derechos, cuando éstos estén acreditados; </p><br><br><p>XXIV. A que se le garantice la reparación del daño durante'+
                     ' el procedimiento en cualquiera de las formas previstas en este Código;</p><br><br><p>XXV. A que se le repare el daño causado por la comisión del delito, pudiendo solicitarlo directamente al Órgano'+
                     ' jurisdiccional, sin perjuicio de que el Ministerio Público lo solicite; </p><br><br><p>XXVI. Al resguardo de su identidad y demás datos personales cuando sean menores de edad, se trate de delitos '+
                     'de violación contra la libertad y el normal desarrollo psicosexual, violencia familiar, secuestro, trata de personas o cuando a juicio del Órgano jurisdiccional sea necesario para su protección, '+
                     'salvaguardando en todo caso los derechos de la defensa; </p><br><br><p>XXVII. A ser notificado del desistimiento de la acción penal y de todas las resoluciones que finalicen el procedimiento,'+
                     ' de conformidad con las reglas que establece este Código; </p><br><br><p>XXVIII. A solicitar la reapertura del proceso cuando se haya decretado su suspensión, y</p><br><br>'+
                     '<p>XXIX. Los demás que establezcan este Código y otras leyes aplicables.</p>'
                );
                var html_textofila4  = htmlToPdfmake(
                     '<p>Una vez que me fueron leídos y explicados mis derechos, los comprendo y recibo una copia de los mismos, firmando al calce.</p><br><br><br><br>'+
                     '<p>NOMBRE DE LA VICTIMA</p><br><p><strong>'+ this.nombre + '</strong></p><br><br><br><br>'+
                     '<p>A T E N T A M E N T E.</p><br>' + this.u_nombre + '<br>' + this.puestoquienregistro  + '<br>'  +  'Adscrito al ' + this.agenciainicial,
                );
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
                                    text: diragencia +"\n"+telagencia+"\n"+ 'www.hidalgo.gob.mx',
                                    style: 'subheaderlogo',
                                    style: 'PiePagina',
                                    margin: [312,12,72,0],
                                    alignment:'right',
                                    absolutePosition: {x: 0, y: 30},
                                },
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
                                //    width: 50,
                                //    absolutePosition: {x: 495, y: 30},
                                //},

                            ]

                    },

                    content: [
                        {
                                    text: u_subProc + "\n" + dirsubproc +"\n"+agencia,
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
                            text:  'Número único de caso (NUC): ' + this.nuc ,
                            style: 'nuc'
                        },
                        '\n\n\n',
                        {
                            text:  'ACTA DE LECTURA DE DERECHOS DE LA VÍCTIMA U OFENDIDO' ,
                            style: 'titulo'
                        },

                        '\n\n',
                        {
                            style: 'table',
                            table: {
                                headerRows: 0,
                                widths: ['*', 'auto'],
                                body: [
                                    [{colSpan: 2,  text:'Fecha: ' +  this.distritoinicial + ' , Hidalgo a '+ fecha, fontSize: 10, alignment: 'justify'},'' ],
                                    [{colSpan: 2,  text:'Lugar en que se practica:', fontSize: 10, alignment: 'justify'},'' ],
                                    [{colSpan: 2,  text:  html_textofila1 , fontSize: 10, alignment: 'justify'},'' ],
                                    [{colSpan: 2,  text:  html_textofila2 , fontSize: 10, alignment: 'justify'},'' ],
                                    [{colSpan: 2,  text:  html_textofila3 , fontSize: 10, alignment: 'justify'},'' ],
                                    [{colSpan: 2,  text:  html_textofila4 , fontSize: 10, alignment: 'justify'},'' ],
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
                        headertext:{
                            fontSize: 10,
                            bold: true,
                        },
                        fecha:{
                            fontSize: 11,
                            alignment: 'right',
                        },
                        nuc:{
                            fontSize: 12,
                            alignment: 'right',
                            bold: true,
                        },
                        titulo: {
                            fontSize: 17,
                            bold: true,
                            alignment: 'center',

                        },
                        subtitulo:{
                            fontSize: 14,
                            bold: true,
                        },

                        footertext:{
                            fontSize: 10,
                        },
                        texto:{
                            fontSize: 12,
                            alignment: 'justify',
                        },
                        compareciente:{
                            fontSize: 12,
                            bold: true,
                            alignment: 'right',
                        },
                        ampo:{
                            fontSize: 12,
                            bold: true,
                            alignment: 'left',
                        },


                    }

                }

                    return dd;



            },
            mostrarpdf_LecturaDerechosVictima(){


                var dd = this.crearPdf_LecturaDerechosVictima();
                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");

                if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs;


                }
                    var doc = pdfMake.createPdf(dd);
                    var f = document.getElementById('iframepdf3');
                    var callback = function(url) { f.setAttribute('src',url); }
                    doc.getDataUrl(callback, doc);
                    this.modal_LecturaDerechosVictima=true;

            },
            imprimir_LecturaDerechosVictima(){
                let me=this;
                var dd = me.crearPdf_LecturaDerechosVictima();
                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");

                if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs;
                }
                var doc = pdfMake.createPdf(dd).print();
                me.close();
            } ,

            //************************************************************************* */

            guardarDS(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                 if (me.direccionsuceso =="")
                 {
                     this.$cat.post('api/DireccionDelitoes/Crear',{
                        'idrhecho':  me.rHechoId,
                        'lugarEspecifico': me.lugarespecifico,
                        'calle': me.calle,
                        'noExt': me.noExt,
                        'noInt': me.noInt,
                        'entrecalle1': me.entreCalle1,
                        'entrecalle2': me.entreCalle2,
                        'referencia': me.referencia,
                        'pais': me.pais,
                        'estado': me.estado,
                        'municipio': me.municipio,
                        'localidad': me.localidad,
                        'cp': me.cp,
                        'lat': me.lat,
                        'lng': me.lng,
                    },configuracion).then(function(response){
                        me.closeDS();
                        me.$notify('¡La información se guardo correctamente!','success')
                        me.listardireccionhecho()
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
                 }
                 else
                 {

                     this.$cat.post('api/DireccionDelitoes/Actualizar',{
                        'idDDelito': me.idDDelito,
                        'idrhecho':  me.rHechoId,
                        'lugarEspecifico': me.lugarespecifico,
                        'calle': me.calle,
                        'noExt': me.noExt,
                        'noInt': me.noInt,
                        'entrecalle1': me.entreCalle1,
                        'entrecalle2': me.entreCalle2,
                        'referencia': me.referencia,
                        'pais': me.pais,
                        'estado': me.estado,
                        'municipio': me.municipio,
                        'localidad': me.localidad,
                        'cp': me.cp,
                        'lat': me.lat,
                        'lng': me.lng,
                    },configuracion).then(function(response){
                        me.closeDS();
                        me.$notify('¡La información se guardo correctamente!','success')
                        me.listardireccionhecho()
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
                 }
            },




           listarCiudades(){
               console.log('Entra a Listarciudades')
                    let me=this;
                    let header={"Authorization" : "Bearer " + this.$store.state.token};
                    let configuracion= {headers : header};
                    var ciudadesArray=[];
                    this.$conf.get('api/Estadoes/Mostrar',configuracion).then(function(response){
                        ciudadesArray=response.data;
                        ciudadesArray.map(function(x){
                            me.ciudades.push({text: x.nombre, value:x.idEstado});

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
           listarPorEstado(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            if (!me.estadoid.value== 0){
                me.estado = me.estadoid.text;
                me.estadoid = me.estadoid.value;
            }

                var municipiosArray=[];
                me.municipios.length = 0;
                this.$conf.get('api/Municipios/ListarPorEstado/'+ me.estadoid,configuracion).then(function(response){

                    municipiosArray=response.data;

                    municipiosArray.map(function(x){
                    me.municipios.push({text: x.nombre,value: x.idMunicipio});
                    });
                    if (me.editedIndex == 1){
                     me.selectMunicipio(me.municipio);
                    }

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
            listarPorMunicipio(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                if (!me.municipioid.value== 0){
                me.municipio = me.municipioid.text;
                me.municipioid = me.municipioid.value;
                }


                var localidadArray=[];
                me.localidades.length = 0;
                this.$conf.get('api/Localidads/MostrarPorMPO/' + me.municipioid,configuracion).then(function(response){
                    localidadArray=response.data;
                    localidadArray.map(function(x){
                        me.localidades.push({text: x.nombre,value: x.idLocalidad});
                    });

                    if (me.editedIndex == 1){
                        me.selectLocalidad(me.localidad);
                    }

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
            listarPorLocalidad(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.localidad = me.localidadid.text;
                me.localidadid = me.localidadid.value;
                this.$conf.get('api/Localidads/MostrarPorLocalidad/' + me.localidadid,configuracion).then(function(response){
                    me.cp=response.data.cp;

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

            buscarPorCP(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/Localidads/MostrarPorCP/' + me.configuracion).then(function(response){
                    //console.log(response)
                    me.estadoid=response.data.idEstado;
                    me.listarPorEstado();
                    me.municipioid=response.data.idMunicipio;
                    me.buscarPorCpMpo()
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
            buscarPorCpMpo(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var localidadArray=[];
                me.localidades.length = 0;
                this.$conf.get('api/Localidads/MostrarPorCPMpo/' + me.municipioid +',' + this.cp,configuracion).then(function(response){
                    localidadArray=response.data;
                    localidadArray.map(function(x){
                        me.localidades.push({text: x.nombre,value: x.idLocalidad});
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

            selectEstado: function(val) {

                let me=this;
                for (var i = 0; i < me.ciudades.length; i++) {
                    if (me.ciudades[i].text === val)
                    {
                        me.estadoid=  me.ciudades[i].value;
                    }
                }
                me.listarPorEstado();
            },
            selectMunicipio: function(val) {
                let me=this;

                for (var i = 0; i < me.municipios.length; i++) {
                    if (me.municipios[i].text === val){

                        me.municipioid=  me.municipios[i].value;
                    }
                }
     
            },
            selectLocalidad: function(val) {

            let me=this;
                for (var i = 0; i < me.localidades.length; i++) {
                    if (me.localidades[i].text === val)
                    {
                        me.localidadid=  me.localidades[i].value;
                    }

                }

            },
 activardialogovana(){
                this.vanabim = this.vanabim2;
                this.dialogvanabim = true;
            },
            actualizarvanabim(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                this.$cat.put('api/RHechoes/ActualizarVanabim',{

                    'IdRHecho': me.rHechoId,
                    'vanabim': me.vanabim,

                    },configuracion).then(function(){
                    me.$notify('La información se actualizo correctamente !!!','success')
                    me.dialogvanabim = false;
                    me.vanabim2 = me.vanabim
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
                            me.$notify('Error al intentar actualizar el registro!!!','error')
                        }
                    });

            },
            activardialogostatus(){

                this.etapa = '';
                this.status = '';
                this.dialostatus = true;
            },
            desactivardialogostatus(){
                
            this.dialostatus = false;

            },
            actualizarstatuscar(){
                
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                if(me.etapa == 'Suspendida' || me.etapa == 'Concluida')
                {
                    this.$cat.get('api/Resolucion/ComprobarRegistroResolucion/' +me.rHechoId,configuracion).then(function(response){

                        this.$cat.put('api/Nucs/Actualizar',{

                            'idNuc': me.idNuc,
                            'statusNUC': me.status,
                            "Etapanuc": me.etapa,


                            },configuracion).then(function(){
                            me.$notify('La información se actualizo correctamente !!!','success')

                                this.$cat.post('api/Historialcarpeta/Crear',{

                                    'RHechoId': me.rHechoId,
                                    'Detalle':  me.status,
                                    'DetalleEtapa': me.etapa,
                                    'UDistrito' : me.u_distrito,
                                    'USubproc': me.u_dirSubPro,
                                    'UAgencia': me.u_agencia,
                                    'Usuario': me.u_nombre,
                                    'UPuesto': me.u_puesto,
                                    'UModulo': me.u_modulo

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

                            me.dialostatus = false;
                            me.listarrHecho();
                            me.listarTableroInactividad();
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
                                me.$notify('Error al intentar actualizar el registro!!!','error')
                            }
                            });
                        }).catch(err => {

                        alert("No puedes actualizar el estatus de conclusión o suspensión si no has hecho su debido registro en resolucion de carpeta");

                        });
                }
                else
                {
                    this.$cat.put('api/Nucs/Actualizar',{

                        'idNuc': me.idNuc,
                        'statusNUC': me.status,
                        "Etapanuc": me.etapa,


                        },configuracion).then(function(){
                        me.$notify('La información se actualizo correctamente !!!','success')

                            this.$cat.post('api/Historialcarpeta/Crear',{

                                'RHechoId': me.rHechoId,
                                'Detalle':  me.status,
                                'DetalleEtapa': me.etapa,
                                'UDistrito' : me.u_distrito,
                                'USubproc': me.u_dirSubPro,
                                'UAgencia': me.u_agencia,
                                'Usuario': me.u_nombre,
                                'UPuesto': me.u_puesto,
                                'UModulo': me.u_modulo

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

                        me.dialostatus = false;
                        me.listarrHecho();
                        me.listarTableroInactividad();
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
                            me.$notify('Error al intentar actualizar el registro!!!','error')
                        }
                        });
                }
                

            },
            imprim1(){

                var printContents = document.getElementById('mapa').outerHTML;
                var w = window.open();
                w.document.write("<div style='position: absolute; left:500px; top:100px;'<h1 style='font-size:10px; color:blue;'>"+printContents+"<h1></div>");
                w.print();

            },
            mostrarmapa(){
            this.center2.lng = + this.lng2
            this.center2.lat = + this.lat2
            this.addMarker2();
            this.geoloc2=2;
            this.modalGeolocalizacion2 = 1;
            },
            imprimirmapa(){
                let me = this;
                me.downloadPdf2('mapa',"mapa")
            },
            btn_geoloc12(){
                this.geoloc2=1;
                this.modalGeolocalizacion2 = 1;
            },
            btn_geoloc22(){
                this.geoloc2=2;
                this.modalGeolocalizacion2 = 1;
            },
            setPlace2(place) {
                    this.markers2= [],
                    this.places2= [],
                    this.currentPlace2 = place;
            },
            addMarker2() {

                const marker = {
                    lat: this.center2.lat,
                    lng: this.center2.lng,

                };
                this.markers2.push({ position: marker });
                this.places2.push(this.currentPlace2);
                this.center2 = marker;
                this.currentPlace2 = null;

            },
            geolocate2: function() {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center2 = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,

                    };
                });
            },
            guardarGeolocalizacion2(){
                if(this.geoloc==1){
                    this.lat2 = this.center2.lat;
                    this.lng2 = this.center2.lng;
                    this.geoloc2=0;
                    this.modalGeolocalizacion2=0;
                }
                if(this.geoloc==2){
                    this.de_lat2 = this.center2.lat;
                    this.de_lng2 = this.center2.lng;
                    this.geoloc2=0;
                    this.modalGeolocalizacion2=0;
                }
            },
            activarterreno(){
               this.opcionesmapa.mapTypeId = 'roadmap'
            },
            activarsatellite(){
                this.opcionesmapa.mapTypeId = 'hybrid'
            },
            aumentarzoorm(){
                this.zoom++;
            },
            disminuirzoom(){
                this.zoom--;
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



            var dirsubproc = this.dirsubprocuinicial;
            var u_agencia = this.agenciainicial;
            var u_subProc= this.u_subproc;
            var diragencia = this.direccionAgencia;
            var telagencia= this.telefonosAgencia;
            var date = moment(this.fechaelevanuc, 'YYYY-MM-DD HH:mm:ss');
            var dia = moment(date).format("DD");
            var mes = moment(date).format('MMMM');
            var año= moment(date).format("YYYY");
            var hr= moment(date).format('h:mm:ss a');
            var fecha = dia + " de " + mes  + " del " + año
            var nuc = this.nuc;
            //***************************************************************************** */
            var html =htmlToPdfmake(
                this.texto
            );
            var html_textofila1 = htmlToPdfmake( this.fila1)
            var html_textofila2 = htmlToPdfmake( this.fila2)
            var html_textofila3 = htmlToPdfmake( this.fila3)
            var html_textofila4 = htmlToPdfmake( this.fila4)
            var control;

            if(this.control == 1)
                control = "ACTA DE LECTURA DE DERECHOS DEL IMPUTADO"
                else if(this.control == 2)
                control = "ACTA DE LECTURA DE DERECHOS DEL IMPUTADO ADOLESCENTE"
                else if(this.control == 3)
                control = "ACTA DE LECTURA DE DERECHOS DE LA VÍCTIMA MENOR DE EDAD"
                else if(this.control == 4)
                control = "ACTA DE LECTURA DE DERECHOS DE LA VÍCTIMA U OFENDIDO"

            //***************************************************************************** */
            var agenciainfodr = this.direccionAgencia
            var agenciainfotel = this.telefonosAgencia

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
                                    absolutePosition: {x: 0, y: 0},
                                },

                                {
                                    text: diragencia +"\n"+telagencia+"\n"+ 'www.hidalgo.gob.mx',
                                    style: 'subheaderlogo',
                                    style: 'PiePagina',
                                    margin: [312,12,72,0],
                                    alignment:'right',
                                    absolutePosition: {x: 0, y: 30},

                                },
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
                                //    width: 50,
                                //    absolutePosition: {x: 495, y: 30},
                                //},


                            ]

                    },

                content: [
                    {
                                    text: u_subProc + "\n" + dirsubproc +"\n"+agencia,
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

                        '\n\n\n',
                        {
                            text:  control ,
                            alignment:'center',
                            style: 'Titulo'
                        },

                        '\n\n',
                        this.control == 1 ?
                        {
                            style: 'table',
                            table: {
                                headerRows: 0,
                                widths: ['*', 'auto'],
                                body: [
                                    [{colSpan: 2,  text:'Fecha: ' +  this.distritoinicial + ' , Hidalgo a '+ this.fechaEntre, style:'Texto'},'' ],
                                    [{colSpan: 2,  text:'Lugar en que se practica:',style:'Texto'},'' ],
                                    [{colSpan: 2,  text:  html_textofila1 ,style:'Texto'},'' ],
                                    [{colSpan: 2,  text:  html_textofila2 ,style:'Texto'},'' ],


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
                        } : "",
                        this.control == 2 ?
                        {
                            style: 'table',
                            table: {
                                headerRows: 0,
                                widths: ['*', 'auto'],
                                body: [
                                    [{colSpan: 2,  text:'Fecha: ' +  this.distritoinicial + ' , Hidalgo a '+ this.fechaEntre, style:'Texto'},'' ],
                                    [{colSpan: 2,  text:'Lugar en que se practica:', fontSize: 10,style:'Texto'},'' ],
                                    [{colSpan: 2,  text:  html_textofila1 , fontSize: 10,style:'Texto'},'' ],
                                    [{colSpan: 2,  text:  html_textofila2 , fontSize: 10,style:'Texto'},'' ],


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
                        } : "",
                         this.control == 3 ?
                        {
                            style: 'table',
                            table: {
                                headerRows: 0,
                                widths: ['*', 'auto'],
                                body: [
                                    [{colSpan: 2,  text:'Fecha: ' +  this.distritoinicial + ' , Hidalgo a '+ this.fechaEntre,style:'Texto'},'' ],
                                    [{colSpan: 2,  text:'Lugar en que se practica:', fontSize: 10,style:'Texto'},'' ],
                                    [{colSpan: 2,  text:  html_textofila1 , fontSize: 10,style:'Texto'},'' ],
                                    [{colSpan: 2,  text:  html_textofila2 , fontSize: 10,style:'Texto'},'' ],
                                    [{colSpan: 2,  text:  html_textofila3 , fontSize: 10,style:'Texto'},'' ],
                                    [{colSpan: 2,  text:  html_textofila4 , fontSize: 10,style:'Texto'},'' ],


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
                        } : "",
                        this.control == 4 ?
                        {
                            style: 'table',
                            table: {
                                headerRows: 0,
                                widths: ['*', 'auto'],
                                body: [
                                    [{colSpan: 2,  text:'Fecha: ' +  this.u_distrito + ' , Hidalgo a '+ this.fechaEntre,style: 'Texto'},'' ],
                                    [{colSpan: 2,  text:'Lugar en que se practica:',style: 'Texto'},'' ],
                                    [{colSpan: 2,  text:  html_textofila1 , style:'Texto'},'' ],
                                    [{colSpan: 2,  text:  html_textofila2 , style:'Texto'},'' ],
                                    [{colSpan: 2,  text:  html_textofila3 , style:'Texto'},'' ],
                                    [{colSpan: 2,  text:  html_textofila4 , style:'Texto'},'' ],
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
                        } : "",


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
                        PiePagina:{
                            fontSize: 7,
                             color:'white',

                        },
                         imgf:{
                            zIndex: 1,
                            position: 'absolute'
                        },
                        Texto:{
                            fontSize: 10,
                            alignment:'justify'
                        },
                        Titulo:{
                            fontSize: 12,
                            bold:true
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
        btn_geoloc(){
            if(this.estadoid !='' && this.municipioid != '' && this.localidadid != '' && this.calle != ''){
                    this.modalGeolocalizacion = 1;
                    this.listener();
                    this.addMarkergeocoder();
            }else
                this.$notify("Los siguientes campos son requeridos para la geolocalización: estado, municipio, localidad, calle",'error')
        },
        listener(){
            //input.focus();
            let me = this;
            var map = new google.maps.Map(document.getElementById('mapa01'));
            var geocoder = new google.maps.Geocoder();

            geocoder.geocode( { 'address': this.calle+" |"+ this.localidadid.text+" |"+this.municipio +" |"+this.estado}, function(results, status) {
                if (status == 'OK') {
                    //console.log( results[0].geometry.location.lat())
                    me.center.lat =+ results[0].geometry.location.lat()
                    //console.log( results[0].geometry.location.lng())
                    me.center.lng =+ results[0].geometry.location.lng()

                } else {
                    alert('La dirección no fue encontrada' + status);
                }
            })
        },
        addMarkergeocoder() {
            const marker = {
                lat: this.center.lat,
                lng: this.center.lng,
            };
            this.markers =[]
            this.places = []
            this.markers.push({ position: marker });
            this.places.push(this.currentPlace);
            this.center = marker;
            this.currentPlace = null;
        },
        updateCoordinates(location) {
            this.lataux = location.latLng.lat()
            this.lngaux = location.latLng.lng()
        },
        updatecenter(){
            this.center.lat = this.lataux;
            this.center.lng = this.lngaux;
        },
        setPlace(place) {
                this.markers= [],
                this.places= [],
                this.currentPlace = place;
        },
        addMarker() {
            if (this.currentPlace) {
                const marker = {
                    lat: this.currentPlace.geometry.location.lat(),
                    lng: this.currentPlace.geometry.location.lng(),

                };
                this.markers.push({ position: marker });
                this.places.push(this.currentPlace);
                this.center = marker;
                this.currentPlace = null;
                }
        },
        geolocate: function() {
            navigator.geolocation.getCurrentPosition(position => {
                this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,

                };
            });
        },
        guardarGeolocalizacion(){

            if(this.lataux != '' && this.lngaux != ''){
                this.lat = this.lataux
                this.lng = this.lngaux
            }else{
                this.lat = this.markers[0].position.lat
                this.lng = this.markers[0].position.lng
            }
            this.modalGeolocalizacion=0;
        },

        closeDS(){
            this.modalDS= 0;
        },

    }
}
</script>
