<template>
  <v-layout row wrap>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage" elevation-2>
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Entrevista.</v-toolbar-title
        >
        <v-divider class="mx-2" inset vertical></v-divider>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-tooltip v-if="rAtencionId != ''" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              class="mx-2"
              slot="activator"
              v-on="on"
              @click="dialog1 = true"
              fab
              dark
              small
            >
              <v-icon dark>report_problem</v-icon>
            </v-btn>
          </template>
          <span>Contención</span>
        </v-tooltip>

        <v-dialog v-model="dialog1" max-width="900px">
          <v-card>
            <v-toolbar card dark color="grey lighten-4 primary--text">
              <v-avatar size="40">
                <v-icon class="grey lighten-2">report_problem</v-icon>
              </v-avatar>
              <v-toolbar-title class="subheading">Contención</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12 class="text-md-center">
                      <p class="headline" v-if="!sirequirio">
                        ¿Requiere medidas de contención para apoyo a la victima?
                      </p>
                      <v-icon v-if="!sirequirio" style="font-size: 80px"
                        >pan_tool</v-icon
                      >

                      <v-select
                        name="servicio requerido"
                        v-if="sirequirio"
                        :items="tiposrec"
                        v-model="tiporec"
                        v-validate="'required'"
                        label="*Servicio requerido:"
                        :error-messages="errors.collect('servicio requerido')"
                      >
                      </v-select>

                      <v-card v-if="sirequirio" elevation="0">
                        <v-card-title class="accent">
                          <h3>Texto del documento</h3>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-form>
                            <vue-editor
                              name="texto"
                              v-model="textocontencion"
                              outline
                              height="350px;"
                              style="max-height: 310px; overflow-y: scroll"
                              :editorToolbar="customToolbar"
                              :error-messages="errors.collect('texto')"
                            >
                            </vue-editor>
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
                <br />
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click.native="ActualizarNo" class="error">No</v-btn>
                  <v-btn
                    v-if="!sirequirio"
                    @click.native="ActualizarSi"
                    class="success"
                    >Si</v-btn
                  >
                  <v-btn
                    v-if="sirequirio"
                    @click.native="previsualizarpdf"
                    class="success"
                    >Guardar</v-btn
                  >
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialog2" max-width="980px">
          <v-card>
            <v-toolbar card dark color="grey lighten-4 primary--text">
              <v-avatar size="40">
                <v-icon class="grey lighten-2">report_problem</v-icon>
              </v-avatar>
              <v-toolbar-title class="subheading"
                >Información detallada</v-toolbar-title
              >
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                <v-container grid-list-md>
                  <v-layout wrap justify-space-between>
                    <v-flex xs4 sm4 md4>
                      <v-layout column>
                        <div class="subheading">
                          Documento de identificación:
                        </div>
                        <v-img
                          :src="ruta"
                          aspect-ratio="1"
                          class="grey lighten-2"
                          max-width="250"
                          max-height="160"
                        ></v-img>
                      </v-layout>
                    </v-flex>
                    <v-flex xs4 sm4 md4>
                      <v-text-field
                        v-model="tvictima"
                        label="Clasisficación de  persona:"
                        disabled
                      ></v-text-field>
                      <v-text-field
                        v-model="tipopersona"
                        label="Tipo de persona:"
                        disabled
                      ></v-text-field>
                      <v-text-field
                        v-model="fnacimiento"
                        label="Fecha de nacimiento:"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4 sm4 md4>
                      <v-text-field
                        v-model="sexo"
                        label="Sexo:"
                        disabled
                      ></v-text-field>
                      <v-text-field
                        v-model="genero"
                        label="Género:"
                        disabled
                      ></v-text-field>
                      <v-text-field
                        v-model="estadocivil"
                        label="Estado familiar:"
                        disabled
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs8 sm8 md8>
                      <v-text-field
                        v-model="nombre"
                        label="Nombre completo:"
                        disabled
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs4 sm4 md4>
                      <v-text-field
                        v-model="medionotificacion"
                        label="Medio de notificación:"
                        disabled
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs4 sm4 md4>
                      <v-text-field
                        v-model="nacionalidad"
                        label="Nacionalidad:"
                        disabled
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs4 sm4 md4>
                      <v-text-field
                        v-model="ocupacion"
                        label="Ocupación:"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4 sm4 md4>
                      <v-text-field
                        v-model="lengua"
                        label="Lengua:"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4 sm4 md4>
                      <v-text-field
                        v-model="religion"
                        label="Religión:"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4 sm4 md4>
                      <v-text-field
                        v-model="discapacidad"
                        label="Tipo de discapacidad:"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4 sm4 md4>
                      <v-text-field
                        v-model="parentesco"
                        label="Parentesco:"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="direccion"
                        label="Dirección:"
                        disabled
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                <br />
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click.native="close">Cerrar</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-card flat color="white" grid-list-md text-md-center fluid fill-height>
        <v-layout row>
          <v-flex d-flex grow>
            <v-card>
              <v-card-title>
                Información general.

                <v-spacer></v-spacer>

                <v-tooltip bottom color="success">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      class="mr-3"
                      slot="activator"
                      v-on="on"
                      v-on:click="detallepersona"
                    >
                      <v-icon>library_books</v-icon>
                    </v-btn>
                  </template>
                  <span>Información de la victima</span>
                </v-tooltip>
              </v-card-title>
              <v-card-text>
                <v-list two-line>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon color="info">folder_open</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ rac }}</v-list-tile-title>
                      <v-list-tile-sub-title>RAC</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon color="info">update</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ fhreg }}</v-list-tile-title>
                      <v-list-tile-sub-title
                        >Fecha y hora de registro</v-list-tile-sub-title
                      >
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-divider inset></v-divider>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon color="info">person</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ tvictima }}</v-list-tile-title>
                      <v-list-tile-sub-title
                        >Tipo de persona</v-list-tile-sub-title
                      >
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon color="info">contacts</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ curp }}</v-list-tile-title>
                      <v-list-tile-sub-title>CURP</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon color="info">account_circle</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ nombre }}</v-list-tile-title>
                      <v-list-tile-sub-title>Nombre</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-divider inset></v-divider>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon color="info">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ tel }}</v-list-tile-title>
                      <v-list-tile-sub-title>Teléfono(s)</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-divider inset></v-divider>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon color="info">mail</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title>{{ email }}</v-list-tile-title>
                      <v-list-tile-sub-title>Correo</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-divider inset></v-divider>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-card>
              <v-card-text>
                <v-stepper elevation-0 v-model="step" non-linear vertical>
                  <v-stepper-step :complete="step > 1" step="1">
                    Entrevista.
                    <small
                      >Entrevista de hechos para que se inicie la
                      investigación.</small
                    >
                  </v-stepper-step>
                  <v-stepper-content step="1">
                    <v-form data-vv-scope="form1">
                      <v-card
                        color="grey lighten-5"
                        elevation="0"
                        class="mb-5"
                        height="auto"
                      >
                        <v-container grid-list-xl>
                          <v-layout wrap justify-space-between>
                            <v-flex xs12 md12 lg12>
                              <p>
                                *Reseña breve de hechos (Modo, Tiempo, Lugar y
                                circunstancia) Excesivamente breves
                              </p>

                              <vue-editor
                                outline
                                :editorToolbar="customToolbar"
                                v-model="reseña"
                                label="*Reseña breve hechos"
                                :error-messages="
                                  errors.collect('form1.reseña breve')
                                "
                                v-validate="'required'"
                                data-vv-name="reseña breve"
                                required
                                :disabled="rp1"
                                data-vv-scope="form1"
                              >
                              </vue-editor>
                            </v-flex>
                          </v-layout>
                          <v-spacer></v-spacer>
                          <div class="text-xs-right">
                            <v-btn
                              color="primary"
                              @click.native="guardarentrevista"
                              >{{ btnTitle }}</v-btn
                            >
                          </div>
                        </v-container>
                      </v-card>
                    </v-form>
                  </v-stepper-content>

                  <v-stepper-step :complete="step > 2" step="2">
                    Delito(s).
                    <small>¿El hecho constituye un delito?</small>
                  </v-stepper-step>
                  <v-stepper-content step="2">
                    <v-card
                      color="grey lighten-5"
                      elevation="0"
                      class="mb-5"
                      height="auto"
                    >
                      <v-container grid-list-xl>
                        <v-layout wrap justify-space-between>
                          <v-flex xs12 md12 lg12>
                            <v-switch
                              v-model="switch1"
                              @change="desswitch2"
                              label="¿El hecho constituye un delito?:"
                              color="success"
                              hide-details
                            ></v-switch>

                            <br />
                            <br />
                            <p v-if="verFormatos == 0">
                              Canalizar a la instancia correspondiente o
                              entregar registro de atención.
                            </p>
                            <br />
                            <p v-if="verFormatos != 1">
                              Documento correspondiente:
                            </p>
                            <v-checkbox
                              v-model="checkbox1"
                              v-if="verFormatos == 0"
                              label="Caratula de registro de atención ciudadana (RAC):"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="checkbox2"
                              v-if="verFormatos == 0"
                              label="Carta de canalización:"
                            ></v-checkbox>

                            <v-autocomplete
                              name="dependencias de derivación"
                              :items="derivaciones"
                              v-model="idDDerivacion"
                              label="*Dependencias de canalización:"
                              v-validate="'required'"
                              v-show="checkbox2"
                              v-if="verFormatos == 0"
                              v-on:change="selectDependencia"
                              :error-messages="
                                errors.collect('dependencias de derivación')
                              "
                            >
                            </v-autocomplete>
                            <v-textarea
                              outline
                              name="anexo"
                              v-model="sintesis"
                              label="ANEXO:"
                              v-show="checkbox2"
                              v-if="verFormatos == 0"
                            >
                            </v-textarea>

                            <v-btn
                              class="ma-2"
                              outline=""
                              block
                              @click="obtenerformatos()"
                              v-if="verFormatos != 1"
                              color="primary"
                            >
                              <v-icon>description</v-icon>Generar documento(s)
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                    <div class="text-xs-right">
                      <v-btn flat @click.native="step = 1">Anterior</v-btn>
                      <v-btn v-if="activarCrearNuc" color="primary" @click="finalizar()"
                        >Finalizar</v-btn
                      >
                    </div>
                  </v-stepper-content>
                </v-stepper>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>

    <v-dialog v-model="ModalRAC" max-width="1000px">
      <v-card class="white" id="formatoRAC">
        <v-card-text>
          <div class="black--text">
            <header>
              <div id="logo1">
                <img v-bind:src="logo1" id="imagen1" />
              </div>
              <div id="logo2">
                <img v-bind:src="logo2" id="imagen2" />
              </div>
            </header>

            <br />

            <section>
              <br />
              <div id="datos">
                <p id="encabezado" class="black--text">
                  <b>REGISTRO DE ATENCION CIUDADANA</b>
                  <br />
                  <b>{{ u_dirSubPro }}</b>
                  <br />
                  <a class="texto"
                    >Registro de Atención Ciudadana (RAC):
                    <strong>{{ rac }}</strong></a
                  >
                  <br />
                  <a class="texto"
                    >Pachuca de Soto, Hidalgo;<strong> {{ fecha }}.</strong></a
                  >
                </p>
              </div>
            </section>

            <section>
              <div id="cuerpo">
                <div>
                  <br />
                  <b class="titulo">DATOS DEL COMPARECIENTE.</b>
                  <br />
                  <br />
                  <div class="texto">
                    <a><strong>Nombre:</strong> {{ nombre }}</a>
                    <br />
                    <a><strong>Domicilio:</strong> {{ direccion }}</a>
                    <br />
                    <a><strong>CURP:</strong> {{ curp }}</a>
                    <br />
                    <a
                      ><strong>Tipo de victima: </strong
                      ><span>{{ tvictima }}</span
                      ><strong> , Datos de contacto: </strong
                      ><span>{{ tel + ", " + email }}</span></a
                    >
                    <br />
                    <a
                      ><strong>Género: </strong><span>{{ genero }}</span
                      ><strong>, Sexo: </strong><span>{{ sexo }}</span
                      ><strong> , Edad: </strong><span>{{ edad }}</span
                      ><strong>, Estado familiar: </strong
                      ><span>{{ estadocivil }}</span
                      ><strong>, Nacionalidad: </strong
                      ><span>{{ nacionalidad }}</span></a
                    >
                    <br />
                    <a
                      ><strong>Religión: </strong><span>{{ religion }}</span
                      ><strong>, Ocupación: </strong><span>{{ ocupacion }}</span
                      ><strong>, Lengua: </strong><span>{{ lengua }}</span></a
                    >
                    <br />
                  </div>
                </div>
              </div>

              <div id="cuerpo">
                <div>
                  <br />
                  <b class="titulo">BREVE NARRACION DE LOS HECHOS.</b>
                  <br />
                  <br />
                  <p class="texto" v-html="reseña">{{ reseña }}</p>
                  <br />
                  <br />
                  <br />
                  <div class="titulo">
                    <b>COMPARECIENTE.</b>
                  </div>
                  <br />
                  <br />
                  <div class="titulo">
                    <b> {{ nombre }}</b>
                  </div>
                </div>
              </div>
              <footer>
                <div id="footer">
                  <p class="titulo">
                    <b>A T E N T A M E N T E.</b>
                    <br />
                    <br />
                    <br />
                    <b>{{ u_nombre }}</b>
                    <br />
                    <b>{{ u_puesto }}</b>
                  </p>
                </div>
              </footer>
            </section>
          </div>
        </v-card-text>
      </v-card>

      <div class="text-xs-right white">
        <v-btn @click="ocultarformatoRAC()" color="success darken-1" flat
          >Cancelar</v-btn
        >
        <v-btn @click="crearPDF_RAC()" color="success darken-1" flat
          >IMPRIMIR</v-btn
        >
      </div>
    </v-dialog>

    <v-dialog v-model="ModalServicioPericial" max-width="1000px">
      <v-card class="white" id="formatoSP">
        <v-card-text>
          <div class="black--text">
            <header>
              <div id="logo1">
                <img v-bind:src="logo1" id="imagen1" />
              </div>
              <div id="logo2">
                <img v-bind:src="logo2" id="imagen2" />
              </div>
            </header>

            <br />
            <section>
              <br />
              <div id="datos">
                <p id="encabezado" class="black--text">
                  <b>{{ u_dirSubPro }}</b>
                  <br />
                  <a class="texto"
                    >Registro de Atención Ciudadana (RAC): {{ rac }}</a
                  >
                  <br />
                  <a class="texto"
                    >Pachuca de Soto, Hidalgo;<strong> {{ fecha }}.</strong></a
                  >
                </p>
              </div>
            </section>
            <br />
            <section>
              <div id="cuerpo">
                <div>
                  <p class="titulo">
                    <b>{{ responsable }}</b>
                    <br />
                    <b>{{ nombreDirSub }}</b>
                  </p>
                  <br />
                  <b class="titulo">PRESENTE.</b>
                  <br />
                  <br />
                  <div class="texto" v-html="textolibre"></div>

                  <br />
                  <br />
                  <p class="texto">
                    Agradeciendo de antemano la atención brindada a mi petición.
                  </p>
                  <br />
                  <br />
                </div>
              </div>
            </section>
            <br />
            <br />
            <footer>
              <div id="footer">
                <br />
                <br />
                <p class="titulo">
                  <b>A T E N T A M E N T E.</b>
                  <br />
                  <br />
                  <br />
                  <b>{{ u_nombre }}</b>
                  <br />
                  <b>{{ u_puesto }}</b>
                </p>
              </div>
            </footer>
          </div>
        </v-card-text>
      </v-card>
      <div class="text-xs-right white">
        <v-btn @click="ocultarformatoSP()" color="success darken-1" flat
          >Cancelar</v-btn
        >
        <v-btn @click="crearPDF_SP()" color="success darken-1" flat
          >Guardar e Imprmir</v-btn
        >
      </div>
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
            <v-btn color="success" text @click.native="guardarcontencion()"
              >Generar solicitud</v-btn
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

    <v-dialog v-model="ModalDependenciaDerivacion" max-width="1000px">
      <v-card class="white" id="formatoDD">
        <v-card-text>
          <div class="black--text">
            <header>
              <div id="logo1">
                <img v-bind:src="logo1" id="imagen1" />
              </div>
              <div id="logo2">
                <img v-bind:src="logo2" id="imagen2" />
              </div>
            </header>

            <br />
            <section>
              <br />
              <div id="datos">
                <p id="encabezado" class="black--text">
                  <b>CARTA DE CANALIZACIÓN</b>
                  <br />
                  <b>{{ u_dirSubPro }}</b>
                  <br />
                  <a class="texto"
                    >Registro de Atención Ciudadana (RAC):
                    <strong>{{ rac }}</strong></a
                  >
                  <br />
                  <a class="texto"
                    >Pachuca de Soto, Hidalgo;<strong> {{ fecha }}.</strong></a
                  >
                </p>
              </div>
            </section>

            <section>
              <div id="cuerpo">
                <div>
                  <br />
                  <b class="titulo">DATOS DEL COMPARECIENTE.</b>
                  <br />
                  <br />
                  <div class="texto">
                    <a><strong>Nombre:</strong> {{ nombre }}</a>
                    <br />
                    <a><strong>Domicilio:</strong> {{ direccion }}</a>
                    <br />
                    <a><strong>CURP:</strong> {{ curp }}</a>
                    <br />
                    <a
                      ><strong>Tipo de victima: </strong
                      ><span>{{ tvictima }}</span
                      ><strong> , Datos de contacto: </strong
                      ><span>{{ tel + ", " + email }}</span></a
                    >
                    <br />
                    <a
                      ><strong>Género: </strong><span>{{ genero }}</span
                      ><strong>, Sexo: </strong><span>{{ sexo }}</span
                      ><strong> , Edad: </strong><span>{{ edad }}</span
                      ><strong>, Estado civil: </strong
                      ><span>{{ estadocivil }}</span
                      ><strong>, Nacionalidad: </strong
                      ><span>{{ nacionalidad }}</span></a
                    >
                    <br />
                    <a
                      ><strong>Religión: </strong><span>{{ religion }}</span
                      ><strong>, Ocupación: </strong><span>{{ ocupacion }}</span
                      ><strong>, Lengua: </strong><span>{{ lengua }}</span></a
                    >
                    <br />
                  </div>
                </div>
              </div>

              <div id="cuerpo">
                <div>
                  <br />
                  <b class="titulo">BREVE NARRACION DE LOS HECHOS.</b>
                  <br />
                  <br />
                  <p class="texto" v-html="reseña">{{ reseña }}</p>
                  <br />
                  <a class="texto"
                    ><strong>SE SUGIERE ACUDIR A: </strong
                    ><span
                      >{{
                        nombrederivacion + "ubicado en " + direccionderivacion
                      }}
                    </span>
                  </a>
                  <br />
                  <br />
                  <a class="texto"
                    ><strong>ANEXO: </strong><span>{{ sintesis }} </span>
                  </a>
                  <br />
                  <br />
                  <br />
                  <br />
                  <div class="titulo">
                    <b>COMPARECIENTE.</b>
                  </div>
                  <br />
                  <br />
                  <div class="titulo">
                    <b> {{ nombre }}</b>
                  </div>
                </div>
              </div>
              <footer>
                <div id="footer">
                  <p class="titulo">
                    <b>A T E N T A M E N T E.</b>
                    <br />
                    <br />
                    <br />
                    <b>{{ u_nombre }}</b>
                    <br />
                    <b>{{ u_puesto }}</b>
                  </p>
                </div>
              </footer>
            </section>
          </div>
        </v-card-text>
      </v-card>
      <div class="text-xs-right white">
        <v-btn @click="ocultarformatoDD()" color="success darken-1" flat
          >Cancelar</v-btn
        >
        <v-btn @click="crearPDF_DD()" color="success darken-1" flat
          >Imprmir</v-btn
        >
      </div>
    </v-dialog>

    <v-dialog
      v-model="modal_CaratulaRAC"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Canalización</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn color="success" text @click.native="crearPDF_DD()">
              Guardar e imprimir</v-btn
            >
            <v-btn icon @click="modal_CaratulaRAC = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <iframe
            id="iframepdf1"
            type="application/pdf"
            width="100%"
            height="835"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </v-card-text>
      </v-card>
    </v-dialog>
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
import { generarQRCodeBase64 } from './crearQRRac';

export default {
  components: {
    "vue2-editor": VueEditor,
    n401,
    n403,
  },
  data() {
    return {
      rp1: false,
      customToolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [
          "align",
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ color: [] }, { background: [] }],
      ],
      //-------Logos-----------------------------------------/
      logo1: "",
      logo2: "",
      //-----CLAIM------------------------------------------
      u_iddistrito: this.$store.state.usuario.iddistrito,
      u_distrito: this.$store.state.usuario.distrito,
      u_dirSubPro: this.$store.state.usuario.dirSubProc,
      u_idagencia: this.$store.state.usuario.idagencia,
      u_agencia: this.$store.state.usuario.agencia,
      u_idmoduloservicio: this.$store.state.usuario.idmoduloservicio,
      u_modulo: this.$store.state.usuario.modulo,
      u_idusuario: this.$store.state.usuario.idusuario,
      u_nombre: this.$store.state.usuario.usuario,
      u_clave: this.$store.state.usuario.clave,
      u_rol: this.$store.state.usuario.rol,
      u_puesto: this.$store.state.usuario.puesto,
      u_email: this.$store.state.usuario.email,
      //----------------------------------------------------
      showpage: true,
      e401: false,
      e403: false,
      dialog1: false,
      dialog2: false,

      switch1: false,
      switch2: false,

      step: 1,

      reseña: "",

      verFormatos: 0,

      checkbox1: false,
      checkbox2: false,

      //VALORES DEL USUARIO
      idturno: 0,
      turno: "",
      statusReAsignado: false,
      mesa: 2,
      connection: "",
      // VALORES DEL REGISTRO

      rAtencionId: 0,
      rHechoId: 0,
      personaId: 0,

      rac: "",
      idrac: "",
      ruta: "",
      fhreg: "",
      tvictima: "",
      curp: "",
      nombre: "",
      tel: "",
      email: "",
      tipopersona: "",
      medionotificacion: "",
      sexo: "",
      genero: "",
      fnacimiento: "",
      edad: "",
      estadocivil: "",
      nacionalidad: "",
      ocupacion: "",
      lengua: "",
      religion: "",
      discapacidad: "",
      parentesco: "",
      direccion: "",
      contencionvictima: false,
      numerooficio: "",
      numeromaximo: [],
      agencias: [],
      agencia: "",
      //
      idDDerivacion: "",
      nombrederivacion: "",
      direccionderivacion: "",

      dia: "",
      mes: "",
      año: "",
      hr: "",
      fecha: "",

      ModalRAC: 0,

      derivaciones: [],
      ModalDependenciaDerivacion: 0,
      sintesis: "",

      serviciospericiales: [],
      serviciopericialeId: "",
      sps: [],
      sp: "",

      aspid: "",
      nombreAgencia: "",
      nombreDirSub: "",
      responsable: "",
      nombreServicio: "",
      descripcion: "",
      requisitos: "",
      materia: "",
      textolibre: "",
      ModalServicioPericial: 0,
      modaldocumento: false,
      agenciainfo: [],

      nuc: "",
      requeridocontencion: "",
      sirequirio: false,
      idAgencia: "",

      modal_CaratulaRAC: false,
      alias: "",
      docIdentificacion: "",
      nivelEstudio: "",
      tipodiscapacidad: "",
      rBrevef: "",
      telefonoderivacion: "",
      contactodererivacion: "",
      tiposrec: [
        { text: "Médico", value: "Médico" },
        { text: "Psicológico", value: "Psicológico" },
      ],
      tiporec: "",
      textocontencion: "",
      texto: 'Vista Previa',
      qrCode: null,
      docCaratulaRac: 'Caratula de RAC',
      docDerivacion: 'Carta de canalizacion',
      vistaPreviaTF: true,

      activarCrearNuc:true
    };
  },
  computed: {
    btnTitle() {
      return this.rp1 === false ? "GUARDAR Y CONTINUAR" : "CONTINUAR";
    },
  } /*
    mounted: function () {
        this.$nextTick(function () {
            window.setInterval(() => {
                let me=this;  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header}; 
                this.$cat.get('api/Turnoes/NumerodeTurnos/' +  me.u_idagencia + '/' + me.u_idmoduloservicio,configuracion).then(function(response){
                    me.turnos=response.data;
                }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                }); 
            },8000);
        })
    },*/,

  created: function () {
    this.llamarturno();
    this.listarLogo();
    this.listarderivacion();
    this.informacionagencia();
    this.listarSP();

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
      (error) => {
        // Do something with response error
        return new Promise((resolve, reject) => {
          this.$store.commit("LOADER", false);
          throw error;
        });
      }
    );
  },

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
    close() {
      this.dialog1 = false;
      this.dialog2 = false;
    },
    listarrap() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("api/RAPs/Listar/" + me.rAtencionId, configuracion)
        .then(function (response) {
          me.personaId = response.data.personaId;
          me.curp = response.data.curp;
          me.nombre =
            response.data.nombre +
            " " +
            response.data.apellidoPaterno +
            " " +
            response.data.apellidoMaterno;
          me.tel = response.data.telefono1 + " , " + response.data.telefono2;
          me.email = response.data.correo;
          me.rac = response.data.rac;
          me.idrac = response.data.racId;
          me.fhreg = response.data.fechaHoraInicio;
          me.tvictima = response.data.clasificacionPersona;
          me.tipopersona = response.data.tipoPersona;
          me.sexo = response.data.sexo;
          me.genero = response.data.genero;
          me.fnacimiento = response.data.fechaNacimiento;
          me.estadocivil = response.data.estadoCivil;
          me.medionotificacion = response.data.medionotificacion;
          me.nacionalidad = response.data.nacionalidad;
          me.ocupacion = response.data.ocupacion;
          me.lengua = response.data.lengua;
          me.religion = response.data.religion;
          me.parentesco = response.data.parentesco;
          me.edad = response.data.edad;

          me.alias = response.data.alias;
          me.docIdentificacion = response.data.docIdentificacion;
          me.nivelEstudio = response.data.nivelEstudio;
          me.discapacidad = response.data.tipoDiscapacidad;

          me.listardireccionpersona();
          me.documentoIdentificacion();
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
    listarSP() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var sparrays = "";
      me.$conf
        .get(
          "api/SpPiLigaciones/ListarPertenecienteyGeneralSP/" +
            me.$store.state.keymodulo,
          configuracion
        )
        .then(function (response) {
          sparrays = response.data;
          sparrays.map(function (x) {
            me.sps.push({ text: x.dspn, value: x.dspId });
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
    listaragencias() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var agenciasarray = "";
      me.agencias = [];
      me.$conf
        .get("api/Agencias/ListarporDSP/" + me.sp.value, configuracion)
        .then(function (response) {
          agenciasarray = response.data;
          agenciasarray.map(function (x) {
            me.agencias.push({ text: x.nombre, value: x.idAgencia });
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
    listardireccionpersona() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("api/RAPs/ListarDP/" + me.personaId, configuracion)
        .then(function (response) {
          console.log(response.data);
          me.direccion =
            response.data.calle +
            " " +
            response.data.noint +
            " " +
            response.data.noext +
            " " +
            response.data.localidad +
            " " +
            response.data.municipio +
            " " +
            response.data.estado +
            " " +
            response.data.pais +
            " " +
            response.data.cp;
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
    ActualizarSi() {
      this.contencionvictima = true;
      this.sirequirio = true;
    },
    previsualizarpdf() {
      this.downloadPdf(this.u_nombre, this.u_puesto, this.u_agencia);
    },
    guardarsi() {
      this.guardarcontencion();
    },
    ActualizarNo() {
      this.contencionvictima = false;
      this.ActualizarMC();
    },
    ActualizarMC() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .put(
          "api/RAPs/ActualizarMC",
          {
            idRAtencion: me.rAtencionId,
            contencionVictima: me.contencionvictima,
          },
          configuracion
        )
        .then(function (response) {
          me.close();
          me.listarrap();
          me.$notify(
            "La información se actualizo correctamente !!!",
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
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar actualizar el registro!!!", "error");
          }
        });
    },
    guardarcontencion() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$confirm(
        "Esperando confirmación",
        "Estas seguro de  que deseas guardar información ",
        function () {
          axios
            .post(
              "api/ContencionPersonas/Crear",
              {
                RAtencionId: me.rAtencionId,
                QueRequirio: me.tiporec,
                NombrePersona: me.nombre,
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
              axios
                .put(
                  "api/RAPs/ActualizarMC",
                  {
                    idRAtencion: me.rAtencionId,
                    contencionVictima: me.contencionvictima,
                  },
                  configuracion
                )
                .then(function (response) {
                  me.close();
                  //me.listarrap();
                  me.mostrarpdf(me.u_nombre, me.u_puesto, me.u_agencia);
                  me.textocontencion = "";
                  me.tiporec = "";
                  me.modaldocumento = false;
                  me.$notify(
                    "La información se actualizo correctamente !!!",
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
                      "Error al intentar actualizar el registro!!!",
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
    documentoIdentificacion() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get("api/DocumentosPesonas/Listar/" + me.personaId, configuracion)
        .then(function (response) {
          me.ruta = response.data.ruta;
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
    llamarturno() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.rAtencionId = me.$store.state.ratencionid;
      me.dialog1 = true;
      me.listarrap();
    },
    detallepersona() {
      this.dialog2 = true;
    },
    listarServiciosPericiales() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var serviciospericialesArray = [];
      me.serviciospericiales = [];
      me.$conf
        .get("api/ASPs/ListarporIdagencia/" + me.agencia.value, configuracion)
        .then(function (response) {
          serviciospericialesArray = response.data;
          serviciospericialesArray.map(function (x) {
            me.serviciospericiales.push({
              text: x.nombreServicio,
              value: x.servicioPericialId,
              nodistrito: x.numeroDistrito,
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
    listarFiltroSP() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$conf
        .get(
          "api/ASPs/FiltrarStatusSP/" + me.serviciopericialeId.value,
          configuracion
        )
        .then(function (response) {
          console.log(response.data);
          me.aspid = response.data.idASP;
          me.nombreAgencia = response.data.nombreAgencia;
          me.nombreDirSub = response.data.nombreDirSub;
          me.responsable = response.data.responsable;
          me.nombreServicio = response.data.nombreServicio;
          me.descripcion = response.data.descripcion;
          me.requisitos = response.data.requisitos;
          me.materia = response.data.materia;
          me.obtenernumeromaximo();
          me.listarTL();
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
    obtenernumeromaximo() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get(
          "api/RDiligencias/ObtenernumeroMaximoporDistrito/" +
            me.serviciopericialeId.nodistrito,
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

    desswitch2() {
      if (this.switch1 == false) {
        this.switch2 = false;
        this.checkbox1 = false;
        this.checkbox2 = false;

        this.verFormatos = 0;
      } else {
        this.switch2 = false;
        this.checkbox1 = false;
        this.checkbox2 = false;

        this.verFormatos = 1;
      }
    },
    listarderivacion() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var depderivacionArray = [];
      this.$conf
        .get("api/DependeciasDerivacions/Listar", configuracion)
        .then(function (response) {
          //console.log(response.data);
          depderivacionArray = response.data;
          depderivacionArray.map(function (x) {
            me.derivaciones.push({ text: x.nombre, value: x.idDDerivacion });
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
    guardarentrevista() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.dia = moment().format("DD");
      me.mes = moment().format("MMMM");
      me.año = moment().format("YYYY");
      me.hr = moment().format("h:mm:ss a");
      me.fecha = me.dia + " de " + me.mes + " del " + me.año;
      if (me.rp1 == true) {
        me.step = 2;
      } else {
        if (me.rAtencionId == 0) {
          me.$notify(
            "No es posible guardar esta información ya que aun no llama a un turno",
            "error"
          );
        } else {
          me.$validator.validateAll("form1").then((result) => {
            if (result) {
              me.$confirm(
                "Esperando confirmación",
                "Estas seguro de  que deseas guardar información. Una vez realizada esta accion no prodra realizar cambios",
                function () {
                  axios
                    .post(
                      "api/RHechoes/CrearPI",
                      {
                        agenciaid: me.u_idagencia,
                        ratencionid: me.rAtencionId,
                        moduloServicioId: me.u_idmoduloservicio,
                        status: false,
                        rbreve: me.reseña,
                        fechaReporte: me.fecha,
                      },
                      configuracion
                    )
                    .then(function (response) {
                      //-------------------------------------------

                      axios
                        .post(
                          "api/Historialcarpeta/Crear",
                          {
                            RHechoId: response.data.idRH,
                            Detalle: "Inicio de la investigación",
                            Modulo: me.u_modulo,
                            Agencia: me.u_agencia,
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

                      //-------------------------------------------------

                      //if (response.statusText == "OK"){
                      me.rp1 = true;
                      console.log("respuesta:", response.data);
                      me.rHechoId = response.data.idRH;
                      //}
                      me.$notify(
                        "La información se guardo correctamente !!!",
                        "success"
                      );
                      me.step = 2;
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
        }
      }
    },
    eliminarSP(arr, item) {
      var i = arr.indexOf(item);
      if (i !== -1) {
        arr.splice(i, 1);
      }
    },
    contencionfunc() {
      let me = this;
      if (me.rAtencionId == 0) me.$notify("Llame un turno primero", "error");
      else me.dialog1 = true;
    },
    imprimirSP() {
      let me = this;
      me.dia = moment().format("DD");
      me.mes = moment().format("MMMM");
      me.año = moment().format("YYYY");
      me.hr = moment().format("h:mm:ss a");
      me.fecha = me.dia + " de " + me.mes + " del " + me.año;

      if (me.rAtencionId == 0) {
        me.$notify(
          "No es posible guardar esta información ya que aun no llama a un turno",
          "error"
        );
      } else {
        me.$validator.validateAll("form2").then((result) => {
          if (result) {
            me.downloadPdf(me.u_nombre, me.u_puesto, me.u_agencia);
          }
        });
      }
    },
    finalizar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.activarCrearNuc = false;

      if (me.switch1 == false && me.switch2 == false) {
        //**************************************************** */
        //ACTUALIZAMOS LA HORA DE CIERRE

        axios
          .put(
            "api/RAtencions/AHCierre",
            {
              idratencion: me.rAtencionId,
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
        //**************************************************** */

        me.$router.push("./Listaregistros");
      }

      if (me.switch1 == true || me.switch2 == true) {
        axios
          .post(
            "api/Nucs/GenerarNuc",
            {
              distritoId: me.u_iddistrito,
              agenciaId: me.u_idagencia,
            },
            configuracion
          )
          .then(function (response) {
            me.$store.state.rhechoid = me.rHechoId;
            me.$store.state.nuc = response.data.nuc;
            var descripcionRegTabI =
              "Registro de nueva carpeta " + response.data.nuc;

            axios
              .put(
                "api/RHechoes/ActualizarNUC",
                {
                  idrhecho: me.rHechoId,
                  ratencionid: me.rAtencionId,
                  nucid: response.data.idnuc,
                },
                configuracion
              )
              .then(function (response) {
                axios
                  .post(
                    "api/Historialcarpeta/Crear",
                    {
                      RHechoId: me.rHechoId,
                      Detalle: "El hecho constituyo a un delito",
                      Modulo: me.u_modulo,
                      Agencia: me.u_agencia,
                      DetalleEtapa: "Creacion de NUC en la atencion",
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
                    me.crearRegistroTableroI(descripcionRegTabI);
                    me.$router.push("./entrevistainicial");
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
    selectDependencia() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$conf
        .get(
          "api/DependeciasDerivacions/ListarPorDependencia/" + me.idDDerivacion,
          configuracion
        )
        .then(function (response) {
          me.nombrederivacion = response.data.nombre;
          me.direccionderivacion = response.data.direccion;
          me.telefonoderivacion = response.data.telefono;
          me.contactodererivacion = response.data.contacto;
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
    crearPDF_SP() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$confirm(
        "Esperando confirmación",
        "Estas seguro de  que deseas guardar información e imprimir el documento. Una vez realizada esta accion no prodra realizar cambios",
        function () {
          me.numeromaximo.numeroMaximo++;

          axios
            .post(
              "api/RDiligencias/CrearPI",
              {
                rHechoId: me.rHechoId,
                fechasolicitud: me.fecha,
                dirigidoa: me.responsable,
                dirsubpro: me.nombreDirSub,
                emitidopor: me.u_nombre,
                udirsubpro: me.u_dirSubPro,
                upuesto: me.u_puesto,
                statusrespuesta: "Solicitado",
                servicio: me.nombreServicio,
                especificaciones: me.textolibre,
                aspid: me.aspid,
                prioridad: "Urgente",
                modulo: me.u_modulo,
                agencia: me.u_agencia,
                respuestas: " ",
                conIndicio: false,
                nuc: " ",
                textofinal: me.textolibre,
                numeroOficio: me.numerooficio,
                NumeroDistrito: me.serviciopericialeId.nodistrito,
                NodeSolicitud: me.numeromaximo.numeroMaximo,
                DSPDEstino: me.sp.value,
                DistritoId: me.u_iddistrito,
              },
              configuracion
            )
            .then(function (response) {
              //***************************************************** */

              me.$notify(
                "La información se guardo correctamente !!!",
                "success"
              );

              axios
                .post(
                  "api/ContencionPersonas/Crear",
                  {
                    RAtencionId: me.rAtencionId,
                    QueRequirio: me.nombreServicio,
                    NombrePersona: me.nombre,
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

                  axios
                    .put(
                      "api/RAPs/ActualizarMC",
                      {
                        idRAtencion: me.rAtencionId,
                        contencionVictima: me.contencionvictima,
                      },
                      configuracion
                    )
                    .then(function (response) {
                      me.$notify(
                        "La información se actualizo correctamente !!!",
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
                          "Error al intentar actualizar el registro!!!",
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
                      "Error al intentar crear el  registro!!!",
                      "error"
                    );
                  }
                });

              me.ModalServicioPericial = 0;
              me.mostrarpdf(me.u_nombre, me.u_puesto, me.u_agencia);
              me.modaldocumento = false;
              //***************************************************** */
              me.textolibre = "";
              me.serviciopericialeId = "";
              me.textolibre = "";
              me.nombreDirSub = "";
              me.nombreAgencia = "";
              me.descripcion = "";
              me.requisitos = "";
              me.numerooficio = "";
              me.numeromaximo = "";
              me.agencia = "";
              me.sp = "";
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
    crearPDF_DD() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$confirm(
        "Esperando confirmación",
        "Estas seguro de  que deseas guardar información e imprimir el documento. Una vez realizada esta accion no prodra realizar cambios",
        function () {
          axios
            .post(
              "api/RDDerivacions/CrearDD",
              {
                rHechoId: me.rHechoId,
                dDerivacionId: me.idDDerivacion,
                espesificaciones: me.sintesis,
                fechaDerivacion: me.fecha,
                uDistrito: me.u_distrito,
                uDirSubPro: me.u_dirSubPro,
                uAgencia: me.u_agencia,
                uNombre: me.u_nombre,
                uPuesto: me.u_puesto,
              },
              configuracion
            )
            .then(function (response) {

              var idderivacion = response.data.idderivacion;
              //**************************************************** */
              me.$notify(
                "La información se guardo correctamente !!!",
                "success"
              );
              me.vistaPreviaTF = false;
              var now = moment();
              me.generarQR(me.docDerivacion,me.rac,me.u_nombre,now,idderivacion);
              me.rBrevef = response.data.rBreve;

              setTimeout(() => 
              {
                me.sintesis = "";
                me.idDDerivacion = "";
                me.modal_CaratulaRAC = false;
                me.imprimirpdf_DependeciaDerivacion();
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
                me.$notify("Error al intentar crear el  registro!!!", "error");
              }
            });
        },
        function () {
          alertify.warning("Verifica la información");
        }
      ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
    },

    listarTL() {
      let me = this;
      var textoal =
        "<p>Por medio de la presente, solicito tenga a bien asignar perito(a) en materia de <strong>" +
        me.materia +
        "</strong>, a efecto de que se sirva realizar <strong>" +
        me.nombreServicio +
        "</strong>, a <strong>" +
        me.nombre +
        ".</strong><p><br></p>Lo anterior con fundamento en los artículos 131, fracción III, 272, 273, 368 y 369 del Código Nacional del Procedimientos Penales.";
      me.textolibre =
        "<p>PRESENTE.</p> <p><br></p>" +
        "<p><br></p>" +
        textoal +
        "<p><br></p><p><br></p><p><br></p>" +
        "<p>Agradeciendo de antemano la atención brindada a mi petición.</p>";
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
    mostrarpdf(nombre, puesto, agencia) {
      let me = this;
      var dd = me.downloadPdf();
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }

      var dd = me.downloadPdf(nombre, puesto, agencia);
      var doc = pdfMake.createPdf(dd);
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
      var nuc = this.nuc;
      var fecha = this.generarfecha();
      //***************************************************************************** */
      var html = htmlToPdfmake(this.textocontencion);
      //***************************************************************************** */
      var agenciainfodr = this.agenciainfo["direccion"];
      var agenciainfotel = this.agenciainfo["telefono"];

      //***************************************************************************** */
      var dd = {
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
            //{
            //    image: logo2,
            //    width: 50,
            //    absolutePosition: {x: 495, y: 30},
            //},
          ];
        },

        content: [
          {
            text: u_dirSubPro + "\n" + u_agencia,
            style: "Adscripcion",
            absolutePosition: { x: 85, y: 95 },
          },

          {
            text: this.u_distrito + ", Hidalgo a " + fecha + "\n\n\n",
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
        },
      };

      var doc = pdfMake.createPdf(dd);
      var f = document.getElementById("iframepdf");
      var callback = function (url) {
        f.setAttribute("src", url);
      };
      doc.getDataUrl(callback, doc);
      this.modaldocumento = true;
      return dd;
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
    listarrHecho() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get(
          "api/RHechoes/ListarTodosRegistros/" + me.rAtencionId,
          configuracion
        )
        .then(function (response) {

          me.vistaPreviaTF = false;
          var now = moment();
          me.generarQR(me.docCaratulaRac,me.rac,me.u_nombre,now,me.idrac);
          me.rBrevef = response.data.rBreve;

          setTimeout(() => 
          {
            me.imprimirpdf_CaratulaRAC();
          }, 1000);
          
        });
    },
    listarrHecho2() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      axios
        .get(
          "api/RHechoes/ListarTodosRegistros/" + me.rAtencionId,
          configuracion
        )
        .then(function (response) {
          me.rBrevef = response.data.rBreve;
          me.mostrarpdf_DependeciaDerivacion();
        });
    },
    limpiar()
    {
      this.qrCode = null;
      this.vistaPreviaTF = true;
    },
    imprimirpdf_CaratulaRAC() 
    {
      let me = this;

      var dd = me.crearPdf_CaratulaRAC();

      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
      var doc = pdfMake.createPdf(dd).print();
      setTimeout(() => 
      {
        me.limpiar();
      }, 1000);
    },
    crearPdf_CaratulaRAC() {
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
      var agenciainfodr = this.agenciainfo["direccion"];
      var agenciainfotel = this.agenciainfo["telefono"];
      var u_dirSubPro = this.u_dirSubPro;
      var u_agencia = this.u_agencia;
      var rac = this.rac;
      //***************************************************************************** */
      let me = this;

      var htmltexto = htmlToPdfmake(this.rBrevef);
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
            text: u_dirSubPro + "\n" + u_agencia,
            style: "Adscripcion",
            absolutePosition: { x: 85, y: 95 },
          },
          {
            text: "Registro de atención ciudadana (RAC): " + rac + "\n\n",
            style: "Titulo",
            alignment: "right",
            margin: [0, 40, 72, 0],
            absolutePosition: { x: 85, y: 150 },
          },

          {
            text:
              this.u_distrito +
              ", Hidalgo a " +
              this.fecha +
              "\n\n\n\n\n\n\n\n",
            style: "Fecha",
            alignment: "right",
          },
          {
            text: "REGISTRO DE ATENCIÓN CIUDADANA\n\n\n",
            style: "Titulo",
          },
          {
            style: "table",
            table: {
              headerRows: 1,
              widths: ["*", "auto", "auto"],
              body: [
                [
                  {
                    colSpan: 3,
                    text: "DATOS DEL COMPARECIENTE",
                    fillColor: "#eeeeee",
                    style: "Titulo",
                  },
                  "",
                  "",
                ],
                [
                  {
                    style: "Texto",
                    text:
                      "Nombre" +
                      "\n\n" +
                      (this.nombre != "" ? this.nombre : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Alias:" +
                      "\n\n" +
                      (this.alias != "" ? this.alias : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Clasificación de persona:" +
                      "\n\n" +
                      (this.tvictima != "" ? this.tvictima : "NA"),
                  },
                ],
                [
                  {
                    style: "Texto",
                    text:
                      "Tipo persona:" +
                      "\n\n" +
                      (this.tipopersona != "" ? this.tipopersona : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "CURP:" + "\n\n" + (this.curp != "0" ? this.curp : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Documento de identificación:" +
                      "\n\n" +
                      (this.docIdentificacion != ""
                        ? this.docIdentificacion
                        : "NA"),
                  },
                ],
                [
                  {
                    style: "Texto",
                    text:
                      "Nacionalidad:" +
                      "\n\n" +
                      (this.nacionalidad != "" ? this.nacionalidad : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Teléfono(s):" +
                      "\n\n" +
                      (this.tel != "" ? this.tel : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Correo electrónico:" +
                      "\n\n" +
                      (this.email != "" ? this.email : "NA"),
                  },
                ],
                [
                  {
                    colSpan: 3,
                    text: "Dirección:" + "\n\n" + this.direccion,
                    style: "Texto",
                  },
                  "",
                ],
                [
                  {
                    style: "Texto",
                    text:
                      "Género:" +
                      "\n\n" +
                      (this.genero != "" ? this.genero : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Sexo" + "\n\n" + (this.sexo != "" ? this.sexo : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Edad:" + "\n\n" + (this.edad != 0 ? this.edad : "NA"),
                  },
                ],
                [
                  {
                    style: "Texto",
                    text:
                      "Autoriza medio notificación:" +
                      "\n\n" +
                      (this.medionotificacion != ""
                        ? this.medionotificacion
                        : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Ocupación:" +
                      "\n\n" +
                      (this.ocupacion != "" ? this.ocupacion : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Nivel estudios:" +
                      "\n\n" +
                      (this.nivelEstudio != "" ? this.nivelEstudio : "NA"),
                  },
                ],
                [
                  {
                    style: "Texto",
                    text:
                      "Religión:" +
                      "\n\n" +
                      (this.religion != "" ? this.religion : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Idioma  o lengua que habla:" +
                      "\n\n" +
                      (this.lengua != "" ? this.lengua : "NA"),
                  },
                  {
                    style: "Texto",
                    text:
                      "Estado civil:" +
                      "\n\n" +
                      (this.estadocivil != "" ? this.estadocivil : "NA"),
                  },
                ],
                [
                  {
                    colSpan: 3,
                    text:
                      "Tiene alguna discapaciadad:" +
                      "\n\n" +
                      (this.discapacidad != "" ? this.discapacidad : "NA"),
                    style: "Texto",
                  },
                  "",
                ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return i === 0 || i === node.table.body.length
                  ? "black"
                  : "gray";
              },
              vLineColor: function (i, node) {
                return i === 0 || i === node.table.widths.length
                  ? "black"
                  : "gray";
              },
            },
          },
          {
            text: "\n\n\nRESEÑA BREVE: \n\n\n",
            style: "Texto",
          },
          {
            text: htmltexto,
            style: "Texto",
          },
          {
            text: "\n\n\n\n\nCOMPARECIENTE\n\n" + this.nombre,
            style: "DePara",
          },
          {
            text: "\n\n\n\n\n" + "A T E N T A M E N T E" + "\n\n\n\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: this.u_nombre + "\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: this.u_puesto + "\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: this.u_agencia + "\n\n",
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
    mostrarpdf_DependeciaDerivacion() {
      let me = this;
      
      var dd = me.crearPdf_DependeciaDerivacion();
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
      var doc = pdfMake.createPdf(dd);
      var f = document.getElementById("iframepdf1");
      var callback = function (url) {
        f.setAttribute("src", url);
      };
      doc.getDataUrl(callback, doc);
      me.modal_CaratulaRAC = true;
    },
    imprimirpdf_DependeciaDerivacion() 
    {
      let me = this;

      var dd = me.crearPdf_DependeciaDerivacion();

      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
      var doc = pdfMake.createPdf(dd).print();

      setTimeout(() => 
      {
        me.limpiar();
      }, 1000);
      
    },
    crearPdf_DependeciaDerivacion() {
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
      var agenciainfodr = this.agenciainfo["direccion"];
      var agenciainfotel = this.agenciainfo["telefono"];

      //***************************************************************************** */
      let me  = this;

      var htmltexto = htmlToPdfmake(this.rBrevef);
      var especificaciones = htmlToPdfmake(this.sintesis);

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
            text: u_dirSubPro + "\n" + u_agencia,
            style: "Adscripcion",
            absolutePosition: { x: 85, y: 95 },
          },

          {
            text:
              this.u_distrito +
              ", Hidalgo a " +
              this.fecha +
              "\n\n\n\n\n\n\n\n",
            style: "Fecha",
            alignment: "right",
          },
          {
            text:
              "Registro de atención ciudadana (RAC): " + this.rac + "\n\n\n",
            style: "Titulo",
          },

          {
            text: "\nCARTA DE CANALIZACIÓN\n\n",
            style: "Titulo",
          },

          {
            style: "table",
            table: {
              headerRows: 1,
              widths: ["*", "auto", "auto"],
              body: [
                [
                  {
                    colSpan: 3,
                    text: "DATOS DEL COMPARECIENTE",
                    fillColor: "#eeeeee",
                    style: "Titulo",
                  },
                  "",
                  "",
                ],
                [
                  { style: "Texto", text: "Nombre" + "\n\n" + this.nombre },
                  { style: "Texto", text: "Alias:" + "\n\n" + this.alias },
                  {
                    style: "Texto",
                    text: "Clasificación de persona:" + "\n\n" + this.tvictima,
                  },
                ],
                [
                  {
                    style: "Texto",
                    text: "Tipo persona:" + "\n\n" + this.tipopersona,
                  },
                  { style: "Texto", text: "CURP:" + "\n\n" + this.curp },
                  {
                    style: "Texto",
                    text:
                      "Documento de identificación:" +
                      "\n\n" +
                      this.docIdentificacion,
                  },
                ],
                [
                  {
                    style: "Texto",
                    text: "Nacionalidad:" + "\n\n" + this.nacionalidad,
                  },
                  { style: "Texto", text: "Teléfono(s):" + "\n\n" + this.tel },
                  {
                    style: "Texto",
                    text: "Correo electrónico:" + "\n\n" + this.email,
                  },
                ],
                [
                  {
                    colSpan: 3,
                    text: "Dirección:" + "\n\n" + this.direccion,
                    style: "Texto",
                  },
                  "",
                ],
                [
                  { style: "Texto", text: "Género:" + "\n\n" + this.genero },
                  { style: "Texto", text: "Sexo" + "\n\n" + this.sexo },
                  { style: "Texto", text: "Edad:" + "\n\n" + this.edad },
                ],
                [
                  {
                    style: "Texto",
                    text:
                      "Autoriza medio notificación:" +
                      "\n\n" +
                      this.medionotificacion,
                  },
                  {
                    style: "Texto",
                    text: "Ocupación:" + "\n\n" + this.ocupacion,
                  },
                  {
                    style: "Texto",
                    text: "Nivel estudios:" + "\n\n" + this.nivelEstudio,
                  },
                ],
                [
                  {
                    style: "Texto",
                    text: "Religión:" + "\n\n" + this.religion,
                  },
                  {
                    style: "Texto",
                    text: "Idioma  o lengua que habla:" + "\n\n" + this.lengua,
                  },
                  {
                    style: "Texto",
                    text: "Estado civil:" + "\n\n" + this.estadocivil,
                  },
                ],
                [
                  {
                    colSpan: 3,
                    text:
                      "Tiene alguna discapacidad:" +
                      "\n\n" +
                      this.tipodiscapacidad,
                    style: "Texto",
                  },
                  "",
                ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return i === 0 || i === node.table.body.length
                  ? "black"
                  : "gray";
              },
              vLineColor: function (i, node) {
                return i === 0 || i === node.table.widths.length
                  ? "black"
                  : "gray";
              },
            },
          },
          {
            text: "\n\nRESEÑA BREVE: \n\n\n",
            style: "Texto",
          },
          {
            text: htmltexto,
            style: "Texto",
          },
          {
            text: "\n\n\nSE SUGIERE ACUDIR A: \n\n",
            style: "Texto",
          },
          {
            ul: [
              "Dependecia: " + this.nombrederivacion,
              "Contacto:" + this.contactodererivacion,
              "Teléfono:" + this.telefonoderivacion,
              "Dirección: " + this.direccionderivacion,
            ],
            style: "Texto",
          },
          {
            text: "\n\n\nANEXO: \n\n",
            style: "Texto",
          },
          {
            text: especificaciones,
            style: "Texto",
          },
          {
            text: "\n\n\n\nCOMPARECIENTE\n\n" + this.nombre,
            style: "DePara",
          },
          {
            text: "\n\n\n\n\n" + "A T E N T A M E N T E" + "\n\n\n\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: this.u_nombre + "\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: this.u_puesto + "\n\n",
            alignment: "justify",
            style: "DePara",
          },
          {
            text: this.u_agencia + "\n\n",
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
    obtenerformatos() 
    {
      let me = this;
      me.fecha =
        moment().format("DD") +
        " de " +
        moment().format("MMMM") +
        " del " +
        moment().format("YYYY");
      if (this.checkbox1 == true) {
        this.listarrHecho();
      }
      if (this.checkbox2 == true) {
        this.listarrHecho2();
      }
    },
    ocultarformatoRAC() {
      this.ModalRAC = 0;
    },
    ocultarformatoSP() {
      this.ModalServicioPericial = 0;
    },
    ocultarformatoDD() {
      this.ModalDependenciaDerivacion = 0;
    },
    ocultarformatoAbstencionI() {
      this.ModalAbstencionI = 0;
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
  margin-top: 100;
  text-align: right;
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
</style>
