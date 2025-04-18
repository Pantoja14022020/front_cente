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
                <v-toolbar-title class="font-weight-regular" >Expediente.</v-toolbar-title>

                <v-divider class="mx-2" inset vertical></v-divider>

                <v-spacer></v-spacer>

                <v-spacer></v-spacer>
                <v-flex xs12 sm6 md3> 

                    <!-- Caja de texto para ver el numero de expediente -->
                    <v-text-field 
                        class="font-weight-regular" 
                        v-model="noExpediente"
                        disabled     
                        prepend-icon="folder"
                        filled
                    ></v-text-field>

                </v-flex>

                <!-- Boton para cerrar expediente -->
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }"> 
                        <v-btn 
                            class="mx-2" 
                            lot="activator" 
                            v-on="on" 
                            @click="cerrarexpediente" 
                            fab dark small 
                            color="primary">
                            <v-icon dark>close</v-icon>
                        </v-btn>

                    </template>
                    <span>Cerrar carpeta</span>
                </v-tooltip>

                <!-- Boton para ver reseña breve y dentro de el poder imprimir la entrevista inicial -->
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            class="mx-2"
                            slot="activator"
                            v-on="on"
                            @click="ModalResena()"
                            fab
                            dark
                            small
                            color="grey"
                        >
                        <v-icon dark>menu_book</v-icon>
                        </v-btn>
                    </template>
                    <span>Reseña breve</span>
                </v-tooltip>

                <!-- Boton para ver los involucrados en el expediente -->
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            class="mx-2"
                            slot="activator"
                            v-on="on"
                            @click="listarConjuntosPSR()"
                            fab
                            dark
                            small
                            color="grey"
                        >
                        <v-icon dark>group</v-icon>
                        </v-btn>
                    </template>
                    <span>Ver los involucrados en el expediente</span>
                </v-tooltip>

                <!-- Modal para ver la reseña breve y poder imprimir la entrevista -->
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
     
                <!-- Vista al seguimiento del pago, puede ser parcializado o solo uno -->
                <v-dialog   v-model="detallesSeguimiento"  fullscreen hide-overlay transition="dialog-bottom-transition">      
                    <v-card>
                        <v-toolbar card dark color="grey lighten-4 primary--text">
                            <v-avatar  size="30">
                                <v-icon class="grey lighten-2">rate_review</v-icon>
                            </v-avatar> 
                            <v-toolbar-title class="subheading">Detalles del acuerdo reparatorio</v-toolbar-title>
                            <v-spacer></v-spacer> 
                        </v-toolbar>

                        <v-card-text>
                            <v-form ref="form">

                                <v-toolbar flat color="white"> 
                                    <v-toolbar-title class="font-weight-regular body-1 mx-2" >Status actual del acuerdo reparatorio:   </v-toolbar-title>  
                                                        
                                    <v-text-field class="font-weight-regular"
                                                v-model="v_infoStatusAR" disabled
                                                filled
                                    ></v-text-field>
                                </v-toolbar>

                                <v-data-table
                                    :headers="headersS"
                                    :items="seguimientos"
                                    :search="search" 
                                    :rows-per-page-items="rowsPerPageItems"
                                    :pagination.sync="pagination"
                                    >
                                    
                                    <template slot="items" class="white" slot-scope="props">
                                        
                                        <td>{{ props.item.noParcialidad }}</td>  
                                        <td>{{ formatearfechahora(props.item.fecha) }}</td>
                                        <td>
                                            <div  v-if="props.item.fechaProrroga!== null">
                                                <a class="font-weight-black">{{ formatearfecha(props.item.fechaProrroga)}}</a>
                                            </div>
                                        </td>  
                                        <td>{{ props.item.cantidadAPagar}}</td>   
                                        <td>{{ props.item.tipoPago }}</td>  
                                        <td>{{ props.item.objectoEspecie }}</td>   
                                        <td>{{ props.item.statusPago }}</td> 
                                        <td class="justify-center layout px-0">    
                                        </td> 
                                        <td>
                                            <template v-if="props.item.statusPago=='Pendiente'">
                                                <v-icon
                                                color="default" 
                                                >
                                                remove
                                                </v-icon>
                                            </template>
                                            <template v-if="props.item.statusPago=='Pagado'">
                                                <v-icon
                                                color="success"
                                                >
                                                check_circle
                                                </v-icon>
                                            </template> 
                                            <template v-if="props.item.statusPago=='Anticipado'">
                                                <v-icon
                                                color="success"
                                                >
                                                check_circle
                                                </v-icon>
                                            </template> 
                                            <template v-if="props.item.statusPago=='No pagado'">
                                                <v-icon
                                                color="error"
                                                >
                                                cancel
                                                </v-icon>
                                            </template>
                                                <template v-if="props.item.statusPago=='Prorroga'">
                                                <v-icon
                                                color="warning"
                                                >
                                                timelapse
                                                </v-icon>
                                            </template> 
                                        </td>
                                    </template>
                                    <template slot="no-data">
                                    <v-btn color="primary"  @click="listarNew" >Cargar</v-btn>
                                    </template>
                                </v-data-table> 

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn   @click="limpiarSegumiento()" >Cerrar</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card-text> 
                    </v-card> 
                </v-dialog> 

                <!-- Modal para ver las personas involucradas en el expediente -->
                <v-dialog v-model="dialogodetalle" max-width="1000px">
                    <v-card>
                        <v-toolbar card dark color="grey lighten-4 primary--text">
                                <v-avatar  size="30">
                                    <v-icon class="grey lighten-2">refresh</v-icon>
                                </v-avatar>
                        <v-toolbar-title class="subheading">Personas involucradas en el expediente</v-toolbar-title>
                        <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-card-text>
                            <v-form ref="form">
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm12 md12>
                                            <v-data-table
                                                :headers="headersSR"
                                                :items="personaSR"
                                                :rows-per-page-items="rowsPerPageItems"
                                                :pagination.sync="pagination">
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
                                    </v-layout>
                                </v-container>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn  @click.native="dialogodetalle=false" >Cerrar</v-btn>
                                </v-card-actions>
                            </v-form> 
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-toolbar>

            <!-- Vista general  -->
            <v-card>

                
                <v-flex  xs12 md12 lg12 pa-4>
                        
                    <!-- Inicia informacion general del expediente -->
                    <h3>Información general del expediente</h3>
                    <v-divider ></v-divider>
                    <br>
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
                    <!-- Finaliza informacion general del expediente -->

                    <v-divider></v-divider>  

                    <!-- Tabla de los conjuntos que tienen acuerdo reparatorio, en caso de no haber conjuto, solo muestra un solo registro de acuerdo reparatorio -->
                    <v-data-table
                        :headers="headerc"
                        :items="conjuntoderivacionesSeguimiento"
                        :search="search" 
                        :rows-per-page-items="rowsPerPageItems"
                        :pagination.sync="pagination"
                        return-object  >
                        
                        <template slot="items" class="white" slot-scope="props">
                            
                            <td >{{ props.index + 1 }}</td>
                            <td >{{ props.item.nombreS}}</td>
                            <td >{{ props.item.nombreR}}</td>
                            <td >{{ props.item.nombreD}}</td> 

                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }" >
                                        <v-icon
                                            class="mr-2" v-on="on" color="default"
                                            @click="verDetallesSeguimiento(props.item.acuerdoReparatorioId,props.item.nombreS,props.item.nombreR,props.item.conjuntoDerivacionesId)"
                                            >
                                            rate_review
                                        </v-icon>
                                    </template>
                                    <span>Ver seguimiento del acuerdo</span>
                                </v-tooltip>
                        
                        </template>
                        <template slot="no-data">
                        <v-btn color="primary"  @click="listarNew" >Recargar</v-btn>
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
             //**************************************
            
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

            headersS: [ 
                { text: 'No parcialidad', value: 'noParcialidad' }, 
                { text: 'Fecha', value: 'fecha' },
                { text: 'Prorroga', value: 'fechaProrroga' }, 
                { text: 'Cantidad a pagar', value: 'cantidadAPagar' },
                { text: 'Tipo de pago', value: 'tipoPago' },
                { text: 'Objeto especie', value: 'objectoEspecie' }, 
                { text: 'Status', value: 'statusPago' },    
                { text: 'Opciones', value: 'opciones', sortable: false }, 
                { text: ' ', value: ' ' },   
                                            
            ],
             search: '',
             rowsPerPageItems: [10, 20, 30, 40, 50],
             pagination: {
                 rowsPerPage: 20
             },
              //**************************************
              // VARIABLES PARA LA INFORMAICON DEL ESPEDIENTE
             rHechoId:'',
             envioId:'',
             expedienteId:'', 
             noExpediente:'',
             noDerivacion:'',
             fechaExpediente:'',
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
             narrativa:'',
             statusInforme:'',
             ArraySolReql: [],
             v_delitos: [],
             arrayDelito: [],
             //************************************** 
             modalNarrativa:false,
             ResenaBreve: false,
             ModalSolReque: false,
             modal_Delito: false,
             ModalDelitos: false,
             personaSR: [],
             
             //*********************************************** */
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
             Delitos: '',
   
 
             //*********************************************** */
             direccionAgenciaqe:'',
             telefonosAgenciaqe:'',
 
             direccionAgencia: '',
             telefonosAgencia: '',
 
             //Variables para elistar personas menores de edad 
             ModalMenores: false,
             modalresponsable: false,
             menores: [],
             editedIndex: -1,
             rnombre:'',
             rnacionalidad:'',
             rcurp:'',
             redad:'',
             rfechanaciomiento:'',
             ridresponsable:'',
             headersM: [
                         { text: 'No.', value: 'index', align: 'center'},
                         { text: 'Nombre del menor', value: 'NombreCompleto', align: 'center'},
                         { text: 'Tipo', value: 'Tipo', align: 'center'},
                         { text: 'Opciones', value: 'opciones', align: 'center'},
            ], 
            headerc: [
               { text: 'Conjunto', value: 'conjunto' },
               { text: 'Solicitantes', value: 'solicitantes' },
               { text: 'Requeridos', value: 'requeridos' },
               { text: 'Delito', value: 'Delito' },
               { text: 'Opciones', value: 'opciones', sortable: false },
           ],
            
            distritoId:'',
            conjuntoderivacionesSeguimiento:[], 
            detallesSeguimiento:false,
            dialogodetalle:false,
            v_infoStatusAR:'',
            seguimientos:[], 
            conjuntoId:'',
            acuerdoreparatorioid2:'',

            v_requeridosL:'',
            v_requeridosR:[], 
         
            v_solicitantesL:'',
            v_solicitantesR:[],
 
         };
     },
  
     created () { 
             let me = this    
             me.expedienteId =  me.$store.state.idExpediente ;
             me.envioId = me.$store.state.idEnvio;
             me.noExpediente = me.$store.state.noExpediente;

             //Distrito que se esta buscando
             me.distritoId =  me.$store.state.distritoId;

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
                     me.$alert('Notificación', 'Aun no ha abierto ninguna expediente. En este momento sera redireccionado al menu correspondiente.', 
                     function(){  
                         if (me.u_rol == 'Facilitador' || me.u_rol=="Notificador")
                         {
                             me.$router.push('./jr-monitoreoxdistrito') 
                         }
                         else
                         {
                             me.$router.push('./jr-monitoreoxdistrito') 
                         }
                          
                     })
             }
             else{
                     me.$notify('Expediente abierto correctamente !!!','success') 
                     
                     //*********************************************** */ 
                     me.envioId= me.$store.state.idEnvio;
                     me.expedienteId= me.$store.state.idExpediente;
                     me.noExpediente= me.$store.state.noExpediente;
                     //Distrito que se esta buscando
                     me.distritoId =  me.$store.state.distritoId;
                     //*********************************************** */ 

                     //Apis que se lanzan al inicar la vista
                     me.listarLogo();
                     me.informacionExpedienteNew();
                     me.entrevistaInicialNuc();
                     me.listarNew();
 
 
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
      return this.$store.drawer 
    }
     },
     watch: {
         
     },
     methods:{ 
        //Listar los logos que seran utilizados en el pdf de la entrevista inicial
        listarLogo()
        {
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
        //INICIAN APIS PARA OBTENER INFORMACION ENTRE DISTRITOS
        //Funcion para listar el conjunto de la derivacion y en caso de no haber conjunto muestra en un solo conjunto todas las personas
        listarConjuntosPSR()
        {
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.personaSR = [];
            me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/ListarSolicitantesRequeridosCXDistrito/'+ me.distritoId+ '/' +  me.envioId  , configuracion).then(function(response)
            {
                //Consiciona la forma en que se guardas el respose data, ya que cada uno es para que liste correectamente, esto pasa por la forma en que retirna la api
                if (response.data.length > 0 && response.data[0].validacion === "verdadero")
                {
                me.personaSR=response.data;
                }
                else
                { 
                me.personaSR.push(response.data);
                }

                //Se activa el dialog para ver el m odal de los involucrados
                me.dialogodetalle = true;

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
        //Funcion que contiene las apis para mostrar los conjuntos que tengan acuerdos reparatorios
        listarNew(){
            let me = this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.conjuntoderivacionesSeguimiento = [];

            me.$justiciarestaurativa.get('api/SeguimientoCumplimientoes/ObtenerExistenciaConjuntoXDistrito/'+me.envioId + '/' + me.distritoId, configuracion).then(function(response){ 

                if (response.data.noHayAR != 1)
                { 
                    var existeNoExisteConjunto = response.data.conjuntoDerivacionesId;
                
                    //En caso de recibir el valor estatico de la inexistencia del conjunto se guarda de esta manera, pues retorna un objeto
                    if(existeNoExisteConjunto == '00000000-0000-0000-0000-000000000000'){
                        me.conjuntoderivacionesSeguimiento.push(response.data);
                    }
                    //De esta otra forma retorna los valore en forma de tolist y se guarda de esta manera
                    else
                    {
                        me.conjuntoderivacionesSeguimiento=response.data;
                    }
                }
                else
                {
                     me.$alert('Notificación', 'Este expediente no ha realizado ningun acuerdo reparatorio',).set('labels', {ok:'Ok'});
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
        //Lista el seguimiento del acuerdo reparatorio
        verDetallesSeguimiento(acuerdoreparatorioid,nombres,nombrer,conjuntoDerivacionesId){
            let me = this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            //Limpio los valores del response data para que no afecte los iconos
            me.seguimientos = [];
            //Se guarda el id de conjunto para listar las personas de eew conjunto, si no hay, se pone el id de 0s y asi lista todas las personas del envio
            me.conjuntoId =conjuntoDerivacionesId;

            //Almaceno el valor del id del acuerdo en una variable global para poder usarla en cualquier parte
            me.acuerdoreparatorioid2 = acuerdoreparatorioid;
            

            //Dependiendo el acuerdo ya generado mostrara el seguimiento del mismo
            me.$justiciarestaurativa.get('api/SeguimientoCumplimientoes/ListarSeguimientoXDistrito/'+   me.acuerdoreparatorioid2 + '/' + me.distritoId, configuracion).then(function(response){ 

               //Response para mostrar en tabla
               me.seguimientos=response.data;

               //Habilitar la ventana que emerge
               me.detallesSeguimiento = true;

               //Llama a la funcion de informaion del acuerdo en general
               me.listarAcuerdoReparatorio(me.acuerdoreparatorioid2);

               //Asignar valores a las variables de los solicitantes y requeridos, ya que se guardaran tanto en las tablas y se mostrara en los PDF
                me.v_solicitantesL= nombres;  
                me.v_solicitantesR =me.v_solicitantesL.split(", ");
                me.v_requeridosL=nombrer;
                me.v_requeridosR =me.v_requeridosL.split(", ");

                //Tambien requiero evaluar el numero de parcialidades del seguimiento para en paso de pagar este ultimo el estatus cambie automatiamente a Cumplido
                me.ultimoNum = response.data.length;

                me.listarpersonas(me.conjuntoId);

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
        //Se crean dos nuevas funciones para remplazar la forma en que se obtiene la informacion del expediente asi como el de la entrevista
        //Funcion para abtraer informacion del expediente
        informacionExpedienteNew()
        {
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

            me.$justiciarestaurativa.get('api/Envios/InformacionExpedienteXDistrito/'+ me.expedienteId + "/" + me.envioId + "/" + me.distritoId, configuracion).then(function(response)
            {
            
                //Se guardan en variables especificas, en caso de requerir mas datos revisar response de la api en consola
                me.noDerivacion = response.data.noDerivacion;
                me.fechaExpediente= response.data.fechaRegistroExpediente ;
                me.fechaHoraSuceso=response.data.fechaHoraSuceso;
                me.nuc=response.data.nuc;
                me.StatusGeneral=response.data.statusGeneral;
                me.EspontaneoNoEspontaneo=response.data.espontaneoNoEspontaneo;
                me.primeraVezSubsecuente=response.data.primeraVezSubsecuente;
                me.NoSolicitantes=response.data.noSolicitantes;
                me.uqe_Agencia=response.data.uqe_Agencia;
                me.uqe_Modulo=response.data.uqe_Modulo;
                me.uqe_Nombre=response.data.uqe_Nombre;
                me.uqe_Puesto=response.data.uqe_Puesto;
                me.reseñaBreve=response.data.reseñaBreve;
                me.narrativa= response.data.narracionHechos;
                me.statusInforme=response.data.informacionStatus;
            
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
        //Funcion para abtraer informacion de la entrevista inicial
        entrevistaInicialNuc()
        {
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

            //Se hace la conexion a back de CAT y dependiendo el distrito se busca la informacion de la entrevista
            me.$cat.get('api/AmpDecs/ListarEntrevistaInicialXDistrito/' + me.rHechoId + "/" + me.distritoId, configuracion).then(function(response)
            {
            
                //Cada una de estos if anidados son para construir el pdf de la entrevista
                if(response.data.tipo == 1)
                {

                    me.texto  = "Lugar:" + response.data.uSubproc+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    'Fecha:' + response.data.fechaS+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "Hora:"+ response.data.horaS+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "Unidad de Investigación:"+ response.data.uModulo+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "Agente del Ministerio Público:"+ response.data.usuario+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"

                    me.texto2 = "<p style="+me.comilla+"text-align:center"+me.comilla+"><b>PROTESTA DE LEY</b></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"

                    me.texto2 += "El (La) agente del Ministerio Público con fundamento en lo establecido por el artículo 49 del Código Nacional de Procedimientos Penales, protesta al C."+response.data.nombrePersona+ " para conducirse con verdad y le advierte que podrá imponerse de tres meses a dos años de prisión a quien se conduzca con falsedad ante una autoridad en ejercicio de sus funciones, conforme a lo previsto por el artículo 313 del Código Penal del estado de Hidalgo, a lo anterior manifiesta: que si se conducirá con verdad."+
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
                    response.data.manifestacion+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "A continuación, el compareciente hace del conocimiento de esta Representación social los siguientes hechos:"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    response.data.hechos+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello."  
                    me.tipo2 = 1


                }
                else if(response.data.tipo == 2)
                {

                    me.tipo2 = 2
                                    
                        
                    me.texto  =  "<p style="+me.comilla+"text-align:center"+me.comilla+"><u>COMPARECENCIA DE PERSONA INVESTIGADA</u></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "En la ciudad de "+me.u_distrito+", Hidalgo, siendo las "+response.data.horaS+", "+ response.data.fechaS+
                    ", el Agente del Ministerio Público "+response.data.usuario+", desahoga la declaración indagatoria"+
                    "a cargo del C. "+response.data.nombrePersona+", a quien previamente se le hizo saber los derechos que en su favor"+
                    "confiere la Constitución Política de los Estados Unidos Mexicanos y Código Nacional de"+
                    "procedimientos Penales y se le entregó la correspondiente acta de lectura de derechos. Una vez"+
                    "enterado de esos derechos, y del contenido de la carpeta de investigación se le da oportunidad de"+
                    "entrevistarse en privado con su abogado defensor "+response.data.representante+", hecho lo anterior por sus datos"+
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
                    response.data.manifestacion+
                    ", siendo todo lo que deseo manifestar. En uso de la voz el defensor"+response.data.representante+", "+
                    response.data.hechos+ 
                    "previa lectura, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello."


                } 
                else if(response.data.tipo == 3)
                {
                    me.tipo2 = 3

                    me.texto  = "Lugar:" + response.data.uSubproc+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    'Fecha:' + response.data.fechaS+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "Hora:"+ response.data.horaS+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "Unidad de Investigación:"+ response.data.uModulo+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "Agente del Ministerio Público:"+ response.data.usuario+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"

                    me.texto2  =  "<p style="+me.comilla+"text-align:center"+me.comilla+">EXHORTA/INFORMA</p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "El(La) agente del Ministerio Público con fundamento en lo establecido por el artículo 49 del Código Nacional de Procedimientos Penales, exhorta/informa al menor de iniciales "+ response.data.iniciales+ " para que se conduzca con verdad en lo que manifieste en su entrevista y se le explica que de conducirse con falsedad incurrirá en una conducta tipificada como delito en la ley penal y se hará acreedor a una medida de conformidad con las disposiciones aplicables, a lo anterior manifiesta: que si se conducirá con verdad."+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "A continuación, se recaban los datos generales del(la) menor, que de conformidad con el artículo 20 apartado C fracción V de la Constitución Política de los Estados Unidos Mexicanos y 109 fracción XXVI del Código Nacional de Procedimientos Penales quedan reservados."+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "Una vez que se le hicieron saber a "+response.data.iniciales+ " los derechos que le otorga la Constitución Política de los Estados Unidos Mexicanos, el Código Nacional de Procedimientos Penales, la Ley Nacional Del Sistema Integral De Justicia para Adolescentes y la Ley General de los Derechos de Niñas, Niños y Adolescentes se le entregó la correspondiente acta."+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p style="+me.comilla+"text-align:center"+me.comilla+">FACULTAD DE ABSTENCIÓN</p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "De igual forma se le hace saber que conforme a lo establecido en el artículo 361 del Código Nacional de Procedimientos Penales, podrá <b>abstenerse de declarar</b>, si es tutor, curador, pupilo, cónyuge, concubina o concubinario, conviviente del imputado, o si ha vivido en forma permanente con él durante al menos dos años anteriores al hecho, de ser pariente por consanguinidad en la línea recta ascendente o descendente hasta el cuarto grado y en colateral por consanguinidad hasta el segundo grado inclusive, salvo que fuera denunciante. Pero si acepta rendir su testimonio NO podrán negarse a contestar las preguntas que esta autoridad le formule. A lo que manifestó:"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    response.data.manifestacion+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "En relación a lo hechos el(la) menor de identidad reservada de iniciales "+ response.data.iniciales +"<u>, MANIFESTÓ:</u>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    response.data.hechos+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello."


                } 
                else if(response.data.tipo == 4)
                {

                    me.tipo2 = 4

                    me.texto  =  ""+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "En la ciudad de "+ response.data.uDistrito + ", Hidalgo, siendo las" + response.data.horas + ", "+ response.data.fechaS +  ", el Agente del Ministerio Público "+ response.data.usuario +
                    ", desahoga la declaración del adolescente " + response.data.nombrePersona + ", quien se encuentra acompañado "+ response.data.acompañantev + ", quien en este momento se identifican con "+
                    response.data.tidentificacion + " con número de " + response.data.noIdentificacion + " las que portan fotografía a color y coinciden con los rasgos fisionómicos, mismas que les son devueltas por serles de su utilidad dejando en su lugar copias simples, así mismo exhiben acta de nacimiento/"+response.data.curpa+
                    " la cual se les devuelve por serles de utilidad dejando en su lugar copias simple para que se agregue a la presente carpeta; adolescente a quien previamente se le hizo saber los derechos que prevé en su favor el artículo 20 apartado B de la Constitución Política de los Estados Unidos Mexicanos; 35, 36, 37, 38, 39, 40, 41, 42, 43, 44 y 45 de la ley Nacional del Sistema Integral de Justicia Penal para adolescentes, así como 113 y 115 del Código Nacional de Procedimientos Penales y se le entregó la correspondiente acta de lectura de derechos. Manifestó quedar debidamente enterado. En este acto se permite que se entreviste en privado con su Defensor(a)."+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "A continuación, se recaban los datos generales del(la) adolescente, que de conformidad con el artículo 20 apartado B de la Constitución Política de los Estados Unidos Mexicanos; 35 y 36 de la ley Nacional del Sistema Integral de Justicia Penal para adolescentes quedan reservados."+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "En relación a los hechos la persona investigada MANIFESTÓ:"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    response.data.manifesto+
                    " siendo todo lo que deseo manifestar. En uso de la voz el defensor " + response.data.representante +
                    ", previa lectura, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello."


                }
                else if((response.data.tipo == 5))
                {

                    me.texto  = "Lugar:" + response.data.USubproc+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    'Fecha:' + response.data.fechaS+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "Hora:"+ response.data.horaS+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "Unidad de Investigación:"+ response.data.uModulo+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "Agente del Ministerio Público:"+ response.data.usuario+
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
                    response.data.manifestacion+
                    "Así mismo se le informa que en términos del artículo 360 del Código Nacional de Procedimientos Penales, no está obligado a declarar sobre hechos por los que se le pueda fincar responsabilidad penal."+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "A continuación, el testigo hace del conocimiento de esta Representación social los siguientes hechos:" + 
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    response.data.hechos+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "<p class="+me.comilla+"ql-align-justify"+me.comilla+"><br></p>"+
                    "Previa lectura que dio a su entrevista, firman al margen los intervinientes que así quisieron hacerlo, los que no, se asienta razón de ello."

                        
                    me.tipo2 = 5

                }

                //Variables para el llenado de informacion de la persona que se le realiza la entrevista
                me.representantesf = response.data.tRepresentantes
                me.personaf = response.data.nombrePersona
                me.inicialesf = response.data.iniciales

                me.acvictima = response.data.parentezcoV
                me.acnombre = response.data.acompañantev
                me.psimenor = response.data.vNombre
                me.puestopsi = response.data.vPuesto

                me.numerooficio = response.data.numerooficio
                me.clasificacionPersona= response.data.clasificacionP
                me.nombre = response.data.nombrePersona
                me.alias= response.data.alias
                me.tipopersona= response.data.tipoP
                me.curp= response.data.curp
                me.docIdentificacion= response.data.docIdentificacion
                me.nacionalidad= response.data.nacionalidad
                me.tel = response.data.tel
                me.email = response.data.email
                me.genero= response.data.genero
                me.sexo = response.data.sexo
                me.fechaNacimiento = response.data.fechaNacimiento
                me.medionotificacion= response.data.medionotificacion
                me.ocupacion= response.data.ocupacion
                me.nivelestudio= response.data.nivelestudio
                me.religion= response.data.religion
                me.lengua= response.data.lengua
                me.estadocivil= response.data.estadocivil
                me.tipodiscapacidad = response.data.tipodiscapacidad
                me.direccionpersonal = response.data.direccionP
                me.edad = response.data.edad
            
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
        //FINALIZAN APIS PARA OBTENER INFORMACION ENTRE DISTRITOS
        
        //Funcion para imprimir la entrevista
        imprimirEntrevistapdf()
        {

            let me=this; 
            var dd = me.downloadPdf(me.uqe_Nombre,me.uqe_Puesto,me.uqe_Agencia);
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

            if (pdfMake.vfs == undefined){
                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                pdfMake.vfs = pdfFonts.pdfMake.vfs; 
            }

            var doc = pdfMake.createPdf(dd).print();
            
        },
        //De la manop con el constructor de dicho pdf de la entrevista
        downloadPdf(nombre,puesto,agencia) 
        {

            debugger
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

            if (pdfMake.vfs == undefined){
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.pdfMake.vfs; 
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
                            //{ 
                            //    image: logo2,
                            //    width: 50,  
                            //    absolutePosition: {x: 495, y: 30},
                            //},
                                                    
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

                    //----------------------------------------------------------------------------
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


                    //----------------------------------------------------------------

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

                    //---------------------------------------------------------------

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
        //Meramente es pora mostrar una fecha
        formatearfechahora: function(fecha)
        {
            return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
        }, 
        //cierra el expediente, limpia las varibles mas importantes y redirecciona al monitoreo
        cerrarexpediente () 
        { 
            this.$store.state.idExpediente= null; 
            this.$store.state.idEnvio = null;
            this.$store.state.noExpediente =null;
            this.$store.state.tipoModulo=null;
            this.editedIndex = -1;
            

            this.$router.push('./monitoreoxdistrito') 
            
        },
        //Limpia y desactiva el modal del seguimiento de los pagos del acuerdo
        limpiarSegumiento(){
            this.detallesSeguimiento=false;
            this.statusPago="";
            this.editedIndex=-1;
            this.acuerdoreparatorioid2="";
        },  
        //Funcion para activar el modal que muestra la reseña breve, misma que te da en el mismo bmodal la opcion de imprimir la entrevista
        ModalResena()
        {
            let me = this;
            me.ResenaBreve = true;
        }, 
     } 
 }
 </script>
  