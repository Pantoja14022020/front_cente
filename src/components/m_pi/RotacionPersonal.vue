<template>
    <v-layaout align-start>
        <v-navigation-drawer v-model="drawer" app   v-if="logueado" class="primary"  >
      <div class="text-xl-center text-md-center text-xs-center my-4">
          <a href="/"><img src="@/assets/Logo.png" height="110px" alt=""> </a>
      </div>

      <v-list dense dark class="pt-0 primary" >
        <template>
          <v-list-tile  :to="{name:'policia-investigadora'}">
            <v-list-tile-action>
              <v-icon class="centenarioMenuIcon">home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="white--text">Inicio</v-list-tile-title>
          </v-list-tile>
        </template>          

      <template v-if="esAdministrador || esComUnidad || esOficialiapartes || esComGeneral " >
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Asignacion de unidad policial
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile  v-if="esAdministrador || esOficialiapartes || esComGeneral" :to="{ name: 'pi-bandejaentrada'== '#' ? '' :  'pi-bandejaentrada'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">drafts</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Bandeja de entrada 
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 
            <v-list-tile  v-if="esAdministrador || esOficialiapartes || esComGeneral " :to="{ name: 'pi-reasignar'== '#' ? '' :  'pi-reasignar'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">cached</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Reasignar unidad policial
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 
            <v-list-tile  v-if="esAdministrador || esComUnidad " :to="{ name: 'pi-autorizacioninteligencia'== '#' ? '' :  'pi-autorizacioninteligencia'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">description</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Solicitudes Inteligencia
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>       
          </v-list-group>
    </template>



     <template v-if="esAdministrador || esAgentePolicía || esComUnidad">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Unidad policial
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="esAdministrador ||esOficialiapartes|| esAgentePolicía || esComUnidad " :to="{ name: 'pi-bdeperito'== '#' ? '' :  'pi-bdeperito'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">how_to_reg</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Bandeja de entrada policia
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 
            <v-list-tile  :to="{ name: 'pi-entregainforme'== '#' ? '' :  'pi-entregainforme'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">toc</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Entrega de Informe
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="(esAdministrador ||esOficialiapartes|| esAgentePolicía|| esComUnidad)&& modulointernof "  :to="{ name: 'pi-solicitudinteligencia'== '#' ? '' :  'pi-solicitudinteligencia'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">system_update_alt</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Solicitudes Inteligencia
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>          
          </v-list-group>
      </template>

      <template v-if="esAdministrador || esComGeneral ||  esComUnidad || esJuridico || esAdministrativo || esDirector " >
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Estadísticas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-estadisticas'== '#' ? '' :  'pi-estadisticas'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">equalizer</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Estadísticas por año
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-estadisticasan'== '#' ? '' :  'pi-estadisticasan'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">equalizer</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Estadísticas por años
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-estadisticasmes'== '#' ? '' :  'pi-estadisticasmes'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">equalizer</v-icon>
              </v-list-tile-action>
              <v-list-tile-content  >
                <v-list-tile-title class="centenarioMenuModules">
                  Estadísticas por mes
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>         
          </v-list-group>
      </template>

      <template v-if="esAdministrador || esOficialiapartes || esComGeneral || esAgentePolicía ||  esComUnidad || esJuridico  || esDirector ||  esDetenciones " >
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Cetificados medicos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-certificadomedico'== '#' ? '' :  'pi-certificadomedico'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">assignment</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Cetificado medico
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>      
          </v-list-group>
      </template>

       <template v-if="esAdministrador || esDirector || esDetenciones  " >
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Detenciones
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-personasdetencion'== '#' ? '' :  'pi-personasdetencion'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">playlist_add</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Registrar detenido
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-personasdetenidas'== '#' ? '' :  'pi-personasdetenidas'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">supervised_user_circle</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Personas detenidas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>      
          </v-list-group>
      </template>


       <template v-if="esAdministrador || esDirector || esDetenciones  " >
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Visitas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-visitas'== '#' ? '' :  'pi-visitas'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">recent_actors</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Registro de Persona
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 
            <v-list-tile :to="{ name: 'pi-registrovisitas'== '#' ? '' :  'pi-registrovisitas'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">swap_horiz</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Registro de Visita
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-historialpersonavisitas'== '#' ? '' :  'pi-historialpersonavisitas'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">supervisor_account</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Historial de visitas - Visitante
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 
            <v-list-tile :to="{ name: 'pi-historialdetenidovisitas'== '#' ? '' :  'pi-historialdetenidovisitas'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">supervised_user_circle</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Historial de visitas - Detenido
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>      
          </v-list-group>
          
      </template>

       <template v-if="esAdministrador || esJuridico" >
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Registro de Colaboraciones
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-comparecencias'== '#' ? '' :  'pi-comparecencias'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">local_library</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Comparecencias Elementos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-arrestos'== '#' ? '' :  'pi-arrestos'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">no_meeting_room</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Arrestos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-exhortos'== '#' ? '' :  'pi-exhortos'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">camera_front</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Exhortos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-presentacionescomparecencias'== '#' ? '' :  'pi-presentacionescomparecencias'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">streetview</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Presentaciones y Comparecencias
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-requerimientosvarios'== '#' ? '' :  'pi-requerimientosvarios'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">assignment</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Requerimientos Varios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-busquedadomicilio'== '#' ? '' :  'pi-busquedadomicilio'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">pageview</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Busqueda de Domicilio
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-trasladocustodia'== '#' ? '' :  'pi-trasladocustodia'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">transfer_within_a_station</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Traslados y Custodias
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-ordenesaprehension'== '#' ? '' :  'pi-ordenesaprehension'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">description</v-icon>
              </v-list-tile-action> 
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Ordenes de Aprehensión
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>      
          </v-list-group>
      </template>

      

      <template v-if="esAdministrador || esJuridico" >
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Asignación de Colaboraciones
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-acomparecencias'== '#' ? '' :  'pi-acomparecencias'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">local_library</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Comparecencias Elementos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-aarrestos'== '#' ? '' :  'pi-aarrestos'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">no_meeting_room</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Arrestos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-aexhortos'== '#' ? '' :  'pi-aexhortos'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">camera_front</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Exhortos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-apresentacionescomparecencias'== '#' ? '' :  'pi-apresentacionescomparecencias'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">streetview</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Presentaciones y Comparecencias
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-arequerimientosvarios'== '#' ? '' :  'pi-arequerimientosvarios'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">assignment</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Requerimientos Varios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-abusquedadomicilio'== '#' ? '' :  'pi-abusquedadomicilio'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">pageview</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Busqueda de Domicilio
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-atrasladocustodia'== '#' ? '' :  'pi-atrasladocustodia'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">transfer_within_a_station</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Traslados y Custodias
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-aordenesaprehension'== '#' ? '' :  'pi-aordenesaprehension'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">description</v-icon>
              </v-list-tile-action> 
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Ordenes de Aprehensión
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>      
          </v-list-group>
      </template>


      <template v-if="esAdministrador || esAgentePolicía" >
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                  Bandeja de entrada Colaboraciones
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-bcomparecencias'== '#' ? '' :  'pi-bcomparecencias'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">local_library</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Comparecencias Elementos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-barrestos'== '#' ? '' :  'pi-barrestos'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">no_meeting_room</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Arrestos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-bexhortos'== '#' ? '' :  'pi-bexhortos'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">camera_front</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Exhortos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-bpresentacionescomparecencias'== '#' ? '' :  'pi-bpresentacionescomparecencias'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">streetview</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Presentaciones y Comparecencias
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-brequerimientosvarios'== '#' ? '' :  'pi-brequerimientosvarios'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">assignment</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Requerimientos Varios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-bbusquedadomicilio'== '#' ? '' :  'pi-bbusquedadomicilio'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">pageview</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Busqueda de Domicilio
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-btrasladocustodia'== '#' ? '' :  'pi-btrasladocustodia'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">transfer_within_a_station</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Traslados y Custodias
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'pi-bordenesaprehension'== '#' ? '' :  'pi-bordenesaprehension'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">description</v-icon>
              </v-list-tile-action> 
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Ordenes de Aprehensión
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>   
            
          </v-list-group>
      </template>

      <template v-if="false" >
            <v-list-tile :to="{ name: 'pi-gmap'== '#' ? '' :  'pi-gmap'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">local_library</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                  Gmap
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>              
      </template>

      


      
      

      <v-list-tile
          v-if="
            esDirector
          "
          :to="{ name: 'rotacionpersonal' == '#' ? '' : 'rotacionpersonal' }"
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
<!-- 
    <v-list-tile
          :to="{ name: 'busquedanuc' == '#' ? '' : 'busquedanuc' }"
          active-class="secondary"
          >
          <v-list-tile-action>
            <v-icon class="centenarioMenuIcon">policy</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="centenarioMenuModules">
              Busqueda de NUC
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->

      


    </v-navigation-drawer>
        <v-flex >
            <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-regular" >Usuarios.</v-toolbar-title>

                <v-divider class="mx-2" inset vertical></v-divider>

                <v-badge
                v-model="show"
                    color="cyan"
                    right
                        >
                        <template v-slot:badge>
                            <span>{{  contador  }}</span>
                        </template>
                        <v-icon
                            large
                            color="grey lighten-1"
                        > account_box</v-icon>
                    </v-badge>
            <v-spacer></v-spacer>
            <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
            </v-toolbar>
            <v-data-table
            :headers="headers"
            :items="usuarios"
            :search="search" 
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"  
            class="elevation-1" >
                <template slot="items" class="white" slot-scope="props">
                    <td>{{ props.item.nombre }}</td>
                    <td><v-icon  small  class="mr-2" color="success">bookmark</v-icon>{{ props.item.nombrerol }}</td>
                    <td>{{ props.item.puesto }}</td>
                    <td><v-icon  small  class="mr-2"  >person</v-icon>{{ props.item.usuario }}</td> 
                    <td>{{ props.item.distrito }}</td>
                    <td>{{ props.item.agencia }}</td>
                    <td><v-icon  small  class="mr-2" color="info">bookmark</v-icon>{{ props.item.modulonombre }}</td> 
                    <td>
                        <div v-if="props.item.condicion">
                            <span class="blue--text">Activo</span>
                        </div>
                        <div v-else>
                            <span class="red--text">Inactivo</span>
                        </div>
                    </td>
                    <td class="justify-center layout px-0">
                        <v-icon 
                            class="mr-2"
                            @click="editItem(props.item)"
                            >
                            edit
                        </v-icon>
                    </td>
                </template>

            </v-data-table>
        </v-flex>

        <v-dialog   v-model="dialog"  fullscreen hide-overlay transition="dialog-bottom-transition">
                        
                        <v-card>
                            <v-toolbar dark color="primary">
                
                                <v-toolbar-title>Actualizar Usuario</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-items>
                                    <v-btn  color=success text @click="guardar()">Guardar</v-btn>
                                    <v-btn icon   @click="dialog = false">
                                        <v-icon>close</v-icon>
                                    </v-btn>
                                </v-toolbar-items>
                            </v-toolbar> 
                
                
                            <v-container grid-list-md text-xs-center>
                
                                <v-layout row wrap>
                                
                                    <v-flex class="espaciado" xs6 sm6 md6 lg6> 
                
                
                                        <v-text-field 
                                            name="nombre" 
                                            label="Nombre:"
                                            v-model="nombre" 
                                            v-validate="'required'"
                                            :error-messages="errors.collect('nombre')">
                                        </v-text-field>

                                        <v-autocomplete 
                                            name="distrito" 
                                            label="Distrito:"
                                            v-model="distrito"
                                            :items="distritos" 
                                            v-on:change="listarDSP()"  
                                            v-validate="'required'"
                                            :error-messages="errors.collect('distrito')">
                                        </v-autocomplete>
                
                                        <v-autocomplete 
                                            name="agencia"
                                            label="Agencia:"
                                            v-model="idagencia"
                                            :items="agencias"
                                            return-object
                                            v-validate="'required'"
                                            v-on:change="listarModulo()"   
                                            :error-messages="errors.collect('agencia')">
                                        </v-autocomplete> 
                
                                    </v-flex>
                
                                    <v-flex class="espaciado" xs6 sm6 md6 lg6> 
                
                                        <v-text-field 
                                            name="puesto" 
                                            label="Puesto:"
                                            v-model="puesto" 
                                            v-validate="'required'"
                                            :error-messages="errors.collect('puesto')">
                                        </v-text-field> 
                
                                        <v-autocomplete 
                                            name="direccion subprocuradurria" 
                                            label="Direccion subprocuradurria:"
                                            v-model="iddsp"
                                            :items="dsp" 
                                            return-object
                                            v-validate="'required'"
                                            v-on:change="listarAgencia()"  
                                            :error-messages="errors.collect('direccion subprocuradurria')">
                                        </v-autocomplete> 

                                        <v-autocomplete 
                                            name="modulo"
                                            label="Modulo:"
                                            v-model="idModuloServicio"
                                            :items="modulos" 
                                            v-validate="'required'"
                                            :error-messages="errors.collect('modulo')" >
                                        </v-autocomplete>
                
                                    </v-flex>
                                
                                </v-layout>
                            </v-container> 
                        
                        </v-card>
                    </v-dialog>
    </v-layaout>
</template>

<script>
    import axios from 'axios'
    export default {
        
    data(){
        return{
            show: true,
            headers:[
                {text:'Nombre', value:'nombre'},
                {text:'Rol', value:'rol'},
                {text:'Puesto', value:'puesto'},
                {text:'Usuario', value:'usuario'},
                {text:'Distrito', value:'distrito'},
                {text:'Agencia', value:'agencia'},
                {text:'Modulo', value:'modulo'},
                {text:'Estado', value:'estado'},
                {text:'Opciones', value:'opciones'},
            ],
            idAgencia:'',
            contador:'',
            usuarios:[],
            idUsuario:'',
            idrol:'',
            nombre:'',
            puesto:'',
            distrito:'',
            iddsp:'',
            idagencia:'',
            idModuloServicio:'',
            nombreModulo:'',
            nombreAgencia:'',
            direccion:'',
            telefono:'',
            email:'',
            usuario:'',
            password:'',
            passwordAnt:'',
            editedIndex:'',
            dsp:[],
            agencias:[],
            modulos:[],
            dialog:false,
            distritos:[],
            roles:[],
            idDsp:'',
            claveDsp:'',
            rowsPerPageItems: [10, 20, 30, 40, 50],
            pagination: {
                rowsPerPage: 10
            },
            actPassword:false,
            condicion: true,
            idDistritoPach:'7f662ec1-6705-406e-bcd0-f56ade7bcae2',
            search: '',
        }
    },
    computed:{
        logueado(){
      return this.$store.state.usuario;
    },
    esAdministrador(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Administrador';
    },
    esCordinador(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Coordinador-Jurídico';
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
    esComGeneral(){
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Comandante General';
    },
    esComUnidad(){
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Comandante Unidad';
    },
    esJuridico(){
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Jurídico';
    },
    esAdministrativo(){
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Administrativo';
    },
    esDirector(){
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Director';
    },
    esDetenciones(){
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Detenciones';
    },  
    esAgentePolicía(){
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Agente-Policía';
    },
    usuario(){
      return this.$store.state.usuario.usuario;
    },
    email(){
      return this.$store.state.usuario.email;
    },
    modulointernof(){
      return this.modulointerno
    },
    drawer(){
            return this.$store.drawer 
        }
    },
    watch:{

    },
    created(){
        console.log(this.$store.state)
        this.idAgencia = this.$store.state.usuario.idagencia
        this.idDsp = this.$store.state.usuario.iddsp
        this.claveDsp = this.$store.state.usuario.ClaveDSP
        console.log(this.idAgencia)
        console.log(this.claveDsp)

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
            
            // Do something with request error
            this.$store.commit('LOADER',false);
            return Promise.reject(error);
            });

            this.listar();
            this.listardistritos();
    },
    methods:{
        async listar() {
                let me = this; 
                let header = { "Authorization": "Bearer " + this.$store.state.token };
                let configuracion = { headers: header };

                try {
                    let usuariosResponse = await me.$controlacceso.get('api/Usuarios/ListarPorClaveDSP/' + me.claveDsp, configuracion);
                    me.contador = usuariosResponse.data.length;
                    console.log(me.contador);
                    console.log(me.contador);

                    let [distritosResponse, agenciasResponse] = await Promise.all([
                        me.$conf.get('api/Distritoes/Listar', configuracion),
                        me.$conf.get('api/Agencias/Listar', configuracion)
                    ]);

                    
                    me.usuarios = []
                    usuariosResponse.data.map(dd => {
                        let d = distritosResponse.data.filter( e => e.idDistrito == dd.distritoId)            
                        let a = agenciasResponse.data.filter( e => e.idAgencia == dd.agenciaId)            
                        
                        me.usuarios.push({
                            agenciaId: dd.agenciaId,
                            condicion: dd.condicion,
                            contador: dd.contador,
                            direccion: dd.direccion,
                            distritoId: dd.distritoId,
                            dspId: dd.dspId,
                            email: dd.email,
                            idUsuario: dd.idUsuario,
                            moduloServicioId: dd.moduloServicioId,
                            modulonombre: dd.modulonombre,
                            nombre: dd.nombre,
                            nombreAgencia: dd.nombreAgencia,
                            nombrerol: dd.nombrerol,
                            password_hash: dd.password_hash,
                            puesto: dd.puesto,
                            rolId: dd.rolId,
                            telefono: dd.telefono,
                            titular: dd.titular,
                            usuario: dd.usuario,
                            agencia: a[0].nombre,
                            distrito: d[0].nombre
                        })
                });

                    console.log(me.usuarios);
                } catch (err) {
                    if (err.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error');
                    } else if (err.response.status == 401) {
                        me.$notify("Por favor inicie sesión para poder navegar en la aplicación", 'error');
                        me.e401 = true;
                        me.showpage = false;
                    } else if (err.response.status == 403) {
                        me.$notify("No está autorizado para ver esta página", 'error');
                        me.e403 = true;
                        me.showpage = false;
                    } else if (err.response.status == 404) {
                        me.$notify("El recurso no ha sido encontrado", 'error');
                    } else {
                        me.$notify('Error al intentar listar los registros!!!', 'error');
                    }
                }
        },
        listarPanelModulo(idUsuario){
            let me = this
            let header = { "Authorization": "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };

            me.$controlacceso.get('api/PanelUsuarios/ListarAsignados/' + idUsuario, configuracion).then(function(response)
            {
                console.log(response.data)
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
                    me.$notify('Error al intentar lisatar los registros!!!','error')   
                } 
            });

        },
        listardistritos(){
            let me=this;
            var distritoarray=[]; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$conf.get('api/Distritoes/Listar', configuracion).then(function(response){
                distritoarray=response.data;
                distritoarray.map(function(x){
                    me.distritos.push({text: x.nombre,value:x.idDistrito});
                    
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
                    me.$notify('Error al intentar lisatar los registros!!!','error')   
                } 
            });

        },
        listarDSP(){
            
            let me=this;
            var dspArray=[]; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.dsp = []
            this.$conf.get('api/DSPs/ListarClaveDSP/'+ me.claveDsp + '/' + me.distrito, configuracion).then(function(response){
                dspArray=response.data;
                console.log(dspArray)
                console.log(dspArray.length)
                dspArray.map(function(x){
                    me.dsp.push({text: x.nombreSubDir,value:x.idDSP});
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
                    me.$notify('Error al intentar lisatar los registros!!!','error')   
                } 
            });

        },
        listarAgencia(){ 
            let me=this;
            me.agencias=[];
            var agenciaArray=[]; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            debugger
            var dsp ='';
            if (me.iddsp.value == undefined)
            {
                dsp = me.iddsp;
            }
            else{
                dsp = me.iddsp.value;
            }
            this.$conf.get('api/Agencias/ListarPorDirSub/'+ dsp, configuracion).then(function(response){
                agenciaArray=response.data;
                agenciaArray.map(function(x){
                    me.agencias.push({text: x.nombre,value:x.idAgencia});
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
                    me.$notify('Error al intentar lisatar los registros!!!','error')   
                } 
            });

        },
        listarModulo(){
            let me=this; 
            var modulosArray=[]; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.modulos = [];
            debugger
            var agencia='';
            if (me.idagencia.value == undefined)
            {
                agencia =me.idagencia;
            }
            else
            {
                agencia =me.idagencia.value;
            }
            this.$conf.get('api/ModuloServicios/ListarPorAgencia/'+ agencia, configuracion).then(function(response){
                modulosArray=response.data;
                modulosArray.map(function(x){
                    me.modulos.push({text: x.nombre,value:x.idModuloServicio});
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
                    me.$notify('Error al intentar lisatar los registros!!!','error')   
                } 
            });
        },
        editItem (item) {
            debugger
            this.listarPanelModulo(item.idUsuario)
            this.idUsuario=item.idUsuario;
            this.idrol=item.rolId;
            this.nombre=item.nombre;
            this.puesto=item.puesto;              
            this.distrito = item.distritoId;
            this.distritoActual = item.distritoId;
            this.iddsp =item.dspId;
            this.idagencia =item.agenciaId,
            this.idModuloServicio=item.moduloServicioId;
            this.nombreModulo= item.modulonombre;
            this.nombreAgencia= item.nombreAgencia;
            this.usuario= item.usuario;
            this.password=item.password_hash;
            this.telefono=item.telefono;
            this.email=item.email;
            this.condicion=item.condicion
            this.listarDSP();
            this.listarAgencia();
            this.listarModulo();
            this.dialog = true
            console.log(this.idUsuario)
        },
        guardar(){
            let me = this
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

            if(me.distritoActual == me.idDistritoPach && me.distrito == me.idDistritoPach)
            {
                console.log('son en el mismo distrito')
                me.$controlacceso.put('api/Usuarios/Actualizar',{
                            'idusuario':me.idUsuario,
                            'rolId':me.idrol,
                            'moduloservicioId': me.idModuloServicio, 
                            'puesto': me.puesto, 
                            'nombre':me.nombre,
                            'telefono': me.telefono,
                            'email':me.email,
                            'condicion':me.condicion, 
                            'usuario': me.usuario,
                            'password':me.password,
                            'act_password':me.actPassword                        
                        }, configuracion).then(function(response){
                        
                            me.close();
                            me.$notify('La información se actualizo correctamente !!!','success') 
                            me.listar();
                            me.limpiar();                        
                        }).catch(error => {  
                                if (error.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (error.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (error.response.status==403){ 
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (error.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar actualizar la informacion!!!','error')   
                            } 
                        
                            });
            }
            else if ((me.distritoActual == me.idDistritoPach && me.distrito != me.idDistritoPach) || (me.distritoActual != me.idDistritoPach && me.distrito == me.idDistritoPach)){
                console.log('va de pachuca a otro distrito')

                me.$controlacceso.put('api/Usuarios/Actualizar',{
                            'idusuario':me.idUsuario,
                            'rolId':me.idrol,
                            'moduloservicioId': me.idModuloServicio, 
                            'puesto': me.puesto, 
                            'nombre':me.nombre,
                            'telefono': me.telefono,
                            'email':me.email,
                            'condicion':me.condicion, 
                            'usuario': me.usuario,
                            'password':me.password,
                            'act_password':me.actPassword                        
                        }, configuracion).then(function(response){
                            
                            me.$controlacceso.post('api/Usuarios/ClonarUsuario',{
                                'idusuario':me.idUsuario,
                                'rolId':me.idrol,
                                'moduloservicioId': me.idModuloServicio, 
                                'puesto': me.puesto, 
                                'nombre':me.nombre,
                                'telefono': me.telefono,
                                'email':me.email,
                                'condicion':me.condicion, 
                                'usuario': me.usuario,
                                'password':me.password,
                                'idDistrito':me.distrito,
                                'caso': 2,
                            },configuracion).then(function(response){
                                me.$controlacceso.post('api/PanelUsuarios/ClonarPanel',{
                                'UsuarioId':me.idUsuario,
                                'idDistrito':me.distrito,
                                'caso': 2,
                            },configuracion).then(function(response){
                                console.log(response)
                                me.close();
                                me.$notify('La información se actualizo correctamente !!!','success') 
                                me.listar();
                                me.limpiar(); 
                            }).catch(error => {  
                                if (error.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (error.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (error.response.status==403){ 
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (error.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar actualizar la informacion!!!','error')   
                            } 
                        
                            });
                            }).catch(error => {  
                                if (error.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (error.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (error.response.status==403){ 
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (error.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar actualizar la informacion!!!','error')   
                            } 
                        
                            });

                                                    
                        }).catch(error => {  
                                if (error.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (error.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (error.response.status==403){ 
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (error.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar actualizar la informacion!!!','error')   
                            } 
                        
                            });
            }
            else if(me.distritoActual != me.idDistritoPach && me.distrito != me.idDistritoPach){
                console.log('todos diferentes')
                me.$controlacceso.put('api/Usuarios/Actualizar',{
                            'idusuario':me.idUsuario,
                            'rolId':me.idrol,
                            'moduloservicioId': me.idModuloServicio, 
                            'puesto': me.puesto, 
                            'nombre':me.nombre,
                            'telefono': me.telefono,
                            'email':me.email,
                            'condicion':me.condicion, 
                            'usuario': me.usuario,
                            'password':me.password,
                            'act_password':me.actPassword                        
                        }, configuracion).then(function(response){
                            console.log(response)
                            me.$controlacceso.post('api/Usuarios/ClonarUsuario',{
                                'idusuario':me.idUsuario,
                                'rolId':me.idrol,
                                'moduloservicioId': me.idModuloServicio, 
                                'puesto': me.puesto, 
                                'nombre':me.nombre,
                                'telefono': me.telefono,
                                'email':me.email,
                                'condicion':me.condicion, 
                                'usuario': me.usuario,
                                'password':me.password,
                                'idDistritoO':me.distritoActual,
                                'idDistritoD':me.distrito,
                                'caso': 3,
                            },configuracion).then(function(response){
                                console.log(response)
                            me.$controlacceso.post('api/PanelUsuarios/ClonarPanel',{
                                'UsuarioId':me.idUsuario,
                                'idDistritoO':me.distritoActual,
                                'idDistritoD':me.distrito,
                                'caso': 3,
                            },configuracion).then(function(response){
                                console.log(response)
                                me.close();
                                me.$notify('La información se actualizo correctamente !!!','success') 
                                me.listar();
                                me.limpiar(); 
                            }).catch(error => {  
                                if (error.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (error.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (error.response.status==403){ 
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (error.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar actualizar la informacion!!!','error')   
                            } 
                        
                            });
                            }).catch(error => {  
                                if (error.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (error.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (error.response.status==403){ 
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (error.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar actualizar la informacion!!!','error')   
                            } 
                        
                            });                    
                        }).catch(error => {  
                                if (error.response.status==400){
                                me.$notify("No es un usuario válido", 'error')
                            } else if (error.response.status==401){
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage= false
                            } else if (error.response.status==403){ 
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (error.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar actualizar la informacion!!!','error')   
                            } 
                        
                            });

            }
        },
        close () {
            this.dialog = false;
            this.limpiar();
        },
        limpiar(){
            this.id="";
            this.idrol="";
            this.nombre="";
            this.idModuloServicio="";
            this.puesto="";
            this.distrito = ""
            this.direccion="";
            this.telefono="";
            this.email="";
            this.usuario="";
            this.password="";
            this.passwordAnt="";
            this.panel=[];
            this.iddsp ="";
            this.idagencia ="",
            this.idModuloServicio="";
            this.actPassword=false;
            this.editedIndex=-1;
        },
    }
    }
</script>