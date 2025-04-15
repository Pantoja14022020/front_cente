<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Generar desglose a unidad de investigación</v-toolbar-title
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
              @click="comprobarinfoR"
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
        :items="oficios"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.nucg }}</td>
          <td>{{ props.item.distritoEnvia }}</td>
          <td>{{ props.item.agenciaEnvia }}</td>
          <td>{{ props.item.distritoRecibe }}</td>
          <td>{{ props.item.agenciaRecibe }}</td>
          <td>{{ props.item.moduloRecibe }}</td>
          <td>
            {{
              props.item.fechaDesglose.substring(8, 10) +
              " de " +
              obtenermes(props.item.fechaDesglose.substring(5, 7) - 1) +
              " del " +
              props.item.fechaDesglose.substring(0, 4)
            }}
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
            <v-toolbar-title
              >Nuevo desglose a unidad de investigación.</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn @click="generarpdf()" color="success">Vista previa</v-btn>

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

                <v-container grid-list-md>
                  <v-layout row wrap>
                    <v-flex class="espaciado" xs12 xm12 md6 lg6>
                      <v-autocomplete
                        name="distrito"
                        :items="distritos"
                        v-model="distrito"
                        return-object
                        @change="listardsp()"
                        v-validate="'required'"
                        label="*Distrito:"
                        :error-messages="errors.collect('distrito')"
                      >
                      </v-autocomplete>

                      <v-autocomplete
                        name="subprocuraduria"
                        :items="dsps"
                        v-model="dps"
                        return-object
                        v-validate="'required'"
                        label="*Subprocuraduria:"
                        @change="listaragencias()"
                        :error-messages="errors.collect('subprocuraduria')"
                      >
                      </v-autocomplete>

                      <v-autocomplete
                        name="agencia"
                        :items="agencias"
                        v-model="agencia"
                        return-object
                        v-validate="'required'"
                        label="*Agencia:"
                        @change="listarmodulos()"
                        :error-messages="errors.collect('agencia')"
                      >
                      </v-autocomplete>

                      <v-autocomplete
                        name="modulo"
                        :items="modulos"
                        v-model="modulo"
                        return-object
                        v-validate="'required'"
                        label="Modulo:"
                        :error-messages="errors.collect('modulo')"
                      />
                    </v-flex>

                    <v-flex class="espaciado" xs12 xm12 md6 lg6>
                      <v-text-field
                        name="puesto"
                        label="Cargo a quien va dirigido:"
                        v-show="false"
                        v-model="puesto"
                      >
                      </v-text-field>

                      <v-select
                        name="persona requerida en el desglose"
                        :items="personas"
                        v-model="persona"
                        v-validate="'required'"
                        label="*Persona requerida en el desglose:"
                        attach
                        chips
                        deletable-chips
                        multiple
                        return-object
                        :error-messages="
                          errors.collect('persona requerida en el desglose')
                        "
                      />

                      <v-autocomplete
                        name="delitos requeridos en el desglose"
                        :items="delitos"
                        v-model="delito"
                        return-object
                        v-validate="'required'"
                        label="*Delitos requeridos en el desglose:"
                        data-vv-scope="agregar"
                        attach
                        chips
                        deletable-chips
                        multiple
                        :error-messages="
                          errors.collect(
                            'agregar.delitos requeridos en el desglose'
                          )
                        "
                      >
                      </v-autocomplete>
                    </v-flex>
                    <v-flex class="espaciado" xs12 sm12 md12 lg12>
                      <v-card elevation="0">
                        <v-card-title class="accent">
                          <h3>Texto del documento:</h3>
                        </v-card-title>
                        <v-divider />
                        <v-card-text>
                          <v-form data-vv-scope="form1">
                            <vue-editor
                              name="descripcíon"
                              v-model="texto"
                              :editorToolbar="customToolbar"
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
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn color="success" v-if="Unclick" text @click.native="guardarM()"
                >Guardar oficio</v-btn
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

      <v-dialog v-model="cargando" persistent max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">add</v-icon>
            </v-avatar>
            <v-toolbar-title class="subheading black--text font-weight-bold">
              El desglose se esta enviando, por favor espere...
            </v-toolbar-title>
            <v-spacer />
          </v-toolbar>

          <!-- Contenido de la animación de carga (inicialmente oculto) -->
          <div class="loading-overlay">
            <div class="loading-spinner"></div>
          </div>
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
import { copiarCarpeta } from "./copiarCarpeta";
import { error } from "util";
import { Console } from "console";
import QRCode from "qrcode";
import { generarQRCodeBase64 } from './crearQR';

export default {
  components: {
    "vue2-editor": VueEditor,
    n401,
    n403,
  },
  data: () => ({
    concaDyP: "",
    alert: false,
    dialog: false,
    rahid: "",
    rAtencionId: "",
    rHechoId: "",
    agenciaid: "",
    nuc: "",
    distritoOriginalCarpeta: "",
    showpage: true,
    e401: false,
    e403: false,
    //-------Logos-----------------------------------------/
    logo1: "",
    logo2: "",
    //*************** */
    texto: "",
    contenido: "",
    comilla: '"',
    oficios: [],
    personas: [],
    delitos: [],
    persona: "",
    delito: "",
    fechas: "",
    numerooficio: "",
    distritos: [],
    distrito: "",
    distritoSeleccionado: "",
    dsps: [],
    dps: "",
    agencias: [],
    agencia: "",
    modulos: [],
    modulo: "",
    dirigido: "",
    puesto: "",
    idmodulo: "",
    nombremodulo: "",

    //------
    modulot: "",
    agenciat: "",
    distritot: "",
    headers: [
      { text: "NUC de desglose", value: "nucg", sortable: true },
      { text: "Distrito que envia", value: "distritoEnvia", sortable: true },
      { text: "Agencia que envia", value: "agenciaEnvia", sortable: true },
      { text: "Distrito que recibe", value: "distritoRecibe", sortable: true },
      { text: "Agencia que recibe", value: "agenciaRecibe", sortable: true },
      { text: "Modulo que recibe", value: "moduloRecibe", sortable: true },
      { text: "Fecha de emisión", value: "fechaDesglose" },
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
    iddesglose:"",
    //----------------------------------------------------

    dialogvanabim: false,
    cargando: false,
    //----------------------------------------------------
    texto: 'Vista Previa',
    qrCode: null,
    docDesglose: 'Desglose',
    vistaPreviaTF: true,
    Unclick: true,

  }),

  created() {
    let me = this;
    me.rHechoId = me.$store.state.rhechoid;
    me.rAtencionId = me.$store.state.ratencionid;
    me.nuc = me.$store.state.nuc;
    me.distritoOriginalCarpeta = me.$store.state.distritoCarpeta;
    //console.log("prueba");
    console.log("Distrito:" + me.distritoOriginalCarpeta);

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
      me.listardistritos();
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
    // Función para activar la animación de carga
    activarAnimacionCarga() {
      this.cargando = true;
    },

    // Función para desactivar la animación de carga
    desactivarAnimacionCarga() {
      this.cargando = false;
    },

    //Funcion para listar los logos que se usan en el pdf
    listarLogo() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

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
    //Funcion para cerrar la carpeta y dirigir al listado de carpetas asignadas
    cerrarcarpeta() 
    {
      this.$store.state.rhechoid = null;
      this.$store.state.nuc = null;
      this.$router.push("./umixta-carpetas");
    },
    // Funcion para listar informacion de la agencia con respecto al hecho
    listarrHecho() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      this.$cat.get("api/RHechoes/ListarPorId/" + me.rHechoId, configuracion).then(function (response)
      {
          (me.agenciaid = response.data.agenciaid), me.informacionagencia();

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
    //Api para listar informacion de la agencia que se vizualizara en el pdf
    informacionagencia() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Agencias/Listarporid/" + me.agenciaid, configuracion).then(function (response) 
      {
        me.agenciainfo = response.data;
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
    //Funcion para listar los distritos disponibles para desglose
    listardistritos() 
    {
      var distritoarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Distritoes/Listar", configuracion).then(function (response) 
      {
        distritoarray = response.data;

        distritoarray.map(function (x) 
        {
          me.distritos.push({ text: x.nombre, value: x.idDistrito });
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
    //Funcion para listar las subdirecciones disponibles para desglose
    listardsp() {
      var dsparray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.dsps = [];

      me.$conf.get("api/DSPs/ListarDspSinCAT/" + me.distrito.value,configuracion).then(function (response) 
      {
        dsparray = response.data;
        dsparray.map(function (x) 
        {
          me.dsps.push({ text: x.nombreSubDir, value: x.idDSP });
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
    //Funcion para listar las agencias disponibles para desglose
    listaragencias() {
      var agenciasarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.agencias = [];

      me.$conf.get("api/Agencias/ListarcarpetasporDsP/" + me.dps.value, configuracion).then(function (response) 
      {
        agenciasarray = response.data;
        agenciasarray.map(function (x) 
        {
          me.agencias.push({ text: x.nombre, value: x.idAgencia });
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
    //Funcion para listar los modulos disponibles para desglose
    listarmodulos() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var moduloarray = [];
      me.modulos = [];

      me.$conf.get("api/ModuloServicios/ListarPorAgencia/" + me.agencia.value,configuracion).then(function (response) 
      {
        moduloarray = response.data;
        moduloarray.map(function (x) 
        {
          me.modulos.push({text: x.nombre, value: x.idModuloServicio, value2: x.nombre,});
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
    //Funcion para listar las personas involucradas en la carpeta
    listarPersonas() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var personasArray = [];

      this.$cat.get("api/RAPs/ListarTodos/" + me.rAtencionId, configuracion).then(function (response)
      {
        me.personal2 = response.data;
        personasArray = response.data;
        personasArray.map(function (x) {
          me.personas.push({text: x.nombreCompleto, value: x.personaId, value2: x.idRAP,});
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
    //Funcion para listar los delitos involucradas en la carpeta
    listardelitos() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var delitosArray = [];

      this.$cat.get("api/RDHs/ListarPorHecho/" + me.rHechoId, configuracion).then(function (response)
      {
        delitosArray = response.data;
        delitosArray.map(function (x) 
        {
          me.delitos.push({ text: x.nombreDelito, value: x.idRDH });
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
    //Funcion para abtraer el mes en formato de texto
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
    //Funcionpara ver la vista previa del pdf
    generarpdf() {

      let me = this;
      var now = moment();
      me.generarQR(me.docDesglose,me.nuc,me.u_nombre,now,me.iddesglose);

      this.$validator.validate().then((result) => 
      {
        if (result) 
        {
          this.fechas = this.generarfecha();
          this.mostrarpdf(
          this.u_nombre,
          this.u_puesto,
          this.u_agencia,
          this.agencia.text,
          this.modulo.text,
          this.distrito.text
          );
        }
      });
    },
    //Funcion para reimprimir el pdf generado del desglose
    imprimirdoc(item) 
    {
      let me = this;
      this.fechas = item.fechaDesglose.substring(8, 10) + " de " + this.obtenermes(item.fechaDesglose.substring(5, 7) - 1) + " del " + item.fechaDesglose.substring(0, 4);
      this.modulo = item.moduloRecibe;
      this.agencia = item.agenciaRecibe;
      this.distrito = item.distritoRecibe;
      this.texto = item.contenido;

      me.vistaPreviaTF = false;
      me.generarQR(me.docDesglose,me.nuc,item.usuarioEnvia,item.fechaDesglose,item.idDesgloses);

      setTimeout(() => 
      {
        this.imprimirpdf(item.usuarioEnvia,item.puestoEnvia,item.agenciaEnvia,item.agenciaRecibe,item.moduloRecibe,item.distritoRecibe);
        this.modaldocumento = false;
      }, 1000);
      
    },
    //Funcion para abtraer la fecha actual en formato de texto del navegador
    generarfecha() 
    {
      var fecha;
      fecha = moment().format("DD") + " de " + moment().format("MMMM") + " del " + moment().format("YYYY");
      return fecha;
    },
    //Nueva funcion para la comprobacion de informacion
    comprobarinfoR() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      //Se crea una nueva api para comprobar lo que le falta a la carpeta de investigacion
      this.$cat.get("api/RHechoes/ComprobarNuc/" + me.rHechoId,configuracion).then(function (response)
      {

        //Se espera una sola respuesta con cada dato obligatorio donde solo evbalua el true o false
        if (response.data.estatus == true && response.data.fechaSuceso == true &&   
            response.data.imputado == true && response.data.victima == true &&
            response.data.delito == true) 
        {
          //En caso de todo ser true procede a la remisión
          me.agregar();
        } 
        //En caso de faltar algo a travez de operadores ternarios imprimiran lo que hace falta
        else 
        {
          alert
          (
            "Te hace falta " + 
            (response.data.fechaSuceso == false ? "\n■ Ingresar la fecha y hora del suceso" :"") +
            (response.data.delito == false ? "\n■ Ingresar un delito" :"") +
            (response.data.imputado == false ? "\n■ Dar de de alta un imputado" :"") +
            (response.data.victima == false ? "\n■ Dar de de alta una victima" :"") +
            (response.data.estatus == false ? "\n■ Cambiar el estatus y etapa de la carpeta" :"") 
            
          );
        }
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
    //Funcion para activar el modal del desglose
    agregar() 
    {
      this.limpiar();
      this.modalAdd = true;
    },
    //Funcion para cerrar el modal del desglose
    close() 
    {
      this.dialog = false;
      this.limpiar();
    },
    //Funcion para limpiar los componentes del modal del desglose
    limpiar() 
    {
      this.agencia = "";
      this.dps = "";
      this.modulo = "";
      this.distrito = "";
      this.dirigido = "";
      this.puesto = "";
      this.idmodulo = "";
      this.nombremodulo = "";
      this.persona = "";
      this.delito = "";
      this.texto = "";
      this.qrCode = null;
      this.vistaPreviaTF = true;
      this.Unclick = true;
    },
    //Funcion para listar los desgloses que ya se le hayan hecho a la carpeta
    listar() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$cat.get("api/Desgloses/Listar/" + me.rHechoId, configuracion).then(function (response)
      {
        me.oficios = response.data;

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
    //Funcion principal para iniciar el proceso de copiado y clonado de los desgloses
    async guardarM() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.distritoSeleccionado = me.distrito.value;
      var cambioDistrito = 0;
      me.Unclick = false; 

      //Condicional para iniciuar las cloinaciones o si no hacen falta
      if (me.u_iddistrito == me.distrito.value)  
      {
        cambioDistrito = 0;
      } else {
        cambioDistrito = 1;
      }

      //Arreglo para valores de rac y atencion
      var racsRatencions = [];

      //Concatendo de personas y delitos
      var personaC = "";
      var delitoC = "";

      var totalDesgloses = "";
      var newIdRAtencion = "";
      var newnuc = "";
      var newidrhecho = "";

      //For para concatenar personas
      for (var i = 0; i < me.persona.length; i++) {
        personaC += me.persona[i].value;

        if (i + 1 != me.persona.length) personaC += ";";
      }

      //For para concatenar delitos
      for (var i = 0; i < me.delito.length; i++) {
        delitoC += me.delito[i].value;

        if (i + 1 != me.delito.length) delitoC += ";";
      }

      //-------------------------------------------------CREACION DEL REGISTRO DEL DESGLOSE------------------------------------------------------
      //GET para conocer el numero de desgloses que tiene la carpeta
      this.$cat.get("api/Desgloses/ObtenerNumDesglose/" + me.rHechoId, configuracion).then(function (response)
      {
        //Recibe le numero de desgloses y le suma uno a la nueva nomeclatura de la nuc XX-XXXX-XXXXX-DX
        totalDesgloses = response.data.total;
        newnuc = me.nuc + "-D" + (totalDesgloses + 1);

        this.$cat.post("api/Desgloses/CrearRegistroDesglose",
        {
          RHechoId: me.rHechoId,
          nucg: newnuc,
          DistritoEnvia: me.u_distrito,
          DirSubEnvia: me.u_dirSubPro,
          AgenciaEnvia: me.u_agencia,
          ModuloServicioIdEnvia: me.u_idmoduloservicio,
          DistritoRecibe: me.distrito.text,
          DirSubRecibe: me.dps.text,
          AgenciaRecibe: me.agencia.text,
          ModuloRecibe: me.modulo.text,
          ModuloServicioIdRecibe: me.modulo.value,
          PersonaIdDesglosadas: personaC,
          RDHIdDesglosados: delitoC,
          Contenido: me.texto,
          UsuarioEnvia: me.u_nombre,
          PuestoEnvia: me.u_puesto,

        },configuracion).then(function (response) 
        {
          me.iddesglose = response.data.iddesglose;

          me.vistaPreviaTF = false;
          var now = moment();
          me.generarQR(me.docDesglose,me.nuc,me.u_nombre,now,me.iddesglose);

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
            me.$notify(
              "Error al intentar listar los registros!!!",
              "error"
            );
          }
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
      //-------------------------------------------------FIN DE LA CREACION DEL REGISTRO DEL DESGLOSE-------------------------------------------------

      //-------------------------------------------------CREACION DE LA RAC y RAtencion------------------------------------------------------
      //Abstraccion de la informacion de RAC Y RATENCION
      this.$cat.get("api/Desgloses/ListarRacRAtencion/" + me.rAtencionId,configuracion).then(function (response)
      {
        //Este arreglo almacena toda la informacion de rac y ratencion
        racsRatencions = response.data;
        //Se asigna un nuevo rac con D1
        var newrac = racsRatencions.racg + "-D" + (totalDesgloses + 1);

        //API DE POST PARA GUARDAR LA MISMA INFORMACION con ids y racg diferente
        this.$cat.post("api/Desgloses/CrearRacRatencion",
        {
          Indicador: racsRatencions.indicador,
          DistritoId: racsRatencions.distritoId,
          CveDistrito: racsRatencions.cveDistrito,
          DConsecutivo: racsRatencions.dConsecutivo,
          AgenciaId: racsRatencions.agenciaId,
          CveAgencia: racsRatencions.cveAgencia,
          AConsecutivo: racsRatencions.aConsecutivo,
          Año: racsRatencions.año,
          racg: newrac,
          Asignado: racsRatencions.asignado,
          Ndenuncia: racsRatencions.ndenuncia,

          FechaHoraRegistro: racsRatencions.fechaHoraRegistro,
          FechaHoraAtencion: racsRatencions.fechaHoraAtencion,
          FechaHoraCierre: racsRatencions.fechaHoraCierre,
          u_Nombre: racsRatencions.u_Nombre,
          u_Puesto: racsRatencions.u_Puesto,
          u_Modulo: racsRatencions.u_Modulo,
          DistritoInicial: racsRatencions.distritoInicial,
          DirSubProcuInicial: racsRatencions.dirSubProcuInicial,
          AgenciaInicial: racsRatencions.agenciaInicial,
          StatusAtencion: racsRatencions.statusAtencion,
          StatusRegistro: racsRatencions.statusRegistro,
          MedioDenuncia: racsRatencions.medioDenuncia,
          ContencionVicitma: racsRatencions.contencionVicitma,
          ModuloServicio: racsRatencions.moduloServicio,
          MedioLlegada: racsRatencions.medioLlegada,
        },configuracion).then(function (response) 
        {
          //Se guarda el nuevo id de atencion para su posterior uso
          newIdRAtencion = response.data.idatencion;

          var recorridoPersonas = personaC.split(";");

          var primeraRecorrido = true;
          var inicio = true;

          //Aqui inicio un recorrido de abtraer las informacion de las personas que hayan seleccionado para del desglose y posteriormente hacer una copia de ellas
          for (var i = 0; i < recorridoPersonas.length; i++) 
          {
            var personasarray = [];
            var idpersonanew = "";
            var idrapnew = "";
            var documentospersonaarray = [];
            var dppersonaarray = [];
            var idtemporal = "";
            idtemporal = recorridoPersonas[i];

            //-------------------------------------------------CREACION DE LA RAP, PERSONAS Y DIRECCIONES------------------------------------------------------
            //Api para abtraer informacion y guardarlo en el arreglo de informacion de personas
            this.$cat.get("api/Desgloses/ListarpersonaPD/" + recorridoPersonas[i],configuracion).then(function (response)
            {
              personasarray = response.data;

              // Verificar si es el primer recorrido
              if (primeraRecorrido) 
              {
                inicio = true;
                primeraRecorrido = false; // Desactivar para los siguientes recorridos
              } else 
              {
                inicio = false;
              }

              //Recorrido del arreglo de informacion de personas y posterior guardado con ids diferentes
              this.$cat.post("api/Desgloses/GuardarPersonasD",
              {
                RAtencionId: newIdRAtencion,
                ClasificacionPersona:personasarray.clasificacionPersona,
                PInicio: inicio,

                StatusAnonimo: personasarray.statusAnonimo,
                TipoPersona: personasarray.tipoPersona,
                RFC: personasarray.rfc,
                RazonSocial: personasarray.razonSocial,
                Nombre: personasarray.nombre,
                ApellidoPaterno: personasarray.apellidoPaterno,
                ApellidoMaterno: personasarray.apellidoMaterno,
                Alias: personasarray.alias,
                StatusAlias: personasarray.statusAlias,
                FechaNacimiento: personasarray.fechaNacimiento,
                EntidadFederativa: personasarray.entidadFederativa,
                DocIdentificacion: personasarray.docIdentificacion,
                CURP: personasarray.curp,
                Sexo: personasarray.sexo,
                Genero: personasarray.genero,
                EstadoCivil: personasarray.estadoCivil,
                Telefono1: personasarray.telefono1,
                Telefono2: personasarray.telefono2,
                Correo: personasarray.correo,
                MedioNotificacion: personasarray.medionotificacion,
                Nacionalidad: personasarray.nacionalidad,
                Ocupacion: personasarray.ocupacion,
                NivelEstudio: personasarray.nivelEstudio,
                Lengua: personasarray.lengua,
                Religion: personasarray.religion,
                Discapacidad: personasarray.discapacidad,
                TipoDiscapacidad: personasarray.tipoDiscapacidad,
                Parentesco: personasarray.parentesco,
                DatosProtegidos: personasarray.datosProtegidos,
                InstitutoPolicial: personasarray.institutoPolicial,
                Numerornd: personasarray.numerornd,
                InformePolicial: personasarray.institutoPolicial,
                Relacion: personasarray.relacion,
                Edad: personasarray.edad,
                DatosFalsos: personasarray.datosFalsos,
                DocPoderNotarial: personasarray.docPoderNotarial,
                CumpleRequisitoLey: personasarray.cumpleRequisitoLey,
                DecretoLibertad: personasarray.decretoLibertad,
                DispusoLibertad: personasarray.dispusoLibertad,
                InicioDetenido: personasarray.inicioDetenido,
                VerR: personasarray.verR,
                VerI: personasarray.verI,
                Registro: personasarray.registro,
                PoblacionAfro: personasarray.poblacionAfro,
                RangoEdad: personasarray.rangoEdad,
                RangoEdadTF: personasarray.rangoEdadTF,
                PoliciaDetuvo: personasarray.policiaDetuvo,

              },configuracion).then(function (response) 
              {
                //A la par que se va guardando la persona proceso a guardar el id que obtuvo y guardo sus documentos de identificacion
                idpersonanew = response.data.idpersonar;
                idrapnew = response.data.idrapr;

                //Api para abtraer la informacion de sus documentos de identificacion
                this.$cat.get("api/Desgloses/ListardocumentospersonaPD/" + idtemporal, configuracion).then(function (response)
                {
                  documentospersonaarray = response.data;

                  var documentosexiste = response.data.ruta;

                  //Claro, si es que existe documentos de indentificacion, de lo contrario se salta esta insercion
                  if (documentosexiste != "") 
                  {
                    this.$cat.post("api/Desgloses/GuardarDocumentosPersonasD",
                    {
                          PersonaId: idpersonanew,
                          TipoDocumento:documentospersonaarray.tipoDocumento,
                          NombreDocumento:documentospersonaarray.nombreDocumento,
                          Descripcion:documentospersonaarray.descripcion,
                          FechaRegistro:documentospersonaarray.fechaRegistro,
                          Ruta: documentospersonaarray.ruta,
                          Distrito: documentospersonaarray.distrito,
                          DirSubProc:documentospersonaarray.dirSubProc,
                          Agencia: documentospersonaarray.agencia,
                          Usuario: documentospersonaarray.usuario,
                          Puesto: documentospersonaarray.puesto,

                    },configuracion).then(function (response) 
                    {
                      //No hay respuesta aqui, no es necesario
                    }).catch((err) => 
                    {
                      if (err.response.status == 400) {
                        me.$notify(
                          "No es un usuario válido",
                          "error"
                        );
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
                        me.$notify(
                          "El recuso no ha sido encontrado",
                          "error"
                        );
                      } else {
                        me.$notify(
                          "Error al intentar listar los registros!!!",
                          "error"
                        );
                      }
                    });
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
                    me.$notify(
                      "El recuso no ha sido encontrado",
                      "error"
                    );
                  } else {
                    me.$notify(
                      "Error al intentar listar los registros!!!",
                      "error"
                    );
                  }
                });

                //Al mismo tiempo del mismo recorrido de personas listo su direccion personal y al mismo tiempo recorro para guardar la copia
                this.$cat.get("api/RAPs/ListarDP/" + idtemporal, configuracion).then(function (response)
                {
                  dppersonaarray = response.data;

                  //Aqui estoy guardado la copia 
                  this.$cat.post("api/Desgloses/GuardarDireccionPersonasD",
                  {
                    calle: dppersonaarray.calle,
                    noint: dppersonaarray.noint,
                    noext: dppersonaarray.noext,
                    entrecalle1: dppersonaarray.entrecalle1,
                    entrecalle2: dppersonaarray.entrecalle2,
                    referencia: dppersonaarray.referencia,
                    pais: dppersonaarray.pais,
                    estado: dppersonaarray.estado,
                    municipio: dppersonaarray.municipio,
                    localidad: dppersonaarray.localidad,
                    cp: dppersonaarray.cp,
                    lat: dppersonaarray.lat,
                    lng: dppersonaarray.lng,
                    idPersona: idpersonanew,
                    RAPId: idrapnew,


                  },configuracion).then(function (response) 
                  {
                    //Este tampoco requiere uyna respuesta, no la necesita
                  }).catch((err) => 
                  {
                    if (err.response.status == 400) {
                      me.$notify(
                        "No es un usuario válido",
                        "error"
                      );
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
                      me.$notify(
                        "El recuso no ha sido encontrado",
                        "error"
                      );
                    } else {
                      me.$notify(
                        "Error al intentar listar los registros!!!",
                        "error"
                      );
                    }
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
                    me.$notify(
                      "No esta autorizado para ver esta pagina",
                      "error"
                    );
                    me.e403 = true;
                    me.showpage = false;
                  } else if (err.response.status == 404) {
                    me.$notify(
                      "El recuso no ha sido encontrado",
                      "error"
                    );
                  } else {
                    me.$notify(
                      "Error al intentar listar los registros!!!",
                      "error"
                    );
                  }
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
                  me.$notify(
                    "No esta autorizado para ver esta pagina",
                    "error"
                  );
                  me.e403 = true;
                  me.showpage = false;
                } else if (err.response.status == 404) {
                  me.$notify(
                    "El recuso no ha sido encontrado",
                    "error"
                  );
                } else {
                  me.$notify(
                    "Error al intentar listar los registros!!!",
                    "error"
                  );
                }
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
                  "Error al intentar listar los registros!!!",
                  "error"
                );
              }
            });
          }
          //Fin del recorrido de las personas

          var rHechoNucarray = [];

          //-------------------------------------------------CREACION DE LA NUC y RHECHO------------------------------------------------------
          //Aqui solo abtraego la informacion del hecho y la nuc
          this.$cat.get("api/Desgloses/ListarRHechoNuc/" + me.rHechoId,configuracion).then(function (response)
          {
            rHechoNucarray = response.data;

            //Aqui inserto la copia con el numero de nuc nuevo
            this.$cat.post("api/Desgloses/CrearNucRhecho",
            {
              Indicador: rHechoNucarray.indicador,
              DistritoId: rHechoNucarray.distritoId,
              DConsecutivo: rHechoNucarray.dConsecutivo,
              AgenciaId: rHechoNucarray.agenciaId,
              AConsecutivo: rHechoNucarray.aConsecutivo,
              Año: rHechoNucarray.año,
              CveAgencia: rHechoNucarray.cveAgencia,
              CveDistrito: rHechoNucarray.cveDistrito,
              nucg: newnuc,
              StatusNUC: rHechoNucarray.statusNUC,
              Etapanuc: rHechoNucarray.etapanuc,

              RAtencionId: newIdRAtencion,
              ModuloServicioId: me.modulo.value,
              AgenciaidR: me.agencia.value,
              FechaReporte: rHechoNucarray.fechaReporte,
              FechaHoraSuceso: rHechoNucarray.fechaHoraSuceso,
              Status: rHechoNucarray.status,
              RBreve: rHechoNucarray.rBreve,
              NarrativaHechos: rHechoNucarray.narrativaHechos,
              FechaElevaNuc: rHechoNucarray.fechaElevaNuc,
              FechaElevaNuc2: rHechoNucarray.fechaElevaNuc2,
              Vanabim: rHechoNucarray.vanabim,
              NDenunciaOficio: rHechoNucarray.nDenunciaOficio,
              Texto: rHechoNucarray.texto,
              FechaHoraSuceso2: rHechoNucarray.fechaHoraSuceso2,
              
            },configuracion).then(function (response) 
            {
              //Una vez creado genero un registro en el historia que esta carpeta proviene de un desglose
              this.$cat.post("api/Historialcarpeta/Crear",
              {
                RHechoId: me.rHechoId,
                Detalle: "Desglose de carpeta " + newnuc,
                Modulo: me.u_modulo,
                Agencia: me.u_agencia,
                UDistrito: me.u_distrito,
                USubproc: me.u_dirSubPro,
                UAgencia: me.u_agencia,
                Usuario: me.u_nombre,
                UPuesto: me.u_puesto,
                UModulo: me.u_modulo,

              },configuracion).then(function (response) 
              {
                //Una vez insertado tambien creo un historial en el tablero de inactividad para la nuc original
                var descripcionRegTabI = "Se creo un desglose  " + newnuc;

                me.crearRegistroTableroI(descripcionRegTabI);

                //Si la carpeta se esta desglosando a un distrito que no es donde esta la carpeta se inicia un proceso de clonado
                if (cambioDistrito) 
                {

                  //Este id vacio lo uso como etiqueta para usar el archivo de copiado de carpeta porque tambien es usado para las remisiones
                  var idRemEnDesglose = '00000000-0000-0000-0000-000000000000';

                  me.$notify("Se inicia el copiado de Carpeta a otro distrito","success");

                  console.log("Se inicia el copiado de Carpeta a otro distrito");

                  //Estos son los registros que se van a clonar
                  const services = 
                  [
                    "api/Racs/Clonar",
                    "api/RAtencions/Clonar",
                    "api/Nucs/Clonar",
                    "api/RHechoes/Clonar",
                    "api/RAPs/Clonar",
                    "api/RDHs/Clonar",
                    "api/Historialcarpeta/Clonar",
                  ];
                  const serviceNames = 
                  [
                    "RAC",
                    "Atencion",
                    "NUC",
                    "Hecho",
                    "RAP",
                    "Delitos",
                    "Historial de Carpeta",
                  ];

                  console.log("SERVICIOS:");
                  console.log(services);

                  me.activarAnimacionCarga();
                  //A travez de este archivo inicio el proceso de clonado para la nueva base de datos
                  copiarCarpeta(configuracion,services,serviceNames,0,newnuc,newidrhecho,newIdRAtencion,me.distritoSeleccionado,me.u_idmoduloservicio,me.u_idagencia,idRemEnDesglose).then(function (response)
                  {
                    //Compruebo por medios de esta funcion si el desglose o las clonaciones de llevaron a cabo de manera correcta
                    me.comprobarRemision(newidrhecho);
                    me.desactivarAnimacionCarga();
                    
                  }).catch((err) => 
                  {
                    if (err.response.status == 400) {
                      me.$notify(
                        "No es un usuario válido",
                        "error"
                      );
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
                      me.$notify(
                        "El recuso no ha sido encontrado",
                        "error"
                      );
                    } else {
                      me.$notify(
                        "Error al intentar crear el  registro!!!",
                        "error"
                      );
                    }
                  });
                }
                else
                {
                  me.imprimirYDescargar(me.u_nombre, me.u_puesto, me.u_agencia, me.agencia.text, me.modulo.text, me.distrito.text);
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
                  me.$notify(
                    "El recuso no ha sido encontrado",
                    "error"
                  );
                } else {
                  me.$notify(
                    "Error al intentar listar los registros!!!",
                    "error"
                  );
                }
              });

              newidrhecho = response.data.idrhecho;

              var recorridoDelitos = delitoC.split(";");

              //A la par que se estan clonando las primeras tablas tambien hago el recorrido de los delitos
              for (var i = 0; i < recorridoDelitos.length; i++) 
              {
                var delitosarray = [];

                //Lo mismo, abstraego informacion+
                this.$cat.get("api/Desgloses/ListardelitosD/" +recorridoDelitos[i],configuracion).then(function (response)
                {
                  delitosarray = response.data;

                  //Aqui inserto la copia
                  this.$cat.post("api/Desgloses/GuardarDelitosD",
                  {
                    DelitoId: delitosarray.delitoId,
                    RHechoId: newidrhecho,
                    ReclasificacionDelito: delitosarray.reclasificacionDelito,
                    TipoFuero: delitosarray.tipoFuero,
                    TipoDeclaracion: delitosarray.tipoDeclaracion,
                    ResultadoDelito: delitosarray.resultadoDelito,
                    GraveNoGrave: delitosarray.graveNoGrave,
                    IntensionDelito: delitosarray.intensionDelito,
                    ViolenciaSinViolencia: delitosarray.violenciaSinViolencia,
                    Equiparado: delitosarray.equiparado,
                    Tipo: delitosarray.tipo,
                    Concurso: delitosarray.concurso,
                    ClasificaOrdenResult: delitosarray.clasificaOrdenResult,
                    ArmaFuego: delitosarray.armaFuego,
                    ArmaBlanca: delitosarray.armaBlanca,
                    Observaciones: delitosarray.observaciones,
                    ConAlgunaParteCuerpo: delitosarray.conAlgunaParteCuerpo,
                    ConotroElemento: delitosarray.conotroElemento,
                    TipoRobado: delitosarray.tipoRobado,
                    MontoRobado: delitosarray.montoRobado,
                    Fechasys: delitosarray.fechasys,
                    Hipotesis: delitosarray.hipotesis,
                    DelitoEspecifico: delitosarray.delitoEspecifico,
                    //Nuevos campos de delitos digitales
                    TipoViolencia: delitosarray.tipoViolencia,
                    SubtipoSexual: delitosarray.subtipoSexual,
                    TipoInfoDigital: delitosarray.tipoInfoDigital,
                    MedioDigital: delitosarray.medioDigital,

                  },configuracion).then(function (response) 
                  {
                    //No requiero respuesta
                  }).catch((err) => 
                  {
                    if (err.response.status == 400) {
                      me.$notify(
                        "No es un usuario válido",
                        "error"
                      );
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
                      me.$notify(
                        "El recuso no ha sido encontrado",
                        "error"
                      );
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
                    me.$notify(
                      "No esta autorizado para ver esta pagina",
                      "error"
                    );
                    me.e403 = true;
                    me.showpage = false;
                  } else if (err.response.status == 404) {
                    me.$notify(
                      "El recuso no ha sido encontrado",
                      "error"
                    );
                  } else {
                    me.$notify(
                      "Error al intentar listar los registros!!!",
                      "error"
                    );
                  }
                });
              }
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
    async imprimirYDescargar(u_nombre, u_puesto, u_agencia, agencia, modulo, distrito)
    {
      let me = this;
      try 
      {
        await me.imprimirpdf(u_nombre, u_puesto, u_agencia, agencia, modulo, distrito);
        me.modalAdd = false;
        me.modaldocumento = false;
        me.cerrarcarpeta();

      } catch (error) {
        console.error("Error al ejecutar imprimirpdf:", error);
      }
    },
    //Esta funcion la uso para corroborar si el desglose se llevo a cabo de forma correcta
    comprobarRemision(newidrhecho) 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var comprobarModulo = "";

      this.$cat.get("api/RHechoes/ComprobarRemision/" + newidrhecho, configuracion).then(function (response)
      {
        comprobarModulo = response.data.moduloServicioId;

        //En caso de fallar, se da aviso y se muestra el pdf
        if (comprobarModulo == me.u_idmoduloservicio) 
        {
          alert("El envio ha FALLADO. El desglose lo podras encontrar en tu lista de carpetas asignadas en donde tendras que REMITIRLO");

          me.imprimirpdf
          (
            me.u_nombre,
            me.u_puesto,
            me.u_agencia,
            me.agencia.text,
            me.modulo.text,
            me.distrito.text
          );

          me.modalAdd = false;
          me.modaldocumento = false;
          me.listar();
          me.limpiar();

        } 
        //En caso de ser correcta, se da aviso y se muestra el pdf
        else 
        {
          alert("Desglose creado y remitido correctamente.");

          me.imprimirpdf(
            me.u_nombre,
            me.u_puesto,
            me.u_agencia,
            me.agencia.text,
            me.modulo.text,
            me.distrito.text
          );
          me.modalAdd = false;
          me.modaldocumento = false;
          me.listar();
          me.limpiar();
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
          me.$notify("El recuso no ha sido encontrado", "error");
        } else {
          me.$notify("Error al intentar listar los registros!!!", "error");
        }
      });
    },
    //Funcion para crear el registro en el tablero de inactividad
    crearRegistroTableroI(descripcionRegTabI) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      this.$cat.post("api/RegistroTableroI/Crear",
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

      },configuracion).then(function (response) 
      {
        me.$notify("La información se guardo correctamente !!!", "success");

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
          me.$notify("Error al intentar crear el  registro!!!", "error");
        }
      });
    },
    //Funcion para mostrar la vista previa del pdf
    mostrarpdf(nombre, puesto, agencia, agenciat, modulot, distritot) {
      let me = this;
      
      var dd = me.downloadPdf(nombre, puesto, agencia, agenciat, modulot, distritot);
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
    //Funcion para lanzar el pdf en una ventana emergente una vez creada
    imprimirpdf(nombre, puesto, agencia, agenciat, modulot, distritot) 
    {
      return new Promise((resolve, reject) => 
      {
        try 
        {
          let me = this;

          // Validar el contenido del PDF
          var dd = me.downloadPdf(nombre, puesto, agencia, agenciat, modulot, distritot);

          // Cargar pdfMake y sus fuentes si no están configuradas
          var pdfMake = require("pdfmake/build/pdfmake.js");
          if (pdfMake.vfs === undefined) {
            var pdfFonts = require("pdfmake/build/vfs_fonts.js");
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
          }
          // Crear y abrir el PDF
          var doc = pdfMake.createPdf(dd);
          doc.open(); // Para abrir en una ventana emergente
          resolve();
        } catch (error) 
        {
          console.error("Error al generar o mostrar el PDF:", error);
          reject(error);
        }
      });
    },
    //Funcion para construir el pdf
    downloadPdf(nombre, puesto, agencia, agenciat, modulot, distritot) {
      this.contenido = "";

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

      this.contenido =
        "<p class=" +
        this.comilla +
        "ql-align-justify" +
        this.comilla +
        "><br></p>" +
        this.texto;

      var htmltexto = htmlToPdfmake(this.contenido);
      //***************************************************************************** */
      var agenciainfodr = this.agenciainfo["direccion"];
      console.log(agenciainfodr);
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
            text: "Asunto: Desglose de carpeta de investigacion\n\n",
            style: "Nooficio",
            alignment: "right",
          },
          {
            text: this.u_distrito + ", Hidalgo a " + this.fechas,
            style: "Fecha",
            alignment: "right",
          },

          {
            text: "\n\n\n\n" + agenciat + "\n",
            style: "DePara",
          },
          {
            text: modulot + "\n",
            style: "DePara",
          },
          {
            text: distritot + "\n\n\n",
            style: "DePara",
          },
          {
            text: htmltexto,
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
          },
          Subtitulo: {
            fontSize: 11,
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

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
