<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Resolución</v-toolbar-title
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
        <v-flex xs12 sm6 md3>
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
        :items="oficios"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.usuario }}</td>
          <td>{{ props.item.uModulo }}</td>
          <td>
            {{
              props.item.fechasys.substring(8, 10) +
              " de " +
              obtenermes(props.item.fechasys.substring(5, 7) - 1) +
              " del " +
              props.item.fechasys.substring(0, 4)
            }}
          </td>
          <td>{{ props.item.tipo }}</td>
          <td>{{ props.item.subTipo }}</td>
          <td>{{ props.item.status }}</td>
          <td class="layout">
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
            <div v-if="props.item.status != 'Finalizado'" class="layout">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon
                    class="mr-2"
                    v-on="on"
                    @click="actualizarstatus(props.item)"
                  >
                    update
                  </v-icon>
                </template>
                <span>Actualizar status</span>
              </v-tooltip>
            </div>
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
            <v-toolbar-title>Nueva resolución.</v-toolbar-title>
            <v-spacer />
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
                    <v-flex class="espaciado" xs12 sm12 md6 lg6>
                      <v-autocomplete
                        name="tipo de resolución"
                        :items="tresoluciones"
                        v-model="tresolucion"
                        v-validate="'required'"
                        @change="seleccionarsubtipo()"
                        label="*Tipo de Determinaciones:"
                        return-object
                        :error-messages="errors.collect('tipo de resolución')"
                      />
                      <v-autocomplete
                        name="víctima"
                        :items="victimas"
                        v-model="victima"
                        v-validate="'required'"
                        label="*Victimas:"
                        attach
                        chips
                        deletable-chips
                        multiple
                        :error-messages="errors.collect('víctima')"
                        v-if="this.subtipo.value !== 'Externa'"
                      />
                      <v-autocomplete
                        name="delito"
                        :items="delitos"
                        v-model="delito"
                        v-validate="'required'"
                        label="*Delitos:"
                        attach
                        chips
                        deletable-chips
                        multiple
                        :error-messages="errors.collect('delito')"
                        v-if="this.subtipo.value !== 'Externa'"
                      />
                      <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        :return-value.sync="fecharesolucion"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                        v-if="this.subtipo.value !== 'Externa'"
                      >
                        <template
                          v-slot:activator="{ on }"
                          v-if="this.subtipo.value !== 'Externa'"
                        >
                          <v-text-field
                            name="fecha de resolución"
                            :value="fechare"
                            label="Fecha de resolución"
                            prepend-icon="event"
                            clearable
                            readonly
                            v-on="on"
                            :error-messages="
                              errors.collect('fecha de resolución')
                            "
                          />
                        </template>
                        <v-date-picker
                          locale="es-mx"
                          v-model="fecharesolucion"
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
                        ref="menu3"
                        v-model="menu3"
                        :close-on-content-click="false"
                        :return-value.sync="fechaautorizacion"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                        v-if="this.subtipo.value !== 'Externa'"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            name="fecha de autorización"
                            :value="fechaau"
                            label="Fecha de autorización"
                            prepend-icon="event"
                            clearable
                            readonly
                            v-on="on"
                            :error-messages="
                              errors.collect('fecha de autorización')
                            "
                          />
                        </template>
                        <v-date-picker
                          locale="es-mx"
                          v-model="fechaautorizacion"
                          no-title
                          scrollable
                        >
                          <v-spacer />
                          <v-btn text color="primary" @click="menu3 = false"
                            >Cancel</v-btn
                          >
                          <v-btn text color="primary" @click="fechainif()"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex class="espaciado" xs12 sm12 md6 lg6>
                      <v-autocomplete
                        name="subtipo"
                        :items="subtiposf"
                        v-model="subtipo"
                        v-validate="'required'"
                        label="*Subtipo:"
                        return-object
                        :error-messages="errors.collect('subtipo')"
                      />
                      <v-autocomplete
                        name="imputado"
                        :items="imputados"
                        v-model="imputado"
                        v-validate="'required'"
                        label="*Imputados:"
                        attach
                        chips
                        deletable-chips
                        multiple
                        :error-messages="errors.collect('imputado')"
                        v-if="this.subtipo.value !== 'Externa'"
                      />
                      <v-text-field
                        name="causa penal"
                        label="Causa penal:"
                        v-model="causapenal"
                        :error-messages="errors.collect('causa penal')"
                        v-if="this.subtipo.value !== 'Externa'"
                      />
                      <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :return-value.sync="fechaconsulta"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                        v-if="this.subtipo.value !== 'Externa'"
                      >
                        <template
                          v-slot:activator="{ on }"
                          v-if="this.subtipo.value !== 'Externa'"
                        >
                          <v-text-field
                            name="fecha de consulta"
                            :value="fechaco"
                            label="Fecha de consulta"
                            prepend-icon="event"
                            clearable
                            readonly
                            v-on="on"
                            :error-messages="
                              errors.collect('fecha de consulta')
                            "
                          />
                        </template>
                        <v-date-picker
                          locale="es-mx"
                          v-model="fechaconsulta"
                          no-title
                          scrollable
                        >
                          <v-spacer />
                          <v-btn text color="primary" @click="menu2 = false"
                            >Cancel</v-btn
                          >
                          <v-btn text color="primary" @click="fechainif()"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                      <v-toolbar
                        color="primary"
                        dark
                        v-if="this.subtipo.value !== 'Externa'"
                      >
                        <v-toolbar-title>Documento escaneado</v-toolbar-title>
                        <v-spacer />
                        <v-dialog v-model="dialog" max-width="500px">
                          <v-btn slot="activator" icon>
                            <v-icon>camera</v-icon>
                          </v-btn>
                          <v-card>
                            <v-toolbar
                              card
                              dark
                              color="grey lighten-4 primary--text"
                            >
                              <v-avatar size="30">
                                <v-icon class="grey lighten-2">camera</v-icon>
                              </v-avatar>
                              <v-toolbar-title class="subheading"
                                >Escanear documento</v-toolbar-title
                              >
                              <v-spacer />
                            </v-toolbar>
                            <v-card-text>
                              <v-form ref="form">
                                <v-card-actions>
                                  <v-layout row wrap>
                                    <vue-web-cam
                                      ref="webcam"
                                      :device-id="deviceId"
                                      height="400px"
                                      @started="onStarted"
                                      @stopped="onStopped"
                                      @error="onError"
                                      @cameras="onCameras"
                                      @camera-change="onCameraChange"
                                    />
                                    <v-flex xs12 sm6 md3 order-md4 order-sm2>
                                      <v-card tile flat>
                                        <v-card-text class="text-md-center">
                                          <v-btn
                                            fab
                                            small
                                            color="info"
                                            @click="onClose"
                                          >
                                            <v-icon>close</v-icon>
                                          </v-btn>
                                        </v-card-text>
                                      </v-card>
                                    </v-flex>
                                    <v-flex xs12 sm6 md3 order-md3 order-sm1>
                                      <v-card tile flat>
                                        <v-card-text class="text-md-center">
                                          <v-btn
                                            fab
                                            small
                                            color="info"
                                            @click="onCapture"
                                          >
                                            <v-icon>photo_camera</v-icon>
                                          </v-btn>
                                        </v-card-text>
                                      </v-card>
                                    </v-flex>
                                    <v-flex xs12 sm6 md3 order-md2 order-sm4>
                                      <v-card tile flat>
                                        <v-card-text class="text-md-center">
                                          <v-btn
                                            fab
                                            small
                                            color="info"
                                            @click="onStop"
                                          >
                                            <v-icon>stop</v-icon>
                                          </v-btn>
                                        </v-card-text>
                                      </v-card>
                                    </v-flex>
                                    <v-flex xs12 sm6 md3 order-md1 order-sm3>
                                      <v-card tile flat>
                                        <v-card-text class="text-md-center">
                                          <v-btn
                                            fab
                                            small
                                            color="info"
                                            @click="onStart"
                                          >
                                            <v-icon>play_arrow</v-icon>
                                          </v-btn>
                                        </v-card-text>
                                      </v-card>
                                    </v-flex>
                                  </v-layout>
                                </v-card-actions>
                              </v-form>
                            </v-card-text>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                      <v-card>
                        <v-container
                          fluid
                          grid-list-md
                          v-if="this.subtipo.value !== 'Externa'"
                        >
                          <v-layout row wrap>
                            <v-flex class="text-md-center">
                              <img :src="imageUrl" height="150px" />
                              <pdf :src="imageUrl" height="150px" />
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card>
                      <v-text-field
                        label="Selecciona la imagen del documento de identificación"
                        @click="pickFile"
                        v-model="imageName"
                        prepend-icon="attach_file"
                        v-if="this.subtipo.value !== 'Externa'"
                      />
                      <input
                        type="file"
                        style="display: none"
                        ref="image"
                        @change="onFilePicked"
                        v-if="this.subtipo.value !== 'Externa'"
                      />
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
      <v-dialog v-model="dialogoact" max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">update</v-icon>
            </v-avatar>
            <v-toolbar-title class="subheading"
              >Actualizar status</v-toolbar-title
            >
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-container grid-list-md text-xs-center>
                <v-layout wrap>
                  <v-flex class="espaciado" xs12 sm12 md12 lg12>
                    <v-autocomplete
                      name="status"
                      :items="statuses"
                      v-model="status"
                      label="*Estatus:"
                      :error-messages="errors.collect('status')"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-spacer />
                <v-btn @click.native="dialogoact = false">Cerrar</v-btn>
                <v-btn color="success" @click.native="actualizarstatusfinal"
                  >Guardar</v-btn
                >
              </v-card-actions>
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
                @click.native="guardarTipoResolucion()"
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
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import VeeValidate from "vee-validate";
import { WebCam } from "vue-web-cam";
import pdf from "vue-pdf";
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
    "vue-web-cam": WebCam,
    pdf,
    n403,
  },
  data: () => ({
    alert: false,
    dialog: false,
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
    texto: "",

    //----------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------

    //img: null,
    camera: null,
    deviceId: null,
    devices: [],

    imageName: "",
    imageUrl: null,
    imageFile: [],
    imageFile2: [],
    rutaDocumento: "",
    mostrarPDFUpload: false,
    disablePDFUpload: false,
    //----------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------

    oficios: [],
    victimas: [],
    victima: "",
    imputados: [],
    imputado: "",
    delitos: [],
    delito: "",
    causapenal: "",
    menu1: false,
    menu2: false,
    menu3: false,
    fechaautorizacion: "",
    fechaau: "",
    fechaconsulta: "",
    fechaco: "",
    fecharesolucion: "",
    fechare: "",
    statuses: [
      { text: "Pendiente", value: "Pendiente" },
      { text: "Cancelado", value: "Cancelado" },
      { text: "Finalizado", value: "Finalizado" },
    ],
    status: "",
    tresoluciones: [
      { text: "Archivo temporal", value: 1 },
      { text: "Facultad de abstención a investigar", value: 2 },
      { text: "No ejercicio de la acción penal", value: 3 },
      { text: "Criterios de oportunidad", value: 4 },
      { text: "Incompetencia", value: 5 },
      { text: "Acumulación", value: 6 },
      { text: "Acuerdo Reparatorio", value: 7 },
      { text: "Sobreseimiento", value: 8 },
      { text: "Extición de la Acción Penal", value: 9 },
      { text: "Suspención Condicional del Proceso", value: 10 },
      {
        text: "Sobreseimiento por Cumplir con la Suspensión Condicional",
        value: 11,
      },
      { text: "Procedimiento Abreviado", value: 12 },
      { text: "Suspensión del Proceso", value: 13 },
      { text: "Juicio", value: 14 },
    ],
    tresolucion: "",
    subtipos1: [
      {
        text: "Archivo temporal",
        value: "Archivo temporal",
        value2: "ARCHIVO TEMPORAL (AUTORIZADO)",
      },
    ],
    subtipos2: [
      {
        text: "El hecho que se denunció, no constituye delito.",
        value: "El hecho que se denunció, no constituye delito.",
        value2: "ABTENCION DE LA INVESTIGACION",
      },
      {
        text: "Se encuentra extinguida la acción penal porque:",
        value: "Se encuentra extinguida la acción penal porque:",
        value2: "ABTENCION DE LA INVESTIGACION",
      },
      {
        text: "La querella está prescrita.",
        value: "La querella está prescrita.",
        value2: "ABTENCION DE LA INVESTIGACION",
      },
      {
        text: "Perdón del ofendido.",
        value: "Perdón del ofendido.",
        value2: "ABTENCION DE LA INVESTIGACION",
      },
      {
        text: "De las manifestaciones de la víctima se advierte que por esos mismos hechos ya se cumplió una pena.",
        value:
          "De las manifestaciones de la víctima se advierte que por esos mismos hechos ya se cumplió una pena.",
        value2: "ABTENCION DE LA INVESTIGACION",
      },
      {
        text: "De las manifestaciones de la víctima se advierte que por esos mismos hechos ya existió una sentencia anterior.",
        value:
          "De las manifestaciones de la víctima se advierte que por esos mismos hechos ya existió una sentencia anterior.",
        value2: "ABTENCION DE LA INVESTIGACION",
      },
      {
        text: "De las manifestaciones de la víctima se advierte que el imputado a quien se atribuye la conducta ya falleció.",
        value:
          "De las manifestaciones de la víctima se advierte que el imputado a quien se atribuye la conducta ya falleció.",
        value2: "ABTENCION DE LA INVESTIGACION",
      },
      {
        text: "Las partes victimal e imputada, celebraron un acuerdo reparatorio en sede ministerial, y el mismo fue cabalmente cumplido.",
        value:
          "Las partes victimal e imputada, celebraron un acuerdo reparatorio en sede ministerial, y el mismo fue cabalmente cumplido.",
        value2: "ABTENCION DE LA INVESTIGACION",
      },
    ],
    subtipos3: [
      {
        text: "El hecho que se denunció, no constituye delito.",
        value: "El hecho que se denunció, no constituye delito.",
        value2:
          "NO EJERCICIO DE LA ACCION PENAL PORQUE EL HECHO NO CONSTITUYO DELITO",
      },
      {
        text: "Ha operado la prescripción para formular la querella.",
        value: "Ha operado la prescripción para formular la querella.",
        value2: "NO EJERCICIO DE LA ACCION PENAL POR PRESCRIPCION",
      },
      {
        text: "Extinción de la acción penal por aplicación de criterio de oportunidad, y el mismo fue cabalmente cumplido.",
        value:
          "Extinción de la acción penal por aplicación de criterio de oportunidad, y el mismo fue cabalmente cumplido.",
        value2:
          "NO EJERCICIO DE LA ACCION PENAL POR CUMPLIMIENTO DE CRITERIO DE OPORTUNIDAD",
      },
      {
        text: "Ha operado la prescripción para poder ejercer acción penal.",
        value: "Ha operado la prescripción para poder ejercer acción penal.",
        value2: "NO EJERCICIO DE LA ACCION PENAL POR PRESCRIPCION",
      },
      {
        text: "La parte ofendida otorgó el perdón a favor de la parte imputada.",
        value:
          "La parte ofendida otorgó el perdón a favor de la parte imputada.",
        value2:
          "NO EJERCICIO DE LA ACCION PENAL POR PERDON DEL OFENDIDO O VICTIMA",
      },
      {
        text: "El hecho que se denunció ante la representación social, en realidad no se cometió.",
        value:
          "El hecho que se denunció ante la representación social, en realidad no se cometió.",
        value2: "NO EJERCICIO DE LA ACCION PENAL PORQUE EL HECHO NO SE COMETIO",
      },
      {
        text: "Posterior a los hechos, surgió una reforma normativa que derogó el delito por el que se denunció, y aquellos hechos no encuadran en ninguna otra calificación jurídica. ",
        value:
          "Posterior a los hechos, surgió una reforma normativa que derogó el delito por el que se denunció, y aquellos hechos no encuadran en ninguna otra calificación jurídica. ",
        value2: "NO EJERCICIO DE LA ACCION PENAL POR SUPRESION DEL TIPO PENAL",
      },
      {
        text: "Los hechos motivo de la presente carpeta de investigación, ya fueron materia de otro proceso en que se ha resuelto de manera definitiva el conflicto penal.",
        value:
          "Los hechos motivo de la presente carpeta de investigación, ya fueron materia de otro proceso en que se ha resuelto de manera definitiva el conflicto penal.",
        value2:
          "NO EJERCICIO DE LA ACCION PENAL POR EXISTENCIA DE SENTENCIA EN OTRO PROCESO POR LOS MISMOS HECHOS",
      },
      {
        text: "La única persona que podría tener el carácter de imputado, ya falleció.",
        value:
          "La única persona que podría tener el carácter de imputado, ya falleció.",
        value2:
          "NO EJERCICIO DE LA ACCION PENAL POR MUERTE DE LA PERSONA IMPUTADA",
      },
      {
        text: "Las partes victimal e imputada, celebraron un acuerdo reparatorio en sede ministerial, y el mismo fue cabalmente cumplido",
        value:
          "Las partes victimal e imputada, celebraron un acuerdo reparatorio en sede ministerial, y el mismo fue cabalmente cumplido",
        value2:
          "NO EJERCICIO DE LA ACCION PENAL POR CUMPLIMIENTO DE ACUERDO REPARATORIO (ANTES DE JUDICIALIZAR)",
      },
    ],
    subtipos4: [
      {
        text: "Criterios de oportunidad",
        value: "Criterios de oportunidad",
        value2: "",
      },
    ],
    subtipos5: [
      { text: "Interna", value: "Interna", value2: "INCOMPETENCIA INTERNA" },
      { text: "Externa", value: "Externa", value2: "INCOMPETENCIA EXTERNA" },
    ],
    subtipos6: [
      { text: "Acumulación", value: "Acumulación", value2: "ACUMULADA" },
    ],
    subtipos7: [
      {
        text: "Por cumplimiento de acuerdo reparatorio.",
        value: "Por cumplimiento de acuerdo reparatorio.",
        value2: "SOBRESEIMIENTO POR CUMPLIMIENTO DE ACUERDO REPARATORIO",
      },
      {
        text: "Aprobado por Ministerio Público.",
        value: "Aprobado por Ministerio Público.",
        value2: "APROBADO POR MINISTERIO PÚBLICO",
      },
      {
        text: "Aprobado por Juez del Control.",
        value: "Aprobado por Juez del Control.",
        value2: "APROBADO POR JUEZ DEL CONTROL",
      },
    ],
    subtipos8: [
      {
        text: "Cumplimiento de la suspensión condicional del proceso.",
        value: "Cumplimiento de la suspensión condicional del proceso.",
        value2: "CUMPLIMIENTO DE LA SUSPENSIÓN CONDICIONAL DEL PROCESO",
      },
      {
        text: "Perdón Legal.",
        value: "Perdón Legal.",
        value2: "PERDÓN LEGAL",
      },
    ],
    subtipos9: [
      {
        text: "Cumplimiento de la Pena o Medida de Seguridad.",
        value: "Cumplimiento de la Pena o Medida de Seguridad.",
        value2: "CUMPLIMIENTO DE LA PENA O MEDIDA DE SEGURIDAD",
      },
      {
        text: "Muerte del Acusado o Sentenciado.",
        value: "Muerte del Acusado o Sentenciado.",
        value2: "MUERTE DEL ACUSADO O SENTENCIADO",
      },
      {
        text: "Reconocimiento de Inocencia del Sentenciado o Anulación de Sentencia.",
        value:
          "Reconocimiento de Inocencia del Sentenciado o Anulación de Sentencia.",
        value2:
          "RECONOCIMIENTO DE INOCENCIA DEL SENTENCIADO O ANULACIÓN DE SENTENCIA",
      },
      {
        text: "Perdon de la Persona Ofendida en los Delitos de Querella.",
        value: "Perdon de la Persona Ofendida en los Delitos de Querella.",
        value2: "PERDON DE LA PERSONA OFENDIDA EN LOS DELITOS DE QUERELLA",
      },
      { text: "Indulto.", value: "Indulto.", value2: "INDULTO" },
      { text: "Amnistia.", value: "Amnistia.", value2: "AMNISTIA" },
      { text: "Prescripción.", value: "Prescripción.", value2: "PRESCRIPCIÓN" },
      {
        text: "Supresión del Tipo Penal.",
        value: "Supresión del Tipo Penal.",
        value2: "SUPRESIÓN DEL TIPO PENAL",
      },
      {
        text: "Existencia de una Sentencia Anterior.",
        value: "Existencia de una Sentencia Anterior.",
        value2: "EXISTENCIA DE UNA SENTENCIA ANTERIOR",
      },
      {
        text: "Cumplimiento del Criterio de Oportunidad o Solución Alterna Correspondiente.",
        value:
          "Cumplimiento del Criterio de Oportunidad o Solución Alterna Correspondiente.",
        value2:
          "CUMPLIMIENTO DEL CRITERIO DE OPORTUNIDAD O SOLUCIÓN ALTERNA CORRESPONDIENTE",
      },
    ],
    subtipos10: [
      {
        text: "Suspensión Condicional del Proceso.",
        value: "Suspensión Condicional del Proceso.",
        value2: "SUSPENCION CONDICIONAL DEL PROCESO",
      },
    ],
    subtipos11: [
      {
        text: "Sobreseimiento por Cumplir con la Suspensión Condicional.",
        value: "Sobreseimiento por Cumplir con la Suspensión Condicional.",
        value2: "SOBRESEIMIENTO POR CUMPLIR CON LA SUSPENSIÓN CONDICIONAL",
      },
    ],
    subtipos12: [
      {
        text: "Procedimiento Abreviado.",
        value: "Procedimiento Abreviado.",
        value2: "PROCEDIMIENTO ABREVIADOO",
      },
    ],
    subtipos13: [
      {
        text: "Sustracción del Imputado a la Acción de la Justicia.",
        value: "Sustracción del Imputado a la Acción de la Justicia.",
        value2: "SUSTRACCIÓN DEL IMPUTADO A LA ACCIÓN DE LA JUSTICIA",
      },
      {
        text: "El Imputado Adquiera Algún Transtorno Mental Temporal Durante el Proceso.",
        value:
          "El Imputado Adquiera Algún Transtorno Mental Temporal Durante el Proceso.",
        value2:
          "EL IMPUTADO ADQUIERA ALGÚN TRANSTORNO MENTAL TEMPORAL DURANTE EL PROCESO",
      },
      {
        text: "El Delito es de Aquellos Contra los que NO se Puede Proceder sin que Sean Satisfechos Determinados Requisitos.",
        value:
          "El Delito es de Aquellos Contra los que NO se Puede Proceder sin que Sean Satisfechos Determinados Requisitos.",
        value2:
          "EL DELITO ES DE AQUELLOS CONTRA LOS QUE NO SE PUEDE PROCEDER SIN QUE SEAN SATISFECHOS DETERMINADOS REQUISITOS",
      },
    ],
    subtipos14: [
      {
        text: "Fallo Condenatorio.",
        value: "Fallo Condenatorio.",
        value2: "FALLO CONDENATORIO",
      },
      {
        text: "Fallo Absolutorio.",
        value: "Fallo Absolutorio.",
        value2: "FALLO ABSOLUTORIO",
      },
    ],
    subtiposf: [],
    subtipo: "",
    numerooficio: "",
    dialogoact: false,
    idNuc: "",
    IdResolucion: "",
    headers: [
      { text: "Emitida por", value: "usuario", sortable: true },
      { text: "Módulo", value: "modulo", sortable: true },
      { text: "Fecha generación", value: "fechasys" },
      { text: "Tipo de resolución", value: "tipo" },
      { text: "Subtipo", value: "subTipo" },
      { text: "Estatus", value: "status" },
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
    //----------------------------------------------------
    texto: 'Vista Previa',
    qrCode: null,
    docResolucion: 'Resolución',
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

    cerrarcarpeta() {
      this.$store.state.rhechoid = null;
      this.$store.state.nuc = null;
      this.$router.push("./umixta-carpetas");
    },
    listarrHecho() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RHechoes/ListarPorId/" + me.rHechoId, configuracion)
        .then(function (response) {
          (me.agenciaid = response.data.agenciaid),
            (me.idNuc = response.data.nucId);

          me.informacionagencia();
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
        this.$refs.menu1.save(this.fecharesolucion);
      }
      if (this.menu2) {
        this.generarfecha2();
        this.$refs.menu2.save(this.fechaconsulta);
      }
      if (this.menu3) {
        this.generarfecha2();
        this.$refs.menu3.save(this.fechaautorizacion);
      }
    },
    generarfecha2() {
      if (this.menu1)
        this.fechare =
          this.fecharesolucion.substring(8, 10) +
          " de " +
          this.obtenermes(this.fecharesolucion.substring(5, 7) - 1) +
          " del " +
          this.fecharesolucion.substring(0, 4);
      if (this.menu2)
        this.fechaco =
          this.fechaconsulta.substring(8, 10) +
          " de " +
          this.obtenermes(this.fechaconsulta.substring(5, 7) - 1) +
          " del " +
          this.fechaconsulta.substring(0, 4);
      if (this.menu3)
        this.fechaau =
          this.fechaautorizacion.substring(8, 10) +
          " de " +
          this.obtenermes(this.fechaautorizacion.substring(5, 7) - 1) +
          " del " +
          this.fechaautorizacion.substring(0, 4);
    },

    listarPersonas() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var contador = 0;
      var personasArray = [];
      me.$CAT
        .get("api/RAPs/ListarTodosVic/" + me.rAtencionId, configuracion)
        .then(function (response) {
          //console.log(response.data)
          personasArray = response.data;
          personasArray.map(function (x) {
            me.victimas.push({
              text: x.nombreCompleto,
              value: x.nombreCompleto,
            });
            contador++;
          });

          me.$CAT
            .get("api/RAPs/ListarTodosImp/" + me.rAtencionId, configuracion)
            .then(function (response) {
              //console.log(response.data)
              personasArray = response.data;
              personasArray.map(function (x) {
                me.imputados.push({
                  text: x.nombreCompleto,
                  value: x.nombreCompleto,
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
    //-----------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      console.log("On Camera Change Event", deviceId);
    },
    onStarted(stream) {
      console.log("On Started Event", stream);
    },
    onStopped(stream) {
      console.log("On Stopped Event", stream);
    },
    onCameras(cameras) {
      this.devices = cameras;
      console.log("On Cameras Event", cameras);
    },
    onError(error) {
      console.log("On Error Event", error);
    },
    onStop() {
      this.$refs.webcam.stop();
    },
    onStart() {
      this.$refs.webcam.start();
    },

    onCapture() {
      this.imageUrl = this.$refs.webcam.capture();
      var blob = this.dataURItoBlob(this.imageUrl, "image/jpg");
      var file = new File([blob], "Documento.jpg", {
        type: "image/jpg",
        lastModified: Date.now(),
      });
      this.imageFile = file;
      this.imageName = this.imageFile.name;
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    pickFile() {
      this.removeImage();
      this.$refs.image.click();
    },
    removeImage() {
      this.$refs.image.value = "";
    },
    onClose() {
      this.dialog = false;
    },
    cambiarResolucion() {
      let me = this;
      if (me.trepresentante.length > 2) {
        me.trepresentante.pop();
        me.$notify("Maximo 2 tipos de representantes", "error");
      }
      me.trepresentante.sort((a, b) => (a.value > b.value ? 1 : -1));

      var entre = false;

      me.trepresentante.forEach(function (registro) {
        if (registro.text == "Asesor Juridico") {
          me.bolaux = true;
          entre = true;
        }
      });
      if (!entre) me.bolaux = false;
    },
    seleccionarsubtipo() {
      let me = this;
      me.subtiposf = [];

      if (me.tresolucion.value == 1) me.subtiposf = me.subtipos1;
      else if (me.tresolucion.value == 2) me.subtiposf = me.subtipos2;
      else if (me.tresolucion.value == 3) me.subtiposf = me.subtipos3;
      else if (me.tresolucion.value == 4) me.subtiposf = me.subtipos4;
      else if (me.tresolucion.value == 5) me.subtiposf = me.subtipos5;
      else if (me.tresolucion.value == 6) me.subtiposf = me.subtipos6;
      else if (me.tresolucion.value == 7) me.subtiposf = me.subtipos7;
      else if (me.tresolucion.value == 8) me.subtiposf = me.subtipos8;
      else if (me.tresolucion.value == 9) me.subtiposf = me.subtipos9;
      else if (me.tresolucion.value == 10) me.subtiposf = me.subtipos10;
      else if (me.tresolucion.value == 11) me.subtiposf = me.subtipos11;
      else if (me.tresolucion.value == 12) me.subtiposf = me.subtipos12;
      else if (me.tresolucion.value == 13) me.subtiposf = me.subtipos13;
      else if (me.tresolucion.value == 14) me.subtiposf = me.subtipos14;

      console.log("valor de la combo:" + this.esta);
      if (me.tresolucion.value > 0 && me.tresolucion.value < 4) {
        me.mostrarPDFUpload = true;
        me.disablePDFUpload = true;
      } else {
        me.mostrarPDFUpload = false;
        me.disablePDFUpload = false;
      }
    },

    generateUUID: function () {
      // Public Domain/MIT
      var d = new Date().getTime();
      if (
        typeof performance !== "undefined" &&
        typeof performance.now === "function"
      ) {
        d += performance.now(); //use high-precision timer if available
      }
      var newGuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );

      return newGuid;
    },
    archivo() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var nombreCarpeta;

      if (me.imageFile2) {
        let formData = new FormData();
        formData.append("file", me.imageFile2);
        nombreCarpeta = "C" + me.nuc.substr(1);
        me.GUID = me.generateUUID();

        me.$CAT
          .post(
            "api/Representante/Post/" + nombreCarpeta + "/" + me.GUID,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
            configuracion
          )
          .then(function (response) {
            console.log("SUCCESS!!");

            me.$CAT
              .post(
                "api/Representante/CrearDocRepresentante",
                {
                  representanteId: me.idrepresentante,
                  tipoDocumento: me.docidentificacion2,
                  nombreDocumento: me.GUID,
                  ruta: response.data.ruta,
                  fecha: me.generarfecha,
                  uDistrito: me.u_distrito,
                  uSubproc: me.u_dirSubPro,
                  uAgencia: me.u_agencia,
                  uUsuario: me.u_nombre,
                  uPuesto: me.u_puesto,
                  uModulo: me.u_modulo,
                },
                configuracion
              )
              .then(function (response) {
                me.$notify(
                  "La información se guardo correctamente !!!",
                  "success"
                );
                me.dialogarchivo = false;
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
                    "Error al intentar actualizar el registro!!!",
                    "error"
                  );
                }
              });
          })
          .catch(function () {
            console.log("FAILURE2!!");
          });
      }
      guardarTipoResolucion;
    },
    guardarTipoResolucion() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var nombreCarpeta;
      me.imageFile2 = me.imageFile;
      console.log("total de archivos:" + me.imageFile2.length);
      console.log(me.imageFile2);

      if (me.tresolucion.value > 0 && me.tresolucion.value < 4) {
        console.log("total de archivos:" + me.imageFile2.length);

        if (me.imageFile2.length != 0) {
          let formData = new FormData();
          formData.append("file", me.imageFile2);
          nombreCarpeta = "C" + me.nuc.substr(1);
          me.GUID = me.generateUUID();

          me.$CAT
            .post(
              "api/Representante/Post/" + nombreCarpeta + "/" + me.GUID,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              },
              configuracion
            )
            .then(function (response) {
              console.log("SUCCESS!!");
              console.log("RUTA:" + response.data.ruta);
              me.rutaDocumento = response.data.ruta;
              me.guardar();
            });
        } else {
          me.rutaDocumento = "";
          me.guardar();
        }
      } else {
        me.rutaDocumento = "";
        me.guardar();
      }
    },
    //-----------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------
    listardelitos() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var delitosArray = [];
      me.$CAT
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

      let me = this;

      var now = moment();
      me.generarQR(me.docResolucion,me.nuc,me.u_nombre,now,me.IdResolucion);
      this.$validator.validate().then((result) => {
        if (result) {
          this.fechas = this.generarfecha();
          this.mostrarpdf(this.u_nombre, this.u_puesto, this.u_agencia);
        }
      });
    },

    imprimirdoc(item) {
      let me = this;
      this.texto = item.textoDocumento + "\n";
      this.causapenal = item.causaPenal;
      this.fechas =
        item.fechasys.substring(8, 10) +
        " de " +
        this.obtenermes(item.fechasys.substring(5, 7) - 1) +
        " del " +
        item.fechasys.substring(0, 4);
      this.numerooficio = item.numeroOficio;

      me.vistaPreviaTF = false;
      me.generarQR(me.docResolucion,me.nuc,item.usuario,item.fechasys,item.idResolucion);

      setTimeout(() => 
      {
        this.imprimirpdf(item.usuario, item.uPuesto, item.uAgencia);
        this.modaldocumento = false;
      }, 1000);

      
    },
    actualizarstatus(item) {
      this.status = item.status;
      this.IdResolucion = item.idResolucion;
      this.subtipo = item.subTipo;
      this.tresolucion = item.tipo;
      this.dialogoact = true;
    },
    actualizarstatusfinal() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      var estados = [],
        estado = "";

      if (me.tresolucion == "Archivo temporal") estados = me.subtipos1;
      else if (me.tresolucion == "Facultad de abstención de investigar")
        estados = me.subtipos2;
      else if (me.tresolucion == "No ejercicio de la acción penal")
        estados = me.subtipos3;
      else if (me.tresolucion == "Criterios de oportunidad")
        estados = me.subtipos4;
      else if (me.tresolucion == "Incompetencia") estados = me.subtipos5;
      else if (me.tresolucion == "Acumulación") estados = me.subtipos6;
      else if (me.tresolucion == "Acuerdo Reparatorio") estados = me.subtipos7;

      for (var i = 0; i < estados.length; i++)
        if (estados[i].text == me.subtipo) estado = estados[i].value2;

        me.$CAT
        .put(
          "api/Resolucion/Actualizar",
          {
            IdResolucion: me.IdResolucion,
            status: me.status,
          },
          configuracion
        )
        .then(function (response) {
          me.$notify("La información se guardo correctamente !!!", "success");

          if (
            me.subtipo != "Criterios de oportunidad" &&
            me.status == "Finalizado"
          ) {
            me.$CAT
              .put(
                "api/Nucs/Actualizar",
                {
                  idNuc: me.idNuc,
                  statusNUC: estado,
                },
                configuracion
              )
              .then(function (response) {
                me.$notify(
                  "La información se actualizo correctamente !!!",
                  "success"
                );

                me.$CAT
                  .post(
                    "api/Historialcarpeta/Crear",
                    {
                      RHechoId: me.rHechoId,
                      Detalle: estado,
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
                    "Error al intentar actualizar el registro!!!",
                    "error"
                  );
                }
              });
          }

          me.listar();
          me.limpiar();
          me.dialogoact = false;
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

    agregar() {
      this.limpiar();
      this.modalAdd = true;
    },
    limpiar() {
      this.numerooficio = "";
      this.texto = "";
      this.fechare = "";
      this.fecharesolucion = "";
      this.fechaco = "";
      this.fechaconsulta = "";
      this.fechaau = "";
      this.fechaautorizacion = "";
      this.victima = "";
      this.delito = "";
      this.imputado = "";
      this.tresolucion = "";
      this.subtipo = "";
      this.causapenal = "";
      //----------------------------------------------------------------------------------------
      //----------------------------------------------------------------------------------------
      this.imageName = "";
      this.imageFile = "";
      this.imageUrl = "";
      this.rutaDocumento = "";
      this.mostrarPDFUpload = false;
      this.disablePDFUpload = false;
      //----------------------------------------------------------------------------------------
      this.qrCode = null;
      this.vistaPreviaTF = true;
      //----------------------------------------------------------------------------------------
    },
    listar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/Resolucion/Listar/" + me.rHechoId, configuracion)
        .then(function (response) {
          //console.log(response);
          me.oficios = response.data;
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
      me.$confirm(
        "Esperando confirmación",
        "Estas seguro de  que deseas guardar información ",
        function () {
          var victimas = "",
            delitos = "",
            imputados = "",
            fechaau,
            fechaco,
            fechare;

          var descripcionRegTabI =
            "Registro de resolucion de carpeta por " +
            me.tresolucion.text +
            ", cuyo subtipo es " +
            me.subtipo.text;

          for (var i = 0; i < me.victima.length; i++) {
            victimas += me.victima[i];
            if (i + 1 != me.victima.length) victimas += ", ";
          }

          for (var i = 0; i < me.delito.length; i++) {
            delitos += me.delito[i];
            if (i + 1 != me.delito.length) delitos += ", ";
          }

          for (var i = 0; i < me.imputado.length; i++) {
            imputados += me.imputado[i];
            if (i + 1 != me.imputado.length) imputados += ", ";
          }

          if (me.fechaautorizacion != "" || me.fechaau != "") {
            fechaau = me.fechaautorizacion;
          } else {
            fechaau = "0001-01-01";
          }

          if (me.fechaconsulta != "" || me.fechaco != "")
            fechaco = me.fechaconsulta;
          else fechaco = "0001-01-01";

          if (me.fecharesolucion != "" || me.fechare != "")
            fechare = me.fecharesolucion;
          else fechare = "0001-01-01";

          var perro = {
            RHechoId: me.rHechoId,
            Victimas: victimas,
            Imputados: imputados,
            Delitos: delitos,
            CausaPenal: me.causapenal,
            FechaAutorizacion: fechaau,
            FechaConsulta: fechaco,
            FechaResolucion: fechare,
            Status: "Pendiente",
            Tipo: me.tresolucion.text,
            SubTipo: me.subtipo.text,
            TextoDocumento: me.texto,
            UDistrito: me.u_distrito,
            USubproc: me.u_dirSubPro,
            UAgencia: me.u_agencia,
            Usuario: me.u_nombre,
            UPuesto: me.u_puesto,
            UModulo: me.u_modulo,
            numeroOficio: me.numerooficio,
            URLDocumento: me.rutaDocumento,
          };
          console.log(perro);

          me.$CAT
            .post(
              "api/Resolucion/Crear",
              {
                RHechoId: me.rHechoId,
                Victimas: victimas,
                Imputados: imputados,
                Delitos: delitos,
                CausaPenal: me.causapenal,
                FechaAutorizacion: fechaau,
                FechaConsulta: fechaco,
                FechaResolucion: fechare,
                Status: "Pendiente",
                Tipo: me.tresolucion.text,
                SubTipo: me.subtipo.text,
                TextoDocumento: me.texto,
                UDistrito: me.u_distrito,
                USubproc: me.u_dirSubPro,
                UAgencia: me.u_agencia,
                Usuario: me.u_nombre,
                UPuesto: me.u_puesto,
                UModulo: me.u_modulo,
                numeroOficio: me.numerooficio,
                URLDocumento: me.rutaDocumento,
              },configuracion).then(function (response) 
              {

                me.IdResolucion = response.data.idresolucion;
                var now = moment();
                me.vistaPreviaTF = false;
                me.generarQR(me.docResolucion,me.nuc,me.u_nombre,now,me.IdResolucion);

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
                  },
                  configuracion
                )
                .then(function (response) {
                  me.$notify(
                    "La información se guardo correctamente !!!",
                    "success"
                  );

                  

                  me.imprimirpdf(me.u_nombre, me.u_puesto, me.u_agencia);
                  me.modalAdd = false;
                  me.modaldocumento = false;
                  me.listar();

                  setTimeout(() => 
                  {
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
        function () {
          alertify.warning("Verifica la información");
        }
      ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
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

      var html = htmlToPdfmake(this.texto + "<br/><br/><br/>");

      var cpen = htmlToPdfmake(this.causapenal);

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
              this.u_distrito +
              ", Hidalgo a " +
              this.fechas +
              "\n\n\n\n\n\n\n\n",
            style: "Fecha",
            alignment: "right",
          },
          {
            text: "Causa Penal:  " + cpen,
            style: "Texto",
            alignment: "right",
            margin: [0, 40, 72, 0],
            absolutePosition: { x: 85, y: 200 },
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
