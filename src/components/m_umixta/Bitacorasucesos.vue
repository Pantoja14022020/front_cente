<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular">Registros</v-toolbar-title>
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
        <v-btn
          class="mx-2"
          @click="cerrarcarpeta"
          fab
          dark
          small
          color="primary"
        >
          <v-icon dark>close</v-icon>
        </v-btn>
        <v-btn class="mx-2" @click="agregar()" fab dark small color="success">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="bitacoras"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.tipo }}</td>
          <td>{{ props.item.nombrePersona }}</td>
          <td>{{ formatearfechahora(props.item.fechasis) }}</td>
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
              <span>Imprimir registro</span>
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
            <v-toolbar-title>Registros.</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
              <v-btn color="success" text @click="mostrarpdf_Bitacora()"
                >VISTA PREVIA</v-btn
              >
              <v-btn icon @click="modalAdd = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-flex mx-5>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex class="espaciado" xs12 sm12 md6 lg6>
                    <v-text-field
                      name="tipo de registro"
                      v-model="tipo"
                      v-validate="'required'"
                      label="Tipo:"
                      :error-messages="errors.collect('tipo de registro')"
                    />
                  </v-flex>
                  <v-flex class="espaciado" xs12 sm12 md6 lg6>
                    <v-autocomplete
                      name="persona"
                      :items="personas"
                      v-model="personaId"
                      return-object
                      v-validate="'required'"
                      label="Persona:"
                      :error-messages="errors.collect('persona')"
                    />
                  </v-flex>
                  <v-flex class="espaciado" xs12 sm12 md12 lg612>
                    <vue-editor
                      name="texto registro"
                      v-validate="'required'"
                      :editorToolbar="customToolbar"
                      v-model="textolibre"
                      :error-messages="errors.collect('texto registro')"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-divider />
          </v-flex>
        </v-card>
      </v-dialog>
    </v-flex>
    <v-dialog
      v-model="modal_Bitacora"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Documento.</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn color="success" text @click.native="imprimir_Bitacora">
              {{ btntitle }} {{ " " }} {{ tipo }}
            </v-btn>
            <v-btn icon @click="modal_Bitacora = false">
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
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from "axios";
import VeeValidate from "vee-validate";
import { VueEditor } from "vue2-editor";
import moment from "moment";
import "moment/locale/es";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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
    rAtencionId: "",
    rHechoId: "",
    nuc: "",
    // variables para crear
    bitacoras: [],
    personas: [
      { text: "No existe", value: "B05009F3-6728-4E4D-B4D5-AD09F8B0345A" },
    ],
    personaId: "",
    tipo: "",
    textolibre: "",
    fechareporte: "",
    numerooficio: "",
    //variables para leer en reporte
    vl_fechasys: "",
    vl_distrito: "",
    vl_dirSubPro: "",
    vl_idagencia: "",
    vl_agencia: "",
    vl_modulo: "",
    vl_nombre: "",
    vl_puesto: "",
    headers: [
      { text: "Tipo de registro", value: "tipo" },
      { text: "Nombre de persona", value: "tipopersona" },
      { text: "Fecha", value: "nombre" },
      { text: "Opciones", value: "opciones", sortable: false },
    ],
    search: "",
    rowsPerPageItems: [10, 20, 30, 40, 50],
    pagination: {
      rowsPerPage: 20,
    },
    editedIndex: -1,
    modalAdd: false,
    modal_Bitacora: false,
    logo1: "",
    logo2: "",
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
    showpage: true,
    e401: false,
    e403: false,
    idbitacora:"",
    texto: 'Vista Previa',
    qrCode: null,
    docRegistros: 'Registro',
    vistaPreviaTF: true,
  }),

  created() {
    let me = this;
    me.rAtencionId = me.$store.state.ratencionid;
    me.rHechoId = me.$store.state.rhechoid;
    me.nuc = me.$store.state.nuc;
    if (me.rHechoId == null) {
      me.$alert(
        "Notificación",
        "Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpeta y luego en Listar carpeta y ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.",
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
      me.listarRegistroBitacora();
      me.listarLogo();
      me.informacionagencia();
      me.listarPersonas();
    }
    // Add a request interceptor
    axios.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        // console.log(config)
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
        // console.log(response)
        this.$store.commit("LOADER", false);
        // Do something with response data
        return response;
      },
      (err) => {
        // Do something with response error
        return new Promise((resolve, reject) => {
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
          });
          throw err;
        });
      }
    );
  },
  computed: {
    btntitle() {
      return this.editedIndex === -1 ? "Registro" : "Imprimir";
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

            console.log("QR generado");
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
        .get("api/Agencias/Listarporid/" + me.u_idagencia, configuracion)
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
    cerrarcarpeta() {
      this.$store.state.rhechoid = null;
      this.$store.state.nuc = null;
      this.$router.push("./umixta-carpetas");
    },
    formatearfechahora: function (fecha) {
      return moment(fecha).format("DD/MM/YYYY hh:mm:ss a");
    },
    agregar() {
      this.modalAdd = true;
      this.editedIndex = -1;
    },
    close() {
      this.modalAdd = false;
      this.limpiar();
    },
    limpiar() {
      let me = this;
      me.tipo = "";
      me.personaId = "";
      me.numerooficio = "";
      me.textolibre = "";
      me.qrCode = null;
      me.vistaPreviaTF = true;
    },
    listarRegistroBitacora() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RBitacoras/ListarPorHecho/" + me.rHechoId, configuracion)
        .then(function (response) {
          me.bitacoras = response.data;
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
      me.$CAT
        .get("api/RAPs/ListarTodos/" + me.rAtencionId, configuracion)
        .then(function (response) {
          personasArray = response.data;
          personasArray.map(function (x) {
            me.personas.push({ text: x.nombreCompleto, value: x.personaId });
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
    imprimir(item) {
      let me = this;
      me.tipo = "";
      me.numerooficio = item.numerooficio;
      me.textolibre = item.descipcion;
      me.vl_fechasys = item.fechasis;
      me.vl_distrito = item.distrito;
      me.vl_dirSubProc = item.dirSubProc;
      me.vl_agencia = item.agencia;
      me.vl_nombre = item.usuario;
      me.vl_puesto = item.puesto;
      me.tipo = item.tipo;
      me.editedIndex = 1;

      me.vistaPreviaTF = false;
      me.generarQR(me.docRegistros,me.nuc,item.usuario,item.fechasis,item.idBitacora);

      setTimeout(() => 
      {
        me.imprimir_Bitacora();
      }, 1000);

      
    },
    // BITACORA
    crearPdf_Bitacora() {
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");
      var logo1 = this.logo1;
      var logo2 = this.logo2;
      var logo3 = this.logo3;
      var logo4 = this.logo4;
      var pdf_diragencia = "";
      var pdf_telagencia = "";
      var dia = "";
      var mes = "";
      var año = "";
      var hr = "";
      var fechasys = "";
      var fecha = "";
      var pdf_distrito = "";
      var pdf_dirSubProc = "";
      var pdf_agencia = "";
      var pdf_usuario = "";
      var pdf_puesto = "";
      var nuc = this.nuc;
      if (this.editedIndex == -1) {
        pdf_diragencia = this.direccionAgencia;
        pdf_telagencia = this.telefonosAgencia;
        dia = moment().format("DD");
        mes = moment().format("MMMM");
        año = moment().format("YYYY");
        hr = moment().format("h:mm:ss a");
        fecha = dia + " de " + mes + " del " + año + ", " + hr;
        pdf_distrito = this.u_distrito;
        pdf_dirSubProc = this.u_dirSubProc;
        pdf_agencia = this.u_agencia;
        pdf_usuario = this.u_nombre;
        pdf_puesto = this.u_puesto;
      } else if (this.editedIndex == 1) {
        pdf_diragencia = this.direccionAgencia;
        pdf_telagencia = this.telefonosAgencia;
        fechasys = moment(this.vl_fechasys, "YYYY-MM-DD HH:mm:ss");
        dia = moment(this.vl_fechasys).format("DD");
        mes = moment(this.vl_fechasys).format("MMMM");
        año = moment(this.vl_fechasys).format("YYYY");
        hr = moment(this.vl_fechasys).format("h:mm:ss a");
        fecha = dia + " de " + mes + " del " + año + ", " + hr;
        pdf_distrito = this.vl_distrito;
        pdf_dirSubProc = this.vl_dirSubProc;
        pdf_agencia = this.vl_agencia;
        pdf_usuario = this.vl_nombre;
        pdf_puesto = this.vl_puesto;
      }
      var u_dirSubPro = this.u_dirSubPro;
      var u_agencia = this.u_agencia;
      var u_subProc = this.u_subproc;
      var htmltexto = htmlToPdfmake(this.textolibre);

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
                pdf_diragencia +
                "\n" +
                pdf_telagencia +
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
            absolutePosition: { x: 85, y: 150 },
          },
          {
            text: "\n\n\n\n\n" + this.tipo,
            style: "Titulo",
          },
          "\n\n",
          {
            text: htmltexto,
            style: "Texto",
          },
          "\n\n\n",
          {
            text: "\n\n\n\n\n" + "A T E N T A M E N T E" + "\n\n\n\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: pdf_usuario + "\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: pdf_puesto + "\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: pdf_agencia + "\n\n",
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
            color: COLOR_TEXTO_PIE_PAGINA,
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
    mostrarpdf_Bitacora() {

      let me = this;

      var now = moment();
      me.generarQR(me.docRegistros,me.nuc,me.u_nombre,now,me.idbitacora);
      
      var dd = this.crearPdf_Bitacora();
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");
      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
      var doc = pdfMake.createPdf(dd);
      var f = document.getElementById("iframepdf1");
      var callback = function (url) {
        f.setAttribute("src", url);
      };
      doc.getDataUrl(callback, doc);
      this.modal_Bitacora = true;
    },
    imprimir_Bitacora() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      var descripcionRegTabI =
        "Registro de nuevo registro de tipo " +
        me.tipo +
        " de la persona " +
        me.personaId.text;

      if (me.editedIndex == 1) {
        var dd = me.crearPdf_Bitacora();
        var pdfMake = require("pdfmake/build/pdfmake.js");
        var htmlToPdfmake = require("html-to-pdfmake");
        if (pdfMake.vfs == undefined) {
          var pdfFonts = require("pdfmake/build/vfs_fonts.js");
          pdfMake.vfs = pdfFonts.pdfMake.vfs;
        }
        var doc = pdfMake.createPdf(dd).print();
        me.close();
      } else {
        me.$confirm(
          "Esperando confirmación",
          "Estas seguro de  que deseas guardar información e imprimir el documento. Una vez realizada esta accion no prodra realizar cambios",
          function () {
            me.$CAT
              .post(
                "api/RBitacoras/Crear",
                {
                  //***************************** PERSONA*/
                  tipo: me.tipo,
                  rHechoId: me.rHechoId,
                  idPersona: me.personaId.value,
                  descipcion: me.textolibre,
                  distrito: me.u_distrito,
                  dirsubproc: me.u_dirSubProc,
                  agencia: me.u_agencia,
                  usuario: me.u_nombre,
                  puesto: me.u_puesto,
                  fechareporte: me.fechareporte,
                  numerooficio: me.numerooficio,
                  //************************************ */
                },
                configuracion
              )
              .then(function (response) {

                me.idbitacora = response.data.idrbitacora;
                me.vistaPreviaTF = false;
                var now = moment();
                me.generarQR(me.docRegistros,me.nuc,me.u_nombre,now,me.idbitacora);

                setTimeout(() => 
                {
                  var dd = me.crearPdf_Bitacora();
                  var pdfMake = require("pdfmake/build/pdfmake.js");
                  var htmlToPdfmake = require("html-to-pdfmake");
                  if (pdfMake.vfs == undefined) {
                    var pdfFonts = require("pdfmake/build/vfs_fonts.js");
                    pdfMake.vfs = pdfFonts.pdfMake.vfs;
                  }
                  var doc = pdfMake.createPdf(dd).print();
                  me.$notify(
                    "La información se guardo correctamente !!!",
                    "success"
                  );
                  me.modal_Bitacora = false;
                  me.crearRegistroTableroI(descripcionRegTabI);
                  me.listarRegistroBitacora();
                  me.close();
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
          },
          function () {
            alertify.warning("Verifica la información");
          }
        ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
      }
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
  },
};
</script>

<style>
.espaciado {
  padding: 30px !important;
}
</style>
