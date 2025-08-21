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
        <!-- Bloque de modulos de manejo de errores -->
        <n401 v-if="e401" />
        <n403 v-if="e403" />
        <!-- Contenido principal de la vista -->
        <v-flex v-if="showpage">
            <!-- Header de la vista de seguimiento -->
            <v-toolbar flat color="white">
                <v-toolbar-title class="font-weight-regular" >Seguimiento a cumplimiento.</v-toolbar-title>            
                <v-divider class="mx-2" inset vertical></v-divider>            
                <v-spacer></v-spacer>
                <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                <v-spacer></v-spacer> 
                <v-flex xs12 sm6 md3> 
                    <v-text-field class="font-weight-regular" v-model="noExpediente" disabled prepend-icon="folder" filled ></v-text-field>                                                
                </v-flex>
                <!-- Bloque de botones para manejo del expediente -->
                <v-tooltip bottom>
                        <template v-slot:activator="{ on }"> 
                            <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="cerrarexpediente" fab dark small color="primary">
                                <v-icon class="mt-1" dark>close</v-icon>
                            </v-btn>
                        </template>
                        <span>Cerrar expediente</span>
                </v-tooltip>
                <v-tooltip bottom  v-if="v_statusAR==1">
                        <template v-slot:activator="{ on }"> 
                            <v-btn class="mx-2" slot="activator" v-on="on" @click.native="modal_addSAR=true" fab dark small color="warning">
                                <v-icon dark>verified_user</v-icon>
                            </v-btn>
                        </template>
                        <span>Status general del Acuerdo Reparatorio</span>
                </v-tooltip>              
            </v-toolbar>
            <!-- Vista a los conjunto, en caso de no haber solo muestra como si existiera 1 -->
            <v-data-table
                :headers="headerc"
                :items="conjuntoderivacionesSeguimiento"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                return-object  >                
                <template slot="items" class="white" slot-scope="props">                     
                    <td >{{ props.index + 1 }}</td>
                    <td >{{ props.item.nombreS.replace(";",",")}}</td>
                    <td >{{ props.item.nombreR.replace(";",",")}}</td>
                    <td >{{ props.item.nombreD}}</td> 
                    <td>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }" >
                                <v-icon
                                    class="mr-2" v-on="on" color="default"
                                    @click="verDetallesSeguimiento(props.item.acuerdoReparatorioId,props.item.nombreS,props.item.nombreR,props.item.conjuntoDerivacionesId, props.item.nombreD)"
                                    >
                                    rate_review
                                </v-icon>
                            </template>
                            <span>Ver seguimiento del acuerdo</span>
                        </v-tooltip>                   
                    </td>
                </template>
                <!-- Botón de recarga de los conjuntos con acuerdo -->
                <template slot="no-data">
                <v-btn color="primary"  @click="listarNew" >Cargar</v-btn>
                </template>                                                                                                
            </v-data-table> 
        </v-flex>
        <!-- Vista al seguimiento del pago, puede ser parcializado o solo uno -->
        <v-dialog   v-model="detallesSeguimiento"  fullscreen hide-overlay transition="dialog-bottom-transition">      
            <v-card>
                <!-- Fragmento de título -->
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">rate_review</v-icon>
                    </v-avatar> 
                    <v-toolbar-title class="subheading">Detalles del acuerdo reparatorio</v-toolbar-title>
                    <v-spacer></v-spacer> 
                </v-toolbar>
                <!-- Fragmento para mostrar los detalles del acuerdo -->
                <v-card-text>
                    <v-form ref="form">
                        <!-- Header de estatus y delito del conjunto -->
                        <v-layout>
                            <v-toolbar flat color="white"> 
                                <v-toolbar-title class="font-weight-regular body-1 mx-2" >Status actual del acuerdo reparatorio:   </v-toolbar-title>  
                                                    
                                <v-text-field class="font-weight-regular"
                                            v-model="v_infoStatusAR" disabled
                                            filled
                                ></v-text-field>
                            </v-toolbar>
                            <v-toolbar flat color="white"> 
                                <v-toolbar-title class="font-weight-regular body-1 mx-2" >Delito(s):   </v-toolbar-title>  
                                                    
                                <v-text-field class="font-weight-regular"
                                            v-model="v_delitos" disabled
                                            filled
                                ></v-text-field>
                            </v-toolbar>
                        </v-layout>
                        <!-- Header del o los tipos de pago -->
                        <v-toolbar flat color="white"> 
                            <v-toolbar-title class="font-weight-regular body-1 mx-2" >Tipo de pago:   </v-toolbar-title>  
                                                
                            <v-text-field class="font-weight-regular"
                                        v-model="statusConclusion" disabled
                                        filled
                            ></v-text-field>
                        </v-toolbar>
                        <!-- Tabla de muestreo de los registros de seguimiento -->
                        <v-data-table
                            :headers="headers"
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
                                <!-- Bloque de acciones para el pago del acuerdo -->
                                <td class="justify-center align-center layout px-0">                                 
                                    <v-tooltip bottom>
                                        <template v-if="props.item.statusPago=='Pagado'||props.item.statusPago=='No pagado'||props.item.statusPago=='Anticipado'||props.item.statusPago=='No pagado'" v-slot:activator="{ on }">
                                            <v-icon class="mr-2" v-on="on" color="warning" @click="imprimir(props.item)">print</v-icon> 
                                        </template>
                                        <span>Imprimir registro</span>
                                    </v-tooltip>    
                                    <v-tooltip bottom   >
                                        <template  v-if="existsAttached == false && (props.item.statusPago=='No pagado'|| props.item.statusPago=='Pendiente'||props.item.statusPago=='Prorroga'||props.item.statusPago=='No pagado')" v-slot:activator="{ on }">
                                            <v-icon class="mr-2" v-on="on" color="default" @click="editar(props.item)">edit</v-icon> 
                                        </template>
                                        <span>Editar registro</span>
                                    </v-tooltip>    
                                </td> 
                                <!-- Icono de estatus del pago -->
                                <td>
                                    <template v-if="props.item.statusPago=='Pendiente'">
                                        <v-icon color="default">remove</v-icon>
                                    </template>
                                    <template v-if="props.item.statusPago=='Pagado'">
                                        <v-icon color="success" @click="activarDesactivarMostrar(2,props.item)">check_circle</v-icon>
                                    </template> 
                                    <template v-if="props.item.statusPago=='Anticipado'">
                                        <v-icon color="success" @click="activarDesactivarMostrar(2,props.item)">check_circle</v-icon>
                                    </template> 
                                    <template v-if="props.item.statusPago=='No pagado'">
                                        <v-icon color="error" @click="activarDesactivarMostrar(2,props.item)">cancel</v-icon>
                                    </template>
                                        <template v-if="props.item.statusPago=='Prorroga'">
                                        <v-icon color="warning" @click="activarDesactivarMostrar(2,props.item)">timelapse</v-icon>
                                    </template> 
                                </td>
                            </template>
                            <template slot="no-data">
                            <v-btn color="primary"  @click="verDetallesSeguimiento()" >Cargar</v-btn>
                            </template>
                        </v-data-table> 
                        <!-- Botón de cierre del modal -->
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn   @click="limpiarSegumiento()" >Cerrar</v-btn>
                        </v-card-actions>
                        <!-- Descripción del tipo de pago para el anexo -->
                        <v-toolbar flat color="white" v-if="existsAttached && seguimientos.length > 0"> 
                            <v-toolbar-title class="font-weight-regular body-1 mx-2" v-if="existsAttached">Tipo de pago:   </v-toolbar-title>                                               
                            <v-text-field class="font-weight-regular"
                                        v-model="statusConclusionA" disabled
                                        filled
                                        v-if="existsAttached"
                            ></v-text-field>
                        </v-toolbar>
                        <!-- Bloque de muestreo de los registros del acuerdo -->
                        <v-layout mt-3 v-if="seguimientos.length > 0">
                            <v-expansion-panel elevation-0 mx-auto align-center justify-center>
                                <v-expansion-panel-content class="blue-grey lighten-5" elevatio-0 v-for="(it,i) in Annexes" :key="i" @click.native="listFollowupA(it, i)" align-center justify-center v-model="panelStates[i]">
                                    <template v-slot:header>
                                        <h2 style="font-size:1.5rem; font-weight: 100 ;">Anexo {{ i +1 }}</h2>
                                    </template>
                                    <v-flex xl12 lg12 md12 sm12 xs12>
                                        <v-card elevation="0">
                                            <!-- Tabla de muestreo de los registros de los anexos creados para el acuerdo -->
                                            <v-data-table :headers="headers" :items="seguimientosAnexo">
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
                                                    <!-- Acciones de impresión o edición de los anexos -->
                                                    <td class="justify-center layout px-0"> 
                                                        <v-tooltip bottom>
                                                            <template v-if="props.item.statusPago=='Pagado'||props.item.statusPago=='No pagado'||props.item.statusPago=='Anticipado'" v-slot:activator="{ on }">
                                                                <v-icon class="mr-2 mt-2" v-on="on" color="warning" @click="imprimir(props.item)">print</v-icon> 
                                                            </template>
                                                            <span>Imprimir registro</span>
                                                        </v-tooltip>    
                                                        <v-tooltip bottom>
                                                            <template  v-if="it.statusAnexo != false && (props.item.statusPago=='No pagado'|| props.item.statusPago=='Pendiente'||props.item.statusPago=='Prorroga')" v-slot:activator="{ on }">
                                                                <v-icon class="mr-2 mt-2" v-on="on" color="default" @click="editar(props.item)">edit</v-icon> 
                                                            </template>
                                                            <span>Editar registro</span>
                                                        </v-tooltip>    
                                                    </td> 
                                                    <!-- Icono de status del pago del anexo -->
                                                    <td>
                                                        <template v-if="props.item.statusPago=='Pendiente'">
                                                            <v-icon ncolor="default">remove</v-icon>
                                                        </template>
                                                        <template v-if="props.item.statusPago=='Pagado'">
                                                            <v-icon color="success" @click="activarDesactivarMostrar(2,props.item)">check_circle</v-icon>
                                                        </template> 
                                                        <template v-if="props.item.statusPago=='Anticipado'">
                                                            <v-icon color="success"@click="activarDesactivarMostrar(2,props.item)">check_circle</v-icon>
                                                        </template> 
                                                        <template v-if="props.item.statusPago=='No pagado'">
                                                            <v-icon color="error" @click="activarDesactivarMostrar(2,props.item)">cancel</v-icon>
                                                        </template>
                                                        <template v-if="props.item.statusPago=='Prorroga'">
                                                            <v-icon color="warning" @click="activarDesactivarMostrar(2,props.item)">timelapse</v-icon>
                                                        </template> 
                                                    </td>
                                                </template>
                                            </v-data-table>                    
                                        </v-card>
                                    </v-flex>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-layout>
                    </v-form>
                </v-card-text> 
            </v-card> 
        </v-dialog> 
        <!-- Vista al editar el seguimiento del acuerdo-->
        <v-dialog v-model="modalInfo"  fullscreen hide-overlay transition="dialog-bottom-transition"> 
            <v-card>
                <!-- Header la vista del seguimiento -->
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Seguimiento a cumplimiento.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn  color=success text @click="procesar()">{{ btntitulo}}</v-btn>
                        <v-btn icon   @click="modalInfo = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <!-- Contenido central de la vista -->
                <v-card-text>
                    <v-form ref="form">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <h3>No de expediente: {{ this.noExpediente}}</h3>                                
                                    <v-radio-group v-model="statusPago" @change="cargartexto"    :mandatory="false">
                                        <v-radio label="Se realizo el pago correspondiente." color="success" value="Pagado"></v-radio>
                                        <v-radio label="Reunión de modificación y revisión de acuerdo" color="success" value="No pagado"></v-radio>                                     
                                        <v-radio label="Pago anticipado" color="success" value="Anticipado"></v-radio> 
                                    </v-radio-group>
                                    <v-divider ></v-divider>
                                    <v-list two-line v-if="statusPago!==''">
                                        <v-list-tile>
                                            <v-list-tile-action>
                                                <v-icon color="warning">assignment</v-icon>
                                            </v-list-tile-action>                            
                                            <v-list-tile-content> 
                                                <v-list-tile-title>{{ asunto}}</v-list-tile-title> 
                                            </v-list-tile-content>                            
                                            <v-list-tile-action>
                                                <v-icon>check</v-icon>
                                            </v-list-tile-action>
                                        </v-list-tile>                                        
                                    </v-list>
                                    <!-- Bloque de formulario en caso de seleccionar Prorroga -->
                                    <div v-if="statusPago=='Prorroga'">
                                        <v-menu
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
                                            <v-btn text color="primary" @click="v_menuP = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="$refs.v_menuP.save(formatearfecha(v_fechaP))">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </div>
                                    <!-- Bloque de formulario en caso de selecciona Modificación y revisión -->
                                    <div v-if="statusPago=='No pagado'">
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
                                                    label="Fecha de cita:"
                                                    prepend-icon="event"
                                                    name="fecha de cita"
                                                    v-validate="'required'" 
                                                    :error-messages="errors.collect('fecha de cita')" 
                                                    readonly
                                                    v-on="on"
                                                ></v-text-field>
                                                </template>
                                                <v-date-picker v-model="v_fechac" no-title scrollable>
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="v_menu1 = false">Cancel</v-btn>
                                                <v-btn text color="primary" @click="$refs.v_menu1.save(formatearfecha(v_fechac))">OK</v-btn>
                                                </v-date-picker>
                                            </v-menu>
                                            <v-menu
                                                ref="v_menu3"
                                                v-model="v_menu3"
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
                                                    label="Hora de cita:"
                                                    prepend-icon="access_time"
                                                    readonly
                                                    v-validate="'required'" 
                                                    :error-messages="errors.collect('hora')"
                                                    v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-time-picker
                                                    v-if="v_menu3"
                                                    v-model="v_horacita"
                                                    full-width
                                                    @click:minute="$refs.v_menu3.save(v_horacita)"
                                                    
                                                >
                                                
                                                </v-time-picker>
                                            </v-menu>
                                            <v-text-field name="lugar de la cita" 
                                                label="Lugar de la cita:" 
                                                v-model="v_lugarcita"   
                                                v-validate="'required'" 
                                                :error-messages="errors.collect('lugar de la cita')"> 
                                            </v-text-field>                                    
                                            <br>
                                            <v-tooltip bottom>
                                                    <template  v-slot:activator="{ on }">  
                                                        <v-btn slot="activator" v-on="on" @click.native="generartexto"   absolute dark small fab bootom right color="primary"                                >
                                                        <v-icon>waves</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>Generar documento</span>
                                            </v-tooltip>
                                            <br>
                                    </div>                                            
                                    <!-- Espacio de edición de texto del cuerpo de archivo de registro -->
                                    <vue-editor  
                                        v-if="showveditor" 
                                        outline  height=320px;
                                        :editorToolbar="customToolbar" 
                                        v-model="texto"  style="max-height: 310px; overflow-y: scroll">
                                    </vue-editor>                                        
                                </v-flex>
                            </v-layout>
                        </v-container>                        
                    </v-form>                
                </v-card-text> 
            </v-card>
        </v-dialog>
        <!--Modal que muestra el PDF -->
        <v-dialog v-model="modal_citatorio" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- Bloque de acciones del modal -->
                    <v-toolbar-items>
                        <v-btn color=success text @click.native="guardar()">
                            Guardar e imprimir
                        </v-btn>
                        <v-btn icon @click="modal_citatorio= false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <!-- Espacio de muestro de la vista -->
                <v-card-text>
                    <iframe id="iframePDFCitatorio" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no"  ></iframe>
                </v-card-text>
            </v-card>
        </v-dialog>     
    </v-layout> 
</template>
<script>  
    import axios from 'axios'     
    //** COMPONENTES */
    import n401 from '../../components/m_jr/401'
    import n403 from '../../components/m_jr/403' 
    import moment from 'moment'
    import 'moment/locale/es';
    import alertify from 'alertifyjs';
    import { VueEditor } from "vue2-editor";       
    import { generarQRCodeBase64 } from './crearQR';
export default {
    //* Componentes de error
    components: {  
        n401,
        n403,
        "vue2-editor": VueEditor ,        
    },
    //* Variables globales
    data: function () {
        return {
            //* Estados iniciales de componente importados
            e401:false, 
            e403: false,
            //* Variables de información general de vistas 
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
            headerc: [
               { text: 'Conjunto', value: 'conjunto' },
               { text: 'Solicitantes', value: 'solicitantes' },
               { text: 'Requeridos', value: 'requeridos' },
               { text: 'Delito', value: 'Delito' },
               { text: 'Opciones', value: 'opciones', sortable: false },
            ],
            headerAttached: [
                { text: 'No. Anexo', value: 'Anexo' }
            ],
            search: '',
            rowsPerPageItems: [10, 20, 30, 40, 50],
            pagination: {
                rowsPerPage: 50
            },
            logo1 :'',
            logo2: '',
            //* Variables de información general de cuenta del usuario y expediente
            direccionAgencia:'',
            telefonosAgencia:'', 
            nombreAgencia:'',            
            envioId:'',
            seguimientos: [], 
            noExpediente:'',
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
            //* Variables de información del seguimiento              
            panelStates: [],
            seguimientosAnexo: [],
            seguimientosPendientes: null,
            conjuntoderivacionesSeguimiento:[], 
            v_fechaAcuerdo:'',
            v_idAcuerdoReparatorio:'',
            v_infoStatusAR:'',
            statusConclusion:'',
            statusConclusionA:'',
            v_idSeguimientoCumplimiento:'',
            statusPago:'',
            asunto:'',
            texto:'',                        
            modalInfo:false,
            modal_citatorio:false,                           
            v_personas: [],
            v_nombresRevision: '' ,
            v_persona:'',            
            v_requeridosL:'',
            v_requeridosR:[],             
            v_cantidadAPagar:'',                         
            v_solicitantesL:'',
            v_solicitantesR:[],
            v_menu1: false, 
            v_fechacita:'',
            v_fechac:'',
            v_menu3: false, 
            v_horacita:'',
            v_direccion:'',
            v_lugarcita:'SALA DE MEDIACIÓN  NÚMERO I (Agregar dirección de la sede correspondiente)',
            v_sesionId:'',
            v_menuP:false,
            v_fechaP:'',
            v_fechaProrroga:'',            
            v_menu4:false,
            v_horacitaC:'',            
            vartitulo:1,
            un_modulo:'',
            un_puesto:'',
            un_nombre:'',
            un_idModulo:'',
            v_statusPeriodo:100,
            v_statusAR:0,            
            v_tipospagos:['Dinero', 'Especie', 'Respeto'],
            v_tipopago:'',
            v_cantidadmonto:0,
            v_especie:'',
            v_showCant:false,
            v_showEspecie: false,
            v_delitos: '',             
            v_fechaPago:'',
            v_fechaPa:'',            
            noparcialidad:'',
            v_montoTotal:0,
            v_TotalParcialidades:0,            
            v_statusFinal:["Cumplido","Incumplido"],
            v_SF:'',
            v_requeridos: [],
            v_solicitantes: [],
            detallesSeguimiento: false,
            existsAttached: false,
            Annexes: [] ,
            acuerdoreparatorioid2:'',
            ultimoNum: 0,
            parcialidadPagar:0,
            conjuntoId:'',
            idSesionCNP: '',        
            objetoEspecie: '',
            tipoEspecie: false,
            texto: 'Vista Previa',
            qrCode: null,
            docRemision: 'Remisión',
            vistaPreviaTF: true,
            nuc: '',
            //* Variables de manejo de vistas
            editedIndex: -1,
            modal_addSAR: false,
            v_menuPa: false, 
            modal_addSC: false, 
            showveditor:false, 
        };
    },
    computed: {               
        btntitulo () {
            return this.vartitulo == "0" ? 'Guardar' : 'Vista previa'
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
        modalInfo (val) { 
            val || this.close()
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
           
        me.expedienteId= me.$store.state.idExpediente;
        me.u_rol=me.$store.state.usuario.rol;
        
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
                }
            )
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
            me.envioId= me.$store.state.idEnvio; 
            me.noExpediente= me.$store.state.noExpediente;                    
    
            //Nuevo listado de conjuntos y cuando no hay conjuntos
            me.listarNew();
            //Se listan logos para PDFs
            me.listarLogo();
            //Se lista la direccion del Centro de JR
            me.informacionagencia();
            //Se lista el notificador para los pdf
            me.listarnotificador();                                                                                                 
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
    mounted() {        
    },
    methods: {
        //*********************************************************************************************************************************** */
        //* Funciones para datos globales
        //*********************************************************************************************************************************** */
        //API para listar logos
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
        //Funcion para corroborar la ultima sesion de un acuerdo, si no sigue en proceso
        //Esto para para los pagos que no se realizan, se crea una sesion, y que pasa con esa sesion, no tiene que estar "En proceso"
        listarUltimaSesion(){
            let me= this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            
            me.$justiciarestaurativa.get('api/Sesions/ObtenerUltimaSeseion/'+ me.envioId + '/' + me.conjuntoId
            , configuracion).then(function(response){ 
                if (response.data.notSesion  != 1)
                { 
                    //No uso esta variable, la dejo por si a futuro a alguien le funciona
                    me.v_sesionId = response.data.idSesion; 

                    //Guardo el valor del estatus de la ultima sesion en una variable locval pues solo la ocupo aqui
                    var statuSesion = response.data.statusSesion;

                    //En caso de que la sesion siga en proceso, se da 
                    if(statuSesion == 'En proceso')
                    {
                        alert("No puedes actualizar la parcialidad de este pago ya que tienes una sesion en proceso que debes concluir");

                        me.$router.push('./sesiones') 
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
        //Tal cual lo dice, cierra el expediente
        cerrarexpediente () { 
            this.$store.state.idExpediente= null; 
            this.$store.state.idEnvio = null;
            this.$store.state.noExpediente =null;
            this.$store.state.tipoModulo=null;
            
            if (this.u_rol == 'Facilitador' || this.u_rol=="Notificador")
            {
                this.$router.push('./misexpedientes') 
            }
            else
            {
                this.$router.push('./expedientesaceptados') 
            } 
        }, 
        //*********************************************************************************************************************************** */
        //* Funciones para manejo de datos de los seguimientos
        //*********************************************************************************************************************************** */
        //Nuevo listado de acuerdos reparatorios, si hay conjunto lista aquellos que tienen un acuerdo reparatorio, si no hay maneja todo como un solo conjunto
        //pero todo se guarda como habitualmente
        listarNew(){
            let me = this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.conjuntoderivacionesSeguimiento = [];

            me.$justiciarestaurativa.get('api/SeguimientoCumplimientoes/ObtenerExistenciaConjunto/'+me.envioId, configuracion).then(function(response){ 

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
                     me.$alert('Notificación', 'No es posible dar seguimiento al acuerdo reparatorio ya que aún no se a celebrado ningún acuerdo',
                        function(){  
                             me.v_statusPeriodo=100; 
                                me.$router.push('./acuerdoreparatorio') 
                            }, 
                        ).set('labels', {ok:'Ok'});
                   
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
        verDetallesSeguimiento(acuerdoreparatorioid,nombres=this.conjuntoderivacionesSeguimiento.nombreS,nombrer = this.conjuntoderivacionesSeguimiento.nombreR,conjuntoDerivacionesId, delito){
            let me = this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion = { headers: header };            

            if (acuerdoreparatorioid == undefined && nombres == undefined && nombrer == undefined && conjuntoDerivacionesId == undefined && delito == undefined) {
                me.listAttached(me.acuerdoreparatorioid2)                
            } else {
                //Limpio los valores del response data para que no afecte los iconos
                me.seguimientos = [];
                //Se guarda el id de conjunto para listar las personas de eew conjunto, si no hay, se pone el id de 0s y asi lista todas las personas del envio
                me.conjuntoId =conjuntoDerivacionesId;
    
                //Almaceno el valor del id del acuerdo en una variable global para poder usarla en cualquier parte
                me.acuerdoreparatorioid2 = acuerdoreparatorioid;

                 //Se almacena el o los delitos para mostrarlos en la vista y tener un diferenciador del conjunto
                 var delitosArray = delito.split(';')
                me.v_delitos = ''
                    
                delitosArray.map(d => {
                    if (me.v_delitos == '') {
                        me.v_delitos += d  
                    }else{
                        me.v_delitos += `, ${d}`
                    }
                })                     
                me.listAttached(acuerdoreparatorioid)
            }



            //Dependiendo el acuerdo ya generado mostrara el seguimiento del mismo
            me.$justiciarestaurativa.get('api/SeguimientoCumplimientoes/ListarSeguimiento/'+   me.acuerdoreparatorioid2, configuracion).then(function(response){ 

                me.$justiciarestaurativa.get(`api/Sesions/ValidateSessionToA/${me.acuerdoreparatorioid2}`, configuracion)
                    .then(response2 => {                        
                        if (response2.data.status) {
                            me.$alert(
                                'Notificación', 'No puedes dar seguimiento debido a que existe una sesión de Modificación y revisión en proceso',
                                () => {
                                    me.$router.push('./sesiones')                                     
                                }
                            );
                            
                            me.detallesSeguimiento = false;
                        } else {
                            me.$justiciarestaurativa.get(`api/Sesions/ValidateSessionWA/${me.acuerdoreparatorioid2}`, configuracion)
                                .then((response3) => {                            
                                    if (response3.data.exists) {                                
                                        me.$justiciarestaurativa.get(`api/AcuerdoReparatorios/ExistsAN/${me.acuerdoreparatorioid2}`, configuracion)
                                        .then(response4 => {
                                            if (response4.data.status && response3.data.cantidad == response4.data.cantidad) {

                                                me.$justiciarestaurativa.get(`api/SeguimientoCumplimientoes/ValidateCJMMP/${me.acuerdoreparatorioid2}`, configuracion)
                                                    .then(response5 => {                                                        
                                                        if (response5.data.status) {
                                                            //Response para mostrar en tabla
                                                            me.seguimientos=response.data;
                                                            
                                                            //Habilitar la ventana que emerge
                                                            me.detallesSeguimiento = true;
                                                            
                                                            //Llama a la funcion de informaion del acuerdo en general
                                                            me.listarAcuerdoReparatorio(me.acuerdoreparatorioid2);
                                                            
                                                            //Asignar valores a las variables de los solicitantes y requeridos, ya que se guardaran tanto en las tablas y se mostrara en los PDF                                                            
                                                            me.v_solicitantesL = nombres;                                                             
                                                            me.v_solicitantesR =me.v_solicitantesL.split(", ");
                                                            me.v_requeridosL=nombrer;
                                                            me.v_requeridosR =me.v_requeridosL.split(", ");
                                                            
                                                            //Tambien requiero evaluar el numero de parcialidades del seguimiento para en paso de pagar este ultimo el estatus cambie automatiamente a Cumplido
                                                            me.ultimoNum = response.data.length;
                                                            
                                                            me.listarpersonas(me.conjuntoId);                                                                                                                                                                                
                                                        } else {
                                                            me.$alert(
                                                                'Notificación', 'No puedes dar seguimiento ya que el Anexo no ha sido autorizado por el Coordinador o Director',
                                                                () => {
                                                                    me.$router.push('./acuerdoreparatorio')
                                                                }                                  
                                                            );
                                                            
                                                            me.detallesSeguimiento = false;                                                                                                                                                    
                                                        }
                                                    })
                                            } else {
                                                me.$alert(
                                                    'Notificación', 'No puedes dar seguimiento debido a que no se ha celebrado el Anexo',
                                                    () => {
                                                        me.$router.push('./acuerdoreparatorio')
                                                    }                                  
                                                );
                                                
                                                me.detallesSeguimiento = false;                                                                                        
                                            }
                                        })
                                } else {
                                    //Response para mostrar en tabla
                                    me.seguimientos=response.data;
                                    
                                    //Habilitar la ventana que emerge
                                    me.detallesSeguimiento = true;
                                    
                                    //Llama a la funcion de informaion del acuerdo en general
                                    me.listarAcuerdoReparatorio(me.acuerdoreparatorioid2);
                                    
                                        //Asignar valores a las variables de los solicitantes y requeridos, ya que se guardaran tanto en las tablas y se mostrara en los PDF                                        
                                        me.v_solicitantesL = nombres;                                          
                                    me.v_solicitantesR =me.v_solicitantesL.split(", ");
                                    me.v_requeridosL=nombrer;
                                    me.v_requeridosR =me.v_requeridosL.split(", ");
                                    
                                    //Tambien requiero evaluar el numero de parcialidades del seguimiento para en paso de pagar este ultimo el estatus cambie automatiamente a Cumplido
                                    me.ultimoNum = response.data.length;
                                    
                                    me.listarpersonas(me.conjuntoId);                                                                    
                                }
                            })
                        }   
                    })


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
        //Se obstrae informacion general del acuerdo reparatorio, como se ve, el estatus, fecha de acuerdo y el id del acuerdo
        listarAcuerdoReparatorio(acuerdoreparatorioid){
            let me= this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

            me.$justiciarestaurativa.get('api/AcuerdoReparatorios/ListaARSeguimiento/'+ me.envioId + '/'+ acuerdoreparatorioid, configuracion).then(function(response){ 

                if (response.data.statusRespuestaCoordinadorJuridico != 'Autorizado')
                {
                    me.$alert('Notificación', 'No puedes dar seguimiento a este acuerdo ya que no ha sido autorizado por el Coordinador o Director');

                    me.detallesSeguimiento = false;
                }
                else{

                    //Este condicional ya no es necesario, pues hay un primer filtro que determina o no la existencia de un acuerdo reparatorio
                if (response.data.noHayAR != 1)
                //Pero se deja para mantener el funcionamiento de back y mantener el cacheo de errores
                {                     
                    me.v_nombresRevision = response.data.nombreRequerdio.replaceAll(';', ',')

                    var estatusC = JSON.parse(response.data.statusConclusion)

                    var formatoDirecto = ''

                    if (estatusC.Dinero && estatusC.Especie && estatusC.Respeto) {
                        formatoDirecto = `Dinero (${estatusC.Dinero}), Especie (${estatusC.Especie}) y Respeto`   
                    } else if (estatusC.Dinero && estatusC.Especie) {
                        formatoDirecto = `Dinero (${estatusC.Dinero}) y Especie (${estatusC.Especie})`   
                    } else if (estatusC.Dinero) {
                        formatoDirecto = `Dinero (${estatusC.Dinero})`
                    } else if(estatusC.Especie){
                        formatoDirecto = `Especie (${estatusC.Especie})`
                    } else {
                        formatoDirecto = `Respeto`
                    }


                    me.v_idAcuerdoReparatorio = response.data.idAcuerdoReparatorio; 
                    me.v_infoStatusAR=response.data.statusCumplimiento;
                    me.v_fechaAcuerdo=  me.formatearfechatexto(response.data.fechaCelebracionAcuerdo);
                    me.statusConclusion = formatoDirecto;                                        
                    me.v_TotalParcialidades= response.data.noTotalParcialidades;                    
                
                }
                else
                {
                     me.$alert('Notificación', 'No es posble dar seguimiento al acuerdo reptaratorio ya que aun no se  a celebrado ningún acuerdo',
                        function(){  
                             me.v_statusPeriodo=100; 
                                me.$router.push('./jr-acuerdoreparatorio') 
                            }, 
                        ).set('labels', {ok:'Ok'});
                   
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
        //Funcion para guardar, condicionado por cada uno de los estatus del pago
        guardar(){
  
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion = { headers: header }; 

            me.vistaPreviaTF = false

            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información.',function()
            {  
                //En caso de realizar el pago del seguimiento, es de uno por uno, o incluso puede ser el unico pago.    
                if (me.statusPago=="Pagado")
                {
                    //Se coloca la variable de fecha null ya que es el valor de la columna fechaHoraCita que solo es cuando se crea la cita en caso de incumplir un pago
                    var fecha=null;

                    me.$justiciarestaurativa.put('api/SeguimientoCumplimientoes/Actualizar',{   
                        'idSeguimientoCumplimiento': me.v_idSeguimientoCumplimiento,
                        'statusPago':me.statusPago,
                        'titulo':me.asunto, 
                        'dirigidoa': me.v_persona.text,
                        'direccion': me.v_direccion,  
                        'fechaHoraCita':  fecha, 
                        'solicitantes': me.v_solicitantesL,
                        'requeridos': me.v_requeridosL,
                        'texto': me.texto,
                        'uf_Distrito': me.u_distrito,
                        'uf_DirSubProc': me.u_dirSubPro,
                        'uf_Agencia': me.u_agencia,
                        'uf_Modulo': me.u_modulo,
                        'uf_Nombre': me.u_nombre,
                        'uf_Puesto': me.u_puesto,
                        
                        //************************************ */
                    }, configuracion).then(function(response){  
                        
                        //Genera el PDF en una ventana emergente                        
                        var dd = me.crearpdfSR();
                        var pdfMake = require('pdfmake/build/pdfmake.js')
                        var htmlToPdfmake = require("html-to-pdfmake");
                        
                        if (pdfMake.vfs == undefined){
                            var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                            pdfMake.vfs = pdfFonts.vfs; 
                        } 
                        
                        var doc = pdfMake.createPdf(dd).print(); 
                                                
                        if (me.existsAttached) {                                                                                                                                                    
                            let g = me.seguimientosAnexo.filter(c => c.statusPago !== 'Pagado')                                                    
                            if (g.length == 1 && (g[0].idSeguimientoCumplimiento == me.v_idSeguimientoCumplimiento)) {                                                                    
                                me.actualizarStatus();                                
                            }                                                        
                        } else {                                                                                                
                            let g = me.seguimientos.filter(c => c.statusPago !== 'Pagado')                            
                            
                            if (g.length == 1 && (g[0].idSeguimientoCumplimiento == me.v_idSeguimientoCumplimiento)) {                                                                    
                                me.actualizarStatus();
                            }                            
                        }
                                                
                        if (me.existsAttached) {                            
                            me.panelStates = me.panelStates.map(() => false)                            
                        }
                        //Limpia ciertas varias y desactiva el modal del PFD
                        me.close();
                        //Limpia ciertas variables, prorroga y ese tipo de cosas
                        me.limpiar();                        
                        
                        //Llama a la funcion para que lista los registros del seguimiento para se vea la accion del guardado
                        me.verDetallesSeguimiento(me.acuerdoreparatorioid2, me.v_solicitantesL, me.v_requeridosL, me.conjuntoId, me.v_delitos);                                

                        me.v_infoStatusAR = ''                                                                        

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
                }
                //En caso de NO realizar el pago
                else if (me.statusPago=="No pagado")
                {                     
                    let nombres = ""
                    let telefonos = ""
                    me.v_personas.map(person => {
                        if (person.valor3 == 'Imputado') {
                            if (nombres == "") {
                                nombres += `${person.text}`
                                telefonos += `${person.valor2}`
                            } else {
                                nombres += `, ${person.text}`
                                telefonos += `, ${person.valor2}`
                            }
                        }
                    })
                    me.v_persona = nombres                    
                    //Esta api busca los notificadores junto con su puesto
                    me.$controlacceso.get('api/Usuarios/ListarEnvio/'+  me.un_idModulo , configuracion).then(function(response2)
                    { 

                        //Retorno del nombre y puesto del Notificador
                        me.un_nombre=response2.data.nombre;
                        me.un_puesto = response2.data.puesto;                        
                        //Envio de post para la creacion de sesiones
                        me.$justiciarestaurativa.post('api/Sesions/CrearSC',
                        {   
                            'envioId': me.envioId,  
                            'moduloServicioId':   me.u_idmoduloservicio, 
                            //***************************** CITATORIOS*/      
                            'noExpediente': me.noExpediente,    
                            'fechaHoraCita': me.v_fechac + ' ' + me.v_horacita,  
                            'duracion': 120,
                            'lugarCita': me.v_lugarcita,
                            'dirigidoa_Nombre': nombres,
                            'dirigidoa_Direccion': me.v_direccion,  
                            'dirigidoa_Telefono': telefonos, 
                            'solicitadoPor': me.v_solicitantesL, 
                            'solicitadoPor_Telefono': "", 
                            'textooficio':me.texto,
                            'uf_Distrito': me.u_distrito,
                            'uf_DirSubProc':me.u_dirSubPro,
                            'uf_Agencia': me.u_agencia, 
                            'uf_Modulo': me.u_modulo, 
                            'uf_Nombre': me.u_nombre,   
                            'uf_Puesto': me.u_puesto, 
                            'un_Modulo': me.un_modulo, 
                            'un_Nombre': me.un_nombre,   
                            'un_Puesto': me.un_puesto,
                            'statusEntrega': 'En proceso',
                            'noCitatorio': 0,
                            'conjuntoId': me.conjuntoId

                            }, configuracion).then(function (response) {                               

                            //Si la api realiza su funcionamiento correctamente, guarda el valor de la sesion creada, en caso de no crearse simplmente la variabler no se usa
                            me.idSesionCNP = response.data.idsesion;

                            //En caso de encontrar ocupada la hora se notifica dicha situacion
                            if  (response.data.fhnd == 1)
                            {
                                me.$notify("La fecha y hora seleccionada ya no esta disponible para este facilitador",'error')  
                            }
                            //En caso de no haber problemas con las sesiones, se actualiza el estatus de cumplimiento
                            else
                            {                                
                                    //Put para el actualizado
                                    axios.put('api/SeguimientoCumplimientoes/Actualizar',{   
                                        'idSeguimientoCumplimiento': me.v_idSeguimientoCumplimiento,
                                        'statusPago': me.statusPago,
                                        'titulo':me.asunto, 
                                        'dirigidoa': nombres,
                                        'direccion': me.v_direccion,  
                                        'fechaHoraCita':  fecha,
                                        'solicitantes': me.v_solicitantesL,
                                        'requeridos': me.v_requeridosL,
                                        'texto': me.texto,
                                        'uf_Distrito': me.u_distrito,
                                        'uf_DirSubProc': me.u_dirSubPro,
                                        'uf_Agencia': me.u_agencia,
                                        'uf_Modulo': me.u_modulo,
                                        'uf_Nombre': me.u_nombre,
                                        'uf_Puesto': me.u_puesto,
                                    
                                    }, configuracion).then(function(response){ 
                                            
                                        //Se evalua la existencia de conjunto para este registro, y en caso de haberlo, se guarda en la tabla intermedia de SesionesConjunto
                                        if(me.conjuntoId != '00000000-0000-0000-0000-000000000000')
                                        {
                                            axios.post('api/Sesions/CrearSesionConjunto',
                                            {
                                                'sesionId': me.idSesionCNP,
                                                'ConjuntoDerivacionesId': me.conjuntoId
    
                                            },configuracion).then(function(response){
                                                //cierra el modal del PDF
                                                me.modal_citatorio=false,
                                                //Limpia ciertas varias y desactiva el modal del PFD
                                                me.close();
                                                //Limpia ciertas variables, prorroga y ese tipo de cosas
                                                me.limpiar();
                                                me.v_infoStatusAR = ''
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
                                        }
                                                                                
                                        //Una vez guardado se genera el PDF                
                                        var dd = me.crearpdfNSR();
                                        var pdfMake = require('pdfmake/build/pdfmake.js')
                                        var htmlToPdfmake = require("html-to-pdfmake");
    
                                        if (pdfMake.vfs == undefined){
                                            var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                                            pdfMake.vfs = pdfFonts.vfs; 
                                        } 
                                        var doc = pdfMake.createPdf(dd).print();                                             
                                        //Llama a la funcion para que lista los registros del seguimiento para se vea la accion del guardado
                                        //cierra el modal del PDF
                                        me.modal_citatorio=false,
                                        //Limpia ciertas varias y desactiva el modal del PFD
                                        me.close();
                                        //Limpia ciertas variables, prorroga y ese tipo de cosas
                                        me.limpiar();
                                        me.panelStates = me.panelStates.map(()=>false)
                                        me.verDetallesSeguimiento(me.acuerdoreparatorioid2,me.v_solicitantesL,me.v_requeridosL, me.conjuntoId, me.v_delitos);                                                                                                            
                                                    
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
                        
                
                    }, configuracion).catch(function(error){ 
                            me.$notify(error.message,'error')     
                    });
                            
                }
                //En caso de solicitar una prorroga
                else if (me.statusPago=="Prorroga")
                {
                    //se guarda solo la fecha de la prorroga como un datos informativo en la tabla del seguimiento
                    me.$justiciarestaurativa.put('api/SeguimientoCumplimientoes/ActualizarSP',{   
                        'idSeguimientoCumplimiento': me.v_idSeguimientoCumplimiento,
                        'statusPago':me.statusPago,
                        'fechaProrroga': me.v_fechaP,
                        'titulo':me.asunto, 
                            
                    }, configuracion).then(function(response){     
            
                        //Llama a la funcion para que lista los registros del seguimiento para se vea la accion del guardado
                        me.verDetallesSeguimiento(me.acuerdoreparatorioid2,me.v_solicitantesL,me.v_requeridosL, me.conjuntoId);
                        //Limpia ciertas varias y desactiva el modal del PFD
                        me.close();
                        //Limpia ciertas variables, prorroga y ese tipo de cosas
                        me.limpiar();
                

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
                }
                //En caso de ser un pago anticipado, se guardara el registro de pago de todo el seguimiento del expediente
                else if (me.statusPago=="Anticipado")
                {
                    if (me.existsAttached) {
                        for(var i=0;i<me.seguimientosAnexo.length;i++)
                        {
                            me.$justiciarestaurativa.put('api/SeguimientoCumplimientoes/Actualizar',{   
                            'idSeguimientoCumplimiento': me.seguimientosAnexo[i].idSeguimientoCumplimiento,
                            'statusPago':'Pagado',
                            'titulo':me.asunto, 
                            'dirigidoa': me.v_persona.text,
                            'direccion': me.v_direccion,  
                            'fechaHoraCita':  fecha,
                            'fechaProrroga': me.v_fechaP,
                            'solicitantes': me.v_solicitantesL,
                            'requeridos': me.v_requeridosL,
                            'texto': me.texto,
                            'uf_Distrito': me.u_distrito,
                            'uf_DirSubProc': me.u_dirSubPro,
                            'uf_Agencia': me.u_agencia,
                            'uf_Modulo': me.u_modulo,
                            'uf_Nombre': me.u_nombre,
                            'uf_Puesto': me.u_puesto,
                            
                            
                            }, configuracion).then(function(response){     
    
    
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
                        
                        }                        
                    } else {
                        //Actualiza cada registro del seguimiento de cumplimiento como pagado
                        for(var i=0;i<me.seguimientos.length;i++)
                        {
                            me.$justiciarestaurativa.put('api/SeguimientoCumplimientoes/Actualizar',{   
                            'idSeguimientoCumplimiento': me.seguimientos[i].idSeguimientoCumplimiento,
                            'statusPago':'Pagado',
                            'titulo':me.asunto, 
                            'dirigidoa': me.v_persona.text,
                            'direccion': me.v_direccion,  
                            'fechaHoraCita':  fecha,
                            'fechaProrroga': me.v_fechaP,
                            'solicitantes': me.v_solicitantesL,
                            'requeridos': me.v_requeridosL,
                            'texto': me.texto,
                            'uf_Distrito': me.u_distrito,
                            'uf_DirSubProc': me.u_dirSubPro,
                            'uf_Agencia': me.u_agencia,
                            'uf_Modulo': me.u_modulo,
                            'uf_Nombre': me.u_nombre,
                            'uf_Puesto': me.u_puesto,
                            
                            
                            }, configuracion).then(function(response){     
                                
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
                        }                        
                    }

                    //Limpia ciertas varias y desactiva el modal del PFD
                    me.close();
                    //Limpia ciertas variables, prorroga y ese tipo de cosas
                    me.limpiar();
                    me.v_infoStatusAR = ''
                    me.panelStates = me.panelStates.map(() => false)
                    //Por ser un pago anticipado llama a la funcion para Actualizar el estatus a Cumplido
                    me.actualizarStatus();
                }

            },
            function(){
                    alertify.warning('Verifica la información')
                }
            ).set('labels', {ok:'Guardar', cancel:'Cancelar'});

        },
        //Funcion para actualizar el estatus de Cumplido de manera automatica
        actualizarStatus(){

            let me = this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

            me.$justiciarestaurativa.put('api/AcuerdoReparatorios/ActualizarStatuscumplimineto',
                    {   
                        'idAcuerdo': me.acuerdoreparatorioid2,
                        'statusCumplimiento': 'Cumplido',
                                 
                    }, configuracion).then(function(response){    
                        if (me.existsAttached) {                            
                            me.panelStates = me.panelStates.map(() => false)                                           
                        }
                        //Limpia ciertas varias y desactiva el modal del PFD
                        me.close();
                        //Limpia ciertas variables, prorroga y ese tipo de cosas
                        me.limpiar();
                        
                        //Llama a la funcion para que lista los registros del seguimiento para se vea la accion del guardado
                        me.verDetallesSeguimiento(me.acuerdoreparatorioid2, me.v_solicitantesL, me.v_requeridosL, me.conjuntoId, me.v_delitos);                                

                        me.v_infoStatusAR = ''    

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
        //Funcion para listar personas para crearles su sesion, es conforme a conjunto pero i no hay trae todas las personas del envio
        listarpersonas(conjuntoId){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 

            var personasArray=[];

                axios.get('api/SolicitanteRequeridoes/ListarPersonasConSinConjunto/'+ me.envioId + '/' + conjuntoId, configuracion).then(function(response)
                { 
                    //Se guarda los datos de las personas 
                    personasArray=response.data;
                    me.v_personas = [];
                    //Recorre la respuesta para colocarlo en un combo
                    personasArray.map(function(x)
                    {
                        me.v_personas.push({
                            text: x.nombreCompleto, 
                            value: x.personaId, 
                            valor1: x.correo, 
                            valor2: x.telefono1 + ',' + x.telefono2, 
                            valor3: x.clasificacion, 
                            valor4: x.sexo, 
                            valor5: x.entidadFederativa, 
                            valor6: x.estadoCivil, 
                            valor7: x.fechaNacimiento, 
                            valor8: x.curp, 
                            valor9: x.nivelEstudio,
                            valor10: x.docIdentificacion, 
                            valor11: x.parentesco, 
                            valor12: moment(x.fechaNacimiento, 'DD/MM/YYYY')});   
                    }); 

                }).catch(function(error){
                    me.$notify(error.message,'error')    
                });     
        }, 
        //Funcion para listar la direccion de la persona que se citara por no realizar el pago correspondiente
        listardireccion(persona)
        {
            let me= this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};   

            var personaid= persona;
        
            //No hay mayor explicacion, api para retornar la direccion personal
            me.$cat.get('api/RAPs/ListarDP/'+ personaid, configuracion).then(function(response){ 
                    
                    me.v_direccion =(response.data.calle + " " +response.data.noint + " " +response.data.noext   + " " + response.data.localidad + " " +response.data.municipio + " " +response.data.estado + " " +response.data.pais + " " +response.data.cp);
            
            }).catch(function(error){
                me.$notify('Error al intentar leer los datos de la persona seleccionada !!!','error')    
            });

        }, 
        //Al igual que la api anterior, este solo lista informacion del notificador en caso de requerirlo por el incumpliento de un pago
        listarnotificador(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

            //No hay mayor explicacion, es bastente simple
            axios.get('api/AsignacionEnvios/ListarIdEnvio/'+ me.envioId, configuracion).then(function(response1){ 
                me.un_modulo=response1.data.un_Modulo;
                me.un_idModulo = response1.data.idModulo;  
                  
            }, configuracion).catch(function(error){ 
                    me.$notify(error.message,'error')     
            }); 
        },
        //Api para listar la direccion y telefonos del centro de JR con el que se este trabajando
        informacionagencia(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            
            me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia, configuracion).then(function(response){

                me.direccionAgencia = response.data.direccion;
                me.telefonosAgencia = response.data.telefono;
                me.nombreAgencia = response.data.nombreDirSub;

            }).catch(function(error){
                me.$notify('Error al intentar leer la informacion de agencia!!!','error')   
                });
        },         
        // Función encargada de obtener todos los anexos que pertenezcan al acuerdo reparatorio seleccionado
        listAttached(acuerdo) {
            let me= this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion = { headers: header };                      

            me.Annexes = []

            me.$justiciarestaurativa.get(`api/SeguimientoCumplimientoes/ListAttached/${acuerdo}`, configuracion)
                .then(response => {                    
                    if (response.data != null && response.data.length > 0) {
                        me.existsAttached = true
                        me.nuc = response.data[0].nuc
                        me.Annexes = response.data                           
                        me.v_nombresRevision = response.data.at(-1).nombreRequerdio.replaceAll(';', ',')
                    }
                })
        },
        // Función encargada de obtener todos los registros del seguimiento del anexo
        listFollowupA(acuerdo, panel) {            
            let me = this; 
            let header={"Authorization" : "Bearer " + me.$store.state.token};
            let configuracion = { headers: header };
            

            var estatusA = JSON.parse(acuerdo.statusConclusion)

            var formatoDirecto = ''

            if (estatusA.Dinero && estatusA.Especie) {
                formatoDirecto = `Dinero (${estatusA.Dinero}) y Especie (${estatusA.Especie}))`   
            } else if (estatusA.Dinero) {
                formatoDirecto = `Dinero (${estatusA.Dinero})`
            } else {
                formatoDirecto = `Especie (${estatusA.Especie})`
            }

            me.statusConclusionA = formatoDirecto               

            if (me.panelStates[panel] != false) {
                if (me.seguimientosAnexo = []) {
                    me.$justiciarestaurativa.get(`api/SeguimientoCumplimientoes/ListarSeguimiento/${acuerdo.idAcuerdoReparatorio}`, configuracion)
                        .then(response => {                    
                            me.seguimientosAnexo = response.data       
                            me.ultimoNum = response.data.length                             
                            me.panelStates[panel] = true
                        })                      
                }                                                                    
            }
            
        },
        //Funcion lanzada al querer editar un registro del seguimiento del acuerdo
        editar(item){
            let me = this;
            me.v_idSeguimientoCumplimiento = item.idSeguimientoCumplimiento;
            
            me.editedIndex=1;
            me.modalInfo = true;                        

            if (item.tipoPago == "Especie") {
                me.tipoEspecie = true
                me.objetoEspecie = item.objectoEspecie
            }

            //Guarda en una variable global la parcialidad que se esta pagando, para que posteriormente evaluarla y en caso de ser la ultima concluir el estatus de pago
            me.parcialidadPagar = item.noParcialidad;

            me.v_cantidadAPagar = item.cantidadAPagar;

            //Funcion para evaluar la ultima sesion, es decir se llego a un acuerdo
            me.listarUltimaSesion();

        },
        //Funcion para visualizar la vista previa del PDF
        vistaprevia(){
           debugger
            let me = this;
            this.$validator.validate().then(result => { 
                if (result) {  

                    me.vistaPreviaTF = true

                    if (me.statusPago=="Pagado") {
                        var dd = this.crearpdfSR();
                        var pdfMake = require('pdfmake/build/pdfmake.js')
                        var htmlToPdfmake = require("html-to-pdfmake");

                        if (pdfMake.vfs == undefined){
                            var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                            pdfMake.vfs = pdfFonts.vfs;                        
                        }

                        var doc = pdfMake.createPdf(dd);
                        var f = document.getElementById('iframePDFCitatorio'); 
                        var callback = function(url) { f.setAttribute('src',url); }
                        doc.getDataUrl(callback, doc);
                        this.modal_citatorio=true;
                    }

                    if (me.statusPago=="No pagado") {
                        var dd = this.crearpdfNSR();
                        var pdfMake = require('pdfmake/build/pdfmake.js')
                        var htmlToPdfmake = require("html-to-pdfmake");

                        if (pdfMake.vfs == undefined){
                            var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                            pdfMake.vfs = pdfFonts.vfs;                        
                        }
                        
                        var doc = pdfMake.createPdf(dd);
                        var f = document.getElementById('iframePDFCitatorio'); 
                        var callback = function(url) { f.setAttribute('src',url); }
                        doc.getDataUrl(callback, doc);
                        this.modal_citatorio=true;
                    }                                    
                }  
            })    
        },
        //Creacion de PDF, posterior a la vista previa cuando es pagado
        crearpdfSR(){                          
            var pdfMake = require('pdfmake/build/pdfmake.js');
            var htmlToPdfmake = require("html-to-pdfmake"); 
            let me = this
            //***************************************************************************** */
            // VARIABLES
            //***************************************************************************** */
            var logo1 = this.logo1;
            var logo2 = this.logo2; 
            var logo3 = this.logo3;
            var logo4 = this.logo4;
            var diragencia = this.direccionAgencia;
            var telagencia= this.telefonosAgencia;
            
            //***************************************************************************** */   
                 
            var pdf_distrito=this.u_distrito;
            var pdf_dirsubproc = this.u_dirSubPro;
            var pdf_agencia =this.u_agencia;
            var pdf_usuario=this.u_nombre;
            var pdf_puesto=this.u_puesto;
            var pdf_modulo=this.u_modulo;  
         
           
            //***************************************************************************** */
            var html_texto  = htmlToPdfmake( 
                this.texto
            );            
              //***************************************************************************** */ 
             //***************************************************************************** */ 
           
             //***************************************************************************** */              
            var dd = {
                pageSize: 'LEGAL',
                pageOrientation: 'portrait',
                pageMargins: [ 85, 130, 72, 60 ], 
                footer: function (currentPage, pageCount) {
                    const footerContent =[
                             { 
                                image: logo4,
                                width: 612, 
                                absolutePosition: {x: 0, y: 0},
                                
                            },                            
                            {
                                text: diragencia + "\n" + telagencia  + ' ' +  'www.hidalgo.gob.mx',
                                style: 'footertext', 
                                margin: [0,0,20,0],
                                alignment:'right',                                                                       
                            },                            
                            me.vistaPreviaTF == false
                                ? {
                                    image: me.qrCode,
                                    width: 80, // Ajusta el ancho según tu diseño
                                    height: 80, // Ajusta la altura según tu diseño
                                    absolutePosition: { x: 5, y: -80 }, // Ajusta las coordenadas según tu diseño
                                }
                                : "",
                        ] 
                        
                        return footerContent                
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
                        absolutePosition: {x: 85, y: 95},
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
                            
                    '\n\n\n\n\n\n',                     
                   {
                            text:  pdf_usuario + '\n' + pdf_puesto  + '\n'  +  'ADSCRITO A LA ' + pdf_agencia.toUpperCase() + '\n\n\n\n\n\n\n\n\n\n', 
                            style: 'ampo',
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
                        color: 'black'
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
                    table: {
                        fontSize: 9,
                        margin: [0, 5, 0, 15],
                        alignment: 'center',
                    },
                    ampo:{
                        fontSize: 12, 
                        bold: true,
                         alignment: 'center',
                    }, 
                    
                
                }
    
            }
                
                return dd;  
                

        },
        //Creacion de PDF, posterior a la vista previa cuando no es pagado
        crearpdfNSR(){              
            let me = this
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");    
            var logo1 = this.logo1
            var logo2 = this.logo2
            var logo3 = this.logo3
            var logo4 = this.logo4
            var diragencia = this.direccionAgencia
            var telagencia= this.telefonosAgencia
            var pdf_distrito=this.u_distrito
            var pdf_dirsubproc = this.u_dirSubPro
            var pdf_agencia =this.u_agencia
            var pdf_usuario=this.u_nombre
            var pdf_puesto=this.u_puesto
            var pdf_modulo=this.u_modulo                                
            var html_texto  = htmlToPdfmake( 
                this.texto
            );
             
            var dd = {
                pageSize: 'LEGAL',
                pageOrientation: 'portrait',
                pageMargins: [ 85, 130, 72, 60 ], 
                footer: function (currentPage, pageCount) {
                    const footerContent =[
                             { 
                                image: logo4,
                                width: 612, 
                                absolutePosition: {x: 0, y: 0},                                
                            },                            
                            {
                                text: diragencia + "\n" + telagencia  + ' ' +  'www.hidalgo.gob.mx',
                                style: 'footertext', 
                                margin: [0,0,20,0],
                                alignment:'right',                                                                       
                            },                            
                            me.vistaPreviaTF == false
                                ? {
                                    image: me.qrCode,
                                    width: 80, // Ajusta el ancho según tu diseño
                                    height: 80, // Ajusta la altura según tu diseño
                                    absolutePosition: { x: 5, y: -80 }, // Ajusta las coordenadas según tu diseño
                                }
                                : "",
                        ] 
                        
                        return footerContent  
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
                        text: pdf_dirsubproc +"\n"+pdf_agencia,
                        style: 'headertext',
                        absolutePosition: {x: 85, y: 95},
                    },                   
                    {
                        text: this.asunto,
                        style: 'titulo'
                    },
                      '\n\n',
                    {
                        text: this.v_nombresRevision,
                        style: 'subtitulo'
                    },
                     {
                        text: this.v_direccion,
                        style: 'subtitulo'
                    },                 
                     '\n\n',
                    {
                        text: html_texto,
                        style: 'texto'
                    },                                                                              
                    '\n\n\n\n\n\n\n',
                    {
                            text:  'Atentamente' + '\n\n\n\n\n' + pdf_usuario + '\n' + pdf_puesto  + '\n'  +  'Adscrito al ' + pdf_agencia,
                            style: 'ampo'
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
                        color: 'black'
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
                        alignment: 'center',
                    },
                    table: {
                        fontSize: 9,
                        margin: [0, 5, 0, 15],
                        alignment: 'center',
                    }, 
                    cargo:{
                        fontSize: 9, 
                        regular: true,
                        alignment: 'center',
                    },
                    
                
                }
    
            }
                
                return dd;  
                

        },        
        //Funcion para ver si solo se guarda la actualizacion del seguimiento o muestra vista previa para el PDF, esto aparece en la cabecera
        procesar(){
            let me = this;
            if (me.vartitulo == 0)
            {
                me.guardar();               
            }
            else if (me.vartitulo==1)
            {
                 me.vistaprevia();
            }
        },                    
        imprimir(item){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            var fechaQR = new Date() 
            me.v_idSeguimientoCumplimiento = item.idSeguimientoCumplimiento;
            me.editedIndex = 1;            
            me.docRemision = `Reimpresión de registro ${item.statusPago == "Pagado" ? 'de pago' : 'de incumplimiento de pago'}`
            me.generarQR(me.docRemision,me.nuc,me.u_nombre,fechaQR,me.v_idSeguimientoCumplimiento);  
            me.vistaPreviaTF = false        

            me.$justiciarestaurativa.get('api/SeguimientoCumplimientoes/Seguimiento/'+ me.v_idSeguimientoCumplimiento , configuracion).then(function(response){ 
                if (response.data.noHayS != 1)
                {
 
                    me.statusPago =response.data.statusPago;
                    me.asunto= response.data.titulo;
                    me.v_persona = response.data.dirigidoa;
                    me.v_direccion= response.data.direccion;
                    me.v_fechacita= response.data.fechaHoraCita; 
                    me.texto = response.data.texto; 
                    me.v_solicitantesL= response.data.solicitantes;
                    me.v_requeridosL = response.data.requeridos;
                    me.u_distrito = response.data.uf_Distrito;
                    me.u_dirSubPro= response.data.uf_DirSubProc;
                    me.u_agencia = response.data.uf_Agencia;
                    me.u_modulo=response.data.uf_Modulo
                    me.u_nombre = response.data.uf_Nombre;
                    me.u_puesto = response.data.uf_Puesto;
                    if (me.statusPago=="Pagado")
                    {
                           var dd = me.crearpdfSR();
                            var pdfMake = require('pdfmake/build/pdfmake.js')
                            var htmlToPdfmake = require("html-to-pdfmake");

                            if (pdfMake.vfs == undefined){
                                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                                pdfMake.vfs = pdfFonts.vfs; 
                            } 
                            var doc = pdfMake.createPdf(dd).print(); 
                
                            me.modalInfo=false,
                            me.modal_citatorio=false,
                            me.close();
                            me.listarNew();
                    } 
                      if (me.statusPago=="No pagado")
                    {
                           var dd = me.crearpdfNSR();
                            var pdfMake = require('pdfmake/build/pdfmake.js')
                            var htmlToPdfmake = require("html-to-pdfmake");

                            if (pdfMake.vfs == undefined){
                                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                                pdfMake.vfs = pdfFonts.vfs; 
                            } 
                            var doc = pdfMake.createPdf(dd).print(); 
                
                            me.modalInfo=false,
                            me.modal_citatorio=false,
                            me.close();
                            me.listarNew();
                    }                                                
                }
                else
                {
                    me.v_ARGenerado= 0;
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
        //Funcion que carga el texto correcto que se mostrara en el PDF dependiendo que tipo de pago sera
        cargartexto(){
            let me=this;

            //Genera la fecha para mostrarla
            var dia = moment().format("DD"); 
            var mes = moment().format('MMMM'); 
            var año= moment().format("YYYY");  
            var hr= moment().format('h:mm a');  
            var fecha = hr + ", del " + dia + " de " + mes + " del " + año + ",";            
            var fechaQR = new Date() 

            if (me.statusPago == "Pagado"){ 
                me.v_persona="";
                me.v_fechacita="";
                me.v_fechac="";
                me.v_horacita="";

                me.showveditor=true;
                me.vartitulo=1;
                me.asunto="REGISTRO DE CUMPLIMIENTO"
                me.texto = `<p>
                             En el ${me.nombreAgencia}, ubicado en ${me.direccionAgencia},<strong> siendo las ${fecha}</strong>
                            dentro del expediente número  <strong>${me.noExpediente}</strong>, correspondiente a los Mecanismos Alternativos de 
                            Solución de Controversias en Materia Penal, solicitado por el <strong>C. ${me.v_solicitantesL}
                            </strong>, en donde fue requerido el <strong>C. ${me.v_requeridosL}</strong>.
                        </p>
                        <br><br>
                        <p>
                            Se asienta en el presente registro que se encuentran ambos intervinientes a la cita de cumplimiento, respecto del acuerdo reparatorio que celebraron en
                            fecha <strong>${me.v_fechaAcuerdo}</strong>, <strong>dentro de la cláusula SEGUNDA, numeral PRIMERO.</strong> Por lo que en este momento el C. 
                            ${me.v_requeridosL} realiza el pago número ${me.parcialidadPagar} de ${me.v_TotalParcialidades} por la cantidad de ${me.tipoEspecie ? `${me.v_cantidadAPagar} ${me.objetoEspecie}` : `$${me.v_cantidadAPagar}` } al C. ${me.v_solicitantesL}
                            , quien recibe dicha cantidad a su entera satisfacción. Lo anterior se asienta con la finalidad de dejar el antecedente correspondiente a lo ocurrido.
                        </p>
                        <br><br>
                        <p>
                            Esto con fundamento en el artículo 36 fracción IV y V de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal.
                        </p>`;

                me.docRemision =  'Registro de pago'
            }
            if (me.statusPago=="Pagado" && me.statusConclusion == "Inmediato") { 
                me.v_persona="";
                me.v_fechacita="";
                me.v_fechac="";
                me.v_horacita="";

                me.showveditor=true;
                me.vartitulo=1;
                me.asunto="REGISTRO DE CUMPLIMIENTO"
                me.texto =`<p>En el ${me.nombreAgencia}, ubicado en ${me.direccionAgencia},<strong> siendo las ${fecha}</strong> 
                        dentro del expediente número <strong>${me.noExpediente}</strong>, correspondiente a los Mecanismos Alternativos de Solución de 
                        Controversias en Materia Penal, solicitado por el <strong>C. ${me.v_solicitantesL}
                        </strong>, en donde fue requerido el <strong>C. ${me.v_requeridosL}</strong>.
                        </p>
                        <br><br>
                        <p>
                            Se asienta en el presente registro que se encuentran ambos intervinientes a la cita de cumplimiento, respecto del acuerdo reparatorio que celebraron en 
                            fecha <strong>${me.v_fechaAcuerdo}</strong>, <strong>dentro de la cláusula SEGUNDA, numeral PRIMERO.</strong> Por lo que en este momento el C. 
                            ${me.v_requeridosL} realiza el pago número ${me.parcialidadPagar} de ${me.v_TotalParcialidades} por la cantidad de ${me.tipoEspecie ? `${me.v_cantidadAPagar} ${me.objetoEspecie}` : `$${me.v_cantidadAPagar}`} al C. ${me.v_solicitantesL}
                            , quien recibe dicha cantidad a su entera satisfacción. Lo anterior se asienta con la finalidad de dejar el antecedente correspondiente a lo ocurrido.
                        </p>
                        <br><br>
                        <p>
                            Esto con fundamento en el artículo 36 fracción IV y V de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal.
                        </p>`;

                me.docRemision =  'Registro de pago inmediato'

            }
            else if(me.statusPago=="No pagado") {
                   me.showveditor=true;
                   me.vartitulo=0;
                   me.asunto="CITATORIO PARA EFECTO DE CUMPLIMIENTO";
                me.texto = "";

                me.docRemision =  'Citación para efecto de cumplimiento'
                
            }
            else if(me.statusPago=="Prorroga") {
                me.showveditor=false;
                me.vartitulo=0;
                me.asunto="Prorroga";
                me.texto = ""; 
                me.docRemision =  'Registro de prorroga'                   
            }
            else if(me.statusPago=="Anticipado") {
                me.showveditor=true;
                me.vartitulo=0;
                me.asunto="REGISTRO DE CUMPLIMIENTO";
                me.texto = `<p>
                            En el ${me.nombreAgencia}, ubicado en ${me.direccionAgencia}, <strong>siendo las ${fecha}</strong>
                            dentro del expediente número <strong>${me.noExpediente}</strong>, correspondiente a los Mecanismos Alternativos de Solución de 
                            Controversias en Materia Penal, solicitado por el <strong>C. ${me.v_solicitantesL}
                            </strong>, en donde fue requerido el <strong>C. ${me.v_requeridosL}</strong>.
                        </p>
                        <br><br>
                        <p>
                            Se asienta en el presente registro que se encuentran ambos intervinientes a la cita de cumplimiento, respecto del acuerdo reparatorio que celebraron en 
                            fecha <strong>${me.v_fechaAcuerdo}</strong>, <strong>dentro de la cláusula SEGUNDA, numeral PRIMERO.</strong> Por lo que en este momento el C. 
                            ${me.v_requeridosL} realiza el pago número ${me.parcialidadPagar} de ${me.v_TotalParcialidades} por la cantidad de ${me.tipoEspecie ? `${me.v_cantidadAPagar} ${me.objetoEspecie}` : `$${me.v_cantidadAPagar}`} al C. ${me.v_solicitantesL}
                            , quien recibe dicha cantidad a su entera satisfacción. Lo anterior se asienta con la finalidad de dejar el antecedente correspondiente a lo ocurrido.
                        </p>
                        <br><br>                        
                        <p>
                            Esto con fundamento en el artículo 36 fracción IV y V de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal.
                        </p>`;

                me.docRemision =  'Registro de pago anticipado'
            }            
            me.generarQR(me.docRemision,me.nuc,me.u_nombre,fechaQR,me.v_idSeguimientoCumplimiento);    
        },
        //Genera el texto para el pdf de la sesion que se crea cuando no se cumple el pago
        generartexto(){
            let me=this;
            if (me.statusPago=="No pagado")
            {
                var dia = moment(me.v_fechac).format("DD"); 
                var mes = moment(me.v_fechac).format('MMMM'); 
                var año= moment(me.v_fechac).format("YYYY");   
                var fecha =  dia + " de " + mes + " del " + año +", a las " + me.v_horacita + " horas";




             
                me.texto="<p>	Por medio del presente hago de su conocimiento que deberá de presentarse en las instalaciones del Centro de Justicia Restaurativa Penal,"+
                         " ubicado en <strong>" + me.direccionAgencia + ", Teléfonos " + me.telefonosAgencia + ",</strong> a efecto"+
                         " de dar cumplimiento al acuerdo reparatorio celebrado en fecha <strong>" + me.v_fechaAcuerdo + " </strong>, ello de conformidad con lo establecido"+
                         " por el artículos 34, 35 y 36 fracción V de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal. Por lo que"+
                         " se le requiere su presencia para el próximo <strong>"+ fecha + "</strong>, con la finalidad de dar cumplimiento a lo"+
                         " establecido en el acuerdo de fecha antes citada, dado que así Usted lo acepto y se obligó a hacerlo.</p><br><br><br>"+
                         "<u><strong>A percibido en este momento que el incumplimiento del acuerdo dará lugar a la continuación del procedimiento penal en el que se encuentra"+
                         " inmerso dentro de la carpeta de investigación,</strong></u> esto con fundamento con el ordinal 35 último párrafo y 36 fracción I de la Ley Nacional"+
                         " de Mecanismos Alternativos de Solución de Controversias en Materia Penal</p>"

            }

        },               
        //Funciones de limpiado
        close() {            
           //cierra el modal del PDF
            this.modal_citatorio=false, 
            this.modalInfo=false;
            this.statusPago="";
            this.v_persona="";
            this.v_fechacita="";
            this.v_fechac="";
            this.v_horacita="";
            this.editedIndex=-1;
        },   
        //Limpia variables sel seguimiento para evitar mostrar datos erroneso en los PDF
        limpiarSegumiento(){
            this.detallesSeguimiento=false;
            this.statusPago="";
            this.v_persona="";
            this.v_fechacita="";
            this.v_fechac="";
            this.v_horacita="";
            this.editedIndex=-1;
            this.acuerdoreparatorioid2 = "";
            this.v_delitos = ''
            this.Annexes = []
            this.existsAttached = false
            this.seguimientosAnexo = []
        },   
        limpiar(){
            let me= this;
            me.v_fechaP="";
            me.v_fechaProrroga="";
        },
        //*********************************************************************************************************************************** */
        //* Funciones para manejo diverso de datos
        //*********************************************************************************************************************************** */
        //Funciones para los formatos de fechas en los PDF
        formatearfecha: function(fecha){
            return moment(fecha).format('DD/MM/YYYY')
        },
        formatearfechahora: function(fecha){
            return moment(fecha).format('DD/MM/YYYY hh:mm A')
        },
        formatearfechatexto:function(fecha){
            var dia = moment(fecha).format("DD");
            var mes = moment(fecha).format('MMMM');
            var año= moment(fecha).format("YYYY"); 
            var fechatexto = dia + " de " + mes  + " del " + año  
            return fechatexto;
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
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //~ Funciones en espera para refactorización futura        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //----------------------------------------------------------------------FUNCIONES Y APIS QUE YA NO SON OCUPADAS, SE DEJAN EN CASO DE SER OCUPADAS, DE EXISTIR OTRA ACTUALIZACION PUEDEN BORRARLA--------------------------------------------------------------------------        
        //Funcionaba cuando se creaba el seguimiento de cumplimiento en caso de ser inmediato
        consultarPagoSeleccionado(){
            let me = this;
            me.v_showCant=false;
            me.v_showEspecie=false;
 
            for(var i=0;i< me.v_tipopago.length ;i++){
                if (me.v_tipopago[i]=="Dinero")
                {
                    me.v_showCant=true; 
                }
                if (me.v_tipopago[i]=="Especie")
                {
                    me.v_showEspecie=true;
                }
                   
            } 
        },
        //Guardaba el seguimiento de cumplimiento. Todo esto ya se crea desde la creacion de acuerdo reparatorio
        guardarregistro(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            
            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información.', 
                function(){
                    var listatipopagoL = "";
                    for(var i=0;i<me.v_tipopago.length;i++){
                        listatipopagoL= listatipopagoL + " " + me.v_tipopago[i]
                    }
                    
                    me.$justiciarestaurativa.post('api/SeguimientoCumplimientoes/Crear',{    
                                        'acuerdoReparatorioId': me.v_idAcuerdoReparatorio,  
                                        'tipoPago':listatipopagoL,
                                        'noParcialidad':me.noparcialidad,       
                                        'fecha': me.v_fechaPa + ' ' + me.v_horacitaC, 
                                        'cantidadAPagar': me.v_cantidadmonto,  
                                        'objectoEspecie': me.v_especie,
                                        //************************************ */  
                                        }, configuracion).then(function(response){   
                                            me.modal_addSC=false;
                                            me.listarNew();
                                            me.$notify('El registro se creo correctamente!!!','success') 
                                        }).catch(function(err){
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
                                                me.$notify('Error al intentar crear el  registro!!!','error') 
                                            } 
        
                            });  

                },
                function(){
                        alertify.warning('Verifica la información')
                    }
                ).set('labels', {ok:'Guardar', cancel:'Cancelar'});


        },
        //Funcion antes usada para actualizar el estatus, ahora es de manera auntomatica en caso de cumplir todos los pagos
        actualizarSAR(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 

            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información.', 
                function(){  
                  
                  
                    me.$justiciarestaurativa.put('api/AcuerdoReparatorios/ActualizarStatuscumplimineto',{   
                                'idAcuerdo': me.v_idAcuerdoReparatorio,
                                'statusCumplimiento':me.v_SF,
                                 //************************************ */
                            }, configuracion).then(function(response){    
                                me.modal_addSAR=false;
                                me.listarAcuerdoReparatorio();
                                 

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
                    }
                ).set('labels', {ok:'Guardar', cancel:'Cancelar'});
 
    
        },
        //Listaba el estatus de primera al abrir la pantalla, ahora se hacve al abrir el conjunto
        lisatarStauts(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};   

            me.$justiciarestaurativa.get('api/SeguimientoCumplimientoes/SeguimientoStatus/'+  me.v_idAcuerdoReparatorio, configuracion).then(function(response){ 
                if (response.data.noHayPendiente == 0)
                {
                    me.v_statusAR=0;
                }
                else if (response.data.noHayPendiente == 1)
                {
                    me.v_statusAR=1;
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
    }
  }
</script>
 