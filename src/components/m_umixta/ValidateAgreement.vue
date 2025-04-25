<template>
    <v-layout align-start>
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <!-- Componentes de visualización de errores de respuesta HTTP -->
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <n401 v-if = "e401" />
        <n403 v-if = "e403" />
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <!-- Fragmento principal para la visualización de los acuerdos reparatorios de la carpeta -->
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <v-flex v-if = "showpage">
            <v-card>
                <v-container>
                    <v-layout row wrap>
                        <v-flex>
                            <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
                            <!-- Fragmento de header de la vista para visualización de los acuerdos reparatorios -->
                            <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
                            <v-toolbar flat color="white">
                                <!-- Título de la vista -->
                                <v-toolbar-title class="font-weight-regular" >Validación de acuerdos reparatorios.</v-toolbar-title>
                                <v-divider class="mx-2" inset vertical />                                
                                <v-spacer />
                                <!-- Fragmento de botones para edición de la respuesta de validación del acuerdo reparatorio -->                                
                                <v-tooltip bottom v-if="v_editValidate">
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="back()" fab dark small color="success">
                                            <v-icon dark>undo</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Regresar</span>
                                </v-tooltip>
                            </v-toolbar>
                            <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
                            <!-- Fragmento para plasmar la lista de los acuerdos reparatorios para validar -->
                            <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
                            <v-card>
                                <v-container>
                                    <v-layout row wrap>
                                        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
                                        <!-- Fragmento de vista de la lista de los acuerdos reparatorios -->
                                        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->                                        
                                        <v-flex v-if = "!v_editValidate" xl12 lg12 md12 sm12 xs12>
                                            <v-data-table :headers = "headers" :items = "v_Agreements" :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination">
                                                <template slot="items" class="white" slot-scope="props">
                                                    <td>{{ props.item.noExpediente }}</td>
                                                    <td>{{ props.item.nuc }}</td>
                                                    <td>{{ props.item.montoTotal }}</td>
                                                    <td>{{ formatearfechahora(props.item.fechaCelebracionAcuerdo) }}</td>
                                                    <td>{{ props.item.fechaLimiteCumplimiento != null ? formatearfechahora(props.item.fechaLimiteCumplimiento) : 'Fecha no registrada' }}</td>
                                                    <td>{{ props.item.anexo ? props.item.sise : props.item.nosise }}</td>
                                                    <td>{{ props.item.fechasise == null ? 'Sin registro de sise' : formatearfechahora(props.item.fechasise) }}</td>
                                                    <td>
                                                        <template>
                                                            <v-icon v-if = "props.item.statusRespuestaAMP == null" color="default">
                                                                remove                                                                                                                           
                                                            </v-icon>
                                                            <v-icon v-if = "props.item.statusRespuestaAMP == 'Autorizado'" color="success">
                                                                check_circle                                                                                                                           
                                                            </v-icon>
                                                            <v-icon v-if = "props.item.statusRespuestaAMP == 'No autorizado'" color="error">
                                                                cancel
                                                            </v-icon>
                                                        </template>
                                                    </td>
                                                    <td> 
                                                        <v-tooltip bottom>
                                                            <template v-slot:activator="{ on }">
                                                                <v-icon class="mr-2" v-on="on" color="warning" @click="mostrar(props.item)">
                                                                    remove_red_eye
                                                                </v-icon> 
                                                            </template>
                                                            <span>Visualizar acuerdo reparatorio</span>
                                                        </v-tooltip>    
                                                        <v-tooltip bottom>
                                                            <template v-slot:activator="{ on }">
                                                                <v-icon class="mr-2" v-on="on" color="default" @click="validacion(props.item)">
                                                                    border_color
                                                                </v-icon> 
                                                            </template>
                                                            <span>Respuesta</span>
                                                        </v-tooltip> 
                                                    </td>
                                                </template>
                                            </v-data-table>
                                        </v-flex>
                                        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
                                        <!-- Fragmento de vista de los elementos del acuerdo reparatorio del lado izquierdo -->
                                        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
                                        <v-flex v-if = "v_editValidate" xl6 lg6 md6 sm12 xs12>
                                            <v-list one-line>                                                                                                    
                                                <v-list-tile style="margin-top:20px;">
                                                    <v-list-tile-action>
                                                        <v-icon color="default">event</v-icon>
                                                    </v-list-tile-action> 
                                                    <v-list-tile-content>
                                                        <v-list-tile-sub-title>Fecha de celebración del acuerdo:</v-list-tile-sub-title>
                                                        <v-list-tile-title>{{ this.v_fechaCelebracionAcuerdo}}</v-list-tile-title> 
                                                    </v-list-tile-content> 
                                                </v-list-tile> 
                                                <v-list-tile style="margin-top:20px;">
                                                    <v-list-tile-action>
                                                        <v-icon color="default">access_time</v-icon>
                                                    </v-list-tile-action> 
                                                    <v-list-tile-content>
                                                        <v-list-tile-sub-title>Hora de celebración:</v-list-tile-sub-title>
                                                        <v-list-tile-title>{{ this.v_horaCelebracionAcuerdo }}</v-list-tile-title> 
                                                    </v-list-tile-content> 
                                                </v-list-tile>
                                                <v-list-tile style="margin-top:20px;"> 
                                                    <v-list-tile-action>
                                                        <v-icon color="default">event</v-icon>
                                                    </v-list-tile-action>
                                                    <v-list-tile-content>
                                                        <v-list-tile-sub-title>Fecha limite de cumplimiento:</v-list-tile-sub-title>
                                                        <v-list-tile-title>{{ this.v_fechaLimiteCumplimiento}}</v-list-tile-title> 
                                                    </v-list-tile-content> 
                                                </v-list-tile> 
                                                <v-list-tile style="margin-top:20px;"> 
                                                    <v-list-tile-action>
                                                        <v-icon color="default">person</v-icon>
                                                    </v-list-tile-action>
                                                    <v-list-tile-content>
                                                        <v-list-tile-sub-title>Solicitante(s):</v-list-tile-sub-title>
                                                        <v-list-tile-title>{{ this.v_nombreSolicitante }}</v-list-tile-title> 
                                                    </v-list-tile-content> 
                                                </v-list-tile>
                                                <v-list-tile style="margin-top:20px;"> 
                                                    <v-list-tile-action>
                                                        <v-icon color="default">person</v-icon>
                                                    </v-list-tile-action>
                                                    <v-list-tile-content>
                                                        <v-list-tile-sub-title>Requerido(s):</v-list-tile-sub-title>
                                                        <v-list-tile-title>{{ this.v_nombreRequerdio }}</v-list-tile-title> 
                                                    </v-list-tile-content> 
                                                </v-list-tile>                                                                                                                                                                                                 
                                                <v-list-tile style="margin-top:20px;"> 
                                                    <v-list-tile-action>
                                                        <v-icon color="default">dangerous</v-icon>
                                                    </v-list-tile-action>
                                                    <v-list-tile-content>
                                                        <v-list-tile-sub-title>Delito(s):</v-list-tile-sub-title>
                                                        <v-list-tile-title>{{ this.v_delitos }}</v-list-tile-title> 
                                                    </v-list-tile-content> 
                                                </v-list-tile>                                                                                                                                                                                                 
                                            </v-list>
                                        </v-flex>
                                        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
                                        <!-- Fragmento de vista de los elementos del acuerdo reparatorio del lado derecho -->
                                        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
                                        <v-flex v-if = "v_editValidate" xl6 lg6 md6 sm12 xs12>
                                            <v-list one-line> 
                                                <v-list-tile style="margin-top:20px;"> 
                                                    <v-list-tile-action>
                                                        <v-icon color="default">my_location</v-icon>
                                                    </v-list-tile-action>
                                                    <v-list-tile-content>
                                                        <v-list-tile-sub-title>Status de conclusión:</v-list-tile-sub-title>
                                                        <v-list-tile-title>{{ statusCorrect(this.v_statusConclusion) }}</v-list-tile-title> 
                                                    </v-list-tile-content> 
                                                </v-list-tile>                                                                                                
                                                <v-list-tile style="margin-top:20px;"> 
                                                    <v-list-tile-action>
                                                        <v-icon color="default">record_voice_over</v-icon>
                                                    </v-list-tile-action>
                                                    <v-list-tile-content>
                                                        <v-list-tile-sub-title>Metodo utilizado:</v-list-tile-sub-title>
                                                        <v-list-tile-title>{{ this.v_metodoUtilizado }}</v-list-tile-title> 
                                                    </v-list-tile-content> 
                                                </v-list-tile>                                                 
                                                <v-list-tile style="margin-top:20px;"> 
                                                    <v-list-tile-action>
                                                        <v-icon color="default">view_week</v-icon>
                                                    </v-list-tile-action>
                                                    <v-list-tile-content>
                                                        <v-list-tile-sub-title>Periodo de pago:</v-list-tile-sub-title>
                                                        <v-list-tile-title>{{ this.v_periodo }}</v-list-tile-title> 
                                                    </v-list-tile-content> 
                                                </v-list-tile>
                                                <v-list-tile style="margin-top:20px;"> 
                                                    <v-list-tile-action>
                                                        <v-icon color="default">date_range</v-icon>
                                                    </v-list-tile-action>
                                                    <v-list-tile-content>
                                                        <v-list-tile-sub-title>No. de parcialidad:</v-list-tile-sub-title>
                                                        <v-list-tile-title>{{ this.v_noTotalParcialidades }}</v-list-tile-title> 
                                                    </v-list-tile-content> 
                                                </v-list-tile> 
                                                <v-list-tile style="margin-top:20px;"> 
                                                    <v-list-tile-action>
                                                        <v-icon color="default">new_releases</v-icon>
                                                    </v-list-tile-action>
                                                    <v-list-tile-content>
                                                        <v-list-tile-sub-title>Como va a pagar:</v-list-tile-sub-title>
                                                        <v-list-tile-title>{{ this.v_tipoPago }}</v-list-tile-title> 
                                                    </v-list-tile-content> 
                                                </v-list-tile> 
                                                <v-list-tile v-if = "v_montoTotal != ''" style="margin-top:20px;"> 
                                                    <v-list-tile-action>
                                                        <v-icon color="default">attach_money</v-icon>
                                                    </v-list-tile-action>
                                                    <v-list-tile-content>
                                                        <v-list-tile-sub-title>Monto cantidad total:</v-list-tile-sub-title>
                                                        <v-list-tile-title>{{ this.v_montoTotal }}</v-list-tile-title> 
                                                    </v-list-tile-content> 
                                                </v-list-tile> 
                                                <v-list-tile v-if = "v_objetoEspecie != ''" style="margin-top:20px;"> 
                                                    <v-list-tile-action>
                                                        <v-icon color="default">attach_money</v-icon>
                                                    </v-list-tile-action>
                                                    <v-list-tile-content>
                                                        <v-list-tile-sub-title>Objeto o especie:</v-list-tile-sub-title>
                                                        <v-list-tile-title>{{ this.v_objetoEspecie }}</v-list-tile-title> 
                                                    </v-list-tile-content> 
                                                </v-list-tile> 
                                            </v-list>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <!-- Fragmento de modal para formulario de respuesta y validación de acuerdo reparatorio -->
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <v-dialog v-model="dialog" max-width="700px"> 
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar size="30">
                        <v-icon class="grey lighten-2">add</v-icon>
                    </v-avatar>
                    <v-toolbar-title class="subheading">Validación de acuerdo reparatorio</v-toolbar-title>
                    <v-spacer />
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <h3>No de expediente: {{ this.v_noExpediente }}</h3>
                                    <v-autocomplete name="status de validación"
                                        :items="v_statusValidaciones"
                                        v-model="v_statusValidacion"  
                                        label="Status de validacion:" 
                                        v-validate="'required'"    
                                        :error-messages="errors.collect('status de validación')"
                                    />
                                    <v-textarea
                                        outline
                                        name="respuesta"
                                        label="Respuesta" 
                                        v-model="v_respuesta"  
                                        v-validate="'required'"    
                                        :error-messages="errors.collect('respuesta')"
                                    />
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn @click.native="close" >Cancelar</v-btn>
                            <v-btn @click.native="guardar" class="success">Guardar</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text> 
            </v-card>
        </v-dialog>  
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <!-- Fragmento de modal para visualizar el archivo PDF para imprimir -->
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <v-dialog v-model="modal_AR" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer />
                    <v-toolbar-items>
                        <v-btn icon @click="modal_AR= false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <iframe id="iframepdfAR" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no" />
                </v-card-text>
            </v-card>
        </v-dialog>        
    </v-layout>
</template>
<script>
    import axios from 'axios'
    import n401 from './401'
    import n403 from './403'
    import moment from 'moment'
    import { NumberAsString } from  './NumerosLetras.js'

    export default {
        components: {
            n401,
            n403,            
        },
        data: function () {
            return {
                //* Variables de componentes de falla
                e401: false,
                e403: false,
                //* Variables de información global de cuenta
                logo1: '',
                logo2: '',
                logo3: '',
                logo4: '',
                direccionAgencia: '',
                telefonosAgencia: '',
                contactoDSP: '',
                nombreDSP: '',
                cargoDSP: '',
                distritoDSP: '',
                u_iddistrito: '',
                u_distrito: '',
                u_dirSubPro: '',
                u_idagencia: '',
                u_agencia: '',
                u_idmoduloservicio: '',
                u_modulo: '',
                u_idusuario: '',
                u_nombre: '',
                u_clave: '',
                u_rol: '',
                u_puesto: '',
                u_email: '',
                u_rhechoid: '',                
                //* Variables de funcionalidad de vistas
                showpage: true,
                dialog: false,
                headers: [
                    { text: 'No Expediente', value: 'noExpediente' },
                    { text: 'NUC', value: 'nuc' },
                    { text: 'Monto total', value: 'montoTotal' },
                    { text: 'Fecha celebracion', value: 'fechaCelebracionAcuerdo' },
                    { text: 'Fecha cumplimiento', value: 'fechalimiteCumplimiento' },
                    { text: 'SISE', value: 'nosise' },
                    { text: 'Fecha SISE', value: 'fechasise' },
                    { text: 'Status', value: 'statusRespuestaCoordinadorJuridico' },
                    { text: 'Opciones', value: 'opciones' },
                ],
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 20
                },
                v_statusValidaciones: ['Autorizado', 'No autorizado'],
                modal_AR: false,
                //* Variables de Acuerdos reparatorios
                v_envioId: '',
                v_expediente: '',
                v_ExistsAgreements: false,
                v_editValidate: false,
                v_Agreements: [],
                v_noExpediente: '',
                v_statusValidacion: '',
                v_respuesta: '',
                v_idAcuerdoReparatorio: '',
                v_nombreSolicitante: '',
                v_nombreRequerdio: '',
                v_delitos: '',
                v_statusConclusion: '',
                v_statusCumplimiento: '',
                v_tipoPago: '',
                v_metodoUtilizado: '',
                v_montoTotal: 0,
                v_objetoEspecie: '',
                v_noTotalParcialidades: 0,
                v_periodo: 0,
                v_fechaCelebracionAcuerdo: '',
                v_horaCelebracionAcuerdo: '',
                v_fechaLimiteCumplimiento: '',
                v_statusRespuestaCoordinadorJuridico: '',
                v_respuestaCoordinadorJuridico: '',
                v_fechaHoraRespuestaCoordinadorJuridico: '',
                v_statusRespuestaAMP: '',
                v_respuestaAMP: '',
                v_fechaRespuestaAMP: '',
                v_textoAR: '',
                v_uf_Distrito: '',
                v_uf_DirSubProc: '',
                v_uf_Agencia: '',
                v_uf_Modulo: '',
                v_uf_Nombre: '',
                v_uf_Puesto: '',
                v_nosise: '',
                v_fechasise: '',
                v_autoridadqueDeriva: '',
                v_uqe_Distrito: '',
                v_uqe_DirSubProc: '',
                v_uqe_Agencia: '',
                v_uqe_Modulo: '',
                v_uqe_Nombre: '',
                v_uqe_Puesto: '',
                v_statusGeneral: '',
                v_conjuntoId: '',
                //* Variables para los solicitantes y requeridos
                a_solicitantes: [],
                a_requeridos: [],
                a_namesSol: '',
                a_namesReq: '',
                //* Variables requeridas para el PDF
                genderSol: '',
                genderReq: ''
            }    
        },
        created() {
            let me = this  
            //* variables generales de cuenta
            me.u_iddistrito = me.$store.state.usuario.iddistrito
            me.u_distrito = me.$store.state.usuario.distrito
            me.u_dirSubPro = me.$store.state.usuario.dirSubProc
            me.u_idagencia = me.$store.state.usuario.idagencia
            me.u_agencia = me.$store.state.usuario.agencia
            me.u_idmoduloservicio = me.$store.state.usuario.idmoduloservicio
            me.u_modulo = me.$store.state.usuario.modulo
            me.u_idusuario = me.$store.state.usuario.idusuario
            me.u_nombre = me.$store.state.usuario.usuario
            me.u_clave = me.$store.state.usuario.clave
            me.u_rol = me.$store.state.usuario.rol
            me.u_puesto = me.$store.state.usuario.puesto
            me.u_email = me.$store.state.usuario.email
            me.u_rhechoid = me.$store.state.rhechoid
            //* funciones de llamado inicial
            me.listarLogo()
            me.informacionagencia()
            me.buscarexpedientesXDistrito()
        },
        computed: {
            
        },
        watch: {
            v_envioId(val) {
                let me = this
                let header={"Authorization" : `Bearer ${me.$store.state.token}`}
                let configuracion = { headers: header }

                if (me.v_conjuntoId != '' && me.v_conjuntoId != '00000000-0000-0000-0000-000000000000') {
                    this.$justiciarestaurativa.get(`api/SolicitanteRequeridoes/ListarPersonasConSinConjunto/${val}/${me.v_conjuntoId}`, configuracion)
                        .then(response => {
                            response.data.map(person => {
                                if (person.tipo == 'Solicitante') {
                                    me.a_solicitantes.push(person)
                                    me.genderSol == ''
                                        ? (
                                            person.sexo == 'H' ? me.genderSol = 'El' : me.genderSol = 'La'
                                        )
                                        : (
                                            me.genderSol = 'Los'
                                        )
                                } else {
                                    me.a_requeridos.push(person)
                                    me.genderReq == ''
                                        ? (
                                            person.sexo == 'H' ? me.genderReq == 'El' : me.genderReq = 'La'
                                        )
                                        : (
                                            me.genderReq = 'Los'
                                        )
                                }
                            })
                        })                    
                }


            }
        },
        methods: {
            //* -----------------------------------------------------------------------------------------------------------------------------------
            //* FUNCIONES GLOBALES DE INFORMACIÓN DE LA CUENTA Y DE DOCUMENTACIÓN
            //* -----------------------------------------------------------------------------------------------------------------------------------
            listarLogo(){ 
                let me = this; 
                
                me.$conf.get('api/ConfGlobals/Listar')
                    .then(function (response) {
                        me.logo1 = response.data.logo1;
                        me.logo2 = response.data.logo2;
                        me.logo3 = response.data.logo3;
                        me.logo4 = response.data.logo4;
                        
                    }).catch(function(error){
                        me.$notify('Error al leer la configuracion global !!!','error')    
                    });
            },
            informacionagencia(){
                let me = this
                let header = {"Authorization" : `Bearer ${me.$store.state.token}`}
                let configuracion = { headers: header }
                
                me.$conf.get(`api/Agencias/Listarporid/${me.u_idagencia}`, configuracion)
                    .then((response) => {
                        me.direccionAgencia = response.data.direccion;
                        me.telefonosAgencia = response.data.telefono;
                        me.contactoDSP = response.data.contacotDirSub;
                        me.nombreDSP = response.data.nombreDirSub;
                        me.distritoDSP = response.data.nombreDistrito;
                        me.cargoDSP = response.data.cargoResponsable;
                    })
                    .catch((error) => {
                        me.$notify('Error al intentar leer la informacion de agencia!!!','error')   
                    });
            },            
            //* -----------------------------------------------------------------------------------------------------------------------------------
            //* FUNCIONES PARA OBTENCIÓN Y ACCIONES DE LOS ACUERDOS REPARATORIOS
            //* -----------------------------------------------------------------------------------------------------------------------------------
            buscarexpedientesXDistrito(){
                let me = this; 
                let header={"Authorization" : `Bearer ${me.$store.state.token}`}
                let configuracion = { headers: header };                
                
                me.$justiciarestaurativa.get(`api/AsignacionEnvios/ListarARXDistritoXRhechoid/${me.u_iddistrito}/${me.u_rhechoid}`, configuracion)
                    .then((response) => {                                 
                        var auxResponse = []

                        if (!response.data.includes("estatus")) {
                            if (response.data.length > 0) {
                                me.v_ExistsAgreements = true 
    
                                response.data.map(qwe => {                                
                                    if (qwe.attached != null) {     
                                        auxResponse.push(qwe)                                                                   
                                        qwe.attached.map(h => {                                        
                                            auxResponse.push(h)                                
                                        })
            
                                        me.v_Agreements = auxResponse
                                    } else {                                    
                                        auxResponse.push(qwe)

                                        me.v_Agreements = auxResponse
                                    }
                                })                            
                            } else {
                                me.v_ExistsAgreements = false     
                            }                            
                        } else {
                            me.v_ExistsAgreements = false     
                        }
                        
                    })
                    .catch((error) => {
                        if (error.response.status==401){ 
                            me.e401 = true,
                            me.showpage= false
                        } else if (error.response.status==403){  
                            me.e403= true
                            me.showpage= false 
                        } else if (error.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify(error.message,'error')     
                        } 
                    }); 
            },
            validacion(item){ 
                let me = this;
                
                me.v_idAcuerdoReparatorio = item.idAcuerdoReparatorio;
                me.v_noExpediente= item.noExpediente;                
                me.dialog=true;
            },
            mostrar(item) {                 
                let me = this;                 

                me.v_editValidate = true,
                me.v_envioId = item.envioId,
                me.v_expediente = item.noExpediente
                me.v_idAcuerdoReparatorio = item.idAcuerdoReparatorio,
                me.v_nombreSolicitante = item.nombreSolicitante
                me.v_nombreRequerdio = item.nombreRequerdio.replace(";", ",")
                me.v_delitos = item.delitos
                me.v_statusConclusion = item.statusConclusion
                me.v_statusCumplimiento = item.statusCumplimiento
                me.v_tipoPago = item.tipoPago
                me.v_metodoUtilizado = item.metodoUtilizado
                me.v_montoTotal = item.montoTotal
                me.v_objetoEspecie = item.objectoEspecie
                me.v_noTotalParcialidades = item.noTotalParcialidades
                me.v_periodo = item.periodo
                me.v_fechaCelebracionAcuerdo = me.formatearfechahora(item.fechaCelebracionAcuerdo).split(" ")[0]
                me.v_horaCelebracionAcuerdo = `${me.formatearfechahora(item.fechaCelebracionAcuerdo).split(" ")[1]} ${me.formatearfechahora(item.fechaCelebracionAcuerdo).split(" ")[2]}`
                me.v_fechaLimiteCumplimiento = item.fechaLimiteCumplimiento != null ? me.formatearfechahora(item.fechaLimiteCumplimiento) : 'Sin fecha registrada'
                me.v_statusRespuestaCoordinadorJuridico = item.statusRespuestaCoordinadorJuridico
                me.v_respuestaCoordinadorJuridico = item.respuestaCoordinadorJuridico
                me.v_fechaHoraRespuestaCoordinadorJuridico = item.fechaHoraRespuestaCoordinadorJuridico
                me.v_statusRespuestaAMP = item.statusRespuestaAMP
                me.v_respuestaAMP = item.respuestaAMP
                me.v_fechaRespuestaAMP = item.fechaRespuestaAMP
                me.v_textoAR = item.textoAR
                me.v_uf_Distrito = item.uf_Distrito
                me.v_uf_DirSubProc = item.uf_DirSubProc
                me.v_uf_Agencia = item.uf_Agencia
                me.v_uf_Modulo = item.uf_Modulo
                me.v_uf_Nombre = item.uf_Nombre
                me.v_uf_Puesto = item.uf_Puesto
                me.v_nosise = item.nosise
                me.v_fechasise = item.fechasise
                me.v_autoridadqueDeriva = item.autoridadqueDeriva
                me.v_uqe_Distrito = item.uf_Distrito
                me.v_uqe_DirSubProc = item.uf_DirSubProc
                me.v_uqe_Agencia = item.uf_Agencia
                me.v_uqe_Modulo = item.uf_Modulo
                me.v_uqe_Nombre = item.uf_Nombre
                me.v_uqe_Puesto = item.uf_Puesto
                me.v_statusGeneral = item.statusGeneral
                me.v_conjuntoId = item.conjuntoDerivacionesId
                me.a_namesSol = item.nombreSolicitante.replaceAll(";",",")
                me.a_namesReq = item.nombreRequerdio.replaceAll(";",",")                

            },
            guardar(){                                             
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion = { headers: header };

                let payload = {
                    'idAcuerdoReparatorio': me.v_idAcuerdoReparatorio,
                    'statusRespuestaAMP': me.v_statusValidacion, 
                    'respuestaAMP': me.v_respuesta,
                }                
                
                me.$justiciarestaurativa.put('api/AcuerdoReparatorios/ActualizarRespuestaMP',payload,configuracion)
                    .then((response) => {
                        me.close();
                        me.$notify('La información se guardo correctamente !!!','success')  
                        me.buscarexpedientesXDistrito();                        
                    })
                    .catch((error) => {
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
            statusCorrect(status) {                
                var statusArray = JSON.parse(status)                
                var textoDirecto = ''

                if (statusArray.Dinero && statusArray.Especie && statusArray.Respeto) {
                    textoDirecto = `Dinero (${statusArray.Dinero}), Especie (${statusArray.Especie}) y Respeto`
                }

                if (statusArray.Dinero && statusArray.Especie && !statusArray.Respeto) {
                    textoDirecto = `Dinero (${statusArray.Dinero}) y Especie (${statusArray.Especie})`
                }

                if (statusArray.Dinero && !statusArray.Especie && statusArray.Respeto) {
                    textoDirecto = `Dinero (${statusArray.Dinero}) y Respeto`
                }

                if (!statusArray.Dinero && statusArray.Especie && statusArray.Respeto) {
                    textoDirecto = `Especie (${statusArray.Especie}) y Respeto`
                }

                if (statusArray.Dinero && !statusArray.Especie && !statusArray.Respeto) {
                    textoDirecto = `${statusArray.Dinero}`
                }

                if (!statusArray.Dinero && statusArray.Especie && !statusArray.Respeto) {
                    textoDirecto = `${statusArray.Especie}`
                }

                if (!statusArray.Dinero && !statusArray.Especie && statusArray.Respeto) {
                    textoDirecto = `Inmediato`
                }

                return textoDirecto
            },
            //* -----------------------------------------------------------------------------------------------------------------------------------
            //* FUNCIONES GENERALES PARA CORRECTO FLUJO DE DATOS
            //* -----------------------------------------------------------------------------------------------------------------------------------
            formatearfechahora: function(fecha){
                return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
            }, 
            limpiar(){
                let me = this; 

                me.v_noExpediente = '',
                me.v_statusValidacion = '',
                me.v_respuesta = '',
                me.v_idAcuerdoReparatorio = '',
                me.v_nombreSolicitante = '',
                me.v_nombreRequerdio = '',
                me.v_delitos = '',
                me.v_statusConclusion = '',
                me.v_statusCumplimiento = '',
                me.v_tipoPago = '',
                me.v_metodoUtilizado = '',
                me.v_montoTotal = 0,
                me.v_objetoEspecie = '',
                me.v_noTotalParcialidades = 0,
                me.v_periodo = 0,
                me.v_fechaCelebracionAcuerdo = '',
                me.v_fechaLimiteCumplimiento = '',
                me.v_statusRespuestaCoordinadorJuridico = '',
                me.v_respuestaCoordinadorJuridico = '',
                me.v_fechaHoraRespuestaCoordinadorJuridico = '',
                me.v_statusRespuestaAMP = '',
                me.v_respuestaAMP = '',
                me.v_fechaRespuestaAMP = '',
                me.v_textoAR = '',
                me.v_uf_Distrito = '',
                me.v_uf_DirSubProc = '',
                me.v_uf_Agencia = '',
                me.v_uf_Modulo = '',
                me.v_uf_Nombre = '',
                me.v_uf_Puesto = '',
                me.v_nosise = '',
                me.v_fechasise = '',
                me.v_autoridadqueDeriva = '',
                me.v_uqe_Distrito = '',
                me.v_uqe_DirSubProc = '',
                me.v_uqe_Agencia = '',
                me.v_uqe_Modulo = '',
                me.v_uqe_Nombre = '',
                me.v_uqe_Puesto = '',
                me.v_statusGeneral = ''               
            },
            close(){
                    this.dialog = false; 
                    this.limpiar();
            },
            back() {
                let me = this

                me.v_editValidate = false
                me.limpiar()
            },
            imprimirAR(){
                this.mostrarpdf(); 
            },
            mostrarpdf() {
                let me = this

                var dd = me.crearPdf();
                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");
                if (pdfMake.vfs == undefined) {
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs;
                }
                var doc = pdfMake.createPdf(dd);
                var f = document.getElementById('iframepdfAR'); 
                var callback = function(url) { f.setAttribute('src',url); }
                doc.getDataUrl(callback, doc);
                me.modal_AR = true; 
            },
            crearPdf() {
                let me = this;

                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake")
                var logo1 = me.logo1
                var logo2 = me.logo2
                var logo3 = me.logo3
                var logo4 = me.logo4
                var diragencia = me.direccionAgencia
                var telagencia= me.telefonosAgencia
                var contactoDSP = me.contactoDSP
                var nombreDSP = me.nombreDSP
                var nombreDistrito = me.distritoDSP
                var cargo = me.cargoDSP || ''

                var vtxt_F = `siendo las ${me.v_horaCelebracionAcuerdo} horas`
                // var vtxt_F = "";
                // if (me.vtxtformat == 'siendo las  horas') {
                //     vtxt_F = "";
                // } else {
                //     vtxt_F = me.vtxtformat;
                // }
                // var num2Let = require('numalet')();
                var dia = me.v_fechaCelebracionAcuerdo.split("/")[0];
                var mes = me.v_fechaCelebracionAcuerdo.split("/")[1];
                var año = me.v_fechaCelebracionAcuerdo.split("/")[2];
                var diatext = NumberAsString(dia);
                var añotext = NumberAsString(año);
                var pdf_distrito = me.v_uqe_Distrito;
                var pdf_dirsubproc = me.v_uqe_DirSubProc;
                // var pdf_agencia = me.v_uqe_Agencia;
                var pdf_usuario = me.v_uqe_Nombre;
                var pdf_puesto = me.v_uqe_Puesto;
                // var pdf_modulo = me.v_uqe_Modulo;
                var fecha = dia + " de " + mes + " del " + año
                
                var html_texto  = htmlToPdfmake(
                    me.v_textoAR
                )

                var sourceDataS = me.a_solicitantes
                var bodyDataSolicitantes = [];
                sourceDataS.forEach(function(sourceRow) {
                    var dataRow = [];
                    bodyDataSolicitantes.push(dataRow)                                
                    dataRow.push(
                        `<p>
                            <strong>Del Solicitante: </strong>${sourceRow.sexo == 'H' ? 'El' : 'La'} C. <strong>${sourceRow.nombreCompleto}</strong>, de Nacionalidad <strong>${sourceRow.nacionalidad}</strong> 
                            originario de <strong>${sourceRow.entidadFederativa == null ? '(dato no registrado)' : sourceRow.entidadFederativa}</strong>, con domicilio  en <strong>${sourceRow.direccion == null ? '(dato no registrado)' : sourceRow.direccion}</strong>, 
                            de <strong>${sourceRow.edad}</strong> años de edad, por haber nacido el <strong>${sourceRow.fechaNacimiento == "Invalid date de Invalid date del Invalid date" ? '(dato no registrado)' : sourceRow.fechaNacimiento}</strong>, 
                            del Estado Familiar <strong>${sourceRow.estadoCivil}</strong> de ocupación <strong>${sourceRow.ocupacion == '' ? '(dato no registrado)' : sourceRow.ocupacion}</strong>, con grado de estudios a nivel 
                            <strong>${sourceRow.nivelEstudio == '' ? '(dato no registrado)' : sourceRow.nivelEstudio}</strong>, clave única de registro de población <strong>${sourceRow.curp}</strong>, que se identifica con el(la) 
                            <strong>${sourceRow.docIdentificacion}</strong> la cual coincide con los rasgos fisonómicos de quien la porta y en este momento le es devuelta por ser de utilidad personal, dejando en su lugar fotocopia simple de la misma para debida constancia.
                        </p>`
                    );                
                });

                var sourceDataR = me.a_requeridos;
                var bodyDataRequeridos = [];
                sourceDataR.forEach(function(sourceRow) {
                    var dataRow = [];                    
                    bodyDataRequeridos.push(dataRow)                                    
                    dataRow.push(
                        `<p>
                            <strong>Del Requerido: </strong>${sourceRow.sexo == 'H' ? 'El' : 'La'} C. <strong>${sourceRow.nombreCompleto}</strong>, de Nacionalidad <strong>${sourceRow.nacionalidad}</strong> 
                            originario de <strong>${sourceRow.entidadFederativa == null ? '(dato no registrado)' : sourceRow.entidadFederativa}</strong>, con domicilio  en <strong>${sourceRow.direccion == null ? '(dato no registrado)' : sourceRow.direccion}</strong>, 
                            de <strong>${sourceRow.edad}</strong> años de edad, por haber nacido el <strong>${sourceRow.fechaNacimiento == "Invalid date de Invalid date del Invalid date" ? '(dato no registrado)' : sourceRow.fechaNacimiento}</strong>, 
                            del Estado Familiar <strong>${sourceRow.estadoCivil}</strong> de ocupación <strong>${sourceRow.ocupacion == '' ? '(dato no registrado)' : sourceRow.ocupacion}</strong>, con grado de estudios a nivel 
                            <strong>${sourceRow.nivelEstudio == '' ? '(dato no registrado)' : sourceRow.nivelEstudio}</strong>, clave única de registro de población <strong>${sourceRow.curp}</strong>, que se identifica con el(la) 
                            <strong>${sourceRow.docIdentificacion}</strong> la cual coincide con los rasgos fisonómicos de quien la porta y en este momento le es devuelta por ser de utilidad personal, dejando en su lugar fotocopia simple de la misma para debida constancia.
                        </p>`
                    );                
                });
                var titulodoc = "";
                var textoprincipal = "";  

                titulodoc = "ACUERDO REPARATORIO"
                textoprincipal = `
                    <p>
                        En la ciudad de  ${pdf_distrito}, Estado de Hidalgo, <strong>${vtxt_F} del día ${dia} ( ${diatext} ) de ${mes} del año ${año} ( ${añotext} )</strong>, se presenta ${me.genderSol.toLowerCase()} <strong>C. ${me.a_namesSol} 
                        </strong> en calidad de solicitante y ${me.genderReq.toLowerCase()} <strong>C. ${me.a_namesReq}</strong> en calidad de requerido, ante el centro de Justicia Restaurativa Penal; de quienes a continuación se detallan sus:
                    </p>
                `
                
                var html_textoprincipal = htmlToPdfmake(
                    textoprincipal
                );

                var html_solicitantes = htmlToPdfmake(
                    bodyDataSolicitantes
                );

                var html_requeridos = htmlToPdfmake(
                    bodyDataRequeridos
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
                                    text: 'www.hidalgo.gob.mx',
                                    style: 'footertext',
                                    margin: [312,12,72,0],
                                    alignment:'right',
                                    absolutePosition: { x: 0, y: 30 },
                                },
                            ]
                        };
                    },
                    header: function (currentPage, pageCount, pageSize) {
                            return [
                                {
                                    image: logo3,
                                    width: 612,
                                    absolutePosition: { x: 0, y: 0 },
                                },
                            ]
                    },
                    content: [
                        {
                            text: pdf_dirsubproc,
                            style: 'headertext',
                            absolutePosition: { x: 85, y: 95 },
                        },
                        {
                            text:  'EXPEDIENTE: ' + me.v_expediente,
                            style: 'nuc'
                        },
                        '\n\n\n',
                        {
                            text: titulodoc,
                            style: 'titulo'
                        },
                        '\n\n',
                        {
                            text:  html_textoprincipal,
                            style: 'texto'
                        },
                        '\n\n',
                        {
                            text: 'DATOS GENERALES',
                            style: 'subtitulo'
                        },
                        '\n',
                        {
                            style: 'table',
                            table: {
                                headerRows: 1,
                                widths: ['*'],
                                body: [
                                    [html_solicitantes]
                                ]
                            },
                            layout: 'noBorders'
                        },
                        {
                            style: 'table',
                            table: {
                                headerRows: 1,
                                widths: ['*'],
                                body: [
                                    [html_requeridos]
                                ]
                            },
                            layout: 'noBorders'
                        },
                        {
                            text: html_texto,
                            style: 'texto'
                        },
                        '\n\n\n\n',
                        {
                            style: 'table1',
                            table: {
                                headerRows: 1,
                                widths: ['*','*'],
                                body: [
                                    [
                                        { text: 'Solicitante(s).', fontSize: 12, bold: true, alignment: 'center' }, 
                                        { text: 'Requeridos(s).', fontSize: 12, bold: true, alignment: 'center' }
                                    ],
                                    [me.a_namesSol, me.a_namesReq],
                                ]
                            },
                            layout: 'noBorders'
                        },
                        '\n\n\n\n\n\n',
                        {
                            text:  '\n\n' + pdf_usuario + '\n' + pdf_puesto,
                            style: 'ampo'
                        },
                        '\n\n\n\n\n',
                        {
                            text: 'LICENCIADO(A) EN DERECHO ' + contactoDSP + '\n' + cargo.toUpperCase() + ' DEL '+ nombreDSP + ' EN ' + nombreDistrito.toUpperCase(),
                            style: 'ampo'
                        },
                        {
                            text:  'ACUERDO REPARATORIO DEBIDAMENTE VALIDADO EN TÉRMINOS DEL ARTÍCULO 33 PÁRRAFO TERCERO DE LA LEY NACIONAL DE MECANISMOS ALTERATIVOS DE SOLUCIÓN DE CONTROVERSIA EN MATERIA PENAL',
                            style: 'ar'
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
                        subtitulo: {
                            fontSize: 11,
                            bold: false,
                            alignment: 'center',
                        },
                        headertext: {
                            fontSize: 10,
                            bold: true,
                            alignment: 'left',
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
                        ar: {
                            fontSize: 10,
                            regular: true,
                            alignment: 'center',
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
                            alignment: 'center',
                        },
                        cargo: {
                            fontSize: 9,
                            regular: true,
                            alignment: 'left',
                        },
                        table: {
                            fontSize: 10,
                            margin: [0, 5, 0, 15],
                            alignment: 'justify',
                        },
                        table1: {
                            fontSize: 10,
                            margin: [0, 5, 0, 15],
                            alignment: 'center',
                        },
                    }
                }
                return dd;
            },
        }
    }
</script>