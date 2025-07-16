<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Entrevista y/o Ampliación de entrevista.</v-toolbar-title
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
              class="mx-2 pt-2"
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
              class="mx-2 pt-2"
              slot="activator"
              v-on="on"
              @click="agregar"
              fab
              dark
              small
              color="success"
            >
              <v-icon class="mt-1" dark>add</v-icon>
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
          <td>{{ props.item.usuario }}</td>
          <td>{{ props.item.uModulo }}</td>
          <td>{{ props.item.nombrePersona }}</td>
          <td>{{ props.item.tipoEA }}</td>
          <td>
            <div v-if="props.item.entrevistaInicial">
              <span>Si</span>
            </div>
            <div v-else>
              <span>No</span>
            </div>
          </td>
          <td class="justify-center layout px-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2"
                  v-on="on"
                  color="warning"
                  @click="imprimirdoc(props.item)"
                >
                  print
                </v-icon>
              </template>
              <span>Imprimir entrevista</span>
            </v-tooltip>
            <v-tooltip
              bottom
              v-if="props.item.clasificacionP !== 'Denunciante'"
            >
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2"
                  v-on="on"
                  color="warning"
                  @click="listarrHecho3(props.item)"
                >
                  menu_book
                </v-icon>
              </template>
              <span>Imprimir lectura de derechos</span>
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
            <v-toolbar-title>Entrevista o ampliación.</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
              <v-btn @click="generarepresentates()" color="success"
                >Vista previa</v-btn
              >
              <v-btn icon @click="modalAdd = false">
                <v-icon class="mt-1">close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-flex mx-5>
            <v-card-text>
              <v-form>
                <br />
                <br />
                <v-container grid-list-md>
                  <v-layout row wrap>
                    <v-flex class="espaciado" xs12 sm12 md6 lg6>
                      <v-autocomplete
                        name="tipo de declaración"
                        :items="tipos"
                        v-model="tipo"
                        v-validate="'required'"
                        label="*Tipo:"
                        :error-messages="errors.collect('tipo de declaración')"
                      />
                      <v-text-field
                        name="numero del documento de identificación"
                        label="*Numero del documento de identificación"
                        v-model="noidentificacion"
                        v-validate="'required'"
                        v-if="
                          personaId.value1 == 'Imputado' &&
                          (personaId.value2 < 18 ||
                            personaId.value4 == 'INFANCIA (0 A 5 AÑOS)' ||
                            personaId.value4 == 'NIÑEZ (6 A 12 AÑOS)' ||
                            personaId.value4 == 'ADOLECENCIA (13 A 17 AÑOS)')
                        "
                        :error-messages="
                          errors.collect(
                            'numero del documento de identificación'
                          )
                        "
                      />
                      <v-text-field
                        name="nombre del acompañante"
                        label="*Nombre del acompañante:"
                        v-model="acnombre"
                        v-validate="'required'"
                        v-if="
                          (personaId.value1 == 'Victima directa' ||
                            personaId.value1 == 'Victima indirecta' ||
                            personaId.value1 == 'Imputado') &&
                          (personaId.value2 < 18 ||
                            personaId.value4 == 'INFANCIA (0 A 5 AÑOS)' ||
                            personaId.value4 == 'NIÑEZ (6 A 12 AÑOS)' ||
                            personaId.value4 == 'ADOLECENCIA (13 A 17 AÑOS)')
                        "
                        :error-messages="
                          errors.collect('nombre del acompañante')
                        "
                      />
                      <v-text-field
                        name="psicologa del menor"
                        label="*Psicologa del menor:"
                        v-model="psimenor"
                        v-validate="'required'"
                        v-if="
                          (personaId.value1 == 'Victima directa' ||
                            personaId.value1 == 'Victima indirecta' ||
                            personaId.value1 == 'Testigo') &&
                          (personaId.value2 < 18 ||
                            personaId.value4 == 'INFANCIA (0 A 5 AÑOS)' ||
                            personaId.value4 == 'NIÑEZ (6 A 12 AÑOS)' ||
                            personaId.value4 == 'ADOLECENCIA (13 A 17 AÑOS)')
                        "
                        :error-messages="errors.collect('psicologa del menor')"
                      />
                      <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        :return-value.sync="fechaentrevista"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            name="fecha de la entrevista"
                            :value="fechae"
                            label="*Fecha de la entrevista:"
                            prepend-icon="event"
                            clearable
                            readonly
                            v-on="on"
                            v-validate="'required'"
                            :error-messages="
                              errors.collect('fecha de la entrevista')
                            "
                          />
                        </template>
                        <v-date-picker
                          locale="es"
                          v-model="fechaentrevista"
                          no-title
                          scrollable
                        >
                          <v-spacer />
                          <v-btn text color="primary" @click="menu1 = false"
                            >Cancel</v-btn
                          >
                          <v-btn text color="primary" @click="fechainif()"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex class="espaciado" xs12 sm12 md6 lg6>
                      <v-autocomplete
                        name="persona"
                        :items="personas"
                        v-model="personaId"
                        v-validate="'required'"
                        return-object
                        label="*Persona que va a declarar:"
                        v-on:change="listarPorIdPersona()"
                        :error-messages="errors.collect('persona')"
                      />
                      <v-text-field
                        name="parentesco del acompañante"
                        label="*Parentesco del acompañante:"
                        v-model="acvictima"
                        v-validate="'required'"
                        v-if="
                          (personaId.value1 == 'Victima directa' ||
                            personaId.value1 == 'Victima indirecta' ||
                            personaId.value1 == 'Imputado') &&
                          (personaId.value2 < 18 ||
                            personaId.value4 == 'INFANCIA (0 A 5 AÑOS)' ||
                            personaId.value4 == 'NIÑEZ (6 A 12 AÑOS)' ||
                            personaId.value4 == 'ADOLECENCIA (13 A 17 AÑOS)')
                        "
                        :error-messages="
                          errors.collect('parentesco del acompañante')
                        "
                      />
                      <v-text-field
                        name="puesto"
                        label="*Cargo a quien va dirigido"
                        v-model="puestopsi"
                        v-validate="'required'"
                        v-if="
                          (personaId.value1 == 'Victima directa' ||
                            personaId.value1 == 'Victima indirecta') &&
                          (personaId.value2 < 18 ||
                            personaId.value4 == 'INFANCIA (0 A 5 AÑOS)' ||
                            personaId.value4 == 'NIÑEZ (6 A 12 AÑOS)' ||
                            personaId.value4 == 'ADOLECENCIA (13 A 17 AÑOS)')
                        "
                        :error-messages="errors.collect('puesto')"
                      />
                      <v-autocomplete
                        name="documento de identificación del acompañante"
                        :items="docsidentificaciones"
                        v-model="docidentificacion"
                        label="*Documento de identificación del acompañante:"
                        v-validate="'required'"
                        v-if="
                          personaId.value1 == 'Imputado' &&
                          (personaId.value2 < 18 ||
                            personaId.value4 == 'INFANCIA (0 A 5 AÑOS)' ||
                            personaId.value4 == 'NIÑEZ (6 A 12 AÑOS)' ||
                            personaId.value4 == 'ADOLECENCIA (13 A 17 AÑOS)')
                        "
                        :error-messages="
                          errors.collect(
                            'documento de identificación del acompañante'
                          )
                        "
                      />
                      <v-text-field
                        name="CURP del acompañante"
                        label="*CURP del acompañante:"
                        v-model="curpacompa"
                        v-validate="'required'"
                        v-if="
                          personaId.value1 == 'Imputado' &&
                          (personaId.value2 < 18 ||
                            personaId.value4 == 'INFANCIA (0 A 5 AÑOS)' ||
                            personaId.value4 == 'NIÑEZ (6 A 12 AÑOS)' ||
                            personaId.value4 == 'ADOLECENCIA (13 A 17 AÑOS)')
                        "
                        :error-messages="errors.collect('CURP del acompañante')"
                      />
                      <v-text-field
                        name="padre del testigo"
                        label="*Padre del testigo:"
                        v-model="acnombre"
                        v-validate="'required'"
                        v-if="
                          personaId.value1 == 'Testigo' &&
                          (personaId.value2 < 18 ||
                            personaId.value4 == 'INFANCIA (0 A 5 AÑOS)' ||
                            personaId.value4 == 'NIÑEZ (6 A 12 AÑOS)' ||
                            personaId.value4 == 'ADOLECENCIA (13 A 17 AÑOS)')
                        "
                        :error-messages="errors.collect('padre del testigo')"
                      />
                      <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="horae"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            name="hora de la entrevista"
                            v-model="horae"
                            label="*Hora de la entrevista:"
                            prepend-icon="access_time"
                            readonly
                            v-on="on"
                            v-validate="'required'"
                            :error-messages="
                              errors.collect('hora de la entrevista')
                            "
                          />
                        </template>
                        <v-time-picker
                          v-if="menu2"
                          v-model="horae"
                          full-width
                        />
                        <v-card>
                          <v-card-actions>
                            <v-spacer />
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu2.save(horae)"
                              >OK</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12>
                      <v-card elevation="0">
                        <v-card-title>
                          <h3>
                            El compareciente hace del conocimiento de esta
                            Representación social los siguientes hechos:
                          </h3>
                        </v-card-title>
                        <v-divider />
                        <v-card-text>
                          <v-form>
                            <vue-editor
                              name="hechos"
                              v-model="hechos"
                              v-validate="'required'"
                              outline
                              height="350px;"
                              style="max-height: 310px; overflow-y: scroll"
                              :editorToolbar="customToolbar"
                              :error-messages="errors.collect('hechos')"
                            />
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
      <v-dialog
        v-model="modaldocumento"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Documento.</v-toolbar-title>
            <v-spacer/>
            <v-btn @click.native="prevPage()"><</v-btn>
            <div class="d-flex align-center">
              <p class="ma-0">{{this.numpage}}/{{this.currentpdfpages}}</p>
            </div>
            <v-btn @click.native="nextPage()">></v-btn>
            <v-spacer />
            <v-toolbar-items>
              <v-btn color="success" text @click.native="guardar()"
                >Guardar oficio</v-btn
              >
              <v-btn icon @click="modaldocumento = false; numpage=1">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <canvas id="canvaspdf"
                    style="border: 2px solid black; width: 50%; height: 50%; margin-left: 25%"
            ></canvas>
<!--            <iframe
              id="iframepdf"
              type="application/pdf"
              width="100%"
              height="835"
              frameborder="0"
              scrolling="no"
            />-->
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
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
import { debug } from "util";
import moment from "moment";
import "moment/locale/es";
import alertify from "alertifyjs";
import { VueEditor } from "vue2-editor";
import n401 from './401.vue';
import n403 from './403.vue';
import { error } from "util";
import { runInThisContext } from "vm";
import QRCode from "qrcode";
import { generarQRCodeBase64 } from './crearQR';
import Swal from "sweetalert2";
import {firmarDocumento} from "@/helpers/efirma";

export default {
  components: {
    "vue2-editor": VueEditor,
    n401,
    n403,
  },
  data: () => ({
    //variables de pdf
    numpage: 1,
    currentpdfpages: 0,
    base64pdf: "",
    canvasid: "",

    alert: false,
    dialog: false,
    rahid: "",
    rAtencionId: "",
    rHechoId: "",
    agenciaid: "",
    nuc: "",
    showpage: true,
    e401: false,
    e403: false,
    //-------Logos-----------------------------------------/
    logo1: "",
    logo2: "",
    //*************** */
    oficios: [],
    tipos: ["Entrevista", "Ampliación"],
    tipo: "",
    numerooficio: "",
    personas: [],
    personaId: "",
    texto: "",
    comilla: '"',
    horas: "",
    texto2: "",
    tipo2: "",
    texto3: "",
    manifesto: "",
    hechos: "",
    representantes: [],
    representantesf: "",
    trepresentantes: [],
    representantei: "",
    acnombre: "",
    acvictima: "",
    puestopsi: "",
    psimenor: "",
    docsidentificaciones: [],
    docidentificacion: "",
    noidentificacion: "",
    curpacompa: "",
    personaf: "",
    inicialesf: "",
    idpersona: "",
    razonsocial: "",
    rfc: "",
    acnombre: "",
    fechaentrevista: "",
    fechae: "",
    menu1: false,
    menu2: false,
    horae: "",
    docacredita: "",
    headers: [
      { text: "Emitida por", value: "usuario", sortable: true },
      { text: "Módulo", value: "modulo", sortable: true },
      { text: "Persona", value: "nombrePersona", sortable: true },
      { text: "Tipo", value: "tipoEA" },
      { text: "Entrevista inicial", value: "entrevistaInicial" },
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
    //*************** */
    search: "",
    rowsPerPageItems: [10, 20, 30, 40, 50],
    pagination: {
      rowsPerPage: 20,
    },
    modalAdd: false,
    modaldocumento: false,
    aux: false,
    fechasuceso: "",
    direccionsuceso: "",
    direccionsucesof: "",
    vialidades:[],
    vialidadNombre: "",
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
    u_municipio: "",
    iniciales: "",
    directorPI: "",
    idAmpliacion:"",
    //----------------------------------------------------
    texto: 'Vista Previa',
    qrCode: null,
    docEntrevista: 'Entrevista',
    vistaPreviaTF: true,
    docLecDer: 'Lectura de derechos',
    nombreE: '',
    puestoE:'',
    agenciaE: ''
  }),
  created() {
    let me = this;
    me.rHechoId = me.$store.state.rhechoid;
    me.rAtencionId = me.$store.state.ratencionid;
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
      console.log(me.$store.state.usuario.usuario);
      me.u_clave = me.$store.state.usuario.clave;
      me.u_rol = me.$store.state.usuario.rol;
      me.u_puesto = me.$store.state.usuario.puesto;
      me.u_subproc = me.$store.state.usuario.subProc;
      me.u_municipio = me.$store.state.usuario.municipio;
      //*********************************************** */
      me.listarLogo();
      me.listar();
      me.listarrHecho();
      me.listarPersonas();
      me.Listartrepresentantes();
      me.listarIdentificacion();
      me.obtenerdirectorPI();
      me.listardireccionhecho();
      me.listarVialidad();
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
  computed: {},
  watch: {
    numpage(oldVal, newVal) {
      this.renderPdfToCanvas(this.base64pdf.split(",")[1], this.canvasid, this.numpage)
    }
  },
  methods: {
    //funciones pdf to canvas
    async renderPdfToCanvas(base64pdf, canvasId, numpage) {
      // Importación clásica compatible con v2.x
      // ✅ Usa la versión legacy transpilada
      const pdfjsLib = require('pdfjs-dist/legacy/build/pdf');


      // Configurar el worker
      pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';


      // Convertir base64 a Uint8Array
      const binary = atob(base64pdf);
      const length = binary.length;
      const bytes = new Uint8Array(length);
      for (let i = 0; i < length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      // Cargar documento
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      this.currentpdfpages = pdf.numPages
      const page = await pdf.getPage(numpage); // renderiza solo la página 1
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      // Preparar canvas
      const canvas = document.getElementById(canvasId);
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Renderizar en canvas
      await page.render({ canvasContext: context, viewport }).promise;
    },
    nextPage(){
      if(this.numpage<this.currentpdfpages){
        this.numpage = this.numpage + 1
      }else{

      }

    },
    prevPage(){
      if(this.numpage>1){
        this.numpage = this.numpage - 1
      }else{

      }

    },

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
    listarLogo() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$conf
        .get("api/ConfGlobals/Listar")
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
    obtenerdirectorPI() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$controlacceso
        .get("api/Usuarios/DirectorUECS/" + me.u_iddistrito, configuracion)
        .then(function (response) {
          me.directorPI = response.data.nombre;
        });
    },
    cerrarcarpeta() {
      this.$store.state.rhechoid = null;
      this.$store.state.nuc = null;
      this.$router.push("./umixta-carpetas");
    },
    listarrHecho() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RHechoes/ListarPorId/" + me.rHechoId, configuracion)
        .then(function (response) {
          (me.agenciaid = response.data.agenciaid),
            (me.fechasuceso = response.data.fechaHoraSuceso);
          me.informacionagencia();
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
    listardireccionhecho() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      console.log(me.rHechoId);
      me.$CAT
        .get(
          "api/DireccionDelitoes/ListarPoridHecho/" + me.rHechoId,
          configuracion
        )
        .then(function (response) {
          let vialidadEncontrada = me.vialidades.find(v => v.value == response.data.tipoVialidad);
          let vialidadN = vialidadEncontrada ? vialidadEncontrada.text : "";

          me.direccionsucesof =
           vialidadN +
            " "  +
            response.data.calle +
            " " +
            response.data.noint +
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
            response.data.cp;
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
    listarPersonas() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var personasArray = [];
      var edad;
      me.$CAT
        .get("api/RAPs/ListarTodos/" + me.rAtencionId, configuracion)
        .then(function (response) {
          //console.log(response.data);
          personasArray = response.data;
          personasArray.map(function (x) {
            me.personas.push({
              text: x.nombreCompleto,
              value: x.personaId,
              value1: x.clasificacionPersona,
              value2: x.edad,
              value3: x.alias,
              moralfisica: x.tipoPersona,
              value4: x.rangoEdad,
            });
          });
          //console.log(personasArray)
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

    listarPorIdPersona() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RAPs/Listarpersona/" + me.personaId.value, configuracion)
        .then(function (response) {
          //COMPRUEBA QUE NO PERTENERZA A UN RANGO DE EDAD DE UN MENOR
          if (
            me.personaId.value1 === "Imputado" &&
            me.personaId.value2 >= 18 &&
            me.personaId.value4 != "INFANCIA (0 A 5 AÑOS)" &&
            me.personaId.value4 != "NIÑEZ (6 A 12 AÑOS)" &&
            me.personaId.value4 != "ADOLECENCIA (13 A 17 AÑOS)"
          )
            me.hechos =
              "con fundamento en lo dispuesto por los artículos 8, 20 apartado B de la constitución Política de los Estados Unidos Mexicanos en relación con los diversos 50, 113, del código Nacional de procedimientos penales solicito a esta autoridad se me expida copia simple de todo lo actuado dentro de la presente carpeta de investigación, siendo todo lo que deseo manifestar. En uso de la voz el defensor ... ";
          else me.hechos = "";
          me.clasificacionPersona = response.data.clasificacionPersona;
          me.nombre = response.data.nombreCompleto;
          me.alias = response.data.alias;
          me.tipopersona = response.data.tipoPersona;
          me.datosProtegidos = response.data.datosProtegidos;
          me.curp = response.data.curp;
          me.docIdentificacion = response.data.docIdentificacion;
          (me.nacionalidad = response.data.nacionalidad),
            (me.tel = response.data.telefono1 + " " + response.data.telefono2);
          me.email = response.data.correo;
          me.genero = response.data.genero;
          me.verR = response.data.verR;
          me.verI = response.data.verI;
          me.sexo = response.data.sexo;
          me.fechaNacimiento = response.data.fechaNacimiento;
          me.medionotificacion = response.data.medionotificacion;
          me.ocupacion = response.data.ocupacion;
          me.nivelestudio = response.data.nivelEstudio;
          me.religion = response.data.religion;
          me.lengua = response.data.lengua;
          me.estadocivil = response.data.estadoCivil;
          me.tipodiscapacidad = response.data.tipoDiscapacidad;
          me.discapacidad = response.data.discapacidad;
          me.edad = response.data.edad;
          me.rangoedad = response.data.rangoEdad;
          me.razonsocial = response.data.razonSocial;
          me.rfc = response.data.rfc;
          me.docacredita = response.data.docPoderNotarial;
          console.log(response.data);
          me.$CAT
            .get("api/RAPs/ListarDP/" + me.personaId.value, configuracion)
            .then(function (response) {
              let vialidadEncontrada = me.vialidades.find(v => v.value == response.data.tipoVialidad);
              me.vialidadNombre = vialidadEncontrada ? vialidadEncontrada.text : "";

              me.direccionpersonal =
              me.vialidadNombre +
                " " +
                response.data.calle +
                " " +
                response.data.noint +
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
                " CP:" +
                response.data.cp;
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
                me.$notify(
                  "Error al intentar listar los registros!!!",
                  "error"
                );
              }
            });
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
    listarrepresentantes() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var aux = "";
      me.representantesf = "";
      me.$CAT
        .get(
          "api/Representante/idHechoyActivos/" +
            me.rHechoId +
            "/" +
            me.personaId.value,
          configuracion
        )
        .then(function (response) {
          me.representantes = response.data;
          if (me.representantes.length == 0)
            me.$notify(
              "La persona no cuenta con representantes activos",
              "error"
            );
          for (var i = 0; i < me.representantes.length; i++) {
            aux =
              me.CalcularRepresentante(me.representantes[i].tipo1) +
              me.CalcularRepresentante2(
                me.representantes[i].tipo1,
                me.representantes[i].tipo2
              );
            me.representantesf +=
              "_________________________________________\n" +
              me.representantes[i].nombres +
              " " +
              me.representantes[i].apellidoPa +
              " " +
              me.representantes[i].apellidoMa +
              "\n\n" +
              aux +
              "\n\n\n\n";
          }
          me.generarpdf();
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
    CalcularRepresentante(representante) {
      let me = this;
      if (representante > 0) {
        for (var i = 0; i < me.trepresentantes.length; i++) {
          if (representante == me.trepresentantes[i].value) {
            return me.trepresentantes[i].text;
          }
        }
      } else {
        return "";
      }
    },
    CalcularRepresentante2(representante, representante2) {
      let me = this;
      if (representante2 > 0) {
        for (var i = 0; i < me.trepresentantes.length; i++) {
          if (representante2 == me.trepresentantes[i].value) {
            if (representante < 0) return me.trepresentantes[i].text;
            else return " y " + me.trepresentantes[i].text;
          }
        }
      } else {
        return "";
      }
    },
    Listartrepresentantes() {
      let me = this;
      var trepresentantearray;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$conf
        .get("api/TRepresentantes/Listar", configuracion)
        .then(function (response) {
          trepresentantearray = response.data;
          trepresentantearray.map(function (x) {
            me.trepresentantes.push({ text: x.tipo, value: x.valor });
          });
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
    generarepresentates() {
      let me = this;
      var now = moment();
      me.generarQR(me.docEntrevista,me.nuc,me.u_nombre,now,me.idAmpliacion);

      this.$validator.validate().then((result) => {
        if (result) {
          this.listarrepresentantes();
        }
      });
    },
    generarpdf() {
      this.$validator.validate().then((result) => {
        console.log(this.personaId);
        if (result) {
          this.texto = "";
          this.texto2 = "";
          this.texto3 = "";
          this.tipo2 = "";
          this.fechas = this.fechae;
          this.horas = this.horae;
          this.personaf = this.personaId.text;
          this.inicialesf = this.personaId.value3;
          if (
            (this.personaId.value1 == "Victima directa" ||
              this.personaId.value1 == "Victima indirecta" ||
              this.personaId.value1 == "Anonimo") &&
            this.personaId.value2 >= 18 &&
            this.personaId.value4 != "INFANCIA (0 A 5 AÑOS)" &&
            this.personaId.value4 != "NIÑEZ (6 A 12 AÑOS)" &&
            this.personaId.value4 != "ADOLECENCIA (13 A 17 AÑOS)"
          ) {
            this.texto =
              "Lugar: " +
              this.u_municipio +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "Fecha: " +
              this.fechas +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "Hora: " +
              this.horas +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>";

            this.texto2 =
              "<p style=" +
              this.comilla +
              "text-align:center" +
              this.comilla +
              "><b>PROTESTA DE LEY</b></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>";

            this.texto2 +=
              "Esta representación social con fundamento en lo establecido por el artículo 49 del Código Nacional de Procedimientos Penales, protesta a " +
              this.personaId.text +
              " para conducirse con verdad y le advierte que podrá imponerse de tres meses a dos años de prisión a quien se conduzca con falsedad ante una autoridad en ejercicio de sus funciones, conforme a lo previsto por el artículo 313 del Código Penal del estado de Hidalgo, a lo anterior manifiesta: que si se conducirá con verdad." +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>";

            this.texto3 =
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "Esta representación social le da lectura y le explica los derechos que la Constitución Política de los Estados Unidos Mexicanos y el Código Nacional de Procedimientos Penales le concede al denunciante y/o víctima y le entrega la correspondiente acta de derechos." +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p style=" +
              this.comilla +
              "text-align:center" +
              this.comilla +
              ">FACULTAD DE ABSTENCIÓN</p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "De igual forma se le hace saber que conforme a lo establecido en el artículo 361 del Código Nacional de Procedimientos Penales, podrá <b>abstenerse de declarar,</b> declarar, si es tutor, curador, pupilo, cónyuge, concubina o concubinario, conviviente del imputado, o si ha vivido en forma permanente con él durante al menos dos años anteriores al hecho, de ser pariente por consanguinidad en la línea recta ascendente o descendente hasta el cuarto grado y en colateral por consanguinidad hasta el segundo grado inclusive, salvo que fuera denunciante. Pero si acepta rendir su testimonio NO podrán negarse a contestar las preguntas que esta autoridad le formule." +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "A continuación, el compareciente hace del conocimiento de esta Representación social los siguientes hechos:" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              this.hechos +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello.";
            this.tipo2 = 1;
            this.mostrarpdf_vistaprevia(this.u_nombre, this.u_puesto, this.u_agencia);
          } else if (
            this.personaId.value1 == "Imputado" &&
            this.personaId.value2 >= 18 &&
            this.personaId.value4 != "INFANCIA (0 A 5 AÑOS)" &&
            this.personaId.value4 != "NIÑEZ (6 A 12 AÑOS)" &&
            this.personaId.value4 != "ADOLECENCIA (13 A 17 AÑOS)"
          ) {
            this.tipo2 = 2;

            let me = this;
            let header = { Authorization: "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };
            var representante;
            me.$CAT
              .get(
                "api/Representante/RepresentanteslistarporPersonaParticular/" +
                  me.personaId.value,
                configuracion
              )
              .then(function (response) {
                //console.log(response);
                me.representantei = response.data.personaR;

                if (response.data == "")
                  me.$notify(
                    "La persona no cuenta con representante particular",
                    "error"
                  );

                this.texto =
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "En la ciudad de " +
                  this.u_distrito +
                  ", Hidalgo, siendo las " +
                  this.horas +
                  ", " +
                  this.fechas +
                  ", el Agente del Ministerio Público " +
                  this.u_nombre +
                  ", desahoga la declaración indagatoria" +
                  " a cargo de " +
                  this.personaId.text +
                  ", a quien previamente se le hizo saber los derechos que en su favor" +
                  "confiere la Constitución Política de los Estados Unidos Mexicanos y Código Nacional de" +
                  "procedimientos Penales y se le entregó la correspondiente acta de lectura de derechos. Una vez" +
                  "enterado de esos derechos, y del contenido de la carpeta de investigación se le da oportunidad de" +
                  "entrevistarse en privado con su abogado defensor " +
                  this.representantei +
                  ", hecho lo anterior por sus datos" +
                  "generales MANIFESTÓ:" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>";

                this.texto2 =
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "*En caso de nacionalidad extranjera, de pertenecer a un grupo étnico y/o que presente alguna discapacidad dar cumplimiento a lo establecido en las leyes de la materia." +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "En relación a los hechos la persona sujeta a investigación <b>MANIFESTÓ:</b>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  this.manifesto +
                  //", siendo todo lo que deseo manifestar. En uso de la voz el defensor"+this.representantei+", "+
                  this.hechos +
                  "previa lectura, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello.";

                this.mostrarpdf_vistaprevia(this.u_nombre, this.u_puesto, this.u_agencia);
              })
              .catch((err) => {
                this.texto =
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "En la ciudad de " +
                  this.u_distrito +
                  ", Hidalgo, siendo las " +
                  this.horas +
                  ", " +
                  this.fechas +
                  ", el Agente del Ministerio Público " +
                  this.u_nombre +
                  ", desahoga la declaración indagatoria" +
                  " a cargo de " +
                  this.personaId.text +
                  ", a quien previamente se le hizo saber los derechos que en su favor" +
                  "confiere la Constitución Política de los Estados Unidos Mexicanos y Código Nacional de" +
                  "procedimientos Penales y se le entregó la correspondiente acta de lectura de derechos. Una vez" +
                  "enterado de esos derechos, y del contenido de la carpeta de investigación se le da oportunidad de" +
                  "entrevistarse en privado con su abogado defensor " +
                  this.representantei +
                  ", hecho lo anterior por sus datos" +
                  "generales MANIFESTÓ:" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>";

                this.texto2 =
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "*En caso de nacionalidad extranjera, de pertenecer a un grupo étnico y/o que presente alguna discapacidad dar cumplimiento a lo establecido en las leyes de la materia." +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "En relación a los hechos la persona sujeta a investigación <b>MANIFESTÓ:</b>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  this.hechos +
                  //", siendo todo lo que deseo manifestar. En uso de la voz el defensor"+this.representantei+", "+
                  //this.hechos+
                  "previa lectura, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello.";

                this.mostrarpdf_vistaprevia(this.u_nombre, this.u_puesto, this.u_agencia);
              });
          } else if (
            (this.personaId.value1 == "Victima directa" ||
              this.personaId.value1 == "Victima indirecta" ||
              this.personaId.value1 == "Anonimo") &&
            (this.personaId.value2 < 18 ||
              this.personaId.value4 == "INFANCIA (0 A 5 AÑOS)" ||
              this.personaId.value4 == "NIÑEZ (6 A 12 AÑOS)" ||
              this.personaId.value4 == "ADOLECENCIA (13 A 17 AÑOS)")
          ) {
            this.tipo2 = 3;

            this.texto =
              "Lugar:" +
              this.u_municipio +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "Fecha:" +
              this.fechas +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "Hora:" +
              this.horas +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>";

            this.texto2 =
              "<p style=" +
              this.comilla +
              "text-align:center" +
              this.comilla +
              ">EXHORTA/INFORMA</p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "Esta representación social con fundamento en lo establecido por el artículo 49 del Código Nacional de Procedimientos Penales, exhorta/informa al menor de iniciales " +
              this.personaId.value3 +
              " para que se conduzca con verdad en lo que manifieste en su entrevista y se le explica que de conducirse con falsedad incurrirá en una conducta tipificada como delito en la ley penal y se hará acreedor a una medida de conformidad con las disposiciones aplicables, a lo anterior manifiesta: que si se conducirá con verdad." +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "A continuación, se recaban los datos generales del(la) menor, que de conformidad con el artículo 20 apartado C fracción V de la Constitución Política de los Estados Unidos Mexicanos y 109 fracción XXVI del Código Nacional de Procedimientos Penales quedan reservados." +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "Una vez que se le hicieron saber a " +
              this.personaId.value3 +
              " los derechos que le otorga la Constitución Política de los Estados Unidos Mexicanos, el Código Nacional de Procedimientos Penales, la Ley Nacional Del Sistema Integral De Justicia para Adolescentes y la Ley General de los Derechos de Niñas, Niños y Adolescentes se le entregó la correspondiente acta." +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p style=" +
              this.comilla +
              "text-align:center" +
              this.comilla +
              ">FACULTAD DE ABSTENCIÓN</p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "De igual forma se le hace saber que conforme a lo establecido en el artículo 361 del Código Nacional de Procedimientos Penales, podrá <b>abstenerse de declarar</b>, si es tutor, curador, pupilo, cónyuge, concubina o concubinario, conviviente del imputado, o si ha vivido en forma permanente con él durante al menos dos años anteriores al hecho, de ser pariente por consanguinidad en la línea recta ascendente o descendente hasta el cuarto grado y en colateral por consanguinidad hasta el segundo grado inclusive, salvo que fuera denunciante. Pero si acepta rendir su testimonio NO podrán negarse a contestar las preguntas que esta autoridad le formule." +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "En relación a lo hechos el(la) menor de identidad reservada de iniciales " +
              this.personaId.value3 +
              "<u>, MANIFESTÓ:</u>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              this.hechos +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello.";

            this.mostrarpdf_vistaprevia(this.u_nombre, this.u_puesto, this.u_agencia);
          } else if (
            this.personaId.value1 == "Imputado" &&
            (this.personaId.value2 < 18 ||
              this.personaId.value4 == "INFANCIA (0 A 5 AÑOS)" ||
              this.personaId.value4 == "NIÑEZ (6 A 12 AÑOS)" ||
              this.personaId.value4 == "ADOLECENCIA (13 A 17 AÑOS)")
          ) {
            this.tipo2 = 4;

            let me = this;
            let header = { Authorization: "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };
            var representante;
            me.$CAT
              .get(
                "api/Representante/Representanteprimero/" + me.personaId.value,
                configuracion
              )
              .then(function (response) {
                me.representantei = response.data.personaR;

                this.texto =
                  "" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "En la ciudad de " +
                  this.u_distrito +
                  ", Hidalgo, siendo las" +
                  this.horas +
                  ", " +
                  this.fechas +
                  ", el Agente del Ministerio Público " +
                  this.u_nombre +
                  ", desahoga la declaración del adolescente " +
                  this.personaId.text +
                  ", quien se encuentra acompañado " +
                  this.acnombre +
                  ", quien en este momento se identifican con " +
                  this.docidentificacion +
                  " con número de " +
                  this.noidentificacion +
                  " las que portan fotografía a color y coinciden con los rasgos fisionómicos, mismas que les son devueltas por serles de su utilidad dejando en su lugar copias simples, así mismo exhiben acta de nacimiento/" +
                  this.curpacompa +
                  " la cual se les devuelve por serles de utilidad dejando en su lugar copias simple para que se agregue a la presente carpeta; adolescente a quien previamente se le hizo saber los derechos que prevé en su favor el artículo 20 apartado B de la Constitución Política de los Estados Unidos Mexicanos; 35, 36, 37, 38, 39, 40, 41, 42, 43, 44 y 45 de la ley Nacional del Sistema Integral de Justicia Penal para adolescentes, así como 113 y 115 del Código Nacional de Procedimientos Penales y se le entregó la correspondiente acta de lectura de derechos. Manifestó quedar debidamente enterado. En este acto se permite que se entreviste en privado con su Defensor(a)." +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "A continuación, se recaban los datos generales del(la) adolescente, que de conformidad con el artículo 20 apartado B de la Constitución Política de los Estados Unidos Mexicanos; 35 y 36 de la ley Nacional del Sistema Integral de Justicia Penal para adolescentes quedan reservados." +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "En relación a los hechos la persona investigada MANIFESTÓ:" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  this.hechos +
                  //" siendo todo lo que deseo manifestar. En uso de la voz el defensor " + this.representantei +
                  ", previa lectura, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello.";

                this.mostrarpdf_vistaprevia(this.u_nombre, this.u_puesto, this.u_agencia);
              })
              .catch((err) => {
                this.texto =
                  "" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "En la ciudad de " +
                  this.u_distrito +
                  ", Hidalgo, siendo las" +
                  this.horas +
                  ", " +
                  this.fechas +
                  ", el Agente del Ministerio Público " +
                  this.u_nombre +
                  ", desahoga la declaración del adolescente " +
                  this.personaId.text +
                  ", quien se encuentra acompañado " +
                  this.acnombre +
                  ", quien en este momento se identifican con " +
                  this.docidentificacion +
                  " con número de " +
                  this.noidentificacion +
                  " las que portan fotografía a color y coinciden con los rasgos fisionómicos, mismas que les son devueltas por serles de su utilidad dejando en su lugar copias simples, así mismo exhiben acta de nacimiento/" +
                  this.curpacompa +
                  " la cual se les devuelve por serles de utilidad dejando en su lugar copias simple para que se agregue a la presente carpeta; adolescente a quien previamente se le hizo saber los derechos que prevé en su favor el artículo 20 apartado B de la Constitución Política de los Estados Unidos Mexicanos; 35, 36, 37, 38, 39, 40, 41, 42, 43, 44 y 45 de la ley Nacional del Sistema Integral de Justicia Penal para adolescentes, así como 113 y 115 del Código Nacional de Procedimientos Penales y se le entregó la correspondiente acta de lectura de derechos. Manifestó quedar debidamente enterado. En este acto se permite que se entreviste en privado con su Defensor(a)." +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "A continuación, se recaban los datos generales del(la) adolescente, que de conformidad con el artículo 20 apartado B de la Constitución Política de los Estados Unidos Mexicanos; 35 y 36 de la ley Nacional del Sistema Integral de Justicia Penal para adolescentes quedan reservados." +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  "En relación a los hechos la persona investigada MANIFESTÓ:" +
                  "<p class=" +
                  this.comilla +
                  "ql-align-justify" +
                  this.comilla +
                  "><br></p>" +
                  this.hechos +
                  //" siendo todo lo que deseo manifestar. En uso de la voz el defensor " + this.representantei +
                  ", previa lectura, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello.";

                this.mostrarpdf_vistaprevia(this.u_nombre, this.u_puesto, this.u_agencia);
              });
          } else if (
            this.personaId.value1 == "Testigo" &&
            this.personaId.value2 >= 18 &&
            this.personaId.value4 != "INFANCIA (0 A 5 AÑOS)" &&
            this.personaId.value4 != "NIÑEZ (6 A 12 AÑOS)" &&
            this.personaId.value4 != "ADOLECENCIA (13 A 17 AÑOS)"
          ) {
            this.texto =
              "Lugar:" +
              this.u_municipio +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "Fecha:" +
              this.fechas +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "Hora:" +
              this.horas +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>";

            this.texto2 =
              "<p style=" +
              this.comilla +
              "text-align:center" +
              this.comilla +
              "><b>PROTESTA DE LEY</b></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>";

            this.texto2 +=
              "Esta representación social con fundamento en lo establecido por el artículo 49 del Código Nacional de Procedimientos Penales, protesta a " +
              this.personaId.text +
              " para conducirse con verdad y le advierte que podrá imponerse de tres meses a dos años de prisión a quien se conduzca con falsedad ante una autoridad en ejercicio de sus funciones, conforme a lo previsto por el artículo 313 del Código Penal del estado de Hidalgo, a lo anterior manifiesta: que si se conducirá con verdad." +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "Acto seguido el testigo por sus datos generales manifestó" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>";

            this.texto3 =
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p style=" +
              this.comilla +
              "text-align:center" +
              this.comilla +
              ">FACULTAD DE ABSTENCIÓN</p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "De igual forma se le hace saber que conforme a lo establecido en el artículo 361 del Código Nacional de Procedimientos Penales, podrá abstenerse de declarar, si es tutor, curador, pupilo, cónyuge, concubina o concubinario, conviviente del imputado, o si ha vivido en forma permanente con él durante al menos dos años anteriores al hecho, de ser pariente por consanguinidad en la línea recta ascendente o descendente hasta el cuarto grado y en colateral por consanguinidad hasta el segundo grado inclusive, salvo que fuera denunciante. Pero si acepta rendir su testimonio NO podrán negarse a contestar las preguntas que esta autoridad le formule. Por lo que manifiesta:" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              this.manifesto +
              "Así mismo se le informa que en términos del artículo 360 del Código Nacional de Procedimientos Penales, no está obligado a declarar sobre hechos por los que se le pueda fincar responsabilidad penal." +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "A continuación, el testigo hace del conocimiento de esta Representación social los siguientes hechos:" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              this.hechos +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello.";

            this.tipo2 = 5;
            this.mostrarpdf_vistaprevia(this.u_nombre, this.u_puesto, this.u_agencia);
          } else if (
            this.personaId.value1 == "Testigo" &&
            (this.personaId.value2 < 18 ||
              this.personaId.value4 == "INFANCIA (0 A 5 AÑOS)" ||
              this.personaId.value4 == "NIÑEZ (6 A 12 AÑOS)" ||
              this.personaId.value4 == "ADOLECENCIA (13 A 17 AÑOS)")
          ) {
            let me = this;
            let header = { Authorization: "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };

            me.$CAT
              .get(
                "api/Representante/RepresentanteslistarporPersonaCoadyuvante/" +
                  me.personaId.value,
                configuracion
              )
              .then(function (response) {
                //console.log(response);
                me.representantei = response.data.personaR;

                me.texto =
                  "En la ciudad de " +
                  me.u_distrito +
                  ", Hidalgo, siendo las " +
                  me.horas +
                  ", " +
                  me.fechas +
                  ", Ministerio Público Titular de la Unidad de Investigación " +
                  me.u_nombre +
                  " adscrito a " +
                  me.u_agencia +
                  " del Distrito Judicial de " +
                  me.u_distrito +
                  " Hidalgo procede <b>A HACERLE SABER A LA (NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
                  me.personaId.value3 +
                  "</b> quien se encuentra asistido y acompañado por el <b>LICENCIADO " +
                  me.representantei +
                  "</b> en su calidad de Representante Coadyuvante y la <b>PSICÓLOGA " +
                  me.psimenor +
                  "</b> adscritos a la Procuraduría de Protección de Niñas, Niños, Adolescentes y la Familia del estado de Hidalgo, quien se identifica con credencial oficial de la cual deja copia simple previo cotejo con el original, que en términos del artículo 12 de la Convención Sobre los Derechos del Niño establece: Que los Estados partes garantizarán al niño que esté en condiciones de formarse un juicio propio EL DERECHO DE EXPRESAR SU OPINIÓN LIBRE EN LOS ASUNTOS QUE AFECTAN AL NIÑO, TENIÉNDOSE DEBIDAMENTE EN CUENTA LAS OPINIONES DEL NIÑO, EN FUNCIÓN DE LA EDAD Y MADUREZ DEL NIÑO “2. Con tal fin, se dará en particular al niño oportunidad de ser escuchado, en todo procedimiento judicial o administrativo que afecte al niño, ya sea directamente o por medio de un representante o de un órgano apropiado, en consecuencia con las normas de procedimiento de la ley nacional-" +
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "Así mismo en términos del artículo 49 del Código Nacional de Procedimientos Penales <b>SEGUIDAMENTE SE LE EXHORTA AL (NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
                  me.personaId.value3 +
                  ", PARA QUE SE CONDUZCA CON VERDAD EN SUS MANIFESTACIONES ANTE ESTA AUTORIDAD,</b> se le informa en un lenguaje apropiado para su edad, sobre la importancia que es que se conduzca con la verdad de todo lo que vaya a manifestar, menor declarante a quien esta Representación Social le expone el motivo de su comparecencia, transmitiéndole mensajes que reconocen su valor, credibilidad, explicándole que la única expectativa que se espera es que exprese de manera libre lo que sabe, quiere y ha vivido, es decir que no hay respuestas correctas e incorrectas, anticipándole posibles temores comunes y disipándole cualquier temor a ser castigada por el hecho de expresarse libremente, se le pregunta a la menor si sabe el motivo por el cual se encuentra aquí, manifestando: que si, por lo que una vez hecho lo anterior manifiesta; QUE SI VOY A DECIR LA VERDAD. Así mismo se hace constar la presencia de su padre el <b>" +
                  me.acnombre +
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "FACULTAD DE ABSTENCIÓN: </b> Así también se le hace de su conocimiento a la " +
                  me.personaId.value3 +
                  "</b> el derecho que tiene de abstenerse de declarar, explicándole en un lenguaje apropiado para su edad, que en caso de que tuviese alguna relación con la o las personas investigadas no está obligada a rendir su entrevista, manifestando que: ";

                me.texto2 =
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  me.fechaS;
                "a) Si tiene relación con la personas o personas investigadas por ser su familiar, y que por ello no desea declarar. (en caso de ser esta la respuesta con esto concluye la entrevista)" +
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "b) Si tiene relación con la personas o personas investigadas por ser su familiar, pero que si desea declarar. (en caso de ser esta la respuesta se continúa con la entrevista)" +
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "c) No tiene relación alguna con la personas o personas investigadas. (en caso de ser esta la respuesta se continúa con la entrevista)";

                me.texto3 =
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "<b>SEGUIDAMENTE EL (NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
                  me.personaId.value3 +
                  ", REFIERE: </b>" +
                  me.hechos +
                  ", siendo todo lo que manifiesta; por lo que una vez que se ha dado por concluida la presente diligencia y previa lectura firman al margen los que en ella intervinieron y pudieron hacerlo y estampando sus huellas pulgares la <b>(NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
                  me.personaId.value3 +
                  ".</b>";

                me.tipo2 = 6;
                me.mostrarpdf_vistaprevia(me.u_nombre, me.u_puesto, me.u_agencia);
              });
          } else if (
            this.personaId.value1 == "Denunciante" &&
            this.personaId.value2 >= 18 &&
            this.personaId.value4 != "INFANCIA (0 A 5 AÑOS)" &&
            this.personaId.value4 != "NIÑEZ (6 A 12 AÑOS)" &&
            this.personaId.value4 != "ADOLECENCIA (13 A 17 AÑOS)"
          ) {
            this.texto =
              "Lugar: " +
              this.u_municipio +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "Fecha: " +
              this.fechas +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "Hora: " +
              this.horas +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>";

            this.texto2 =
              "<p style=" +
              this.comilla +
              "text-align:center" +
              this.comilla +
              "><b>PROTESTA DE LEY</b></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>";

            this.texto2 +=
              "Esta representación social con fundamento en lo establecido por el artículo 49 del Código Nacional de Procedimientos Penales, protesta a " +
              this.personaId.text +
              " para conducirse con verdad y le advierte que podrá imponerse de tres meses a dos años de prisión a quien se conduzca con falsedad ante una autoridad en ejercicio de sus funciones, conforme a lo previsto por el artículo 313 del Código Penal del estado de Hidalgo, a lo anterior manifiesta: que si se conducirá con verdad." +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "Acto seguido el testigo por sus datos generales manifestó" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>";

            this.texto3 =
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p style=" +
              this.comilla +
              "text-align:center" +
              this.comilla +
              ">FACULTAD DE ABSTENCIÓN</p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "De igual forma se le hace saber que conforme a lo establecido en el artículo 361 del Código Nacional de Procedimientos Penales, podrá abstenerse de declarar, si es tutor, curador, pupilo, cónyuge, concubina o concubinario, conviviente del imputado, o si ha vivido en forma permanente con él durante al menos dos años anteriores al hecho, de ser pariente por consanguinidad en la línea recta ascendente o descendente hasta el cuarto grado y en colateral por consanguinidad hasta el segundo grado inclusive, salvo que fuera denunciante. Pero si acepta rendir su testimonio NO podrán negarse a contestar las preguntas que esta autoridad le formule. Por lo que manifiesta:" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              this.manifesto +
              "Así mismo se le informa que en términos del artículo 360 del Código Nacional de Procedimientos Penales, no está obligado a declarar sobre hechos por los que se le pueda fincar responsabilidad penal." +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "A continuación, el testigo hace del conocimiento de esta Representación social los siguientes hechos:" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              this.hechos +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>" +
              "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello.";

            this.tipo2 = 7;
            this.mostrarpdf_vistaprevia(this.u_nombre, this.u_puesto, this.u_agencia);
          } else if (
            this.personaId.value1 == "Denunciante" &&
            (this.personaId.value2 < 18 ||
              this.personaId.value4 == "INFANCIA (0 A 5 AÑOS)" ||
              this.personaId.value4 == "NIÑEZ (6 A 12 AÑOS)" ||
              this.personaId.value4 == "ADOLECENCIA (13 A 17 AÑOS)")
          ) {
            let me = this;
            let header = { Authorization: "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };

            me.$CAT
              .get(
                "api/Representante/RepresentanteslistarporPersonaCoadyuvante/" +
                  me.personaId.value,
                configuracion
              )
              .then(function (response) {
                //console.log(response);
                me.representantei = response.data.personaR;

                me.texto =
                  "En la ciudad de " +
                  me.u_distrito +
                  ", Hidalgo, siendo las " +
                  me.horas +
                  ", " +
                  me.fechas +
                  ", Ministerio Público Titular de la Unidad de Investigación " +
                  me.u_nombre +
                  " adscrito a " +
                  me.u_agencia +
                  " del Distrito Judicial de " +
                  me.u_distrito +
                  " Hidalgo procede <b>A HACERLE SABER A LA (NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
                  me.personaId.value3 +
                  "</b> quien se encuentra asistido y acompañado por el <b>LICENCIADO " +
                  me.representantei +
                  "</b> en su calidad de Representante Coadyuvante y la <b>PSICÓLOGA " +
                  me.psimenor +
                  "</b> adscritos a la Procuraduría de Protección de Niñas, Niños, Adolescentes y la Familia del estado de Hidalgo, quien se identifica con credencial oficial de la cual deja copia simple previo cotejo con el original, que en términos del artículo 12 de la Convención Sobre los Derechos del Niño establece: Que los Estados partes garantizarán al niño que esté en condiciones de formarse un juicio propio EL DERECHO DE EXPRESAR SU OPINIÓN LIBRE EN LOS ASUNTOS QUE AFECTAN AL NIÑO, TENIÉNDOSE DEBIDAMENTE EN CUENTA LAS OPINIONES DEL NIÑO, EN FUNCIÓN DE LA EDAD Y MADUREZ DEL NIÑO “2. Con tal fin, se dará en particular al niño oportunidad de ser escuchado, en todo procedimiento judicial o administrativo que afecte al niño, ya sea directamente o por medio de un representante o de un órgano apropiado, en consecuencia con las normas de procedimiento de la ley nacional-" +
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "Así mismo en términos del artículo 49 del Código Nacional de Procedimientos Penales <b>SEGUIDAMENTE SE LE EXHORTA AL (NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
                  me.personaId.value3 +
                  ", PARA QUE SE CONDUZCA CON VERDAD EN SUS MANIFESTACIONES ANTE ESTA AUTORIDAD,</b> se le informa en un lenguaje apropiado para su edad, sobre la importancia que es que se conduzca con la verdad de todo lo que vaya a manifestar, menor declarante a quien esta Representación Social le expone el motivo de su comparecencia, transmitiéndole mensajes que reconocen su valor, credibilidad, explicándole que la única expectativa que se espera es que exprese de manera libre lo que sabe, quiere y ha vivido, es decir que no hay respuestas correctas e incorrectas, anticipándole posibles temores comunes y disipándole cualquier temor a ser castigada por el hecho de expresarse libremente, se le pregunta a la menor si sabe el motivo por el cual se encuentra aquí, manifestando: que si, por lo que una vez hecho lo anterior manifiesta; QUE SI VOY A DECIR LA VERDAD. Así mismo se hace constar la presencia de su padre el <b>" +
                  me.acnombre +
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "FACULTAD DE ABSTENCIÓN: </b> Así también se le hace de su conocimiento a la " +
                  me.personaId.value3 +
                  "</b> el derecho que tiene de abstenerse de declarar, explicándole en un lenguaje apropiado para su edad, que en caso de que tuviese alguna relación con la o las personas investigadas no está obligada a rendir su entrevista, manifestando que: ";

                me.texto2 =
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "a) Si tiene relación con la personas o personas investigadas por ser su familiar, y que por ello no desea declarar. (en caso de ser esta la respuesta con esto concluye la entrevista)" +
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "b) Si tiene relación con la personas o personas investigadas por ser su familiar, pero que si desea declarar. (en caso de ser esta la respuesta se continúa con la entrevista)" +
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "c) No tiene relación alguna con la personas o personas investigadas. (en caso de ser esta la respuesta se continúa con la entrevista)";

                me.texto3 =
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "<p class=" +
                  me.comilla +
                  "ql-align-justify" +
                  me.comilla +
                  "><br></p>" +
                  "<b>SEGUIDAMENTE EL (NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
                  me.personaId.value3 +
                  ", REFIERE: </b>" +
                  me.hechos +
                  ", siendo todo lo que manifiesta; por lo que una vez que se ha dado por concluida la presente diligencia y previa lectura firman al margen los que en ella intervinieron y pudieron hacerlo y estampando sus huellas pulgares la <b>(NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
                  me.personaId.value3 +
                  ".</b>";

                me.tipo2 = 8;
                me.mostrarpdf_vistaprevia(me.u_nombre, me.u_puesto, me.u_agencia);
              });
          }
        }
      });
    },
    imprimirdoc(item) {
      let me = this;
      if (item.tipo == 1) {
        this.texto =
          "Lugar:" +
          item.uSubproc +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Fecha:" +
          item.fechaS +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Hora:" +
          item.horaS +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>";

        this.texto2 =
          "<p style=" +
          this.comilla +
          "text-align:center" +
          this.comilla +
          "><b>PROTESTA DE LEY</b></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>";

        this.texto2 +=
          "Esta representación social con fundamento en lo establecido por el artículo 49 del Código Nacional de Procedimientos Penales, protesta a " +
          item.nombrePersona +
          " para conducirse con verdad y le advierte que podrá imponerse de tres meses a dos años de prisión a quien se conduzca con falsedad ante una autoridad en ejercicio de sus funciones, conforme a lo previsto por el artículo 313 del Código Penal del estado de Hidalgo, a lo anterior manifiesta: que si se conducirá con verdad." +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>";

        this.texto3 =
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Esta representación social le da lectura y le explica los derechos que la Constitución Política de los Estados Unidos Mexicanos y el Código Nacional de Procedimientos Penales le concede al denunciante y/o víctima y le entrega la correspondiente acta de derechos." +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p style=" +
          this.comilla +
          "text-align:center" +
          this.comilla +
          ">FACULTAD DE ABSTENCIÓN</p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "De igual forma se le hace saber que conforme a lo establecido en el artículo 361 del Código Nacional de Procedimientos Penales, podrá <b>abstenerse de declarar,</b> declarar, si es tutor, curador, pupilo, cónyuge, concubina o concubinario, conviviente del imputado, o si ha vivido en forma permanente con él durante al menos dos años anteriores al hecho, de ser pariente por consanguinidad en la línea recta ascendente o descendente hasta el cuarto grado y en colateral por consanguinidad hasta el segundo grado inclusive, salvo que fuera denunciante. Pero si acepta rendir su testimonio NO podrán negarse a contestar las preguntas que esta autoridad le formule." +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "A continuación, el compareciente hace del conocimiento de esta Representación social los siguientes hechos:" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          item.hechos +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello.";
        this.tipo2 = 1;
      }
      else if (item.tipo == 2) {
        this.tipo2 = 2;

        this.texto =
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "En la ciudad de " +
          this.u_distrito +
          ", Hidalgo, siendo las " +
          item.horaS +
          ", " +
          item.fechaS +
          ", el Agente del Ministerio Público " +
          item.usuario +
          ", desahoga la declaración indagatoria" +
          " a cargo de " +
          item.nombrePersona +
          ", a quien previamente se le hizo saber los derechos que en su favor" +
          "confiere la Constitución Política de los Estados Unidos Mexicanos y Código Nacional de" +
          "procedimientos Penales y se le entregó la correspondiente acta de lectura de derechos. Una vez" +
          "enterado de esos derechos, y del contenido de la carpeta de investigación se le da oportunidad de" +
          "entrevistarse en privado con su abogado defensor " +
          item.representante +
          ", hecho lo anterior por sus datos" +
          "generales MANIFESTÓ:" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>";

        this.texto2 =
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "*En caso de nacionalidad extranjera, de pertenecer a un grupo étnico y/o que presente alguna discapacidad dar cumplimiento a lo establecido en las leyes de la materia." +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "En relación a los hechos la persona sujeta a investigación <b>MANIFESTÓ:</b>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          // item.manifestacion+
          //", siendo todo lo que deseo manifestar. En uso de la voz el defensor"+item.representante+", "+
          item.hechos +
          "previa lectura, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello.";
      }
      else if (item.tipo == 3) {
        this.tipo2 = 3;

        this.texto =
          "Lugar: " +
          item.uSubproc +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Fecha: " +
          item.fechaS +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Hora: " +
          item.horaS +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>";

        this.texto2 =
          "<p style=" +
          this.comilla +
          "text-align:center" +
          this.comilla +
          ">EXHORTA/INFORMA</p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Esta representación social con fundamento en lo establecido por el artículo 49 del Código Nacional de Procedimientos Penales, exhorta/informa al menor de iniciales " +
          item.iniciales +
          " para que se conduzca con verdad en lo que manifieste en su entrevista y se le explica que de conducirse con falsedad incurrirá en una conducta tipificada como delito en la ley penal y se hará acreedor a una medida de conformidad con las disposiciones aplicables, a lo anterior manifiesta: que si se conducirá con verdad." +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "A continuación, se recaban los datos generales del(la) menor, que de conformidad con el artículo 20 apartado C fracción V de la Constitución Política de los Estados Unidos Mexicanos y 109 fracción XXVI del Código Nacional de Procedimientos Penales quedan reservados." +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Una vez que se le hicieron saber a " +
          item.iniciales +
          " los derechos que le otorga la Constitución Política de los Estados Unidos Mexicanos, el Código Nacional de Procedimientos Penales, la Ley Nacional Del Sistema Integral De Justicia para Adolescentes y la Ley General de los Derechos de Niñas, Niños y Adolescentes se le entregó la correspondiente acta." +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p style=" +
          this.comilla +
          "text-align:center" +
          this.comilla +
          ">FACULTAD DE ABSTENCIÓN</p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "De igual forma se le hace saber que conforme a lo establecido en el artículo 361 del Código Nacional de Procedimientos Penales, podrá <b>abstenerse de declarar</b>, si es tutor, curador, pupilo, cónyuge, concubina o concubinario, conviviente del imputado, o si ha vivido en forma permanente con él durante al menos dos años anteriores al hecho, de ser pariente por consanguinidad en la línea recta ascendente o descendente hasta el cuarto grado y en colateral por consanguinidad hasta el segundo grado inclusive, salvo que fuera denunciante. Pero si acepta rendir su testimonio NO podrán negarse a contestar las preguntas que esta autoridad le formule." +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "En relación a lo hechos el(la) menor de identidad reservada de iniciales " +
          item.iniciales +
          "<u>, MANIFESTÓ:</u>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          item.hechos +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello.";
      }
      else if (item.tipo == 4) {
        this.tipo2 = 4;

        this.texto =
          "" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "En la ciudad de " +
          item.uDistrito +
          ", Hidalgo, siendo las " +
          item.horaS +
          ", " +
          item.fechaS +
          ", el Agente del Ministerio Público " +
          item.usuario +
          ", desahoga la declaración del adolescente " +
          item.nombrePersona +
          ", quien se encuentra acompañado " +
          item.acompañantev +
          ", quien en este momento se identifican con " +
          item.tidentificacion +
          " con número de " +
          item.noIdentificacion +
          " las que portan fotografía a color y coinciden con los rasgos fisionómicos, mismas que les son devueltas por serles de su utilidad dejando en su lugar copias simples, así mismo exhiben acta de nacimiento/" +
          item.curpa +
          " la cual se les devuelve por serles de utilidad dejando en su lugar copias simple para que se agregue a la presente carpeta; adolescente a quien previamente se le hizo saber los derechos que prevé en su favor el artículo 20 apartado B de la Constitución Política de los Estados Unidos Mexicanos; 35, 36, 37, 38, 39, 40, 41, 42, 43, 44 y 45 de la ley Nacional del Sistema Integral de Justicia Penal para adolescentes, así como 113 y 115 del Código Nacional de Procedimientos Penales y se le entregó la correspondiente acta de lectura de derechos. Manifestó quedar debidamente enterado. En este acto se permite que se entreviste en privado con su Defensor(a)." +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "A continuación, se recaban los datos generales del(la) adolescente, que de conformidad con el artículo 20 apartado B de la Constitución Política de los Estados Unidos Mexicanos; 35 y 36 de la ley Nacional del Sistema Integral de Justicia Penal para adolescentes quedan reservados." +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "En relación a los hechos la persona investigada MANIFESTÓ:" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          this.hechos +
          //" siendo todo lo que deseo manifestar. En uso de la voz el defensor " + item.representante +
          ", previa lectura, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello.";
      }
      else if (item.tipo == 5) {
        this.texto =
          "Lugar:" +
          item.uSubproc +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Fecha:" +
          item.fechaS +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Hora:" +
          item.horaS +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>";

        this.texto2 =
          "<p style=" +
          this.comilla +
          "text-align:center" +
          this.comilla +
          "><b>PROTESTA DE LEY</b></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>";

        this.texto2 +=
          "Esta representación social con fundamento en lo establecido por el artículo 49 del Código Nacional de Procedimientos Penales, protesta a " +
          item.nombrePersona +
          " para conducirse con verdad y le advierte que podrá imponerse de tres meses a dos años de prisión a quien se conduzca con falsedad ante una autoridad en ejercicio de sus funciones, conforme a lo previsto por el artículo 313 del Código Penal del estado de Hidalgo, a lo anterior manifiesta: que si se conducirá con verdad." +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Acto seguido el testigo por sus datos generales manifestó" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>";

        this.texto3 =
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p style=" +
          this.comilla +
          "text-align:center" +
          this.comilla +
          ">FACULTAD DE ABSTENCIÓN</p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "De igual forma se le hace saber que conforme a lo establecido en el artículo 361 del Código Nacional de Procedimientos Penales, podrá abstenerse de declarar, si es tutor, curador, pupilo, cónyuge, concubina o concubinario, conviviente del imputado, o si ha vivido en forma permanente con él durante al menos dos años anteriores al hecho, de ser pariente por consanguinidad en la línea recta ascendente o descendente hasta el cuarto grado y en colateral por consanguinidad hasta el segundo grado inclusive, salvo que fuera denunciante. Pero si acepta rendir su testimonio NO podrán negarse a contestar las preguntas que esta autoridad le formule. Por lo que manifiesta:" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          item.manifestacion +
          "Así mismo se le informa que en términos del artículo 360 del Código Nacional de Procedimientos Penales, no está obligado a declarar sobre hechos por los que se le pueda fincar responsabilidad penal." +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "A continuación, el testigo hace del conocimiento de esta Representación social los siguientes hechos:" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          item.hechos +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello.";

        this.tipo2 = 5;
      }
      else if (item.tipo == 6) {
        me.texto =
          "En la ciudad de " +
          item.uDistrito +
          ", Hidalgo, siendo las " +
          item.horaS +
          ", " +
          item.fechaS +
          ", Ministerio Público Titular de la Unidad de Investigación " +
          item.usuario +
          " adscrito a " +
          item.uAgencia +
          " del Distrito Judicial de " +
          item.uDistrito +
          " Hidalgo procede <b>A HACERLE SABER A LA (NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
          item.iniciales +
          "</b> quien se encuentra asistido y acompañado por el <b>LICENCIADO " +
          item.representante +
          "</b> en su calidad de Representante Coadyuvante y la <b>PSICÓLOGA " +
          item.vNombre +
          "</b> adscritos a la Procuraduría de Protección de Niñas, Niños, Adolescentes y la Familia del estado de Hidalgo, quien se identifica con credencial oficial de la cual deja copia simple previo cotejo con el original, que en términos del artículo 12 de la Convención Sobre los Derechos del Niño establece: Que los Estados partes garantizarán al niño que esté en condiciones de formarse un juicio propio EL DERECHO DE EXPRESAR SU OPINIÓN LIBRE EN LOS ASUNTOS QUE AFECTAN AL NIÑO, TENIÉNDOSE DEBIDAMENTE EN CUENTA LAS OPINIONES DEL NIÑO, EN FUNCIÓN DE LA EDAD Y MADUREZ DEL NIÑO “2. Con tal fin, se dará en particular al niño oportunidad de ser escuchado, en todo procedimiento judicial o administrativo que afecte al niño, ya sea directamente o por medio de un representante o de un órgano apropiado, en consecuencia con las normas de procedimiento de la ley nacional-" +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "Así mismo en términos del artículo 49 del Código Nacional de Procedimientos Penales <b>SEGUIDAMENTE SE LE EXHORTA AL (NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
          item.iniciales +
          ", PARA QUE SE CONDUZCA CON VERDAD EN SUS MANIFESTACIONES ANTE ESTA AUTORIDAD</b>, se le informa en un lenguaje apropiado para su edad, sobre la importancia que es que se conduzca con la verdad de todo lo que vaya a manifestar, menor declarante a quien esta Representación Social le expone el motivo de su comparecencia, transmitiéndole mensajes que reconocen su valor, credibilidad, explicándole que la única expectativa que se espera es que exprese de manera libre lo que sabe, quiere y ha vivido, es decir que no hay respuestas correctas e incorrectas, anticipándole posibles temores comunes y disipándole cualquier temor a ser castigada por el hecho de expresarse libremente, se le pregunta a la menor si sabe el motivo por el cual se encuentra aquí, manifestando: que si, por lo que una vez hecho lo anterior manifiesta; QUE SI VOY A DECIR LA VERDAD. Así mismo se hace constar la presencia de su padre el <b>" +
          item.acompañantev +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "FACULTAD DE ABSTENCIÓN: </b> Así también se le hace de su conocimiento a la " +
          item.iniciales +
          "</b> el derecho que tiene de abstenerse de declarar, explicándole en un lenguaje apropiado para su edad, que en caso de que tuviese alguna relación con la o las personas investigadas no está obligada a rendir su entrevista, manifestando que: ";

        me.texto2 =
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "a) Si tiene relación con la personas o personas investigadas por ser su familiar, y que por ello no desea declarar. (en caso de ser esta la respuesta con esto concluye la entrevista)" +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "b) Si tiene relación con la personas o personas investigadas por ser su familiar, pero que si desea declarar. (en caso de ser esta la respuesta se continúa con la entrevista)" +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "c) No tiene relación alguna con la personas o personas investigadas. (en caso de ser esta la respuesta se continúa con la entrevista)";

        me.texto3 =
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "<b>SEGUIDAMENTE EL (NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
          item.iniciales +
          ", REFIERE: </b>" +
          item.manifestacion +
          ", siendo todo lo que manifiesta; por lo que una vez que se ha dado por concluida la presente diligencia y previa lectura firman al margen los que en ella intervinieron y pudieron hacerlo y estampando sus huellas pulgares la <b>(NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
          item.iniciales +
          ".</b>";

        this.tipo2 = 6;
      }
      else if (item.tipo == 7) {
        this.texto =
          "Lugar:" +
          item.uSubproc +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Fecha:" +
          item.fechaS +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Hora:" +
          item.horaS +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>";

        this.texto2 =
          "<p style=" +
          this.comilla +
          "text-align:center" +
          this.comilla +
          "><b>PROTESTA DE LEY</b></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>";

        this.texto2 +=
          "Esta representación social con fundamento en lo establecido por el artículo 49 del Código Nacional de Procedimientos Penales, protesta a " +
          item.nombrePersona +
          " para conducirse con verdad y le advierte que podrá imponerse de tres meses a dos años de prisión a quien se conduzca con falsedad ante una autoridad en ejercicio de sus funciones, conforme a lo previsto por el artículo 313 del Código Penal del estado de Hidalgo, a lo anterior manifiesta: que si se conducirá con verdad." +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Acto seguido el testigo por sus datos generales manifestó" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>";

        this.texto3 =
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p style=" +
          this.comilla +
          "text-align:center" +
          this.comilla +
          ">FACULTAD DE ABSTENCIÓN</p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "De igual forma se le hace saber que conforme a lo establecido en el artículo 361 del Código Nacional de Procedimientos Penales, podrá abstenerse de declarar, si es tutor, curador, pupilo, cónyuge, concubina o concubinario, conviviente del imputado, o si ha vivido en forma permanente con él durante al menos dos años anteriores al hecho, de ser pariente por consanguinidad en la línea recta ascendente o descendente hasta el cuarto grado y en colateral por consanguinidad hasta el segundo grado inclusive, salvo que fuera denunciante. Pero si acepta rendir su testimonio NO podrán negarse a contestar las preguntas que esta autoridad le formule. Por lo que manifiesta:" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          item.manifestacion +
          "Así mismo se le informa que en términos del artículo 360 del Código Nacional de Procedimientos Penales, no está obligado a declarar sobre hechos por los que se le pueda fincar responsabilidad penal." +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "A continuación, el testigo hace del conocimiento de esta Representación social los siguientes hechos:" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          item.hechos +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello.";

        this.tipo2 = 7;
      }
      else if (item.tipo == 8) {
        me.texto =
          "En la ciudad de " +
          item.uDistrito +
          ", Hidalgo, siendo las " +
          item.horaS +
          ", " +
          item.fechaS +
          ", Ministerio Público Titular de la Unidad de Investigación " +
          item.usuario +
          " adscrito a " +
          item.uAgencia +
          " del Distrito Judicial de " +
          item.uDistrito +
          " Hidalgo procede <b>A HACERLE SABER A LA (NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
          item.iniciales +
          "</b> quien se encuentra asistido y acompañado por el <b>LICENCIADO " +
          item.representante +
          "</b> en su calidad de Representante Coadyuvante y la <b>PSICÓLOGA " +
          item.vNombre +
          "</b> adscritos a la Procuraduría de Protección de Niñas, Niños, Adolescentes y la Familia del estado de Hidalgo, quien se identifica con credencial oficial de la cual deja copia simple previo cotejo con el original, que en términos del artículo 12 de la Convención Sobre los Derechos del Niño establece: Que los Estados partes garantizarán al niño que esté en condiciones de formarse un juicio propio EL DERECHO DE EXPRESAR SU OPINIÓN LIBRE EN LOS ASUNTOS QUE AFECTAN AL NIÑO, TENIÉNDOSE DEBIDAMENTE EN CUENTA LAS OPINIONES DEL NIÑO, EN FUNCIÓN DE LA EDAD Y MADUREZ DEL NIÑO “2. Con tal fin, se dará en particular al niño oportunidad de ser escuchado, en todo procedimiento judicial o administrativo que afecte al niño, ya sea directamente o por medio de un representante o de un órgano apropiado, en consecuencia con las normas de procedimiento de la ley nacional-" +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "Así mismo en términos del artículo 49 del Código Nacional de Procedimientos Penales <b>SEGUIDAMENTE SE LE EXHORTA AL (NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
          item.iniciales +
          ", PARA QUE SE CONDUZCA CON VERDAD EN SUS MANIFESTACIONES ANTE ESTA AUTORIDAD</b>, se le informa en un lenguaje apropiado para su edad, sobre la importancia que es que se conduzca con la verdad de todo lo que vaya a manifestar, menor declarante a quien esta Representación Social le expone el motivo de su comparecencia, transmitiéndole mensajes que reconocen su valor, credibilidad, explicándole que la única expectativa que se espera es que exprese de manera libre lo que sabe, quiere y ha vivido, es decir que no hay respuestas correctas e incorrectas, anticipándole posibles temores comunes y disipándole cualquier temor a ser castigada por el hecho de expresarse libremente, se le pregunta a la menor si sabe el motivo por el cual se encuentra aquí, manifestando: que si, por lo que una vez hecho lo anterior manifiesta; QUE SI VOY A DECIR LA VERDAD. Así mismo se hace constar la presencia de su padre el <b>" +
          item.acompañantev +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "FACULTAD DE ABSTENCIÓN: </b> Así también se le hace de su conocimiento a la " +
          item.iniciales +
          "</b> el derecho que tiene de abstenerse de declarar, explicándole en un lenguaje apropiado para su edad, que en caso de que tuviese alguna relación con la o las personas investigadas no está obligada a rendir su entrevista, manifestando que: ";

        me.texto2 =
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "a) Si tiene relación con la personas o personas investigadas por ser su familiar, y que por ello no desea declarar. (en caso de ser esta la respuesta con esto concluye la entrevista)" +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "b) Si tiene relación con la personas o personas investigadas por ser su familiar, pero que si desea declarar. (en caso de ser esta la respuesta se continúa con la entrevista)" +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "c) No tiene relación alguna con la personas o personas investigadas. (en caso de ser esta la respuesta se continúa con la entrevista)";

        me.texto3 =
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "<b>SEGUIDAMENTE EL (NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
          item.iniciales +
          ", REFIERE: </b>" +
          item.manifestacion +
          ", siendo todo lo que manifiesta; por lo que una vez que se ha dado por concluida la presente diligencia y previa lectura firman al margen los que en ella intervinieron y pudieron hacerlo y estampando sus huellas pulgares la <b>(NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
          item.iniciales +
          ".</b>";

        this.tipo2 = 8;
      }

      this.representantesf = item.tRepresentantes;
      this.personaf = item.nombrePersona;
      this.inicialesf = item.iniciales;

      this.acvictima = item.parentezcoV;
      this.acnombre = item.acompañantev;
      this.psimenor = item.vNombre;
      this.puestopsi = item.vPuesto;

      this.numerooficio = item.numerooficio;
      this.clasificacionPersona = item.clasificacionP;
      this.nombre = item.nombrePersona;
      this.alias = item.alias;
      this.tipopersona = item.tipoP;
      this.datosProtegidos = item.datosProtegidos;
      this.curp = item.curp;
      this.docIdentificacion = item.docIdentificacion;
      this.nacionalidad = item.nacionalidad;
      this.tel = item.tel;
      this.email = item.email;
      this.genero = item.genero;
      this.sexo = item.sexo;
      this.fechaNacimiento = item.fechaNacimiento;
      this.medionotificacion = item.medionotificacion;
      this.ocupacion = item.ocupacion;
      this.nivelestudio = item.nivelestudio;
      this.religion = item.religion;
      this.lengua = item.lengua;
      this.estadocivil = item.estadocivil;
      this.tipodiscapacidad = item.tipodiscapacidad;
      this.direccionpersonal = item.direccionP;
      this.edad = item.edad;
      this.razonsocial = item.razonSocial;
      this.rfc = item.rfc;
      this.representantei = item.representante;
      this.docacredita = item.docPoderNotarial;
      //Se coloca en false para indicar que no es una vita previa y muestre en QR asi como lo genera
      me.vistaPreviaTF = false;
      me.generarQR(me.docEntrevista,me.nuc,item.usuario,item.fechasys,item.idAmpliacion);

      this.modaldocumento = false;

      setTimeout(() => 
      {
        this.mostrarpdf(item.usuario, item.uPuesto, item.uAgencia);
        
      }, 1000);
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
    generarhora() {
      var hora;
      hora = moment().format("h:mm a");
      return hora;
    },
    agregar() {
      this.limpiar();
      this.modalAdd = true;
    },

    close() {
      this.dialog = false;
      this.limpiar();
    },

    limpiar() {
      this.numerooficio = "";
      this.texto = "";
      this.texto2 = "";
      this.texto3 = "";
      this.personaId = "";
      this.tipo = "";
      this.manifesto = "";
      this.hechos = "";
      this.noidentificacion = "";
      this.acnombre = "";
      this.acvictima = "";
      this.docidentificacion = "";
      this.curpacompa = "";
      this.psimenor = "";
      this.puestopsi = "";
      this.horae = "";
      this.fechae = "";
      this.fechaentrevista = "";
      this.texto =  'Vista Previa';
      this.qrCode =  null;
      this.vistaPreviaTF =  true;
      this.vialidadNombre = "";
    },
    listarIdentificacion() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var docIdentificaionArray = [];
      this.$conf
        .get("api/DocIdentificacions/Listar", configuracion)
        .then(function (response) {
          //console.log(response.data);
          docIdentificaionArray = response.data;
          docIdentificaionArray.map(function (x) {
            me.docsidentificaciones.push({ text: x.nombre, value: x.nombre });
          });
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
    listar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/AmpDecs/Listar/" + me.rHechoId, configuracion)
        .then(function (response) {
          // console.log(response);
          me.oficios = response.data;
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
    guardar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      var descripcionRegTabI =
        "Registro de " + me.tipo + " de  " + me.personaId.text;

      me.$confirm(
        "Esperando confirmación",
        "Estas seguro de  que deseas guardar información ",
        function () {
          me.$CAT
            .get("api/AmpDecs/PrimeraEntrevista/" + me.rHechoId, configuracion)
            .then(function (response) {
              me.$CAT
                .post(
                  "api/AmpDecs/Crear",
                  {
                    HechoId: me.rHechoId,
                    PersonaId: me.personaId.value,
                    Tipo: me.tipo2,
                    ClasificacionPersona: me.personaId.value1,
                    Manifestacion:
                      (me.personaId.value1 == "Testigo" &&
                        (me.personaId.value2 < 18 ||
                          me.personaId.value4 == "INFANCIA (0 A 5 AÑOS)" ||
                          me.personaId.value4 == "NIÑEZ (6 A 12 AÑOS)" ||
                          me.personaId.value4 ==
                            "ADOLECENCIA (13 A 17 AÑOS)")) ||
                      (me.personaId.value1 == "Imputado" &&
                        me.personaId.value2 >= 18 &&
                        me.personaId.value4 != "INFANCIA (0 A 5 AÑOS)" &&
                        me.personaId.value4 != "NIÑEZ (6 A 12 AÑOS)" &&
                        me.personaId.value4 != "ADOLECENCIA (13 A 17 AÑOS)")
                        ? me.hechos
                        : me.manifesto,
                    Hechos: me.hechos,
                    TRepresentantes: me.representantesf,
                    Edad: me.personaId.value2,
                    TipoEA: me.tipo,
                    HoraS: me.horas,
                    FechaS: me.fechas,
                    Representante: me.representantei,
                    Iniciales: me.personaId.value3,
                    Acompañantev: me.acnombre,
                    ParentezcoV: me.acvictima,
                    Tidentificacion: me.docidentificacion,
                    NoIdentificacion: me.noidentificacion,
                    Numerooficio: me.numerooficio,
                    UDistrito: me.u_distrito,
                    USubproc: me.u_municipio,
                    UAgencia: me.u_agencia,
                    Usuario: me.u_nombre,
                    UPuesto: me.u_puesto,
                    UModulo: me.u_modulo,
                    TipoP: me.tipopersona,
                    DireccionP: me.direccionpersonal,
                    ClasificacionP: me.clasificacionPersona,
                    VNombre: me.psimenor,
                    VPuesto: me.puestopsi,
                    CURPA: me.curpacompa,
                    EntrevistaInicial: response.data.primeraEntrevista,
                  },
                  configuracion
                )
                .then(function (response) {
                  var idampliacion = response.data.idampliacion;
                  me.$notify(
                    "La información se guardo correctamente !!!",
                    "success"
                  );

                  var now = moment();
                  me.vistaPreviaTF = false;
                  me.generarQR(me.docEntrevista,me.nuc,me.u_nombre,now,idampliacion);

                  
                  setTimeout(() => 
                  {
                    me.mostrarpdf(me.u_nombre, me.u_puesto, me.u_agencia);
                    me.modalAdd = false;
                    me.modaldocumento = false;
                    me.crearRegistroTableroI(descripcionRegTabI);
                    me.listar();
                    me.limpiar();
                  }, 1000);


                  
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
                me.$notify(
                  "Error al intentar listar los registros!!!",
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
    listarrHecho3(item) {
      var mifecha = item.fechaS;
      var mihora = item.horaS;
      this.nombreE = item.usuario;
      this.puestoE = item.uPuesto
      this.agenciaE = item.uAgencia
      this.idpersona = item.personaId;
      let me = this;

      

      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RHechoes/ListarPorId/" + me.rHechoId, configuracion)
        .then(function (response) {
          console.log(response.data);
          me.aux2 = response.data;
          (me.rAtencionId = response.data.rAtencionId),
            (me.rHechoId = response.data.rHechoId),
            (me.agenciaid = response.data.agenciaid),
            (me.registradopor = response.data.u_Nombre),
            (me.puestoquienregistro = response.data.u_Puesto),
            (me.modulodondefueatendido = response.data.u_Modulo),
            (me.distritoinicial = response.data.distritoInicial),
            (me.dirsubprocuinicial = response.data.dirSubProcuInicial),
            (me.agenciainicial = response.data.agenciaInicial),
            (me.fechaelevanuc = response.data.fechaElevaNuc),
            (me.fechaS = mifecha),
            (me.horaS = mihora),
            //console.log(response.data.fechaElevaNuc);
            (me.fechasuceso = response.data.fechaHoraSuceso),
            (me.rBreve = response.data.rBreve),
            (me.narrativaHechos = response.data.narrativaHechos),
            (me.vanabim2 = response.data.vanabim);
          me.vanabim = response.data.vanabim;
          me.listarrap3();

          me.vistaPreviaTF = false;
          me.generarQR(me.docLecDer,me.nuc,me.u_nombre,me.fechaelevanuc,me.rHechoId);

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
    listarrap3() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      // VALIDAMOS  SI YA FUE CAPTURADA LA NARRATIVA DE LOS HECHOS
      if (me.narrativaHechos == null) {
        me.rnh1 = false;
        console.log("Entre listarrap3");
        me.narrativaHechos =
          "<p>Esta representación social le da lectura y le explica los derechos que la Constitución Política de los Estados Unidos Mexicanos y el Código Nacional de Procedimientos Penales le concede al denunciante y/o víctima y le entrega la correspondiente acta de derechos. </p>" +
          "<br><br><b>FACULTAD DE ABSTENCIÓN </b><br><br>" +
          "<p>De igual forma se le hace saber que conforme a lo establecido en el artículo 361 del Código Nacional de Procedimientos Penales, podrá <strong>abstenerse de declarar</strong>, si es tutor, curador, pupilo, cónyuge, concubina o concubinario, conviviente del imputado, o " +
          "si ha vivido en forma permanente con él durante al menos dos años anteriores al hecho, de ser pariente por consanguinidad en la línea recta ascendente o descendente hasta el cuarto grado y en colateral por consanguinidad hasta el segundo grado inclusive, salvo que fuera " +
          "denunciante. Pero si acepta rendir su testimonio NO podrán negarse a contestar las preguntas que esta autoridad le formule." +
          "<p>A continuación, el compareciente hace del conocimiento de esta Representación social los siguientes hechos: <span>(texto libre)</span> (máximo 10 hojas)</p><br><br>" +
          "<p>Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello.</p>";
      } else {
        me.rnh1 = true;
      }
      me.$CAT
        .get("api/RAPs/Listarpersona/" + me.idpersona, configuracion)
        .then(function (response) {
          console.log(response.data);
          me.rac = response.data.rac;
          me.personaId = response.data.personaId;
          me.curp = response.data.curp;
          me.nombre =
            response.data.nombre +
            " " +
            response.data.apellidoPaterno +
            " " +
            response.data.apellidoMaterno;
          me.alias = response.data.alias;
          me.tel = response.data.telefono1 + " , " + response.data.telefono2;
          me.email = response.data.correo;
          me.rac = response.data.rac;
          me.fhreg = response.data.fechaHoraInicio;
          me.tvictima = response.data.clasificacionPersona;
          me.tipopersona = response.data.tipoPersona;
          me.sexo = response.data.sexo;
          me.genero = response.data.genero;
          me.iniciales = response.data.alias;
          me.fnacimiento = response.data.fechaNacimiento;
          me.estadocivil = response.data.estadoCivil;
          me.medionotificacion = response.data.medionotificacion;
          me.nacionalidad = response.data.nacionalidad;
          me.ocupacion = response.data.ocupacion;
          me.lengua = response.data.lengua;
          me.religion = response.data.religion;
          me.tipodiscapacidad = response.data.tipoDiscapacidad;
          me.parentesco = response.data.parentesco;
          me.nivelestudio = response.data.nivelEstudio;
          me.razonsocial = response.data.razonSocial;
          me.rfc = response.data.rfc;
          me.docacredita = response.data.docPoderNotarial;
          me.edad = response.data.edad;
          me.rangoedad = response.data.rangoEdad;

          var date = moment(me.fnacimiento, "DD/MM/YYYY");
          /* me.edad = moment().diff(date, 'years', false); */
          me.listardireccionpersona3();
          me.listardireccionhecho3();
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
    listardireccionhecho3() {
      console.log("Entre a listardireccionhecho3");
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get(
          "api/DireccionDelitoes/ListarPoridHecho/" + me.rHechoId,
          configuracion
        )
        .then(function (response) {
          console.log("Entre a direccionhecho3");
          let vialidadEncontrada = me.vialidades.find(v => v.value == response.data.tipoVialidad);
          let vialidadNS = vialidadEncontrada ? vialidadEncontrada.text : "";

          me.direccionsuceso =
          vialidadNS +
            " " +
            response.data.calle +
            " " +
            response.data.noint +
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
            response.data.cp;
          me.lat2 = response.data.lat;
          me.lng2 = response.data.lng;
          me.funcionprincipal();
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
            //console.log(err.response);
            me.$alert("Error", err.response.data.message);
            //me.$notify("El recuso no ha sido encontrado", 'error');
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listardireccionpersona3() {
      console.log("Entre a listardireccionpersona3");
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RAPs/ListarDP/" + me.personaId, configuracion)
        .then(function (response) {
          console.log(response.data);
          let vialidadEncontrada = me.vialidades.find(v => v.value == response.data.tipoVialidad);
          let vialidadN = vialidadEncontrada ? vialidadEncontrada.text : ""; 

          me.direccion =
          vialidadN +
            " " +
            response.data.calle +
            " " +
            response.data.noint +
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
            response.data.cp;
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
            me.$alert("Error", err.response.data.message);
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    funcionprincipal() {
      let me = this;
      console.log("Entre a la funcion");
      var eda = 20;
      console.log(me.edad);
      console.log(me.tvictima);
      if (
        me.edad >= 18 &&
        me.rangoedad != "INFANCIA (0 A 5 AÑOS)" &&
        me.rangoedad != "NIÑEZ (6 A 12 AÑOS)" &&
        me.rangoedad != "ADOLECENCIA (13 A 17 AÑOS)" &&
        me.tvictima === "Imputado"
      ) {
        //Si mi edad es mayor a 18 o igual y soy imputado, mando a llamar esa funcion, si no la condicion que sigue y asi
        console.log("Entre a la primera condicion");
        me.fila1 =
          "<p>En este acto, esta representación social hace del conocimiento del imputado <strong>" +
          this.nombre +
          "</strong>" +
          " que goza de los siguientes derechos establecidos en el <strong>Artículo 20 apartado B de la Constitución Política de los Estados Unidos Mexicanos:</strong> </p><br><br>" +
          '<p class="ql-align-justify">I. A que se presuma su inocencia mientras no se declare su responsabilidad mediante sentencia emitida por el juez de la causa; ' +
          "</p><br><br><p>II. A declarar o a guardar silencio. Desde el momento de su detención se le harán saber los motivos de la misma y su derecho a guardar silencio, el cual no podrá ser utilizado en su perjuicio. Queda prohibida y será sancionada por la ley penal, toda incomunicación, intimidación o tortura. La confesión rendida sin la asistencia del defensor carecerá de todo valor probatorio;  " +
          " </p><br><br><p>" +
          "III. A que se le informe, tanto en el momento de su detención como en su comparecencia ante el Ministerio Público o el juez, los hechos que se le imputan y los derechos que le asisten. Tratándose de delincuencia organizada, la autoridad judicial podrá autorizar que se mantenga en reserva el nombre y datos del acusador. La ley establecerá beneficios a favor del inculpado, procesado o sentenciado que preste ayuda eficaz para la investigación y persecución de delitos en materia de delincuencia organizada; " +
          " el Ministerio Público estará obligado a solicitar la reparación del daño, sin menoscabo de que la víctima u ofendido lo pueda solicitar directamente, y el juzgador no podrá absolver" +
          " </p><br><br><p>" +
          "IV. Se le recibirán los testigos y demás pruebas pertinentes que ofrezca, concediéndosele el tiempo que la ley estime necesario al efecto y auxiliándosele para obtener la comparecencia de las personas cuyo testimonio solicite, en los términos que señale la ley" +
          " </p><br><br><p>" +
          "V. Será juzgado en audiencia pública por un juez o tribunal. La publicidad sólo podrá restringirse en los casos de excepción que determine la ley, por razones de seguridad nacional, seguridad pública, protección de las víctimas, testigos y menores, cuando se ponga en riesgo la revelación de datos legalmente protegidos, o cuando el tribunal estime que existen razones fundadas para justificarlo. En delincuencia organizada, las actuaciones realizadas en la fase de investigación podrán tener valor probatorio, cuando no puedan ser reproducidas en juicio o exista riesgo para testigos o víctimas. Lo anterior sin perjuicio del derecho del inculpado de objetarlas o impugnarlas y aportar pruebas en contra; " +
          " </p><br><br><p>" +
          "VI. Le serán facilitados todos los datos que solicité para su defensa y que consten en el proceso. El imputado y su defensor tendrán acceso a los registros de la investigación cuando el primero se encuentre detenido y cuando pretenda recibírsele declaración o entrevistarlo. Asimismo, antes de su primera comparecencia ante juez podrán consultar dichos registros, con la oportunidad debida para preparar la defensa. A partir de este momento no podrán mantenerse en reserva las actuaciones de la investigación, salvo los casos excepcionales expresamente señalados en la ley cuando ello sea imprescindible para salvaguardar el éxito de la investigación y siempre que sean oportunamente revelados para no afectar el derecho de defensa; " +
          " </p><br><br><p>" +
          "VII. Será juzgado antes de cuatro meses si se tratare de delitos cuya pena máxima no exceda de dos años de prisión, y antes de un año si la pena excediere de ese tiempo, salvo que solicite mayor plazo para su defensa;" +
          " </p><br><br><p>" +
          "VIII. Tendrá derecho a una defensa adecuada por abogado, al cual elegirá libremente incluso desde el momento de su detención. Si no quiere o no puede nombrar un abogado, después de haber sido requerido para hacerlo, el juez le designará un defensor público. También tendrá derecho a que su defensor comparezca en todos los actos del proceso y éste tendrá obligación de hacerlo cuantas veces se le requiera, " +
          " </p><br><br><p>" +
          "IX. En ningún caso podrá prolongarse la prisión o detención, por falta de pago de honorarios de defensores o por cualquiera otra prestación de dinero, por causa de responsabilidad civil o algún otro motivo análogo. La prisión preventiva no podrá exceder del tiempo que como máximo de pena fije la ley al delito que motivare el proceso y en ningún caso será superior a dos años, salvo que su prolongación se deba al ejercicio del derecho de defensa del imputado. Si cumplido este término no se ha pronunciado sentencia, el imputado será puesto en libertad de inmediato mientras se sigue el proceso, sin que ello obste para imponer otras medidas cautelares. En toda pena de prisión que imponga una sentencia, se computará el tiempo de la detención." +
          " </p><br><br><br><p>" +
          "De igual forma se le hacen saber los derechos que le confiere el artículo 113 del Código Nacional de Procedimientos Penales:" +
          " </p><br><br><br><p>" +
          "I. A ser considerado y tratado como inocente hasta que se demuestre su responsabilidad; " +
          " </p><br><p>" +
          "II. A comunicarse con un familiar y con su Defensor cuando sea detenido, debiendo brindarle el Ministerio Público todas las facilidades para lograrlo; " +
          " </p><br><p>" +
          "III. A declarar o a guardar silencio, en el entendido que su silencio no podrá ser utilizado en su perjuicio; " +
          " </p><br><p>" +
          "IV. A estar asistido de su Defensor al momento de rendir su declaración, así como en cualquier otra actuación y a entrevistarse en privado previamente con él; " +
          " </p><br><p>" +
          "V. A que se le informe, tanto en el momento de su detención como en su comparecencia ante el Ministerio Público o el Juez de control, los hechos que se le imputan y los derechos que le asisten, así como, en su caso, el motivo de la privación de su libertad y el servidor público que la ordenó, exhibiéndosele, según corresponda, la orden emitida en su contra; " +
          " </p><br><p>" +
          "VI. A no ser sometido en ningún momento del procedimiento a técnicas ni métodos que atenten contra su dignidad, induzcan o alteren su libre voluntad; " +
          " </p><br><p>" +
          "VII. A solicitar ante la autoridad judicial la modificación de la medida cautelar que se le haya impuesto, en los casos en que se encuentre en prisión preventiva, en los supuestos señalados por este Código; " +
          " </p><br><p>" +
          "VIII. A tener acceso él y su defensa, salvo las excepciones previstas en la ley, a los registros de la investigación, así como a obtener copia gratuita, registro fotográfico o electrónico de los mismos, en términos de los artículos 218 y 219 de este Código. " +
          " </p><br><p>" +
          "IX. A que se le reciban los medios pertinentes de prueba que ofrezca, concediéndosele el tiempo necesario para tal efecto y auxiliándosele para obtener la comparecencia de las personas cuyo testimonio solicite y que no pueda presentar directamente, en términos de lo establecido por este Código; " +
          " </p><br><p>" +
          "X. A ser juzgado en audiencia por un Tribunal de enjuiciamiento, antes de cuatro meses si se tratare de delitos cuya pena máxima no exceda de dos años de prisión, y antes de un año si la pena excediere de ese tiempo, salvo que solicite mayor plazo para su defensa;" +
          " </p><br><p>" +
          " XI. A tener una defensa adecuada por parte de un licenciado en derecho o abogado titulado, con cédula profesional, al cual elegirá libremente incluso desde el momento de su detención y, a falta de éste, por el Defensor público que le corresponda, así como a reunirse o entrevistarse con él en estricta confidencialidad;" +
          " </p><br><p>" +
          " XII. A ser asistido gratuitamente por un traductor o intérprete en el caso de que no comprenda o hable el idioma español; cuando el imputado perteneciere a un pueblo o comunidad indígena, el Defensor deberá tener conocimiento de su lengua y cultura y, en caso de que no fuere posible, deberá actuar asistido de un intérprete de la cultura y lengua de que se trate; " +
          " </p><br><p>" +
          "XIII. A ser presentado ante el Ministerio Público o ante el Juez de control, según el caso, inmediatamente después de ser detenido o aprehendido;" +
          " </p><br><p>" +
          " XIV. A no ser expuesto a los medios de comunicación; " +
          " </p><br><p>" +
          "XV. A no ser presentado ante la comunidad como culpable" +
          " </p><br><p>" +
          "XVI. A solicitar desde el momento de su detención, asistencia social para los menores de edad o personas con discapacidad cuyo cuidado personal tenga a su cargo; " +
          " </p><br><p>" +
          "XVII. A obtener su libertad en el caso de que haya sido detenido, cuando no se ordene la prisión preventiva, u otra medida cautelar restrictiva de su libertad;" +
          " </p><br><p>" +
          " XVIII. A que se informe a la embajada o consulado que corresponda cuando sea detenido, y se le proporcione asistencia migratoria cuando tenga nacionalidad extranjera, y " +
          " </p><br><p>" +
          "XIX. Los demás que establezca este Código y otras disposiciones aplicables. Los plazos a que se refiere la fracción X de este artículo, se contarán a partir de la audiencia inicial hasta el momento en que sea dictada la sentencia emitida por el Órgano jurisdiccional competente." +
          " </p><br><p>" +
          " Cuando el imputado tenga a su cuidado menores de edad, personas con discapacidad, o adultos mayores que dependan de él, y no haya otra persona que pueda ejercer ese cuidado, el Ministerio Público deberá canalizarlos a instituciones de asistencia social que correspondan, a efecto de recibir la protección." +
          " </p><br><br><br><p>" +
          "En el caso de que se encuentre detenido el artículo 152 del Código Nacional de Procedimientos Penales le otorga los siguientes derechos:" +
          " </p><br><br><br><p>" +
          "I. El derecho a informar a alguien de su detención; " +
          " </p><br><p>" +
          "II. El derecho a consultar en privado con su Defensor;" +
          " </p><br><p>" +
          " III. El derecho a recibir una notificación escrita que establezca los derechos establecidos en las fracciones anteriores y las medidas que debe tomar para la obtención de asesoría legal;" +
          " </p><br><p>" +
          "IV. El derecho a ser colocado en una celda en condiciones dignas y con acceso a aseo personal; " +
          " </p><br><p>" +
          "V. El derecho a no estar detenido desnudo o en prendas íntimas;" +
          " </p><br><p>" +
          "VI. Cuando, para los fines de la investigación sea necesario que el detenido entregue su ropa, se le proveerán prendas de vestir, y" +
          " </p><br><p>" +
          "VII. El derecho a recibir atención clínica si padece una enfermedad física, se lesiona o parece estar sufriendo de un trastorno mental." +
          " </p><br><br>";

        me.fila2 =
          "<p>Una vez que me fueron leídos y explicados mis derechos, los comprendo y recibo una copia de los mismos, firmando al calce.</p><br><br><br><br>" +
          "<strong><p>NOMBRE DEL IMPUTADO</p><br><br><p>" +
          this.nombre +
          "</p><br><br><br><br>" +
          "<p>A T E N T A M E N T E.</p><br><br><br>" +
          this.nombreE +
          "<br><br>" +
          this.puestoE +
          "<br><br>" +
          "Adscrito al " +
          this.agenciaE +
          "</strong>";
        me.control = 1;
      } else if (
        (me.edad < 18 ||
          me.rangoedad == "INFANCIA (0 A 5 AÑOS)" ||
          me.rangoedad == "NIÑEZ (6 A 12 AÑOS)" ||
          me.rangoedad == "ADOLECENCIA (13 A 17 AÑOS)") &&
        me.tvictima === "Imputado"
      ) {
        console.log("Entre a la segunda condicion");
        me.fila1 =
          "<p>En este acto, esta representación social hace del conocimiento del imputado <strong>" +
          this.nombre +
          "</strong>" +
          " que goza de los siguientes derechos establecidos en el <strong>Artículo 20 apartado B de la Constitución Política de los Estados Unidos Mexicanos:</strong> </p><br><br>" +
          " </p><br><p>" +
          "I. A que se presuma su inocencia mientras no se declare su responsabilidad mediante sentencia emitida por el juez de la causa;" +
          " </p><br><p>" +
          "II. A declarar o a guardar silencio. Desde el momento de su detención se le harán saber los motivos de la misma y su derecho a guardar silencio, el cual no podrá ser utilizado en su perjuicio. Queda prohibida y será sancionada por la ley penal, toda incomunicación, intimidación o tortura. La confesión rendida sin la asistencia del defensor carecerá de todo valor probatorio; " +
          " </p><br><p>" +
          "III. A que se le informe, tanto en el momento de su detención como en su comparecencia ante el Ministerio Público o el juez, los hechos que se le imputan y los derechos que le asisten. Tratándose de delincuencia organizada, la autoridad judicial podrá autorizar que se mantenga en reserva el nombre y datos del acusador. La ley establecerá beneficios a favor del inculpado, procesado o sentenciado que preste ayuda eficaz para la investigación y persecución de delitos en materia de delincuencia organizada; " +
          " </p><br><p>" +
          "IV. Se le recibirán los testigos y demás pruebas pertinentes que ofrezca, concediéndosele el tiempo que la ley estime necesario al efecto y auxiliándosele para obtener la comparecencia de las personas cuyo testimonio solicite, en los términos que señale la ley" +
          " </p><br><p>" +
          " V. Será juzgado en audiencia pública por un juez o tribunal. La publicidad sólo podrá restringirse en los casos de excepción que determine la ley, por razones de seguridad nacional, seguridad pública, protección de las víctimas, testigos y menores, cuando se ponga en riesgo la revelación de datos legalmente protegidos, o cuando el tribunal estime que existen razones fundadas para justificarlo. En delincuencia organizada, las actuaciones realizadas en la fase de investigación podrán tener valor probatorio, cuando no puedan ser reproducidas en juicio o exista riesgo para testigos o víctimas. Lo anterior sin perjuicio del derecho del inculpado de objetarlas o impugnarlas y aportar pruebas en contra; " +
          " </p><br><p>" +
          "VI. Le serán facilitados todos los datos que solicité para su defensa y que consten en el proceso. El imputado y su defensor tendrán acceso a los registros de la investigación cuando el primero se encuentre detenido y cuando pretenda recibírsele declaración o entrevistarlo. Asimismo, antes de su primera comparecencia ante juez podrán consultar dichos registros, con la oportunidad debida para preparar la defensa. A partir de este momento no podrán mantenerse en reserva las actuaciones de la investigación, salvo los casos excepcionales expresamente señalados en la ley cuando ello sea imprescindible para salvaguardar el éxito de la investigación y siempre que sean oportunamente revelados para no afectar el derecho de defensa; " +
          " </p><br><p>" +
          "VII. Será juzgado antes de cuatro meses si se tratare de delitos cuya pena máxima no exceda de dos años de prisión, y antes de un año si la pena excediere de ese tiempo, salvo que solicite mayor plazo para su defensa;" +
          " </p><br><p>" +
          "VIII. Tendrá derecho a una defensa adecuada por abogado, al cual elegirá libremente incluso desde el momento de su detención. Si no quiere o no puede nombrar un abogado, después de haber sido requerido para hacerlo, el juez le designará un defensor público. También tendrá derecho a que su defensor comparezca en todos los actos del proceso y éste tendrá obligación de hacerlo cuantas veces se le requiera, y " +
          " </p><br><p>" +
          "IX. En ningún caso podrá prolongarse la prisión o detención, por falta de pago de honorarios de defensores o por cualquiera otra prestación de dinero, por causa de responsabilidad civil o algún otro motivo análogo. La prisión preventiva no podrá exceder del tiempo que como máximo de pena fije la ley al delito que motivare el proceso y en ningún caso será superior a dos años, salvo que su prolongación se deba al ejercicio del derecho de defensa del imputado. Si cumplido este término no se ha pronunciado sentencia, el imputado será puesto en libertad de inmediato mientras se sigue el proceso, sin que ello obste para imponer otras medidas cautelares. En toda pena de prisión que imponga una sentencia, se computará el tiempo de la detención." +
          " </p><br><br><p>" +
          "De igual forma se le hacen saber los derechos que le confiere el artículo 113 del Código Nacional de Procedimientos Penales:" +
          " </p><br><br><p>" +
          "I. A ser considerado y tratado como inocente hasta que se demuestre su responsabilidad; " +
          " </p><br><p>" +
          "II. A comunicarse con un familiar y con su Defensor cuando sea detenido, debiendo brindarle el Ministerio Público todas las facilidades para lograrlo; " +
          " </p><br><p>" +
          "III. A declarar o a guardar silencio, en el entendido que su silencio no podrá ser utilizado en su perjuicio; " +
          " </p><br><p>" +
          "IV. A estar asistido de su Defensor al momento de rendir su declaración, así como en cualquier otra actuación y a entrevistarse en privado previamente con él; " +
          " </p><br><p>" +
          "V. A que se le informe, tanto en el momento de su detención como en su comparecencia ante el Ministerio Público o el Juez de control, los hechos que se le imputan y los derechos que le asisten, así como, en su caso, el motivo de la privación de su libertad y el servidor público que la ordenó, exhibiéndosele, según corresponda, la orden emitida en su contra; " +
          " </p><br><p>" +
          "VI. A no ser sometido en ningún momento del procedimiento a técnicas ni métodos que atenten contra su dignidad, induzcan o alteren su libre voluntad; " +
          " </p><br><p>" +
          "VII. A solicitar ante la autoridad judicial la modificación de la medida cautelar que se le haya impuesto, en los casos en que se encuentre en prisión preventiva, en los supuestos señalados por este Código; " +
          " </p><br><p>" +
          "VIII. A tener acceso él y su defensa, salvo las excepciones previstas en la ley, a los registros de la investigación, así como a obtener copia gratuita, registro fotográfico o electrónico de los mismos, en términos de los artículos 218 y 219 de este Código. " +
          " </p><br><p>" +
          "IX. A que se le reciban los medios pertinentes de prueba que ofrezca, concediéndosele el tiempo necesario para tal efecto y auxiliándosele para obtener la comparecencia de las personas cuyo testimonio solicite y que no pueda presentar directamente, en términos de lo establecido por este Código; " +
          " </p><br><p>" +
          "X. A ser juzgado en audiencia por un Tribunal de enjuiciamiento, antes de cuatro meses si se tratare de delitos cuya pena máxima no exceda de dos años de prisión, y antes de un año si la pena excediere de ese tiempo, salvo que solicite mayor plazo para su defensa;" +
          " </p><br><p>" +
          " XI. A tener una defensa adecuada por parte de un licenciado en derecho o abogado titulado, con cédula profesional, al cual elegirá libremente incluso desde el momento de su detención y, a falta de éste, por el Defensor público que le corresponda, así como a reunirse o entrevistarse con él en estricta confidencialidad;" +
          " </p><br><p>" +
          " XII. A ser asistido gratuitamente por un traductor o intérprete en el caso de que no comprenda o hable el idioma español; cuando el imputado perteneciere a un pueblo o comunidad indígena, el Defensor deberá tener conocimiento de su lengua y cultura y, en caso de que no fuere posible, deberá actuar asistido de un intérprete de la cultura y lengua de que se trate; " +
          " </p><br><p>" +
          "XIII. A ser presentado ante el Ministerio Público o ante el Juez de control, según el caso, inmediatamente después de ser detenido o aprehendido;" +
          " </p><br><p>" +
          " XIV. A no ser expuesto a los medios de comunicación; " +
          " </p><br><p>" +
          "XV. A no ser presentado ante la comunidad como culpable" +
          " </p><br><p>" +
          "XVI. A solicitar desde el momento de su detención, asistencia social para los menores de edad o personas con discapacidad cuyo cuidado personal tenga a su cargo; " +
          " </p><br><p>" +
          "XVII. A obtener su libertad en el caso de que haya sido detenido, cuando no se ordene la prisión preventiva, u otra medida cautelar restrictiva de su libertad;" +
          " </p><br><p>" +
          " XVIII. A que se informe a la embajada o consulado que corresponda cuando sea detenido, y se le proporcione asistencia migratoria cuando tenga nacionalidad extranjera, y " +
          " </p><br><p>" +
          "XIX. Los demás que establezca este Código y otras disposiciones aplicables. Los plazos a que se refiere la fracción X de este artículo, se contarán a partir de la audiencia inicial hasta el momento en que sea dictada la sentencia emitida por el Órgano jurisdiccional competente." +
          " </p><br><p>" +
          " Cuando el imputado tenga a su cuidado menores de edad, personas con discapacidad, o adultos mayores que dependan de él, y no haya otra persona que pueda ejercer ese cuidado, el Ministerio Público deberá canalizarlos a instituciones de asistencia social que correspondan, a efecto de recibir la protección." +
          " </p><br><br><p>" +
          "En el caso de que se encuentre detenido el artículo 152 del Código Nacional de Procedimientos Penales le otorga los siguientes derechos:" +
          " </p><br><br><p>" +
          "I. El derecho a informar a alguien de su detención; " +
          " </p><br><p>" +
          "II. El derecho a consultar en privado con su Defensor;" +
          " </p><br><p>" +
          " III. El derecho a recibir una notificación escrita que establezca los derechos establecidos en las fracciones anteriores y las medidas que debe tomar para la obtención de asesoría legal;" +
          " </p><br><p>" +
          "IV. El derecho a ser colocado en una celda en condiciones dignas y con acceso a aseo personal; " +
          " </p><br><p>" +
          "V. El derecho a no estar detenido desnudo o en prendas íntimas;" +
          " </p><br><p>" +
          "VI. Cuando, para los fines de la investigación sea necesario que el detenido entregue su ropa, se le proveerán prendas de vestir, y" +
          " </p><br><p>" +
          "VII. El derecho a recibir atención clínica si padece una enfermedad física, se lesiona o parece estar sufriendo de un trastorno mental." +
          " </p><br><br>";
        me.fila2 =
          "<p> <strong>LEY DE  NACIONAL  DEL SISTEMA INTEGRAL DE JUSTICIA PARA ADOLESCNETES </strong></p>" +
          " </p><br><br><p>" +
          "<p> <strong>CAPÍTULO II </strong></p>" +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 13. Protección integral de los derechos de la persona adolescente </strong></p>" +
          " </p><br><br><p>" +
          "Las personas adolescentes gozan de todos los derechos humanos inherentes a las personas. Les serán garantizadas las oportunidades y facilidades, a fin de asegurarles las mejores condiciones para su desarrollo físico, psicológico y social, en condiciones de dignidad." +
          " </p><br><br><p>" +
          "Todas las autoridades del Sistema deberán respetar, proteger y garantizar los derechos de las personas adolescentes mientras se encuentren sujetas al mismo." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 14. Integralidad, indivisibilidad e interdependencia de los derechos de las personas adolescentes</strong></p>" +
          " </p><br><br><p>" +
          "Los derechos de las personas adolescentes son indivisibles y guardan interdependencia unos con otrosy sólo podrán considerarse garantizados en razón de su integralidad." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 15. Prohibición de tortura y otros tratos o penas crueles, inhumanos o degradantes </strong></p>" +
          " </p><br><br><p>" +
          "Estarán prohibidos todos los actos que constituyan tortura y otros tratos o penas crueles, inhumanoso o degradantes." +
          " </p><br><br><p>" +
          "Las autoridades, dentro de sus respectivos ámbitos de competencia, deberán garantizar la seguridad física, mental y emocional de las personas adolescentes." +
          " </p><br><br><p>" +
          "Quedan prohibidos los castigos corporales, la reclusión en celda oscura y las penas de aislamiento o de celda solitaria, así como cualquier otra sanción o medida disciplinaria contraria a los derechos humanos de la persona adolescente." +
          " </p><br><br><p>" +
          "No podrá ser sancionada ninguna persona adolescente más de una vez por el mismo hecho. Quedan prohibidas las sanciones colectivas." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 16. No Discriminación e igualdad sustantiva </strong></p>" +
          " </p><br><br><p>" +
          "Los derechos y garantías reconocidos en esta Ley se aplicarán a quienes se les atribuya o compruebe la realización de uno o varios hechos señalados como delitos por las leyes penales federales y locales mientras eran adolescentes, sin que se admita discriminación motivada por origen étnico o nacional, género, edad, discapacidad, condición social, condición de salud, religión, opinión, preferencia sexual, identidad de género, estado civil o cualquier otra, ya sea de la persona adolescente o de quienes ejercen sobre ellas la patria potestad o tutela, que atenten contra su dignidad humana." +
          " </p><br><br><p>" +
          "Se entiende por igualdad sustantiva el acceso al mismo trato y oportunidades para el reconocimiento, goce o ejercicio de los derechos humanos y las libertades fundamentales." +
          " </p><br><br><p>" +
          "Las autoridades del sistema velarán por que todas las personas adolescentes sean atendidas teniendo en cuenta sus características, condiciones específicas y necesidades especiales a fin de garantizar el ejercicio de sus derechos sobre la base de la igualdad sustantiva." +
          " </p><br><br><p>" +
          "Durante el procedimiento, determinación de la medida o sanción y ejecución de la que corresponda, se respetará a la persona adolescente en sus creencias, su religión y sus pautas culturales y éticas." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 17. Aplicación favorable </strong></p>" +
          " </p><br><br><p>" +
          "En ningún caso se podrán imponer a las personas adolescentes medidas más graves ni de mayor duración a las que corresponderían por los mismos hechos a un adulto, ni gozar de menos derechos, prerrogativas o beneficios que se le concedan a estos. De igual forma, bajo ninguna circunstancia se establecerán restricciones en los procesos de solución de conflictos que perjudiquen en mayor medida a la persona adolescente que al adulto." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 18. Mínima intervención y subsidiariedad</strong></p>" +
          " </p><br><br><p>" +
          "La solución de controversias en los que esté involucrada alguna persona adolescente se hará prioritariamente sin recurrir a procedimientos judiciales, con pleno respeto a sus derechos humanos. Se privilegiará el uso de soluciones alternas en términos de esta Ley, el Código Nacional y la Ley de Mecanismos Alternativos." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 19. Autonomía progresiva</strong></p>" +
          " </p><br><br><p>" +
          "Todas las autoridades del sistema deben hacer el reconocimiento pleno de la titularidad de derechos de las personas adolescentes y de su capacidad progresiva para ejercerlos, de acuerdo a la evolución de sus facultades, lo cual significa que a medida que aumenta la edad también se incrementa el nivel de autonomía." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 20. Responsabilidad</strong></p>" +
          " </p><br><br><p>" +
          "La responsabilidad de la persona adolescente se fincará sobre la base del principio de culpabilidad por el acto. No admitirá, en su perjuicio y bajo ninguna circunstancia, consideraciones acerca de la personalidad, vulnerabilidad biológica, temibilidad, peligrosidad, ni de cualquier otra que se funde en circunstancias personales de la persona adolescente imputada." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 21. Justicia Restaurativa</strong></p>" +
          " </p><br><br><p>" +
          "El principio de justicia restaurativa es una respuesta a la conducta que la ley señala como delito, que respeta la dignidad de cada persona, que construye comprensión y promueve armonía social a través de la restauración de la víctima u ofendido, la persona adolescente y la comunidad. Este principio puede desarrollarse de manera individual para las personas mencionadas y sus respectivos entornos y, en la medida de lo posible, entre ellos mismos, a fin de reparar el daño, comprender el origen del conflicto, sus causas y consecuencias." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 22. Principios generales del procedimiento</strong></p>" +
          " </p><br><br><p>" +
          "El Sistema estará basado en un proceso acusatorio y oral en el que se observarán los principios de publicidad, contradicción, concentración, continuidad e inmediación con las adecuaciones y excepciones propias del sistema especializado." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 23. Especialización</strong></p>" +
          " </p><br><br><p>" +
          "Todas las autoridades del Sistema deberán estar formadas, capacitadas y especializadas en materia de justicia para adolescentes en el ámbito de sus atribuciones." +
          " </p><br><br><p>" +
          "Las instituciones u órganos que intervengan en la operación del Sistema, deberán proveer la formación, capacitación y actualización específica a sus servidores públicos, de acuerdo a su grado de intervención en las diferentes fases o etapas de dicho Sistema, por lo que incluirán lo anterior en sus programas de capacitación, actualización y/o de formación correspondientes." +
          " </p><br><br><p>" +
          "Asimismo, deberán conocer los fines del Sistema Integral de Justicia Penal para Adolescentes, la importancia de sus fases, particularmente de las condiciones que motivan que las personas sujetas a esta Ley cometan o participen en hechos señalados como delitos por las leyes penales y las circunstancias de la etapa correspondiente a la adolescencia." +
          " </p><br><br><p>" +
          "Desde el inicio del procedimiento, todas las actuaciones y diligencias estarán a cargo de órganos especializados en el Sistema, en los términos de esta Ley." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 24. Legalidad</strong></p>" +
          " </p><br><br><p>" +
          "Ninguna persona adolescente puede ser procesada ni sometida a medida alguna por actos u omisiones que, al tiempo de su ocurrencia, no estén previamente definidos de manera expresa como delitos en las leyes penales aplicables." +
          " </p><br><br><p>" +
          "La responsabilidad penal de una persona adolescente solamente podrá determinarse seguido el procedimiento establecido en la presente Ley. En caso de comprobarse la responsabilidad de la persona adolescente, el Órgano Jurisdiccional únicamente podrá sancionarla a cumplir las medidas de sanción señaladas en la presente Ley, conforme a las reglas y criterios establecidos para su determinación." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 25. Ley más favorable</strong></p>" +
          " </p><br><br><p>" +
          "Cuando una misma situación relacionada con personas adolescentes, se encuentre regulada por leyes o normas diversas, siempre se optará por la que resulte más favorable a sus derechos, o a la interpretación más garantista que se haga de las mismas." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 26. Presunción de inocencia</strong></p>" +
          " </p><br><br><p>" +
          "Toda persona adolescente debe ser considerada y tratada como inocente en todas las etapas del procedimiento mientras no se declare su responsabilidad mediante sentencia firme emitida por Órgano Jurisdiccional, en los términos señalados en esta Ley." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 27. Racionalidad y proporcionalidad de las medidas cautelares y de sanción</strong></p>" +
          " </p><br><br><p>" +
          "Las medidas cautelares y de sanción que se impongan a las personas adolescentes deben corresponder a la afectación causada por la conducta, tomando en cuenta las circunstancias personales de la persona adolescente, siempre en su beneficio." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 28. Reintegración social y familiar de la persona adolescente</strong></p>" +
          " </p><br><br><p>" +
          "La reintegración social y familiar es un proceso integral que se debe desarrollar durante la ejecución de la medida de sanción, cuyo objeto es garantizar el ejercicio de los derechos de la persona adolescente encontrada responsable de la comisión de un delito." +
          " </p><br><br><p>" +
          "La reintegración se llevará a través de diversos programas socioeducativos de intervención destinados a incidir en los factores internos y externos, en los ámbitos familiar, escolar, laboral y comunitario de la persona adolescente para que genere capacidades y competencias que le permitan reducir la posibilidad de reincidencia y adquirir una función constructiva en la sociedad." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 29. Reinserción social</strong></p>" +
          " </p><br><br><p>" +
          "Restitución del pleno ejercicio de los derechos y libertades tras el cumplimiento de las medidas ejecutadas con respeto a los derechos humanos de la persona adolescente." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 30. Carácter socioeducativo de las medidas de sanción</strong></p>" +
          " </p><br><br><p>" +
          "Las medidas de sanción tendrán un carácter socioeducativo, promoverán la formación de la persona adolescente, el respeto por los derechos humanos y las libertades fundamentales, el fomento de vínculos socialmente positivos y el pleno desarrollo de su personalidad y de sus capacidades." +
          " </p><br><br><p>" +
          "En la ejecución de las medidas de sanción se deberá procurar que la persona adolescente se inserte en su familia y en la sociedad, mediante el pleno desarrollo de sus capacidades y su sentido de la responsabilidad." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 31. Medidas de privación de la libertad como medida extrema y por el menor tiempo posible </strong></p>" +
          " </p><br><br><p>" +
          "Las medidas de privación de la libertad se utilizarán como medida extrema y excepcional, sólo se podrán imponer a personas adolescentes mayores de catorce años, por los hechos constitutivos de delito que esta Ley señala, por un tiempo determinado y la duración más breve que proceda." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 32. Publicidad</strong></p>" +
          " </p><br><br><p>" +
          "Todas las audiencias que se celebren durante el procedimiento y la ejecución de medidas se realizarán a puerta cerrada, salvo que la persona adolescente solicite al Órgano Jurisdiccional que sean públicas, previa consulta con su defensor. El Órgano Jurisdiccional debe asegurarse que el consentimiento otorgado por la persona adolescente, respecto a la publicidad de las audiencias, sea informado. " +
          " </p><br><br><p>" +
          "No vulnera el principio de publicidad de las personas adolescentes, la expedición de audio y video de las audiencias a favor de las partes en el procedimiento, teniendo la prohibición de divulgar su contenido al público. " +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 33. Celeridad procesal</strong></p>" +
          " </p><br><br><p>" +
          "Los procesos en los que están involucradas personas adolescentes se realizarán sin demora y con la mínima duración posible, por lo que las autoridades y órganos operadores del Sistema, deberán ejercer sus funciones y atender las solicitudes de los interesados con prontitud y eficacia, sin causar dilaciones injustificadas, siempre que no afecte el derecho de defensa." +
          " </p><br><br><p>" +
          "<p> <strong>CAPÍTULO II </strong></p>" +
          " </p><br><br><p>" +
          "<p> <strong>DERECHOS Y DEBERES DE LAS PERSONAS ADOLESCENTES</strong></p>" +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 34. Enunciación no limitativa</strong></p>" +
          " </p><br><br><p>" +
          "Los derechos de las personas adolescentes previstos en la presente Ley son de carácter enunciativo y deberán ser interpretados de conformidad con lo dispuesto en la Constitución, en los Tratados Internacionales de los que el Estado mexicano sea parte y las leyes aplicables en la materia, favoreciendo en todo tiempo la protección más amplia de sus derechos." +
          " </p><br><br><p>" +
          "<p> <strong>SECCIÓN PRIMERA</strong></p>" +
          " </p><br><br><p>" +
          "<p> <strong>DERECHOS DE LAS PERSONAS ADOLESCENTES SUJETAS AL SISTEMA</strong></p>" +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 35. Protección a la intimidad</strong></p>" +
          " </p><br><br><p>" +
          "La persona adolescente tendrá derecho a que durante todo el procedimiento y la ejecución de las medidas se respete su derecho a la intimidad personal y familiar, evitando cualquier intromisión indebida a su vida privada o a la de su familia. Las autoridades protegerán la información que se refiera a su vida privada, la de su familia y sus datos personales." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 36. Confidencialidad y Privacidad</strong></p>" +
          " </p><br><br><p>" +
          "En todas las etapas del proceso y durante la ejecución de las medidas de sanción las autoridades del Sistema garantizarán la protección del derecho de las personas adolescentes a la confidencialidad y privacidad a sus datos personales y familiares." +
          " </p><br><br><p>" +
          "Desde el inicio de la investigación o el proceso las policías, el Ministerio Público o el Órgano Jurisdiccional, informarán de esta prohibición a quienes intervengan o asistan al proceso y, en su caso, a los medios de comunicación." +
          " </p><br><br><p>" +
          "Si la información que permite la identificación de la persona adolescente investigado, procesado o sancionado, fuera divulgada por funcionarios públicos, se aplicarán las penas señaladas para el tipo penal básico del delito contra la administración de justicia, cometidos por servidores públicos." +
          " </p><br><br><p>" +
          "En caso de los medios de comunicación, se aplicarán las sanciones previstas en el artículo 149 de la Ley General y se exigirá la retractación de la misma forma en que se hubiere dado publicidad de la información sobre la persona adolescente investigado, procesado o sancionado." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 37. Registro de procesos</strong></p>" +
          " </p><br><br><p>" +
          "Los antecedentes y registros relacionados con personas adolescentes sometidas a proceso o sancionadas conforme a esta Ley en ningún caso podrán ser utilizados en contra de la misma persona, en otro juicio derivado de hechos diferentes." +
          " </p><br><br><p>" +
          "Si la persona adolescente fuere absuelta mediante sentencia firme, el registro y los antecedentes se destruirán transcurridos tres meses contados desde que la sentencia quede firme. Antes del vencimiento de este plazo, la persona adolescente o su defensor podrán solicitar que estos registros se conserven íntegramente, cuando consideren que su conservación sea en su beneficio. Si el caso se resuelve mediante una salida alterna, los registros relacionados se destruirán dos años después de haberse cumplido con el acuerdo reparatorio o el plan de reparación de la suspensión condicional del procedimiento." +
          " </p><br><br><p>" +
          "Pasados tres años del cumplimiento de la medida de sanción impuesta o extinguida la acción penal por las causales previstas en esta Ley, se destruirán todos los registros vinculados con el proceso legal." +
          " </p><br><br><p>" +
          "No obstante lo dispuesto en esta norma, los registros que contengan la sentencia se preservarán, salvaguardando, en todo caso, la información sobre los datos personales de las partes, peritos y testigos  en el proceso. " +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 38. Garantías de la detención</strong></p>" +
          " </p><br><br><p>" +
          "Toda persona adolescente deberá ser presentada inmediatamente ante el Ministerio Público o el Juez de Control especializados dentro de los plazos que establece esta Ley, garantizando sus derechos y seguridad." +
          " </p><br><br><p>" +
          "Desde el momento de su detención se asegurará que las personas adolescentes permanezcan en lugares distintos a los adultos." +
          " </p><br><br><p>" +
          "En todos los casos habrá un registro inmediato de la detención." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 39. Prohibición de incomunicación</strong></p>" +
          " </p><br><br><p>" +
          "Toda persona adolescente tiene derecho a establecer una comunicación efectiva, por vía telefónica o por cualquier otro medio disponible, inmediatamente luego de ser detenida, con sus familiares, su defensor o con la persona o agrupación a quien desee informar sobre su detención o privación de libertad. " +
          " </p><br><br><p>" +
          "Durante la ejecución de las medidas queda prohibido imponer como medida disciplinaria la incomunicación a cualquier persona adolescente." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 40. Información a las personas adolescentes</strong></p>" +
          " </p><br><br><p>" +
          "Toda persona adolescente tiene derecho a ser informada sobre las razones por las que se le detiene, acusa, juzga o impone una medida; el nombre de la persona que le atribuye la realización del hecho señalado como delito; las consecuencias de la atribución del hecho; los derechos y garantías que le asisten y el derecho a disponer de una defensa jurídica gratuita." +
          " </p><br><br><p>" +
          "La información deberá ser proporcionada en un lenguaje claro, sencillo, comprensible y sin demora, de manera personal y en presencia de la o las personas responsables de la persona adolescente, de su representante legal o de la persona que el adolescente haya designado como de su confianza." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 41. Defensa técnica especializada </strong></p>" +
          " </p><br><br><p>" +
          "Todo adolescente tiene derecho a ser asistido por un licenciado en derecho, con cédula profesional y especializado en el Sistema, en todas las etapas del procedimiento, desde su detención hasta el fin de la ejecución de la medida impuesta." +
          " </p><br><br><p>" +
          "En caso de que no elija a su propio defensor, el Ministerio Público o el Órgano Jurisdiccional le designará defensor público desde el primer acto del procedimiento. El Órgano Jurisdiccional debe velar por que la persona adolescente goce de defensa técnica y adecuada." +
          " </p><br><br><p>" +
          "En caso de ser indígenas, extranjeros, tengan alguna discapacidad o no sepan leer ni escribir, la persona adolescente será asistido de oficio y en todos los actos procesales por un defensor que comprenda plenamente su idioma, lengua, dialecto y cultura; o bien, de ser necesario, su defensor será auxiliado por un traductor o intérprete asignado por la autoridad correspondiente o designado por la propia persona adolescente. Cuando este último alegue ser indígena, se tendrá como cierta su sola manifestación." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 42. Presencia y acompañamiento de la persona responsable o por persona en quien confíe</strong></p>" +
          " </p><br><br><p>" +
          "La persona responsable de la o el adolescente, o la persona de su confianza podrán estar presentes durante el procedimiento y durante las audiencias de ejecución. Éstos tendrán derecho a estar presentes en las actuaciones y quienes imparten justicia podrán requerir su presencia en defensa de las personas adolescentes. Este acompañamiento será considerado como una asistencia general a la persona adolescente, de naturaleza psicológica y emotiva, que debe extenderse a lo largo de todo el procedimiento." +
          " </p><br><br><p>" +
          "Dicho acompañamiento podrá ser denegado por la autoridad jurisdiccional competente cuando existan motivos fundados para presumir que la exclusión es necesaria en defensa de la persona adolescente." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 43. Derecho a ser escuchado</strong></p>" +
          " </p><br><br><p>" +
          "Toda persona adolescente tiene derecho a ser escuchada y tomada en cuenta directamente en cualquier etapa del procedimiento, tomando en consideración su edad, estado de desarrollo evolutivo, cognoscitivo y madurez." +
          " </p><br><br><p>" +
          "La persona adolescente que no comprenda, ni pueda darse a entender en español, deberá ser provista de un traductor o intérprete a fin de que pueda expresarse en su propia lengua." +
          " </p><br><br><p>" +
          "Si se trata de una persona adolescente con discapacidad se le nombrará intérprete idóneo que garantice la comunicación efectiva." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 44. Ajustes razonables al procedimiento</strong></p>" +
          " </p><br><br><p>" +
          "En caso de que la persona adolescente tenga alguna discapacidad podrá solicitar por sí o por medio de su defensor, un ajuste razonable al procedimiento para asegurar su efectiva y plena participación." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 45. Abstención de declarar</strong></p>" +
          " </p><br><br><p>" +
          "Toda persona adolescente tiene derecho a abstenerse de declarar y a no incriminarse a sí misma. Su silencio no puede ser valorado en su contra." +
          " </p><br><br><p>" +
          "Si una persona adolescente, después de haberlo consultado con su defensa, quisiera hacer uso de su derecho a declarar, únicamente podrá hacerlo en presencia del Órgano Jurisdiccional competente y con la presencia de su defensa. En ningún caso se le exigirá protesta de decir verdad" +
          " </p><br><br><p>" +
          "Una vez que me fueron leídos y explicados mis derechos, los comprendo y recibo una copia de los mismos." +
          " </p><br><br><br><br>" +
          "<strong><p>NOMBRE DEL IMPUTADO</p><br><br><p>" +
          this.nombre +
          "</p><br><br><br><br>" +
          "<p>A T E N T A M E N T E.</p><br><br><br>" +
          this.nombreE +
          "<br><br>" +
          this.puestoE +
          "<br><br>" +
          "Adscrito al " +
          this.agenciaE +
          "</strong>";
        me.control = 2;
      } else if (
        (me.edad < 18 ||
          me.rangoedad == "INFANCIA (0 A 5 AÑOS)" ||
          me.rangoedad == "NIÑEZ (6 A 12 AÑOS)" ||
          me.rangoedad == "ADOLECENCIA (13 A 17 AÑOS)") &&
        (me.tvictima === "Victima directa" ||
          me.tvictima === "Victima indirecta" ||
          me.tvictima === "Anonimo")
      ) {
        console.log("Entre a la tercera condicion");
        me.fila1 =
          "<p>En este acto, esta representación social hace saber a la víctima (s) u ofendido (s) <strong>" +
          this.nombre +
          "</strong>" +
          " que el <strong>Artículo 20 apartado C de la Constitución Política de los Estados Unidos Mexicanos </strong> le otorga los siguientes derechos:</p><br><br>" +
          " </p><br><p>" +
          "I. Recibir asesoría jurídica; ser informado de los derechos que en su favor establece la Constitución y, cuando lo solicite, ser informado del desarrollo del procedimiento penal; " +
          " </p><br><p>" +
          "II. Coadyuvar con el Ministerio Público; a que se le reciban todos los datos o elementos de prueba con los que cuente, tanto en la investigación como en el proceso, a que se desahoguen las diligencias correspondientes, y a intervenir en el juicio e interponer los recursos en los términos que prevea la ley. Cuando el Ministerio Público considere que no es necesario el desahogo de la diligencia, deberá fundar y motivar su negativa; " +
          " </p><br><p>" +
          "III. Recibir, desde la comisión del delito, atención médica y psicológica de urgencia; " +
          " </p><br><p>" +
          "IV. Que se le repare el daño. En los casos en que sea procedente, el Ministerio Público estará obligado a solicitar la reparación del daño, sin menoscabo de que la víctima u ofendido lo pueda solicitar directamente, y el juzgador no podrá absolver al sentenciado de dicha reparación si ha emitido una sentencia condenatoria. La ley fijará procedimientos ágiles para ejecutar las sentencias en materia de reparación del daño; " +
          " </p><br><p>" +
          "V. Al resguardo de su identidad y otros datos personales en los siguientes casos: cuando sean menores de edad; cuando se trate de delitos de violación, trata de personas, secuestro o delincuencia organizada; y cuando a juicio del juzgador sea necesario para su protección, salvaguardando en todo caso los derechos de la defensa. El Ministerio Público deberá garantizar la protección de víctimas, ofendidos, testigos y en general todos los sujetos que intervengan en el proceso. Los jueces deberán vigilar el buen cumplimiento de esta obligación; " +
          " </p><br><p>" +
          "VI. Solicitar las medidas cautelares y providencias necesarias para la protección y restitución de sus derechos, y " +
          " </p><br><p>" +
          "VII. Impugnar ante autoridad judicial las omisiones del Ministerio Público en la investigación de los delitos, así como las resoluciones de reserva, no ejercicio, desistimiento de la acción penal o suspensión del procedimiento cuando no esté satisfecha la reparación del daño." +
          " </p><br><br><br><p>";
        me.fila2 =
          "<p>De igual forma se le hace saber que el artículo <strong>109 del Código Nacional de Procedimientos Penales </strong>" +
          " le otorga los siguientes derechos:" +
          " </p><br><br><p>" +
          "I. A ser informado de los derechos que en su favor le reconoce la Constitución; " +
          " </p><br><p>" +
          "II. A que el Ministerio Público y sus auxiliares, así como el Órgano jurisdiccional le faciliten el acceso a la justicia y les presten los servicios que constitucionalmente tienen encomendados con legalidad, honradez, lealtad, imparcialidad, profesionalismo, eficiencia y eficacia y con la debida diligencia;" +
          " </p><br><p>" +
          "III. A contar con información sobre los derechos que en su beneficio existan, como ser atendidos por personal del mismo sexo, o del sexo que la víctima elija, cuando así lo requieran y recibir desde la comisión del delito atención médica y psicológica de urgencia, así como asistencia jurídica a través de un Asesor jurídico; " +
          " </p><br><p>" +
          "IV. A comunicarse, inmediatamente después de haberse cometido el delito con un familiar, e incluso con su Asesor jurídico; " +
          " </p><br><p>" +
          "V. A ser informado, cuando así lo solicite, del desarrollo del procedimiento penal por su Asesor jurídico, el Ministerio Público y/o, en su caso, por el Juez o Tribunal; " +
          " </p><br><p>" +
          "VI. A ser tratado con respeto y dignidad; " +
          " </p><br><p>" +
          "VII. A contar con un Asesor jurídico gratuito en cualquier etapa del procedimiento, en los términos de la legislación aplicable; " +
          " </p><br><p>" +
          "VIII. A recibir trato sin discriminación a fin de evitar que se atente contra la dignidad humana y se anulen o menoscaben sus derechos y libertades, por lo que la protección de sus derechos se hará sin distinción alguna; " +
          " </p><br><p>" +
          "IX. A acceder a la justicia de manera pronta, gratuita e imparcial respecto de sus denuncias o querellas; " +
          " </p><br><p>" +
          "X. A participar en los mecanismos alternativos de solución de controversias; " +
          " </p><br><p>" +
          "XI. A recibir gratuitamente la asistencia de un intérprete o traductor desde la denuncia hasta la conclusión del procedimiento penal, cuando la víctima u ofendido pertenezca a un grupo étnico o pueblo indígena o no conozca o no comprenda el idioma español; " +
          " </p><br><p>" +
          "XII. En caso de tener alguna discapacidad, a que se realicen los ajustes al procedimiento penal que sean necesarios para salvaguardar sus derechos; " +
          " </p><br><p>" +
          "XIII. A que se le proporcione asistencia migratoria cuando tenga otra nacionalidad; " +
          " </p><br><p>" +
          "XIV. A que se le reciban todos los datos o elementos de prueba pertinentes con los que cuente, tanto en la investigación como en el proceso, a que se desahoguen las diligencias correspondientes, y a intervenir en el juicio e interponer los recursos en los términos que establece este Código; " +
          " </p><br><p>" +
          "XV. A intervenir en todo el procedimiento por sí o a través de su Asesor jurídico, conforme lo dispuesto en este Código; " +
          " </p><br><p>" +
          "XVI. A que se le provea protección cuando exista riesgo para su vida o integridad personal; " +
          " </p><br><p>" +
          "XVII. A solicitar la realización de actos de investigación que en su caso correspondan, salvo que el Ministerio Público considere que no es necesario, debiendo fundar y motivar su negativa; " +
          " </p><br><p>" +
          "XVIII. A recibir atención médica y psicológica o a ser canalizado a instituciones que le proporcionen estos servicios, así como a recibir protección especial de su integridad física y psíquica cuando así lo solicite, o cuando se trate de delitos que así lo requieran; " +
          " </p><br><p>" +
          "XIX. A solicitar medidas de protección, providencias precautorias y medidas cautelares; " +
          " </p><br><p>" +
          "XX. A solicitar el traslado de la autoridad al lugar en donde se encuentre, para ser interrogada o participar en el acto para el cual fue citada, cuando por su edad, enfermedad grave o por alguna otra imposibilidad física o psicológica se dificulte su comparecencia, a cuyo fin deberá requerir la dispensa, por sí o por un tercero, con anticipación; " +
          " </p><br><p>" +
          "XXI. A impugnar por sí o por medio de su representante, las omisiones o negligencia que cometa el Ministerio Público en el desempeño de sus funciones de investigación, en los términos previstos en este Código y en las demás disposiciones legales aplicables;" +
          " </p><br><p>" +
          " XXII. A tener acceso a los registros de la investigación durante el procedimiento, así como a obtener copia gratuita de éstos, salvo que la información esté sujeta a reserva así determinada por el Órgano jurisdiccional; " +
          " </p><br><p>" +
          "XXIII. A ser restituido en sus derechos, cuando éstos estén acreditados; " +
          " </p><br><p>" +
          "XXIV. A que se le garantice la reparación del daño durante el procedimiento en cualquiera de las formas previstas en este Código;" +
          " </p><br><p>" +
          " XXV. A que se le repare el daño causado por la comisión del delito, pudiendo solicitarlo directamente al Órgano jurisdiccional, sin perjuicio de que el Ministerio Público lo solicite; " +
          " </p><br><p>" +
          "XXVI. Al resguardo de su identidad y demás datos personales cuando sean menores de edad, se trate de delitos de violación contra la libertad y el normal desarrollo psicosexual, violencia familiar, secuestro, trata de personas o cuando a juicio del Órgano jurisdiccional sea necesario para su protección, salvaguardando en todo caso los derechos de la defensa; " +
          " </p><br><p>" +
          "XXVII. A ser notificado del desistimiento de la acción penal y de todas las resoluciones que finalicen el procedimiento, de conformidad con las reglas que establece este Código; " +
          " </p><br><p>" +
          "XXVIII. A solicitar la reapertura del proceso cuando se haya decretado su suspensión, y" +
          " </p><br><p>" +
          "XXIX. Los demás que establezcan este Código y otras leyes aplicables." +
          " </p><br><br><p>" +
          "<p> <strong><u>En el caso de que las víctimas sean personas menores de dieciocho años, el Órgano jurisdiccional o el Ministerio Público tendrán en cuenta los principios del interés superior de los niños o adolescentes, la prevalencia de sus derechos, su protección integral y los derechos consagrados en la Constitución, en los Tratados, así como los previstos en el presente Código.</u></strong></p>" +
          " </p><br><br><p>" +
          "Para los delitos que impliquen violencia contra las mujeres, se deberán observar todos los derechos que en su favor establece la Ley General de Acceso de las Mujeres a una Vida Libre de Violencia y demás disposiciones aplicables." +
          " </p><br><br><p>" +
          "De igual forma se le hace del conocimiento de la víctima u ofendido menor de edad que goza de los derechos establecidos, por el artículo 86 de la Ley General de los Derechos de Niñas, Niños y Adolescentes que son los siguientes:" +
          " </p><br><p>" +
          "I. Se les informe sobre la naturaleza del procedimiento y el carácter de su participación en el mismo, el que en ningún caso podrá ser el de imputado o probable responsable;" +
          " </p><br><p>" +
          "II. Que su participación en un procedimiento se lleve a cabo de la manera más expedita, asistidos por un profesional en derecho y atendiendo a lo dispuesto por la fracción XI del artículo 83 de esta Ley;" +
          " </p><br><p>" +
          "III. Garantizar el acompañamiento de quien ejerza sobre ellos la patria potestad, tutela o guarda y custodia durante la sustanciación de todo el procedimiento, salvo disposición judicial en contrario, con base en el interés superior de la niñez;" +
          "</p><br><p>" +
          "IV. Que se preserve su derecho a la intimidad, que no se divulguen sus datos de identificación en los términos de esta Ley y las demás aplicables;" +
          " </p><br><p>" +
          "V. Tener acceso gratuito a asistencia jurídica, psicológica y cualquier otra necesaria atendiendo a las características del caso, a fin de salvaguardar sus derechos, en términos de las disposiciones aplicables, y" +
          " </p><br><p>" +
          "VI. Adoptar las medidas necesarias para evitar la re-victimización de niñas, niños y adolescentes que presuntamente son víctimas de la comisión de un delito o violación a sus derechos humanos." +
          " </p><br><br><br>";
        me.fila3 =
          "<p><strong><c>LEY NACIONAL DEL SISTEMA INTEGRAL DE JUSTICIA PENAL PARA ADOLESCENTES</c></strong>" +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 4. Niñas y Niños.</strong></p>" +
          " </p><br><p>" +
          "Las niñas y niños, en términos de la Ley General, a quienes se les atribuya la comisión de un hecho que la ley señale como delito estarán exentos de responsabilidad penal, sin perjuicio de las responsabilidades civiles a las que haya lugar. " +
          " </p><br><p>" +
          "En caso de que la autoridad advierta que los derechos de estas niñas y niños están siendo amenazados o violados, deberá dar aviso a la Procuraduría de Protección competente." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 7. Comprobación de la edad </strong></p>" +
          " </p><br><p>" +
          "Para todos los efectos de esta Ley, la edad a considerar será la que tenía la persona al momento de realizar el hecho que la ley señale como delito, el cual se acreditará mediante acta de nacimiento expedida por el Registro Civil, o bien, tratándose de extranjeros, mediante documento oficial. Cuando esto no sea posible, la comprobación de la edad se hará mediante dictamen médico rendido por el o los peritos que para tal efecto designe la autoridad correspondiente." +
          " </p><br><br><p>" +
          "<p> <strong>Artículo 12. Interés superior de la niñez </strong></p>" +
          " </p><br><p>" +
          "Para efectos de esta Ley el interés superior de la niñez debe entenderse como derecho, principio y norma de procedimiento dirigido a asegurar el disfrute pleno y efectivo de todos sus derechos, en concordancia con la Ley General de los Derechos de Niñas, Niños y Adolescentes. " +
          " </p><br><p>" +
          "La determinación del interés superior debe apreciar integralmente: " +
          " </p><br><p>" +
          "I. El reconocimiento de éstos como titulares de derechos; " +
          " </p><br><p>" +
          "II. La opinión de la persona adolescente; " +
          " </p><br><p>" +
          "III. Las condiciones sociales, familiares e individuales de la persona adolescente; " +
          " </p><br><p>" +
          "IV. Los derechos y garantías de la persona adolescente y su responsabilidad; " +
          " </p><br><p>" +
          "V. El interés público, los derechos de las personas y de la persona adolescente; " +
          " </p><br><p>" +
          "VI. Los efectos o consecuencias que la decisión que se adopte pueda tener en el futuro de la persona adolescente, y " +
          " </p><br><p>" +
          "VII. La colaboración de las partes intervinientes para garantizar su desarrollo integral e integridad personal. " +
          " </p><br><p>" +
          "En todas las resoluciones se deberá dejar patente que el interés superior ha sido una consideración primordial, señalando la forma en la que se ha examinado y evaluado el interés superior y la importancia que se le ha atribuido en la decisión administrativa o judicial." +
          " </p><br><br><p>" +
          "<p><strong>Artículo 59. Derechos de las víctimas</strong>" +
          " </p><br><p>" +
          "Las víctimas u ofendidos por la realización de hechos señalados como delitos por las leyes penales federales y de las entidades federativas, tendrán todos los derechos reconocidos en la Constitución, el Código Nacional y demás legislación aplicable." +
          " </p><br><p>" +
          "La Comisión Ejecutiva de Atención a Víctimas y las comisiones ejecutivas de las entidades federativas, dentro de sus respectivos ámbitos de competencia, proporcionarán la asistencia, ayuda, atención y reparación integral a las víctimas en términos de la Ley General de Víctimas y demás legislación aplicable." +
          " </p><br><p>" +
          "<p><strong>Artículo 60. Reparación del daño a la víctima u ofendido</strong>" +
          " </p><br><p>" +
          "La persona adolescente tendrá la obligación de resarcir el daño causado a la víctima u ofendido, así como de restituir la cosa dañada por su conducta o entregar un valor sustituto. En todo caso, se procurará que el resarcimiento guarde relación directa con el hecho realizado, el bien jurídico lesionado y provenga del esfuerzo propio de la persona adolescente, sin que provoque un traslado de responsabilidad hacia su padre, madre, representante legal o a algún tercero." +
          " </p><br><p>" +
          "La restitución se podrá obtener de la siguiente forma:" +
          " </p><br><p>" +
          "      I.	Trabajo material encaminado en favor de la reparación directa del bien dañado;" +
          " </p><br><p>" +
          "      II.	Pago en dinero o en especie mediante los bienes, dinero o patrimonio del adolescente, y" +
          " </p><br><p>" +
          "      III.	Pago en dinero con cargo a los ingresos laborales o de trabajo del adolescente." +
          " </p><br><p>" +
          "Las medidas a que se refieren las fracciones anteriores se realizarán por el acuerdo de voluntades de las partes; el Ministerio Público Especializado en Adolescentes competente sancionará, en todos los casos, los mecanismos por el que se pretenda realizar la reparación del daño." +
          " </p><br><p>" +
          "El pago a la víctima u ofendido, podrá aplicarse con cargo al Fondo de Ayuda, Asistencia y Reparación Integral de la Comisión Ejecutiva de Atención a Víctimas o su similar en las entidades federativas, conforme a lo establecido por la Ley General de Víctimas y leyes correspondientes en las entidades federativas, respecto a la compensación subsidiaria." +
          " </p><br><br><p>";
        me.fila4 =
          "<p>Una vez que me fueron leídos y explicados mis derechos, los comprendo y recibo una copia de los mismos.</p><br><br><br><br>" +
          "<strong><p>NOMBRE DE LA VICTIMA</p><br><br><p>" +
          this.nombre +
          "</p><br><br><br><br>" +
          "<p>A T E N T A M E N T E.</p><br><br><br>" +
          this.nombreE +
          "<br><br>" +
          this.puestoE +
          "<br><br>" +
          "Adscrito al " +
          this.agenciaE +
          "</strong>";
        me.control = 3;
      } else if (
        (me.edad >= 18 &&
          me.rangoedad != "INFANCIA (0 A 5 AÑOS)" &&
          me.rangoedad != "NIÑEZ (6 A 12 AÑOS)" &&
          me.rangoedad != "ADOLECENCIA (13 A 17 AÑOS)" &&
          (me.tvictima === "Victima directa" ||
            me.tvictima === "Victima indirecta")) ||
        me.tvictima === "Testigo" ||
        me.tvictima === "Anonimo"
      ) {
        console.log("Entre a la cuarta condicion");
        me.fila1 =
          "<p>En este acto, esta representación social hace saber a la víctima (s) u ofendido (s)<strong>" +
          this.nombre +
          "</strong>" +
          " que el <strong>Artículo 20 apartado C de la Constitución Política de los Estados Unidos Mexicanos</strong> le otorga los siguientes derechos:</p><br><br>" +
          '<p class="ql-align-justify">I. Recibir asesoría jurídica; ser informado de los derechos que en su favor establece la Constitución y, cuando lo solicite, ser informado del desarrollo ' +
          "del procedimiento penal; </p><br><br><p>II. Coadyuvar con el Ministerio Público; a que se le reciban todos los datos o elementos de prueba con los que cuente, " +
          "tanto en la investigación como en el proceso, a que se desahoguen las diligencias correspondientes, y a intervenir en el juicio e interponer los recursos en los términos que prevea la ley." +
          " Cuando el Ministerio Público considere que no es necesario el desahogo de la diligencia, deberá fundar y motivar su negativa; </p><br><br><p>" +
          "III. Recibir, desde la comisión del delito, atención médica y psicológica de urgencia; </p><br><br><p>IV. Que se le repare el daño. En los casos en que sea procedente," +
          " el Ministerio Público estará obligado a solicitar la reparación del daño, sin menoscabo de que la víctima u ofendido lo pueda solicitar directamente, y el juzgador no podrá absolver" +
          " al sentenciado de dicha reparación si ha emitido una sentencia condenatoria. La ley fijará procedimientos ágiles para ejecutar las sentencias en materia de reparación del daño; </p>" +
          "<br><br><p>V. Al resguardo de su identidad y otros datos personales en los siguientes casos: cuando sean menores de edad; cuando se trate de delitos de violación, " +
          "trata de personas, secuestro o delincuencia organizada; y cuando a juicio del juzgador sea necesario para su protección, salvaguardando en todo caso los derechos de la defensa. " +
          "El Ministerio Público deberá garantizar la protección de víctimas, ofendidos, testigos y en general todos los sujetos que intervengan en el proceso. Los jueces deberán vigilar el" +
          " buen cumplimiento de esta obligación; </p><br><br><p>VI. Solicitar las medidas cautelares y providencias necesarias para la protección y restitución de sus derechos," +
          " y </p><br><br><p>VII. Impugnar ante autoridad judicial las omisiones del Ministerio Público en la investigación de los delitos, así como las resoluciones de reserva," +
          " no ejercicio, desistimiento de la acción penal o suspensión del procedimiento cuando no esté satisfecha la reparación del daño.</p><p><br></p>";

        me.fila2 =
          "<p>De igual forma se le hace saber que el artículo <strong>109 del Código Nacional de Procedimientos Penales</strong> le otorga los siguientes derechos:</p><br><br>" +
          "<p>I. A ser informado de los derechos que en su favor le reconoce la Constitución; </p><br><br>" +
          "<p>II. A que el Ministerio Público y sus auxiliares, así como el Órgano jurisdiccional le faciliten el acceso a la justicia y les presten los servicios que constitucionalmente" +
          " tienen encomendados con legalidad, honradez, lealtad, imparcialidad, profesionalismo, eficiencia y eficacia y con la debida diligencia;</p><br><br>" +
          "<p>III. A contar con información sobre los derechos que en su beneficio existan, como ser atendidos por personal del mismo sexo, o del sexo que la víctima elija," +
          " cuando así lo requieran y recibir desde la comisión del delito atención médica y psicológica de urgencia, así como asistencia jurídica a través de un Asesor jurídico; </p><br><br>" +
          "<p>IV. A comunicarse, inmediatamente después de haberse cometido el delito con un familiar, e incluso con su Asesor jurídico; </p><br><br>" +
          "<p>V. A ser informado, cuando así lo solicite, del desarrollo del procedimiento penal por su Asesor jurídico, el Ministerio Público y/o, en su caso, por el Juez o Tribunal; </p><br><br>" +
          "<p>VI. A ser tratado con respeto y dignidad; </p><br><br>" +
          "<p>VII. A contar con un Asesor jurídico gratuito en cualquier etapa del procedimiento, en los términos de la legislación aplicable; </p>" +
          "<p>VIII. A recibir trato sin discriminación a fin de evitar que se atente contra la dignidad humana y se anulen o menoscaben sus derechos y libertades, por lo que la protección de sus" +
          " derechos se hará sin distinción alguna; </p><br><br><p>IX. A acceder a la justicia de manera pronta, gratuita e imparcial respecto de sus denuncias o querellas; </p><br><br>" +
          "<p>X. A participar en los mecanismos alternativos de solución de controversias; </p><br><br>" +
          "<p>XI. A recibir gratuitamente la asistencia de un intérprete o traductor desde la denuncia hasta la conclusión del procedimiento penal, cuando la víctima u ofendido pertenezca " +
          "a un grupo étnico o pueblo indígena o no conozca o no comprenda el idioma español; </p><br><br>" +
          "<p>XII. En caso de tener alguna discapacidad, a que se realicen los ajustes al procedimiento penal que sean necesarios para salvaguardar sus derechos; </p><br><br>" +
          "<p>XIII. A que se le proporcione asistencia migratoria cuando tenga otra nacionalidad;&nbsp;</p>";

        me.fila3 =
          "<p>XIV. A que se le reciban todos los datos o elementos de prueba pertinentes con los que cuente, tanto en la investigación como en el proceso, a que se desahoguen las diligencias" +
          " correspondientes, y a intervenir en el juicio e interponer los recursos en los términos que establece este Código; </p><br><br><p>XV. A intervenir en todo el procedimiento por sí " +
          "o a través de su Asesor jurídico, conforme lo dispuesto en este Código; </p><br><br><p>XVI. A que se le provea protección cuando exista riesgo para su vida o integridad personal; </p><br><br>" +
          "<p>XVII. A solicitar la realización de actos de investigación que en su caso correspondan, salvo que el Ministerio Público considere que no es necesario, debiendo fundar y" +
          " motivar su negativa; </p><br><br><p>XVIII. A recibir atención médica y psicológica o a ser canalizado a instituciones que le proporcionen estos servicios," +
          " así como a recibir protección especial de su integridad física y psíquica cuando así lo solicite, o cuando se trate de delitos que así lo requieran; </p><br><br>" +
          "<p>XIX. A solicitar medidas de protección, providencias precautorias y medidas cautelares; </p><br><br><p>XX. A solicitar el traslado de la autoridad al lugar en donde se encuentre," +
          " para ser interrogada o participar en el acto para el cual fue citada, cuando por su edad, enfermedad grave o por alguna otra imposibilidad física o psicológica se dificulte su " +
          "comparecencia, a cuyo fin deberá requerir la dispensa, por sí o por un tercero, con anticipación; </p><br><br><p>XXI. A impugnar por sí o por medio de su representante, las omisiones" +
          " o negligencia que cometa el Ministerio Público en el desempeño de sus funciones de investigación, en los términos previstos en este Código y en las demás disposiciones legales aplicables;</p><br><br>" +
          "<p>XXII. A tener acceso a los registros de la investigación durante el procedimiento, así como a obtener copia gratuita de éstos, salvo que la información esté sujeta a reserva así determinada" +
          " por el Órgano jurisdiccional; </p><br><br><p>XXIII. A ser restituido en sus derechos, cuando éstos estén acreditados; </p><br><br><p>XXIV. A que se le garantice la reparación del daño durante" +
          " el procedimiento en cualquiera de las formas previstas en este Código;</p><br><br><p>XXV. A que se le repare el daño causado por la comisión del delito, pudiendo solicitarlo directamente al Órgano" +
          " jurisdiccional, sin perjuicio de que el Ministerio Público lo solicite; </p><br><br><p>XXVI. Al resguardo de su identidad y demás datos personales cuando sean menores de edad, se trate de delitos " +
          "de violación contra la libertad y el normal desarrollo psicosexual, violencia familiar, secuestro, trata de personas o cuando a juicio del Órgano jurisdiccional sea necesario para su protección, " +
          "salvaguardando en todo caso los derechos de la defensa; </p><br><br><p>XXVII. A ser notificado del desistimiento de la acción penal y de todas las resoluciones que finalicen el procedimiento," +
          " de conformidad con las reglas que establece este Código; </p><br><br><p>XXVIII. A solicitar la reapertura del proceso cuando se haya decretado su suspensión, y</p><br><br>" +
          "<p>XXIX. Los demás que establezcan este Código y otras leyes aplicables.</p>";

        (me.fila4 =
          "<p>Una vez que me fueron leídos y explicados mis derechos, los comprendo y recibo una copia de los mismos, firmando al calce.</p><br><br><br><br>" +
          "<b><p>NOMBRE DE LA VICTIMA</p><br><br><p><strong>" +
          this.nombre +
          "</strong></p><br><br><br><br>" +
          "<p>A T E N T A M E N T E.</p><br><br>" +
          this.nombreE +
          "<br><br>" +
          this.puestoE +
          "<br><br>" +
          "Adscrito al " +
          this.agenciaE +
          "</b>"),
          (me.control = 4);
      }

      me.mostrarpdf2(me.u_nombre, me.u_puesto, me.u_agencia);
      me.modaldocumento = false;
    },

    fechainif() {
      if (this.menu1) {
        this.generarfecha2();
        this.$refs.menu1.save(this.fechaentrevista);
      }
    },
    generarfecha2() {
      if (this.menu1)
        this.fechae =
          this.fechaentrevista.substring(8, 10) +
          " de " +
          this.obtenermes(this.fechaentrevista.substring(5, 7) - 1) +
          " del " +
          this.fechaentrevista.substring(0, 4);
    },
    mostrarpdf_vistaprevia(nombre, puesto, agencia) {
      let me = this;
      
      var dd = me.downloadPdf(me.u_nombre, me.u_puesto, me.u_agencia);
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.vfs;
      }
      var doc = pdfMake.createPdf(dd);
      var f = document.getElementById("iframepdf");
      var callback = async (url) => {
        this.base64pdf = url;
        this.canvasid = "canvaspdf"
        await this.renderPdfToCanvas(url.split(",")[1], "canvaspdf", this.numpage)
      }
      doc.getDataUrl(callback, doc);
      me.modaldocumento = true;
    },
    //nota mental
    mostrarpdf(nombre, puesto, agencia) 
    {
      let me = this;

      var dd = me.downloadPdf(nombre, puesto, agencia);

      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.vfs;
      }
      var doc = pdfMake.createPdf(dd);

      var callback = async (url) => {
        this.base64pdf = url;
        this.canvasid = "canvaspdf"
        await this.renderPdfToCanvas(url.split(",")[1], "canvaspdf", this.numpage)
        const result = await Swal.fire({
          title: '¿Este documento será firmado?',
          text: 'Una vez firmado no podrás modificarlo, a menos que vuelvas a imprimir.',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí, firmar',
          cancelButtonText: 'No'
        });

        if (result.isConfirmed) {
          try {
            const response = await firmarDocumento("https://drive.com", "12345", url, "ROJM980130");
            const pdfWindow = window.open(response[0]["DocFirmado"], '_blank');
            if (pdfWindow) {
              pdfWindow.focus();
              pdfWindow.print(); // puede que esto funcione dependiendo del navegador y headers del PDF
            }

          } catch (error) {
            console.log('Error al firmar:', error);
          }
        }
      }
      doc.getDataUrl(callback, doc);
    },

    downloadPdf(nombre, puesto, agencia) {
      console.log(this.datosProtegidos);

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
      var html = htmlToPdfmake(this.texto);
      var html2 = htmlToPdfmake(this.texto2);
      var html3 = htmlToPdfmake(this.texto3);

      var tipo;

      var titulo = "error";

      if (this.tipo2 == 1) {
        tipo = "DATOS DE LA VÍCTIMA U OFENDIDO";
        titulo =
          "ENTREVISTA A CARGO DEL (A) (DENUNCIANTE, VÍCTIMA U OFENDIDO)\n" +
          this.personaf +
          "\n\n\n";
      } else if (this.tipo2 == 2) {
        tipo = "DATOS DEL IMPUTADO";
        titulo = "COMPARECENCIA DE PERSONA INVESTIGADA";
      } else if (this.tipo2 == 3)
        titulo =
          "ENTREVISTA A CARGO DE LA VÍCTIMA MENOR DE EDAD DE INICIALES\n" +
          this.inicialesf +
          "\n\n\n";
      else if (this.tipo2 == 4) titulo = "COMPARECENCIA DE PERSONA INVESTIGADA";
      else if (this.tipo2 == 5) {
        tipo = "DATOS DEL TESTIGO";
        titulo =
          "ENTREVISTA TESTIMONIAL A CARGO DEL \n" + this.personaf + "\n\n\n";
      } else if (this.tipo2 == 6) {
        titulo =
          "ENTREVISTA TESTIMONIAL DEL MENOR (NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
          this.inicialesf +
          "\n\n\n";
      } else if (this.tipo2 == 7) {
        tipo = "DATOS DEL DENUNCIANTE";
        titulo =
          "ENTREVISTA A CARGO DEL (A) (DENUNCIANTE, VÍCTIMA U OFENDIDO) \n" +
          this.personaf +
          "\n\n\n";
      } else if (this.tipo2 == 8) {
        titulo =
          "ENTREVISTA TESTIMONIAL DEL MENOR (NIÑA, NIÑO O ADOLESCENTE) DE INICIALES " +
          this.inicialesf +
          "\n\n\n";
      }

      //***************************************************************************** */
      var agenciainfodr = this.agenciainfo["direccion"];
      var agenciainfotel = this.agenciainfo["telefono"];

      //***************************************************************************** */
      let me = this;
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
            text: "\n\n" + titulo,
            style: "Titulo",
            alignment: "center",
          },
          this.tipo2 == 1 || this.tipo2 == 5 || this.tipo2 == 7
            ? {
                text: html,
                style: "Texto",
              }
            : "",
          this.tipo2 == 1 || this.tipo2 == 5 || this.tipo2 == 7
            ? {
                text: html2,
                style: "Texto",
              }
            : "",
          (this.tipo2 == 1 || this.tipo2 == 5 || this.tipo2 == 7) &&
          this.tipopersona == "Fisica"
            ? {
                style: "table",
                table: {
                  headerRows: 1,
                  widths: ["*", "auto", "auto"],
                  body: [
                    [
                      {
                        colSpan: 3,
                        text: tipo,
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
                        text:
                          "Clasificación de persona:" +
                          "\n\n" +
                          this.clasificacionPersona,
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        text: "Tipo persona:" + "\n\n" + this.tipopersona,
                      },
                      {
                        style: "Texto",
                        text:
                          "CURP:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.curp),
                      },
                      {
                        style: "Texto",
                        text:
                          "Documento de identificación:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.docIdentificacion),
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        text:
                          "Nacionalidad:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.nacionalidad),
                      },
                      {
                        style: "Texto",
                        text:
                          "Teléfono(s):" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.tel),
                      },
                      {
                        style: "Texto",
                        text:
                          "Correo electrónico:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.email),
                      },
                    ],
                    [
                      {
                        colSpan: 3,
                        text:
                          "Dirección:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.direccionpersonal),
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
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.genero),
                      },
                      {
                        style: "Texto",
                        text:
                          "Sexo" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.sexo),
                      },
                      {
                        style: "Texto",
                        text:
                          "Edad:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.edad === 999
                            ? ""
                            : this.edad),
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        text:
                          "Autoriza medio de notificación:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.medionotificacion),
                      },
                      {
                        style: "Texto",
                        text:
                          "Ocupación:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.ocupacion),
                      },
                      {
                        style: "Texto",
                        text:
                          "Nivel estudios:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.nivelestudio),
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        text:
                          "Religión:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.religion),
                      },
                      {
                        style: "Texto",
                        text:
                          "Idioma  o lengua que habla:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.lengua),
                      },
                      {
                        style: "Texto",
                        text:
                          "Estado familiar:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.estadocivil),
                      },
                    ],
                    [
                      {
                        colSpan: 3,
                        text:
                          "Tiene alguna discapacidad:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.discapacidad
                            ? this.tipodiscapacidad
                            : "Ninguna"),
                        style: "Texto",
                      },
                      "",
                    ],
                    [
                      {
                        colSpan: 3,
                        text:
                          "Manifiesta desaparición forzada de personas:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.verR
                            ? "Autoriza registro nacional de personas desaparecidaso no localizadas"
                            : "No") +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.verI
                            ? "Autoriza que la información sea pública con fines de busqueda, localización e identificación"
                            : ""),
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
              }
            : "",

          (this.tipo2 == 1 || this.tipo2 == 5 || this.tipo2 == 7) &&
          this.tipopersona == "Moral"
            ? {
                style: "table",
                table: {
                  headerRows: 1,
                  widths: ["*", "auto", "auto"],
                  body: [
                    [
                      {
                        colSpan: 3,
                        text: tipo,
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
                          "Razón social" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.razonsocial),
                      },
                      {
                        style: "Texto",
                        text:
                          "RFC:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.rfc),
                      },
                      {
                        style: "Texto",
                        text:
                          "Documento que acredita al apoderado:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.docacredita),
                      },
                    ],
                    [
                      { style: "Texto", text: "Nombre" + "\n\n" + this.nombre },
                      { style: "Texto", text: "Alias:" + "\n\n" + this.alias },
                      {
                        style: "Texto",
                        text:
                          "Clasificación de persona:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.clasificacionPersona),
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        text:
                          "Tipo persona:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.tipopersona),
                      },
                      {
                        style: "Texto",
                        text:
                          "CURP:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.curp),
                      },
                      {
                        style: "Texto",
                        text:
                          "Documento de identificación:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.docIdentificacion),
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        text:
                          "Nacionalidad:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.nacionalidad),
                      },
                      {
                        style: "Texto",
                        text:
                          "Teléfono(s):" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.tel),
                      },
                      {
                        style: "Texto",
                        text:
                          "Correo electrónico:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.email),
                      },
                    ],

                    [
                      {
                        colSpan: 3,
                        text:
                          "Dirección:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.direccionpersonal),
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
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.genero),
                      },
                      {
                        style: "Texto",
                        text:
                          "Sexo" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.sexo),
                      },
                      {
                        style: "Texto",
                        text:
                          "Edad:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.edad === 999
                            ? ""
                            : this.edad),
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        text:
                          "Autoriza medio de notificación:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.medionotificacion),
                      },
                      {
                        style: "Texto",
                        text:
                          "Ocupación:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.ocupacion),
                      },
                      {
                        style: "Texto",
                        text:
                          "Nivel estudios:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.nivelestudio),
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        text:
                          "Religión:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.religion),
                      },
                      {
                        style: "Texto",
                        text:
                          "Idioma  o lengua que habla:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.lengua),
                      },
                      {
                        style: "Texto",
                        text:
                          "Estado familiar:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.estadocivil),
                      },
                    ],
                    [
                      {
                        colSpan: 3,
                        text:
                          "Tiene alguna discapacidad:" +
                          "\n\n" +
                          (this.datosProtegidos || this.discapacidad
                            ? "Datos Protegidos"
                            : this.tipodiscapacidad),
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
              }
            : "",

          this.tipo2 == 1 || this.tipo2 == 5 || this.tipo2 == 7
            ? {
                text: html3,
                style: "Texto",
              }
            : "",

          //----------------------------------------------------------------------------
          this.tipo2 == 2
            ? {
                text: html,
                style: "Texto",
              }
            : "",
          this.tipo2 == 2 && this.tipopersona == "Fisica"
            ? {
                style: "table",
                table: {
                  headerRows: 1,
                  widths: ["*", "auto", "auto"],
                  body: [
                    [
                      {
                        style: "Titulo",
                        colSpan: 3,
                        text: tipo,
                        fillColor: "#eeeeee",
                        fontSize: 12,
                        bold: true,
                        alignment: "center",
                      },
                      "",
                      "",
                    ],
                    [
                      { style: "Texto", text: "Nombre" + "\n\n" + this.nombre },
                      { style: "Texto", text: "Alias:" + "\n\n" + this.alias },
                      {
                        style: "Texto",
                        text:
                          "Clasificación de persona:" +
                          "\n\n" +
                          this.clasificacionPersona,
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        text: "Tipo persona:" + "\n\n" + this.tipopersona,
                      },
                      {
                        style: "Texto",
                        text:
                          "CURP:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.curp),
                      },
                      {
                        style: "Texto",
                        text:
                          "Documento de identificación:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.docIdentificacion),
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        text:
                          "Nacionalidad:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.nacionalidad),
                      },
                      {
                        style: "Texto",
                        text:
                          "Teléfono(s):" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.tel),
                      },
                      {
                        style: "Texto",
                        text:
                          "Correo electrónico:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.email),
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        colSpan: 3,
                        text:
                          "Dirección:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.direccionpersonal),
                      },
                      "",
                    ],
                    [
                      {
                        style: "Texto",
                        text:
                          "Género:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.genero),
                      },
                      {
                        style: "Texto",
                        text:
                          "Sexo" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.sexo),
                      },
                      {
                        style: "Texto",
                        text:
                          "Edad:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.edad === 999
                            ? ""
                            : this.edad),
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        text:
                          "Autoriza medio de notificación:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.medionotificacion),
                      },
                      {
                        style: "Texto",
                        text:
                          "Ocupación:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.ocupacion),
                      },
                      {
                        style: "Texto",
                        text:
                          "Nivel estudios:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.nivelestudio),
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        text:
                          "Religión:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.religion),
                      },
                      {
                        style: "Texto",
                        text:
                          "Idioma  o lengua que habla:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.lengua),
                      },
                      {
                        style: "Texto",
                        text:
                          "Estado familiar:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.estadocivil),
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        colSpan: 3,
                        text:
                          "Tiene alguna discapacidad:" +
                          "\n\n" +
                          (this.datosProtegidos || this.discapacidad
                            ? "Datos Protegidos"
                            : this.tipodiscapacidad),
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
              }
            : "",
          this.tipo2 == 2 && this.tipopersona == "Moral"
            ? {
                style: "table",
                table: {
                  headerRows: 1,
                  widths: ["*", "auto", "auto"],
                  body: [
                    [
                      {
                        style: "Titulo",
                        colSpan: 3,
                        text: tipo,
                        fillColor: "#eeeeee",
                        fontSize: 12,
                        bold: true,
                        alignment: "center",
                      },
                      "",
                      "",
                    ],
                    [
                      {
                        style: "Texto",
                        text:
                          "Razón social" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.razonsocial),
                      },
                      {
                        style: "Texto",
                        text:
                          "RFC:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.rfc),
                      },
                      {
                        style: "Texto",
                        text:
                          "Documento que acredita al apoderado:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.docacredita),
                      },
                    ],

                    [
                      { style: "Texto", text: "Nombre" + "\n\n" + this.nombre },
                      { style: "Texto", text: "Alias:" + "\n\n" + this.alias },
                      {
                        style: "Texto",
                        text:
                          "Clasificación de persona:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.clasificacionPersona),
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        text:
                          "Tipo persona:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.tipopersona),
                      },
                      {
                        style: "Texto",
                        text:
                          "CURP:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.curp),
                      },
                      {
                        style: "Texto",
                        text:
                          "Documento de identificación:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.docIdentificacion),
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        text:
                          "Nacionalidad:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.nacionalidad),
                      },
                      {
                        style: "Texto",
                        text:
                          "Teléfono(s):" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.tel),
                      },
                      {
                        style: "Texto",
                        text:
                          "Correo electrónico:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.email),
                      },
                    ],

                    [
                      {
                        colSpan: 3,
                        text:
                          "Dirección:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.direccionpersonal),
                      },
                      "",
                    ],
                    [
                      {
                        style: "Texto",
                        text:
                          "Género:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.genero),
                      },
                      {
                        style: "Texto",
                        text:
                          "Sexo" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.sexo),
                      },
                      {
                        style: "Texto",
                        text:
                          "Edad:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.edad === 999
                            ? ""
                            : this.edad),
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        text:
                          "Autoriza medio de notificación:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.medionotificacion),
                      },
                      {
                        style: "Texto",
                        text:
                          "Ocupación:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.ocupacion),
                      },
                      {
                        style: "Texto",
                        text:
                          "Nivel estudios:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.nivelestudio),
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        text:
                          "Religión:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.religion),
                      },
                      {
                        style: "Texto",
                        text:
                          "Idioma  o lengua que habla:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.lengua),
                      },
                      {
                        style: "Texto",
                        text:
                          "Estado familiar:" +
                          "\n\n" +
                          (this.datosProtegidos
                            ? "Datos Protegidos"
                            : this.estadocivil),
                      },
                    ],
                    [
                      {
                        style: "Texto",
                        colSpan: 3,
                        text:
                          "Tiene alguna discapacidad:" +
                          "\n\n" +
                          (this.datosProtegidos || this.discapacidad
                            ? "Datos Protegidos"
                            : this.tipodiscapacidad),
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
              }
            : "",
          this.tipo2 == 2
            ? {
                text: html2,
                style: "Texto",
              }
            : "",

          //----------------------------------------------------------------

          this.tipo2 == 3
            ? {
                text: html,
                style: "Texto",
              }
            : "",
          this.tipo2 == 3
            ? {
                text: html2,
                style: "Texto",
              }
            : "",

          //---------------------------------------------------------------

          this.tipo2 == 4
            ? {
                text: html,
                style: "Texto",
              }
            : "",

          this.tipo2 == 6
            ? {
                text: html,
                style: "Texto",
              }
            : "",
          this.tipo2 == 6
            ? {
                text: html2,
                style: "Texto",
                margin: [30, 0, 0, 0],
              }
            : "",
          this.tipo2 == 6
            ? {
                text: html3,
                style: "Texto",
              }
            : "",

          this.tipo2 == 8
            ? {
                text: html,
                style: "Texto",
              }
            : "",
          this.tipo2 == 8
            ? {
                text: html2,
                style: "Texto",
                margin: [30, 0, 0, 0],
              }
            : "",
          this.tipo2 == 8
            ? {
                text: html3,
                style: "Texto",
              }
            : "",

          this.tipo2 == 1 || this.tipo2 == 2
            ? {
                text:
                  "\n\n\n\n\nCOMPARECIENTE\n\n" + this.personaf + "\n\n\n\n",
                alignment: "justify",
                style: "DePara",
              }
            : "",
          this.tipo2 == 3
            ? {
                text:
                  "\n\n\n\nINICIALES VICTIMA\n\n" +
                  this.inicialesf +
                  "\n\n" +
                  this.acnombre +
                  "\n\n" +
                  this.acvictima +
                  "\n\n\n",
                alignment: "justify",
                style: "DePara",
              }
            : "",
          this.tipo2 == 4
            ? {
                text:
                  "\n\n\n\n" +
                  this.inicialesf +
                  "\n\n" +
                  "COMPARECIENTE" +
                  "\n\n",
                alignment: "justify",
                style: "DePara",
              }
            : "",
          this.tipo2 == 4
            ? {
                text: this.acnombre + "\n\n" + this.acvictima + "\n\n\n",
                alignment: "justify",
                style: "DePara",
              }
            : "",

          this.tipo2 == 6
            ? {
                text: "\n\n\n" + this.inicialesf + "\n" + "TESTIGO" + "\n\n\n",
                alignment: "right",
                style: "DePara",
              }
            : "",

          this.tipo2 == 6
            ? {
                text:
                  "\n\n\nLIC." +
                  this.representantei +
                  "\n" +
                  "Representante Coadyuvante" +
                  "\n\n\n",
                alignment: "left",
                style: "DePara",
              }
            : "",

          this.tipo2 == 6
            ? {
                text:
                  "\n\n\nLIC." + this.psimenor + "\n" + "Psicóloga" + "\n\n\n",
                alignment: "right",
                style: "DePara",
              }
            : "",

          this.tipo2 == 6
            ? {
                text:
                  "\n\n\n" +
                  this.acnombre +
                  "\n" +
                  "Padre del testigo" +
                  "\n\n\n",
                alignment: "left",
                style: "DePara",
              }
            : "",

          this.tipo2 == 8
            ? {
                text:
                  "\n\n\n" + this.inicialesf + "\n" + "DENUNCIANTE" + "\n\n\n",
                alignment: "right",
                style: "DePara",
              }
            : "",

          this.tipo2 == 8
            ? {
                text:
                  "\n\n\nLIC." +
                  this.representantei +
                  "\n" +
                  "Representante Coadyuvante" +
                  "\n\n\n",
                alignment: "left",
                style: "DePara",
              }
            : "",

          this.tipo2 == 8
            ? {
                text:
                  "\n\n\nLIC." + this.psimenor + "\n" + "Psicóloga" + "\n\n\n",
                alignment: "right",
                style: "DePara",
              }
            : "",

          this.tipo2 == 8
            ? {
                text:
                  "\n\n\n" +
                  this.acnombre +
                  "\n" +
                  "Padre del testigo" +
                  "\n\n\n",
                alignment: "left",
                style: "DePara",
              }
            : "",

          {
            text: this.representantesf + "\n\n\n\n",
            style: "DePara",
            alignment: "center",
          },

          this.tipo2 == 3
            ? {
                text:
                  "\n\n" + this.psimenor + "\n\n" + this.puestopsi + "\n\n\n\n",
                alignment: "left",
                style: "DePara",
              }
            : "",

          this.tipo2 == 5
            ? {
                text:
                  "\n\n\n\n" + this.personaf + "\n\n" + "TESTIGO" + "\n\n\n\n",
                alignment: "justify",
                style: "DePara",
              }
            : "",

          this.tipo2 == 7
            ? {
                text:
                  "\n\n\n\n" +
                  this.personaf +
                  "\n\n" +
                  "DENUNCIANTE" +
                  "\n\n\n\n",
                alignment: "justify",
                style: "DePara",
              }
            : "",

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
            //color: COLOR_TEXTO_PIE_PAGINA,
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
    //nota mental lectura de derechos
    mostrarpdf2(nombre, puesto, agencia)
    {
      let me = this;

      var dd = me.downloadPdf2(nombre, puesto, agencia);

      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.vfs;
      }
      var doc = pdfMake.createPdf(dd);
      var callback = async (url) => {
        const result = await Swal.fire({
          title: '¿Este documento será firmado?',
          text: 'Una vez firmado no podrás modificarlo, a menos que vuelvas a imprimir.',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí, firmar',
          cancelButtonText: 'No'
        });

        if (result.isConfirmed) {
          try {
            const response = await firmarDocumento("https://drive.com", "12345", url, "ROJM980130");
            const pdfWindow = window.open(response[0]["DocFirmado"], '_blank');
            if (pdfWindow) {
              pdfWindow.focus();
              pdfWindow.print(); // puede que esto funcione dependiendo del navegador y headers del PDF
            }

          } catch (error) {
            console.log('Error al firmar:', error);
          }
        } else {

        }

      };
      doc.getDataUrl(callback, doc);
    },


    downloadPdf2(nombre, puesto, agencia) {
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
      var diragencia = this.direccionAgencia;
      var telagencia = this.telefonosAgencia;
      var date = moment(this.fechaelevanuc, "YYYY-MM-DD HH:mm:ss");
      var mifecha = this.fechaS;
      console.log();
      var mihora = this.horaS;
      /*var date = moment(this.fechasuceso, 'YYYY-MM-DD HH:mm:ss');*/
      var dia = moment(date).format("DD");
      var mes = moment(date).format("MMMM");
      var año = moment(date).format("YYYY");
      var hr = moment(date).format("h:mm:ss a");
      var fecha = dia + " de " + mes + " del " + año + ", " + hr;
      var nuc = this.nuc;
      //***************************************************************************** */
      var html = htmlToPdfmake(this.texto);
      var html_textofila1 = htmlToPdfmake(this.fila1);
      var html_textofila2 = htmlToPdfmake(this.fila2);
      var html_textofila3 = htmlToPdfmake(this.fila3);
      var html_textofila4 = htmlToPdfmake(this.fila4);
      var control;
      console.log(this.control);
      console.log(this.tipo2);

      if (this.control == 1)
        control = "ACTA DE LECTURA DE DERECHOS DEL IMPUTADO";
      else if (this.control == 2)
        control = "ACTA DE LECTURA DE DERECHOS DEL IMPUTADO ADOLESCENTE";
      else if (this.control == 3)
        control = "ACTA DE LECTURA DE DERECHOS DE LA VÍCTIMA MENOR DE EDAD";
      else if (this.control == 4)
        control = "ACTA DE LECTURA DE DERECHOS DE LA VÍCTIMA U OFENDIDO";

      //***************************************************************************** */
      var agenciainfodr = this.agenciainfo["direccion"];
      var agenciainfotel = this.agenciainfo["telefono"];

      //***************************************************************************** */

      let me = this;
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
            text: "Número Único de Caso: " + nuc,
            style: "Titulo",
            alignment: "right",
            margin: [0, 40, 72, 0],
            absolutePosition: { x: 85, y: 150 },
          },
          "\n\n\n",
          {
            text: control,
            style: "Titulo",
          },
          "\n\n",
          this.control == 1
            ? {
                style: "table",
                table: {
                  headerRows: 0,
                  widths: ["*", "auto"],
                  body: [
                    [
                      {
                        colSpan: 2,
                        text:
                          "Fecha: " +
                          this.u_distrito +
                          " , Hidalgo a " +
                          mifecha +
                          "  Hora: " +
                          mihora,
                        style: "Texto",
                      },
                      "",
                    ],
                    [
                      {
                        colSpan: 2,
                        text: "Lugar en que se practica:",
                        style: "Texto",
                      },
                      "",
                    ],
                    [{ colSpan: 2, text: html_textofila1, style: "Texto" }, ""],
                    [{ colSpan: 2, text: html_textofila2, style: "Texto" }, ""],
                    [{ colSpan: 2, image: me.qrCode, alignment: 'center', width: 200,margin: [0, 15, 0, 15]}, ""],
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
              }
            : "",
          this.control == 2
            ? {
                style: "table",
                table: {
                  headerRows: 0,
                  widths: ["*", "auto"],
                  body: [
                    [
                      {
                        colSpan: 2,
                        text:
                          "Fecha: " +
                          this.u_distrito +
                          " , Hidalgo a " +
                          mifecha +
                          "  Hora: " +
                          mihora,
                        style: "Texto",
                      },
                      "",
                    ],
                    [
                      {
                        colSpan: 2,
                        text: "Lugar en que se practica:",
                        style: "Texto",
                      },
                      "",
                    ],
                    [{ colSpan: 2, text: html_textofila1, style: "Texto" }, ""],
                    [{ colSpan: 2, text: html_textofila2, style: "Texto" }, ""],
                    [{ colSpan: 2, image: me.qrCode, alignment: 'center', width: 200,margin: [0, 15, 0, 15]}, ""],
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
              }
            : "",
          this.control == 3
            ? {
                style: "table",
                table: {
                  headerRows: 0,
                  widths: ["*", "auto"],
                  body: [
                    [
                      {
                        colSpan: 2,
                        text:
                          "Fecha: " +
                          this.u_distrito +
                          " , Hidalgo a " +
                          mifecha +
                          "  Hora: " +
                          mihora,
                        style: "Texto",
                      },
                      "",
                    ],
                    [
                      {
                        colSpan: 2,
                        text: "Lugar en que se practica:",
                        style: "Texto",
                      },
                      "",
                    ],
                    [{ colSpan: 2, text: html_textofila1, style: "Texto" }, ""],
                    [{ colSpan: 2, text: html_textofila2, style: "Texto" }, ""],
                    [{ colSpan: 2, text: html_textofila3, style: "Texto" }, ""],
                    [{ colSpan: 2, text: html_textofila4, style: "Texto" }, ""],
                    [{ colSpan: 2, image: me.qrCode, alignment: 'center', width: 200,margin: [0, 15, 0, 15]}, ""],
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
              }
            : "",
          this.control == 4
            ? {
                style: "table",
                table: {
                  headerRows: 0,
                  widths: ["*", "auto"],
                  body: [
                    [
                      {
                        colSpan: 2,
                        text:
                          "Fecha: " +
                          this.u_distrito +
                          " , Hidalgo a " +
                          mifecha +
                          "  Hora: " +
                          mihora,
                        style: "Texto",
                      },
                      "",
                    ],
                    [
                      {
                        colSpan: 2,
                        text: "Lugar en que se practica:",
                        style: "Texto",
                      },
                      "",
                    ],
                    [{ colSpan: 2, text: html_textofila1, style: "Texto" }, ""],
                    [{ colSpan: 2, text: html_textofila2, style: "Texto" }, ""],
                    [{ colSpan: 2, text: html_textofila3, style: "Texto" }, ""],
                    [{ colSpan: 2, text: html_textofila4, style: "Texto" }, ""],
                    [{ colSpan: 2, image: me.qrCode, alignment: 'center', width: 200,margin: [0, 15, 0, 15]}, ""],
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
  },
};
</script>

<style>
.espaciado {
  padding: 30px !important;
}
</style>
