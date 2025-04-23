<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular">Vehiculos</v-toolbar-title>
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
              @click="comprobarInfo()"
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
        :items="vehiculos"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.usuario }}</td>
          <td>{{ props.item.modulo }}</td>
          <td>{{ props.item.estadov }}</td>
          <td>{{ props.item.marca }}</td>
          <td>{{ props.item.tipo }}</td>
          <td>{{ props.item.modelo }}</td>
          <td>{{ props.item.serie }}</td>
          <td>{{ props.item.placas }}</td>
          <td>{{ props.item.color }}</td>
          <td>{{ props.item.ano }}</td>

          <td class="">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2" v-on="on" @click="edititem(props.item)">
                  edit
                </v-icon>
              </template>
              <span>Editar registro </span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2" v-on="on" @click="loadarchive(props.item)">
                  publish
                </v-icon>
              </template>
              <span>Subir Archivo</span>
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
              <span>Imprimir </span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2"
                  v-on="on"
                  @click="consultararchivo(props.item)"
                >
                  pageview
                </v-icon>
              </template>
              <span>Consultar Archivos</span>
            </v-tooltip>
            <!-- Se agrego boton para la devolucion de vehiculo -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2"
                  v-on="on"
                  @click="devolverVehiculo(props.item)"
                >
                sync
                </v-icon>
              </template>
              <span>Devolucion de vehiculo</span>
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
              <v-btn color="success" text @click="pdfcrear()"
                >Vista previa</v-btn
              >
              <v-btn icon @click="dialogo = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-card-text>
            <v-form ref="form" data-vv-scope="dialogo1">
              <br />
              <br />

              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex class="espaciado" xs6 sm6 md3 lg3>
                    <v-autocomplete
                      name="estado"
                      :items="estados"
                      v-model="estadov"
                      return-object
                      label="Estado:"
                    >
                    </v-autocomplete>
                  </v-flex>

                  <v-flex class="espaciado" xs6 sm6 md3 lg3>
                    <v-switch
                      v-if="estadov.value2 == 2"
                      color="success"
                      v-model="estadorobado"
                      :label="`Estado Robado: ${textorobado}`"
                    ></v-switch>
                  </v-flex>

                  <v-flex class="espaciado" xs6 sm6 md3 lg3>
                    <v-switch
                      v-if="estadov.value2 == 2"
                      color="success"
                      v-model="recuperado"
                      :label="`Decomisado: ${textosino}`"
                    ></v-switch>
                  </v-flex>

                  <v-flex class="espaciado" xs6 sm6 md3 lg3>
                    <v-switch
                      v-if="estadov.value2 == 2 && recuperado"
                      color="success"
                      v-model="devuelto"
                      :label="`Devuelto: ${textosino2}`"
                    ></v-switch>
                  </v-flex>

                  <v-flex class="espaciado" xs12 sm12 md6 lg6>
                    <v-autocomplete
                      name="marca"
                      :items="marcas"
                      v-model="marca"
                      return-object
                      @change="listarModelos()"
                      label="Marca:"
                    >
                    </v-autocomplete>

                    <v-autocomplete
                      name="modelo"
                      :items="modelos"
                      v-model="modelo"
                      label="Submarca:"
                      v-if="swModelo == false"
                    >
                    </v-autocomplete>
                    <v-switch
                      v-model="swModelo"
                      :label="'Submarca no encontrada en catálogo'"
                      color="success"
                      hide-details
                    ></v-switch>

                    <v-text-field
                      v-model="modelo"
                      name="modelo"
                      label="Submarca:"
                      v-if="swModelo == true"
                    >
                    </v-text-field>

                    <v-autocomplete
                      name="tipo"
                      :items="tipos"
                      v-model="tipo"
                      data-vv-scope="dialogo1"
                      v-validate="'required'"
                      label="*Tipo:"
                      :error-messages="errors.collect('dialogo1.tipo')"
                    >
                    </v-autocomplete>

                    <v-text-field name="serie" label="Serie:" v-model="serie">
                    </v-text-field>
                    <v-autocomplete
                      name="delito"
                      :items="delitos"
                      v-model="delito"
                      data-vv-scope="dialogo1"
                      v-validate="'required'"
                      label="*Delito:"
                      return-object
                      :error-messages="errors.collect('dialogo1.delito')"
                    >
                    </v-autocomplete>

                    <v-text-field
                      name="propietario"
                      v-model="propietario"
                      label="*Propietario:"
                    >
                    </v-text-field>

                    <v-text-field
                      name="número de oficio"
                      label="*Número de oficio:"
                      v-model="numerooficio"
                      v-validate="robagurado"
                      data-vv-scope="dialogo1"
                      v-if="editedIndex == -1"
                      :error-messages="
                        errors.collect('dialogo1.número de oficio')
                      "
                    >
                    </v-text-field>
                  </v-flex>

                  <v-flex class="espaciado" xs12 sm12 md6 lg6>
                    <v-text-field
                      v-if="
                        estadov.value2 == 2 && devuelto == false && recuperado
                      "
                      name="lugar"
                      label="Lugar de depósito:"
                      v-model="lugardeposito"
                    >
                    </v-text-field>

                    <v-autocomplete
                      v-if="estadov.value2 == 2 && devuelto && recuperado"
                      name="defodep"
                      :items="definitivaodep"
                      v-model="defdep"
                      return-object
                      label="Status Vehiculo:"
                    >
                    </v-autocomplete>

                    <v-text-field
                      name="placa"
                      label="*Placas:"
                      v-model="placa"
                      data-vv-scope="dialogo1"
                      v-validate="robagurado"
                      :error-messages="errors.collect('dialogo1.placa')"
                    >
                    </v-text-field>

                    <v-autocomplete
                      name="color"
                      :items="colores"
                      v-model="color"
                      data-vv-scope="dialogo1"
                      v-validate="robagurado"
                      attach
                      chips
                      deletable-chips
                      multiple
                      return-object
                      label="*Color:"
                      @change="limiteColor"
                      :error-messages="errors.collect('dialogo1.color')"
                    >
                    </v-autocomplete>

                    <v-autocomplete
                      name="año"
                      :items="anos"
                      v-model="ano"
                      data-vv-scope="dialogo1"
                      v-validate="robagurado"
                      label="*Modelo:"
                      :error-messages="errors.collect('dialogo1.año')"
                    >
                    </v-autocomplete>

                    <v-text-field
                      name="número de serie de motor"
                      label="Número de serie de motor:"
                      v-model="motorserie"
                    >
                    </v-text-field>

                    <v-text-field
                      name="recepcion"
                      label="Fecha de Recepción:"
                      v-model="recepcion"
                      v-validate="'date_format:dd/MM/yyyy'"
                      :error-messages="errors.collect('dialogo1.recepcion')"
                    >
                    </v-text-field>

                    <v-autocomplete
                      name="denunciante"
                      :items="denunciantes"
                      v-model="denunciante"
                      v-validate="'required'"
                      label="*Denunciante:"
                      data-vv-scope="dialogo1"
                      return-object
                      @change="listardireccionpersonal()"
                      :error-messages="errors.collect('dialogo1.denunciante')"
                    >
                    </v-autocomplete>

                    <v-text-field
                      name="tipo de servicio"
                      label="Tipo de servicio:"
                      v-model="tiposervicio"
                    >
                    </v-text-field>
                  </v-flex>

                  <v-flex class="espaciado" xs12 sm12 md12 lg12>
                    <v-text-field
                      name="ubicacion"
                      label="*Ubicación:"
                      v-model="ubicacion"
                      data-vv-scope="dialogo1"
                      v-validate="robagurado"
                      :error-messages="errors.collect('dialogo1.ubicacion')"
                    >
                    </v-text-field>
                  </v-flex>

                  <v-flex class="espaciado" xs12 sm12 md12 lg12>
                    <v-card elevation="0">
                      <v-card-title>
                        <h3>Señas Particulares</h3>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-form data-vv-scope="form1">
                          <vue-editor
                            name="señas particulares"
                            v-model="senasparticulares"
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

          <v-divider></v-divider>
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
            ></iframe>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="modaldocumentoD"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Documento.</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn color="success" text @click.native="guardarDevolucion()"
                >Guardar devolucion</v-btn
              >
              <v-btn icon @click="modaldocumentoD = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <iframe
              id="iframepdf2"
              type="application/pdf"
              width="100%"
              height="835"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogarchivo" max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">add</v-icon>
            </v-avatar>

            <v-toolbar-title class="subheading">Subir archivo</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" data-vv-scope="dialogodocs">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-card>
                      <v-container fluid grid-list-md>
                        <v-layout row wrap>
                          <v-flex class="text-md-center">
                            <img
                              :src="imageUrl"
                              height="250px"
                              v-if="imageUrl"
                            />
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>

                    <v-text-field
                      name="imagen"
                      label="Selecciona la imagen del documento de identificacion"
                      @click="pickFile"
                      v-model="imageName"
                      prepend-icon="attach_file"
                      data-vv-scope="dialogodocs"
                      :error-messages="errors.collect('dialogodocs.imagen')"
                    ></v-text-field>

                    <input
                      type="file"
                      style="display: none"
                      ref="image"
                      accept="image/*"
                      @change="onFilePicked"
                    />

                    <v-autocomplete
                      name="tipo de archivo"
                      :items="tiposdocumentos"
                      v-model="tiposdocumento"
                      return-object
                      data-vv-scope="dialogodocs"
                      v-validate="'required'"
                      label="*Tipo de archivo:"
                      :error-messages="
                        errors.collect('dialogodocs.tipo de archivo')
                      "
                    >
                    </v-autocomplete>

                    <v-text-field
                      name="descripcíon de documento"
                      label="*Descripcíon del documento"
                      v-model="descripciondocumento"
                      v-validate="'required'"
                      data-vv-scope="dialogodocs"
                      :error-messages="
                        errors.collect('dialogodocs.descripcíon de documento')
                      "
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn @click.native="dialogarchivo = false">Cancelar</v-btn>
                <v-btn @click="guardarArchivo()" class="success">Guardar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogpictures" max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">assignment</v-icon>
            </v-avatar>

            <v-toolbar-title class="subheading"
              >Lista de archivos</v-toolbar-title
            >
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" data-vv-scope="dialogodetalle">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-data-table
                      :headers="headersar"
                      :items="archivos"
                      :search="searchar"
                      :rows-per-page-items="rowsPerPageItems"
                      :pagination.sync="pagination"
                    >
                      <template slot="items" class="white" slot-scope="props">
                        <td>{{ props.item.tipoDocumento }}</td>
                        <td class="justify-center layout px-0">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-icon
                                class="mr-2"
                                v-on="on"
                                @click="verimagen(props.item)"
                              >
                                visibility
                              </v-icon>
                            </template>
                            <span>Ver Imagen</span>
                          </v-tooltip>
                        </td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click.native="dialogpictures = false">Cerrar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogimagen" max-width="1000px">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">assignment</v-icon>
            </v-avatar>

            <v-toolbar-title class="subheading">Imagen</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-card auto-grow elevation="0">
                      <v-card-text>
                        <v-list three-line>
                          <p class="text-lg-center font-weight-bold">
                            <a>Información detallada del Documento.</a>
                          </p>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="success">subject</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>
                                <p class="body-4 font-weight-bold">
                                  <a>Descripción:</a>
                                </p>
                              </v-list-tile-title>
                              <v-list-tile-sub-title>
                                <p
                                  color="accent"
                                  class="caption font-weight-regular"
                                >
                                  <a>{{ descrip }}</a>
                                </p>
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-action>
                              <v-icon color="success">assignment</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>
                                <p class="body-2 font-weight-bold">
                                  <a>Tipo de documento:</a>
                                </p>
                              </v-list-tile-title>
                              <v-list-tile-sub-title>
                                <p
                                  color="accent"
                                  class="caption font-weight-regular"
                                >
                                  <a>{{ tipo }}</a>
                                </p>
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-card-text>
                    </v-card>
                    <v-img
                      :src="rutaconsulta"
                      aspect-ratio="1"
                      class="black"
                      contain
                      max-height="1000"
                    ></v-img>
                  </v-flex>
                </v-layout>
              </v-container>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click.native="dialogimagen = false">Cerrar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDevolucion" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Ingresa los datos complementarios para la devolucion del vehiculo</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn color="success" text @click="crearpdfDevolucion()">Vista previa devolucion</v-btn>
              <v-btn icon @click="dialogDevolucion = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-card-text>
            <v-form ref="form" data-vv-scope="dialogoDevolucion">
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex class="espaciado" xs12 sm12 md6 lg6>
                    <v-switch
                      v-model="nucRelForanea"
                      :label="'¿Hay una carpeta de investigacion foranea relacionada?'"
                      color="success"
                      hide-details                   
                    />

                    <v-text-field
                      v-if="nucRelForanea == true"
                      name="carpeta relacionada"
                      label="Carpeta relacionada foranea:"                  
                      v-model="carpetaRelaForanea"
                      data-vv-scope="dialogoDevolucion"
                      v-validate="'required'"
                      :error-messages="errors.collect('dialogoDevolucion.carpeta relacionada')"
                    />

                    <v-text-field
                      name="numero oficio"
                      label="Numero de oficio:"                  
                      v-model="noOficioD"
                      data-vv-scope="dialogoDevolucion"
                      v-validate="'required'"
                      :error-messages="errors.collect('dialogoDevolucion.numero oficio')"
                    />   
                    
                    <v-text-field
                      name="se le devuelve a"
                      label="Se le devuelve a:"                  
                      v-model="devueltoA"
                      data-vv-scope="dialogoDevolucion"
                      v-validate="'required'"
                      :error-messages="errors.collect('dialogoDevolucion.se le devuelve a')"
                    />                     
                    <v-text-field
                      name="en calidad de"
                      label="En calidad de:"                  
                      v-model="calidadDe"
                      data-vv-scope="dialogoDevolucion"
                      v-validate="'required'"
                      :error-messages="errors.collect('dialogoDevolucion.en calidad de')"
                    />  
                  </v-flex>

                  <v-flex class="espaciado" xs12 sm12 md6 lg6>

                    <v-autocomplete
                      name="asunto"
                      label="Tipo de devolucion:"                  
                      v-model="asunto"
                      :items="tipoDevolucion"
                      return-object
                      data-vv-scope="dialogoDevolucion"
                      v-validate="'required'"
                      :error-messages="errors.collect('dialogoDevolucion.asunto')"
                    />

                    <v-text-field
                      name="nombre corralon"
                      label="Nombre del corralon:"                  
                      v-model="nombreCorralon"
                    />

                    <v-text-field
                      name="ubicacion corralon"
                      label="Ubicacion del corralon:"                  
                      v-model="ubicacionCorralon"
                    />
                    <v-menu
                          ref="menu1"
                          v-model="menu1"
                          :close-on-content-click="false"
                          :return-value.sync="fechaIngreso"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              name="fecha del ingreso"
                              :value="fechaI"
                              label="*Fecha en que ingreso al corralon:"
                              prepend-icon="event"
                              clearable
                              readonly
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            locale="es"
                            v-model="fechaIngreso"
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
                  </v-flex>

                  <v-flex class="espaciado" xs12 sm12 md12 lg12>
                    <v-text-field
                      name="dirigido a"
                      label="Dirigido a:"                  
                      v-model="dirigidoA"
                      data-vv-scope="dialogoDevolucion"
                      v-validate="'required'"
                      :error-messages="errors.collect('dialogoDevolucion.dirigido a')"
                    />
                    <v-text-field
                      name="ccp"
                      label="CCP:"                  
                      v-model="ccp"
                    />
                  </v-flex>

                  <v-flex class="espaciado" xs12 sm12 md6 lg6>
                    <v-switch
                      v-model="masFirmas"
                      :label="'¿Deseas agregar Vo Bo para firma?'"
                      color="success"
                      hide-details                   
                    />
                    <v-text-field
                      v-if="masFirmas == true"
                      name="nombre vo"
                      label="Nombre:"                  
                      v-model="nombreVo"
                    />

                    <v-text-field
                    v-if="masFirmas == true"
                      name="puesto vo"
                      label="Puesto:"                  
                      v-model="puestoVo"
                    />
                    <v-tooltip bottom v-if="nombreVo !=''  && puestoVo !=''">
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="mx-2"
                          slot="activator"
                          v-on="on"
                          @click="agregarFirmas()"
                          fab
                          dark
                          small
                          color="success"
                        >
                          <v-icon>add</v-icon>
                        </v-btn>
                      </template>
                      <span>Agregar Vo Bo</span>
                    </v-tooltip>
                  </v-flex>

                  <v-flex class="espaciado" xs12 sm12 md6 lg6>             
                    <v-data-table v-if="masFirmas == true " :headers="headersD" :items="firmasVo">
                      <template slot="items" class="white" slot-scope="props">
                        <td >{{ props.item.nombreVoBo}}</td>
                        <td >{{ props.item.puestoVoBo}}</td>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }" >
                            <v-icon
                              class="mr-2" v-on="on" color="default"
                              @click="borrarFirma(props.item)"
                              >
                              delete
                            </v-icon>
                          </template>
                          <span>Quitar firma</span>
                        </v-tooltip>
                      
                      </template>
                    </v-data-table> 
                  </v-flex>

                  <v-flex class="espaciado" xs12 sm12 md12 lg12>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="mx-2"
                          slot="activator"
                          v-on="on"
                          @click="generarTexto()"
                          fab
                          dark
                          small
                          color="primary"
                        >
                          <v-icon dark>description</v-icon>
                        </v-btn>
                      </template>
                      <span>Generar texto del documento</span>
                    </v-tooltip>

                    <vue-editor
                      name="texto devolucion"
                      v-validate="'required'"
                      :editorToolbar="customToolbar"
                      v-model="textoDevolucion"
                      data-vv-scope="dialogoDevolucion"
                      :error-messages="errors.collect('dialogoDevolucion.texto devolucion')"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-dialog>

      <v-dialog  v-model="dialogoDevoluciones"  max-width="1000px" >
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar  size="30">
                <v-icon class="grey lighten-2">people_alt</v-icon>
            </v-avatar>  
            <v-toolbar-title class="subheading">Devoluciones registradas</v-toolbar-title>
            <v-spacer></v-spacer>                  
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" >
              <v-container >
                <v-layout wrap>
                  <v-flex  xs12 sm12 md12 lg12 >
                    <v-data-table
                        :headers="headers2"
                        :items="devoluciones"
                        :search="searchar" 
                        :rows-per-page-items="rowsPerPageItems"
                        :pagination.sync="pagination"
                      >
                      <template slot="items" class="white" slot-scope="props">
                        
                          <td>{{props.item.tipoDevolucion}}</td> 
                          <td>{{props.item.devueltoA}}</td> 
                          <td>{{props.item.calidadDevueltoA}}</td> 
                          <td>{{props.item.noOficio}}</td> 

                          <td class=" layout "> 
                            <v-tooltip bottom   >
                              <template v-slot:activator="{ on }">
                                <v-icon 
                                  class="mr-2" v-on="on" 
                                  @click="reImprimirpdfDevolucion(props.item) "
                                  >
                                  print
                                </v-icon> 
                              </template>
                              <span>Reimprimir devolucion</span>
                            </v-tooltip>  
                            <v-tooltip bottom   >
                              <template v-slot:activator="{ on }">
                                <v-icon 
                                  class="mr-2" v-on="on" 
                                  @click="editarDevolucion(props.item)"
                                  >
                                  edit
                                </v-icon> 
                              </template>
                              <span>Actualizar devolucion</span>
                            </v-tooltip>   
                          </td>       
                      </template>        
                    </v-data-table>
                  </v-flex>                               
                </v-layout>
              </v-container>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn  @click.native="dialogoDevoluciones=false" >Cerrar</v-btn>                                   
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
import { WebCam } from "vue-web-cam";
import { VueEditor } from "vue2-editor";
import { error } from "util";
import n401 from './401.vue';
import n403 from './403.vue';
import moment from "moment";
import "moment/locale/es";
import QRCode from "qrcode";
import { generarQRCodeBase64 } from './crearQR';
import { Console } from "console";

// marca y tipo agregar infedinido y otros

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
    nuc: "",
    showpage: true,
    e401: false,
    e403: false,
    //*************** */
    vehiculos: [],
    estado: false,
    estadorobado: false,
    estadov: "",
    defdep: false,
    marcaid: [],
    placa: "",
    color: [],
    ano: "",
    recuperado: false,
    devuelto: false,
    senasparticulares: "",
    marcas: [],
    marca: "",
    marca2: "",
    tipos: [],
    tipo: "",
    modelos: [],
    modelo: "",
    serie: "",
    colores: [],
    swModelo: false,
    anos: [],
    senasparticulares: "",
    fecharegistro:
      new Date().getDate() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getFullYear(),
    fechasys: new Date(),
    search: "",
    dialogo: false,
    idvehiculo: "",
    motorserie: "",
    recepcion: "",
    delitos: [],
    delito: "",
    direcciondelito: "",
    municipiodelito: "",
    propietarios: [],
    propietario: "",
    denunciantes: [],
    denunciante: "",
    domiciliodenunciante: "",
    modaldocumento: false,
    modaldocumentoD:false,
    agenciaid: "",
    agenciainfo: [],
    fechahorasuceso: "",
    fechahorasucesof: "",
    numerooficio: "",
    ubicacion: "",
    fechaactual: "",
    dialogarchivo: false,
    idvehiculo: "",
    idvehi:"",
    imageName: "",
    imageUrl: null,
    imageFile: "",
    archivos: [],
    dialogpictures: "",
    descripciondocumento: "",
    tiposdocumentos: [
      { text: "Factura original", value: "1" },
      { text: "Copia de factura", value: "2" },
      { text: "Re-factura", value: "3" },
      { text: "Foto", value: "4" },
      { text: "Carta de compra-venta", value: "5" },
    ],
    tiposdocumento: "",
    searchar: "",

    headersar: [
      { text: "TipoDocumento", value: "fipoDocumento", sortable: true },
      { text: "Opciones", value: "opciones" },
    ],
    rutaconsulta: "",
    descrip: "",
    tipo: "",
    dialogimagen: false,
    tiposervicio: "",
    //*************** */

    headers: [
      { text: "Emitida por", value: "usuario", sortable: true },
      { text: "Módulo", value: "modulo", sortable: true },
      { text: "Estado", value: "estado" },
      { text: "Marca", value: "marca" },
      { text: "Tipo", value: "tipo" },
      { text: "Modelo", value: "modelo" },
      { text: "Serie", value: "serie" },
      { text: "Placas", value: "placas" },
      { text: "Color", value: "color" },
      { text: "Año", value: "ano" },
      { text: "Opciones", value: "opciones", sortable: false },
    ],
    headersD: [

      { text: "Nombre", value: "nombre" },
      { text: "Puesto", value: "puesto" },
      { text: "Opciones", value: "opciones", sortable: false },
    ],
    headers2: [

      { text: "Tipo de devolucion", value: "devolucion" },
      { text: "Devuelto a", value: "devueltoa" },
      { text: "En calidad de", value: "calidade" },
      { text: "No. de oficio", value: "nooficio" },
      { text: "Opciones", value: "opciones", sortable: false },
    ],
    estados: [
      { text: "Asegurado", value: "Asegurado", value2: 3 },
      { text: "Relacionado", value: "Relacionado", value2: 1 },
      { text: "Robado", value: "Robado", value2: 2 },
    ],

    definitivaodep: [
      { text: "Definitva", value: true },
      { text: "Deposito", value: false },
    ],
    estado: false,
    lugardeposito: "",

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
    editedIndexD: 0,
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
    docVehiculo: 'Vehiculo',
    docVehiculoDevolucion: 'Devolucion de vehiculo',
    vistaPreviaTF: true,
    //----------------------------------------------------
    dialogDevolucion: false,
    nucRelForanea: false,
    carpetaRelaForanea: "",
    noOficioD: "",
    asunto: "",
    dirigidoA:"",
    textoDevolucion: "",
    nombreCorralon: "",
    ubicacionCorralon: "",
    menu1: false,
    fechaIngreso: "",
    fechaI: "",
    infoVehiculo: [],
    arrayTexts:[],
    masFirmas:false,
    nombreVo:"",
    puestoVo:"",
    firmasVo:[],
    tipoDevolucion: [
      { text: "DEFINITIVA", value: "DEFINITIVA", value2: 1 },
      { text: "DEPOSITO", value: "DEPOSITO", value2: 2 },
    ],
    ccp:"",
    idDevolucionVehiculo:"",
    devueltoA:"",
    calidadDe:"propietario",
    dialogoDevoluciones:false,
    devoluciones:[],
    rHechoId:'',
    rAtencionId: '',
    comprobarArray:'', 
    valuePdf: false

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
      me.listarMarcas();
      me.listarTipos();
      me.listarColores();
      me.listarAnos();
      me.listardelitos();
      me.listarrHecho();
      me.listarPersonas();
      me.listarLogo();
      me.listar();
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
      return this.editedIndex === -1 ? "Nuevo Vehiculo" : "Actulizar Vehiculo";
    },
    formIcon() {
      return this.editedIndex === -1 ? "add" : "assignment";
    },
    textoestado() {
      if (this.estado) return "Relacionado";
      else return "Robado";
    },
    textorobado() {
      if (this.estadorobado) return "Tentativa";
      else return "Consumado";
    },
    textosino() {
      if (this.recuperado) return "Si";
      else return "No";
    },
    textosino2() {
      if (this.devuelto) return "Si";
      else return "No";
    },
    robagurado() {
      return this.estadov.value === "Robado" ||
        this.estadov.value === "Asegurado"
        ? "required"
        : "";
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
    edititem(item) {
      this.editedIndex = 1;
      this.dialogo = true;
      this.idvehiculo = item.idVehiculo;
      this.estado = item.estado;
      this.estadorobado = item.estadoRobado;
      this.estadov = item.estadov;
      this.marca = this.selectidmarca(item.marca);
      this.listarModelos2(this.marca);
      this.tipo = item.tipo;
      this.modelo = item.modelo;
      this.serie = item.serie;
      this.placa = item.placas;
      /* this.color = item.color; */
      this.ano = item.ano;
      this.direcciondelito = item.lugar;
      this.municipiodelito = item.municipio;
      this.delito = new Object();
      this.delito.text = item.modalidad;
      this.delito.value = item.modalidad;
      this.propietario = item.propietario;
      this.denunciante = new Object();
      this.denunciante.text = item.nombreDenunciante;
      this.denunciante.value = item.nombreDenunciante;

      this.motorserie = item.noSerieMotor;
      this.recepcion = item.recepcion;
      this.numerooficio = item.numeroOficio;
      this.domiciliodenunciante = item.domicilioDenunciante;
      this.fechahorasucesof = this.fechaRobo;

      this.recuperado = item.recuperado;
      this.devuelto = item.devuelto;
      this.senasparticulares = item.senasParticulares;
      this.generartextval(item.marca);
      this.tiposervicio = item.tipoServicio;
      this.ubicacion = item.ubicacion;

      var coloresA = item.color;
              var arraycolores = coloresA.split(";");
              const ArrayV = arraycolores.map(function(item) {
                    return {text: item.trim(), value: item.trim(),
                    };
                });
                this.color =  ArrayV
    },
    selectidmarca: function (marca) {
      for (var i = 0; i < this.marcas.length; i++) {
        if (this.marcas[i].text === marca) return this.marcas[i].value;
      }
    },
    generartextval: function (val) {
      for (var i = 0; i < this.marcas.length; i++) {
        if (this.marcas[i].text === val) {
          this.marca = new Object();
          this.marca.text = this.marcas[i].text;
          this.marca.value = this.marcas[i].value;
        }
      }
    },
    cerrarcarpeta() {
      this.$store.state.rhechoid = null;
      this.$store.state.nuc = null;
      this.$router.push("./umixta-carpetas");
    },
    //  funcion para verificar si ya tiene delito, lugar y hora de suceso la carpeta
    comprobarInfo(){
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

        this.$cat.get("api/RHechoes/ComprobarINX/" + me.rHechoId + "/" + me.rAtencionId,configuracion).then(function (response) {
            me.comprobarArray = response.data;

                if( me.comprobarArray[0].idRDH === null || 
                    me.comprobarArray[0].fechaHoraSuceso === null || 
                    me.comprobarArray[0].idDDelito === null){

                      alert(
                        "Para agregar un registro te hace falta: "+
                        (me.comprobarArray[0].idRDH === null? " \n*Delito":"") +
                        (me.comprobarArray[0].fechaHoraSuceso === null? " \n*Fecha y hora del suceso":"")+
                        (me.comprobarArray[0].idDDelito === null? " \n*Lugar del suceso":"")       
                      );
            }else{
              me.agregar();
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
    agregar() {
      this.limpiar();
      this.editedIndex = -1;
      this.listardirecciondelito();
      this.dialogo = true;
    },
    close() {
      this.dialogo = false;
      this.limpiar();
    },
    limpiar() {
      this.listar();
      this.estado = false;
      this.estadov = "";
      this.estadorobado = false;
      this.marca = "";
      this.tipo = "";
      this.modelo = "";
      this.serie = "";
      this.placa = "";
      this.color = "";
      this.ano = "";
      this.recuperado = false;
      this.devuelto = false;
      this.senasparticulares = "";
      this.motorserie = "";
      this.recepcion = "";
      this.delito = "";
      this.propietario = "";
      this.denunciante = "";
      this.domiciliodenunciante = "";
      this.numerooficio = "";
      this.lugardeposito = "";
      this.ubicacion = "";
      this.defdep = "";
      this.tiposervicio = "";
      this.swModelo = false;
      this.qrCode = null;
      this.vistaPreviaTF = true;
    },
    listar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/Vehiculos/Listar/" + me.rHechoId, configuracion)
        .then(function (response) {
          //console.log(response);
          me.vehiculos = response.data;
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
    pdfcrear() {
      this.$validator.validateAll("dialogo1").then((result) => {
        if (result) {
          this.fechahorasucesof =
            this.fechahorasuceso.substring(8, 10) +
            " de " +
            this.obtenermes(this.fechahorasuceso.substring(5, 7) - 1) +
            " del " +
            this.fechahorasuceso.substring(0, 4);
          this.fechaactual = this.generarfecha();
          this.valuePdf = true;
          this.mostrarpdf(this.u_nombre, this.u_puesto, this.u_agencia);
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
    generarfecha() {
      var fecha;
      fecha =
        moment().format("DD") +
        " de " +
        moment().format("MMMM") +
        " de " +
        moment().format("YYYY");
      return fecha;
    },
    imprimir(item) {
      let me = this;
      this.marca = item.marca;
      this.tipo = item.tipo;
      this.modelo = item.modelo;
      this.color = item.color; 
      this.serie = item.serie;
      this.placa = item.placas;
      this.motorserie = item.noSerieMotor;
      this.recepcion = item.recepcion;
      this.ano = item.ano;
      this.delito = new Object();
      this.delito.text = item.modalidad;
      this.delito.value = item.modalidad;
      this.direcciondelito = item.lugar;
      this.municipiodelito = item.municipio;
      this.fechahorasucesof = item.fechaRobo;

      this.propietario = item.propietario;

      this.denunciante = new Object();
      this.denunciante.text = item.nombreDenunciante;
      this.denunciante.value = item.nombreDenunciante;

      this.numerooficio = item.numeroOficio;

      this.domiciliodenunciante = item.domicilioDenunciante;

      this.fechaactual =
        item.fechaSys.substring(8, 10) +
        " de " +
        this.obtenermes(item.fechaSys.substring(5, 7) - 1) +
        " del " +
        item.fechaSys.substring(0, 4);

      me.vistaPreviaTF = false;
      me.generarQR(me.docVehiculo,me.nuc,item.usuario,item.fechaSys,item.idVehiculo);

      
      setTimeout(() => 
      {
        this.imprimirpdf(item.usuario, item.puesto, item.agencia);
        this.modaldocumento = false;
      }, 1000);

      this.valuePdf = false


      
    },
    listardireccionpersonal() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RAPs/ListarDP/" + me.denunciante.value2, configuracion)
        .then(function (response) {
          me.domiciliodenunciante =
            response.data.calle +
            ", No.Int: " +
            response.data.noint +
            ", No.Ext: " +
            response.data.noext +
            ", " +
            response.data.localidad +
            ", " +
            response.data.municipio +
            ", " +
            response.data.estado +
            ", CP: " +
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
    listarrHecho() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/RHechoes/ListarPorId/" + me.rHechoId, configuracion)
        .then(function (response) {

          me.fechahorasuceso = response.data.fechaHoraSuceso;
          me.agenciaid = response.data.agenciaid;
          me.rHechoId = response.data.rHechoId;
          me.rAtencionId = response.data.rAtencionId;
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
    listarMarcas() {
      var marcasarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$conf
        .get("api/Marca/Listar", configuracion)
        .then(function (response) {
          marcasarray = response.data;

          marcasarray.map(function (x) {
            me.marcas.push({ text: x.dato, value: x.idMarca });
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
    listardirecciondelito() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var delitoaray = [];
      me.$CAT
        .get(
          "api/DireccionDelitoes/ListarPoridHecho/" + me.rHechoId,
          configuracion
        )
        .then(function (response) {
          me.direcciondelito =
            "Calle " +
            response.data.calle +
            ", No.Int: " +
            response.data.noint +
            ", No.Ext: " +
            response.data.noext +
            ", " +
            response.data.localidad +
            "," +
            response.data.estado +
            ", CP: " +
            response.data.cp;
          me.municipiodelito = response.data.municipio;
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
    listarTipos() {
      var tiposarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$conf
        .get("api/Tipov/Listar", configuracion)
        .then(function (response) {
          tiposarray = response.data;
          tiposarray.map(function (x) {
            me.tipos.push({ text: x.dato, value: x.dato });
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
    listarModelos() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var modelosarray = [];
      me.modelos = [];
      me.$conf
        .get("api/Modelo/ListarId/" + me.marca.value, configuracion)
        .then(function (response) {
          modelosarray = response.data;
          modelosarray.map(function (x) {
            me.modelos.push({ text: x.dato, value: x.dato });
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
    listarModelos2: function (marca) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var modelosarray = [];
      me.modelos = [];
      me.$conf
        .get("api/Modelo/ListarId/" + marca, configuracion)
        .then(function (response) {
          modelosarray = response.data;
          modelosarray.map(function (x) {
            me.modelos.push({ text: x.dato, value: x.dato });
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
    listarColores() {
      var coloresarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$conf
        .get("api/Color/Listar", configuracion)
        .then(function (response) {
          coloresarray = response.data;
          coloresarray.map(function (x) {
            me.colores.push({ text: x.dato, value: x.dato });
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
    listarAnos() {
      var anosarray = [];
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$conf
        .get("api/Ano/Listar", configuracion)
        .then(function (response) {
          anosarray = response.data;
          anosarray.map(function (x) {
            me.anos.push({ text: x.dato, value: x.dato });
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

          delitosArray.forEach((x) => {
            me.delitos.push({ text: x.nombreDelito, value: x.intensionDelito });
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
    listarPersonas() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var contador = 0;
      var personasArray = [];
      me.$CAT
        .get("api/RAPs/ListarTodosVic/" + me.rAtencionId, configuracion)
        .then(function (response) {
          personasArray = response.data;
          personasArray.map(function (x) {
            me.propietarios.push({
              text: x.nombreCompleto,
              value: x.nombreCompleto,
              value2: x.personaId,
            });
            me.denunciantes.push({
              text: x.nombreCompleto,
              value: x.nombreCompleto,
              value2: x.personaId,
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
    guardar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$validator.validateAll("dialogo1").then((result) => {
        if (result) {
          var colores= '';
            for(var i=0; i<me.color.length; i++){
                        colores += me.color[i].value;
                              if(i+1 != me.color.length)
                              colores += "; ";
                      }
          if (this.editedIndex == -1) {

            me.$CAT
              .post(
                "api/Vehiculos/Crear",
                {
                  rHechoId: me.rHechoId,
                  estado: me.estado,
                  estadoRobado: me.estadorobado,
                  marca: me.marca.text,
                  tipo: me.tipo,
                  modelo: me.modelo,
                  serie: me.serie,
                  placas: me.placa,
                  color: colores,
                  ano: me.ano,
                  recuperado: me.recuperado,
                  devuelto: me.devuelto,
                  senasParticulares: me.senasparticulares,
                  fechaSys: me.fechasys,
                  fechaRegistro: me.fecharegistro,
                  distrito: me.u_distrito,
                  subproc: me.u_dirSubPro,
                  agencia: me.u_agencia,
                  usuario: me.u_nombre,
                  puesto: me.u_puesto,
                  modulo: me.u_modulo,
                  NoSerieMotor: me.motorserie,
                  Recepcion: me.recepcion,
                  Lugar: me.direcciondelito,
                  Municipio: me.municipiodelito,
                  Modalidad: me.delito.value,
                  FechaRobo: me.fechahorasucesof,
                  Propietario: me.propietario,
                  NombreDenunciante: me.denunciante.text,
                  DomicilioDenunciante: me.domiciliodenunciante,
                  NumeroOficio: me.numerooficio,
                  Lugardeposito: me.lugardeposito,
                  Estadov: me.estadov.text,
                  StatusVehiculo: me.defdep.value,
                  Ubicacion: me.ubicacion,
                  TipoServicio: me.tiposervicio,
                },
                configuracion
              )
              .then(function (response) {
                me.$notify(
                  "La información se guardo correctamente !!!",
                  "success"
                );
                me.dialogo = false;
                me.listar();
                me.modaldocumento = false;
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
          } else {
            me.$CAT
              .put(
                "api/Vehiculos/Actualizar",
                {
                  IdVehiculo: me.idvehiculo,
                  estado: me.estado,
                  estadoRobado: me.estadorobado,
                  marca: me.marca.text,
                  tipo: me.tipo,
                  modelo: me.modelo,
                  serie: me.serie,
                  placas: me.placa,
                  color: colores,
                  ano: me.ano,
                  recuperado: me.recuperado,
                  devuelto: me.devuelto,
                  senasParticulares: me.senasparticulares,
                  NoSerieMotor: me.motorserie,
                  Recepcion: me.recepcion,
                  Lugar: me.direcciondelito,
                  Municipio: me.municipiodelito,
                  Modalidad: me.delito.value,
                  FechaRobo: me.fechahorasucesof,
                  Propietario: me.propietario,
                  NombreDenunciante: me.denunciante.text,
                  DomicilioDenunciante: me.domiciliodenunciante,
                  Lugardeposito: me.lugardeposito,
                  Estadov: me.estadov,
                  StatusVehiculo: me.defdep.text,
                  Ubicacion: me.Ubicacion,
                  TipoServicio: me.tiposervicio,
                },
                configuracion
              )
              .then(function (response) {
                me.$notify(
                  "La información se actualizo correctamente !!!",
                  "success"
                );
                me.dialogo = false;
                me.listar();
                me.modaldocumento = false;
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
          }
        }
      });
    },
    loadarchive(item) {
      let me = this;
      me.idvehiculo = item.idVehiculo;
      me.dialogarchivo = true;
      me.limpiar();
    },
    pickFile() {
      this.removeImage();
      this.$refs.image.click();
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
    removeImage() {
      this.$refs.image.value = "";
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
    consultararchivo(item) {
      let me = this;
      me.dialogpictures = true;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$CAT
        .get("api/ArchivoVehiculos/Listar/" + item.idVehiculo, configuracion)
        .then(function (response) {
          //console.log(response);
          me.archivos = response.data;
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
    guardarArchivo() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$validator.validateAll("dialogodocs").then((result) => {
        if (result) {
          var nombreCarpeta;
          if (me.imageFile) {
            let formData = new FormData();
            formData.append("file", me.imageFile);
            nombreCarpeta = "C" + me.nuc.substr(1);
            me.GUID = me.generateUUID();

            me.$CAT
              .post(
                "api/ArchivosMediaAfiliacion/Post/" +
                  nombreCarpeta +
                  "/" +
                  me.GUID,
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
                console.log(response.data.ruta);
                me.$CAT
                  .post(
                    "api/ArchivoVehiculos/Crear",
                    {
                      VehiculoId: me.idvehiculo,
                      TipoDocumento: me.tiposdocumento.text,
                      DescripcionDocumento: me.descripciondocumento,
                      Ruta: response.data.ruta,
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
                        "Error al intentar crear el  registro!!!",
                        "error"
                      );
                    }
                  });
              })
              .catch(function () {
                console.log("FAILURE2!!");
              });
          }
        }
      });
    },
    verimagen(item) {
      let me = this;
      me.rutaconsulta = item.ruta;
      me.descrip = item.descripcionDocumento;
      me.tipo = item.tipoDocumento;
      me.dialogimagen = true;
    },
    fechainif() {
      if (this.menu1) {
        this.generarfecha2();
        this.$refs.menu1.save(this.fechaIngreso);
      }
    },
    generarfecha2() {
      if (this.menu1)
        this.fechaI =
          this.fechaIngreso.substring(8, 10) +
          " de " +
          this.obtenermes(this.fechaIngreso.substring(5, 7) - 1) +
          " del " +
          this.fechaIngreso.substring(0, 4);
    },
    devolverVehiculo(item)
    {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      let me = this;

      //Arreglo con los datos del vehiculo, necesario para nuevo archivo, edicion y reimpresion
      me.infoVehiculo = item;

      this.$cat.get("api/Vehiculos/ListarDevolucion/" + item.idVehiculo,configuracion).then(function (response)
      {

        //Guardo la respuesta de las api
        me.devoluciones = response.data;

        //Evaluo si contiene infoemacion, en caso de que si, muestra la tabla con las devoluciones registradas
        if(response.data && response.data.length > 0)
        {
          me.dialogoDevoluciones = true;
        }
        //En caso de no haber limpio los componentes y muestro la vista para crear  la devolucion
        else
        {
          me.limpiarDevolucion();
          me.dialogDevolucion = true;
          //Se coloca valor predeterminado del propietario
          me.devueltoA = item.propietario;
          
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
    crearpdfDevolucion()
    {
      let me = this;

      console.log(me.firmasVo);
      if(me.masFirmas == true && me.firmasVo.length == 0)
      {
        alert("Colocas que deseas agregar Vo Bo pero no has agregado ninguno, agrégalos colocando su nombre, puesto y selecionar el boton verde de + o desactiva la opción.");
      }
      else
      {
        var now = moment();
        me.generarQR(me.docVehiculoDevolucion,me.nuc,me.u_nombre,now,me.idDevolucionVehiculo);

        me.$validator.validateAll("dialogoDevolucion").then((result) => 
        {
          if (result) 
          {
            me.mostrarpdfDevolucion(me.u_nombre,me.u_puesto,me.u_agencia,now);
          }
        });
      }

    },
    generarTexto()
    {
      let me  = this;

      if(me.asunto == "[object Object]")
      {
        me.asunto = me.asunto.text;
      }

      var segParte = '\n\n<p><strong><u>El presente oficio tendrá una vigencia de cinco días hábiles contados a partir de su recepción y, previo a la devolución de vehículo, ' +
          'deberá verificarse con ROSA AURELIA CASTAÑEDA RODRIGUEZ a los  números 01 (771) 7108796 y 108813 extensión 103 de la UVR.</u></strong></p>►'
      
      var tercerParte = '\n\n<p>Se requiere a <strong>' + me.devueltoA + '</strong> en su calidad de ' + me.calidadDe +' para que un término de quince días hábiles contados ' + 
        'a partir de la recepción del presente comparezca ante la autoridad que conozca de la carpeta de investigación <strong>' + me.carpetaRelaForanea +
        '</strong> a efecto de realizar los tramites correspondientes a la baja del reporte de robo.' + 
        '</p>';

      me.textoDevolucion = '<p>'+
        'Con fundamento en lo establecido en los artículos 119, párrafo segundo, de la Constitución Política de los Estados Unidos Mexicanos; ' +
        '108, 109, 111, 131, 229, 239, 254 y 246 del Código Nacional de Procedimientos Penales; así como  el acuerdo numero A/001/2016 del Procurador General de ' +
        'Justicia en el Estado, publicado en el Periódico Oficial del dieciocho de junio del dos mil siete, por el cual se establecen las directrices institucionales ' +
        'que se deben seguir para la aplicación y observancia del “Manual de Operación en Materia de Vehículos Robados”; le notifico que toda vez que se a cubierto ' +
        'los requisitos legales correspondientes, se levanta el aseguramiento del vehículo que enlista a continuación, y ' + '<strong><u>se devuelve en '+
         me.asunto +'</u></strong>'+' a <strong>' + me.devueltoA + '</strong> en su calidad de '+ me.calidadDe + ' (previa identificación) ' +
        'el cual se encuentra depositado en el corralón de encierro denominado "'+ me.nombreCorralon + '" con domicilio ubicado en ' + me.ubicacionCorralon + 
        ' mismo que ingreso en fecha '+ me.fechaI + '.►' + segParte + (me.nucRelForanea? tercerParte: " ")
        '</p>';
    },
    limpiarDevolucion()
    {
      let me  = this;

      me.nucRelForanea = false;
      me.carpetaRelaForanea = '';
      me.noOficioD = '';
      me.asunto = '';
      me.nombreCorralon = '';
      me.ubicacionCorralon = '';
      // me.fechaIngreso = '';
      // me.menu1 = '';
      // me.fechaI = '';
      me.dirigidoA = '';
      me.textoDevolucion = '';
      me.ccp = '';
      me.masFirmas = false;
      me.firmasVo =  [];
      me.fechaI = '';
      me.fechaIngreso = '';
      me.editedIndexD = 0;

    },
    agregarFirmas()
    {
      let me = this;
      me.firmasVo.push({nombreVoBo:me.nombreVo,puestoVoBo:me.puestoVo});

      me.nombreVo = "";
      me.puestoVo = "";
    },
    borrarFirma(item)
    {
      let me = this;

      const index = me.firmasVo.indexOf(item); // Obtener el índice del registro
      if (index !== -1) 
      {
        me.firmasVo.splice(index, 1); 
      }
    },
    guardarDevolucion()
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      if(me.asunto == "[object Object]")
      {
        me.asunto = me.asunto.text;
      }

      if(me.editedIndexD == 0)
      {
        this.$cat.post("api/Vehiculos/CrearDevolucion",
        {
          VehiculoId: me.infoVehiculo.idVehiculo,
          NucRelacionadaForaneaTF: me.nucRelForanea,
          NucRelacionadaForanea: me.carpetaRelaForanea,
          NoOficio: me.noOficioD,
          DevueltoA: me.devueltoA,
          CalidadDevueltoA: me.calidadDe,
          TipoDevolucion: me.asunto,
          NombreCorralon: me.nombreCorralon,
          UbicacionCorralon: me.ubicacionCorralon,
          FechaIngresoCorralon: me.fechaIngreso,
          DirigidoA: me.dirigidoA,
          Ccp: me.ccp,
          Usuario: me.u_nombre,
          Puesto: me.u_puesto,
          Agencia: me.u_agencia,
          Subproc: me.u_dirSubPro,
          Distrito: me.u_distrito,
          UsuarioId: me.u_idusuario,
          FirmasVoBoTF: me.masFirmas,
          FirmasVoBo: JSON.stringify(me.firmasVo),
          TextoDevolucion: me.textoDevolucion,
          
        },configuracion).then(function (response) 
        {
          me.$notify("La información se guardo correctamente !!!","success");

          me.idDevolucionVehiculo = response.data.iddevolucionvehiculo;

          me.vistaPreviaTF = false;
          var now = moment();
          me.generarQR(me.docVehiculoDevolucion,me.nuc,me.u_nombre,now,me.idDevolucionVehiculo);

          setTimeout(() => 
          {
            me.imprimirpdfDevolucion(me.u_nombre, me.u_puesto, me.u_agencia,now);
            me.limpiarDevolucion();
            me.infoVehiculo = [];
            me.modaldocumentoD = false;
            me.dialogDevolucion = false;
          }, 1000);

        }).catch((err) => 
        {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");

          } else if (err.response.status == 401) 
          {
            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion","error");
            (me.e401 = true), (me.showpage = false);

          } else if (err.response.status == 403) 
          {
            me.$notify("No esta autorizado para ver esta pagina","error");
            me.e403 = true;
            me.showpage = false;

          } else if (err.response.status == 404) 
          {
            me.$notify("El recuso no ha sido encontrado", "error");

          } else 
          {
            me.$notify("Error al intentar crear el  registro!!!","error");

          }
        });
      }
      else
      {
        this.$cat.put("api/Vehiculos/EditarDevolucion",
        {
          IdDevolucionVehiculo: me.idDevolucionVehiculo,
          VehiculoId: me.infoVehiculo.idVehiculo,
          NucRelacionadaForaneaTF: me.nucRelForanea,
          NucRelacionadaForanea: me.carpetaRelaForanea,
          NoOficio: me.noOficioD,
          DevueltoA: me.devueltoA,
          CalidadDevueltoA: me.calidadDe,
          TipoDevolucion: me.asunto,
          NombreCorralon: me.nombreCorralon,
          UbicacionCorralon: me.ubicacionCorralon,
          FechaIngresoCorralon: me.fechaIngreso,
          DirigidoA: me.dirigidoA,
          Ccp: me.ccp,
          //Comentado porque a pesar de edicion no debe cambiar quien hizo el documento
          // Usuario: me.u_nombre,
          // Puesto: me.u_puesto,
          // Agencia: me.u_agencia,
          // Subproc: me.u_dirSubPro,
          // Distrito: me.u_distrito,
          // UsuarioId: me.u_idusuario,
          FirmasVoBoTF: me.masFirmas,
          FirmasVoBo: JSON.stringify(me.firmasVo),
          TextoDevolucion: me.textoDevolucion,
          
        },configuracion).then(function (response) 
        {
          me.$notify("La información se guardo correctamente !!!","success");

          me.vistaPreviaTF = false;
          var now = moment();
          me.generarQR(me.docVehiculoDevolucion,me.nuc,me.u_nombre,now,me.idDevolucionVehiculo);

          setTimeout(() => 
          {
            me.imprimirpdfDevolucion(me.u_nombre, me.u_puesto, me.u_agencia,now);
            me.limpiarDevolucion();
            me.infoVehiculo = [];
            me.modaldocumentoD = false;
            me.dialogDevolucion = false;
          }, 1000);

        }).catch((err) => 
        {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");

          } else if (err.response.status == 401) 
          {
            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion","error");
            (me.e401 = true), (me.showpage = false);

          } else if (err.response.status == 403) 
          {
            me.$notify("No esta autorizado para ver esta pagina","error");
            me.e403 = true;
            me.showpage = false;

          } else if (err.response.status == 404) 
          {
            me.$notify("El recuso no ha sido encontrado", "error");

          } else 
          {
            me.$notify("Error al intentar crear el  registro!!!","error");

          }
        });
      }

    },
    editarDevolucion(item)
    {

      let me = this;

      me.idDevolucionVehiculo = item.idDevolucionVehiculo;
      me.editedIndexD = 1;
      me.nucRelForanea = item.nucRelacionadaForaneaTF;
      me.carpetaRelaForanea = item.nucRelacionadaForanea;
      me.noOficioD = item.noOficio;
      me.devueltoA = item.devueltoA;
      me.calidadDe = item.calidadDevueltoA;
      me.asunto = item.tipoDevolucion;
      me.nombreCorralon = item.nombreCorralon;
      me.ubicacionCorralon = item.ubicacionCorralon;
      me.fechaIngreso = item.fechaIngresoCorralon.substring(0, 10);
      me.fechaI =me.fechaIngreso.substring(8, 10) +" de " +me.obtenermes(me.fechaIngreso.substring(5, 7) - 1) +" del " +me.fechaIngreso.substring(0, 4);
      me.dirigidoA = item.dirigidoA;
      me.ccp = item.ccp;
      me.masFirmas = item.firmasVoBoTF;
      me.firmasVo =  JSON.parse(item.firmasVoBo);
      me.textoDevolucion = item.textoDevolucion;

      me.dialogDevolucion = true;

    },
    reImprimirpdfDevolucion(item)
    {

      let me = this;

      me.nucRelForanea = item.nucRelacionadaForaneaTF;
      me.carpetaRelaForanea = item.nucRelacionadaForanea;
      me.noOficioD = item.noOficio;
      me.asunto = item.tipoDevolucion;
      me.dirigidoA = item.dirigidoA;
      me.textoDevolucion = item.textoDevolucion;
      me.masFirmas = item.firmasVoBoTF;
      me.firmasVo =  JSON.parse(item.firmasVoBo);

      me.vistaPreviaTF = false;
      me.generarQR(me.docVehiculoDevolucion,me.nuc,item.usuario,item.fechasys,item.idDevolucionVehiculo);

      setTimeout(() => 
      {
        me.imprimirpdfDevolucion(item.usuario,item.puesto,item.agencia,item.fechaIngresoCorralon);
      }, 1000);
      




    },
    downloadPdf(nombre, puesto, agencia) {
        let colores= '';
        for(var i=0; i<this.color.length; i++){
            colores += this.color[i].value;
            if(i+1 != this.color.length)
                colores += "; ";
            }

    
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
            text: "Número de oficio: " + this.numerooficio + "\n\n",
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
            style: "table",
            absolutePosition: { x: 150, y: 230 },
            table: {
              headerRows: 1,
              widths: [115],
              heights: [20],
              body: [[{ text: this.marca, style: "Texto" }]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "Marca",
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 90, y: 235 },
          },

          {
            style: "table",
            absolutePosition: { x: 150, y: 280 },
            table: {
              headerRows: 1,
              widths: [115],
              heights: [20],
              body: [[{ text: this.modelo, style: "Texto" }]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "Submarca",
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 90, y: 285 },
          },

          {
            style: "table",
            absolutePosition: { x: 150, y: 330 },
            table: {
              headerRows: 1,
              widths: [115],
              heights: [20],
              body: [[{ text: this.tipo, style: "Texto" }]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "Tipo",
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 90, y: 335 },
          },

          {
            style: "table",
            absolutePosition: { x: 150, y: 380 },
            table: {
              headerRows: 1,
              widths: [115],
              heights: [20],
              body: [[{ text: this.ano, style: "Texto" }]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "Modelo",
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 90, y: 385 },
          },

          {
            style: "table",
            absolutePosition: { x: 150, y: 430 },
            table: {
              widths: [115],
              heights: [20],
              body: [[{ text: this.valuePdf === true? colores: this.color, style: "Texto" }]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "Color",
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 90, y: 435 },
          },

          {
            style: "table",
            absolutePosition: { x: 150, y: 480 + (this.color.length > 3 ? 30 : 0)},
            table: {
              widths: [115],
              heights: [20],
              body: [[{ text: this.serie, style: "Texto" }]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "Serie",
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 90, y: 480 + (this.color.length > 3 ? 30 : 0)},
          },

          {
            style: "table",
            absolutePosition: { x: 150, y: 530 + (this.color.length > 3 ? 30 : 0)},
            table: {
              widths: [115],
              heights: [20],
              body: [[{ text: this.motorserie, style: "Texto" }]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "Motor",
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 90, y: 535 + (this.color.length > 3 ? 30 : 0)},
          },

          {
            style: "table",
            absolutePosition: { x: 150, y: 580 + (this.color.length > 3 ? 30 : 0)},
            table: {
              widths: [115],
              heights: [20],
              body: [[{ text: this.placa, style: "Texto" }]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "Placas\nCirculación",
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 90, y: 578 + (this.color.length > 3 ? 30 : 0)},
          },

          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          {
            style: "table",
            absolutePosition: { x: 300, y: 230 },
            table: {
              widths: [225],
              heights: [80],
              body: [[""]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "Circunstancias de los hechos",
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 360, y: 350 },
          },

          {
            style: "table",
            absolutePosition: { x: 400, y: 240 },
            table: {
              widths: [115],
              heights: [20],
              body: [[{ text: this.nuc, style: "Texto" }]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "NUC",
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 330, y: 245 },
          },

          {
            style: "table",
            absolutePosition: { x: 400, y: 280 },
            table: {
              widths: [115],
              heights: [20],
              body: [[{ text: this.recepcion, style: "Texto" }]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "Recepcion",
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 330, y: 285 },
          },

          {
            style: "table",
            absolutePosition: { x: 400, y: 380 },
            table: {
              widths: [115],
              heights: [80],
              body: [[{ text: this.direcciondelito, style: "Texto" }]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "Lugar",
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 330, y: 385 },
          },

          {
            style: "table",
            absolutePosition: { x: 400, y: 470 },
            table: {
              widths: [115],
              heights: [20],
              body: [[{ text: this.municipiodelito, style: "Texto" }]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "Municipio",
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 330, y: 475 },
          },

          {
            style: "table",
            absolutePosition: { x: 400, y: 500 },
            table: {
              widths: [115],
              heights: [20],
              body: [[{ text: this.delito.value, style: "Texto" }]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "Modalidad",
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 330, y: 505 },
          },

          {
            style: "table",
            absolutePosition: { x: 400, y: 530 },
            table: {
              widths: [115],
              heights: [20],
              body: [[{ text: this.fechahorasucesof, style: "Texto" }]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "Fecha de\nRobo",
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 330, y: 530 },
          },

          {
            style: "table",
            absolutePosition: { x: 300, y: 340 },
            table: {
              widths: [225],
              heights: [220],
              body: [[""]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "Circunstancias de los hechos",
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 360, y: 350 },
          },
          /////////////////////////////////////////////////////////////////////////////////////////
          {
            style: "table",
            absolutePosition: { x: 90, y: 630 + (this.color.length > 3 ? 30 : 0)},
            table: {
              widths: [435],
              heights: [130],
              body: [[" "]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "Propietario: " + this.propietario,
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 110, y: 640 + (this.color.length > 3 ? 30 : 0)},
          },
          {
            text: this.propietario.text,
            alignment: "justify",
            style: "Textob",
            absolutePosition: { x: 180, y: 640 + (this.color.length > 3 ? 30 : 0)},
          },

          {
            style: "table",
            absolutePosition: { x: 200, y: 675 + (this.color.length > 3 ? 30 : 0)},
            table: {
              widths: [310],
              heights: [20],
              body: [[{ text: this.denunciante.value, style: "Texto" }]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "NOMBRE\nDENUNCIANTE",
            alignment: "justify",
            style: "Texto",
            absolutePosition: { x: 110, y: 678 + (this.color.length > 3 ? 30 : 0)},
          },

          {
            style: "table",
            absolutePosition: { x: 200, y: 720 + (this.color.length > 3 ? 30 : 0)},
            table: {
              widths: [310],
              heights: [20],
              body: [[{ text: this.domiciliodenunciante, style: "Texto" }]],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
            text: "Domicilio",
            alignment: "justify",
            style: "Texto",
            absolutePosition: { x: 110, y: 725 + (this.color.length > 3 ? 30 : 0)},
          },

          {
            text:
              "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" +
              "A T E N T A M E N T E" +
              "\n\n\n\n\n",
            alignment: "center",
            style: "DePara",
          },
          {
            text: nombre + "\n\n",
            alignment: "center",
            style: "DePara",
          },
          {
            text: puesto + "\n\n",
            alignment: "center",
            style: "DePara",
          },
          {
            text: agencia + "\n\n",
            alignment: "center",
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
          Textob: {
            fontSize: 10,
            alignment: "justify",
            bold: true,
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
    downloadPdfDevolucion(nombre, puesto, agencia,fecha) {

      let me = this;

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
      //Aplico splite al texto para dividirlo en 3 partes, asi tengo en texto principal apara despues colocar la tabla, el segundo texto y posiblemente el tercero
      me.arrayTexts = me.textoDevolucion.split("►");
      //Convertir a texto HTML el cuerpo del documento pero en dos para colocar la tabla en medio
      //***************************************************************************** */
      var textoParte1 = htmlToPdfmake(me.arrayTexts[0]);
      var textoParte2 = htmlToPdfmake(me.arrayTexts[1]);
      var textoParte3 = htmlToPdfmake(me.arrayTexts[2]);
      //***************************************************************************** */
      if(me.asunto == "[object Object]")
      {
        me.asunto = me.asunto.text;
      }
      //***************************************************************************** */
      var agenciainfodr = this.agenciainfo["direccion"];
      var agenciainfotel = this.agenciainfo["telefono"];

      //***************************************************************************** */
      var date = moment(fecha, "YYYY-MM-DD HH:mm:ss");
      var dia = moment(date).format("DD");
      var mes = moment(date).format("MMMM");
      var año = moment(date).format("YYYY");
      var fechaNew = dia + " de " + mes + " del " + año;
      //***************************************************************************** */

      // Generar filas dinámicamente
      const filas = [];
      for (let i = 0; i < me.firmasVo.length; i += 2) 
      {
        const fila = [];
        fila.push({ text: 'Vo Bo\n' + me.firmasVo[i].nombreVoBo + '\n' + me.firmasVo[i].puestoVoBo, style: "DePara" });
        if (i + 1 < me.firmasVo.length) 
        {
          fila.push({text: 'Vo Bo\n' + me.firmasVo[i+1].nombreVoBo + '\n' + me.firmasVo[i+1].puestoVoBo, style: "DePara" });
        } 
        else 
        {
          fila.push({ text: "", style: "DePara" }); // Si hay un número impar de datos, agrega una celda vacía
        }
        filas.push(fila);
      }
      //***************************************************************************** */
      var dd2 = {
        pageSize: "LEGAL",
        pageOrientation: "portrait",
        pageMargins: [85, 100, 72, 60],
        footer: function (currentPage, pageCount) {
          const footerContent = [
            {
              image: logo4,
              width: 612,
              absolutePosition: { x: 0, y: 0 },
            },
            {
              text:
                "Pachuca de Soto, Hidalgo, C.P 42084" +
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
            text:  u_agencia,
            style: "Titulo",
            alignment: "right",
          },
          {
            text: "NUC: " + nuc,
            style: "Titulo",
            alignment: "right",
          },
          me.nucRelForanea == true? 
          {
            text: "REL: " + me.carpetaRelaForanea,
            style: "Titulo",
            alignment: "right",

          }
          : "",
          {
            text: "OFICIO: " + me.noOficioD,
            style: "Titulo",
            alignment: "right",
          },
          {
            text: "ASUNTO: DEVOLUCION EN " + me.asunto,
            style: "Titulo",
            alignment: "right",
          },
          {
            text:
            "\n\n" + 
              this.u_distrito +
              ", Hidalgo a " +
              fechaNew,
            style: "Fecha",
            alignment: "right",
          },
          {
            text: "\n\n" + me.dirigidoA + "\n",
            style: "DePara",
          },
          {
            text: "PRESENTE\n\n",
            style: "DePara",
          },
          {
            text: textoParte1,
            style: "Texto",
          },
          {
            text: "\n",
            style: "Texto",
          },
          {
            style: "table",
            table: {
              headerRows: 1,
              widths: [115,115],
              heights: [15,15,15,15,15,15,15],
              body: 
              [
                [
                  { text: "MARCA: ", style: "DePara" },
                  { text: me.infoVehiculo.marca, style: "DePara" }
                ],
                [
                  { text: "TIPO: ", style: "DePara" },
                  { text: me.infoVehiculo.tipo, style: "DePara" }
                ],
                [
                  { text: "AÑO MODELO", style: "DePara" },
                  { text: me.infoVehiculo.ano, style: "DePara" }
                ],
                [
                  { text: "No. DE SERIE ORIGINAL", style: "DePara" },
                  { text: me.infoVehiculo.serie, style: "DePara" }
                ],
                [
                  { text: "No. DE MOTOR ORIGINAL", style: "DePara" },
                  { text: me.infoVehiculo.noSerieMotor, style: "DePara" }
                ],
                [
                  { text: "PLACAS", style: "DePara" },
                  { text: me.infoVehiculo.placas, style: "DePara" }
                ],
                [
                  { text: "COLOR:", style: "DePara" },
                  { text: me.infoVehiculo.color, style: "DePara" }
                ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 1 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 1 : 1;
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
                // Alinea la tabla al centro del documento
            },    
            margin: [100, 0, 100, 0]   
          },
          {
            text: "\n",
            style: "Texto",
          },
          {
            text: textoParte2,
            style: "Texto",
          },
          {
            text: "\n\n",
            style: "Texto",
          },
          {
            text: textoParte3,
            style: "Texto",
          },
          {
            text:
              "\n\n\n" +
              "A T E N T A M E N T E" +
              "\n\n\n",
            alignment: "center",
            style: "DePara",
          },
          {
            text: nombre + "\n",
            alignment: "center",
            style: "DePara",
          },
          {
            text: puesto + "\n",
            alignment: "center",
            style: "DePara",
          },
          {
            text: agencia + "\n",
            alignment: "center",
            style: "DePara",
          },
          {
            text: "\n",
            style: "Texto",
          },
          me.masFirmas == true? 
          {
            style: "centeredTable",
            table: {
              headerRows: 1,
              colSpan: 3,
              widths: ["*", "*"],
              body: 
              [
                ...filas
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 0 : 0;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 0 : 0;
              },
              hLineColor: function (i, node) {
                return i === 0 || i === node.table.body.length
                  ? "white"
                  : "gray";
              },
              vLineColor: function (i, node) {
                return i === 0 || i === node.table.widths.length
                  ? "white"
                  : "gray";
              },
            },       
          }
          : "",
          {
            text: "\n" + me.ccp,
            style: "PiePagina",
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
          },
          Texto: {
            fontSize: 10,
            alignment: "justify",
          },
          Textob: {
            fontSize: 10,
            alignment: "justify",
            bold: true,
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
            centeredTable: {
            alignment: 'center', // Centrar la tabla
          },
        },
      };

      return dd2;

    },
    mostrarpdfDevolucion(nombre, puesto, agencia,fecha)
    {
      let me = this;
      var dd2 = me.downloadPdfDevolucion(nombre, puesto, agencia, fecha);
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
      var doc = pdfMake.createPdf(dd2);
      var f = document.getElementById("iframepdf2");
      var callback = function (url) {
        f.setAttribute("src", url);
      };
      doc.getDataUrl(callback, doc);
      me.modaldocumentoD = true;
    },
    imprimirpdfDevolucion(nombre, puesto, agencia,fecha) 
    {
      let me = this;

      var dd2 = me.downloadPdfDevolucion(nombre, puesto, agencia,fecha);

      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
      var doc = pdfMake.createPdf(dd2).print();

      setTimeout(() => 
      {
        me.limpiar();
      }, 1000);
    },
    limiteColor() {
      // Limitar a un máximo de 5 selecciones
      if (this.color.length > 5) {
        this.color.pop(); // Eliminar el último elemento si supera el límite
        alert('Solo puedes seleccionar un máximo de 5 colores');
      }
    }
  },
};
</script>
<style>
.espaciado {
  padding: 30px !important;
}
</style>
