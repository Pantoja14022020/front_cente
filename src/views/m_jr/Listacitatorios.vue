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
        <v-toolbar-title class="font-weight-regular" >Lista de citatorios.</v-toolbar-title>            
            <v-divider class="mx-2" inset vertical></v-divider> 
                    <v-badge
                        v-model="show"
                        color="cyan"
                        right
                    >
                        <template v-slot:badge>
                            <span>   {{  contador  }}</span>
                        </template>
                        <v-icon large color="grey lighten-1">folder</v-icon>
                    </v-badge>
                    <v-spacer></v-spacer>
            <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
             <v-btn  @click="filtrar()" fab small  class="mb-2 pt-2 primary"><v-icon class="mt-1">filter_list</v-icon></v-btn>                                          
        </v-toolbar>
        <v-data-table
            :headers="headers"
            :items="citatoriosrecordatorios"
            :search="search" 
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"  >
            <template slot="items" class="white" slot-scope="props">
                <td >{{ props.item.noExpediente}}</td> 
                <td >{{ formatearfechahora(props.item.fechaHoraCita)}}</td>   
                <td >{{ props.item.solicitadoPor}}</td>
                <td >{{ props.item.dirigidoa_Nombre}}</td>                 
                <td >{{ props.item.noSesion}}</td> 
                 <td > 
                    <div v-if="props.item.noCitatorio==0">
                        <a>Seguimiento Cumplimiento</a>
                    </div>
                    <div v-else>
                        {{props.item.noCitatorio }}
                    </div>                  
                </td>                    
                <td>{{ props.item.statusEntrega }}</td>  
                <td>
                    <v-badge left>
                        <template v-slot:badge>
                        <span>{{ props.item.contadorSMSS }}</span>
                        </template>
                        <v-icon color="grey lighten-1">sms</v-icon>
                    </v-badge>
                </td> 
                <td>
                    <v-badge left>
                        <template v-slot:badge>
                        <span>{{ props.item.contadorSMSR }}</span>
                        </template>
                        <v-icon color="grey lighten-1">sms</v-icon>
                    </v-badge>
                </td>
                <td class="justify-center" >                        
                         <v-tooltip bottom   >
                            <template v-slot:activator="{ on }">
                                <v-icon    
                                    class="mr-2" v-on="on" color="default" 
                                    @click="statusEntrega(props.item)"
                                >
                                near_me
                                </v-icon> 
                            </template>
                            <span>Actualizar status entregado</span>
                        </v-tooltip>    
                        <v-tooltip bottom   >
                            <template v-slot:activator="{ on }">
                                <v-icon 
                                    class="mr-2" v-on="on" color="warning" 
                                    @click="reimprimirCitatorio(props.item)"
                                >
                                print
                                </v-icon> 
                            </template>
                            <span>Reimprimir citatorio</span>
                        </v-tooltip> 
                         <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon  
                                    class="mr-2" v-on="on" color="success" 
                                    @click="auteSMS(props.item)"
                                    >
                                textsms
                                </v-icon> 
                            </template>
                            <span>Enviar SMS</span>
                        </v-tooltip>    
                </td>
            </template>
            <template slot="no-data">
            <v-btn color="primary"  @click="listar" >Cargar</v-btn>
            </template>
        </v-data-table> 
    </v-flex>
    <v-dialog   v-model="modal_statusEntrega"  max-width="500px"> 
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
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
                                 <p class="subheading">N° Expediente:<b> {{ noExpediente }}</b></p>
                          </v-flex>  
                            <br>
                            <v-spacer></v-spacer>
                            <br>
                            <v-flex xs12 sm12 md12>
                                <p class="subheading">N° citatorio:<b> {{  noCitatorio }}</b></p>
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
                        <v-btn  @click.native="close" >Cancelar</v-btn>
                        <v-btn @click.native="guardarStatusEntrega" class="success" >Guardar</v-btn>
                    </v-card-actions>
                </v-form>
            
            </v-card-text> 
        </v-card>

    </v-dialog>   
    <v-dialog   v-model="modal_sms"  max-width="700px"> 
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon small class="grey lighten-2">textsms</v-icon>
                    </v-avatar> 
            <v-toolbar-title class="subheading">Envio de SMS a requerido</v-toolbar-title>
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
                        <v-btn  @click.native="close" >Cancelar</v-btn> 
                        <v-btn @click.native="sendSMS()" class="success" >Enviar SMS</v-btn>
                    </v-card-actions>
                </v-form>
            
            </v-card-text> 
        </v-card>

    </v-dialog>
    <v-dialog v-model="filtros"  max-width="600px"> 
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">filter_list</v-icon>
                    </v-avatar>
        
                
            <v-toolbar-title class="subheading">Filtrar información</v-toolbar-title>
            <v-spacer></v-spacer>
        
            
            </v-toolbar>
            <v-card-text>

                    <v-menu
                                ref="v_menu1"
                                v-model="v_menu1"
                                :close-on-content-click="false"
                                :return-value.sync="v_fechaInicial"
                                transition="scale-transition" 
                                offset-y  
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                <v-text-field
                                    :value="v_fechaInicial"
                                    label="Fecha inicial:"
                                    prepend-icon="event" 
                                    clearable  
                                    readonly
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker v-model="v_fechaI" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="v_menu1 = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.v_menu1.save(formatearfecha(v_fechaI))">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                            <v-menu
                                ref="v_menu2"
                                v-model="v_menu2"
                                :close-on-content-click="false"
                                :return-value.sync="v_fechaFinal"
                                transition="scale-transition" 
                                offset-y 
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                <v-text-field
                                    :value="v_fechaFinal"
                                    label="Fecha final:"
                                    prepend-icon="event" 
                                    clearable 
                                    readonly
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker v-model="v_fechaF" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="v_menu2 = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.v_menu2.save(formatearfecha(v_fechaF))">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                             <v-autocomplete  
                                    :items="v_statusEntregas"
                                    v-model="v_statusEntrega" 
                                    label="¿Como se entrego el citatorio?:"   
                              ></v-autocomplete>
            
            </v-card-text> 
                <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn  @click.native="filtros=false" >Cancelar</v-btn>
                        <v-btn @click.native="listarFiltros()" class="success" >Consultar</v-btn>
                    </v-card-actions>
        </v-card>

    </v-dialog>    
    <v-dialog   v-model="modal_editdirec"  max-width="500px">
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">edit</v-icon>
                    </v-avatar>
            <v-toolbar-title class="subheading">Edición de Direccion</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                        <v-btn icon   @click="cerrarMdir()">
                            <v-icon class="grey">close</v-icon>
                        </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
                <v-switch
                    v-model="swDir"
                    :label="'¿Desea editar la dirección de algún solicitante o requerido?'"
                    color="success"
                    hide-details
                    class="mb-3"
                ></v-switch>
                <v-form ref="form">
                    <v-container grid-list-lg v-if="swDir">
                        <v-layout v-for="rr in requeridoC" grid-list-lg>                            
                            <v-text-field v-model="rr.domicilio" :label="rr.nombre"></v-text-field>                            
                        </v-layout>
                        <v-layout v-for="ss in solicitanteC" >
                            <v-text-field v-model="ss.domicilio" :label="ss.nombre"></v-text-field>                            
                        </v-layout>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn  @click.native="cerrarMdir" >Cancelar</v-btn>
                        <v-btn @click.native="duardadDomPDF" class="success" >Generar</v-btn>
                    </v-card-actions>
                </v-form>

            </v-card-text>
        </v-card>

    </v-dialog>
</v-layout>     
</template> 
<script>  
  import axios from 'axios'  
  import jsPDF from 'jspdf'
  import XLSX from 'xlsx';
  import html2canvas from 'html2canvas'
  import VeeValidate from 'vee-validate'     
 //** COMPONENTES */
  import n401 from '../../components/m_jr/401'
  import n403 from '../../components/m_jr/403' 
  import moment from 'moment'
  import 'moment/locale/es';
  import alertify from 'alertifyjs'; 
  import { VueEditor } from "vue2-editor";
import { error } from 'util';  
import { generarQRCodeBase64 } from './crearQR';

  export default {
    components: {  
        n401,
        n403,               
    },
    data: function () {
        return {           
            e401:false, 
            e403:false,
            showpage:true,  
            //************************************ */            
            headers: [ 
                { text: 'No Expediente', value: 'noExpediente' },  
                { text: 'Fecha y hora cita', value: 'fechaHoraCita' }, 
                 
                { text: 'Solicitado por:', value: 'solicitadoPor'},  
                { text: 'Dirigido a:', value: 'dirigidoa_Nombre'},
                { text: 'Sesion:', value: 'noSesion'},  
                { text: 'N° Cita:', value: 'noCitatorio'},   
                { text: 'Status entrega', value: 'statusEntrega' }, 
                { text: 'SMS Sol', value: 'opciones', sortable: false },
                { text: 'SMS Req', value: 'opciones', sortable: false },     
                { text: 'Opciones', value: 'opciones', sortable: false },                                  
            ],
            search: '',
            rowsPerPageItems: [10, 20, 30, 40, 50],
            pagination: {
                rowsPerPage: 50
            },
            editedIndex: -1, 
            //**************************************
            //VARIABLES GENERALES
            citatoriosrecordatorios:[],
            citatoriorecordatorioId:'',
            expedienteId :'',
            envioId:'',
            noExpediente:'', 
            noCitatorio:0,
            noCitatorioText:'',
          show :true,            
            v_tipocitatorio:'',
            v_tiposcitatorios:['Citatorio para que le de continuidad el Solicitante',  '1ra cita Requerido' , '2da cita Requerido', '3ra cita Requerido' ],
            v_solicitante:'',
            v_solicitantes:[],
            v_nombreSolicitantes:'',
            v_requerido:'',
            v_requeridos:[],
            v_menu1: false,
            v_fechacita:'',
            v_fechac:'',

            v_menu2:false,
            v_horacita:'',
            v_horac:'',
            
            v_lugarcita:'Centro de Justicia Restaurativa Penal, ubicado en Centro Impulsor No. 132, Fracc. SPAUAH, Pachuca de Soto, Hgo., C.P. 42082, Teléfonos (771) 71 7 90 00, Ext. 9806 y 9294.',

            continuidad:'',

            citatorio1v1:'',
            citatorio1v2:'',      
            
            citatorio2:'',
            citatorio3:'',

            oficio:'',
          

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
            u_tipomodulo:'',

            
            //**************************************
            //VARIABLES REPORTE DE CITATORIO Y RECORDATORIO
            logo1 :'',
            logo2:'',
            direccionAgencia:'',
            telefonosAgencia:'',
            titulo:'',
            dirigidoa:'',
            nombre:'',
            correo:'',
            telefono:'',
            direccion:'',
            referencia:'',
            uf_Distrito:'',
            uf_DirSubProc:'',
            uf_Agencia:'',
            uf_Nombre:'',
            uf_Puesto:'', 
            uf_Modulo:'',

            
            fechaHoraCita:'',

            //**************************************
            //MODALES
          
            modal_citatoriorecordatorio:false, 
            modal_statusEntrega:false,
            v_statusAsistencia:false, 
            

            v_statusEntregas:['En proceso','Domicilio incorrecto','Entregado a familiar o conocido','Entregado personal','Fijado','No se ubica el domicilio','Nombre incorrecto','Ya no vive ahí'],
            v_statusEntrega:'',

            v_delitos:[],
            nuc:'',

            modal_sms:false,
            tokensms:'',
            mensagesms:'', 
            destinatario:'',
            codigo:52,

             v_menu1:false,
                v_fechaInicial:'',
                v_fechaI:'',

                v_menu2:false,
                v_fechaFinal:'',
                v_fechaF:'',
            contador:0,
            filtros:false,
            vali: false,
            modal_editdirec: false,
            solicitanteC:[],
            requeridoC:[],
            idconjuntos:'',
            direAgencia:'',
            swDir: false,
            texto: 'Vista Previa',
      qrCode: '',
      docRemision: 'Remisión',
            vistaPreviaTF: true,
      sesionId: '',
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
            this.$store.dispatch("setLogin", true, token)
          }
          else 
          { 
            this.$router.push({ name: 'login' });
          }      
        let me = this    

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
        me.u_tipomodulo=me.$store.state.usuario.tipomodulo;       
        //*********************************************** */ 
        me.listar();
        me.listarLogo();
        me.informacionagencia();
        me.dirAgencia()
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
      return this.$store.state.drawer
    }
    },
    watch: {        
        qrCode(val) {
            let me = this

            if (val != '') {
                if (me.docRemision == 'Reimpresión de citatorio de sesión') {
                    var dd = me.crearPdf(); 
                    var pdfMake = require('pdfmake/build/pdfmake.js')
                    var htmlToPdfmake = require("html-to-pdfmake");

                    if (pdfMake.vfs == undefined){
                        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                        pdfMake.vfs = pdfFonts.vfs; 
                    } 
                    pdfMake.createPdf(dd).print(); 
                    me.swDir = false
                    me.modal_editdirec = false 
                }
            }
        }
    },
    methods:{ 
        dirAgencia(){
            let me = this;
            let header = {"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion = {headers : header}

            me.$cat.get('api/RAPs/ListarDireccionAgencia/' + me.u_idagencia, configuracion).then(function(response)
            {                
                me.direAgencia = response.data[0].direccion                
            }).catch(function(err)
                    {
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
                    })
        },
        listar(){
            let me = this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            
            me.$justiciarestaurativa.get('api/CitatorioRecordatorios/ListarCitatoriosModulo/' + me.u_modulo + '/' + me.u_tipomodulo + '/' + me.u_nombre, configuracion).then(function (response) {                 
               me.citatoriosrecordatorios=response.data;
                me.contador = response.data.length; 
               me.close();
            }, configuracion).catch(function(err){
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
        listarFiltros(){
            let me = this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            me.$justiciarestaurativa.get('api/CitatorioRecordatorios/ListarCitatoriosModuloFiltros/'+ me.u_modulo +'/'+ me.v_fechaI +" 00:00:00"+'/'+me.v_fechaF+" 23:59:59" + '/'+ me.v_statusEntrega, configuracion).then(function(response){ 
               me.citatoriosrecordatorios=response.data;
            me.contador = response.data.length; 
               me.close();
            }, configuracion).catch(function(err){
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
        auteSMS(item){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$justiciarestaurativa.post('api/CitatorioRecordatorios/auth',{}, configuracion).then(function(response){ 
                    if (response.data.success== false)
                    {                        
                         me.$notify(response.data.message,'error')     
                    }
                    else
                    {
                        me.tokensms = response.data.token;   
                        me.citatoriorecordatorioId= item.idRCitatoriosRecordatorios; 
                        var dia = moment(item.fechaHoraCita).format("DD");
                        var mes = moment(item.fechaHoraCita).format('MMMM'); 
                        var hr= moment(item.fechaHoraCita).format('h:mm');  
                        var fecha = dia + " de " + mes + " a las " + hr ;
                        me.mensagesms= item.dirigidoa_Nombre +  ": su cita en la Procuraduria es el " + fecha + ". Su asunto es el " + item.noExpediente + " [Evite que avance su procedimiento]";
                        me.destinatario = item.dirigidoa_Telefono;
                        me.modal_sms=true; 
                
                  

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
        sendSMS(){
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.$justiciarestaurativa.post('api/CitatorioRecordatorios/send',{  
                                //***************************** PERSONA*/  
                                'token': me.tokensms,   
                                'texto': me.mensagesms,  
                                'dest': me.destinatario,
                                'c': me.codigo  
                                //************************************ */
                            }, configuracion).then(function(response){                                
                                me.mensagesms="";
                                me.tokensms="";
                                me.destinatario=""; 
                                me.guardarContadorSMS();  

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
        guardarContadorSMS(){ 
        
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            me.$justiciarestaurativa.put('api/CitatorioRecordatorios/ContadorSMSR',{ 
                    'idRCitatoriosRecordatorios': me.citatoriorecordatorioId, 
                },configuracion).then(function(response){  
                    me.listar();
                }).catch(function(error){
                     me.$notify('Error al intentar actualizar el  registrarl el SMS enviado!!!','error') 
                });  
        },
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
        download : function() {
                const data = XLSX.utils.json_to_sheet(this.citatoriosrecordatorios)
                const wb = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(wb, data, 'data')
                XLSX.writeFile(wb,'lista.xlsx')
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
        formatearfechahora: function(fecha){
            return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
        }, 
        formatearfecha: function(fecha){
            return moment(fecha).format('DD/MM/YYYY');
        },
        formatearhora: function(hora){
            return moment(hora).format('hh:mm:ss a');
        },       
        formatearfechaTexo(fecha){
            let me= this;
            var dia = moment(fecha).format("DD");
            var mes = moment(fecha).format('MMMM');
            var año= moment(fecha).format("YYYY");    
            var fecha = dia + " de " + mes  + " del " + año 
             return fecha

        },    
        nombresSolicitantes(data=[]) {
      
            let me= this; 
            for(var i=0;i<data.length;i++){
                if (me.v_nombreSolicitantes=="")
                {
                      me.v_nombreSolicitantes=   data[i].text;
                }
                else{
                      me.v_nombreSolicitantes= me.v_nombreSolicitantes + ', ' + data[i].text;
                }
              
            }
        },
        close(){
            this.modal_agregar=false;
            this.modal_citatoriorecordatorio=false; 
            this.modal_statusEntrega=false;
            this.modal_sms=false;
        },
        limpiar(){  
            let me=this;
            me.v_tipocitatorio="";
            me.v_solicitante="";
            me.v_nombreSolicitantes="";
            me.v_requerido="";
            me.v_menu1=false;
            me.v_fechacita="";
            me.v_fechac="";

            me.v_menu2=false;
            me.v_horacita="";
            me.v_horac="";
            
            me.v_lugarcita='Centro de Justicia Restaurativa Penal, ubicado en Centro Impulsor No. 132, Fracc. SPAUAH, Pachuca de Soto, Hgo., C.P. 42082, Teléfonos (771) 71 7 90 00, Ext. 9806 y 9294.';

            me.continuidad="";

            me.citatorio1v1="";
            me.citatorio1v2="";
            
            me.citatorio2="";
            me.citatorio3="";

            me.fechaHoraCita="";
            me.oficio="";
            me.v_statusAsistencia=false;
            me.oficio="";
            me.nombre="";
            me.direccion="";
            me.telefono="";
            me.correo="";
            me.titulo=""; 
            me.editedIndex=-1;
        },
        crearPdf() {
            let me = this
            var pdfMake = require('pdfmake/build/pdfmake.js');
            var htmlToPdfmake = require("html-to-pdfmake");
            var logo1 = this.logo1;
            var logo2 = this.logo2;
            var logo3 = this.logo3;
            var logo4 = this.logo4;
            var diragencia = this.direccionAgencia;
            var telagencia= this.telefonosAgencia;

            this.nombresSolicitantes(this.v_solicitantes);

            var listadelito = ""

            for(var i=0;i<this.v_delitos.length;i++){
                listadelito= listadelito + " " +this.v_delitos[i].text
            }            

          if (this.editedIndex==1)
          {
                var dia = moment(this.fechaHoraCita).format("DD");
                var mes = moment(this.fechaHoraCita).format('MMMM');
                var año= moment(this.fechaHoraCita).format("YYYY");
                var hrCita= moment(this.fechaHoraCita).format('h:mm:ss a');
                var fechaCita = dia + " de " + mes  + " del " + año
                var dia = moment().format("DD");
                var mes = moment().format('MMMM');
                var año= moment().format("YYYY");
                var hr= moment().format('h:mm:ss a');
                var fecha = dia + " de " + mes  + " del " + año + ", " + hr ;
                var pdf_distrito=this.uf_Distrito;
                var pdf_dirsubproc = this.uf_DirSubProc;
                var pdf_agencia =this.uf_Agencia;
                var pdf_usuario=this.uf_Nombre;
                var pdf_puesto=this.uf_Puesto;
                var pdf_modulo=this.uf_Modulo;
            }
          else
            {

                var fhc = this.v_fechac + ' ' + this.v_horacita;
                var dia = moment(fhc).format("DD");
                var mes = moment(fhc).format('MMMM');
                var año= moment(fhc).format("YYYY");
                var hrCita= moment(fhc).format('h:mm:ss: a');
                var fechaCita = dia + " de " + mes  + " del " + año
                var dia = moment().format("DD");
                var mes = moment().format('MMMM');
                var año= moment().format("YYYY");
                var hr= moment().format('h:mm:ss a');
                var fecha = dia + " de " + mes  + " del " + año + ", " + hr;
                var pdf_distrito=this.u_distrito;
                var pdf_dirsubproc = this.u_dirSubPro;
                var pdf_agencia =this.u_dgencia;
                var pdf_usuario=this.u_nombre;
                var pdf_puesto=this.u_puesto;
                var pdf_modulo=this.u_modulo;
                this.nombre = this.v_requerido.text;;
                this.solicitadopor  = this.v_solicitante.text;
            }            
            var html_texto1  = htmlToPdfmake(
               '<p style="text-align:center;">¿QUÉ TENGO QUE HACER?</p><br><p>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><strong>Acuda a su cita</strong><span>. Asista el día y la hora en que fue citado para evitar' +
               ' que progrese la denuncia y/o querella penal en su contra. Asegúrese de traer consigo una identificación oficial y copia simple de la misma.</span></p>' +
               '<p>2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Explique su caso</strong>. Un facilitador imparcial de la Procuraduría ayudará a ambas partes'+
               ' a resolver su controversia mediante el diálogo.</p><p>3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Llegue a un acuerdo</strong><span>. Si usted'+
               ' decide llegar a una solución que le resulte satisfactoria, ambas partes celebrarán un acuerdo reparatorio.</span></p><p><span>4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
               '<strong>Cierre la carpeta de Investigación en su contra</strong><span>. Cuando ambas partes cumplan el acuerdo reparatorio, la Procuraduría concluirá su carpeta de'+
               ' investigación.</span></p>'
            );
            var html_texto2  = htmlToPdfmake(
               '<p style="text-align:center;">¿QUÉ PASA SI NO ACUDO A LA CITA? </p><br><p>Se continuará el proceso penal de la carpeta de investigación ante el Ministerio Público para su integración'+
               ' y de ser procedente podría someter su caso ante un juez penal. </p>'
            );
            var html_texto3  = htmlToPdfmake(
               '<p class="ql-align-justify">En caso de no poder o no querer asistir a su cita, comuníquese al teléfono </p><p>&nbsp;71 79000 a las extensiones 9806,'+
               ' 9294 o 9807 con el facilitador</p>' + pdf_usuario
            );
            var html_textoImpu1 = htmlToPdfmake(
                '<p>Para poner fin al procedimiento penal iniciado en su contra, acuda a esta cita y resuelva su asunto antes de que su carpeta de investigación pueda ser sometida ante un juez.</p>'
            );
            var html_textoImpu2 = htmlToPdfmake(
                '<p>El motivo de su cita es por una denuncia penal interpuesta en su contra por el  C.  DIEGO VALENCIA BADILLO apoderado legal de los CC. Marduck Olmos Blanquel  y Leticia Suarez Floresa, por el delito de Fraude,  de conformidad con el Código Penal del Estado de Hidalgo.</p>'
            );
            //* var 
            var html_textoVict1 = htmlToPdfmake(
                '<p>Para poner fin al procedimiento penal iniciado por usted, acuda a esta cita y resuelva su asunto antes de que su carpeta de investigación pueda ser sometida ante un juez.</p>'
            );
            var html_textoVict2 = htmlToPdfmake(
                '<p>El motivo de su cita es por una denuncia penal interpuesta por usted y para reunirse  con el C. ÁNGEL CERVANTES MARTÍNEZ, por los delitos de Lesiones y Daño en la Propiedad, de conformidad con el Código Penal del Estado de Hidalgo. </p>'
            );
            //***************************************************************************** */
            var ddd = []

            this.requeridoC.map((req, index) =>{
                ddd.push(
                            {
                                text: pdf_dirsubproc+"\n"+pdf_agencia,
                                style: 'headertext',
                                absolutePosition: {x: 85, y: 95},
                            },
                            {
                                columns: [
                                    [
                                        {
                                            text: ' ',
                                            alignment: 'right' // Aligns 'Column 2' text to right
                                        },
                                        {
                                            columns: [
                                                {
                                                    text:'',
                                                    width: '*',
                                                },
                                                {
                                                    style: 'table1',
                                                    table: {
                                                        body: [
                                                            ['Fecha', fecha],
                                                            ['Expediente', this.noExpediente],
                                                            ['Carpeta de investigación', this.nuc],
                                                            ['Cita número', this.noCitatorioText]
                                                        ]
                                                    },
                                                    alignment: 'center', // Optional, for body texts
                                                    width: 'auto' // Changes width of the table
                                                }
                                            ]
                                        }
                                    ]
                                ]
                            },
                            '\n\n',
                            {

                                text:  req.nombre,
                                style: 'subtitulo'
                            },
                            '\n',
                            {

                                text:  'Direccion: ' + (req.domicilio == ', No.Ext S/N, CP 0, , , ' ? 'LO DESCONOCE':req.domicilio),
                                style: 'texto'
                            },
                            '\n\n',
                            {
                                text:    (req.clasificacion == 'Imputado' ? html_textoImpu1 : html_textoVict1),
                                style: 'textobold'
                            },
                            '\n',
                            {
                            columns: [
                                {
                                    style: 'table2',
                                    table: {
                                        widths: [120, 'auto',],
                                        body: [
                                            ['Fecha de su cita',  fechaCita],
                                            ['Hora de su cita', hrCita],
                                            ['Lugar de su cita', this.direAgencia]
                                        ]
                                    },
                                    alignment: 'center', // Optional, for body texts
                                    width: 'auto' // Changes width of the table
                                }
                            ]
                            },
                            '\n',
                            {
                                text: (req.clasificacion == 'Imputado' ?('El motivo de su cita es por una denuncia penal interpuesta en su contra por '+ this.solicitadopor + ', por el delito de'+ listadelito + ' de conformidad con el Código Penal del Estado de Hidalgo, dicho delito es sancionable.') : 'El motivo de su cita es por una denuncia penal interpuesta por usted y para reunirse  con '+ this.solicitadopor + ', por el/los delito(s)'+listadelito+', de conformidad con el Código Penal del Estado de Hidalgo.')  ,
                                style: 'texto'
                            },
                            '\n',
                            {
                                text:'Sin embargo, dada la naturaleza de su asunto, la Procuraduría General de Justicia lo invita a resolver su conflicto mediante un mecanismo alternativo de solución de controversias, ANTES de que su carpeta de investigación se continúe integrando.',
                                style: 'texto'
                            },
                            '\n',
                            {
                                text:'De conformidad con los artículos 1, 4 y 14 de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal, estos mecanismos tienen como finalidad propiciar, a través del diálogo, la solución de las controversias que surjan entre miembros de la sociedad mediante procedimientos basados en la oralidad, la economía procesal y la confidencialidad. ',
                                style: 'texto'
                            },
                            '\n\n\n\n\n\n',
                            {
                                    text:  pdf_usuario + '\n' + pdf_puesto  + '\n'  +  'ADSCRITO A LA ' + pdf_agencia.toUpperCase() + '\n\n\n\n\n\n\n\n\n\n',
                                    style: 'ampo',
                            },                                           
                        )
                if(index != this.requeridoC.length-1){
                    ddd.push(
                        {
                                text: '', // No es necesario agregar un texto, solo se añadirá una nueva página
                                pageBreak: 'after' // Indica que se debe agregar una nueva página después de este elemento
                            } 
                    )
                }
            })
            ddd.push(
                {
                        text: '', // No es necesario agregar un texto, solo se añadirá una nueva página
                        pageBreak: 'after' // Indica que se debe agregar una nueva página después de este elemento
                    } 
            )
            this.solicitanteC.map((sol, index) =>{                    
                ddd.push(
                            {
                                text: pdf_dirsubproc+"\n"+pdf_agencia,
                                style: 'headertext',
                                absolutePosition: {x: 85, y: 95},
                            },
                            {
                                columns: [
                                    [
                                        {
                                            text: ' ',
                                            alignment: 'right' // Aligns 'Column 2' text to right
                                        },
                                        {
                                            columns: [
                                                {
                                                    text:'',
                                                    width: '*',
                                                },
                                                {
                                                    style: 'table1',
                                                    table: {
                                                        body: [
                                                            ['Fecha', fecha],
                                                            ['Expediente', this.noExpediente],
                                                            ['Carpeta de investigación', this.nuc],
                                                            ['Cita número', this.noCitatorioText]
                                                        ]
                                                    },
                                                    alignment: 'center', // Optional, for body texts
                                                    width: 'auto' // Changes width of the table
                                                }
                                            ]
                                        }
                                    ]
                                ]
                            },
                            '\n\n',
                            {

                                text:  sol.nombre,
                                style: 'subtitulo'
                            },
                            '\n',
                            {

                                text:  'Direccion: ' + (sol.domicilio == ', No.Ext S/N, CP 0, , , ' ? 'LO DESCONOCE':sol.domicilio),
                                style: 'texto'
                            },
                            '\n\n',
                            {
                                text:    (sol.clasificacion == 'Imputado' ? html_textoImpu1 : html_textoVict1),
                                style: 'textobold'
                            },
                            '\n',
                            {
                            columns: [
                                {
                                    style: 'table2',
                                    table: {
                                        widths: [120, 'auto',],
                                        body: [
                                            ['Fecha de su cita',  fechaCita],
                                            ['Hora de su cita', hrCita],
                                            ['Lugar de su cita', this.direAgencia]
                                        ]
                                    },
                                    alignment: 'center', // Optional, for body texts
                                    width: 'auto' // Changes width of the table
                                }
                            ]
                            },
                            '\n',
                            {
                                text: (sol.clasificacion == 'Imputado' ?('El motivo de su cita es por una denuncia penal interpuesta en su contra por '+ this.solicitadopor + ', por el delito de'+ listadelito + ' de conformidad con el Código Penal del Estado de Hidalgo, dicho delito es sancionable.') : 'El motivo de su cita es por una denuncia penal interpuesta por usted y para reunirse con '+ me.personasconRepresentantesPDF(me.requeridoC) + ', por el/los delito(s)'+listadelito+', de conformidad con el Código Penal del Estado de Hidalgo.')  ,
                                style: 'texto'
                            },
                            '\n',
                            {
                                text:'Sin embargo, dada la naturaleza de su asunto, la Procuraduría General de Justicia lo invita a resolver su conflicto mediante un mecanismo alternativo de solución de controversias, ANTES de que su carpeta de investigación se continúe integrando.',
                                style: 'texto'
                            },
                            '\n',
                            {
                                text:'De conformidad con los artículos 1, 4 y 14 de la Ley Nacional de Mecanismos Alternativos de Solución de Controversias en Materia Penal, estos mecanismos tienen como finalidad propiciar, a través del diálogo, la solución de las controversias que surjan entre miembros de la sociedad mediante procedimientos basados en la oralidad, la economía procesal y la confidencialidad. ',
                                style: 'texto'
                            },
                            '\n\n\n\n\n\n',
                            {
                                    text:  pdf_usuario + '\n' + pdf_puesto  + '\n'  +  'ADSCRITO A LA ' + pdf_agencia.toUpperCase() + '\n\n\n\n\n\n\n\n\n\n',
                                    style: 'ampo',
                            },                                           
                        )
                if(index != this.solicitanteC.length-1){
                    ddd.push(
                        {
                                text: '', // No es necesario agregar un texto, solo se añadirá una nueva página
                                pageBreak: 'after' // Indica que se debe agregar una nueva página después de este elemento
                            } 
                    )
                }
            })
            
            var dd = {          pageSize: 'LEGAL',
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
                content: ddd ,
                styles: {
                    headertext:{
                        fontSize: 10,
                        bold: true,
                    },

                    fecha:{
                        fontSize: 11,
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
                    titulo: {
                        fontSize: 11,
                        bold: true,
                        alignment: 'center',

                    },
                    DePara:{
                        fontSize: 11,
                        bold:true
                    },
                    DeParaCargo:{
                        fontSize: 10,
                        bold:true
                    },
                    table1: {
                        fontSize: 9,
                        margin: [0, 5, 0, 15],
                        alignment: 'left',
                    },
                    table2: {
                        fontSize: 9,
                        margin: [0, 5, 0, 5],
                        alignment: 'left',
                    },
                    table3: {
                        fontSize: 9,
                        margin: [0, 5, 0, 5],
                        alignment: 'center',
                    },
                    subtitulo:{
                        fontSize: 11,
                        bold: true,
                    },

                    footertext:{
                        fontSize: 7,
                        color: 'white'
                    },
                    textoDireccion:{
                        fontSize: 12,
                        alignment: 'left',
                    },
                    texto:{
                        fontSize: 10,
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
                        fontSize: 12,
                        bold: true,
                        alignment: 'center',
                    },
                    cargo:{
                        fontSize: 11,
                        regular: true,
                        alignment: 'center',
                    },
                }
            }            
            return dd;

        },        
        statusEntrega(item){
            let me= this; 
            me.citatoriorecordatorioId= item.idRCitatoriosRecordatorios; 
            me.noCitatorio= item.noCitatorio;
            me.noExpediente =item.noExpediente;
            me.v_statusEntrega= item.statusEntrega;
            me.modal_statusEntrega=true; 

        },
        guardarStatusEntrega(){ 
        
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            me.$justiciarestaurativa.put('api/CitatorioRecordatorios/StatusEntrega',{ 
                    'idRCitatoriosRecordatorios': me.citatoriorecordatorioId,
                    'statusEntrega': me.v_statusEntrega,  
                },configuracion).then(function(response){ 
                    me.$notify("El Status de Entrega se actualizo correctamente", 'success') 
                    me.listar();    
                    me.close();  
                    me.limpiar();
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
                        me.$notify('Error al intentar actualizar el registro!!!','error') 
                    } 
                });  
        },
        reimprimirCitatorio(item){
             
            let me = this;
            
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
            me.editedIndex=1;
            me.envioId= item.envioId
            
            me.sesionId = item.sesionId
                    
            me.$justiciarestaurativa.get('api/AsignacionEnvios/ListarMisEnviosME/'+ me.u_idmoduloservicio+ '/'+ me.envioId, configuracion).then(function(response){ 
               me.nuc = response.data.nuc;                 
                me.noExpediente= item.noExpediente;             
                me.oficio= item.textooficio,
                me.nombre= item.dirigidoa_Nombre;
                me.direccion= item.dirigidoa_Direccion; 
                me.solicitadopor = item.solicitadoPor;
                me.noCitatorio= item.noCitatorio;
                me.noCitatorioText= me.consultarNoCita(me.noCitatorio);
                me.uf_Distrito= item.uf_Distrito;
                me.uf_DirSubProc=item.uf_DirSubProc;
                me.uf_Agencia=item.uf_Agencia;
                me.uf_Nombre=item.uf_Nombre;
                me.uf_Puesto=item.uf_Puesto;
                me.uf_Modulo=item.uf_Modulo;
                me.fechaHoraCita=item.fechaHoraCita;                           
            }, configuracion)
            .then((response) => {
              me.$justiciarestaurativa.get('api/Sesions/ListarConjuntoPorEnvio/' + item.envioId, configuracion)
                    .then(function (response){                
                        me.vali = response.data[0].sec
                    })
                    .then(() => {
                      me.$justiciarestaurativa.get('api/SesionsConjunto/ListarSRD/' + item.sesionId, configuracion)
                            .then(function (response){                
                                me.idconjuntos = response.data[0].idConjuntoDerivaciones                
                            })
                            .then(() => {
                                me.listardelitos();
                                if(me.vali == true) {
                                    me.listarInfoSolReqC(item.sesionId)
                                } else {
                                    me.listarInfoSolReqSC()
                                }
                            })
                            .catch(function (err) {
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
                            })               
                    })
                    .catch(function (err) {
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
                    })
            })
                .catch(function (error) {
                    me.$notify('Expediente no asignado','error')
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
        async listarInfoSolReqC(sesionid){//Nueva
            let me = this;
            let header = { "Authorization": "Bearer " + this.$store.state.token};
            let configuracion = { headers: header };

            try {
                let response = await me.$justiciarestaurativa.get(`api/SesionsConjunto/ListarSRD/${sesionid}`,configuracion);
                let s = response.data;  
                    let soli = s[0].solicitadosC.replace(/;\s*/g, ",");

                let solicitanteResponse = await me.$cat.get(`api/RAPs/ListarPersonaPDF/${soli}`, configuracion);
                await Promise.all(
                    solicitanteResponse.data.map(async (dd) => {
                        let repreResponse = await me.$justiciarestaurativa.get(`api/Responsablejrs/ResponsaableXPersona/${dd.idPersona}`, configuracion);                        
                        if (repreResponse.data != undefined) {
                            me.solicitanteC = []                            
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
                        }
                    })
                    );                
                    
                    let requi = s[0].requeridosC.replace(/;\s*/g, ",");

                    let requeridoResponse = await me.$cat.get(`api/RAPs/ListarPersonaPDF/${requi}`,configuracion);

                    await Promise.all(
                    requeridoResponse.data.map(async (dd) => {
                        let repreRResponse = await me.$justiciarestaurativa.get(`api/Responsablejrs/ResponsaableXPersona/${dd.idPersona}`, configuracion);
                        me.requeridoC = []
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

                me.modal_editdirec = true
            } catch (err) {
                me.handleError(err);
            }
        },
        listarInfoSolReqSC(){
            let me = this;
            let header = { "Authorization": "Bearer " + this.$store.state.token};
            let configuracion = { headers: header };

            me.$cat.get('api/RAPs/ListarPersonaSCPDF/' + me.envioId, configuracion).then(function(response)
        {
            let a = response.data
            me.solicitanteC = []
            me.requeridoC = []
            a.map((dd) => {
                if(dd.tipo == 'Solicitante')
                {
                    me.solicitanteC.push({value:dd.idPersona,nombre:dd.nombreCompleto,edad:dd.edad,originario:dd.entidadFederativa,nacionalidad:dd.nacionalidad,sexo:dd.sexo,estadofam:dd.estadoCivil,fechanac:dd.fechaNacimiento,escolaridad:dd.nivelEstudio,ocupacion:dd.ocupacion,domicilio:dd.direccion,identificacion:dd.docIdentificacion,curp:dd.curp,telefono:dd.telefonos,clasificacion:dd.clasificacion})
                    
                }
                else {
                    me.requeridoC.push({value:dd.idPersona,nombre:dd.nombreCompleto,edad:dd.edad,originario:dd.entidadFederativa,nacionalidad:dd.nacionalidad,sexo:dd.sexo,estadofam:dd.estadoCivil,fechanac:dd.fechaNacimiento,escolaridad:dd.nivelEstudio,ocupacion:dd.ocupacion,domicilio:dd.direccion,identificacion:dd.docIdentificacion,curp:dd.curp,telefono:dd.telefonos,clasificacion:dd.clasificacion})
                    
                }
            })
        }).then(() =>
                {
                    // alertify.confirm("Domicilio del Citatorio",`La direccion de, desea cambiarla?`,
                    //     function(){
                                    me.modal_editdirec = true                   
                        // },
                        // function(){
                               
                        // });                                        
                }
            ).catch(function(err) {
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
        })
            
        }, 
        cerrarMdir(){
            let me = this;
            me.modal_editdirec=false //? AQUI SE PONE EL MODAL EN FALSO PARA QUE SE CIERRE
        },
        duardadDomPDF(){
            let me = this

            me.qrCode = ''
            me.docRemision = 'Reimpresión de citatorio de sesión'
            me.vistaPreviaTF = false
            let fechaQR = new Date()

            me.generarQR(me.docRemision, me.nuc, me.u_nombre, fechaQR, me.sesionId)           
        },
        listardelitos(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            var arrayDelito=[];
                        
            if(me.vali == true)
            {
              me.$justiciarestaurativa.get('api/Delitoes/ListarDelitoConjunto/' + me.idconjuntos).then(function(response){                
                    arrayDelito = response.data;
                me.v_delitos = []
                arrayDelito.map(function(x){
                    me.v_delitos.push({text: x.nombreDelito, valor1: x.intensionDelito, valor2: x.violenciaSinViolencia, valor3: x.armaBlanca, valor4: x.armaFuego, valor5: x.conAlgunaParteCuerpo, valor6: x.conotroElemento});
                });
            }).catch(function(err){
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
            else{
              me.$justiciarestaurativa.get('api/Delitoes/ListarDelitos/'+ me.envioId, configuracion).then(function(response){                
                arrayDelito = response.data;
                arrayDelito.map(function(x){
                    me.v_delitos.push({text: x.nombreDelito, valor1: x.intensionDelito, valor2: x.violenciaSinViolencia, valor3: x.armaBlanca, valor4: x.armaFuego, valor5: x.conAlgunaParteCuerpo, valor6: x.conotroElemento});
                });
            }).catch(function(err){
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
        }, 
        consultarNoCita(nocita){
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
        filtrar(){
            let me=this;
            me.filtros =true; 
        } ,
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
            me.$notify("Error al intentar crear el código QR", "error");
            }
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
    }
    
   }
</script>
 