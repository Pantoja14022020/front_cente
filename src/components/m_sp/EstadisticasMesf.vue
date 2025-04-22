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
                    <v-toolbar-title class="font-weight-regular" >Estadísticas por mes</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>

                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>

                    <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        :return-value.sync="fechaInicio"
                        transition="scale-transition"
                        offset-y
                        min-width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    name ="desde"
                                    :value="fechai"
                                    label="*Desde:"
                                    prepend-icon="event"
                                    clearable 
                                    readonly
                                    v-on="on"
                                    v-validate="'required'"                                            
                                    :error-messages="errors.collect('desde')">
                                ></v-text-field>
                            </template>
                        <v-date-picker locale="es" v-model="fechaInicio" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                        </v-date-picker>
                    </v-menu>

                    <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :return-value.sync="fechaFin"
                        transition="scale-transition"
                        offset-y
                        min-width="290px">
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                name ="hasta"
                                    :value="fechaf"
                                    label="*Hasta:"
                                    prepend-icon="event"
                                    clearable 
                                    readonly
                                    v-on="on"
                                    v-validate="'required'"                                            
                                    :error-messages="errors.collect('desde')">
                                ></v-text-field>
                            </template>
                        <v-date-picker  locale="es"  v-model="fechaFin" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                        </v-date-picker>
                    </v-menu>

                    <v-btn @click="listarporfecha()"  color="primary" dark class="mb-2">Buscar</v-btn>
                      
        </v-toolbar>

        <v-data-table
            :headers="headers"
            :items="peritosasignados"
            :search="search" 
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            >
            
            <template slot="items" class="white" slot-scope="props">
                

                <td>{{ props.item.uUsuario}}</td>   
                <td>{{ props.item.uModulo}}</td> 
                <td>{{ props.item.fechaRecibido }}</td> 
                <td>{{ props.item.fechaAceptado }}</td> 
                <td>{{ props.item.fechaFinalizado }}</td> 
                <td>{{ props.item.fechaEntregado}}</td>   
                <td>{{ props.item.status }}</td>
                <td>{{ props.item.modulo }}</td>

            </template>
            <template slot="no-data">
            <v-btn color="primary"  @click="listar()" >Resetear</v-btn>
            </template>
        
        </v-data-table>
        
        
        <v-layout wrap justify-space-between>
            <v-flex xs12 sm12 md12  >

                    <v-toolbar dense  color="success " >
                        <v-toolbar-title   > <h5>{{textotitulo1}}</h5></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip  bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn small class="mx-2" slot="activator" v-on="on" @click="barra1=true"    right  fab color="primary">
                                            <v-icon dark>assessment</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Gráfica de barras</span>
                        </v-tooltip> 

                        <v-tooltip  bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn small class="mx-2" slot="activator" v-on="on" @click="linea1=true"  right  fab  color="primary">
                                            <v-icon dark>timeline</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Gráfica de línea</span>
                        </v-tooltip>      

                    </v-toolbar>  

                    <v-data-table
                            :headers="headersr"
                            :items="peritosasignadosmodulo"      
                            hide-actions        
                            :rows-per-page-items="rowsPerPageItemsr"
                            :pagination.sync="paginationr"
                            >
                            
                            <template  slot="items" class="white" slot-scope="props"  >                                
                                <td class="caption1">{{ props.item.modulo}}</td>   
                                <td class="caption1">{{ props.item.asignado}}</td> 
                                <td class="caption1">{{ props.item.enproceso }}</td> 
                                <td class="caption1">{{ props.item.finalizado }}</td> 
                                <td class="caption1">{{ props.item.suspendido }}</td> 
                                <td class="caption1">{{ props.item.pospuesto}}</td>   
                                <td class="caption1">{{ props.item.entregado }}</td> 
                                <td class="caption1">{{ props.item.total }}</td> 
                            </template>
                            <template slot="no-data">
                         
                            </template>
                            
                    </v-data-table> 
                    <div >
                        <v-layout id =grafficas wrap justify-space-between>
                                                    
                        </v-layout> 
                    </div>
                                
            </v-flex>

       
        </v-layout>

    
        <v-layout wrap justify-space-between>
            <v-flex xs12 sm12 md12  >

                    <v-toolbar class="mx-0" dense  color="white " > 
                    </v-toolbar>

                    <v-toolbar dense  color="success " v-if="true" >
                        <v-toolbar-title   > <h5>{{textotitulo2}}</h5></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip  bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn small class="mx-2" slot="activator" v-on="on" @click="barra2=true"    right  fab color="primary">
                                            <v-icon dark>assessment</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Grafica de barras</span>
                        </v-tooltip> 

                        <v-tooltip  bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn small class="mx-2" slot="activator" v-on="on" @click="linea2=true"  right  fab  color="primary">
                                            <v-icon dark>timeline</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Grafica de línea</span>
                        </v-tooltip>      

                    </v-toolbar>
                             
    
                <v-data-table
                        :headers="headersrp"
                        :items="peritosasignadosfecha"  
                        hide-actions                 
                        :rows-per-page-items="rowsPerPageItemsr"
                        :pagination.sync="paginationr"
                        >
                        
                        <template slot="items" class="white" slot-scope="props">
                            <td class="caption1">{{ props.item.fecha}}</td>   
                            <td class="caption1">{{ props.item.asignado}}</td> 
                            <td class="caption1">{{ props.item.enproceso }}</td> 
                            <td class="caption1">{{ props.item.finalizado }}</td> 
                            <td class="caption1">{{ props.item.suspendido }}</td> 
                            <td class="caption1">{{ props.item.pospuesto}}</td>   
                            <td class="caption1">{{ props.item.entregado }}</td> 
                            <td class="caption1">{{ props.item.total }}</td>
                        </template>
                        <template slot="no-data">
                        </template>
                        
                </v-data-table> 
                <div >
                    <v-layout id =grafficas2 wrap justify-space-between>
                                                
                    </v-layout> 
                </div> 
            </v-flex>
        </v-layout>   

            

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

            <v-dialog  v-model="barra1"  max-width="1000px" >                  
                        <v-card>
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">assessment</v-icon>
                                </v-avatar>
                    
                                <v-toolbar-title class="subheading">Grafica de barra</v-toolbar-title>
                                <v-spacer></v-spacer>
                            
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form" data-vv-scope="dialogodetalle">
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm12 md12>
                                                <div max >
                                                    <canvas  id="myChart" >
                                                    </canvas>
                                                </div>                                                                                
                                            </v-flex>
                                        </v-layout>
                                    </v-container>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn  @click.native="barra1=false" >Cerrar</v-btn>
                                        <v-btn  @click="downloadPdf('myChart',textotitulo1)" class="success" >Imprimir</v-btn>
                                    </v-card-actions> 
                                </v-form>
                            </v-card-text> 
                        </v-card>
            </v-dialog>
            <v-dialog  v-model="linea1"  max-width="1000px" >                  
                        <v-card>
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">assessment</v-icon>
                                </v-avatar>
                    
                                <v-toolbar-title class="subheading">Grafica de barra</v-toolbar-title>
                                <v-spacer></v-spacer>
                            
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form" data-vv-scope="dialogodetalle">
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm12 md12>
                                                <div max >
                                                    <canvas  id="myChartlinea" >
                                                    </canvas>
                                                </div>                                                                               
                                            </v-flex>
                                        </v-layout>
                                    </v-container>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn  @click.native="linea1=false" >Cerrar</v-btn>
                                        <v-btn  @click="downloadPdf('myChartlinea',textotitulo2)"  class="success" >Imprimir</v-btn>
                                    </v-card-actions> 
                                </v-form>
                            </v-card-text> 
                        </v-card>
            </v-dialog>
            <v-dialog  v-model="barra2"  max-width="1000px" >                  
                        <v-card>
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">assessment</v-icon>
                                </v-avatar>
                    
                                <v-toolbar-title class="subheading">Grafica de barra</v-toolbar-title>
                                <v-spacer></v-spacer>
                            
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form" data-vv-scope="dialogodetalle">
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm12 md12>
                                                <div max >
                                                    <canvas  id="myChart2" >
                                                    </canvas>
                                                </div>                                                                                
                                            </v-flex>
                                        </v-layout>
                                    </v-container>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn  @click.native="barra2=false" >Cerrar</v-btn>
                                        <v-btn  @click.native="downloadPdf('myChart2',textotitulo1)" class="success" >Imprimir</v-btn>
                                    </v-card-actions> 
                                </v-form>
                            </v-card-text> 
                        </v-card>
            </v-dialog>
            <v-dialog  v-model="linea2"  max-width="1000px" >                  
                        <v-card>
                            
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">assessment</v-icon>
                                </v-avatar>
                    
                                <v-toolbar-title class="subheading">Grafica de barra</v-toolbar-title>
                                <v-spacer></v-spacer>
                            
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form" data-vv-scope="dialogodetalle">
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm12 md12>
                                                <div max >
                                                    <canvas  id="myChartlinea2" >
                                                    </canvas>
                                                </div>                                                                               
                                            </v-flex>
                                        </v-layout>
                                    </v-container>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn  @click.native="linea2=false" >Cerrar</v-btn>
                                        <v-btn  @click.native="downloadPdf('myChartlinea2',textotitulo2)" class="success" >Imprimir</v-btn>
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
  import * as d3 from 'd3';
  import Chart from 'chart.js'

  import moment from 'moment'
  import 'moment/locale/es';
  import alertify from 'alertifyjs';
  import { VueEditor } from "vue2-editor";
  import { error } from 'util';
  import n401 from './401.vue'
  import n403 from './403.vue'
  import { all } from 'q'

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
        peritosasignados:[],
        peritosasignadosmodulo:[],
        peritosasignadosfecha:[],

        fechaInicio:'',
        fechaFin:'',
        menu1:'',
        menu2:'',
        fechai:'',
        fechaf:'',
        step:-1,
        step2:-1,
        conteograficas:0,
        conteocoloresindiviadules:0,
        modaldocumento:false,
        agenciainfo:'',
        textotitulo1:'',
        textotitulo2:'',
        barra1:false,
        barra2:false,
        linea1:false,
        linea2:false,

        coloresrelleno : [                        
            'rgba(255, 159, 64, .5)',   
            'rgba(153, 102, 255, .5)',
            'rgba(255, 99, 132, .5)',
            'rgba(255, 206, 86, .5)',
            'rgba(75, 192, 192, .5)',
            'rgba(54, 162, 235, .5)', 
            'rgb(204, 200, 200, .5)',
            'rgb(204, 0, 153, .5)',
            'rgb(0, 102, 204, .5)',
            'rgb(0, 255, 153, .5)',
            'rgb(102, 102, 255, .5)',
            'rgb(255, 0, 102, .5)',
            'rgb(255, 153, 0, .5)',
            'rgb(51, 102, 255, .5)',
            'rgb(153, 204, 0, .5)',
            'rgb(51, 51, 204, .5)',
            'rgb(0, 204, 153, .5)',
            'rgb(255, 0, 0, .5)',
            'rgb(0, 153, 153, .5)',
            'rgb(153, 204, 0, .5)',
            'rgb(153, 204, 255, .5)',
            'rgb(0, 204, 153, .5)',
            'rgb(0, 0, 255, .5)',
            'rgb(0, 204, 0, .5)' ,     
            'rgb(255, 102, 255, .5)',
            'rgb(0, 153, 204, .5)',
            'rgb(153, 255, 153, .5)',
            'rgb(153, 153, 255, .5)',
            'rgb(153, 153, 255, .5)',
            'rgb(51, 153, 255, .5)',
            'rgb(255, 51, 0, .5)'              
        ],
        coloresborde : [                        
            'rgba(255, 159, 64, 1)',   
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)', 
            'rgb(204, 200, 200, 1)',
            'rgb(204, 0, 153, 1)',
            'rgb(0, 102, 204, 1)',
            'rgb(0, 255, 153, 1)',
            'rgb(102, 102, 255, 1)',
            'rgb(255, 0, 102, 1)',
            'rgb(255, 153, 0, 1)',
            'rgb(51, 102, 255, 1)',
            'rgb(153, 204, 0, 1)',
            'rgb(51, 51, 204, 1)',
            'rgb(0, 204, 153, 1)',
            'rgb(255, 0, 0, 1)',
            'rgb(0, 153, 153, 1)',
            'rgb(153, 204, 0, 1)',
            'rgb(153, 204, 255, 1)',
            'rgb(0, 204, 153, 1)',
            'rgb(0, 0, 255, 1)',
            'rgb(0, 204, 0, 1)' ,     
            'rgb(255, 102, 255, 1)',
            'rgb(0, 153, 204, 1)',
            'rgb(153, 255, 153, 1)',
            'rgb(153, 153, 255, 1)',
            'rgb(153, 153, 255, 1)',
            'rgb(51, 153, 255, 1)',
            'rgb(255, 51, 0, 1)'              
        ],
        coloresrelleno2 : [   
            'rgb(0, 204, 153, .5)',
            'rgb(255, 0, 0, .5)',
            'rgb(0, 153, 153, .5)',
            'rgb(153, 204, 0, .5)',
            'rgb(153, 204, 255, .5)',
            'rgb(0, 204, 153, .5)',
            'rgb(0, 0, 255, .5)',
            'rgb(0, 204, 0, .5)' ,     
            'rgb(255, 102, 255, .5)',
            'rgb(0, 153, 204, .5)',
            'rgb(153, 255, 153, .5)',
            'rgb(153, 153, 255, .5)',
            'rgb(153, 153, 255, .5)',
            'rgb(51, 153, 255, .5)',
            'rgb(255, 51, 0, .5)',                       
            'rgba(255, 159, 64, .5)',   
            'rgba(153, 102, 255, .5)',
            'rgba(255, 99, 132, .5)',
            'rgba(255, 206, 86, .5)',
            'rgba(75, 192, 192, .5)',
            'rgba(54, 162, 235, .5)', 
            'rgb(204, 200, 200, .5)',
            'rgb(204, 0, 153, .5)',
            'rgb(0, 102, 204, .5)',
            'rgb(0, 255, 153, .5)',
            'rgb(102, 102, 255, .5)',
            'rgb(255, 0, 102, .5)',
            'rgb(255, 153, 0, .5)',
            'rgb(51, 102, 255, .5)',
            'rgb(153, 204, 0, .5)',
            'rgb(51, 51, 204, .5)',
                        
        ],
        coloresborde2 : [    
            'rgb(0, 204, 153, 1)',
            'rgb(255, 0, 0, 1)',
            'rgb(0, 153, 153, 1)',
            'rgb(153, 204, 0, 1)',
            'rgb(153, 204, 255, 1)',
            'rgb(0, 204, 153, 1)',
            'rgb(0, 0, 255, 1)',
            'rgb(0, 204, 0, 1)' ,     
            'rgb(255, 102, 255, 1)',
            'rgb(0, 153, 204, 1)',
            'rgb(153, 255, 153, 1)',
            'rgb(153, 153, 255, 1)',
            'rgb(153, 153, 255, 1)',
            'rgb(51, 153, 255, 1)',
            'rgb(255, 51, 0, 1)',                     
            'rgba(255, 159, 64, 1)',   
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)', 
            'rgb(204, 200, 200, 1)',
            'rgb(204, 0, 153, 1)',
            'rgb(0, 102, 204, 1)',
            'rgb(0, 255, 153, 1)',
            'rgb(102, 102, 255, 1)',
            'rgb(255, 0, 102, 1)',
            'rgb(255, 153, 0, 1)',
            'rgb(51, 102, 255, 1)',
            'rgb(153, 204, 0, 1)',
            'rgb(51, 51, 204, 1)',
                         
        ],
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
            { text: 'Modulo', value: 'modulo', sortable: true  }, 
            { text: 'Fecha Recibido', value: 'Fecharecibido' },
            { text: 'Fecha de Aceptacíon', value: 'fechaAceptado' }, 
            { text: 'Fecha de Finalizacíon', value: 'fechaFinalizado' },
            { text: 'Fecha de Entregado', value: 'fechaEntregado' },
            { text: 'Status',value: 'status' }, 
            { text: 'Perito',value: 'modulo' },        
        ],
        headersr: [

            { text: 'Modulo', value: 'mesno', sortable: false, class:'mytable' }, 
            { text: 'Asignados', value: 'asignado',sortable: false, class:'mytable'}, 
            { text: 'En Proceso ', value: 'enProceso',sortable: false, class:'mytable' },
            { text: 'Finalizados', value: 'finalizado',sortable: false, class:'mytable' }, 
            { text: 'Suspendidos', value: 'suspendido',sortable: false, class:'mytable' },
            { text: 'Pospuestos', value: 'pospuesto',sortable: false, class:'mytable' },
            { text: 'Entregados',value: 'entregado',sortable: false, class:'mytable' }, 
            { text: 'Total',value: 'total',sortable: false, class:'mytable' },                              
        ],
        headersrp: [
            { text: 'Fecha', value: 'nombre', sortable: false, class:'mytable'}, 
            { text: 'Asignados', value: 'asignado',sortable: false, class:'mytable'}, 
            { text: 'En Proceso ', value: 'enProceso' ,sortable: false, class:'mytable'},
            { text: 'Finalizados', value: 'finalizado' ,sortable: false, class:'mytable'}, 
            { text: 'Suspendidos', value: 'suspendido' ,sortable: false, class:'mytable'},
            { text: 'Pospuestos', value: 'pospuesto' ,sortable: false, class:'mytable'},
            { text: 'Entregados',value: 'entregado',sortable: false, class:'mytable' }, 
            { text: 'Total',value: 'total' ,sortable: false, class:'mytable'},        
        ],
        meses: [
            { mes: 'Enero', value: 1 }, 
            { mes: 'Febrero', value: 2 }, 
            { mes: 'Marzo', value: 3 }, 
            { mes: 'Abril', value: 4 }, 
            { mes: 'Mayo', value: 5 }, 
            { mes: 'Junio', value: 6 }, 
            { mes: 'Julio', value: 7 },  
            { mes: 'Agosto', value: 8 },
            { mes: 'Septiembre', value: 9 },
            { mes: 'Octubre', value: 10 },
            { mes: 'Noviembre', value: 11 },
            { mes: 'Diciembre', value: 12 },
                             
        ],
        registros:[    
        ],
        registrosperitos:[

        ],
        
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 10
        },
        paginationr: {
            rowsPerPage: 12
        },
        rowsPerPageItemsr: [12],
        editedIndex: 0, 
        modalAdd:false,
        dialogo:false,
        dialog:false,
        mesmostrar:'',
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
        u_iddsp:'',
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
                me.u_iddsp = me.$store.state.usuario.iddsp;


      //me.listar();
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
            return this.$store.state.drawer
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
        close () {
                
        },
        limpiar(){    
            let me = this;

        },
        fechainif(){
            if(this.menu1){            
            this.$refs.menu1.save(this.fechaInicio);
            this.generarfecha2();
            }
            if(this.menu2){
            
            this.$refs.menu2.save(this.fechaFin);
            this.generarfecha2();
            }        
        },
        generarfecha2(){ 
            if(this.menu1) 
            this.fechai =this.fechaInicio.substring(8,10) +" de "+ this.obtenermes(this.fechaInicio.substring(5,7)-1)+
            " del "+ this.fechaInicio.substring(0,4); 
            if(this.menu2)
            this.fechaf =this.fechaFin.substring(8,10) +" de "+ this.obtenermes(this.fechaFin.substring(5,7)-1)+
            " del "+ this.fechaFin.substring(0,4); 
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
        generarfecha(){
            var fecha;
            fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY");
            return fecha;      
        },
        crear(){
           let me = this;

            d3.select('#grafficas') //Selecciona la <div> con el id grafficas
                .append('div')      // Le agrega a la div previamente seleccionada una nueva <div>
                .attr('class','flex xs4 sm4 md4 lg4')   //A la nueva div creada le agrega el attributo de v-flex
                .attr('id','Graficasg') // e igual le agrega su id con el nombre de Graficasg 
                .append('div')  //Agrega una nueva division dentro de graficasg
                .attr('id','z'+this.conteograficas)  //le asigna un id llamado z y un numero en base al contador             
                .append('canvas')   //le agrega a la division previa un tag canvas
                .attr('id','grafica'+this.conteograficas)  // y se le asigna un id a ese canvas                 
                       
           
                d3.select('#z'+this.conteograficas)     //se selecciona el canvas previamente creado             
                .append('button')   //le agrega un botton, el de imprimir
                .on('click',function () {   //le agrega una funcion a ese boton para que a la hora de clickearlo se mande a llamar la funcion de generar el pdf
                    var padre =  d3.select(this.parentElement).attr('id');   //codigo para obtener el id de la division padre (es decir z)           
                    var regex = /(\d+)/g;  //variable necesaria para usar en la funcion que obtiene solo los numeros
                    var cortar=padre.match(regex); //codigo para obtener solo los numeros del id obtenido previamente
                    me.downloadPdf('grafica'+cortar[0],"Estadísticas de "+me.fechai+ " a "+me.fechaf ) 
                })
                .attr('type','button')   //agrega  un atributo al boton para su correcto funcionamiento      
                .attr('class','mx-2 v-btn v-btn--floating v-btn--right v-btn--small theme--light primary') //agrega  un atributo al boton para su correcto funcionamiento    
                .attr('slot','activator') //agrega  un atributo al boton para su correcto funcionamiento    
                .append('div')  //agrega una divsion al boton
                .attr('class','v-btn__content')  //agrega propiedades del icon
                .append('i')  //agrega propiedades del icon             
                .attr('aria-hidden','true')  //agrega propiedades del icon
                .attr('class','v-icon material-icons theme--dark')  //agrega propiedades del icon
                .text('print') //imagen del icono
                
                //Cada grafica que se genera esta dentro de un div con el id Graficasg
                

        },
        crear2(){
           let me = this;

            d3.select('#grafficas2') //Selecciona la <div> con el id grafficas
                .append('div')      // Le agrega a la div previamente seleccionada una nueva <div>
                .attr('class','flex xs4 sm4 md4 lg4')   //A la nueva div creada le agrega el attributo de v-flex
                .attr('id','Graficasg') // e igual le agrega su id con el nombre de Graficasg 
                .append('div')  //Agrega una nueva division dentro de graficasg
                .attr('id','z'+this.conteograficas)  //le asigna un id llamado z y un numero en base al contador             
                .append('canvas')   //le agrega a la division previa un tag canvas
                .attr('id','grafica'+this.conteograficas)  // y se le asigna un id a ese canvas                 
                       
           
                d3.select('#z'+this.conteograficas)     //se selecciona el canvas previamente creado             
                .append('button')   //le agrega un botton, el de imprimir
                .on('click',function () {   //le agrega una funcion a ese boton para que a la hora de clickearlo se mande a llamar la funcion de generar el pdf
                    var padre =  d3.select(this.parentElement).attr('id');   //codigo para obtener el id de la division padre (es decir z)           
                    var regex = /(\d+)/g;  //variable necesaria para usar en la funcion que obtiene solo los numeros
                    var cortar=padre.match(regex); //codigo para obtener solo los numeros del id obtenido previamente
                    me.downloadPdf('grafica'+cortar[0],"Estadísticas de "+me.fechai+ " a "+me.fechaf ) 
                })
                .attr('type','button')   //agrega  un atributo al boton para su correcto funcionamiento      
                .attr('class','mx-2 v-btn v-btn--floating v-btn--right v-btn--small theme--light primary') //agrega  un atributo al boton para su correcto funcionamiento    
                .attr('slot','activator') //agrega  un atributo al boton para su correcto funcionamiento    
                .append('div')  //agrega una divsion al boton
                .attr('class','v-btn__content')  //agrega propiedades del icon
                .append('i')  //agrega propiedades del icon             
                .attr('aria-hidden','true')  //agrega propiedades del icon
                .attr('class','v-icon material-icons theme--dark')  //agrega propiedades del icon
                .text('print') //imagen del icono
                
                //Cada grafica que se genera esta dentro de un div con el id Graficasg
                

        },        
        eliminar(){
            d3.selectAll('#Graficasg') 
            .remove() //elemina todos los div del html que tengan el id Graficasg
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
        extraer(dato){
            var aux
            for(var i=0;i<dato.length;i++)
                aux.push(dato[i].mes)
            return aux
        },
        graficarindividual(perito,Finalizado,Asignado,Enproceso,Suspendido,Pospuesto,Entregado){
            
            let me = this;
            var ctx = document.getElementById('grafica'+me.conteograficas);
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    
                    labels: [perito],
                    datasets: [{
                        barPercentage: 0.7,
                        label: "Asignados",
                        data: [Asignado],                       
                        backgroundColor: [
                           me.coloresrelleno[0]
                        ],
                        borderColor: [                          
                           me.coloresborde[0]                        
                        ],
                        borderWidth: 1
                    },
                    {
                        barPercentage: 0.7,
                        label: "En proceso",
                        data: [Enproceso],                       
                        backgroundColor: [
                           me.coloresrelleno[1]
                        ],
                        borderColor: [                          
                           me.coloresborde[1]                        
                        ],
                        borderWidth: 1
                    },
                    {
                        barPercentage: 0.7,
                        label: "Suspendidos",
                        data: [Suspendido],                       
                        backgroundColor: [
                           me.coloresrelleno[2]
                        ],
                        borderColor: [                          
                           me.coloresborde[2]                        
                        ],
                        borderWidth: 1
                    },
                    {
                        barPercentage: 0.7,
                        label: "Pospuestos",
                        data: [Pospuesto],                       
                        backgroundColor: [
                           me.coloresrelleno[3]
                        ],
                        borderColor: [                          
                           me.coloresborde[3]                        
                        ],
                        borderWidth: 1
                    },
                    {
                        barPercentage: 0.7,
                        label: "Finalizados",
                        data: [Finalizado],                       
                        backgroundColor: [
                           me.coloresrelleno[4]
                        ],
                        borderColor: [                          
                           me.coloresborde[4]                        
                        ],
                        borderWidth: 1
                    },
                    {
                        barPercentage: 0.7,
                        label: "Entregados",
                        data: [Entregado],                       
                        backgroundColor: [
                           me.coloresrelleno[5]
                        ],
                        borderColor: [                          
                           me.coloresborde[5]                        
                        ],
                        borderWidth: 1
                    },
                    
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: ''
                    },
                    layout: {
                        padding: {
                            left: 50,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontSyle: 'bold',
                            fontSize: 12,
                            boxWidth:10
                        }
                        
                    },
                    
                    scales: {
                        yAxes: [{                           
                            ticks: {
                                beginAtZero:true,
                                userCallback: function(label, index, labels) {
                                    // when the floored value is the same as the value we have a whole number
                                    if (Math.floor(label) === label) {
                                        return label;
                                    }

                                },
                                
                            }
                        }]
                    }
                }
            });
            me.conteocoloresindiviadules++
        },

        graficarbarra(division,perito, Finalizado,Asignado,Enproceso,Suspendido,Pospuesto,Entregado){
            let me = this;
            var ctx = document.getElementById(division);
            var datasetf ={
                labels: perito,
                datasets:[]
            }
            
            /*
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }
            var r,g,b;
            
            for(var i=0;i<perito.length;i++){
                r=getRandomInt(255)
                g=getRandomInt(255)
                b=getRandomInt(255)
                datasetf.datasets.push({
                    label:me.mesmostrar+" "+perito[i],
                    backgroundColor:'rgba('+r+','+ g+','+ b+', 1)',
                    borderColor: 'rgba('+r+','+ g+','+ b+', 1)',
                    borderWidth: 1,
                    data: [total[i]]                
                },)  
            }
            */
            datasetf.datasets.push({
                barPercentage: 0.7,
                label:"Asignados",
                backgroundColor: me.coloresrelleno[0],
                borderColor: me.coloresborde[0],
                borderWidth: 1,
                data: Asignado               
            },)

            datasetf.datasets.push({
                barPercentage: 0.7,
                label:"En proceso",
                backgroundColor: me.coloresrelleno[1],
                borderColor: me.coloresborde[1],
                borderWidth: 1,
                data: Enproceso               
            },)

            datasetf.datasets.push({
                barPercentage: 0.7,
                label:"Suspendidos",
                backgroundColor: me.coloresrelleno[2],
                borderColor: me.coloresborde[2],
                borderWidth: 1,
                data: Suspendido               
            },)

            datasetf.datasets.push({
                barPercentage: 0.7,
                label:"Pospuestos",
                backgroundColor: me.coloresrelleno[3],
                borderColor: me.coloresborde[3],
                borderWidth: 1,
                data: Pospuesto               
            },)

            datasetf.datasets.push({
                barPercentage: 0.7,
                label:"Finalizados",
                backgroundColor: me.coloresrelleno[4],
                borderColor: me.coloresborde[4],
                borderWidth: 1,
                data: Finalizado               
            },)

            datasetf.datasets.push({
                barPercentage: 0.7,
                label:"Entregados",
                backgroundColor: me.coloresrelleno[5],
                borderColor: me.coloresborde[5],
                borderWidth: 1,
                data: Entregado               
            },)

            var myChart = new Chart(ctx, {
                type: 'bar',
                data: datasetf,                                   
                options: {
                    responsive:true,
                    title: {
                        display: true,
                        text: 'Grafica de '+me.mesmostrar
                    },
                    layout: {
                        padding: {
                            left: 50,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontSize: 12,
                            fontSyle: 'bold',
                            boxWidth:10,
                        }
                        
                    },
                    
                    scales: {
                        yAxes: [{                           
                            ticks: {
                                beginAtZero:true,
                                userCallback: function(label, index, labels) {
                                    // when the floored value is the same as the value we have a whole number
                                    if (Math.floor(label) === label) {
                                        return label;
                                    }

                                },
                                
                            }
                        }],
                    }
                }
            });
        },
        
        graficarlinea(division,perito, Finalizado,Asignado,Enproceso,Suspendido,Pospuesto,Entregado){
            let me = this;
            var ctx = document.getElementById(division);
            var datasetf ={
                labels: perito,
                datasets:[]
            }
            /*
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }
            var r,g,b;
            
            for(var i=0;i<perito.length;i++){
                r=getRandomInt(255)
                g=getRandomInt(255)
                b=getRandomInt(255)
                datasetf.datasets.push({
                    label:me.mesmostrar+" "+perito[i],
                    backgroundColor:'rgba('+r+','+ g+','+ b+', 1)',
                    borderColor: 'rgba('+r+','+ g+','+ b+', 1)',
                    borderWidth: 1,
                    data: [total[i]]                
                },)  
            }
            */
            datasetf.datasets.push({
                barPercentage: 0.7,
                label:"Asignados",
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: me.coloresborde[0],
                borderWidth: 3,
                data: Asignado               
            },)

            datasetf.datasets.push({
                barPercentage: 0.7,
                label:"En proceso",
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: me.coloresborde[1],
                borderWidth: 3,
                data: Enproceso               
            },)

            datasetf.datasets.push({
                barPercentage: 0.7,
                label:"Suspendidos",
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: me.coloresborde[2],
                borderWidth: 3,
                data: Suspendido               
            },)

            datasetf.datasets.push({
                barPercentage: 0.7,
                label:"Pospuestos",
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: me.coloresborde[3],
                borderWidth: 3,
                data: Pospuesto               
            },)

            datasetf.datasets.push({
                barPercentage: 0.7,
                label:"Finalizados",
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: me.coloresborde[4],
                borderWidth: 3,
                data: Finalizado               
            },)

            datasetf.datasets.push({
                barPercentage: 0.7,
                label:"Entregados",
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: me.coloresborde[5],
                borderWidth: 3,
                data: Entregado               
            },)


            var myChart = new Chart(ctx, {
                type: 'line',
                data: datasetf,                                   
                options: {
                    responsive:true,
                    title: {
                        display: true,
                        text: 'Grafica de '+me.mesmostrar
                    },
                    layout: {
                        padding: {
                            left: 50,
                            right: 50,
                            top: 0,
                            bottom: 0
                        }
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontSize: 12,
                            fontSyle: 'bold',
                            boxWidth:10,
                        }
                        
                    },
                    scales: {
                        yAxes: [{                           
                            ticks: {
                                beginAtZero:true,
                                userCallback: function(label, index, labels) {
                                    // when the floored value is the same as the value we have a whole number
                                    if (Math.floor(label) === label) {
                                        return label;
                                    }

                                },
                                
                            }
                        }]
                    }
                }
            });

        },
        listarporfecha(){
          let me=this;
          me.$validator.validate().then(result => {     
            if (result) {   
                if(me.fechaInicio.substring(0,4) == me.fechaFin.substring(0,4) && me.fechaInicio.substring(5,7) == me.fechaFin.substring(5,7)){  
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.$SP.get('api/PeritoAsignadoForaneas/Listarporidfecha/'+me.u_iddsp+'/'+ me.fechaInicio +" 00:00:00"+'/'+me.fechaFin+" 23:59:59",configuracion).then(function(response){
                    me.peritosasignados=response.data;
                    me.$SP.get('api/PeritoAsignadoForaneas/PorModulo/'+me.u_iddsp+'/'+ me.fechaInicio +" 00:00:00"+'/'+me.fechaFin+" 23:59:59",configuracion).then(function(response){
                        me.peritosasignadosmodulo=response.data;
                        me.$SP.get('api/PeritoAsignadoForaneas/PorMes/'+me.u_iddsp+'/'+ me.fechaInicio +" 00:00:00"+'/'+me.fechaFin+" 23:59:59",configuracion).then(function(response){
                                me.peritosasignadosfecha=response.data;
                                
                                    
                                    var fin=0
                                    var asig=0 
                                    var enpro=0
                                    var sus=0    
                                    var pos=0   
                                    var ent=0   
                                    var total=0;              
                                    me.mesmostrar = me.obtenermes(me.fechaInicio.substring(5,7)-1) + " "+me.fechaInicio.substring(0,4)   
                                    me.peritosasignadosmodulo.forEach(function (registro){
                                        fin += registro.finalizado
                                        asig += registro.asignado
                                        enpro += registro.enproceso
                                        sus += registro.suspendido
                                        pos += registro.pospuesto
                                        ent += registro.entregado
                                        total += registro.finalizado + registro.asignado + registro.enproceso + registro.suspendido + registro.pospuesto + registro.entregado
                                    });
                                    me.peritosasignadosmodulo.push({modulo: 'Total',finalizado:fin,asignado: asig,enproceso: enpro,suspendido: sus,pospuesto: pos,entregado: ent,total:total });
                                    fin =0,asig=0,enpro=0,sus=0,pos=0,ent=0,total=0

                                    me.peritosasignadosfecha.forEach(function (registro){ 
                                        fin += registro.finalizado
                                        asig += registro.asignado
                                        enpro += registro.enproceso
                                        sus += registro.suspendido
                                        pos += registro.pospuesto
                                        ent += registro.entregado
                                        total += registro.finalizado + registro.asignado + registro.enproceso + registro.suspendido + registro.pospuesto + registro.entregado
                                    });
                                    me.peritosasignadosfecha.push({fecha: 'Total',finalizado:fin,asignado: asig,enproceso: enpro,suspendido: sus,pospuesto: pos,entregado: ent,total:total });

                                    me.textotitulo1 = "Estadísticas de "+me.fechai+ " a "+me.fechaf+" por modulo";
                                    me.textotitulo2 = "Estadísticas de "+me.fechai+ " a "+me.fechaf+" por perito";
                                    
                                    me.eliminar();
                                    
                                    //Se separan los datos de la variable principal por que la funcion de las graficas no admite ese tipo de variable

                                    var perito=[]; 
                                    var finalizado=[];       
                                    var asignado=[]; 
                                    var enproceso=[];
                                    var suspendido=[];
                                    var pospuesto=[];
                                    var entregado=[];
                                       
                                    //ciclo para extraer datos
                                    me.peritosasignadosmodulo.forEach(function (registro){
                                        if(registro.modulo!='Total'){
                                            perito.push(registro.modulo)
                                            finalizado.push(registro.finalizado)
                                            asignado.push(registro.asignado)
                                            enproceso.push(registro.enproceso)
                                            suspendido.push(registro.suspendido)
                                            pospuesto.push(registro.pospuesto)
                                            entregado.push(registro.entregado)
                                        }               
                                    });
                                    //Creación de las dos graficas principales de cada tabla
                                    me.graficarbarra("myChart",perito,finalizado,asignado,enproceso,suspendido,pospuesto,entregado)
                                    me.graficarlinea("myChartlinea",perito,finalizado,asignado,enproceso,suspendido,pospuesto,entregado)
                                    
                                    perito=[]; 
                                    finalizado=[];       
                                    asignado=[]; 
                                    enproceso=[];
                                    suspendido=[];
                                    pospuesto=[];
                                    entregado=[];
                                    //ciclo para extraer datos
                                    me.peritosasignadosfecha.forEach(function (registro){
                                        if(registro.fecha!='Total'){
                                            perito.push(registro.fecha)
                                            finalizado.push(registro.finalizado)
                                            asignado.push(registro.asignado)
                                            enproceso.push(registro.enproceso)
                                            suspendido.push(registro.suspendido)
                                            pospuesto.push(registro.pospuesto)
                                            entregado.push(registro.entregado)
                                        }               
                                    });
                                    //Creación de las dos graficas principales de cada tabla
                                    me.graficarbarra("myChart2",perito,finalizado,asignado,enproceso,suspendido,pospuesto,entregado)
                                    me.graficarlinea("myChartlinea2",perito,finalizado,asignado,enproceso,suspendido,pospuesto,entregado)
                                    
                                    //creacion de las graficas individuales
                                    for(var i=0;i<me.peritosasignadosmodulo.length-1;i++){
                                        me.crear();
                                        me.graficarindividual(me.peritosasignadosmodulo[i].modulo,me.peritosasignadosmodulo[i].finalizado,me.peritosasignadosmodulo[i].asignado,me.peritosasignadosmodulo[i].enproceso,me.peritosasignadosmodulo[i].suspendido,me.peritosasignadosmodulo[i].pospuesto,me.peritosasignadosmodulo[i].entregado);
                                        me.conteograficas++;
                                    }
                                    me.conteocoloresindiviadules = 0;
                                    for(var i=0;i<me.peritosasignadosfecha.length-1;i++){
                                        me.crear2();
                                        me.graficarindividual(me.peritosasignadosfecha[i].fecha,me.peritosasignadosfecha[i].finalizado,me.peritosasignadosfecha[i].asignado,me.peritosasignadosfecha[i].enproceso,me.peritosasignadosfecha[i].suspendido,me.peritosasignadosfecha[i].pospuesto,me.peritosasignadosfecha[i].entregado);
                                        me.conteograficas++;
                                    }
                                    
                                    
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
                    me.$notify('Los años o meses de las fechas no coinciden','error')
                }
                }         
            }) 
        },  
        mostrarpdf(){

            let me=this; 
            var dd = me.downloadPdf();
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

           if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.pdfMake.vfs; 
            }
            
            var doc = pdfMake.createPdf(dd);
            var doc = pdfMake.createPdf(dd).print();
               
        },
        downloadPdf(elemento,titulo) {
            console.log("titulo:"+titulo)
            console.log("elemento:"+elemento)
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
            console.log(elemento)
            var quotes = document.getElementById(elemento);
            html2canvas(quotes).then(canvas => {
            var data = canvas.toDataURL('image/jpeg', 1.0)
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
                        ]
                 
                },
              
                content: [
                    {
                        text:
                        '\n'+this.u_distrito+", Hidalgo a "+this.generarfecha(),                        
                        style: 'Fecha',
                        alignment: 'right',                     
                    },     
                    {
                        text: "\n"+"\n"+"\n"+titulo+"\n"+"\n"+"\n"+"\n"+"\n",
                        style: 'Titulo',
                        alignment: 'center',
                    },
                    {
                                image: data,
                                width: 500,
                                alignment: 'center',
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
            }).catch((error) => { 
                            console.log("Erorr al generar pdf", error)
            });          
        },
             
      } 
   }

</script>
<style>

.caption1{
 font-size: 10px !important;
 text-align: center !important;
 padding: 0 0px !important;
 height: 20px !important; 
 border-left:1px solid #aaaaaa;
 border-top:1px solid #aaaaaa;
 border-bottom:1px solid #aaaaaa;
 border-right:1px solid #aaaaaa;
}

.mytable{
 font-size: 10px !important;
 text-align: center !important;
 padding: 0 0px !important;
 height: 20px !important; 
 border-left:1px solid #aaaaaa;
 border-top:1px solid #aaaaaa;
 border-bottom:1px solid #aaaaaa;
 border-right:1px solid #aaaaaa;
}

</style>