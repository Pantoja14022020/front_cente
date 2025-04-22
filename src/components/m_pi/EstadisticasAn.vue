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
                    <v-toolbar-title class="font-weight-regular" >Estadísticas por años</v-toolbar-title>
                   
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
                        <v-date-picker locale="es"   type="month"  v-model="fechaInicio" no-title scrollable>
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
                        <v-date-picker locale="es" type="month"  v-model="fechaFin" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                        </v-date-picker>
                    </v-menu>

                    <v-btn @click="listarporfecha()"  color="primary" dark class="mb-2">Buscar</v-btn>

                    
                      
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
                    <td>{{ props.item.uModulo}}</td> 
                    <td>{{ props.item.fechaRecibido }}</td> 
                    <td>{{ props.item.fechaAceptado }}</td> 
                    <td>{{ props.item.fechaFinalizado }}</td> 
                    <td>{{ props.item.fechaEntregado}}</td>   
                    <td>{{ props.item.numeroInterno }}</td> 
                    <td>{{ props.item.statusAC }}</td>
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
                            :items="registros"      
                            hide-actions        
                            :rows-per-page-items="rowsPerPageItemsr"
                            :pagination.sync="paginationr"
                            >
                            
                            <template  slot="items" class="white" slot-scope="props"  >
                                
                                <td class="caption1">{{ props.item.mes}}</td>   
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
                        :items="registrosperitos"  
                        hide-actions                 
                        :rows-per-page-items="rowsPerPageItemsr"
                        :pagination.sync="paginationr"
                        >
                        
                        <template slot="items" class="white" slot-scope="props">
                            
                            <td class="caption1">{{ props.item.nombre}}</td>   
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
  import n401 from './401.vue'
  import n403 from './403.vue'
  import { all } from 'q'
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
        nuc:'',
        showpage:true,
        e401:false,
        e403:false,
        //*************** */
        bdoperito:[],
        estados:[],
        fechaInicio:'',
        fechaFin:'',
        menu1:'',
        menu2:'',
        fechai:'',
        fechaf:'',
        vacio:[],
        step:-1,
        step2:-1,
        conteograficas:0,
        modaldocumento:false,
        agenciainfo:'',
        textotitulo1:'',
        textotitulo2:'',
        barra1:false,
        barra2:false,
        linea1:false,
        linea2:false,
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

            { text: 'Emitida por', value: 'emitidoPor', sortable: true }, 
            { text: 'Modulo', value: 'modulo', sortable: true  }, 
            { text: 'Fecha Recibido', value: 'Fecharecibido' },
            { text: 'Fecha de Aceptacíon', value: 'fechaAceptado' }, 
            { text: 'Fecha de Finalizacíon', value: 'fechaFinalizado' },
            { text: 'Fecha de Entregado', value: 'fechaEntregado' },
            { text: 'Numero Interno',value: 'numeroInterno' }, 
            { text: 'Status',value: 'status' },
            { text: 'Modulo',value: 'modulo' },                     
        ],
        headersr: [

            { text: 'Mes', value: 'mesno', sortable: false, class:'mytable' }, 
            { text: 'Asignados', value: 'asignado',sortable: false, class:'mytable'}, 
            { text: 'En Proceso ', value: 'enProceso',sortable: false, class:'mytable' },
            { text: 'Finalizados', value: 'finalizado',sortable: false, class:'mytable' }, 
            { text: 'Suspendidos', value: 'suspendido',sortable: false, class:'mytable' },
            { text: 'Pospuestos', value: 'pospuesto',sortable: false, class:'mytable' },
            { text: 'Entregados',value: 'entregado',sortable: false, class:'mytable' }, 
            { text: 'Total',value: 'total',sortable: false, class:'mytable' },                           
        ],
        headersrp: [

            { text: 'Perito', value: 'nombre', sortable: false, class:'mytable'}, 
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
            rowsPerPage: 20
        },
        paginationr: {
            rowsPerPage: 12
        },
        rowsPerPageItemsr: [12],
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
            this.fechai = this.fechaInicio.substring(0,4); 
            if(this.menu2)
            this.fechaf = this.fechaFin.substring(0,4); 
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
                .attr('class','flex xs6 sm6 md6')   //A la nueva div creada le agrega el attributo de v-flex
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
                    me.downloadPdf('grafica'+cortar[0],"Estadísticas de "+me.fechai+ " a "+me.fechaf +", "+ me.registrosperitos[0].nombre) 
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
                .attr('class','flex xs6 sm6 md6')   //A la nueva div creada le agrega el attributo de v-flex
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
                    me.downloadPdf('grafica'+cortar[0],"Estadísticas de "+me.fechai+ " a "+me.fechaf +", "+ me.registrosperitos[0].nombre) 
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
        graficarindividual(perito, asignados,enprocesos,finalizados,suspendidos,pospuestos,entregados){
            let me = this;
            var ctx = document.getElementById('grafica'+me.conteograficas);
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    
                    labels: perito,
                    datasets: [{
                        label: 'Asignados: '+ asignados,
                        data: asignados,                       
                        backgroundColor: [
                           'rgba(255, 159, 64, 1)',
                        ],
                        borderColor: [                          
                           'rgba(255, 159, 64, 1)',                         
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'En Proceso: '+enprocesos,
                        data: enprocesos,
                        backgroundColor: [                        
                            'rgba(153, 102, 255, 1)',                      
                        ],
                        borderColor: [
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    },                  
                    {
                        label: 'Pospuestos: '+pospuestos,
                        data: pospuestos,
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',                      
                        ],
                        borderWidth: 1
                    },                   
                    {
                        label: 'Suspendidos: '+suspendidos,
                        data: suspendidos,
                        backgroundColor: [
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderColor: [                          
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'Finalizados: '+finalizados,
                        data: finalizados,
                        backgroundColor: [
                            'rgba(75, 192, 192, 1)',
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',                           
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'Entregados: '+entregados,
                        data: entregados,
                        backgroundColor: [                        
                            'rgba(54, 162, 235, 1)',                          
                        ],
                        borderColor: [                         
                            'rgba(54, 162, 235, 1)',                           
                        ],
                        borderWidth: 1
                    }
                    
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

        },

        graficarbarra(division,meses, asignados,enprocesos,finalizados,suspendidos,pospuestos,entregados){
            let me = this;
            var ctx = document.getElementById(division);
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    
                    labels: meses,
                    datasets: [{
                        label: 'Asignados: '+asignados,
                        data: asignados,                       
                        backgroundColor: [
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                        ],
                        borderColor: [                          
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'En Proceso: '+enprocesos,
                        data: enprocesos,
                        backgroundColor: [                        
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderColor: [
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    },                  
                    {
                        label: 'Pospuestos: '+pospuestos,
                        data: pospuestos,
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',                      
                        ],
                        borderWidth: 1
                    },                   
                    {
                        label: 'Suspendidos: '+suspendidos,
                        data: suspendidos,
                        backgroundColor: [
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderColor: [                          
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'Finalizados: '+finalizados,
                        data: finalizados,
                        backgroundColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',                           
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'Entregados: '+entregados,
                        data: entregados,
                        backgroundColor: [                        
                            'rgba(54, 162, 235, 1)',    
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',                       
                        ],
                        borderColor: [                         
                            'rgba(54, 162, 235, 1)',    
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',                          
                        ],
                        borderWidth: 1
                    }
                    
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
                            fontSize: 12,
                            fontSyle: 'bold',
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

        },
        
        graficarlinea(division,meses, asignados,enprocesos,finalizados,suspendidos,pospuestos,entregados){
            let me = this;
            var ctx = document.getElementById(division);
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    
                    labels: meses,
                    datasets: [{
                        label: 'Asignados: '+asignados,
                        data: asignados,                       
                        backgroundColor: [
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                        ],
                        borderColor: [                          
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                           'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 3
                    },
                    {
                        label: 'En Proceso: '+enprocesos,
                        data: enprocesos,
                        backgroundColor: [                        
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                        ],
                        borderColor: [
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 3
                    },                  
                    {
                        label: 'Pospuestos: '+pospuestos,
                        data: pospuestos,
                        backgroundColor: [
                            'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',                      
                        ],
                        borderWidth: 3
                    },                   
                    {
                        label: 'Suspendidos: '+suspendidos,
                        data: suspendidos,
                        backgroundColor: [
                            'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                        ],
                        borderColor: [                          
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 3
                    },
                    {
                        label: 'Finalizados: '+finalizados,
                        data: finalizados,
                        backgroundColor: [
                            'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(75, 192, 192, 1)',                           
                        ],
                        borderWidth: 3
                    },
                    {
                        label: 'Entregados: '+entregados,
                        data: entregados,
                        backgroundColor: [                        
                            'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',
                           'rgba(0, 0, 0, 0.0)',                      
                        ],
                        borderColor: [                         
                            'rgba(54, 162, 235, 1)',    
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',                          
                        ],
                        borderWidth: 3
                    }
                    
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

        },
        listarporfecha(){
          let me=this;
          me.$validator.validate().then(result => {     
            if (result) {   
                me.asignado=0;
                me.enproceso=0;
                me.finalizado=0;
                me.suspendido=0;
                me.pospuesto=0;
                me. entregado=0;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.$PI.get('api/PeritoAsignadoPI/Listarporidfecha/'+me.fechai+"-01-01 00:00:00.0000000"+'/'+me.fechaf+"-12-31 23:23:59.0000000",configuracion).then(function(response){
                            //console.log(response);
                            me.total =0;
                            me.bdoperito=response.data;
                            me.calcular(response.data);
                            me.textotitulo1 = "Estadísticas de "+me.fechai+ " a "+me.fechaf;
                            me.textotitulo2 = "Estadísticas de "+me.fechai+ " a "+me.fechaf+" por perito";
                            me.eliminar();
                            //variables para graficar
                            var mes=[];      
                            var asignado=[];
                            var enproceso=[];
                            var finalizado=[];
                            var suspendido=[];
                            var pospuesto=[];
                            var entregado=[];       
                            //ciclo para extraer datos
                            for(var i=0;i<me.registros.length-1;i++){
                                mes.push(me.registros[i].mes)
                                asignado.push(me.registros[i].asignado)
                                enproceso.push(me.registros[i].enproceso)
                                finalizado.push(me.registros[i].finalizado)
                                suspendido.push(me.registros[i].suspendido)
                                pospuesto.push(me.registros[i].pospuesto)
                                entregado.push(me.registros[i].entregado)
                            }   
                            me.graficarbarra("myChart",mes,asignado,enproceso,finalizado,suspendido,pospuesto,entregado);
                            me.graficarlinea("myChartlinea",mes,asignado,enproceso,finalizado,suspendido,pospuesto,entregado);
                            mes=[];      
                            asignado=[];
                            enproceso=[];
                            finalizado=[];
                            suspendido=[];
                            pospuesto=[];
                            entregado=[];
                            for(var i=0;i<me.registrosperitos.length-1;i++){
                                mes.push(me.registrosperitos[i].nombre)
                                asignado.push(me.registrosperitos[i].asignado)
                                enproceso.push(me.registrosperitos[i].enproceso)
                                finalizado.push(me.registrosperitos[i].finalizado)
                                suspendido.push(me.registrosperitos[i].suspendido)
                                pospuesto.push(me.registrosperitos[i].pospuesto)
                                entregado.push(me.registrosperitos[i].entregado)
                            }
                            me.graficarbarra("myChart2",mes,asignado,enproceso,finalizado,suspendido,pospuesto,entregado);
                            me.graficarlinea("myChartlinea2",mes,asignado,enproceso,finalizado,suspendido,pospuesto,entregado);

                            for(var i=0;i<me.registros.length-1;i++){
                                me.crear();
                                me.graficarindividual([me.registros[i].mes],[me.registros[i].asignado],[me.registros[i].enproceso],[me.registros[i].finalizado],[me.registros[i].suspendido],[me.registros[i].pospuesto],[me.registros[i].entregado]);
                                me.conteograficas++;
                            }
                            for(var i=0;i<me.registrosperitos.length-1;i++){
                                me.crear2();
                                me.graficarindividual([me.registrosperitos[i].nombre],[me.registrosperitos[i].asignado],[me.registrosperitos[i].enproceso],[me.registrosperitos[i].finalizado],[me.registrosperitos[i].suspendido],[me.registrosperitos[i].pospuesto],[me.registrosperitos[i].entregado]);
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
                }         
            }) 
        },  
        calcular(registros){
            let me = this;
            
                me.registros = [];
                me.registrosperitos =[];
             
             var estado = false;
             var estado2 = false;
            
            registros.forEach(function (registro){               
                 if(registro.statusAC == 'Finalizado')
                 me.finalizado++;
                 else if(registro.statusAC == 'Asignado')
                 me.asignado++;
                 else if(registro.statusAC == 'Enproceso')
                 me.enproceso++;
                 else if(registro.statusAC == 'Suspendido')
                 me.suspendido++;
                 else if(registro.statusAC == 'Pospuesto')
                 me.pospuesto++;
                 else if(registro.statusAC == 'Entregado')
                 me.entregado++;
/////////////////////////////////////////////////////////////////////////////
                        
                        for(var j = 0;j< me.registros.length;j++){
                            if(me.registros[j].mes == registro.ultmimoStatus.substring(0,4) )  {  
                                estado = true;                            
                                if(registro.statusAC == 'Finalizado')
                                    me.registros[j].finalizado++
                                else if(registro.statusAC =='Asignado')
                                    me.registros[j].asignado ++
                                else if(registro.statusAC == 'Enproceso')
                                    me.registros[j].enproceso++
                                else if(registro.statusAC == 'Suspendido')
                                    me.registros[j].suspendido++
                                else if(registro.statusAC == 'Pospuesto')
                                    me.registros[j].pospuesto++
                                else if(registro.statusAC == 'Entregado')
                                    me.registros[j].entregado++                            
                                    me.registros[j].total = me.registros[j].finalizado + me.registros[j].asignado +  me.registros[j].enproceso + me.registros[j].suspendido + me.registros[j].pospuesto +  me.registros[j].entregado;
                            }  
                        }    
                            
                        if(!estado) { 
                            
                            estado = false;
                                if(registro.statusAC == 'Finalizado')
                                    me.registros.push({mes: registro.ultmimoStatus.substring(0,4), asignado:0,enproceso:0,finalizado:1,suspendido:0,pospuesto:0,entregado:0,total:0});
                                else if(registro.statusAC =='Asignado')
                                    me.registros.push({mes: registro.ultmimoStatus.substring(0,4), asignado:1,enproceso:0,finalizado:0,suspendido:0,pospuesto:0,entregado:0,total:0});
                                else if(registro.statusAC == 'Enproceso')
                                    me.registros.push({mes: registro.ultmimoStatus.substring(0,4), asignado:0,enproceso:1,finalizado:0,suspendido:0,pospuesto:0,entregado:0,total:0});
                                else if(registro.statusAC == 'Suspendido')
                                    me.registros.push({mes: registro.ultmimoStatus.substring(0,4), asignado:0,enproceso:0,finalizado:0,suspendido:1,pospuesto:0,entregado:0,total:0});
                                else if(registro.statusAC == 'Pospuesto')
                                    me.registros.push({mes: registro.ultmimoStatus.substring(0,4), asignado:0,enproceso:0,finalizado:0,suspendido:0,pospuesto:1,entregado:0,total:0});
                                else if(registro.statusAC == 'Entregado')                              
                                    me.registros.push({mes: registro.ultmimoStatus.substring(0,4), asignado:0,enproceso:0,finalizado:0,suspendido:0,pospuesto:0,entregado:1,total:0});      
                                
                        }         
                        estado = false;                
                    
            
/////////////////////////////////////////////////////////////////////////////
                 for(var zi=0;zi<me.registrosperitos.length;zi++){                               
                    if(me.registrosperitos[zi].nombre == registro.modulo){ 

                                estado2 = true;
                                if(registro.statusAC == 'Finalizado')
                                    me.registrosperitos[zi].finalizado++
                                else if(registro.statusAC =='Asignado')
                                    me.registrosperitos[zi].asignado ++
                                else if(registro.statusAC == 'Enproceso')
                                    me.registrosperitos[zi].enproceso++
                                else if(registro.statusAC == 'Suspendido')
                                    me.registrosperitos[zi].suspendido++
                                else if(registro.statusAC == 'Pospuesto')
                                    me.registrosperitos[zi].pospuesto++
                                else if(registro.statusAC == 'Entregado')
                                    me.registrosperitos[zi].entregado++  
                                me.registrosperitos[zi].total = me.registrosperitos[zi].finalizado + me.registrosperitos[zi].asignado +  me.registrosperitos[zi].enproceso + me.registrosperitos[zi].suspendido + me.registrosperitos[zi].pospuesto +  me.registrosperitos[zi].entregado;
                                
                    } 
                         
                }
            if(estado2 == false){                               
                                me.registrosperitos.push({nombre: registro.modulo, asignado:0,enproceso:0,finalizado:0,suspendido:0,pospuesto:0,entregado:0,total:0});
                                    if(registro.statusAC == 'Finalizado')
                                    me.registrosperitos[zi].finalizado++
                                    else if(registro.statusAC =='Asignado')
                                        me.registrosperitos[zi].asignado ++
                                    else if(registro.statusAC == 'Enproceso')
                                        me.registrosperitos[zi].enproceso++
                                    else if(registro.statusAC == 'Suspendido')
                                        me.registrosperitos[zi].suspendido++
                                    else if(registro.statusAC == 'Pospuesto')
                                        me.registrosperitos[zi].pospuesto++
                                    else if(registro.statusAC == 'Entregado')
                                        me.registrosperitos[zi].entregado++   
                                    me.registrosperitos[zi].total = me.registrosperitos[zi].finalizado + me.registrosperitos[zi].asignado +  me.registrosperitos[zi].enproceso + me.registrosperitos[zi].suspendido + me.registrosperitos[zi].pospuesto +  me.registrosperitos[zi].entregado;
            }     
            estado2 =false;  
            });
            var finalizado=0;
            var asignado=0;
            var enproceso=0;
            var suspendido=0;
            var pospuesto=0;
            var entregado=0;
            var total = 0;
            me.registros.forEach(function (registro){ 
                finalizado += registro.finalizado;
                asignado += registro.asignado;
                enproceso += registro.enproceso;
                suspendido += registro.suspendido;
                pospuesto += registro.pospuesto;
                entregado += registro.entregado;
                total += registro.total;
            });           
            me.registros.push({mes: 'Total', asignado:asignado,enproceso:enproceso,finalizado:finalizado,suspendido:suspendido,pospuesto:pospuesto,entregado:entregado,total:total,mesno:13});
            finalizado=0;
            asignado=0;
            enproceso=0;
            suspendido=0;
            pospuesto=0;
            entregado=0;
            total = 0;
            me.registrosperitos.forEach(function (registrop){ 
                finalizado += registrop.finalizado;
                asignado += registrop.asignado;
                enproceso += registrop.enproceso;
                suspendido += registrop.suspendido;
                pospuesto += registrop.pospuesto;
                entregado += registrop.entregado;
                total += registrop.total;
            });
            me.registrosperitos.push({nombre: 'Total', asignado:asignado,enproceso:enproceso,finalizado:finalizado,suspendido:suspendido,pospuesto:pospuesto,entregado:entregado,total:total,mesno:13});
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