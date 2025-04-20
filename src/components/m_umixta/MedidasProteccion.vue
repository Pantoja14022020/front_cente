<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Medidas de Proteccíon</v-toolbar-title
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
        :items="medidasproteccions"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.usuario }}</td>
          <td>{{ props.item.modulo }}</td>
          <td>{{ props.item.victima }}</td>
          <td>{{ props.item.imputado }}</td>
          <td>{{ props.item.delito }}</td>

          <td class="justify-center layout px-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2" v-on="on" @click="vermedidas(props.item)">
                  chrome_reader_mode
                </v-icon>
              </template>
              <span>Ver medidas</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2"
                  v-on="on"
                  @click="verinfoadiccional(props.item)"
                >
                  assignment_late
                </v-icon>
              </template>
              <span>Ver información adicional</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2" v-on="on" @click="edititem(props.item)">
                  edit
                </v-icon>
              </template>
              <span>Editar medida de proteccíon</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2"
                  v-on="on"
                  @click="agregarampliacion(props.item)"
                >
                  add
                </v-icon>
              </template>
              <span>Agregar ampliacíon</span>
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
              <span>Imprimir medida</span>
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
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                v-if="editedIndex == -1"
                color="success"
                text
                @click="generarpdf()"
                >Vista previa</v-btn
              >
              <v-btn
                v-if="editedIndex == 1"
                color="success"
                text
                @click="generarpdf2()"
                >Vista previa</v-btn
              >
              <v-btn icon @click="dialogo = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-card-text>
            <v-form ref="form" data-vv-scope="agregar">
              <br />
              <br />

              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex class="espaciado" xs12 sm12 md6 lg6>
                    <v-autocomplete
                      name="víctima"
                      :items="victimas"
                      v-model="victima"
                      v-validate="'required'"
                      label="*Victimas:"
                      data-vv-scope="agregar"
                      attach
                      chips
                      deletable-chips
                      multiple
                      :error-messages="errors.collect('agregar.víctima')"
                    >
                    </v-autocomplete>

                    <v-autocomplete
                      name="imputado"
                      v-if="!estadoimputado"
                      :items="imputados"
                      v-model="imputado"
                      v-validate="'required'"
                      label="*Imputados:"
                      data-vv-scope="agregar"
                      attach
                      chips
                      deletable-chips
                      multiple
                      :error-messages="errors.collect('agregar.imputado')"
                    >
                    </v-autocomplete>

                    <v-autocomplete
                      name="delito"
                      :items="delitos"
                      v-model="delito"
                      v-validate="'required'"
                      label="*Delitos:"
                      data-vv-scope="agregar"
                      attach
                      chips
                      deletable-chips
                      multiple
                      :error-messages="errors.collect('agregar.delito')"
                    >
                    </v-autocomplete>

                    <v-autocomplete
                      name="institución"
                      :items="instituciones"
                      v-model="institucion"
                      v-validate="'required'"
                      label="*Institucion:"
                      data-vv-scope="agregar"
                      attach
                      chips
                      deletable-chips
                      multiple
                      :error-messages="errors.collect('agregar.institución')"
                    >
                    </v-autocomplete>
                  </v-flex>

                  <v-flex class="espaciado" xs12 sm12 md6 lg6>
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      :return-value.sync="fechainicio"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :value="fechai"
                          label="Fecha de Inicio:"
                          prepend-icon="event"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="es-mx"
                        v-model="fechainicio"
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

                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :return-value.sync="fechavencimiento"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :value="fechav"
                          label="Fecha de Terminacíon:"
                          prepend-icon="event"
                          clearable
                          readonly
                          v-on="on"
                        >
                        </v-text-field>
                      </template>

                      <v-date-picker
                        locale="es-mx"
                        v-model="fechavencimiento"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu2 = false"
                          >Cancel</v-btn
                        >
                        <v-btn text color="primary" @click="fechainif()"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-menu>

                    <v-text-field
                      v-if="editedIndex == -1"
                      name="número de oficio"
                      label="*Número de oficio:"
                      v-model="numerooficio"
                      v-validate="'required'"
                      data-vv-scope="agregar"
                      :error-messages="
                        errors.collect('agregar.número de oficio')
                      "
                    >
                    </v-text-field>

                    <v-switch
                      v-model="petiofimp"
                      :label="'¿Las medidas de proteccion fueron otorgadas a peticion del MP o de manera oficiosa por el MP?'"
                      hide-details
                    >
                    </v-switch>

                    <v-text-field
                      :label="`${textoswitch}`"
                      v-model="textov"
                      disabled
                    >
                    </v-text-field>
                  </v-flex>

                  <v-flex class="espaciado" xs12 sm12 md12 lg12>
                    <v-autocomplete
                      name="medidas de protección"
                      :items="nomedidas"
                      v-model="nomedida"
                      label="Medidas de protección:"
                      return-object
                      attach
                      chips
                      deletable-chips
                      multiple
                      v-on:change="ordenar"
                      :error-messages="errors.collect('agregar.institucíon')"
                    >
                    </v-autocomplete>
                    <v-switch
                      v-model="medidasextratf"
                      :label="'¿Desea agregar medidas de proteccion no incluidas en el catalogo?'"
                      color="success"
                      hide-details
                    >
                    </v-switch>
                    <v-text-field
                      v-if="medidasextratf == true"
                      name="medidas adicionales"
                      label="Colocar solo Ley/Codigo, Articulo, Fracción e Inciso (Opcional):"
                      v-model="medidasextra"
                    >
                    </v-text-field>
                  </v-flex>

                  <v-flex class="espaciado" xs12 sm12 md12 lg12>
                    <v-card elevation="0">
                      <v-card-title class="accent">
                        <h3>Narrativa breve</h3>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-form data-vv-scope="form1">
                          <p v-html="rBreve">
                            {{ rBreve }}
                          </p>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-flex>

                  <v-flex class="espaciado" xs12 sm12 md12 lg12>
                    <v-card elevation="0">
                      <v-card-title class="accent">
                        <h3>Texto del documento</h3>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-form>
                          <vue-editor
                            name="textof"
                            v-model="textof"
                            data-vv-scope="agregar"
                            outline
                            height="350px;"
                            style="max-height: 310px; overflow-y: scroll"
                            :editorToolbar="customToolbar"
                            :error-messages="errors.collect('textof')"
                          >
                          </vue-editor>
                        </v-form>
                      </v-card-text>
                      <v-tooltip v-if="editedIndex == -1" bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            class="mx-2"
                            slot="activator"
                            v-on="on"
                            @click="generarpreview()"
                            absolute
                            top
                            right
                            fab
                            color="primary"
                          >
                            <v-icon dark>remove_red_eye</v-icon>
                          </v-btn>
                        </template>
                        <span>Generar texto del documento</span>
                      </v-tooltip>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogoampliacion" max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">add</v-icon>
            </v-avatar>

            <v-toolbar-title class="subheading"
              >Agregar ampliacíon</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form data-vv-scope="datosampliacion">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-menu
                      ref="menu3"
                      v-model="menu3"
                      :close-on-content-click="false"
                      :return-value.sync="fechaampliacion"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :value="fechaa"
                          label="Fecha de Inicio:"
                          prepend-icon="event"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="es-mx"
                        v-model="fechaampliacion"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu3 = false"
                          >Cancel</v-btn
                        >
                        <v-btn text color="primary" @click="fechainif()"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-menu>

                    <v-menu
                      ref="menu4"
                      v-model="menu4"
                      :close-on-content-click="false"
                      :return-value.sync="fechaterminaampliacion"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          :value="fechat"
                          label="Fecha de Vencimiento:"
                          prepend-icon="event"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="es-mx"
                        v-model="fechaterminaampliacion"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu4 = false"
                          >Cancel</v-btn
                        >
                        <v-btn text color="primary" @click="fechainif()"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="close()">Cerrar</v-btn>
                <v-btn @click="actualizarampliacion()" class="success"
                  >Guardar</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="diaologomedidas" max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">chrome_reader_mode</v-icon>
            </v-avatar>

            <v-toolbar-title class="subheading"
              >Medidas de protección de registro</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form data-vv-scope="datosdestinatario">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-data-table
                      :headers="headers2"
                      :items="medidasregistro"
                      :search="search"
                      :rows-per-page-items="rowsPerPageItems"
                      :pagination.sync="pagination"
                    >
                      <template slot="items" class="white" slot-scope="props">
                        <td>{{ props.item.clave }}</td>
                        <td>{{ props.item.descripcion }}</td>
                      </template>
                      <template slot="no-data"> </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="diaologomedidas = false">Cerrar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogoinfo" max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">info</v-icon>
            </v-avatar>

            <v-toolbar-title class="subheading"
              >Información complementaria</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-container grid-list-md text-xs-center>
                <v-layout wrap>
                  <v-flex class="espaciado" xs12 sm12 md12 lg12>
                    <v-card auto-grow elevation="0">
                      <v-card-text>
                        <v-list one-line>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="success">view_day</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>
                                <p class="body-2 font-weight-bold">
                                  <a>Victimas:</a>
                                </p>
                              </v-list-tile-title>
                              <v-list-tile-sub-title>
                                <p
                                  color="accent"
                                  class="caption font-weight-regular"
                                >
                                  <a>{{ ivictimas }}</a>
                                </p>
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="success">work</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>
                                <p class="body-2 font-weight-bold">
                                  <a>Imputados:</a>
                                </p>
                              </v-list-tile-title>
                              <v-list-tile-sub-title>
                                <p
                                  color="accent"
                                  class="caption font-weight-regular"
                                >
                                  <a> {{ iimputados }} </a>
                                </p>
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="success"
                                >local_convenience_store</v-icon
                              >
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>
                                <p class="body-2 font-weight-bold">
                                  <a>Delitos:</a>
                                </p>
                              </v-list-tile-title>
                              <v-list-tile-sub-title>
                                <p
                                  color="accent"
                                  class="caption font-weight-regular"
                                >
                                  <a>{{ idelitos }}</a>
                                </p>
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="success">apartment</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>
                                <p class="body-2 font-weight-bold">
                                  <a>Institución:</a>
                                </p>
                              </v-list-tile-title>
                              <v-list-tile-sub-title>
                                <p
                                  color="accent"
                                  class="caption font-weight-regular"
                                >
                                  <a>{{ iinstitucion }}</a>
                                </p>
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click.native="dialogoinfo = false">Cerrar</v-btn>
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
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                v-if="editedIndex == -1"
                color="success"
                text
                @click.native="guardar()"
                >Guardar</v-btn
              >
              <v-btn
                v-if="editedIndex != -1"
                color="success"
                text
                @click.native="guardar()"
                >Actualizar</v-btn
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
import { WebCam } from "vue-web-cam";
import { VueEditor } from "vue2-editor";
import { error } from "util";
import moment from "moment";
import "moment/locale/es";
import alertify from "alertifyjs";
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
    dialogo: "",
    medidasproteccions: [],
    victima: [],
    victimas: [],
    imputados: [],
    imputado: [],
    dia: "",
    mes: "",
    año: "",
    hr: "",
    fecha: "",
    delitos: [],
    delito: [],
    rBreve: "",
    personal: "",
    direccionesc: "",
    domicilioPersona: "",
    medidasdp: "",
    duracion: "",
    instituciones: [],
    institucion: [],
    fechainicio: "",
    fechavencimiento: "",
    fechai: "",
    fechav: "",
    menu1: false,
    menu2: false,
    dialogoampliacion: false,
    menu3: false,
    menu4: false,
    fechaampliacion: "",
    fechaterminaampliacion: "",
    fechaa: "",
    fechat: "",
    idMProteccion: "",
    idmproteccion: "",
    destinatarion: "",
    domicilion: "",
    dialogodestinatario: false,
    modaldocumento: false,
    texto: "",
    titulo: "",
    tmunicipio: "",
    thora: "",
    comilla: '"',
    agenciainfo: "",
    textodocumento: "",
    textodocumento2: "",
    textodocumento3: "",
    textofinaldestinatario: false,
    textodestinatario: "",
    itemsdestino: "",
    dia: moment().format("DD"),
    mes: moment().format("MMMM"),
    año: moment().format("YYYY"),
    modaldocumento2: false,
    vistapreviaac: false,
    acnombre: "",
    acpuesto: "",
    acagencia: "",
    numerooficio: "",
    numerooficion: "",
    estadoimputado: false,
    nomedidas: [],
    nomedida: [],
    medidasregistro: [],
    diaologomedidas: false,
    textof: "",
    dialogoinfo: false,
    idelitos: "",
    ivictimas: "",
    iimputados: "",
    iinstitucion: "",
    petiofimp: false,
    medidasextratf: false,
    medidasextra: "",
    textov:"",

    //*************** */

    headers: [
      { text: "Emitida por", value: "usuario", sortable: true },
      { text: "Módulo", value: "modulo", sortable: true },
      { text: "Víctima", value: "victima", sortable: true },
      { text: "Imputado", value: "imputado", sortable: true },
      { text: "Delitos", value: "delito", sortable: true },
      { text: "Opciones", value: "opciones", sortable: false },
    ],
    headers2: [
      { text: "Clave", value: "clave", sortable: true },
      { text: "Descripcción", value: "descripcion", sortable: true },
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
    rowsPerPageItems: [5, 20, 30, 40, 50],
    pagination: {
      rowsPerPage: 20,
    },
    editedIndex: 0,
    modalAdd: false,

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
    docMedidasProt: 'Medidas de protección',
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

      me.listar();
      me.listarLogo();
      me.listarPersonas();
      me.listarrHecho();
      me.listardelitos();
      me.listarrah();
      me.listarInstituciones();
      me.listarnomedidas();
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
    formTitle() {
      return this.editedIndex === -1
        ? "Nueva medida de protección"
        : "Actulizar medida de protección";
    },
    formIcon() {
      return this.editedIndex === -1 ? "add" : "assignment";
    },
    textosino() {
      if (this.estadoimputado) return "Si";
      else return "No";
    },
    textoswitch() {
      if (this.petiofimp) return "Otorgadas por parte del MP";
      else return "De manera oficiosa por el MP";
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
    edititem(item) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.generarQR(me.docMedidasProt,me.nuc,item.usuario,item.fechasys,item.idMProteccion);

      me.nomedida = [];
      me.$CAT
        .get(
          "api/MedidasProteccion/ListarNoMedidas/" + item.idMProteccion,
          configuracion
        )
        .then(function (response) {
          me.medidasregistro = response.data;

          me.medidasregistro.forEach(function (x) {
            me.nomedida.push({
              text: x.clave + " - " + x.descripcion,
              value: x.clave + " - " + x.descripcion,
              numerico: me.convertir(x.clave),
              clave: x.clave,
              descripcion: x.descripcion,
            });
          });
          me.nomedida.sort((a, b) => (a.numerico > b.numerico ? 1 : -1));
          me.editedIndex = 1;
          me.dialogo = true;
          me.vistapreviaac = false;
          me.idMProteccion = item.idMProteccion;
          me.fecha = item.fechahora;
          me.domicilioPersona = item.domicilio;
          me.medidasdp = item.medidaProtecion;
          me.duracion = item.duracion;
          me.numeromedida = item.nomedidas;
          me.fechai = item.fInicio;
          me.fechav = item.fVencimiento;
          me.acnombre = item.usuario;
          me.acpuesto = item.puesto;
          me.acagencia = item.uAgencia;
          me.textof = item.textofinaldetalle;
          me.petiofimp = item.petiOfiMPBool;
          me.medidasextratf = item.medidasExtraTF;
          me.medidasextra = item.medidasExtra;
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
        }),
        //--------------------------------A PARTIR DE AQUI VAN LAS NUEVAS APIS PARA EL LISTADO DE VICTIMAS, IMPUTADOS, DELITOS E INSTITUCIONES--------------------------------

        //API PARA VICTIMAS
        (me.victima = []);
        me.$CAT
        .get(
          "api/RAPs/ListarVictimasM/" +
            me.rAtencionId +
            "/" +
            me.rHechoId +
            "/" +
            item.idMProteccion,
          configuracion
        )
        .then(function (response) {
          me.victimasarray = response.data;
          me.victimasarray.forEach(function (x) {
            me.victima.push({ text: x.nombreC, value: x.nombreC });
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
        }),
        //API PARA IMPUTADOS
        (me.imputado = []);
        me.$CAT
        .get(
          "api/RAPs/ListarInputadosM/" +
            me.rAtencionId +
            "/" +
            me.rHechoId +
            "/" +
            item.idMProteccion,
          configuracion
        )
        .then(function (response) {
          me.imputadosarray = response.data;

          me.imputadosarray.forEach(function (x) {
            me.imputado.push({ text: x.nombreC, value: x.nombreC });
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
        }),
        //API PARA DELITOS
        (me.delito = []);
        me.$CAT
        .get(
          "api/RDHs/ListarPorHechoDE/" + me.rHechoId + "/" + item.idMProteccion,
          configuracion
        )
        .then(function (response) {
          me.delitosarray = response.data;

          me.delitosarray.forEach(function (x) {
            me.delito.push({ text: x.nombre, value: x.nombre });
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
        }),
        //API PARA INSTITUCIONES
        (me.institucion = []);
      this.$conf
        .get(
          "api/Instituciones/ListarInstitucionesM/" + item.idMProteccion,
          configuracion
        )
        .then(function (response) {
          me.institucionsarray = response.data;

          me.institucionsarray.forEach(function (x) {
            me.institucion.push({ text: x.nombre, value: x.nombre });
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
          console.log(response.data);

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
      this.generarfecha();
      this.editedIndex = -1;
      this.dialogo = true;
      this.vistapreviaac = false;
    },
    fechainif() {
      if (this.menu1) {
        this.generarfecha2();
        this.$refs.menu1.save(this.fechainicio);
      }
      if (this.menu2) {
        this.generarfecha2();
        this.$refs.menu2.save(this.fechavencimiento);
      }
      if (this.menu3) {
        this.generarfecha2();
        this.$refs.menu3.save(this.fechaampliacion);
      }
      if (this.menu4) {
        this.generarfecha2();
        this.$refs.menu4.save(this.fechaterminaampliacion);
      }
    },
    generarpreview() {
      //this.$validator.validateAll('agregar').then(result => {
      //if (result) {
      this.textof =
        "<p style=" +
        this.comilla +
        "text-align:center" +
        this.comilla +
        "><strong style=" +
        this.comilla +
        "color: windowtext;" +
        this.comilla +
        ">D E T E R M I N A C I Ó N</strong></p>" +
        "<p class=" +
        this.comilla +
        "ql-align-center" +
        this.comilla +
        "><br></p>" +
        "<p class=" +
        this.comilla +
        "ql-align-center" +
        this.comilla +
        "><br></p>" +
        "<p class=" +
        this.comilla +
        "ql-align-justify" +
        this.comilla +
        ">En la ciudad de <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">lugar</span>, Hidalgo, siendo las <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(XX:XX) diecinueve </span><span style=" +
        this.comilla +
        "color: windowtext;" +
        this.comilla +
        ">horas con </span><span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">cincuenta y cinco </span><span style=" +
        this.comilla +
        "color: windowtext;" +
        this.comilla +
        ">minutos </span>del <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(08) ocho </span>de<span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">marzo </span>de<span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">2020 </span><span style=" +
        this.comilla +
        "color: windowtext;" +
        this.comilla +
        ">(dos mil </span><span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">veinte</span><span style=" +
        this.comilla +
        "color: windowtext;" +
        this.comilla +
        ">),</span> visto el estado procedimental que tienen las diligencias de la carpeta de investigación al rubro citada, se procede a emitir la resolución que se estima pertinente conforme al Código Nacional de Procedimientos Penales, y:</p>" +
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
        "<p style=" +
        this.comilla +
        "text-align:center" +
        this.comilla +
        "><strong>CONSIDERANDO</strong></p>" +
        "<p class=" +
        this.comilla +
        "ql-align-center" +
        this.comilla +
        "><br></p>" +
        "<p class=" +
        this.comilla +
        "ql-align-center" +
        this.comilla +
        "><br></p>" +
        "<p class=" +
        this.comilla +
        "ql-align-justify" +
        this.comilla +
        "><strong>PRIMERO.-Competencia</strong>. La representación social que estaresoluciónemite, escompetente para resolver sobre la imposición de medidas de protección a favor de la parte victimal, envirtud que el hechodenunciadoocurrióen el municipio de <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(xxx)</span>, perteneciente al estado de Hidalgo, y el mismo que permiteidentificar que correspondeconocer al fuerocomún. </p>" +
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
        ">Lo anterior con fundamentoenlosartículos 14, 16 y 21 de la ConstituciónPolítica de losEstadosUnidosMexicanos; 1º, 5ºfracción X y45 fracción II de la Ley Orgánica del MinisterioPúblicoen el estado de Hidalgo; 1º, 5, 7,16 fracción XIX, 49 fracción VI y 50 de suReglamento; asícomo 109 fracciones XVI y XIX, 131 fracciones I y XII, y 137 del Código Nacional de ProcedimientosPenales. </p>" +
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
        "><strong>SEGUNDO.-Antecedentes. </strong>De la presentecarpeta de investigación se desprende que se inició la mismaenfecha<span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(08) ocho </span>de <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">marzo </span>de <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">2020 </span>(dos mil <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">veinte</span>), con motivo de la <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">denuncia/querella</span>de _____________, quienhizo del conocimiento del ministeriopúblicohechos que estimabaconstitutivos del delitocometidos por <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">nombre</span>, consistentes en: </p>" +
        "<p class=" +
        this.comilla +
        "ql-align-center" +
        this.comilla +
        ">“<span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(</span><em style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">síntesis de la denuncia o querella que contenga circunstanciadamente tiempo, modo y lugar del hecho, así como sobre la intervención de una o varias personas)”</em></p>" +
        "<p class=" +
        this.comilla +
        "ql-align-justify" +
        this.comilla +
        ">Hecho que la ley señala como delitode <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">XXX, </span>previsto en los artículos <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(artículos, fracciones y legislación en la que encuadra el delito)</span><span style=" +
        this.comilla +
        "color: windowtext;" +
        this.comilla +
        ">, que se transcriben a continuación:</span></p>" +
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
        "<p style=" +
        this.comilla +
        "text-align:center" +
        this.comilla +
        "><span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">Transcripción.</span></p>" +
        "<p class=" +
        this.comilla +
        "ql-align-center" +
        this.comilla +
        "><br></p>" +
        "<p class=" +
        this.comilla +
        "ql-align-center" +
        this.comilla +
        "><br></p>" +
        "<p class=" +
        this.comilla +
        "ql-align-justify" +
        this.comilla +
        "><strong>TERCERO.- Consideraciones. </strong>Imposición de medidas de protección que se realiza atendiendo al principio de protección contenido en el artículo 40 de la Ley General de Víctimas, que establece que cuando exista amenza para la integridad personal o en la vida de la víctima, o existan razones fundadas para pensar que estos derechos están en riesgo, las autoridades (y esta representación social lo es) tiene la obligación de adoptar con carácter inmediato las medidas que sean necesarias para evitar que la víctima sufra alguna lesión o daño.</p>" +
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
        ">Asimismo, estas medidas se fundamentan en los principios deprotección, necesidad y proporcionalidad, confidencialidad, oportunidad y eficacia, atendiendo al riesgo personal que en este momento existe para la víctima; que encuentran sustento en la entrevista de <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre de la denunciante o querellante)</span>, pues considerando que realiza un señalamiento directo en contra de <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre)</span>, quien ejerce sobre aquella actos violencia <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(física, psicológica, patrimonial, sexual, económica –asentar la modalidad que se adecúe al caso-)</span><span style=" +
        this.comilla +
        "color: windowtext;" +
        this.comilla +
        ">,y </span>a quien lo identifica como su <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(esposo, cónyuge, hijo, sobrino, tío, cuñado, etc)</span>; por tanto dichos hechos atentan la dignidad humana de la víctima, siendo este un valor y derecho fundamental base y condición de todos los demás derechos, el cual implica la comprensión de la persona como titular y sujeto de derechos y a no ser objeto de violencia o arbitrariedades por parte de particulares.</p>" +
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
        ">De ahí que, presumiendo en todo momento la buena fe que debe tenerel relato de la víctima y en apego a nuestra obligación de brindarle servicios de ayuda, atención y asistencia desde el primer momento en que así lo requiera, así como respetando y permitiendo el ejercicio efectivo de sus derechos, ofreciéndole la máximaprotección, es que esta representación social determina las medidas necesarias para evitar que la víctima sufra alguna lesión o daño; más aúnporque la víctima ha sido objeto de <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(motivar los actos de violencia, detallar las acciones u omisiones, especificar en qué consisten la acción mediante la cual se causa un daño físico o daño en su estabilidad psicológica)</span>.&nbsp;&nbsp;</p>" +
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
        "><span style=" +
        this.comilla +
        "color: red;" +
        this.comilla +
        ">SI SE TRATA DE </span><strong style=" +
        this.comilla +
        "color: red;" +
        this.comilla +
        ">VIOLENCIA CONTRA LA MUJER</strong><span style=" +
        this.comilla +
        "color: red;" +
        this.comilla +
        ">Y BORRAR LAS DEMAS HIPÓTESIS QUE NO SE ADECUEN</span></p>" +
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
        ">Bajo esos antecedentes, se considera que la víctima <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre</span>) se encuentra en un contexto de actos de violencia <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(física, psicológica, patrimonial, sexual, económica –elegir la modalidad que se adecúe al caso)</span><span style=" +
        this.comilla +
        "color: windowtext;" +
        this.comilla +
        "> cometidos en su agravio; y </span>esta forma de <strong>violencia contra la mujer</strong> constituye una violación de sus derechos humanos y libertades fundamentales que limitan el reconocimiento, goce y ejercicio de tales derechos y libertades; pues todo acto de violencia contra la mujer constituye una ofensa a la dignidad humana y una manifestación de las relaciones de poder históricamente desiguales entre mujeres y hombres.</p>" +
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
        ">A mayor abundamiento, atentos a lo establecido en el artículo 1° de la Convención Interamericana para Prevenir, Sancionar y Erradicar la Violencia Contra la Mujer “Convención de Belem do Pará”, la violencia contra la mujerconsiderarse como cualquier acción o conducta, basada en su género, que le cause muerte, daño o sufrimiento físico, sexual o psicológico, tanto en el ámbito público como en el privado; incluyendo la violencia física, sexual y psicológica, que tenga lugar dentro de la familia (protección que alcanza al ámbito familiar, dentro o fuera del domicilio así como a sus integrantes) o unidad doméstica o en cualquier otra relación interpersonal.</p>" +
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
        ">De ahí que esta representación social se encuentre obligada a adoptar las medidas necesarias para salvaguardar su integridad de todo posible riesgo o peligro, y a garantizar una efectiva protección a una vida libre de violencia y a la igualdad de acceso a un pleno disfrute de los derechos, con la finalidad de evitar que se siga comentiendo un hecho violento en su contra. </p>" +
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
        ">Fortifica lo anterior la tesisLXXXVII/2014 de la décima época, emitida por la Primera Sala de la Suprema Corte de Justicia de la Nación, publicada en la Gaceta del Semanario Judicial de la Federación con el número 2005799 para su consulta, y de derubro y texto: <strong>“ACCESO DE LAS MUJERES A UNA VIDA LIBRE DE VIOLENCIA EN EL DISTRITO FEDERAL. LOS ARTÍCULOS 62 Y 66, FRACCIONES I A III, DE LA LEY RELATIVA, QUE PREVÉN RESPECTIVAMENTE, MEDIDAS Y ÓRDENES DE PROTECCIÓN DE EMERGENCIA, NO VIOLAN EL ARTÍCULO 16, PÁRRAFO TERCERO, DE LA CONSTITUCIÓN FEDERAL.</strong>Los citados preceptos legales, al establecer las medidas y órdenes de protección de emergencia, en materia de violencia contra las mujeres, no violan el artículo 16, párrafo tercero, de la Constitución Política de los Estados Unidos Mexicanos, en su texto anterior y posterior a la reforma publicada en el Diario Oficial de la Federación el 18 de junio de 2008, que prevé la obligación para la autoridad judicial de no librar orden de aprehensión sin que preceda denuncia o querella de un hecho que la ley señale como delito, sancionado con pena privativa de libertad y obren datos que establezcan que se ha cometido ese hecho y que exista la posibilidad de que el indiciado lo cometió o participó en su comisión. Ello es así, pues las medidas y órdenes de protección de emergencia no tienen la finalidad de aprehender a quien se considera probable responsable de la comisión de un delito para ponerlo a disposición de un juez para que se inicie un proceso penal en su contra; por el contrario, dichas medidas son actos de urgente aplicación en función del interés superior de la mujer víctima de violencia, por encontrarse en riesgo su integridad física o psicológica, su libertad o seguridad y la de las víctimas indirectas; además, porque no sólo puede dictarlas un juez penal sino también uno en materia civil o familiar; de ahí que las medidas y órdenes que prevén los numerales de referencia no tienen por qué dictarse bajo las condiciones y los requisitos que establece dicho precepto constitucional para la orden de aprehensión, pues el objeto y la finalidad de las dos figuras son completamente distintos.”</p>" +
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
        ">Y la tesisXC/2014 de la décima época, emitida por la Primera Sala de la Suprema Corte de Justicia de la Nación, publicada en la&nbsp;&nbsp;&nbsp;Gaceta del Semanario Judicial de la Federación con el número 2005798 para su consulta, y de rubro y texto: “<strong>ACCESO DE LAS MUJERES A UNA VIDA LIBRE DE VIOLENCIA EN EL DISTRITO FEDERAL. LAS ÓRDENES DE PROTECCIÓN DE EMERGENCIA Y LA MEDIDA PARA SU CUMPLIMIENTO PREVISTAS, RESPECTIVAMENTE, EN LOS ARTÍCULOS 66, FRACCIONES I A III, Y 68, FRACCIÓN I, DE LA LEY RELATIVA, NO DEBEN HOMOLOGARSE O RELACIONARSE CON UNA ORDEN DE CATEO.</strong>Las órdenes de protección de emergencia y la medida para su cumplimiento a que se refieren los citados preceptos deben analizarse a la luz del artículo 16, párrafo primero, de la Constitución Política de los Estados Unidos Mexicanos, que prevé el derecho a la inviolabilidad del domicilio, y no así a la del párrafo décimo primero, pues éste se refiere a una diligencia exclusiva de la materia penal, cuyos requerimientos constitucionales son muy específicos, como el hecho de que la orden de cateo deba solicitarla el Ministerio Público, en la que debe expresarse el lugar que ha de inspeccionarse, la persona o personas que hayan de aprehenderse y los objetos que se buscan; diligencia que se lleva a cabo con la presencia de dos testigos. Esto es, la orden de cateo tiene una finalidad específica, pues permite la detención de personas y la búsqueda de determinados objetos, en cambio, las órdenes de protección de emergencia se emiten cuando se encuentra en riesgo la integridad física o psicológica, la libertad o seguridad de la víctima o víctimas indirectas que viven en el mismo domicilio del agresor y pueden solicitarse antes de denunciar un delito o del inicio de un proceso penal, como en las materias civil o familiar; de ahí que al no ser exclusivas de la materia penal no pueden homologarse o relacionarse con una orden de cateo, pues la finalidad y el objeto de las órdenes de protección de emergencia referidas y de la medida para su cumplimiento no es la detención de personas.”</p>" +
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
        ">Resultando igualmente aplicable la tesis CX/2016 de la décima época emitida por la Primera Sala de la Suprema Corte de Justicia de la Nación, publicada en la Gaceta del Semanario Judicial de la Federación, con el número 2011441, de rubro y texto: <strong>“VIOLENCIA FAMILIAR. MOMENTO EN QUE DEBE DICTARSE UNA MEDIDA DE PREVENCIÓN.</strong> Las autoridades del Estado Mexicano tienen el deber de primer orden de garantizar el respeto a la salud, integridad física y mental de las personas que son objeto de violencia, máxime cuando las víctimas se encuentran en una situación de vulnerabilidad manifiesta frente a sus agresores. Así, las autoridades deben otorgar garantías a las víctimas de que no serán objeto de nuevas agresiones, y hacer efectivo su derecho a denunciar los actos de violencia que han sido cometidos en su contra. Dichas garantías se actualizan a través de las medidas de prevención, las cuales para ser efectivas podrán ser dictadas desde la admisión de la demanda de violencia familiar, o en cualquier momento del juicio.”</p>" +
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
        "<p style=" +
        this.comilla +
        "text-align:center" +
        this.comilla +
        "><strong style=" +
        this.comilla +
        "color: red;" +
        this.comilla +
        ">ELEGIR LO QUE SIGUE SI SE TRATA DE VIOLENCIA <u>CONTRA NIÑAS Y NIÑOS</u> Y BORRAR LAS DEMAS HIPÓTESIS QUE NO SE ADECUEN</strong></p>" +
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
        ">Bajo esos antecedentes, se considera que parte victimal, por su minoría de edad, se encuentra en un contexto de actos de violencia <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(física, psicológica, patrimonial, sexual, económica –asentar la modalidad que se adecue al caso)</span> cometidos en su agravio.</p>" +
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
        ">Al respecto debe decirse que los menores tienen los mismos derechos humanos y libertades fundamentales que otras personas, como lo es el derecho a vivir una vida libre de toda forma de violencia y a que se resguarde su integridad personal, a fin de lograr las mejores condiciones de bienestar y el libre desarrollo de su personalidad; y atendiendo a las particularidades del presente caso, se ve mermado lo anteriorcon las acciones de violencia sufridas por la parte victimal y que fueron ejecutadas por la persona investigada.</p>" +
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
        ">Por lo que al tomar en cuenta precisamente esa condición de minoría de edad que lo incluye en un grupo de mayor vulnerabilidad, y atendiendo al interés superior, esta representación social se encuentra obligada a adoptar las medidas necesarias para salvaguardar su integridad, de conformidad con los numerales 3 de la Convención sobre los Derechos del Niño y 4 de la Ley General de Víctimas, que establece considerar de manera primordial en la toma de decisiones cuando se vulneran derechos de menores de edad.</p>" +
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
        ">Todo lo cual justifica que esta representación social adopte con carácter inmediato, las medidas necesarias para evitar que parte victimal, en su condición de menor de edad, sufran alguna lesión o daño mayor al ya resentido, pues su desarrollo integral se ha visto afectado; ello atendiendo los artículos 2, 6 fracciones –I, II, VI, XII y XIII-, 13, 46, 47, 48 y 49 de la Ley General de los Derechos de Niñas, Niños y Adolescentes, y al interés superior del menor, a efecto de garantizar que se vea protegido contra toda forma de discriminación o castigo por causa de la condición, las actividades, las opiniones expresadas o las creencias de sus padres, o sus tutores o de sus familiares, siendo éstas medidas basadas en la consideración del interés superior del mismo, y con las cuales se asegure una adecuada protección y cuidado, cuando los padres y madres, u otras personas responsables, no tienen capacidad para hacerlo o simplemente no lo hacen, tal como lo estipula el artículo 3 de la Convención para los Derechos del Niño.</p>" +
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
        ">Resultandoaplicablela jurisprudencia113/2019 de la décimaépoca, emitidapor la Segunda Sala de la Suprema Corte de Justicia de la Nación, publicadaen la Gaceta del Semanario Judicial de la Federación con el número2020401 para suconsulta, y de rubro y texto: <strong style=" +
        this.comilla +
        "color: black;" +
        this.comilla +
        ">DERECHOS DE LAS NIÑAS, NIÑOS Y ADOLESCENTES. EL&nbsp;INTERÉS&nbsp;SUPERIOR&nbsp;DEL&nbsp;MENOR&nbsp;SE ERIGE COMO LA CONSIDERACIÓN PRIMORDIAL QUE DEBE DE ATENDERSE EN CUALQUIER DECISIÓN QUE LES AFECTE. </strong>El artículo&nbsp;2, segundopárrafo, de la Ley General de los Derechos de Niñas, Niños y Adolescentes&nbsp;prevé que el " +
        this.comilla +
        "interés&nbsp;superior&nbsp;de la niñezdeberáserconsiderado de manera primordial en la toma de decisionessobreunacuestióndebatida que involucre niñas, niños y adolescentes" +
        this.comilla +
        "; de ahí que cuando se tome unadecisión que les afecteen lo individual o colectivo, " +
        this.comilla +
        "se deberánevaluar y ponderar las posiblesrepercusiones a fin de&nbsp;salvaguardar&nbsp;su&nbsp;interés&nbsp;superior&nbsp;y susgarantíasprocesales" +
        this.comilla +
        ". Al respecto, debedestacarse que el&nbsp;interés&nbsp;superior&nbsp;del&nbsp;menor&nbsp;es un concepto triple, al ser: (I) un derecho sustantivo; (II) un principio jurídicointerpretativo fundamental; y (III) unanorma de procedimiento. El derecho del&nbsp;interés&nbsp;superior&nbsp;del&nbsp;menor&nbsp;prescribe que se observe " +
        this.comilla +
        "entodas las decisiones y medidasrelacionadas con el niño" +
        this.comilla +
        ", lo que significa que, en " +
        this.comilla +
        "cualquiermedida que tenga que ver con uno o variosniños, su&nbsp;interés&nbsp;superior&nbsp;deberáserunaconsideración primordial a que se atenderá" +
        this.comilla +
        ", lo cualincluye no sólo las decisiones, sinotambiéntodoslosactos, conductas, propuestas, servicios, procedimientos y demásiniciativas. Así, las decisionesparticularesadoptadaspor las autoridadesadministrativas –enesferasrelativas a la educación, el cuidado, la salud, el medioambiente, las condiciones de vida, la protección, el asilo, la inmigración y el acceso a la nacionalidad, entre otras– debenevaluarseenfunción del&nbsp;interés&nbsp;superior&nbsp;del niño y han de estarguiadasporél, al igual que todas las medidas de aplicación, ya que la consideración del&nbsp;interés&nbsp;superior&nbsp;del niñocomoalgo primordial requieretomarconciencia de la importancia de susinteresesentodas las medidas y tener la voluntad de darprioridad a esosinteresesentodas las circunstancias, perosobretodocuando las medidastenganefectosindiscutiblesenlosniños de que se trate.”</span></p>" +
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
        ">Y la tesis CX/2016 de la décima época emitida por la Primera Sala de la Suprema Corte de Justicia de la Nación, publicada en la Gaceta del Semanario Judicial de la Federación, con el número 2011441, de rubro y texto: <strong>“VIOLENCIA FAMILIAR. MOMENTO EN QUE DEBE DICTARSE UNA MEDIDA DE PREVENCIÓN.</strong> Las autoridades del Estado Mexicano tienen el deber de primer orden de garantizar el respeto a la salud, integridad física y mental de las personas que son objeto de violencia, máxime cuando las víctimas se encuentran en una situación de vulnerabilidad manifiesta frente a sus agresores. Así, las autoridades deben otorgar garantías a las víctimas de que no serán objeto de nuevas agresiones, y hacer efectivo su derecho a denunciar los actos de violencia que han sido cometidos en su contra. Dichas garantías se actualizan a través de las medidas de prevención, las cuales para ser efectivas podrán ser dictadas desde la admisión de la demanda de violencia familiar, o en cualquier momento del juicio.”</p>" +
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
        "><span style=" +
        this.comilla +
        "color: red;" +
        this.comilla +
        ">SE TRATA DE </span><strong style=" +
        this.comilla +
        "color: red;" +
        this.comilla +
        ">VIOLENCIA CONTRA UN HOMBRE</strong><span style=" +
        this.comilla +
        "color: red;" +
        this.comilla +
        "> Y BORRAR LAS DEMAS HIPÓTESIS QUE NO SE ADECUEN</span></p>" +
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
        ">Bajo esos antecedentes, se considera que la víctima se encuentra en un contexto de actos de violencia cometidos en su agravio; y por ende, tal como lo establece el numeral 1 de la Declaración Universal de los Derechos Humanos y 1 de la Constitución Politica de los Estados Unidos Mexicanos, de esta representanción social tomar las medidas necesarias a efecto que no vuelva a verse violentado en su dignidad humana, y a garantizar una efectiva protección a una vida libre de violencia y a la igualdad de acceso a un pleno disfrute de los derechos, con la finalidad de evitar que se siga comentiendo un hecho violento en contra de la víctima. </p>" +
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
        ">Resultando aplicable la tesis CX/2016 de la décima época emitida por la Primera Sala de la Suprema Corte de Justicia de la Nación, publicada en la Gaceta del Semanario Judicial de la Federación, con el número 2011441, de rubro y texto: <strong>“VIOLENCIA FAMILIAR. MOMENTO EN QUE DEBE DICTARSE UNA MEDIDA DE PREVENCIÓN.</strong> Las autoridades del Estado Mexicano tienen el deber de primer orden de garantizar el respeto a la salud, integridad física y mental de las personas que son objeto de violencia, máxime cuando las víctimas se encuentran en una situación de vulnerabilidad manifiesta frente a sus agresores. Así, las autoridades deben otorgar garantías a las víctimas de que no serán objeto de nuevas agresiones, y hacer efectivo su derecho a denunciar los actos de violencia que han sido cometidos en su contra. Dichas garantías se actualizan a través de las medidas de prevención, las cuales para ser efectivas podrán ser dictadas desde la admisión de la demanda de violencia familiar, o en cualquier momento del juicio.”</p>" +
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
        "><span style=" +
        this.comilla +
        "color: red;" +
        this.comilla +
        ">SI SE TRATA DE </span><strong style=" +
        this.comilla +
        "color: red;" +
        this.comilla +
        ">VIOLENCIA CONTRA UNA PERSONA CONDISCAPACITADO</strong><span style=" +
        this.comilla +
        "color: red;" +
        this.comilla +
        "> Y BORRAR LAS DEMAS HIPÓTESIS QUE NO SE ADECUEN</span></p>" +
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
        ">Bajo esos antecedentes, se ha puesto del conocimiento de esta representación social que la víctima <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre) </span>padece una dicapacidad <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(motriz, auditiva, audiovisual, etc -especificar-) </span>por tanto se encuentra en una situación de mayor vulnerabilidad, así que atendiendo a lo que preceptúa el numeral 5 de la Ley General de Víctimas, debe privilegiarse el enfoque diferencial y especializado, al reconocer que las personas con una discapacidad se encuentran en mayor situación de vulnerabilidad en razón de su condición de discapacidad y que requieren de una atención especializada que responda a sus particularidades y al grado de vulnerabilidad, por tanto adoptar garantías especiales y medidas de protección para estas personas se fundamenta en lo preceptuado en los arábigos 5, 7 y 28 de la Ley General para la Inclusión de las Personas con Discapacidad, y para ello esta fiscalía está obligada a adoptar las medidas pertinentes para salvaguardarsuintegridad de todoposibleriesgo o peligro, y a garantizar una efectiva protección a una vida libre de violencia y a la igualdad de acceso a un pleno disfrute de los derechos, con la finalidad de evitar que se siga comentiendo un hecho violento en su contra.</p>" +
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
        ">Resultando aplicable la tesis CX/2016 de la décima época emitida por la Primera Sala de la Suprema Corte de Justicia de la Nación, publicada en la Gaceta del Semanario Judicial de la Federación, con el número 2011441, de rubro y texto: <strong>“VIOLENCIA FAMILIAR. MOMENTO EN QUE DEBE DICTARSE UNA MEDIDA DE PREVENCIÓN.</strong> Las autoridades del Estado Mexicano tienen el deber de primer orden de garantizar el respeto a la salud, integridad física y mental de las personas que son objeto de violencia, máxime cuando las víctimas se encuentran en una situación de vulnerabilidad manifiesta frente a sus agresores. Así, las autoridades deben otorgar garantías a las víctimas de que no serán objeto de nuevas agresiones, y hacer efectivo su derecho a denunciar los actos de violencia que han sido cometidos en su contra. Dichas garantías se actualizan a través de las medidas de prevención, las cuales para ser efectivas podrán ser dictadas desde la admisión de la demanda de violencia familiar, o en cualquier momento del juicio.”</p>" +
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
        ">Y la tesis110 de la décimaépoca, emitidapor el Tercer Tribunal Colegiadoen Materia Civil del Primer Circuito, publicadaen la Gaceta del Semanario Judicial de la Federación con el número2021580 para suconsulta, de rubro y texto: “<strong style=" +
        this.comilla +
        "color: black;" +
        this.comilla +
        ">PERSONAS CON DISCAPACIDAD. EL ESTADO ESTÁ OBLIGADO A GARANTIZARLES LAS CONDICIONES JURÍDICAS Y ADMINISTRATIVAS QUE LES ASEGUREN EL EJERCICIO DEL DERECHO AL RECONOCIMIENTO DE LA PERSONALIDAD JURÍDICA, ATENTO AL PRINCIPIO DE IGUALDAD ANTE LA LEY.&nbsp;</strong><span style=" +
        this.comilla +
        "color: black;" +
        this.comilla +
        ">El artículo&nbsp;1o. de la ConstituciónPolítica de losEstadosUnidosMexicanos&nbsp;establece que todas las personas gozarán de los derechos humanosreconocidosensutexto y enlostratadosinternacionales de los que el Estado Mexicano sea Parte; y prohíbetodadiscriminaciónmotivada, entre otrascuestiones, portenercualquiertipo de discapacidad. Porsu parte, la Ley General para la Inclusión de las Personas con Discapacidadprevéensusartículos&nbsp;5, fracciones V y VI, y del&nbsp;28 al 31, el reconocimiento a la autonomía individual que incluye la libertad para podertomarsuspropiasdecisiones y la independencia de que gozanaquéllas para ejercersuvoluntad, quienestienen derecho a recibir un tratodigno y apropiadoenlosprocedimientosadministrativos y judicialesen que sean parte. En ese sentido, el deber del Estado esprocurarlosmedios y condicionesjurídicasen general, para que el derecho al reconocimiento de la personalidadjurídicapuedaserejercidoporsustitulares. En especial, el Estado estáobligado a garantizar a aquellas personas ensituación de vulnerabilidad, marginación y discriminación, las condicionesjurídicas y administrativas que les aseguren el ejercicio de este derecho, enatención al principio de igualdad ante la ley.”</span></p>" +
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
        "<p style=" +
        this.comilla +
        "text-align:center" +
        this.comilla +
        "><span style=" +
        this.comilla +
        "color: red;" +
        this.comilla +
        ">SI SE TRATA DE </span><strong style=" +
        this.comilla +
        "color: red;" +
        this.comilla +
        ">VIOLENCIA CONTRA UN ADULTO MAYOR </strong><span style=" +
        this.comilla +
        "color: red;" +
        this.comilla +
        ">Y BORRAR LAS DEMAS HIPÓTESIS QUE NO SE ADECUEN</span></p>" +
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
        ">Bajo esos antecedentes, <span style=" +
        this.comilla +
        "color: windowtext;" +
        this.comilla +
        ">se ha puesto del conocimiento de esta </span>r<span style=" +
        this.comilla +
        "color: windowtext;" +
        this.comilla +
        ">epresentación </span>s<span style=" +
        this.comilla +
        "color: windowtext;" +
        this.comilla +
        ">ocial que la víctima </span>se encuentra en un contexto de actos de violencia <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(física, psicológica, patrimonial, sexual, económica –asentar la modalidad que se adecúe al caso-)</span><span style=" +
        this.comilla +
        "color: windowtext;" +
        this.comilla +
        ">cometido en su agravio.</span></p>" +
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
        "><span style=" +
        this.comilla +
        "color: windowtext;" +
        this.comilla +
        ">Y tomando en cuenta que </span>es una persona mayor de edad por así estar reconocida conforme al indo 3ro de la Ley de los Derechos de las personas adultas mayores, aunado a que las personasmayores de edadgozan de igualdad de derechos humanos y libertades fundamentales que otras personas, y que estos derechos, incluido el de no verse sometida a discriminación fundada en la edad ni a ningún tipo de violencia, dimanan de la dignidad y la igualdad que son inherentes a todo ser humano; la persona mayor tiene derecho a la seguridad y a una vida sin ningún tipo de violencia, a recibir un trato digno y a ser respetada y valorada, independientemente de la raza, el color, el sexo, el idioma, la cultura, la religión, la opinión política o de otra índole, el origen social, nacional, étnico, indígena e identidad cultural, la posición socio-económica, discapacidad, la orientación sexual, el género, la identidad de género, su contribución económica o cualquier otra condición; máxime que si consideramos que las personas mayores tiene derecho a vivir una vida sin ningún tipo de violencia y maltrato; es por ello que la violencia a la que se ha hecho referencia, de la que es sujeto la víctima, constituye una violación de los derechos humanos y las libertades fundamentales de los adultos mayores, en ese mismo tenor de ideas y conforme a lo que establecen los indos 3° BIS, 4° y&nbsp;5° fracciones –I y II- Ley de los Derechos de las personas adultas mayores, aunado a que las personas mayores, esta autoridad está obligada a adopter las medidas necesarias y tendientes a evitar que se siga poniendo en riesgo a la víctima adulto mayor de edad, y para salvaguardar su integridad de todo posible riesgo o peligro, y a garantizar una efectiva protección a una vida libre de violencia y a la igualdad de acceso a un pleno disfrute de los derechos, con la finalidad de evitar que se siga comentiendo un hecho violento en su contra.</p>" +
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
        ">Resultando igualmente aplicable la tesis CX/2016 de la décima época emitida por la Primera Sala de la Suprema Corte de Justicia de la Nación, publicada en la Gaceta del Semanario Judicial de la Federación, con el número 2011441, de rubro y texto: <strong>“VIOLENCIA FAMILIAR. MOMENTO EN QUE DEBE DICTARSE UNA MEDIDA DE PREVENCIÓN.</strong> Las autoridades del Estado Mexicano tienen el deber de primer orden de garantizar el respeto a la salud, integridad física y mental de las personas que son objeto de violencia, máxime cuando las víctimas se encuentran en una situación de vulnerabilidad manifiesta frente a sus agresores. Así, las autoridades deben otorgar garantías a las víctimas de que no serán objeto de nuevas agresiones, y hacer efectivo su derecho a denunciar los actos de violencia que han sido cometidos en su contra. Dichas garantías se actualizan a través de las medidas de prevención, las cuales para ser efectivas podrán ser dictadas desde la admisión de la demanda de violencia familiar, o en cualquier momento del juicio.”</p>" +
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
        ">Y por analogía la tesis 58 de la décima época emitida por el Noveno Tribunal Colegiado en Materia Penal del Primer Circuito, publicada en la Gaceta del Semanario Judicial de la Federación, con el número 2007451, de rubro y texto: <strong>“VIOLENCIA FAMILIAR. EN ESTE DELITO, LOS ADULTOS MAYORES, EN ATENCIÓN A SU EDAD, SON SUJETOS EN CONDICIONES DE VULNERABILIDAD (LEGISLACIÓN DEL DISTRITO FEDERAL)</strong>. Las 100 Reglas de Brasilia sobre Acceso a la Justicia de las Personas en condición de Vulnerabilidad señalan, en su artículo 2, numeral 6, al envejecimiento como causa de vulnerabilidad cuando la persona adulta mayor encuentre especiales dificultades, atendiendo a sus capacidades funcionales, para ejercitar sus derechos ante el sistema de justicia; en tanto que su artículo 5, numeral 11, considera en condición de vulnerabilidad a la víctima del delito que tenga una relevante limitación para evitar o mitigar los daños y perjuicios derivados de la infracción penal o de su contacto con el sistema de justicia, o para afrontar los riesgos de sufrir una nueva victimización; además, puntualiza que esa vulnerabilidad puede proceder de sus propias características personales o bien de las circunstancias de la infracción penal, destacando entre estas víctimas, a los adultos mayores y recomienda especial atención en los casos de violencia intrafamiliar. Atento a lo anterior, la actitud agresiva y amenazante que asumen las personas contra un adulto mayor que reúne la calidad de ascendiente en línea recta, como lo establece el artículo 200, fracción II, del Código Penal para el Distrito Federal, en el que se contiene la descripción típica del delito de violencia familiar, constituye un trato denigrante, al crear un ambiente hostil y humillante respecto de una persona que por su condición de adulto mayor se encuentra en un estado de indefensión y constante agresión por quienes lo debieran cuidar y proteger en esa etapa de su vida; situación ante la cual, el sistema judicial debe configurarse como un instrumento para su defensa efectiva, ya que por su edad tiene derecho a no ser discriminado por dicho factor, a ser tratado con dignidad y protegido ante cualquier rechazo o tipo de abuso mental por su condición de vulnerabilidad.”</p>" +
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
        "><strong>CUARTO. Decisión.</strong>Por lo expuesto y con fundamentoen los artículos 1, 4, 14, 16, 20 Apartado C, fracción VI, 21 y 133 de la Constitución Política de los Estados Unidos Mexicanos; 131 fracción XII y XV, 137 -fracciones <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">I, II, III, IV, V, VI, VII, VIII, IX, X (poner las que aplican)</span>- del Código Nacional de Procedimientos Penales; <u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(poner los artículos, fracciones aplicables al delito)</u>del Código Penal para el estado de Hidalgo; 1, 2 fracciones I, XVII de la Ley de Atención, Asistencia y Protección a Víctimas de Delitos y Violaciones a derechos humanos para el Estado de Hidalgo; esta representación social decreta como <strong>MEDIDAS DE PROTECCIÓN</strong> a favor de la víctima <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre)</span>, las siguientesque estáncontempladasen el artículo 137 del Código Nacional de ProcedimientosPenales:</p>" +
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
        "<p style=" +
        this.comilla +
        "text-align:center" +
        this.comilla +
        ">	<span style=" +
        this.comilla +
        "color: red;" +
        this.comilla +
        ">Adecuar solo las que apliquen al caso</span></p>" +
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
        ">	<u>I.- La prohibición a </u><u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre del investigado)</u><u> de acercarseen un radio de </u><u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(especificar)</u><u> metros o comunicarse de maneradirecta o a través de terceras personas o porcualquiermedioelectrónico con la víctima</u><u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre)</u><u>;</u></p>" +
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
        ">	<u>II.- La limitación a </u><u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre del investigado)</u><u>para asistir o acercarse al domicilio de la víctima(</u><u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">nombre)</u><u>o al lugardonde se encuentre;</u></p>" +
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
        ">	<u>III.- La separacióninmediata de </u><u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre del investigado)</u><u> del domicilioubicadoen</u><u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">XXX</u><u>;</u></p>" +
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
        ">	<u>IV.- La entregainmediata de objetos de uso personal y documentos de identidad de la víctima que tieneenposesión el probable responsableen</u><u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(poner el domicilio)</u><u>, mismos que son enlistadospor la víctimaenhojaanexa; y para talefectomediante el oficiocorrespondiente se solicitará a elementos de la policíanvestigadorarealicen el acompañamiento de la parte victimal. </u></p>" +
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
        ">	<u>V.- La prohibición a </u><u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre del investigado) </u><u>de realizarconductas de intimidación o molestia a la víctima</u><u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre) </u><u>o a personas relacionados con ésta, ya sea de maneradirecta o a través de terceras personas o porcualquiermedioelectrónico;</u></p>" +
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
        ">	<u>VI.- La vigilanciaen el domicilio de la víctima</u><u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre)</u><u> ubicado en </u><u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(poner el domicilio)</u><u>;</u></p>" +
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
        ">	<u>VII.- Protecciónpolicial de la víctima</u><u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre)</u><u>;</u></p>" +
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
        ">	<u>VIII.- El auxilioinmediatoporintegrantes de institucionespoliciales, al domicilioendonde se localice o se encuentre la víctima u ofendido</u><u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre)</u><u>en el momento de solicitarlo;</u></p>" +
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
        ">	<u>IX.- Traslado de la víctima</u><u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre) </u><u>a refugios o alberguestemporales, asícomo de susdescendientes, y</u></p>" +
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
        ">	<u>X. El reingreso de la víctima</u><u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre)</u><u>a sudomicilioubicadoen</u><u style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(poner el domicilio)</u><u>, unavez que se salvaguardesuseguridad</u>.</p>" +
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
        ">Las cuales, en términos del artículo 139 del Código Nacional de Procedimientos Penales, tendrán una vigencia de sesenta días naturales; temporalidad que es acorde con el tiempo estimado para garantizar la protección de la víctima <span style=" +
        this.comilla +
        "color: rgb(35, 129, 51);" +
        this.comilla +
        ">(nombre)</span>, basado en los hechos denunciados y atendiendo al riesgo en el que se encuentra, ya que como se advirtió el generador de actos de violencia cometidos en su agravio, son atribuibles a <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre del investigado)</span>.</p>" +
        "<p class=" +
        this.comilla +
        "ql-align-justify" +
        this.comilla +
        ">Medidas de protección que <strong>deberánnotificarse</strong>a la víctima<span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre)</span>y a<strong style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre)</strong><strong>, en su carácter de persona investigada</strong>, en términos del artículo 82 del Código Nacional de Procedimientos Penales; bajo <strong>apercibimiento</strong>a esta última que en caso de desacatar y no cumplirlas incurrirá en la comisión del tipo penal de desobediencia de particulares previsto por el artículo 314 del Código Penal para el estado; sin perjuicio que esta fiscalía podrá imponerle algúnmedio de apremioseñaladopor el artículo 104 facciónI del Código Nacional de ProcedimientosPenales, que puedeconsistiren: amonestación, multade veintea mil unidadesdiarias de medida y actualización, asícomo el auxilio de la fuerzapúblicae incluso el arrestohasta portreinta y seishoras.</p>" +
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
        "<p>Finalmente, gírese oficio al:</p>" +
        "<p><br></p>" +
        "<p><br></p>" +
        "<p>*Delegado Regional en <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(lugar)</span> de la Agencia de Seguridad del Estado de Hidalgo;</p>" +
        "<p><br></p>" +
        "<p><br></p>" +
        "<p>*Secretario de Seguridad Pública y Tránsito Municipal de <span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(Lugar)</span><span style=" +
        this.comilla +
        "color: rgb(35, 129, 51);" +
        this.comilla +
        ">;</span></p>" +
        "<p><br></p>" +
        "<p><br></p>" +
        "<p><span style=" +
        this.comilla +
        "color: windowtext;" +
        this.comilla +
        ">*Comandante de la Policía Investigadora Grupo (Lugar); y</span></p>" +
        "<p><br></p>" +
        "<p><br></p>" +
        "<p><span style=" +
        this.comilla +
        "color: windowtext;" +
        this.comilla +
        ">*Coor</span>dinador General del Centro de Control, Comando, Comunicaciones, Cómputo, Coordinación, Calidad e Inteligencia C5i.</p>" +
        "<p><br></p>" +
        "<p><br></p>" +
        "<p>Lo anterior, a efecto de hacerles de su conocimiento que se han dictado a favor de la víctima<span style=" +
        this.comilla +
        "color: rgb(112, 48, 160);" +
        this.comilla +
        ">(nombre)</span>medidas de protección que tendrán una temporalidad de sesenta días naturales; asimismo, que su cumplimiento, vigilancia y ejecución estará a cargo del personal a su cargo que para tal efecto designen, de acuerdo a lo establecido dentro del numeral 132 fracciones XII y XIII del Código Nacional de Procedimientos Penales; así como en los arábigos 1 fracción XIII, 2 fracción I, XIII y XV, 7, 14, 28 fracción II, 48 fracción VII y 177 fracción III, de la Ley de Seguridad Pública para el Estado de Hidalgo.&nbsp;</p>" +
        "<p><br></p>" +
        "<p><br></p>" +
        "<p class=" +
        this.comilla +
        "ql-align-justify" +
        this.comilla +
        ">	Cúmplase.&nbsp;</p>" +
        "<p><br></p>";
      // }
      // })
    },
    generarpdf() {
      let me = this;
      var now = moment();
      me.generarQR(me.docMedidasProt,me.nuc,me.u_nombre,now,me.idmproteccion);
      
      this.mostrarpdf(this.u_nombre, this.u_puesto, this.u_agencia);
    },
    generarpdf2() {
      this.mostrarpdf(this.acnombre, this.acpuesto, this.acagencia);
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
    limpiar() {
      this.listar();
      this.modaldocumento = false;
      this.victima = [];
      this.imputado = [];
      this.delito = [];
      this.medidasdp = "";
      this.duracion = "";
      this.institucion = [];
      this.nomedida = "";
      this.domicilion = "";
      this.fechai = this.generarfecha3(new Date().toISOString().substr(0, 10));
      this.fechav = this.generarfecha3(new Date().toISOString().substr(0, 10));
      this.domicilioPersona = "";
      this.fechaa = this.generarfecha3(new Date().toISOString().substr(0, 10));
      this.fechat = this.generarfecha3(new Date().toISOString().substr(0, 10));
      this.numeromedida = "";
      (this.textofinaldestinatario = false),
        (this.textodestinatario = ""),
        (this.itemsdestino = "");
      this.numerooficio = "";
      this.numerooficion = "";
      this.nomedida = [];
      this.textof = "";
      this.petiofimp = false;
      this.medidasextratf = false;
      this.medidasextra = "";
      this.qrCode = null;
      this.vistaPreviaTF = true;
    },
    generarfecha() {
      let me = this;
      me.dia = moment().format("DD");
      me.mes = moment().format("MMMM");
      me.año = moment().format("YYYY");
      me.hr = moment().format("h:mm a");
      me.fecha =
        me.hr + " horas del dia " + me.dia + " de " + me.mes + " de " + me.año;
    },
    generarfecha2() {
      if (this.menu1)
        this.fechai =
          this.fechainicio.substring(8, 10) +
          " de " +
          this.obtenermes(this.fechainicio.substring(5, 7) - 1) +
          " del " +
          this.fechainicio.substring(0, 4);
      if (this.menu2)
        this.fechav =
          this.fechavencimiento.substring(8, 10) +
          " de " +
          this.obtenermes(this.fechavencimiento.substring(5, 7) - 1) +
          " del " +
          this.fechavencimiento.substring(0, 4);
      if (this.menu3)
        this.fechaa =
          this.fechaampliacion.substring(8, 10) +
          " de " +
          this.obtenermes(this.fechaampliacion.substring(5, 7) - 1) +
          " del " +
          this.fechaampliacion.substring(0, 4);
      if (this.menu4)
        this.fechat =
          this.fechaterminaampliacion.substring(8, 10) +
          " de " +
          this.obtenermes(this.fechaterminaampliacion.substring(5, 7) - 1) +
          " del " +
          this.fechaterminaampliacion.substring(0, 4);
    },
    generarfecha3(fecha) {
      var fechaf =
        fecha.substring(8, 10) +
        " de " +
        this.obtenermes(fecha.substring(5, 7) - 1) +
        " del " +
        fecha.substring(0, 4);
      return fechaf;
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
    agregarampliacion(item) {
      this.limpiar();
      this.dialogoampliacion = true;
      this.generarfecha();
      this.idMProteccion = item.idMProteccion;
    },
    listar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/MedidasProteccion/Listar/" + me.rHechoId, configuracion)
        .then(function (response) {
          me.medidasproteccions = response.data;
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
      this.textof = item.textofinaldetalle;
      this.numerooficio = item.numeroOficio;

      me.vistaPreviaTF = false;
      me.generarQR(me.docMedidasProt,me.nuc,item.usuario,item.fechasys,item.idMProteccion);

      setTimeout(() => 
            {
              this.imprimirpdf(item.usuario, item.puesto, item.uagencia);
              this.modaldocumento = false;
            }, 1000);

      
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
    listarnomedidas() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var medidasarray = [];
      me.$conf
        .get("api/MedidasProteccionC/Listar", configuracion)
        .then(function (response) {
          //console.log(response.data)
          medidasarray = response.data;
          medidasarray.map(function (x) {
            me.nomedidas.push({
              text: x.clave + " - " + x.descripcion,
              value: x.clave + " - " + x.descripcion,
              numerico: me.convertir(x.clave),
              clave: x.clave,
              descripcion: x.descripcion,
            });
          });
          me.nomedidas.sort((a, b) => (a.numerico > b.numerico ? 1 : -1));
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
      let me = this;
      this.nomedida.sort((a, b) => (a.numerico > b.numerico ? 1 : -1));
      this.medidasdp = "";
      this.nomedida.forEach(function (x) {
        me.medidasdp +=
          x.text +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>" +
          "<p class=" +
          me.comilla +
          "ql-align-justify" +
          me.comilla +
          "><br></p>";
      });
    },
    listarrah() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RHechoes/ListarPorId/" + me.rHechoId, configuracion)
        .then(function (response) {
          me.rBreve = response.data.rBreve;
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
    listarInstituciones() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var institucionessArray = [];
      this.$conf
        .get("api/Instituciones/Listar", configuracion)
        .then(function (response) {
          //console.log(response.data)
          institucionessArray = response.data;
          institucionessArray.map(function (x) {
            me.instituciones.push({ text: x.nombre, value: x.nombre });
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
    informacionagencia() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$conf
        .get("api/Agencias/Listarporid/" + me.u_idagencia, configuracion)
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
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      //VARIABLES PARA EL GUARDADO
      var imputados = "",
        victimas = "",
        instituciones = "",
        delitos = "";
      //VARIABLES PARA LA EDICION
      var victimasXl = "",
        imputadosXl = "",
        isntitucionesXl = "",
        delitosXl = "";

      //FORS NECESARIOS PARA CONVERTIR LOS VALORES INTRODUCIDOS EN UN SOLO REGISTRO SEPARADO POR COMAS

      //IMPUTADOS
      for (var i = 0; i < me.imputado.length; i++) {
        imputados += me.imputado[i];

        if (i + 1 != me.imputado.length) imputados += ", ";
      }

      //VICTIMAS
      for (var i = 0; i < me.victima.length; i++) {
        victimas += me.victima[i];

        if (i + 1 != me.victima.length) victimas += ", ";
      }

      //INSTITUCIONES
      for (var i = 0; i < me.institucion.length; i++) {
        instituciones += me.institucion[i];

        if (i + 1 != me.institucion.length) instituciones += ", ";
      }

      //DELITOS
      for (var i = 0; i < me.delito.length; i++) {
        delitos += me.delito[i];

        if (i + 1 != me.delito.length) delitos += ", ";
      }

      var varpetiofimp = "";

      if (me.petiofimp == false) varpetiofimp = "De manera oficiosa por el MP";
      else varpetiofimp = "Otorgadas por parte del MP";

      var descripcionRegTabI =
        "Registro de medidas de proteccion para las victimas " + victimas;

      if (this.editedIndex == -1) {
        me.$confirm(
          "Esperando confirmación",
          "Estas seguro de  que deseas guardar la información ",
          function () {
            me.$CAT
              .post(
                "api/MedidasProteccion/Crear",
                {
                  rHechoId: me.rHechoId,
                  victima: victimas,
                  imputado: imputados,
                  lugar: me.u_distrito,
                  fechahora: me.fecha,
                  agente: me.u_nombre,
                  nuc: me.nuc,
                  delito: delitos,
                  narrativa: me.rBreve,
                  domicilio: "",
                  telefono: "",
                  medidaProtecion: me.medidasdp,
                  duracion: 0,
                  institucionejec: instituciones,
                  agencia: me.u_agencia,
                  nomedidas: me.nomedida.length,
                  destinatarion: "na",
                  domicilion: "na",
                  fInicio: me.fechai,
                  fVencimiento: me.fechav,
                  ampliacion: false,
                  fAmpliacion: "na",
                  FterminoAm: "na",
                  ratificacion: "na",
                  distrito: me.u_distrito,
                  subproc: me.u_dirSubPro,
                  uagencia: me.u_agencia,
                  usuario: me.u_nombre,
                  puesto: me.u_puesto,
                  modulo: me.u_modulo,
                  textofinal: me.textodocumento,
                  textofinal2: me.textodocumento3,
                  textofinaldetalle: me.textof,
                  detalleactivo: false,
                  numeroOficio: me.numerooficio,
                  numeroOficioN: "",
                  petiOfiMPBool: me.petiofimp,
                  petiOfiMPVar: varpetiofimp,
                  medidasExtraTF: me.medidasextratf,
                  medidasExtra: me.medidasextra,
                },
                configuracion
              )
              .then(function (response) {
                me.idmproteccion = response.data.idmedidaprotecion;
                me.$notify(
                  "La información se guardo correctamente !!!",
                  "success"
                );

                me.nomedida.forEach(function (x) {
                  me.$CAT
                    .post(
                      "api/MedidasProteccion/CrearNomedida",
                      {
                        Clave: x.clave,
                        Descripcion: x.descripcion,
                        MedidasproteccionId: response.data.idmedidaprotecion,
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
                });

                me.vistaPreviaTF = false;
                var now = moment();
                me.generarQR(me.docMedidasProt,me.nuc,me.u_nombre,now,me.idmproteccion);

                setTimeout(() => 
                {
                  me.imprimirpdf(me.u_nombre, me.u_puesto, me.u_agencia);
                  me.dialogo = false;
                  me.listar();
                  
                }, 1000);
                setTimeout(() => 
                {
                  me.limpiar();
                }, 2000);

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
      } else {
        //-------------------------------------ADECUACIONES DE IFS PARA GURDAR LAS EDICIONES EN VALORES DE TEXTO SEPARADO POR COMAS-----------------------------------------------

        //VICTIMAS
        if (me.victima.length <= 0) {
          victimasXl = "";
        } else {
          me.victima.forEach(function (notificacion) {
            if (
              typeof notificacion !== null &&
              typeof notificacion !== undefined
            ) {
              if (notificacion == "[object Object]") {
                victimasXl += notificacion.text + ", ";
              } else {
                victimasXl += notificacion + ", ";
              }
            }
          });
          //
          if (
            victimasXl.substring(victimasXl.length, victimasXl.length - 1) ==
            ", "
          ) {
            victimasXl = victimasXl.substring(0, victimasXl.length - 1);
          }
        }

        //IMPUTADOS
        if (me.imputado.length <= 0) {
          imputadosXl = "";
        } else {
          me.imputado.forEach(function (notificacion) {
            if (
              typeof notificacion !== null &&
              typeof notificacion !== undefined
            ) {
              if (notificacion == "[object Object]") {
                imputadosXl += notificacion.text + ", ";
              } else {
                imputadosXl += notificacion + ", ";
              }
            }
          });
          //
          if (
            imputadosXl.substring(imputadosXl.length, imputadosXl.length - 1) ==
            ", "
          ) {
            imputadosXl = imputadosXl.substring(0, imputadosXl.length - 1);
          }
        }

        //DELITOS
        if (me.delito.length <= 0) {
          delitosXl = "";
        } else {
          me.delito.forEach(function (notificacion) {
            if (
              typeof notificacion !== null &&
              typeof notificacion !== undefined
            ) {
              if (notificacion == "[object Object]") {
                delitosXl += notificacion.text + ", ";
              } else {
                delitosXl += notificacion + ", ";
              }
            }
          });
          //
          if (
            delitosXl.substring(delitosXl.length, delitosXl.length - 1) == ", "
          ) {
            delitosXl = delitosXl.substring(0, delitosXl.length - 1);
          }
        }

        //INSTITUCIONES
        if (me.institucion.length <= 0) {
          isntitucionesXl = "";
        } else {
          me.institucion.forEach(function (notificacion) {
            if (
              typeof notificacion !== null &&
              typeof notificacion !== undefined
            ) {
              if (notificacion == "[object Object]") {
                isntitucionesXl += notificacion.text + ", ";
              } else {
                isntitucionesXl += notificacion + ", ";
              }
            }
          });
          //
          if (
            isntitucionesXl.substring(
              isntitucionesXl.length,
              isntitucionesXl.length - 1
            ) == ", "
          ) {
            isntitucionesXl = isntitucionesXl.substring(
              0,
              isntitucionesXl.length - 1
            );
          }
          //listaMediosNotificacion = listaMediosNotificacion.slice(10, -1);
        }

        me.$confirm(
          "Esperando confirmación",
          "Estas seguro de  que deseas actualizar la información ",
          function () {
            me.$CAT
              .delete(
                "api/MedidasProteccion/Eliminar/" + me.idMProteccion,
                configuracion
              )
              .then(function (response) {})
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
                    "Error al intentar lisatar los registros!!!",
                    "error"
                  );
                }
              });

              me.$CAT
              .put(
                "api/MedidasProteccion/Actualizar",
                {
                  idMProteccion: me.idMProteccion,
                  victima: victimasXl,
                  imputado: imputadosXl,
                  delito: delitosXl,
                  domicilio: me.domicilioPersona,
                  telefono: me.victima.telefono,
                  medidaProtecion: me.medidasdp,
                  duracion: 0,
                  institucionejec: isntitucionesXl,
                  nomedidas: me.nomedida.length,
                  fInicio: me.fechai,
                  fVencimiento: me.fechav,
                  textofinal: me.textodocumento,
                  textofinal2: me.textodocumento3,
                  textofinaldetalle: me.textof,
                  petiOfiMPBool: me.petiofimp,
                  petiOfiMPVar: varpetiofimp,
                  medidasExtraTF: me.medidasextratf,
                  medidasExtra: me.medidasextra,
                },
                configuracion
              )
              .then(function (response) {
                me.$notify(
                  "La información se actualizo correctamente !!!",
                  "success"
                );

                me.nomedida.forEach(function (x) {
                  me.$CAT
                    .post(
                      "api/MedidasProteccion/CrearNomedida",
                      {
                        Clave: x.clave,
                        Descripcion: x.descripcion,
                        MedidasproteccionId: me.idMProteccion,
                      },
                      configuracion
                    )
                    .then(function (response) {})
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
                });

                me.vistaPreviaTF = false;
                setTimeout(() => 
                {
                  me.imprimirpdf(me.acnombre, me.acpuesto, me.acagencia);
                  me.dialogo = false;
                  me.modaldocumento = false;
                  me.listar();
                }, 1000);

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

    actualizarampliacion() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$validator.validateAll("datosampliacion").then((result) => {
        if (result) {
          me.$CAT
            .put(
              "api/MedidasProteccion/ActualizarAmpliacion",
              {
                idMProteccion: me.idMProteccion,
                ampliacion: true,
                fAmpliacion: me.fechaa,
                fterminoAm: me.fechat,
                ratificacion: me.fecha,
              },
              configuracion
            )
            .then(function (response) {
              me.$notify(
                "La información se actualizo correctamente !!!",
                "success"
              );
              me.dialogoampliacion = false;
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
                me.$notify(
                  "Error al intentar actualizar el registro!!!",
                  "error"
                );
              }
            });
        }
      });
    },
    vermedidas(item) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get(
          "api/MedidasProteccion/ListarNoMedidas/" + item.idMProteccion,
          configuracion
        )
        .then(function (response) {
          me.medidasregistro = response.data;
          me.diaologomedidas = true;
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
    vermedidas(item) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get(
          "api/MedidasProteccion/ListarNoMedidas/" + item.idMProteccion,
          configuracion
        )
        .then(function (response) {
          me.medidasregistro = response.data;
          me.diaologomedidas = true;
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
    verinfoadiccional(item) {
      this.ivictimas = item.victima;
      this.iimputados = item.imputado;
      this.idelitos = item.delito;
      this.iinstitucion = item.institucionejec;
      this.dialogoinfo = true;
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
      var html = htmlToPdfmake(this.textof);
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
            //  {
            //    image: logo2,
            //   width: 50,
            //   absolutePosition: {x: 495, y: 30},
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
            margin: [0, 40, 0, 0],
            absolutePosition: { x: 85, y: 150 },
          },
          {
            text: "Número de oficio: " + this.numerooficio + "\n\n\n\n\n\n\n\n",
            style: "Nooficio",
            alignment: "right",
          },
          {
            text: html,
            alignment: "justify",
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
