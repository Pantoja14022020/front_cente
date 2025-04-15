<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Notificación</v-toolbar-title
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
        :items="citatorios"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.usuario }}</td>
          <td>{{ props.item.modulo }}</td>
          <td>{{ props.item.nombrePersona }}</td>
          <td>{{ props.item.fechaReporte }}</td>
          <td class="justify-center layout px-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2" v-on="on" @click="editItem(props.item)">
                  edit
                </v-icon>
              </template>
              <span>Editar registro</span>
            </v-tooltip>
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
              <span>Imprimir</span>
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
            <v-toolbar-title>{{ formTitle }}.</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                v-if="indexmenus == 1"
                @click="guardarregistro()"
                color="success"
                >Vista previa</v-btn
              >

              <v-btn
                v-if="indexmenus == 2"
                @click="guardaredit2()"
                color="success"
                >Vista previa</v-btn
              >

              <v-btn icon @click="modalAdd = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-flex mx-5>
            <v-card-text>
              <v-form>
                <br />
                <br />

                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    <v-flex class="espaciado" xs12 sm12 md6 lg6>
                      <v-select
                        name="persona"
                        :items="personas"
                        v-model="persona"
                        v-validate="'required'"
                        label="*Persona:"
                        return-object
                        @change="listardirecciones()"
                        :error-messages="errors.collect('persona')"
                      >
                      </v-select>

                      <v-select
                        name="delito"
                        :items="delitos"
                        v-model="delito"
                        v-validate="'required'"
                        label="*Delito:"
                        :error-messages="errors.collect('delito')"
                      >
                      </v-select>
                    </v-flex>

                    <v-flex class="espaciado" xs12 sm12 md6 lg6>
                      <v-text-field
                        label="Domicilio:"
                        name="domicilio"
                        v-model="direnccioninfo"
                      >
                      </v-text-field>

                      <v-text-field
                        label="Referencia:"
                        name="referencia"
                        v-model="referenciainfo"
                      >
                      </v-text-field>
                    </v-flex>

                    <v-flex xs12 sm12 md12 lg12>
                      <v-card elevation="0">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              class="mx-2"
                              slot="activator"
                              v-on="on"
                              @click="generatextodoc()"
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
                          <h3>Texto de la notificación:</h3>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-form data-vv-scope="form1">
                            <vue-editor
                              v-if="textodecitatorio"
                              name="descripcíon"
                              v-model="texto"
                              :editorToolbar="customToolbar"
                            >
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
              <v-btn
                v-if="indexmenus == 1"
                color="success"
                text
                @click.native="guardar()"
                >Guardar Notificación</v-btn
              >
              <v-btn
                v-if="indexmenus == 2"
                color="success"
                text
                @click.native="actualizar()"
                >Actualizar Notificación</v-btn
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
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
import { debug } from "util";
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
    //citatorio
    idcitatorio: "",
    fechacita: "",
    menu1: false,
    personas: [],
    persona: "",
    lugardecita: "",
    delitos: [],
    delito: "",
    descripcioni:
      "[ ] Amonestación<br>[ ] Multa de *** unidades de medida de actualización vigentes en el momento, que equivalen a _______________. <br>[ ] Auxilio de la fuerza pública <br>[ ] Arresto hasta por ________  horas",
    descripcion: "",
    dia: moment().format("DD"),
    mes: moment().format("MMMM"),
    año: moment().format("YYYY"),
    hr: moment().format("h:mm:ss a"),
    fechaactual: "",
    citatorios: [],
    headers: [
      { text: "Emitida por", value: "usuario", sortable: true },
      { text: "Módulo", value: "modulo", sortable: true },
      { text: "Persona", value: "nombrepersona" },
      { text: "Fecha de reporte", value: "fechareporte" },
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
    imprimir: false,
    personal: [],
    direccionesc: [],
    personafinal: [],
    domiciliop: "",
    referenciap: "",
    telefonop: "",
    fechap: "",
    citatorionotificacion: 0,
    menu2: false,
    agenciap: '"domicilio de la agencia y datos completos de la agencia"',
    botonp: true,
    agenciainfo: [
      { text: "direccion", value: "" },
      { text: "telefono", value: "" },
    ],
    comprobaciondireccionescucha: false,
    personal2: "",
    indexprint: "",
    texto: "",
    indexmenus: "",
    guardaredit: true,
    direnccioninfo: "",
    referenciainfo: "",
    personanombrec: "",
    dicc1: "",
    dicc2: "",
    telefono: "",
    acnombre: "",
    acpuesto: "",
    acagencia: "",
    numerooficio: "",
    estadodireccion: true,
    //*************** */

    search: "",
    rowsPerPageItems: [10, 20, 30, 40, 50],
    pagination: {
      rowsPerPage: 20,
    },
    editedIndex: -1,
    modalAdd: false,
    modaldocumento: false,
    aux: false,

    //generar
    camposactivos: true,
    textodecitatorio: false,

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
    idCitatorio_Notificacion:"",
    //----------------------------------------------------
    texto: 'Vista Previa',
    qrCode: null,
    docNotificacion: 'Notificación',
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
      me.listarPersonas();
      me.listardelitos();
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
    formTitle() {
      return this.editedIndex === -1
        ? "Nueva Notificación"
        : "Editar Notificación";
    },
    formIcon() {
      return this.editedIndex === -1 ? "add" : "assignment";
    },
    textosino() {
      if (this.estadodireccion) return "Dirección de notificación/escucha";
      else return "Dirección personal";
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
    editItem(item) {
      let me = this;
      this.limpiar();
      this.acnombre = item.usuario;
      this.acpuesto = item.puesto;
      this.acagencia = item.agencia;
      this.camposactivos = false;
      this.idcitatorio = item.idCitatorio_Notificacion;
      for (var i = 0; i < this.personas.length; i++) {
        if (this.personas[i].text === item.nombrePersona) {
          this.persona = new Object();
          this.persona = this.personas[i];
        }
      }
      this.direnccioninfo = item.domicilioPersona;
      this.telefono = item.telefonoPersona;
      this.referenciainfo = item.referenciaPersona;
      this.personanombrec = item.nombrePersona;
      //this.listardirecciones();
      this.lugardecita = item.lugarCita;
      this.fechacita = item.fechaCita;
      this.delito = item.delito;
      this.fechaactual = item.fechaReporte;
      this.descripcion = item.descripcion;
      this.domiciliop = item.domicilioPersona;
      this.telefonop = item.telefonoPersona;
      this.referenciap = item.referenciaPersona;
      this.fechareportep = item.fechaReporte;
      this.nuc = item.nuc;
      this.textofinal = item.textofinal;
      this.editedIndex = 1;
      this.modalAdd = true;
      this.indexmenus = 2;
      this.textodecitatorio = false;
      this.textofinalactivo = false;
      this.textofinalactivo2 = true;

      me.generarQR(me.docNotificacion,me.nuc,item.usuario,item.fechaSis,item.idCitatorio_Notificacion);
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

    generatextodoc() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.camposactivos = false;
          this.textodecitatorio = true;
          this.fechap =
            this.fechacita.substring(8, 10) +
            " de " +
            this.obtenermes(this.fechacita.substring(5, 7) - 1) +
            " de " +
            this.fechacita.substring(0, 4);

          this.texto = "TEXTO DE NOTIFICACIÓN";
        }
      });
    },
    actualizardoc() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.citatorionotificacion = 1;
        }
      });
    },

    imprimirdoc(item) {
      let me = this;
      this.delito = item.delito;
      this.dicc1 = item.domicilioPersona;
      this.telefono = item.telefonoPersona;
      this.dicc2 = item.referenciaPersona;
      this.personanombrec = item.nombrePersona;
      this.fechaactual = item.fechaReporte;
      this.indexmenus = 0;
      this.texto = item.textofinal;
      this.numerooficio = item.numeroOficio;

      me.vistaPreviaTF = false;
      me.generarQR(me.docNotificacion,me.nuc,item.usuario,item.fechaSis,item.idCitatorio_Notificacion);

      setTimeout(() => 
      {
        this.imprimirpdf(item.usuario, item.puesto, item.agencia);
        this.modaldocumento = false;
      }, 1000);
      
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
    guardarregistro() {

      let me = this;
      //this.dialogoeditor = true;
      this.$validator.validate().then((result) => {
        if (result) {
          this.fechaactual = this.dia + " de " + this.mes + " del " + this.año;
          this.editedIndex = -1;
          this.citatorionotificacion = 1;
          this.personanombrec = this.persona.nombreCompleto;
          this.dicc1 = this.direnccioninfo;
          this.dicc2 = this.referenciainfo;
          this.telefono = this.persona.telefono1;
          this.mostrarpdf(this.u_nombre, this.u_puesto, this.u_agencia);

          var now = moment();
          me.generarQR(me.docNotificacion,me.nuc,me.u_nombre,now,me.idCitatorio_Notificacion);

        }
      });
    },

    guardaredit2() {
      this.$validator.validate().then((result) => {
        if (result) {
          this.mostrarpdf(this.acnombre, this.acpuesto, this.acagencia);
        }
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
    agregar() {
      this.limpiar();
      this.indexmenus = 1;
      this.modalAdd = true;
    },

    crearpdf() {
      this.botonp = false;
      this.crearPDF_CN();
      this.citatorionotificacion = 0;
    },
    close() {
      this.dialog = false;
      this.limpiar();
    },

    limpiar() {
      this.texto = "";
      this.persona = "";
      this.delito = "";
      this.descripcion = this.descripcioni;
      this.textofinalactivo = false;
      this.camposactivos = true;
      this.textodecitatorio = false;
      this.numerooficio = "";
      this.estadodireccion = false;
      this.qrCode = null;
      this.vistaPreviaTF = true;
    },
    listarPersonas() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var contador = 0;
      var personasArray = [];
      axios
        .get("api/RAPs/ListarTodos/" + me.rAtencionId, configuracion)
        .then(function (response) {
          //console.log(response.data)
          me.personal2 = response.data;
          personasArray = response.data;
          personasArray.map(function (x) {
            me.personas.push({
              text: x.nombreCompleto,
              value: x.nombreCompleto,
              value2: x.idRAP,
              value3: x.personaId,
              nombreCompleto: x.nombreCompleto,
              telefono1: x.telefono1,
            });
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
    listardirecciones() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      if (me.estadodireccion) {
        axios
          .get("api/RAPs/ListarDE/" + me.persona.value2, configuracion)
          .then(function (response) {
            me.direccionesc = response.data;
            me.comprobaciondireccionescucha = true;
            me.direnccioninfo =
              " Calle " +
              me.direccionesc["calle"] +
              ", No.Interior: " +
              me.direccionesc["noint"] +
              ", No.Exterior: " +
              me.direccionesc["noext"] +
              ", Codigo postal " +
              me.direccionesc["cp"] +
              " " +
              me.direccionesc["municipio"];
            me.referenciainfo =
              " Entre calles " +
              me.direccionesc["entrecalle1"] +
              " y " +
              me.direccionesc["entrecalle2"];
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
        axios
          .get("api/RAPs/ListarDP/" + me.persona.value3, configuracion)
          .then(function (response) {
            me.direccionesc = response.data;
            me.comprobaciondireccionescucha = true;
            me.direnccioninfo =
              " Calle " +
              me.direccionesc["calle"] +
              ", No.Interior: " +
              me.direccionesc["noint"] +
              ", No.Exterior: " +
              me.direccionesc["noext"] +
              ", Codigo postal " +
              me.direccionesc["cp"] +
              " " +
              me.direccionesc["municipio"];
            me.referenciainfo =
              " Entre calles " +
              me.direccionesc["entrecalle1"] +
              " y " +
              me.direccionesc["entrecalle2"];
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
    listardelitos() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var delitosArray = [];
      axios
        .get("api/RDHs/ListarPorHecho/" + me.rHechoId, configuracion)
        .then(function (response) {
          //console.log(response.data)
          delitosArray = response.data;
          delitosArray.map(function (x) {
            me.delitos.push({ text: x.nombreDelito, value: x.nombreDelito });
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
      axios
        .get(
          "api/Citatorio_Notificacion/Listar/" + me.rHechoId + "/" + false,
          configuracion
        )
        .then(function (response) {
          //console.log(response);
          me.citatorios = response.data;
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
        "Registro de nueva notificacion a " +
        me.persona.text +
        " por el delito de " +
        me.delito;

      me.$confirm(
        "Esperando confirmación",
        "Estas seguro de  que deseas guardar información ",
        function () {
          if (me.comprobaciondireccionescucha) {
            axios
              .post(
                "api/Citatorio_Notificacion/Crear",
                {
                  idCitatorio: me.idcitatorio,
                  rhechoId: me.rHechoId,
                  nombrePersona: me.persona.text,
                  domicilioPersona: me.dicc1,
                  referenciaPersona: me.dicc2,
                  telefonoPersona: me.persona.telefono1,
                  lugarCita: "na",
                  fechaCita: "na",
                  nuc: me.nuc,
                  delito: me.delito,
                  descripcion: me.descripcion,
                  fechaReporte: me.fechaactual,
                  tipo: false,
                  distrito: me.u_distrito,
                  subproc: me.u_dirSubPro,
                  agencia: me.u_agencia,
                  usuario: me.u_nombre,
                  puesto: me.u_puesto,
                  modulo: me.u_modulo,
                  textofinal: me.texto,
                  numeroOficio: me.numerooficio,
                },
                configuracion
              )
              .then(function (response) {
                me.$notify(
                  "La información se guardo correctamente !!!",
                  "success"
                );
                
                me.idCitatorio_Notificacion = response.data.idcitatorio_notificacion;
                me.vistaPreviaTF = false;
                var now = moment();
                me.generarQR(me.docNotificacion,me.nuc,me.u_nombre,now,me.idCitatorio_Notificacion);

                setTimeout(() => 
                {
                  me.imprimirpdf(me.u_nombre, me.u_puesto, me.u_agencia);
                  me.modalAdd = false;
                  me.dialogoeditor = false;
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
          } else {
            me.$notify(
              "La persona no cuenta con direccíon de escucha",
              "error"
            );
          }
        },
        function () {
          alertify.warning("Verifica la información");
        }
      ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
    },
    ocultarformatoCN() {
      this.citatorionotificacion = 0;
    },
    crearRegistroTableroI(descripcionRegTabI) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      axios
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
    actualizar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$confirm(
        "Esperando confirmación",
        "Estas seguro de  que deseas actualizar la información .",
        function () {
          axios
            .put(
              "api/Citatorio_Notificacion/Actualizar",
              {
                idCitatorio_Notificacion: me.idcitatorio,
                nombrePersona: me.persona.text,
                lugarCita: "na",
                delito: me.delito,
                fechaCita: "na",
                descripcion: me.descripcion,
                textofinal: me.texto,
                domicilioPersona:
                  " Calle " +
                  me.direccionesc["calle"] +
                  ", No.Interior: " +
                  me.direccionesc["noint"] +
                  ", No.Exterior: " +
                  me.direccionesc["noext"] +
                  ", Codigo postal " +
                  me.direccionesc["cp"] +
                  " " +
                  me.direccionesc["municipio"],
                referenciaPersona:
                  "Entre calles " +
                  me.direccionesc["entrecalle1"] +
                  " y " +
                  me.direccionesc["entrecalle2"],
                telefonoPersona: me.persona.telefono1,
              },
              configuracion
            )
            .then(function (response) {
              me.$notify(
                "La información se actualizo correctamente !!!",
                "success"
              );

              me.vistaPreviaTF = false;
              setTimeout(() => 
            {
              me.imprimirpdf(me.acnombre, me.acpuesto, me.acagencia);
              me.citatorionotificacion = 0;
              me.modalAdd = false;
              me.dialogoeditor = false;
              me.modaldocumento = false;
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
                me.$notify("No esta autorizado para ver esta pagina", "error");
                me.e403 = true;
                me.showpage = false;
              } else if (err.response.status == 404) {
                me.$notify("El recuso no ha sido encontrado", "error");
              } else {
                me.$notify(
                  "Error al intentar actualizar el registro!!!",
                  "error"
                );
              }
            });
        },
        function () {
          alertify.warning("Verifica la información");
        }
      ).set("labels", { ok: "Actualizar", cancel: "Cancelar" });
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
    mostrarpdf(nombre, puesto, agencia) {
      let me = this;
      
      var dd = me.downloadPdf(nombre, puesto, agencia);
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
      var doc = pdfMake.createPdf(dd).print();
    },
    downloadPdf(nombre, puesto, agencia) {
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
      var u_dirSubPro = this.u_dirSubPro;
      var u_agencia = this.u_agencia;
      var u_subProc = this.u_subproc;
      var nuc = this.nuc;
      //***************************************************************************** */
      var html = htmlToPdfmake(this.texto);
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
            text:
              "Delito: " +
              this.delito +
              "\n\n" +
              "Asunto: Notificación" +
              "\n\n",
            style: "Nooficio",
            alignment: "right",
          },
          {
            text:
              this.u_distrito +
              ", Hidalgo a " +
              this.fechaactual +
              "\n\n\n\n\n\n\n\n",
            style: "Fecha",
            alignment: "right",
          },
          {
            text:
              this.personanombrec +
              "\n\n" +
              this.dicc1 +
              "\n\n" +
              this.dicc2 +
              "\n\n\n",
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
  },
};
</script>

<style>
.espaciado {
  padding: 30px !important;
}
</style>
