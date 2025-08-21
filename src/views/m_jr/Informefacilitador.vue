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
            <v-toolbar flat color="white">
                    <v-toolbar-title class="font-weight-regular" >Informe por facilitador.</v-toolbar-title>
                    
                    <v-divider class="mx-2" inset vertical></v-divider>
                    
                
                    <v-spacer></v-spacer>
                     <v-spacer></v-spacer> 
                    <v-btn  @click="filtrar()" fab small  class="mb-2 primary"><v-icon>filter_list</v-icon></v-btn>        
            </v-toolbar>
            <v-card >
                <v-container grid-list-md text-xs-center>
                    <v-layout row wrap>  
                        <v-flex   xl12 lg12 md12 sm12  xs12> 
                        
                            <v-card outline elevation="0" > 
                                <v-card-text  >
                                      

                                    <v-data-table
                                        :headers="headers"
                                        :items="registros"
                                        :search="search" 
                                        :rows-per-page-items="rowsPerPageItems"
                                        :pagination.sync="pagination"  >
                                        <template slot="items" class="white" slot-scope="props">
                                            
                                            <td>{{ props.item.etiqueta }}</td>
                                            <td>{{ props.item.tramite }}</td> 
                                            <td>{{ props.item.inmediato }}</td> 
                                            <td>{{ props.item.diferido }}</td>
                                            <td>{{ props.item.cumplido}}</td>   
                                            <td>{{ props.item.incumplido}}</td>
                                            <td>{{ props.item.encumplimiento }}</td>    
                                            <td>{{ props.item.baja }}</td>    
                                            <td>{{ props.item.total }}</td>    
                                            <td>{{ props.item.acuerdos }}</td>    
                                        </template>
                                        <template slot="no-data">
                                          <v-alert
                                            value="true"
                                            type="success"
                                            icon="check_circle"
                                            outline
                                            >
                                            Has click en el boton de filtros para buscar la información.
                                            </v-alert>
                                        </template>
                                        
                                    </v-data-table>  
                                   
                                      
                                </v-card-text>
                                <v-card-text  class="px-0">
                                      <canvas height="100" id="mychart"> </canvas>   
                                </v-card-text>
                             
                                
                            </v-card>
                             
                        </v-flex>
                 
                    </v-layout>
                </v-container>

            </v-card> 
          
        </v-flex>
        <v-dialog v-model="modelfiltros" fullscreen hide-overlay transition="dialog-bottom-transition"> 
                <v-card>
                    <v-toolbar card dark color="grey lighten-4 primary--text">
                        <v-avatar  size="30">
                            <v-icon class="grey lighten-2">filter_list</v-icon>
                        </v-avatar> 
                        <v-toolbar-title class="subheading">Filtrar información</v-toolbar-title>
                        <v-spacer></v-spacer> 
                    </v-toolbar>
                               
                    <v-card-text  class="px-4">
                            <v-autocomplete name="filtro:"
                                            prepend-icon="filter_list"
                                            :items="filtros"
                                            v-model="filtro" 
                                            v-validate="'required'"
                                                return-object  
                                            label="Filtrar por:" 
                                            :error-messages="errors.collect('filtro')">
                            </v-autocomplete>
                                <v-autocomplete 
                                            prepend-icon="event"  
                                            :items="años"  
                                            attach
                                            chips
                                            return-object 
                                            v-model="año"  
                                            label="Año:"
                                            v-if="filtro.value==1" >
                            </v-autocomplete>
                                <v-autocomplete 
                                            prepend-icon="event"  
                                            :items="años"   
                                            v-model="año"   
                                            v-on:change="limpiarMes()"
                                            label="Año:" 
                                            v-if="filtro.value==2" >
                            </v-autocomplete>
                                <v-autocomplete name="mes"
                                                prepend-icon="event"
                                                :items="meses" 
                                                return-object 
                                                attach
                                                chips
                                                v-model="mes"  
                                                label="Mes:" 
                                                v-if="filtro.value==2" >
                            </v-autocomplete>
                            <v-menu
                                ref="v_menu1"
                                v-model="v_menu1"
                                :close-on-content-click="false"
                                :return-value.sync="v_fechaInicial"
                                transition="scale-transition" 
                                offset-y v-if="filtro.value==3" 
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
                                v-if="filtro.value==3" 
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
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn  @click.native="modelfiltros=false" >Cancelar</v-btn>
                        <v-btn id="consultar" type="submit" @click.native="consultar()" class="success" >Consultar</v-btn>
                    
                    </v-card-actions> 
                </v-card> 
        </v-dialog> 
        
      
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
import { computed } from 'vue';
 

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


            headers: [ 
                { text: 'Facilitador', value: 'etiqueta', }, 
                { text: 'En trámite', value: 'tramite'}, 
                { text: 'Inmediato', value: 'inmediato', }, 
                { text: 'Diferido', value: 'diferido'}, 
                { text: 'Cumplido', value: 'cumplido', }, 
                { text: 'Incumplido', value: 'incumplido'}, 
                { text: 'En cumplimiento', value: 'encumplimiento', }, 
                { text: 'Bajas', value: 'baja'}, 
                { text: 'Total', value: 'total', }, 
                { text: 'Acuerdos ', value: 'acuerdos'},   
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
            //****************************************************** */
            modelfiltros:false,
            filtro:'',
            filtros:[
                {value:1, text:"Año"},
                {value:2, text:"Mes"},
                {value:3, text:"Dia"}
            ],
            año:'',
            años:[],

            mes:'',
            meses:[ 
                {value:1, text:"Enero"},
                {value:2, text:"Febrero"},
                {value:3, text:"Marzo"},
                {value:4, text:"Abril"},
                {value:5, text:"Mayo"},
                {value:6, text:"Junio"},
                {value:7, text:"Julio"},
                {value:8, text:"Agosto"},
                {value:9, text:"Septiembre"},
                {value:10, text:"Octubre"},
                {value:11, text:"Noviembre"},
                {value:12, text:"Diciembre"},
            ],
            
            v_menu1:false,
            v_fechaInicial:'',
            v_fechaI:'',

            v_menu2:false,
            v_fechaFinal:'',
            v_fechaF:'',

            registros:[],

             

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
            this.$store.dispatch("setLogin", token)
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
        
 
        me.cargaranos(); 
    },
    methods:{
         
        cargaranos(){
            let me= this;
            var fecha = new Date();
            var ano = fecha.getFullYear();
                for(var i=0;i<6-1;i++){
                    me.años.push(
                    { 
                        value:(ano-i),
                        text:(ano-i)
                    }
                )   
            }
        },
         
       
     
        limpiarMes(){
            let me=this;  
            me.v_menu1=false;
            me.v_fechaInicial='';
            me.v_fechaI='';

            me.v_menu2=false;
            me.v_fechaFinal='';
            me.v_fechaF='';

            me.registros=[];
            me.mes=[];
            

           
                
        }, 
        formatearfecha: function(fecha){
            return moment(fecha).format('DD/MM/YYYY');
        },
        
         
        consultar(){ 
            debugger
            let me= this;  
            if (me.filtro.text == "Año")
            { 
                me.getRegistrosAño();  
            }
            else if (me.filtro.text=="Mes")
            { 
                me.getRegistrosMes(); 
            }         
            else if (me.filtro.text=="Dia")
            {
                me.getRegistrosDia();  
            }   
            me.filtro="";
            me.año="";
            me.mes="";
            me.v_fechaInicial="";
            me.v_fechaFinal="";
            me.modelfiltros=false;
        },
        cancelar(){
             document.getElsementsByTagName.removeChild(tabla);
        },
        getRegistrosAño(){
    
            let me=this; 
            me.registros=[];  
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            me.$justiciarestaurativa.get('api/AcuerdoReparatorios/ListarARInformeAño/'+ me.u_iddistrito + '/' + me.año.value, configuracion).then(function(response){ 
                me.registros=response.data;
                me.loadGrafica();    
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
        },
        getRegistrosMes(){ 
            let me=this; 
            me.registros=[]; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            me.$justiciarestaurativa.get('api/AcuerdoReparatorios/ListarARInformeMes/'+ me.u_iddistrito + '/' + me.año + '/' + me.mes.value, configuracion).then(function(response){ 
                me.registros=response.data;  
                me.loadGrafica();
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
        },
        getRegistrosDia(){
        
            let me=this; 
            me.registros=[]; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            me.$justiciarestaurativa.get('api/AcuerdoReparatorios/ListarARInformeDia/'+ me.u_iddistrito + '/' + me.v_fechaI + '/'+ me.v_fechaF, configuracion).then(function(response){ 
                me.registros=response.data; 
                me.loadGrafica();
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
        }, 
        loadGrafica(){
       
            let me = this;
            let lbl=''; 
            me.etiqueta = [];
            me.tramite=[];
            me.inmediato=[];
            me.diferido=[];
            me.cumplido=[];
            me.incumplido=[];
            me.encumplimiento=[];
            me.baja=[]; 
            
            me.registros.map(function(x){  
                me.etiqueta.push(x.etiqueta);
                me.tramite.push(x.tramite);
                me.inmediato.push(x.inmediato); 
                me.diferido.push(x.diferido); 
                me.cumplido.push(x.cumplido); 
                me.incumplido.push(x.incumplido); 
                me.encumplimiento.push(x.encumplimiento); 
                me.baja.push(x.baja);  
            }); 
 

 
 
            var ctx1 = document.getElementById('mychart');
            var myChart = new Chart(ctx1, {
                type: 'bar', 
                data: {
                    labels: me.etiqueta,
                    datasets: [{ 
                        label: "En trámite",
                        data: me.tramite,
                        backgroundColor: [
                            'rgba(223,223,223, 1)',   
                            'rgba(223,223,223, 1)',  
                        ],  
                    },
                    { 
                        label: "Inmediato",
                        data: me.inmediato,
                        backgroundColor: [
                            'rgba(202,242,112, 1)',  
                            'rgba(202,242,112, 1)', 
                        ],  
                    },
                     { 
                        label: "Diferido",
                        data: me.diferido,
                        backgroundColor: [
                            'rgba(107,226,111, 1)',  
                            'rgba(107,226,111, 1)',
                        ],  
                    },
                    { 
                        label: "Cumplido",
                        data: me.cumplido,
                        backgroundColor: [
                            'rgba(69,196,144, 1)', 
                            'rgba(69,196,144, 1)',
                        ],  
                    },
                    { 
                        label: "Incumplido",
                        data: me.incumplido,
                        backgroundColor: [
                            'rgba(1,146,117, 1)', 
                            'rgba(1,146,117, 1)', 
                        ],  
                    },
                    { 
                        label: "En cumplimiento",
                        data: me.encumplimiento,
                        backgroundColor: [
                            'rgba(0,141,147, 1)',
                            'rgba(0,141,147, 1)', 
                        ],  
                    },
                    { 
                        label: "Bajas",
                        data: me.baja,
                        backgroundColor: [
                            'rgba(49,84,104, 1)', 
                            'rgba(49,84,104, 1)', 
                        ],  
                    },
                    
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Informe general de acuerdos reparatorios de facilitadores.'
                    },
                     layout:{
                        padding:{
                            left:50,
                            right:50,
                            top:0,
                            bottom:0,
                        }
                    },
                    legend:{
                        display:true,
                        position: 'right',
                       
                    },
                    tooltips: {
                        enabled: true,
                        mode: 'single',
                        callbacks: {
                            
                            
                        }
                    }
                }
            });
          
       
        },

        
         
        
        filtrar(){
                let me=this;
                me.modelfiltros =true; 

        } ,
        
       
    },
    mounted(){   
        
    }
}
</script>x
<style>


.caption1{
 font-size: 11px !important;
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
  font-size: 11px !important;
   height: 11px !important;  
    
 
}
.tablasgeneradas{ 
        font-size: 14px !important;
        border:1px solid #a59b9b;
    }


</style>