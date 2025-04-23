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
                    <v-toolbar-title class="font-weight-regular" >Entrada de detenidos</v-toolbar-title>
                   
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
                :items="detenidos"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                 >
                
                <template slot="items" class="white" slot-scope="props">
                    

                    <td>{{ props.item.usuario}}</td>   
                    <td>{{ props.item.uModulo}}</td> 
                    <td>{{ props.item.nompersona }}</td>
                    <td>{{ props.item.nuc}}</td>   
                    <td>{{ props.item.fechaIngreso }}</td> 
                    <td>{{ props.item.delito }}</td>                     
                    <td>{{ props.item.autoridadED }}</td> 
                                    
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
                <v-btn  color=success text @click="guardar()">Guardar Información</v-btn>
                <v-btn icon   @click="dialogo = false">
                <v-icon>close</v-icon>
                </v-btn>
                </v-toolbar-items>
            </v-toolbar>


                        <v-stepper v-model="step" non-linear vertical>
 
                            <v-stepper-step :complete="step > 1" step="1" editable :rules="[() => !errors.has('NUC') && !errors.has('imputados')&& !errors.has('número unico de registro nacional de detenciones')&& !errors.has('pertenencias de imputado')]">
                                    Seleccion de imputado
                                    <small>Datos generales del Nuc y imputado.</small>
                            </v-stepper-step>    
                            <v-stepper-content step="1">
                                <v-container grid-list-md text-xs-center>
                                    <v-layout row wrap>
                                        
                                        <v-flex class="espaciado" xs12 sm12 md6 lg6 >
                                            <v-text-field 
                                                name="NUC" 
                                                label="*NUC:" 
                                                v-model='nucbusqueda' 
                                                :append-outer-icon="message ? 'search' : 'search'"
                                                @click:append-outer="buscarnuc()"
                                                v-validate="'required'"
                                                :error-messages="errors.collect('NUC')">     
                                                
                                            </v-text-field>
             

                                        </v-flex>

                                        <v-flex  class="espaciado" xs12 sm12 md6 lg6 >
                                            <v-card    auto-grow elevation="0">                                
                                                <v-card-text >
                                                    <v-list one-line   > 
                                                        <p class="text-lg-center font-weight-bold"><a>Información del Nuc.</a></p> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">accessibility_new</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>MP Asignado:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ mp }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">gavel</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Mesa:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ modulo }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>
                                                    
                                                    </v-list>  
                                                </v-card-text> 
                                            </v-card>
                                        </v-flex>

                                        <v-flex   class="espaciado" xs12 sm12 md6 lg6 >
                                            <v-autocomplete name="imputados"   
                                                :items="personas"
                                                v-model="persona" 
                                                return-object
                                                @change="listardp()"
                                                v-validate="'required'" 
                                                label="*Imputados:"                                        
                                                :error-messages="errors.collect('imputados')">
                                            </v-autocomplete>  

                                            <v-text-field 
                                                name="número unico de registro nacional de detenciones"
                                                label="*Número unico de registro nacional de detenciones:" 
                                                v-model='nouniconacional' 
                                                v-validate="'required'" 
                                                :error-messages="errors.collect('número unico de registro nacional de detenciones')"
                                            ></v-text-field>

                                            <v-card elevation="0"  >
                                                <v-card-title class="accent"><h3>Pertenencias de imputado</h3></v-card-title>
                                                    <v-card-text>
                                                        <vue-editor  
                                                            name="pertenencias de imputado"                                        
                                                            v-model="pertenenciasimputado" 
                                                            :editorToolbar="customToolbar"                                                                                                     
                                                            :error-messages="errors.collect('pertenencias de imputado')">
                                                        </vue-editor>
                                                    </v-card-text>   
                                            </v-card> 
                                        </v-flex>

                                        <v-flex  class="espaciado" xs12 sm12 md6 lg6 >
                                            <v-card    auto-grow elevation="0">                                
                                                <v-card-text >
                                                    <v-list one-line   > 
                                                        <p class="text-lg-center font-weight-bold"><a>Información del Imputado.</a></p> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">erm_identity</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Alias:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ persona.alias }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">supervisor_account</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Sexo:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ persona.sexo }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">room</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Domicilio:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ dp }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">markunread_mailbox</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Referencia:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ referencia }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>
                                                    
                                                    </v-list>  
                                                </v-card-text> 
                                            </v-card>
                                        </v-flex>
                                    </v-layout>
                                        <div class="text-xs-right"> 
                                            <v-btn v-if="persona!= ''" color="primary" class="white--text" :loading="$store.state.loader" :disabled="$store.state.loader"   @click.native="step = 2">Continuar</v-btn>
                                        </div>
                                </v-container>
                            </v-stepper-content>
                                <v-stepper-step v-if="persona!= ''" :complete="step > 2" step="2"   editable :rules="[() =>  !errors.has('fecha de captura') &&!errors.has('modus operandi') && !errors.has('autoridad') && !errors.has('delito')&& !errors.has('tipo de detención')]">
                                    Información complementaria
                                </v-stepper-step>
                            <v-stepper-content step="2">
                                <v-container grid-list-md text-xs-center>
                                    <v-layout row wrap>   
                                        <v-flex   class="espaciado" xs12 sm12 md6 lg6 >
                                            <v-menu
                                                ref="menu1"
                                                v-model="menu1"
                                                :close-on-content-click="false"
                                                :return-value.sync="fechacaptura"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{ on }">
                                                <v-text-field
                                                            name= "fecha de captura"
                                                            :value="fechac"
                                                            label="*Fecha de captura:"
                                                            prepend-icon="event"
                                                            clearable 
                                                            readonly
                                                            v-on="on"
                                                            v-validate="'required'" 
                                                            :error-messages="errors.collect('fecha de captura')"
                                                ></v-text-field>
                                                </template>
                                                    <v-date-picker locale="es" v-model="fechacaptura" no-title scrollable>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                                    <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                    </v-date-picker>
                                            </v-menu>

                                            <v-text-field 
                                                name="modus operandi"
                                                label="*Modus operandi" 
                                                v-model='modusoperandi' 
                                                v-validate="'required'" 
                                                :error-messages="errors.collect('modus operandi')"
                                            ></v-text-field>
                                            
                                            <v-autocomplete name="tipo de detención"   
                                                    :items="tipodetenciones"
                                                    v-model="tipodetencion" 
                                                    return-object
                                                    v-validate="'required'" 
                                                    label="*Tipo de detención:"                                        
                                                    :error-messages="errors.collect('tipo de detención')">
                                            </v-autocomplete>

                                            <v-card    auto-grow elevation="0">                                
                                                <v-card-text >
                                                    <v-list one-line   > 
                                                        <p class="text-lg-center font-weight-bold"><a>Información del Hecho.</a></p> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">subject</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Fecha del Hecho:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ fechahecho.substring(8,10) +" de "+ this.obtenermes(fechahecho.substring(5,7)-1)+" de "+ fechahecho.substring(0,4)}}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>
                                                        <v-list-tile>  
                                                            <v-list-tile-action> 
                                                                <v-icon color="success">assignment</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Dirección del Hecho:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ direccionhecho }}</a></p>  </v-list-tile-sub-title>                                       
                                                            </v-list-tile-content> 
                                                            <v-tooltip bottom>
                                                                <template v-slot:activator="{ on }"> 
                                                                    <v-btn class="mx-5" slot="activator" v-on="on" @click="btn_geoloc2()" left fab dark small color="success">
                                                                        <v-icon>location_on</v-icon>
                                                                    </v-btn>
                                                                </template>
                                                                <span>Consultar mapa</span>
                                                            </v-tooltip>
                                                        </v-list-tile>                                                   
                                                    </v-list>           
                                                </v-card-text>                                             
                                            </v-card>


                                        </v-flex>
                                        <v-flex   class="espaciado" xs12 sm12 md6 lg6 >
                                            <v-autocomplete name="autoridad"   
                                                            :items="autoridads"
                                                            v-model="autoridad" 
                                                            return-object
                                                            v-validate="'required'" 
                                                            label="*Autoridad que efectuo detención:"                                        
                                                            :error-messages="errors.collect('autoridad')">
                                            </v-autocomplete> 
                                            <v-autocomplete name="delito"   
                                                            :items="delitos"
                                                            v-model="delito" 
                                                            return-object
                                                            v-validate="'required'" 
                                                            label="*Delito:"                                        
                                                            :error-messages="errors.collect('delito')">
                                            </v-autocomplete>

                                            <v-text-field 
                                                label="" 
                                                disabled
                                            ></v-text-field>

                                            <v-card    auto-grow elevation="0">                                
                                                <v-card-text >
                                                    <v-list one-line   > 
                                                        <p class="text-lg-center font-weight-bold"><a>Reseña Breve.</a></p> 
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">subject</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a></a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular" v-html="rbreve"><a>{{ rbreve }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>                                                                                                        
                                                    </v-list>           
                                                </v-card-text>                                             
                                            </v-card>
                                        </v-flex>                                   
                                    </v-layout>
                                        <div class="text-xs-right"> 
                                            <v-btn  color="primary" class="white--text" :loading="$store.state.loader" :disabled="$store.state.loader"   @click.native="step = 1">Regresar</v-btn>
                                            <v-btn v-if="tipodetencion.value == 1" color="primary" class="white--text" :loading="$store.state.loader" :disabled="$store.state.loader"   @click.native="step = 3">Siguiente</v-btn>
                                            <v-btn v-if="tipodetencion.value == 2" color="primary" class="white--text" :loading="$store.state.loader" :disabled="$store.state.loader"   @click="guardar()">Guardar</v-btn>
                                        </div>
                                </v-container>
                                
                            </v-stepper-content>
                           
                            <v-stepper-step :complete="step > 3" v-if="tipodetencion.value == 1"  step="3"  editable :rules="[() => !errors.has('calle') && !errors.has('numero exterior')  && !errors.has('pais') && !errors.has('estado' ) && !errors.has('municipio')  && !errors.has('localidad')  && !errors.has('cp' )]">
                                Dirección de guardia y custodia
                            </v-stepper-step>
                            <v-stepper-content v-if="tipodetencion.value == 1" step="3">
                                <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                    <v-container grid-list-md text-xs-center>
                                        <v-layout row wrap> 
                                            <v-flex class="espaciado"  xs12 sm12 md6 lg6> 
                                                
                                                <v-text-field 
                                                    label="*Calle:" 
                                                    name="calle" 
                                                    v-model="de_calle" 
                                                    v-validate="'required'" 
                                                    :error-messages="errors.collect('calle')">
                                                </v-text-field>

                                                <v-text-field 
                                                    name="numero exterior" 
                                                    label="*No. exterior:" 
                                                    v-model="de_noExt" 
                                                    type="number"
                                                    v-validate="'required'"
                                                    :error-messages="errors.collect('numero exterior')">                              
                                                </v-text-field> 
                                                
                                                <v-text-field type="number" label="No. Interior:"    v-model="de_noInt"></v-text-field>    
                                                <v-text-field label="Entre calle 1:"   v-model="de_entreCalle1" ></v-text-field>   
                                                <v-text-field label="Entre calle 2:" v-model="de_entreCalle2" ></v-text-field> 
                                                <v-text-field label="Referencia:"   v-model="de_referencia" ></v-text-field>  

                                                <v-text-field 
                                                    name="pais"
                                                    label="*Pais:" 
                                                    v-model="de_pais" 
                                                    v-validate="'required'"
                                                    :error-messages="errors.collect('pais')"> 
                                                </v-text-field> 

                                            </v-flex> 

                                            
                                            <v-flex class="espaciado"  xs12 sm12 md6 lg6>  
                                                
                                                <v-autocomplete 
                                                    label="*Estado:" 
                                                    name="estado"     
                                                    v-model="de_estadoid"
                                                    :items="de_ciudades"  
                                                    return-object
                                                    v-validate="'required'"
                                                    :error-messages="errors.collect('estado')"
                                                    v-on:change="de_listarPorEstado"  > 
                                                </v-autocomplete>
                                            
                                                <v-autocomplete  
                                                    label="*Municipio:" 
                                                    name="municipio" 
                                                    v-model="de_municipioid" 
                                                    :items="de_municipios"
                                                    return-object  
                                                    v-validate="'required'"
                                                    :error-messages="errors.collect('municipio')"
                                                    v-on:change="de_listarPorMunicipio">
                                                </v-autocomplete>
                                                <v-autocomplete 
                                                    label="*Localidad:" 
                                                    name="localidad" 
                                                    v-model="de_localidadid" 
                                                    :items="de_localidades" 
                                                    return-object
                                                    v-validate="'required'"
                                                    :error-messages="errors.collect('localidad')"
                                                    v-on:change="de_listarPorLocalidad">
                                                </v-autocomplete>
                                                <v-text-field 
                                                    label="*Código postal:" 
                                                    name="cp" 
                                                    v-model="de_cp"
                                                    type="number"
                                                    v-validate="'required'"
                                                    :error-messages="errors.collect('cp')" 
                                                    @keyup.enter="buscarPorCP()"  >
                                                </v-text-field> 

                                                <v-layout wrap justify-space-between>
                                                    <v-flex  xs6 md6 lg6>
                                                        <v-text-field 
                                                            v-model="de_lat"
                                                            label="Latitud:" 
                                                            disabled
                                                        ></v-text-field> 
                                                    </v-flex>
                                                    <v-flex  xs6 md6 lg6>
                                                        <v-text-field 
                                                            v-model="de_lng"
                                                            label="Longitud:" 
                                                            disabled
                                                    ></v-text-field> 
                                                    </v-flex>
                                                    </v-layout>
                                                <v-btn block=""   @click.native="btn_geoloc22" outline color="primary"><v-icon>location_on</v-icon>   Croquis</v-btn>
                                            </v-flex> 
                                             
                                        </v-layout>
                                        <div class="text-xs-right">
                                            <v-btn flat @click.native="step = 2">Anterior</v-btn> 
                                            <v-btn color="primary"  @click.native="step = 4"  >Siguiente</v-btn>  
                                            
                                        </div> 
                                    </v-container>
                                
                                </v-card> 
                                
                            </v-stepper-content> 

                            <v-stepper-step :complete="step > 4" v-if="tipodetencion.value == 1"  step="4"  editable :rules="[() => !errors.has('unidad o elemento asignado') && !errors.has('hora de inicio')  && !errors.has('fecha de inicio') && !errors.has('motivo' ) && !errors.has('hora de termino')  && !errors.has('fecha de termino') && !errors.has('origen') && !errors.has('destino')
                                && !errors.has('ruta')  && !errors.has('hora de salida') && !errors.has('fecha de llegada') && !errors.has('observaciones' )]">
                                Información de guardia y custodia
                            </v-stepper-step>
                            <v-stepper-content v-if="tipodetencion.value == 1" step="4">
                                <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                    <v-container grid-list-md text-xs-center>
                                        <v-layout row wrap> 
                                            <v-flex class="espaciado"  xs12 sm12 md6 lg6> 
                                                
                                                <v-text-field 
                                                    label="*Unidad o elemento asignado:" 
                                                    name="unidad o elemento asignado" 
                                                    v-model="unidadelementoasignado" 
                                                    v-validate="'required'" 
                                                    :error-messages="errors.collect('unidad o elemento asignado')">
                                                </v-text-field>

                                               <v-menu
                                                    ref="menu2"
                                                    v-model="menu2"
                                                    :close-on-content-click="false"
                                                    :nudge-right="40"
                                                    :return-value.sync="horainicio"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="290px"
                                                    >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            name="hora de inicio"
                                                            v-model="horainicio"
                                                            label="*Hora de inicio:"
                                                            prepend-icon="access_time"
                                                            readonly
                                                            v-on="on"
                                                            v-validate="'required'" 
                                                            :error-messages="errors.collect('hora de inicio')"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-time-picker
                                                        v-if="menu2"
                                                        v-model="horainicio"
                                                        full-width
                                                        @click:minute="$refs.menu2.save(horainicio)"
                                                    ></v-time-picker>
                                                </v-menu>

                                                <v-menu
                                                    ref="menu4"
                                                    v-model="menu4"
                                                    :close-on-content-click="false"
                                                    :return-value.sync="fechainicio"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                                name="fecha de inicio"
                                                                :value="fechai"
                                                                label="*Fecha de inicio:"
                                                                prepend-icon="event"
                                                                clearable 
                                                                readonly
                                                                v-on="on"
                                                                v-validate="'required'" 
                                                                :error-messages="errors.collect('fecha de inicio')"
                                                    ></v-text-field>
                                                    </template>
                                                        <v-date-picker locale="es" v-model="fechainicio" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu4 = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                        </v-date-picker>
                                                </v-menu>

                                                <v-text-field 
                                                    label="*Origen:" 
                                                    name="origen" 
                                                    v-model="origen" 
                                                    v-validate="'required'" 
                                                    :error-messages="errors.collect('origen')">
                                                </v-text-field>

                                                <v-menu
                                                    ref="menu6"
                                                    v-model="menu6"
                                                    :close-on-content-click="false"
                                                    :nudge-right="40"
                                                    :return-value.sync="horasalida"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="290px"
                                                    >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            name="hora de salida"
                                                            v-model="horasalida"
                                                            label="*Hora de salida:"
                                                            prepend-icon="access_time"
                                                            readonly
                                                            v-on="on"
                                                            v-validate="'required'" 
                                                            :error-messages="errors.collect('hora de salida')"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-time-picker
                                                        v-if="menu6"
                                                        v-model="horasalida"
                                                        full-width
                                                        @click:minute="$refs.menu6.save(horasalida)"
                                                    ></v-time-picker>
                                                </v-menu>

                                                <v-text-field 
                                                    label="*Ruta:" 
                                                    name="ruta" 
                                                    v-model="ruta" 
                                                    v-validate="'required'" 
                                                    :error-messages="errors.collect('ruta')">
                                                </v-text-field>

                                            </v-flex> 
                                            
                                            <v-flex class="espaciado"  xs12 sm12 md6 lg6> 


                                                
                                                <v-text-field 
                                                    label="*Motivo:" 
                                                    name="motivo" 
                                                    v-model="motivo" 
                                                    v-validate="'required'" 
                                                    :error-messages="errors.collect('motivo')">
                                                </v-text-field>

                                                <v-menu
                                                    ref="menu3"
                                                    v-model="menu3"
                                                    :close-on-content-click="false"
                                                    :nudge-right="40"
                                                    :return-value.sync="horatermino"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="290px"
                                                    >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            name="hora de termino"
                                                            v-model="horatermino"
                                                            label="*Hora de termino:"
                                                            prepend-icon="access_time"
                                                            readonly
                                                            v-on="on"
                                                            v-validate="'required'" 
                                                            :error-messages="errors.collect('hora de termino')"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-time-picker
                                                        v-if="menu3"
                                                        v-model="horatermino"
                                                        full-width
                                                        @click:minute="$refs.menu3.save(horatermino)"
                                                    ></v-time-picker>
                                                </v-menu>

                                                <v-menu
                                                    ref="menu5"
                                                    v-model="menu5"
                                                    :close-on-content-click="false"
                                                    :return-value.sync="fechatermino"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="290px"
                                                >
                                                    <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                                name="fecha de termino"
                                                                :value="fechat"
                                                                label="*Fecha de termino:"
                                                                prepend-icon="event"
                                                                clearable 
                                                                readonly
                                                                v-on="on"
                                                                v-validate="'required'" 
                                                                :error-messages="errors.collect('fecha de termino')"
                                                    ></v-text-field>
                                                    </template>
                                                        <v-date-picker  locale="es" v-model="fechatermino" no-title scrollable>
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menu5 = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="fechainif()">OK</v-btn>
                                                        </v-date-picker>
                                                </v-menu>


                                                <v-text-field 
                                                    label="*Destino:" 
                                                    name="destino" 
                                                    v-model="destino" 
                                                    v-validate="'required'" 
                                                    :error-messages="errors.collect('destino')">
                                                </v-text-field>

                                                <v-menu
                                                    ref="menu7"
                                                    v-model="menu7"
                                                    :close-on-content-click="false"
                                                    :nudge-right="40"
                                                    :return-value.sync="horallegada"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="290px"
                                                    >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            name="hora de llegada"
                                                            v-model="horallegada"
                                                            label="*Hora de llegada:"
                                                            prepend-icon="access_time"
                                                            readonly
                                                            v-on="on"
                                                            v-validate="'required'" 
                                                            :error-messages="errors.collect('hora de llegada')"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-time-picker
                                                        v-if="menu7"
                                                        v-model="horallegada"
                                                        full-width
                                                        @click:minute="$refs.menu7.save(horallegada)"
                                                    ></v-time-picker>
                                                </v-menu>

                                            </v-flex>

                                            <v-flex class="espaciado" xs12 sm12 md12 lg12 >
                                                <v-card elevation="0"  >
                                                    <v-card-title class="accent"><h3>Observaciones</h3></v-card-title>
                                                        <v-card-text>
                                                            <vue-editor  
                                                                name="observaciones"                                        
                                                                v-model="observaciones" 
                                                                :editorToolbar="customToolbar"                                                                                                     
                                                                :error-messages="errors.collect('observaciones')">
                                                            </vue-editor>
                                                        </v-card-text>   
                                                </v-card> 
                                            </v-flex>

                                             
                                        </v-layout>
                                        <div class="text-xs-right">
                                            <v-btn flat @click.native="step = 3">Anterior</v-btn> 
                                            <v-btn color="primary"  @click="guardar()"  >Finalizar</v-btn>  
                                            
                                        </div> 
                                    </v-container>
                                
                                </v-card> 
                                
                            </v-stepper-content> 
                        </v-stepper>
                    

                  
            <v-divider></v-divider>
        
            </v-card>
        </v-dialog>

        <v-dialog v-model="modalGeolocalizacion" fullscreen hide-overlay transition="dialog-bottom-transition">
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
                                        <v-btn class="mx-1" slot="activator" v-on="on" @click="modalGeolocalizacion=false" left fab dark small color="success">
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
                            :center="center"
                            :zoom="zoom"                            
                            style=" width:100%;  height: 800px;"                            
                            :options="opcionesmapa"
                            :StreetViewPanoramaOptions ="{
                                showRoadLabels:true
                            }"
                            >
                            <v-tooltip bottom>
                                    <template v-slot:activator="{ on }"> 
                                        <v-btn class="mx-1" slot="activator" v-on="on" @click="modalGeolocalizacion=false" left fab dark small color="success">
                                            <v-icon>close</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Cerrar</span>
                                </v-tooltip>
                            <gmap-marker
                                :key="index"
                                v-for="(m, index) in markers"
                                :position="m.position"
                                @click="center=m.position"
                                :clickable="false"
                                :draggable="false"
                            ></gmap-marker>
                            
                            </gmap-map>
                                            
                        </v-card>
                </v-card>
        </v-dialog>

        <v-dialog v-model="modalGeolocalizacion01" fullscreen hide-overlay transition="dialog-bottom-transition"> 
            <v-card>
                <v-toolbar dark color="primary">
                
                    <v-toolbar-title>Geolocalización.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    <v-btn  color=success text @click.native="guardarGeolocalizacion01()">
                    GUARDAR</v-btn>
                    <v-btn icon   @click="modalGeolocalizacion01 = false">
                    <v-icon>close</v-icon>
                    </v-btn>
                    </v-toolbar-items>
                </v-toolbar>    
        
                <v-divider></v-divider>
            
                    <v-card    elevation=0 class="mb-5" height="auto">
                        <v-container grid-list-sm    >
                            <v-layout row wrap justify-center>
                                <v-flex  xs12 md12 lg12> 
                                        <gmap-autocomplete  style="width:50%;  
                                        height: 36px; 
                                        text-rendering: auto;
                                        color: initial;
                                        letter-spacing: normal;
                                        word-spacing: normal;
                                        text-transform: none;
                                        text-indent: 0px;
                                        text-shadow: none;
                                        display: inline-block;
                                        text-align: start;
                                        -webkit-appearance: textfield;
                                        background-color: white;
                                        -webkit-rtl-ordering: logical;
                                        cursor: text;
                                        margin: 0em;
                                        font: 400 13.3333px Arial;
                                        padding: 5px 5px;
                                        border-width: 2px;
                                        border-style: inset;
                                        border-color: initial;
                                        border-image: initial;"
                                        id="mapa01"
                                        @place_changed="setPlace01"  >
                                        </gmap-autocomplete>
    
                        <v-btn  outline color="primary" @click="addMarker01">    BUSCAR</v-btn>
        
                    <br>
                            <gmap-map
                            :center="center01"
                            :zoom="17"
                            style="width:100%;  height: 700px;"
                            >
                            <gmap-marker
                                :key="index"
                                v-for="(m, index) in markers01"
                                :position="m.position"
                                @click="center01=m.position"
                                :clickable="true"
                                :draggable="true"
                                @drag="updateCoordinates01"
                                @dragend="updatecenter01"
                            ></gmap-marker>
                            </gmap-map>  
                                </v-flex>  
                            </v-layout>
                            
                        </v-container>
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
        center: { lat: 45.508, lng: -73.587},
        markers: [],
        places: [],
        currentPlace: null, 
        geoloc:0,
        modalGeolocalizacion:0,
        lat:'',
        lng:'',
        de_lat:'',
        de_lng:'',
        nouniconacional:'',
        //************DIRECCION**********/
        center2: { lat: 45.508, lng: -73.587},
        markers2: [],
        places2: [],
        currentPlace2: null, 
        geoloc2:0,
        modalGeolocalizacion2:0,
        lat2:'',
        lng2:'',
        de_lat2:'',
        de_lng2:'',
        nouniconacional2:'',

        de_calle:'',
        de_noExt:'',
        de_noInt:'',
        de_entreCalle1:'',
        de_entreCalle2:'',
        de_referencia:'',
        de_pais:'Mexico',

        de_estado:'',
        de_estadoid:0,
        de_ciudades:[],

        de_municipio:'',
        de_municipioid:0,
        de_municipios:[],

        
        de_localidad:'',
        de_localidadid:0,
        de_localidades:[],

        de_cp:'', 
        de_lat2:'',
        de_lng2:'',


        //*************** */
        step:1,
        dialogo:false,
        nucbusqueda:'',
        nuc:[],
        modulo:'',
        mp:'',
        detenidos:[],
        personas:[],
        persona:'',
        ratenciondid:'',
        dp:'',
        referencia:'',
        menu1:false,
        menu2:false,
        menu3:false,
        menu4:false,
        menu5:false,
        menu6:false,
        menu7:false,
        fechacaptura:'',
        fechac:'',
        autoridads:[],
        autoridad:'',
        idrecho:'',
        delitos:[],
        delito:'',
        modusoperandi:'',
        rbreve:'',
        fechahecho:'',
        modalGeolocalizacion:false,
        direccionhecho:'',
        lathecho:'',
        longhecho:'',
        referenciahecho:'',
        tipodetenciones :[
            {text: "Guardia y custodia",value:1},
            {text: "Detención(Flagrancia)",value:2},
        ],
        tipodetencion:'',
        pertenenciasimputado:'',
        message: 'Hey',
        fechainicio:'',
        fechai:'',
        fechatermino:'',
        fechat:'',
        observaciones:'',
        motivo:'',
        unidadelementoasignado:'',
        horainicio:'',
        horatermino:'',
        origen:'',
        destino:'',
        horasalida:'',
        horallegada:'',
        ruta:'',       
        lataux:'',
        lngaux:'',
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


        modalGeolocalizacion01:false,
        center01: { lat: 45.508, lng: -73.587 },
        markers01: [],
        places01: [],
        currentPlace01: null, 
        lataux01:'',
        lngaux01:'',
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
            { text: 'Imputado', value: 'nompersona' }, 
            { text: 'NUC', value: 'nuc' },
            { text: 'Fecha de Ingreso', value: 'fechaIngreso' },
            { text: 'Delito', value: 'delito' },
            { text: 'Autoridad captura',value: 'autoridadED' },       
        ],
        search: '',
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
      me.listarautoridades();
      me.de_listarCiudades();

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
        agregar(){
            let me = this;
            me.limpiar();
            me.dialogo = true;
        },
        /*
        listarNucs(){
            var nucsarray = [];
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            me.$CAT.get('api/Nucs/Listar',configuracion).then(function(response){
                
                nucsarray = response.data;
                nucsarray.map(function(x){
                    me.nucs.push({text: x.nucg,value: x.idNuc});
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
        */
        buscarnuc(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            me.$CAT.get('api/Nucs/BuscarExistenciaNuc/'+me.nucbusqueda,configuracion).then(function(response){
                me.limpiar2();
                me.nuc = response.data;
                me.listarinfocomple();
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
                    me.$notify("El NUC no ha sido encontrado", 'error')
                }else{
                    me.$notify('Error al intentar listar los registros!!!','error')      
                } 
            });
        },
        listarinfocomple(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  

            me.$CAT.get('api/RHechoes/ListarporIdNUC/'+me.nuc.idNuc,configuracion).then(function(response){
                me.mp = response.data.mp;
                me.modulo = response.data.modulo;   
                me.ratenciondid = response.data.rAtencionId;   
                me.idrecho = response.data.idRHecho;
                me.rbreve = response.data.rBreve;
                me.fechahecho = response.data.fechaHoraSuceso;
                me.listarpersonas();  
                me.listardelito();   
                me.listardireccionhecho();                       
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
        listarpersonas(){
            var personasarray = [];
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  

            me.$CAT.get('api/RAPs/ListarImputados/'+me.ratenciondid,configuracion).then(function(response){
                personasarray = response.data;
                personasarray.map(function(x){
                    me.personas.push({text: x.nombreCompleto,value: x.personaId, alias:x.alias, sexo:x.sexo});
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
        listardireccionhecho(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            me.$CAT.get('api/DireccionDelitoes/ListarPoridHecho/'+me.idrecho,configuracion).then(function(response){
                me.direccionhecho = "Calle "+ response.data.calle+ ", No.Interior: " + response.data.noint+ ", No.Exterior: " + response.data.noext+ ", Codigo postal " + response.data.cp;
                me.referenciahecho = "Entre calles "+ response.data.entrecalle1 + " y " + response.data.entrecalle2;
                me.center.lat = +response.data.lat;
                me.center.lng = +response.data.lng;
                me.addMarker();
            }).catch(err => { 
                                    
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
        listarautoridades(){
            var autoridadesarray = [];
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  

            me.$conf.get('api/Instituciones/Listar',configuracion).then(function(response){
                autoridadesarray = response.data;
                autoridadesarray.map(function(x){
                    me.autoridads.push({text: x.nombre,value: x.IdInstitucion});
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
        listardp(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  

            me.$CAT.get('api/RAPs/ListarDP/'+me.persona.value,configuracion).then(function(response){
                me.dp = "Calle "+ response.data.calle+ ", No.Interior: " + response.data.noint+ ", No.Exterior: " + response.data.noext+ ", Codigo postal " + response.data.cp;
                me.referencia = "Entre calles "+ response.data.entrecalle1 + " y " + response.data.entrecalle2;
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
        listardelito(){
            var delitoarray = [];
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  

            me.$CAT.get('api/RDHs/ListarPorHecho/'+me.idrecho,configuracion).then(function(response){
                delitoarray = response.data;
                delitoarray.map(function(x){
                    me.delitos.push({text: x.nombreDelito,value: x.delitoId,tipo:x.tipo,intencion:x.intensionDelito});
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
        de_listarCiudades(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var ciudadesArray=[];
            this.$conf.get('api/Estadoes/Mostrar',configuracion).then(function(response){ 
                ciudadesArray=response.data; 
                ciudadesArray.map(function(x){ 
                    me.de_ciudades.push({text: x.nombre, value:x.idEstado}); 
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
        de_listarPorEstado(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            if (!me.de_estadoid.value== 0){
                me.de_estado = me.de_estadoid.text;
                me.de_estadoid = me.de_estadoid.value;
            }
                var municipiosArray=[];
                me.de_municipios.length = 0;
                this.$conf.get('api/Municipios/ListarPorEstado/'+ me.de_estadoid,configuracion).then(function(response){
                
                    municipiosArray=response.data;
                
                    municipiosArray.map(function(x){ 
                    me.de_municipios.push({text: x.nombre,value: x.idMunicipio}); 
                    }); 
                    if (me.editedIndex == 1){
                     me.de_selectMunicipio(me.de_municipio);
                    }
                    if (me.statusActualizar==true){
                         me.de_selectMunicipio(me.municipio);
                    }
                    if (me.duplicarDireccion==true){
                         me.de_selectMunicipio(me.municipio);
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
               
                
        },
        de_listarPorMunicipio(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            if (!me.de_municipioid.value== 0){
            me.de_municipio = me.de_municipioid.text;
            me.de_municipioid = me.de_municipioid.value;
            }
      
          
            var localidadArray=[];
            me.de_localidades.length = 0;
            this.$conf.get('api/Localidads/MostrarPorMPO/' + me.de_municipioid,configuracion).then(function(response){
                localidadArray=response.data;  
                localidadArray.map(function(x){  
                    me.de_localidades.push({text: x.nombre,value: x.idLocalidad});  
                });
                 if (me.editedIndex == 1){
                      me.de_selectLocalidad(me.de_localidad);
                }
                 if (me.statusActualizar==true){
                         me.de_selectLocalidad(me.de_localidad);
                    }
                 if (me.duplicarDireccion==true){
                    me.de_selectLocalidad(me.de_localidad);
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
      
          
        }, 
        de_listarPorLocalidad(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.de_localidad = me.de_localidadid.text;
            me.de_localidadid = me.de_localidadid.value;
            this.$conf.get('api/Localidads/MostrarPorLocalidad/' + me.de_localidadid,configuracion).then(function(response){
                 
                  me.de_cp=response.data.cp;  
                
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
        de_buscarPorCP(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$conf.get('api/Localidads/MostrarPorCP/' + me.cp,configuracion).then(function(response){ 
                  //console.log(response)
                  
                  me.de_estadoid=response.data.idEstado;  
                  me.de_listarPorEstado();
                  me.de_municipioid=response.data.idMunicipio;  
                  me.de_buscarPorCpMpo() 
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
        de_buscarPorCpMpo(){ 
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var localidadArray=[];
            me.de_localidades.length = 0;
             this.$conf.get('api/Localidads/MostrarPorCPMpo/' + me.de_municipioid +',' + this.de_cp,configuracion).then(function(response){ 
                localidadArray=response.data;  
                localidadArray.map(function(x){
                    me.de_localidades.push({text: x.nombre,value: x.idLocalidad}); 
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
        de_selectEstado: function(val) {  
            let me=this;    
            for (var i = 0; i < me.de_ciudades.length; i++) {
                if (me.de_ciudades[i].text === val){
                    me.de_estadoid=  me.de_ciudades[i].value; 
                } 
            }
            me.de_listarPorEstado();
        },
        de_selectMunicipio: function(val) { 
            let me=this; 
            for (var i = 0; i < me.de_municipios.length; i++) {
                if (me.de_municipios[i].text === val){
                    me.de_municipioid=  me.de_municipios[i].value; 
                }    
            } 
          me.de_listarPorMunicipio();
        },
        de_selectLocalidad: function(val) { 
           let me=this; 
            for (var i = 0; i < me.de_localidades.length; i++) {
                if (me.de_localidades[i].text === val){
                    me.de_localidadid=  me.de_localidades[i].value; 
                }  
            } 
          
        },
        btn_geoloc1(){
            this.geoloc=1;
            this.modalGeolocalizacion = 1;
        },
        btn_geoloc2(){
            this.geoloc=2;
            this.modalGeolocalizacion = 1;
        }, 
        setPlace(place) {
                this.markers= [],
                this.places= [],
                this.currentPlace = place;
        },
        setPlace01(place) {

            this.markers01= [],
            this.places01= [],
            this.currentPlace01 = place;
        },
        addMarker01() {

            if (this.currentPlace01) {
                const marker = {
                    lat: this.currentPlace01.geometry.location.lat(),
                    lng: this.currentPlace01.geometry.location.lng(), 

                };
                this.markers01.push({ position: marker });
                this.places01.push(this.currentPlace01);
                this.center01 = marker;
                this.currentPlace01 = null;
            }
        },
        updateCoordinates01(location) {
            this.lataux01 = location.latLng.lat()
            this.lngaux01 = location.latLng.lng()
        },
        updatecenter01(){
            this.center01.lat = this.lataux01;
            this.center01.lng = this.lngaux01;
        }, 
        guardarGeolocalizacion01(){
            
            if(this.lataux01 != '' && this.lngaux01 != ''){
                this.de_lat = this.lataux01
                this.de_lng = this.lngaux01
            }else{
                this.de_lat = this.markers01[0].position.lat
                this.de_lng = this.markers01[0].position.lng
            }                            
            this.modalGeolocalizacion01=0;
        },
        addMarker() {
                
                    const marker = {
                        lat: this.center.lat,
                        lng: this.center.lng, 

                    };
                    this.markers.push({ position: marker });
                    this.places.push(this.currentPlace);
                    this.center = marker;
                    this.currentPlace = null;
                    
        },
        geolocate: function() {
            navigator.geolocation.getCurrentPosition(position => {
                this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude, 
            
                };
            });
        },
        guardarGeolocalizacion(){
            if(this.geoloc==1){
                this.lat = this.center.lat;
                this.lng = this.center.lng;
                this.geoloc=0;
                this.modalGeolocalizacion=0;
            }
            if(this.geoloc==2){
                this.de_lat = this.center.lat;
                this.de_lng = this.center.lng;
                this.geoloc=0;
                this.modalGeolocalizacion=0;
            }
        },


        btn_geoloc12(){
            this.geoloc2=1;
            this.modalGeolocalizacion2 = 1;
        },
        btn_geoloc22(){
            if(this.de_estado !='' && this.de_municipio != '' && this.de_localidad != '' && this.de_calle != ''){
                    this.modalGeolocalizacion01 = 1;
                    this.listener();
                    this.addMarkergeocoder();
            }else
                this.$notify("Los siguientes campos son requeridos para la geolocalización: estado, municipio, localidad, calle",'error')
        }, 
        listener(){
            //input.focus();
            let me = this;  
            var map = new google.maps.Map(document.getElementById('mapa01'));
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': this.de_calle+" "+ this.de_localidad+" "+this.de_municipio+" "+this.de_estado}, function(results, status) {
                if (status == 'OK') {
                    //console.log( results[0].geometry.location.lat())
                    me.center01.lat =+ results[0].geometry.location.lat()
                    //console.log( results[0].geometry.location.lng())
                    me.center01.lng =+ results[0].geometry.location.lng()

                } else {
                    alert('La dirección no fue encontrada' + status);
                }
            })
        },
        addMarkergeocoder() {
                    const marker = {
                        lat: this.center01.lat,
                        lng: this.center01.lng, 
                    };
                    this.markers01 =[]
                    this.places01 = []
                    this.markers01.push({ position: marker });
                    this.places01.push(this.currentPlace);
                    this.center01 = marker;
                    this.currentPlace01 = null;                 
        },
        updateCoordinates(location) {
            this.lataux = location.latLng.lat()
            this.lngaux = location.latLng.lng()
        },
        updatecenter(){
            this.center2.lat = this.lataux;
            this.center2.lng = this.lngaux;
        },
        setPlace2(place2) {
                this.markers2= [],
                this.places2= [],
                this.currentPlace2 = place2;
        },
        addMarker2() {
            if (this.currentPlace2) {        
            const marker2 = {
                lat: this.currentPlace2.geometry.location.lat(),
                lng: this.currentPlace2.geometry.location.lng(), 

            };
            this.markers2.push({ position: marker2 });
            this.places2.push(this.currentPlace2);
            this.center2 = marker2;
            this.currentPlace2 = null;
            }   
                    
        },
        geolocate2: function() {
            navigator.geolocation.getCurrentPosition(position2 => {
                this.center2 = {
                    lat: position2.coords.latitude,
                    lng: position2.coords.longitude, 
                };
            });
        },
        guardarGeolocalizacion2(){

                this.de_lat2 = this.center2.lat;
                this.de_lng2 = this.center2.lng;
                this.geoloc2=0;
                this.modalGeolocalizacion2=0;
        },
        fechainif(){
            if(this.menu1){
                this.generarfecha2();
            this.$refs.menu1.save(this.fechacaptura);
            }
            if(this.menu4){
                this.generarfecha2();
            this.$refs.menu4.save(this.fechainicio);
            }  
            if(this.menu5){
                this.generarfecha2();
            this.$refs.menu5.save(this.fechatermino);
            }           
        },
        generarfecha2(){           
            if(this.menu1) 
            this.fechac =this.fechacaptura.substring(8,10) +" de "+ this.obtenermes(this.fechacaptura.substring(5,7)-1)+
            " del "+ this.fechacaptura.substring(0,4);  
            if(this.menu4) 
            this.fechai = this.fechainicio.substring(8,10) +" de "+ this.obtenermes(this.fechainicio.substring(5,7)-1)+
            " del "+ this.fechainicio.substring(0,4);  
            if(this.menu5) 
            this.fechat = this.fechatermino.substring(8,10) +" de "+ this.obtenermes(this.fechatermino.substring(5,7)-1)+
            " del "+ this.fechatermino.substring(0,4); 
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
        guardar(){
           this.$validator.validate().then(result => {
                    if (result) { 
                            let me=this;
                            let header={"Authorization" : "Bearer " + this.$store.state.token};
                            let configuracion= {headers : header};

                            if(me.de_cp == ''  || me.de_cp == undefined)
                                me.de_cp = 0

                            if(me.de_lat == ''  || me.de_lat == undefined)
                                me.de_lat = 0

                            if(me.de_lng == ''  || me.de_lng == undefined)
                                me.de_lng = 0

                            if(me.de_noExt == ''  || me.de_noExt == undefined)
                                me.de_noExt = 0

                            if(me.de_noInt == ''  || me.de_noInt == undefined)
                                me.de_noInt = 0
                            
                                me.$PI.post('api/Detencion/Crear',{  
                                'rHechoId' : me.idrecho ,
                                'personaId' : me.persona.value ,
                                'nuc' : me.nucbusqueda ,
                                'mpAsignado' : me.mp,
                                'mesa' : me.modulo,
                                'fechaIngreso' : me.fechac,
                                'Status': me.tipodetencion.value,
                                'autoridadED' : me.autoridad.text,
                                'delito' : me.delito.text,
                                'tdelito' : me.delito.tipo,
                                'modalidad' : me.delito.intencion,
                                'mOperandi' : me.modusoperandi,
                                'uDistrito' : me.u_distrito,
                                'uSubproc' : me.u_dirSubPro,
                                'uAgencia' : me.u_agencia,
                                'usuario' : me.u_nombre,
                                'uPuesto' : me.u_puesto,
                                'uModulo' : me.u_modulo,
                                'TipoDetencion': me.tipodetencion.text,
                                'NumUnicoRegNacional': me.nouniconacional,
                                'Pertenecnias': me.pertenenciasimputado
                            },configuracion).then(function(response){
                                me.$notify('La información se guardo correctamente !!!','success') 
                                me.$PI.post('api/HistorialDetencion/CrearEntrada',{ 
                                        'DetencionId' : response.data.iddetencion,
                                        'StatusPasado': "Toma de datos",
                                        'StatuusNuevo': response.data.status,
                                        'uDistrito' : me.u_distrito,
                                        'uSubproc' : me.u_dirSubPro,
                                        'uAgencia' : me.u_agencia,
                                        'usuario' : me.u_nombre,
                                        'uPuesto' : me.u_puesto,
                                        'uModulo' : me.u_modulo,
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
                                if(me.tipodetencion.value == 1){
                                    me.$PI.post('api/EstatusCustodia/Crear',{ 
                                         
                                        'DetencionId' : response.data.iddetencion,
                                        'Calle': me.de_calle,
                                        'NoExterior': me.de_noExt,
                                        'NoInterior': me.de_noInt,
                                        'Ecalle1': me.de_entreCalle1,
                                        'Ecalle2': me.de_entreCalle2,
                                        'Referencia': me.de_referencia,
                                        'Pais': me.de_pais,
                                        'Estado': me.de_estado,
                                        'Municipio': me.de_municipio,
                                        'Localidad': me.de_localidad,
                                        'Cp': me.de_cp,
                                        'Longitud': me.de_lng,
                                        'Latitud' : me.de_lat,
                                        'uDistrito' : me.u_distrito,
                                        'uSubproc' : me.u_dirSubPro,
                                        'uAgencia' : me.u_agencia,
                                        'usuario' : me.u_nombre,
                                        'uPuesto' : me.u_puesto,
                                        'uModulo' : me.u_modulo,
                                        'ElementoAsignado' : me.unidadelementoasignado,
                                        'FechaInicio': me.fechainicio,
                                        'FechaTermino': me.fechatermino,
                                        'Horainicio': me.horainicio,
                                        'HoraTermino': me.horatermino,
                                        'Motivo': me.motivo,
                                        'Observaciones': me.observaciones,
                                        'Origen': me.origen,
                                        'Destino': me.destino,
                                        'HoraSalida': me.horasalida,
                                        'HoraLLegada': me.horallegada,
                                        'Ruta': me.ruta,
                                        'Tipo': true,

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


                                }
                                me.dialogo = false;
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
                me.fechac = me.generarfecha3(new Date().toISOString().substr(0, 10));
                me.autoridad='';
                me.delito='';
                me.nuc='';
                me.personas = [];
                me.nucbusqueda = '';
                me.persona='';
                me.modusoperandi='';
                me.step = 1;
                me.nouniconacional='';
                me.tipodetencion = '';
                me.pertenenciasimputado = '';
                me.mp = '';
                me.modulo = '';
                me.fechai = '';
                me.fechat = '';
                me.fechac = '';
                me.autoridad = '';
                me.dp= '';
                me.referencia = '';
                me.delito= '';
                me.modusoperandi = '';
                me.tipodetencion = '';
                me.nouniconacional = '';
                me.pertenenciasimputado= '';
                me.de_calle = '';
                me.de_noExt = '';
                me.de_noInt = '';
                me.de_entreCalle1 = '';
                me.de_entreCalle2 = '';
                me.de_referencia = '';
                me.de_pais = "México";
                me.de_estado = '';
                me.de_municipio = '';
                me.de_localidad = '';
                me.de_estadoid = '';
                me.de_municipioid= '';
                me.de_localidadid = '';                
                me.de_cp = '';
                me.de_lng = '';
                me.de_lat = '';
                me.unidadelementoasignado = '';
                me.fechainicio = '';
                me.fechatermino = '';
                me.horainicio = '';
                me.horatermino = '';
                me.motivo = '';
                me.observaciones = '';
                me.origen = '';
                me.destino = '';
                me.horasalida = '';
                me.horallegada = '';
                me.ruta = '';
        },
        limpiar2(){
            let me = this;
                me.fechac = me.generarfecha3(new Date().toISOString().substr(0, 10));
                me.autoridad='';
                me.delito='';
                me.nuc='';
                me.personas = [];
                me.persona='';
                me.modusoperandi='';
                me.step = 1;
                me.nouniconacional='';
                me.tipodetencion = '';
                me.pertenenciasimputado = '';
                me.mp = '';
                me.modulo = '';
                me.fechai = '';
                me.fechat = '';
                me.fechac = '';
                me.autoridad = '';
                me.dp= '';
                me.referencia = '';
                me.delito= '';
                me.modusoperandi = '';
                me.tipodetencion = '';
                me.nouniconacional = '';
                me.pertenenciasimputado= '';
                me.de_calle = '';
                me.de_noExt = '';
                me.de_noInt = '';
                me.de_entreCalle1 = '';
                me.de_entreCalle2 = '';
                me.de_referencia = '';
                me.de_pais = "México";
                me.de_estado = '';
                me.de_municipio = '';
                me.de_localidad = '';
                me.de_estadoid = '';
                me.de_municipioid= '';
                me.de_localidadid = '';                
                me.de_cp = '';
                me.de_lng2 = '';
                me.de_lat2 = '';
                me.unidadelementoasignado = '';
                me.fechainicio = '';
                me.fechatermino = '';
                me.horainicio = '';
                me.horatermino = '';
                me.motivo = '';
                me.observaciones = '';
                me.origen = '';
                me.destino = '';
                me.horasalida = '';
                me.horallegada = '';
                me.ruta = '';
        },
        generarfecha(){
            var fecha;
            fecha =  moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY")+ ", "+ moment().format('h:mm:ss a');
            return fecha;      
        }, 
        generarfecha3(fecha){ 
            return fecha.substring(8,10) +" de "+ this.obtenermes(fecha.substring(5,7)-1)+
            " del "+ fecha.substring(0,4);       
        },        
        listar(){
          let me=this;  
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header};
          me.$PI.get('api/Detencion/Listar',configuracion).then(function(response){
                    //console.log(response);
                    me.detenidos=response.data;
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
        imprim1(){
                
            var printContents = document.getElementById('mapa').outerHTML;
            var w = window.open();
            w.document.write("<div style='position: absolute; left:500px; top:100px;'<h1 style='font-size:10px; color:blue;'>"+printContents+"<h1></div>");
            //w.document.write(printContents);
            w.print();
    
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
      } 
   }
</script>
<style>
.espaciado{
    padding: 30px !important; 
}
</style>