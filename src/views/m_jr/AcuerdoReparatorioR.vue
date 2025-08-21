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
                <v-toolbar-title class="font-weight-regular">
                    Acuerdo reparatorio y/o plan de reparación.
                </v-toolbar-title>
                <v-divider class="mx-2" inset vertical />
                <v-spacer />
                <!-- <v-select
                    :items="v_tipodocumentos"
                    v-model="v_tipodocumento"
                    :menu-props="{ top: true, offsetY: true }"
                    chips
                /> -->
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
                        <v-btn  class="mx-2 py-2" slot="activator" v-on="on" @click.native="cerrarexpediente" fab dark small color="primary">
                            <v-icon dark>close</v-icon>
                        </v-btn>
                    </template>
                    <span>Cerrar carpeta</span>
                </v-tooltip>
                <v-tooltip v-if="conjuntosV.length != 0" bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn v-if="v_ARGenerado == 1" class="mx-2 py-2" slot="activator" v-on="on" @click.native="editarAR(-1, 0)" fab dark small color="success">
                            <v-icon dark>add</v-icon>
                        </v-btn>
                        <v-btn v-else class="mx-2 py-2" slot="activator" v-on="on" @click.native="editarAR(1,1)" fab dark small color="success">
                            <v-icon dark>keyboard_return</v-icon>
                        </v-btn>
                    </template>
                    <span>{{v_ARGenerado == 1 ? 'Crear Acuerdo' : 'Regresar'}}</span>
                </v-tooltip>           
                <v-tooltip v-else bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn v-if="AuxBtn && v_ARGenerado != 0" class="mx-2 py-2" slot="activator" v-on="on" @click.native="editarAR(-1,0)" fab dark small color="success">
                            <v-icon dark>add</v-icon>
                        </v-btn>
                        <v-btn v-else-if="v_ARGenerado == 0" class="mx-2 py-2" slot="activator" v-on="on" @click.native="editarAR(1,1)" fab dark small color="success">
                            <v-icon dark>keyboard_return</v-icon>
                        </v-btn>
                    </template>
                    <span>{{AuxBtn && v_ARGenerado != 0 ? 'Crear Acuerdo' : 'Regresar'}}</span>
                </v-tooltip>           
            </v-toolbar>
            <v-card>
                <v-container grid-list-md>
                    <v-layout v-if="v_ARGenerado==0" row wrap>
                        <v-flex xl6 lg6 md4 sm12 xs12>
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
                                                prepend-icon="event"
                                                name="fecha de celebración del acuerdo"
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
                                    <v-autocomplete 
                                        name="modalidad"
                                        :items="v_statusconclusiones"
                                        v-model="v_statusconclusion"
                                        label="Modalidad:"
                                        v-validate="'required'"
                                        v-on:change="cargartexto"
                                        :error-messages="errors.collect('modalidad')"
                                    />
                                    <v-select
                                        :items="v_tipospagos"
                                        v-model="v_tipopago"
                                        label="Reparación del daño:"
                                        multiple
                                        chips
                                        v-on:change="consultarPagoSeleccionado()"
                                        v-validate="'required'"
                                        persistent-hint
                                        :error-messages="errors.collect('tipo pago')"
                                    />
                                    <v-text-field
                                        v-if="v_showCant"
                                        label="Monto o cantidad total:"
                                        name="monto o cantidad"
                                        v-model="v_cantidadmonto"
                                        v-validate="'required|decimal'"
                                        :error-messages="errors.collect('monto o cantidad')"
                                    />
                                    <v-text-field
                                        v-if="v_showEspecie"
                                        label="Objeto o servicio:"
                                        name="especie"
                                        v-model="v_especie"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('especie')"
                                    />
                                    <v-text-field
                                        name="numero de parcialidad"
                                        v-if="v_statusconclusion=='Diferido'"
                                        v-model="noparcialidad"
                                        type="number"
                                        label="No de parcialidad:"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('numero de parcialidad')"
                                    />
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xl6 lg6 md4 sm12 xs12>                            
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
                                                label="Hora de celebracion:"
                                                prepend-icon="access_time"
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
                                        name="metodo utilizado"
                                        :items="v_metodosutilizados"
                                        v-model="v_metodoutilizado"
                                        label="Metodo utilizado:"
                                        v-on:change="cargartexto"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('metodo utilizado')"
                                    />
                                    <v-menu
                                        ref="v_menu2"
                                        v-if="v_statusconclusion=='Diferido'"
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
                                                prepend-icon="event"
                                                name="fecha limite de cumplimiento"
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
                                        v-if="v_statusconclusion=='Diferido'"
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
                                                prepend-icon="access_time"
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
                                    <v-autocomplete
                                        name="periodo de pago"
                                        v-if="v_statusconclusion=='Diferido'"
                                        :items="v_periodos"
                                        v-model="v_periodo"
                                        label="Periodo de pago:"
                                        v-validate="'required'"
                                        :error-messages="errors.collect('periodo de pago')"
                                    />                                    
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xl12 lg12 md12 sm12 xs12 mb-2>
                            <v-card v-if="conjuntosV.length != 0" elevation="0">
                                <v-card-text v-if="editedIndex == -1">
                                    <v-data-table :headers="headers" :items="conjuntosV">
                                        <template slot="items" class="white" slot-scope="props">
                                            <td>{{ props.index + 1 }}</td>                                               
                                            <td v-html="adaptarP(props.item.nombreS)"></td>
                                            <td v-html="adaptarP(props.item.nombreR)"></td>
                                            <td v-html="adaptarD(props.item.nombreD)"></td>
                                            <v-switch label="Seleccionar" @change="cambio==(props.index+1)?cambio=0:cambio = props.index+1; SCon = props.item.idConjuntoDerivaciones; AuxCont = props.index" :disabled="cambio==0?disa:(props.index+1)==cambio ? disa: ''" color="success"></v-switch>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                                <v-card-text v-else>
                                    <v-data-table :headers="headers2" :items="conjuntoE">
                                        <template slot="items" class="white" slot-scope="props">
                                            <td>{{ props.index + 1 }}</td>                                               
                                            <td v-html="adaptarP(props.item.nombreS)"></td>                                            
                                            <td v-html="adaptarP(props.item.nombreR)"></td>
                                            <td v-html="adaptarD(props.item.nombreD)"></td>
                                            <!-- <v-switch label="Seleccionar" @change="cambio==(props.index+1)?cambio=0:cambio = props.index+1; SCon = props.item.idConjuntoDerivaciones" :disabled="cambio==0?disa:(props.index+1)==cambio ? disa: ''" color="success"></v-switch> -->
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                            <v-card v-else elevation="0">
                                <v-card-text>
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
                                                    <td v-html="adaptarSC(v_solicitantes)"></td>
                                                    <td v-html="adaptarSC(v_requeridos)"></td>
                                                    <td v-html="adaptarSC(v_delitos)"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                </v-card-text>
                            </v-card>
                        </v-flex>                        
                        <v-flex xl12 lg12 md12 sm12 xs12 mt-4>
                            <v-card elevation="0">
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
                                        >
                                            <v-icon>remove_red_eye</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Vista previa</span>
                                </v-tooltip>
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
                    <v-layout v-if="v_ARGenerado==1" row px-3 wrap>
                        <v-layout v-if="conjuntos.length != 0  || v_idAcuerdoReparatorio != ''">
                            <v-expansion-panel v-if="conjuntos.length != 0" elevation-0>                               
                                <v-expansion-panel-content class="blue-grey lighten-5" elevatio-0 v-for="(it,i) in conjuntos" :key="i">                                
                                    <template v-slot:header  >
                                        <h2 style="font-size:1.5rem; font-weight: 100 ;">Acuerdo {{ i +1 }}</h2>
                                    </template>
                                    <v-flex xl12 lg12 md12 sm12 xs12 v-if="it.acuerdo.length != 0">        
                                        <v-card elevation="0">
                                            <v-flex>                                                
                                                <v-tooltip bottom v-if="it.acuerdo[0].statusRespuestaCoordinadorJuridico == 'No autorizado' || it.acuerdo[0].statusRespuestaAMP == 'No autorizado'">
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="editarAR(1,0,it)" fab dark small color="success">
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
                                                                    it.acuerdo[0].statusRespuestaCoordinadorJuridico != null ? it.acuerdo[0].statusRespuestaCoordinadorJuridico : 'Sin respuesta' 
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
                                                                {{ it.acuerdo[0].fechaHoraRespuestaCoordinadorJuridico != null ? formatearfechahora(it.acuerdo[0].fechaHoraRespuestaCoordinadorJuridico) : 'Sin fecha de respuesta'}}
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
                                                                {{ it.acuerdo[0].respuestaCoordinadorJuridico != null ? it.acuerdo[0].respuestaCoordinadorJuridico : 'Sin respuesta' }}
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
                                                                    it.acuerdo[0].statusRespuestaAMP != null ? it.acuerdo[0].statusRespuestaAMP : 'Sin respuesta' 
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
                                                                {{ it.acuerdo[0].fechaRespuestaAMP != null ? formatearfechahora(it.acuerdo[0].fechaRespuestaAMP) : 'Sin fecha de respuesta'}}
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
                                                                {{ it.acuerdo[0].respuestaAMP != null ? it.acuerdo[0].respuestaAMP : 'Sin respuesta' }}
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
                                                                {{ it.acuerdo[0].nosise }}
                                                            </v-list-tile-title>
                                                            <v-list-tile-sub-title>
                                                                {{ it.acuerdo[0].fechasise }}
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
                                                                {{ it.b.nombreS.replace(';', ',') }}
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
                                                                {{ it.b.nombreR.replace(';', ',') }}
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
                                                                {{ it.b.nombreD.replace(';', ',') }}
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
                            <v-expansion-panel v-else elevation-0>                               
                                <v-expansion-panel-content class="blue-grey lighten-5" elevatio-0>                                
                                    <template v-slot:header  >
                                        <h2 style="font-size:1.5rem; font-weight: 100 ;">Acuerdo</h2>
                                    </template>
                                    <v-flex xl12 lg12 md12 sm12 xs12>        
                                        <v-card elevation="0">
                                            <v-flex>                                                
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="editarAR(1,0)" fab dark small color="success">
                                                            <v-icon dark>edit</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>Editar acuerdo reparatorio</span>
                                                </v-tooltip>
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="sise()" fab dark small color="warning">
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
                                                                   v_statusRespuesaCJ == null || v_statusRespuesaCJ == ''  ? 'Sin actualización' : v_statusRespuesaCJ
                                                                }}
                                                                <!-- {{ 
                                                                    it.acuerdo[0].statusRespuestaCoordinadorJuridico != null ? it.acuerdo[0].statusRespuestaCoordinadorJuridico : 'Sin respuesta' 
                                                                }} -->
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
                                                                    v_fechahorarespuestaCJ == null || v_fechahorarespuestaCJ == '' ? 'Sin actualización' : v_fechahorarespuestaCJ
                                                                }}
                                                                <!-- {{ it.acuerdo[0].fechaHoraRespuestaCoordinadorJuridico != null ? formatearfechahora(it.acuerdo[0].fechaHoraRespuestaCoordinadorJuridico) : 'Sin fecha de respuesta'}} -->
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
                                                                    v_respuestaCJ == null || v_respuestaCJ == '' ? 'Sin respuesta' : v_respuestaCJ
                                                                }}
                                                                <!-- {{ it.acuerdo[0].respuestaCoordinadorJuridico != null ? it.acuerdo[0].respuestaCoordinadorJuridico : 'Sin respuesta' }} -->
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
                                                                    v_nosise == null || v_nosise == '' ? '0'  : v_nosise
                                                                }}
                                                                <!-- {{ it.acuerdo[0].nosise }} -->
                                                            </v-list-tile-title>
                                                            <v-list-tile-sub-title>
                                                                {{ 
                                                                    v_fechasise == null || v_fechasise == '' ? 'Sin fecha de cambio' : v_fechasise
                                                                }}
                                                                <!-- {{ it.acuerdo[0].fechasise }} -->
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
                                                                    v_solicitantesL == null || v_solicitantesL == '' ? 'Solicitantes' : v_solicitantesL
                                                                }}
                                                                <!-- {{ it.b.nombreS.replace(';', ',') }} -->
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
                                                                    v_requeridosL == null || v_requeridosL == '' ? 'Requeridos' : v_requeridosL
                                                                }}
                                                                <!-- {{ it.b.nombreR.replace(';', ',') }} -->                                                                
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
                                                                    v_delitosL == null || v_delitosL == '' ? 'Delitos' : v_delitosL
                                                                }}
                                                                <!-- {{ it.b.nombreD.replace(';', ',') }} -->
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
                        <v-layout v-else>
                            <v-flex xl12 lg12 md12 sm12 xs12>
                                <v-toolbar>
                                    <v-spacer />
                                    <v-toolbar-title class="font-weight-regular">
                                        NO HAY ACUERDOS REPARATORIOS GENERADOS
                                    </v-toolbar-title>
                                    <!-- <v-divider class="mx-2" inset vertical /> -->
                                    <v-spacer />
                                    <!-- <v-tooltip v-if="v_ARGenerado==1" bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="editarAR(1,0)" fab dark small color="success">
                                                <v-icon dark>edit</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Editar acuerdo reparatorio</span>
                                    </v-tooltip>
                                    <v-tooltip v-if="v_ARGenerado==1" bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="sise()" fab dark small color="warning">
                                                <v-icon dark>swap_vertical_circle</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Número SISE</span>
                                    </v-tooltip> -->
                                </v-toolbar>
                                <!-- <v-card elevation="0">
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
                                                        {{ this.v_statusRespuesaCJ }}
                                                    </v-list-tile-sub-title>
                                                </v-list-tile-content>
                                                <v-list-tile-action>
                                                    <v-icon>check</v-icon>
                                                </v-list-tile-action>
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
                                                        {{ formatearfechahora(this.v_fechahorarespuestaCJ) }}
                                                    </v-list-tile-sub-title>
                                                </v-list-tile-content>
                                                <v-list-tile-action>
                                                    <v-icon>check</v-icon>
                                                </v-list-tile-action>
                                            </v-list-tile>
                                            <v-divider inset />
                                            <v-list-tile>
                                                <v-list-tile-action>
                                                    <v-icon color="warning">chat</v-icon>
                                                </v-list-tile-action>
                                                <v-list-tile-content>
                                                    <v-list-tile-title>Respuesta: </v-list-tile-title>
                                                    <v-list-tile-sub-title>{{ this.v_respuestaCJ }}</v-list-tile-sub-title>
                                                </v-list-tile-content>
                                                    <v-list-tile-action>
                                                    <v-icon>check</v-icon>
                                                </v-list-tile-action>
                                            </v-list-tile>
                                            <v-divider inset />
                                            <v-list-tile>
                                                <v-list-tile-action>
                                                    <v-icon color="warning">double_arrow</v-icon>
                                                </v-list-tile-action>
                                                <v-list-tile-content>
                                                    <v-list-tile-title>Número SISE: </v-list-tile-title>
                                                    <v-list-tile-title>{{ this.v_nosise}}</v-list-tile-title>
                                                    <v-list-tile-sub-title>{{ this.v_fechasise}}</v-list-tile-sub-title>
                                                </v-list-tile-content>
                                                <v-list-tile-action>
                                                    <v-icon>check</v-icon>
                                                </v-list-tile-action>
                                            </v-list-tile>
                                            <v-divider inset />
                                            <v-list-tile>
                                                
                                            </v-list-tile>
                                        </v-list>
                                    </v-card-text>
                                </v-card> -->
                            </v-flex>
                        </v-layout>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>
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
                                        outline type="number"
                                        v-model="v_nosise"
                                    />
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn @click.native="dialogSISE=false">Cancelar</v-btn>
                            <v-btn @click.native="actualizarsise()" class="success">Guardar</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="modal_AR1" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer /> 
                    <v-toolbar-items>
                        <v-btn color=success text @click.native="guardar">Guardar e imprimir</v-btn>
                        <v-btn icon @click="modal_AR1= false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <iframe id="iframepdfAR1" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no" />
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
    //** COMPONENTES */
    import n401 from '../../components/m_jr/401'
    import n403 from '../../components/m_jr/403'
    import moment from 'moment'
    import 'moment/locale/es';
    import alertify from 'alertifyjs';
    import { VueEditor } from "vue2-editor";
    import DualListBox from "dual-listbox-vue";
    import "dual-listbox-vue/dist/dual-listbox.css";
    import { error } from 'util';
    import ExpedientesSolicitadosVue from './ExpedientesSolicitados.vue'
    import { NumberAsString } from  './NumerosLetras.js'

    export default {
        components: {
            n401,
            n403,
            "vue2-editor": VueEditor ,
            DualListBox
        },
        data: function () {
            return {
                e401: false,
                e403: false,
                showpage: true,
                //************************************ */
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
                    { text: 'Conjunto', value: 'conjunto' },
                    { text: 'Solicitante (s)', value: 'solicitante' },
                    { text: 'Requerido (s)', value: 'requerido'},

                    { text: 'Delito (s)', value: 'delitos'},
                    { text: 'Agregar', value: 'agregar'},
                ],
                headers2: [
                    { text: 'Conjunto', value: 'conjunto' },
                    { text: 'Solicitante (s)', value: 'solicitante' },
                    { text: 'Requerido (s)', value: 'requerido'},

                    { text: 'Delito (s)', value: 'delitos'},
                ],
                //**************************************
                dialogSISE: false,
                v_nosise: '',
                v_fechasise: '',
                //**************************************
                // VARIABLES PARA LA INFORMAICON DEL ESPEDIENTE
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
                //********************************************************** */
                // VARIABLES PARA EL ACUEDRO REPARATORIO
                v_idAcuerdoReparatorio: '',
                v_menu1: false,
                v_fechacelebracion: '',
                v_fechac: '',
                v_menu3: false,
                v_horacelebracion: '',
                v_statusconclusiones: ['Diferido', 'Inmediato'],
                v_statuscumplimiento: '',
                v_statusconclusion: '',
                v_tipospagos: ['Dinero', 'Especie', 'Respeto'],
                v_tipopago: '',
                v_cantidadmonto: '',
                v_especie: '',
                v_showCant: false,
                v_showEspecie: false,
                v_menu2: false,
                v_fechalimite: '',
                v_fechal: '',
                v_menu4: false,
                v_horacita: '',
                v_metodosutilizados: ['Mediación','Conciliación','Junta restaurativa'],
                v_metodoutilizado: '',
                v_periodos: [
                    { text: "Diario", value: 1 },
                    { text: "Semanal", value: 7 },
                    { text: "Quincenal", value: 15 },
                    { text: "Mensual", value: 30 },
                    { text: "Otro", value: 0 }
                ],
                v_periodo: 0,
                noparcialidad: null,
                v_textoAR: '',
                v_textoAlternativo: '',
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
                modal_AR1: false,
                logo1: '',
                logo2: '',
                direccionAgencia: '',
                telefonosAgencia: '',
                nombreDSP: '',
                contactoDSP: '',
                nombreDistrito: '',
                cargoResponsable: '',
                vtxtformat: '',
                v_requeridos: [],
                v_requeridosL: '',
                v_requeridosAR: [],
                v_requeridosR: [],
                v_solicitantes: [],
                v_solicitantesL: '',
                v_solicitantesAR: [],
                v_solicitantesR: [],
                conjuntos: [],
                conjuntosV: [],
                conjuntoE: [],
                conjunto: [],
                v_direccion: '',
                nombreCompleto: '',
                v_delitos: [],
                v_delitosL: '',
                detallesSC: [],
                v_ARGenerado: 1,
                v_statusRespuesaCJ: '',
                v_fechahorarespuestaCJ: '',
                v_respuestaCJ: '',
                v_statusRespuesaAMP: '',
                v_fechahorarespuestaAMP: '',
                v_respuestaAMP: '',
                editedIndex: 1,
                uf_Distrito: '',
                uf_DirSubProc: '',
                uf_Agencia: '',
                uf_Nombre: '',
                uf_Puesto: '',
                uf_Modulo: '',
                v_tipodocumentos: ['Acuerdo reparatorio',' Plan de reparación', 'Acuerdo reparatorio ADO'],
                v_tipodocumento: 'Acuerdo reparatorio',
                cambio: 0,
                SCon: '',
                disa: false,
                ARC: [],
                AuxCont: 0,
                AuxBtn : true
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
                me.$alert('Notificación', 'Aun no ha abierto ninguna expediente por favor ingrese al menu Mis expedientes y luego en Mi lista de expedientes asignados y ahi abra la expediente que usted elija!. En este momento sera redireccionado al menu correspondiente.',
                function() {
                    if (me.u_rol == 'Facilitador' || me.u_rol == "Notificador") {
                        me.$router.push('./jr-misexpedientes')
                    } else {
                        me.$router.push('./jr-expedientesaceptados')
                    }
                })
            } else {
                me.$notify('Expediente abierto correctamente !!!', 'success')
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
                me.envioId = me.$store.state.idEnvio;
                me.noExpediente = me.$store.state.noExpediente;
                me.InformacionExpediente();
                me.listarLogo();
                me.informacionagencia();
                // me.listarAcuerdoReparatorio();
                me.encuentraConjuntos();
                // me.listarSolicitantesRequeridos("Solicitante");
                // me.listarSolicitantesRequeridos("Requerido");
                // me.listardelitos();
                me.cargartexto();
            }
            // INTERCEPTOR MODULO DE JUSTICIA RESTAURATIVA
            axios.interceptors.request.use((config)=> {
                me.$store.commit('LOADER', true);
                return config;
            }, (error)=> {
                me.$store.commit('LOADER', false);
                return Promise.reject(error);
            });
            axios.interceptors.response.use((response)=>{
                me.$store.commit('LOADER', false);
                return response;
            },  (error)=> {
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
            cambio: function (niu, old){
                this.cambio = niu
            }
        },
        methods:{
            listarLogo () {
                let me = this;
                this.$conf.get('api/ConfGlobals/Listar').then(function(response) {
                    me.logo3 = response.data.logo3;
                    me.logo4 = response.data.logo4;
                }).catch(function(error) {
                    if (error.response.status == 400) {
                    me.$notify("No es un usuario válido", 'error')
                    } else if (error.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (error.response.status == 403) {
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403 = true
                        me.showpage = false
                    } else if (error.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros ','error')
                    }
                });
            },
            sise (vb = '') {
                let me = this;
                me.dialogSISE = true;                
                if (vb != '' && vb != 'undefined' && typeof (vb) == 'object') {
                    let bnl = []
                    bnl.push(vb)                    
                    me.v_idAcuerdoReparatorio = bnl[0].acuerdo[0].idAcuerdoReparatorio;                    
                }
                
            },
            adaptarP (textoC){
                console.log(`datos de la tabla para crear : ${textoC}`)
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
            adaptarD (textoD){
                let v = textoD.split(';');
                let x = ``
                if(v.length <= 1){
                    x = `<p>${v[0]}</p>`
                }else{
                    v.map((d,index) =>{
                        x += `<p >${d}</p>`
                    })                    
                }

                return x
            },
            adaptarSC(aa){
                let n = ``
                aa.map((u, index)=>{
                    n += `<p>${u.nombreCompleto ? u.nombreCompleto : u.nombreDelito}</p>`
                })

                return n
            },
            actualizarsise () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                me.$justiciarestaurativa.put('api/AcuerdoReparatorios/Actualizarsise', {
                    'idAcuerdoReparatorio': me.v_idAcuerdoReparatorio,
                    'nosise': me.v_nosise,
                }, configuracion).then(function(response) {
                    me.$notify('¡La información se guardo correctamente!', 'success')
                    me.dialogSISE = false;
                    me.v_nosise = "";
                    // window.location.reload()
                    // me.$router.go('/acuerdoreparatorio')
                    me.encuentraConjuntos();
                    // me.listarAcuerdoReparatorio();
                }).catch(function(err) {                    
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
            listarAcuerdoReparatorio() {                
                debugger
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers: header };
                
                me.$justiciarestaurativa.get('api/Sesions/ListarPorEnvioUltimaSeseion/' + me.envioId, configuracion).then(function(response) {                    
                    if (response.data.statusSesion !== "Se realiza sesión con acuerdo reparatorio" || response.data.statusSesion !== "Se realiza sesión con acuerdo reparatorio") {
                        me.$alert('Notificación', 'No es posible celebrar un Acuerdo reparatorio ni un Plan de Reparación ya que aun no ha concluido una sesión satisfactoria.',
                            function () {
                                me.$router.push('./jr-sesiones')
                            },
                        ).set('labels', { ok: 'Ok' });
                    }
                }, configuracion)
                    .catch(function (error) {
                    if (error.response.status == 401) {
                        me.e401 = true,
                        me.showpage = false
                    } else if (error.response.status == 403) {
                        me.e403= true
                        me.showpage= false
                    } else if (error.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify(error.message,'error')
                    }
                });
                me.$justiciarestaurativa.get('api/AcuerdoReparatorios/ListaAR/' + me.envioId, configuracion).then(function(response) {
                    if (response.data.noHayAR != 1) {                        
                        debugger
                        me.AuxBtn = false
                        me.encuentraSolicitantes();
                        me.encuentraRequeridos();
                        me.v_ARGenerado = 1;
                        me.v_tipodocumento = response.data.tipoDocumento;
                        me.v_idAcuerdoReparatorio = response.data.idAcuerdoReparatorio;
                        me.v_fechacelebracion = me.formatearfecha(response.data.fechaCelebracionAcuerdo);
                        me.v_fechac = response.data.fechaCelebracionAcuerdo;
                        me.v_statusconclusion = response.data.statusConclusion;
                        me.v_tipopago = response.data.tipoPago.split(" ");
                        me.v_cantidadmonto = response.data.montoTotal;
                        me.v_fechalimite = me.formatearfecha(response.data.fechaLimiteCumplimiento);
                        me.v_horacelebracion = me.formatearhora(response.data.fechaCelebracionAcuerdo);
                        me.v_fechal = response.data.fechaLimiteCumplimiento;
                        me.v_horacita = moment(response.data.fechaLimiteCumplimiento).format('h:mm:ss a');
                        me.v_metodoutilizado = response.data.metodoUtilizado;
                        me.v_periodo = response.data.periodo;
                        me.noparcialidad = response.data.noTotalParcialidades;
                        me.v_textoAR = response.data.textoAR;
                        me.v_solicitantesL = response.data.nombreSolicitante;
                        me.v_solicitantesR = me.v_solicitantesL.split(", ");
                        me.v_requeridosL = response.data.nombreRequerdio;
                        me.v_requeridosR = me.v_requeridosL.split(", ");
                        me.v_delitosL = response.data.delitos;
                        me.v_statusRespuesaCJ = response.data.statusRespuestaCoordinadorJuridico;
                        me.v_fechahorarespuestaCJ = response.data.fechaHoraRespuestaCoordinadorJuridico;
                        me.v_respuestaCJ = response.data.respuestaCoordinadorJuridico;
                        me.v_statusRespuesaAMP = response.data.statusRespuestaAMP;
                        me.v_fechahorarespuestaAMP = response.data.fechaRespuestaAMP;
                        me.v_respuestaAMP = response.data.respuestaAMP;
                        me.v_nosise = response.data.nosise;
                        me.v_fechasise = response.data.fechasise;
                        me.uf_Distrito = response.data.uf_Distrito;
                        me.uf_DirSubProc = response.data.uf_DirSubProc;
                        me.uf_Agencia = response.data.uf_Agencia;
                        me.uf_Nombre = response.data.uf_Nombre;
                        me.uf_Puesto = response.data.uf_Puesto;
                        me.uf_Modulo = response.data.uf_Modulo;
                    } else {
                        // me.v_ARGenerado = 0;
                    }
                }).catch(function(error) {
                    if (error.response.status == 400) {
                        me.$notify("No es un usuario válido", 'error')
                    } else if (error.response.status == 401) {
                        me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        me.e401 = true,
                        me.showpage= false
                    } else if (error.response.status == 403) {
                        me.$notify("No esta autorizado para ver esta página", 'error')
                        me.e403= true
                        me.showpage= false
                    } else if (error.response.status == 404) {
                        me.$notify("El recuso no ha sido encontrado", 'error')
                    } else {
                        me.$notify('Error al intentar listar los registros ','error')
                    }
                });
            },
            encuentraConjuntos() {                           
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers: header };
                me.close()
                me.conjuntos = []
                me.conjuntosV = []                
                me.ARC = []                
                me.$justiciarestaurativa.get(`api/AcuerdoReparatorios/ListarConjuntosCA/${me.envioId}`, configuracion)
                    .then((response) => {
                        if (response.data.length == 0) {
                            me.listarAcuerdoReparatorio();
                            me.listarSolicitantesRequeridos("Solicitante");
                            me.listarSolicitantesRequeridos("Requerido");
                            me.listardelitos();
                        } else {
                            response.data.map((b) => {
                                me.$justiciarestaurativa.get(`api/AcuerdoReparatorios/ListaARC/${b.idConjuntoDerivaciones}`, configuracion)
                                    .then((rr) => {
                                        if (rr.data.length != 0) {
                                            me.conjuntos.push({ b, 'acuerdo': rr.data })
                                            console.log(rr.data)
                                            console.log('coordinador:' )
                                            console.log(rr.data[0].statusRespuestaCoordinadorJuridico) 
                                            console.log('AMPO:' )
                                            console.log(rr.data[0].statusRespuestaAMP) 
                                            me.ARC.push(rr.data)
                                        }      
                                        console.log(`conjunto con su acuerdo:`)
                                        console.log(me.conjuntos[0])                                  
                                        me.$justiciarestaurativa.get(`api/AcuerdoReparatorios/ListarConjuntos/${me.envioId}`, configuracion)
                                            .then((resC) => {
                                                me.conjuntosV = resC.data
                                                console.log(`conjuntosV: ${resC.data.length} \n conjuntos: ${response.data.length}`)
                                                if (me.conjuntosV.length == 0) {
                                                    me.AuxBtn = false       
                                                }  
                                            })

                                    })
                            })                                             
                        }
                    })

            },
            encuentraSolicitantes() {
                console.log(`solicitantesR: ${this.v_solicitantesR}`)
                for (var i = 0; i < this.v_solicitantesR.length; i++) {
                    var nombreCompleto = this.v_solicitantesR[i];
                    for (var x = 0; x < this.v_solicitantes.length; x++) {
                        if (this.v_solicitantes[x].nombreCompleto == nombreCompleto) {
                            this.v_solicitantes[x].seleccion = true;
                            this.listardireccionSol(this.v_solicitantes[x]);
                        }
                    }
                }
            },
            encuentraRequeridos() {
                console.log(`requeridosR: ${this.v_requeridosR}`)
                for (var i = 0; i < this.v_requeridosR.length; i++) {
                    var nombreCompleto = this.v_requeridosR[i];
                    for(var x = 0; x < this.v_requeridos.length; x++) {
                        if (this.v_requeridos[x].nombreCompleto == nombreCompleto) {
                            this.v_requeridos[x].seleccion=true;
                            this.listardireccionReq(this.v_requeridos[x]);
                        }
                    }
                }
            },
            consultarPagoSeleccionado () {
                let me = this;
                me.v_showCant = false;
                me.v_showEspecie = false;
                for (var i = 0; i < me.v_tipopago.length; i++) {
                    if (me.v_tipopago[i] == "Dinero") {                        
                        me.v_showCant = true;
                    }
                    if (me.v_tipopago[i] == "Especie") {
                        me.v_showEspecie = true;
                    }
                }
            },            
            guardar() {                
                let me = this;
                let header = { "Authorization": "Bearer " + this.$store.state.token };
                let configuracion = { headers: header };
                var listatipopagoL = "";
                for (var i = 0; i < me.v_tipopago.length; i++) {
                    listatipopagoL = listatipopagoL + " " + me.v_tipopago[i]
                }
                // if (me.v_statusconclusion == "Inmediato") {
                //     me.v_statuscumplimiento = "Cumplido"
                // } else if (me.v_statusconclusion == "Diferido") {
                me.v_statuscumplimiento = "En cumplimiento"
                // }
                let CCo = []
                me.conjuntosV.map((c) => {                    
                    CCo.push(c)                    
                })
                console.log(`edited index casi al guardar: ${me.editedIndex}`)
                me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información.', function () { 
                    me.close()                  
                    let dataPsylod ={
                                //***************************** PERSONA*/
                                'envioId': me.envioId,
                                'tipoDocumento': me.v_tipodocumento,
                                'statusCumplimiento': me.v_statuscumplimiento,
                                'tipoPago': listatipopagoL,
                                'metodoUtilizado': me.v_metodoutilizado,
                                'montoTotal': me.v_cantidadmonto,
                                'objectoEspecie':me.v_especie,
                                'noTotalParcialidades': me.noparcialidad,
                                'periodo': me.v_periodo,
                                'fechaCelebracionAcuerdo': me.v_fechac + ' ' + me.v_horacelebracion,
                                'fechaLimiteCumplimiento': me.v_fechal,
                                'uf_Distrito': me.u_distrito,
                                'uf_DirSubProc': me.u_dirSubPro,
                                'uf_Agencia': me.u_agencia,
                                'uf_Modulo': me.u_modulo,
                                'uf_Nombre': me.u_nombre,
                                'uf_Puesto': me.u_puesto,
                                'seguimientoCumplimientos': me.detallesSC,
                                'textoAR': me.v_textoAR,
                                'nombreSolicitante': me.conjuntosV.length != 0 ? CCo[me.AuxCont].nombreS : me.v_solicitantesR,
                                'nombreRequerdio': me.conjuntosV.length != 0 ? CCo[me.AuxCont].nombreR : me.v_requeridosL,
                                'delitos': me.conjuntosV.length != 0 ? CCo[me.AuxCont].nombreD : me.v_delitosL,
                                'nuc': me.nuc,
                                'noExpediente': me.noExpediente,
                                'statusConclusion': me.v_statusconclusion
                            }                           
                    if (me.editedIndex == -1) {                        
                        me.$justiciarestaurativa.post('api/AcuerdoReparatorios/CrearAcuerdoReparatorio', dataPsylod, configuracion).then(function(response) {                               
                                if(me.conjuntosV.length != 0){
                                    me.$justiciarestaurativa.post('api/AcuerdoReparatorios/CrearAcuerdoConjunto',{
                                        'AcuerdoReparatorioId': response.data.idAcuerdoR,
                                        'ConjuntoDerivacionesId': me.SCon 
                                    })                            
                                }
                                var dd1 = me.crearPdfConDatos();
                                // if (me.v_tipodocumento == "Acuerdo reparatorio") {
                                    //var dd2 = me.crearPdfSinDatos();
                                // }                                
                                var pdfMake = require('pdfmake/build/pdfmake.js')
                                var htmlToPdfmake = require("html-to-pdfmake");
                                if (pdfMake.vfs == undefined){
                                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                                    pdfMake.vfs = pdfFonts.vfs;
                                }                                
                                var doc1 = pdfMake.createPdf(dd1).print();
                                // if (me.v_tipodocumento=="Acuerdo reparatorio") {
                                    // var doc2 = pdfMake.createPdf(dd2).print();
                                    // }                                
                                    // me.close();  
                                me.cambio = 0
                                me.disa = false
                                me.encuentraConjuntos()
                                me.close()
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
                                    me.$notify('Error al intentar crear el  registro!!!', 'error')
                                }
                            });                        
                    } else {              
                        console.log(`idacuerdo: ${me.v_idAcuerdoReparatorio}`)          
                        // axios.put('api/AcuerdoReparatorios/ActualizarAcuerdoReparatorio', {
                        //     'idAcuerdoReparatorio': me.v_idAcuerdoReparatorio,
                        //     'tipoDocumento': me.v_tipodocumento,
                        //     //***************************** PERSONA*/
                        //     //'envioId': me.envioId,
                        //     'nombreSolicitante': me.v_solicitantesL,
                        //     'nombreRequerdio': me.v_requeridosL,
                        //     'delitos': me.v_delitosL,
                        //     'nuc': me.nuc,
                        //     'noExpediente': me.noExpediente,
                        //     'statusConclusion': me.v_statusconclusion,
                        //     'statusCumplimiento': me.v_statuscumplimiento,
                        //     'tipoPago': listatipopagoL,
                        //     'metodoUtilizado': me.v_metodoutilizado,
                        //     'montoTotal': me.v_cantidadmonto,
                        //     'noTotalParcialidades': me.noparcialidad,
                        //     'periodo': me.v_periodo,
                        //     'fechaCelebracionAcuerdo': me.formatearfechahora(me.v_fechac),
                        //     'fechaLimiteCumplimiento': me.v_fechal,
                        //     'uf_Distrito': me.u_distrito,
                        //     'uf_DirSubProc':me.u_dirSubPro,
                        //     'uf_Agencia': me.u_agencia,
                        //     'uf_Modulo': me.u_modulo,
                        //     'uf_Nombre': me.u_nombre,
                        //     'uf_Puesto': me.u_puesto,
                        //     'textoAR': me.v_textoAR,
                        //     //************************************ */
                        // }, configuracion).then(function(response) {
                        //     var dd1 = me.crearPdfConDatos();
                        //     // var dd2 = me.crearPdfSinDatos();
                        //     var pdfMake = require('pdfmake/build/pdfmake.js')
                        //     var htmlToPdfmake = require("html-to-pdfmake");
                        //     if (pdfMake.vfs == undefined){
                        //         var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                        //         pdfMake.vfs = pdfFonts.vfs;
                        //     }
                        //     var doc1 = pdfMake.createPdf(dd1).print();
                        //     // var doc2 = pdfMake.createPdf(dd2).print();
                        //     me.close();
                        // }).catch(function(error) {
                        //     if (error.response.status == 400) {
                        //         me.$notify("No es un usuario válido", 'error')
                        //     } else if (error.response.status == 401) {
                        //         me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                        //         me.e401 = true,
                        //         me.showpage = false
                        //     } else if (error.response.status == 403) {
                        //         me.$notify("No esta autorizado para ver esta página", 'error')
                        //         me.e403 = true
                        //         me.showpage = false
                        //     } else if (error.response.status == 404) {
                        //         me.$notify("El recuso no ha sido encontrado", 'error')
                        //     }else{
                        //         me.$notify('Error al intentar actualizar el registro!!!','error')
                        //     }
                        // });
                    }
                },
                function () {
                    alertify.warning('Verifica la información')
                }).set('labels', { ok:'Guardar', cancel: 'Cancelar' });
            },
            editarAR(ei, v, acu='') {
                var me = this
                console.log(`AuxBtn_antes: ${me.AuxBtn}`)
                me.editedIndex = ei;
                me.v_ARGenerado = v;   
                console.log('el acuerdo para editar es: ')
                console.log(acu)
                me.conjuntoE = []
                me.AuxBtn ? me.AuxBtn = false : me.AuxBtn = true
                if (ei === -1 && v === 0) {
                    me.v_fechacelebracion = '';                        
                    me.v_statusconclusion = '';                     
                    me.v_tipopago = '';                        
                    me.v_cantidadmonto = 0;
                    me.v_showCant = false;        
                    me.noparcialidad = 0;                
                    me.v_horacelebracion = '';
                    me.v_metodoutilizado = ''; 
                    me.SCon = ''
                    me.conjuntoE = []
                } else {                    
                    if (acu != '' && acu != 'undefined' && typeof (acu) == 'object') {
                        console.log('esto es el it que se envia')
                        console.log(acu.b)
                        me.conjuntoE.push(acu.b) 
                        me.SCon = acu.b.idConjuntoDerivaciones
                        let bnm = []
                        bnm.push(acu)
                        if (bnm.acuerdo || bnm.length != 0) {
                            me.v_fechacelebracion = me.formatearfecha(bnm[0].acuerdo[0].fechaCelebracionAcuerdo);                        
                            me.v_statusconclusion = bnm[0].acuerdo[0].statusConclusion;                     
                            me.v_tipopago = bnm[0].acuerdo[0].tipoPago.trim(' ');                        
                            me.v_cantidadmonto = bnm[0].acuerdo[0].montoTotal;
                            me.v_showCant = true;        
                            me.noparcialidad = bnm[0].acuerdo[0].noTotalParcialidades;                
                            me.v_horacelebracion = me.formatearhora(bnm[0].acuerdo[0].fechaCelebracionAcuerdo);
                            me.v_metodoutilizado = bnm[0].acuerdo[0].metodoUtilizado;                                                  
                        }                          
                    }                                   
                }             
                console.log(`AuxBtn_después: ${me.AuxBtn}`)
            },
            listarSeguimiento () {
                this.detallesSC = [];
                var listatipopagoL = "";
                console.log(`el periodo es: ${this.v_periodo}`)
                for(var i = 0; i < this.v_tipopago.length; i++) {
                    listatipopagoL = listatipopagoL + " " + this.v_tipopago[i]
                }
                if (this.v_periodo == 0) {                    
                    this.detallesSC.push({
                        noParcialidad: 1, 
                        fecha: moment(this.v_fechac + ' ' + this.v_horacita),
                        objectoEspecie: this.v_especie,
                        tipoPago: listatipopagoL,
                        cantidadAPagar: this.v_cantidadmonto
                    });
                } else {
                    var acumulado = 1;
                    for(var i = 0; i < this.noparcialidad; i++) {
                        var dias = ((i+acumulado) * this.v_periodo);
                        var nodia = (moment(this.v_fechac).add(dias,'days').subtract(0, 'months').isoWeekday())
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
                        this.detallesSC.push({
                            noParcialidad: i+1, 
                            fecha: moment(this.v_fechac + ' ' + this.v_horacita).add(dias,'days').subtract(0, 'months'),
                            objectoEspecie: this.v_especie,
                            tipoPago: listatipopagoL,
                            cantidadAPagar: this.v_cantidadmonto / this.noparcialidad
                        });
                    }
                }
            },
            informacionagencia () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };                
                me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia, configuracion).then(function(response) {                    
                    me.direccionAgencia = response.data.direccion;
                    me.telefonosAgencia = response.data.telefono;
                    me.contactoDSP = response.data.contacotDirSub;
                    me.nombreDSP = response.data.nombreDirSub;
                    me.nombreDistrito = response.data.nombreDistrito;
                    me.cargoResponsable = response.data.cargoResponsable                    
                }).catch(function(error) {
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
                    }else{
                        me.$notify('Error al intentar listar los registros','error')
                    }
                });
            },
            formatearfecha: function (fecha) {
                return moment(fecha).format('DD/MM/YYYY');
            },
            close() {
                //this.editedIndex = 1
                //this.v_ARGenerado = 1
                // this.conjuntoE = []
                this.modal_AR1 = false;
            },
            formatearhora: function (hora) {
                return moment(hora).format('hh:mm');
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
            InformacionExpediente () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                me.$justiciarestaurativa.get('api/Envios/InformacionExpediente/'+ me.expedienteId + "/" + me.envioId , configuracion).then(function(response) {
                    me.noDerivacion = response.data.noDerivacion;
                    me.fechaExpediente = response.data.fechaRegistroExpediente ;
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
                }).catch(function(error) {
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
                    }else{
                        me.$notify('Error al intentar listar los registros','error')
                    }
                });
            },
            formatearfechahora: function(fecha) {
                return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
            },
            cargartexto () {
                this.vtxtformat = 'siendo las ' + this.v_horacelebracion + ' horas'
                var vtxt_F = "";
                if (this.vtxtformat=='siendo las  horas') {
                    vtxt_F = "";
                } else {
                    vtxt_F = this.vtxtformat;
                }
                var listasolicitantes = "";
                for(var i=0; i < this.v_solicitantesAR.length; i++) {
                    if (i == 0) {
                        listasolicitantes = this.v_solicitantesAR[i].nombreCompleto
                    } else {
                        listasolicitantes = listasolicitantes + ", " + this.v_solicitantesAR[i].nombreCompleto
                    }
                }
                var listarequeridos = "";
                for(var i = 0; i < this.v_requeridosAR.length; i++) {
                    if (i == 0) {
                        listarequeridos = this.v_requeridosAR[i].nombreCompleto
                    } else {
                        listarequeridos = listarequeridos + ", " + this.v_requeridosAR[i].nombreCompleto
                    }
                }
                // Editar para delito por persona
                var listadelito = "";                
                for(var i = 0; i < this.v_delitos.length; i++) {
                    if (i == 0) {
                        listadelito = this.v_delitos[i].nombreDelito
                    } else {
                        listadelito = listadelito + ", " + this.v_delitos[i].nombreDelito
                    }                    
                }
                if (this.v_tipodocumento == "Acuerdo reparatorio") {
                    if (this.v_statusconclusion == "Diferido") {
                        this.v_textoAR = "<p style='text-align: center;'>DECLARACIÓN CONJUNTA DE LOS INTERVINIENTES</p><br><br><br>" +
                        "<p>vez que han sido informados sobre las características, ventajas y alcances de los Mecanismos Alternativos" +
                        " de Solución de Controversias en materia Penal, así como de los derechos y obligaciones que les asisten," +
                        " manifiestan que de forma voluntaria han dialogado, siendo su deseo proceder a la celebración del presente" +

                        " acuerdo reparatorio, bajo los siguientes:</p><br><br><p style='text-align: center;'>ANTECEDENTES</p><br><br><p class='center-justify'><strong>PRIMERO/ÚNICO*.-</strong> En virtud de existir la derivación" +
                        " correspondiente dentro de la carpeta de investigación con número único de caso (NUC) <strong>"+this.nuc+"</strong>por " +
                        " el delito de<strong>"+ listadelito +"</strong>, y al encontrarse cubiertos los requisitos de susceptibilidad, así como de procedencia, los " +
                        "intervinientes expresan que están enterados de los efectos legales que tiene la celebración del presente acuerdo reparatorio,&nbsp;<span>" +
                        "es su deseo y voluntad someterse al tenor de las siguientes:</span></p><br><p class='text-justify'><br></p><p class='text-justify'><em>" +
                        "Nota: En esta parte del acuerdo podemos apoyarnos para hacer más entendible el acuerdo reparatorio, sin que ello implique realizar" +
                        " declaración y/o manifestación de responsabilidad alguna, sino por el contrario utilizarla para darle cuerpo y soporte al clausulado.</em></p><br><br>" +
                        "<p><em>*En ocasiones puede ser necesario más de un antecedente por consiguiente será necesario enumerarlo consecutivamente.</em></p>" +

                        "<br><br><p style='text-align: center;'>CLÁUSULAS</p><br><br><p class='text-justify'><strong>PRIMERA.- </strong>En este momento el(la) C. " +
                        "<strong>" + listasolicitantes + "</strong>y (el/la) C. <strong>" + listarequeridos + " </strong>han convenido de manera" +
                        " satisfactoria que la reparación del daño consista en <strong>xxx </strong><strong>(obligaciones de dar, hacer o no hacer),</strong>" +
                        "misma que será realizada conforme a continuación se describe.</p>" +

                        "<br><br><p class='text-justify'><strong>SEGUNDA.- </strong>Con el objeto de reparar el daño el(la) C. <strong>" + listasolicitantes + "</strong>, el(la) C. " +
                        "<strong>" + listarequeridos + "</strong> manifiesta que es su voluntad asumir y cumplir de forma incondicional las siguientes obligaciones:</p>" +
                        "<br><br><p><strong>1.-</strong></p><br> <p><strong>2.-</strong></p><br> <p><strong>3.-</strong></p><br><br>" +

                        "<strong>TERCERA.- </strong>Con el objeto" +
                        " de que en forma satisfactoria se ponga fin al procedimiento penal el(la) C. <strong>" + listarequeridos + "</strong> está de acuerdo en aceptar por concepto de"+
                        " reparación del daño por parte de el(la) C.<strong>" + listarequeridos + "</strong> lo siguiente:</p>" +
                        "<br><br><p><strong>1.-</strong></p><br> <p><strong>2.-</strong></p><br> <p><strong>3.-</strong></p><br><br>" +
                        "<p class='text-justify'><span>Nota.-En caso de ser necesario podrán existir más cláusulas para puntualizar la reparación del daño.</span></p>" +

                        "<p class='text-justify'><strong>CUARTA.- </strong>Con base en lo dispuesto por los numerales 109 fracción X, 186, 187, 188, 189 y 190" +
                        " del Código Nacional de Procedimientos Penales, así como los ordinales <strong>4, 33, 34 y 35 </strong>de la Ley Nacional" +
                        " de Mecanismos Alternativos de Solución de Controversias en materia Penal, y tomando en cuenta la naturaleza jurídica del asunto planteado" +
                        " a este Centro de Justicia Restaurativa Penal, los intervinientes han celebrado acuerdo reparatorio de <strong>cumplimiento " + this.v_statusconclusion + "</strong>," +
                        " en el cual se establece la reparación total de los daños que con motivo del asunto surgieron, a favor de el(la) C. <strong>" + listasolicitantes + "</strong>" +
                        " por parte de el(la) C. <strong>" + listarequeridos + "</strong>, dentro de la carpeta de investigación número<strong> (NUC) </strong>" +

                        "<strong>" + this.nuc + "</strong>. </p><br><br><p class='text-justify'><strong>QUINTA. -</strong> Leído que fue el acuerdo reparatorio " +
                        "los intervinientes expresan estar conformes con todos y cada uno de los términos, plazos, condiciones y efectos de los compromisos" +
                        " contenidos en el presente, dentro del cual las obligaciones acordadas les resultan proporcionadas en atención a sus necesidades," +
                        " así como la reparación del daño; sabedores que en caso de incumplimiento al presente dará lugar a la continuación del procedimiento" +
                        " penal;  manifestando libremente los intervinientes que estuvieron en condiciones de igualdad y que no actuaron bajo condiciones de " +
                        "intimidación, amenaza o coacción. </p><br><br>" +

                        "<p class='text-justify'><strong>SÉXTA.</strong>- Los intervinientes manifiestan que se les ha informado que el contenido del presente" +
                        " acuerdo reparatorio será sometido a su validación, aprobación y registro en términos de ley, firmando al margen y al calce de conformidad" +
                        " con el mismo.</p>"
                    } else {
                        this.v_textoAR="<p style='text-align: center;'>DECLARACIÓN CONJUNTA DE LOS INTERVINIENTES</p><br><br><br>" +
                        "<p>Una vez que han sido informados sobre las características, ventajas y alcances de los Mecanismos Alternativos" +
                        " de Solución de Controversias en materia Penal, así como de los derechos y obligaciones que les asisten," +
                        " manifiestan que de forma voluntaria han dialogado, siendo su deseo proceder a la celebración del presente" +
                        " acuerdo reparatorio, bajo los siguientes:</p><br><br><p style='text-align: center;'>ANTECEDENTES</p>" +

                        "<br><br><p class='center-justify'><strong>PRIMERO/ÚNICO*.-</strong> En virtud de existir la derivación" +
                        " correspondiente dentro de la carpeta de investigación con número único de caso (NUC) <strong>" + this.nuc + "</strong><strong>, </strong>por<strong>" +
                        " </strong>el delito de<strong>" + listadelito + "</strong>, y al encontrarse cubiertos los requisitos de susceptibilidad, así como de procedencia, los " +
                        "intervinientes expresan que están enterados de los efectos legales que tiene la celebración del presente acuerdo reparatorio,&nbsp;<span>" +
                        "es su deseo y voluntad someterse al tenor de las siguientes:</span></p><br><p class='text-justify'><br></p><p class='text-justify'><em>" +
                        "Nota: En esta parte del acuerdo podemos apoyarnos para hacer más entendible el acuerdo reparatorio, sin que ello implique realizar" +
                        " declaración y/o manifestación de responsabilidad alguna, sino por el contrario utilizarla para darle cuerpo y soporte al clausulado.</em></p><br><br>" +
                        "<p><em>*En ocasiones puede ser necesario más de un antecedente por consiguiente será necesario enumerarlo consecutivamente.</em></p>" +

                        "<br><br><p style='text-align: center;'>CLÁUSULAS</p><br><br><p class='text-justify'><strong>PRIMERA.- </strong>En este momento el(la)  " +
                        "<strong>" + listasolicitantes + "</strong>y el(la) C. <strong>" + listarequeridos + "</strong><strong>, </strong> en uso de de la voz , expresa que por asi convenir sus intereses que con el respecto al delito <strong>xxx </strong> <strong>(obligaciones de dar, hacer o no hacer)," +
                        "</strong>  se da por cubierta  y reparada totalmente del daño que con  motivo del asunto surgio con la celebracion del presente Acuerdo Reparatorio <p>" +

                        "<br><br><p class='text-justify'><strong>SEGUNDA.- </strong>En este momento el/la Con el objeto de reparar el daño el(la) C. <strong>" + listasolicitantes + "</strong>, el " +
                        "<strong>" + listarequeridos + "</strong> manifiesta que es su asi convenir  a sus intereses, que afecto de que que no se generen futuras controversias derivado  de los hecho que  dieron origen  al  presente  expediente, estan de acuerdo y conforme  en asumir los siguientes compromisos:</p>"+
                        "<br><br><p><strong>1.-</strong></p><br> <p><strong>2.-</strong></p><br> <p><strong>3.-</strong></p><br><br>" +

                        "<br><br><strong>TERCERA.- </strong>Con el objeto" +
                        " de que en forma satisfactoria se ponga fin al procedimiento penal el(la) C. <strong>" + listarequeridos + "</strong> está de acuerdo con lo establecido con lo anterior." +
                        " reparación del daño<strong> </strong>por parte de el(la) C.<strong>" + listarequeridos + "</strong><strong> </strong>lo siguiente:</p>" +
                        "<br><br><p><strong>1.-</strong></p><br> <p><strong>2.-</strong></p><br> <p><strong>3.-</strong></p><br><br>" +

                        "<br><br><p class='text-justify'><strong>CUARTA.- </strong>Con base en lo dispuesto por los numerales 109 fracción X, 186, 187, 188, 189 y 190" +
                        " del Código Nacional de Procedimientos Penales, así como los ordinales <strong>4,</strong> <strong>33 y 34 </strong>de la Ley Nacional" +
                        " de Mecanismos Alternativos de Solución de Controversias en materia Penal, y tomando en cuenta la naturaleza jurídica del asunto planteado" +
                        " a este Centro de Justicia Restaurativa Penal, los intervinientes han celebrado acuerdo reparatorio de <strong>cumplimiento " + this.v_statusconclusion + "</strong>," +
                        " en el cual se establece la reparación total de los daños que con motivo del asunto surgieron, a favor de el(la) C. <strong>"+ listasolicitantes +"</strong>" +
                        " por parte  el(la) C. <strong>" + listarequeridos + "</strong><strong>,</strong> dentro de la carpeta de investigación número<strong> (NUC) </strong> <br>" +

                        "<strong>" + this.nuc + "</strong>. </p>0 <br><br><p class='text-justify'><strong>QUINTA. -</strong> Leído que fue el acuerdo reparatorio " +
                        "los intervinientes expresan estar conformes con todos y cada uno de los términos, plazos, condiciones y efectos de los compromisos" +
                        " contenidos en el presente, dentro del cual las obligaciones acordadas les resultan proporcionadas en atención a sus necesidades," +
                        " así como la reparación del daño; manifestando libremente los intervinientes que estuvieron en condiciones" +
                        " de igualdad y que no actuaron bajo condiciones de intimidación, amenaza o coacción. </p><br><br>" +

                        "<p class='text-justify'><strong>SÉXTA.</strong>- Los intervinientes manifiestan que se les ha informado que el contenido del presente" +
                        " acuerdo reparatorio será sometido a su validación, aprobación y registro en términos de ley, firmando al margen y al calce de conformidad" +
                        " con el mismo.</p>"
                    }
                }
                if (this.v_tipodocumento == "Acuerdo reparatorio ADO") {
                    this.v_textoAR = "<p style='text-align: center;'>DECLARACIÓN CONJUNTA DE LOS INTERVINIENTES</p><br><br><br>" +
                    "<p>Una vez que han sido informados sobre las características, ventajas y alcances de los Mecanismos Alternativos" +
                    " de Solución de Controversias en materia Penal, así como de los derechos y obligaciones que les asisten," +
                    " manifiestan que de forma voluntaria han dialogado, siendo su deseo proceder a la celebración del presente" +

                    " acuerdo reparatorio, bajo los siguientes:</p><br><br><p style='text-align: center;'>ANTECEDENTES</p><br><br><p class='center-justify'><strong>PRIMERO/ÚNICO*.-</strong> En virtud de existir la derivación" +
                    " correspondiente dentro de la carpeta de investigación con número único de caso (NUC) <strong>" + this.nuc + "</strong>por " +
                    " el delito de<strong>" + listadelito + "</strong>, y al encontrarse cubiertos los requisitos de susceptibilidad, así como de procedencia, los " +
                    "intervinientes expresan que están enterados de los efectos legales que tiene la celebración del presente acuerdo reparatorio,&nbsp;<span>" +
                    "es su deseo y voluntad someterse al tenor de las siguientes:</span></p><br><p class='text-justify'><br></p><p class='text-justify'><em>" +
                    "Nota: En esta parte del acuerdo podemos apoyarnos para hacer más entendible el acuerdo reparatorio, sin que ello implique realizar" +
                    " declaración y/o manifestación de responsabilidad alguna, sino por el contrario utilizarla para darle cuerpo y soporte al clausulado.</em></p><br><br>" +
                    "<p><em>*En ocasiones puede ser necesario más de un antecedente por consiguiente será necesario enumerarlo consecutivamente.</em></p>" +

                    "<br><br><p style='text-align: center;'>CLÁUSULAS</p><br><br><p class='text-justify'><strong>PRIMERA.- </strong>En este momento el(la) C. " +
                    "<strong>" + listasolicitantes + "</strong>y el(la) C. <strong>" + listarequeridos + "</strong> han convenido de manera" +
                    " satisfactoria que la reparación del daño consista en <strong>xxx </strong><strong>(obligaciones de dar, hacer o no hacer),</strong>" +
                    "misma que será realizada conforme a continuación se describe.</p>" +

                    "<br><br><p class='text-justify'><strong>SEGUNDA.- </strong>Con el objeto de reparar el daño el(la) C. <strong>" + listasolicitantes + "</strong>, el(la) C. " +
                    "<strong>" + listarequeridos + "</strong> manifiesta que es su voluntad asumir y cumplir de forma incondicional las siguientes obligaciones:</p>"+
                    "<br><br><p><strong>1.-</strong></p><br> <p><strong>2.-</strong></p><br> <p><strong>3.-</strong></p><br><br>" +

                    "<strong>TERCERA.- </strong>Con el objeto" +
                    " de que en forma satisfactoria se ponga fin al procedimiento penal el(la) C. <strong>" + listarequeridos + "</strong> está de acuerdo en aceptar por concepto de" +
                    " reparación del daño por parte de el(la) C.<strong>" + listarequeridos + "</strong> lo siguiente:</p>" +
                    "<br><br><p><strong>1.-</strong></p><br> <p><strong>2.-</strong></p><br> <p><strong>3.-</strong></p><br><br>" +

                    "<p class='text-justify'><strong>CUARTA.- </strong>Con base en lo dispuesto por los numerales 109 fracción X, 186, 187, 188, 189 y 190" +
                    " del Código Nacional de Procedimientos Penales, así como los ordinales <strong>4, 33, 34 y 35 </strong>de la Ley Nacional" +
                    " de Mecanismos Alternativos de Solución de Controversias en materia Penal, así como los artículos 95, 97, 98 y 99 de la Ley" +
                    " Nacional del Sistema Integral de Justicia para Adolescentes y tomando en cuenta la naturaleza jurídica del asunto planteado" +
                    " a este Centro de Justicia Restaurativa Penal, los intervinientes han celebrado acuerdo reparatorio de <strong>cumplimiento " + this.v_statusconclusion + "</strong>," +
                    " en el cual se establece la reparación total de los daños que con motivo del asunto surgieron, a favor de el(la) C. <strong>" + listasolicitantes + "</strong>" +
                    " por parte del adolecente de iniciales XXX y el(la) C. <strong>" + listarequeridos + "</strong>, persona responsable del adolecente,  dentro de la carpeta de investigación número<strong> (NUC) </strong>" +

                    "<strong>" + this.nuc + "</strong>. </p><br><br><p class='text-justify'><strong>QUINTA. -</strong> Los intervinientes expresan estar" +
                    " de acuerdo con todas y cada uno de los términos, plazos, condiciones y efectos de los compromisos y obligaciones contenidos en" +
                    " este acuerdo reparatorio, derivado de la aplicación de los Mecanismos Alternativos de Solución de Controversias en Materia Penal," +
                    " en el procedimiento de " + this.v_metodoutilizado + ", así como que en caso de incumplimiento al mismo, dará lugar a la continuación" +
                    " del procedimiento penal; manifestando que en este no existieron condiciones de intimidación, amenaza o coacción. </p><br><br>" +

                    "<p class='text-justify'>Leído que fue el acuerdo reparatorio, y enterados los intervinientes plenamente de su contenido y efectos," +
                    + vtxt_F + "  lo firman por triplicado el día de la fecha, asistidos por el(la) Facilitador(a) que intervino, pasándose" +
                    " a su validación en términos de ley.</p>"
                }
                if (this.v_tipodocumento == "Plan de reparación") {
                    this.v_textoAR = "<p style='text-align: center;'>DECLARACIÓN CONJUNTA DE LOS INTERVINIENTES</p><br><br><br>" +
                    "<p>Una vez que han sido informados sobre las características, ventajas y alcances de los Mecanismos Alternativos" +
                    " de Solución de Controversias en materia Penal, así como de los derechos y obligaciones que les asisten," +
                    " manifiestan que de forma voluntaria han dialogado, siendo su deseo proceder a la celebración del presente" +
                    " acuerdo reparatorio, bajo los siguientes:</p>" +

                    "<br><br><p style='text-align: center;'>ANTECEDENTES</p><br><br><p class='center-justify'><strong>ÚNICO.-</strong> En virtud de existir la derivación" +
                    " correspondiente dentro de la carpeta de investigación con número único de caso <strong>(NUC) " + this.nuc + ",</strong>" +
                    " por el delito de<strong>" + listadelito + "</strong>, y una vez cubiertos los requisitos de oportunidad, susceptibilidad y procedencia, los " +
                    "intervinientes expresan que están conscientes de los alcances jurídicosque tiene la celebración del plan de reparacion y de condiciones por cumplir, " +
                    "y una vez que han reconocido los derechos y obligaciones que les asisten, " +
                    "es su deseo y voluntad someterse al tenor de las siguientes:</p><br>" +

                    "<br><br><p style='text-align: center;'>CLÁUSULAS</p><br><br><p class='text-justify'><strong>PRIMERA.- </strong> el(la) C. " +
                    "<strong>" + listasolicitantes + "</strong>solicita el(la) C. <strong>" + listarequeridos + ",</strong>(obligaciones de dar hacer o no hacer)" +
                    " como reparación integral del daño por los hechos motivo del presente expediente, la cual se cuantifico con base a lo siguiente:</p>" +
                    "<br><br><p><strong>a)</strong></p><br><p><strong>b)</strong></p><br><p><strong>c)</strong></p><br><br>" +

                    "<strong>SEGUNDA.- </strong>Para efecto de la cláusula que antecede, en este acto el(la) C. <strong>" + listasolicitantes + "</strong>" +
                    ", expresa que no existe oposición de su parte en (obligaciones de dar hacer o no hacer)  a favor de el(la) C. " +
                    "<strong>" + listarequeridos + "</strong> se obligándose a cumplir lo estipulado de la siguiente forma: </p>" +                                                
                    "<br><br><p><strong>1.-</strong></p><br> <p><strong>2.-</strong></p><br> <p><strong>3.-</strong></p><br><br>" +

                    "<p><strong>TERCERA.- </strong>el(la) C. <strong>"+ listarequeridos +"</strong>"+
                    " se obliga incondicionalmente a cumplir las siguientes condiciones las cuales están señaladas en el artículo 195 del Código Nacional de Procedimientos Penales.</p>"+
                    "<br><br><p>1.- A abstenerse de generar u ocasionar cualquier tipo de violencia hacia la requerida, tanto en lo presente como en el futuro; </p>" +
                    "<br><br><p>2.- A recibir tratamiento psicoterapéutico reeducativo con el terapeuta Adscrito a la Coordinación General de Atención a la Familia y a la Víctima.</p>" +
                    "<br><br><p>3.- Cualquier otra condición que, a juicio del Juez de control, logre una efectiva tutela de los derechos de la víctima.</p><br><br>" +

                    "<p class='text-justify'><strong>CUARTA.- </strong> el(la) C. <strong>" + listasolicitantes + ",</strong>" +
                    " está de acuerdo y conforme con las condiciones por cumplir que en este momento asume el(la) C. <strong>" + listarequeridos + ",</strong>" +
                    " las cuales le garantizan una efectiva tutela en sus derechos, mismas que se detallaron con antelación." +

                    "<br><br><p class='text-justify'><strong>QUINTA. -</strong>"+
                    "Con base en lo dispuesto por los numerales 109 fracción X, 184 fracción II, 191, 194 y 195 del Código Nacional de Procedimientos Penales,"+
                    " así como los ordinales 1° y 4°de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal y tomando en"+
                    " cuenta la naturaleza jurídica del asunto planteado a este Centro de Justicia Restaurativa Penal, en el que los intervinientes han celebrado"+
                    " un plan de reparación y de condiciones por cumplir por parte de el(la) C. <strong>"+ listarequeridos +",</strong> a favor de el(la) C. <strong>"+ listasolicitantes +",</strong> dentro de la"+
                    " <strong>Carpeta de Investigación Número "+this.nuc+",</strong></p><br><br>"+

                    "<p class='text-justify'><strong>SÉXTA.</strong>- Los intervinientes expresan estar de acuerdo con todas y cada uno de los términos,"+
                    " plazos, condiciones y efectos de los compromisos y obligaciones contenidos en este plan de reparación y condiciones por cumplir;"+
                    " así como que en caso de incumplimiento al mismo, dará lugar a la continuación del procedimiento penal, manifestando que no existió"+
                    " ningún vicio del consentimiento, como dolo, mala fe, error o violencia.</p><br><br>"+

                    "Leído que fue el proyecto de plan de reparación y condiciones por cumplir, y enterados los intervinientes plenamente de su contenido"+
                    " y efectos, "+ vtxt_F + " lo firman por triplicado el día de la fecha, asistidos por la Facilitadora que intervino."
                }
            },
            crearPdfConDatos() {
                let me = this;
                var pdfMake = require('pdfmake/build/pdfmake.js');
                var htmlToPdfmake = require("html-to-pdfmake");
                var logo1 = this.logo1;
                var logo2 = this.logo2;
                var logo3 = this.logo3;
                var logo4 = this.logo4;
                var diragencia = this.direccionAgencia;
                var telagencia= this.telefonosAgencia;
                var contactoDSP = this.contactoDSP;
                var nombreDSP = this.nombreDSP;
                var nombreDistrito = this.nombreDistrito;
                var cargo = this.cargoResponsable

                this.vtxtformat = 'siendo las ' + this.v_horacelebracion + ' horas'
                var vtxt_F = "";
                if (this.vtxtformat == 'siendo las  horas') {
                    vtxt_F = "";
                } else {
                    vtxt_F = this.vtxtformat;
                }

                if (this.editedIndex == 1) {
                    var num2Let = require('numalet')()
                    var dia = moment(this.v_fechac).format("DD");
                    var diatext = num2Let(dia);
                    var mes = moment(this.v_fechac).format('MMMM');
                    var año = moment(this.v_fechac).format("YYYY");
                    var añotext = num2Let(año);
                    var pdf_distrito = this.uf_Distrito;
                    var pdf_dirsubproc = this.uf_DirSubProc;
                    var pdf_agencia = this.uf_Agencia;
                    var pdf_usuario = this.uf_Nombre;
                    var pdf_puesto = this.uf_Puesto;
                    var pdf_modulo = this.uf_Modulo;
                    var fecha = dia + " de " + mes  + " del " + año
                } else {
                    var num2Let = require('numalet')();
                    var dia = moment().format("DD");
                    var diatext = NumberAsString(dia);
                    var mes = moment().format('MMMM');
                    var año = moment().format("YYYY");
                    var añotext = NumberAsString(año);
                    var pdf_distrito = this.u_distrito;
                    var pdf_dirsubproc = this.u_dirSubPro;
                    var pdf_agencia = this.u_agencia;
                    var pdf_usuario = this.u_nombre;
                    var pdf_puesto = this.u_puesto;
                    var pdf_modulo = this.u_modulo;
                    var fecha = dia + " de " + mes + " del " + año
                }
                var html_texto  = htmlToPdfmake(
                    this.v_textoAR
                );
                var sourceDataSL = this.v_solicitantesAR;
                var bodyDataSolicitantesLineal = [];
                sourceDataSL.forEach(function(sourceRow) {
                    var dataRow = [];
                    bodyDataSolicitantesLineal.push(dataRow)
                    if (me.v_tipodocumento!=="Acuerdo reparatorio ADO") {
                        dataRow.push( ' ' + sourceRow.nombreCompleto);
                    } else {
                        if(sourceRow.edad < 18) {
                            dataRow.push(' el adolecente de inciaiales ' + sourceRow.nombreCompleto + ' en calidad de solicitante quien es acompañado por el(la) C. ' 
                            + sourceRow.rnombre + ' persona responsable del adolecente');
                        } else {
                            dataRow.push( ' se presentan el(la) C. ' + sourceRow.nombreCompleto + ' en calidad de solicitante ');
                        }
                    }
                });
                var sourceDataS = this.v_solicitantesAR;
                var bodyDataSolicitantes = [];
                sourceDataS.forEach(function(sourceRow) {
                    var dataRow = [];
                    bodyDataSolicitantes.push(dataRow)
                    if (me.v_tipodocumento=="Acuerdo reparatorio") {                        
                        dataRow.push('<p><strong>Del Solicitante:</strong> el(la) C. <strong>'+ sourceRow.nombreCompleto+
                            ',</strong> de Nacionalidad <strong>' + sourceRow.nacionalidad+
                            '</strong> originario de <strong>'+ (sourceRow.entidadFederativa == null ? '(dato no registrado)' : sourceRow.entidadFederativa) +
                            ',</strong> con domicilio  en <strong>' + sourceRow.direccion +
                            ',</strong> de <strong>' + sourceRow.edad +
                            '</strong> años de edad, por haber nacido el <strong>' + (sourceRow.fechaNacimiento == "Invalid date de Invalid date del Invalid date" ? '(dato no registrado)' : sourceRow.fechaNacimiento) +
                            ',</strong> del Estado Familiar <strong>' + sourceRow.estadoCivil +
                            '</strong> de ocupación <strong>' + sourceRow.ocupacion +
                            ',</strong> con grado de estudios a nivel <strong>' + sourceRow.nivelEstudio +
                            ',</strong> clave única de registro de población <strong>' + sourceRow.curp +
                            ',</strong> que se identifica con el(la) <strong>' + sourceRow.docIdentificacion +
                            '</strong> la cual coincide con los rasgos fisonómicos de quien la porta y en este momento'+
                            ' le es devuelta por ser de utilidad personal'+
                            ', dejando en su lugar fotocopia simple de la misma para debida constancia.</p>'
                        );
                    } else if (me.v_tipodocumento=="Acuerdo reparatorio ADO") {
                        if (sourceRow.edad < 18) {
                            dataRow.push('<p><strong>Del Solicitante:</strong> El adolecente de iniciales. <strong>'+ sourceRow.nombreCompleto +
                                ',</strong> de  <strong>' + sourceRow.redad +
                                ' años de edad</strong> por haber nacido el <strong>'+ (sourceRow.rfechaNacimiento == "Invalid date de Invalid date del Invalid date" ? '(dato no registrado)' : sourceRow.rfechaNacimiento) +
                                ',</strong> lo cual se acredita mediante acta de nacimiento expedida por el Registro Civil, de la ' +
                                ' cual se agrega copia para debida constancia y de quien se omiten sus demás datos personales de ' +
                                'conformidad a lo establecido en el artículo 36 de la Ley Nacional del Sistema Integral de ' +
                                'Justicia Penal para Adolescentes, el cual hace referencia al confidencialidad y ' +
                                'privacidad. Quien se encuentra debidamente acompañado por persona responsable del adolescente, siendo el(la) C. ' +
                                '<strong>'+ sourceRow.rnombre +
                                ',</strong> de Nacionalidad <strong>' + sourceRow.rnacionalidad +
                                ',</strong> de <strong>' + sourceRow.redad +
                                '</strong> años de edad, por haber nacido el <strong>' + sourceRow.rfechanaciomiento +
                                ',</strong> clave única de registro de población <strong>' + sourceRow.rcurp +
                                ',</strong> de quien se omiten sus demás datos personales en relación con lo estipulado ' +
                                'por el ordinal 15 del Código Nacional de Procedimientos Penales, el cual hace referencia ' +
                                'a los Derechos a la intimidad y a la privacidad.</p>');
                        } else {
                            dataRow.push('<p><strong>Del Solicitante:</strong> el(la) C. <strong>'+ sourceRow.nombreCompleto+
                                ',</strong> de Nacionalidad <strong>' + sourceRow.nacionalidad+
                                ',</strong> de <strong>' + sourceRow.edad +
                                '</strong> años de edad, por haber nacido el <strong>' + (sourceRow.fechaNacimiento == "Invalid date de Invalid date del Invalid date" ? '(dato no registrado)' : sourceRow.fechaNacimiento) +
                                ',</strong> clave única de registro de poblacion <strong>' + sourceRow.curp +
                                ',</strong> de quien se omiten sus demás datos personales en relación con lo estipulado '+
                                'por el ordinal 15 del Código Nacional de Procedimientos Penales, el cual hace referencia '+
                                'a los Derechos a la intimidad y a la privacidad.</p>'
                            );
                        }
                    } else if (me.v_tipodocumento == "Plan de reparación") {
                        dataRow.push('<p><strong>Del Solicitante:</strong> el(la) C. <strong>' + sourceRow.nombreCompleto +
                            ',</strong> de Nacionalidad <strong>' + sourceRow.nacionalidad +
                            '</strong> originario de <strong>'+ (sourceRow.entidadFederativa == null ? '(dato no registrado)' : sourceRow.entidadFederativa) +
                            ',</strong> con domicilio  en <strong>' + sourceRow.direccion +
                            ',</strong> de <strong>' + sourceRow.edad +
                            '</strong> años de edad, por haber nacido el <strong>' + (sourceRow.fechaNacimiento == "Invalid date de Invalid date del Invalid date" ? '(dato no registrado)' : sourceRow.fechaNacimiento) +
                            ',</strong> del Estado Familiar <strong>' + sourceRow.estadoCivil +
                            '</strong> de ocupación <strong>' + sourceRow.ocupacion +
                            ',</strong> con grado de estudios a nivel <strong>' + sourceRow.nivelEstudio +
                            ',</strong> clave única de registro de población <strong>' + sourceRow.curp +
                            ',</strong> que se identifica con el/la <strong>' + sourceRow.docIdentificacion +
                            '</strong> la cual coincide con los rasgos fisonómicos de quien la porta y en este momento' +
                            ' le es devuelta por ser de utilidad personal' +
                            ', dejando en su lugar copia simple de la misma para debida constancia.</p>'
                        );
                    }
                });

                var sourceDataRL = this.v_requeridosAR;
                var bodyDataRequeridosLineal = [];

                sourceDataRL.forEach(function(sourceRow) {
                    var dataRow = [];
                    bodyDataRequeridosLineal.push(dataRow)
                    if (me.v_tipodocumento !== "Acuerdo reparatorio ADO") {
                        dataRow.push( ' ' + sourceRow.nombreCompleto);
                    } else {
                        if (sourceRow.edad < 18) {
                            dataRow.push( ' el adolecente de inciaiales ' + sourceRow.nombreCompleto + ' en calidad de requerido quien es acompañado por el(la) C. '+ sourceRow.rnombre + ' persona responsable del adolecente,');
                        } else {
                            dataRow.push( ' se presentan el(la) C. ' + sourceRow.nombreCompleto+ ' en calidad de requerido ');
                        }
                    }
                });
                var sourceDataR = this.v_requeridosAR;
                var bodyDataRequeridos = [];

                sourceDataR.forEach(function(sourceRow) {
                    var dataRow = [];                    
                    bodyDataRequeridos.push(dataRow)                    
                    if (me.v_tipodocumento == "Acuerdo reparatorio") {
                        dataRow.push('<p><strong>Del Requerido:</strong> el(la) C. <strong>'+ sourceRow.nombreCompleto +
                            ',</strong> de Nacionalidad <strong>' + sourceRow.nacionalidad +
                            '</strong> originario de <strong>'+ (sourceRow.entidadFederativa == null ? '(dato no registrado)' : sourceRow.entidadFederativa) +
                            ',</strong> con domicilio  en <strong>' + sourceRow.direccion +
                            ',</strong> de <strong>' + sourceRow.edad +
                            '</strong> años de edad, por haber nacido el <strong>' + (sourceRow.fechaNacimiento == "Invalid date de Invalid date del Invalid date" ? '(dato no registrado)' : sourceRow.fechaNacimiento) +
                            ',</strong> del Estado Familiar <strong>' + sourceRow.estadoCivil +
                            '</strong> de ocupación <strong>' + sourceRow.ocupacion +
                            ',</strong> con grado de estudios a nivel <strong>' + sourceRow.nivelEstudio +
                            ',</strong> clave única de registro de población <strong>' + sourceRow.curp +
                            ',</strong> que se identifica con el(la) <strong>' + sourceRow.docIdentificacion +
                            '</strong> la cual coincide con los rasgos fisonómicos de quien la porta y en este momento' +
                            ' le es devuelta por ser de utilidad personal'+
                            ', dejando en su lugar fotocopia simple de la misma para debida constancia.</p>'
                        );
                    } else if (me.v_tipodocumento == "Acuerdo reparatorio ADO") {
                        if (sourceRow.edad < 18) {
                            dataRow.push('<p><strong>Del Requerido:</strong> El adolecente de iniciales. <strong>'+ sourceRow.nombreCompleto+
                                ',</strong> de  <strong>' + sourceRow.redad+
                                ' años de edad</strong> por haber nacido el <strong>'+ (sourceRow.fechaNacimiento == "Invalid date de Invalid date del Invalid date" ? '(dato no registrado)' : sourceRow.fechaNacimiento) +
                                ',</strong> lo cual se acredita mediante acta de nacimiento expedida por el Registro Civil, de la ' +
                                ' cual se agrega copia para debida constancia y de quien se omiten sus demás datos personales de ' +
                                'conformidad a lo establecido en el artículo 36 de la Ley Nacional del Sistema Integral de ' +
                                'Justicia Penal para Adolescentes, el cual hace referencia al confidencialidad y '+
                                'privacidad. Quien se encuentra debidamente acompañado por persona responsable del adolescente, siendo el(la) C. ' +
                                '<strong>'+ sourceRow.rnombre +
                                ',</strong> de Nacionalidad <strong>' + sourceRow.rnacionalidad +
                                ',</strong> de <strong>' + sourceRow.redad +
                                '</strong> años de edad, por haber nacido el <strong>' + (sourceRow.rfechanaciomiento == "Invalid date de Invalid date del Invalid date" ? '(dato no registrado)' : sourceRow.rfechanaciomiento) +
                                ',</strong> clave única de registro de poblacion <strong>' + sourceRow.rcurp +
                                ',</strong> de quien se omiten sus demás datos personales en relación con lo estipulado ' +
                                'por el ordinal 15 del Código Nacional de Procedimientos Penales, el cual hace referencia ' +
                                'a los Derechos a la intimidad y a la privacidad.</p>'
                            );
                        } else {
                            dataRow.push('<p><strong>Del Requerido:</strong> el(la) C. <strong>' + sourceRow.nombreCompleto +
                                ',</strong> de Nacionalidad <strong>' + sourceRow.nacionalidad+
                                ',</strong> de <strong>' + sourceRow.edad +
                                '</strong> años de edad, por haber nacido el <strong>' + (sourceRow.fechaNacimiento == "Invalid date de Invalid date del Invalid date" ? '(dato no registrado)' : sourceRow.fechaNacimiento) +
                                ',</strong> clave única de registro de poblacion <strong>' + sourceRow.curp +
                                ',</strong> de quien se omiten sus demás datos personales en relación con lo estipulado ' +
                                'por el ordinal 15 del Código Nacional de Procedimientos Penales, el cual hace referencia ' +
                                'a los Derechos a la intimidad y a la privacidad.</p>'
                            );
                        }
                    } else if (me.v_tipodocumento == "Plan de reparación") {
                        dataRow.push('<p><strong>Del Requerido:</strong> el(la) C. <strong>' + sourceRow.nombreCompleto +
                            ',</strong> de Nacionalidad <strong>' + sourceRow.nacionalidad +
                            '</strong> originario de <strong>'+ (sourceRow.entidadFederativa == null ? '(dato no registrado)' : sourceRow.entidadFederativa) +
                            ',</strong> con domicilio  en <strong>' + sourceRow.direccion +
                            ',</strong> de <strong>' + sourceRow.edad +
                            '</strong> años de edad, por haber nacido el <strong>' + (sourceRow.fechaNacimiento == "Invalid date de Invalid date del Invalid date" ? '(dato no registrado)' : sourceRow.fechaNacimiento) +
                            ',</strong> del Estado Familiar <strong>' + sourceRow.estadoCivil +
                            '</strong> de ocupación <strong>' + sourceRow.ocupacion +
                            ',</strong> con grado de estudios a nivel <strong>' + sourceRow.nivelEstudio +
                            ',</strong> clave única de registro de población <strong>' + sourceRow.curp +
                            ',</strong> que se identifica con el(la) <strong>' + sourceRow.docIdentificacion +
                            '</strong> la cual coincide con los rasgos fisonómicos de quien la porta y en este momento' +
                            ' le es devuelta por ser de utilidad personal'+
                            ', dejando en su lugar fotocopia simple de la misma para debida constancia.</p>'
                        );
                    }
                });
                var titulodoc = "";
                var textoprincipal = "";
                if (me.v_tipodocumento == "Acuerdo reparatorio") {
                    titulodoc = "ACUERDO REPARATORIO"
                    textoprincipal = '<p>En la ciudad de ' + pdf_distrito + ', Estado de Hidalgo, <strong>' + vtxt_F + ' del día ' + dia + '('+ diatext +') de ' + mes  
                    + ' del año ' + año  + '('+ añotext + ')</strong>, ' + ' se presenta el(la) <strong> C. '+ bodyDataSolicitantesLineal 
                    + '</strong>  en calidad de solicitante y el(la)  <strong>C. ' + bodyDataRequeridosLineal 
                    + '</strong> en calidad de requerido, ante el centro de Justicia Restaurativa Penal; de quienes a continuación se detallan sus:</p>' ;
                }
                if (me.v_tipodocumento == "Acuerdo reparatorio ADO") {
                    titulodoc = "ACUERDO REPARATORIO"
                    textoprincipal = '<p>En la ciudad de ' + pdf_distrito + ', Estado de Hidalgo, <strong>' + vtxt_F + ' del dia ' + dia + '('+ diatext +') de ' + mes 
                    + ' del año ' + año + '('+ añotext + '), </strong>' + bodyDataSolicitantesLineal + bodyDataRequeridosLineal 
                    + ' ante el centro de Justicia Restaurativa Penal; de quienes a continuación se detallan sus:</p>';
                }
                if (me.v_tipodocumento == "Plan de reparación") {
                    titulodoc = "PLAN DE REPARACIÓN Y DE CONDICIONES POR CUMPLIR";
                    textoprincipal = '<p>En la ciudad de ' + pdf_distrito + ', Estado de Hidalgo, <strong>' + vtxt_F + ' del dia ' + dia + '('+ diatext +') de ' + mes 
                    + ' del año ' + año + '('+ añotext + ')</strong>, ' + ' se presenta el(la) <strong> C. ' + bodyDataSolicitantesLineal 
                    + '</strong> en calidad de solicitante y el(la)  <strong> C.' + bodyDataRequeridosLineal + '</strong> ante el centro de Justicia Restaurativa Penal ' +
                    'de la Procuraduría General de Justicia del Estado adscrito al Centro de Justicia para las Mujeres del Estado de Hidalgo; de quienes a continuación se detallan sus:</p>';
                }
                var html_textoprincipal = htmlToPdfmake(
                    textoprincipal
                );

                var html_requeridos = htmlToPdfmake(
                    bodyDataRequeridos
                );
                var html_solicitantes = htmlToPdfmake(
                    bodyDataSolicitantes
                );
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
                                    text: diragencia + "\n" + telagencia + "\n" +  'www.hidalgo.gob.mx',
                                    style: 'footertext',
                                    margin: [312,12,72,0],
                                    alignment:'right',
                                    absolutePosition: { x: 0, y: 30 },
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
                            text:  'EXPEDIENTE: ' + this.noExpediente,
                            style: 'nuc'
                        },
                        '\n\n\n',
                        {
                            text: titulodoc,
                            style: 'titulo'
                        },
                        '\n\n',
                        {
                            text:  html_textoprincipal,
                            style: 'texto'
                        },
                        '\n\n',
                        {
                            text: 'DATOS GENERALES',
                            style: 'subtitulo'
                        },
                        '\n',
                        {
                            style: 'table',
                            table: {
                                headerRows: 1,
                                widths: ['*'],
                                body: [
                                    [html_solicitantes]
                                ]
                            },
                            layout: 'noBorders'
                        },
                        {
                            style: 'table',
                            table: {
                                headerRows: 1,
                                widths: ['*'],
                                body: [
                                    [html_requeridos]
                                ]
                            },
                            layout: 'noBorders'
                        },
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
                            color: 'white'
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
            crearPdfSinDatos() {
                var pdfMake = require('pdfmake/build/pdfmake.js');
                var htmlToPdfmake = require("html-to-pdfmake");
                var logo1 = this.logo1;
                var logo2 = this.logo2;
                var logo3 = this.logo3;
                var logo4 = this.logo4;
                var diragencia = this.direccionAgencia;
                var telagencia = this.telefonosAgencia;
                var directoroperativo = this.contactoDSP;
                var direccionsubprocu= this.nombreDSP;
                this.vtxtformat = 'siendo las ' + this.v_horacelebracion + ' horas'
                var vtxt_F = "";
                if (this.vtxtformat == 'siendo las  horas') {
                    vtxt_F = "";
                } else {
                    vtxt_F = this.vtxtformat;
                }

                if (this.editedIndex == 1) {
                    var num2Let = require('numalet')()
                    var dia = moment(this.v_fechac).format("DD");
                    var diatext = num2Let(dia);
                    var mes = moment(this.v_fechac).format('MMMM');
                    var año = moment(this.v_fechac).format("YYYY");
                    var añotext = num2Let(año);
                    var pdf_distrito = this.uf_Distrito;
                    var pdf_dirsubproc = this.uf_DirSubProc;
                    var pdf_agencia = this.uf_Agencia;
                    var pdf_usuario = this.uf_Nombre;
                    var pdf_puesto = this.uf_Puesto;
                    var pdf_modulo = this.uf_Modulo;
                    var fecha = dia + " de " + mes  + " del " + año
                } else {
                    var num2Let = require('numalet')();
                    var dia = moment().format("DD");
                    var diatext = num2Let(dia);
                    var mes = moment().format('MMMM');
                    var año = moment().format("YYYY");
                    var añotext = num2Let(año);
                    var pdf_distrito = this.u_distrito;
                    var pdf_dirsubproc = this.u_dirSubPro;
                    var pdf_agencia = this.u_agencia;
                    var pdf_usuario = this.u_nombre;
                    var pdf_puesto = this.u_puesto;
                    var pdf_modulo = this.u_modulo;
                    var fecha = dia + " de " + mes + " del " + año
                }
                var html_texto  = htmlToPdfmake(
                    this.v_textoAR
                );
                var sourceDataSL = this.v_solicitantesAR;
                var bodyDataSolicitantesLineal = [];

                sourceDataSL.forEach(function(sourceRow) {
                    var dataRow = [];
                    bodyDataSolicitantesLineal.push(dataRow)
                    dataRow.push( ' ' + sourceRow.nombreCompleto);
                });
                var sourceDataS = this.v_solicitantesAR;
                var bodyDataSolicitantes = [];

                sourceDataS.forEach(function(sourceRow) {
                    var dataRow = [];
                    bodyDataSolicitantes.push(dataRow)
                    dataRow.push('<p><strong>Del Solicitante:</strong> el(la) C. <strong>'+ sourceRow.nombreCompleto +
                        '</strong>, de Nacionalidad <strong>' + sourceRow.nacionalidad +
                        '</strong> de <strong>' + sourceRow.edad +
                        '</strong> años de edad, por haber nacido el <strong>' + (sourceRow.fechaNacimiento == "Invalid date de Invalid date del Invalid date" ? '(dato no registrado)' : sourceRow.fechaNacimiento) +
                        '</strong>,  de quien se omiten sus demás datos personales en virtud de que' +
                        ' ya obran en la carpeta de investigación motivo del presente acuerdo;' +
                        ' y en relación con lo estipulado por el ordinal 15 del Código Nacinal' +
                        ' de Procedimientos Penales el cual hace referencia a los Derechos ' +
                        'a la intimidad y a la privacidad.</p>'
                    );
                });

                var sourceDataRL = this.v_requeridosAR;
                var bodyDataRequeridosLineal = [];

                sourceDataRL.forEach(function(sourceRow) {
                    var dataRow = [];
                    bodyDataRequeridosLineal.push(dataRow)
                    dataRow.push(' ' + sourceRow.nombreCompleto);
                });

                var sourceDataR = this.v_requeridosAR;
                var bodyDataRequeridos = [];

                sourceDataR.forEach(function(sourceRow) {
                    var dataRow = [];
                    bodyDataRequeridos.push(dataRow)
                    dataRow.push('<p><strong>Del Solicitante:</strong> el(la) C. <strong>' + sourceRow.nombreCompleto+
                        '</strong>, de Nacionalidad <strong>' + sourceRow.nacionalidad+
                        '</strong> de <strong>' + sourceRow.edad +
                        '</strong> años de edad, por haber nacido el <strong>' + (sourceRow.fechaNacimiento == "Invalid date de Invalid date del Invalid date" ? '(dato no registrado)' : sourceRow.fechaNacimiento) +
                        '</strong>,  de quien se omiten sus demás datos personales en virtud de que' +
                        ' ya obran en la carpeta de investigación motivo del presente acuerdo;' +
                        ' y en relación con lo estipulado por el ordinal 15 del Código Nacinal' +
                        ' de Procedimientos Penales el cual hace referencia a los Derechos ' +
                        'a la intimidad y a la privacidad.</p><br><br>'
                    );
                });

                var titulodoc = "";
                var textoprincipal = "";
                if (this.v_tipodocumento == "Acuerdo reparatorio"){
                    titulodoc = "ACUERDO REPARATORIO"
                    textoprincipal = '<p>En la ciudad de ' + pdf_distrito + ', Estado de Hidalgo, <strong>' + vtxt_F + ' del dia ' + dia + '('+ diatext +') de ' + mes 
                    + ' del año ' + año  + '('+ añotext + ')</strong>, ' + ' se presenta el(la) <strong> C. '+ bodyDataSolicitantesLineal + 
                    '</strong> en calidad de solicitante y el(la)  <strong>C.' + bodyDataRequeridosLineal + 
                    '</strong> en calidad de requerido, ante el centro de Justicia Restaurativa Penal; de quienes a continuación se detallan sus:</p>';
                }
                if (this.v_tipodocumento == "Acuerdo reparatorio ADO") {
                    titulodoc = "ACUERDO REPARATORIO"
                    textoprincipal = '';
                }
                if (this.v_tipodocumento == "Plan de reparación") {
                    titulodoc = "PLAN DE REPARACIÓN Y DE CONDICIONES POR CUMPLIR";
                    textoprincipal = '<p>En la ciudad de ' + pdf_distrito + ', Estado de Hidalgo, <strong>' + vtxt_F + ' del dia ' + dia + '('+ diatext +') de ' + mes 
                    + ' del año ' + año  + '('+ añotext + ')</strong>,'  + 'se presenta el(la) <strong> C. '+ bodyDataSolicitantesLineal + 
                    '</strong> en calidad de solicitante y el(la)  <strong>C.' + bodyDataRequeridosLineal + '</strong> ante el centro de Justicia Restaurativa Penal '+
                    'de la Procuraduría General de Justicia del Estado adscrito al Centro de Justicia para las Mujeres del Estado de Hidalgo; de quienes a continuación se detallan sus:</p>';
                }

                var html_textoprincipal  = htmlToPdfmake(
                    textoprincipal
                );
                var html_requeridos  = htmlToPdfmake(
                    bodyDataRequeridos
                );
                var html_solicitantes  = htmlToPdfmake(
                    bodyDataSolicitantes
                );
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
                                    text: diragencia + "\n" + telagencia  + '\n' +  'www.hidalgo.gob.mx',
                                    style: 'footertext',
                                    margin: [312,12,72,0],
                                    alignment:'right' ,
                                    absolutePosition: { x: 0, y: 30 },
                                },
                            ]
                        };
                    },
                    header: function(currentPage, pageCount, pageSize) {
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
                            text:  'EXPEDIENTE: ' + this.noExpediente,
                            style: 'nuc'
                        },
                        '\n\n\n',
                        {
                            text: titulodoc,
                            style: 'titulo'
                        },
                        '\n\n',
                        {
                            text:  textoprincipal,
                            style: 'texto'
                        },
                        '\n\n',
                        {
                            text: 'DATOS GENERALES',
                            style: 'subtitulo'
                        },
                        '\n',
                        {
                            style: 'table',
                            table: {
                                headerRows: 1,
                                widths: ['*'],
                                body: [
                                    [bodyDataSolicitantes],
                                ]
                            },
                            layout: 'noBorders'
                        },
                        {
                            style: 'table',
                            table: {
                                headerRows: 1,
                                widths: ['*'],
                                body: [

                                    [bodyDataRequeridos],

                                ]
                            },
                            layout: 'noBorders'
                        },
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
                                        { text: 'Requeridos(s).', fontSize: 12, bold: true, alignment: 'center'}
                                    ],
                                    [bodyDataSolicitantesLineal, bodyDataRequeridosLineal],
                                ]
                            },
                            layout: 'noBorders'
                        },
                        '\n\n\n\n\n',
                        {
                            text: '\n\n' + pdf_usuario + '\n' + pdf_puesto,
                            style: 'ampo'
                        },
                        '\n\n\n\n\n',
                        {
                            text: 'LICENCIADO EN DERECHO ' + contactoDSP + '\n' + 'DIRECTOR OPERATIVO DEL '+ nombreDSP,
                            style: 'ampo'
                        },
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
                            color: 'white'
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
            mostrarpdf() {    
                console.log('v_requeridos:')
                console.log(this.v_requeridosL)
                console.log('v_solicitantes:')
                console.log(this.v_solicitantesR)  
                console.log(`conjuntos: ${this.conjuntos.length} \n conjuntosV: ${this.conjuntosV.length}`)
                if (this.conjuntos.length == 0 && this.conjuntosV.length == 0) { 
                    this.SCon = 'SC'
                }
                console.log(`Scon: ${this.SCon} \n v_statusconclusion: ${this.v_statusconclusion} \n v_tipopago: ${this.v_tipopago} \n v_cantidadmonto: ${this.v_cantidadmonto} \n v_fechacelebracion: ${this.v_fechacelebracion} \n v_horacelebracion: ${this.v_horacelebracion} \n metodoutilizado: ${this.metodoUtilizado} \n solicitantesL: ${this.v_solicitantesL}`)
                if (this.SCon != ''
                && this.v_statusconclusion != '' 
                && this.v_tipopago != ''
                && this.v_fechacelebracion != ''
                && this.v_horacelebracion != ''
                && this.metodoUtilizado != ''
                && (this.v_cantidadmonto != 0 || this.v_especie != '')) {                    
                    this.v_solicitantesL = " ";
                    for(var i = 0; i < this.v_solicitantesAR.length; i++) {
                        if (this.v_solicitantesL === " ") { 
                            this.v_solicitantesL = this.v_solicitantesAR[i].nombreCompleto;
                        } else {
                            this.v_solicitantesL = this.v_solicitantesL + ", " + this.v_solicitantesAR[i].nombreCompleto;
                        }
                    }
                    this.v_requeridosL = " ";
                    for(var i = 0; i < this.v_requeridosAR.length; i++) {
                        if (this.v_requeridosL === " ") {
                            this.v_requeridosL = this.v_requeridosAR[i].nombreCompleto;
                        } else {
                            this.v_requeridosL = this.v_requeridosL + ", " + this.v_requeridosAR[i].nombreCompleto;
                        }
                    }
                    // modificar
                    this.v_delitosL = " ";
                    for(var i = 0; i < this.v_delitos.length; i++) {
                        if (this.v_delitosL === " ") {
                            this.v_delitosL = this.v_delitos[i].nombreDelito
                        } else {
                            this.v_delitosL = this.v_delitosL + ", " + this.v_delitos[i].nombreDelito
                        }
                    }
                    this.listarSeguimiento();
                    var dd = this.crearPdfConDatos();
                    var pdfMake = require('pdfmake/build/pdfmake.js')
                    var htmlToPdfmake = require("html-to-pdfmake");
    
                    if (pdfMake.vfs == undefined) {
                        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                        pdfMake.vfs = pdfFonts.vfs;
                    }
                    var doc = pdfMake.createPdf(dd);
                    var f = document.getElementById('iframepdfAR1');
                    var callback = function(url) { f.setAttribute('src',url); }
                    doc.getDataUrl(callback, doc);                    
                    this.modal_AR1 = true;
                }else{
                    this.$notify("Rellene los campos solicitados", 'error')
                }                                
            },
            listarSolicitantesRequeridos(SolReq)
            {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/ListarSolicitantesRequeridos/' + me.envioId + '/' + SolReq, configuracion).then(function (response) {                     
                    if (SolReq == "Requerido") {
                        console.log(`desde aqui el requerido: ${response.data[0].nombreCompleto}`)
                        console.log(`la variable requeridosL: ${me.v_requeridosL}`)
                        me.v_requeridos = response.data;
                        if(me.v_requeridosL == undefined) me.v_requeridosL = ''
                        me.v_requeridosL = me.v_requeridosL == '' ? response.data[0].nombreCompleto : `${me.v_requeridosL};${response.data[0].nombreCompleto}`
                    } else {
                        me.v_solicitantes = response.data;                            
                        me.v_solicitantesR += me.v_solicitantesR == '' ? response.data[0].nombreCompleto : `;${response.data[0].nombreCompleto}`
                    }
                    console.log(`después de cargar: ${me.v_requeridosL}`)
                }).catch(function(error) {
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
            listardelitos () {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var arrayDelito = [];
                me.$justiciarestaurativa.get('api/Delitoes/ListarDelitos/' + me.envioId, configuracion).then(function(response) {
                    me.v_delitos = response.data;
                }).catch(function(error) {
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
            listardireccionSol (persona) {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var dia = moment(persona.fechaNacimiento).format("DD");
                var mes = moment(persona.fechaNacimiento).format('MMMM');
                var año= moment(persona.fechaNacimiento).format("YYYY");
                var fechaNac = dia + " de " + mes  + " del " + año

                if (persona.seleccion == true) {                               
                    if (persona.edad < 18) {
                        axios.all([
                            me.$cat.get('api/RAPs/ListarDP/'+ persona.personaId, configuracion),
                            me.$justiciarestaurativa.get('api/Responsablejrs/SelectIdPersona/'+ persona.personaId, configuracion)
                        ]).then(responseArr => {
                            me.v_direccion = (responseArr[0].data.calle + " " + responseArr[0].data.noint + " " + responseArr[0].data.noext + " " + responseArr[0].data.localidad
                            + " " + responseArr[0].data.municipio + " " + responseArr[0].data.estado + " " + responseArr[0].data.pais + " " + responseArr[0].data.cp);
                            var rdia = moment(responseArr[1].data.fechaNacimiento).format("DD");
                            var rmes = moment(responseArr[1].data.fechaNacimiento).format('MMMM');
                            var raño= moment(responseArr[1].data.fechaNacimiento).format("YYYY");
                            me.v_solicitantesAR.push({
                                personaId: persona.personaId,
                                nombreCompleto: persona.nombreCompleto,
                                direccion: me.v_direccion,
                                nacionalidad: persona.nacionalidad,
                                entidadFederativa: persona.entidadFederativa,
                                edad: persona.edad,
                                curp : persona.curp,
                                fechaNacimiento: fechaNac,
                                estadoCivil: persona.estadoCivil,
                                nivelEstudio: persona.nivelEstudio,
                                docIdentificacion: persona.docIdentificacion,
                                ocupacion: persona.ocupacion,
                                rnombre: responseArr[1].data.nombreCompleto,
                                rnacionalidad: responseArr[1].data.nacionalidad,
                                rcurp: responseArr[1].data.curp,
                                redad: responseArr[1].data.edad,
                                ridresponsable: responseArr[1].data.idResponsable,
                                rfechanaciomiento: rdia + " de " + rmes  + " del " + raño,
                            });
                        }).catch(function(error) {
                            me.$notify('Error al intentar leer los datos de la persona seleccionada !!!', 'error')
                        });
                    } else {                    
                        me.$cat.get('api/RAPs/ListarDP/'+ persona.personaId, configuracion).then(function(response) {
                            debugger
                            me.v_direccion = (response.data.calle + " " + response.data.noint + " " +response.data.noext + " " + response.data.localidad + " " 
                            + response.data.municipio + " " + response.data.estado + " " + response.data.pais + " " + response.data.cp);
                            me.v_solicitantesAR.push({
                                personaId: persona.personaId,
                                nombreCompleto: persona.nombreCompleto,
                                direccion: me.v_direccion,
                                nacionalidad: persona.nacionalidad,
                                entidadFederativa: persona.entidadFederativa,
                                edad: persona.edad,
                                curp : persona.curp,
                                fechaNacimiento: fechaNac,
                                estadoCivil: persona.estadoCivil,
                                nivelEstudio: persona.nivelEstudio,
                                docIdentificacion: persona.docIdentificacion,
                                ocupacion: persona.ocupacion,
                            });                        
                        }).catch(function(error) {
                            me.$notify('Error al intentar leer los datos de la persona seleccionada !!!','error')
                        });
                    }
                } else {
                    for(var i = 0; i < me.v_solicitantesAR.length; i++) {
                        if (me.v_solicitantesAR[i].personaId == persona.personaId) {
                            me.v_solicitantesAR.splice(i, 1);
                        }
                    }
                }
            },
            listardireccionReq (persona) {
                let me = this;
                let header = { "Authorization" : "Bearer " + this.$store.state.token };
                let configuracion = { headers : header };
                var check = moment(persona.fechaNacimiento, 'DD/MM/YYYY');                
                var month = check.format('MMMM');
                var day   = check.format('D');
                var year  = check.format('YYYY');                

                /* var dia = moment(persona.fechaNacimiento).format("DD");
                var mes = moment(persona.fechaNacimiento).format('MMMM');
                var año= moment(persona.fechaNacimiento).format("YYYY"); */
                var fechaNac = day + " de " + month  + " del " + year
                if (persona.seleccion == true) {
                    if (persona.edad < 18) {
                        axios.all([
                            me.$cat.get('api/RAPs/ListarDP/' + persona.personaId, configuracion),
                            me.$justiciarestaurativa.get('api/Responsablejrs/SelectIdPersona/' + persona.personaId, configuracion)
                        ]).then(responseArr => {
                            me.v_direccion = (responseArr[0].data.calle + " " + responseArr[0].data.noint + " " + responseArr[0].data.noext + " " + 
                            responseArr[0].data.localidad + " " + responseArr[0].data.municipio + " " + responseArr[0].data.estado + " " + 
                            responseArr[0].data.pais + " " +responseArr[0].data.cp);
                            var rdia = moment(responseArr[1].data.fechaNacimiento).format("DD");
                            var rmes = moment(responseArr[1].data.fechaNacimiento).format('MMMM');
                            var raño= moment(responseArr[1].data.fechaNacimiento).format("YYYY");
                            me.v_requeridosAR.push({
                                personaId: persona.personaId,
                                nombreCompleto: persona.nombreCompleto,
                                direccion: me.v_direccion,
                                nacionalidad: persona.nacionalidad,
                                entidadFederativa: persona.entidadFederativa,
                                edad: persona.edad,
                                curp : persona.curp,
                                fechaNacimiento: fechaNac,
                                estadoCivil: persona.estadoCivil,
                                nivelEstudio: persona.nivelEstudio,
                                docIdentificacion: persona.docIdentificacion,
                                ocupacion: persona.ocupacion,
                                rnombre: responseArr[1].data.nombreCompleto,
                                rnacionalidad: responseArr[1].data.nacionalidad,
                                rcurp: responseArr[1].data.curp,
                                redad: responseArr[1].data.edad,
                                ridresponsable: responseArr[1].data.idResponsable,
                                rfechanaciomiento: rdia + " de " + rmes  + " del " + raño,
                            });
                        }).catch(function(error) {
                            me.$notify('Error al intentar leer los datos de la persona seleccionada !!!', 'error')
                        });
                    } else {
                        me.$cat.get('api/RAPs/ListarDP/'+ persona.personaId, configuracion).then(function(response) {
                            me.v_direccion = (response.data.calle + " " +response.data.noint + " " +response.data.noext   + " " + response.data.localidad + " " 
                            + response.data.municipio + " " + response.data.estado + " " + response.data.pais + " " + response.data.cp);
                            me.v_requeridosAR.push({
                                personaId: persona.personaId,
                                nombreCompleto: persona.nombreCompleto,
                                direccion: me.v_direccion,
                                nacionalidad: persona.nacionalidad,
                                entidadFederativa: persona.entidadFederativa,
                                edad: persona.edad,
                                curp : persona.curp,
                                fechaNacimiento: fechaNac,
                                estadoCivil: persona.estadoCivil,
                                nivelEstudio: persona.nivelEstudio,
                                docIdentificacion: persona.docIdentificacion,
                                ocupacion: persona.ocupacion,
                            });
                        }).catch(function(error) {
                            me.$notify('Error al intentar leer los datos de la persona seleccionada xx!!!', 'error')
                        });
                    }
                } else {
                    for(var i = 0; i < me.v_requeridosAR.length; i++) {
                        if (me.v_requeridosAR[i].personaId == persona.personaId) {
                            me.v_requeridosAR.splice(i, 1);
                        }
                    }
                }
            },
        },
    }
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
  text-align: left;
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
