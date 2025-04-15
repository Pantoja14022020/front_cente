<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Datos Protegidos</v-toolbar-title
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
          class="mx-2"
          @click="cerrarcarpeta"
          fab
          dark
          small
          color="primary"
        >
          <v-icon dark>close</v-icon>
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
          <td>{{ props.item.nombre }}</td>
          <td>{{ props.item.aPaterno }}</td>
          <td>{{ props.item.aMaterno }}</td>
          <td>{{ props.item.curp }}</td>
          <td>{{ props.item.alias }}</td>
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
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2" v-on="on" @click="verimagen(props.item)">
                  pageview
                </v-icon>
              </template>
              <span>Consultar Archivos</span>
            </v-tooltip>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary">Resetear</v-btn>
        </template>
      </v-data-table>
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
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn color="success" text @click.native="guardar()"
              >Guardar oficio</v-btn
            >
            <v-btn icon @click="modal_Bitacora = false">
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

    <v-dialog v-model="dialogimagen" max-width="1000px">
      <v-card>
        <v-toolbar card dark color="grey lighten-4 primary--text">
          <v-avatar size="30">
            <v-icon class="grey lighten-2">assignment</v-icon>
          </v-avatar>

          <v-toolbar-title class="subheading">Imagen</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <v-img
                    :src="rutaconsulta"
                    aspect-ratio="1"
                    class="black"
                    contain
                  >
                  </v-img>
                </v-flex>
              </v-layout>
            </v-container>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.native="dialogimagen = false">Cerrar</v-btn>
            </v-card-actions>
          </v-form>
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

    //*************** */
    // variables leer
    bitacoras: [],
    tipo: "",

    //*************** */

    headers: [
      { text: "Nombre", value: "tipo" },
      { text: "Apellido paterno", value: "tipopersona" },
      { text: "Apellido materno", value: "nombre" },
      { text: "Curp", value: "Curp" },
      { text: "Alias", value: "alias" },
      { text: "Opciones", value: "opciones", sortable: false },
    ],
    search: "",
    rowsPerPageItems: [10, 20, 30, 40, 50],
    pagination: {
      rowsPerPage: 20,
    },
    editedIndex: -1,
    modalAdd: false,
    //**************************************** */

    modal_Bitacora: false,
    //----------------------pdf
    nombre: "",
    aPaterno: "",
    aMaterno: "",
    alias: "",
    fechaNacimiento: "",
    curp: "",
    telefono1: "",
    telefono2: "",
    direc: "",
    rfc: "",
    agenciainfo: [],
    dialogimagen: false,

    rutaconsulta: "",
    agenciaid: "",
    //----------------------------------------------------
    showpage: true,
    e401: false,
    e403: false,
    texto: 'Vista Previa',
    qrCode: null,
    docDatosProt: 'Datos protegidos',
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
        "Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpeta y luego en Listar carpeta y   ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.",
        function () {
          me.$router.push("./umixta-carpetas");
        }
      );
    } else {
      me.$notify("Carpeta abierta correctamente !!!", "success");

      me.u_iddistrito = me.$store.state.usuario.iddistrito;
      me.u_distrito = me.$store.state.usuario.distrito;
      me.u_dirSubProc = me.$store.state.usuario.dirSubProc;
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
      me.listarRegistroBitacora();
      me.listarLogo();
      me.listarrHecho();
    }

    // Add a request interceptor
    axios.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        console.log(config);
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
        console.log(response);
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
    listarrHecho() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
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
      me.texto =  'Vista Previa';
      me.qrCode = null;
      me.docDatosProt =  'Datos protegidos';
      me.vistaPreviaTF =  true;
    },
    listarRegistroBitacora() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("api/DatosProtegido/Listar/" + me.rAtencionId, configuracion)
        .then(function (response) {
          me.bitacoras = response.data;
          console.log(me.bitacoras);
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

      me.vistaPreviaTF = false;
      var doc = me.docDatosProt + " de " + item.alias;
      var now = moment();

      me.generarQR(doc,me.nuc,item.usuario,now,item.idDatosProtegidos);

      (this.nombre = item.nombre.toUpperCase()),
      (this.aPaterno = item.aPaterno.toUpperCase()),
      (this.aMaterno = item.aMaterno.toUpperCase()),
      (this.alias = item.alias.toUpperCase()),
      (this.fechaNacimiento = item.fechaNacimiento.toUpperCase()),
      (this.curp = item.curp.toUpperCase()),
      (this.telefono1 = item.telefono1.toUpperCase()),
      (this.telefono2 = item.telefono2.toUpperCase()),
      (this.direc = item.direc.toUpperCase()),
      (this.rfc = item.rfc.toUpperCase());

      setTimeout(() => 
      {
        this.mostrarpdf(item.usuario, item.uPuesto, item.uAgencia);
      }, 1000);

    },
    verimagen(item) {
      this.rutaconsulta = item.rutadocumento;
      this.dialogimagen = true;
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
    mostrarpdf(nombre, puesto, agencia) 
    {
      let me = this;

      var dd = me.downloadPdf(nombre, puesto, agencia);

      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
      var doc = pdfMake.createPdf(dd).print();
      me.modaldocumento = true;
    },
    downloadPdf(nombre, puesto, agencia) {

      let me = this;
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }

      //***************************************************************************** */
      // VARIABLES
      //***************************************************************************** */
      var logo1 = this.logo1;
      var logo2 = this.logo2;
      var logo3 = this.logo3;
      var logo4 = this.logo4;
      var u_dirSubPro = this.u_dirSubProc;
      var u_agencia = this.u_agencia;
      var u_subProc = this.u_subproc;
      var nuc = this.nuc;
      //***************************************************************************** */
      //***************************************************************************** */
      var agenciainfodr = this.agenciainfo["direccion"];
      var agenciainfotel = this.agenciainfo["telefono"];

      //***************************************************************************** */


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
            text: this.u_distrito + ", Hidalgo a " + this.generarfecha(),
            style: "Fecha",
            alignment: "right",
          },
          {
            text: "\n\n\n\n\n\n\n\n\nNombre: " + "\n",
            style: "Textob",
          },
          {
            text: this.nombre + "\n\n",
            style: "Texto",
          },

          {
            text: "Apellido Paterno: ",
            style: "Textob",
          },
          {
            text: this.aPaterno + "\n\n",
            style: "Texto",
          },
          {
            text: "Apellido Materno: " + "\n",
            style: "Textob",
          },
          {
            text: this.aMaterno + "\n\n",
            style: "Texto",
          },
          {
            text: "Alias: " + "\n",
            style: "Textob",
          },
          {
            text: this.alias + "\n\n",
            style: "Texto",
          },
          {
            text: "CURP: " + "\n",
            style: "Textob",
          },
          {
            text: this.curp + "\n\n",
            style: "Texto",
          },

          {
            text: "Fecha de Nacimiento: " + "\n",
            style: "Textob",
          },
          {
            text: this.fechaNacimiento + "\n\n",
            style: "Texto",
          },

          {
            text: "RFC: " + "\n",
            style: "Textob",
          },
          {
            text: this.rfc + "\n\n",
            style: "Texto",
          },
          {
            text: "Telefono 1: " + "\n",
            style: "Textob",
          },
          {
            text: this.telefono1 + "\n\n",
            style: "Texto",
          },
          {
            text: "Telefono 2 : " + "\n",
            style: "Textob",
          },
          {
            text: this.telefono2 + "\n\n",
            style: "Texto",
          },
          {
            text: "Dirección : " + "\n",
            style: "Textob",
          },
          {
            text: this.direc + "\n\n",
            style: "Texto",
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
          Textob: {
            fontSize: 10,
            alignment: "justify",
            bold: true,
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
