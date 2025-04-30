<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Audiencia inicial</v-toolbar-title
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
        :items="acusaciones"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.usuario }}</td>
          <td>{{ props.item.uModulo }}</td>
          <td>{{ props.item.status }}</td>
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
            <div v-if="props.item.tipo == 2">
              <span class="blue--text">Audiencia inicial por citación</span>
            </div>
            <div v-else>
              <span class="red--text"
                >Audiencia inicial con orden de aprehensión cumplida</span
              >
            </div>
          </td>
          <td class="justify-center layout px-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2" v-on="on" @click="dialogoact(props.item)">
                  update
                </v-icon>
              </template>
              <span>Asignar hora y fecha</span>
            </v-tooltip>

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
            <v-toolbar-title>Registro audiencia inicial </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn color="success" text @click="generarpdf()"
                >Vista previa</v-btn
              >
              <v-btn icon @click="dialogo = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-form ref="form" data-vv-scope="crear">
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap>
                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                  <v-text-field
                    name="número de oficio"
                    label="*Número de oficio:"
                    v-model="numoficio"
                    v-validate="'required'"
                    data-vv-scope="crear"
                    :error-messages="errors.collect('crear.número de oficio')"
                  >
                  </v-text-field>

                  <v-text-field
                    name="puesto"
                    label="*Cargo a quien va dirigido:"
                    v-model="puesto"
                    v-validate="'required'"
                    data-vv-scope="crear"
                    :error-messages="errors.collect('crear.puesto')"
                  >
                  </v-text-field>

                  <v-autocomplete
                    name="tipo de audiencia"
                    :items="taudiencias"
                    v-model="taudiencia"
                    return-object
                    v-validate="'required'"
                    label="*Tipo de audiencia:"
                    data-vv-scope="crear"
                    @change="generarvd2()"
                    :error-messages="errors.collect('crear.tipo de audiencia')"
                  >
                  </v-autocomplete>

                  <v-text-field
                    name="causa penal"
                    label="*Causa penal:"
                    v-model="causapenal"
                    v-validate="'required'"
                    data-vv-scope="crear"
                    v-if="taudiencia.value == 3"
                    :error-messages="errors.collect('crear.causa penal')"
                  >
                  </v-text-field>
                </v-flex>

                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                  <v-text-field
                    name="dirección de notificaciones"
                    label="*Dirección de notificaciones:"
                    v-model="dnotificaciones"
                    v-validate="'required'"
                    data-vv-scope="crear"
                    :error-messages="
                      errors.collect('crear.dirección de notificaciones')
                    "
                  >
                  </v-text-field>

                  <v-text-field
                    name="teléfono de notificaciones"
                    label="*Teléfono de notificaciones:"
                    v-model="tnotificaciones"
                    v-validate="'required'"
                    data-vv-scope="crear"
                    :error-messages="
                      errors.collect('crear.teléfono de notificaciones')
                    "
                  >
                  </v-text-field>

                  <v-text-field
                    name="correo de notificaciones"
                    label="*Correo de notificaciones:"
                    v-model="cnotificaciones"
                    v-validate="'required'"
                    data-vv-scope="crear"
                    :error-messages="
                      errors.collect('crear.correo de notificaciones')
                    "
                  >
                  </v-text-field>

                  <v-autocomplete
                    name="imputado"
                    :items="imputados"
                    v-model="imputado"
                    return-object
                    v-validate="'required'"
                    @change="generarvd2()"
                    label="*Imputado:"
                    attach
                    chips
                    deletable-chips
                    multiple
                    data-vv-scope="crear"
                    :error-messages="errors.collect('crear.imputado')"
                  >
                  </v-autocomplete>

                  <v-text-field
                    name="articulos de sanción"
                    label="*Articulos aplicables al delito:"
                    v-model="articulosds"
                    v-validate="'required'"
                    data-vv-scope="crear"
                    :error-messages="
                      errors.collect('crear.articulos de sanción')
                    "
                  >
                  </v-text-field>
                </v-flex>

                <v-flex xs12 sm12 md12 lg12>
                  <v-card elevation="0">
                    <v-card-title><h3>Victimas</h3></v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-form>
                        <vue-editor
                          name="victimas"
                          v-model="vd3"
                          outline
                          height="350px;"
                          style="max-height: 310px; overflow-y: scroll"
                          :editorToolbar="customToolbar"
                          :error-messages="errors.collect('crear.victimas')"
                        >
                        </vue-editor>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex xs12 sm12 md12 lg12>
                  <v-card elevation="0">
                    <v-card-title><h3>Imputados</h3></v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-form>
                        <vue-editor
                          name="imputados"
                          v-model="vd2"
                          outline
                          height="350px;"
                          style="max-height: 310px; overflow-y: scroll"
                          :editorToolbar="customToolbar"
                          :error-messages="errors.collect('crear.imputados')"
                        >
                        </vue-editor>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
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
                >Guardar audiencia inicial</v-btn
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

      <v-dialog v-model="dialogoactualizar" max-width="400px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">update</v-icon>
            </v-avatar>

            <v-toolbar-title class="subheading">{{
              titulodialogo
            }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" data-vv-scope="actualizar">
              <v-container grid-list-md text-xs-center>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      :return-value.sync="fechacita"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          name="fecha de cita"
                          :value="fechac"
                          label="*Fecha de cita:"
                          prepend-icon="event"
                          clearable
                          readonly
                          v-on="on"
                          v-validate="'required'"
                          data-vv-scope="actualizar"
                          :error-messages="
                            errors.collect('actualizar.fecha de cita')
                          "
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="es"
                        v-model="fechacita"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu1 = false"
                          >Cancel</v-btn
                        >
                        <v-btn text color="primary" @click="fechainif()"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-menu>
                  </v-flex>

                  <v-flex xs12 sm12 md12 lg12>
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="horac"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          name="hora de cita"
                          v-model="horac"
                          label="*Hora de cita:"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                          v-validate="'required'"
                          data-vv-scope="actualizar"
                          :error-messages="
                            errors.collect('actualizar.hora de cita')
                          "
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu2"
                        v-model="horac"
                        full-width
                        @click:minute="$refs.menu2.save(horac)"
                      ></v-time-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click.native="dialogoactualizar = false">Cerrar</v-btn>
                <v-btn color="success" @click.native="actualizar"
                  >Guardar</v-btn
                >
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
    acusaciones: [],
    agenciainfo: [],
    agenciaid: "",

    causapenal: "",
    dirigidoa: "",
    puesto: "",
    tnotificaciones: "",
    dnotificaciones: "",
    cnotificaciones: "",

    victimas: [],
    texto: "",
    texto3: "",
    modaldocumento: false,

    representantesl: [],
    representantesj: [],
    representantesp: [],
    comilla: '"',
    direccionpv: [],
    direccionpi: [],
    imputadosf: "",
    victimasf: "",
    vd2: "",
    vd3: "",
    delitosf: "",
    delito: [],
    imputados: [],
    imputado: [],
    numoficio: "",
    delitos: [],
    taudiencias: [
      { text: "Solicitud de audiencia inicial por citación", value: "2" },
      {
        text: "Solicitud de audiencia inicial con orden de aprehensión cumplida",
        value: "3",
      },
      {
        text: "Solicitud de audiencia inicial con personas detenidas",
        value: "4",
      },
    ],
    taudiencia: "",
    articulosds: "",
    fechaactual: "",
    titulodialogo: "",
    idagenda: "",
    dialogoactualizar: false,
    menu1: false,
    menu2: false,
    horac: "",
    fechacita: "",
    fechac: "",
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
      { text: "Emitida por", value: "usuario", sortable: true },
      { text: "Modulo", value: "modulo", sortable: true },
      { text: "Status", value: "status" },
      { text: "Fecha de emisión", value: "fechasys" },
      { text: "Tipo", value: "tipo" },
      { text: "Opciones", value: "op", sortable: false },
    ],
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
    docAudienciaI: 'Audiencia inicial',
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
      me.listarVictimas();
      me.listarImputados();
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
      this.limpiar();
      this.dialogo = true;
    },
    dialogoact(item) {
      this.titulodialogo = this.texto2(item.tipo, item.tipo2);
      this.idagenda = item.idAgenda;
      this.dialogoactualizar = true;
    },

    texto2(tipo, tipo2) {
      if (tipo == 2) return "Audiencia inicial por citación";
      if (tipo == 3)
        return "Audiencia inicial con orden de aprehension cumplida";
      if (tipo == 4) return "Audiencia Orden de Aprehension";
      if (tipo == 5) return "Audiencia Orden de Comparecencia";
      if (tipo == 6) return "Formulacion de acusacion";
      if (tipo == 7) return "Solicitud a investigación y litigación";
      if (tipo == 8) return "SOLICITUD AL CENTRO DE JUSTICIA RESTAURATIVA";
      if (tipo == 9) return "SOLICITUD A MEDIDAS CAUTELARES";
      if (tipo == 10) return tipo2;
      if (tipo == 11) return tipo2;
    },
    fechainif() {
      this.generarfecha2();
      this.$refs.menu1.save(this.fechacita);
    },
    generarfecha2() {
      this.fechac =
        this.fechacita.substring(8, 10) +
        " de " +
        this.obtenermes(this.fechacita.substring(5, 7) - 1) +
        " del " +
        this.fechacita.substring(0, 4);
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
    listarVictimas() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var contador = 0;
      var personasArray = [];
      me.$CAT
        .get("api/RAPs/ListarVicDEDPRE/" + me.rAtencionId, configuracion)
        .then(function (response) {
          console.log(response.data);
          personasArray = response.data;
          personasArray.map(function (x) {
            me.victimas.push({
              text: x.nombreVictima,
              value: x.personaId,
              FechaNacimiento: x.fechaNacimiento,
              CURP: x.curp,
              Telefono: x.telefono,
              Alias: x.alias,
              Correo: x.correo,
              DireccionE: x.direccionE,
              DireccionP: x.direccionP,
              RepresentanteActivo: x.representanteActivo,
              NombreRepresentanteLegal: x.nombreRepresentanteLegal,
              TelefonoReL: x.telefonoReL,
              CorreoReL: x.correoReL,
              NombreRepresentanteJuridico: x.nombreRepresentanteJuridico,
              TelefonoReJ: x.telefonoReJ,
              CorreoReJ: x.correoReJ,
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
    listarImputados() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var contador = 0;
      var personasArray = [];
      me.$CAT
        .get("api/RAPs/ListarImpDEDPRE/" + me.rAtencionId, configuracion)
        .then(function (response) {
          //console.log(response.data)
          personasArray = response.data;
          personasArray.map(function (x) {
            me.imputados.push({
              text: x.nombreImputado,
              value: x.personaId,
              FechaNacimiento: x.fechaNacimiento,
              CURP: x.curp,
              Telefono: x.telefono,
              Alias: x.alias,
              Correo: x.correo,
              DireccionE: x.direccionE,
              DireccionP: x.direccionP,
              RepresentanteActivo: x.representanteActivo,
              NombreRepresentanteParticular: x.nombreRepresentanteParticular,
              TelefonoRe: x.telefonoRe,
              CorreoRe: x.correoRe,
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
    generarvd2() {
      this.vd2 = "";
      this.vd3 = "";

      for (var i = 0; i < this.victimas.length; i++) {
        this.vd3 += "<b>Datos de la victima: </b> " + this.victimas[i].text;

        if (this.victimas[i].NombreRepresentanteLegal != "") {
          this.vd3 +=
            ", Representada por  " +
            this.victimas[i].NombreRepresentanteLegal +
            " con domicilio para oir y recibir notificaciones el ubicado en " +
            this.victimas[i].DireccionE +
            ", " +
            this.victimas[i].TelefonoReL +
            ", " +
            this.victimas[i].CorreoReL;
        }

        if (this.victimas[i].NombreRepresentanteJuridico != "") {
          this.vd3 +=
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
            "<b>Datos del asesor jurídico: </b>" +
            this.victimas[i].NombreRepresentanteJuridico +
            " con domicilio para oir y recibir notificaciones el ubicado en " +
            this.victimas[i].DireccionE +
            ", " +
            this.victimas[i].TelefonoReJ +
            ", " +
            this.victimas[i].CorreoReJ;
        }

        this.vd3 +=
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
      }

      if (this.taudiencia.value == 2) {
        for (var i = 0; i < this.imputado.length; i++) {
          this.vd2 +=
            "Derivado de la investigación llevada a cabo hasta el momento por esta autoridad, se desprende que el domicilio del imputado " +
            this.imputado[i].text +
            " está ubicado en " +
            this.imputado[i].DireccionP +
            ", " +
            this.imputado[i].Telefono +
            ", " +
            this.imputado[i].Correo;

          if (this.imputado[i].RepresentanteActivo) {
            this.vd2 +=
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
              "<b>Datos del Defensor Particular: </b>" +
              this.imputado[i].NombreRepresentanteParticular +
              ", con domicilio para oir y recibir notificaciones " +
              this.imputado[i].DireccionE +
              ", " +
              this.imputado[i].TelefonoRe +
              ", " +
              this.imputado[i].CorreoRe;
          }

          this.vd2 +=
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
        }
      } else if (this.taudiencia.value == 3) {
        for (var i = 0; i < this.imputado.length; i++) {
          this.vd2 +=
            "<b>Datos del Impútado: </b>" +
            this.imputado[i].text +
            (this.imputado[i].Alias != ""
              ? ", " + this.imputado[i].Alias
              : "") +
            ", con domicilio para oir y recibir notificaciones " +
            this.imputado[i].DireccionP +
            ", " +
            this.imputado[i].Telefono;

          if (this.imputado[i].RepresentanteActivo) {
            this.vd2 +=
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
              "<b>Datos del Defensor Particular: </b>" +
              this.imputado[i].NombreRepresentanteParticular +
              ", con domicilio para oir y recibir notificaciones " +
              this.imputado[i].DireccionE +
              ", " +
              this.imputado[i].TelefonoRe +
              ", " +
              this.imputado[i].CorreoRe;
          }

          this.vd2 +=
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
        }
      }
    },
    generarpdf() {
      //console.log("generar pdf")
      this.$validator.validateAll("crear").then((result) => {
        if (result) {
          this.fechaactual = this.generarfecha();
          this.delitosf = "";
          this.victimarlegal = "";
          this.victimasf = [];
          this.imputadosf = "";

          for (var i = 0; i < this.delitos.length; i++) {
            this.delitosf += this.delitos[i].text;
            this.delitos.length != i + 1 ? (this.delitosf += ", ") : "";
          }

          for (var i = 0; i < this.victimas.length; i++) {
            this.victimasf += this.victimas[i].text;
            this.victimas.length != i + 1 ? (this.victimasf += ", ") : "";
          }

          for (var i = 0; i < this.imputado.length; i++) {
            this.imputadosf += this.imputado[i].text;
            if (i != this.imputado.length - 1) this.imputadosf += ", ";
          }

          if (this.taudiencia.value == 2) {
            this.texto3 =
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
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>";

            this.texto =
              "Quién suscribe " +
              this.u_nombre +
              ", " +
              this.u_agencia +
              " con domicilio para oír y recibir todo tipo de notificaciones el ubicado en " +
              this.dnotificaciones +
              ", con número de teléfono " +
              this.tnotificaciones +
              " y correo electrónico " +
              this.cnotificaciones +
              " con fundamento en lo señalado por los numerales 52, 62, 82, 127, 131 fracción XVI, 141 fracción I 307, 310 y demás relativos y aplicables del Código Nacional de Procedimientos Penales; toda vez que esta Representación Social, tiene interés en formular imputación a " +
              this.imputadosf +
              ", solicito a usted fije fecha y hora para la celebración de la audiencia inicial y gire citatorio a " +
              this.imputadosf +
              " para que comparezca a la celebración de la misma, toda vez que se desprende su probable participación en los hechos que la ley señala como el delito de " +
              this.delitosf +
              " previsto y sancionado por los artículos " +
              this.articulosds +
              " del código penal vigente en el estado de Hidalgo, ilícito cometido en agravio de " +
              this.victimasf +
              "." +
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
              this.vd2 +
              this.vd3;
          } else {
            this.texto3 =
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
              "><br></p>" +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>";

            this.texto =
              "Quién suscribe " +
              this.u_nombre +
              ", " +
              this.u_agencia +
              " con domicilio para oír y recibir todo tipo de notificaciones el ubicado en " +
              this.dnotificaciones +
              ", con número de teléfono " +
              this.tnotificaciones +
              " y correo electrónico " +
              this.cnotificaciones +
              " con fundamento en lo señalado por los numerales 52, 62, 64 fracción I, 82, 127, 131, 219, 307, 308 y demás relativos y aplicables del Código Nacional de Procedimientos Penales vigente, le solicito a Usted, que toda vez que se ha dado cumplimiento a la <b>ORDEN DE APREHENSIÓN</b> girada en contra de " +
              this.imputadof +
              " quien se encuentra a su disposición en el Centro de Reinserción Social para adultos de esta Ciudad, se sirva señalar día y hora a efecto de llevar a cabo la <b>AUDIENCIA INICIAL</b> correspondiente, adjuntando al presente oficio, copia del aviso de cumplimiento de orden de aprehensión con número de oficio " +
              this.numoficio +
              ", y además le hago del conocimiento los siguientes datos: " +
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
              "<b>Hechos posiblemente constitutivos del delito de: </b>" +
              this.delitosf +
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
              this.vd3 +
              this.vd2;
          }

          this.mostrarpdf(
            this.u_nombre,
            this.u_puesto,
            this.u_agencia,
            this.taudiencia.value
          );
        }
      });
    },
    imprimir(item) {
      let me = this;

      me.limpiar();

      me.numoficio = item.numeroOficio;
      me.causapenal = item.causaPenal;
      me.delitosf = item.delitos;
      me.dirigidoa = item.dirigidoNombre;
      me.puesto = item.dirigidoPuesto;
      me.dnotificaciones = item.reDireccion;
      me.cnotificaciones = item.reCorreo;
      me.tnotificaciones = item.reTelefono;
      me.victimasf = item.victimas;
      (me.vd2 = item.informacionVicAseJu), (me.vd3 = item.informacionImpDeP);
      me.imputadosf = new Object();
      var nombreimp = item.imputado;
      me.articulosds = item.articulosSancion;
      this.fechaactual =
        item.fechasys.substring(8, 10) +
        " de " +
        this.obtenermes(item.fechasys.substring(5, 7) - 1) +
        " del " +
        item.fechasys.substring(0, 4);
      var agente = item.usuario;
      var agencia = item.uAgencia;

      if (item.tipo == 2) {
        this.texto3 =
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
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>";

        this.texto =
          "Quién suscribe " +
          agente +
          ", " +
          agencia +
          " con domicilio para oír y recibir todo tipo de notificaciones el ubicado en " +
          this.dnotificaciones +
          ", con número de teléfono " +
          this.tnotificaciones +
          " y correo electrónico " +
          this.cnotificaciones +
          " con fundamento en lo señalado por los numerales 52, 62, 82, 127, 131 fracción XVI, 141 fracción I 307, 310 y demás relativos y aplicables del Código Nacional de Procedimientos Penales; toda vez que esta Representación Social, tiene interés en formular imputación a " +
          nombreimp +
          ", solicito a usted fije fecha y hora para la celebración de la audiencia inicial y gire citatorio a " +
          nombreimp +
          "para que comparezca a la celebración de la misma, toda vez que se desprende su probable participación en los hechos que la ley señala como el delito de " +
          this.delitosf +
          " previsto y sancionado por los artículos " +
          this.articulosds +
          " del código penal vigente en el estado de Hidalgo, ilícito cometido en agravio de " +
          this.victimasf +
          "." +
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
          this.vd2 +
          this.vd3;
      } else {
        this.texto3 =
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
          "><br></p>" +
          "<p class=" +
          this.comilla +
          "ql-align-justify" +
          this.comilla +
          "><br></p>";

        this.texto =
          "Quién suscribe " +
          agente +
          ", " +
          agencia +
          " con domicilio para oír y recibir todo tipo de notificaciones el ubicado en " +
          this.dnotificaciones +
          ", con número de teléfono " +
          this.tnotificaciones +
          " y correo electrónico " +
          this.cnotificaciones +
          " con fundamento en lo señalado por los numerales 52, 62, 64 fracción I, 82, 127, 131, 219, 307, 308 y demás relativos y aplicables del Código Nacional de Procedimientos Penales vigente, le solicito a Usted, que toda vez que se ha dado cumplimiento a la <b>ORDEN DE APREHENSIÓN</b> girada en contra de " +
          nombreimp +
          " quien se encuentra a su disposición en el Centro de Reinserción Social para adultos de esta Ciudad, se sirva señalar día y hora a efecto de llevar a cabo la <b>AUDIENCIA INICIAL</b> correspondiente, adjuntando al presente oficio, copia del aviso de cumplimiento de orden de aprehensión con número de oficio " +
          this.numoficio +
          ", y además le hago del conocimiento los siguientes datos: " +
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
          "<b>Hechos posiblemente constitutivos del delito de: </b>" +
          this.delitosf +
          this.vd3 +
          this.vd2;
      }

      me.vistaPreviaTF = false;
      me.generarQR(me.docAudienciaI,me.nuc,item.usuario,item.fechasys,item.idAgenda);

      setTimeout(() => 
      {
        me.imprimirpdf(item.usuario, item.uPuesto, item.uAgencia, item.tipo);
        me.modaldocumento = false;
      }, 1000);
      
    },
    guardar() {
      this.$validator.validateAll("crear").then((result) => {
        console.log(result);
        if (result) {
          let me = this;
          let header = { Authorization: "Bearer " + this.$store.state.token };
          let configuracion = { headers: header };

          // let newDelitos = []
          // for (var i = 0; i < this.delitos.length; i++) {
          //     newDelitos.push({'desDelito' : this.delitos[i].text})
          // }
          //
          // let partes =[];
          // partes.push({'nombre' : me.victimasf,'tipoParte':'Victima Directa'});
          // var tmpImputado= me.imputadosf.split(',');
          // for (i = 0; i < tmpImputado.length; i++) {
          //     partes.push({'nombre' : tmpImputado[i],'tipoParte':'Imputado'});
          // }

          me.$confirm(
            "Esperando confirmación",
            "Estas seguro de  que deseas guardar información ",
            function () {
              me.$IL
                .post(
                  "api/Agenda/Crear",
                  {
                    rHechoId: me.rHechoId,
                    NumeroOficio: me.numoficio,
                    CausaPenal: me.causapenal,
                    Nuc: me.nuc,
                    Delitos: me.delitosf,
                    Status: "Iniciado",
                    tipo: me.taudiencia.value,
                    DirigidoNombre: me.dirigidoa,
                    DirigidoPuesto: me.puesto,
                    ReDireccion: me.dnotificaciones,
                    ReCorreo: me.cnotificaciones,
                    ReTelefono: me.tnotificaciones,
                    Imputado: me.imputadosf,
                    Victimas: me.victimasf,
                    ArticulosSancion: me.articulosds,
                    InformacionVicAseJu: me.vd2,
                    InformacionImpDeP: me.vd3,
                    FechaCitacion: "0001-01-01",
                    uDistrito: me.u_distrito,
                    uSubproc: me.u_dirSubPro,
                    uAgencia: me.u_agencia,
                    Usuario: me.u_nombre,
                    uPuesto: me.u_puesto,
                    uModulo: me.u_modulo,
                    Comparece: "",
                  },
                  configuracion
                )
                .then(function (response) {
                  console.log(response.data);
                  me.$notify(
                    "La información se guardo correctamente !!!",
                    "success"
                  );
                  me.dialogo = false;
                  me.modaldocumento = false;
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
                    me.e403 = true;
                  } else if (err.response.status == 403) {
                    me.$notify(
                      "No esta autorizado para ver esta pagina",
                      "error"
                    );
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
    actualizar() {
      this.$validator.validateAll("actualizar").then((result) => {
        if (result) {
          let me = this;
          let header = { Authorization: "Bearer " + this.$store.state.token };
          let configuracion = { headers: header };
          me.$IL
            .put(
              "api/Agenda/Actualizar",
              {
                IdAgenda: me.idagenda,
                HoraCitacion: me.horac,
                FechaCitacion: me.fechacita + " " + me.horac,
                status: "Agendado",
              },
              configuracion
            )
            .then(function (response) {
              me.$notify(
                "La información se guardo correctamente !!!",
                "success"
              );
              me.dialogoactualizar = false;
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
                me.$notify("No esta autorizado para ver esta pagina", "error");
                me.e403 = true;
                me.showpage = false;
              } else if (err.response.status == 404) {
                me.$notify("El recuso no ha sido encontrado", "error");
              } else {
                me.$notify("Error al intentar crear el  registro!!!", "error");
              }
            });
        }
      });
    },
    limpiar() {
      let me = this;
      me.texto = "";
      me.numoficio = "";
      me.causapenal = "";
      me.delitosf = "";
      me.dirigidoa = "";
      me.puesto = "";
      me.dnotificaciones = "";
      me.cnotificaciones = "";
      me.tnotificaciones = "";

      me.acusacion = "";
      me.imputadosf2 = "";
      me.victimasf = "";
      me.articulosds = "";
      me.taudiencia = "";
      me.fechaactual = "";
      me.imputado = "";
      me.vd2 = "";
      me.vd3 = "";
      me.fechacita = "";
      me.fechac = "";
      me.horac = "";
      me.qrCode = null;
      me.vistaPreviaTF = true;
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
    listar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$IL
        .get(
          "api/Agenda/ListarTipoRHecho2/" +
            me.rHechoId +
            "/" +
            2 +
            "/" +
            3 +
            "/" +
            99,
          configuracion
        )
        .then(function (response) {
          // console.log(response.data);
          me.acusaciones = response.data;
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
    imprimirpdf(nombre, puesto, agencia, tipoaud) {
      let me = this;

      var dd = me.downloadPdf(nombre, puesto, agencia, tipoaud);

      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.vfs;
      }
      var doc = pdfMake.createPdf(dd).print();
      me.limpiar();
    },
    mostrarpdf(nombre, puesto, agencia, tipoau) {
      let me = this;
      
      var dd = me.downloadPdf(nombre, puesto, agencia, tipoau);
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
    downloadPdf(nombre, puesto, agencia, tipoaud) {
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
      var causapenal = this.causapenal;
      var delitos = this.delitosf;
      var nooficio = this.numoficio;
      var fecha = this.fechaactual;
      var distrito = this.u_distrito;
      //***************************************************************************** */
      var html = htmlToPdfmake(this.texto);
      var html2 = htmlToPdfmake(
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
          "<u>SE SOLICITA AUDIENCIA INICIAL</u>" +
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
      var html3 = htmlToPdfmake(this.texto3);
      //***************************************************************************** */
      var agenciainfodr = this.agenciainfo["direccion"];
      var agenciainfotel = this.agenciainfo["telefono"];
      var tipoaudiencia = tipoaud;
      //***************************************************************************** */

      let me  =this;
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
            /*
                            {
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
              (tipoaud == 3 ? "CAUSA PENAL: " + causapenal + "\n\n" : "") +
              "DELITO: " +
              delitos +
              "\n\n" +
              "OFICIO NO: " +
              nooficio,
            style: "Nooficio",
            alignment: "right",
          },
          {
            text: "\n" + distrito + ", Hidalgo a " + fecha + "\n\n\n\n\n\n\n\n",
            style: "Fecha",
            alignment: "right",
          },
          {
            text: html2,
            style: "Titulo",
            alignment: "center",
          },
          {
            text: html3,
            style: "DePara",
            bold: true,
            alignment: "left",
            margin: [0, 0, 210, 0],
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
