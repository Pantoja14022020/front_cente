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
                    <v-toolbar-title class="font-weight-regular" >Bandeja de Entrada {{u_nombre }}</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                  
                    <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn color="success" class="mr-2" v-on="on" @click="loadarchive()">
                        Subir Dictamen
                        </v-btn>
                    </template>
                    <span>Subir Archivo</span>
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
                          <v-form ref="form" data-vv-scope="datossatus">
                                <v-container grid-list-md text-xs-center>
                                    <v-layout row wrap>
                                    <v-flex xs6 sm6 md6 lg6>
                                         <v-autocomplete name="status" 
                                                :items="statuses"
                                                v-model="changestatus" 
                                                return-object  
                                                data-vv-scope="datossatus"
                                                v-validate="'required'" 
                                                label="*Nuevo status:"
                                                :error-messages="errors.collect('datossatus.status')">
                                         </v-autocomplete>
                                    </v-flex>
                                    <v-flex xs6 sm6 md6 lg6>
                                            <v-card elevation="0"   >
                                                
                                                <v-card-text>
                                                    <table>                                                                                                                                       
                                                            <tr>
                                                                <td>Conclusíon:</td>
                                                                <td><b> La conclusíon solo podra ser vista por el perito que la esta llenando.</b></td>
                                                            </tr> 
                                                           <br>
                                                            <tr>
                                                                <td style="width:140px"> Mensaje: </td>
                                                                <td><b> Este texto solo podra ser visto por el agente del ministerio publico que solicito el servicio.</b></td> 
                                                            </tr>                        
                                                    </table>  
                                                                                 
                                                </v-card-text>
                                            </v-card>

                                    </v-flex>

                                    <v-flex xs12 sm12 md12 lg12>
                                         <v-card elevation="0" v-if="changestatus.value == 1" >
                                            <v-card-title class="accent"><h3>Conclusíon</h3></v-card-title>
                                                    <v-card-text>
                                                         <vue-editor  
                                                            name="conclusíon"                                        
                                                            v-model="conclusion" 
                                                            v-if="changestatus.value == 1" 
                                                            :editorToolbar="customToolbar"  
                                                            data-vv-scope="datossatus"   
                                                                                                
                                                            :error-messages="errors.collect('datossatus.conclusíon')">
                                                        </vue-editor>
                                                    </v-card-text>   
                                         </v-card> 

                                         <v-card elevation="0" v-if="changestatus != ''" >
                                            <v-card-title class="accent"><h3>Mensaje</h3></v-card-title>
                                                    <v-card-text>
                                                         <vue-editor  
                                                            name="conclusíon"                                        
                                                            v-model="mensaje" 
                                                            v-if="changestatus.value != ''" 
                                                            :editorToolbar="customToolbar"  
                                                            data-vv-scope="datossatus"   
                                                                                                 
                                                            :error-messages="errors.collect('datossatus.conclusíon')">
                                                        </vue-editor>
                                                    </v-card-text>   
                                         </v-card> 
                                    </v-flex>
                                 
                                    </v-layout>
                                </v-container>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                   
                                    <v-btn  @click.native="dialog = false" >Cancelar</v-btn>
                                    <v-btn   @click="cambiarstatus()" class="success" >Guardar</v-btn>
                                    
                                </v-card-actions> 
                            </v-form>
                        
                        </v-card-text> 
                    </v-card>

                    </v-dialog>
                    
        </v-toolbar>
        
        <v-data-table
                :headers="headers"
                :items="bdoperito"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                 >
                
                <template slot="items" class="white" slot-scope="props">
                    

                    <td>{{ props.item.uUsuario}}</td>  
                    <td>{{ props.item.dnuc}}</td>  
                    <td>{{ props.item.dServicio}}</td> 
                    <td>{{ props.item.fechaRecibido }}</td> 
                    <td>{{ props.item.fechaAceptado }}</td> 
                    <td>{{ props.item.fechaFinalizado }}</td> 
                    <td>{{ props.item.fechaEntregado}}</td>   
                    <td>{{ props.item.numeroInterno }}</td> 
                    <td>{{ props.item.status }}</td>
                    <td class="justify-center layout px-0">
                           <!--  <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" 
                                        @click="verinfo(props.item)"
                                        >
                                       info
                                    </v-icon> 
                                </template>
                                <span>Ver información</span>
                            </v-tooltip>  -->

                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" color = "warning" 
                                        @click="imprimirdocs(props.item)"
                                        >
                                       print
                                    </v-icon> 
                                </template>
                                <span>Re imprimir</span>
                            </v-tooltip>   
                            <div class="justify-center layout px-0"  v-if="props.item.status != 'Finalizado' && props.item.status != 'Entregado' ">
                                <v-tooltip bottom   >
                                    <template v-slot:activator="{ on }">
                                        <v-icon 
                                            class="mr-2" v-on="on" 
                                            @click="dialogostatus(props.item)"
                                            >
                                        edit
                                        </v-icon> 
                                    </template>
                                    <span>Cambiar status</span>
                                </v-tooltip>  
                            </div>
                            <div class="justify-center layout px-0" v-if="props.item.status != 'Asignado' 
                            && props.item.status != 'Enproceso' && props.item.status != 'Pospuesto' ">
                            <v-tooltip bottom   >
                                    <template v-slot:activator="{ on }">
                                        <v-icon 
                                            class="mr-2" v-on="on" 
                                            @click="consultcsmsj(props.item)"
                                            >
                                        line_weight
                                        </v-icon> 
                                    </template>
                                    <span>Consultar Conclusíon</span>
                            </v-tooltip>
                            </div> 
                            <div class="justify-center layout px-0" v-if="props.item.status != 'Asignado' && props.item.status != 'Enproceso' && props.item.status != 'Pospuesto'">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon class="mr-2" v-on="on" @click="consultararchivo(props.item)">
                                    pageview
                                </v-icon>
                            </template>
                            <span>Consultar Archivos</span>
                        </v-tooltip>
                        </div>     
                    </td>   
                </template>
                <template slot="no-data">
                <v-btn color="primary"  @click="listar()" >Resetear</v-btn>
                </template>
                
        </v-data-table>

    <v-dialog v-model="modaldocumento" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>          
                    <v-btn icon   @click="modaldocumento = false">
                    <v-icon>close</v-icon>
                    </v-btn>

                    </v-toolbar-items>
                </v-toolbar>
                    <v-card-text>
                        <iframe id="iframepdf" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no"  ></iframe>
                    </v-card-text>
                </v-card>
    </v-dialog>

    <v-dialog  v-model="dialogpictures"  max-width="1000px" >

                        <v-card>
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">assignment</v-icon>
                                </v-avatar>
                    
                         
                        <v-toolbar-title class="subheading">Lista de archivos</v-toolbar-title>
                        <v-spacer></v-spacer>
                    
                        
                        </v-toolbar>
                        <v-card-text>
                          <v-form ref="form" >
                                <v-container grid-list-md text-xs-center>
                                    <v-layout row wrap>
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
                                                <td>{{ props.item.fechaRegistro}}</td> 
                                                <td class="justify-center layout px-0">
                                                    <v-tooltip bottom   >
                                                        <template v-slot:activator="{ on }">
                                                            <v-icon 
                                                                class="mr-2" v-on="on" 
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
                                    <v-btn  @click.native="dialogpictures=false" >Cerrar</v-btn>                                   
                                </v-card-actions> 
                            </v-form>
                        
                        </v-card-text> 
                    </v-card>

        </v-dialog>

        <v-dialog  v-model="dialogimagen"  max-width="1000px" >

                        <v-card>
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">assignment</v-icon>
                                </v-avatar>
                    
                         
                        <v-toolbar-title class="subheading">Imagen</v-toolbar-title>
                        <v-spacer></v-spacer>                  
                        </v-toolbar>
                        <v-card-text>
                          <v-form ref="form" >
                                <v-container grid-list-md text-xs-center>
                                    <v-layout row wrap>
                                    <v-flex xs12 sm12 md12 lg12>

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
                                    <v-btn  @click.native="dialogimagen=false" >Cerrar</v-btn>                                   
                                </v-card-actions> 
                            </v-form>
                        
                        </v-card-text> 
                    </v-card>

        </v-dialog>

        <v-dialog  v-model="dialogcsmsj"  max-width="1000px" >

                        <v-card>
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">line_weight</v-icon>
                                </v-avatar>
                    
                
                        <v-toolbar-title class="subheading">Conclusíon y Mensaje</v-toolbar-title>
                        <v-spacer></v-spacer>
                    
                        
                        </v-toolbar>
                        <v-card-text>
                          <v-form ref="form" >
                                <v-container grid-list-md text-xs-center>
                                    <v-layout row wrap>                                               
                                    <v-flex xs12 sm12 md12 lg12>
                                            <v-card elevation="0"   >
                                                
                                                <v-card-text>
                                                    <table>                                                                                                                                       
                                                            <tr>
                                                                <td>Conclusíon:</td>
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
                                    <v-spacer></v-spacer>
                                   
                                    <v-btn  @click="dialogcsmsj = false" >Cerrar</v-btn>                                                                      
                                </v-card-actions> 
                            </v-form>                        
                        </v-card-text> 
                    </v-card>
        </v-dialog>

        <v-dialog v-model="dialogarchivo" max-width="1000px">
                    <v-card>
                        <v-toolbar card dark color="grey lighten-4 primary--text">
                            <v-avatar  size="30">
                                <v-icon class="grey lighten-2">{{ formIcon }}</v-icon>
                            </v-avatar>
                            <v-toolbar-title class="subheading">{{ formTitle }}</v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>
                        <v-card-text>
                          <v-form ref="form" data-vv-scope="dialogodocs" >
                                <v-container grid-list-md text-xs-center>
                                    <v-layout row wrap>
                                    <v-flex xs12 sm12 md12 lg12>
                                        <v-text-field
                                            name="imagen"
                                            label="Selecciona la imagen del documento de identificacion"
                                            @click='pickFile'
                                            v-model='imageName'
                                            prepend-icon='attach_file'
                                            data-vv-scope="dialogodocs"
                                            :error-messages="errors.collect('dialogodocs.imagen')"
                                        />
                                        <input
                                            type="file"
                                            style="display: none"
                                            ref="image"
                                            accept="image/*, .pdf, .doc, .docx"
                                            @change="onFilePicked"
                                        >
                                        <v-autocomplete name="nucfi"
                                            :items="nucf"
                                            v-model="numnuc"
                                            return-object
                                            data-vv-scope="dialogodocs"
                                            v-validate="'required'"
                                            label="*NUC:"
                                            v-on:change="listarstatus"
                                            :error-messages="errors.collect('nucfi')"
                                        />
                                        <v-autocomplete name="serviciosf"
                                            :items="servf"
                                            v-model="serviciof"
                                            return-object
                                            multiple
                                            chips
                                            deletable-chips
                                            data-vv-scope="dialogodocs"
                                            v-validate="'required'"
                                            label="*Nombre de Servicio Finalizado:"
                                            :error-messages="errors.collect('serviciosf')"
                                            class="custom-autocomplete"
                                        />
                                        <v-autocomplete name="tipo de archivo"
                                            :items="tiposdocumentos"
                                            v-model="tiposdocumento"
                                            return-object
                                            data-vv-scope="dialogodocs"
                                            v-validate="'required'"
                                            label="*Tipo de archivo:"
                                            :error-messages="errors.collect('dialogodocs.tipo de archivo')"
                                        />
                                        <v-text-field
                                            name="descripcíon de documento"
                                            label="*Descripción del documento"
                                            v-model='descripciondocumento'
                                            v-validate="'required'"
                                            data-vv-scope="dialogodocs"
                                            :error-messages="errors.collect('dialogodocs.descripcíon de documento')"
                                        />
                                         <!--<v-text-field
                                            name="curp"
                                            label="*Ingrese CURP para e.firma"
                                            v-model='curp'
                                            v-validate="'required'"
                                            maxlength="18"
                                            data-vv-scope=""
                                            :error-messages="errors.collect('')"
                                        />
                                        <v-text-field
                                        v-model="pwdfirma"
                                        name="pwdfirma"
                                        label="*Contraseña de firma digital"
                                        id="pwdfirma"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('contraseña')"
                                        type="password">
                                        </v-text-field>

                                         <v-text-field
                                         name="archivo"
                                         label="Seleccione archivo .p12 o .pfx para e.firma"
                                         @click='pickFilefirma'
                                         v-model='archivoName'
                                         prepend-icon='attach_file'
                                         data-vv-scope="dialogodocs"
                                         :error-messages="errors.collect('dialogodocs.imagen')"
                                         ></v-text-field>

                                        <input
                                            type="file"
                                            style="display: none"
                                            ref="archivo"
                                            accept=".p12,.pfx"
                                            @change="onFilePickedfirma"
                                        > -->
                                    </v-flex>
                                    </v-layout>
                                </v-container>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn @click="close()">Cancelar</v-btn>
                                    <v-btn @click="guardar()" class="success" >Guardar</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>

        <v-dialog v-model="modalGeolocalizacion2" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card >
                    <v-toolbar bottom collapse dark color="primary">
                    
                        <v-toolbar-title>Geolocalización.</v-toolbar-title>
                        <v-spacer></v-spacer>
                            <v-toolbar-items>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn class="mx-1" slot="activator" v-on="on" @click="aumentarzoorm()" left fab dark small color="success">
                                            <v-icon>add</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Aumentar zoom</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn class="mx-1" slot="activator" v-on="on" @click="disminuirzoom()" left fab dark small color="success">
                                            <v-icon>remove</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Disminuir zoom</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn class="mx-1" slot="activator" v-on="on" @click="activarterreno()" left fab dark small color="success">
                                            <v-icon>view_quilt</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Vista area</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn class="mx-1" slot="activator" v-on="on" @click="activarsatellite()" left fab dark small color="success">
                                            <v-icon>terrain</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Satelite</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn class="mx-1" slot="activator" v-on="on" @click="imprim1()" left fab dark small color="success">
                                            <v-icon>print</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Imprimir mapa</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn class="mx-1" slot="activator" v-on="on" @click="modalGeolocalizacion2=false" left fab dark small color="success">
                                            <v-icon>close</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Cerrar</span>
                                </v-tooltip>

                            </v-toolbar-items>
                    </v-toolbar>
        
                        <v-divider></v-divider>
                    
                        <v-card    elevation=0  height="auto">
                            
                            <gmap-map 
                            id="mapa"                             
                            :center="center2"
                            :zoom="zoom"                            
                            style=" width:100%;  height: 800px;"                            
                            :options="opcionesmapa"
                            :StreetViewPanoramaOptions ="{
                                showRoadLabels:true
                            }"
                            >
                            <v-tooltip bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn class="mx-1" slot="activator" v-on="on" @click="modalGeolocalizacion2=false" left fab dark small color="success">
                                            <v-icon>close</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Cerrar</span>
                                </v-tooltip>
                            <gmap-marker
                                :key="index"
                                v-for="(m, index) in markers2"
                                :position="m.position"
                                @click="center=m.position"
                                :clickable="false"
                                :draggable="false"
                            ></gmap-marker>
                            
                            </gmap-map>
                                            
                        </v-card>
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
  import { error } from 'util';
  import { VueEditor } from "vue2-editor";
  import n401 from './401.vue'
  import n403 from './403.vue'

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
        nuc:'',
        showpage:true,
        e401:false,
        e403:false,
        //*************** */
        bdoperito:[],
        statuses:[
            {text:'Finalizado',value:'1'},
            {text:'Suspendido',value:'2'},
            {text:'Pospuesto',value:'3'},
            {text:'Enproceso',value:'4'}           
        ],
        tiposdocumentos:[
            {text:'Fotografías',value:'1'},
            {text:'Documentos',value:'2'},
            {text:'Resultados',value:'3'},
            {text:'Indicios',value:'4'},   
            {text:'Identficaciones',value:'5'}            
        ],
        tiposdocumento:'',
        changestatus:'',

        diligencias:[],
        peritos:[],
        nucf: [],
        servf: [],
        perito:'',
        personaid:'',
        rDiligenciasId:'',
        respuesta:'',
        numeroInterno:'',
        numnuc: '',
        serviciof:'',
        nucfi:'',
        conclusion:'',
        fechaRecibido:'',
        fechaAceptado:'',
        fechaFinalizado:'',
        fechaEntregado:'',     
        razonrechazado:'',
        fidPeritoAsignado:'',
        dialogarchivo:'',
        imageName: '',
        imageUrl: null,
        imageFile: '',
        descripciondocumento:'',
        GUID:'',
        origenDirSub:'',
        fecha:'',
        responsable :'',
        nombreDirSub :'',
        textolibre:'',    
        nombre :'',
        puesto:'',
        textofinal :'',        
        modaldocumento :'',
        agenciainfo:'',
        agenciaid:'',
        dialogpictures:false,
        archivo:'',
        archivos:[],
        dialogimagen:false,
        rutaconsulta:'',
        mensaje:'',
        dialogcsmsj:false,
        conclusionitem:'',
        mensajeitem:'',
        numerooficio:'',
        agenciaenvia:'',
        //*************** */
        center2: { lat: 45.508, lng: -73.587},
        markers2: [],
        places2: [],
        currentPlace2: null, 
        modalGeolocalizacion2:0,
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
        //**************** */
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

            { text: 'Emitida por', value: 'emitidoPor', sortable: true  }, 
            { text: 'NUC', value: 'nuc'}, 
            { text: 'Servicio', value: 'dServicio'}, 
            { text: 'Fecha Recibido', value: 'Fecharecibido' },
            { text: 'Fecha de Aceptacíon', value: 'fechaAceptado' }, 
            { text: 'Fecha de Finalizacíon', value: 'fechaFinalizado' },
            { text: 'Fecha de Entregado', value: 'fechaEntregado' },
            { text: 'Numero Interno',value: 'numeroInterno' }, 
            { text: 'Status',value: 'status', sortable: true  }, 
            { text: 'Opciones', value: 'opciones' },           
        ],
        headersar: [

            { text: 'TipoDocumento', value: 'fipoDocumento', sortable: true  },            
            { text: 'FechaRegistro',value: 'fechaRegistro' }, 
            { text: 'Opciones', value: 'opciones' }, 
         
        ],
        search: '',
        searchar:'',
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
        u_idagencia:'',
        u_agencia:'',
        u_idmoduloservicio:'',
        u_modulo:'',
        u_idusuario:'',
        u_nombre:'',
        u_clave:'',
        u_rol:'',
        u_puesto:'',
        u_email:'',
        //----------------------------------------------------
    }),
       
    created () {
        
        let me = this 
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
                me.u_email=me.$store.state.usuario.email;


      
      me.listar();
      me.listarLogo();
      me.informacionagencia();
      

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
                return this.editedIndex === -1 ? 'Subir archivo' : 'Cambiar status'
            },
              formIcon () {
                return this.editedIndex === -1 ? 'add' : 'edit'
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
            return this.$store.drawer 
        }
    },
    watch: {
        
    },
    methods:{ 
        listarLogo(){
        
            let me=this; 
            this.$conf.get('api/ConfGlobals/Listar').then(function(response){
                me.logo1= response.data.logo1;
                me.logo2= response.data.logo2;
                
            }).catch(function(error){
                me.$notify('Error al leer la configuracion global !!!','error')    
            });
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
        agregar(){
            this.limpiar();
            this.modalAdd= true;
        },
        close () {
                this.dialogarchivo = false;
                this.dialog = false;
                this.limpiar();
        },
        generateUUID: function() { // Public Domain/MIT
            var d = new Date().getTime();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
                d += performance.now(); //use high-precision timer if available
            }
            var newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            
            return newGuid;
        },
        pickFile () {
            this.removeImage()
            this.$refs.image.click ()
        }, 
        removeImage () {
            this.$refs.image.value = ''
        },
        onFilePicked (e) {
			const files = e.target.files
                if(files[0] !== undefined) {
                    this.imageName = files[0].name
                    if(this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result
                        this.imageFile = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageUrl = ''
                }
		},    
        limpiar(){    
            let me = this;
                me.conclusion = '';
                me.changestatus = '';
                me.tiposdocumento ='';
                me.descripciondocumento='';
                me.imageName="";
                me.imageFile ="";
                me.imageUrl ="";
                me.conclusionitem="";
                me.mensajeitem ="";
                me.numnuc="";
                me.serviciof="";
            
        },
        generarfecha(){
            var fecha;
            fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY")
            return fecha;      
        },        
        dialogostatus(item){
            let me = this;
            me.limpiar();
            me.editedIndex = 1;
            me.dialog = true;
            me.rDiligenciasId = item.rDiligenciasForaneasId;
            me.agenciaenvia = item.agenciaEnvia;
            me.fidPeritoAsignado = item.idPeritosAsignadoForaneas;
        },
        loadarchive(){
            let me = this;
            me.editedIndex = -1;
            me.dialogarchivo = true;
        },        
        imprimirdocs(item){
            this.origenDirSub = item.duDirSubPro;
            this.fecha=item.dFechaSolicitud;
            this.responsable = item.dDirigidoa; 
            this.nombreDirSub = item.dDirSubPro;
            this.textolibre= item.despecificaciones;      
            this.nombre = item.demitidoPor;
            this.puesto= item.duPuesto;
            this.textofinal = item.dTextofinal; 
            this.nuc = item.dnuc;    
            this.numerooficio = item.numerooficio;    
            this.mostrarpdf(item.dEmitidoPor,item.duPuesto,item.dAgencia); 
            this.modaldocumento = false;
        },
        consultcsmsj(item){
            let me = this;
                me.limpiar();
                me.dialogcsmsj = true;
                me.conclusionitem = item.conclusion;
                me.mensajeitem = item.respuesta;
        },
        informacionagencia(){
                 let me=this;  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia,configuracion).then(function(response){
                    me.agenciainfo=response.data;
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
        listar(){
          let me=this;  
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header};
          me.$SP.get('api/PeritoAsignadoForaneas/Listarporid2/'+ me.u_idmoduloservicio,configuracion).then(function(response){
                    //console.log(response);
                    me.bdoperito=response.data;

                    me.bdoperito.map(function(x) {
                        if (x.status === "Finalizado") 
                        {
                            me.nucf.push({text: x.nuc, value: x.nuc, status: x.status});
                            
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
        listarstatus(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                var statusArray=[];
                me.servf = [];

                me.$CAT.get('api/RDiligenciasForaneas/FiltrarStatus/'+ me.numnuc.value,configuracion).then(function(response){
                    statusArray=response.data;
                    statusArray.map(function(x){
                        me.servf.push({text: x.servicio,value:x.idRDiligenciasForaneas});
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
        cambiarstatus(){
            let me= this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var fecha;
            me.$validator.validateAll('datossatus').then(result =>  {
                if (result) { 
                    
                        me.$CAT.put('api/RDiligenciasForaneas/Actualizarstatus',{
                            'IdRDiligenciasForaneas': me.rDiligenciasId,
                            'statusRespuesta': me.changestatus.text,
                            'respuesta': me.mensaje               
                        },configuracion).then(function(response){    
                            
                            me.$CAT.put('api/RDiligenciasForaneas/ActualizarstatusForanea',{
                                'IdRDiligenciasForaneas': me.rDiligenciasId,
                                'statusRespuesta': me.changestatus.text,
                                'respuesta': me.mensaje,
                                'AgenciaEnvia':me.agenciaenvia               
                            },configuracion).then(function(response){    
                                if(me.changestatus.value != 1){
                                    me.conclusion = "";
                                    fecha = "na";                                
                                }else fecha=me.generarfecha();
                                        
                                me.$notify('La información se actualizo correctamente !!!','success')
                                
                                me.$SP.put('api/PeritoAsignadoForaneas/ActualizarConclu',{ 
                                        'IdPeritosAsignadoForaneas': me.fidPeritoAsignado, 
                                        'conclusion': me.conclusion,                                                         
                                        'fechaFinalizado':fecha                                
                                        
                                    },configuracion).then(function(response){  
                                        me.$notify('La información se actualizo correctamente !!!','success') 
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
                               me.$notify('Error al intentar actualizar el registro!!!','error')
                            } 
                        });                
                } 
            })
        },
        verinfo(item){
            let me = this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            if(item.status == 'Asignado')
            me.$CAT.put('api/RDiligenciasForaneas/Actualizarstatus',{
                'IdRDiligenciasForaneas': item.rDiligenciasForaneasId,
                'statusRespuesta': "Enproceso"                  
            },configuracion).then(function(response){   
                
                me.$CAT.put('api/RDiligenciasForaneas/ActualizarstatusForanea',{
                'IdRDiligenciasForaneas': item.rDiligenciasForaneasId,
                'statusRespuesta': "Enproceso",
                'AgenciaEnvia': item.agenciaEnvia            
                },configuracion).then(function(response){   
                    
                    me.$SP.put('api/PeritoAsignadoForaneas/Actualizarultimostatus',{
                        'idPeritosAsignadoForaneas' : item.idPeritosAsignadoForaneas
                    },configuracion).then(function(response){                        
                        me.$notify('La información se actualizo correctamente !!!','success')         
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
                    me.$notify('La información se actualizo correctamente !!!','success')  
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
                    me.$notify('Error al intentar actualizar el registro!!!','error')   
                } 
            });


            me.origenDirSub = item.duDirSubPro;
            me.fecha=item.dFechaSolicitud;
            me.responsable = item.dDirigidoa; 
            me.nombreDirSub = item.dDirSubPro;
            me.textolibre= item.despecificaciones;      
            me.nombre = item.demitidoPor;
            me.puesto= item.duPuesto;
            me.textofinal = item.dTextofinal; 
            me.nuc = item.dnuc; 
            me.numerooficio = item.numerooficio;
            me.downloadPdf(item.dEmitidoPor,item.duPuesto,item.dAgencia);                   
            me.modaldocumento = true;
        },
        consultararchivo (item) {
            let me = this;
            me.dialogpictures = true;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$SP.get('api/DocsDiligenciasForaneas/Listar/'+ item.rDiligenciasForaneasId,configuracion).then(function(response){
                        //console.log(response);
                        me.archivos=response.data;
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
                            me.$notify("El recurso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')
                        }
                    });
        },
        verimagen (item) {
            let me = this;
            me.rutaconsulta = item.ruta;
        var tipoArchivo = item.ruta.slice((item.ruta.lastIndexOf(".") - 1 >>> 0) + 2)
        if (!(tipoArchivo == "pdf" || tipoArchivo == "doc" || tipoArchivo == "docx")) {
          this.rutaconsulta = item.ruta
          this.descrip = item.descripcionDocumento
          this.tipo = item.tipoDocumento
          this.dialogimagen = true
        } else {
          var win = window.open(item.ruta, '_blank')
          // Cambiar el foco al nuevo tab (punto opcional)
          win.focus()
        }
        },
        guardar(){
            var imagen = this.imageUrl;
            //console.log(imagen);
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$validator.validateAll('dialogodocs').then(result => {
            if (result) {
               
                //
                if (me.imageFile){
                    let formData = new FormData();
                    formData.append('file', me.imageFile);
                    nombreCarpeta = "C" + me.numnuc.value.substr(1);
                    me.GUID = me.generateUUID();
                    //
                    me.$SP.post('api/DocsDiligenciasForaneas/Post/'+nombreCarpeta+'/'+me.GUID,
                        formData,
                        {
                        headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                        },configuracion
                    ).then(function(response){
                        console.log('SUCCESS!!');
                        //console.log(response.data.ruta);
                        //
                     var servicios = '';
                                for(var i=0; i<me.serviciof.length; i++){
                                    servicios += me.serviciof[i].value;
                                if(i+1 != me.serviciof.length)
                                servicios += "; ";
                            
                        }
                        me.$SP.post('api/DocsDiligenciasForaneas/Crear',{    
                            'tipoDocumento' : me.tiposdocumento.text,
                            'descripcionDocumento' : me.descripciondocumento,
                            'fechaRegistro' : me.generarfecha(),
                            'puesto' : 'na',
                            'ruta' : response.data.ruta,
                            'usuario' : 'na',
                            'uDistrito' : me.u_distrito,
                            'uSubproc' : me.u_dirSubPro,
                            'uAgencia' : me.u_agencia,
                            'uUsuario' : me.u_nombre,
                            'uPuesto' : me.u_puesto,
                            'uModulo' : me.u_modulo,
                            'servicios': servicios,


                        },configuracion).then(function(response){
                            me.$notify('La información se guardo correctamente !!!','success')
                            me.dialogarchivo = false;
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
                                me.$notify("El recurso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar crear el  registro!!!','error')
                            }
                        });
                    })
                    .catch(function(){
                    console.log('FAILURE2!!');
                    });
                }
                //
                var nombreCarpeta;
                if (me.archivoFile){
                    let formData = new FormData();
                    formData.append('file', me.archivoFile);
                    nombreCarpeta = "C" + me.numnuc.value.substr(1);
                    //
                    me.$SP.post('api/DocsDiligenciasForaneas/Post/'+nombreCarpeta+'/'+me.archivoName,
                        formData,
                        {
                        headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                        },configuracion
                        ).then(function(response){
                        //console.log('SUCCESS! Al copiar archivo de firma');
                        //
                        me.rutarchivofirma = response.data.rutafisica;
                        me.rutarchivo = nombreCarpeta + '/'+me.archivoName;
                        //Inicia generación de firma electronica
                        //
                        me.$SP.get('api/PeritoAsignado/1', {params: {
                            pwdfirma : me.pwdfirma,
                            hashregistro : me.GUID,
                            curp : me.curp,
                            rutarchivofirma : me.rutarchivofirma,
                            rutarchivo : me.rutarchivo
                        }},'headers : {"Authorization" : "Basic UEdKSC1ET0NTOipQR0pILURPQ1MgZGV2MjAyMSo="}').then(function(response){
                            me.efirma = response.data.success.firma;
                            me.urlfirma = response.data.success.url;
                            me.rfcid = response.data.success.id_proccess;
                            //console.log(response.data.success);
                            me.verfirmapdf();
                            //
                        }).catch(function(){
                            console.log('Falla al generar firma!');
                        });
                        //
                        })
                        .catch(function(error){
                    console.log('Falla al copiar archivo, firmar o eliminarlo!');
                     });
                    //
                }

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
                    pdfMake.vfs = pdfFonts.pdfMake.vfs; 
            }
            var dd = me.downloadPdf(nombre,puesto,agencia);
            var doc = pdfMake.createPdf(dd);
             
                
            var doc = pdfMake.createPdf(dd).print();
               
        },
        downloadPdf(nombre,puesto,agencia) {

            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

            if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.pdfMake.vfs; 
            }

            //***************************************************************************** */
            // VARIABLES
            //***************************************************************************** */
            var logo1 = this.logo1;
            var logo2 = this.logo2;
            var u_dirSubPro = this.u_dirSubPro;
            var u_agencia = this.u_agencia;
            var nuc = this.nuc;
            //***************************************************************************** */
            var html =htmlToPdfmake(
                this.textofinal
            );
            //***************************************************************************** */
            var agenciainfodr = this.agenciainfo["direccion"];
            var agenciainfotel = this.agenciainfo["telefono"];

            //***************************************************************************** */
            var dd = {
                pageSize: 'LEGAL',
                pageOrientation: 'portrait',
                pageMargins: [ 85, 130, 72, 60 ],
                footer: function (currentPage, pageCount) {
                    return {
                        columns: [
                            {
                                text: agenciainfodr +"\n"+agenciainfotel+"\n"+ 'www.hidalgo.gob.mx',
                                style: 'subheaderlogo', 
                                style: 'PiePagina', 
                                margin: [312,12,72,0],
                                alignment:'right'      
                            },
			            ] 
                    };
                },
                header: function(currentPage, pageCount, pageSize) {
                         
                        return [
                            { 
                                image: logo1,
                                width: 150, 
                                absolutePosition: {x: 75, y: 30},
                                
                            },
                            { 
                                image: logo2,
                                width: 50,  
                                absolutePosition: {x: 495, y: 30},
                            },
                            {
                                text:  u_dirSubPro +"\n"+u_agencia,
                                style: 'Adscripcion',
                                absolutePosition: {x: 85, y: 75},
                            },
                            {
                                text:"Número Único de caso: "+ nuc,                 
                                style: 'Titulo', 
                                alignment: 'right',
                                margin: [0, 110, 72, 0]                                  
                            },                         
                        ]
                 
                },
              
                content: [
                   
                   
                    {
                        text:'Número de oficio: ' +this.numerooficio ,                        
                        style: 'Nooficio',
                        alignment: 'right', 
                    },
                    {
                        text:
                        '\n'+this.u_distrito+", Hidalgo a "+this.fecha+ "\n\n\n\n\n\n\n\n",                        
                        style: 'Fecha',
                        alignment: 'right', 
                    },    

                    {
                        text: this.responsable+"\n\n"+
                        this.nombreDirSub+"\n"+"\n"+"\n"+"\n",                        
                        style: 'Texto',
                        alignment : 'left'
                    },                    
                    {
                        text: html ,                        
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
                        color: COLOR_TEXTO_PIE_PAGINA
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

</style>