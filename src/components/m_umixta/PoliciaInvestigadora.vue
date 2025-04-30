<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Policia Investigadora.</v-toolbar-title
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
        :items="RActosInvestigacion"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.uUsuario }}</td>
          <td>{{ props.item.fechaSolicitud }}</td>
          <td>{{ props.item.nodeSolicitudf }}</td>
          <td>{{ props.item.status }}</td>
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
              <span>Imprimir Acto de Investigación</span>
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
            <v-toolbar-title
              >Solicitud a policia investigadora.</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn color="success" text @click.native="imprimirSP()">
                Vista previa</v-btn
              >

              <v-btn icon @click="modalAdd = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-divider></v-divider>

          <v-card elevation="0" class="mb-5" height="auto">
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12 lg12>
                  <p class="font-weight-regular regular">
                    Información para la solicitud de actos de investigación.
                  </p>
                  <v-autocomplete
                    name="actos de investigación"
                    :items="actosinvestigacion"
                    v-model="actoinvestigacion"
                    label="*Actos de investigación:"
                    v-validate="'required'"
                    return-object
                    attach
                    chips
                    deletable-chips
                    multiple
                    v-on:change="ordenar"
                    :error-messages="errors.collect('actos de investigación')"
                  >
                  </v-autocomplete>
                </v-flex>

                <v-flex xs12 sm12 md12 lg12>
                  <v-card auto-grow elevation="0">
                    <v-card-text>
                      <v-list three-line>
                        <v-data-table :items="actoinvestigacion" hide-actions>
                          <template
                            slot="items"
                            class="white"
                            slot-scope="props"
                          >
                            <td class="caption1">{{ props.item.text }}</td>
                          </template>
                        </v-data-table>
                      </v-list>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 sm12 md6 lg6>
                  <v-switch
                    @change="listarActosInvestigacion"
                    v-model="rautorizacionj"
                    :label="`Requiere Autorización de juez: ${textosino}`"
                    color="success"
                  ></v-switch>
                </v-flex>
                <v-flex xs12 sm12 md6 lg6>
                  <v-text-field
                    name="número de oficio"
                    label="*Número de oficio:"
                    v-model="numerooficio"
                    v-validate="'required'"
                    :error-messages="errors.collect('número de oficio')"
                  >
                  </v-text-field>

                  <v-autocomplete
                    name="policia investigadora"
                    :items="sps"
                    v-model="sp"
                    label="*Policia Investigadora:"
                    v-validate="'required'"
                    return-object
                    :error-messages="errors.collect('policia investigadora')"
                  >
                  </v-autocomplete>
                </v-flex>
                <v-flex xs12 md12 lg12>
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
                      <span>Generar Texto de documento</span>
                    </v-tooltip>
                    <v-card-title class="accent">
                      <h3>*Texto de Acto de Investigación</h3>
                    </v-card-title>
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
                >Guardar Actos de Investigación</v-btn
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
    RActosInvestigacion: [],
    actosinvestigacion: [],
    actoinvestigacion: [],

    aspid: "",
    nombreAgencia: "",
    origenDirSub: "",
    nombreDirSub: "",
    responsable: "",
    nombreServicio: "",
    descripcion: "",
    requisitos: "",
    materia: "",
    puesto: "",
    textolibre: "",
    atencionVictimas: "",
    ModalServicioPericial: 0,
    fecha: "",
    conindicio: false,
    textindi: "No",
    agenciainfo: "",
    comillas: '"',
    botonvistaprev: true,
    indicios: [],
    indicio: "",
    rautorizacionj: false,
    sps: [],
    sp: "",
    //*************** */
    personaId: "",
    personas: [],
    nombre: "",
    modaldocumento: "",
    textofinal: "",
    aux: "",
    listaf: "",
    numerooficio: "",
    numeromaximo: "",
    //*************** */
    headers: [
      { text: "Emitido por", value: "uusuario" },
      { text: "Fecha de solicitud", value: "fechasolicitud", sortable: false },
      { text: "No de solicitud", value: "nodeSolicitudf" },
      { text: "Status", value: "status", sortable: false },
      { text: "Opciones", value: "opciones", sortable: false },
    ],
    headers2: [
      { text: "Nombre", value: "nombre", sortable: false, class: "mytable" },
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
    fecha: "",

    step: 1,
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
    u_nodistrito: "",
    idactoinve:"",
    //----------------------------------------------------
    texto: 'Vista Previa',
    qrCode: null,
    docActoInv: 'Acto de investigación',
    vistaPreviaTF: true,

    //----------------------------------------------------
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
      me.u_nodistrito = me.$store.state.usuario.nodistrito;

      //*********************************************** */
      me.listarRActosInvestigacion();
      me.listarLogo();
      me.listarActosInvestigacion();
      me.listarrHecho();
      me.obtenernumeromaximo();
      me.listarSP();
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
    textoswitch() {
      if (this.conindicio) return "Si";
      else return "No";
    },
    textosino() {
      if (this.rautorizacionj) return "Si";
      else return "No";
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
    cerrarcarpeta() {
      this.$store.state.rHechoId = null;
      this.$store.state.nuc = null;
      this.$router.push("./umixta-carpetas");
    },
    agregar() {
      this.limpiar();
      this.conindicio = false;
      this.origenDirSub = "";
      this.fecha = "";
      this.responsable = "";
      this.nombreDirSub = "";
      this.textolibre = "";
      this.nombre = "";
      this.puesto = "";
      this.serviciopericialeId = "";
      this.personaId = "";
      this.nombreAgencia = "";
      this.requisitos = "";
      this.descripcion = "";
      this.textofinal = "";
      this.botonvistaprev = true;
      this.modalAdd = 1;
    },
    close() {
      this.modalAdd = 0;
    },
    limpiar() {
      this.origenDirSub = "";
      this.fecha = "";
      this.responsable = "";
      this.nombreDirSub = "";
      this.textolibre = "";
      this.nombre = "";
      this.puesto = "";
      this.actoinvestigacion = [];
      this.personaId = "";
      this.nombreAgencia = "";
      this.requisitos = "";
      this.descripcion = "";
      this.indicio = "";
      this.editedIndex = -1;
      this.ModalServicioPericial = 0;
      this.numerooficio = "";
      this.sp = "";
      this.qrCode =  null;
      this.vistaPreviaTF =  true;
    },
    obtenernumeromaximo() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get(
          "api/RActosInvestigacion/ObtenernumeroMaximoporDistrito/" +
            me.u_nodistrito,
          configuracion
        )
        .then(function (response) {
          me.numeromaximo = response.data;
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
            me.$notify("No hay registros previos", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listarRActosInvestigacion() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get(
          "api/RActosInvestigacion/Listarporid/" + me.rHechoId,
          configuracion
        )
        .then(function (response) {
          me.RActosInvestigacion = response.data;
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
    listarActosInvestigacion() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var actosinvestigacionArray = [];
      var cont = 1;
      me.actosinvestigacion = [];
      me.actoinvestigacion = [];
      if (me.rautorizacionj) {
        me.$conf
          .get("api/ActoInvestigacion/ListarRequiere", configuracion)
          .then(function (response) {
            me.aux = response.data;
            actosinvestigacionArray = response.data;
            actosinvestigacionArray.map(function (x) {
              me.actosinvestigacion.push({
                text: x.nombre,
                value: x.idActonvestigacion,
                descripcion: x.descripcion,
                nombre: x.nombre,
                conta: cont,
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
      } else {
        me.$conf
          .get("api/ActoInvestigacion/ListarNoRequiere", configuracion)
          .then(function (response) {
            me.aux = response.data;
            actosinvestigacionArray = response.data;
            actosinvestigacionArray.map(function (x) {
              me.actosinvestigacion.push({
                text: x.nombre,
                value: x.idActonvestigacion,
                descripcion: x.descripcion,
                nombre: x.nombre,
                conta: cont,
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
      }
    },
    convertir(romano) {
      if (romano == "I") return 1;
      if (romano == "II") return 2;
      if (romano == "III") return 3;
      if (romano == "IV") return 4;
      if (romano == "V") return 5;
      if (romano == "VI") return 6;
      if (romano == "VII") return 7;
      if (romano == "VIII") return 8;
      if (romano == "IX") return 9;
      if (romano == "X") return 10;
      if (romano == "XI") return 11;
      if (romano == "XII") return 12;
      if (romano == "XIII") return 13;
      if (romano == "XIV") return 14;
      if (romano == "XV") return 15;
      if (romano == "Na") return 99;
    },
    ordenar() {
      this.actoinvestigacion.sort((a, b) => (a.numerico > b.numerico ? 1 : -1));
    },
    imprimirdiligencia(item) {
      let me = this;
      this.numerooficio = item.numeroOficio;
      this.origenDirSub = item.uDirSubPro;
      this.fecha = item.fechaSolicitud;
      this.nombreDirSub = item.dirSubPro;
      this.textolibre = item.especificaciones;
      this.puesto = item.uPuesto;
      this.textofinal = item.textofinal;
      this.editedIndex = 1;
      this.ModalServicioPericial = 1;

      me.vistaPreviaTF = false,
      me.generarQR(me.docActoInv,me.nuc,item.uUsuario,item.fechaSys,item.idRActosInvestigacion);

      
      setTimeout(() => 
      {
        this.imprimirpdf(item.uUsuario, item.uPuesto, item.uAgencia);
        this.modaldocumento = false;
      }, 1000);

      
    },
    listarTL() {
      let me = this;
      this.$validator.validate().then((result) => {
        if (result) {
          me.botonvistaprev = false;
          me.nombre = me.personaId.text;
          var lista = "";
          if (me.rautorizacionj)
            //textosi
            me.textolibre =
              "<p>Por medio de la presente, solicicto  los siguientes actos de investigación:";
          //textono
          else
            me.textolibre =
              "<p>Por medio de la presente, solicito los siguientes actos de investigación:";
          for (var z = 0; z < me.actoinvestigacion.length; z++) {
            lista += me.actoinvestigacion[z].text + "<br>";
          }
          me.textofinal =
            "<b>Puesto a quien va dirigido</b><br><p><p>" +
            "<p>PRESENTE.</p> <p><br></p>" +
            "<p><br></p>" +
            me.textolibre +
            "<p><br></p><p><br></p>" +
            lista +
            "<br>" +
            "<p>Agradeciendo de antemano la atención brindada a mi petición.</p>";

          me.listaf = lista;
        }
      });
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

    imprimirSP() {
      let me = this;

      var now = moment();
      me.generarQR(me.docActoInv,me.nuc,me.u_nombre,now,me.idactoinve);

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
            me.mostrarpdf(me.u_nombre, me.u_puesto, me.u_agencia);
          }
        });
      }
    },
    listarSP() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var sparrays = "";
      me.$conf
        .get(
          "api/SpPiLigaciones/ListarPertenecienteyGeneralPI/" +
            me.$store.state.keymodulo,
          configuracion
        )
        .then(function (response) {
          sparrays = response.data;
          sparrays.map(function (x) {
            me.sps.push({ text: x.dspn, value: x.dspId, value2: x.distritoId });
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
            me.$notify("No hay registros previos", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    ocultarformatoSP() {
      this.limpiar();
      this.ModalServicioPericial = 0;
    },
    crearPDF_SP() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      var serviciostab = "";
      for (var i = 0; i < me.actoinvestigacion.length; i++) {
        serviciostab += me.actoinvestigacion[i].nombre;
        if (i + 1 != me.actoinvestigacion.length) serviciostab += "; ";
      }

      var descripcionRegTabI =
        "Registro de solicitud de policia investigadora a " +
        me.sp.text +
        " para acto de investigacion de " +
        serviciostab;

      if (me.editedIndex == 1) {
      } else {
        me.origenDirSub = me.u_dirSubPro;
        me.$confirm(
          "Esperando confirmación",
          "Estas seguro de  que deseas guardar información e imprimir el documento. Una vez realizada esta accion no prodra realizar cambios",
          function () {
            me.numeromaximo.numeroMaximo++;

            me.$CAT
              .post(
                "api/RActosInvestigacion/Crear",
                {
                  rHechoId: me.rHechoId,
                  fechasolicitud: me.fecha,
                  status: "Solicitado",
                  servicios: me.sp.value2,
                  especificaciones: "",
                  cdetenido: me.rautorizacionj,
                  respuestas: " ",
                  nuc: me.nuc,
                  textofinal: me.textofinal,
                  uDirSubPro: me.u_dirSubPro,
                  uUsuario: me.u_nombre,
                  uPuesto: me.u_puesto,
                  uModulo: me.u_modulo,
                  uAgencia: me.u_agencia,
                  numeroOficio: me.numerooficio,
                  NodeSolicitud: me.numeromaximo.numeroMaximo,
                  NumeroDistrito: me.u_nodistrito,
                  DSPDEstino: me.sp.value,
                  DistritoId: me.u_iddistrito,
                },
                configuracion
              )
              .then(function (response) {
                me.idactoinve= response.data.idactoinve;

                for (var i = 0; i < me.actoinvestigacion.length; i++) {
                  me.$CAT
                    .post(
                      "api/RActosInvestigacion/Creardetalle",
                      {
                        rActosInvestigacionId: response.data.idactoinve,
                        servicio: me.actoinvestigacion[i].nombre,
                        servicioNM: "",
                        status: "Solicitado",
                        textoFinal: "",
                        fechaRecibido: "",
                        fechaAceptado: "",
                        fechaFinalizado: "",
                        fechaEntregado: "",
                        respuesta: "",
                        conclusion: "",
                        uDirSubPro: "",
                        uUsuario: "",
                        uPuesto: "",
                        uModulo: "",
                        uAgencia: "",
                      },
                      configuracion
                    )
                    .then(function (response) {
                      me.crearRegistroTableroI(descripcionRegTabI);
                      
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
                }
                me.$notify(
                  "La información se guardo correctamente !!!",
                  "success"
                );
                me.vistaPreviaTF = false;
                var now = moment();
                me.generarQR(me.docActoInv,me.nuc,me.u_nombre,now,me.idactoinve);

                
                setTimeout(() => 
                {
                  me.imprimirpdf(me.u_nombre, me.u_puesto, me.u_agencia);
                  me.modaldocumento = false;
                  me.ModalServicioPericial = 0;
                  me.listarRActosInvestigacion();
                  me.obtenernumeromaximo();
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
            text: "Número de oficio: " + this.numerooficio,
            style: "Nooficio",
            alignment: "right",
            absolutePosition: { x: 85, y: 110 },
          },
          {
            text:
              "\n" +
              this.u_distrito +
              ", Hidalgo a " +
              this.fecha +
              "\n\n\n\n\n\n\n\n",
            style: "Fecha",
            alignment: "right",
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

.caption1 {
  font-size: 12px !important;
  text-align: center !important;
  padding: 0 0px !important;
  height: 20px !important;
  border-left: 0px solid #aaaaaa;
  border-top: 0px solid #aaaaaa;
  border-bottom: 0px solid #aaaaaa;
  border-right: 0px solid #aaaaaa;
}

.mytable {
  font-size: 12px !important;
  text-align: center !important;
  padding: 0 0px !important;
  height: 20px !important;
  border-left: 0px solid #aaaaaa;
  border-top: 0px solid #aaaaaa;
  border-bottom: 0px solid #aaaaaa;
  border-right: 0px solid #aaaaaa;
}
</style>
