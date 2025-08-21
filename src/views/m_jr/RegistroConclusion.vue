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
                <v-toolbar-title class="font-weight-regular">Registros de conclusión.</v-toolbar-title>
                <v-divider class="mx-2" inset vertical />
                <v-spacer />
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
                        <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="cerrarexpediente" fab dark small color="primary">
                            <v-icon class="mt-1" dark>close</v-icon>
                        </v-btn>
                    </template>
                    <span>Cerrar carpeta</span>
                </v-tooltip>
            </v-toolbar>
            <v-card> 
                <v-container grid-list-md>
                    <v-layout v-if="statusInforme==false" row px-3 wrap>
                        <v-flex xl12 lg12 md12 sm12 xs12>
                            <v-card elevation="0"> 
                                <v-card-text class="px-0">
                                    <v-autocomplete 
                                        name="registro de conclusión"
                                        :items="listarregistrosConclusion" 
                                        v-model="statusAR"  
                                        label="Registro de conclusión:"
                                        prepend-icon="spellcheck"
                                        v-on:change="cargartexto"
                                        return-object  
                                    />
                                    <v-divider />
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">  
                                            <v-btn class="mt-1 py-2" slot="activator" v-on="on" @click.native="mostrarpdf" absolute dark small fab bootom right color="primary">
                                                <v-icon class="mt-1">remove_red_eye</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Vista previa</span>
                                    </v-tooltip>
                                    <br>
                                    <h3>Texo de libre edición:</h3>
                                    <vue-editor   
                                        outline 
                                        height=320px;
                                        :editorToolbar="customToolbar" 
                                        v-model="v_textoAR"  
                                        style="max-height: 310px; overflow-y: scroll" 
                                    />
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <v-layout v-if="statusInforme==true" row px-3 wrap>
                        <v-flex xl12 lg12 md12 sm12 xs12>
                            <v-card elevation="0"> 
                                <v-card-text class="px-0">   
                                    <v-list two-line>
                                        <v-list-tile>
                                            <v-list-tile-action>
                                                <v-icon color="warning">start</v-icon>
                                            </v-list-tile-action>
                                            <v-list-tile-content>
                                                <v-list-tile-sub-title>Status:</v-list-tile-sub-title>
                                                <v-list-tile-title> {{ statusAR.text }}</v-list-tile-title>
                                            </v-list-tile-content>
                                            <v-list-tile-action>
                                                <v-btn @click="imprimir()" icon>
                                                    <v-icon color="success">print</v-icon>
                                                </v-btn>
                                            </v-list-tile-action>
                                        </v-list-tile>
                                        <v-divider inset />
                                        <v-list-tile>
                                            <v-list-tile-action>
                                                <v-icon color="warning">access_time</v-icon>
                                            </v-list-tile-action>
                                            <v-list-tile-content>
                                                <v-list-tile-title>Fecha  en que se realizo el registro:</v-list-tile-title>
                                                <v-list-tile-sub-title>{{ fechahoradoc ? fechahoradoc.replace("T", " ").split(".")[0] : 'Sin registro de fecha' }} </v-list-tile-sub-title>
                                            </v-list-tile-content>
                                            <v-list-tile-action>
                                                <v-icon>check</v-icon>
                                            </v-list-tile-action>
                                        </v-list-tile>
                                    </v-list>
                                </v-card-text>
                            </v-card>
                            <v-divider />
                        </v-flex> 
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>
        <v-dialog v-model="modal_SAR" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer />
                    <v-toolbar-items>
                    <v-btn color=success text @click.native="guardar">Guardar e imprimir</v-btn>
                    <v-btn icon @click="modal_SAR= false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <iframe id="iframepdfAR" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no" />
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-layout> 
</template>

<script>  
  import axios from 'axios'  
  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas'
  import VeeValidate from 'vee-validate'
  import { error } from 'util';
  import n401 from '../../components/m_jr/401'
  import n403 from '../../components/m_jr/403'
  import moment from 'moment'
  import 'moment/locale/es';
  import alertify from 'alertifyjs';
  import { VueEditor } from "vue2-editor";
  import { NumberAsString } from './NumerosLetras.js'
  import DualListBox from "dual-listbox-vue";
  import "dual-listbox-vue/dist/dual-listbox.css";
  import { generarQRCodeBase64 } from './crearQR';

  export default {
    components: {  
        n401,
        n403,
        "vue2-editor": VueEditor ,
        DualListBox,  
    },
    data: function () {
        return {
            e401: false, 
            e403: false,
            showpage: true,  
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
            envioId: '',
            expedienteId: '', 
            noDerivacion: '',
            fechaExpediente: '',
            fechaHoraSuceso: '',
            nuc: '',
            StatusGeneral: '',
            informacionStatus: '',
            EspontaneoNoEspontaneo: '',
            primeraVezSubsecuente: '',
            NoSolicitantes: '',
            uqe_Agencia: '',
            uqe_Modulo: '',
            uqe_Nombre: '',
            uqe_Puesto: '',
            reseñaBreve: '',
            // VARIABLES PARA DEL STORE
            u_iddistrito: '',
            u_distrito: '',
            u_dirSubPro: '',
            u_idagencia: '',
            u_agencia: '',
            u_idmoduloservicio: '',
            u_modulo: '',
            u_idusuario: '',
            u_nombre: '',
            u_clave: '',
            u_rol: '',
            u_puesto: '',
            u_email: '',
            modal_SAR: false,
            logo1: '',
            logo2: '',
            direccionAgencia: '',
            telefonosAgencia: '', 
            nombreAgencia:'',
            v_requeridos: [], 
            v_requeridosL: '', 
            v_requeridosR: '', 
            v_solicitantes: [], 
            v_solicitantesL: '', 
            v_solicitantesR: '', 
            v_textoAR: '',
            v_textoFijo: '',
            fechahoradoc: '',
            noExpediente: '',
            asunto: '',
            statusInforme: false,
            editIndex: -1,
            v_statusconclusion: '',
            nombresSolicitantes: '',
            nombresRequeridos: '',
            personasS: 'La/el',
            personasR: 'La/el',
            statusAR: '', 
            listarregistrosConclusion: [
                { text: 'Registro conclusión inasistencia requerido', value: '1' }, //B
                { text: 'Registro conclusión inasistencia solicitante', value: '2' }, //B
                { text: 'Registro conclusión por comportamiento irrespetuoso', value: '3' }, //B
                { text: 'Registro conclusión por posiciones irreductibles', value: '4' }, //B
                { text: 'Registro conclusión por voluntad de ambas partes', value: '5' }, //B
                { text: 'Registro de conclusión por incumplimiento de acuerdo reparatorio', value: '6' }, //C
                { text: 'Registro de cumplimiento de acuerdo diferido y conclusión', value: '7' }, //C
                { text: 'Registros conclusión acuerdo inmediato', value: '8' }, //C
                { text: 'Registros conclusión por voluntad de requerido', value: '9' }, //B
                { text: 'Registros conclusión por voluntad de solicitante', value: '10' }, //B
            ],
            v_statusGeneral: '',

            ultimaSesion:0,

            acuerdosReparatorios:[],

            montoPagarAR:'',
            fechaAcuerdo:'',

            textoSol:"",
            textoReq:"",

            texto: 'Vista Previa',
            qrCode: null,
            docRemision: 'Remisión',
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
    created () { 
      const token = this.$store.state.token || localStorage.getItem("token");
          if(token)
          { 
            this.$store.dispatch("guardarToken", token)
            this.$store.dispatch("setLogin", token)
          }
          else 
          { 
            this.$router.push({ name: 'login' });
          }
        let me = this    
        me.expedienteId = me.$store.state.idExpediente;
        me.u_rol = me.$store.state.usuario.rol;
        if (me.expedienteId == null) {
            me.$alert('Notificación', 'Aun no ha abierto ninguna expediente por favor ingrese al menu Mis expedientes y luego en Mi lista de expedientes asignados y  ahi abra la expediente que usted elija!. En este momento sera redireccionado al menu correspondiente.', 
            function () {  
                if (me.u_rol == 'Facilitador' || me.u_rol == "Notificador") {
                    me.$router.push('./jr-misexpedientes') 
                } else {
                    me.$router.push('./jr-expedientesaceptados') 
                }
            })
        } else {
            me.$notify('Expediente abierto correctamente !!!','success') 
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

            //*********************************************** */ 
            me.envioId= me.$store.state.idEnvio; 
            me.noExpediente= me.$store.state.noExpediente;
            //*********************************************** */ 
            me.informacionRegistro();
            me.listarLogo();
            me.informacionagencia();  
            me.listarUltimaSesion();
            me.listarSolicitantesRequeridos("Solicitante");
            me.listarSolicitantesRequeridos("Requerido");   
            me.listarAR();   
        } 
        // INTERCEPTOR MODULO DE JUSTICIA RESTAURATIVA
        axios.interceptors.request.use((config) => { 
            me.$store.commit('LOADER', true);
            return config;
        }, (error) => {  
            me.$store.commit('LOADER', false);
            return Promise.reject(error);
        }); 
        axios.interceptors.response.use((response) => { 
            me.$store.commit('LOADER', false); 
            return response;
        }, (error) => {  
            me.$store.commit('LOADER', false); 
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
                if (me.docRemision == 'Registro de Conclusión') {
                    var dd = me.crearPdf();
                    var pdfMake = require('pdfmake/build/pdfmake.js')
                    var htmlToPdfmake = require("html-to-pdfmake");
                    if (pdfMake.vfs == undefined) {
                        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                        pdfMake.vfs = pdfFonts.vfs;
                    }
                    var doc = pdfMake.createPdf(dd);
                    var f = document.getElementById('iframepdfAR'); 
                    var callback = function(url) { f.setAttribute('src',url); }
                    doc.getDataUrl(callback, doc);
                    me.modal_SAR = true;         
                }
                if (me.docRemision == 'Reimpresión de registro de Conclusión') {
                    me.editIndex = 1;
                    var dd = me.crearPdf();
                    var pdfMake = require('pdfmake/build/pdfmake.js')
                    var htmlToPdfmake = require("html-to-pdfmake")
                    if (pdfMake.vfs == undefined){
                        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                        pdfMake.vfs = pdfFonts.vfs
                    } 
                    var doc = pdfMake.createPdf(dd).print()
                }
            }
        }
    },
    methods: { 
        listarLogo () { 
            let me = this; 
            this.$conf.get('api/ConfGlobals/Listar').then(function(response) {
                me.logo3 = response.data.logo3;
                me.logo4 = response.data.logo4;                
            }).catch(function(error) {
                me.$notify('Error al leer la configuracion global !!!', 'error')    
            });
        },  
        guardar () {
            let me = this; 
            let header = { "Authorization" : "Bearer " + this.$store.state.token };
            let configuracion = { headers: header }; 
            me.vistaPreviaTF = false
            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información.', 
                function() {
                  me.$justiciarestaurativa.post('api/RegistroConclusions/Crear',{   
                        'envioId': me.envioId,
                        'conclusion':me.statusAR.text ,
                        'asunto':me.asunto,
                        'texto':me.v_textoAR, 
                        'solicitates': me.v_solicitantesL,
                        'reuqeridos': me.v_requeridosL,
                        'statusGeneral': me.v_statusGeneral,
                        'uf_Distrito': me.u_distrito,
                        'uf_DirSubProc': me.u_dirSubPro,
                        'uf_Agencia': me.u_agencia,
                        'uf_Modulo': me.u_modulo,
                        'uf_Nombre': me.u_nombre,
                        'uf_Puesto': me.u_puesto,
                    }, configuracion).then(function(response) {   
                        var dd = me.crearPdf();
                        var pdfMake = require('pdfmake/build/pdfmake.js')
                        var htmlToPdfmake = require("html-to-pdfmake");
                        if (pdfMake.vfs == undefined) {
                            var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                            pdfMake.vfs = pdfFonts.vfs; 
                        }
                        var doc = pdfMake.createPdf(dd).print(); 
                        me.modal_SAR=false;  
                        me.informacionRegistro();
                    }).catch(function(error) {
                        if (error.response.status == 401) { 
                            me.e401 = true,
                            me.showpage = false
                        } else if (error.response.status == 403) {
                            me.e403 = true
                            me.showpage = false 
                        } else if (error.response.status == 404) {
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        } else {
                            me.$notify(error.message,'error')     
                        } 
                    });  
                },
                function () {
                    alertify.warning('Verifica la información')
                }).set('labels', { ok:'Guardar', cancel:'Cancelar' });
        },
        listarUltimaSesion () {
            let me = this;
            let header = { "Authorization" : "Bearer " + this.$store.state.token };
            let configuracion = { headers : header };
            debugger
            me.$justiciarestaurativa.get('api/Sesions/ListarPorEnvioUltimaSeseion/' + me.envioId, configuracion).then(function(response) { 
                debugger
                if (response.data.noHayAR != 1) {
                    me.v_solicitantesL = response.data.solicitates;
                    me.v_solicitantesR = me.v_solicitantesL.split(", "); 
                    me.v_requeridosL = response.data.reuqeridos;
                    me.v_requeridosR = me.v_requeridosL.split(", ");

                    me.ultimaSesion = response.data.noSesion;
                }
            }).catch(function(error) {
                if (error.response.status == 401) { 
                    me.e401 = true,
                    me.showpage = false
                } else if (error.response.status == 403) {  
                    me.e403 = true
                    me.showpage = false 
                } else if (error.response.status == 404) {
                    me.$notify("El recuso no ha sido encontrado", 'error')
                } else {
                    me.$notify(error.message, 'error')     
                }
            }); 
        }, 
        informacionagencia () {
            let me = this; 
            let header = { "Authorization" : "Bearer " + this.$store.state.token };
            let configuracion = {headers : header };  
            me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia, configuracion).then(function(response) {
                me.direccionAgencia = response.data.direccion;
                me.telefonosAgencia = response.data.telefono;
                me.nombreAgencia = response.data.nombreDirSub;
            }).catch(function(error) {
                me.$notify('Error al intentar leer la informacion de agencia!!!', 'error')
            });
        },  
        informacionRegistro () {
            let me = this;
            let header = { "Authorization" : "Bearer " + this.$store.state.token };
            let configuracion = {headers : header };
            me.$justiciarestaurativa.get('api/RegistroConclusions/ListarRegistros/' + me.envioId, configuracion).then(function(response) { 
                debugger
                if (response.data.ner != 1) {
                    let temporalStatus = me.listarregistrosConclusion.filter(status => status.text == response.data.conclusion)

                    me.statusInforme = true;
                    me.asunto = response.data.asunto;                    
                    me.v_textoAR = response.data.texto;
                    me.statusAR = {text: temporalStatus[0].text, value: temporalStatus[0].value}
                    me.fechahoradoc = response.data.fechaHora;
                    me.v_solicitatntesL = response.data.solicitantes;
                    me.v_requeridosL = response.data.requeridos;  
                    me.u_distrito = response.data.uf_Distrito;
                    me.u_dirSubPro = response.data.uf_DirSubProc; 
                    me.u_agencia = response.data.uf_Agencia;
                    me.u_modulo = response.data.uf_Modulo;
                    me.u_nombre = response.data.uf_Nombre; 
                    me.u_puesto = response.data.uf_Puesto;
                } else {
                    me.statusInforme= false;
                }
            }).catch(function(error) {
                if (error.response.status == 401) { 
                    me.e401 = true,
                    me.showpage = false
                } else if (error.response.status==403) {  
                    me.e403 = true
                    me.showpage = false 
                } else if (error.response.status == 404) {
                    me.$notify("El recuso no ha sido encontrado", 'error')
                } else {
                    me.$notify(error.message,'error')     
                } 
            }); 
        }, 
        listarAR () {
            let me = this;
            let header = { "Authorization" : "Bearer " + this.$store.state.token };
            let configuracion = {headers : header };
            me.$justiciarestaurativa.get('api/AcuerdoReparatorios/ListarConjuntosCA/' + me.envioId, configuracion).then(function(response) { 
                me.acuerdosReparatorios = response.data;

                me.nuc = response.data[0].nuc

                var aux1 = response.data[0].nombreS.split(";")
                var aux2 = response.data[0].nombreR.split(";")

                if (aux1.length > 1) {
                    me.personasS = 'Los'
                }

                if (aux2.length > 1) {
                    me.personasR = 'Los'
                }

                aux1.map(st => {
                    if (me.nombresSolicitantes == '') {
                        me.nombresSolicitantes = st.trim()
                    } else {
                        me.nombresSolicitantes += `, ${st.trim()}`
                    }
                })

                aux2.map(rt => {
                    if (me.nombresRequeridos == '') {
                        me.nombresRequeridos = rt.trim()
                    } else {
                        me.nombresRequeridos += `, ${rt.trim()}`
                    }
                })                

                for(var i=0; i < me.acuerdosReparatorios.length; i++) {

                    if (me.montoPagarAR == "") {
                        me.montoPagarAR = me.acuerdosReparatorios[i].montoTotal;

                    } else {
                        me.montoPagarAR = me.montoPagarAR + ", " + me.acuerdosReparatorios[i].montoTotal;
                    } 

                    

                    if (me.fechaAcuerdo == "") {

                        var date = moment(me.acuerdosReparatorios[i].fechaCelebracionAcuerdo, "YYYY-MM-DD HH:mm:ss");
                        var dia = moment(date).format("DD");
                        var mes = moment(date).format("MMMM");
                        var año = moment(date).format("YYYY");
                        var fecha = dia + " de " + mes + " del " + año;

                        me.fechaAcuerdo = fecha;

                    } else {

                        var date = moment(me.acuerdosReparatorios[i].fechaCelebracionAcuerdo, "YYYY-MM-DD HH:mm:ss");
                        var dia = moment(date).format("DD");
                        var mes = moment(date).format("MMMM");
                        var año = moment(date).format("YYYY");
                        var fecha = dia + " de " + mes + " del " + año;

                        me.fechaAcuerdo = me.fechaAcuerdo + ", " + fecha;
                    } 
                }


            }).catch(function(error) {
                if (error.response.status == 401) { 
                    me.e401 = true,
                    me.showpage = false
                } else if (error.response.status==403) {  
                    me.e403 = true
                    me.showpage = false 
                } else if (error.response.status == 404) {
                    me.$notify("El recuso no ha sido encontrado", 'error')
                } else {
                    me.$notify(error.message,'error')     
                } 
            }); 
        }, 
        cerrarexpediente () { 
            this.$store.state.idExpediente = null; 
            this.$store.state.idEnvio = null;
            this.$store.state.noExpediente = null;
            this.$store.state.tipoModulo = null;
            if (this.u_rol == 'Facilitador' || this.u_rol == "Notificador") {
                this.$router.push('./misexpedientes') 
            } else {
                this.$router.push('./expedientesaceptados') 
            } 
        }, 
        imprimir () {
            let me = this;         

            me.qrCode = ''

            me.docRemision = 'Reimpresión de registro de Conclusión'

            let fechaQR = new Date()

            me.vistaPreviaTF = false

            me.generarQR(me.docRemision,me.nuc,me.u_nombre,fechaQR,me.expedienteId)        
        },      
        cargartexto () {  

            let me = this;

            this.v_solicitantesL = "";
            for(var i=0; i < this.v_solicitantes.length; i++) {
                if (this.v_solicitantesL == "") {
                    this.v_solicitantesL = this.v_solicitantes[i].nombreCompleto;
                    
                    //Nueva propuesta de texto

                    this.textoSol = `
                        <p>
                            <strong>De la/el solicitante:</strong> La/el C.<strong>${this.v_solicitantes[i].nombreCompleto}</strong>, de nacionalidad <strong>${this.v_solicitantes[i].nacionalidad}, 
                            </strong> originaria/o de <strong>${this.v_solicitantes[i].entidadFederativa}</strong>, con domicilio <strong>${this.v_solicitantes[i].direccion}</strong>, 
                            de <strong>${this.v_solicitantes[i].edad}</strong> años de edad, por haber nacido el <strong>${this.v_solicitantes[i].fechaNacimiento}</strong>, de estado familiar 
                            <strong>${this.v_solicitantes[i].estadoCivil}</strong>, quien se desempeña como <strong>${this.v_solicitantes[i].ocupacion}</strong>, con grado de estudios de 
                            <strong>${this.v_solicitantes[i].nivelEstudio}</strong>, con registro de poblacion <strong>${this.v_solicitantes[i].curp}</strong> quien se identifica con credencial para votar 
                            con fotografía expedida por el <strong>Instituto Nacional Electoral</strong> con Clave de Elector <span style='background-color: rgb(230, 0, 0);'>
                            [Coloca la clave]</span> ,la cual coincide con los rasgos fisonómicos de quien la porta y que en este acto le es devuelta por ser de su utilidad, 
                            dejando en su lugar copia simple.
                        </p>
                        <br><br>`;
                } else {
                    this.v_solicitantesL = this.v_solicitantesL + ", " + this.v_solicitantes[i].nombreCompleto;

                    //Nueva propuesta de texto

                    this.textoSol = `${this.textoSol}
                        <p>
                            <strong>De la/el solicitante:</strong> La/el <strong>C. ${this.v_solicitantes[i].nombreCompleto}</strong>, de nacionalidad <strong>${this.v_solicitantes[i].nacionalidad}</strong>, 
                            originaria/o de <strong>${this.v_solicitantes[i].entidadFederativa}</strong>, con domicilio <strong>${this.v_solicitantes[i].direccion}</strong>, de <strong>${this.v_solicitantes[i].edad}</strong> 
                            años de edad, por haber nacido el <strong>${this.v_solicitantes[i].fechaNacimiento}</strong>, de estado familiar <strong>${this.v_solicitantes[i].estadoCivil}</strong>, 
                            quien se desempeña como <strong>${this.v_solicitantes[i].ocupacion}</strong>, con grado de estudios de <strong>${this.v_solicitantes[i].nivelEstudio}</strong>, 
                            con registro de poblacion <strong>${this.v_solicitantes[i].curp}</strong> quien se identifica con credencial para votar con fotografía expedida por el 
                            <strong>Instituto Nacional Electoral</strong> con Clave de Elector <span style='background-color: rgb(230, 0, 0);'>[Coloca la clave]</span> ,la cual coincide con los rasgos fisonómicos de 
                            quien la porta y que en este acto le es devuelta por ser de su utilidad, dejando en su lugar copia simple.
                        </p>
                        <br><br>`;
                } 
            }
            this.v_requeridosL = "";
            for(var i=0;i<this.v_requeridos.length;i++){
                if (this.v_requeridosL == "")
                {
                    this.v_requeridosL = this.v_requeridos[i].nombreCompleto;

                    //Nueva propuesta de texto

                    this.textoReq = `
                        <p>
                            <strong>De la/el requerido:</strong> La/el C.<strong>${this.v_requeridos[i].nombreCompleto}</strong>,  de nacionalidad <strong>${this.v_requeridos[i].nacionalidad}</strong>, originaria/o de 
                            <strong>${this.v_requeridos[i].entidadFederativa}</strong>, con domicilio <strong>${this.v_requeridos[i].direccion}</strong>, de <strong>${this.v_requeridos[i].edad}</strong> años de edad, 
                            por haber nacido el <strong>${this.v_requeridos[i].fechaNacimiento}</strong>, de estado familiar <strong>${this.v_requeridos[i].estadoCivil}</strong>, quien se desempeña como 
                            <strong>${this.v_requeridos[i].ocupacion}</strong>, con grado de estudios de <strong>${this.v_requeridos[i].nivelEstudio}</strong>, con registro de poblacion <strong>${this.v_requeridos[i].curp}</strong>, 
                            quien se identifica con credencial para votar con fotografía expedida por el <strong>Instituto Nacional Electoral</strong> con Clave de Elector <span style='background-color: rgb(230, 0, 0);'>[Coloca la clave]</span>, 
                            la cual coincide con los rasgos fisonómicos de quien la porta y que en este acto le es devuelta por ser de su utilidad, dejando en su lugar copia simple.
                        </p>
                        <br><br>`;
                } else {
                    this.v_requeridosL = this.v_requeridosL + ", " + this.v_requeridos[i].nombreCompleto;

                    this.textoReq = `${this.textoReq}
                        <p>
                            <strong>De la/el requerido:</strong> La/el C.<strong>${this.v_requeridos[i].nombreCompleto}</strong>, de nacionalidad <strong>${this.v_requeridos[i].nacionalidad}</strong>, 
                            originaria/o de <strong>${this.v_requeridos[i].entidadFederativa}</strong>, con domicilio <strong>${this.v_requeridos[i].direccion}</strong>, de <strong>${this.v_requeridos[i].edad}</strong> años 
                            de edad, por haber nacido el <strong>${this.v_requeridos[i].fechaNacimiento}</strong>, de estado familiar <strong>${this.v_requeridos[i].estadoCivil}</strong>, quien se desempeña 
                            como <strong>${this.v_requeridos[i].ocupacion}</strong>, con grado de estudios de <strong>${this.v_requeridos[i].nivelEstudio}</strong>, con registro de poblacion 
                            <strong>${this.v_requeridos[i].curp}</strong>, quien se identifica con credencial para votar con fotografía expedida por el
                            <strong>Instituto Nacional Electoral</strong> con Clave de Elector <span style='background-color: rgb(230, 0, 0);'>[Coloca la clave]</span> ,la cual coincide con los rasgos fisonómicos de 
                            quien la porta y que en este acto le es devuelta por ser de su utilidad, dejando en su lugar copia simple.
                        </p>
                        <br><br>`;
                }  
            } 
            var num2Let = require('numalet')();
            var dia = moment().format("DD");
            var diatext = NumberAsString(dia);
            var mes = moment().format('MMMM'); 
            var año = moment().format("YYYY"); 
            var añotext = NumberAsString(año);
            var hr = moment().format('h:mm a'); 
            var pdf_distrito = this.u_distrito;
            var pdf_dirsubproc = this.u_dirSubPro;
            var pdf_agencia = this.u_agencia;
            var pdf_usuario = this.u_nombre;
            var pdf_puesto = this.u_puesto;
            var pdf_modulo = this.u_modulo;  
            var fecha = dia + " de " + mes + " del " + año + ", " + hr   
            if (this.statusAR.value == 1) {
                this.asunto = "REGISTRO DE CONCLUSIÓN";
                this.v_statusGeneral = "Baja";
                this.v_textoAR = 
                    `<p>
                        En el Centro de Justicia Restaurativa Penal, ubicado en ${me.direccionAgencia}; ${me.telefonosAgencia} siendo las ${hr} del dia ${dia} (${diatext}) de 
                        ${mes} del año ${año} (${añotext}), en el expediente número <strong>${this.noExpediente}</strong>  correspondiente a los Mecanismos Alternativos" 
                        de Solución de Controversias en Materia Penal, solicitado por ${this.personasS.toLowerCase()} <strong>C. ${this.nombresSolicitantes}</strong> donde fue requerida(o) ${this.personasR.toLowerCase()} <strong>C. ${this.nombresRequeridos}.</strong>
                    </p>
                    <br><br>
                    <p>
                        Se asienta en el presente registro que en este momento se ${this.personasS == 'Los' ? `encuentran ${this.personasS.toLowerCase()} solicitantes` : `encuentra ${this.personasS.toLowerCase()} solicitante`} <strong>C. ${this.nombresSolicitantes}</strong> a la sesión número ${this.ultimaSesion} y no se encuentra 
                        presente el requerido, quien fue debidamente notificado, recibiendo la invitación de manera <span style='background-color: rgb(230, 0, 0);'>[¿De que manera?]</span>  
                        de quien manifiesta el notificador especializado que la invitación fue fijada en el <span style='background-color: rgb(230, 0, 0);'>[¿Donde fue fijada?]</span> 
                        de quien refiere el notificador especializado que no se ubicó <span style='background-color: rgb(230, 0, 0);'>[¿Que no se ubico?]</span> de quien manifiesta el 
                        notificador especializado que la invitación fue recibida por un familiar o conocido.
                        
                    </p>
                    <br>
                    <p>
                        Por lo que en este momento refiere ${this.personasS.toLowerCase()} <strong>C. ${this.nombresSolicitantes}.</strong> Que no es su deseo que se programe una fecha de sesión más, toda vez 
                        que el requerido no acudió a ninguna de las citas programadas. Solicitando la conclusión del presente expediente. Es por lo que en este momento se dejan a salvo 
                        sus derechos para que los haga valer en la vía e instancia legal correspondiente.
                    </p>
                    <br><br>
                    <p>
                        Lo anterior se asienta para su debido registro  y para los fines legales a que haya lugar.
                    </p>
                    <br><br><br>
                    <p>
                        Esto con fundamento en el artículo 4 fracción I y 8 fracción IV y 32 fracción I y II de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en 
                        Materia Penal..
                    </p>
                    <br><br><br>
                    Firma de conformidad`;
                    
            } else if (this.statusAR.value == 2) {
                this.asunto = "REGISTRO DE CONCLUSIÓN";
                this.v_statusGeneral = "Baja";
                this.v_textoAR = 
                    `<p>
                        En el Centro de Justicia Restaurativa Penal, ubicado en ${me.direccionAgencia}; ${me.telefonosAgencia} siendo las ${hr} del dia ${dia} (${diatext}) de 
                        ${mes} del año ${año} (${añotext}), en el expediente número <strong>${this.noExpediente}</strong>  correspondiente a los Mecanismos Alternativos 
                        de Solución de Controversias en Materia Penal, solicitado por ${this.personasS.toLowerCase()} <strong>C. ${this.nombresSolicitantes}</strong> donde fue requerida(o) ${this.personasR.toLowerCase()}<strong> C. ${this.nombresRequeridos}.</strong>
                    </p>
                    <br><br>
                    <p>
                        Se asienta en el presente registro que en este momento ${this.personasR == 'Los' ? `se encuentran ${this.personasR} requeridos` : `se encuentra ${this.personasR.toLowerCase()} requerido` } <strong>C. ${this.nombresRequeridos}</strong> a la sesión numero ${this.ultimaSesion} y no se encuentra 
                        presente el solicitante, quien fue debidamente notificado, recibiendo la invitación de manera <span style='background-color: rgb(230, 0, 0);'>[¿De que manera?]</span> 
                        de quien manifiesta el notificador especializado que la invitación fue fijada en el <span style='background-color: rgb(230, 0, 0);'>[¿Donde fue fijada?]</span> 
                        de quien refiere el notificador especializado que no se ubicó <span style='background-color: rgb(230, 0, 0);'>[¿Que no se ubico?]</span> de quien manifiesta el 
                        notificador especializado que la invitación fue recibida por un familiar o conocido.
                    </p>
                    <br>
                    <p>
                        Por lo que en este momento refiere ${this.personasR.toLowerCase()} <strong>C. ${this.nombresRequeridos}.</strong> Que no es su deseo que se programe una fecha de sesión más, toda vez 
                        que el requerido no acudió a ninguna de las citas programadas. Solicitando la conclusión del presente expediente. Es por lo que en este momento se dejan a salvo 
                        sus derechos para que los haga valer en la vía e instancia legal correspondiente.
                    </p>
                    <br><br>
                    <p>
                        Lo anterior se asienta para su debido registro  y para los fines legales a que haya lugar.
                    </p>
                    <br><br><br>
                    <p>
                        Esto con fundamento en el artículo 4 fracción I y 8 fracción IV y 32 fracción I y II de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal..
                    </p>
                    <br><br><br>
                    Firma de conformidad`;
            } else if (this.statusAR.value == 3) {
                this.asunto = "REGISTRO DE CONCLUSIÓN";
                this.v_statusGeneral = "Baja";
                this.v_textoAR = `
                    <p>
                        En el Centro de Justicia Restaurativa Penal, situado en Carretera México Pachuca kilómetro 84.5, Circuito Sector Primario sin número, 
                        Centro Cívico, Pachuca de Soto, Hidalgo; siendo las ${hr} del dia ${dia} (${diatext}) de ${mes} del año ${año} (${añotext}), 
                        dentro del expediente <strong>${this.noExpediente}</strong> solicitado por ${this.personasS.toLowerCase()} <strong>C. ${this.nombresSolicitantes}</strong> donde fue requerida(o) ${this.personasR.toLowerCase()} 
                        <strong>C. ${this.nombresRequeridos}</strong>, se hace registro que <span style='background-color: rgb(230, 0, 0);'>[CAMPOR LIBRE]</span>
                    </p>
                    <br><br>
                    <p>
                        Lo anterior con fundamento en el artículo 32 fracción VI de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal 
                        que se tiene por concluido el presente expediente lo que se asienta para debido registro
                    </p>
                    <br><br><br>`;
            } else if (this.statusAR.value == 4) {
                this.asunto = "REGISTRO DE CONCLUSIÓN";
                this.v_statusGeneral = "Baja";
                this.v_textoAR = 
                    `<p>
                        En el Centro de Justicia Restaurativa Penal, ubicado en ${me.direccionAgencia}; siendo las ${hr} del dia ${dia} (${diatext}) de 
                        ${mes} del año ${año} (${añotext}), en el expediente número <strong>${this.noExpediente}</strong> correspondiente a los Mecanismos Alternativos 
                        de Solución de Controversias en Materia Penal, solicitado por el <strong>C. ${this.v_solicitantesL}</strong> donde fue requerida (o) la (el) <strong>C. ${this.v_requeridosL}.</strong>
                    </p>
                    <br><br>
                    <p>
                        Se asienta en el presente registro que en este momento se encuentran ambos intervinientes a la sesión numero ${this.ultimaSesion}, de quienes a continuación se detallan sus datos generales:
                    </p>
                    <br><br>
                    ${this.textoSol} 
                    ${this.textoReq}
                    <p>
                        Por lo que  una vez que se les dieron a conocer los beneficios, bondades, ventajas y alcances con los que cuentan los Mecanismos Alternativos de Solución 
                        de Controversias en Materia Penal y haber llevado un dialogo de manera pacífica, manifiestan en este momento ambas intervinientes que no es su deseo celebrar 
                        acuerdo reparatorio alguno, toda vez que la/el <strong>C. ${this.v_solicitantesL}</strong> toda vez que las posiciones de ambas intervinientes son irreductibles.
                        Manifestando su deseo por concluir el presente expediente y dar seguimiento a su proceso penal. Derivado de lo anterior, en este momento se dejan a salvo los derechos 
                        de ambas intervinientes para que los hagan valer en la vía e instancia legal correspondiente.  Lo que se asienta para su debido registro con la finalidad 
                        de dejar el antecedente correspondiente a lo ocurrido en esta fecha de sesión.
                    </p>
                    <br><br><br>
                    <p>
                        Lo anterior de conformidad en los artículos 4 fracción l y 32 fracción l y III de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal.
                    </p>
                    <br><br><br>
                    De conformidad`;
            } else if (this.statusAR.value == 5) {
                this.asunto = "REGISTRO DE CONCLUSIÓN";
                this.v_statusGeneral = "Baja";
                this.v_textoAR = 
                    `<p>
                        En el Centro de Justicia Restaurativa Penal, ubicado en ${me.direccionAgencia}; siendo las ${hr} del dia ${dia} (${diatext}) de 
                        ${mes} del año ${año} (${añotext}), en el expediente número <strong>${this.noExpediente}</strong>  correspondiente a los Mecanismos Alternativos 
                        de Solución de Controversias en Materia Penal, solicitado por el <strong>C. ${this.v_solicitantesL}</strong> donde fue requerida (o) la (el) <strong> ${this.v_requeridosL}.</strong>
                    </p>
                    <br><br>
                    <p>
                        Se asienta en el presente registro que en este momento se encuentran ambos intervinientes a la sesión numero ${this.ultimaSesion}, de quienes a continuación 
                        se detallan sus datos generales:
                    </p>
                    <br><br>
                    ${this.textoSol}
                    ${this.textoReq}
                    <p>
                        Por lo que  una vez que se les dieron a conocer los beneficios, bondades, ventajas y alcances con los que cuentan los Mecanismos Alternativos de Solución 
                        de Controversias en Materia Penal y haber llevado un dialogo de manera pacífica, manifiestan en este momento ambas intervinientes que no es su deseo celebrar 
                        acuerdo reparatorio alguno,  toda vez que la/el <strong>C. ${this.v_solicitantesL}</strong> toda vez que las posiciones de ambas intervinientes es su voluntad...
                        <span style='background-color: rgb(230, 0, 0);'>[Es su voluntad ¿Que?]</span> 
                        Manifestando su deseo por concluir el presente expediente y dar seguimiento a su proceso penal. Derivado de lo anterior, en este momento se dejan a salvo los derechos 
                        de ambas intervinientes para que los hagan valer en la vía e instancia legal correspondiente.  Lo que se asienta para su debido registro con la finalidad 
                        de dejar el antecedente correspondiente a lo ocurrido en esta fecha de sesión.
                    </p>
                    <br><br><br>
                    <p>
                        Lo anterior de conformidad en los artículos 4 fracción l y 32 fracción l y III de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal.
                    </p>
                    <br><br><br>
                    De conformidad`;
            } else if (this.statusAR.value == 6) {
                this.asunto = "REGISTRO DE CONCLUSIÓN";
                this.v_statusGeneral = "Concluido";
                this.v_textoAR = `
                    <p>
                        En el Centro de Justicia Restaurativa Penal, situado en Carretera México Pachuca kilómetro 84.5, Circuito Sector Primario sin número, 
                        Centro Cívico, Pachuca de Soto, Hidalgo; siendo las ${hr} del dia ${dia} (${diatext}) de ${mes} del año ${año} (${añotext}), 
                        dentro del expediente <strong>${this.noExpediente}</strong> solicitado por la (el) <strong>C. ${this.v_solicitantesL}</strong> donde fue requerida (o) la (el) 
                        <strong>C. ${this.v_requeridosL}</strong>, se hace registro que <span style='background-color: rgb(230, 0, 0);'>[CAMPOR LIBRE]</span>
                    </p>
                    <br><br>
                    <p>
                        Lo anterior con fundamento en el artículo 32 fracción VI de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal 
                        que se tiene por concluido el presente expediente lo que se asienta para debido registro
                    </p>
                    <br><br><br>`;
            } else if (this.statusAR.value == 7) {
                this.asunto = "REGISTRO DE CONCLUSIÓN";
                this.v_statusGeneral = "Concluido";
                this.v_textoAR = 
                    `<p>
                        En el Centro de Justicia Restaurativa Penal, ubicado en ${me.direccionAgencia}; ${me.telefonosAgencia} siendo las ${hr} del dia ${dia} (${diatext}) de 
                        ${mes} del año ${año} (${añotext}), en el expediente número <strong>${this.noExpediente}</strong> correspondiente a los Mecanismos Alternativos 
                        de Solución de Controversias en Materia Penal, solicitado por el <strong>C. ${this.v_solicitantesL}</strong> donde fue requerida (o) la (el) <strong> C. ${this.v_requeridosL}.</strong>
                    </p>
                    <br><br>
                    <p>
                        Se hace costar que en este momento se encuentran presentes ambas intervinientes, con la finalidad de llevar a cabo el cumplimiento total a las 
                        obligaciones contraídas en la cláusula PRIMERA <span style='background-color: rgb(230, 0, 0);'>[¿Si es esa clausula?]</span> 
                        del acuerdo reparatorio que suscribieron en fecha ${this.fechaAcuerdo}. Por lo que en este momento la/el <strong>C. ${this.v_requeridosL}</strong> realiza el pago de $${this.montoPagarAR} 
                        a la <strong>C. ${this.v_solicitantesL}</strong>, quien recibe dicha cantidad a su entera satisfacción. Motivo por el cual refieren ambas intervinientes 
                        que se ha dado total y cabal cumplimiento al acuerdo reparatorio en comento, sin que quede cláusula alguna por cumplir. Solicitando la conclusión del presente 
                        expediente. Lo que se asienta para su debido registro con la finalidad de dejar el antecedente correspondiente.
                    </p>
                    <br><br>
                    <p>
                        Lo anterior con fundamento en los artículos, 35 y 36 fracción IV de la Ley Nacional Mecanismos Alternativos de Solución de Controversias en Materia Penal.
                    </p>
                    <br><br><br>
                    "Firman de Conformidad:`
            } else if (this.statusAR.value == 8) {
                this.asunto = "REGISTRO DE CONCLUSIÓN";
                this.v_statusGeneral = "Concluido";
                this.v_textoAR = 
                    `<p>
                        En el Centro de Justicia Restaurativa Penal, ubicado en ${me.direccionAgencia}; ${me.telefonosAgencia} siendo las ${hr} del dia ${dia} (${diatext}) de 
                        ${mes} del año ${año} (${añotext}). Se hace constar que se tiene por concluido el expediente número <strong>${this.noExpediente}</strong>, 
                        del procedimiento correspondiente a los Mecanismos Alternativos de Solución de Controversias en Materia Penal, solicitado por la/el <strong>C. ${this.v_solicitantesL}</strong> 
                        donde fue requerida (o) la (el) <strong>C. ${this.v_requeridosL}</strong>, toda vez que en esta misma fecha, los intervinientes celebraron acuerdo reparatorio de cumplimiento inmediato, 
                        sin que quede clausula pendiente por cumplir, manifestando el solicitante darse por totalmente reparado. Es por ello que solicitan la conclusión del presente expediente.
                    </p>
                    <br><br>
                    <p>
                        Es por lo anterior y en virtud de que no queda pendiente alguno por cumplir y con fundamento en lo establecido en el artículo 33 y 34 de la Ley 
                        Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal que se tiene por concluido el presente expediente, lo que se asienta para su debido registro.
                    </p>
                    <br><br><br>`
            } else if (this.statusAR.value == 9) {
                this.asunto = "REGISTRO DE CONCLUSIÓN";
                this.v_statusGeneral = "Baja";
                this.v_textoAR = 
                    `<p>
                        En el Centro de Justicia Restaurativa Penal, ubicado en ${me.direccionAgencia}; siendo las ${hr} del dia ${dia} (${diatext}) de 
                        ${mes} del año ${año} (${añotext}), en el expediente número <strong>${this.noExpediente}</strong> correspondiente a los Mecanismos Alternativos 
                        de Solución de Controversias en Materia Penal, solicitado por el <strong>C. ${this.v_solicitantesL}</strong> donde fue requerida (o) la (el) <strong>C. ${this.v_requeridosL}.</strong>
                    </p>
                    <br><br>
                    <p>
                        Se asienta en el presente registro que en este momento se encuentran ambos intervinientes a la sesión numero ${this.ultimaSesion}, de quienes a continuación 
                        se detallan sus datos generales:
                    </p>
                    <br><br>
                    ${this.textoSol}
                    ${this.textoReq}
                    <p>
                        Por lo que  una vez que se les dieron a conocer los beneficios, bondades, ventajas y alcances con los que cuentan los Mecanismos Alternativos de Solución 
                        de Controversias en Materia Penal y haber llevado un dialogo de manera pacífica, manifiestan en este momento ambas intervinientes que no es su deseo celebrar 
                        acuerdo reparatorio alguno,  toda vez que la/el <strong>C. ${this.v_requeridosL}</strong> toda vez que la posicion del requerido es su voluntad...<span style='background-color: rgb(230, 0, 0);'>[Es su voluntad ¿Que?]</span> 
                        Manifestando su deseo por concluir el presente expediente y dar seguimiento a su proceso penal. Derivado de lo anterior, en este momento se dejan a salvo los derechos 
                        de ambas intervinientes para que los hagan valer en la vía e instancia legal correspondiente.  Lo que se asienta para su debido registro con la finalidad 
                        de dejar el antecedente correspondiente a lo ocurrido en esta fecha de sesión.
                    </p>
                    <br><br><br>
                    <p>
                        Lo anterior de conformidad en los artículos 4 fracción l y 32 fracción l y III de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal .
                    </p>
                    <br><br><br>
                    De conformidad`;  
            } else if (this.statusAR.value == 10) {
                this.asunto = "REGISTRO DE CONCLUSIÓN";
                this.v_statusGeneral = "Baja";
                this.v_textoAR = 
                    `<p>
                        En el Centro de Justicia Restaurativa Penal, ubicado en ${me.direccionAgencia}; siendo las ${hr} del dia ${dia} (${diatext}) de 
                        ${mes} del año ${año} (${añotext}), en el expediente número <strong>${this.noExpediente}</strong> correspondiente a los Mecanismos Alternativos 
                        de Solución de Controversias en Materia Penal, solicitado por el <strong>C. ${this.v_solicitantesL}</strong> donde fue requerida (o) la (el) <strong> C. ${this.v_requeridosL}.</strong>}
                    </p>
                    <br><br>
                    <p>
                        Se asienta en el presente registro que en este momento se encuentran ambos intervinientes a la sesión numero ${this.ultimaSesion}, de quienes a continuación 
                        se detallan sus datos generales:
                    </p>
                    <br><br>
                    ${this.textoSol}
                    ${this.textoReq}
                    <p>
                        Por lo que  una vez que se les dieron a conocer los beneficios, bondades, ventajas y alcances con los que cuentan los Mecanismos Alternativos de Solución 
                        de Controversias en Materia Penal y haber llevado un dialogo de manera pacífica, manifiestan en este momento ambas intervinientes que no es su deseo celebrar 
                        acuerdo reparatorio alguno, toda vez que la/el <strong>C. ${this.v_solicitantesL}</strong> toda vez que la posicion del solicitante es su voluntad..
                        <span style='background-color: rgb(230, 0, 0);'>[Es su voluntad ¿Que?]</span>
                        Manifestando su deseo por concluir el presente expediente y dar seguimiento a su proceso penal. Derivado de lo anterior, en este momento se dejan a salvo los derechos 
                        de ambas intervinientes para que los hagan valer en la vía e instancia legal correspondiente. Lo que se asienta para su debido registro con la finalidad 
                        de dejar el antecedente correspondiente a lo ocurrido en esta fecha de sesión.
                    </p>
                    <br><br><br>
                    <p>
                        Lo anterior de conformidad en los artículos 4 fracción l y 32 fracción l y III de la Ley Nacional de Mecanismos Alternativos de Solución   de Controversias en Materia Penal.
                    </p>
                    <br><br><br>
                    De conformidad`;
            }
        },
        listarsolicitantes () {
            let me = this; 
            let header = { "Authorization" : "Bearer " + this.$store.state.token };
            let configuracion = { headers : header }; 
            me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/ListarSolicitantes/' + me.envioId, configuracion).then(function(response) { 
                me.v_solicitantes = response.data;  
            }).catch(function(error) {
                me.$notify(error.message,'error')    
            });     
        },
        listarSolicitantesRequeridos(SolReq) 
        {
            let me = this; 
            let header = { "Authorization" : "Bearer " + this.$store.state.token };
            let configuracion = { headers : header };   
            me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/ListarSolicitantesRequeridosDistint/' + me.envioId + '/' + SolReq, configuracion)
                .then(function (response) { 
                  me.$justiciarestaurativa.get(`api/SolicitanteRequeridoes/ListarNomConjuntos/${me.envioId}`, configuracion)
                        .then(responseNom => {                                                        
                            let personasGenerales = []
                            responseNom.data.map(pp => {
                                let nomRequerido = pp.nombreR.split(';')
                                let idRequerido = pp.requeridosC.split(';')
                                let nomSolicitante = pp.nombreS.split(';')
                                let idSolicitante = pp.solicitadosC.split(';')

                                idRequerido.map((idd, ind) => {
                                    if (personasGenerales.length != 0) {
                                        let sts = personasGenerales.filter(pg => pg.id.trim() == idd)

                                        if (sts.length == 0) {
                                            personasGenerales.push({id: idd.trim(), nombreC: nomRequerido[ind].trim()})
                                        }
                                    } else {
                                        personasGenerales.push({id: idd.trim(), nombreC: nomRequerido[ind].trim()})
                                    }
                                })

                                idSolicitante.map((idd2, ind2) => {
                                    if (personasGenerales.length != 0) {
                                        let sts2 = personasGenerales.filter(pg2 => pg2.id.trim() == idd2)

                                        if (sts2.length == 0) {
                                            personasGenerales.push({id: idd2.trim(), nombreC: nomSolicitante[ind2].trim()})
                                        }
                                    } else {
                                        personasGenerales.push({id: idd2.trim(), nombreC: nomSolicitante[ind2].trim()})
                                    }
                                })
                            })                                                        
                        if (SolReq == "Requerido") {                            
                            me.v_requeridos = response.data;
                            me.v_requeridos.map(rr => {
                                let auxR = personasGenerales.filter(ppR => ppR.id == rr.personaId)

                                rr.nombreCompleto = auxR[0].nombreC
                            })
                        } else {                            
                            me.v_solicitantes = response.data;
                            me.v_solicitantes.map(ss => {
                                let auxR = personasGenerales.filter(ppR => ppR.id == ss.personaId)

                                ss.nombreCompleto = auxR[0].nombreC
                            })
                        }
                    })                            
                })
                .catch(function (error) {
                    me.$notify(error.message, 'error') 
                });
        }, 
        crearPdf() {
            let me = this
            var pdfMake = require('pdfmake/build/pdfmake.js');
            var htmlToPdfmake = require("html-to-pdfmake");
            var logo3 = this.logo3;
            var logo4 = this.logo4;
            var diragencia = this.direccionAgencia;
            var telagencia= this.telefonosAgencia;
            var num2Let = require('numalet')();
            var dia = moment().format("DD");
            var diatext = num2Let(dia);
            var mes = moment().format('MMMM'); 
            var año = moment().format("YYYY"); 
            var añotext = num2Let(año);
            var hr = moment().format('h:mm a'); 
            var pdf_distrito = this.u_distrito;
            var pdf_dirsubproc = this.u_dirSubPro;
            var pdf_agencia = this.u_agencia;
            var pdf_usuario = this.u_nombre;
            var pdf_puesto = this.u_puesto;
            var pdf_modulo = this.u_modulo;  
            var fecha = dia + " de " + mes + " del " + año + ", " + hr  
            var html_texto  = htmlToPdfmake( 
                this.v_textoAR
            );
            var posicion = "";
            var bodyDataSolicitantesLineal = []; 
            var bodyDataRequeridosLineal = []; 

            if (this.statusAR.value == 1)
                posicion = "A"
            else if (this.statusAR.value == 2) 
                posicion = "B"
            else if (this.statusAR.value == 4) 
                posicion = "C"
            else if (this.statusAR.value == 5) 
                posicion = "C"
            else if (this.statusAR.value == 6) 
                posicion = "B"
            else if (this.statusAR.value == 7) 
                posicion = "C"
            else if (this.statusAR.value == 8) 
                posicion = "C"
            else if (this.statusAR.value == 9) 
                posicion = "C"
            else if (this.statusAR.value == 10) 
                posicion = "C"            
                        
            if (posicion == "A") {
                var sourceDataSL = this.v_solicitantes;
                sourceDataSL.forEach(function(sourceRow) {
                    var dataRow = []; 
                    bodyDataSolicitantesLineal.push(dataRow)
                    dataRow.push( '\n\n\n\n\n\n' + '__________________________________________\n' + sourceRow.nombreCompleto);   
                });
            } else if (posicion == "B") {
                var sourceDataRL = this.v_requeridos;
                sourceDataRL.forEach(function(sourceRow) {
                    var dataRow = []; 
                    bodyDataRequeridosLineal.push(dataRow)
                    dataRow.push('\n\n\n\n\n\n' + '__________________________________________\n' + sourceRow.nombreCompleto);   
                });
            } else if  (posicion == "C") {
                var sourceDataSL = this.v_solicitantes;
                sourceDataSL.forEach(function(sourceRow) {
                    var dataRow = []; 
                    bodyDataSolicitantesLineal.push(dataRow)
                    dataRow.push( '\n\n\n\n\n\n' + '__________________________________________\n' + sourceRow.nombreCompleto);   
                });
                var sourceDataRL = this.v_requeridos;
                sourceDataRL.forEach(function(sourceRow) {
                    var dataRow = []; 
                    bodyDataRequeridosLineal.push(dataRow)
                    dataRow.push('\n\n\n\n\n\n' + '__________________________________________\n' + sourceRow.nombreCompleto);   
                });
            }
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
                                text: diragencia + "\n" + telagencia + "\n" + 'www.hidalgo.gob.mx',
                                style: 'footertext',
                                margin: [312,12,72,0],
                                alignment:'right',
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
                        text: pdf_dirsubproc + "\n" + pdf_agencia,
                        style: 'headertext',
                        absolutePosition: { x: 85, y: 95 },
                    }, 
                    {
                        text: this.asunto,
                        style: 'titulo'
                    },
                    '\n\n',
                    {
                        text: html_texto,
                        style: 'texto'
                    },
                    '\n\n\n\n',
                    {
                        style: 'table',
                        table: posicion == 'A'
                            ? {
                                headerRows: 1,
                                widths: ['*'], 
                                body: [
                                    [{ text: "",   fontSize: 10, bold: true, alignment: 'center'}], 
                                    [bodyDataSolicitantesLineal],
                                ]
                            }
                            : posicion == 'B'
                                ? {
                                    headerRows: 1,
                                    widths: ['*'], 
                                    body: [
                                        [{ text: "",  fontSize: 10, bold: true, alignment: 'center'}], 
                                        [bodyDataRequeridosLineal],
                                    ]
                                } 
                                : {
                                    headerRows: 1,
                                    widths: ['*','*'], 
                                    body: [
                                        [{ text: "",   fontSize: 10, bold: true, alignment: 'center'}, { text: "",  fontSize: 10, bold: true, alignment: 'center'}], 
                                        [bodyDataSolicitantesLineal, bodyDataRequeridosLineal],
                                    ]
                                },
                        layout: 'noBorders'
                    },        
                    '\n\n\n\n\n',
                    {
                        text:  pdf_usuario + '\n' + pdf_puesto  + '\n'  +  'ADSCRITO A LA ' + pdf_agencia.toUpperCase() + '\n\n\n\n\n\n\n\n\n\n', 
                        style: 'ampo',
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
                    subtitulo: {
                        fontSize: 11,
                        bold: true, 
                    },
                    headertext: {
                        fontSize: 10,
                        bold: true,
                        alignment: 'left',
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
                    ampo:{
                        fontSize: 10, 
                        bold: true,
                        alignment: 'center',
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
                }
            }
            return dd;          
        }, 
        mostrarpdf() {
            let me = this

            me.qrCode = ''

            me.docRemision = 'Registro de Conclusión'

            let fechaQR = new Date()

            me.vistaPreviaTF = true

            me.generarQR(me.docRemision,me.nuc,me.u_nombre,fechaQR,me.expedienteId)
        },   
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
                me.$notify("Error al intentar crear el código QR", 'error')
            }
        },
    }       
} 
</script>