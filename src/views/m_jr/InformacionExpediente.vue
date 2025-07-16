<template>
    <!-- --------------------------------------------------------------------------------------------------------------- -->
    <!-- Componente principal -->
    <!-- --------------------------------------------------------------------------------------------------------------- -->
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
        <!-- Modulos de error -->
        <!-- --------------------------------------------------------------------------------------------------------------- -->
        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <!-- --------------------------------------------------------------------------------------------------------------- -->
        <!-- Componente principal -->
        <!-- --------------------------------------------------------------------------------------------------------------- -->
        <v-flex v-if="showpage">
            <!-- --------------------------------------------------------------------------------------------------------------- -->
            <!-- Bloque de funciones principales para el manejo de la información del expediente -->
            <!-- --------------------------------------------------------------------------------------------------------------- -->
            <v-toolbar flat color="white">
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <!-- Botones de acción de cierre o visualización de la reseña breve -->
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <v-toolbar-title class="font-weight-regular" >Expediente.</v-toolbar-title>            
                <v-divider class="mx-2" inset vertical></v-divider>            
                <v-spacer></v-spacer>           
                <v-spacer></v-spacer>
                <v-flex xs12 sm6 md3> 
                    <v-text-field 
                        class="font-weight-regular"
                        v-model="noExpediente" 
                        disabled
                        prepend-icon="folder"
                        filled
                    ></v-text-field>
                </v-flex>
                <v-tooltip bottom>
                        <template v-slot:activator="{ on }"> 
                            <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click="cerrarexpediente" fab dark small color="primary">
                                <v-icon dark class="mt-1">close</v-icon>
                            </v-btn>
                        </template>
                        <span>Cerrar carpeta</span>
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
                        <v-icon dark class="mt-1">menu_book</v-icon>
                        </v-btn>
                    </template>
                    <span>Reseña breve</span>
                </v-tooltip>
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <!-- Botones de acción de visualización de información de personas, representantes, delitos, edición de nombres ó en caso de ser un usuario con rol de Director, poder reasignar el expediente -->
                <!-- --------------------------------------------------------------------------------------------------------------- -->
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
                        <v-icon dark class="mt-1">person</v-icon>
                        </v-btn>
                    </template>
                    <span>Solicitantes/Requeridos</span>
                </v-tooltip>
                <v-tooltip bottom v-if="u_rol != 'Notificador'">
                    <template v-slot:activator="{ on }">
                        <v-btn
                        class="mx-2 py-2"
                        slot="activator"
                        v-on="on"
                        @click="ListarPersonaR()"
                        fab
                        dark
                        small
                        color="grey"
                        >
                        <v-icon dark class="mt-1">people</v-icon>
                        </v-btn>
                    </template>
                    <span>Personas a representar</span>
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
                        <v-icon dark  class="mt-1">report</v-icon>
                        </v-btn>
                    </template>
                    <span>Delito(s)</span>
                </v-tooltip> 
                <v-tooltip bottom  v-if="u_rol == 'Director' || u_rol == 'Administrador'">
                    <template v-slot:activator="{ on }">
                        <v-btn
                        class="mx-2 py-2"
                        slot="activator"
                        v-on="on"
                        @click="ReasignarExp()"
                        fab
                        dark
                        small
                        color="primary"
                        >
                        <v-icon dark class="mt-1">sync_alt</v-icon>
                        </v-btn>
                    </template>
                    <span>Reasignar expediente</span>
                </v-tooltip>                         
                <v-tooltip bottom v-if="conjuntoSiNo == 1 && u_rol != 'Notificador'">
                    <template v-slot:activator="{ on }">
                        <v-btn
                        class="mx-2 py-2"
                        slot="activator"
                        v-on="on"
                        @click="editarNombres()"
                        fab
                        dark
                        small
                        color="success"
                        >
                        <v-icon dark  class="mt-1">emoji_people</v-icon>
                        </v-btn>
                    </template>
                    <span>Editar nombres</span>
                </v-tooltip> 
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <!-- Botones de acción para conversión del expediente a conjunto -->
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <v-tooltip bottom v-if="conjuntoSiNo == 0">
                    <template v-slot:activator="{ on }">
                        <v-btn
                        class="mx-2 py-2"
                        slot="activator"
                        v-on="on"
                        @click="convertirNoConjuntos()"
                        fab
                        dark
                        small
                        color="success"
                        >
                        <v-icon dark>call_made</v-icon>
                        </v-btn>
                    </template>
                    <span>Convertir expediente a conjunto</span>
                </v-tooltip> 
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <!-- Modal para visualizar la reseña breve -->
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <v-dialog v-model="ResenaBreve" max-width="1000px">
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
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <!-- Modal para visualizar la información detallada de las personas -->
                <!-- --------------------------------------------------------------------------------------------------------------- -->
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
                                                :items="resultSolReq"
                                                item-text="nombre"        
                                                item-value="value"
                                                v-model="SolReque"
                                                label="Nombre Solicitante/Requerido"
                                                v-on:change="pdfSolReq(SolReque)"
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
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <!-- Modal para mostrar el PDF con la información de la persona seleccionada -->
                <!-- --------------------------------------------------------------------------------------------------------------- -->
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
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <!-- Modal para la selección del delito para visualizar la información detallada -->
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <v-dialog v-model="ModalDelitos" max-width="700px">
                    <v-card>
                        <v-toolbar card dark color="grey lighten-4 primary--text">
                            <v-avatar size="30">
                                <v-icon class="grey lighten-2">info</v-icon>
                            </v-avatar>
                            <v-toolbar-title class="subheading">Información detallada del delito</v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="form">
                                <v-container grid-list-md>
                                    <v-card-text>
                                    <v-form data-vv-scope="form1">                         
                                    <v-flex xs12 sm12 md12>
                                    <v-autocomplete
                                        name="Delitos"
                                        :items="v_delitos"
                                        v-model="Delitos"
                                        label="Nombre del delito"
                                        v-on:change="pdfinfoDelito(Delitos)"
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
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <!-- Modal para mostrar el PDF de la información detallada del delito -->
                <!-- --------------------------------------------------------------------------------------------------------------- -->
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
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <!-- Modal para mostrar la información de los representantes -->
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <v-dialog v-model="ModalPerepresentar" max-width="900px">
                    <v-card>
                        <v-toolbar card dark color="grey lighten-4 primary--text">
                            <v-avatar size="30">
                                <v-icon class="grey lighten-2" color="primary">people</v-icon>
                            </v-avatar>
                            <v-toolbar-title class="subheading">Personas a representar.</v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>
                        <!-- --------------------------------------------------------------------------------------------------------------- -->
                        <!-- Contenido central donde se recorren los representantes para mostrarlos en la tabla -->
                        <!-- --------------------------------------------------------------------------------------------------------------- -->
                        <v-card-text>
                            <v-form ref="form">
                                <v-container grid-list-md>
                                    <v-card-text>                     
                                        <v-data-table
                                            :headers="headersM"
                                            :items="perRe"
                                        >
                                            <template slot="items" class="white" slot-scope="props">
                                                <td class="text-xs-center">{{ props.index + 1 }}</td>
                                                <td class="text-xs-center">{{ props.item.nombreCompleto}}</td>
                                                <td class="text-xs-center">{{ props.item.tipo}}</td>
                                                <td class="text-xs-center">{{ props.item.representanteJr.trim() === ''? "Sin representante": props.item.representanteJr }}</td>
                                                <!-- --------------------------------------------------------------------------------------------------------------- -->
                                                <!-- Bloque de botones de acción sobre los representantes (edición y adición) -->
                                                <!-- --------------------------------------------------------------------------------------------------------------- -->
                                                <td class="justify-center layout px-0">
                                                    <v-tooltip bottom v-if="props.item.representanteJr.trim() !== ''">
                                                        <template v-slot:activator="{ on }">                       
                                                            <v-icon class="mr-2" v-on="on" color="default" @click="ActualizarRepre(props.item.idPersona)">
                                                            edit
                                                            </v-icon>  
                                                        </template>
                                                        <span>Actualizar Representante</span>
                                                    </v-tooltip>
                                                    <v-tooltip bottom v-if="props.item.representanteJr.trim() === ''">
                                                        <template v-slot:activator="{ on }">                       
                                                            <v-icon class="mr-2" v-on="on" color="default" @click="representantesGuardar(props.item.idPersona)">
                                                                person_add
                                                            </v-icon>  
                                                        </template>
                                                        <span>Registro Representante</span>
                                                    </v-tooltip>
                                                </td>                    
                                            </template>
                                        </v-data-table> 
                                    </v-card-text>
                                </v-container>   
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn @click="ModalPerepresentar = false">Cerrar</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <!-- Modal para muestreo de formulario requerido para la adición de un representante -->
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <v-dialog v-model="modalresponsable" fullscreen hide-overlay transition="dialog-bottom-transition">  
                    <v-card>
                        <v-toolbar dark color="primary">
                            <v-avatar size="30">
                                <v-icon >person</v-icon>
                            </v-avatar> 
                            <v-toolbar-title>Registro de Representante</v-toolbar-title>
                            <v-spacer />
                            <v-toolbar-items>
                                <v-btn icon @click="responsableClose()">
                                    <v-icon>close</v-icon>
                                </v-btn>
                            </v-toolbar-items>
                        </v-toolbar>
                        <!-- --------------------------------------------------------------------------------------------------------------- -->
                        <!-- Bloque de formulario por pasos -->
                        <!-- --------------------------------------------------------------------------------------------------------------- -->
                        <v-stepper v-model="step" non-linear vertical>
                            <!-- Encabezado del paso 1 -->
                            <v-stepper-step 
                                :complete="step > 1" 
                                step="1" 
                                editable>
                                Captura de datos
                                <small>Datos generales del representante.</small>
                            </v-stepper-step>
                            <!-- Formulario paso 1 (Datos personales) -->
                            <v-stepper-content step="1">
                                <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                    <v-container grid-list-md text-xs-center>
                                        <v-layout row wrap> 
                                            <v-flex class="espaciado" xs12 sm12 md6 lg6> 
                                                <v-text-field 
                                                    name="nombre"  
                                                    label="*Nombre(s):" 
                                                    v-model="nombres"   
                                                    v-validate="'required'"
                                                    :error-messages="errors.collect('nombre')"
                                                />
                                                <v-text-field 
                                                    name="apellido paterno" 
                                                    label="*Apellido paterno:" 
                                                    v-model="apaterno" 
                                                    v-validate="'required'"
                                                    :error-messages="errors.collect('apellido paterno')" 
                                                />
                                                <v-text-field 
                                                    name="apellido materno" 
                                                    label="Apellido materno:" 
                                                    v-model="amaterno" 
                                                />
                                                <v-text-field 
                                                    name="curp" 
                                                    v-model="rcurp"    
                                                    label="CURP:"  >
                                                </v-text-field>

                                                <v-text-field name="nacionalidad" 
                                                    label="Nacionalidad:" 
                                                    v-model="rnacionalidad"  >
                                                </v-text-field>
                                            </v-flex>   
                                            <v-flex class="espaciado" xs12 sm12 md6 lg6> 

                                            <v-text-field name="fecha de nacimiento"  
                                                    label="*Fecha de nacimiento:" 
                                                    v-model="rfechanaciomiento"
                                                    v-validate="'date_format:dd/MM/yyyy'"
                                                    :error-messages="errors.collect('fecha de nacimiento')" >
                                            </v-text-field>

                                            <v-text-field name="Edad" 
                                                    label="Edad:" 
                                                    v-model="redad" 
                                                    :rules="[edadRule]"
                                                    type="number"  >
                                            </v-text-field>

                                            <v-text-field 
                                                    label="Telefono :"  
                                                    v-model="telefono" 
                                                    :rules="[onlyNumbersRule]"
                                                />
                                                <v-text-field 
                                                    label="Correo electrónico:"  
                                                    v-model="correo" 
                                                    :rules="[emailRule]"
                                                />  
                                            </v-flex>              
                                        </v-layout>
                                        <v-spacer />
                                        <div class="text-xs-right">
                                            <v-btn color="primary" @click.native="step = 2">Continuar</v-btn>
                                        </div>
                                    </v-container>   
                                </v-card>
                            </v-stepper-content>    
                            <!-- Encabezado del paso 2 -->
                            <v-stepper-step :complete="step > 2" step="2" editable>
                                Dirección del representante
                            </v-stepper-step>
                            <!-- Formulario paso 1 (Datos de dirección) -->
                            <v-stepper-content step="2">
                                <v-card color="grey lighten-5" elevation=0 class="mb-5" height="auto">
                                    <v-container grid-list-md text-xs-center>
                                        <v-layout row wrap> 
                                            <v-flex class="espaciado" xs12 sm12 md6 lg6> 
                                            <v-autocomplete
                                                    name="tipo vialidad"
                                                    :items="de_vialidades"
                                                    v-model="de_vialidad"
                                                    label="Tipo de vialidad:" 
                                                    :error-messages="errors.collect('tipo vialidad')" 
                                                />
                                                <v-text-field 
                                                    label="Nombre:" 
                                                    name="calle" 
                                                    v-model="de_calle" 
                                                    :error-messages="errors.collect('calle')" 
                                                />
                                                <v-text-field 
                                                    name="numero exterior" 
                                                    v-model="de_noExt" 
                                                    label="Número exterior:" 
                                                    type="number"
                                                    :error-messages="errors.collect('numero exterior')"
                                                />
                                                <v-text-field 
                                                    label="No. Interior:"    
                                                    type="number"
                                                    v-model="de_noInt" 
                                                />    
                                                <v-text-field 
                                                    label="Entre calle 1:"   
                                                    v-model="de_entreCalle1" 
                                                />   
                                                <v-text-field 
                                                    label="Entre calle 2:" 
                                                    v-model="de_entreCalle2" 
                                                /> 
                                                <v-text-field 
                                                    label="Referencia:"   
                                                    v-model="de_referencia" 
                                                /> 
                                            </v-flex>
                                            <v-flex class="espaciado" xs12 sm12 md6 lg6> 
                                            <v-text-field 
                                                    label="Pais:" 
                                                    name="pais" 
                                                    v-model="de_pais" 
                                                    value="México" 
                                            />
                                            <v-autocomplete 
                                                    label="Estado:" 
                                                    name="estado"     
                                                    v-model="de_estadoid"
                                                    :items="de_ciudades"  
                                                    return-object
                                                    v-on:change="de_listarPorEstado" 
                                                    @focus="de_listarCiudades();"
                                                />
                                                <v-autocomplete 
                                                    label="Municipio:" 
                                                    name="municipio" 
                                                    v-model="de_municipioid" 
                                                    :items="de_municipios"
                                                    return-object  
                                                    v-on:change="de_listarPorMunicipio" 
                                                />
                                                <v-autocomplete 
                                                    label="Localidad:" 
                                                    name="localidad" 
                                                    v-model="de_localidadid" 
                                                    :items="de_localidades" 
                                                    return-object
                                                    v-on:change="de_listarPorLocalidad"
                                                />
                                                 <v-autocomplete
                                                    name="tipo asentamiento"
                                                    :items="de_asentamientos"
                                                    v-model="de_asentamiento"
                                                    label="Tipo de asentamiento:" 
                                                    :error-messages="errors.collect('tipo asentamiento')" 
                                                />
                                                <v-text-field 
                                                    label="Código postal:" 
                                                    name="cp" 
                                                    v-model="de_cp"
                                                    @keyup.enter="buscarPorCP()" 
                                                />
                                            </v-flex>
                                        </v-layout>
                                        <div class="text-xs-right">
                                            <v-btn flat @click.native="step = 1">Anterior</v-btn> 
                                            <v-btn color="success" @click.native="guardarResponsable()">{{ buttonText }}</v-btn>  
                                        </div>
                                    </v-container>
                                </v-card>
                            </v-stepper-content>
                        </v-stepper> 
                    </v-card> 
                </v-dialog>
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <!-- Modal para reasignación del expediente -->
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <v-dialog v-model="modalReasignacion" max-width="700px">
                    <v-card>
                        <v-toolbar card dark color="grey lighten-4 primary--text">
                            <v-avatar size="30">
                                <v-icon class="grey lighten-2">sync_alt</v-icon>
                            </v-avatar>
                            <v-toolbar-title class="subheading"
                                >Reasignación de expediente</v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>
                        <!-- --------------------------------------------------------------------------------------------------------------- -->
                        <!-- Contenido central del formulario para la reasignación -->
                        <!-- --------------------------------------------------------------------------------------------------------------- -->
                        <v-card-text>
                            <v-form ref="form">
                                <v-autocomplete name="modulos"
                                    :items="v_modulos"
                                    v-model="modulos"
                                    prepend-icon="perm_identity" 
                                    label="Modulos:" 
                                    v-on:change="listarFacilitadores(modulos)">
                                </v-autocomplete>
                                <v-autocomplete name="facilitadores"
                                    :items="v_facilitadores"
                                    v-model="v_facilitador"
                                    prepend-icon="perm_identity" 
                                    label="Facilitadores:"   
                                    return-object>
                                </v-autocomplete>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn @click="closeReasignar()">Cerrar</v-btn>
                                    <v-btn @click="reasignar()" class="success">Reasignar</v-btn>
                                </v-card-actions>                                                                                                        
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <!-- Modal para la edición de los nombres de las personas -->
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <v-dialog v-model="modalEditarNombres" max-width="900px">
                    <v-card>
                        <v-toolbar card dark color="grey lighten-4 primary--text">
                            <v-avatar size="30">
                                <v-icon class="grey lighten-2">emoji_people</v-icon>
                            </v-avatar>
                            <v-toolbar-title class="subheading"
                                >Editar nombres del Solictante/Requerido</v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="form">
                                <v-autocomplete 
                                    name="SolRequ"
                                    :items="itemSolReq"
                                    v-model="SolRequ"
                                    prepend-icon="group" 
                                    label="¿Solicitante o requerido?:" 
                                    v-on:change="mostrarListado()"
                                    >
                                </v-autocomplete>
                                <v-autocomplete 
                                    v-if="SolRequ != ''"
                                    name="nombre"
                                    :items="itemsNombreSR"
                                    v-model="nombreConjunto"
                                    prepend-icon="person" 
                                    label="¿A quien le editaras el nombre?:"                                     
                                    chips
                                    deletable-chips
                                    v-on:change="mostrarComponet()">
                                </v-autocomplete>
                                <v-text-field
                                    v-if="nombreConjunto != ''"
                                    name="NombreCorregido"
                                    v-model="nombreCorregido"
                                    prepend-icon="emoji_people" 
                                    label="Quedando de la siguiente manera:"   
                                    return-object>
                                </v-text-field>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn @click="cerrarModalEditarNombres()">Cerrar</v-btn>
                                    <v-btn @click="editarNombresConjuntos()" class="success"  v-if= "SolRequ != '' && nombreConjunto != '' && nombreCorregido != '' ">Aplicar cambios</v-btn>
                                </v-card-actions>                                                                                                                
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <!-- Modal de formulario para la reasignación del expediente -->
                <!-- --------------------------------------------------------------------------------------------------------------- -->
                <v-dialog v-model="confirmacionConverConjunto" max-width="1000px">
                    <v-card>
                        <v-toolbar card dark color="grey lighten-4 primary--text">
                            <v-avatar size="30">
                                <v-icon class="grey lighten-2">settings</v-icon>
                            </v-avatar>
                            <v-toolbar-title class="subheading">¿Estas seguro de convertir este expediente a conjuntos?</v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="form">
                                <p v-html="mensajeConfirmacionC"></p> 
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn @click="confirmacionConverConjunto = false">Cerrar</v-btn>
                                    <v-btn @click="convertirAConjunto()" class="success" v-if= "ActivBoton">Convertir</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>                
            </v-toolbar>
            <!-- --------------------------------------------------------------------------------------------------------------- -->
            <!-- Bloque de muestro de información y flujo -->
            <!-- --------------------------------------------------------------------------------------------------------------- -->
            <v-card>
                <v-flex  xs12 md12 lg12 pa-4>                                                        
                    <h3>Información general del expediente</h3>
                    <v-divider ></v-divider>
                    <br>
                    <!-- --------------------------------------------------------------------------------------------------------------- -->
                    <!-- Bloque de tabla para visualización de datos generales del expediente -->
                    <!-- --------------------------------------------------------------------------------------------------------------- -->
                    <v-layout >                            
                        <v-flex  xs6 md6 lg6>
                            <table>
                                <tr>
                                    <td  > Expediente: </td>
                                    <td><b> {{noExpediente}}</b></td> 
                                </tr>
                                <tr>
                                    <td>No. de derivacion:</td>
                                    <td><b> {{ noDerivacion }}</b></td>
                                </tr>
                                <tr>
                                    <td>Fecha de derivación:</td>
                                    <td><b>{{ formatearfechahora(fechaDerivacion)}} </b></td>
                                </tr>
                                <tr>
                                    <td>Fecha de registro:</td>
                                    <td><b>{{ formatearfechahora(fechaExpediente)}} </b></td>
                                </tr>
                                <tr>
                                    <td>NUC:</td>
                                    <td><b>{{ nuc }} </b></td>
                                </tr>
                                <tr>
                                    <td>Fecha y hora suceso:</td>
                                    <td><b>{{ formatearfechahora(fechaHoraSuceso)}} </b></td>
                                </tr>
                                <tr>
                                    <td>Estatus:</td>
                                    <td><b> {{  StatusGeneral}}</b></td>
                                </tr>
                                <tr>
                                    <td>Tipo:</td>
                                    <td><b>{{  EspontaneoNoEspontaneo}} </b></td>
                                </tr>
                                <tr>
                                    <td> Es:</td>
                                    <td><b>{{  primeraVezSubsecuente}} </b></td>
                                </tr>
                                <tr>
                                    <td>Personas involucradas:</td>
                                    <td><b>{{ NoSolicitantes}} </b></td>
                                </tr>
                                <br>
                            </table>
                        </v-flex>
                            <v-flex  xs6 md6 lg6>
                                <table>
                                        
                                        <tr>
                                            <td>Agencia:</td>
                                            <td><b> {{ uqe_Agencia}}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Modulo:</td>
                                            <td><b>{{uqe_Modulo}} </b></td>
                                        </tr>
                                        <tr>
                                            <td>AMP:</td>
                                            <td><b>{{uqe_Nombre}} </b></td>
                                        </tr>
                                        <tr>
                                            <td>Puesto:</td>
                                            <td><b>{{uqe_Puesto}} </b></td>
                                        </tr>
                                        
                                    
                                </table>                              
                        </v-flex>                      
                    </v-layout>
                    <v-divider></v-divider>  
                    <!-- --------------------------------------------------------------------------------------------------------------- -->
                    <!-- Bloque de recorrido de los conjuntos para su visualización en una tabla -->
                    <!-- --------------------------------------------------------------------------------------------------------------- -->
                    <v-data-table
                        :headers="headersSR"
                        :items="personaSR"
                        :rows-per-page-items="rowsPerPageItems"
                        :pagination.sync="pagination">
                        <template slot="items" class="white" slot-scope="props">
                            <td class="text-xs-center"> 
                                <template>
                                {{ props.index + 1 }}
                                </template>
                            </td>
                            <td class="text-xs-center"> 
                                <template>
                                {{ props.item.nombreS }}
                                </template>
                            </td>
                            <td class="text-xs-center">
                                <template>
                                {{ props.item.nombreR }}
                                </template>
                            </td>
                            <td class="text-xs-center">
                                <template>
                                {{ props.item.nombreD }}
                                </template>
                            </td>
                        </template>
                    </v-data-table>                                                      
                </v-flex>
            </v-card>
        </v-flex>
    </v-layout> 
</template> 
<script>  
import axios from 'axios'  
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import VeeValidate from 'vee-validate'    
import { error } from 'util'; 
//** COMPONENTES */
import n401 from '../../components/m_jr/401'
import n403 from '../../components/m_jr/403'
import SolicitantesRequeridos from '../../components/m_jr/SolicitantesRequeridos'
import Delitos from '../../components/m_jr/Delitos'
import moment from 'moment'
import 'moment/locale/es';
import alertify from 'alertifyjs';
import { VueEditor } from "vue2-editor";  
import { generarQRCodeBase64 } from './crearQR';  
import { rmSync } from 'fs';

  export default {
    components: { 
        SolicitantesRequeridos,
        Delitos,
        n401,
        n403,
        "vue2-editor": VueEditor ,       
    },
    data: function () {
        return {
            e401:false, 
            e403:false,
            showpage:true,  
            
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
                { text: 'No Expediente', value: 'noExpediente' }, 
                { text: 'No Derivación', value: 'noDerivacion' }, 
                { text: 'Fecha', value: 'fechaRegistroExpediente' }, 
                { text: 'NUC', value: 'nuc' },  
                { text: 'Status', value: 'statusGeneral', sortable: false }, 
                { text: 'Opciones', value: 'opciones', sortable: false },                                  
            ],
            headersSR: [
                { text: 'No.', value: 'index', align: 'center'},
                { text: 'Solicitante(s)', value: 'nombreS', align: 'center'},
                { text: 'Requerido(s)', value: 'nombreR', align: 'center'},
                { text: 'Delito(s)', value: 'nombreD', align: 'center'},
                ], 
            search: '',
            rowsPerPageItems: [10, 20, 30, 40, 50],
            pagination: {
                rowsPerPage: 20
            },             
            //* VARIABLES PARA LA INFORMACION DEL EXPEDIENTE
            rHechoId:'',
            envioId:'',
            expedienteId:'', 
            noExpediente:'',
            noDerivacion:'',
            fechaExpediente: '',
            fechaDerivacion: '' ,
            u_rol:'',
            nuc:'',
            fechaHoraSuceso:'',
            StatusGeneral:'',
            EspontaneoNoEspontaneo:'',
            primeraVezSubsecuente:'',
            NoSolicitantes:'',
            uqe_Agencia:'',
            uqe_Modulo:'',
            uqe_Nombre:'',
            uqe_Puesto:'',
            reseñaBreve:'',
            mensajeConfirmacionC:'Al convertir este registro a conjuntos esta accion no puede ser revertida. Al aceptar por favor espere que termine el proceso y no cierre el navegador.',
            narrativa:'',
            statusInforme:'',
            ArraySolReql: [],
            infoSolReq: [],
            v_delitos: [],
            arrayDelito: [],    
            modalNarrativa:false,
            ResenaBreve: false,
            ModalSolReque: false,
            modal_Persona: false,
            modal_Delito: false,
            ModalDelitos: false,
            personaSR: [],                
            texto:'',
            comilla:'"',
            horas:'',
            texto2:'',
            tipo2:'',
            texto3:'',
            manifesto:'',
            hechos:'',
            representantesf :'',
            personaf:'',
            inicialesf:'',
            acvictima:'',
            acnombre :'',
            psimenor:'',
            puestopsi :'',
            numerooficio :'',
            clasificacionPersona:'',
            nombre:'',
            alias:'',
            tipopersona:'',
            curp:'',
            docIdentificacion:'',
            nacionalidad:'',
            tel :'',
            email:'',
            genero:'',
            sexo :'',
            fechaNacimiento:'',
            medionotificacion:'',
            ocupacion:'',
            nivelestudio:'',
            religion:'',
            lengua:'',
            estadocivil:'',
            tipodiscapacidad:'',
            direccionpersonal:'',
            edad:'',
            SolReque:'',
            Delitos: '',
            modalReasignacion: false,
            v_modulos: [],
            v_facilitadores: [],
            modulos: '',
            v_facilitador: '',
            v_notificador: '',                         
            direccionAgenciaqe:'',
            telefonosAgenciaqe:'',
            direccionAgencia: '',
            telefonosAgencia: '',
            //* Variables para elistar personas a representar
            botonMenores: false,
            ModalPerepresentar: false,
            modalresponsable: false,
            alerta: false,
            perRe: [],
            editedIndex: 0,
            step:1,
            nombres: '',
            apaterno:'',
            amaterno:'',
            telefono:'',
            correo:'',
            de_calle:'',
            de_noExt:'',
            de_noInt:'',
            de_entreCalle1: '',
            de_entreCalle2: '',
            de_referencia: '',
            de_pais:'México',
            de_ciudades:[],
            de_estadoid: 0,
            de_municipios:[],
            de_municipioid:0,
            de_localidades:[],
            de_localidadid:0,
            de_cp:'',
            de_vialidad:'',
            de_vialidades:[],
            de_asentamiento:'',
            de_asentamientos:[],
            PersonaRepresentada:'',
            idResponsable: '',
            rnacionalidad:'Mexicana',
            rcurp:'',
            redad:0,
            rfechanaciomiento:'',
            ridresponsable:'',
            headersM: [
                { text: 'No.', value: 'index', align: 'center'},
                { text: 'Persona a Representar', value: 'NombreCompleto', align: 'center'},
                { text: 'Tipo', value: 'Tipo', align: 'center'},
                {text: 'Representante', value: 'representante', align: 'center'},
                { text: 'Opciones', value: 'opciones', align: 'center'},
            ],                         
            itemSolReq: ['Solicitante','Requerido'],                        
            modalEditarNombres:false,
            arraynombreS:'',
            arraynombreR:'',
            itemsNombreS:[],
            itemsNombreR:[],
            itemsNombreSR:[],
            nombreCorregido:'',
            nombreConjunto:'',
            SolRequ:'',
            conjuntoSiNo:0,
            confirmacionConverConjunto:false,
            ActivBoton:false,
            NoHayAR: 0,
            idAcuerdoReparatorio : '',
            sesiones : [],
            personas : [],
            delitos : [],
            mostrarJrResponsable: false,
            validaDatos: '',
            edadr:'',
            repreCat:'',
            repreJr: '',
            nombresModificados:'',
            nomCambiadosC:[],
            infoSolReq: '',
            resultSolReq:[],
            fechaN:'',
            autoRepresentante: [],
            exisJr:'',
            NoHayRe: '',
            idEntrevista: '',
            idDelito: '',

            //* VARIABLES PARA MANEJO DEL QR           
            texto: 'Vista Previa',
            qrCode: null,
            docRemision: 'Remisión',
            vistaPreviaTF: true,
            asignacionenv: [],
            asignacionEnvioId:''
        };
    }, 
    created () { 
        let me = this    
        me.expedienteId =  me.$store.state.idExpediente ;
        me.envioId = me.$store.state.idEnvio;
        me.noExpediente = me.$store.state.noExpediente;
        me.u_rol=me.$store.state.usuario.rol;
        me.rHechoId = me.$store.state.idrhecho;
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
        
        if (me.expedienteId== null)
        {
            me.$alert('Notificación', 'Aun no ha abierto ninguna expediente por favor ingrese al menu Mis expedientes y luego en Mi lista de expedientes asignados y  ahi abra la expediente que usted elija!. En este momento sera redireccionado al menu correspondiente.', 
            function(){  
                if (me.u_rol == 'Facilitador' || me.u_rol=="Notificador")
                {
                    me.$router.push('./jr-misexpedientes') 
                }
                else
                {
                    me.$router.push('./jr-expedientesaceptados') 
                }                        
            })
        } else {
            me.$notify('Expediente abierto correctamente !!!','success')                                         
            me.envioId= me.$store.state.idEnvio;
            me.expedienteId= me.$store.state.idExpediente;
            me.noExpediente= me.$store.state.noExpediente;                                        
            me.abtraerInfoCSC();                
            me.InformacionExpediente();
            me.listarLogo();
            me.informacionagencia();
            //me.ExistanciaRepreCat()
            me.listarVialidad();
            me.listarAsentamiento();                   
        }               
        // INTERCEPTOR MODULO DE JUSTICIA RESTAURATIVA
        axios.interceptors.request.use( (config)=> { 
          me.$store.commit('LOADER',true);
          return config;
        }, (error)=> {  
          me.$store.commit('LOADER',false);
          return Promise.reject( error);
        }); 
          axios.interceptors.response.use((response)=>{ 
          me.$store.commit('LOADER',false); 
          return response;
        },  (error)=> {  
          me.$store.commit('LOADER',false); 
          return Promise.reject(error);
        });           
    },
    computed: {
        buttonText() {
            return this.editedIndex == 0 ? 'Guardar' : 'Actualizar';
        },
        emailRule() {
            return v => !!v.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || 'Correo inválido';
        },
        onlyNumbersRule() {
            return v => /^[0-9]*$/.test(v) || 'Solo se permiten números';
        },
        edadRule(){
            return v => !!v || 'La edad no puede estar vacía. Si no la conoce, ingrese 0.'
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
        qrCode(val) {
            let me = this
            if (val != '') {              
                if (me.docRemision == 'Registro de entrevista completa') {
                    var dd = me.downloadPdf(me.uqe_Nombre,me.uqe_Puesto,me.uqe_Agencia);
                    var pdfMake = require('pdfmake/build/pdfmake.js')
                    var htmlToPdfmake = require("html-to-pdfmake");                    

                    if (pdfMake.vfs == undefined){
                        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                        pdfMake.vfs = pdfFonts.vfs; 
                    }

                    var doc = pdfMake.createPdf(dd).print(); 
                    me.ResenaBreve = false;                
                    me.docRemision = ''   
                } else if (me.docRemision == 'Registro de Información detallada de persona') {
                    var dd = this.crearPdf_Persona();            
  
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
                    me.SolReque = ''
                    me.ModalSolReque = false
                    this.modal_Persona = true;                            
                    me.docRemision = ''   
                } else if(me.docRemision == 'Información detallada del delito') {
                    var dd = this.crearPdf_Delito();
                    var pdfMake = require('pdfmake/build/pdfmake.js')
                    var htmlToPdfmake = require("html-to-pdfmake");
                    if (pdfMake.vfs == undefined){
                        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                        pdfMake.vfs = pdfFonts.vfs;
                    }
                    var doc = pdfMake.createPdf(dd);
                    var f = document.getElementById('iframepdf3'); 
                    var callback = function(url) { f.setAttribute('src',url); }
                    doc.getDataUrl(callback, doc);
                    this.modal_Delito = true;          
                    me.ModalDelitos = false                
                    me.docRemision = ''   
                }                      
            }
        }
    },
    methods:{ 
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
        ListarPersonaR(){
          let me = this;
          me.ModalPerepresentar = true;
          me.listarPersoRepre();
        },
        listarPersoRepre(){
          let me = this;
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion={headers : header};
          var nomConjuntos = [],
              nombreIndex = "",
              nombreNuevo = "",
              nomSincomas = [];
          //Consultamos la tabla conjuntos por si ha ocurrido un cambio en los nombres de los Sol/Req
          me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/ListarNomConjuntos/' + me.envioId, configuracion).then(function(response){
                me.nombresModificados = response.data;
              
                //Guardamos el resultado de las dos columnas en un mismo arreeglo 
                me.nomCambiadosC = me.nombresModificados.map(item => ({NombreR: item.nombreR, NombreS: item.nombreS}));             
               
                //consultamos las personas de CAT
                me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/ListarPersonRepre/' + me.envioId, configuracion).then(function(response){
                    me.perRe = response.data;
                        
                    nomConjuntos = me.nomCambiadosC.flatMap(persona => [persona.NombreR, persona.NombreS]);
                    nomSincomas = nomConjuntos.join(";").split(";").map(nombre => nombre.trim());
                   
                    me.perRe.forEach(persona => {
                    //Si el nombre no se encuentra en el array esta funcion indexOf retorna -1
                           
                        nombreIndex = nomSincomas.indexOf(persona.nombreCompleto);
                            
                        if (nombreIndex === -1) {
                        // Si el nombreCompleto no está en nomSincomas, actualiza el nombreCompleto
                             nombreNuevo = nomSincomas.find(nombre => !me.perRe.some(p => p.nombreCompleto === nombre));
                            if (nombreNuevo) {
                                persona.nombreCompleto = nombreNuevo;     
                                }
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

        },
        representantesGuardar(PersonaRepre){
            let me = this;
            me.modalresponsable = true;
            me.PersonaRepresentada = PersonaRepre;
        },
        representanteG(){
        //Código para guardar cuando no hay representante en Cat o Jr
        let me=this;
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};

        me.$validator.validate().then(result => {
            if (result) {

                me.$justiciarestaurativa.post('api/Responsablejrs/Crear',{
                    'personaId':me.PersonaRepresentada, 
                    'nombre': me.nombres,
                    'apellidoPa': me.apaterno,
                    'apellidoMa': me.amaterno,
                    'edad': me.redad,
                    'fechaNacimiento': me.rfechanaciomiento,
                    'nacionalidad': me.rnacionalidad,
                    'curp': me.rcurp,
                    'telefono': me.telefono,
                    'correo': me.correo,
                    'calle': me.de_calle,
                    'noExt': me.de_noExt,  
                    'noint': me.de_noInt,
                    'entreCalle1': me.de_entreCalle1,
                    'entreCalle2': me.de_entreCalle2, 
                    'referencia': me.de_referencia,
                    'pais': me.de_pais,
                    'estado': me.de_estado,
                    'municipio': me.de_municipio,
                    'localidad': me.de_localidad,
                    'codigoPostal': me.de_cp,
                    'tipoVialidad': me.de_vialidad,
                    'tipoAsentamiento': me.de_asentamiento,

                },configuracion).then(function(response){
                    me.modalresponsable = false;
                    me.$notify('La información se guardo correctamente !!!','success')  
                    me.responsableClose();
                    me.listarPersoRepre();
                    
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
        }else{
                me.$alert('Notificación', 'Tiene campos requeridos vacios.', 
                    function(){  
                        me.step = 1;
                    })
            }

        });

        },
        listarJR(){
        //Consultamos en tabla Jr para mostrar en el Form y validar si existe registro de Cat
        let me = this;
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header}; 
          
        me.$justiciarestaurativa.get('api/Responsablejrs/MostrarPersonaJR/'+ me.PersonaRepresentada, configuracion).then(function(response){
            me.repreJr = response.data.ner;
            
            if (me.repreJr !== 1) {
                me.idResponsable = response.data.idResponsable;
                me.nombres= response.data.nombre;
                me.apaterno = response.data.apellidoPa;
                me.amaterno = response.data.apellidoMa;
                me.rnacionalidad= response.data.nacionalidad;
                me.rfechanaciomiento = response.data.fechaNacimiento.substr(0, 10);
                me.rcurp= response.data.curp;
                me.redad= response.data.edad;  
                me.ridresponsable= response.data.idResponsable;
                me.telefono = response.data.telefono;
                me.correo = response.data.correo;
                me.de_calle = response.data.calle;
                me.de_noExt = response.data.noExt;
                me.de_noInt = response.data.noInt;
                me.de_entreCalle1 = response.data.entreCalle1;
                me.de_entreCalle2 = response.data.entreCalle2;
                me.de_referencia = response.data.referencia;
                me.de_pais = response.data.pais;
                me.de_cp = response.data.codigoPostal;
                me.de_estado = response.data.estado;
                me.de_selectEstado(me.de_estado);
                me.de_municipio = response.data.municipio;
                me.de_localidad = response.data.localidad;
                me.de_vialidad = response.data.tipoVialidad;
                me.de_asentamiento = response.data.tipoAsentamiento;
            }

          }, configuracion).catch(function(error){
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
        async  ActualizarRepre(PersonaRepresentada){
          let me = this;
          me.modalresponsable = true;
          me.PersonaRepresentada = PersonaRepresentada;
          me.editedIndex = 1;
          try {
                await me.de_listarCiudades();
                me.listarJR();
            } 
            catch (error) 
            {
                me.$notify('Error al refrescar!','error')  
            }
        },
        guardarResponsable(){
            let me=this;
            if (this.editedIndex === 1) 
            {
                //Código para editar 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.$justiciarestaurativa.put('api/Responsablejrs/Actualizar',{
                    'personaId':me.PersonaRepresentada,
                    'idResponsable':me.idResponsable,  
                    'nombre': me.nombres,
                    'apellidoPa': me.apaterno,
                    'apellidoMa': me.amaterno,
                    'edad': me.redad,
                    'fechaNacimiento': me.rfechanaciomiento,
                    'nacionalidad': me.rnacionalidad,
                    'curp': me.rcurp,
                    'telefono': me.telefono,
                    'correo': me.correo,
                    'calle': me.de_calle,
                    'noExt': me.de_noExt,  
                    'noint': me.de_noInt,
                    'entreCalle1': me.de_entreCalle1,
                    'entreCalle2': me.de_entreCalle2,
                    'referencia': me.de_referencia,
                    'pais': me.de_pais,
                    'estado': me.de_estado,
                    'municipio': me.de_municipio,
                    'localidad': me.de_localidad,
                    'codigoPostal': me.de_cp,
                    'tipoVialidad': me.de_vialidad,
                    'tipoAsentamiento': me.de_asentamiento
                },configuracion).then(function(response){
                    me.$notify('La información se actualizo correctamente !!!','success')  
                    me.responsableClose();
                    me.listarPersoRepre();
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
            } else if(me.editedIndex === 0)
            {
            //Llamamos la funcion para guardar registro en Jr
             me. representanteG();
            }
        },
        ModalResena(){
            let me = this;
            me.qrCode = ''
            me.ResenaBreve = true;
        },
        listarDelitos(){
            let me = this;
            me.qrCode = ''
            me.ModalDelitos = true;
            me.listardelitos();
        },
        ReasignarExp() {
            let me = this; 
            me.modalReasignacion = true;
            me.listarModulos();
            me.AsignacionEnvio();
        },
        //Funcion principal para el listado de conjunto, esto ya que siempre habra conjuntos
        abtraerInfoCSC(){
            let me=this;

            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

            me.arraynombreS='';
            me.arraynombreR='';

            me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/ListarSolicitantesRequeridosC/' +  me.envioId, configuracion).then(function(response)
            {
            
                if (response.data.length > 0 && response.data[0].validacion === "verdadero")
                {
                    //Existe conjunto
                    me.conjuntoSiNo = 1;
                    
                    //Guardo la respuesta de los conjuntos
                    me.personaSR=response.data;

                    //Establece que es un conjunto para mostrar el editar el numero o en su defecto convertir a conjunto
                    me.conjuntoSiNo = 1;

                    //SOLICITANTES
                    //En caso de haber conjunto, este for recorre los solicitantes y los coloca tanto concatenados con el afan de listarlo en la edicion
                    for (var i = 0; i < me.personaSR.length; i++) 
                    {
                        var item = me.personaSR[i];

                        //Evaluo que previamente venga limpia la variable para insertar el primer dato
                        if (me.arraynombreS == '') 
                        {
                            me.arraynombreS = item.nombreS;
                        }//una vez el primer dato, por ende los siguientes se van a concatenar con ;
                        else
                        {
                            me.arraynombreS  = me.arraynombreS + "; " + item.nombreS;
                        }
                        
                            
                    }

                    //Para al final aplicarles un split y se vea en el componente
                    me.itemsNombreS = me.arraynombreS.split('; ');
                    
                    //REQUERIDOS
                    //En caso de haber conjunto, este for recorre los solicitantes y los coloca tanto concatenados con el afan de listarlo en la edicion
                    for (var i = 0; i < me.personaSR.length; i++) 
                    {

                        var item = me.personaSR[i];

                        //Evaluo que previamente venga limpia la variable para insertar el primer dato
                        if (me.arraynombreR == '') 
                        {
                            me.arraynombreR = item.nombreR;
                        }//una vez el primer dato, por ende los siguientes se van a concatenar con ;
                        else
                        {
                            me.arraynombreR  = me.arraynombreR + "; " + item.nombreR;
                        }
                    }

                    //Para al final aplicarles un split y se vea en el componente
                    me.itemsNombreR = me.arraynombreR.split('; ');

                    
                }
                else
                { 
                    //En caso de no existir conjunto lo creo inmediatamente
                    me.conjuntoSiNo = 0;
                    me.personaSR.push(response.data);
                    me.convertirNoConjuntos();
                }

            }).catch(function(error)
            {
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
        InfoSolReq(){
            let me=this;
            let header={"Authorization" : "Bearer" + this.$store.state.token};
            let configuracion= {headers : header};
            var result = [],
                solicitantes = [],
                requeridos = [],
                solicitados = [],
                requeridosC = [];

            //Consultamos la tabla conjuntos por si ha ocurrido un cambio en los nombres de los Sol/Req
            me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/ListarNomConjuntos/' + me.envioId, configuracion).then(function(response){
            me.infoSolReq = response.data;

            me.infoSolReq.forEach(item => {
                //Obtener Sol/Req, separamos cada registro con ;
                //Eliminamos espacios en blanco y filtramos registros vacios para que no se muestren en el autocomplete
                solicitantes = item.nombreS.split(';').map(nombre => nombre.trim()).filter(nombre => nombre !== '');
                requeridos = item.nombreR.split(';').map(nombre => nombre.trim()).filter(nombre => nombre !== '');
                solicitados = item.solicitadosC.split(';').map(value => value.trim()).filter(value => value !== '');
                requeridosC = item.requeridosC.split(';').map(value => value.trim()).filter(value => value !== '');

                // Crear arreglo con nombre y valor correspondiente
                solicitantes.forEach((nombre, index) => {
                    if (index < solicitados.length) {
                        result.push({ nombre, value: solicitados[index] });
                    }
                });

                requeridos.forEach((nombre, index) => {
                    if (index < requeridosC.length) {
                        result.push({ nombre, value: requeridosC[index] });
                    }
                });
            });
            me.resultSolReq= result;

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
        closeSolReq(){
          this.SolReque = "";
          this.ModalSolReque = false;
          this.infoSolReq=[];
        },
        SolReq(){
            let me = this;
            me.qrCode = ''
            me.ModalSolReque = true;
            me.InfoSolReq();
        },
        pdfSolReq(nom) {           
           var fil = this.resultSolReq.filter(y => y.value == nom)           
           let me=this;
          let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion = { headers: header };

            me.docRemision = 'Registro de Información detallada de persona'
            
            me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/InfoPerSolReq/' +  me.SolReque + '/' + me.envioId, configuracion).then(function(response){
           let PersonasSolReq = response.data[0];
                me.nomSolReq = fil[0].nombre;
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
        mostrarpdf_Persona(){            
            let me = this

            me.vistaPreviaTF = false       
            let fechaQR = new Date()     
            me.generarQR(me.docRemision,me.nuc,me.uqe_Nombre,fechaQR,me.idEntrevista);

        }, 
        crearPdf_Persona() { 
            let me = this
                var pdfMake = require('pdfmake/build/pdfmake.js') 
           
                //***************************************************************************** */
                // VARIABLES
                //***************************************************************************** */
                var logo1 = this.logo1;
                var logo2 = this.logo2;
                var logo3 = this.logo3;
                var logo4 = this.logo4;
               
                //***************************************************************************** */ 
      
       
                var dia = moment().format("DD");
                var mes = moment().format('MMMM');
                var año= moment().format("YYYY");
                var hr= moment().format('h:mm:ss a');
                var fecha = dia + " de " + mes  + " del " + año + ", " + hr 
                //***************************************************************************** */
            
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
        pdfinfoDelito(){
              let me = this;
              let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header};
          me.$justiciarestaurativa.get('api/Delitoes/InfoDelitos/' +  me.Delitos + '/' + me.envioId, configuracion).then(function(response){
              let DelitoConj = response.data[0];
                me.idDelito = DelitoConj.idDelitoDerivado
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

            me.docRemision = 'Información detallada del delito'
            me.vistaPreviaTF = false       
            let fechaQR = new Date()     
            me.generarQR(me.docRemision, me.nuc, me.uqe_Nombre, fechaQR, me.idDelito);                            
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
                            },
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
        closeDelito(){
          this.Delitos = "";
          this.ModalDelitos = false;
          this.v_delitos=[];
        },
        listarModulos() {
            let me = this;
            let header = { "Authorization": "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };
            var modulosarray = [];
            me.$justiciarestaurativa.get('api/FacilitadorNotificadors/ListarM/'+me.u_iddistrito+'/'+me.u_idagencia, configuracion).then(function (response) {

            modulosarray = response.data;
            modulosarray.map(function (x) {
                me.v_modulos.push({ text: x.nombreModulo, value: x.moduloServicioId});
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
        listarFacilitadores() {
    let me = this;
    let header = { "Authorization": "Bearer " + this.$store.state.token };
    let configuracion = { headers: header };
    var facilitadoresarray = [];
     me.v_facilitadores = [];
     me.$justiciarestaurativa.get('api/FacilitadorNotificadors/ListarFacilitadores2/'+me.u_iddistrito+'/'+me.u_idagencia+'/'+me.modulos, configuracion).then(function (response) {

        facilitadoresarray = response.data;
        facilitadoresarray.map(function (x) {
            me.v_facilitadores.push({ text: x.nombreUsuario, value: x.nombreUsuario,value2: x.moduloServicioId  });
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
        reasignar(){

        let me=this;
        me.IdmoduloServicio = me.v_facilitador.value2;
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header};
        me.$justiciarestaurativa.put('api/Responsablejrs/Reasignar',{
            'asignacionEnvioId':me.asignacionEnvioId, 
            'moduloServicioId': me.IdmoduloServicio

        },configuracion).then(function(response){

            me.$notify('El expediente se reasigno correctamente !!!','success')  
            me.v_facilitador = '';
            me.modulos = '';   
            me.$router.push('./misexpedientes');          
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
        informacionagencia(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia, configuracion).then(function(response){
                me.direccionAgencia=response.data.direccion;
                me.telefonosAgencia= response.data.telefono;
                me.contactoDSP=response.data.contacotDirSub;
                me.nombreDSP=response.data.nombreDirSub;
                me.nombreDistrito = response.data.nombreDistrito;
                me.cargoResponsable = response.data.cargoResponsable
            }).catch(function(error){
                if (error.response.status==400){
                    me.$notify("No es un usuario válido", 'error')
                } else if (error.response.status==401){
                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                    me.e401 = true,
                    me.showpage= false
                } else if (error.response.status==403){
                    me.$notify("No esta autorizado para ver esta pagina", 'error')
                    me.e403= true
                    me.showpage= false
                } else if (error.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                    me.$notify('Error al intentar listar los registros!!!','error')
                }
            });
        },
        InformacionExpediente(){
 
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
             axios.all([ 
                
             me.$justiciarestaurativa.get('api/Envios/InformacionExpediente/'+ me.expedienteId + "/" + me.envioId , configuracion),  
                    me.$cat.get('api/AmpDecs/ListarEntrevistaInicial/'+ me.rHechoId,configuracion)
             ]).then(responseArr => {
                 
                me.noDerivacion = responseArr[0].data.noDerivacion;
                me.fechaDerivacion = responseArr[0].data.fechaDerivacion 
                me.fechaExpediente= responseArr[0].data.fechaRegistroExpediente ;
                me.fechaHoraSuceso=responseArr[0].data.fechaHoraSuceso;
                me.nuc=responseArr[0].data.nuc;
                me.StatusGeneral=responseArr[0].data.statusGeneral;
                me.EspontaneoNoEspontaneo=responseArr[0].data.espontaneoNoEspontaneo;
                me.primeraVezSubsecuente=responseArr[0].data.primeraVezSubsecuente;
                me.NoSolicitantes=responseArr[0].data.noSolicitantes;
                me.uqe_Agencia=responseArr[0].data.uqe_Agencia;
                me.uqe_Modulo=responseArr[0].data.uqe_Modulo;
                me.uqe_Nombre=responseArr[0].data.uqe_Nombre;
                me.uqe_Puesto=responseArr[0].data.uqe_Puesto;
                me.reseñaBreve=responseArr[0].data.reseñaBreve;
                me.narrativa= responseArr[0].data.narracionHechos;
                me.statusInforme=responseArr[0].data.informacionStatus;

                

                    if(responseArr[1].data.tipo == 1){

                
                        me.texto  = "Lugar:" + responseArr[1].data.uSubproc+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        'Fecha:' + responseArr[1].data.fechaS+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Hora:"+ responseArr[1].data.horaS+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Unidad de Investigación:"+ responseArr[1].data.uModulo+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Agente del Ministerio Público:"+ responseArr[1].data.usuario+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"

                        me.texto2 = "<p style="+me.comilla+"text-align:center"+me.comilla+"><b>PROTESTA DE LEY</b></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"

                        me.texto2 += "El (La) agente del Ministerio Público con fundamento en lo establecido por el artículo 49 del Código Nacional de Procedimientos Penales, protesta al C."+responseArr[1].data.nombrePersona+ " para conducirse con verdad y le advierte que podrá imponerse de tres meses a dos años de prisión a quien se conduzca con falsedad ante una autoridad en ejercicio de sus funciones, conforme a lo previsto por el artículo 313 del Código Penal del estado de Hidalgo, a lo anterior manifiesta: que si se conducirá con verdad."+
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
                        responseArr[1].data.manifestacion+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "A continuación, el compareciente hace del conocimiento de esta Representación social los siguientes hechos:"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        responseArr[1].data.hechos+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello."  
                        me.tipo2 = 1

                    
                    }
                    else if(responseArr[1].data.tipo == 2){

                        me.tipo2 = 2
                                        
                            
                        me.texto  =  "<p style="+me.comilla+"text-align:center"+me.comilla+"><u>COMPARECENCIA DE PERSONA INVESTIGADA</u></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "En la ciudad de "+me.u_distrito+", Hidalgo, siendo las "+responseArr[1].data.horaS+", "+ responseArr[1].data.fechaS+
                        ", el Agente del Ministerio Público "+responseArr[1].data.usuario+", desahoga la declaración indagatoria"+
                        "a cargo del C. "+responseArr[1].data.nombrePersona+", a quien previamente se le hizo saber los derechos que en su favor"+
                        "confiere la Constitución Política de los Estados Unidos Mexicanos y Código Nacional de"+
                        "procedimientos Penales y se le entregó la correspondiente acta de lectura de derechos. Una vez"+
                        "enterado de esos derechos, y del contenido de la carpeta de investigación se le da oportunidad de"+
                        "entrevistarse en privado con su abogado defensor "+responseArr[1].data.representante+", hecho lo anterior por sus datos"+
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
                        responseArr[1].data.manifestacion+
                        ", siendo todo lo que deseo manifestar. En uso de la voz el defensor"+responseArr[1].data.representante+", "+
                        responseArr[1].data.hechos+ 
                        "previa lectura, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello."


                    } else if(responseArr[1].data.tipo == 3){
                        me.tipo2 = 3

                        me.texto  = "Lugar:" + responseArr[1].data.uSubproc+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        'Fecha:' + responseArr[1].data.fechaS+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Hora:"+ responseArr[1].data.horaS+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Unidad de Investigación:"+ responseArr[1].data.uModulo+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Agente del Ministerio Público:"+ responseArr[1].data.usuario+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"

                        me.texto2  =  "<p style="+me.comilla+"text-align:center"+me.comilla+">EXHORTA/INFORMA</p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "El(La) agente del Ministerio Público con fundamento en lo establecido por el artículo 49 del Código Nacional de Procedimientos Penales, exhorta/informa al menor de iniciales "+ responseArr[1].data.iniciales+ " para que se conduzca con verdad en lo que manifieste en su entrevista y se le explica que de conducirse con falsedad incurrirá en una conducta tipificada como delito en la ley penal y se hará acreedor a una medida de conformidad con las disposiciones aplicables, a lo anterior manifiesta: que si se conducirá con verdad."+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "A continuación, se recaban los datos generales del(la) menor, que de conformidad con el artículo 20 apartado C fracción V de la Constitución Política de los Estados Unidos Mexicanos y 109 fracción XXVI del Código Nacional de Procedimientos Penales quedan reservados."+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Una vez que se le hicieron saber a "+responseArr[1].data.iniciales+ " los derechos que le otorga la Constitución Política de los Estados Unidos Mexicanos, el Código Nacional de Procedimientos Penales, la Ley Nacional Del Sistema Integral De Justicia para Adolescentes y la Ley General de los Derechos de Niñas, Niños y Adolescentes se le entregó la correspondiente acta."+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p style="+me.comilla+"text-align:center"+me.comilla+">FACULTAD DE ABSTENCIÓN</p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "De igual forma se le hace saber que conforme a lo establecido en el artículo 361 del Código Nacional de Procedimientos Penales, podrá <b>abstenerse de declarar</b>, si es tutor, curador, pupilo, cónyuge, concubina o concubinario, conviviente del imputado, o si ha vivido en forma permanente con él durante al menos dos años anteriores al hecho, de ser pariente por consanguinidad en la línea recta ascendente o descendente hasta el cuarto grado y en colateral por consanguinidad hasta el segundo grado inclusive, salvo que fuera denunciante. Pero si acepta rendir su testimonio NO podrán negarse a contestar las preguntas que esta autoridad le formule. A lo que manifestó:"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        responseArr[1].data.manifestacion+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "En relación a lo hechos el(la) menor de identidad reservada de iniciales "+ responseArr[1].data.iniciales +"<u>, MANIFESTÓ:</u>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        responseArr[1].data.hechos+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello."


                    } else if(responseArr[1].data.tipo == 4){

                        me.tipo2 = 4

                        me.texto  =  ""+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "En la ciudad de "+ responseArr[1].data.uDistrito + ", Hidalgo, siendo las" + responseArr[1].data.horas + ", "+ responseArr[1].data.fechaS +  ", el Agente del Ministerio Público "+ responseArr[1].data.usuario +
                        ", desahoga la declaración del adolescente " + responseArr[1].data.nombrePersona + ", quien se encuentra acompañado "+ responseArr[1].data.acompañantev + ", quien en este momento se identifican con "+
                        responseArr[1].data.tidentificacion + " con número de " + responseArr[1].data.noIdentificacion + " las que portan fotografía a color y coinciden con los rasgos fisionómicos, mismas que les son devueltas por serles de su utilidad dejando en su lugar copias simples, así mismo exhiben acta de nacimiento/"+responseArr[1].data.curpa+
                        " la cual se les devuelve por serles de utilidad dejando en su lugar copias simple para que se agregue a la presente carpeta; adolescente a quien previamente se le hizo saber los derechos que prevé en su favor el artículo 20 apartado B de la Constitución Política de los Estados Unidos Mexicanos; 35, 36, 37, 38, 39, 40, 41, 42, 43, 44 y 45 de la ley Nacional del Sistema Integral de Justicia Penal para adolescentes, así como 113 y 115 del Código Nacional de Procedimientos Penales y se le entregó la correspondiente acta de lectura de derechos. Manifestó quedar debidamente enterado. En este acto se permite que se entreviste en privado con su Defensor(a)."+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "A continuación, se recaban los datos generales del(la) adolescente, que de conformidad con el artículo 20 apartado B de la Constitución Política de los Estados Unidos Mexicanos; 35 y 36 de la ley Nacional del Sistema Integral de Justicia Penal para adolescentes quedan reservados."+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "En relación a los hechos la persona investigada MANIFESTÓ:"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        responseArr[1].data.manifesto+
                        " siendo todo lo que deseo manifestar. En uso de la voz el defensor " + responseArr[1].data.representante +
                        ", previa lectura, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello."


                    }
                    else if((responseArr[1].data.tipo == 5)){

                        me.texto  = "Lugar:" + responseArr[1].data.USubproc+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        'Fecha:' + responseArr[1].data.fechaS+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Hora:"+ responseArr[1].data.horaS+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Unidad de Investigación:"+ responseArr[1].data.uModulo+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Agente del Ministerio Público:"+ responseArr[1].data.usuario+
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
                        responseArr[1].data.manifestacion+
                        "Así mismo se le informa que en términos del artículo 360 del Código Nacional de Procedimientos Penales, no está obligado a declarar sobre hechos por los que se le pueda fincar responsabilidad penal."+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "A continuación, el testigo hace del conocimiento de esta Representación social los siguientes hechos:" + 
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        responseArr[1].data.hechos+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                        "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello."
                        
                            
                        me.tipo2 = 5

                    }
                    

                    me.representantesf = responseArr[1].data.tRepresentantes
                    me.personaf = responseArr[1].data.nombrePersona
                    me.inicialesf = responseArr[1].data.iniciales

                    me.acvictima = responseArr[1].data.parentezcoV
                    me.acnombre = responseArr[1].data.acompañantev
                    me.psimenor = responseArr[1].data.vNombre
                    me.puestopsi = responseArr[1].data.vPuesto

                    me.idEntrevista = responseArr[1].data.idAmpliacion
                    me.numerooficio = responseArr[1].data.numerooficio
                    me.clasificacionPersona= responseArr[1].data.clasificacionP
                    me.nombre = responseArr[1].data.nombrePersona
                    me.alias= responseArr[1].data.alias
                    me.tipopersona= responseArr[1].data.tipoP
                    me.curp= responseArr[1].data.curp
                    me.docIdentificacion= responseArr[1].data.docIdentificacion
                    me.nacionalidad= responseArr[1].data.nacionalidad
                    me.tel = responseArr[1].data.tel
                    me.email = responseArr[1].data.email
                    me.genero= responseArr[1].data.genero
                    me.sexo = responseArr[1].data.sexo
                    me.fechaNacimiento = responseArr[1].data.fechaNacimiento
                    me.medionotificacion= responseArr[1].data.medionotificacion
                    me.ocupacion= responseArr[1].data.ocupacion
                    me.nivelestudio= responseArr[1].data.nivelestudio
                    me.religion= responseArr[1].data.religion
                    me.lengua= responseArr[1].data.lengua
                    me.estadocivil= responseArr[1].data.estadocivil
                    me.tipodiscapacidad = responseArr[1].data.tipodiscapacidad
                    me.direccionpersonal = responseArr[1].data.direccionP
                    me.edad = responseArr[1].data.edad    
                    
                    
                    let arregloRepresentantes = responseArr[0].data.arregloRepresentantes

                    // Convertir a JSON si es una cadena
                    if (typeof arregloRepresentantes === "string") {
                        try {
                            arregloRepresentantes = JSON.parse(arregloRepresentantes);
                        } catch (error) {
                            arregloRepresentantes = []; // Si falla el parseo, lo establecemos como un array vacío
                        }
                    }

                    // Si arregloRepresentantes es un array válido con datos
                    if (Array.isArray(arregloRepresentantes) && arregloRepresentantes.length > 0) {
                        let primeraFila = arregloRepresentantes[0];

                        // Si idRepre tiene datos válidos, ejecutar la función
                        if (primeraFila.idRepre && primeraFila.idRepre.trim() !== "") {
                            let idRepreArray = primeraFila.idRepre.split(";").map(id => id.trim());
                            me.ExistanciaRepreCat(idRepreArray);
                        }
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
        imprimirEntrevistapdf(){ 
            let me = this; 
            
            me.docRemision = 'Registro de entrevista completa'
            me.vistaPreviaTF = false       
            let fechaQR = new Date()
            me.generarQR(me.docRemision,me.nuc,me.uqe_Nombre,fechaQR,me.idEntrevista);
        },
        downloadPdf(nombre,puesto,agencia) {

            debugger
            let me = this
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

            if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs; 
            }

            //***************************************************************************** */
            // VARIABLES
            //***************************************************************************** */
            var logo1 = this.logo1;
            var logo2 = this.logo2;
            var logo3 = this.logo3;
            var logo4 = this.logo4;
            var u_dirSubPro = this.u_dirSubPro;
            var u_agencia = this.u_agencia;
            var nuc = this.nuc;
            //***************************************************************************** */
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
                titulo ='ENTREVISTA A CARGO DEL (A) (DENUNCIANTE, VÍCTIMA U OFENDIDO)\n'+"C."+this.personaf+ "\n\n\n" 
            } else if(this.tipo2 == 2)
                tipo = 'DATOS DEL IMPUTADO'
            else if(this.tipo2 == 3)
                titulo = 'ENTREVISTA A CARGO DE LA VÍCTIMA MENOR DE EDAD DE INICIALES\n'+ this.inicialesf+ "\n\n\n" 
            else if(this.tipo2 == 4)
                titulo = 'COMPARECENCIA DE PERSONA INVESTIGADA'
            else if(this.tipo2 == 5){
                tipo = 'DATOS DEL TESTIGO'
                titulo ='ENTREVISTA TESTIMONIAL A CARGO DEL C.\n'+"C."+this.personaf+ "\n\n\n" 
            } 
            
            //***************************************************************************** */
            var agenciainfodr = this.direccionAgencia;
            var agenciainfotel = this.telefonosAgencia;

            //***************************************************************************** */
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
        formatearfechahora: function(fecha){
            return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
        }, 
        cerrarexpediente () { 
            this.$store.state.idExpediente= null; 
            this.$store.state.idEnvio = null;
            this.$store.state.noExpediente =null;
            this.$store.state.tipoModulo=null;
            this.editedIndex = 0;
            this.alerta = false;
            this.IdMenor="";
            this.mostrarJrResponsable =false;
            this.validaDatos = "";
            
             if (this.u_rol == 'Facilitador' || this.u_rol=="Notificador")
            {
                this.$router.push('./misexpedientes') 
            }
            else
            {
                this.$router.push('./expedientesaceptados') 
            }   
        }, 
        convertirStringADate(fechaString) {
            if (!fechaString) {
                return '';
            }else{
                // Dividir la cadena de fecha en día, mes y año
            const [dia, mes, año] = fechaString.split('/');
            // Crear un nuevo objeto Date
            const fecha = new Date(año, mes - 1, dia);

            return fecha;
            }
            
        },
        calculoEdad(calculoedad){
            if (!calculoedad) {
                return 0;
            }
            else{
             //Calculo de la edad de la persona representante
            const hoy = new Date();
            const nacimiento = new Date(calculoedad);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            return edad; 
            }
        },
        responsableClose(){
          let me = this;
          me.editedIndex = 0;
          me.step = 1;
          me.modalresponsable = false;
          me.nombres="";
          me.apaterno = "";
          me.amaterno = "";
          me.rnacionalidad = "Mexicana";
          me.rcurp = "";
          me.rfechanaciomiento = null;
          me.telefono = "";
          me.correo = "";
          me.de_vialidad = "";
          me.de_calle = "";
          me.de_noExt = "";
          me.de_noInt = "";
          me.de_entreCalle1 ="";
          me.de_entreCalle2 = "";
          me.de_referencia = "";
          me.de_pais = "México";
          me.de_cp = "";
          me.de_estado ="";
          me.de_municipio = "";
          me.de_localidad = "";
          me.de_asentamiento = "";
          me.de_estadoid = 0;
          me.de_municipioid = 0;
          me.de_localidadid = 0;
          me.redad = 0;
          me.de_ciudades = [];
          me.de_localidades = [];
          me.de_municipios = [];
        },
        closeReasignar(){
            let me = this;
            me.modulos = "";
            me.v_facilitador = "";
            me.modalReasignacion = false;
        },
        //Esta primera funcion activa el modal y limpia los componentes por si anteriormente los hayan usados esten limpios al abrirlos
        editarNombres()
        {
            let me = this;

            //Modal para la edicion
            me.modalEditarNombres = true;
            //Variables limpias
            me.limpiar();

        },
        limpiar()
        {
            let me = this;

            me.SolRequ = '';
            me.nombreConjunto = '';
            me.nombreCorregido = '';
            me.qrCode = null;
            me.vistaPreviaTF = true;
        },
        //Esta funcion su proposito es mostrar en la lista de personas los solicitantes o requeriso que previamente han sido guardados en sus respectivos arreglos
        mostrarListado(){
            let me = this;

            //Este en caso de solicitante
            if(me.SolRequ == 'Solicitante')
            {
                me.itemsNombreSR = me.itemsNombreS;
            } 
            //El unido else es el requerido           
            else
            {
                me.itemsNombreSR = me.itemsNombreR;
            }

            //Limpio los dos siguientes componentes
            me.nombreConjunto = '';
            me.nombreCorregido = '';
        },
        //Esta funcion es meramente para colocar el mismo texto de la persona que seleccionen pero en una caja de texto que si podran editar
        mostrarComponet(){
            let me = this;

            me.nombreCorregido = me.nombreConjunto;
        },
        //Funcion para limpiar el componente en caso que seleccionen el cerrar
        cerrarModalEditarNombres(){
            let me = this;

            //Este es el modal de la edicion de nombres
            me.modalEditarNombres=false;

            //Estos son los array que ocupo para concatenar los nombres de solicitantes y requeridos
            me.arraynombreS='';
            me.arraynombreR='';

            //Este es 
            me.itemsNombreSR=[];

            me.nombreCorregido='';
            me.nombreConjunto='';
            me.SolRequ='';
            me.conjuntoSiNo=1;

            
        },
        //Funcion para guardar en base de datos el arreglo de los nombres
        editarNombresConjuntos(){
            let me = this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

            // Suponiendo que me.personaSR es la lista original
            var nuevaListaS = []; // Esta será la nueva lista donde guardaremos los resultados
            var nuevaListaR = [];

            //Recorro la edicion de nombre en todos los conjuntos para que el nombre se edite en todos lados
            for (var i = 0; i < me.personaSR.length; i++) 
            {
                var item = me.personaSR[i];
                // Aplicar replace en item.nombreS
                var nuevoNombreS = item.nombreS.replace(me.nombreConjunto, me.nombreCorregido);
                // Aplicar replace en item.nombreR
                var nuevoNombreR = item.nombreR.replace(me.nombreConjunto, me.nombreCorregido);
                // Crear un nuevo objeto con el nuevo nombre y otras propiedades del item si es necesario
                var nuevoItemS = {
                    idConjuntoDerivaciones : item.idConjuntoDerivaciones,
                    nombreS: nuevoNombreS
                };

                var nuevoItemR = {
                    idConjuntoDerivaciones : item.idConjuntoDerivaciones,
                    nombreR: nuevoNombreR
                };
                // Guardar el nuevo item en la nueva lista
                nuevaListaS.push(nuevoItemS);
                nuevaListaR.push(nuevoItemR);
            }

            //Recorro la edicion dependiendo el numero de conjuntos
            for (var i = 0; i < nuevaListaS.length; i++) 
            {
                var item = nuevaListaS[i];
                var itemR = nuevaListaR[i];

                me.$justiciarestaurativa.put('api/SolicitanteRequeridoes/EditarNombresC',
                {
                    'idConjuntoDerivaciones':item.idConjuntoDerivaciones, 
                    'nombreS': item.nombreS,
                    'nombreR': itemR.nombreR,
                    'solRequ': me.SolRequ,

                },configuracion).then(function(response){

                    //Esta solo es una condicional para que el relistado y limpiado de componente se haga una vez al terminar el recorrido del for
                    if(i = nuevaListaS.length)
                    {
                        me.cerrarModalEditarNombres();
                        me.abtraerInfoCSC();
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
                        me.$notify('Error al intentar actualizar el registro!!!','error')   
                    } 
                });
            }

        },
        convertirNoConjuntos(){
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
                        me.personas = response.data;

                        me.$justiciarestaurativa.get('api/Delitoes/ListarDelitos/' + me.envioId, configuracion).then(function(response) 
                        {

                            me.delitos = response.data;
                            //Para este punto quiere decir que las apis de abtraer informacion funcionaron correctamente, activo el boton para poder usar asi como el modal
                            //me.confirmacionConverConjunto = true;

                            //me.ActivBoton = true;
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
        convertirAConjunto(){

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

            var SolReq = '';
            var DelDer = '';
            var sesions = '';

            var idConjuntoNew = '';

                //Comenzamo con la insercion del la tabla de conjuntos

                //iniciamos el recorrido de las personas para guardar en las variables
                for (var i = 0; i < me.personas.length; i++) 
                {
                    //Pasamos los valores a item para no confundirnos
                    var item = me.personas[i];

                    //Aqui se guardan los id de SolicitantesRequerdos para posteriormente actualizar el id de conjunto en su tabla
                    SolReq += item.idRSolicitanteRequerido;

                    if(i+1 != me.personas.length)
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
                //Recorrrido para los delitos
                for (var i = 0; i < me.delitos.length; i++) 
                {
                    var item = me.delitos[i];

                    delitosC += item.idDelito;
                    nombreD += item.nombreDelito;
                    DelDer += item.idDelitoDerivado;

                    if(i+1 != me.delitos.length)
                    {
                        delitosC += "; ";
                        nombreD += "; ";
                        DelDer += "; ";
                        
                    }
                }

                //Recorrido para las sesiones
                for (var i = 0; i < me.sesiones.length; i++) 
                {
                    var item = me.sesiones[i];

                    sesions += item.idSesion;

                    if(i+1 != me.sesiones.length)
                    {
                        sesions += "; ";
                        
                    }
                }


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

                    //Tercer lugar siguen crear los registros intermedios de las sesiones
                    var arraySesiones = sesions.split("; ");
                    for (var i = 0; i < arraySesiones.length; i++) 
                    {
                        me.$justiciarestaurativa.post('api/Sesions/CrearSesionConjunto',
                        {
                            'SesionId': arraySesiones[i],
                            'ConjuntoDerivacionesId': idConjuntoNew,
                            
                        },configuracion).then(function(response)
                        {
                            if(i = arraySesiones.length)
                            {
                                me.$alert('Notificación', 'El expediente a sido convertido a conjunto.');
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
                                me.$notify('Error al intentar actualizar el registro!!!','error')   
                            } 
                        });
                    }

                    //Por ultimo, en caso de existir el acuerdo, se crea el registro intermedio
                    if(me.NoHayAR != 1)
                    {
                        me.$justiciarestaurativa.post('api/AcuerdoReparatorios/CrearAcuerdoConjunto',
                        {
                            'AcuerdoReparatorioId': me.idAcuerdoReparatorio,
                            'ConjuntoDerivacionesId': idConjuntoNew,
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
                                me.$notify('Error al intentar crear el  registro!!!','error')  
                            } 
                        });
                    }

                    //Acciones despues de concluir
                    me.confirmacionConverConjunto = false;
                    me.abtraerInfoCSC();
                    

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
        de_listarCiudades() {
            let me = this;
            let header = {"Authorization": "Bearer " + this.$store.state.token};
            let configuracion = { headers: header };
            return new Promise((resolve, reject) => {
                this.$conf.get('api/Estadoes/Mostrar', configuracion).then(function(response) {
                    let ciudadesArray = response.data;
                    ciudadesArray.map(function(x) {
                        me.de_ciudades.push({ text: x.nombre, value: x.idEstado });
                    });
                    resolve(); // Resolviendo la promesa cuando la operación se completa
                })
                .catch(err => {
                    if (err.response.status == 400) {
                    me.$notify("No es un usuario válido", 'error');
                    } else if (err.response.status == 401) {
                    me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error');
                    me.e401 = true;
                    me.showpage = false;
                    } else if (err.response.status == 403) {
                    me.$notify("No esta autorizado para ver esta pagina", 'error');
                    me.e403 = true;
                    me.showpage = false;
                    } else if (err.response.status == 404) {
                    me.$notify("El recuso no ha sido encontrado", 'error');
                    } else {
                    me.$notify('Error al intentar listar los registros!!!', 'error');
                    }
                    reject(err); // Rechazando la promesa en caso de error
                });
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

                    if(me.editedIndex === 1){
                        me.de_selectMunicipio(me.de_municipio);
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

                if (me.editedIndex === 1){
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
        buscarPorCP(){
            let me=this;  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$conf.get('api/Localidads/MostrarPorCP/' + me.cp,configuracion).then(function(response){ 
                me.estadoid=response.data.idEstado;    
                me.listarPorEstado();
                me.municipioid=response.data.idMunicipio;   
                me.buscarPorCpMpo() 
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
        ExistanciaRepreCat(idRepresentantes){
        //Funcion que consulta el representante en Cat para guardarlo en Jr-
            let me= this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 

            idRepresentantes.forEach(id => {
                me.$justiciarestaurativa.get('api/Responsablejrs/SaveautoRepresentantes/'+ me.envioId + '/' + id, configuracion).then(function(response)
                { 
                    me.autoRepresentante = response.data;
                    
                    for (var i =0; i < me.autoRepresentante.length; i++)
                    {
                        if(me.autoRepresentante[i].hayRepreJR == 0 && me.autoRepresentante[i].hayRepreCAT == 1)
                        {
                            me.guardarRespCarenJr(me.autoRepresentante[i]);
                        }
                    }
                 }, configuracion).catch(function(error){    
                    if (error.response.status==404){
                    me.$notify("El recuso no ha sido encontrado", 'error')
                }else{
                    me.$notify(error.message,'error')     
                } 
                }); 
            }); 
        },
        guardarRespCarenJr(item){
            //Funcion que guarda a representante de Cat en la tabla Jr
            let me= this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 

            //Convertimos la funcion de String a Date
              var fechaNa= me.convertirStringADate(item.fechaNacimiento);
            //Calculo de la edad de la persona representante
              var edad = me.calculoEdad(fechaNa);



              me.$justiciarestaurativa.post('api/Responsablejrs/Crear',{
                'personaId':item.personaId, 
                'nombre':item.nombre,
                'apellidoPa':item.apellidoPa,
                'apellidoMa':item.apellidoMa,
                'edad':edad,
                'fechaNacimiento':item.fechaNacimiento,
                'nacionalidad':item.nacionalidad,
                'curp':item.curp,
                'telefono':item.telefono,
                'correo':item.correoElectronico,
                'calle':item.calle,
                'noExt':item.noExt,  
                'noint':item.noInt,
                'entreCalle1':item.entreCalle1,
                'entreCalle2':item.entreCalle2, 
                'referencia':item.referencia,
                'pais':item.pais,
                'estado':item.estado,
                'municipio':item.municipio,
                'localidad':item.localidad,
                'codigoPostal':me.repreCat.codigoPostal,
                'tipoVialidad':item.tipoVialidad,
                'tipoAsentamiento':item.tipoAsentamiento,
              },configuracion).then(function(response){
                me.$notify('La información se abrio correctamente !!!','success') 
               
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
                me.$notify('Error al crear el código QR','error')       
            }
        },
        AsignacionEnvio() {
            let me = this;
            let header = { "Authorization": "Bearer " + this.$store.state.token };
            let configuracion = { headers: header };
            var modulosarray = [];
            me.$justiciarestaurativa.get('api/AsignacionEnvios/ListarFacilitadorEnv/'+me.envioId, configuracion).then(function (response) {

                me.asignacionenv = response.data;
                for(let i = 0; i < me.asignacionenv.length; i++){
                    if(me.asignacionenv[i].tipo === 'Facilitador'){
                        me.asignacionEnvioId = me.asignacionenv[i].idAsignacionEnvio;
                    }
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
        listarVialidad(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$conf.get('api/Vialidades/Listar',configuracion).then(function(response){
                response.data.forEach(x => {
                    const item = {text: x.nombre, value: x.clave};
                    me.de_vialidades.push(item);
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
        listarAsentamiento(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            this.$conf.get('api/Asentamiento/Listar',configuracion).then(function(response){
                response.data.forEach(x => {
                    const item = {text: x.nombre, value: x.clave};
                    me.de_asentamientos.push(item);
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
        }
    } 
}
</script>
<style>
.espaciado{
    padding: 30px !important; 
}
</style>

 