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
                <v-toolbar-title class="font-weight-regular">Media filiación.</v-toolbar-title>
                <v-divider class="mx-2" inset vertical />
                <v-spacer />
                <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details />
                <v-spacer />
                     <v-flex xs12 sm6 md3>
                      
                        <v-text-field class="font-weight-regular"
                            v-model="nuc" disabled  prepend-icon="folder"
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
                :items="listaimputados"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">
 
                    <td>{{ props.item.nombreImputado }}</td> 
                    <td>{{ formatearfechahora(props.item.fechaSys) }}</td> 
                    <td>{{ props.item.distrito }}</td> 
                    <td>{{ props.item.agencia }}</td>   
                    <td>{{ props.item.usuario }}</td>  
                    <td>{{ props.item.puesto}}</td>
                    
            
                    
                    <td class="justify-center layout px-0"> 
                             <v-tooltip bottom   >
                                <template v-slot:activator="{ on }"> 
                             
                                  <v-icon 
                                        class="mr-2" v-on="on"
                                        @click="editItem(props.item)"
                                        >
                                        edit
                                    </v-icon>
                                </template>
                                <span>Actualizar información</span>
                            </v-tooltip> 
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }"> 
                             
                                  <v-icon  color ="warning"
                                        class="mr-2" v-on="on"
                                        @click="imprimirItem(props.item)"
                                        >
                                        print
                                    </v-icon>
                                </template>
                                <span>Imprimir media filiación</span>
                            </v-tooltip> 

                              <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" 
                                        @click="loadarchive(props.item)"
                                        >
                                       publish
                                    </v-icon> 
                                </template>
                                <span>Subir Archivo</span>
                            </v-tooltip>  

                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" 
                                        @click="consultararchivo(props.item)"
                                        >
                                       pageview
                                    </v-icon> 
                                </template>
                                <span>Consultar Archivos</span>
                            </v-tooltip>  
                       
                    </td> 
                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listarPersonas()">Resetear</v-btn>
                </template>
        </v-data-table>
          
        

        <v-dialog v-model="modalAdd" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            
            <v-toolbar-title>{{  formTitle }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn color="success" text @click.native="verpdf()">Vista Previa</v-btn>
            </v-toolbar-items>
            <v-btn icon @click="close()">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-divider></v-divider>


            <v-card    elevation=0 class="mb-5" height="auto">

              <v-form ref="form" data-vv-scope="crear">  
                        <v-container grid-list-sm    >
                            <v-layout wrap justify-space-between>
                               
                            <v-flex class="espaciado2" xs12 sm12 md12 lg12> 

                                <v-container grid-list-sm    >
                                    <v-layout wrap justify-space-between>

                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4>  

                                            <v-autocomplete name="persona"  
                                                :items="personas"
                                                v-model="personaId" 
                                                return-object
                                                v-validate="'required'" 
                                                data-vv-scope="crear"
                                                label="*Persona a la cual se va a registrar su media filiación:"
                                                :error-messages="errors.collect('crear.persona')">
                                            </v-autocomplete>

                                            <v-select name="grupo sanguineo"   
                                                :items="gruposanguineos"
                                                v-model="gruposanguineo" 
                                                label="Grupo sanguineo:"
                                                data-vv-scope="crear"
                                                :error-messages="errors.collect('crear.grupo sanguineo')">
                                            </v-select> 

                                            <v-select name="tipo de frente"   
                                                :items="tipofrente"
                                                v-model="v_tfrente"  
                                                label="Tipo de frente:"
                                                data-vv-scope="crear"
                                                :error-messages="errors.collect('crear.tipo de frente')">
                                            </v-select>    

                                            <v-select name="lateralidad"   
                                                :items="lateralidades"
                                                v-model="lateralidade"  
                                                label="Lateralidad:"
                                                data-vv-scope="crear"
                                                :error-messages="errors.collect('crear.lateralidad')">
                                            </v-select>           

                                        </v-flex>

                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4> 

                                            <v-text-field
                                                label="Estatura:"
                                                name ="estatura"
                                                v-model="estatura"
                                                data-vv-scope="crear"
                                                :error-messages="errors.collect('crear.estatura')"> 
                                            </v-text-field>

                                            <v-select name="tipo de complexion"   
                                                :items="complexiontipo"
                                                v-model="complexion"  
                                                label="Complexión:"
                                                data-vv-scope="crear"
                                                :error-messages="errors.collect('crear.complexión')">
                                            </v-select>     


                                            <v-select name="tez"   
                                                :items="Tez"
                                                v-model="tez" 
                                                label="Tez:"
                                                data-vv-scope="crear"
                                                :error-messages="errors.collect('crear.tez')">
                                            </v-select>

                                            <v-select name="pomulo"   
                                                :items="pomulos"
                                                v-model="pomulo" 
                                                label="Pomulo:"
                                                data-vv-scope="crear"
                                                :error-messages="errors.collect('crear.pomulo')">
                                            </v-select>

                                        </v-flex>

                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4> 

                                            <v-text-field
                                                label="Peso:"
                                                name ="tipo de peso"
                                                v-model="peso"
                                                data-vv-scope="crear"
                                                :error-messages="errors.collect('crear.peso')"> 
                                            </v-text-field>

                                            <v-select name="Forma de cara"   
                                                :items="formacaras"
                                                v-model="formacara" 
                                                label="Forma de la cara:"
                                                data-vv-scope="crear"
                                                :error-messages="errors.collect('crear.forma de la cara')">
                                            </v-select>

                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-flex>
                            
                            
                            <v-flex  class="espaciado4" xs3 sm3 md3 lg3>  

                                <v-menu
                                    ref="menu1"
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="800px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="success" v-on="on" >Cabello</v-btn>    
                                    </template>

                                    <v-flex   xs12 sm12 md12 lg12> 
                
                                        <v-card shaped class="mx-auto" >

                                            <v-toolbar
                                                color="primary"
                                                dark>

                                                <v-icon >info</v-icon>

                                                <v-toolbar-title>Cabello</v-toolbar-title>

                                                <v-spacer></v-spacer>

                                            </v-toolbar>

                                            <v-card-text>
                                                <v-container grid-list-sm    >
                                                    <v-layout wrap justify-space-between>

                                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4>  

                                                            <v-select name="longitud de cabello"   
                                                                :items="largocabellos"
                                                                v-model="largocabello" 
                                                                label="Longitud de cabello:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.longitud de cabello')">
                                                            </v-select>

                                                            <v-select name="calvicie"   
                                                                :items="calvicies"
                                                                v-model="calvicie" 
                                                                label="Calvicie:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.calvicie')">
                                                            </v-select>

                                                        </v-flex>

                                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4> 

                                                            <v-select name="tipo de cabello"   
                                                                :items="tipocabellos"
                                                                v-model="tipocabello" 
                                                                label="Tipo de cabello:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.tipo de cabello')">
                                                            </v-select>   

                                                            <v-select name="tratamientos químicos de cabello"   
                                                                :items="tratamientoquimicos"
                                                                v-model="tratamientoquimico" 
                                                                label="Tratamientos químicos de cabello:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.tratamientos químicos de cabello')">
                                                            </v-select>                                           

                                                        </v-flex>

                                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4> 

                                                            <v-select name="color de cabello"   
                                                                :items="colorcabellos"
                                                                v-model="colocabello" 
                                                                label="Color de cabello:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.color de cabello')">
                                                            </v-select>

                                                        </v-flex>
                                                    </v-layout>
                                                </v-container>
                                            </v-card-text> 
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn @click="menu1=false" color="primary">Cerrar</v-btn>
                                            </v-card-actions>
                                        </v-card> 
                                    </v-flex>
                                </v-menu>

                                <v-menu
                                    v-model="menu5"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="800px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="success" v-on="on" >Nariz</v-btn>    
                                    </template>

                                    <v-flex   xs12 sm12 md12 lg12> 
                
                                        <v-card shaped class="mx-auto" >

                                            <v-toolbar
                                                color="primary"
                                                dark>

                                                <v-icon >info</v-icon>

                                                <v-toolbar-title>Nariz</v-toolbar-title>

                                                <v-spacer></v-spacer>

                                            </v-toolbar>

                                            <v-card-text>

                                                <v-container grid-list-sm    >
                                                    <v-layout wrap justify-space-between>
                                                        
                                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4> 
                                                            
                                                            <v-select name ="altura de nariz"
                                                                :items="alturanarices"
                                                                v-model="alturanariz"
                                                                label="Altura de nariz:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.altura de nariz')"> 
                                                            </v-select>


                                                        </v-flex>

                                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4>  
                                                            
                                                            <v-select name="dorso de nariz"   
                                                                :items="dorsonarices"
                                                                v-model="dorsonariz" 
                                                                label="Dorso de nariz:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.dorso de nariz')">
                                                            </v-select>

                                                        </v-flex>
                                                
                                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4> 
                                                            
                                                            <v-select name="punta de nariz"   
                                                                :items="puntasnariz"
                                                                v-model="puntanariz" 
                                                                label="Punta de nariz:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.punta de nariz')">
                                                            </v-select>


                                                        </v-flex>

                                                    </v-layout>
                                                </v-container>
                                                
                                            

                                            </v-card-text> 
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn @click="menu5=false" color="primary">Cerrar</v-btn>
                                            </v-card-actions>
                                        </v-card> 
                                    </v-flex>
                                </v-menu>

                            </v-flex>

                            <v-flex  class="espaciado4" xs3 sm3 md3 lg3>  

                                <v-menu
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="800px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="success" v-on="on" >Orejas</v-btn>    
                                    </template>

                                    <v-flex   xs12 sm12 md12 lg12> 
                
                                        <v-card shaped class="mx-auto" >

                                            <v-toolbar
                                                color="primary"
                                                dark>

                                                <v-icon >info</v-icon>

                                                <v-toolbar-title>Orejas</v-toolbar-title>

                                                <v-spacer></v-spacer>

                                            </v-toolbar>

                                            <v-card-text>

                                                <v-container grid-list-sm    >
                                                    <v-layout wrap justify-space-between>

                                                        <v-flex  class="espaciado2" xs12 sm6 md6 lg6>  

                                                            <v-select name="tamaño de orejas"   
                                                                :items="tamanoorejas"
                                                                v-model="tamanooreja" 
                                                                label="Tamaño de orejas:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.tamaño de orejas')">
                                                            </v-select> 

                                                        </v-flex>

                                                        <v-flex  class="espaciado2" xs12 sm6 md6 lg6> 

                                                            <v-select name="adherencia orejas"   
                                                                :items="aderenciarorejas"
                                                                v-model="aderenciaroreja" 
                                                                label="Adherencia orejas:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.adherencia orejas')">
                                                            </v-select>                                         

                                                        </v-flex>

                                                    </v-layout>
                                                </v-container>
                                                
                                            </v-card-text> 
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn @click="menu2=false" color="primary">Cerrar</v-btn>
                                            </v-card-actions>
                                        </v-card> 
                                    </v-flex>
                                </v-menu>

                                <v-menu
                                    v-model="menu6"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="800px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="success" v-on="on" >Menton</v-btn>    
                                    </template>

                                    <v-flex   xs12 sm12 md12 lg12> 
                
                                        <v-card shaped class="mx-auto" >

                                            <v-toolbar
                                                color="primary"
                                                dark>

                                                <v-icon >info</v-icon>

                                                <v-toolbar-title>Menton</v-toolbar-title>

                                                <v-spacer></v-spacer>

                                            </v-toolbar>

                                            <v-card-text>
                                                
                                                <v-container grid-list-sm    >

                                                    <v-layout wrap justify-space-between>
                                                        
                                                        <v-flex  class="espaciado2" xs12 sm6 md6 lg6> 

                                                            <v-select name="forma de menton"   
                                                                :items="formamenton"
                                                                v-model="v_fmenton" 
                                                                label="Forma de mentón:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.forma de menton')">
                                                            </v-select> 

                                                        </v-flex>

                                                        <v-flex  class="espaciado2" xs12 sm6 md6 lg6>  

                                                            <v-select name="tipo de menton"   
                                                                :items="tipomentons"
                                                                v-model="tipomenton" 
                                                                label="Tipo de menton:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.tipo de menton')">
                                                            </v-select> 
                                                            
                                                        </v-flex>
                                            
                                                    </v-layout>
                                                </v-container>


                                            </v-card-text> 
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn @click="menu6=false" color="primary">Cerrar</v-btn>
                                            </v-card-actions>
                                        </v-card> 
                                    </v-flex>
                                </v-menu>

                            </v-flex>
                            
                            <v-flex  class="espaciado4" xs3 sm3 md3 lg3> 

                                <v-menu
                                    v-model="menu3"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="800px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="success" v-on="on" >Ojos</v-btn>    
                                    </template>

                                    <v-flex   xs12 sm12 md12 lg12> 
                
                                        <v-card shaped class="mx-auto" >

                                            <v-toolbar
                                                color="primary"
                                                dark>

                                                <v-icon >info</v-icon>

                                                <v-toolbar-title>Ojos</v-toolbar-title>

                                                <v-spacer></v-spacer>

                                            </v-toolbar>

                                            <v-card-text>

                                                <v-container grid-list-sm    >
                                                    <v-layout wrap justify-space-between>
                                                        
                                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4> 
                                                            
                                                            <v-select name="tamaño de ojo"   
                                                                :items="tipoojos"
                                                                v-model="tipoojo" 
                                                                label="Tamaño de ojos:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.tamaño de ojos')">
                                                            </v-select> 

                                                            <v-switch
                                                                color="success"
                                                                v-model="pupilentes"
                                                                :label="`Pupilentes: ${textosino4}`"
                                                            ></v-switch>

                                                        </v-flex>

                                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4>  

                                                            <v-select name="Color de ojos"   
                                                                :items="Colorojos"
                                                                v-model="colorojo" 
                                                                label="Color de ojos:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.color de ojos')">
                                                            </v-select>

                                                        </v-flex>
                                                
                                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4> 
                                                            
                                                            <v-select name="forma de ojo"   
                                                                :items="formaojos"
                                                                v-model="formaojo" 
                                                                label="Forma de ojo:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.forma de ojo')">
                                                            </v-select> 

                                                        </v-flex>

                                                    </v-layout>
                                                </v-container>

                                                
                                                
                                            </v-card-text> 
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn @click="menu3=false" color="primary">Cerrar</v-btn>
                                            </v-card-actions>
                                        </v-card> 
                                    </v-flex>
                                </v-menu> 

                                <v-menu
                                    v-model="menu7"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="800px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="success" v-on="on" >Boca</v-btn>    
                                    </template>

                                    <v-flex   xs12 sm12 md12 lg12> 
                
                                        <v-card shaped class="mx-auto" >

                                            <v-toolbar
                                                color="primary"
                                                dark>

                                                <v-icon >info</v-icon>

                                                <v-toolbar-title>Boca</v-toolbar-title>

                                                <v-spacer></v-spacer>

                                            </v-toolbar>

                                            <v-card-text>
                                                
                                                <v-container grid-list-sm    >

                                                    <v-layout wrap justify-space-between>

                                                        <v-flex  class="espaciado2" xs12 sm6 md6 lg6>  

                                                            <v-select name="tamaño de boca"   
                                                                :items="tamañoboca"
                                                                v-model="v_tboca" 
                                                                label="Tamaño de boca:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.tamaño de boca')">
                                                            </v-select> 
                                                                                                                
                                                        </v-flex>
                                                        
                                                        <v-flex  class="espaciado2" xs12 sm6 md6 lg6> 
                                                            
                                                            <v-select name="grosor de labios"   
                                                                :items="grosorlabios"
                                                                v-model="v_glabios" 
                                                                label="Grosor de labios:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.grosor de labios')">
                                                            </v-select>

                                                        </v-flex>

                                                    </v-layout>

                                                </v-container>

                                            </v-card-text> 
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn @click="menu7=false" color="primary">Cerrar</v-btn>
                                            </v-card-actions>
                                        </v-card> 
                                    </v-flex>
                                </v-menu>

                            </v-flex>

                            <v-flex  class="espaciado4" xs3 sm3 md3 lg3> 

                                <v-menu
                                    v-model="menu4"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="800px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="success" v-on="on" >Cejas</v-btn>    
                                    </template>

                                    <v-flex   xs12 sm12 md12 lg12> 
                
                                        <v-card shaped class="mx-auto" >

                                            <v-toolbar
                                                color="primary"
                                                dark>

                                                <v-icon >info</v-icon>

                                                <v-toolbar-title>Cejas</v-toolbar-title>

                                                <v-spacer></v-spacer>

                                            </v-toolbar>

                                            <v-card-text>
                                                
                                                <v-container grid-list-sm >
                                                    <v-layout wrap justify-space-between>
                                                        
                                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4> 
                                                            
                                                            <v-select name="tamaño de ceja"   
                                                                :items="tamanocejas"
                                                                v-model="tamanoceja" 
                                                                label="Tamaño de ceja:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.tamaño de ceja')">
                                                            </v-select>

                                                        </v-flex>

                                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4>  
                                                            
                                                            <v-select name="Forma de Cejas"   
                                                                :items="formacejas"
                                                                v-model="formaceja" 
                                                                label="Forma de Cejas:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.Forma de Cejas')">
                                                            </v-select> 

                                                        </v-flex>
                                                
                                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4> 
                                                            
                                                            <v-select name="implantación ceja"   
                                                                :items="implantacioncejas"
                                                                v-model="implantacionceja" 
                                                                label="Implantación ceja:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.implantación ceja')">
                                                            </v-select> 

                                                        </v-flex>

                                                    </v-layout>
                                                </v-container>
    
                                            </v-card-text> 
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn @click="menu4=false" color="primary">Cerrar</v-btn>
                                            </v-card-actions>
                                        </v-card> 
                                    </v-flex>
                                </v-menu>

                                <v-menu
                                    v-model="menu8"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="1280px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="success" v-on="on" >Señas particulares</v-btn>    
                                    </template>

                                    <v-flex   xs12 sm12 md12 lg12> 
                
                                        <v-card shaped class="mx-auto" >

                                            <v-toolbar
                                                color="primary"
                                                dark>

                                                <v-icon >info</v-icon>

                                                <v-toolbar-title>Señas particulares</v-toolbar-title>

                                                <v-spacer></v-spacer>

                                            </v-toolbar>

                                            <v-card-text>
                                                
                                                <v-container grid-list-sm    >

                                                    <v-layout wrap justify-space-between>

                                                        <v-flex  class="espaciado2" xs12 sm6 md6 lg6>  

                                                            <v-switch
                                                                color="success"
                                                                v-model="cicatriz"
                                                                :label="`Cicatriz: ${textosino}`"
                                                            ></v-switch>

                                                            <v-text-field 
                                                                v-if="cicatriz"
                                                                name="localización y descripción cicatriz (tipo/ forma/tamaño):" 
                                                                label="Localización y descripción cicatriz (tipo/ forma/tamaño):" 
                                                                v-model="textocicatriz"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.Localización y descripción cicatriz (tipo/ forma/tamaño)')">                                          
                                                            </v-text-field> 
                                                                                                                
                                                        </v-flex>
                                                        
                                                        <v-flex  class="espaciado2" xs12 sm6 md6 lg6> 

                                                            <v-switch
                                                                color="success"
                                                                v-model="tatuaje"
                                                                :label="`Tatuajes: ${textosino2}`"
                                                            ></v-switch>  

                                                            <v-text-field 
                                                                v-if="tatuaje"
                                                                name="localización y descripción tatuajes (tipo/ forma/tamaño):" 
                                                                label="Localización y descripción tatuajes (tipo/ forma/tamaño):" 
                                                                v-model="textotatuaje"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.Localización y descripción tatuajes (tipo/ forma/tamaño)')">                                          
                                                            </v-text-field>                                         

                                                        </v-flex>

                                                        <v-flex  class="espaciado2" xs12 sm12 md12 lg12>

                                                            <v-text-field 
                                                                name="Otras características importantes para la identificación: (Lunares, pecas, verrugas, estrías, amputaciones, callosidades, deformidades,perforaciones, manchas, bigote, barba, fracturas, prótesis etc.):" 
                                                                label="Otras características importantes para la identificación: (Lunares, pecas, verrugas, estrías, amputaciones, callosidades, deformidades,perforaciones, manchas, bigote, barba, fracturas, prótesis etc.)" 
                                                                v-model="otrascarac"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.Otras características importantes para la identificación: (Lunares, pecas, verrugas, estrías, amputaciones, callosidades, deformidades,perforaciones, manchas, bigote, barba, fracturas, prótesis etc.)')">                                          
                                                            </v-text-field>

                                                        </v-flex>

                                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4> 
                                                            <v-select name="Tamaño dental"   
                                                                :items="tamanodentals"
                                                                v-model="tamanodental" 
                                                                label="Tamaño dental:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.Tamaño dental')">
                                                            </v-select>

                                                        </v-flex>

                                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4> 
                                                            <v-select name="Tratamiento dental"   
                                                                :items="tratamientodentals"
                                                                v-model="tratamientodental" 
                                                                label="Tratamiento dental:"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.Tratamiento dental')">
                                                            </v-select>


                                                        </v-flex>

                                                        <v-flex  class="espaciado2" xs12 sm6 md4 lg4> 

                                                            <v-text-field 
                                                                v-if="tratamientodental == 'Otro'"
                                                                name="Otro" 
                                                                label="Otro(tratamiento dental):" 
                                                                v-model="otrotratamiento"
                                                                data-vv-scope="crear"
                                                                :error-messages="errors.collect('crear.Otro')">                                          
                                                            </v-text-field> 

                                                        </v-flex>

                                                        <v-flex  xs12 sm12 md12 lg12>

                                                            <v-container grid-list-sm    >
                                                                <v-layout wrap justify-space-between>
                                                                    
                                                                    <v-flex  class="espaciado3" xs12 sm6 md4 lg4> 

                                                                        <v-switch
                                                                            color="success"
                                                                            v-model="dentaduracompleta"
                                                                            :label="`Dentadura completa: ${textosino3}`"
                                                                        ></v-switch> 

                                                                    </v-flex>

                                                                    <v-flex  class="espaciado3" xs12 sm6 md4 lg4> 

                                                                        <v-text-field 
                                                                            v-if="!dentaduracompleta"
                                                                            name="Dientes ausentes" 
                                                                            label="Dientes ausentes:" 
                                                                            v-model="dientesausentes"
                                                                            data-vv-scope="crear"
                                                                            :error-messages="errors.collect('crear.Dientes ausentes')">                                          
                                                                        </v-text-field> 

                                                                    </v-flex>

                                                                    <v-flex  class="espaciado3" xs12 sm6 md4 lg4> 

                                                                        <v-select name="Tipo de dentadura"  
                                                                            v-if="!dentaduracompleta" 
                                                                            :items="tipodentaduras"
                                                                            v-model="tipodentadura" 
                                                                            label="Tipo de dentadura:"
                                                                            data-vv-scope="crear"
                                                                            :error-messages="errors.collect('crear.Tipo de dentadura')">
                                                                        </v-select>

                                                                    </v-flex>

                                                                </v-layout>
                                                            </v-container>
                                                        </v-flex>

                                                    </v-layout>

                                                </v-container>

                                            </v-card-text> 
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn @click="menu8=false" color="primary">Cerrar</v-btn>
                                            </v-card-actions>
                                        </v-card> 
                                    </v-flex>
                                </v-menu> 

                            </v-flex>

                        </v-layout>
                            
                    </v-container>
                </v-form>
            </v-card>    
        </v-card>
        
      </v-dialog>

       <v-dialog v-model="modaldocumento" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
               
                <v-toolbar-title>Documento.</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn  v-if="editedIndex == -1" color=success text @click.native="guardar()">
                   Guardar e imprimir
                </v-btn>
                <v-btn v-if="editedIndex == 1" color=success text @click.native="actualizar()">
                   Actualizar e imprimir
                </v-btn>
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



        <v-dialog  v-model="dialogarchivo"  max-width="1000px" >

                        <v-card>
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">add</v-icon>
                                </v-avatar>
                    
                
                        <v-toolbar-title class="subheading">Subir archivo</v-toolbar-title>
                        <v-spacer></v-spacer>
                    
                        
                        </v-toolbar>
                        <v-card-text>
                          <v-form ref="form" data-vv-scope="dialogodocs" >
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                    <v-flex xs12 sm12 md12>
                                        
                                        <v-card>
                                            <v-container fluid grid-list-md>
                                                <v-layout row wrap>
                                                    <v-flex class="text-md-center">  
                                                        <img   :src="imageUrl"  height="250px"  v-if="imageUrl"/>  
                                                    </v-flex>
                                                </v-layout>
                                            </v-container>
                                        </v-card>

                                         <v-text-field 
                                         name="imagen"
                                         label="Selecciona la imagen del documento de identificacion" 
                                         @click='pickFile'  
                                         v-model='imageName' 
                                         prepend-icon='attach_file'
                                         data-vv-scope="dialogodocs"
                                         :error-messages="errors.collect('dialogodocs.imagen')"
                                         ></v-text-field>


                                        <input
                                        type="file"
                                        style="display: none"
                                        ref="image"
                                        accept="image/*"
                                        @change="onFilePicked"
                                        >

                                        <v-autocomplete name="tipo de archivo" 
                                                :items="tiposdocumentos"
                                                v-model="tiposdocumento" 
                                                return-object  
                                                data-vv-scope="dialogodocs"
                                                label="Tipo de archivo:"
                                                :error-messages="errors.collect('dialogodocs.tipo de archivo')">
                                         </v-autocomplete>
                
                                        <v-text-field 
                                        name="descripcíon de documento" 
                                        label="Descripcíon del documento" 
                                        v-model='descripciondocumento' 
                                        data-vv-scope="dialogodocs"
                                        :error-messages="errors.collect('dialogodocs.descripcíon de documento')">                                   
                                         </v-text-field>

                                    </v-flex>
                                 
                                    </v-layout>
                                </v-container>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                   
                                    <v-btn  @click.native="dialogarchivo=false" >Cancelar</v-btn>
                                    <v-btn   @click="guardarArchivo()" class="success" >Guardar</v-btn>
                                    
                                </v-card-actions> 
                            </v-form>
                        
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
                          <v-form ref="form" data-vv-scope="dialogodetalle">
                                <v-container grid-list-md>
                                    <v-layout wrap>
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


                                        <v-card    auto-grow elevation="0">                                
                                            <v-card-text >
                                                <v-list three-line   > 
                                                    <p class="text-lg-center font-weight-bold"><a>Información detallada del Documento.</a></p> 
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">subject</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-4 font-weight-bold"><a>Descripción:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ descrip }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                    <v-list-tile>  
                                                        <v-list-tile-action>
                                                            <v-icon color="success">assignment</v-icon>
                                                        </v-list-tile-action> 
                                                        <v-list-tile-content   >  
                                                            <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Tipo de documento:</a></p> </v-list-tile-title> 
                                                            <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ tipo }}</a></p>  </v-list-tile-sub-title>  
                                                        </v-list-tile-content> 
                                                    </v-list-tile>
                                                </v-list>  
                                            </v-card-text> 
                                        </v-card>
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
        
        </v-flex>
</v-layout> 
</template>

 
<script> 
  import axios from 'axios'  
  import VeeValidate from 'vee-validate' 
  import { WebCam } from "vue-web-cam"; 
  import n401 from './401.vue'
  import n403 from './403.vue' 
    import { error } from 'util';
    import alertify from 'alertifyjs';
 import moment from 'moment'
  import 'moment/locale/es';


  var assert, curp, persona;
  assert = require('assert');
  curp = require('curp.js');  

  export default {
    components: {
        "vue-web-cam": WebCam,
        n401,
        n403
    },
    data: () => ({
        showpage:true,
        e401:false,
        e403:false,
        alert:false,
        modalAdd:0,   
        rapid:'',
        rAtencionId:'',
        rHechoId:'', 
        nuc:'', 
        //*************** */
        idMediaAfiliacion:'', 
        listaimputados:[],
        personas:[],
        personaId:'',
        complexion:'',
        peso:'',
        estatura:'',
        formacaras:[],
        formacara:'',
        colorojo:'',
        tez:'',
        formaCabell:'',
        colocabello:'',
        largocabello:'',
        v_tnariz:'',
        tamanonariz:'',
        dorsonariz:'',
        v_glabios:'',
        v_gnariz:'',
        v_tfrente:'',
        tamanoceja:'',
        formaceja:'',
        v_tboca:'',
        tamanooreja:'',
        v_fmenton:'',
        tipoojo:'',
        v_datos:['Chica','Mediana',], 
        numerooficio:'',
        dialogarchivo:false,
        dialogpictures:'',

        v_distrito:'',
        v_dirSubPro:'', 
        v_agencia:'', 
        v_usuario:'', 
        v_puesto:'', 
        complexiontipo:[],
        Colorojos:[],
        Tez:[],
        tipocabellos:[],
        tipocabello:'',
        colorcabellos:[],
        largocabellos:[],
        dorsonarices:[],
        grosorlabios:[],
        tipofrente:[],
        tamanocejas:[],
        formacejas:[],
        tamañoboca:[],
        tamanoorejas:[],
        formamenton:[],
        tipoojos:[],
        agenciainfo:[
            { text: 'direccion', value: '' },
            { text: 'telefono', value: '' },   
        ],     
        agenciaid:'',
        fechas:'',
        personanombre:'',
        menu1:false,
        menu2:false,
        menu3:false,
        menu4:false,
        menu5:false,
        menu6:false,
        menu7:false,
        menu8:false,
        cicatriz:false,
        tatuaje:false,
        dentaduracompleta:true,
        pupilentes:false,

        calvicies:[],
        calvicie:'',

        tratamientoquimicos:[],
        tratamientoquimico:'',

        aderenciarorejas:[],
        aderenciaroreja:'',

        formaojos:[],
        formaojo:'',

        implantacioncejas:[],
        implantacionceja:'',

        puntasnariz:[],
        puntanariz:'',

        tipomentons:[],
        tipomenton:'',

        otrascarac:'',    

        tamanodentals:[],
        tamanodental:'',

        tratamientodentals:[],
        tratamientodental:'',

        tamanodentals:[],
        tamanodental:'',

        tratamientodental:'',

        gruposanguineos: [      
            { text: 'A RH+', value: 'A RH+' },
            { text: 'B RH+', value: 'B RH+' },
            { text: 'AB RH+', value: 'AB RH+'},
            { text: 'O RH+', value: 'O RH+' },
            { text: 'A RH-', value: 'A RH-' },
            { text: 'B RH-', value: 'B RH-' },
            { text: 'AB RH-', value: 'AB RH-'},
            { text: 'O RH-', value: 'O RH-' }
        ],
        gruposanguineo:'',

        alturanarices:[],
        alturanariz:'',
        
        tipodentaduras:[],
        tipodentadura:'',

        dientesausentes:'',

        tamañonariz:'',

        textocicatriz:'',

        textotatuaje:'',

        otrotratamiento:'',

        lateralidades:[
            { text: 'Ambidiestro', value: 'Ambidiestro', },
            { text: 'Diestro', value: 'Diestro' }, 
            { text: 'Siniestro', value: 'Siniestro',  },
                
        ],
        lateralidade:'',
        pomulos:[],
        pomulo:'',
        //*************** */
        headers: [
           
            { text: 'Nombre del Imputado', value: 'nombreImputado' },
            { text: 'Fecha  regsitro', value: 'fechaSys' },
            { text: 'Distrito', value: 'curp'},
            { text: 'Agencia', value: 'nombre' }, 
            { text: 'Usuario', value: 'medio de notificacion',  },
            { text: 'Puesto', value: 'correo electronico', },      
            { text: 'Opciones', value: 'opciones', sortable: false },                            
        ],
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
        editedIndex: -1,  
        impirmirIndex:-1,
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
        logo1:'',
        logo2:'',
        modaldocumento:false, 
        contenido:null,
        //-------------------------veriables para carga de imagenes---------------------------
        imageName: '',
        imageUrl: null,
        imageFile: '',
        descripciondocumento:'',
        GUID:'',
        tiposdocumentos:[
            {text:'Fotografías',value:'1'},
            {text:'Documentos',value:'2'},
            {text:'Resultados',value:'3'},
            {text:'Indicios',value:'4'},   
            {text:'Identficaciones',value:'5'},
            {text:'Entrevista',value:'6'},
            {text:'Inspección',value:'7'},     
            {text:'Aseguramiento',value:'8'}, 
            {text:'Cadena de custodia',value:'9'},            
        ],
        tiposdocumento:'',
        rutaconsulta:'',
        descrip:'',
        tipo:'',
        archivos:[],
        dialogimagen:false,
        searchar:'',
        headersar: [

            { text: 'TipoDocumento', value: 'fipoDocumento', sortable: true  },            
            { text: 'Opciones', value: 'opciones' }, 
         
        ],
    }),
       
    created () {
     
            let me = this 
            
            me.rHechoId = me.$store.state.rhechoid;
            me.rAtencionId = me.$store.state.ratencionid
            me.nuc = me.$store.state.nuc;
            if (me.rHechoId== null)
            {
                    me.$alert('Notificación', 'Aun no ha abierto ninguna carpeta por favor ingrese al menu Carpeta y luego en Listar carpeta y   ahi abra la carpeta que usted elija!. En este momento sera redireccionado al menu correspondiente.', 
                    function(){ 

                            me.$router.push('./carpetas')
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
                    // ****************************************************************************
                    me.listaMediaAfiliacion();
                    me.listarPersonas();
                    me.listarLogo();
                    me.listarcomplexion();
                    me.listarFormacara()
                    me.listarColorojos()
                    me.listartez()
                    me.listarformacabello()
                    me.listarcolorcabello()
                    me.listarlargocabello()
                    me.listartamañonariz()
                    me.listartiponariz()
                    me.listargrosorlabios()
                    me.listartipofrente()
                    me.listartipocejas()
                    me.listarformacejas()
                    me.listartamañoboca()
                    me.listartipoorejas()
                    me.listarformamenton()
                    me.listartipoojos()
                    me.listarrHecho();

                    me.listarpomulos();
                    me.listarcalvicie();
                    me.listartratamientosquimicos();
                    me.listaradherenciaorejas();
                    me.listarformadeojo();
                    me.listarimpnatacionceja();
                    me.listarpuntanariz();
                    me.listartipomenton();
                    me.listartamanodental();
                    me.listartratamientodental();
                    me.listartipodentadura();
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
        formTitle () {
            return this.editedIndex === -1 ? 'Registrar media filiación' : 'Actualizar información de media filiación'
        },
        formIcon () {
            return this.editedIndex === -1 ? 'add' : 'edit'
        },
        tituloMDocumento(){
            return this.editedIndex  === -1 ? 'Guardar e imprimir' : 'Actualizar e imprimir'
            return this.imprimirIndex  === -1 ? 'Guardar e imprimir' : 'Actualizar e imprimir'
        },
        textosino(){
            if(this.cicatriz)
                return 'Si'; else return 'No';
        },
        textosino2(){
            if(this.tatuaje)
                return 'Si'; else return 'No';
        },
        textosino3(){
            if(this.dentaduracompleta)
                return 'Si'; else return 'No';
        },
        textosino4(){
            if(this.pupilentes)
                return 'Si'; else return 'No';
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
        listarpomulos(){

            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Pomulos/Listar',configuracion).then(function(response){
                indiciosarray = response.data;
                indiciosarray.map(function(x){
                    me.pomulos.push({text: x.dato,value: x.dato});
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
        listarcalvicie(){

            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Calvicies/Listar',configuracion).then(function(response){
                indiciosarray = response.data;
                indiciosarray.map(function(x){
                    me.calvicies.push({text: x.dato,value: x.dato});
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
        listartratamientosquimicos(){

            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Tratamientos_Quimicos_Cabellos/Listar',configuracion).then(function(response){
                indiciosarray = response.data;
                indiciosarray.map(function(x){
                    me.tratamientoquimicos.push({text: x.dato,value: x.dato});
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
        listaradherenciaorejas(){

            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Adherencia_Orejas/Listar',configuracion).then(function(response){
                indiciosarray = response.data;
                indiciosarray.map(function(x){
                    me.aderenciarorejas.push({text: x.dato,value: x.dato});
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
        listarformadeojo(){

            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Forma_De_Ojos/Listar',configuracion).then(function(response){
                indiciosarray = response.data;
                indiciosarray.map(function(x){
                    me.formaojos.push({text: x.dato,value: x.dato});
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
        listarimpnatacionceja(){

            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Implantacion_Cejas/Listar',configuracion).then(function(response){
                indiciosarray = response.data;
                indiciosarray.map(function(x){
                    me.implantacioncejas.push({text: x.dato,value: x.dato});
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
        listarpuntanariz(){

            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Punta_Narizs/Listar',configuracion).then(function(response){
                indiciosarray = response.data;
                indiciosarray.map(function(x){
                    me.puntasnariz.push({text: x.dato,value: x.dato});
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
        listartipomenton(){

            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Tipo_De_Mentons/Listar',configuracion).then(function(response){
                indiciosarray = response.data;
                indiciosarray.map(function(x){
                    me.tipomentons.push({text: x.dato,value: x.dato});
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
        listartamanodental(){

            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Tamano_Dentals/Listar',configuracion).then(function(response){
                indiciosarray = response.data;
                indiciosarray.map(function(x){
                    me.tamanodentals.push({text: x.dato,value: x.dato});
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
        listartratamientodental(){

            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Tratamiento_Dentals/Listar',configuracion).then(function(response){
                indiciosarray = response.data;
                indiciosarray.map(function(x){
                    me.tratamientodentals.push({text: x.dato,value: x.dato});
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
        listartipodentadura(){

            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Tipo_Dentaduras/Listar',configuracion).then(function(response){
                indiciosarray = response.data;
                indiciosarray.map(function(x){
                    me.tipodentaduras.push({text: x.dato,value: x.dato});
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
        resizeIframe(obj) {
            obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
        },
        listarLogo(){
        
                let me=this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                this.$conf.get('api/ConfGlobals/Listar',configuracion).then(function(response){
                    me.logo1= response.data.logo1;
                    me.logo2= response.data.logo2;
                    me.logo3= response.data.logo3;
                    me.logo4= response.data.logo4;
                    
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
        ocultarsp(){

        },
         formatearfechahora: function(fecha){
                return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
          },
        cerrarcarpeta () {
            this.$store.state.rHechoId = null;
            this.$store.state.nuc= null;
            this.$router.push('./carpetas')
        },
        agregar(){
            this.editedIndex = -1;
            this.modalAdd= 1;
        },
        close () {

            this.modalAdd = 0;
            this.modaldocumento=false;
            this.limpiar();
        },
        limpiar(){
           this.idMediaAfiliacion = "";
            this.personaId = "";
            this.complexion= "";
            this.peso= "";
            this.estatura= "";
            this.formacara= "";
            this.colorojo = "";
            this.tez= "";
            this.formaCabell= "";
            this.colocabello = "";
            this.largocabello = "";
            this.dorsonariz = "";
            this.tamanonariz= "";
            this.v_glabios= "";
            this.v_tfrente= "";
            this.tamanoceja= "";
            this.formaceja= "";
            this.v_tboca= "";
            this.tamanooreja= "";
            this.v_fmenton = "";
            this.tipoojo = "";
            this.numerooficio = "";
            this.v_distrito= "";
            this.v_dirSubPro= "";
            this.v_agencia= "";
            this.v_usuario= "";
            this.v_puesto= "";
            
            this.lateralidade = ""
            this.pomulo = ""
            this.gruposanguineo = ""
            this.tipocabello = ""
            this.calvicie = ""
            this.tratamientoquimico= ""
            this.aderenciaroreja = ""
            this.formaojo = ""
            this.implantacionceja = ""
            this.puntanariz = ""
            this.cicatriz = false
            this.tatuaje = false
            this.textocicatriz = ""
            this.textotatuaje = ""
            this.pupilentes = false
            this.otrascarac = ""
            this.tamanodental = ""
            this.tratamientodental = ""
            this.dentaduracompleta = true
            this.dientesausentes = ""
            this.tipodentadura = ""
            this.otrotratamiento = ""
            this.alturanariz = ""
            this.tipomenton = ""

            this.editedIndex=-1;
            this.impirmirIndex=-1;
            this.modalAdd = 0;


            this.imageFile = "";
            this.tiposdocumento = "";
            this.descripciondocumento = "";
            this.imageName = "";
            this.imageUrl = "";
            


        },
        editItem (item) {  

            

            this.idMediaAfiliacion = item.idMediaAfiliacion;

            this.personaId = new Object();
            this.personaId.text = item.nombreImputado
            this.personaId.value = item.personaId;

            this.complexion=  item.complexion;

            this.peso= item.peso;
            this.estatura= item.estatura;

            this.formacara= item.formaCara;

            this.colorojo = item.coloOjos;

            this.tez= item.tez;

            this.tipocabello= item.formaCabello;

            this.colocabello = item.colorCabello;

            this.largocabello = item.largoCabello;

            this.dorsonariz = item.tipoNariz;

            this.alturanariz= item.tamañoNariz; 

            this.v_glabios= item.grosorLabios; 

            this.v_tfrente= item.tipoFrente;

            this.tamanoceja= item.cejas;

            this.formaceja = item.tipoCejas;

            this.v_tboca= item.tamañoBoca;

            this.tamanooreja= item.tamañoOrejas;

            this.v_fmenton = item.formaMenton;

            this.tipoojo = item.tipoOjo;

            this.v_distrito= item.distrito;
            this.v_dirSubPro= item.dirSubProc;
            this.v_agencia= item.agencia;
            this.v_usuario= item.usuario;
            this.v_puesto= item.puesto;

            this.gruposanguineo = item.gruposanguineo
            this.calvicie = item.calvicie
            this.aderenciaroreja = item.adherenciaOreja
            this.tratamientoquimico = item.tratamientosQuimicosCabello
            this.formaojo = item.formaOjo
            this.implantacionceja = item.implantacionCeja
            this.puntanariz = item.puntaNariz
            this.tipothisnton = item.tipothisnton
            this.cicatriz = item.cicatriz
            this.textocicatriz = item.descripcionCicatriz
            this.tatuaje = item.tatuaje
            this.textotatuaje = item.descripcionTatuaje
            this.otrascarac = item.otrasCaracteristicas
            this.tamanodental = item.tamanoDental
            this.tratamientodental = item.tratamientoDental
            this.dentaduracompleta = item.dentaduraCompleta
            this.dientesausentes = item.dientesAusentes
            this.tipodentadura = item.tipoDentadura
            this.pomulo = item.pomulos
            this.lateralidade = item.lateralidad
            this.pupilentes = item.pupilentes
            if(item.tratamientoDental == 'Otro')
            this.otrotratamiento = item.tratamientoDental
            this.tipomenton = item.tipoMenton
            this.numerooficio = item.numerooficio
            
            this.editedIndex= 1;
            this.modalAdd = 1;

        },
        imprimirItem (item) {  

            this.personaId = new Object();
            this.personanombre = item.nombreImputado

            this.idMediaAfiliacion = item.idMediaAfiliacion;
            this.personaId = item.personaId;

            this.complexion=  item.complexion;

            this.peso= item.peso;
            this.estatura= item.estatura;

            this.formacara= item.formaCara;

            this.colorojo = item.coloOjos;

            this.tez= item.tez;

            this.tipocabello= item.formaCabello;

            this.colocabello = item.colorCabello;

            this.largocabello = item.largoCabello;

            this.dorsonariz = item.tipoNariz;

            this.alturanariz= item.tamañoNariz; 

            this.v_glabios= item.grosorLabios; 

            this.v_tfrente= item.tipoFrente;

            this.tamanoceja= item.cejas;

            this.formaceja = item.tipoCejas;

            this.v_tboca= item.tamañoBoca;

            this.tamanooreja= item.tamañoOrejas;

            this.v_fmenton = item.formaMenton;

            this.tipoojo = item.tipoOjo;

            this.v_distrito= item.distrito;
            this.v_dirSubPro= item.dirSubProc;
            this.v_agencia= item.agencia;
            this.v_usuario= item.usuario;
            this.v_puesto= item.puesto;

            this.fechas = item.fechaSys.substring(8,10) +" de "+ this.obtenermes(item.fechaSys.substring(5,7)-1)+" del "+ item.fechaSys.substring(0,4)

            this.numerooficio = item.numerooficio

            this.gruposanguineo = item.gruposanguineo
            this.calvicie = item.calvicie
            this.aderenciaroreja = item.adherenciaOreja
            this.tratamientoquimico = item.tratamientosQuimicosCabello
            this.formaojo = item.formaOjo
            this.implantacionceja = item.implantacionCeja
            this.puntanariz = item.puntaNariz
            this.tipothisnton = item.tipothisnton
            this.cicatriz = item.cicatriz
            this.textocicatriz = item.descripcionCicatriz
            this.tatuaje = item.tatuaje
            this.textotatuaje = item.descripcionTatuaje
            this.otrascarac = item.otrasCaracteristicas
            this.tamanodental = item.tamanoDental
            this.tratamientodental = item.tratamientoDental
            this.dentaduracompleta = item.dentaduraCompleta
            this.dientesausentes = item.dientesAusentes
            this.tipodentadura = item.tipoDentadura
            this.pomulo = item.pomulos
            this.lateralidade = item.lateralidad
            this.pupilentes = item.pupilentes
            this.tipomenton = item.tipoMenton

            this.mostrarpdf(item.usuario,item.puesto,item.agencia);
            this.modaldocumento = false;
        },
        listaMediaAfiliacion(){
           let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$SP.get('api/MediaAfiliacions/ListarPorRHecho/'+ me.rHechoId,configuracion).then(function(response){
                //console.log(response.data);
               me.listaimputados=response.data;
                
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
       verimagen(item){
            let me = this;
                me.rutaconsulta = item.ruta;
                me.descrip = item.descripcionDocumento;
                me.tipo = item.tipoDocumento;
                me.dialogimagen= true;
        },
         
         listarPersonas(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var personasArray=[];
            me.$SP.get('api/RAPs/ListarTodos/'+ me.rAtencionId,configuracion).then(function(response){
                //console.log(response.data);
                personasArray=response.data;
                personasArray.map(function(x){
                    me.personas.push({text: x.nombreCompleto,value: x.personaId});
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
        

        consultararchivo(item){
            let me = this;
            me.dialogpictures = true;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$SP.get('api/ArchivosMediaAfiliacion/Listar/'+ item.idMediaAfiliacion,configuracion).then(function(response){
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
                me.$SP.get('api/RHechoes/ListarPorId/' +me.rHechoId,configuracion).then(function(response){  
                    me.agenciaid = response.data.agenciaid,                 
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
        informacionagencia(){
                 let me=this; 
                 let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header}; 
                me.$conf.get('api/Agencias/Listarporid/'+ me.agenciaid,configuracion).then(function(response){
                    me.agenciainfo=response.data;
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


        loadarchive(item){
            let me = this;
            me.idmediaAfiliacion = item.idMediaAfiliacion;
            me.dialogarchivo = true;
            me.limpiar(); 
           
        },  
        guardar(){ 
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.personanombre = me.personaId.text
            var peso
            if(this.peso != "")
                peso = this.peso
            else
                peso = 0

            var estatura
            if(this.estatura != "")
                estatura = this.estatura
            else
                estatura = 0
            var tratamientodental
            if(me.tratamientodental=='Otro')tratamientodental = me.otrotratamiento
            else tratamientodental = me.tratamientodental

            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información ',    

            function(){             
                me.$SP.post('api/MediaAfiliacions/Crear',{ 
                            'personaId': me.personaId.value ,
                            'rHechoId': me.rHechoId,
                            'complexion': me.complexion,
                            'peso': peso,
                            'estatura': estatura,
                            'formaCara': me.formacara,
                            'coloOjos': me.colorojo,
                            'tez': me.tez,
                            'formaCabello': me.tipocabello,
                            'colorCabello': me.colocabello,
                            'largoCabello': me.largocabello,
                            'tamañoNariz': me.alturanariz,
                            'tipoNariz': me.dorsonariz,
                            'grosorLabios': me.v_glabios,
                            'tipoFrente': me.v_tfrente,
                            'cejas': me.tamanoceja,
                            'tipoCejas': me.formaceja,
                            'tamañoBoca': me.v_tboca,
                            'tamañoOrejas': me.tamanooreja,
                            'formaMenton': me.v_fmenton,
                            'tipoOjo': me.tipoojo,
                            'distrito': me.u_distrito,
                            'dirSubProc': me.u_dirSubPro,
                            'agencia': me.u_agencia,
                            'usuario': me.u_nombre,
                            'puesto': me.u_puesto, 
                            'numerooficio': me.numerooficio,

                            'Gruposanguineo':me.gruposanguineo,
                            'Calvicie':me.calvicie,
                            'AdherenciaOreja':me.aderenciaroreja,
                            'TratamientosQuimicosCabello':me.tratamientoquimico,
                            'FormaOjo':me.formaojo,
                            'ImplantacionCeja':me.implantacionceja,
                            'PuntaNariz':me.puntanariz,
                            'TipoMenton':me.tipomenton,
                            'Cicatriz':me.cicatriz,
                            'DescripcionCicatriz':me.textocicatriz,
                            'Tatuaje':me.tatuaje,
                            'DescripcionTatuaje':me.textotatuaje,
                            'OtrasCaracteristicas':me.otrascarac,
                            'TamanoDental':me.tamanodental,
                            'TratamientoDental':tratamientodental,
                            'DentaduraCompleta':me.dentaduracompleta,
                            'DientesAusentes':me.dientesausentes,
                            'TipoDentadura':me.tipodentadura,
                            'Pomulos':me.pomulo,
                            'Lateralidad':me.lateralidade,
                            'Pupilentes':me.pupilentes,                            

                        },configuracion).then(function(response){                                       
                            me.$notify('La información se actualizo correctamente !!!','success')
                            me.mostrarpdf(me.u_nombre,me.u_puesto,me.u_agencia);  
                            me.modalAdd=0;  
                            me.modaldocumento = false;   
                            me.listaMediaAfiliacion();
                            me.limpiar();
                            })
                                       
            },
            function(){
                    alertify.warning('Verifica la información')
                }
                ).set('labels', {ok:'Guardar', cancel:'Cancelar'});
        },   
        actualizar(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.personanombre = me.personaId.text
            var tratamientodental
            if(me.tratamientodental=='Otro')tratamientodental = me.otrotratamiento
            else tratamientodental = me.tratamientodental
            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas actualizar la información .',         
            function(){
                
                me.$SP.put('api/MediaAfiliacions/Actualizar',{
                          'idMediaAfiliacion': me.idMediaAfiliacion,
                          'personaId': me.personaId.value,
                          'rHechoId': me.rHechoId,
                          'complexion': me.complexion,
                          'peso': me.peso,
                          'estatura': me.estatura,
                          'formaCara': me.formacara,
                          'coloOjos': me.colorojo,
                          'tez': me.tez,
                          'formaCabello': me.tipocabello,
                          'colorCabello': me.colocabello,
                          'largoCabello': me.largocabello,
                          'tamañoNariz': me.alturanariz,
                          'tipoNariz': me.dorsonariz,
                          'grosorLabios': me.v_glabios,
                          'tipoFrente': me.v_tfrente,
                          'cejas': me.tamanoceja,
                          'tipoCejas': me.formaceja,
                          'tamañoBoca': me.v_tboca,
                          'tamañoOrejas': me.tamanooreja,
                          'formaMenton': me.v_fmenton,
                          'tipoOjo': me.tipoojo,
                          
                          'Gruposanguineo':me.gruposanguineo,
                            'Calvicie':me.calvicie,
                            'AdherenciaOreja':me.aderenciaroreja,
                            'TratamientosQuimicosCabello':me.tratamientoquimico,
                            'FormaOjo':me.formaojo,
                            'ImplantacionCeja':me.implantacionceja,
                            'PuntaNariz':me.puntanariz,
                            'TipoMenton':me.tipomenton,
                            'Cicatriz':me.cicatriz,
                            'DescripcionCicatriz':me.textocicatriz,
                            'Tatuaje':me.tatuaje,
                            'DescripcionTatuaje':me.textotatuaje,
                            'OtrasCaracteristicas':me.otrascarac,
                            'TamanoDental':me.tamanodental,
                            'TratamientoDental':tratamientodental,
                            'DentaduraCompleta':me.dentaduracompleta,
                            'DientesAusentes':me.dientesausentes,
                            'TipoDentadura':me.tipodentadura,
                            'Pomulos':me.pomulo,
                            'Lateralidad':me.lateralidade,
                            'Pupilentes':me.pupilentes, 
                           
                           
                     },configuracion).then(function(response){                            
                        me.$notify('La información se actualizo correctamente !!!','success')                       
                        me.listaMediaAfiliacion();
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
                        me.mostrarpdf(me.u_nombre,me.u_puesto,me.u_agencia);  
                        me.modalAdd=0;  
                        me.modaldocumento = false;    
                    },
                    
        function(){
                alertify.warning('Verifica la información')
            }
            ).set('labels', {ok:'Actualizar', cancel:'Cancelar'});
    },     

    listarcomplexion(){

        var indiciosarray = [];
        let me=this; 
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        
        me.$conf.get('api/Complexion/Listar',configuracion).then(function(response){
            indiciosarray = response.data;
            indiciosarray.map(function(x){
                me.complexiontipo.push({text: x.dato,value: x.dato});
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

    listarFormacara(){
            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Forma_de_Cara/Listar',configuracion).then(function(response){
                 indiciosarray = response.data;
                 indiciosarray.map(function(x){
                        me.formacaras.push({text: x.dato,value: x.dato});
                     });
            }).catch(err => { 
                    if (err.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status == 403) { 
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros','error')    
                    } 
            });   
    },

    

     listarColorojos(){
            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Color_Ojos/Listar',configuracion).then(function(response){
                 indiciosarray = response.data;
                 indiciosarray.map(function(x){
                        me.Colorojos.push({text: x.dato,value: x.dato});
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

    listartez(){
            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Tez/Listar',configuracion).then(function(response){
                 indiciosarray = response.data;
                 indiciosarray.map(function(x){
                        me.Tez.push({text: x.dato,value: x.dato});
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

    listarformacabello(){
            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Forma_de_cabello/Listar',configuracion).then(function(response){
                 indiciosarray = response.data;
                 indiciosarray.map(function(x){
                        me.tipocabellos.push({text: x.dato,value: x.dato});
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

    listarcolorcabello(){
            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Color_de_Cabellos/Listar',configuracion).then(function(response){
                 indiciosarray = response.data;
                 indiciosarray.map(function(x){
                        me.colorcabellos.push({text: x.dato,value: x.dato});
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

    listarlargocabello(){
            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Largo_de_Cabello/Listar',configuracion).then(function(response){
                 indiciosarray = response.data;
                 indiciosarray.map(function(x){
                        me.largocabellos.push({text: x.dato,value: x.dato});
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

    listartamañonariz(){
            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Tamaño_Nariz/Listar',configuracion).then(function(response){
                 indiciosarray = response.data;
                 indiciosarray.map(function(x){
                        me.alturanarices.push({text: x.dato,value: x.dato});
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
    listartiponariz(){
            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/TipoNariz/Listar',configuracion).then(function(response){
                 indiciosarray = response.data;
                 indiciosarray.map(function(x){
                        me.dorsonarices.push({text: x.dato,value: x.dato});
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

    listargrosorlabios(){
            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Grosor_de_labios/Listar',configuracion).then(function(response){
                 indiciosarray = response.data;
                 indiciosarray.map(function(x){
                        me.grosorlabios.push({text: x.dato,value: x.dato});
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

    listartipofrente(){
            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Tipo_de_Frente/Listar',configuracion).then(function(response){
                indiciosarray = response.data;
                indiciosarray.map(function(x){
                    me.tipofrente.push({text: x.dato, value: x.dato});
                });
            }).catch(err => { 
                    if (err.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status == 403) { 
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403= true
                        me.showpage= false 
                    } else if (err.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros','error')    
                    } 
            });   
    },
    listartipocejas(){
            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Cejas/Listar',configuracion).then(function(response){
                 indiciosarray = response.data;
                 indiciosarray.map(function(x){
                        me.tamanocejas.push({text: x.dato,value: x.dato});
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
    listarformacejas(){
            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Tipo_de_Cejas/Listar',configuracion).then(function(response){
                 indiciosarray = response.data;
                 indiciosarray.map(function(x){
                        me.formacejas.push({text: x.dato,value: x.dato});
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

    
    listartamañoboca(){
            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Tamaño_de_Boca/Listar',configuracion).then(function(response){
                 indiciosarray = response.data;
                 indiciosarray.map(function(x){
                        me.tamañoboca.push({text: x.dato,value: x.dato});
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
    
    listartipoorejas(){
            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Tipo_de_Orejas/Listar',configuracion).then(function(response){
                 indiciosarray = response.data;
                 indiciosarray.map(function(x){
                        me.tamanoorejas.push({text: x.dato,value: x.dato});
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

    
    listarformamenton(){
            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/Forma_de_Menton/Listar',configuracion).then(function(response){
                 indiciosarray = response.data;
                 indiciosarray.map(function(x){
                        me.formamenton.push({text: x.dato,value: x.dato});
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
    

    listartipoojos(){
            var indiciosarray = [];
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$conf.get('api/TipoOjos/Listar',configuracion).then(function(response){
                 indiciosarray = response.data;
                 indiciosarray.map(function(x){
                        me.tipoojos.push({text: x.dato,value: x.dato});
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

        guardarArchivo(){ 
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$validator.validateAll('dialogodocs').then(result => {     
            if (result) { 
                var nombreCarpeta;
                if (me.imageFile){
                                let formData = new FormData();  
                                formData.append('file', me.imageFile ); 
                                nombreCarpeta = "C" + me.nuc.substr(1);
                                 me.GUID = me.generateUUID();
                             
                                 me.$SP.post('api/ArchivosMediaAfiliacion/Post/'+nombreCarpeta+'/'+me.GUID,
                                    formData,
                                    {
                                    headers: {
                                                'Content-Type': 'multipart/form-data'
                                            } 
                                    },configuracion  
                                ).then(function(response){
                                    console.log('SUCCESS!!');
                                        console.log(response.data.ruta);
                                        me.$SP.post('api/ArchivosMediaAfiliacion/Crear',{  

                                            'MediaAfiliacionid' : me.idmediaAfiliacion,
                                            'tipoDocumento' : me.tiposdocumento.text,
                                            'descripcionDocumento' : me.descripciondocumento,
                                            'puesto' : 'na',
                                            'ruta' : response.data.ruta,
                                            'UDistrito' : me.u_distrito,
                                            'USubproc' : me.u_dirSubPro,
                                            'UAgencia' : me.u_agencia,
                                            'UUsuario' : me.u_nombre,
                                            'UPuesto' : me.u_puesto,
                                            'UModulo' : me.u_modulo,                   

                                        },configuracion).then(function(response){  
                                            me.$notify('¡La información se guardo correctamente!','success')   
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
                                                me.$notify("No esta autorizado para ver esta página", 'error')
                                                me.e403= true
                                                me.showpage= false 
                                            } else if (err.response.status==404){
                                                me.$notify("El recuso no ha sido encontrado", 'error')
                                            }else{
                                                me.$notify('Error al intentar crear el  registro!!!','error')  
                                            } 
                                        });  
                                })
                                .catch(function(){
                                console.log('FAILURE2!!');
                                }); 
                } 
         
    
            }         
        }) 
    
        },

        downloadPdf(nombre,puesto,agencia) {
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

            if (pdfMake.vfs == undefined){
                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                pdfMake.vfs = pdfFonts.vfs; 
            }
          
            //***************************************************************************** */
            // VARIABLES
            //***************************************************************************** */
            //***************************************************************************** */ 
            var logo1 = this.logo1;
            var logo2 = this.logo2;
            var logo3 = this.logo3;
            var logo4 = this.logo4;
            var dirsubproc = this.v_dirSubPro;
            var agencia = this.v_agencia;
            var u_subProc= this.u_subproc;
            var nuc = this.nuc

            var pupilente, cicatriz, tatuaje,dentaduracompleta

            if(this.pupilentes) pupilente = "Si"
            else pupilente = "No"

            if(this.cicatriz) cicatriz = "Si"
            else cicatriz = "No"

            if(this.tatuaje) tatuaje = "Si"
            else tatuaje = "No"

            if(this.dentaduracompleta) dentaduracompleta = "Si"
            else dentaduracompleta = "No"
    //------------------------------------
            var peso,estatura,gruposanguineo,complexion,tez,formacara,tipoojo,formaojo,colorojo,formaCabell,tipocabello,colocabello,calvicie,tratamientoquimico

            if(this.peso == '') peso = 0
            else peso = this.peso

            if(this.estatura == '') estatura = 0
            else estatura = this.estatura

            if(this.gruposanguineo == '') gruposanguineo = " "
            else gruposanguineo = this.gruposanguineo

            if(this.complexion == '') complexion = " "
            else complexion = this.complexion

            if(this.tez == '') tez = " "
            else tez = this.tez

            if(this.formacara == '') formacara = " "
            else formacara = this.formacara

            if(this.tipoojo == '') tipoojo = " "
            else tipoojo = this.tipoojo

            if(this.formaojo == '') formaojo = " "
            else formaojo = this.formaojo

            if(this.colorojo == '') colorojo = " "
            else colorojo = this.colorojo

            if(this.formaCabell == '') formaCabell = " "
            else formaCabell = this.formaCabell

            if(this.tipocabello == '') tipocabello = " "
            else tipocabello = this.tipocabello

            if(this.colocabello == '') colocabello = " "
            else colocabello = this.colocabello

            if(this.calvicie == '') calvicie = " "
            else calvicie = this.calvicie

            if(this.tratamientoquimico == '') tratamientoquimico = " "
            else tratamientoquimico = this.tratamientoquimico

            var tamanooreja,aderenciaroreja,tamanoceja,formaceja,implantacionceja,alturanariz,dorsonariz,puntanariz,v_tboca,v_glabios,v_tfrente,lateralidade,pomulo,tamanodental,tratamientodental,tipodentadura,v_fmenton,tipomenton

            if(this.tamanooreja == '') tamanooreja = " "
            else tamanooreja = this.tamanooreja

            if(this.aderenciaroreja == '') aderenciaroreja = " "
            else aderenciaroreja = this.aderenciaroreja

            if(this.tamanoceja == '') tamanoceja = " "
            else tamanoceja = this.tamanoceja

            if(this.formaceja == '') formaceja = " "
            else formaceja = this.formaceja

            if(this.implantacionceja == '') implantacionceja = " "
            else implantacionceja = this.implantacionceja

            if(this.alturanariz == '') alturanariz = " "
            else alturanariz = this.alturanariz

            if(this.dorsonariz == '') dorsonariz = " "
            else dorsonariz = this.dorsonariz

            if(this.puntanariz == '') puntanariz = " "
            else puntanariz = this.puntanariz

            if(this.v_tboca == '') v_tboca = " "
            else v_tboca = this.v_tboca

            if(this.v_glabios == '') v_glabios = " "
            else v_glabios = this.v_glabios

            if(this.v_tfrente == '') v_tfrente = " "
            else v_tfrente = this.v_tfrente

            if(this.lateralidade == '') lateralidade = " "
            else lateralidade = this.lateralidade

            if(this.pomulo == '') pomulo = " "
            else pomulo = this.pomulo

            if(this.tratamientodental == '') tratamientodental = " "
            else if(this.tratamientodental != "Otro") tratamientodental = this.tratamientodental
            else tratamientodental = this.otrotratamiento

            if(this.v_fmenton == '') v_fmenton = " "
            else v_fmenton = this.v_fmenton

            if(this.tipomenton == '') tipomenton = " "
            else tipomenton = this.tipomenton

            if(this.tamanodental == '') tamanodental = " "
            else tamanodental = this.tamanodental

            if(!this.dentaduracompleta)
                if(this.tipodentadura == '') tipodentadura = " "
                else tipodentadura = this.tipodentadura

            //************************************************* */
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
                                image:logo4,
                                width:612,
                                absolutePosition:{x:0,y:0}
                            },
                            {
                                text: agenciainfodr +"\n"+agenciainfotel+"\n"+ 'www.hidalgo.gob.mx',
                                style: 'subheaderlogo', 
                                style: 'PiePagina', 
                                margin: [312,12,72,0],
                                alignment:'right',
                                absolutePosition:{x:0,y:30}      
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
                            /*{ 
                                image: logo2,
                                width: 50,  
                                absolutePosition: {x: 495, y: 30},
                            },*/
                            
                             
                        ]
                 
                },
              
                content: [
                    {
                        text:  u_subProc + "\n" + dirsubproc +"\n"+agencia,
                        style: 'Adscripcion',
                        absolutePosition: {x: 85, y: 95},
                    },
                    {
                        text:"Número Único de Caso: "+ nuc,                 
                        style: 'Titulo', 
                        alignment: 'right',
                        margin: [0, 110, 72, 0],
                        absolutePosition: {x: 85, y: 150},                                   
                    }, 
                    {
                        text:
                        this.u_distrito+", Hidalgo a "+this.fechas,                       
                        style: 'Fecha',
                        alignment: 'right', 
                    },    
                    {
                        text:  '\nMEDIA FILIACIÓN\n\n\n',
                        style: 'Titulo',
                        alignment:'center'
                    },
                   
                    {
                        text: 'Nombre de la persona: '+ this.personanombre +'\n\n\n',
                        style: 'Texto',
                        alignment:'center',
                        bold:true
                    },  
                     
                    {
                        style: 'table',
                        table: {
                            headerRows: 0,
                            widths: ['*', '*', '*'],
                            body: [                                   
                                    [{style:'Titulo',colSpan: 1,  text: "Peso", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'},{style:'Titulo',colSpan: 1,  text: "Estatura", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'}, {style:'Titulo',colSpan: 1,  text: "Grupo sanguineo", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'} ],
                                    [ {style:'Texto',text:  peso + ' Kg'}, {style:'Texto',text: estatura + ' m'},{style:'Texto',text: gruposanguineo}],

                                    [{style:'Titulo',colSpan: 1,  text: "Complexión", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'},{style:'Titulo',colSpan: 1,  text: "Tez", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'}, {style:'Titulo',colSpan: 1,  text: "Forma de la cara", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'} ],
                                    [ {style:'Texto',text:complexion }, {style:'Texto',text: tez },{style:'Texto',text: formacara}],
                        
                                    [{style:'Titulo',colSpan: 3,  text: "Ojos", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'},'',''],
                                    [ {style:'Texto',text:'Tamaño'+ '\n\n' + tipoojo },{colSpan: 2,style:'Texto',text:'Forma' + '\n\n' + formaojo},{}],
                                    [ {style:'Texto',text: 'Color' + '\n\n' + colorojo },{colSpan: 2,style:'Texto',text:'Pupilente' + '\n\n' + pupilente},{}],

                                    [{style:'Titulo',colSpan: 3,  text: "Cabello", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'},'',''],
                                    [{style:'Texto',text:'Longitud'+ '\n\n' + formaCabell},{style:'Texto',text: 'Tipo'+ '\n\n' + tipocabello},{style:'Texto',text: 'Color'+ '\n\n' + colocabello},],
                                    [{style:'Texto',text:'Calvicie'+ '\n\n' + calvicie},{style:'Texto',text: 'Tratamientos químicos'+ '\n\n' + tratamientoquimico,colSpan: 2},''],
                        
                
                                    [{style:'Titulo',colSpan: 3,  text: "Orejas", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'},{},{}],
                                    [{style:'Texto',text:'Tamaño'+ '\n\n' + tamanooreja},{colSpan: 2,style:'Texto',text: 'Adherencia'+ '\n\n' + aderenciaroreja},{}],

                                    [{style:'Titulo',colSpan: 3,  text: "Ceja", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'},'',''],
                                    [{style:'Texto',text:'Tamaño'+ '\n\n' + tamanoceja},{style:'Texto',text: 'Forma'+ '\n\n' + formaceja},{style:'Texto',text: 'Inplantación'+ '\n\n' + implantacionceja}],

                                    [{style:'Titulo',colSpan: 3,  text: "Nariz", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'},'',''],
                                    [{style:'Texto',text:'Altura'+ '\n\n' + alturanariz},{style:'Texto',text: 'Dorso'+ '\n\n' + dorsonariz},{style:'Texto',text: 'Punta'+ '\n\n' + puntanariz}],

                                    [{colSpan: 1,style:'Titulo', text: "Boca", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'},{colSpan: 2,style:'Titulo', text: "Labios", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'},''],
                                    [{style:'Texto',text:v_tboca},{colSpan: 2,style:'Texto',text: v_glabios},{}],

                                    [{style:'Titulo',colSpan: 3,  text: "Menton", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'},'',''],
                                    [{style:'Texto',text:'Forma'+ '\n\n' + v_fmenton},{colSpan: 2,style:'Texto',text: 'Tipo'+ '\n\n' + tipomenton},{}],

                                    [{style:'Titulo',colSpan: 1,  text: "Frente", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'},{style:'Titulo',colSpan: 1,  text: "Lateralidad", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'}, {style:'Titulo',colSpan: 1,  text: "Pomulos", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'} ],
                                    [ {style:'Texto',text:  v_tfrente }, {style:'Texto',text: lateralidade },{style:'Texto',text: pomulo}],

                                    [{style:'Titulo',colSpan: 3,  text: "Señas particulares", fillColor: '#eeeeee', fontSize: 10, bold: true, alignment: 'center'},'',''],
                                    [ {colSpan: 3,style:'Texto',text:  "Cicatrices: "+ cicatriz + "\n\n" + this.textocicatriz + "\n\n"+
                                    "Tatuajes: "+ tatuaje + "\n\n" + this.textotatuaje + "\n\n"+
                                    "Otras características importantes para la identificación: (Lunares, pecas, verrugas, estrías, amputaciones, callosidades, deformidades, perforaciones, manchas, bigote, barba, fracturas, prótesis etc.): "+ "\n\n" + this.otrascarac + "\n\n"+
                                    "Tamaño dental: " + "\n\n" + tamanodental + "\n\n"+
                                    "Tratamiento dental: " + "\n\n" + tratamientodental + "\n\n"+
                                    "Dentadura completa: " + "\n\n" + dentaduracompleta + "\n\n"+
                                    (!this.dentaduracompleta?("Dientes ausentes: " + "\n\n" + this.dientesausentes + "\n\n"):"")+
                                    (!this.dentaduracompleta?("Tipo de dentadura: " + "\n\n" + tipodentadura + "\n\n"):"")
                                    }, {},{}],
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
                        color:'white',
                    },
                    Texto:{
                        fontSize: 10,
                        alignment:'justify'
                    },
                    Titulo:{
                        fontSize: 12,
                        bold:true 
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
     
        mostrarpdf(nombre,puesto,agencia){

            let me=this;                      
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
        verpdf(){
            let me = this;
            me.$validator.validateAll('crear').then(result => {
             if (result) {
                me.fechas = me.generarfecha();
                me.personanombre = me.personaId.text
                me.downloadPdf(me.u_nombre,me.u_puesto,me.u_agencia);  
              }
            })

        },
        generarfecha(){
            var fecha;
            fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY");
            return fecha;      
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
            
       
   }
}
</script>

<style> 
.espaciado{
    padding: 30px !important; 
}  
.espaciado2{
    margin-bottom: -30px !important;
    margin-top: -30px !important;
}  
.espaciado3{
    margin-bottom: -30px !important;
    margin-left: -24px !important;
    margin-right: -24px !important;
    margin-top: -30px !important;
}  
.espaciado4{
    margin-bottom: 30px !important;
    margin-top: 30px !important;
    padding-left: 70px !important;
    padding-right: 70px !important;
}  
</style>
 