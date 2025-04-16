<template>
    <v-layout  align-start> 

        <v-navigation-drawer v-model="drawer" app v-if="logueado" class="primary"  >
        <div class="text-xl-center text-md-center text-xs-center my-4">
            <img src="@/assets/Logo.png" height="110px" alt=""> 
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
                <v-toolbar-title class="font-weight-regular" >Información general.</v-toolbar-title>
                
                <v-divider class="mx-2" inset vertical></v-divider>
                    
                <v-spacer></v-spacer>
                    <v-flex xs12 sm6 md3>
                    
                    <v-text-field class="font-weight-regular"
                        v-model="nuc" disabled     prepend-icon="folder"
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
                            <v-btn class="mx-2" slot="activator" v-on="on"    @click="activardialogostatus()" fab dark small color="success">
                                <v-icon dark>update</v-icon>
                            </v-btn>
                        </template>
                        <span>Actualizar status y etapa de la carpeta</span>
                    </v-tooltip>       
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }"> 
                            <v-btn class="mx-2" slot="activator" v-on="on"    @click="verhistorial()" fab dark small color="success">
                                <v-icon dark>chrome_reader_mode</v-icon>
                            </v-btn>
                        </template>
                        <span>Ver historial de la carpeta</span>
                    </v-tooltip>                  
            </v-toolbar>

            <v-container grid-list-md >
                <v-layout row wrap>  
                    <v-flex xs6 sm6 md6 lg6>
              
                        <v-card v-if="rHechoId"> 
                            <v-card-title class="accent" ><h3>Información general</h3></v-card-title>
                            <v-card-text>
                                <v-container grid-list-md >
                                    <v-layout row wrap>  
                                        <v-flex xs6 sm6 md6 lg6>
                                            <table>
                                                <tr>
                                                    <td style="width:180px"> Victima y/u ofendido: </td>
                                                    <td><b> {{nombre}}</b></td> 
                                                </tr>
                                                <tr>
                                                    <td>Tipo de victima:</td>
                                                    <td><b> {{ tvictima}}</b></td>
                                                </tr>
                                                    <tr>
                                                    <td>Tipo de persona:</td>
                                                    <td><b>{{tipopersona}} </b></td>
                                                </tr>
                                                    <tr>
                                                    <td>CURP</td>
                                                    <td><b>{{curp}} </b></td>
                                                </tr>
                                                <tr>
                                                    <td>Medio de notificación:</td>
                                                    <td><b>{{medionotificacion}} </b></td>
                                                </tr>
                                                    <tr>
                                                    <td>Teléfonos:</td>
                                                    <td><b> {{tel}}</b></td>
                                                </tr>
                                                    <tr>
                                                    <td>Correo:</td>
                                                    <td><b>{{email}} </b></td>
                                                </tr>
                                                    <tr>
                                                    <td>Dirección:</td>
                                                    <td><b>{{direccion}} </b></td>
                                                </tr>
                                                    <br>
                                            </table>
                                        </v-flex>
                                        <v-flex xs6 sm6 md6 lg6>
                                            <table>
                                                <tr>
                                                    <td style="width:180px">Nacionalidad:</td>
                                                    <td><b> {{ nacionalidad }}</b></td>
                                                </tr>
                                                    <tr>
                                                    <td>Estado familiar:</td>
                                                    <td><b> {{estadocivil}}</b></td>
                                                </tr>
                                                <tr>
                                                    <td > Género: </td>
                                                    <td><b> {{genero}}</b></td> 
                                                </tr>
                                                <tr>
                                                    <td>Ocupación:</td>
                                                    <td><b> {{ocupacion}}</b></td>
                                                </tr>
                                                    <tr>
                                                    <td>Nivel de estudios:</td>
                                                    <td><b>{{nivelestudio}} </b></td>
                                                </tr>
                                                    <tr>
                                                    <td>Lengüa</td>
                                                    <td><b> {{lengua}}</b></td>
                                                </tr>
                                                <tr>
                                                    <td>Religión:</td>
                                                    <td><b> {{religion }}</b></td>
                                                </tr>
                                                    <tr>
                                                    <td>Discapacidad:</td>
                                                    <td><b>{{tipodiscapacidad}} </b></td>
                                                </tr>
                                                    
                                                    <br>
                                            </table>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                                
                            </v-card-text>
                        </v-card>
                    </v-flex>

                    <v-flex xs6 sm6 md6 lg6>
                    
                        <v-card v-if="rHechoId" >
                            <v-card-title  class="accent"><h3>Información complementaria</h3></v-card-title>
                            <v-card-text>
                                <table>
                                    <tr>
                                        <td style="width:180px">Atendido por:</td>
                                        <td><b> {{ registradopor }}</b></td>
                                    </tr>
                                        <tr>
                                        <td>Distrito de origen:</td>
                                        <td><b> {{ distritoinicial}}</b></td>
                                    </tr>
                                    <tr>
                                        <td > Dirección o subprocuraduria: </td>
                                        <td><b> {{ dirsubprocuinicial}}</b></td> 
                                    </tr>
                                    <tr>
                                        <td>Agencia origen:</td>
                                        <td><b> {{ agenciainicial}}</b></td>
                                    </tr>
                                </table>
                                        <v-divider class="mx-0" inset horizontal></v-divider>
                                <table>

                                    <tr>
                                        <td>Etapa:</td>
                                        <td><b> {{ etapacarpeta}}</b></td>
                                    </tr>

                                    <tr>
                                        <td>Estatus:</td>
                                        <td><b> {{ statuscarpeta}}</b></td>
                                    </tr>
                                        
                                    <tr>                                        
                                        <td style="width:180px">Fecha del registro del NUC:</td>
                                        <td style="color:#78BE20" ><b ><v-icon >access_time</v-icon> {{ fechaelevanuc.substring(8,10) +" de "+ obtenermes(fechaelevanuc.substring(5,7)-1)+" del "+fechaelevanuc.substring(0,4)+", "+fechaelevanuc.substring(11,19)  }} </b></td>
                                    </tr>
                                    
                                    <tr>
                                        <td>Fecha y hora del suceso:</td>
                                        <td style="color:#78BE20" >
                                            <div v-if="fechasuceso !=null">
                                                <b><v-icon  >access_time</v-icon> {{ fechasuceso.substring(8,10) +" de "+ obtenermes(fechasuceso.substring(5,7)-1)+" del "+fechasuceso.substring(0,4)+", "+fechasuceso.substring(11,19)   }} </b>
                                            </div>
                                            <div v-else>
                                                <b><v-icon  >access_time</v-icon> {{ fechasuceso}} </b>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Dirección principal del suceso:</td>
                                        <td>                                          
                                            <b>                                        
                                                {{   direccionsuceso }} 
                                            </b>
                                        </td>
                                    </tr>
                                        <br>
                                </table>
                                
                            </v-card-text>
                        </v-card>                   
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>

        <v-dialog  v-model="dialostatus"  max-width="1000px" >
                    
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">update</v-icon>
                    </v-avatar>                  
            
                    <v-toolbar-title class="subheading">Actualizar status y etapa de la carpeta</v-toolbar-title>
                    <v-spacer></v-spacer>
            
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form">                          
                        <v-container grid-list-md text-xs-center>
                            <v-layout row wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-list one-line   > 
                                        <v-list-tile>  
                                            <v-list-tile-action>
                                                <v-icon color="success">view_day</v-icon>
                                            </v-list-tile-action> 
                                            <v-list-tile-content   >  
                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Etapa actual:</a></p> </v-list-tile-title> 
                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a> {{etapacarpeta}} </a></p>  </v-list-tile-sub-title>  
                                            </v-list-tile-content> 
                                        </v-list-tile>
                                        
                                        <v-list-tile>  
                                            <v-list-tile-action>
                                                <v-icon color="success">view_day</v-icon>
                                            </v-list-tile-action> 
                                            <v-list-tile-content   >  
                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Status actual:</a></p> </v-list-tile-title> 
                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a> {{statuscarpeta}} </a></p>  </v-list-tile-sub-title>  
                                            </v-list-tile-content> 
                                        </v-list-tile>
                                    </v-list>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-autocomplete name="etapa"   
                                        :items="etapas"
                                        v-model="etapa" 
                                        label="Etapa:">
                                    </v-autocomplete>
                                    <v-autocomplete name="status"   
                                        :items="statuses"
                                        v-model="status" 
                                        label="Status:" >
                                    </v-autocomplete>

                                    <v-menu
                                        ref="menu1"
                                        v-model="menu1"
                                        :close-on-content-click="false"
                                        :return-value.sync="fechahistorial"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                        <v-text-field
                                                    name='fecha de actualización'
                                                    :value="fechah"
                                                    label="*Fecha de actualización:"
                                                    prepend-icon="event"
                                                    clearable 
                                                    readonly
                                                    v-on="on"
                                                    v-validate="'required'"                                   
                                                    :error-messages="errors.collect('fecha de actualización')">
                                        ></v-text-field>
                                        </template>
                                            <v-date-picker  locale="es" v-model="fechahistorial" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                            </v-date-picker>
                                    </v-menu>
                                </v-flex>
                    
                            </v-layout>
                        </v-container>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click="dialostatus = false" >Cancelar</v-btn>
                            <v-btn  @click="actualizarstatuscar()" class="success" >Guardar</v-btn>
                            
                        </v-card-actions> 
                    </v-form>
            
                </v-card-text> 
            </v-card>
        </v-dialog>

        <v-dialog  v-model="dialogohistorial"  max-width="1300px" >

            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">info</v-icon>
                    </v-avatar>
                    
                    <v-toolbar-title class="subheading">Historial</v-toolbar-title>
                    <v-spacer></v-spacer>                  
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" data-vv-scope="Aceptar" >
                        <v-container grid-list-md text-xs-center>
                            <v-layout wrap>

                                <v-flex  class="espaciado" xs12 sm12 md12 lg12>

                                        <v-data-table
                                            :headers="headers2"
                                            :items="historialc"
                                            :search="search2" 
                                            :rows-per-page-items="rowsPerPageItems"
                                            :pagination.sync="pagination"
                                            >
                                            
                                            <template slot="items" class="white" slot-scope="props">
                                                
                                                <td>{{ props.item.uAgencia}}</td>
                                                <td>{{ props.item.uModulo }}</td>                                               
                                                <td>{{ props.item.detalle }}</td>                
                                                <td>{{ props.item.fechasys.substring(8,10) +" de "+ obtenermes(props.item.fechasys.substring(5,7)-1)+" del "+props.item.fechasys.substring(0,4)}}</td>           
                            
                                            </template>
                                            
                                    </v-data-table>

                                        
                                </v-flex>    

                            </v-layout>
                        </v-container>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click.native="dialogohistorial=false" >Cerrar</v-btn>                                  
                        </v-card-actions> 
                    </v-form>
                
                </v-card-text> 
            </v-card>

        </v-dialog>

    </v-layout>
</template>
<script>
    import axios from 'axios'  
    import jsPDF from 'jspdf'
    import html2canvas from 'html2canvas'
    import VeeValidate from 'vee-validate' 
    import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
    import { debug } from 'util';
    import moment from 'moment'
    import 'moment/locale/es';
    import alertify from 'alertifyjs';
    import { VueEditor } from "vue2-editor";
    import n401 from './401.vue'
    import n403 from './403.vue' 
    import { error } from 'util';

   
    export default {
        data(){
            return {   
                components: {  
                    n401,
                    n403
                }, 
                showpage:true,
                e401:false,
                e403:false,
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
                rAtencionId:'', 
                rHechoId:'', 
                agenciaid:'',
                nuc:'',
                rac:'',
                //*************** */
                dia:"",
                mes:"",
                año:"",
                hr:"", 
                //*************** */
                //CARATULA DEL NUC 
                modal_CaratulaNUC:false,
                registradopor:'',
                puestoquienregistro:'',
                modulodondefueatendido:'',
                distritoinicial:'',
                dirsubprocuinicial:'',
                agenciainicial:'',
                agenciaid:'',
                fechahistorial:'',
                fechah:'',
                menu1:false,
                //*************** */
                // ENTREVISTA DE LA VICITMA
                modal_EntrevistaVictima:false, 
                fechasuceso:'',
                idDDelito:'',
                direccionsuceso:'',
                fechaelevanuc:'',
                rBreve:'',
                narrativaHechos:'',
                rnh1:false,  
                fechaEntrevista:'',
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
                vanabim2:'',
                aux2:[],
                dialogohistorial : false,
                historialc:[],
                headers2: [

                    { text: 'Agencia', value: 'uAgencia' },
                    { text: 'Modulo', value: 'uModulo' },          
                    { text: 'Acción', value: 'detalle', sortable: false },  
                    { text: 'Fecha', value: 'fechasys', sortable: false },                          
                ],
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 20
                },
                search2:'',
                //*********************** */
                // LECTURA DE DERECHOS
                modal_LecturaDerechosVictima:false,
                //-------Logos-----------------------------------------/
                logo1:'',
                logo2:'',
                //-----CLAIM------------------------------------------
                u_iddistrito:this.$store.state.usuario.iddistrito,
                u_distrito:this.$store.state.usuario.distrito,
                u_dirSubPro:this.$store.state.usuario.dirSubProc,
                u_idagencia:this.$store.state.usuario.idagencia,
                u_agencia:this.$store.state.usuario.agencia,
                u_idmoduloservicio:this.$store.state.usuario.idmoduloservicio,
                u_modulo:this.$store.state.usuario.modulo,
                u_idusuario:this.$store.state.usuario.idusuario,
                u_nombre:this.$store.state.usuario.usuario,
                u_clave:this.$store.state.usuario.clave,
                u_rol:this.$store.state.usuario.rol,
                u_puesto:this.$store.state.usuario.puesto,
                u_subproc:this.$store.state.usuario.subProc, 
                //----------------------------------------------------
                //*************** */
                personaId: 0, 
                curp:'',
                nombre:'',
                alias:'',
                tel:'',
                email:'',
                tipopersona:'',
                tvictima:'',
                medionotificacion:'',
                sexo:'',
                genero:'',
                fnacimiento:'',
                edad:'',
                estadocivil:'',
                nacionalidad:'',
                ocupacion:'',
                lengua:'',
                religion:'',
                nivelestudio:'',
                tipodiscapacidad:'',
                parentesco:'',
                direccion:'',
                vanabim:'',
                vanabim:'',
                dialogvanabim:false,
                //********************************************
                lat2:'',
                lng2:'',
                center2: { lat: 45.508, lng: -73.587},
                markers2: [],
                places2: [],
                currentPlace2: null, 
                geoloc2:0,
                modalGeolocalizacion2:0,
                de_lat2:'',
                de_lng2:'',
                opcionesmapa:{
                    zoomControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                    disableDefaultUi: false,
                    noClear:false,
                    panControl:false,
                    disableDefaultUI:false,
                    disableDoubleClickZoom:false,
                    draggable:false,
                    keyboardShortcuts:false,
                    mapTypeControl:false,
                    noClear:false,
                    panControl:false,
                    rotateControl:false,
                    scrollwheel:false,
                    streetViewControl:false,
                    clickableIcons:false,
                    mapTypeId: 'roadmap',                                
                },
                zoom:17,
                modaldocumento:false,
                //*************** */
                modalFHS :0,
                fecha: new Date().toISOString().substr(0, 10),
                hora: null,
                modalDS:0,
                // DIRECCION PERSONAL
                calle:'',
                noExt:'',
                noInt:'',
                entreCalle1:'',
                entreCalle2:'',
                referencia:'',
                pais:'Mexico',

                estado:'',
                estadoid:'',
                ciudades:[],

                municipio:'',
                municipioid:'',
                municipios:[],

                
                localidad:'',
                localidadid:'',
                localidades:[],

                cp:'', 
                modalGeolocalizacion:0,
                center: { lat: 45.508, lng: -73.587 },
                markers: [],
                places: [],
                currentPlace: null, 
                lat:'',
                lng:'',
                lugarespecifico:'',
                lugaresespecificos:['Vehiculo', 'Casa', 'Calle', 'Carretera', 'Terreno baldio','Estacionamiento','Local comercial','Oficina','Otro'],
                idNuc:'',
                statuses:[],
                status:'',
                dialostatus:false,
                statuscarpeta:'',
                etapacarpeta:'',
                iniciales:'',
                directorPI:'',
                etapas:[
                    {text:"INVESTIGACIÓN INICIAL", value:"INVESTIGACIÓN INICIAL"},
                    {text:"INVESTIGACIÓN COMPLEMENTARIA", value:"INVESTIGACIÓN COMPLEMENTARIA"},
                    {text:"ETAPA INTERMEDIA", value:"ETAPA INTERMEDIA"},
                    {text:"ETAPA DE JUICIO ORAL", value:"ETAPA DE JUICIO ORAL"},
                ],
                etapa:'',
                //******************************** */
                lataux:'',
                lngaux:'',
                //******************************** */
                editedIndex:0,
                 
            }
        },
        computed: {
            text_Toltip(){
                return this.rnh1 === false ?  'Guardar entrevista' : 'Imprimir entrevista'
            },
            btn_SI () {
                return this.rnh1 === false ?  'save' : 'print'
            },
            text_Modal(){
                 return this.rnh1 === false ?  'Guardar e imprimir' : 'Imprimir'
            },
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
                return this.$store.drawer 
            }
        },

        watch: {
          
        },

        created () {
            let me = this 
            me.rHechoId =  me.$store.state.rhechoid;
            me.nuc = me.$store.state.nuc;
            if (me.rHechoId== null)
            {
                    me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpetas y luego en Lista de carpetas asignadas y  ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.', 
                    function(){ 

                            me.$router.push('./mcaptura-listacarpetas')
                    })
            }
            else{
                    me.$notify('Carpeta abierta correctamente !!!','success')
            }
            me.listarrHecho();
            me.listarStatuscarpeta();
           
        },
        methods:{
            cerrarcarpeta () {
                this.$store.state.rhechoid = null;
                this.$store.state.nuc= null;
                this.$router.push('./listacarpetas')
            },
            listarrHecho(){
               
                let me=this;   
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.get('api/RHechoes/ListarPorId/' +me.rHechoId,configuracion).then(function(response){  
                    console.log(response.data);

                    me.aux2 = response.data
                    me.rAtencionId= response.data.rAtencionId,
                    me.rHechoId= response.data.rHechoId,
                    me.agenciaid = response.data.agenciaid,
                    
                    me.registradopor= response.data.u_Nombre,
                    me.puestoquienregistro = response.data.u_Puesto,
                    me.modulodondefueatendido = response.data.u_Modulo,

                    me.distritoinicial = response.data.distritoInicial,
                    me.dirsubprocuinicial = response.data.dirSubProcuInicial,
                    me.agenciainicial = response.data.agenciaInicial,
                    me.fechaelevanuc = response.data.fechaElevaNuc,
                    me.fechasuceso = response.data.fechaHoraSuceso, 
                    me.rBreve = response.data.rBreve,
                    me.narrativaHechos = response.data.narrativaHechos,
                    me.vanabim2 = response.data.vanabim
                    me.vanabim = response.data.vanabim
                    me.idNuc = response.data.nucId
                    me.statuscarpeta = response.data.statuscarpeta
                    me.etapacarpeta = response.data.etapacarpeta
                    me.listarrap();
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
            listarStatuscarpeta(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var statusArray=[];
                me.$conf.get('api/StatusNUCs/ListarT',configuracion).then(function(response){
                    //console.log(response.data)
                    statusArray=response.data;               
                    statusArray.map(function(x){
                        me.statuses.push({text: x.nombreStatus,value:x.nombreStatus});
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
            listarrap(){ 
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
               
                
                axios.get('api/RAPs/Listar/' +me.rAtencionId,configuracion).then(function(response){  

                    me.rac= response.data.rac;
                    me.personaId = response.data.personaId;
                    me.curp = response.data.curp;
                    me.nombre = response.data.nombre + " " + response.data.apellidoPaterno + " " + response.data.apellidoMaterno;
                    me.alias=response.data.alias;
                    me.tel = response.data.telefono1 + " , " + response.data.telefono2;
                    me.email = response.data.correo; 
                    me.rac= response.data.rac;
                    me.fhreg = response.data.fechaHoraInicio;
                    me.tvictima = response.data.clasificacionPersona;
                    me.tipopersona= response.data.tipoPersona;
                    me.sexo= response.data.sexo;
                    me.genero= response.data.genero;
                    me.fnacimiento= response.data.fechaNacimiento; 
                    me.estadocivil = response.data.estadoCivil; 
                    me.medionotificacion= response.data.medionotificacion;
                    me.nacionalidad= response.data.nacionalidad;
                    me.ocupacion= response.data.ocupacion;
                    me.lengua= response.data.lengua;
                    me.religion= response.data.religion;
                    me.tipodiscapacidad= response.data.tipoDiscapacidad;
                    me.parentesco=response.data.parentesco;
                    me.nivelestudio= response.data.nivelEstudio;
                    me.docIdentificacion= response.data.docIdentificacion;
                    me.edad = response.data.edad
                    var iniciales = response.data.alias
                    me.iniciales = iniciales
                    me.listardireccionpersona();                 
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
                me.listardireccionhecho();         
            },           
            listardireccionpersona(){ 
                let me=this;   
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.get('api/RAPs/ListarDP/' +me.personaId,configuracion).then(function(response){  
                    
                    me.direccion = response.data.calle + " " +response.data.noint + " " +response.data.noext   + " " + response.data.localidad + " " +response.data.municipio + " " +response.data.estado + " " +response.data.pais + " " +response.data.cp
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
            listardireccionhecho(){
                let me=this;   
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.get('api/DireccionDelitoes/ListarPoridHecho/' +me.rHechoId,configuracion).then(function(response){  

                    me.direccionsuceso =  response.data.localidad + " " +response.data.municipio + " " +response.data.estado + " " +response.data.pais 

                    me.estado= response.data.estado;
                    me.municipio = response.data.municipio;
                    me.localidad = response.data.localidad;
                  
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
            limpiar(){

                this.calle="";
                this.noInt="";
                this.noExt="";
                this.entreCalle1="";
                this.entreCalle2="";
                this.referencia="";
                this.pais="Mexico";
                this.estadoid="";
                this.municipioid="";
                this.localidadid=""; 
                this.cp="";
                this.fechahistorial = ""
                this.fechah = ""

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
            activardialogostatus(){
                
                this.etapa = this.etapacarpeta
                this.status = this.statuscarpeta
                this.dialostatus = true;
            },
            actualizarstatuscar(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.put('api/Nucs/Actualizar',{

                    'idNuc': me.idNuc,
                    'statusNUC': me.status,
                    "Etapanuc": me.etapa

                
                },configuracion).then(function(){   
                    me.$notify('La información se actualizo correctamente !!!','success') 

                    axios.post('api/Historialcarpeta/CrearModuloCaptura',{  

                        'RHechoId': me.rHechoId,
                        'Detalle':  me.status,
                        'DetalleEtapa': me.etapa, 
                        'UDistrito' : me.u_distrito,  
                        'USubproc': me.u_dirSubPro,
                        'UAgencia': me.u_agencia,
                        'Usuario': me.u_nombre,
                        'UPuesto': me.u_puesto,
                        'UModulo': me.u_modulo,
                        'Fechasys' : me.fechahistorial

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

                    me.dialostatus = false;
                    me.fechah = ""
                    me.fechahistorial = ""
                    me.listarrHecho();
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

            }, 
            fechainif(){
                if(this.menu1){
                    this.generarfecha2();
                    this.$refs.menu1.save(this.fechahistorial);
                }      
            },
            generarfecha2(){           
                if(this.menu1) 
                    this.fechah =this.fechahistorial.substring(8,10) +" de "+ this.obtenermes(this.fechahistorial.substring(5,7)-1)+
                    " del "+ this.fechahistorial.substring(0,4);                  
            },  
            verhistorial(){

                let me=this;  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.get('api/Historialcarpeta/Listar/' + me.rHechoId,configuracion).then(function(response){
                    me.historialc=response.data;
                    me.dialogohistorial = true
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
           
    }        
}
</script>
 
 