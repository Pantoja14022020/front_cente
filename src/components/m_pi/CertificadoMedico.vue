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
                    <v-toolbar-title class="font-weight-regular" >Certificados medicos de personas sin registro </v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>

            <v-tooltip bottom>
                <template v-slot:activator="{ on }"> 
                    <v-btn class="mx-2" slot="activator" v-on="on" @click="agregar()" fab dark small color="success">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                </template>
                <span>Agregar registro</span>
            </v-tooltip>
            
                  
                                          
        </v-toolbar>
        
        <v-data-table
                :headers="headers"
                :items="certificados"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                 >
                
                <template slot="items" class="white" slot-scope="props">
                    

                    <td>{{ props.item.usuario}}</td>   
                    <td>{{ props.item.uModulo}}</td> 
                    <td>{{ props.item.nombre }}</td>
                    <td>{{ props.item.apellidoP}}</td> 
                    <td>{{ props.item.apellidoM}}</td>  
                    <td>{{ props.item.numeroControlf}}</td>                     
                    <td>{{ props.item.fechasys.substring(8,10) +" de "+ obtenermes(props.item.fechasys.substring(5,7)-1)+" del "+props.item.fechasys.substring(0,4)}}</td>  
                    <td class="justify-center layout px-0">
                        <v-tooltip bottom   >
                            <template v-slot:activator="{ on }">
                                <v-icon 
                                    class="mr-2" v-on="on" color="warning"
                                    @click="imprimir(props.item)"
                                    >
                                    print
                                </v-icon> 
                            </template>
                            <span>Re imprimir</span>
                        </v-tooltip> 
                    </td> 
                                 
                </template>
                <template slot="no-data">
                <v-btn color="primary"  @click="listar()" >Resetear</v-btn>
                </template>
                
        </v-data-table> 

        <v-dialog v-model="dialogo" fullscreen hide-overlay transition="dialog-bottom-transition">
        
            <v-card>
            <v-toolbar dark color="primary">
                
                <v-toolbar-title>Registrar detenido</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn  color=success text @click="generarpdf()">Vista previa</v-btn>
                <v-btn icon   @click="dialogo = false">
                <v-icon>close</v-icon>
                </v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                    <v-flex class="espaciado" xs12 sm12 md6 lg6 >

                            <v-text-field 
                            name="Nombre"
                            label="*Nombre:" 
                            v-model='Nombre' 
                            v-validate="'required'" 
                            :error-messages="errors.collect('Nombre')"
                        ></v-text-field>
                        
                        <v-text-field 
                            name="ApellidoP"
                            label="*Apellido Paterno:" 
                            v-model='ApellidoP' 
                            v-validate="'required'" 
                            :error-messages="errors.collect('ApellidoP')"
                        ></v-text-field>
                    </v-flex>

                    <v-flex class="espaciado" xs12 sm12 md6 lg6 >
                        <v-text-field 
                            name="ApellidoM"
                            label="*Apellido Materno:" 
                            v-model='ApellidoM' 
                            v-validate="'required'" 
                            :error-messages="errors.collect('ApellidoM')"
                        ></v-text-field>

                        <v-text-field 
                            name="número de oficio"
                            label="*Número de oficio:" 
                            v-model='nouniconacional' 
                            v-validate="'required'" 
                            :error-messages="errors.collect('número de oficio')"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>      
            </v-card>
        </v-dialog> 

        <v-dialog v-model="modaldocumento" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    <v-btn color=success text @click.native="guardar()">Guardar solicitud</v-btn>            
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
    </v-flex>
</v-layout> 
</template>

 
<script> 
  import axios from 'axios'  
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
        showpage:true,
        e401:false,
        e403:false,
        logo1:'',
        logo2:'',
        //*************** */
        dialogo:false,
        certificados:[],
        Nombre:'',
        ApellidoP:'',
        ApellidoM:'',
        nouniconacional:'',
        agenciainfo:[],
        modaldocumento:false,
        fecha:'',
        agenciainfodr:'',
        agenciainfotel:'',
        auxsubproc:'',
        auxagencia:'',
        auxdistrito:'',
        numeromaximo:'',
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

            { text: 'Emitida por', value: 'usuario', sortable: true  }, 
            { text: 'Modulo', value: 'modulo', sortable: true  },             
            { text: 'Nombre', value: 'nombre' }, 
            { text: 'Apellido Paterno', value: 'apellidoP' },
            { text: 'Apellido Materno', value: 'apellidoM' },
            { text: 'No de solicitud', value: 'numeroControlf' },
            { text: 'Fecha de solicitud', value: 'fechasys' },
            { text: 'Opciones', value: 'op' },
        ],
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
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
        u_nodistrito:'',
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
                me.u_nodistrito= me.$store.state.usuario.nodistrito;



        me.obtenernumeromaximo();
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
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            
            this.$conf.get('api/ConfGlobals/Listar',configuracion).then(function(response){
            me.logo1= response.data.logo1;
            me.logo2= response.data.logo2;
                
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
        informacionagencia(){
                 let me=this;  
                 let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia,configuracion).then(function(response){
                    me.agenciainfodr= response.data["direccion"];
                    me.agenciainfotel = response.data["telefono"];
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
        generarpdf(){
            this.$validator.validate().then(result => {
                if (result) { 
                    this.fecha = this.generarfecha();
                    this.auxsubproc= this.u_dirSubPro;
                    this.auxagencia = this.u_agencia;
                    this.auxdistrito = this.u_distrito;
                    this.downloadPdf(this.u_nombre,this.u_puesto,this.u_agencia);
                }
            })
        },
        imprimir(item){
            this.auxsubproc= item.uSubproc;
            this.auxagencia = item.uAgencia;
            this.auxdistrito = item.uDistrito;
            this.nouniconacional = item.numUnicoRegistro;
            this.Nombre = item.nombre
            this.ApellidoP =item.apellidoP
            this.ApellidoM = item.apellidoM
            this.agenciainfodr = item.numeroAgencia
            this.agenciainfotel = item.telefonoAgencia
            this.fecha = item.fechasys.substring(8,10) +" de "+ this.obtenermes(item.fechasys.substring(5,7)-1)+" del "+item.fechasys.substring(0,4)
            this.mostrarpdf(item.usuario,item.uPuesto,item.uAgencia)
            this.modaldocumento = false;
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
            let me = this;
            me.limpiar();
            me.dialogo = true;
        },
        guardar(){
           this.$validator.validate().then(result => {
                    if (result) { 
                            let me=this;
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};
                            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar la información .',           
                            function(){
                            me.numeromaximo += 1
                            me.$PI.post('api/CMedicoPSR/Crear',{  
                                'Nombre' : me.Nombre,
                                'ApellidoP' : me.ApellidoP,
                                'ApellidoM' : me.ApellidoM,
                                'NumUnicoRegistro': me.nouniconacional,
                                'uDistrito' : me.u_distrito,
                                'USubproc' : me.u_dirSubPro,
                                'UAgencia' : me.u_agencia,
                                'Usuario' : me.u_nombre,
                                'UPuesto' : me.u_puesto,
                                'UModulo' : me.u_modulo,
                                'ModuloServicioId': me.u_idmoduloservicio,
                                'Status': "Solicitado",
                                'Respuesta': '',
                                'FechaAsignacion': '0001-01-01 00:00:00.0000',
                                'NumeroAgencia': me.agenciainfodr,
                                'TelefonoAgencia': me.agenciainfotel,
                                'NodeSolicitud': me.nouniconacional,
                                'NumeroControl': me.numeromaximo,
                                'NumeroDistrito': me.u_nodistrito

                            },configuracion).then(function(response){
                                me.$notify('La información se guardo correctamente !!!','success')  
                                me.dialogo = false;
                                me.modaldocumento= false;
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
                            },
                            function(){
                                alertify.warning('Verifica la información')
                            }
                            ).set('labels', {ok:'Guardar', cancel:'Cancelar'});
                            } 
                            })
           
        },
        limpiar(){    
            let me = this;
            me.Nombre ='';
            me.ApellidoP ='';
            me.ApellidoM ='';
            me.nouniconacional = '';
        },
        generarfecha(){
            return  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY");                 
        }, 
        listar(){
          let me=this;  
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header};
          me.$PI.get('api/CMedicoPSR/Listar',configuracion).then(function(response){
                    //console.log(response);
                    me.certificados=response.data;
                }).catch(err => { 
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        this.e401 = true,
                        this.showpage= false
                    } else if (err.response.status==403){ 
                        me.$notify("No esta autorizado para ver esta pagina", 'error')
                        this.e403= true
                        this.showpage= false 
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar leer la lista roles!!!','error')   
                    } 
                });
                
        },
        obtenernumeromaximo(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$PI.get('api/CMedicoPSR/ObtenernumeroMaximoporDistrito/'+ me.u_nodistrito,configuracion).then(function(response){
                me.numeromaximo = response.data.numeroMaximo;
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
                    me.$notify("No hay registros previos", 'error')
                }else{
                    me.$notify('Error al intentar listar los registros!!!','error')    
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
            var u_dirSubPro = this.auxsubproc;
            var u_agencia = this.auxagencia;
            var distrito = this.auxdistrito;
            var fecha = this.fecha;
            var numerooficio = this.nouniconacional;
            //***************************************************************************** */
            var html =htmlToPdfmake(
                this.textofinal
            );
            //***************************************************************************** */
            var agenciainfodr = this.agenciainfodr;
            var agenciainfotel = this.agenciainfotel;

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
                        ]
                 
                },
              
                content: [
                    
                    {
                        text:"Asunto: Solicitud servicio médico\n"+
                        'Número de oficio: ' + numerooficio ,           
                        style: 'Nooficio',
                        alignment: 'right', 
                    },
                    {
                        text:
                        '\n'+distrito+", Hidalgo a "+fecha+ "\n\n\n\n\n\n\n\n",                        
                        style: 'Fecha',
                        alignment: 'right', 
                    }, 
                                  
                    {
                        text:   "Por medio de la presente, solicito tenga a bien solicitar servicio médico para la siguiente persona sin registro previo: \n\n",                               
                        style: 'Texto',
                    },
                    {
                        text:   this.Nombre+" "+this.ApellidoP+" "+this.ApellidoM,                               
                        style: 'Textob',
                    },
                    {
                        text: "\nAgradecinendo de antemano la atención brindada a mi petición",                               
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
                    Textob:{
                        fontSize: 10,
                        alignment:'justify',
                        bold:true
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
.espaciado{
    padding: 30px !important; 
}
</style>