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
                    <v-toolbar-title class="font-weight-regular" >Personas detenidas</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                  
                                          
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
                    <td>{{ props.item.status }}</td>         
                    <td class="justify-center layout px-0">
                        <div class="justify-center layout px-0" v-if="props.item.status != 'Libertad'" >
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" 
                                        @click="actustatus(props.item)"
                                        >
                                       launch
                                    </v-icon> 
                                </template>
                                <span>Actualizar Status</span>
                            </v-tooltip>                                                  
                        </div> 
                        <div class="justify-center layout px-0" v-if="props.item.status == 'Egreso temporal'" >
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" 
                                        @click="consultaregreso(props.item)"
                                        >
                                       chrome_reader_mode
                                    </v-icon> 
                                </template>
                                <span>Consultar información de egreso temporal</span>
                            </v-tooltip> 
                        </div> 
                        <div class="justify-center layout px-0" v-if="props.item.status == 'Trasladado' ||props.item.status == 'Custodia' " >
                            <v-tooltip bottom   >
                                <template v-slot:activator="{ on }">
                                    <v-icon 
                                        class="mr-2" v-on="on" 
                                        @click="consultartrasladocustodia(props.item)"
                                        >
                                       note
                                    </v-icon> 
                                </template>
                                <span>Consultar información de traslado o custodia</span>
                            </v-tooltip> 
                        </div> 
                        <v-tooltip bottom   >
                            <template v-slot:activator="{ on }">
                                <v-icon 
                                    class="mr-2" v-on="on" 
                                    @click="activarnumero(props.item)"
                                    >
                                    assignment_ind
                                </v-icon> 
                            </template>
                            <span>Solicitar certificado médico</span>
                        </v-tooltip> 
                        <v-tooltip bottom   >
                            <template v-slot:activator="{ on }">
                                <v-icon 
                                    class="mr-2" v-on="on" 
                                    @click="consultarcertificados(props.item)"
                                    >
                                    library_books
                                </v-icon> 
                            </template>
                            <span>Consultar certificados médicos</span>
                        </v-tooltip> 
                        <v-tooltip bottom   >
                            <template v-slot:activator="{ on }">
                                <v-icon 
                                    class="mr-2" v-on="on" 
                                    @click="consultarhistorial(props.item)"
                                    >
                                    swap_horizontal_circle
                                </v-icon> 
                            </template>
                            <span>Historial de movimientos</span>
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

        <v-dialog  v-model="dialog"  max-width="1000px" >

            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">launch</v-icon>
                    </v-avatar>
        
    
                    <v-toolbar-title class="subheading">Actualizar Status</v-toolbar-title>
                    <v-spacer></v-spacer>
        
            
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" data-vv-scope="datossatus">
                        <v-container grid-list-md text-xs-center>
                            <v-layout row wrap>
                                <v-flex class="espaciado" xs12 sm12 md12 lg12>

                                    <v-autocomplete name="status" 
                                            :items="statuses"
                                            v-model="status" 
                                            return-object  
                                            data-vv-scope="datossatus"
                                            v-validate="'required'" 
                                            label="*Status:"
                                            :error-messages="errors.collect('datossatus.status')">
                                    </v-autocomplete>

                                    <v-text-field 
                                        name="quién ordena"
                                        label="*Quién ordena" 
                                        v-model='quienordena' 
                                        v-if="status.value == 10"
                                        data-vv-scope="datossatus"
                                        v-validate="'required'" 
                                        :error-messages="errors.collect('datossatus.quién ordena')"
                                    ></v-text-field>

                                </v-flex>

                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-text-field 
                                        name="motivo"
                                        label="*Motivo: " 
                                        v-model='motivo' 
                                        v-if="status.value == 3"
                                        data-vv-scope="datossatus"
                                        v-validate="'required'" 
                                        :error-messages="errors.collect('datossatus.motivo')"
                                    ></v-text-field>

                                    <v-text-field 
                                        name="quién lo solicita"
                                        label="*Quién lo solicita:" 
                                        v-model='quiensolicita' 
                                        v-if="status.value == 3"
                                        data-vv-scope="datossatus"
                                        v-validate="'required'" 
                                        :error-messages="errors.collect('datossatus.quién lo solicita')"
                                    ></v-text-field>


                                    <v-text-field 
                                        label="*Origen:" 
                                        name="origen" 
                                        v-model="origen" 
                                        data-vv-scope="datossatus"
                                        v-if="status.value == 2"
                                        v-validate="'required'" 
                                        :error-messages="errors.collect('datossatus.origen')">
                                    </v-text-field>

                                    <v-menu
                                        v-if="status.value == 2"
                                        ref="menu8"
                                        v-model="menu8"
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
                                                data-vv-scope="datossatus"
                                                v-on="on"
                                                v-validate="'required'" 
                                                :error-messages="errors.collect('datossatus.hora de salida')"
                                            ></v-text-field>
                                        </template>
                                        <v-time-picker
                                            v-if="menu8"
                                            v-model="horasalida"
                                            full-width
                                            @click:minute="$refs.menu8.save(horasalida)"
                                        ></v-time-picker>
                                    </v-menu>


                                    <v-text-field 
                                        label="*Ruta:" 
                                        name="ruta" 
                                        v-model="ruta" 
                                        v-if="status.value == 2"
                                        v-validate="'required'" 
                                        data-vv-scope="datossatus"
                                        :error-messages="errors.collect('datossatus.ruta')">
                                    </v-text-field>

                                    
                                </v-flex>

                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                     <v-text-field 
                                        name="quién autoriza"
                                        label="*Quién autoriza:" 
                                        v-model='quienautoriza' 
                                        v-if="status.value == 3"
                                        data-vv-scope="datossatus"
                                        v-validate="'required'" 
                                        :error-messages="errors.collect('datossatus.quién autoriza')"
                                    ></v-text-field>

                                    <v-menu
                                        v-if="status.value == 3"
                                        ref="menu2"
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        :return-value.sync="horaegreso"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                        >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                name="hora de egreso"
                                                v-model="horaegreso"
                                                label="*Hora de egreso:"
                                                prepend-icon="access_time"
                                                readonly
                                                v-on="on"
                                                data-vv-scope="datossatus"
                                                v-validate="'required'" 
                                                :error-messages="errors.collect('datossatus.hora de egreso')"
                                            ></v-text-field>
                                        </template>
                                        <v-time-picker
                                            v-if="menu2"
                                            v-model="horaegreso"
                                            full-width
                                            @click:minute="$refs.menu2.save(horaegreso)"
                                        ></v-time-picker>
                                    </v-menu>

                                    
                                    <v-text-field 
                                        label="*Destino:" 
                                        name="destino" 
                                        v-model="destino" 
                                        v-validate="'required'" 
                                        data-vv-scope="datossatus"
                                        v-if="status.value == 2"
                                        :error-messages="errors.collect('datossatus.destino')">
                                    </v-text-field>

                                    <v-menu
                                        v-if="status.value == 2"
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
                                                data-vv-scope="datossatus"
                                                v-on="on"
                                                v-validate="'required'" 
                                                :error-messages="errors.collect('datossatus.hora de llegada')"
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

                                <v-flex class="espaciado" xs12 sm12 md12 lg12 v-if="status.value == 3">
                                    <v-card elevation="0"  >
                                        <v-card-title class="accent"><h3>Notas</h3></v-card-title>
                                            <v-card-text>
                                                <vue-editor  
                                                    name="notas"                                        
                                                    v-model="notas" 
                                                    :editorToolbar="customToolbar"                                                                                                     
                                                    :error-messages="errors.collect('datossatus.notas')">
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

        <v-dialog  v-model="dialogarchivo"  max-width="1000px" >

            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">publish</v-icon>
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
                            <v-btn   @click="guardararchivo()" class="success" >Guardar</v-btn>
                            
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
                                        <td>{{ props.item.fechasys.substring(8,10) +" de "+ obtenermes(props.item.fechasys.substring(5,7)-1)+" del "+ props.item.fechasys.substring(0,4)+", "+props.item.fechasys.substring(11,19)}}</td> 
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

        <v-dialog  v-model="dialogegreso"  max-width="1000px" >

            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">assignment</v-icon>
                    </v-avatar>
            
                    <v-toolbar-title class="subheading">Información de egreso temporal</v-toolbar-title>
                    <v-spacer></v-spacer>                  
                </v-toolbar>
                <v-card-text>

                    <v-form ref="form" >
                        <v-container grid-list-md text-xs-center>
                            <v-layout row wrap>
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-text-field 
                                        name="motivo"
                                        label="Motivo: " 
                                        v-model='rmotivo' 
                                        disabled
                                    ></v-text-field>

                                    <v-text-field 
                                        name="quién lo solicita"
                                        label="Quién lo solicita:" 
                                        v-model='rquiensolicita' 
                                        disabled
                                    ></v-text-field>
                                </v-flex>

                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                     <v-text-field 
                                        name="quién autoriza"
                                        label="Quién autoriza:" 
                                        v-model='rquienautoriza' 
                                        disabled
                                    ></v-text-field>

                                    
                                    <v-text-field
                                        name="hora de egreso"
                                        v-model="rhoraegreso"
                                        label="Hora de egreso:"
                                        prepend-icon="access_time"
                                        disabled
                                    ></v-text-field>
                                        

                                </v-flex>

                                <v-flex class="espaciado" xs12 sm12 md12 lg12 >
                                    <v-card elevation="0"  >
                                        <v-card-title class="accent"><h3>Notas</h3></v-card-title>
                                            <v-card-text>
                                                <vue-editor  
                                                    name="notas"                                        
                                                    v-model="rnotas" 
                                                    :editorToolbar="customToolbar"                                                                                                     
                                                    >
                                                </vue-editor>
                                            </v-card-text>   
                                    </v-card> 
                                </v-flex>                            
                            </v-layout>
                        </v-container>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click.native="dialogegreso=false" >Cerrar</v-btn>                                   
                        </v-card-actions> 
                    </v-form>
                
                </v-card-text> 
            </v-card>

        </v-dialog>

        <v-dialog v-model="modaldocumento" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    <v-btn color=success text @click.native="solicitarmedico()">Guardar solicitud</v-btn>            
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

        <v-dialog  v-model="dialogonumeroficio"  max-width="500" >
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">assignment</v-icon>
                    </v-avatar>
                    
                    <v-toolbar-title class="subheading">Información</v-toolbar-title>
                    <v-spacer></v-spacer>

                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" data-vv-scope="numerooficio" >
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12 sm12 md12 lg12>
                                <v-text-field 
                                    name="número de oficio"
                                    label="*Número de oficio" 
                                    v-model='numerooficio' 
                                    data-vv-scope="numerooficio"
                                    v-validate="'required'" 
                                    :error-messages="errors.collect('numerooficio.número de oficio')"
                                ></v-text-field>
                            </v-flex>                               
                            </v-layout>
                        </v-container>

                        <v-card-actions>                            
                            <v-btn  @click.native="dialogonumeroficio=false" >Cerrar</v-btn>    
                            <v-btn color="success" @click="crearpdf()" >Continuar</v-btn>                                
                        </v-card-actions> 
                    </v-form>
                
                </v-card-text> 
            </v-card>

        </v-dialog>

        <v-dialog  v-model="dialogocertificados"  max-width="1000px" >
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">assignment</v-icon>
                    </v-avatar>
                    
                    <v-toolbar-title class="subheading">Lista de certificados medicos</v-toolbar-title>
                    <v-spacer></v-spacer>

                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" >
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12 sm12 md12 lg12>

                                <v-data-table                                             
                                    :headers="headerscertificados"
                                    :items="certificados"
                                    :search="searchcertificados" 
                                    :rows-per-page-items="rowsPerPageItems"
                                    :pagination.sync="pagination"
                                    >
        
                                    <template slot="items" class="white" slot-scope="props">                  
                                        <td>{{ props.item.usuario }}</td> 
                                        <td>{{ props.item.uPuesto }}</td>                                     
                                        <td>{{ props.item.fechasys.substring(8,10) +" de "+ obtenermes(props.item.fechasys.substring(5,7)-1)+" del "+ props.item.fechasys.substring(0,4)+", "+props.item.fechasys.substring(11,19)}}</td>
                                        <td>{{ props.item.numeroControlf }}</td> 
                                        <td>{{ props.item.status }}</td>  
                                        <td class="justify-center layout px-0">
                                            <v-tooltip bottom   >
                                                <template v-slot:activator="{ on }">
                                                    <v-icon 
                                                        class="mr-2" v-on="on" color='warning'
                                                        @click="imprimircertificado(props.item)"
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
                            <v-btn  @click.native="dialogocertificados=false" >Cerrar</v-btn>                                   
                        </v-card-actions> 
                    </v-form>
                
                </v-card-text> 
            </v-card>

        </v-dialog>

        <v-dialog  v-model="dialogohistorial"  max-width="1000px" >
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">assignment</v-icon>
                    </v-avatar>
                    
                    <v-toolbar-title class="subheading">Historial de estatus {{nombredetenido}}</v-toolbar-title>
                    <v-spacer></v-spacer>

                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" >
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12 sm12 md12 lg12>

                                <v-data-table                                             
                                    :headers="headershistorial"
                                    :items="historialesestatus"
                                    :search="searchhistorial" 
                                    :rows-per-page-items="rowsPerPageItems"
                                    :pagination.sync="pagination"
                                    >
        
                                    <template slot="items" class="white" slot-scope="props">                  
                                        <td>{{ props.item.usuario }}</td> 
                                        <td>{{ props.item.uPuesto }}</td>                                     
                                        <td>{{ props.item.fechasys.substring(8,10) +" de "+ obtenermes(props.item.fechasys.substring(5,7)-1)+" del "+ props.item.fechasys.substring(0,4)+", "+props.item.fechasys.substring(11,19)}}</td>
                                        <td>{{ props.item.statusPasado }}</td> 
                                        <td>{{ props.item.statuusNuevo }}</td>                                                                                      
                                    </template>               
                                </v-data-table>               
                            </v-flex>                               
                            </v-layout>
                        </v-container>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click.native="dialogohistorial=false" >Cerrar</v-btn>                                   
                        </v-card-actions> 
                    </v-form>
                
                </v-card-text> 
            </v-card>

        </v-dialog>

        <v-dialog  v-model="dialogocustodiastraslados"  max-width="1000px" >

            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">assignment</v-icon>
                    </v-avatar>
                    
                    <v-toolbar-title class="subheading">Lista de traslados/custodias</v-toolbar-title>
                    <v-spacer></v-spacer>

                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" >
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12 sm12 md12 lg12>

                                <v-data-table                                             
                                    :headers="headerstrasladocustodia"
                                    :items="statuscustodias"
                                    :search="searchtc" 
                                    :rows-per-page-items="rowsPerPageItems"
                                    :pagination.sync="pagination"
                                    >
        
                                    <template slot="items" class="white" slot-scope="props">                  
                                        <td>{{ props.item.usuario }}</td> 
                                        <td>{{ props.item.uModulo }}</td> 
                                        <td>{{ props.item.fechasys.substring(8,10) +" de "+ obtenermes(props.item.fechasys.substring(5,7)-1)+" del "+ props.item.fechasys.substring(0,4)}}</td> 
                                        <td>{{ props.item.origen }}</td> 
                                        <td>{{ props.item.destino }}</td> 
                                        <td><div v-if="props.item.tipo">
                                                <span class="blue--text">Custodia</span>
                                            </div>
                                            <div v-else>
                                                <span class="red--text">Traslado</span>
                                            </div>
                                        </td> 
                                        <td class="justify-center layout px-0">
                                            <v-tooltip bottom   >
                                                <template v-slot:activator="{ on }">
                                                    <v-icon 
                                                        class="mr-2" v-on="on" 
                                                        @click="consultarinfotrasladocustodia(props.item)"
                                                        >
                                                    archive
                                                    </v-icon> 
                                                </template>
                                                <span>Ver información/Capturar hora</span>
                                            </v-tooltip>   
                                        </td>                                                
                                    </template>               
                                </v-data-table>               
                            </v-flex>                               
                            </v-layout>
                        </v-container>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click.native="dialogocustodiastraslados=false" >Cerrar</v-btn>                                   
                        </v-card-actions> 
                    </v-form>
                
                </v-card-text> 
            </v-card>

        </v-dialog>

        <v-dialog  v-model="dialogoTC"  max-width="1000px" >
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">assignment</v-icon>
                    </v-avatar>
                    
                    <v-toolbar-title class="subheading">Información de traslado/custodia {{nombredetenido}}</v-toolbar-title>
                    <v-spacer></v-spacer>

                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" >
                        <v-container grid-list-md>
                            <v-layout wrap>

                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-card    auto-grow elevation="0">                                
                                        <v-card-text >
                                            <v-list one-line   > 
                                                        <v-list-tile v-if="tipo">   
                                                            <v-list-tile-action>
                                                                <v-icon color="success">account_box</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Unidad o elemento asignado:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ unidadelemento }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>
                                                        <v-list-tile v-if="tipo">  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">access_time</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Hora de inicio:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ horainicio }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>
                                                        <v-list-tile v-if="tipo">  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">event</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Fecha de inicio:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ fechainicio }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">arrow_right_alt</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Origen:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ origen }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">access_time</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Hora de salida:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ horasalida }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>
                                                        <v-list-tile>  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">flight_takeoff</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Ruta:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ ruta }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>   
                                  
                                            </v-list>  
                                        </v-card-text> 
                                    </v-card>
                                </v-flex> 

                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-card    auto-grow elevation="0">                                
                                        <v-card-text >
                                            <v-list one-line   >                                                   
                                                        <v-list-tile>  
                                                            <v-list-tile-action v-if="tipo">
                                                                <v-icon color="success" >assignment</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Destino:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ destino }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>
                                                        <v-list-tile v-if="tipo">  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">access_time</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Hora de termino:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ horatermino }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>
                                                        <v-list-tile v-if="tipo">  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">event</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Fecha de termino:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ fechatermino }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>
                                                        <v-list-tile v-if="tipo">  
                                                            <v-list-tile-action>
                                                                <v-icon color="success">flight_land</v-icon>
                                                            </v-list-tile-action> 
                                                            <v-list-tile-content   >  
                                                                <v-list-tile-title> <p class="body-2 font-weight-bold"><a>Destino:</a></p> </v-list-tile-title> 
                                                                <v-list-tile-sub-title   > <p   color="accent" class="caption font-weight-regular"><a>{{ destino }}</a></p>  </v-list-tile-sub-title>  
                                                            </v-list-tile-content> 
                                                        </v-list-tile>
                                                                                                                                      
                                            </v-list>  
                                        </v-card-text> 
                                    </v-card>

                                    <v-menu
                                        ref="menu6"
                                        v-model="menu6"
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
                                            v-if="menu6"
                                            v-model="horallegada"
                                            full-width
                                            @click:minute="$refs.menu6.save(horallegada)"
                                        ></v-time-picker>
                                    </v-menu>
                                </v-flex>     

                            </v-layout>
                        </v-container>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click.native="dialogoTC=false" >Cerrar</v-btn>   
                            <v-btn color="success"  @click.native="actualizahorasalida()" >Actualizar hora de salida</v-btn>                                  
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
        logo1:'',
        logo2:'',
        dialogonumeroficio:false,
        //*************** */


        //*************** */
        
        statuses:[
            { text: 'Detenido', value: '1' }, 
            { text: 'Trasladado', value: '2' }, 
            { text: 'Egreso temporal', value: '3' },
            { text: 'Trasladado a juzgado', value: '4' }, 
            { text: 'Trasladado a cerezo', value: '5' }, 
            { text: 'Trasladado por defunción', value: '6' },
            { text: 'Trasladado a institución de salud', value: '7' },
            { text: 'Custodia', value: '8' },
            { text: 'Libertad', value: '9' },
        ],  
        detenidos:[],
        status:'',
        quienordena:'',
        iddetenido:'',
        dialogarchivo:false,
        idDetencion:'',
        menu2:false,
        motivo:'',
        quiensolicita:'',
        quienautoriza:'',
        notas:'',
        horaegreso:'',
        dialogegreso: false,
        rmotivo:'',
        rquiensolicita:'',
        rquienautoriza:'',
        rnotas:'',
        rhoraegreso:'',
        statusactual:'',
        modaldocumento:false,
        searchcertificados:'',
        dialogohistorial:false,
        historialesestatus:[],
        dialogocustodiastraslados:false,
        dialogoTC: false,
        unidadelemento:'',
        horainicio:'',
        horatermino:'',
        fechainicio:'',
        fechatermino:'',
        origen:'',
        destino:'',
        horasalida:'',
        horallegada:'',
        ruta:'',
        menu6:false,
        menu7:false,
        menu8:false,
        tipo:false,
        //************* */
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
        imageName: '',
        imageUrl: null,
        imageFile: '',
        descripciondocumento:'',
        GUID:'',
        archivos:[],
        dialogpictures : false,
        dialogimagen:false,
        searchar:'',
        descrip:'',
        tipo:'',
        rutaconsulta:'',
        headersar: [

            { text: 'TipoDocumento', value: 'fipoDocumento', sortable: true  },            
            { text: 'FechaRegistro',value: 'fechaRegistro' }, 
            { text: 'Opciones', value: 'opciones' }, 
         
        ],
        headerscertificados: [

            { text: 'Emitido por', value: 'usuario'  },            
            { text: 'Modulo',value: 'usuario' }, 
            { text: 'Fecha de solicitud', value: 'fechasys' }, 
            { text: 'No de solicitud', value: 'numeroControlf' }, 
            { text: 'Estatus', value: 'status' }, 
            { text: 'Opciones', value: 'op',sortable:false }, 
        ],
        headershistorial: [

            { text: 'Emitido por', value: 'usuario'  },            
            { text: 'Modulo',value: 'usuario' }, 
            { text: 'Fecha de movimiento', value: 'fechasys' }, 
            { text: 'Estatus pasado', value: 'status' }, 
            { text: 'Estatus siguiente', value: 'op' }, 
        ],
        headerstrasladocustodia: [          
            { text: 'Emitido por', value: 'usuario'  },            
            { text: 'Modulo',value: 'uModulo' }, 
            { text: 'Fecha de registro', value: 'fechasys' }, 
            { text: 'Origen', value: 'origen' }, 
            { text: 'Destino', value: 'destino' }, 
            { text: 'Tipo', value: 'tipo' }, 
            { text: 'Opciones', value: 'op',sortable:false},
        ],
        searchtc:'',
        searchhistorial:'',
        agenciainfodr: '',
        agenciainfotel :'',
        auxsubproc:'',
        auxagencia:'',
        auxdistrito:'',
        nombrepersona:'',  
        numerooficio:'',   
        personaid:'',
        dialogocertificados:false,
        certificados:[],
        nombredetenido:[],
        statuscustodias:[],
        idestatuscutodia:'',
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
            { text: 'Imputado', value: 'nompersona' }, 
            { text: 'NUC', value: 'nuc' },
            { text: 'Fecha de Ingreso', value: 'fechaIngreso' },
            { text: 'Delito', value: 'delito' },
            { text: 'Autoridad captura',value: 'autoridadED' },       
            { text: 'Status',value: 'status' },
            { text: 'Opciones',value: 'op',sortable: false },
        ],
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
        editedIndex: 0, 
        modalAdd:false,
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
        actualizahorasalida(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$PI.put('api/EstatusCustodia/Actualizarhorallegada',{
                'IdEstatusCustodia': me.idestatuscutodia,
                'Horallegada': me.horallegada                  
            },configuracion).then(function(response){                          
                me.$notify('La información se actualizo correctamente !!!','success')   
                me.dialogoTC = false;
                me.dialogocustodiastraslados = false;            
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
        loadarchive(item){
            let me = this;
            me.nuc = item.nuc;
            me.idDetencion = item.idDetencion;
            me.dialogarchivo = true;
        }, 
        consultartrasladocustodia(item){
            let me = this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.limpiar();
            me.$PI.get('api/EstatusCustodia/Listar/'+item.idDetencion,configuracion).then(function(response){
                    //console.log(response);
                    me.statuscustodias = response.data;
                    me.nombredetenido = item.nompersona
                    me.dialogocustodiastraslados = true;
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
        consultarinfotrasladocustodia(item){
            this.idestatuscutodia = item.idEstatusCustodia
            this.dialogoTC = true
            this.unidadelemento = item.elementoAsignado
            this.motivo = item.motivo
            this.horainicio = item.horainicio
            this.horatermino = item.horaTermino
            this.fechainicio = item.fechaInicio
            this.fechatermino = item.fechaTermino
            this.origen =  item.origen
            this.destino = item.destino 
            this.horasalida = item.horaSalida
            this.horallegada = item.horaLLegada
            this.ruta = item.ruta
            this.tipo = item.tipo
        },
        consultaregreso(item){
            let me = this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.limpiar();
            me.$PI.get('api/EgresosTemporal/ListarporidDetencion/'+item.idDetencion,configuracion).then(function(response){
                    //console.log(response);
                    me.rmotivo = response.data.motivo;
                    me.rhoraegreso = response.data.horaegreso;
                    me.rquiensolicita = response.data.quienSolicita;
                    me.rquienautoriza = response.data.quienAutoriza;
                    me.rnotas = response.data.notas;
                    me.dialogegreso = true;
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
        consultarhistorial(item){

            let me = this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.nombredetenido = item.nompersona
            me.limpiar();
            me.$PI.get('api/HistorialDetencion/ListarporIddtencion/'+item.idDetencion,configuracion).then(function(response){
                    //console.log(response);
                    me.historialesestatus = response.data;
                    me.dialogohistorial = true;
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
        guardararchivo(){ 
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
                             
                                 me.$PI.post('api/SubirArchivos/Post/'+nombreCarpeta+'/'+me.GUID,
                                    formData,
                                    {
                                    headers: {
                                                'Content-Type': 'multipart/form-data'
                                            } 
                                    },configuracion  
                                ).then(function(response){
                                    console.log('SUCCESS!!');
                                        console.log(response.data.ruta);
                                        me.$PI.post('api/SubirArchivos/Crear',{  

                                            'DetencionId' : me.idDetencion,
                                            'tipoDocumento' : me.tiposdocumento.text,
                                            'NombreDocumento': me.GUID,
                                            'descripcionDocumento' : me.descripciondocumento,
                                            'ruta' : response.data.ruta,
                                            'usuario' : 'na',
                                            'uDistrito' : me.u_distrito,
                                            'uSubproc' : me.u_dirSubPro,
                                            'uAgencia' : me.u_agencia,
                                            'usuario' : me.u_nombre,
                                            'uPuesto' : me.u_puesto,
                                            'uModulo' : me.u_modulo,                   

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
        consultarcertificados(item){
            let me = this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$PI.get('api/CMedicoPR/Listarporid/'+ item.personaId,configuracion).then(function(response){
                    me.certificados=response.data;
                    me.nombrepersona = item.nompersona;
                    me.dialogocertificados = true;
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
        consultararchivo(item){
            let me = this;
            me.dialogpictures = true;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$PI.get('api/SubirArchivos/Listar/'+ item.idDetencion,configuracion).then(function(response){
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
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        }else{
                            me.$notify('Error al intentar listar los registros!!!','error')    
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
        actustatus(item){
            let me = this;
            me.statusactual = item.status;
            me.limpiar();
            me.dialog = true;
            me.iddetenido = item.idDetencion;
        },
        cambiarstatus(){
            let me = this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$validator.validateAll('datossatus').then(result =>  {
                if (result) { 

                    if(me.status.value == 2){
                        me.$PI.put('api/Detencion/ActualizarTraslado',{
                            'IdDetencion': me.iddetenido,
                            'Status': me.status.text,
                            'FechaTraslado': me.generarfecha()                 
                        },configuracion).then(function(response){ 
                            me.$PI.post('api/HistorialDetencion/NuevoStatus',{ 
                                    'DetencionId' : me.iddetenido,
                                    'StatusPasado': me.statusactual,
                                    'StatuusNuevo': me.status.text,
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
                            
                            
                            me.$PI.post('api/EstatusCustodia/Crear',{ 

                                'DetencionId' : me.iddetenido,
                                'Calle': '',
                                'NoExterior': 0,
                                'NoInterior': 0,
                                'Ecalle1': '',
                                'Ecalle2': '',
                                'Referencia': '',
                                'Pais': '',
                                'Estado': '',
                                'Municipio': '',
                                'Localidad': '',
                                'Cp': 0,
                                'Longitud': 0,
                                'Latitud' : 0,
                                'uDistrito' : me.u_distrito,
                                'uSubproc' : me.u_dirSubPro,
                                'uAgencia' : me.u_agencia,
                                'usuario' : me.u_nombre,
                                'uPuesto' : me.u_puesto,
                                'uModulo' : me.u_modulo,
                                'ElementoAsignado' : '',
                                'FechaInicio': '',
                                'FechaTermino': '',
                                'Horainicio': '',
                                'HoraTermino': '',
                                'Motivo': '',
                                'Observaciones': '',
                                'Origen': me.origen,
                                'Destino': me.destino,
                                'HoraSalida': me.horasalida,
                                'HoraLLegada': me.horallegada,
                                'Ruta': me.ruta,
                                'Tipo': false,


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
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (err.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar actualizar el registro!!!','error')   
                            } 
                        });
                    }else if(me.status.value == 9){
                        
                        me.$PI.put('api/Detencion/ActualizarLiberacion',{
                            'IdDetencion': me.iddetenido,
                            'Status': me.status.text,
                            'FechaSalida': me.generarfecha(),
                            'AutoridadQO': me.quienordena                 
                        },configuracion).then(function(response){  
                            me.$PI.post('api/HistorialDetencion/NuevoStatus',{ 
                                'DetencionId' : me.iddetenido,
                                'StatusPasado': me.statusactual,
                                'StatuusNuevo': me.status.text,
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
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (err.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar actualizar el registro!!!','error')   
                            } 
                        });

                    }else if(me.status.value == 3){
                        
                        me.$PI.put('api/Detencion/ActualizarStatus',{
                            'IdDetencion': me.iddetenido,
                            'Status': me.status.text,                  
                        },configuracion).then(function(response){          
                            me.$PI.post('api/HistorialDetencion/NuevoStatus',{ 
                                'DetencionId' : me.iddetenido,
                                'StatusPasado': me.statusactual,
                                'StatuusNuevo': me.status.text,
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
                            me.$notify('La información se actualizo correctamente !!!','success')
                            
                            me.$PI.post('api/EgresosTemporal/Crear',{
                            'DetencionId': me.iddetenido,
                            'Motivo': me.motivo,
                            'Horaegreso': me.horaegreso,
                            'QuienSolicita': me.quiensolicita,
                            'QuienAutoriza': me.quienautoriza,
                            'Notas': me.notas,
                            'uDistrito' : me.u_distrito,
                            'uSubproc' : me.u_dirSubPro,
                            'uAgencia' : me.u_agencia,
                            'usuario' : me.u_nombre,
                            'uPuesto' : me.u_puesto,
                            'uModulo' : me.u_modulo,          

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
                                    me.$notify('Error al intentar crear el registro!!!','error')   
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

                    } else if(me.statusactual == "Egreso temporal" && me.status.value == 1){
                        me.$PI.put('api/Detencion/ActualizarDetencionporegresotemporal',{
                            'IdDetencion': me.iddetenido,
                            'Status': me.status.text, 
                                             
                        },configuracion).then(function(response){  
                            me.$PI.post('api/HistorialDetencion/NuevoStatus',{ 
                                'DetencionId' : me.iddetenido,
                                'StatusPasado': me.statusactual,
                                'StatuusNuevo': me.status.text,
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
                                me.$notify("No esta autorizado para ver esta pagina", 'error')
                                me.e403= true
                                me.showpage= false 
                            } else if (err.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify('Error al intentar actualizar el registro!!!','error')   
                            } 
                        });
                    }else { 
                        
                        me.$PI.put('api/Detencion/ActualizarStatus',{
                            'IdDetencion': me.iddetenido,
                            'Status': me.status.text,                  
                        },configuracion).then(function(response){   
                            me.$PI.post('api/HistorialDetencion/NuevoStatus',{ 
                                'DetencionId' : me.iddetenido,
                                'StatusPasado': me.statusactual,
                                'StatuusNuevo': me.status.text,
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
                }

            });


        },
        activarnumero(item){
            this.limpiar();
            this.dialogonumeroficio = true;
            this.nombrepersona = item.nompersona;
            this.nuc = item.nuc;
            this.personaid = item.personaId
            this.obtenernumeromaximo();
        },
        crearpdf(item){
            this.$validator.validateAll('numerooficio').then(result => {
                if (result) { 
                    this.fecha = this.generarfecha2();
                    this.auxsubproc= this.u_dirSubPro;
                    this.auxagencia = this.u_agencia;
                    this.auxdistrito = this.u_distrito;
                    this.downloadPdf(this.u_nombre,this.u_puesto,this.u_agencia);
                }
            })
        },
        imprimircertificado(item){
            this.fecha = item.fechasys.substring(8,10) +" de "+ this.obtenermes(item.fechasys.substring(5,7)-1)+" del "+item.fechasys.substring(0,4)
            this.auxsubproc = item.uSubproc
            this.auxagencia = item.uAgencia
            this.auxdistrito = item.uDistrito
            this.numerooficio = item.nOficio
            this.nuc = item.nuc
            this.mostrarpdf(item.usuario,item.uPuesto,item.uAgencia);
            this.modaldocumento = false;
        },
        solicitarmedico(){    
                    let me=this;
                    let header={"Authorization" : "Bearer " + this.$store.state.token};
                    let configuracion= {headers : header};
                    me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar la información .',           
                    function(){
                        me.numeromaximo += 1
                        me.$PI.post('api/CMedicoPR/Crear',{  
                            'PersonaId' : me.personaid,
                            'Nuc' : me.nuc ,
                            'NOficio' : me.numerooficio,
                            'uDistrito' : me.u_distrito,
                            'uSubproc' : me.u_dirSubPro,
                            'uAgencia' : me.u_agencia,
                            'usuario' : me.u_nombre,
                            'uPuesto' : me.u_puesto,
                            'uModulo' : me.u_modulo,
                            'ModuloServicioId': me.u_idmoduloservicio,
                            'Status': "Solicitado",
                            'Respuesta':"",
                            'FechaAsignacion':'0001-01-01 00:00:00.0000',
                            'NumeroAgencia': me.agenciainfodr,
                            'TelefonoAgencia': me.agenciainfotel,
                            'NodeSolicitud': me.numeromaximo,
                            'NumeroControl':'',
                            'NumeroDistrito': me.u_nodistrito
                        },configuracion).then(function(response){
                            me.$notify('La información se guardo correctamente !!!','success')   
                            me.modaldocumento = false;
                            me.dialogonumeroficio = false;
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
                    
        },
        limpiar(){    
            let me = this;
            me.quienordena = '';
            me.status = '';
            me.motivo = '';
            me.quiensolicita = '';
            me.quienautoriza = '';
            me.notas = '';
            me.horaegreso = '';
            me.rmotivo = '';
            me.rquiensolicita = '';
            me.rquienautoriza = '';
            me.rnotas = '';
            me.rhoraegreso = '';
            me.numerooficio = '';
            me.nombrepersona = ''
            me.nuc = ''
            me.personaid = ''
            me.imageName = ''
            me.tiposdocumento = ''
            me.descripciondocumento = ''
            me.imageUrl = ''
            me.imageFile = ''
            me.destino = ''
            me.origen = '';
            me.horasalida = '';
            me.horallegada = '';
            me.ruta ='';
        },
        generarfecha(){
            return moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY")
        }, 
        generarfecha2(){
            return moment().format('DD') + " de " + moment().format('MMMM')  + " del " + moment().format("YYYY")
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
        obtenernumeromaximo(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$PI.get('api/CMedicoPSR/ObtenernumeroMaximoporDistritoPr/'+ me.u_nodistrito,configuracion).then(function(response){
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
            var numerooficio = this.numerooficio;
            var nuc = this.nuc;
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
                        text:   "Por medio de la presente, solicito tenga a bien solicitar servicio médico para la siguiente persona con registro previo:\n\n ",                               
                        style: 'Texto',
                    },
                    {
                        text:   this.nombrepersona,                             
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