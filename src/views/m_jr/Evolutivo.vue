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
        <v-flex>
            <v-toolbar flat  >
                    <v-toolbar-title class="font-weight-regular" >Evolutivo.</v-toolbar-title>
                    
                    <v-divider class="mx-2" inset vertical></v-divider>
                    
                    <v-spacer></v-spacer>
                
                    <v-spacer></v-spacer>
                    <v-flex xs12 sm6 md3> 

                    </v-flex>      
            </v-toolbar>
            
              <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
     
       
      <v-flex  xs4>
        <v-card  >
          <v-card-text class="px-0">
              <h2>Productividad {{anoantepenultimo}}</h2>
              <canvas id="myChartP1" width="400" height="300"></canvas>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex  xs4>
        <v-card  >
          <v-card-text class="px-0">
             <h2>Productividad {{anopenultimo}}</h2>
              <canvas id="myChartP2" width="400" height="300"></canvas>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex  xs4>
        <v-card  >
          <v-card-text class="px-0">
             <h2>Productividad {{anoactual}}</h2>
              <canvas id="myChartP3" width="400" height="300"></canvas>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card  >
                
          <v-card-text class="px-0">
             <h2>Evolutivo</h2>
              <canvas id="myChartP4"  width="800"   height="250"></canvas>
          </v-card-text>
        </v-card>
      </v-flex>
       <v-flex xs12>
        <v-card>
          <v-card-text class="px-0">
              
          </v-card-text>
        </v-card>
      </v-flex>
       
    </v-layout>
  </v-container>
        </v-flex>
       
      
      </v-layout> 
</template>
<script>

import axios from 'axios'  
import moment from 'moment'
import 'moment/locale/es'; 
import { error } from 'util';
import Chart from 'chart.js'
//** COMPONENTES */
import n401 from '../../components/m_jr/401'
import n403 from '../../components/m_jr/403' 
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
 

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
 
pdfMake.vfs = pdfFonts.vfs;

export default {   
   components: {  
                    n401,
                    n403
                }, 
    data(){
        return{
            e401:false, 
            e403:false,
            showpage:true,  
               //********************************************************** */ 
            // VARIABLES PARA DEL STORE
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
            //********************************** */
            logo1 :'',
            logo2:'',
            direccionAgencia:'',
            telefonosAgencia:'', 
            //********************************** */
            anoactual:'',
            anopenultimo:'',
            anoantepenultimo:'',
            //********************************** */
            registrados1:[],
            acuerdos1:[],  
            totalRegistrados1:[],
            totalAcuerdos1:[], 
            unionArray1:[], 
            etiqueta1:[],
            //********************************** */
            registrados2:[],
            acuerdos2:[],  
            totalRegistrados2:[],
            totalAcuerdos2:[], 
            unionArray2:[], 
            etiqueta2:[],
            //********************************** */
            registrados3:[],
            acuerdos3:[],  
            totalRegistrados3:[],
            totalAcuerdos3:[], 
            unionArray3:[], 
            etiqueta3:[],
            //********************************** */ 
            unionEvolutivo32:[],
            etiqueta32:[],
            tr3:[],
            ta3:[],
            tr2:[],
            ta2:[],
            tr1:[],
            ta1:[], 
            //********************************** */
            
              
         
   




        }
    },
    computed:{
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
    mounted(){
          if (!localStorage.getItem('pageReloaded')) {
            localStorage.setItem('pageReloaded', 'true');
            window.location.reload();
          } else {
            localStorage.removeItem('pageReloaded');
          }
        },
    created(){
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
        let me =this;
        //*********************************************** */ 
        me.u_iddistrito=me.$store.state.usuario.iddistrito;
        me.u_distrito=me.$store.state.usuario.distrito;
        me.u_dirSubPro=me.$store.state.usuario.dirSubProc;
        me.u_idagencia=me.$store.state.usuario.idagencia;
        me.u_agencia=me.$store.state.usuario.agenciax;
        me.u_idmoduloservicio=me.$store.state.usuario.idmoduloservicio;
        me.u_modulo=me.$store.state.usuario.modulo;
        me.u_idusuario=me.$store.state.usuario.idusuario;
        me.u_nombre=me.$store.state.usuario.usuario;
        me.u_clave=me.$store.state.usuario.clave;
        me.u_rol=me.$store.state.usuario.rol;
        me.u_puesto=me.$store.state.usuario.puesto;
        me.u_email=me.$store.state.usuario.email;
        //*********************************************** */
      
        //*********************************************** */ 
        me.listarLogo();
        me.informacionagencia();  


 
        
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
        informacionagencia(){
              let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia, configuracion).then(function(response){
                me.direccionAgencia=response.data.direccion;
                me.telefonosAgencia= response.data.telefono;
            }).catch(function(error){
                me.$notify('Error al intentar leer la informacion de agencia!!!','error')   
            });
        },  
        //******************************************************************************* */
        //     ANTE PENULTIMO AÑO
        //******************************************************************************* */
        getAll1(){
          let me=this; 
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header}; 

          let URL1 = 'api/AsignacionEnvios/ContadorRegistrados/'+ me.anoantepenultimo
          let URL2 = 'api/AcuerdoReparatorios/ContadorRegistrados/'+ me.anoantepenultimo

          const promise1 = me.$justiciarestaurativa.get(URL1);
          const promise2 = me.$justiciarestaurativa.get(URL2); 

          Promise.all([promise1, promise2], configuracion).then(function(values) {
             me.registrados1= (values[0].data);
             me.acuerdos1= (values[1].data); 
             me.fucionarArray1();
              
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
        fucionarArray1(){
           let me = this;
           let valor2 = 0;
           for(var i=0;i<me.registrados1.length;i++){ 
                valor2 = me.encuentra1(me.registrados1[i].etiqueta);
                if (valor2 == undefined)
                {
                  valor2 = 0;
                }
                me.unionArray1.push(
                        {etiqueta: me.registrados1[i].etiqueta,
                        valor1:me.registrados1[i].valor,
                        valor2:valor2 }
                );              
            }
            me.loadGrafica1();
        },
        encuentra1(etiqueta){ 
          let me = this;
          let  valor = 0;
          for(var i=0;i<me.acuerdos1.length;i++){
                if (me.acuerdos1[i].etiqueta==etiqueta){
                     valor = me.acuerdos1[i].valor; 
                     return  valor; 
                 
                }    
          }
        },
        loadGrafica1(){   
          let me = this;
              let mesn1=''; 
              me.unionArray1.map(function(x){ 
              switch(parseInt(x.etiqueta)){
                case 1:
                  mesn1='Ene';
                  break;
                case 2:
                  mesn1='Feb';
                  break;
                case 3:
                  mesn1='Mar';
                  break;
                case 4:
                  mesn1='Abr';
                  break;
                case 5:
                  mesn1='May';
                  break;
                case 6:
                  mesn1='Jun';
                  break;
                case 7:
                  mesn1='Jul';
                  break;
                case 8:
                  mesn1='Ago';
                  break;
                case 9:
                  mesn1='Sep';
                  break;
                case 10:
                  mesn1='Oct';
                  break;
                case 11:
                  mesn1='Nov';
                  break;
                case 12:
                  mesn1='Dec';
                  break;
              }
              me.etiqueta1.push(mesn1);
              me.totalRegistrados1.push(x.valor1);
              me.totalAcuerdos1.push(x.valor2)
             
             
            });
            
 

            var ctx = document.getElementById('myChartP1');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: me.etiqueta1,
                    datasets: [{
                        label: 'Registrados',
                        data: me.totalRegistrados1,
                        backgroundColor: [
                            'rgba(173,226,249, 0.7)',  
                            'rgba(173,226,249, 0.7)',  
                            'rgba(173,226,249, 0.7)',  
                            'rgba(173,226,249, 0.7)',  
                            'rgba(173,226,249, 0.7)',  
                            'rgba(173,226,249, 0.7)',  
                            'rgba(173,226,249, 0.7)',  
                            'rgba(173,226,249, 0.7)',  
                            'rgba(173,226,249, 0.7)',  
                            'rgba(173,226,249, 0.7)',  
                            'rgba(173,226,249, 0.7)',  
                            'rgba(173,226,249, 0.7)',   
                        ],  
                    },
                    {
                        label: 'Acuerdos',
                        data: me.totalAcuerdos1,
                        backgroundColor: [
                            'rgba(20,171,239, 0.9)',
                            'rgba(20,171,239, 0.9)',
                            'rgba(20,171,239, 0.9)',
                            'rgba(20,171,239, 0.9)',
                            'rgba(20,171,239, 0.9)',
                            'rgba(20,171,239, 0.9)',
                            'rgba(20,171,239, 0.9)',
                            'rgba(20,171,239, 0.9)',
                            'rgba(20,171,239, 0.9)',
                            'rgba(20,171,239, 0.9)',
                            'rgba(20,171,239, 0.9)',
                            'rgba(20,171,239, 0.9)',
                        ],  
                    }]
                },
                options: {
                    
                     layout:{
                        padding:{
                            left:30,
                            right:30,
                            top:30,
                            bottom:30,
                        }
                    },
                    legend:{
                        display:true, 
                       
                    },
                    tooltips: {
                        enabled: true,
                        mode: 'single',
                        callbacks: {
                            
                            
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        },
        //******************************************************************************* */
        //      PENULTIMO AÑO
        //******************************************************************************* */
        getAll2(){
          let me=this; 
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header}; 

          let URL1 = 'api/AsignacionEnvios/ContadorRegistrados/'+ me.anopenultimo
          let URL2 = 'api/AcuerdoReparatorios/ContadorRegistrados/'+ me.anopenultimo

          const promise1 = me.$justiciarestaurativa.get(URL1);
          const promise2 = me.$justiciarestaurativa.get(URL2); 

          Promise.all([promise1, promise2], configuracion).then(function(values) {
             me.registrados2= (values[0].data);
             me.acuerdos2= (values[1].data); 
             me.fucionarArray2();
              
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
        fucionarArray2(){
           let me = this;
           let valor2 = 0;
           for(var i=0;i<me.registrados2.length;i++){ 
                valor2 = me.encuentra2(me.registrados2[i].etiqueta);
                if (valor2 == undefined)
                {
                  valor2 = 0;
                }
                me.unionArray2.push(
                        {etiqueta: me.registrados2[i].etiqueta,
                        valor1:me.registrados2[i].valor,
                        valor2:valor2 }
                );              
            }
            me.loadGrafica2();
        },
        encuentra2(etiqueta){ 
          let me = this;
          let  valor = 0;
          for(var i=0;i<me.acuerdos2.length;i++){
                if (me.acuerdos2[i].etiqueta==etiqueta){
                     valor = me.acuerdos2[i].valor; 
                     return  valor; 
                 
                }    
          }
        },
        loadGrafica2(){   
          let me = this;
              let mesn1=''; 
              me.unionArray2.map(function(x){ 
              switch(parseInt(x.etiqueta)){
                case 1:
                  mesn1='Ene';
                  break;
                case 2:
                  mesn1='Feb';
                  break;
                case 3:
                  mesn1='Mar';
                  break;
                case 4:
                  mesn1='Abr';
                  break;
                case 5:
                  mesn1='May';
                  break;
                case 6:
                  mesn1='Jun';
                  break;
                case 7:
                  mesn1='Jul';
                  break;
                case 8:
                  mesn1='Ago';
                  break;
                case 9:
                  mesn1='Sep';
                  break;
                case 10:
                  mesn1='Oct';
                  break;
                case 11:
                  mesn1='Nov';
                  break;
                case 12:
                  mesn1='Dec';
                  break;
              }
              me.etiqueta2.push(mesn1);
              me.totalRegistrados2.push(x.valor1);
              me.totalAcuerdos2.push(x.valor2)
             
             
            });
            
 

            var ctx = document.getElementById('myChartP2');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: me.etiqueta2,
                    datasets: [{
                        label: 'Registrados',
                        data: me.totalRegistrados2,
                        backgroundColor: [
                          'rgba(250,191,97, 0.7)',  
                          'rgba(250,191,97, 0.7)',  
                          'rgba(250,191,97, 0.7)',    
                          'rgba(250,191,97, 0.7)', 
                          'rgba(250,191,97, 0.7)', 
                          'rgba(250,191,97, 0.7)', 
                          'rgba(250,191,97, 0.7)', 
                          'rgba(250,191,97, 0.7)', 
                          'rgba(250,191,97, 0.7)', 
                          'rgba(250,191,97, 0.7)', 
                          'rgba(250,191,97, 0.7)', 
                          'rgba(250,191,97, 0.7)', 
                        ],  
                    },
                    {
                        label: 'Acuerdos',
                        data: me.totalAcuerdos2,
                        backgroundColor: [
                            'rgba(252,154,0, 0.9)',
                            'rgba(252,154,0, 0.9)',
                            'rgba(252,154,0, 0.9)',
                            'rgba(252,154,0, 0.9)',
                            'rgba(252,154,0, 0.9)',
                            'rgba(252,154,0, 0.9)',
                            'rgba(252,154,0, 0.9)',
                            'rgba(252,154,0, 0.9)',
                            'rgba(252,154,0, 0.9)',
                            'rgba(252,154,0, 0.9)',
                            'rgba(252,154,0, 0.9)',
                            'rgba(252,154,0, 0.9)',
                        ],  
                    }]
                },
                options: {
                    
                     layout:{
                        padding:{
                            left:30,
                            right:30,
                            top:30,
                            bottom:30,
                        }
                    },
                    legend:{
                        display:true, 
                       
                    },
                    tooltips: {
                        enabled: true,
                        mode: 'single',
                        callbacks: {
                            
                            
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        },
        //******************************************************************************* */
        //      AÑO ACTUAL
        //******************************************************************************* */
        getAll3(){
          let me=this; 
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header}; 

          let URL1 = 'api/AsignacionEnvios/ContadorRegistrados/'+ me.anoactual
          let URL2 = 'api/AcuerdoReparatorios/ContadorRegistrados/'+ me.anoactual

          const promise1 = me.$justiciarestaurativa.get(URL1);
          const promise2 = me.$justiciarestaurativa.get(URL2); 

          Promise.all([promise1, promise2], configuracion).then(function(values) {
             me.registrados3= (values[0].data);
             me.acuerdos3= (values[1].data); 
             me.fucionarArray3();
             me.fucionarArray32();
              
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
        fucionarArray3(){
           let me = this;
           let valor2 = 0;
           for(var i=0;i<me.registrados3.length;i++){ 
                valor2 = me.encuentra3(me.registrados3[i].etiqueta);
                if (valor2 == undefined)
                {
                  valor2 = 0;
                }
                me.unionArray3.push(
                        {etiqueta: me.registrados3[i].etiqueta,
                        valor1:me.registrados3[i].valor,
                        valor2:valor2 }
                );              
            }
            me.loadGrafica3();
            
        },
        encuentra3(etiqueta){ 
          let me = this;
          let  valor = 0;
          for(var i=0;i<me.acuerdos3.length;i++){
                if (me.acuerdos3[i].etiqueta==etiqueta){
                     valor = me.acuerdos3[i].valor; 
                     return  valor; 
                 
                }    
          }
        },
        loadGrafica3(){   
          
     
            let me = this;
            
            let mesn1=''; 
            me.unionArray3.map(function(x){ 
            switch(parseInt(x.etiqueta)){
              case 1:
                mesn1='Ene';
                break;
              case 2:
                mesn1='Feb';
                break;
              case 3:
                mesn1='Mar';
                break;
              case 4:
                mesn1='Abr';
                break;
              case 5:
                mesn1='May';
                break;
              case 6:
                mesn1='Jun';
                break;
              case 7:
                mesn1='Jul';
                break;
              case 8:
                mesn1='Ago';
                break;
              case 9:
                mesn1='Sep';
                break;
              case 10:
                mesn1='Oct';
                break;
              case 11:
                mesn1='Nov';
                break;
              case 12:
                mesn1='Dec';
                break;
            }
            me.etiqueta3.push(mesn1);
            me.totalRegistrados3.push(x.valor1);
            me.totalAcuerdos3.push(x.valor2)
            
            
          });
          


          var ctx = document.getElementById('myChartP3');
          var myChart = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: me.etiqueta3,
                  datasets: [{
                      label: 'Registrados',
                      data: me.totalRegistrados3,
                      backgroundColor: [
                        'rgba(162,223,110, 0.7)',  
                        'rgba(162,223,110, 0.7)',
                        'rgba(162,223,110, 0.7)',
                        'rgba(162,223,110, 0.7)',  
                        'rgba(162,223,110, 0.7)',
                        'rgba(162,223,110, 0.7)',
                        'rgba(162,223,110, 0.7)',  
                        'rgba(162,223,110, 0.7)',
                        'rgba(162,223,110, 0.7)',
                        'rgba(162,223,110, 0.7)',  
                        'rgba(162,223,110, 0.7)',
                        'rgba(162,223,110, 0.7)',
                          
                      ],  
                  },
                  {
                      label: 'Acuerdos',
                      data: me.totalAcuerdos3,
                      backgroundColor: [
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          
                      ],  
                  }]
              },
              options: {
                  
                    layout:{
                      padding:{
                          left:30,
                          right:30,
                          top:30,
                          bottom:30,
                      }
                  },
                  legend:{
                      display:true, 
                      
                  },
                  tooltips: {
                      enabled: true,
                      mode: 'single',
                      callbacks: {
                          
                          
                      }
                  },
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                      }]
                  }
              }
          });
        },
        //******************************************************************************* */
        fucionarArray32(){
           let me = this;
           let valores32 = [];
           var valorR32= 0;
           var valorA32=0;
           let valores321 = [];
           var valorR321= 0;
           var valorA321=0;

           for(var i=0;i<me.unionArray3.length;i++){  
             //************************************************************ */
                valores32 = me.encuentra32(me.unionArray3[i].etiqueta);
                if (valores32 == undefined)
                {
                  valorR32=0;
                  valorA32=0;
                }
                else{
                  valorR32=valores32.valorR;
                  valorA32= valores32.valorA;
                } 
                //************************************************************ */
                valores321 = me.encuentra321(me.unionArray3[i].etiqueta);
                if (valores321 == undefined)
                {
                  valorR321=0;
                  valorA321=0;
                }
                else{
                  valorR321=valores321.valorR;
                  valorA321= valores321.valorA;
                }
                //************************************************************ */
                me.unionEvolutivo32.push(
                  
                    {
                      etiqueta: me.unionArray3[i].etiqueta,
                      vr3:me.unionArray3[i].valor1,
                      va3:me.unionArray3[i].valor2, 
                      vr2:valorR32,
                      va2:valorA32,
                      vr1:valorR321,
                      va1:valorA321,
                      
                    }
                );              
            }
            me.loadEvolutivo();
           
            
        },
        encuentra32(etiqueta){  
          let me = this;
          let valorR = 0;
          let valorA= 0;
      
          for(var i=0;i<me.unionArray2.length;i++){
                if (me.unionArray2[i].etiqueta==etiqueta){
                     valorR = me.unionArray2[i].valor1; 
                     valorA= me.unionArray2[i].valor2;
                     return new Object({valorR, valorA}); 
                 
                }    
          }
        },
        encuentra321(etiqueta){  
          let me = this;
          let valorR = 0;
          let valorA= 0; 
          for(var i=0;i<me.unionArray1.length;i++){
                if (me.unionArray1[i].etiqueta==etiqueta){
                     valorR= me.unionArray1[i].valor1; 
                     valorA= me.unionArray1[i].valor2;
                     return new Object({valorR, valorA}); 
                 
                }    
          }
        },

        
        loadEvolutivo(){
          let me = this;
           let mesn1=''; 
            me.unionEvolutivo32.map(function(x){ 
            switch(parseInt(x.etiqueta)){
              case 1:
                mesn1='Ene';
                break;
              case 2:
                mesn1='Feb';
                break;
              case 3:
                mesn1='Mar';
                break;
              case 4:
                mesn1='Abr';
                break;
              case 5:
                mesn1='May';
                break;
              case 6:
                mesn1='Jun';
                break;
              case 7:
                mesn1='Jul';
                break;
              case 8:
                mesn1='Ago';
                break;
              case 9:
                mesn1='Sep';
                break;
              case 10:
                mesn1='Oct';
                break;
              case 11:
                mesn1='Nov';
                break;
              case 12:
                mesn1='Dec';
                break;
            }
            me.etiqueta32.push(mesn1);
            me.tr3.push(x.vr3);
            me.ta3.push(x.va3);
            me.tr2.push(x.vr2);
            me.ta2.push(x.va2);
            me.tr1.push(x.vr1);
            me.ta1.push(x.va1); 
            
            
          });
           

          var ctx = document.getElementById('myChartP4');
          var myChart = new Chart(ctx, {
              type: 'line',
              data: {
                  labels: me.etiqueta32,
                  datasets: [
                     {
                        label: 'Registrados '+ me.anoantepenultimo,
                        data: me.tr1,
                        backgroundColor:[
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 

                        ],
                        borderColor: [
                          'rgba(173,226,249, 0.7)',  
                          'rgba(173,226,249, 0.7)',  
                          'rgba(173,226,249, 0.7)',  
                          'rgba(173,226,249, 0.7)',  
                          'rgba(173,226,249, 0.7)',  
                          'rgba(173,226,249, 0.7)',  
                          'rgba(173,226,249, 0.7)',  
                          'rgba(173,226,249, 0.7)',  
                          'rgba(173,226,249, 0.7)',  
                          'rgba(173,226,249, 0.7)',  
                          'rgba(173,226,249, 0.7)',  
                          'rgba(173,226,249, 0.7)',   
                  
                          
                        ],  
                        borderWidth: 3
                    },
                      {
                      label: 'Acuerdos '+ me.anoantepenultimo,
                      data: me.ta1,
                        backgroundColor:[
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          
                      ],
                       borderColor: [
                          'rgba(20,171,239, 0.9)',
                          'rgba(20,171,239, 0.9)',
                          'rgba(20,171,239, 0.9)',
                          'rgba(20,171,239, 0.9)',
                          'rgba(20,171,239, 0.9)',
                          'rgba(20,171,239, 0.9)',
                          'rgba(20,171,239, 0.9)',
                          'rgba(20,171,239, 0.9)',
                          'rgba(20,171,239, 0.9)',
                          'rgba(20,171,239, 0.9)',
                          'rgba(20,171,239, 0.9)',
                          'rgba(20,171,239, 0.9)',
                        
                          
                      ],  
                          borderWidth: 3
                    },
                      {
                        label: 'Registrados '+ me.anopenultimo,
                        data: me.tr2,
                        backgroundColor:[
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 
                            'rgba(0,0,0, 0.0)', 

                        ],
                        borderColor: [
                          'rgba(250,191,97, 0.7)',  
                          'rgba(250,191,97, 0.7)',  
                          'rgba(250,191,97, 0.7)',    
                          'rgba(250,191,97, 0.7)', 
                          'rgba(250,191,97, 0.7)', 
                          'rgba(250,191,97, 0.7)', 
                          'rgba(250,191,97, 0.7)', 
                          'rgba(250,191,97, 0.7)', 
                          'rgba(250,191,97, 0.7)', 
                          'rgba(250,191,97, 0.7)', 
                          'rgba(250,191,97, 0.7)', 
                          'rgba(250,191,97, 0.7)',  
                    
                            
                        ],  
                            borderWidth: 3
                    },
                      {
                      label: 'Acuerdos '+ me.anopenultimo,
                      data: me.ta2,
                        backgroundColor:[
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          
                      ],
                       borderColor: [
                          'rgba(252,154,0, 0.9)',
                          'rgba(252,154,0, 0.9)',
                          'rgba(252,154,0, 0.9)',
                          'rgba(252,154,0, 0.9)',
                          'rgba(252,154,0, 0.9)',
                          'rgba(252,154,0, 0.9)',
                          'rgba(252,154,0, 0.9)',
                          'rgba(252,154,0, 0.9)',
                          'rgba(252,154,0, 0.9)',
                          'rgba(252,154,0, 0.9)',
                          'rgba(252,154,0, 0.9)',
                          'rgba(252,154,0, 0.9)',
                        
                          
                      ],  
                          borderWidth: 3
                    },
                    {
                      label: 'Registrados '+ me.anoactual,
                      data:me.tr3,
                      backgroundColor:[
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 

                      ],
                      borderColor: [
                        'rgba(162,223,110, 0.5)',  
                        'rgba(162,223,110, 0.5)',
                        'rgba(162,223,110, 0.5)',
                        'rgba(162,223,110, 0.5)',  
                        'rgba(162,223,110, 0.5)',
                        'rgba(162,223,110, 0.5)',  
                        'rgba(162,223,110, 0.5)',
                        'rgba(162,223,110, 0.5)',
                        'rgba(162,223,110, 0.5)',  
                        'rgba(162,223,110, 0.5)',
                        'rgba(162,223,110, 0.5)',  
                        'rgba(162,223,110, 0.5)', 
                   
                          
                      ],  
                          borderWidth: 3
                  },
                  {
                      label: 'Acuerdos '+ me.anoactual,
                      data: me.ta3,
                        backgroundColor:[
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          'rgba(0,0,0, 0.0)', 
                          
                      ],
                       borderColor: [
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)',
                          'rgba(101,191,27, 0.9)', 
                           
                          
                      ],  
                          borderWidth: 3
                  }]
              },
                  options: {
                  
                    layout:{
                      padding:{
                          left:30,
                          right:30,
                          top:30,
                          bottom:30,
                      }
                  },
                  legend:{
                      display:true,
                      align:'start', 
                      position: 'right',
                        labels: { 
                            boxWidth:12
                        }
                      
                  },
                  tooltips: {
                      enabled: true,
                      mode: 'single',
                      callbacks: {
                          
                          
                      }
                  },
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                      }]
                  }
              }
          });
        },
 
     
            
    },
    mounted(){
      let me = this;
      var fecha = new Date();
      var ano = fecha.getFullYear();
      me.anoactual= ano;
      me.anopenultimo= ano -1;
      me.anoantepenultimo= ano-2;
 
      me.getAll1();
      me.getAll2();
      me.getAll3();

      
     
      

    }
}
</script>
<style>

.caption1{
 font-size: 10px !important;
 text-align: center !important;
 padding: 0 0px !important;
 height: 20px !important; 
 border-left:0px solid #aaaaaa;
 border-top:1px solid #aaaaaa;
 border-bottom:1px solid #aaaaaa;
 border-right:0px solid #aaaaaa;
}

.mytable{
  
 text-align: center !important;
  font-size: 10px !important;
   height: 10px !important; 
 
}

</style>