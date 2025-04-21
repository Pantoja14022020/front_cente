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
                    <v-toolbar-title class="font-weight-regular" >Derivaciones.</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider> 
                    <v-badge
                        v-model="show"
                        color="cyan"
                        right
                        >
                        <template v-slot:badge>
                            <span>   {{  contador  }}</span>
                        </template>
                        <v-icon
                            large
                            color="grey lighten-1"
                        >folder</v-icon>
                    </v-badge>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer> 
                    <v-btn  @click="filtrar()" fab small  class="mb-2 primary"><v-icon>filter_list</v-icon></v-btn>
                    <v-btn  @click="download()" fab small  class="mb-2 primary"><v-icon>cloud_download</v-icon></v-btn>
                  

            
                    
                </v-toolbar>
             <v-data-table
                    :headers="headers"
                    :items="derivaciones"
                    :search="search" 
                    :rows-per-page-items="rowsPerPageItems"
                    :pagination.sync="pagination"  >
                    <template slot="items" class="white" slot-scope="props">
                        
                        <td>{{ props.item.autoridadqueDeriva }}</td>
                        <td>{{ props.item.uqe_Agencia }}</td> 
                        <td>{{ props.item.uqe_Nombre }}</td> 
                        <td>{{ props.item.espontaneoNoEspontaneo }}</td>
                        <td>{{ props.item.contadorNODerivacion}}</td>  
                        <td>{{ formatearfechahora(props.item.fechaRegistroExpediente)}}</td>   
                        <td>{{ props.item.nuc}}</td>
                        <td>{{ props.item.statusGeneralEnvio }}</td> 
                       
                          <td class="justify-center layout px-0"> 
                                <v-tooltip bottom   >
                                    <template v-slot:activator="{ on }">
                                        <v-icon 
                                            class="mr-2" v-on="on" color="primary" 
                                            @click="historial(props.item)"
                                            >
                                        restore
                                        </v-icon> 
                                    </template>
                                    <span>Historial del expediente</span>
                                </v-tooltip>    

                                <v-tooltip bottom   >
                                    <template v-slot:activator="{ on }" v-if="props.item.statusGeneralEnvio=='No procedente'">
                                        <v-icon 
                                            class="mr-2" v-on="on" color="primary" 
                                            @click="reimprimirRegistro(props.item)"
                                            >
                                        print
                                        </v-icon> 
                                    </template>
                                    <span>Imprimir registro</span>
                                </v-tooltip>    
                        </td>  
                         
                    </template>
                    <template slot="no-data">
                    <v-btn color="primary"  @click="listarDerivaciones()" >Cargar</v-btn>
                    </template>
            </v-data-table>  
        </v-flex> 

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
                      <a>Selecciona el rango de fechas en que se realizo la derivación</a>
                      
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
                                  <v-select
                                  
                                        :items="status"
                                        v-model="statusSelected" 
                                        label="Status:" 
                                        chips  
                                    ></v-select>
                    
                
                </v-card-text> 
                    <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click.native="filtros=false" >Cancelar</v-btn>
                            <v-btn @click.native="listarDerivaciones()" class="success" >Consultar</v-btn>
                        </v-card-actions>
            </v-card>

        </v-dialog>   

    <v-dialog v-model="modalInfo"  max-width="1000px"> 
        <v-card>
            <v-toolbar card dark color="grey lighten-4 primary--text">
                <v-avatar  size="30">
                    <v-icon class="grey lighten-2">info</v-icon>
                </v-avatar> 
                <v-toolbar-title class="subheading">Historial del expediente</v-toolbar-title>
                <v-spacer></v-spacer>     
           </v-toolbar>
                <v-card-text> 
                    <v-flex px-5 xs12 sm12 md12>
                         
                        <p px-5 class="subheading">Número Único de Caso:<b> {{ nuc }}</b></p>
                      
                        <div v-if="noExpediente==null">
                            <p px-5 class="subheading">N° Expediente:<b> Sin Número de Expediente</b></p>
                        </div>
                         <div v-else>
                            <p px-5 class="subheading">N° Expediente:<b>{{ noExpediente }}</b></p>
                        </div>
                        
                        
                    </v-flex>
                    <v-layout row>
                         
                    <v-flex px-5  xs12 sm12 m12>
                        <v-card-text>  
                               <v-timeline>
                                    <v-timeline-item
                                        v-for="h in historialExpediente"
                                        :key="h"
                                        color="cyan"
                                        large
                                    >
                                        <template v-slot:opposite>
                                         <span> Información</span>
                                        </template>
                                        <v-card class="elevation-2">
                                        <v-card-title class="headline"> </v-card-title>
                                        <div v-if="h!=''">
                                            <v-card-text v-html="h.text">
                                            
                                            </v-card-text>
                                        </div>
                                       
                                        </v-card>
                                    </v-timeline-item>
                                    </v-timeline>
                        </v-card-text>
                    </v-flex>
                
                    </v-layout>
                   
                </v-card-text>  
            <v-divider  class="mx-0" ></v-divider>
            <v-card-actions  >
                <v-spacer ></v-spacer>
                
            </v-card-actions>
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
    import n401 from '../../components/m_jr/401.vue'
    import n403 from '../../components/m_jr/403.vue' 
    import { error } from 'util';
    import { generarQRCodeBase64 } from './crearQR'; 
    
    import moment from 'moment'
    import 'moment/locale/es';
    export default {
         components: {  
                    n401,
                    n403
                }, 
        data(){
            return {      
                   
                //-------Logos-----------------------------------------/
                   show: true, 
                //************************* */ 
                headers: [ 
                    { text: 'Autoridad quien deriva', value: 'autoridadqueDeriva' },
                    { text: 'Agencia', value: 'uqe_Agencia' },
                    { text: 'AMPO', value: 'uqe_Nombre' },
                    { text: 'Con persona/Sin persona', value: 'espontaneoNoEspontaneo' }, 
                    { text: 'No Derivación', value: 'noDerivacion' }, 
                    { text: 'Fecha', value: 'fechaRegistroExpediente' }, 
                    { text: 'NUC', value: 'nuc' },  
                    { text: 'Status', value: 'statusAcepRech' },    
                     { text: 'Opciones', value: 'opciones' },                                 
                ],
               
                /****************************************************************************** */
                showpage:true,
                e401:false,
                e403:false,
                search: '',
                rowsPerPageItems: [10, 20, 30, 40, 50],
                pagination: {
                    rowsPerPage: 50
                },
                /**************** */
                 
                derivaciones:[],
                
                //*************** */
              
                
                filtros:false,


                v_menu1:false,
                v_fechaInicial:'',
                v_fechaI:'',

                v_menu2:false,
                v_fechaFinal:'',
                v_fechaF:'',
                contador:0,

              
                
                status:['Solicitado','Procedente','No procedente','En trámite', 'Concluido', 'Baja','Todos'],
                statusSelected:'',


                modalInfo:false,
                noExpediente:'',
                nuc:'',
                historialExpediente:[], 

                tipo: "",
                textolibre: "",
                vl_distrito: "",
                vl_dirSubProc: "",
                vl_agencia: "",
                vl_nombre: "",
                vl_puesto:"",
                texto:"",
                qrCode: null,
                 
           
            }
        },
        
        watch: {
             
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

        created () {
           
            
            let me = this  
            me.u_iddistrito=me.$store.state.usuario.iddistrito;
            me.u_distrito=me.$store.state.usuario.distrito;
            me.u_dirSubPro=me.$store.state.usuario.dirSubProc;
            me.u_idagencia=me.$store.state.usuario.idagencia;
            me.u_agencia=me.$store.state.usuario.agencia;
            me.u_idmoduloservicio=me.$store.state.usuario.idmoduloservicio;
            me.u_modulo=me.$store.state.usuario.modulo;
            me.u_idusuario=me.$store.state.usuario.idusuario;
            me.u_clave=me.$store.state.usuario.clave;
            me.u_rol=me.$store.state.usuario.rol;
            me.u_email=me.$store.state.usuario.email;

            me.u_subproc = me.$store.state.usuario.subProc;

            //*********************************************** */ 
            //me.v_fechaI= moment(new Date()).format("YYYY-MM-DD");
            //me.v_fechaF=  moment(new Date()).format("YYYY-MM-DD");
            me.statusSelected="Todos"
           
            me.listarDerivaciones(); 
            me.listarLogo();
            me.informacionagencia();
    
    
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
        methods:{  
            
                
             
            listarDerivaciones(){
            
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};


               
                me.$justiciarestaurativa.get('api/Expedientes/ListarTodasFiltro/' +  me.u_iddistrito + '/'+ me.v_fechaI +" 00:00:00"+'/'+me.v_fechaF+" 23:59:59"+'/'+me.statusSelected, configuracion).then(function(response){ 
                    me.derivaciones=response.data;
                    me.filtros=false;
                    me.contador = response.data.length;  
                    
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
            formatearfechahora: function(fecha){
                return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
            },
            download : function() {
                const data = XLSX.utils.json_to_sheet(this.derivaciones)
                const wb = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(wb, data, 'data')
                XLSX.writeFile(wb,'lista.xlsx')
            },
            formatearfecha: function(fecha){
                  return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
            },
            formatearlapso: function(fr, fa){ 
                var a = moment(fa);//now
                var b = moment(fr);

                return (a.diff(b, 'days')) + ' dia(s)'
              
            },
            filtrar(){
                let me=this;
                me.filtros =true;

            },
            historial(item){
                let me= this; 

                me.nuc = item.nuc;
                me.noExpediente = item.noExpediente;
                var Array=[];
                me.historialExpediente=[];
                Array = item.informacionStatus.split("<br>"); 
                debugger
                Array.map(function(x){
                    debugger
                    if (x != "")
                    {
                        me.historialExpediente.push({text: x});
                    }

                    
                });

                me.modalInfo = true;

            }, 
            //Api de listado de logo, ya que al no usar pdf no se ocupaba
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
            //Informacion de la agencia para el pie de pagina del pdf
            informacionagencia(){
                let me=this;
                me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia).then(function(response){
                    me.direccionAgencia=response.data.direccion;
                    me.telefonosAgencia= response.data.telefono;
                }).catch(function(error){
                    me.$notify('Error al intentar leer la informacion de agencia!!!','error')
                });
            },
            //Funcion para la reimpresion del registro cuando un expediente no procede
            reimprimirRegistro(item)
            {
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};

                //Nueva api en back que trae la informacion del registro
                me.$justiciarestaurativa.get('api/Registros/ListarRegistroEspecifico/'+item.idExpediente, configuracion).then(function(response)
                { 

                    //Een caso de existir registro se guarda la informacion general en variables globales para su impresion
                    if(response.data.ner != 1)
                    {
                        me.tipo = response.data.tipo;
                        me.textolibre = response.data.descripcion;
                        me.vl_distrito = response.data.distrito;
                        me.vl_dirSubProc = response.data.dirsubproc;
                        me.vl_agencia = response.data.agencia;
                        me.vl_nombre = response.data.usuario;
                        me.vl_puesto = response.data.puesto;

                        me.nuc = item.nuc;
                        
                        me.editedIndex = 1;
                        me.texto =me.tipo + " de derivacion de la carpeta " + me.nuc+ " firmado por " + me.vl_nombre; 
                        me.generarQR(me.texto);


                        //Un segundo de espera para que tenga valor el QR
                        setTimeout(() => {
                            me.guardarImprimirRegistro();
                        }, 1000);
                    }
                    //En caso de no encontrar registro solo da esta notificacion
                    else
                    {
                        me.$alert('Notificación', 'No hay registros debido a que el expediente fue rechazado antes de la actualizacion en Sistema Centenario que incluye dichos registros');
                    }

                }, configuracion).catch(function(error)
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
            //AQui solo se copio las funciones del pdf, hay ifs debido a la nueva creacion o reimpresion de registros, lo dejo porque es muy probable que soliciten que se puedan crear el registro,
            //si no, el codigo no estorba, solo cae siempre en la primera condicion del if
            guardarImprimirRegistro() 
            {
                let me = this;
                let header = { Authorization: "Bearer " + this.$store.state.token };
                let configuracion = { headers: header };

                if (me.editedIndex == 1) 
                {
                    var dd = me.crearPdf_Bitacora();
                    var pdfMake = require("pdfmake/build/pdfmake.js");
                    var htmlToPdfmake = require("html-to-pdfmake");
                    if (pdfMake.vfs == undefined) {
                        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
                        pdfMake.vfs = pdfFonts.pdfMake.vfs;
                    }
                    var doc = pdfMake.createPdf(dd).print();
                    me.closeModal();
                } 
                else 
                {
                    me.$confirm(
                    "Esperando confirmación",
                    "Estas seguro de  que deseas guardar información e imprimir el documento. Una vez realizada esta accion no prodra realizar cambios",
                    function () 
                    {
                      me.$justiciarestaurativa.post("api/Registros/CrearRegistro",
                        {
                            //***************************** PERSONA*/
                            EnvioId: me.v_envioId,
                            Tipo: me.tipo,
                            QuienPorRegistro: me.quienPor,
                            Descripcion: me.textolibre,
                            Distrito: me.u_distrito,
                            Dirsubproc: me.u_subproc,
                            Agencia: me.u_agencia,
                            Usuario: me.u_nombre,
                            Puesto: me.u_puesto,
                            Fechasis: me.fechareporte,
                            Numerooficio: "",
                            //************************************ */
                        },configuracion).then(function (response) 
                        {
                            var dd = me.crearPdf_Bitacora();
                            var pdfMake = require("pdfmake/build/pdfmake.js");
                            var htmlToPdfmake = require("html-to-pdfmake");
                            if (pdfMake.vfs == undefined) {
                            var pdfFonts = require("pdfmake/build/vfs_fonts.js");
                            pdfMake.vfs = pdfFonts.pdfMake.vfs;
                            }
                            var doc = pdfMake.createPdf(dd).print();

                            me.$notify("La información se guardo correctamente !!!","success");
                            me.modal_Bitacora = false;
                            me.listar();
                            me.closeModal();
                        })
                        .catch((err) => {
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
                                "Error al intentar crear el  registro!!!",
                                "error"
                            );
                            }
                        });
                    },
                    function () {
                        alertify.warning("Verifica la información");
                    }
                    ).set("labels", { ok: "Guardar", cancel: "Cancelar" });
                }
            },
            //Funcion sencilla para limpiar los datos del registro
            closeModal()
            {
                let me=this; 

                me.tipo = '';
                me.quienPor = '';
                me.textolibre = '';
            },
            //Funcion que llama a la creacion de codigo QR
            async generarQR(texto) {

                let me=this; 

                try {
                    me.qrCode = await generarQRCodeBase64(texto);

                    console.log(me.qrCode);
                } catch (err) {
                    console.error('Error:', err);
                }
            },
            //La misma situacion de los ifs, es todo el de registro
            crearPdf_Bitacora() 
            {
                let me = this;
                var pdfMake = require("pdfmake/build/pdfmake.js");
                var htmlToPdfmake = require("html-to-pdfmake");
                var logo1 = this.logo1;
                var logo2 = this.logo2;
                var logo3 = this.logo3;
                var logo4 = this.logo4;
                var pdf_diragencia = "";
                var pdf_telagencia = "";
                var dia = "";
                var mes = "";
                var año = "";
                var hr = "";
                var fechasys = "";
                var fecha = "";
                var pdf_distrito = "";
                var pdf_dirSubProc = "";
                var pdf_agencia = "";
                var pdf_usuario = "";
                var pdf_puesto = "";
                var exp = this.v_noExpediente;
                if (this.editedIndex == -1) 
                {
                    pdf_diragencia = this.direccionAgencia;
                    pdf_telagencia = this.telefonosAgencia;
                    dia = moment().format("DD");
                    mes = moment().format("MMMM");
                    año = moment().format("YYYY");
                    hr = moment().format("h:mm:ss a");
                    fecha = dia + " de " + mes + " del " + año + ", " + hr;
                    pdf_distrito = this.u_distrito;
                    pdf_dirSubProc = this.u_dirSubProc;
                    pdf_agencia = this.u_agencia;
                    pdf_usuario = this.u_nombre;
                    pdf_puesto = this.u_puesto;
                } else if (this.editedIndex == 1) {
                    pdf_diragencia = this.direccionAgencia;
                    pdf_telagencia = this.telefonosAgencia;
                    fechasys = moment(this.vl_fechasys, "YYYY-MM-DD HH:mm:ss");
                    dia = moment(this.vl_fechasys).format("DD");
                    mes = moment(this.vl_fechasys).format("MMMM");
                    año = moment(this.vl_fechasys).format("YYYY");
                    hr = moment(this.vl_fechasys).format("h:mm:ss a");
                    fecha = dia + " de " + mes + " del " + año + ", " + hr;
                    pdf_distrito = this.vl_distrito;
                    pdf_dirSubProc = this.vl_dirSubProc;
                    pdf_agencia = this.vl_agencia;
                    pdf_usuario = this.vl_nombre;
                    pdf_puesto = this.vl_puesto;
                }
                var u_dirSubPro = this.u_dirSubPro;
                var u_agencia = this.u_agencia;
                var u_subProc = this.u_subproc;
                var htmltexto = htmlToPdfmake(this.textolibre);

                var dd = 
                {
                    pageSize: "LEGAL",
                    pageOrientation: "portrait",
                    pageMargins: [85, 130, 72, 60],
                    footer: function (currentPage, pageCount) {
                    const footerContent = [
                        {
                        image: logo4,
                        width: 612,
                        absolutePosition: { x: 0, y: 0 },
                        },
                        {
                        text:
                            pdf_diragencia +
                            "\n" +
                            pdf_telagencia +
                            "\n" +
                            "www.hidalgo.gob.mx",
                        style: "subheaderlogo",
                        style: "PiePagina",
                        margin: [312, 12, 72, 0],
                        alignment: "right",
                        absolutePosition: { x: 0, y: 30 },
                        },
                    ];

                    footerContent.push({
                    image: me.qrCode,
                    width: 80, // Ajusta el ancho según tu diseño
                    height: 80, // Ajusta la altura según tu diseño
                    absolutePosition: { x: 5, y: -20 }, // Ajusta las coordenadas según tu diseño
                });


                    return footerContent;
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
                        text: u_subProc + "\n" + u_dirSubPro + "\n" + u_agencia,
                        style: "Adscripcion",
                        absolutePosition: { x: 85, y: 95 },
                    },
                    {
                        text: "Número de NUC: " + me.nuc,
                        style: "Titulo",
                        alignment: "right",
                        absolutePosition: { x: 85, y: 150 },
                    },
                    {
                        text: "\n\n\n\n\n" + this.tipo,
                        style: "Titulo",
                    },
                    "\n\n",
                    {
                        text: htmltexto,
                        style: "Texto",
                    },               
                    "\n\n\n",
                    {
                        text: "\n\n\n\n\n" + "A T E N T A M E N T E" + "\n\n\n\n\n",
                        alignment: "justify",
                        style: "DePara",
                    },
                    {
                        text: pdf_usuario + "\n\n",
                        alignment: "justify",
                        style: "DePara",
                    },
                    {
                        text: pdf_puesto + "\n\n",
                        alignment: "justify",
                        style: "DePara",
                    },
                    {
                        text: pdf_agencia + "\n\n",
                        alignment: "justify",
                        style: "DePara",
                    },
                    {
                        image: me.qrCode,
                        width: 200,
                        alignment: 'center',
                        margin: [0, 15, 0, 15]
                    },
                    ],
                    styles: {
                    Adscripcion: {
                        fontSize: 10,
                        bold: true,
                    },
                    Fecha: {
                        fontSize: 9,
                    },
                    Nooficio: {
                        fontSize: 8,
                        bold: true,
                    },
                    DePara: {
                        fontSize: 10,
                        bold: true,
                    },
                    DeParaCargo: {
                        fontSize: 9,
                        bold: true,
                    },
                    PiePagina: {
                        fontSize: 7,
                    },
                    Texto: {
                        fontSize: 10,
                        alignment: "justify",
                    },
                    Titulo: {
                        fontSize: 12,
                        bold: true,
                        alignment: "center",
                    },
                    SubTitulo: {
                        fontSize: 11,
                        semibold: true,
                    },
                    },
                };
                return dd;
            },


           
        }        
    }
</script>
<style> 
    #logo1 {
        float: left;
        margin-left: 2%;
        margin-right: 2%;
    }
    #logo2 {
        float: right;
        margin-left: 2%;
        margin-right: 2%;
    }
    #imagen1 {
        width: 297px;
    }
     #imagen2 {
        width: 95px;
    }
   #datos {
         
        margin-top: 2%;
        margin-left: 2%;
        margin-right: 2%;
        text-align: right;
    }

    #encabezado {
        text-align: right;
        margin-left: 10px;
        margin-right: 10px;
        font-size: 27px;
    }
    #cuerpo {
     
        margin-top: 2%;
        margin-left: 2%;
        margin-right: 2%;
        text-align: justify;
    }
    .titulo {
         font-size: 22px;
    }
    .texto{
        font-size: 20px;
        
    }
    .tituloright {
         font-size: 22px;
         text-align: right;
    }
    .textoright{
        font-size: 20px;
        text-align: right;
    }
    #formato {
        text-align: left;
        margin-left: 10px;
        margin-right: 10px;
        font-size: 20px;
    }
     #titcenter { 
        text-align: center;
    }
     section {
        clear: left;
    }

    
    #footer {
        margin-top: 20%;
        text-align: center;
    }
    .table {
         width:100%;
          margin-top: 10px;
        margin-left: 10px;
         border-collapse:collapse;
        border-spacing:30px;
      }
</style>

 