<template>
  <v-layout align-start>
   <n401 v-if="e401" />
   <n403 v-if="e403" />

    <UmixtaNavDrawer />

      <v-flex v-if="showpage">
           <v-toolbar flat color="white">
               <v-toolbar-title class="font-weight-regular" >Información de derivaciónes.</v-toolbar-title>
               <v-divider class="mx-2" inset vertical />
               <v-spacer />
                  <v-flex xs12 sm6 md3>
                      <v-text-field class="font-weight-regular"
                          v-model="nuc" disabled     prepend-icon="folder"
                          filled
                      ></v-text-field>
                  </v-flex>

                  <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                          <v-btn class="mx-2 pt-2" slot="activator" v-on="on" @click="cerrarcarpeta" fab dark small color="primary">
                              <v-icon class="mt-1" dark>close</v-icon>
                          </v-btn>
                      </template>
                      <span>Cerrar carpeta</span>
                  </v-tooltip>
                  <v-btn class="mx-2 pt-2" @click="validarJR()" fab dark small color="success">
                      <v-icon class="mt-1" dark>add</v-icon>
                  </v-btn>
           </v-toolbar>
            <v-data-table
                  :headers="headersp"
                  :items="datosderivaciones"
                  :search="search"
                  :rows-per-page-items="rowsPerPageItems"
                  :pagination.sync="pagination"
                  >
                  <template slot="items" class="white" slot-scope="props">
                          <td>{{ props.item.fechaRegistroExpediente.substring(8, 10) + " de " + obtenermes(props.item.fechaRegistroExpediente.substring(5, 7) - 1) + " del " + props.item.fechaRegistroExpediente.substring(0, 4) + ", " + props.item.fechaRegistroExpediente.substring(11, 19) }}</td>
                          <td>
                              {{ props.item.fechaDerivacion === props.item.fechaRegistroExpediente
                                  ? 'Aun no se acepta'
                                  : props.item.fechaDerivacion.substring(8, 10) + " de " + obtenermes(props.item.fechaDerivacion.substring(5, 7) - 1) + " del " + props.item.fechaDerivacion.substring(0, 4) + ", " + props.item.fechaDerivacion.substring(11, 19)
                              }}
                          </td>
                          <td :style="{ color: !props.item.statusEnvio ? '#b71c1c' : 'inherit' }">
                             {{ !props.item.statusEnvio ? 'Derivacion no enviada' : props.item.statusGeneral }}
                            </td>
                          <td>{{ props.item.noExpediente !== null ? props.item.noExpediente : 'Aun sin numero de expediente' }}</td>
                          <td>{{ props.item.statusAMPO == "Contestado" ? props.item.statusAMPO : 'Sin contestar' }}</td>          
                          <td>

                             <v-tooltip bottom v-if="props.item.statusEnvio == false">
                                <template v-slot:activator="{ on }">
                                    <v-icon class="mr-2" v-on="on" @click="reenviarDerivacion(props.item)" color="info">
                                        refresh
                                    </v-icon>
                                </template>
                                <span>Reenviar derivación que no fue enviada</span>
                              </v-tooltip>

                              <template v-if="props.item.statusEnvio == true">

                              <v-tooltip bottom>               
                                <template v-slot:activator="{ on }">
                                        <v-icon
                                        class="mr-2"
                                        v-on="on"
                                        @click="viewDetalles(props.item)"
                                        >line_weight</v-icon>
                                </template>
                                <span>Ver detalles de la derivación</span>
                              </v-tooltip>  
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="mr-2" v-on="on" @click=" viewInformacion(props.item)">
                                        drafts
                                    </v-icon>
                                </template>
                                <span>Informacion de la derivación</span>
                              </v-tooltip>                          
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="mr-2" v-on="on" @click=" viewPDF(props.item)">
                                        print
                                    </v-icon>
                                </template>
                                <span>Reimprimir la derivacion</span>
                              </v-tooltip>
                              <v-tooltip bottom v-if="props.item.statusAMPO == 'Contestado'">
                                <template v-slot:activator="{ on }">
                                    <v-icon class="mr-2" v-on="on" @click="impresionInforme(props.item)" color="lime darken-3">
                                        print
                                    </v-icon>
                                </template>
                                <span>Respuesta AMPO</span>
                              </v-tooltip>
                              </template>
                          </td>                
                  </template>
                  <template slot="no-data">
                  <v-btn color="primary" @click="listarDerivaciones">Resetear</v-btn>
                  </template>
           </v-data-table>
        </v-flex>


   <v-dialog v-model="modalAdd" fullscreen hide-overlay transition="dialog-bottom-transition">
       <!-- Aqui comienza el dialog (ventana por reformular) -->
           <v-card>
               <v-toolbar dark color="primary">
                <!-- Cabezera simple con botones basicos-->
                   <v-toolbar-title>Derivación a Justicia Restaurativa.</v-toolbar-title>
                   <v-spacer></v-spacer>
                   <v-toolbar-items>
                       <!-- Utilizar props.item en el toolbar -->
                       <v-btn color="success" text @click="mostrarpdf_DerivacionJR()">
                       Vista previa
                       </v-btn>
                       <v-btn icon @click="modalAdd = false">
                       <v-icon @click="limpiar()" >close</v-icon>
                       </v-btn>
                   </v-toolbar-items>
               </v-toolbar>

               <v-container grid-list-md >
                   <v-layout row wrap>
                       <v-flex class="espaciadox" xs12 sm12 md6 lg6>
                            <!-- Cuerpo del componente -->
                            <v-select name="clasificacion persona"
                                :items="clasificacionpersonas"
                                v-model="clasificacionpersona"
                                v-validate="'required'"
                                v-on:change="seleccionarlista()"
                                label="*Selecciona el tipo de persona(s) que realizan la solicitud de acuerdo reparatorio:"
                                :error-messages="errors.collect('clasificacion persona')">
                            </v-select>

                            <v-select name="espontaneo / no espontaneo"
                                :items="enes"
                                v-model="ene"
                                v-validate="'required'"
                                label="*Selecciona si la solicitud va a ser Con persona / Sin persona:"
                                :error-messages="errors.collect('espontaneo / no espontaneo')">
                            </v-select>

                            <v-autocomplete 
                                       name="distrito"   
                                       :items="distritos"
                                       v-model="distrito"
                                       return-object 
                                       attach
                                       v-validate="'required'" 
                                       label="*Distrito:"
                                       @change="informacionderivacion()"
                                       :error-messages="errors.collect('distrito')">
                           </v-autocomplete> 

                           <v-text-field 
                                name="puesto" 
                                label="Numero de Oficio:" 
                                v-model="noOficio">                                          
                            </v-text-field>

                            <!-- Cierre del cuerpo del componente -->
                       </v-flex>

                       <v-flex class="espaciadox" xs12 sm12 md6 lg6 >    
                        <v-card-title class="font-weight-regular" v-if="tableDataRequeridos != ''">
                                <strong>¡ATENCIÓN!&nbsp;</strong>Ya has registrado un conjunto, si deseas crear otro llena nuevamente los campos vacios.
                            </v-card-title>                       
                            <v-autocomplete 
                                name="solicitantes"   
                                :items="raps1"
                                v-model="solicitante"
                                
                                label="*Solicitantes:"
                                data-vv-scope="agregar"
                                return-object       
                                attach
                                chips
                                deletable-chips
                                multiple
                                :error-messages="errors.collect('agregar.solicitantes')">
                            </v-autocomplete>                                         
                                    
                            <v-autocomplete 
                                name="requeridos" 
                                :items="raps2"
                                v-model="requerido"
                                
                                label="*Requeridos:"
                                data-vv-scope="agregar"
                                return-object
                                attach
                                chips
                                deletable-chips
                                multiple
                                :error-messages="errors.collect('agregar.requeridos')">
                            </v-autocomplete>

                            <v-autocomplete 
                                name="delito" 
                                :items="delitos"
                                v-model="delito" 
                                 
                                label="*Delitos:"
                                data-vv-scope="agregar"
                                return-object
                                attach
                                chips
                                deletable-chips
                                multiple
                                :error-messages="errors.collect('agregar.delito')">
                            </v-autocomplete>

                           <v-tooltip bottom v-if="solicitante != '' && requerido != '' && delito != '' && ene != ''">
                               <template v-slot:activator="{ on }">
                                    <v-btn color="success" text @click="evaluarDireccionSol()">
                                        Agregar conjunto
                                    </v-btn>
                               </template>
                               <span >Agregar derivacion</span>
                           </v-tooltip>
                       </v-flex>
    
                       
                   </v-layout>
                        <v-data-table
                           :headers="headers"
                           :items="tableDataRequeridos">
                               <template slot="items" class="white" slot-scope="props">
                                   <td >{{ props.item.nombreSol}}</td>
                                   <td >{{ props.item.nombreReq}}</td>
                                   <td >{{ props.item.nombreDel}}</td>

                                       <v-tooltip bottom   >
                                                       <template v-slot:activator="{ on }" >
                                                           <v-icon
                                                               class="mr-2" v-on="on" color="default"
                                                               @click="actualizarDerivacion(props.item)"
                                                               >
                                                               edit
                                                           </v-icon>
                                                       </template>
                                                       <span>Actualizar derivacion</span>
                                       </v-tooltip>
                                       <v-tooltip bottom   >
                                                       <template v-slot:activator="{ on }" >
                                                           <v-icon
                                                               class="mr-2" v-on="on" color="default"
                                                               @click="borrarDerivacion(props.item)"
                                                               >
                                                               delete
                                                           </v-icon>
                                                       </template>
                                                       <span>Borrar derivacion</span>
                                       </v-tooltip>
                               
                               </template>
                        </v-data-table> 
               </v-container>            
           </v-card>
       <!-- Aqui termina el dialog (ventana por reformular) -->        
   </v-dialog>
   <v-dialog v-model="modal_Derivacion" fullscreen hide-overlay transition="dialog-bottom-transition">
       <v-card>
           <v-toolbar dark color="primary">

           <v-toolbar-title>Documento.</v-toolbar-title>
           <v-spacer></v-spacer>
           <v-toolbar-items>
           <v-btn  color=success text @click.native="imprimir_DerivacionNew()">
           Guardar e Imprimir</v-btn>
            <v-btn icon   @click="modal_Derivacion = false">
           <v-icon>close</v-icon>
           </v-btn>
           </v-toolbar-items>
           </v-toolbar>
           <v-card-text>
              <iframe
              id="iframepdf2"
              type="application/pdf"
              width="100%"
              height="1100"
              frameborder="0"
              scrolling="no"
              ref="pdfFrame"
              ></iframe>
          </v-card-text>
       </v-card>
   </v-dialog>
   <v-dialog   v-model="modal_actualizarderivacion"  max-width="500px">
           <v-card>
               <v-toolbar card dark color="grey lighten-4 primary--text">
                   <v-avatar  size="30">
                       <v-icon class="grey lighten-2">refresh</v-icon>
                   </v-avatar>
           <v-toolbar-title class="subheading">Actualizar derivación</v-toolbar-title>
           <v-spacer></v-spacer>
           </v-toolbar>
           <v-card-text>
               <v-form ref="form">
                   <v-container grid-list-md>
                       <v-layout wrap>
                               <v-autocomplete 
                                               name="solicitantes"   
                                               :items="raps1"
                                               v-model="solicitantee"
                                               v-validate="'required'" 
                                               label="*Solicitantes:"
                                               data-vv-scope="agregar"
                                               return-object       
                                               attach
                                               chips
                                               deletable-chips
                                               multiple
                                               :error-messages="errors.collect('agregar.solicitantes')">
                           </v-autocomplete> 
                           <br>
                           <v-spacer></v-spacer>
                           <br>
                               <v-autocomplete 
                                               name="requeridos" 
                                               :items="raps2"
                                               v-model="requeridoe"
                                               v-validate="'required'" 
                                               label="*Requeridos:"
                                               data-vv-scope="agregar"
                                               return-object
                                               attach
                                               chips
                                               deletable-chips
                                               multiple
                                               :error-messages="errors.collect('agregar.requeridos')">
                           </v-autocomplete>
                               <v-autocomplete 
                                               name="delito" 
                                               :items="delitos"
                                               v-model="delitoe" 
                                               v-validate="'required'" 
                                               label="*Delitos:"
                                               data-vv-scope="agregar"
                                               return-object
                                               attach
                                               chips
                                               deletable-chips
                                               multiple
                                               :error-messages="errors.collect('agregar.delito')">
                           </v-autocomplete>

                       </v-layout>
                   </v-container>
                   <v-card-actions>
                       <v-spacer></v-spacer>
                       <v-btn  @click.native="closeS()" >Cancelar</v-btn>
                       <v-btn @click.native="guardarDerivacionEditada(selectedItem)" class="success" >Guardar</v-btn>
                   </v-card-actions>
               </v-form>

           </v-card-text>
       </v-card>
   </v-dialog>

   <v-dialog v-model="dialogodetalle" max-width="1000px">
       <v-card>
           <v-toolbar card dark color="grey lighten-4 primary--text">
                   <v-avatar  size="30">
                       <v-icon class="grey lighten-2">refresh</v-icon>
                   </v-avatar>
           <v-toolbar-title class="subheading">Estatus de respuestas</v-toolbar-title>
           <v-spacer></v-spacer>
           </v-toolbar>

           <v-card-text>
               <v-form ref="form">
                   <v-container grid-list-md>
                       <v-layout wrap>
                           <v-flex xs12 sm12 md12>
                              <v-data-table
                           :headers="headerc"
                           :items="conjuntoderivaciones">
                               <template slot="items" class="white" slot-scope="props">
                                   <td >{{ props.item.nombreS}}</td>
                                   <td >{{ props.item.nombreR}}</td>
                                   <td >{{ props.item.nombreD}}</td>
                               </template>
                        </v-data-table> 
                         </v-flex>
                       </v-layout>
                   </v-container>
                   <v-card-actions>
                       <v-spacer></v-spacer>
                       <v-btn  @click.native="dialogodetalle=false" >Cerrar</v-btn>
                   </v-card-actions>
               </v-form> 
           </v-card-text>
       </v-card>
   </v-dialog>
   

   <v-dialog v-model="dialogoinfo" max-width="1000px">
       <v-card>
           <v-toolbar card dark color="grey lighten-4 primary--text">
                   <v-avatar  size="30">
                       <v-icon class="grey lighten-2">refresh</v-icon>
                   </v-avatar>
           <v-toolbar-title class="subheading">Estatus de respuestas</v-toolbar-title>
           <v-spacer></v-spacer>
           </v-toolbar>

           <v-card-text>
               <v-form ref="form">
                   <v-container grid-list-md>
                       <v-layout wrap>
                           <v-flex xs12 sm12 md12>
                              <v-list-tile>
                                  <v-list-tile-action>
                                  <v-icon color="success">person</v-icon>
                                  </v-list-tile-action>
                                  <v-list-tile-content>
                                    <v-list-tile-title>
                                        <p class="body-2 font-weight-bold">
                                        <a>Facilitador asignado:</a>
                                        </p>
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        <p color="accent" class="caption font-weight-regular">
                                        <a>{{ nombreFaciAsignado }}</a>
                                        </p>
                                    </v-list-tile-sub-title>
                                  </v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                  <v-list-tile-action>
                                  <v-icon color="success">calendar_today</v-icon>
                                  </v-list-tile-action>
                                  <v-list-tile-content>
                                    <v-list-tile-title>
                                        <p class="body-2 font-weight-bold">
                                        <a>Fecha de registro:</a>
                                        </p>
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        <p color="accent" class="caption font-weight-regular">
                                        <a>{{ respuesta_fecha }}</a>
                                        </p>
                                    </v-list-tile-sub-title>
                                  </v-list-tile-content>
                              </v-list-tile>
                              <v-list-tile>
                                  <v-list-tile-action>
                                  <v-icon color="success">line_weight</v-icon>
                                  </v-list-tile-action>
                                  <v-list-tile-content>
                                    <v-list-tile-title>
                                        <p class="body-2 font-weight-bold">
                                        <a>Expediente:</a>
                                        </p>
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        <p color="accent" class="caption font-weight-regular">
                                        <a>{{ respuesta_derivacion }}</a>
                                        </p>
                                    </v-list-tile-sub-title>
                                  </v-list-tile-content>
                              </v-list-tile>
                         </v-flex>
                       </v-layout>
                   </v-container>
                   <v-card-actions>
                       <v-spacer></v-spacer>
                       <v-btn  @click.native="dialogoinfo=false" >Cerrar</v-btn>
                   </v-card-actions>
               </v-form> 
           </v-card-text>
       </v-card>
   </v-dialog>

   <v-dialog v-model="cargando" max-width="1000px" persistent overlay-opacity="1">
        <v-card>
          <v-toolbar card dark color="grey lighten-4 primary--text">
            <v-avatar size="30">
              <v-icon class="grey lighten-2">add</v-icon>
            </v-avatar>
            <v-toolbar-title class="subheading"
              >La derivacion se esta ejecutando, por favor
              espere...</v-toolbar-title
            >
            <v-spacer />
          </v-toolbar>

          <!-- Contenido de la animación de carga (inicialmente oculto) -->
          <div class="loading-overlay">
            <div class="loading-spinner"></div>
          </div>
        </v-card>
      </v-dialog>

</v-layout>
</template>


<script>
import axios from 'axios'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import VeeValidate from 'vee-validate'
import moment from 'moment'
import 'moment/locale/es'
import alertify from 'alertifyjs'
import { VueEditor } from "vue2-editor"
import DualListBox from "dual-listbox-vue"
import "dual-listbox-vue/dist/dual-listbox.css"
import n401 from './401.vue'
import n403 from './403.vue'
import { error } from 'util'
import { METHODS } from 'http'
import {copiarDerivacion} from './copiarDerivacion' 
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import htmlToPdfmake from 'html-to-pdfmake'
import QRCode from "qrcode"
import { generarQRCodeBase64 } from './crearQR'
import UmixtaNavDrawer from './umixtaNavDrawer.vue'

export default {
    components: {
        DualListBox,
        "vue2-editor": VueEditor,
        n401,
        n403,
        UmixtaNavDrawer
   },
       props: {
       item: Object, // Propiedad item pasada al componente
   },
   data: function () {
       return {
         //variables de pdf
         numpage: 1,
         currentpdfpages: 0,
         base64pdf: "",
         canvasid: "",

           rHechoId:'',
           rAtencionId:'',
           nucId:'',
           nuc:'',
           modalAdd:false,
           logo1 :'',
           logo2:'',
           //*************** */
            customToolbar: [
                   [{ 'header': [false] }],

               ],
               //************** */
           derivaciones:[],
           headers: [
               { text: 'Solicitantes', value: 'solicitantes' },
               { text: 'Requeridos', value: 'requeridos' },
               { text: 'Delito', value: 'Delito' },
               { text: 'Opciones', value: 'opciones', sortable: false },
           ],
           search: '',
           rowsPerPageItems: [10, 20, 30, 40, 50],
           pagination: {
               rowsPerPage: 20
           },
           headersp: [
              { text: 'Fecha de derivación', value: 'fechaRegistroExpediente', sortable: false },
              { text: 'Fecha de aceptación', value: 'fechaDerivacion', sortable: false },
              { text: 'Estatus inicial', value: 'statusGeneral', sortable: false  },
              { text: 'Numero de expediente', value: 'noExpediente', sortable: false  },
              { text: 'Estatus', value: 'statusAMPO', sortable: false },
              { text: 'Opciones', value: 'opciones', sortable: false },              
              ],
          headerc: [
               { text: 'Solicitantes', value: 'solicitantes' },
               { text: 'Requeridos', value: 'requeridos' },
               { text: 'Delito', value: 'Delito' },
           ],
           editedIndex: -1,
           //*************** */

           clasificacionpersona:'',
           clasificacionpersonas:['Victimas', 'Imputados'],

           ene:'',
           enes:['Con persona', 'Sin persona'],
           
           //*************************************************** */
           distrito:'',
           noOficio:'',
           solicitante:'',
           requerido:'',
           representantes: [],
           representantesEdit: [],
           representantesValidados: {},
           representantesValidadosEdit: {},
           delito:'',
           solicitantee:'',
           requeridoe:'',
           delitoe:'',
           idExpedienteNew: '',
           nombreFirma:'',
           puestoFirma:'',
           agenciaFirma:'',
           //*************************************************** */

           rapsVictimas:[],
           rapsImputados:[],

           raps1:[],
           raps2:[],

           solicitantes:[],
           requeridos:[],
           detallepersonas:[],

           delitos:[],
           delitosderivados:[],

           distritos:[],
           tableDataRequeridos: [],
           tableDataRepresentantes: [],
           tableData: [],
           otherProperty: null,

           datosderivaciones:[],
           conjuntoderivaciones:[],
           conjuntoPDF:[],

           //*************************************************** */
           modal_Derivacion:false,
           modal_actualizarderivacion:false,
           dialogoinfo: false,
           dialogodetalle: false,
           //*************************************************** */

           dirigidoNombre:'',
           dirigidoNombres: '',
           dirigidoDirSubProc:'',

           respuestaSol:'',
           respuestaAMPO:'',

           rBreve:'',
           showpage:true,
           e401:false,
           e403:false,

           //*************************************************** */
           u_iddistrito:'',
           u_distrito:'',
           u_dirSubPro:'',
           u_idagencia:'',
           u_agencia:'',
           u_idmoduloservicio:'',
           u_modulo:'',
           u_idusuario:'',
           u_nombre:'',
           u_clave:'',
           u_rol:'',
           u_puesto:'',
           u_subproc:'',
           u_aqd:'',
           //*************************************************** */
           v_fechaderivacion:'',
           v_fechaaceptacion :'',
           v_statusinicial:'',
           v_informacioninicial:'',
           v_noExpediente:'',
           v_statusactual:'',
           v_informacionconclusion:'',
           v_fechacierre:'',
           v_respuestaStatus:'',
           v_respuestaInfo:'',

           iframeHeight: '500px', // Ajusta la altura según tus necesidades
           pdfUrl: '', // Variable para almacenar la URL del PDF
           re_arregloConjunto:[],
           reimpresion:-1,

           texto: 'Vista Previa',
           qrCode: null,
           docDerivacion: 'Derivacion',
           vistaPreviaTF: true,

           respuesta_facilitador: '',
           respuesta_fecha: '',
           respuesta_derivacion: '',
           respuesta_AMPO: '',

           informeNoOficio: '',
           informeExpediente: '',
           informeNuc: '',
           informeFacilitador: '',
           informePuestoFacilitador: '',
           informeRespuestaAMPO: '',
           informe: false,
           tfI:false,
           tfV:false,
           cargando: false,
           nombreFaciAsignado: '',
           complemento: 1,

           dirigidoAmpo:'',
           puestoAmpo: '',
            tipoPDF: 0,

            services: [
                        'api/Racs/Clonar'
                        ,'api/RAtencions/Clonar'
                        ,'api/Nucs/Clonar'
                        ,'api/RHechoes/Clonar'
                        ,'api/RAPs/Clonar'
                        ,'api/AmpDecs/Clonar'
                        ,'api/RDHs/Clonar'
                        ,'api/Representante/Clonar'
                        ,'api/Turnoes/Clonar'
                        ,'api/DireccionDelitoes/Clonar'
                        ,'api/ClonacionJR/ClonarExpediente'
                        ,'api/ClonacionJR/ClonarEnvio'
                        ,'api/ClonacionJR/ClonarConjunto'
                        ,'api/ClonacionJR/ClonarSolReq'
                        ,'api/ClonacionJR/ClonarDelitos'
           ],
           serviceNames: [
                            'RAC'
                            ,'Atencion'
                            ,'NUC'
                            ,'Hecho'
                            ,'RAP'
                            ,'Ampliación de Declaración'
                            ,'Delitos'
                            ,'Representante'
                            ,'Turnos'
                            ,'Direccion del Delito'
                            ,'Expediente de la derivacion'
                            ,'Envio de la derivacion'
                            ,'Conjunto de derivaciones'
                            ,'Solicitantes Requeridos'
                            ,'Delitos derivados'
           ],
       

       };
   },

   created () {
       let me = this
       me.rHechoId=  me.$store.state.rhechoid;
       me.rAtencionId = me.$store.state.ratencionid
       me.nuc = me.$store.state.nuc;
       if (me.rHechoId== null)
       {
               me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpeta y luego en Listar carpeta y   ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.',
               function(){

                       me.$router.push('./umixta-carpetas')
               })
       }
       else{
               me.$notify('Carpeta abierta correctamente','success')


               me.u_iddistrito=me.$store.state.usuario.iddistrito;
               me.u_distrito=me.$store.state.usuario.distrito;
               me.u_dirSubPro=me.$store.state.usuario.dirSubProc;
               me.u_idagencia=me.$store.state.usuario.idagencia;
               me.u_agencia=me.$store.state.usuario.agencia;
               me.u_idmoduloservicio=me.$store.state.usuario.idmoduloservicio;
               me.u_modulo=me.$store.state.usuario.modulo;
               me.u_idusuario=me.$store.state.usuario.idusuario;
               me.u_nombre=me.$store.state.usuario.usuario;
               me.u_clave=me.$store.state.usuario.clave;
               me.u_rol=me.$store.state.usuario.rol;
               me.u_puesto=me.$store.state.usuario.puesto;
               me.u_subproc=me.$store.state.usuario.subProc;

               //*********************************************** */
               me.listarDerivaciones();
               me.listardelitoshecho();
               me.listarLogo();
               me.informacionagencia();
               me.listardistritos(); 
               me.listarrHecho();

       }
   },
   computed: {

   },
   watch: {
     numpage(oldVal, newVal) {
       this.renderPdfToCanvas(this.base64pdf.split(",")[1], this.canvasid, this.numpage)
     },
       qrCode(val) {
        let me = this
           if (val != null && val != '' && me.informe) {
               if (me.docDerivacion == 'Reimpresión de respuesta AMPO') {
                   var dd = me.crearPdfInforme();
                   var pdfMake = require('pdfmake/build/pdfmake.js')
                   var htmlToPdfmake = require("html-to-pdfmake");
   
                   if (pdfMake.vfs == undefined){
                       var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                       pdfMake.vfs = pdfFonts.vfs; 
                   } 
                  pdfMake.createPdf(dd).print();

                  
                me.docDerivacion = ''}  
            }        
    }
   },
   methods:{
     //funciones pdf to canvas
     async renderPdfToCanvas(base64pdf, canvasId, numpage) {
       // Importación clásica compatible con v2.x
       // Usa la versión legacy transpilada
       const pdfjsLib = require('pdfjs-dist/legacy/build/pdf');


       // Configurar el worker
       pdfjsLib.GlobalWorkerOptions.workerSrc =
           'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';


       // Convertir base64 a Uint8Array
       const binary = atob(base64pdf);
       const length = binary.length;
       const bytes = new Uint8Array(length);
       for (let i = 0; i < length; i++) {
         bytes[i] = binary.charCodeAt(i);
       }

       // Cargar documento
       const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
       this.currentpdfpages = pdf.numPages
       const page = await pdf.getPage(numpage); // renderiza solo la página 1
       const scale = 1.5;
       const viewport = page.getViewport({ scale });

       // Preparar canvas
       const canvas = document.getElementById(canvasId);
       const context = canvas.getContext('2d');
       canvas.width = viewport.width;
       canvas.height = viewport.height;

       // Renderizar en canvas
       await page.render({ canvasContext: context, viewport }).promise;
     },
     nextPage(){
       if(this.numpage<this.currentpdfpages){
         this.numpage = this.numpage + 1
       }else{

       }

     },
     prevPage(){
       if(this.numpage>1){
         this.numpage = this.numpage - 1
       }else{

       }

     },

        async generarQR(tipodo,nuc,nombrefirma,fechadoc,id) {
            
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
                me.$notify('Error al crear el código QR','error')         
            }
        },
       listarDerivaciones(){
           let me=this;
           let header={"Authorization" : "Bearer " + this.$store.state.token};
           let configuracion= {headers : header};
            me.$justiciarestaurativa.get('api/Envios/InformacionExpedienteCAT/'+ me.rHechoId,configuracion).then(function(response){

                   
                   me.datosderivaciones =response.data;

                   
               }).catch(err => {
                   if (err.response.status==400){
                       me.$notify("No es un usuario válido", 'error')
                   } else if (err.response.status==401){
                       me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                       me.e401 = true,
                       me.showpage= false
                   } else if (err.response.status==403){
                       me.$notify("No esta autorizado para ver esta página", 'error')
                       me.e403= true
                       me.showpage= false
                   } else if (err.response.status==404){
                       me.$notify("El recuso no ha sido encontrado", 'error')
                   }else{solicitante
                       me.$notify('Error al intentar listar los registros','error')
                   }
               });

       },
       viewDetalles (item ){
          this.dialogodetalle = true
          let me=this;
           let header={"Authorization" : "Bearer " + this.$store.state.token};
           let configuracion= {headers : header};
            me.$justiciarestaurativa.get('api/Expedientes/ListarConjuntos/' + item.idEnvio,configuracion).then(function(response){
              
              me.conjuntoderivaciones =response.data;

               }).catch(err => {
                   if (err.response.status==400){
                       me.$notify("No es un usuario válido", 'error')
                   } else if (err.response.status==401){
                       me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                       me.e401 = true,
                       me.showpage= false
                   } else if (err.response.status==403){
                       me.$notify("No esta autorizado para ver esta página", 'error')
                       me.e403= true
                       me.showpage= false
                   } else if (err.response.status==404){
                       me.$notify("El recuso no ha sido encontrado", 'error')
                   }else{solicitante
                       me.$notify('Error al intentar listar los registros','error')
                   }
               });
        },
        viewPDF (item ) {
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

            me.$justiciarestaurativa.get('api/Expedientes/ListarConjuntos/' + item.idEnvio,configuracion).then(function(response)
            {
              
                if(response.data && response.data.length > 0)
                {
                    //Guardo solo el primer registro, ya que los datos de no de oficio, responsabe y subdireeccion en la misma en todos los conjuntos
                    me.conjuntoPDF = response.data[0];

                    //Aqui asigno valores a las variables para la reimpresion, una vez impresa se limpian
                    me.noOficio = me.conjuntoPDF.noOficio;
                    me.dirigidoNombre = me.conjuntoPDF.responsableJR;
                    me.dirigidoDirSubProc = me.conjuntoPDF.nombreSubDirigido;                             
                   
                }            
                
                //Al ser una reimpresion le asigno una etiquta util para el momento de mostrar un modal de guardado o solo lanzar el PDF a otra ventana
                me.reimpresion = 1;

                //En caso de ser reimpresion sin persona, llamo a una funcion para abtraer la informacion del envio, mas importente, el arreglo del conjunto
                me.abtraerInfoCSinP(item.idEnvio, item.expedienteId,item.espontaneoNoEspontaneo);

            }).catch(err => {
                if (err.response.status==400){
                    me.$notify("No es un usuario válido", 'error')
                } else if (err.response.status==401){
                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                    me.e401 = true,
                    me.showpage= false
                } else if (err.response.status==403){
                    me.$notify("No esta autorizado para ver esta página", 'error')
                    me.e403= true
                    me.showpage= false
                } else if (err.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{solicitante
                    me.$notify('Error al intentar listar los registros','error')
                }
            });

        },
      viewInformacion (item ){
          this.dialogoinfo = true
          let me=this;
           let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion = { headers: header };          
            me.$justiciarestaurativa.get('api/Envios/InformacionExpedienteInd/'+ me.rHechoId + '/' + item.expedienteId,configuracion).then(function(response){
              
                    me.respuestaSol = response.data.informacionStatus;
                    let arraytemporal = response.data.informacionStatus.split('</p>')                                                    

                    me.respuesta_facilitador =  response.data.firmaInfoAMPO
                    me.respuesta_fecha = me.formatearfechahora(response.data.fechaRegistro)
                    me.respuesta_derivacion = response.data.noExpediente         

                    me.informeFacilitador = response.data.firmaInfoAMPO
                    me.informePuestoFacilitador = response.data.puestoFirmaAMPO                    
                  if(me.respuestaAMPO == null)
                  {
                      me.respuestaAMPO='El AMPO aun no provee una respuesta'
                  }
                  if(me.respuestaSol == '')
                  {
                      me.respuestaSol='La derivacion aun no ha sido aceptada'
                  }

                  me.$justiciarestaurativa.get('api/AsignacionEnvios/ListarIdEnvio2/'+ item.idEnvio,configuracion).then(function(response)
                  {

                    me.nombreFaciAsignado = response.data.un_Modulo;

                  }).catch(err => {
                   if (err.response.status==400){
                       me.$notify("No es un usuario válido", 'error')
                   } else if (err.response.status==401){
                       me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                       me.e401 = true,
                       me.showpage= false
                   } else if (err.response.status==403){
                       me.$notify("No esta autorizado para ver esta página", 'error')
                       me.e403= true
                       me.showpage= false
                   } else if (err.response.status==404){
                       me.$notify("El recuso no ha sido encontrado", 'error')
                   }else{solicitante
                       me.$notify('Error al intentar listar los registros','error')
                   }
               });

            }).catch(err => {
                if (err.response.status==400){
                    me.$notify("No es un usuario válido", 'error')
                } else if (err.response.status==401){
                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                    me.e401 = true,
                    me.showpage= false
                } else if (err.response.status==403){
                    me.$notify("No esta autorizado para ver esta página", 'error')
                    me.e403= true
                    me.showpage= false
                } else if (err.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{solicitante
                    me.$notify('Error al intentar listar los registros','error')
                }
            });


       },
       evaluarDireccionSol() {
            let me=this;
            let consultas = [];

            for(var i=0; i<me.solicitante.length; i++)
            {
                if(me.solicitante[i].value4 == "  0 S/N    Mexico 0" || me.solicitante[i].value5 == "0,0")
                {
                    alert("Este solicitante: " + me.solicitante[i].value + " no puedes derivarlo a Justicia Restaurativa ya que no le has agregado una direccion o telefono");
                    return;
                }
                else
                {
                    consultas.push(me.consultarRepresentante(me.solicitante[i].value2, 1));                    
                }
            }
            for(var i=0; i<me.requerido.length; i++)
             {
                if(me.requerido[i].value4 == "  0 S/N    Mexico 0" || me.requerido[i].value5 == "0,0")
                {
                    alert("Este requerido: " + me.requerido[i].value + " no puedes derivarlo a Justicia Restaurativa ya que no le has agregado una direccion o telefono");
                    return;
                }
                else
            {
                consultas.push(me.consultarRepresentante(me.requerido[i].value2, 1));
            }
        }

            if (consultas.length > 0) {
                Promise.all(consultas)
                    .then(() => {
                        console.log('a ver que tiene')
                        console.log(consultas)    
                    me.addToTable();
                })
            }
       },
        consultarRepresentante(id, almacenar) {
            let me=this;

            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

            let personaId = id;

            return me.$cat.get('api/Representante/ConsultaRepresentante/'+id,configuracion).then(function(response)
            {
                for (let i = 0; i < response.data.length; i++) {
                    let registro = response.data[i];

                    if (!registro.medioNotificacion) {
                        alert("Este representante: " + registro.nombreCompleto + " no le has agregado una medio de notificacion por lo que no puedes derivarlo a Justicia Restaurativa");
                        return Promise.reject();
                    } else if (registro.medioNotificacion.includes("Teléfono") && !registro.telefono) {
                        alert("Este representante: " + registro.nombreCompleto + " no le has agregado un teléfono por lo que no puedes derivarlo a Justicia Restaurativa");
                        return Promise.reject();
                    } else if (registro.medioNotificacion.includes("Correo electrónico") && !registro.correoElectronico) {
                        alert("Este representante: " + registro.nombreCompleto + " no le has agregado un correo por lo que no puedes derivarlo a Justicia Restaurativa");
                        return Promise.reject();
                    } else if (registro.medioNotificacion.includes("Domicilio") && registro.direccion == ' No.  , , , , Mexico, CP: 0') {
                        alert("Este representante: " + registro.nombreCompleto + " no le has agregado una dirección por lo que no puedes derivarlo a Justicia Restaurativa");
                        return Promise.reject();
                    }
                    
                    // Verificar y modificar Tipo1
                    if (registro.tipo1 !== 1 && registro.tipo1 !== 7) {
                        registro.tipo1 = '';  // Asignar cadena vacía si no es 1 ni 7
                        registro.tipo1Nombre = 'No activo';  // Asignar cadena vacía al nombre
                    }

                    // Verificar y modificar Tipo2
                    if (registro.tipo2 !== 1 && registro.tipo2 !== 7) {
                        registro.tipo2 = '';  // Asignar cadena vacía si no es 1 ni 7
                        registro.tipo2Nombre = 'No activo';  // Asignar cadena vacía al nombre
                    }
                    
                    // Solo obtener el medio de notificacion puesto
                    if(!registro.medioNotificacion.includes('Correo electrónico'))
                    {
                        registro.correoElectronico = '';
                    }
                    if(!registro.medioNotificacion.includes("Teléfono"))
                    {
                        registro.telefono = ''
                    }
                    if(!registro.medioNotificacion.includes("Domicilio"))
                    {
                        registro.direccion = '';
                    }
                    };
                
                if(almacenar == 1) {
                    if (me.representantesValidados[personaId]) {
                        return Promise.resolve(); // Retorna una promesa ya resuelta si ya está validado
                    } else {
                        if (response.data && response.data.length > 0) {
                            me.representantesValidados[personaId] = response.data;
                            me.representantes = me.representantes.concat(response.data);
                        }
                    }
                } else if (almacenar == 2) {
                    if (me.representantesValidadosEdit[personaId]) {
                        return Promise.resolve(); // Retorna una promesa ya resuelta si ya está validado
                    } else {
                        if (response.data && response.data.length > 0) {
                            me.representantesValidadosEdit[personaId] = response.data;
                            me.representantesEdit = me.representantesEdit.concat(response.data);
                        }
                    }
                }
            }).catch(err => { 
                if (err.response.status==400){
                    me.$notify("No es un usuario válido", 'error')
                } else if (err.response.status==401){
                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                    me.e401 = true,
                    me.showpage= false
                } else if (err.response.status==403){ 
                    me.$notify("No esta autorizado para ver esta página", 'error')
                    me.e403= true
                    me.showpage= false 
                } else if (err.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                    me.$notify('Error al intentar listar los registros','error')    
                } 
            });
        },
       addToTable() {

           let me=this;
           //Variables para el solicitante
           var solicita = "";
           var idsolicita = "";
           var clasisolicita = "";
           var direccionsolicita = "";
           var telefonosolicita = "";
           var sexosolicita = "";
           var edadsolicita = "";
           var fechanasolicita = "";
           var curpsolicita = "";
           var docidentisolicita = "";
           var nacionalidadsolicita = "";
           var correosolicita = "";
           var estadocivilsolicita = "";
           var ocupacionsolicita = "";
           var nivelestudiosolicita = "";
           var religionsolicita = "";
           var tipodiscapacidadsolicita = "";
           //Variables para el requerido
           var requiere = "";
           var idrequiere = "";
           var clasirequiere = "";
           var direccionrequiere = "";
           var telefonorequiere = "";
           var sexorequiere = "";
           var edadrequiere = "";
           var fechanarequiere = "";
           var curprequiere = "";
           var docidentirequiere = "";
           var nacionalidadrequiere = "";
           var correorequiere = "";
           var estadocivilrequiere = "";
           var ocupacionrequiere = "";
           var nivelestudiorequiere = "";
           var religionrequiere = "";
           var tipodiscapacidadrequiere = "";
           //Variables para el delito
           var delite = "";
           var iddelite = "";
           //Variables para el representante
           var representanteR = "";
           var idR = "";
           var idpersonaR = "";
           var curpR = "";
           var sexoR = "";
           var correoR = "";
           var telefonoR = "";
           var cedulaR = "";
           var direccionR = "";
           var tipo1R = "";
           var tipo2R = "";

          //-----------------------------------SOLICITANTES-------------------------------------------------------------
               
            
               //For para concatenar los datos de los solicitados
               for(var i=0; i<me.solicitante.length; i++)
                   {
                       solicita += me.solicitante[i].value;
                       idsolicita += me.solicitante[i].value2;
                       clasisolicita += me.solicitante[i].value3;
                       direccionsolicita += me.solicitante[i].value4;
                       telefonosolicita += me.solicitante[i].value5;
                       sexosolicita  += me.solicitante[i].value6;
                       edadsolicita  += me.solicitante[i].value7;
                       fechanasolicita  += me.solicitante[i].value8;
                       curpsolicita  += me.solicitante[i].value9;
                       docidentisolicita  += me.solicitante[i].value10;
                       nacionalidadsolicita  += me.solicitante[i].value11;
                       correosolicita  += me.solicitante[i].value12;
                       estadocivilsolicita  += me.solicitante[i].value13;
                       ocupacionsolicita  += me.solicitante[i].value14;
                       nivelestudiosolicita  += me.solicitante[i].value15;
                       religionsolicita  += me.solicitante[i].value16;
                       tipodiscapacidadsolicita  += me.solicitante[i].value17;

                       if(i+1 != me.solicitante.length)
                       {
                          solicita += "; ";
                          idsolicita += "; ";
                          clasisolicita += "; ";
                          direccionsolicita += "; ";
                          telefonosolicita += "; ";
                          sexosolicita  += "; ";
                          edadsolicita  += "; ";
                          fechanasolicita  += "; ";
                          curpsolicita  += "; ";
                          docidentisolicita  += "; ";
                          nacionalidadsolicita  += "; ";
                          correosolicita  += "; ";
                          estadocivilsolicita  += "; ";
                          ocupacionsolicita  += "; ";
                          nivelestudiosolicita  += "; ";
                          religionsolicita  += "; ";
                          tipodiscapacidadsolicita  += "; ";
                       }
                       
                   }

 

              //-------------------------------------REQUERIDOS-------------------------------------------------------------
              //For para concatenar los nombre de los requeridos
              for(var i=0; i<me.requerido.length; i++)
                   {
                       requiere += me.requerido[i].value;
                       idrequiere += me.requerido[i].value2;
                       clasirequiere += me.requerido[i].value3;
                       direccionrequiere += me.requerido[i].value4;
                       telefonorequiere += me.requerido[i].value5;
                       sexorequiere += me.requerido[i].value6;
                       edadrequiere += me.requerido[i].value7;
                       fechanarequiere += me.requerido[i].value8;
                       curprequiere += me.requerido[i].value9;
                       docidentirequiere += me.requerido[i].value10;
                       nacionalidadrequiere += me.requerido[i].value11;
                       correorequiere += me.requerido[i].value12;
                       estadocivilrequiere += me.requerido[i].value13;
                       ocupacionrequiere += me.requerido[i].value14;
                       nivelestudiorequiere += me.requerido[i].value15;
                       religionrequiere += me.requerido[i].value16;
                       tipodiscapacidadrequiere += me.requerido[i].value17;

                       if(i+1 != me.requerido.length)
                       {
                          requiere += "; ";
                          idrequiere += "; ";
                          clasirequiere += "; ";
                          direccionrequiere += "; ";
                          telefonorequiere += "; ";
                          sexorequiere += "; ";
                          edadrequiere += "; ";
                          fechanarequiere += "; ";
                          curprequiere += "; ";
                          docidentirequiere += "; ";
                          nacionalidadrequiere += "; ";
                          correorequiere += "; ";
                          estadocivilrequiere += "; ";
                          ocupacionrequiere += "; ";
                          nivelestudiorequiere += "; ";
                          religionrequiere += "; ";
                          tipodiscapacidadrequiere += "; ";
                       }
                       
                   }

            //----------------------------------DELITOS----------------------------------------------------
                //For para concatenar los nombre del delito
                for(var i=0; i<me.delito.length; i++)
                {
                    delite += me.delito[i].value;
                    iddelite += me.delito[i].code;

                    if(i+1 != me.delito.length)
                    {
                        delite += "; ";
                        iddelite += "; ";
                    }
                }
            
            //-----------------------------------REPRESENTANTES---------------------------------------------
                //For para concatenar los datos de los representantes
                for(var i=0; i<me.representantes.length; i++)
                {
                    idR += me.representantes[i].idRepresentante;
                    idpersonaR += me.representantes[i].personaId;
                    representanteR += me.representantes[i].nombreCompleto;
                    curpR += me.representantes[i].curp;
                    sexoR += me.representantes[i].sexo;
                    correoR  += me.representantes[i].correoElectronico;
                    telefonoR  += me.representantes[i].telefono;
                    cedulaR  += me.representantes[i].cedulaProfesional;
                    direccionR  += me.representantes[i].direccion;
                    tipo1R  += me.representantes[i].tipo1Nombre;
                    tipo2R  += me.representantes[i].tipo2Nombre;

                    if(i+1 != me.representantes.length)
                    {
                        idR += "; ";
                        idpersonaR += "; ";
                        representanteR += "; ";
                        curpR += "; ";
                        sexoR += "; ";
                        correoR  += "; ";
                        telefonoR  += "; ";
                        cedulaR  += "; ";
                        direccionR  += "; ";
                        tipo1R  += "; ";
                        tipo2R  += "; ";
                    }
                }
                //--------------------------------------------------------------------------------------

                //Se agregan los datos en un arreglo y a su vez se muestran en tabla los datos que se requieran  
                this.tableDataRequeridos.push({nombreSol:solicita,idSol:idsolicita,clasiSol:clasisolicita,direSol:direccionsolicita,telSol:telefonosolicita,sexoSol:sexosolicita,edadSol:edadsolicita,
                                            fenaSol:fechanasolicita,curpSol:curpsolicita,docideSol:docidentisolicita,naciSol:nacionalidadsolicita,correoSol:correosolicita,escivSol:estadocivilsolicita,
                                            ocuSol:ocupacionsolicita,nivesSol:nivelestudiosolicita,relSol:religionsolicita,tipodisSol:tipodiscapacidadsolicita,
                                            nombreReq:requiere,idReq:idrequiere,clasiReq:clasirequiere,direReq:direccionrequiere,telReq:telefonorequiere,sexoReq:sexorequiere,edadReq:edadrequiere,
                                            fenaReq:fechanarequiere,curpReq:curprequiere,docideReq:docidentirequiere,naciReq:nacionalidadrequiere,correoReq:correorequiere,escivReq:estadocivilrequiere,
                                            ocuReq:ocupacionrequiere,nivesReq:nivelestudiorequiere,relReq:religionrequiere,tipodisReq:tipodiscapacidadrequiere,
                                            nombreDel:delite,idDel:iddelite});

                //Se agregan los datos en un arreglo para los representantes
                this.tableDataRepresentantes.push({idRepre: idR, personaIdRepre: idpersonaR, nombreRepre: representanteR, curpRepre: curpR, sexoRepre: sexoR, correoRepre: correoR, telefonoRepre: telefonoR, 
                                                cedulaRepre: cedulaR, direccionRepre: direccionR, tipo1Repre: tipo1R, tipo2Repre: tipo2R});

                // Limpia el valor de la entrada de texto después de agregarlo a la tabla
                this.solicitante = ''; 
                this.requerido = ''; 
                this.delito = '';
                this.representantes = [];
                this.representantesValidados = {};
       },
       listarLogo(){
           let me=this;
           let header={"Authorization" : "Bearer " + this.$store.state.token};
           let configuracion= {headers : header};
           this.$conf.get('api/ConfGlobals/Listar',configuracion).then(function(response){
               me.logo1= response.data.logo1;
               me.logo2= response.data.logo2;
               me.logo3 = response.data.logo3;
               me.logo4 = response.data.logo4;

               }).catch(err => {
                   if (err.response.status==400){
                       me.$notify("No es un usuario válido", 'error')
                   } else if (err.response.status==401){
                       me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                       me.e401 = true,
                       me.showpage= false
                   } else if (err.response.status==403){
                       me.$notify("No esta autorizado para ver esta página", 'error')
                       me.e403= true
                       me.showpage= false
                   } else if (err.response.status==404){
                       me.$notify("El recuso no ha sido encontrado", 'error')
                   }else{
                       me.$notify('Error al intentar listar los registros','error')
                   }
               });
       },
       informacionderivacion(){
           let me=this;
           let header={"Authorization" : "Bearer " + this.$store.state.token};
           let configuracion= {headers : header};
           me.$conf.get('api/DSPs/ListarPorDisttritoCve/'+ me.distrito.value + '/CJR',configuracion  ).then(function(response){
               
                if(response.data.message == 'No hay registros')
                {
                   alert("El distrito "+ me.distrito.text +" no cuenta con una unidad de Justicia Restaurativa");
                   me.distrito = '';
                   return;
                }

               me.dirigidoNombre=response.data.responsable;
               
               me.dirigidoDirSubProc= response.data.nombreSubDir;

               }).catch(err => {
                   if (err.response.status==400){
                       me.$notify("No es un usuario válido", 'error')
                   } else if (err.response.status==401){
                       me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                       me.e401 = true,
                       me.showpage= false
                   } else if (err.response.status==403){
                       me.$notify("No esta autorizado para ver esta página", 'error')
                       me.e403= true
                       me.showpage= false
                   } else if (err.response.status==404){
                       me.$notify("El recuso no ha sido encontrado", 'error')
                   }else{
                       me.$notify('Error al intentar listar los registros','error')
                   }
               });
       },
       listardistritos(){ 
           var distritoarray = [];
           let me=this; 
           let header={"Authorization" : "Bearer " + this.$store.state.token};
           let configuracion= {headers : header};
           
           me.$conf.get('api/Distritoes/Listar',configuracion).then(function(response){
               distritoarray = response.data;
               distritoarray.map(function(x){
                   me.distritos.push({text: x.nombre,value: x.idDistrito,value2: x.nombre});
               });
           }).catch(err => { 
               if (err.response.status==400){
                   me.$notify("No es un usuario válido", 'error')
               } else if (err.response.status==401){
                   me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                   me.e401 = true,
                   me.showpage= false
               } else if (err.response.status==403){ 
                   me.$notify("No esta autorizado para ver esta página", 'error')
                   me.e403= true
                   me.showpage= false 
               } else if (err.response.status==404){
                   me.$notify("El recuso no ha sido encontrado", 'error')
               }else{
                   me.$notify('Error al intentar listar los registros','error')    
               } 
           });
       },
       formatearfechahora: function(fecha){
           return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
       },
       cerrarcarpeta () {
           this.$store.state.rHechoId = null;
           this.$store.state.nuc= null;
           this.$router.push('./umixta-carpetas')
       },
       close(){
           this.modalAdd= false;
           this.modal_Derivacion=false;
       },
       closeS(){
           this.modal_actualizarderivacion=false;
           me.solicitante = '';
           me.requerido = '';
           me.delito = '';
       },
        async guardarDerivacionEditada(selectedItem){
            let me=this;
            this.modal_actualizarderivacion = false;
            //Variables para el solicitante
            var solicita = "";
            var idsolicita = "";
            var clasisolicita = "";
            var direccionsolicita = "";
            var telefonosolicita = "";

            var sexosolicita = "";
            var edadsolicita = "";
            var fechanasolicita = "";
            var curpsolicita = "";
            var docidentisolicita = "";
            var nacionalidadsolicita = "";
            var correosolicita = "";
            var estadocivilsolicita = "";
            var ocupacionsolicita = "";
            var nivelestudiosolicita = "";
            var religionsolicita = "";
            var tipodiscapacidadsolicita = "";
            //Variables para el requerido
            var requiere = "";
            var idrequiere = "";
            var clasirequiere = "";
            var direccionrequiere = "";
            var telefonorequiere = "";

            var sexorequiere = "";
            var edadrequiere = "";
            var fechanarequiere = "";
            var curprequiere = "";
            var docidentirequiere = "";
            var nacionalidadrequiere = "";
            var correorequiere = "";
            var estadocivilrequiere = "";
            var ocupacionrequiere = "";
            var nivelestudiorequiere = "";
            var religionrequiere = "";
            var tipodiscapacidadrequiere = "";
            //Variables para el delito
            var delite = "";
            var iddelite = "";

            //Variables para el representante
            var representanteRe = "";
            var idRe = "";
            var idpersonaRe = "";
            var curpRe = "";
            var sexoRe = "";
            var correoRe = "";
            var telefonoRe = "";
            var cedulaRe = "";
            var direccionRe = "";
            var tipo1Re = "";
            var tipo2Re = "";

                const index = this.tableDataRequeridos.indexOf(selectedItem); // Obtener el índice del registro
                if (index !== -1) 
                { 
                    //-----------------------------------SOLICITANTES-------------------------------------------------------------
                    //For para concatenar datos de los soolicitantes
                    for(var i=0; i<me.solicitantee.length; i++)
                    {
                        //Consulta nuevamente a los representantes
                        await me.consultarRepresentante(me.solicitantee[i].value2, 2);

                        solicita += me.solicitantee[i].value;
                        idsolicita += me.solicitantee[i].value2;
                        clasisolicita += me.solicitantee[i].value3;
                        direccionsolicita += me.solicitantee[i].value4;
                        telefonosolicita += me.solicitantee[i].value5;
                        sexosolicita  += me.solicitantee[i].value6;
                        edadsolicita  += me.solicitantee[i].value7;
                        fechanasolicita  += me.solicitantee[i].value8;
                        curpsolicita  += me.solicitantee[i].value9;
                        docidentisolicita  += me.solicitantee[i].value10;
                        nacionalidadsolicita  += me.solicitantee[i].value11;
                        correosolicita  += me.solicitantee[i].value12;
                        estadocivilsolicita  += me.solicitantee[i].value13;
                        ocupacionsolicita  += me.solicitantee[i].value14;
                        nivelestudiosolicita  += me.solicitantee[i].value15;
                        religionsolicita  += me.solicitantee[i].value16;
                        tipodiscapacidadsolicita  += me.solicitantee[i].value17;

                        if(i+1 != me.solicitantee.length)
                        {
                            solicita += "; ";
                            idsolicita += "; ";
                            clasisolicita += "; ";
                            direccionsolicita += "; ";
                            telefonosolicita += "; ";
                            sexosolicita  += "; ";
                            edadsolicita  += "; ";
                            fechanasolicita  += "; ";
                            curpsolicita  += "; ";
                            docidentisolicita  += "; ";
                            nacionalidadsolicita  += "; ";
                            correosolicita  += "; ";
                            estadocivilsolicita  += "; ";
                            ocupacionsolicita  += "; ";
                            nivelestudiosolicita  += "; ";
                            religionsolicita  += "; ";
                            tipodiscapacidadsolicita  += "; ";
                        }
                    }

                    //-------------------------------------REQUERIDOS-------------------------------------------------------------
                    //For para concatenar los nombre de los requeridos
                    for(var i=0; i<me.requeridoe.length; i++)
                    {
                        //Consulta nuevamente a los representantes
                        await me.consultarRepresentante(me.requeridoe[i].value2, 2);

                        requiere += me.requeridoe[i].value;
                        idrequiere += me.requeridoe[i].value2;
                        clasirequiere += me.requeridoe[i].value3;
                        direccionrequiere += me.requeridoe[i].value4;
                        telefonorequiere += me.requeridoe[i].value5;
                        sexorequiere   += me.requeridoe[i].value6;
                        edadrequiere += me.requeridoe[i].value7;
                        fechanarequiere += me.requeridoe[i].value8;
                        curprequiere += me.requeridoe[i].value9;
                        docidentirequiere += me.requeridoe[i].value10;
                        nacionalidadrequiere += me.requeridoe[i].value11;
                        correorequiere += me.requeridoe[i].value12;
                        estadocivilrequiere += me.requeridoe[i].value13;
                        ocupacionrequiere += me.requeridoe[i].value14;
                        nivelestudiorequiere += me.requeridoe[i].value15;
                        religionrequiere += me.requeridoe[i].value16;
                        tipodiscapacidadrequiere += me.requeridoe[i].value17;

                        if(i+1 != me.requeridoe.length)
                        {
                            requiere += "; ";
                            idrequiere += "; ";
                            clasirequiere += "; ";
                            direccionrequiere += "; ";
                            telefonorequiere += "; ";
                            sexorequiere += "; ";
                            edadrequiere += "; ";
                            fechanarequiere += "; ";
                            curprequiere += "; ";
                            docidentirequiere += "; ";
                            nacionalidadrequiere += "; ";
                            correorequiere += "; ";
                            estadocivilrequiere += "; ";
                            ocupacionrequiere += "; ";
                            nivelestudiorequiere += "; ";
                            religionrequiere += "; ";
                            tipodiscapacidadrequiere += "; ";
                        }
                            
                    }

                    //-----------------------------------------------------------------------------
                    //For para concatenar los nombre del delito
                    for(var i=0; i<me.delitoe.length; i++)
                    {
                        delite += me.delitoe[i].value;
                        iddelite += me.delitoe[i].code;

                        if(i+1 != me.delitoe.length)
                        {
                            delite += "; ";
                            iddelite += "; ";
                        }
                    }

                    //-----------------------------------REPRESENTANTES---------------------------------------------
                    //For para concatenar los datos de los representantes
                    for(var i=0; i<me.representantesEdit.length; i++)
                    {
                        idRe += me.representantesEdit[i].idRepresentante;
                        idpersonaRe += me.representantesEdit[i].personaId;
                        representanteRe += me.representantesEdit[i].nombreCompleto;
                        curpRe += me.representantesEdit[i].curp;
                        sexoRe += me.representantesEdit[i].sexo;
                        correoRe  += me.representantesEdit[i].correoElectronico;
                        telefonoRe  += me.representantesEdit[i].telefono;
                        cedulaRe  += me.representantesEdit[i].cedulaProfesional;
                        direccionRe  += me.representantesEdit[i].direccion;
                        tipo1Re  += me.representantesEdit[i].tipo1Nombre;
                        tipo2Re  += me.representantesEdit[i].tipo2Nombre;

                        if(i+1 != me.representantes.length)
                        {
                            idRe += "; ";
                            idpersonaRe += "; ";
                            representanteRe += "; ";
                            curpRe += "; ";
                            sexoRe += "; ";
                            correoRe  += "; ";
                            telefonoRe  += "; ";
                            cedulaRe  += "; ";
                            direccionRe  += "; ";
                            tipo1Re  += "; ";
                            tipo2Re  += "; ";
                        }
                    }

                          
                    //Declarar todas las variables para actualizrlas en en arreglo
                    const registroActualizado = 
                    {
                    
                        nombreSol:solicita,
                        idSol:idsolicita,
                        clasiSol:clasisolicita,
                        direSol:direccionsolicita,
                        telSol:telefonosolicita,
                        sexoSol:sexosolicita,
                        edadSol:edadsolicita,
                        fenaSol:fechanasolicita,
                        curpSol:curpsolicita,
                        docideSol:docidentisolicita,
                        naciSol:nacionalidadsolicita,
                        correoSol:correosolicita,
                        escivSol:estadocivilsolicita,
                        ocuSol:ocupacionsolicita,
                        nivesSol:nivelestudiosolicita,
                        relSol:religionsolicita,
                        tipodisSol:tipodiscapacidadsolicita,
                        nombreReq:requiere,
                        idReq:idrequiere,
                        clasiReq:clasirequiere,
                        direReq:direccionrequiere,
                        telReq:telefonorequiere,
                        sexoReq:sexorequiere,
                        edadReq:edadrequiere,
                        fenaReq:fechanarequiere,
                        curpReq:curprequiere,
                        docideReq:docidentirequiere,
                        naciReq:nacionalidadrequiere,
                        correoReq:correorequiere,
                        escivReq:estadocivilrequiere,
                        ocuReq:ocupacionrequiere,
                        nivesReq:nivelestudiorequiere,
                        relReq:religionrequiere,
                        tipodisReq:tipodiscapacidadrequiere,
                        nombreDel:delite,
                        idDel:iddelite
                    };
      
                    //Declarar todas las variables para actualizrlas el arreglo del representante
                    const representanteActualizado = 
                    {
                        idRepre: idRe, personaIdRepre: idpersonaRe, nombreRepre: representanteRe, curpRepre: curpRe, sexoRepre: sexoRe, correoRepre: correoRe, telefonoRepre: telefonoRe, 
                        cedulaRepre: cedulaRe, direccionRepre: direccionRe, tipo1Repre: tipo1Re, tipo2Repre: tipo2Re
                    };

                    // Reemplazar el registro existente con el registro actualizado utilizando splice
                    this.tableDataRequeridos.splice(index, 1,registroActualizado); 
                    this.tableDataRepresentantes.splice(index, 1,representanteActualizado); 

                    this.representantesEdit = [];
                    this.representantesValidadosEdit = {};
                }
                    //Limpia los autocomplete e imprime en consola los datos de la tabla
                    me.solicitante = '';
                    me.requerido = '';
                    me.delito = '';
        },
        borrarDerivacion(item){
            const index = this.tableDataRequeridos.indexOf(item); // Obtener el índice del registro
                if (index !== -1) 
                {
                    this.tableDataRequeridos.splice(index, 1); 
                    this.tableDataRepresentantes.splice(index, 1);
                }
        },
       actualizarDerivacion(item){

           let me= this;
           //Arreglos para los datos del solicitante
           var arraySolicitantes = [];
           var arraySolicitantesid = [];
           var arraySolicitantescla = [];
           var arraySolicitantesdir = [];
           var arraySolicitantestel = [];

           var arraySolicitantessexo = [];
           var arraySolicitantesedad = [];
           var arraySolicitantesfec = [];
           var arraySolicitantescurp = [];
           var arraySolicitantesdoc = [];
           var arraySolicitantesnac = [];
           var arraySolicitantescor = [];
           var arraySolicitantesest = [];
           var arraySolicitantesocu = [];
           var arraySolicitantesniv = [];
           var arraySolicitantesrel = [];
           var arraySolicitantesdis = [];
           //Arreglos para los datos del requerido
           var arrayRequeridos = [];
           var arrayRequeridosid = [];
           var arrayRequeridoscla = [];
           var arrayRequeridosdir = [];
           var arrayRequeridostel = [];

           var arrayRequeridossexo = [];
           var arrayRequeridosedad = [];
           var arrayRequeridosfec = [];
           var arrayRequeridoscurp = [];
           var arrayRequeridosdoc = [];
           var arrayRequeridosnac = [];
           var arrayRequeridoscor = [];
           var arrayRequeridosest = [];
           var arrayRequeridosocu = [];
           var arrayRequeridosniv = [];
           var arrayRequeridosrel = [];
           var arrayRequeridosdis = [];

           //Arreglos para los datos del delito
           var arrayDelitos = [];
           var arrayDelitosid = [];
           //La primera funcion hace que funcione la ventana emergente con respecto a los datos de (props.item), la segunda solo lo la muestra
           this.selectedItem = item;
           this.modal_actualizarderivacion = true;


               //La funcion split separa una cadena por lo que pongas en el parentesis

               //Separa los datos por ; de los datos del solicitate
               arraySolicitantes = item.nombreSol.split("; ");
               arraySolicitantesid = item.idSol.split("; ");
               arraySolicitantescla = item.clasiSol.split("; ");
               arraySolicitantesdir = item.direSol.split("; ");
               arraySolicitantestel = item.telSol.split("; ");

               arraySolicitantessexo = item.sexoSol.split("; ");
               arraySolicitantesedad = item.edadSol.split("; ");
               arraySolicitantesfec = item.fenaSol.split("; ");
               arraySolicitantescurp = item.curpSol.split("; ");
               arraySolicitantesdoc = item.docideSol.split("; ");
               arraySolicitantesnac = item.naciSol.split("; ");
               arraySolicitantescor = item.correoSol.split("; ");
               arraySolicitantesest = item.escivSol.split("; ");
               arraySolicitantesocu = item.ocuSol.split("; ");
               arraySolicitantesniv = item.nivesSol.split("; ");
               arraySolicitantesrel = item.relSol.split("; ");
               arraySolicitantesdis = item.tipodisSol.split("; ");

               //Declara en arreglo los modelos de la ventana emergente para almacenar los datos abtraidos del item
               me.solicitantee = [];
               //El siguiente for almacen los datos declarados de los solicitantes
               for (let i = 0; i < arraySolicitantes.length; i++) {
               me.solicitantee.push({
                   text: arraySolicitantes[i],
                   value: arraySolicitantes[i],
                   value2: arraySolicitantesid[i],
                   value3: arraySolicitantescla[i],
                   value4: arraySolicitantesdir[i],
                   value5: arraySolicitantestel[i],
                   value6: arraySolicitantessexo[i],
                   value7: arraySolicitantesedad[i],
                   value8: arraySolicitantesfec[i],
                   value9: arraySolicitantescurp[i],
                   value10: arraySolicitantesdoc[i],
                   value11: arraySolicitantesnac[i],
                   value12: arraySolicitantescor[i],
                   value13: arraySolicitantesest[i],
                   value14: arraySolicitantesocu[i],
                   value15: arraySolicitantesniv[i],
                   value16: arraySolicitantesrel[i],
                   value17: arraySolicitantesdis[i]

               });
               }         

               //Separa los datos por ; de los datos del requerido       
               arrayRequeridos = item.nombreReq.split("; ");
               arrayRequeridosid = item.idReq.split("; ");
               arrayRequeridoscla = item.clasiReq.split("; ");
               arrayRequeridosdir = item.direReq.split("; ");
               arrayRequeridostel = item.telReq.split("; ");

               arrayRequeridossexo = item.nombreReq.split("; ");
               arrayRequeridosedad = item.idReq.split("; ");
               arrayRequeridosfec = item.clasiReq.split("; ");
               arrayRequeridoscurp = item.direReq.split("; ");
               arrayRequeridosdoc = item.telReq.split("; ");
               arrayRequeridosnac = item.nombreReq.split("; ");
               arrayRequeridoscor = item.idReq.split("; ");
               arrayRequeridosest = item.clasiReq.split("; ");
               arrayRequeridosocu = item.direReq.split("; ");
               arrayRequeridosniv = item.telReq.split("; ");
               arrayRequeridosrel = item.nombreReq.split("; ");
               arrayRequeridosdis = item.idReq.split("; ");
               //Declara en arreglo los modelos de la ventana emergente para almacenar los datos abtraidos del item
               me.requeridoe = [];
               //El siguiente for almacen los datos declarados de los requeridos                
               for (let i = 0; i < arrayRequeridos.length; i++) {
               me.requeridoe.push({
                   text: arrayRequeridos[i],
                   value: arrayRequeridos[i],
                   value2: arrayRequeridosid[i],
                   value3: arrayRequeridoscla[i],
                   value4: arrayRequeridosdir[i],
                   value5: arrayRequeridostel[i],
                   value6: arrayRequeridossexo[i],
                   value7: arrayRequeridosedad[i],
                   value8: arrayRequeridosfec[i],
                   value9: arrayRequeridoscurp[i],
                   value10: arrayRequeridosdoc[i],
                   value11: arrayRequeridosnac[i],
                   value12: arrayRequeridoscor[i],
                   value13: arrayRequeridosest[i],
                   value14: arrayRequeridosocu[i],
                   value15: arrayRequeridosniv[i],
                   value16: arrayRequeridosrel[i],
                   value17: arrayRequeridosdis[i]
               });
               }  


               //Separa los datos por ; de los datos del delito
               arrayDelitos = item.nombreDel.split("; ");
               arrayDelitosid = item.idDel.split("; ");
               //Declara en arreglo los modelos de la ventana emergente para almacenar los datos abtraidos del item
               me.delitoe = [];
               //El siguiente for almacen los datos declarados del delito                
               for (let i = 0; i < arrayDelitos.length; i++) {
               me.delitoe.push({
                   text: arrayDelitos[i],
                   value: arrayDelitos[i],
                   code: arrayDelitosid[i],
               });
               } 

       },
       listardelitoshecho(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
               me.delitosderivados=[];
               //************************************************ */
               var delitosarray=[];
               this.$cat.get('api/RDHs/ListarPorHechoMASC/'+ me.rHechoId,configuracion).then(function(response){
                   delitosarray=response.data;
                   delitosarray.map(function(x){
                       me.delitos.push({text: x.nombreDelito,value:x.nombreDelito,code: x.idRDH});
               });
               }).catch(err => {
                   if (err.response.status==400){
                       me.$notify("No es un usuario válido", 'error')
                   } else if (err.response.status==401){
                       me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                       me.e401 = true,
                       me.showpage= false
                   } else if (err.response.status==403){
                       me.$notify("No esta autorizado para ver esta página", 'error')
                       me.e403= true
                       me.showpage= false
                   } else if (err.response.status==404){
                       me.$notify("El recuso no ha sido encontrado", 'error')
                   }else{
                       me.$notify('Error al intentar listar los registros','error')
                   }
               });
               //************************************************ */

       },
       informacionagencia(){
               let me=this;
               let header={"Authorization" : "Bearer " + this.$store.state.token};
               let configuracion= {headers : header};
           me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia,configuracion).then(function(response){
               me.direccionAgencia=response.data.direccion;
               me.telefonosAgencia= response.data.telefono;
               me.u_aqd =response.data.clave;
               }).catch(err => {
                   if (err.response.status==400){
                       me.$notify("No es un usuario válido", 'error')
                   } else if (err.response.status==401){
                       me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                       me.e401 = true,
                       me.showpage= false
                   } else if (err.response.status==403){
                       me.$notify("No esta autorizado para ver esta página", 'error')
                       me.e403= true
                       me.showpage= false
                   } else if (err.response.status==404){
                       me.$notify("El recuso no ha sido encontrado", 'error')
                   }else{
                       me.$notify('Error al intentar listar los registros','error')
                   }
               });
       },
       listarrHecho(){

               let me=this;
               let header={"Authorization" : "Bearer " + this.$store.state.token};
               let configuracion= {headers : header};
               this.$cat.get('api/RHechoes/ListarPorId/' +me.rHechoId,configuracion).then(function(response){

                   me.rBreve = response.data.rBreve,
                   me.nucId = response.data.nucId,


                   me.listarrapnew();
                   me.informacionagencia();
               }).catch(err => {
                   if (err.response.status==400){
                       me.$notify("No es un usuario válido", 'error')
                   } else if (err.response.status==401){
                       me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                       me.e401 = true,
                       me.showpage= false
                   } else if (err.response.status==403){
                       me.$notify("No esta autorizado para ver esta página", 'error')
                       me.e403= true
                       me.showpage= false
                   } else if (err.response.status==404){
                       me.$notify("El recuso no ha sido encontrado", 'error')
                   }else{
                       me.$notify('Error al intentar listar los registros','error')
                   }
               });

       },           
       mostrarpdf(nombre,puesto,agencia){

           let me=this; 
           var dd = me.downloadPdf();
           var pdfMake = require('pdfmake/build/pdfmake.js')
           var htmlToPdfmake = require("html-to-pdfmake");

           if (pdfMake.vfs == undefined){
                   var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                   pdfMake.vfs = pdfFonts.vfs; 
           }


           var dd = me.downloadPdf(nombre,puesto,agencia);
           var doc = pdfMake.createPdf(dd);
           me.modaldocumento=true;    

           var doc = pdfMake.createPdf(dd).print();
           
       },
       crearPdf_Derivacion1(re_arregloConjunto, re_conjuntoRepresentantes) {
                let me = this;
                pdfMake.vfs = pdfFonts.vfs;

               //***************************************************************************** */
               // VARIABLES
               //***************************************************************************** */
               var logo1 = this.logo1;
               var logo2 = this.logo2;
               var logo3 = this.logo3;
               var logo4 = this.logo4;
               var dia = moment().format("DD");
               var mes = moment().format('MMMM');
               var año= moment().format("YYYY");
               var fecha = dia + " de " + mes  + " del " + año;
               var cuerpoConcatenado = "";

               if(me.reimpresion == -1)
               {
                me.nombreFirma = this.u_nombre;
                me.puestoFirma = this.u_puesto;
                me.agenciaFirma = this.u_agencia;
               }
               
               //Esta funcion convierte el valor del texto del editor en texto normal, debo decir que muestra multiples warnings en consola, no hay que espantarse, es una error en general
               var htmltexto = htmlToPdfmake(this.rBreve);

               //***************************************************************************** */
                  const htmlContent = htmlToPdfmake(
                      'Con fundamento en lo dispuesto por los artículos 17 párrafo quinto de la Constitución Política de los Estados Unidos Mexicanos; 109 fracción X,'+
                      ' 131 fracción XVIII, 184 fracción I, 186, 187, 188, 189 del Código Nacional de Procedimientos Penales; 1, 2, 4 fracción I, 5, 6, 9, 10,  de la Ley '+
                      'Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal; y después de haber orientado e informado al denunciante y/o '+
                      'querellante, sobre los Mecanismos Alternativos de Solución de Controversias en Materia Penal, en qué consisten éstos y sus alcances, y  estando de '+
                      'acuerdo '+ (me.nombresParaPdf()) + ' (víctima u ofendido), me permito derivar el asunto con Número Único de Caso que al rubro se indica, a efecto de realizar el trámite'+
                      ' necesario para dar inicio al Mecanismo que corresponda, proporcionado para ello, los siguientes datos: '
                  );
                  const contenidoDR = htmlToPdfmake(
                      'De lo anterior se desprende que el delito del que se trata es procedente de una solución alterna como lo es el Acuerdo Reparatorio, '+
                      'a través de la aplicación de los Mecanismos Alternativos de Solución de Controversias en Materia Penal. '
                  );
                  const contenidoFinal = htmlToPdfmake(
                      'NOTA: ES IMPORTANTE PRECISAR QUE EL DELITO POR EL CUAL SE HACE LA DERIVACIÓN, SEA PROCEDENTE PARA LA CELEBRACIÓN DEL ACUERDO REPARATORIO' +
                      '  CONFORME A LO DISPUESTO POR EL  ARTÍCULO 187 DEL CÓDIGO NACIONAL DE PROCEDIMIENTOS PENALES. '
                  );

                for (var i = 0; i < re_arregloConjunto.length; i++) {
                    var item = re_arregloConjunto[i];

                    // Obtener el conjunto de representantes para esta iteración
                    let conjuntoRepresentantesActual = re_conjuntoRepresentantes[i];

                    // Procesar los representantes del conjunto
                    let representantesProcesados = Object.keys(conjuntoRepresentantesActual).length > 0
                        ? [{
                            idRepre: (conjuntoRepresentantesActual.idRepre || "").split('; ').map(id => id.trim()),
                            personaIdRepre: (conjuntoRepresentantesActual.personaIdRepre || "").split('; ').map(id => id.trim()),
                            nombreRepre: (conjuntoRepresentantesActual.nombreRepre || "").split('; ').map(nombre => nombre.trim()),
                            tipo1Repre: (conjuntoRepresentantesActual.tipo1Repre || "").split('; ').map(tipo1 => tipo1.trim()),
                            tipo2Repre: (conjuntoRepresentantesActual.tipo2Repre || "").split('; ').map(tipo2 => tipo2.trim()),
                            telefonoRepre: (conjuntoRepresentantesActual.telefonoRepre || "").split('; ').map(tel => tel.trim()),
                            correoRepre: (conjuntoRepresentantesActual.correoRepre || "").split('; ').map(correo => correo.trim()),
                            direccionRepre: (conjuntoRepresentantesActual.direccionRepre || "").split('; ').map(dir => dir.trim())
                        }]
                    : [];

                    //Datos del Solictante
                    var ids = item.idSol.split('; ');
                    var nombress = item.nombreSol.split('; ');
                    var clasificacions = item.clasiSol.split('; ');
                    var domicilios = item.direSol.split('; ');
                    var telefonos = item.telSol.split('; ');

                    //Datos del Requerido
                    var idr = item.idReq.split('; '); 
                    var nombresr = item.nombreReq.split('; ');
                    var clasificacionr = item.clasiReq.split('; ');
                    var domicilior = item.direReq.split('; ');
                    var telefonor = item.telReq.split('; ');
                    
                    //Datos del Delito
                    var delito = item.nombreDel.split('; ');

                    //for para recorrer los solictantes
                    for (let j = 0; j < nombress.length; j++) 
                    {
                        var cuerpoDO = "Nombre Solicitante: " + nombress[j] + " (" + clasificacions[j] + ")" +"\n" +
                                        "Domicilio: " + domicilios[j] + "\n" +
                                        "No. Telefonico: " + telefonos[j]+"\n";

                        // Buscar representantes correspondientes al solicitante
                        let tieneRepresentanteActivo = false;
                        let mensajeRepresentantes = `\nRepresentante(s):\n`;
                        let representantesSol = [];

                        // Verificar si hay alguna coincidencia de IDs entre el solicitante y el representante
                        representantesProcesados.forEach(rep => {
                            rep.personaIdRepre.forEach((idRep, index) => {
                                if (ids[j] === idRep) {
                                    representantesSol.push({
                                        nombre: rep.nombreRepre[index] || 'Desconocido',
                                        tipo1: rep.tipo1Repre[index] || 'No especificado',
                                        tipo2: rep.tipo2Repre[index] || 'No especificado',
                                        telefono: rep.telefonoRepre[index] || 'No especificado',
                                        correo: rep.correoRepre[index] || 'No especificado',
                                        direccion: rep.direccionRepre[index] || 'No especificado'
                                    });
                                }
                            });
                        });

                        representantesSol.forEach(representante => {
                            // Verificar si ambos tipos son "No activo"
                            if (representante.tipo1 === "No activo" && representante.tipo2 === "No activo") {
                                return;
                            }

                            // Si al menos uno es válido, lo consideramos activo
                            tieneRepresentanteActivo = true;

                            // Construir el mensaje excluyendo "No activo"
                            let tipo1 = representante.tipo1 !== "No activo" ? representante.tipo1 : "";
                            let tipo2 = representante.tipo2 !== "No activo" ? representante.tipo2 : "";

                            // Concatenar tipos (solo agregar "y" si ambos tipos son válidos y no vacíos)
                            let tipos = tipo1 && tipo2 ? `${tipo1} y ${tipo2}` : tipo1 || tipo2;

                            mensajeRepresentantes += `Nombre representante: ${representante.nombre}\n`;
                            mensajeRepresentantes += `Tipo: ${tipos}\n`;
                            // Mostrar Contacto solo si uno de los dos (correo o teléfono) tiene información
                            if (representante.correo !== 'No especificado' || representante.telefono !== 'No especificado') {
                                mensajeRepresentantes += `Contacto: ${representante.correo !== 'No especificado' ? representante.correo : ''} ${representante.telefono !== 'No especificado' ? representante.telefono : ''}`.trim()+'\n';
                            }

                            // Mostrar Dirección solo si tiene información
                            if (representante.direccion !== 'No especificado') {
                                mensajeRepresentantes += `Dirección: ${representante.direccion}\n`;
                            }
                        });

                        // Si no hay representantes activos
                        if (!tieneRepresentanteActivo) {
                            mensajeRepresentantes = "";
                        }
                        cuerpoDO += mensajeRepresentantes;

                        cuerpoConcatenado += cuerpoDO + "\n\n";
                    }

                    //for para recorrer los requeridos
                    for (let j = 0; j < nombresr.length; j++) 
                    {
                        var cuerpoDO = "Nombre del requerido: " + nombresr[j]+ " (" + clasificacionr[j] + ")" + "\n" +
                                        "Domicilio: " + domicilior[j] + "\n" +
                                        "No. Telefonico: " + telefonor[j]+"\n";
                        
                        // Para el requerido aplicamos la misma lógica
                        let tieneRepresentanteActivo = false;
                        let mensajeRepresentantes = `\nRepresentante(s):\n`;
                        let representantesReq = [];

                        // Verificar si hay alguna coincidencia de IDs entre el requerido y el representante
                        representantesProcesados.forEach(rep => {
                            rep.personaIdRepre.forEach((idRep, index) => {
                                if (idr[j] === idRep) {
                                    representantesReq.push({
                                        nombre: rep.nombreRepre[index] || 'Desconocido',
                                        tipo1: rep.tipo1Repre[index] || 'No especificado',
                                        tipo2: rep.tipo2Repre[index] || 'No especificado',
                                        telefono: rep.telefonoRepre[index] || 'No especificado',
                                        correo: rep.correoRepre[index] || 'No especificado',
                                        direccion: rep.direccionRepre[index] || 'No especificado'
                                    });
                                }
                            });
                        });

                        representantesReq.forEach(representante => {
                            // Verificar si ambos tipos son "No activo"
                            if (representante.tipo1 === "No activo" && representante.tipo2 === "No activo") {
                                return;
                            }

                            // Si al menos uno es válido, lo consideramos activo
                            tieneRepresentanteActivo = true;

                            // Construir el mensaje excluyendo "No activo"
                            let tipo1 = representante.tipo1 !== "No activo" ? representante.tipo1 : "";
                            let tipo2 = representante.tipo2 !== "No activo" ? representante.tipo2 : "";

                            // Concatenar tipos (solo agregar "y" si ambos tipos son válidos y no vacíos)
                            let tipos = tipo1 && tipo2 ? `${tipo1} y ${tipo2}` : tipo1 || tipo2;

                            mensajeRepresentantes += `Nombre representante: ${representante.nombre}\n`;
                            mensajeRepresentantes += `Tipo: ${tipos}\n`;
                            // Mostrar Contacto solo si uno de los dos (correo o teléfono) tiene información
                            if (representante.correo !== 'No especificado' || representante.telefono !== 'No especificado') {
                                mensajeRepresentantes += `Contacto: ${representante.correo !== 'No especificado' ? representante.correo : ''} ${representante.telefono !== 'No especificado' ? representante.telefono : ''}`.trim()+'\n';
                            }

                            // Mostrar Dirección solo si tiene información
                            if (representante.direccion !== 'No especificado') {
                                mensajeRepresentantes += `Dirección: ${representante.direccion}\n`;
                            }
                        });

                        // Si no hay representantes activos
                        if (!tieneRepresentanteActivo) {
                            mensajeRepresentantes = "";
                        }
                        cuerpoDO += mensajeRepresentantes;

                        cuerpoConcatenado += cuerpoDO + "\n\n";
                    }

                    //for para recorrer los delitos
                    for (let j = 0; j < delito.length; j++) 
                    {
                        var cuerpoDO = "Delito(s): " + delito[j];
                                    
                        cuerpoConcatenado += cuerpoDO + "\n\n";
                    }

                        var cuerpoDO = "------------------------------------------------------------------------------------------------------------------";
                        cuerpoConcatenado += cuerpoDO + "\n\n";
                    
                  };

                  const dd = {
                      pageSize: 'LEGAL',
                      pageOrientation: 'portrait',
                      pageMargins: [85, 130, 72, 60],
                      footer: function (currentPage, pageCount) 
                      {
                        const footerContent = 
                        [
                            {
                            image: logo4,
                            width: 612,
                            absolutePosition: { x: 0, y: 0 },
                            },
                            {
                            text:
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
                      
                   header: function(currentPage, pageCount, pageSize) {
                           
                           return [
                               { 
                                   image: logo3,
                                   width: 612, 
                                   absolutePosition: {x: 0, y: 0},
                                   
                               },               
                           ]
                   
                   },
               
                   content: [
                       {
                           text:  "\n" + "\n" ,
                           style: 'Adscripcion',
                           absolutePosition: {x: 85, y: 95},
                       },
                       {
                           text:
                           "Asunto: Derivación\n\n" ,                        
                           style: 'Nooficio',
                           alignment: 'right', 
                       }, 
                       {
                           text:"Número Único de Caso: " + this.nuc,                 
                           style: 'Titulo', 
                           alignment: 'right',
                           margin: [0, 25, 72, 0],
                           absolutePosition: {x: 85, y: 150},                               
                       },      
                       {
                           text:
                           "Número de Oficio "+ this.noOficio+  "\n\n" ,                        
                           style: 'Nooficio',
                           alignment: 'right', 
                       },    
                       {
                           text:
                           this.u_distrito+", Hidalgo a "+ fecha+ "\n\n\n",                        
                           style: 'Fecha',
                           alignment: 'right', 
                       },    
                       
                       {
                       text:  "LIC. " + this.dirigidoNombre,
                       style: 'Titulo'
                       },  
                       {
                       text:  "DIRECTOR(A) OPERATIVO DEL " +this.dirigidoDirSubProc,
                       style: 'Titulo'
                       },                 
                       {
                           text: "\n\n\n" + htmlContent ,                        
                           style: 'Texto',
                       },
                       {
                           text: "\n\n\n" + cuerpoConcatenado ,                        
                           style: 'Texto',
                       },
                       {
                           text: '\n\n'+ "BREVE NARRACIÓN DE LOS HECHOS: "+'\n',   
                           alignment :'justify',                     
                           style: 'DePara',                                                           
                       },
                       {
                           text:  htmltexto ,                        
                           style: 'Texto',
                       },
                       {
                           text: "\n" + contenidoDR ,                        
                           style: 'TextoN',
                       },
                       {
                           text: "\n" + contenidoFinal ,                        
                           style: 'TextoNS',
                       },
                       {
                           text: '\n'+ "Sin más por el momento quedo de Usted."+'\n',   
                           alignment :'justify',                     
                           style: 'Texto',                                                           
                       },
                       {
                           text: '\n\n\n\n\n'+ "Lic. " + '\n' + me.nombreFirma + '\n' + me.puestoFirma +  ' de ' + '\n' +  me.agenciaFirma + ', \n de la  Procuraduria General de Justicia del Estado de Hidalgo',   
                           alignment :'center',                     
                           style: 'DePara',                                                           
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
                       
                       Adscripcion:{
                           fontSize: 10,
                           bold:true
                       },
                       Fecha:{
                           fontSize: 9,
                       },
                       Nooficio:{
                           fontSize: 8,
                           bold:true
                       },
                       DePara:{
                           fontSize: 10,
                           bold:true  
                       },
                       DeParaCargo:{
                           fontSize: 9,
                           bold:true 
                       },
                       PiePagina:{
                           fontSize: 7,
                           color: 'white'
                       },
                       Texto:{
                           fontSize: 10,
                           alignment:'justify'
                       },
                       TextoN:{
                           fontSize: 10,
                           alignment:'justify',
                           bold:true 
                       },
                       TextoNS:{
                           fontSize: 10,
                           alignment:'justify',
                           bold: true,
                           textDecoration: 'underline'
                       },
                       Titulo:{
                           fontSize: 12,
                           bold:true 
                       },
                       Subtitulo:{
                           fontSize: 11,
                       },
                   
                   }

               };

               if(this.reimpresion == 1)
               {
                    const pdfDoc = pdfMake.createPdf(dd);

                    // Genera el PDF y obtén la URL de datos (data URL)
                    pdfDoc.getDataUrl(async (dataUrl) => {
                      // Crea un objeto Blob desde la URL de datos
                      const blob = dataURItoBlob(dataUrl);

                      // Crea una URL de objeto a partir del Blob
                      const pdfUrl = URL.createObjectURL(blob);

                      // Abre una nueva ventana o pestaña del navegador con la URL del PDF
                      const newWindow = window.open(pdfUrl, '_blank');

                      const result = await Swal.fire({
                        title: '¿Este documento será firmado?',
                        text: 'Una vez firmado no podrás modificarlo, a menos que vuelvas a imprimir.',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Sí, firmar',
                        cancelButtonText: 'No'
                      });


                      if (result.isConfirmed) {
                        try {
                          const response = await firmarDocumento("https://drive.com", "12345", pdfUrl, "ROJM980130");
                          const pdfWindow = window.open(response[0]["DocFirmado"], '_blank');
                          if (pdfWindow) {
                            pdfWindow.focus();
                            pdfWindow.print(); // puede que esto funcione dependiendo del navegador y headers del PDF
                          }

                        } catch (error) {
                          console.log('Error al firmar:', error);
                        }
                      }
                      // Espera un momento antes de ejecutar la función de impresión (ajusta el tiempo según sea necesario)
                      setTimeout(() => {

                        //newWindow.print(); // Abre el cuadro de diálogo de impresión en la nueva ventana
                      }, 500); // Espera 1 segundo (puedes ajustar este tiempo según tus necesidades)
                    });

                    function dataURItoBlob(dataURI) {
                    const byteString = atob(dataURI.split(',')[1]);
                    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                    const ab = new ArrayBuffer(byteString.length);
                    const ia = new Uint8Array(ab);
                    for (let i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                    }
                    return new Blob([ab], { type: mimeString });
                    }

                    me.limpiar();

               }
               else
               {
                    const pdfDoc = pdfMake.createPdf(dd);

                    // Genera el PDF y obtén la URL de datos (data URL)
                    pdfDoc.getDataUrl((dataUrl) => {
                      this.base64pdf = dataUrl;
                      this.canvasid = "canvaspdf2"
                      this.renderPdfToCanvas(dataUrl.split(",")[1], "canvaspdf2", this.numpage)
                    this.pdfUrl = dataUrl; // Almacena la URL del PDF en la variable pdfUrl
                    // Establece la fuente del iframe con la URL del PDF
                    this.$refs.pdfFrame.src = this.pdfUrl;
                    });
                    this.modal_Derivacion=true;

            }
       },           
        crearPdf_Derivacion2(re_arregloConjunto, re_conjuntoRepresentantes) {
            let me = this;
            pdfMake.vfs = pdfFonts.vfs;

            //***************************************************************************** */
            // VARIABLES
            //***************************************************************************** */
            var logo1 = this.logo1;
            var logo2 = this.logo2;
            var logo3 = this.logo3;
            var logo4 = this.logo4;
            var hora = moment().format("HH");
            var dia = moment().format("DD");
            var mes = moment().format('MMMM');
            var año= moment().format("YYYY");
            var primerSol = "";
            var primerSolCla = "";
            var cuerpoConcatenado = "";

            //Esta funcion convierte el valor del texto del editor en texto normal, debo decir que muestra multiples warnings en consola, no hay que espantarse, es una error en general
            var htmltexto = htmlToPdfmake(this.rBreve);

            //***************************************************************************** */
            
                for (var i = 0; i < re_arregloConjunto.length; i++) {
                    var item = re_arregloConjunto[i];

                    // Obtener el conjunto de representantes para esta iteración
                    let conjuntoRepresentantesActual = re_conjuntoRepresentantes[i];

                    // Procesar los representantes del conjunto
                    let representantesProcesados = Object.keys(conjuntoRepresentantesActual).length > 0
                        ? [{
                            idRepre: (conjuntoRepresentantesActual.idRepre || "").split('; ').map(id => id.trim()),
                            personaIdRepre: (conjuntoRepresentantesActual.personaIdRepre || "").split('; ').map(id => id.trim()),
                            nombreRepre: (conjuntoRepresentantesActual.nombreRepre || "").split('; ').map(nombre => nombre.trim()),
                            tipo1Repre: (conjuntoRepresentantesActual.tipo1Repre || "").split('; ').map(tipo1 => tipo1.trim()),
                            tipo2Repre: (conjuntoRepresentantesActual.tipo2Repre || "").split('; ').map(tipo2 => tipo2.trim()),
                            telefonoRepre: (conjuntoRepresentantesActual.telefonoRepre || "").split('; ').map(tel => tel.trim()),
                            correoRepre: (conjuntoRepresentantesActual.correoRepre || "").split('; ').map(correo => correo.trim()),
                            direccionRepre: (conjuntoRepresentantesActual.direccionRepre || "").split('; ').map(dir => dir.trim())
                        }]
                    : [];

                    //Datos del Solictante
                    var ids = item.idSol.split('; ');
                    var nombress = item.nombreSol.split('; ');
                    var clasificacions = item.clasiSol.split('; ');
                    var domicilios = item.direSol.split('; ');
                    var telefonos = item.telSol.split('; ');
                    var sexos = item.sexoSol.split('; ');
                    var edads = item.edadSol.split('; ');
                    var fechanas = item.fenaSol.split('; ');
                    var curps = item.curpSol.split('; ');
                    var tipoides = item.docideSol.split('; ');
                    var nacionalidads = item.naciSol.split('; ');
                    var correos = item.correoSol.split('; ');
                    var estadocivs = item.escivSol.split('; ');
                    var ocupacions = item.ocuSol.split('; ');
                    var niveless = item.nivesSol.split('; ');
                    var religions = item.relSol.split('; ');
                    var discapacidads = item.tipodisSol.split('; ');

                    //Datos del Requerido
                    var idr = item.idReq.split('; ');
                    var nombresr = item.nombreReq.split('; ');
                    var clasificacionr = item.clasiReq.split('; ');
                    var domicilior = item.direReq.split('; ');
                    var telefonor = item.telReq.split('; ');
                    var sexor = item.sexoReq.split('; ');
                    var edadr = item.edadReq.split('; ');
                    var fechanar = item.fenaReq.split('; ');
                    var curpr = item.curpReq.split('; ');
                    var tipoider = item.docideReq.split('; ');
                    var nacionalidadr = item.naciReq.split('; ');
                    var correor = item.correoReq.split('; ');
                    var estadocivr = item.escivReq.split('; ');
                    var ocupacionr = item.ocuReq.split('; ');
                    var nivelesr = item.nivesReq.split('; ');
                    var religionr = item.relReq.split('; ');
                    var discapacidadr = item.tipodisReq.split('; ');
                    //Datos del Delito
                    var delito = item.nombreDel.split('; ');

                    primerSol = item.nombreSol[i];

                    //for para recorrer los solictantes
                    for (let j = 0; j < nombress.length; j++) 
                    {
                        let cuerpoDO = "DATOS DEL SOLICITANTE " + (j + 1) + "\n" +
                            "Nombre: " + nombress[j] + " (" + clasificacions[j] + ")" + "\t\t\t\t\t\t\t\t\t\t\t\tSexo: " + sexos[j] + "\n" +
                            "Edad: " + edads[j] + "\t\t\t\t\t\t\t\tFecha de nacimiento: " + fechanas[j] + "\t\t\t\t\t\t\t\tCURP: " + curps[j] + "\n" +
                            "Tipo de identificación: " + tipoides[j] + "\t\t\t\t\t\t\t\t\t\t\t\tNacionalidad: " + nacionalidads[j] + "\n" +
                            "Domicilio: " + domicilios[j] + "\n" +
                            "No. Telefonico: " + telefonos[j] + "\t\t\t\t\t\t\t\tCorreo electronico: " + correos[j] + "\n" +
                            "Estado familiar: " + estadocivs[j] + "\t\t\t\t\t\t\t\tOcupacion: " + ocupacions[j] + "\n" +
                            "Maximo grado de estudios: " + niveless[j] + "\t\t\t\t\t\t\t\tReligión: " + religions[j] + "\n" +
                            "Discapacidad: " + discapacidads[j] + "\n";

                        // Buscar representantes correspondientes al solicitante
                        let tieneRepresentanteActivo = false;
                        let mensajeRepresentantes = `\nRepresentante(s):\n`;
                        let representantesSol = [];

                        // Verificar si hay alguna coincidencia de IDs entre el solicitante y el representante
                        representantesProcesados.forEach(rep => {
                            rep.personaIdRepre.forEach((idRep, index) => {
                                if (ids[j] === idRep) {
                                    representantesSol.push({
                                        nombre: rep.nombreRepre[index] || 'Desconocido',
                                        tipo1: rep.tipo1Repre[index] || 'No especificado',
                                        tipo2: rep.tipo2Repre[index] || 'No especificado',
                                        telefono: rep.telefonoRepre[index] || 'No especificado',
                                        correo: rep.correoRepre[index] || 'No especificado',
                                        direccion: rep.direccionRepre[index] || 'No especificado'
                                    });
                                }
                            });
                        });

                        representantesSol.forEach(representante => {
                            // Verificar si ambos tipos son "No activo"
                            if (representante.tipo1 === "No activo" && representante.tipo2 === "No activo") {
                                return;
                            }

                            // Si al menos uno es válido, lo consideramos activo
                            tieneRepresentanteActivo = true;

                            // Construir el mensaje excluyendo "No activo"
                            let tipo1 = representante.tipo1 !== "No activo" ? representante.tipo1 : "";
                            let tipo2 = representante.tipo2 !== "No activo" ? representante.tipo2 : "";

                            // Concatenar tipos (solo agregar "y" si ambos tipos son válidos y no vacíos)
                            let tipos = tipo1 && tipo2 ? `${tipo1} y ${tipo2}` : tipo1 || tipo2;

                            mensajeRepresentantes += `Nombre representante: ${representante.nombre}\n`;
                            mensajeRepresentantes += `Tipo: ${tipos}\n`;
                            // Mostrar Contacto solo si uno de los dos (correo o teléfono) tiene información
                            if (representante.correo !== 'No especificado' || representante.telefono !== 'No especificado') {
                                mensajeRepresentantes += `Contacto: ${representante.correo !== 'No especificado' ? representante.correo : ''} ${representante.telefono !== 'No especificado' ? representante.telefono : ''}`.trim()+'\n';
                            }

                            // Mostrar Dirección solo si tiene información
                            if (representante.direccion !== 'No especificado') {
                                mensajeRepresentantes += `Dirección: ${representante.direccion}\n`;
                            }
                        });

                        // Si no hay representantes activos
                        if (!tieneRepresentanteActivo) {
                            mensajeRepresentantes = "";
                        }
                        cuerpoDO += mensajeRepresentantes;

                        cuerpoConcatenado += cuerpoDO + "\n\n";
                    }

                    //for para recorrer los requeridos
                    for (let j = 0; j < nombresr.length; j++) 
                    {
                        let cuerpoDO = "DATOS DEL REQUERIDO " + (j + 1) + "\n" +
                            "Nombre: " + nombresr[j] + " (" + clasificacionr[j] + ")" + "\t\t\t\t\t\t\t\t\t\t\t\tSexo: " + sexor[j] + "\n" +
                            "Edad: " + edadr[j] + "\t\t\t\t\t\t\t\tFecha de nacimiento: " + fechanar[j] + "\t\t\t\t\t\t\t\tCURP: " + curpr[j] + "\n" +
                            "Tipo de identificación: " + tipoider[j] + "\t\t\t\t\t\t\t\t\t\t\t\tNacionalidad: " + nacionalidadr[j] + "\n" +
                            "Domicilio: " + domicilior[j] + "\n" +
                            "No. Telefonico: " + telefonor[j] + "\t\t\t\t\t\t\t\tCorreo electronico: " + correor[j] + "\n" +
                            "Estado familiar: " + estadocivr[j] + "\t\t\t\t\t\t\t\tOcupacion: " + ocupacionr[j] + "\n" +
                            "Maximo grado de estudios: " + nivelesr[j] + "\t\t\t\t\t\t\t\tReligión: " + religionr[j] + "\n" +
                            "Discapacidad: " + discapacidadr[j] + "\n";

                        // Para el requerido aplicamos la misma lógica
                        let tieneRepresentanteActivo = false;
                        let mensajeRepresentantes = `\nRepresentante(s):\n`;
                        let representantesReq = [];

                        // Verificar si hay alguna coincidencia de IDs entre el requerido y el representante
                        representantesProcesados.forEach(rep => {
                            rep.personaIdRepre.forEach((idRep, index) => {
                                if (idr[j] === idRep) {
                                    representantesReq.push({
                                        nombre: rep.nombreRepre[index] || 'Desconocido',
                                        tipo1: rep.tipo1Repre[index] || 'No especificado',
                                        tipo2: rep.tipo2Repre[index] || 'No especificado',
                                        telefono: rep.telefonoRepre[index] || 'No especificado',
                                        correo: rep.correoRepre[index] || 'No especificado',
                                        direccion: rep.direccionRepre[index] || 'No especificado'
                                    });
                                }
                            });
                        });

                        representantesReq.forEach(representante => {
                            // Verificar si ambos tipos son "No activo"
                            if (representante.tipo1 === "No activo" && representante.tipo2 === "No activo") {
                                return;
                            }

                            // Si al menos uno es válido, lo consideramos activo
                            tieneRepresentanteActivo = true;

                            // Construir el mensaje excluyendo "No activo"
                            let tipo1 = representante.tipo1 !== "No activo" ? representante.tipo1 : "";
                            let tipo2 = representante.tipo2 !== "No activo" ? representante.tipo2 : "";

                            // Concatenar tipos (solo agregar "y" si ambos tipos son válidos y no vacíos)
                            let tipos = tipo1 && tipo2 ? `${tipo1} y ${tipo2}` : tipo1 || tipo2;

                            mensajeRepresentantes += `Nombre representante: ${representante.nombre}\n`;
                            mensajeRepresentantes += `Tipo: ${tipos}\n`;
                            // Mostrar Contacto solo si uno de los dos (correo o teléfono) tiene información
                            if (representante.correo !== 'No especificado' || representante.telefono !== 'No especificado') {
                                mensajeRepresentantes += `Contacto: ${representante.correo !== 'No especificado' ? representante.correo : ''} ${representante.telefono !== 'No especificado' ? representante.telefono : ''}`.trim()+'\n';
                            }

                            // Mostrar Dirección solo si tiene información
                            if (representante.direccion !== 'No especificado') {
                                mensajeRepresentantes += `Dirección: ${representante.direccion}\n`;
                            }
                        });

                        // Si no hay representantes activos
                        if (!tieneRepresentanteActivo) {
                            mensajeRepresentantes = "";
                        }
                        cuerpoDO += mensajeRepresentantes;

                        cuerpoConcatenado += cuerpoDO + "\n\n";
                    }
                    //---------------------------------

                    //for para recorrer los delitos
                    for (let j = 0; j < delito.length; j++) 
                    {
                        var cuerpoDO = "Delito(s): " + delito[j];
                                    
                        cuerpoConcatenado += cuerpoDO + "\n\n";
                    }

                        var cuerpoDO = "_____________________________________________________________________________________________________________";
                        cuerpoConcatenado += cuerpoDO + "\n\n";

                        //"_____________________________________________________________________________________________________________";
                    
                };

                var inicioOficio = 'En la Ciudad de Pachuca de Soto, estado de Hidalgo, siendo las '+ hora +' horas, del día '+ dia +' del mes de '+ mes +' del año ' + 
                    año +' y toda vez que se tiene presente ' + me.nombresParaPdf() + ' (víctima u ofendido)'+', a quien en este momento ' + 
                    'se le tiene a bien explicar de manera clara y completa, en qué consisten la soluciones alternas como lo es el acuerdo reparatorio mediante la aplicación ' + 
                    'de los mecanismos alternativos de solución de controversias en materia penal, sus ventajas, alcances y consecuencias. Esto debido a que el tipo penal ' + 
                    'que nos ocupa es procedente para solucionarlo por estos mecanismos. ';

                var segundaParteOficio = 'Por lo que en este momento ' + me.nombresParaPdf() +' sabedor(a) de ello, ' + 
                    'manifiesta su conformidad para participar en los Mecanismos Alternativos de Solución de Controversias, los cuales le han sido explicados, ' + 
                    'acordando voluntariamente someterse a los mismos y con el compromiso de ajustarse a las reglas que los disciplinan.  Así mismo autoriza ser ' + 
                    'notificado de todo asunto relacionado con el procedimiento a través de los datos de localización que proporcionó.' ;

                const htmlContent = htmlToPdfmake(
                    'Lo anterior con fundamento en lo dispuesto por los artículos 17 párrafo quinto de la Constitución Política de los Estados Unidos Mexicanos; ' +
                    '109 fracción X, 131 fracción XVIII, 184 fracción I,186, 187, 188, 189 del Código Nacional de Procedimientos Penales;1, 2, 4 fracción I, 5, 6, ' +
                    '9, 10,  de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal; por lo tanto me permito derivarla carpeta ' +
                    'de investigación que al rubro se indica, a efecto de relizar el trámite necesario para dar inicio al Mecanismo que corresponda, proporcionado ' +
                    'para ello, los siguientes datos: '
                );

                const dd = {
                    pageSize: 'LEGAL',
                    pageOrientation: 'portrait',
                    pageMargins: [85, 130, 72, 60],
                    footer: function (currentPage, pageCount) 
                    {
                    const footerContent = 
                    [
                        {
                        image: logo4,
                        width: 612,
                        absolutePosition: { x: 0, y: 0 },
                        },
                        {
                        text:
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
                    
                header: function(currentPage, pageCount, pageSize) {
                        
                        return [
                            { 
                                image: logo3,
                                width: 612, 
                                absolutePosition: {x: 0, y: 0},
                                
                            },               
                        ]
                
                },
            
                content: [
                    {
                        text:  "\n" + "\n" ,
                        style: 'Adscripcion',
                        absolutePosition: {x: 85, y: 95},
                    },
                    {
                        text:
                        "Asunto: Derivación y Solicitud para procedimiento de MASC\n\n" ,                        
                        style: 'Nooficio',
                        alignment: 'right', 
                    }, 
                    {
                        text:"Número Único de Caso: " + this.nuc,                 
                        style: 'Titulo', 
                        alignment: 'right',
                        margin: [0, 25, 72, 0],
                        absolutePosition: {x: 85, y: 150},                               
                    },                            
                    {
                    text:  "LIC. " + this.dirigidoNombre,
                    style: 'Titulo'
                    },  
                    {
                    text:  "DIRECTOR(A) OPERATIVO DEL " +this.dirigidoDirSubProc,
                    style: 'Titulo'
                    },   
                    {
                        text: "\n\n\n" + inicioOficio ,                        
                        style: 'Texto',
                    },    
                    {
                        text: "\n" + segundaParteOficio ,                        
                        style: 'Texto',
                    },
                    {
                        text: "\n" + "C. ___________________________________________" + "\n" + "(Debe ser llenado manualmente con nombre y firma por el solicitante (Víctima o Imputado)",                        
                        style: 'TextoN',
                        alignment :'center',  
                    },          
                    {
                        text: "\n" + htmlContent ,                        
                        style: 'Texto',
                    },
                    {
                        style: 'table',
                        table: {
                            headerRows: 1,
                            widths: ['*'],
                            body: [
                                [{  text:'DATOS DEL SOLICITANTE Y REQUERIDO', fillColor: '#eeeeee', fontSize: 14, bold: true, alignment: 'center'}],
                                [cuerpoConcatenado],

                            ]
                        },
                        layout: {
                                hLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 2 : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                                },
                                hLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                                },
                                vLineColor: function (i, node) {
                                    return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                                },
                            }
                },
                    {
                        text: '\n\n'+ "BREVE NARRACIÓN DE LOS HECHOS: "+'\n',   
                        alignment :'justify',                     
                        style: 'DePara',                                                           
                    },
                    {
                        text:  htmltexto ,                        
                        style: 'Texto',
                    },
                    
                    {
                        text: '\n'+ "Sin más por el momento quedo de Usted."+'\n',   
                        alignment :'justify',                     
                        style: 'Texto',                                                           
                    },
                    {
                    text: '\n\n\n\n\n'+ "Lic. " + '\n' + this.u_nombre + '\n' + this.u_puesto+  ' de ' + '\n' +  this.u_agencia + ', \n de la  Procuraduria General de Justicia del Estado de Hidalgo',   
                        alignment :'center',                     
                        style: 'DePara',                                                           
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
                    
                    Adscripcion:{
                        fontSize: 10,
                        bold:true
                    },
                    Fecha:{
                        fontSize: 9,
                    },
                    Nooficio:{
                        fontSize: 8,
                        bold:true
                    },
                    DePara:{
                        fontSize: 10,
                        bold:true  
                    },
                    DeParaCargo:{
                        fontSize: 9,
                        bold:true 
                    },
                    PiePagina:{
                        fontSize: 7,
                        color: 'white'
                    },
                    Texto:{
                        fontSize: 10,
                        alignment:'justify'
                    },
                    TextoN:{
                        fontSize: 10,
                        alignment:'justify',
                        bold:true 
                    },
                    TextoNS:{
                        fontSize: 10,
                        alignment:'justify',
                        bold: true,
                        textDecoration: 'underline'
                    },
                    Titulo:{
                        fontSize: 12,
                        bold:true 
                    },
                    Subtitulo:{
                        fontSize: 11,
                    },
                    table: {
                    fontSize: 8,
                    margin: [0, 5, 0, 15],
                    alignment: 'left',
                },
                
                }

            };

            if(this.reimpresion == 1)
            {
                const pdfDoc = pdfMake.createPdf(dd);

                // Genera el PDF y obtén la URL de datos (data URL)
                pdfDoc.getDataUrl(async (dataUrl) => {
                  // Crea un objeto Blob desde la URL de datos
                  const blob = dataURItoBlob(dataUrl);

                  // Crea una URL de objeto a partir del Blob
                  const pdfUrl = URL.createObjectURL(blob);

                  // Abre una nueva ventana o pestaña del navegador con la URL del PDF
                  const newWindow = window.open(pdfUrl, '_blank');

                  const result = await Swal.fire({
                    title: '¿Este documento será firmado?',
                    text: 'Una vez firmado no podrás modificarlo, a menos que vuelvas a imprimir.',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, firmar',
                    cancelButtonText: 'No'
                  });


                  if (result.isConfirmed) {
                    try {
                      const response = await firmarDocumento("https://drive.com", "12345", pdfUrl, "ROJM980130");
                      const pdfWindow = window.open(response[0]["DocFirmado"], '_blank');
                      if (pdfWindow) {
                        pdfWindow.focus();
                        pdfWindow.print(); // puede que esto funcione dependiendo del navegador y headers del PDF
                      }

                    } catch (error) {
                      console.log('Error al firmar:', error);
                    }
                  }
                  // Espera un momento antes de ejecutar la función de impresión (ajusta el tiempo según sea necesario)
                  setTimeout(() => {
                    //newWindow.print(); // Abre el cuadro de diálogo de impresión en la nueva ventana
                  }, 500); // Espera 1 segundo (puedes ajustar este tiempo según tus necesidades)
                });

                function dataURItoBlob(dataURI) {
                const byteString = atob(dataURI.split(',')[1]);
                const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ab], { type: mimeString });
                }

                me.limpiar();

            }
            else
            {
                const pdfDoc = pdfMake.createPdf(dd);

                // Genera el PDF y obtén la URL de datos (data URL)
                pdfDoc.getDataUrl((dataUrl) => {
                  this.base64pdf = dataUrl;
                  this.canvasid = "canvaspdf2"
                  this.renderPdfToCanvas(dataUrl.split(",")[1], "canvaspdf2", this.numpage)
                this.pdfUrl = dataUrl; // Almacena la URL del PDF en la variable pdfUrl
                // Establece la fuente del iframe con la URL del PDF
                this.$refs.pdfFrame.src = this.pdfUrl;
                });
                this.modal_Derivacion=true;

        }

       },
        nombresParaPdf() {
            let me =  this
            var array = []
            var nombres = ''
            me.complemento = 1
            var recorrer = me.tipoPDF != 1 ? me.re_arregloConjunto : me.tableDataRequeridos                           

           recorrer.map(ss => {            
               var aux = ss.nombreSol.split(";")

               aux.map(a => {
                   if (!array.includes(a.trim())) {                    
                        array.push(a.trim())
                    }
               })

           })

           me.complemento = array.length
            
            array.map(a => {
                
                if (nombres == '') {
                    nombres += `${a.trim()}`                    
                } else {
                 nombres += `, ${a.trim()}`
             }
            })               
        
          return `${array.length == 1 ? 'la/el C.' : 'Los C.'} ${nombres}`
        },
       mostrarpdf_DerivacionJR(){
               let me=this;
               //me.informacionderivacion();
               //Variables que contienen informacion de solicitantes, requeridos y delitos
               var arrayDerivaciones = [];
               var arraySolicitantespdf = [];
               var arrayRequeridospdf = [];
               var arrayDelitospdf = [];
               //contadores para solicitantes, requeridos y delitos
               var counts = 0;
               var countr = 0;
               var countd = 0;
           var dd;

           me.tipoPDF = 1

               //for para asignar los valores utilizados de las tablas
               for (var i = 0; i < this.tableDataRequeridos.length; i++) {
               var item = this.tableDataRequeridos[i];
               arrayDerivaciones.push(item);
               arraySolicitantespdf.push(item.nombreSol);
               arrayRequeridospdf.push(item.nombreReq);
               arrayDelitospdf.push(item.nombreDel);
               }

               //Contador de solicitantes
               for (var i = 0; i < this.tableDataRequeridos.length; i++) {
               var item = this.tableDataRequeridos[i];
               var nombress = item.nombreSol.split(';');
               counts += nombress.length;
               }

               //Contador de requeridos
               for (var i = 0; i < this.tableDataRequeridos.length; i++) {
               var item = this.tableDataRequeridos[i];
               var nombresr = item.nombreReq.split(';');
               countr += nombresr.length;
               }
               
               //Contador de delitos
               for (var i = 0; i < this.tableDataRequeridos.length; i++) {
               var item = this.tableDataRequeridos[i];
               var nombresd = item.nombreDel.split(';');
               countd += nombresd.length;
               }
               

              if ((counts >0) && (countr >0) && (countd >0) && me.distrito != '')
              {
                if (me.ene=="Con persona")
                {
                    me.crearPdf_Derivacion1(this.tableDataRequeridos, this.tableDataRepresentantes);
                }
                if (me.ene=="Sin persona")
                {
                    me.crearPdf_Derivacion2(this.tableDataRequeridos, this.tableDataRepresentantes);
                }
                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");
                //
                if (pdfMake.vfs == undefined)
                {
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs;
                }
              }
              else
              {
                   if (counts <=0) { 
                       me.$notify("Debe seleccionar personas solicitantes.", 'error')
                   };
                   if (countr <=0) { 
                       me.$notify("Debe seleccionar personas requeridas.", 'error')
                   };
                   if (countd <=0) { 
                       me.$notify("Debe seleccionar delitos a derivar.", 'error')
                   };
              }
              
       },
        imprimir_DerivacionNew() {
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            var idEnvioNew = '';
             var envioDerivacion = false;
            
            me.distritoSeleccionado=me.distrito.value;
            me.distritoNombre=me.distrito.value2;

            var arrayDerivaciones = [];   
            var counts = 0;
            var countr = 0;

            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información. Una vez realizada esta accion no prodra realizar cambios',
             function(){

            for (var i = 0; i < me.tableDataRequeridos.length; i++) {
                var item = me.tableDataRequeridos[i];
                arrayDerivaciones.push(item);
                }

            //Contador de solicitantes
            for (var i = 0; i < me.tableDataRequeridos.length; i++) {
                var item = me.tableDataRequeridos[i];
                var nombress = item.idSol.split(';');
                counts += nombress.length;
                }
            for (var i = 0; i < me.tableDataRequeridos.length; i++) {
                var item = me.tableDataRequeridos[i];
                var nombresr = item.idReq.split(';');
                countr += nombresr.length;
                }

            var solicitantes = counts + countr;
            var descripcionRegTabI = 'Registro de derivacion a Justicia Restaurativa ';

            // Si es el mismo distrito donde se envia lo inicalizamos como true
                if(me.distritoNombre == me.u_distrito)
                {
                    envioDerivacion = true;
                }
            //AQUI VA TODO EL CUERPO DEL CODIGO

            //SE GENERA UN SOLO EXPEDIENTE Y ENVIO
            me.$justiciarestaurativa.post('api/Expedientes/CrearExpedienteJRNew',
                    {
                        'rHechoId': me.rHechoId,
                        'sede': me.u_distrito,
                        'statusAcepRech': "Solicitado",
                        'autoridadqueDeriva': me.u_aqd,
                        'uqe_Distrito': me.u_distrito,
                        'uqe_DirSubProc': me.u_dirSubPro,
                        'uqe_Agencia': me.u_agencia,
                        'uqe_Modulo': me.u_modulo,
                        'uqe_Nombre': me.u_nombre,
                        'uqe_Puesto': me.u_puesto,
                        'statusBaja': false,
                        'statusGeneralEnvio': "Solicitado",
                        'espontaneoNoEspontaneo': me.ene,
                        'contadorNODerivacion': 1,
                        'noSolicitantes': solicitantes,
                        'DistritoIdDestino' : me.distrito.value,
                        'ArregloConjunto': JSON.stringify(me.tableDataRequeridos),
                        'ArregloRepresentantes': JSON.stringify(me.tableDataRepresentantes),
                        'statusEnvio': envioDerivacion,
                    },configuracion).then(function(response)
                    {

                        me.$notify('¡La información se guardo correctamente!','success')
                        //SE GUARDA EL VALOR DEL ID DE EXPEDIENTE O DEL ENVIO PARA LAS SIGUIENTES APIS
                        idEnvioNew = response.data.idenvio;
                        me.idExpedienteNew = response.data.idexpediente;

                    //FUNCION CICLICA PARA EL VALOR DE los IDs TANTO DE LOS SOLICITANTES, REQUE
                for (var i = 0; i < me.tableDataRequeridos.length; i++) 
                {
                    var item = me.tableDataRequeridos[i];
                    
                    me.$justiciarestaurativa.post('api/Expedientes/CrearConjunto',
                    {

                        'EnvioId': idEnvioNew,
                        'SolicitadosC': item.idSol,
                        'RequeridosC': item.idReq,
                        'DelitosC': item.idDel,
                        'NombreS': item.nombreSol,
                        'DireccionS': item.direSol,
                        'TelefonoS': item.telSol,
                        'ClasificacionS': item.clasiSol,
                        'NombreR': item.nombreReq,
                        'DireccionR': item.direReq,
                        'TelefonoR': item.telReq,
                        'ClasificacionR': item.clasiReq,
                        'NombreD': item.nombreDel,
                        'NoOficio':me.noOficio,
                        'ResponsableJR' : me.dirigidoNombre,
                        'NombreSubDirigido' : me.dirigidoDirSubProc,
                        

                    },configuracion).then((response)=>
                    {
                        //SE GUARDAN LOS VALORES GUARDADOS EN LA API ANTERIOR PARA USO EN LA API POSTERIOR
                        var idConjuntoNew = response.data.idconjunto;
                        var solicitantesNew = response.data.solicitados;
                        var requeridosNew = response.data.requeridos;
                        var clasificacionsNew = response.data.clasificacions;
                        var clasificacionRNew = response.data.clasificacionr;
                        var delitosNew = response.data.delitos;

                        me.$justiciarestaurativa.post('api/Expedientes/CrearSolReq',
                        {

                            'EnvioId': idEnvioNew,
                            'ConjuntoDerivacionesId': idConjuntoNew,
                            'SolicitantesC': solicitantesNew,
                            'RequeridosC': requeridosNew,
                            'ClasificacionS': clasificacionsNew,
                            'ClasificacionR': clasificacionRNew,
                            'DelitosC': delitosNew,

                        },configuracion).then((response)=>
                        {
                            me.$notify('¡La información se guardo correctamente!','success')
                            

                            
                        }).catch(err => {
                            if (err.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (err.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (err.response.status==403){
                                me.$notify("No esta autorizado para ver esta página", 'error')
                                me.e403= true
                                me.showpage= false
                            } else if (err.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar crear el  registro!!!','error')
                            }
                        });
                        
                    }).catch(err => {
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta página", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar crear el  registro!!!','error')
                        }
                    });
                                        
                }
                me.crearHistorial(me.rHechoId, me.u_modulo, me.u_distrito, me.u_dirSubPro, me.u_agencia, me.u_nombre, me.u_puesto, me.distrito.value2,);
                    if(me.distritoNombre != me.u_distrito)
                    {
                        me.$notify('Se inicia el copiado para derivacion en otro distrito','success')
                        /*me.$notify('Se inicia el el copiado para derivacion en otro distrito','success')                                                             
                                const services = [

                                                    'api/Racs/Clonar'
                                                ,'api/RAtencions/Clonar'
                                                ,'api/Nucs/Clonar'
                                                ,'api/RHechoes/Clonar'
                                                ,'api/RAPs/Clonar'
                                                ,'api/AmpDecs/Clonar'
                                                ,'api/RDHs/Clonar'
                                                ,'api/Representante/Clonar'
                                                ,'api/Turnoes/Clonar'
                                                ,'api/DireccionDelitoes/Clonar'
                                                ,'api/ClonacionJR/ClonarExpediente'
                                                ,'api/ClonacionJR/ClonarEnvio'
                                                ,'api/ClonacionJR/ClonarConjunto'
                                                ,'api/ClonacionJR/ClonarSolReq'
                                                ,'api/ClonacionJR/ClonarDelitos'
                                                
                                ];
                                const serviceNames=[
                                                    'RAC'   
                                                ,'Atencion'
                                                ,'NUC'
                                                ,'Hecho'
                                                ,'RAP'
                                                ,'Ampliación de Declaración'
                                                ,'Delitos'
                                                ,'Representante'
                                                ,'Turnos'
                                                ,'Direccion del Delito'
                                                ,'Expediente de la derivacion'
                                                ,'Envio de la derivacion'
                                                ,'Conjunto de derivaciones'
                                                ,'Solicitantes Requeridos'
                                                ,'Delitos derivados'
                                                
                                ];*/

                            me.activarAnimacionCarga();

                            copiarDerivacion(configuracion,me.services,me.serviceNames,0,me.nuc,me.rHechoId,me.rAtencionId,me.distritoSeleccionado,idEnvioNew,me.idExpedienteNew)
                            .then(function(response)
                            {
                                me.actualizarStatusEnvio(idEnvioNew, true);
                                me.comprobarDerivacionesMSG(me.idExpedienteNew);
                                me.desactivarAnimacionCarga();
                                
                            }).catch(err=>{
                                    if (err) {
                                        me.$notify('Error en el envio de derivación. Vuelvelo a intentar mas tarde.', 'error');
                                        me.limpiar();
                                        me.listarDerivaciones();
                                        me.desactivarAnimacionCarga();
                                    }
                                });
                                } else {
                            alert("La remision se realizo correctamente");
                            me.limpiar();
                            me.listarDerivaciones();
                        }
                        
                        //Finalizar la remision y regresando a la pantalla principal
                        me.crearRegistroTableroI(descripcionRegTabI);
                    })
                    .catch(err => {
                            if (err.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (err.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (err.response.status==403){ 
                                me.$notify("No esta autorizado para ver esta página", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (err.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar crear el  registro!!!','error')  
                            } 
                            });
                    //AQUI TERMINA
            },

            function()
            {
                alertify.warning('Verifica la información')
            }
            ).set('labels', {ok:'Guardar', cancel:'Cancelar'});
        },
        actualizarStatusEnvio(envioId, status) 
        {
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

            this.$justiciarestaurativa.put('api/Envios/StatusEnvioDerivacion',{
                'IdEnvio': envioId, 
                'statusEnvio': status
            },configuracion)
            .then(function(response){
            })
            .catch(err => { 
                        if (err.response.status==400){
                            me.$notify("No es un usuario válido", 'error')
                        } else if (err.response.status==401){
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                            me.showpage= false
                        } else if (err.response.status==403){
                            me.$notify("No esta autorizado para ver esta página", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar actualizar el registro!!!','error')
                        }
                    });
                },
                reenviarDerivacion(item)
        {
            let me = this;
            me.$notify('Se inicia el copiado para derivacion enen otro distrito','success')
            me.activarAnimacionCarga();
            me.rAtencionIdD = me.$store.state.ratencionid;
            me.rHechoIdD =  me.$store.state.rhechoid;

            let header={"Authorization" : "Bearer " + me.$store.state.token};
            let configuracion= {headers : header};

            copiarDerivacion(configuracion,me.services,me.serviceNames,0,item.nuc,me.rHechoIdD,me.rAtencionIdD,item.distritoIdDestino,item.idEnvio,item.expedienteId)
                .then(function(response)
                {
                    me.actualizarStatusEnvio(item.idEnvio, true);
                    me.comprobarDerivacionesMSG(item.expedienteId);
                    me.desactivarAnimacionCarga();
                }).catch(err=>
                {
                    if (err) {
                        me.$notify('Error en el envio de la derivación. Vuelvelo a intentar mas tarde.', 'error');
                        me.desactivarAnimacionCarga();
                    }
                });

            me.limpiar();
            me.listarDerivaciones();
        },
       limpiar() {
          let me  = this;
          this.modalAdd= false;
          this.modal_Derivacion=false;
          this.tableDataRequeridos = [];
          this.tableDataRepresentantes = [];

           me.clasificacionpersona = '';
           me.tipoPDF = 0 
            me.complemento = 1
          me.ene = '';
          me.solicitante = '';
          me.requerido = '';
          me.delito = '';
          me.distrito = '';
          me.noOficio = '';
          me.reimpresion = -1;
          me.re_arregloConjunto = '';
          me.noOficio = '';
          me.dirigidoNombre = '';
          me.idExpedienteNew = '';
          me.texto = 'Vista Previa'; 
          me.vistaPreviaTF = true;
          me.representantes = [];
          me.representantesValidados = {};
       },
       comprobarDerivacionesMSG(idExpedienteD) {
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var existeExpediente = 1;

            me.$justiciarestaurativa.get('api/Expedientes/ExisteExpedienteEspecifico/'+ idExpedienteD,configuracion).then(function (response) 
            {

                existeExpediente = response.data.existeExpediente;

                if(existeExpediente == 0){
                    alert("La derivacion a fallado, compruebe su conexion de internet e intentelo mas tarde Error:404");
                    me.limpiar();
                    me.listarDerivaciones();

                }
                else{
                    alert("Se realizo la derivacion correctamente");
                    me.limpiar();
                    me.listarDerivaciones();
                }

            }).catch(err => {
                if (err.response.status==400){
                    me.$notify("No es un usuario válido", 'error')
                } else if (err.response.status==401){
                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                    me.e401 = true,
                    me.showpage= false
                } else if (err.response.status==403){
                    me.$notify("No esta autorizado para ver esta página", 'error')
                    me.e403= true
                    me.showpage= false
                } else if (err.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                    me.$notify('Error al intentar crear el  registro!!!','error')
                }
            });           
       },
       crearRegistroTableroI(descripcionRegTabI){
               
               let me=this;
               let header={"Authorization" : "Bearer " + this.$store.state.token};
               let configuracion= {headers : header};
           
               this.$cat.post('api/RegistroTableroI/Crear',{
                   'RhechoId': me.rHechoId,
                   'TipoRegistroTableroI': descripcionRegTabI,
                   'Distrito': me.u_distrito,
                   'DirSub': me.u_dirSubPro,
                   'Agencia':me.u_agencia,
                   'ModuloServicioId': me.u_idmoduloservicio,
                   'Modulo':me.u_modulo,
                   'UsuarioId':me.u_idusuario,
                   'NombreUsuario': me.u_nombre,
                   },configuracion).then(function(response){
                   me.$notify('¡La información se guardo correctamente!','success')
               }).catch(err => {
                   if (err.response.status==400){
                       me.$notify("No es un usuario válido", 'error')
                   } else if (err.response.status==401){
                       me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                       me.e401 = true,
                       me.showpage= false
                   } else if (err.response.status==403){
                       me.$notify("No esta autorizado para ver esta página", 'error')
                       me.e403= true
                       me.showpage= false
                   } else if (err.response.status==404){
                       me.$notify("El recuso no ha sido encontrado", 'error')
                   }else{
                       me.$notify('Error al intentar crear el  registro!!!','error')
                   }
               });             
       },
       crearHistorial(rHechoId, u_modulo, u_distrito, u_dirSubPro, u_agencia, u_nombre, u_puesto, distritoDestino)
       {
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
        
            me.$cat.post('api/Historialcarpeta/Crear',{
                'RhechoId': rHechoId,
                'Detalle': "Derivación a Justicia Restaurativa",
                'Modulo': "Recepcion de carpeta",
                'Agencia': "Justicia Restaurativa PGJ - "+distritoDestino,
                'UDistrito':u_distrito,
                'USubproc': u_dirSubPro,
                'UAgencia': u_agencia,
                'Usuario': u_nombre,
                'UPuesto': u_puesto,
                'UModulo': u_modulo,
           
               },configuracion).then(function(response){
                   me.$notify('¡La información se guardo correctamente!','success')
               }).catch(err => {
                   if (err.response.status==400){
                       me.$notify("No es un usuario válido", 'error')
                   } else if (err.response.status==401){
                       me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                       me.e401 = true,
                       me.showpage= false
                   } else if (err.response.status==403){
                       me.$notify("No esta autorizado para ver esta página", 'error')
                       me.e403= true
                       me.showpage= false
                   } else if (err.response.status==404){
                       me.$notify("El recuso no ha sido encontrado", 'error')
                   }else{
                       me.$notify('Error al intentar crear el  registro!!!','error')
                   }
               });             
       },
       agregar(){
           let me  = this;
           this.modalAdd= true;
       },
       seleccionarlista(){
           let me= this;
           me.rapsVictimas=[];
           me.rapsImputados=[];
           me.listarrapnew();
           
           
           if (me.clasificacionpersona==="Victimas")
           {
               me.raps1 = me.rapsVictimas;
               me.raps2 = me.rapsImputados;
           }
           else
           {
               me.raps1 =  me.rapsImputados;
               me.raps2 = me.rapsVictimas;
           }
           me.solicitante = '';
           me.requerido = '';
           me.delito = '';
           me.distrito = '';
           me.representantes = [];
           me.representantesValidados = {};
       },
       obtenermes: function(mes) {
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
       listarrapnew(){
           let me=this;
           var victimasarray=[];
           let header={"Authorization" : "Bearer " + this.$store.state.token};
           let configuracion= {headers : header};
           this.$cat.get('api/RAPs/ListarVictimasJR/'+ me.rAtencionId,configuracion).then(function(response){
               victimasarray=response.data;
           victimasarray.map(function(x){
                   me.rapsVictimas.push({text: x.nombreC, value: x.nombreC, value2: x.personaId, value3: x.clasificacionPersona,
                                        value4:x.direccionP,value5:x.telefono1+','+x.telefono2, value6: x.sexo, value7: x.edad,
                                        value8: x.fechaNacimiento,value9: x.curp,value10: x.docIdentificacion,value11: x.nacionalidad,
                                        value12: x.correo,value13: x.estadoCivil,value14: x.ocupacion,value15: x.nivelEstudio,
                                        value16: x.religion,value17: x.tipoDiscapacidad});
               }); 

               if(response.data && response.data.length > 0)
               {
                me.tfV = true;
               }
               }).catch(err => {
                   if (err.response.status==400){
                       me.$notify("No es un usuario válido", 'error')
                   } else if (err.response.status==401){
                       me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                       me.e401 = true,
                       me.showpage= false
                   } else if (err.response.status==403){
                       me.$notify("No esta autorizado para ver esta página", 'error')
                       me.e403= true
                       me.showpage= false
                   } else if (err.response.status==404){
                       me.$notify("El recuso no ha sido encontrado", 'error')
                   }else{
                       me.$notify('Error al intentar listar los registros','error')
                   }
               });

           this.$cat.get('api/RAPs/ListarImputadoJR/'+ me.rAtencionId,configuracion).then(function(response){
               victimasarray=response.data;
               victimasarray.map(function(x){
                   me.rapsImputados.push({text: x.nombreC, value: x.nombreC, value2: x.personaId, value3: x.clasificacionPersona,
                                           value4:x.direccionP,value5:x.telefono1+','+x.telefono2, value6: x.sexo, value7: x.edad,
                                           value8: x.fechaNacimiento,value9: x.curp,value10: x.docIdentificacion,value11: x.nacionalidad,
                                           value12: x.correo,value13: x.estadoCivil,value14: x.ocupacion,value15: x.nivelEstudio,
                                           value16: x.religion,value17: x.tipoDiscapacidad});
               }); 

               if(response.data && response.data.length > 0)
               {
                me.tfI = true;
               }
               }).catch(err => {
                   if (err.response.status==400){
                       me.$notify("No es un usuario válido", 'error')
                   } else if (err.response.status==401){
                       me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                       me.e401 = true,
                       me.showpage= false
                   } else if (err.response.status==403){
                       me.$notify("No esta autorizado para ver esta página", 'error')
                       me.e403= true
                       me.showpage= false
                   } else if (err.response.status==404){
                       me.$notify("El recuso no ha sido encontrado", 'error')
                   }else{
                       me.$notify('Error al intentar listar los registros','error')
                   }
               });

       },
       validarJR(){
           let me=this;
           let header={"Authorization" : "Bearer " + this.$store.state.token};
           let configuracion= {headers : header};
           this.$cat.get('api/DireccionDelitoes/ListarPoridHecho/'+me.rHechoId, configuracion)
           .then((response)=>{
               this.$cat.get('api/AmpDecs/ListarEntrevistaInicial/'+me.rHechoId, configuracion)
                   .then((resp)=>{

                       me.$justiciarestaurativa.get('api/Expedientes/ExisteExpedientes/'+ me.rHechoId,configuracion)
                       .then((response)=> {


                           if(response.data && response.data.length > 1)
                           {
                               alert("Ya tienes un expediente solicitado, corrobora si no es el mismo para evitar duplicar informacion: ");
                               me.limpiar();
                           }

                           if(me.tfV == false)
                           {
                            me.$notify("Registra al menos una victima", 'error')
                           }
                           if(me.tfI == false)
                           {
                            me.$notify("Registra al menos un imputado", 'error')
                           }
                           if(me.tfV == true && me.tfI == true ){
                            me.agregar();
                           }


                       }).catch(err => {
                           // Manejar los errores si es necesario
                       });
                       
                       
                   })
                   .catch(error => {                       
                       me.$notify("Registrar Entrevista inicial", 'error')
                   });
           })
           .catch(err => 
           {               

                me.$notify("Registre fecha, hora y lugar de los hechos", 'error')
                this.$cat.get('api/AmpDecs/ListarEntrevistaInicial/'+me.rHechoId, configuracion)
                .then(function (resp){
                    
                })
                .catch(error => {                       
                    me.$notify("Registre entrevista inicial", 'error')
                });
                
           });
       },
        abtraerInfoCSinP(expedienteId,idEnvio,espontaneoNoEspontaneo)
        {
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

            //Esta api es muy sencilla, trae la infoprmacion del expediente y el envio pero solo requiero arregloConjunto
            me.$justiciarestaurativa.get('api/Envios/InformacionExpediente/'+ idEnvio + '/' + expedienteId,configuracion).then(function(response)
            {

                //El valor del arreglo que responde en forma de texto aqui lo convierto en arreglo
                me.re_arregloConjunto = JSON.parse(response.data.arregloConjunto);                                
                me.re_conjuntoRepresentantes = JSON.parse(response.data.arregloRepresentantes);
                me.tipoPDF = 2 
                me.nombreFirma = response.data.uqe_Nombre;
                me.puestoFirma = response.data.uqe_Puesto;
                me.agenciaFirma = response.data.uqe_Agencia;

                //En caso de reimpresiones pasada mando mensaje
                if(me.re_arregloConjunto == null || me.re_conjuntoRepresentantes == null)
                {
                    me.reimpresion = -1;

                    me.$alert('Notificación', 'No se puede reimprimir esta derivacion debido a que la carpeta fue derivada antes de la actualizacion en Sistema Centenario que incluye la reimpresion');
                }
                else
                {
                    me.vistaPreviaTF = false;

                    me.docDerivacion == 'Derivación'

                    me.qrCode = ''

                    me.generarQR(me.docDerivacion,me.nuc,me.nombreFirma,response.data.fechaRegistro,response.data.idExpediente);
                    setTimeout(() => 
                    {
                        //Aqui determino el con o sin  person apara crear el PDF
                        if (espontaneoNoEspontaneo=="Con persona")
                        {
                            me.crearPdf_Derivacion1(me.re_arregloConjunto, me.re_conjuntoRepresentantes);
                        }
                        if (espontaneoNoEspontaneo=="Sin persona")
                        {
                            //En caso de ser reimpresion sin persona, llamo a una funcion para abtraer la informacion del envio, mas importente, el arreglo del conjunto
                            me.crearPdf_Derivacion2(me.re_arregloConjunto, me.re_conjuntoRepresentantes);
                        }
                    }, 1000);
                }                                            


            }).catch(err => {
            if (err.response.status==400){
                me.$notify("No es un usuario válido", 'error')
            } else if (err.response.status==401){
                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                me.e401 = true,
                me.showpage= false
            } else if (err.response.status==403){
                me.$notify("No esta autorizado para ver esta página", 'error')
                me.e403= true
                me.showpage= false
            } else if (err.response.status==404){
                me.$notify("El recuso no ha sido encontrado", 'error')
            }else{solicitante
                me.$notify('Error al intentar listar los registros','error')
            }
            });
        },
        
       impresionInforme(item) {
           let me = this;             
           me.informe = true           
                      
           me.informeNoOficio = item.oficioAMPO
           me.informeExpediente = item.noExpediente
           me.informeNuc = item.nuc
           me.informeFacilitador = item.firmaInfoAMPO
           me.informePuestoFacilitador = item.puestoFirmaAMPO
           me.informeRespuestaAMPO = item.informaAMPO

           me.dirigidoAmpo = item.uqe_Nombre
           me.puestoAmpo = item.uqe_Puesto

           me.qrCode = ''

            me.docDerivacion = 'Reimpresión de respuesta AMPO'
           
           me.generarQR(me.docDerivacion, me.nuc, me.nombreFirma, item.fechaRegistro, item.expedienteId);            
       },
       activarAnimacionCarga() 
       {
        this.cargando = true;
       },
       desactivarAnimacionCarga() {
        this.cargando = false;
       },
       crearPdfInforme() {
        let me = this
        var pdfMake = require('pdfmake/build/pdfmake.js');
            var htmlToPdfmake = require("html-to-pdfmake"); 
        
            //***************************************************************************** */
            // VARIABLES
            //***************************************************************************** */
            var logo1 = this.logo1;
            var logo2 = this.logo2; 
            var logo3 = this.logo3;
            var logo4 = this.logo4;
            var diragencia = this.direccionAgencia;
            var telagencia= this.telefonosAgencia;
            var contactoDSP = this.contactoDSP;
            var nombreDSP= this.nombreDSP;
            
            //***************************************************************************** */    
            var dia = moment().format("DD"); 
            var mes = moment().format('MMMM'); 
            var año= moment().format("YYYY");  
            var hr= moment().format('h:mm a'); 

            var pdf_distrito=this.u_distrito;
            var pdf_dirsubproc = this.u_dirSubPro;
            var pdf_agencia =this.u_agencia;
            var pdf_usuario=this.u_nombre;
            var pdf_puesto=this.u_puesto;
            var pdf_modulo=this.u_modulo;  
            var fecha = dia + " de " + mes + " del " + año  
            

 
            //***************************************************************************** */
            var html_texto  = htmlToPdfmake( 
                this.informeRespuestaAMPO
            );
            //***************************************************************************** */ 
            
             //***************************************************************************** */ 
            var dd = {
                pageSize: 'LEGAL',
                pageOrientation: 'portrait',
                pageMargins: [ 85, 130, 72, 60 ], 
                footer: function (currentPage, pageCount) {
                    return {
                        columns: [
                            { 
                                image: logo4,
                                width: 612, 
                                absolutePosition: {x: 0, y: 0},
                                
                            },
                            {
                                text: diragencia + "\n" + telagencia  + ' ' +  'www.hidalgo.gob.mx',
                                style: 'footertext', 
                                margin: [312,12,72,0],
                                alignment:'right',
                                absolutePosition: {x: 0, y: 30},
            
                            },
                           
                        ] 
                    };
                },
                header: function(currentPage, pageCount, pageSize) {                        
                        return [
                           { 
                                image: logo3,
                                width: 612, 
                                absolutePosition: {x: 0, y: 0},                                
                            },
                        ]                
                },            
                content: [
                     {
                        text: pdf_dirsubproc+"\n"+pdf_agencia,
                        style: 'headertext',
                        absolutePosition: {x: 85, y: 95},
                    }, 
                    {
                        text:  'Número de oficio: ' + this.informeNoOficio, 
                        style: 'nuc'
                    },
                    '\n',
                    {
                        text:  'Número de expediente: ' + this.informeExpediente, 
                        style: 'nuc'
                    },
                    '\n',
                      {
                        text:  'NUC: ' + this.informeNuc, 
                        style: 'nuc'
                    },
                    '\n',
                    {
                        text:  'Asunto: El que se informa', 
                        style: 'nuc'
                    },
                    '\n',
                    {
                        text:   pdf_distrito + ' , Hidalgo a '+ fecha,
                        style: 'fecha'
                    }, 
                    
                    '\n\n\n',
                    {
                        
                        text: me.dirigidoAmpo + '\n' + me.puestoAmpo+ '\n' + 'Presente.', 
                        style: 'DePara'
                    }, 
                    '\n\n',
                    {
                        text:  'Con fundamento en lo dispuesto por el artículo 17 párrafo III y V de la constitución Política ' + 
                               'de los Estados Unidos Mexicanos; 187, 188 y 189 Código Nacional de Procedimientos Penales; 1°,2°,3° ' + 
                               'fracción X, 4°,5°,6°,7° fracción VI, 10, 33, 34, 36, y 40, de la Ley Nacional de Mecanismos Alternativos' + 
                               'de Solución de Controverisas en Materia Penal; 11 fracción XI de la Ley Orgánica del Ministerio ' +
                               'Público vigente en el Estado y 1°, 8° inciso b) fracción I, inciso I fracción II, 20 VI inciso b) , ' + 
                               '38 inciso A), 40, 45 fraccion II y 55 del reglamento de la Ley Orgánica del Ministerio Público del '+ 
                               'Estado de Hidalgo; me permito informarle lo siguiente:',
                        style: 'texto',
                    },  
                    '\n\n', 
                    {
                        text: html_texto,
                        style: 'texto'
                    },  
                     '\n\n',
                    {
                        text:  'Lo anterior en seguimiento de la derivación realizada y para los fines legales a que haya lugar.',
                        style: 'texto',
                    },    
                               
                    '\n\n\n',
                    {
                       
                       text:  'Atentamente \n\n\n\n\n' + me.informeFacilitador + '\n' + me.informePuestoFacilitador,
                       style: 'ampo'
                           
                   }
                   ,{
                            image: this.qrCode,
                            width: 200,
                            alignment: 'center',
                            margin: [0, 15, 0, 15]
                        }
                ],
            
                
                styles: { 
                     headertext:{
                        fontSize: 10,
                        bold: true,
                    },
                    fecha:{
                        fontSize: 11, 
                        alignment: 'right',
                    },
                    nuc:{
                        fontSize: 12, 
                        alignment: 'right',
                        bold: true,
                    },
                    titulo: {
                        fontSize: 12,
                        bold: true,
                        alignment: 'center',
                    
                    },
                    titulo: {
                        fontSize: 11,
                        bold: true,
                        alignment: 'center',
                    
                    },
                    DePara:{
                        fontSize: 11,
                        bold:true  
                    },
                    DeParaCargo:{
                        fontSize: 10,
                        bold:true 
                    },
                 	table1: {
                        fontSize: 9,
                        margin: [0, 5, 0, 15],
                        alignment: 'left',
                    },
                    table2: {
                        fontSize: 9,
                        margin: [0, 5, 0, 5], 
                        alignment: 'left',
                    },
                    subtitulo:{
                        fontSize: 11,
                        bold: true, 
                    },
                    
                    footertext:{
                        fontSize: 7,
                        color: 'white'
                    },
                    textoDireccion:{
                        fontSize: 12,  
                        alignment: 'left',
                    },
                    texto:{
                        fontSize: 10,  
                        alignment: 'justify',
                    },
                    textobold:{
                        fontSize: 10,  
                        bold: true,
                        alignment: 'justify',
                    },
                    compareciente:{
                        fontSize: 12, 
                        bold: true,
                        alignment: 'right',
                    },
                    ampo:{
                        fontSize: 12, 
                        bold: true,
                        alignment: 'left',
                    },
                    cargo:{
                        fontSize: 11, 
                        regular: true,
                        alignment: 'left',
                    },
                
                }
    
            }
                
                return dd;      
        }
   }

  }
</script>
<style>
.espaciadox{
   padding: 30px !important; 
}

</style>