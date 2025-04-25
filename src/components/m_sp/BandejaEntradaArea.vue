<template>
<v-layout align-start>
    <v-navigation-drawer v-model="drawer" app   v-if="logueado" class="primary"  >
        <div class="text-xl-center text-md-center text-xs-center my-4">
            <a href="/"><img src="@/assets/Logo.png" height="110px" alt=""></a> 
        </div>
  
        <v-list dense dark class="pt-0 primary" >
          <template>
            <v-list-tile  :to="{name:'servicios-periciales'}">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">home</v-icon>
              </v-list-tile-action>
              <v-list-tile-title class="white--text">Inicio</v-list-tile-title>
            </v-list-tile>
          </template>          
  
        <template v-if="esAdministrador || esCordinador || esDirector || esOficialiapartes">
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Asignacion de perito
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile  v-if="esAdministrador || esDirector || esOficialiapartes" :to="{ name: 'sp-bandejaentrada'== '#' ? '' :  'sp-bandejaentrada'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">drafts</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Bandeja de entrada oficialia
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esCordinador" :to="{ name: 'sp-bandejaentradaarea'== '#' ? '' :  'sp-bandejaentradaarea'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">drafts</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Bandeja de entrada area
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esCordinador" :to="{ name: 'sp-radioarea'== '#' ? '' :  'sp-radioarea'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">drafts</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Bandeja de Radio
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile  v-if="esAdministrador || esCordinador || esDirector" :to="{ name: 'sp-reasignar'== '#' ? '' :  'sp-reasignar'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">cached</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                   Reasignar Perito
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>     
            </v-list-group>
      </template>
  
  
  
       <template v-if="esAdministrador || esPerito || esOficialiapartes || esCordinador">
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Perito
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esPerito" :to="{ name: 'sp-bdeperito'== '#' ? '' :  'sp-bdeperito'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">how_to_reg</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Bandeja de entrada perito
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile  v-if="esAdministrador || esPerito || esCordinador" :to="{ name: 'sp-recepcionindicio'== '#' ? '' :  'sp-recepcionindicio'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">transit_enterexit</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Recepcíon de Indicio
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile  :to="{ name: 'sp-entregainforme'== '#' ? '' :  'sp-entregainforme'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">toc</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Entrega de Informe
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>   
          
            </v-list-group>
        </template>
  
        <template v-if="esAdministrador || esCordinador || esDirector" >
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Estadísticas
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{ name: 'sp-estadisticasmes'== '#' ? '' :  'sp-estadisticasmes'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">equalizer</v-icon>
                </v-list-tile-action>
                <v-list-tile-content  >
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por mes
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>    
              <v-list-tile :to="{ name: 'sp-estadisticas'== '#' ? '' :  'sp-estadisticas'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">equalizer</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por año
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{ name: 'sp-estadisticasan'== '#' ? '' :  'sp-estadisticasan'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">equalizer</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por años
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>                
            </v-list-group>
        </template>
  
  
        <template v-if="esAdministrador || esCordinador || esDirector || esOficialiapartes" >
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Asignacion de perito foraneas
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile  v-if="esAdministrador || esDirector || esOficialiapartes" :to="{ name: 'sp-bandejaentradaf'== '#' ? '' :  'sp-bandejaentradaf'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">drafts</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Bandeja de entrada oficialia
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esCordinador" :to="{ name: 'sp-bandejaentradaareaf'== '#' ? '' :  'sp-bandejaentradaareaf'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">drafts</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Bandeja de entrada area
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esCordinador" :to="{ name: 'sp-radioareaf'== '#' ? '' :  'sp-radioareaf'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">drafts</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Bandeja de Radio
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile  v-if="esAdministrador || esCordinador || esDirector" :to="{ name: 'sp-reasignarf'== '#' ? '' :  'sp-reasignarf'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">cached</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                   Reasignar Perito
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>     
            </v-list-group>
      </template>
  
  
  
       <template v-if="esAdministrador || esPerito || esOficialiapartes || esCordinador">
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Perito foraneas
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esPerito" :to="{ name: 'sp-bdeperitof'== '#' ? '' :  'sp-bdeperitof'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">how_to_reg</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Bandeja de entrada perito
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile  :to="{ name: 'sp-entregainformef'== '#' ? '' :  'sp-entregainformef'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">toc</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Entrega de Informe
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>   
          
            </v-list-group>
        </template>
  
        <template v-if="esAdministrador || esCordinador || esDirector" >
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Estadísticas foraneas
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{ name: 'sp-estadisticasmesf'== '#' ? '' :  'sp-estadisticasmesf'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">equalizer</v-icon>
                </v-list-tile-action>
                <v-list-tile-content  >
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por mes
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>    
              <v-list-tile :to="{ name: 'sp-estadisticasf'== '#' ? '' :  'sp-estadisticasf'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">equalizer</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por año
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile :to="{ name: 'sp-estadisticasanf'== '#' ? '' :  'sp-estadisticasanf'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">equalizer</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Estadísticas por años
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>                
            </v-list-group>
        </template>
        
  
      <template v-if="esAdministrador || esCordinador || esDirector || esOficialiapartes" >
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Asignación de Servicio Médico
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile  v-if="esAdministrador || esCordinador || esDirector || esOficialiapartes" :to="{ name: 'sp-assolconregistro'== '#' ? '' :  'sp-assolconregistro'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">input</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Solicitudes con registro 
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esCordinador || esDirector || esOficialiapartes" :to="{ name: 'sp-assolsinRegistro'== '#' ? '' :  'sp-assolsinRegistro'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">input</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Solicitudes sin registro
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>   
            </v-list-group>
      </template>
  
      <template v-if="(esAdministrador || esPerito)&& modulointernof" >
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Bandeja de Entrada Servicios Médicos
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile  v-if="esAdministrador || esPerito" :to="{ name: 'sp-bansolconregistro'== '#' ? '' :  'sp-bansolconregistro'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">drafts</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Solicitudes con registro 
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esPerito" :to="{ name: 'sp-bansolsinregistro'== '#' ? '' :  'sp-bansolsinregistro'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">drafts</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Solicitudes sin registro
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>   
            </v-list-group>
      </template>
  
      <v-list-tile
            v-if="
              esDirector
            "
            :to="{ name: 'sp-rotacionpersonal' == '#' ? '' : 'sp-rotacionpersonal' }"
            active-class="secondary"
          >
            <v-list-tile-action>
              <v-icon class="centenarioMenuIcon">groups</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="centenarioMenuModules">
                Rotación de Personal
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>   
  
      </v-list>
  
        
  
  
      </v-navigation-drawer>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
        <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Bandeja de Entrada Area</v-toolbar-title>

                    <v-divider class="mx-2" inset vertical></v-divider>

                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table
                :headers="headers"
                :items="diligencias"
                :search="search"
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                >

                <template slot="items" class="white" slot-scope="props">
                    
                    
                    <td>{{ props.item.emitidoPor}}</td>
                    <td>{{ props.item.modulo}}</td>
                    <td>{{ props.item.fechaSolicitud}}</td>
                    <td>{{ props.item.agencia }}</td>
                    <td :style="{ color: props.item.prioridad === 'Urgente' ? 'red' : 'black' }">{{ props.item.prioridad }}</td>
                    <td>{{ props.item.servicio }}</td>
                    <td>{{ props.item.nuc }}</td>
                    <td>{{ props.item.statusRespuesta }}</td>

                    <td class="justify-center layout px-0">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                    <v-icon class="mr-2" v-on="on" color="warning" @click="imprimirdiligencia(props.item)">
                                        print
                                    </v-icon>
                            </template>
                            <span>Imprimir diligencia</span>
                        </v-tooltip>
                        <div class="justify-center layout px-0" v-if="props.item.statusRespuesta == 'Solicitado'">
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        class="mr-2" v-on="on"
                                        @click="listarModulos(props.item)"
                                        >
                                    done
                                    </v-icon>
                                </template>
                                <span>Aceptar</span>
                            </v-tooltip>

                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        class="mr-2" v-on="on"
                                        @click="rechazarsoli(props.item)"
                                        >
                                    clear
                                    </v-icon>
                                </template>
                                <span>Rechazar</span>
                            </v-tooltip>
                        </div>
                        <div  class="justify-center layout px-0" v-if="props.item.statusRespuesta == 'Finalizado' || props.item.statusRespuesta == 'Entregado'">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon class="mr-2" v-on="on" @click=" viewConclusion(props.item)">
                                    line_weight
                                </v-icon>
                            </template>
                            <span>Consultar Conclusión</span>
                        </v-tooltip>
                        </div>
                    </td>

                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar()"  >Resetear</v-btn>
                </template>

        </v-data-table>

        <v-dialog v-model="ModalConclusion" max-width="1000px">
                <v-card>
                    <v-toolbar card dark color="grey lighten-4 primary--text">
                        <v-avatar size="30">
                            <v-icon class="grey lighten-2">line_weight</v-icon>
                        </v-avatar>
                        <v-toolbar-title class="subheading">Conclusión</v-toolbar-title>
                        <v-spacer />
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" >
                            <v-container grid-list-md text-xs-center>
                                <v-layout row wrap>
                                    <v-flex xs12 sm12 md12 lg12>
                                        <v-card elevation="0">
                                            <v-card-text>
                                                <table>
                                                    <tr>
                                                        <td>Conclusión:</td>
                                                        <td><b v-html="conclusionitem"> {{conclusionitem}}</b></td>
                                                    </tr>
                                                    <br>
                                                </table>
                                            </v-card-text>
                                        </v-card>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn @click="ModalConclusion = false">Cerrar</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>


                    <v-dialog  v-model="dialog"  max-width="1000px" >



                        <v-card>
                                <v-toolbar card dark color="grey lighten-4 primary--text">
                                    <v-avatar  size="30">
                                        <v-icon class="grey lighten-2">{{formIcon}}</v-icon>
                                    </v-avatar>

                            <v-toolbar-title class="subheading">{{formTitle}}</v-toolbar-title>
                            <v-spacer></v-spacer>


                            </v-toolbar>
                            <v-card-text>
                            <v-form ref="form" >
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                        <v-flex xs12 sm12 md12>

                                            <v-autocomplete name="modulo"
                                                :items="modulos"
                                                v-model="modulo"
                                                v-if="editedIndex == -1"
                                                return-object
                                                v-validate="'required'"
                                                label="*Modulo:"
                                                :error-messages="errors.collect('modulo')">
                                            </v-autocomplete>

                                            <v-text-field
                                                    name="número de control"
                                                    label="*Número de control:"
                                                    v-model='nocontrol'
                                                    v-if="editedIndex == -1"
                                                    v-validate="'required'"
                                                    :error-messages="errors.collect('control')"
                                            ></v-text-field>

                                            <vue-editor
                                            name="razón rechazado"
                                            v-model="razonrechazado"
                                            v-if="editedIndex == 1"
                                            :editorToolbar="customToolbar"
                                            v-validate="'required'"
                                            :error-messages="errors.collect('razón rechazado')">
                                            </vue-editor>


                                        </v-flex>
                                        </v-layout>
                                    </v-container>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn class='success' @click="asignarperito()" >Guardar</v-btn>
                                        <v-btn  @click.native="close" >Cerrar</v-btn>

                                    </v-card-actions>
                                </v-form>

                            </v-card-text>
                        </v-card>

                    </v-dialog>

    </v-flex>
</v-layout>
</template>


<script>
import axios from 'axios'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import VeeValidate from 'vee-validate'
import { VueEditor } from "vue2-editor";
import { error } from 'util';
import moment from 'moment'
import 'moment/locale/es';
import alertify from 'alertifyjs';
import n401 from './401.vue'
import n403 from './403.vue'

export default {
    components: {
        "vue2-editor": VueEditor,
        n401,
        n403
    },
    data: () => ({
        //-------Logos-----------------------------------------/
        logo1: '',
        logo2: '',
        logo3: '',
        logo4: '',
        //************************* */
        alert:false,
        dialog: false,
        rahid:'',
        rAtencionId:'',
        rHechoId:'',
        nuc:'',
        e401:false,
        e403:false,
        showpage:true,
        ModalConclusion: false,
        //*************** */
        diligencias:[],
        peritos:[],
        conclusion2: '',
        perito:'',
        personaid:'',
        rDiligenciasId:'',
        fechacreacion:'',
        respuesta:'',
        numeroInterno:'',
        fechaRecibido:'',
        fechaAceptado:'',
        fechaFinalizado:'',
        fechaEntregado:'',
        razonrechazado:'',
        modulos:[],
        modulo:'',
        nocontrol:'',
        numerooficio: '',
        conclusionitem: '',
        //*************** */
        customToolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            ['align',{ 'align': 'center'}, { 'align': 'right' }, { 'align': 'justify' }  ],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }  ],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'color': [] }, { 'background': [] }],
        ],
        headers: [

            { text: 'Emitida por', value: 'emitidoPor', sortable: false  },
            { text: 'Modulo', value: 'modulo', sortable: false  },
            { text: 'Fecha de Solicitud', value: 'fechaSolicitud', sortable: false },
            { text: 'Agencia',value: 'agencia', sortable: false },
            { text: 'Prioridad', value: 'prioridad', sortable: false},
            { text: 'Servicio', value: 'servicio', sortable: false },
            { text: 'NUC', value: 'nuc', sortable: false },
            { text: 'Status', value: 'statusRespuesta', sortable: false },
            { text: 'Opciones', value: 'opciones', sortable: false },

        ],
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
        editedIndex: 0,
        modalAdd:false,
        dialogo:false,
        dialog:false,
        //********************************/


        rac:'',
        //-----CLAIM------------------------------------------
        u_iddistrito:'',
        u_distrito:'',
        u_dirSubPro:'',
        u_subProc:'',
        u_idagencia:'',
        u_rdiligencia:'',
        u_agencia:'',
        u_idmoduloservicio:'',
        u_modulo:'',
        u_idusuario:'',
        u_nombre:'',
        u_clave:'',
        u_rol:'',
        u_puesto:'',
        u_email:'',
        u_iddsp:'',
        nuc:'',
        //----------------------------------------------------
    }),

    created () {

        let me = this
                me.u_iddistrito=me.$store.state.usuario.iddistrito;
                me.u_distrito=me.$store.state.usuario.distrito;
                me.u_dirSubPro=me.$store.state.usuario.dirSubProc;
                me.u_subProc=me.$store.state.usuario.subProc;
                me.u_idagencia=me.$store.state.usuario.idagencia;
                me.u_agencia=me.$store.state.usuario.agencia;
                me.u_idmoduloservicio=me.$store.state.usuario.idmoduloservicio;
                me.u_modulo=me.$store.state.usuario.modulo;
                me.u_idusuario=me.$store.state.usuario.idusuario;
                me.u_nombre=me.$store.state.usuario.usuario;
                me.u_clave=me.$store.state.usuario.clave;
                me.u_rol=me.$store.state.usuario.rol;
                me.u_puesto=me.$store.state.usuario.puesto;
                me.u_email=me.$store.state.usuario.email;
                me.u_iddsp = me.$store.state.usuario.iddsp;
                me.nuc=me.$store.state.usuario.nuc;

    me.listar();
    me.listarLogo();

        axios.interceptors.request.use( (config)=> {
          // Do something before request is sent
        this.$store.commit('LOADER',true);
        return config;
        }, (error)=> {
          // Do something with request error
        this.$store.commit('LOADER',false);
        return Promise.reject( error);
        });

          // Add a response interceptor
        axios.interceptors.response.use((response)=>{
        this.$store.commit('LOADER',false);
          // Do something with response data
        return response;
        },  (error)=> {
     // Do something with request error
        this.$store.commit('LOADER',false);
        return Promise.reject(error);
        });


    },
    computed: {
    formTitle () {
                return this.editedIndex === -1 ? 'Agregar Perito' : 'Razón Rechazado'
            },
    formIcon () {
                return this.editedIndex === -1 ? 'add' : 'close'
            },
            logueado(){
        return this.$store.state.usuario;
      },
      esAdministrador(){ 
        return this.$store.state.usuario && this.$store.state.usuario.rol =='Administrador';
      },
      esCordinador(){ 
        return this.$store.state.usuario && this.$store.state.usuario.rol =='Coordinador';
      },
      esPerito(){
        return this.$store.state.usuario && this.$store.state.usuario.rol =='Perito';
      },
      esDirector(){
        return this.$store.state.usuario && this.$store.state.usuario.rol =='Director';
      },
      esOficialiapartes(){
        return this.$store.state.usuario && this.$store.state.usuario.rol =='Oficialia de partes';
      },
      usuario(){
        return this.$store.state.usuario.usuario;
      },
      email(){
        return this.$store.state.usuario.email;
      },    
      modulointernof(){
        //console.log("entre2")
        //console.log(this.modulointerno)
        return this.modulointerno
      },
      drawer(){
            return this.$store.state.drawer
        }
    },
    watch: {

    },
    methods:{

        agregar(){
            this.limpiar();
            this.editedIndex = -1;
            this.dialogo= true;
        },
        close () {
                this.dialog = false;
                this.dialogo = false;
                this.limpiar();
        },
        limpiar(){
            this.perito='';
            this.modulo = '';
            this.razonrechazado='';
            this.nocontrol ='';
            this.conclusion2 = '';
            this.conclusionitem = '';


        },
        listarLogo () {
        let me = this;
        this.$conf.get('api/ConfGlobals/Listar').then(function(response) {
            me.logo1 = response.data.logo1;
            me.logo2 = response.data.logo2;
            me.logo3 = response.data.logo3;
            me.logo4 = response.data.logo4;
            }).catch(err => {
                if (err.response.status == 400) {
                    me.$notify("No es un usuario válido", 'error')
                } else if (err.response.status == 401) {
                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                    me.e401 = true,
                    me.showpage = false
                } else if (err.response.status == 403) {
                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                    me.e403= true
                    me.showpage= false
                } else if (err.response.status == 404) {
                    me.$notify("El recuso no ha sido encontrado", 'error')
                } else {
                    me.$notify('Error al intentar listar los registros!!!','error')
                }
            });
        },
        viewConclusion(item){
        
            let me = this;
            me.ModalConclusion = true;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.u_rdiligencia = item.idRDiligencias;
           
          
          me.$SP.get('api/PeritoAsignado/Listarporrdiligencias/'+me.u_rdiligencia ,configuracion).then(function(response){
                    
                    me.conclusion2= response.data;

                    //ALEIS CON ESTA PARTE DE CODIGO YA GUARDA Y MUESTRA el valor de conclusion que es: prueba conclusion
                    me.conclusion2.map(function(x){
                    me.conclusionitem = x.conclusion;
                    
                       // console.log("VALOR DE CONCLUSION",me.conclusionitem);                 
                    });


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
                me.limpiar();

                
        },
        listar()
        {
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
                me.$CAT.get('api/RDiligencias/Listarporagencia/' + me.u_idagencia + '/' + me.u_iddsp + '/' + me.u_iddistrito,configuracion).then(function(response) {
                me.diligencias=response.data

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
        },
        imprimirdiligencia (item) {
            this.numerooficio = item.numeroOficio
            this.origenDirSub = item.uDirSubPro;
            this.fecha=item.fechaSolicitud;
            this.responsable = item.dirigidoa;
            this.nombreDirSub = item.dirSubPro;
            this.textolibre= item.especificaciones;
            this.nombre = item.emitidoPor;
            this.puesto = item.uPuesto;
            this.nuc = item.nuc;
            this.textofinal = item.textofinal;
            this.editedIndex = 1;
            this.ModalServicioPericial = 1;
            this.mostrarpdf(item.emitidoPor, item.uPuesto, item.agencia);
            this.modaldocumento = false;
        },
            mostrarpdf (nombre, puesto, agencia) {
                let me = this;
                var dd = me.downloadPdf();
                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");
                if (pdfMake.vfs == undefined) {
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs;
                }
                var dd = me.downloadPdf(nombre,puesto,agencia);
                var doc = pdfMake.createPdf(dd);
                var doc = pdfMake.createPdf(dd).print();
            },
            downloadPdf (nombre,puesto,agencia) {
                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");
                if (pdfMake.vfs == undefined) {
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs;
                }
                //***************************************************************************** */
                // VARIABLES
                //***************************************************************************** */
                var logo1 = this.logo1;
                var logo2 = this.logo2;
                var logo3 = this.logo3;
                var logo4 = this.logo4;
                var u_dirSubPro = this.dirSubPro;
                var u_agencia = agencia;
                var u_subProc= this.u_subproc;
                var nuc = this.nuc;
                //***************************************************************************** */
                var html = htmlToPdfmake(
                    this.textofinal
                );
                //***************************************************************************** */
                var agenciainfodr = 'direccion';//this.agenciainfo["direccion"];
                var agenciainfotel = 'telefono';//this.agenciainfo["telefono"];
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
                                absolutePosition: { x: 0, y: 0 },
                            },
                                {
                                    //text: agenciainfodr + "\n" + agenciainfotel + "\n" + 'www.hidalgo.gob.mx',
                                    text: 'Carretera México – Pachuca Km. 84.5, Circuito Sector Primario S/N, Centro Cívico,' + "\n" + 'C.P. 42083, Pachuca de Soto, Hgo. www.hidalgo.gob.mx',
                                    style: 'subheaderlogo',
                                    style: 'PiePagina',
                                    margin: [ 312, 12, 72, 0 ],
                                    alignment: 'right',
                                    absolutePosition: { x: 0, y: 30 },
                                },
                            ]
                        };
                    },
                    header: function(currentPage, pageCount, pageSize) {
                        return [
                            {
                                image: logo3,
                                width: 612,
                                absolutePosition: { x: 0, y: 0 },
                            },
                        ]
                    },
                    content: [
                        {
                            text:  this.origenDirSub + "\n" + u_agencia ,
                            style: 'Adscripcion',
                            absolutePosition: { x: 85, y: 95 },
                        },
                        {
                            text: "Número Único de Caso: " + nuc,
                            style: 'Titulo',
                            alignment: 'right',
                            margin: [ 0, 40, 72, 0 ],
                            absolutePosition: { x: 85, y: 150 },
                        },
                        {
                            text: this.u_distrito + ", Hidalgo a " + this.fecha,
                            style: 'Fecha',
                            alignment: 'right',
                        },
                        {
                            text:'\nNúmero de oficio: ' + this.numerooficio + "\n\n\n\n\n\n\n\n",
                            style: 'Nooficio',
                            alignment: 'right',
                        },
                        {
                            text: this.nombreDirSub + "\n" + "\n" + "\n" + "\n",
                            style: 'DePara',
                            alignment :'justify',
                            margin: [ 0, 50, 200, 0 ]
                        },
                        {
                            text: html,
                            style: 'Texto',
                        },
                        {
                            text: '\n\n\n\n\n'+ "A T E N T A M E N T E"+'\n\n\n\n\n',
                            alignment :'justify',
                            style: 'DePara',
                        },
                        {
                            text: nombre +"\n\n",
                            alignment :'justify',
                            style: 'DePara',
                        },
                        {
                            text: puesto +"\n\n",
                            alignment :'justify',
                            style: 'DePara',
                        },
                        {
                            text: agencia +"\n\n",
                            alignment :'justify',
                            style: 'DePara',
                        },
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
                            color: COLOR_TEXTO_PIE_PAGINA,
                        },
                        Texto:{
                            fontSize: 10,
                            alignment:'justify'
                        },
                        Titulo:{
                            fontSize: 12,
                            bold:true ,
                            alignment:'center'
                        },
                        SubTitulo:{
                            fontSize: 11,
                            semibold:true
                        },
                    }
                }
                var doc = pdfMake.createPdf(dd);
                var f = document.getElementById('iframepdf');
                var callback = function(url) { f.setAttribute('src',url); }
                doc.getDataUrl(callback, doc);
                this.modaldocumento=true;
                return dd;
            },
        listarModulos(item){
            var arraymodulos = [];
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.fechacreacion = item.fechaSolicitud;
            me.rDiligenciasId = item.idRDiligencias;
            me.$conf.get('api/ModuloServicios/Listarmodulosporagencia/'+ item.idagencia,configuracion).then(function(response){
                arraymodulos = response.data;
                arraymodulos.map(function(x){
                        me.modulos.push({text: x.nombre, value: x.idModuloServicio});
                    });

            me.editedIndex = -1;
            me.dialog = true;

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
        },
        generarfecha(){
            let me=this;
            me.fechaactual =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY")+ ", "+ moment().format('h:mm:ss a');
        },
        rechazarsoli(item){
            let me = this;
            me.limpiar();
            me.rDiligenciasId = item.idRDiligencias;
            me.editedIndex = 1;
            me.dialog = true;

        },
        asignarperito(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var nummax=0;
            me.generarfecha();
            me.$validator.validate().then(result => {
            if (result) {
                if(this.editedIndex == -1){

                  me.$SP.get('api/PeritoAsignado/Listar',configuracion).then(function(response){
                        //console.log(response);
                        me.bdoperito=response.data;

                        for(var i=0;i<me.bdoperito.length;i++){
                            if(me.bdoperito[i].numeroInterno>nummax)
                            nummax = me.bdoperito[i].numeroInterno
                        }
                        nummax++;

                        me.$SP.post('api/PeritoAsignado/Crear',{
                        'moduloServicioId' : me.modulo.value,
                        'rDiligenciasId': me.rDiligenciasId,
                        'respuesta': "na",
                        'numeroInterno': nummax,
                        'conclusion': "na",
                        'fechaRecibido': me.fechacreacion,
                        'fechaAceptado':me.fechaactual,
                        'fechaFinalizado':"na",
                        'fechaEntregado':"na",
                        'uagencia' : me.u_agencia,
                        'udistrito': me.u_distrito,
                        'umodulo': me.u_modulo,
                        'upuesto': me.u_puesto,
                        'usubproc': me.u_dirSubPro,
                        'uusuario': me.u_nombre,
                        'NumeroControl' : me.nocontrol,
                        'fechasysfinalizado':   '0001-01-01 00:00:00.0000'

                    },configuracion).then(function(response){
                        me.$notify('La información se guardo correctamente !!!','success')
                        me.$CAT.put('api/RDiligencias/Actualizarstatus',{
                            'idRDiligencias': me.rDiligenciasId,
                            'statusRespuesta': "Asignado"
                        },configuracion).then(function(response){
                            me.$notify('La información se actualizo correctamente !!!','success')
                            me.dialog=false;
                            me.listar();
                            me.limpiar();
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
                                me.$notify('Error al intentar actualizar el registro!!!','error')
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
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
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
                            me.$notify("No esta autorizado para ver esta pagina", 'error')
                            me.e403= true
                            me.showpage= false
                        } else if (err.response.status==404){
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });

                }else{

                    var textorechazado = me.razonrechazado + "Rechazado por: "+me.u_nombre+" a las "+me.fechaactual;
                    me.$CAT.put('api/RDiligencias/Actualizarstatus2',{
                        'idRDiligencias': me.rDiligenciasId,
                        'statusRespuesta': "Rechazado",
                        'respuestas':textorechazado

                    },configuracion).then(function(response){
                        me.$notify('La información se actualizo correctamente !!!','success')
                        me.dialog=false;
                        me.listar();
                        me.limpiar();
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
                            me.$notify('Error al intentar actualizar el registro!!!','error')
                        }
                    });

                }


            }

        })

        },


    }
}
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
        text-align: right;
        margin-top: 100px;
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
    .texto{
        font-size: 20px;
    }
    .tituloright {
        font-size: 22px;
        text-align: right;
    }
    .textoright{
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
        width:100%;
        margin-top: 10px;
        margin-left: 10px;
        border-collapse:collapse;
        border-spacing:30px;
    }
    .espaciado{
        padding: 30px !important;
    }
</style>
