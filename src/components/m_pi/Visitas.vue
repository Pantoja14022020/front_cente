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
                    <v-toolbar-title class="font-weight-regular" >Registro de Persona que visita</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                     <v-flex xs12 sm6 md3>
                      
                       </v-flex>                      
                        <v-btn class="mx-2" @click="agregar()" fab dark small color="success">
                            <v-icon dark>add</v-icon>
                        </v-btn> 
            
                    
         </v-toolbar>
        <v-data-table
                :headers="headers"
                :items="visitas"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"  >
                <template slot="items" class="white" slot-scope="props">
 
                    <td>{{ props.item.usuario}}</td>  
                    <td>{{ props.item.uModulo }}</td>                 
                    <td>{{ props.item.nombre + ' ' + props.item.apellidoP + ' ' + props.item.apellidoM}}</td>  
                    <td>{{ props.item.edad }}</td>  
                    <td>{{ props.item.telefono1}}</td>
                    <td>{{ props.item.telefono2}}</td>
                    <td class="justify-center layout px-0" > 
                        <v-tooltip bottom  >
                            <template v-slot:activator="{ on }">
                                <v-icon 
                                    class="mr-2" v-on="on"  
                                    @click="vizualisarImag(props.item)"
                                    >
                                    contacts
                                </v-icon> 
                            </template>
                            <span>Visualizar documento de identificación</span>
                        </v-tooltip>
                        <v-tooltip bottom   >
                            <template v-slot:activator="{ on }">
                                <v-icon 
                                    class="mr-2" v-on="on"
                                    @click="mostrarmapa(props.item)"
                                    >
                                location_on
                                </v-icon> 
                            </template>
                            <span>Ver dirección</span>
                        </v-tooltip>  
                    </td>                   

                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
        </v-data-table>
          
        

        
        <v-dialog   v-model="modalAdd"  fullscreen hide-overlay transition="dialog-bottom-transition">  
            <v-card>
                <v-toolbar dark color="primary">
                   
                    <v-avatar  size="30">
                        <v-icon >{{ formIcon }}</v-icon>
                    </v-avatar> 
                    <v-toolbar-title class="subheading">{{formTitle}}</v-toolbar-title>
                    <v-spacer></v-spacer>
               
                    <v-toolbar-items>
                        <v-btn  color=success text @click.native="guardar">
                          GUARDAR INFORMACION</v-btn>
                         <v-btn icon   @click="modalclose()">
                    <v-icon>close</v-icon>
                    </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
     
                            <v-stepper v-model="step" non-linear vertical>
                            <v-stepper-step :complete="step > 1" step="1" editable :rules="[() => !errors.has('nombre') && !errors.has('apellido paterno')]">
                                Captura de datos
                                <small>Datos generales de la persona que visita.</small>
                            </v-stepper-step>
                            <v-stepper-content step="1">
                                <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">

                                    <v-container grid-list-md text-xs-center>
                                        <v-layout row wrap> 
                                            <v-flex class="espaciado"  xs12 sm12 md6 lg6> 
                                            
                                                <v-text-field name="nombre" 
                                                    label="*Nombre(s):" 
                                                    v-model="nombres"   
                                                    v-validate="'required'"
                                                    :error-messages="errors.collect('nombre')">                                                   
                                                </v-text-field>

                                                <v-text-field name="apellido paterno" 
                                                    label="*Apellido paterno:" 
                                                    v-model="apaterno" 
                                                    v-validate="'required'"
                                                    :error-messages="errors.collect('apellido paterno')">                             
                                                </v-text-field>

                                                <v-text-field name="apellido materno" 
                                                    label="*Apellido materno:" 
                                                    v-model="amaterno" >                               
                                                </v-text-field>

                                                <v-text-field 
                                                    name="edad" 
                                                    label="Edad:" 
                                                    v-model='edad' 
                                                    type="number">                                   
                                                </v-text-field>

                                                <v-text-field 
                                                    name="ocupación" 
                                                    label="Ocupación:" 
                                                    v-model='ocupacion' >                                   
                                                </v-text-field>


                                            </v-flex>
                                            

                                            <v-flex  class="espaciado" xs12 sm12 md6 lg6>  

                                                <v-text-field 
                                                    name="telefono 1" 
                                                    label="Telefono 1:" 
                                                    v-model='telefono1' 
                                                    type="number">                                   
                                                </v-text-field>

                                                <v-text-field 
                                                    name="telefono 2" 
                                                    label="Telefono 2:" 
                                                    v-model='telefono2' 
                                                    type="number">                                   
                                                </v-text-field>
                                            
                                                <v-autocomplete name="documento de identificación"
                                                    :items="docsidentificaciones"
                                                    v-model="docidentificacion"
                                                    label="Documento de identificación:"
                                                ></v-autocomplete>
                                            
                                                <br/>
                                                
                                                <v-toolbar color="primary"  dark> 
                                                    <v-toolbar-title>Documento escaneado</v-toolbar-title>
                                                    <v-spacer></v-spacer>
                                                    
                                                    <v-dialog  v-model="dialog"  max-width="500px"> 
                                                        <v-btn slot="activator" icon>
                                                            <v-icon>camera</v-icon>
                                                        </v-btn>

                                                        <v-card>
                                                            <v-toolbar card dark color="grey lighten-4 primary--text">
                                                                <v-avatar  size="30">
                                                                    <v-icon class="grey lighten-2">camera</v-icon>
                                                                </v-avatar> 
                                                                <v-toolbar-title class="subheading">Escanear documento</v-toolbar-title>
                                                                <v-spacer></v-spacer> 
                                                            </v-toolbar>
                                                            <v-card-text>
                                                            <v-form ref="form"> 
                                                                <v-card-actions>
                                                                    <v-layout row wrap>

                                                                        <vue-web-cam ref="webcam"
                                                                            :device-id="deviceId"   height="400px"  
                                                                            @started="onStarted" 
                                                                            @stopped="onStopped" 
                                                                            @error="onError" 
                                                                            @cameras="onCameras"
                                                                            @camera-change="onCameraChange" />

                                                                        <v-flex xs12 sm6 md3 order-md4 order-sm2 >
                                                                            <v-card  tile flat  >
                                                                                <v-card-text class="text-md-center">
                                                                                    <v-btn fab small color="info" @click="onClose">
                                                                                        <v-icon >close</v-icon>
                                                                                    </v-btn>
                                                                                </v-card-text>
                                                                            </v-card>
                                                                        </v-flex>

                                                                        <v-flex xs12 sm6 md3 order-md3 order-sm1>
                                                                            <v-card  tile flat  >
                                                                                <v-card-text class="text-md-center">
                                                                                    <v-btn fab small color="info"  @click="onCapture">
                                                                                        <v-icon >photo_camera</v-icon>
                                                                                    </v-btn>
                                                                                </v-card-text>
                                                                            </v-card>
                                                                        </v-flex>

                                                                        <v-flex xs12 sm6 md3 order-md2 order-sm4>
                                                                            <v-card   tile flat  >
                                                                                <v-card-text class="text-md-center">
                                                                                    <v-btn fab small  color="info" @click="onStop">
                                                                                        <v-icon  >stop</v-icon>
                                                                                    </v-btn>
                                                                                </v-card-text>
                                                                            </v-card>
                                                                        </v-flex>

                                                                        <v-flex xs12 sm6 md3 order-md1 order-sm3>
                                                                        <v-card  tile flat  >
                                                                            <v-card-text class="text-md-center" >
                                                                                <v-btn fab  small color="info" @click="onStart">
                                                                                    <v-icon >play_arrow</v-icon>
                                                                                </v-btn>
                                                                            </v-card-text>
                                                                        </v-card>
                                                                        </v-flex>

                                                                    </v-layout>
                                                                </v-card-actions>  
                                                            </v-form> 
                                                        </v-card-text> 
                                                        </v-card> 
                                                </v-dialog> 
                                                </v-toolbar>
                                                <v-card>

                                                    <v-container fluid grid-list-md>
                                                    <v-layout row wrap>
                                                        <v-flex class="text-md-center">  
                                                            <img   :src="imageUrl"  height="150px"  v-if="imageUrl"/>  
                                                        </v-flex>
                                                    </v-layout>
                                                    </v-container>

                                                </v-card>

                                                <v-text-field 
                                                    label="Selecciona la imagen del documento de identificacion" 
                                                    @click='pickFile'
                                                    v-model='imageName'
                                                    prepend-icon='attach_file'
                                                ></v-text-field>
                
                                                <input
                                                    type="file"
                                                    style="display: none"
                                                    ref="image"
                                                    accept="image/*"
                                                    @change="onFilePicked"
                                                >
               
                                            </v-flex>
                                
                                            
                                                                    
                                        </v-layout>
                                        <v-spacer></v-spacer>
                                        <div class="text-xs-right">
                                            <v-btn color="primary"  @click.native="step = 2">Continuar</v-btn>
                                        </div>
                                    </v-container> 
                                        
                                </v-card>
                                
                            </v-stepper-content>
                           
                            <v-stepper-step :complete="step > 2"  step="2"  editable :rules="[() => !errors.has('calle') && !errors.has('numero exterior')  && !errors.has('pais') && !errors.has('estado' ) && !errors.has('municipio')  && !errors.has('localidad')  && !errors.has('cp' )]">
                                Dirección de persona que visita
                            </v-stepper-step>
                            <v-stepper-content step="2">
                                <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                    <v-container grid-list-md text-xs-center>
                                        <v-layout row wrap> 
                                            <v-flex class="espaciado"  xs12 sm12 md6 lg6> 
                                                
                                                <v-text-field label="*Calle:" 
                                                            name="calle" 
                                                            v-model="de_calle" 
                                                            v-validate="'required'" 
                                                            :error-messages="errors.collect('calle')">
                                                </v-text-field>
                                                <v-text-field name="numero exterior" 
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

                                                <v-text-field label="Pais:" 
                                                            name="pais" 
                                                            v-model="de_pais" 
                                                            value="México">
                                                </v-text-field> 

                                            </v-flex> 

                                            
                                            <v-flex class="espaciado"  xs12 sm12 md6 lg6>  
                                                
                                                <v-autocomplete label="Estado:" 
                                                                name="estado"     
                                                                v-model="de_estadoid"
                                                                :items="de_ciudades"  
                                                                return-object
                                                                v-on:change="de_listarPorEstado"  > 
                                                </v-autocomplete>
                                            
                                                <v-autocomplete label="Municipio:" 
                                                                name="municipio" 
                                                                v-model="de_municipioid" 
                                                                :items="de_municipios"
                                                                return-object  
                                                                v-on:change="de_listarPorMunicipio">
                                                </v-autocomplete>
                                                <v-autocomplete label="Localidad:" 
                                                                name="localidad" 
                                                                v-model="de_localidadid" 
                                                                :items="de_localidades" 
                                                                return-object
                                                                v-on:change="de_listarPorLocalidad">
                                                </v-autocomplete>
                                                <v-text-field 
                                                    label="Código postal:" 
                                                    name="cp" 
                                                    v-model="de_cp"
                                                    type="number"
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
                                                <v-btn block=""   @click.native="btn_geoloc2" outline color="primary"><v-icon>location_on</v-icon>Croquis</v-btn>
                                            </v-flex> 
                                             
                                        </v-layout>
                                        <div class="text-xs-right">
                                            <v-btn flat @click.native="step = 1">Anterior</v-btn> 
                                            <v-btn color="primary"  @click.native="guardar"  >Finalizar</v-btn>  
                                            
                                        </div> 
                                    </v-container>
                                
                                </v-card> 
                                
                            </v-stepper-content>  
                            </v-stepper> 
            </v-card> 
        </v-dialog>

        <v-dialog v-model="modalGeolocalizacion" fullscreen hide-overlay transition="dialog-bottom-transition"> 
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Geolocalización.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn  color=success text @click.native="guardarGeolocalizacion()">GUARDAR</v-btn>
                        <v-btn icon   @click="modalGeolocalizacion = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
        
                <v-divider></v-divider>
            
                <v-card    elevation=0 class="mb-5" height="auto">
                    <v-container grid-list-sm    >
                        <v-layout row wrap justify-center>
                            <v-flex  xs12 md12 lg12> 
                                <gmap-autocomplete  
                                    style="width:50%;  
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
                                    id="mapa"
                                    @place_changed="setPlace">
                                </gmap-autocomplete>     

                                <v-btn  outline color="primary" @click="addMarker">BUSCAR</v-btn>
                            <br>
                            <gmap-map
                                :center="center"
                                :zoom="17"
                                style="width:100%;  height: 700px;">

                                <gmap-marker
                                    :key="index"
                                    v-for="(m, index) in markers"
                                    :position="m.position"
                                    @click="center=m.position"
                                    :clickable="true"
                                    :draggable="true"
                                    @drag="updateCoordinates"
                                    @dragend="updatecenter"
                                ></gmap-marker>

                            </gmap-map>  
                            </v-flex>  
                        </v-layout>
                        
                    </v-container>
                </v-card>
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
                                    <v-layout wrap>
                                    <v-flex  xs12 sm12 md12 lg12>
                                        
                                        Tipo de archivo : {{tipo}}

                                         <v-img                                        
                                            :src="rutaconsulta" 
                                            aspect-ratio="1"
                                            class="black"
                                            contain                                           
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
                        <v-layout wrap>
                            <v-flex  xs12 sm12 md12 lg12>
                                
                                Tipo de archivo : {{tipo}}

                                    <v-img                                        
                                    :src="rutaconsulta" 
                                    aspect-ratio="1"
                                    class="black"
                                    contain                                           
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
  import VeeValidate from 'vee-validate' 
  import { WebCam } from "vue-web-cam";
  import n401 from './401.vue'
  import n403 from './403.vue' 
  import moment from 'moment'
  import 'moment/locale/es';
  import { error } from 'util';


  var assert, curp, persona;
  assert = require('assert');
  curp = require('curp.js');  

  export default {
    components: {
        "vue-web-cam": WebCam
    },
    data: () => ({ 
        components: {  
            n401,
            n403
        }, 
        showpage:true,
        e401:false,
        e403:false,
        modalduplicidad:false, 
        dialog: false, 
        rapid:'',
        rAtencionId:'',
        rHechoId:'', 
        nuc:'VISITA',
        rutaconsulta:'',
        tipo:'',
        dialogimagen:'',
        lugar:'',
        //*************** */
        headers: [
           
            { text: 'Emitida por', value: 'nombre' },
            { text: 'Mesa', value: 'curp'},         
            { text: 'Nombre', value: 'nombre' },
            { text: 'Edad', value: 'edad' },
            { text: 'Telefono 1', value: 'telefono1' },
            { text: 'Telefono 2', value: 'telefon2'},
            { text: 'Opciones', value: 'op', sortable: false}
        ],
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
            rowsPerPage: 20
        },
        editedIndex: -1, 
        modalAdd:0,
        geoloc:0,
        modalGeolocalizacion:0,
        //****************************** */
        center: { lat:45.508, lng: -73.587 },
        markers: [],
        places: [],
        currentPlace: null, 
        lataux:'',
        lngaux:'',
        //****************************** */
        lat2:'',
        lng2:'',
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
        //********************************/
        step:1, 
        //********************************/
        visitas:[],
        idireccionescuha:'',
        dialog2:false,
        dialogimagen:false,
        rutaconsulta:'',
        tipo:'',
        edad:'',
        ocupacion:'',      
        telefono1:'',
        telefono2:'',
        nombres:'',
        apaterno:'',
        amaterno:'',
        idvisita:'',
        //CAPTURA DE DATOS

        docidentificacion:'',
        docidentificacion2:'',
        docsidentificaciones:[], 

        entidadFederativa:'',
        abreviacion:'',
        estados:[],   

        //img: null,
        camera: null,
        deviceId: null,
        devices: [],

        imageName: '',
        imageUrl: null,
        imageFile: [],
        imageFile2: [],

        nacionalidad:'Mexicana',

       

        estado:'',
        estadoid:0,
        ciudades:[],

        municipio:'',
        municipioid:0,
        municipios:[],

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
        de_lat:'',
        de_lng:'',

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
         GUID:'',
         statusActualizar:false,
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
                    me.listarIdentificacion();
                    me.de_listarCiudades();
            
      
      
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
        
     // Do something with request error
          this.$store.commit('LOADER',false);
          return Promise.reject(error);
        });


    },
    computed: {
        formTitle () {
                return this.editedIndex === -1 ? 'Registro persona visitante' : ''
        },
        formIcon () {
            return this.editedIndex === -1 ? 'add' : 'edit'
        },
        device: function() {
            return this.devices.find(n => n.deviceId === this.deviceId);
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
        camera: function(id) {
        this.deviceId = id;
        },
  
        devices: function() {
        // Once we have a list select the first one
            const [first, ...tail] = this.devices;
            if (first) {
                this.camera = first.deviceId;
                this.deviceId = first.deviceId;
            }
        }
    },
    methods:{ 
        agregar(){
            this.modalAdd= 1;
        },
        close () {
            
            this.modalAdd = 0;
            this.limpiar();
        },
        generarfecha(){
            var fecha;
            fecha = moment().format('h:mm a')+ " horas del día "+  moment().format('DD') + " de " + moment().format('MMMM')  + " de " + moment().format("YYYY");
            return fecha;      
        },
        selectEFederativa: function(val) {      
        
            for (var i = 0; i < this.estados.length; i++) {
                
                if (this.estados[i].text === val)
                {
                        this.abreviacion =  new Object();
                        this.abreviacion.text =this.estados[i].text;
                        this.abreviacion.value = this.estados[i].value; 
               
                }
            }
        },
        
        infoItem (item) {   
            this.editedIndex=1; 
        },
        mostrarTP(){
            this.verTP=1;
        },
        ocultarTP (){
            this.verTP=0;
        },
        limpiar(){     
            this.statusActualizar=false;
            this.lngaux = '';
            this.lataux = '';
            //************************************************************* */
            //step no 1

            this.nombres="";
            this.apaterno="";
            this.amaterno="";
            this.docidentificacion="";
            this.imageName="";
            this.imageFile ="";
            this.imageUrl ="";
            //************************************************************* */
            this.de_calle="";
            this.de_noInt="";
            this.de_noExt="";
            this.de_entreCalle1="";
            this.de_entreCalle2="";
            this.de_referencia="";
            this.edad = "";
            this.ocupacion = "";
            this.telefono1 = '';
            this.telefono2 = '';
            this.de_pais="Mexico";
            this.de_estadoid=0;
            this.de_estado="";
            this.de_municipioid=0;
            this.de_municipio="";
            this.de_localidadid=0; 
            this.de_localidad="";
            this.de_cp=""; 
            this.de_lat="";
            this.de_lng="";
            this.step=1;
            this.editedIndex=-1;
        },
       
      
        listar(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$PI.get('api/PersonaVisita/Listar',configuracion).then(function(response){
                me.visitas = response.data;
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
        vizualisarImag(item){
            let me = this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var sexoArray=[];
            me.$PI.get('api/Representante/DocRepresentanteslistarporid/'+ item.idRepresentante,configuracion).then(function(response){
               me.rutaconsulta =  response.data.ruta    
               me.tipo = response.data.tipoDocumento
               me.dialogimagen = true;            
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
        listarIdentificacion(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var docIdentificaionArray=[];
            this.$conf.get('api/DocIdentificacions/Listar',configuracion).then(function(response){
                //console.log(response.data);
                docIdentificaionArray=response.data;
                docIdentificaionArray.map(function(x){
                    me.docsidentificaciones.push({text: x.nombre,value: x.nombre});
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
        onCapture() {
           this.imageUrl = this.$refs.webcam.capture();  
           var blob =  this.dataURItoBlob(this.imageUrl, 'image/jpg'); 
           var file = new File([blob], 'Documento.jpg', {type: 'image/jpg', lastModified: Date.now()});
           this.imageFile = file
           this.imageName = this.imageFile.name;
          
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
        dataURItoBlob(dataURI, type) {
            // convertir base64 to raw binary data held in a string
            var byteString = atob(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            // write the ArrayBuffer to a blob, and you're done
            var bb = new Blob([ab], { type: type });
            return bb;
        },
        onStarted(stream) {
            console.log("On Started Event", stream);
        },
        onStopped(stream) {
            console.log("On Stopped Event", stream);
        },
        onStop() {
            this.$refs.webcam.stop();
        },
        onStart() {
            this.$refs.webcam.start();
        },
        onError(error) {
            console.log("On Error Event", error);
        },
        onCameras(cameras) {
            this.devices = cameras;
            console.log("On Cameras Event", cameras);
        },
        onClose () {
            this.dialog = false; 
        },    
        onCameraChange(deviceId) {
            this.deviceId = deviceId;
            this.camera = deviceId;
            console.log("On Camera Change Event", deviceId);
        }, 
        // STEP 2 INFORMACION COMPLEMENTARIA

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
        vizualisarImag(item){
            let me = this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var sexoArray=[];
            me.$PI.get('api/FPersona/Listarporid/'+ item.idPIPersonaVisita,configuracion).then(function(response){
               me.rutaconsulta =  response.data.ruta    
               me.tipo = response.data.tipoDocumento
               me.dialogimagen = true;            
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
        modalclose(){
            this.modalAdd=false;
            this.limpiar();
        },
        //************************************** */
        btn_geoloc2(){
            
            if(this.de_estado !='' && this.de_municipio != '' && this.de_localidad != '' && this.de_calle != ''){
                if(this.de_lat == '' && this.de_lng == ''){
                    this.geoloc=2;
                    this.modalGeolocalizacion = 1;
                    this.lugar = this.de_calle+" "+ this.de_localidad+" "+this.de_municipio+" "+this.de_estado
                    this.listener();
                    this.addMarkergeocoder();
                }else{
                    this.geoloc=2;
                    this.modalGeolocalizacion = 1;
                }    
            }else
                this.$notify("Los siguientes campos son requeridos para la geolocalización: estado, municipio, localidad, calle",'error')

                   
        }, 
        listener(){
            //input.focus();
            let me = this;  
            var map = new google.maps.Map(document.getElementById('mapa'));
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': this.de_calle+" "+ this.de_localidad+" "+this.de_municipio+" "+this.de_estado}, function(results, status) {
                if (status == 'OK') {
                    //console.log( results[0].geometry.location.lat())
                    me.center.lat =+ results[0].geometry.location.lat()
                    //console.log( results[0].geometry.location.lng())
                    me.center.lng =+ results[0].geometry.location.lng()

                } else {
                    alert('La dirección no fue encontrada' + status);
                }
            })
        },
        addMarkergeocoder() {
                    const marker = {
                        lat: this.center.lat,
                        lng: this.center.lng, 
                    };
                    this.markers =[]
                    this.places = []
                    this.markers.push({ position: marker });
                    this.places.push(this.currentPlace);
                    this.center = marker;
                    this.currentPlace = null;                 
        },
        updateCoordinates(location) {
            this.lataux = location.latLng.lat()
            this.lngaux = location.latLng.lng()
        },
        updatecenter(){
            this.center.lat = this.lataux;
            this.center.lng = this.lngaux;
        },
        btn_geoloc1(){
            this.geoloc=1;
            this.modalGeolocalizacion = 1;
        },
        
        setPlace(place) {
                this.markers= [],
                this.places= [],
                this.currentPlace = place;
        },
        addMarker() {
                if (this.currentPlace) {
                    const marker = {
                        lat: this.currentPlace.geometry.location.lat(),
                        lng: this.currentPlace.geometry.location.lng(), 

                    };
                    this.markers.push({ position: marker });
                    this.places.push(this.currentPlace);
                    this.center = marker;
                    this.currentPlace = null;
                    }
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
            if(this.geoloc==2){
                if(this.lataux != '' && this.lngaux != ''){
                    this.de_lat = this.lataux
                    this.de_lng = this.lngaux
                }else{
                    this.de_lat = this.markers[0].position.lat
                    this.de_lng = this.markers[0].position.lng
                }
                
                this.geoloc=0;
                this.modalGeolocalizacion=0;
            }

        },
         //************************************* */
        archivo(){
            

            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var nombreCarpeta;

                if (me.imageFile2){
                    console.log("Entre2")
                    let formData = new FormData();  
                    formData.append('file', me.imageFile2 ); 
                    nombreCarpeta = "C" + me.nuc.substr(1);
                    me.GUID = me.generateUUID();
                                            
                    me.$PI.post('api/FPersona/Post/'+nombreCarpeta+'/'+me.GUID,formData,{
                        headers: {
                        'Content-Type': 'multipart/form-data'
                            } 
                    },configuracion).then(function(response){
                    console.log('SUCCESS!!');
                    me.$PI.post('api/FPersona/Crear',{  

                        'PIPersonaVisitaId' : me.idvisita,
                        'tipoDocumento' : me.docidentificacion2,
                        'DescripcionDocumento': 'p',
                        'ruta':response.data.ruta,
                        'FechaRegistro' : me.generarfecha,
                        'Puesto':'p',
                        'uDistrito' : me.u_distrito,
                        'uSubproc' : me.u_dirSubPro,
                        'uAgencia' : me.u_agencia,
                        'uUsuario' : me.u_nombre,
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


                   
        },
        guardar(){
                   this.$validator.validate().then(result => {
                    if (result) { 
                        
                        let me=this;
                        let header={"Authorization" : "Bearer " + this.$store.state.token};
                        let configuracion= {headers : header};

                        if(this.telefono1 == undefined || this.telefono1 == '') this.telefono1 = 0
                        if(this.telefono2 == undefined || this.telefono2 == '') this.telefono2 = 2
                        if(this.edad == undefined || this.edad == '') this.edad = 99
                        if(this.de_cp == undefined || this.de_cp == '') this.de_cp = 0
                        if(this.de_noInt == undefined || this.de_noInt == '') this.de_noInt = 0

                        me.$PI.post('api/PersonaVisita/Crear',{  
                                    
                                    //***************************** PERSONA*/ 
                                    'Nombre': me.nombres, 
                                    'ApellidoP': me.apaterno,                       
                                    'ApellidoM': me.amaterno,
                                    'Edad' : me.edad,
                                    'Ocupacion' : me.ocupacion,
                                    'Telefono1' : me.telefono1,
                                    'Telefono2' : me.telefono2,
                                    'uDistrito': me.u_distrito,
                                    'uSubproc' : me.u_dirSubPro,
                                    'uAgencia' : me.u_agencia,
                                    'usuario' : me.u_nombre,
                                    'uPuesto' : me.u_puesto,
                                    'uModulo' : me.u_modulo
                                                                      
                                },configuracion).then(function(response){ 
                                    me.imageFile2 = me.imageFile
                                    me.docidentificacion2 = me.docidentificacion;
                                    me.idvisita = response.data.idpersonavisita;
                                    me.$notify('La información se guardo correctamente !!!','success') 
                                    me.$PI.post('api/Direccion/Crear',{

                                        'PIPersonaVisitaId': me.idvisita,
                                        'Calle': me.de_calle,
                                        'NoExterior': me.de_noInt,
                                        'NoInterior': me.de_noExt,
                                        'Ecalle1': me.de_entreCalle1,
                                        'Ecalle2': me.de_entreCalle2,
                                        'Referencia': me.de_referencia,
                                        'Pais': me.de_pais,
                                        'Estado': me.de_estado,
                                        'Municipio': me.de_municipio,
                                        'Localidad': me.de_localidad,
                                        'cp': me.de_cp,
                                        'Latitud': me.de_lat,
                                        'Longitud': me.de_lng,
                                        'uDistrito': me.u_distrito,
                                        'uSubproc' : me.u_dirSubPro,
                                        'uAgencia' : me.u_agencia,
                                        'usuario' : me.u_nombre,
                                        'uPuesto' : me.u_puesto,
                                        'uModulo' : me.u_modulo
                                                              

                                    
                                        },configuracion).then(function(){   
                                        me.$notify('La información se actualizo correctamente !!!','success') 
                                        //******************* Archivo   
                                        me.archivo();

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
                                    me.listar();
                                    me.close();  
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
        mostrarmapa(item){

            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$PI.get('api/Direccion/Listar/'+ item.idPIPersonaVisita,configuracion).then(function(response){  

                me.center2.lat = + response.data.latitud
                me.center2.lng = + response.data.longitud  
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

		 
        },
        
       
   }
</script>
<style>
.espaciado{
    padding: 30px !important; 
}
.centrado{
    align-content: center
}
</style>