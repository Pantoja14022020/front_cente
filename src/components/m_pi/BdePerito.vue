<template>  
    <v-layout align-start>
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
        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <v-flex v-if="showpage">
            <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-regular">Bandeja de Entrada {{ u_nombre }}</v-toolbar-title>
                <v-divider class="mx-2" inset vertical />
                <v-spacer />
                <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                <v-spacer />
                <v-dialog v-model="dialog" max-width="1000px">
                    <v-card>
                        <v-toolbar card dark color="grey lighten-4 primary--text">
                            <v-avatar  size="30">
                                <v-icon class="grey lighten-2">{{ formIcon }}</v-icon>
                            </v-avatar>
                            <v-toolbar-title class="subheading">{{ formTitle }}</v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="form" data-vv-scope="datossatus">
                                <v-container grid-list-md text-xs-center>
                                    <v-layout row wrap>
                                        <v-flex xs6 sm6 md6 lg6>
                                            <v-autocomplete 
                                                name="acto de investigación" 
                                                :items="actosdeinvestigacion"
                                                v-model="actodeinvestigacion" 
                                                return-object  
                                                data-vv-scope="datossatus"
                                                v-validate="'required'" 
                                                label="*Acto de Investigación:"
                                                :error-messages="errors.collect('datossatus.acto de investigación')" 
                                            />
                                            <v-autocomplete 
                                                name="status" 
                                                :items="statuses"
                                                v-model="changestatus" 
                                                return-object  
                                                data-vv-scope="datossatus"
                                                v-validate="'required'" 
                                                label="*Nuevo status:"
                                                :error-messages="errors.collect('datossatus.status')" 
                                            />
                                        </v-flex>
                                        <v-flex xs6 sm6 md6 lg6>
                                            <v-card elevation="0">
                                                <v-card-text>
                                                    <table>
                                                        <tr>
                                                            <td style="width:140px"> Mensaje: </td>
                                                            <td><b> Este texto solo podra ser visto por el agente del ministerio publico que solicito el servicio.</b></td> 
                                                        </tr>                        
                                                    </table>               
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-card elevation="0" v-if="changestatus != ''">
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
                                    <v-spacer />
                                    <v-btn @click.native="dialog=false">Cancelar</v-btn>
                                    <v-btn @click="cambiarstatus()" class="success">Guardar</v-btn>
                                </v-card-actions> 
                            </v-form>
                        </v-card-text> 
                    </v-card>
                    </v-dialog>
                    <v-dialog  v-model="dialogarchivo" max-width="1000px">

                        <v-card>
                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">{{ formIcon }}</v-icon>
                                </v-avatar>
                    
                
                        <v-toolbar-title class="subheading">{{formTitle}}</v-toolbar-title>
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
                                                v-validate="'required'" 
                                                label="*Tipo de archivo:"
                                                :error-messages="errors.collect('dialogodocs.tipo de archivo')">
                                         </v-autocomplete>
                
                                        <v-text-field 
                                        name="descripcíon de documento" 
                                        label="*Descripcíon del documento" 
                                        v-model='descripciondocumento' 
                                        v-validate="'required'"
                                        data-vv-scope="dialogodocs"
                                        :error-messages="errors.collect('dialogodocs.descripcíon de documento')">                                   
                                         </v-text-field>

                                    </v-flex>
                                 
                                    </v-layout>
                                </v-container>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                   
                                    <v-btn  @click.native="dialogarchivo=false" >Cancelar</v-btn>
                                    <v-btn   @click="guardar()" class="success" >Guardar</v-btn>
                                    
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
                    <td>{{ props.item.uUsuario }}</td>
                    <td>{{ props.item.dnuc }}</td>
                    <td>{{ props.item.numeroInterno }}</td>
                    <td>{{ props.item.duAgencia + " - " + props.item.duModulo}}</td> 
                    <td>{{ props.item.fechaRecibido }}</td> 
                    <td>{{ props.item.fechaAceptado }}</td> 
                    <td>{{ props.item.fechaFinalizado }}</td> 
                    <td>{{ props.item.fechaEntregado}}</td>   
                   
                    <td>{{ props.item.statusAC }}</td>
                    <td class="justify-center layout px-0">
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" 
                                        @click="verinfo(props.item)"
                                        >
                                       info
                                    </v-icon> 
                                </template>
                                <span>Ver información</span>
                            </v-tooltip> 

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
                                                        <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on"
                                        @click="obtenerdireccionhecho(props.item)"
                                        >
                                       location_on
                                    </v-icon> 
                                </template>
                                <span>Dirección del hecho</span>
                            </v-tooltip>    
                            <div class="justify-center layout px-0"  v-if="props.item.statusAC != 'Finalizado' && props.item.statusAC != 'Entregado' ">
                                <v-tooltip bottom   >
                                    <template v-slot:activator="{ on }">
                                        <v-icon 
                                            class="mr-2" v-on="on" 
                                            @click="listarActos(props.item)"
                                            >
                                        edit
                                        </v-icon> 
                                    </template>
                                    <span>Cambiar status</span>
                                </v-tooltip>  
                            </div>
                            <v-tooltip bottom   >
                                    <template v-slot:activator="{ on }">
                                        <v-icon 
                                            class="mr-2" v-on="on" 
                                            @click="listarActosCR(props.item)"
                                            >
                                        line_weight
                                        </v-icon> 
                                    </template>
                                    <span>Consultar Conclusíon y mensaje</span>
                            </v-tooltip>
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" 
                                        @click="activarinfodialog(props.item)"
                                        >
                                    list_alt
                                    </v-icon> 
                                </template>
                                <span>Generar Informe</span>
                            </v-tooltip>  
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" color = "warning" 
                                        @click="imprimirinformes(props.item)"
                                        >
                                       print
                                    </v-icon> 
                                </template>
                                <span>Re imprimir Informes</span>
                            </v-tooltip> 
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" 
                                        @click="dialogapoyoact(props.item)"
                                        >
                                       thumbs_up_down
                                    </v-icon> 
                                </template>
                                <span>Solicitar Apoyo/Consultar mensaje</span>
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

    <v-dialog v-model="modaldocumento2" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>     
                    <v-btn color="success" @click="guardarinforme()">Guardar Informe</v-btn>
                    <v-btn icon   @click="modaldocumento2 = false">
                    <v-icon>close</v-icon>
                    </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                    <v-card-text>
                        <iframe id="iframepdf2" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no"  ></iframe>
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

                                            <v-autocomplete name="acto de investigación" 
                                                :items="actosdeinvestigacion"
                                                v-model="actodeinvestigacion" 
                                                return-object  
                                                @change="cambiarCR()"
                                                data-vv-scope="datossatus"
                                                v-validate="'required'" 
                                                label="*Acto de Investigación:"
                                                :error-messages="errors.collect('datossatus.acto de investigación')">
                                            </v-autocomplete>
                                            
                                            <v-card elevation="0"   >
                                                
                                                <v-card-text>
                                                    <table>                                                                                                                                       
                                                            
                                                            <tr>
                                                                <td style="width:140px"> Mensaje: </td>
                                                                <td>
                                                                    <b>
                                                                        <span v-html="mensajeitem"></span>
                                                                        {{mensajeitem}} 
                                                                    </b>
                                                                </td> 
                                                            </tr>                        
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

        <v-dialog v-model="dialogoinforme" fullscreen hide-overlay transition="dialog-bottom-transition">
        
            <v-card>
            <v-toolbar dark color="primary">
                
                <v-toolbar-title>{{formTitle}}.</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn @click ="generarvistaprevia()" color="success" >Vista previa</v-btn>
                <v-btn icon   @click="dialogoinforme = false">
                <v-icon>close</v-icon>
                </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-flex mx-5>
                   <v-card-text>
                       <v-form data-vv-scope="dialogodinforme" >  
                       <br>
                       <br>
                     
                       <v-container grid-list-md text-xs-center>
                        <v-layout row wrap>
                        <v-flex class="espaciado" xs12 sm12 md6 lg6 >
                            <v-autocomplete name="tipo de informe"   
                                :items="tipoinformes"
                                v-model="tipoinforme"
                                return-object 
                                v-validate="'required'" 
                                label="*Tipo de informe:"
                                data-vv-scope="dialogodinforme"
                                :error-messages="errors.collect('dialogodinforme.tipo de informe')">
                            </v-autocomplete>

                            
                        </v-flex>
                        <v-flex class="espaciado" xs12 sm12 md6 lg6 >
                             <v-text-field 
                                name="número de oficio"
                                label="*Número de oficio:" 
                                v-model='noinforme' 
                                data-vv-scope="dialogodinforme"
                                v-validate="'required'" 
                                :error-messages="errors.collect('dialogodinforme.número de oficio')"
                            ></v-text-field>
                        </v-flex>
                        <v-flex class="espaciado" xs12 sm12 md12 lg12 >
                            <v-card elevation="0"  >
                            <v-card-title class="accent"><h3>*Texto del informe</h3></v-card-title>
                            <v-card-text>
                                <v-form   data-vv-scope="form1"> 
                                    <vue-editor  
                                        name="descripcíon"
                                        v-model="textoinforme"
                                        data-vv-scope="dialogodinforme"
                                        v-validate="'required'"       
                                        outline  height=350px;
                                        style="max-height: 310px; overflow-y: scroll"
                                        :editorToolbar="customToolbar" 
                                        :error-messages="errors.collect('dialogodinforme.descripcíon')"  >
                                    </vue-editor>
                                </v-form>
                            </v-card-text>   
                            </v-card> 
                        </v-flex>

                        </v-layout>
                       </v-container>

                       </v-form>
                  </v-card-text>
                      
            <v-divider></v-divider>
           
            </v-flex>
            </v-card>
        </v-dialog>

        <v-dialog  v-model="dialogoreiminfo"  max-width="1000px" >

            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">print</v-icon>
                    </v-avatar>
        
                <v-toolbar-title class="subheading">Re Impresión de Informes</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>

                <v-card-text>
                    <v-form ref="form" >

                        <v-container grid-list-md>
                            <v-layout wrap justify-space-between>
                                <v-flex xs12 sm12 md12 lg12>
                            
                                    <v-data-table                              
                                        :headers="headersinf"
                                        :items="informestotales"
                                        :rows-per-page-items="rowsPerPageItems"
                                        :pagination.sync="pagination"
                                        >
            
                                        <template slot="items" class="white" slot-scope="props">
                
                                            <td>{{ props.item.uUsuario }}</td> 
                                            <td>{{ props.item.fecha}}</td> 
                                            <td>
                                                <div v-if="props.item.tipoInforme==1">
                                                    <span class="blue--text">Informe Parcial</span>
                                                </div>
                                                <div v-else>
                                                    <span class="red--text">Informe Total</span>
                                                </div>
                            
                                            </td>  
                                            <td class="justify-center layout px-0">
                                                <v-tooltip bottom   >
                                                    <template v-slot:activator="{ on }">
                                                        <v-icon 
                                                            class="mr-2" v-on="on" color = "warning" 
                                                            @click="imprimirinforme(props.item)"
                                                            >
                                                        print
                                                        </v-icon> 
                                                    </template>
                                                    <span>Re imprimir</span>
                                                </v-tooltip>     
                                            </td>
                                        </template>
            
                                    </v-data-table>
                                </v-flex>
             
                            </v-layout>
                        </v-container>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn  @click.native="dialogoreiminfo=false" >Cerrar</v-btn>
                    </v-card-actions> 
                </v-form>
            </v-card-text> 
        </v-card>
    
        </v-dialog>

        <v-dialog  v-model="dialogoapoyo"  max-width="1000px" >

            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">line_weight</v-icon>
                    </v-avatar>
            
                    <v-toolbar-title class="subheading">{{statusmensajesolicitud}}</v-toolbar-title>
                    <v-spacer></v-spacer>

                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" data-vv-scope="msjapoyo" >
                        <v-container grid-list-md text-xs-center>
                            <v-layout row wrap>                                                
                                <v-flex xs12 sm12 md12 lg12>

                                    <vue-editor  
                                        name="mensaje"      
                                        v-if="solicitadosino"                                  
                                        v-model="mensajeapoyo" 
                                        :editorToolbar="customToolbar"  
                                        data-vv-scope="msjapoyo"   
                                        v-validate="'required'"                                                                           
                                        :error-messages="errors.collect('msjapoyo.mensaje')">
                                    </vue-editor>
                                    
                                    <v-card  v-if="!solicitadosino"   auto-grow elevation="0">                                
                                        <v-card-text >
                                            <v-list three-line   > 
                                                <p class="text-lg-center font-weight-bold"><a>Información detallada de la solicitud.</a></p> 
                                                <v-list-tile>  
                                                    <v-list-tile-action>
                                                        <v-icon color="success">subject</v-icon>
                                                    </v-list-tile-action> 
                                                    <v-list-tile-content   >  
                                                        <v-list-tile-title> <p class="body-4 font-weight-bold"><a>Estatus:</a></p> </v-list-tile-title> 
                                                        <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ estatusso }}</a></p>  </v-list-tile-sub-title>  
                                                    </v-list-tile-content> 
                                                </v-list-tile>
                                                <v-list-tile>  
                                                    <v-list-tile-action>
                                                        <v-icon color="success">assignment</v-icon>
                                                    </v-list-tile-action> 
                                                    <v-list-tile-content   >  
                                                        <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Mensaje:</a></p> </v-list-tile-title> 
                                                        <v-list-tile-sub-title> 
                                                            <p color="accent" class="caption font-weight-regular">
                                                                <span v-html="mensajeso"> </span>
                                                                <a>{{ mensajeso }}</a>
                                                            </p>
                                                        </v-list-tile-sub-title>
                                                    </v-list-tile-content> 
                                                </v-list-tile>
                                                <v-list-tile>  
                                                    <v-list-tile-action>
                                                        <v-icon color="success">assignment</v-icon>
                                                    </v-list-tile-action> 
                                                    <v-list-tile-content   >  
                                                        <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Respuesta:</a></p> </v-list-tile-title> 
                                                        <v-list-tile-sub-title>
                                                            <p color="accent" class="caption font-weight-regular">
                                                                <span v-html="respuestaso"></span>
                                                                <a>{{ respuestaso }}</a>
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

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click="dialogoapoyo = false" >Cerrar</v-btn>
                            <v-btn v-if="solicitadosino" @click="crearsolicitud()" color="success" >Guardar</v-btn>                                                                      
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
  import { error } from 'util';
  import moment from 'moment'
  import 'moment/locale/es';
  import alertify from 'alertifyjs';
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
            {text:'Suspendido por derivacion a justicia restaurativa',value:'2'},        
        ],
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
        changestatus:'',

        diligencias:[],
        peritos:[],
        perito:'',
        personaid:'',
        respuesta:'',
        numeroInterno:'',
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
        actosdeinvestigacion:[],
        actodeinvestigacion:'',
        idRActosInvestigacion:'',
        auxrespuesta:'',
        auxconclu:'',
        descripcionaux:'',
        tipoDocumentoaux:'',
        dialogoinforme:false,
        tipoinformes:[
            {text: 'Informe parcial', value: '1'},
            {text: 'Informe total', value: '2'}
        ],
        tipoinforme:'',
        modaldocumento2:false,
        descrip:'',
        tipo:'',
        textoinforme:'',
        idPeritoAsignadoPI:'',
        usuarioSolicita:'',
        informes:[],
        comilla:'"',
        textoInforme2:'',
        dialogoreiminfo:false,
        informestotales:[],
        dialogoapoyo: false,
        mensajeapoyo:'',
        estatusso:'',
        mensajeso:'',
        respuestaso:'',
        solicitadosino:false,
        statusmensajesolicitud:'',
        noinforme:'',
        numerooficio:'',
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
        //********************** */
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

            { text: 'Asignada por', value: 'emitidoPor', sortable: true  },
            { text: 'NUC',value: 'nuc' },
            { text: 'Numero Interno',value: 'numeroInterno' },
            { text: 'Solicitado por', value: 'duModulo', sortable: true  }, 
            { text: 'Fecha Recibido', value: 'Fecharecibido' },
            { text: 'Fecha de Aceptacíon', value: 'fechaAceptado' }, 
            { text: 'Fecha de Finalizacíon', value: 'fechaFinalizado' },
            { text: 'Fecha de Entregado', value: 'fechaEntregado' },
            { text: 'Status',value: 'status' }, 
            { text: 'Opciones', value: 'opciones' },           
        ],
        headersar: [

            { text: 'TipoDocumento', value: 'fipoDocumento', sortable: true  },            
            { text: 'FechaRegistro',value: 'fechaRegistro' }, 
            { text: 'Opciones', value: 'opciones' }, 
         
        ],
        headersinf: [

            { text: 'Emitido por', value: 'uusuario', sortable: true  },            
            { text: 'Fecha Registro',value: 'Fecha' }, 
            { text: 'Tipo de Informe',value: 'tipoInforme' }, 
            { text: 'Opciones', value: 'opciones',class:"justify-center layout px-0" }, 
         
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
                me.actodeinvestigacion = "";
                me.mensaje= "";
                me.descrip = "";
                me.tipo = "";
                me.tipoinforme = "";
                me.textoinforme = "";
                me.mensajeapoyo="";
                me.estatusso="";
                me.mensajeso="";
                me.respuestaso="";
                me.noinforme ="";
        },
        generarfecha(){
            var fecha;
            fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY")
            return fecha;      
        },        
        generarfecha2(){
            var fecha;
            fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY");
            return fecha;      
        },  
        loadarchive(item){
            let me = this;
            me.idRActosInvestigacion = item.rActosInvestigacionId;
            me.fidPeritoAsignado = item.idPeritoAsignado;
            me.editedIndex = -1;
            me.dialogarchivo = true;
            me.nuc = item.dnuc;
        },        
        imprimirdocs(item){
            let me = this;
            me.textofinal = item.dTextofinal;
            me.fecha=item.dFechaSolicitud;
            me.nuc = item.dnuc; 
            me.numerooficio = item.numerOficio;
            me.mostrarpdf(item.duUsuario,item.duPuesto,item.duAgencia);                   
            me.modaldocumento = false;
        },
        activarinfodialog(item){
            let me = this;
            me.dialogoinforme = true;
            me.nuc = item.dnuc;
            me.fecha = me.generarfecha2();
            me.idPeritoAsignadoPI = item.idPeritoAsignadoPI;
            me.usuarioSolicita = item.duUsuario;
            me.limpiar();
        },
        imprimirinformes(item){
            let me = this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

            me.$PI.get('api/Informes/ListarporPeritoId/'+ item.idPeritoAsignadoPI,configuracion).then(function(response){
                me.informestotales=response.data;
                me.dialogoreiminfo = true;
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
        imprimirinforme(item){
            let me = this;
            me.fecha = item.fecha;
            me.nuc = item.nuc;
            me.usuarioSolicita = item.personaSolicita;
            me.noinforme = item.noOficio;
            if(item.tipoInforme==1)
            me.mostrarpdf2(item.uUsuario,item.uPuesto,item.uAgencia,"Informe Parcial",item.textoInforme)
            else
            me.mostrarpdf2(item.uUsuario,item.uPuesto,item.uAgencia,"Informe Total",item.textoInforme)
            me.modaldocumento2 = false;
            me.modaldocumento = false;
        },
        generarvistaprevia(){
            let me = this;
            me.$validator.validateAll('dialogodinforme').then(result => {     
                if (result) { 
                    if(me.tipoinforme.value == 1)
                    me.downloadPdf2(me.u_nombre,me.u_puesto,me.u_agencia,me.tipoinforme.text,me.textoinforme)
                    else{ 
                        me.textoInforme2 ="";
                        let header={"Authorization" : "Bearer " + this.$store.state.token};
                        let configuracion= {headers : header};
                        me.$PI.get('api/Informes/ListarporPeritoIdParciales/'+ me.idPeritoAsignadoPI,configuracion).then(function(response){
                            me.informes=response.data;

                            for(var i =0;i < me.informes.length;i++)
                            me.textoInforme2 += me.informes[i].textoInforme + "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+"<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+"<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>";

                            me.textoInforme2 +=me.textoinforme
                            me.downloadPdf2(me.u_nombre,me.u_puesto,me.u_agencia,me.tipoinforme.text ,me.textoInforme2 )

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

                        

                    }
                }
            });
        },
        dialogapoyoact(item){
            let me = this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

            me.$PI.get('api/SolicitudesInteligencia/ValidarExistencia/'+ item.idPeritoAsignadoPI,configuracion).then(function(response){

                if(response.data.statusfound){
                    me.statusmensajesolicitud = "Consultar Estatus/Mensaje/Respuesta"
                    me.dialogoapoyo = true;
                    me.solicitadosino = false;
                    me.idPeritoAsignadoPI = item.idPeritoAsignadoPI;
                    me.estatusso = response.data.statusMensaje;
                    me.mensajeso = response.data.mensaje;
                    me.respuestaso = response.data.respuesta;
                }else{
                    me.statusmensajesolicitud = "Solicitude de apoyo a Inteligencia"
                    me.dialogoapoyo = true;
                    me.solicitadosino = true;
                    me.idPeritoAsignadoPI = item.idPeritoAsignadoPI;
                }
                


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
                       
                    }else{
                        me.$notify('Error al intentar listar los registros','error')    
                    } 
                });
            
        },
        crearsolicitud(){

            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar la información .',           
            function(){

                me.$PI.post('api/SolicitudesInteligencia/Crear',{  

                'peritoAsignadoPIId' : me.idPeritoAsignadoPI,
                'mensaje' : me.mensajeapoyo,
                'respuesta' : "",
                'statusAutorizacion' : false,
                'statusMensaje' : "Solicitado",
                'fecha'  : me.generarfecha(),
                'uDistrito'  : me.u_distrito,
                'uSubproc' : me.u_dirSubPro,
                'uAgencia' : me.u_agencia,
                'uUsuario' : me.u_nombre,
                'uPuesto' : me.u_puesto,
                'uModulo' : me.u_modulo    

            },configuracion).then(function(response){  
                me.$notify('¡La información se guardo correctamente!','success')   
                me.dialogoapoyo = false;      
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
            },
            function(){
                alertify.warning('Verifica la información')
            }
            ).set('labels', {ok:'Guardar', cancel:'Cancelar'});

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
        listar(){
          let me=this;  
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header};
          me.$PI.get('api/PeritoAsignadoPI/ListarporModulo/'+ me.u_idmoduloservicio,configuracion).then(function(response){
                    console.log(response.data);
                    me.bdoperito=response.data;
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
        obtenerdireccionhecho(item){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$CAT.get('api/DireccionDelitoes/ListarPoridHecho/'+ item.drHechoId,configuracion).then(function(response){
                    me.center2.lat = + response.data.lat
                    me.center2.lng = + response.data.lng  
                    me.addMarker2();
                    me.modalGeolocalizacion2 = 1;
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
        addMarker2() {
                
            const marker = {
                lat: this.center2.lat,
                lng: this.center2.lng, 

            };
            this.markers2.push({ position: marker });
            this.places2.push(this.currentPlace2);
            this.center2 = marker;
            this.currentPlace2 = null;
                    
        },
        activarterreno(){
            this.opcionesmapa.mapTypeId = 'roadmap'
        },
        activarsatellite(){
            this.opcionesmapa.mapTypeId = 'hybrid' 
        },
        aumentarzoorm(){
            this.zoom++;
        },
        disminuirzoom(){
            this.zoom--;
        },
        imprim1(){
                
            var printContents = document.getElementById('mapa').outerHTML;
            var w = window.open();
            w.document.write("<div style='position: absolute; left:500px; top:100px;'<h1 style='font-size:10px; color:blue;'>"+printContents+"<h1></div>");
            //w.document.write(printContents);
            w.print();
        
        },
        listarActos(item){
          let me=this;  
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header};
          me.actosdeinvestigacion = [];
          var ActosArrays;
                me.$CAT.get('api/RActosInvestigacion/ListarDetallesporActo/'+ item.rActosInvestigacionId,configuracion).then(function(response){
                        ActosArrays = response.data;
                        ActosArrays.map(function(x){
                            me.actosdeinvestigacion.push({text: x.servicio,value: x.idActosInDetetalle});
                        });
                        me.actosdeinvestigacion.push({text:"General",value: 0});
                        me.limpiar();
                        me.idRActosInvestigacion = item.rActosInvestigacionId;
                        me.fidPeritoAsignado = item.idPeritoAsignadoPI;
                        me.editedIndex = 1;
                        me.dialog = true;
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
        listarActosCR(item){
          let me=this;  
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header};
          me.actosdeinvestigacion = [];
          var ActosArrays;
          me.auxrespuesta = item.respuesta;
          me.auxconclu = item.conclusion;
                me.$CAT.get('api/RActosInvestigacion/ListarDetallesporActo/'+ item.rActosInvestigacionId,configuracion).then(function(response){
                        ActosArrays = response.data;
                        ActosArrays.map(function(x){
                            me.actosdeinvestigacion.push({text: x.servicio,value: x.idActosInDetetalle,respuesta : x.respuesta, conclusion: x.conclusion });
                        });
                        me.actosdeinvestigacion.push({text:"General",value: 0});
                        me.limpiar();
                        me.idRActosInvestigacion = item.rActosInvestigacionId;
                        me.fidPeritoAsignado = item.idPeritoAsignadoPI;
                        me.dialogcsmsj = true;
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
        cambiarCR(){
            let me = this;
            if(me.actodeinvestigacion.value==0){
                me.conclusionitem = me.auxconclu;
                me.mensajeitem = me.auxrespuesta;

            } else{
                me.conclusionitem = me.actodeinvestigacion.conclusion;
                me.mensajeitem = me.actodeinvestigacion.respuesta;
            }   
        },
        cambiarstatus(){
            let me= this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var fecha;
            me.$validator.validateAll('datossatus').then(result =>  {
                if (result) { 
                    
                        if(me.changestatus.value != 1){
                                me.conclusion = "";
                                fecha = "na";                                
                        }else fecha= me.generarfecha();
                        
                        if(me.actodeinvestigacion.value != 0){
                            me.$CAT.put('api/RActosInvestigacion/ActualizarstatusDetalle',{

                            'idActosInDetetalle': me.actodeinvestigacion.value,
                            'status': me.changestatus.text,      
                            'conclusion': me.conclusion,          
                            'respuesta': me.mensaje,             
                            'fechaFinalizado':fecha     

                        },configuracion).then(function(response){                                                    
                            me.$notify('La información se actualizo correctamente !!!','success')                             
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
                                me.$notify("No esta autorizado para ver esta página", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (err.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar actualizar el registro!!!','error')   
                            } 
                        });   
                        } else{
                            
                            me.$CAT.put('api/RActosInvestigacion/Actualizarstatus',{
                                'idRActosInvestigacion': me.idRActosInvestigacion,
                                'status': me.changestatus.text                  
                            },configuracion).then(function(response){    
                                if(me.changestatus.value != 1){
                                    me.conclusion = "";
                                    fecha = "na";                                
                                }else fecha=me.generarfecha();
                                        
                                me.$notify('La información se actualizo correctamente !!!','success')
                                
                                me.$PI.put('api/PeritoAsignadoPI/ActualizarConclu',{ 
                                        'idPeritoAsignadoPI': me.fidPeritoAsignado, 
                                        'conclusion': me.conclusion,          
                                        'respuesta': me.mensaje,             
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
                                            me.$notify("No esta autorizado para ver esta página", 'error')
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
                                       
                } 
            })
        },
        verinfo(item){
            let me = this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            if(item.statusAC == 'Asignado')
            me.$CAT.put('api/RActosInvestigacion/Actualizarstatus',{
                        'idRActosInvestigacion': item.rActosInvestigacionId,
                        'status': "Enproceso"                  
                    },configuracion).then(function(response){   
                        me.$PI.put('api/PeritoAsignadoPI/Actualizarultimostatus',{

                                'idPeritoAsignadoPI' : item.idPeritoAsignadoPI

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
                                    me.$notify("No esta autorizado para ver esta página", 'error')
                                    me.e403= true
                                    me.showpage= false 
                                } else if (err.response.status==404){
                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                }else{
                                    me.$notify('Error al intentar actualizar el registro!!!','error')   
                                } 
                            });                       
                        me.$notify('La información se actualizo correctamente !!!','success')
                        //me.dialog=false;      
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
                            me.$notify('Error al intentar actualizar el registro!!!','error')   
                        } 
                    });

     
            me.numerooficio = item.numerOficio;
            me.textofinal = item.dTextofinal;
            me.fecha=item.dFechaSolicitud;
            me.nuc = item.dnuc; 
            me.downloadPdf(item.duUsuario,item.duPuesto,item.duAgencia);                   
            me.modaldocumento = true;
        },
        consultararchivo(item){
            let me = this;
            me.dialogpictures = true;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$PI.get('api/Fotos/Listar/'+ item.rActosInvestigacionId,configuracion).then(function(response){
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
        verimagen(item){
            let me = this;
                me.rutaconsulta = item.ruta;
                me.descrip = item.descripcionDocumento;
                me.tipo = item.tipoDocumento;
                me.dialogimagen= true;
        },
        guardar(){ 
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
                             
                                 me.$PI.post('api/Fotos/Post/'+nombreCarpeta+'/'+me.GUID,
                                    formData,
                                    {
                                    headers: {
                                                'Content-Type': 'multipart/form-data'
                                            } 
                                    },configuracion  
                                ).then(function(response){
                                    console.log('SUCCESS!!');
                                        console.log(response.data.ruta);
                                        me.$PI.post('api/Fotos/Crear',{  

                                            'rActoInvestigacionId' : me.idRActosInvestigacion,
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
        guardarinforme(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar la información .',           
            function(){
            var textinfo ="";
            if(me.tipoinforme.value == 1)
            textinfo = me.textoinforme;
            else
            textinfo = me.textoInforme2;

            me.$PI.post('api/Informes/Crear',{  

                'peritoAsignadoPIId' : me.idPeritoAsignadoPI,
                'tipoInforme' : me.tipoinforme.value,
                'TextoInforme' : textinfo,
                'fecha' : me.generarfecha(),
                'uDistrito' : me.u_distrito,
                'uSubproc' : me.u_dirSubPro,
                'uAgencia' : me.u_agencia,
                'uUsuario' : me.u_nombre,
                'uPuesto' : me.u_puesto,
                'uModulo' : me.u_modulo,   
                'NoOficio' :me.noinforme              

            },configuracion).then(function(response){  
                me.$notify('¡La información se guardo correctamente!','success')   
                me.modaldocumento2 = false;   
                me.dialogoinforme = false;   
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
            },
            function(){
                alertify.warning('Verifica la información')
            }
            ).set('labels', {ok:'Guardar', cancel:'Cancelar'});

        },
        mostrarpdf(nombre,puesto,agencia){

            let me=this; 
            var dd = me.downloadPdf();
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

           if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs; 
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
                    pdfMake.vfs = pdfFonts.vfs; 
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
                        text:
                        '\n'+this.u_distrito+", Hidalgo a "+this.fecha+ "\n\n\n\n\n\n\n\n",                        
                        style: 'Fecha',
                        alignment: 'right', 
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
                        //color: COLOR_TEXTO_PIE_PAGINA
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
         mostrarpdf2(nombre,puesto,agencia,tipo,textoinfo){

            let me=this; 
            var dd = me.downloadPdf();
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

           if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs; 
            }
            var dd = me.downloadPdf2(nombre,puesto,agencia,tipo,textoinfo);
            var doc = pdfMake.createPdf(dd);
             
                
            var doc = pdfMake.createPdf(dd).print();
               
        },
        downloadPdf2(nombre,puesto,agencia,tipo,textoinfo) {

            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

            if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs; 
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
                textoinfo
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
                        text:"Asunto: Se emite "+  tipo+'\n'+
                        "NO.Informe: "+ this.noinforme,                    
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
                        text: this.usuarioSolicita +'\n\n'+
                        "P R E S E N T E" +'\n'+'\n'+'\n' ,                        
                        style: 'DePara',
                        alignment:'justify',
                    },           
                    {
                        text:  html ,                        
                        style: 'Texto',
                    },
                    {
                        text: '\n'+'\n'+'\n'+ "RESPETUOSAMENTE"+"\n\n",   
                        alignment :'center',                     
                        style: 'DePara',                                                           
                    },
                    {
                        text: nombre + "\n\n",   
                        alignment :'center',                     
                        style: 'DePara',                                                           
                    },
                    {
                        text: puesto + "\n\n",   
                        alignment :'center',                     
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
                        //color: COLOR_TEXTO_PIE_PAGINA
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
            var f = document.getElementById('iframepdf2');
            var callback = function(url) { f.setAttribute('src',url); }
            doc.getDataUrl(callback, doc);
            this.modaldocumento2 = true;
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