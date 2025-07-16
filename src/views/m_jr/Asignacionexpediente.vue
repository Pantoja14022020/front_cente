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
        <v-toolbar-title class="font-weight-regular"
          >Derivaciones aceptadas.</v-toolbar-title
        >
        <v-divider class="mx-2" inset vertical />
        <v-badge v-model="show" color="cyan" right>
          <template v-slot:badge>
            <span>{{ contador }}</span>
          </template>
          <v-icon large color="grey lighten-1">folder</v-icon>
        </v-badge>
        <v-spacer />
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        />
        <v-spacer />        
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="derivaciones"
        :search="search"
        :pagination.sync="pagination"
      >
        <template slot="items" class="white" slot-scope="props">
          <td class="justify-center layout">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  class="mr-2 mt-2"
                  color="warning"
                  v-on="on"
                  @click="informacion(props.item)"
                >
                  folder
                </v-icon>
              </template>
              <span>Asignar expediente</span>
            </v-tooltip>
          </td>
          <td>{{ props.item.noExpediente }}</td>
          <td>{{ props.item.autoridadqueDeriva }}</td>
          <td>{{ props.item.uqe_Agencia }}</td>
          <td>{{ props.item.uqe_Nombre }}</td>
          <td>{{ props.item.contadorNODerivacion }}</td>
          <td>{{ formatearfechahora(props.item.fechaRegistroExpediente) }}</td>
          <td>{{ props.item.nuc }}</td>
          <td>{{ props.item.statusGeneral }}</td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="listarDerivacionesInicial"
            >Cargar</v-btn
          >
        </template>
      </v-data-table>
    </v-flex>
    <v-dialog
      v-model="dialogform"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar card dark color="grey lighten-4 primary--text">
          <v-avatar size="30">
            <v-icon class="grey lighten-2">add</v-icon>
          </v-avatar>
          <v-toolbar-title class="subheading"
            >Asignar un Expediente {{ noExpediente }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-flex xs12 md12 lg12> </v-flex>
          <v-form ref="form">
            <v-container grid-list-md>
              <v-layout wrap>
                <div>
                  <v-switch
                    v-model="switch2"
                    :label="switchLabel"
                    color="success"
                    hide-details
                    @change="modulos = ''"
                  />
                </div>
                <v-flex xs12 sm12 md12>
                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs12 md12 lg12>
                      <v-card elevation="0">
                        <v-card-text>
                          <!-- Apartado de selección de agencia -->
                          <v-autocomplete
                            name="modulos"
                            :items="v_agencias"
                            v-model="v_agencia"
                            prepend-icon="perm_identity"
                            label="Agencia:"
                            :rules="[v => !!v||'La agencia es requerida']"    
                            return-object
                          ></v-autocomplete>
                          <!-- Apartado de selección del modulo -->
                          <v-autocomplete
                            name="modulos"
                            :items="v_modulos"
                            v-model="modulos"
                            prepend-icon="perm_identity"
                            label="Modulo:"
                            :no-data-text="textoNoDataM"
                            :rules="[v => !!v||'El modulo es requerido']"
                            @change="
                              switch2
                                ? listarFacilitadores(modulos)
                                : disponibilidadFacilitador()
                            "
                          ></v-autocomplete>
                          <!-- Apartado para la selección de la fecha -->
                          <v-dialog
                            v-if="switch2 == false"
                            ref="dialog_f"
                            v-model="modalDate"
                            :return-value.sync="fCita"
                            persistent
                            lazy
                            full-width
                            width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="fCita"
                                label="Fecha de la Cita:"
                                prepend-icon="event"
                                readonly
                                v-validate="'required'"
                                :rules="[v => !!v||'Fecha de la cita es requerida']"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="fCita"
                              type="date"
                              scrollable
                              locale="es-es"
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                flat
                                color="primary"
                                @click="modalDate = false"
                                >Cancel</v-btn
                              >
                              <v-btn
                                flat
                                color="primary"
                                @click="$refs.dialog_f.save(fCita)"
                                >OK</v-btn
                              >
                            </v-date-picker>
                          </v-dialog>


                          <!-- Apartado de facilitadores con sus horarios -->
                          <template v-if="moduloSeleccionado != '' && fCita != '' && switch2 == false">
                            <v-expansion-panel class="mb-3 mt-3" v-model="panel">
                              <v-expansion-panel-content class="grey lighten-5">
                                <template v-slot:header>
                                  <div>Horarios Ocupados de {{ moduloSeleccionado }}</div>
                                </template>
                                <template>
                                  <v-layout pa-3 v-if="horariosFacilitadores.length > 0">
                                    <v-flex xs2 md2 lg2 v-for="(item, i) in horariosFacilitadores" :key="i">
                                      <v-card>
                                        <v-card-title>
                                          {{ item.nombre }}
                                        </v-card-title>
                                        <v-card-text>
                                          <template>
                                            <v-layout wrap align-center justify-center v-if="item.sesiones.length > 0">
                                              <v-flex align-center justify-center class="d-inline-flex" v-for="(hora, y) in item.sesiones" :key="y">
                                                <label class="labelHorario">{{ hora.horaFormateada }}</label>
                                              </v-flex>
                                            </v-layout>
                                            <v-layout wrap align-center justify-center v-else>
                                              <v-flex align-center justify-center class="d-inline-flex">
                                                <label class="labelHorario">No cuenta con sesiones agendadas</label>
                                              </v-flex>
                                            </v-layout>
                                          </template>
                                        </v-card-text>
                                      </v-card>
                                    </v-flex>
                                  </v-layout>
                                  <v-layout v-else>
                                    <v-flex>
                                      <v-card>                                        
                                        <v-card-text>
                                          <label class="labelHorario">No hay facilitadores asignados a este modulo</label>
                                        </v-card-text>
                                      </v-card>
                                    </v-flex>
                                  </v-layout>
                                </template>
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </template>
                          <!-- Apartado de selección de hora -->

                          <v-dialog
                            v-if="switch2 == false && horariosFacilitadores.length > 0"
                            ref="dialog_h"
                            v-model="modalTime"
                            :return-value.sync="h_horacita"
                            persistent
                            lazy
                            full-width
                            width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="h_horacita"
                                label="Hora de la cita:"
                                prepend-icon="access_time"
                                readonly
                                :v-validate="(switch2 == false && horariosFacilitadores.length > 0) ? valueR : ''"
                                :rules="[v => !!v||'Hora de la cita es requerida']"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="modalTime"
                              v-model="h_horacita"
                              full-width
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                flat
                                color="primary"
                                @click="modalTime = false"
                                >Cancel</v-btn
                              >
                              <v-btn
                                flat
                                color="primary"
                                @click="$refs.dialog_h.save(h_horacita)"
                                >OK</v-btn
                              >
                            </v-time-picker>
                          </v-dialog>
                          <!-- Apartado para la selección de tiempo de duración -->
                          <v-select
                            v-if="switch2 == false && horariosFacilitadores.length > 0"
                            :items="duracions"
                            v-model="duracion"
                            name="tiempo de duración"
                            label="Tiempo de duración de la cita:"
                            prepend-icon="hourglass_empty"
                            :v-validate="(switch2 == false && horariosFacilitadores.length > 0) ? valueR : ''"
                            :rules="[v => !!v||'Duración de la cita es requerida']"
                            v-on:change=""
                          >
                          </v-select>
                          <!-- Apartado para la edición del lugar de la cita -->
                          <v-text-field
                            v-if="switch2 == false && horariosFacilitadores.length > 0"
                            name="lugar de la cita"
                            label="Lugar de la cita:"
                            v-model="v_lugarcita"
                            prepend-icon="pin_drop"
                            :v-validate="(switch2 == false && horariosFacilitadores.length > 0) ? valueR : ''"
                            :rules="[v => !!v||'Lugar de la cita es requerida']"
                          >
                          </v-text-field>
                          <!-- Apartado para la selección del facilitador -->
                          <v-select
                            v-if="horariosFacilitadores.length > 0 || switch2 == true"
                            name="facilitadores"
                            :items="v_facilitadores"
                            v-model="v_facilitador"
                            :no-data-text="textoNoData"
                            prepend-icon="perm_identity"
                            label="Facilitadores disponibles:"
                            :rules="[v => !!v||'Tiene que seleccionar un facilitador']"
                            return-object
                          >
                          </v-select>
                           <!-- Apartado para la selección del notificador     -->
                          <v-select
                            v-if="horariosFacilitadores.length > 0 || switch2 == true"
                            name="notificadores"
                            :items="v_notificadores"
                            v-model="v_notificador"
                            :no-data-text="textoNoDataN"
                            prepend-icon="perm_identity"
                            label="Notificadores disponibles:"
                            :rules="[v => !!v||'Tiene que seleccionar un notificador']"
                            return-object
                          >
                         </v-select>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions v-if="switch2 == true">
              <v-spacer></v-spacer>
              <v-btn @click.native="close()">Cancelar</v-btn>
              <v-btn @click.native="guardarNoEspontaneo()" class="success" >Guardar</v-btn>
            </v-card-actions>
            <!-- Botones para guardar datos de NO Espontaneo -->
            <v-card-actions v-if="switch2 == false">
              <v-spacer></v-spacer>
              <v-btn @click.native="close()">Cancelar</v-btn>
              <v-btn @click.native="guardarNoEspontaneo()" class="success"
                >Guardar</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="questionPersona" max-width="500px">
      <v-card>
        <v-toolbar card dark color="grey lighten-4 primary--text">
          <v-avatar size="30">
            <v-icon class="grey lighten-2">person</v-icon>
          </v-avatar>
          <v-toolbar-title class="subheading">Persona</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="cerrarQuestionPersona()">
              <v-icon class="grey">close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-card-text
            class="text-lg-center text-md-center text-sm-center text-xsm-center title"
          >
            ¿La derivación se recibe con Solicitante?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click.native="conPersona(true)" class="success">Si</v-btn>
            <v-btn @click.native="sinPersona" class="error">No</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="questionContanto" max-width="500px">
      <v-card>
        <v-toolbar card dark color="grey lighten-4 primary--text">
          <v-avatar size="30">
            <v-icon class="grey lighten-2">person</v-icon>
          </v-avatar>
          <v-toolbar-title class="subheading">Persona</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="questionContanto = false">
              <v-icon class="grey">close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-card-text
            class="text-lg-center text-md-center text-sm-center text-xsm-center title"
          >
            ¿Se contactó con el Solicitante?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click.native="conPersona(true)" class="success">Si</v-btn>
            <v-btn @click.native="conPersona(false)" class="error">No</v-btn>
          </v-card-actions>          
        </v-card-text>
      </v-card>
    </v-dialog>
     <v-dialog
      v-model="loaderInterno"      
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Por favor espere
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import VeeValidate from "vee-validate";

import { error } from "util";

//** COMPONENTES */
import Vue from "vue"
import n401 from "../../components/m_jr/401";
import n403 from "../../components/m_jr/403";
import SolicitantesRequeridos from "../../components/m_jr/SolicitantesRequeridos";
import Delitos from "../../components/m_jr/Delitos";
import JSZip from 'jszip'
import {saveAs} from 'file-saver'
import moment from "moment";
import "moment/locale/es";
import alertify from "alertifyjs";
import { VueEditor } from "vue2-editor";
import { generarQRCodeBase64 } from './crearQR'

Vue.use(VeeValidate);

export default {
  components: {
    Delitos,
    n401,
    n403,
    "vue2-editor": VueEditor,
  },
  data: function () {
    return {
      show: true,
      e401: false,
      e403: false,
      showpage: true,
      componentKey: 0,
      filtros: false,
      loaderInterno: false,

      v_menu1: false,
      v_fechaInicial: "",
      v_fechaI: "",

      v_menu2: false,
      v_fechaFinal: "",
      v_fechaF: "",

      v_menu3: false,
      horarios: ["09:00", "11:00", "13:00", "15:00", "17:00"],
      contador: 0,
      //************************************ */
      type: "month",
      start: "",
      typeOptions: [
        { text: "Dia", value: "day" },
        { text: "Semana", value: "week" },
        { text: "Mes", value: "month" },
      ],
      events: [],
      listaC: [],
      dialogform: false,
      //************************************* */
      customToolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [
          "align",
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ color: [] }, { background: [] }],
      ],
      //**************************************
      // VARIABLES DE LA TABLA DE EXPEDIENTE */
      expedienteId: "",
      hechoid: "",
      noDerivacion: "",
      fechaExpediente: "",
      noExpediente: "",
      StatusGeneral: "",
      informacionStatus: "",
      nuc: "",
      fechaHoraSuceso: "",
      reseñaBreve: "",
      textoNoData: "Completa el formulario para ver el listado",
      textoNoDataN: "Completa el formulario para ver el listado",
      textoNoDataM: "Selecciona una agencia para ver los modulos disponibles",
      narrativa: "",
      v_direccionHecho: "",
      btnGuardar: true,
      u_nombrejr: "",
      //**************************************
      // VARIABLES DE LA TABLA DE ENVIO */
      envioId: "",
      //facilitadormoduloServicioId:'',
      //notificadormoduloServicioId:'',
      facilitadornotificadorId: "",
      autoridadqueDeriva: "",
      uqe_Distrito: "",
      uqe_DirSubProc: "",
      uqe_Agencia: "",
      uqe_Modulo: "",
      uqe_Nombre: "",
      uqe_Puesto: "",
      StatusGeneralEnvio: "",
      EspontaneoNoEspontaneo: "",
      panel: 0,
      moduloSeleccionado: "",
      primeraVezSubsecuente: "",
      ContadorNODerivacion: "",
      valueR: 'required',
      FechaRegistro: "",
      NoSolicitantes: "",
      //*************** */
      derivaciones: [],
      headers: [
        { text: "Abrir Expediente", value: "expediente", sortable: false },
        { text: "No Expediente", value: "noExpediente" },
        { text: "Autoridad quien deriva", value: "autoridadqueDeriva" },
        { text: "Agencia", value: "uqe_Agencia" },
        { text: "AMPO", value: "uqe_Nombre" },
        { text: "No Derivación", value: "noDerivacion" },
        { text: "Fecha", value: "fechaRegistroExpediente" },
        { text: "NUC", value: "nuc" },

        { text: "Status", value: "statusGeneral" },
      ],
      headersCitatorios: [
        { text: "No Expediente", value: "noExpediente" },
        { text: "Fecha y hora cita", value: "fechaHoraCita" },
        { text: "Solicitado por:", value: "solicitadoPor" },
        { text: "Dirigido a:", value: "dirigidoa_Nombre" },
        { text: "Tel(s):", value: "dirigidoa_Telefono" },
        { text: "Sesion:", value: "noSesion" },
        { text: "N° Cita:", value: "noCitatorio" },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      search: "",
      rowsPerPageItems: [10, 20, 30, 40, 50],
      pagination: {
        rowsPerPage: 50,
      },
      editedIndex: -1,
      //*************** */
      //*MODALES
      modal_Informacion: false,
      // modalCitatorios:false,
      modal_citatoriorecordatorio: false,
      modalProceso: false,
      //*************** */
      //VARIABLES GENERALES
      statusSolicitud: "Procedente",
      motivo: "",
      //*************** */
      //VARIABLES PARA EL REPORTE
      logo1: "",
      logo2: "",
      diragencia: "",
      telagencia: "",
      listarSolicitantes: [],
      listarRequeridos: [],
      //************************************************ */
      //************************************************ */
      //************************************************ */

      v_tipocitatorio: "",
      v_tiposcitatorios: [
        "Citatorio para que le de continuidad el Solicitante",
        "1ra cita Requerido",
      ],

      v_solicitantes: [],
      v_nombreSolicitantes: "",
      v_telefonosSolicitantes: "",

      v_requeridos: [],
      v_nombreRequeridos: "",
      v_menu1: false,
      v_fechacita: "",
      v_fechac: "",

      v_menu2: false,
      v_horacita: "",
      v_horac: "",

      continuidad: "",

      citatorio1v1: "",
      citatorio1v2: "",

      citatorio2: "",
      citatorio3: "",
      modulos: "",
      horariosFacilitadores: [],

      //**************************************
      //VARIABLES REPORTE DE CITATORIO Y RECORDATORIO
      logo1: "",
      logo2: "",
      direccionAgencia: "",
      telefonosAgencia: "",
      titulo: "",
      nombre: "",
      correo: "",
      u_nombre: '',
      pdf_nombre: '',
      pdf_puesto: '',
      pdf_agencia: '',
      telefono: "",
      direccionS: "",
      direccionR: "",
      uf_Distrito: "",
      uf_DirSubProc: "",
      uf_Agencia: "",
      uf_Nombre: "",
      uf_Puesto: "",
      uf_Modulo: "",

      un_modulo: "",
      un_idModulo: "",
      un_nombre: "",
      un_puesto: "",

      fechaHoraCita: "",
      duracion: "",
      duracions: [
        { text: "120 min", value: "120" },
        { text: "105 min", value: "105" },
        { text: "90 min", value: "90" },
        { text: "75 min", value: "75" },
        { text: "60 min", value: "60" },
        { text: "45 min", value: "45" },
        { text: "30 min", value: "30" },
        { text: "15 min", value: "15" },
      ],
      horas1: [
        { text: "00:01 - 02:00", value: 2 },
        { text: "02:01 - 04:00", value: 2 },
        { text: "04:01 - 06:00", value: 2 },
        { text: "06:01 - 08:00", value: 2 },
        { text: "08:01 - 10:00", value: 2 },
        { text: "10:01 - 12:00", value: 2 },
        { text: "12:01 - 14:00", value: 2 },
        { text: "14:01 - 16:00", value: 2 },
        { text: "16:01 - 18:00", value: 2 },
        { text: "18:01 - 20:00", value: 2 },
        { text: "20:01 - 22:00", value: 2 },
        { text: "22:01 - 00:00", value: 2 },
      ],
      //************************************************ */
      v_facilitador: "",
      v_facilitadores: [],
      v_modulo: "",
      v_modulos: [],
      v_agencia: "",
      v_agencias: [],
      v_notificador: "",
      v_facilitadorFiltro: "",
      v_notificadores: [],
      idDistritoOrigen: '',

      v_delito: "",
      v_delitosPDF: [],
      v_delitos: [],
      //************************************************ */
      //************************************************ */
      modal_Registro: false,
      //************************************************ */
      asignaciones: [],
      usuarioActual: "",

      //*********************************************** */
      texto: "",
      comilla: '"',
      horas: "",
      texto2: "",
      tipo2: "",
      texto3: "",
      manifesto: "",
      hechos: "",
      representantesf: "",
      personaf: "",
      inicialesf: "",

      acvictima: "",
      acnombre: "",
      psimenor: "",
      puestopsi: "",
      numerooficio: "",
      clasificacionPersona: "",
      nombre: "",
      alias: "",
      tipopersona: "",
      curp: "",
      docIdentificacion: "",
      nacionalidad: "",
      tel: "",
      email: "",
      genero: "",
      sexo: "",
      fechaNacimiento: "",
      medionotificacion: "",
      ocupacion: "",
      nivelestudio: "",
      religion: "",
      lengua: "",
      estadocivil: "",
      tipodiscapacidad: "",
      direccionpersonal: "",
      edad: "",
      aux1: 0,
      aux2: 0,
      //*********************************************** */
      direccionAgenciaqe: "",
      telefonosAgenciaqe: "",

      citatoriosrecordatorios: [],

      //**************No Espontaneo************************ */
      fCita: "",
      switch2: false,
      h_menu: "",
      h_horacita: "",
      modulosNE: "",
      v_facilitadorNE: "",
      v_notificadorNE: "",
      v_lugarcita: "direAgencia",
      duracion: "",
      duracions: [
        { text: "15 min", value: "15" },
        { text: "30 min", value: "30" },
        { text: "45 min", value: "45" },
        { text: "60 min", value: "60" },
        { text: "75 min", value: "75" },
        { text: "90 min", value: "90" },
        { text: "105 min", value: "105" },
        { text: "120 min", value: "120" },
      ],
      //*********************************************** */

      questionPersona: false,
      questionContanto: false,
      casodeSolicitud: 0,
      vali: "",
      Solicitante: [],
      TelSoli: [],
      DSoli: [],
      AllSoli: [],
      Requerido: [],
      TelReq: [],
      DReq: [],
      AllRequi: [],
      DelitoD: [],
      AllReq: [],
      modalDate: false,
      modalTime: false,
      idConjuntos: [],
      conjunto: [],
      direAgencia: "",
      solicitadoPor: "",
      oficio: "",
      direccion: "",
      derivacion: "",
      idSesions: [],
      conjuntosDetalles: [],
      solicitadosHR: [],
      requeridosHR: [],
      delitosHR: [],
      repreSoli: [],
      repreReq: [],
      solicitanteC: [],
      requeridoC: [],
      representante: "",
      pdfUrl: "",
      filterDerivaciones: [],
      idMujeres:'1ee62db8-9551-4cc8-8213-7166a329109e',
      idCavi: '8a9aa323-bca6-4656-88c5-b8f5db7181a3',
      pdfs: [],
      //-----------------------------------------------
      personasC:[],
      delitosC: [],
      guardadoTotal: 1 ,
      texto: 'Vista Previa',
      qrCode: '',
      qrCodeR: '',
      qrCodeC: '',
      docRemision: 'Remisión',
      vistaPreviaTF: true,
      delitoparacitatorio: '',
      arrayRepresentantes: [],

      //Variables para asignacion de expedientes

      nombreFacilitadorSeleccionado: '',

    };
  },
  mounted() {},
  created() {
    let me = this;    
    me.u_iddistrito = me.$store.state.usuario.iddistrito;
    me.u_distrito = me.$store.state.usuario.distrito;
    me.u_dirSubPro = me.$store.state.usuario.dirSubProc;
    me.u_idagencia = me.$store.state.usuario.idagencia;
    me.u_agencia = me.$store.state.usuario.agencia;
    me.u_idmoduloservicio = me.$store.state.usuario.idmoduloservicio;
    me.u_modulo = me.$store.state.usuario.modulo;
    me.u_idusuario = me.$store.state.usuario.idusuario;
    me.usuarioActual = me.$store.state.usuario.usuario;
    me.u_nombre = me.$store.state.usuario.usuario;
    me.pdf_nombre = me.$store.state.usuario.usuario
    me.pdf_puesto = me.$store.state.usuario.puesto  
    me.pdf_agencia = me.$store.state.usuario.agencia
    me.u_clave = me.$store.state.usuario.clave;
    me.u_rol = me.$store.state.usuario.rol;
    me.u_email = me.$store.state.usuario.email;
    
    var currentDate = new Date();
    this.start = moment(new Date()).format("YYYY-MM-DD");

    me.v_fechaI = moment(new Date()).format("YYYY-MM-DD");
    me.v_fechaF = moment(new Date()).format("YYYY-MM-DD");

    me.listarDerivacionesInicial();
    me.listarSede();
    me.informacionagencia();
    me.listarLogo();
    me.dirAgencia();

    // INTERCEPTOR MODULO DE JUSTICIA RESTAURATIVA
    axios.interceptors.request.use(
      (config) => {
        me.$store.commit("LOADER", true);
        return config;
      },
      (error) => {
        me.$store.commit("LOADER", false);
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      (response) => {
        me.$store.commit("LOADER", false);
        return response;
      },
      (error) => {
        me.$store.commit("LOADER", false);
        return Promise.reject(error);
      }
    );
  },
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      this.events.forEach((e) => (map[e.date] = map[e.date] || []).push(e));
      return map;
    },
    btnTitle() {
      return this.statusSolicitud === "Procedente"
        ? "Asignar solicitud"
        : "Rechazar solicitud";
    },
    switchLabel() {
      return this.switch2 ? "Espontaneo" : "No Espontaneo";
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
    }
  },
  watch: {
    fCita(val) {
      if(val != '' && this.modulos != '') {
        this.listarHorariosFacilitadores()
      }
    },
    h_horacita: "disponibilidadFacilitador",
    duracion: "disponibilidadFacilitador",
    modulos(val) {
      let me = this                 

      if (val != '') {
        me.disponibilidadFacilitador()  

        if(me.v_modulos.length > 0) {
          me.moduloSeleccionado = me.v_modulos.find(x => x.value == val).text
        }      
  
        if (me.fCita != '') {
          me.listarHorariosFacilitadores()
        }         
      }
    },
    pdfs(val) {
      let me = this 

      let total = 0    

      if (me.casodeSolicitud == 1) {
        total = (me.aux1) + 2                 
      } else {
        total = (me.aux1) + 1                         
      }
            
      if (val.length == total) {        
        me.archivoComprimido()  
      }
    },
    qrCode(val) {
      let me = this

      if (val != '') {
        if (me.docRemision == 'Hoja de registro') {          
          var ddHR = me.crearPdfHR();      
          me.pdfs.push({ name: 'Hoja de registro', documento: ddHR })
        }        
      }
    },
    qrCodeR(val) {
      let me = this

      if (val != '') {        
        if (me.docRemision == 'Recordatorio') {          
          var ddR = me.recordatoriosPDF()  
          me.pdfs.push({ name: 'Recordatorio', documento: ddR })  
        }
      }
    },
    qrCodeC(val) {
      let me = this 

      if (val != 'Citatorio' && val != '') {
        if (me.docRemision == 'Citatorio') {          
          var dd = me.citatoriosPDF()
          me.pdfs.push({ name: 'Citatorio', delito: me.delitoparacitatorio, documento: dd })          
        }
      }
    },
    v_agencia(val) {      
      let me = this

      me.limpiarFormulario()

      if (val != '') {        
        var aux = val.valueM
        me.v_modulos = []
        me.v_facilitador = ''
        me.v_notificador = ''
        
        if (aux.length > 0) {
          aux.map(a => {
            me.v_modulos.push({
              text: a.nombre,
              value: a.idModuloServicio
            })          
          })          
        } else {
          me.textoNoDataM = 'La agencia no cuenta con modulos'  
        }
      } else {        
        me.textoNoDataM = 'Selecciona una agencia para ver los modulos disponibles'  
      }
    },
    switch2(val) {
      let me = this 
      me.v_agencia = ''
      me.limpiarFormulario()
    }
  },
  methods: {
    //************************************************************************************************************************************************************************************ */
    //* FUNCIONES DE INFORMACIÓN GENERAL Y DERIVACIÓN
    //************************************************************************************************************************************************************************************ */
    dirAgencia() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$cat
        .get("api/RAPs/ListarDireccionAgencia/" + me.u_idagencia, configuracion)
        .then(function (response) {
          me.direAgencia = response.data[0].direccion;
          me.v_lugarcita = response.data[0].direccion;
        })
        .catch(function (err) {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (me.e401 = true), (me.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    listarSede() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      this.$conf
        .get("api/Distritoes/ListarSede/" + me.u_iddistrito, configuracion)
        .then(function (response) {
          me.u_nombrejr = response.data.sede;
        })
        .catch(function (error) {
          if (error.response.status == 401) {
            (me.e401 = true), (me.showpage = false);
          } else if (error.response.status == 403) {
            me.e403 = true;
            me.showpage = false;
          } else if (error.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify(error.message, "error");
          }
        });
    },
    listarLogo() {
      let me = this;

      this.$conf
        .get("api/ConfGlobals/Listar")
        .then(function (response) {
          me.logo1 = response.data.logo1;
          me.logo2 = response.data.logo2;
          me.logo3 = response.data.logo3;
          me.logo4 = response.data.logo4;
        })
        .catch(function (error) {
          me.$notify("Error al leer la configuracion global !!!", "error");
        });
    },
    informacionagencia() {
      let me = this;
      me.$conf
        .get("api/Agencias/Listarporid/" + me.u_idagencia)
        .then(function (response) {
          me.direccionAgencia = response.data.direccion;
          me.telefonosAgencia = response.data.telefono;
        })
        .catch(function (error) {
          me.$notify(
            "Error al intentar leer la informacion de agencia!!!",
            "error"
          );
        });
    },
    listarModulos() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var modulosarray = [];
      me.$justiciarestaurativa.get(
          "api/FacilitadorNotificadors/ListarM/" +
            me.u_iddistrito +
            "/" +
            me.u_idagencia,
          configuracion
        )
        .then(function (response) {
          modulosarray = response.data;
          modulosarray.map(function (x) {
            me.v_modulos.push({
              text: x.nombreModulo,
              value: x.moduloServicioId,
            });
          });
        })
        .catch(function (error) {
          me.$notify(error.message, "error");
        });
    },
    //************************************************************************************************************************************************************************************ */
    //* FUNCIONES DE FLUJO PARA LA ASIGNACIÓN
    //************************************************************************************************************************************************************************************ */
    async obtenerConjuntosDeApi(idSesion) {
      const header = { Authorization: "Bearer " + this.$store.state.token };
      const configuracion = { headers: header };
      try {
        const response = await me.$justiciarestaurativa.get(`api/SesionsConjunto/ListarSRD/${idSesion}`, configuracion);
        return response.data; // Suponiendo que la respuesta contiene el arreglo de conjuntos de IDs
      } catch (error) {        
        return [];
      }
    },
    async obtenerDetallesDelito(ids, urlBase) {
      const idArray = ids.split(";");
      const detallesPromises = idArray.map((id) =>
        this.obtenerDetalleDelito(urlBase, id)
      );
      return await Promise.all(detallesPromises);
    },
    async obtenerDetalleDelito(url, id) {
      try {
        const me = this;
        const header = { Authorization: "Bearer " + this.$store.state.token };
        const configuracion = { headers: header };
        const response = await me.$justiciarestaurativa.get(url + "/" + id, configuracion);
        return response.data;
      } catch (error) {        
        return null;
      }
    },
    async obtenerDetalles(ids, urlBase) {
      const idArray = ids.split(";");
      const detallesPromises = idArray.map((id) =>
        this.obtenerDetalle(urlBase, id)
      );
      return await Promise.all(detallesPromises);
    },
    async obtenerDetalle(url, id) {
      try {
        const header = { Authorization: "Bearer " + this.$store.state.token };
        const configuracion = { headers: header };
        const response = await this.$cat.get(url + "/" + id, configuracion);
        return response.data;
      } catch (error) {        
        return null;
      }
    },
    async obtenerPersonaDetalle(idPersona) {
      const idArray = idPersona.split(";");
      const detallesPromises = idArray.map((idPersona) =>
        this.obtenerDetallesPersona(
          "api/Responsablejrs/ResponsaableXPersona",
          idPersona
        )
      );
      return await Promise.all(detallesPromises);
    },
    async obtenerDetallesPersona(urlBase, ids) {
      try {
        const header = { Authorization: "Bearer " + this.$store.state.token };
        const configuracion = { headers: header };
        const response = await me.$justiciarestaurativa.get(urlBase + "/" + ids, configuracion);
        return response.data;
      } catch (error) {        
        return null;
      }
    },
    async obtenerDetallesSesion(ids, urlBase) {
      const idArray = ids.split(";");
      const detallesPromises = idArray.map((id) =>
        this.obtenerDetalleSesion(urlBase, id)
      );
      return await Promise.all(detallesPromises);
    },
    async obtenerDetalleSesion(url, id) {
      try {
        const me = this;
        const header = { Authorization: "Bearer " + this.$store.state.token };
        const configuracion = { headers: header };
        const response = await me.$justiciarestaurativa.get(url + "/" + id, configuracion);
        return response.data;
      } catch (error) {        
        return null;
      }
    },
    async procesarConjuntos() 
    {
      const me = this;
      const urlSolicitada = "api/RAPs/ListarPersonaPDF";
      const urlRequerida = "api/RAPs/ListarPersonaPDF";
      const urlDelito = "api/Delitoes/ListarDelitoConjunto";
      const urlSesion = "api/Sesions/ListarPrimeraSesion"

      const conjuntosIdsPromises = me.idSesions.map((a) => 
      {
        return me.obtenerConjuntosDeApi(a.value.idSesion);
      });

      const conjuntosIdsResults = await Promise.all(conjuntosIdsPromises);

      const conjuntosDetallesPromises = conjuntosIdsResults.flat().map(async (conjunto) => 
      {
          const { solicitadosC, requeridosC, idConjuntoDerivaciones, envioId } = conjunto;

          const [solicitadas, requeridas, delitos, sesion] = await Promise.all
          ([
            solicitadosC ? this.obtenerDetalles(solicitadosC, urlSolicitada) : [],
            requeridosC ? this.obtenerDetalles(requeridosC, urlRequerida) : [],
            idConjuntoDerivaciones ? this.obtenerDetallesDelito(idConjuntoDerivaciones, urlDelito) : [],
            envioId ? this.obtenerDetallesDelito(envioId, urlSesion) : [],
          ]);

          // Para cada solicitada, obtiene los detalles del responsable y los agrega
          for (let i = 0; i < solicitadas.length; i++) 
          {
            if (solicitadas[i][0].idPersona) 
            {
              const responsable = await this.obtenerPersonaDetalle(solicitadas[i][0].idPersona)              

              //Se valida si existe el representante en las tablas de JR
              if (responsable[0].responsable) {                
                // en caso de que el representante ya este cargado en JR, se pasa ese valor
                solicitadas[i][0].responsable = responsable                
              } else {
                //En caso de que no existan los representantes ya cargados, los obtendrá del arreglo de la columna de arregloRepresentantes de la tabla de envio

                // Se filtra unicamente el representante que corresponda al id de la persona  
                var otro = me.arrayRepresentantes.filter(o => o.idPersona == solicitadas[i][0].idPersona)

                // En caso de que si exista un representante desde UMIXTA, es lo que se va a cargar, en caso contrario se retorna un key con valor de false para que el PDF valide el estatus y continue con el proceso
                solicitadas[i][0].responsable = (otro.length > 0) ? otro : [{responsable: false}]                
              }

            }
          }

          // Para cada requerida, obtiene los detalles del responsable y los agrega
          for (let i = 0; i < requeridas.length; i++) 
          {
            if (requeridas[i][0].idPersona) {
              const responsable = await this.obtenerPersonaDetalle(requeridas[i][0].idPersona)              

              //Se valida si existe el representante en las tablas de JR
              if (responsable[0].responsable) {
                // en caso de que el representante ya este cargado en JR, se pasa ese valor
                requeridas[i][0].responsable = responsable
              } else {
                //En caso de que no existan los representantes ya cargados, los obtendrá del arreglo de la columna de arregloRepresentantes de la tabla de envio

                // Se filtra unicamente el representante que corresponda al id de la persona  
                var otro = me.arrayRepresentantes.filter(o => o.idPersona == requeridas[i][0].idPersona)

                // En caso de que si exista un representante desde UMIXTA, es lo que se va a cargar, en caso contrario se retorna un key con valor de false para que el PDF valide el estatus y continue con el proceso
                requeridas[i][0].responsable = (otro.length > 0) ? otro : [{responsable: false}]
              }              
            }
          }
          return {
            solicitadas,
            requeridas,
            delitos,
            sesion,
          };

        });
      
      this.conjuntosDetalles = await Promise.all(conjuntosDetallesPromises);


    },
    async reimprimirHojadeRegistro() 
    {
      let me = this;

      await me.procesarConjuntos();  

      me.conjuntosDetalles.map((x) => 
      {
        x.solicitadas.forEach((dd, index) => 
        {
          me.solicitadosHR.push({
            value: dd[0].idPersona,
            nombre: dd[0].nombreCompleto,
            edad: dd[0].edad,
            originario: dd[0].entidadFederativa,
            nacionalidad: dd[0].nacionalidad,
            sexo: dd[0].sexo,
            estadofam: dd[0].estadoCivil,
            fechanac: dd[0].fechaNacimiento,
            escolaridad: dd[0].nivelEstudio,
            ocupacion: dd[0].ocupacion,
            domicilio: dd[0].direccion,
            identificacion: dd[0].docIdentificacion,
            curp: dd[0].curp,
            telefono: dd[0].telefonos,
            clasificacion: dd[0].clasificacion,
          });
        });

        x.requeridas.forEach((dd, index) => 
        {
          me.requeridosHR.push({
            value: dd[0].idPersona,
            nombre: dd[0].nombreCompleto,
            edad: dd[0].edad,
            originario: dd[0].entidadFederativa,
            nacionalidad: dd[0].nacionalidad,
            sexo: dd[0].sexo,
            estadofam: dd[0].estadoCivil,
            fechanac: dd[0].fechaNacimiento,
            escolaridad: dd[0].nivelEstudio,
            ocupacion: dd[0].ocupacion,
            domicilio: dd[0].direccion,
            identificacion: dd[0].docIdentificacion,
            curp: dd[0].curp,
            telefono: dd[0].telefonos,
            clasificacion: dd[0].clasificacion,
          });
        });

        x.delitos.forEach((x, index) => 
        {
          me.delitosHR.push({
            text: x[index].nombreDelito,
            valor1: x[index].intensionDelito,
            valor2: x[index].violenciaSinViolencia,
            valor3: x[index].armaBlanca,
            valor4: x[index].armaFuego,
            valor5: x[index].conAlgunaParteCuerpo,
            valor6: x[index].conotroElemento,
          });
        });
      });

      setTimeout(() => 
      {
        me.close();
        me.listarDerivacionesInicial();
        me.limpiar();
      }, 1000);
      

      me.qrCode = ''

      me.docRemision = 'Hoja de registro'

      let fechaQR = new Date()

      me.vistaPreviaTF = false

      me.generarQR(me.docRemision,me.nuc,me.u_nombre,fechaQR,me.expedienteId)    
    },
    crearPdfHR() {   
      let me = this   
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");      
      var logo1 = this.logo1;
      var logo2 = this.logo2;
      var logo3 = this.logo3;
      var logo4 = this.logo4;
      var diragencia = this.direccionAgencia;
      var telagencia = this.telefonosAgencia;

      this.nombresSolicitantes(this.v_solicitantes)

      var listadelito = "";
      for (var i = 0; i < this.v_delitos.length; i++) {
        listadelito = listadelito + " " + this.v_delitos[i].text;
      }      

      var sourceDataD = this.delitosHR;
      var bodyDataDelitos = [];

      sourceDataD.forEach(function (sourceRow) {
        var dataRow = [];
        bodyDataDelitos.push(dataRow);
        dataRow.push(
          "Delito: " +
            sourceRow.text +
            "\nComisión: " +
            sourceRow.valor1 +
            "\nAcción: " +
            sourceRow.valor2 +
            "\nElemento para la comision: " +
            (sourceRow.valor3 == true
              ? "Arma de Fuego"
              : sourceRow.valor4 == true
              ? "Arma Blanca"
              : sourceRow.valor5 !== "Na"
              ? sourceRow.valor5
              : sourceRow.valor6 !== "Na"
              ? sourceRow.valor6
              : "No se especifica") +
            "\n\n"
        );
      });
      
      var bodyDataSolicitantesL = [];
      for (var i = 0; i < this.solicitadosHR.length; i++) {
        var dataRow = [];
        dataRow.push();
        bodyDataSolicitantesL.push(this.solicitadosHR[i].text + "\n");
      }
      
      var sourceDataS =
        this.vali == true ? this.solicitadosHR : this.v_solicitantes;
      var solis = [];
      sourceDataS.map((rr) => {
        if (!solis.includes(rr.nombre)) {
          solis.push(rr.nombre);          
        }
      });

      if (this.vali == true) {
        var bodyDataSolicitantes = [];
        sourceDataS.forEach(function (sourceRow) {
          var dataRow = [];
          bodyDataSolicitantes.push(dataRow);
          dataRow.push("Nombre: " + sourceRow.nombre + "                             Edad:" + sourceRow.edad +
              "\nOriginario de: " + (sourceRow.originario !== null ? sourceRow.originario : "SE DESCONOCE") + "                 Nacionalidad: " + sourceRow.nacionalidad +
              "\nSexo: " + (sourceRow.sexo === "M" ? "MUJER" : "HOMBRE") + "   Estado familiar: " + (sourceRow.estadofam !== "" ? sourceRow.estadofam : "SE DESCONOCE") + "    Fecha de Nacimiento: " + (sourceRow.fechanac !== null ? sourceRow.fechanac : "SE DESCONOCE") +
              "\nEscolaridad: " + (sourceRow.escolaridad !== "" ? sourceRow.escolaridad : "SE DESCONOCE") + "             Ocupación: " + (sourceRow.ocupacion !== "" ? sourceRow.ocupacion : "SE DESCONOCE") +
              "\nDomicilio: " + (sourceRow.domicilio !== ", No.Ext S/N, CP 0, , , " ? sourceRow.domicilio : "SE DESCONOCE") +
              "\nSe identifica con: " + sourceRow.identificacion + "           CURP: " + sourceRow.curp +
              "\nTelefono: " + (sourceRow.telefono !== ", " ? sourceRow.telefono : "SE DESCONOCE") +
              "\n\n"
          );
        });
      } else {
        var bodyDataSolicitantes = [];
        sourceDataS.forEach(function (sourceRow) {
          var dataRow = [];
          bodyDataSolicitantes.push(dataRow);
          dataRow.push(
            "Nombre: " +
              (sourceRow.text == null ||
              sourceRow.text == undefined ||
              sourceRow.text == ""
                ? "SE DESCONOCE"
                : sourceRow.text) +
              "                                   Edad:" +
              (sourceRow.edad == null ||
              sourceRow.edad == undefined ||
              sourceRow.edad == ""
                ? "SE DESCONOCE"
                : sourceRow.edad) +
              "\nOriginario de: " +
              (sourceRow.valor5 == undefined ||
              sourceRow.valor5 == null ||
              sourceRow.valor5 == ""
                ? "SE DESCONOCE"
                : sourceRow.valor5) +
              "                 Nacionalidad: " +
              (sourceRow.nacionalidad == undefined ||
              sourceRow.nacionalidad == null ||
              sourceRow.nacionalidad == ""
                ? "SE DESCONOCE"
                : sourceRow.nacionalidad) +
              "\nSexo: " +
              (sourceRow.valor4 == undefined ||
              sourceRow.valor4 == null ||
              sourceRow.valor4 == ""
                ? "SE DESCONOCE"
                : sourceRow.valor4) +
              "            Estado familiar: " +
              (sourceRow.valor6 == null ||
              sourceRow.valor6 == undefined ||
              sourceRow.valor6 == ""
                ? "SE DESCONOCE"
                : sourceRow.valor6) +
              "     Fecha de Nacimiento: " +
              (sourceRow.valor7 == undefined ||
              sourceRow.valor7 == null ||
              sourceRow.valor7 == ""
                ? "SE DESCONOCE"
                : sourceRow.valor7) +
              "\nEscolaridad: " +
              (sourceRow.valor9 == undefined ||
              sourceRow.valor9 == null ||
              sourceRow.valor9 == ""
                ? "SE DESCONOCE"
                : sourceRow.valor9) +
              "            Ocupación: " +
              (sourceRow.ocupacion == null ||
              sourceRow.ocupacion == undefined ||
              sourceRow.ocupacion == ""
                ? "SE DESCONOCE"
                : sourceRow.ocupacion) +
              "\nDomicilio: " +
              (sourceRow.direccion == undefined ||
              sourceRow.direccion == null ||
              sourceRow.direccion == ""
                ? "SE DESCONOCE"
                : sourceRow.direccion) +
              "\nSe identifica con: " +
              (sourceRow.identificacion == null ||
              sourceRow.identificacion == undefined ||
              sourceRow.identificacion == ""
                ? "SE DESCONOCE"
                : sourceRow.identificacion) +
              "        CURP: " +
              (sourceRow.valor8 == null ||
              sourceRow.valor8 == undefined ||
              sourceRow.valor8 == ""
                ? "SE DESCONOCE"
                : sourceRow.valor8) +
              "\nTelefono: " +
              (sourceRow.valor2 == null ||
              sourceRow.valor2 == undefined ||
              sourceRow.valor2 == ""
                ? "SE DESCONOCE"
                : sourceRow.valor2) +
              "\n\n"
          );
        });
      }      

      if (this.vali == true) {
        var sourceDataR = this.requeridosHR;
        var bodyDataRequeridos = [];
        sourceDataR.forEach(function (sourceRow) {
          var dataRow = [];
          dataRow.push(
            "Nombre: " +
              sourceRow.nombre +
              "                             Edad:" +
              sourceRow.edad +
              "\nOriginario de: " +
              (sourceRow.originario !== null
                ? sourceRow.originario
                : "SE DESCONOCE") +
              "                 Nacionalidad: " +
              sourceRow.nacionalidad +
              "\nSexo: " +
              (sourceRow.sexo === "M" ? "MUJER" : "HOMBRE") +
              "   Estado familiar: " +
              (sourceRow.estadofam !== ""
                ? sourceRow.estadofam
                : "SE DESCONOCE") +
              "    Fecha de Nacimiento: " +
              (sourceRow.fechanac !== null
                ? sourceRow.fechanac
                : "SE DESCONOCE") +
              "\nEscolaridad: " +
              (sourceRow.escolaridad !== ""
                ? sourceRow.escolaridad
                : "SE DESCONOCE") +
              "             Ocupación: " +
              (sourceRow.ocupacion !== ""
                ? sourceRow.ocupacion
                : "SE DESCONOCE") +
              "\nDomicilio: " +
              (sourceRow.domicilio !== ", No.Ext S/N, CP 0, , , "
                ? sourceRow.domicilio
                : "SE DESCONOCE") +
              "\nSe identifica con: " +
              sourceRow.identificacion +
              "           CURP: " +
              sourceRow.curp +
              "\nTelefono: " +
              (sourceRow.telefono !== ", "
                ? sourceRow.telefono
                : "SE DESCONOCE") +
              "\n\n"
          );
          bodyDataRequeridos.push(dataRow);
        });
      } else {
        var sourceDataR = this.v_requeridos;
        var bodyDataRequeridos = [];
        sourceDataR.forEach(function (sourceRow) {
          var dataRow = [];
          dataRow.push(
            "Nombre: " +
              (sourceRow.text == null ||
              sourceRow.text == undefined ||
              sourceRow.text == ""
                ? "SE DESCONOCE"
                : sourceRow.text) +
              "                                   Edad:" +
              (sourceRow.edad == null ||
              sourceRow.edad == undefined ||
              sourceRow.edad == ""
                ? "SE DESCONOCE"
                : sourceRow.edad) +
              "\nOriginario de: " +
              (sourceRow.valor5 == undefined ||
              sourceRow.valor5 == null ||
              sourceRow.valor5 == ""
                ? "SE DESCONOCE"
                : sourceRow.valor5) +
              "                 Nacionalidad: " +
              (sourceRow.nacionalidad == undefined ||
              sourceRow.nacionalidad == null ||
              sourceRow.nacionalidad == ""
                ? "SE DESCONOCE"
                : sourceRow.nacionalidad) +
              "\nSexo: " +
              (sourceRow.valor4 == undefined ||
              sourceRow.valor4 == null ||
              sourceRow.valor4 == ""
                ? "SE DESCONOCE"
                : sourceRow.valor4) +
              "            Estado familiar: " +
              (sourceRow.valor6 == null ||
              sourceRow.valor6 == undefined ||
              sourceRow.valor6 == ""
                ? "SE DESCONOCE"
                : sourceRow.valor6) +
              "     Fecha de Nacimiento: " +
              (sourceRow.valor7 == undefined ||
              sourceRow.valor7 == null ||
              sourceRow.valor7 == ""
                ? "SE DESCONOCE"
                : sourceRow.valor7) +
              "\nEscolaridad: " +
              (sourceRow.valor9 == undefined ||
              sourceRow.valor9 == null ||
              sourceRow.valor9 == ""
                ? "SE DESCONOCE"
                : sourceRow.valor9) +
              "            Ocupación: " +
              (sourceRow.ocupacion == null ||
              sourceRow.ocupacion == undefined ||
              sourceRow.ocupacion == ""
                ? "SE DESCONOCE"
                : sourceRow.ocupacion) +
              "\nDomicilio: " +
              (sourceRow.direccion == undefined ||
              sourceRow.direccion == null ||
              sourceRow.direccion == ""
                ? "SE DESCONOCE"
                : sourceRow.direccion) +
              "\nSe identifica con: " +
              (sourceRow.identificacion == null ||
              sourceRow.identificacion == undefined ||
              sourceRow.identificacion == ""
                ? "SE DESCONOCE"
                : sourceRow.identificacion) +
              "        CURP: " +
              (sourceRow.valor8 == null ||
              sourceRow.valor8 == undefined ||
              sourceRow.valor8 == ""
                ? "SE DESCONOCE"
                : sourceRow.valor8) +
              "\nTelefono: " +
              (sourceRow.valor2 == null ||
              sourceRow.valor2 == undefined ||
              sourceRow.valor2 == ""
                ? "SE DESCONOCE"
                : sourceRow.valor2) +
              "\n\n"
          );
          bodyDataRequeridos.push(dataRow);
        });
      }      

      var dia = moment(this.fechaHoraCita).format("DD");
      var mes = moment(this.fechaHoraCita).format("MMMM");
      var año = moment(this.fechaHoraCita).format("YYYY");
      var hr = moment(this.fechaHoraCita).format("h:mm:ss a");
      var pdf_distrito = this.uf_Distrito;
      var pdf_dirsubproc =
        "Dirección General del Centro de Justicia Restaurativa";
      var pdf_agencia = this.uf_Agencia;
      var pdf_usuario = this.uf_Nombre;
      var pdf_puesto = this.uf_Puesto;
      var pdf_modulo = this.uf_Modulo;
      var fecha = dia + " de " + mes + " del " + año + ", " + hr;

      var fr = this.formatearfechaTexo(this.fechaDerivacion);
      var fe = this.formatearfechaTexo(this.fechaExpediente);      
      var html_reseña = htmlToPdfmake(this.reseñaBreve);
      var fechacita = this.formatearfechaTexo(this.fechaHoraCita);
      var horacita = this.formatearfechahora(this.fechaHoraCita).substr(10, 14);      

      var d = [];
      
      var array = this.conjuntosDetalles.length;

      let index = 0;
      
      this.conjuntosDetalles.map((qw) => 
      {
        var fechacita = this.formatearfechaTexo(qw.sesion[0][0].fechaHora);
        var horacita = this.formatearfechahora(qw.sesion[0][0].fechaHora).substr(10, 14);

        d.push
        ( 
          {
            style: "table2",
            table: 
            {
              headerRows: 1,
              widths: ["*"],
              body: [
              [
                {
                  text: "DATOS DEL (LA) SOLICITANTE(S)",
                  style: "tableHeader",
                },
              ],
              [
                qw.solicitadas.map((a) => 
                {
                  return {
                    text:
                      "Nombre: " +
                      a[0].nombreCompleto +
                      "                             Edad:" +
                      a[0].edad +
                      "\nOriginario de: " +
                      (a[0].entidadFederativa !== null
                        ? a[0].entidadFederativa
                        : "SE DESCONOCE") +
                      "                 Nacionalidad: " +
                      a[0].nacionalidad +
                      "\nSexo: " +
                      (a[0].sexo === "M" ? "MUJER" : "HOMBRE") +
                      "   Estado familiar: " +
                      (a[0].estadoCivil !== ""
                        ? a[0].estadoCivil
                        : "SE DESCONOCE") +
                      "    Fecha de Nacimiento: " +
                      (a[0].fechaNacimiento !== null
                        ? a[0].fechaNacimiento
                        : "SE DESCONOCE") +
                      "\nEscolaridad: " +
                      (a[0].nivelEstudio !== ""
                        ? a[0].nivelEstudio
                        : "SE DESCONOCE") +
                      "             Ocupación: " +
                      (a[0].ocupacion !== ""
                        ? a[0].ocupacion
                        : "SE DESCONOCE") +
                      "\nDomicilio: " +
                      (a[0].direccion !== ", No.Ext S/N, CP 0, , , "
                        ? a[0].direccion
                        : "SE DESCONOCE") +
                      "\nSe identifica con: " +
                      a[0].docIdentificacion +
                      "           CURP: " +
                      a[0].curp +
                      "\nTelefono: " +
                      (a[0].telefonos !== ", "
                        ? a[0].telefonos
                        : "SE DESCONOCE") +
                      "\n\n" +
                      (a[0].responsable[0].responsable == true
                        ? "Representado por " +
                          a[0].responsable[0].nombreCompleto +
                          " con dirección " +
                          a[0].responsable[0].direccion +
                          ", con telefono " +
                          a[0].responsable[0].telefono +
                          ", con correo " +
                          a[0].responsable[0].correo +
                          "\n\n"
                        : ""),
                  };
                }),
              ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return i === 0 || i === node.table.body.length
                  ? "black"
                  : "gray";
              },
              vLineColor: function (i, node) {
                return i === 0 || i === node.table.widths.length
                  ? "black"
                  : "gray";
              },
            },
          },
          {
            style: "table2",
            table: {
              headerRows: 1,
              widths: ["*"],
              body: [
                [{ text: "DATOS DEL (LA) REQUERIDO(S)", style: "tableHeader" }],
                [
                  qw.requeridas.map((b) => {
                    return {
                      text:
                        "Nombre: " +
                        b[0].nombreCompleto +
                        "                             Edad:" +
                        b[0].edad +
                        "\nOriginario de: " +
                        (b[0].entidadFederativa !== null
                          ? b[0].entidadFederativa
                          : "SE DESCONOCE") +
                        "                 Nacionalidad: " +
                        b[0].nacionalidad +
                        "\nSexo: " +
                        (b[0].sexo === "M" ? "MUJER" : "HOMBRE") +
                        "   Estado familiar: " +
                        (b[0].estadoCivil !== ""
                          ? b[0].estadoCivil
                          : "SE DESCONOCE") +
                        "    Fecha de Nacimiento: " +
                        (b[0].fechaNacimiento !== null
                          ? b[0].fechaNacimiento
                          : "SE DESCONOCE") +
                        "\nEscolaridad: " +
                        (b[0].nivelEstudio !== ""
                          ? b[0].nivelEstudio
                          : "SE DESCONOCE") +
                        "             Ocupación: " +
                        (b[0].ocupacion !== ""
                          ? b[0].ocupacion
                          : "SE DESCONOCE") +
                        "\nDomicilio: " +
                        (b[0].direccion !== ", No.Ext S/N, CP 0, , , "
                          ? b[0].direccion
                          : "SE DESCONOCE") +
                        "\nSe identifica con: " +
                        b[0].docIdentificacion +
                        "           CURP: " +
                        b[0].curp +
                        "\nTelefono: " +
                        (b[0].telefonos !== ", "
                          ? b[0].telefonos
                          : "SE DESCONOCE") +
                        "\n\n" +
                        (b[0].responsable[0].responsable == true
                          ? "Representado por " +
                            b[0].responsable[0].nombreCompleto +
                            " con dirección " +
                            b[0].responsable[0].direccion +
                            ", con telefono " +
                            b[0].responsable[0].telefono +
                            ", con correo " +
                            b[0].responsable[0].correo +
                            "\n\n"
                          : ""),
                    };
                  }),
                ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return i === 0 || i === node.table.body.length
                  ? "black"
                  : "gray";
              },
              vLineColor: function (i, node) {
                return i === 0 || i === node.table.widths.length
                  ? "black"
                  : "gray";
              },
            },
          },
          {
            style: "table2",
            table: {
              headerRows: 1,
              widths: ["*"],
              body: [
                [{ text: "DETALLE DELITO", style: "tableHeader" }],
                [
                  qw.delitos[0].map((c) => {
                    return {
                      text:
                        "Delito: " +
                        c.nombreDelito +
                        "\nComisión: " +
                        c.intensionDelito +
                        "\nAcción: " +
                        c.violenciaSinViolencia +
                        "\nElemento para la comision: " +
                        (c.armaBlanca == true
                          ? "Arma de Fuego"
                          : c.armaFuego == true
                          ? "Arma Blanca"
                          : c.conAlgunaParteCuerpo !== "Na"
                          ? c.conAlgunaParteCuerpo
                          : c.conotroElemento !== "Na"
                          ? c.conotroElemento
                          : "No se especifica") +
                        "",
                    };
                  }),
                ],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return i === 0 || i === node.table.body.length
                  ? "black"
                  : "gray";
              },
              vLineColor: function (i, node) {
                return i === 0 || i === node.table.widths.length
                  ? "black"
                  : "gray";
              },
            },

          },
        );
      });
//AQUI ES
      d.push(
        {
          style: "table2",
          table: {
            headerRows: 1,
            widths: ["*"],
            body: [
              [
                {
                  text: "BREVE NARRACION DE LOS HECHOS",
                  style: "tableHeader",
                },
              ],
              [html_reseña],
            ],
          },
          layout: {
            hLineWidth: function (i, node) {
              return i === 0 || i === node.table.body.length ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return i === 0 || i === node.table.widths.length ? 2 : 1;
            },
            hLineColor: function (i, node) {
              return i === 0 || i === node.table.body.length
                ? "black"
                : "gray";
            },
            vLineColor: function (i, node) {
              return i === 0 || i === node.table.widths.length
                ? "black"
                : "gray";
            },
          },
        },
        "\n",        
        {
          style: "table2",
          table: {
            headerRows: 1,
            widths: ["*"],
            body: [[{ text: "SESIÓN", style: "tableHeader" }]],
          },
          layout: {
            hLineWidth: function (i, node) {
              return i === 0 || i === node.table.body.length ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return i === 0 || i === node.table.widths.length ? 2 : 1;
            },
            hLineColor: function (i, node) {
              return i === 0 || i === node.table.body.length
                ? "black"
                : "gray";
            },
            vLineColor: function (i, node) {
              return i === 0 || i === node.table.widths.length
                ? "black"
                : "gray";
            },
          },
        },
        {
          style: "table1",
          table: {
            headerRows: 1,
            heights: 10,
            body: [
              [
                { text: "Fecha:", style: "texto1" },
                { text: fechacita, style: "texto2" },
              ],
              [
                { text: "Hora:", style: "texto1" },
                { text: horacita, style: "texto2" },
              ],
              [
                { text: "Facilitador:", style: "texto1" },
                { text: me.v_facilitador.value, style: "texto2" },
              ],
              [
                { text: "Notificador:", style: "texto1" },
                { text: this.v_notificador.value, style: "texto2" },
              ],
            ],
          },
          layout: "noBorders",
        },
        "\n",
        {
          text: "Manifiesto mi conformidad para participar en los Mecanismos Alternativos de Solución de Controversias, los cuales me han sido explicados, acordando voluntariamente someterme a los mismos y mi compromiso de ajustarme a las reglas que los disciplinan. Una vez que me ha sido leído el presente formato acepto de conformidad todo su contenido en virtud de que dicha información yo mismo la proporcione. Lo anterior con fundamento en lo estipulado por el numeral 9 de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal.",
          style: "texto",
        },
        {
          text: "Así mismo autorizo ser notificado de todo asunto relacionado con el procedimeinto a través de los datos de localización que proporcioné.",
          style: "texto",
        },
        "\n",
        "\n",

        {
          style: "table3",
          table: {
            headerRows: 1,
            widths: ["*", "*"],
            body: [
              [
                {
                  text: "NOMBRE COMPLETO Y FIRMA DEL SOLICITANTE:",
                  fontSize: 12,
                  bold: true,
                  alignment: "center",
                },
                {
                  text: "NOMBRE COMPLETO Y FIRMA DE QUIEN CAPTURA:",
                  fontSize: 12,
                  bold: true,
                  alignment: "center",
                },
              ],
              [solis, this.usuarioActual],
            ],
          },
          layout: "noBorders",
        },
        );
              
      var dd = {
        pageSize: "LEGAL",
        pageOrientation: "portrait",
        pageMargins: [85, 130, 72, 60],
        footer: function (currentPage, pageCount) {
          return {
            columns: [
              {
                image: logo4,
                width: 612,
                absolutePosition: { x: 0, y: 0 },
              },
              {
                text:
                  diragencia + "\n" + telagencia + "\n" + "www.hidalgo.gob.mx",
                style: "footertext",
                margin: [312, 12, 72, 0],
                alignment: "right",
                absolutePosition: { x: 0, y: 30 },
              },
              me.vistaPreviaTF == false ? 
              {
                  image: me.qrCode,
                  width: 80, // Ajusta el ancho según tu diseño
                  height: 80, // Ajusta la altura según tu diseño
                  absolutePosition: { x: 5, y: -80 }, // Ajusta las coordenadas según tu diseño
              }
              : "",
            ],
          };
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
            text: pdf_dirsubproc + "\n" + pdf_agencia,
            style: "headertext",
            absolutePosition: { x: 85, y: 95 },
          },
          "\n",
          {
            text: "EXPEDIENTE: " + this.noExpediente,
            style: "nuc",
          },
          "\n\n",
          {
            style: "table1",
            table: {
              headerRows: 1,
              heights: 20,
              body: [
                [
                  {
                    text: "Número de Carpeta de Investigación:",
                    style: "texto1",
                  },
                  { text: this.nuc, style: "texto2" },
                ],
                [
                  { text: "Autoridad que deriva:", style: "texto1" },
                  { text: this.autoridadqueDeriva, style: "texto2" },
                ],
                [
                  { text: "Fecha de oficio de derivación:", style: "texto1" },
                  { text: fr, style: "texto2" },
                ],
                [
                  { text: "Fecha de inicio de expediente:", style: "texto1" },
                  { text: fe, style: "texto2" },
                ],
                [
                  { text: "Lugar de la comisión del delito:", style: "texto1" },
                  {
                    text: `${this.localidadD != null && this.localidadD != '' ? `${this.localidadD}, ` : ''}${this.municipioD != null && this.municipioD != '' ? `${this.municipioD}, ` : ''}${this.entidadD != null && this.entidadD != '' ? `${this.entidadD}` : ''}`,
                    style: "texto2",
                  },
                ],
              ],
            },
            layout: "noBorders",
          },
          d,
          
        ],

        styles: {
          fecha: {
            fontSize: 9,
            regular: true,
            alignment: "right",
          },
          nuc: {
            fontSize: 12,
            alignment: "right",
            bold: true,
          },
          titulo: {
            fontSize: 12,
            bold: true,
            alignment: "center",
          },
          subtitulo: {
            fontSize: 11,
            bold: true,
          },
          headertext: {
            fontSize: 14,
            bold: true,
            alignment: "center",
          },
          table1: {
            fontSize: 9,
            margin: [0, 5, 0, 15],
            alignment: "left",
          },

          table2: {
            fontSize: 11,
            margin: [0, 5, 0, 15],
            alignment: "left",
          },
          table3: {
            fontSize: 9,
            margin: [0, 5, 0, 15],
            alignment: "center",
          },
          tableHeader: {
            fontSize: 10,
            bold: true,
            alignment: "center",
          },
          texto: {
            fontSize: 10,
            regular: true,
            alignment: "justify",
          },

          texto1: {
            fontSize: 11,
            bold: true,
            // alignment: 'center',
          },
          texto2: {
            fontSize: 11,
            // alignment: 'center',
          },
          texto3: {
            fontSize: 9,
            bold: false,
          },
          texto4: {
            fontSize: 9,
            bold: false,
            decoration: "underline",
          },

          footertext: {
            fontSize: 7,
            color: "white",
          },
        },
      };      

      return dd;
    },
    sinPersona() {
      let me = this;
      me.questionPersona = false;
      me.questionContanto = true;
    },
    direccionDelito() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$cat
        .get(
          "api/DireccionDelitoes/ListarPoridHecho/" + me.hechoid,
          configuracion
        )
        .then(function (response) {
          //? AQUI SE VAN A DIVIDIR EN ESTADO, MUNICIPIO Y LOCALIDAD DE LA DIRECCION DEL DELITO PORQUE ASI SE REQUIERE EN EL CITATORIO
          me.entidadD = response.data.estado; //? AQUI GUARDO EL ESTADO EN EL QUE SE CONTITUYO EL DELITO
          me.municipioD = response.data.municipio; //? AQUI GUARDO EL MUNICIPIO EN EL QUE SE CONTITUYO EL DELITO
          me.localidadD = response.data.localidad; //? AQUI GUARDO LA LOCALIDAD EN EL QUE SE CONTITUYO EL DELITO
        })
        .catch(function (err) {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (me.e401 = true), (me.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    async listarInfoSolReqC(sesionid, vs) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.solicitanteC = []
      me.requeridoC = []

      try {
        let response = await me.$justiciarestaurativa.get(`api/SesionsConjunto/ListarSRD/${sesionid}`,configuracion);
        let s = response.data;
        me.derivacion = s;        
        
        let soli = s[0].solicitadosC.replace(/;\s*/g, ",") // Reemplaza punto y coma con coma
                                    .replace(/\s+/g, ""); // Elimina espacios en blanco;

        let solicitanteResponse = await me.$cat.get(`api/RAPs/ListarPersonaPDF/${soli}`, configuracion);
        
        await Promise.all(
          solicitanteResponse.data.map(async (dd) => {
            let repreResponse = await me.$justiciarestaurativa.get(`api/Responsablejrs/ResponsaableXPersona/${dd.idPersona}`, configuracion);
            
            me.solicitanteC.push({
              value: dd.idPersona,
              nombre: dd.nombreCompleto,
              edad: dd.edad,
              originario: dd.entidadFederativa,
              nacionalidad: dd.nacionalidad,
              sexo: dd.sexo,
              estadofam: dd.estadoCivil,
              fechanac: dd.fechaNacimiento,
              escolaridad: dd.nivelEstudio,
              ocupacion: dd.ocupacion,
              domicilio: dd.direccion,
              identificacion: dd.docIdentificacion,
              curp: dd.curp,
              telefono: dd.telefonos,
              clasificacion: dd.clasificacion,
              representante: repreResponse.data,
            });
          })
        );                

        let requi = s[0].requeridosC.replace(/;\s*/g, ",") // Reemplaza punto y coma con coma
                                    .replace(/\s+/g, ""); // Elimina espacios en blanco;

        let requeridoResponse = await me.$cat.get(`api/RAPs/ListarPersonaPDF/${requi}`,configuracion);

        await Promise.all(
          requeridoResponse.data.map(async (dd) => {
            let repreRResponse = await me.$justiciarestaurativa.get(`api/Responsablejrs/ResponsaableXPersona/${dd.idPersona}`, configuracion);
            
            me.requeridoC.push({
              value: dd.idPersona,
              nombre: dd.nombreCompleto,
              edad: dd.edad,
              originario: dd.entidadFederativa,
              nacionalidad: dd.nacionalidad,
              sexo: dd.sexo,
              estadofam: dd.estadoCivil,
              fechanac: dd.fechaNacimiento,
              escolaridad: dd.nivelEstudio,
              ocupacion: dd.ocupacion,
              domicilio: dd.direccion,
              identificacion: dd.docIdentificacion,
              curp: dd.curp,
              telefono: dd.telefonos,
              clasificacion: dd.clasificacion,
              representante: repreRResponse.data,
            });
          })
        );        
        
        var pdfMake = require("pdfmake/build/pdfmake.js");
        var htmlToPdfmake = require("html-to-pdfmake");

        if (pdfMake.vfs == undefined) {
          var pdfFonts = require("pdfmake/build/vfs_fonts.js");
          pdfMake.vfs = pdfFonts.vfs;
        }                

        me.vistaPreviaTF = false
        let fechaQR = new Date()            

        var cantidadR = me.pdfs.some(asd => asd.name == 'Recordatorio')

        if (me.casodeSolicitud == 1) {          
          if (!cantidadR) {            
            
            me.qrCodeR = ''

            me.docRemision = `Recordatorio`


            await me.generarQR(me.docRemision, me.nuc, me.u_nombre, fechaQR, me.expedienteId)                        
          }           
        } 

          me.qrCodeC = ''
  
          me.docRemision = `Citatorio`            
  
          me.delitoparacitatorio = s[0].nombreD.replaceAll(";", ",")
          me.generarQR(me.docRemision, me.nuc, me.u_nombre, fechaQR, me.expedienteId)                              

        me.questionPersona = false;
        me.questionContanto = false;        
      } catch (err) {
        me.handleError(err);
      }
    },
    async reimprimirRecordatorio(vs) 
    {      
      let me = this;

      if (me.vali == true) 
      {        
        let header = { Authorization: "Bearer " + this.$store.state.token };
        let configuracion = { headers: header };        

        for (const [index, a] of me.idConjuntos.entries()) 
        {             
          me.citatoriosrecordatorios = []

          try 
          {
            me.citatoriosrecordatorios = await me.$justiciarestaurativa.get(`api/CitatorioRecordatorios/ListarCRConjunto/${a.value}`,configuracion);
            let arrayDelito = await me.$justiciarestaurativa.get(`api/Delitoes/ListarDelitoConjunto/${a.value}`,configuracion);
            
            for (const [index, x] of arrayDelito.data.entries()) 
            {
              me.v_delitos = [];
              me.v_delitos.push({
                text: x.nombreDelito,
                valor1: x.intensionDelito,
                valor2: x.violenciaSinViolencia,
                valor3: x.armaBlanca,
                valor4: x.armaFuego,
                valor5: x.conAlgunaParteCuerpo,
                valor6: x.conotroElemento,
              });
            }          
                          
              me.solicitadopor = "";
              me.editedIndex = 1;
              me.oficio = me.citatoriosrecordatorios.data[0].textooficio;
              me.nombre = me.citatoriosrecordatorios.data[0].dirigidoa_Nombre;
              me.direccion = me.citatoriosrecordatorios.data[0].dirigidoa_Direccion;
              me.solicitadopor = me.citatoriosrecordatorios.data[0].solicitadoPor;
              me.noCitatorio = me.citatoriosrecordatorios.data[0].noCitatorio;
              me.noCitatorioText = me.consultarNoCita(me.noCitatorio);
              me.uf_Distrito = me.citatoriosrecordatorios.data[0].uf_Distrito;
              me.uf_DirSubProc = me.citatoriosrecordatorios.data[0].uf_DirSubProc;
              me.uf_Agencia = me.citatoriosrecordatorios.data[0].uf_Agencia;
              me.uf_Nombre = me.citatoriosrecordatorios.data[0].uf_Nombre;
              me.uf_Puesto = me.citatoriosrecordatorios.data[0].uf_Puesto;
              me.un_Nombre = me.citatoriosrecordatorios.data[0].un_Nombre;
              me.un_Puesto = me.citatoriosrecordatorios.data[0].un_Puesto;
              me.uf_Modulo = me.citatoriosrecordatorios.data[0].uf_Modulo;
              me.fechaHoraCita = me.citatoriosrecordatorios.data[0].fechaHoraCita;

              if (me.vali == true) 
              {                 
                await me.listarInfoSolReqC(me.citatoriosrecordatorios.data[0].sesionId, vs);     
                          
              } else {                
                await me.listarInfoSolReqSC();
              }            
          } catch (error) {
            me.handleError(error);
          }
        }
      } else {        
        let header = { Authorization: "Bearer " + this.$store.state.token };
        let configuracion = { headers: header };

        try {
          const response = await me.$justiciarestaurativa.get(
            "api/CitatorioRecordatorios/ListarCREnvio/" + me.envioId,
            configuracion
          );
          me.citatoriosrecordatorios = response.data;

          me.editedIndex = 1;
          me.oficio = me.citatoriosrecordatorios[0].textooficio;
          me.nombre = me.citatoriosrecordatorios[0].dirigidoa_Nombre;
          me.direccion = me.citatoriosrecordatorios[0].dirigidoa_Direccion;
          me.solicitadopor = me.citatoriosrecordatorios[0].solicitadoPor;
          me.noCitatorio = me.citatoriosrecordatorios[0].noCitatorio;
          me.noCitatorioText = me.consultarNoCita(me.noCitatorio);
          me.uf_Distrito = me.citatoriosrecordatorios[0].uf_Distrito;
          me.uf_DirSubProc = me.citatoriosrecordatorios[0].uf_DirSubProc;
          me.uf_Agencia = me.citatoriosrecordatorios[0].uf_Agencia;
          me.uf_Nombre = me.citatoriosrecordatorios[0].uf_Nombre;
          me.uf_Puesto = me.citatoriosrecordatorios[0].uf_Puesto;
          me.un_Nombre = me.citatoriosrecordatorios[0].un_Nombre;
          me.un_Puesto = me.citatoriosrecordatorios[0].un_Puesto;
          me.uf_Modulo = me.citatoriosrecordatorios[0].uf_Modulo;
          me.fechaHoraCita = me.citatoriosrecordatorios[0].fechaHoraCita;

          if (me.vali == true) {
            await me.listarInfoSolReqC(me.citatoriosrecordatorios[0].sesionId);
          } else {
            await me.listarInfoSolReqSC();
          }
          me.questionPersona = false;
          me.close();
        } catch (error) {
          me.handleError(error);
        }
      }
    },
    handleError(error) {
      let me = this;
      if (error.response.status == 400) {
        me.$notify("No es un usuario válido", "error");
      } else if (error.response.status == 401) {
        me.$notify(
          "Por favor inicie sesión para poder navegar en la aplicación",
          "error"
        );
        me.e401 = true;
        me.showpage = false;
      } else if (error.response.status == 403) {
        me.$notify("No está autorizado para ver esta página", "error");
        me.e403 = true;
        me.showpage = false;
      } else if (error.response.status == 404) {
        me.$notify("El recurso no ha sido encontrado", "error");
      } else {
        me.$notify("Error al intentar listar los registros!!!", "error");
      }
    },
    listarInfoSolReqSC() {      
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$cat
        .get("api/RAPs/ListarPersonaSCPDF/" + me.envioId, configuracion)
        .then(function (response) {
          let a = response.data;
          me.solicitanteC = [];
          me.requeridoC = [];
          a.map((dd) => {
            if (dd.tipo == "Solicitante") {
              me.solicitanteC.push({
                value: dd.idPersona,
                nombre: dd.nombreCompleto,
                edad: dd.edad,
                originario: dd.entidadFederativa,
                nacionalidad: dd.nacionalidad,
                sexo: dd.sexo,
                estadofam: dd.estadoCivil,
                fechanac: dd.fechaNacimiento,
                escolaridad: dd.nivelEstudio,
                ocupacion: dd.ocupacion,
                domicilio: dd.direccion,
                identificacion: dd.docIdentificacion,
                curp: dd.curp,
                telefono: dd.telefonos,
                clasificacion: dd.clasificacion,
              });
            } else {              
              me.requeridoC.push({
                value: dd.idPersona,
                nombre: dd.nombreCompleto,
                edad: dd.edad,
                originario: dd.entidadFederativa,
                nacionalidad: dd.nacionalidad,
                sexo: dd.sexo,
                estadofam: dd.estadoCivil,
                fechanac: dd.fechaNacimiento,
                escolaridad: dd.nivelEstudio,
                ocupacion: dd.ocupacion,
                domicilio: dd.direccion,
                identificacion: dd.docIdentificacion,
                curp: dd.curp,
                telefono: dd.telefonos,
                clasificacion: dd.clasificacion,
              });
              me.reqarr.push({
                value: dd.idPersona,
                text: dd.nombreCompleto,
                domicilio: dd.direccion,
              });
            }
          });
        })
        .then(() => {
          var dd = me.crearPdf();
          var pdfMake = require("pdfmake/build/pdfmake.js");
          var htmlToPdfmake = require("html-to-pdfmake");

          if (pdfMake.vfs == undefined) {
            var pdfFonts = require("pdfmake/build/vfs_fonts.js");
            pdfMake.vfs = pdfFonts.vfs;
          }

          var ddR = me.crearPdf_Recordatorio();          
          me.pdfs.push({ name: 'Recordatorio', documento: ddR })          
          me.pdfs.push({ name: 'Citatorio', documento: dd })          
        })
        .catch(function (err) {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (me.e401 = true), (me.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },



    //* Función para ejecutar la petición para obtener las agencias del distrito y que corresponden a CJR
    listarAgenciasDistrito() {
      let me = this
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$justiciarestaurativa.get(`api/FacilitadorNotificadors/ListarAgenciasModulos/${me.u_iddistrito}`, configuracion)
        .then(response => {          
          response.data.map(function (x) {
            me.v_agencias.push({
              text: x.nombre,
              value: x.idAgencia,
              valueM: x.modulos
            });
          });
        })
        .catch(function (err) {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (me.e401 = true), (me.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    //* Función para ejecutar la petición para obtener los facilitadores por día y su horario
    listarHorariosFacilitadores() {
      let me = this 
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      if (me.v_fechaI != null) {
        me.horariosFacilitadores = [] 
        me.$justiciarestaurativa.get(`api/FacilitadorNotificadors/ListarSesionesFecha/${me.modulos}/${me.fCita}`, configuracion)
          .then(response => {            
            me.horariosFacilitadores = response.data
          })
          .catch(function (error) {
            me.$notify(error.message, "error");
          });        
      }

    },




    crearPdfSoli() {      
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      //***************************************************************************** */
      // VARIABLES
      //***************************************************************************** */
      var logo1 = this.logo1;
      var logo2 = this.logo2;
      var logo3 = this.logo3;
      var logo4 = this.logo4;
      var diragencia = this.direccionAgencia;
      var telagencia = this.telefonosAgencia;

      this.nombresSolicitantes(this.v_solicitantes);
      //***************************************************************************** */
      var listadelito = "";
      for (var i = 0; i < this.v_delitos.length; i++) {
        listadelito = listadelito + " " + this.v_delitos[i].text;
      }
      //***************************************************************************** */

      if (this.editedIndex == 1) {
        var dia = moment(this.fechaHoraCita).format("DD");
        var mes = moment(this.fechaHoraCita).format("MMMM");
        var año = moment(this.fechaHoraCita).format("YYYY");
        var hrCita = moment(this.fechaHoraCita).format("h:mm:ss a");
        var fechaCita = dia + " de " + mes + " del " + año;
        var dia = moment().format("DD");
        var mes = moment().format("MMMM");
        var año = moment().format("YYYY");
        var hr = moment().format("h:mm:ss a");
        var fecha = dia + " de " + mes + " del " + año + ", " + hr;
        var pdf_distrito = this.uf_Distrito;
        var pdf_dirsubproc = this.uf_DirSubProc;
        var pdf_agencia = this.uf_Agencia;
        var pdf_usuario = this.uf_Nombre;
        var pdf_puesto = this.uf_Puesto;
        var pdf_modulo = this.uf_Modulo;
      } else {
        var fhc = this.v_fechac + " " + this.v_horacita;
        var dia = moment(fhc).format("DD");
        var mes = moment(fhc).format("MMMM");
        var año = moment(fhc).format("YYYY");
        var hrCita = moment(fhc).format("h:mm:ss: a");
        var fechaCita = dia + " de " + mes + " del " + año;
        var dia = moment().format("DD");
        var mes = moment().format("MMMM");
        var año = moment().format("YYYY");
        var hr = moment().format("h:mm:ss a");
        var fecha = dia + " de " + mes + " del " + año + ", " + hr;
        var pdf_distrito = this.u_distrito;
        var pdf_dirsubproc = this.u_dirSubPro;
        var pdf_agencia = this.u_dgencia;
        var pdf_usuario = this.u_nombre;
        var pdf_puesto = this.u_puesto;
        var pdf_modulo = this.u_modulo;
        this.nombre = this.v_requerido.text;
      }
      //***************************************************************************** */
      var html_texto1 = htmlToPdfmake(
        '<p style="text-align:center;">¿QUÉ TENGO QUE HACER?</p><br><p>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><strong>Acuda a su cita</strong><span>. Asista el día y la hora en que fue citado para evitar' +
          " que progrese la denuncia y/o querella penal en su contra. Asegúrese de traer consigo una identificación oficial y copia simple de la misma.</span></p>" +
          "<p>2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Explique su caso</strong>. Un facilitador imparcial de la Procuraduría ayudará a ambas partes" +
          " a resolver su controversia mediante el diálogo.</p><p>3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Llegue a un acuerdo</strong><span>. Si usted" +
          " decide llegar a una solución que le resulte satisfactoria, ambas partes celebrarán un acuerdo reparatorio.</span></p><p><span>4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>" +
          "<strong>Cierre la carpeta de Investigación en su contra</strong><span>. Cuando ambas partes cumplan el acuerdo reparatorio, la Procuraduría concluirá su carpeta de" +
          " investigación.</span></p>"
      );
      var html_texto2 = htmlToPdfmake(
        '<p style="text-align:center;">¿QUÉ PASA SI NO ACUDO A LA CITA? </p><br><p>Se continuará el proceso penal de la carpeta de investigación ante el Ministerio Público para su integración' +
          " y de ser procedente podría someter su caso ante un juez penal. </p>"
      );
      var html_texto3 = htmlToPdfmake(
        '<p class="ql-align-justify">En caso de no poder o no querer asistir a su cita, comuníquese al teléfono </p><p>&nbsp;71 79000 a las extensiones 9806,' +
          " 9294 o 9807 con el facilitador</p>" +
          pdf_usuario
      );
      var html_textoImpu1 = htmlToPdfmake(
        "<p>Para poner fin al procedimiento penal iniciado en su contra, acuda a esta cita y resuelva su asunto antes de que su carpeta de investigación pueda ser sometida ante un juez.</p>"
      );
      var html_textoImpu2 = htmlToPdfmake(
        "<p>El motivo de su cita es por una denuncia penal interpuesta en su contra por el  C.  DIEGO VALENCIA BADILLO apoderado legal de los CC. Marduck Olmos Blanquel  y Leticia Suarez Floresa, por el delito de Fraude,  de conformidad con el Código Penal del Estado de Hidalgo.</p>"
      );
      //* var
      var html_textoVict1 = htmlToPdfmake(
        "<p>Para poner fin al procedimiento penal iniciado por usted, acuda a esta cita y resuelva su asunto antes de que su carpeta de investigación pueda ser sometida ante un juez.</p>"
      );
      var html_textoVict2 = htmlToPdfmake(
        "<p>El motivo de su cita es por una denuncia penal interpuesta por usted y para reunirse  con el C. ÁNGEL CERVANTES MARTÍNEZ, por los delitos de Lesiones y Daño en la Propiedad, de conformidad con el Código Penal del Estado de Hidalgo. </p>"
      );
      //***************************************************************************** */
      var ddd = [];
      this.solicitanteC.map((req, index) => {

        ddd.push(
          {
            text: pdf_dirsubproc + "\n" + pdf_agencia,
            style: "headertext",
            absolutePosition: { x: 85, y: 95 },
          },
          {
            columns: [
              [
                {
                  text: " ",
                  alignment: "right", // Aligns 'Column 2' text to right
                },
                {
                  columns: [
                    {
                      text: "",
                      width: "*",
                    },
                    {
                      style: "table1",
                      table: {
                        body: [
                          ["Fecha", fecha],
                          ["Expediente", this.noExpediente],
                          ["Carpeta de investigación", this.nuc],
                          ["Cita número", this.noCitatorioText],
                        ],
                      },
                      alignment: "center", // Optional, for body texts
                      width: "auto", // Changes width of the table
                    },
                  ],
                },
              ],
            ],
          },
          "\n\n",
          {
            text:
              req.representante.responsable == true
                ? req.nombre +
                  " con domicilio " +
                  (req.domicilio == ", No.Ext S/N, CP 0, , , "
                    ? "LO DESCONOCE"
                    : req.domicilio) +
                  " \nRepresentado por " +
                  req.representante.nombreCompleto +
                  " con domicilio " +
                  req.representante.direccion
                : req.nombre +
                  " con domicilio " +
                  (req.domicilio == ", No.Ext S/N, CP 0, , , "
                    ? "LO DESCONOCE"
                    : req.domicilio),
            style: "subtitulo",
          },
          "\n",
          "\n\n",
          {
            text:
              req.clasificacion == "Imputado"
                ? html_textoImpu1
                : html_textoVict1,
            style: "textobold",
          },
          "\n",
          {
            columns: [
              {
                style: "table2",
                table: {
                  widths: [120, "auto"],
                  body: [
                    ["Fecha de su cita", fechaCita],
                    ["Hora de su cita", hrCita],
                    ["Lugar de su cita", this.direAgencia],
                  ],
                },
                alignment: "center", // Optional, for body texts
                width: "auto", // Changes width of the table
              },
            ],
          },
          "\n",
          {
            text:
              req.clasificacion == "Imputado"
                ? "El motivo de su cita es por una denuncia penal interpuesta en su contra por " +
                  this.solicitanteC.map((a) => {
                    return a.representante.responsable == true
                      ? a.nombre +
                          " representado por " +
                          a.representante.nombreCompleto +
                          ", "
                      : a.nombre;
                  }) +
                  " por el delito de " +
                  (this.v_delitos[index] ? this.v_delitos[index].text : "") +
                  " de conformidad con el Código Penal del Estado de Hidalgo, dicho delito es sancionable."
                : "El motivo de su cita es por una denuncia penal interpuesta por usted y para reunirse  con " +
                  this.requeridoC.map((a) => {
                    return a.representante.responsable == true
                      ? a.nombre +
                          " representado por " +
                          a.representante.nombreCompleto
                      : a.nombre;

                  }) +
                  ", por el/los delito(s) " +
                  (this.v_delitos[index] ? this.v_delitos[index].text : "") +
                  ", de conformidad con el Código Penal del Estado de Hidalgo.",
            style: "texto",
          },
          "\n",
          {
            text: "Sin embargo, dada la naturaleza de su asunto, la Procuraduría General de Justicia lo invita a resolver su conflicto mediante un mecanismo alternativo de solución de controversias, ANTES de que su carpeta de investigación se continúe integrando.",
            style: "texto",
          },
          "\n",
          {
            text: "De conformidad con los artículos 1, 4 y 14 de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal, estos mecanismos tienen como finalidad propiciar, a través del diálogo, la solución de las controversias que surjan entre miembros de la sociedad mediante procedimientos basados en la oralidad, la economía procesal y la confidencialidad. ",
            style: "texto",
          },
          "\n\n\n\n\n\n",
          {
            text:
              this.v_facilitador.value +
              "\n" +
              this.pdf_puesto +
              "\n" +
              "ADSCRITO A LA " +
              pdf_agencia.toUpperCase() +
              "\n\n\n\n\n\n\n\n\n\n",
            style: "ampo",
          },
          {
            text: "RAZÓN",
            style: "titulo",
            pageBreak: "before",
          },
          "\n\n\n\n",

          {
            text:
              "En el Municipio ____________________ Estado de Hidalgo, siendo las __________ horas, del " +
              "dia ___ de __________ del año en curso, dentro del expediente " +
              this.noExpediente +
              ", me " +
              "constituí en el domicilio del C. ___________________________________________ ubicado en " +
              "________________________________________________________________________________________" +
              "y cuyas caracteristicas del domicilio son: _____________________________________________" +
              "__________________________, haciendo constar que fui atendido por ______________________" +
              "_________________ quien refirio llamarse __________________________________________ por lo que " +
              "procedi a ____________________________. Lo anterior para los fines legales a que haya lugar.",
            style: "texto",
          },
          "\n\n\n\n",
          {
            text:
              "Observaciones: __________________________________________________________________________" +
              "_________________________________________________________________________________________" +
              "_________________________________________________________________________________________",
            style: "subtitulo",
          },
          "\n\n\n\n",
          {
            text: "ESTATUS DE ENTREGA",
            style: "titulo",
          },
          "\n\n\n\n",
          {
            style: "table3",
            table: {
              headerRows: 1,
              widths: [90, 30, 220, 70],
              body: [
                [
                  { text: "Status" },
                  { text: "Marcar con X" },
                  { text: "Escribir numero, fecha y hora de visitas" },
                  { text: "Asistencia de la persona" },
                ],
                ["Domicilio incorrecto", "", "", ""],
                ["Entregado a familiar o conocido", "", "", ""],
                ["Entregado personal", "", "", ""],
                ["Fijado", "", "", ""],
                ["No se ubica el domicilio", "", "", ""],
                ["Nombre incorrecto", "", "", ""],
                ["Ya no vive ahí", "", "", ""],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return i === 0 || i === node.table.body.length
                  ? "black"
                  : "gray";
              },
              vLineColor: function (i, node) {
                return i === 0 || i === node.table.widths.length
                  ? "black"
                  : "gray";
              },

            },
          },
          "\n\n\n\n",
          {
            text:
              "LIC. __________________________________" +
              "\n" +
              "NOTIFICADOR ESPECIALIZADO",
            style: "ampo",
          }
        );
        if (index != this.requeridoC.length - 1) {
            ddd.push({
              text: "", // No es necesario agregar un texto, solo se añadirá una nueva página
              pageBreak: "after", // Indica que se debe agregar una nueva página después de este elemento
            });
        }
      });

      var dd = {
        pageSize: "LEGAL",
        pageOrientation: "portrait",
        pageMargins: [85, 130, 72, 60],
        footer: function (currentPage, pageCount) {
          return {
            columns: [
              {
                image: logo4,
                width: 612,
                absolutePosition: { x: 0, y: 0 },
              },
              {
                text:
                  diragencia + "\n" + telagencia + " " + "www.hidalgo.gob.mx",
                style: "footertext",
                margin: [312, 12, 72, 0],
                alignment: "right",
                absolutePosition: { x: 0, y: 30 },
              },
            ],
          };
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
        content: ddd,
        styles: {
          headertext: {
            fontSize: 10,
            bold: true,
          },

          fecha: {
            fontSize: 11,
            alignment: "right",
          },
          nuc: {
            fontSize: 12,
            alignment: "right",
            bold: true,
          },
          titulo: {
            fontSize: 12,
            bold: true,
            alignment: "center",
          },
          titulo: {
            fontSize: 11,
            bold: true,
            alignment: "center",
          },
          DePara: {
            fontSize: 11,
            bold: true,
          },
          DeParaCargo: {
            fontSize: 10,
            bold: true,
          },
          table1: {
            fontSize: 9,
            margin: [0, 5, 0, 15],
            alignment: "left",
          },
          table2: {
            fontSize: 9,
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
          table3: {
            fontSize: 9,
            margin: [0, 5, 0, 5],
            alignment: "center",
          },
          subtitulo: {
            fontSize: 11,
            bold: true,
          },

          footertext: {
            fontSize: 7,
            color: "white",
          },
          textoDireccion: {
            fontSize: 12,
            alignment: "left",
          },
          texto: {
            fontSize: 10,
            alignment: "justify",
          },
          textobold: {
            fontSize: 10,
            bold: true,
            alignment: "justify",
          },
          compareciente: {
            fontSize: 12,
            bold: true,
            alignment: "right",
          },
          ampo: {
            fontSize: 12,
            bold: true,
            alignment: "center",
          },
          cargo: {
            fontSize: 11,
            regular: true,
            alignment: "center",
          },
        },
      };
      return dd;
    },
    crearPdf() {      
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");

      //***************************************************************************** */
      // VARIABLES
      //***************************************************************************** */
      var logo1 = this.logo1;
      var logo2 = this.logo2;
      var logo3 = this.logo3;
      var logo4 = this.logo4;
      var diragencia = this.direccionAgencia;
      var telagencia = this.telefonosAgencia;

      this.nombresSolicitantes(this.v_solicitantes);
      //***************************************************************************** */
      var listadelito = "";
      for (var i = 0; i < this.v_delitos.length; i++) {
        listadelito = listadelito + " " + this.v_delitos[i].text;
      }
      //***************************************************************************** */

      if (this.editedIndex == 1) {
        var dia = moment(this.fechaHoraCita).format("DD");
        var mes = moment(this.fechaHoraCita).format("MMMM");
        var año = moment(this.fechaHoraCita).format("YYYY");
        var hrCita = moment(this.fechaHoraCita).format("h:mm:ss a");
        var fechaCita = dia + " de " + mes + " del " + año;
        var dia = moment().format("DD");
        var mes = moment().format("MMMM");
        var año = moment().format("YYYY");
        var hr = moment().format("h:mm:ss a");
        var fecha = dia + " de " + mes + " del " + año + ", " + hr;
        var pdf_distrito = this.uf_Distrito;
        var pdf_dirsubproc = this.uf_DirSubProc;
        var pdf_agencia = this.uf_Agencia;
        var pdf_usuario = this.uf_Nombre;
        var pdf_puesto = this.uf_Puesto;
        var pdf_modulo = this.uf_Modulo;
      } else {
        var fhc = this.v_fechac + " " + this.v_horacita;
        var dia = moment(fhc).format("DD");
        var mes = moment(fhc).format("MMMM");
        var año = moment(fhc).format("YYYY");
        var hrCita = moment(fhc).format("h:mm:ss: a");
        var fechaCita = dia + " de " + mes + " del " + año;
        var dia = moment().format("DD");
        var mes = moment().format("MMMM");
        var año = moment().format("YYYY");
        var hr = moment().format("h:mm:ss a");
        var fecha = dia + " de " + mes + " del " + año + ", " + hr;
        var pdf_distrito = this.u_distrito;
        var pdf_dirsubproc = this.u_dirSubPro;
        var pdf_agencia = this.u_dgencia;
        var pdf_usuario = this.u_nombre;
        var pdf_puesto = this.u_puesto;
        var pdf_modulo = this.u_modulo;
        this.nombre = this.v_requerido.text;
      }
      //***************************************************************************** */
      var html_texto1 = htmlToPdfmake(
        '<p style="text-align:center;">¿QUÉ TENGO QUE HACER?</p><br><p>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><strong>Acuda a su cita</strong><span>. Asista el día y la hora en que fue citado para evitar' +
          " que progrese la denuncia y/o querella penal en su contra. Asegúrese de traer consigo una identificación oficial y copia simple de la misma.</span></p>" +
          "<p>2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Explique su caso</strong>. Un facilitador imparcial de la Procuraduría ayudará a ambas partes" +
          " a resolver su controversia mediante el diálogo.</p><p>3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Llegue a un acuerdo</strong><span>. Si usted" +
          " decide llegar a una solución que le resulte satisfactoria, ambas partes celebrarán un acuerdo reparatorio.</span></p><p><span>4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>" +
          "<strong>Cierre la carpeta de Investigación en su contra</strong><span>. Cuando ambas partes cumplan el acuerdo reparatorio, la Procuraduría concluirá su carpeta de" +
          " investigación.</span></p>"
      );
      var html_texto2 = htmlToPdfmake(
        '<p style="text-align:center;">¿QUÉ PASA SI NO ACUDO A LA CITA? </p><br><p>Se continuará el proceso penal de la carpeta de investigación ante el Ministerio Público para su integración' +
          " y de ser procedente podría someter su caso ante un juez penal. </p>"
      );
      var html_texto3 = htmlToPdfmake(
        '<p class="ql-align-justify">En caso de no poder o no querer asistir a su cita, comuníquese al teléfono </p><p>&nbsp;71 79000 a las extensiones 9806,' +
          " 9294 o 9807 con el facilitador</p>" +
          pdf_usuario
      );
      var html_textoImpu1 = htmlToPdfmake(
        "<p>Para poner fin al procedimiento penal iniciado en su contra, acuda a esta cita y resuelva su asunto antes de que su carpeta de investigación pueda ser sometida ante un juez.</p>"
      );
      var html_textoImpu2 = htmlToPdfmake(
        "<p>El motivo de su cita es por una denuncia penal interpuesta en su contra por el  C.  DIEGO VALENCIA BADILLO apoderado legal de los CC. Marduck Olmos Blanquel  y Leticia Suarez Floresa, por el delito de Fraude,  de conformidad con el Código Penal del Estado de Hidalgo.</p>"
      );
      //* var
      var html_textoVict1 = htmlToPdfmake(
        "<p>Para poner fin al procedimiento penal iniciado por usted, acuda a esta cita y resuelva su asunto antes de que su carpeta de investigación pueda ser sometida ante un juez.</p>"
      );
      var html_textoVict2 = htmlToPdfmake(
        "<p>El motivo de su cita es por una denuncia penal interpuesta por usted y para reunirse  con el C. ÁNGEL CERVANTES MARTÍNEZ, por los delitos de Lesiones y Daño en la Propiedad, de conformidad con el Código Penal del Estado de Hidalgo. </p>"
      );
      //***************************************************************************** */
      var ddd = [];      
      this.requeridoC.map((req, index) => {          
        ddd.push(
          {
            text: pdf_dirsubproc + "\n" + pdf_agencia,
            style: "headertext",
            absolutePosition: { x: 85, y: 95 },
          },
          {
            columns: [
              [
                {
                  text: " ",
                  alignment: "right", // Aligns 'Column 2' text to right
                },
                {
                  columns: [
                    {
                      text: "",
                      width: "*",
                    },
                    {
                      style: "table1",
                      table: {
                        body: [
                          ["Fecha", fecha],
                          ["Expediente", this.noExpediente],
                          ["Carpeta de investigación", this.nuc],
                          ["Cita número", this.noCitatorioText],
                        ],
                      },
                      alignment: "center", // Optional, for body texts
                      width: "auto", // Changes width of the table
                    },
                  ],
                },
              ],
            ],
          },
          "\n\n",
          {
            text:
              req.representante.responsable == true
                ? req.nombre +
                  " con domicilio " +
                  (req.domicilio == ", No.Ext S/N, CP 0, , , "
                    ? "LO DESCONOCE"
                    : req.domicilio) +
                  " \nRepresentado por " +
                  req.representante.nombreCompleto +
                  " con domicilio " +
                  req.representante.direccion
                : req.nombre +
                  " con domicilio " +
                  (req.domicilio == ", No.Ext S/N, CP 0, , , "
                    ? "LO DESCONOCE"
                    : req.domicilio),            
            style: "subtitulo",
          },
          "\n",          
          "\n\n",
          {
            text:
              req.clasificacion == "Imputado"
                ? html_textoImpu1
                : html_textoVict1,
            style: "textobold",
          },
          "\n",
          {
            columns: [
              {
                style: "table2",
                table: {
                  widths: [120, "auto"],
                  body: [
                    ["Fecha de su cita", fechaCita],
                    ["Hora de su cita", hrCita],
                    ["Lugar de su cita", this.direAgencia],
                  ],
                },
                alignment: "center", // Optional, for body texts
                width: "auto", // Changes width of the table
              },
            ],
          },
          "\n",
          {
            text:
              req.clasificacion == "Imputado"
                ? "El motivo de su cita es por una denuncia penal interpuesta en su contra por " +
                  this.solicitanteC.map((a) => {
                    return a.representante.responsable == true
                      ? a.nombre +
                          " representado por " +
                          a.representante.nombreCompleto +
                          ", "
                      : a.nombre;
                  }) +
                  " por el delito de " +
                  (this.v_delitos[index] ? this.v_delitos[index].text : "") +
                  " de conformidad con el Código Penal del Estado de Hidalgo, dicho delito es sancionable."
                : "El motivo de su cita es por una denuncia penal interpuesta por usted y para reunirse  con " +
                  this.solicitanteC.map((a) => {
                  }) +
                  ", por el/los delito(s) " +
                  (this.v_delitos[index] ? this.v_delitos[index].text : "") +
                  ", de conformidad con el Código Penal del Estado de Hidalgo.",
            style: "texto",
          },
          "\n",
          {
            text: "Sin embargo, dada la naturaleza de su asunto, la Procuraduría General de Justicia lo invita a resolver su conflicto mediante un mecanismo alternativo de solución de controversias, ANTES de que su carpeta de investigación se continúe integrando.",
            style: "texto",
          },
          "\n",
          {
            text: "De conformidad con los artículos 1, 4 y 14 de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal, estos mecanismos tienen como finalidad propiciar, a través del diálogo, la solución de las controversias que surjan entre miembros de la sociedad mediante procedimientos basados en la oralidad, la economía procesal y la confidencialidad. ",
            style: "texto",
          },
          "\n\n\n\n\n\n",
          {
            text:
              this.v_facilitador.value +
              "\n" +
              this.pdf_puesto +
              "\n" +
              "ADSCRITO A LA " +
              pdf_agencia.toUpperCase() +
              "\n\n\n\n\n\n\n\n\n\n",
            style: "ampo",
          },
          {
            text: "RAZÓN",
            style: "titulo",
            pageBreak: "before",
          },
          "\n\n\n\n",

          {
            text:
              "En el Municipio ____________________ Estado de Hidalgo, siendo las __________ horas, del " +
              "dia ___ de __________ del año en curso, dentro del expediente " +
              this.noExpediente +
              ", me " +
              "constituí en el domicilio del C. ___________________________________________ ubicado en " +
              "________________________________________________________________________________________" +
              "y cuyas caracteristicas del domicilio son: _____________________________________________" +
              "__________________________, haciendo constar que fui atendido por ______________________" +
              "_________________ quien refirio llamarse __________________________________________ por lo que " +
              "procedi a ____________________________. Lo anterior para los fines legales a que haya lugar.",
            style: "texto",
          },
          "\n\n\n\n",
          {
            text:
              "Observaciones: __________________________________________________________________________" +
              "_________________________________________________________________________________________" +
              "_________________________________________________________________________________________",
            style: "subtitulo",
          },
          "\n\n\n\n",
          {
            text: "ESTATUS DE ENTREGA",
            style: "titulo",
          },
          "\n\n\n\n",
          {
            style: "table3",
            table: {
              headerRows: 1,
              widths: [90, 30, 220, 70],
              body: [
                [
                  { text: "Status" },
                  { text: "Marcar con X" },
                  { text: "Escribir numero, fecha y hora de visitas" },
                  { text: "Asistencia de la persona" },
                ],
                ["Domicilio incorrecto", "", "", ""],
                ["Entregado a familiar o conocido", "", "", ""],
                ["Entregado personal", "", "", ""],
                ["Fijado", "", "", ""],
                ["No se ubica el domicilio", "", "", ""],
                ["Nombre incorrecto", "", "", ""],
                ["Ya no vive ahí", "", "", ""],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return i === 0 || i === node.table.body.length
                  ? "black"
                  : "gray";
              },
              vLineColor: function (i, node) {
                return i === 0 || i === node.table.widths.length
                  ? "black"
                  : "gray";
              },              
            },
          },
          "\n\n\n\n",
          {
            text:
              "LIC. __________________________________" +
              "\n" +
              "NOTIFICADOR ESPECIALIZADO",
            style: "ampo",
          }
        );
        if (index != this.requeridoC.length - 1) {
            ddd.push({
              text: "", // No es necesario agregar un texto, solo se añadirá una nueva página
              pageBreak: "after", // Indica que se debe agregar una nueva página después de este elemento
            });
        }
      });
      ddd.push({
              text: "", // No es necesario agregar un texto, solo se añadirá una nueva página
              pageBreak: "after", // Indica que se debe agregar una nueva página después de este elemento
            });
      this.solicitanteC.map((req, index) => {
        ddd.push(
          {
            text: pdf_dirsubproc + "\n" + pdf_agencia,
            style: "headertext",
            absolutePosition: { x: 85, y: 95 },
          },
          {
            columns: [
              [
                {
                  text: " ",
                  alignment: "right", // Aligns 'Column 2' text to right
                },
                {
                  columns: [
                    {
                      text: "",
                      width: "*",
                    },
                    {
                      style: "table1",
                      table: {
                        body: [
                          ["Fecha", fecha],
                          ["Expediente", this.noExpediente],
                          ["Carpeta de investigación", this.nuc],
                          ["Cita número", this.noCitatorioText],
                        ],
                      },
                      alignment: "center", // Optional, for body texts
                      width: "auto", // Changes width of the table
                    },
                  ],
                },
              ],
            ],
          },
          "\n\n",
          {
            text:
              req.representante.responsable == true
                ? req.nombre +
                  " con domicilio " +
                  (req.domicilio == ", No.Ext S/N, CP 0, , , "
                    ? "LO DESCONOCE"
                    : req.domicilio) +
                  " \nRepresentado por " +
                  req.representante.nombreCompleto +
                  " con domicilio " +
                  req.representante.direccion
                : req.nombre +
                  " con domicilio " +
                  (req.domicilio == ", No.Ext S/N, CP 0, , , "
                    ? "LO DESCONOCE"
                    : req.domicilio),
            style: "subtitulo",
          },
          "\n",
          "\n\n",
          {
            text:
              req.clasificacion == "Imputado"
                ? html_textoImpu1
                : html_textoVict1,
            style: "textobold",
          },
          "\n",
          {
            columns: [
              {
                style: "table2",
                table: {
                  widths: [120, "auto"],
                  body: [
                    ["Fecha de su cita", fechaCita],
                    ["Hora de su cita", hrCita],
                    ["Lugar de su cita", this.direAgencia],
                  ],
                },
                alignment: "center", // Optional, for body texts
                width: "auto", // Changes width of the table
              },
            ],
          },
          "\n",
          {
            text:
              req.clasificacion == "Imputado"
                ? "El motivo de su cita es por una denuncia penal interpuesta en su contra por " +
                  this.solicitanteC.map((a) => {
                    return a.representante.responsable == true
                      ? a.nombre +
                          " representado por " +
                          a.representante.nombreCompleto +
                          ", "
                      : a.nombre;
                  }) +
                  " por el delito de " +
                  (this.v_delitos[index] ? this.v_delitos[index].text : "") +
                  " de conformidad con el Código Penal del Estado de Hidalgo, dicho delito es sancionable."
                : "El motivo de su cita es por una denuncia penal interpuesta por usted y para reunirse  con " +
                  this.requeridoC.map((a) => {
                    return a.representante.responsable == true
                      ? a.nombre +
                          " representado por " +
                          a.representante.nombreCompleto
                      : a.nombre;

                  }) +
                  ", por el/los delito(s) " +
                  (this.v_delitos[index] ? this.v_delitos[index].text : "") +
                  ", de conformidad con el Código Penal del Estado de Hidalgo.",
            style: "texto",
          },
          "\n",
          {
            text: "Sin embargo, dada la naturaleza de su asunto, la Procuraduría General de Justicia lo invita a resolver su conflicto mediante un mecanismo alternativo de solución de controversias, ANTES de que su carpeta de investigación se continúe integrando.",
            style: "texto",
          },
          "\n",
          {
            text: "De conformidad con los artículos 1, 4 y 14 de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal, estos mecanismos tienen como finalidad propiciar, a través del diálogo, la solución de las controversias que surjan entre miembros de la sociedad mediante procedimientos basados en la oralidad, la economía procesal y la confidencialidad. ",
            style: "texto",
          },
          "\n\n\n\n\n\n",
          {
            text:
            this.v_facilitador.value +
              "\n" +
              this.pdf_puesto +
              "\n" +
              "ADSCRITO A LA " +
              pdf_agencia.toUpperCase() +
              "\n\n\n\n\n\n\n\n\n\n",
            style: "ampo",
          },
          {
            text: "RAZÓN",
            style: "titulo",
            pageBreak: "before",
          },
          "\n\n\n\n",

          {
            text:
              "En el Municipio ____________________ Estado de Hidalgo, siendo las __________ horas, del " +
              "dia ___ de __________ del año en curso, dentro del expediente " +
              this.noExpediente +
              ", me " +
              "constituí en el domicilio del C. ___________________________________________ ubicado en " +
              "________________________________________________________________________________________" +
              "y cuyas caracteristicas del domicilio son: _____________________________________________" +
              "__________________________, haciendo constar que fui atendido por ______________________" +
              "_________________ quien refirio llamarse __________________________________________ por lo que " +
              "procedi a ____________________________. Lo anterior para los fines legales a que haya lugar.",
            style: "texto",
          },
          "\n\n\n\n",
          {
            text:
              "Observaciones: __________________________________________________________________________" +
              "_________________________________________________________________________________________" +
              "_________________________________________________________________________________________",
            style: "subtitulo",
          },
          "\n\n\n\n",
          {
            text: "ESTATUS DE ENTREGA",
            style: "titulo",
          },
          "\n\n\n\n",
          {
            style: "table3",
            table: {
              headerRows: 1,
              widths: [90, 30, 220, 70],
              body: [
                [
                  { text: "Status" },
                  { text: "Marcar con X" },
                  { text: "Escribir numero, fecha y hora de visitas" },
                  { text: "Asistencia de la persona" },
                ],
                ["Domicilio incorrecto", "", "", ""],
                ["Entregado a familiar o conocido", "", "", ""],
                ["Entregado personal", "", "", ""],
                ["Fijado", "", "", ""],
                ["No se ubica el domicilio", "", "", ""],
                ["Nombre incorrecto", "", "", ""],
                ["Ya no vive ahí", "", "", ""],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return i === 0 || i === node.table.body.length
                  ? "black"
                  : "gray";
              },
              vLineColor: function (i, node) {
                return i === 0 || i === node.table.widths.length
                  ? "black"
                  : "gray";
              },

            },
          },
          "\n\n\n\n",
          {
            text:
              "LIC. __________________________________" +
              "\n" +
              "NOTIFICADOR ESPECIALIZADO",
            style: "ampo",
          }
        );
        if (index != this.requeridoC.length - 1) {
            ddd.push({
              text: "", // No es necesario agregar un texto, solo se añadirá una nueva página
              pageBreak: "after", // Indica que se debe agregar una nueva página después de este elemento
            });
        }
      });
      
      var dd = {
        pageSize: "LEGAL",
        pageOrientation: "portrait",
        pageMargins: [85, 130, 72, 60],
        footer: function (currentPage, pageCount) {
          return {
            columns: [
              {
                image: logo4,
                width: 612,
                absolutePosition: { x: 0, y: 0 },
              },
              {
                text:
                  diragencia + "\n" + telagencia + " " + "www.hidalgo.gob.mx",
                style: "footertext",
                margin: [312, 12, 72, 0],
                alignment: "right",
                absolutePosition: { x: 0, y: 30 },
              },
            ],
          };
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
        content: ddd,
        styles: {
          headertext: {
            fontSize: 10,
            bold: true,
          },

          fecha: {
            fontSize: 11,
            alignment: "right",
          },
          nuc: {
            fontSize: 12,
            alignment: "right",
            bold: true,
          },
          titulo: {
            fontSize: 12,
            bold: true,
            alignment: "center",
          },
          titulo: {
            fontSize: 11,
            bold: true,
            alignment: "center",
          },
          DePara: {
            fontSize: 11,
            bold: true,
          },
          DeParaCargo: {
            fontSize: 10,
            bold: true,
          },
          table1: {
            fontSize: 9,
            margin: [0, 5, 0, 15],
            alignment: "left",
          },
          table2: {
            fontSize: 9,
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
          table3: {
            fontSize: 9,
            margin: [0, 5, 0, 5],
            alignment: "center",
          },
          subtitulo: {
            fontSize: 11,
            bold: true,
          },

          footertext: {
            fontSize: 7,
            color: "white",
          },
          textoDireccion: {
            fontSize: 12,
            alignment: "left",
          },
          texto: {
            fontSize: 10,
            alignment: "justify",
          },
          textobold: {
            fontSize: 10,
            bold: true,
            alignment: "justify",
          },
          compareciente: {
            fontSize: 12,
            bold: true,
            alignment: "right",
          },
          ampo: {
            fontSize: 12,
            bold: true,
            alignment: "center",
          },
          cargo: {
            fontSize: 11,
            regular: true,
            alignment: "center",
          },
        },
      };
      return dd;
    },
    crearPdf_Recordatorio() {   
      let me = this   
      var pdfMake = require("pdfmake/build/pdfmake.js");

      //***************************************************************************** */
      // VARIABLES
      //***************************************************************************** */
      var logo1 = this.logo1;
      var logo2 = this.logo2;
      var logo3 = this.logo3;
      var diragencia = this.direccionAgencia;
      var telagencia = this.telefonosAgencia;

      //***************************************************************************** */
      if (this.editedIndex == 1) {
        var dia = moment(this.fechaHoraCita).format("DD");
        var mes = moment(this.fechaHoraCita).format("MMMM");
        var año = moment(this.fechaHoraCita).format("YYYY");
        var hr = moment(this.fechaHoraCita).format("h:mm:ss a");
        var pdf_distrito = this.uf_Distrito;
        var pdf_dirsubproc = this.uf_DirSubProc;
        var pdf_agencia = this.uf_Agencia;
        var pdf_usuario = this.uf_Nombre;
        var pdf_puesto = this.uf_Puesto;
        var pdf_modulo = this.uf_Modulo;
        var fecha = dia + " de " + mes + " del " + año + ", " + hr;
      } else {
        var dia = moment().format("DD");
        var mes = moment().format("MMMM");
        var año = moment().format("YYYY");
        var hr = moment().format("h:mm:ss a");
        var pdf_distrito = this.u_distrito;
        var pdf_dirsubproc = this.u_dirSubPro;
        var pdf_agencia = this.u_agencia;
        var pdf_usuario = this.u_nombre;
        var pdf_puesto = this.u_puesto;
        var pdf_modulo = this.u_modulo;
        var fecha = dia + " de " + mes + " del " + año + ", " + hr;
      }

      //***************************************************************************** */
      //***************************************************************************** */

      var bodyDataSolicitantes = [];
      for (var i = 0; i < this.v_solicitantes.length; i++) {
        var dataRow = [];
        dataRow.push();
        bodyDataSolicitantes.push(this.v_solicitantes[i].text + "\n");
      }

      //***************************************************************************** */
      //***************************************************************************** */
      var ddR = {
        pageSize: "LEGAL",
        pageOrientation: "portrait",
        pageMargins: [30, 50, 30, 30],

        content: [
          "\n\n\n",
          {
            image: logo3,
            width: 612,
            absolutePosition: { x: 0, y: 0 },
          },
          {
            text: pdf_dirsubproc,
            style: "textobold",
            // absolutePosition: {x: 85, y: 95},
          },
          "\n",
          {
            text: "\n" + "RECORDATORIO" + "\n\n\n",
            fontSize: 14,
            bold: true,
            alignment: "center",
          },
          {
            text: "N° Expediente: " + this.noExpediente + "\n\n\n",
            style: "nuc",
          },
          {
            text:
              "Su cita es a las " +
              this.formatearfechahora(this.fechaHoraCita).substr(10, 6) +
              " del dia " +
              this.formatearfechaTexo(this.fechaHoraCita),
            alignment: "center",
          },
          {
            text: "\nSu facilitador asignado es: " + pdf_usuario,
            alignment: "center",
          },
          {
            text: "\nLos horarios de atención son: Lunes a Viernes de 9:00 a 17:00 horas.",
            alignment: "center",
          },
          "\n",
          {
            style: "table1",
            table: {
              headerRows: 1,
              body: [
                [{ text: this.direAgencia, alignment: "center" }],
                [
                  {
                    text: "Nota:  Favor  de  acudir  con original y copia de una identificación oficial con fotografía (Requisito indispensable para cualquier trámite)",
                    alignment: "center",
                    bold: "true",
                  },
                ],
              ],
            },
            layout: "Borders",
          },

          {
            text: "En caso de identificarse con licencia de conducir, pasaporte, cartilla del servicio militar, constancia de radicación o algún otro documento fehaciente deberá anexar una impresión de su CURP.",
            alignment: "center",
          },
          "\n\n\n\n",
          {
            text: "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ",
          },

          {
            image: logo3,
            width: 612,
            absolutePosition: { x: 0, y: 500 },
          },
          "\n\n\n\n\n\n\n",
          {
            text: pdf_dirsubproc,
            style: "textobold",
            // absolutePosition: {x: 85, y: 95},
          },
          {
            text: "\n" + "RECORDATORIO" + "\n\n\n",
            fontSize: 14,
            bold: true,
            alignment: "center",
          },
          {
            text: "N° Expediente: " + this.noExpediente + "\n\n\n",
            style: "nuc",
          },
          {
            text:
              "Su cita es a las " +
              this.formatearfechahora(this.fechaHoraCita).substr(10, 6) +
              " del dia " +
              this.formatearfechaTexo(this.fechaHoraCita),
            alignment: "center",
          },
          {
            text: "\nSu facilitador asignado es: " + pdf_usuario,
            alignment: "center",
          },
          {
            text: "\nLos horarios de atención son: Lunes a Viernes de 9:00 a 17:00 horas.",
            alignment: "center",
          },
          "\n",
          {
            style: "table1",
            table: {
              headerRows: 1,
              body: [
                [{ text: this.direccionAgencia, alignment: "center" }],
                [
                  {
                    text: "Nota:  Favor  de  acudir  con original y copia de una identificación oficial con fotografía (Requisito indispensable para cualquier trámite)",
                    alignment: "center",
                    bold: "true",
                  },
                ],
              ],
            },
            layout: "Borders",
          },

          {
            text: "En caso de identificarse con licencia de conducir, pasaporte, cartilla del servicio militar, constancia de radicación o algún otro documento fehaciente deberá anexar una impresión de su CURP.",
            alignment: "center",
          },
        ],
        styles: {
          fecha: {
            fontSize: 11,
            alignment: "right",
          },
          texto: {
            fontSize: 12,
            alignment: "justify",
          },
          textobold: {
            fontSize: 12,
            bold: true,
            alignment: "center",
          },
          compareciente: {
            fontSize: 12,
            bold: true,
            alignment: "right",
          },
          ampo: {
            fontSize: 12,
            bold: true,
            alignment: "left",
          },
          table: {
            fontSize: 9,
            margin: [0, 5, 0, 15],
            alignment: "center",
          },
          table1: {
            margin: [0, 5, 0, 15],
            alignment: "center",
          },
          texto1: {
            fontSize: 11,
            bold: true,
            // alignment: 'center',
          },
          texto2: {
            fontSize: 11,
            // alignment: 'center',
          },
          nuc: {
            fontSize: 12,
            alignment: "right",
            bold: true,
          },
        },
      };

      return ddR;
    },
    //Guardado de no espontaneo
    guardarNoEspontaneo1(vs) 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      var arrayAsignacion = [];

      me.loaderInterno = true
  
      me.$confirm
      (
        "Esperando confirmación",
        "Estas seguro de  que deseas guardar información. Una vez realizada esta accion no prodra realizar cambios",
        function () 
        {    
          //Desactivo el modal de pregunta
          me.cerrarQuestionPersona(); 
          //Primera asignacion al facilitador que se selecciona
          arrayAsignacion.push
          ({
            moduloServicioId: me.v_facilitador.value2,
          });
          //Segunda asignacion para el notificador
          arrayAsignacion.push
          ({
            moduloServicioId: me.v_notificador.value2,
          });                

          //Inicia nuevo proceso de guardado

          //Primero creo la asignacion
          me.$justiciarestaurativa.put('api/Envios/ActualizarStatusEnvio',
          {    
            idExpediente: me.expedienteId,
            idEnvio: me.envioId,
            statusGeneralEnvio: "En trámite",
            distritoOrigen: me.idDistritoOrigen,
          }
          , configuracion).then(function(response)
          {   
            me.$notify('Informacion actualizada!!','success');

            //Una vez guardado la asignacion, guardo su informacion general correspondientes
            me.$justiciarestaurativa.post('api/AsignacionEnvios/AsignarFacilitadorNotificador',
            {    
              'EnvioId': me.envioId,  
              'ModuloServicioIdFacilitadorNotificador': arrayAsignacion,
            }
            , configuracion).then(function(response)
            {   
              me.$notify('Asignado correctamente!!','success');
              //---------------------------------------------------

                // Crear un array de promesas para manejar las solicitudes en paralelo
                let promesas = me.conjunto.map
                ((item) =>
                me.$justiciarestaurativa.post("api/Sesions/CrearSesionesRecordatorios",
                  {
                    envioId: me.envioId,
                    moduloServicioId: me.v_facilitador.value2,
                    uf_Distrito: me.u_distrito,
                    uf_DirSubProc: me.u_dirSubPro,
                    uf_Agencia: me.u_agencia,
                    uf_Modulo: me.u_modulo,
                    uf_Nombre: me.v_facilitador.value,
                    uf_Puesto: me.v_facilitador.valuep,
                    FechaHora: `${me.fCita} ${me.h_horacita}`,
                    Capturista: me.usuarioActual,
                    dirigidoa_Nombre: item.nombreR,
                    dirigidoa_Direccion: item.direccionR,
                    dirigidoa_Telefono: item.telefonoR,
                    solicitadoPor: item.nombreS,
                    solicitadoPor_Telefono: item.telefonoS,
                    ConjuntoDerivacionesId: item.idConjuntoDerivaciones,
                    Solicitantes: item.nombreS,
                    Requeridos: item.nombreR,
                    noExpediente: me.noExpediente,
                    fechaHoraCita: `${me.fCita} ${me.h_horacita}`,
                    duracion: me.duracion,
                    lugarCita: me.v_lugarcita,
                    textooficio: "",
                    un_Modulo: me.v_notificador.value4,
                    un_Nombre: me.v_notificador.value,
                    un_Puesto: me.v_notificador.value5,
                    statusEntrega: "En proceso",
                    noCitatorio: 1,
                  },configuracion).then(function (response) 
                  {
                    me.$notify("Se crearon las sesiones y recordatorios correctamente!!!","success");
                    me.idSesions.push({ value: response.data });

                  }).catch(function (err) 
                  {
                    me.$notify("Fallo la creación de las sesiones y recordatorio!!!","error");
                  })
                );

                // Esperar a que todas las solicitudes terminen antes de ejecutar las funciones
                Promise.all(promesas)
                  .then(() => {
                    me.reimprimirRecordatorio(vs);
                    me.reimprimirHojadeRegistro(); 
                  })
                  .catch(() => {
                    me.$notify(
                      "Ocurrió un error en la creación de algunas sesiones y recordatorios",
                      "error"
                    );
                  });


            }).catch(function(err)
            {
              me.$notify('Fallo la asignacion de facilitador y notificador !!!','error');
            }); 

          }).catch(function(err)
          {
            me.$notify('No es posible conectarse con el distrito que envio esta derivacion !!!','error');
          }); 
      
        },
        function () {
          alertify.warning("Verifica la información");
        }
      ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
    },
    conPersona(soli) {
      let me = this;      

      if (me.questionContanto) {
        if (soli) {
          me.casodeSolicitud = 2
        } else {
          me.casodeSolicitud = 3
        }
      } else {
        me.casodeSolicitud = 1
      }      

      me.guardarNoEspontaneo1(soli);      
    },
    guardarNoEspontaneo() {
      let me = this;
      const isValid = me.$refs.form.validate();
      
      if (isValid) {
        me.questionPersona = true;
      } else {        
        me.$notify("Favor de llenar los campos requeridos", "error");
      } 
    },
    cerrarQuestionPersona() {
      this.questionPersona = false;
    },    
    forceRerender() {
      this.componentKey += 1;
    },
    listarDerivacionesInicial() {
      //Listado
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$justiciarestaurativa
        .get(
          "api/Envios/ListarDerivacionesProcedentesInicial/" + me.u_iddistrito,
          configuracion
        )
        .then(function (response) {
          me.derivaciones = response.data;
  
          //Validacion para filtrar los expedientes con ADO solo para mujeres y cavi
          /*if(me.idCavi !== me.u_idagencia && me.idMujeres !== me.u_idagencia)
          {
            me.derivaciones = me.derivaciones.filter(derivacion => !derivacion.noExpediente.includes('ADO'));

          }*/
          me.filtros = false;
          me.contador = response.data.length;
        })
        .catch(function (error) {
          if (error.response.status == 401) {
            (me.e401 = true), (me.showpage = false);
          } else if (error.response.status == 403) {
            me.e403 = true;
            me.showpage = false;
          } else if (error.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify(error.message, "error");
          }
        });
    },
    listarDerivaciones() {
      //debugger
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      //busqueda listado por fecha
      me.$justiciarestaurativa
        .get(
          "api/Envios/ListarDerivacionesProcedentes/" +
            me.v_fechaI +
            " 00:00:00" +
            "/" +
            me.v_fechaF +
            " 23:59:59",
          configuracion
        )
        .then(function (response) {
          me.derivaciones = response.data;
          me.filtros = false;
          me.contador = response.data.length;
        })
        .catch(function (error) {
          if (error.response.status == 401) {
            (me.e401 = true), (me.showpage = false);
          } else if (error.response.status == 403) {
            me.e403 = true;
            me.showpage = false;
          } else if (error.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify(error.message, "error");
          }
        });
    },        
    informacion(item) 
    {
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      let me = this;

      me.expedienteId = item.expedienteId;
      me.noExpediente = item.noExpediente;
      me.hechoid = item.rHechoId;
      me.$store.state.idExpediente = item.idExpediente;
      me.noExpediente = item.noExpediente;
      me.$store.state.noExpediente = item.noExpediente;
      me.noDerivacion = item.noDerivacion;
      me.fechaExpediente = item.fechaDerivacion;
      me.StatusGeneral = item.statusGeneral;
      me.informacionStatus = item.informacionStatus;
      me.nuc = item.nuc;
      me.fechaHoraSuceso = item.fechaHoraSuceso;
      me.reseñaBreve = item.rBreve;

      me.direccionDelito();

      me.$justiciarestaurativa.get("api/Envios/ListaEnviosPorExpedienteNoDerivacion/" + me.expedienteId + "/" + me.noDerivacion, configuracion).then(function (response) 
      {
        me.envioId = response.data.idEnvio;
        me.$store.state.idEnvio = response.data.idEnvio;
        me.forceRerender();
        me.idDistritoOrigen = response.data.distritoOrigenId
        me.autoridadqueDeriva = response.data.autoridadqueDeriva;
        me.uqe_Distrito = response.data.uqe_Distrito;
        me.uqe_DirSubProc = response.data.uqe_DirSubProc;
        me.uqe_Agencia = response.data.uqe_Agencia;
        me.uqe_Modulo = response.data.uqe_Modulo;
        me.uqe_Nombre = response.data.uqe_Nombre;
        me.direccionAgenciaqe = response.data.uqe_DireccionAgencia;
        me.telefonosAgenciaqe = response.data.uqe_telefonoAgencia;
        me.uqe_Puesto = response.data.uqe_Puesto;
        me.StatusGeneralEnvio = response.data.statusGeneralEnvio;
        me.EspontaneoNoEspontaneo = response.data.espontaneoNoEspontaneo;
        me.primeraVezSubsecuente = response.data.primeraVezSubsecuente;
        me.ContadorNODerivacion = response.data.contadorNODerivacion;
        me.FechaRegistro = response.data.fechaRegistro;
        me.NoSolicitantes = response.data.noSolicitantes;
        var sinTratar = JSON.parse(response.data.arregloRepresentantes)
        var arrayTemporal = []
        console.log("los datos sin trata")
        console.log(sinTratar)
        sinTratar.map(aux => {          
          if (aux.personaIdRepre != '') {
            var auxD = aux.personaIdRepre.split(";")          
            auxD.map((auxT, index) => {
              arrayTemporal.push({
                correo: aux.correoRepre.split(";")[index].trim(),
                curp: aux.curpRepre.split(";")[index].trim(),
                direccion: aux.direccionRepre.split(";")[index].trim(),
                idResponsable: aux.idRepre.split(";")[index].trim(),
                nombreCompleto: aux.nombreRepre.split(";")[index].trim(),
                telefono: aux.telefonoRepre.split(";")[index].trim(),
                idPersona: auxT.trim(),
                responsable: true
              })            
            })
          }                    
        })

        console.log(arrayTemporal)

        me.arrayRepresentantes = arrayTemporal

        //*********************************************************** Traer si es conjunto o no y su informacion ************************************************** */
        me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/ListarSolicitantesRequeridosC/' +  me.envioId, configuracion).then(function(response)
        {

          if (response.data.length > 0 && response.data[0].validacion === "verdadero")
          {
            //Acciones despues de concluir
            me.$justiciarestaurativa.get("api/Sesions/ListarConjuntoPorEnvio/" + me.envioId, configuracion).then(function (response) 
            {
              me.vali = response.data[0].sec;

                response.data.map((c) => { me.idConjuntos.push({ value: c.idConjuntoDerivaciones }); });
                me.conjunto = response.data;
                me.aux1 = me.conjunto.length;
                me.v_delitosPDF = response.data[0].nombreD.split(';')

            }).catch(function (error) 
            {
              if (error.response.status == 401) {
                (me.e401 = true), (me.showpage = false);
              } else if (error.response.status == 403) {
                me.e403 = true;
                me.showpage = false;
              } else if (error.response.status == 404) {
                me.$notify("El recuso no ha sido encontrado", "error");
              } else {
                me.$notify(error.message, "error");
              }
            });
          } 
          else 
          {

            me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/ListarTodos/' + me.envioId, configuracion).then(function(response) 
            {
              me.personasC = response.data;

              //Evaluo la existencia de personas en el expediente, por alguna razon hay expedientes sin solicitantes ni requeridos
              if(response.data && response.data.length > 0)
              {
                me.$justiciarestaurativa.get('api/Delitoes/ListarDelitos/' + me.envioId, configuracion).then(function(response) 
                {

                  me.delitosC = response.data;
                  //--------------------------
                  var solicitadosC = '';
                  var requeridosC = '';
                  var delitosC = '';

                  var nombreS = '';
                  var telefonoS = '';
                  var clasificacionS = '';
                  var direccionS = '';

                  var nombreR = '';
                  var telefonoR = '';
                  var clasificacionR = '';
                  var direccionR = '';

                  var nombreD = '';

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
                              direccionS = item.direccion;
                          }
                          else
                          {
                              solicitadosC = solicitadosC + "; " + item.personaId;
                              nombreS = nombreS + "; " + item.nombreCompleto;
                              telefonoS = telefonoS + "; " + item.telefono1;
                              clasificacionS = clasificacionS + "; " + item.clasificacion;
                              direccionS = direccionS + "; " + item.direccion;
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
                              direccionR = item.direccion;
                          }
                          else
                          {
                              requeridosC = requeridosC + "; " + item.personaId;
                              nombreR = nombreR + "; " + item.nombreCompleto;
                              telefonoR = telefonoR + "; " + item.telefono1;
                              clasificacionR = clasificacionR + "; " + item.clasificacion;
                              direccionR = direccionR + "; " + item.direccion;
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

                  //En caso de detectar alguno de estos 3 datos indispensables se dara aviso y cancelara la conversion a conjunto
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
                        'DireccionS': direccionS,
                        'TelefonoS': telefonoS,
                        'ClasificacionS':clasificacionS,
                        'NombreR': nombreR,
                        'DireccionR': direccionR,
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
                        me.$justiciarestaurativa.get("api/Sesions/ListarConjuntoPorEnvio/" + me.envioId, configuracion).then(function (response) 
                        {

                          me.vali = response.data[0].sec;

                          response.data.map((c) => { me.idConjuntos.push({ value: c.idConjuntoDerivaciones }); });
                          me.conjunto = response.data;
                          me.aux1 = me.conjunto.length;

                        }).catch(function (error) 
                        {
                          if (error.response.status == 401) {
                            (me.e401 = true), (me.showpage = false);
                          } else if (error.response.status == 403) {
                            me.e403 = true;
                            me.showpage = false;
                          } else if (error.response.status == 404) {
                            me.$notify("El recuso no ha sido encontrado", "error");
                          } else {
                            me.$notify(error.message, "error");
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
                  
                  }//En la falta de alguno de estos datos te diura cual falta
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
              }//De no haber cancelo la conversion de conjuntos
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
          }
        }, configuracion).then(() => {}).catch(function (error) 
        {
            alert("No puedes dar seguimiento a este expediente ya que el numero de derivacion no coincide con el registro del expediente");
            me.close();
            me.limpiar();
        });
        //*********************************************************** Aqui termina  Traer si es conjunto o no y su informacion ************************************************** */

        me.listarNotificadores();
        //me.listarModulos();
        me.listarAgenciasDistrito()
        me.dialogform = true;
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          (me.e401 = true), (me.showpage = false);
        } else if (error.response.status == 403) {
          me.e403 = true;
          me.showpage = false;
        } else if (error.response.status == 404) {
          me.$notify("El recuso no ha sido encontrado", "error");
        } else {
          me.$notify(error.message, "error");
        }
      });
    },
    onModuloChange() {
      let nombre = this.v_modulo ? this.v_modulo.text : null;
      this.listarFacilitadores();
    },
    listarFacilitadores() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var facilitadoresarray = [];
      me.v_facilitadores = [];
      me.v_facilitador = ''

      me.$justiciarestaurativa
        .get(
          "api/FacilitadorNotificadors/ListarFacilitadores2/" +
            me.u_iddistrito +
            "/" +
            me.u_idagencia +
            "/" +
            me.modulos,
          configuracion
        )
        .then(function (response) {
          facilitadoresarray = response.data;
          if (facilitadoresarray.length > 0) {
            facilitadoresarray.map(function (x) {
              me.v_facilitadores.push({
                text: x.nombreUsuario,
                value: x.nombreUsuario,
                value2: x.moduloServicioId,
                value3: x.idFacilitadorNotificador,
                valuep: x.puesto,
              });
            });
          } else {
            me.textoNoData = 'Sin facilitadores asignados a este modulo'  
          }
        })
        .catch(function (error) {
          me.$notify(error.message, "error");
        });
    },
    listarNotificadores() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var notificadoresarray = [];
      me.$justiciarestaurativa
        .get(
          "api/FacilitadorNotificadors/ListarNotificadores/" + me.u_iddistrito,
          configuracion
        )
        .then(function (response) {
          if (response.data.length > 0) {
            notificadoresarray = response.data;
            notificadoresarray.map(function (x) {
              me.v_notificadores.push({
                text: x.nombreUsuario,
                value: x.nombreUsuario,
                value2: x.moduloServicioId,
                value3: x.idUsuario,
                value4: x.nombreModulo,
                value5: x.puesto,
              });
            });
          }else{
            me.textoNoData = `No hay notificadores disponibles`
          }
        })
        .catch(function (error) {
          me.$notify(error.message, "error");
        });
    },
    addlistaSolicitantes(solicitante) {
      let me = this;
      if (me.v_nombreSolicitantes == "") {
        me.v_nombreSolicitantes = solicitante.text;
        me.v_telefonosSolicitantes = solicitante.valor2;
      } else {
        me.v_nombreSolicitantes =
          me.v_nombreSolicitantes + ", " + solicitante.text;
        me.v_telefonosSolicitantes =
          me.v_telefonosSolicitantes + ", " + solicitante.valor2;
      }
    },
    nombresSolicitantes(data = []) {
      let me = this;
      for (var i = 0; i < data.length; i++) {
        if (me.v_nombreSolicitantes == "") {
          me.v_nombreSolicitantes = data[i].text;
          me.v_telefonosSolicitantes = data[i].valor2;
        } else {
          me.v_nombreSolicitantes =
            me.v_nombreSolicitantes + ", " + data[i].text;
          me.v_telefonosSolicitantes =
            me.v_telefonosSolicitantes + ", " + data[i].valor2;
        }
      }
    },
    nombresRequeridos(data = []) {
      let me = this;
      for (var i = 0; i < data.length; i++) {
        if (me.v_nombreRequeridos == "") {
          me.v_nombreRequeridos = data[i].text;
        } else {
          me.v_nombreRequeridos = me.v_nombreRequeridos + ", " + data[i].text;
        }
      }
    },
    listarCitatorios(envio) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$justiciarestaurativa
        .get("api/CitatorioRecordatorios/ListarCREnvio/" + envio, configuracion)
        .then(function (response) {
          me.citatoriosrecordatorios = response.data;
          //  me.modalCitatorios=true;
        }, configuracion)
        .catch(function (error) {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (me.e401 = true), (me.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    consultarNoCita(nocita) {
      switch (nocita) {
        case 1:
          this.noCitatorioText = "PRIMERA";
          return this.noCitatorioText;
          break;
        case 2:
          this.noCitatorioText = "SEGUNDA";
          return this.noCitatorioText;
          break;
        case 3:
          this.noCitatorioText = "TERCERA";
          return this.noCitatorioText;
          break;
        case 4:
          this.noCitatorioText = "CUARTA";
          return this.noCitatorioText;
          break;
        case 5:
          this.noCitatorioText = "QUINTA";
          return this.noCitatorioText;
          break;
        case 6:
          this.noCitatorioText = "SEXTA";
          return this.noCitatorioText;
          break;
        case 7:
          this.noCitatorioText = "SEPTIMA";
          return this.noCitatorioText;
          break;
        case 8:
          this.noCitatorioText = "OCTAVA";
          return this.noCitatorioText;
          break;
        case 9:
          this.noCitatorioText = "NOVENA";
          return this.noCitatorioText;
          break;
        case 10:
          this.noCitatorioText = "DECIMA";
          return this.noCitatorioText;
          break;
      }
    },
    actualizarReasignacionFacilitadores(data = []) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      for (var i = 0; i < data.length; i++) {
        var idFacNot = data[i].idFacilitadorNotificador;
        me.$justiciarestaurativa
          .put(
            "api/FacilitadorNotificadors/StatusReAsignacionFacilitador",
            {
              idFacilitadorNotificador: idFacNot,
              distritoId: me.u_iddistrito,
              statusAsignado: false,
            },
            configuracion
          )
          .then(function (response) {})
          .catch(function (error) {
            if (error.response.status == 401) {
              (me.e401 = true), (me.showpage = false);
            } else if (error.response.status == 403) {
              me.e403 = true;
              me.showpage = false;
            } else if (error.response.status == 404) {
              me.$notify("El recuso no ha sido encontrado", "error");
            } else {
              me.$notify(error.message, "error");
            }
          });
      }
    },
    actualizarReasignacionNotificadores(data = []) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      for (var i = 0; i < data.length; i++) {
        var idFacNot = data[i].idFacilitadorNotificador;
        me.$justiciarestaurativa
          .put(
            "api/FacilitadorNotificadors/StatusReAsignacionNotificador",
            {
              idFacilitadorNotificador: idFacNot,
              distritoId: me.u_iddistrito,
              statusAsignado: false,
            },
            configuracion
          )
          .then(function (response) {})
          .catch(function (error) {
            if (error.response.status == 401) {
              (me.e401 = true), (me.showpage = false);
            } else if (error.response.status == 403) {
              me.e403 = true;
              me.showpage = false;
            } else if (error.response.status == 404) {
              me.$notify("El recuso no ha sido encontrado", "error");
            } else {
              me.$notify(error.message, "error");
            }
          });
      }
    },
    funSolicitantesRequeridos(SolReq) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$justiciarestaurativa
        .get(
          "api/SolicitanteRequeridoes/ListarSolicitantesRequeridos/" +
            me.envioId +
            "/" +
            SolReq,
          configuracion
        )
        .then(function (response) {
          if (SolReq == "Requerido") me.listarRequeridos = response.data;
          else me.listarSolicitantes = response.data;
        })
        .catch(function (error) {
          me.$notify(error.message, "error");
        });
    },
    listarAgenda() {
      let me = this;
      me.events = [];
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      var eventsarray = [];
      me.$justiciarestaurativa
        .get(
          "api/CitatorioRecordatorios/ListaFiltroCR/" +
            me.v_facilitadorFiltro.value,
          configuracion
        )
        .then(function (response) {
          eventsarray = response.data;
          eventsarray.map(function (x) {
            me.events.push({
              expediente: x.noExpediente,
              sesion: x.sesionId,
              dirigidoa_Nombre: x.dirigidoa_Nombre,
              fechaCita: moment(x.fechaHoraCita).format(
                "MMMM Do YYYY, h:mm:ss a"
              ),
              date: moment(x.fechaHoraCita).format("YYYY-MM-DD"),
              time: moment(x.fechaHoraCita).format("hh:mm"),
              duration: x.duracion,
              noCitatorio: x.noCitatorio,
              statusAsistencia: x.statusAsistencia,
              statusEntrega: x.statusEntrega,
            });
          });
        }, configuracion)
        .catch(function (error) {
          if (error.response.status == 401) {
            (me.e401 = true), (me.showpage = false);
          } else if (error.response.status == 403) {
            me.e403 = true;
            me.showpage = false;
          } else if (error.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify(error.message, "error");
          }
        });
    },
    open(event) {
      let me = this;
      this.listaC = [];
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var sesionId = event.sesion;
      var listaCitasarray = [];
      me.$justiciarestaurativa
        .get(
          "api/CitatorioRecordatorios/ListarC/" +
            me.u_idmoduloservicio +
            "/" +
            sesionId,
          configuracion
        )
        .then(function (response) {
          listaCitasarray = response.data;
          listaCitasarray.map(function (x) {
            me.listaC.push({
              expediente: x.noExpediente,
              sesion: x.sesionId,
              dirigidoa_Nombre: x.dirigidoa_Nombre,
              fechaCita: moment(x.fechaHoraCita).format(
                "MMMM Do YYYY, h:mm:ss a"
              ),
              date: moment(x.fechaHoraCita).format("YYYY-MM-DD"),
              time: moment(x.fechaHoraCita).format("hh:mm"),
              duration: x.duracion,
              noCitatorio: x.noCitatorio,
              statusAsistencia: x.statusAsistencia,
              statusEntrega: x.statusEntrega,
            });
          });
        }, configuracion)
        .catch(function (error) {
          if (err.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (err.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (me.e401 = true), (me.showpage = false);
          } else if (err.response.status == 403) {
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (err.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    guardar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      const isValid = me.$refs.form.validate();      
      
      if (isValid) {   
      me.$confirm(
        "Esperando confirmación",
        "Estas seguro de  que deseas guardar información. Una vez realizada esta accion no prodra realizar cambios",
        function () {
          //***************************************************************** */

          me.asignaciones.push({
            envioId: me.envioId,
            moduloServicioId: me.v_facilitador.value2,
          });
          me.asignaciones.push({
            envioId: me.envioId,
            moduloServicioId: me.v_notificador.value2,
          });


          var idmoduloFacilitador = me.v_facilitador.value2;
          var idmoduloNotificador = me.v_notificador.value2;
          axios
            .all([
              me.$controlacceso.get(
                "api/Usuarios/ListarModulo/" + idmoduloFacilitador,
                configuracion
              ),
              me.$controlacceso.get(
                "api/Usuarios/ListarModulo/" + idmoduloNotificador,
                configuracion
              ),
            ])
            .then((responseArr) => {
              //***************************************************************** */

              me.$justiciarestaurativa
                .put(
                  "api/Envios/StatusModuloRespuesta",
                  {
                    idExpediente: me.expedienteId,
                    idEnvio: me.envioId,
                    statusGeneralEnvio: "En trámite",
                    sede: me.u_nombrejr,
                    Cosecutivo: 0,
                    distritoOrigen: me.idDistritoOrigen 
                  },
                  configuracion
                )
                .then(function (response) {
                  me.$justiciarestaurativa
                    .post(
                      "api/AsignacionEnvios/CrearAsingacion2",
                      {
                        envioId: me.envioId,
                        moduloServicioId: me.v_facilitador.value2,

                        asignaciones: [
                          {
                            envioId: me.envioId,
                            moduloServicioId: me.v_notificador.value2,
                          },
                          {
                            envioId: me.envioId,
                            moduloServicioId: me.u_idmoduloservicio,
                          },
                        ],
                      },
                      configuracion
                    )
                    .then(function (response) {
                      if (response.data.fhnd) {
                        me.$notify(
                          "La fecha y hora seleccionada ya no esta disponible para este facilitador",
                          "error"
                        );
                      } else {
                        // me.listarCitatorios(me.envioId);
                        me.$notify(
                          "Se ha Asignado Correctamente",
                          "Asignación Creada"
                        );
                        me.dialogform = false;
                        me.listarDerivacionesInicial();
                        me.limpiar();
                      }
                    })
                    .catch(function (error) {
                      if (error.response.status == 401) {
                        (me.e401 = true), (me.showpage = false);
                      } else if (error.response.status == 403) {
                        me.e403 = true;
                        me.showpage = false;
                      } else if (error.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", "error");
                      } else {
                        me.$notify(error.message, "error");
                      }
                    });
                })
                .catch(function (error) {
                  alert("Al parecer no hay conexion con el distrito que envio esta derivación, comunicate con el area de TICs a la extensión 9292");
                });

              //***************************************************************** */

              //******************************************************************************************************************* */
            })
            .catch(function (error) {
              me.$notify(error.message, "error");
            });
          //************************************************************ */
        },
        function () {
          alertify.warning("Verifica la información");
        }
      ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
      } else {
        me.$notify("Favor de llenar los campos requeridos", "error");
      }
    },
    //? Función para generar los citatorios
    citatoriosPDF() {      
      let me = this 
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");      
      var logo1 = me.logo1;
      var logo2 = me.logo2;
      var logo3 = me.logo3;
      var logo4 = me.logo4;
      var diragencia = me.direccionAgencia;
      var telagencia = me.telefonosAgencia;        
      var listadelito = "";
      var ddd = [];

      me.v_delitosPDF.map(qw => {
        if (listadelito == "") {
          listadelito += qw.trim()
        } else {
          listadelito += `, ${qw.trim()}`  
        }
      })    

      var fechaCita = `${dia} de ${mes} del ${año}`;
      var dia = moment().format("DD");
      var mes = moment().format("MMMM");
      var año = moment().format("YYYY");
      var hr = moment().format("h:mm:ss a");
      var fecha = `${dia} de ${mes} del ${año}, ${hr}`;
      
      if (me.editedIndex == 1) {
        var dia = moment(me.fechaHoraCita).format("DD");
        var mes = moment(me.fechaHoraCita).format("MMMM");
        var año = moment(me.fechaHoraCita).format("YYYY");
        var fechaCita = `${dia} de ${mes} del ${año}`;
        var hrCita = moment(me.fechaHoraCita).format("h:mm:ss a");        
        var pdf_distrito = me.uf_Distrito;
        var pdf_dirsubproc = me.uf_DirSubProc;
        var pdf_agencia = me.uf_Agencia;
        var pdf_usuario = me.uf_Nombre;
        var pdf_puesto = me.uf_Puesto;
        var pdf_modulo = me.uf_Modulo;
      } else {
        var fhc = `${me.v_fechac} ${me.v_horacita}`;
        var dia = moment(fhc).format("DD");
        var mes = moment(fhc).format("MMMM");
        var año = moment(fhc).format("YYYY");
        var hrCita = moment(fhc).format("h:mm:ss: a");
        var fechaCita = `${dia} de ${mes} del ${año}`;        
        var pdf_distrito = me.u_distrito;
        var pdf_dirsubproc = me.u_dirSubPro;
        var pdf_agencia = me.u_agencia;
        var pdf_usuario = me.u_nombre;
        var pdf_puesto = me.u_puesto;
        var pdf_modulo = me.u_modulo;
        me.nombre = me.v_requerido.text;
      }       
                          
      //^ Bloque para agregar los citatorios de los requeridos
      me.requeridoC.map((req, index) => {          
        ddd.push(
          {
            text: `${pdf_dirsubproc}\n${pdf_agencia}`,
            style: "headertext",
            absolutePosition: { x: 85, y: 95 },
          },
          {
            columns: [
              [
                {
                  text: " ",
                  alignment: "right", // Aligns 'Column 2' text to right
                },
                {
                  columns: [
                    {
                      text: "",
                      width: "*",
                    },
                    {
                      style: "table1",
                      table: {
                        body: [
                          ["Fecha", fecha],
                          ["Expediente", me.noExpediente],
                          ["Carpeta de investigación", me.nuc],
                          ["Cita número", me.noCitatorioText],
                        ],
                      },
                      alignment: "center", // Optional, for body texts
                      width: "auto", // Changes width of the table
                    },
                  ],
                },
              ],
            ],
          },
          "\n\n",
          {
            text:`${req.nombre} con domicilio ${req.domicilio == ", No.Ext S/N, CP 0, , , " ? "LO DESCONOCE" : req.domicilio} \n ${req.representante.responsable == true ? `Representado por ${req.representante.nombreCompleto} con domicilio ${req.representante.direccion}` : ''}`,
            style: "subtitulo",
          },
          "\n\n\n",                    
          {            
            text: htmlToPdfmake(me.textosRequeridoSolicitantePDF(req.clasificacion)),            
            style: "textobold",
          },
          "\n",
          {
            columns: [
              {
                style: "table2",
                table: {
                  widths: [120, "auto"],
                  body: [
                    ["Fecha de su cita", fechaCita],
                    ["Hora de su cita", hrCita],
                    ["Lugar de su cita", me.v_lugarcita],
                  ],
                },
                alignment: "center", // Optional, for body texts
                width: "auto", // Changes width of the table
              },
            ],
          },
          "\n",
          {
            text:`El motivo de su cita es por una denuncia penal interpuesta en su contra por ${me.personasconRepresentantesPDF(me.solicitanteC)} por ${me.delitoparacitatorio.split(',').length > 1 ? 'los delitos de' : 'el delito de'} ${this.delitoparacitatorio} de conformidad con el Código Penal del Estado de Hidalgo, dicho delito es sancionable.`,
            style: "texto",
          },
          "\n",
          {
            text: "Sin embargo, dada la naturaleza de su asunto, la Procuraduría General de Justicia lo invita a resolver su conflicto mediante un mecanismo alternativo de solución de controversias, ANTES de que su carpeta de investigación se continúe integrando.",
            style: "texto",
          },
          "\n",
          {
            text: "De conformidad con los artículos 1, 4 y 14 de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal, estos mecanismos tienen como finalidad propiciar, a través del diálogo, la solución de las controversias que surjan entre miembros de la sociedad mediante procedimientos basados en la oralidad, la economía procesal y la confidencialidad. ",
            style: "texto",
          },
          "\n\n\n\n\n\n",
          {
            text:`${this.v_facilitador.value} \n ${this.pdf_puesto} \n ADSCRITO A LA ${pdf_agencia.toUpperCase()} \n\n\n\n\n\n\n\n\n\n`,
            style: "ampo",
          },
          {
            text: "RAZÓN",
            style: "titulo",
            pageBreak: "before",
          },
          "\n\n\n\n",
          {
            text:`
              En el Municipio ____________________ Estado de Hidalgo, siendo las __________ horas, del dia ___ de __________ del año en curso, dentro del expediente ${me.noExpediente}, me constituí en el domicilio del C. ___________________________________________ ubicado en ________________________________________________________________________________________ y cuyas caracteristicas del domicilio son: _______________________________________________________________________, haciendo constar que fui atendido por _______________________________________ quien refirio llamarse __________________________________________ por lo que procedi a ____________________________. Lo anterior para los fines legales a que haya lugar.`,
            style: "texto",
          },
          "\n\n\n\n",
          {
            text:`
              Observaciones: __________________________________________________________________________ 
              _________________________________________________________________________________________ 
              _________________________________________________________________________________________`,
            style: "subtitulo",
          },
          "\n\n\n\n",
          {
            text: "ESTATUS DE ENTREGA",
            style: "titulo",
          },
          "\n\n\n\n",
          {
            style: "table3",
            table: {
              headerRows: 1,
              widths: [90, 30, 220, 70],
              body: [
                [
                  { text: "Status" },
                  { text: "Marcar con X" },
                  { text: "Escribir numero, fecha y hora de visitas" },
                  { text: "Asistencia de la persona" },
                ],
                ["Domicilio incorrecto", "", "", ""],
                ["Entregado a familiar o conocido", "", "", ""],
                ["Entregado personal", "", "", ""],
                ["Fijado", "", "", ""],
                ["No se ubica el domicilio", "", "", ""],
                ["Nombre incorrecto", "", "", ""],
                ["Ya no vive ahí", "", "", ""],
              ],
            },
            layout: {
              hLineWidth: function (i, node) {
                return i === 0 || i === node.table.body.length ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return i === 0 || i === node.table.widths.length ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return i === 0 || i === node.table.body.length ? "black" : "gray";
              },
              vLineColor: function (i, node) {
                return i === 0 || i === node.table.widths.length ? "black" : "gray";
              },              
            },
          },
          "\n\n\n\n",
          {
            text:`LIC. __________________________________\nNOTIFICADOR ESPECIALIZADO`,
            style: "ampo",
          }
        );
        if (index != me.requeridoC.length - 1) {
            ddd.push({
              text: "", // No es necesario agregar un texto, solo se añadirá una nueva página
              pageBreak: "after", // Indica que se debe agregar una nueva página después de este elemento
            });
        }
      });

      if (me.casodeSolicitud == 3) {
        //^ Bloque para agregar un salta de página
        ddd.push({
          text: "", // No es necesario agregar un texto, solo se añadirá una nueva página
          pageBreak: "after", // Indica que se debe agregar una nueva página después de este elemento
        });
  
        //^ Bloque para agregar los citatorios de los solicitantes
        me.solicitanteC.map((sol, index) => {
          ddd.push(
            {
              text: `${pdf_dirsubproc}\n${pdf_agencia}`,
              style: "headertext",
              absolutePosition: { x: 85, y: 95 },
            },
            {
              columns: [
                [
                  {
                    text: " ",
                    alignment: "right", // Aligns 'Column 2' text to right
                  },
                  {
                    columns: [
                      {
                        text: "",
                        width: "*",
                      },
                      {
                        style: "table1",
                        table: {
                          body: [
                            ["Fecha", fecha],
                            ["Expediente", me.noExpediente],
                            ["Carpeta de investigación", me.nuc],
                            ["Cita número", me.noCitatorioText],
                          ],
                        },
                        alignment: "center", // Optional, for body texts
                        width: "auto", // Changes width of the table
                      },
                    ],
                  },
                ],
              ],
            },
            "\n\n",
            {
              text:`${sol.nombre} con domicilio ${sol.domicilio == ", No.Ext S/N, CP 0, , , " ? "LO DESCONOCE" : sol.domicilio}\n${sol.representante.responsable == true ? `Representado por ${sol.representante.nombreCompleto} con domicilio ${sol.representante.direccion}` : '' }`,
              style: "subtitulo",
            },
            "\n\n\n",        
            {
              text: htmlToPdfmake(me.textosRequeridoSolicitantePDF(sol.clasificacion)),
              style: "textobold",
            },
            "\n",
            {
              columns: [
                {
                  style: "table2",
                  table: {
                    widths: [120, "auto"],
                    body: [
                      ["Fecha de su cita", fechaCita],
                      ["Hora de su cita", hrCita],
                      ["Lugar de su cita", me.direAgencia],
                    ],
                  },
                  alignment: "center", // Optional, for body texts
                  width: "auto", // Changes width of the table
                },
              ],
            },
            "\n",
            {
              text:`El motivo de su cita es por una denuncia penal interpuesta por usted y para reunirse con ${me.personasconRepresentantesPDF(me.requeridoC)} por ${me.delitoparacitatorio.split(',').length > 1 ? 'los delitos de' : 'el delito de'} ${delitoparacitatorio}, de conformidad con el Código Penal del Estado de Hidalgo.`,
              style: "texto",
            },
            "\n",
            {
              text: "Sin embargo, dada la naturaleza de su asunto, la Procuraduría General de Justicia lo invita a resolver su conflicto mediante un mecanismo alternativo de solución de controversias, ANTES de que su carpeta de investigación se continúe integrando.",
              style: "texto",
            },
            "\n",
            {
              text: "De conformidad con los artículos 1, 4 y 14 de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal, estos mecanismos tienen como finalidad propiciar, a través del diálogo, la solución de las controversias que surjan entre miembros de la sociedad mediante procedimientos basados en la oralidad, la economía procesal y la confidencialidad. ",
              style: "texto",
            },
            "\n\n\n\n\n\n",
            {
              text:`${pdf_usuario}\n${pdf_puesto}\nADSCRITO A LA ${pdf_agencia.toUpperCase()}\n\n\n\n\n\n\n\n\n\n`,
              style: "ampo",
            },
            {
              text: "RAZÓN",
              style: "titulo",
              pageBreak: "before",
            },
            "\n\n\n\n",
            {
              text:
                `En el Municipio ____________________ Estado de Hidalgo, siendo las __________ horas, del dia ___ de __________ del año en curso, dentro del expediente ${me.noExpediente}, me constituí en el domicilio del C. ___________________________________________ ubicado en ________________________________________________________________________________________ y cuyas caracteristicas del domicilio son: _______________________________________________________________________, haciendo constar que fui atendido por _______________________________________ quien refirio llamarse __________________________________________ por lo que procedi a ____________________________. Lo anterior para los fines legales a que haya lugar.`,
              style: "texto",
            },
            "\n\n\n\n",
            {
              text:
                `Observaciones: __________________________________________________________________________ 
                _________________________________________________________________________________________ 
                _________________________________________________________________________________________`,
              style: "subtitulo",
            },
            "\n\n\n\n",
            {
              text: "ESTATUS DE ENTREGA",
              style: "titulo",
            },
            "\n\n\n\n",
            {
              style: "table3",
              table: {
                headerRows: 1,
                widths: [90, 30, 220, 70],
                body: [
                  [
                    { text: "Status" },
                    { text: "Marcar con X" },
                    { text: "Escribir numero, fecha y hora de visitas" },
                    { text: "Asistencia de la persona" },
                  ],
                  ["Domicilio incorrecto", "", "", ""],
                  ["Entregado a familiar o conocido", "", "", ""],
                  ["Entregado personal", "", "", ""],
                  ["Fijado", "", "", ""],
                  ["No se ubica el domicilio", "", "", ""],
                  ["Nombre incorrecto", "", "", ""],
                  ["Ya no vive ahí", "", "", ""],
                ],
              },
              layout: {
                hLineWidth: function (i, node) {
                  return i === 0 || i === node.table.body.length ? 2 : 1;
                },
                vLineWidth: function (i, node) {
                  return i === 0 || i === node.table.widths.length ? 2 : 1;
                },
                hLineColor: function (i, node) {
                  return i === 0 || i === node.table.body.length ? "black" : "gray";
                },
                vLineColor: function (i, node) {
                  return i === 0 || i === node.table.widths.length ? "black" : "gray";
                },              
              },
            },
            "\n\n\n\n",
            {
              text:
                `LIC. __________________________________\nNOTIFICADOR ESPECIALIZADO`,
              style: "ampo",
            }
          );
          if (index != me.solicitanteC.length - 1) {
            ddd.push({
              text: "", // No es necesario agregar un texto, solo se añadirá una nueva página
              pageBreak: "after", // Indica que se debe agregar una nueva página después de este elemento
            });
          }
        });        
      }
      
      var dd = {
        pageSize: "LEGAL",
        pageOrientation: "portrait",
        pageMargins: [85, 130, 72, 60],
        footer: function (currentPage, pageCount) {
          return {
            columns: [
              {
                image: logo4,
                width: 612,
                absolutePosition: { x: 0, y: 0 },
              },
              {
                text:`${diragencia}\n${telagencia} www.hidalgo.gob.mx`,
                style: "footertext",
                margin: [312, 12, 72, 0],
                alignment: "right",
                absolutePosition: { x: 0, y: 30 },
              },
              me.vistaPreviaTF == false ? 
              {
                  image: me.qrCodeC,
                  width: 80, // Ajusta el ancho según tu diseño
                  height: 80, // Ajusta la altura según tu diseño
                  absolutePosition: { x: 5, y: -80 }, // Ajusta las coordenadas según tu diseño

              }
              : "",
            ],
          };
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
        content: ddd,
        styles: {
          headertext: {
            fontSize: 10,
            bold: true,
          },
          fecha: {
            fontSize: 11,
            alignment: "right",
          },
          nuc: {
            fontSize: 12,
            alignment: "right",
            bold: true,
          },
          titulo: {
            fontSize: 12,
            bold: true,
            alignment: "center",
          },
          titulo: {
            fontSize: 11,
            bold: true,
            alignment: "center",
          },
          DePara: {
            fontSize: 11,
            bold: true,
          },
          DeParaCargo: {
            fontSize: 10,
            bold: true,
          },
          table1: {
            fontSize: 9,
            margin: [0, 5, 0, 15],
            alignment: "left",
          },
          table2: {
            fontSize: 9,
            margin: [0, 5, 0, 5],
            alignment: "left",
          },
          table3: {
            fontSize: 9,
            margin: [0, 5, 0, 5],
            alignment: "center",
          },
          subtitulo: {
            fontSize: 11,
            bold: true,
          },

          footertext: {
            fontSize: 7,
            color: "white",
          },
          textoDireccion: {
            fontSize: 12,
            alignment: "left",
          },
          texto: {
            fontSize: 10,
            alignment: "justify",
          },
          textobold: {
            fontSize: 10,
            bold: true,
            alignment: "justify",
          },
          compareciente: {
            fontSize: 12,
            bold: true,
            alignment: "right",
          },
          ampo: {
            fontSize: 12,
            bold: true,
            alignment: "center",
          },
          cargo: {
            fontSize: 11,
            regular: true,
            alignment: "center",
          },
        },
      };
      return dd;
    },
    //? Función para generar los recordatorios
    recordatoriosPDF() {
      let me = this
      var pdfMake = require("pdfmake/build/pdfmake.js");      
      var logo1 = me.logo1;
      var logo2 = me.logo2;
      var logo3 = me.logo3;
      var diragencia = me.direccionAgencia;
      var telagencia = me.telefonosAgencia;

      if (me.editedIndex == 1) {
        var dia = moment(me.fechaHoraCita).format("DD");
        var mes = moment(me.fechaHoraCita).format("MMMM");
        var año = moment(me.fechaHoraCita).format("YYYY");
        var hr = moment(me.fechaHoraCita).format("h:mm:ss a");
        var pdf_distrito = me.uf_Distrito;
        var pdf_dirsubproc = me.uf_DirSubProc;
        var pdf_agencia = me.uf_Agencia;
        var pdf_usuario = me.uf_Nombre;
        var pdf_puesto = me.uf_Puesto;
        var pdf_modulo = me.uf_Modulo;
        var fecha = `${dia} de ${mes} del ${año}, ${hr}`;
      } else {
        var dia = moment().format("DD");
        var mes = moment().format("MMMM");
        var año = moment().format("YYYY");
        var hr = moment().format("h:mm:ss a");
        var pdf_distrito = me.u_distrito;
        var pdf_dirsubproc = me.u_dirSubPro;
        var pdf_agencia = me.u_agencia;
        var pdf_usuario = me.u_nombre;
        var pdf_puesto = me.u_puesto;
        var pdf_modulo = me.u_modulo;
        var fecha = `${dia} de ${mes} del ${año}, ${hr}`;
      }           

      var contenidoRecordatorio = []

      for (let index = 0; index < 2; index++) {        
        contenidoRecordatorio.push(
          "\n\n\n",
          {
            image: logo3,
            width: 612,
            absolutePosition: { x: 0, y: 0 },
          },
          {
            text: pdf_dirsubproc,
            style: "textobold",            
          },
          "\n",
          {
            text: `\nRECORDATORIO\n\n\n`,
            fontSize: 14,
            bold: true,
            alignment: "center",
          },
          {
            text: `N° Expediente: ${me.noExpediente}\n\n\n`,
            style: "nuc",
          },
          {
            text:
              `Su cita es a las ${me.formatearfechahora(me.fechaHoraCita).substr(10, 6)} del día ${me.formatearfechaTexo(me.fechaHoraCita)}`,
            alignment: "center",
          },
          {
            text: `\nSu facilitador asignado es: ${pdf_usuario}`,
            alignment: "center",
          },
          {
            text: "\nLos horarios de atención son: Lunes a Viernes de 9:00 a 17:00 horas.",
            alignment: "center",
          },
          "\n",
          {
            style: "table1",
            table: {
              headerRows: 1,
              body: [
                [{ text: me.direAgencia, alignment: "center" }],
                [
                  {
                    text: "Nota:  Favor  de  acudir  con original y copia de una identificación oficial con fotografía (Requisito indispensable para cualquier trámite)",
                    alignment: "center",
                    bold: "true",
                  },
                ],
              ],
            },
            layout: "Borders",
          },
          {
            text: "En caso de identificarse con licencia de conducir, pasaporte, cartilla del servicio militar, constancia de radicación o algún otro documento fehaciente deberá anexar una impresión de su CURP.",
            alignment: "center",
          },
        )

        if (index == 0) {
          contenidoRecordatorio.push(
            {
              text: "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ",
            },
          )  
        }
      }
      
      var ddR = {
        pageSize: "LEGAL",
        pageOrientation: "portrait",
        pageMargins: [30, 50, 30, 30],
        footer: function (currentPage, pageCount) {
          return {
            columns: [             
              me.vistaPreviaTF == false ? 
              {
                  image: me.qrCodeR,
                  width: 80, // Ajusta el ancho según tu diseño
                  height: 80, // Ajusta la altura según tu diseño
                  absolutePosition: { x: 5, y: -757 }, // Ajusta las coordenadas según tu diseño
              }
              : "",
              me.vistaPreviaTF == false ? 
              {
                  image: me.qrCodeR,
                  width: 80, // Ajusta el ancho según tu diseño
                  height: 80, // Ajusta la altura según tu diseño
                  absolutePosition: { x: 5, y: -370 }, // Ajusta las coordenadas según tu diseño
              }
              : "",
            ],
          };
        },
        content: contenidoRecordatorio,
        styles: {
          fecha: {
            fontSize: 11,
            alignment: "right",
          },
          texto: {
            fontSize: 12,
            alignment: "justify",
          },
          textobold: {
            fontSize: 12,
            bold: true,
            alignment: "center",
          },
          compareciente: {
            fontSize: 12,
            bold: true,
            alignment: "right",
          },
          ampo: {
            fontSize: 12,
            bold: true,
            alignment: "left",
          },
          table: {
            fontSize: 9,
            margin: [0, 5, 0, 15],
            alignment: "center",
          },
          table1: {
            margin: [0, 5, 0, 15],
            alignment: "center",
          },
          texto1: {
            fontSize: 11,
            bold: true,            
          },
          texto2: {
            fontSize: 11,            
          },
          nuc: {
            fontSize: 12,
            alignment: "right",
            bold: true,
          },
        },
      };

      return ddR;
    },
    //? Función para retornar un texto para el cuerpo del PDF dependiendo la clasificación de la persona
    textosRequeridoSolicitantePDF(clasificación) {      

      var html_Imputado = "<p>Para poner fin al procedimiento penal iniciado en su contra, acuda a esta cita y resuelva su asunto antes de que su carpeta de investigación pueda ser sometida ante un juez.</p>"
      var html_Solicitante = "<p>Para poner fin al procedimiento penal iniciado por usted, acuda a esta cita y resuelva su asunto antes de que su carpeta de investigación pueda ser sometida ante un juez.</p>"

      if (clasificación == 'Imputado') return html_Imputado

      return html_Solicitante
    },
    //? Función para retornar un texto con los nombres de las personas junto con el nombre de los representantes en caso de tener
    personasconRepresentantesPDF(personas) {
      let nombresCR = ''

      personas.map((a) => {        
        if (nombresCR == '') {
          if (a.representante.responsable == true) {
            nombresCR = `${a.nombre} representado por ${a.representante.nombreCompleto}`
          } else {
            nombresCR = `${a.nombre}`;                      
          }                      
        } else {
          if (a.representante.responsable == true) {
            nombresCR += `, ${a.nombre} representado por ${a.representante.nombreCompleto}`
          } else {
            nombresCR += `, ${a.nombre}`;                      
          } 
        }
      })

      return nombresCR
    },
    //************************************************************************************************************************************************************************************ */
    //* FUNCIONES DE SOPORTE PARA FLUJO
    //************************************************************************************************************************************************************************************ */
    download: function () {
      const data = XLSX.utils.json_to_sheet(this.derivaciones);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, "data");
      XLSX.writeFile(wb, "lista.xlsx");
    },
    filtrar() {
      let me = this;
      me.filtros = true;
    },
    formatearfechahora: function (fecha) {
      return moment(fecha).format("DD/MM/YYYY HH:mm:ss a");
    },
    formatearfecha: function (fecha) {
      return moment(fecha).format("DD/MM/YYYY");
    },
    formatearhora: function (hora) {
      return moment(hora).format("hh:mm:ss a");
    },
    formatearfechaTexo(fecha) {
      let me = this;
      var dia = moment(fecha).format("DD");
      var mes = moment(fecha).format("MMMM");
      var año = moment(fecha).format("YYYY");
      var fecha = dia + " de " + mes + " del " + año;
      return fecha;
    },
    close() {      
      this.modal_Informacion = false;
      // this.modalCitatorios=false;
      this.modal_citatoriorecordatorio = false;
      this.modalProceso = false;
      this.dialogform = false;
      (this.listarSolicitantes = []),
        (this.listarRequeridos = []),
        (this.statusSolicitud = "Procedente");
      this.motivo = "";
      this.v_solicitantes = [];
      this.v_fechaI = ''
      this.v_requeridos = [];
      this.horariosFacilitadores = []
      this.v_requerido = "";
      this.v_modulo = "";
      this.moduloSeleccionado = ""
      this.panel = 0
      this.textoNoData = "Completa el formulario para ver el listado",
      this.textoNoDataN = "Completa el formulario para ver el listado",
      this.textoNoDataM = "Selecciona una agencia para ver los modulos disponibles",        
      this.v_facilitadores = []
      this.modulos = "";
      this.fCita = "";
      this.v_agencia = ""
      this.h_menu = "";
      this.h_horacita = "";
      this.duracion = "";
      this.v_lugarcita = this.direAgencia;
      this.switch2 = false;
      //this.pdfs = []      
    },
    limpiar() {
      let me = this;
      me.v_tipocitatorio = "";
      me.v_nombreSolicitantes = "";
      me.v_telefonosSolicitantes = "";
      me.v_requerido = "";
      me.v_menu1 = false;
      me.v_fechacita = "";
      me.v_fechac = "";

      me.v_menu2 = false;
      me.panel = 0
      me.v_horacita = "";
      me.v_horac = "";
      me.v_fechaI = ''
      me.moduloSeleccionado = ""
      me.horariosFacilitadores = []

      me.v_lugarcita =
        "SALA DE MEDIACIÓN  NÚMERO I (Agregar dirección de la sede correspondiente)";

      me.continuidad = "";

      me.citatorio1v1 = "";
      me.citatorio1v2 = "";
      me.v_agencia = ""
      me.textoNoData = "Completa el formulario para ver el listado",
      me.textoNoDataN = "Completa el formulario para ver el listado",
      me.textoNoDataM = "Selecciona una agencia para ver los modulos disponibles", 

      me.citatorio2 = "";
      me.citatorio3 = "";

      //me.fechaHoraCita = "";
      me.v_statusAsistencia = false;
      me.nombre = "";
      me.direccionS = "";
      me.direccionR = "";
      me.telefono = "";
      me.correo = "";
      me.titulo = "";

      me.statussesion = "";
      me.descripcion = "";
      me.v_modulo = "";
      me.v_facilitadores = []  
      //me.v_facilitador = "";
      //me.v_notificador = "";

      me.asignaciones = [];
      me.modulos = ""
      me.switch2 = false;

      me.conjuntosDetalles = [];
      me.idSesions = [];
      me.solicitadosHR = [];
      me.requeridosHR = [];
      me.delitosHR= [];
      me.idConjuntos = [];
      me.uf_Nombre = ""

      //me.editedIndex = -1;
    },
    //* Función para limpiar parcialmente el formulario de asignación
    limpiarFormulario() {
      let me = this

      me.listarNotificadores()  
      me.fCita = ''
      me.v_modulo = ''      
      me.v_modulos = []
      me.h_horacita = ''
      me.horariosFacilitadores = []
      me.duracion = ''            
      me.v_facilitadores = []            
      me.v_notificadores = []      
    },
    cerrarFull() {
      let me = this;
      //me.modalCitatorios=false;
      me.listarDerivacionesInicial();
      me.close();
      me.limpiar();
    },    
    formatearfechaAgenda: function (fecha) {
      return moment(fecha).format("MMMM , YYYY");
    },
    formatearfechaCita: function (fecha) {
      return moment(fecha).format("MMMM , YYYY");
    },
    //? Función para preparar los PDF en raw para su guardado en el archivo comprimido
    blobPdf(contenido) {      
      return new Promise((resolve) => {                
        pdfMake.createPdf(contenido).getBlob((blob) => {
          resolve(blob);
        });
      });
    },
    //? Función para leer los datos formateados para crear pdf y generar el archivo comprimido
    async archivoComprimido() {
      let me = this
      const zip = new JSZip()
      let auxC = me.aux1       

      const pfBlob = me.pdfs.map(async(pdf, index) => {
        const pf = await me.blobPdf(pdf.documento)
        if (pdf.name == 'Hoja de registro') {
          zip.file(`${pdf.name}.pdf`, pf)          
        } else {          
          if (pdf.name == 'Recordatorio') {
            zip.file(`${pdf.name}.pdf`, pf)                                  
          } else {
            zip.file(`Citatorios de conjunto (${pdf.delito}).pdf`, pf)                    
            auxC--
          }
        }          
      })

      await Promise.all(pfBlob)

      const zipContent = await zip.generateAsync({ type: 'blob' })
      
      saveAs(zipContent, `Oficios de sesión - ${me.noExpediente}.zip`)  
      
      this.pdfs = []      
      me.qrCode = ''
      me.qrCodeC = ''
      me.qrCodeR = ''
      me.editedIndex = -1;
      me.loaderInterno = false
      me.v_notificador = "";
      me.v_facilitador = "";
      me.fechaHoraCita = "";
    },
    //? Función para generar el código QR
    async generarQR(tipodo,nuc,nombrefirma,fechadoc,id) 
    {        
        let me = this
        
        var textoModificado = nuc.replace(/-/g, "~")
        var date = moment(fechadoc, "YYYY-MM-DD HH:mm:ss")
        var dia = moment(date).format("DD")
        var mes = moment(date).format("MMMM")
        var año = moment(date).format("YYYY")
        var fecha = dia + " de " + mes + " del " + año                        

        try {
          if (me.docRemision == 'Hoja de registro') {            
            me.qrCode = await generarQRCodeBase64(tipodo,textoModificado,nombrefirma,fecha,id)
          }
          if (me.docRemision == 'Recordatorio') {            
            me.qrCodeR = await generarQRCodeBase64(tipodo,textoModificado,nombrefirma,fecha,id)
          }
          if (me.docRemision == 'Citatorio') {            
            me.qrCodeC = await generarQRCodeBase64(tipodo,textoModificado,nombrefirma,fecha,id)
          }
        } catch (err) {
          me.$notify("Error al intentar crear el código QR", 'error')
        }
    },
    //************************************************************************************************************************************************************************************ */
    //* FUNCIONES DE WATCH
    //************************************************************************************************************************************************************************************ */
    disponibilidadFacilitador() {
      let me = this;
      if (
        me.switch2 === false &&
        me.fCita &&
        me.h_horacita &&
        me.duracion &&
        me.modulos
      ) {
        let fechaInicial = me.fCita + " " + me.h_horacita;

        let nh = moment(`${me.fCita}T${me.h_horacita}`)
          .add(me.duracion, "m")
          .format();

        let header = { Authorization: "Bearer " + this.$store.state.token };
        let configuracion = { headers: header };
        me.v_facilitadores = [];

        me.$justiciarestaurativa
          .get(
            "api/FacilitadorNotificadors/ListarPorFecha/" +
              me.modulos +
              "/" +
              fechaInicial +
              "/" +
              nh,
            configuracion
          )
          .then(function (response) {
            if (response.data.length == 0) {
              let [hora, minuto] = me.h_horacita.split(":").map(Number)

              let date = new Date()

              date.setHours(hora)
              date.setMinutes(minuto + parseInt(me.duracion))

              let horaN = date.getHours().toString().padStart(2, '0')
              let minutoN = date.getMinutes().toString().padStart(2, '0')
              
              me.textoNoData = `No hay facilitadores disponibles entre ${me.h_horacita} y ${horaN}:${minutoN}`
            } else {
              response.data.map((x) => {
                me.v_facilitadores.push({
                  text: x.nombreUsuario,
                  value: x.nombreUsuario,
                  value2: x.moduloServicioId,
                  value3: x.idFacilitadorNotificador,
                  valuep: x.puesto,
                });
              });
            }
          }, configuracion)
          .catch(function (error) {
            if (error.response.status == 401) {
              (me.e401 = true), (me.showpage = false);
            } else if (error.response.status == 403) {
              me.e403 = true;
              me.showpage = false;
            } else if (error.response.status == 404) {
              me.$notify("El recuso no ha sido encontrado", "error");
            } else {
              me.$notify(error.message, "error");
            }
          });
      }
    },                                            
  },
};
</script>
<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #00acc1;
  color: #ffffff;
  border: 1px solid #00acc1;
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
  background-color: #00acc1;
  color: #ffffff;
  border: 1px solid #00acc1;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;

  position: absolute;
  right: 0px;
  margin-right: 0px;
}


.labelHorario{
  background-color: #691c3e;
  color: white;  
  display: inline-block;
  text-align: center;
  border-radius: 5px;
  padding: 5px 10px;
}
</style>