<template>
    <v-layout align-start>
          <n401 v-if="e401" />
          <n403 v-if="e403" />
          <v-flex v-if="showpage">
        <v-toolbar flat color="white">
          <v-toolbar-title class="font-weight-regular">Delito(s).</v-toolbar-title>
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
            <td>{{ props.item.tipoFuero }}</td>
            <td>{{ props.item.tipoDeclaracion}}</td>
            <td>{{ props.item.resultadoDelito}}</td>
            <td>{{ props.item.graveNoGrave }}</td>
            <td>{{ props.item.violenciaSinViolencia }}</td>
            <td>{{ props.item.tipo }}</td> 
            <td>
              <div v-if="props.item.equiparado">
                  <span class="blue--text"> Activo </span>
              </div>
              <div v-else>
                  <span class="red--text"> Inactivo </span>
              </div>
            </td> 
            <td class="justify-center layout px-0">
              <v-tooltip bottom>               
                  <template v-slot:activator="{ on }">
                      <v-icon
                      class="mr-2"
                      v-on="on"
                      @click="editr(props.item)"
                      >edit</v-icon>
                  </template>
                <span>Editar registro</span>
              </v-tooltip>  
              <v-tooltip bottom>               
                <template v-slot:activator="{ on }">
                  <v-icon
                    class="mr-2"
                    v-on="on"
                    color="warning"
                    @click="detalles(props.item)"
                  >remove_red_eye</v-icon>
                </template>
                <span>Detalles del delito</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon
                    class="mr-2"
                    v-on="on"
                    @click="actualizarstatus(props.item)"
                  >cached</v-icon>
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
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn v-if="control" color="success" text @click.native="guardar()">GUARDAR INFORMACIÓN</v-btn>
                <v-btn v-if="!control" color="success" text @click.native="actualizar()">ACTUALIZAR INFORMACIÓN</v-btn>
              </v-toolbar-items>
              <v-btn icon @click="modalAdd = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar>
  
            <v-divider></v-divider>
  
  
            <v-card    elevation=0 class="mb-5" height="auto" >
                          <v-container grid-list-md text-xs-center    :rules="[() =>  !errors.has('descripción de lo robado') && !errors.has('monto de lo robado')]">
                              <v-layout row wrap>
                                 
                                  <v-flex class="espaciado" xs12 sm12 md6 lg6 > 
                                      
                                      <v-autocomplete
                                          name="delito"
                                          :items="delitos"
                                          v-model="delitoId"
                                          label="*Delito:"
                                          v-validate="'required'" 
                                          return-object
                                          v-on:change="listarPorDelito" 
                                          :menu-props="{ maxWidth: '530px' }"
                                          :error-messages="errors.collect('delito')"
                                      ></v-autocomplete>
                                      <v-text-field
                                          name="descripción de lo robado"
                                          label="*Descripción de lo robado:"
                                          v-model="tipoRobado" 
                                          v-if="tipoMontoRobo==true"  
                                          :error-messages="errors.collect('descripción de lo robado')"
                                      ></v-text-field>
                                      <v-text-field
                                          name="monto de lo robado"
                                          label="Monto de lo robado:" 
                                          v-model="montoRobado"
                                          v-validate="'decimal'"
                                          v-if="tipoMontoRobo==true" 
                                          :error-messages="errors.collect('monto de lo robado')"
                                      ></v-text-field>
                                      <v-autocomplete
                                          name="especificación del delito"
                                          :items="delitoespecificos"
                                          v-model="delitoespecifico"
                                          v-validate="'required'" 
                                          label="Especificación del delito:"
                                          :menu-props="{ maxWidth: '530px' }"
                                          :error-messages="errors.collect('delito')"
                                      ></v-autocomplete>
  
                                      <v-autocomplete
                                          name="tipo de fuero"
                                          :items="tipoFueros"
                                          v-model="tipoFuero"
                                          label="*Tipo de fuero:"
                                          v-validate="'required'"
                                          :error-messages="errors.collect('tipo de fuero')"
                                      ></v-autocomplete>
                                      <v-autocomplete
                                          name="requisito de procedibilidad"
                                          :items="tipoDeclaraciones"
                                          v-model="tipoDeclaracion"
                                          label="*Requisito de procedibilidad:"
                                          v-validate="'required'"
                                          :error-messages="errors.collect('requisito de procedibilidad')"
                                      ></v-autocomplete>
                                      <v-autocomplete
                                          name="grado de ejecucion"
                                          :items="resultadoDelitos"
                                          v-model="resultadoDelito"
                                          label="*Grado de ejecución:"
                                          v-validate="'required'"
                                          :error-messages="errors.collect('grado de ejecucion')"
                                      ></v-autocomplete>
                                      <v-autocomplete
                                          name="prisión preventiva oficiosa"
                                          :items="graveNoGraves"
                                          v-model="graveNoGrave"
                                          label="*Prisión preventiva oficiosa:"
                                          v-validate="'required'"
                                          :error-messages="errors.collect('prisión preventiva oficiosa')"
                                      ></v-autocomplete>
                                      <v-autocomplete
                                          name="forma de comisión"
                                          :items="intensionDelitos"
                                          v-model="intensionDelito"
                                          label="*Forma de comisión:"
                                          v-validate="'required'"
                                          :error-messages="errors.collect('forma de comisión')"
                                      ></v-autocomplete>
                                      <v-autocomplete
                                          name="modalidades del delito"
                                          :items="tipos"
                                          v-model="tipo"
                                          label="*Modalidades del delito:"
                                          v-validate="'required'"
                                          :error-messages="errors.collect('modalidades del delito')"
                                      ></v-autocomplete>
                                      <v-autocomplete
                                          name="concurso"
                                          :items="concursos"
                                          v-model="concurso"
                                          label="*Concurso:"
                                          v-validate="'required'"
                                          :error-messages="errors.collect('concurso')"
                                      ></v-autocomplete> 
                                     
                                  </v-flex>
                                
                                  <v-flex class="espaciado" xs12 sm12 md6 lg6 > 
                                  
                                      <v-autocomplete
                                          name="clasificación del delito por la ejecución"
                                          :items="clasificaOrdenResults"
                                          v-model="clasificaOrdenResult"
                                          v-validate="'required'"
                                          label="*Clasificación del delito por la ejecución:" 
                                          :error-messages="errors.collect('clasificación del delito por la ejecución')"
                                      ></v-autocomplete>
                                    <v-autocomplete
                                          name="violencia"
                                          :items="violenciaSinViolencias"
                                          v-model="violenciaSinViolencia"
                                          label="*Violencia:"
                                          return-object
                                          v-validate="'required'"
                                          :error-messages="errors.collect('violencia')"
                                      ></v-autocomplete>
                                      <v-autocomplete
                                          v-if="violenciaSinViolencia.value == 'Con violencia'"
                                          name="Tviolencia"
                                          :items="tipoViolencias"
                                          v-model="TViolencia"
                                          label="*Tipo violencia (Puede seleccionar uno o varios):"
                                          v-validate="'required'" 
                                          attach
                                          chips
                                          deletable-chips
                                          multiple
                                          return-object
                                          :error-messages="errors.collect('Tviolencia')"
                                      ></v-autocomplete>
                                      <v-autocomplete
                                          v-if="SexualSeleccionado || sexualSelect"
                                          name="violenciaS"
                                          :items="violenciaSexual"
                                          v-model="TSexual"
                                          label="*Subtipo:"
                                          return-object
                                          v-validate="'required'" 
                                          :error-messages="errors.collect('violenciaS')"
                                      ></v-autocomplete>
                                      <v-autocomplete
                                          v-if="DigitalSeleccionado || digitalSelect"
                                          name="digital"
                                          :items="infoDigital"
                                          v-model="TDigital"
                                          label="*Tipo de información (Puede seleccionar uno o varios):"
                                          attach
                                          chips
                                          deletable-chips
                                          multiple
                                          return-object
                                          v-validate="'required'" 
                                          :error-messages="errors.collect('digital')"
                                      ></v-autocomplete>
                                      <v-autocomplete
                                          v-if="DigitalSeleccionado || digitalSelect"
                                          name="medio"
                                          :items="medioDigital"
                                          v-model="TMedio"
                                          label="*Medio (Puede seleccionar uno o varios):"
                                          attach
                                          chips
                                          deletable-chips
                                          multiple
                                          return-object
                                          v-validate="'required'" 
                                          :error-messages="errors.collect('medio')"
                                      ></v-autocomplete>
                                      
                                      <div class="switch-container">
                                      <v-switch
                                          v-model="armaFuego"
                                          label="¿Arma de fuego?:"
                                          color="success"
                                          hide-details
                                          v-if="violenciaSinViolencia.value =='Con violencia'"
                                      ></v-switch>
                                      <v-switch
                                          v-model="armaBlanca"
                                          label="¿Arma blanca?:"
                                          color="success"
                                          hide-details
                                          v-if="violenciaSinViolencia.value =='Con violencia'"
                                      ></v-switch>
                                    </div>
                                      <v-text-field
                                          name="alguna parte del cuerpo"
                                          label="*Con alguna parte del cuerpo:"
                                          v-model="conAlgunaParteCuerpo"
                                          v-validate="'required'" 
                                          v-if="violenciaSinViolencia.value =='Con violencia'"
                                          :error-messages="errors.collect('alguna parte del cuerpo')"
                                      ></v-text-field> 
                                      <v-text-field
                                          name="con otro elemento"
                                          label="*Con otro elemento:"
                                          v-model="conOtroElemento"
                                          v-validate="'required'" 
                                          v-if="violenciaSinViolencia.value =='Con violencia'"
                                          :error-messages="errors.collect('con otro elemento')"
                                      ></v-text-field>
                                  </v-flex>      
                                  <v-flex xs12 sm12 md12 lg12 >
                                      <v-card elevation="0"  >
                                          <v-card-title ><h3>Observaciones</h3></v-card-title>
                                          <v-divider ></v-divider>
                                          <v-card-text>
                                              <v-form   data-vv-scope="form1"> 
                                                  <vue-editor  
                                                      name="observaciones"
                                                      v-model="observaciones"      
                                                      outline  height=350px;
                                                      style="max-height: 310px; overflow-y: scroll"
                                                      :editorToolbar="customToolbar"   >
                                                  </vue-editor>
                                              </v-form>
                                          </v-card-text>   
                                      </v-card> 
                                  </v-flex>             
                           
                      </v-layout>
                              
                          </v-container>
                      </v-card>
  
           
          </v-card>
        </v-dialog>
  
        <v-dialog   v-model="dialog2"  max-width="980px"> 
                  
                  <v-card>
                      <v-toolbar card dark color="grey lighten-4 primary--text">
                          <v-avatar  size="40">
                              <v-icon class="grey lighten-2">report_problem</v-icon>
                          </v-avatar> 
                  <v-toolbar-title class="subheading">Información detallada</v-toolbar-title>
                  <v-spacer></v-spacer>
              
                  
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
                                      ></v-text-field>
                                      <v-text-field
                                          v-model="delitoespecifico"
                                          label="Especificación del delito:"
                                          disabled
                                      ></v-text-field>
                                      <v-text-field
                                          v-if="tipoRobado!=0"
                                          v-model="tipoRobado"
                                          label="¿Descripción de lo robado?"
                                          disabled
                                      ></v-text-field>
                                      <v-text-field
                                          v-if="tipoRobado!=0"
                                          v-model="montoRobado"
                                          label="¿Monto de lo robado?"
                                          disabled
                                      ></v-text-field>
                                      <v-text-field
                                          v-model="tipoFuero"
                                          label="Tipo de fuero:"
                                          disabled
                                      ></v-text-field>
                                      <v-text-field
                                          v-model="OfiNoOfi"
                                          label="Oficioso no oficioso:"
                                          disabled
                                      ></v-text-field>
                                      <v-text-field
                                          v-model="altoImpacto"
                                          label="¿Es de alto impacto?:" 
                                          disabled   
                                      ></v-text-field>
                                       
                                  </v-flex>
                                  <v-flex xs3 sm3 md3>
                                    <v-text-field
                                          v-model="suceptibleMASC"
                                          label="¿Es suceptible a Medios Alternos de Solución de Conflictos ?:"
                                          disabled
                                      ></v-text-field>
                                        
                                    <v-text-field
                                          v-model="intensionDelito"
                                          label="Forma de comisión"
                                          disabled
                                      ></v-text-field>
                                    <v-text-field
                                          v-model="tipoDeclaracion"
                                          label="Requisito de procedibilidad:"
                                          disabled
                                      ></v-text-field>
                                      <v-text-field
                                          v-model="modalidad"
                                          label="Modalidad"
                                          disabled
                                      ></v-text-field>
                                        <v-text-field
                                          v-model="concurso"
                                          label="Concurso:"
                                          disabled
                                      ></v-text-field>
                                      
                                  </v-flex>
                                  <v-flex xs3 sm3 md3>
                                    <v-text-field
                                          v-model="clasifOrdenResult"
                                          label="Clasificación del delito por la ejecución:"
                                          disabled
                                      ></v-text-field>
                                    <v-text-field
                                        v-model="tipoViolencia"
                                        label="El hecho fue:"
                                        disabled
                                    ></v-text-field>
                                    <v-text-field
                                        v-if="tipoViolencia && tipoViolencia == 'Con violencia'"
                                        v-model="tipoViolencia2"
                                        label="Tipo de violencia:"
                                        disabled
                                    ></v-text-field>
                                    <v-text-field
                                        v-if="tipoViolencia2 && tipoViolencia2.includes('Sexual')"
                                        v-model="subtipo"
                                        label="Subtipo:"
                                        disabled
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="tipoinformacion"
                                        label="Tipo de información:"
                                        disabled
                                        v-if="tipoViolencia2 && tipoViolencia2.includes('Digital')"
                                    ></v-text-field>
        
                                </v-flex>
                                    <v-flex xs3 sm3 md3>
                                       
                                    <v-text-field
                                        v-if="tipoViolencia2 && tipoViolencia2.includes('Digital')"
                                        v-model="medio"
                                        label="Medio:"
                                        disabled
                                    ></v-text-field>
                                        <v-text-field
                                            v-if="tipoViolencia && tipoViolencia == 'Con violencia'"
                                            v-model="armablanca"
                                            label="¿Arma blanca?"
                                            disabled
                                        ></v-text-field>
                                        <v-text-field
                                          v-if="tipoViolencia && tipoViolencia == 'Con violencia'"
                                          v-model="conAlgunaParteCuerpo"
                                          label="¿Con alguna parte de cuerpo?"
                                          disabled
                                      ></v-text-field>
                                      <v-text-field
                                          v-if="tipoViolencia && tipoViolencia == 'Con violencia'"
                                          v-model="armafuego"
                                          label="¿Arma de fuego?:"
                                          disabled
                                      ></v-text-field>
                                      <v-text-field
                                          v-if="tipoViolencia && tipoViolencia == 'Con violencia'"
                                          v-model="conOtroElemento"
                                          label="¿Con otro elemento"
                                          disabled
                                      ></v-text-field>
                                  
                                  </v-flex>
                                  <v-flex xs12 sm12 md12 lg12>
                                    <v-card    auto-grow elevation="0">                                
                                        <v-card-text >
                                            <v-list one-line   > 
                                                <p class="text-lg-center font-weight-bold"><a>Observaciones.</a></p> 
                                                <v-list-tile>  
                                                    <v-list-tile-action>
                                                        <v-icon color="success">info</v-icon>
                                                    </v-list-tile-action> 
                                                    <v-list-tile-content   >  
                                                        <v-list-tile-title> <p class="body-2 font-weight-bold"><a></a></p> </v-list-tile-title> 
                                                        <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular" v-html="observaciones "></p>  </v-list-tile-sub-title>  
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
                              <v-spacer></v-spacer> 
                              <v-btn  @click.native="close()" >Cerrar</v-btn>
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
          rAtencionId:'',
          rHechoId:'', 
          rac:'',
          nuc:'', 
          //************************* */ 
          step:1, 
          //************************* */ 
          headers: [ 
              { text: 'Delito', value: 'delito' }, 
              { text: 'Tipo de fuero', value: 'tipofuero' }, 
              { text: 'Requisito de procebilidad', value: 'tipodeclaracion' }, 
              { text: 'Grado', value: 'resultado' }, 
              { text: 'Gravedad', value: 'gravedad',  },  
              { text: 'Violencia', value: 'violencia',  },    
              { text: 'Modalidad', value: 'modalidad',  },  
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
          modalAdd:0,
          //************************* */ 
          delitoshecho:[],
          //************************* */ 
           // VARIABLE PARA EL REGISTRO DEL DELITO
          delitoId:'',
          delitos:[],
  
          modalidadId:'',
          modalidades:[],
  
          tipoFuero:'',
          tipoFueros:[],
  
          tipoDeclaracion:'',
          tipoDeclaraciones:[],
  
          resultadoDelito:'',
          resultadoDelitos:[],
  
          graveNoGrave:'',
          graveNoGraves:['Si', 'No','No especifica'],
  
          intensionDelito:'',
          intensionDelitos:[],
  
          violenciaSinViolencia:'',
          violenciaSinViolencias:[
              {text:'Sin violencia',value:'Sin violencia',value2:1},
              {text:'Con violencia',value:'Con violencia',value2:3}
          ],
  
          equiparado:'',
  
          tipo:'',
          tipos:[],
          
          concurso:'',
  
          clasificaOrdenResult:'',
          clasificaOrdenResults:[],
  
          armaFuego: false,
          armaBlanca: false,
  
          conAlgunaParteCuerpo:'',
          conOtroElemento:'',
          tipoRobado:'',
          montoRobado:0,
          observaciones:'',
          control:false,
          delitoespecificos:[],
          delitoespecifico:'',
         //************************* */ 
          //-----CLAIM------------------------------------------
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
          //----------------------------------------------------
          dialog2:0,
          nombreDelito:'',
          OfiNoOfi:'',
          altoImpacto:false,
          suceptibleMASC:false,
          tipoFuero:'',
          tipoDeclaracion:'',
          intensionDelito:'',
          tipoViolencia:'',
          equiparado:true,
          modalidad:'',
          concursos:['Ideal', 'Real','No especifica'],
          concurso:'',
          clasifOrdenResult:'',
          armafuego:'',
          armablanca:'',
          conAlgunaParteCuerpo:'',
          conOtroElemento:'',
          tipoRobado:'',
          montoRobado :0,
          tipoMontoRobo:false,
          idrdh:'',
          hipotesiscat:[],
          hipotesi:'',
          tipoViolencias:[],
          TViolencia: [],
          TSexual: [],
          TDigital: [],
          TMedio: [],
          tipoViolencia2:'',
          subtipo: '',
          tipoinformacion:'',
          medio:'',
          violenciaSexual:['Derechos sexuales','Derechos Reproductivos'],
          infoDigital:[
            {text: 'Audiograbaciones', value:'Audiograbaciones'},
            {text: 'Imagenes', value:'Imagenes'},
            {text: 'Texto', value:'Texto'},
            {text: 'Videograbaciones', value:'Videograbaciones'},
          ],
          medioDigital:[
            {text: 'Correo Electronico', value: 'Correo Electronico'},
            {text: 'Paginas Web', value: 'Paginas Web'},
            {text: 'Red Social', value: 'Red Social'},
            {text: 'Telefonia', value: 'Telefonia'},
          ],
          sexualSelect: false,
          digitalSelect: false,
          TipoV: '',
          TipoD: '',
          TipoM: '',
          //----------------------------------------------------
          showpage:true,
          e401:false,
          e403:false,
  
      }),
   
      created () {  
          let me = this  
          me.rAtencionId = me.$store.state.ratencionid;
          me.rHechoId = me.$store.state.rhechoid;
          me.nuc = me.$store.state.nuc;
   
  
          if (me.rHechoId== null)
          {
                  me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpeta y luego en Listar carpeta y   ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.', 
                  function(){ 
  
                          me.$router.push('./umixta-carpetas')
                  })
          }
          else{
                  me.$notify('Carpeta abierta correctamente !!!','success')
                  
  
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
                  me.listarRDeliotosHecho();
              
                  me.listarDelitos();
                  me.listarTipoFuero();
                  me.listarTipoDeclaracion();
                  me.listarResultadoDelito();
                  me.listarIntensionDelito();
                  me.listarTipo();
                  me.listarhipotesis();
                  me.listarClasificaOrdenResult();
            
                  
          }
         
        // Add a request interceptor
          axios.interceptors.request.use( (config)=> {
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
          },  (err)=> {
          
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
        
        SexualSeleccionado() {
            return this.TViolencia.some(item => item.value === 'Sexual');
        },
        DigitalSeleccionado() {
            return this.TViolencia.some(item => item.value === 'Digital');
        }
           
      },
      watch: {
        violenciaSinViolencia(val){
            if(val.value === 'Con violencia'){
                this.listarTViolencia();
            }else{
                this.sinviolencia();
            }
        },
        delitoId(val){
            if(val.value != 'ROBO'){
                this.sinRobo();
            }
        },
        TViolencia(val){
            if(val.every(item => item.value !== 'Digital')){
                this.sinDigital();
            }
        }
    
      },
      methods:{
        sinDigital(){
            this.TDigital = [];
            this.TMedio = [];
        },
        sinRobo(){
            this.montoRobado = 0;
            this.tipoRobado = 0;
        },
          sinviolencia(){
            this.TViolencia = [];
            this.TSexual = [];
            this.TDigital = [];
            this.TMedio = [];
             this.armaFuego = false;
            this.armaBlanca = false; 
            this.conAlgunaParteCuerpo = "Na"; 
            this.conOtroElemento = "Na"; 
          },
          cerrarcarpeta () {
              this.$store.state.rHechoId = null;
              this.$store.state.nuc = null;
              this.$store.state.ratencionid = null; 
              this.$router.push('./umixta-carpetas')
          },
          agregar(){
              this.limpiar();
              this.modalAdd= 1;
              this.control = true
             // this.listarTViolencia();
          },
          editr(item){
            
              let me = this;
              //Separamos los valores por ; para guardarlos en un arreglo, mapearlos, eliminar espacios y al final mostrarlos
              //Tipo de Violencia 
              if(item.tipoViolencia !== null){

              var tipoVio = item.tipoViolencia;
              var arrayviolencia = tipoVio.split(";");
              const ArrayV = arrayviolencia.map(function(item) {
                    return {text: item.trim(), value: item.trim(),
                    };
                });
                me.TViolencia =  ArrayV
              //Tipo de Informacion
              var tipoinf = item.tipoInfoDigital;
              var arraytipoinfo = tipoinf.split(";");
              const ArrayD = arraytipoinfo.map(function(item) {
                    return {text: item.trim(), value: item.trim(),
                    };
                });
                me.TDigital = ArrayD
            
              //Medio
              var tipomedio = item.medioDigital;
              var arraymedio = tipomedio.split(";");
              const ArrayM = arraymedio.map(function(item) {
                    return {text: item.trim(), value: item.trim(),
                    };
                });
                me.TMedio = ArrayM
                //validamos si existe sexual o digital en el arreglo para activar los autocomplete
              if(arrayviolencia.some(violencia => violencia.value === 'Sexual')){
                me.sexualSelect = true;
              }
              if(arrayviolencia.some(digital => digital.value === 'Digital')){
                me.digitalSelect = true;
              }
            }
              
              me.delitoId = new Object()
              me.delitoId.value = item.nombreDelito
              me.delitoId.value2 = item.delitoId
              me.listarPorDelito();
              me.tipoFuero = item.tipoFuero
              me.tipoDeclaracion = item.tipoDeclaracion
              me.resultadoDelito = item.resultadoDelito
              me.graveNoGrave = item.graveNoGrave
              me.intensionDelito = item.intensionDelito
              me.violenciaSinViolencia = new Object()
              me.violenciaSinViolencia.value = item.violenciaSinViolencia
              me.tipo = item.tipo
              me.concurso = item.concurso
              me.clasificaOrdenResult = item.clasificaOrdenResult
              me.armaFuego = item.armaFuego
              me.armaBlanca = item.armaBlanca
              me.conAlgunaParteCuerpo = item.conAlgunaParteCuerpo
              me.conOtroElemento = item.conotroElemento
              me.tipoRobado = item.tipoRobado
              me.montoRobado = item.montoRobado
              me.observaciones = item.observaciones
              me.idrdh = item.idRDH
              me.modalAdd = 1;
              me.control = false
              me.delitoespecifico = item.delitoEspecifico
              
              me.TSexual = item.subtipoSexual
             
              
          },
          guardar(){ 
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var descripcionRegTabI = 'Registro de delito por ' + me.delitoId.text;

            if (me.tipoMontoRobo==false)
            {
              me.tipoRobado=0;
              me.montoRobado=0;
            }
            if(me.violenciaSinViolencia.value2 == 1){
                me.armaFuego = false;
                me.armaBlanca = false;
                me.conAlgunaParteCuerpo = "Na"
                me.conOtroElemento = "Na"
                me.TSexual = "Na"
                me.TipoV = "Na"
                me.TipoD = "Na"
                me.TipoM = "Na"
            }
            else if(me.violenciaSinViolencia.value2 == 3){
            //Si existe violencvia concatenamos los valores con ; para guardarlos en un cadena
            //Tipo Violencia
                for(var i=0; i<me.TViolencia.length; i++){
                    me.TipoV += me.TViolencia[i].value;
                        if(i+1 != me.TViolencia.length)
                            me.TipoV += "; ";
                }
                //Informacion Digital
                for(var i=0; i<me.TDigital.length; i++){
                    me.TipoD += me.TDigital[i].value;
                        if(i+1 != me.TDigital.length)
                        me.TipoD += "; ";
                }
                //Medio Digital
                for(var i=0; i<me.TMedio.length; i++){
                    me.TipoM += me.TMedio[i].value;
                        if(i+1 != me.TMedio.length)
                            me.TipoM += "; ";
                }

                if (!me.TipoV.includes('Sexual')) {
                    me.TSexual = "Na"
                    console.log("No hay sexual")
                } 
            }
           
  
              me.$validator.validate().then(result => {
                      if (result) { 
                               this.$cat.post('api/RDHs/Crear',{
                                  'rHechoId': me.rHechoId,
                                  'delitoId': me.delitoId.value2, 
                                  'tipoFuero': me.tipoFuero,
                                  'tipoDeclaracion': me.tipoDeclaracion,
                                  'resultadoDelito': me.resultadoDelito, 
                                  'graveNoGrave': me.graveNoGrave,
                                  'intensionDelito': me.intensionDelito,
                                  'violenciaSinViolencia': me.violenciaSinViolencia.value,
                                  'equiparado': true,
                                  'tipo': me.tipo,
                                  'concurso': me.concurso,
                                  'clasificaOrdenResult': me.clasificaOrdenResult,
                                  'armaFuego': me.armaFuego,
                                  'armaBlanca': me.armaBlanca,
                                  'conAlgunaParteCuerpo': me.conAlgunaParteCuerpo,
                                  'conotroElemento': me.conOtroElemento,
                                  'tipoRobado': me.tipoRobado,
                                  'montoRobado': me.montoRobado, 
                                  'observaciones' : me.observaciones,
                                  'Hipotesis' : me.hipotesi,
                                  'DelitoEspecifico': me.delitoespecifico,
                                  'tipoViolencia': me.TipoV,
                                  'subtipoSexual': me.TSexual,
                                  'tipoInfoDigital': me.TipoD,
                                  'medioDigital': me.TipoM
                              },configuracion).then(function(response){
                                  me.close();
                                  me.$notify('La información se guardo correctamente !!!','success')  
                                  me.crearRegistroTableroI(descripcionRegTabI);
                                  me.listarRDeliotosHecho();
                                                     
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
                      }
              })   
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
                      me.$notify('La información se guardo correctamente !!!','success')
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
              me.graveNoGrave= "";
              me.intensionDelito= "";
              me.violenciaSinViolencia= "";
              me.equiparado= true;
              me.tipo= "";
              me.concurso= "";
              me.clasificaOrdenResult= "";
              me.armaFuego= false;
              me.armaBlanca= false;
              me.conAlgunaParteCuerpo= "";
              me.conOtroElemento= "";
              me.tipoRobado= "";
              me.montoRobado= "";
              me.observaciones = "";
              me.delitoespecifico = ""
              me.TViolencia = [];
              me.TSexual = "";
              me.TDigital = [];
              me.TMedio = [];
              me.sexualSelect = false;
              me.digitalSelect = false;
              me.TipoV = "";
              me.TipoD = "";
              me.TipoM = "";
          },
          listarRDeliotosHecho(){
              let me=this; 
              let header={"Authorization" : "Bearer " + this.$store.state.token};
              let configuracion= {headers : header};
              this.$cat.get('api/RDHs/ListarPorHechoTodos/'+ me.rHechoId,configuracion).then(function(response){
                  me.delitoshecho=response.data;
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
                              me.$notify("No esta autorizado para ver esta pagina", 'error')
                              me.e403= true
                              me.showpage= false 
                          } else if (err.response.status==404){
                              me.$notify("El recuso no ha sido encontrado", 'error')
                          }else{
                              me.$notify('Error al intentar listar los registros!!!','error')    
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
                          me.$notify("No esta autorizado para ver esta pagina", 'error')
                          me.e403= true
                          me.showpage= false 
                      } else if (err.response.status==404){
                          me.$notify("El recuso no ha sido encontrado", 'error')
                      }else{
                          me.$notify('Error al intentar listar los registros!!!','error')    
                      } 
                  });; 
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
          detalles(item){  
              this.nombreDelito= item.nombreDelito,
              this.OfiNoOfi= item.ofiNoOfic
              if(item.altoImpacto)
                  this.altoImpacto = "Si"
              else
                  this.altoImpacto = "No"
              if(item.suceptibleMASC)
                  this.suceptibleMASC = "Si"
              else
                  this.suceptibleMASC = "No" 
              this.tipoFuero= item.tipoFuero,
              this.tipoDeclaracion= item.tipoDeclaracion,
              this.intensionDelito= item.intensionDelito,
              this.tipoViolencia= item.violenciaSinViolencia,
              this.equiparado= item.equiparado,
              this.modalidad= item.tipo,
              this.concurso= item.concurso,
              this.clasifOrdenResult= item.clasificaOrdenResult
              if(item.armaFuego)
                  this.armafuego = "Si"
              else
                  this.armafuego = "No"
              if(item.armaBlanca)
                  this.armablanca = "Si"
              else
                  this.armablanca = "No" 
              this.conAlgunaParteCuerpo= item.conAlgunaParteCuerpo,
              this.conOtroElemento= item.conotroElemento,
              this.tipoRobado=item.tipoRobado,
              this.montoRobado= item.montoRobado
              this.delitoespecifico = item.delitoEspecifico
              this.dialog2=1;
              this.observaciones = item.observaciones;
              this.tipoViolencia2 = item.tipoViolencia;
              this.subtipo = item.subtipoSexual;
              this.tipoinformacion = item.tipoInfoDigital;
              this.medio = item.medioDigital;
          },
          actualizarstatus(item){
              let me=this; 
              let header={"Authorization" : "Bearer " + this.$store.state.token};
              let configuracion= {headers : header}; 
              var aux;        
              if(item.equiparado){
                  this.$cat.put('api/RDHs/ActualizarEquiparadosDesactivar',{
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
              else{
                  this.$cat.put('api/RDHs/ActualizarEquiparadosActivar',{
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
                  
          },
          actualizar(){
              let me=this; 
              let header={"Authorization" : "Bearer " + this.$store.state.token};
              let configuracion= {headers : header};  
                
                for(var i=0; i<me.TViolencia.length; i++){
                    me.TipoV += me.TViolencia[i].value;
                        if(i+1 != me.TViolencia.length)
                            me.TipoV += "; ";
                }

                for(var i=0; i<me.TDigital.length; i++){
                    me.TipoD += me.TDigital[i].value;
                        if(i+1 != me.TDigital.length)
                        me.TipoD += "; ";
                }
                for(var i=0; i<me.TMedio.length; i++){
                    me.TipoM += me.TMedio[i].value;
                        if(i+1 != me.TMedio.length)
                            me.TipoM += "; ";
                }
                   
                if (!me.TipoV.includes('Sexual')) {
                    me.TSexual = "Na"
                    console.log("No hay sexual")
                } 

            me.$validator.validate().then(result => {
                if (result) { 
              
                    this.$cat.put('api/RDHs/Actualizar',{
                        'IdRDH': me.idrdh,
                        'delitoId': me.delitoId.value2, 
                        'tipoFuero': me.tipoFuero,
                        'tipoDeclaracion': me.tipoDeclaracion,
                        'resultadoDelito': me.resultadoDelito, 
                        'graveNoGrave': me.graveNoGrave,
                        'intensionDelito': me.intensionDelito,
                        'violenciaSinViolencia': me.violenciaSinViolencia.value,
                        'tipo': me.tipo,
                        'concurso': me.concurso,
                        'clasificaOrdenResult': me.clasificaOrdenResult,
                        'armaFuego': me.armaFuego,
                        'armaBlanca': me.armaBlanca,
                        'conAlgunaParteCuerpo': me.conAlgunaParteCuerpo,
                        'conotroElemento': me.conOtroElemento,
                        'tipoRobado': me.tipoRobado,
                        'montoRobado': me.montoRobado, 
                        'observaciones' : me.observaciones,
                        'DelitoEspecifico': me.delitoespecifico,
                        'tipoViolencia': me.TipoV,
                        'subtipoSexual': me.TSexual,
                        'tipoInfoDigital': me.TipoD,
                        'medioDigital': me.TipoM
    
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
            })   
                            
          },
           listarhipotesis(){
              let me=this;
              let header={"Authorization" : "Bearer " + this.$store.state.token};
              let configuracion= {headers : header};
              var hipotesisArray=[];
                  me.$conf.get('api/Hipotesis/Listar',configuracion).then(function(response){ 
                      hipotesisArray=response.data;
                      hipotesisArray.map(function(x){
                          me.hipotesiscat.push({text: x.dato,value: x.dato});
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
                  });; 
          }, 
          listarTViolencia(){
              let me=this;
              let header={"Authorization" : "Bearer " + this.$store.state.token};
              let configuracion= {headers : header};
              var ViolenciaArray=[];
              this.$cat.get('api/RDHs/ListarTviolencia',configuracion).then(function(response){
                ViolenciaArray=response.data;
                ViolenciaArray.map(function(x){
                          me.tipoViolencias.push({text: x.tipoViolencia, value: x.tipoViolencia});
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

          }
          
        } 
     }
  </script>
  <style>
  #ticket {
    background: white;
    margin: 0 1em;
    padding: 1em;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  }
  #ticket h1 {
    text-align: center;
    font-size: 60px;
  }
  #ticket h3 {
    text-align: center;
  }
  #ticket h4 {
    font-size: 15px;
    text-align: center;
  }
  #ticket h5 {
    text-align: center;
    font-family: monospace;
  }
  .switch-container {
  display: flex;
  align-items: center;
}
  </style>
  