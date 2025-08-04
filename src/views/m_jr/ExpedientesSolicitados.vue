<template>
  <v-layout align-start>
    <v-navigation-drawer v-model="drawer" app   v-if="logueado" class="primary"  >
      <div class="text-xl-center text-md-center text-xs-center my-4">
        <a href="/"><img src="@/assets/Logo.png" height="110px" alt=""></a> 
      </div>

      <v-list dense dark class="pt-0 primary" >
         <template>
          <v-list-tile  :to="{name:'justicia-restaurativa'}">
            <v-list-tile-action>
              <v-icon class="centenarioMenuIcon">home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title class="white--text">Inicio</v-list-tile-title>
          </v-list-tile>
        </template>   
         <template  v-if="esAdministrador || esDirector || esCoordinador || esJuridico || esRecepcion || esFacilitador || esFacilitadorMixto">
          <v-list-group>
            <v-list-tile slot="activator"> 
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Recepción de expedientes
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="esAdministrador || esDirector || esJuridico ||  esCoordinador || esRecepcion || esFacilitador  || esFacilitadorMixto" :to="{ name: 'jr-expedientessolicitados'== '#' ? '' :  'jr-expedientessolicitados'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">format_list_numbered</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Expedientes solicitados
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 
              <v-list-tile v-if="esAdministrador || esDirector || esJuridico || esCoordinador || esRecepcion|| esFacilitador  || esFacilitadorMixto" :to="{ name: 'jr-asignacionexpediente'== '#' ? '' :  'jr-asignacionexpediente'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">format_list_numbered</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                Asignación de expediente
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
           <!--  <v-list-tile v-if="esAdministrador || esDirector || esJuridico || esCoordinador" :to="{ name: 'reasignacionexpediente'== '#' ? '' :  'reasignacionexpediente'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">format_list_numbered</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Re-Asignación de expediente
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>   -->
          </v-list-group>
        </template>



         <template  v-if="esAdministrador || esDirector || esJuridico|| esCoordinador|| esRecepcion || esFacilitador|| esFacilitadorMixto || esUSAR">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Gestión de expedientes y derivaciones
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="esAdministrador || esDirector || esJuridico || esCoordinador|| esRecepcion|| esFacilitador || esFacilitadorMixto || esUSAR|| esRecepcion" :to="{ name: 'jr-derivaciones'== '#' ? '' :  'jr-derivaciones'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">repeat</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                  Derivaciones
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 


            <v-list-tile v-if="esAdministrador || esDirector  || esJuridico || esCoordinador|| esRecepcion || esFacilitador|| esFacilitadorMixto || esUSAR|| esRecepcion" :to="{ name: 'jr-consultarExpediente'== '#' ? '' :  'jr-consultarExpediente'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">search</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                  Consultar expedientes
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 

            <v-list-tile v-if="esAdministrador || esDirector || esJuridico ||  esCoordinador" :to="{ name: 'jr-rezago'== '#' ? '' :  'jr-rezago'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">timelapse</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                  Expedientes con rezago
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 



      

            
        
              


          

             
     
           </v-list-group>
        </template>
        <template  v-if="esAdministrador || esNotificador || esFacilitador || esFacilitadorMixto ">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Citatorios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="esAdministrador ||  esNotificador|| esFacilitador || esFacilitadorMixto" :to="{ name: 'jr-listacitatorios'== '#' ? '' :  'jr-listacitatorios'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">vertical_split</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                  Lista de citatorios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 
          </v-list-group>
        </template>

        <template v-if="esAdministrador || esDirector || esCoordinador || esJuridico">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Coordinador y/o Juridico
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile  v-if="esAdministrador || esDirector || esCoordinador || esJuridico " :to="{ name: 'jr-coordinadorJuridico'== '#' ? '' :  'jr-coordinadorJuridico'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">group</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Validación  de acuerdos reparatorios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
            <v-list-tile v-if="esAdministrador || esDirector || esFacilitador || esCoordinador" :to="{ name: 'jr-acuerdosporCoordinacion'== '#' ? '' :  'jr-acuerdosporCoordinacion'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">description</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Acuerdos por coordinación
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list-group>
        </template>
         <template v-if="esAdministrador || esDirector || esCoordinador || esJuridico || esUSAR">
          <v-list-group>
            <v-list-tile slot="activator"> 
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Expedientes aceptados
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'jr-expedientesaceptados'== '#' ? '' :  'jr-expedientesaceptados'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">folder_open</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Expedientes para contestar 
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
          </v-list-group>
        </template>
        <template v-if="esFacilitador || esNotificador || esFacilitadorMixto || esAdministrador">
          <v-list-group>
            <v-list-tile slot="activator"> 
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Mis expedientes
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'jr-misexpedientes'== '#' ? '' :  'jr-misexpedientes'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">folder_open</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Mi lista de expedientes asignados
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
          </v-list-group>
        </template>
        <template  v-if="esAdministrador || esDirector || esCoordinador || esJuridico || esFacilitador|| esFacilitadorMixto || esNotificador || esUSAR">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Seguimiento a expedientes
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador || esJuridico || esFacilitador || esFacilitadorMixto|| esNotificador || esUSAR" :to="{ name: 'jr-informacionexpediente'== '#' ? '' :  'jr-informacionexpediente'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">vertical_split</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                  Información del expediente
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 

            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador || esFacilitador || esFacilitadorMixto || esUSAR" :to="{ name: 'jr-sesiones'== '#' ? '' :  'jr-sesiones'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">speaker_notes</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Sesión
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 

            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador  || esFacilitador|| esFacilitadorMixto  || esUSAR" :to="{ name: 'jr-citatoriosrecordatorios'== '#' ? '' :  'jr-citatoriosrecordatorios'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">perm_contact_calendar</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                Citatorios, Recordatorios y Hoja de Registro
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 

            


           
          

        
              


            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador || esFacilitador || esFacilitadorMixto || esUSAR" :to="{ name: 'jr-acuerdoreparatorio'== '#' ? '' :  'jr-acuerdoreparatorio'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">description</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Acuerdo reparatorio
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 


             
            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador  || esFacilitador || esFacilitadorMixto || esUSAR" :to="{ name: 'jr-seguimientocumplimiento'== '#' ? '' :  'jr-seguimientocumplimiento'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">post_add</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                Seguimiento a cumplimiento
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>   
            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador || esFacilitador || esFacilitadorMixto || esUSAR" :to="{ name: 'jr-registroconclusion'== '#' ? '' :  'jr-registroconclusion'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">speaker_notes</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Registro de conclusión
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 
             <v-list-tile v-if="esAdministrador || esDirector || esCoordinador || esJuridico || esUSAR" :to="{ name: 'jr-informarAMPO'== '#' ? '' :  'jr-informarAMPO'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">speaker_notes</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Respuesta para AMPO
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 
            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador || esJuridico || esUSAR || esFacilitador || esFacilitadorMixto" :to="{ name: 'jr-registros'== '#' ? '' :  'jr-registros'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">description</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Registros
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 

          </v-list-group>
        </template> 
        <template v-if="esAdministrador || esDirector || esCoordinador  || esFacilitador || esFacilitadorMixto">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Agenda
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
           <v-list-tile v-if="esFacilitador || esFacilitadorMixto" :to="{ name: 'jr-agenda'== '#' ? '' :  'jr-agenda'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">event</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Mi agenda
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 
               <v-list-tile  v-if="esAdministrador || esDirector || esCoordinador" :to="{ name: 'jr-agendaglobal'== '#' ? '' :  'jr-agendaglobal'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">event</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Agenda global
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 

          </v-list-group>
        </template>
         <template v-if="esAdministrador || esDirector  || esUSAR ">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 USAR
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
             <v-list-tile :to="{ name: 'jr-agendaseguimientos'== '#' ? '' :  'jr-agendaseguimientos'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">event</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                 Agenda de seguimiento
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 

           <v-list-tile :to="{ name: 'jr-gestionseguimiento'== '#' ? '' :  'jr-gestionseguimiento'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">post_add</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="centenarioMenuModules">
                Gestión de seguimiento
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> 

          </v-list-group>
        </template>
     
         <template v-if="esAdministrador || esDirector || esUSAR ">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Estadísticas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="esAdministrador || esDirector || esUSAR " :to="{ name: 'jr-asistencia'== '#' ? '' :  'jr-asistencia'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">bar_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                   Asistencia de citatorios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
            <v-list-tile v-if="esAdministrador || esDirector || esUSAR " :to="{ name: 'jr-entregas'== '#' ? '' :  'jr-entregas'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">bar_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                   Entrega de citatorios.
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  

            <v-list-tile v-if="esAdministrador || esDirector || esUSAR  " :to="{ name: 'jr-einforme'== '#' ? '' :  'jr-einforme'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">bar_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                   Informe
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
            <v-list-tile v-if="esAdministrador || esDirector || esUSAR " :to="{ name: 'jr-informefacilitador'== '#' ? '' :  'jr-informefacilitador'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">timeline</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                   Informe por facilitador
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            
          

          </v-list-group>
        </template>

        <template v-if="esAdministrador || esDirector || esUSAR">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Monitoreo de AR a nivel estado
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador || esUSAR" :to="{ name: 'jr-monitoreoxdistrito'== '#' ? '' :  'jr-monitoreoxdistrito'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">group</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                  Monitoreo por distrito
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  

          </v-list-group>
        </template>

        <template v-if="esAdministrador || esDirector">
          <v-list-group>
            <v-list-tile slot="activator">   
              <v-list-tile-content >
                <v-list-tile-title class="centenarioMenuAreas">
                 Configuración
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="esAdministrador || esDirector || esCoordinador" :to="{ name: 'jr-facilitadoresnotificadores'== '#' ? '' :  'jr-facilitadoresnotificadores'}"  active-class="secondary">  
              <v-list-tile-action>
                 <v-icon class="centenarioMenuIcon">group</v-icon>
              </v-list-tile-action>
              <v-list-tile-content   >
                <v-list-tile-title class="centenarioMenuModules">
                  Facilitadores y notificadores
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  

          </v-list-group>
        </template>

        <v-list-tile 
          v-if="esAdministrador 
          || esDirector 
          || esJuridico 
          ||  esCoordinador 
          || esRecepcion 
          || esFacilitador  
          || esFacilitadorMixto" 
          :to="{ name: 'jr-historialactualizaciones'== '#' ? '' :  'jr-historialactualizaciones'}"  
          active-class="secondary"
        > 
          <v-list-tile-action>
            <v-icon class="centenarioMenuIcon">history</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="centenarioMenuModules">
              Historial de actualizaciónes
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        
      </v-list>

    </v-navigation-drawer>
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular" >Solicitudes de derivación.</v-toolbar-title>
        <v-divider class="mx-2" inset vertical />
        <v-spacer />
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line hide-details
        />
        <v-spacer />
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="derivaciones"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td>{{ props.item.autoridadqueDeriva }}</td>
          <td>{{ props.item.uqe_Agencia }}</td>
          <td>{{ props.item.uqe_Nombre }}</td>
          <td>{{ props.item.espontaneoNoEspontaneo }}</td>
          <td>{{ props.item.noDerivacion }}</td>
          <td>{{ formatearfechahora(props.item.fechaRegistroExpediente) }}</td>
          <td>{{ props.item.nuc }}</td>
          <td>{{ props.item.statusAcepRech }}</td>
          <td class="justify-center layout pt-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon class="mr-2 mt-1" v-on="on" color="default" @click="informacion(props.item)">
                  info
                </v-icon>
              </template>
              <span>Detalle de la derivación</span>
            </v-tooltip>
          </td>
        </template>
        <template slot="no-data">
        <v-btn color="primary"  @click="listarDerivaciones" >Cargar</v-btn>
        </template>
      </v-data-table>
    </v-flex>
    <v-dialog v-model="modal_Informacion" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Información detallada.</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <!--  <v-btn color=success text @click.native="evaluarStatus()">{{ btnTitle }}</v-btn>  -->
            <v-btn icon @click.native="limpiarInformacion()">
              <v-icon @click.native="close()" >close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      
<!-- ------------------Codigo de opciones de rechazar, aceptar, menoresEdad, delitos, personas y ver reseña--------------------------------------- -->
<v-flex v-if="showpage">
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-regular"
          >Información general de la derivación.</v-toolbar-title
        >
        
        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              class="mx-2 py-2"
              slot="activator"
              v-on="on"
              @click="ModalAceptado()"
              fab
              dark
              small
              color="success"
            >
              <v-icon class="mt-1" dark>check</v-icon>
            </v-btn>
          </template>
          <span>Aceptar solicitud</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              class="mx-2 py-2"
              slot="activator"
              v-on="on"
              @click="ModalRechazado()"
              fab
              dark
              small
              color="primary"
            >
              <v-icon class="mt-1" dark>close</v-icon>
            </v-btn>
          </template>
          <span>Rechazar solicitud</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              class="mx-2 py-2"
              slot="activator"
              v-on="on"
              @click="ModalResena()"
              fab
              dark
              small
              color="grey"
            >
              <v-icon class="mt-1" dark>menu_book</v-icon>
            </v-btn>
          </template>
          <span>Reseña breve</span>
        </v-tooltip>
         <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              class="mx-2 py-2"
              slot="activator"
              v-on="on"
              @click="SolReq()"
              fab
              dark
              small
              color="grey"
            >
              <v-icon class="mt-1" dark>person</v-icon>
            </v-btn>
          </template>
          <span>Solicitantes/Requeridos</span>
        </v-tooltip>
        
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              class="mx-2 py-2"
              slot="activator"
              v-on="on"
              @click="listarDelitos()"
              fab
              dark
              small
              color="primary"
            >
              <v-icon class="mt-1" dark>report</v-icon>
            </v-btn>
          </template>
          <span>Delito(s)</span>
        </v-tooltip> 
        
        <v-dialog v-model="DialogoProcedente" max-width="800px">
          <v-card>
            <v-toolbar card dark color="grey lighten-4 primary--text">
              <v-avatar size="30">
                <v-icon class="grey lighten-2">settings</v-icon>
              </v-avatar>
              <v-toolbar-title class="subheading"
                >Derivación Procedente</v-toolbar-title
              >
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                <v-container grid-list-md text-xs-center>
                  <v-layout row wrap>
                    
            <v-container fluid class="justify-center m-3">
                <div class="contenedor_opciones" >
                    <v-flex class="espaciado" xs12 sm12 md6 lg6 > 
                        <v-radio-group v-model="reparatorio" v-on:change="updateExp()" denso :mandatory="false">
                            <v-radio label="Acuerdo Reparatorio" color="success" value='1' /> 
                            <v-radio label="Plan de Reparación" color="success" value='2' />
                        </v-radio-group>
                        <v-text-field
                            name="nombre"
                            label="No Expediente (solo número)"
                            v-model="uqe_Expediente"
                            prepend-icon = "tag"
                            :rules="rules"
                            maxlength="4"
                            v-on:change="updateExp()"
                            class="mr-3"
                        />
                    </v-flex>
                    <v-flex class="espaciado" xs12 sm12 md6 lg6 > 
                        <div class="mb-3"  style="height: 70px;">
                            <v-switch 
                                v-model="adolecente" 
                                v-show="!mujeres" 
                                v-on:change="updateExp()" 
                                label="Adolecentes" 
                                color="success"  
                                hide-details>
                            </v-switch>
                            <v-switch 
                                v-model="mujeres" 
                                v-show="!adolecente" 
                                v-on:change="updateExp()" 
                                label="Centro de Justicia para Mujeres" 
                                color="success"  
                                hide-details>
                            </v-switch> 
                        </div>
                        <v-text-field
                         name="anioExpediente"
                         label="Año expediente(solo número)"
                         v-model="uqe_anioExpediente"
                         maxlength="4"
                         :rules="rulesA"
                         prepend-icon="event_available"
                         v-on:change="updateExp()"
                        />              
                    </v-flex> 
                </div>
                <div> 
                    <v-flex class="ml-4 mr-4" md12 lg12 > 
                    <v-text-field
                        name="NoExpediente"
                        label="No Expediente"
                        v-model="NoExpedienteCompleto"
                        readonly
                        prepend-icon="folder"
                    />
                    </v-flex>
                </div> 
            </v-container>
          
                  </v-layout>
                </v-container>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="DialogoProcedente = false">Cancelar</v-btn>
                  <v-btn @click="aceptarExpediente()" v-if="uqe_Expediente && uqe_anioExpediente && isValid" class="success">Guardar</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- Dialog para el rechazo de carpetas, ahora se registra el registro -->
        <v-dialog v-model="DialogoNoProcedente" max-width="1500px">
          <v-card>
            <v-toolbar card dark color="grey lighten-4 primary--text">
              <v-avatar size="30">
                <v-icon class="grey lighten-2">settings</v-icon>
              </v-avatar>
              <v-toolbar-title class="subheading"
                >Derivación no procedente</v-toolbar-title
              >
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                <v-container grid-list-md>
                  <v-layout row wrap>
                    <v-flex class="espaciado" xs12 sm12 md6 lg6>
                        <v-text-field
                        name="tipo de registro"
                        v-model="tipo"
                        v-validate="'required'"
                        label="Tipo de registro:"
                        :error-messages="errors.collect('tipo de registro')"
                        />
                    </v-flex>

                    <v-flex class="espaciado" xs12 sm12 md6 lg6>
                        <v-text-field
                        name="detalles"
                        v-model="quienPor"
                        label="Detalles simples:"
                        />
                    </v-flex>
                    
                    <v-flex class="espaciado" xs12 sm12 md12 lg612>
                        <vue-editor
                        name="texto registro"
                        v-validate="'required'"
                        :editorToolbar="customToolbar"
                        v-model="textolibre"
                        :error-messages="errors.collect('texto registro')"
                        />

                        <v-switch v-model="relacion"  :label="'¿Deseas colocar una sintesis del rechazo?'"  color="success"  hide-details></v-switch>

                    </v-flex>
                  </v-layout>
                      
                  <v-card-text> 
                    <v-form data-vv-scope="form1" v-if="relacion == true"> 
                      <h3>Motivo de rechazo:</h3>
                        <vue-editor  
                          name="motivo" 
                          v-model="motivo" 
                          outline  height=280px;
                          style="max-height: 280px; overflow-y: scroll" 
                          :editorToolbar="customToolbar"  >
                        </vue-editor>
                    </v-form>
                  </v-card-text>
                </v-container>   

                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="CloseProcedente()">Cancelar</v-btn>
                  <v-btn @click="esperarQR()" class="success">Vista previa</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-dialog v-model="ResenaBreve" max-width="1500px">
          <v-card>
            <v-toolbar card dark color="grey lighten-4 primary--text">
              <v-avatar size="30">
                <v-icon class="grey lighten-2">settings</v-icon>
              </v-avatar>
              <v-toolbar-title class="subheading">Reseña Breve</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                <p v-html="reseñaBreve"></p> 
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="ResenaBreve = false">Cerrar</v-btn>
                  <v-btn @click="imprimirEntrevistapdf()" class="warning">Entrevista Completa</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

      </v-toolbar>
      </v-flex>

       <v-dialog v-model="ModalSolReque" max-width="700px">
          <v-card>
            <v-toolbar card dark color="grey lighten-4 primary--text">
              <v-avatar size="30">
                <v-icon class="grey lighten-2">person</v-icon>
              </v-avatar>
              <v-toolbar-title class="subheading">Información detallada Solicitante/Requerido</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                 <v-container grid-list-md>
                    <v-card-text>
                      <v-form data-vv-scope="form1">                         
                <v-flex xs12 sm12 md12>
                  <v-autocomplete
                    name="SolReque"
                    :items="infoSolReq"
                    v-model="SolReque"
                    label="Nombre Solicitante/Requerido"
                    v-validate="'required'"
                    v-on:change="pdfSolReq(SolReque)"
                    :error-messages="errors.collect('SolReque')"
                  />
                  </v-flex>
                      </v-form>
                    </v-card-text>
                  </v-container>   
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="closeSolReq()">Cerrar</v-btn>
                  <v-btn @click="mostrarpdf_Persona()" class="success">Imprimir</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog v-model="modal_Persona" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    
                    <v-btn icon   @click="modal_Persona = false">
                    <v-icon>close</v-icon>
                    </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                    <v-card-text>
                        <iframe id="iframepdf2" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no"  ></iframe>
                    </v-card-text>
                </v-card>
        </v-dialog> 
        
        <v-dialog v-model="ModalDelitos" max-width="700px">
          <v-card>
            <v-toolbar card dark color="grey lighten-4 primary--text">
              <v-avatar size="30">
                <v-icon class="grey lighten-2">report</v-icon>
              </v-avatar>
              <v-toolbar-title class="subheading"
                >Información detallada del delito</v-toolbar-title
              >
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form ref="form">
                 <v-container grid-list-md>
                    <v-card-text>
                      <v-form data-vv-scope="form1"> 
                        
                <v-flex xs12 sm12 md12>
                  <v-autocomplete
                    name="Delito"
                    :items="v_delitos"
                    v-model="Delitos"
                    label="Nombre Delito"
                    v-validate="'required'"
                    v-on:change="pdfinfoDelito(Delitos)"
                    :error-messages="errors.collect('Delito')"
                  />
                  </v-flex>
                      </v-form>
                    </v-card-text>
                  </v-container>   
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="closeDelito()">Cerrar</v-btn>
                  <v-btn @click="mostrarpdf_Delito()" class="success">Imprimir</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-dialog v-model="modal_Delito" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark color="primary">
                
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    
                    <v-btn icon   @click="modal_Delito = false">
                    <v-icon>close</v-icon>
                    </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                    <v-card-text>
                        <iframe id="iframepdf3" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no"  ></iframe>
                    </v-card-text>
                </v-card>
        </v-dialog> 

        <v-dialog v-model="modal_Bitacora" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="primary">
                <v-toolbar-title>Documento.</v-toolbar-title>
                <v-spacer />
                <v-toolbar-items>
                <v-btn color="success" text @click.native="rechazarSolicitud">
                    Guardar e imprimir
                </v-btn>
                <v-btn icon @click="modal_Bitacora = false">
                    <v-icon>close</v-icon>
                </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
                <iframe id="iframepdf1" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no"/>
            </v-card-text>
        </v-card>
    </v-dialog>

        
<!-- --------------------------------------------------------------------- -->
<v-divider />
<v-flex xs12 md12 lg12 pa-4>
          <v-layout>
            <v-flex  xs6 md6 lg6>
              <table>
                <tr>
                  <td>No. de derivacion:</td>
                  <td><b> {{ noDerivacion }}</b></td>
                </tr>
                <tr>
                  <td>Fecha de derivación:</td>
                  <td><b>{{ formatearfechahora(fechaDerivacion) }}</b></td>
                </tr>
                <tr>
                  <td>Fecha de registro:</td>
                  <td><b>{{ fechaExpediente }}</b></td>
                </tr>
                <tr>
                  <td>NUC:</td>
                  <td><b>{{ nuc }}</b></td>
                </tr>
                <tr>
                  <td>Fecha y hora suceso:</td>
                  <td><b>{{ formatearfechahora(fechaHoraSuceso) }}</b></td>
                </tr>
                <tr>
                  <td>Tipo:</td>
                  <td><b>{{ EspontaneoNoEspontaneo }}</b></td>
                </tr>
                <tr>
                  <td>Es:</td>
                  <td><b>{{ primeraVezSubsecuente }}</b></td>
                </tr>
                <tr>
                  <td>Personas involucradas:</td>
                  <td><b>{{ NoSolicitantes }}</b></td>
                </tr>
                <br>
              </table>
            </v-flex>
            <v-flex  xs6 md6 lg6>
              <table>
                <tr>
                  <td>Agencia:</td>
                  <td><b>{{ uqe_Agencia }}</b></td>
                </tr>
                <tr>
                  <td>Modulo:</td>
                  <td><b>{{ uqe_Modulo }}</b></td>
                </tr>
                <tr>
                  <td>AMP:</td>
                  <td><b>{{ uqe_Nombre }}</b></td>
                </tr>
                <tr>
                  <td>Puesto:</td>
                  <td><b>{{ uqe_Puesto }}</b></td>
                </tr>
              </table>
              <!--  <Delitos refs='listaDelitos' v-if="envioId" /> --> 
            </v-flex>
          </v-layout>
          <v-divider />
          <v-data-table
            :headers="headersSR"
            :items="personaSR"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
          >
        <template slot="items" class="white" slot-scope="props">
          <td class="text-xs-center"> 
            <template>
              {{ props.index + 1 }}
            </template></td>
          <td class="text-xs-center"> 
            <template>
              {{ props.item.nombreS }}
            </template></td>
          <td class="text-xs-center">
            <template>
              {{ props.item.nombreR }}
            </template></td>
          <td class="text-xs-center">
              <template>
              {{ props.item.nombreD }}
            </template></td>
            
            
        </template>
      </v-data-table>  
        </v-flex>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import axios from 'axios'
  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas'
  import VeeValidate from 'vee-validate'
  import { error } from 'util'
  import moment from 'moment'
  import 'moment/locale/es'
  import alertify from 'alertifyjs'
  import { VueEditor } from "vue2-editor"
  //** COMPONENTES */
  import n401 from '../../components/m_jr/401'
  import n403 from '../../components/m_jr/403'
  import SolicitantesRequeridos from '../../components/m_jr/SolicitantesRequeridos'
  import Delitos from '../../components/m_jr/Delitos'
  import { generarQRCodeBase64 } from './crearQR'; 

  export default {
    components: {
      SolicitantesRequeridos,
      Delitos,
      n401,
      n403,
      "vue2-editor": VueEditor,
    },
    data: function () {
      return {
        e401: false,
        e403: false,
        showpage: true,
       
        componentKey: 0,
        //************************************ */
        type: 'month',
        start: '',
        typeOptions: [
        { text: 'Dia', value: 'day' },
        { text: 'Semana', value: 'week' },
        { text: 'Mes', value: 'month' },
        ],
        events: [],
        listaC: [],
        dialogform: false,
        DialogoProcedente: false,
        DialogoNoProcedente: false,
        ResenaBreve: false,
        ModalSolReque: false,
        ModalDelitos: false,
        modal_Delito: false,
        //************************************* */
        customToolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          ['align',{ 'align': 'center'}, { 'align': 'right' }, { 'align': 'justify' }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'color': [] }, { 'background': [] }],
        ],
        //**************************************
        // VARIABLES DE LA TABLA DE EXPEDIENTE */
        expedienteId: '',
        hechoid: '',
        noDerivacion: 1,
        fechaExpediente: '',
        fechaDerivacion: '',
        noExpediente: '',
        StatusGeneral: '',
        informacionStatus: '',
        nuc: '',
        fechaHoraSuceso: '',
        reseñaBreve: '',
        narrativa: '',
        v_direccionHecho: '',
        u_nombrejr: '',
        //**************************************
        // VARIABLES DE LA TABLA DE ENVIO */
        envioId: '',
        //facilitadormoduloServicioId:'',
        //notificadormoduloServicioId:'',
        facilitadornotificadorId: '',
        autoridadqueDeriva: '',
        uqe_Distrito: '',
        uqe_DirSubProc: '',
        uqe_Agencia: '',
        uqe_Modulo: '',
        uqe_Nombre: '',
        uqe_Puesto: '',
        uqe_Expediente: '',
        uqe_anioExpediente: moment(new Date).format('YYYY'),
        StatusGeneralEnvio: '',
        EspontaneoNoEspontaneo: '',
        primeraVezSubsecuente: '',
        ContadorNODerivacion: '',
        FechaRegistro: '',
        NoSolicitantes: '',
        nombreS:'',
        nombreR: '',
        nombreD:'',
        SolReque: '',
        Delitos: '',
        PersonasSolReq: '',
        //*************** */
        derivaciones: [],
        personaSR: [],
        infoSolReq: [],
        ArraySolReql: [],
        headers: [
          { text: 'Autoridad quien deriva', value: 'autoridadqueDeriva' },
          { text: 'Agencia', value: 'uqe_Agencia' },
          { text: 'AMPO', value: 'uqe_Nombre' },
          { text: 'Con persona / Sin persona', value: 'espontaneoNoEspontaneo' },
          { text: 'No Derivación', value: 'noDerivacion' },
          { text: 'Fecha', value: 'fechaRegistroExpediente' },
          { text: 'NUC', value: 'nuc' },
          { text: 'Status', value: 'statusAcepRech' },
          { text: 'Opciones', value: 'opciones', sortable: false },
        ],
         headersSR: [
          { text: 'No.', value: 'index', align: 'center'},
          { text: 'Solicitante(s)', value: 'nombreS', align: 'center'},
          { text: 'Requerido(s)', value: 'nombreR', align: 'center'},
          { text: 'Delito(s)', value: 'nombreD', align: 'center'},
        ], 
         headersCitatorios: [
          { text: 'No Expediente', value: 'noExpediente' },
          { text: 'Fecha y hora cita', value: 'fechaHoraCita' },
          { text: 'Solicitado por:', value: 'solicitadoPor'},
          { text: 'Dirigido a:', value: 'dirigidoa_Nombre'},
          { text: 'Tel(s):', value: 'dirigidoa_Telefono'},
          { text: 'Sesion:', value: 'noSesion'},
          { text: 'N° Cita:', value: 'noCitatorio'},
          { text: 'Opciones', value: 'opciones', sortable: false },
        ],
        headersM: [
          { text: 'No.', value: 'index', align: 'center'},
          { text: 'Nombre', value: 'NombreCompleto', align: 'center'},
          { text: 'Tipo', value: 'Tipo', align: 'center'},
          { text: 'Opciones', value: 'opciones', align: 'center'},
        ], 
        search: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        pagination: {
          rowsPerPage: 50
        },
        editedIndex: -1,
        //*************** */
        //*MODALES
        modal_Informacion: false,
        modalCitatorios: false,
        modal_citatoriorecordatorio: false,
        modalProceso: false,
        modal_Persona: false,
        ModalDelitos: false,
        ModalMenores: false,
        modalresponsable: false,
        //*************** */
        //VARIABLES GENERALES
        statusSolicitud: 'No procedente',
        motivo: 'Rechazado descrito en ',
        idDistritoOrigen: '',
        //*************** */
        //VARIABLES PARA EL REPORTE
        logo1: '',
        logo2: '',
        diragencia: '',
        telagencia: '',
       
        //************************************************ */
        //************************************************ */
        //************************************************ */
        asignacion: 'aleatoria',
        v_tipocitatorio: '',
        v_tiposcitatorios:['Citatorio para que le de continuidad el Solicitante',  '1ra cita Requerido'],
        v_solicitantes: [],
        v_nombreSolicitantes: '',
        v_telefonosSolicitantes: '',
        v_requeridos: [],
        v_nombreRequeridos: '',
        v_menu1: false,
        v_fechacita: '',
        v_fechac: '',
        v_menu2: false,
        v_horacita: '',
        v_horac: '',
        v_lugarcita: 'SALA DE MEDIACIÓN  NÚMERO I (Agregar dirección de la sede correspondiente)',
        continuidad: '',
        citatorio1v1: '',
        citatorio1v2: '',
        citatorio2: '',
        citatorio3: '',
        //**************************************
        //VARIABLES REPORTE DE CITATORIO Y RECORDATORIO
        logo1: '',
        logo2: '',
        direccionAgencia: '',
        telefonosAgencia: '',
        titulo: '',
        nombre: '',
        correo: '',
        telefono: '',
        direccionS: '',
        direccionR: '',
        referencia: '',
        uf_Distrito: '',
        uf_DirSubProc: '',
        uf_Agencia: '',
        uf_Nombre: '',
        uf_Puesto: '',
        uf_Modulo: '',
        un_modulo:'',
        un_nombre: '',
        u_nombre: '',
        un_puesto:'',
        fechaHoraCita: '',
        duracion: '',
        duracions: [
            { text: '120 min', value: '120' },
            { text: '105 min', value: '105' },
            { text: '90 min', value: '90' },
            { text: '75 min', value: '75' },
            { text: '60 min', value: '60' },
            { text: '45 min', value: '45' },
            { text: '30 min', value: '30' },
            { text: '15 min', value: '15' },
        ],
        //************************************************ */
        v_facilitador: '',
        v_facilitadores: [],
        v_notificador: '',
        v_facilitadorFiltro: '',
        v_notificadores: [],
        v_delito: '',
        v_delitos: [],
        //************************************************ */
        //************************************************ */
        modal_Registro: false,
        //************************************************ */
        asignaciones: [],
        citatorioslist: [],
        usuarioActual: '',
        //*********************************************** */
        texto: '',
        comilla: '"',
        horas: '',
        texto2: '',
        tipo2: '',
        texto3: '',
        manifesto: '',
        hechos: '',
        representantesf: '',
        personaf: '',
        inicialesf: '',
        acvictima: '',
        acnombre: '',
        psimenor: '',
        puestopsi: '',
        numerooficio: '',
        clasificacionPersona: '',
        nombre: '',
        alias: '',
        tipopersona: '',
        curp: '',
        docIdentificacion: '',
        nacionalidad: '',
        tel: '',
        email: '',
        genero: '',
        sexo: '',
        fechaNacimiento: '',
        medionotificacion: '',
        ocupacion: '',
        nivelestudio: '',
        religion: '',
        lengua: '',
        estadocivil: '',
        tipodiscapacidad: '',
        direccionpersonal: '',
        edad: '',
        
        //*********************************************** */
        direccionAgenciaqe: '',
        telefonosAgenciaqe: '',
        citatoriosrecordatorios: [],
        historialExpediente: [],
        personasM: '',
        botonMenores: false,
         //**************************************
        //VARIABLES REPORTE GENERAL DE PERSONAS SOLICITANTES/REQUERIDOS
        nomSolReq: '',
        alias: '',
        clasificacionP: '',
        tpersona: '',
        curpsr: '',
        docidentificacion: '',
        nacionalidadsr: '',
        telefonosr: '',
        correosr: '',
        generosr: '',
        sexosr: '',
        edadsr: '',
        medionotificacionsr: '',
        ocupacionsr: '',
        estudiosr: '',
        religionsr: '',
        idiomasr: '',
        estadocivilsr: '',
        discapacidadsr: '',
        direccionsr: '',
        referenciasr: '',
        tipoSolicitante: '',
        //VARIABLES REPORTE GENERAL DE DELITOS POR CONJUNTOS
        delitoC: '',
        delitoEspecifico: '',
        altoImpacto: '',
        hipotesis: '',
        tipoFuero: '',
        tipoDeclaracion: '',
        resultadoC: '',
        graveN: '',
        intencionD: '',
        violencioSN: '',
        equiparado: '',
        tipoD: '',
        ClasificacionD: '',
        armaFuego: '',
        armaBlanca: '',
        cuerpoD: '',
        elementoD: '',
        tipoRobado: '',
        montoRobado: '',
        concurso: '',
        // VARIABLES PARA MODAL DE RESPONSABLE DEL MENOR
        menores:[],
        IdMenor: '',
        rnombre:'',
        rnacionalidad:'',
        rcurp:'',
        redad:'',
        rfechanaciomiento:'',
        ridresponsable:'',
        alerta: false,
        mostrarJrResponsable: false,
        validaDatos: '',
        noHayR: '',
      //********************************************** */
        relacion:false,
        tipo:'',
        quienPor:'',
        textolibre:'',
        modal_Bitacora:false,
        texto:'',
        personasC:[],
        delitosC:[],
        texto: 'Vista Previa',
        qrCode: '',
        docRemision: 'Remisión',
        vistaPreviaTF: true,
        reparatorio: '1',
        adolecente: false,
        mujeres: false,
        NoExpedienteCompleto: 'CJR/',
        rules: [
         value => !!value || 'Campo requerido.',
         value => /^[0-9]+$/.test(value) || 'Sólo se permiten números',
         value => parseInt(value) > 0 || 'Debe ser un número mayor a 0',
        ],
        rulesA: [
         value => !!value || 'Campo requerido.',
         value => {
            const year = parseInt(value, 10);
            const currentYear = new Date().getFullYear();
            return (year >= 2014 && year <= currentYear) || `El año debe estar entre 2014 y ${currentYear}`;
            }
        ],
      };
    },
    mounted(){
          if (!localStorage.getItem('pageReloaded')) {
            localStorage.setItem('pageReloaded', 'true');
            window.location.reload();
          } else {
            localStorage.removeItem('pageReloaded');
          }
        },
    created () {
      const token = this.$store.state.token || localStorage.getItem("token");
          if(token)
          { 
            this.$store.dispatch("guardarToken", token)
            this.$store.dispatch("setLogin", true, token)
          }
          else 
          { 
            this.$router.push({ name: 'login' });
          }
      let me = this
      me.u_iddistrito = me.$store.state.usuario.iddistrito
      me.u_distrito = me.$store.state.usuario.distrito
      me.u_dirSubPro = me.$store.state.usuario.dirSubProc
      me.u_idagencia = me.$store.state.usuario.idagencia
      me.u_agencia = me.$store.state.usuario.agencia
      me.u_idmoduloservicio = me.$store.state.usuario.idmoduloservicio
      me.u_modulo = me.$store.state.usuario.modulo
      me.u_idusuario = me.$store.state.usuario.idusuario
      me.usuarioActual = me.$store.state.usuario.usuario
      me.u_subproc = me.$store.state.usuario.subProc;
      me.u_clave = me.$store.state.usuario.clave
      me.u_puesto=me.$store.state.usuario.puesto;
        me.u_rol = me.$store.state.usuario.rol
        me.u_nombre=me.$store.state.usuario.usuario;  
      me.u_email = me.$store.state.usuario.email
      //*********************************************** */
      var currentDate = new Date()
      this.start = moment(new Date).format('YYYY-MM-DD')
      me.listarDerivaciones()
      me.listarSede()
      me.informacionagencia()
      me.listarLogo()

      // INTERCEPTOR MODULO DE JUSTICIA RESTAURATIVA
      axios.interceptors.request.use((config) => {
        me.$store.commit('LOADER', true)
        return config
      }, (error) => {
        me.$store.commit('LOADER', false)
        return Promise.reject( error)
      })
        axios.interceptors.response.use((response) => {
        me.$store.commit('LOADER',false);
        return response
      },  (error) => {
        me.$store.commit('LOADER',false);
        return Promise.reject(error);
      });



    },
    computed: {
        // convert the list of events into a map of lists keyed by date
        eventsMap () {
            const map = {}
            this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
            return map
        },
        btnTitle () {
            return this.statusSolicitud === "Procedente" ? 'Aceptar solicitud' : 'Rechazar solicitud'
        },
        isValid() {
            const noExp = this.rules.every((rule) => rule(this.uqe_Expediente) === true);
            const year = this.rulesA.every((ruleA) => ruleA(this.uqe_anioExpediente) === true);
            return noExp && year;
        },
        logueado(){
      return this.$store.state.usuario;
    },
    esAdministrador(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Administrador';
    },
    esDirector(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Director';
    },
    esCoordinador(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Coordinador';
    },
    esUSAR(){
      return this.$store.state.usuario && this.$store.state.usuario.rol =='USAR';
    },
    esJuridico(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Jurídico';
    },
    esRecepcion(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Recepción';
    }, 
     esFacilitador(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Facilitador';
    },
     esFacilitadorMixto(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Facilitador-Mixto';
    },
     esNotificador(){ 
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Notificador';
    },
    usuario(){
      return this.$store.state.usuario.usuario;
    },
    drawer(){
      return this.$store.state.drawer
    },
    },
    watch: {
        qrCode(val) {
            let me = this
            if (val != '') {
                if (me.docRemision == 'Detalles del delito') {
                    var dd = me.crearPdf_Delito()
                    var pdfMake = require('pdfmake/build/pdfmake.js')
                    var htmlToPdfmake = require("html-to-pdfmake")
                    if (pdfMake.vfs == undefined){
                        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                        pdfMake.vfs = pdfFonts.vfs
                    }
                    var doc = pdfMake.createPdf(dd)
                    var f = document.getElementById('iframepdf3');
                    var callback = function(url) { f.setAttribute('src',url); }
                    doc.getDataUrl(callback, doc)
                    me.modal_Delito = true
                    me.ModalDelitos = false
                }

                if (me.docRemision == 'Detalles de solicitante/requerido') {
                    var dd = me.crearPdf_Persona();
                    var pdfMake = require('pdfmake/build/pdfmake.js')
                    var htmlToPdfmake = require("html-to-pdfmake");

                    if (pdfMake.vfs == undefined){
                        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                        pdfMake.vfs = pdfFonts.vfs;                        
                    }

                    var doc = pdfMake.createPdf(dd);
                    var f = document.getElementById('iframepdf2'); 
                    var callback = function(url) { f.setAttribute('src',url); }
                    doc.getDataUrl(callback, doc);
                    me.modal_Persona = true;  
                  me.ModalSolReque = false             
                }

                if (me.docRemision == 'Reimpresión de entrevista completa') {
                    var dd = me.downloadPdf(me.uqe_Nombre,me.uqe_Puesto,me.uqe_Agencia);
                    var pdfMake = require('pdfmake/build/pdfmake.js')
                    var htmlToPdfmake = require("html-to-pdfmake");

                    if (pdfMake.vfs == undefined){
                        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                        pdfMake.vfs = pdfFonts.vfs;
                    }
                    me.ResenaBreve = false
                    var doc = pdfMake.createPdf(dd).print();
                }

                if (me.docRemision == 'Registro de derivación no procedente') {
                    me.mostrarpdf_Bitacora()
                }
           }
        }
    },
    methods:{
        listarSede()
        {
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

            this.$conf.get('api/Distritoes/ListarSede/' +  me.u_iddistrito, configuracion).then(function(response){
               me.u_nombrejr = response.data.sede;

            }).catch(function(error){
                if (error.response.status==401){
                    me.e401 = true,
                    me.showpage= false
                } else if (error.response.status==403){
                    me.e403= true
                    me.showpage= false
                } else if (error.response.status==404){
                    me.$notify("El recurso no ha sido encontrado", 'error')
                }else{
                    me.$notify(error.message,'error')
                }
            });
        },
        ModalAceptado(){
          let me = this;
          me.DialogoProcedente = true;
          me.limpiarDeriPro();
        },
        ModalRechazado(){
          let me = this;
          me.DialogoNoProcedente = true;
        },
        ModalResena(){
          let me = this;
          me.ResenaBreve = true;
        },
        forceRerender() {
            this.componentKey += 1
        },
        SolReq(){
            let me = this;
            me.ModalSolReque = true;
            me.InfoSolReq();
          },
          listarDelitos(){
              let me = this;
            me.Delitos = ''  
            me.ModalDelitos = true;
            me.listardelitos();
          },
        listarDerivaciones(){

            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

            me.$justiciarestaurativa.get('api/Expedientes/ListarStatus/' +  me.u_iddistrito, configuracion).then(function(response){
               me.derivaciones=response.data;
               
            }).catch(function(error){
                if (error.response.status==401){
                    me.e401 = true,
                    me.showpage= false
                } else if (error.response.status==403){
                    me.e403= true
                    me.showpage= false
                } else if (error.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                    me.$notify(error.message,'error')
                }
            });
        },

         listarConjuntosPSR(){

            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/ListarSolicitantesRequeridosC/' +  me.envioId, configuracion).then(function(response){
               
                 if (response.data.length > 0 && response.data[0].validacion === "verdadero")
                {
                  me.personaSR=response.data;
                }
                else
                { 
                  me.personaSR.push(response.data);
                  me.convertirNoConjuntos();
                }
              
            }).catch(function(error){
                if (error.response.status==401){
                    me.e401 = true,
                    me.showpage= false
                } else if (error.response.status==403){
                    me.e403= true
                    me.showpage= false
                } else if (error.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                    me.$notify(error.message,'error')
                }
            });
          },
          convertirNoConjuntos()
          {
              //Primera parte para la conversion de conjuntos

              //En consideracion hay 3 trablas que son necesarias para la conversion a conjunto, empezando por JR_CONJUNTODERIVACIONES, JR_SESIONES_CONJUNTOS
              //si ya cuenta con sesiones, JR_ACUERDOS_CONJUNTOS si ya cuenta con acuerdos

              //Empezando de lo mas avanzado, buscamos primero el acuerdo

              let me = this;
              let header={"Authorization" : "Bearer " + this.$store.state.token};
              let configuracion= {headers : header};

              me.$justiciarestaurativa.get('api/AcuerdoReparatorios/ListaAR/' + me.envioId, configuracion).then(function(response) 
              {

                  //En caso de validar que no existe un acuerdo, se guarda el valor positivo para no hacer la insercion en la tabla JR_ACUERDOS_CONJUNTOS
                  if (response.data.noHayAR == 1) 
                  {      
                      //Guarda que no hay acuerdo, para que no inicie el proceso de insersion
                      me.NoHayAR = response.data.noHayAR;
                  } 
                  else 
                  {
                      //Para los no conjuntos solo puede haber un acuerdo reparatorio, por eso se guarda aqui
                      me.idAcuerdoReparatorio = response.data.idAcuerdoReparatorio;

                  }
                  //La siguiente es la existencia de sesiones
                  me.$justiciarestaurativa.get('api/Sesions/ListarPorEnvio/' + me.envioId, configuracion).then(function(response) 
                  {
                      //Teniendolos en u arreglo posteriormente hago la insersion
                      me.sesiones = response.data;

                      //Siguiente punto es traer lña informacion personal de los involuicrados que por ser no conjuntos no se repiten
                      me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/ListarTodos/' + me.envioId, configuracion).then(function(response) 
                      {
                          me.personasC = response.data;

                          if(response.data && response.data.length > 0)
                          {
                            me.$justiciarestaurativa.get('api/Delitoes/ListarDelitos/' + me.envioId, configuracion).then(function(response) 
                            {

                                me.delitosC = response.data;
                                //Para este punto quiere decir que las apis de abtraer informacion funcionaron correctamente, activo el boton para poder usar asi como el modal
                                me.convertirAConjunto();

                            }).catch(function(error) {
                                if (error.response.status == 400) {
                                    me.$notify("No es un usuario válido", 'error')
                                } else if (error.response.status == 401) {
                                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                    me.e401 = true,
                                    me.showpage= false
                                } else if (error.response.status == 403) {
                                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                                    me.e403= true
                                    me.showpage= false
                                } else if (error.response.status == 404) {
                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                } else {
                                    me.$notify('Error al intentar listar los registros!!! ','error')
                                }
                            });         
                          }
                          else
                          {
                            alert("No puedes dar seguimiento a este expediente ya que no tiene personas registradas");
                            me.close();
                            me.limpiar();
                          }   

                                      

                      }).catch(function(error) {
                          if (error.response.status == 400) {
                              me.$notify("No es un usuario válido", 'error')
                          } else if (error.response.status == 401) {
                              me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                              me.e401 = true,
                              me.showpage= false
                          } else if (error.response.status == 403) {
                              me.$notify("No esta autorizado para ver esta pagina", 'error')
                              me.e403= true
                              me.showpage= false
                          } else if (error.response.status == 404) {
                              me.$notify("El recuso no ha sido encontrado", 'error')
                          } else {
                              me.$notify('Error al intentar listar los registros!!! ','error')
                          }
                      });

                  }).catch(function(error) {
                      if (error.response.status == 400) {
                          me.$notify("No es un usuario válido", 'error')
                      } else if (error.response.status == 401) {
                          me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                          me.e401 = true,
                          me.showpage= false
                      } else if (error.response.status == 403) {
                          me.$notify("No esta autorizado para ver esta pagina", 'error')
                          me.e403= true
                          me.showpage= false
                      } else if (error.response.status == 404) {
                          me.$notify("El recuso no ha sido encontrado", 'error')
                      } else {
                          me.$notify('Error al intentar listar los registros!!! ','error')
                      }
                  });


              }).catch(function(error) {
                  if (error.response.status == 400) {
                      me.$notify("No es un usuario válido", 'error')
                  } else if (error.response.status == 401) {
                      me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                      me.e401 = true,
                      me.showpage= false
                  } else if (error.response.status == 403) {
                      me.$notify("No esta autorizado para ver esta pagina", 'error')
                      me.e403= true
                      me.showpage= false
                  } else if (error.response.status == 404) {
                      me.$notify("El recuso no ha sido encontrado", 'error')
                  } else {
                      me.$notify('Error al intentar listar los registros!!! ','error')
                  }
              });
          },
          convertirAConjunto()
        {

            let me = this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

            var solicitadosC = '';
            var requeridosC = '';
            var delitosC = '';

            var nombreS = '';
            var telefonoS = '';
            var clasificacionS = '';

            var nombreR = '';
            var telefonoR = '';
            var clasificacionR = '';

            var nombreD = '';

            var countS = 0;
            var countR = 0;

            var SolReq = '';
            var DelDer = '';

            var idConjuntoNew = '';

                //Comenzamo con la insercion del la tabla de conjuntos

                //iniciamos el recorrido de las personasC para guardar en las variables
                for (var i = 0; i < me.personasC.length; i++) 
                {
                    //Pasamos los valores a item para no confundirnos
                    var item = me.personasC[i];


                    SolReq += item.idRSolicitanteRequerido;

                    if(i+1 != me.personasC.length)
                        {
                            SolReq += "; ";
                        }

                    //Evaluamos el solicitante o requerido y concatenamos los valores

                    //--------------SOLICITANTE---------------------------
                    if(item.tipo == "Solicitante")
                    {

                        if(solicitadosC == '')
                        {
                            solicitadosC = item.personaId;
                            nombreS = item.nombreCompleto;
                            telefonoS = item.telefono1;
                            clasificacionS = item.clasificacion;
                        }
                        else
                        {
                            solicitadosC = solicitadosC + "; " + item.personaId;
                            nombreS = nombreS + "; " + item.nombreCompleto;
                            telefonoS = telefonoS + "; " + item.telefono1;
                            clasificacionS = clasificacionS + "; " + item.clasificacion;
                        }


                            
                    }

                    //--------------REQUERIDO---------------------------
                    if(item.tipo == "Requerido")
                    {
                        if(requeridosC == '')
                        {
                            requeridosC = item.personaId;
                            nombreR = item.nombreCompleto;
                            telefonoR = item.telefono1;
                            clasificacionR = item.clasificacion;
                        }
                        else
                        {
                            requeridosC = requeridosC + "; " + item.personaId;
                            nombreR = nombreR + "; " + item.nombreCompleto;
                            telefonoR = telefonoR + "; " + item.telefono1;
                            clasificacionR = clasificacionR + "; " + item.clasificacion;
                        }
                    }

                }
                //Recorrrido para los delitosC
                for (var i = 0; i < me.delitosC.length; i++) 
                {
                    var item = me.delitosC[i];

                    delitosC += item.idDelito;
                    nombreD += item.nombreDelito;
                    DelDer += item.idDelitoDerivado;

                    if(i+1 != me.delitosC.length)
                    {
                        delitosC += "; ";
                        nombreD += "; ";
                        DelDer += "; ";
                        
                    }
                }

                if(solicitadosC != '' && requeridosC != '' && delitosC != '')
                {
                    //Iniciamos el proceso de insersiones por la creacion del registro de conjuntos
                    me.$justiciarestaurativa.post('api/Expedientes/CrearConjunto',
                    {
                        'EnvioId': me.envioId,
                        'SolicitadosC': solicitadosC,
                        'RequeridosC': requeridosC,
                        'DelitosC': delitosC,
                        'NombreS': nombreS,
                        'DireccionS': "",
                        'TelefonoS': telefonoS,
                        'ClasificacionS':clasificacionS,
                        'NombreR': nombreR,
                        'DireccionR': "",
                        'TelefonoR': telefonoR,
                        'ClasificacionR': clasificacionR,
                        'NombreD': nombreD,
                        'NoOficio':"",
                        'ResponsableJR' : "",
                        'NombreSubDirigido' : "CENTRO DE JUSTICIA RESTAURATIVA"

                        
                    },configuracion).then(function(response)
                    {
                        //Guardamos el valor del id de conjunto que se crea
                        idConjuntoNew = response.data.idconjunto;

                        //Iniciamos la actualizacion a solicitantesrequeridos 
                        var arraySolRequ = SolReq.split("; ");
                        for (var i = 0; i < arraySolRequ.length; i++) 
                        {
                          me.$justiciarestaurativa.put('api/SolicitanteRequeridoes/EditarConjuntoIdSolicitantesRequeridos',
                            {
                                'idRSolicitanteRequerido':arraySolRequ[i], 
                                'conjuntoDerivacionesId': idConjuntoNew,

                            },configuracion).then(function(response)
                            {
                            

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

                        //Segundo punto los delitos derivados
                        var arrayDelDe = DelDer.split("; ");
                        for (var i = 0; i < arrayDelDe.length; i++) 
                        {
                          me.$justiciarestaurativa.put('api/Delitoes/EditarConjuntoIdDelitosDerivados',
                            {
                                'IdDelitoDerivado':arrayDelDe[i], 
                                'conjuntoDerivacionesId': idConjuntoNew,

                            },configuracion).then(function(response)
                            {

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

                        //Acciones despues de concluir
                        me.listarConjuntosPSR();
                        

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
                else
                {
                    alert
                    (
                      "No puedes dar seguimiento a este expediente ya que no tiene registrados " + 
                      (solicitadosC == '' ? "\n■ Al menos un solicitante" : "") +
                      (requeridosC == '' ? "\n■ Al menos un requerido" : "") +
                      (delitosC == '' ? "\n■ Al menos un delito" : "") 
                    )
                    me.close();
                    me.limpiar();
                }
                
            


        },
            InfoSolReq(){
              let me=this;
              let header={"Authorization" : "Bearer" + this.$store.state.token};
              let configuracion= {headers : header};

              me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/NomSolReq/' + me.envioId, configuracion).then(function(response){
                me.ArraySolReql = response.data;              
                me.ArraySolReql.map(function (x){
                  me.infoSolReq.push({text: x.nombreCompleto, value: x.personaId});
                });

              }).catch(function(error){
                  if (error.response.status==401){
                      me.e401 = true,
                      me.showpage= false
                  } else if (error.response.status==403){
                      me.e403= true
                      me.showpage= false
                  } else if (error.response.status==404){
                      me.$notify("El recuso no ha sido encontrado", 'error')
                  }else{
                      me.$notify(error.message,'error')
                  }
              });

            }, 
           pdfSolReq(){
           let me=this;
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header};
          me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/InfoPerSolReq/' +  me.SolReque + '/' + me.envioId, configuracion).then(function(response){
           let PersonasSolReq = response.data[0];
                me.nomSolReq = PersonasSolReq.nombreCompleto;
                me.alias = PersonasSolReq.alias;
                me.clasificacionP = PersonasSolReq.clasificacionPersona;
                me.tpersona = PersonasSolReq.tipoPersona;
                me.curpsr = PersonasSolReq.curp;
                me.docidentificacion = PersonasSolReq.docIdentificacion; 
                me.nacionalidadsr = PersonasSolReq.nacionalidad;
                me.telefonosr = PersonasSolReq.telefono;
                me.correosr= PersonasSolReq.correo;
                me.generosr = PersonasSolReq.genero;
                me.sexosr = PersonasSolReq.sexo;
                me.edadsr = PersonasSolReq.edadinfo;
                me.medionotificacionsr= PersonasSolReq.medionotificacion;
                me.ocupacionsr = PersonasSolReq.ocupacion;
                me.estudiosr = PersonasSolReq.nivelEstudio;
                me.religionsr = PersonasSolReq.religion;
                me.idiomasr = PersonasSolReq.lengua;
                me.estadocivilsr = PersonasSolReq.estadoCivil;
                me.discapacidadsr= PersonasSolReq.tipoDiscapacidad;
                me.direccionsr = PersonasSolReq.direccionCompleta;
                me.referenciasr = PersonasSolReq.referencia;
                me.tipoSolicitante = PersonasSolReq.tipoSolicitante;
            }).catch(function(error){
                if (error.response.status==401){
                    me.e401 = true,
                    me.showpage= false
                } else if (error.response.status==403){
                    me.e403= true
                    me.showpage= false
                } else if (error.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                    me.$notify(error.message,'error')
                }
            }); 


        },
        mostrarpdf_Persona() {
            let me = this
            
            me.qrCode = ''

            me.docRemision = `Detalles de solicitante/requerido`

            let fechaQR = new Date()

            me.vistaPreviaTF = false

            me.generarQR(me.docRemision, me.nuc, me.u_nombre, fechaQR, me.expedienteId)                        
          }, 
        crearPdf_Persona() { 
            
            let me = this
            var pdfMake = require('pdfmake/build/pdfmake.js')                            
                var logo1 = this.logo1;
                var logo2 = this.logo2;
                var logo3 = this.logo3;
                var logo4 = this.logo4;                                            
                var dia = moment().format("DD");
                var mes = moment().format('MMMM');
                var año= moment().format("YYYY");
                var hr= moment().format('h:mm:ss a');
                var fecha = dia + " de " + mes  + " del " + año + ", " + hr                 
            
                var dd = {
                    pageSize: 'LEGAL',
                    pageOrientation: 'portrait',
                    pageMargins: [ 85, 130, 72, 60 ], 
                    footer: function (currentPage, pageCount) {
                        return {
                            columns: [
                                 { 
                                    image: logo4,
                                    width: 612, 
                                    absolutePosition: {x: 0, y: 0},                                
                                },
                                {
                                    text: "Page " + currentPage.toString() + ' de ' + pageCount, alignment: 'right', style: 'footertext',  margin: [0, 20, 30, 0] 
                                },
                                me.vistaPreviaTF == false ?  
                                {
                                    image: me.qrCode,
                                    width: 80, // Ajusta el ancho según tu diseño
                                    height: 80, // Ajusta la altura según tu diseño
                                    absolutePosition: { x: 5, y: -80 }, // Ajusta las coordenadas según tu diseño

                                }
                                : "",      
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
                            ]                    
                    },                
                    content: [                                                                         
                        {
                            style: 'table',
                            table: {
                                headerRows: 1,
                                widths: ['*', 'auto', 'auto'], 
                                body: [
                                    [{colSpan: 3,  text:(this.tipoSolicitante == 'Requerido'? "Información del requerido": "Información del solicitante"), fillColor: '#eeeeee', fontSize: 14, bold: true, alignment: 'center'},'', '', ],
                                    ['Nombre' + '\n' + this.nomSolReq, 'Alias:' + '\n' + this.alias , 'Clasificación de persona:'+ '\n' + this.clasificacionP]  ,
                                    ['Tipo persona:' + '\n' + this.tpersona, 'CURP:'+ '\n' + this.curpsr, 'Documento de identificación:'+ '\n' + this.docidentificacion],
                                    ['Nacionalidad:'+ '\n' + this.nacionalidadsr, 'Teléfono(s):'+ '\n' + this.telefonosr, 'Correo electrónico:'+ '\n' + this.correosr], 
                                    ['Genero:' + '\n' + this.generosr, 'Sexo' + '\n' + this.sexosr , 'Edad:' + '\n' + this.edadsr, ]  ,
                                    ['Autoriza medio de notificación:'+ '\n' + this.medionotificacionsr, 'Ocupacion:'+ '\n' + this.ocupacionsr, 'Nivel estudios:'+ '\n' + this.estudiosr],
                                    ['Religion:'+ '\n' + this.religionsr, 'Idioma  o lengua que habla:'+ '\n' + this.idiomasr, 'Estado civil:'+ '\n' + this.estadocivilsr],  
                                    [{colSpan: 3,  text:'Discapacidad:'+ '\n' + (this.discapacidadsr == ""? "Ninguna": this.discapacidadsr) } , ''], 
                                    [{colSpan: 3,  text:'Dirección:'+ '\n' + this.direccionsr} , ''],
                                    [{colSpan: 3,  text:'Referencia:'+ '\n' + this.referenciasr} , ''],
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
                        fecha:{
                        fontSize: 9, 
                        regular:true,
                        alignment: 'right',
                    },
                    nuc:{
                        fontSize: 12, 
                        alignment: 'right',
                        bold: true,
                    },
                    titulo: {
                        fontSize: 12,
                        bold: true,
                        alignment: 'center',
                    
                    },
                    subtitulo:{
                        fontSize: 11,
                        bold: true, 
                    },
                    headertext :{
                        fontSize: 10,
                        bold:true,
                        alignment:'left',
                    },
                    footertext :{
                        fontSize: 7,
                        color: 'white'
                    },
                    texto:{
                        fontSize: 10,  
                        regular:true,
                        alignment: 'justify',
                    },
                    textobold:{
                        fontSize: 10,  
                        bold: true,
                        alignment: 'justify',
                    },
                    compareciente:{
                        fontSize: 12, 
                        bold: true,
                        alignment: 'right',
                    },
                    ampo:{
                        fontSize: 10, 
                        bold: true,
                        alignment: 'left',
                    }, 
		            table: {
                        fontSize: 9,
                        margin: [0, 5, 0, 15],
                        alignment: 'left',
                    },
                    cargo:{
                        fontSize: 9, 
                        regular: true,
                        alignment: 'left',
                    },
                    }
        
                }
                    
                    return dd;

                    
                    
            },
            pdfinfoDelito(){
              let me = this;
              let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header};
          me.$justiciarestaurativa.get('api/Delitoes/InfoDelitos/' +  me.Delitos + '/' + me.envioId, configuracion).then(function(response){
           let DelitoConj = response.data[0];
                me.delitoC = DelitoConj.nombreDelito;
                me.delitoEspecificoD = DelitoConj.delitoEspecifico;
                  me.altoImpactoD = DelitoConj.altoImpacto;
                  me.hipotesisD = DelitoConj.hipotesis;
                  me.oficioso = DelitoConj.ofiNoOfic;
                  me.tipoFueroD = DelitoConj.tipoFuero;
                  me.tipoDeclaracionD = DelitoConj.tipoDeclaracion;
                  me.resultadoC = DelitoConj.resultadoDelito;
                  me.graveN = DelitoConj.graveNoGrave;
                  me.intencionD = DelitoConj.intensionDelito;
                  me.violencioSN = DelitoConj.violenciaSinViolencia;
                  me.equiparadoD = DelitoConj.equiparado;
                  me.tipoD = DelitoConj.tipo;
                  me.ClasificacionD = DelitoConj.clasificaOrdenResult;
                  me.armaFuegoD = DelitoConj.armaFuego;
                  me.armaBlancaD = DelitoConj.armaBlanca;
                  me.cuerpoD = DelitoConj.conAlgunaParteCuerpo;
                  me.elementoD = DelitoConj.conotroElemento;
                  me.tipoRobadoD = DelitoConj.tipoRobado;
                  me.montoRobadoD = DelitoConj.montoRobado;
                  me.concursoD = DelitoConj.concurso;


          }).catch(function(error){
                if (error.response.status==401){
                    me.e401 = true,
                    me.showpage= false
                } else if (error.response.status==403){
                    me.e403= true
                    me.showpage= false
                } else if (error.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                    me.$notify(error.message,'error')
                }
            }); 

            },
        mostrarpdf_Delito() {
            let me = this
            
            me.qrCode = ''

            me.docRemision = `Detalles del delito`

            let fechaQR = new Date()

            me.vistaPreviaTF = false

            me.generarQR(me.docRemision, me.nuc, me.u_nombre, fechaQR, me.expedienteId)
        },
        crearPdf_Delito() { 
            let me = this
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var logo3 = this.logo3;
            var logo4 = this.logo4;
            var dia = moment().format("DD");
            var mes = moment().format('MMMM');
            var año= moment().format("YYYY");
            var hr= moment().format('h:mm:ss a');
            var fecha = dia + " de " + mes  + " del " + año + ", " + hr 
            var dd = {
                pageSize: 'LEGAL',
                pageOrientation: 'portrait',
                pageMargins: [ 85, 130, 72, 60 ], 
                footer: function (currentPage, pageCount) {
                    return {
                        columns: [
                            { 
                                image: logo4,
                                width: 612, 

                                absolutePosition: { x: 0, y: 0 },
                            },
                            {
                                text: "Page " + currentPage.toString() + ' de ' + pageCount, alignment: 'right', style: 'footertext',  margin: [0, 20, 30, 0] 
                            },
                            me.vistaPreviaTF == false ? 
                            {
                                image: me.qrCode,
                                width: 80, // Ajusta el ancho según tu diseño
                                height: 80, // Ajusta la altura según tu diseño
                                absolutePosition: { x: 5, y: -80 }, // Ajusta las coordenadas según tu diseño

                            }
                            : "",
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
                    ]
                },
                content: [
                    {
                        text:  fecha,
                        style: 'fecha'
                    }, 
                    '\n',
                    '\n\n',
                    {
                        style: 'table',
                        table: {
                            headerRows: 1,
                            widths: ['*', 'auto', 'auto'], 
                            body: [
                                [{ colSpan: 3, text: 'Información del delito', fillColor: '#eeeeee', fontSize: 14, bold: true, alignment: 'center' }, '', '',],
                                ['Delito' + '\n\n' + this.delitoC, 'Delito espesifico:' + '\n\n' + this.delitoEspecificoD , 'Alto impacto:'+ '\n\n' + (this.altoImpactoD == true? "SI": "NO")]  ,
                                ['Tipo de fuero:' + '\n\n' + this.tipoFueroD, 'Tipo de declaración:'+ '\n\n' + this.tipoDeclaracionD, 'Resultado:'+ '\n\n' + this.resultadoC],
                                ['Grave o No grave:' + '\n\n' + this.graveN, 'Intesión del delito:'+ '\n\n' + this.intencionD, 'Con Violencia o Sin Violencia:'+ '\n\n' + this.violencioSN], 
                                ['Equiparado:' + '\n\n' + (this.equiparadoD == true? "SI": "NO"), 'Tipo' + '\n\n' + this.tipoD , 'Clasificación por orden de resultado:'+ '\n\n' + this.ClasificacionD, ]  ,
                                ['Arma de fuego:' + '\n\n' + (this.armaFuegoD == true? "SI": "NO"), 'Arma blanca:'+ '\n\n' + (this.armaBlancaD== true? "SI": "NO"), 'Con alguna parte del cuerpo:'+ '\n\n' + this.cuerpoD],
                                ['Con otro elemento:' + '\n\n' + this.elementoD, 'Tipo de lo Robado:'+ '\n\n' + this.tipoRobadoD, 'Monto de lo Robado:'+ '\n\n' + this.montoRobadoD],  
                                ['Hipótesis:'+ '\n\n' + this.hipotesisD,'Oficioso o No oficioso:' + '\n\n' + this.oficioso, 'Concurso:'+ '\n\n' + this.concursoD],
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
                    fecha: {
                    fontSize: 9, 
                    regular: true,
                    alignment: 'right',
                },
                nuc: {
                    fontSize: 12, 
                    alignment: 'right',
                    bold: true,
                },
                titulo: {
                    fontSize: 12,
                    bold: true,
                    alignment: 'center',
                },
                subtitulo:{
                    fontSize: 11,
                    bold: true, 
                },
                headertext :{
                    fontSize: 10,
                    bold:true,
                    alignment:'left',
                },
                footertext: {
                    fontSize: 7,
                    color: 'white'
                },
                texto: {
                    fontSize: 10,  
                    regular: true,
                    alignment: 'justify',
                },
                textobold: {
                    fontSize: 10,  
                    bold: true,
                    alignment: 'justify',
                },
                compareciente: {
                    fontSize: 12, 
                    bold: true,
                    alignment: 'right',
                },
                ampo: {
                    fontSize: 10, 
                    bold: true,
                    alignment: 'left',
                }, 
                table: {
                    fontSize: 9,
                    margin: [0, 5, 0, 15],
                    alignment: 'center',
                },
                cargo: {
                    fontSize: 9, 
                    regular: true,
                    alignment: 'left',
                },
            }}
            return dd;
        },
        listarLogo(){
            let me=this;

            this.$conf.get('api/ConfGlobals/Listar').then(function(response){
              
                me.logo1= response.data.logo1;
                me.logo2= response.data.logo2;
                me.logo3 = response.data.logo3;
                me.logo4 = response.data.logo4;
            }).catch(function(error){
                me.$notify('Error al leer la configuracion global !!!','error')
            });
        },
        informacionagencia(){
            let me=this;
            me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia).then(function(response){
                me.direccionAgencia=response.data.direccion;
                me.telefonosAgencia= response.data.telefono;
            }).catch(function(error){
                me.$notify('Error al intentar leer la informacion de agencia!!!','error')
            });
        },
        
        formatearfechahora: function(fecha){
            return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
        },
        formatearfecha: function(fecha){
            return moment(fecha).format('DD/MM/YYYY');
        },
        formatearhora: function(hora){
            return moment(hora).format('hh:mm:ss a');
        },
        informacion(item)
        {

            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            let me = this;                            

            me.expedienteId = item.idExpediente;
            me.hechoid= item.rHechoId;
            me.$store.state.idExpediente= item.idExpediente;
            me.noExpediente = item.noExpediente;
            me.$store.state.noExpediente=item.noExpediente;
            me.noDerivacion = item.noDerivacion;
            me.fechaDerivacion = item.fechaRegistro            
            me.fechaExpediente = item.fechaDerivacion != '0001-01-01T00:00:00' ? me.formatearfechahora(item.fechaDerivacion) : 'Sin fecha de registro'
            me.StatusGeneral=item.statusGeneral;
            me.informacionStatus=item.informacionStatus;
            me.nuc=item.nuc;
            me.fechaHoraSuceso=item.fechaHoraSuceso;
            me.reseñaBreve = item.reseñaBreve;
            me.idDistritoOrigen = item.distritoOrigenId


               axios.all([
                    me.$cat.get('api/DireccionDelitoes/ListarPoridHecho/'+ me.hechoid, configuracion),
                    me.$justiciarestaurativa.get('api/Envios/ListaEnviosPorExpedienteNoDerivacion/'+ me.expedienteId + "/" + me.noDerivacion, configuracion),
                    me.$cat.get('api/AmpDecs/ListarEntrevistaInicial/'+ me.hechoid,configuracion)
                ]).then(responseArr => 
                {
                    me.v_direccionHecho =(responseArr[0].data.calle + " " + responseArr[0].data.noint + " " + responseArr[0].data.noext   + " " + responseArr[0].data.localidad + " " + responseArr[0].data.municipio + " " + responseArr[0].data.estado + " " + responseArr[0].data.pais + " " + responseArr[0].data.cp);


                    me.envioId= responseArr[1].data.idEnvio;
                    me.$store.state.idEnvio =responseArr[1].data.idEnvio;
                    me.forceRerender();
                    me.autoridadqueDeriva= responseArr[1].data.autoridadqueDeriva;
                    me.uqe_Distrito= responseArr[1].data.uqe_Distrito;
                    me.uqe_DirSubProc = responseArr[1].data.uqe_DirSubProc;
                    me.uqe_Agencia= responseArr[1].data.uqe_Agencia;
                    me.direccionAgenciaqe=responseArr[1].data.uqe_DireccionAgencia;
                    me.telefonosAgenciaqe= responseArr[1].data.uqe_telefonoAgencia;
                    me.uqe_Modulo = responseArr[1].data.uqe_Modulo;
                    me.uqe_Nombre = responseArr[1].data.uqe_Nombre;
                    me.uqe_Puesto = responseArr[1].data.uqe_Puesto;
                    me.StatusGeneralEnvio = responseArr[1].data.statusGeneralEnvio;
                    me.EspontaneoNoEspontaneo= responseArr[1].data.espontaneoNoEspontaneo;
                    me.primeraVezSubsecuente= responseArr[1].data.primeraVezSubsecuente;
                    me.ContadorNODerivacion= responseArr[1].data.contadorNODerivacion;
                    me.FechaRegistro= responseArr[1].data.fechaRegistro;
                    me.NoSolicitantes= responseArr[1].data.noSolicitantes;

                    if(responseArr[2].data.tipo == 1){


                        me.texto  = "Lugar:" + responseArr[2].data.uSubproc+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        'Fecha:' + responseArr[2].data.fechaS+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Hora:"+ responseArr[2].data.horaS+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Unidad de Investigación:"+ responseArr[2].data.uModulo+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Agente del Ministerio Público:"+ responseArr[2].data.usuario+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"

                        me.texto2 = "<p style="+me.comilla+"text-align:center"+me.comilla+"><b>PROTESTA DE LEY</b></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"

                        me.texto2 += "El (La) agente del Ministerio Público con fundamento en lo establecido por el artículo 49 del Código Nacional de Procedimientos Penales, protesta al C."+responseArr[2].data.nombrePersona+ " para conducirse con verdad y le advierte que podrá imponerse de tres meses a dos años de prisión a quien se conduzca con falsedad ante una autoridad en ejercicio de sus funciones, conforme a lo previsto por el artículo 313 del Código Penal del estado de Hidalgo, a lo anterior manifiesta: que si se conducirá con verdad."+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"

                        me.texto3 = "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Esta representación social le da lectura y le explica los derechos que la Constitución Política de los Estados Unidos Mexicanos y el Código Nacional de Procedimientos Penales le concede al denunciante y/o víctima y le entrega la correspondiente acta de derechos."+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p style="+me.comilla+"text-align:center"+me.comilla+">FACULTAD DE ABSTENCIÓN</p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "De igual forma se le hace saber que conforme a lo establecido en el artículo 361 del Código Nacional de Procedimientos Penales, podrá <b>abstenerse de declarar,</b> declarar, si es tutor, curador, pupilo, cónyuge, concubina o concubinario, conviviente del imputado, o si ha vivido en forma permanente con él durante al menos dos años anteriores al hecho, de ser pariente por consanguinidad en la línea recta ascendente o descendente hasta el cuarto grado y en colateral por consanguinidad hasta el segundo grado inclusive, salvo que fuera denunciante. Pero si acepta rendir su testimonio NO podrán negarse a contestar las preguntas que esta autoridad le formule. A lo que manifestó:"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        responseArr[2].data.manifestacion+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "A continuación, el compareciente hace del conocimiento de esta Representación social los siguientes hechos:"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        responseArr[2].data.hechos+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello."
                        me.tipo2 = 1


                    }
                    else if(responseArr[2].data.tipo == 2)
                    {

                        me.tipo2 = 2


                        me.texto  =  "<p style="+me.comilla+"text-align:center"+me.comilla+"><u>COMPARECENCIA DE PERSONA INVESTIGADA</u></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "En la ciudad de "+me.u_distrito+", Hidalgo, siendo las "+responseArr[2].data.horaS+", "+ responseArr[2].data.fechaS+
                        ", el Agente del Ministerio Público "+responseArr[2].data.usuario+", desahoga la declaración indagatoria"+
                        "a cargo del C. "+responseArr[2].data.nombrePersona+", a quien previamente se le hizo saber los derechos que en su favor"+
                        "confiere la Constitución Política de los Estados Unidos Mexicanos y Código Nacional de"+
                        "procedimientos Penales y se le entregó la correspondiente acta de lectura de derechos. Una vez"+
                        "enterado de esos derechos, y del contenido de la carpeta de investigación se le da oportunidad de"+
                        "entrevistarse en privado con su abogado defensor "+responseArr[2].data.representante+", hecho lo anterior por sus datos"+
                        "generales MANIFESTÓ:"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"

                        me.texto2 = "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "*En caso de nacionalidad extranjera, de pertenecer a un grupo étnico y/o que presente alguna discapacidad dar cumplimiento a lo establecido en las leyes de la materia."+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "En relación a los hechos la persona sujeta a investigación <b>MANIFESTÓ:</b>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        responseArr[2].data.manifestacion+
                        ", siendo todo lo que deseo manifestar. En uso de la voz el defensor"+responseArr[2].data.representante+", "+
                        responseArr[2].data.hechos+
                        "previa lectura, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello."


                    } else if(responseArr[2].data.tipo == 3)
                    {
                        me.tipo2 = 3

                        me.texto  = "Lugar:" + responseArr[2].data.uSubproc+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        'Fecha:' + responseArr[2].data.fechaS+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Hora:"+ responseArr[2].data.horaS+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Unidad de Investigación:"+ responseArr[2].data.uModulo+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Agente del Ministerio Público:"+ responseArr[2].data.usuario+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"

                        me.texto2  =  "<p style="+me.comilla+"text-align:center"+me.comilla+">EXHORTA/INFORMA</p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "El(La) agente del Ministerio Público con fundamento en lo establecido por el artículo 49 del Código Nacional de Procedimientos Penales, exhorta/informa al menor de iniciales "+ responseArr[2].data.iniciales+ " para que se conduzca con verdad en lo que manifieste en su entrevista y se le explica que de conducirse con falsedad incurrirá en una conducta tipificada como delito en la ley penal y se hará acreedor a una medida de conformidad con las disposiciones aplicables, a lo anterior manifiesta: que si se conducirá con verdad."+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "A continuación, se recaban los datos generales del(la) menor, que de conformidad con el artículo 20 apartado C fracción V de la Constitución Política de los Estados Unidos Mexicanos y 109 fracción XXVI del Código Nacional de Procedimientos Penales quedan reservados."+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Una vez que se le hicieron saber a "+responseArr[2].data.iniciales+ " los derechos que le otorga la Constitución Política de los Estados Unidos Mexicanos, el Código Nacional de Procedimientos Penales, la Ley Nacional Del Sistema Integral De Justicia para Adolescentes y la Ley General de los Derechos de Niñas, Niños y Adolescentes se le entregó la correspondiente acta."+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p style="+me.comilla+"text-align:center"+me.comilla+">FACULTAD DE ABSTENCIÓN</p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "De igual forma se le hace saber que conforme a lo establecido en el artículo 361 del Código Nacional de Procedimientos Penales, podrá <b>abstenerse de declarar</b>, si es tutor, curador, pupilo, cónyuge, concubina o concubinario, conviviente del imputado, o si ha vivido en forma permanente con él durante al menos dos años anteriores al hecho, de ser pariente por consanguinidad en la línea recta ascendente o descendente hasta el cuarto grado y en colateral por consanguinidad hasta el segundo grado inclusive, salvo que fuera denunciante. Pero si acepta rendir su testimonio NO podrán negarse a contestar las preguntas que esta autoridad le formule. A lo que manifestó:"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        responseArr[2].data.manifestacion+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "En relación a lo hechos el(la) menor de identidad reservada de iniciales "+ responseArr[2].data.iniciales +"<u>, MANIFESTÓ:</u>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        responseArr[2].data.hechos+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello."


                    } 
                    else if(responseArr[2].data.tipo == 4)
                    {

                        me.tipo2 = 4

                        me.texto  =  ""+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "En la ciudad de "+ responseArr[2].data.uDistrito + ", Hidalgo, siendo las" + responseArr[2].data.horas + ", "+ responseArr[2].data.fechaS +  ", el Agente del Ministerio Público "+ responseArr[2].data.usuario +
                        ", desahoga la declaración del adolescente " + responseArr[2].data.nombrePersona + ", quien se encuentra acompañado "+ responseArr[2].data.acompañantev + ", quien en este momento se identifican con "+
                        responseArr[2].data.tidentificacion + " con número de " + responseArr[2].data.noIdentificacion + " las que portan fotografía a color y coinciden con los rasgos fisionómicos, mismas que les son devueltas por serles de su utilidad dejando en su lugar copias simples, así mismo exhiben acta de nacimiento/"+responseArr[2].data.curpa+
                        " la cual se les devuelve por serles de utilidad dejando en su lugar copias simple para que se agregue a la presente carpeta; adolescente a quien previamente se le hizo saber los derechos que prevé en su favor el artículo 20 apartado B de la Constitución Política de los Estados Unidos Mexicanos; 35, 36, 37, 38, 39, 40, 41, 42, 43, 44 y 45 de la ley Nacional del Sistema Integral de Justicia Penal para adolescentes, así como 113 y 115 del Código Nacional de Procedimientos Penales y se le entregó la correspondiente acta de lectura de derechos. Manifestó quedar debidamente enterado. En este acto se permite que se entreviste en privado con su Defensor(a)."+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "A continuación, se recaban los datos generales del(la) adolescente, que de conformidad con el artículo 20 apartado B de la Constitución Política de los Estados Unidos Mexicanos; 35 y 36 de la ley Nacional del Sistema Integral de Justicia Penal para adolescentes quedan reservados."+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "En relación a los hechos la persona investigada MANIFESTÓ:"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        responseArr[2].data.manifesto+
                        " siendo todo lo que deseo manifestar. En uso de la voz el defensor " + responseArr[2].data.representante +
                        ", previa lectura, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello."


                    }
                    else if((responseArr[2].data.tipo == 5)){

                        me.texto  = "Lugar:" + responseArr[2].data.USubproc+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        'Fecha:' + responseArr[2].data.fechaS+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Hora:"+ responseArr[2].data.horaS+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Unidad de Investigación:"+ responseArr[2].data.uModulo+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Agente del Ministerio Público:"+ responseArr[2].data.usuario+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"

                        me.texto2 = "<p style="+me.comilla+"text-align:center"+me.comilla+"><b>PROTESTA DE LEY</b></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"

                        me.texto2 += "El (La) agente del Ministerio Público con fundamento en lo establecido por el artículo 49 del Código Nacional de Procedimientos Penales, protesta al C. XXXX para conducirse con verdad y le advierte que podrá imponerse de tres meses a dos años de prisión a quien se conduzca con falsedad ante una autoridad en ejercicio de sus funciones, conforme a lo previsto por el artículo 313 del Código Penal del estado de Hidalgo, a lo anterior manifiesta: que si se conducirá con verdad."+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Acto seguido el testigo por sus datos generales manifestó"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"

                        me.texto3 = "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p style="+me.comilla+"text-align:center"+me.comilla+">FACULTAD DE ABSTENCIÓN</p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "De igual forma se le hace saber que conforme a lo establecido en el artículo 361 del Código Nacional de Procedimientos Penales, podrá abstenerse de declarar, si es tutor, curador, pupilo, cónyuge, concubina o concubinario, conviviente del imputado, o si ha vivido en forma permanente con él durante al menos dos años anteriores al hecho, de ser pariente por consanguinidad en la línea recta ascendente o descendente hasta el cuarto grado y en colateral por consanguinidad hasta el segundo grado inclusive, salvo que fuera denunciante. Pero si acepta rendir su testimonio NO podrán negarse a contestar las preguntas que esta autoridad le formule. Por lo que manifiesta:"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        responseArr[2].data.manifestacion+
                        "Así mismo se le informa que en términos del artículo 360 del Código Nacional de Procedimientos Penales, no está obligado a declarar sobre hechos por los que se le pueda fincar responsabilidad penal."+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "A continuación, el testigo hace del conocimiento de esta Representación social los siguientes hechos:" +
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        responseArr[2].data.hechos+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello."


                        me.tipo2 = 5

                    }


                    me.representantesf = responseArr[2].data.tRepresentantes
                    me.personaf = responseArr[2].data.nombrePersona
                    me.inicialesf = responseArr[2].data.iniciales

                    me.acvictima = responseArr[2].data.parentezcoV
                    me.acnombre = responseArr[2].data.acompañantev
                    me.psimenor = responseArr[2].data.vNombre
                    me.puestopsi = responseArr[2].data.vPuesto

                    me.numerooficio = responseArr[2].data.numerooficio
                    me.clasificacionPersona= responseArr[2].data.clasificacionP
                    me.nombre = responseArr[2].data.nombrePersona
                    me.alias= responseArr[2].data.alias
                    me.tipopersona= responseArr[2].data.tipoP
                    me.curp= responseArr[2].data.curp
                    me.docIdentificacion= responseArr[2].data.docIdentificacion
                    me.nacionalidad= responseArr[2].data.nacionalidad
                    me.tel = responseArr[2].data.tel
                    me.email = responseArr[2].data.email
                    me.genero= responseArr[2].data.genero
                    me.sexo = responseArr[2].data.sexo
                    me.fechaNacimiento = responseArr[2].data.fechaNacimiento
                    me.medionotificacion= responseArr[2].data.medionotificacion
                    me.ocupacion= responseArr[2].data.ocupacion
                    me.nivelestudio= responseArr[2].data.nivelestudio
                    me.religion= responseArr[2].data.religion
                    me.lengua= responseArr[2].data.lengua
                    me.estadocivil= responseArr[2].data.estadocivil
                    me.tipodiscapacidad = responseArr[2].data.tipodiscapacidad
                    me.direccionpersonal = responseArr[2].data.direccionP
                    me.edad = responseArr[2].data.edad
                    
                    me.modal_Informacion=true;                                    
                    me.listarConjuntosPSR();
                    me.Menoresedad();
                }).catch(function(error){                  
                    if (error.response.status==401){
                        me.e401 = true,
                        me.showpage= false
                    } else if (error.response.status==403){
                        me.e403= true
                        me.showpage= false
                    } else if (error.response.status==404){
                        me.$notify("El recurso 'Entrevista Inicial' no ha sido encontrado", 'error')
                    }else{
                        me.$notify(error.message,'error')
                    }
                });


        },
        imprimirEntrevistapdf() {

            let me = this
            
            me.qrCode = ''

            me.docRemision = `Reimpresión de entrevista completa`

            let fechaQR = new Date()

            me.vistaPreviaTF = false

            me.generarQR(me.docRemision, me.nuc, me.u_nombre, fechaQR, me.expedienteId)                              
        },
        downloadPdf(nombre,puesto,agencia) {
            let me = this            
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

            if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs;
            }

            var logo1 = this.logo1;
            var logo2 = this.logo2;
            var logo3 = this.logo3;
            var logo4 = this.logo4;
            var u_dirSubPro = this.u_dirSubPro;
            var u_agencia = this.u_agencia;
            var nuc = this.nuc;            
            var html =htmlToPdfmake(
                this.texto
            );
            var html2 =htmlToPdfmake(
                this.texto2
            );
            var html3 =htmlToPdfmake(
                this.texto3
            );

            var tipo ;
            var titulo;
            if(this.tipo2 == 1){
                tipo = 'DATOS DE LA VÍCTIMA U OFENDIDO'
                titulo ='\nENTREVISTA A CARGO DEL (A) (DENUNCIANTE, VÍCTIMA U OFENDIDO)\n'+"C."+this.personaf+ "\n\n\n"
            } else if(this.tipo2 == 2)
                tipo = 'DATOS DEL IMPUTADO'
            else if(this.tipo2 == 3)
                titulo = '\nENTREVISTA A CARGO DE LA VÍCTIMA MENOR DE EDAD DE INICIALES\n'+ this.inicialesf+ "\n\n\n"
            else if(this.tipo2 == 4)
                titulo = 'COMPARECENCIA DE PERSONA INVESTIGADA'
            else if(this.tipo2 == 5){
                tipo = 'DATOS DEL TESTIGO'
                titulo ='\nENTREVISTA TESTIMONIAL A CARGO DEL C.\n'+"C."+this.personaf+ "\n\n\n"
            }
            
            var agenciainfodr = this.direccionAgenciaqe;
            var agenciainfotel = this.telefonosAgenciaqe;
            
            var dd = {
                pageSize: 'LEGAL',
                pageOrientation: 'portrait',
                pageMargins: [ 85, 130, 72, 60 ],
                footer: function (currentPage, pageCount) {
                    return {
                        columns: [
                            {
                                image: logo4,
                                width: 612,
                                absolutePosition: {x: 0, y: 0},
                            },
                            {
                                text: agenciainfodr +"\n"+agenciainfotel+"\n"+ 'www.hidalgo.gob.mx',
                                style: 'subheaderlogo',
                                style: 'PiePagina',
                                margin: [312,12,72,0],
                                alignment:'right',
                                absolutePosition: {x: 0, y: 30},
                            },
                            me.vistaPreviaTF == false? 
                            {
                                image: me.qrCode,
                                width: 80, // Ajusta el ancho según tu diseño
                                height: 80, // Ajusta la altura según tu diseño
                                absolutePosition: { x: 5, y: -80 }, // Ajusta las coordenadas según tu diseño

                            }
                            : "",
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
                        ]
                },
                content: [
                    {
                        text:  u_dirSubPro +"\n"+u_agencia,
                        style: 'Adscripcion',
                        absolutePosition: {x: 85, y: 95},
                    },
                    {
                        text:"Número Único de caso: "+ nuc,
                        style: 'Titulo',
                        alignment: 'right',
                        margin: [0, 40, 72, 0],
                        absolutePosition: {x: 85, y: 150},
                    },
                    {
                        text:titulo ,
                        style: 'Titulo',
                        alignment:'center',
                    },
                    this.tipo2 == 1 ||  this.tipo2 == 5 ?
                    {
                        text: html ,
                        style: 'Texto',
                    } : "",
                    this.tipo2 == 1 ||  this.tipo2 == 5 ?
                    {
                        text: html2 ,
                        style: 'Texto',
                    } : "",

                    this.tipo2 == 1  ||  this.tipo2 == 5?
                    {
                        style: 'table',
                        table: {
                            headerRows: 1,
                            widths: ['*', 'auto', 'auto'],
                            body: [
                                [{colSpan: 3,  text: tipo, fillColor: '#eeeeee',style:'Titulo'},'', '', ],
                                [{style:'Texto',text: 'Nombre' + '\n\n' + this.nombre }, {style:'Texto',text:'Alias:' + '\n\n' + this.alias },{style:'Texto',text: 'Clasificación de persona:'+ '\n\n' + this.clasificacionPersona}]  ,
                                [{style:'Texto',text:'Tipo persona:' + '\n\n' + this.tipopersona},{style:'Texto',text: 'CURP:'+ '\n\n' + this.curp},{style:'Texto',text: 'Documento de identificación:'+ '\n\n' + this.docIdentificacion}],
                                [{style:'Texto',text:'Nacionalidad:'+ '\n\n' + this.nacionalidad}, {style:'Texto',text:'Telefono(s):'+ '\n\n' + this.tel},{style:'Texto',text: 'Correo electrónico:'+ '\n\n' + this.email}],
                                [{colSpan: 3,  text:'Direccion:'+ '\n\n' + this.direccionpersonal,style:'Texto'} , ''],
                                [{style:'Texto',text:'Genero:' + '\n\n' + this.genero},{style:'Texto',text: 'Sexo' + '\n\n' + this.sexo },{style:'Texto',text: 'Edad:' + '\n\n' + this.edad }]  ,
                                [{style:'Texto',text:'Autoriza medio de notificación:'+ '\n\n' + this.medionotificacion},{style:'Texto',text: 'Ocupacion:'+ '\n\n' + this.ocupacion},{style:'Texto',text: 'Nivel estudios:'+ '\n\n' + this.nivelestudio}],
                                [{style:'Texto',text:'Religion:'+ '\n\n' + this.religion},{style:'Texto',text: 'Idioma  o lengua que habla:'+ '\n\n' + this.lengua},{style:'Texto',text: 'Estado civil:'+ '\n\n' + this.estadocivil}],
                                [{colSpan: 3,  text:'Tiene alguna deicapaciadad:'+ '\n\n' + this.tipodiscapacidad,style:'Texto'} , ''],
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
                    } : "",

                    this.tipo2 == 1 ||  this.tipo2 == 5 ?
                    {
                        text: html3 ,
                        style: 'Texto',
                    } : "",

                     this.tipo2 == 2 ?
                    {
                        text: html ,
                        style: 'Texto',
                    } : "",
                    this.tipo2 == 2 ?
                    {
                        style: 'table',
                        table: {
                            headerRows: 1,
                            widths: ['*', 'auto', 'auto'],
                            body: [
                                [{style:'Titulo',colSpan: 3,  text: tipo, fillColor: '#eeeeee', fontSize: 12, bold: true, alignment: 'center'},'', '', ],
                                [{style:'Texto',text:'Nombre' + '\n\n' + this.nombre},{style:'Texto',text: 'Alias:' + '\n\n' + this.alias },{style:'Texto',text: 'Clasificación de persona:'+ '\n\n' + this.clasificacionPersona}]  ,
                                [{style:'Texto',text:'Tipo persona:' + '\n\n' + this.tipopersona},{style:'Texto',text: 'CURP:'+ '\n\n' + this.curp},{style:'Texto',text: 'Documento de identificación:'+ '\n\n' + this.docIdentificacion}],
                                [{style:'Texto',text:'Nacionalidad:'+ '\n\n' + this.nacionalidad},{style:'Texto',text: 'Telefono(s):'+ '\n\n' + this.tel},{style:'Texto',text: 'Correo electrónico:'+ '\n\n' + this.email}],
                                [{colSpan: 3,  text:'Direccion:'+ '\n\n' + this.direccionpersonal} , ''],
                                [{style:'Texto',text:'Genero:' + '\n\n' + this.genero},{style:'Texto',text: 'Sexo' + '\n\n' + this.sexo },{style:'Texto',text: 'Edad:' + '\n\n' + this.edad,} ]  ,
                                [{style:'Texto',text:'Autoriza medio de notificación:'+ '\n\n' + this.medionotificacion},{style:'Texto',text: 'Ocupacion:'+ '\n\n' + this.ocupacion},{style:'Texto',text: 'Nivel estudios:'+ '\n\n' + this.nivelestudio}],
                                [{style:'Texto',text:'Religion:'+ '\n\n' + this.religion},{style:'Texto',text: 'Idioma  o lengua que habla:'+ '\n\n' + this.lengua},{style:'Texto',text: 'Estado civil:'+ '\n\n' + this.estadocivil}],
                                [{style:'Texto',colSpan: 3,  text:'Tiene alguna discapaciadad:'+ '\n\n' + this.tipodiscapacidad} , ''],
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
                    } : "",
                    this.tipo2 == 2 ?
                    {
                        text: html2 ,
                        style: 'Texto',
                    } : "",


                    this.tipo2 == 3 ?
                    {
                        text: html ,
                        style: 'Texto',
                    } : "",
                    this.tipo2 == 3 ?
                    {
                        text: html2 ,
                        style: 'Texto',
                    } : "",

                     this.tipo2 == 4 ?
                    {
                        text: html ,
                        style: 'Texto',
                    } : "",

                    (this.tipo2 == 1 || this.tipo2 == 2)  ?
                    {
                        text: "\n\n\n\n\nCOMPARECIENTE\n\n\n\n"+ this.personaf+ "\n\n\n\n",
                        alignment :'justify',
                        style: 'DePara',
                    } : "",
                    (this.tipo2 == 3)  ?
                    {
                        text: "\n\n\n\nINICIALES VICTIMA\n\n"+ this.inicialesf+ "\n\n" + this.acnombre + "\n\n" + this.acvictima + "\n\n\n",
                        alignment :'justify',
                        style: 'DePara',
                    } : "",
                    (this.tipo2 == 4)  ?
                    {
                        text: "\n\n\n\n"+ this.inicialesf+ "\n\n" + 'COMPARECIENTE' +"\n\n",
                        alignment :'justify',
                        style: 'DePara',
                    } : "",
                    (this.tipo2 == 4)  ?
                    {
                        text: this.acnombre + "\n\n" + this.acvictima + "\n\n\n",
                        alignment :'justify',
                        style: 'DePara',
                    } : "",

                    {
                        text:  this.representantesf+ "\n\n\n\n",
                        style: 'DePara',
                        alignment : 'center'
                    },

                    (this.tipo2 == 3)  ?
                    {
                        text: "\n\n"+ this.psimenor+ "\n\n" + this.puestopsi + "\n\n\n\n",
                        alignment :'left',
                        style: 'DePara',
                    } : "",

                    (this.tipo2 == 5)  ?
                    {
                        text: "\n\n\n\n"+ this.personaf+ "\n\n" + 'TESTIGO' +"\n\n\n\n",
                        alignment :'justify',
                        style: 'DePara',
                    } : "",
                    {
                        text: nombre +"\n",
                        alignment :'justify',
                        style: 'DePara',
                    },
                    {
                        text: puesto +"\n",
                        alignment :'justify',
                        style: 'DePara',
                    },
                    {
                        text: agencia +"\n",
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
                        color: 'white'
                    },
                    Texto:{
                        fontSize: 10,
                        alignment:'justify'
                    },
                    Titulo:{
                        fontSize: 12,
                        bold:true,
                        alignment:'center'
                    },
                    SubTitulo:{
                        fontSize: 11,
                        semibold:true
                    },
                }
            }
            return dd;
        },
        formatearfechaTexo(fecha){
            let me= this;
            var dia = moment(fecha).format("DD");
            var mes = moment(fecha).format('MMMM');
            var año= moment(fecha).format("YYYY");
            var fecha = dia + " de " + mes  + " del " + año
             return fecha

        },
        rechazarSolicitud(){            
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};


                me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información. Una vez realizada esta accion no prodra realizar cambios',
                    function(){
                        me.$cat.post('api/Historialcarpeta/Crear',{
                                    'RHechoId': me.hechoid,
                                    'Detalle': "Se rechazo solicitud",
                                    'Modulo': me.uqe_Modulo,
                                    'Agencia': me.uqe_Agencia,
                                    'UDistrito' : me.u_distrito,
                                    'USubproc': me.u_dirSubPro,
                                    'UAgencia': me.u_agencia,
                                    'Usuario': me.u_nombre,
                                    'UPuesto': me.u_puesto,
                                    'UModulo': me.u_modulo

                                }, configuracion).then(function(response){

                                  me.$justiciarestaurativa.put('api/Expedientes/StatusAcepRech',{
                                        'idExpediente': me.expedienteId,
                                        'statusAcepRech': "No procedente",
                                         'informacionstatus': me.informacionStatus + "<br><p>" + me.usuarioActual + ": </p><p>" + moment(new Date).format('DD/MM/YYYY hh:mm:ss a') + "</p>" + me.motivo + me.tipo,                                        
                                    },configuracion).then(function(response){
                                            //ELIMINAMOS LOS REGISTROS DE DELITOS Y SOLICITANTES REQUERIDOS
                                            me.$justiciarestaurativa.put('api/Envios/StatusModuloRespuesta',{
                                                'idExpediente': me.expedienteId,
                                                'idEnvio': me.envioId,
                                                'statusGeneralEnvio': "No procedente",
                                                'sede':  me.u_nombrejr,
                                                'Cosecutivo':0,
                                               'distritoOrigen': me.idDistritoOrigen 
                                            }, configuracion).then(function(response){
                                              me.$justiciarestaurativa.delete('api/Delitoes/EliminarEnvio/'+ me.envioId, configuracion).then(function(response)
                                                {
                                                  me.$justiciarestaurativa.post("api/Registros/CrearRegistro",
                                                  {
                                                      //***************************** PERSONA*/
                                                      EnvioId: me.envioId,
                                                      Tipo: me.tipo,
                                                      QuienPorRegistro: me.quienPor,
                                                      Descripcion: me.textolibre,
                                                      Distrito: me.u_distrito,
                                                      Dirsubproc: me.u_dirSubPro,
                                                      Agencia: me.u_agencia,
                                                      Usuario: me.usuarioActual,
                                                      Puesto: me.u_puesto,
                                                      Fechasis: me.fechareporte,
                                                      Numerooficio: "",
                                                      //************************************ */
                                                  },configuracion).then(function (response) 
                                                  {
                                                    me.vistaPreviaTF = false
                                                      var dd = me.crearPdf_Bitacora();
                                                      var pdfMake = require("pdfmake/build/pdfmake.js");
                                                      var htmlToPdfmake = require("html-to-pdfmake");
                                                      if (pdfMake.vfs == undefined) {
                                                        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
                                                        pdfMake.vfs = pdfFonts.vfs;
                                                      }
                                                      var doc = pdfMake.createPdf(dd).print();

                                                      me.$notify("La información se guardo correctamente !!!","success");
                                                      
                                                      me.closeModal();

                                                      me.modal_Bitacora = false;
                                                      me.listarDerivaciones();
                                                      me.close();
                                                  })
                                                    .catch((err) => {
                                                      if (err.response.status == 400) {
                                                        me.$notify("No es un usuario válido", "error");
                                                      } else if (err.response.status == 401) {
                                                        me.$notify(
                                                          "Por favor inicie sesion para poder navegar en la aplicacion",
                                                          "error"
                                                        );
                                                        (me.e401 = true), (me.showpage = false);
                                                      } else if (err.response.status == 403) {
                                                        me.$notify(
                                                          "No esta autorizado para ver esta pagina",
                                                          "error"
                                                        );
                                                        me.e403 = true;
                                                        me.showpage = false;
                                                      } else if (err.response.status == 404) {
                                                        me.$notify("El recuso no ha sido encontrado", "error");
                                                      } else {
                                                        me.$notify(
                                                          "Error al intentar crear el  registro!!!",
                                                          "error"
                                                        );
                                                      }
                                                  });
                                                    

                                                }).catch(function(error){
                                                    if (error.response.status==401){
                                                        me.e401 = true,
                                                        me.showpage= false
                                                    } else if (error.response.status==403){
                                                        me.e403= true
                                                        me.showpage= false
                                                    } else if (error.response.status==404){
                                                        me.$notify("El recuso no ha sido encontrado", 'error')
                                                    }else{
                                                        me.$notify(error.message,'error')
                                                    }
                                                });
                                            }).catch(function(error){
                                                if (error.response.status==401){
                                                    me.e401 = true,
                                                    me.showpage= false
                                                } else if (error.response.status==403){
                                                    me.e403= true
                                                    me.showpage= false
                                                } else if (error.response.status==404){
                                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                                }else{
                                                    me.$notify(error.message,'error')
                                                }
                                            });

                                    }).catch(function(error){
                                        if (error.response.status==401){
                                            me.e401 = true,
                                            me.showpage= false
                                        } else if (error.response.status==403){
                                            me.e403= true
                                            me.showpage= false
                                        } else if (error.response.status==404){
                                            me.$notify("El recuso no ha sido encontrado", 'error')
                                        }else{
                                            me.$notify(error.message,'error')
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
                                        me.$notify('Error al intentar crear el  registro!!!','error')
                                    }
                                });

                    },
                    function(){
                        alertify.warning('Verifica la información')
                    }).set('labels', {ok:'Guardar', cancel:'Cancelar'});



        },
        CloseProcedente(){
         let me = this;
         me.DialogoNoProcedente = false;
         me.motivo = '';
        },

        aceptarExpediente(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información. Una vez realizada esta accion no prodra realizar cambios',
                function(){
                  me.$justiciarestaurativa.put('api/Envios/AceptacionDerivacion',{
                    'idExpediente': me.expedienteId,
                    'idEnvio': me.envioId,
                    'statusGeneralEnvio': "Procedente",
                    'sede':  me.u_nombrejr,
                    'noDerivacion': me.noDerivacion,
                    'Cosecutivo':me.uqe_Expediente,
                    'anioEx':me.uqe_anioExpediente,
                    'Agenciaid': me.u_idagencia,
                    'distritoOrigen': me.idDistritoOrigen,
                    'prefijo': 'CJR',
                    'noExpediente': me.NoExpedienteCompleto
                }, configuracion).then(function(response){

                        me.noExpediente = response.data.noe;

                        me.$justiciarestaurativa.put('api/Expedientes/StatusAcepRech',{
                            'idExpediente': me.expedienteId,
                            'statusAcepRech': "Procedente",
                            'informacionStatus' :  me.informacionStatus + "<br><p>"+ me.usuarioActual +"</p><p>" + moment(new Date).format('DD/MM/YYYY hh:mm:ss a') +"</p><p>La derivación  fue aceptada y se registro con el número de expediente: </p><b>" + me.noExpediente + "<b>"
                        },configuracion).then(function(response){
                            //***************************************************************************** */
                              me.modal_Informacion= false;
                              me.modalProceso=false;

                              me.listarDerivaciones();
                            //***************************************************************************** */

                        }).catch(function(error){
                            if (error.response.status==401){
                                me.e401 = true,
                                me.showpage= false
                            } else if (error.response.status==403){
                                me.e403= true
                                me.showpage= false
                            } else if (error.response.status==404){
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            }else{
                                me.$notify(error.message,'error')
                            }
                        });
                    }).catch(function(error){
                if (error.response.status==401){
                    me.e401 = true,
                    me.showpage= false
                } else if (error.response.status==403){
                    me.e403= true
                    me.showpage= false
                } else if (error.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                    me.$notify(error.message,'error')
                }
            });
             },
            function(){
                        alertify.warning('Verifica la información')
                    }).set('labels', {ok:'Guardar', cancel:'Cancelar'});
        },

        listarFacilitadores(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var facilitadoresarray=[];
            me.$justiciarestaurativa.get('api/FacilitadorNotificadors/ListarFacilitadores/' + me.u_iddistrito, configuracion).then(function(response){

                facilitadoresarray=response.data;
                facilitadoresarray.map(function(x){
                        me.v_facilitadores.push({text: x.nombreModulo, value: x.moduloServicioId});

                });

            }).catch(function(error){
                me.$notify(error.message,'error')
            });
        },
        listarNotificadores(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var notificadoresarray=[];
            me.$justiciarestaurativa.get('api/FacilitadorNotificadors/ListarNotificadores/' + me.u_iddistrito, configuracion).then(function(response){

                notificadoresarray=response.data;
                notificadoresarray.map(function(x){
                        me.v_notificadores.push({text: x.nombreModulo, value: x.moduloServicioId});

                });

            }).catch(function(error){
                me.$notify(error.message,'error')
            });
        },
        listardelitos(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            var arrayDelito=[];
            me.$justiciarestaurativa.get('api/Delitoes/ListarDelitos/'+ me.envioId, configuracion).then(function(response){

                arrayDelito= response.data;
                arrayDelito.map(function(x){
                        me.v_delitos.push({text: x.nombreDelito, value: x.idDelitoDerivado});
                });
            }).catch(function(error){
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
        formatDate(dateStr) {
          // Divide la cadena de fecha en partes [día, mes, año]
          const [day, month, year] = dateStr.split('/');
          // Devuelve la fecha en formato YYYY-MM-DD
          return `${year}-${month}-${day}`;
      },
        close(){
            this.botonMenores=false;
            this.modal_Informacion= false;
            this.modalCitatorios=false;
            this.modal_citatoriorecordatorio=false;
            this.modalProceso=false;
            this.dialogform=false;
            this.statusSolicitud='No procedente'
            this.motivo="";
            this.v_solicitantes=[];
            this.v_requeridos=[];
            this.v_requerido="";
            this.v_delito="";
            this.v_delitos=[];
            this.personaSR=[];
            this.envioId=null;
            this.infoSolReq=[];
            this.IdMenorS="";
            this.editedIndex= -1;
            this.alerta = false;
            this.IdMenor="";
            this.mostrarJrResponsable =false;
            this.validaDatos = "";
        },
        closeSolReq(){
          this.SolReque = "";
          this.ModalSolReque = false;
          this.infoSolReq=[];
        },
        closeDelito(){
          this.Delitos = "";
          this.ModalDelitos = false;
          this.v_delitos=[];
        },
        limpiarInformacion() {
            let me=this;
            me.modal_Informacion = false;
            me.envioId=null;
            me.personaSR = [];
        },
        responsableClose(){
          let me = this;
          me.rfechanaciomiento = null;
          me.editedIndex = -1;
          me.modalresponsable = false;
          me.mostrarJrResponsable = false;
          me.validaDatos = "";
        },
        limpiar(){
            let me=this;
            me.v_tipocitatorio="";
            me.v_nombreSolicitantes="";
            me.v_telefonosSolicitantes="";
            me.v_requerido="";
            me.v_menu1=false;
            me.v_fechacita="";
            me.v_fechac="";

            me.v_menu2=false;
            me.v_horacita="";
            me.v_horac="";

            me.v_lugarcita='SALA DE MEDIACIÓN  NÚMERO I (Agregar dirección de la sede correspondiente)';

            me.continuidad="";

            me.citatorio1v1="";
            me.citatorio1v2="";

            me.citatorio2="";
            me.citatorio3="";

            me.fechaHoraCita="";
            me.v_statusAsistencia=false;
            me.nombre="";
            me.direccionS="";
            me.direccionR="";
            me.telefono="";
            me.correo="";
            me.titulo="";

            me.statussesion="";
            me.descripcion="";

            me.citatorioslist=[];
            me.asignaciones=[];
            this.v_delito="";
            this.v_delitos=[];
            me.editedIndex=-1;
            me.envioId=null;
        },
         cerrarFull(){
            let me=this;
            me.modalCitatorios=false;
            me.listarDerivaciones();
            me.close();
            me.limpiar();
        },
        closeModal()
        {
            let me=this; 
            me.tipo = '';
            me.quienPor = '';
            me.textolibre = '';
        },
        esperarQR()
        {            
            let me = this
            
            me.qrCode = ''

            me.docRemision = `Registro de derivación no procedente`

            let fechaQR = new Date()

            me.vistaPreviaTF = true

            me.generarQR(me.docRemision, me.nuc, me.u_nombre, fechaQR, me.expedienteId)            
        },
        async generarQR(tipodo,nuc,nombrefirma,fechadoc,id) {            
             let me = this; 
            
            var textoModificado = nuc.replace(/-/g, "~");
            var date = moment(fechadoc, "YYYY-MM-DD HH:mm:ss");
            var dia = moment(date).format("DD");
            var mes = moment(date).format("MMMM");
            var año = moment(date).format("YYYY");
            var fecha = dia + " de " + mes + " del " + año;
            
            try {
                me.qrCode = await generarQRCodeBase64(tipodo,textoModificado,nombrefirma,fecha,id);                
            } catch (err) {
                me.$notify("Error al intentar crear el código QR", 'error')
            }
        },
        mostrarpdf_Bitacora() 
        {
            
            var dd = this.crearPdf_Bitacora();
            var pdfMake = require("pdfmake/build/pdfmake.js");
            var htmlToPdfmake = require("html-to-pdfmake");
            if (pdfMake.vfs == undefined) {
                var pdfFonts = require("pdfmake/build/vfs_fonts.js");
                pdfMake.vfs = pdfFonts.vfs;
            }
            var doc = pdfMake.createPdf(dd);
            var f = document.getElementById("iframepdf1");
            var callback = function (url) {
                f.setAttribute("src", url);
            };
            doc.getDataUrl(callback, doc);
            this.modal_Bitacora = true;
        },
        //Cuerpo del PDF
        crearPdf_Bitacora() {
            let me = this;
            var pdfMake = require("pdfmake/build/pdfmake.js");
            var htmlToPdfmake = require("html-to-pdfmake");
            var logo1 = this.logo1;
            var logo2 = this.logo2;
            var logo3 = this.logo3;
            var logo4 = this.logo4;

            var pdf_diragencia = "";
            var pdf_telagencia = "";
            var pdf_agencia = "";
            var pdf_usuario = "";
            var pdf_puesto = "";

            var nuc = this.nuc;

            pdf_diragencia = this.direccionAgencia;
            pdf_telagencia = this.telefonosAgencia;
            pdf_agencia = this.u_agencia;
            pdf_usuario = this.usuarioActual;
            pdf_puesto = this.u_puesto;

            var u_dirSubPro = this.u_dirSubPro;
            var u_agencia = this.u_agencia;
            var u_subProc = this.u_subproc;
            var htmltexto = htmlToPdfmake(this.textolibre);

            var dd = {
                pageSize: "LEGAL",
                pageOrientation: "portrait",
                pageMargins: [85, 130, 72, 60],
                footer: function (currentPage, pageCount) {
                const footerContent = [
                    {
                    image: logo4,
                    width: 612,
                    absolutePosition: { x: 0, y: 0 },
                    },
                    {
                    text:
                        pdf_diragencia +
                        "\n" +
                        pdf_telagencia +
                        "\n" +
                        "www.hidalgo.gob.mx",
                    style: "subheaderlogo",
                    style: "PiePagina",                    
                    margin: [312,12,72,0],
                    alignment:'right',                            
                    },
                    me.vistaPreviaTF == false ? 
                    {
                        image: me.qrCode,
                        width: 80, // Ajusta el ancho según tu diseño
                        height: 80, // Ajusta la altura según tu diseño
                        absolutePosition: { x: 5, y: -80 }, // Ajusta las coordenadas según tu diseño
                    }
                    : "",
                ]
                return footerContent;
                },
                header: function (currentPage, pageCount, pageSize) {
                return [
                    {
                    image: logo3,
                    width: 612,
                    absolutePosition: { x: 0, y: 0 },
                    },
                ];
                },
                content: [
                {
                    text: u_subProc + "\n" + u_dirSubPro + "\n" + u_agencia,
                    style: "Adscripcion",
                    absolutePosition: { x: 85, y: 95 },
                },
                {
                    text: "Número de NUC: " + nuc,
                    style: "Titulo",
                    alignment: "right",
                    absolutePosition: { x: 85, y: 150 },
                },
                {
                    text: "\n\n\n\n\n" + this.tipo,
                    style: "Titulo",
                },
                "\n\n",
                {
                    text: htmltexto,
                    style: "Texto",
                },               
                "\n\n\n",
                {
                    text: "\n\n\n\n\n" + "A T E N T A M E N T E" + "\n\n\n\n\n",
                    alignment: "justify",
                    style: "DePara",
                },
                {
                    text: pdf_usuario + "\n\n",
                    alignment: "justify",
                    style: "DePara",
                },
                {
                    text: pdf_puesto + "\n\n",
                    alignment: "justify",
                    style: "DePara",
                },
                {
                    text: pdf_agencia + "\n\n",
                    alignment: "justify",
                    style: "DePara",
                },
                ],
                styles: {
                Adscripcion: {
                    fontSize: 10,
                    bold: true,
                },
                Fecha: {
                    fontSize: 9,
                },
                Nooficio: {
                    fontSize: 8,
                    bold: true,
                },
                DePara: {
                    fontSize: 10,
                    bold: true,
                },
                DeParaCargo: {
                    fontSize: 9,
                    bold: true,
                },
                PiePagina: {
                    fontSize: 7,
                },
                Texto: {
                    fontSize: 10,
                    alignment: "justify",
                },
                Titulo: {
                    fontSize: 12,
                    bold: true,
                    alignment: "center",
                },
                SubTitulo: {
                    fontSize: 11,
                    semibold: true,
                },
                },
            };
            return dd;
    },
    updateExp(){
        var adolecentes = this.adolecente === true? '/ADO':'';
        var cjm = this.mujeres === true?'/CJM':'';
        var noExp = this.uqe_Expediente.length < 4? this.uqe_Expediente.padStart(4, '0'): this.uqe_Expediente; 
        this.NoExpedienteCompleto = `CJR/${this.reparatorio === '2'?'PR/':''}${noExp}-${this.uqe_anioExpediente}/${this.u_nombrejr}${this.adolecente === true?adolecentes:cjm}`;
    },
    limpiarDeriPro(){

        this.reparatorio = '1';
        this.adolecente = false;
        this.mujeres = false;
        this.uqe_Expediente = '';
        this.NoExpedienteCompleto = '';
        this.uqe_anioExpediente = moment(new Date).format('YYYY');
    }
    }
}
</script>
<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #00ACC1;
  color: #ffffff;
  border: 1px solid #00ACC1;
  width: 100%;
  font-size: 12px;
  padding: 12px;
  cursor: pointer;
  margin-bottom: 1px;
}
.with-time {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #00ACC1;
  color: #ffffff;
  border: 1px solid #00ACC1;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;


    position: absolute;
    right: 0px;
    margin-right: 0px;
  }
.contenedor_opciones{
    width: 100%;
    display: flex;    
}
.opcionuno .opciondos{
   border: #00ACC1;
}

</style>
