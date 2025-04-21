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
                    <v-toolbar-title class="font-weight-regular" >Entrega de informes</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                  
                                          
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
                    <td>{{ props.item.nuc}}</td>
                    <td>{{ props.item.numeroInterno }}</td>   
                    <td>{{ props.item.uModulo}}</td> 
                    <td>{{ props.item.fechaRecibido }}</td> 
                    <td>{{ props.item.fechaAceptado }}</td> 
                    <td>{{ props.item.fechaFinalizado }}</td> 
                    <td>{{ props.item.fechaEntregado}}</td>
                    <td>{{ props.item.uModulo }}</td> 
                    <td>{{ props.item.status }}</td>
                    <td class="justify-center layout px-0">
                        <div  class="justify-center layout px-0" v-if="props.item.status == 'Finalizado'  ">
                            <div   v-if="props.item.dConIndicio == true && esPerito ">
                                <v-tooltip bottom   >                               
                                    <template v-slot:activator="{ on }">
                                        <v-icon 
                                            class="mr-2" v-on="on" 
                                            @click="agregardetalle(props.item)"
                                            >
                                        picture_in_picture
                                        </v-icon> 
                                    </template>
                                    <span>Entrega de informe</span>
                                </v-tooltip>
                            </div>
                            <div   v-else-if="props.item.dConIndicio == false && (esPerito || esOficialiapartes) ">
                                <v-tooltip bottom   >                               
                                    <template v-slot:activator="{ on }">
                                        <v-icon 
                                            class="mr-2" v-on="on" 
                                            @click="agregardetalle(props.item)"
                                            >
                                        picture_in_picture
                                        </v-icon> 
                                    </template>
                                    <span>Entrega de informe</span>
                                </v-tooltip>
                            </div>
                        

                        </div> 
                            <div  class="justify-center layout px-0" v-if="props.item.dConIndicio == true  ">
                                <v-tooltip bottom class="justify-center layout px-0"  >
                                    <template v-slot:activator="{ on }">
                                        <v-icon 
                                            class="mr-2" v-on="on" 
                                            @click="VerDetallesIndicios(props.item)"
                                            >
                                        assignment
                                        </v-icon> 
                                    </template>
                                    <span>Ver detalles de indicios</span>
                                </v-tooltip> 
                            </div>
                                            
                    </td>   
                </template>
                <template slot="no-data">
                <v-btn color="primary"  @click="listar()" >Resetear</v-btn>
                </template>
                
        </v-data-table>

                <v-dialog  v-model="dialogoindicio"  max-width="1000px" >
                        
        
              
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

                              
                                <v-container grid-list-md text-xs-center>
                                    <v-layout row wrap>


                                    <v-flex class="espaciado" xs12 sm12 md12 lg12>
                                        
                                        <v-autocomplete name="indicios"   
                                            :items="indicios"
                                            v-model="indicio"
                                            return-object 
                                            attach
                                            chips
                                            deletable-chips
                                            multiple
                                            v-validate="'required'" 
                                            label="*Indicios:"                                             
                                            :error-messages="errors.collect('indicios')">
                                        </v-autocomplete>

                                    </v-flex>


                                    <v-flex class="espaciado" xs12 sm12 md6 lg6>

                                         <v-text-field name="lugar de origen" 
                                                          label="*Lugar de Origen"
                                                          v-model="origenlugar" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('lugar de origen')">
                                         </v-text-field>

                                         <v-text-field name="lugar de destino" 
                                                          label="*Lugar de Destino"
                                                          v-model="origendestino" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('lugar de destino')">                                              
                                         </v-text-field>


                                        </v-flex>

                                        <v-flex class="espaciado" xs12 sm12 md6 lg6>

                                         <v-text-field name="quien entrega" 
                                                          label="*Quién entrega"
                                                          v-model="quienentrega" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('quien entrega')">
                                         </v-text-field>
                                         <v-text-field name="quien recibe" 
                                                          label="*Quién Recibe"
                                                          v-model="quienrecibe" 
                                                          v-validate="'required'"
                                                          :error-messages="errors.collect('quien recibe')">
                                         </v-text-field>
                                        </v-flex>
                                
                                    </v-layout>
                                </v-container>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn  @click.native="close" >Cancelar</v-btn>
                                    <v-btn   @click.native="salvardetalle" class="success" >Guardar</v-btn>
                                    
                                </v-card-actions> 
                            </v-form>
                        
                        </v-card-text> 
                    </v-card>
    
                </v-dialog>

                <v-dialog  v-model="dialogoindicio2"  max-width="1000px" >
                        
        
              
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

                              
                                <v-container grid-list-md text-xs-center>
                                    <v-layout row wrap>


                                        <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                            
                                            <v-autocomplete name="indicios"   
                                                :items="indicios"
                                                v-model="indicio2"
                                                return-object 
                                                @change="listardetalles"
                                                label="Indicios:">
                                            </v-autocomplete>
                                        </v-flex>

                                        <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                            <v-autocomplete name="detalles"   
                                                :items="detalles"
                                                v-model="detalle"
                                                return-object 
                                                label="Detalles:">
                                            </v-autocomplete>
                                        </v-flex>


                                        <v-flex class="espaciado" xs12 sm12 md6 lg6>

                                            <v-list two-line> 

                                                <v-list-tile>  
                                                    <v-list-tile-action>
                                                        <v-icon color="success">apartment</v-icon>
                                                    </v-list-tile-action> 
                                                    <v-list-tile-content   >  
                                                        <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Lugar de origen:</a></p> </v-list-tile-title> 
                                                        <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{detalle.lo}}</a></p>  </v-list-tile-sub-title>  
                                                    </v-list-tile-content> 
                                                </v-list-tile>

                                                <v-list-tile>  
                                                    <v-list-tile-action>
                                                        <v-icon color="success">apartment</v-icon>
                                                    </v-list-tile-action> 
                                                    <v-list-tile-content   >  
                                                        <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Lugar de destino:</a></p> </v-list-tile-title> 
                                                        <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{detalle.ld}}</a></p>  </v-list-tile-sub-title>  
                                                    </v-list-tile-content> 
                                                </v-list-tile>
                                                                                                                                           
                                            </v-list> 

                                        </v-flex>

                                        <v-flex class="espaciado" xs12 sm12 md6 lg6>

                                            <v-list two-line> 

                                                <v-list-tile>  
                                                    <v-list-tile-action>
                                                        <v-icon color="success">accessibility</v-icon>
                                                    </v-list-tile-action> 
                                                    <v-list-tile-content   >  
                                                        <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Quién entrega:</a></p> </v-list-tile-title> 
                                                        <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{detalle.qe}}</a></p>  </v-list-tile-sub-title>  
                                                    </v-list-tile-content> 
                                                </v-list-tile>

                                                <v-list-tile>  
                                                    <v-list-tile-action>
                                                        <v-icon color="success">accessibility_new</v-icon>
                                                    </v-list-tile-action> 
                                                    <v-list-tile-content   >  
                                                        <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Quién recibe:</a></p> </v-list-tile-title> 
                                                        <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{detalle.qr}}</a></p>  </v-list-tile-sub-title>  
                                                    </v-list-tile-content> 
                                                </v-list-tile>
                                                                                                                                           
                                            </v-list> 

                                        </v-flex>



                                
                                    </v-layout>
                                </v-container>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn  @click.native="dialogoindicio2 = false" >Cerrar</v-btn>
                                    
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
  import { error } from 'util';
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

        diligencias:[],
        peritos:[],
        perito:'',
        personaid:'',
        rDiligenciasId:'',
        fidPeritoAsignado:'',
        dialogarchivo:'',
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
        detalleslist:[],
        dialogoindicio:'',
        indiciosd:'',
        origenlugar:'',
        origendestino:'',
        quienentrega:'',
        quienrecibe:'',
        idindicio:'',
        indicioregistro:'',
        dialogoindicio2:false,
        detalles:[],
        detalle:'',
        indicio2:'',
        indicios:[],
        indicio:[],
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

            { text: 'Emitida por', value: 'emitidoPor', sortable: true  }, 
            { text: 'NUC',value: 'nuc' }, 
            { text: 'Numero Interno',value: 'numeroInterno' }, 
            { text: 'Modulo', value: 'modulo', sortable: true  }, 
            { text: 'Fecha Recibido', value: 'Fecharecibido' },
            { text: 'Fecha de Aceptacíon', value: 'fechaAceptado' }, 
            { text: 'Fecha de Finalizacíon', value: 'fechaFinalizado' },
            { text: 'Fecha de Entregado', value: 'fechaEntregado' },
            { text: 'Perito',value: 'modulo' }, 
            { text: 'Status',value: 'status' }, 
            { text: 'Opciones', value: 'opciones' },           
        ],
        headersd: [

            { text: 'Fecha', value: 'fechaHora' }, 
            { text: 'Origen Lugar', value: 'origenLugar' }, 
            { text: 'Destino Lugar', value: 'destinoLugar' }, 
            { text: 'Quien Entrega', value: 'quienEntrega', sortable: false }, 
            { text: 'Quien Recibe', value: 'quienRecibe', sortable: false },
                                            
        ],
        search: '',
        searchd:'',
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
                return this.indiciosd === -1 ? 'Entrega de informe' : 'Lista de detalles del indicio'
            },
      formIcon () {
                return this.indiciosd === -1 ? 'add' : 'assignment'
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

        VerDetallesIndicios(item){ 
            var arrayindicio = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.limpiar();

            me.$SP.get('api/DiligenciaIndicio/ListarIndicios/'+ item.rDiligenciasId,configuracion).then(function(response){

                arrayindicio = response.data;
                arrayindicio.map(function(x){
                    me.indicios.push({text: x.dato, value: x.indiciosId});
                });

                me.indicio2 = ''
                me.detalle = ''
                me.detalles = []
                me.dialogoindicio2= true;
                

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
        listardetalles(){ 
            var arraydetalle = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.limpiar();

            me.$CAT.get('api/Indicios/ListarD/'+ me.indicio2.value,configuracion).then(function(response){

                arraydetalle = response.data;
                arraydetalle.map(function(x){
                    me.detalles.push({text: x.fechasys, lo: x.origenLugar , ld :x.destinoLugar , qe:x.quienEntrega, qr:x.quienRecibe});
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
        agregardetalle(item){
            let me = this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var arrayindicio = ''
            me.rDiligenciasId = item.rDiligenciasId;
            me.fidPeritoAsignado = item.idPeritoAsignado;           
                    if(item.dConIndicio){


                      me.$SP.get('api/DiligenciaIndicio/ListarIndicios/'+ item.rDiligenciasId,configuracion).then(function(response){

                            arrayindicio = response.data;
                            arrayindicio.map(function(x){
                                me.indicios.push({text: x.dato, value: x.indiciosId});
                            });
                            me.dialogoindicio= true;

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
                    else{
                        me.$CAT.put('api/RDiligencias/Actualizarstatus',{

                                    'idRDiligencias': me.rDiligenciasId,
                                    'statusRespuesta': "Entregado"       

                                },configuracion).then(function(response){                            
                                    me.$notify('La información se actualizo correctamente !!!','success')

                                    me.$SP.put('api/PeritoAsignado/ActualizarFechaEntregado',{ 
                                            'idPeritoAsignado': me.fidPeritoAsignado,                                  
                                            'fechaEntregado':me.generarfecha()                                 
                                            
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
        salvardetalle(){
            this.$validator.validate().then(result => {
                if (result) {
                        let me=this;
                        let header={"Authorization" : "Bearer " + this.$store.state.token};
                        let configuracion= {headers : header};     
                        
                        for(var i =0;i<me.indicio.length;i++){

                            me.$CAT.post('api/Indicios/CrearDetalle',{
                            'indiciosId' : me.indicio[i].value,
                            'fechasys' : me.generarfecha(),
                            'origenLugar': me.origenlugar,
                            'destinoLugar':me.origendestino,
                            'quienentrega':me.quienentrega,
                            'quienrecibe': me.quienrecibe
            
                            },configuracion).then(function(response){

                                me.$CAT.put('api/RDiligencias/Actualizarstatus',{

                                    'idRDiligencias': me.rDiligenciasId,
                                    'statusRespuesta': "Entregado"       

                                },configuracion).then(function(response){                            
                                    me.$notify('La información se actualizo correctamente !!!','success')

                                    me.$SP.put('api/PeritoAsignado/ActualizarFechaEntregado',{ 
                                            'idPeritoAsignado': me.fidPeritoAsignado,                                  
                                            'fechaEntregado':me.generarfecha()                                 
                                            
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

                        }
                        
                    } 
                })


        },
        close () {
                this.dialogarchivo = false;
                this.dialog = false;
                this.dialogoindicio = false;
                this.limpiar();
        },
        limpiar(){    
            let me = this;
                me.conclusion = '';    
                me.descripciondocumento='';
                me.imageName="";
                me.imageFile ="";
                me.imageUrl ="";
                me.origenlugar='';
                me.origendestino='';
                me.quienentrega='';
                me.quienrecibe='';
            
        },
        generarfecha(){
            var fecha;
            fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY")+ ", "+ moment().format('h:mm:ss a');
            return fecha;      
        },         
        listar(){
          let me=this;  
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header};


            if(me.esPerito){
              me.$SP.get('api/PeritoAsignado/Listarporid2/'+ me.u_idmoduloservicio,configuracion).then(function(response){
                    //console.log(response);
                    me.bdoperito=response.data;
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
            else if(me.esOficialiapartes){
              me.$SP.get('api/PeritoAsignado/Listarporagencia/'+ me.u_idagencia,configuracion).then(function(response){
                    //console.log(response);
                    me.bdoperito=response.data;
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
                
        },       
      } 
   }
</script>
<style>
</style>