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
            <v-toolbar-title class="font-weight-regular" >Informar status del expediente.</v-toolbar-title>
            
            <v-divider class="mx-2" inset vertical></v-divider>
            
            <v-spacer></v-spacer>
           
            <v-spacer></v-spacer>
            <v-flex xs12 sm6 md3> 
                <v-text-field class="font-weight-regular"
                            v-model="noExpediente" disabled     prepend-icon="folder"
                            filled
                        ></v-text-field>
            </v-flex>
            <v-tooltip bottom>
                    <template v-slot:activator="{ on }"> 
                        <v-btn class="mx-2" slot="activator" v-on="on" @click.native="cerrarexpediente" fab dark small color="primary">
                            <v-icon dark>close</v-icon>
                        </v-btn>
                    </template>
                    <span>Cerrar carpeta</span>
            </v-tooltip>
             
        </v-toolbar>



    <v-card> 

  <v-container grid-list-md>
 
    <v-layout v-if="statusInforme==false"  row px-3 wrap>
        <v-flex xl12 lg12 md12 sm12 xs12>
          <v-card elevation="0" > 
             
                        <v-card-text  class="px-0">    
                                <v-radio-group v-model="statusAR"    :mandatory="false">
                                    <v-radio label="Informar la no celebración de acuerdo reparatorio." color="success" value="No celebración de acuerdo reparatorio"></v-radio>
                                    <v-radio label="Informar acuerdo reparatorio" color="success" value="Celebración de acuerdo reparatorio"></v-radio>
                                    <v-radio label="Informar incumplimiento de acuerdo reparatorio" color="success" value="Incumplimiento de acuerdo reparatorio"></v-radio>
                                </v-radio-group>
                        <v-divider ></v-divider>

                        <v-tooltip bottom>
                                <template v-slot:activator="{ on }">  
                                    <v-btn slot="activator" v-on="on" @click.native="mostrarpdf"   absolute dark small fab bootom right color="primary"                                >
                                    <v-icon>remove_red_eye</v-icon>
                                    </v-btn>
                                </template>
                                <span>Vista previa</span>
                        </v-tooltip>
                        <br>
                   
                                <h3>Texo de libre edición:</h3> 
                             
                                <vue-editor   
                                    outline  height=320px;
                                    :editorToolbar="customToolbar" 
                                    v-model="v_textoAR"  style="max-height: 310px; overflow-y: scroll">
                                </vue-editor>
                                                         
                            
                        </v-card-text>
                   
                    </v-card>
                  
        </v-flex>
        
    </v-layout>
    <v-layout v-if="statusInforme==true"  row px-3 wrap>
        <v-flex xl12 lg12 md12 sm12 xs12>
             <v-card elevation="0" > 
             
                        <v-card-text  class="px-0">   
                            
                                <v-list two-line>
                                    <v-list-tile>
                                        <v-list-tile-action>
                                            <v-icon color="warning">start</v-icon>
                                        </v-list-tile-action>
                            
                                        <v-list-tile-content>
                                              <v-list-tile-sub-title>Status:</v-list-tile-sub-title>
                                            <v-list-tile-title>Ya fue informado el AMP de la {{ this.informacionStatus }}  del expediente {{ this.noExpediente}}</v-list-tile-title>
                                          
                                        </v-list-tile-content>
                            
                                        <v-list-tile-action>
                                            <v-btn @click="imprimir()" icon>
                                                <v-icon color="success">print</v-icon>
                                            </v-btn>
                                        </v-list-tile-action>

                                        
                                    </v-list-tile>
                        
                                    
                                    <v-divider inset></v-divider>
                        
                                    <v-list-tile >
                                        <v-list-tile-action>
                                            <v-icon color="warning">access_time</v-icon>
                                        </v-list-tile-action>
                            
                                        <v-list-tile-content>
                                            <v-list-tile-title>Fecha y hora en que se informo:</v-list-tile-title>
                                            <v-list-tile-sub-title> </v-list-tile-sub-title>
                                        </v-list-tile-content>
                                        <v-list-tile-action>
                                            <v-icon>check</v-icon>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                    <v-divider inset></v-divider>
                                    <v-list-tile >
                                        <v-list-tile-action>
                                            <v-icon color="warning">account_box</v-icon>
                                        </v-list-tile-action>
                            
                                        <v-list-tile-content> 
                                            <v-list-tile-sub-title> Usuarioa al que se le informo:</v-list-tile-sub-title>
                                            <v-list-tile-title>{{uqe_Nombre  }}</v-list-tile-title>
                                            <v-list-tile-title>{{uqe_Puesto }}</v-list-tile-title>
                                            <v-list-tile-title>{{uqe_Agencia }}</v-list-tile-title>
                                        </v-list-tile-content>
                                        <v-list-tile-action>
                                            <v-icon>check</v-icon>
                                        </v-list-tile-action>
                                    </v-list-tile>
                        
                                    
                        
                                    <v-divider inset></v-divider>

                                </v-list>
                  
        
                        </v-card-text>
                   
                    </v-card>
                    <v-divider ></v-divider>
         
       </v-flex> 
    </v-layout>
</v-container>

       
    </v-card> 

</v-flex>
         
          
 
    <v-dialog v-model="modal_SAR" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="primary">
            <v-toolbar-title>Documento.</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
               <v-btn  color=success text @click.native="guardar">
                    Guardar e imprimir</v-btn>
            
            <v-btn icon   @click="modal_SAR= false">
                <v-icon>close</v-icon>
            </v-btn>
            </v-toolbar-items>
        </v-toolbar>
            <v-card-text>
                <iframe id="iframepdfAR" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no"  ></iframe>
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
 
  import moment from 'moment'
  import 'moment/locale/es';
  import alertify from 'alertifyjs';
  import { VueEditor } from "vue2-editor";
  
  import DualListBox from "dual-listbox-vue";
  import "dual-listbox-vue/dist/dual-listbox.css";

  export default {
    components: { 
         
        n401,
        n403,
        "vue2-editor": VueEditor ,
        DualListBox,
       
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
            //********************************************************** */ 
             envioId:'',
            expedienteId:'', 
            noDerivacion:'',
            fechaExpediente:'',
            fechaHoraSuceso:'',
            nuc:'',
            StatusGeneral:'',
            informacionStatus:'',
            EspontaneoNoEspontaneo:'',
            primeraVezSubsecuente:'',
            NoSolicitantes:'',
            uqe_Agencia:'',
            uqe_Modulo:'',
            uqe_Nombre:'',
            uqe_Puesto:'',
            reseñaBreve:'',
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
            modal_SAR:false,
            logo1 :'',
            logo2:'',
            direccionAgencia:'',
            telefonosAgencia:'', 

            
            v_requeridos:[], 
            v_requeridosL:'', 
          
      
            v_solicitantes:[], 
            v_solicitantesL:'', 

            statusAR:'',
            v_textoAR:'',
            v_textoFijo:'',
            fechahoradoc:'',
            noExpediente:'',
            asunto:'',

            statusInforme:false,
            editIndex:-1,

        

           
           
        };
    },
 
    created () { 
            let me = this    
           
            me.expedienteId= me.$store.state.idExpediente;
          
            if (me.expedienteId== null)
            {
                    me.$alert('Notificación', 'Aun no ha abierto ninguna expediente por favor ingrese al menu Mis expedientes y luego en Mi lista de expedientes asignados y  ahi abra la expediente que usted elija!. En este momento sera redireccionado al menu correspondiente.', 
                    function(){ 

                            me.$router.push('./jr-misexpedientes')
                    })
            }
            else{
                    me.$notify('Expediente abierto correctamente !!!','success') 
                 
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
                    me.envioId= me.$store.state.idEnvio; 
                    me.noExpediente= me.$store.state.noExpediente;
                    //*********************************************** */ 
                 
                    me.listarLogo();
                    me.informacionagencia();
                    me.informacionExpediente();
                    me.listarSolicitantesRequeridos("Solicitante");
                    me.listarSolicitantesRequeridos("Requerido"); 
 
                  
                  
                    
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
      return this.$store.state.drawer
    }
    },
    watch: {
        
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
    
      
        guardar(){
        
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};

          
            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información.', 
                function(){  

                    
                  me.$justiciarestaurativa.post('api/RegistroNotificacions/Crear',{   
                                'expedienteId': me.expedienteId,
                                'asunto':me.asunto,
                                'texto':me.v_textoFijo, 
                                'solicitates': me.v_solicitantesL,
                                'reuqeridos': me.v_requeridosL,
                                'uf_Distrito': me.u_distrito,
                                'uf_DirSubProc': me.u_dirSubPro,
                                'uf_Agencia': me.u_agencia,
                                'uf_Modulo': me.u_modulo,
                                'uf_Nombre': me.u_nombre,
                                'uf_Puesto': me.u_puesto,
                              
                                //************************************ */
                            }, configuracion).then(function(response){   
                                
                              me.$justiciarestaurativa.put('api/Expedientes/InformacionStatus',{ 
                                        'idExpediente': me.expedienteId, 
                                        'informacionStatus': me.statusAR,  
                                    }, configuracion).then(function(response){ 
                                            var dd = me.crearPdf();
                                            var pdfMake = require('pdfmake/build/pdfmake.js')
                                            var htmlToPdfmake = require("html-to-pdfmake");

                                            if (pdfMake.vfs == undefined){
                                                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                                                pdfMake.vfs = pdfFonts.vfs; 
                                            } 
                                            var doc = pdfMake.createPdf(dd).print(); 
                                            me.modal_SAR=false;
                      
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
                 function(){
                        alertify.warning('Verifica la información')
                    }
                ).set('labels', {ok:'Guardar', cancel:'Cancelar'});
            
        },
      
        informacionagencia(){
              let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            me.$conf.get('api/Agencias/Listarporid'+ me.u_idagencia, configuracion).then(function(response){
                me.direccionAgencia=response.data.direccion;
                me.telefonosAgencia= response.data.telefono;
            }).catch(function(error){
                me.$notify('Error al intentar leer la informacion de agencia!!!','error')   
            });
        }, 
        informacionExpediente(){
 
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
             
            me.$justiciarestaurativa.get('api/Envios/InformacionExpediente/'+ me.expedienteId + "/" + me.envioId , configuracion).then(function(response){ 
                me.noDerivacion = response.data.noDerivacion;
                me.fechaExpediente= response.data.fechaRegistroExpediente ;
                me.fechaHoraSuceso=response.data.fechaHoraSuceso;
                me.nuc=response.data.nuc;
                me.StatusGeneral=response.data.statusGeneral; 
                me.informacionStatus= response.data.informacionStatus;
                  if (me.informacionStatus==null)
                    {
                        me.statusInforme=false;
                    }
                    else
                    {
                        me.informacionNotificacion();
                         me.statusInforme=true;
                         
                    }
                me.EspontaneoNoEspontaneo=response.data.espontaneoNoEspontaneo;
                me.primeraVezSubsecuente=response.data.primeraVezSubsecuente;
                me.NoSolicitantes=response.data.noSolicitantes;
                me.uqe_Agencia=response.data.uqe_Agencia;
                me.uqe_Modulo=response.data.uqe_Modulo;
                me.uqe_Nombre=response.data.uqe_Nombre;
                me.uqe_Puesto=response.data.uqe_Puesto;
                me.reseñaBreve=response.data.reseñaBreve;
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
        informacionNotificacion(){
          
              let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
             
            me.$justiciarestaurativa.get('api/RegistroNotificacions/ListarRegistros/'+ me.expedienteId, configuracion).then(function(response){ 
                
                me.asunto=response.data.asunto;
                me.v_textoFijo=response.data.texto;
                me.fechahoradoc=response.data.fechaHora;
                me.solicitatntesL=response.data.solicitantes;
                me.requeridosL=response.data.requeridos;  
                me.u_distrito=response.data.uf_Distrito;
                me.u_dirSubPro=response.data.uf_DirSubProc; 
                me.u_agencia=response.data.uf_Agencia;
                me.u_modulo=response.data.uf_Modulo;
                me.u_nombre=response.data.uf_Nombre; 
                me.u_puesto=response.data.uf_Puesto;
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
       
        cerrarexpediente () { 
            this.$store.state.idExpediente= null; 
            this.$store.state.idEnvio = null;
            this.$store.state.noExpediente =null;
            this.$store.state.tipoModulo=null;
            this.$router.push('./misexpedientes')  
        }, 
        imprimir(){
            let me= this; 
            me.editIndex=1;
            var dd = me.crearPdf();
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

            if (pdfMake.vfs == undefined){
                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                pdfMake.vfs = pdfFonts.vfs; 
            } 
            var doc = pdfMake.createPdf(dd).print(); 

        },      
        cargartexto(){  
         if (this.statusAR=="No celebración de acuerdo reparatorio")
         {
            this.asunto="Se informa la no celebracion de acuerdo reparatorio"
            this.v_textoFijo="<p>Con fundamento en lo dispuesto por los artículos 1°, 4° fracción I, 7° fracción VI, 32 fracción I de la Ley Nacional de Mecanismos "+ 
                            "Alternativos de Solución de Controversias en materia Penal; 11 fracción XI de la Ley Orgánica del Ministerio Público del estado; 1°, 20"+
                            " fracción VI inciso b), 45 fracción II y 55 del Reglamento de la Ley Orgánica del Ministerio Público del estado de Hidalgo, me permito "+
                            "informarle lo siguiente:</p><br><br><p>En atención a su derivación, dentro de la carpeta de investigación con número único de caso (NUC) "+
                            "<strong>"+ this.nuc +"</strong>, hago&nbsp;de su conocimiento que se dio inicio en este Centro de Justicia Restaurativa Penal al expediente"+
                            "<strong>"+ this.noExpediente +" </strong>solicitado por la (el) C. <strong>"+  this.v_solicitantesL +"</strong> donde fue requerida (o) <strong>"+ this.v_requeridosL +"</strong>;<strong>"+
                            " </strong>dentro del cual no fue deseo de los intervinientes celebrar acuerdo alguno que pudiese dirimir la controversia planteada, aún y cuando"+
                            " por parte de este Centro se les hizo de su conocimiento de los beneficios, alcances y ventajas con los que cuentan los mecanismos, razón por la"+
                            " cual se tiene a bien cerrar el expediente en comento.</p><br><br>" + this.v_textoAR + "<br><br><p>Lo anterior en seguimiento de la derivación" + 
                            " realizada y para los fines legales a que haya lugar. </p>"

         }
         else if (this.statusAR=="Celebración de acuerdo reparatorio")
         {
            this.asunto= "Se informa acuerdo reparatorio"
            this.v_textoFijo="<p>Con fundamento en lo dispuesto por los artículos 18, 33, 34, 35 y 37&nbsp;de la Ley Nacional de Mecanismos Alternativos de Solución de"+
                               " Controversias en materia Penal; 11 fracción XI de la Ley Orgánica del Ministerio Público del estado; 1°, 20 fracción VI inciso b), 45 "+
                               "fracción II y 55 del Reglamento de la Ley Orgánica del Ministerio Público del estado de Hidalgo, me permito informarle lo siguiente:</p>"+
                               "<br><br><p>En atención a su derivación, dentro de la carpeta de investigación con número único de caso (NUC): <strong>"+ this.nuc +"</strong>,"+
                               " hago de su conocimiento que se dio inicio en este Centro de Justicia Restaurativa Penal al expediente <strong>"+ this.noExpediente +"</strong>"+
                               "<strong>; </strong>dentro del cual fue celebrado el correspondiente acuerdo reparatorio de cumplimiento <span>(inmediato o diferido)</span>"+
                               " solicitado por el C. <strong>"+  this.v_solicitantesL +"</strong>, donde fue requerido el C. <strong>"+  this.v_requeridosL +"</strong></p> <p><br><br>" + 
                               this.v_textoAR + "<br><br><p>Razón por la  cual remito a Usted copia certificada del acuerdo reparatorio para su aprobación, dando" +
                               " cabal cumplimiento a lo estipulado en el artículo 190 del Código Nacional de Procedimientos Penales.</p><br><br><br><p>Lo anterior en" +
                               " seguimiento de la derivación realizada y para los fines legales a que haya lugar.</p>"
         }
          else if (this.statusAR=="Incumplimiento de acuerdo reparatorio")
         {
            this.asunto= "Se informa incumplimiento de acuerdo reparatorio"
            this.v_textoFijo="<p>Con fundamento en lo dispuesto por los artículos 1°, 4° fracción I, 32 fracción V, 33, 34, 35 párrafo segundo y 37 de la Ley Nacional de "+
                             "Mecanismos Alternativos de Solución de Controversias en materia Penal; 11 fracción XI de la Ley Orgánica del Ministerio Público del estado;"+
                             " 1°, 20 fracción VI inciso b), 45 fracción II y 55 del Reglamento de la Ley Orgánica del Ministerio Público del estado de Hidalgo, me permito"+
                             " informarle lo siguiente:"+ 
                            "<br><br><p>En alcance al oficio <strong>"+ this.noExpediente +"</strong>, emitido  en relación a la carpeta de investigación con número único"+
                            " de caso (NUC): <strong>"+ this.nuc +"</strong>, por el que se dio inicio en este Centro de Justicia Restaurativa Penal al expediente al rubro,"+
                            " dentro del cual fue celebrado el correspondiente acuerdo reparatorio por la (el) C. <strong>"+  this.v_solicitantesL +"</strong>, en calidad de "+
                            "solicitante y donde fue requerida (o) el C. <strong>"+  this.v_requeridosL +"</strong>; hago de su conocimiento <strong>que no se dio cumplimiento a las"+
                            " obligaciones estipuladas en dicho acuerdo.</strong></p><br><br><br>"+ this.v_textoAR + "<br><br><p>Lo anterior en seguimiento de la derivación realizada"+
                            " y para los fines legales a que haya lugar. </p>"
                             
         }
 
        },
    
        listarsolicitantes(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/ListarSolicitantes/'+ me.envioId, configuracion).then(function(response){ 
                    me.v_solicitantes=response.data;  
            }).catch(function(error){
                me.$notify(error.message,'error')    
            });     
        },
        listarSolicitantesRequeridos(SolReq)
        {
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};   
            me.$justiciarestaurativa.get('api/SolicitanteRequeridoes/ListarSolicitantesRequeridos/'+ me.envioId+'/'+SolReq, configuracion).then(function(response){ 
                    if(SolReq=="Requerido")
                        me.v_requeridos=response.data;
                    else
                       me.v_solicitantes=response.data;     
            }).catch(function(error){
                me.$notify(error.message,'error')    
            });     
        }, 
        crearPdf() {
                
            var pdfMake = require('pdfmake/build/pdfmake.js');
            var htmlToPdfmake = require("html-to-pdfmake"); 
        
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
                 if(this.editIndex==-1){
                    var dia = moment().format("DD");
                    var mes = moment().format('MMMM');
                    var año= moment().format("YYYY");
                    var hr= moment().format('h:mm:ss a'); 
                    var pdf_distrito=this.u_distrito;
                    var pdf_dirsubproc = this.u_dirSubPro;
                    var pdf_agencia =this.u_agencia;
                    var pdf_usuario=this.u_nombre;
                    var pdf_puesto=this.u_puesto;
                    var pdf_modulo=this.u_modulo;  
                    var fecha = dia + " de " + mes  + " del " + año + ", " + hr 
                 }
                 else{
                    var dia = moment(this.fechahoradoc).format("DD");
                    var mes = moment(this.fechahoradoc).format('MMMM');
                    var año= moment(this.fechahoradoc).format("YYYY");
                    var hr= moment(this.fechahoradoc).format('h:mm:ss a'); 
                    var pdf_distrito=this.u_distrito;
                    var pdf_dirsubproc = this.u_dirSubPro;
                    var pdf_agencia =this.u_agencia;
                    var pdf_usuario=this.u_nombre;
                    var pdf_puesto=this.u_puesto;
                    var pdf_modulo=this.u_modulo;  
                    var fecha = dia + " de " + mes  + " del " + año + ", " + hr 

                 }
        
         
          
            //***************************************************************************** */
            var html_texto  = htmlToPdfmake( 
                this.v_textoFijo
            );
           
          
             //***************************************************************************** */ 
            var dd = {
                pageSize: 'LEGAL',
                pageOrientation: 'portrait',
                pageMargins: [ 30, 150, 30, 100 ],
                footer: function (currentPage, pageCount) {
                    return {
                        columns: [
                            { 
                                image: logo4,
                                width: 612, 
                                absolutePosition: {x: 0, y: 0},
                                
                            },
                            {
                                text: diragencia + "\n" + telagencia  + ' ' +  'www.hidalgo.gob.mx',
                                style: 'footertext', 
                                margin: [30, 20, 0, 0],
                                absolutePosition: {x: 0, y: 30},
            
                            },
                            {
                                text: "Page " + currentPage.toString() + ' de ' + pageCount, alignment: 'right', style: 'footertext',  margin: [0, 20, 30, 0] 
                            }
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
                            //    width: 70,  
                            //    absolutePosition: {x: 490, y: 30},
                            //}, 
                           
                            
                        ]
                
                },
            
                content: [
                   {
                        text: pdf_dirsubproc,
                        style: 'headertext',
                        absolutePosition: {x: 35, y: 95},
                    }, 
                    {
                        text: pdf_agencia,
                        style: 'headertext',
                        absolutePosition: {x: 35, y: 150},
                    }, 
                    {
                        text:  'Número de expediente: ' + this.noExpediente,
                        style: 'nuc'
                    },
                    '\n',
                    {
                        text:  'NUC: ' + this.nuc,
                        style: 'nuc'
                    },
                    '\n',
                    {
                        text: 'Asunto: ' +this.asunto,
                        style: 'nuc'
                    },
                    '\n',
                     {
                        text:   pdf_distrito + ' , Hidalgo a '+ fecha,
                        style: 'fecha'
                    }, 
                    
                      '\n\n',
                    {
                        text: this.uqe_Nombre + '\n' + this.uqe_Puesto + ' Adscrito a ' + '\n' + this.uqe_Agencia + ' , Hidalgo.',
                        style: 'ampo'
                    }, 
                 
                     '\n\n',
                    {
                        text: html_texto,
                        style: 'texto'
                    },   
                            
                    '\n\n\n\n\n',
                    {
                            text:  'Atentamente' + '\n\n' + pdf_usuario + '\n' + pdf_puesto  + '\n'  +  'Adscrito al ' + pdf_agencia,
                            style: 'ampo'
                    },
             
                     
           
                        
                
                    
                ],
            
                
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
                        fontSize: 17,
                        bold: true,
                        alignment: 'center',
                    
                    },
                    subtitulo:{
                        fontSize: 14,
                        bold: true, 
                    },
                    
                    footertext:{
                        fontSize: 10,
                        color: 'white'
                    },
                    texto:{
                        fontSize: 12,  
                        alignment: 'justify',
                    },
                    textobold:{
                        fontSize: 12,  
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
                        alignment: 'left',
                    }, 
                    
                
                }
    
            }
                
                return dd;  
                
        }, 
        mostrarpdf(){ 
          
            //************************************************************** */
            this.v_solicitantesL="";
            for(var i=0;i<this.v_solicitantes.length;i++){
                if (this.v_solicitantesL=="")
                {
                    this.v_solicitantesL=   this.v_solicitantes[i].nombreCompleto;
                }
                else{
                    this.v_solicitantesL=  this.v_solicitantesL + ", " + this.v_solicitantes[i].nombreCompleto;
                } 
            }
            //************************************************************** */ 
            this.v_requeridosL="";
            for(var i=0;i<this.v_requeridos.length;i++){
                if (this.v_requeridosL=="")
                {
                    this.v_requeridosL=   this.v_requeridos[i].nombreCompleto;
                }
                else{
                    this.v_requeridosL= this.v_requeridosL + ", " + this.v_requeridos[i].nombreCompleto;
                }
                
            }
           this.cargartexto();  
            //************************************************************** */
            var dd = this.crearPdf();
            var pdfMake = require('pdfmake/build/pdfmake.js')
            var htmlToPdfmake = require("html-to-pdfmake");

            if (pdfMake.vfs == undefined){
                var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                pdfMake.vfs = pdfFonts.vfs;

                
            }
                var doc = pdfMake.createPdf(dd);
                var f = document.getElementById('iframepdfAR'); 
                var callback = function(url) { f.setAttribute('src',url); }
                doc.getDataUrl(callback, doc);
                this.modal_SAR=true;
                  
                
        },
        
    }
       
       
    } 
</script>
 
 