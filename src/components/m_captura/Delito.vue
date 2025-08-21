<template>
    <v-layout align-start>

        <v-navigation-drawer v-model="drawer" app v-if="logueado" class="primary"  >
        <div class="text-xl-center text-md-center text-xs-center my-4">
            <a href="/"><img src="@/assets/Logo.png" height="110px" alt=""></a>
        </div>
  
        <v-list dense dark class="pt-0 primary" >
          <template>
            <v-list-tile  :to="{name:'mcaptura'}">
              <v-list-tile-action>
                <v-icon class="centenarioMenuIcon">home</v-icon>
              </v-list-tile-action>
              <v-list-tile-title class="white--text">Inicio</v-list-tile-title>
            </v-list-tile>
          </template>  
            
          
  
          <template v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador">
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                    Carpetas
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-registro'== '#' ? '' :  'mcaptura-registro'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">group</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Registro
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador" :to="{ name: 'mcaptura-listacarpetas'== '#' ? '' :  'mcaptura-listacarpetas'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">view_list</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Lista de carpetas asignadas
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
            </v-list-group>
          </template>
  
          <template v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador">
            <v-list-group>
              <v-list-tile slot="activator">   
                <v-list-tile-content >
                  <v-list-tile-title class="centenarioMenuAreas">
                   Seguimiento a carpeta
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto || esFacilitador" :to="{ name: 'mcaptura-informaciongeneral'== '#' ? '' :  'mcaptura-informaciongeneral'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">perm_contact_calendar</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Información general.
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-victimaimputado'== '#' ? '' :  'mcaptura-victimaimputado'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">face</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Víctima(s) directa, indirecta, testigo y/o imputado.
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-delito'== '#' ? '' :  'mcaptura-delito'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">dashboard</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Delito
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-vehiculo'== '#' ? '' :  'mcaptura-vehiculo'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">commute</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Vehiculo
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esFacilitador" :to="{ name: 'mcaptura-justiciarestaurativa'== '#' ? '' :  'mcaptura-justiciarestaurativa'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">event_seat</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Justicia restaurativa
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-medidasproteccion'== '#' ? '' :  'mcaptura-medidasproteccion'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">description</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Medidas de protección
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-medidascautelares'== '#' ? '' :  'mcaptura-medidascautelares'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">label</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Medidas cautelares
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="esAdministrador || esAMPOAMP || esAmpoMixto" :to="{ name: 'mcaptura-resolucion'== '#' ? '' :  'mcaptura-resolucion'}"  active-class="secondary">  
                <v-list-tile-action>
                   <v-icon class="centenarioMenuIcon">verified_user</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="centenarioMenuModules">
                    Resolución
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </template>
        
        </v-list>
      </v-navigation-drawer>

        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-regular">Delito(s).</v-toolbar-title>
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
                <v-btn class="mx-2" @click="cerrarcarpeta" fab dark small color="primary">
                    <v-icon dark>close</v-icon>
                </v-btn>
                <v-btn class="mx-2" @click="agregar()" fab dark small color="success">
                    <v-icon dark>add</v-icon>
                </v-btn>
            </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="delitoshecho"
                :search="search"
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
            >
                <template slot="items" class="white" slot-scope="props">
                    <td>{{ props.item.nombreDelito }}</td>
                    <td>{{ props.item.delitoEspecifico }}</td>
                    <td>{{ props.item.tipoFuero }}</td>
                    <td>{{ props.item.tipoDeclaracion }}</td>
                    <td>
                        <div v-if="props.item.equiparado">
                            <span class="blue--text">Activo</span>
                        </div>
                        <div v-else>
                            <span class="red--text">Inactivo</span>
                        </div>
                    </td>
                    <td class="justify-center layout px-0">
                        <v-tooltip bottom>               
                            <template v-slot:activator="{ on }">
                                <v-icon class="mr-2" v-on="on" @click="editr(props.item)">edit</v-icon>
                            </template>
                            <span>Editar registro</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon class="mr-2" v-on="on" color="warning" @click="detalles(props.item)">remove_red_eye</v-icon>
                            </template>
                            <span>Detalles del delito</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon class="mr-2" v-on="on" @click="actualizarstatus(props.item)">cached</v-icon>
                            </template>
                            <span>Cambiar status del delito</span>
                        </v-tooltip>
                    </td>
                </template>
                <template slot="no-data">
                    <v-btn color="primary">Resetear</v-btn>
                </template>
            </v-data-table>
            <v-dialog v-model="modalAdd" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Registro de delito.</v-toolbar-title>
                        <v-spacer />
                        <v-toolbar-items>
                            <v-btn v-if="control" color="success" text @click.native="guardar()">GUARDAR INFORMACIÓN</v-btn>
                            <v-btn v-if="!control" color="success" text @click.native="actualizar()">ACTUALIZAR INFORMACIÓN</v-btn>
                        </v-toolbar-items>
                        <v-btn icon @click="modalAdd = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-divider />
                    <v-card elevation=0 class="mb-5" height="auto">
                        <v-container grid-list-sm :rules="[() =>  !errors.has('descripción de lo robado') && !errors.has('monto de lo robado')]">
                            <v-layout wrap justify-space-between>
                                <v-flex class="espaciado" xs6 md6 lg6 sm6>
                                    <v-autocomplete
                                        name="delito"
                                        :items="delitos"
                                        v-model="delitoId"
                                        label="*Delito:"
                                        v-validate="'required'" 
                                        return-object
                                        v-on:change="listarPorDelito" 
                                        :error-messages="errors.collect('delito')"
                                    />
                                    <v-select
                                        name="tipo de fuero"
                                        :items="tipoFueros"
                                        v-model="tipoFuero"
                                        label="*Tipo de fuero:"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('tipo de fuero')"
                                    />
                                    <v-select
                                        name="grado de ejecucion"
                                        :items="resultadoDelitos"
                                        v-model="resultadoDelito"
                                        label="*Grado de ejecución:"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('grado de ejecucion')"
                                    />
                                    <v-select
                                        name="clasificación del delito por la ejecución"
                                        :items="clasificaOrdenResults"
                                        v-model="clasificaOrdenResult"
                                        v-validate="'required'"
                                        label="*Clasificación del delito por la ejecución:" 
                                        :error-messages="errors.collect('clasificación del por la ejecución')"
                                    />
                                    <v-select
                                    name="modalidades del delito"
                                    :items="tipos"
                                    v-model="tipo"
                                    label="*Modalidades del delito:"
                                    v-validate="'required'"
                                    :error-messages="errors.collect('modalidades del delito')"
                                    />
                                    <v-select
                                        name="violencia"
                                        :items="violenciaSinViolencias"
                                        v-model="violenciaSinViolencia"
                                        label="*Violencia:"
                                        return-object
                                        v-validate="'required'"
                                        :error-messages="errors.collect('violencia')"
                                    />
                                    <v-switch
                                        v-model="armaFuego"
                                        label="¿Arma de fuego?:"
                                        color="success"
                                        hide-details
                                        v-if="violenciaSinViolencia.value == 'Violencia física'"
                                    />
                                    <v-switch
                                        v-model="armaBlanca"
                                        label="¿Arma blanca?:"
                                        color="success"
                                        hide-details
                                        v-if="violenciaSinViolencia.value == 'Violencia física'"
                                    />
                                </v-flex>
                                <v-flex class="espaciado" xs6 md6 lg6 sm6>
                                    <v-autocomplete
                                        name="especificación del delito"
                                        :items="delitoespecificos"
                                        v-model="delitoespecifico"
                                        label="Especificación del delito:"
                                        :error-messages="errors.collect('delito')"
                                    />
                                    <v-select
                                        name="requisito de procedibilidad"
                                        :items="tipoDeclaraciones"
                                        v-model="tipoDeclaracion"
                                        label="*Requisito de procedibilidad:"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('requisito de procedibilidad')"
                                    />
                                    <v-select
                                        name="forma de comisión"
                                        :items="intensionDelitos"
                                        v-model="intensionDelito"
                                        label="*Forma de comisión:"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('forma de comisión')"
                                    />
                                    <v-select
                                        name="concurso"
                                        :items="concursos"
                                        v-model="concurso"
                                        label="*Concurso:"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('concurso')"
                                    />
                                    <v-select
                                        name="prisión preventiva oficiosa"
                                        :items="graveNoGraves"
                                        v-model="graveNoGrave"
                                        label="*Prisión preventiva oficiosa:"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('prisión preventiva oficiosa')"
                                    />
                                    <v-text-field
                                        name="Tipo de lo robado"
                                        label="*Tipo de lo robado:"
                                        v-model="tipoRobado" 
                                        v-validate="'required'"
                                        v-if="tipoMontoRobo==true"  
                                        :error-messages="errors.collect('Tipo de lo robado')"
                                    />
                                    <v-text-field
                                        name="alguna parte del cuerpo"
                                        label="*Con alguna parte del cuerpo:"
                                        v-model="conAlgunaParteCuerpo"
                                        v-validate="'required'"
                                        v-if="violenciaSinViolencia.value =='Violencia física'"
                                        :error-messages="errors.collect('alguna parte del cuerpo')"
                                    /> 
                                    <v-text-field
                                        name="con otro elemento"
                                        label="*Con otro elemento:"
                                        v-model="conOtroElemento"
                                        v-validate="'required'"
                                        v-if="violenciaSinViolencia.value =='Violencia física'"
                                        :error-messages="errors.collect('con otro elemento')"
                                    />                           
                                </v-flex>   
                                <v-flex xs12 sm12 md12 lg12>
                                    <v-card elevation="0">
                                        <v-card-title><h3>Descripción</h3></v-card-title>
                                        <v-divider />
                                        <v-card-text>
                                            <v-form data-vv-scope="form1"> 
                                                <vue-editor  
                                                    name="Descripción"
                                                    v-model="descripcion"      
                                                    outline  height=350px;
                                                    style="max-height: 310px; overflow-y: scroll"
                                                    :editorToolbar="customToolbar"
                                                />
                                            </v-form>
                                        </v-card-text>   
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialog2" max-width="980px">
                <v-card>
                    <v-toolbar card dark color="grey lighten-4 primary--text">
                        <v-avatar  size="40">
                            <v-icon class="grey lighten-2">report_problem</v-icon>
                        </v-avatar> 
                        <v-toolbar-title class="subheading">Información detallada</v-toolbar-title>
                        <v-spacer />
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form">
                            <v-container grid-list-md>
                                <v-layout wrap justify-space-between>
                                    <v-flex xs3 sm3 md3>
                                        <v-text-field
                                            v-model="nombreDelito"
                                            label="Delito:"
                                            disabled
                                        />
                                        <v-text-field
                                            v-model="tipoFuero"
                                            label="Tipo de fuero:"
                                            disabled
                                        />
                                        <v-text-field
                                            v-model="armafuego"
                                            label="¿Arma de fuego?:"
                                            disabled
                                            v-if="tipoViolencia == 'Violencia física'"
                                        />
                                        <v-text-field
                                            v-model="tipoRobado"
                                            label="¿Descripción de lo robado?"
                                            disabled
                                            v-if="tipoRobado != 0"
                                        />
                                    </v-flex>
                                    <v-flex xs3 sm3 md3>
                                        <v-text-field
                                            v-model="delitoespecifico"
                                            label="Especificación del delito:"
                                            disabled
                                        />
                                        <v-text-field
                                            v-model="tipoDeclaracion"
                                            label="Requisito de procedibilidad:"
                                            disabled
                                        />
                                        <v-text-field
                                            v-model="armablanca"
                                            label="¿Arma blanca?"
                                            v-if="tipoViolencia == 'Violencia física'"
                                            disabled
                                        />
                                    </v-flex>
                                    <v-flex xs3 sm3 md3>                         
                                        <v-text-field
                                            v-model="concurso"
                                            label="Concurso:"
                                            disabled
                                        />
                                        <v-text-field
                                            v-model="clasifOrdenResult"
                                            label="Clasificación del delito por la ejecución:"
                                            disabled
                                        />
                                        <v-text-field
                                            v-model="conOtroElemento"
                                            label="¿Con otro elemento"
                                            disabled
                                            v-if="tipoViolencia == 'Violencia física'"
                                        />
                                    </v-flex>
                                    <v-flex xs3 sm3 md3>
                                        <v-text-field
                                            v-model="intensionDelito"
                                            label="Forma de comisión"
                                            disabled
                                        />
                                        <v-text-field
                                            v-model="tipoViolencia"
                                            label="Violencia:"
                                            disabled
                                        />
                                        <v-text-field
                                            v-model="conAlgunaParteCuerpo"
                                            label="¿Con alguna parte de cuerpo?"
                                            disabled
                                            v-if="tipoViolencia == 'Violencia física'"
                                        />
                                    </v-flex>
                                    <v-flex xs12 sm12 md12 lg12>
                                        <v-card auto-grow elevation="0">                                
                                            <v-card-text>
                                                <v-list one-line>
                                                    <p class="text-lg-center font-weight-bold"><a>Descripción.</a></p> 
                                                    <v-list-tile>
                                                        <v-list-tile-action>
                                                            <v-icon color="success">info</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content>  
                                                            <v-list-tile-title> 
                                                                <p class="body-2 font-weight-bold"><a></a></p> 
                                                            </v-list-tile-title> 
                                                            <v-list-tile-sub-title> 
                                                                <p color="accent" class="caption font-weight-regular" v-html="descripcion">
                                                                    <a>{{ descripcion }}</a>
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
                            <br>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn @click.native="close()">Cerrar</v-btn>
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
    import moment from 'moment'
    import 'moment/locale/es';
    import alertify from 'alertifyjs';
    import { VueEditor } from "vue2-editor";
    import n401 from './401.vue'
    import n403 from './403.vue'
    import { error } from 'util';

    export default {
        components: { 
            "vue2-editor": VueEditor,
            n401,
            n403
        },
        data: () => ({
            //-------Logos-----------------------------------------/
            rAtencionId: '',
            rHechoId: '', 
            rac: '',
            nuc: '', 
            //************************* */ 
            step: 1, 
            //************************* */ 
            headers: [ 
                { text: 'Delito', value: 'delito' },
                { text: 'Delito Especifico', value: 'delitoEspecifico' },  
                { text: 'Tipo de fuero', value: 'tipofuero' }, 
                { text: 'Requisito de procebilidad', value: 'tipodeclaracion' },          
                { text: 'Estatus', value: 'equiparado',  },    
                { text: 'Opciones', value: 'opciones', sortable: false },                               
            ],
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
            search: '',
            rowsPerPageItems: [10, 20, 30, 40, 50],
            pagination: {
                rowsPerPage: 20
            },
            editedIndex: -1, 
            modalAdd: 0,
            //************************* */ 
            delitoshecho: [],
            //************************* */ 
            // VARIABLE PARA EL REGISTRO DEL DELITO
            delitoId: '',
            delitos: [],
            tipoFuero: '',
            tipoFueros: [],
            delitoespecificos: [],
            delitoespecifico: '',
            tipoRobado: '',
            tipoDeclaraciones: [],
            tipoDeclaracion: '',
            clasificaOrdenResult: '',
            clasificaOrdenResults: [],
            intensionDelito: '',
            intensionDelitos: [],
            violenciaSinViolencia: '',
            violenciaSinViolencias: [
                { text: 'Sin violencia', value: 'Sin violencia', value2: 1 },
                { text: 'Violencia moral', value: 'Violencia moral', value2 :2 },
                { text: 'Violencia física', value: 'Violencia física', value2: 3 }
            ],
            armaFuego: false,
            armaBlanca: false,
            armafuego: false,
            armablanca: false,
            conAlgunaParteCuerpo: '',
            conOtroElemento: '',
            resultadoDelito: '',
            resultadoDelitos: [],
            concursos: [ 'Ideal', 'Real','No especifica' ],
            concurso: '',
            graveNoGraves: ['Si', 'No','No especifica'],
            graveNoGrave: '',
            tipos: [],
            tipo: '',
            control: false,
            nombreDelito: '',
            idrdh: '',
            estatus: '',
            descripcion: '',
            tipoViolencia: '',
            clasifOrdenResult: '',
            //-----CLAIM------------------------------------------
            u_iddistrito: '',
            u_distrito: '',
            u_dirSubPro: '',
            u_idagencia: '',
            u_agencia: '',
            u_idmoduloservicio: '',
            u_modulo: '',
            u_idusuario: '',
            u_nombre: '',
            u_clave: '',
            u_rol: '',
            u_puesto: '',
            u_subproc: '',
            //----------------------------------------------------
            dialog2: 0,
            tipoMontoRobo: false,
            //----------------------------------------------------
            showpage: true,
            e401: false,
            e403: false,
        }),
        created () {
            let me = this 
            me.rHechoId = me.$store.state.rhechoid;
            me.nuc = me.$store.state.nuc;
            me.rAtencionId = me.$store.state.ratencionid;
            if (me.rHechoId == null) {
                me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpetas y luego en Lista de carpetas asignadas y  ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.', 
                    function() { 
                        me.$router.push('./mcaptura-listacarpetas')
                    }
                )
            } else {
                me.$notify('Carpeta abierta correctamente', 'success')
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
                    me.listarRDeliotosHecho();
                    me.listarDelitos();
                    me.listarTipoFuero();
                    me.listarTipoDeclaracion();
                    me.listarClasificaOrdenResult()
                    me.listarIntensionDelito()
                    me.listarResultadoDelito()
                    me.listarTipo();
            }
            // Add a request interceptor
            axios.interceptors.request.use((config)=> {
                // Do something before request is sent
                console.log(config);
                this.$store.commit('LOADER',true);
                return config;
            }, (error)=> {
                // Do something with request error
                this.$store.commit('LOADER',false);
                return Promise.reject(error);
            });
            // Add a response interceptor
            axios.interceptors.response.use((response)=>{
                console.log(response);
                this.$store.commit('LOADER',false);
                // Do something with response data
                return response;
            }, (err)=> {
                // Do something with response error
                return new Promise( (resolve, reject)=> {
                    this.$store.dispatch('logout').then(()=>{
                        this.$router.push('/login')
                    })
                    throw err;
                });
            });
        },
        computed: {
            logueado(){
                return this.$store.state.usuario;
            },
            esAdministrador(){ 
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Administrador';
            },
            esRecepcion(){ 
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Recepción';
            },
            esAMPOAMP(){
                return this.$store.state.usuario && this.$store.state.usuario.rol =='AMPO-AMP';
            },
            esDirector(){
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Director';
            },
            esCoordinador(){
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Coordinador';
            },
            esAmpoMixto(){
                return this.$store.state.usuario && this.$store.state.usuario.rol =='AMPO-AMP Mixto';
            },
            esFacilitador(){ 
                return this.$store.state.usuario && this.$store.state.usuario.rol =='Facilitador';
            },
            usuario(){
                return this.$store.state.usuario.usuario;
            },
            email(){
                return this.$store.state.usuario.email;
            },
            drawer(){
                return this.$store.state.drawer
            }
        },
        watch: {
            
        },
        methods: {
            cerrarcarpeta () {
                this.$store.state.rHechoId = null;
                this.$store.state.nuc = null;
                this.$store.state.ratencionid = null; 
                this.$router.push('./listacarpetas')
            },
            agregar () {
                this.limpiar();
                this.modalAdd = 1;
                this.control = true
            },
            editr (item) {
                let me = this;
                me.delitoId = new Object()
                me.delitoId.value = item.nombreDelito
                me.delitoId.value2 = item.delitoId
                me.listarPorDelito();
                me.tipoFuero = item.tipoFuero
                me.tipoDeclaracion = item.tipoDeclaracion
                me.resultadoDelito = item.resultadoDelito          
                me.intensionDelito = item.intensionDelito
                me.violenciaSinViolencia = new Object()
                me.violenciaSinViolencia.value = item.violenciaSinViolencia
                me.concurso = item.concurso
                me.clasificaOrdenResult = item.clasificaOrdenResult
                me.armaFuego = item.armaFuego
                me.armaBlanca = item.armaBlanca
                me.conAlgunaParteCuerpo = item.conAlgunaParteCuerpo
                me.conOtroElemento = item.conotroElemento
                me.tipoRobado = item.tipoRobado
                me.descripción = item.observaciones
                me.idrdh = item.idRDH
                me.modalAdd = 1;
                me.control = false
                me.delitoespecifico = item.delitoEspecifico
                me.descripcion = item.observaciones
            },
            guardar(){ 
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                if (me.tipoMontoRobo == false) {
                    me.tipoRobado = 0;
                }
                me.$validator.validate().then(result => {
                    if (result) { 
                        me.$cat.post('api/RDHs/Crear',{  
                            'rHechoId': me.rHechoId,
                            'delitoId': me.delitoId.value2, 
                            'DelitoEspecifico': me.delitoespecifico,
                            'tipoFuero': me.tipoFuero,
                            'tipoDeclaracion': me.tipoDeclaracion,
                            'resultadoDelito': me.resultadoDelito, 
                            'graveNoGrave': me.graveNoGrave,
                            'intensionDelito': me.intensionDelito,
                            'violenciaSinViolencia': me.violenciaSinViolencia.text,
                            'tipo': me.tipo,
                            'concurso': me.concurso,
                            'clasificaOrdenResult': me.clasificaOrdenResult,
                            'armaFuego': me.armaFuego,
                            'armaBlanca': me.armaBlanca,
                            'conAlgunaParteCuerpo': me.conAlgunaParteCuerpo,
                            'conotroElemento': me.conOtroElemento,
                            'tipoRobado': me.tipoRobado,
                            'observaciones' : me.descripcion,                       
                            'MontoRobado': 0,
                            'Equiparado': true,
                        },configuracion).then(function(response) {
                            me.close();
                            me.$notify('¡La información se guardo correctamente!', 'success')
                            me.listarRDeliotosHecho();             
                        }).catch(err => { 
                            if (err.response.status == 400) {
                                me.$notify("No es un usuario válido", 'error')
                            } else if (err.response.status == 401) {
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage = false
                            } else if (err.response.status == 403) { 
                                me.$notify("No esta autorizado para ver esta página", 'error')
                                me.e403 = true
                                me.showpage = false 
                            } else if (err.response.status == 404) {
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            } else {
                                me.$notify('¡Error al intentar crear el  registro!','error')  
                            } 
                        });
                    }
                })
            },
        close () {
            this.limpiar();
            this.modalAdd = 0; 
            this.dialog2=0;
        }, 
        limpiar(){     
            let me=this;      
            me.delitoId="";
            me.reclasificacionDelito= "";
            me.tipoFuero= "";
            me.tipoDeclaracion= "";
            me.resultadoDelito= "";
            me.intensionDelito= "";
            me.violenciaSinViolencia= "";
            me.equiparado= true;
            me.concurso= "";
            me.clasificaOrdenResult= "";
            me.armaFuego= false;
            me.armaBlanca= false;
            me.conAlgunaParteCuerpo= "";
            me.conOtroElemento= "";
            me.tipoRobado= "";
            me.observaciones = "";
            me.delitoespecifico = ""
            me.descripcion = ""
            me.tipo = ""
            me.graveNoGrave = ""
        },
        listarRDeliotosHecho(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$cat.get('api/RDHs/ListarPorHechoTodos/'+ me.rHechoId,configuracion).then(function(response){ 
                me.delitoshecho=response.data;
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
        listarDelitos(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var delitosArray=[];
            me.$conf.get('api/Delitoes/Listar',configuracion).then(function(response){
    
                delitosArray=response.data;
                delitosArray.map(function(x){
                    me.delitos.push({text: x.nombre,value: x.nombre,value2:x.idDelito});
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
        listarPorDelito(){ 
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var delitoespecificoarray;
            me.delitoespecificos = [];
            me.$conf.get('api/Delitoes/ListarPorDelito/'+me.delitoId.value2,configuracion).then(function(response){ 
                me.tipoMontoRobo = response.data.tipoMontoRobo; 
                me.$conf.get('api/DelitoEspecifico/ListarPorDelito/'+ me.delitoId.value2,configuracion).then(function(response){ 
                    delitoespecificoarray=response.data;
                    delitoespecificoarray.map(function(x){
                        me.delitoespecificos.push({text: x.nombre,value: x.nombre});
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
        listarTipoFuero(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var fuerosArray=[];
                me.$conf.get('api/TipoFueroes/Listar',configuracion).then(function(response){ 
                    fuerosArray=response.data;
                    fuerosArray.map(function(x){
                        me.tipoFueros.push({text: x.nombre,value: x.nombre});
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
        listarClasificaOrdenResult(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var clasificaOrdenResultsArray=[];
            me.$conf.get('api/ClasificaOrdenResults/Listar',configuracion).then(function(response){ 
                clasificaOrdenResultsArray=response.data;
                clasificaOrdenResultsArray.map(function(x){
                    me.clasificaOrdenResults.push({text: x.nombre,value: x.nombre});
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
        listarTipoDeclaracion(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var declaracionesArray=[];
            me.$conf.get('api/TipoDeclaracions/Listar',configuracion).then(function(response){ 
                declaracionesArray=response.data;
                declaracionesArray.map(function(x){
                    me.tipoDeclaraciones.push({text: x.nombre,value: x.nombre});
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
        listarIntensionDelito(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var intensionDelitoArray=[];
            me.$conf.get('api/IntensionDelitoes/Listar',configuracion).then(function(response){ 
                intensionDelitoArray=response.data;
                intensionDelitoArray.map(function(x){
                    me.intensionDelitos.push({text: x.nombre,value: x.nombre});
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
        listarResultadoDelito(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var resultadoDelitoArray=[];
            me.$conf.get('api/ResultadoDelitoes/Listar',configuracion).then(function(response){ 
                resultadoDelitoArray=response.data;
                resultadoDelitoArray.map(function(x){
                    me.resultadoDelitos.push({text: x.nombre,value: x.nombre});
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
        listarTipo(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var tiposArray=[];
            me.$conf.get('api/Tipoes/Listar',configuracion).then(function(response){ 
                tiposArray=response.data;
                tiposArray.map(function(x){
                    me.tipos.push({text: x.nombre,value: x.nombre});
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
            });; 
        }, 
        detalles(item){  
            this.nombreDelito= item.nombreDelito        
            this.tipoFuero= item.tipoFuero,
            this.tipoDeclaracion= item.tipoDeclaracion,
            this.intensionDelito= item.intensionDelito,
            this.tipoViolencia= item.violenciaSinViolencia,
            this.equiparado= item.equiparado,
            this.concurso= item.concurso,
            this.clasifOrdenResult= item.clasificaOrdenResult
            this.armaFuego = item.armaFuego
            this.armaBlanca = item.armaBlanca
            this.conAlgunaParteCuerpo= item.conAlgunaParteCuerpo,
            this.conOtroElemento= item.conotroElemento,
            this.tipoRobado=item.tipoRobado,
            this.delitoespecifico = item.delitoEspecifico
            this.dialog2=1;
            this.descripcion = item.observaciones;
            if(item.armaFuego)
                this.armafuego = "Si"
            else
                this.armafuego = "No"
            if(item.armaBlanca)
                this.armablanca = "Si"
            else
                this.armablanca = "No" 
        },
        actualizarstatus(item){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            var aux;        
            if(item.equiparado){
                me.$cat.put('api/RDHs/ActualizarEquiparadosDesactivar',{
                    'IdRDH' : item.idRDH,
                    'Equiparado' : false,

                },configuracion).then(function(response){                            
                    me.$notify('La información se actualizo correctamente !!!','success')    
                    me.listarRDeliotosHecho();    
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
                        me.$notify('Error al intentar actualizar el registro!!!','error')   
                    } 
                });
            }              
            else{

                me.$cat.put('api/RDHs/ActualizarEquiparadosActivar',{
                'IdRDH' : item.idRDH,
                'Equiparado' : true,

                },configuracion).then(function(response){                            
                    me.$notify('La información se actualizo correctamente !!!','success')    
                    me.listarRDeliotosHecho();    
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
                        me.$notify('Error al intentar actualizar el registro!!!','error')   
                    } 
                });

            }
                
        },
        actualizar(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};      
            
            me.$cat.put('api/RDHs/Actualizar',{
                    'IdRDH': me.idrdh,
                    'delitoId': me.delitoId.value2, 
                    'tipoFuero': me.tipoFuero,
                    'tipoDeclaracion': me.tipoDeclaracion,
                    'resultadoDelito': me.resultadoDelito, 
                    'intensionDelito': me.intensionDelito,
                    'violenciaSinViolencia': me.violenciaSinViolencia.text,
                    'concurso': me.concurso,
                    'clasificaOrdenResult': me.clasificaOrdenResult,
                    'armaFuego': me.armaFuego,
                    'armaBlanca': me.armaBlanca,
                    'conAlgunaParteCuerpo': me.conAlgunaParteCuerpo,
                    'conotroElemento': me.conOtroElemento,
                    'tipoRobado': me.tipoRobado,
                    'observaciones' : me.observaciones,
                    'DelitoEspecifico': me.delitoespecifico,
                    'Equiparado': me.estatus,
                    'MontoRobado': 0,
                    'Observaciones' : me.descripcion
            },configuracion).then(function(response){                            
                me.$notify('La información se actualizo correctamente !!!','success')    
                me.listarRDeliotosHecho();
                me.modalAdd = 0;
                me.limpiar();    
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
                    me.$notify('Error al intentar actualizar el registro!!!','error')   
                } 
            });
                          
        },
        
      } 
   }
</script>
<style>
.espaciado{
    padding: 30px !important; 
}
</style>