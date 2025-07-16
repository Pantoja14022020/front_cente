<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Citatorios</v-toolbar-title
        >

        <v-divider class="mx-2" inset vertical></v-divider>

        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-flex xs12 sm6 md3>
          <v-text-field
            class="font-weight-regular"
            v-model="nuc"
            disabled
            prepend-icon="folder"
            filled
          ></v-text-field>
        </v-flex>
        <v-btn
          class="mx-2 pt-2"
          @click="cerrarcarpeta"
          fab
          dark
          small
          color="primary"
        >
           <v-icon class="mt-1" dark>close</v-icon>
        </v-btn>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              class="mx-2 pt-2"
              slot="activator"
              v-on="on"
              @click="agregar()"
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
        :items="detenidos"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.uModulo }}</td>
          <td>{{ props.item.usuario }}</td>
          <td>
            {{
              props.item.fechaCitacion2.substring(8, 10) +
              " de " +
              obtenermes(props.item.fechaCitacion2.substring(5, 7) - 1) +
              " del " +
              props.item.fechaCitacion2.substring(0, 4)
            }}
          </td>

          <td>
            <div v-if="props.item.tipo == 1">
              <span class>A presentarse en el MP</span>
            </div>
            <div v-else-if="props.item.tipo == 2">
              <span class>A presentarse en Juzgado</span>
            </div>
            <div v-else-if="props.item.tipo == 3">
              <span class>Citatorio a peritos</span>
            </div>
            <div v-else-if="props.item.tipo == 4">
              <span class>Citatorio a policía</span>
            </div>
            <div v-else-if="props.item.tipo == 5">
              <span class>Citatorio peritos a juzgado</span>
            </div>
            <div v-else-if="props.item.tipo == 6">
              <span class>Citatorio policía a juzgado</span>
            </div>
          </td>

          <td>
            {{
              props.item.fechaCitacion.substring(8, 10) +
              " de " +
              obtenermes(props.item.fechaCitacion.substring(5, 7) - 1) +
              " del " +
              props.item.fechaCitacion.substring(0, 4) +
              ", " +
              props.item.fechaCitacion.substring(11, 19)
            }}
          </td>
          <td class="justify-center layout px-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2"
                  v-on="on"
                  color="warning"
                  @click="imprimir(props.item)"
                >
                  print
                </v-icon>
              </template>
              <span>Re Imprimir</span>
            </v-tooltip>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>

      <v-dialog
        v-model="dialogo"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registrar Citatorios</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                v-if="tcita.value == 1"
                color="success"
                text
                @click="generarpdf()"
                >Vista previa</v-btn
              >
              <v-btn
                v-if="tcita.value == 2"
                color="success"
                text
                @click="generarpdf2()"
                >Vista previa</v-btn
              >
              <v-btn
                v-if="tcita.value == 3"
                color="success"
                text
                @click="generarpdf3()"
                >Vista previa</v-btn
              >
              <v-btn
                v-if="tcita.value == 4"
                color="success"
                text
                @click="generarpdf4()"
                >Vista previa</v-btn
              >
              <v-btn
                v-if="tcita.value == 5"
                color="success"
                text
                @click="generarpdf5()"
                >Vista previa</v-btn
              >
              <v-btn
                v-if="tcita.value == 6"
                color="success"
                text
                @click="generarpdf6()"
                >Vista previa</v-btn
              >
              <v-btn icon @click="dialogo = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex class="espaciado" xs12 sm12 md6 lg6>
                <v-select
                  name="tipo citatorio"
                  :items="tipocitatorio"
                  v-model="tcita"
                  v-validate="'required'"
                  label="*Tipo de citatorio:"
                  return-object
                  @change="controlnum = tcita.value"
                  :error-messages="errors.collect('tipo citatorio')"
                >
                </v-select>

                <v-text-field
                  name="causas penal"
                  label="*Causa penal:"
                  v-model="causapenal"
                  v-validate="'required'"
                  :error-messages="errors.collect('causas penal')"
                >
                </v-text-field>

                <v-text-field
                  name="causas penal jo"
                  label="*Causa penal J.O:"
                  v-model="causapenaljo"
                  v-validate="'required'"
                  v-if="
                    tcita.value == 3 ||
                    tcita.value == 4 ||
                    tcita.value == 5 ||
                    tcita.value == 6
                  "
                  :error-messages="errors.collect('causas penal jo')"
                >
                </v-text-field>

                <v-autocomplete
                  name="destinatario"
                  :items="personas"
                  v-model="persona"
                  label="*Destinatario:"
                  v-validate="'required'"
                  return-object
                  v-if="tcita.value == 1 || tcita.value == 2"
                  @change="obtenerdireccion()"
                  :error-messages="errors.collect('destinatario')"
                >
                </v-autocomplete>

                <v-autocomplete
                  name="distrito"
                  :items="distritos"
                  v-model="distrito"
                  label="*Distrito:"
                  v-validate="'required'"
                  return-object
                  @change="obtenerjuzgado()"
                  v-if="
                    tcita.value == 2 || tcita.value == 5 || tcita.value == 6
                  "
                  :error-messages="errors.collect('distrito')"
                >
                </v-autocomplete>

                <v-text-field
                  name="medida de apremio"
                  v-model="multa"
                  label="*Medida de apremio:"
                  v-validate="'required'"
                  return-object
                  v-if="
                    tcita.value == 1 ||
                    tcita.value == 3 ||
                    tcita.value == 5 ||
                    tcita.value == 6
                  "
                  :error-messages="errors.collect('medida de apremio')"
                >
                </v-text-field>

                <v-autocomplete
                  name="imputados"
                  :items="imputados"
                  v-model="imputado"
                  label="*Nombre del imputado:"
                  v-validate="'required'"
                  return-object
                  v-if="
                    tcita.value == 3 ||
                    tcita.value == 4 ||
                    tcita.value == 5 ||
                    tcita.value == 6
                  "
                  :error-messages="errors.collect('imputados')"
                >
                </v-autocomplete>

                <v-menu
                  ref="menu3"
                  v-model="menu3"
                  :close-on-content-click="false"
                  :return-value.sync="fechadocumento"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      name="fecha de generación"
                      :value="fechad"
                      label="*Fecha de generación:"
                      prepend-icon="event"
                      clearable
                      readonly
                      v-on="on"
                      v-validate="'required'"
                      :error-messages="errors.collect('fecha de generación')"
                    >
                      ></v-text-field
                    >
                  </template>
                  <v-date-picker v-model="fechadocumento" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu3 = false"
                      >Cancel</v-btn
                    >
                    <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>

              <v-flex class="espaciado" xs12 sm12 md6 lg6>
                <v-text-field
                  name="número de oficio"
                  label="*Número de oficio:"
                  v-model="numoficio"
                  v-validate="'required'"
                  :error-messages="errors.collect('número de oficio')"
                >
                </v-text-field>

                <v-select
                  name="delitos"
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
                  :error-messages="errors.collect('delitos')"
                >
                </v-select>

                <v-text-field
                  name="puestos"
                  label="*Cargo a quien va dirigido:"
                  v-model="puesto"
                  v-validate="'required'"
                  v-if="
                    tcita.value == 3 ||
                    tcita.value == 4 ||
                    tcita.value == 5 ||
                    tcita.value == 6
                  "
                  :error-messages="errors.collect('puestos')"
                >
                </v-text-field>

                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :return-value.sync="fechacomparecencia"
                  transition="scale-transition"
                  offset-y
                  v-if="
                    tcita.value == 1 ||
                    tcita.value == 3 ||
                    tcita.value == 4 ||
                    tcita.value == 5 ||
                    tcita.value == 6
                  "
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="fechac"
                      label="Fecha a citar:"
                      prepend-icon="event"
                      clearable
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="fechacomparecencia"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu1 = false"
                      >Cancel</v-btn
                    >
                    <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                  </v-date-picker>
                </v-menu>
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="hora"
                  transition="scale-transition"
                  offset-y
                  v-if="
                    tcita.value == 1 ||
                    tcita.value == 3 ||
                    tcita.value == 4 ||
                    tcita.value == 5 ||
                    tcita.value == 6
                  "
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="hora"
                      label="Hora:"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="hora"
                    full-width
                    @click:minute="$refs.menu2.save(hora)"
                  ></v-time-picker>
                </v-menu>

                <v-autocomplete
                  name="juzgados"
                  :items="juzgados"
                  v-model="juzgado"
                  label="*Juzgados:"
                  v-validate="'required'"
                  return-object
                  v-if="
                    tcita.value == 2 || tcita.value == 5 || tcita.value == 6
                  "
                  :error-messages="errors.collect('juzgados')"
                >
                </v-autocomplete>
              </v-flex>
              <v-flex
                v-if="
                  tcita.value == 3 ||
                  tcita.value == 4 ||
                  tcita.value == 5 ||
                  tcita.value == 6
                "
                class="espaciado"
                xs12
                sm12
                md12
                lg12
              >
                <v-card elevation="0">
                  <v-card-title class="accent"
                    ><h3>Nombre de las personas a citar</h3></v-card-title
                  >
                  <v-card-text>
                    <vue-editor
                      name="nombre peritos"
                      v-model="peritos"
                      :editorToolbar="customToolbar"
                      :error-messages="errors.collect('nombre peritos')"
                    >
                    </vue-editor>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex
                v-if="tcita.value == 1 || tcita.value == 3 || tcita.value == 4"
                class="espaciado"
                xs12
                sm12
                md12
                lg12
              >
                <v-card elevation="0">
                  <v-card-title class="accent"
                    ><h3>Motivo de citación</h3></v-card-title
                  >
                  <v-card-text>
                    <vue-editor
                      name="explicaciones"
                      v-model="explicacion"
                      :editorToolbar="customToolbar"
                      :error-messages="errors.collect('explicaciones')"
                    >
                    </vue-editor>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex
                v-if="
                  tcita.value == 1 ||
                  tcita.value == 3 ||
                  tcita.value == 4 ||
                  tcita.value == 5 ||
                  tcita.value == 6
                "
                class="espaciado"
                xs12
                sm12
                md12
                lg12
              >
                <v-card elevation="0">
                  <v-card-title class="accent"
                    ><h3>Fundamente medida de apremio</h3></v-card-title
                  >
                  <v-card-text>
                    <vue-editor
                      name="fracciones"
                      v-model="fraccion"
                      :editorToolbar="customToolbar"
                      :error-messages="errors.collect('fracciones')"
                    >
                    </vue-editor>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
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
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn color="success" text @click.native="guardar()"
                >Guardar citatorio</v-btn
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
            ></iframe>-->
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import VeeValidate from "vee-validate";
import moment from "moment";
import "moment/locale/es";
import alertify from "alertifyjs";
import { VueEditor } from "vue2-editor";
import n401 from './401.vue';
import n403 from './403.vue';
import { error } from "util";
import QRCode from "qrcode";
import Swal from 'sweetalert2'
import { generarQRCodeBase64 } from './crearQR';
import { firmarDocumento } from "../../helpers/efirma";

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
    dialogoeditor: false,
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
    dialogo: false,
    agenciainfo: [],
    agenciaid: "",
    numoficio: "",
    nombreenc: "",
    delitos: [],
    direccion: [],
    delito: "",
    direc: "",
    causapenal: "",
    causapenaljo: "",
    detenidos: [],
    texto: "",
    modaldocumento: false,
    comilla: '"',
    menu1: false,
    menu2: false,
    fechac: "",
    hora: "",
    fechacomparecencia: "",
    personarelacionadas: [],
    explicacion: "",
    peritos: "",
    fraccion: "",
    multa: "",
    controlnum: "",
    direccion: [],
    multas: [],
    delitosf: "",

    personas: [],
    persona: "",
    direcciones: "",
    vialidades: [],
    distritos: [],
    distrito: "",
    imputados: [],
    imputado: "",
    policias: [],
    policia: "",
    juzgados: [],
    juzgado: "",
    puesto: "",
    fecha: "",
    fechadocumento: "",
    fechad: "",
    menu3: false,
    //*************** */
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
    headers: [
      { text: "Modulo", value: "uModulo" },
      { text: "Emitida por", value: "usuario" },
      { text: "Fecha de emisión", value: "fechaCitacion2" },
      { text: "Tipo de Citatorio", value: "tipo" },
      { text: "Fecha de citación", value: "fechaCitacion" },
      { text: "Opciones", value: "opcion", sortable: false },
    ],
    tipocitatorio: [
      { text: "A presentarse en el MP", value: "1" },
      { text: "A presentarse en Juzgado", value: "2" },
      { text: "Citatorio a peritos ante el MP", value: "3" },
      { text: "Citatorio a policía ante el MP", value: "4" },
      { text: "Citatorio peritos a juzgado", value: "5" },
      { text: "Citatorio policía a juzgado", value: "6" },
    ],
    // tcita:1,
    tcita: "",
    search: "",
    rowsPerPageItems: [10, 20, 30, 40, 50],
    pagination: {
      rowsPerPage: 20,
    },
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
    //----------------------------------------------------
    texto: 'Vista Previa',
    qrCode: null,
    docCitatoriosJ: 'Citatorio a juzgados',
    vistaPreviaTF: true,
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
      me.u_clave = me.$store.state.usuario.clave;
      me.u_rol = me.$store.state.usuario.rol;
      me.u_puesto = me.$store.state.usuario.puesto;
      me.u_subproc = me.$store.state.usuario.subProc;

      //*********************************************** */
      me.listarLogo();
      me.listar();
      me.listarrHecho();
      me.listardelitos();
      me.listarmultas();
      me.listarpersonas();
      me.listardistritos();
      me.listarimputados();
      me.listarpolicias();
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
  watch: {},
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
    cerrarcarpeta() {
      this.$store.state.rHechoId = null;
      this.$store.state.nuc = null;
      this.$router.push("./umixta-carpetas");
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
    agregar() {
      let me = this;
      me.limpiar();
      me.dialogo = true;
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

    fechainif() {
      if (this.menu1) {
        this.generarfecha2();
        this.$refs.menu1.save(this.fechacomparecencia);
      }
      if (this.menu3) {
        this.generarfecha2();
        this.$refs.menu3.save(this.fechadocumento);
      }
    },
    generarfecha2() {
      if (this.menu1)
        this.fechac =
          this.fechacomparecencia.substring(8, 10) +
          " de " +
          this.obtenermes(this.fechacomparecencia.substring(5, 7) - 1) +
          " del " +
          this.fechacomparecencia.substring(0, 4);

      if (this.menu3)
        this.fechad =
          this.fechadocumento.substring(8, 10) +
          " de " +
          this.obtenermes(this.fechadocumento.substring(5, 7) - 1) +
          " del " +
          this.fechadocumento.substring(0, 4);
    },

    generarpdf() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.delitosf = "";
          for (var a = 0; a < this.delito.length; a++) {
            this.delitosf += this.delito[a].text;
            if (this.delito.length != a + 1) this.delitosf += ", ";
          }
          this.fecha = this.generarfecha();
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
            "<u>DESTINATARIO:</u> " +
            this.persona.text +
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
            "<u>DOMICILIO: </u>" +
            this.direcciones +
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
            "<p class=" +
            this.comilla +
            "ql-align-justify" +
            this.comilla +
            "><br></p>" +
            "Por medio del presente y con fundamento en los artículos 82, fracción I,II,III, 84, 85, 90, 91 fracciones I,II,III, IV,V, VI, del Código Nacional de Procedimientos Penales, se le informa a usted que deberá presentarse, en las oficinas que ocupa esta Representación Social ubicadas en " +
            this.agenciainfo["direccion"] +
            ", el " +
            this.fechac +
            " a las " +
            this.hora +
            " horas a efecto de llevar a cabo " +
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
            this.explicacion +
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
            "Apercibiéndole que en caso de no comparecer, se le impondrá una medida de apremio consistente en " +
            this.multa +
            " lo anterior con fundamento en el artículo " +
            this.fraccion +
            " del Código Nacional de Procedimientos Penales.";

          this.mostrarpdf(this.u_nombre, this.u_puesto, this.u_agencia);
        }
      });
    },

    generarpdf2() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.delitosf = "";
          for (var a = 0; a < this.delito.length; a++) {
            this.delitosf += this.delito[a].text;
            if (this.delito.length != a + 1) this.delitosf += ", ";
          }
          this.fecha = this.generarfecha();
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
            "<u>DESTINATARIO:</u> " +
            this.persona.text +
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
            "<u>DOMICILIO: </u>" +
            this.direcciones +
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
            "<p class=" +
            this.comilla +
            "ql-align-justify" +
            this.comilla +
            "><br></p>" +
            "Por medio del presente y con fundamento en los artículos 82, fracción I,II,III, 84, 85, 90, 91 fracciones I,II,III, IV,V, VI, del Código Nacional de Procedimientos Penales, se le informa a usted que deberá presentarse, en las oficinas que ocupa esta Representación Social ubicadas en las instalaciones del  " +
            this.juzgado.text +
            ", ubicado en " +
            this.juzgado.value +
            ", toda vez que ha sido ofrecido y admitido su testimonio para su desahogo en la audiencia de debate a juicio oral, de la causa penal citada al rubro." +
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
            "Apercibiéndole que en caso de no presentarse, solicita al órgano jurisdiccional lo haga comparecer con auxilio de la fuerza pública" +
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
            "Lo anterior con fundamento en el artículo 104 fracción I inciso b, 131, 364 del Código Nacional de Procedimientos Penales. ";

          this.mostrarpdf(this.u_nombre, this.u_puesto, this.u_agencia);
        }
      });
    },

    generarpdf3() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.delitosf = "";
          for (var a = 0; a < this.delito.length; a++) {
            this.delitosf += this.delito[a].text;
            if (this.delito.length != a + 1) this.delitosf += ", ";
          }
          this.fecha = this.generarfecha();
          this.texto =
            " Con relación a la causa penal citada al rubro, instruida en contra de " +
            this.imputado.text +
            ", por hechos que la ley señala como el delito de: " +
            this.delitosf +
            ", solicito de su apoyo para que gire sus instrucciones a quien corresponda y cite a: " +
            this.peritos +
            ", peritos adscritos a la dirección a su cargo para que comparezca(n) el próximo " +
            this.fechac +
            "  a las " +
            this.hora +
            " horas en las instalaciones del ubicadas en  " +
            this.agenciainfo["direccion"] +
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
            this.explicacion +
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
            "Apercibiéndole que en caso de no comparecer, se hará acreedor a la medida de apremio consistente en " +
            this.multa +
            ", lo anterior con fundamento en el artículos 16, 20 y 21 de la Constitución Política de los Estados Unidos Mexicanos y los artículos  " +
            this.fraccion +
            " del Código Nacional de Procedimientos Penales vigente. ";

          this.mostrarpdf(this.u_nombre, this.u_puesto, this.u_agencia);
        }
      });
    },
    generarpdf4() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.delitosf = "";
          for (var a = 0; a < this.delito.length; a++) {
            this.delitosf += this.delito[a].text;
            if (this.delito.length != a + 1) this.delitosf += ", ";
          }
          this.fecha = this.generarfecha();
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
            " Con relación a la causa penal citada al rubro, instruida en contra de " +
            this.imputado.text +
            ", por hechos que la ley señala como el delito de: " +
            this.delitosf +
            ", solicito de su apoyo para que gire sus instrucciones a quien corresponda y cite a: " +
            this.peritos +
            ", policias adscritos a la dirección a su cargo para que comparezca(n) el próximo " +
            this.fechac +
            " a las " +
            this.hora +
            " horas en las instalaciones del  " +
            this.agenciainfo["direccion"] +
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
            this.explicacion +
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
            "Solicito informe a la brevedad posible la fecha y hora en la cual se  haya realizado la notificación o bien el impedimento que tuviere para realizarla. " +
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
            "Con fundamento en el artículos 16, 20 y 21 de la Constitución Política de los Estados Unidos Mexicanos  y los artículos  " +
            this.fraccion +
            " del Código Nacional de Procedimientos Penales vigente.";

          this.mostrarpdf(this.u_nombre, this.u_puesto, this.u_agencia);
        }
      });
    },
    generarpdf5() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.delitosf = "";
          for (var a = 0; a < this.delito.length; a++) {
            this.delitosf += this.delito[a].text;
            if (this.delito.length != a + 1) this.delitosf += ", ";
          }
          this.fecha = this.generarfecha();
          this.texto =
            " Con relación a la causa penal citada al rubro, instruida en contra de " +
            this.imputado.text +
            ", por hechos que la ley señala como el delito de: " +
            this.delitosf +
            ", solicito de su apoyo para que gire sus instrucciones a quien corresponda y cite a: " +
            this.peritos +
            ", peritos adscritos a la dirección a su cargo para que comparezca(n) el próximo " +
            this.fechac +
            " a las " +
            this.hora +
            " horas en las instalaciones del  " +
            this.juzgado.text +
            " ubicado en " +
            this.juzgado.value +
            " toda vez que ha sido ofrecido y admitido su testimonio para su desahogo en la audiencia de debate a juicio oral, de la causa penal citada al rubro." +
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
            "Apercibiéndole al policia que en caso de no comparecer, se hará acreedor a la medida de apremio consistente en " +
            this.multa +
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
            "Solicito informe a la brevedad posible la fecha y hora en la cual se  haya realizado la notificación o bien el impedimento que tuviere para realizarla. Con fundamento en el artículos 16, 20 y 21 de la Constitución Política de los Estados Unidos Mexicanos  y los artículos " +
            this.fraccion +
            " del Código Nacional de Procedimientos Penales vigente.";
          this.mostrarpdf(this.u_nombre, this.u_puesto, this.u_agencia);
        }
      });
    },

    generarpdf6() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.delitosf = "";
          for (var a = 0; a < this.delito.length; a++) {
            this.delitosf += this.delito[a].text;
            if (this.delito.length != a + 1) this.delitosf += ", ";
          }
          this.fecha = this.generarfecha();
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
            " Con relación a la causa penal citada al rubro, instruida en contra de " +
            this.imputado.text +
            ", por hechos que la ley señala como el delito de: " +
            this.delitosf +
            ", solicito de su apoyo para que gire sus instrucciones a quien corresponda y cite a: " +
            this.peritos +
            ", policias adscritos a la dirección a su cargo para que comparezca(n) el próximo " +
            this.fechac +
            " a las " +
            this.hora +
            " horas en las instalaciones del  " +
            this.juzgado.text +
            " ubicado en " +
            this.juzgado.value +
            " toda vez que ha sido ofrecido y admitido su testimonio para su desahogo en la audiencia de debate a juicio oral, de la causa penal citada al rubro." +
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
            "Apercibiéndole al policia que en caso de no comparecer, se hará acreedor a la medida de apremio consistente en " +
            this.multa +
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
            "Solicito informe a la brevedad posible la fecha y hora en la cual se  haya realizado la notificación o bien el impedimento que tuviere para realizarla. Con fundamento en el artículos 16, 20 y 21 de la Constitución Política de los Estados Unidos Mexicanos  y los artículos " +
            this.fraccion +
            " del Código Nacional de Procedimientos Penales vigente.";
          this.mostrarpdf(this.u_nombre, this.u_puesto, this.u_agencia);
        }
      });
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
    listarrHecho() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RHechoes/ListarPorId/" + me.rHechoId, configuracion)
        .then(function (response) {
          (me.agenciaid = response.data.agenciaid), me.informacionagencia();
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

    listarmultas() {
      let me = this;
      var multaarray;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$conf
        .get("api/MultasCitatorios/Listar", configuracion)
        .then(function (response) {
          multaarray = response.data;
          multaarray.map(function (x) {
            me.multas.push({ text: x.dato, value: x.dato });
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
    listardistritos() {
      let me = this;
      var distritosarray;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$conf
        .get("api/Distritoes/Listar", configuracion)
        .then(function (response) {
          distritosarray = response.data;
          distritosarray.map(function (x) {
            me.distritos.push({ text: x.nombre, value: x.idDistrito });
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
    obtenerjuzgado() {
      let me = this;
      var juzgadoarray;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.juzgados = [];
      this.juzgado = "";
      this.$conf
        .get(
          "api/JuzgadosAgencia/ListarPorDistrito/" + me.distrito.value,
          configuracion
        )
        .then(function (response) {
          juzgadoarray = response.data;
          juzgadoarray.map(function (x) {
            me.juzgados.push({ text: x.nombre, value: x.direccion });
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

    listarpersonas() {
      let me = this;
      var personaarray;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RAPs/ListarTodos/" + me.rAtencionId, configuracion)
        .then(function (response) {
          personaarray = response.data;
          personaarray.map(function (x) {
            me.personas.push({ text: x.nombreCompleto, value: x.idRAP });
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
    listarimputados() {
      let me = this;
      var imputadoarray;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RAPs/ListarImpDE/" + me.rAtencionId, configuracion)
        .then(function (response) {
          imputadoarray = response.data;
          imputadoarray.map(function (x) {
            me.imputados.push({ text: x.nombreCompleto, value: x.idRAP });
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
    listarpolicias() {
      let me = this;
      var policiaarray;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$conf
        .get("api/Instituciones/Listar/", configuracion)
        .then(function (response) {
          policiaarray = response.data;
          policiaarray.map(function (x) {
            me.policias.push({ text: x.nombre, value: x.nombre });
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
    obtenerdireccion() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RAPs/ListarDE/" + me.persona.value, configuracion)
        .then(function (response) {
          let vialidadEncontrada = me.vialidades.find(v => v.value === response.data.tipoVialidad);
          let vialidad = vialidadEncontrada ? vialidadEncontrada.text : "";

          me.direcciones =
          vialidad + 
            " " +
            response.data.calle +
            " " +
            response.data.noint +
            " " +
            response.data.localidad +
            " " +
            response.data.cp +
            " " +
            response.data.municipio +
            " " +
            response.data.estado;
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
    ordenar() {
      this.delito.sort((a, b) => (a.value > b.value ? 1 : -1));
    },
    listardelitos() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var delitosArray = [];
      var contador = 0;
      me.$CAT
        .get("api/RDHs/ListarPorHecho/" + me.rHechoId, configuracion)
        .then(function (response) {
          //console.log(response.data)
          delitosArray = response.data;
          delitosArray.map(function (x) {
            me.delitos.push({ text: x.nombreDelito, value: contador });
            contador++;
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
    listarVialidad(){
        let me=this;
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        this.$conf.get('api/Vialidades/Listar',configuracion).then(function(response){
            response.data.forEach(x => {
                const item = {text: x.nombre, value: x.clave};
                me.vialidades.push(item);
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
    guardar() {
      this.$validator.validate().then((result) => {
        if (result) {
          let me = this;
          let header = { Authorization: "Bearer " + this.$store.state.token };
          let configuracion = { headers: header };

          me.$confirm(
            "Esperando confirmación",
            "Estas seguro de  que deseas guardar información ",
             () =>{
              if (
                me.tcita.value == 2 ||
                me.tcita.value == 5 ||
                me.tcita.value == 6
              ) {
                me.explicacion = me.juzgado.text;
              }

              if (me.fechacomparecencia == "") {
                me.fechacomparecencia = "0001-01-01";
              }



              me.$IL
                .post(
                  "api/Citatorio/Crear",
                  {
                    NumeroOficio: me.numoficio,
                    RHechoId: me.rHechoId,
                    CausaPenal: me.causapenal,
                    Nuc: me.nuc,
                    Delito: me.delitosf,
                    Destinatario: me.persona.text,
                    Domicilio: me.direcciones,
                    FechaCitacion: me.fechacomparecencia + "T" + me.hora,
                    JuicioOral: me.explicacion,
                    Multa: me.multa,
                    Articulo: me.fraccion,
                    LugarPresentarse: me.policia.text,
                    DireccionLugar: me.juzgado.value,
                    CausaPenalJo: me.causapenaljo,
                    Imputado: me.imputado.text,
                    PeritosPolicias: me.peritos,
                    HoraCitacion: me.hora,
                    DireccionAgencia: me.agenciainfo["direccion"],
                    FechaCitacion2: me.fechadocumento,
                    Tipo: me.tcita.value,
                    Dirigidoa: me.nombreenc,
                    Puesto: me.puesto,
                    UDistrito: me.u_distrito,
                    USubproc: me.u_dirSubPro,
                    UAgencia: me.u_agencia,
                    Usuario: me.u_nombre,
                    UPuesto: me.u_puesto,
                    UModulo: me.u_modulo,
                  },
                  configuracion
                )
                .then( (response)=> {
                  me.$notify(
                    "La información se guardo correctamente !!!",
                    "success"
                  );
                  me.modaldocumento = false;
                  me.dialogo = false;
                  me.listar();
                  me.limpiar();
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
            },
            function () {
              alertify.warning("Verifica la información");
            }
          ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
        }
      });
    },
    limpiar() {
      //this.tcita =new Object()
      //this.tcita.value = this.tipocitatorio[0].value
      //this.tcita.text = this.tipocitatorio[0].text
      this.tcita = "";
      this.peritos = "";
      this.explicacion = "";
      this.fraccion = "";
      this.numoficio = "";
      this.causapenal = "";
      this.delito = "";
      this.nombreenc = "";
      this.puesto = "";
      this.hora = "";
      this.persona = "";
      this.imputado = "";
      this.policia = "";
      this.multa = "";
      this.causapenaljo = "";
      this.distrito = "";
      this.juzgado = "";
      this.fechacomparecencia = "";
      this.fechac = "";
      this.fechadocumento = "";
      this.fechad = "";
      this.listar();
    },
    Obtenerperrel() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/ComparecenciaElemento/Listar", configuracion)
        .then(function (response) {
          //console.log(response);
          me.personarelacionadas = response.data;
        })
        .catch((err) => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (this.e401 = true), (this.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta pagina", "error");
            this.e403 = true;
            this.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar leer la lista roles!!!", "error");
          }
        });
    },

    listar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$IL
        .get("api/Citatorio/Listar/" + me.rHechoId, configuracion)
        .then(function (response) {
          //console.log(response);
          me.detenidos = response.data;
        })
        .catch((err) => {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (this.e401 = true), (this.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta pagina", "error");
            this.e403 = true;
            this.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar leer la lista roles!!!", "error");
          }
        });
    },
    imprimir(item) {
      let me = this;
      me.numoficio = item.numeroOficio;
      me.causapenal = item.causaPenal;
      me.causapenaljo = item.causaPenalJo;
      me.delitosf = item.delito;
      var persona = item.destinatario;
      var direcciones = item.domicilio;
      me.fechacomparecencia = item.FechaCitacion;
      me.explicacion = item.juicioOral;
      me.multa = item.multa;
      me.fraccion = item.Articulo;
      var agenciainfo = item.lugarPresentarse;
      me.imputado = item.imputado;
      me.peritos = item.peritosPolicias;
      me.hora = item.horaCitacion;
      me.tcita = item.tipo;
      me.agente = item.usuario;
      me.agencia = item.uAgencia;
      me.fechadocumento = item.fechaCitacion2;
      me.controlnum = item.tipo;
      me.puesto = item.puesto;
      console.log(item.tipo);
      var juzgadocontrol = item.juicioOral;
      var juzgado = item.direccionLugar;
      var fechacomparecencia = item.fechaCitacion;
      var explicacion = item.juicioOral;
      var multa = item.multa;
      var fraccion = item.articulo;
      var imputado = item.imputado;
      var peritos = item.peritosPolicias;
      var hora = item.horaCitacion;
      var agenciainfo2 = item.direccionAgencia;
      var nombreenc = item.dirigidoa;
      var puestoo = item.puesto;
      var fechacitacion =
        item.fechaCitacion.substring(8, 10) +
        " de " +
        this.obtenermes(item.fechaCitacion.substring(5, 7) - 1) +
        " del " +
        item.fechaCitacion.substring(0, 4);
      var cpolicia = item.lugarPresentarse;
      var agente = item.usuario;
      var agencia = item.uAgencia;
      var puesto = item.uPuesto;
      var subproc = item.uSubproc;

      if (item.tipo == 1) {
        //primer pdf----------------------------------------------------
        this.fecha =
          item.fechasys.substring(8, 10) +
          " de " +
          this.obtenermes(item.fechasys.substring(5, 7) - 1) +
          " del " +
          item.fechasys.substring(0, 4);
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
          "<u>DESTINATARIO:</u> " +
          persona +
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
          "<u>DOMICILIO: </u>" +
          direcciones +
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
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Por medio del presente y con fundamento en los artículos 82, fracción I,II,III, 84, 85, 90, 91 fracciones I,II,III, IV,V, VI, del Código Nacional de Procedimientos Penales, se le informa a usted que deberá presentarse, en las oficinas que ocupa esta Representación Social ubicadas en " +
          agenciainfo2 +
          ", el " +
          fechacitacion +
          " a las " +
          hora +
          " horas a efecto de llevar a cabo " +
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
          explicacion +
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
          "Apercibiendole que en caso de no comparecer, se hará acreedor a la medida de apremio consistente en " +
          multa +
          " lo anterior con fundamento en el artículo " +
          fraccion +
          " del Código Nacional de Procedimientos Penales.";
      } else if (item.tipo == 2) {
        //segundo pdf
        this.fecha =
          item.fechasys.substring(8, 10) +
          " de " +
          this.obtenermes(item.fechasys.substring(5, 7) - 1) +
          " del " +
          item.fechasys.substring(0, 4);
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
          "<u>DESTINATARIO:</u> " +
          persona +
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
          "<u>DOMICILIO: </u>" +
          direcciones +
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
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>" +
          "Por medio del presente y con fundamento en los artículos 82, fracción I,II,III, 84, 85, 90, 91 fracciones I,II,III, IV,V, VI, del Código Nacional de Procedimientos Penales, se le informa a usted que deberá presentarse, en las oficinas que ocupa esta Representación Social ubicadas en las instalaciones del  " +
          juzgadocontrol +
          ", ubicado en " +
          juzgado +
          ", toda vez que ha sido ofrecido y admitido su testimonio para su desahogo en la audiencia de debate a juicio oral, de la causa penal citada al rubro." +
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
          "Apercibiendole que en caso de no presentarse, solicita al órgano jurisdiccional lo haga comparecer con auxilio de la fuerza pública" +
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
          "Lo anterior con fundamento en el artículo 104 fracción I inciso b, 131, 364 del Código Nacional de Procedimientos Penales. ";
      } else if (item.tipo == 3) {
        //pdf 3-------------------------------------------------------------------

        this.fecha =
          item.fechasys.substring(8, 10) +
          " de " +
          this.obtenermes(item.fechasys.substring(5, 7) - 1) +
          " del " +
          item.fechasys.substring(0, 4);
        this.texto =
          " Con relación a la causa penal citada al rubro, instruida en contra de " +
          imputado +
          ", por hechos que la ley señala como el delito de: " +
          this.delitosf +
          ", solicito de su apoyo para que gire sus instrucciones a quien corresponda y cite a: " +
          peritos +
          ", peritos adscritos a la dirección a su cargo para que comparezca(n) el próximo " +
          fechacitacion +
          " a las " +
          hora +
          " en las instalaciones del ubicadas en  " +
          agenciainfo2 +
          ", el " +
          fechacitacion +
          " a las " +
          hora +
          " horas a efecto de llevar a cabo  " +
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
          explicacion +
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
          "Apercibiéndolo que en caso de no comparecer, se hará acreedor a la medida de apremio consistente en " +
          multa +
          "), lo anterior con fundamento en el artículos 16, 20 y 21 de la Constitución Política de los Estados Unidos Mexicanos y los artículos  " +
          fraccion +
          " del Código Nacional de Procedimientos Penales vigente. ";
      }
      else if (item.tipo == 4) {
        this.fecha =
          item.fechasys.substring(8, 10) +
          " de " +
          this.obtenermes(item.fechafsys.substring(5, 7) - 1) +
          " del " +
          item.fechasys.substring(0, 4);
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
          " Con relación a la causa penal citada al rubro, instruida en contra de " +
          imputado +
          ", por hechos que la ley señala como el delito de: " +
          this.delitosf +
          ", solicito de su apoyo para que gire sus instrucciones a quien corresponda y cite a: " +
          peritos +
          ", peritos adscritos a la dirección a su cargo para que comparezca(n) el próximo " +
          fechacitacion +
          " a las " +
          hora +
          " en las instalaciones del  " +
          agenciainfo2 +
          ", el " +
          fechacitacion +
          " a las " +
          hora +
          " horas a efecto de llevar a cabo  " +
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
          explicacion +
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
          "Solicito informe a la brevedad posible la fecha y hora en la cual se  haya realizado la notificación o bien el impedimento que tuviere para realizarla. " +
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
          "Con fundamento en el artículos 16, 20 y 21 de la Constitución Política de los Estados Unidos Mexicanos  y los artículos  " +
          fraccion +
          " del Código Nacional de Procedimientos Penales vigente.";
      }
      else if (item.tipo == 5) {
        this.fecha =
          item.fechasys.substring(8, 10) +
          " de " +
          this.obtenermes(item.fechasys.substring(5, 7) - 1) +
          " del " +
          item.fechasys.substring(0, 4);
        this.texto =
          " Con relación a la causa penal citada al rubro, instruida en contra de " +
          imputado +
          ", por hechos que la ley señala como el delito de: " +
          this.delitosf +
          ", solicito de su apoyo para que gire sus instrucciones a quien corresponda y cite a: " +
          peritos +
          ", peritos adscritos a la dirección a su cargo para que comparezca(n) el próximo " +
          fechacitacion +
          " a las " +
          hora +
          " en las instalaciones del  " +
          juzgadocontrol +
          " ubicado en " +
          juzgado +
          " toda vez que ha sido ofrecido y admitido su testimonio para su desahogo en la audiencia de debate a juicio oral, de la causa penal citada al rubro." +
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
          "Apercibiendo al perito que en caso de no comparecer, se hará acreedor a la medida de apremio consistente en " +
          multa +
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
          "Solicito informe a la brevedad posible la fecha y hora en la cual se  haya realizado la notificación o bien el impedimento que tuviere para realizarla. Con fundamento en el artículos 16, 20 y 21 de la Constitución Política de los Estados Unidos Mexicanos  y los artículos " +
          fraccion +
          " del Código Nacional de Procedimientos Penales vigente.";
      }
      else if (item.tipo == 6) {
        this.fecha =
          item.fechasys.substring(8, 10) +
          " de " +
          this.obtenermes(item.fechasys.substring(5, 7) - 1) +
          " del " +
          item.fechasys.substring(0, 4);
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
          " Con relación a la causa penal citada al rubro, instruida en contra de " +
          imputado +
          ", por hechos que la ley señala como el delito de: " +
          this.delitosf +
          ", solicito de su apoyo para que gire sus instrucciones a quien corresponda y cite a: " +
          peritos +
          ", peritos adscritos a la dirección a su cargo para que comparezca(n) el próximo " +
          fechacitacion +
          " a las " +
          hora +
          " en las instalaciones del  " +
          juzgadocontrol +
          "  ubicado en " +
          juzgado +
          " toda vez que ha sido ofrecido y admitido su testimonio para su desahogo en la audiencia de debate a juicio oral, de la causa penal citada al rubro." +
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
          "Apercibiendo al perito que en caso de no comparecer, se hará acreedor a la medida de apremio consistente en " +
          multa +
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
          "Solicito informe a la brevedad posible la fecha y hora en la cual se  haya realizado la notificación o bien el impedimento que tuviere para realizarla. Con fundamento en el artículos 16, 20 y 21 de la Constitución Política de los Estados Unidos Mexicanos  y los artículos " +
          fraccion +
          "  del Código Nacional de Procedimientos Penales vigente.";
      }

      me.vistaPreviaTF = false;
      me.generarQR(me.docCitatoriosJ,me.nuc,item.usuario,item.fechasys,item.idCitatorio);

      setTimeout(() => 
      {
      me.imprimirpdf(item.usuario, item.uPuesto, item.uAgencia);
      me.modaldocumento = false;
      }, 1000);

    },
    mostrarpdf(nombre, puesto, agencia) {
      let me = this;
      //console.log("mostrar pdf")
      var dd = me.downloadPdf(nombre, puesto, agencia);
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.vfs;
      }
      var doc = pdfMake.createPdf(dd);
      var f = document.getElementById("iframepdf");
      //f.setAttribute("src","")

      var callback = async (url) => {
        /*const result = await Swal.fire({
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
        }*/
        this.base64pdf = url;
        this.canvasid = "canvaspdf"
        this.renderPdfToCanvas(url.split(",")[1], "canvaspdf", this.numpage)
        this.modal_CaratulaNUC = true;
      };

      doc.getDataUrl(callback, doc);
      me.modaldocumento = true;
    },
    imprimirpdf(nombre, puesto, agencia) 
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
      };
      doc.getDataUrl(callback, doc);
      me.limpiar();
    },
    downloadPdf(nombre, puesto, agencia) {
      //console.log("ver cittttt")
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
      var u_distrito = this.u_distrito;
      var nuc = this.nuc;
      var causapenal = this.causapenal;
      var delitos = this.delitosf;
      var nooficio = this.numoficio;
      var fecha =
        this.fechadocumento.substring(8, 10) +
        " de " +
        this.obtenermes(this.fechadocumento.substring(5, 7) - 1) +
        " del " +
        this.fechadocumento.substring(0, 4);
      var causajo = this.causapenaljo;

      //***************************************************************************** */
      var html2 = htmlToPdfmake(this.texto);
      var html = htmlToPdfmake(
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
          "<u>CITATORIO</u>"
      );

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
            /*{ 
                                image: logo2,
                                width: 50,  
                                absolutePosition: {x: 495, y: 30},
                            },*/
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
            text:
              "CAUSA PENAL: " + causapenal + "\n\n" + (causajo != "" ? "CAUSA PENAL J.O: " + causajo + "\n\n" : "") +
              "DELITO: " +
              delitos +
              "\n\n" +
              "NO DE OFICIO : " +
              nooficio,
            style: "Nooficio",
            alignment: "right",
          },
          {
            text: "\n" + u_distrito + ", Hidalgo a " + fecha + "\n\n\n\n\n\n",
            style: "Fecha",
            alignment: "right",
          },
          {
            text: html,
            style: "Titulo",
            alignment: "center",
          },
          this.controlnum == 3 ||
          this.controlnum == 4 ||
          this.controlnum == 5 ||
          this.controlnum == 6
            ? {
                text: this.puesto + "\n\n\n",
                style: "DePara",
                alignment: "justify",
                margin: [0, 50, 200, 0],
              }
            : "",
          {
            text: html2,
            style: "Texto",
            alignment: "justify",
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
          },
          PiePagina: {
            fontSize: 7,
            color: "white",
          },
          Texto: {
            fontSize: 11,
            alignment: "justify",
          },
          Titulo: {
            fontSize: 12,
            bold: true,
          },
        },
      };

      return dd;

      //iframe.src = doc.output('bloburl');
    },
  },
};
</script>
<style>
.espaciado {
  padding: 30px !important;
}
</style>
