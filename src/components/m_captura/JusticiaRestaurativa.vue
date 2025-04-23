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

            <v-toolbar-title class="font-weight-regular" >Justicia restaurativa</v-toolbar-title>
            
            <v-divider class="mx-2" inset vertical></v-divider>
            
            <v-spacer></v-spacer>
            <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
            <v-flex xs12 sm6 md3>
            
                <v-text-field 
                    class="font-weight-regular"
                    v-model="nuc" disabled  
                    prepend-icon="folder"
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
                               
        </v-toolbar>

        <v-data-table
            :headers="headers"
            :items="registros"
            :search="search" 
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination">
                
            <template slot="items" class="white" slot-scope="props">
                
                <td>{{ props.item.noExpediente}}</td>   
                <td>{{ props.item.statusConclusion}}</td>                    
                <td>{{ props.item.delitos}}</td>   
                <td>{{ props.item.solicitantes}}</td>
                <td>{{ props.item.requeridos}}</td>                   
                <td class="justify-center layout px-0">      
                    <v-tooltip bottom   >
                        <template v-slot:activator="{ on }">
                            <v-icon 
                                class="mr-2" v-on="on"
                                @click="verinfo(props.item)"
                                >
                                sticky_note_2
                            </v-icon> 
                        </template>
                        <span>Ver información completa</span>
                    </v-tooltip>    
                </td>       
                
            </template>
            <template slot="no-data">
                <v-btn @click="listar()" color="primary"  >Resetear</v-btn>
            </template>              
        </v-data-table>


        <v-dialog v-model="modalAdd" fullscreen hide-overlay transition="dialog-bottom-transition">
        
            <v-card>

                <v-toolbar dark color="primary">
                
                    <v-toolbar-title>Nuevo oficio.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                
                        <v-btn   @click ="guardar()" color="success" >Guardar</v-btn>
                        
                        <v-btn icon   @click="modalAdd = false">
                            <v-icon>close</v-icon>
                        </v-btn>

                    </v-toolbar-items>
                </v-toolbar>

                    <v-card-text>
                        <v-form >                             
                            <v-container grid-list-md >
                                <v-layout row wrap>      

                                    <v-flex class="espaciado" xs12 sm12 md6 lg6 > 
                                        <v-autocomplete
                                            name="delito"
                                            :items="delitos"
                                            v-model="delito"
                                            label="*Delito:"
                                            v-validate="'required'" 
                                            return-object
                                            attach
                                            chips
                                            deletable-chips
                                            multiple
                                            :error-messages="errors.collect('delito')"
                                        ></v-autocomplete>  

                                         <v-autocomplete
                                            name="requerido"
                                            :items="requeridos"
                                            v-model="requerido"
                                            label="*Requerido:"
                                            v-validate="'required'" 
                                            response-data
                                            attach
                                            chips
                                            deletable-chips
                                            multiple
                                            return-object
                                            :append-outer-icon="'Intercambiar requerido-solicitantes' ? 'sync_alt' : 'sync_alt'"
                                            @click:append-outer="intercambiarsolire()"
                                            :error-messages="errors.collect('requerido')"
                                        ></v-autocomplete>  
                                        
                                        


                                    </v-flex>

                                    <v-flex class="espaciado" xs12 sm12 md6 lg6 > 
                                        
                                        <v-text-field
                                            name="número de expediente asignado a la NUC"
                                            v-model="noexpediente"
                                            label="*Número de expediente asignado a la NUC:"
                                            v-validate="'required'" 
                                            hint="PREFIJO / #### - AÑO / DISTRITO"
                                            :error-messages="errors.collect('número de expediente asignado a la NUC')"
                                        ></v-text-field>  
                                       

                                        <v-autocomplete
                                            name="solicitante"
                                            :items="solicitantes"
                                            v-model="solicitante"
                                            label="*Solicitante:"
                                            v-validate="'required'" 
                                            response-data
                                            attach
                                            chips
                                            deletable-chips
                                            multiple
                                            return-object
                                            :append-outer-icon="'Intercambiar requerido-solicitantes' ? 'sync_alt' : 'sync_alt'"
                                            @click:append-outer="intercambiarsolire()"
                                            :error-messages="errors.collect('solicitante')"
                                        ></v-autocomplete>  


                                    </v-flex>

                                    <v-flex class="espaciado" xs12 sm12 md12 lg12 > 

                                        <v-autocomplete
                                            name="estatus"
                                            :items="statuses"
                                            v-model="status"
                                            label="*Estatus:"
                                            v-validate="'required'" 
                                            :error-messages="errors.collect('estatus')"
                                        ></v-autocomplete>  

                                    </v-flex>

                                    <v-flex class="espaciado" xs12 sm12 md6 lg6 > 

                                        <v-menu
                                            ref="menu1"
                                            v-model="menu1"
                                            :close-on-content-click="false"
                                            :return-value.sync="fechacelebracioninme"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                            v-if="status == 'Inmediato'"
                                        >
                                            <template v-slot:activator="{ on }">
                                            <v-text-field
                                                name='fecha de celebración'
                                                :value="fechacioinme"
                                                label="*Fecha de celebración:"
                                                prepend-icon="event"
                                                clearable 
                                                readonly
                                                v-on="on"
                                                v-validate="'required'"                                   
                                                :error-messages="errors.collect('fecha de celebración')">
                                            ></v-text-field>
                                            </template>
                                                <v-date-picker  locale="es" v-model="fechacelebracioninme" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                </v-date-picker>
                                        </v-menu>

                                        <v-menu
                                            ref="menu2"
                                            v-model="menu2"
                                            :close-on-content-click="false"
                                            :return-value.sync="fechacelebraciondife"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                            v-if="status == 'Diferido'"
                                        >
                                            <template v-slot:activator="{ on }">
                                            <v-text-field
                                                name='fecha de celebración'
                                                :value="fechaciondife"
                                                label="*Fecha de celebración:"
                                                prepend-icon="event"
                                                clearable 
                                                readonly
                                                v-on="on"
                                                v-validate="'required'"                                   
                                                :error-messages="errors.collect('fecha de celebración')">
                                            ></v-text-field>
                                            </template>
                                                <v-date-picker  locale="es" v-model="fechacelebraciondife" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                </v-date-picker>
                                        </v-menu>


                                        <v-autocomplete
                                            name="estatus de cumplimiento"
                                            :items="statuscumplimientos"
                                            v-model="statuscumplimiento"
                                            label="*Estatus de cumplimiento:"
                                            v-validate="'required'" 
                                            v-if="status == 'Diferido'"
                                            :error-messages="errors.collect('estatus de cumplimiento')"
                                        ></v-autocomplete> 

                                        <v-text-field
                                            name="número de SISE"
                                            v-model="sise"
                                            label="*Número de SISE:"
                                            v-validate="'required'" 
                                            v-if="status == 'Diferido'"
                                            :error-messages="errors.collect('número de SISE')"
                                        ></v-text-field> 

                                        <v-autocomplete
                                            v-if="status == 'Baja'"
                                            name="motivo de la baja"
                                            :items="statusbajas"
                                            v-model="statusbaja"
                                            label="*Motivo de la baja:"
                                            v-validate="'required'" 
                                            :error-messages="errors.collect('motivo de la baja')"
                                        ></v-autocomplete> 

                                    </v-flex>

                                    <v-flex class="espaciado" xs12 sm12 md6 lg6 > 

                                        <v-menu
                                            ref="menu3"
                                            v-model="menu3"
                                            :close-on-content-click="false"
                                            :return-value.sync="fechacumplimiento"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                            v-if="status == 'Diferido'"
                                        >
                                            <template v-slot:activator="{ on }">
                                            <v-text-field
                                                name='fecha limite de cumplimiento'
                                                :value="fechacum"
                                                label="*Fecha limite de cumplimiento:"
                                                prepend-icon="event"
                                                clearable 
                                                readonly
                                                v-on="on"
                                                v-validate="'required'"                                   
                                                :error-messages="errors.collect('fecha limite de cumplimiento')">
                                            ></v-text-field>
                                            </template>
                                                <v-date-picker  locale="es" v-model="fechacumplimiento" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menu3 = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                </v-date-picker>
                                        </v-menu>

                                        <v-menu
                                            ref="menu4"
                                            v-model="menu4"
                                            :close-on-content-click="false"
                                            :return-value.sync="fechaconclusion"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                            v-if="status == 'Diferido'"
                                        >
                                            <template v-slot:activator="{ on }">
                                            <v-text-field
                                                name='fecha de constancia de conclusión'
                                                :value="fechaconc"
                                                label="*Fecha de constancia de conclusión:"
                                                prepend-icon="event"
                                                clearable 
                                                readonly
                                                v-on="on"
                                                v-validate="'required'"                                   
                                                :error-messages="errors.collect('fecha de constancia de conclusión')">
                                            ></v-text-field>
                                            </template>
                                                <v-date-picker  locale="es" v-model="fechaconclusion" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="menu4 = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                </v-date-picker>
                                        </v-menu>

                                        

                                    </v-flex>


                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog  v-model="dialogoinformacion"  max-width="1000px" >

            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">info</v-icon>
                    </v-avatar>
                    
                    <v-toolbar-title class="subheading">Información detallada</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer> 
                    <v-btn @click.native="dialogoinformacion=false" >Cerrar</v-btn>                  
                </v-toolbar>
                <v-card-text>
                    <v-container grid-list-md text-xs-center>
                        <v-layout wrap>
                            <v-flex  xs12 sm12 md6 lg6 >
                                <v-card    auto-grow elevation="0">                                
                                    <v-card-text >
                                        <v-list one-line   > 
                                            <v-list-tile>  
                                                <v-list-tile-action>
                                                    <v-icon color="success">view_day</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content   >  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Delitos:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{itemsre.delitos }}</a></p>  </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile> 
                                            <v-list-tile>  
                                                <v-list-tile-action>
                                                    <v-icon color="success">view_day</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content   >  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Requeridos:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{itemsre.requeridos }}</a></p>  </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile> 
                                            <v-list-tile>  
                                                <v-list-tile-action>
                                                    <v-icon color="success">view_day</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content   >  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Estatus:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{itemsre.statusConclusion }}</a></p>  </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile> 
                                            <v-list-tile v-if="itemsre.statusConclusion == 'Diferido'">  
                                                <v-list-tile-action>
                                                    <v-icon color="success">view_day</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content   >  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Fecha limite de cumplimiento:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ itemsre.fechaLimitecumplimiento.substring(8,10) +" de "+ obtenermes(itemsre.fechaLimitecumplimiento.substring(5,7)-1)+" del "+itemsre.fechaLimitecumplimiento.substring(0,4)   }}</a></p>  </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile>     
                                            <v-list-tile v-if="itemsre.statusConclusion == 'Diferido'">  
                                                <v-list-tile-action>
                                                    <v-icon color="success">view_day</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content   >  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Fecha de constancia de conlusión:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ itemsre.fechaConclusion.substring(8,10) +" de "+ obtenermes(itemsre.fechaConclusion.substring(5,7)-1)+" del "+itemsre.fechaConclusion.substring(0,4)  }}</a></p>  </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile>                                                                                 
                                        </v-list>  
                                    </v-card-text> 
                                </v-card>
                            </v-flex> 
                            <v-flex  xs12 sm12 md6 lg6 >
                                <v-card    auto-grow elevation="0">                                
                                    <v-card-text >
                                        <v-list one-line   > 
                                            <v-list-tile>  
                                                <v-list-tile-action>
                                                    <v-icon color="success">view_day</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content   >  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Número de expediente:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{itemsre.noExpediente }}</a></p>  </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile>                                            
                                        </v-list> 
                                            <v-list-tile>  
                                                <v-list-tile-action>
                                                    <v-icon color="success">view_day</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content   >  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Solicitantes:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{itemsre.solicitantes }}</a></p>  </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile>                                            
                                            <v-list-tile  v-if="itemsre.statusConclusion == 'Inmediato' || itemsre.statusConclusion == 'Diferido' ">  
                                                <v-list-tile-action>
                                                    <v-icon color="success">view_day</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content   >  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Fecha de celebración:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{   itemsre.fechacelebracion.substring(8,10) +" de "+ obtenermes(itemsre.fechacelebracion.substring(5,7)-1)+" del "+itemsre.fechacelebracion.substring(0,4)  }}</a></p>  </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile>  
                                            <v-list-tile v-if="itemsre.statusConclusion == 'Diferido'">  
                                                <v-list-tile-action>
                                                    <v-icon color="success">view_day</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content   >  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Estatus cumplimiento:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{itemsre.statusCumplimiento }}</a></p>  </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile>   
                                            <v-list-tile v-if="itemsre.statusConclusion == 'Diferido'">  
                                                <v-list-tile-action>
                                                    <v-icon color="success">view_day</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content   >  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>SISE:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{itemsre.sise }}</a></p>  </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile> 
                                            <v-list-tile v-if="itemsre.statusConclusion == 'Baja'">  
                                                <v-list-tile-action>
                                                    <v-icon color="success">view_day</v-icon>
                                                </v-list-tile-action> 
                                                <v-list-tile-content   >  
                                                    <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Motivo de la baja:</a></p> </v-list-tile-title> 
                                                    <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{itemsre.statusBaja }}</a></p>  </v-list-tile-sub-title>  
                                                </v-list-tile-content> 
                                            </v-list-tile>                                             
                                    </v-card-text> 
                                </v-card>
                            </v-flex>                               
                        </v-layout>
                    </v-container>
                                                       
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
    components: {
        "vue2-editor": VueEditor,
        n401,
        n403
    },
    data: () => ({
        alert:false,
        dialog: false, 
        rahid:'',
        rAtencionId:'',
        rHechoId:'', 
        agenciaid:'',
        nuc:'',
        showpage:true,
        e401:false,
        e403:false,
        //-------Logos-----------------------------------------/
        registros:[],
        delitos:[],
        delito:[],
        noexpediente:'',
        solicitantes:[],
        solicitante:[],
        requeridos:[],
        requerido:[],
        victimas:[],
        victima:'',
        imputados:[],
        imputado:'',
        statuses:[
            {text:"En tramite" , value: "Tramite"},
            {text:"Acuerdo inmediato" , value: "Inmediato"},
            {text:"Acuerdo diferido" , value: "Diferido"},
            {text:"Baja" , value: "Baja"},
        ],
        status:'',
        menu1:false,
        menu2:false,
        menu3:false,
        menu4:false,
        fechacelebracioninme:'',
        fechacioinme:'',
        fechacelebraciondife:'',
        fechaciondife:'',
        fechacumplimiento:'',
        fechacum:'',
        fechaconclusion:'',
        fechaconc:'',
        statuscumplimientos:[
            {text:"Registro de conclusión por incumplimiento de acuerdo reparatorio" , value: "Registro de conclusión por incumplimiento de acuerdo reparatorio"},
            {text:"Registro de cumplimiento de acuerdo diferido y conclusión" , value: "Registro de cumplimiento de acuerdo diferido y conclusión"},
        ],
        statuscumplimiento:'',
        sise:'',
        statusbajas:[
            {text:"Registro conclusión inasistencia requerido" , value: "Registro conclusión inasistencia requerido"},
            {text:"Registro conclusión inasistencia solicitante" , value: "Registro conclusión inasistencia solicitante"},
            {text:"Registro conclusión por comportamiento irrespetuoso" , value: "Registro conclusión por comportamiento irrespetuoso"},
            {text:"Registro conclusión por posiciones irreductibles" , value: "Registro conclusión por posiciones irreductibles"},
            {text:"Registro conclusión por voluntad de ambas partes" , value: "Registro conclusión por voluntad de ambas partes"},
            {text:"Registros conclusión por voluntad de requerido" , value: "Registros conclusión por voluntad de requerido"},
            {text:"Registros conclusión por voluntad de solicitante" , value: "Registros conclusión por voluntad de solicitante"},
        ],
        statusbaja:'',
        dialogoinformacion:false,
        itemsre:[],
        inforhecho:[],
        headers: [
            
            { text: 'No.Expediente', value: 'noExpediente', sortable: true  }, 
            { text: 'Estatus', value: 'status', sortable: true  }, 
            { text: 'Delitos',value: 'delitos' }, 
            { text: 'Solicitantes',value: 'solicitantes' }, 
            { text: 'Requeridos',value: 'requeridos' }, 
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
       
        //*************** */
        
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
        modalAdd:false,
        modaldocumento:false,
        aux: false,
        


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
        me.rAtencionId = me.$store.state.ratencionid;
        if (me.rHechoId== null)
        {
                me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpetas y luego en Lista de carpetas asignadas y  ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.', 
                function(){ 

                        me.$router.push('./mcaptura-listacarpetas')
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
                me.listar();              
                me.listardelitoshecho();
                me.listarPersonas();
                me.listarinfodelrhecho();
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
    methods:{ 
        cerrarcarpeta () {
            this.$store.state.rhechoid = null;
            this.$store.state.nuc= null;
            this.$router.push('./listacarpetas')
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
        agregar(){
            this.limpiar();           
            this.modalAdd= true;
        },     
        limpiar(){    
            this.delito = []
            this.noexpediente = ""
            this.requerido = []
            this.solicitante = []
            this.status = []
            this.fechacelebracioninme = ""
            this.fechacioinme = ""
            this.fechacelebraciondife = ""
            this.fechaciondife = ""
            this.statuscumplimiento = ""
            this.fechacumplimiento = ""
            this.fechacum = ""
            this.fechaconclusion = ""
            this.fechaconc = ""
            this.sise = "" 
            this.statusbaja = ""   
        },
        listar(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            me.$justiciarestaurativa.get('api/Expedientes/ListarModuloCaptura/'+ me.rHechoId,configuracion).then(function(response){
                me.registros=response.data;
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
        listarinfodelrhecho(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            me.$cat.get('api/RHechoes/InfodelRhecho/'+ me.rHechoId,configuracion).then(function(response){
                me.inforhecho=response.data;
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
            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información ',           
            function(){

                var prefijo = "", consecutivo = "", año = ""  
                
                prefijo = "" + me.noexpediente[0] + me.noexpediente[1] + me.noexpediente[2] + me.noexpediente[3] 

                consecutivo = "" + me.noexpediente[5] + me.noexpediente[6] + me.noexpediente[7] + me.noexpediente[8] 

                año = "" + me.noexpediente[10] + me.noexpediente[11] + me.noexpediente[12] + me.noexpediente[13] 

                if(me.sise == '') me.sise = 0

                me.$justiciarestaurativa.post('api/Expedientes/CrearRegistroModuloCaptura',{  
                    
                    'NUC': me.nuc,
                    'Idmoduloservicio': me.u_idmoduloservicio,                  
                    'RhechoId': me.rHechoId,
                    'NumeroExpediente': me.noexpediente,
                    'Prefijo': prefijo,
                    'Consecutivo': consecutivo,
                    'Ano': año,
                    'EnDistrito': me.inforhecho.distritoInicial,
                    'EnDisubproc': me.inforhecho.dirSubProcuInicial,
                    'EnAgencia': me.inforhecho.agenciaInicial,
                    'EnModulo': me.inforhecho.u_Modulo,
                    'EnNombre': me.u_nombre,
                    'EnPuesto': me.u_puesto,
                    'Solicitantes': me.solicitante,
                    'Requeridos': me.requerido,
                    'Delitos': me.delito,
                    'Status': me.status,
                    'FechaCelebracionInme': me.status == "Inmediato" ? me.fechacelebracioninme : "0001-01-01" ,
                    'FechaCelebracionDife': me.status == "Diferido"  ?  me.fechacelebraciondife :"0001-01-01" ,
                    'Fechalimitecumplimiento': me.status == "Diferido"  ?  me.fechacumplimiento :"0001-01-01" ,
                    'StatusCumplimiento': me.statuscumplimiento,
                    'FechaConstanciaconclusion': me.status == "Diferido" ?  me.fechaconclusion :"0001-01-01" ,
                    'SISE': me.sise,
                    'StatusBaja': me.statusbaja,
                    

                },configuracion).then(function(response){                   
                    me.$notify('La información se guardo correctamente !!!','success')  
                    me.modalAdd=false;      
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
                        me.$notify('Error al intentar listar los registros!!!','error')    
                    } 
                });
                
        },
        function(){
                alertify.warning('Verifica la información')
            }).set('labels', {ok:'Guardar', cancel:'Cancelar'});
                

        },   
        listardelitoshecho(){ 

            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.delitosderivados=[]; 
            //************************************************ */
            var delitosarray=[];
            me.$cat.get('api/RDHs/ListarPorHechoMASC/'+ me.rHechoId,configuracion).then(function(response){ 
                delitosarray=response.data; 
                delitosarray.map(function(x){
                    me.delitos.push({text: x.nombreDelito,value: x.idRDH,IdDelito: x.idRDH, Nombre: x.nombreDelito});  
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
        listarPersonas(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var contador=0
            var personasArray=[];
            me.$cat.get('api/RAPs/ListarTodosVic/'+ me.rAtencionId,configuracion).then(function(response){

                personasArray=response.data;               
                personasArray.map(function(x){
                    me.victimas.push({text: x.nombreCompleto,value:x.personaId,PersonaId:x.personaId,Clasificacion: x.clasificacionPersona, Nombre: x.nombreCompleto});
                });

                me.$cat.get('api/RAPs/ListarTodosImp/'+ me.rAtencionId,configuracion).then(function(response){

                    personasArray=response.data;                                      
                    personasArray.map(function(x){
                        me.imputados.push({text: x.nombreCompleto,value:x.personaId,PersonaId:x.personaId ,Clasificacion: x.clasificacionPersona, Nombre: x.nombreCompleto});               
                    });

                    me.solicitantes = me.victimas
                    me.requeridos = me.imputados

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
        intercambiarsolire(){

            var aux = []
            var aux2 = []
            
            aux = this.solicitantes
            aux2 = this.solicitante

            this.solicitantes = this.requeridos
            this.solicitante = this.requerido

            this.requeridos = aux
            this.requerido = aux2
        },
        fechainif(){
            if(this.menu1){
                this.generarfecha2();
                this.$refs.menu1.save(this.fechacelebracioninme);
            }   
            if(this.menu2){
                this.generarfecha2();
                this.$refs.menu2.save(this.fechacelebraciondife);
            } 
            if(this.menu3){
                this.generarfecha2();
                this.$refs.menu3.save(this.fechacumplimiento);
            }    
            if(this.menu4){
                this.generarfecha2();
                this.$refs.menu4.save(this.fechaconclusion);
            }            
        },
        generarfecha2(){           
            if(this.menu1) 
                this.fechacioinme =this.fechacelebracioninme.substring(8,10) +" de "+ this.obtenermes(this.fechacelebracioninme.substring(5,7)-1)+
                " del "+ this.fechacelebracioninme.substring(0,4);
                
            if(this.menu2) 
                this.fechaciondife =this.fechacelebraciondife.substring(8,10) +" de "+ this.obtenermes(this.fechacelebraciondife.substring(5,7)-1)+
                " del "+ this.fechacelebraciondife.substring(0,4);    

            if(this.menu3) 
                this.fechacum =this.fechacumplimiento.substring(8,10) +" de "+ this.obtenermes(this.fechacumplimiento.substring(5,7)-1)+
                " del "+ this.fechacumplimiento.substring(0,4);

            if(this.menu4) 
                this.fechaconc =this.fechaconclusion.substring(8,10) +" de "+ this.obtenermes(this.fechaconclusion.substring(5,7)-1)+
                " del "+ this.fechaconclusion.substring(0,4);
        },  
        verinfo(item){
            this.dialogoinformacion = true
            this.itemsre = item
        }

        
      } 
   }
</script>

<style> 
.espaciado{
    padding: 30px !important; 
}  
</style>
