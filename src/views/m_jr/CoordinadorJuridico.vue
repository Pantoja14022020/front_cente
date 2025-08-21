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
                <v-toolbar-title class="font-weight-regular" >Validación de acuerdos reparatorios.</v-toolbar-title>
                <v-divider class="mx-2" inset vertical />
                <v-spacer />
                <v-text-field v-if="editedIndex==-1" class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details />
                <v-spacer />
                <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
                <!-- BOTONES DE ACCIÓN PRINCIPALES -->
                <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
                <!-- Reimpresión de documento -->
                <v-tooltip bottom>
                    <template v-if="editedIndex==1 && permisoImp" v-slot:activator="{ on }"> 
                        <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="imprimirAR()" fab dark small color="primary">
                            <v-icon class="mt-1" dark>print</v-icon>
                        </v-btn>
                    </template>
                    <span>Imprimir</span>
                </v-tooltip>
                <!-- Botón de regreso de la vista del acuerdo al listado -->
                <v-tooltip bottom>
                    <template v-if="editedIndex==1" v-slot:activator="{ on }"> 
                        <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="editedIndex=-1; limpiar()" fab dark small color="success">
                            <v-icon class="mt-1" dark>undo</v-icon>
                        </v-btn>
                    </template>
                    <span>Regresar</span>
                </v-tooltip>
            </v-toolbar>
            <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
            <!-- TABLA DE VISUALIZACIÓN DE ACUERDOS REPARATORIOS, PLAN DE REPARACIÓN Y ANEXOS -->
            <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
            <v-card>            
                <v-container>
                    <v-layout row wrap>
                        <!-- Bloque de visualización de datos principales del acuerdo en tabla -->
                        <v-flex v-if="editedIndex==-1" xl12 lg12 md12 sm12  xs12> 
                            <v-data-table
                                :headers="headers"
                                :items="acuerdos"
                                :search="search"  return-object
                                :rows-per-page-items="rowsPerPageItems"
                                :pagination.sync="pagination"  
                            >
                                <template slot="items" class="white" slot-scope="props">
                                    <!-- Datos princicpales -->
                                    <td>{{ props.item.noExpediente == null ? 'Expediente sin número' : props.item.noExpediente }}</td>
                                    <td>{{ props.item.nuc == null ? 'Expediente sin relación a NUC' : props.item.nuc }}</td>         
                                    <td>{{ props.item.montoTotal }}</td>
                                    <td>{{ props.item.fechaCelebracionAcuerdo == null ? 'Sin fecha registrada' : formatearfechahora(props.item.fechaCelebracionAcuerdo) }}</td>
                                    <td>{{ props.item.fechaLimiteCumplimiento == null ? 'Sin fecha registrada' : formatearfechahora(props.item.fechaLimiteCumplimiento) }}</td>
                                    <td>{{ props.item.nosise }}</td>
                                    <td>{{ props.item.fechasise == null ? 'Sin fecha registrada' : formatearfechahora(props.item.fechasise) }}</td>
                                    <!-- Icono de visualización de estado de respuesta -->
                                    <td>
                                        <template v-if="props.item.statusRespuestaCoordinadorJuridico==null">
                                            <v-icon color="default" @click="activarDesactivarMostrar(2,props.item)">
                                                remove
                                            </v-icon>
                                        </template>
                                        <template v-if="props.item.statusRespuestaCoordinadorJuridico=='Autorizado'">
                                            <v-icon color="success" @click="activarDesactivarMostrar(2,props.item)">
                                                check_circle
                                            </v-icon>
                                        </template> 
                                        <template v-if="props.item.statusRespuestaCoordinadorJuridico=='No autorizado'">
                                            <v-icon color="error" @click="activarDesactivarMostrar(2,props.item)">
                                                cancel
                                            </v-icon>
                                        </template>
                                    </td>    
                                    <!-- Bloque de botones de acción sobre el acuerdo     -->
                                    <td class="justify-center align-center layout px-0"> 
                                        <!-- Botón para mostrar vista completa de datos del acuerdo -->
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-icon class="mr-2" v-on="on" color="warning" @click="mostrar(props.item)">
                                                    remove_red_eye
                                                </v-icon> 
                                            </template>
                                            <span>Visualizar acuerdo reparatorio</span>
                                        </v-tooltip>    
                                        <!-- Botón para cambiar el estatus de validación -->
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-icon class="mr-2" v-on="on" color="default" @click="validacion(props.item)">
                                                    autorenew
                                                </v-icon> 
                                            </template>
                                            <span>Respuesta</span>
                                        </v-tooltip> 
                                    </td>   
                                </template>
                                <!-- Botón para refresh de listado -->
                                <template slot="no-data">
                                    <v-btn color="primary">Resetear</v-btn>
                                </template>
                            </v-data-table>  
                        </v-flex>
                        <!-- Bloque izquierdo de visualización de datos completos del acuerdo -->
                        <v-flex v-if="editedIndex==1" xl6 lg6 md6 sm12  xs12>           
                            <v-list one-line>
                                <v-list-tile mb-2>
                                    <v-list-tile-action>
                                        <v-icon color="default">description</v-icon>
                                    </v-list-tile-action> 
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Documento:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_tipodocumento}}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon color="default">event</v-icon>
                                    </v-list-tile-action> 
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Fecha de celebración del acuerdo:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_fechaCelebracionAcuerdo ? this.v_fechaCelebracionAcuerdo.replace("T", " ") : 'Sin fecha registrada'}}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile> 
                                    <v-list-tile-action>
                                        <v-icon color="default">person</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Solicitante(s):</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_nombreSolicitante ? this.v_nombreSolicitante.replace(";", ",") : 'Solicitantes no guardados'}}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile> 
                                    <v-list-tile-action>
                                        <v-icon color="default">person</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Requerido(s):</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_nombreRequerdio ? this.v_nombreRequerdio.replace(";", ",") : 'Requeridos no guardados'}}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile> 
                                    <v-list-tile-action>
                                        <v-icon color="default">block</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Delito(s):</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_delitos ? this.v_delitos.replace(";", ",") : 'Delitos no guardados'}}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile> 
                                    <v-list-tile-action>
                                        <v-icon color="default">question_answer</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Metodo utilizado:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_metodoUtilizado }}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile>
                            </v-list>
                        </v-flex>
                        <!-- Bloque derecho de visualización de datos completos del acuerdo -->
                        <v-flex v-if="editedIndex==1" xl6 lg6 md6 sm12 xs12>
                            <v-list one-line>
                                <v-list-tile>
                                    <v-list-tile-action>
                                        <v-icon color="default">access_time</v-icon>
                                    </v-list-tile-action> 
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Hora de celebración:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_fechaCelebracionAcuerdo ? this.v_fechaCelebracionAcuerdo.replace("T", " ") : 'Sin fecha registrada'}}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile>                                 
                                <v-list-tile v-if="this.v_fechaLimiteCumplimiento"> 
                                    <v-list-tile-action>
                                        <v-icon color="default">event</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Fecha limite de cumplimiento:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.v_fechaLimiteCumplimiento ? this.v_fechaLimiteCumplimiento.replace("T", " ") : ''}}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile> 
                                    <v-list-tile-action>
                                        <v-icon color="default">payment</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Status de conclusión:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.statusCorrect(this.v_statusConclusion) }}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile v-if="this.v_fechaLimiteCumplimiento"> 
                                    <v-list-tile-action>
                                        <v-icon color="default">timer</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Periodo de pago:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.periodoCorrect(this.v_periodo) }}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile>
                                <v-list-tile> 
                                    <v-list-tile-action>
                                        <v-icon color="default">dashboard</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Como va a pagar:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ this.pagoCorrect(this.v_tipoPago, this.v_objetoEspecie) }}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile v-if="v_montoTotal != 0"> 
                                    <v-list-tile-action>
                                        <v-icon color="default">attach_money</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Monto cantidad total:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ v_montoTotal }}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile v-if="v_cantidadEspecie != ''"> 
                                    <v-list-tile-action>
                                        <v-icon color="default">attach_money</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>Cantidad total:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ v_cantidadEspecie }}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                                <v-list-tile v-if="v_noTotalParcialidades != 0"> 
                                    <v-list-tile-action>
                                        <v-icon color="default">receipt</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>No. de parcialidad:</v-list-tile-sub-title>
                                        <v-list-tile-title>{{ v_noTotalParcialidades }}</v-list-tile-title> 
                                    </v-list-tile-content> 
                                </v-list-tile> 
                            </v-list>
                        </v-flex>
                        <v-divider inset />
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex> 
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <!-- Modal para respuesta de validación -->
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <v-dialog v-model="dialog" max-width="700px"> 
            <v-card>
                <!-- Espacio de titulo del modal -->
                <v-toolbar card dark color="grey lighten-4 primary--text">
                    <v-avatar size="30">
                        <v-icon class="grey lighten-2">add</v-icon>
                    </v-avatar>
                    <v-toolbar-title class="subheading">Validación de acuerdo reparatorio</v-toolbar-title>
                    <v-spacer />
                </v-toolbar>
                <!-- Cuerpo del modal -->
                <v-card-text>
                    <v-form ref="form">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <h3>No de expediente: {{ this.v_noExpediente }}</h3>
                                    <!-- Componente para cambio del estatus -->
                                    <v-autocomplete name="status de validación"
                                        :items="v_statusValidaciones"
                                        v-model="v_statusValidacion"  
                                        label="Status de validacion:" 
                                        v-validate="'required'"    
                                        :error-messages="errors.collect('status de validación')"
                                    />
                                    <!-- Componente para descripción o desarrollo de respuesta libre -->
                                    <v-textarea
                                        outline
                                        name="respuesta"
                                        label="Respuesta" 
                                        v-model="v_respuesta"  
                                        v-validate="'required'"    
                                        :error-messages="errors.collect('respuesta')"
                                    />
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <!-- Botones de acción del modal -->
                        <v-card-actions>
                            <v-spacer />
                            <v-btn @click.native="close" >Cancelar</v-btn>
                            <v-btn @click.native="guardar" class="success">Guardar</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text> 
            </v-card>
        </v-dialog>   
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <!-- Modal de previsualización de PDF -->
        <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <v-dialog v-model="modal_AR" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Documento.</v-toolbar-title>
                    <v-spacer />
                    <!-- Botón de acción -->
                    <v-toolbar-items>
                        <v-btn icon @click="modal_AR= false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <!-- Componente de visualización -->
                <v-card-text>
                    <iframe id="iframepdfAR" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no" />
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
    import { error } from 'util';
    //** COMPONENTES */
    import n401 from '../../components/m_jr/401'
    import n403 from '../../components/m_jr/403' 
    import infoUsuario from '../../components/m_jr/InfoUsuario'
    import moment from 'moment'
    import 'moment/locale/es';
    import QRCode from "qrcode";
    import alertify from 'alertifyjs';
    import { NumberAsString } from './NumerosLetras'
    import { generarQRCodeBase64 } from './crearQR';

export default {
    // Componentes de error
    components: {  
        n401,
        n403,
        infoUsuario,
    },
    // Variables globales
    data: function () {
        return {
            //* Estados inicales para los componente importados
            e401: false, 
            e403: false,
            //* Variable globales
            logo1: '',
            logo2: '',
            logo3: '',
            logo4: '',
            direccionAgencia: '',
            telefonosAgencia: '', 
            nombreDSP: '',
            contactoDSP: '',
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
                { text: 'NUC', value: 'nuc' }, 
                { text: 'Monto total', value: 'montoTotal' },   
                { text: 'Fecha celebracion', value: 'fechaCelebracionAcuerdo' },   
                { text: 'Fecha cumplimiento', value: 'fechalimiteCumplimiento' },   
                { text: 'SISE', value: 'nosise' },   
                { text: 'Fecha SISE', value: 'fechasise' },   
                { text: 'Status', value: 'statusRespuestaCoordinadorJuridico' },   
                { text: 'Opciones', value: 'opciones' },                 
            ],
            search: '',
            rowsPerPageItems: [ 10, 20, 30, 40, 50 ],
            pagination: {
                rowsPerPage: 20
            },
            //* Variables de vista de los acuerdos
            showpage: true, 
            dialog: false,
            dialogSISE: false,
            adModal: 0,
            adAccion: 0,
            addModulo: '',
            modal_AR: false,            
            acuerdos: [],
            v_AutoridadqueDeriva: '',
            v_uqe_Distrito: '',
            v_uqe_DirSubProc: '',
            v_uqe_Agencia: '',
            v_uqe_Modulo: '',
            v_uqe_Nombre: '',
            v_uqe_Puesto: '',
            v_StatusGeneral: '',
            v_RespuestaExpediente: '',
            v_FechaRegistro: '',
            v_FechaCierre: '',
            texto: 'Vista Previa',
            qrCode: '',
            docRemision: 'Remisión',
            vistaPreviaTF: true,
            //* Variables de acuerdo
            v_idAcuerdoReparatorio: '',
            v_statusValidaciones: [ 'Autorizado', 'No autorizado' ],
            v_statusValidacion: '',
            v_respuesta: '',
            v_envioId: '',
            v_nombreSolicitante: '',
            v_solicitantes: [],
            v_solicitantesR: [],
            v_solicitantesAR: [],
            v_nombreRequerdio: '',
            v_requeridos: [],
            v_requeridosR: [],
            v_requeridosAR: [],
            v_nuc: '',
            printConjunt: [],
            v_noExpediente: '',
            v_statusConclusion: '',
            v_tipoPago: '',
            v_objetoEspecie: '',
            v_statusCumplimiento: '',
            v_metodoUtilizado: '',
            v_montoTotal: '',
            v_cantidadEspecie: '',
            v_noTotalParcialidades: '',
            v_periodo: '',
            v_fechaCelebracionAcuerdo: '',
            v_fechaLimiteCumplimiento: '',
            v_uf_Distrito: '',
            v_uf_DirSubProc: '',
            v_uf_Agencia: '',
            v_uf_Modulo: '',
            v_uf_Nombre: '',
            v_uf_Puesto: '',
            v_delitos: '',
            v_anexo: false,
            v_textoAR: '',            
            v_textoAlternativo: '',
            editedIndex: -1, 
            v_tipodocumento: 'Acuerdo reparatorio',            
            v_personInfoR: [],
            v_requeridoFM: '',
            v_personInfoS: [],
            v_solicitanteFM: '',
            v_idsSRR: [],
            v_representantes: [],                        
            permisoImp: false
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
        //*********************************************** */ 
        me.listar(); 
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
        //? Acción en caso de cierre de modal de respuesta
        dialog (val) {
            val || this.close()
        },
        //? Acción en caso de cierre de modal de Previsualizzación de PDF
        modalInfo(val){
            val || this.close()
        },
    },
    methods: { 
        //***************************************************************************************************************************************** */
        //* Funciones de información general de expediente y/o acuerdo
        //***************************************************************************************************************************************** */
        //? Función para obtención de logos para el documento PDF
        listarLogo(){ 
            let me=this; 
            this.$conf.get('api/ConfGlobals/Listar').then(function (response) {                
                me.logo1= response.data.logo1;
                me.logo2= response.data.logo2;
                me.logo3 = response.data.logo3;
                me.logo4 = response.data.logo4;
                
            }).catch(function(error){
                me.$notify('Error al leer la configuracion global !!!','error')    
            });
        }, 
        //? Función para obtener datos de la cuenta del usuario actual
        informacionagencia(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion = { headers: header };  
            
            me.$conf.get('api/Agencias/Listarporid/' + me.u_idagencia, configuracion)
                .then(function (response) {                
                    me.direccionAgencia=response.data.direccion;
                    me.telefonosAgencia= response.data.telefono;
                    me.contactoDSP=response.data.contacotDirSub;
                    me.nombreDSP=response.data.nombreDirSub;
                })
                .catch(function (error) {
                    me.$notify('Error al intentar leer la informacion de agencia!!!','error')   
                });
        }, 
        //? Función para el listado de registros de acuerdos
        listar(){
            let me = this;
            let header = { "Authorization": "Bearer " + this.$store.state.token };
            let configuracion = { headers: header }; 

            me.$justiciarestaurativa.get('api/AcuerdoReparatorios/ListarValidacion', configuracion)
                .then(function (response) {                  
                    me.acuerdos = response.data;
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
        //***************************************************************************************************************************************** */
        //* Funciones de información y manejo de acuerdo
        //***************************************************************************************************************************************** */
        //? Función para almacenamiento de datos de la cuenta y del expediente
        mostrarInforma(item){
            debugger
            let me = this; 
            me.editedIndex= -1, 
            me.v_idAcuerdoReparatorio= item.idAcuerdoReparatorio;
            me.v_envioId	= item.envioId;
        
            
            me.v_nuc= item.nuc;
            me.v_noExpediente	= item.noExpediente;
            me.v_uf_Distrito	= item.uf_Distrito;
            me.v_uf_DirSubProc = item.uf_DirSubProc;
            me.v_uf_Agencia=item.uf_Agencia;
            me.v_uf_Modulo= item.uf_Modulo;
            me.v_uf_Nombre= item.uf_Nombre;
            me.v_uf_Puesto= item.uf_Puesto;  
            
            me.v_AutoridadqueDeriva = item.autoridadqueDeriva;
            me.v_uqe_Distrito =item.uqe_Distrito;
            me.v_uqe_DirSubProc= item.uqe_DirSubProc;
            me.v_uqe_Agencia =item.uqe_Agencia;
            me.v_uqe_Modulo = item.uqe_Modulo;
            me.v_uqe_Nombre = item.uqe_Nombre;
            me.v_uqe_Puesto = item.uqe_Puesto;
            me.v_StatusGeneral =item.statusGeneral;
            
            me.v_RespuestaExpediente= item.respuestaExpediente;
            me.v_FechaRegistro = item.fechaRegistro;
            me.v_FechaCierre = item.fechaCierre;
            me.dialog_Informa=true;
        },
        //? Función para muestreo de datos iniciales y apertura de modal de respuesta
        validacion(item){ 
            let me = this;
            
            me.v_idAcuerdoReparatorio = item.idAcuerdoReparatorio;
            me.v_noExpediente= item.noExpediente;            
            me.dialog=true;
        },
        //? Función para reseteo de valores para manejo de otros acuerdos
        limpiar() {            
            let me = this; 

            me.v_idAcuerdoReparatorio="";
            me.v_statusValidacion="";
            me.v_respuesta="";
            me.v_noExpediente="";
            me.v_idAcuerdoReparatorio=""; 
            me.v_statusValidacion="";
            me.v_respuesta="";            
            me.v_cantidadEspecie = 0
            me.v_envioId="";            
            me.v_nombreSolicitante="";
            me.v_solicitantes=[];
            me.v_solicitantesR=[];
            me.v_solicitantesAR=[];
            me.v_nombreRequerdio="";
            me.v_requeridos=[];
            me.v_requeridosR=[];
            me.v_requeridosAR=[];

            
            me.v_nuc="";
            me.v_noExpediente="";
            me.v_statusConclusion="";
            me.v_tipoPago="";
            me.v_statusCumplimiento="";
            me.v_metodoUtilizado="";
            me.v_montoTotal="";
            me.v_noTotalParcialidades="";
            me.v_periodo="";
            me.v_fechaCelebracionAcuerdo="";
            me.v_fechaLimiteCumplimiento="";
            me.v_uf_Distrito="";
            me.v_uf_DirSubProc="";
            me.v_uf_Agencia="";
            me.v_uf_Modulo="";
            me.v_uf_Nombre="";
            me.v_uf_Puesto="";
            me.v_delitos="";
            me.v_textoAR="";            
            me.editedIndex=-1;
        },       
        //? Función para el manejo del registro de estatus del acuerdo, para pasar de JSON a un texto genérico
        statusCorrect(status) {            
            let texto = ''  

            try {
                let json = JSON.parse(status)                                                      
                if (json.Dinero && json.Especie) {
                    texto = `${json.Dinero} y ${json.Especie}`
                } else if(json.Dinero){
                    texto = json.Dinero
                } else if(json.Especie){                    
                    texto = json.Especie
                } else {
                    texto = "Respeto"
                }
            } catch (error) {
                texto = status
            }

            return texto
        },
        //? Función para el manejo del registro de la especie de pago, para pasar de JSON a un texto genérico
        pagoCorrect(pago,objeto) {
            let texto = ''        
            let texto2 = ''
            let pagoB = pago.split(' ')     
            let pagoB2 = objeto.split(';')

            pagoB2.map(sdf => {
                if (sdf != '') {
                    if (texto2 == '') {
                        texto2 = sdf
                    } else {
                        texto2 += `, ${sdf}`
                    }                    
                }
            })

            if (pagoB.length >= 3 && pagoB.includes(' ')) {
                texto = `Dinero, Especie: (${texto2}), Respeto`
            } else {
                pagoB.map(dfg => {
                    if (dfg != '') {
                        if (texto == '') {
                            if (dfg == 'Especie') {
                                texto = `Especie: (${texto2})`
                            } else {
                                texto = dfg
                            }
                        } else {
                            if (dfg == 'Especie') {
                                texto += `, Especie: (${texto2})` 
                            } else {
                                texto += `, ${dfg}`
                            }
                        }                        
                    }
                })
            }

            return texto
        },
        //? Función para el manejo del registro del periodo, para pasar de un Int a un texto genérico
        periodoCorrect(per) {
            let texto = 'Periodo no registrado'            

            if (per == 1) {
                texto = 'Diario'    
            }

            if (per == 7) {
                texto = 'Semanal'
            }

            if (per == 15) {
                texto = 'Quincenal'
            }

            if (per == 30) {
                texto = 'Mensual'
            }        

            return texto
        },
        //? Función para capturar el acuerdo selecciona y pasar los valores a variables globales para su manejo  y visualización
        mostrar(item) {                 
            let me = this;                         
            let enlace = false
            
            me.editedIndex= 1, 
            me.v_idAcuerdoReparatorio= item.idAcuerdoReparatorio;
            me.v_envioId = item.envioId;                        

            let fechaC = item.fechaCelebracionAcuerdo.split("-")[0]
            let fechaCI = parseInt(fechaC, 10)

            if (fechaCI < 2024) {
                me.permisoImp = false                
            } else {
                me.permisoImp = true
            }
            
            if (item.anexo != null) {
                me.v_anexo = true
            }

            if (item.anexo == null) {
                enlace = false
            } else {
                enlace = true
            }

            me.v_tipodocumento = item.tipoDocumento

            me.$justiciarestaurativa.get(`api/AcuerdoReparatorios/ListarConjuntoxAcuerdo/${item.idAcuerdoReparatorio}/${enlace}`)
                .then(response => {        
                    me.printConjunt = response.data                   
                    me.textoQR = `Registro de ${me.v_tipodocumento}\nExpediente ${item.noExpediente}\nFirmado por ${response.data[0].uf_Nombre} ${response.data[0].uf_Puesto}`       
                    
                    let jsonE = ''                    
        
                    if (response.data[0].species != null) {
                        jsonE = JSON.parse(response.data[0].species)                          
                        jsonE.map(jkl => {
                            if (jkl.type == 'unico') {                                
                                if (me.v_cantidadEspecie == '') {
                                    me.v_cantidadEspecie = `${jkl.es[0].objeto} (${jkl.es[0].cantidad})`
                                } else {
                                    me.v_cantidadEspecie += `, ${jkl.es[0].objeto} (${jkl.es[0].cantidad})`
                                }
                            } else {                                
                                if (me.v_cantidadEspecie == '') {
                                    me.v_cantidadEspecie = `${jkl.total[0].objeto} (${jkl.es[0].cantidad})`
                                } else {
                                    me.v_cantidadEspecie += `, ${jkl.total[0].objeto} (${jkl.es[0].cantidad})`
                                }
                            }
                        })                                                
                    }                    

                    me.vistaPreviaTF = false                        
                
                    me.docRemision = `Reimpresión de ${item.tipoDocumento}`                

                    me.generarQR(me.docRemision,item.nuc,item.uf_Nombre,item.fechaCelebracionAcuerdo,item.idAcuerdoReparatorio)   
                    
                    me.listarSolicitantesRequeridos();            
                })
            
            me.v_nombreSolicitante= item.nombreSolicitante;                     
            me.v_nombreRequerdio=item.nombreRequerdio;             
            me.v_nuc	= item.nuc;
            me.v_noExpediente	= item.noExpediente;
            me.v_statusConclusion= item.statusConclusion;
            me.v_tipoPago = item.tipoPago;
            me.v_objetoEspecie = item.objectoEspecie;
            me.v_statusCumplimiento= item.statusCumplimiento;
            me.v_metodoUtilizado	= item.metodoUtilizado;
            me.v_montoTotal	= item.montoTotal;
            me.v_noTotalParcialidades= item.noTotalParcialidades;
            me.v_periodo	= item.periodo;
            me.v_fechaCelebracionAcuerdo= item.fechaCelebracionAcuerdo;
            me.v_nombreSolicitante = item.nombreSolicitante,
            me.v_fechaLimiteCumplimiento= item.fechaLimiteCumplimiento;
            me.v_uf_Distrito = item.uf_Distrito;
            me.v_uf_DirSubProc = item.uf_DirSubProc;
            me.v_uf_Agencia=item.uf_Agencia;
            me.v_uf_Modulo= item.uf_Modulo;
            me.v_uf_Nombre= item.uf_Nombre;
            me.v_uf_Puesto= item.uf_Puesto;
            me.v_delitos	= item.delitos; 
            me.v_textoAR	= item.textoAR;
        },
        //? Función para el llamado de la creación de PDF
        imprimirAR(){
            this.mostrarpdf(); 
        },
        //? Función para el cierre del modal de la respuesta y el llamado de la función limpiar()
        close(){
                this.dialog = false; 
                this.limpiar();
        },         
        //? Función para generar la petición para el almacenamiento del cambio de estatus y respuesta de validación
        guardar(){
            this.$validator.validate().then(result => {
                if (result) {   
                        //Código para guardar
                        let me=this;
                        let header={"Authorization" : "Bearer " + this.$store.state.token};
                        let configuracion= {headers : header};
                        me.$justiciarestaurativa.put('api/AcuerdoReparatorios/ActualizarRespuestaL',{
                            'idAcuerdoReparatorio': me.v_idAcuerdoReparatorio,
                            'statusRespuestaCoordinadorJuridico': me.v_statusValidacion, 
                            'respuestaCoordinadorJuridico': me.v_respuesta,
                        }, configuracion).then(function(response){
                            me.close();
                            me.$notify('¡La información se guardo correctamente!','success')  
                            me.listar();                        
                        }).catch(function(error){
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
                                me.$notify('Error al intentar actualizar el registro!!!','error') 
                            } 
                        });
                    
                }  
            })
        }, 
        //? Función para la creación del PDF para expedientes con acuerdos generados antes de ser conjuntos
        crearPdfEA () { 
            let me = this 
            
            me.Rprint = true        

            var pdfMake = require('pdfmake/build/pdfmake.js');
            var htmlToPdfmake = require("html-to-pdfmake");                                    
            
            var diragencia = me.direccionAgencia;
            var telagencia = me.telefonosAgencia;
            var contactoDSP = me.contactoDSP;
            var nombreDSP = me.nombreDSP; 
            var nombreDistrito = me.v_uf_Distrito;
            var cargo = me.v_uf_Puesto || ''
            
            var html_texto = htmlToPdfmake(
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
                            {
                                image: me.qrCode ? me.qrCode : '',
                                width: 80, // Ajusta el ancho según tu diseño
                                height: 80, // Ajusta la altura según tu diseño
                                absolutePosition: { x: 5, y: -20 }, // Ajusta las coordenadas según tu diseño
                            },                       
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
                                image: me.logo3 ? me.logo3 : '',
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
                        text:  'EXPEDIENTE: ' + me.v_noExpediente,
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
            var f = document.getElementById('iframepdfAR');
            var callback = function(url) { f.setAttribute('src',url); }

            if (pdfMake.vfs == undefined) {
                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                pdfMake.vfs = pdfFonts.vfs;
            }            
            
            doc.getDataUrl(callback, doc);                                
            me.modal_AR = true; 
        },  
        //? Función para la creación del PDF para expedientes nuevos con conjuntos
        crearPdf () { 
            let me = this 
            
            me.Rprint = true        

            var pdfMake = require('pdfmake/build/pdfmake.js');
            var htmlToPdfmake = require("html-to-pdfmake");                                    
            
            var diragencia = me.direccionAgencia;
            var telagencia = me.telefonosAgencia;
            var contactoDSP = me.contactoDSP;
            var nombreDSP = me.nombreDSP; 
            var nombreDistrito = me.v_uf_Distrito;
            var cargo = me.v_uf_Puesto || ''
            
            var html_texto = htmlToPdfmake(
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
                                    image: me.qrCode ? me.qrCode : '',
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
                                image: me.logo3 ? me.logo3 : '',
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
                        text:  'EXPEDIENTE: ' + me.v_noExpediente,
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
            var f = document.getElementById('iframepdfAR');
            var callback = function(url) { f.setAttribute('src',url); }

            if (pdfMake.vfs == undefined) {
                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                pdfMake.vfs = pdfFonts.vfs;
            }            
            
            doc.getDataUrl(callback, doc);                                
            me.modal_AR = true; 
        },  
        //? Función para generar la vista previa del PDF y aperturar el modal
        mostrarpdf() {            
            let me = this

            if (me.v_anexo) {
                me.reimpresionA(me.printConjunt[0])                
            } else {                                
                var dd = me.crearPdf();
                var pdfMake = require('pdfmake/build/pdfmake.js')
                var htmlToPdfmake = require("html-to-pdfmake");
                if (pdfMake.vfs == undefined) {
                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                    pdfMake.vfs = pdfFonts.vfs;
                }
                var doc = pdfMake.createPdf(dd);
                var f = document.getElementById('iframepdfAR'); 
                var callback = function(url) { f.setAttribute('src',url); }
                doc.getDataUrl(callback, doc);                
            }

            me.modal_AR = true; 
        },                
        //? Función para segmentar los ids y nombres de acuerdo, para la obtención general de información de las personas
        listarSolicitantesRequeridos(SolReq)
        {
            let me = this;                                        
                let idsClaimant = me.printConjunt[0].requeridosC.split(';')
                let nameClaimant = me.printConjunt[0].nombreR.split(';')
                let idsRespondent = me.printConjunt[0].solicitadosC.split(';')
                let nameRespondent = me.printConjunt[0].nombreS.split(';')                
    
                idsRespondent.map((respondent, index) => {                                            
                    me.listardireccionSol(respondent, nameRespondent[index].trim())
                    me.v_idsSRR.push(respondent.trim())
                })
                
                idsClaimant.map((claimant, index) => {                    
                    me.listardireccionReq(claimant, nameClaimant[index].trim())
                    me.v_idsSRR.push(claimant.trim())
                })

                me.representant()
        },
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

                let addressString = `${personAddress.calle} ${personAddress.noint} ${personAddress.noext} ${personAddress.localidad} ${personAddress.municipio} ${personAddress.estado} ${personAddress.pais} ${personAddress.cp}`                                      

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

                let addressString = `${personAddress.calle} ${personAddress.noint} ${personAddress.noext} ${personAddress.localidad} ${personAddress.municipio} ${personAddress.estado} ${personAddress.pais} ${personAddress.cp}`
                                
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
                                    image: me.qrCode ? me.qrCode : '',
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
                        text:  'EXPEDIENTE: ' + me.v_noExpediente,
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
                        text: 'LICENCIADO(A) EN DERECHO ' + contactoDSP + '\n' + me.printConjunt[0].uf_Puesto.toUpperCase() + ' DEL '+ nombreDSP + ' EN ' + me.printConjunt[0].uf_Distrito.toUpperCase(),
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
            var f = document.getElementById('iframepdfAR');
            var callback = function(url) { f.setAttribute('src',url); }

            if (pdfMake.vfs == undefined) {
                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                pdfMake.vfs = pdfFonts.vfs;
            }            

            doc.getDataUrl(callback, doc);                    
            me.Rprint = true
            me.framePDF = true; 
        },
        //***************************************************************************************************************************************** */
        //* Funciones de acción diversa
        //***************************************************************************************************************************************** */
        //? Función para formateo de fecha de ISO
        formatearfechahora: function(fecha){
            return moment(fecha).format('DD/MM/YYYY hh:mm:ss a')
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
    },  
}
</script>
 