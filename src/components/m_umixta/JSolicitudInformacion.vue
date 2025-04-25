<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Solicitudes de Información</v-toolbar-title
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

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              class="mx-2"
              slot="activator"
              v-on="on"
              @click="agregar()"
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
              props.item.fechasys.substring(8, 10) +
              " de " +
              obtenermes(props.item.fechasys.substring(5, 7) - 1) +
              " del " +
              props.item.fechasys.substring(0, 4) +
              ", " +
              props.item.fechasys.substring(11, 19)
            }}
          </td>

          <td>
            <div v-if="props.item.tipoDoc == 1">
              <span class>Investigación y Litigación Región Oriente</span>
            </div>
            <div v-else-if="props.item.tipoDoc == 2">
              <span class>Medidas Cautelares y Policía Procesal</span>
            </div>
            <div v-else-if="props.item.tipoDoc == 3">
              <span class
                >Centro de Justicia Restaurativa Penal Región Oriente</span
              >
            </div>
            <div v-else-if="props.item.tipoDoc == 4">
              <span class>Investigación y Litigación Región Poniente</span>
            </div>
            <div v-else-if="props.item.tipoDoc == 5">
              <span class
                >Fiscalía de Delitos contra Personas Defensoras de Derechos
                Humanos y Periodistas</span
              >
            </div>
            <div v-else-if="props.item.tipoDoc == 6">
              <span class>Fiscalía de Delitos de Tortura</span>
            </div>
            <div v-else-if="props.item.tipoDoc == 7">
              <span class>Fiscalía Especializada en Delitos Electorales</span>
            </div>
            <div v-else-if="props.item.tipoDoc == 8">
              <span class>Fiscalía Especializada en Delitos de Corrupción</span>
            </div>
            <div v-else-if="props.item.tipoDoc == 9">
              <span class>Fiscalía de Delitos de Desaparición de Personas</span>
            </div>
            <div v-else-if="props.item.tipoDoc == 10">
              <span class
                >Unidad de Especializada de Homicidios y Narcomenudeo</span
              >
            </div>
            <div v-else-if="props.item.tipoDoc == 11">
              <span class>Unidad de Recuperación de Vehículos</span>
            </div>
            <div v-else-if="props.item.tipoDoc == 12">
              <span class
                >Unidad de Unidad Especializada en la Investigación de Delitos
                en contra los Animales</span
              >
            </div>
            <div v-else-if="props.item.tipoDoc == 13">
              <span class
                >Unidad de Unidad Especializada en Combate al Secuestro</span
              >
            </div>
            <div v-else-if="props.item.tipoDoc == 14">
              <span class>Subprocuraduría Jurídica y de Derechos Humanos</span>
            </div>
            <div v-else-if="props.item.tipoDoc == 15">
              <span class
                >Subprocuraduría de Delitos de Género, Desaparición de personas
                e Impacto Social</span
              >
            </div>
            <div v-else-if="props.item.tipoDoc == 16">
              <span class>Visitaduría</span>
            </div>
          </td>

          <td>{{ props.item.correo }}</td>
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
            <v-toolbar-title
              >Registro de solicitud de información</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                v-if="tsol.value == 1"
                color="success"
                text
                @click="generarpdf()"
                >Vista previa</v-btn
              >
              <v-btn
                v-if="tsol.value == 2"
                color="success"
                text
                @click="generarpdf2()"
                >Vista previa</v-btn
              >
              <v-btn
                v-if="tsol.value == 3"
                color="success"
                text
                @click="generarpdf3()"
                >Vista previa</v-btn
              >
              <v-btn
                v-if="tsol.value >= 4 && tsol.value <= 16"
                color="success"
                text
                @click="generarpdf()"
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
                  name="tipo soliitud"
                  :items="tipossolicitudes"
                  v-model="tsol"
                  v-validate="'required'"
                  label="*Tipo de Solicitud:"
                  return-object
                  :error-messages="errors.collect('tipo soliitud')"
                >
                </v-select>
                <v-text-field
                  name="número de oficio"
                  label="*Número de oficio:"
                  v-model="numoficio"
                  v-validate="'required'"
                  :error-messages="errors.collect('número de oficio')"
                >
                </v-text-field>

                <v-text-field
                  name="causas penal"
                  label="*Causa penal:"
                  v-model="causapenal"
                  v-validate="'required'"
                  :error-messages="errors.collect('causas penal')"
                >
                </v-text-field>
              </v-flex>

              <v-flex class="espaciado" xs12 sm12 md6 lg6>
                <v-text-field
                  name="puestos"
                  :items="cargo"
                  label="*Cargo a quien va dirigido:"
                  v-model="puesto"
                  v-validate="'required'"
                  :error-messages="errors.collect('puestos')"
                >
                </v-text-field>

                <v-autocomplete
                  name="imputados"
                  :items="imputados"
                  v-model="imputado"
                  label="*Nombre del imputado:"
                  v-validate="'required'"
                  return-object
                  :error-messages="errors.collect('imputados')"
                >
                </v-autocomplete>
                <v-text-field
                  name="correos"
                  label="*Correo:"
                  v-model="correo"
                  v-validate="'required'"
                  :error-messages="errors.collect('correos')"
                >
                </v-text-field>
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
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn color="success" text @click.native="guardar()"
                >Guardar formulación</v-btn
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
import { generarQRCodeBase64 } from './crearQR';

export default {
  components: {
    "vue2-editor": VueEditor,
    n401,
    n403,
  },
  data: () => ({
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
    direccion: [],
    direc: "",
    causapenal: "",
    detenidos: [],
    texto: "",
    texto2: "",
    modaldocumento: false,
    comilla: '"',
    personarelacionadas: [],
    direccion: [],
    direcciones: "",
    imputados: [],
    cargo: [],
    imputado: "",
    puesto: "",
    fecha: "",
    correo: "",
    fechan: "",
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
      { text: "Fecha de emisión", value: "fechasys" },
      { text: "Tipo de solicitud", value: "tipoDoc" },
      { text: "Correo", value: "correo" },
      { text: "Opciones", value: "opcion", sortable: false },
    ],
    tipossolicitudes: [
      { text: "Investigación y Litigación Región Oriente", value: "1" },
      { text: "Medidas Cautelares  y Policía Procesal", value: "2" },
      {
        text: "Centro de Justicia Restaurativa Penal Región Oriente",
        value: "3",
      },
      { text: "Investigación y Litigación Región Poniente", value: "4" },
      {
        text: "Fiscalía de Delitos contra Personas Defensoras de Derechos Humanos y Periodistas",
        value: "5",
      },
      { text: "Fiscalía de Delitos de Tortura", value: "6" },
      { text: "Fiscalía Especializada en Delitos Electorales", value: "7" },
      { text: "Fiscalía Especializada en Delitos de Corrupción", value: "8" },
      { text: "Fiscalía de Delitos de Desaparición de Personas", value: "9" },
      {
        text: "Unidad de Especializada de Homicidios y Narcomenudeo",
        value: "10",
      },
      { text: "Unidad de Recuperación de Vehículos", value: "11" },
      {
        text: "Unidad de Unidad Especializada en la Investigación de Delitos en contra los Animales",
        value: "12",
      },
      {
        text: "Unidad de Unidad Especializada en Combate al Secuestro",
        value: "13",
      },
      { text: "Subprocuraduría Jurídica y de Derechos Humanos", value: "14" },
      {
        text: "Subprocuraduría de Delitos de Género, Desaparición de personas e Impacto Social",
        value: "15",
      },
      { text: "Visitaduría", value: "16" },
    ],
    // tcita:1,
    tsol: "",
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
    docSolicitudInfo: 'Solicitud de informacion',
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
      me.listarimputados();
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

    generarpdf() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.fecha = this.generarfecha();
          this.texto2 =
            this.puesto +
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

          this.texto =
            "Por este medio solicito a usted informe si " +
            this.imputado.text +
            ", " +
            "quien se encuentra en calidad de imputado dentro de la causa penal al rubro citada, cuenta con antecedentes penales, sentencia definitiva  y así mismo si cuenta con Orden de Aprehensión, Reaprehensión o Comparecencia vigente, o bien si ha celebrado previamente acuerdo reparatorio o suspensión condicional o procedimiento abreviado y en caso de ser positivo indique si los acuerdos y/o suspensiones han sido cumplidos, la fecha de celebración de los mismos y el delito por el cual se celebraron.  Esto de ser de utilidad para la presente causa penal." +
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
            "Con fundamento en los artículo 17 párrafo cuarto  y 18 párrafo sexto de la Constitución  Política de los Estados unidos Mexicanos; 191, 192, 193,  195,  200,  del Código Nacional de Procedimientos Penales;  5 de la Ley Orgánica del Ministerio Publico del Estado de Hidalgo." +
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
            "Agradeciendo de antemano su valioso apoyo, autorizo que la misma pueda ser remitida vía a la siguiente dirección correo electrónico: " +
            this.correo +
            ".";
          this.mostrarpdf(this.u_nombre, this.u_puesto, this.u_agencia);
        }
      });
    },

    generarpdf2() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.fecha = this.generarfecha();

          this.texto2 =
            this.puesto +
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

          this.texto =
            "Por este medio solicito, informe si " +
            this.imputado.text +
            ", " +
            "en calidad de imputados han realizado alguna SUSPENSIÓN CONDICIONAL DEL PROCESO, en alguna carpeta de investigación distinta a la señalada al rubro, y en caso de ser positivo proporcione número de NUC, número de Causa y estado en que se encuentra la suspensión. Esto de ser de utilidad para la presente causa penal." +
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
            "Con fundamento en los artículos 17 párrafo cuarto y 18 párrafo sexto de la Constitución  Política de los Estados unidos Mexicanos; 191, 192, 193, 195, 200,  del Código Nacional de Procedimientos Penales." +
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
            "Autorizando que la información pueda ser remitida vía a la siguiente dirección correo electrónico: " +
            this.correo +
            ".";
          this.mostrarpdf(this.u_nombre, this.u_puesto, this.u_agencia);
        }
      });
    },

    generarpdf3() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.fecha = this.generarfecha();
          this.texto2 =
            this.puesto +
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

          this.texto =
            "Por este medio solicito a usted informe si el " +
            this.imputado.text +
            ", con número de CURP " +
            this.imputado.curp +
            ", con fecha de nacimiento " +
            this.imputado.fn +
            " quien se encuentra en calidad de imputado dentro de la causa penal al rubro citada, cuenta en la Base de Datos Nacional con antecedentes de haber celebrado previamente Acuerdo Reparatorio, y en caso de ser positivo, indique si el acuerdo fue de cumplimiento inmediato o diferido, si fueron cumplidos, la fecha de celebración de los mismos y el delito por el cual se celebraron.  Esto de ser de utilidad para la presente causa penal." +
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
            "Con fundamento en los artículo 17 párrafo cuarto  y 18 párrafo sexto de la Constitución  Política de los Estados unidos Mexicanos; 191, 192, 193,  195,  200,  del Código Nacional de Procedimientos Penales;  5 de la Ley Orgánica del Ministerio Publico del Estado de Hidalgo." +
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
            "Autorizando que la información pueda ser remitida vía a la siguiente dirección correo electrónico: " +
            this.correo;

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
            me.imputados.push({
              text: x.nombreCompleto,
              value: x.idRAP,
              curp: x.curp,
              fn: x.fechaNacimiento,
            });
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
          me.direcciones =
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

    guardar() {
      this.$validator.validate().then((result) => {
        if (result) {
          let me = this;
          let header = { Authorization: "Bearer " + this.$store.state.token };
          let configuracion = { headers: header };

          me.$confirm(
            "Esperando confirmación",
            "Estas seguro de  que deseas guardar información ",
            function () {
              me.$IL
                .post(
                  "api/SolicitudInformacion/Crear",
                  {
                    TipoDoc: me.tsol.value,
                    CodOficio: me.numoficio,
                    Nuc: me.nuc,
                    RHechoId: me.rHechoId,
                    CausaPenal: me.causapenal,
                    Dirigidoa: me.nombreenc,
                    Puesto: me.puesto,
                    Imputado: me.imputado.text,
                    Correo: me.correo,
                    CURP: me.imputado.curp,
                    Fnacimiento: me.imputado.fn,
                    UDistrito: me.u_distrito,
                    USubproc: me.u_dirSubPro,
                    UAgencia: me.u_agencia,
                    Usuario: me.u_nombre,
                    UPuesto: me.u_puesto,
                    UModulo: me.u_modulo,
                  },
                  configuracion
                )
                .then(function (response) {
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
      this.tsol = "";
      this.numoficio = "";
      this.causapenal = "";
      this.delito = "";
      this.nombreenc = "";
      this.puesto = "";
      this.imputado = "";
      this.correo = "";
      this.qrCode = null;
      this.vistaPreviaTF = true;

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
        .get("api/SolicitudInformacion/Listar/" + me.rHechoId, configuracion)
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
      me.numoficio = item.codOficio;
      me.causapenal = item.causaPenal;
      me.nombreenc = item.dirigidoa;
      me.puesto = item.puesto;
      me.imputado = item.imputado;
      var imputadofn = item.fnacimiento;
      var imputadoc = item.curp;
      me.tsol = item.tipoDoc;
      me.correo = item.correo;
      var fechn = "";
      var agente = item.usuario;
      var agencia = item.uAgencia;
      var puesto = item.uPuesto;
      var subproc = item.uSubproc;

      if (item.tipoDoc == 1) {
        //primer pdf----------------------------------------------------
        this.fecha =
          item.fechasys.substring(8, 10) +
          " de " +
          this.obtenermes(item.fechasys.substring(5, 7) - 1) +
          " del " +
          item.fechasys.substring(0, 4);
        this.texto2 =
          this.puesto +
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

        this.texto =
          "Por este medio solicito a usted informe si " +
          this.imputado +
          ", " +
          "quien se encuentra en calidad de imputado dentro de la causa penal al rubro citada, cuenta con antecedentes penales, sentencia definitiva  y así mismo si cuenta con Orden de Aprehensión, Reaprehensión o Comparecencia vigente, o bien si ha celebrado previamente acuerdo reparatorio o suspensión condicional o procedimiento abreviado y en caso de ser positivo indique si los acuerdos y/o suspensiones han sido cumplidos, la fecha de celebración de los mismos y el delito por el cual se celebraron.  Esto de ser de utilidad para la presente causa penal." +
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
          "Con fundamento en los artículo 17 párrafo cuarto  y 18 párrafo sexto de la Constitución  Política de los Estados unidos Mexicanos; 191, 192, 193,  195,  200,  del Código Nacional de Procedimientos Penales;  5 de la Ley Orgánica del Ministerio Publico del Estado de Hidalgo." +
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
          "Agradeciendo de antemano su valioso apoyo, autorizo que la misma pueda ser remitida vía a la siguiente dirección correo electrónico: " +
          this.correo +
          ".";
      } else if (item.tipoDoc == 2) {
        //segundo pdf
        this.fecha =
          item.fechasys.substring(8, 10) +
          " de " +
          this.obtenermes(item.fechasys.substring(5, 7) - 1) +
          " del " +
          item.fechasys.substring(0, 4);
        this.texto2 =
          this.puesto +
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
        this.texto =
          "Por este medio solicito, informe si " +
          this.imputado +
          ", " +
          "en calidad de imputados han realizado alguna SUSPENSIÓN CONDICIONAL DEL PROCESO, en alguna carpeta de investigación distinta a la señalada al rubro, y en caso de ser positivo proporcione número de NUC, número de Causa y estado en que se encuentra la suspensión. Esto de ser de utilidad para la presente causa penal." +
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
          "Con fundamento en los artículos 17 párrafo cuarto y 18 párrafo sexto de la Constitución  Política de los Estados unidos Mexicanos; 191, 192, 193, 195, 200,  del Código Nacional de Procedimientos Penales." +
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
          "Autorizando que la información pueda ser remitida vía a la siguiente dirección correo electrónico: " +
          this.correo +
          ".";
      } else if (item.tipoDoc == 3) {
        //pdf 3-------------------------------------------------------------------
        this.fecha =
          item.fechasys.substring(8, 10) +
          " de " +
          this.obtenermes(item.fechasys.substring(5, 7) - 1) +
          " del " +
          item.fechasys.substring(0, 4);
        fechn =
          imputadofn.substring(0, 2) +
          " de " +
          this.obtenermes(imputadofn.substring(3, 5) - 1) +
          " de " +
          imputadofn.substring(6, 11);
        this.texto2 =
          this.puesto +
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

        this.texto =
          "Por este medio solicito a usted informe si el " +
          this.imputado +
          ", con número de CURP " +
          imputadoc +
          ", con fecha de nacimiento " +
          fechn +
          " quien se encuentra en calidad de imputado dentro de la causa penal al rubro citada, cuenta en la Base de Datos Nacional con antecedentes de haber celebrado previamente Acuerdo Reparatorio, y en caso de ser positivo, indique si el acuerdo fue de cumplimiento inmediato o diferido, si fueron cumplidos, la fecha de celebración de los mismos y el delito por el cual se celebraron.  Esto de ser de utilidad para la presente causa penal." +
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
          "Con fundamento en los artículo 17 párrafo cuarto  y 18 párrafo sexto de la Constitución  Política de los Estados unidos Mexicanos; 191, 192, 193,  195,  200,  del Código Nacional de Procedimientos Penales;  5 de la Ley Orgánica del Ministerio Publico del Estado de Hidalgo." +
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
          "Autorizando que la información pueda ser remitida vía a la siguiente dirección correo electrónico: " +
          this.correo +
          ".";
      }

      me.vistaPreviaTF = false;
      me.generarQR(me.docSolicitudInfo,me.nuc,item.usuario,item.fechasys,item.idSolicitudInfo);

      setTimeout(() => 
      {
        me.imprimirpdf(item.usuario, item.uPuesto, item.uAgencia);
        me.modaldocumento = false;
      }, 1000);

      
    },
    mostrarpdf(nombre, puesto, agencia) {
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
      var doc = pdfMake.createPdf(dd).print();

      setTimeout(() => 
      {
        me.limpiar();
      }, 1000);
      
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
      var u_distrito = this.u_distrito;
      var nuc = this.nuc;
      var causapenal = this.causapenal;

      var nooficio = this.numoficio;
      var fecha = this.fecha;

      //***************************************************************************** */
      var html2 = htmlToPdfmake(this.texto);
      var html3 = htmlToPdfmake(this.texto2);
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
          "<u>Solicitud de Información</u>" +
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
          "><br></p>"
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
              "CAUSA PENAL: " +
              causapenal +
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
          {
            text: html3,
            style: "DePara",
            alignment: "justify",
            margin: [0, 50, 200, 0],
          },
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
