<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Remisión a unidad de investigación</v-toolbar-title
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
              class="mx-2 pt-2"
              slot="activator"
              v-on="on"
              @click="cerrarcarpeta"
              fab
              dark
              small
              color="primary"
            >
              <v-icon dark class="mt-1">close</v-icon>
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
              @click="comprobarinfoR"
              fab
              dark
              small
              color="success"
            >
              <v-icon dark class="mt-1">add</v-icon>
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
          <td>{{ props.item.uSubproc }}</td>
          <td>{{ props.item.uAgencia }}</td>
          <td>{{ props.item.uModulo }}</td>
          <td>{{ props.item.paraDonde }}</td>
          <td>
            {{
              props.item.fechasys.substring(8, 10) +
              " de " +
              obtenermes(props.item.fechasys.substring(5, 7) - 1) +
              " del " +
              props.item.fechasys.substring(0, 4)
            }}
          </td>
          <td class="justify-center layout px-0">

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2"
                  v-on="on"
                  color="black"
                  @click="imprimirdoc(props.item)"
                >
                  print
                </v-icon>
              </template>
              <span>Imprimir</span>
            </v-tooltip>

            <v-tooltip bottom v-if="props.item.envioExitosoTF == false">
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2"
                  v-on="on"
                  color="green"
                  @click="reenviarDerivacion(props.item)"
                >
                  send
                </v-icon>
              </template>
              <span>Reenviar remisión</span>
            </v-tooltip>

            <v-tooltip bottom v-if="props.item.envioExitosoTF == false">
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2"
                  v-on="on"
                  color="red"
                  @click="cancelarDerivacion(props.item.idRemisionUI)"
                >
                cancel_schedule_send
                </v-icon>
              </template>
              <span>Cancelar envio</span>
            </v-tooltip>

          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary">Resetear</v-btn>
        </template>
      </v-data-table>

      <!-- Modal para realizar la remision de la carpeta -->
      <v-dialog v-model="modalAdd" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title
              >Nueva remisión a unidad de investigación.</v-toolbar-title
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
                        @change="listarrecepcioncarpeta()"
                        :error-messages="errors.collect('agencia')"
                      >
                      </v-autocomplete>
                    </v-flex>

                    <v-flex class="espaciado" xs12 xm12 md6 lg6>
                      <v-text-field
                        name="puesto"
                        label="Cargo a quien va dirigido:"
                        v-show="false"
                        v-model="puesto"
                      >
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
          </v-flex>
        </v-card>
      </v-dialog>

      <!-- Modal de la vista previa antes del guardado -->
      <v-dialog v-model="modaldocumento" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Documento.</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn color="success" v-if="Unclick" text @click.native="guardar()"
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

      <!-- Animacion de espera para la remision -->
      <v-dialog v-model="cargando" persistent  max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">add</v-icon>
            </v-avatar>
            <v-toolbar-title class="subheading"
              >La carpeta se esta remitiendo, por favor
              espere...</v-toolbar-title
            >
            <v-spacer />
          </v-toolbar>
          <div class="loading-overlay">
            <div class="loading-spinner"></div>
          </div>
        </v-card>
      </v-dialog>
      
      <!-- Animacion de espera para la remision -->
      <v-dialog v-model="cargaDescarga" persistent  max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">cloud_download</v-icon>
            </v-avatar>
            <v-toolbar-title class="subheading"
              >Descargando el oficio de remisión...</v-toolbar-title
            >
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
    oficios: [],
    fechas: "",
    numerooficio: "",
    distritos: [],
    distrito: "",
    distritoSeleccionado: "",
    dsps: [],
    dps: "",
    agencias: [],
    agencia: "",
    dirigido: "",
    puesto: "",
    idmodulo: "",
    nombremodulo: "",
    headers: [
      { text: "Emitida por", value: "usuario", sortable: true },
      { text: "Subprocuraduria", value: "uSubproc", sortable: true },
      { text: "Agencia", value: "uAgencia", sortable: true },
      { text: "Módulo", value: "modulo", sortable: true },
      { text: "¿A donde fue remitida?", value: "emitida", sortable: true },
      { text: "Fecha de emisión", value: "fechasys" },
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
    Unclick: true,

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
    //----------------------------------------------------

    idRemision:"",
    countFalseEnvioExitosoTF: 0,
    cargando: false,
    //----------------------------------------------------
    texto: 'Vista Previa',
    qrCode: null,
    docRemision: 'Remisión',
    vistaPreviaTF: true,
    cargaDescarga: false,
  }),

  created() {
    let me = this;
    me.rHechoId = me.$store.state.rhechoid;
    me.rAtencionId = me.$store.state.ratencionid;
    me.nuc = me.$store.state.nuc;
    me.distritoOriginalCarpeta = me.$store.state.distritoCarpeta;    

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
        } catch (err) {
          me.$notify("Error al intentar crear el código QR", "error");
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
    cerrarcarpeta() {
      this.$store.state.rhechoid = null;
      this.$store.state.nuc = null;
      this.$router.push("./umixta-carpetas");
    },
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
    listarrHecho() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$cat.get("api/RHechoes/ListarPorId/" + me.rHechoId, configuracion).then(function (response)
      {
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
    informacionagencia() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$conf.get("api/Agencias/Listarporid/" + me.agenciaid, configuracion).then(function (response) 
      {          
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
    listardistritos() 
    {
      var distritoarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/Distritoes/Listar", configuracion).then(function (response) 
      {
        distritoarray = response.data;
        distritoarray.map(function (x) {
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
    listardsp() 
    {
      var dsparray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.dsps = [];

      me.$conf.get("api/DSPs/ListarPorDistritoyICarpeta/" + me.distrito.value,configuracion).then(function (response) 
      {
        dsparray = response.data;
        dsparray.map(function (x) {
          me.dsps.push({ text: x.nombreSubDir, value: x.idDSP });
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
    listaragencias() 
    {
      var agenciasarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.agencias = [];

      me.$conf.get("api/Agencias/ListarRecepcionCA/" + me.dps.value, configuracion).then(function (response) 
      {
        if (response.data != "") {
          agenciasarray = response.data;
          agenciasarray.map(function (x) {
            me.agencias.push({ text: x.nombre, value: x.idAgencia });
          });
        } else
          me.$notify("La subprocuraduria no cuenta con agencias de carpeta","error");
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
    listarrecepcioncarpeta() 
    {
      var rcarpetaarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$conf.get("api/ModuloServicios/RecepcionCarpeta/" + me.agencia.value,configuracion).then(function (response) 
      {
        if (response.data.idModuloServicio != "") {
          me.idmodulo = response.data.idModuloServicio;
          me.nombremodulo = response.data.nombre;            
          me.puesto = "Agente del Ministerio Público";
        } else me.$notify("La agencia no cuenta con recepción de carpeta", "error");
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
    comprobarinfoR() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      //Se crea una nueva api para comprobar lo que le falta a la carpeta de investigacion
      this.$cat.get("api/RHechoes/ComprobarNuc/" + me.rHechoId,configuracion).then(function (response)
      {

        //Se espera una sola respuesta con cada dato obligatorio donde solo evbalua el true o false
        if (response.data.direccionDelito == true && response.data.entrevista == true && 
            response.data.estatus == true && response.data.fechaSuceso == true &&   
            response.data.imputado == true && response.data.victima == true &&
            response.data.delito == true) 
        {
          //En caso de todo ser true procede a la remisión
          me.agregar();
          me.comprobarEnvios();
        } 
        //En caso de faltar algo a travez de operadores ternarios imprimiran lo que hace falta
        else 
        {
          alert
          (
            "Te hace falta " + 
            (response.data.direccionDelito == false ? "\n■ Ingresar la dirección del suceso" :"") +
            (response.data.entrevista == false ? "\n■ Ingresar una entrevista" :"") +
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
    listar() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RemisionesUI/Listar/" + me.rHechoId, configuracion)
        .then(function (response) {          
          me.oficios = response.data;

          // Contar el número de registros donde EnvioExitosoTF es false, esto con el proposito de no poder hacer mas remisiones si no se cancela o reenvia 
          me.countFalseEnvioExitosoTF = me.oficios.filter(function (oficio) {
            return !oficio.envioExitosoTF;
          }).length;

          //Dejo este console por si se requiere esta informacion
          console.log("Numero de remisiones fallidas:", me.countFalseEnvioExitosoTF);

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
    generarpdf() 
    {
      let me = this;
      var now = moment();
      me.generarQR(me.docRemision,me.nuc,me.u_nombre,now,me.idRemision);

      this.concaDyP = this.agencia.text + " de " + this.distrito.text;      
      this.$validator.validate().then((result) => 
      {
        if (this.idmodulo != "") 
        {
          if (result) 
          {
            this.fechas = this.generarfecha();
            this.mostrarpdf(this.u_nombre, this.u_puesto, this.u_agencia);
          }
        } else
          this.$notify("La agencia no cuenta con recepción de carpeta","error");});
    },
    imprimirdoc(item) 
    {
      let me = this;
      this.fechas = item.fechasys.substring(8, 10) + " de " + this.obtenermes(item.fechasys.substring(5, 7) - 1) + " del " + item.fechasys.substring(0, 4);
      this.numerooficio = item.numeroOficio;
      this.puesto = item.puestoA;
      this.concaDyP = item.dirigidoA;

      me.vistaPreviaTF = false;
      me.generarQR(me.docRemision,me.nuc,item.usuario,item.fechasys,item.idRemisionUI);

      setTimeout(() => 
      {
        this.imprimirpdf(item.usuario, item.uPuesto, item.uAgencia);
        this.modaldocumento = false;
      }, 1000);
    },
    generarfecha() 
    {
      var fecha;
      fecha = moment().format("DD") + " de " + moment().format("MMMM") + " del " + moment().format("YYYY");
      return fecha;
    },
    agregar() 
    {
      this.limpiar();
      this.modalAdd = true;
    },
    close() 
    {
      this.dialog = false;
      this.limpiar();
    },

    limpiar() 
    {
      this.numerooficio = "";
      this.agencia = "";
      this.dps = "";
      this.distrito = "";
      this.dirigido = "";
      this.puesto = "";
      this.idmodulo = "";
      this.nombremodulo = "";
      this.qrCode = null;
      this.vistaPreviaTF = true;
      this.Unclick = true;
    },
    async guardar() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      var descripcionRegTabI = "Registro de remision a " + me.distrito.text +", agencia " + me.agencia.text;

      me.$confirm
      (
        "Esperando confirmación",
        "¿Estas seguro de  que deseas enviar la carpeta? ",
        function () 
        {         
          me.Unclick = false; 
          //Se guarda en variable el distrito seleccionado para la remision
          me.distritoSeleccionado = me.distrito.value;          

          var cambioDistrito = 0;

          if (me.u_iddistrito == me.distrito.value) 
          {            
            cambioDistrito = 0;
          } else {            
            cambioDistrito = 1;
          }

          //Se crea el registro de la remisión
          this.$cat.post("api/RemisionesUI/Crear",
          {

            rhechoId: me.rHechoId,
            DirigidoA: me.concaDyP,
            Status: "Enviada",
            UDistrito: me.u_distrito,
            USubproc: me.u_dirSubPro,
            UAgencia: me.u_agencia,
            Usuario: me.u_nombre,
            UPuesto: me.u_puesto,
            UModulo: me.u_modulo,
            Moduloqueenvia: me.u_idmoduloservicio,
            AgenciaQueenvia: me.u_idagencia,
            PuestoA: me.puesto,
            FechaRechazo: "0001-01-01",
            NumeroOficio: me.numerooficio,
            ModuloServicioId: me.idmodulo,
            Nuc: me.nuc,
            EnvioExitosoTF : 1,


          },configuracion).then(function (response) 
          {
            me.$notify("La información se guardo correctamente !!!","success");

            //Guardado de id de la remision para eque en caso de falla actualizar que no se envio
            me.idRemision = response.data.idRemision;            

            var modulo = me.nombremodulo;
            var agencia = me.agencia.text;

            me.vistaPreviaTF = false;
            var now = moment();
            me.generarQR(me.docRemision,me.nuc,me.u_nombre,now,me.idRemision);

            //Se actualiza la ubicacion de carpeta al destino para asi hacer la clonacion
            this.$cat.put("api/RHechoes/ActualizarModuloyAgencia",
            {
              IdRHecho: me.rHechoId,
              moduloServicioId: me.idmodulo,
              agenciaId: me.agencia.value,

            },configuracion).then(function (response) 
            {

              me.$notify("La información se actualizo correctamente !!!","success");

              //Se crea el un historial de carpeta
              this.$cat.post("api/Historialcarpeta/Crear",
              {
                RHechoId: me.rHechoId,
                Detalle: "Remisión UI",
                Modulo: modulo,
                Agencia: agencia,
                UDistrito: me.u_distrito,
                USubproc: me.u_dirSubPro,
                UAgencia: me.u_agencia,
                Usuario: me.u_nombre,
                UPuesto: me.u_puesto,
                UModulo: me.u_modulo,

              },configuracion).then(function (response) 
              {
                
                //Se guarda un registro en el tablero de inactividad
                me.crearRegistroTableroI(descripcionRegTabI);

                me.$notify("La información se guardo correctamente !!!","success");

                //Esto condiciona para saber si se clona o no
                if (cambioDistrito) 
                {
                  me.$notify("Se inicia el copiado de Carpeta a otro distrito","success");                  

                  const services = 
                  [
                    //PONER EL DE COPIADO DE PERSONADESAP
                    "api/Racs/Clonar",
                    "api/RAtencions/Clonar",
                    "api/Nucs/Clonar",
                    "api/RHechoes/Clonar",
                    "api/RAPs/Clonar",
                    "api/AmpDecs/Clonar",
                    "api/RDHs/Clonar",
                    "api/Representante/Clonar",
                    "api/Turnoes/Clonar",
                    "api/RemisionesUI/Clonar",
                    "api/Historialcarpeta/Clonar", //LAS ORIGINALERS
                    "api/RActosInvestigacion/Clonar",
                    "api/RBitacoras/Clonar",
                    "api/RDiligencias/Clonar",
                    "api/Oficios/Clonar",
                    "api/C5i/Clonar",
                    "api/PersonaDesap/Clonar",
                    "api/VehiculoDesaparicionPersona/Clonar",
                    "api/DireccionDelitoes/Clonar",
                    "api/Vehiculos/Clonar",

                  ];
                  const serviceNames = 
                  [
                    "RAC",
                    "Atencion",
                    "NUC",
                    "Hecho",
                    "RAP",
                    "Ampliación de Declaración",
                    "Delitos",
                    "Representante",
                    "Turnos",
                    "Remisiones",
                    "Historial de Carpeta",
                    "Actos de Investigación",
                    "Bitacoras",
                    "Diligencias",
                    "Oficios",
                    "Formato C5i",
                    "Cedula de Personas Desaparecidas",
                    "Vehículos Relacionados con desaparición de personas",
                    "Direccion del Delito",
                    "Registro de Vehiculos",
                  ];                  

                  me.activarAnimacionCarga();

                  //Inicia el proceso de clonacion
                  copiarCarpeta(configuracion,services,serviceNames,0,me.nuc,me.rHechoId,me.rAtencionId,me.distritoSeleccionado,me.u_idmoduloservicio,me.u_idagencia,me.idRemision).then(function (response) 
                  {
                    me.desactivarAnimacionCarga();

                    //Y se comprueba que la remision haya sido exitosa
                    me.comprobarRemision();

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
                        "Error al intentar crear el  registro!!!",
                        "error"
                      );
                    }
                  });
                }
                //Este else es en caso de que solo sea una remision al mismo distrito
                else
                {
                  me.imprimirYDescargar();
                }
                //Cach de api/Historialcarpeta/Crear
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
                    "Error al intentar crear el  registro!!!",
                    "error"
                  );
                }
              });
             //Cach de api/RHechoes/ActualizarModuloyAgencia
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
                  "Error al intentar crear el  registro!!!",
                  "error"
                );
              }
            });
           //Cach de api/RemisionesUI/Crear
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
        function () 
        {
          alertify.warning("Verifica la información");
        }
      ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
    },
    //Funcion para imprimir el el oficio y al estar completado cerrar la carpeta
    async imprimirYDescargar()
    {
      let me = this;
      try 
      {
        await me.imprimirpdf(me.u_nombre, me.u_puesto, me.u_agencia);

        me.modalAdd = false;
        me.modaldocumento = false;
        me.cerrarcarpeta();

      } catch (error) {
        console.error("Error al ejecutar imprimirpdf:", error);
      }
    },
    //Api para comprobar si se ha realizado la remision correctamente
    comprobarRemision() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var comprobarModulo = "";
      //Pasaba que a pesar de supuestamente actualizarse el modulo servicio desde copiarCarpeta.js, en  base de datos aparecia null o con ceros
      var nulo = "00000000-0000-0000-0000-000000000000";

      //Para eso compruebo si se ha guardado correctamente por medio de este get
      this.$cat.get("api/RHechoes/ComprobarRemision/" + me.rHechoId, configuracion).then(function (response)
      {
        //Aqui guardo los resultados como el del modulo servicio
        comprobarModulo = response.data.moduloServicioId;

        //Aqui evaluo el el campo cayo en el error de ser null, asi que en caso de serlo, lo reparo en la agencia que envia la carpeta y aviso que no se realizo correctamente
        if (comprobarModulo == nulo) 
        {
          this.$cat.put("api/RHechoes/ActualizarModuloyAgencia",
            {

              IdRHecho: me.rHechoId,
              moduloServicioId: me.u_idmoduloservicio,
              agenciaId: me.u_idagencia,

            },configuracion).then(function (response) 
            {
              //Como ya se que cayo en este error, una vez reparado la ubicacion de la carpeta aviso que la remision no se logro
              alert("La remisión a FALLADO (CODIGO 404). Compruebe conexion a internet e intentelo mas tarde. La carpeta sigue en tu lista de carpetas asignadas");
            }).catch((err) => 
            {
              // Aqui ya no manejo en caso de error
            });
        }
        //De la misma forma si no es el caso que se guarda null pero se compuso desde el archivo js, evaluo si se quedo aqui mismo y tambien aviso que fallo la remision
        if (comprobarModulo == me.u_idmoduloservicio) 
        {
          alert("La remisión a FALLADO (CODIGO 404). Compruebe conexion a internet e intentelo mas tarde. La carpeta sigue en tu lista de carpetas asignadas");
        }
        //Ahora si no fallo en las remisiones y tampoco se compuso, quiere decir que si se realizo correctamente, aqui solo muestro el pdf
        if (comprobarModulo == me.idmodulo) 
        {
          //Aviso que la remision se hizo correctamente, si antes no la coloque fue que se requiere poner aceptar para que continue el mostrado de pdf, pero ahora considero que es correcto
          alert("La remision se realizo correctamente");

          var now = moment();
          me.vistaPreviaTF = false;
          me.generarQR(me.docRemision,me.nuc,me.u_nombre,now,me.idRemision);
          me.cargaDescarga = true;

          setTimeout(() => 
          {
            me.imprimirpdf(me.u_nombre, me.u_puesto, me.u_agencia);
            me.cargaDescarga = false;
          }, 1000);
        
        }

        //Asi falle o se logre la remision se va a cerrar la carpeta, con el proposito que no se hagan multiples remisiones
        //Ya que ya no requiere hacer eso por que existe el reenvio.
        setTimeout(() => 
        {
          me.modalAdd = false;
          me.modaldocumento = false;
          me.$store.state.rhechoid = "";
          me.$store.state.ratencionid = "";
          me.$store.state.nuc = "";
          me.$router.push("./umixta-carpetas");
        }, 2000);
          

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
    //Esta funcion esta en todos lados, y es para la creacion de un registro para el tablero de inactividad
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
    //funcion para corroborar las remisones fallidas desde la apí de lsitar, en  caso de haber, manda mensaje y cierra el modal de remision
    comprobarEnvios()
    {
      let me = this;
      //If sencillo, nada mas que explicar
      if(me.countFalseEnvioExitosoTF >= 1)
      {
        alert('Tienes remisiones sin enviar, si ya no las requieres reenviar, cancela el envio con el boton rojo.');
        me.modalAdd = false;
      }
    },
    //Funcion que llama a api que actualiza el registro de remision como enviado, o que ya no se requiere reenviar
    cancelarDerivacion(idRemision) 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      //Api para actualizar el envio exitoso, usado en copiarCarpeta.js pero a la inversa
      this.$cat.put('api/RemisionesUI/ActualizarEnvioExitoso',
        {
            'IdRemisionUI': idRemision,
            'EnvioExitosoTF': 1,

        }, configuracion).then(function(response) 
        {

          me.$notify("La información se guardo correctamente !!!", "success");

          //Funciones para que se actualice la pantalla y se vea el cambio afectuado
          me.listar();
          me.limpiar();

        }).catch((err) => 
        {
          if (err.response.status == 400) 
          {
            me.$notify("No es un usuario válido", "error");
          } 
          else if (err.response.status == 401) 
          {
            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion","error");
              (me.e401 = true), (me.showpage = false);
          } 
          else if (err.response.status == 403) 
          {
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } 
          else if (err.response.status == 404) 
          {
            me.$notify("El recuso no ha sido encontrado", "error");
          } 
          else 
          {
            me.$notify("Error al intentar crear el  registro!!!", "error");
          }
        });
    },
    //Funcion para realizar el reenvio de esta remision
    reenviarDerivacion(item) 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      //me.nuc,me.rHechoId,me.rAtencionId,me.distritoSeleccionado,me.u_idmoduloservicio,me.u_idagencia,me.idRemision
      //Aqui estarn las apis necesarias para el reenvio
      var distrito;
      var agencia;

      //Api para obtener el distrito a donde se esta enviando la carpeta
      this.$cat.get('api/RHechoes/ObtenerDistritoAgenciaOrigen/' + item.moduloServicioId,configuracion).then(function(response)
        {

          //Guardo la inform,acion en estas variables de esta funcion, en caso de requerirlas fuera declararlas de forma global
          distrito = response.data.distritoId;
          agencia = response.data.agenciaId;
        
          this.$cat.put('api/RemisionesUI/ActualizarEnvioExitoso',
            {
                'IdRemisionUI': item.idRemisionUI,
                'EnvioExitosoTF': 1,

            }, configuracion).then(function(response) 
            {
              //Una vez teniendo la informacion de a donde iban a mandar la carpeta, lo vuelvo a actualizar
              this.$cat.put("api/RHechoes/ActualizarModuloyAgencia",
                {

                  IdRHecho: me.rHechoId,
                  moduloServicioId: item.moduloServicioId,
                  agenciaId: agencia,

                },configuracion).then(function (response) 
                {
                  //Tema nuevo con respecto a una remision normal, aqui siempre se inician las clonaciones pues, de ser de manera local no habra caso donde falle una remision
                  me.$notify("Se inicia el renvio de la remision","success");

                  //Arreglo de todas las apis necesarias
                  const services = 
                  [
                    "api/Racs/Clonar",
                    "api/RAtencions/Clonar",
                    "api/Nucs/Clonar",
                    "api/RHechoes/Clonar",
                    "api/RAPs/Clonar",
                    "api/AmpDecs/Clonar",
                    "api/RDHs/Clonar",
                    "api/Representante/Clonar",
                    "api/Turnoes/Clonar",
                    "api/RemisionesUI/Clonar",
                    "api/Historialcarpeta/Clonar",
                    "api/RActosInvestigacion/Clonar",
                    "api/RBitacoras/Clonar",
                    "api/RDiligencias/Clonar",
                    "api/Oficios/Clonar",
                    "api/C5i/Clonar",
                    "api/PersonaDesap/Clonar",
                    "api/VehiculoDesaparicionPersona/Clonar",
                    "api/DireccionDelitoes/Clonar",
                    "api/Vehiculos/Clonar",

                  ];

                  //Arreglo con sus nombre y lo que se va a clonar
                  const serviceNames = 
                  [
                    "RAC",
                    "Atencion",
                    "NUC",
                    "Hecho",
                    "RAP",
                    "Ampliación de Declaración",
                    "Delitos",
                    "Representante",
                    "Turnos",
                    "Remisiones",
                    "Historial de Carpeta",
                    "Actos de Investigación",
                    "Bitacoras",
                    "Diligencias",
                    "Oficios",
                    "Formato C5i",
                    "Cedula de Personas Desaparecidas",
                    "Vehículos Relacionados con desaparición de personas",
                    "Direccion del Delito",
                    "Registro de Vehiculos",
                  ];

                  me.activarAnimacionCarga();

                  copiarCarpeta(configuracion,services,serviceNames,0,me.nuc,me.rHechoId,me.rAtencionId,distrito,item.moduloqueenvia,item.agenciaQueenvia,item.idRemisionUI).then(function (response) 
                  {

                    me.desactivarAnimacionCarga();

                    //Antes de mandar a revision de remision llamare a otra funcion que dira si la remision fue correcta.

                    me.paraMostrarMensajeRemisionRealizada(item.idRemisionUI);


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
                        "Error al intentar crear el  registro!!!",
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
                      "Error al intentar crear el  registro!!!",
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
                  "Error al intentar crear el  registro!!!",
                  "error"
                );
              }
            });
        }).catch(err => 
        {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", 'error')
          } else if (err.response.status == 401) {
            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
            me.e401 = true,
            me.showpage = false
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta pagina", 'error')
            me.e403 = true
            me.showpage = false
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", 'error')
          } else {
            me.$notify('Error al intentar listar los registros!!!', 'error')
          }
        })
    },
    paraMostrarMensajeRemisionRealizada(idRemisionUI) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RemisionesUI/ListarFallidos/" + idRemisionUI, configuracion)
        .then(function (response) {          
          me.oficios = response.data;

          // Contar el número de registros donde EnvioExitosoTF es false, esto con el proposito de no poder hacer mas remisiones si no se cancela o reenvia 
          var enviadoCorrecto = me.oficios.filter(function (oficio) {return !oficio.envioExitosoTF;}).length;

          //Dejo este console por si se requiere esta informacion
          if(enviadoCorrecto == 0)
          {
            alert("Remision realizada correctamente");
          }

          //Ahora si comprobamos envio, si se envia, muestra aviso de arriba y comprueba, si falla, en la misma funcion de comprobar dara el aviso
          me.comprobarRemision();
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
      return new Promise((resolve, reject) => 
      {
        try {
          let me = this;

          var dd = me.downloadPdf(nombre, puesto, agencia);
          var pdfMake = require("pdfmake/build/pdfmake.js");
          var htmlToPdfmake = require("html-to-pdfmake");

          if (pdfMake.vfs === undefined) {
            var pdfFonts = require("pdfmake/build/vfs_fonts.js");
            pdfMake.vfs = pdfFonts.vfs;
          }
          var doc = pdfMake.createPdf(dd);

          doc.download(null, () => {
            resolve();
          });

        } catch (error) {
          reject(error);
        }
      });
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
      var html = htmlToPdfmake(
        "Con fundamento en lo establecido en el artículo 21 de la Constitución Política de los Estados " +
          "Unidos Mexicanos; 127 y 131 del Código Nacional de Procedimientos Penales; 1, 2, 5, 6, 7 y 11 de " +
          "la Ley Orgánica del Ministerio Público del estado de Hidalgo, remito a usted la carpeta de " +
          "investigación con número único de caso citado al rubro, a efecto de seguir con la investigación de " +
          "los hechos que lo motivaron."
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
            text: "Asunto: Se remite carpeta de investigación\n\n",
            style: "Nooficio",
            alignment: "right",
          },
          {
            text:
              this.u_distrito +
              ", Hidalgo a " +
              this.fechas +
              "\n\n\n\n\n\n\n\n",
            style: "Fecha",
            alignment: "right",
          },

          {
            text: "\n\n\n\n" + this.puesto + "\n",
            style: "DePara",
          },
          {
            text: this.concaDyP + "\n\n\n",
            style: "DePara",
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
</style>
