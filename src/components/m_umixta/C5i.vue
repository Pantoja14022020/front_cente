<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >C5i Solicitudes</v-toolbar-title
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
        <v-flex xs12 sm6 md3 lg3>
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
        :items="c5"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.uUsuario }}</td>
          <td>{{ props.item.uModulo }}</td>
          <td>{{ props.item.agentequerecibe }}</td>
          <td>
            {{
              props.item.fechaSys.substring(8, 10) +
              " de " +
              obtenermes(props.item.fechaSys.substring(5, 7) - 1) +
              " del " +
              props.item.fechaSys.substring(0, 4) +
              ", " +
              props.item.fechaSys.substring(11, 19)
            }}
          </td>
          <td class="justify-center layout px-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2"
                  v-on="on"
                  color="warning"
                  @click="reimprimir(props.item)"
                >
                  print
                </v-icon>
              </template>
              <span>Reimprimir</span>
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
            <v-toolbar-title>{{ formTitle }}.</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
              <v-btn color="success" text @click="generarpdf()"
                >Vista Previa</v-btn
              >
              <v-btn icon @click="dialogo = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex class="espaciado" xs12 xm12 md6 lg6>
                    <v-text-field
                      name="número de oficio"
                      label="*Número de oficio:"
                      v-model="numerooficio"
                      v-validate="'required'"
                      :error-messages="errors.collect('número de oficio')"
                    />
                    <v-autocomplete
                      name="status"
                      :items="statuseses"
                      v-model="status"
                      return-object
                      v-validate="'required'"
                      label="*Status:"
                      :error-messages="errors.collect('status')"
                    />
                    <v-menu
                      v-if="status.value == 1"
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      :return-value.sync="fechastatus"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          name="Fecha de vencimiento"
                          :value="fechas"
                          label="*Fecha de vencimiento:"
                          prepend-icon="event"
                          clearable
                          readonly
                          v-on="on"
                          v-validate="'required'"
                          :error-messages="
                            errors.collect('Fecha de vencimiento')
                          "
                        />
                      </template>
                      <v-date-picker
                        locale="es"
                        v-model="fechastatus"
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
                    <v-menu
                      v-if="status.value == 1"
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="horas"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          name="Hora de vencimiento"
                          v-model="horas"
                          label="*Hora de vencimiento:"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                          v-validate="'required'"
                          :error-messages="
                            errors.collect('Hora de vencimiento')
                          "
                        />
                      </template>
                      <v-time-picker v-if="menu2" v-model="horas" full-width />
                      <v-card>
                        <v-card-actions>
                          <v-spacer />
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu2.save(horas)"
                            >OK</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-menu>
                  </v-flex>
                  <v-flex class="espaciado" xs12 xm12 md6 lg6>
                    <v-text-field
                      name="agente para entrega de insumos"
                      label="*Agente para entrega de insumos:"
                      v-model="Agentequeseentrega"
                      v-validate="'required'"
                      :error-messages="
                        errors.collect('agente para entrega de insumos')
                      "
                    />
                    <v-text-field
                      name="número telefónico de quién solicita"
                      label="*Número telefonico de quién solicita:"
                      v-model="telefonomp"
                      v-validate="'required'"
                      :error-messages="
                        errors.collect('número telefonico de quién solicita')
                      "
                    />
                    <v-text-field
                      name="correo electrónico de quién solicita"
                      label="*Correo electronico de quién solicita:"
                      v-model="correoelectronicomp"
                      :error-messages="
                        errors.collect('correo electronico de quién solicita')
                      "
                    />
                    <v-text-field
                      name="puesto C5"
                      label="*Nombre:"
                      v-model="direcionc5"
                      v-validate="'required'"
                      :error-messages="errors.collect('puesto C5')"
                    />
                    <v-text-field
                      name="dirección C5"
                      label="*Cargo a quien va dirigido:"
                      v-model="puestoc5"
                      v-validate="'required'"
                      :error-messages="errors.collect('dirección C5')"
                    />
                  </v-flex>
                  <v-flex class="espaciado" xs12 xm12 md12 lg12>
                    <v-card elevation="0">
                      <v-card-title>
                        <h3>Insumos a obtener</h3>
                      </v-card-title>
                    </v-card>
                    <v-checkbox
                      v-model="op1"
                      :label="`Videograbaciones (fecha, lugar incluyendo municipio, referencias para ubicación, hora de inicio y término de la grabación).`"
                    />
                    <v-checkbox
                      v-model="op2"
                      :label="`Análisis y seguimiento, aún cuando si para ello se requieren imágenes de cámaras particulares, se le faculta para solicitarlas a quien resulte procedente, debiendo informar de ello y el resultado a esta representación social.`"
                    />
                    <v-checkbox
                      v-model="op3"
                      :label="`Folio impreso de llamada al 9-1-1`"
                    />
                    <v-checkbox
                      v-model="op4"
                      :label="`Audio de llamada al 9-1-1 (fecha, lugar, municipio, persona, número del cual se llama, hora aproximada de las llamadas al 9-1-1 por los hechos relacionados con esta solicitud de insumos.`"
                    />
                    <v-checkbox
                      v-model="op5"
                      :label="`Consulta de arcos carreteros respecto del vehículo cuyos únicos datos con los que cuenta esta representación social son:`"
                    />
                    <v-text-field
                      name="texto V."
                      v-if="op5"
                      label="*Texto V:"
                      v-model="textoop5"
                      v-validate="'required'"
                      :error-messages="errors.collect('texto V.')"
                    />
                    <v-checkbox v-model="op6" :label="`Alerta de código H.`" />
                    <v-checkbox
                      v-model="op7"
                      :label="`Consigna operativa (lo cual solo aplica para la ubicación de vehículos que sean localizados en arcos carreteros, para dar aviso a la policía de investigación, y procederse según sus facultades).`"
                    />
                  </v-flex>
                  <v-flex xs12 xm12 md12 lg12>
                    <v-card elevation="0">
                      <v-card-title>
                        <h3>*Información a obtener. Fecha/Hr/Dirección</h3>
                      </v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-form>
                          <vue-editor
                            name="texto"
                            v-validate="'required'"
                            v-model="texto"
                            outline
                            height="350px;"
                            style="max-height: 310px; overflow-y: scroll"
                            :editorToolbar="customToolbar"
                            :error-messages="errors.collect('texto')"
                          />
                        </v-form>
                      </v-card-text>
                    </v-card>
                    <v-text-field
                      name="lo anterior, en razón de que los hechos que se pretende obtener es información relativa a"
                      label="*Lo anterior, en razón de que los hechos que se pretende obtener es información relativa a:"
                      v-model="razondetexto"
                      v-validate="'required'"
                      :error-messages="
                        errors.collect(
                          'lo anterior, en razón de que los hechos que se pretende obtener es información relativa a'
                        )
                      "
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
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
            <v-spacer />
            <v-toolbar-items>
              <v-btn
                color="success"
                text
                @click.native="guardar()"
                :disabled="clikeado"
                >Guardar registro</v-btn
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
            />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import VeeValidate from "vee-validate";
import { WebCam } from "vue-web-cam";
import { VueEditor } from "vue2-editor";
import { error } from "util";
import moment from "moment";
import "moment/locale/es";
import n401 from './401.vue';
import n403 from './403.vue';
import QRCode from "qrcode";
import { generarQRCodeBase64 } from './crearQR';

var assert, curp, persona;
assert = require("assert");
curp = require("curp.js");

export default {
  components: {
    "vue2-editor": VueEditor,
    n401,
    n403,
  },
  data: () => ({
    alert: false,
    clikeado: false,
    dialog: false,
    rAtencionId: "",
    rHechoId: "",
    nuc: "",
    showpage: true,
    e401: false,
    e403: false,
    c5: [],
    texto:
      "Pues se pretende obtener información que pueda haber quedado registrada, y que corresponda a lo que haya ocurrido el día _______________, en un horario aproximado entre las __________ y las ___________ horas, en el camino ubicado en ________________________________________, pues los hechos que se investigan consisten en que ___(describir resumidamente el hecho)_____________[5 líneas]_.",
    razondetexto: "",
    dialogo: false,
    statuseses: [
      {
        text: "Urgente con detenido,vencen las 48 horas del artículo 16 Constitucional",
        value: 1,
      },
      { text: "En trámite sin detenido.", value: 2 },
    ],
    status: "",
    fechastatus: "",
    fechas: "",
    fechageneracion: "",
    EncargadoC5: "",
    puestoc5: "",
    direcionc5: "",
    numerooficio: "",
    op1: false,
    op2: false,
    op3: false,
    op4: false,
    op5: false,
    textoop5: "",
    op6: false,
    op7: false,
    informacionrelativa: "",
    Agentequeseentrega: "",
    telefonomp: "",
    correoelectronicomp: "",
    menu1: false,
    menu2: false,
    horas: "",
    agenciaid: "",
    agenciainfo: [],
    modaldocumento: false,
    opcionesf: "",
    statusf: "",
    textof1:
      "Por este conducto, de manera respetuosa, solicito su colaboración para la obtención de los insumos que se enlistan a continuación, con la finalidad de contar con información que ayude al esclarecimiento de los hechos que se investigan en la carpeta de investigación que al rubro se señala:",
    headers: [
      { text: "Emitida por", value: "uUsuario", sortable: true },
      { text: "Módulo", value: "uModulo", sortable: true },
      { text: "Agente para entrega", value: "agentequerecibe", sortable: true },
      { text: "Fecha de registro", value: "fechaSys", sortable: true },
      { text: "Opciones", value: "op", sortable: false },
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
    editedIndex: 0,
    modalAdd: false,
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
    idc5:"",

    texto: 'Vista Previa',
    qrCode: null,
    docC5: 'Solicitud a C5',
    vistaPreviaTF: true,

  }),
  created() {
    let me = this;
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
      me.listar();
      me.listarLogo();
      me.listarrHecho();
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
      return this.editedIndex === -1 ? "Nueva solicitud" : "Nueva solicitud";
    },
    formIcon() {
      return this.editedIndex === -1 ? "add" : "assignment";
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
    cerrarcarpeta() {
      this.$store.state.rhechoid = null;
      this.$store.state.nuc = null;
      this.$router.push("./umixta-carpetas");
    },
    agregar() {
      this.limpiar();
      this.dialogo = true;
    },
    limpiar() {
      this.listar();
    },
    generarfecha() {
      return (
        moment().format("DD") +
        " de " +
        moment().format("MMMM") +
        " del " +
        moment().format("YYYY")
      );
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
    fechainif() {
      if (this.menu1) {
        this.generarfecha2();
        this.$refs.menu1.save(this.fechastatus);
      }
    },
    generarfecha2() {
      if (this.menu1)
        this.fechas =
          this.fechastatus.substring(8, 10) +
          " de " +
          this.obtenermes(this.fechastatus.substring(5, 7) - 1) +
          " del " +
          this.fechastatus.substring(0, 4);
    },
    limpiar() {
      let me = this;
      me.numerooficio = "";
      me.status = "";
      me.fechastatus = "";
      me.horas = "";
      me.EncargadoC5 = "";
      me.Agentequeseentrega = "";
      me.telefonomp = "";
      me.correoelectronicomp = "";
      me.puestoc5 =
        "SUBSECRETARIO DEL CENTRO DE CONTROL, COMANDO, COMUNICACIONES, CÓMPUTO, COORDINACIÓN E INTELIGENCIA DE HIDALGO (C5i).";
      me.direcionc5 = "MTRO. ISRAEL ZARAGOZA RICO";
      me.op1 = false;
      me.op2 = false;
      me.op3 = false;
      me.op4 = false;
      me.op5 = false;
      me.op6 = false;
      me.op7 = false;
      me.textoop5 = "";
      me.texto =
        "Pues se pretende obtener información que pueda haber quedado registrada, y que corresponda a lo que haya ocurrido el día _______________, en un horario aproximado entre las __________ y las ___________ horas, en el camino ubicado en ________________________________________, pues los hechos que se investigan consisten en que ___(describir resumidamente el hecho)_____________[5 líneas]_.";
      me.razondetexto = "";
      me.qrCode =  null;
      me.vistaPreviaTF =  true;
    },
    reimprimir(item) {
      let me = this;
      me.fechageneracion =
        item.fechaSys.substring(8, 10) +
        " de " +
        me.obtenermes(item.fechaSys.substring(5, 7) - 1) +
        " del " +
        item.fechaSys.substring(0, 4);
      if (item.status == 1) {
        me.statusf =
          "Urgente con detenido, vencen las 48 horas del artículo 16 Constitucional a las " +
          item.horaStatus +
          " del dia " +
          item.fechaStatus;
      } else {
        me.statusf = "En trámite sin detenido.";
      }
      if (item.op1)
        me.opcionesf =
          "\nVideograbaciones (fecha, lugar incluyendo municipio, referencias para ubicación, hora de inicio y término de la grabación).\n";
      if (item.op2)
        me.opcionesf +=
          "\nAnálisis y seguimiento, aún cuando si para ello se requieren imágenes de cámaras particulares, se le faculta para solicitarlas a quien resulte procedente, debiendo informar de ello y el resultado a esta representación social.\n";
      if (item.op3) me.opcionesf += "\nFolio impreso de llamada al 9-1-1\n";
      if (item.op4)
        me.opcionesf +=
          "\nAudio de llamada al 9-1-1 (fecha, lugar, municipio, persona, número del cual se llama, hora aproximada de las llamadas al 9-1-1 por los hechos relacionados con esta solicitud de insumos.\n";
      if (item.op5)
        me.opcionesf +=
          "\nConsulta de arcos carreteros respecto del vehículo cuyos únicos datos con los que cuenta esta representación social son:\n" +
          item.op5Texto +
          "\n";
      if (item.op6) me.opcionesf += "\nAlerta de código H.\n";
      if (item.op7)
        me.opcionesf +=
          "\nConsigna operativa (lo cual solo aplica para la ubicación de vehículos que sean localizados en arcos carreteros, para dar aviso a la policía de investigación, y procederse según sus facultades).";
      me.numerooficio = item.numeroOficio;
      me.EncargadoC5 = item.encargadoc5;
      me.Agentequeseentrega = item.agentequerecibe;
      me.telefonomp = item.numtelefonicoS;
      me.correoelectronicomp = item.correoElecS;
      me.puestoc5 = item.puestoc5;
      me.direcionc5 = item.direccion5;
      me.texto = item.descripcion;
      me.razondetexto = item.razonDescripcion;
      me.vistaPreviaTF = false;
      me.generarQR(me.docC5,me.nuc,item.uUsuario,item.fechaSys,item.idC5);

      setTimeout(() => 
      {
        me.imprimirpdf(item.uUsuario, item.uPuesto, item.uAgencia);
        me.modaldocumento = false;
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
    listar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/C5i/Listar/" + me.rHechoId, configuracion)
        .then(function (response) {
          me.c5 = response.data;
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
    generarpdf() {
      let me = this;
      var now = moment();
      me.generarQR(me.docC5,me.nuc,me.u_nombre,now,me.idc5);

      me.$validator.validate().then((result) => {
        if (result) {
          me.fechageneracion = me.generarfecha();
          if (me.status.value == 1)
            me.statusf =
              "Urgente con detenido, vencen las 48 horas del artículo 16 Constitucional a las " +
              me.horas +
              " del dia " +
              me.fechas;
          else me.statusf = me.status.text;
          if (me.op1)
            me.opcionesf =
              "\nVideograbaciones (fecha, lugar incluyendo municipio, referencias para ubicación, hora de inicio y término de la grabación).\n";
          if (me.op2)
            me.opcionesf +=
              "\nAnálisis y seguimiento, aún cuando si para ello se requieren imágenes de cámaras particulares, se le faculta para solicitarlas a quien resulte procedente, debiendo informar de ello y el resultado a esta representación social.\n";
          if (me.op3) me.opcionesf += "\nFolio impreso de llamada al 9-1-1\n";
          if (me.op4)
            me.opcionesf +=
              "\nAudio de llamada al 9-1-1 (fecha, lugar, municipio, persona, número del cual se llama, hora aproximada de las llamadas al 9-1-1 por los hechos relacionados con esta solicitud de insumos.\n";
          if (me.op5)
            me.opcionesf +=
              "\nConsulta de arcos carreteros respecto del vehículo cuyos únicos datos con los que cuenta esta representación social son:\n" +
              me.textoop5 +
              "\n";
          if (me.op6) me.opcionesf += "\nAlerta de código H.\n";
          if (me.op7)
            me.opcionesf +=
              "\nConsigna operativa (lo cual solo aplica para la ubicación de vehículos que sean localizados en arcos carreteros, para dar aviso a la policía de investigación, y procederse según sus facultades).";

            me.mostrarpdf(me.u_nombre, me.u_puesto, me.u_agencia);
              
        }
      });
    },
    guardar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      var descripcionRegTabI =
        "Registro de solicitud a C5, por los insumos de " + me.opcionesf;

      me.$validator.validate().then((result) => {
        if (result) {
          me.$CAT
            .post(
              "api/C5i/Crear",
              {
                rHechoId: me.rHechoId,
                NumeroOficio: me.numerooficio,
                Status: me.status.value,
                FechaStatus: me.fechastatus,
                HoraStatus: me.horas,
                Encargadoc5: me.EncargadoC5,
                Puestoc5: me.puestoc5,
                Direccion5: me.direcionc5,
                Agentequerecibe: me.Agentequeseentrega,
                NumtelefonicoS: me.telefonomp,
                CorreoElecS: me.correoelectronicomp,
                Op1: me.op1,
                Op2: me.op2,
                Op3: me.op3,
                Op4: me.op4,
                Op5: me.op5,
                Op5Texto: me.textoop5,
                Op6: me.op6,
                Op7: me.op7,
                Descripcion: me.texto,
                RazonDescripcion: me.razondetexto,
                UDistrito: me.u_distrito,
                USubproc: me.u_dirSubPro,
                UAgencia: me.u_agencia,
                UUsuario: me.u_nombre,
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

              me.idc5 = response.data.idc5;
              me.vistaPreviaTF = false;

              var now = moment();
              me.generarQR(me.docC5,me.nuc,me.u_nombre,now,me.idc5);

              setTimeout(() => 
              {
                me.dialogo = false;
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
        }
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
    mostrarpdf(nombre, puesto, agencia) {
      let me = this;
      
      var dde = me.downloadPdf(nombre, puesto, agencia);
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
      var doc = pdfMake.createPdf(dde);
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

      var dde = me.downloadPdf(nombre, puesto, agencia);

      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
      var doc = pdfMake.createPdf(dde).print();

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
              "Número de oficio: " +
              this.numerooficio +
              "\n\nAsunto: Se solicita información para integración de carpeta de investigación." +
              "\n\nEstatus: " +
              this.statusf +
              "\n\n",
            style: "Nooficio",
            alignment: "right",
            margin: [200, 0, 0, 0],
          },
          {
            text:
              this.u_distrito +
              ", Hidalgo a " +
              this.fechageneracion +
              "\n\n\n\n",
            style: "Fecha",
            alignment: "right",
          },
          {
            text: this.direcionc5 + "\n\n" + this.puestoc5 + "\n\n",
            style: "DePara",
            alignment: "justify",
            margin: [0, 50, 200, 0],
          },
          {
            text: this.textof1,
            margin: [0, 30, 0, 0],
            style: "Texto",
            alignment: "justify",
          },
          {
            text: "\n\n" + this.opcionesf + "\n\n\n\n",
            margin: [30, 0, 0, 0],
            style: "Texto",
            alignment: "justify",
          },
          {
            text: html,
            alignment: "justify",
            style: "Texto",
          },
          {
            text:
              "\n\n\nLo anterior, en razón de que los hechos que se pretende obtener es información relativa a:" +
              this.razondetexto +
              "\n\n\nInformación de la cual se solicita absoluta reserva por personal a su cargo, en virtud de que la investigación está en curso y se trata de información estrictamente reservada a la luz del primer párrafo del artículo 218 del Código Nacional de Procedimientos Penales." +
              "\n\n\nSolicito que, para la entrega de los insumos que se indican, los mismos se remitan a esta representación social por conducto del agente de investigación de nombre " +
              this.Agentequeseentrega +
              ", quien se apersonará en el Centro de Control, Comando, Comunicaciones, Cómputo, Coordinación e Inteligencia (C5i); ello previa identificación y acuse de recibo que Usted determine." +
              "\n\n\nEn el entendido que dicha entrega, deberá constar en la correspondiente cadena de custodia a que se refieren los numerales 227, 228 y 229 del Código Nacional de Procedimientos Penales." +
              "\n\n\nTodo lo anterior tiene apoyo en las facultades que me confieren los artículos 127, 128, 129, 130, 131 –fracciones I, III, V y VII-, 212, 213, 214, 215 y 218 del Código Nacional de Procedimientos Penales, así como 1º, 2º, 5º -fracciones I y II primera hipótesis- de la Ley Orgánica del Ministerio Público del estado de Hidalgo." +
              "\n\n\nQuedo a sus órdenes para cualquier duda o aclaración, en el número telefónico " +
              this.telefonomp +
              ", o bien en el correo electrónico " +
              this.correoelectronicomp +
              ".",
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
      var dde = {
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
          {
            text:
              "Número de oficio: " +
              this.numerooficio +
              "\n\nAsunto: Se solicita información para integración de carpeta de investigación." +
              "\n\nEstatus: " +
              this.statusf +
              "\n\n",
            style: "Nooficio",
            alignment: "right",
            margin: [200, 0, 0, 0],
          },
          {
            text:
              this.u_distrito +
              ", Hidalgo a " +
              this.fechageneracion +
              "\n\n\n\n",
            style: "Fecha",
            alignment: "right",
          },
          {
            text: this.puestoc5 + "\n\n" + this.direcionc5 + "\n\n",
            style: "DePara",
            alignment: "justify",
            margin: [0, 50, 200, 0],
          },
          {
            text: this.textof1,
            margin: [0, 30, 0, 0],
            style: "Texto",
            alignment: "justify",
          },
          {
            text: "\n\n" + this.opcionesf + "\n\n\n\n",
            margin: [30, 0, 0, 0],
            style: "Texto",
            alignment: "justify",
          },
          {
            text: html,
            alignment: "justify",
            style: "Texto",
          },
          {
            text:
              "\n\n\nLo anterior, en razón de que los hechos que se pretende obtener es información relativa a:" +
              this.razondetexto +
              "\n\n\nInformación de la cual se solicita absoluta reserva por personal a su cargo, en virtud de que la investigación está en curso y se trata de información estrictamente reservada a la luz del primer párrafo del artículo 218 del Código Nacional de Procedimientos Penales." +
              "\n\n\nSolicito que, para la entrega de los insumos que se indican, los mismos se remitan a esta representación social por conducto del agente de investigación de nombre " +
              this.Agentequeseentrega +
              ", quien se apersonará en el Centro de Control, Comando, Comunicaciones, Cómputo, Coordinación e Inteligencia (C5i); ello previa identificación y acuse de recibo que Usted determine." +
              "\n\n\nEn el entendido que dicha entrega, deberá constar en la correspondiente cadena de custodia a que se refieren los numerales 227, 228 y 229 del Código Nacional de Procedimientos Penales." +
              "\n\n\nTodo lo anterior tiene apoyo en las facultades que me confieren los artículos 127, 128, 129, 130, 131 –fracciones I, III, V y VII-, 212, 213, 214, 215 y 218 del Código Nacional de Procedimientos Penales, así como 1º, 2º, 5º -fracciones I y II primera hipótesis- de la Ley Orgánica del Ministerio Público del estado de Hidalgo." +
              "\n\n\nQuedo a sus órdenes para cualquier duda o aclaración, en el número telefónico " +
              this.telefonomp +
              ".",
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
      return this.correoelectronicomp ? dd : dde;
    },

  },
};
</script>

<style>
.espaciado {
  padding: 30px !important;
}
</style>
