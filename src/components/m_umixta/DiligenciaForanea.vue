<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage" id="mapa">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Servicios periciales foraneos.</v-toolbar-title
        >
        <v-divider class="mx-2" inset vertical />
        <v-spacer />
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        />
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
            <v-btn
              class="mx-2"
              slot="activator"
              v-on="on"
              @click="cerrarcarpeta"
              fab
              dark
              small
              color="primary"
            >
              <v-icon dark>close</v-icon>
            </v-btn>
          </template>
          <span>Cerrar carpeta</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              class="mx-2"
              slot="activator"
              v-on="on"
              @click="agregar"
              fab
              dark
              small
              color="success"
            >
              <v-icon dark>add</v-icon>
            </v-btn>
          </template>
          <span>Agregar registro</span>
        </v-tooltip>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="diligencias"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.prioridad }}</td>
          <td>{{ props.item.emitidoPor }}</td>
          <td>{{ props.item.dirigidoa }}</td>
          <td>{{ props.item.servicio }}</td>
          <td>{{ props.item.fechaSolicitud }}</td>
          <td>{{ props.item.nodeSolicitudf }}</td>
          <td>{{ obtenernombredistritoclave(props.item.agenciaRecibe) }}</td>
          <td>{{ props.item.statusRespuesta }}</td>
          <td class="layout">

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

            <div class="layout" v-if="props.item.statusRespuesta != 'Solicitado'">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon class="mr-2" v-on="on" @click="vermsj(props.item)">
                    feedback
                  </v-icon>
                </template>
                <span>Ver respuesta</span>
              </v-tooltip>
            </div>

            <div class="layout" v-if="props.item.dirigido">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon
                    class="mr-2"
                    v-on="on"
                    @click="mostrarmapa(props.item)"
                  >
                    location_on
                  </v-icon>
                </template>
                <span>Ver dirección de persona registrada</span>
              </v-tooltip>
            </div>

            <v-tooltip bottom v-if="props.item.envioExitosoTF == false">
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2"
                  v-on="on"
                  color="green"
                  @click="reenviarSolicitudP(props.item)"
                >
                  send
                </v-icon>
              </template>
              <span>Reenviar solicitud pericial</span>
            </v-tooltip>

          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary">Resetear</v-btn>
        </template>
      </v-data-table>
      <v-dialog
        v-model="modalAdd"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Solicitud a servicios periciales.</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
              <v-btn color="success" text @click.native="imprimirSP()">Vista previa</v-btn>
              <v-btn icon @click="modalAdd = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-divider />
          <v-card elevation="0" class="mb-5" height="auto">
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap>
                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                  <p class="text-md-left">
                    Información para la solicitud de servicios periciales.
                  </p>

                  <v-autocomplete
                    name="distrito"
                    :items="distritos"
                    v-model="distrito"
                    label="*Distrito:"
                    v-validate="'required'"
                    return-object
                    @change="obteneriddsp"
                    :error-messages="errors.collect('distrito')"
                  >
                  </v-autocomplete>

                  <v-autocomplete
                    name="agencia"
                    :items="agencias"
                    v-model="agencia"
                    label="*Agencia:"
                    v-validate="'required'"
                    return-object
                    @change="listarServiciosPericiales"
                    :error-messages="errors.collect('agencia')"
                  >
                  </v-autocomplete>

<!-- @change="listarFiltroSP" -->
                  <v-autocomplete
                    name="servicio pericial"
                    :items="serviciospericiales"
                    v-model="serviciopericialeId"
                    label="*Servicio pericial:"
                    v-validate="'required'"
                    return-object
                    multiple
                    @change="colocarDescripcion"
                    :error-messages="errors.collect('servicio pericial')"
                  >
                  </v-autocomplete>
                  <v-select
                    name="prioridad"
                    :items="prioridades"
                    v-model="prioridad"
                    label="*Prioridad:"
                    return-object
                    v-validate="'required'"
                    :error-messages="errors.collect('prioridad')"
                  >
                  </v-select>

                  <v-text-field
                    name="número de oficio"
                    label="Número de oficio:"
                    v-model="numerooficio"
                    v-validate="'required'"
                    :error-messages="errors.collect('número de oficio')"
                  >
                  </v-text-field>

                  <v-switch
                    v-model="statusdirigido"
                    @change="switchchange"
                    label="¿El servicio pericial se practicara a alguna persona registrada?:"
                    color="success"
                    hide-details
                  ></v-switch>

                  <v-autocomplete
                    return-object
                    name="persona"
                    :items="personas"
                    v-model="personaId"
                    label="*Persona registradas en el hecho:"
                    v-validate="'required'"
                    v-if="statusdirigido"
                    @change="Obtenerltlng()"
                    :error-messages="errors.collect('persona')"
                  >
                  </v-autocomplete>
                </v-flex>
                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                  <v-card auto-grow elevation="0">
                    <v-card-text>
                      <v-list three-line>
                        <p class="text-md-left">
                          Informacion detallada del servicio pericial.
                        </p>
                        <v-list-tile>
                          <v-list-tile-action>
                            <v-icon color="success">business</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>
                              <p class="body-2 font-weight-bold">
                                <a>Dirección o subdirección:</a>
                              </p>
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                              <p
                                color="accent"
                                class="caption font-weight-regular"
                              >
                                <a>{{ agencia.value3 }}</a>
                              </p>
                            </v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-action>
                            <v-icon color="success">apartment</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>
                              <p class="body-2 font-weight-bold">
                                <a>Laboratorio:</a>
                              </p>
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                              <p
                                color="accent"
                                class="caption font-weight-regular"
                              >
                                <a>{{ agencia.text }}</a>
                              </p>
                            </v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-action>
                            <v-icon color="success">priority_high</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>
                              <p class="body-2 font-weight-bold">
                                <a>Descripción</a>
                              </p>
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                              <p
                                color="accent"
                                class="caption font-weight-regular"
                              >
                                <a>{{ descripcionCompleta }}</a>
                              </p>
                            </v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                          <v-list-tile-action>
                            <v-icon color="success">textsms</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>
                              <p class="body-2 font-weight-bold">
                                <a>Requisitos especificos</a>
                              </p>
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                              <p
                                color="accent"
                                class="caption font-weight-regular"
                              >
                                <a>{{ requisitosCompletos }}</a>
                              </p>
                            </v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 sm12 md12 lg12>
                  <v-card elevation="0">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="mx-2"
                          slot="activator"
                          v-on="on"
                          @click="listarTL()"
                          absolute
                          top
                          right
                          fab
                          color="primary"
                        >
                          <v-icon dark>remove_red_eye</v-icon>
                        </v-btn>
                      </template>
                      <span>Generar texto de documento</span>
                    </v-tooltip>
                    <v-card-title>
                      <h3>*Texto de solicitud</h3>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-form data-vv-scope="form1">
                        <vue-editor
                          v-if="!botonvistaprev"
                          name="especificaciones"
                          v-model="textofinal"
                          v-validate="'required'"
                          :error-messages="errors.collect('especificaciones')"
                        >
                        </vue-editor>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="modaldocumento"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Documento.</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn color="success" text @click.native="crearPDF_SP()"
                >Guardar Diligencia</v-btn
              >
              <v-btn icon @click="modaldocumento = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <iframe
              id="iframepdf"
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
        v-model="modalGeolocalizacion2"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar bottom collapse dark color="primary">
            <v-toolbar-title>Geolocalización.</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-1"
                    slot="activator"
                    v-on="on"
                    @click="aumentarzoorm()"
                    left
                    fab
                    dark
                    small
                    color="success"
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
                </template>
                <span>Aumentar zoom</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-1"
                    slot="activator"
                    v-on="on"
                    @click="disminuirzoom()"
                    left
                    fab
                    dark
                    small
                    color="success"
                  >
                    <v-icon>remove</v-icon>
                  </v-btn>
                </template>
                <span>Disminuir zoom</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-1"
                    slot="activator"
                    v-on="on"
                    @click="activarterreno()"
                    left
                    fab
                    dark
                    small
                    color="success"
                  >
                    <v-icon>view_quilt</v-icon>
                  </v-btn>
                </template>
                <span>Vista area</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-1"
                    slot="activator"
                    v-on="on"
                    @click="activarsatellite()"
                    left
                    fab
                    dark
                    small
                    color="success"
                  >
                    <v-icon>terrain</v-icon>
                  </v-btn>
                </template>
                <span>Satelite</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-1"
                    slot="activator"
                    v-on="on"
                    @click="imprim1()"
                    left
                    fab
                    dark
                    small
                    color="success"
                  >
                    <v-icon>print</v-icon>
                  </v-btn>
                </template>
                <span>Imprimir mapa</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-1"
                    slot="activator"
                    v-on="on"
                    @click="modalGeolocalizacion2 = false"
                    left
                    fab
                    dark
                    small
                    color="success"
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </template>
                <span>Cerrar</span>
              </v-tooltip>
            </v-toolbar-items>
          </v-toolbar>

          <v-divider></v-divider>

          <v-card elevation="0" height="auto">
            <gmap-map
              id="mapa"
              :center="center2"
              :zoom="zoom"
              style="width: 100%; height: 800px"
              :options="opcionesmapa"
              :StreetViewPanoramaOptions="{
                showRoadLabels: true,
              }"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-1"
                    slot="activator"
                    v-on="on"
                    @click="modalGeolocalizacion2 = false"
                    left
                    fab
                    dark
                    small
                    color="success"
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </template>
                <span>Cerrar</span>
              </v-tooltip>
              <gmap-marker
                :key="index"
                v-for="(m, index) in markers2"
                :position="m.position"
                @click="center = m.position"
                :clickable="false"
                :draggable="false"
              ></gmap-marker>
            </gmap-map>
          </v-card>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogcsmsj" max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">line_weight</v-icon>
            </v-avatar>

            <v-toolbar-title class="subheading">Mensaje</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-card elevation="0">
                      <v-card-text>
                        <table>
                          <br />
                          <tr>
                            <td style="width: 140px">Respuesta:</td>
                            <td>
                              <b v-html="respuesta"> {{ respuesta }} </b>
                            </td>
                          </tr>
                        </table>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn @click="dialogcsmsj = false">Cerrar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import VeeValidate from "vee-validate";

import moment from "moment";
import "moment/locale/es";
import alertify from "alertifyjs";
import { VueEditor } from "vue2-editor";
import n401 from './401.vue';
import n403 from './403.vue';
import { error } from "util";
import QRCode from "qrcode";
import { generarQRCodeBase64 } from './crearQR';

export default {
  components: {
    "vue2-editor": VueEditor,
    n401,
    n403,
  },
  data: () => ({
    //-------Logos-----------------------------------------/
    logo1: "",
    logo2: "",
    //************************* */
    alert: false,
    dialog: false,
    verTP: 0,
    rAtencionId: "",
    rHechoId: "",
    nuc: "",
    showpage: true,
    e401: false,
    e403: false,
    //*************** */
    serviciospericiales: [],
    serviciopericialeId: "",

    aspid: "",
    nombreAgencia: "",
    origenDirSub: "",
    nombreDirSub: "",
    responsable: "",
    nombreServicio: "",
    newNombreservicio: [],
    nombreServicioConcat: "",
    listaMateriaConcat: "",
    newASPid: [],
    descripcion: "",
    requisitos: "",
    materia: "",
    puesto: "",
    textolibre: "",
    atencionVictimas: "",
    ModalServicioPericial: 0,
    fecha: "",
    textindi: "No",
    agenciainfo: "",
    comillas: '"',
    botonvistaprev: true,
    modalGeolocalizacion: 0,
    agencias: [],
    agencia: "",
    distritos: [],
    distrito: "",
    distritos2: [],
    //*************** */
    statusdirigido: false,
    personaId: "",
    personas: [],
    nombre: "",
    modaldocumento: false,
    textofinal: "",
    numerooficio: "",
    lt: "",
    lng: "",
    //*************** */
    lat2: "",
    lng2: "",
    center2: { lat: 45.508, lng: -73.587 },
    markers2: [],
    places2: [],
    currentPlace2: null,
    geoloc2: 0,
    modalGeolocalizacion2: 0,
    de_lat2: "",
    de_lng2: "",
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
      mapTypeId: "roadmap",
    },
    zoom: 17,
    dialogcsmsj: "",
    respuesta: "",
    //*******************/
    headers: [
      { text: "Prioridad", value: "prioridad" },
      { text: "Emitido por", value: "tipopersona" },
      { text: "Dirigido a", value: "nombre" },
      { text: "Servicio", value: "servicio" },
      { text: "Fecha de solicitud", value: "fechaAD" },
      { text: "No. de solicitud", value: "nodeSolicitudf" },
      { text: "Distrito Solicitado", value: "agenciaRecibe" },
      { text: "Status", value: "fechaAD", sortable: false },
      { text: "Opciones", value: "opciones", sortable: false },
    ],
    customToolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["align", { align: "center" }, { align: "right" }, { align: "justify" }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ color: [] }, { background: [] }],
    ],
    search: "",
    rowsPerPageItems: [10, 20, 30, 40, 50],
    pagination: {
      rowsPerPage: 20,
    },
    editedIndex: -1,
    modalAdd: 0,
    //*************** */
    diligencias: [],
    fecha: "",
    prioridad: "",
    prioridades: ["Normal", "Urgente"],

    step: 1,
    numeromaximo: [],
    //********************************/
    rac: "",
    //-----CLAIM------------------------------------------
    u_iddistrito: "",
    u_distrito: "",
    u_dirSubPro: "",
    u_idagencia: "",
    u_agencia: "",
    u_idmoduloservicio: "",
    u_modulo: "",
    u_idusuario: "",
    u_nombre: "",
    u_clave: "",
    u_rol: "",
    u_puesto: "",
    u_subproc: "",
    u_clavedistrito: "",
    //----------------------------------------------------
    texto: 'Vista Previa',
    qrCode: null,
    docDiligenciaFor: 'Diligencia foranea',
    vistaPreviaTF: true,
    //----------------------------------------------------
    idrdiligenciasforaneas:'',
    serviciospericialesArray: [],
    descripcionCompleta:"",
    requisitosCompletos:"",
  }),

  created() {
    let me = this;
    me.rAtencionId = me.$store.state.ratencionid;
    me.rHechoId = me.$store.state.rhechoid;
    me.nuc = me.$store.state.nuc;

    if (me.rHechoId == null) {
      me.$alert(
        "Notificación",
        "Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpeta y luego en Listar carpeta y   ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.",
        function () {
          me.$router.push("./umixta-carpetas");
        }
      );
    } else {
      me.$notify("Carpeta abierta correctamente !!!", "success");

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
      me.u_clavedistrito = me.$store.state.usuario.clavedistrito;
      //*********************************************** */

      //Logos
      me.listarLogo();
      //Se listan las diligencias ya hechas previamente
      me.listardiligencias();
      //personas relacionadas en la carpeta
      me.listarPersonas();
      //Se lista informacion basica de la carpeta
      me.listarrHecho();
      //Se lista los distritos excepto donde esta el usuario
      me.listardistritos();
      //Lista todos los distritos para obtener una clave
      me.listardistritos2();
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
  computed: {
    btntitle() {
      return this.editedIndex === -1 ? "Guardar e Imprimir" : "Imprimir";
    },
  },
  watch: {},
  methods: {
    async generarQR(tipodo,nuc,nombrefirma,fechadoc,id) 
    {
        
      let me=this; 
      var textoModificado = nuc.replace(/-/g, "~");

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
    //Funcion para listar los logos  presentes en el documento PDF
    listarLogo() 
    {
      let me = this;

      this.$conf.get("api/ConfGlobals/Listar").then(function (response) 
      {
        me.logo1 = response.data.logo1;
        me.logo2 = response.data.logo2;
        me.logo3 = response.data.logo3;
        me.logo4 = response.data.logo4;
          
      }).catch((err) => 
      {
        if (err.response.status == 400) {
          me.$notify("No es un usuario válido", "error");
        } else if (err.response.status == 401) {
          me.$notify(
            "Por favor inicie sesion para poder navegar en la aplicacion",
            "error"
          );
          (me.e401 = true), (me.showpage = false);
        } else if (err.response.status == 403) {
          me.$notify("No esta autorizado para ver esta pagina", "error");
          me.e403 = true;
          me.showpage = false;
        } else if (err.response.status == 404) {
          me.$notify("El recuso no ha sido encontrado", "error");
        } else {
          me.$notify("Error al intentar listar los registros!!!", "error");
        }
      });
    },
    //Se lsitan diligencias que ya se habian hecho
    listardiligencias() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$cat.get("api/RDiligenciasForaneas/Listar/" + me.rHechoId, configuracion).then(function (response)
      {
        me.diligencias = response.data;

      }).catch((err) => 
      {
        if (err.response.status == 400) {
          me.$notify("No es un usuario válido", "error");
        } else if (err.response.status == 401) {
          me.$notify(
            "Por favor inicie sesion para poder navegar en la aplicacion",
            "error"
          );
          (me.e401 = true), (me.showpage = false);
        } else if (err.response.status == 403) {
          me.$notify("No esta autorizado para ver esta pagina", "error");
          me.e403 = true;
          me.showpage = false;
        } else if (err.response.status == 404) {
          me.$notify("El recuso no ha sido encontrado", "error");
        } else {
          me.$notify("Error al intentar listar los registros!!!", "error");
        }
      });
    },
    //Funcion para listar si a una persona registrada en esta carpeta se le esta haciendo la diligencia
    listarPersonas() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var personasArray = [];
      this.$cat.get("api/RAPs/ListarTodos/" + me.rAtencionId, configuracion).then(function (response)
      {
        personasArray = response.data;

        personasArray.map(function (x) 
        {
          me.personas.push({ text: x.nombreCompleto, value: x.personaId });

        });

      }).catch((err) => 
      {
        if (err.response.status == 400) {
          me.$notify("No es un usuario válido", "error");
        } else if (err.response.status == 401) {
          me.$notify(
            "Por favor inicie sesion para poder navegar en la aplicacion",
            "error"
          );
          (me.e401 = true), (me.showpage = false);
        } else if (err.response.status == 403) {
          me.$notify("No esta autorizado para ver esta pagina", "error");
          me.e403 = true;
          me.showpage = false;
        } else if (err.response.status == 404) {
          me.$notify("El recuso no ha sido encontrado", "error");
        } else {
          me.$notify("Error al intentar listar los registros!!!", "error");
        }
      });
    },
    //Funcion para listar infoprmacion general de la carpeta
    listarrHecho() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$cat.get("api/RHechoes/ListarPorId/" + me.rHechoId, configuracion).then(function (response)
      {
        me.agenciaid = response.data.agenciaid
        me.informacionagencia();

      }).catch((err) => 
      {
        if (err.response.status == 400) {
          me.$notify("No es un usuario válido", "error");
        } else if (err.response.status == 401) {
          me.$notify(
            "Por favor inicie sesion para poder navegar en la aplicacion",
            "error"
          );
          (me.e401 = true), (me.showpage = false);
        } else if (err.response.status == 403) {
          me.$notify("No esta autorizado para ver esta pagina", "error");
          me.e403 = true;
          me.showpage = false;
        } else if (err.response.status == 404) {
          me.$notify("El recuso no ha sido encontrado", "error");
        } else {
          me.$notify("Error al intentar listar los registros!!!", "error");
        }
      });
    },
    //Lista todos los distritos excepto donde esta el usuario
    listardistritos() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var distritosarray = "";

      me.$conf.get("api/Distritoes/ListarSinPropiodistrito/" + me.u_iddistrito,configuracion).then(function (response) 
      {
        distritosarray = response.data;
        distritosarray.map(function (x) 
        {
          me.distritos.push({text: x.nombre, value: x.idDistrito, value2: x.clave, });
        });

      }).catch((err) => 
      {
        if (err.response.status == 400) {
          me.$notify("No es un usuario válido", "error");
        } else if (err.response.status == 401) {
          me.$notify(
            "Por favor inicie sesion para poder navegar en la aplicacion",
            "error"
          );
          (me.e401 = true), (me.showpage = false);
        } else if (err.response.status == 403) {
          me.$notify("No esta autorizado para ver esta pagina", "error");
          me.e403 = true;
          me.showpage = false;
        } else if (err.response.status == 404) {
          me.$notify("No hay registros previos", "error");
        } else {
          me.$notify("Error al intentar listar los registros!!!", "error");
        }
      });
    },
    //Lista todos los distritos
    listardistritos2() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var distritosarray = "";

      me.$conf.get("api/Distritoes/Listar", configuracion).then(function (response) 
      {
        distritosarray = response.data;
        distritosarray.map(function (x) 
        {
          me.distritos2.push({text: x.nombre, value: x.idDistrito, value2: x.clave,});
        });

      }).catch((err) => 
      {
        if (err.response.status == 400) {
          me.$notify("No es un usuario válido", "error");
        } else if (err.response.status == 401) {
          me.$notify(
            "Por favor inicie sesion para poder navegar en la aplicacion",
            "error"
          );
          (me.e401 = true), (me.showpage = false);
        } else if (err.response.status == 403) {
          me.$notify("No esta autorizado para ver esta pagina", "error");
          me.e403 = true;
          me.showpage = false;
        } else if (err.response.status == 404) {
          me.$notify("No hay registros previos", "error");
        } else {
          me.$notify("Error al intentar listar los registros!!!", "error");
        }
      });
    },

    //------------------------------------------------------------------Comienzan funciones del formulario------------------------------------------------------------

    //Una vez selecionado el distrito se lista si hay subdireccion de servicios periciales y sus  agencias
    obteneriddsp() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var agenciasarray = "";
      me.agencias = [];

      //En base al distrito obtengo valores de la subdireccionn y de las agencias que estan asociadas a esa subdireccion
      me.$conf.get("api/Agencias/ListarporDSPSP/" + me.distrito.value , configuracion).then(function (response) 
      {
        //En caso de encontrar agencias asociadas coloca las coloca en el siguiente autocomplete
        if(response.data && response.data.length > 0)
        {
          agenciasarray = response.data;
          agenciasarray.map(function (x) 
          {
            me.agencias.push({ text: x.nombre, value: x.idAgencia, value1: x.dSPId, value2: x.responsable, value3: x.nombreDirSub });
          });
        }
        //De lo contrario da aviso y concluye el proceso, pues no se puede solicitar ninguna solicitud a SP
        else
        {
          me.$notify("No se encontro un servicio pericial asociado al distrito", "error");
          me.agencias = [];
        }
          
      }).catch((err) => 
      {
        if (err.response.status == 400) {
          me.$notify("No es un usuario válido", "error");
        } else if (err.response.status == 401) {
          me.$notify(
            "Por favor inicie sesion para poder navegar en la aplicacion",
            "error"
          );
          (me.e401 = true), (me.showpage = false);
        } else if (err.response.status == 403) {
          me.$notify("No esta autorizado para ver esta pagina", "error");
          me.e403 = true;
          me.showpage = false;
        } else if (err.response.status == 404) {
          me.$notify("No hay registros previos", "error");
        } else {
          me.$notify("Error al intentar listar los registros!!!", "error");
        }
      });
    },
    //Una vez selecionado la agencia, se listan los servicios periciales disponibles
    listarServiciosPericiales() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      //Limpio las variables del array que guarda la respuesta completa de la consulta
      me.serviciospericialesArray = [];
      me.serviciospericiales = [];

      me.$conf.get("api/ASPs/ListarporIdagencia/" + me.agencia.value, configuracion).then(function (response) 
      {
        //Primero guardo el resultado completo de la api
        me.serviciospericialesArray = response.data;
        //Aplico un mapeo para ontener objetos selecionables en en modal
        me.serviciospericialesArray.map(function (x) 
        {
          //Asigno dos nuevos valores para evitar realizar una api para solo ocupar esos dos unicos datos
          me.serviciospericiales.push({
                                        text: x.nombreServicio, 
                                        value: x.idASP, 
                                        nodistrito: x.numeroDistrito,
                                        value1: x.nombreServicio,
                                        value2: x.enMateriaDe,
                                        value3: x.nombreDirSub,
                                        value4: x.descripcion,
                                        value5: x.requisitos,
                                      });
        });

        console.log(me.serviciospericialesArray );

      }).catch((err) => 
      {
        if (err.response.status == 400) {
          me.$notify("No es un usuario válido", "error");
        } else if (err.response.status == 401) {
          me.$notify(
            "Por favor inicie sesion para poder navegar en la aplicacion",
            "error"
          );
          (me.e401 = true), (me.showpage = false);
        } else if (err.response.status == 403) {
          me.$notify("No esta autorizado para ver esta pagina", "error");
          me.e403 = true;
          me.showpage = false;
        } else if (err.response.status == 404) {
          me.$notify("El recuso no ha sido encontrado", "error");
        } else {
          me.$notify("Error al intentar listar los registros!!!", "error");
        }
      });
    },
    listarTL() 
    {
      let me = this;
      me.listaMateriaConcat = "";
      me.nombreServicioConcat = "";
      this.$validator.validate().then((result) => 
      {
        if (result) 
        {
          //Aplico un recorrido de lo seleccionado con el fin de generar untexto final que sera usado en el contenido del documento
          for(let i = 0; i < me.serviciopericialeId.length; i++)
          {
            // CONCATENAR LA LISTA DE MATERIAS PARA EL TEXTO FINAL
            me.listaMateriaConcat = me.listaMateriaConcat + (me.listaMateriaConcat == "" ? "" : ", ") + me.serviciopericialeId[i].value2;
            //CONCATENAR LOS SERVICIOS PARA EL TEXTO PRINCIPAL
            me.nombreServicioConcat = me.nombreServicioConcat + (me.listaMateriaConcat == "" ? "" : ", ") + me.serviciopericialeId[i].value1;

          }
          //Una vez realizado el contenido de mi texto concateno estructuras faltantes al mismo tiempo habilito el editor de texto
          me.botonvistaprev = false;

          me.textolibre = "<p>Por medio de la presente, solicito tenga a bien asignar perito(a) en materia de <strong>" +
            me.listaMateriaConcat + "</strong>, a efecto de que se sirva realizar <strong>" + me.nombreServicioConcat +
            "</strong>, de <strong>" + (me.statusdirigido ? me.personaId.text : "PERSONA") + ".</strong>";

          me.textofinal = "<p>PRESENTE.</p> <p><br></p>" + "<p><br></p>" + me.textolibre + "<p><br></p><p><br></p><p><br></p>" +
            "<p>Agradeciendo de antemano la atención brindada a mi petición.</p>";
        }
      });
    },
    //Funcion para guardar la diligencia
    async crearPDF_SP() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      var descripcionRegTabI = "Registro de solicitud de servicios periciales foraneo a " + me.distrito.value + " para la agencia de " + me.agencia.text;

      me.$confirm
      (
        "Esperando confirmación", 
        "Estas seguro de que deseas guardar información e imprimir el documento. Una vez realizada esta accion no podra realizar cambios", async function () 
        {
          try 
          {
            for (let i = 0; i < me.serviciopericialeId.length; i++) 
            {
              let response = await this.$cat.post("api/RDiligenciasForaneas/CrearPI",
              {
                rHechoId: me.rHechoId,
                fechasolicitud: me.fecha,
                dirigidoa: me.agencia.value2,
                dirsubpro: me.serviciopericialeId[i].value3,
                emitidopor: me.u_nombre,
                udirsubpro: me.u_dirSubPro,
                upuesto: me.u_puesto,
                statusrespuesta: "Solicitado",
                servicio: me.serviciopericialeId[i].text,
                especificaciones: me.textolibre,
                aspid: me.serviciopericialeId[i].value,
                prioridad: me.prioridad,
                modulo: me.u_modulo,
                agencia: me.u_agencia,
                respuestas: " ",
                nuc: me.nuc,
                textofinal: me.textofinal,
                numeroOficio: me.numerooficio,
                NumeroDistrito: me.serviciopericialeId[i].nodistrito,
                Lng: me.lng,
                Dirigido: me.statusdirigido,
                AgenciaEnvia: me.u_idagencia,
                AgenciaRecibe: me.distrito.value,
                NumeroDistritoOrigen: me.u_clavedistrito[0],
              }, configuracion);

              if (response.data.enviada == false) 
              {
                alert("La solicitud fallo en llegar al distrito destino, puedes reenviarla con el boton de reenviar(boton verde)");
              }
            }

            // Solo se ejecutará después de que todas las peticiones se completen.
            me.$notify("La información se guardo correctamente !!!", "success");
            me.modaldocumento = false;
            me.ModalServicioPericial = 0;
            me.crearRegistroTableroI(descripcionRegTabI);
            me.listardiligencias();
            me.close();

          } catch (err) 
          {
            if (err.response.status == 400) {
              me.$notify("No es un usuario válido", "error");
            } else if (err.response.status == 401) {
              me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", "error");
              me.e401 = true;
              me.showpage = false;
            } else if (err.response.status == 403) {
              me.$notify("No esta autorizado para ver esta pagina", "error");
              me.e403 = true;
              me.showpage = false;
            } else if (err.response.status == 404) {
              me.$notify("El recuso no ha sido encontrado", "error");
            } else {
              me.$notify("Error al intentar crear el  registro!!!", "error");
            }
          }
        },
        function () {
          alertify.warning("Verifica la información");
        }
      ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
    },
    //Esta funcion solo esta disponible para servicios periciales que hayan fallado
    reenviarSolicitudP(item)
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      //Envia el id de la diligencia para editarla y el id del distrito para saber de nuevo donde hacer la clonacion
      this.$cat.put("api/RDiligenciasForaneas/ReenviarSolicitud",
      {
        IdRDiligenciasForaneas: item.idRDiligenciasForaneas,
        AgenciaRecibe: item.agenciaRecibe,

      },configuracion).then(function (response) 
      {
        //En caso de exito da aviso y vuelve a listar las diligencias, esto para que el boton de reenvio desaparezca
        if(response.data.enviada == true)
        {
          alert("La solicitud pericial se a reenviado con exito");
          me.listardiligencias();
        }
        else
        {
          //Hace lo mismo en caso de fallar, da aviso y lista pero nada cambiara
          alert("El reenvio de la solicitud pericial a fallado, intentalo mas tarde o ponte en contacto con Desarrollo de Sistemas de la PGJH");
          me.listardiligencias();
        }
      }).catch((err) => 
      {
        if (err.response.status == 400) {
          me.$notify("No es un usuario válido", "error");
        } else if (err.response.status == 401) {
          me.$notify(
            "Por favor inicie sesion para poder navegar en la aplicacion",
            "error"
          );
          (me.e401 = true), (me.showpage = false);
        } else if (err.response.status == 403) {
          me.$notify(
            "No esta autorizado para ver esta pagina",
            "error"
          );
          me.e403 = true;
          me.showpage = false;
        } else if (err.response.status == 404) {
          me.$notify("El recuso no ha sido encontrado", "error");
        } else {
          me.$notify(
            "Error al intentar crear el  registro!!!",
            "error"
          );
        }
      });

    },
    imprim12() {
      var printContents = document.getElementById("mapa").outerHTML;
      var w = window.open();
      w.document.write(printContents);
      w.print();

    },
    cerrarcarpeta() {
      this.$store.state.rHechoId = null;
      this.$store.state.nuc = null;
      this.$router.push("./umixta-carpetas");
    },
    agregar() {
      this.limpiar();
      this.origenDirSub = "";
      this.fecha = "";
      this.responsable = "";
      this.nombreDirSub = "";
      this.textolibre = "";
      this.nombre = "";
      this.puesto = "";
      this.serviciopericialeId = "";
      this.personaId = "";
      this.prioridad = "";
      this.nombreAgencia = "";
      this.requisitos = "";
      this.descripcion = "";
      this.textofinal = "";
      this.botonvistaprev = true;
      (this.statusdirigido = false), (this.modalAdd = 1);
    },
    close() {
      console.log("entra al close");
      this.modalAdd = 0;
    },
    vermsj(item) {
      if (item.statusRespuesta == "Rechazado") this.respuesta = item.respuestas;
      else this.respuesta = item.respuesta;

      this.dialogcsmsj = true;
    },
    limpiar() {
      this.origenDirSub = "";
      this.fecha = "";
      this.responsable = "";
      this.nombreDirSub = "";
      this.textolibre = "";
      this.nombre = "";
      this.puesto = "";
      this.serviciopericialeId = "";
      this.personaId = "";
      this.prioridad = "";
      this.nombreAgencia = "";
      this.requisitos = "";
      this.descripcion = "";
      this.indicio = "";
      this.lt = "";
      this.lng = "";
      this.numerooficio = "";
      this.editedIndex = -1;
      this.agencia = "";
      this.ModalServicioPericial = 0;
      this.qrCode =  null;
      this.vistaPreviaTF =  true;
      this.distrito = "";
    },
    obtenernombredistritoclave(clave) {
      for (var i = 0; i < this.distritos2.length; i++)
        if (this.distritos2[i].value == clave) return this.distritos2[i].text;
    },
    generarfecha() {
      var fecha;
      fecha =
        moment().format("DD") +
        " de " +
        moment().format("MMMM") +
        " del " +
        moment().format("YYYY");
      return fecha;
    },
    imprimirdiligencia(item) {
      let me = this;
      this.numerooficio = item.numeroOficio;
      this.origenDirSub = item.uDirSubPro;
      this.fecha = item.fechaSolicitud;
      this.responsable = item.dirigidoa;
      this.nombreDirSub = item.dirSubPro;
      this.textolibre = item.especificaciones;
      this.nombre = item.emitidoPor;
      this.puesto = item.uPuesto;
      this.textofinal = item.textofinal;
      this.editedIndex = 1;
      this.ModalServicioPericial = 1;

      me.vistaPreviaTF = false;
      me.generarQR(me.docDiligenciaFor,me.nuc,item.emitidoPor,item.fechaSys,item.idRDiligenciasForaneas);

      setTimeout(() => 
      {
        this.imprimirPDFDF(item.emitidoPor, item.uPuesto, item.agencia);
        this.modaldocumento = false;
      }, 1000);

      
    },
    informacionagencia() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$conf
        .get("api/Agencias/Listarporid/" + me.agenciaid, configuracion)
        .then(function (response) {
          me.agenciainfo = response.data;
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    switchchange() {
      this.personaId = "";
      this.textolibre = "";
    },
    Obtenerltlng() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RAPs/ListarDP/" + me.personaId.value, configuracion)
        .then(function (response) {
          me.lt = response.data.lat;
          me.lng = response.data.lng;
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    imprimirSP() {
      let me = this;

      var now = moment();
      me.generarQR(me.docDiligenciaFor,me.nuc,me.u_nombre,now,me.idrdiligenciasforaneas);

      me.dia = moment().format("DD");
      me.mes = moment().format("MMMM");
      me.año = moment().format("YYYY");
      me.hr = moment().format("h:mm:ss a");
      me.fecha = me.dia + " de " + me.mes + " del " + me.año;
      if (me.rAtencionId == 0) {
        me.$notify("Aun no a  abierto ninguna carpeta", "error");
      } else {
        this.$validator.validate().then((result) => {
          if (result) {
            me.ModalServicioPericial = 1;
            me.mostrarPDFDF(me.u_nombre, me.u_puesto, me.u_agencia);
          }
        });
      }
    },
    ocultarformatoSP() {
      this.limpiar();
      this.ModalServicioPericial = 0;
    },
    colocarDescripcion()
    {
      let me  = this;

      
      
        for(let i = 0 ; i < me.serviciopericialeId.length ; i++)
        {
          if(me.serviciopericialeId.length == 1)
          {
            me.descripcionCompleta = me.serviciopericialeId[i].value4;
            me.requisitosCompletos = me.serviciopericialeId[i].value5;
          }
          else
          {
            me.descripcionCompleta = me.descripcionCompleta + "|" + me.serviciopericialeId[i].value4; 
            me.requisitosCompletos = me.requisitosCompletos + "|" + me.serviciopericialeId[i].value5; 
          }
        }

      
    },
    imprimirPDFDF(nombre, puesto, agencia) 
    {
      let me = this;

      var dd = me.downloadPdf(nombre, puesto, agencia);

      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.vfs;
      }
      var doc = pdfMake.createPdf(dd).print();
    },
    mostrarPDFDF(nombre, puesto, agencia) {
      let me = this;
      
      var dd = me.downloadPdf(nombre, puesto, agencia);
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.vfs;
      }
      var doc = pdfMake.createPdf(dd);
      var f = document.getElementById("iframepdf");
      var callback = function (url) {
        f.setAttribute("src", url);
      };
      doc.getDataUrl(callback, doc);
      me.modaldocumento = true;
    },
    downloadPdf(nombre, puesto, agencia) {
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
      var agenciainfodr = this.agenciainfo["direccion"];
      var agenciainfotel = this.agenciainfo["telefono"];

      //***************************************************************************** */

      let me  = this;
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
                agenciainfodr +
                "\n" +
                agenciainfotel +
                "\n" +
                "www.hidalgo.gob.mx",
              style: "subheaderlogo",
              style: "PiePagina",
              margin: [312, 12, 72, 0],
              alignment: "right",
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
              image: logo3,
              width: 612,
              absolutePosition: { x: 0, y: 0 },
            },

            //{
            //    image: logo2,
            //    width: 50,
            //    absolutePosition: {x: 495, y: 30},
            //},
          ];
        },

        content: [
          {
            text: u_subProc + "\n" + u_dirSubPro + "\n" + u_agencia,
            style: "Adscripcion",
            absolutePosition: { x: 85, y: 95 },
          },
          {
            text: "Número Único de Caso: " + nuc,
            style: "Titulo",
            alignment: "right",
            margin: [0, 40, 72, 0],
            absolutePosition: { x: 85, y: 150 },
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
            text: this.agencia.value3 + "\n" + "\n" + "\n" + "\n",
            style: "DePara",
            alignment: "justify",
            margin: [0, 50, 200, 0],
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
            color: "white",
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
    mostrarpdf2() {
      let me = this;
      var dd = me.downloadPdf2();
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.vfs;
      }

      var doc = pdfMake.createPdf(dd);
      var doc = pdfMake.createPdf(dd).print();
    },
    downloadPdf2(elemento, titulo) {
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
      var agenciainfodr = this.agenciainfo["direccion"];
      var agenciainfotel = this.agenciainfo["telefono"];

      //***************************************************************************** */
      var quotes = document.getElementById(elemento);
      html2canvas(quotes)
        .then((canvas) => {
          var data = canvas.toDataURL("image/jpeg", 1);
          var dd = {
            pageSize: "LEGAL",
            pageOrientation: "portrait",
            pageMargins: [30, 250, 30, 100],
            footer: function (currentPage, pageCount) {
              const footerContent = [
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
                  absolutePosition: { x: 0, y: 30 },
                },
              ];

              return footerContent;
            },
            header: function (currentPage, pageCount, pageSize) {
              return [
                {
                  image: logo3,
                  width: 612,
                  absolutePosition: { x: 0, y: 0 },
                },
                //{
                //    image: logo2,
                //    width: 70,
                //    absolutePosition: {x: 490, y: 30},
                //},
              ];
            },

            content: [
              {
                text: u_dirSubPro + "\n",
                style: "subheaderlogo",
                absolutePosition: { x: 37, y: 100 },
              },
              {
                text: titulo + "\n" + "\n" + "\n",
                style: "texton",
                alignment: "center",
              },
              {
                image: data,
                width: 550,
                alignment: "center",
              },

              {
                text: this.u_distrito + ", Hidalgo a " + this.generarfecha(),

                style: "subheader",
                absolutePosition: { x: 80, y: 150 },
                alignment: "right",
              },
            ],

            styles: {
              header: {
                fontSize: 18,
                bold: true,
              },
              subheader: {
                fontSize: 12,
                bold: true,
              },
              subheaderlogo: {
                fontSize: 10,
                bold: true,
              },
              texto: {
                fontSize: 12,
              },
              texton: {
                fontSize: 12,
                bold: true,
              },
            },
          };

          var doc = pdfMake.createPdf(dd);
          var f = document.getElementById("iframepdf");
          var callback = function (url) {
            f.setAttribute("src", url);
          };
          doc.getDataUrl(callback, doc);
          this.modaldocumento = true;
          return dd;
        })
        .catch((error) => {
          console.log("Erorr al generar pdf", error);
        });
    },
    crearRegistroTableroI(descripcionRegTabI) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$CAT
        .post(
          "api/RegistroTableroI/Crear",
          {
            RhechoId: me.rHechoId,
            TipoRegistroTableroI: descripcionRegTabI,
            Distrito: me.u_distrito,
            DirSub: me.u_dirSubPro,
            Agencia: me.u_agencia,
            ModuloServicioId: me.u_idmoduloservicio,
            Modulo: me.u_modulo,
            UsuarioId: me.u_idusuario,
            NombreUsuario: me.u_nombre,
          },
          configuracion
        )
        .then(function (response) {
          me.$notify("La información se guardo correctamente !!!", "success");
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar crear el  registro!!!", "error");
          }
        });
    },
    imprim1() {
      var printContents = document.getElementById("mapa").outerHTML;
      var w = window.open();
      w.document.write(
        "<div style='position: absolute; left:500px; top:100px;'<h1 style='font-size:10px; color:blue;'>" +
          printContents +
          "<h1></div>"
      );
      //w.document.write(printContents);
      w.print();
    },
    mostrarmapa(item) {
      this.center2.lng = +item.lng;
      this.center2.lat = +item.lat;
      this.addMarker2();
      this.geoloc2 = 2;
      this.modalGeolocalizacion2 = 1;
    },
    imprimirmapa() {
      let me = this;
      me.downloadPdf2("mapa", "mapa");
    },
    btn_geoloc12() {
      this.geoloc2 = 1;
      this.modalGeolocalizacion2 = 1;
    },
    btn_geoloc22() {
      this.geoloc2 = 2;
      this.modalGeolocalizacion2 = 1;
    },
    setPlace2(place) {
      (this.markers2 = []), (this.places2 = []), (this.currentPlace2 = place);
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
    geolocate2: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center2 = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    guardarGeolocalizacion2() {
      if (this.geoloc == 1) {
        this.lat2 = this.center2.lat;
        this.lng2 = this.center2.lng;
        this.geoloc2 = 0;
        this.modalGeolocalizacion2 = 0;
      }
      if (this.geoloc == 2) {
        this.de_lat2 = this.center2.lat;
        this.de_lng2 = this.center2.lng;
        this.geoloc2 = 0;
        this.modalGeolocalizacion2 = 0;
      }
    },
    activarterreno() {
      this.opcionesmapa.mapTypeId = "roadmap";
    },
    activarsatellite() {
      this.opcionesmapa.mapTypeId = "hybrid";
    },
    aumentarzoorm() {
      this.zoom++;
    },
    disminuirzoom() {
      this.zoom--;
    },
  },
};
</script>
<style>
#logo1 {
  float: left;
  margin-left: 2%;
  margin-right: 2%;
}

#logo2 {
  float: right;
  margin-left: 2%;
  margin-right: 2%;
}

#imagen1 {
  width: 297px;
}

#imagen2 {
  width: 95px;
}

#datos {
  margin-top: 2%;
  margin-left: 2%;
  margin-right: 2%;
  text-align: right;
}

#encabezado {
  text-align: right;
  margin-top: 100px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 27px;
}

#cuerpo {
  margin-top: 2%;
  margin-left: 2%;
  margin-right: 2%;
  text-align: justify;
}

.titulo {
  font-size: 22px;
}

.texto {
  font-size: 20px;
}

.tituloright {
  font-size: 22px;
  text-align: right;
}

.textoright {
  font-size: 20px;
  text-align: right;
}

#formato {
  text-align: left;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 20px;
}

#titcenter {
  text-align: center;
}

section {
  clear: left;
}

#footer {
  margin-top: 20%;
  text-align: center;
}

.table {
  width: 100%;
  margin-top: 10px;
  margin-left: 10px;
  border-collapse: collapse;
  border-spacing: 30px;
}

.espaciado {
  padding: 30px !important;
}
</style>
