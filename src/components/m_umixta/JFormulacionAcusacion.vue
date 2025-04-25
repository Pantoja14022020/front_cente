<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Formulación de acusación</v-toolbar-title
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
            <v-toolbar-title
              >Registrar formulación de acusación
            </v-toolbar-title>
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
              <v-layout row wrap> </v-layout>

              <v-stepper v-model="step" non-linear vertical>
                <v-stepper-step
                  :complete="step > 1"
                  step="1"
                  editable
                  :rules="[
                    () =>
                      !errors.has('crear.número de oficio') &&
                      !errors.has('crear.delito') &&
                      !errors.has('crear.dirigido a') &&
                      !errors.has('crear.puesto') &&
                      !errors.has('crear.causa penal') &&
                      !errors.has('crear.dirección de notificaciones') &&
                      !errors.has('crear.correo de notificaciones') &&
                      !errors.has('crear.acusación'),
                  ]"
                >
                  Captura de datos
                </v-stepper-step>
                <v-stepper-content step="1">
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex class="espaciado" xs12 sm12 md6 lg6>
                        <v-text-field
                          name="número de oficio"
                          label="*Número de oficio:"
                          v-model="numoficio"
                          v-validate="'required'"
                          data-vv-scope="crear"
                          :error-messages="
                            errors.collect('crear.número de oficio')
                          "
                        >
                        </v-text-field>

                        <v-select
                          name="delito"
                          :items="delitos"
                          v-model="delito"
                          v-validate="'required'"
                          label="*Delito:"
                          return-object
                          attach
                          chips
                          deletable-chips
                          multiple
                          v-on:change="ordenar"
                          data-vv-scope="crear"
                          :error-messages="errors.collect('crear.delito')"
                        >
                        </v-select>

                        <v-text-field
                          name="puesto"
                          label="*Cargo a quien va dirigido:"
                          v-model="puesto"
                          v-validate="'required'"
                          data-vv-scope="crear"
                          :error-messages="errors.collect('crear.puesto')"
                        >
                        </v-text-field>
                      </v-flex>

                      <v-flex class="espaciado" xs12 sm12 md6 lg6>
                        <v-text-field
                          name="causa penal"
                          label="*Causa penal:"
                          v-model="causapenal"
                          v-validate="'required'"
                          data-vv-scope="crear"
                          :error-messages="errors.collect('crear.causa penal')"
                        >
                        </v-text-field>

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
                      </v-flex>

                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title
                            ><h3>*Formular acusación</h3></v-card-title
                          >
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="acusación"
                                v-validate="'required'"
                                v-model="acusacion"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.acusación')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-stepper-content>

                <v-stepper-step
                  :complete="step > 2"
                  step="2"
                  editable
                  :rules="[
                    () =>
                      !errors.has('crear.hechos3') &&
                      !errors.has('crear.clasificacion3') &&
                      !errors.has('crear.articulos') &&
                      !errors.has('crear.darticulos3'),
                  ]"
                >
                  LA RELACIÓN CLARA, PRECISA, CIRCUNSTANCIADA Y ESPECÍFICA DE
                  LOS HECHOS ATRIBUIDOS EN MODO, TIEMPO Y LUGAR, ASÍ COMO SU
                  CLASIFICACIÓN JURÍDICA:
                </v-stepper-step>
                <v-stepper-content step="2">
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title><h3>*Hechos</h3></v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="hechos3"
                                v-validate="'required'"
                                v-model="hechos3"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.hechos3')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>

                      <v-flex v-if="false" xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title
                            ><h3>*Clasificación juridica</h3></v-card-title
                          >
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="clasificacion3"
                                v-validate="'required'"
                                v-model="clasificacion3"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.clasificacion3')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>

                      <v-flex xs12 xm12 md12 lg12>
                        <v-text-field
                          name="articulos"
                          label="*Articulos:"
                          v-model="articulos3"
                          v-validate="'required'"
                          data-vv-scope="crear"
                          :error-messages="errors.collect('crear.articulos')"
                        >
                        </v-text-field>
                      </v-flex>

                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title
                            ><h3>*Descripción de articulos</h3></v-card-title
                          >
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="darticulos3"
                                v-validate="'required'"
                                v-model="darticulos3"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.darticulos3')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-stepper-content>
                <v-stepper-step
                  :complete="step > 3"
                  step="3"
                  editable
                  :rules="[() => !errors.has('crear.modalidades4')]"
                >
                  RELACIÓN DE LAS MODALIDADES DEL DELITO QUE CONCURRAN.
                </v-stepper-step>
                <v-stepper-content step="3">
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title><h3>*Descripción</h3></v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="modalidades4"
                                v-validate="'required'"
                                v-model="modalidades4"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.modalidades4')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-stepper-content>
                <v-stepper-step
                  :complete="step > 4"
                  step="4"
                  editable
                  :rules="[
                    () =>
                      !errors.has('crear.en calidad de') &&
                      !errors.has('crear.articulo de conformidad'),
                  ]"
                >
                  AUTORÍA O PARTICIPACIÓN CONCRETA QUE SE ATRIBUYE LOS ACUSADOS
                </v-stepper-step>
                <v-stepper-content step="4">
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex class="espaciado" xs12 sm12 md6 lg6>
                        <v-text-field
                          name="en calidad de"
                          label="*En calidad de:"
                          v-model="calidadde"
                          v-validate="'required'"
                          data-vv-scope="crear"
                          :error-messages="
                            errors.collect('crear.en calidad de')
                          "
                        >
                        </v-text-field>
                      </v-flex>

                      <v-flex class="espaciado" xs12 sm12 md6 lg6>
                        <v-text-field
                          name="articulo de conformidad"
                          label="*Articulo de conformidad:"
                          v-model="articulo5"
                          v-validate="'required'"
                          data-vv-scope="crear"
                          :error-messages="
                            errors.collect('crear.articulo de conformidad')
                          "
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-stepper-content>
                <v-stepper-step
                  :complete="step > 5"
                  step="5"
                  editable
                  :rules="[
                    () =>
                      !errors.has(
                        'crear.articulo de preceptos legales aplicables'
                      ),
                  ]"
                >
                  PRECEPTOS LEGALES APLICABLES
                </v-stepper-step>
                <v-stepper-content step="5">
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex class="espaciado" xs12 sm12 md6 lg6>
                        <v-text-field
                          name="articulo de preceptos legales aplicables"
                          label="*Articulo de preceptos legales aplicables:"
                          v-model="articulo6"
                          v-validate="'required'"
                          data-vv-scope="crear"
                          :error-messages="
                            errors.collect(
                              'crear.articulo de preceptos legales aplicables'
                            )
                          "
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-stepper-content>
                <v-stepper-step
                  :complete="step > 6"
                  step="6"
                  editable
                  :rules="[
                    () =>
                      !errors.has('crear.ptestimonial7') &&
                      !errors.has('crear.ppericial7') &&
                      !errors.has('crear.documentales7') &&
                      !errors.has('crear.pmaterial7') &&
                      !errors.has('crear.panticipada7'),
                  ]"
                >
                  EL SEÑALAMIENTO DE LOS MEDIOS DE PRUEBA QUE PRETENDA OFRECER,
                  ASÍ COMO LA PRUEBA ANTICIPADA QUE SE HUBIERE DESAHOGADO EN LA
                  ETAPA DE INVESTIGACIÓN
                </v-stepper-step>
                <v-stepper-content step="6">
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title
                            ><h3>*Prueba testimonial</h3></v-card-title
                          >
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="ptestimonial7"
                                v-validate="'required'"
                                v-model="ptestimonial7"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.ptestimonial7')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>

                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title><h3>*Prueba pericial</h3></v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="ppericial7"
                                v-validate="'required'"
                                v-model="ppericial7"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.ppericial7')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>

                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title><h3>*Documentales</h3></v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="documentales7"
                                v-validate="'required'"
                                v-model="documentales7"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.documentales7')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>

                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title><h3>*Prueba material</h3></v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="pmaterial7"
                                v-validate="'required'"
                                v-model="pmaterial7"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.pmaterial7')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>

                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title
                            ><h3>*Prueba anticipada</h3></v-card-title
                          >
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="panticipada7"
                                v-validate="'required'"
                                v-model="panticipada7"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.panticipada7')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-stepper-content>
                <v-stepper-step
                  :complete="step > 7"
                  step="7"
                  editable
                  :rules="[
                    () =>
                      !errors.has(
                        'crear.esta Representación Social de conformidad por lo establecido por los artículos'
                      ) &&
                      !errors.has(
                        'crear.pago de la reparación de daños(Cantidad)'
                      ) &&
                      !errors.has(
                        'crear.cantidad en letras(LETRA 00/100 M.N)'
                      ) &&
                      !errors.has('crear.ptestimonial8') &&
                      !errors.has('crear.ppericial8') &&
                      !errors.has('crear.documentales8') &&
                      !errors.has('crear.pmaterial8'),
                  ]"
                >
                  EL MONTO DE LA REPARACIÓN DE DAÑOS Y LOS MEDIOS DE PRUEBA QUE
                  OFRECE PARA PROBARLOS
                </v-stepper-step>
                <v-stepper-content step="7">
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex class="espaciado" xs12 sm12 md12 lg12>
                        <v-text-field
                          name="esta Representación Social de conformidad por lo establecido por los artículos"
                          label="*Esta Representación Social de conformidad por lo establecido por los artículos:"
                          v-model="articulos8"
                          v-validate="'required'"
                          data-vv-scope="crear"
                          :error-messages="
                            errors.collect(
                              'crear.esta Representación Social de conformidad por lo establecido por los artículos'
                            )
                          "
                        >
                        </v-text-field>
                      </v-flex>

                      <v-flex class="espaciado" xs12 sm12 md6 lg6>
                        <v-text-field
                          name="pago de la reparación de daños(Cantidad)"
                          label="*Pago de la reparación de daños(Cantidad):"
                          v-model="cantidad8"
                          v-validate="'required'"
                          data-vv-scope="crear"
                          :error-messages="
                            errors.collect(
                              'crear.pago de la reparación de daños(Cantidad)'
                            )
                          "
                        >
                        </v-text-field>
                      </v-flex>

                      <v-flex class="espaciado" xs12 sm12 md6 lg6>
                        <v-text-field
                          name="cantidad en letras(LETRA 00/100 M.N)"
                          label="*Cantidad en letras(LETRA 00/100 M.N):"
                          v-model="cantidadletras8"
                          v-validate="'required'"
                          data-vv-scope="crear"
                          :error-messages="
                            errors.collect(
                              'crear.cantidad en letras(LETRA 00/100 M.N)'
                            )
                          "
                        >
                        </v-text-field>
                      </v-flex>

                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title
                            ><h3>*Prueba testimonial</h3></v-card-title
                          >
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="ptestimonial8"
                                v-validate="'required'"
                                v-model="ptestimonial8"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.ptestimonial8')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>

                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title><h3>*Prueba pericial</h3></v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="ppericial8"
                                v-validate="'required'"
                                v-model="ppericial8"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.ppericial8')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>

                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title><h3>*Documentales</h3></v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="documentales8"
                                v-validate="'required'"
                                v-model="documentales8"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.documentales8')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>

                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title><h3>*Prueba material</h3></v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="pmaterial8"
                                v-validate="'required'"
                                v-model="pmaterial8"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.pmaterial8')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-stepper-content>
                <v-stepper-step
                  :complete="step > 8"
                  step="8"
                  editable
                  :rules="[
                    () =>
                      !errors.has('crear.correlación de los artículos') &&
                      !errors.has('crear.pena para el acusado'),
                  ]"
                >
                  LA PENA O MEDIDA DE SEGURIDAD CUYA APLICACIÒN SE SOLICITA.
                </v-stepper-step>
                <v-stepper-content step="8">
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex class="espaciado" xs12 sm12 md6 lg6>
                        <v-text-field
                          name="correlación de los artículos"
                          label="*Correlación de los artículos:"
                          v-model="articulos9"
                          v-validate="'required'"
                          data-vv-scope="crear"
                          :error-messages="
                            errors.collect('crear.correlación de los artículos')
                          "
                        >
                        </v-text-field>
                      </v-flex>

                      <v-flex class="espaciado" xs12 sm12 md6 lg6>
                        <v-text-field
                          name="pena para el acusado"
                          label="*Pena para el acusado:"
                          v-model="penaacusado"
                          v-validate="'required'"
                          data-vv-scope="crear"
                          :error-messages="
                            errors.collect('crear.pena para el acusado')
                          "
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-stepper-content>

                <v-stepper-step
                  :complete="step > 9"
                  step="9"
                  editable
                  :rules="[
                    () =>
                      !errors.has('crear.testimoniales10') &&
                      !errors.has('crear.ptestimonial10') &&
                      !errors.has('crear.ppericial10') &&
                      !errors.has('crear.documentales10') &&
                      !errors.has('crear.pmaterial10'),
                  ]"
                >
                  LOS MEDIOS DE PRUEBA QUE EL MINISTERIO PÙBLICO PRETENDA
                  PRESENTAR PARA LA INDIVIDUALIZACIÒN DE LA PENA Y EN SU CASO,
                  PARA LA PROCEDENCIA DE SUSTITUTIVOS DE LA PENA DE PRISIÒN O
                  SUSPENSIÓN DE LA MISMA.
                </v-stepper-step>
                <v-stepper-content step="9">
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title><h3>*Testimoniales</h3></v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="testimoniales10"
                                v-validate="'required'"
                                v-model="testimoniales10"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.testimoniales10')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>

                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title
                            ><h3>*Prueba testimonial</h3></v-card-title
                          >
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="ptestimonial10"
                                v-validate="'required'"
                                v-model="ptestimonial10"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.ptestimonial10')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>

                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title><h3>*Prueba pericial</h3></v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="ppericial10"
                                v-validate="'required'"
                                v-model="ppericial10"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.ppericial10')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>

                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title><h3>*Documentales</h3></v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="documentales10"
                                v-validate="'required'"
                                v-model="documentales10"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.documentales10')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>

                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title><h3>*Prueba material</h3></v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="pmaterial10"
                                v-validate="'required'"
                                v-model="pmaterial10"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.pmaterial10')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-stepper-content>
                <v-stepper-step
                  :complete="step > 10"
                  step="10"
                  editable
                  :rules="[() => !errors.has('crear.descripcion11')]"
                >
                  SOLICITUD DE DECOMISO DE LOS BIENES ASEGURADOS.
                </v-stepper-step>
                <v-stepper-content step="10">
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title><h3>*Descripción</h3></v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="descripcion11"
                                v-validate="'required'"
                                v-model="descripcion11"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.descripcion11')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-stepper-content>
                <v-stepper-step
                  :complete="step > 11"
                  step="11"
                  editable
                  :rules="[() => !errors.has('crear.descripcion12')]"
                >
                  LA PROPUESTA DE ACUERDOS PROBATORIOS
                </v-stepper-step>
                <v-stepper-content step="11">
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title><h3>*Descripción</h3></v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="descripcion12"
                                v-validate="'required'"
                                v-model="descripcion12"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.descripcion12')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-stepper-content>
                <v-stepper-step
                  :complete="step > 12"
                  step="12"
                  editable
                  :rules="[() => !errors.has('crear.descripcion13')]"
                >
                  LA SOLICITUD DE QUE SE APLIQUE ALGUNA FORMA DE TERMINACIÓN
                  ANTICIPADA CUANDO ÉSTA PROCEDE.
                </v-stepper-step>
                <v-stepper-content step="12">
                  <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex xs12 xm12 md12 lg12>
                        <v-card elevation="0">
                          <v-card-title><h3>*Descripción</h3></v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-form>
                              <vue-editor
                                name="descripcion13"
                                v-validate="'required'"
                                v-model="descripcion13"
                                outline
                                height="350px;"
                                style="max-height: 310px; overflow-y: scroll"
                                :editorToolbar="customToolbar"
                                data-vv-scope="crear"
                                :error-messages="
                                  errors.collect('crear.descripcion13')
                                "
                              >
                              </vue-editor>
                            </v-form>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-stepper-content>
              </v-stepper>
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
                      <v-date-picker v-model="fechacita" no-title scrollable>
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
    numoficio: "",
    delitos: [],
    delito: [],
    causapenal: "",
    step: 1,
    dirigidoa: "",
    puesto: "",
    dnotificaciones: "",
    cnotificaciones: "",
    imputados: [],
    victimas: [],
    acusacion: "",
    hechos3: "",
    clasificacion3: "",
    articulos3: "",
    darticulos3: "",
    modalidades4: "",
    calidadde: "",
    articulo5: "",
    articulo6: "",
    panticipada7:
      "Se hace del conocimiento que durante la investigación no se desahogó NINGUNA",
    ptestimonial7: "",
    ppericial7: "",
    documentales7:
      "El cual será incorporado a juicio a través del testimonio de ",
    pmaterial7: "El cual será incorporadoa juicio a través del testimonio de",
    ptestimonial8: "",
    ppericial8: "",
    documentales8:
      "El cual será incorporado a juicio a través del testimonio de ",
    pmaterial8: "",
    articulos8: "",
    cantidad8: "",
    cantidadletras8: "",
    penaacusado: "",
    articulos9: "",
    testimoniales10: "",
    ptestimonial10: "",
    ppericial10: "",
    documentales10:
      "El cual será incorporado a juicio a través del testimonio de ",
    pmaterial10:
      "Se ofrecen los mismos medios de prueba ofrecidos en el apartado de VIII, correspondiente a la REPARACIÓN DEL DAÑO.",
    descripcion11: "",
    descripcion12: "",
    descripcion13:
      "Existe Proposición por parte de esta Representación Social de que el presente asunto se pueda concluir por una forma de terminación anticipada.",
    texto: "",
    texto3: "",
    modaldocumento: false,
    delitosf: "",
    imputadosf2: "",
    victimarlegal: "",
    aux: "",
    representantesl: [],
    representantesj: [],
    representantesp: [],
    comilla: '"',
    direccionpv: [],
    direccionpi: [],
    imputadosf: [],
    victimasf: [],
    vd2: "",
    vd3: "",
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
    docFormulacionA: 'Formulacion de acusacion',
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
      me.listarPersonas();
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
    dialogoact(item) {
      this.titulodialogo = this.texto2(item.tipo, item.tipo2);
      this.idagenda = item.idAgenda;
      this.dialogoactualizar = true;
    },

    texto2(tipo, tipo2) {
      if (tipo == 2) return "Audiencia inicial";
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
    listarPersonas() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var contador = 0;
      var personasArray = [];
      me.$CAT
        .get("api/RAPs/ListarVicDE/" + me.rAtencionId, configuracion)
        .then(function (response) {
          //console.log(response.data)
          personasArray = response.data;
          personasArray.map(function (x) {
            me.victimas.push({
              text: x.nombreCompleto,
              value: x.personaId,
              de: x.direccionE,
            });
          });
          me.obtenerRepresentanteLegal();
          me.obtenerRepresentanteJuridico();
          me.representantesactivosVictimas();
          me.$CAT
            .get("api/RAPs/ListarImpDE/" + me.rAtencionId, configuracion)
            .then(function (response) {
              //console.log(response.data)
              personasArray = response.data;
              personasArray.map(function (x) {
                me.imputados.push({
                  text: x.nombreCompleto,
                  value: x.personaId,
                  de: x.direccionE,
                });
              });
              me.obtenerRepresentanteParticular();
              me.representantesactivosImputados();
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
    obtenerRepresentanteLegal() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.representantesl = [];

      for (var i = 0; i < me.victimas.length; i++) {
        me.$CAT
          .get(
            "api/Representante/RepresentanteslistarporPersonaLegal/" +
              me.victimas[i].value,
            configuracion
          )
          .then(function (response) {
            //console.log(response.data.personaR)
            me.representantesl.push({
              idp: response.data.personaId,
              dato: response.data.personaR,
              telefono: response.data.telefono,
              correo: response.data.correoElectronico,
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
    obtenerRepresentanteJuridico() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.representantesj = [];

      for (var i = 0; i < me.victimas.length; i++) {
        me.$CAT
          .get(
            "api/Representante/RepresentanteslistarporPersonaJuridico/" +
              me.victimas[i].value,
            configuracion
          )
          .then(function (response) {
            //console.log(response.data.personaR)
            me.representantesj.push({
              idp: response.data.personaId,
              dato: response.data.personaR,
              telefono: response.data.telefono,
              correo: response.data.correoElectronico,
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
    obtenerRepresentanteParticular() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.representantesp = [];

      for (var i = 0; i < me.imputados.length; i++) {
        me.$CAT
          .get(
            "api/Representante/RepresentanteslistarporPersonaParticular/" +
              me.imputados[i].value,
            configuracion
          )
          .then(function (response) {
            me.representantesp.push({
              idp: response.data.personaId,
              dato: response.data.personaR,
              telefono: response.data.telefono,
              correo: response.data.correoElectronico,
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
    representantesactivosVictimas() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.direccionpv = [];
      var aux;

      for (var i = 0; i < me.victimas.length; i++) {
        me.$CAT
          .get(
            "api/Representante/RepresentantesActivos/" + me.victimas[i].value,
            configuracion
          )
          .then(function (response) {
            if (response.data.respuesta)
              me.obtenerDPV(true, response.data.idpersona);
            else me.obtenerDPV(false, response.data.idpersona);
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
    obtenerDPV(estado, idpersona) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$CAT
        .get("api/RAPs/ListarDP/" + idpersona, configuracion)
        .then(function (response) {
          me.direccionpv.push({
            idp: response.data.idPersona,
            estado: estado,
            dato:
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
              response.data.estado,
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
    representantesactivosImputados() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.direccionpi = [];
      var aux;

      for (var i = 0; i < me.imputados.length; i++) {
        me.$CAT
          .get(
            "api/Representante/RepresentantesActivos/" + me.imputados[i].value,
            configuracion
          )
          .then(function (response) {
            if (response.data.respuesta)
              me.obtenerDPI(true, response.data.idpersona);
            else me.obtenerDPI(false, response.data.idpersona);
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
    obtenerDPI(estado, idpersona) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$CAT
        .get("api/RAPs/ListarDP/" + idpersona, configuracion)
        .then(function (response) {
          me.direccionpi.push({
            idp: response.data.idPersona,
            estado: estado,
            dato:
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
              response.data.estado,
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
    generarpdf() {
      this.$validator.validateAll("crear").then((result) => {
        if (result) {
          this.delitosf = "";
          this.imputadosf = "";
          this.victimarlegal = "";
          this.vd2 = "";
          this.vd3 = "";

          for (var i = 0; i < this.delito.length; i++) {
            this.delitosf += this.delito[i].text;
            this.delito.length != i + 1 ? (this.delitosf += ", ") : "";
          }

          for (var i = 0; i < this.imputados.length; i++) {
            this.imputadosf2 += this.imputados[i].text;
            this.imputados.length != i + 1 ? (this.imputadosf2 += ", ") : "";
          }

          this.puesto = this.puesto.toUpperCase();

          this.imputadosf = [];

          for (var i = 0; i < this.imputados.length; i++) {
            this.imputadosf.push({
              idp: this.imputados[i].value,
              nombre: this.imputados[i].text,
              direcionp: "",
              direcione: this.imputados[i].de,
              ractivos: "",
              representante: "",
              telefono: "",
              correo: "",
            });
            for (var j = 0; j < this.direccionpi.length; j++) {
              if (this.direccionpi[j].idp == this.imputadosf[i].idp) {
                this.imputadosf[i].direcionp = this.direccionpi[j].dato;
                this.imputadosf[i].ractivos = this.direccionpi[j].estado;
              }
              if (this.representantesp[j].idp == this.imputadosf[i].idp) {
                this.imputadosf[i].representante = this.representantesp[j].dato;
                this.imputadosf[i].telefono = this.representantesp[j].telefono;
                this.imputadosf[i].correo = this.representantesp[j].correo;
              }
            }
          }

          this.victimasf = [];

          for (var i = 0; i < this.victimas.length; i++) {
            this.victimasf.push({
              idp: this.victimas[i].value,
              nombre: this.victimas[i].text,
              direcionp: "",
              direcione: this.victimas[i].de,
              ractivos: "",
              representantel: "",
              telefonol: "",
              correol: "",
              representantej: "",
              telefonoj: "",
              correoj: "",
            });
            for (var j = 0; j < this.direccionpv.length; j++) {
              if (this.direccionpv[j].idp == this.victimasf[i].idp) {
                this.victimasf[i].direcionp = this.direccionpv[j].dato;
                this.victimasf[i].ractivos = this.direccionpv[j].estado;
              }
              if (this.representantesl[j].idp == this.victimasf[i].idp) {
                this.victimasf[i].representantel = this.representantesl[j].dato;
                this.victimasf[i].telefonol = this.representantesl[j].telefono;
                this.victimasf[i].correol = this.representantesl[j].correo;
              }

              if (this.representantesj[j].idp == this.victimasf[i].idp) {
                this.victimasf[i].representantej = this.representantesj[j].dato;
                this.victimasf[i].telefonoj = this.representantesj[j].telefono;
                this.victimasf[i].correoj = this.representantesj[j].correo;
              }
            }
          }

          for (var i = 0; i < this.victimasf.length; i++) {
            this.victimarlegal += this.victimasf[i].nombre;
            this.victimasf[i].representantel != ""
              ? (this.victimarlegal +=
                  ", Representada por " + this.victimasf[i].representantel)
              : "";
            this.victimasf.length != i + 1 ? (this.victimarlegal += ", ") : "";
          }

          for (var i = 0; i < this.imputadosf.length; i++) {
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
              "<b>NOMBRE DEL ACUSADO: </b> " +
              this.imputadosf[i].nombre +
              "<p class=" +
              this.comilla +
              "ql-align-justify" +
              this.comilla +
              "><br></p>";

            this.vd2 += "Domicilio: " + this.imputadosf[i].direcionp;

            if (this.imputadosf[i].representante != "") {
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
                "<b>NOMBRE DEL DEFENSOR: </b> " +
                this.imputadosf[i].representante +
                "<p class=" +
                this.comilla +
                "ql-align-justify" +
                this.comilla +
                "><br></p>";

              this.vd2 +=
                "Domicilio: " +
                this.imputadosf[i].direcione +
                "<p class=" +
                this.comilla +
                "ql-align-justify" +
                this.comilla +
                "><br></p>" +
                "Telefono: " +
                this.imputadosf[i].telefono +
                "<p class=" +
                this.comilla +
                "ql-align-justify" +
                this.comilla +
                "><br></p>" +
                "Correo: " +
                this.imputadosf[i].correo;
            }
          }

          for (var i = 0; i < this.victimasf.length; i++) {
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
              "<b>NOMBRE DE LA VÍCTIMA: </b> " +
              this.victimasf[i].nombre;

            if (this.victimasf[i].representantel != "") {
              this.vd3 +=
                ", Representada por  " +
                this.victimasf[i].representantel +
                " con domicilio en " +
                this.victimasf[i].direcione;
            }

            if (this.victimasf[i].representantej != "") {
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
                "<b>NOMBRE DEL ASESOR JURIDICO DE LA VÍCTIMA: </b>" +
                this.victimasf[i].representantej +
                " con domicilio en " +
                this.victimasf[i].direcione;
            }
          }

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
            "><br></p>";

          this.texto =
            "La que suscribe " +
            this.u_nombre +
            ", Agente del Ministerio Público" +
            this.u_agencia +
            " con domicilio para oír y recibir todo tipo de notificaciones, el ubicado en " +
            this.dnotificaciones +
            ", así como el correo electrónico " +
            this.cnotificaciones +
            ", con fundamento en lo establecido los artículos 1, 14, 16, 20, 21 párrafo segundo de la Constitución Política de los Estados Unidos Mexicanos, con relación a los artículos 334 al 347 del Código Nacional de Procedimientos Penales, vengo a " +
            this.acusacion +
            " en contra de " +
            this.imputadosf2 +
            " por su probable intervención en los hechos que la ley señala como delito de " +
            this.delitosf +
            ", cometido en  agravio de " +
            this.victimarlegal +
            " por lo que de conformidad con lo dispuesto por el artículo 335 del Código Nacional de Procedimientos Penales, precisamos lo siguiente:" +
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
            "<b>I.- INDIVIDUALIZACIÓN DE LOS ACUSADOS Y SUS DEFENSORES:</b>" +
            this.vd2 +
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
            "<b>II.- IDENTIFICACIÓN DE LA VICTIMAS Y/O OFENDIDOS Y SU ASESOR JURIDICO.</b>" +
            this.vd3 +
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
            "<b>III.- LA RELACIÓN CLARA, PRECISA, CIRCUNSTANCIADA Y ESPECÍFICA DE LOS HECHOS ATRIBUIDOS EN MODO, TIEMPO Y LUGAR, ASÍ COMO SU CLASIFICACIÓN JURÍDICA:</b>" +
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
            "<b>A)	HECHOS</b>" +
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
            this.hechos3 +
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
            "<b>B)	CLASIFICACIÓN JURÍDICA.- </b>" +
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
            "Los hechos antes descritos a juicio de esta Representación Social encuadran en la descripción legal del delito " +
            this.delitosf +
            " de conformidad con lo establecido por la correlación de los artículos " +
            this.articulos3 +
            " del Código Penal para el Estado de Hidalgo. " +
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
            this.darticulos3 +
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
            "<b>IV.- RELACIÓN DE LAS MODALIDADES DEL DELITO QUE CONCURRAN. </b>" +
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
            this.modalidades4 +
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
            "<b>V.- AUTORÍA O PARTICIPACIÓN CONCRETA QUE SE ATRIBUYE LOS ACUSADOS.:</b>" +
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
            "La autoría que se le atribuye a " +
            this.imputadosf2 +
            ", atendiendo a su intervención, es en calidad de " +
            this.calidadde +
            " esto de conformidad en lo dispuesto por el artículo " +
            this.articulo5 +
            " del Código Penal vigente en la entidad." +
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
            "<b>VI.- PRECEPTOS LEGALES APLICABLES. </b>" +
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
            "Los artículos 16, 20, 21 párrafo segundo de la Constitución Política de los Estados Unidos Mexicanos, así como los numerales 1, 2, 127 al 131, 211, 334 al 347 del Código Nacional de Procedimientos Penales, y los artículos 11, 12 fracción I, " +
            this.articulo6 +
            " del Código Penal vigente en el Estado de Hidalgo." +
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
            "<b>VII. EL SEÑALAMIENTO DE LOS MEDIOS DE PRUEBA QUE PRETENDA  OFRECER, ASÍ COMO LA PRUEBA ANTICIPADA QUE SE HUBIERE DESAHOGADO EN LA ETAPA DE INVESTIGACIÓN.</b>" +
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
            "Con fundamento en lo dispuesto por los artículos 356, 357, 358, 359, 360, 368, 380, 381 y 383 del Código Nacional de Procedimientos Penales, se ofrecen los siguientes medios de prueba para ser desahogados en Juicio:" +
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
            "<b>*    PRUEBA TESTIMONIAL </b>" +
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
            this.ptestimonial7 +
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
            "<b>*    PRUEBA PERICIAL </b>" +
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
            this.ppericial7 +
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
            "<b>*    DOCUMENTALES.-  </b>" +
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
            this.documentales7 +
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
            "<b>*    PRUEBA MATERIAL  </b>" +
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
            this.pmaterial7 +
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
            "<b>*    PRUEBA ANTICIPADA.  </b>" +
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
            this.panticipada7 +
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
            "<b>VIII.- EL MONTO DE LA REPARACIÓN DE DAÑOS Y LOS MEDIOS DE PRUEBA QUE OFRECE PARA PROBARLOS</b>" +
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
            "Esta Representación Social de conformidad por lo establecido por los artículos  " +
            this.articulos8 +
            " del Código Penal para el Estado de Hidalgo, solicita que se condene a " +
            this.imputadosf2 +
            ", al pago de la reparación de daños consistente en la cantidad de $" +
            this.cantidad8 +
            "(" +
            this.cantidadletras8 +
            ")" +
            ", cantidad que deberá ser pagada a " +
            this.victimarlegal +
            ", cantidad que deberá ser actualizada conforme al Índice nacional de Precios al Consumidor a la fecha de pago" +
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
            "Para lo cual se ofrecen los siguientes medios de prueba:" +
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
            "<b>*    PRUEBA TESTIMONIAL </b>" +
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
            this.ptestimonial8 +
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
            "<b>*    PRUEBA PERICIAL</b>" +
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
            this.ppericial8 +
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
            "<b>*    DOCUMENTALES.- </b>" +
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
            this.documentales8 +
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
            "<b>*    PRUEBA MATERIAL </b>" +
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
            this.pmaterial8 +
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
            "<b>IX.- LA PENA O MEDIDA DE SEGURIDAD CUYA APLICACIÒN SE SOLICITA.</b>" +
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
            "Los hechos antes descritos a juicio de esta Representación Social encuadran en la descripción legal del delito " +
            this.delitosf +
            " de conformidad con lo establecido por la correlación de los artículos " +
            this.articulos9 +
            " del Código Penal para el Estado de Hidalgo, esta Representación Social, solicita que en términos del artículo 410 del Código Nacional de Procedimientos Penales se imponga al acusado una pena de " +
            this.penaacusado +
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
            "<b>X.- LOS MEDIOS DE PRUEBA QUE EL MINISTERIO PÙBLICO PRETENDA PRESENTAR PARA LA INDIVIDUALIZACIÒN DE LA PENA Y EN SU CASO, PARA LA PROCEDENCIA DE SUSTITUTIVOS DE LA PENA DE PRISIÒN O SUSPENSIÓN DE LA MISMA.</b>" +
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
            "<b>*    TESTIMONIALES </b>" +
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
            this.testimoniales10 +
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
            "<b>*    PRUEBA TESTIMONIAL </b>" +
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
            this.ptestimonial10 +
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
            "<b>*    PRUEBA PERICIAL </b>" +
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
            this.ppericial10 +
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
            "<b>*    DOCUMENTALES </b>" +
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
            this.documentales10 +
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
            "<b>*    PRUEBA MATERIAL </b>" +
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
            this.pmaterial10 +
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
            "<b>XI.- SOLICITUD DE DECOMISO DE LOS BIENES ASEGURADOS. </b>" +
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
            this.descripcion11 +
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
            "<b>XII.- LA PROPUESTA DE ACUERDOS PROBATORIOS</b>" +
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
            this.descripcion12 +
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
            "<b>XIII.- LA SOLICITUD DE QUE SE APLIQUE ALGUNA FORMA DE TERMINACIÓN ANTICIPADA CUANDO ÉSTA PROCEDE.</b>" +
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
            this.descripcion13 +
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
            "<b>XIV.- DESCUBRIMIENTO PROBATORIO </b>" +
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
            "En cumplimiento a lo establecido por el artículo 337 del Código Nacional de Procedimientos Penales, esta Representación Social HACE DEL CONOCIMIENTO DE LA DEFENSA, que se encuentran a su disposición los antecedentes de investigación que obran en la Carpeta de Investigación al rubro indicada, esto para los efectos del DESCUBRIMIENTO PROBATORIO, <u>para lo cual deberán acudir a la " +
            this.u_agencia +
            "</u>, así mismo que se notifique a las víctimas e imputados  de la presentación de la acusación con la copias que se anexan . " +
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
            "Por lo anteriormente expuesto, solicito se me tenga formulando acusación en los términos  este escrito.";

          this.mostrarpdf(this.u_nombre, this.u_puesto, this.u_agencia);
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
      me.acusacion = item.reTelefono;
      me.imputadosf2 = item.imputado;
      me.victimarlegal = item.texto;

      (me.vd2 = item.informacionVicAseJu), (me.vd3 = item.informacionImpDeP);

      me.hechos3 = item.hechosIII;
      me.clasificacion3 = item.clasificacionjIII;
      me.articulos3 = item.correlacionArtIII;
      me.darticulos3 = item.articuloIII;

      me.modalidades4 = item.modaidadesVI;

      me.calidadde = item.autoriaV;
      me.articulo5 = item.autoria2V;

      me.articulo6 = item.preceptosVI;

      me.ptestimonial7 = item.testimonialVII;
      me.ppericial7 = item.pericialVII;
      me.documentales7 = item.documentalesVII;
      me.pmaterial7 = item.materialVII;
      me.panticipada7 = item.anticipadaVII;

      me.articulos8 = item.articulosVIII;
      me.cantidad8 = item.montoVIII;
      me.cantidadletras8 = item.numeroLetraVIII;
      me.ptestimonial8 = item.testimonialVIII;
      me.ppericial8 = item.pericialVIII;
      me.documentales8 = item.documentalesVIII;
      me.pmaterial8 = item.materialVIII;

      me.articulos9 = item.articulosIX;
      me.penaacusado = item.penaIX;

      me.testimoniales10 = item.testimonialesX;
      me.ptestimonial10 = item.testimonialX;
      me.ppericial10 = item.pericialX;
      me.documentales10 = item.documentalesX;
      me.pmaterial10 = item.materialX;

      me.descripcion11 = item.decomisoXI;

      me.descripcion12 = item.propuestaXII;

      me.descripcion13 = item.terminacionXIII;

      var agente = item.usuario;
      var agencia = item.uAgencia;

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
        "><br></p>";

      this.texto =
        "La que suscribe " +
        agente +
        ", Agente del Ministerio Público " +
        agencia +
        " con domicilio para oír y recibir todo tipo de notificaciones, el ubicado en " +
        this.dnotificaciones +
        ", así como el correo electrónico " +
        this.cnotificaciones +
        ", con fundamento en lo establecido los artículos 1, 14, 16, 20, 21 párrafo segundo de la Constitución Política de los Estados Unidos Mexicanos, con relación a los artículos 334 al 347 del Código Nacional de Procedimientos Penales, vengo a " +
        this.acusacion +
        " en contra de " +
        this.imputadosf2 +
        " por su probable intervención en los hechos que la ley señala como delito de " +
        this.delitosf +
        ", cometido en  agravio de " +
        this.victimarlegal +
        " por lo que de conformidad con lo dispuesto por el artículo 335 del Código Nacional de Procedimientos Penales, precisamos lo siguiente:" +
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
        "<b>I.- INDIVIDUALIZACIÓN DE LOS ACUSADOS Y SUS DEFENSORES:</b>" +
        this.vd2 +
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
        "<b>II.- IDENTIFICACIÓN DE LA VICTIMAS Y/O OFENDIDOS Y SU ASESOR JURIDICO.</b>" +
        this.vd3 +
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
        "<b>III.- LA RELACIÓN CLARA, PRECISA, CIRCUNSTANCIADA Y ESPECÍFICA DE LOS HECHOS ATRIBUIDOS EN MODO, TIEMPO Y LUGAR, ASÍ COMO SU CLASIFICACIÓN JURÍDICA:</b>" +
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
        "<b>A)	HECHOS</b>" +
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
        this.hechos3 +
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
        "<b>B)	CLASIFICACIÓN JURÍDICA.- </b>" +
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
        "Los hechos antes descritos a juicio de esta Representación Social encuadran en la descripción legal del delito " +
        this.delitosf +
        " de conformidad con lo establecido por la correlación de los artículos " +
        this.articulos3 +
        " del Código Penal para el Estado de Hidalgo. " +
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
        this.darticulos3 +
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
        "<b>IV.- RELACIÓN DE LAS MODALIDADES DEL DELITO QUE CONCURRAN. </b>" +
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
        this.modalidades4 +
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
        "<b>V.- AUTORÍA O PARTICIPACIÓN CONCRETA QUE SE ATRIBUYE LOS ACUSADOS.:</b>" +
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
        "La autoría que se le atribuye a " +
        this.imputadosf2 +
        ", atendiendo a su intervención, es en calidad de " +
        this.calidadde +
        " esto de conformidad en lo dispuesto por el artículo " +
        this.articulo5 +
        " del Código Penal vigente en la entidad." +
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
        "<b>VI.- PRECEPTOS LEGALES APLICABLES. </b>" +
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
        "Los artículos 16, 20, 21 párrafo segundo de la Constitución Política de los Estados Unidos Mexicanos, así como los numerales 1, 2, 127 al 131, 211, 334 al 347 del Código Nacional de Procedimientos Penales, y los artículos 11, 12 fracción I, " +
        this.articulo6 +
        " del Código Penal vigente en el Estado de Hidalgo." +
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
        "<b>VII. EL SEÑALAMIENTO DE LOS MEDIOS DE PRUEBA QUE PRETENDA  OFRECER, ASÍ COMO LA PRUEBA ANTICIPADA QUE SE HUBIERE DESAHOGADO EN LA ETAPA DE INVESTIGACIÓN.</b>" +
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
        "Con fundamento en lo dispuesto por los artículos 356, 357, 358, 359, 360, 368, 380, 381 y 383 del Código Nacional de Procedimientos Penales, se ofrecen los siguientes medios de prueba para ser desahogados en Juicio:" +
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
        "<b>*    PRUEBA TESTIMONIAL </b>" +
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
        this.ptestimonial7 +
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
        "<b>*    PRUEBA PERICIAL </b>" +
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
        this.ppericial7 +
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
        "<b>*    DOCUMENTALES.-  </b>" +
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
        this.documentales7 +
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
        "<b>*    PRUEBA MATERIAL  </b>" +
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
        this.pmaterial7 +
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
        "<b>*    PRUEBA ANTICIPADA.  </b>" +
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
        this.panticipada7 +
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
        "<b>VIII.- EL MONTO DE LA REPARACIÓN DE DAÑOS Y LOS MEDIOS DE PRUEBA QUE OFRECE PARA PROBARLOS</b>" +
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
        "Esta Representación Social de conformidad por lo establecido por los artículos  " +
        this.articulos8 +
        " del Código Penal para el Estado de Hidalgo, solicita que se condene a " +
        this.imputadosf2 +
        ", al pago de la reparación de daños consistente en la cantidad de $" +
        this.cantidad8 +
        "(" +
        this.cantidadletras8 +
        ")" +
        ", cantidad que deberá ser pagada a " +
        this.victimarlegal +
        ", cantidad que deberá ser actualizada conforme al Índice nacional de Precios al Consumidor a la fecha de pago" +
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
        "Para lo cual se ofrecen los siguientes medios de prueba:" +
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
        "<b>*    PRUEBA TESTIMONIAL </b>" +
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
        this.ptestimonial8 +
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
        "<b>*    PRUEBA PERICIAL</b>" +
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
        this.ppericial8 +
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
        "<b>*    DOCUMENTALES.- </b>" +
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
        this.documentales8 +
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
        "<b>*    PRUEBA MATERIAL </b>" +
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
        this.pmaterial8 +
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
        "<b>IX.- LA PENA O MEDIDA DE SEGURIDAD CUYA APLICACIÒN SE SOLICITA.</b>" +
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
        "Los hechos antes descritos a juicio de esta Representación Social encuadran en la descripción legal del delito " +
        this.delitosf +
        " de conformidad con lo establecido por la correlación de los artículos " +
        this.articulos9 +
        " del Código Penal para el Estado de Hidalgo, esta Representación Social, solicita que en términos del artículo 410 del Código Nacional de Procedimientos Penales se imponga al acusado una pena de " +
        this.penaacusado +
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
        "<b>X.- LOS MEDIOS DE PRUEBA QUE EL MINISTERIO PÙBLICO PRETENDA PRESENTAR PARA LA INDIVIDUALIZACIÒN DE LA PENA Y EN SU CASO, PARA LA PROCEDENCIA DE SUSTITUTIVOS DE LA PENA DE PRISIÒN O SUSPENSIÓN DE LA MISMA.</b>" +
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
        "<b>*    TESTIMONIALES </b>" +
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
        this.testimoniales10 +
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
        "<b>*    PRUEBA TESTIMONIAL </b>" +
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
        this.ptestimonial10 +
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
        "<b>*    PRUEBA PERICIAL </b>" +
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
        this.ppericial10 +
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
        "<b>*    DOCUMENTALES </b>" +
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
        this.documentales10 +
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
        "<b>*    PRUEBA MATERIAL </b>" +
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
        this.pmaterial10 +
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
        "<b>XI.- SOLICITUD DE DECOMISO DE LOS BIENES ASEGURADOS. </b>" +
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
        this.descripcion11 +
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
        "<b>XII.- LA PROPUESTA DE ACUERDOS PROBATORIOS</b>" +
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
        this.descripcion12 +
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
        "<b>XIII.- LA SOLICITUD DE QUE SE APLIQUE ALGUNA FORMA DE TERMINACIÓN ANTICIPADA CUANDO ÉSTA PROCEDE.</b>" +
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
        this.descripcion13 +
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
        "<b>XIV.- DESCUBRIMIENTO PROBATORIO </b>" +
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
        "En cumplimiento a lo establecido por el artículo 337 del Código Nacional de Procedimientos Penales, esta Representación Social HACE DEL CONOCIMIENTO DE LA DEFENSA, que se encuentran a su disposición los antecedentes de investigación que obran en la Carpeta de Investigación al rubro indicada, esto para los efectos del DESCUBRIMIENTO PROBATORIO, <u>para lo cual deberán acudir a la " +
        this.u_agencia +
        "</u>, así mismo que se notifique a las víctimas e imputados  de la presentación de la acusación con la copias que se anexan . " +
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
        "Por lo anteriormente expuesto, solicito se me tenga formulando acusación en los términos  este escrito.";


        

        me.vistaPreviaTF = false;
        me.generarQR(me.docFormulacionA,me.nuc,item.usuario,item.fechasys,item.idAgenda);

        setTimeout(() => 
        {
          me.imprimirpdf(item.usuario, item.uPuesto, item.uAgencia);
          me.modaldocumento = false;
        }, 1000);
      
    },
    guardar() {
      this.$validator.validateAll("crear").then((result) => {
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
                  "api/Agenda/Crear",
                  {
                    rHechoId: me.rHechoId,
                    NumeroOficio: me.numoficio,
                    CausaPenal: me.causapenal,
                    Nuc: me.nuc,
                    Delitos: me.delitosf,
                    Status: "Iniciado",
                    tipo: 6,
                    DirigidoNombre: me.dirigidoa,
                    DirigidoPuesto: me.puesto,
                    ReDireccion: me.dnotificaciones,
                    ReCorreo: me.cnotificaciones,
                    ReTelefono: me.acusacion,
                    Imputado: me.imputadosf2,
                    Texto: me.victimarlegal,

                    InformacionVicAseJu: me.vd2,
                    InformacionImpDeP: me.vd3,

                    HechosIII: me.hechos3,
                    ClasificacionjIII: me.clasificacion3,
                    CorrelacionArtIII: me.articulos3,
                    ArticuloIII: me.darticulos3,

                    ModaidadesVI: me.modalidades4,

                    AutoriaV: me.calidadde,
                    Autoria2V: me.articulo5,

                    PreceptosVI: me.articulo6,

                    TestimonialVII: me.ptestimonial7,
                    PericialVII: me.ppericial7,
                    DocumentalesVII: me.documentales7,
                    MaterialVII: me.pmaterial7,
                    AnticipadaVII: me.panticipada7,

                    ArticulosVIII: me.articulos8,
                    MontoVIII: me.cantidad8,
                    NumeroLetraVIII: me.cantidadletras8,
                    TestimonialVIII: me.ptestimonial8,
                    PericialVIII: me.ppericial8,
                    DocumentalesVIII: me.documentales8,
                    MaterialVIII: me.pmaterial8,

                    ArticulosIX: me.articulos9,
                    PenaIX: me.penaacusado,

                    TestimonialesX: me.testimoniales10,
                    TestimonialX: me.ptestimonial10,
                    PericialX: me.ppericial10,
                    DocumentalesX: me.documentales10,
                    MaterialX: me.pmaterial10,

                    DecomisoXI: me.descripcion11,

                    PropuestaXII: me.descripcion12,

                    TerminacionXIII: me.descripcion13,
                    FechaCitacion: "0001-01-01",

                    uDistrito: me.u_distrito,
                    uSubproc: me.u_dirSubPro,
                    uAgencia: me.u_agencia,
                    Usuario: me.u_nombre,
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
      me.acusacion = "";
      me.imputadosf2 = "";
      me.victimarlegal = "";

      me.vd2 = "";
      me.vd3 = "";

      me.hechos3 = "";
      me.clasificacion3 = "";
      me.articulos3 = "";
      me.darticulos3 = "";

      me.modalidades4 = "";

      me.calidadde = "";
      me.articulo5 = "";

      me.articulo6 = "";

      me.ptestimonial7 = "";
      me.ppericial7 = "";
      me.documentales7 = "";
      me.pmaterial7 = "";
      me.panticipada7 = "";

      me.articulos8 = "";
      me.cantidad8 = "";
      me.cantidadletras8 = "";
      me.ptestimonial8 = "";
      me.ppericial8 = "";
      me.documentales8 = "";
      me.pmaterial8 = "";

      me.articulos9 = "";
      me.penaacusado = "";

      me.testimoniales10 = "";
      me.ptestimonial10 = "";
      me.ppericial10 = "";
      me.documentales10 = "";
      me.pmaterial10 = "";

      me.descripcion11 = "";

      me.descripcion12 = "";

      me.descripcion13 = "";

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
        moment().format("YYYY") +
        ", " +
        moment().format("h:mm:ss a")
      );
    },
    listar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$IL
        .get(
          "api/Agenda/ListarTipoRHecho/" + me.rHechoId + "/" + 6,
          configuracion
        )
        .then(function (response) {
          //console.log(response);
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
      var nuc = this.nuc;
      var causapenal = this.causapenal;
      var delitos = this.delitosf;
      var nooficio = this.numoficio;
      //***************************************************************************** */
      var html = htmlToPdfmake(this.texto);
      var html2 = htmlToPdfmake(this.texto3);
      //***************************************************************************** */
      var agenciainfodr = this.agenciainfo["direccion"];
      var agenciainfotel = this.agenciainfo["telefono"];

      //***************************************************************************** */
      this.generarfecha2();
      //***************************************************************************** */

      let me  = this;

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
              "DELITO: " +
              delitos +
              "\n\n" +
              "NO DE OFICIO : " +
              nooficio +
              "\n\n\n\n\n\n\n\n",
            style: "Nooficio",
            alignment: "right",
          },
          {
            text: html2,
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
