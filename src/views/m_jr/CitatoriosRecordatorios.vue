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
      <v-card>
        <v-toolbar flat color="white">
          <v-toolbar-title class="font-weight-regular">Citatorios, Recordatorios y Hoja de Registro</v-toolbar-title>
          <v-divider class="mx-2" inset vertical />
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
          <v-flex xs12 sm6 md3>
            <v-text-field
              class="font-weight-regular"
              v-model="noExpediente"
              disabled
              prepend-icon="folder"
              filled
            />
          </v-flex>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                class="mx-2 py-2"
                slot="activator"
                v-on="on"
                @click="cerrarexpediente"
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
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                class="mx-2 py-2"
                slot="activator"
                v-on="on"
                @click="reimprimirHojadeRegistro"
                fab
                dark
                small
                color="success"
              >
                <v-icon dark class="mt-1">description</v-icon>
              </v-btn>
            </template>
            <span>Imprimir Hoja de Registro</span>
          </v-tooltip>
        </v-toolbar>
        <v-container elevation-0 grid-list-md>
          <br />
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
                          mostrarModalVer(
                            props.item.idConjuntoDerivaciones,
                            props.item.nombreD
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
                        @click="mostrarModalVer()"
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
    <v-dialog
      v-model="modalVerRecordatorio"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title class="subheading">Citatorios y Recordatorios</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="cerrarMInfo()">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-data-table
            :items="citatoriosrecordatorios"
            :headers="headers"
            :search="search"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
          >
            <template slot="items" class="white" slot-scope="props">
              <td>{{ props.item.noExpediente }}</td>
              <td>{{ formatearfechahora(props.item.fechaHoraCita) }}</td>
              <td>{{ props.item.solicitadoPor }}</td>
              <td>{{ props.item.dirigidoa_Nombre }}</td>
              <td>{{ props.item.noSesion }}</td>
              <td>
                <div v-if="props.item.noCitatorio == 0">
                  <a>Seguimiento Cumplimiento</a>
                </div>
                <div v-else>
                  {{ props.item.noCitatorio }}
                </div>
              </td>
              <td class="justify-center">
                <div v-if="props.item.statusAsistencia">
                  <v-icon class="mr-2" color="success">check_circle</v-icon>
                </div>
                <div v-else>
                  <v-icon class="mr-2" color="error">remove</v-icon>
                </div>
              </td>
              <td>{{ props.item.statusEntrega }}</td>
              <td>
                <v-badge left>
                  <template v-slot:badge>
                    <span>{{ props.item.contadorSMSS }}</span>
                  </template>
                  <v-icon color="grey lighten-1"> sms </v-icon>
                </v-badge>
              </td>
              <td>
                <v-badge left>
                  <template v-slot:badge>
                    <span>{{ props.item.contadorSMSR }}</span>
                  </template>
                  <v-icon color="grey lighten-1"> sms </v-icon>
                </v-badge>
              </td>
              <td class="justify-center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      v-if="tipoModulo == 'Facilitador'"
                      class="mr-2"
                      v-on="on"
                      color="default"
                      @click="statusAsistencia(props.item)"
                    >
                      event_available
                    </v-icon>
                  </template>
                  <span>Actualizar status de asistencia</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      v-if="tipoModulo == 'Notificador'"
                      class="mr-2"
                      v-on="on"
                      color="default"
                      @click="statusEntrega(props.item)"
                    >
                      near_me
                    </v-icon>
                  </template>
                  <span>Actualizar status entregado</span>
                </v-tooltip>
               
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      class="mr-2"
                      v-on="on"
                      color="warning"
                      @click="sol = 'citatorio'; reimprimirRecordatorio(props.item)"
                    >
                      print
                    </v-icon>
                  </template>
                  <span>Citatorios</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      class="mr-2"
                      v-on="on"
                      color="orange darken-2"
                      @click="sol = 'recordatorio'; reimprimirRecordatorio(props.item)"
                    >
                      print
                    </v-icon>
                  </template>
                  <span>Recordatorios</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      v-if="tipoModulo == 'Notificador'"
                      class="mr-2"
                      v-on="on"
                      color="success"
                      @click="auteSMSR(props.item)"
                    >
                      textsms
                    </v-icon>
                  </template>
                  <span>Enviar SMS requerido</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      v-if="tipoModulo == 'Facilitador'"
                      class="mr-2"
                      v-on="on"
                      color="success"
                      @click="auteSMSS(props.item)"
                    >
                      textsms
                    </v-icon>
                  </template>
                  <span>Enviar SMS solicitante</span>
                </v-tooltip>
              </td>
            </template>
            <template slot="no-data">
              <v-btn color="primary" @click="listarCRconC">Cargar</v-btn>
            </template>
          </v-data-table>
        </v-card-text>
        //
      </v-card>
    </v-dialog>

    <v-dialog v-model="modal_editdirec" max-width="500px">
      <v-card>
        <v-toolbar card dark color="grey lighten-4 primary--text">
          <v-avatar size="30">
            <v-icon class="grey lighten-2">edit</v-icon>
          </v-avatar>
          <v-toolbar-title class="subheading"
            >Edición de Dirección</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="cerrarMdir()">
              <v-icon class="grey">close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-switch
            v-model="swDir"
            :label="'¿Desea editar la dirección del Requerido?'"
            color="success"
            hide-details
            class="mb-3"
          ></v-switch>
          <v-form ref="form">
            <v-container grid-list-md v-if="swDir">
              <v-layout v-for="rr in requeridoC" wrap>
                <v-text-field
                  v-model="rr.domicilio"
                  :label="rr.nombre"
                ></v-text-field>
                <v-spacer></v-spacer>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.native="cerrarMdir">Cancelar</v-btn>
              <v-btn @click.native="duardadDomPDF" class="success"
                >Guardar</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="modal_statusAsistencia" max-width="500px">
      <v-card>
        <v-toolbar card dark color="grey lighten-4 primary--text">
          <v-avatar size="30">
            <v-icon class="grey lighten-2">refresh</v-icon>
          </v-avatar>
          <v-toolbar-title class="subheading"
            >Status asistencia</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <p class="subheading">
                    N° Expediente:<b> {{ noExpediente }}</b>
                  </p>
                </v-flex>
                <br />
                <v-spacer></v-spacer>
                <br />
                <v-flex xs12 sm12 md12>
                  <p class="subheading">
                    N° citatorio:<b> {{ noCitatorio }}</b>
                  </p>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-switch
                    v-model="v_statusAsistencia"
                    label="¿Se presentarón a la cita  los requerido(s)?:"
                    color="success"
                    hide-details
                  ></v-switch>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.native="close">Cancelar</v-btn>
              <v-btn @click.native="guardarStatusAsistencia" class="success"
                >Guardar</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="modal_statusEntrega" max-width="500px">
      <v-card>
        <v-toolbar card dark color="grey lighten-4 primary--text">
          <v-avatar size="30">
            <v-icon class="grey lighten-2">refresh</v-icon>
          </v-avatar>
          <v-toolbar-title class="subheading">Status entrega</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <p class="subheading">
                    N° Expediente:<b> {{ noExpediente }}</b>
                  </p>
                </v-flex>
                <br />
                <v-spacer></v-spacer>
                <br />
                <v-flex xs12 sm12 md12>
                  <p class="subheading">
                    N° citatorio:<b> {{ noCitatorio }}</b>
                  </p>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-autocomplete
                    :items="v_statusEntregas"
                    v-model="v_statusEntrega"
                    label="¿Como se entrego el citatorio?:"
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.native="close">Cancelar</v-btn>
              <v-btn @click.native="guardarStatusEntrega" class="success"
                >Guardar</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="modal_smss" max-width="700px">
      <v-card>
        <v-toolbar card dark color="grey lighten-4 primary--text">
          <v-avatar size="30">
            <v-icon small class="grey lighten-2">textsms</v-icon>
          </v-avatar>
          <v-toolbar-title class="subheading"
            >Enviar SMS a solicitante</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="noExpediente"
                    disabled
                    prepend-icon="folder_open"
                    label="N° Expediente:"
                  ></v-text-field>
                  <v-text-field
                    v-model="tokensms"
                    label="Token:"
                    disabled
                    prepend-icon="lock_outline"
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    v-model="codigo"
                    prepend-icon="phone"
                  ></v-text-field>
                </v-flex>
                <v-flex xs8 sm8 md8>
                  <v-text-field
                    v-model="destinatario"
                    type="tel"
                    label="Destinatario:"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea
                    outline
                    :counter="160"
                    v-model="mensagesms"
                    name="mensagesms"
                    label="Texto del mensaje:"
                    prepend-icon="sms"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.native="modal_smss = false">Cancelar</v-btn>
              <v-btn @click.native="sendSMSS()" class="success"
                >Enviar SMS</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="modal_smsr" max-width="700px">
      <v-card>
        <v-toolbar card dark color="grey lighten-4 primary--text">
          <v-avatar size="30">
            <v-icon small class="grey lighten-2">textsms</v-icon>
          </v-avatar>
          <v-toolbar-title class="subheading"
            >Enviar SMS a requerido</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="noExpediente"
                    disabled
                    prepend-icon="folder_open"
                    label="N° Expediente:"
                  ></v-text-field>
                  <v-text-field
                    v-model="tokensms"
                    label="Token:"
                    disabled
                    prepend-icon="lock_outline"
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex xs4 sm4 md4>
                  <v-text-field
                    v-model="codigo"
                    prepend-icon="phone"
                  ></v-text-field>
                </v-flex>
                <v-flex xs8 sm8 md8>
                  <v-text-field
                    v-model="destinatario"
                    type="tel"
                    label="Destinatario:"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-textarea
                    outline
                    :counter="160"
                    v-model="mensagesms"
                    name="mensagesms"
                    label="Texto del mensaje:"
                    prepend-icon="sms"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.native="modal_smsr = false">Cancelar</v-btn>
              <v-btn @click.native="sendSMSR()" class="success"
                >Enviar SMS</v-btn
              >
            </v-card-actions>
          </v-form>
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

//** COMPONENTES */
import n401 from "../../components/m_jr/401";
import n403 from "../../components/m_jr/403";

import moment from "moment";
import "moment/locale/es";
import alertify from "alertifyjs";
import { VueEditor } from "vue2-editor";
import { error } from "util";
import { generarQRCodeBase64 } from './crearQR';

export default {
  components: {
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

      headers: [
        { text: "No Expediente", value: "noExpediente" },
        { text: "Fecha y hora cita", value: "fechaHoraCita" },
        { text: "Solicitado por:", value: "solicitadoPor" },

        { text: "Dirigido a:", value: "dirigidoa_Nombre" },
        { text: "Sesion:", value: "noSesion" },
        { text: "N° Cita:", value: "noCitatorio" },
        {
          text: "Status asistencia",
          value: "statusAsistencia",
          sortable: false,
        },
        { text: "Status entrega", value: "statusEntrega", sortable: false },
        { text: "SMS Sol.", value: "opciones", sortable: false },
        { text: "SMS Req.", value: "opciones", sortable: false },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      headers1: [
        { text: "No", value: "noExpediente" },
        { text: "Solicitantes", value: "fechaHoraCita" },
        { text: "Requeridos:", value: "solicitadoPor" },
        { text: "Delitos:", value: "dirigidoa_Nombre" },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      search: "",
      rowsPerPageItems: [10, 20, 30, 40, 50],
      pagination: {
        rowsPerPage: 20,
      },
      editedIndex: -1,
      //**************************************
      //!VARIABLES GENERALES
      citatoriosrecordatoriosC: [],
      citatoriosrecordatorios: [],
      citatoriorecordatorioId: "",
      expedienteId: "",
      envioId: "",
      noExpediente: "",
      tipoModulo: "",
      noCitatorio: "",
      noCitatorioText: "",

      v_tipocitatorio: "",
      v_tiposcitatorios: [
        "Citatorio para que le de continuidad el Solicitante",
        "1ra cita Requerido",
        "2da cita Requerido",
        "3ra cita Requerido",
      ],
      v_solicitante: "",
      v_solicitantes: [],
      v_nombreSolicitantes: "",
      v_requerido: "",
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

      reseñaBreve: "",
      sesions: "",
      noDerivacion: "",
      autoridadqueDeriva: "",
      noderivacion: "",
      sesionId: "",
      fechaHoraDoc: "",
      v_facilitadores: [],
      v_facilitador: "",
      v_notificadores: [],
      v_notificador: "",
      asignaciones: [],
      un_Nombre: "",
      un_Puesto: "",
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

      //**************************************
      //VARIABLES REPORTE DE CITATORIO Y RECORDATORIO
      logo1: "",
      logo2: "",
      direccionAgencia: "",
      telefonosAgencia: "",
      titulo: "",
      dirigidoa: "",
      nombre: "",
      correo: "",
      telefono: "",
      //
      direccion: "",
      referencia: "",
      uf_Distrito: "",
      uf_DirSubProc: "",
      uf_Agencia: "",
      uf_Nombre: "",
      uf_Puesto: "",
      uf_Modulo: "",
      nombresS: [],

      fechaHoraCita: "",
      fechaDerivacion: "",
      fechaExpediente: "",

      //**************************************
      //MODALES

      modal_citatoriorecordatorio: false,
      modal_statusAsistencia: false,
      modal_statusEntrega: false,
      v_statusAsistencia: false,

      v_statusEntregas: [
        "Domicilio incorrecto",
        "Entregado a familiar o conocido",
        "Entregado personal",
        "Fijado",
        "No se ubica el domicilio",
        "Nombre incorrecto",
        "Ya no vive ahí",
      ],
      v_statusEntrega: "",

      v_delitos: [],
      nuc: "",

      modal_smss: false,
      modal_smsr: false,
      tokensms: "",
      mensagesms: "",
      destinatario: "",
      codigo: 52,

      //***************************** */
      seguimientos: [],
      // Cambios de AMG INICIO
      modalVerRecordatorio: false,
      vali: "",
      Solicitante: [],
      TelSoli: [],
      conjunto: "",
      DSoli: [],
      AllSoli: [],
      Requerido: [],
      DReq: "",
      AllReq: [],
      DelitoD: [],
      idconjuntos: "",
      solicitante: [],
      requerido: [],
      solicitanteC: [],
      requeridoC: [],
      solicitanteC: [],
      idsesion: "",
      //Cambios de AMG FIN
      idPersonas: [],
      nombre: [],
      edad: [],
      originario: [],
      nacionalidad: [],
      sexo: [],
      edofam: [],
      fechanam: [],
      escolaridad: [],
      ocupacion: [],
      domicilio: [],
      identificacion: [],
      curp: [],
      telefono: [],
      entidadD: "",
      municipioD: "",
      localidadD: "",
      clasificacionRequerido: "",
      modal_editdirec: false,
      reqarr: [],
      direAgencia: "",
      swDir: false,
      sol: "",
      arrayidconjuntos: [],
      solicitadosHR: [],
      requeridosHR: [],
      delitosHR: [],
      usuarioActual: '',
      nombreNS: [],
      nombreNR: [],

      texto: 'Vista Previa',
      qrCode: '',
      docRemision: 'Remisión',
      vistaPreviaTF: true,
    }
  },

  created() {
    let me = this;
    me.expedienteId = me.$store.state.idExpediente;
    me.envioId = me.$store.state.idEnvio;
    me.noExpediente = me.$store.state.noExpediente;
    me.u_rol = me.$store.state.usuario.rol;
    me.rHechoId = me.$store.state.idrhecho;
    me.usuarioActual = me.$store.state.usuario.usuario;

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
      me.informacionagencia();      
      me.listarFacilitadores();
      me.listarNotificadores();      
      me.InformacionExpediente();
      me.listarConjunto();
      me.direccionDelito();
      me.dirAgencia();
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

      var pdfMake = require("pdfmake/build/pdfmake.js");

      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.vfs;
      }

      if (val != '') {        
        if (me.docRemision == 'Hoja de registro') {
          var ddHR = me.crearPdfHR();
          pdfMake.createPdf(ddHR).print();          
        }
        if (me.docRemision == 'Citatorio de sesión') {          
          me.modal_editdirec = false;

          var dd = me.crearPdf();

          var doc = pdfMake.createPdf(dd).print();
        }
        if (me.docRemision == 'Recordatorio de sesión') {
          var ddR = me.crearPdf_Recordatorio();

          var docR = pdfMake.createPdf(ddR).print();
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
    /************************************************************************************************************************************************************************************/
    //!                                              CLASE PARA TRAER LA DIRECCION DONDE SE CONSTITUYO EL DELITO                                                                        */
    /************************************************************************************************************************************************************************************/
    direccionDelito() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$cat
        .get(
          "api/DireccionDelitoes/ListarPoridHecho/" + me.rHechoId,
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
    /************************************************************************************************************************************************************************************/
    //!                                              CLASE PARA CERRAR EL MODAL VER                                                                                                     */
    /************************************************************************************************************************************************************************************/
    cerrarMInfo() {
      let me = this;
      me.modalVerRecordatorio = false; //? AQUI SE PONE EL MODAL EN FALSO PARA QUE SE CIERRE
    },
    /************************************************************************************************************************************************************************************/
    //!                                              CLASE PARA CERRAR EL MODAL DE EDITAR DIRECCION                                                                                     */
    /************************************************************************************************************************************************************************************/
    cerrarMdir() {
      let me = this;
      me.modal_editdirec = false; //? AQUI SE PONE EL MODAL EN FALSO PARA QUE SE CIERRE
    },
    /************************************************************************************************************************************************************************************/
    //!                                              CLASE PARA ABRIR EL MODAL VER AL CUAL SE LE PASAN DOS PARAMETROS DE LA SELECCION                                                   */
    /************************************************************************************************************************************************************************************/
    mostrarModalVer(idconjunto, delito) {
      let me = this;      
      me.modalVerRecordatorio = true; //? AQUI SE ABRE EL MODAL
      me.idconjuntos = idconjunto; //? EN ESTA VARIABLE GLOBAL SE DUARGA EL ID DEL CONJUNTO SELECCIONADO
      me.delitoSelect = delito; //? EN ESTA VARIABLE GLOBAL SE VA A GUARDAR EL NOMBRE DEL DELITO
      if (me.vali == true) {
        me.listarCRconC(); //? AQUI INICIAMOS LA CLASE LISTAR CITATORIO RECORDATORIO CON CONJUNTO
      } else {
        me.listar();
      }
      me.listardelitos();
    },
    /************************************************************************************************************************************************************************************/
    //!                 CLASE PARA ADAPTAR TEXTO, PARA QUE CADA QUE ENCUENTRE ; LO SALTE, RECIBE EL TEXTO DE SOLICITANTES Y REQUERIDOS DE CONJUNTO                                      */
    /************************************************************************************************************************************************************************************/
    adaptarP(textoC) {
      let v = textoC.split(";");
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
    /************************************************************************************************************************************************************************************/
    //!                                                CLASE PARA LISTAR LO CONJUNTOS QUE SE ENCUENTRAN EN EL IDENVIO                                                                   */
    /************************************************************************************************************************************************************************************/
    listarConjunto() {
      //inicio de clase listar conjunto
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$justiciarestaurativa
        .get("api/Sesions/ListarConjuntoPorEnvio/" + me.envioId, configuracion)
        .then(function (response) {
          me.vali = response.data[0].sec; //? EN LA VARIABLE LOCAL VALI, SE GUARDA LA VALIDACION SI ES CONJUNTO O NO, TRUE ES CONJUNTO FALSE ES SIN CONJUNTO
          if (me.vali == true) {
            //? AQUI SE HACE LA VALIDACION SI ES UN CONJUNTO
            me.conjunto = response.data; //? SI ES CONJUNTO GUARDAMOS TODA LA INFORMACION DE LOS CONJUNTOS EN LA VARIABLE GLOBAL CONJUNTO
            me.conjunto.map((es) =>{
              me.arrayidconjuntos.push(es.idConjuntoDerivaciones)
              var aux1 = es.nombreR.split(';')
              var aux2 = es.nombreS.split(';')
              var aux3 = es.requeridosC.split(';')
              var aux4 = es.solicitadosC.split(';')
              
              aux4.map((au4, index) => {                
                me.nombreNS.push({
                  id: au4.trim(),
                  name: aux2[index].trim()
                })                
              })                            

              aux3.map((au3, index) => {
                me.nombreNR.push({
                  id: au3.trim(),
                  name: aux1[index].trim()
                })
              })
            })
          } else {
            //? EN DADO CASO QUE NO SEA UN CONJUNTO ENTRA AQUI
            response.data.map(
              (
                nm //? EN CASO DE QUE NO SEA CONJUNTO, SE RECORRE LA INFORMACION CON ESTE MAP
              ) => {
                //Inicia de Map
                if (nm.tipo == "Solicitante") {
                  //? SE VALIDAD SI ES SOLICITANTE
                  //Inicio if de tipo
                  me.Solicitante.push(nm.nombreCompleto); //? SE GUARDA EL NOMBRE DE CADA SOLICITANTE
                  me.TelSoli.push(nm.telefono); //? EN ESTA VARIABLE SE GUARDA EL TELEFONO DEL SOLICITANTE
                  me.$cat
                    .get("api/RAPs/ListarDP/" + nm.idPersona, configuracion)
                    .then(function (
                      response //? ESTA API ES PARA TRAER LA DIRECCION DE CADA SOLICITANTE
                    ) {
                      //? EN ESTA VARIABLE SE INSERTA LA DIRECCION COMNPLETA
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
                      }); //? SE AGREGA LA INFORMACION DE CADA UNO DE LOS SOLICITANTES
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
                } //fin de if tipo //? SI NO ES SOLICITANTE SE DA POR ECHO QUE ES REQUERIDO Y ENTRA AQUI
                else {
                  me.Requerido.push(nm.nombreCompleto); //? EN ESTA VARIABLE SE GUARDA EL NOMBRE DEL REQUERIDO
                  me.$cat
                    .get("api/RAPs/ListarDP/" + nm.idPersona, configuracion)
                    .then(function (
                      response //? ESTA API ES PARA TRAER LA DIRECCION DE CADA REQUERIDO
                    ) {
                      //? EN ESTA VARIABLE SE GUARDA LA DIRECCION COMPLETA DEL REQUERIDO
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
                      }); //? EN ESTA VARIABLE SE GUARDAN LOS DATOS COMPLETOS DE CADA REQUERIDO
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
              }
            ); //Final de map
            me.$justiciarestaurativa
              .get("api/Sesions/ListarDDPorEnvio/" + me.envioId, configuracion)
              .then(function (response) {
                //? CON ESTA API TRAEREMOS LOS DELITOS POR EL ENVIO CUANDO NO H7YA CONJUNTO
                response.data.map((d) => {
                  me.DelitoD.push(d.nombre); //? EN ESTA VARIABLE SE GUARDA EL NOMBRE DEL DELITO PARA MOSTRARLO
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
    /************************************************************************************************************************************************************************************/
    //!                                           CLASE PARA LISTAR LA INFORMACION DEL CITATORIO RECORDATORIO CON CONJUNTO                                                              */
    /************************************************************************************************************************************************************************************/
    listarCRconC() {
      let me = this;
      let header = { Authorization: "Beaer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.qrCode = ''
      me.docRemision = 'Citatorio'

      me.$justiciarestaurativa
        .get(
          "api/CitatorioRecordatorios/ListarCRConjunto/" + me.idconjuntos,
          configuracion
        )
        .then(function (response) {
          let fechaQR = new Date()          
          me.vistaPreviaTF = false
          me.generarQR(me.docRemision,me.nuc,me.u_nombre,fechaQR,response.data[0].idRCitatoriosRecordatorios);
          me.citatoriosrecordatorios = response.data; //? EN ESTA VARIABLE SE GUARDA LA INFORMACION DEL CITATORIO RECORDATORIO
        })
        .catch(function (error) {
          if (error.response.status == 400) {
            me.$notify("No es un usuario válido", "error");
          } else if (error.response.status == 401) {
            me.$notify(
              "Por favor inicie sesion para poder navegar en la aplicacion",
              "error"
            );
            (me.e401 = true), (me.showpage = false);
          } else if (error.response.status == 403) {
            me.$notify("No esta autorizado para ver esta pagina", "error");
            me.e403 = true;
            me.showpage = false;
          } else if (error.response.status == 404) {
            me.$notify("El recuso no ha sido encontrado", "error");
          } else {
            me.$notify("Error al intentar listar los registros!!!", "error");
          }
        });
    },
    /************************************************************************************************************************************************************************************/
    //!                                           CLASE PARA LISTAR LA INFORMACION DEL CITATORIO RECORDATORIO CUANDO NO HAY CONJUNTO                                                    */
    /************************************************************************************************************************************************************************************/
    listar() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$justiciarestaurativa
        .get(
          "api/CitatorioRecordatorios/ListarCREnvio/" + me.envioId,
          configuracion
        )
        .then(function (response) {
          me.citatoriosrecordatorios = response.data;

          me.close();
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
    async reimprimirHojadeRegistro() {
      let me = this;

      await me.procesarConjuntos();   
      me.qrCode = ''
      me.docRemision = 'Hoja de registro' 
      me.vistaPreviaTF = false

         
      let fechaQR = new Date()           

      me.conjuntosDetalles.map((x) => {        
        x.solicitadas.forEach((dd, index) => {          
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
        x.requeridas.forEach((dd, index) => {
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

        x.delitos.forEach((x, index) => {
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

      me.generarQR(me.docRemision,me.nuc,me.u_nombre,fechaQR,me.idRemision);
    },
    crearPdfHR() {
      let me = this
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

      var sourceDataD = this.delitosHR;
      var bodyDataDelitos = [];

      sourceDataD.forEach(function (sourceRow) {
        var dataRow = [];
        bodyDataDelitos.push(dataRow);
        dataRow.push("Delito: " + sourceRow.text + "\nComisión: " + sourceRow.valor1 + "\nAcción: " + sourceRow.valor2 + "\nElemento para la comision: " +
            (sourceRow.valor3 == true ? "Arma de Fuego" : sourceRow.valor4 == true ? "Arma Blanca" : sourceRow.valor5 !== "Na" ? sourceRow.valor5 : sourceRow.valor6 !== "Na" ? sourceRow.valor6 : "No se especifica") +
            "\n\n"
        );
      });
      //***************************************************************************** */

      //***************************************************************************** */
      var bodyDataSolicitantesL = [];
      for (var i = 0; i < this.solicitadosHR.length; i++) {
        var dataRow = [];
        dataRow.push();
        bodyDataSolicitantesL.push(this.solicitadosHR[i].text + "\n");
      }
      //***************************************************************************** */
      var sourceDataS = this.vali == true ? this.solicitadosHR : this.v_solicitantes;
      var solis = [];
      sourceDataS.map((rr) => {
        if (!solis.includes(rr.nombre)) {
          solis.push(this.nombreActualizado(rr.value, 's'))
        }
      });
      if (this.vali == true) {
        var bodyDataSolicitantes = [];
        sourceDataS.forEach(function (sourceRow) {
          var dataRow = [];
          bodyDataSolicitantes.push(dataRow);
          dataRow.push( "Nombre: " + me.nombreActualizado(sourceRow.value, 's') + "                             Edad:" + sourceRow.edad +
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
          dataRow.push("Nombre: " + (sourceRow.text == null || sourceRow.text == undefined || sourceRow.text == "" ? "SE DESCONOCE" : sourceRow.text) + "                                   Edad:" +  (sourceRow.edad == null || sourceRow.edad == undefined || sourceRow.edad == "" ? "SE DESCONOCE" : sourceRow.edad) +
                      "\nOriginario de: " + (sourceRow.valor5 == undefined || sourceRow.valor5 == null || sourceRow.valor5 == "" ? "SE DESCONOCE" : sourceRow.valor5) + "                 Nacionalidad: " + (sourceRow.nacionalidad == undefined || sourceRow.nacionalidad == null || sourceRow.nacionalidad == "" ? "SE DESCONOCE" : sourceRow.nacionalidad) +
                      "\nSexo: " + (sourceRow.valor4 == undefined || sourceRow.valor4 == null || sourceRow.valor4 == "" ? "SE DESCONOCE" : sourceRow.valor4) + "            Estado familiar: " + (sourceRow.valor6 == null || sourceRow.valor6 == undefined || sourceRow.valor6 == "" ? "SE DESCONOCE" : sourceRow.valor6) + "     Fecha de Nacimiento: " + (sourceRow.valor7 == undefined || sourceRow.valor7 == null || sourceRow.valor7 == "" ? "SE DESCONOCE" : sourceRow.valor7) +
                      "\nEscolaridad: " + (sourceRow.valor9 == undefined || sourceRow.valor9 == null || sourceRow.valor9 == "" ? "SE DESCONOCE" : sourceRow.valor9) + "            Ocupación: " + (sourceRow.ocupacion == null || sourceRow.ocupacion == undefined || sourceRow.ocupacion == "" ? "SE DESCONOCE" : sourceRow.ocupacion) +
                      "\nDomicilio: " + (sourceRow.direccion == undefined || sourceRow.direccion == null || sourceRow.direccion == "" ? "SE DESCONOCE" : sourceRow.direccion) +
                      "\nSe identifica con: " + (sourceRow.identificacion == null || sourceRow.identificacion == undefined || sourceRow.identificacion == "" ? "SE DESCONOCE" : sourceRow.identificacion) + "        CURP: " + (sourceRow.valor8 == null || sourceRow.valor8 == undefined || sourceRow.valor8 == "" ? "SE DESCONOCE" : sourceRow.valor8) +
                      "\nTelefono: " + (sourceRow.valor2 == null || sourceRow.valor2 == undefined || sourceRow.valor2 == "" ? "SE DESCONOCE" : sourceRow.valor2) +
                      "\n\n"
          );
        });
      }
      //***************************************************************************** */

      if (this.vali == true) {
        var sourceDataR = this.requeridosHR;
        var bodyDataRequeridos = [];
        sourceDataR.forEach(function (sourceRow) {
          var dataRow = [];
          dataRow.push("Nombre: " + me.nombreActualizado(sourceRow.value, 'r') + "                             Edad:" + sourceRow.edad +
                        "\nOriginario de: " + (sourceRow.originario !== null ? sourceRow.originario : "SE DESCONOCE") + "                 Nacionalidad: " + sourceRow.nacionalidad +
                        "\nSexo: " + (sourceRow.sexo === "M" ? "MUJER" : "HOMBRE") + "   Estado familiar: " + (sourceRow.estadofam !== "" ? sourceRow.estadofam : "SE DESCONOCE") + "    Fecha de Nacimiento: " + (sourceRow.fechanac !== null ? sourceRow.fechanac : "SE DESCONOCE") +
                        "\nEscolaridad: " + (sourceRow.escolaridad !== "" ? sourceRow.escolaridad : "SE DESCONOCE") + "             Ocupación: " + (sourceRow.ocupacion !== "" ? sourceRow.ocupacion : "SE DESCONOCE") +
                        "\nDomicilio: " + (sourceRow.domicilio !== ", No.Ext S/N, CP 0, , , " ? sourceRow.domicilio : "SE DESCONOCE") +
                        "\nSe identifica con: " + sourceRow.identificacion + "           CURP: " + sourceRow.curp +
                        "\nTelefono: " + (sourceRow.telefono !== ", " ? sourceRow.telefono : "SE DESCONOCE") +
                        "\n\n"
          );
          bodyDataRequeridos.push(dataRow);
        });
      } else {
        var sourceDataR = this.v_requeridos;
        var bodyDataRequeridos = [];
        sourceDataR.forEach(function (sourceRow) {
          var dataRow = [];
          dataRow.push("Nombre: " + (sourceRow.text == null || sourceRow.text == undefined || sourceRow.text == "" ? "SE DESCONOCE" : sourceRow.text) + "                                   Edad:" + (sourceRow.edad == null || sourceRow.edad == undefined || sourceRow.edad == "" ? "SE DESCONOCE" : sourceRow.edad) +
                        "\nOriginario de: " + (sourceRow.valor5 == undefined || sourceRow.valor5 == null || sourceRow.valor5 == "" ? "SE DESCONOCE" : sourceRow.valor5) + "                 Nacionalidad: " + (sourceRow.nacionalidad == undefined || sourceRow.nacionalidad == null || sourceRow.nacionalidad == "" ? "SE DESCONOCE" : sourceRow.nacionalidad) +
                        "\nSexo: " + (sourceRow.valor4 == undefined || sourceRow.valor4 == null || sourceRow.valor4 == "" ? "SE DESCONOCE" : sourceRow.valor4) + "            Estado familiar: " + (sourceRow.valor6 == null || sourceRow.valor6 == undefined || sourceRow.valor6 == "" ? "SE DESCONOCE" : sourceRow.valor6) + "     Fecha de Nacimiento: " + (sourceRow.valor7 == undefined || sourceRow.valor7 == null || sourceRow.valor7 == "" ? "SE DESCONOCE" : sourceRow.valor7) +
                        "\nEscolaridad: " + (sourceRow.valor9 == undefined || sourceRow.valor9 == null || sourceRow.valor9 == "" ? "SE DESCONOCE"  : sourceRow.valor9) + "            Ocupación: " + (sourceRow.ocupacion == null || sourceRow.ocupacion == undefined || sourceRow.ocupacion == "" ? "SE DESCONOCE" : sourceRow.ocupacion) +
                        "\nDomicilio: " + (sourceRow.direccion == undefined || sourceRow.direccion == null || sourceRow.direccion == "" ? "SE DESCONOCE" : sourceRow.direccion) +
                        "\nSe identifica con: " + (sourceRow.identificacion == null || sourceRow.identificacion == undefined || sourceRow.identificacion == "" ? "SE DESCONOCE" : sourceRow.identificacion) + "        CURP: " + (sourceRow.valor8 == null || sourceRow.valor8 == undefined || sourceRow.valor8 == "" ? "SE DESCONOCE" : sourceRow.valor8) +
                        "\nTelefono: " + (sourceRow.valor2 == null || sourceRow.valor2 == undefined || sourceRow.valor2 == "" ? "SE DESCONOCE" : sourceRow.valor2) +
                        "\n\n"
          );
          bodyDataRequeridos.push(dataRow);
        });
      }
      //***************************************************************************** */

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
      //***************************************************************************** */
      var html_reseña = htmlToPdfmake(this.reseñaBreve);
      
      //*********************************************************************************************** */
      
      var d = [];
      
      // var array =  this.requeridosHR.length + this.solicitadosHR.length + this.delitosHR.length
      var array = this.conjuntosDetalles.length;
      let index = 0;      
      var fechacita = this.formatearfechaTexo(this.conjuntosDetalles[0].sesion[0][0].fechaHora);
      var horacita = this.formatearfechahora(this.conjuntosDetalles[0].sesion[0][0].fechaHora).substr(10, 14);      

      this.conjuntosDetalles.map((qw) => {
        d.push(
          {
            style: "table2",
            table: {
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
                  qw.solicitadas.map((a) => { 
                    return {
                      text:
                        "Nombre: " + this.nombreActualizado(a[0].idPersona, 's') + "                             Edad:" + a[0].edad +
                        "\nOriginario de: " + (a[0].entidadFederativa !== null ? a[0].entidadFederativa : "SE DESCONOCE") + "                 Nacionalidad: " + a[0].nacionalidad +
                        "\nSexo: " + (a[0].sexo === "M" ? "MUJER" : "HOMBRE") + "   Estado familiar: " + (a[0].estadoCivil !== "" ? a[0].estadoCivil : "SE DESCONOCE") + "    Fecha de Nacimiento: " + (a[0].fechaNacimiento !== null ? a[0].fechaNacimiento : "SE DESCONOCE") +
                        "\nEscolaridad: " + (a[0].nivelEstudio !== "" ? a[0].nivelEstudio : "SE DESCONOCE") + "             Ocupación: " + (a[0].ocupacion !== "" ? a[0].ocupacion : "SE DESCONOCE") +
                        "\nDomicilio: " + (a[0].direccion !== ", No.Ext S/N, CP 0, , , " ? a[0].direccion : "SE DESCONOCE") +
                        "\nSe identifica con: " + a[0].docIdentificacion + "           CURP: " + a[0].curp +
                        "\nTelefono: " + (a[0].telefonos !== ", " ? a[0].telefonos : "SE DESCONOCE") +
                        "\n\n" +
                        (a[0].responsable[0].responsable == true ? "Representado por " + a[0].responsable[0].nombreCompleto + " con dirección " + a[0].responsable[0].direccion + ", con telefono " + a[0].responsable[0].telefono + ", con correo " + a[0].responsable[0].correo + "\n\n" : ""),
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
                return i === 0 || i === node.table.body.length ? "black" : "gray";
              },
              vLineColor: function (i, node) {
                return i === 0 || i === node.table.widths.length ? "black" : "gray";
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
                        "Nombre: " + this.nombreActualizado(b[0].idPersona, 'r') + "                             Edad:" + b[0].edad +
                        "\nOriginario de: " + (b[0].entidadFederativa !== null ? b[0].entidadFederativa : "SE DESCONOCE") + "                 Nacionalidad: " + b[0].nacionalidad +
                        "\nSexo: " + (b[0].sexo === "M" ? "MUJER" : "HOMBRE") + "   Estado familiar: " + (b[0].estadoCivil !== "" ? b[0].estadoCivil : "SE DESCONOCE") + "    Fecha de Nacimiento: " + (b[0].fechaNacimiento !== null ? b[0].fechaNacimiento : "SE DESCONOCE") +
                        "\nEscolaridad: " + (b[0].nivelEstudio !== "" ? b[0].nivelEstudio : "SE DESCONOCE") + "             Ocupación: " + (b[0].ocupacion !== "" ? b[0].ocupacion : "SE DESCONOCE") +
                        "\nDomicilio: " + (b[0].direccion !== ", No.Ext S/N, CP 0, , , " ? b[0].direccion : "SE DESCONOCE") +
                        "\nSe identifica con: " + b[0].docIdentificacion + "           CURP: " + b[0].curp +
                        "\nTelefono: " + (b[0].telefonos !== ", " ? b[0].telefonos : "SE DESCONOCE") +
                        "\n\n" +
                        (b[0].responsable[0].responsable == true ? "Representado por " + b[0].responsable[0].nombreCompleto + " con dirección " + b[0].responsable[0].direccion + ", con telefono " + b[0].responsable[0].telefono + ", con correo " + b[0].responsable[0].correo + "\n\n" : ""),
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
                return i === 0 || i === node.table.body.length ? "black" : "gray";
              },
              vLineColor: function (i, node) {
                return i === 0 || i === node.table.widths.length ? "black" : "gray";
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
                        "Delito: " + c.nombreDelito +
                        "\nComisión: " + c.intensionDelito +
                        "\nAcción: " + c.violenciaSinViolencia +
                        "\nElemento para la comision: " + (c.armaBlanca == true ? "Arma de Fuego" : c.armaFuego == true ? "Arma Blanca" : c.conAlgunaParteCuerpo !== "Na" ? c.conAlgunaParteCuerpo : c.conotroElemento !== "Na" ? c.conotroElemento : "No se especifica") + "\n\n",
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
                return i === 0 || i === node.table.body.length ? "black" : "gray";
              },
              vLineColor: function (i, node) {
                return i === 0 || i === node.table.widths.length ? "black" : "gray";
              },
            },
          },          
        );
      });

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
                return i === 0 || i === node.table.body.length ? "black" : "gray";
              },
              vLineColor: function (i, node) {
                return i === 0 || i === node.table.widths.length ? "black" : "gray";
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
                  { text: this.conjuntosDetalles[0].sesion[0][0].uf_Nombre, style: "texto2" },
                ],
                [
                  { text: "Notificador:", style: "texto1" },
                  { text: this.conjuntosDetalles[0].sesion[0][0].notificador, style: "texto2" },
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
                [solis,  this.conjuntosDetalles[0].sesion[0][0].capturista == null ? this.usuarioActual: this.conjuntosDetalles[0].sesion[0][0].capturista],
              ],
            },
            layout: "noBorders",
          },
      )

      if (index == array - 1) {
      }

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
    async procesarConjuntos(){
      const me = this;
      const urlSolicitada = "api/RAPs/ListarPersonaPDF"
      const urlRequerida = "api/RAPs/ListarPersonaPDF"
      const urlDelito = "api/Delitoes/ListarDelitoConjunto";
      const urlSesion = "api/Sesions/ListarPrimeraSesion"

      const conjuntosIdsPromises = me.arrayidconjuntos.map((a) =>{

        return me.obtenerConjuntosDeApi(a);
      })
      
      const conjuntosIdsResults = await Promise.all(conjuntosIdsPromises);
      const conjuntosDetallesPromises = conjuntosIdsResults.flat().map(async (conjunto) => {
          const { solicitadosC, requeridosC, idConjuntoDerivaciones, envioId} = conjunto;

          const [solicitadas, requeridas, delitos, sesion] = await Promise.all([
            solicitadosC ? this.obtenerDetalles(solicitadosC, urlSolicitada) : [],
            requeridosC ? this.obtenerDetalles(requeridosC, urlRequerida) : [],
            idConjuntoDerivaciones ? this.obtenerDetallesDelito(idConjuntoDerivaciones, urlDelito) : [],
            envioId ? this.obtenerDetallesSesion(envioId, urlSesion) : [],
          ]);

          // Para cada solicitada, obtiene los detalles del responsable y los agrega
          for (let i = 0; i < solicitadas.length; i++) {
            if (solicitadas[i][0].idPersona) {
              const responsable = await this.obtenerPersonaDetalle(
                solicitadas[i][0].idPersona
              );
              solicitadas[i][0].responsable = responsable;
            }
          }

          // Para cada requerida, obtiene los detalles del responsable y los agrega
          for (let i = 0; i < requeridas.length; i++) {
            if (requeridas[i][0].idPersona) {
              const responsable = await this.obtenerPersonaDetalle(
                requeridas[i][0].idPersona
              );
              requeridas[i][0].responsable = responsable;
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
    async obtenerConjuntosDeApi(idConjunto) {
      const header = { Authorization: "Bearer " + this.$store.state.token };
      const configuracion = { headers: header };
      try {
        const response = await me.$justiciarestaurativa.get(`api/SesionsConjunto/ListarSRDConjunto/${idConjunto}`, configuracion);
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
    InformacionExpediente() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$justiciarestaurativa
        .get(
          "api/Envios/InformacionExpediente/" +
            me.expedienteId +
            "/" +
            me.envioId,
          configuracion
        )
        .then((responseArr) => {
          me.reseñaBreve = responseArr.data.reseñaBreve;
          me.noderivacion = responseArr.data.noDerivacion;
          me.fechaDerivacion = responseArr.data.fechaDerivacion;
          me.fechaExpediente = responseArr.data.fechaRegistroExpediente;
          if (me.noderivacion !== "") {
            me.$justiciarestaurativa
              .get(
                "api/Envios/ListaEnviosPorExpedienteNoDerivacion/" +
                  me.expedienteId +
                  "/" +
                  me.noderivacion,
                configuracion
              )
              .then(function (response) {
                me.autoridadqueDeriva = response.data.autoridadqueDeriva;
              });
              me.$justiciarestaurativa
              .get("api/Sesions/ListarPorEnvio/" + me.envioId, configuracion)
              .then(function (response) {
                me.sesions = response.data[response.data.length - 1].idSesion;
                if (response) {
                  axios
                    .get(
                      "api/CitatorioRecordatorios/ListarCR/" + me.sesions,
                      configuracion
                    )
                    .then(function (response) {
                      me.fechaHoraDoc =
                        response.data[response.data.length - 1].fechaHoraCita;
                    });
                }
              });
            if (me.v_facilitador && me.v_notificador) {
              var idmodulo = me.v_facilitador.value;
              var idmoduloN = me.v_notificador.value;
              axios
                .all([
                  me.$controlacceso.get(
                    "api/Usuarios/ListarModulo/" + idmodulo,
                    configuracion
                  ),
                  me.$controlacceso.get(
                    "api/Usuarios/ListarModulo/" + idmoduloN,
                    configuracion
                  ),
                ])
                .then((responseArr) => {
                  me.u_nombre = responseArr[0].data.nombre;
                  me.u_puesto = responseArr[0].data.puesto;

                  me.un_modulo = responseArr[1].data.modulonombre;
                  me.un_nombre = responseArr[1].data.nombre;
                  me.un_puesto = responseArr[1].data.puesto;
                });
            }
          }
        });
    },
    listarFacilitadores() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var facilitadoresarray = [];
      me.$justiciarestaurativa
        .get(
          "api/FacilitadorNotificadors/ListarFacilitadores/" + me.u_iddistrito,
          configuracion
        )
        .then(function (response) {
          facilitadoresarray = response.data;
          facilitadoresarray.map(function (x) {
            me.v_facilitadores.push({
              text: x.nombreModulo,
              value: x.moduloServicioId,
            });
          });
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
          notificadoresarray = response.data;
          notificadoresarray.map(function (x) {
            me.v_notificadores.push({
              text: x.nombreModulo,
              value: x.moduloServicioId,
            });
          });
        })
        .catch(function (error) {
          me.$notify(error.message, "error");
        });
    },
    auteSMSS(item) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$justiciarestaurativa
        .post("api/CitatorioRecordatorios/auth", {}, configuracion)
        .then(function (response) {
          if (response.data.success == false) {
            me.$notify(response.data.message, "error");
          } else {
            me.tokensms = response.data.token;
            me.citatoriorecordatorioId = item.idRCitatoriosRecordatorios;
            var dia = moment(item.fechaHoraCita).format("DD");
            var mes = moment(item.fechaHoraCita).format("MMMM");
            var hr = moment(item.fechaHoraCita).format("h:mm");
            var fecha = dia + " de " + mes + " a las " + hr;
            me.mensagesms =
              item.solicitadoPor +
              ": no olvide acudir a su cita en la Procuraduria es el " +
              fecha +
              ". Su asunto es el " +
              item.noExpediente;
            me.destinatario = item.solicitadoPor_Telefono;
            me.modal_smss = true;
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
    },
    auteSMSR(item) {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$justiciarestaurativa
        .post("api/CitatorioRecordatorios/auth", {}, configuracion)
        .then(function (response) {
          if (response.data.success == false) {
            me.$notify(response.data.message, "error");
          } else {
            me.tokensms = response.data.token;
            me.citatoriorecordatorioId = item.idRCitatoriosRecordatorios;
            var dia = moment(item.fechaHoraCita).format("DD");
            var mes = moment(item.fechaHoraCita).format("MMMM");
            var hr = moment(item.fechaHoraCita).format("h:mm");
            var fecha = dia + " de " + mes + " a las " + hr;
            me.mensagesms =
              item.dirigidoa_Nombre +
              ": su cita en la Procuraduria es el " +
              fecha +
              ". Su asunto es el " +
              item.noExpediente +
              " [Evite que avance su procedimiento]";
            me.destinatario = item.dirigidoa_Telefono;
            me.modal_smsr = true;
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
    },
    sendSMSS() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$justiciarestaurativa
        .post(
          "api/CitatorioRecordatorios/send",
          {
            //***************************** PERSONA*/
            token: me.tokensms,
            texto: me.mensagesms,
            dest: me.destinatario,
            c: me.codigo,
            //************************************ */
          },
          configuracion
        )
        .then(function (response) {
          me.mensagesms = "";
          me.tokensms = "";
          me.destinatario = "";
          me.guardarContadorSMSS();
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
    sendSMSR() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$justiciarestaurativa
        .post(
          "api/CitatorioRecordatorios/send",
          {
            //***************************** PERSONA*/
            token: me.tokensms,
            texto: me.mensagesms,
            dest: me.destinatario,
            c: me.codigo,
            //************************************ */
          },
          configuracion
        )
        .then(function (response) {
          me.mensagesms = "";
          me.tokensms = "";
          me.destinatario = "";
          me.guardarContadorSMSR();
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
    guardarContadorSMSS() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$justiciarestaurativa
        .put(
          "api/CitatorioRecordatorios/ContadorSMSS",
          {
            idRCitatoriosRecordatorios: me.citatoriorecordatorioId,
          },
          configuracion
        )
        .then(function (response) {
          me.listarCRconC();
          me.modal_smss = false;
        })
        .catch(function (error) {
          me.$notify(
            "Error al intentar actualizar el  registrarl el SMS enviado!!!",
            "error"
          );
        });
    },
    guardarContadorSMSR() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$justiciarestaurativa
        .put(
          "api/CitatorioRecordatorios/ContadorSMSS",
          {
            idRCitatoriosRecordatorios: me.citatoriorecordatorioId,
          },
          configuracion
        )
        .then(function (response) {
          me.listarCRconC();
          me.modal_smsr = false;
        })
        .catch(function (error) {
          me.$notify(
            "Error al intentar actualizar el  registrarl el SMS enviado!!!",
            "error"
          );
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
    cerrarexpediente() {
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
    mostrarmodal() {
      let me = this;
      me.modal_agregar = true;
    },
    formatearfechaTexo(fecha) {
      let me = this;
      var dia = moment(fecha).format("DD");
      var mes = moment(fecha).format("MMMM");
      var año = moment(fecha).format("YYYY");
      var fecha2 = dia + " de " + mes + " del " + año;
      return fecha2;
    },
    listardelitos() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      var arrayDelito = [];
      me.v_delitos = [];
      if (me.vali == true) {
        me.$justiciarestaurativa
          .get("api/Delitoes/ListarDelitoConjunto/" + me.idconjuntos)
          .then(function (response) {
            arrayDelito = response.data;
            arrayDelito.map(function (x) {
              me.v_delitos.push({
                text: x.nombreDelito,
                valor1: x.intensionDelito,
                valor2: x.violenciaSinViolencia,
                valor3: x.armaBlanca,
                valor4: x.armaFuego,
                valor5: x.conAlgunaParteCuerpo,
                valor6: x.conotroElemento,
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
      } else {
        me.$justiciarestaurativa
          .get("api/Delitoes/ListarDelitos/" + me.envioId, configuracion)
          .then(function (response) {
            arrayDelito = response.data;
            arrayDelito.map(function (x) {
              me.v_delitos.push({
                text: x.nombreDelito,
                valor1: x.intensionDelito,
                valor2: x.violenciaSinViolencia,
                valor3: x.armaBlanca,
                valor4: x.armaFuego,
                valor5: x.conAlgunaParteCuerpo,
                valor6: x.conotroElemento,
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
      }
    },    
    listarInfoSolReq(sesionid) {
      //Nueva
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$justiciarestaurativa
        .get("api/SesionsConjunto/ListarSRD/" + sesionid, configuracion)
        .then(function (response) {
          let s = response.data;
          let soli = s[0].solicitadosC.replace("; ", ",");

          me.$cat
            .get("api/RAPs/ListarPersonaPDF/" + soli, configuracion)
            .then(function (response) {
              let s = response.data;
              me.solicitanteC = [];
              s.map((dd) => {
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
              });
            })
            .then(() => {
              let requi = s[0].requeridosC.replace("; ", ",");

              me.$cat
                .get("api/RAPs/ListarPersonaPDF/" + requi, configuracion)
                .then(function (response) {
                  let s = response.data;
                  me.requeridoC = [];

                  s.map((dd) => {
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
                  });
                })
                .then(() => {
                  var dd = me.crearPdfHR();
                  var pdfMake = require("pdfmake/build/pdfmake.js");
                  var htmlToPdfmake = require("html-to-pdfmake");

                  if (pdfMake.vfs == undefined) {
                    var pdfFonts = require("pdfmake/build/vfs_fonts.js");
                    pdfMake.vfs = pdfFonts.vfs;
                  }
                  var doc = pdfMake.createPdf(dd).print();
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
                      "Error al intentar listar los registros!!!",
                      "error"
                    );
                  }
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
                me.$notify(
                  "Error al intentar listar los registros!!!",
                  "error"
                );
              }
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
          alertify
            .confirm(
              "Domicilio del Citatorio",
              `¿Desea cambiar la dirección del citatorio?`,
              function () {
                me.modal_editdirec = true;
              },
              function () {
                var dd = me.crearPdf();
                var pdfMake = require("pdfmake/build/pdfmake.js");
                var htmlToPdfmake = require("html-to-pdfmake");

                if (pdfMake.vfs == undefined) {
                  var pdfFonts = require("pdfmake/build/vfs_fonts.js");
                  pdfMake.vfs = pdfFonts.vfs;
                }

                var ddR = me.crearPdf_Recordatorio();
                var docR = pdfMake.createPdf(ddR).print();
                var doc = pdfMake.createPdf(dd).print();
              }
            )
            .set("labels", { ok: "Si", cancel: "No" });
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
    duardadDomPDF() {
      let me = this;

      var dd
      var ddR      
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var htmlToPdfmake = require("html-to-pdfmake");
      
      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.vfs;
      }
      
      if (me.sol == "citatorio") {
        me.qrCode = ''
        me.docRemision = 'Citatorio de sesión'                          
        let fechaQR = new Date()
        me.generarQR(me.docRemision, me.nuc, me.u_nombre, fechaQR, me.sesionId)
      } else {        
        me.qrCode = ''
        me.docRemision = 'Recordatorio de sesión'      
        let fechaQR = new Date()
        me.generarQR(me.docRemision, me.nuc, me.u_nombre, fechaQR, me.sesionId)
      }
    },
    imprimirHojaRegistro(item) {
      let me = this;
      me.fechaHoraCita = item.fechaHoraCita;
      me.un_Nombre = item.un_Nombre;
      me.un_Puesto = item.un_Puesto;

      if (me.vali == true) {
        me.listarInfoSolReq(item.sesionId);
      } else if (me.vali == false || me.vali == "" || me.vali == undefined || me.vali == null) {
        var dd = me.crearPdfHR();
        var pdfMake = require("pdfmake/build/pdfmake.js");
        var htmlToPdfmake = require("html-to-pdfmake");

        if (pdfMake.vfs == undefined) {
          var pdfFonts = require("pdfmake/build/vfs_fonts.js");
          pdfMake.vfs = pdfFonts.vfs;
        }
        var doc = pdfMake.createPdf(dd).print();
      }
    },
    seleccionarOficio() {
      let me = this;

      me.v_nombreSolicitantes = "";

      me.nombresSolicitantes(me.v_solicitantes);

      if (
        me.v_tipocitatorio ==
        "Citatorio para que le de continuidad el Solicitante"
      ) {
        me.continuidad =
          "<p>Se le cita para darle continuidad al Mecanismo Alternativo solicitado por Usted<strong> </strong>dentro del <strong>Expediente </strong>" +
          "al rubro citado, que se llevará a cabo el día <strong>" +
          me.formatearfechaTexo(me.v_fechac) +
          " a las " +
          me.v_horacita +
          " horas</strong> , en el " +
          this.v_lugarcita +
          "</p>" +
          "<br><br><p>Cabe señalar que como se le informo, los Mecanismos Alternativos de Solución de Controversias en Materia Penal tienen como&nbsp;finalidad propiciar, " +
          "a través del diálogo, <strong>la solución de las controversias</strong> que surjan entre miembros de la sociedad con motivo de la <strong>" +
          "denuncia o querella referidos a un hecho delictivo,</strong> mediante procedimientos basados en la oralidad, la economía procesal y la confidencialidad;" +
          " por lo que se requiere de su puntual asistencia <strong>para poner fin al conflicto penal en el cual se encuentra inmerso dentro de la carpeta de investigación.</strong></p>" +
          "<br><br><p>El Centro de Justicia Restaurativa Penal, cuya misión es la solución de controversias o diferencias a través de un procedimiento confidencial," +
          " ágil, flexible, neutral y gratuito, evitando la continuación de la carpeta de investigación o del proceso penal en su caso; con fundamento en los artículos 17 párrafo" +
          " quinto de la Constitución Política de los Estados Unidos Mexicanos, 11 fracción XI de la Ley Orgánica del Ministerio Público del Estado de Hidalgo," +
          " 14 y 15 de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal, así como los ordinales 183 y 184 fracción I del" +
          " Código Nacional de Procedimientos Penales.</p>";
        me.oficio = me.continuidad;
        me.titulo = "Cita de continuidad";
        me.nombre = me.v_solicitante.text;
        me.telefono = me.v_solicitante.valor2;
        me.correo = me.v_solicitante.valor1;
        me.dirigidoa =
          me.v_solicitante.text +
          "\n" +
          "Direccion: " +
          me.direccion +
          "\n" +
          "Referencia: " +
          me.referencia;
      } else if (me.v_tipocitatorio == "1ra cita Requerido") {
        if (me.v_requerido.valor3 == "Imputado") {
          me.citatorio1v1 =
            "<p>Se le convoca a participar en una sesión del Mecanismo Alternativo solicitado por <strong>" +
            me.v_nombreSolicitantes +
            "</strong>," +
            " que se llevará a cabo el día <strong>" +
            me.formatearfechaTexo(me.v_fechac) +
            " a las " +
            me.v_horacita +
            " horas</strong> , en el " +
            this.v_lugarcita +
            "</p>" +
            "<br><br><p>Los Mecanismos Alternativos de Solución de Controversias en Materia Penal tienen como finalidad propiciar, a través del diálogo," +
            "<strong>la solución de las controversias</strong> que surjan entre miembros de la sociedad con motivo de la <strong>denuncia o querella referidos " +
            "a un hecho delictivo,</strong> mediante procedimientos basados en la oralidad, la economía procesal y la confidencialidad; por lo que se" +
            " requiere de su puntual asistencia, <strong>para poner fin al conflicto penal en el cual se encuentra inmerso dentro  de la carpeta de investigación iniciada en su contra.</strong></p>" +
            "<br><br><p>El Centro de Justicia Restaurativa Penal, cuya misión es la solución de controversias o diferencias a través de un procedimiento confidencial," +
            " ágil, flexible, neutral y gratuito, evitando la continuación de la carpeta de investigación o del proceso penal en su caso; con fundamento en los artículos" +
            " 17 párrafo quinto de la Constitución Política de los Estados Unidos Mexicanos, 11 fracción XI de la Ley Orgánica del Ministerio Público del Estado de Hidalgo," +
            " 14 y 15 de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal, así como los ordinales 183 y 184 fracción I del Código" +
            " Nacional de Procedimientos Penales.</p>";

          me.titulo = "1ra Cita";
          me.nombre = me.v_requerido.text;
          me.telefono = me.v_requerido.valor2;
          me.correo = me.v_requerido.valor1;
          me.dirigidoa =
            me.v_requerido.text +
            "\n" +
            "Direccion: " +
            me.direccion +
            "\n" +
            "Referencia: " +
            me.referencia;
          me.oficio = me.citatorio1v1;
        } else if (me.v_requerido.valor3 !== "Imputado") {
          me.citatorio1v2 =
            "<p>Se le convoca a participar en una sesión del Mecanismo Alternativo solicitado por <strong>" +
            me.v_nombreSolicitantes +
            "</strong>," +
            " que se llevará a cabo el día <strong>" +
            me.formatearfechaTexo(me.v_fechac) +
            " a las " +
            me.v_horacita +
            " horas</strong> , en el " +
            this.v_lugarcita +
            "</p>" +
            "<br><br><p>Los Mecanismos Alternativos de Solución de Controversias en Materia Penal tienen como finalidad propiciar, a través del diálogo," +
            "<strong>la solución de las controversias</strong> que surjan entre miembros de la sociedad con motivo de la <strong>denuncia o querella referidos " +
            "a un hecho delictivo,</strong> mediante procedimientos basados en la oralidad, la economía procesal y la confidencialidad; <strong><u>por lo que se" +
            " requiere de su puntual asistencia</u></strong>, para poner fin al conflicto penal de la carpeta de investigación a la cual dio inicio.</p>" +
            "<br><br><p>El Centro de Justicia Restaurativa Penal, cuya misión es la solución de controversias o diferencias a través de un procedimiento confidencial," +
            " ágil, flexible, neutral y gratuito, evitando la continuación de la carpeta de investigación o del proceso penal en su caso; con fundamento en los artículos" +
            " 17 párrafo quinto de la Constitución Política de los Estados Unidos Mexicanos, 11 fracción XI de la Ley Orgánica del Ministerio Público del Estado de Hidalgo," +
            " 14 y 15 de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal, así como los ordinales 183 y 184 fracción I del Código" +
            " Nacional de Procedimientos Penales.</p>";

          me.titulo = "1ra Cita";
          me.nombre = me.v_requerido.text;
          me.telefono = me.v_requerido.valor2;
          me.correo = me.v_requerido.valor1;
          me.oficio = me.citatorio1v2;
        }
      } else if (me.v_tipocitatorio == "2da cita Requerido") {
        me.citatorio2 =
          "<p>Dando continuidad a la carpeta de investigación iniciada en su contra se le requiere su presencia para participar en la sesión del Mecanismo" +
          "Alternativo solicitado por <strong>" +
          me.v_nombreSolicitantes +
          "</strong>, que se llevará a cabo el día <strong>" +
          me.formatearfechaTexo(me.v_fechac) +
          " a las " +
          me.v_horacita +
          " horas</strong> , en el " +
          this.v_lugarcita +
          "Esto con fundamento en los artículos 17 párrafo quinto de la Constitución Política de los Estados Unidos Mexicanos, 11 fracción XI de la Ley Orgánica del Ministerio" +
          "Público del Estado de Hidalgo, 14 y 15 de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal, así como los ordinales 183 y 184" +
          " fracción I del Código Nacional de Procedimientos Penales;</p><br><br><p>Los Mecanismos Alternativos de Solución de Controversias en Materia Penal tienen como&nbsp;finalidad " +
          "propiciar, a través del diálogo, la solución de las controversias que surjan entre miembros de la sociedad con motivo de la denuncia o querella referidos a un" +
          " hecho delictivo, mediante procedimientos basados en la oralidad, la economía procesal y la confidencialidad; por lo que se requiere de su puntual asistencia " +
          "y con ello este en posibilidades de dar solución a su conflicto penal mediante su participación.</p><br><br><p><strong><u>He de informarle que mediante su asistencia a este procedimiento," +
          " es posible lograr un acuerdo reparatorio y con ello dar por terminada la carpeta de investigación iniciada en su contra.&nbsp;</u></strong></p>";

        me.titulo = "2da Cita";
        me.nombre = me.v_requerido.text;
        me.telefono = me.v_requerido.valor2;
        me.correo = me.v_requerido.valor1;
        me.dirigidoa =
          me.v_requerido.text +
          "\n" +
          "Direccion: " +
          me.direccion +
          "\n" +
          "Referencia: " +
          me.referencia;
        me.oficio = me.citatorio2;
      } else if (me.v_tipocitatorio == "3ra cita Requerido") {
        me.citatorio3 =
          "<p>Como última cita se le requiere su presencia para participar en la sesión del Mecanismo Alternativo solicitado por <strong>" +
          me.v_nombreSolicitantes +
          "</strong>," +
          " que se llevará a cabo el día <strong>" +
          me.formatearfechaTexo(me.v_fechac) +
          " a las " +
          me.v_horacita +
          " horas</strong> , en el " +
          this.v_lugarcita +
          "; esto con fundamento en los artículos 17 párrafo quinto de la Constitución Política de los Estados Unidos Mexicanos,11 fracción XI de la Ley Orgánica del Ministerio Público del Estado de Hidalgo," +
          " 14 y 15 de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal, así como los ordinales 183 y 184 fracción I del Código Nacional de Procedimientos Penales.</p>" +
          "<br><br><p>El sistema penal contempla las Soluciones Alternas, mismas que se desarrollaran con la aplicación de los Mecanismos Alternativos de Solución de Controversias en Materia Penal," +
          " con motivo de la denuncia o querella referidos a un hecho delictivo, mediante procedimientos basados en la oralidad, la economía procesal y la confidencialidad; <strong>por lo que es de suma" +
          " importancia su puntual asistencia y con ello este en posibilidades de dar solución a su conflicto penal mediante su participación.</strong></p>" +
          "<br><br><p><strong><u>Cabe mencionar que en caso de no acudir a dicha sesión, se le hará del conocimiento al Ministerio Público para la continuación del procedimiento penal en su contra.</u></strong></p>";

        me.titulo = "3ra Cita";
        me.nombre = me.v_requerido.text;
        me.telefono = me.v_requerido.valor2;
        me.correo = me.v_requerido.valor1;
        me.dirigidoa =
          me.v_requerido.text +
          "\n" +
          "Direccion: " +
          me.direccion +
          "\n" +
          "Referencia: " +
          me.referencia;
        me.oficio = me.citatorio3;
      }
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
    close() {
      this.modal_agregar = false;
      this.modal_citatoriorecordatorio = false;
      this.modal_statusAsistencia = false;
      this.modal_statusEntrega = false;
      this.modal_smss = false;
      this.modal_smsr = false;
    },
    limpiar() {
      let me = this;
      me.v_tipocitatorio = "";
      me.v_solicitante = "";
      me.v_nombreSolicitantes = "";
      me.v_requerido = "";
      me.v_menu1 = false;
      me.v_fechacita = "";
      me.v_fechac = "";

      me.v_menu2 = false;
      me.v_horacita = "";
      me.v_horac = "";

      me.v_lugarcita = me.direAgencia;

      me.continuidad = "";

      me.citatorio1v1 = "";
      me.citatorio1v2 = "";

      me.citatorio2 = "";
      me.citatorio3 = "";

      me.fechaHoraCita = "";
      me.v_statusAsistencia = false;
      me.oficio = "";
      me.nombre = "";
      me.direccion = "";
      me.telefono = "";
      me.correo = "";
      me.titulo = "";
      me.editedIndex = -1;

      me.qrCode = '';
      me.vistaPreviaTF = true;
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
    crearPdf_Recordatorio() {
      let me = this
      var pdfMake = require("pdfmake/build/pdfmake.js");
      var logo1 = this.logo1;
      var logo2 = this.logo2;
      var logo3 = this.logo3;
      var diragencia = this.direccionAgencia;
      var telagencia = this.telefonosAgencia;
      
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

      var bodyDataSolicitantes = [];
      for (var i = 0; i < this.v_solicitantes.length; i++) {
        var dataRow = [];
        dataRow.push();
        bodyDataSolicitantes.push(this.v_solicitantes[i].text + "\n");
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
                  image: me.qrCode,
                  width: 80, // Ajusta el ancho según tu diseño
                  height: 80, // Ajusta la altura según tu diseño
                  absolutePosition: { x: 5, y: -757 }, // Ajusta las coordenadas según tu diseño
              }
              : "",
              me.vistaPreviaTF == false ? 
              {
                  image: me.qrCode,
                  width: 80, // Ajusta el ancho según tu diseño
                  height: 80, // Ajusta la altura según tu diseño
                  absolutePosition: { x: 5, y: -280 }, // Ajusta las coordenadas según tu diseño
              }
              : "",
            ],
          };
        },
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
                [{ text: this.v_lugarCita, alignment: "center" }],
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
    mostrarpdf() {
      let me = this;

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
          this.modal_citatoriorecordatorio = true;
        }
      });
    },
    listarInfoSolReqC(sesionid) {            
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };

      me.$justiciarestaurativa
        .get("api/SesionsConjunto/ListarSRD/" + sesionid, configuracion)
        .then(function (response) {
          let s = response.data;
          let soli = s[0].solicitadosC.replace("; ", ",");

          me.$cat
            .get("api/RAPs/ListarPersonaPDF/" + soli, configuracion)
            .then(function async(response) {
              let s = response.data;
              me.solicitanteC = [];              
              Promise.all(
                s.map(async (dd) => {
                  let repreResponse = await me.$justiciarestaurativa.get(
                    "api/Responsablejrs/ResponsaableXPersona/" + dd.idPersona,
                    configuracion
                  );
                  me.nombresS.push(dd.nombreCompleto)
                  me.solicitanteC.push({
                    value: dd.idPersona,
                    nombre: me.nombreActualizado(dd.idPersona, 's'),
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
            })
            .then(() => {
              let requi = s[0].requeridosC.replace("; ", ",");

              me.$cat
                .get("api/RAPs/ListarPersonaPDF/" + requi, configuracion)
                .then(function (response) {
                  let s = response.data;
                  me.requeridoC = [];

                  Promise.all(
                    s.map(async (dd) => {
                      let repreResponseR = await me.$justiciarestaurativa.get(
                        "api/Responsablejrs/ResponsaableXPersona/" +
                          dd.idPersona,
                        configuracion
                      );
                      me.requeridoC.push({
                        value: dd.idPersona,
                        nombre: me.nombreActualizado(dd.idPersona, 'r'),
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
                        representante: repreResponseR.data,
                      });
                    })
                  );
                })
                .then(() => {                           
                  me.sesionId = sesionid
                  if (me.sol == 'citatorio') {                                        
                    me.modal_editdirec = true
                  } else {                    
                    me.duardadDomPDF()
                  }
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
                      "Error al intentar listar los registros!!!",
                      "error"
                    );
                  }
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
                me.$notify(
                  "Error al intentar listar los registros!!!",
                  "error"
                );
              }
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
    reimprimirRecordatorio(item) {
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
      me.un_Nombre = item.un_Nombre;
      me.un_Puesto = item.un_Puesto;
      me.uf_Modulo = item.uf_Modulo;
      me.v_lugarcita = item.lugarCita
      me.fechaHoraCita = item.fechaHoraCita;

      if (me.vali == true) {
        me.listarInfoSolReqC(item.sesionId);
      } else {
        me.listarInfoSolReqSC();
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
        this.solicitadopor = this.v_solicitante.text;
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

          "\n\n",
          {
            text:
              req.clasificacion && req.clasificacion == "Imputado"
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
              req.clasificacion == "Imputado"
                ? "El motivo de su cita es por una denuncia penal interpuesta en su contra por " +
                  this.solicitadopor +
                  ", por el delito de" +
                  listadelito +
                  " de conformidad con el Código Penal del Estado de Hidalgo, dicho delito es sancionable."
                : "El motivo de su cita es por una denuncia penal interpuesta por usted y para reunirse  con " +
                  this.solicitadopor +
                  ", por el/los delito(s)" +
                  listadelito +
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
              pdf_usuario +
              "\n" +
              pdf_puesto +
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
        if (index != this.solicitanteC.length - 1) {
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
      var dia = moment().format("DD");
      var mes = moment().format("MMMM");
      var año = moment().format("YYYY");
      var hr = moment().format("h:mm:ss a");
      var fecha = `${dia} de ${mes} del ${año}, ${hr}`;

      me.nombresSolicitantes(me.v_solicitantes);      
      
      me.v_delitos.map(qw => {
        if (listadelito == "") {
          listadelito += qw.text.trim()
        } else {
          listadelito += `, ${qw.text.trim()}`  
        }
      })            

      if (me.editedIndex == 1) {
        var dia = moment(me.fechaHoraCita).format("DD");
        var mes = moment(me.fechaHoraCita).format("MMMM");
        var año = moment(me.fechaHoraCita).format("YYYY");
        var hrCita = moment(me.fechaHoraCita).format("h:mm:ss a");
        var fechaCita = `${dia} de ${mes} del ${año}`;
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
        var pdf_agencia = me.u_dgencia;
        var pdf_usuario = me.u_nombre;
        var pdf_puesto = me.u_puesto;
        var pdf_modulo = me.u_modulo;
        me.nombre = me.v_requerido.text;
        me.solicitadopor = me.v_solicitante.text;
      }

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

      var ddd = [];  
            
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
                  text: "",
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
            text: `${req.nombre} con domicilio ${req.domicilio == ", No.Ext S/N, CP 0, , , " ? "LO DESCONOCE" : req.domicilio} ${req.representante.responsable == true ? `\nRepresentado por ${req.representante.nombreCompleto} con domicilio ${req.representante.direccion}` : ''}`,
            style: "subtitulo",
          },
          "\n\n",
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
            text: `El motivo de su cita es por una denuncia penal interpuesta en su contra por ${me.personasconRepresentantesPDF(me.solicitanteC)} por ${me.v_delitos.length > 1 ? 'los delitos' : 'el delito'} de ${listadelito} de conformidad con el Código Penal del Estado de Hidalgo, dicho delito es sancionable.`,
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
            text:`En el Municipio ____________________ Estado de Hidalgo, siendo las __________ horas, del dia ___ de __________ del año en curso, dentro del expediente ${me.noExpediente}, me constituí en el domicilio del C. ___________________________________________ ubicado en ________________________________________________________________________________________ y cuyas caracteristicas del domicilio son: _______________________________________________________________________, haciendo constar que fui atendido por _______________________________________ quien refirio llamarse __________________________________________ por lo que procedi a ____________________________. Lo anterior para los fines legales a que haya lugar.`,
            style: "texto",
          },
          "\n\n\n\n",
          {
            text:`Observaciones: __________________________________________________________________________
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
        )

        if (index != me.requeridoC.length - 1) {
          ddd.push({
            text: "", // No es necesario agregar un texto, solo se añadirá una nueva página
            pageBreak: "after", // Indica que se debe agregar una nueva página después de este elemento
          });
        }
      })

      ddd.push({
          text: "", // No es necesario agregar un texto, solo se añadirá una nueva página
          pageBreak: "after", // Indica que se debe agregar una nueva página después de este elemento
      });
          
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
            text:`${sol.nombre} con domicilio ${sol.domicilio == ", No.Ext S/N, CP 0, , , "? "LO DESCONOCE": sol.domicilio} ${sol.representante.responsable == true ? `\nRepresentado por ${sol.representante.nombreCompleto} con domicilio ${sol.representante.direccion}` : ''}`,
            style: "subtitulo",
          },
          "\n\n",
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
            text: `El motivo de su cita es por una denuncia penal interpuesta por usted y para reunirse con ${me.personasconRepresentantesPDF(me.requeridoC)}, por ${me.v_delitos.length > 1 ? 'los delitos' : 'el delito'} de ${listadelito}, de conformidad con el Código Penal del Estado de Hidalgo.`,
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
            text: `${pdf_usuario}\n${pdf_puesto}\nADSCRITO A LA ${pdf_agencia.toUpperCase()}\n\n\n\n\n\n\n\n\n\n`,
            style: "ampo",
          },
          {
            text: "RAZÓN",
            style: "titulo",
            pageBreak: "before",
          },
          "\n\n\n\n",
          {
            text: `En el Municipio ____________________ Estado de Hidalgo, siendo las __________ horas, del dia ___ de __________ del año en curso, dentro del expediente ${me.noExpediente}, me constituí en el domicilio del C. ___________________________________________ ubicado en ________________________________________________________________________________________ y cuyas caracteristicas del domicilio son: _______________________________________________________________________, haciendo constar que fui atendido por _______________________________________ quien refirio llamarse __________________________________________ por lo que procedi a ____________________________. Lo anterior para los fines legales a que haya lugar.`,
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
            text: `LIC. __________________________________\nNOTIFICADOR ESPECIALIZADO`,
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
                text: `${diragencia}\n${telagencia}"www.hidalgo.gob.mx`,
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
                  absolutePosition: { x: 5, y: -70 }, // Ajusta las coordenadas según tu diseño
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
    limpiaroficio() {
      this.oficio = "";
    },
    obtenerNocitatorio() {
      let me = this;
      let header = { Authorization: "Bearer " + this.$store.state.token };
      let configuracion = { headers: header };
      me.$justiciarestaurativa
        .get(
          "api/CitatorioRecordatorios/FiltrarNoCIta/" + me.noExpediente,
          configuracion
        )
        .then(function (response) {
          me.noCitatorio = response.data.nc + 1;
          me.noCitatorioText = me.consultarNoCita(me.noCitatorio);
        })
        .catch(function (error) {
          me.$notify(
            "Error al intentar leer la informacion del numero de cita!!!",
            "error"
          );
        });
    },
    statusAsistencia(item) {
      let me = this;

      me.citatoriorecordatorioId = item.idRCitatoriosRecordatorios;
      me.noCitatorio = item.noCitatorio;
      me.v_statusAsistencia = item.statusAsistencia;
      me.modal_statusAsistencia = true;
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
          me.listarCRconC();
          me.close();
          me.limpiar();
        })
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
            me.$notify("Error al intentar actualizar el registro!!!", "error");
          }
        });
    },
    consultarNoCita(nocita) {
      switch(nocita){
                case 1:                  
                  return 'PRIMERA'
                  break;
                case 2:                  
                  return 'SEGUNDA'
                  break;
                case 3:                   
                   return 'TERCERA'
                  break;
                case 4:                   
                   return 'CUARTA'
                  break;
                case 5:                   
                   return 'QUINTA'
                  break;
                case 6:                   
                   return 'SEXTA'
                  break;
                case 7:                   
                   return 'SEPTIMA'
                  break;
                case 8:                   
                   return 'OCTAVA'
                  break;
                case 9:                   
                   return 'NOVENA'
                  break;
                case 10:                   
                   return 'DECIMA'
                     break; 
                 default:
                    return '*';
                    break;  
              }
    },
    //? Función para retornar el nombre modificado en caso de existir
    nombreActualizado(id, tipo) {
      var me = this

      var temporal = ''      

      if (tipo == 's') {
        var persona = me.nombreNS.filter(nn => nn.id == id)        

        temporal = persona[0].name
      }

      if (tipo == 'r') {
        var persona = me.nombreNR.filter(nn => nn.id == id)

        temporal = persona[0].name
      }      

      return temporal
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
    async generarQR(tipodo,nuc,nombrefirma,fechadoc,id) 
    {                    
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
          me.$notify("Error al intentar crear el código QR", "error");
        }
    },
  },
};
</script>