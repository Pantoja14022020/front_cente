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
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <!-- MODULOS DE ERROR -->
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <!-- COMPONENTE PRINCIPAL -->
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <v-flex v-if="showpage">
            <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
            <!-- BARRA SUPERIOR DE ACCIÓN Y TÍTULO -->
            <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
            <v-toolbar flat color="white">
                <!-- SECCIÓN DEL TÍTULO -->
                <v-toolbar-title class="font-weight-regular">
                    Acuerdo reparatorio y/o plan de reparación.
                </v-toolbar-title>
                <v-divider class="mx-2" inset vertical />                
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
                <!-- SECCIÓN DE LOS BOTONES DE ACCIÓN DE CIERRE, CREACIÓN Y RETORNO -->
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn  class="mx-2 py-2" slot="activator" v-on="on" @click.native="cerrarexpediente" fab dark small color="primary">
                            <v-icon class="mt-1" dark>close</v-icon>
                        </v-btn>
                    </template>
                    <span>Cerrar carpeta</span>
                </v-tooltip>       
                <!-- Botón para habilitar el modal para añadir un acuerdo en caso de qué el expediente sea con conjuntos -->
                <v-tooltip bottom v-if = "createagreement == false && editagreement == false && cantidaddeconjuntos != 0">
                    <template v-slot:activator="{ on }">
                        <v-btn  class="mx-2 py-2" slot="activator" v-on="on" @click.native="createagreement = true" fab dark small color="success">
                            <v-icon dark>add</v-icon>
                        </v-btn>
                    </template>
                    <span>Crear</span>
                </v-tooltip>   
                <!-- Botón para habilitar el modal para añadir un acuerdo en caso de qué el expediente sea sin conjuntos -->
                <v-tooltip bottom v-if = "!istypeconjunt && createagreement == false && existsagreement == false">
                    <template v-slot:activator="{ on }">
                        <v-btn  class="mx-2 py-2" slot="activator" v-on="on" @click.native="createagreement = true" fab dark small color="success">
                            <v-icon dark>add</v-icon>
                        </v-btn>
                    </template>
                    <span>Crear</span>
                </v-tooltip>
                <!-- Botón para retornar y deshabilitar el modal para crear un acuerdo -->
                <v-tooltip bottom v-if = "createagreement || editagreement">
                    <template v-slot:activator="{ on }">
                        <v-btn  class="mx-2 py-2" slot="activator" v-on="on" @click.native="fieldsBlank" fab dark small color="success">
                            <v-icon dark>undo</v-icon>
                        </v-btn>
                    </template>
                    <span>Regresar</span>
                </v-tooltip>                         
            </v-toolbar>
            <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
            <!-- CONTENIDO CENTRAL -->
            <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
            <v-card>
                <v-container grid-list-md>
                    <v-layout>
                        <!-- VISTA EN CASO DE NO EXISTIR ACUERDOS -->
                        <v-flex xl12 lg12 md12 sm12 xs12 v-if = "!existsagreement && !createagreement">
                            <v-toolbar>
                                <v-spacer />
                                <v-toolbar-title class="font-weight-regular">
                                    NO HAY ACUERDOS REPARATORIOS GENERADOS
                                </v-toolbar-title>
                                <v-spacer />
                            </v-toolbar>                            
                        </v-flex>
                        <!-- VISTA DE LOS ACUERDOS REPARATORIOS REGISTRADOS PARA EXPEDIENTES CON CONJUNTOS-->
                        <v-flex xl12 lg12 md12 sm12 xs12 v-if = "existsagreement && istypeconjunt && createagreement==false && editagreement == false" align-center>
                            <v-layout row align-center justify-center>
                                <v-layout row align-center justify-center>
                                    <v-expansion-panel elevation-0 mx-auto align-center justify-center>  
                                        <!-- Bloque de iteración de los acuerdos creados -->
                                        <v-expansion-panel-content class="blue-grey lighten-5" elevatio-0 v-for="(it,i) in conjuntsWithAgreement" :key="i" @click.native="loadDataRI(it, i)" align-center justify-center>              
                                            <v-divider></v-divider>
                                            <!-- Cabecera de los acuerdos -->
                                            <template v-slot:header  >
                                                <h2 style="font-size:1.5rem; font-weight: 100 ;">Acuerdo {{ i +1 }}</h2>
                                            </template>
                                            <!-- Elementos con despliegue -->                                            
                                            <v-flex xl12 lg12 md12 sm12 xs12 >        
                                                <v-card elevation="0" class="blue-grey lighten-5">
                                                    <!-- Bloque botones de acción para el acuerdo reparatorio -->
                                                    <v-flex>                                                
                                                        <v-tooltip bottom v-if="it.attached == null && it.statusRespuestaCoordinadorJuridico == 'No autorizado' || it.statusRespuestaAMP == 'No autorizado'">
                                                            <template v-slot:activator="{ on }">
                                                                <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="editarAR(it)" fab dark small color="success">
                                                                    <v-icon dark class="mt-1">edit</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <span>Editar acuerdo reparatorio</span>
                                                        </v-tooltip>
                                                        <v-tooltip bottom v-if="it.countSessionsA == 0 && it.attached == null">
                                                            <template v-slot:activator="{ on }">
                                                                <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="sise(it)" fab dark small color="warning">
                                                                    <v-icon dark class="mt-1">swap_vertical_circle</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <span>Número SISE</span>
                                                        </v-tooltip>
                                                        <v-tooltip bottom>
                                                            <template v-slot:activator="{ on }">
                                                                <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="reimpresion()" fab dark small color="primary">
                                                                    <v-icon dark class="mt-1">picture_as_pdf</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <span>Re-impresión de PDF</span>
                                                        </v-tooltip>
                                                        <v-tooltip bottom v-if="(it.attached != null && it.countSessionsA != it.attached.length) || (it.attached == null && it.countSessionsA > 0)" >
                                                            <template v-slot:activator="{ on }">
                                                                <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="attached(it)" fab dark small color="blue-grey">
                                                                    <v-icon dark class="mt-1">attachment</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <span>Crear Anexo</span>
                                                        </v-tooltip>                                                            
                                                    </v-flex>  
                                                    <!-- Bloque de cuerpo del acuerdo que se muestra unicamente cuando no tienen anexos creados -->
                                                    <v-card-text class="blue-grey lighten-5 px-0" v-if="it.attached == null">                                                            
                                                        <v-list two-line>
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="warning">start</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content>
                                                                    <v-list-tile-title>
                                                                        Status de respuesta del coordinador o juridico:
                                                                    </v-list-tile-title>
                                                                    <v-list-tile-sub-title>
                                                                        {{ 
                                                                            it.statusRespuestaCoordinadorJuridico != null ? it.statusRespuestaCoordinadorJuridico : 'Sin respuesta' 
                                                                        }}
                                                                    </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-divider inset />                                                    
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="warning">access_time</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content>
                                                                    <v-list-tile-title>
                                                                        Fecha y hora de la respuesta:
                                                                    </v-list-tile-title>
                                                                    <v-list-tile-sub-title>
                                                                        {{ it.fechaHoraRespuestaCoordinadorJuridico != null ? formatearfechahora(it.fechaHoraRespuestaCoordinadorJuridico) : 'Sin fecha de respuesta'}}
                                                                    </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-divider inset />
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="warning">chat</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content>
                                                                    <v-list-tile-title>Respuesta: </v-list-tile-title>
                                                                    <v-list-tile-sub-title>
                                                                        {{ it.respuestaCoordinadorJuridico != null ? it.respuestaCoordinadorJuridico : 'Sin respuesta' }}
                                                                    </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-divider inset />
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="warning">start</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content>
                                                                    <v-list-tile-title>
                                                                        Status de respuesta del Agente de Ministerio Público:
                                                                    </v-list-tile-title>
                                                                    <v-list-tile-sub-title>
                                                                        {{ 
                                                                            it.statusRespuestaAMP != null ? it.statusRespuestaAMP : 'Sin respuesta' 
                                                                        }}
                                                                    </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-divider inset />
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="warning">access_time</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content>
                                                                    <v-list-tile-title>
                                                                        Fecha y hora de la respuesta:
                                                                    </v-list-tile-title>
                                                                    <v-list-tile-sub-title>
                                                                        {{ it.fechaRespuestaAMP != null ? formatearfechahora(it.fechaRespuestaAMP) : 'Sin fecha de respuesta'}}
                                                                    </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-divider inset />
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="warning">chat</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content>
                                                                    <v-list-tile-title>Respuesta: </v-list-tile-title>
                                                                    <v-list-tile-sub-title>
                                                                        {{ it.respuestaAMP != null ? it.respuestaAMP : 'Sin respuesta' }}
                                                                    </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-divider inset />
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="warning">double_arrow</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content>
                                                                    <v-list-tile-title>Número SISE: </v-list-tile-title>
                                                                    <v-list-tile-title>
                                                                        {{ it.nosise }}
                                                                    </v-list-tile-title>
                                                                    <v-list-tile-sub-title>
                                                                        {{ it.fechasise == null ? '' : formatearfecha(it.fechasise) }}
                                                                    </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-divider inset />
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="warning">person</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content>
                                                                    <v-list-tile-title>Solicitante (s): </v-list-tile-title>
                                                                    <v-list-tile-sub-title>
                                                                        {{ it.nombreS.replace(';', ',') }}
                                                                    </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-divider inset />
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="warning">person</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content>
                                                                    <v-list-tile-title>Requerido (s): </v-list-tile-title>
                                                                    <v-list-tile-sub-title>
                                                                        {{ it.nombreR.replace(';', ',') }}
                                                                    </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                            <v-divider inset />
                                                            <v-list-tile>
                                                                <v-list-tile-action>
                                                                    <v-icon color="warning">policy</v-icon>
                                                                </v-list-tile-action>
                                                                <v-list-tile-content>
                                                                    <v-list-tile-title>Delito (s): </v-list-tile-title>
                                                                    <v-list-tile-sub-title>
                                                                        {{ it.nombreD.replace(';', ',') }}
                                                                    </v-list-tile-sub-title>
                                                                </v-list-tile-content>
                                                            </v-list-tile>
                                                        </v-list>
                                                    </v-card-text>
                                                </v-card>                                                
                                            </v-flex>
                                            <!-- Bloque de muestreo de los anexos creados -->
                                            <v-layout align-center justify-center row mt-3 pb-3>
                                                <v-flex xl11 lg11 md11 sm11 xs11 v-if="it.attached != null" align-center justify-center>
                                                    <v-layout xl10 lg10 md10 sm10 xs10 row align-center justify-center>
                                                            <v-expansion-panel elevation-0 row align-center justify-center>
                                                                <!-- Bloque de iteración de los anexos del acuerdo -->
                                                                <v-expansion-panel-content class="transparent" elevatio-0 v-for="(att,i) in it.attached" :key="i" @click.native="">
                                                                    <!-- Cabecera de los acuerdos -->
                                                                    <template v-slot:header>
                                                                        <h2 style="font-size:1.5rem; font-weight: 100 ;">Anexo {{ i +1 }}</h2>
                                                                    </template>
                                                                    <!-- Elementos con despliegue -->
                                                                    <v-card-text class="px-0">
                                                                        <!-- Bloque botones de acción para el acuerdo reparatorio -->                                        
                                                                        <v-flex>        
                                                                            <v-tooltip bottom v-if="att.statusAnexo && att.statusRespuestaCoordinadorJuridico == 'No autorizado' || att.statusRespuestaAMP == 'No autorizado'">
                                                                                <template v-slot:activator="{ on }">
                                                                                    <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="editarAR(att, it.conjunt)" fab dark small color="success">
                                                                                        <v-icon dark class="mt-1">edit</v-icon>
                                                                                    </v-btn>
                                                                                </template>
                                                                                <span>Editar acuerdo reparatorio</span>
                                                                            </v-tooltip>
                                                                            <v-tooltip bottom v-if="att.statusAnexo && it.attached.length == it.countSessionsA">
                                                                                <template v-slot:activator="{ on }">
                                                                                    <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="sise(att)" fab dark small color="warning">
                                                                                        <v-icon dark class="mt-1">swap_vertical_circle</v-icon>
                                                                                    </v-btn>
                                                                                </template>
                                                                                <span>Número SISE</span>
                                                                            </v-tooltip>
                                                                            <v-tooltip bottom>
                                                                                <template v-slot:activator="{ on }">
                                                                                    <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="reimpresionA(att)" fab dark small color="primary">
                                                                                        <v-icon dark class="mt-1">picture_as_pdf</v-icon>
                                                                                    </v-btn>
                                                                                </template>
                                                                                <span>Re-impresión de PDF</span>
                                                                            </v-tooltip>                                                                                                                                   
                                                                        </v-flex>
                                                                        <!-- Bloque de cuerpo del anexo que se muestra unicamente cuando es el más actual y tiene un status de 1 -->
                                                                        <v-list two-line>
                                                                            <v-list-tile>
                                                                                <v-list-tile-action>
                                                                                    <v-icon color="warning">start</v-icon>
                                                                                </v-list-tile-action>
                                                                                <v-list-tile-content>
                                                                                    <v-list-tile-title>
                                                                                        Status de respuesta del coordinador o juridico:
                                                                                    </v-list-tile-title>
                                                                                    <v-list-tile-sub-title>
                                                                                        {{ 
                                                                                            att.statusRespuestaCoordinadorJuridico != null ? att.statusRespuestaCoordinadorJuridico : 'Sin respuesta' 
                                                                                        }}
                                                                                    </v-list-tile-sub-title>
                                                                                </v-list-tile-content>
                                                                            </v-list-tile>
                                                                            <v-divider inset />                                                    
                                                                            <v-list-tile>
                                                                                <v-list-tile-action>
                                                                                    <v-icon color="warning">access_time</v-icon>
                                                                                </v-list-tile-action>
                                                                                <v-list-tile-content>
                                                                                    <v-list-tile-title>
                                                                                        Fecha y hora de la respuesta:
                                                                                    </v-list-tile-title>
                                                                                    <v-list-tile-sub-title>
                                                                                        {{ att.fechaHoraRespuestaCoordinadorJuridico != null ? formatearfechahora(att.fechaHoraRespuestaCoordinadorJuridico) : 'Sin fecha de respuesta'}}
                                                                                    </v-list-tile-sub-title>
                                                                                </v-list-tile-content>
                                                                            </v-list-tile>
                                                                            <v-divider inset />
                                                                            <v-list-tile>
                                                                                <v-list-tile-action>
                                                                                    <v-icon color="warning">chat</v-icon>
                                                                                </v-list-tile-action>
                                                                                <v-list-tile-content>
                                                                                    <v-list-tile-title>Respuesta: </v-list-tile-title>
                                                                                    <v-list-tile-sub-title>
                                                                                        {{ att.respuestaCoordinadorJuridico != null ? att.respuestaCoordinadorJuridico : 'Sin respuesta' }}
                                                                                    </v-list-tile-sub-title>
                                                                                </v-list-tile-content>
                                                                            </v-list-tile>
                                                                            <v-divider inset />
                                                                            <v-list-tile>
                                                                                <v-list-tile-action>
                                                                                    <v-icon color="warning">start</v-icon>
                                                                                </v-list-tile-action>
                                                                                <v-list-tile-content>
                                                                                    <v-list-tile-title>
                                                                                        Status de respuesta del Agente de Ministerio Público:
                                                                                    </v-list-tile-title>
                                                                                    <v-list-tile-sub-title>
                                                                                        {{ 
                                                                                            att.statusRespuestaAMP != null ? att.statusRespuestaAMP : 'Sin respuesta' 
                                                                                        }}
                                                                                    </v-list-tile-sub-title>
                                                                                </v-list-tile-content>
                                                                            </v-list-tile>
                                                                            <v-divider inset />
                                                                            <v-list-tile>
                                                                                <v-list-tile-action>
                                                                                    <v-icon color="warning">access_time</v-icon>
                                                                                </v-list-tile-action>
                                                                                <v-list-tile-content>
                                                                                    <v-list-tile-title>
                                                                                        Fecha y hora de la respuesta:
                                                                                    </v-list-tile-title>
                                                                                    <v-list-tile-sub-title>
                                                                                        {{ att.fechaRespuestaAMP != null ? formatearfechahora(att.fechaRespuestaAMP) : 'Sin fecha de respuesta'}}
                                                                                    </v-list-tile-sub-title>
                                                                                </v-list-tile-content>
                                                                            </v-list-tile>
                                                                            <v-divider inset />
                                                                            <v-list-tile>
                                                                                <v-list-tile-action>
                                                                                    <v-icon color="warning">chat</v-icon>
                                                                                </v-list-tile-action>
                                                                                <v-list-tile-content>
                                                                                    <v-list-tile-title>Respuesta: </v-list-tile-title>
                                                                                    <v-list-tile-sub-title>
                                                                                        {{ att.respuestaAMP != null ? att.respuestaAMP : 'Sin respuesta' }}
                                                                                    </v-list-tile-sub-title>
                                                                                </v-list-tile-content>
                                                                            </v-list-tile>
                                                                            <v-divider inset />
                                                                            <v-list-tile>
                                                                                <v-list-tile-action>
                                                                                    <v-icon color="warning">double_arrow</v-icon>
                                                                                </v-list-tile-action>
                                                                                <v-list-tile-content>
                                                                                    <v-list-tile-title>Número SISE: </v-list-tile-title>
                                                                                    <v-list-tile-title>
                                                                                        {{ att.sise }}
                                                                                    </v-list-tile-title>
                                                                                    <v-list-tile-sub-title>
                                                                                        {{ att.fechasise == null ? '' : formatearfecha(att.fechasise) }}
                                                                                    </v-list-tile-sub-title>
                                                                                </v-list-tile-content>
                                                                            </v-list-tile>
                                                                            <v-divider inset />
                                                                            <v-list-tile>
                                                                                <v-list-tile-action>
                                                                                    <v-icon color="warning">person</v-icon>
                                                                                </v-list-tile-action>
                                                                                <v-list-tile-content>
                                                                                    <v-list-tile-title>Solicitante (s): </v-list-tile-title>
                                                                                    <v-list-tile-sub-title>
                                                                                        {{ att.nombreSolicitante.replace(';', ',') }}
                                                                                    </v-list-tile-sub-title>
                                                                                </v-list-tile-content>
                                                                            </v-list-tile>
                                                                            <v-divider inset />
                                                                            <v-list-tile>
                                                                                <v-list-tile-action>
                                                                                    <v-icon color="warning">person</v-icon>
                                                                                </v-list-tile-action>
                                                                                <v-list-tile-content>
                                                                                    <v-list-tile-title>Requerido (s): </v-list-tile-title>
                                                                                    <v-list-tile-sub-title>
                                                                                        {{ att.nombreRequerdio.replace(';', ',') }}
                                                                                    </v-list-tile-sub-title>
                                                                                </v-list-tile-content>
                                                                            </v-list-tile>
                                                                            <v-divider inset />
                                                                            <v-list-tile>
                                                                                <v-list-tile-action>
                                                                                    <v-icon color="warning">policy</v-icon>
                                                                                </v-list-tile-action>
                                                                                <v-list-tile-content>
                                                                                    <v-list-tile-title>Delito (s): </v-list-tile-title>
                                                                                    <v-list-tile-sub-title>
                                                                                        {{ att.delitos.replace(';', ',') }}
                                                                                    </v-list-tile-sub-title>
                                                                                </v-list-tile-content>
                                                                            </v-list-tile>
                                                                        </v-list>
                                                                    </v-card-text>
                                                                </v-expansion-panel-content>
                                                            </v-expansion-panel>
                                                    </v-layout>
                                                </v-flex>                                            
                                            </v-layout>                                                                                   
                                        </v-expansion-panel-content>                                        
                                    </v-expansion-panel>
                                </v-layout>
                            </v-layout>
                        </v-flex>
                        <!-- VISTA DE LOS ACUERDOS REPARATORIOS REGISTRADOS PARA EXPEDIENTES SIN CONJUNTOS-->
                        <v-flex xl12 lg12 md12 sm12 xs12 v-if = "existsagreement && !istypeconjunt && !editagreement && createagreement==false">
                            <v-layout>
                                <v-layout>
                                    <v-expansion-panel elevation-0>                               
                                            <v-expansion-panel-content class="blue-grey lighten-5" elevatio-0 v-for="(it,i) in v_agreement" :key="i">                                
                                                <template v-slot:header  >
                                                    <h2 style="font-size:1.5rem; font-weight: 100 ;">Acuerdo {{ i +1 }}</h2>
                                                </template>
                                                <v-flex xl12 lg12 md12 sm12 xs12>        
                                                    <v-card elevation="0">
                                                        <v-flex>                                                
                                                            <v-tooltip bottom v-if="it.statusRespuestaCoordinadorJuridico == 'No autorizado' || it.statusRespuestaAMP == 'No autorizado'">
                                                                <template v-slot:activator="{ on }">
                                                                    <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="editarAR(it)" fab dark small color="success">
                                                                        <v-icon dark>edit</v-icon>
                                                                    </v-btn>
                                                                </template>
                                                                <span>Editar acuerdo reparatorio</span>
                                                            </v-tooltip>
                                                            <v-tooltip bottom>
                                                                <template v-slot:activator="{ on }">
                                                                    <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="sise(it)" fab dark small color="warning">
                                                                        <v-icon dark>swap_vertical_circle</v-icon>
                                                                    </v-btn>
                                                                </template>
                                                                <span>Número SISE</span>
                                                            </v-tooltip>
                                                        </v-flex>
                                                        <v-card-text class="px-0">
                                                            <v-list two-line>
                                                                <v-list-tile>
                                                                    <v-list-tile-action>
                                                                        <v-icon color="warning">start</v-icon>
                                                                    </v-list-tile-action>
                                                                    <v-list-tile-content>
                                                                        <v-list-tile-title>
                                                                            Status de respuesta del coordinador o juridico:
                                                                        </v-list-tile-title>
                                                                        <v-list-tile-sub-title>
                                                                            {{ 
                                                                                istypeconjunt ? (it.statusRespuestaCoordinadorJuridico != null ? it.statusRespuestaCoordinadorJuridico : 'Sin respuesta' ) : (it.statusRespuestaCoordinadorJuridico != null ? it.statusRespuestaCoordinadorJuridico : 'Sin respuesta')
                                                                            }}
                                                                        </v-list-tile-sub-title>
                                                                    </v-list-tile-content>
                                                                </v-list-tile>
                                                                <v-divider inset />                                                    
                                                                <v-list-tile>
                                                                    <v-list-tile-action>
                                                                        <v-icon color="warning">access_time</v-icon>
                                                                    </v-list-tile-action>
                                                                    <v-list-tile-content>
                                                                        <v-list-tile-title>
                                                                            Fecha y hora de la respuesta:
                                                                        </v-list-tile-title>
                                                                        <v-list-tile-sub-title>
                                                                            {{ 
                                                                                istypeconjunt ? (it.fechaHoraRespuestaCoordinadorJuridico != null ? formatearfechahora(it.fechaHoraRespuestaCoordinadorJuridico) : 'Sin fecha de respuesta') : (it.fechaHoraRespuestaCoordinadorJuridico != null ? formatearfechahora(it.fechaHoraRespuestaCoordinadorJuridico) : 'Sin fecha de respuesta')
                                                                            }}
                                                                        </v-list-tile-sub-title>
                                                                    </v-list-tile-content>
                                                                </v-list-tile>
                                                                <v-divider inset />
                                                                <v-list-tile>
                                                                    <v-list-tile-action>
                                                                        <v-icon color="warning">chat</v-icon>
                                                                    </v-list-tile-action>
                                                                    <v-list-tile-content>
                                                                        <v-list-tile-title>Respuesta: </v-list-tile-title>
                                                                        <v-list-tile-sub-title>
                                                                            {{ 
                                                                                istypeconjunt ? (it.respuestaCoordinadorJuridico != null ? it.respuestaCoordinadorJuridico : 'Sin respuesta') : (it.respuestaCoordinadorJuridico != null ? it.respuestaCoordinadorJuridico : 'Sin respuesta') 
                                                                            }}
                                                                        </v-list-tile-sub-title>
                                                                    </v-list-tile-content>
                                                                </v-list-tile>
                                                                <v-divider inset />
                                                                <v-list-tile>
                                                                    <v-list-tile-action>
                                                                        <v-icon color="warning">start</v-icon>
                                                                    </v-list-tile-action>
                                                                    <v-list-tile-content>
                                                                        <v-list-tile-title>
                                                                            Status de respuesta del Agente de Ministerio Público:
                                                                        </v-list-tile-title>
                                                                        <v-list-tile-sub-title>
                                                                            {{ 
                                                                                istypeconjunt ? (it.statusRespuestaAMP != null ? it.statusRespuestaAMP : 'Sin respuesta') : (it.statusRespuestaAMP != null ? it.statusRespuestaAMP : 'Sin respuesta') 
                                                                            }}
                                                                        </v-list-tile-sub-title>
                                                                    </v-list-tile-content>
                                                                </v-list-tile>
                                                                <v-divider inset />
                                                                <v-list-tile>
                                                                    <v-list-tile-action>
                                                                        <v-icon color="warning">access_time</v-icon>
                                                                    </v-list-tile-action>
                                                                    <v-list-tile-content>
                                                                        <v-list-tile-title>
                                                                            Fecha y hora de la respuesta:
                                                                        </v-list-tile-title>
                                                                        <v-list-tile-sub-title>
                                                                            {{ 
                                                                                istypeconjunt ? (it.fechaRespuestaAMP != null ? formatearfechahora(it.fechaRespuestaAMP) : 'Sin fecha de respuesta') : (it.fechaRespuestaAMP != null ? formatearfechahora(it.fechaRespuestaAMP) : 'Sin fecha de respuesta')
                                                                            }}
                                                                        </v-list-tile-sub-title>
                                                                    </v-list-tile-content>
                                                                </v-list-tile>
                                                                <v-divider inset />
                                                                <v-list-tile>
                                                                    <v-list-tile-action>
                                                                        <v-icon color="warning">chat</v-icon>
                                                                    </v-list-tile-action>
                                                                    <v-list-tile-content>
                                                                        <v-list-tile-title>Respuesta: </v-list-tile-title>
                                                                        <v-list-tile-sub-title>
                                                                            {{
                                                                                 istypeconjunt ? (it.respuestaAMP != null ? it.respuestaAMP : 'Sin respuesta') : (it.respuestaAMP != null ? it.respuestaAMP : 'Sin respuesta')
                                                                            }}
                                                                        </v-list-tile-sub-title>
                                                                    </v-list-tile-content>
                                                                </v-list-tile>
                                                                <v-divider inset />
                                                                <v-list-tile>
                                                                    <v-list-tile-action>
                                                                        <v-icon color="warning">double_arrow</v-icon>
                                                                    </v-list-tile-action>
                                                                    <v-list-tile-content>
                                                                        <v-list-tile-title>Número SISE: </v-list-tile-title>
                                                                        <v-list-tile-title>
                                                                            {{ 
                                                                                it.nosise 
                                                                            }}
                                                                        </v-list-tile-title>
                                                                        <v-list-tile-sub-title>
                                                                            {{ 
                                                                                formatearfechahora(it.fechasise )
                                                                            }}
                                                                        </v-list-tile-sub-title>
                                                                    </v-list-tile-content>
                                                                </v-list-tile>
                                                                <v-divider inset />
                                                                <v-list-tile>
                                                                    <v-list-tile-action>
                                                                        <v-icon color="warning">person</v-icon>
                                                                    </v-list-tile-action>
                                                                    <v-list-tile-content>
                                                                        <v-list-tile-title>Solicitante (s): </v-list-tile-title>
                                                                        <v-list-tile-sub-title>
                                                                            {{ 
                                                                                it.nombreSolicitante.replace(';', ',') 
                                                                            }}
                                                                        </v-list-tile-sub-title>
                                                                    </v-list-tile-content>
                                                                </v-list-tile>
                                                                <v-divider inset />
                                                                <v-list-tile>
                                                                    <v-list-tile-action>
                                                                        <v-icon color="warning">person</v-icon>
                                                                    </v-list-tile-action>
                                                                    <v-list-tile-content>
                                                                        <v-list-tile-title>Requerido (s): </v-list-tile-title>
                                                                        <v-list-tile-sub-title>
                                                                            {{ 
                                                                                it.nombreRequerdio.replace(';', ',') 
                                                                            }}
                                                                        </v-list-tile-sub-title>
                                                                    </v-list-tile-content>
                                                                </v-list-tile>
                                                                <v-divider inset />
                                                                <v-list-tile>
                                                                    <v-list-tile-action>
                                                                        <v-icon color="warning">policy</v-icon>
                                                                    </v-list-tile-action>
                                                                    <v-list-tile-content>
                                                                        <v-list-tile-title>Delito (s): </v-list-tile-title>
                                                                        <v-list-tile-sub-title>
                                                                            {{ 
                                                                                it.delitos.replace(';', ',') 
                                                                            }}
                                                                        </v-list-tile-sub-title>
                                                                    </v-list-tile-content>
                                                                </v-list-tile>
                                                            </v-list>
                                                        </v-card-text>
                                                    </v-card>
                                                    <v-divider />
                                                </v-flex>
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                </v-layout>
                            </v-layout>
                        </v-flex>
                        <!-- VISTA DE FORMULARIO PARA CREACIÓN DE ACUERDO REPARATORIO -->                        
                        <v-flex v-if = "createagreement || editagreement">
                            <v-card>
                                <v-container>
                                    <v-layout row wrap>
                                        <!-- SELECCIÓN DEL TIPO DE DOCUMENTO A GENERAR -->
                                        <v-flex xl12 lg12 md12 sm12 xs12>
                                            <v-card elevation="0">
                                                <v-card-text>
                                                    <v-select
                                                        :items="types"
                                                        v-model="documenttype"
                                                        name="dtype"
                                                        label="Tipo de documento"
                                                        prepend-inner-icon="description"
                                                        v-on:change=""
                                                        persistent-hint
                                                        v-if="!v_createAttached && !v_editAttached"
                                                    />
                                                    <v-text-field
                                                        value=""
                                                        v-model="documenttype"
                                                        label="Tipo de Documento"
                                                        prepend-inner-icon="event"
                                                        name="anexo"
                                                        readonly
                                                        :disabled="true"   
                                                        v-if="v_createAttached || v_editAttached"                                                                     
                                                    />
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>
                                        <!-- COLUMNAS DE DATOS DE FORMULARIO PARA CREACIÓN DE ACUERDO REPARATORIO -->
                                        <v-flex xl6 lg6 md4 sm12 xs12 v-if="documenttype != '' || v_createAttached || v_editAttached">
                                            <v-card elevation="0">
                                                <v-card-text>
                                                    <v-menu
                                                        ref="v_menu1"
                                                        v-model="v_menu1"
                                                        :close-on-content-click="false"
                                                        :return-value.sync="v_fechacelebracion"
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="290px"
                                                    >
                                                        <template v-slot:activator="{ on }">
                                                            <v-text-field
                                                                :value="v_fechacelebracion"
                                                                label="Fecha de celebración del acuerdo:"
                                                                prepend-inner-icon="event"
                                                                name="fecha_cele_acuerdo"
                                                                v-validate="'required'"
                                                                :error-messages="errors.collect('fecha de celebración del acuerdo')"
                                                                readonly
                                                                v-on="on"
                                                            />
                                                        </template>
                                                        <v-date-picker v-model="v_fechac" no-title scrollable>
                                                            <v-spacer />
                                                            <v-btn text color="primary" @click="v_menu1 = false">
                                                                Cancel
                                                            </v-btn>
                                                            <v-btn text color="primary" @click="$refs.v_menu1.save(formatearfecha(v_fechac))">
                                                                OK
                                                            </v-btn>
                                                        </v-date-picker>
                                                    </v-menu>                                                                                        
                                                    <v-select
                                                        :items="v_tipospagos"
                                                        v-model="v_tipopago"
                                                        name="tipago"
                                                        label="Reparación del daño:"
                                                        prepend-inner-icon="emoji_symbols"
                                                        multiple
                                                        chips
                                                        v-on:change="consultarPagoSeleccionado()"
                                                        v-validate="'required'"
                                                        persistent-hint
                                                        :error-messages="errors.collect('tipo pago')"
                                                    />
                                                    <v-autocomplete 
                                                        name="modalidadD"
                                                        :items="v_statusconclusiones"
                                                        v-if="v_tipopago.length > 0 && v_tipopago.includes('Dinero')"
                                                        v-model="v_statusconclusion"
                                                        prepend-inner-icon="ballot"
                                                        label="Modalidad en Dinero:"
                                                        v-validate="'required'"
                                                        :error-messages="errors.collect('modalidadD')"
                                                    />
                                                    <v-autocomplete 
                                                        name="modalidadE"
                                                        :items="v_statusconclusiones"
                                                        v-if="v_tipopago.length > 0 && v_tipopago.includes('Especie')"
                                                        v-model="v_statusconclusionE"
                                                        prepend-inner-icon="ballot"
                                                        label="Modalidad en Especie:"
                                                        v-validate="'required'"
                                                        :error-messages="errors.collect('modalidadE')"
                                                    />
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>
                                        <!-- COLUMNAS DE DATOS DE FORMULARIO PARA CREACIÓN DE ACUERDO REPARATORIO -->
                                        <v-flex xl6 lg6 md4 sm12 xs12 v-if="documenttype != '' || v_createAttached || v_editAttached">                            
                                            <v-card elevation="0">
                                                <v-card-text>                                    
                                                    <v-menu
                                                        ref="v_menu3"
                                                        v-model="v_menu3"
                                                        :close-on-content-click="false"
                                                        :return-value.sync="v_horacelebracion"
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="290px"
                                                    >
                                                        <template v-slot:activator="{ on }">
                                                            <v-text-field
                                                                name="hora"
                                                                v-model="v_horacelebracion"
                                                                label="Hora de celebración:"
                                                                prepend-inner-icon="access_time"
                                                                readonly
                                                                v-validate="'required'"
                                                                :error-messages="errors.collect('hora')"
                                                                v-on="on"
                                                            />
                                                        </template>
                                                        <v-time-picker
                                                            v-if="v_menu3"
                                                            v-model="v_horacelebracion"
                                                            full-width
                                                            @click:minute="$refs.v_menu3.save(v_horacelebracion)"
                                                        />
                                                    </v-menu>
                                                    <v-autocomplete 
                                                        name="metodo_utilizado"
                                                        :items="v_metodosutilizados"
                                                        v-model="v_metodoutilizado"
                                                        prepend-inner-icon="sports_kabaddi"
                                                        label="Método utilizado:"
                                                        v-validate="'required'"
                                                        :error-messages="errors.collect('metodo utilizado')"                                                        
                                                    />
                                                    <v-menu
                                                        ref="v_menu2"
                                                        v-if="v_statusconclusion=='Diferido' || v_statusconclusionE=='Diferido'"
                                                        v-model="v_menu2"
                                                        :close-on-content-click="false"
                                                        :return-value.sync="v_fechalimite"
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="290px"
                                                    >
                                                        <template v-slot:activator="{ on }">
                                                            <v-text-field
                                                                :value="v_fechalimite"
                                                                label="Fecha limite de cumplimiento:"
                                                                prepend-inner-icon="event"
                                                                name="fecha_limite_cumplimiento"
                                                                v-validate="'required'"
                                                                :error-messages="errors.collect('fecha limite de cumplimiento')"
                                                                readonly
                                                                v-on="on"
                                                            />
                                                        </template>
                                                        <v-date-picker v-model="v_fechal" no-title scrollable>
                                                            <v-spacer />
                                                            <v-btn text color="primary" @click="v_menu2 = false">
                                                                Cancel
                                                            </v-btn>
                                                            <v-btn text color="primary" @click="$refs.v_menu2.save(formatearfecha(v_fechal))">
                                                                OK
                                                            </v-btn>
                                                        </v-date-picker>
                                                    </v-menu>
                                                    <v-menu
                                                        ref="v_menu4"
                                                        v-if="v_statusconclusion=='Diferido' || v_statusconclusionE == 'Diferido'"
                                                        v-model="v_menu4"
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
                                                                prepend-inner-icon="access_time"
                                                                readonly
                                                                v-validate="'required'"
                                                                :error-messages="errors.collect('hora')"
                                                                v-on="on"
                                                            />
                                                        </template>
                                                        <v-time-picker
                                                            v-if="v_menu4"
                                                            v-model="v_horacita"
                                                            full-width
                                                            @click:minute="$refs.v_menu4.save(v_horacita)"
                                                        />
                                                    </v-menu>
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>
                                        <!-- COLUMNAS DE DATOS DE FORMULARIO PARA EL REGISTRO DE PAGOS -->
                                        <v-flex xl12 lg12 md12 sm12 xs12 v-if="v_statusconclusion == 'Diferido' || v_statusconclusion == 'Inmediato'" mb-4>
                                            <v-card>
                                                <v-card-title><h3>Registro de pago</h3></v-card-title>
                                                <!-- FORMULARIO PARA PAGO INMEDIATO -->
                                                <v-card-text v-if="v_statusconclusion=='Inmediato'">
                                                    <v-layout align-center justify-space-around row >
                                                        <v-flex sm12>
                                                            <v-text-field label="Monto total" type="number" :min="0" v-model="v_cantidadmonto" required prepend-inner-icon="attach_money" :disabled="v_payments.length == 1 && v_indexPayment == -1"/>
                                                        </v-flex>
                                                        <v-flex sm12>
                                                            <v-text-field label="Parcialidad" type="number" :min="1" v-model="noparcialidad" prepend-inner-icon="receipt" disabled/>                                                            
                                                        </v-flex>
                                                        <v-flex sm12>
                                                            <v-menu
                                                                ref="v_menuFPI"
                                                                v-model="v_menuFPI"
                                                                :close-on-content-click="false"
                                                                :return-value.sync="v_fechacelebracionPI"
                                                                transition="scale-transition"
                                                                offset-y
                                                                min-width="290px"                                                                
                                                            >
                                                                <template v-slot:activator="{ on }">
                                                                    <v-text-field
                                                                        :value="v_fechacelebracionPI"
                                                                        label="Fecha de cobro"
                                                                        prepend-inner-icon="event"
                                                                        name="fecha_cele_acuerdo"
                                                                        v-validate="'required'"
                                                                        :error-messages="errors.collect('fecha de celebración del acuerdo')"
                                                                        readonly
                                                                        :disabled="v_payments.length == 1 && v_indexPayment == -1"
                                                                        v-on="on"
                                                                    />
                                                                </template>
                                                                <v-date-picker v-model="v_fechaPI" no-title scrollable>
                                                                    <v-spacer />
                                                                    <v-btn text color="primary" @click="v_menuFPI = false">
                                                                        Cancel
                                                                    </v-btn>
                                                                    <v-btn text color="primary" @click="$refs.v_menuFPI.save(formatearfecha(v_fechaPI))">
                                                                        OK
                                                                    </v-btn>
                                                                </v-date-picker>
                                                            </v-menu>   
                                                        </v-flex>
                                                        <v-flex sm12>
                                                            <v-menu
                                                                ref="v_menuHPI"
                                                                v-model="v_menuHPI"
                                                                :close-on-content-click="false"
                                                                :return-value.sync="v_horacelebracionPI"
                                                                transition="scale-transition"
                                                                offset-y
                                                                min-width="290px"
                                                            >
                                                                <template v-slot:activator="{ on }">
                                                                    <v-text-field
                                                                        name="hora"
                                                                        v-model="v_horacelebracionPI"
                                                                        label="Hora de cobro"
                                                                        prepend-inner-icon="access_time"
                                                                        readonly          
                                                                        :disabled="v_payments.length == 1 && v_indexPayment == -1"                                                                                                                                      
                                                                        v-on="on"
                                                                    />
                                                                </template>
                                                                <v-time-picker
                                                                    v-if="v_menuHPI"
                                                                    v-model="v_horacelebracionPI"
                                                                    full-width
                                                                    @click:minute="$refs.v_menuHPI.save(v_horacelebracionPI)"
                                                                />
                                                            </v-menu>
                                                        </v-flex>
                                                    </v-layout>
                                                    <v-layout align-center justify-end row>
                                                        <v-btn :color="v_editPayment ? 'info' : 'success'" @click="parcialidades(1)" :disabled="v_cantidadmonto == 0 || v_fechacelebracionPI == '' || v_horacelebracionPI == ''">{{ v_editPayment ? 'Guardar cambios' : 'Agregar' }}</v-btn>
                                                    </v-layout>
                                                </v-card-text>
                                                <!-- FORMULARIO PARA PAGO DIFERIDO -->
                                                <v-card-text v-if="v_statusconclusion=='Diferido'">
                                                    <v-layout align-center justify-space-around row >
                                                        <v-flex>
                                                            <v-text-field label="Monto" type="number" :min="0" v-model="v_cantidadmonto"/>
                                                        </v-flex>
                                                        <v-flex>
                                                            <v-text-field label="Parcialidad" type="number" :min="1" v-model="noparcialidad"/>                                                            
                                                        </v-flex>
                                                        <v-flex v-if="noparcialidad > 1">
                                                            <v-autocomplete
                                                                name="periodo_pago"                                                                
                                                                :items="v_periodos"
                                                                v-model="v_periodo"
                                                                label="Periodo de pago:"
                                                                v-validate="'required'"
                                                                :error-messages="errors.collect('periodo de pago')"
                                                            /> 
                                                        </v-flex>
                                                        <v-flex>
                                                            <v-menu
                                                                ref="v_menuFPD"
                                                                v-model="v_menuFPD"
                                                                :close-on-content-click="false"
                                                                :return-value.sync="v_fechacelebracionPD"
                                                                transition="scale-transition"
                                                                offset-y
                                                                min-width="290px"
                                                            >
                                                                <template v-slot:activator="{ on }">
                                                                    <v-text-field
                                                                        :value="v_fechacelebracionPD"
                                                                        label="Fecha de cobro"
                                                                        prepend-icon="event"
                                                                        name="fecha de celebración del acuerdo"
                                                                        readonly
                                                                        v-on="on"
                                                                    />
                                                                </template>
                                                                <v-date-picker v-model="v_fechaPD" no-title scrollable>
                                                                    <v-spacer />
                                                                    <v-btn text color="primary" @click="v_menuFPD = false">
                                                                        Cancel
                                                                    </v-btn>
                                                                    <v-btn text color="primary" @click="$refs.v_menuFPD.save(formatearfecha(v_fechaPD))">
                                                                        OK
                                                                    </v-btn>
                                                                </v-date-picker>
                                                            </v-menu>   
                                                        </v-flex>
                                                        <v-flex>
                                                            <v-menu
                                                                ref="v_menuHPD"
                                                                v-model="v_menuHPD"
                                                                :close-on-content-click="false"
                                                                :return-value.sync="v_horacelebracionPD"
                                                                transition="scale-transition"
                                                                offset-y
                                                                min-width="290px"
                                                            >
                                                                <template v-slot:activator="{ on }">
                                                                    <v-text-field
                                                                        name="hora"
                                                                        v-model="v_horacelebracionPD"
                                                                        label="Hora de cobro"
                                                                        prepend-icon="access_time"
                                                                        readonly
                                                                        v-on="on"
                                                                    />
                                                                </template>
                                                                <v-time-picker
                                                                    v-if="v_menuHPD"
                                                                    v-model="v_horacelebracionPD"
                                                                    full-width
                                                                    @click:minute="$refs.v_menuHPD.save(v_horacelebracionPD)"
                                                                />
                                                            </v-menu>
                                                        </v-flex>
                                                    </v-layout>
                                                    <v-layout align-center justify-end row>
                                                        <v-btn :color="v_editPayment ? 'info' : 'success'" @click="parcialidades(2)" :disabled="v_cantidadmonto == 0 || noparcialidad == 0">{{ v_editPayment ? 'Guardar cambios' : 'Agregar' }}</v-btn>
                                                    </v-layout>
                                                </v-card-text>
                                                <!-- TABLA PARA VISUALIZAR TODOS LOS PAGOS REGISTRADOS -->
                                                <v-card-text v-if="v_statusconclusion=='Diferido' || v_statusconclusion=='Inmediato'">
                                                    <v-data-table
                                                        :headers="headers3"
                                                        :items="v_payments"
                                                        class="elevation-1"
                                                    >                                                        
                                                        <template v-slot:items="props">
                                                            <tr  :class="{'selected_row': indexRow === props.index}">
                                                                <td>{{ props.index + 1 }}</td>
                                                                <!-- RENDERIZADO DE LOS PAGOS CON PERIODOS -->
                                                                <td v-if="props.item.type == 'diverso'">
                                                                    <v-flex v-for="(pay, index) in props.item.pay" :key="index">
                                                                            $ {{ pay.monto }}                                                             
                                                                    </v-flex>                                                                
                                                                </td>                                                      
                                                                <td v-if="props.item.type == 'diverso'">
                                                                    <v-flex v-for="pay in props.item.pay" :key="pay.fecha">
                                                                            {{ pay.fecha }}                                                                
                                                                    </v-flex>                                                                
                                                                </td>                                         
                                                                <!-- RENDERIZADO DE LOS PAGOS SIN PERIODOS Y FECHAS FIJAS -->             
                                                                <td v-if="props.item.type == 'unico'">$ {{ props.item.pay[0].monto }}</td>
                                                                <td v-if="props.item.type == 'unico'">{{ props.item.pay[0].fecha }}</td>
                                                                <!-- BOTONES DE OPERACIONES -->
                                                                <td><v-icon mx-5 @click="UpdateFaction(props.item.type == 'unico' ? 1 : 2, props.index)">edit</v-icon><v-icon v-if="v_statusconclusion=='Diferido'" mx-5 @click="DeleteFaction(props.index)">delete</v-icon></td>
                                                            </tr>
                                                        </template>
                                                        <!-- FILA EN CASO DE NO EXISTIR NINGÚN REGISTRO -->
                                                        <template v-slot:no-data colspan="4" class="text-md-center">
                                                            <td :colspan="4" class="text-md-center">Sin pagos registrados</td>
                                                        </template>
                                                    </v-data-table>
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>
                                        <!-- COLUMNAS DE DATOS DE FORMULARIO PARA EL REGISTRO DE ESPECIE -->
                                        <v-flex xl12 lg12 md12 sm12 xs12 v-if="v_statusconclusionE == 'Diferido' || v_statusconclusionE == 'Inmediato'" mb-4>
                                            <v-card>
                                                <v-card-title><h3>Registro de Especie o Servicio</h3></v-card-title>
                                                <!-- FORMULARIO PARA PAGO INMEDIATO -->
                                                <v-card-text v-if="v_statusconclusionE == 'Inmediato'">
                                                    <v-layout align-center justify-space-around row >
                                                        <v-flex>
                                                            <v-text-field label="Especie o Servicio" v-model="v_especieServicio" required prepend-inner-icon="inventory" :disabled="v_especieP.length == 1 && v_indexEspecie == -1"/>
                                                        </v-flex>
                                                        <v-flex>
                                                            <v-text-field label="Cantidad Total" type="number" :min="0" v-model="v_cantidadE" required prepend-inner-icon="dialpad" :disabled="v_especieP.length == 1 && v_indexEspecie == -1"/>
                                                        </v-flex>
                                                        <v-flex>
                                                            <v-text-field label="Parcialidad" type="number" :min="1" v-model="noparcialidadE" prepend-inner-icon="receipt" disabled/>                                                            
                                                        </v-flex>
                                                        <v-flex>
                                                            <v-menu
                                                                ref="v_menuFEI"
                                                                v-model="v_menuFEI"
                                                                :close-on-content-click="false"
                                                                :return-value.sync="v_fechacelebracionEI"
                                                                transition="scale-transition"
                                                                offset-y
                                                                min-width="290px"                                                                
                                                            >
                                                                <template v-slot:activator="{ on }">
                                                                    <v-text-field
                                                                        :value="v_fechacelebracionEI"
                                                                        label="Fecha de adquisición"
                                                                        prepend-inner-icon="event"
                                                                        name="fecha_cele_acuerdo"
                                                                        v-validate="'required'"
                                                                        :error-messages="errors.collect('fecha de celebración del acuerdo')"
                                                                        readonly
                                                                        :disabled="v_especieP.length == 1 && v_indexEspecie == -1"
                                                                        v-on="on"
                                                                    />
                                                                </template>
                                                                <v-date-picker v-model="v_fechaEI" no-title scrollable>
                                                                    <v-spacer />
                                                                    <v-btn text color="primary" @click="v_menuFEI = false">
                                                                        Cancel
                                                                    </v-btn>
                                                                    <v-btn text color="primary" @click="$refs.v_menuFEI.save(formatearfecha(v_fechaEI))">
                                                                        OK
                                                                    </v-btn>
                                                                </v-date-picker>
                                                            </v-menu>   
                                                        </v-flex>
                                                        <v-flex>
                                                            <v-menu
                                                                ref="v_menuHEI"
                                                                v-model="v_menuHEI"
                                                                :close-on-content-click="false"
                                                                :return-value.sync="v_horacelebracionEI"
                                                                transition="scale-transition"
                                                                offset-y
                                                                min-width="290px"
                                                            >
                                                                <template v-slot:activator="{ on }">
                                                                    <v-text-field
                                                                        name="hora"
                                                                        v-model="v_horacelebracionEI"
                                                                        label="Hora de adquisición"
                                                                        prepend-inner-icon="access_time"
                                                                        readonly          
                                                                        :disabled="v_especieP.length == 1 && v_indexEspecie == 1"                                                                                                                                      
                                                                        v-on="on"
                                                                    />
                                                                </template>
                                                                <v-time-picker
                                                                    v-if="v_menuHEI"
                                                                    v-model="v_horacelebracionEI"
                                                                    full-width
                                                                    @click:minute="$refs.v_menuHEI.save(v_horacelebracionEI)"
                                                                />
                                                            </v-menu>
                                                        </v-flex>
                                                    </v-layout>
                                                    <v-layout align-center justify-end row>
                                                        <v-btn :color="v_editEspecie ? 'info' : 'success'" @click="parcialidadesE(1)" :disabled="v_cantidadE == 0 || v_fechacelebracionEI == '' || v_horacelebracionEI == ''">{{ v_editEspecie ? 'Guardar cambios' : 'Agregar' }}</v-btn>
                                                    </v-layout>
                                                </v-card-text>
                                                <!-- FORMULARIO PARA PAGO DIFERIDO -->
                                                <v-card-text v-if="v_statusconclusionE == 'Diferido'">
                                                    <v-layout align-center justify-space-around row >
                                                        <v-flex>
                                                            <v-text-field label="Especie o Servicio" v-model="v_especieServicio" required prepend-inner-icon="inventory"/>
                                                        </v-flex>
                                                        <v-flex>
                                                            <v-text-field label="Cantidad" type="number" :min="0" v-model="v_cantidadE"/>
                                                        </v-flex>
                                                        <v-flex>
                                                            <v-text-field label="Parcialidad" type="number" :min="1" v-model="noparcialidadE"/>                                                            
                                                        </v-flex>
                                                        <v-flex v-if="noparcialidadE > 1">
                                                            <v-autocomplete
                                                                name="periodo_pago"
                                                                :items="v_periodos"
                                                                v-model="v_periodoE"
                                                                label="Periodo de adquisición:"
                                                                v-validate="'required'"
                                                                :error-messages="errors.collect('periodo de pago')"
                                                            /> 
                                                        </v-flex>
                                                        <v-flex>
                                                            <v-menu
                                                                ref="v_menuFED"
                                                                v-model="v_menuFED"
                                                                :close-on-content-click="false"
                                                                :return-value.sync="v_fechacelebracionED"
                                                                transition="scale-transition"
                                                                offset-y
                                                                min-width="290px"
                                                            >
                                                                <template v-slot:activator="{ on }">
                                                                    <v-text-field
                                                                        :value="v_fechacelebracionED"
                                                                        label="Fecha de adquisición"
                                                                        prepend-icon="event"
                                                                        name="fecha de celebración del acuerdo"
                                                                        readonly
                                                                        v-on="on"
                                                                    />
                                                                </template>
                                                                <v-date-picker v-model="v_fechaED" no-title scrollable>
                                                                    <v-spacer />
                                                                    <v-btn text color="primary" @click="v_menuFED = false">
                                                                        Cancel
                                                                    </v-btn>
                                                                    <v-btn text color="primary" @click="$refs.v_menuFED.save(formatearfecha(v_fechaED))">
                                                                        OK
                                                                    </v-btn>
                                                                </v-date-picker>
                                                            </v-menu>   
                                                        </v-flex>
                                                        <v-flex>
                                                            <v-menu
                                                                ref="v_menuHED"
                                                                v-model="v_menuHED"
                                                                :close-on-content-click="false"
                                                                :return-value.sync="v_horacelebracionED"
                                                                transition="scale-transition"
                                                                offset-y
                                                                min-width="290px"
                                                            >
                                                                <template v-slot:activator="{ on }">
                                                                    <v-text-field
                                                                        name="hora"
                                                                        v-model="v_horacelebracionED"
                                                                        label="Hora de adquisición"
                                                                        prepend-icon="access_time"
                                                                        readonly
                                                                        v-on="on"
                                                                    />
                                                                </template>
                                                                <v-time-picker
                                                                    v-if="v_menuHED"
                                                                    v-model="v_horacelebracionED"
                                                                    full-width
                                                                    @click:minute="$refs.v_menuHED.save(v_horacelebracionED)"
                                                                />
                                                            </v-menu>
                                                        </v-flex>
                                                    </v-layout>
                                                    <v-layout align-center justify-end row>
                                                        <v-btn :color="v_editEspecie ? 'info' : 'success'" @click="parcialidadesE(2)" :disabled="v_cantidadE == 0 || noparcialidadE == 0 || v_especieServicio == ''">{{ v_editEspecie ? 'Guardar cambios' : 'Agregar' }}</v-btn>
                                                    </v-layout>
                                                </v-card-text>
                                                <!-- TABLA PARA VISUALIZAR TODOS LOS PAGOS REGISTRADOS -->
                                                <v-card-text v-if="v_statusconclusionE == 'Diferido' || v_statusconclusionE == 'Inmediato'">
                                                    <v-data-table
                                                        :headers="headers4"
                                                        :items="v_especieP"
                                                        class="elevation-1"
                                                    >                                                        
                                                        <template v-slot:items="props">
                                                            <tr  :class="{'selected_row': indexRowE === props.index}">
                                                                <td v-if="props.item.type == 'unico'">{{ props.item.es[0].objeto }}</td>
                                                                <!-- RENDERIZADO DE LOS PAGOS CON PERIODOS -->
                                                                <td v-if="props.item.type == 'diverso'">
                                                                    <v-flex v-for="(e, index) in props.item.total" :key="index">
                                                                            {{ e.objeto }}                                                             
                                                                    </v-flex>                                                                
                                                                </td>                                                      
                                                                <td v-if="props.item.type == 'diverso'">
                                                                    <v-flex v-for="(es, index) in props.item.es" :key="index">
                                                                            {{ es.cantidad }}                                                             
                                                                    </v-flex>                                                                
                                                                </td>                                                      
                                                                <td v-if="props.item.type == 'diverso'">
                                                                    <v-flex v-for="es in props.item.es" :key="es.fecha">
                                                                            {{ es.fecha }}                                                                
                                                                    </v-flex>                                                                
                                                                </td>                                         
                                                                <!-- RENDERIZADO DE LOS PAGOS SIN PERIODOS Y FECHAS FIJAS -->             
                                                                <td v-if="props.item.type == 'unico'">{{ props.item.es[0].cantidad }}</td>
                                                                <td v-if="props.item.type == 'unico'">{{ props.item.es[0].fecha }}</td>
                                                                <!-- BOTONES DE OPERACIONES -->
                                                                <td><v-icon mx-5 @click="UpdateES(props.item.type == 'unico' ? 1 : 2, props.index)">edit</v-icon><v-icon v-if="v_statusconclusionE=='Diferido'" mx-5 @click="DeleteES(props.index)">delete</v-icon></td>
                                                            </tr>
                                                        </template>
                                                        <!-- FILA EN CASO DE NO EXISTIR NINGÚN REGISTRO -->
                                                        <template v-slot:no-data colspan="4" class="text-md-center">
                                                            <td :colspan="4" class="text-md-center">Sin Especie o Servicio registrados</td>
                                                        </template>
                                                    </v-data-table>
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>
                                        <!-- TABLA DE VISUALIZACIÓN DE LOS CONJUNTOS O DATOS PARA SELECCIÓN -->
                                        <v-flex xl12 lg12 md12 sm12 xs12 mb-2 v-if="documenttype != '' || v_createAttached || v_editAttached">
                                            <v-card v-if="istypeconjunt" elevation="0">
                                                <v-card-text v-if="createagreement">
                                                    <v-data-table :headers="headers" :items="conjuntosGlobales" v-if="!v_createAttached">
                                                        <template slot="items" class="white" slot-scope="props">
                                                            <td>{{ props.index + 1 }}</td>                                               
                                                            <td v-html="formatText(props.item.nombreS)" class="pt-3"></td>
                                                            <td v-html="formatText(props.item.nombreR)" class="pt-3"></td>
                                                            <td v-html="formatText(props.item.nombreD)" class="pt-3"></td>
                                                            <td class="pt-3">
                                                                <v-switch label="Seleccionar" @change="(target) => { toggleConjunt(props, target) }" :disabled="validateToSelectConjunt() ? (cambio==0?disa:(props.index+1)==cambio ? disa: '') : ''" color="success"></v-switch>
                                                            </td>
                                                        </template>
                                                    </v-data-table>
                                                    <v-data-table :headers="headers2" :items="conjuntSelected" v-if="v_createAttached">
                                                        <template slot="items" class="white" slot-scope="props">
                                                            <td>{{ props.index + 1 }}</td>                                               
                                                            <td v-html="formatText(props.item.nombreS)" class="pt-3"></td>                                            
                                                            <td v-html="formatText(props.item.nombreR)" class="pt-3"></td>
                                                            <td v-html="formatText(props.item.nombreD)" class="pt-3"></td>                                                            
                                                        </template>
                                                    </v-data-table>
                                                </v-card-text>
                                                <v-card-text v-else>
                                                    <v-data-table :headers="headers2" :items="editConjunt">
                                                        <template slot="items" class="white" slot-scope="props">
                                                            <td>{{ props.index + 1 }}</td>                                               
                                                            <td v-html="formatText(props.item.nombreS ? props.item.nombreS : props.item.nombreSolicitante)" class="pt-3"></td>                                            
                                                            <td v-html="formatText(props.item.nombreR ? props.item.nombreR : props.item.nombreRequerdio)" class="pt-3"></td>
                                                            <td v-html="formatText(props.item.nombreD ? props.item.nombreD : props.item.delitos)" class="pt-3"></td>                                                            
                                                        </template>
                                                    </v-data-table>
                                                </v-card-text>
                                            </v-card>
                                            <v-card v-else elevation="0">
                                                <v-card-text v-if="createagreement">
                                                        <table class="my-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Conjunto</th>
                                                                    <th>Solicitante (s)</th>
                                                                    <th>Requerido (s)</th>
                                                                    <th>Delitos (s)</th>
                                                                    <th>Agregar</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td v-html="formatText(v_nombresSolicitantesF)"></td>
                                                                    <td v-html="formatText(v_nombresRequeridosF)"></td>
                                                                    <td v-html="formatText(v_nombresDelitosF)"></td>
                                                                    <td><v-switch label="Seleccionar" @change="(target) => { toggleConjunt(props, target) }" :disabled="cambio==0?disa:(props.index+1)==cambio ? disa: ''" color="success"></v-switch></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                </v-card-text>
                                                <v-card-text v-else>
                                                        <table class="my-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Conjunto</th>
                                                                    <th>Solicitante (s)</th>
                                                                    <th>Requerido (s)</th>
                                                                    <th>Delitos (s)</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td v-html="formatText(v_nombresSolicitantesF)"></td>
                                                                    <td v-html="formatText(v_nombresRequeridosF)"></td>
                                                                    <td v-html="formatText(v_nombresDelitosF)"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>   
                                        <!-- INPUT PARA VALIDACIÓN DE PERSONA QUE FIRMARÁ EL ACUERDO REPARATORIO -->
                                        <v-flex xl12 lg12 md12 sm12 xs12 v-if="documenttype != '' || v_createAttached || v_editAttached">
                                            <v-card elevation="0">
                                                <v-card-text>
                                                    <v-text-field v-model="nameSignatureUser" label="Usuario que firma"></v-text-field>
                                                </v-card-text>
                                                <v-card-text>
                                                    <v-text-field v-model="employmentUser" label="Puesto del usuario"></v-text-field>
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>
                                        <!-- ESPACIO PARA EDICIÓN DE PDF Y PREVISUALIZACIÓN -->
                                        <v-flex xl12 lg12 md12 sm12 xs12 mt-4  v-if="documenttype != '' || v_createAttached || v_editAttached">
                                            <v-card elevation="0">
                                                <!-- BOTÓN PARA PREVISUALIZACIÓN -->
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn 
                                                            slot="activator" 
                                                            v-on="on" 
                                                            @click.native="mostrarpdf" 
                                                            absolute 
                                                            dark 
                                                            small 
                                                            fab 
                                                            top 
                                                            right 
                                                            color="primary"
                                                            class="py-2"
                                                        >
                                                            <v-icon>remove_red_eye</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>Vista previa</span>
                                                </v-tooltip>
                                                <!-- FRAGMENTO PARA EDICIÓN DE TEXTO -->
                                                <v-card-text>
                                                    <h3>Texto para libre edición:</h3>
                                                    <v-divider />
                                                    <vue-editor
                                                        outline  
                                                        height=320px;
                                                        :editorToolbar="customToolbar"
                                                        v-model="v_textoAR" 
                                                        style="max-height: 310px; overflow-y: scroll"
                                                    />
                                                    <v-divider />
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>                      
                    </v-layout>
                </v-container>                                    
            </v-card>
        </v-flex>
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <!-- VISTA DE PREVISUALIZACIÓN DE PDF -->
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <v-dialog v-model="framePDF" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer /> 
                    <v-toolbar-items>
                        <v-btn v-if="createagreement || v_createAttached || editagreement" color=success text @click.native="guardar">Guardar e imprimir</v-btn>
                        <v-btn icon @click="framePDF = false; Rprint = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <iframe id="iframepdfAR1" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no" />
                </v-card-text>
            </v-card>
        </v-dialog>        
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <!-- VISTA PARA COLOCAR EL SISE -->
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <v-dialog v-model="dialogSISE" max-width="700px">
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar size="30">
                        <v-icon class="grey lighten-2">add</v-icon>
                    </v-avatar>
                    <v-toolbar-title class="subheading">Actualizacion del SISE</v-toolbar-title>
                    <v-spacer />
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <h3>No de expediente: {{ this.noExpediente }}</h3>
                                    <br>
                                    <v-text-field
                                        label="Número SISE"
                                        outline
                                        type="number"
                                        v-model="v_nosise"
                                        @input="validacionSise()"
                                    />
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn @click.native="dialogSISE=false">Cancelar</v-btn>
                            <v-btn @click.native="actualizarsise()" class="success" :disabled="!siseCorrect" >Guardar</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-layout>
</template>
<script>
    //Librería para realizar las peticiones HTTP a la API
    import axios from 'axios'
    //Componentes
    import n401 from '../../components/m_jr/401'
    import n403 from '../../components/m_jr/403'
    import moment from 'moment'
    import 'moment/locale/es';
    import alertify from 'alertifyjs';
    import colors from 'vuetify/es5/util/colors'
    import { VueEditor } from "vue2-editor";
    import DualListBox from "dual-listbox-vue";
    import "dual-listbox-vue/dist/dual-listbox.css";
    import { NumberAsString } from './NumerosLetras.js'
    import QRCode from "qrcode";
    import { generarQRCodeBase64 } from './crearQR';  
import { computed } from 'vue';
    
export default {
    components: {
        n401,
        n403,
        "vue2-editor": VueEditor,
        DualListBox
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
    data: function () {
        return {
            //* Valores iniciales para los componentes importados
            e401: false,
            e403: false,
            showpage: true,
            requiredSwitch: true,
            //* Configuraciones para tablas
            customToolbar: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                ['align', { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'color': [] }, { 'background': [] }],
            ],
            headers: [
                { text: 'Conjunto', value: 'conjunto' },
                { text: 'Solicitante (s)', value: 'solicitante' },
                { text: 'Requerido (s)', value: 'requerido' },

                { text: 'Delito (s)', value: 'delitos' },
                { text: 'Agregar', value: 'agregar' },
            ],
            headers2: [
                { text: 'Conjunto', value: 'conjunto' },
                { text: 'Solicitante (s)', value: 'solicitante' },
                { text: 'Requerido (s)', value: 'requerido' },

                { text: 'Delito (s)', value: 'delitos' },
            ],
            headers3: [
                {text: 'No. pago', value: 'pago'},
                {text: 'Monto', value: 'monto'},
                {text: 'Fecha y Hora', value: 'fecha'},
                {text: 'Opciones', value: 'opciones'},
            ],
            headers4: [
                {text: 'Especie / Servicio', value: 'especie'},
                {text: 'Cantidad', value: 'cantidad'},
                {text: 'Fecha y Hora', value: 'fecha'},
                {text: 'Opciones', value: 'opciones'},
            ],
            //* Variables para información del expediente
            u_iddistrito: '',
            u_distrito: '',
            u_dirSubPro: '',
            u_idagencia: '',
            u_agencia: '',
            u_idmoduloservicio: ' ',
            u_modulo: '',
            u_idusuario: '',
            u_nombre: '',
            u_clave: '',
            u_rol: '',
            u_puesto: '',
            u_email: '',
            envioId: '',
            expedienteId: '',
            noExpediente: '',
            noDerivacion: '',
            fechaExpediente: '',
            nuc: '',
            fechaHoraSuceso: '',
            StatusGeneral: '',
            EspontaneoNoEspontaneo: '',
            primeraVezSubsecuente: '',
            NoSolicitantes: '',
            istypeconjunt: true,
            nameSignatureUser: '',
            employmentUser: '',
            siseCorrect: false,
            //* Variables para modal
            dialogSISE: false,
            //* Variables para fase de conjuntos
            cantidaddeconjuntos: 0,
            cambio: 0,
            indexRow: -1,
            indexRowE: -1,
            idConjunt: '',
            disa: false,
            existsagreement: false,
            createagreement: false,
            editagreement: false,
            conjuntSelected: [],
            conjuntosGlobales: [],
            conjuntsWithAgreement: [],
            cumplimientoRespeto: false,
            editConjunt: [],  
            printConjunt: [],
            documenttype: '',
            tggA: -1,
            types: [
                { text: "ACUERDO REPARATORIO", value: 'ACUERDO REPARATORIO' },
                { text: "PLAN DE REPARACIÓN", value: 'PLAN DE REPARACIÓN' }  
            ],
            //* Variables para fase sin conjuntos
            v_requeridosF: [],
            v_solicitantesF: [],            
            v_delitosF: [],
            v_agreement: [],
            v_nombresRequeridosF: '',
            v_idsRequeridosF: '',
            v_nombresSolicitantesF: '',
            v_idsSolicitantesF: '',
            v_nombresDelitosF: '',
            //* Variables de acuerdo reparatorio
            v_idAcuerdoReparatorio: '',
            v_textoAR: '',
            v_fechacelebracion: '',
            v_fechac: '',
            v_horacelebracion: '',
            v_metodoutilizado: '',
            v_fechalimite: '',
            v_fechal: '',
            v_nosise: '',
            v_horacita: '',
            v_solicitantes: '',
            v_statusPDF: '',
            v_requeridos: '',            
            v_delitos: '',
            vtxtformat: '',
            v_solicitanteFM: '',
            v_createAttached: false,
            v_editAttached: false,
            v_ado: false,
            v_RJR: true,
            v_RCAT: true,
            Rprint: false,
            v_requeridoFM: '',
            v_representantes: [],
            v_solicitanteR: false,
            v_requeridoR: false,
            v_idsSRR: [],
            v_menu1: false,
            v_showCant: false,
            v_showEspecie: false,
            v_menu3: false,
            v_menu2: false,
            v_menu4: false,
            v_Csession: false,
            v_statusconclusiones: ['Diferido', 'Inmediato'],
            v_tipospagos: ['Dinero', 'Especie', 'Respeto'],
            v_metodosutilizados: ['Mediación', 'Conciliación', 'Junta restaurativa'],
            v_periodos: [
                { text: "Diario", value: 1 },
                { text: "Semanal", value: 7 },
                { text: "Quincenal", value: 15 },
                { text: "Mensual", value: 30 }
            ],
            v_personInfoS: [],
            v_personInfoR: [],
            v_factionInfo: [],
            v_nombresJR: [],
            v_tipopago: '',
            v_statusconclusionF: '',
            v_especies: '',
            textoQR: '',
            texto: 'Vista Previa',
            qrCode: '',
            docRemision: 'Remisión',
            vistaPreviaTF: true,
            //~ Variables para registro de pago
            v_periodo: 1,
            v_fechacelebracionPI: '',
            v_fechacelebracionPD: '',
            v_fechaPI: '',
            v_fechaPD: '',
            v_cantidadTotal: 0,
            v_cantidadmonto: 0,
            v_parcialidadesTotales: 0,
            v_statusconclusion: '',
            v_horacelebracionPI: '',
            v_horacelebracionPD: '',
            v_menuFPI: false,
            v_menuFPD: false,
            v_menuHPI: false,
            v_menuHPD: false,
            v_editPayment: false,
            v_indexPayment: -1,
            v_payments: [],
            noparcialidad: 1,
            //~ Variables para registro de especie
            v_especie: '',
            v_periodoE: 1,
            v_fechacelebracionEI: '',
            v_fechacelebracionED: '',
            v_horacelebracionEI: '',
            v_horacelebracionED: '',            
            v_statusconclusionE: '',
            v_fechaEI: '',
            v_fechaED: '',
            v_cantidadTotalE: 0,
            v_cantidadE: 0,
            v_especieServicio: '',
            v_menuFEI: false,
            v_menuFED: false,
            v_menuHEI: false,
            v_menuHED: false,
            v_editEspecie: false,
            v_indexEspecie: -1,
            v_especieP: [],
            noparcialidadE: 1,
            //* Variables para mostrar la previsualización del PDF
            framePDF: false,
            vialidad:'',
            vialidades:[]
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
    created() {
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
            me.$alert('Notificación', 'Aun no ha abierto ninguna expediente por favor ingrese al menu Mis expedientes y luego en Mi lista de expedientes asignados y ahi abra la expediente que usted elija!. En este momento sera redireccionado al menu correspondiente.',
                function () {
                    if (me.u_rol == 'Facilitador' || me.u_rol == "Notificador") {
                        me.$router.push('./jr-misexpedientes')
                    } else {
                        me.$router.push('./jr-expedientesaceptados')
                    }
                })
        } else {
            //Alerta de apertura de expediente
            me.$notify('Expediente abierto correctamente !!!', 'success')
            //Sobreescritura de variables con respecto al store de los datos del usuario
            me.u_iddistrito = me.$store.state.usuario.iddistrito;
            me.u_distrito = me.$store.state.usuario.distrito;
            me.u_dirSubPro = me.$store.state.usuario.dirSubProc;
            me.u_idagencia = me.$store.state.usuario.idagencia;
            me.u_agencia = me.$store.state.usuario.agencia;
            me.u_idmoduloservicio = me.$store.state.usuario.idmoduloservicio;
            me.u_modulo = me.$store.state.usuario.modulo;
            me.u_idusuario = me.$store.state.usuario.idusuario;
            me.u_nombre = me.$store.state.usuario.usuario;
            me.nameSignatureUser =  me.$store.state.usuario.usuario
            me.u_clave = me.$store.state.usuario.clave;
            me.u_rol = me.$store.state.usuario.rol;
            me.u_puesto = me.$store.state.usuario.puesto;
            me.employmentUser = me.$store.state.usuario.puesto
            me.u_email = me.$store.state.usuario.email;
            me.envioId = me.$store.state.idEnvio;
            me.noExpediente = me.$store.state.noExpediente;
            //Funciones iniciales
            me.listarLogo();
            me.informacionagencia();
            me.informacionExpediente();
            me.tipoExpediente();
            me.listarVialidad();
        }
        //Interceptores de modulo de justicia restaurativa
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
    watch: {
        v_personInfoS(val) {       
            let me = this 
            
            if (!me.Rprint && me.tggA == -1) {            
                if(val.length != 0) this.cargartexto()                                                                
            }            

            if (me.v_createAttached) {
              me.cargartexto()  
            }
        },
        v_personInfoR(val) {            
            let me = this

            if (!me.Rprint && me.tggA == -1) {
                if (val.length != 0) this.cargartexto()
            }

            if (me.v_createAttached) {
              me.cargartexto()  
            }
        },
        v_statusconclusion(val, val2) {
            let me = this

            me.v_fechacelebracionPI = moment().format('DD/MM/YYYY')
            me.v_horacelebracionPI = moment().format('HH:mm')                        
            me.v_fechacelebracionPD = moment().format('DD/MM/YYYY')
            me.v_horacelebracionPD = moment().format('HH:mm')      
            
            if (val2 != '') {
                me.v_payments = []    
                me.noparcialidad = 1
                me.v_cantidadmonto = 0
                me.v_fechalimite = ''
                me.v_horacita = ''
            }

            if (me.v_createAttached) {
              me.cargartexto()  
            }

            me.v_factionInfo = []
        },
        v_statusconclusionE(val, val2) {
            let me = this

            me.v_fechacelebracionEI = moment().format('DD/MM/YYYY')
            me.v_horacelebracionEI = moment().format('HH:mm')                        
            me.v_fechacelebracionED = moment().format('DD/MM/YYYY')
            me.v_horacelebracionED = moment().format('HH:mm')  
            me.v_cantidadE = 0
            me.v_especieServicio = '' 

            if (val2 != '') {
                me.v_especieP = []   
                me.noparcialidadE = 1 
                me.v_cantidadE = 0            
            }
            if (me.v_createAttached) {
              me.cargartexto()  
            }

            me.v_factionInfo = []
        },
        v_tipopago(val) {

            let me = this

            if (!val.includes("Dinero")) {
                me.v_statusconclusion = ''
            }

            if (!val.includes("Especie")) {
              me.v_statusconclusionE = ''  
            }
        },
        v_RJR(val) {
            let me = this

            if(!val) me.representantCAT()            
        },
        v_payments() {
            let me = this

            if (this.v_createAttached) {
                me.cargartexto()  
            }                        
        }, 
        createagreement(val) {
            let me = this

            if (me.createagreement) {
              me.tggA = -1  
            }
        }
    },
    beforeDestroy() {
        this.detachValidator()
    },
    methods: {
        //* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //* FUNCIONES GENERALES DE INFORMACIÓN
        //* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------        
        //? Función encargada de generar una petición y obtener los logos para la generación de PDF
        listarLogo() {
            let me = this;
            this.$conf.get('api/ConfGlobals/Listar').then(function (response) {
                me.logo3 = response.data.logo3;
                me.logo4 = response.data.logo4;
            }).catch(function (error) {
                if (error.response.status == 400) {
                    me.$notify("No es un usuario válido", 'error')
                } else if (error.response.status == 401) {
                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                    me.e401 = true,
                        me.showpage = false
                } else if (error.response.status == 403) {
                    me.$notify("No esta autorizado para ver esta página", 'error')
                    me.e403 = true
                    me.showpage = false
                } else if (error.response.status == 404) {
                    me.$notify("El recuso no ha sido encontrado", 'error')
                } else {
                    me.$notify('Error al intentar listar los registros ', 'error')
                }
            });
        }, 
        //? Función encargada de generar una petición y obtener la información de la agencia correspondiente al usuario logeado 
        informacionagencia() {
            let me = this;
            let header = { "Authorization": "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };
            me.$conf.get('api/Agencias/Listarporid/' + me.u_idagencia, configuracion).then(function (response) {
                me.direccionAgencia = response.data.direccion;
                me.telefonosAgencia = response.data.telefono;
                me.contactoDSP = response.data.contacotDirSub;
                me.nombreDSP = response.data.nombreDirSub;
                me.nombreDistrito = response.data.nombreDistrito;
                me.cargoResponsable = response.data.cargoResponsable
            }).catch(function (error) {
                if (error.response.status == 400) {
                    me.$notify("No es un usuario válido", 'error')
                } else if (error.response.status == 401) {
                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                    me.e401 = true,
                        me.showpage = false
                } else if (error.response.status == 403) {
                    me.$notify("No esta autorizado para ver esta página", 'error')
                    me.e403 = true
                    me.showpage = false
                } else if (error.response.status == 404) {
                    me.$notify("El recuso no ha sido encontrado", 'error')
                } else {
                    me.$notify('Error al intentar listar los registros', 'error')
                }
            });
        },
        //? Función encargada de generar una petición y obtener la informaión general del expediente
        informacionExpediente() {
            let me = this;
            let header = { "Authorization": "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };
            me.$justiciarestaurativa.get('api/Envios/InformacionExpediente/' + me.expedienteId + "/" + me.envioId, configuracion).then(function (response) {
                me.noDerivacion = response.data.noDerivacion;
                me.fechaExpediente = response.data.fechaRegistroExpediente;
                me.fechaHoraSuceso = response.data.fechaHoraSuceso;
                me.nuc = response.data.nuc;
                me.StatusGeneral = response.data.statusGeneral;
                me.EspontaneoNoEspontaneo = response.data.espontaneoNoEspontaneo;
                me.primeraVezSubsecuente = response.data.primeraVezSubsecuente;
                me.NoSolicitantes = response.data.noSolicitantes;
                me.uqe_Agencia = response.data.uqe_Agencia;
                me.uqe_Modulo = response.data.uqe_Modulo;
                me.uqe_Nombre = response.data.uqe_Nombre;
                me.uqe_Puesto = response.data.uqe_Puesto;
                me.reseñaBreve = response.data.reseñaBreve;
            }).catch(function (error) {
                if (error.response.status == 400) {
                    me.$notify("No es un usuario válido", 'error')
                } else if (error.response.status == 401) {
                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                    me.e401 = true,
                        me.showpage = false
                } else if (error.response.status == 403) {
                    me.$notify("No esta autorizado para ver esta página", 'error')
                    me.e403 = true
                    me.showpage = false
                } else if (error.response.status == 404) {
                    me.$notify("El recuso no ha sido encontrado", 'error')
                } else {
                    me.$notify('Error al intentar listar los registros', 'error')
                }
            });
        },         
        //? Funciónm encargada de cerrar la vista del expediente y retornar al listado de expedientes para selección
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
        //* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //* FUNCIONES PARA USO DE CONJUNTOS
        //* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //? Función encargado de generar una petición y determinar si el expediente esta generado por conjuntos o de la forma general                
        tipoExpediente() {
            let me = this
            let header = { "Authorization": "Bearer " + me.$store.state.token }   
            let configuration = { headers: header }
            me.$justiciarestaurativa.get(`api/AcuerdoReparatorios/isTypeConjunt/${me.envioId}`, configuration)
                .then((response) => {
                    if (response.data.type) {
                        me.ExistenAcuerdos()
                        me.encuentraConjuntos()
                    }else{
                        me.istypeconjunt = false
                        me.ExistenAcuerdos()
                        me.listarSolicitantesRequeridos()
                        me.listardelitos()
                    }
                })
                .catch(function (error) {
                    if (error.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (error.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                            me.showpage = false
                    } else if (error.response.status == 403) {
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403 = true
                        me.showpage = false
                    } else if (error.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros ', 'error')
                    }
                });
        },
        //? Función encargada de generar una petición y obtener los conjuntos del expediente que aún no cuenten con un acuerdo
        encuentraConjuntos() {
            let me = this;
            let header = { "Authorization": "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };
            me.$justiciarestaurativa.get(`api/AcuerdoReparatorios/ListarConjuntos/${me.envioId}`, configuracion)
                .then((response) => {                               
                    me.cantidaddeconjuntos = response.data.length
                    me.conjuntosGlobales = response.data                    
                })
                .catch(function (error) {
                    if (error.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (error.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                            me.showpage = false
                    } else if (error.response.status == 403) {
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403 = true
                        me.showpage = false
                    } else if (error.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros ', 'error')
                    }
                });
        },
        //? Función encargada de generar una petición y conocer si existen acuerdos generados para el expediente
        ExistenAcuerdos() {
            let me = this;
            let header = { "Authorization": "Bearer " + me.$store.state.token }
            let configuration = { headers: header }

            me.$justiciarestaurativa.get(`api/AcuerdoReparatorios/CheckSessions/${me.envioId}`, configuration)                    
                .then(response => {
                    if (response.data.c) {
                        me.v_Csession = true                                
                        me.$justiciarestaurativa.get(`api/AcuerdoReparatorios/ExistsAR/${me.envioId}`, configuration)
                            .then((response) => {
                                let r = response.data
                                if (r.status && r.cantidad != 0) {
                                    if(me.istypeconjunt){                                        
                                        me.$justiciarestaurativa.get(`api/AcuerdoReparatorios/ListarConjuntosCA/${me.envioId}`, configuration)
                                        .then(res => {
                                            me.conjuntsWithAgreement = res.data
                                            me.existsagreement = true                                                
                                        })
                                        .catch(function (error) {
                                            if (error.response.status == 400) {
                                                me.$notify("No es un usuario válido", 'error')
                                            } else if (error.response.status == 401) {
                                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                                me.e401 = true,
                                                    me.showpage = false
                                            } else if (error.response.status == 403) {
                                                me.$notify("No esta autorizado para ver esta página", 'error')
                                                me.e403 = true
                                                me.showpage = false
                                            } else if (error.response.status == 404) {
                                                me.$notify("El recuso no ha sido encontrado", 'error')
                                            } else {
                                                me.$notify('Error al intentar listar los registros ', 'error')
                                            }
                                        });
                                    }else{
                                        me.existsagreement = true
                                        me.$justiciarestaurativa.get(`api/AcuerdoReparatorios/ListaAR/${me.envioId}`, configuration)
                                            .then(res => {
                                                me.v_agreement.push(res.data)
                                            })
                                    }
                                } else {
                                    me.existsagreement = false                                                 
                                }
                            })
                            .catch(function (error) {
                                if (error.response.status == 400) {
                                    me.$notify("No es un usuario válido", 'error')
                                } else if (error.response.status == 401) {
                                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                    me.e401 = true,
                                        me.showpage = false
                                } else if (error.response.status == 403) {
                                    me.$notify("No esta autorizado para ver esta página", 'error')
                                    me.e403 = true
                                    me.showpage = false
                                } else if (error.response.status == 404) {
                                    me.$notify("El recuso no ha sido encontrado", 'error')
                                } else {
                                    me.$notify('Error al intentar listar los registros ', 'error')
                                }
                            });
                    } else {
                        me.$alert('Notificación', 'No es posible celebrar un Acuerdo reparatorio ya qué aún no ha concluido una sesión satisfactoria.',
                            function () {
                                me.$router.push('./sesiones')
                            },
                        ).set('labels', { ok: 'Ok' });
                    }
                })   
                .catch(function (error) {
                    if (error.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (error.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                            me.showpage = false
                    } else if (error.response.status == 403) {
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403 = true
                        me.showpage = false
                    } else if (error.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros ', 'error')
                    }
                });
        }, 
        //? Función encargada de habilitar o deshabilitar los toggle button de los conjuntos
        toggleConjunt(pp = [], target) { 
            let me = this      
            if (target) {                    
                if (me.istypeconjunt) {                
                    me.cambio == (pp.index + 1) ? me.cambio = 0 : me.cambio = pp.index + 1
                    me.idConjunt = pp.item.idConjuntoDerivaciones;
                    me.conjuntSelected = pp.item
                    let idsClaimant = pp.item.requeridosC.split(';')
                    let nameClaimant = pp.item.nombreR.split(';')
                    let idsRespondent = pp.item.solicitadosC.split(';')
                    let nameRespondent = pp.item.nombreS.split(';')
        
                    idsRespondent.map((respondent, index) => {                        
                        me.listardireccionSol(respondent, nameRespondent[index].trim())
                        me.v_idsSRR.push(respondent.trim())
                    })
                    
                    idsClaimant.map((claimant, index) => {
                        me.listardireccionReq(claimant, nameClaimant[index].trim())
                        me.v_idsSRR.push(claimant.trim())
                    })           
                    
                    me.representant()
                } else {
                    
                    let idsClaimant = me.v_idsRequeridosF.split(';')
                    let idsRespondent = me.v_idsSolicitantesF.split(';')
        
                    idsRespondent.map(respondent => {
                        me.listardireccionSol(respondent)
                    })
        
                    idsClaimant.map(claimant => {
                        me.listardireccionReq(claimant)
                    })
                }        

                me.statusConclusionFinal()                 
            } else {   
                me.cambio = 0
                me.disa = false             
                me.idConjunt = '';
                me.conjuntSelected = []
                me.v_solicitantesF = []
                me.v_nombresSolicitantesF = ''
                me.v_idsSolicitantesF = ''
                me.v_personInfoS = []
                me.v_requeridosF = []
                me.v_nombresRequeridosF = ''
                me.v_idsRequeridosF = ''
                me.v_personInfoR = []
            }
        },
        //* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //* FUNCIONES PARA USO DE EXPEDIENTE SIN CONJUNTOS
        //* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------              
        //? Función encargada de obtener las personas involucradas en la carpeta, sean solicitantes o requeridos
        listarSolicitantesRequeridos(){
            let me = this;
            let header = { "Authorization" : "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };            
            
            me.$justiciarestaurativa.get(`api/SolicitanteRequeridoes/ListarTodos/${me.envioId}`, configuracion)
                .then(function (response) {                     
                    let people = response.data
                    people.map(person => {                        
                        if (person.tipo == 'Solicitante') {
                            me.v_solicitantesF.push(person)
                            me.v_nombresSolicitantesF == '' ? me.v_nombresSolicitantesF += `${person.nombreCompleto}` : me.v_nombresSolicitantesF += `;${person.nombreCompleto}`
                            me.v_idsSolicitantesF == '' ? me.v_idsSolicitantesF += `${person.personaId}` : me.v_idsSolicitantesF += `;${person.personaId}`
                        } else {
                            me.v_requeridosF.push(person)
                            me.v_nombresRequeridosF == '' ? me.v_nombresRequeridosF += `${person.nombreCompleto}` : me.v_nombresRequeridosF += `;${person.nombreCompleto}`
                            me.v_idsRequeridosF == '' ? me.v_idsRequeridosF += `${person.personaId}` : me.v_idsRequeridosF += `;${person.personaId}`
                        }
                    })
                })
                .catch(function (error) {
                    if (error.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (error.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (error.response.status == 403) {
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403 = true
                        me.showpage = false
                    } else if (error.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros', 'error')
                    }
                });                
        },
        //? Función encargada de obtener todos los delitos registrados del expediente
        listardelitos () {
            let me = this;
            let header = { "Authorization" : "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };
                        
            me.$justiciarestaurativa.get('api/Delitoes/ListarDelitos/' + me.envioId, configuracion)
                .then(function (response) {
                    me.v_delitosF = response.data;
                    me.v_delitosF.map(delito => {
                        me.v_nombresDelitosF == '' ? me.v_nombresDelitosF += `${delito.nombreDelito}` : me.v_nombresDelitosF += `;${delito.nombreDelito}`
                    })
                })
                .catch(function (error) {
                    if (error.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (error.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage = false
                    } else if (error.response.status == 403) {
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403 = true
                        me.showpage = false
                    } else if (error.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros','error')
                    }
                });
        },
        //* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //* FUNCIONES GENERALES PARA CRUD DE INFORMACIÓN INTERMEDIA
        //* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------         
        //? Función encargada de generar la petición y obtener datos completos y de dirección de solicitantes
        listardireccionSol (persona, name) {
            let me = this;
            let header = { "Authorization" : "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };          
            
            me.v_personInfoS = []
            me.v_solicitanteFM = ''
            
            axios.all([
                me.$cat.get(`api/RAPs/Listarpersona/${persona}`, configuracion),
                me.$cat.get(`api/RAPs/ListarDP/${persona}`, configuracion),                
            ])
            .then(response => {                       
                let personInfo = response[0].data                
                let personAddress = response[1].data
                var fechaNac = ''
                if (personInfo.fechaNacimiento !== '') {
                    var dia = moment( me.istypeconjunt ? personInfo.fechaNacimiento.split('/').reverse().join('/') : personInfo.fechaNacimiento.split('/').reverse().join('/')).format("DD");
                    var mes = moment( me.istypeconjunt ? personInfo.fechaNacimiento.split('/').reverse().join('/') : personInfo.fechaNacimiento.split('/').reverse().join('/')).format('MMMM');
                    var año= moment( me.istypeconjunt ? personInfo.fechaNacimiento.split('/').reverse().join('/') : personInfo.fechaNacimiento.split('/').reverse().join('/')).format("YYYY");
                    fechaNac = dia + " de " + mes + " del " + año                                        
                } else {
                    fechaNac = '(dato no registrado)'
                }

                let vialidadEncontrada = me.vialidades.find(v => v.value == personAddress.tipoVialidad);
                let vialidad = vialidadEncontrada ? vialidadEncontrada.text : "";

                let addressString = `${vialidad} ${personAddress.calle} ${personAddress.noint} ${personAddress.noext} ${personAddress.localidad} ${personAddress.municipio} ${personAddress.estado} ${personAddress.pais} ${personAddress.cp}`                                      

                me.v_personInfoS.push({
                    personaId: personInfo.personaId,
                    nombreCompleto: name,
                    direccion: addressString,
                    nacionalidad: personInfo.nacionalidad,
                    entidadFederativa: personInfo.entidadFederativa,
                    edad: personInfo.edad,
                    curp : personInfo.curp,
                    fechaNacimiento: fechaNac,
                    estadoCivil: personInfo.estadoCivil,
                    nivelEstudio: personInfo.nivelEstudio,
                    docIdentificacion: personInfo.docIdentificacion,
                    ocupacion: personInfo.ocupacion,
                    sexo: personInfo.sexo
                });

                if(personInfo.edad < 18) me.v_ado = true            

                me.v_solicitanteFM === '' ? (personInfo.sexo == 'H' ? me.v_solicitanteFM = 'El' : me.v_solicitanteFM = 'La') : me.v_solicitanteFM = 'Los'                                  
            })            
            .catch(function(error) {
                me.$notify('Error al intentar leer los datos de la persona seleccionada !!!', 'error')
            });
        }, 
        //? Función encargada de generar la petición y obtener datos completos y de dirección de requeridos
        listardireccionReq (persona, name) {
            let me = this;
            let header = { "Authorization" : "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };
            
            me.v_personInfoR = []
            me.v_requeridoFM = ''

            axios.all([
                me.$cat.get(`api/RAPs/Listarpersona/${persona}`, configuracion),
                me.$cat.get(`api/RAPs/ListarDP/${persona}`, configuracion),                
            ])
            .then(response => {                 
                let personInfo = response[0].data                
                let personAddress = response[1].data
                var fechaNac = ''
                if (personInfo.fechaNacimiento !== '') {
                    var dia = moment( me.istypeconjunt ? personInfo.fechaNacimiento : personInfo.fechaNacimiento.split('/').reverse().join('/')).format("DD");
                    var mes = moment( me.istypeconjunt ? personInfo.fechaNacimiento : personInfo.fechaNacimiento.split('/').reverse().join('/')).format('MMMM');
                    var año= moment( me.istypeconjunt ? personInfo.fechaNacimiento : personInfo.fechaNacimiento.split('/').reverse().join('/')).format("YYYY");
                    fechaNac = dia + " de " + mes + " del " + año                                        
                } else {
                    fechaNac = '(dato no registrado)'
                }

                let vialidadEncontrada = me.vialidades.find(v => v.value == personAddress.tipoVialidad);
                let vialidad = vialidadEncontrada ? vialidadEncontrada.text : "";

                let addressString = `${vialidad} ${personAddress.calle} ${personAddress.noint} ${personAddress.noext} ${personAddress.localidad} ${personAddress.municipio} ${personAddress.estado} ${personAddress.pais} ${personAddress.cp}`

                me.v_personInfoR.push({
                    personaId: personInfo.personaId,
                    nombreCompleto: name,
                    direccion: addressString,
                    nacionalidad: personInfo.nacionalidad,
                    entidadFederativa: personInfo.entidadFederativa,
                    edad: personInfo.edad,
                    curp : personInfo.curp,
                    fechaNacimiento: fechaNac,
                    estadoCivil: personInfo.estadoCivil,
                    nivelEstudio: personInfo.nivelEstudio,
                    docIdentificacion: personInfo.docIdentificacion,
                    ocupacion: personInfo.ocupacion,
                    sexo: personInfo.sexo
                });

                if(personInfo.edad < 18) me.v_ado = true                
                me.v_requeridoFM === '' ? (personInfo.sexo == 'H' ? me.v_requeridoFM = 'El' : me.v_requeridoFM = 'La') : me.v_requeridoFM = 'Los'                                
            })
            .catch(function(error) {
                me.$notify('Error al intentar leer los datos de la persona seleccionada !!!', 'error')
            });          
        },
        //? Función para abrir el modal para actualizar el No de sise y recibir el nuevo valor
        sise (conjuntAgreement) {
            let me = this;
            me.v_nosise = conjuntAgreement.nosise
            me.v_idAcuerdoReparatorio = conjuntAgreement.idAcuerdoReparatorio
            me.dialogSISE = true;
        },
        //? Función que se encarga de realizar la petición PUT para actualizar el campo de No de sise con el nuevo ingresado
        actualizarsise () {
            let me = this;
            let header = { "Authorization" : "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };
            
            me.$justiciarestaurativa.put('api/AcuerdoReparatorios/Actualizarsise', {
                'idAcuerdoReparatorio': me.v_idAcuerdoReparatorio,
                'nosise': me.v_nosise,
            }, configuracion)
                .then(function (response) {
                    me.$notify('¡La información se guardo correctamente!', 'success')
                    me.dialogSISE = false;
                    me.v_nosise = "";
                    me.v_agreement = []
                    me.ExistenAcuerdos()
                })
                .catch(function (err) {                    
                    if (err.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status == 403) {
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403= true
                        me.showpage= false
                    } else if (err.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar actualizar el registro!!!', 'error')
                    }
                });
        },
        //? Función que se encarga de habilitar el modal de formulario para edición
        editarAR(conjuntAgreement, conjunt = []) {
            let me = this                                           

            me.editagreement = true
            
            if (conjuntAgreement.anexo != null || conjuntAgreement.anexo != '') {                
                me.v_editAttached = true                
            } 

            me.editConjunt.push(conjuntAgreement)
            me.v_statusconclusionF = JSON.parse(conjuntAgreement.statusConclusion) 
            me.v_statusconclusion = me.v_statusconclusionF.Dinero ? me.v_statusconclusionF.Dinero : '' 
            me.v_statusconclusionE = me.v_statusconclusionF.Especie ? me.v_statusconclusionF.Especie : '' 
            me.v_fechacelebracion = me.GetDate(conjuntAgreement.fechaCelebracionAcuerdo) 
            me.v_fechac = conjuntAgreement.fechaCelebracionAcuerdo.split('T')[0]
            me.v_tipopago = conjuntAgreement.tipoPago.split(" ")            
            me.v_horacelebracion = me.GetHour(conjuntAgreement.fechaCelebracionAcuerdo)
            me.v_metodoutilizado = conjuntAgreement.metodoUtilizado
            me.idConjunt = conjuntAgreement.conjuntoDerivacionesId
            me.v_idAcuerdoReparatorio = conjuntAgreement.idAcuerdoReparatorio            
            me.v_fechalimite = conjuntAgreement.fechaLimiteCumplimiento != null ? me.GetDate(conjuntAgreement.fechaLimiteCumplimiento) : ''
            me.v_fechal = conjuntAgreement.fechaLimiteCumplimiento != null ? conjuntAgreement.fechaLimiteCumplimiento.split('T')[0] : ''
            me.v_horacita = conjuntAgreement.fechaLimiteCumplimiento != null ? me.GetHour(conjuntAgreement.fechaLimiteCumplimiento) : ''            
            me.v_textoAR = conjuntAgreement.textoAR                         
            me.v_payments = conjuntAgreement.money ? JSON.parse(conjuntAgreement.money) :  JSON.parse(conjuntAgreement.moneyChain)
            me.v_especieP = conjuntAgreement.species ? JSON.parse(conjuntAgreement.species) : JSON.parse(conjuntAgreement.speciesChain)
            me.documenttype = conjuntAgreement.tipoDocumento
            me.nameSignatureUser = conjuntAgreement.uf_Nombre
            me.employmentUser = conjuntAgreement.uf_Puesto   
            me.consultarPagoSeleccionado()     

            let idsClaimant = []
            let nameClaimant = []
            let idsRespondent = []
            let nameRespondent = []

            if (me.istypeconjunt) {                
                idsClaimant = conjunt.length > 0 ? conjunt[0].requeridosC.split(';') : conjuntAgreement.requeridosC.split(';')                 
                nameClaimant = conjunt.length > 0 ? conjuntAgreement.nombreRequerdio.split(';') : conjuntAgreement.nombreR.split(';')                
                idsRespondent = conjunt.length > 0 ? conjunt[0].solicitadosC.split(';') : conjuntAgreement.solicitadosC.split(';')                 
                nameRespondent = conjunt.length > 0 ? conjuntAgreement.nombreSolicitante.split(';') : conjuntAgreement.nombreS.split(';')                

                idsRespondent.map((respondent, index) => {                                            
                    me.listardireccionSol(respondent, nameRespondent[index].trim())
                    if (!me.v_idsSRR.includes(respondent.trim())) {
                        me.v_idsSRR.push(respondent.trim())                        
                    }
                })
                
                idsClaimant.map((claimant, index) => {                    
                    me.listardireccionReq(claimant, nameClaimant[index].trim())
                    if (!me.v_idsSRR.includes(claimant.trim())) { 
                        me.v_idsSRR.push(claimant.trim())
                    }
                })                           
                
                me.representant()                
            } else {
                idsClaimant = me.v_idsRequeridosF.split(';')
                idsRespondent = me.v_idsSolicitantesF.split(';')
            }
        },
        //? Función encargada de generar la petición tipo POST para guardar los datos y generar el acuerdo reparatorio
        guardar() {                
            let me = this;
            let header = { "Authorization": "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };

            var typeString = "";
            me.v_tipopago.forEach(tipo => {
                if (tipo != '') {
                    typeString += `${tipo} `                    
                }
            });       

            me.vistaPreviaTF = false  
                        
            me.savePaymentsToDB()            
            me.especieFinal()
            
            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información.', function () {
                //Payload para POST de creación de acuerdo reparatorio       
                let payloadAR = []
                if(me.editagreement){
                    me.statusConclusionFinal()
                    payloadAR ={      
                        'idAcuerdoReparatorio' : me.v_idAcuerdoReparatorio,
                        'envioId': me.envioId,
                        'tipoDocumento': me.documenttype,
                        'statusCumplimiento': me.cumplimientoRespeto ? 'Cumplido' : 'En cumplimiento',
                        'tipoPago': typeString,
                        'metodoUtilizado': me.v_metodoutilizado,
                        'montoTotal': me.v_cantidadTotal,
                        'objectoEspecie':me.v_especies,
                        'noTotalParcialidades': me.v_parcialidadesTotales,
                        'periodo': me.v_periodo,
                        'money': JSON.stringify(me.v_payments),
                        'species': JSON.stringify(me.v_especieP),
                        'fechaCelebracionAcuerdo': me.v_fechac + ' ' + me.v_horacelebracion,
                        'fechaLimiteCumplimiento': me.v_fechal != '' ? `${me.v_fechal} ${me.v_horacita}` : '',
                        'uf_Distrito': me.u_distrito,
                        'uf_DirSubProc': me.u_dirSubPro,
                        'uf_Agencia': me.u_agencia,
                        'uf_Modulo': me.u_modulo,
                        'uf_Nombre': me.nameSignatureUser != me.u_nombre ? me.nameSignatureUser : me.u_nombre,
                        'uf_Puesto': me.employmentUser != me.u_puesto ? me.employmentUser : me.u_puesto,
                        'seguimientoCumplimientos': me.v_factionInfo,
                        'textoAR': me.v_textoAR,
                        'nombreSolicitante': me.istypeconjunt ? ( me.editagreement ? me.editConjunt[0].nombreS : me.conjuntSelected.nombreS ) : '',
                        'nombreRequerdio': me.istypeconjunt ? ( me.editagreement ? me.editConjunt[0].nombreR : me.conjuntSelected.nombreR ) : '',
                        'delitos': me.istypeconjunt ? ( me.editagreement ? me.editConjunt[0].nombreD : me.conjuntSelected.nombreD ) : '',
                        'nuc': me.nuc,
                        'noExpediente': me.noExpediente,
                        'statusConclusion': me.v_statusconclusionF
                    }  
                } else {
                    me.statusConclusionFinal()
                    if (me.v_createAttached) {
                        payloadAR ={                        
                            'envioId': me.envioId,
                            'tipoDocumento': me.documenttype,
                            'statusCumplimiento': me.cumplimientoRespeto ? 'Cumplido' : 'En cumplimiento',
                            'tipoPago': typeString,
                            'metodoUtilizado': me.v_metodoutilizado,
                            'montoTotal': me.v_cantidadTotal,
                            'objectoEspecie':me.v_especies,
                            'noTotalParcialidades': me.v_parcialidadesTotales,
                            'periodo': me.v_periodo,
                            'money': JSON.stringify(me.v_payments),
                            'species': JSON.stringify(me.v_especieP),
                            'fechaCelebracionAcuerdo': me.v_fechac + ' ' + me.v_horacelebracion,
                            'fechaLimiteCumplimiento': me.v_fechal != '' ? `${me.v_fechal} ${me.v_horacita}` : '',
                            'uf_Distrito': me.u_distrito,
                            'uf_DirSubProc': me.u_dirSubPro,
                            'uf_Agencia': me.u_agencia,
                            'uf_Modulo': me.u_modulo,
                            'uf_Nombre': me.nameSignatureUser != me.u_nombre ? me.nameSignatureUser : me.u_nombre,
                            'uf_Puesto': me.employmentUser != me.u_puesto ? me.employmentUser : me.u_puesto,
                            'seguimientoCumplimientos': me.v_factionInfo,
                            'textoAR': me.v_textoAR,
                            'nombreSolicitante': me.istypeconjunt ? ( me.editagreement ? me.editConjunt[0].nombreS : me.conjuntSelected[0].nombreS ) : me.v_nombresSolicitantesF,
                            'nombreRequerdio': me.istypeconjunt ? ( me.editagreement ? me.editConjunt[0].nombreR : me.conjuntSelected[0].nombreR ) : me.v_nombresRequeridosF,
                            'delitos': me.istypeconjunt ? ( me.editagreement ? me.editConjunt[0].nombreD : me.conjuntSelected[0].nombreD ) : me.v_nombresDelitosF,
                            'nuc': me.nuc,
                            'noExpediente': me.noExpediente,
                            'statusConclusion': me.v_statusconclusionF,
                            'Anexo': me.conjuntSelected[0].idAcuerdoReparatorio,
                            'StatusAnexo': 1
                        }                      
                    } else {
                        payloadAR ={                        
                            'envioId': me.envioId,
                            'tipoDocumento': me.documenttype,
                            'statusCumplimiento': me.cumplimientoRespeto ? 'Cumplido' : 'En cumplimiento',
                            'tipoPago': typeString,
                            'metodoUtilizado': me.v_metodoutilizado,
                            'montoTotal': me.v_cantidadTotal,
                            'objectoEspecie':me.v_especies,
                            'noTotalParcialidades': me.v_parcialidadesTotales,
                            'periodo': me.v_periodo,
                            'money': JSON.stringify(me.v_payments),
                            'species': JSON.stringify(me.v_especieP),
                            'fechaCelebracionAcuerdo': me.v_fechac + ' ' + me.v_horacelebracion,
                            'fechaLimiteCumplimiento': me.v_fechal != '' ? `${me.v_fechal} ${me.v_horacita}` : '',
                            'uf_Distrito': me.u_distrito,
                            'uf_DirSubProc': me.u_dirSubPro,
                            'uf_Agencia': me.u_agencia,
                            'uf_Modulo': me.u_modulo,
                            'uf_Nombre': me.nameSignatureUser != me.u_nombre ? me.nameSignatureUser : me.u_nombre,
                            'uf_Puesto': me.employmentUser != me.u_puesto ? me.employmentUser : me.u_puesto,
                            'seguimientoCumplimientos': me.v_factionInfo,
                            'textoAR': me.v_textoAR,
                            'nombreSolicitante': me.istypeconjunt ? ( me.editagreement ? me.editConjunt[0].nombreS : (me.v_createAttached ? me.conjuntSelected[0].nombreS : me.conjuntSelected.nombreS) ) : me.v_nombresSolicitantesF,
                            'nombreRequerdio': me.istypeconjunt ? ( me.editagreement ? me.editConjunt[0].nombreR : (me.v_createAttached ? me.conjuntSelected[0].nombreR : me.conjuntSelected.nombreR) ) : me.v_nombresRequeridosF,
                            'delitos': me.istypeconjunt ? ( me.editagreement ? me.editConjunt[0].nombreD : (me.v_createAttached ? me.conjuntSelected[0].nombreD : me.conjuntSelected.nombreD) ) : me.v_nombresDelitosF,
                            'nuc': me.nuc,
                            'noExpediente': me.noExpediente,
                            'statusConclusion': me.v_statusconclusionF,                        
                        }  
                    }
                }                                   

                if(me.createagreement){
                    me.$justiciarestaurativa.post('api/AcuerdoReparatorios/CrearAcuerdoReparatorio', payloadAR, configuracion)
                        .then((response) => {      
                            if(me.istypeconjunt && me.v_createAttached == false) {
                                me.$justiciarestaurativa.post('api/AcuerdoReparatorios/CrearAcuerdoConjunto',{
                                    'AcuerdoReparatorioId': response.data.idAcuerdoR,
                                    'ConjuntoDerivacionesId': me.conjuntSelected.idConjuntoDerivaciones
                                })                            
                            }                                
                            var dd1 = me.crearPdfConDatos();

                            var pdfMake = require('pdfmake/build/pdfmake.js')
                            var htmlToPdfmake = require("html-to-pdfmake");
                            if (pdfMake.vfs == undefined){
                                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                                pdfMake.vfs = pdfFonts.vfs;
                            }                                
                            var doc1 = pdfMake.createPdf(dd1).print();
                            me.fieldsBlank()
                            me.framePDF = false   
                        })
                        .then(() => {
                                me.encuentraConjuntos()                 
                                me.tipoExpediente()
                                me.ExistenAcuerdos() 
                        })
                        .catch((error) => {
                            if (error.response.status == 400) {
                                me.$notify("No es un usuario válido", 'error')
                            } else if (error.response.status == 401) {
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage = false
                            } else if (error.response.status == 403) {
                                me.$notify("No esta autorizado para ver esta página", 'error')
                                me.e403 = true
                                me.showpage = false
                            } else if (error.response.status == 404) {
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            } else {
                                me.$notify('Error al intentar crear el  registro!!!', 'error')
                            }
                        });         
                }

                if (me.editagreement) {
                    me.$justiciarestaurativa.put('api/AcuerdoReparatorios/ActualizarAcuerdoReparatorio', payloadAR, configuracion)
                        .then(response => {
                            if(response.data.update){
                                me.$justiciarestaurativa.delete(`api/AcuerdoReparatorios/Eliminar/${me.v_idAcuerdoReparatorio}`, configuracion)
                                    .then(respo => {
                                        if (respo.data.delete || respo.data.count == 0) {
                                            me.$justiciarestaurativa.post('api/AcuerdoReparatorios/CreateMonitoring', payloadAR, configuracion)
                                                .then(res => {
                                                    me.fieldsBlank()
                                                    me.framePDF = false
                                                })
                                                .then(() => {
                                                    me.encuentraConjuntos()                    
                                                    me.ExistenAcuerdos() 
                                                })
                                        }                            
                                    })
                                    .catch(function (error) {
                                        if (error.response.status == 400) {
                                            me.$notify("No es un usuario válido", 'error')
                                        } else if (error.response.status == 401) {
                                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                            me.e401 = true,
                                                me.showpage = false
                                        } else if (error.response.status == 403) {
                                            me.$notify("No esta autorizado para ver esta página", 'error')
                                            me.e403 = true
                                            me.showpage = false
                                        } else if (error.response.status == 404) {
                                            me.$notify("El recuso no ha sido encontrado", 'error')
                                        } else {
                                            me.$notify('Error al intentar listar los registros ', 'error')
                                        }
                                    });
                            }
                        })
                        .catch(error =>{
                            if (error.response.status == 400) {
                                me.$notify("No es un usuario válido", 'error')
                            } else if (error.response.status == 401) {
                                me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                                me.e401 = true,
                                me.showpage = false
                            } else if (error.response.status == 403) {
                                me.$notify("No esta autorizado para ver esta página", 'error')
                                me.e403 = true
                                me.showpage = false
                            } else if (error.response.status == 404) {
                                me.$notify("El recuso no ha sido encontrado", 'error')
                            } else {
                                me.$notify('Error al intentar crear el  registro!!!', 'error')
                            }
                        })
                }
            },
            function () {
                alertify.warning('Verifica la información')
            }).set('labels', { ok:'Guardar', cancel: 'Cancelar' });
        },        
        //? Función encargada mostrar otro campo dependiendo el valor seleccionado en el tipo de pago
        consultarPagoSeleccionado() {
            let me = this;

            if (me.v_tipopago.length != 0) {                
                me.v_tipopago.includes("Dinero") ? me.v_showCant = true : me.v_showCant = false
                me.v_tipopago.includes("Especie") ? me.v_showEspecie = true : me.v_showEspecie = false                                
            } else {
                me.v_showCant = false  
                me.v_showEspecie = false  
            }
        },        
        //? Función que se encarga de generar y almacenar los pagos temporalmente para operar con ellos
        parcialidades (type) {
            let me = this            

            let copyPayments = me.v_payments
            
            if (type == 1) { //* Bloque cuando el pago es de tipo INMEDIATO                    
                let template = {
                    type: 'unico',
                    pay: [
                        {
                            fecha: `${me.v_fechacelebracionPI} ${me.v_horacelebracionPI}`,
                            monto: typeof me.v_cantidadmonto != 'number' ? parseInt(me.v_cantidadmonto, 10) : me.v_cantidadmonto
                        }
                    ]
                } 

                if (me.v_indexPayment == -1) { //* Bloque para alamacenar un nuevo pago
                    me.v_payments.push(template)                    
                } else { //* Bloque para almacenar el pago modificado
                    copyPayments[me.v_indexPayment] = template  
                    me.v_payments = []                    
                    me.v_payments = [...copyPayments]
                    me.v_indexPayment = -1
                    me.indexRow = -1
                }

                //* Valores para limpiar la fecha y hora del registro de pagos de forma inmediata
                me.v_fechacelebracionPI = ''
                me.v_horacelebracionPI = ''

            } else { //* Bloque cuando el pago es de tipo DIFERIDO             

                var acumulado = 1;

                let fechatemporal = ''
                let horatemporal = ''   

                let copyPayments = me.v_payments

                if (me.noparcialidad == 1) { //* Bloque para pagos diferidos pero unicos

                    let template = {
                        type: 'unico',
                        pay: [
                            {
                                fecha: `${me.v_fechacelebracionPD} ${me.v_horacelebracionPD}`,
                                monto: typeof me.v_cantidadmonto != 'number' ? parseInt(me.v_cantidadmonto, 10) : me.v_cantidadmonto
                            }
                        ]
                    }

                    if (me.v_indexPayment == -1) { //* Bloque para almacenar el pago

                        me.v_payments.push(template)

                    } else { //* Bloque para almacenar el pago modificado

                        copyPayments[me.v_indexPayment] = template  
                        me.v_payments = []                    
                        me.v_payments = [...copyPayments]
                        me.v_indexPayment = -1
                        me.indexRow = -1

                    }                    
                    
                    //* Bloque para obtener la última fecha almacenada y utilizarla para el registro de nuevos pagos
                    if (me.v_payments.at(-1).type == 'unico') {//* Bloque para guardar la fecha de pago diferido unico                        

                        fechatemporal = moment(me.GetDateY(me.v_payments.at(-1).pay[0].fecha)).add(1, 'd').format('DD/MM/YYYY')

                    } else {//* Bloque para guardar la fecha de un pago diferido divero

                        fechatemporal = moment(me.GetDateY(me.v_payments.at(-1).pay.at(-1).fecha)).add(1, 'd').format('DD/MM/YYYY')

                    }

                    horatemporal = me.v_horacelebracionPD

                    me.v_fechacelebracionPD = fechatemporal
                    me.v_horacelebracionPD = horatemporal

                } else { //* Bloque para pagos diferidos y diversos

                    let div = []

                    let copyPayments = me.v_payments

                    //* Bloque para iterar las parcialidades y registrarlas  
                    for (var i = 0; i < me.noparcialidad; i++) {

                        var dias = ((i + acumulado) * me.v_periodo);                                                   
                        var nodia = moment(me.GetDateY(me.v_fechacelebracionPD)).add(dias,'days').isoWeekday()                                         
                        var addday = 0;

                        //* Condicionale para contar unicamente los días hábiles
                        if (nodia == 6) {
                            acumulado = acumulado + 2;
                            addday = 2;
                            dias = dias + addday
                        }
                        if (nodia == 7) {
                            acumulado = acumulado + 1;
                            addday = 1;
                            dias = dias + addday
                        }  

                        div.push({
                            fecha: `${moment(me.GetDateY(me.v_fechacelebracionPD)).add(dias,'d').format('DD/MM/YYYY')} ${me.v_horacelebracionPD}`,
                            monto: me.v_cantidadmonto / me.noparcialidad
                        })  

                    }                                        
                    
                    let template = {
                        type: 'diverso',
                        total: [{
                            monto: me.v_cantidadmonto,
                            parcialidad: me.noparcialidad,
                            periodo: me.v_periodo,
                            fecha: `${me.v_fechacelebracionPD} ${me.v_horacelebracionPD}`
                        }],
                        pay: div
                    }

                    if (me.v_indexPayment == -1) { //* Bloque para almacenar el nuevo pago

                        me.v_payments.push(template)

                    } else { //* Bloque para almacenar el pago modificado

                        copyPayments[me.v_indexPayment] = template  
                        me.v_payments = []                    
                        me.v_payments = [...copyPayments]
                        me.v_indexPayment = -1
                        me.indexRow = -1

                    }                    

                    if (me.v_payments.at(-1).type == 'unico') { //* Bloque para almacenar la última fecha registrada en caso de ser un pago diferido unico para usarla en el registro de nuevos pagos                                              

                        fechatemporal = moment(me.GetDateY(me.v_payments.at(-1).pay[0].fecha.split(" ")[0])).add(1, 'd').format('DD/MM/YYYY')
                        

                    } else { //* Bloque para almacenar la última fecha registrada en caso de ser un pago diferido diverso para usarla en el registro de nuevos pagos                        
                        
                        fechatemporal = moment(me.GetDateY(me.v_payments.at(-1).pay.at(-1).fecha.split(" ")[0])).add(1, 'd').format('DD/MM/YYYY')

                    }

                    horatemporal = div.at(-1).fecha.split(" ")[1]      

                    me.v_fechacelebracionPD = fechatemporal
                    me.v_horacelebracionPD = horatemporal
                }      

            }

            me.v_editPayment = false
            me.v_cantidadmonto = 0            
            me.v_menuFPI = ''            
            me.v_menuHPI = ''
            me.noparcialidad = 1
        },
        //? Función que se encarga de generar y almacenar los registro de especie o servicio a proporcionar
        parcialidadesE (type) {
            let me = this            

            let copyEspecie = me.v_especieP
            
            if (type == 1) {                            
                let template = {
                    type: 'unico',
                    es: [
                        {
                            fecha: `${me.v_fechacelebracionEI} ${me.v_horacelebracionEI}`,
                            cantidad: typeof me.v_cantidadE != 'number' ? parseInt(me.v_cantidadE, 10) : me.v_cantidadE,
                            objeto: me.v_especieServicio                            
                        }
                    ]
                } 

                if (me.v_indexEspecie == -1) {
                    me.v_especieP.push(template)                    
                } else {
                    copyEspecie[me.v_indexEspecie] = template  
                    me.v_especieP = []                    
                    me.v_especieP = [...copyEspecie]
                    me.v_indexEspecie = -1
                    me.indexRowE = -1
                }

                me.v_fechacelebracionEI = ''
                me.v_horacelebracionEI = ''

            } else {         

                var acumulado = 1;

                let fechatemporal = ''
                let horatemporal = ''   

                let copyEspecie = me.v_especieP

                if (me.noparcialidadE == 1) {

                    let template = {
                        type: 'unico',
                        es: [
                            {
                                fecha: `${me.v_fechacelebracionED} ${me.v_horacelebracionED}`,
                                cantidad: typeof me.v_cantidadE != 'number' ? parseInt(me.v_cantidadE, 10) : me.v_cantidadE,
                                objeto: me.v_especieServicio
                            }
                        ]
                    }

                    if (me.v_indexEspecie == -1) {
                        me.v_especieP.push(template)
                    } else {
                        copyEspecie[me.v_indexEspecie] = template  
                        me.v_especieP = []                    
                        me.v_especieP = [...copyEspecie]
                        me.v_indexEspecie = -1
                        me.indexRowE = -1
                    }                    
                    
                    if (me.v_especieP.at(-1).type == 'unico') {                         

                        fechatemporal = moment(me.GetDateY(me.v_especieP.at(-1).es[0].fecha)).add(1, 'd').format('DD/MM/YYYY')

                    } else {

                        fechatemporal = moment(me.GetDateY(me.v_especieP.at(-1).es.at(-1).fecha)).add(1, 'd').format('DD/MM/YYYY')

                    }
                    horatemporal = me.v_horacelebracionED

                    me.v_fechacelebracionED = fechatemporal
                    me.v_horacelebracionED = horatemporal

                } else {

                    let div = []

                    let copyEspecie = me.v_especieP
                    let cantidadInt = typeof me.v_cantidadE != 'number' ? parseInt(me.v_cantidadE, 10) : me.v_cantidadE
                    let noparcialidadInt = typeof me.noparcialidadE != 'number' ? parseInt(me.noparcialidadE, 10) : me.noparcialidadE                                        

                    for (var i = 0; i < me.noparcialidadE; i++) {                        
                        var dias = ((i + acumulado) * me.v_periodoE);                                                  
                        var nodia = moment(me.GetDateY(me.v_fechacelebracionED)).add(dias,'days').isoWeekday()                        
                        var addday = 0;
                        if (nodia == 6) {
                            acumulado = acumulado + 2;
                            addday = 2;
                            dias = dias + addday
                        }
                        if (nodia == 7) {
                            acumulado = acumulado + 1;
                            addday = 1;
                            dias = dias + addday
                        }

                        div.push({
                            fecha: `${moment(me.GetDateY(me.v_fechacelebracionED)).add(dias,'d').format('DD/MM/YYYY')} ${me.v_horacelebracionED}`,
                            cantidad: cantidadInt / noparcialidadInt
                            
                        })                        
                    }                                        
                    
                    let template = {
                        type: 'diverso',
                        total: [{
                            cantidad: me.v_cantidadE,
                            parcialidad: me.noparcialidadE,
                            objeto: me.v_especieServicio,
                            periodo: me.v_periodoE,
                            fecha: `${me.v_fechacelebracionED} ${me.v_horacelebracionED}`
                        }],
                        es: div
                    }

                    if (me.v_indexEspecie == -1) {
                        me.v_especieP.push(template)
                    } else {
                        copyEspecie[me.v_indexEspecie] = template  
                        me.v_especieP = []                    
                        me.v_especieP = [...copyEspecie]
                        me.v_indexEspecie = -1
                        me.indexRowE = -1
                    }                    

                    if (me.v_especieP.at(-1).type == 'unico') { 
                        fechatemporal = moment(me.GetDateY(me.v_especieP.at(-1).es[0].fecha)).add(1, 'd').format('DD/MM/YYYY')
                    } else {
                        fechatemporal = moment(me.GetDateY(me.v_especieP.at(-1).es.at(-1).fecha)).add(1, 'd').format('DD/MM/YYYY')
                    }

                    horatemporal = div.at(-1).fecha.split(" ")[1]      

                    me.v_fechacelebracionED = fechatemporal
                    me.v_horacelebracionED = horatemporal
                }      

            }

            me.v_editEspecie = false
            me.v_cantidadE = 0     
            me.v_especieServicio = ''       
            me.v_especies = ''
            me.v_menuFEI = ''            
            me.v_menuHEI = ''
            me.noparcialidadE = 1
        },
        //? Función encargada de eliminar un registro de pago
        DeleteFaction(index) {
            let me = this

            if (me.cambio != 0) {
                me.$notify('No puedes eliminar con un conjunto seleccionado', 'error')
            } else {
                if (me.v_editPayment) {
                    me.$notify('Guarde los cambios antes de realizar otra acción', 'error')
                } else {
                    if (me.v_payments.length == 1) {
                        me.v_fechacelebracionPD = moment().format('DD/MM/YYYY')
                        me.v_horacelebracionPD = moment().format('HH:mm')
                        me.v_fechacelebracionPI = moment().format('DD/MM/YYYY')
                        me.v_horacelebracionPI = moment().format('HH:mm')
                        me.v_payments = []
                    } else {
                        me.v_payments.splice(index, 1)                        
                        me.v_fechacelebracionPD = moment(me.GetDateY(me.v_payments.at(-1).pay.at(-1).fecha)).add(1, 'd').format('DD/MM/YYYY')
                        me.v_horacelebracionPD = me.v_payments.at(-1).pay[0].fecha.split(" ")[1]
                        me.v_fechacelebracionPI = moment().format('DD/MM/YYYY')
                        me.v_horacelebracionPI = moment().format('HH:mm')                                        
                    }
                }                
            }
        },
        //? Función encargada de actualizar un registro de pago
        UpdateFaction(type, index) {
            let me = this   

            if (me.cambio != 0) {
                me.$notify('No puedes hacer ningún cambio con un conjunto seleccionado', 'error')          
            } else {
                if (me.v_indexPayment != -1 && me.v_indexPayment != index) {
                    me.$notify('Guarde los cambios antes de actualizar otro registro', 'error')
                } else {
                    me.v_editPayment = true
                    me.v_indexPayment = index   
                    me.indexRow = index  
    
                    if (me.v_payments[index].type == 'unico') {
                        if (me.v_statusconclusion == 'Inmediato') {
                            me.v_cantidadmonto = me.v_payments[index].pay[0].monto
                            me.v_fechacelebracionPI = me.v_payments[index].pay[0].fecha.split(' ')[0]
                            me.v_horacelebracionPI = me.v_payments[index].pay[0].fecha.split(' ')[1]
                        } else {
                            me.v_cantidadmonto = me.v_payments[index].pay[0].monto
                            me.v_fechacelebracionPD = me.v_payments[index].pay[0].fecha.split(' ')[0]
                            me.v_horacelebracionPD = me.v_payments[index].pay[0].fecha.split(' ')[1]
                        }                        
                    } else {   
                        me.v_cantidadmonto = me.v_payments[index].total[0].monto
                        me.v_fechacelebracionPD = me.v_payments[index].total[0].fecha.split(' ')[0]
                        me.v_horacelebracionPD = me.v_payments[index].total[0].fecha.split(' ')[1]
                        me.noparcialidad = me.v_payments[index].total[0].parcialidad
                        me.v_periodo = me.v_payments[index].total[0].periodo                                
                    }                
                }                
            }
        },
        //? Función encargada de eliminar un registro de especie o servicio
        DeleteES(index) {
            let me = this

            if (me.cambio != 0) {
                me.$notify('No puedes eliminar con un conjunto seleccionado', 'error')
            } else {
                if (me.v_editEspecie) {
                    me.$notify('Guarde los cambios antes de realizar otra acción', 'error')
                } else {
                    if (me.v_especieP.length == 1) {
                        me.v_fechacelebracionED = moment().format('DD/MM/YYYY')
                        me.v_horacelebracionED = moment().format('HH:mm')
                        me.v_fechacelebracionEI = moment().format('DD/MM/YYYY')
                        me.v_horacelebracionEI = moment().format('HH:mm')
                        me.v_especieP = []
                    } else {
                        me.v_especieP.splice(index, 1)
                        me.v_fechacelebracionED = moment(me.GetDateY(me.v_especieP.at(-1).es.at(-1).fecha)).add(1, 'd').format('DD/MM/YYYY')
                        me.v_horacelebracionED = me.v_especieP.at(-1).es[0].fecha.split(" ")[1]
                        me.v_fechacelebracionEI = moment().format('DD/MM/YYYY')
                        me.v_horacelebracionEI = moment().format('HH:mm')                                        
                    }
                }                
            }
        },
        //? Función encargada de actualizar un registro de especie o servicio
        UpdateES(type, index) {
            let me = this   

            if (me.cambio != 0) {
                me.$notify('No puedes hacer ningún cambio con un conjunto seleccionado', 'error')          
            } else {
                if (me.v_indexEspecie != -1 && me.v_indexEspecie != index) {
                    me.$notify('Guarde los cambios antes de actualizar otro registro', 'error')
                } else {
                    me.v_editEspecie = true
                    me.v_indexEspecie = index   
                    me.indexRowE = index  
    
                    if (me.v_especieP[index].type == 'unico') {
                        if (me.v_statusconclusionE == 'Inmediato') {
                            me.v_cantidadE = me.v_especieP[index].es[0].cantidad
                            me.v_fechacelebracionEI = me.v_especieP[index].es[0].fecha.split(' ')[0]
                            me.v_horacelebracionEI = me.v_especieP[index].es[0].fecha.split(' ')[1]  
                            me.v_especieServicio = me.v_especieP[index].es[0].objeto                               
                        } else {
                            me.v_cantidadE = me.v_especieP[index].es[0].cantidad
                            me.v_fechacelebracionED = me.v_especieP[index].es[0].fecha.split(' ')[0]
                            me.v_horacelebracionED = me.v_especieP[index].es[0].fecha.split(' ')[1]                                    
                            me.v_especieServicio = me.v_especieP[index].es[0].objeto
                        }                        
                    } else {   
                        me.v_cantidadE = me.v_especieP[index].total[0].cantidad
                        me.v_fechacelebracionED = me.v_especieP[index].total[0].fecha.split(' ')[0]
                        me.v_horacelebracionED = me.v_especieP[index].total[0].fecha.split(' ')[1]
                        me.noparcialidadE = me.v_especieP[index].total[0].parcialidad
                        me.v_periodoE = me.v_especieP[index].total[0].periodo
                        me.v_especieServicio = me.v_especieP[index].total[0].objeto                    
                    }                
                }                
            }
        },
        //? Función encargada de dar formato a los registros de pago para su almacenamiento en la base de datos
        savePaymentsToDB() {
            let me = this    

            var typeString = "";
            me.v_tipopago.forEach(tipo => {
                typeString += `${tipo} `
            });

            let n = 1
            let sum = 0

            if (me.v_payments.length > 0) {
                me.v_payments.map((p) => {
                    if (p.type == 'unico') {                    
                        me.v_factionInfo.push({
                            noParcialidad: n, 
                            fecha: me.formatearfechahora2(p.pay[0].fecha),
                            objectoEspecie: '',
                            tipoPago: 'Dinero',
                            cantidadAPagar: p.pay[0].monto
                        })  
                        n++
                        sum = sum + p.pay[0].monto
                    } else {
                        p.pay.map((pp) => {
                            
                            me.v_factionInfo.push({
                                noParcialidad: n, 
                                fecha: me.formatearfechahora2(pp.fecha),
                                objectoEspecie: '',
                                tipoPago: 'Dinero',
                                cantidadAPagar: pp.monto
                            })
                            n++
                            sum = sum + pp.monto
                       })
                    }                
                    me.v_parcialidadesTotales = n - 1
                    me.v_cantidadTotal = sum
                })                
            }
            
            if (me.v_especieP.length > 0) {
                me.v_especieP.map((e) => {
                    if (e.type == 'unico') {
                        me.v_factionInfo.push({
                            noParcialidad: n,
                            fecha: me.formatearfechahora2(e.es[0].fecha),
                            objectoEspecie: e.es[0].objeto,
                            tipoPago: 'Especie',
                            cantidadAPagar: e.es[0].cantidad
                        }) 
                        n++                       
                    } else {
                        e.es.map((ee) => {
                            me.v_factionInfo.push({
                                noParcialidad: n,
                                fecha: me.formatearfechahora2(ee.fecha),
                                objectoEspecie: e.total[0].objeto,
                                tipoPago: 'Especie',
                                cantidadAPagar: ee.cantidad 
                            })  
                            n++  
                        })  
                    }
                    me.v_parcialidadesTotales = n - 1                    
              })  
            }
        },
        //? Función encargada de indicar el tipo de conclusión Inmediato o Diferido, de acuerdo a la combinación entre dinero y especie
        statusConclusionFinal() {
            let me = this

            if (me.v_statusconclusion != '' && me.v_statusconclusionE != '') {
                me.v_statusconclusionF = JSON.stringify(
                    {
                        'Dinero': me.v_statusconclusion,
                        'Especie': me.v_statusconclusionE
                    }
                )                
            } else if (me.v_statusconclusion != '') {                 
                me.v_statusconclusionF = JSON.stringify(
                    {
                        'Dinero': me.v_statusconclusion,                        
                    }
                )                
            } else if(me.v_statusconclusionE != ''){
                me.v_statusconclusionF = JSON.stringify(
                    {                        
                        'Especie': me.v_statusconclusionE
                    }
                )                
            } else {
                me.v_statusconclusionF = JSON.stringify(
                    {                        
                        'Respeto': "Respeto"
                    }
                )
                me.cumplimientoRespeto = true
            }
        },
        //? Función encargada de indicar la especie o conjunto de especies agregadas al acuerdo
        especieFinal() {
            let me = this

            if(me.v_especieP.length == 0) me.v_especies = ''

            if (me.v_especieP.length == 1) {
                if (me.v_especieP[0].type == 'unico') {
                    me.v_especies = me.v_especieP[0].es[0].objeto
                } else {
                    me.v_especies = me.v_especieP[0].total[0].objeto
                }
            }

            if (me.v_especieP.length > 1) {
                let word = ''
                me.v_especieP.map((eess) => {
                    if (eess.type == 'unico') {
                        if (word != eess.es[0].objeto) {
                            me.v_especies += `${eess.es[0].objeto};`
                            word = eess.es[0].objeto                            
                        }
                    } else {
                        if (word != eess.total[0].objeto) {
                            me.v_especies += `${eess.total[0].objeto};`
                            word = eess.total[0].objeto
                        }
                    }                    
                })
            }
        },
        //? Función encargada de generar una vista previa del PDF
        mostrarpdf() {  
            let me = this                           

            if(me.validateShowPDF()){
                //Validación para reconocer sí es un expediente de conjuntos
                if (me.istypeconjunt) {
                   
                    let claimant = me.editagreement ? (me.editConjunt[0].nombreR ? me.editConjunt[0].nombreR.split(';') : me.editConjunt[0].nombreRequerdio.split(';')) : (me.v_createAttached ? me.conjuntSelected[0].nombreR.split(';') : me.conjuntSelected.nombreR.split(';'))
                    let respondent = me.editagreement ? (me.editConjunt[0].nombreS ? me.editConjunt[0].nombreS.split(';') : me.editConjunt[0].nombreSolicitante.split(';')) : (me.v_createAttached ? me.conjuntSelected[0].nombreS.split(';') : me.conjuntSelected.nombreS.split(';'))
                    let offense = me.editagreement ? (me.editConjunt[0].nombreD ? me.editConjunt[0].nombreD.split(';') : me.editConjunt[0].delitos.split(';')) : (me.v_createAttached ? me.conjuntSelected[0].nombreD.split(';') : me.conjuntSelected.nombreD.split(';'))

                    me.v_solicitantes = me.formatText2(claimant)
                    me.v_requeridos = me.formatText2(respondent)
                    me.v_delitos = me.formatText2(offense)
                } else {                    
                    let claimant = me.editagreement && me.v_nombresRequeridosF.split(';')
                    let respondent = me.editagreement && me.v_nombresSolicitantesF.split(';')
                    let offense = me.editagreement && me.v_nombresDelitosF.split(';')

                    
                    me.v_solicitantes = me.formatText2(claimant)
                    me.v_requeridos = me.formatText2(respondent)
                    me.v_delitos = me.formatText2(offense)
                }

                //fragmento para la creación de PDF
                var dd = me.crearPdfConDatos();
                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");
                var doc = pdfMake.createPdf(dd);
                var f = document.getElementById('iframepdfAR1');
                var callback = function(url) { f.setAttribute('src',url); }

                if (pdfMake.vfs == undefined) {
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs;
                }

                doc.getDataUrl(callback, doc);                    
                me.framePDF = true; 
            } else {
                me.$notify('Completar el formulario!!!', 'error')
            }
        },
        //? Función encargada de crear el PDF del acuerdo después de haber validado y de dar clic en guardar 
        crearPdfConDatos() {
            let me = this;

            var pdfMake = require('pdfmake/build/pdfmake.js');
            var htmlToPdfmake = require("html-to-pdfmake");
            var logo1 = me.logo1;
            var logo2 = me.logo2;
            var logo3 = me.logo3;
            var logo4 = me.logo4;
            var diragencia = me.direccionAgencia;
            var telagencia= me.telefonosAgencia;
            var contactoDSP = me.contactoDSP;
            var nombreDSP = me.nombreDSP;
            var nombreDistrito = me.nombreDistrito;
            var cargo = me.cargoResponsable || ''

            this.vtxtformat = 'siendo las ' + me.v_horacelebracion + ' horas'
            var vtxt_F = "";
            if (me.vtxtformat == 'siendo las  horas') {
                vtxt_F = "";
            } else {
                vtxt_F = me.vtxtformat;
            }            

            if (!me.createagreement) {                                
                me.textoARInmediato()
                var pdf_distrito = me.editConjunt[0].uf_Distrito;
                var pdf_dirsubproc = me.editConjunt[0].uf_DirSubProc;
                var pdf_agencia = me.editConjunt[0].uf_Agencia;
                var pdf_usuario = me.nameSignatureUser != me.editConjunt[0].uf_Nombre ? me.nameSignatureUser : me.editConjunt[0].uf_Nombre
                var pdf_puesto = me.employmentUser != me.editConjunt[0].uf_Puesto ? me.employmentUser : me.editConjunt[0].uf_Puesto
                var pdf_modulo = me.editConjunt[0].uf_Modulo;
                var fecha = dia + " de " + mes  + " del " + año
            } else {                
                var num2Let = require('numalet')();
                var dia = moment(me.v_fechac).format("DD");
                var diatext = NumberAsString(dia);
                var mes = moment(me.v_fechac).format('MMMM');
                var año = moment(me.v_fechac).format("YYYY");
                var añotext = NumberAsString(año);
                var pdf_distrito = me.u_distrito;
                var pdf_dirsubproc = me.u_dirSubPro;
                var pdf_agencia = me.u_agencia;                
                var pdf_usuario = me.nameSignatureUser != me.u_nombre ? me.nameSignatureUser : me.u_nombre
                var pdf_puesto = me.employmentUser != me.u_puesto ? me.employmentUser : me.u_puesto
                var pdf_modulo = me.u_modulo;
                var fecha = dia + " de " + mes + " del " + año
            }

            var html_texto  = htmlToPdfmake(
                me.v_textoAR
            );

            var bodyDataSolicitantesLineal = [];
            var bodyDataRequeridosLineal = [];

            
                var sourceDataSL = me.v_personInfoS  
    
                sourceDataSL.forEach(function(sourceRow) {
                    var dataRow = [];

                    if (me.v_representantes.length > 0) {
                        
                        var hhh = me.v_representantes.filter(cc => cc.personaId == sourceRow.personaId)    
                        if (hhh.length > 0) {
                            dataRow.push(`${sourceRow.nombreCompleto} ${sourceRow.sexo == 'H' ? 'representado por' : 'representada por'} ${hhh[0].nombre != null ? hhh[0].nombre : ''}${hhh[0].apellidoPa != null ? ` ${hhh[0].apellidoPa}` : ''}${hhh[0].apellidoMa != null ? ` ${hhh[0].apellidoMa} ` : ''}`);                            
                        } else {
                            dataRow.push( ' ' + sourceRow.nombreCompleto);
                        }
                    } else {
                        dataRow.push( ' ' + sourceRow.nombreCompleto);                                           
                    }

                    bodyDataSolicitantesLineal.push(dataRow);
                });
    
                var sourceDataRL = me.v_personInfoR;                
    
                sourceDataRL.forEach(function(sourceRow) {
                    var dataRow = [];

                    if (me.v_representantes.length > 0) {
                        var jjj = me.v_representantes.filter(vv => vv.personaId == sourceRow.personaId)
                        if (jjj.length > 0) {
                            dataRow.push(`${sourceRow.nombreCompleto} ${sourceRow.sexo == 'H' ? 'representado por' : 'representada por'} ${jjj[0].nombre != null ? jjj[0].nombre : ''}${jjj[0].apellidoPa != null ? ` ${jjj[0].apellidoPa}` : ''}${jjj[0].apellidoMa != null ? ` ${jjj[0].apellidoMa} ` : ''}`);                            
                        } else {
                            dataRow.push( ' ' + sourceRow.nombreCompleto);                                                                    
                        }
                    }else {
                        dataRow.push( ' ' + sourceRow.nombreCompleto);                                        
                    }

                    bodyDataRequeridosLineal.push(dataRow)                
                });       

            var dd = {
                pageSize: 'LEGAL',
                pageOrientation: 'portrait',
                pageMargins: [ 85, 130, 72, 60 ],
                footer: function (currentPage, pageCount) {
                    return {
                        columns: [    
                            me.vistaPreviaTF == false ?
                                {
                                    image: me.qrCode,
                                    width: 80, // Ajusta el ancho según tu diseño
                                    height: 80, // Ajusta la altura según tu diseño
                                    absolutePosition: { x: 5, y: -80 }, // Ajusta las coordenadas según tu diseño

                                }
                                : "",                
                            {
                                text: diragencia + "\n" + telagencia + "\n" +  'www.hidalgo.gob.mx',
                                style: 'footertext',
                                margin: [312,12,72,0],
                                alignment:'right',                                
                            },
                        ]
                    };
                },
                header: function (currentPage, pageCount, pageSize) {
                        return [
                            {
                                image: logo3,
                                width: 612,
                                absolutePosition: { x: 0, y: 0 },
                            },
                        ]
                },
                content: [
                    {
                        text: pdf_dirsubproc,
                        style: 'headertext',
                        absolutePosition: { x: 85, y: 95 },
                    },
                    {
                        text:  'EXPEDIENTE: ' + me.noExpediente,
                        style: 'nuc'
                    },
                    '\n\n\n',
                    {
                        text: html_texto,
                        style: 'texto'
                    },
                    '\n\n\n\n',
                    {
                        style: 'table1',
                        table: {
                            headerRows: 1,
                            widths: ['*','*'],
                            body: [
                                [
                                    { text: 'Solicitante(s).', fontSize: 12, bold: true, alignment: 'center' }, 
                                    { text: 'Requeridos(s).', fontSize: 12, bold: true, alignment: 'center' }
                                ],
                                [bodyDataSolicitantesLineal, bodyDataRequeridosLineal],
                            ]
                        },
                        layout: 'noBorders'
                    },
                    '\n\n\n\n\n',
                    {
                        text:  '\n\n' + pdf_usuario + '\n' + pdf_puesto,
                        style: 'ampo'
                    },
                    '\n\n\n\n\n',
                    {
                        text: 'LICENCIADO(A) EN DERECHO ' + contactoDSP + '\n' + cargo.toUpperCase() + ' DEL '+ nombreDSP + ' EN ' + nombreDistrito.toUpperCase(),
                        style: 'ampo'
                    },
                    '\n\n',
                    {
                        text:  'ACUERDO REPARATORIO DEBIDAMENTE VALIDADO EN TÉRMINOS DEL ARTÍCULO 33 PÁRRAFO TERCERO DE LA LEY NACIONAL DE MECANISMOS ALTERATIVOS DE SOLUCIÓN DE CONTROVERSIA EN MATERIA PENAL',
                        style: 'ar'
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
                        bold: false,
                        alignment: 'center',
                    },
                    headertext: {
                        fontSize: 10,
                        bold: true,
                        alignment: 'left',
                    },
                    footertext: {
                        fontSize: 7,                        
                    },
                    texto: {
                        fontSize: 10,
                        regular: true,
                        alignment: 'justify',
                    },
                    ar: {
                        fontSize: 10,
                        regular: true,
                        alignment: 'center',
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
                        alignment: 'center',
                    },
                    cargo: {
                        fontSize: 9,
                        regular: true,
                        alignment: 'left',
                    },
                    table: {
                        fontSize: 10,
                        margin: [0, 5, 0, 15],
                        alignment: 'justify',
                    },
                    table1: {
                        fontSize: 10,
                        margin: [0, 5, 0, 15],
                        alignment: 'center',
                    },
                }
            }
            return dd;
        },
        //? Función encargada de colocar el texto indicado dependiendo el status de la conclusión añadiendo los datos correspondientes del expediente
        cargartexto() {
            let me = this

            me.tipoFormatoPersonas()

            me.vistaPreviaTF = true

            me.docRemision = `Registro de ${me.documenttype}`
            let fechaQR = new Date()

            me.generarQR(me.docRemision,me.nuc,me.u_nombre,fechaQR,me.expedienteId)                  

            me.textoARInmediato()   
        },
        //? Función para cargar el texto del acuerdo inmediato
        textoARInmediato() {            
            let me = this                        
            var num2Let = require('numalet')()
            var dia = moment(me.v_fechac).format("DD");
                        
            var diatext = NumberAsString(dia);
            var mes = moment(me.v_fechac).format('MMMM');
            var año = moment(me.v_fechac).format("YYYY");
            var añotext = NumberAsString(año);            

            if (!me.v_createAttached) {                                
                me.v_textoAR =`
                    <p></p>
                    <p style='text-align: center; font-size:12px; font-weight: bold'>
                        ${me.documenttype}
                    </p>
                    <br><br>
                    <p>En la ciudad de ${me.u_distrito}, Estado de Hidalgo, <strong>${me.formatoFechaPDF()} del día ${dia} (${diatext}) de ${mes} del año ${año} (${añotext})</strong>, se ${me.v_solicitanteFM == 'Los' ? 'presentan los' : `presenta ${me.v_solicitanteFM.toLowerCase()}`} ${me.nombresSolicitantesPDF()} 
                        en calidad de solicitante y se ${me.v_requeridoFM == 'Los' ? 'presentan los' : `presenta ${me.v_requeridoFM.toLowerCase()}`} ${me.nombresRequeridosPDF()} en calidad de requerido, ante el centro de Justicia Restaurativa Penal; de quienes a continuación se detallan sus:
                    </p>
                    <br><br>
                    <p style='text-align: center; font-size:11px;'>
                        DATOS GENERALES
                    </p>
                    <br>
                    ${
                        me.datosSolicitantesPDF()
                    }
                    <br><br><br>
                    ${
                        me.datosRequeridosPDF()
                    }
                    <br><br><br>
                    <p style='text-align: center;'>
                        DECLARACIÓN CONJUNTA DE LOS INTERVINIENTES
                    </p>
                    <br><br><br>
                    <p>
                        Una vez que han sido informados sobre las características, ventajas y alcances de los Mecanismos Alternativos de Solución de 
                        Controversias en materia Penal, así como de los derechos y obligaciones que les asisten, manifiestan que de forma voluntaria 
                        han dialogado, siendo su deseo proceder a la celebración del presente acuerdo reparatorio, bajo los siguientes:
                    </p>
                    <br><br>
                    <p style='text-align: center;'>
                        ANTECEDENTES
                    </p>
                    <br><br>
                    <p class='center-justify'>
                        <strong>PRIMERO.-</strong> En virtud de existir la derivación correspondiente dentro de la carpeta de investigación con número único de caso 
                        (NUC) <strong>${me.nuc}</strong>, por el delito de <strong>${me.v_delitos}</strong>, y al encontrarse cubiertos los requisitos de susceptibilidad, así como de 
                        procedencia, los intervinientes expresan que están enterados de los efectos legales que tiene la celebración del presente acuerdo 
                        reparatorio.
                    </p>    
                    <br><br>                
                    <p class='text-justify'>
                        <strong>SEGUNDA.-</strong> 
                    </p>
                    <br><br>
                    <p style='text-align: center;'>
                        CLÁUSULAS
                    </p>
                    <br><br>
                    <p class='text-justify'>
                        <strong>PRIMERA.-</strong>
                    </p>
                    <br><br>
                    <p class='text-justify'>
                        <strong>SEGUNDA.-</strong> 
                    </p>
                    <br><br>
                    <p class='text-justify'>
                        <strong>TERCERA.-</strong> 
                    </p>
                    <br><br>
                    <p class='text-justify'>
                        <strong>CUARTA.-</strong> Con base en lo dispuesto por los numerales 109 fracción X, 186, 187, 188, 189 y 190  del Código Nacional de Procedimientos Penales, 
                        así como los ordinales <strong>4,</strong> <strong>33 y 34 </strong>de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en materia Penal, 
                        y tomando en cuenta la naturaleza jurídica del asunto planteado a este Centro de Justicia Restaurativa Penal, los intervinientes han celebrado acuerdo reparatorio 
                        de <strong>cumplimiento ${me.v_statusconclusion != '' ? me.v_statusconclusion : (me.v_statusconclusionE != '' ? me.v_statusconclusionE : 'Respeto')}</strong>, en el cual se establece la reparación total de los daños que con motivo del asunto surgieron, a favor 
                        de ${me.v_solicitanteFM.toLowerCase()} C. <strong>${me.v_solicitantes}</strong> por parte ${me.v_requeridoFM.toLowerCase()} C. <strong>${me.v_requeridos}</strong>, dentro de la carpeta de 
                        investigación número <strong>${me.nuc}</strong>.
                    </p>
                    <br><br>
                    <p class='text-justify'>
                        <strong>QUINTA.-</strong> Las intervinientes expresan estar de acuerdo con todos y cada uno de los términos, plazos, condiciones y efectos de los compromisos contenidos en este acuerdo reparatorio, 
                        derivado de la aplicación de los Mecanismos Alternativos de Solución de Controversias en Materia Penal, en el procedimiento de mediación; manifestando que en este no existieron condiciones de intimidación, amenaza o coacción.
                    </p>
                    <br><br>
                    <p class='text-justify'>
                        <strong>SÉXTA.-</strong> Los intervinientes manifiestan que se les ha informado que el contenido del presente acuerdo reparatorio será sometido a su validación, 
                        aprobación y registro en términos de ley, firmando al margen y al calce de conformidad con el mismo.
                    </p>
                `              
            }            

            if (me.v_createAttached) {
                me.v_textoAR = `
                    <p></p>
                    <p style='text-align: center; font-size:12px; font-weight: bold'>
                        ${me.documenttype}
                    </p>
                    <br><br>
                    <p>
                        En la Ciudad ${me.u_distrito}, <strong>siendo las ${me.formatoFechaPDF()}, del día ${dia} (${diatext}) de ${mes} del año ${año} (${añotext})</strong>, 
                        se ${me.v_solicitanteFM == 'Los' ? 'presentan los' : `presenta ${me.v_solicitanteR ? 'el/la ' : me.v_solicitanteFM.toLowerCase()}`} ${me.nombresSolicitantesPDF()} en calidad de solicitante y se 
                        ${me.v_requeridoFM == 'Los' ? 'presentan los' : `presenta ${me.v_requeridoR ? 'el/la' : me.v_requeridoFM.toLowerCase()}`} ${me.nombresRequeridosPDF()} en calidad de requerido, ante el Centro de Justicia Restaurativa, 
                        con la finalidad de realizar una reunión de revisión y modificación al acuerdo reparatorio de fecha ${me.formatearfecha(me.conjuntSelected[0].fechaCelebracionAcuerdo)}, a efecto de verificar y facilitar el cumplimiento de las obligaciones contraídas sin afectar 
                        la efectiva reparación del daño.
                    </p>
                    <br><br>
                    <p>
                        Por lo que atendiendo a las necesidades de los intervinientes <strong>${me.v_solicitanteFM == 'Los' ? me.v_solicitanteFM.toLowerCase() : me.v_solicitanteR ? 'el/la' : me.v_solicitanteFM.toLowerCase() } ${me.nombresSolicitantesPDF()}, y ${me.v_requeridoFM == 'Los' ? me.v_requeridoFM.toLowerCase() : me.v_requeridoR ? 'el/la' : me.v_requeridoFM.toLowerCase() } ${me.nombresRequeridosPDF()}, manifiestan que, para efecto de que se dé 
                        cumplimiento total al acuerdo reparatorio antes citado, una vez que han dialogado en su deseo y voluntad MODIFICAR las clausulas SEGUNDA inciso a), y TERCERA inciso a) que a la letra dicen...-PRIMERA a) XXXXXXX, SEGUNDA a) XXXXXXX</strong> 
                    </p>
                    <br><br>
                    <p>
                        <strong>${me.v_solicitanteFM == 'Los' ? me.v_solicitanteFM : me.v_solicitanteR ? 'El/la' : me.v_solicitanteFM} ${me.nombresSolicitantesPDF()}, y ${me.v_requeridoFM == 'Los' ? me.v_requeridoFM.toLowerCase() : me.v_requeridoR ? 'el/la' : me.v_requeridoFM.toLowerCase()} ${me.nombresRequeridosPDF()}, manifiestan que</strong> de las obligaciones pactadas en el mencionado acuerdo, a la fecha se ha cumplido con el pago de XXXXXXXXXXX
                    </p>
                    <br><br>
                    <p>
                        <strong>${me.v_solicitanteFM == 'Los' ? me.v_solicitanteFM : me.v_solicitanteR ? 'El/la' : me.v_solicitanteFM} ${me.nombresSolicitantesPDF()}, y ${me.v_requeridoFM == 'Los' ? me.v_requeridoFM.toLowerCase() : me.v_requeridoR ? 'el/la' : me.v_requeridoFM.toLowerCase() } ${me.nombresRequeridosPDF()}, manifiestan que</strong> con la finalidad de que se dé cumplimiento total al acuerdo reparatorio en mención, es su deseo y voluntad que se 
                        modifiquen y queden sin efecto las clausulas antes mencionadas en el acuerdo de fecha ${me.formatearfecha(me.conjuntSelected[0].fechaCelebracionAcuerdo)}, para los efectos legales a que haya lugar; insertando al presente documento las siguientes:
                    </p>
                    <br><br><br><br>
                    <p style='text-align: center;'>
                        CLÁUSULAS
                    </p>
                    <br><br>
                    <br><br>
                    <p class='text-justify'>
                        <strong>SEGUNDA.-</strong> Con el objeto de reparar el daño por cuanto hace al delito de ${me.formatText(me.conjuntSelected[0].nombreD)} <strong>${me.v_requeridoFM.toLowerCase()} ${me.nombresRequeridosPDF()} a ${me.v_solicitanteFM.toLowerCase()} ${me.nombresSolicitantesPDF()}</strong>, manifiesta que es su voluntad asumir 
                        y cumplir la siguiente obligación:
                    </p>
                    <br><br>
                    <p>
                            a) <strong>${me.v_requeridoFM == 'Los' ? me.v_requeridoFM : me.v_requeridoR ? 'El/la' : me.v_requeridoFM} ${me.nombresRequeridosPDF()}</strong>, se ${me.v_requeridoFM == 'Los' ? 'obligan' : 'obliga'} ante <strong>${me.v_solicitanteFM == 'Los' ? me.v_solicitanteFM.toLowerCase() : me.v_solicitanteR ? 'el/la' : me.v_solicitanteFM.toLowerCase() } ${me.nombresSolicitantesPDF()}</strong>, a pagar XXXXXXXXX
                    </p>
                    <br><br>
                    <p class='text-justify'>
                        <strong>TERCERA.-</strong> Con el objeto de que en forma satisfactoria se ponga fin al procedimiento penal por cuanto hace al delito de <strong>${me.formatText(me.conjuntSelected[0].nombreD)} ${me.v_solicitanteFM == 'Los' ? me.v_solicitanteFM.toLowerCase() : me.v_solicitanteR ? 'el/la' : me.v_solicitanteFM.toLowerCase()} ${me.nombresSolicitantesPDF()}</strong> ${me.v_solicitanteFM == 'Los' ? 'estan' : 'esta'} 
                        de acuerdo en aceptar por concepto de reparación del daño por parte ${me.v_requeridoFM == 'Los' ? 'de los' : me.v_requeridoR ? 'de/ de la' : (me.v_requeridoFM == 'La' ? 'de la' : 'del')} <strong>${me.nombresRequeridosPDF()}</strong>, lo siguiente:
                    </p>
                    <br><br>                    
                    <p>
                            a) A recibir <strong>XXXXXXXXXXX</strong>
                    </p>
                    <br><br>
                    <p class='text-justify'>
                        <strong>CUARTA.-</strong> Con base en lo dispuesto por los numerales 109 fracción X, 187 fracción 1, 186, 187, 188, 189 y 190 del Código Nacional de Procedimientos Penales, así como los ordinales <strong>33, 34, 35 y 38</strong> de la Ley Nacional de Mecanismos Alternativos de 
                        Solución de Controversias en materia Penal, y tomando en cuenta la naturaleza jurídica del asunto planteado a este Centro de Justicia Restaurativa, los intervinientes han realizado modificaciones al acuerdo reparatorio de cumplimiento diferido, mismas, que les han 
                        parecido satisfactorias para ambos intervieniente, y estás no afectan la efectiva Reparación del Daño, ya que en las cuales se establece la reparación total de los daños que con motivo del asunto surgieron a favor de <strong>${me.v_solicitanteFM == 'Los' ? me.v_solicitanteFM.toLowerCase() : me.v_solicitanteR ? 'el/la' : me.v_solicitanteFM.toLowerCase()} ${me.nombresSolicitantesPDF()}</strong>, 
                        por parte de <strong>${me.v_requeridoFM == 'Los' ? me.v_requeridoFM.toLowerCase() : me.v_requeridoR ? 'el/la' : me.v_requeridoFM.toLowerCase()} ${me.nombresRequeridosPDF()}</strong>, dentro de la carpeta de investigación con número (NUC) <strong>${me.nuc}</strong>
                    </p>
                    <br><br>
                    <p class='text-justify'>
                        <strong>QUINTA.-</strong> Leído que fue la presente modificación al acuerdo reparatorio de fecha <strong>${me.formatearfecha(me.conjuntSelected[0].fechaCelebracionAcuerdo)}</strong> los intervinientes expresan estar conformes con todos y cada uno de los términos, plazos, condiciones y efectos de los compromisos contendos en el presente, dentro del cual 
                        las obligaciones acordadas les resultan proporcionadas en atención a sus necesidades, así como la reparación del daño, sabedores que en caso de imcumplimietno al presente dará lugar a la continuación del procedimiento penal, manifestando libremente los intervinientes que estuvieron en 
                        condiciones de igualdad y que no actuaron bajo condiciones de intimidación, amenaza o coacción.
                    </p><br><br>
                    <p class='text-justify'>
                        <strong>SEXTA.-</strong> los intervinientes manifiestan que se les ha informado que el contenido de la presente modificación al acuerdo reparatorio, la cual será sometida a su validación, aprovación y registro en términos de ley, firmando al margen y alcance de conformidad con el mismo.
                    </p>
                `
            }
        },     
        //? Función para cargar el bloque de datos de los solicitantes
        datosSolicitantesPDF() {
            let me = this

            var sourceDataS = me.v_personInfoS
            var bodyDataSolicitantes = [];
            sourceDataS.forEach(function(sourceRow) {
                var dataRow = [];                  
                if (me.v_representantes.length == 0) {
                    dataRow.push(`
                        <br>
                        <p>
                            <strong>Del Solicitante:</strong> ${sourceRow.sexo == 'H' ? 'El' : 'La'} C.<strong>${sourceRow.nombreCompleto}</strong>, de Nacionalidad <strong>${sourceRow.nacionalidad}</strong> ${sourceRow.sexo == 'H' ? 'originario' : 'originaria'} de 
                            <strong>${(sourceRow.entidadFederativa == null ? '(dato no registrado)' : sourceRow.entidadFederativa)}</strong>, con domicilio en <strong>${sourceRow.direccion}</strong>, de 
                            <strong>${sourceRow.edad}</strong> años de edad, por haber nacido el <strong>${(sourceRow.fechaNacimiento == "Invalid date de Invalid date del Invalid date" ? '(dato no registrado)' : sourceRow.fechaNacimiento)}</strong>, del Estado Familiar 
                            <strong>${sourceRow.estadoCivil}</strong>, de ocupación <strong>${sourceRow.ocupacion}</strong>, con grado de estudios a nivel <strong>${sourceRow.nivelEstudio}</strong>, clave única de registro de población 
                            <strong>${sourceRow.curp}</strong>, que se identifica con el(la) <strong>${sourceRow.docIdentificacion}</strong>, la cual coincide con los rasgos fisonómicos de quien la porta y en este momento le es devuelta por ser de utilidad personal, dejando en su lugar fotocopia simple de la misma para debida constancia.                            
                        </p>
                        <br>
                    `);                    
                } else {
                    var rrr = me.v_representantes.filter(ff => ff.personaId == sourceRow.personaId)
                    if (rrr.length > 0) {
                        dataRow.push(`
                            <br>
                            <p>
                                <strong>Del Solicitante: </strong>El/La <strong>C. ${rrr[0].nombre || ''}${rrr[0].nombre ? ' ' : ''}${rrr[0].apellidoPa || ''}${rrr[0].apellidoPa ? ' ' : ''}${rrr[0].apellidoMa || ''}</strong>, de Nacionalidad <strong>${rrr[0].nacionalidad}</strong> originario/originaria de 
                                <strong>${(rrr[0].estado == null ? '(dato no registrado)' : rrr[0].estado)}</strong>, con domicilio en <strong>${rrr[0].vialidad + ' '}${rrr[0].calle != null ? rrr[0].calle : '(dato no registrado)'}${rrr[0].noExt != null ? ` No.Ext. ${rrr[0].noExt}` : ''}${rrr[0].noInt != null ? ` No.Int. ${rrr[0].noInt}` : ''}${rrr[0].localidad != null ? ` ${rrr[0].localidad}` : ''}${rrr[0].codigoPostal != null ? ` C.P. ${rrr[0].codigoPostal}` : ''}${rrr[0].municipio != null ? ` ${rrr[0].municipio}` : ''}${rrr[0].entreCalle1 != null ? ` entre calle ${rrr[0].entreCalle1}` : ''}${rrr[0].entreCalle2 != null ? (rrr[0].entreCalle1 != null ? ` y entre calle ${rrr[0].entreCalle2}` : ` entre calle ${rrr[0].entreCalle2}`) : ''}${rrr[0].referencia != null ? ` con referencia de ${rrr[0].referencia}` : ''}</strong>, de 
                                <strong>${rrr[0].edad}</strong> años de edad, por haber nacido el <strong>${(rrr[0].fechaNacimiento == null ? '(dato no registrado)' : moment(rrr[0].fechaNacimiento.split("/").reverse().join("-")).format('LL'))}</strong>.                            
                            </p>
                            <br>
                            <p>                                    
                                <strong>Quien en este momento se encuentra por propio derecho y representando a</strong> ${ sourceRow.edad < 18 ? `<strong>${sourceRow.sexo == 'H' ? 'el' : 'la'} adolescente presente de identidad reservada de iniciales ${sourceRow.nombreCompleto}</strong>, de <strong>${sourceRow.edad} años de edad</strong>, por haber nacido <strong>${sourceRow.fechaNacimiento}</strong>, lo cual se acredita mediante Clave única de Registro, expedida por la <strong>Dirección General del Registro de Población</strong>, de la cual se agrega copia para debida constancia y de quien se omiten sus demás datos personales de conformidad a lo establecido en el artículo 36 de la Ley Nacional del Sistema Integral de Justicia Penal para Adolescentes, el cual hace referencia al confidencialidad y privacidad.` : `<strong>${sourceRow.nombreCompleto}</strong>`}
                            </p>
                            <br>
                        `); 
                    } else {
                        dataRow.push(`
                            <br>
                            <p>
                                <strong>Del Solicitante:</strong> ${sourceRow.sexo == 'H' ? 'El' : 'La'} C.<strong>${sourceRow.nombreCompleto}</strong>, de Nacionalidad <strong>${sourceRow.nacionalidad}</strong> ${sourceRow.sexo == 'H' ? 'originario' : 'originaria'} de 
                                <strong>${(sourceRow.entidadFederativa == null ? '(dato no registrado)' : sourceRow.entidadFederativa)}</strong>, con domicilio en <strong>${sourceRow.direccion}</strong>, de 
                                <strong>${sourceRow.edad}</strong> años de edad, por haber nacido el <strong>${(sourceRow.fechaNacimiento == "Invalid date de Invalid date del Invalid date" ? '(dato no registrado)' : sourceRow.fechaNacimiento)}</strong>, del Estado Familiar 
                                <strong>${sourceRow.estadoCivil}</strong>, de ocupación <strong>${sourceRow.ocupacion}</strong>, con grado de estudios a nivel <strong>${sourceRow.nivelEstudio}</strong>, clave única de registro de población 
                                <strong>${sourceRow.curp}</strong>, que se identifica con el(la) <strong>${sourceRow.docIdentificacion}</strong>, la cual coincide con los rasgos fisonómicos de quien la porta y en este momento le es devuelta por ser de utilidad personal, dejando en su lugar fotocopia simple de la misma para debida constancia.                            
                            </p>
                            <br>
                        `);
                    }
                }        
                bodyDataSolicitantes.push(dataRow)                                
            });

            return bodyDataSolicitantes
        },
        //? Función para cargar el bloque de datos de los requeridos
        datosRequeridosPDF() {
            let me = this

            var sourceDataR = me.v_personInfoR;
            var bodyDataRequeridos = [];
            sourceDataR.forEach(function(sourceRow) {
                var dataRow = [];  
                if (me.v_representantes.length == 0) {
                    dataRow.push(`
                        <br>
                        <p>
                            <strong>Del Requerido:</strong> ${sourceRow.sexo == 'H' ? 'El' : 'La'} C.<strong>${sourceRow.nombreCompleto}</strong>, de Nacionalidad <strong>${sourceRow.nacionalidad}</strong> originario de 
                            <strong>${(sourceRow.entidadFederativa == null ? '(dato no registrado)' : sourceRow.entidadFederativa)}</strong>,  con domicilio en <strong>${sourceRow.direccion}</strong>, de 
                            <strong>${sourceRow.edad}</strong> años de edad, por haber nacido el <strong>${(sourceRow.fechaNacimiento == "Invalid date de Invalid date del Invalid date" ? '(dato no registrado)' : sourceRow.fechaNacimiento)}</strong>, del Estado Familiar 
                            <strong>${sourceRow.estadoCivil}</strong>, de ocupación <strong>${sourceRow.ocupacion}</strong>, con grado de estudios a nivel <strong>${sourceRow.nivelEstudio}</strong>, clave única de registro de población 
                            <strong>${sourceRow.curp}</strong> que se identifica con el(la) <strong>${sourceRow.docIdentificacion}</strong> la cual coincide con los rasgos fisonómicos de quien la porta y en este momento le es devuelta por ser de utilidad personal, dejando en su lugar fotocopia simple de la misma para debida constancia.
                        </p>
                        <br>
                    `);                    
                } else {
                    var sss = me.v_representantes.filter(gg => gg.personaId == sourceRow.personaId)
                    if (sss.length > 0) {
                        dataRow.push(`
                            <br>
                            <p>
                                <strong>Del Requerido: </strong>El/La <strong>C. ${sss[0].nombre != null ? `${sss[0].nombre}`: ''}${sss[0].apellidoPa != null ? ` ${sss[0].apellidoPa}` : ''}${sss[0].apellidoMa != null ? ` ${sss[0].apellidoMa} ` : ''}</strong>, de Nacionalidad <strong>${sss[0].nacionalidad}</strong> originario/originaria de 
                                <strong>${(sss[0].estado == null ? '(dato no registrado)' : sss[0].estado)}</strong>, con domicilio en <strong>${sss[0].vialidad + ' '}${sss[0].calle != null ? sss[0].calle : '(dato no registrado)'}${sss[0].noExt != null ? ` No.Ext. ${sss[0].noExt}` : ''}${sss[0].noInt != null ? ` No.Int. ${sss[0].noInt}` : ''}${sss[0].localidad != null ? ` ${sss[0].localidad}` : ''}${sss[0].codigoPostal != null ? ` C.P. ${sss[0].codigoPostal}` : ''}${sss[0].municipio != null ? ` ${sss[0].municipio}` : ''}${sss[0].entreCalle1 != null ? ` entre calle ${sss[0].entreCalle1}` : ''}${sss[0].entreCalle2 != null ? (sss[0].entreCalle1 != null ? ` y entre calle ${sss[0].entreCalle2}` : ` entre calle ${sss[0].entreCalle2}`) : ''}${sss[0].referencia != null ? ` con referencia de ${sss[0].referencia}` : ''}</strong>, de 
                                <strong>${sss[0].edad}</strong> años de edad, por haber nacido el <strong>${(sss[0].fechaNacimiento == null ? '(dato no registrado)' : moment(sss[0].fechaNacimiento.split("/").reverse().join("-")).format('LL'))}</strong>.
                            </p>
                            <br>
                            <p>                                    
                                <strong>Quien en este momento se encuentra por propio derecho y representando a</strong> ${ sourceRow.edad < 18 ? `<strong>${sourceRow.sexo == 'H' ? 'el' : 'la'} adolescente presente de identidad reservada de iniciales ${sourceRow.alias}, de <strong>${sourceRow.edad} años de edad</strong>, por haber nacido <strong>${sourceRow.fechaNacimiento}</strong>, lo cual se acredita mediante Clave única de Registro, expedida por la <strong>Dirección General del Registro de Población</strong>, de la cual se agrega copia para debida constancia y de quien se omiten sus demás datos personales de conformidad a lo establecido en el artículo 36 de la Ley Nacional del Sistema Integral de Justicia Penal para Adolescentes, el cual hace referencia al confidencialidad y privacidad.` : `<strong>${sourceRow.nombreCompleto}</strong>`}
                            </p>
                            <br>
                        `); 
                    } else {
                        dataRow.push(`
                        <br>
                        <p>
                            <strong>Del Requerido:</strong> ${sourceRow.sexo == 'H' ? 'El' : 'La'} C.<strong>${sourceRow.nombreCompleto}</strong>, de Nacionalidad <strong>${sourceRow.nacionalidad}</strong> originario de 
                            <strong>${(sourceRow.entidadFederativa == null ? '(dato no registrado)' : sourceRow.entidadFederativa)}</strong>,  con domicilio en <strong>${sourceRow.direccion}</strong>, de 
                            <strong>${sourceRow.edad}</strong> años de edad, por haber nacido el <strong>${(sourceRow.fechaNacimiento == "Invalid date de Invalid date del Invalid date" ? '(dato no registrado)' : sourceRow.fechaNacimiento)}</strong>, del Estado Familiar 
                            <strong>${sourceRow.estadoCivil}</strong>, de ocupación <strong>${sourceRow.ocupacion}</strong>, con grado de estudios a nivel <strong>${sourceRow.nivelEstudio}</strong>, clave única de registro de población 
                            <strong>${sourceRow.curp}</strong> que se identifica con el(la) <strong>${sourceRow.docIdentificacion}</strong> la cual coincide con los rasgos fisonómicos de quien la porta y en este momento le es devuelta por ser de utilidad personal, dejando en su lugar fotocopia simple de la misma para debida constancia.
                        </p>
                        <br>
                    `); 
                    }
                }
                bodyDataRequeridos.push(dataRow)
            });             
            return bodyDataRequeridos
        },
        //? Función para cargar unicamente los nombre de los solicitantes
        nombresSolicitantesPDF() {
            let me = this

            var sourceDataSL = me.v_personInfoS;            
            var bodyDataSolicitantesLineal = [];            
            sourceDataSL.forEach(function(sourceRow) {
                var dataRow = []
                if (me.v_representantes.length > 0) {
                    var rrr = me.v_representantes.filter(ff => ff.personaId == sourceRow.personaId)                    
                    if (rrr.length > 0) {
                        me.v_solicitanteR = true
                        dataRow.push(` <strong>C. ${rrr[0].nombre != null ? `${rrr[0].nombre}` : ''} ${rrr[0].apellidoPa != null ? ` ${rrr[0].apellidoPa}` : ''} ${rrr[0].apellidoMa != null ? ` ${rrr[0].apellidoMa} ` : ''}por propio derecho y como persona responsable de ${sourceRow.edad < 18 ? `el/la adolescente de identidad reservada de iniciales ${sourceRow.nombreCompleto}, quien también se encuentra presente` : `${sourceRow.nombreCompleto}`}</strong>`)
                    } else {
                      dataRow.push(` <strong>C. ${sourceRow.nombreCompleto}</strong>`)
                    }
                    bodyDataSolicitantesLineal.push(dataRow)                                        
                } else {
                    dataRow.push(` <strong>C. ${sourceRow.nombreCompleto}</strong>`)
                    bodyDataSolicitantesLineal.push(dataRow)                    
                }
            });

            return bodyDataSolicitantesLineal
        },
        //? Función para cargar unicamente los nombre de los requeridos
        nombresRequeridosPDF() {
            let me = this

            var sourceDataRL = me.v_personInfoR;
            var bodyDataRequeridosLineal = [];

            sourceDataRL.forEach(function(sourceRow) {
                var dataRow = [];

                if (me.v_representantes.length > 0) {
                    var sss = me.v_representantes.filter(gg => gg.personaId == sourceRow.personaId)  
                    if (sss.length > 0) {
                        me.v_requeridoR = true
                        dataRow.push(` <strong>C. ${sss[0].nombre != null ? `${sss[0].nombre}` : ''} ${sss[0].apellidoPa != null ? ` ${sss[0].apellidoPa}` : ''} ${sss[0].apellidoMa != null ? ` ${sss[0].apellidoMa} ` : ''}por propio derecho y como persona responsable de ${sourceRow.edad < 18 ? `el/la adolescente de identidad reservada de iniciales ${sourceRow.nombreCompleto}, quien también se encuentra presente` : `${sourceRow.nombreCompleto}`}</strong>`)
                    } else {
                        dataRow.push(` <strong>C. ${sourceRow.nombreCompleto}</strong>`)                        
                    }
                    bodyDataRequeridosLineal.push(dataRow)
                } else {
                    dataRow.push(` <strong>C. ${sourceRow.nombreCompleto}</strong>`)
                    bodyDataRequeridosLineal.push(dataRow)
                }                
            });
            
            return bodyDataRequeridosLineal
        },
        //? Función para obtener los representantes almacenados por parte de JR existentes de todas las personas para el acuerdo
        representant() {

            let me = this;
            let header = { "Authorization": "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };

            me.v_representantes = []

            me.v_idsSRR.map(uid => {
                me.$justiciarestaurativa.get(`api/Responsablejrs/RepresentanteAllActive/${uid.trim()}`, configuracion)
                    .then(responseJR => {             
                        if (responseJR.data.idResponsable) {        
                            let vialidadEncontrada = me.vialidades.find(v => v.value == responseJR.data.tipoVialidad);
                            responseJR.data.vialidad = vialidadEncontrada ? vialidadEncontrada.text : "";

                            me.v_representantes.push(responseJR.data)  
                        }
                    })
                    .catch(function (error) {
                        if (error.response.status == 400) {
                            me.$notify("No es un usuario válido", 'error')
                        } else if (error.response.status == 401) {
                            me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                            me.e401 = true,
                                me.showpage = false
                        } else if (error.response.status == 403) {
                            me.$notify("No esta autorizado para ver esta página", 'error')
                            me.e403 = true
                            me.showpage = false
                        } else if (error.response.status == 404) {
                            me.$notify("El recuso no ha sido encontrado", 'error')
                        } else {
                            me.$notify('Error al intentar listar los registros ', 'error')
                        }
                    });
            })            
        },
        //? Función para retornar la fecha a utilizar dentro del PDF del acuerdo
        formatoFechaPDF() {
            let me = this
            
            me.vtxtformat = 'siendo las ' + me.v_horacelebracion + ' horas'

            var vtxt_F = "";

            if (me.vtxtformat == 'siendo las  horas') {
                vtxt_F = "";
            } else {
                vtxt_F = me.vtxtformat;
            } 

            return vtxt_F
        },
        //? Función para estructurar los datos de delitos, solicitantes, requeridos de acuerdo a si es por conjuntos o sin conjunto
        tipoFormatoPersonas() {
            let me = this

            if (!this.editagreement) {
                if (me.istypeconjunt) {     
                    if (me.v_createAttached) {
                        let claimant = me.conjuntSelected[0].nombreR.split(';')
                        let respondent = me.conjuntSelected[0].nombreS.split(';')
                        let offense = me.conjuntSelected[0].nombreD.split(';')                    
        
                        me.v_solicitantes = me.formatText2(respondent)
                        me.v_requeridos = me.formatText2(claimant)
                        me.v_delitos = me.formatText2(offense)                        
                    } else {
                        let claimant = me.conjuntSelected.nombreR.split(';')
                        let respondent = me.conjuntSelected.nombreS.split(';')
                        let offense = me.conjuntSelected.nombreD.split(';')                    
        
                        me.v_solicitantes = me.formatText2(respondent)
                        me.v_requeridos = me.formatText2(claimant)
                        me.v_delitos = me.formatText2(offense)                        
                    }
                } else {
                    let claimant = me.v_nombresRequeridosF.split(';')
                    let respondent = me.v_nombresSolicitantesF.split(';')
                    let offense = me.v_nombresDelitosF.split(';')
    
                    me.v_solicitantes = me.formatText2(respondent)
                    me.v_requeridos = me.formatText2(claimant)
                    me.v_delitos = me.formatText2(offense)
                }                
            }
        },
        //? Función para asignar los datos para la creación del anexo
        attached(dataFA) {
            let me = this

            me.v_createAttached = true
            me.createagreement = true
            me.conjuntSelected.push(dataFA)
            me.idConjunt = dataFA.conjuntoDerivacionesId
            me.documenttype = 'REGISTRO DE REUNIÓN DE REVISIÓN'

            let idsClaimant = []
            let nameClaimant = []
            let idsRespondent = []
            let nameRespondent = []

            idsClaimant = dataFA.requeridosC.split(';')
            nameClaimant = dataFA.nombreR.split(';')
            idsRespondent = dataFA.solicitadosC.split(';') 
            nameRespondent = dataFA.nombreS.split(';')

            idsRespondent.map((respondent, index) => {                                            
                me.listardireccionSol(respondent, nameRespondent[index].trim())
                if (!me.v_idsSRR.includes(respondent.trim())) {
                    me.v_idsSRR.push(respondent.trim())                    
                }
            })
            
            idsClaimant.map((claimant, index) => {                    
                me.listardireccionReq(claimant, nameClaimant[index].trim())
                if (!me.v_idsSRR.includes(claimant.trim())) { 
                    me.v_idsSRR.push(claimant.trim())
                }
            })                           
            
            me.representant()                            
        },
        //* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //* FUNCIONES EXTRAS
        //* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                  
        //? Función encargada de dar formato a la fecha indicada para la inserción en la base de datos
        formatearfecha: function (fecha) {
            return moment(fecha).format('DD/MM/YYYY');
        },
        //? Función encargada de obtener la fecha completa de la base de datos y retornar únicamente dia, mes y año
        GetDate: function (date) {        
            return moment(date).format('DD/MM/YYYY');
        },
        //? Función encargada de obtener la fecha completa de la base de datos y retornar únicamente año, mes y día
        GetDateY: function (date) {     
            let reve = date.split(' ')[0].split('/').reverse().join('/')
            return moment(reve).format('YYYY/MM/DD');
        },
        //? Función encargada de obtener la fecha completa de la base de datos y retornar únicamente horas y minutos
        GetHour: function (hour) {
            return moment(hour).format('HH:mm');
        },
        //? Función encargada de obtener el campo de los nombre del expedientes ya sea solicitados o requeridos, los separa por ; y los inserta usando etiquetas p
        formatText(textoC) {     
            let v = textoC.split(';');
            let x = ``
            if(v.length <= 1){
                x = `<p>${v[0]}</p>`
            }else{
                v.map((d) =>{
                    x += `<p>${d}</p>`
                })                    
            }

            return x
        },
        //? Función encargada de obtener un arreglo con los nombre de las personas y generar un String con los nombre separados por comas
        formatText2(arreglo) {            
            let textTemp = ''
            for(var i = 0; i < arreglo.length; i++) {
                if (textTemp === "") { 
                    textTemp = arreglo[i]
                } else {
                    textTemp = `${textTemp},${arreglo[i]}` 
                }
            }

            return textTemp
        },
        //? Función para dar formato al campo de fecha usando la libreria moment
        formatearfechahora: function(fecha) {
            return moment(fecha).format('DD/MM/YYYY hh:mm')
        },
        //? Función para dar formato al campo de fecha de forma manual
        formatearfechahora2: function (fecha) {
            let ff = fecha.split(' ')[0].split('/').reverse().join('/')
            let hh = fecha.split(' ')[1]
            
            return `${ff}T${hh}`
        },
        //? Función encargada retornar los valores iniciales de las variables del acuerdo al dar clic sobre el botón de regreso
        fieldsBlank() {
            let me = this

            me.cambio = 0
            me.v_periodo = 1
            me.noparcialidad = 1
            me.v_fechac = ''
            me.v_fechaPI = ''
            me.v_fechaPD = ''
            me.v_fechal = ''
            me.v_textoAR = ''
            me.idConjunt = ''
            me.v_delitos = ''
            me.v_especie = ''
            me.v_tipopago = ''
            me.vtxtformat = ''
            me.v_horacita = ''
            me.v_requeridos = ''
            me.v_fechalimite = ''
            me.v_solicitantes = ''
            me.v_cantidadmonto = 0
            me.documenttype = ''
            me.v_fechacelebracionPI = ''
            me.v_horacelebracionPI = ''
            me.v_fechacelebracionPD = ''
            me.v_horacelebracionPD = ''            
            me.v_horacelebracion = ''
            me.v_metodoutilizado = ''
            me.v_fechacelebracion = ''
            me.v_representantes = []
            me.v_idsSRR = []
            me.Rprint = false
            me.printConjunt = []
            me.v_statusconclusion = ''
            me.editConjunt = []
            me.v_personInfoS = []
            me.v_personInfoR = []
            me.v_requeridosF = []
            me.v_solicitantesF = []
            me.disa = false
            me.v_menu1 = false
            me.v_menu3 = false
            me.v_menu2 = false
            me.v_editPayment = false
            me.v_indexPayment = -1
            me.v_menu4 = false
            me.v_showCant = false
            me.editagreement = false   
            me.v_showEspecie = false
            me.createagreement = false
            me.employmentUser = me.$store.state.usuario.puesto
            me.nameSignatureUser = me.$store.state.usuario.usuario
            me.v_factionInfo = []
            me.v_payments = []
            me.v_especie= ''
            me.v_periodoE= 1
            me.v_fechacelebracionEI = ''
            me.v_cantidadTotal = 0 
            me.v_fechacelebracionED= ''
            me.v_horacelebracionEI= ''
            me.v_horacelebracionED= ''
            me.v_statusconclusionE= ''
            me.v_fechaEI= ''
            me.v_fechaED= ''
            me.v_cantidadTotalE = 0           
            me.v_cantidadE= 0
            me.v_especieServicio = ''
            me.v_especies = ''
            me.v_menuFEI= false
            me.v_menuFED= false
            me.v_menuHEI= false
            me.v_menuHED = false
            me.v_requeridoFM = ''
            me.v_solicitanteFM = ''
            me.v_editEspecie= false
            me.v_indexEspecie= -1
            me.v_especieP= []
            me.noparcialidadE = 1
            me.conjuntSelected = [] 
            me.v_createAttached = false
        },
        //? Función encargada de verificar que los campos solicitados y requeridos para la creación del acuerdo esten llenos
        validateShowPDF() {
            let me = this                                    

            if (me.v_statusconclusion != '' && me.v_statusconclusion == 'Inmediato') {
                if (me.v_fechac != '' && me.v_fechacelebracion != '' && me.v_tipopago.length > 0 && ((me.v_tipopago.includes("Dinero") && me.v_payments.length > 0) || (me.v_tipopago.includes("Especie") && me.v_especieP.length > 0) || me.v_tipopago.includes("Respeto")) && me.v_horacelebracion != '' && me.v_metodoutilizado != '' && ( me.istypeconjunt ? me.idConjunt != '' : me.envioId != '')) {                                    
                    return true
                }
            }

            if (me.v_statusconclusion != '' && me.v_statusconclusion == 'Diferido'){
                if (me.v_fechac != '' && me.v_fechacelebracion != '' && me.v_tipopago.length > 0 && ((me.v_tipopago.includes("Dinero") && me.v_payments.length > 0) || (me.v_tipopago.includes("Especie") && me.v_especieP.length > 0) || me.v_tipopago.includes("Respeto")) && me.v_horacelebracion != '' && me.v_metodoutilizado != '' && ( me.istypeconjunt ? me.idConjunt != '' : me.envioId != '') && me.v_fechal != '' && me.v_horacita != '') {                    
                    return true
                }
            }

            if (me.v_statusconclusionE != '' && me.v_statusconclusionE == 'Inmediato') {
                if (me.v_fechac != '' && me.v_fechacelebracion != '' && me.v_tipopago.length > 0 && ((me.v_tipopago.includes("Dinero") && me.v_payments.length > 0) || (me.v_tipopago.includes("Especie") && me.v_especieP.length > 0) || me.v_tipopago.includes("Respeto")) && me.v_horacelebracion != '' && me.v_metodoutilizado != '' && ( me.istypeconjunt ? me.idConjunt != '' : me.envioId != '')) {
                    return true
                }
            }

            if (me.v_statusconclusionE != '' && me.v_statusconclusionE == 'Diferido'){
                if (me.v_fechac != '' && me.v_fechacelebracion != '' && me.v_tipopago.length > 0 && ((me.v_tipopago.includes("Dinero") && me.v_payments.length > 0) || (me.v_tipopago.includes("Especie") && me.v_especieP.length > 0) || me.v_tipopago.includes("Respeto")) && me.v_horacelebracion != '' && me.v_metodoutilizado != '' && ( me.istypeconjunt ? me.idConjunt != '' : me.envioId != '') && me.v_fechal != '' && me.v_horacita != '') {
                    return true
                }
            }

            if (me.v_statusconclusion == '' && me.v_statusconclusionE == '' && me.v_tipopago.includes("Respeto")) {
              return true  
            }            
        },
        //? Función encargada de verificar que los campos iniciales esten llenos para la selección de un conjunto
        validateToSelectConjunt() {
            let me = this    

            if (me.v_statusconclusion != '' && me.v_statusconclusionE != '') {
                var totales = []

                if (me.v_statusconclusion != '' && me.v_statusconclusion == 'Inmediato') {
                    if (me.v_fechac != '' && me.v_fechacelebracion != '' && me.v_tipopago.length > 0 && ((me.v_tipopago.includes("Dinero") && me.v_payments.length > 0) && (me.v_tipopago.includes("Especie") && me.v_especieP.length > 0)) && me.v_horacelebracion != '' && me.v_metodoutilizado != '') {                                                            
                        totales.push(true)
                    } else {                        
                        totales.push(false)  
                    }
                }
    
                if (me.v_statusconclusion != '' && me.v_statusconclusion == 'Diferido'){
                    if (me.v_fechac != '' && me.v_fechacelebracion != '' && me.v_tipopago.length > 0 && ((me.v_tipopago.includes("Dinero") && me.v_payments.length > 0) && (me.v_tipopago.includes("Especie") && me.v_especieP.length > 0)) && me.v_horacelebracion != '' && me.v_metodoutilizado != '' && me.v_fechal != '' && me.v_horacita != '') {                                            
                        totales.push(true)
                    } else {                        
                        totales.push(false)  
                    }
                }
    
                if (me.v_statusconclusionE != '' && me.v_statusconclusionE == 'Inmediato') {
                    if (me.v_fechac != '' && me.v_fechacelebracion != '' && me.v_tipopago.length > 0 && ((me.v_tipopago.includes("Dinero") && me.v_payments.length > 0) && (me.v_tipopago.includes("Especie") && me.v_especieP.length > 0)) && me.v_horacelebracion != '' && me.v_metodoutilizado != '') {                        console.log("5")
                        totales.push(true)
                    } else {                        
                        totales.push(false)  
                    }
                }
    
                if (me.v_statusconclusionE != '' && me.v_statusconclusionE == 'Diferido'){
                    if (me.v_fechac != '' && me.v_fechacelebracion != '' && me.v_tipopago.length > 0 && ((me.v_tipopago.includes("Dinero") && me.v_payments.length > 0) && (me.v_tipopago.includes("Especie") && me.v_especieP.length > 0)) && me.v_horacelebracion != '' && me.v_metodoutilizado != '' && me.v_fechal != '' && me.v_horacita != '') {                        
                        totales.push(true)
                    } else {                        
                        totales.push(false)  
                    }
                }
    
                if ((me.v_tipopago.includes("Dinero") && me.v_payments.length > 0) && (me.v_tipopago.includes("Especie") && me.v_especieP.length > 0) && me.v_tipopago.includes("Respeto")) {                    
                    totales.push(true)
                }                                

                if (totales.every(valor => valor === true)) {                    
                  return true  
                } else {
                  return false  
                }

            } else {
                if (me.v_statusconclusion != '' && me.v_statusconclusion == 'Inmediato') {
                    if (me.v_fechac != '' && me.v_fechacelebracion != '' && me.v_tipopago.length > 0 && ((me.v_tipopago.includes("Dinero") && me.v_payments.length > 0) || (me.v_tipopago.includes("Especie") && me.v_especieP.length > 0)) && me.v_horacelebracion != '' && me.v_metodoutilizado != '') {                                                            
                        return true
                    }
                }
    
                if (me.v_statusconclusion != '' && me.v_statusconclusion == 'Diferido'){
                    if (me.v_fechac != '' && me.v_fechacelebracion != '' && me.v_tipopago.length > 0 && ((me.v_tipopago.includes("Dinero") && me.v_payments.length > 0) || (me.v_tipopago.includes("Especie") && me.v_especieP.length > 0)) && me.v_horacelebracion != '' && me.v_metodoutilizado != '' && me.v_fechal != '' && me.v_horacita != '') {                                            
                        return true
                    }
                }
    
                if (me.v_statusconclusionE != '' && me.v_statusconclusionE == 'Inmediato') {                    
                    if (me.v_fechac != '' && me.v_fechacelebracion != '' && me.v_tipopago.length > 0 && ((me.v_tipopago.includes("Dinero") && me.v_payments.length > 0) || (me.v_tipopago.includes("Especie") && me.v_especieP.length > 0)) && me.v_horacelebracion != '' && me.v_metodoutilizado != '') {                        
                        return true
                    }
                }
    
                if (me.v_statusconclusionE != '' && me.v_statusconclusionE == 'Diferido'){
                    if (me.v_fechac != '' && me.v_fechacelebracion != '' && me.v_tipopago.length > 0 && ((me.v_tipopago.includes("Dinero") && me.v_payments.length > 0) || (me.v_tipopago.includes("Especie") && me.v_especieP.length > 0)) && me.v_horacelebracion != '' && me.v_metodoutilizado != '' && me.v_fechal != '' && me.v_horacita != '') {                        
                        return true
                    }
                }                    
            }            

            if (me.v_tipopago.includes("Respeto") && me.v_tipopago.length == 1 ) {
              return true  
            }                 

            return false
        },
        //? Función para desvincular la propiedad required de los campos del formulario al eliminarlos de la vista
        detachValidator() {
           this.$validator.detach('modalidadE') 
           this.$validator.detach('modalidadD') 
           this.$validator.detach('tipago') 
           this.$validator.detach('hora') 
           this.$validator.detach('metodo_utilizado') 
           this.$validator.detach('fecha_limite_cumplimiento') 
           this.$validator.detach('fecha_cele_acuerdo') 
           this.$validator.detach('periodo_pago') 
        },
        //?Función para cargar datos de personas para la re impresión
        loadDataRI(acuerdo, index) {
            let me = this              

            if (me.tggA != index) {

                me.tggA = index

                me.fieldsBlank()                   
              
                me.printConjunt.push(acuerdo)
                
                let idsClaimant = acuerdo.requeridosC.split(';')
                let nameClaimant = acuerdo.nombreR.split(';')
                let idsRespondent = acuerdo.solicitadosC.split(';')
                let nameRespondent = acuerdo.nombreS.split(';')
    
                idsRespondent.map((respondent, index) => {                        
                    me.listardireccionSol(respondent, nameRespondent[index].trim())
                    me.v_idsSRR.push(respondent.trim())
                })
                
                idsClaimant.map((claimant, index) => {
                    me.listardireccionReq(claimant, nameClaimant[index].trim())
                    me.v_idsSRR.push(claimant.trim())
                })                                           
                
                me.representant()                               

                me.vistaPreviaTF = false        
                
                me.docRemision = `Reimpresión de ${acuerdo.tipoDocumento}`                

                me.generarQR(me.docRemision,me.nuc,acuerdo.uf_Nombre,acuerdo.fechaCelebracionAcuerdo,acuerdo.idAcuerdoReparatorio)
            } else {
              me.tggA = -1  
            }
        },
        //? Funciópn para visualizar y reimprimir el documento PDF del acuerdo o plan generado
        reimpresion() {
            let me = this 
            
            me.Rprint = true        

            var pdfMake = require('pdfmake/build/pdfmake.js');
            var htmlToPdfmake = require("html-to-pdfmake");                                    

            var logo3 = me.logo3;
            var logo4 = me.logo4;
            var diragencia = me.direccionAgencia;
            var telagencia = me.telefonosAgencia;
            var contactoDSP = me.contactoDSP;
            var nombreDSP = me.nombreDSP; 
            var nombreDistrito = me.nombreDistrito;
            var cargo = me.cargoResponsable || ''

            var html_texto  = htmlToPdfmake(
                me.printConjunt[0].textoAR
            );

            var bodyDataSolicitantesLineal = [];
            var bodyDataRequeridosLineal = [];
    
            var sourceDataSL = me.v_personInfoS  
            
            sourceDataSL.forEach(function(sourceRow) {
                var dataRow = [];
                                
                    if (me.v_representantes.length > 0) {
                        
                        var hhh = me.v_representantes.filter(cc => cc.personaId == sourceRow.personaId)    
                        if (hhh.length > 0) {
                            dataRow.push(`${sourceRow.nombreCompleto} ${sourceRow.sexo == 'H' ? 'representado por' : 'representada por'} ${hhh[0].nombre != null ? hhh[0].nombre : ''}${hhh[0].apellidoPa != null ? ` ${hhh[0].apellidoPa}` : ''}${hhh[0].apellidoMa != null ? ` ${hhh[0].apellidoMa} ` : ''}`);                            
                        } else {
                            dataRow.push( ' ' + sourceRow.nombreCompleto);
                        }
                    } else {
                        dataRow.push( ' ' + sourceRow.nombreCompleto);                                           
                    }

                    bodyDataSolicitantesLineal.push(dataRow);
                });
                
            var sourceDataRL = me.v_personInfoR;                
    
            sourceDataRL.forEach(function(sourceRow) {
                var dataRow = [];

                if (me.v_representantes.length > 0) {
                    var jjj = me.v_representantes.filter(vv => vv.personaId == sourceRow.personaId)
                    if (jjj.length > 0) {
                        dataRow.push(`${sourceRow.nombreCompleto} ${sourceRow.sexo == 'H' ? 'representado por' : 'representada por'} ${jjj[0].nombre != null ? jjj[0].nombre : ''}${jjj[0].apellidoPa != null ? ` ${jjj[0].apellidoPa}` : ''}${jjj[0].apellidoMa != null ? ` ${jjj[0].apellidoMa} ` : ''}`);                            
                    } else {
                        dataRow.push( ' ' + sourceRow.nombreCompleto);                                                                    
                    }
                }else {
                    dataRow.push( ' ' + sourceRow.nombreCompleto);                                        
                }

                bodyDataRequeridosLineal.push(dataRow)                
            });       

            var dd = {
                pageSize: 'LEGAL',
                pageOrientation: 'portrait',
                pageMargins: [ 85, 130, 72, 60 ],
                footer: function (currentPage, pageCount) {
                    return {
                        columns: [     
                            me.vistaPreviaTF == false ?
                                {
                                    image: me.qrCode,
                                    width: 80, // Ajusta el ancho según tu diseño
                                    height: 80, // Ajusta la altura según tu diseño
                                    absolutePosition: { x: 5, y: -80 }, // Ajusta las coordenadas según tu diseño

                                }
                                : "",
                            {
                                text: diragencia+"\t" + "\n" + telagencia+"\t" + "\n" +  'www.hidalgo.gob.mx'+"\t",                                
                                style: 'footertext',
                                margin: [312,12,72,0],
                                alignment:'right',                                
                            },
                        ]
                    };
                },
                header: function (currentPage, pageCount, pageSize) {
                        return [
                            {
                                image: logo3,
                                width: 612,
                                absolutePosition: { x: 0, y: 0 },
                            },
                        ]
                },
                content: [
                    {
                        text: me.printConjunt[0].uf_DirSubProc,
                        style: 'headertext',
                        absolutePosition: { x: 85, y: 95 },
                    },
                    {
                        text:  'EXPEDIENTE: ' + me.noExpediente,
                        style: 'nuc'
                    },
                    '\n\n\n',
                    {
                        text: html_texto,
                        style: 'texto'
                    },
                    '\n\n\n\n',
                    {
                        style: 'table1',
                        table: {
                            headerRows: 1,
                            widths: ['*','*'],
                            body: [
                                [
                                    { text: 'Solicitante(s).', fontSize: 12, bold: true, alignment: 'center' }, 
                                    { text: 'Requeridos(s).', fontSize: 12, bold: true, alignment: 'center' }
                                ],
                                [bodyDataSolicitantesLineal, bodyDataRequeridosLineal],
                            ]
                        },
                        layout: 'noBorders'
                    },
                    '\n\n\n\n\n',
                    {
                        text:  '\n\n' + me.printConjunt[0].uf_Nombre + '\n' + me.printConjunt[0].uf_Puesto,
                        style: 'ampo'
                    },
                    '\n\n\n\n\n',
                    {
                        text: 'LICENCIADO(A) EN DERECHO ' + contactoDSP + '\n' + cargo.toUpperCase() + ' DEL '+ nombreDSP + ' EN ' + nombreDistrito.toUpperCase(),
                        style: 'ampo'
                    },
                    '\n\n',
                    {
                        text:  'ACUERDO REPARATORIO DEBIDAMENTE VALIDADO EN TÉRMINOS DEL ARTÍCULO 33 PÁRRAFO TERCERO DE LA LEY NACIONAL DE MECANISMOS ALTERATIVOS DE SOLUCIÓN DE CONTROVERSIA EN MATERIA PENAL',
                        style: 'ar'
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
                        bold: false,
                        alignment: 'center',
                    },
                    headertext: {
                        fontSize: 10,
                        bold: true,
                        alignment: 'left',
                    },
                    footertext: {
                        fontSize: 7,
                        
                    },
                    texto: {
                        fontSize: 10,
                        regular: true,
                        alignment: 'justify',
                    },
                    ar: {
                        fontSize: 10,
                        regular: true,
                        alignment: 'center',
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
                        alignment: 'center',
                    },
                    cargo: {
                        fontSize: 9,
                        regular: true,
                        alignment: 'left',
                    },
                    table: {
                        fontSize: 10,
                        margin: [0, 5, 0, 15],
                        alignment: 'justify',
                    },
                    table1: {
                        fontSize: 10,
                        margin: [0, 5, 0, 15],
                        alignment: 'center',
                    },
                }
            }
            
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");
            var doc = pdfMake.createPdf(dd);
            var f = document.getElementById('iframepdfAR1');
            var callback = function(url) { f.setAttribute('src',url); }

            if (pdfMake.vfs == undefined) {
                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                pdfMake.vfs = pdfFonts.vfs;
            }            
            
            doc.getDataUrl(callback, doc);      
            me.Rprint = true                          
            me.framePDF = true; 
        },
        //? Función para visualizar y reimprimir el documento PDF del anexo
        reimpresionA(anexo) {            
            let me = this 
            var pdfMake = require('pdfmake/build/pdfmake.js');
            var htmlToPdfmake = require("html-to-pdfmake");                                    

            var logo3 = me.logo3;
            var logo4 = me.logo4;
            var diragencia = me.direccionAgencia;
            var telagencia = me.telefonosAgencia;
            var contactoDSP = me.contactoDSP;
            var nombreDSP = me.nombreDSP; 
            var nombreDistrito = me.nombreDistrito;
            var cargo = me.cargoResponsable || ''

            var html_texto  = htmlToPdfmake(
                anexo.textoAR
            );

            var bodyDataSolicitantesLineal = [];
            var bodyDataRequeridosLineal = [];
    
            var sourceDataSL = me.v_personInfoS  
            
            sourceDataSL.forEach(function(sourceRow) {
                var dataRow = [];
                                
                    if (me.v_representantes.length > 0) {
                        
                        var hhh = me.v_representantes.filter(cc => cc.personaId == sourceRow.personaId)    
                        if (hhh.length > 0) {
                            dataRow.push(`${sourceRow.nombreCompleto} ${sourceRow.sexo == 'H' ? 'representado por' : 'representada por'} ${hhh[0].nombre != null ? hhh[0].nombre : ''}${hhh[0].apellidoPa != null ? ` ${hhh[0].apellidoPa}` : ''}${hhh[0].apellidoMa != null ? ` ${hhh[0].apellidoMa} ` : ''}`);                            
                        } else {
                            dataRow.push( ' ' + sourceRow.nombreCompleto);
                        }
                    } else {
                        dataRow.push( ' ' + sourceRow.nombreCompleto);                                           
                    }

                    bodyDataSolicitantesLineal.push(dataRow);
                });
                
                var sourceDataRL = me.v_personInfoR;                
    
                sourceDataRL.forEach(function(sourceRow) {
                    var dataRow = [];

                    if (me.v_representantes.length > 0) {
                        var jjj = me.v_representantes.filter(vv => vv.personaId == sourceRow.personaId)
                        if (jjj.length > 0) {
                            dataRow.push(`${sourceRow.nombreCompleto} ${sourceRow.sexo == 'H' ? 'representado por' : 'representada por'} ${jjj[0].nombre != null ? jjj[0].nombre : ''}${jjj[0].apellidoPa != null ? ` ${jjj[0].apellidoPa}` : ''}${jjj[0].apellidoMa != null ? ` ${jjj[0].apellidoMa} ` : ''}`);                            
                        } else {
                            dataRow.push( ' ' + sourceRow.nombreCompleto);                                                                    
                        }
                    }else {
                        dataRow.push( ' ' + sourceRow.nombreCompleto);                                        
                    }

                    bodyDataRequeridosLineal.push(dataRow)                
                });       

            var dd = {
                pageSize: 'LEGAL',
                pageOrientation: 'portrait',
                pageMargins: [ 85, 130, 72, 60 ],
                footer: function (currentPage, pageCount) {
                    return {
                        columns: [     
                            me.vistaPreviaTF == false ?
                                {
                                    image: me.qrCode,
                                    width: 80, // Ajusta el ancho según tu diseño
                                    height: 80, // Ajusta la altura según tu diseño
                                    absolutePosition: { x: 5, y: -80 }, // Ajusta las coordenadas según tu diseño

                                }
                                : "",   
                            {
                                text: diragencia+"\t" + "\n" + telagencia+"\t" + "\n" +  'www.hidalgo.gob.mx'+"\t",                                
                                style: 'footertext',
                                margin: [312,12,72,0],
                                alignment:'right',                                
                            },
                        ]
                    };
                },
                header: function (currentPage, pageCount, pageSize) {
                        return [
                            {
                                image: logo3,
                                width: 612,
                                absolutePosition: { x: 0, y: 0 },
                            },
                        ]
                },
                content: [
                    {
                        text: me.printConjunt[0].uf_DirSubProc,
                        style: 'headertext',
                        absolutePosition: { x: 85, y: 95 },
                    },
                    {
                        text:  'EXPEDIENTE: ' + me.noExpediente,
                        style: 'nuc'
                    },
                    '\n\n\n',
                    {
                        text: html_texto,
                        style: 'texto'
                    },
                    '\n\n\n\n',
                    {
                        style: 'table1',
                        table: {
                            headerRows: 1,
                            widths: ['*','*'],
                            body: [
                                [
                                    { text: 'Solicitante(s).', fontSize: 12, bold: true, alignment: 'center' }, 
                                    { text: 'Requeridos(s).', fontSize: 12, bold: true, alignment: 'center' }
                                ],
                                [bodyDataSolicitantesLineal, bodyDataRequeridosLineal],
                            ]
                        },
                        layout: 'noBorders'
                    },
                    '\n\n\n\n\n',
                    {
                        text:  '\n\n' + anexo.uf_Nombre + '\n' + anexo.uf_Puesto,
                        style: 'ampo'
                    },
                    '\n\n\n\n\n',
                    {
                        text: 'LICENCIADO(A) EN DERECHO ' + contactoDSP + '\n' + cargo.toUpperCase() + ' DEL '+ nombreDSP + ' EN ' + nombreDistrito.toUpperCase(),
                        style: 'ampo'
                    },
                    '\n\n',
                    {
                        text:  'ACUERDO REPARATORIO DEBIDAMENTE VALIDADO EN TÉRMINOS DEL ARTÍCULO 33 PÁRRAFO TERCERO DE LA LEY NACIONAL DE MECANISMOS ALTERATIVOS DE SOLUCIÓN DE CONTROVERSIA EN MATERIA PENAL',
                        style: 'ar'
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
                        bold: false,
                        alignment: 'center',
                    },
                    headertext: {
                        fontSize: 10,
                        bold: true,
                        alignment: 'left',
                    },
                    footertext: {
                        fontSize: 7,
                        
                    },
                    texto: {
                        fontSize: 10,
                        regular: true,
                        alignment: 'justify',
                    },
                    ar: {
                        fontSize: 10,
                        regular: true,
                        alignment: 'center',
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
                        alignment: 'center',
                    },
                    cargo: {
                        fontSize: 9,
                        regular: true,
                        alignment: 'left',
                    },
                    table: {
                        fontSize: 10,
                        margin: [0, 5, 0, 15],
                        alignment: 'justify',
                    },
                    table1: {
                        fontSize: 10,
                        margin: [0, 5, 0, 15],
                        alignment: 'center',
                    },
                }
            }
            
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");
            var doc = pdfMake.createPdf(dd);
            var f = document.getElementById('iframepdfAR1');
            var callback = function(url) { f.setAttribute('src',url); }

            if (pdfMake.vfs == undefined) {
                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                pdfMake.vfs = pdfFonts.vfs;
            }            

            doc.getDataUrl(callback, doc);                    
            me.Rprint = true
            me.framePDF = true; 
        },
        //? Función que genera el código QR
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
                me.$notify("Error al intentar crear el código QR", 'error')
            }
        },
        //? Función para validar si el número de sise es positivo
        validacionSise() {
            let me = this            

            if (me.v_nosise !== null && me.v_nosise !== undefined && me.v_nosise !== '') {
                if (me.v_nosise.includes('-')) {
                    me.siseCorrect = false                                     
                } else {
                    me.siseCorrect = true                                                 
                }                
            }
        },
        listarVialidad(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$conf.get('api/Vialidades/Listar',configuracion).then(function(response){
                response.data.forEach(x => {
                    const item = {text: x.nombre, value: x.clave};
                    me.vialidades.push(item);
                });
            }).catch(err => {
                    if (err.response.status==400){
                        me.$notify("No es un usuario válido", 'error')
                    } else if (err.response.status==401){
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (err.response.status==403){
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403= true
                        me.showpage= false
                    } else if (err.response.status==404){
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    }else{
                        me.$notify('Error al intentar listar los registros','error')
                    }
                });
        }
    }
}
</script>
<style>
.selected_row {
  background-color: #e0f7fa; /* Color de fondo para la fila seleccionada */
}
</style>
