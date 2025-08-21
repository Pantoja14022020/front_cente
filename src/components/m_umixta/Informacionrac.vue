<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />

    <UmixtaNavDrawer />

    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Información general.</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-flex xs12 sm6 md3>
          <v-text-field
            class="font-weight-regular"
            v-model="rac"
            disabled
            prepend-icon="folder"
            filled
          ></v-text-field>
        </v-flex>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              class="mx-2 pt-2"
              slot="activator"
              v-on="on"
              @click="cerrarcarpeta"
              fab
              dark
              small
              color="primary"
            >
            <v-icon class="mt-1" dark>close</v-icon>
            </v-btn>
          </template>
          <span>Cerrar RAC</span>
        </v-tooltip>
      </v-toolbar>

      <v-flex xs12 sm12 md12 lg12>
        <v-card flat color="white" grid-list-md text-md-right fluid fill-height>
          <br />
          <br />
          <v-layout row d-flex>
            <v-card elevation="0">
              <v-card-title class="accent">
                <h3>Información general</h3>
              </v-card-title>
              <v-card-text>
                <table>
                  <tr>
                    <td style="width: 180px">Víctima y/u ofendido:</td>
                    <td>
                      <b> {{ nombre }}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Tipo de víctima:</td>
                    <td>
                      <b> {{ tvictima }}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Tipo de persona:</td>
                    <td>
                      <b>{{ tipopersona }} </b>
                    </td>
                  </tr>
                  <tr>
                    <td>CURP</td>
                    <td>
                      <b>{{ curp }} </b>
                    </td>
                  </tr>
                  <tr>
                    <td>Medio de notificación:</td>
                    <td>
                      <b v-if="medionotificacion">{{ medionotificacion }}</b>
                      <span class="text-grey-light" v-else>No registrado</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Teléfonos:</td>
                    <td>
                      <b v-if='tel'>{{ tel }}</b>
                      <span class="text-grey-light" v-else>No registrado</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Correo:</td>
                    <td>
                      <b v-if='email'>{{ email }}</b>
                      <span class="text-grey-light" v-else>No registrado</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Dirección:</td>
                    <td>
                      <b v-if='direccion'>{{ direccion }}</b>
                      <span class="text-grey-light" v-else>No registrado</span>
                    </td>
                  </tr>
                  <br />
                </table>
              </v-card-text>
            </v-card>
            <v-card elevation="0">
              <v-card-title class="accent">
                <h3>Información complementaria</h3>
              </v-card-title>
              <v-card-text>
                <table>
                  <tr>
                    <td style="width: 180px">Nacionalidad:</td>
                    <td>
                      <b> {{ nacionalidad }}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Estado familiar:</td>
                    <td>
                      <b v-if='estadocivil'>{{ estadocivil }}</b>
                      <span class="text-grey-light" v-else>No registrado</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Género:</td>
                    <td>
                      <b v-if='genero'>{{ genero }}</b>
                      <span class="text-grey-light" v-else>No registrado</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ocupación:</td>
                    <td>
                      <b v-if='ocupacion'>{{ ocupacion }}</b>
                      <span class="text-grey-light" v-else>No registrado</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Nivel de estudios:</td>
                    <td>
                      <b v-if='nivelEstudio'>{{ nivelEstudio }}</b>
                      <span class="text-grey-light" v-else>No registrado</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Lengua</td>
                    <td>
                      <b v-if='lengua'>{{ lengua }}</b>
                      <span class="text-grey-light" v-else>No registrado</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Religión:</td>
                    <td>
                      <b v-if='religion'>{{ religion }}</b>
                      <span class="text-grey-light" v-else>No registrado</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Discapacidad:</td>
                    <td>
                       <b v-if='discapacidad'>{{ discapacidad }}</b>
                      <span class="text-grey-light" v-else>No registrado</span>
                    </td>
                  </tr>

                  <br />
                </table>
              </v-card-text>
            </v-card>

            <v-card elevation="0">
              <v-card-title class="accent">
                <h3><br /></h3>
              </v-card-title>
              <v-card-text>
                <table>
                  <tr>
                    <td style="width: 180px">Atendido por</td>
                    <td>
                      <b> {{ registradopor }}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Distrito de origen:</td>
                    <td>
                      <b> {{ distritoinicial }}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Dirección o subprocuraduria:</td>
                    <td>
                      <b> {{ dirsubprocuinicial }}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Agencia origen:</td>
                    <td>
                      <b> {{ agenciainicial }}</b>
                    </td>
                  </tr>
                </table>
                <v-divider class="mx-0" inset horizontal></v-divider>
                <table>
                  <tr>
                    <td style="width: 180px">Fecha del registro del RAC:</td>
                    <td style="color: #78be20">
                      <b
                        ><v-icon small>access_time</v-icon>
                        {{
                          fechaAtencion.substring(8, 10) +
                          " de " +
                          obtenermes(fechaAtencion.substring(5, 7) - 1) +
                          " del " +
                          fechaAtencion.substring(0, 4) +
                          ", " +
                          fechaAtencion.substring(11, 19)
                        }}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>Imprimir caratula de RAC</td>
                    <td>
                      <v-btn text icon @click="mostrarpdf_CaratulaRAC">
                        <v-icon>print</v-icon>
                      </v-btn>
                    </td>
                  </tr>

                  <br />
                </table>
              </v-card-text>
            </v-card>
          </v-layout>
          <v-layout row d-flex>
            <v-card elevation="0">
              <v-card-title class="accent">
                <h3>
                  Reseña breve de hechos (Modo, Tiempo, Lugar y circunstancia)
                  Excesivamente breves.
                </h3>
                <!------------------------------------------------------------------------------------------------------  ------------------------------------------------------------------------------------------------------>
                <!------------------------------------------------------------------------------------------------------  ------------------------------------------------------------------------------------------------------>
                <v-tooltip bottom class="justify-right">
                  <template v-slot:activator="{ on }">
                    <v-icon
                      class="mr-2"
                      v-on="on"
                      @click="mostrarEdicionResenaBreve()"
                    >
                      edit
                    </v-icon>
                  </template>
                  <span>Editar Reseña Breve</span>
                </v-tooltip>
                <!------------------------------------------------------------------------------------------------------  ------------------------------------------------------------------------------------------------------>
                <!------------------------------------------------------------------------------------------------------  ------------------------------------------------------------------------------------------------------>
              </v-card-title>
              <v-card-text>
                <p class="break-word" v-html="rBreve"></p>
            </v-card-text>
            </v-card>
          </v-layout>

          <v-layout row d-flex>
            <v-card elevation="0">
              <v-card-title class="accent">
                <h3>Servicios para la atención a victima</h3>
              </v-card-title>
              <v-card-text>
                <v-data-table
                  :headers="headersDiligencias"
                  :items="diligencias"
                  :search="search"
                  :rows-per-page-items="rowsPerPageItems"
                  :pagination.sync="pagination"
                >
                  <template slot="items" class="white" slot-scope="props">
                    <td>{{ props.item.prioridad }}</td>
                    <td>{{ props.item.dirigidoa }}</td>
                    <td>{{ props.item.servicio }}</td>
                    <td>{{ props.item.fechaSolicitud }}</td>
                    <td>{{ props.item.statusRespuesta }}</td>
                    <td class="justify-center layout px-0">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-icon
                            class="mr-2"
                            v-on="on"
                            color="warning"
                            @click="imprimirdiligencia(props.item)"
                          >
                            print
                          </v-icon>
                        </template>
                        <span>Imprimir diligencia</span>
                      </v-tooltip>
                    </td>
                  </template>
                  <template slot="no-data">
                    <v-btn color="primary" @click="listardiligencias()"
                      >Resetear</v-btn
                    >
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
            <v-card elevation="0">
              <v-card-title class="accent">
                <h3>Oficios de derivación</h3>
              </v-card-title>
              <v-card-text>
                <v-data-table
                  :headers="headersDDerivacion"
                  :items="dderivaciones"
                  :search="search"
                  :rows-per-page-items="rowsPerPageItems"
                  :pagination.sync="pagination"
                >
                  <template slot="items" class="white" slot-scope="props">
                    <td>{{ props.item.fechaDerivacion }}</td>
                    <td>{{ props.item.nombreDDerivacion }}</td>
                    <td>{{ props.item.telefono }}</td>
                    <td>{{ props.item.contacto }}</td>
                    <td class="justify-center layout px-0">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-icon
                            class="mr-2"
                            v-on="on"
                            color="warning"
                            @click="impirmirDDerivacion(props.item)"
                          >
                            print
                          </v-icon>
                        </template>
                        <span>Imprimir oficio de derivación</span>
                      </v-tooltip>
                    </td>
                  </template>
                  <template slot="no-data">
                    <v-btn color="primary" @click="listarDDerivacion()"
                      >Resetear</v-btn
                    >
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-layout>
        </v-card>
      </v-flex>
    </v-flex>

    <!------------------------------------------------------------------------------------------------------  ------------------------------------------------------------------------------------------------------>
    <!------------------------------------------------------------------------------------------------------  ------------------------------------------------------------------------------------------------------>

    <v-dialog
      v-model="modEditResena"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Editar Reseña Breve.</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn @click="ActualizarResenaBreve()" color="success"
              >Actualizar</v-btn
            >

            <v-btn icon @click="modEditResena = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-flex mx-5>
          <v-card-text>
            <v-form>
              <br />

              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-card elevation="0">
                      <v-card-title>
                        <h3>Texto de la reseña:</h3>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-form data-vv-scope="form1">
                          <vue-editor name="descripcíon" v-model="rBreve">
                          </vue-editor>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
        </v-flex>
      </v-card>
    </v-dialog>
    <!------------------------------------------------------------------------------------------------------  ------------------------------------------------------------------------------------------------------>
    <!------------------------------------------------------------------------------------------------------  ------------------------------------------------------------------------------------------------------>

    <v-dialog
      v-model="modal_CaratulaRAC"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Documento.</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn color="success" text @click.native="impirmiCaratulaRAC()">
              IMPRIMIR</v-btn
            >
            <v-btn icon @click="close">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <iframe
            id="iframepdf1"
            type="application/pdf"
            width="100%"
            height="835"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="modal_DependeciaDerivacion"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Documento.</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              color="success"
              text
              @click.native="impirmiDependeciaDerivacion()"
            >
              IMPRIMIR</v-btn
            >
            <v-btn icon @click="close">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <iframe
            id="iframepdf2"
            type="application/pdf"
            width="100%"
            height="835"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import VeeValidate from "vee-validate";
import n401 from './401.vue';
import n403 from './403.vue';
import moment from "moment";
import { error } from "util";
import "moment/locale/es";
import { generarQRCodeBase64 } from './crearQRRac';
import Swal from "sweetalert2";
import {firmarDocumento} from "@/helpers/efirma";
import UmixtaNavDrawer from './umixtaNavDrawer.vue';

export default {
  components: {
    n401,
    n403,
    UmixtaNavDrawer
  },
  data() {
    return {      
      editedIndex: -1,
      modalDetalleInformacion: false,
      showpage: true,
      e401: false,
      e403: false,
      headers: [
        { text: "Asignacion", value: "asignacion", sortable: false },
        { text: "RAC", value: "tipoServicio", sortable: false },
        { text: "Distrito", value: "distritoInicial" },
        { text: "Dirección o Subprocuraduria", value: "dirSubProcu" },
        { text: "Agencia", value: "agenciaInicial" },
        { text: "Atendido por", value: "u_Nombre" },
        { text: "Status atención", value: "statusatencion" },
        { text: "Status NUC", value: "statusregistro" },
        { text: "Contención", value: "contencionvictima" },
      ],
      /****************************************************************************** */

      search: "",
      rowsPerPageItems: [10, 20, 30, 40, 50],
      pagination: {
        rowsPerPage: 20,
      },
      /**************** */

      rAtencionId: "",
      rHechoId: "",
      registros: [],
      rac: "",
      //*************** */
      //*************** */
      // INFOMACION DE LA PERSONA
      personaId: 0,
      curp: "",
      nombre: "",
      alias: "",
      tel: "",
      email: "",
      tipopersona: "",
      tvictima: "",
      medionotificacion: "",
      sexo: "",
      genero: "",
      lugarNacimiento: "",
      docIdentificacion: "",
      fnacimiento: "",
      edad: "",
      estadocivil: "",
      nacionalidad: "",
      ocupacion: "",
      lengua: "",
      religion: "",
      nivelEstudio: "",
      discapacidad: "",
      tipodiscapacidad: "",
      parentesco: "",
      direccion: "",
      numerooficio: "",
      //*************** */
      // DIRECCION PERSONAL
      calle: "",
      noExt: "",
      noInt: "",
      entreCalle1: "",
      entreCalle2: "",
      referencia: "",
      pais: "Mexico",

      estado: "",
      estadoid: "",
      ciudades: [],

      municipio: "",
      municipioid: "",
      municipios: [],

      localidad: "",
      localidadid: "",
      localidades: [],
      vialidades: [],

      cp: "",
      //*************** */
      // CARATULA RAC
      modal_CaratulaRAC: false,
      /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
      /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
      modEditResena: false,
      /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
      /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
      registradopor: "",
      puestoquienregistro: "",
      distritoinicial: "",
      dirsubprocuinicial: "",
      agenciainicial: "",
      rBreve: "",
      //*************** */
      // FORMATO DE DILIGENCIAS SERVICIOS PERICIALES
      diligencias: [],
      origenDirSub: "",
      fechaSolicitud: "",
      fechaAtencion: "",
      responsable: "",
      nombreDirSub: "",
      textodiligencia: "",
      nombre: "",
      puesto: "",
      fecha: "",
      textolibre: "",
      textofinal: "",
      headersDiligencias: [
        { text: "Prioridad", value: "prioridad" },
        { text: "Dirigido a", value: "nombre" },
        { text: "Servicio", value: "servicio" },
        { text: "Fecha de solicitud", value: "fechaAD", sortable: false },
        { text: "Status", value: "fechaAD", sortable: false },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      //*************** */
      // FORMATO DEPENDECIA DERIVACION
      modal_DependeciaDerivacion: false,
      dderivaciones: [],
      dd_espesificaciones: "",
      dd_fechaDerivacion: "",
      dd_nombreDDerivacion: "",
      dd_direccionDDerivacion: "",
      dd_telefono: "",
      dd_contacto: "",
      dd_distrito: "",
      dd_nombreDirSub: "",
      dd_agencia: "",
      dd_unombre: "",
      dd_upuesto: "",
      /****************************************************************************** */
      headersDDerivacion: [
        { text: "Fecha", value: "fechaDerivacion" },
        { text: "Dirigido a", value: "nombreDDerivacion" },
        { text: "Teléfono", value: "telefono" },
        { text: "Contacto", value: "contacto" },
        { text: "Opciones", value: "opciones", sortable: false },
      ],

      /****************************************************************************** */

      //******************************** */
      // IFORMACION PARA LOS REPORTES
      logo1: "",
      logo2: "",

      agenciaid: "",
      direccionAgencia: "",
      telefonosAgencia: "",
      //**************************/
      customToolbar: false,
      editorToolbar: [],
      texto: 'Vista Previa',
      qrCode: null,
      docCaratulaRac: 'Caratula de RAC',
      docOficioDer: 'Oficio de derivacion',
      vistaPreviaTF: true,
      idRac:"",
    };
  },

  watch: {},

  created() {
    let me = this;
    me.rHechoId = me.$store.state.rhechoid2;
    me.rac = me.$store.state.rac;
    me.rAtencionId = me.$store.state.ratencionid2;
    if (me.rHechoId == null) {
      me.$alert(
        "Notificación",
        "Aun no ha abierto ningun RAC por favor ingrese al menu RACS y luego en Listar RACS y   ahi abra el rac que usted elija!. En este momento sera redireccionado al menu correspondiente.",
        function () {
          me.$router.push("./umixta-listaracs");
        }
      );
    } else {
      me.$notify("RAC abierto correctamente !!!", "success");

      me.u_iddistrito = me.$store.state.usuario.iddistrito;
      me.u_distrito = me.$store.state.usuario.distrito;
      me.u_dirSubPro = me.$store.state.usuario.dirSubProc;
      me.u_idagencia = me.$store.state.usuario.idagencia;
      me.u_agencia = me.$store.state.usuario.agencia;
      me.u_idmoduloservicio = me.$store.state.usuario.idmoduloservicio;
      me.u_modulo = me.$store.state.usuario.modulo;
      me.u_idusuario = me.$store.state.usuario.idusuario;
      me.u_nombre = me.$store.state.usuario.usuario;
      me.u_clave = me.$store.state.usuario.clave;
      me.u_rol = me.$store.state.usuario.rol;
      me.u_puesto = me.$store.state.usuario.puesto;
      me.u_subproc = me.$store.state.usuario.subProc;

      //*********************************************** */

      this.listarVialidad();
      this.listarrHecho();
      this.listarLogo();
    }

    axios.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        this.$store.commit("LOADER", true);
        return config;
      },
      (error) => {
        // Do something with request error
        this.$store.commit("LOADER", false);
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
      (response) => {
        this.$store.commit("LOADER", false);
        // Do something with response data
        return response;
      },
      (error) => {
        // Do something with request error
        this.$store.commit("LOADER", false);
        return Promise.reject(error);
      }
    );
  },
  methods: {
    async generarQR(tipodo,rac,nombrefirma,fechadoc,id) 
    {
        
        let me=this; 
        var textoModificado = rac.replace(/-/g, "~");

        var date = moment(fechadoc, "YYYY-MM-DD HH:mm:ss");
        var dia = moment(date).format("DD");
        var mes = moment(date).format("MMMM");
        var año = moment(date).format("YYYY");
        var fecha = dia + " de " + mes + " del " + año;

        
        try {
            me.qrCode = await generarQRCodeBase64(tipodo,textoModificado,nombrefirma,fecha,id);

            console.log("QR Generado");
        } catch (err) {
            console.error('Error:', err);
        }
    },
    listarLogo() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$conf
        .get("api/ConfGlobals/Listar", configuracion)
        .then(function (response) {
          me.logo1 = response.data.logo1;
          me.logo2 = response.data.logo2;
          me.logo3 = response.data.logo3;
          me.logo4 = response.data.logo4;
        })
        .catch((err) => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (me.e401 = true), (me.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta página", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros", "error");
          }
        });
    },
    cerrarcarpeta() {
      this.$store.state.rhechoid2 = null;
      this.$store.state.rac = null;
      this.$router.push("./umixta-listaracs");
    },
    /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    mostrarEdicionResenaBreve() {
      let me = this;
      me.modEditResena = true;
    },
    ActualizarResenaBreve() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$confirm(
        "Esperando confirmación",
        "Estas seguro de  que deseas guardar información ",
        function () {
          me.$CAT
            .post(
              "api/RHechoes/ActualizarResenaBreve",
              {
                IdRHecho: me.rHechoId,
                RBreve: me.rBreve,
              },
              configuracion
            )
            .then(function (response) {
              me.$notify("Reseña Modificada");
              me.modEditResena = false;
            })
            .catch((err) => {
              if (err.response.status == 400) {
                me.$notify("No es un usuario válido", "error");
              } else if (err.response.status == 401) {
                me.$notify(
                  "Por favor, inicie sesión para poder navegar en la aplicación",
                  "error"
                );
                (me.e401 = true), (me.showpage = false);
              } else if (err.response.status == 403) {
                me.$notify("No esta autorizado para ver esta página", "error");
                me.e403 = true;
                me.showpage = false;
              } else if (err.response.status == 404) {
                me.$notify("El recurso no ha sido encontrado", "error");
              } else {
                me.$notify(
                  "Error al intentar listar los registros",
                  "error"
                );
              }
            });
        },
        function () {
          alertify.warning("Verifica la información");
        }
      ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
    },
    /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    informacionagencia() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$conf
        .get("api/Agencias/Listarporid/" + me.agenciaid, configuracion)
        .then(function (response) {
          me.direccionAgencia = response.data.direccion;
          me.telefonosAgencia = response.data.telefono;
        })
        .catch((err) => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (me.e401 = true), (me.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta página", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros", "error");
          }
        });
    },
    listar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RAtencions/Listar", configuracion)
        .then(function (response) {
          me.registros = response.data;
        })
        .catch((err) => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (me.e401 = true), (me.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta página", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros", "error");
          }
        });
    },

    close() {
      this.modal_CaratulaRAC = false;
      this.modal_DependeciaDerivacion = false;
      this.limpiar();
    },

    limpiar() {
      this.editedIndex = -1;
      this.qrCode = null;
      this.vistaPreviaTF = true;
    },
    listarrHecho() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get(
          "api/RHechoes/ListarTodosRegistros/" + me.rAtencionId,
          configuracion
        )
        .then(function (response) {
          (me.rHechoId = response.data.rHechoId),
          (me.rAtencionId = response.data.rAtencionId),
          (me.fechaAtencion = response.data.fechaHoraRegistro),
          (me.registradopor = response.data.u_Nombre),
          (me.puestoquienregistro = response.data.u_Puesto);
          (me.distritoinicial = response.data.distritoInicial),
          (me.dirsubprocuinicial = response.data.dirSubProcuInicial),
          (me.agenciainicial = response.data.agenciaInicial),
          (me.agenciaid = response.data.agenciaid),
          (me.rBreve = response.data.rBreve),
          (me.numerooficio = response.data.numerooficio),
          (me.idRac = response.data.racId),
          me.listarrap();
          me.informacionagencia();
        })
        .catch((err) => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor, inicie sesión para poder navegar en la aplicación",
              "error"
            );
            (me.e401 = true), (me.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta página", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recurso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros", "error");
          }
        });
    },

    listarrap() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RAPs/Listar/" + me.rAtencionId, configuracion)
        .then(function (response) {
          me.personaId = response.data.personaId;
          me.curp = response.data.curp;
          me.nombre =
            response.data.nombre +
            " " +
            response.data.apellidoPaterno +
            " " +
            (response.data.apellidoMaterno == "LO DESCONOCE" ? "" : " " + response.data.apellidoMaterno);
          me.alias = response.data.alias;
           me.tel = [
            response.data.telefono1 !== "0" && response.data.telefono1.trim() ? response.data.telefono1.trim() : "",
            response.data.telefono2 !== "0" && response.data.telefono2.trim() ? response.data.telefono2.trim() : ""
          ].filter(Boolean).join(", ");
          me.email = response.data.correo;
          me.rac = response.data.rac;
          me.fhreg = response.data.fechaHoraInicio;
          me.docIdentificacion = response.data.docIdentificacion;
          me.tvictima = response.data.clasificacionPersona;
          me.tipopersona = response.data.tipoPersona;
          me.sexo = response.data.sexo;
          me.genero = response.data.genero;
          me.fnacimiento = response.data.fechaNacimiento;
          me.lugarNacimiento = response.data.entidadFederativa;
          me.estadocivil = response.data.estadoCivil;
          me.medionotificacion = response.data.medionotificacion;
          me.nacionalidad = response.data.nacionalidad;
          me.ocupacion = response.data.ocupacion;
          me.lengua = response.data.lengua;
          me.religion = response.data.religion;
          me.discapacidad = response.data.tipoDiscapacidad;
          me.parentesco = response.data.parentesco;
          me.nivelEstudio = response.data.nivelEstudio;

          var date = moment(me.fnacimiento, "DD/MM/YYYY");

          me.edad = moment().diff(date.format("YYYY-MM-DD"), "years", false);

          me.listardireccionpersona();
        })
        .catch((err) => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (me.e401 = true), (me.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta página", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros", "error");
          }
        });
    },
    listardireccionpersona() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RAPs/ListarDP/" + me.personaId, configuracion)
        .then(function (response) {

          let vialidadEncontrada = me.vialidades.find(v => v.value == response.data.tipoVialidad);
          let nombreVialidad = vialidadEncontrada ? vialidadEncontrada.text : "";

          me.direccion =
           nombreVialidad +
            " " +
            response.data.calle +
            " " +
            (response.data.noint == "0" ? "" : response.data.noint) +
            " " +
            response.data.noext +
            " " +
            response.data.localidad +
            " " +
            response.data.municipio +
            " " +
            response.data.estado +
            " " +
            response.data.pais +
            " " +
            (response.data.cp == "0" ? "" : response.data.cp);
          me.listardiligencias();
          me.listarDDerivacion();
        })
        .catch((err) => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (me.e401 = true), (me.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta página", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros", "error");
          }
        });
    },
    listardiligencias() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RDiligencias/Listar/" + me.rHechoId, configuracion)
        .then(function (response) {
          me.diligencias = response.data;
        })
        .catch((err) => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (me.e401 = true), (me.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta página", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros", "error");
          }
        });
    },
     listarVialidad(){
      let me=this;
      let header={"Authorization" : "Bearer " + this.$store.state.token};
      let configuracion= {headers : header};
      this.$conf.get('api/Vialidades/Listar',configuracion).then(function(response){
          response.data.forEach(x => {
              me.vialidades.push({text: x.nombre, value: x.clave});
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
    obtenermes: function (mes) {
      if (mes == 0) return "Enero";
      if (mes == 1) return "Febrero";
      if (mes == 2) return "Marzo";
      if (mes == 3) return "Abril";
      if (mes == 4) return "Mayo";
      if (mes == 5) return "Junio";
      if (mes == 6) return "Julio";
      if (mes == 7) return "Agosto";
      if (mes == 8) return "Septiembre";
      if (mes == 9) return "Octubre";
      if (mes == 10) return "Noviembre";
      if (mes == 11) return "Diciembre";
    },
    imprimirdiligencia(item) {
      this.numerooficio = item.numeroOficio;
      this.origenDirSub = item.uDirSubPro;
      this.fecha = item.fechaSolicitud;
      this.responsable = item.dirigidoa;
      this.nombreDirSub = item.dirSubPro;
      this.textolibre = item.especificaciones;
      this.textofinal = item.textofinal;
      this.mostrarpdfdiligencia(item.emitidoPor, item.uPuesto, item.agencia);
    },
    listarDDerivacion() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RDDerivacions/Listar/" + me.rHechoId, configuracion)
        .then(function (response) {
          me.dderivaciones = response.data;
        })
        .catch((err) => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (me.e401 = true), (me.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta página", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros", "error");
          }
        });
    },
    impirmirDDerivacion(item) {
      let me = this;

      this.dd_espesificaciones = item.espesificaciones;
      this.dd_fechaDerivacion = item.fechaSys;
      this.dd_nombreDDerivacion = item.nombreDDerivacion;
      this.dd_direccionDDerivacion = item.direccionDDerivacion;
      this.dd_telefono = item.telefono;
      this.dd_contacto = item.contacto;
      this.dd_distrito = item.uDistrito;
      this.dd_nombreDirSub = item.uDirSubPro;
      this.dd_agencia = item.uAgencia;
      this.dd_unombre = item.uNombre;
      this.dd_upuesto = item.uPuesto;

      me.generarQR(me.docOficioDer,me.rac,item.uNombre,item.fechaSys,item.dDerivacionId);
      setTimeout(() => 
      {
        me.vistaPreviaTF = false;
      }, 500);
      this.mostrarpdf_DependeciaDerivacion();
    },
    //************************************************************************ */
    // CARATULA DE RAC
    crearPdf_CaratulaRAC() {
      var pdfMake = require("pdfmake/build/pdfmake.js");
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
      var telagencia = this.telefonosAgencia;
      var u_subProc = this.u_subproc;
      var rac = this.rac;
      //***************************************************************************** */

      var date = moment(this.fechaAtencion, "YYYY-MM-DD HH:mm:ss");
      var dia = moment(date).format("DD");
      var mes = moment(date).format("MMMM");
      var año = moment(date).format("YYYY");
      var hr = moment(date).format("h:mm:ss a");
      var fecha = dia + " de " + mes + " del " + año;
      //***************************************************************************** */

      let me  = this;

      var htmltexto = htmlToPdfmake(this.rBreve);
      var dd = {
        pageSize: "LEGAL",
        pageOrientation: "portrait",
        pageMargins: [85, 130, 72, 60],
        footer: function (currentPage, pageCount) {
          const footerContent = [
            {
              image: logo4,
              width: 612,
              absolutePosition: { x: 0, y: 0 },
            },
            {
              text:
                diragencia + "\n" + telagencia + "\n" + "www.hidalgo.gob.mx",
              style: "subheaderlogo",
              style: "PiePagina",
              margin: [312, 12, 72, 0],
              alignment: "right",
              fontSize: 7,
              color: "white",
              absolutePosition: { x: 0, y: 30 },
            },
            me.vistaPreviaTF == false? 
            {
                image: me.qrCode,
                width: 80, // Ajusta el ancho según tu diseño
                height: 80, // Ajusta la altura según tu diseño
                absolutePosition: { x: 5, y: -20 }, // Ajusta las coordenadas según tu diseño

            }
          : "",
          ];

          return footerContent;
        },
        header: function (currentPage, pageCount, pageSize) {
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
              absolutePosition: { x: 0, y: 0 },
            },
          ];
        },

        content: [
          {
            text: u_subProc + "\n" + dirsubproc + "\n" + agencia,
            style: "Adscripcion",
            absolutePosition: { x: 85, y: 95 },
          },
          {
            text: "Registro de atención ciudadana (RAC): " + rac + "\n\n",
            style: "Titulo",
            alignment: "right",
            margin: [0, 40, 72, 0],
            absolutePosition: { x: 85, y: 150 },
          },
          {
            text: this.distritoinicial + ", Hidalgo a " + fecha + "\n\n\n\n",
            style: "Fecha",
            alignment: "right",
          },
          {
            text: "REGISTRO DE ATENCIÓN CIUDADANA\n\n",
            style: "Titulo",
          },
          {
            style: "table",
            table: {
              headerRows: 1,
              widths: ["*", "auto", "auto"],
              body: [
                [
                  {
                    colSpan: 3,
                    text: "DATOS DEL COMPARECIENTE",
                    fillColor: "#eeeeee",
                    style: "Titulo",
                  },
                  "",
                  "",
                ],
                [
                  {
                    style: "Texto",
                    text:
                      "Nombre" +
                      "\n\n" +
                      (this.nombre != "" ? this.nombre : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Alias:" +
                      "\n\n" +
                      (this.alias != "" ? this.alias : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Clasificación de persona:" +
                      "\n\n" +
                      (this.tvictima != "" ? this.tvictima : "NA"),
                  },
                ],
                [
                  {
                    style: "Texto",
                    text:
                      "Tipo persona:" +
                      "\n\n" +
                      (this.tipopersona != "" ? this.tipopersona : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "CURP:" + "\n\n" + (this.curp != "0" ? this.curp : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Documento de identificación:" +
                      "\n\n" +
                      (this.docIdentificacion != ""
                        ? this.docIdentificacion
                        : "NA"),
                  },
                ],
                [
                  {
                    style: "Texto",
                    text:
                      "Nacionalidad:" +
                      "\n\n" +
                      (this.nacionalidad != "" ? this.nacionalidad : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Teléfono(s):" +
                      "\n\n" +
                      (this.tel != "" ? this.tel : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Correo electrónico:" +
                      "\n\n" +
                      (this.email != "" ? this.email : "NA"),
                  },
                ],
                [
                  {
                    colSpan: 3,
                    text: "Dirección:" + "\n\n" + this.direccion,
                    style: "Texto",
                  },
                  "",
                ],
                [
                  {
                    style: "Texto",
                    text:
                      "Género:" +
                      "\n\n" +
                      (this.genero != "" ? this.genero : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Sexo" + "\n\n" + (this.sexo != "" ? this.sexo : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Edad:" + "\n\n" + (this.edad != 0 ? this.edad : "NA"),
                  },
                ],
                [
                  {
                    style: "Texto",
                    text:
                      "Autoriza medio notificación:" +
                      "\n\n" +
                      (this.medionotificacion != ""
                        ? this.medionotificacion
                        : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Ocupación:" +
                      "\n\n" +
                      (this.ocupacion != "" ? this.ocupacion : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Nivel estudios:" +
                      "\n\n" +
                      (this.nivelEstudio != "" ? this.nivelEstudio : "NA"),
                  },
                ],
                [
                  {
                    style: "Texto",
                    text:
                      "Religión:" +
                      "\n\n" +
                      (this.religion != "" ? this.religion : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Idioma  o lengua que habla:" +
                      "\n\n" +
                      (this.lengua != "" ? this.lengua : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Estado familiar:" +
                      "\n\n" +
                      (this.estadocivil != "" ? this.estadocivil : "NA"),
                  },
                ],
                [
                  {
                    colSpan: 3,
                    text:
                      "Tiene alguna discapacidad:" +
                      "\n\n" +
                      (this.discapacidad != "" ? this.discapacidad : "NA"),
                    style: "Texto",
                  },
                  "",
                ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return i === 0 || i === node.table.body.length
                  ? "black"
                  : "gray";
              },
              vLineColor: function (i, node) {
                return i === 0 || i === node.table.widths.length
                  ? "black"
                  : "gray";
              },
            },
          },
          {
            text: "\n\n\nRESEÑA BREVE: \n\n\n",
            style: "Texto",
          },
          {
            text: htmltexto,
            style: "Texto",
          },
          {
            text: "\n\n\n\n\nCOMPARECIENTE\n\n" + this.nombre,
            style: "DePara",
          },
          {
            text: "\n\n\n\n\n" + "A T E N T A M E N T E" + "\n\n\n\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: this.registradopor + "\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: this.puestoquienregistro + "\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: this.agenciainicial + "\n\n",
            alignment: "justify",
            style: "DePara",
          },
          me.vistaPreviaTF == false? 
          {
              image: me.qrCode,
              width: 200,
              alignment: 'center',
              margin: [0, 15, 0, 15]
          }
          : "",
        ],

        styles: {
          Adscripcion: {
            fontSize: 10,
            bold: true,
          },
          Fecha: {
            fontSize: 9,
          },
          Nooficio: {
            fontSize: 8,
            bold: true,
          },
          DePara: {
            fontSize: 10,
            bold: true,
          },
          DeParaCargo: {
            fontSize: 9,
            bold: true,
          },
          PiePagina: {
            fontSize: 7,
          },
          Texto: {
            fontSize: 10,
            alignment: "justify",
          },
          Titulo: {
            fontSize: 12,
            bold: true,
            alignment: "center",
          },
          SubTitulo: {
            fontSize: 11,
            semibold: true,
          },
        },
      };

      return dd;
    },
    mostrarpdf_CaratulaRAC() {

      let me = this;
      var dd = this.crearPdf_CaratulaRAC();
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.vfs;
      }
      var doc = pdfMake.createPdf(dd);
      var f = document.getElementById("iframepdf1");
      f.setAttribute("src", "");

      var callback = async (url) => {
        const result = await Swal.fire({
          title: '¿Deseas firmar este documento?',
          text: 'Una vez firmado no podrás modificarlo, a menos que vuelvas a imprimir.',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí, firmar',
          cancelButtonText: 'No'
        });

        if (result.isConfirmed) {
          try {
            const response = await firmarDocumento("https://drive.com", "12345", url, "ROJM980130");
            f.setAttribute("src", response[0]["DocFirmado"]);
          } catch (error) {
            console.log('Error al firmar:', error);
          }
        } else {
          f.setAttribute("src", url);
        }

        this.modal_CaratulaNUC = true;
      };
      doc.getDataUrl(callback, doc);

      
      me.generarQR(me.docCaratulaRac,me.rac,me.dd_unombre,me.fechaAtencion,me.idRac);
      this.modal_CaratulaRAC = true;

      setTimeout(() => 
      {
        me.vistaPreviaTF = false;
      }, 500);
    },
    impirmiCaratulaRAC() {
      let me = this;
      var dd = me.crearPdf_CaratulaRAC();
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.vfs;
      }
      var doc = pdfMake.createPdf(dd).print();
      me.close();
    },
    //************************************************************************* */
    //************************************************************************ */
    // FORMATO DE DEPENDECIA DE DERIVACION
    crearPdf_DependeciaDerivacion() {
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      //***************************************************************************** */
      // VARIABLES
      //***************************************************************************** */
      var logo1 = this.logo1;
      var logo2 = this.logo2;
      var logo3 = this.logo3;
      var logo4 = this.logo4;
      var dirsubproc = this.dd_nombreDirSub;
      var agencia = this.dd_agencia;
      var diragencia = this.direccionAgencia;
      var telagencia = this.telefonosAgencia;
      var u_subProc = this.u_subproc;
      //***************************************************************************** */

      var date = moment(this.dd_fechaDerivacion, "YYYY-MM-DD HH:mm:ss");
      var dia = moment(date).format("DD");
      var mes = moment(date).format("MMMM");
      var año = moment(date).format("YYYY");
      var hr = moment(date).format("h:mm:ss a");
      var fecha = dia + " de " + mes + " del " + año;
      //***************************************************************************** */

      let me = this;
      var htmltexto = htmlToPdfmake(this.rBreve);
      var especificaciones = htmlToPdfmake(this.dd_espesificaciones);

      var dd = {
        pageSize: "LEGAL",
        pageOrientation: "portrait",
        pageMargins: [85, 130, 72, 60],
        footer: function (currentPage, pageCount) {
          return {
            columns: [
              {
                image: logo4,
                width: 612,
                absolutePosition: { x: 0, y: 0 },
              },
              {
                text:
                  diragencia + "\n" + telagencia + "\n" + "www.hidalgo.gob.mx",
                style: "subheaderlogo",
                style: "PiePagina",
                margin: [312, 12, 72, 0],
                alignment: "right",
                fontSize: 7,
                color: "white",
                absolutePosition: { x: 0, y: 30 },
              },
              me.vistaPreviaTF == false? 
              {
                  image: me.qrCode,
                  width: 80, // Ajusta el ancho según tu diseño
                  height: 80, // Ajusta la altura según tu diseño
                  absolutePosition: { x: 5, y: -20 }, // Ajusta las coordenadas según tu diseño

              }
              : "",
            ],
          };
        },
        header: function (currentPage, pageCount, pageSize) {
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
              absolutePosition: { x: 0, y: 0 },
            },
          ];
        },

        content: [
          {
            text: u_subProc + "\n" + dirsubproc + "\n" + agencia,
            style: "Adscripcion",
            absolutePosition: { x: 85, y: 95 },
          },
          {
            text: this.dd_distrito + ", Hidalgo a " + fecha + "\n\n\n\n",
            style: "Fecha",
            alignment: "right",
          },
          {
            text: "Registro de atención ciudadana (RAC): " + this.rac + "\n\n",
            style: "Titulo",
          },

          {
            text: "\nCARTA DE DERIVACIÓN\n\n",
            style: "Titulo",
          },

          {
            style: "table",
            table: {
              headerRows: 1,
              widths: ["*", "auto", "auto"],
              body: [
                [
                  {
                    colSpan: 3,
                    text: "DATOS DEL COMPARECIENTE",
                    fillColor: "#eeeeee",
                    style: "Titulo",
                  },
                  "",
                  "",
                ],
                [
                  { style: "Texto", text: "Nombre" + "\n\n" + this.nombre },
                  { style: "Texto", text: "Alias:" + "\n\n" + this.alias },
                  {
                    style: "Texto",
                    text: "Clasificación de persona:" + "\n\n" + this.tvictima,
                  },
                ],
                [
                  {
                    style: "Texto",
                    text: "Tipo persona:" + "\n\n" + this.tipopersona,
                  },
                  { style: "Texto", text: "CURP:" + "\n\n" + this.curp },
                  {
                    style: "Texto",
                    text:
                      "Documento de identificación:" +
                      "\n\n" +
                      this.docIdentificacion,
                  },
                ],
                [
                  {
                    style: "Texto",
                    text: "Nacionalidad:" + "\n\n" + this.nacionalidad,
                  },
                  { style: "Texto", text: "Teléfono(s):" + "\n\n" + this.tel },
                  {
                    style: "Texto",
                    text: "Correo electrónico:" + "\n\n" + this.email,
                  },
                ],
                [
                  {
                    colSpan: 3,
                    text: "Dirección:" + "\n\n" + this.direccion,
                    style: "Texto",
                  },
                  "",
                ],
                [
                  { style: "Texto", text: "Género:" + "\n\n" + this.genero },
                  { style: "Texto", text: "Sexo" + "\n\n" + this.sexo },
                  { style: "Texto", text: "Edad:" + "\n\n" + this.edad },
                ],
                [
                  {
                    style: "Texto",
                    text:
                      "Autoriza medio notificación:" +
                      "\n\n" +
                      this.medionotificacion,
                  },
                  {
                    style: "Texto",
                    text: "Ocupación:" + "\n\n" + this.ocupacion,
                  },
                  {
                    style: "Texto",
                    text: "Nivel estudios:" + "\n\n" + this.nivelEstudio,
                  },
                ],
                [
                  {
                    style: "Texto",
                    text: "Religión:" + "\n\n" + this.religion,
                  },
                  {
                    style: "Texto",
                    text: "Idioma  o lengua que habla:" + "\n\n" + this.lengua,
                  },
                  {
                    style: "Texto",
                    text: "Estado familiar:" + "\n\n" + this.estadocivil,
                  },
                ],
                [
                  {
                    colSpan: 3,
                    text:
                      "Tiene alguna discapacidad:" +
                      "\n\n" +
                      this.tipodiscapacidad,
                    style: "Texto",
                  },
                  "",
                ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return i === 0 || i === node.table.body.length
                  ? "black"
                  : "gray";
              },
              vLineColor: function (i, node) {
                return i === 0 || i === node.table.widths.length
                  ? "black"
                  : "gray";
              },
            },
          },
          {
            text: "\n\nRESEÑA BREVE: \n\n\n",
            style: "Texto",
          },
          {
            text: htmltexto,
            style: "Texto",
          },
          {
            text: "\n\n\nSE SUGIERE ACUDIR A: \n\n",
            style: "Texto",
          },
          {
            ul: [
              "Dependecia: " + this.dd_nombreDDerivacion,
              "Contacto:" + this.dd_contacto,
              "Teléfono:" + this.dd_telefono,
              "Dirección: " + this.dd_direccionDDerivacion,
            ],
            style: "Texto",
          },
          {
            text: "\n\n\nANEXO: \n\n",
            style: "Texto",
          },
          {
            text: especificaciones,
            style: "Texto",
          },
          {
            text: "\n\n\n\nCOMPARECIENTE\n\n" + this.nombre,
            style: "DePara",
          },
          {
            text: "\n\n\n\n\n" + "A T E N T A M E N T E" + "\n\n\n\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: this.dd_unombre + "\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: this.dd_upuesto + "\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: this.dd_agencia + "\n\n",
            alignment: "justify",
            style: "DePara",
          },
          me.vistaPreviaTF == false? 
          {
              image: me.qrCode,
              width: 200,
              alignment: 'center',
              margin: [0, 15, 0, 15]
          }
          : "",
        ],

        styles: {
          Adscripcion: {
            fontSize: 10,
            bold: true,
          },
          Fecha: {
            fontSize: 9,
          },
          Nooficio: {
            fontSize: 8,
            bold: true,
          },
          DePara: {
            fontSize: 10,
            bold: true,
          },
          DeParaCargo: {
            fontSize: 9,
            bold: true,
          },
          PiePagina: {
            fontSize: 7,
          },
          Texto: {
            fontSize: 10,
            alignment: "justify",
          },
          Titulo: {
            fontSize: 12,
            bold: true,
            alignment: "center",
          },
          SubTitulo: {
            fontSize: 11,
            semibold: true,
          },
        },
      };

      return dd;
    },
    mostrarpdf_DependeciaDerivacion() {
      var dd = this.crearPdf_DependeciaDerivacion();
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.vfs;
      }
      var doc = pdfMake.createPdf(dd);
      var f = document.getElementById("iframepdf2");
      var callback = function (url) {
        f.setAttribute("src", url);
      };
      doc.getDataUrl(callback, doc);
      this.modal_DependeciaDerivacion = true;
    },
    impirmiDependeciaDerivacion() {
      let me = this;
      var dd = me.crearPdf_DependeciaDerivacion();
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.vfs;
      }
      var doc = pdfMake.createPdf(dd).print();
      me.close();
    },
    //************************************************************************* */
    mostrarpdfdiligencia(nombre, puesto, agencia) {
      let me = this;
      var dd = me.downloadPdfdiligencia(nombre, puesto, agencia);
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.vfs;
      }

      var dd = me.downloadPdfdiligencia(nombre, puesto, agencia);
      var doc = pdfMake.createPdf(dd);

      var doc = pdfMake.createPdf(dd).print();
    },
    downloadPdfdiligencia(nombre, puesto, agencia) {
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
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
      var u_subProc = this.u_subproc;
      var nuc = this.nuc;
      //***************************************************************************** */
      var html = htmlToPdfmake(this.textofinal);
      //***************************************************************************** */
      var agenciainfodr = this.direccionAgencia;
      var agenciainfotel = this.telefonosAgencia;

      //***************************************************************************** */
      var dd = {
        pageSize: "LEGAL",
        pageOrientation: "portrait",
        pageMargins: [85, 130, 72, 60],
        footer: function (currentPage, pageCount) {
          return {
            columns: [
              {
                image: logo4,
                width: 612,
                absolutePosition: { x: 0, y: 0 },
              },
              {
                text:
                  agenciainfodr +
                  "\n" +
                  agenciainfotel +
                  "\n" +
                  "www.hidalgo.gob.mx",
                style: "subheaderlogo",
                style: "PiePagina",
                margin: [312, 12, 72, 0],
                alignment: "right",
                fontSize: 7,
                color: "white",
                absolutePosition: { x: 0, y: 30 },
              },
            ],
          };
        },
        header: function (currentPage, pageCount, pageSize) {
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
              absolutePosition: { x: 0, y: 0 },
            },
          ];
        },

        content: [
          {
            text: u_subProc + "\n" + u_dirSubPro + "\n" + u_agencia,
            style: "Adscripcion",
            absolutePosition: { x: 85, y: 95 },
          },
          {
            text: this.u_distrito + ", Hidalgo a " + this.fecha,
            style: "Fecha",
            alignment: "right",
          },
          {
            text:
              "\nNúmero de oficio: " + this.numerooficio + "\n\n\n\n\n\n\n\n",
            style: "Nooficio",
            alignment: "right",
          },
          {
            text:
              this.responsable +
              "\n\n" +
              this.nombreDirSub +
              "\n" +
              "\n" +
              "\n" +
              "\n",
            style: "DePara",
          },
          {
            text: html,
            style: "Texto",
          },
          {
            text: "\n\n\n\n\n" + "A T E N T A M E N T E" + "\n\n\n\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: nombre + "\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: puesto + "\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: agencia + "\n\n",
            alignment: "justify",
            style: "DePara",
          },
        ],

        styles: {
          Adscripcion: {
            fontSize: 10,
            bold: true,
          },
          Fecha: {
            fontSize: 9,
          },
          Nooficio: {
            fontSize: 8,
            bold: true,
          },
          DePara: {
            fontSize: 10,
            bold: true,
          },
          DeParaCargo: {
            fontSize: 9,
            bold: true,
          },
          PiePagina: {
            fontSize: 7,
          },
          Texto: {
            fontSize: 10,
            alignment: "justify",
          },
          Titulo: {
            fontSize: 12,
            bold: true,
            alignment: "center",
          },
          SubTitulo: {
            fontSize: 11,
            semibold: true,
          },
        },
      };

      var doc = pdfMake.createPdf(dd);
      var f = document.getElementById("iframepdf1");
      var callback = function (url) {
        f.setAttribute("src", url);
      };
      doc.getDataUrl(callback, doc);
      //this.modaldocumento=true;
      return dd;
    },
  },
};
</script>
<style>
.break-word {
  word-break: break-word; /* o use break-all si es más agresivo */
  overflow-wrap: break-word;
  white-space: normal; /* por si hereda nowrap */
}
</style>