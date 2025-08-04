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
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <!-- Componentes de pantalla de error -->
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <n401 v-if="e401" />
    <n403 v-if="e403" />
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <!-- Componente principal de flujo -->
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <v-flex v-if="showpage">
      <v-card>
        <v-toolbar flat color="white">
          <v-toolbar-title class="font-weight-regular">Sesiones del expediente.</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-flex xs12 sm12 md12>
            <v-text-field
              class="font-weight-regular"
              v-model="noExpediente"
              disabled
              prepend-icon="folder"
              filled
            ></v-text-field>
          </v-flex>
          <!-- Bloque de acciones para el expediente -->
          <!-- cierre de expediente -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                class="mx-2 py-2"
                v-on="on"
                @click="cerrarExpediente()"
                fab
                dark
                small
                color="primary"
              >
                <v-icon dark class="mt-1">close</v-icon>
              </v-btn>
            </template>
            <span>Cerrar expediente</span>
          </v-tooltip>
          <!-- Registro de voluntariedad -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                class="mx-2 py-2"
                v-on="on"
                @click="crearCartaAceptacion()"
                fab
                dark
                small
                color="success"
              >
                <v-icon dark class="mt-1">waves</v-icon>
              </v-btn>
            </template>
            <span>Carta de Voluntariedad</span>
          </v-tooltip>
        </v-toolbar>
        <!-- Bloque de recorrido de datos y muestreo en tabla de los conjuntos para sesiones -->
        <v-container elevation-0 grid-list-md>
          <br />
          <!-- Bloque de condicional en caso de ser conjunto -->
          <div v-if="this.vali == true">
            <v-data-table :headers="headers1" :items="conjunto">
              <template slot="items" class="white" slot-scope="props">
                <td>{{ props.index + 1 }}</td>
                <td v-html="adaptarP(props.item.nombreS)"></td>
                <td v-html="adaptarP(props.item.nombreR)"></td>
                <td>{{ props.item.nombreD }}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        class="mx-2 py-2"
                        v-on="on"
                        @click="
                          mostrarmodal(
                            props.item.nombreS,
                            props.item.nombreR,
                            props.item.direccionR,
                            props.item.direccionS,
                            props.item.telefonoR,
                            props.item.telefonoS,
                            props.item.idConjuntoDerivaciones
                          )
                        "
                        fab
                        dark
                        small
                        color="primary"
                      >
                        <v-icon dark class="mt-1">add</v-icon>
                      </v-btn>
                    </template>
                    <span>Crear una sesión</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        class="mx-2 py-2"
                        v-on="on"
                        @click="
                          mostrarModalVer(
                            props.item.nombreS,
                            props.item.nombreR,
                            props.item.direccionR,
                            props.item.direccionS,
                            props.item.telefonoR,
                            props.item.telefonoS,
                            props.item.idConjuntoDerivaciones
                          )
                        "
                        fab
                        dark
                        small
                        color="primary"
                      >
                        <v-icon dark class="mt-1">visibility</v-icon>
                      </v-btn>
                    </template>
                    <span>Mostrar Sesiones</span>
                  </v-tooltip>
                </td>
              </template>
            </v-data-table>
          </div>
          <!-- Bloque de condicional en caso de no ser conjunto -->
          <div v-else>
            <table class="my-table">
              <tr>
                <th>No.</th>
                <th>Solicitante</th>
                <th>Requerido</th>
                <th>Delito</th>
                <th>Opciones</th>
              </tr>
              <tr>
                <td>
                  <p>1</p>
                </td>
                <td>
                  <p v-for="(item, i) in Solicitante" :key="i + 1">
                    {{ `${item}\n` }}
                  </p>
                </td>
                <td>
                  <p v-for="(item, p) in Requerido" :key="p + 2">
                    {{ `${item}\n` }}
                  </p>
                </td>
                <td>
                  <p v-for="(item, d) in DelitoD" :key="d + 2">
                    {{ `${item}\n` }}
                  </p>
                </td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        class="mx-2"
                        v-on="on"
                        @click="mostrarmodal(Solicitante, Requerido)"
                        fab
                        dark
                        small
                        color="primary"
                      >
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </template>
                    <span>Crear una sesión</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        class="mx-2"
                        v-on="on"
                        @click="mostrarModalVer(Solicitante, Requerido)"
                        fab
                        dark
                        small
                        color="primary"
                      >
                        <v-icon dark>visibility</v-icon>
                      </v-btn>
                    </template>
                    <span>Mostrar Sesiones</span>
                  </v-tooltip>
                </td>
              </tr>
            </table>
          </div>
          <br />
        </v-container>
      </v-card>
    </v-flex>
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <!-- Modal para cambio y almacenamiento del estatus de la sesión -->
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <v-dialog
      v-model="dialogoInfo"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <!-- Bloque de acciones para el manejo del estatus -->
        <v-toolbar dark color="primary">
          <v-avatar size="30">
            <v-icon class="grey lighten-2">info</v-icon>
          </v-avatar>
          <v-toolbar-title class="subheading">Resumen de la Sesión</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <div v-if="sesione == 'En proceso'">
              <!-- Condicional para botón de vista previa -->
              <v-btn
                style="height: 100%"
                text
                color="success"
                v-if="v_button == false"
                @click="mostrarPdfRS()"
              >
                <v-icon left dark>remove_red_eye</v-icon>
                Vista previa
              </v-btn>
              <!-- Condicional para botón de guardado -->
              <v-btn
                style="height: 100%"
                text
                color="success"
                v-if="v_button == true"
                @click="guardarSD()"
                >
                <v-icon left dark>save</v-icon>
                Guardar
              </v-btn>
            </div>
            <v-btn icon @click="cerrarMInfo()">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex xs12 sm12 md12>
                <div v-if="sesione != 'En proceso'">
                  <p class="body1 font-weight-bold">Status de la sesión:</p>
                  <p class="body1 font-weight-regular font-italic">
                    {{ sesione }}
                  </p>
                </div>
                <div v-else>
                  <v-autocomplete
                    name="status de la sesión"
                    :items="statussesions"
                    @click.native.stop
                    v-model="statussesion"
                    v-on:change="evaluarseleccion()"
                    label="Status de la sesión:"
                  ></v-autocomplete>

                  <v-menu
                    v-if="
                      statussesion == 'Se realiza sesión y se otorga prorroga'
                    "
                    ref="v_menuP"
                    v-model="v_menuP"
                    :close-on-content-click="false"
                    :return-value.sync="v_fechaProrroga"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :value="v_fechaProrroga"
                        label="Fecha de prorroga:"
                        prepend-icon="event"
                        name="fecha de prorroga"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="v_fechaP" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="v_menuP = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.v_menuP.save(formatearfecha(v_fechaP))"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </div>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <div v-if="sesionu != null">
                  <p
                    class="body1 font-weight-regular font-italic"
                    v-html="sesionu"
                  ></p>
                </div>
                <div v-else>
                  <vue-editor
                    outline
                    @click.native.stop
                    :editorToolbar="customToolbar"
                    v-model="textodoc"
                  >
                  </vue-editor>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <!-- Vista de listado de las sesiones creadas para el acuerdo -->
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <v-dialog
      v-model="modal_ver"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <!-- Bloque de acciones de la vista -->
        <v-toolbar dark color="primary">
          <v-toolbar-title>Sesiones</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="modal_ver = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!-- Bloque de listado de las sesiones -->
        <v-flex xs12 md12 lg12 pa-4>
          <br />
          <v-layout xs12 md12 lg12 flex-row justify-center>
            <!-- Bloque de condicional para no conjuntos -->
            <div v-if="vali != false" xs12 md12 lg12>
              <v-data-table :headers="headers" :items="sesionsss">
                <template slot="items" class="white" slot-scope="props">
                  <td>{{ props.item.noSesion }}</td>
                  <td>{{ formatearfechahora(props.item.fechaHoraCita) }}</td>
                  <td v-html="adaptarP(props.item.solicitates)"></td>
                  <td v-html="adaptarP(props.item.reuqeridos)"></td>
                  <td>{{ props.item.statusSesion }}</td>
                  <td class="justify-center">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon
                          class="mr-2"
                          v-on="on"
                          color="black"
                          @click="modalInfo(props.item.sesionId)"
                        >
                          visibility
                        </v-icon>
                      </template>
                      <span>Resumen de Sesión</span>
                    </v-tooltip>
                  </td>
                </template>
              </v-data-table>
            </div>
            <!-- Bloque de condicional para conjuntos -->
            <div v-else xs12 md12 lg12>
              <v-data-table :headers="headers" :items="sesions">
                <template slot="items" class="white" slot-scope="props">
                  <td>{{ props.item.noSesion }}</td>
                  <td>{{ formatearfechahora(props.item.fechaHoraCita) }}</td>
                  <td v-html="adaptarP(props.item.solicitates)"></td>
                  <td v-html="adaptarP(props.item.reuqeridos)"></td>
                  <td>{{ props.item.statusSesion }}</td>
                  <td class="justify-center">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon
                          class="mr-2"
                          v-on="on"
                          color="black"
                          @click="modalInfo(props.item.idSesion)"
                        >
                          visibility
                        </v-icon>
                      </template>
                      <span>Resumen de Sesión</span>
                    </v-tooltip>
                  </td>
                </template>
              </v-data-table>
            </div>
          </v-layout>
        </v-flex>
      </v-card>
    </v-dialog>
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <!-- Modal para creación de sesión -->
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <v-dialog
      v-model="modal_agregar"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <!-- Bloque de acciones de la creación de sesión -->
        <v-toolbar dark color="primary">
          <v-toolbar-title
            >Crear un nuevo citatorio y recordatorio.</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn color="success" text @click="CrearSesionC()">Guardar</v-btn>
            <v-btn icon @click="CerrarModaladdSesion()">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!-- Bloque de formulario para creación de sesión -->
        <v-flex xs12 md12 lg12 pa-4>
          <br />
          <v-layout>
            <v-flex xs6 md6 lg6>
              <v-card elevation="0">
                <v-card-text>
                  <v-menu
                    ref="v_menu1"
                    v-model="v_menu1"
                    :close-on-content-click="false"
                    :return-value.sync="v_fechacita"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :value="v_fechacita"
                        label="Fecha de la cita:"
                        prepend-icon="event"
                        name="fecha"
                        v-validate="'required'"
                        :error-messages="errors.collect('fecha')"
                        clearable
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="v_fechac" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="v_menu1 = false">Cancel</v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.v_menu1.save(formatearfecha(v_fechac))"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                  <v-text-field
                    name="lugar de la cita"
                    label="Lugar de la cita:"
                    v-model="v_lugarcita"
                    v-validate="'required'"
                    :error-messages="errors.collect('lugar de la cita')"
                  >
                  </v-text-field>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs6 md6 lg6>
              <v-card elevation="0">
                <v-card-text>
                  <v-menu
                    ref="v_menu2"
                    v-model="v_menu2"
                    :close-on-content-click="false"
                    :return-value.sync="v_horacita"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        name="hora"
                        v-model="v_horacita"
                        label="Hora de la cita:"
                        prepend-icon="access_time"
                        readonly
                        v-validate="'required'"
                        :error-messages="errors.collect('hora')"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="v_menu2"
                      v-model="v_horacita"
                      full-width
                      @click:minute="$refs.v_menu2.save(v_horacita)"
                    >
                    </v-time-picker>
                  </v-menu>
                  <v-select
                    :items="duracions"
                    v-model="duracion"
                    name="tiempo de duración"
                    label="Tiempo de duración de la cita:"
                    v-validate="'required'"
                    :error-messages="errors.collect('tiempo de duración')"
                  ></v-select>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-divider></v-divider>
          </v-layout>
        </v-flex>
      </v-card>
    </v-dialog>
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <!-- Modal de vista previa del documento de la creación de sesión -->
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <v-dialog
      v-model="modal_citatoriorecordatorio"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <!-- Bloque de botones de acción del modal -->
        <v-toolbar dark color="primary">
          <v-toolbar-title>Documento.</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn color="success" text @click.native="guardar()">Guardar e imprimir</v-btn>
            <v-btn icon @click="modal_citatoriorecordatorio = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!-- Bloque de vista del PDF -->
        <v-card-text>
          <iframe
            id="iframepdfoficio"
            type="application/pdf"
            width="100%"
            height="835"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </v-card-text>
      </v-card>
    </v-dialog>    
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <!-- Vista para el muestreo de la vista previa del PDF  -->
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <v-dialog
      v-model="modal_RS"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <!-- Bloque de acciones del modal -->
        <v-toolbar dark color="primary">
          <v-toolbar-title>Documento.</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn color="success" text @click.native="guardarSD()">Guardar e imprimir</v-btn>
            <v-btn icon @click="modal_RS = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!-- Bloque de visualización del PDF -->
        <v-card-text>
          <iframe
            id="iframepdfRS"
            type="application/pdf"
            width="100%"
            height="835"
            frameborder="0"
            scrolling="no"
          ></iframe>
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
import n401 from "../../components/m_jr/401";
import n403 from "../../components/m_jr/403";
import Delitos from "../../components/m_jr/Delitos";

import moment from "moment";
import "moment/locale/es";
import alertify from "alertifyjs";
import { VueEditor } from "vue2-editor";
import { METHODS } from "http";
import { NumberAsString } from './NumerosLetras.js'
import { generarQRCodeBase64 } from './crearQR';

export default {
  components: {
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
      //************************************ */
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
      //**************************************

      headers: [
        { text: "N°Sesion:", value: "noSesion" },
        { text: "Fecha y hora cita", value: "fechaHoraCita" },
        { text: "Solicitado por:", value: "solicitadoPor" },
        { text: "Dirigido a:", value: "dirigidoa_Nombre" },
        { text: "Status de Sesión", value: "statusSesion", sortable: false },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      headers1: [
        { text: "No", value: "noExpediente" },
        { text: "Solicitantes", value: "fechaHoraCita" },
        { text: "Requeridos:", value: "solicitadoPor" },
        { text: "Delitos:", value: "dirigidoa_Nombre" },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      //************************************* */
      // VARIABLES PARA DEL STORE
      u_iddistrito: "",
      u_distrito: "",
      u_dirSubPro: "",
      u_idagencia: "",
      u_agencia: "",
      u_idmoduloservicio: "",
      u_modulo: "",
      u_idusuario: "",
      u_nombre: "",
      u_clave: "",
      u_rol: "",
      u_puesto: "",
      u_email: "",
      //********************************** */
      // VARIABLES  GENERALES
      editedIndex: -1,
      envioId: "",
      expedienteId: "",
      noExpediente: "",
      tipoModulo: "",
      sesions: [],
      conjunto: [],
      idconjuntod: "",
      vali: "",
      SoliSelect: "",
      DirSoliSelect: "",
      TelSoliSelect: "",
      ReqSelect: "",
      DirReqSelect: "",
      TelReqelect: "",
      Solicitante: [],
      TelSoli: [],
      TelReq: [],
      AllSoli: [],
      AllReq: [],
      DSoli: [],
      DReq: [],
      Requerido: [],
      DelitoD: [],
      SesionSe: "",
      sesionss: [],
      sesionsss: [],      
      sesionu: "",
      sesione: "",
      sessionSeleccionada: "",
      citatoriosrecordatorios: [],
      citatoriorecordatorioId: "",
      noCitatorio: 0,
      noCitatorioText: "",
      statussesionsComplete: [
        "Nadie asiste a la sesión",
        "Asiste solicitante a la sesión",
        "Asiste requerido a la sesión",
        "Asisten ambos y se reprograma la sesión",
        "Se realiza sesión sin acuerdo reparatorio",
        "Se realiza sesión con acuerdo reparatorio",
        "Medidas de protección",
        "Se realiza sesión y se otorga prorroga",
        "Se crea anexo a acuerdo reparatorio",
        "Se reagenda sesión",
      ],
      statussesions: [],
      statussesion: "",
      textodoc: "",

      v_solicitantes: [],
      v_nombreSolicitantes: "",

      v_requeridos: [],
      v_menu1: false,
      v_fechacita: "",
      v_fechac: "",

      v_menu2: false,
      v_horacita: "",
      v_horac: "",

      v_lugarcita: "",

      continuidad: "",

      citatorio1v1: "",
      citatorio1v2: "",

      citatorio2: "",
      citatorio3: "",

      oficio: "",
      //**************************************
      //VARIABLES REPORTE DE CITATORIO Y RECORDATORIO
      logo1: "",
      logo2: "",
      direccionAgencia: "",
      telefonosAgencia: "",
      dirigidoa: "",
      solicitadopor: "",
      nombre: "",
      correo: "",
      telefono: "",
      direccion: "",
      referencia: "",
      uf_Distrito: "",
      uf_DirSubProc: "",
      uf_Agencia: "",
      uf_Nombre: "",
      uf_Puesto: "",
      uf_Modulo: "",
      un_idModulo: "",
      un_modulo: "",
      un_nombre: "",
      un_puesto: "",
      fechaHoraCita: "",
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
      //**************************************
      //MODALES
      modal_agregar: false,
      modal_ver: false,
      modal_citatoriorecordatorio: false,
      modal_statusAsistencia: false,
      v_statusAsistencia: false,
      v_statusEntregas: [
        "Entrego a Familiar o Conocido",
        "Fijado",
        "Entregado personal",
        "No se ubica el domicilio",
        "Domicilio incorrecto",
        "Nombre incorrecto",
        "Ya no vive ahi",
      ],
      v_statusEntrega: "",
      dialogoInfo: false,
      dialogoStatus: false,
      v_delitos: [],
      nuc: "",
      listarRequeridos: [],
      listarSolicitantes: [],
      v_registroSesion: "",
      v_solicitantesL: "",
      v_requeridosL: "",
      modal_RS: false,

      v_button: false,
      prorroga: false,
      v_telefonosSolicitantes: "",
      u_rol: "",
      statusSesion: "",
      fechaG: "",
      v_fechaProrroga: "",
      v_menuP: false,
      v_fechaP: "",
      direAgencia:'',

      anexo: false,

      texto: 'Vista Previa',
      qrCode: null,
      docRemision: 'Resumen de sesión',
      vistaPreviaTF: true,
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
  created() {
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
    let me = this;
    me.expedienteId = me.$store.state.idExpediente;
    me.envioId = me.$store.state.idEnvio;
    me.noExpediente = me.$store.state.noExpediente;
    me.u_rol = me.$store.state.usuario.rol;

    if (me.expedienteId == null) {
      me.$alert(
        "Notificación",
        "Aun no ha abierto ninguna expediente por favor ingrese al menu Mis expedientes y luego en Mi lista de expedientes asignados y  ahi abra la expediente que usted elija!. En este momento sera redireccionado al menu correspondiente.",
        function () {
          if (me.u_rol == "Facilitador" || me.u_rol == "Notificador") {
            me.$router.push("./jr-misexpedientes");
          } else {
            me.$router.push("./jr-expedientesaceptados");
          }
        }
      );
    } else {
      me.$notify("Expediente abierto correctamente !!!", "success");

      me.u_iddistrito = me.$store.state.usuario.iddistrito;
      me.u_distrito = me.$store.state.usuario.distrito;
      me.u_dirSubPro = me.$store.state.usuario.dirSubProc;
      me.u_idagencia = me.$store.state.usuario.idagencia;
      me.u_agencia = me.$store.state.usuario.agencia;
      me.u_idmoduloservicio = me.$store.state.usuario.idmoduloservicio;
      me.u_modulo = me.$store.state.usuario.modulo;
      me.u_idusuario = me.$store.state.usuario.idusuario;
      me.u_nombre = me.$store.state.usuario.usuario;
      me.u_clave = me.$store.state.usuario.clave;
      me.u_rol = me.$store.state.usuario.rol;
      me.u_puesto = me.$store.state.usuario.puesto;
      me.u_email = me.$store.state.usuario.email;

      //*********************************************** */
      me.envioId = me.$store.state.idEnvio;
      me.expedienteId = me.$store.state.idExpediente;
      me.noExpediente = me.$store.state.noExpediente;
      me.tipoModulo = me.$store.state.tipoModulo;
      me.nuc = me.$store.state.nuc;

      //*********************************************** */

      me.listarLogo();
      me.listarConjunto();
      me.informacionagencia();
      me.listardelitos();
      me.listarnotificador();
      me.dirAgencia();
      //   me.listarAll();
      //   me.listarSesionconConjunto()
    }

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
    qrCode(val) {
      let me = this

      if (val != '') {      
        if (me.docRemision == 'Registro de estatus de la sesión') {
          var dd = me.crearPdfRS();
          var pdfMake = require("pdfmake/build/pdfmake.js");
          var htmlToPdfmake = require("html-to-pdfmake");
    
          if (pdfMake.vfs == undefined) {
            var pdfFonts = require("pdfmake/build/vfs_fonts.js");
            pdfMake.vfs = pdfFonts.vfs;
          }          

          if (me.vistaPreviaTF == true) {
            var doc = pdfMake.createPdf(dd);
            var f = document.getElementById("iframepdfRS");
            var callback = function (url) {
              f.setAttribute("src", url);
            };
            doc.getDataUrl(callback, doc);         
            me.modal_RS = true
          }                    
        }

        if(me.docRemision == 'Registro de voluntariedad') {
          me.vistaPreviaTF = false          
          var dd = me.crearPdf_CartaAceptacion();
          var pdfMake = require("pdfmake/build/pdfmake.js");
          var htmlToPdfmake = require("html-to-pdfmake");

          if (pdfMake.vfs == undefined) {
            var pdfFonts = require("pdfmake/build/vfs_fonts.js");
            pdfMake.vfs = pdfFonts.vfs;
          }
          var doc = pdfMake.createPdf(dd).print();                    
        }
      }
    }
  },
  methods: {
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
    CerrarModaladdSesion() {
      let me = this;
      me.modal_agregar = false;
      me.limpiar();
    },
    listarSesionconConjunto() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$justiciarestaurativa
        .get("api/Sesions/ListarSCpC/" + me.idconjuntod, configuracion)
        .then(function (response) {
          me.sesionsss = response.data;
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
    listarConjunto() {
      //inicio de clase listar conjunto
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$justiciarestaurativa
        .get("api/Sesions/ListarConjuntoPorEnvio/" + me.envioId, configuracion)
        .then(function (response) {
          me.vali = response.data[0].sec;
          if (me.vali == true) {
            me.conjunto = response.data;
          } else {
            response.data.map((nm) => {
              //Inicia de Map
              if (nm.tipo == "Solicitante") {
                //Inicio if de tipo
                me.Solicitante.push(nm.nombreCompleto);
                me.TelSoli.push(nm.telefono);
                me.$cat
                  .get("api/RAPs/ListarDP/" + nm.idPersona, configuracion)
                  .then(function (response) {
                    me.DSoli =
                      response.data.calle +
                      " " +
                      response.data.noint +
                      " " +
                      response.data.noext +
                      " " +
                      response.data.localidad +
                      " " +
                      response.data.municipio +
                      " " +
                      response.data.estado +
                      " " +
                      response.data.pais +
                      " " +
                      response.data.cp;
                    me.AllSoli.push({
                      text: nm.nombreCompleto,
                      direccion: me.DSoli,
                      value: nm.idPersona,
                      valor2: nm.telefono,
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
              } //fin de if tipo
              else {
                me.Requerido.push(nm.nombreCompleto);
                me.$cat
                  .get("api/RAPs/ListarDP/" + nm.idPersona, configuracion)
                  .then(function (response) {
                    me.DReq =
                      response.data.calle +
                      " " +
                      response.data.noint +
                      " " +
                      response.data.noext +
                      " " +
                      response.data.localidad +
                      " " +
                      response.data.municipio +
                      " " +
                      response.data.estado +
                      " " +
                      response.data.pais +
                      " " +
                      response.data.cp;
                    me.AllReq.push({
                      text: nm.nombreCompleto,
                      direccion: me.DReq,
                      value: nm.idPersona,
                      valor2: nm.telefono,
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
              }
            }); //Final de map

            me.$justiciarestaurativa
              .get("api/Sesions/ListarDDPorEnvio/" + me.envioId, configuracion)
              .then(function (response) {
                response.data.map((d) => {
                  me.DelitoD.push(d.nombre);
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
    }, // final de clase listarconjunto
    listarSolicitantesRequeridos(SolReq) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var requeridosarray = [];
      me.$justiciarestaurativa
        .get(
          "api/SolicitanteRequeridoes/ListarSolicitantesRequeridos/" +
            me.envioId +
            "/" +
            SolReq,
          configuracion
        )
        .then(function (response) {
          me.referencia = response.dat;
          if (SolReq == "Requerido") me.listarRequeridos = response.data;
          else me.listarSolicitantes = response.data;

          requeridosarray = response.data;
          requeridosarray.map(function (x) {
            me.$cat
              .get("api/RAPs/ListarDP/" + x.personaId, configuracion)
              .then(function (response) {
                me.direccionR =
                  response.data.calle +
                  " " +
                  response.data.noint +
                  " " +
                  response.data.noext +
                  " " +
                  response.data.localidad +
                  " " +
                  response.data.municipio +
                  " " +
                  response.data.estado +
                  " " +
                  response.data.pais +
                  " " +
                  response.data.cp;
                me.referencia = response.data.referencia;
                if (SolReq == "Requerido")
                  me.v_requeridos.push({
                    text: x.nombreCompleto,
                    direccion: me.direccionR,
                    value: x.personaId,
                    valor1: x.correo,
                    valor2: x.telefono1 + "," + x.telefono2,
                    valor3: x.clasificacion,
                  });
                else
                  me.v_solicitantes.push({
                    text: x.nombreCompleto,
                    direccion: me.direccionR,
                    value: x.personaId,
                    valor1: x.correo,
                    valor2: x.telefono1 + "," + x.telefono2,
                    valor3: x.clasificacion,
                    valor4: x.sexo,
                    valor5: x.entidadFederativa,
                    valor6: x.estadoCivil,
                    valor7: x.fechaNacimiento,
                    valor8: x.curp,
                    valor9: x.nivelEstudio,
                    valor10: x.docIdentificacion,
                    valor11: x.parentesco,
                    valor12: moment(x.fechaNacimiento, "DD/MM/YYYY"),
                  });
              })
              .catch(function (error) {
                me.$notify(
                  "Error al intentar leer los datos de la persona seleccionada !!!",
                  "error"
                );
              });
          });
        })
        .catch(function (error) {
          me.$notify(error.message, "error");
        });
    },
    guardar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$confirm(
        "Esperando confirmación",
        "Estas seguro de  que deseas guardar información. Una vez realizada esta accion no podra realizar cambios",
        function () {
          me.$controlacceso
            .get("api/Usuarios/ListarEnvio/" + me.un_idModulo, configuracion)
            .then(function (response2) {              

              me.un_nombre = response2.data.nombre;
              me.un_puesto = response2.data.puesto;

              for (var i = 0; i < me.v_requeridos.length; i++) {
                if (me.v_requeridos[i].seleccion == true) {
                  me.$justiciarestaurativa
                    .post(
                      "api/CitatorioRecordatorios/CrearCR",
                      {
                        //***************************** PERSONA*/
                        sesionId: me.sessionSeleccionada,
                        noExpediente: me.noExpediente,
                        fechaHoraCita: me.v_fechac + " " + me.v_horacita,
                        duracion: me.duracion,
                        lugarCita: me.v_lugarcita,
                        dirigidoa_Nombre: me.v_requeridos[i].text,
                        dirigidoa_Direccion: me.v_requeridos[i].direccion,
                        dirigidoa_Telefono: me.v_requeridos[i].valor2,
                        solicitadoPor: me.v_nombreSolicitantes,
                        solicitadoPor_Telefono: me.v_telefonosSolicitantes,
                        textooficio: me.oficio,
                        uf_Distrito: me.u_distrito,
                        uf_DirSubProc: me.u_dirSubPro,
                        uf_Agencia: me.u_agencia,
                        uf_Modulo: me.u_modulo,
                        uf_Nombre: me.u_nombre,
                        uf_Puesto: me.u_puesto,
                        un_Modulo: me.un_modulo,
                        un_Nombre: me.un_nombre,
                        un_Puesto: me.un_puesto,
                        statusEntrega: "En proceso",
                        noCitatorio: me.noCitatorio,
                        moduloServicioId: me.u_idmoduloservicio,
                        //************************************ */
                      },
                      configuracion
                    )
                    .then(function (response) {                        
                      if (response.data.fhnd == 1) {
                        me.$notify(
                          "La fecha y hora seleccionada ya no esta disponible para este facilitador",
                          "error"
                        );
                      } else {
                        me.close();
                        me.listarCitatorioSesion(me.sessionSeleccionada);
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
                }
              }              
              
            }, configuracion)
            .catch(function (error) {
              me.$notify(error.message, "error");
            });
        },
        function () {
          alertify.warning("Verifica la información");
        }
      ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
    },
    CrearSesionC() 
    {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$controlacceso.get("api/Usuarios/ListarEnvio/" + me.un_idModulo, configuracion).then(function (response2) 
      {
          me.un_nombre = response2.data.nombre;
          me.un_puesto = response2.data.puesto;


          if (me.vali == true) 
          {
            me.$justiciarestaurativa.get("api/Sesions/ListarPorConjuntoUltimaSesion/" + me.idconjuntod,configuracion).then(function (response) {
                me.statusSesion = response.data.statusSesion;
                if (response.data.noHaySesion == 1) {
                  me.$confirm("Esperando confirmación","Estas seguro de  que deseas guardar información. Una vez realizada esta accion no prodra realizar cambios",
                    function () {
                      me.$justiciarestaurativa.post("api/Sesions/CrearSconC",
                          {
                            //***************************** PERSONA*/
                            envioId: me.envioId,
                            moduloServicioId: me.u_idmoduloservicio,
                            ConjuntoDerivacionesId: me.idconjuntod,
                            Solicitantes: me.SoliSelect,
                            Requeridos: me.ReqSelect,
                            uf_Distrito: me.u_distrito,
                            uf_DirSubProc: me.u_dirSubPro,
                            uf_Agencia: me.u_agencia,
                            uf_Modulo: me.u_modulo,
                            uf_Nombre: me.u_nombre,
                            uf_Puesto: me.u_puesto,
                            Capturista: me.u_nombre,
                            FechaHora: me.v_fechac + " " + me.v_horacita,
                            //************************************ */
                          },configuracion).then(function (response) {
                          me.SesionSe = response.data;
                          me.$justiciarestaurativa.post("api/CitatorioRecordatorios/CrearCR",
                              {
                                //***************************** CITATORIO*/
                                sesionId: me.SesionSe.idSesion,
                                noExpediente: me.noExpediente,
                                fechaHoraCita: me.v_fechac + " " + me.v_horacita,
                                duracion: me.duracion,
                                lugarCita: me.v_lugarcita,
                                dirigidoa_Nombre: me.ReqSelect,
                                dirigidoa_Direccion: me.DirReqSelect,
                                dirigidoa_Telefono: me.TelReqelect,
                                solicitadoPor: me.SoliSelect,
                                solicitadoPor_Telefono: me.TelSoliSelect,
                                textooficio: me.oficio,
                                uf_Distrito: me.u_distrito,
                                uf_DirSubProc: me.u_dirSubPro,
                                uf_Agencia: me.u_agencia,
                                uf_Modulo: me.u_modulo,
                                uf_Nombre: me.u_nombre,
                                uf_Puesto: me.u_puesto,
                                un_Modulo: me.un_modulo,
                                un_Nombre: me.un_nombre,
                                un_Puesto: me.un_puesto,
                                statusEntrega: "En proceso",
                                noCitatorio: me.noCitatorio == 0 ? (me.noCitatorio + 1 ): me.noCitatorio,
                                moduloServicioId: me.u_idmoduloservicio,
                                //************************************ */
                              },configuracion).then(function (response) {
                              if (response.data.fhnd == 1) {
                                me.$justiciarestaurativa.delete("api/Sesions/EliminarSesion/" +me.SesionSe.idSesion,configuracion).then(function (response) {

                                }).catch((err) => {
                                    if (err.response.status == 400) {
                                      me.$notify(
                                        "No es un usuario válido",
                                        "error"
                                      );
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
                                      me.$notify(
                                        "El recuso no ha sido encontrado",
                                        "error"
                                      );
                                    } else {
                                      me.$notify(
                                        "Error al intentar lisatar los registros!!!",
                                        "error"
                                      );
                                    }
                                  });
                                me.$notify(
                                  "La fecha y hora seleccionada ya no esta disponible para este facilitador",
                                  "error"
                                );
                              } else {
                                me.$justiciarestaurativa
                                  .post(
                                    "api/Sesions/CrearSesionConjunto",
                                    {
                                      sesionId: me.SesionSe.idSesion,
                                      ConjuntoDerivacionesId: me.idconjuntod,
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
                                      me.$notify(
                                        "El recuso no ha sido encontrado",
                                        "error"
                                      );
                                    } else {
                                      me.$notify(error.message, "error");
                                    }
                                  });
                                me.close();
                                me.listarCitatorioSesion(me.SesionSe.idSesion);
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
                                me.$notify(
                                  "El recuso no ha sido encontrado",
                                  "error"
                                );
                              } else {
                                me.$notify(error.message, "error");
                              }
                            });

                          me.listar();
                        })
                        .catch(function (error) {
                          if (error.response.status == 401) {
                            (me.e401 = true), (me.showpage = false);
                          } else if (error.response.status == 403) {
                            me.e403 = true;
                            me.showpage = false;
                          } else if (error.response.status == 404) {
                            me.$notify(
                              "El recuso no ha sido encontrado",
                              "error"
                            );
                          } else {
                            me.$notify(error.message, "error");
                          }
                        });
                    },
                    function () {
                      alertify.warning("Verifica la información");
                    }
                  ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
                } else {
                  if (response.data.statusSesion == "Se realiza sesión con acuerdo reparatorio" || response.data.statusSesion == "Se realiza sesión con acuerdo reparatorio") {
                    me.$alert("Notificación",  "Ya no es posible crear una sesión nueva",
                      function () {
                        me.$router.push("./sesiones");
                      }
                    ).set("labels", { ok: "Ok" });
                  } else {
                    me.$confirm("Esperando confirmación", "Estas seguro de  que deseas guardar información. Una vez realizada esta accion no prodra realizar cambios",
                      function () {
                        me.$justiciarestaurativa.post("api/Sesions/CrearSconC",
                            {
                              //***************************** PERSONA*/
                              envioId: me.envioId,
                              moduloServicioId: me.u_idmoduloservicio,
                              ConjuntoDerivacionesId: me.idconjuntod,
                              Solicitantes: me.SoliSelect,
                              Requeridos: me.ReqSelect,
                              uf_Distrito: me.u_distrito,
                              uf_DirSubProc: me.u_dirSubPro,
                               uf_Agencia: me.u_agencia,
                              uf_Modulo: me.u_modulo,
                              uf_Nombre: me.u_nombre,
                              uf_Puesto: me.u_puesto,
                              Capturista: me.u_nombre,
                              FechaHora: me.v_fechac + " " + me.v_horacita,
                              //************************************ */
                            }, configuracion).then(function (response) {
                            me.SesionSe = response.data;

                            me.$justiciarestaurativa
                              .post(
                                "api/CitatorioRecordatorios/CrearCR",
                                {
                                  //***************************** PERSONA*/
                                  sesionId: me.SesionSe.idSesion,
                                  noExpediente: me.noExpediente,
                                  fechaHoraCita:
                                    me.v_fechac + " " + me.v_horacita,
                                  duracion: me.duracion,
                                  lugarCita: me.v_lugarcita,
                                  dirigidoa_Nombre: me.ReqSelect,
                                  dirigidoa_Direccion: me.DirReqSelect,
                                  dirigidoa_Telefono: me.TelReqelect,
                                  solicitadoPor: me.SoliSelect,
                                  solicitadoPor_Telefono: me.TelSoliSelect,
                                  textooficio: me.oficio,
                                  uf_Distrito: me.u_distrito,
                                  uf_DirSubProc: me.u_dirSubPro,
                                  uf_Agencia: me.u_agencia,
                                  uf_Modulo: me.u_modulo,
                                  uf_Nombre: me.u_nombre,
                                  uf_Puesto: me.u_puesto,
                                  un_Modulo: me.un_modulo,
                                  un_Nombre: me.un_nombre,
                                  un_Puesto: me.un_puesto,
                                  statusEntrega: "En proceso",
                                  noCitatorio:
                                    me.noCitatorio == 0
                                      ? me.noCitatorio + 1
                                      : me.noCitatorio,
                                  moduloServicioId: me.u_idmoduloservicio,
                                  //************************************ */
                                },
                                configuracion
                              )
                              .then(function (response) {
                                if (response.data.fhnd == 1) {
                                  me.$justiciarestaurativa
                                    .delete(
                                      "api/Sesions/EliminarSesion/" +
                                        me.SesionSe.idSesion,
                                      configuracion
                                    )
                                    .then(function (response) {})
                                    .catch((err) => {
                                      if (err.response.status == 400) {
                                        me.$notify(
                                          "No es un usuario válido",
                                          "error"
                                        );
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
                                        me.$notify(
                                          "El recuso no ha sido encontrado",
                                          "error"
                                        );
                                      } else {
                                        me.$notify(
                                          "Error al intentar lisatar los registros!!!",
                                          "error"
                                        );
                                      }
                                    });
                                  me.$notify(
                                    "La fecha y hora seleccionada ya no esta disponible para este facilitador",
                                    "error"
                                  );
                                } else {
                                  me.$justiciarestaurativa
                                    .post(
                                      "api/Sesions/CrearSesionConjunto",
                                      {
                                        sesionId: me.SesionSe.idSesion,
                                        ConjuntoDerivacionesId: me.idconjuntod,
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
                                        me.$notify(
                                          "El recuso no ha sido encontrado",
                                          "error"
                                        );
                                      } else {
                                        me.$notify(error.message, "error");
                                      }
                                    });
                                  me.close();
                                  me.listarCitatorioSesion(
                                    me.SesionSe.idSesion
                                  );
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
                                  me.$notify(
                                    "El recuso no ha sido encontrado",
                                    "error"
                                  );
                                } else {
                                  me.$notify(error.message, "error");
                                }
                              });

                            me.listar();
                          })
                          .catch(function (error) {
                            if (error.response.status == 401) {
                              (me.e401 = true), (me.showpage = false);
                            } else if (error.response.status == 403) {
                              me.e403 = true;
                              me.showpage = false;
                            } else if (error.response.status == 404) {
                              me.$notify(
                                "El recuso no ha sido encontrado",
                                "error"
                              );
                            } else {
                              me.$notify(error.message, "error");
                            }
                          });
                      },
                      function () {
                        alertify.warning("Verifica la información");
                      }
                    ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
                  }
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
          } else {
            me.$justiciarestaurativa
              .get(
                "api/Sesions/ListarPorEnvioUltimaSeseion/" + me.envioId,
                configuracion
              )
              .then(function (response) {
                me.statusSesion = response.data.statusSesion;
                if (response.data.noHaySesion == 1) {
                  me.$confirm(
                    "Esperando confirmación",
                    "Estas seguro de  que deseas guardar información. Una vez realizada esta accion no prodra realizar cambios",
                    function () {
                      me.$justiciarestaurativa
                        .post(
                          "api/Sesions/Crear",
                          {
                            //***************************** PERSONA*/
                            envioId: me.envioId,
                            moduloServicioId: me.u_idmoduloservicio,
                            //************************************ */
                          },
                          configuracion
                        )
                        .then(function (response) {
                          me.SesionSe = response.data;
                          let solis = "";
                          let tesol = "";
                          let nomreq = "";
                          let dirreq = "";
                          let telreq = "";
                          for (let d = 0; d < me.Solicitante.length; d++) {
                            solis += me.Solicitante[d];
                          }
                          for (let a = 0; a < me.TelSoli.length; a++) {
                            tesol += me.TelSoli[a];
                          }
                          for (i = 0; i < me.AllReq.length; i++) {}
                          me.$justiciarestaurativa
                            .post(
                              "api/CitatorioRecordatorios/CrearCR",
                              {
                                //***************************** PERSONA*/
                                sesionId: me.SesionSe.idSesion,
                                noExpediente: me.noExpediente,
                                fechaHoraCita:
                                  me.v_fechac + " " + me.v_horacita,
                                duracion: me.duracion,
                                lugarCita: me.v_lugarcita,
                                dirigidoa_Nombre: me.AllReq[i].text,
                                dirigidoa_Direccion: me.AllReq[i].direccion,
                                dirigidoa_Telefono: me.AllReq[i].valor2,
                                solicitadoPor: solis,
                                solicitadoPor_Telefono: tesol,
                                textooficio: me.oficio,
                                uf_Distrito: me.u_distrito,
                                uf_DirSubProc: me.u_dirSubPro,
                                uf_Agencia: me.u_agencia,
                                uf_Modulo: me.u_modulo,
                                uf_Nombre: me.u_nombre,
                                uf_Puesto: me.u_puesto,
                                un_Modulo: me.un_modulo,
                                un_Nombre: me.un_nombre,
                                un_Puesto: me.un_puesto,
                                statusEntrega: "En proceso",
                                noCitatorio:
                                  me.noCitatorio == 0
                                    ? me.noCitatorio + 1
                                    : me.noCitatorio,
                                moduloServicioId: me.u_idmoduloservicio,
                                //************************************ */
                              },
                              configuracion
                            )
                            .then(function (response) {
                              if (response.data.fhnd == 1) {
                                me.$notify(
                                  "La fecha y hora seleccionada ya no esta disponible para este facilitador",
                                  "error"
                                );
                              } else {
                                me.close();
                                me.listarCitatorioSesion(me.SesionSe.idSesion);
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
                                me.$notify(
                                  "El recuso no ha sido encontrado",
                                  "error"
                                );
                              } else {
                                me.$notify(error.message, "error");
                              }
                            });

                          me.listar();
                        })
                        .catch(function (error) {
                          if (error.response.status == 401) {
                            (me.e401 = true), (me.showpage = false);
                          } else if (error.response.status == 403) {
                            me.e403 = true;
                            me.showpage = false;
                          } else if (error.response.status == 404) {
                            me.$notify(
                              "El recuso no ha sido encontrado",
                              "error"
                            );
                          } else {
                            me.$notify(error.message, "error");
                          }
                        });
                    },
                    function () {
                      alertify.warning("Verifica la información");
                    }
                  ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
                } else {
                  if (
                    response.data.statusSesion ==
                      "Se realiza sesión con acuerdo reparatorio" ||
                    response.data.statusSesion ==
                      "Se realiza sesión con acuerdo reparatorio"
                  ) {
                    me.$alert(
                      "Notificación",
                      "Ya no es posible crear una sesión nueva",
                      function () {
                        me.$router.push("./sesiones");
                      }
                    ).set("labels", { ok: "Ok" });
                  } else {
                    me.$confirm(
                      "Esperando confirmación",
                      "Estas seguro de  que deseas guardar información. Una vez realizada esta accion no prodra realizar cambios",
                      function () {
                        me.$justiciarestaurativa
                          .post(
                            "api/Sesions/Crear",
                            {
                              //***************************** PERSONA*/
                              envioId: me.envioId,
                              moduloServicioId: me.u_idmoduloservicio,

                              //************************************ */
                            },
                            configuracion
                          )
                          .then(function (response) {
                            me.SesionSe = response.data;
                            let solis = "";
                            let tesol = "";
                            let nomreq = "";
                            let dirreq = "";
                            let telreq = "";
                            for (let d = 0; d < me.Solicitante.length; d++) {
                              solis +=
                                solis != ""
                                  ? `,${me.Solicitante[d]}`
                                  : me.Solicitante[d];
                            }
                            for (let a = 0; a < me.TelSoli.length; a++) {
                              tesol += me.TelSoli[a];
                            }
                            for (let i = 0; i < me.AllReq.length; i++) {
                              nomreq +=
                                nomreq != ""
                                  ? `, ${me.AllReq[i].text}`
                                  : me.AllReq[i].text;
                              dirreq +=
                                dirreq != ""
                                  ? `, ${me.AllReq[i].direccion}`
                                  : me.AllReq[i].direccion;
                              telreq +=
                                telreq != ""
                                  ? `, ${me.AllReq[i].valor2}`
                                  : me.AllReq[i].valor2;
                            }
                            me.$justiciarestaurativa
                              .post(
                                "api/CitatorioRecordatorios/CrearCR",
                                {
                                  //***************************** PERSONA*/
                                  sesionId: me.SesionSe.idSesion,
                                  noExpediente: me.noExpediente,
                                  fechaHoraCita:
                                    me.v_fechac + " " + me.v_horacita,
                                  duracion: me.duracion,
                                  lugarCita: me.v_lugarcita,
                                  dirigidoa_Nombre: nomreq,
                                  dirigidoa_Direccion: dirreq,
                                  dirigidoa_Telefono: telreq,
                                  solicitadoPor: solis,
                                  solicitadoPor_Telefono: tesol,
                                  textooficio: me.oficio,
                                  uf_Distrito: me.u_distrito,
                                  uf_DirSubProc: me.u_dirSubPro,
                                  uf_Agencia: me.u_agencia,
                                  uf_Modulo: me.u_modulo,
                                  uf_Nombre: me.u_nombre,
                                  uf_Puesto: me.u_puesto,
                                  un_Modulo: me.un_modulo,
                                  un_Nombre: me.un_nombre,
                                  un_Puesto: me.un_puesto,
                                  statusEntrega: "En proceso",
                                  noCitatorio:
                                    me.noCitatorio == 0
                                      ? me.noCitatorio + 1
                                      : me.noCitatorio,
                                  moduloServicioId: me.u_idmoduloservicio,
                                  //************************************ */
                                },
                                configuracion
                              )
                              .then(function (response) {
                                if (response.data.fhnd == 1) {
                                  me.$notify(
                                    "La fecha y hora seleccionada ya no esta disponible para este facilitador",
                                    "error"
                                  );
                                } else {
                                  me.close();
                                  me.listarCitatorioSesion(me.SesionS);
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
                                  me.$notify(
                                    "El recuso no ha sido encontrado",
                                    "error"
                                  );
                                } else {
                                  me.$notify(error.message, "error");
                                }
                              });

                            me.listar();
                          })
                          .catch(function (error) {
                            if (error.response.status == 401) {
                              (me.e401 = true), (me.showpage = false);
                            } else if (error.response.status == 403) {
                              me.e403 = true;
                              me.showpage = false;
                            } else if (error.response.status == 404) {
                              me.$notify(
                                "El recuso no ha sido encontrado",
                                "error"
                              );
                            } else {
                              me.$notify(error.message, "error");
                            }
                          });
                      },
                      function () {
                        alertify.warning("Verifica la información");
                      }
                    ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
                  }
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
        }, configuracion)
        .catch(function (error) {
          me.$notify(error.message, "error");
        });
    },
    crearsesion() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$justiciarestaurativa
        .get(
          "api/Sesions/ListarPorEnvioUltimaSeseion/" + me.envioId,
          configuracion
        )
        .then(function (response) {
          if (response.data.noHaySesion == 1) {
            me.$confirm(
              "Esperando confirmación",
              "Estas seguro de  que deseas guardar información. Una vez realizada esta accion no prodra realizar cambios",
              function () {
                me.$justiciarestaurativa
                  .post(
                    "api/Sesions/Crear",
                    {
                      //***************************** PERSONA*/
                      envioId: me.envioId,
                      moduloServicioId: me.u_idmoduloservicio,

                      //************************************ */
                    },
                    configuracion
                  )
                  .then(function (response) {
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
              function () {
                alertify.warning("Verifica la información");
              }
            ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
          } else {
            if (
              response.data.statusSesion ==
                "Se realiza sesión con acuerdo reparatorio" ||
              response.data.statusSesion ==
                "Se realiza sesión con acuerdo reparatorio"
            ) {
              me.$alert(
                "Notificación",
                "Ya no es posible crear una sesión nueva",
                function () {
                  me.$router.push("./sesiones");
                }
              ).set("labels", { ok: "Ok" });
            } else {
              me.$confirm(
                "Esperando confirmación",
                "Estas seguro de  que deseas guardar información. Una vez realizada esta accion no prodra realizar cambios",
                function () {
                  me.$justiciarestaurativa
                    .post(
                      "api/Sesions/Crear",
                      {
                        //***************************** PERSONA*/
                        envioId: me.envioId,
                        moduloServicioId: me.u_idmoduloservicio,

                        //************************************ */
                      },
                      configuracion
                    )
                    .then(function (response) {

                      me.$notify("La sesión se creo correctamente", "success");
                      me.listar();
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
                function () {
                  alertify.warning("Verifica la información");
                }
              ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
            }
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
    },
    modalInfo(sesion) {
      let me = this;            

      me.listarSesion(sesion);
      me.dialogoInfo = true;
    },
    cerrarMInfo() {
      let me = this;
      me.dialogoInfo = false;
      me.limpiaroficio();
      me.sesione = "";
      me.limpiar();
    },
    adaptarP(textoC) {
      let x = ``;
      if (textoC != null) {
        let v = textoC.split(";");
        if (v.length <= 1) {
          x = `<p>${v[0]}</p>`;
        } else {
          v.map((d) => {
            x += `<p>${d}</p>`;
          });
        }
      } else {
        x = textoC;
      }

      return x;
    },
    adaptarPI(textoC) {
      let v = textoC.split(",");
      let x = ``;
      if (v.length <= 1) {
        x = `<p>${v[0]}</p>`;
      } else {
        v.map((d) => {
          x += `<p>${d}</p>`;
        });
      }

      return x;
    },
    listarSesion(sesion) {
      let me = this;
      me.sessionSeleccionada = sesion;
      let header = { Authorization: "Bearer " + me.$store.state.token };
      let configuracion = { headers: header };

      me.$justiciarestaurativa
        .get("api/Sesions/ListarPorSesion/" + sesion, configuracion)
        .then(function (response) {
          me.sesionu = response.data[0].descripcionSesion;
          me.sesione = response.data[0].statusSesion;
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
    listar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$justiciarestaurativa
        .get("api/Sesions/ListarPorEnvio/" + me.envioId, configuracion)
        .then(function (response) {
          me.sesions = response.data;
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
    listarAll() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$justiciarestaurativa
        .get(
          "api/CitatorioRecordatorios/ListarSCPorEnvio/" + me.envioId,
          configuracion
        )
        .then(function (response) {
          me.sesionss = response.data;
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
    listarnotificador() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$justiciarestaurativa
        .get("api/AsignacionEnvios/ListarIdEnvio/" + me.envioId, configuracion)
        .then(function (response1) {
          me.un_modulo = response1.data.un_Modulo;
          me.un_idModulo = response1.data.idModulo;
        }, configuracion)
        .catch(function (error) {
          me.$notify(error.message, "error");
        });
    },
    listarCitatorioSesion(sesion) {
      let me = this;
      me.sessionSeleccionada = sesion;
      let header = { Authorization: "Bearer " + me.$store.state.token };
      let configuracion = { headers: header };

      me.$justiciarestaurativa
        .get("api/CitatorioRecordatorios/ListarCR/" + sesion, configuracion)
        .then(function (response) {
          me.citatoriosrecordatorios = response.data;
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
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$conf
        .get("api/Agencias/Listarporid/" + me.u_idagencia, configuracion)
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
    formatearfechahora: function (fecha) {
      return moment(fecha).format("DD/MM/YYYY hh:mm:ss a");
    },
    formatearfecha: function (fecha) {
      return moment(fecha).format("DD/MM/YYYY");
    },
    formatearhora: function (hora) {
      return moment(hora).format("hh:mm:ss a");
    },
    cerrarExpediente() {
      this.$store.state.idExpediente = null;
      this.$store.state.idEnvio = null;
      this.$store.state.noExpediente = null;
      this.$store.state.tipoModulo = null;

      if (this.u_rol == "Facilitador" || this.u_rol == "Notificador") {
        this.$router.push("./misexpedientes");
      } else {
        this.$router.push("./expedientesaceptados");
      }
    },
    mostrarmodal(
      solicitante,
      requerido,
      dsolicitante,
      drequerido,
      tsolicitante,
      trequerido,
      idconjunto
    ) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.idconjuntod = idconjunto;
      me.SoliSelect = solicitante;
      me.ReqSelect = requerido;
      me.DirSoliSelect = dsolicitante;
      me.DirReqSelect = drequerido;
      me.TelReqelect = trequerido;
      me.TelSoliSelect = tsolicitante;
      me.obtenerNocitatorio();

      if (me.vali == true) {
        me.$justiciarestaurativa
          .get(
            "api/Sesions/ListarPorConjuntoUltimaSesion/" + me.idconjuntod,
            configuracion
          )
          .then(function (response) {
            if (
              response.data.statusSesion == "En proceso" ||
              response.data.statusSesion ==
                "Se realiza sesión con acuerdo reparatorio" ||
              response.data.statusSesion ==
                "Se realiza sesión y se otorga prorroga"
            ) {
              if (response.data.statusSesion == "En proceso") {
                me.$alert(
                  "Notificación",
                  "Tiene una sesión ya en proceso",
                  function () {
                    // me.$router.push('./sesiones')
                  }
                ).set("labels", { OK: "Aceptar" });
              } else if (
                response.data.statusSesion ==
                "Se realiza sesión con acuerdo reparatorio"
              ) {
                me.$alert(
                  "Notificación",
                  "Este conjunto ya tiene acuerdo reparatorio",                  
                ).set("labels", { ok: "Ok" });
              } else if (
                response.data.statusSesion ==
                "Se realiza sesión y se otorga prorroga"
              ) {
                me.$alert(
                  "Notificación",
                  "Este conjunto ya se le otorgo una prorroga",
                  function () {
                    me.$router.push("./sesiones");
                  }
                ).set("labels", { ok: "Ok" });
              }
            } else {
              me.modal_agregar = true;
              me.obtenerNocitatorio();
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
      } else {
        me.$justiciarestaurativa
          .get(
            "api/Sesions/ListarPorEnvioUltimaSeseion/" + me.envioId,
            configuracion
          )
          .then(function (response) {

            if (
              response.data.statusSesion == "En proceso" ||
              response.data.statusSesion ==
                "Se realiza sesión con acuerdo reparatorio" ||
              response.data.statusSesion ==
                "Se realiza sesión y se otorga prorroga"
            ) {
              if (response.data.statusSesion == "En proceso") {
                me.$alert(
                  "Notificación",
                  "Tiene una sesión ya en proceso",
                  function () {
                    me.$router.push("./sesiones");
                  }
                ).set("labels", { ok: "Ok" });
              } else if (
                response.data.statusSesion ==
                "Se realiza sesión con acuerdo reparatorio"
              ) {
                me.$alert(
                  "Notificación",
                  "Este conjunto ya tiene acuerdo reparatorio",                  
                ).set("labels", { ok: "Ok" });
              } else if (
                response.data.statusSesion ==
                "Se realiza sesión y se otorga prorroga"
              ) {
                me.$alert(
                  "Notificación",
                  "Este conjunto ya se le otorgo una prorroga",
                  function () {
                    me.$router.push("./sesiones");
                  }
                ).set("labels", { ok: "Ok" });
              }
            } else {
              me.modal_agregar = true;
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
    mostrarModalVer(solicitante,requerido,dsolicitante,drequerido,tsolicitante,trequerido,idconjunto) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };      
      
      me.idconjuntod = idconjunto;
      me.SoliSelect = solicitante;
      me.ReqSelect = requerido;
      me.DirSoliSelect = dsolicitante;
      me.DirReqSelect = drequerido;
      me.TelReqelect = trequerido;
      me.TelSoliSelect = tsolicitante;

      me.qrCode = ''
      me.docRemision = ''

      // Petición para conocer si e
      me.$justiciarestaurativa.get('api/AcuerdoReparatorios/AcuerdoPorConjunto/' + me.idconjuntod, configuracion)
        .then(response => {          

          var options = []

          response.data.acuerdo
            ? (
              options = me.statussesionsComplete.filter(status => status != 'Se realiza sesión sin acuerdo reparatorio' && status != 'Se realiza sesión con acuerdo reparatorio')              
            ) 
            : options = me.statussesionsComplete.filter(status => status != 'Se crea anexo a acuerdo reparatorio' && status != 'Se realiza sesión y se otorga prorroga')

          me.statussesions = options
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

      if (me.vali == true) {
        me.$justiciarestaurativa
          .get(
            "api/Sesions/ListarPorConjuntoUltimaSesion/" + me.idconjuntod,
            configuracion
          )
          .then(function (response) {
            if (response.data.noHaySesion == 1) {
              alertify
                .confirm(
                  "Notificación",
                  '<p style="text-align: center; font-size:1.1rem;">No tiene Sesiones Iniciadas.</p><p style="text-align: center; font-size:1.1rem;">¿Quieres crear una Nueva Sesion?</p>',
                  function () {
                    me.modal_agregar = true;
                  },
                  function () {
                    // me.$router.push('./sesiones')
                  }
                )
                .set("labels", { ok: "Si", cancel: "Cancelar" });
            } else {
              me.modal_ver = true;
              me.listarSesionconConjunto();
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
      } else if (
        me.vali == false ||
        me.vali == null ||
        me.vali == undefined ||
        me.vali == ""
      ) {
        me.$justiciarestaurativa
          .get(
            "api/Sesions/ListarPorEnvioUltimaSeseion/" + me.envioId,
            configuracion
          )
          .then(function (response) {
            if (response.data.noHaySesion == 1) {
              alertify
                .confirm(
                  "Notificación",
                  '<p style="text-align: center; font-size:1.1rem;">No tiene Sesiones Iniciadas.</p><p style="text-align: center; font-size:1.1rem;">¿Quieres crear una Nueva Sesion?</p>',
                  function () {
                    me.modal_agregar = true;
                  },
                  function () {
                    // me.$router.push('./sesiones')
                  }
                )
                .set("labels", { ok: "Si", cancel: "Cancelar" });
            } else {
              me.modal_ver = true;
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
        me.listar();
      }
    },
    formatearfechaTexo(fecha) {
      let me = this;
      var dia = moment(fecha).format("DD");
      var mes = moment(fecha).format("MMMM");
      var año = moment(fecha).format("YYYY");
      var fecha = dia + " de " + mes + " del " + año;
      return fecha;
    },
    listardelitos() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var arrayDelito = [];
      me.$justiciarestaurativa
        .get("api/Delitoes/ListarDelitos/" + me.envioId, configuracion)
        .then(function (response) {
          arrayDelito = response.data;
          arrayDelito.map(function (x) {
            me.v_delitos.push({ text: x.nombreDelito });
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
    nombresSolicitantes(data = []) {
      let me = this;
      for (var i = 0; i < data.length; i++) {
        if (me.v_nombreSolicitantes == "") {
          me.v_nombreSolicitantes = data[i].text;
        } else {
          me.v_nombreSolicitantes =
            me.v_nombreSolicitantes + ", " + data[i].text;
        }
      }
    },
    addlistaSolicitantes(solicitante) {
      let me = this;
      debugger;
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
    close() {
      this.modal_agregar = false;
      this.modal_citatoriorecordatorio = false;
      this.modal_statusAsistencia = false;
      this.modal_RS = false;
    },
    evaluarseleccion() {
      debugger;
      let me = this;
      if (me.statussesion == "Se realiza sesión con acuerdo reparatorio") {
        me.v_button = true;
      } else {
        me.v_button = false;
      }

      if (me.statussesion == "Se realiza sesión y se otorga prorroga") {
        me.prorroga = true;
      } else {
        me.prorroga = false;
      }

      if (me.statussesion == 'Se crea anexo a acuerdo reparatorio') {
        me.anexo = true  
      } else {
        me.anexo = false          
      }
      //prorroga
      me.cargarTextoRS();
    },
    limpiar() {
      let me = this;
      me.v_solicitante = "";
      me.v_nombreSolicitantes = "";
      me.v_telefonosSolicitantes = "";
      me.v_requerido = "";
      me.v_menu1 = false;
      me.v_fechacita = "";
      me.v_fechac = "";

      me.v_menu2 = false;
      me.v_horacita = "";
      me.v_horac = "";
      me.duracion = "";

      me.v_lugarcita = me.direAgencia;

      me.continuidad = "";

      me.citatorio1v1 = "";
      me.citatorio1v2 = "";

      me.citatorio2 = "";
      me.citatorio3 = "";

      me.fechaHoraCita = "";
      me.oficio = "";
      me.v_statusAsistencia = false;
      me.oficio = "";
      me.nombre = "";
      me.direccion = "";
      me.telefono = "";
      me.correo = "";
      me.noCitatorio = 0;

      me.statussesion = "";      
      me.v_fechaProrroga = "";

      me.editedIndex = -1;
    },
    crearPdf() {
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");      
      var logo1 = this.logo1;
      var logo2 = this.logo2;
      var logo3 = this.logo3;
      var logo4 = this.logo4;
      var diragencia = this.direccionAgencia;
      var telagencia = this.telefonosAgencia;

      this.nombresSolicitantes(this.v_solicitantes);      
      var listadelito = "";
      for (var i = 0; i < this.v_delitos.length; i++) {
        listadelito = listadelito + " " + this.v_delitos[i].text;
      }      

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
        var pdf_dirsubproc = this.u_dirSubProc;
        var pdf_agencia = this.u_dgencia;
        var pdf_usuario = this.u_nombre;
        var pdf_puesto = this.u_puesto;
        var pdf_modulo = this.u_modulo;
        this.nombre = this.v_requerido.text;
        this.solicitadopor = this.v_solicitante.text;
      }
      
      var html_texto1 = htmlToPdfmake(
        '<p style="text-align:center" >¿QUÉ TENGO QUE HACER?</p><br><p>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><strong>Acuda a su cita</strong><span>. Asista el día y la hora en que fue citado para evitar' +
          " que progrese la denuncia y/o querella penal en su contra. Asegúrese de traer consigo una identificación oficial y copia simple de la misma.</span></p>" +
          "<p>2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Explique su caso</strong>. Un facilitador imparcial de la Procuraduría ayudará a ambas partes" +
          " a resolver su controversia mediante el diálogo.</p><p>3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Llegue a un acuerdo</strong><span>. Si usted" +
          " decide llegar a una solución que le resulte satisfactoria, ambas partes celebrarán un acuerdo reparatorio.</span></p><p><span>4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>" +
          "<strong>Cierre la carpeta de Investigación en su contra</strong><span>. Cuando ambas partes cumplan el acuerdo reparatorio, la Procuraduría concluirá su carpeta de" +
          " investigación.</span></p>"
      );
      var html_texto2 = htmlToPdfmake(
        '<p style="text-align:center" >¿QUÉ PASA SI NO ACUDO A LA CITA? </p><br><p>Se continuará el proceso penal de la carpeta de investigación ante el Ministerio Público para su integración' +
          " y de ser procedente podría someter su caso ante un juez penal. </p>"
      );
      var html_texto3 = htmlToPdfmake(
        '<p class="ql-align-justify">En caso de no poder o no querer asistir a su cita, comuníquese al teléfono </p><p>&nbsp;71 79000 a las extensiones 9806,' +
          " 9294 o 9807 con el facilitador</p>" +
          pdf_usuario
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

        content: [
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
            text: this.nombre,
            style: "DePara",
          },
          "\n",
          {
            text: "Direccion: " + this.direccion,
            style: "DeParaCargo",
          },
          "\n\n",
          {
            text: "Para poner fin al procedimiento penal iniciado en su contra, acuda a esta cita y resuelva su asunto antes de que su carpeta de investigación pueda ser sometida ante un juez.",
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
                    ["Lugar de su cita", this.v_lugarcita],
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
              "El motivo de su cita es por una denuncia penal interpuesta en su contra por " +
              this.solicitadopor +
              ", por el delito de" +
              listadelito,
            style: "texto",
          },
          "\n",
          {
            text:
              "De conformidad con el Código Penal del Estado de Hidalgo, el delito de" +
              listadelito +
              " es sancionable.",
            style: "textobold",
          },
          {
            text: "Sin embargo, dada la naturaleza de su asunto, la Procuraduría General de Justicia lo invita a resolver su conflicto mediante un mecanismo alternativo de solución de controversias, antes de que su carpeta de investigación se continúe integrando.",
            style: "texto",
          },
          "\n",
          {
            text: "De conformidad con los artículos 1, 4 y 14 de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal, estos mecanismos tienen como finalidad propiciar, a través del diálogo, la solución de las controversias que surjan entre miembros de la sociedad mediante procedimientos basados en la oralidad, la economía procesal y la confidencialidad. ",
            style: "texto",
          },

          "\n\n\n\n\n",
          {
            text:
              pdf_usuario +
              "\n" +
              pdf_puesto +
              "\n" +
              "Adscrito al " +
              pdf_agencia,
            style: "ampo",
          },
          "\n\n\n\n\n\n\n\n\n\n",
          {
            columns: [
              {
                style: "table2",
                pageBreak: "before",
                table: {
                  body: [[html_texto1], [html_texto2], [html_texto3]],
                },
                alignment: "left", // Optional, for body texts
                width: "auto", // Changes width of the table
              },
            ],
          },
          "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",

          {
            text: pdf_dirsubproc + "\n" + pdf_agencia,
            style: "headertext",
            absolutePosition: { x: 85, y: 95 },
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
          {
            text: this.nombre,
            style: "subtitulo",
          },
          "\n",
          {
            text: "Direccion: " + this.direccion,
            style: "textoDireccion",
          },
          "\n\n",
          {
            text: "Para poner fin al procedimiento penal iniciado en su contra, acuda a esta cita y resuelva su asunto antes de que su carpeta de investigación pueda ser sometida ante un juez.",
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
                    ["Lugar de su cita", this.v_lugarcita],
                  ],
                },
                alignment: "center", // Optional, for body texts
                width: "auto", // Changes width of the table
              },
            ],
          },
          "\n\n",
          {
            text:
              "El motivo de su cita es por una denuncia penal interpuesta en su contra por " +
              this.solicitadopor +
              ", por el delito de" +
              listadelito +
              " de conformidad con el Código Penal del Estado de Hidalgo, dicho delito es sancionable.",
            style: "texto",
          },
          "\n\n",
          {
            text: "Sin embargo, dada la naturaleza de su asunto, la Procuraduría General de Justicia lo invita a resolver su conflicto mediante un mecanismo alternativo de solución de controversias, ANTES de que su carpeta de investigación se continúe integrando.",
            style: "texto",
          },
          "\n\n",
          {
            text: "De conformidad con los artículos 1, 4 y 14 de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal, estos mecanismos tienen como finalidad propiciar, a través del diálogo, la solución de las controversias que surjan entre miembros de la sociedad mediante procedimientos basados en la oralidad, la economía procesal y la confidencialidad. ",
            style: "texto",
          },

          "\n\n\n\n\n\n\n\n\n\n\n",
          {
            text:
              pdf_usuario +
              "\n" +
              pdf_puesto +
              "\n" +
              "ADSCRITO A LA " +
              pdf_agencia.toUpperCase(),
            style: "ampo",
          },

          "\n\n\n",
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
              // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
              // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
              // paddingLeft: function(i, node) { return 4; },
              // paddingRight: function(i, node) { return 4; },
              // paddingTop: function(i, node) { return 2; },
              // paddingBottom: function(i, node) { return 2; },
              // fillColor: function (rowIndex, node, columnIndex) { return null; }
            },
          },
          "\n\n\n\n",
          {
            text:
              "LIC. __________________________________" +
              "\n" +
              "NOTIFICADOR ESPECIALIZADO",
            style: "ampo",
          },
        ],

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
            alignment: "center",
          },
          table2: {
            fontSize: 9,
            margin: [0, 5, 0, 5],
            alignment: "center",
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
    cargarTextoRS() {
      var num2Let = require("numalet")();
      var dia = moment().format("DD");
      var diatext = NumberAsString(dia);
      var mes = moment().format("MMMM");
      var año = moment().format("YYYY");
      var añotext = NumberAsString(año);
      var hr = moment().format("h:mm a");
      var fecha = dia + " de " + mes + " del " + año + ", " + hr;      

      this.textodoc =`
        <p>
          En el Centro de Justicia Restaurativa Penal, situado en ${this.direAgencia} siendo las ${hr} del dia ${dia} (${diatext}) de ${mes} del año ${año} (${añotext}), 
          dentro del expediente <strong>${this.noExpediente}</strong> solicitado por la (el) <strong>C. ${this.SoliSelect.replaceAll(';', ',')}</strong> donde fue requerida (o) la (el) <strong>C. ${this.ReqSelect.replaceAll(';', ',')}</strong>, 
          se hace registro que <span style='background-color: rgb(230, 0, 0);'>[CAMPOR LIBRE]</span></p><br><br
        <p>
        Lo anterior con fundamento en lo establecido en el artículos 4 fracción I y 24 de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal, lo que se asienta para su 
        debido registro con la finalidad de dejar antecedente de lo ocurrido en la presente fecha y una vez leído el presente firman de enterados y de conformidad.</p><br><br><br>
      `
    },
    crearPdfRS() {
      let me = this      
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");
      var logo1 = this.logo1;
      var logo2 = this.logo2;
      var logo3 = this.logo3;
      var logo4 = this.logo4;
      var diragencia = this.direccionAgencia;
      var telagencia = this.telefonosAgencia;      
      var num2Let = require("numalet")();
      var dia = moment().format("DD");
      var diatext = num2Let(dia);
      var mes = moment().format("MMMM");
      var año = moment().format("YYYY");
      var añotext = num2Let(año);
      var hr = moment().format("h:mm a");
      var pdf_distrito = this.u_distrito;
      var pdf_dirsubproc = this.u_dirSubPro;
      var pdf_agencia = this.u_agencia;
      var pdf_usuario = this.u_nombre;
      var pdf_puesto = this.u_puesto;
      var pdf_modulo = this.u_modulo;
      var fecha = dia + " de " + mes + " del " + año + ", " + hr;      
      var html_texto = htmlToPdfmake(this.textodoc);

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
          {
            text: "REGISTRO DE SESIÓN",
            style: "titulo",
          },
          "\n\n",
          {
            text: this.nombre + "\n" + this.direccion,
            style: "DePara",
          },

          "\n\n",
          {
            text: html_texto,
            style: "texto",
          },

          "\n\n\n\n\n\n\n",
          {
            text:
              "Atentamente" +
              "\n\n\n\n\n" +
              pdf_usuario +
              "\n" +
              pdf_puesto +
              "\n" +
              "Adscrito al " +
              pdf_agencia,
            style: "ampo",
          },
        ],

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
    mostrarPdfRS() {
      let me = this;

      me.qrCode = ''

      me.docRemision = 'Registro de estatus de la sesión'

      me.vistaPreviaTF = true

      let fechaQR = new Date()

      me.generarQR(me.docRemision,me.nuc,me.u_nombre,fechaQR,me.idRemision)
    },
    crearPdf_Recordatorio() {
      var pdfMake = require("pdfmake/build/pdfmake.js");

      //***************************************************************************** */
      // VARIABLES
      //***************************************************************************** */
      var logo1 = this.logo1;
      var logo2 = this.logo2;
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
        pageMargins: [80, 100, 80, 50],

        content: [
          {
            style: "table",
            table: {
              headerRows: 1,
              widths: ["*", "*", "*"],
              body: [
                [
                  { image: logo1, width: 130, alignment: "left" },
                  {
                    text: "\n" + "RECORDATORIO" + "\n\n",
                    fontSize: 14,
                    bold: true,
                    alignment: "center",
                  },
                  { image: logo2, width: 50, alignment: "right" },
                ],
                [
                  "N° Expediente: " + "\n\n" + this.noExpediente + "\n\n",
                  {
                    colSpan: 2,
                    text:
                      "SOLICITANTE(s): " +
                      "\n\n" +
                      bodyDataSolicitantes +
                      "\n\n",
                  },
                  "",
                ],
                [
                  {
                    colSpan: 3,
                    text:
                      "Su cita es a las " +
                      hr +
                      " del dia " +
                      dia +
                      " de " +
                      mes +
                      " del " +
                      año,
                  },
                  "",
                  "",
                ],
                [
                  {
                    colSpan: 3,
                    text: "Su facilitador asignado es: " + pdf_usuario,
                  },
                  "",
                  "",
                ],
                [
                  {
                    colSpan: 3,
                    text:
                      "Los horarios de atención son: " +
                      "\n\n" +
                      "Lunes a Viernes de 9:00 a1700 horas.",
                  },
                  "",
                  "",
                ],
                [
                  {
                    colSpan: 3,
                    text:
                      "Domicilio del centro: " + "\n\n" + this.direccionAgencia,
                  },
                  "",
                  "",
                ],
                [
                  {
                    colSpan: 3,
                    text:
                      "\n" +
                      "Nota:  Favor  de  acudir  con original y copia de una identificación oficial con fotografía (Requisito indispensable para cualquier trámite)" +
                      "\n\n",
                    italics: true,
                    fontSize: 10,
                    bold: true,
                  },
                  "",
                  "",
                ],
                [
                  {
                    colSpan: 3,
                    text:
                      "\n" +
                      "Recomendaciones:  En caso de identificarse con licencia de conducir, pasaporte, cartilla del servicio militar, constancia de radicación o algún otro documento fehaciente deberá anexar una impresión de su CURP." +
                      "\n\n",
                    italics: true,
                    fontSize: 9,
                  },
                  "",
                  "",
                ],
              ],
            },
            layout: "lightHorizontalLines",
          },
          "\n\n\n",

          {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 5,
                x2: 435,
                y2: 5,
                lineColor: "gray",
                lineWidth: 0.5,
              },
            ],
          },

          "\n\n\n",
          {
            style: "table",
            table: {
              headerRows: 1,
              widths: ["*", "*", "*"],
              body: [
                [
                  { image: logo1, width: 130, alignment: "left" },
                  {
                    text: "\n" + "RECORDATORIO" + "\n\n",
                    fontSize: 14,
                    bold: true,
                    alignment: "center",
                  },
                  { image: logo2, width: 50, alignment: "right" },
                ],
                [
                  "N° Expediente: " + "\n\n" + this.noExpediente + "\n\n",
                  {
                    colSpan: 2,
                    text:
                      "SOLICITANTE(s): " +
                      "\n\n" +
                      bodyDataSolicitantes +
                      "\n\n",
                  },
                  "",
                ],
                [
                  {
                    colSpan: 3,
                    text:
                      "Su cita es a las " +
                      hr +
                      " del dia " +
                      dia +
                      " de " +
                      mes +
                      " del " +
                      año,
                  },
                  "",
                  "",
                ],
                [
                  {
                    colSpan: 3,
                    text: "Su facilitador asignado es: " + pdf_usuario,
                  },
                  "",
                  "",
                ],
                [
                  {
                    colSpan: 3,
                    text:
                      "Los horarios de atención son: " +
                      "\n\n" +
                      "Lunes a Viernes de 9:00 a1700 horas.",
                  },
                  "",
                  "",
                ],
                [
                  {
                    colSpan: 3,
                    text:
                      "Domicilio del centro: " + "\n\n" + this.direccionAgencia,
                  },
                  "",
                  "",
                ],
                [
                  {
                    colSpan: 3,
                    text:
                      "\n" +
                      "Nota:  Favor  de  acudir  con original y copia de una identificación oficial con fotografía (Requisito indispensable para cualquier trámite)" +
                      "\n\n",
                    italics: true,
                    fontSize: 10,
                    bold: true,
                  },
                  "",
                  "",
                ],
                [
                  {
                    colSpan: 3,
                    text:
                      "\n" +
                      "Recomendaciones:  En caso de identificarse con licencia de conducir, pasaporte, cartilla del servicio militar, constancia de radicación o algún otro documento fehaciente deberá anexar una impresión de su CURP." +
                      "\n\n",
                    italics: true,
                    fontSize: 9,
                  },
                  "",
                  "",
                ],
              ],
            },
            layout: "lightHorizontalLines",
          },
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
            fontSize: 10,
            bold: true,
            alignment: "left",
          },
          footertext: {
            fontSize: 7,
          },
          texto: {
            fontSize: 10,
            regular: true,
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
            fontSize: 10,
            bold: true,
            alignment: "left",
          },
          cargo: {
            fontSize: 9,
            regular: true,
            alignment: "left",
          },
        },
      };

      return ddR;
    },
    mostrarpdf() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$justiciarestaurativa
        .get("api/AsignacionEnvios/ListarIdEnvio/" + me.envioId, configuracion)
        .then(function (response1) {
          me.un_modulo = response1.data.un_Modulo;
          me.un_idModulo = response1.data.idModulo;
        }, configuracion)
        .catch(function (error) {
          me.$notify(error.message, "error");
        });

      me.$validator.validate().then((result) => {
        if (result) {
          var dd = this.crearPdf();
          var pdfMake = require("pdfmake/build/pdfmake.js");
          var htmlToPdfmake = require("html-to-pdfmake");

          if (pdfMake.vfs == undefined) {
            var pdfFonts = require("pdfmake/build/vfs_fonts.js");
            pdfMake.vfs = pdfFonts.vfs;
          }
          var doc = pdfMake.createPdf(dd);
          var f = document.getElementById("iframepdfoficio");
          var callback = function (url) {
            f.setAttribute("src", url);
          };
          doc.getDataUrl(callback, doc);
          me.modal_citatoriorecordatorio = true;
        }
      });
    },
    limpiaroficio() {
      this.oficio = "";
    },
    obtenerNocitatorio() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      debugger;
      if (me.vali == true) {
        me.$justiciarestaurativa
          .get(
            "api/CitatorioRecordatorios/FiltrarNoCItaC/" + me.idconjuntod,
            configuracion
          )
          .then(function (response) {
            me.noCitatorio = response.data.nc + 1;
            me.noCitatorioText = me.consultarNoCita(me.noCitatorio);
          })
          .catch(function (error) {
            me.$notify(
              "Error al intentar leer la informaciónn del número de cita!!!",
              "error"
            );
          });
      }
      if (me.vali == false || me.vali == undefined || me.vali == null) {
        var expedienteHex = me.hexa(me.noExpediente);
        me.$justiciarestaurativa
          .get(
            "api/CitatorioRecordatorios/FiltrarNoCIta/" + expedienteHex,
            configuracion
          )
          .then(function (response) {
            me.noCitatorio = response.data.nc + 1;
            me.noCitatorioText = me.consultarNoCita(me.noCitatorio);
          })
          .catch(function (error) {
            me.$notify(
              "Error al intentar leer la informaciónn del número de cita!!!",
              "error"
            );
          });
      }
    },
    hexa(str) {
      var arr1 = [];
      for (var n = 0, l = str.length; n < l; n++) {
        var hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
      }
      return arr1.join("");
    },
    guardarSD() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.vistaPreviaTF = false
      if (me.vali == true) {
        me.$justiciarestaurativa.patch("api/Sesions/ActualizarStatusSesion",
            {
              idSesion: me.sessionSeleccionada,
              statusSesion: me.statussesion,
              descripcionSesion: me.textodoc,
              asunto: "REGISTRO DE SESIÓN",
            },configuracion)
          .then(function (response) {

            if (me.anexo) {
              me.$justiciarestaurativa.put(`api/SeguimientoCumplimientoes/ActualizarSPMyR/${me.idconjuntod}`, configuracion)
                .then(responsese => {                                    
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
                  } limpiartextodoc
                  
                });
            }

            me.$notify("La información se actualizo correctamente", "success");
              
              if (me.v_button == true) {
                me.$router.push("./acuerdoreparatorio");
              } else if (me.statussesion == "Se realiza sesión y se otorga prorroga") {
                me.obtenerInfoXProrroga();
              } else {
                var dd = me.crearPdfRS();
          var pdfMake = require("pdfmake/build/pdfmake.js");
          var htmlToPdfmake = require("html-to-pdfmake");
    
          if (pdfMake.vfs == undefined) {
            var pdfFonts = require("pdfmake/build/vfs_fonts.js");
            pdfMake.vfs = pdfFonts.vfs;
                }
                var doc = pdfMake.createPdf(dd).print();
                me.modal_RS = false                                  

                if (me.statussesion == 'Se realiza sesión sin acuerdo reparatorio') {                  
                  me.$router.push("./registroconclusion");
                }                
              }
              
              me.dialogoInfo = false;
              me.modal_ver = false;                            
              me.listar();
              me.close();
              me.limpiar();
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
      } else if (me.vali == null || me.vali == undefined || me.vali == "" || me.vali == false) {
        me.$justiciarestaurativa
          .patch(
            "api/Sesions/ActualizarStatusSesion",
            {
              idSesion: me.sessionSeleccionada,
              statusSesion: me.statussesion,
              descripcionSesion: me.textodoc,
              asunto: "REGISTRO DE SESIÓN",
            },
            configuracion
          )
          .then(function (response) {
            me.$notify("La información se actualizo correctamente", "success");

            if (me.v_button == true) {
              me.$router.push("./acuerdoreparatorio");
            } else if (me.statussesion == "Se realiza sesión y se otorga prorroga") {
              me.obtenerInfoXProrroga();
            } else {
              var dd = me.crearPdfRS();
              var pdfMake = require("pdfmake/build/pdfmake.js");
              var htmlToPdfmake = require("html-to-pdfmake");

              if (pdfMake.vfs == undefined) {
                var pdfFonts = require("pdfmake/build/vfs_fonts.js");
                pdfMake.vfs = pdfFonts.vfs;
              }
              var doc = pdfMake.createPdf(dd).print();

              me.$router.push("./registroconclusion");
            }
            
            me.listar();
            me.close();
            me.limpiar();
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
      }
    },
    obtenerInfoXProrroga() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      var idseguimiento = "";

      //Cuando no hay conjunto el valio de idconjunto queda undefined, por lo tanto un dato diferente a este  quiere decir que hay conjunto
      if (
        me.idconjuntod == undefined ||
        me.idconjuntod == null ||
        me.idconjuntod == "" ||
        me.idconjuntod == false
      ) {
        //En caso de no existir un conjunto, solo puede haber un acuerdo, por tal motivo aqui solo se requiere en IdEnvio

        me.$justiciarestaurativa
          .get(
            "api/SeguimientoCumplimientoes/ObtenerIdseguimientoSinConjunto/" +
              me.envioId,
            configuracion
          )
          .then(function (response) {
            //Guardo el valor de ip de seguimiento, pues es el unico valor que ocupare para mi put, si quieres ver que todos id retorno revisa back o revisa el response de la API
            idseguimiento = response.data.idSeguimientoCumplimiento;

            me.actualizarProrroga(idseguimiento);

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
      } else {
        // //Asi cuando hay conjunto hay que traer el id del seguimiento por medio del conjunto a travez de un get
        me.$justiciarestaurativa
          .get(
            "api/SeguimientoCumplimientoes/ObtenerIdseguimientoConjunto/" +
              me.idconjuntod,
            configuracion
          )
          .then(function (response) {
            //Guardo el valor de ip de seguimiento, pues es el unico valor que ocupare para mi put, si quieres ver que todos id retorno revisa back o revisa el response de la API
            idseguimiento = response.data.idSeguimientoCumplimiento;

            me.actualizarProrroga(idseguimiento);
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
    actualizarProrroga(idseguimiento) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };      
      me.vistaPreviaTF = false
      //se guarda solo la fecha de la prorroga como un datos informativo en la tabla del seguimiento
      me.$justiciarestaurativa
        .put(
          "api/SeguimientoCumplimientoes/ActualizarSP",
          {
            idSeguimientoCumplimiento: idseguimiento,
            statusPago: "Prorroga",
            fechaProrroga: me.v_fechaP,
            titulo: "Prorroga",
          },
          configuracion
        )
        .then(function (response) {
          var dd = me.crearPdfRS();
          var pdfMake = require("pdfmake/build/pdfmake.js");
          var htmlToPdfmake = require("html-to-pdfmake");
    
          if (pdfMake.vfs == undefined) {
            var pdfFonts = require("pdfmake/build/vfs_fonts.js");
            pdfMake.vfs = pdfFonts.vfs;
                }
                var doc = pdfMake.createPdf(dd).print();
            me.dialogoInfo = false;
            me.modal_ver = false;

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
    formatearfecha: function (fecha) {
      return moment(fecha).format("DD/MM/YYYY");
    },    
    guardarStatusAsistencia() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$justiciarestaurativa
        .put(
          "api/CitatorioRecordatorios/StatusAsistencia",
          {
            idRCitatoriosRecordatorios: me.citatoriorecordatorioId,
            statusAsistencia: me.v_statusAsistencia,
          },
          configuracion
        )
        .then(function (response) {
          me.$notify(
            "El Status de Asistencia se actualizo correctamente",
            "success"
          );
          me.listarCitatorioSesion(me.sessionSeleccionada);
          me.close();
          me.limpiar();
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
    crearpdfSC() {
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

      //***************************************************************************** */
      debugger;
      var pdf_distrito = this.u_distrito;
      var pdf_dirsubproc = this.u_dirSubPro;
      var pdf_agencia = this.u_agencia;
      var pdf_usuario = this.u_nombre;
      var pdf_puesto = this.u_puesto;
      var pdf_modulo = this.u_modulo;

      //***************************************************************************** */
      var html_texto = htmlToPdfmake(this.oficio);
      //***************************************************************************** */
      //***************************************************************************** */

      //***************************************************************************** */
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

        content: [
          {
            text: pdf_dirsubproc + "\n" + pdf_agencia,
            style: "headertext",
            absolutePosition: { x: 85, y: 95 },
          },

          {
            text: "CITATORIO PARA EFECTO DE CUMPLIMIENTO",
            style: "titulo",
          },
          "\n\n",
          {
            text: this.nombre + "\n" + this.direccion,
            style: "DePara",
          },

          "\n\n",
          {
            text: html_texto,
            style: "texto",
          },

          "\n\n\n\n\n\n\n",
          {
            text:
              "Atentamente" +
              "\n\n\n\n\n" +
              pdf_usuario +
              "\n" +
              pdf_puesto +
              "\n" +
              "Adscrito al " +
              pdf_agencia,
            style: "ampo",
          },
        ],

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
    reimprimirCitatorio(item) {
      let me = this;
      me.editedIndex = 1;
      (me.oficio = item.textooficio), (me.nombre = item.dirigidoa_Nombre);
      me.direccion = item.dirigidoa_Direccion;
      me.solicitadopor = item.solicitadoPor;
      me.noCitatorio = item.noCitatorio;
      me.noCitatorioText = me.consultarNoCita(me.noCitatorio);
      me.uf_Distrito = item.uf_Distrito;
      me.uf_DirSubProc = item.uf_DirSubProc;
      me.uf_Agencia = item.uf_Agencia;
      me.uf_Nombre = item.uf_Nombre;
      me.uf_Puesto = item.uf_Puesto;
      me.uf_Modulo = item.uf_Modulo;
      me.fechaHoraCita = item.fechaHoraCita;
      if (me.noCitatorio == 0) {
        debugger;

        var dd = me.crearpdfSC();
        //var ddR = me.crearPdf_Recordatorio();
        var pdfMake = require("pdfmake/build/pdfmake.js");
        var htmlToPdfmake = require("html-to-pdfmake");

        if (pdfMake.vfs == undefined) {
          var pdfFonts = require("pdfmake/build/vfs_fonts.js");
          pdfMake.vfs = pdfFonts.vfs;
        }
        var doc = pdfMake.createPdf(dd).print();
        //var docR = pdfMake.createPdf(ddR).print();
      } else {
        var dd = me.crearPdf();
        var pdfMake = require("pdfmake/build/pdfmake.js");
        var htmlToPdfmake = require("html-to-pdfmake");

        if (pdfMake.vfs == undefined) {
          var pdfFonts = require("pdfmake/build/vfs_fonts.js");
          pdfMake.vfs = pdfFonts.vfs;
        }
      }

      var ddR = me.crearPdf_Recordatorio();
      var docR = pdfMake.createPdf(ddR).print();
      var doc = pdfMake.createPdf(dd).print();
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
    crearPdf_CartaAceptacion() {
      let me = this
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");      
      var logo1 = this.logo1;
      var logo2 = this.logo2;
      var logo3 = this.logo3;
      var logo4 = this.logo4;
      var diragencia = this.direccionAgencia;
      var telagencia = this.telefonosAgencia;      
      var sourceDataS = this.listarSolicitantes;
      var bodyDataSolicitantes = [];      

      sourceDataS.forEach(function (sourceRow) {
        var dataRow = [];
        dataRow.push(sourceRow.nombreCompleto);
        bodyDataSolicitantes.push(dataRow);
      });
      
      var sourceDataR = this.listarRequeridos;
      var bodyDataRequeridos = [];

      sourceDataR.forEach(function (sourceRow) {
        var dataRow = [];
        dataRow.push(sourceRow.nombreCompleto);
        bodyDataRequeridos.push(dataRow);
      });

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
      
      var html_texto = htmlToPdfmake(
        "<p>Nosotros los intervinientes, estamos de acuerdo en participar en los Mecanismos Alternativos de Solución de Controversias en Materia Penal, dentro del EXPEDIENTE: <strong>" +
          this.noExpediente +
          "</strong> , con la intención de resolver la controversia que tenemos, sujetándonos a las bases siguientes:</p>" +
          "<br><br><p><strong>I.- </strong>Entendemos que el trámite es voluntario, flexible, imparcial, equitativo y que  se puede dar por terminado en cualquier momento</strong>.</p>" +
          "<br><br><p><strong>II.- </strong>Entendemos y aceptamos que el proceso es confidencial y nos comprometemos a no llamar al facilitador como testigo en el futuro, estableciendo como única excepción al deber de confidencialidad el caso de que se trate de un delito que se esté cometiendo o sea inminente su consumación y por el cual peligre la integridad física o la vida de una persona.</p>" +
          "<br><br><p><strong>III.- </strong>Nos comprometemos a acudir puntualmente a las sesiones y participar en ellas de buena fe, con respeto, tolerancia y cortesía.</p>" +
          "<br><br><p><strong>IV.- </strong>Entendemos que el facilitador no funcionará como asesor o abogado para ninguno de nosotros.</p>" +
          "<br><br><p><strong>V.- </strong>Manifestamos en este momento la existencia de las carpetas de investigación número <strong>" +
          this.nuc +
          "</strong> , sobre los hechos materia de la controversia que nos ocupa, siendo aplicable el ordinal 184 del Código Nacional de Procedimientos Penales.</p>" +
          "<br><br><p><strong>VI.- </strong>Entendemos que de acuerdo a los ordinales 7 y 8 de la&nbsp;Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal, nuestros derechos y obligaciones son los siguientes:</p>" +
          "<br><br><p><strong>Derechos:</strong> Se nos asigne un facilitador; recibir la información necesaria en relación con los Mecanismos Alternativos y sus alcances; solicitar la sustitución del facilitador con causa justificada; intervenir en todas las sesiones; solicitar la intervención de auxiliares y expertos; y expresar libremente mis necesidades y pretensiones.</p>" +
          "<br><br><p>De la misma forma que nuestros datos personales se encuentren protegidos y por consecuencia no sean divulgados ni obren en el acuerdo reparatorio, que en su caso se pudiese celebrar; esto con fundamento en el artículo 15 del Código Nacional de Procedimientos Penales.</p>" +
          "<br><br><p><strong>Obligaciones:</strong> Mantener la confidencialidad del asunto; observar una conducta respetuosa, tolerante y cortés durante las sesiones de los Mecanismos Alternativos; y cumplir con los Acuerdos a que se lleguen.  </p>" +
          "<br><br><p>Asimismo, nos obligamos a no grabar imagen o sonido alguno derivado de  las sesiones de los  Mecanismos Alternativos de Solución de Controversias en Materia Penal, y en caso de hacerlo, estamos de acuerdo en que se les niegue cualquier valor probatorio dentro o fuera de un procedimiento penal.</p>" +
          "<br><br><p>Lo anterior con fundamento en los artículos 4, 5, 6, 9, 10, 12, 13, 17, 18, 19, 30 y 31 de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal.</p>"
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
            text: pdf_dirsubproc + "\nSede " + pdf_distrito,
            style: "headertext",
            absolutePosition: { x: 85, y: 95 },
          },
          "\n\n\n",
          {
            text: "CARTA DE VOLUNTARIEDAD",
            style: "titulo",
          },
          "\n\n",
          {
            text: html_texto,
            style: "texto",
          },
          "\n\n",
          {
            text: pdf_distrito + " , Hidalgo a " + this.fechaG,
            style: "titulo",
          },
          "\n\n\n\n\n",
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
            fontSize: 10,
            bold: true,
            alignment: "left",
          },
          footertext: {
            fontSize: 7,
            color: "white",
          },
          texto: {
            fontSize: 10,
            regular: true,
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
            fontSize: 10,
            bold: true,
            alignment: "left",
          },
          cargo: {
            fontSize: 9,
            regular: true,
            alignment: "left",
          },
        },
      };

      return dd;
    },
    crearCartaAceptacion() {
      let me = this;            
      me.qrCode = '';          
      alertify.prompt(
        "Fecha de Carta de Voluntariedad",
        "Ingresa la fecha con la cual quieres que aparezca en la carta de Voluntariedad. Formato AAAA-MM-DD",
        moment().format("YYYY/MM/DD"),
        function (evt, value) {
          let intento = moment(value).format("LL");
          if (intento == "Fecha inválida") {
            alertify.error(
              "Formato de fecha incorrecto. Por favor, ingresa una fecha válida en el formato YYYY-MM-DD."
            );
          } else {
            me.fechaG = intento;
            me.docRemision = 'Registro de voluntariedad'
            let fechaQR = new Date()

            me.generarQR(me.docRemision,me.nuc,me.u_nombre,fechaQR,me.idRemision)            
          }
        },
        function () {
          alertify.error("Cancel");
        }
      );
    },
    //? Función encargada de generar
    async generarQR(tipodo,nuc,nombrefirma,fechadoc,id) {
        let me=this; 
        var textoModificado = nuc.replace(/-/g, "~");

        var date = moment(fechadoc, "YYYY-MM-DD HH:mm:ss");
        var dia = moment(date).format("DD");
        var mes = moment(date).format("MMMM");
        var año = moment(date).format("YYYY");
        var fecha = dia + " de " + mes + " del " + año;
    
        try {
            me.qrCode = await generarQRCodeBase64(tipodo,textoModificado,nombrefirma,fecha,id);                
        } catch (err) {
            me.$notify("Fallo al intentar generar el código QR", 'error')
        }
    },
  },
};
</script>
<style>
.my-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}
.my-table th,
.my-table td {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  text-align: center;
  padding: 12px 16px;
}
.my-table th {
  font-weight: bold;
}
.my-table tbody tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.04);
}
.my-table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.08);
}
</style>