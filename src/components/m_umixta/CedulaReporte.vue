<template>
  <v-layout align-start>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular">Cédula de Personas Desaparecidas.</v-toolbar-title>
        <v-divider class="mx-2" inset vertical />
        <v-spacer />
        <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line
          hide-details />
        <v-spacer />
        <v-flex xs12 sm6 md3>
          <v-text-field class="font-weight-regular" v-model="nuc" disabled prepend-icon="folder" filled />
        </v-flex>
        <v-btn class="mx-2" @click="cerrarcarpeta()" fab dark small color="primary">
          <v-icon dark>
            close
          </v-icon>
        </v-btn>
        <v-btn class="mx-2" @click="agregar()" fab dark small color="success">
          <v-icon dark>
            add
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-data-table :headers="headers" :items="personasDesap" :search="search" :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination">
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.personaDesap }}</td>
          <td>{{ formatearfechahora(props.item.fechaSys) }}</td>
          <td>{{ props.item.etnia }}</td>
          <td>{{ !props.item.grupoDelictivo? 'Ninguno': props.item.grupoDelictivo }}</td>
          <td>{{ props.item.estadoSalud }}</td>
          <td class="justify-center layout px-0">
            <!--<v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon class="mr-2" v-on="on" @click="editItem(props.item)">
                edit
              </v-icon>
            </template>
            <span>Actualizar información</span>
          </v-tooltip>-->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon color="warning" class="mr-2" v-on="on" @click="reImprimirCedula(props.item)">
                  print
                </v-icon>
              </template>
              <span>Imprimir Cédula</span>
            </v-tooltip>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="listarPersonaDesaparecida()">Resetear</v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="modalAdd" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-avatar size="30">
              <v-icon>{{ formIcon }}</v-icon>
            </v-avatar>
            <v-toolbar-title class="subheading">{{ formTitle }}</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
              <v-btn color=success text @click.native="guardarInformacionCedula()">
                GUARDAR INFORMACIÓN
              </v-btn>
              <v-btn icon @click="close()">
                <v-icon>
                  close
                </v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-stepper v-model="step" non-linear vertical>
            <v-stepper-step :complete="step > 1" step="1" editable :rules="[() =>
              !errors.has('persona') &&
              !errors.has('estado de salud') &&
              !errors.has('adicciones') &&
              !errors.has('padecimiento') &&
              !errors.has('Compañia') &&
              !errors.has('fecha de avistamento') &&
              !errors.has('hora de avistamento') &&
              !errors.has('persona que acompañaba') &&
              !errors.has('relación') &&
              !errors.has('MarcaTelefono') &&
              !errors.has('datos de localización') &&
              !errors.has('vestimenta y accesorios') &&
              !errors.has('imagen') &&
              !errors.has('tipo persona') 
            ]">
              Datos de la persona desaparecida o no localizada.
            </v-stepper-step>
            <v-stepper-content step="1">
              <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                <v-container grid-list-lg>
                  <v-layout wrap justify-space-between>
                    <v-flex xs12 md5 lg5>
                      <v-autocomplete name="persona" :items="personas" v-model="personaId" return-object
                        v-validate="'required'" label="*Persona desaparecida o no localizada:"
                        v-on:change="buscarEdadActividad" :error-messages="errors.collect('persona')" />

                      <v-radio-group v-model="persona" :error-messages="errors.collect('tipo persona')" v-validate="'required'" name="tipo persona">
                        <v-radio
                        label="Persona Desaparecida"
                        value="PERSONA DESAPARECIDA"
                        color="success">
                      </v-radio>
                        <v-radio
                        label="Persona No Localizada"
                        value="PERSONA NO LOCALIZADA"
                        color="success">
                      </v-radio>
                      </v-radio-group>

                      <v-autocomplete :items="relacionados" v-model="relacionPersonaDenunciante"
                        label="Relación del denunciante con el desaparecido:" />

                      <v-text-field name="estado de salud" v-model="estadoSalud" label="*Estado de salud actual"
                        v-validate="'required'" :error-messages="errors.collect('estado de salud')" />
                      <v-text-field name="adicciones" v-model="adicciones" label="*Adicciones" v-validate="'required'"
                        :error-messages="errors.collect('adicciones')" />
                      <v-text-field name="etnia" v-model="etnia" label="Etnia" />

                      <v-switch label="Portaba aparatos de comunicación" v-model="portabaMedioComunicacion"
                        color="success" hide-details />

                      <v-autocomplete name="companiaTelefonoCombo" :items="companiasTelefono"
                        v-model="IdOperadoraTelefono" return-object v-if="portabaMedioComunicacion"
                        v-validate="'required'" label="Compañía Operadora del Dispositivo:"
                        :error-messages="errors.collect('Compañia')" />
                      <v-select name="MarcaTelefonoCombo" :items="marcasTelefono" v-model="IdMarcaTelefono"
                        return-object v-if="portabaMedioComunicacion" v-validate="'required'"
                        label="Marca del Dispositivo" :error-messages="errors.collect('MarcaTelefono')" />
                      
                      <v-text-field name="Otra Marca" v-if="IdMarcaTelefono.text === 'OTRA'" v-model="OtraMarca" label="Otra marca:"/>  

                      <v-switch label="¿Pertenece a un grupo delictivo?" v-model="pergrupod" color="success"
                        hide-details />

                      <v-text-field v-if="pergrupod" name="grupoDelictivo" v-model="grupoDelictivo" return-object
                        label="Nombre del grupo delictivo" />
                      <v-text-field v-if="pergrupod" name="procedenciaGrupoDelictivo" v-model="procedenciaGrupoDelictivo"
                        label="Procedencia del grupo delictivo" />
                    </v-flex>
                    <v-divider class="mx-2" inset vertical />
                    <v-flex xs12 md6 lg6>
                      <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="fechaA"
                        transition="scale-transition" offset-y min-width="290px" max-width="290px">
                        <template v-slot:activator="{ on }">
                          <v-text-field name='fecha de avistamento' v-model="fechaAvistamiento"
                            label="*Fecha de último avistamento" prepend-icon="event" readonly v-on="on"
                            v-validate="'required'" :error-messages="errors.collect('fecha de avistamento')" />
                        </template>
                        <v-date-picker locale="es" v-model="fechaA" no-title scrollable>
                          <v-spacer />
                          <v-btn text color="primary" @click="menu1 = false">
                            Cancel
                          </v-btn>
                          <v-btn text color="primary" @click="seleccionarFecha()">
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                      <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                        :return-value.sync="horaAvistamiento" transition="scale-transition" offset-y max-width="290px"
                        min-width="290px">
                        <template v-slot:activator="{ on }">
                          <v-text-field name='hora de avistamento' v-model="horaAvistamiento"
                            label="*Hora de último avistamento" prepend-icon="access_time" readonly v-on="on"
                            v-validate="'required'" :error-messages="errors.collect('hora de avistamento')" />
                        </template>
                        <v-time-picker v-if="menu2" v-model="horaAvistamiento" full-width />
                        <v-card>
                          <v-card-actions>
                            <v-spacer />
                            <v-btn text color="primary" @click="$refs.menu2.save(horaAvistamiento)">
                              OK
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-menu>

                      <v-switch label="¿El denunciante acompañaba a la persona a localizar?" v-model="acompanabaDenunciante"
                        color="success" hide-details />


                      <v-text-field name="persona que acompañaba" v-model="nombrePersonaAcompanaba"
                        label="*Persona con quien estaba o se comunico en el ultimo avistamento" v-validate="'required'"
                        :error-messages="errors.collect('persona que acompañaba')" />
                      <v-text-field name="relación" v-model="relacionPersonaAcompanaba"
                        label="*Relación de la persona con quien estaba" v-validate="'required'"
                        :error-messages="errors.collect('relación')" />
                      <v-text-field name="datos de localización" v-model="localizacionPersonaAcompanaba"
                        label="*Datos de localización de la persona con quien estaba" v-validate="'required'"
                        :error-messages="errors.collect('datos de localización')" />
                      <v-text-field maxlength="1000" name="vestimenta y accesorios" v-model="vestimentaAccesorios"
                        label="*Vestimenta y accesorios" v-validate="'required'"
                        :error-messages="errors.collect('vestimenta y accesorios')" />

                      <br />
                      <v-toolbar color="primary" dark>
                        <v-toolbar-title>Fotografía</v-toolbar-title>
                        <v-spacer />

                      </v-toolbar>
                      <v-card>
                        <v-container fluid grid-list-md>
                          <v-layout row wrap>
                            <v-flex class="text-md-center">
                              <img :src="imageUrl" height="150px" />
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card>
                      <v-text-field readonly label="Seleccione una fotografía de la persona desaparecida" @click='pickFile' name="imagen"
                        v-model='imageName' prepend-icon='attach_file' v-validate="'required'" :error-messages="errors.collect('imagen')" />
                      <input type="file" style="display: none" ref="image" name="imagen" @change="onFilePicked" accept="image/jpeg, image/jpg"/>

                    </v-flex>

                  </v-layout>
                  <v-spacer />
                  <div class="text-xs-right">
                    <v-btn color="primary" @click.native="step = 2">
                      Continuar
                    </v-btn>
                  </div>
                </v-container>
              </v-card>
            </v-stepper-content>



            <v-stepper-step :complete="step > 2" step="2" editable :rules="[() =>
              !errors.has('hechos')
            ]">
              Descripción de los Hechos
            </v-stepper-step>


            <v-stepper-content step="2">


              <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                <v-container grid-list-lg>
                  <v-layout wrap justify-space-between>
                    <v-flex xs12 sm12 md12 lg12>
                      <v-card elevation="0">
                        <v-card-title>
                          <h3>Descripción de los hechos relacionados con la desaparición de la persona:</h3>
                        </v-card-title>
                        <v-divider />
                        <v-card-text>
                          <v-form>
                            <vue-editor name="hechos" v-model="hechos" v-validate="'required'" outline height=350px;
                              style="max-height: 310px; overflow-y: scroll" :editorToolbar="customToolbar"
                              :error-messages="errors.collect('hechos')" />
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <div class="text-xs-right">
                    <v-btn flat @click.native="step = 1">Anterior</v-btn>
                    <v-btn color="primary" @click.native="step = 3">Continuar</v-btn>
                  </div>
                </v-container>
              </v-card>
            </v-stepper-content>

            <v-stepper-step :complete="step > 3" step="3" editable :rules="[() =>
              !errors.has('calle') &&
              !errors.has('pais') &&
              !errors.has('estado') &&
              !errors.has('municipio') &&
              !errors.has('localidad')
            ]">
              Direccion donde desempeña la ocupacion
            </v-stepper-step>
            <v-stepper-content step="3">
              <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                <v-container grid-list-lg>
                  <v-layout wrap justify-space-between>
                    <v-flex xs12 md5 lg5>
                      <v-text-field label="*Calle" name="calle" v-if="personaOcupacion" v-model="calleOcupacion"
                        v-validate="'required'" :error-messages="errors.collect('calle')" />
                      <v-text-field name="noInt" label="No. Interior" v-if="personaOcupacion" v-model="noIntOcupacion" />
                      <v-text-field name="noExt" label="No. Exterior" v-if="personaOcupacion" v-model="noExtOcupacion" />
                      <v-text-field name="entreCalle1" label="Entre calle 1" v-if="personaOcupacion"
                        v-model="entreCalle1Ocupacion" />
                      <v-text-field name="entreCalle2" label="Entre calle 2" v-if="personaOcupacion"
                        v-model="entreCalle2Ocupacion" />
                      <v-text-field name="referencia" label="Referencia" v-if="personaOcupacion"
                        v-model="referenciaOcupacion" />
                        <h4 color="gray" v-if="!personaOcupacion">No se ha registrado ninguna ocupación asociada a esta persona.</h4>
                    </v-flex>
                    <v-divider class="mx-2" inset vertical />
                    <v-flex xs12 md6 lg6>
                      <v-text-field label="*Pais" name="pais" v-if="personaOcupacion" v-model="paisOcupacion"
                        value="México" v-validate="'required'" :error-messages="errors.collect('pais')" />
                      <v-autocomplete name="estado" v-model="estadoid" :items="ciudades" label="*Estado" return-object
                        v-if="personaOcupacion" v-on:change="listarPorEstado" v-validate="'required'"
                        :error-messages="errors.collect('estado')" />
                      <v-autocomplete label="*Municipio" name="municipio" v-model="municipioid" :items="municipios"
                        return-object v-if="personaOcupacion" v-on:change="listarPorMunicipio" v-validate="'required'"
                        :error-messages="errors.collect('municipio')" />
                      <v-autocomplete label="*Localidad" name="localidad" v-model="localidadid" :items="localidades"
                        return-object v-if="personaOcupacion" v-on:change="listarPorLocalidad" v-validate="'required'"
                        :error-messages="errors.collect('localidad')" />
                      <v-text-field label="Código postal" name="cp" v-if="personaOcupacion" v-model="cpOcupacion"
                        disabled />
                    </v-flex>
                  </v-layout>
                  <div class="text-xs-right">
                    <v-btn flat @click.native="step = 2">
                      Anterior
                    </v-btn>
                    <v-btn color="primary" @click.native="step = 4">
                      Continuar
                    </v-btn>
                  </div>
                </v-container>
              </v-card>
            </v-stepper-content>
            <v-stepper-step :complete="step > 4" step="4" editable :rules="[() =>
              !errors.has('tipo') &&
              !errors.has('color') &&
              !errors.has('marca') &&
              !errors.has('modelo') &&
              !errors.has('año')
            ]">
              Vehiculo involucrado
            </v-stepper-step>
            <v-stepper-content step="4">
              <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                <v-container grid-list-xl>
                  <v-layout wrap justify-space-between>
                    <v-flex xs12 md5 lg5>
                      <v-switch v-model="vehiculoInvolucrado" label="¿Hubo un Vehículo Involucrado?" color="success"
                        hide-details />
                      <v-autocomplete name="marca" :items="marcas" v-model="marca" return-object @change="listarModelos()"
                        label="*Marca:" v-validate="'required'" v-if="vehiculoInvolucrado"
                        :error-messages="errors.collect('marca')" />
                      <v-autocomplete name="tipo" :items="tipos" v-model="tipo" label="*Tipo:" return-object
                        v-if="vehiculoInvolucrado" v-validate="'required'" :error-messages="errors.collect('tipo')" />
                      <v-autocomplete name="modelo" :items="modelos" v-model="modelo" label="*Modelo:"
                        v-if="vehiculoInvolucrado" return-object v-validate="'required'"
                        :error-messages="errors.collect('modelo')" />
                      <v-text-field name="serie" label="Serie:" v-model="serie" v-if="vehiculoInvolucrado" />
                      <v-text-field name="propietario" v-model="propietario" label="Propietario:"
                        v-if="vehiculoInvolucrado" />
                      <v-text-field name="placa" label="Placas:" v-model="placa" v-if="vehiculoInvolucrado"
                        data-vv-scope="dialogo1" />

                    </v-flex>
                    <v-divider class="mx-2" inset vertical />
                    <v-flex xs12 md6 lg6>
                      <v-autocomplete name="color" :items="colores" v-model="color" v-validate="'required'"
                        label="*Color:" v-if="vehiculoInvolucrado" return-object
                        :error-messages="errors.collect('color')" />
                      <v-switch v-if="vehiculoInvolucrado" label="Vehículo de Servicio Público"
                        v-model="transportePublico" color="success" hide-details />

                      <v-autocomplete name="Estado" :items="ciudades" v-model="idEstadoVehiculo"
                        label="*Estado de Procedencia del Vehículo:" v-if="vehiculoInvolucrado" 
                        return-object v-validate="'required'" :error-messages="errors.collect('Estado')"/>

                      <v-autocomplete name="año" :items="anos" v-model="ano" label="*Año:" v-if="vehiculoInvolucrado"
                        return-object v-validate="'required'" :error-messages="errors.collect('año')" />
                      <v-text-field name="número de serie de motor" label="Número de serie de motor:"
                        v-if="vehiculoInvolucrado" v-model="motorserie" />
                      <v-text-field name="ruta" label="Ruta" v-model="ruta" v-if="vehiculoInvolucrado" />
                    </v-flex>
                    <v-flex v-if="vehiculoInvolucrado" class="espaciado" xs12 sm12 md12 lg12>
                      <v-card elevation="0">
                        <v-card-title>
                          <h3>Señas Particulares</h3>
                        </v-card-title>
                        <v-divider />
                        <v-card-text>
                          <v-form data-vv-scope="form1">
                            <vue-editor name="señas particulares" v-model="senasparticulares"
                              :editorToolbar="customToolbar" />
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <div class="text-xs-right">
                    <v-btn flat @click.native="step = 3">Anterior</v-btn>
                    <v-btn color="primary" @click.native="step = 5">Continuar</v-btn>
                  </div>
                </v-container>
              </v-card>
            </v-stepper-content>
            <v-stepper-step :complete="step > 5" step="5" editable>
              Redes Sociales
            </v-stepper-step>
            <v-stepper-content step="5">
              <v-card color="white" elevation=0 class="mb-5" height="auto">
                <v-container grid-list-lg>
                  <v-layout wrap justify-space-between>
                    <v-flex xs12 md5 lg5>
                      <v-switch v-model="ExisteredSocial" label="¿Esta persona utiliza alguna red social?" color="success"
                        hide-details />

                        <v-autocomplete name="redSocial" :items="catalogoRedesSociales" v-model="redSocial" v-if="ExisteredSocial"
                        label="*Red Social:" return-object />

                      <v-text-field name="enlace" v-model="enlace" label="Enlace de perfiles" 
                        v-if="ExisteredSocial && redSocial.text != 'Se desconoce' &&  redSocial != ''"/>

                      <v-tooltip bottom v-if="redSocial !=''  && enlace !=''">
                        <template v-slot:activator="{ on }">
                          <v-btn
                            class="mx-2"
                            slot="activator"
                            v-on="on"
                            @click="agregarRedSocial()"
                            fab
                            dark
                            small
                            color="success">
                            <v-icon>add</v-icon>
                          </v-btn>
                        </template>
                        <span>Agregar Red social</span>
                      </v-tooltip>
                    </v-flex>
                    <v-divider class="mx-2" inset vertical />
                    <v-flex xs12 md6 lg6>

                        <v-data-table v-if="ExisteredSocial && redSocial.text != 'Se desconoce' &&  redesSociales.length > 0" 
                          :headers="headersRS" 
                          :items="redesSociales">
                        <template slot="items" slot-scope="props">
                          <td class="text-center">{{ props.item.redSocial.text}}</td>
                          <td class="text-center">{{ props.item.enlace}}</td>
                          <td class="text-center">
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }" >
                                <v-icon
                                  class="mr-2" v-on="on" color="default"
                                  @click="borrarredSocial(props.item)"
                                  >
                                  delete
                                </v-icon>
                              </template>
                              <span>Quitar red social</span>
                            </v-tooltip>
                        </td>
                        </template>
                      </v-data-table> 

                    </v-flex>
                      
                  </v-layout>
                  <div class="text-xs-right">
                    <div class="text-xs-right">
                      <v-btn flat @click.native="step = 4">Anterior</v-btn>
                    </div>
                  </div>
                </v-container>
              </v-card>
            </v-stepper-content>
          </v-stepper>
        </v-card>
      </v-dialog>
      <v-dialog v-model="modaldocumento" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Documento.</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
              <v-btn v-if="editedIndex == -1" color=success text @click.native="guardar()">
                Guardar e imprimir
              </v-btn>
              <v-btn v-if="editedIndex == 1" color=success text @click.native="actualizar()">
                Actualizar e imprimir
              </v-btn>
              <v-btn icon @click="modaldocumento = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <iframe id="iframepdf" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no" />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import VeeValidate from 'vee-validate'
import { WebCam } from "vue-web-cam"
import n401 from './401.vue'
import n403 from './403.vue'
import { error } from 'util'
import alertify from 'alertifyjs'
import moment from 'moment'
import { generarCedulaPDF } from './cedulaReporte/generarPDF'
import { getBase64ImageFromURL } from './libraries/getBase64ImageFromURL'
import 'moment/locale/es'
import QRCode from 'qrcode';

var assert, curp, persona
assert = require('assert')
curp = require('curp.js')

export default {
  components: {
    "vue-web-cam": WebCam,
    n401,
    n403
  },
  data: () => ({
    /* Datos vista */

    step: 1,
    menu1: false,
    menu2: false,
    persona:'',
    OtraMarca:'',
    /* Datos de la persona desaparecida */
    relacionPersonaAcompanaba: '',
    relacionPersonaDenunciante:'',
    estadoSalud: '',
    adicciones: '',
    padecimiento: '',
    etnia: '',
    portabaMedioComunicacion: false,
    pergrupod: false,
    acompanabaDenunciante: false,
    redesSociales: [],
    grupoDelictivo: '',
    procedenciaGrupoDelictivo: '',
    fechaAvistamiento: '',
    fechaAvistamientoActualizar: '',
    idDocupacion: '',
    idVehDesaparicionPersona: '',
    horaAvistamiento: '',
    nombrePersonaAcompanaba: '',
    localizacionPersonaAcompanaba: '',
    vestimentaAccesorios: '',
    vehiculoInvolucrado: false,
    personaOcupacion: false,
    personasDesap: [],
    lugarespecificoH: '',
    /* Direccion */
    calle: '',
    noInt: '',
    noExt: '',
    entreCalle1: '',
    entreCalle2: '',
    referencia: '',
    pais: 'México',
    /* Direccion donde desempeña la ocupacion */
    calleOcupacion: '',
    noIntOcupacion: '',
    noExtOcupacion: '',
    entreCalle1Ocupacion: '',
    entreCalle2Ocupacion: '',
    referenciaOcupacion: '',
    paisOcupacion: 'México',
    cpOcupacion: '',
    estadoOcupacion: '',
    municipioOcupacion: '',
    localidadOcupacion: '',
    /* Direccion persona denuncia */
    calleD: '',
    numeroD: '',
    coloniaD: '',
    municipioD: '',
    estadoD: '',
    paisD: '',
    cpD: '',
    referenciaD: '',
    /* Consumo */
    estados: [],
    estado: '',
    estadoid: '',
    ciudades: [],

    calle: '',
    cp: '',
    municipio: '',
    municipioid: '',
    municipios: [],
    localidad: '',
    localidadid: '',
    localidades: [],
    /* Vehiculo */
    marcas: [],
    marca: '',
    tipos: [],
    transportePublico: false,
    idEstadoVehiculo: '',
    tipo: [],
    modelos: [],
    modelo: '',
    serie: '',
    propietarios: [],
    propietario: '',
    placa: '',
    colores: [],
    color: '',
    anos: [],
    ano: '',
    motorserie: '',
    ruta: '',
    senasparticulares: '',
    customToolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['align', { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
    ],
    /* Relacion del denunciante con el desaparecido */
    relacionados: [
      { text: 'Abuelo(a)', value: 'Abuelo(a)' },
      { text: 'Cónyuge o pareja', value: 'Cónyuge o pareja' },
      { text: 'Amigo', value: 'Amigo' },
      { text: 'Expareja', value: 'Expareja' },
      { text: 'Hermano(a)', value: 'Hermano(a)' },
      { text: 'Hijo(a)', value: 'Hijo(a)' },
      { text: 'Jefe(a) o patron(a)', value: 'Jefe(a) o patron(a)' },
      { text: 'Madre o padre', value: 'Madre o padre' },
      { text: 'Nieto(a)', value: 'Nieto(a)' },
      { text: 'Novio(a)', value: 'Novio(a)' },
      { text: 'Padrastro/madrastra', value: 'Padrastro/madrastra' },
      { text: 'Primo(a)', value: 'Primo(a)' },
      { text: 'Sobrino(a)', value: 'Sobrino(a)' },
      { text: 'Tio(a)', value: 'Tio(a)' },
      { text: 'Vecino(a)', value: 'Vecino(a)' },
      { text: 'Conocido(a)', value: 'Conocido(a)' },
      { text: 'Ninguno', value: 'Ninguno' }
    ],
    /* Ultima Ubicacion */
    calleH: '',
    noIntH: '',
    noExtH: '',
    referenciaH: '',
    paisH: '',
    estadoH: '',
    municipioH: '',
    localidadH: '',
    cpH: '',
    /* redeso sociales */
    catalogoRedesSociales: [],
    redesSocialesBusqueda: [],
    fechaA: '',
    fechaGuardar: '',
    u_iddistrito: '',
    u_distrito: '',
    u_dirSubPro: '',
    u_nombre: '',
    u_rol: '',
    u_puesto: '',
    u_subproc: '',
    headers: [
      { text: 'Nombre del Desaparecido', value: 'desaparecido' },
      { text: 'Fecha de registro', value: 'fechaSys' },
      { text: 'Etnia', value: 'Etnia' },
      { text: 'Grupo Delictivo', value: 'Grupo Delictivo', },
      { text: 'Estado de Salud', value: 'Estado de Salud', },
      { text: 'Opciones', value: 'opciones', sortable: false },
    ],
    search: '',
    rowsPerPageItems: [10, 20, 30, 40, 50],
    pagination: {
      rowsPerPage: 20
    },
    modalAdd: 0,
    modaldocumento: false,
    editedIndex: -1,
    rHechoId: '',
    listaimputados: [],
    e401: false,
    e403: false,
    showpage: true,
    base64:
    {
      logo3: '',
      logo4: '',
      contenidoPDF: '',
    },

    u_agencia: '',
    nuc: '',
    pupilentes: false,
    cicatriz: false,
    tatuaje: false,
    dentaduracompleta: true,
    peso: '',
    estatura: '',
    gruposanguineo: '',
    complexion: '',
    tez: '',
    formacara: '',
    tipoojo: '',
    formaojo: '',
    coloOjo: '',
    formaCabello: '',
    personaIdD: '',
    personaId: [],
    ppersonas: [],
    personas: [],
    //RESEÑA DE LOS HECHOS
    hechos: '',
    //COMBOS DE COSAS DE CELULARES
    companiasTelefono: [],
    marcasTelefono: [],
    IdOperadoraTelefono: '',
    IdMarcaTelefono: '',
    imageName: '',
    imageFile: '',
    imageUrl: '',
    imageStoredURL: '',
    rAtencionId: '',
    rBreve: '',
    agenciainfo: [
      { text: 'direccion', value: '' },
      { text: 'telefono', value: '' },
    ],
    docCedulaDes: 'Cedula de desaparicion',
    vistaPreviaTF: false,
    MEdFilLarPer:[],
    idPersonaDesap:'',
    redSocial:[],
    enlace:'',
    ExisteredSocial: false,
    headersRS: [
    { text: "Red Social", value: "Red Social" },
    { text: "Enlace", value: "Enlace" },
    { text: "Opciones", value: "opciones", sortable: false },
    ],
    etapaC: '',
    statusC: '',
    horapdf: '', 
    sinDenunciante:''
  }),
  created() {
    let me = this
    me.rHechoId = me.$store.state.rhechoid
    me.rAtencionId = me.$store.state.ratencionid
    me.nuc = me.$store.state.nuc
    if (me.rHechoId == null) {
      me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpeta y luego en Listar carpeta',
        function () {
          me.$router.push('./umixta-carpetas')
        })
    } else {
      me.$notify('Carpeta abierta correctamente !!!', 'success')
      me.u_iddistrito = me.$store.state.usuario.iddistrito
      me.u_distrito = me.$store.state.usuario.distrito
      me.u_dirSubPro = me.$store.state.usuario.dirSubProc
      me.u_agencia = me.$store.state.usuario.agencia
      me.u_idmoduloservicio = me.$store.state.usuario.idmoduloservicio;
      me.u_modulo = me.$store.state.usuario.modulo;
      me.u_idusuario = me.$store.state.usuario.idusuario;
      me.u_nombre = me.$store.state.usuario.usuario
      me.u_rol = me.$store.state.usuario.rol
      me.u_puesto = me.$store.state.usuario.puesto
      me.u_subproc = me.$store.state.usuario.subProc
      me.listardireccionhecho()
    }
    // Add a request interceptor
    axios.interceptors.request.use((config) => {
      // Do something before request is sent
      this.$store.commit('LOADER', true)
      return config
    }, (error) => {
      // Do something with request error
      this.$store.commit('LOADER', false)
      return Promise.reject(error)
    })
    // Add a response interceptor
    axios.interceptors.response.use((response) => {
      this.$store.commit('LOADER', false)
      // Do something with response data
      return response
    }, (err) => {
      // Do something with response error
      return new Promise((resolve, reject) => {
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/login')
        })
        throw err
      })
    })
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Registrar Persona Desaparecida' : 'Actualizar información'
    },
    formIcon() {
      return this.editedIndex === -1 ? 'add' : 'edit'
    },
  },
  watch: {

    ExisteredSocial(val){
      if(val === false){
        this.redSocial = '';
        this.enlace = '';
        this.redesSociales = [];
      }
    },
    redSocial(val){
      if(val.text === 'Se desconoce'){
        this.enlace = '';
        this.redesSociales = [];
      }
    }

  },
  methods: {
    listarDenunciante(){
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }
      this.$cat.get('api/RAPs/ListarDenunciante/' + me.rAtencionId, configuracion).then(function (response) {
          me.sinDenunciante = response.data.ner;

          if(me.sinDenunciante === 1){
            alertify.alert("No hay ninguna persona registrada con la clasificación de Denunciante. Para poder registrar una Cédula de Reporte, registre a una persona con esta clasificación.",
                function(){
                    me.$router.push('./umixta-victimaidti');
                });
          }else{
            me.nombreD = response.data.nombre,
            me.apellidoPD = response.data.apellidoPaterno,
            me.apellidoMD = response.data.apellidoMaterno,
            me.ocupacionD = response.data.ocupacion,
            me.correoD = response.data.correo,
            me.relacionD = response.data.parentesco,
            me.telefonoD = response.data.telefono1,
            me.edadD = response.data.edad,
            me.rangoedad = response.data.rangoEdad,
            me.personaIdD = response.data.personaId,
            me.iniciales = response.data.alias
            me.listardireccionpersona();
            me.listarPersonaDesaparecida();
          }
      }).catch(err => {
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
      });
    },
    close() {
      this.modalAdd = 0
      this.modaldocumento = false
      this.limpiar()
      this.listarPersonaDesaparecida()
    },
    limpiar() {
      this.listardireccionhecho;
      this.listarrHecho()
      this.listaMediaAfiliacion()
      this.listarPersonas()
      this.listarLogo()
      this.listarCiudades()
      this.listarMarcas()
      this.listarCiudades()
      this.listardireccionhecho()
      this.listarTipos()
      this.listarColores()
      this.listarAnos()
      this.listarCatalogoRedesSociales()
      //this.base64.
      // this.personaId = ''
      this.persona = ''
      this.OtraMarca = ''
      this.step = 1
      this.estadoSalud = ''
      this.adicciones = ''
      this.relacionPersonaDenunciante = ''
      this.hechos = '',
      this.IdOperadoraTelefono = '',
      this.IdMarcaTelefono = '',
      this.padecimiento = ''
      this.etnia = ''
      this.idEstadoVehiculo = ''
      this.portabaMedioComunicacion = false
      this.pergrupod = false
      this.acompanabaDenunciante = false
      this.transportePublico = false
      this.grupoDelictivo = ''
      this.procedenciaGrupoDelictivo = ''
      this.fechaAvistamiento = ''
      this.fechaAvistamientoActualizar = ''
      this.idDocupacion = ''
      this.idVehDesaparicionPersona = ''
      this.horaAvistamiento = ''
      this.nombrePersonaAcompanaba = ''
      this.relacionPersonaAcompanaba = ''
      this.localizacionPersonaAcompanaba = ''
      this.vestimentaAccesorios = ''
      this.calleOcupacion = ''
      this.noIntOcupacion = ''
      this.noExtOcupacion = ''
      this.entreCalle1Ocupacion = ''
      this.entreCalle2Ocupacion = ''
      this.referenciaOcupacion = ''
      this.estadoOcupacion = '',
      this.municipioOcupacion = '',
      this.localidadOcupacion = ''
      this.imageName = '',
      this.imageFile = '',
      this.imageUrl = '',
      this.paisOcupacion = 'México'
      this.cpOcupacion = ''
      this.estados = []
      this.estado = ''
      this.estadoid = ''
      this.ciudades = []
      this.calle = ''
      this.cp = ''
      this.municipio = ''
      this.municipioid = ''
      this.municipios = []
      this.localidad = ''
      this.localidadid = ''
      this.localidades = []
      this.marcas = [],
      this.marca = '',
      this.tipos = [],
      this.tipo = [],
      this.modelos = [],
      this.modelo = '',
      this.serie = '',
      this.propietarios = [],
      this.propietario = '',
      this.placa = '',
      this.colores = [],
      this.color = '',
      this.anos = [],
      this.ano = '',
      this.motorserie = '',
      this.ruta = '',
      this.senasparticulares = '',
      this.personasDesap = []
      this.lugarespecificoH = ''
      this.calleH = ''
      this.noIntH = ''
      this.noExtH = ''
      this.referenciaH = ''
      this.paisH = ''
      this.estadoH = ''
      this.municipioH = ''
      this.localidadH = ''
      this.cpH = ''
      this.idPersonaDesaparecida = ''
      this.ExisteredSocial = false;
      this.redSocial = [];
      this.enlace = '';
      this.redesSociales = [];
      this.personaId = [];
      this.vehiculoInvolucrado = false;
    },
    agregar() {
      let me =this;
      let header = { "Authorization": "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }//rHechoId    u_iddistrito
      me.personas=[]
      this.$cat.get('api/MediaFiliacionDesaparecido/ListarPorRHecho/' + me.rHechoId, configuracion).then(function(response){
        let personasPromises = response.data.map(x =>{
         return this.$cat.get(`api/PersonaDesap/ListarPersonaDesap/${x.personaId}`, configuracion)
            .then(response2 =>{
              if(!response2.data.status){
                me.personas.push({text: x.nombreImputado, value: x.personaId })
              }
            })
        });

        Promise.all(personasPromises).then(() => {
            // Este bloque solo se ejecutará cuando todas las peticiones hayan terminado
            if (response.data != null && response.data.length !== 0 && me.personas.length !== 0) {
                me.editedIndex = -1;
                me.modalAdd = 1;
            } else {
                alertify.alert("Cedula de Desaparición de Personas", "No se puede realizar una Cédula de Personas Desaparecidas porque no se ha creado la Media Filiación de la Persona Desaparecida.<br> Realiza la Media Filiación para la Persona Desaparecida.",
                function(){
                    me.$router.push('./umixta-mediaafiliacion');
                });
            }
        }).catch(error => {
            console.error('Error en alguna de las peticiones:', error);
        });
      }).catch(err => {
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
    listaMediaAfiliacion() {
      let me = this
      let header = { "Authorization": "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }
      this.$cat.get('api/MediaFiliacionDesaparecido/ListarPorRHecho/' + me.rHechoId, configuracion).then(function (response) {
        me.listaimputados = response.data
      }).catch(err => {
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
    listarPersonaDesaparecida() {
      let me = this
      let header = { "Authorization": "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }
      this.$cat.get('api/PersonaDesap/ListarPorRHecho/' + me.rHechoId, configuracion).then(function (response) {
        me.personasDesap = response.data
      }).catch(err => {
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
    editItem(item) {
      this.idPersonaDesaparecida = item.idPersonaDesaparecida
      this.personaId = item.personaId
      this.estadoSalud = item.estadoSalud
      this.adicciones = item.adicciones
      this.relacionPersonaDenunciante = item.relacionPersonaDenunciante
      this.padecimiento = item.padecimiento
      this.etnia = item.etnia
      this.portabaMedioComunicacion = (item.portabaMedioComunicacion == true ? this.portabaMedioComunicacion = 1 : this.portabaMedioComunicacion = 0)
      this.acompanabaDenunciante = (item.acompanabaDenunciante == true ? this.acompanabaDenunciante = 1 : this.acompanabaDenunciante = 0)
      this.grupoDelictivo = item.grupoDelictivo
      this.procedenciaGrupoDelictivo = item.procedenciaGrupoDelictivo
      this.fechaAvistamiento = item.fechaHoraUltAvistamiento.substring(8, 10) + " de " + this.obtenermes(item.fechaHoraUltAvistamiento.substring(5, 7) - 1) + " del " + item.fechaHoraUltAvistamiento.substring(0, 4)
      this.fechaAvistamientoActualizar = item.fechaHoraUltAvistamiento
      this.horaAvistamiento = item.fechaHoraUltAvistamiento.substring(12, 16)
      this.nombrePersonaAcompanaba = item.nombrePersonaAcompanaba
      this.relacionPersonaAcompanaba = item.relacionPersonaAcompanaba
      this.localizacionPersonaAcompanaba = item.localizacionPersonaAcompanaba
      this.vestimentaAccesorios = item.vestimentaAccesorios
      /* Direccion Ocupación */
      this.listarDireccionOcupacion(item.personaId)
      /* Vehiculo involucrado */
      this.listarVehiculoInvolucrado(item.idPersonaDesaparecida)
      /* Redes Sociales */
      this.listarCatalogoRedesSociales()
      this.buscarRedesSociales(item.personaId)
      this.editedIndex = 1
      this.modalAdd = 1
    },
    async listarDireccionOcupacion(personaId) {

      return new Promise((resolve, reject) => {
        let me = this
        let header = { "Authorization": "Bearer " + this.$store.state.token }
        let configuracion = { headers: header }
        this.$cat.get('api/DireccionOcupacion/BuscarDireccionOcupacion/' + personaId, configuracion).then(function (response) {
          if (response.data.length <= 0) {
            me.personaOcupacion = false;
            me.asignarValoresOcupacionDefecto();
          }
          else {
            me.personaOcupacion = true;
            me.idDocupacion = response.data.idDOcupacion,
              me.calleOcupacion = response.data.calle
            me.noIntOcupacion = response.data.noInt
            me.noExtOcupacion = response.data.noExt
            me.entreCalle1Ocupacion = response.data.entreCalle1
            me.entreCalle2Ocupacion = response.data.entreCalle2
            me.referenciaOcupacion = response.data.referencia
            me.estadoOcupacion = response.data.estado
            me.municipioOcupacion = response.data.municipio
            me.localidadOcupacion = response.data.localidad
            me.paisOcupacion = response.data.pais
            me.cpOcupacion = response.data.cp
            //me.selectEstado(me.estadoOcupacion)
          }
          resolve();
        }).catch(err => {
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
          reject();
        })
      })
    },
    asignarValoresVehiculoDefecto() {
      let me = this;
      me.marca = "N/A";
      me.tipo = "N/A";
      me.modelo = "N/A";
      me.color = "N/A";
      me.ano = "N/A";
    },
    asignarValoresOcupacionDefecto() {
      let me = this;
      me.calleOcupacion = 'N/A';
      me.paisOcupacion = 'N/A';
      me.estadoid = 'N/A';
      me.municipioid = 'N/A';
      me.localidadid = 'N/A';
      me.cpOcupacion = 'N/A';
    }
    ,
    async listarVehiculoInvolucrado(personadesaparecidaId) {

      return new Promise((resolve, reject) => {
        let me = this
        let header = { "Authorization": "Bearer " + this.$store.state.token }
        let configuracion = { headers: header }
        this.$cat.get('api/VehiculoDesaparicionPersona/BuscarVehiculos/' + personadesaparecidaId, configuracion).then(function (response) {
          if (response.data.length <= 0) {
            me.vehiculoInvolucrado = false;
            me.asignarValoresVehiculoDefecto();
          }
          else {
            me.vehiculoInvolucrado = true;
            me.tipo = { text: response.data[0].tipov, value: response.data[0].tipovId }
            me.ano = { text: response.data[0].ano, value: response.data[0].anoId }
            me.color = { text: response.data[0].color, value: response.data[0].colorId }
            me.modelo = { text: response.data[0].modelo, value: response.data[0].modeloId }
            me.marca = { text: response.data[0].marca, value: response.data[0].marcaId }
            me.serie = response.data[0].serie
            me.placa = response.data[0].placas
            me.senasparticulares = response.data[0].senasParticulares
            me.motorserie = response.data[0].noSerieMotor
            me.propietario = response.data[0].propietario
            me.ruta = response.data[0].ruta
            me.idEstadoVehiculo = { text: response.data[0].sEstado, value: response.data[0].iEstado }
            me.idVehDesaparicionPersona = response.data[0].idVehDesaparicionPersona
            //me.listarModelosActualizar(response.data[0].marcaId)
          }
          resolve();
        }).catch(err => {

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
          reject();
        })
      })
    },
    async  reImprimirCedula(item) {
      // Informacion Obtenida por el listador 
      let header = { "Authorization": "Bearer " + this.$store.state.token }
        let configuracion = { headers: header }
      this.$cat.get('api/RAPs/ListarDP/' + item.personaId, configuracion).then(function (response) {
            me.calle = response.data.calle
            me.noInt = response.data.noint
            me.noExt = response.data.noext
            me.estado = response.data.estado
            me.municipio = response.data.municipio
            me.localidad = response.data.localidades
            me.municipio = response.data.municipio
            me.localidad = response.data.localidad
            me.pais = response.data.pais
          }).catch(err => {
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
      let me = this;
      me.vistaPreviaTF = false;
      //información desde el objeto seleccionado
      me.personaId = item.personaId
      me.idPersonaDesaparecida = item.idPersonaDesaparecida
      me.hechos = item.descripcionHechos
      me.adicciones = item.adicciones
      me.relacionPersonaDenunciante = item.relacionPersonaDenunciante
      me.estadoSalud = item.estadoSalud
      me.etnia = item.etnia
      me.persona = item.personaCondicion;
      me.horapdf = item.fechaSys;
      me.generarFechaHoraAvistamientoDesdeBD(item.fechaHoraUltAvistamiento);

      me.imageStoredURL = item.fotografiaURL
      me.grupoDelictivo = item.grupoDelictivo
      me.localizacionPersonaAcompanaba = item.localizacionPersonaAcompanaba
      me.IdMarcaTelefono = { text: item.marcaTelefono, value: item.marcaTelefonoId }
      me.nombrePersonaAcompanaba = item.nombrePersonaAcompanaba
      me.padecimiento = item.padecimiento
      me.portabaMedioComunicacion = item.portabaMedioComunicacion
      me.acompanabaDenunciante = item.acompanabaDenunciante
      me.procedenciaGrupoDelictivo = item.procedenciaGrupoDelictivo
      me.relacionPersonaAcompanaba = item.relacionPersonaAcompanaba
      me.vestimentaAccesorios = item.vestimentaAccesorios
      me.hechos = item.descripcionHechos;
      me.IdOperadoraTelefono = { text: item.companiaTelefonica, value: item.companiaTelefonicaId }
      //BUSCAR Y CARGAR LA IMAGEN DESDE EL SERVIDOR

      let desaparecido
      me.ppersonas.map(item => {
        item.personaId == (me.personaId.value == undefined ? me.personaId : me.personaId.value) ? desaparecido = item : null
      });

      let media
      me.listaimputados.map(item => {
        item.personaId == (me.personaId.value == undefined ? me.personaId : me.personaId.value) ? media = item : null
      })
      getBase64ImageFromURL(me.imageStoredURL).then(result => {
        me.imageUrl = result;

        me.listarVehiculoInvolucrado(item.idPersonaDesaparecida).then(result => {

          me.buscarRedesSociales(me.personaId).then(result => {
            me.listarDireccionOcupacion(me.personaId).then(result => {
              try 
              {
                 generarCedulaPDF(me.u_nombre, me.u_puesto, desaparecido, media, me, 0);
                const intervalId = setInterval(() => 
                {
                  const x = me.base64.contenidoPDF;
                  if (x) {
                  clearInterval(intervalId);
                  x.getDataUrl((dataUrl) => {
                    const f = document.getElementById('iframepdf');
                    f.src = '';
                    f.src = dataUrl;
                  });
                  x.print();
                  }
                }, 100); // Esperar 100 ms entre verificaciones
              } catch (err) {
                console.error('Error:', err);
              }

            })// FIN THEN LIDTAR DIRECCION OCUPACION
          }) // FIN THEN BUSCAR REDES SOCIALES
        }) // FIN THEN LISTAR VEHICULO INVOLUCRADO
      }).catch(err => { })
    },


    mostrarpdf(nombre, puesto, agencia) {
      let me = this
      var pdfMake = require('pdfmake/build/pdfmake.js')
      var htmlToPdfmake = require("html-to-pdfmake")
      if (pdfMake.vfs == undefined) {
        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
        pdfMake.vfs = pdfFonts.pdfMake.vfs
      }
      let desaparecido
      me.ppersonas.map(item => {
        item.personaId == (me.personaId.value == undefined ? me.personaId : me.personaId.value) ? desaparecido = item : null
      });

      let media
      me.listaimputados.map(item => {
        item.personaId == (me.personaId.value == undefined ? me.personaId : me.personaId.value) ? media = item : null
      })

      const x = me.base64.contenidoPDF;
      x.getDataUrl((dataUrl) => {
        const f = document.getElementById('iframepdf');
        f.src = '';
        f.src = dataUrl;
      });

      x.print();
    },
    guardarInformacionCedula() {

      if (!this.portabaMedioComunicacion) {
        this.IdOperadoraTelefono = 'N/A';
        this.IdMarcaTelefono = 'N/A'
      }

      this.$validator.validate().then(result => {
        if (result) {
          let me = this
          let header = { "Authorization": "Bearer " + this.$store.state.token }
          let configuracion = { headers: header }
          this.$cat.get('api/RAPs/ListarDP/' + (me.personaId.value == undefined ? me.personaId : me.personaId.value), configuracion).then(function (response) {
            me.calle = response.data.calle
            me.noInt = response.data.noint
            me.noExt = response.data.noext
            me.estado = response.data.estado
            me.municipio = response.data.municipio
            me.localidad = response.data.localidades
            me.municipio = response.data.municipio
            me.localidad = response.data.localidad
            me.pais = response.data.pais
            me.verpdf()
          }).catch(err => {
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
        }else{
          alertify.alert("Notificación","Existen campos obligatorios que están vacíos.",function(){});
        }
      })
    },
    verpdf() {
      let me = this;
      let desaparecido
      me.ppersonas.map(item => {
        item.personaId == (me.personaId.value == undefined ? me.personaId : me.personaId.value) ? desaparecido = item : null
      })

      let media
      me.listaimputados.map(item => {
        item.personaId == (me.personaId.value == undefined ? me.personaId : me.personaId.value) ? media = item : null
      })
      me.$validator.validateAll('crear').then(result => {
        if (result) {
          me.fechas = me.generarfecha()
          me.personanombre = me.personaId.text
          generarCedulaPDF(me.u_nombre, me.u_puesto, desaparecido, media, me, 1); // DESPUES DE VALIDAR SE MANDA CREAR EL PDF
        }
      })
    },
    listarPorEstado() {
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      if (!me.estadoid.value == '') {
        me.estadoOcupacion = me.estadoid.text;
        me.estadoid = me.estadoid.value;
      }
      var municipiosArray = [];
      me.municipios.length = 0;
      this.$conf.get('api/Municipios/ListarPorEstado/' + me.estadoid, configuracion).then(function (response) {
        municipiosArray = response.data;
        municipiosArray.map(function (x) {
          me.municipios.push({ text: x.nombre, value: x.idMunicipio });
        });
        if (me.editedIndex == 1) {
          me.selectMunicipio(me.municipioOcupacion);
        }
      }).catch(err => {
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
      });
    },
    selectMunicipio: function (val) {
      let me = this;
      for (var i = 0; i < me.municipios.length; i++) {
        if (me.municipios[i].text === val) {
          me.municipioid = me.municipios[i].value;
        }
      }
      me.listarPorMunicipio();
    },
    buscarEdadActividad: function () {
      var personaSeleccionada;
      this.ppersonas.every(personaListada => {
        if (personaListada.personaId == this.personaId.value) {
          personaSeleccionada = personaListada;
          return false;
        }
        return true;
      });

      //REVISAR LA OCUPACIÓN DE LA PERSONA DESAPARECIDA
      if (personaSeleccionada.ocupacion == '' || personaSeleccionada.ocupacion == 'Ninguno') {
        this.personaOcupacion = false;
      }
      else {
        this.personaOcupacion = true;
      }

    },
    buscarPorCP() {
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$conf.get('api/Localidads/MostrarPorCP/' + me.cpOcupacion, configuracion).then(function (response) {
        me.estadoid = response.data.idEstado;
        me.listarPorEstado();
        me.municipioid = response.data.idMunicipio;
        me.buscarPorCpMpo()
      }).catch(err => {
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
      });
    },
    selectEstado: function (val) {
      let me = this;
      for (var i = 0; i < me.ciudades.length; i++) {
        if (me.ciudades[i].text === val) {
          me.estadoid = me.ciudades[i].value;
        }
      }
      me.listarPorEstado();
    },
    listarColores() {
      var coloresarray = [];
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$conf.get('api/Color/Listar', configuracion).then(function (response) {
        coloresarray = response.data;
        coloresarray.map(function (x) {
          me.colores.push({ text: x.dato, value: x.idColor });
        });
      }).catch(err => {
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
      });
    },
    listarCiudades() {
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var ciudadesArray = [];
      this.$conf.get('api/Estadoes/Mostrar', configuracion).then(function (response) {
        ciudadesArray = response.data;
        ciudadesArray.map(function (x) {
          me.ciudades.push({ text: x.nombre, value: x.idEstado })
        });
      }).catch(err => {
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
      });
    },
    // FUNCIÓN CUANDO SE SELECCIONA UNA FECHA DEL PROP 
    seleccionarFecha() {
      if (this.menu1) {
        this.generarFechaDesdeSelector();
        this.$refs.menu1.save(this.fechaA);
      }
    },
    generarFechaDesdeSelector() {
      if (this.menu1)
        this.fechaGuardar = this.fechaA
      this.fechaAvistamiento = this.fechaA.substring(8, 10) + " de " + this.obtenermes(this.fechaA.substring(5, 7) - 1) + " del " + this.fechaA.substring(0, 4)
    },
    generarFechaHoraAvistamientoDesdeBD(fecha) {
      let me = this;
      me.fechaAvistamiento = fecha.substring(8, 10) + " de " + me.obtenermes(fecha.substring(5, 7) - 1) + " del " + fecha.substring(0, 4);
      me.horaAvistamiento = fecha.substring(11, 16);
    },
    listarPorMunicipio() {
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      if (!me.municipioid.value == '') {
        me.municipioOcupacion = me.municipioid.text;
        me.municipioid = me.municipioid.value;
      }
      var localidadArray = [];
      me.localidades.length = 0;
      this.$conf.get('api/Localidads/MostrarPorMPO/' + me.municipioid, configuracion).then(function (response) {
        localidadArray = response.data;
        localidadArray.map(function (x) {
          me.localidades.push({ text: x.nombre, value: x.idLocalidad });
        });
        if (me.editedIndex == 1) {
          me.selectLocalidad(me.localidadOcupacion);
        }
      }).catch(err => {
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
      });
    },
    selectLocalidad: function (val) {
      let me = this;
      for (var i = 0; i < me.localidades.length; i++) {
        if (me.localidades[i].text === val) {
          me.localidadid = me.localidades[i].value;
        }
      }
    },
    listarModelos() {
      let me = this
      let header = { "Authorization": "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }
      var modelosarray = []
      me.modelos = []
      me.$conf.get('api/Modelo/ListarId/' + me.marca.value, configuracion).then(function (response) {
        modelosarray = response.data
        modelosarray.map(function (x) {
          me.modelos.push({ text: x.dato, value: x.idModelo })
        });
      }).catch(err => {
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
      });
    },
    listarModelosActualizar(marca) {
      let me = this
      let header = { "Authorization": "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }
      var modelosarray = []
      me.modelos = []
      me.$conf.get('api/Modelo/ListarId/' + marca, configuracion).then(function (response) {
        modelosarray = response.data
        modelosarray.map(function (x) {
          me.modelos.push({ text: x.dato, value: x.idModelo })
        })
      }).catch(err => {
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
    listarPorLocalidad() {
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.localidadOcupacion = me.localidadid.text;
      me.localidadid = me.localidadid.value;
      this.$conf.get('api/Localidads/MostrarPorLocalidad/' + me.localidadid, configuracion).then(function (response) {
        me.cpOcupacion = response.data.cp;
      }).catch(err => {
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
      });
    },
    listarMarcas() {
      var marcasarray = [];
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$conf.get('api/Marca/Listar', configuracion).then(function (response) {
        marcasarray = response.data;
        marcasarray.map(function (x) {
          me.marcas.push({ text: x.dato, value: x.idMarca });
        });
      }).catch(err => {
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
      });
    },
    listarTipos() {
      var tiposarray = [];
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$conf.get('api/Tipov/Listar', configuracion).then(function (response) {
        tiposarray = response.data;
        tiposarray.map(function (x) {
          me.tipos.push({ text: x.dato, value: x.idTipov });
        });
      }).catch(err => {
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
      });
    },
    listarAnos() {
      var anosarray = []
      let me = this
      let header = { "Authorization": "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }
      me.$conf.get('api/Ano/Listar', configuracion).then(function (response) {
        anosarray = response.data
        anosarray.map(function (x) {
          me.anos.push({ text: x.dato, value: x.idAno });
        });
      }).catch(err => {
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
      });
    },
    listardireccionpersona() {
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$cat.get('api/RAPs/ListarDP/' + me.personaIdD, configuracion).then(function (response) {
        me.calleD = response.data.calle,
          me.numeroD = response.data.noint,
          me.numeroE = response.data.noext,
          me.coloniaD = response.data.localidad,
          me.municipioD = response.data.municipio,
          me.estadoD = response.data.estado,
          me.paisD = response.data.pais,
          me.cpD = response.data.cp,
          me.referenciaD = response.data.referencia
      }).catch(err => {
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
          me.$notify("El recurso no ha sido encontrado", 'error')
        } else {
          me.$notify('Error al intentar listar los registros!!!', 'error')
        }
      });
    },
    listarPersonas() {
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var personasArray = [];
      this.$cat.get('api/RAPs/ListarTodosFull/' + me.rAtencionId, configuracion).then(function (response) {
        personasArray = response.data;
        me.ppersonas = response.data;
        personasArray.map(function (x) {
          if(x.clasificacionPersona === 'Victima directa' && x.registro === true)
          {
            me.idPersonaDesap = x.personaId
          }

        });
        if(personasArray.every(item => item.registro === false)){
            alertify.alert("Notificación","No hay persona relacionada con tema de desaparición.",
                function(){
                    me.$router.push('./umixta-victimaidti');
                });
          }
      }).catch(err => {
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
      });
    },
    listarMarcasTelefonos() {
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var tmpMarcas = [];
      this.$conf.get('api/MarcaTelefono/ListarMarcaTelefonoActiva/', configuracion).then(function (response) {
        tmpMarcas = response.data;
        tmpMarcas.map(function (x) {
          me.marcasTelefono.push({ text: x.nombre, value: x.idMarcaTelefono });
        });
      }).catch(err => {
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
      });
    },
    listarOperadoras() {
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var tmpCompanias = [];
      this.$conf.get('api/CompaniaTelefonica/ListarCompaniaTelefonicaActiva/', configuracion).then(function (response) {
        tmpCompanias = response.data;

        tmpCompanias.map(function (x) {
          me.companiasTelefono.push({ text: x.nombre, value: x.idCompaniaTelefonica });
        });
      }).catch(err => {
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
      });
    },
    pickFile() {
      this.removeImage()
      this.$refs.image.click()
    },
    removeImage() {
      this.$refs.image.value = ''
    },
    onFilePicked(e) {
      const files = e.target.files
      const validImageTypes = ['image/jpeg', 'image/jpg'];

      if (files[0] && validImageTypes.includes(files[0].type)) {
        this.imageName = files[0].name;
      } else {
        alertify.error('Por favor, selecciona un archivo de imagen válido (jpeg, jpg).');
        this.$refs.image.value = '';
      }

      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    },
    listarrHecho() {
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$cat.get('api/RHechoes/ListarPorId/' + me.rHechoId, configuracion).then(function (response) {
        me.rBreve = response.data.rBreve,
          me.fechaElevaNuc = response.data.fechaElevaNuc,
          me.agenciaid = response.data.agenciaid,
          me.rAtencionId = response.data.rAtencionId,
          me.etapaC = response.data.etapacarpeta;
          me.statusC = response.data.statuscarpeta;
          // me.listarrap();
          me.listarDenunciante()
        me.informacionagencia();
      }).catch(err => {
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
      });
    },
    generarfecha() {
      var fecha;
      fecha = moment().format('DD') + " de " + moment().format('MMMM') + " del " + moment().format("YYYY");
      return fecha;
    },
    obtenermes: function (mes) {
      if (mes == 0) return "Enero"
      if (mes == 1) return "Febrero"
      if (mes == 2) return "Marzo"
      if (mes == 3) return "Abril"
      if (mes == 4) return "Mayo"
      if (mes == 5) return "Junio"
      if (mes == 6) return "Julio"
      if (mes == 7) return "Agosto"
      if (mes == 8) return "Septiembre"
      if (mes == 9) return "Octubre"
      if (mes == 10) return "Noviembre"
      if (mes == 11) return "Diciembre"
    },
    listarLogo() {
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      this.$conf.get('api/ConfGlobals/Listar', configuracion).then(function (response) {
        me.base64.logo3 = response.data.logo3;
        me.base64.logo4 = response.data.logo4;
      }).catch(err => {
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
      });
    },
    formatearfechahora: function (fecha) {
      return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
    },
    cerrarcarpeta() {
      this.$store.state.rHechoId = null;
      this.$store.state.nuc = null;
      this.$router.push('./umixta-carpetas')
    },
    informacionagencia() {
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$conf.get('api/Agencias/Listarporid/' + me.agenciaid, configuracion).then(function (response) {
        me.agenciainfo = response.data;
      }).catch(err => {
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
      });
    },
    async listardireccionhecho() {
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      try{

        const response = await this.$cat.get('api/DireccionDelitoes/ListarPoridHecho/' + me.rHechoId, configuracion);
          me.lugarespecificoH = response.data.lugarEspecifico;
          me.calleH = response.data.calle;
          me.noIntH = response.data.noint;
          me.noExtH = response.data.noext;
          me.referenciaH = response.data.referencia;
          me.paisH = response.data.pais;
          me.estadoH = response.data.estado;
          me.municipioH = response.data.municipio;
          me.localidadH = response.data.localidad;
          me.cpH = response.data.cp;
          me.listarrHecho()
          me.listaMediaAfiliacion()
          me.listarPersonas()
          me.listarOperadoras()
          me.listarMarcasTelefonos()
          me.listarLogo()
          me.listarCiudades()
          me.listarMarcas()
          me.listarTipos()
          me.listarColores()
          me.listarAnos()
          me.listarCatalogoRedesSociales()
      } catch(error){
        if(error){
          alertify.alert("Notificación","No se ha registrado la dirección del delito.",
            function(){
              me.$router.push('./umixta-entrevistainicial');
             });
        }
      }
    },
    handleInputChange(item, index) {
      const list = [...this.redesSociales]
    
      // Verifica si el item es un objeto y tiene la propiedad 'name' (o la propiedad que necesitas)
      const value = item && item.name ? item.name.toUpperCase() : '' // Cambia 'name' por la propiedad correcta

      list[index]['redSocial'] = value
      this.redesSociales = list
      // const { name, value } = e.target
      // const list = [...this.redesSociales]
      // list[index][name] = value.toUpperCase()
      // this.redesSociales = list
    },
    handleRemoveClick(index) {
      const list = [...this.redesSociales]
      list.splice(index, 1)
      this.redesSociales = list
    },
    handleAddClick() {
      this.redesSociales = [
        ...this.redesSociales,
        { redSocial: '', enlace: '' }
      ]
    },
    listarCatalogoRedesSociales() {
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var redes = [];
      
      this.$cat.get('api/RedesSocialesPersonal/ListarRedesSociales', configuracion).then(function (response) {
        redes = response.data;
        let redesFiltradas = redes.filter(redSocial => redSocial.redSocial != 'No tiene')
        redesFiltradas.map(function (x) {
          me.catalogoRedesSociales.push({ text: x.redSocial, value: x.idRedSocial });
        });
      }).catch(err => {
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
      });
    },
    async buscarRedesSociales(persona) {
      return new Promise((resolve, reject) => {
        let me = this
        var redesBusqueda = []
        this.$cat.get('api/RedesSocialesPersonal/BuscarRedes/' + persona).then(function (response) {
          me.redesSociales = [];
              me.ExisteredSocial = true;
              redesBusqueda = response.data
              redesBusqueda.map(function (x) {
                me.redesSociales.push({ redSocial: { text: x.redSocial, value: x.redSocialId }, enlace: x.enlace })
              })
          resolve();
        }).catch(err => {
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
          reject();
        })
      })
    },
    agregarRedesSociales(configuracion) {
      let me = this;

      if (me.redesSociales.length< 1) {

        this.$cat.post('api/RedesSocialesPersonal/CrearRedSocialPersonal', {
            'PersonaId': me.personaId.value,
            'RedSocialId': (!me.ExisteredSocial?'62f702ab-01ed-47b8-8e5d-45cb203eda0d': me.redSocial.value),
            'Enlace':  (!me.ExisteredSocial?'No tiene': me.redSocial.text)
          }, configuracion). // FIN DEL POST
            then(function (response) {
                me.mostrarpdf(me.u_nombre, me.u_puesto, me.u_agencia)
                me.modalAdd = 0;
                me.close();
            }).
            catch(err => {
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
                me.$notify('Error al intentar crear el  registro!!!', 'error')
              }
            });
        
      }
      else {
        let numRedesSociales = me.redesSociales.length;
        me.redesSociales.map((red, i) => {
          this.$cat.post('api/RedesSocialesPersonal/CrearRedSocialPersonal', {
            'PersonaId':me.personaId.value,
            'RedSocialId': red.redSocial.value,
            'Enlace': red.enlace
          }, configuracion). // FIN DEL POST
            then(function (response) {
              if ((i + 1) === numRedesSociales) {
                me.mostrarpdf(me.u_nombre, me.u_puesto, me.u_agencia)
                me.modalAdd = 0;
                me.close();
              }
            }).
            catch(err => {
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
                me.$notify('Error al intentar crear el  registro!!!', 'error')
              }
            });
        });// FIN DEL MAP DE REDES SOCIALES

      }

    },
    agregarVehiculoInvolucrado(idpersonadesaparecida, configuracion) {
      let me = this;
      this.$cat.post('api/VehiculoDesaparicionPersona/Crear',
        {
          'TipovId': me.tipo.value,
          'AnoId': me.ano.value,
          'ColorId': me.color.value,
          'ModeloId': me.modelo.value,
          'MarcaId': me.marca.value,
          'PersonaDesaparecidaId': idpersonadesaparecida,
          'Serie': me.serie,
          'Placas': me.placa,
          'SenasParticulares': me.senasparticulares,
          'NoSerieMotor': me.motorserie,
          'Propietario': me.propietario,
          'Ruta': me.ruta,
          'EstadoId': me.idEstadoVehiculo.value,
          'Privado': me.transportePublico
        }, configuracion)
        .then(function (response) {
          me.agregarRedesSociales(configuracion);
        })
        .catch(err => {
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
            me.$notify('Error al intentar crear el  registro!!!', 'error')
          }
        });
    },// fin funcion agregar vehiculos  
    agregarDireaccionOcupacion(idpersonadesaparecida, configuracion) {
      let me = this;
      this.$cat.post('api/DireccionOcupacion/CrearDireccionOcupacion',
        {
          'calle': me.calleOcupacion,
          'noInt': me.noIntOcupacion,
          'noExt': me.noExtOcupacion,
          'entreCalle1': me.entreCalle1Ocupacion,
          'entreCalle2': me.entreCalle2Ocupacion,
          'referencia': me.referenciaOcupacion,
          'pais': me.paisOcupacion,
          'estado': me.estadoOcupacion,
          'municipio': me.municipioOcupacion,
          'localidad': me.localidadOcupacion,
          'cp': me.cpOcupacion,
          'personaId': me.personaId.value
        }, configuracion).
        then(function (response) {
          if (me.vehiculoInvolucrado) {
            me.agregarVehiculoInvolucrado(idpersonadesaparecida, configuracion);
          }

          else {
            me.agregarRedesSociales(configuracion);
          }
        })
        .catch(err => {
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
            me.$notify('Error al intentar crear el  registro!!!', 'error')
          }
        });
    },
    async agregarPersonaDesaparecida(configuracion) {
      let me = this;
      var fechaHoraUltAvistamiento = me.fechaGuardar + ' ' + me.horaAvistamiento;

      var descripcionRegTabI = 'Registro de cedula de reporte de ' + me.personaId.text;

      try {
        const response = await this.$cat.post('api/PersonaDesap/Crear', {
          'RelacionPersonaDenunciante': me.relacionPersonaDenunciante,
          'PersonaId': me.personaId.value,
          'rHechoId': me.rHechoId,
          'EstadoSalud': me.estadoSalud,
          'Adicciones': me.adicciones,
          'Padecimiento': me.padecimiento,
          'Etnia': me.etnia,
          'PortabaMedioComunicacion': me.portabaMedioComunicacion,
          'AcompanabaDenunciante': me.acompanabaDenunciante,
          'GrupoDelictivo': me.grupoDelictivo,
          'ProcedenciaGrupoDelictivo': me.procedenciaGrupoDelictivo,
          'FechaHoraUltAvistamiento': fechaHoraUltAvistamiento,
          'NombrePersonaAcompanaba': me.nombrePersonaAcompanaba,
          'RelacionPersonaAcompanaba': me.relacionPersonaAcompanaba,
          'LocalizacionPersonaAcompanaba': me.localizacionPersonaAcompanaba,
          'VestimentaAccesorios': me.vestimentaAccesorios,
          'companiaTelefonicaId': me.IdOperadoraTelefono.value == 'N/A' ? null : me.IdOperadoraTelefono.value,
          'marcaTelefonoId': me.IdMarcaTelefono.value == 'N/A' ? null : me.IdMarcaTelefono.value,
          'descripcionHechos': me.hechos,
          'fotografiaURL': me.imageStoredURL == 'N/A' ? '' : me.imageStoredURL,
          'fechaSys': moment().format(),
          'DistritoCaptura': me.u_distrito,
          'AgenciaCaptura': me.u_agencia,
          'NombreCaptura': me.u_nombre,
          'PersonaCondicion': me.persona,
          'OtraMarca': me.OtraMarca,
        }, configuracion);

        me.idPersonaDesaparecida = response.data.idpersonadesaparecida;
        var idpersonadesaparecida = response.data.idpersonadesaparecida;

        // Verificamos qué operación debe ejecutarse y esperamos a que terminen
        if (me.personaOcupacion) {
          await me.agregarDireaccionOcupacion(idpersonadesaparecida, configuracion);
        } else if (me.vehiculoInvolucrado) {
          await me.agregarVehiculoInvolucrado(idpersonadesaparecida, configuracion);
        } else {
          await me.agregarRedesSociales(configuracion);
        }

        // Crear registro en el tablero
        await me.crearRegistroTableroI(descripcionRegTabI);

      } catch (err) {
        // Manejo de errores
        if (err.response.status == 400) {
          me.$notify("No es un usuario válido", 'error');
        } else if (err.response.status == 401) {
          me.$notify("Por favor inicie sesión para poder navegar en la aplicación", 'error');
          me.e401 = true;
          me.showpage = false;
        } else if (err.response.status == 403) {
          me.$notify("No está autorizado para ver esta página", 'error');
          me.e403 = true;
          me.showpage = false;
        } else if (err.response.status == 404) {
          me.$notify("El recurso no ha sido encontrado", 'error');
        } else {
          me.$notify('Error al intentar crear el registro!!!', 'error');
        }
      } 
    },
    crearRegistroTableroI(descripcionRegTabI) {

      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      this.$cat.post('api/RegistroTableroI/Crear', {
        'RhechoId': me.rHechoId,
        'TipoRegistroTableroI': descripcionRegTabI,
        'Distrito': me.u_distrito,
        'DirSub': me.u_dirSubPro,
        'Agencia': me.u_agencia,
        'ModuloServicioId': me.u_idmoduloservicio,
        'Modulo': me.u_modulo,
        'UsuarioId': me.u_idusuario,
        'NombreUsuario': me.u_nombre,

      }, configuracion).then(function (response) {
        me.$notify('La información se guardo correctamente !!!', 'success')
      }).catch(err => {
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
          me.$notify('Error al intentar crear el  registro!!!', 'error')
        }
      });

    },
    generateUUID: function () { // Public Domain/MIT
      var d = new Date().getTime();
      if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
      }
      var newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });

      return newGuid;
    },
    guardar() {
      let me = this;
      let header = { "Authorization": "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }
      me.$confirm('Esperando confirmación', 'Estas seguro de que deseas guardar información ',
        //CONFIRMAR POSITIVO
        function () {

          if (me.imageFile) {
            let formData = new FormData();
            formData.append('file', me.imageFile);
            var nombreCarpeta = me.nuc;
            me.GUID = me.generateUUID();

            this.$cat.post('api/Archivos/Post/' + nombreCarpeta + '/' + me.GUID,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }

            )
              .then(function (response) {
                me.imageStoredURL = response.data.ruta;
                me.agregarPersonaDesaparecida(configuracion);

              })
              .catch(err => {
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
                  me.$notify('Error al intentar crear el  registro!!!', 'error')
                }
              });

          }
          else {
            me.imageStoredURL = 'N/A';
            me.agregarPersonaDesaparecida(configuracion);
          }

          //LLAMAR A LA FUNCIÓN PRINCIPAL

        },//FIN DE CONFIRMAR POSITIVO
        //CONFIRMAR NEGATIVO
        function () {
          alertify.warning('Verifica la información')
        }// FIN DE NEGATIVO
      )// FIN DEL CONFIRM DE GUARDAR
        .set('labels', { ok: 'Guardar', cancel: 'Cancelar' });
    },
    actualizar() {
      let me = this
      let header = { "Authorization": "Bearer " + this.$store.state.token }
      let configuracion = { headers: header }
      me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas actualizar la información .', function () {
        this.$cat.put('api/PersonaDesap/Actualizar', {
          'idPersonaDesaparecida': me.idPersonaDesaparecida,
          'RelacionPersonaDenunciante': me.relacionPersonaDenunciante,
          'PersonaId': me.personaId.value,
          'rHechoId': me.rHechoId,
          'EstadoSalud': me.estadoSalud,
          'Adicciones': me.adicciones,
          'Padecimiento': me.padecimiento,
          'Etnia': me.etnia,
          'PortabaMedioComunicacion': me.portabaMedioComunicacion,
          'AcompanabaDenunciante': me.acompanabaDenunciante,
          'GrupoDelictivo': me.grupoDelictivo,
          'ProcedenciaGrupoDelictivo': me.procedenciaGrupoDelictivo,
          'FechaHoraUltAvistamiento': me.fechaAvistamientoActualizar,
          'NombrePersonaAcompanaba': me.nombrePersonaAcompanaba,
          'RelacionPersonaAcompanaba': me.relacionPersonaAcompanaba,
          'LocalizacionPersonaAcompanaba': me.localizacionPersonaAcompanaba,
          'VestimentaAccesorios': me.vestimentaAccesorios
        }, configuracion).then(function (response) {
          this.$cat.put('api/DireccionOcupacion/ActualizarDireccionOcupacion', {
            'Calle': me.calleOcupacion,
            'NoInt': me.noIntOcupacion,
            'NoExt': me.noExtOcupacion,
            'EntreCalle1': me.entreCalle1Ocupacion,
            'EntreCalle2': me.entreCalle2Ocupacion,
            'Referencia': me.referenciaOcupacion,
            'Pais': me.paisOcupacion,
            'Estado': me.estadoOcupacion,
            'Municipio': me.municipioOcupacion,
            'Localidad': me.localidadOcupacion,
            'CP': me.cpOcupacion,
            'PersonaId': me.personaId,
            'idDOcupacion': me.idDocupacion
          }, configuracion).then(function (response) {
            this.$cat.put('api/VehiculoDesaparicionPersona/ActualizarVehiculo', {
              'IdVehDesaparicionPersona': me.idVehDesaparicionPersona,
              'TipovId': me.tipo.value,
              'AnoId': me.ano.value,
              'ColorId': me.color.value,
              'ModeloId': me.modelo.value,
              'MarcaId': me.marca.value,
              'PersonaDesaparecidaId': me.idPersonaDesaparecida,
              'Serie': me.serie,
              'Placas': me.placa,
              'SenasParticulares': me.senasparticulares,
              'NoSerieMotor': me.motorserie,
              'Propietario': me.propietario,
              'Ruta': me.ruta
            }, configuracion).then(function (response) {
              me.redesSociales.map((red, i) =>
                this.$cat.post('api/RedesSocialesPersonal/ActualizarRedSocialPersonal', {
                  'IdRedesSocialesPersonal': me.catalogoRedesSociales,
                  'PersonaId': me.personaId.value,
                  'RedSocialId': me.redesSociales[i].redSocial.value,
                  'Enlace': me.redesSociales[i].enlace
                }), configuracion).then(function (response) {
                  me.$notify('La información se actualizo correctamente !!!', 'success')
                  me.listaMediaAfiliacion()
                  me.limpiar()
                }).catch(err => {
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
                    me.$notify('Error al intentar actualizar el registro!!!', 'error')
                  }
                });
            }).catch(err => {
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
                me.$notify('Error al intentar actualizar el registro!!!', 'error')
              }
            });
          }).catch(err => {
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
              me.$notify('Error al intentar actualizar el registro!!!', 'error')
            }
          });
        }).catch(err => {
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
            me.$notify('Error al intentar actualizar el registro!!!', 'error')
          }
        });
        me.mostrarpdf(me.u_nombre, me.u_puesto, me.u_agencia);
        me.modalAdd = 0;
        me.modaldocumento = false;
      },
        function () {
          alertify.warning('Verifica la información')
        }).set('labels', { ok: 'Actualizar', cancel: 'Cancelar' });
    },
    agregarRedSocial(){
      let me = this;

      me.redesSociales.push({redSocial: me.redSocial, enlace: me.enlace});
      me.redSocial = [];
      me.enlace = '';
    },
    borrarredSocial(item){
      let me = this;

      const index = me.redesSociales.indexOf(item); // Obtener el índice del registro
      if (index !== -1) 
      {
        me.redesSociales.splice(index, 1); 
      }
    }
  }
}
</script>

<style>
.espaciado {
  padding: 30px !important;
}

.espaciado2 {
  margin-bottom: -30px !important;
  margin-top: -30px !important;
}

.espaciado3 {
  margin-bottom: -30px !important;
  margin-left: -24px !important;
  margin-right: -24px !important;
  margin-top: -30px !important;
}

.espaciado4 {
  margin-bottom: 30px !important;
  margin-top: 30px !important;
  padding-left: 70px !important;
  padding-right: 70px !important;
}
</style>
