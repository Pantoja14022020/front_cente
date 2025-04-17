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
            <v-toolbar-title class="font-weight-regular" >Re-Asignación de expediente.</v-toolbar-title>
            
            <v-divider class="mx-2" inset vertical></v-divider>
            
            <v-spacer></v-spacer>
            <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
            
                  <v-btn  @click="download ()" fab small  class="mb-2 primary"><v-icon>cloud_download</v-icon></v-btn>
          
               
        </v-toolbar>
            <v-data-table
                    :headers="headers"
                    :items="expedientes"
                    :search="search" 
                    :rows-per-page-items="rowsPerPageItems"
                    :pagination.sync="pagination"  >
                    <template slot="items" class="white" slot-scope="props">
                        
                        <td>{{ props.item.noExpediente }}</td> 
                        <td>{{ props.item.autoridadqueDeriva }}</td>   
                        <td>{{ props.item.contadorNODerivacion }}</td>  
                        <td>{{ formatearfechahora(props.item.fechaRegistroExpediente)}}</td>   
                        <td>{{ props.item.nuc}}</td>
                        <td>{{ props.item.statusGeneralEnvio }}</td>    
                        <td>{{ props.item.facilitador }}</td> 
                        <td>{{ props.item.notificador }}</td>  
                        <td class="justify-center layout px-0"> 
                                <v-tooltip bottom   >
                                    <template v-slot:activator="{ on }">
                                        <v-icon 
                                            class="mr-2"   v-on="on" color="default" 
                                            @click="reasignar(props.item)"
                                            >
                                        edit
                                        </v-icon> 
                                    </template>
                                    <span>Reasignar expediente</span>
                                </v-tooltip>    
                        </td> 
                    </template>
                    <template slot="no-data">
                    <v-btn color="primary"  @click="listar" >Cargar</v-btn>
                    </template>
            </v-data-table> 
    </v-flex> 
 
    <v-dialog v-model="modalInfo"  max-width="800px"> 
        <v-card>
            <v-toolbar card dark color="grey lighten-4 primary--text">
                <v-avatar  size="30">
                    <v-icon class="grey lighten-2">edit</v-icon>
                </v-avatar> 
                <v-toolbar-title class="subheading">Reasignar el expediente</v-toolbar-title>
                <v-spacer></v-spacer>     
           </v-toolbar>
                <v-card-text> 
                    <v-flex px-5 xs12 sm12 md12>
                        <p px-5 class="subheading">N° Expediente:<b> {{ noExpediente }}</b></p>
                        <p px-5 class="subheading">Asignado a: <b>{{ nombreModulo }}</b> </p>
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
                    <v-flex px-5 xs12 sm12 md12>
                            <p class="subheading">Selecciona en facilitador para la nueva asignación:</p>
                            <v-autocomplete name="facilitador"
                                            :items="facilitadores" 
                                                @click.native.stop
                                            v-model="facilitador" 
                                            label="Facilitador:" 
                                            return-object 
                            ></v-autocomplete>
                    </v-flex> 
                    <v-flex px-5 xs12 sm12 md12>
                            <p class="subheading">Selecciona en notificador para la nueva asignación:</p>
                            <v-autocomplete name="notificador"
                                                :items="notificadores" 
                                                 @click.native.stop
                                                v-model="notificador" 
                                                label="Notificador:"  
                                                return-object 
                                    ></v-autocomplete>
                    </v-flex> 
                </v-card-text>  
            <v-divider  class="mx-0" ></v-divider>
            <v-card-actions  >
                <v-spacer ></v-spacer>
                <v-btn class="mx-5" @click="guardarReasignacion"   small outline color="success">
                   Re-asignar
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
   
  import { error } from 'util';
 
 //** COMPONENTES */
  import n401 from '../../components/m_jr/401'
  import n403 from '../../components/m_jr/403'
 


  import moment from 'moment'
  import 'moment/locale/es';
  import alertify from 'alertifyjs';
  import { VueEditor } from "vue2-editor";
  
  import infoUsuario from '../../components/m_jr/InfoUsuario'
import { normalize } from 'path'
  export default {
    components: {  
        n401,
        n403,
        "vue2-editor": VueEditor ,
        infoUsuario,
       
    },
    data: function () {
        return {
            e401:false, 
            e403:false,
            showpage:true,  
            renderComponent: false,
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
                { text: 'Autoridad que deriva', value: 'autoridadqueDervia' }, 
                { text: 'No Derivación', value: 'noDerivacion' }, 
                { text: 'Fecha', value: 'fechaRegistro' }, 
                { text: 'NUC', value: 'nuc' },   
                { text: 'Status', value: 'statusGeneral', sortable: false }, 
                { text: 'Asignado a:', value: 'facilitador' }, 
                { text: 'Asignado a:', value: 'notificador' },  
                { text: 'Opciones', value: 'opciones', sortable: false }, 
                                              
            ],
            search: '',
            rowsPerPageItems: [10, 20, 30, 40, 50],
            pagination: {
                rowsPerPage: 20
            },
            editedIndex: -1, 
            //************************************** 
            expedientes:[], 
            sesions:[],
            //************************************** 
            asingacionEnvioId1:'',
            asingacionEnvioId2:'',
            modalInfo:false,
            noExpediente:'',
            envioId:'',
            moduloServicioId1:'',
            moduloServicioId2:'',
            nombreModulo:'',
            facilitador:'',
            facilitadores:[],

            notificador:'',
            notificadores:[],

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


            un_Modulo:'',
            un_Nombre:'',
            un_Puesto:'',
        
        };
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
        me.u_nombre=me.$store.state.usuario.usuario;
        me.u_clave=me.$store.state.usuario.clave;
        me.u_rol=me.$store.state.usuario.rol;
        me.u_puesto=me.$store.state.usuario.puesto;
        me.u_email=me.$store.state.usuario.email;

        //*********************************************** */ 
        me.listar();
        me.listarFacilitadoresNotificadores();
         
    
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
    modalInfo(val){
       val || this.close()
     },
    methods:{ 
        listar(){
            let me = this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
       

             axios.get('api/AsignacionEnvios/ListarTodosAgrupar/'+ me.u_iddistrito , configuracion).then(function(response){ 
               me.expedientes=response.data;
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
        download : function() {
            const data = XLSX.utils.json_to_sheet(this.expedientes)
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, data, 'data')
            XLSX.writeFile(wb,'lista.xlsx')
        }, 
        getUsuario() {
           let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

 
            axios.all([ 
                    me.$controlacceso.get('api/Usuarios/ListarModulo/'+me.moduloServicioId1 , configuracion), 
                    me.$controlacceso.get('api/Usuarios/ListarModulo/'+me.moduloServicioId2 , configuracion)
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


 


 
             
        }, 
        formatearfechahora: function(fecha){
            return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
        },
        reasignar(item){ 
            let me= this; 
            debugger
            me.renderComponent = false;  
            me.asingacionEnvioId1=item.asignacionId1;
            me.asingacionEnvioId2=item.asignacionId2;
            me.noExpediente= item.noExpediente;
            me.moduloServicioId1 = item.moduloId1;
            me.moduloServicioId2 = item.moduloId2; 
            me.facilitador = item.moduloId1;
            me.notificador= item.moduloId2;
            me.envioId= item.envioId; 
            me.getUsuario();
           
        },
        listarFacilitadoresNotificadores(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            var facilitadoresarray=[];
            var notificadoresarray=[];

            axios.all([ 
                    axios.get('api/FacilitadorNotificadors/ListarFacilitadores/' + me.u_iddistrito, configuracion), 
                    axios.get('api/FacilitadorNotificadors/ListarNotificadores/' + me.u_iddistrito, configuracion)
                ]).then(responseArr => { 
                    facilitadoresarray=responseArr[0].data;
                    facilitadoresarray.map(function(x){
                            me.facilitadores.push({text: x.nombreModulo, value: x.moduloServicioId});   
                            
                    }); 

                    notificadoresarray=responseArr[1].data;
                    notificadoresarray.map(function(x){
                            me.notificadores.push({text: x.nombreModulo, value: x.moduloServicioId});   
                            
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
         
        close(){
            let me = this;
        
            me.facilitador="";
            me.notificador="";
            me.moduloServicioId="";
            me.nombreModulo="";
            me.$store.state.select_moduloServicioId= null; 
                me.modalInfo=false;
        },
        guardarReasignacion(){ 
            let me = this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
               me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información. Una vez realizada esta accion no prodra realizar cambios', 
                    function(){ 
                            var moduloSesion="";
                            var moduloNot="";
                            var modulo="";
                            var asignacion="";
                        for(var x=0;x<2;x++)
                        { 
                            if (x == 1 )
                            {
                                modulo = me.notificador;
                                asignacion = me.asingacionEnvioId2;
                                moduloNot = me.notificador.text;
                            }
                            else
                            {
                                modulo = me.facilitador;
                                moduloSesion=me.facilitador;
                                asignacion = me.asingacionEnvioId1;
                              
                            }


                        

 
                                axios.put('api/AsignacionEnvios/Reasignacion',{ 
                                        'idAsingacionEnvio': asignacion,
                                        'moduloServicioId':modulo, 
                                    },configuracion).then(function(response){  
 
                                        axios.get('api/Sesions/ListarPorEnvio/'+  me.envioId, configuracion).then(function(response){ 
                                            me.sesions=response.data;
                                            var sesionId = 0;

  
                                                for(var i=0;i<me.sesions.length;i++){ 
                                                        sesionId = me.sesions[i].idSesion;
                                               
                                                        axios.put('api/Sesions/ActualizarReasignacion',{ 
                                                            'idSesion': sesionId,
                                                            'moduloServicioId':moduloSesion, 
                                                        },configuracion).then(function(response){
                                                         
                                                            axios.put('api/CitatorioRecordatorios/Notificador',{ 
                                                                'idSesion': sesionId,
                                                                'un_Modulo': moduloNot,  
                                                            },configuracion).then(function(response){  
                                                                    if (i ==1)
                                                                    {
                                                                        me.listar();
                                                                        me.close();
                                                                    }
                                                            }).catch(function(error){
                                                                if (error.response.status==401){ 
                                                                    me.e401 = true,
                                                                    me.showpage= false
                                                                } else if (error.response.status==403){  
                                                                    me.e403= true
                                                                    me.showpage= false 
                                                                } else if (error.response.status==404){
                                                                    me.$notify("El recuso no ha sido encontrado 1", 'error')
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
 
                    },
                    function(){     
                        alertify.warning('Verifica la información')
                    }).set('labels', {ok:'Guardar', cancel:'Cancelar'}); 
        }
 
    }
    
   }
</script>
 