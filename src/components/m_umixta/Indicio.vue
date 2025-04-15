<template>  
    <v-layout align-start>
        <n401 v-if="e401" />
        <n403 v-if="e403" />
          <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                        <v-toolbar-title class="font-weight-regular" >Indicios</v-toolbar-title>
                       
                        <v-divider class="mx-2" inset vertical></v-divider>
                        
                        <v-spacer></v-spacer>
                        <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                        <v-spacer></v-spacer>
                         <v-flex xs12 sm6 md3>
                          
                            <v-text-field class="font-weight-regular"
                                v-model="nuc" disabled  prepend-icon="folder"
                                filled
                            ></v-text-field>
                           </v-flex>
                            <v-tooltip bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn class="mx-2" slot="activator" v-on="on" @click="cerrarcarpeta" fab dark small color="primary">
                                            <v-icon dark>close</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Cerrar carpeta</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn class="mx-2" slot="activator" v-on="on" @click="agregar" fab dark small color="success">
                                            <v-icon dark>add</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Agregar registro</span>
                            </v-tooltip> 
                
    
                            
                            <v-dialog  v-model="dialog"  max-width="1000px" >
                            
            
                  
                            <v-card>
                                <v-toolbar card dark color="grey lighten-4 primary--text">
                                    <v-avatar  size="30">
                                        <v-icon class="grey lighten-2">{{ formIcon }}</v-icon>
                                    </v-avatar>
                        
                             
                            <v-toolbar-title class="subheading">{{formTitle}}</v-toolbar-title>
                            <v-spacer></v-spacer>
                        
                            
                            </v-toolbar>
                            <v-card-text>
                              <v-form ref="form" data-vv-scope="dialogodetalle">
                                  
                                    <v-container grid-list-md text-xs-center>
                                        <v-layout row wrap>
                                        <v-flex xs12 sm12 md12>
                                            
    
                                             <v-data-table 
                                                v-if="editedIndex == 1"
                                                :headers="headersd"
                                                :items="detalleslist"
                                                :search="searchd" 
                                                :rows-per-page-items="rowsPerPageItems"
                                                :pagination.sync="pagination"
                                                >
                    
                                                 <template slot="items" class="white" slot-scope="props">
                        
                                                    <td>{{ props.item.fechaHora.substring(8,10) +" de "+ obtenermes(props.item.fechaHora.substring(5,7)-1)+" del "+ props.item.fechaHora.substring(0,4) }}</td> 
                                                    <td>{{ props.item.origenLugar}}</td>  
                                                    <td>{{ props.item.destinoLugar}}</td>   
                                                    <td>{{ props.item.quienEntrega}}</td> 
                                                    <td>{{ props.item.quienRecibe}}</td>   
    
                        
                                                </template>
                                            <template slot="no-data">
                                                <v-btn color="primary"  >Resetear</v-btn>
                                            </template>
                    
            </v-data-table>               
    
                    
    
                                            <v-text-field name="lugar de origen" 
                                                            label="*Lugar de Origen"
                                                            v-if="editedIndex == -1" 
                                                            v-model="origenlugar" 
                                                            v-validate="'required'"
                                                            data-vv-scope="dialogodetalle"
                                                            :error-messages="errors.collect('dialogodetalle.lugar de origen')">
                                            </v-text-field>
                                             <v-text-field name="lugar de destino" 
                                                              label="*Lugar de Destino"
                                                              v-if="editedIndex == -1"
                                                              v-model="origendestino" 
                                                              v-validate="'required'"
                                                              data-vv-scope="dialogodetalle"
                                                              :error-messages="errors.collect('dialogodetalle.lugar de destino')">                                              
                                             </v-text-field>
                                             <v-text-field name="quien entrega" 
                                                              label="*Quien entrega"
                                                              v-if="editedIndex == -1" 
                                                              v-model="quienentrega" 
                                                              v-validate="'required'"
                                                              data-vv-scope="dialogodetalle"
                                                              :error-messages="errors.collect('dialogodetalle.quien entrega')">
                                             </v-text-field>
                                             <v-text-field name="quien recibe" 
                                                              label="*Quien Recibe"
                                                              v-if="editedIndex == -1" 
                                                              v-model="quienrecibe" 
                                                              v-validate="'required'"
                                                              data-vv-scope="dialogodetalle"
                                                              :error-messages="errors.collect('dialogodetalle.quien recibe')">
                                             </v-text-field>
                                                                                 
                                        </v-flex>
                                     
                                        
                                    
                                        </v-layout>
                                    </v-container>
    
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn v-if="editedIndex == 1" @click.native="close" >Cerrar</v-btn>
                                        <v-btn v-if="editedIndex == -1" @click.native="close" >Cancelar</v-btn>
                                        <v-btn v-if="editedIndex == -1"  @click.native="guardardetalle" class="success">Guardar</v-btn>
                                        
                                    </v-card-actions> 
                                </v-form>
                            
                            </v-card-text> 
                        </v-card>
    
                        </v-dialog>
    
                        
            </v-toolbar>
            <v-data-table
                    :headers="headers"
                    :items="indicios"
                    :search="search" 
                    :rows-per-page-items="rowsPerPageItems"
                    :pagination.sync="pagination"
                     >
                    
                    <template slot="items" class="white" slot-scope="props">
                        
    
                        <td>{{ props.item.usuario}}</td>   
                        <td>{{ props.item.modulo}}</td> 
                        <td>{{ props.item.tipoIndicio }}</td> 
                        <td>{{ props.item.status }}</td> 
                        <td>{{ props.item.qIniciaCadena}}</td>   
                        <td>{{ props.item.institucionQI }}</td> 
                        <td class="justify-center layout px-0">
                                <v-tooltip bottom   >
                                    <template v-slot:activator="{ on }">
                                        <v-icon 
                                            class="mr-2" v-on="on" 
                                            @click="informacioncompleta(props.item)"
                                            >
                                           info
                                        </v-icon> 
                                    </template>
                                    <span>Ver información completa</span>
                                </v-tooltip> 
                                <v-tooltip bottom   >
                                    <template v-slot:activator="{ on }">
                                        <v-icon 
                                            class="mr-2" v-on="on" 
                                            @click="addItem(props.item)"
                                            >
                                           add
                                        </v-icon> 
                                    </template>
                                    <span>Agregar detalle</span>
                                </v-tooltip>    
                             
                                <v-tooltip bottom   >
                                    <template v-slot:activator="{ on }">
                                        <v-icon 
                                            class="mr-2" v-on="on" 
                                            @click="listItem(props.item)"
                                            >
                                           assignment
                                        </v-icon> 
                                    </template>
                                    <span>Ver Detalles</span>
                                </v-tooltip>                    
                        </td>   
                    </template>
                    <template slot="no-data">
                    <v-btn color="primary"  >Resetear</v-btn>
                    </template>
                    
            </v-data-table>
    
    
            
               
       
            <v-dialog v-model="modalAdd" fullscreen hide-overlay transition="dialog-bottom-transition">
            
                <v-card>
                <v-toolbar dark color="primary">
                    
                    <v-toolbar-title>Registro de Indicio.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    <v-btn  color=success text @click="guardar()">Guardar Información</v-btn>
                    <v-btn icon   @click="modalAdd = false">
                    <v-icon>close</v-icon>
                    </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-flex mx-5>
                       <v-card-text>
                           <v-form ref="form" data-vv-scope="dialogoagregar">  
                           <br>
                           <br>
    
                        <v-container grid-list-md text-xs-center>
                            <v-layout row wrap>
                            <v-flex class="espaciado" xs12 sm12 md6 lg6   >
                                
    
                                    <v-select name="tipo de indicio"   
                                                    :items="indiciostipo"
                                                    v-model="indiciotipo" 
                                                    v-validate="'required'" 
                                                    label="*Tipo:"
                                                    return-object
                                                    data-vv-scope="dialogoagregar"
                                                    :error-messages="errors.collect('dialogoagregar.tipo de indicio')">
                                    </v-select>
    
                                    <v-select name="forma de obtención"   
                                                    :items="statuss"
                                                    v-model="status" 
                                                    v-validate="'required'" 
                                                    label="*Forma de obtención:"
                                                    data-vv-scope="dialogoagregar"
                                                    :error-messages="errors.collect('dialogoagregar.forma de obtención')">
                                    </v-select>
                                    <v-text-field name="quien incia cadena de custodia" 
                                                    label="*Quien inicia cadena de custodia:" 
                                                    v-model="quieniniciacadenadecustodia"   
                                                    v-validate="'required'" 
                                                    data-vv-scope="dialogoagregar"
                                                    :error-messages="errors.collect('dialogoagregar.quien incia cadena de custodia')">
                                                    
                                    </v-text-field>
    
                                    <v-text-field name="matricula" 
                                        v-if="indiciotipo.text == 'Armas'"
                                        label="Matricula:" 
                                        v-model="matricula"
                                        v-validate="'required'"    
                                        :error-messages="errors.collect('matricula')">
                                    </v-text-field>
    
                                    <v-text-field name="modelo" 
                                        v-if="indiciotipo.text == 'Armas'"
                                        label="Modelo:" 
                                        v-model="modelo"  
                                        :error-messages="errors.collect('modelo')">
                                    </v-text-field>
    
    
                                 
                           </v-flex>
    
                           
    
                           <v-flex  class="espaciado" xs12 sm12 md6 lg6   >
                                    <v-select name="institucíon que inicia cadena de custodia"  
                                                    :items="instituciones"
                                                    v-model="institucion" 
                                                    v-validate="'required'" 
                                                    label="*Institución que inicia cadena de custodia:"
                                                    data-vv-scope="dialogoagregar"
                                                    :error-messages="errors.collect('dialogoagregar.institucíon que inicia cadena de custodia')">
                                    </v-select>
    
                                    <v-text-field name="nombre corporacion" 
                                                    label="*Nombre de la corporación:" 
                                                    v-model="corporacion"   
                                                    v-validate="'required'" 
                                                    data-vv-scope="dialogoagregar"
                                                    :error-messages="errors.collect('dialogoagregar.nombre corporacion')">
                                    </v-text-field>
    
                                    <v-text-field name="lugar de resguardo" 
                                                    label="*Lugar de resguardo:" 
                                                    v-model="ultimaubicacion"   
                                                    v-validate="'required'" 
                                                    data-vv-scope="dialogoagregar"
                                                    :error-messages="errors.collect('dialogoagregar.lugar de resguardo')">
                                    </v-text-field>
    
                                    <v-text-field 
                                        name="número de indicio" 
                                        label="*Número de indicio:" 
                                        v-model="etiqueta"   
                                        v-validate="'required'" 
                                        data-vv-scope="dialogoagregar"
                                        :error-messages="errors.collect('dialogoagregar.número de indicio')">
                                    </v-text-field>
    
                                    <v-text-field  name="calibre" 
                                        v-if="indiciotipo.text == 'Armas'"
                                        v-model="calibre"  
                                        label="Calibre:"
                                        :error-messages="errors.collect('calibre')">
                                    </v-text-field>
    
                                    <v-text-field 
                                        name="marca" 
                                        v-if="indiciotipo.text == 'Armas'"
                                        v-model="marca"  
                                        label="Marca:"
                                        :error-messages="errors.collect('marca')">
                                    </v-text-field>
                            
                           </v-flex>
                        
                            <v-flex xs12 sm12 md12 lg12>
                            <v-card elevation="0" >
                               <v-card-title class="accent" ><h3>Descripción</h3></v-card-title>
                               <v-divider ></v-divider>
                                    <v-card-text>
                                         <v-form   data-vv-scope="form1"> 
                                            <vue-editor  
                                                name="descripción" 
                                                 v-model="descripcion" 
                                                 outline  height=350px;
                                                 style="max-height: 310px; overflow-y: scroll" 
                                                 :editorToolbar="customToolbar"  >
                                             </vue-editor>
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
    
            <v-dialog  v-model="dialogoinfo"  max-width="1000px" >
    
                <v-card>
                    <v-toolbar card dark color="grey lighten-4 primary--text">
                        <v-avatar  size="30">
                            <v-icon class="grey lighten-2">info</v-icon>
                        </v-avatar>
                        
                        <v-toolbar-title class="subheading">Información completa</v-toolbar-title>
                        <v-spacer></v-spacer>                  
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" >
                            <v-container grid-list-md text-xs-center>
                                <v-layout wrap>
                                    <v-flex  class="espaciado" xs12 sm12 md12 lg12 >
                                        <v-card    auto-grow elevation="0">                                
                                            <v-card-text >
                                                <v-list one-line   > 
                                                    <p class="text-lg-center font-weight-bold"><a>Información del indicio</a></p> 
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">view_day</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Tipo:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ itipo }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">work</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Forma de obtención:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a> {{( istatus ? "Aportación" : "Localización o descubrimiento")}} </a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">local_convenience_store</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Quien inicia cadena de custodia:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ iquininicia }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">apartment</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Institución:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ iinstitucion }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
    
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">apartment</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Nombre de la corporación:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ icorporacion }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
    
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">room</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Ultima ubicación:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ iultimaubicacion }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
    
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">tab</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Número de indicio:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ ietiqueta }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                    <v-list-tile v-if="itipo == 'Armas'">  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">room</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Matricula:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ imatricula }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                    <v-list-tile v-if="itipo == 'Armas'">  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">dns</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Modelo:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ imodelo }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                    <v-list-tile v-if="itipo == 'Armas'">  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">drag_indicator</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Calibre:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ icalibre }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                    <v-list-tile v-if="itipo == 'Armas'">  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">dashboard</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Marca:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ imarca }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                    <v-list-tile >  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">view_headline</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Descripción:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular" v-html="idescripcion"><a>{{ idescripcion }}</a></p>  </v-list-tile-sub-title>  
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
                                <v-btn  @click.native="dialogoinfo=false" >Cerrar</v-btn>                                   
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
      import VeeValidate from 'vee-validate' 
      import { WebCam } from "vue-web-cam";
      import { VueEditor } from "vue2-editor";
      import { error } from 'util';
      import n401 from './401.vue'
      import n403 from './403.vue'
      import moment from 'moment'
      import 'moment/locale/es'; 
    
      var assert, curp, persona;
      assert = require('assert');
      curp = require('curp.js');  
    
      export default {
        components: {
            
            "vue2-editor": VueEditor,
            n401,
            n403
        },
        data: () => ({
            alert:false,
            dialog: false, 
            clikeado: false,
            rAtencionId:'',
            rHechoId:'', 
            nuc:'',
            showpage:true,
            e401:false,
            e403:false,
            //*************** */
            indicios:[],
            indiciostipo:[],
            indiciotipo:'',
            instituciones:[],
            institucion:'',
            quieniniciacadenadecustodia:'',
            corporacion:'',
            ultimaubicacion:'',
            descripcion:'',
            idindicio:'',
            personas:[],
            statuss:[
                 { text: 'Aportación', value: 'Aportación' }, 
                 { text: 'Localización', value: 'Localización' }, 
                 { text: 'Descubrimiento', value: 'Descubrimiento' }, ],
            status:'',
            origenlugar:'',
            origendestino:'',
            quienentrega:'',
            quienrecibe:'',
            origenlugard:'',
            origendestinod:'',
            quienentregad:'',
            quienrecibed:'',
            fechaactual: ((new Date().getDate())+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear()), 
            fechahora: new Date(),
            detallesindicios:[],
            detallesindicio:'',
            calibre:'',
            marca:'',
            matricula:'',
            modelo:'',
            marcas:[],
            calibres:[],
            headersd: [
    
                { text: 'Fecha', value: 'fechaHora' }, 
                { text: 'Origen Lugar', value: 'origenLugar' }, 
                { text: 'Destino Lugar', value: 'destinoLugar' }, 
                { text: 'Quien Entrega', value: 'quienEntrega', sortable: false }, 
                { text: 'Quien Recibe', value: 'quienRecibe', sortable: false },
                                                
            ],
            detalleslist:[],
            searchd:'',
            dialogoinfo:false,
            itipo:'',
            istatus:'',
            iquininicia:'',
            iinstitucion:'',
            iultimaubicacion:'',
            icorporacion:'',
            imatricula:'',
            ietiqueta:'',
            imodelo:'',
            icalibre:'',
            imarca:'',
            idescripcion:'',
            etiqueta:'',
            //*************** */
            headers: [
    
                { text: 'Usuario', value: 'usuario', sortable: true  }, 
                { text: 'Módulo', value: 'modulo', sortable: true  }, 
                { text: 'Tipo', value: 'tipoindicio' }, 
                { text: 'Status',value: 'status' }, 
                { text: 'Quien inicia', value: 'qIniciaCadena' }, 
                { text: 'Institución', value: 'institucionQI', sortable: false }, 
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
            modalAdd:false,
            //********************************/
            
    
            rac:'',
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
        }),
           
        created () {
            let me = this 
                me.rHechoId =  me.$store.state.rhechoid;
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
                    me.listarInstituciones();
                    me.listarIndicio();
                    me.listar();
                    
                   
                    
            }
          
          
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
                    return this.editedIndex === -1 ? 'Nuevo Detalle' : 'Detalles'
                },
                  formIcon () {
                    return this.editedIndex === -1 ? 'add' : 'assignment'
                }
        },
        watch: {
            
        },
        methods:{ 
            doSomething: function() {
                if(this.clikeado) {                    
                    this.clikeado = false;
                }
                this.clikeado = true;
            },
            addItem (item) {
                    this.idindicio = item.idIndicio;
                    this.editedIndex = -1;
                    this.dialog = true
            },
            listItem (item) {
                    let me = this ;
                    this.idindicio = item.idIndicio;
                    this.editedIndex = 1;
                    this.dialog = true
                    me.listarDetalles();
            },
           cerrarcarpeta () {
                    this.$store.state.rhechoid = null;
                    this.$store.state.nuc= null;
                    this.$router.push('./umixta-carpetas')
                },
            generarfecha(){
                var fecha;
                fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY")+ ", "+ moment().format('h:mm:ss a');
                return fecha;      
            },       
            agregar(){
                this.limpiar();
                this.modalAdd= true;
            },
            close () {
                    this.dialog = false;
                    this.limpiar();
                },
             
            limpiar(){    
                
                this.indiciotipo ="";
                this.status="";
                this.quieniniciacadenadecustodia="";
                this.institucion="";
                this.corporacion="";
                this.ultimaubicacion="";
                this.descripcion="";
                this.origenlugar="";
                this.origendestino="";
                this.quienrecibe="";
                this.quienentrega="";
                this.calibre='';
                this.marca ='';
                this.modelo = '';
                this.matricula = '';
                this.etiqueta = '';
                this.listar();
            },
            obtenermes: function(mes){
                if(mes==0) return "Enero"
                if(mes==1) return "Febrero"
                if(mes==2) return "Marzo"
                if(mes==3) return "Abril"
                if(mes==4) return "Mayo"
                if(mes==5) return "Junio"
                if(mes==6) return "Julio"
                if(mes==7) return "Agosto"
                if(mes==8) return "Septiembre"
                if(mes==9) return "Octubre"
                if(mes==10) return "Noviembre"
                if(mes==11) return "Diciembre"
            },
            informacioncompleta(item){
                let me = this;
                me.dialogoinfo = true
                me.itipo = item.tipoIndicio           
                me.idescripcion = item.descripcion
                me.istatus = item.status
                me.iquininicia = item.qIniciaCadena
                me.iinstitucion = item.institucionQI
                me.icorporacion = item.corporacion
                me.iultimaubicacion = item.ultimaUbicacion
                me.ietiqueta = item.etiqueta
                me.imatricula = item.matricula
                me.icalibre = item.calibre
                me.imodelo = item.modelo
                me.imarca = item.marca
                
            },
            listar(){
              let me=this;  
              let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                    this.$cat.get('api/Indicios/Listar/'+ me.rHechoId,configuracion).then(function(response){
                        //console.log(response);
                        me.indicios=response.data;
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
            listarIndicio(){
                var indiciosarray = [];
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                
                me.$conf.get('api/TipoIndicios/Listar',configuracion).then(function(response){
                     indiciosarray = response.data;
                     indiciosarray.map(function(x){
                            me.indiciostipo.push({text: x.nombre,value: x.idtipoindicio});
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
            listarInstituciones(){ 
    
                var institucionesarray = [];
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.$conf.get('api/Instituciones/Listar',configuracion).then(function(response){
                    institucionesarray = response.data;
                     institucionesarray.map(function(x){
                            me.instituciones.push({text: x.nombre,value: x.idinstitucion});
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
            listarDetalles(){
                
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$cat.get('api/Indicios/ListarD/'+me.idindicio,configuracion).then(function(response){
                      
                     me.detalleslist = response.data;
                    
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
            guardar(){ 
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var descripcionRegTabI = 'Registro de indicio de ' + me.indiciotipo.text;
              
                    this.$cat.post('api/Indicios/Crear',{
                        'hechoId': me.rHechoId, 
                        'tipoIndicio':me.indiciotipo.text,
                        'descripcion': me.descripcion,
                        'status': me.status,
                        'qIniciaCadena': me.quieniniciacadenadecustodia,
                        'institucionQI': me.institucion,
                        'corporacion': me.corporacion,
                        'ultimaUbicacion': me.ultimaubicacion,
                        'distrito': me.u_distrito,
                        'subproc': me.u_dirSubPro,
                        'agencia': me.u_agencia,
                        'puesto': me.u_puesto,
                        'usuario': me.u_nombre,
                        'modulo': me.u_modulo,
                        'matricula': me.matricula,
                        'modelo': me.modelo,
                        'marca':me.marca,
                        'calibre': me.calibre,
                        'etiqueta': me.etiqueta
    
                    },configuracion).then(function(response){  
                        me.$notify('La información se guardo correctamente !!!','success')   
                        me.modalAdd=false;
                        me.crearRegistroTableroI(descripcionRegTabI);      
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
                                            me.$notify('Error al intentar crear el  registro!!!','error')  
                                        } 
                                    });
                                    this.doSomething()
        
          
              
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
            guardardetalle(){
              this.$validator.validateAll('dialogodetalle').then(result => {
                        if (result) {
                            if (this.editedIndex < 0) {
                                //Código para guardar 
                                let me=this;
                                let header={"Authorization" : "Bearer " + this.$store.state.token};
                                let configuracion= {headers : header};
                                this.$cat.post('api/Indicios/CrearDetalle',{
                                    'IndiciosId' : me.idindicio,
                                    'Fechasys' : me.generarfecha(),
                                    'OrigenLugar': me.origenlugar,
                                    'DestinoLugar':me.origendestino,
                                    'Quienentrega':me.quienentrega,
                                    'Quienrecibe': me.quienrecibe
                 
                                },configuracion).then(function(response){
                                    me.close();
                                    me.$notify('La información se guardo correctamente !!!','success')  
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
                                            me.$notify('Error al intentar crear el  registro!!!','error')  
                                        } 
                                    }); 
                            } else {
                                //Código para guardar
                                this.doSomething()
                                var indiciosarray = [];
                                    let me=this; 
                                    me.$conf.get('api/TipoIndicios/Listar',configuracion).then(function(response){
                                    indiciosarray = response.data;
                                    indiciosarray.map(function(x){
                                    me.indiciostipo.push({text: x.nombre,value: x.idtipoindicio});
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
                    })
                
                       
    
            },
          } 
       }
    </script>
    <style>
    .espaciado{
        padding: 30px !important; 
    }
    
    </style>