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
                    <v-toolbar-title class="font-weight-regular" >Busqueda general.</v-toolbar-title>
                   
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
                         
                        <td>{{ props.item.distrito }}</td>
                        <td>{{ props.item.uqe_Agencia }}</td> 
                        <td>{{ props.item.uqe_Nombre }}</td>  
                        <td>{{ props.item.noExpediente }}</td>  
                        <td>{{ formatearfechahora(props.item.fechaRegistroExpediente)}}</td>   
                        <td>{{ props.item.nuc}}</td>
                        <td>{{ props.item.statusAcepRech }}</td>    
                        <td>{{ props.item.statusGeneral }}</td>
                        <td>{{ props.item.nombre + ' ' + props.item.apellidoPaterno + ' ' + props.item.apellidoMaterno + ' / ' + props.item.clasificacion }}</td>
                          <td>{{ props.item.infoConclusion }}</td>
                        <td class="justify-center layout px-0"> 
                            <v-tooltip bottom   >
                                    <template v-slot:activator="{ on }">
                                        <v-icon  class="mr-2" color="info"  v-on="on" @click="abrirExpediente(props.item)">
                                        remove_red_eye
                                        </v-icon>
                                    </template>
                                    <span>Ver detalles</span>
                            </v-tooltip>  
                        </td>
                    </template>
                    <template slot="no-data">
                    <v-btn color="primary"  @click="listarDerivaciones" >Cargar</v-btn>
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
                                    <v-text-field  
                                                    label="Nuc:" 
                                                    hint="DISTRTO / AÑO / CONSECUTIVO" 
                                                    v-model="nuc"     >
                                        
                                    </v-text-field>
                                     <v-text-field  
                                                    label="Expediente:" 
                                                    hint="PREFIJO / #### - AÑO / DISTRITO" 
                                                    v-model="noExpediente"     >
                                        
                                    </v-text-field>
                                    <v-text-field  
                                                    label="Nombre(s):" 
                                                    v-model="nombres"     >
                                        
                                    </v-text-field>
                                    <v-text-field  
                                                label="Apellido paterno:" 
                                                v-model="apaterno" 
                                                >
                    
                                    </v-text-field>
                                    <v-text-field  
                                                    label="Apellido materno:" 
                                                    v-model="amaterno"  
                                                    >
                    
                                    </v-text-field>

                        
                
                </v-card-text> 
                    <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click.native="filtros=false" >Cancelar</v-btn>
                            <v-btn @click.native="listarDerivaciones()" class="success" >Consultar</v-btn>
                        </v-card-actions>
            </v-card>

        </v-dialog>   

        <v-dialog v-model="modalInfo"  max-width="800px"> 
            <v-card>
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar  size="30">
                        <v-icon class="grey lighten-2">info</v-icon>
                    </v-avatar> 
                    <v-toolbar-title class="subheading">Aquien se le asigno el expediente</v-toolbar-title>
                    <v-spacer></v-spacer>     
            </v-toolbar>
                    <v-card-text> 
                        <v-flex px-5 xs12 sm12 md12>
                            <p px-5 class="subheading">N° Expediente:<b> {{ noExpediente }}</b></p> 
                        </v-flex>
                        <v-layout row>
                            
                        <v-flex px-5  xs6>
                            <v-card-text>  
                            <table>
                                <tr>
                                    <td  > Nombre: </td>
                                    <td><b> {{ nombre1}}</b></td> 
                                </tr>
                                <tr>
                                    <td>Puesto</td>
                                    <td><b> {{ puesto1 }}</b></td>
                                </tr>
                                <tr>
                                    <td>Telefono:</td>
                                    <td><b>{{ telefono1}} </b></td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td><b>{{ email1 }} </b></td>
                                </tr>
                                <tr>
                                    <td>direccion:</td>
                                    <td><b>{{ direccion1 }} </b></td>
                                </tr>
                                <tr>
                                    <td>Status:</td>
                                    <td><b>{{ condicion1 }} </b></td>
                                </tr>
                                
                            
                                <br>
                            </table> 
                            </v-card-text>
                        </v-flex>
                        <v-flex px-5  xs6>  
                            <v-card-text> 
                            <table>
                                <tr>
                                    <td  > Nombre: </td>
                                    <td><b> {{ nombre2}}</b></td> 
                                </tr>
                                <tr>
                                    <td>Puesto</td>
                                    <td><b> {{ puesto2 }}</b></td>
                                </tr>
                                <tr>
                                    <td>Telefono:</td>
                                    <td><b>{{ telefono2}} </b></td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td><b>{{ email2 }} </b></td>
                                </tr>
                                <tr>
                                    <td>direccion:</td>
                                    <td><b>{{ direccion2}} </b></td>
                                </tr>
                                <tr>
                                    <td>Status:</td>
                                    <td><b>{{ condicion2 }} </b></td>
                                </tr>
                                
                            
                                <br>
                            </table> 
                            </v-card-text>
                        </v-flex>
                        </v-layout>
                        
                        
                    </v-card-text>  
                <v-divider  class="mx-0" ></v-divider>
                <v-card-actions  >
                    <v-spacer ></v-spacer>
                    <v-btn class="mx-5" @click="modalInfo=false"   small outline color="success">
                    CERRAR
                    </v-btn> 
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
 
    
    import moment from 'moment'
    import 'moment/locale/es';
import { computed } from 'vue';
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
                    
                    { text: 'Distrito', value: 'distrito' },
                    { text: 'Agencia', value: 'uqe_Agencia' },
                    { text: 'AMPO', value: 'uqe_Nombre' }, 
                    { text: 'No Expediente', value: 'noExpediente' }, 
                    { text: 'Fecha', value: 'fechaRegistro' }, 
                    { text: 'NUC', value: 'nuc' },  
                    { text: 'Status', value: 'statusAcepRech' },
                    { text: 'Status conclusion', value: 'statusGeneral' },
                    { text: 'Persona', value: 'nombre' },  
                    { text: 'Status', value: 'infoConclusion' },                                 
                    { text: 'Ver', value: '', sortable: false },
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
                contador:0,
                iddistrito:'',
                nuc:'',
                noExpediente:'',
                nombres:'',
                apaterno:'',
                amaterno:'',
                
                modulo1:'',
                modulo2:'',

                nombre1:'',
                puesto1:'',
                telefono1:'',
                email1:'',
                direccion1:'',
                condicion1:'',

                nombre2:'',
                puesto2:'',
                telefono2:'',
                email2:'',
                direccion2:'',
                condicion2:'',
                modalInfo:false,
                noExpediente:'',

                 
                 
                 
           
            }
        },
        
        watch: {
             
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
            me.iddistrito=me.$store.state.usuario.iddistrito;
    
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
                debugger
                if (me.nuc=="")
                {
                    me.nuc="NA"
                }
                var expedienteHex ="";
                if (me.noExpediente=="")
                {
                    expedienteHex="NA"
                }
                else
                {
                   expedienteHex = me.hexa(me.noExpediente); 
                }
                if (me.nombres=="")
                {
                    me.nombres="NA"
                }
                if (me.apaterno=="")
                {
                    me.apaterno="NA"
                }
                if (me.amaterno=="")
                {
                    me.amaterno="NA"
                }

                me.$conf.get('api/Distritoes/StatusAsignado', configuracion).then(function(response){ 
                    if (response.data.idDistrito == '7f662ec1-6705-406e-bcd0-f56ade7bcae2')
                    {
                      me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/ListarBusquedaGeneral1/' +   me.nuc +'/'+expedienteHex+'/'+me.nombres+'/'+ me.apaterno+'/'+me.amaterno, configuracion).then(function(response){ 
                            me.derivaciones=response.data;
                            me.filtros=false;
                            me.contador = response.data.length;
                            me.nuc="";
                            me.noExpediente="";
                            me.nombres="";
                            me.apaterno="";
                            me.amaterno="";
                            
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
                    else
                    {
                      me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/ListarBusquedaGeneral2/' + me.nuc +'/'+expedienteHex+'/'+me.nombres+'/'+ me.apaterno+'/'+me.amaterno, configuracion).then(function(response){ 
                            me.derivaciones=response.data;
                            me.filtros=false;
                            me.contador = response.data.length;
                            me.nuc="";
                            me.noExpediente="";
                            me.nombres="";
                            me.apaterno="";
                            me.amaterno="";
                            
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

               
              
                
            },
            
            
            hexa(str)
            {
                var arr1 = [];
                for (var n = 0, l = str.length; n < l; n ++) 
                {
                    var hex = Number(str.charCodeAt(n)).toString(16);
                    arr1.push(hex);
                }
                return arr1.join('');
            },
            abrirExpediente(item)
            { 
                

                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                me.noExpediente=item.noExpediente;
    
                me.$justiciarestaurativa.get('api/AsignacionEnvios/ListarIdEnvioAll/' +  item.idEnvio, configuracion).then(function(response){ 
                   
                     me.modulo1= response.data[0].modulo1;
                     me.modulo2=response.data[0].modulo2;

                    axios.all([ 
                        me.$controlacceso.get('api/Usuarios/ListarModulo/'+ me.modulo1 , configuracion), 
                        me.$controlacceso.get('api/Usuarios/ListarModulo/'+ me.modulo2 , configuracion)
                    ]).then(responseArr => {
 
                        me.nombre1 = responseArr[0].data.nombre;
                        me.puesto1= responseArr[0].data.puesto;
                        me.telefono1=responseArr[0].data.telefono;
                        me.email1= responseArr[0].data.email;
                        me.direccion1 = responseArr[0].data.direccion;
                        me.condicion1= responseArr[0].data.condicion;

                        me.nombre2 = responseArr[1].data.nombre;
                        me.puesto2= responseArr[1].data.puesto;
                        me.telefono2=responseArr[1].data.telefono;
                        me.email2= responseArr[1].data.email;
                        me.direccion2 = responseArr[1].data.direccion;
                        me.condicion2= responseArr[1].data.condicion;


                        me.modalInfo=true;


                    
                    
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
            formatearfechahora: function(fecha){
                return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
            },
            formatearfecha: function(fecha){
                return moment(fecha).format('YYYY-MM-DD')
            },
            download : function() {
                const data = XLSX.utils.json_to_sheet(this.derivaciones)
                const wb = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(wb, data, 'data')
                XLSX.writeFile(wb,'lista.xlsx')
            },
         
             
            filtrar(){
                let me=this;
                me.filtros =true;

            } 
           
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

 