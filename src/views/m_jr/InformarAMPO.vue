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
                <v-toolbar-title class="font-weight-regular" >Informe al AMPO.</v-toolbar-title>
                
                <v-divider class="mx-2" inset vertical></v-divider>
                
                <v-spacer></v-spacer>
            
                <v-spacer></v-spacer>
                <v-flex xs12 sm6 md3> 
                    <v-text-field class="font-weight-regular"
                                v-model="v_noExpediente" disabled     prepend-icon="folder"
                                filled
                            ></v-text-field>
                </v-flex>
                <v-tooltip bottom>
                        <template v-slot:activator="{ on }"> 
                            <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="cerrarexpediente" fab dark small color="primary">
                                <v-icon class="mt-1" dark>close</v-icon>
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
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">  
                                            <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="mostrarpdf" absolute dark small fab bootom right color="primary">
                                                <v-icon class="mt-1">remove_red_eye</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Vista previa</span>
                                    </v-tooltip>
                                    <br>
                                    <v-switch
                                        v-model="VoBo"
                                        label="¿Deseas cambiar el nombre de la persona que firma el documento?"
                                        color="success"
                                        hide-details
                                    />
                                    <br>
                                    <v-text-field 
                                        v-show="VoBo"
                                        name="noVoBo" 
                                        v-model="nomVoBo"  
                                        label="Nombre de la persona que firmara:"    
                                        v-validate="requeridoTF"                        
                                        :error-messages="errors.collect('noVoBo')">
                                    </v-text-field>    
                                    <v-text-field 
                                        v-show="VoBo"
                                        name="puestopersona" 
                                        v-model="puestoVoBo"  
                                        label="Cargo de la persona:"   
                                        v-validate="requeridoTF"                       
                                        :error-messages="errors.collect('puestopersona')">
                                    </v-text-field>   
                                    
                                    <v-text-field 
                                        name="número de oficio" 
                                        v-model="oficioAMPO"  
                                        label="Número de oficio:" 
                                        v-validate="'required'"  
                                        :error-messages="errors.collect('número de oficio')">
                                    </v-text-field>  

                                    <h3>Texo de libre edición:</h3> 
                                    
                                    <vue-editor   
                                        name="texto libre"
                                        v-validate="'required'"
                                        outline  height=320px;
                                        :editorToolbar="customToolbar" 
                                        v-model="v_textoLibre"  style="max-height: 310px; overflow-y: scroll"
                                        :error-messages="errors.collect('texto libre')">
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
                                                <v-list-tile-sub-title>Informa:</v-list-tile-sub-title>
                                                <v-list-tile-title> {{ this.v_statusAMPO}}</v-list-tile-title>
                                            </v-list-tile-content>
                                
                                            <v-list-tile-action>
                                                <v-btn @click="nuevaFirmaAMPO()" icon>
                                                    <v-icon color="success">print</v-icon>
                                                </v-btn>
                                            </v-list-tile-action>
                                        </v-list-tile>
                            
                                        <v-divider inset></v-divider>
                            
                                        <v-list-tile >
                                            <v-list-tile-action>
                                                <v-icon color="warning">info</v-icon>
                                            </v-list-tile-action>
                                
                                            <v-list-tile-content>
                                                <v-list-tile-sub-title>Número de oficio:</v-list-tile-sub-title>
                                                <v-list-tile-title> {{ this.oficioAMPO}}</v-list-tile-title> 
                                            </v-list-tile-content>

                                            <v-list-tile-action>
                                                <v-icon>check</v-icon>
                                            </v-list-tile-action>

                                        </v-list-tile> 
                                        <v-divider inset></v-divider>
                            
                                        <v-list-tile >
                                            <v-list-tile-action>
                                                <v-icon color="warning">info</v-icon>
                                            </v-list-tile-action>
                
                                            <v-list-tile-content>                                                
                                                <v-list-tile-sub-title>Respuesta:</v-list-tile-sub-title>
                                                <v-list-tile-title v-html="this.v_textoLibre"></v-list-tile-title>
                                            </v-list-tile-content>

                                            <v-list-tile-action>
                                                <v-icon>check</v-icon>
                                            </v-list-tile-action>

                                        </v-list-tile> 
                                    </v-list>
                                </v-card-text>
                            </v-card>
                            <v-divider ></v-divider>
                        </v-flex> 
                    </v-layout>


                    <v-dialog v-model="modal_INF" fullscreen hide-overlay transition="dialog-bottom-transition">
                        <v-card>
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Documento.</v-toolbar-title>
                                <v-spacer></v-spacer>

                                <v-toolbar-items>
                                    <v-btn v-if="vistaPreviaTF" color=success text @click.native="guardar()">Guardar</v-btn> 
                                    <v-btn icon   @click="modal_INF= false">
                                        <v-icon>close</v-icon>
                                    </v-btn>
                                </v-toolbar-items>
                            </v-toolbar>
                            <v-card-text>
                                <iframe id="iframepdfINF" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no"  ></iframe>
                            </v-card-text>
                        </v-card>
                    </v-dialog>


                </v-container>
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
    import n401 from '../../components/m_jr/401'
    import n403 from '../../components/m_jr/403' 
    import moment from 'moment'
    import 'moment/locale/es'
    import alertify from 'alertifyjs'
    import { VueEditor } from "vue2-editor"  
    import DualListBox from "dual-listbox-vue"
    import "dual-listbox-vue/dist/dual-listbox.css"
    import { generarQRCodeBase64 } from './crearQR'

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
            statusInforme:false,     
            modal_INF:false,
            //*************** */
            v_nuc:'',
            v_noExpediente:'',
            v_expedienteId:'',
            v_envioId:'',
            v_AutoridadqueDeriva:'',
            v_uqe_Distrito:'',
            v_uqe_DirSubProc:'',
            v_uqe_Agencia:'',
            v_uqe_Modulo:'',
            v_uqe_Nombre:'',
            v_uqe_Puesto: '',
            u_nombre: '',
            v_statusAMPO:'',
            v_textoLibre:'',
            //*************** */
            direccionAgencia:'',
            telefonosAgencia:'',
            contactoDSP:'',
            nombreDSP:'',
            oficioAMPO:"",
            VoBo: false,
            nomVoBo:null,
            puestoVoBo: null,
            VoBopdf: false,
            firma: '',
            requeridoTF:'',
            texto: 'Vista Previa',
            qrCode: '',
            docRemision: 'Remisión',
            vistaPreviaTF: true,                   
        }
    }, 
    created () { 
            let me = this    
           
            me.expedienteId= me.$store.state.idExpediente;
                                 
            if (me.expedienteId== null) {
                me.$alert('Notificación', 'Aun no ha abierto ninguna expediente por favor ingrese al menu Mis expedientes y luego en Mi lista de expedientes asignados y  ahi abra la expediente que usted elija!. En este momento sera redireccionado al menu correspondiente.', 
                    function(){                       
                        me.$router.push('./jr-expedientesaceptados')                       
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
                me.v_expedienteId = me.$store.state.idExpediente; 
                me.v_envioId= me.$store.state.idEnvio; 
                me.v_noExpediente= me.$store.state.noExpediente;
                                
                me.informacionRegistro();
                me.listarLogo();
                me.informacionagencia();  
                me.comprobarConclusion();                                               
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
        VoBo(val){
            if (val == false) {
                this.nomVoBo = '';
                this.puestoVoBo = ''; 
                this.requeridoTF = '';                
            }
            else{
                this.requeridoTF = 'required';
            }
        },
        qrCode(val) {
            let me = this

            if (val != '') {                
                if (me.docRemision == 'Registro de informe al AMPO' || me.docRemision == 'Reimpresión de registro de informe al AMPO') {
                    var dd = me.crearPdf();
                    var pdfMake = require('pdfmake/build/pdfmake.js')
                    var htmlToPdfmake = require("html-to-pdfmake");

                    if (pdfMake.vfs == undefined){
                        var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                        pdfMake.vfs = pdfFonts.pdfMake.vfs;                                
                    }

                    var doc = pdfMake.createPdf(dd);
                    var f = document.getElementById('iframepdfINF'); 
                    var callback = function(url) { f.setAttribute('src',url); }
                    doc.getDataUrl(callback, doc);
                    me.modal_INF=true;     
                }
            }
        }
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
        comprobarConclusion(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};  
            
            me.$justiciarestaurativa.get('api/RegistroConclusions/ListarRegistros/'+ me.v_envioId, configuracion).then(function(response){

                var respuesta = 0
                respuesta = response.data.ner;

                if(respuesta ==1)
                {
                    me.$alert('Notificación', 'El expediente no cuenta con un registro de conclusión ',
                        function(){  
                                me.$router.push('./registroconclusion') 
                            }, 
                        ).set('labels', {ok:'Ok'});
                }

            }).catch(function(error){
                me.$notify('Error al intentar leer la informacion de agencia!!!','error')   
            });
        },  
        guardar(){
            let me=this; 
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            me.vistaPreviaTF = false
            me.$confirm('Esperando confirmación', 'Estas seguro de  que deseas guardar información.', 
                function(){   
                    
                  me.$justiciarestaurativa.put('api/Envios/StatusAMPO',{  
                                    'idEnvio': me.v_envioId, 
                                    'statusAMPO': "Contestado",  
                                    'infoAMPO':  me.v_textoLibre,
                                    'oficioAMPO': me.oficioAMPO,
                                    'StatusGeneral':'Concluido',
                                    'firmaInfoAMPO': me.nomVoBo == null? me.u_nombre: me.nomVoBo,
                                    'puestoFirmaAMPO': me.puestoVoBo == null? me.u_puesto: me.puestoVoBo
                                }, configuracion).then(function(response){ 
                                    var dd = me.crearPdf();
                                    var pdfMake = require('pdfmake/build/pdfmake.js')
                                    var htmlToPdfmake = require("html-to-pdfmake");

                                    if (pdfMake.vfs == undefined){
                                    var pdfFonts = require('pdfmake/build/vfs_fonts.js')
                                    pdfMake.vfs = pdfFonts.pdfMake.vfs; 
                                    } 
                                    var doc = pdfMake.createPdf(dd).print(); 
                                   
                                    me.modal_INF=false;  
                                    me.oficioAMPO = "";
                                    me.v_textoLibre="";
                                    me.informacionRegistro(); 
                                   

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
            me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia, configuracion).then(function(response){
                me.direccionAgencia=response.data.direccion;
                me.telefonosAgencia= response.data.telefono;
                me.contactoDSP=response.data.contacotDirSub;
                me.nombreDSP=response.data.nombreDirSub;
            }).catch(function(error){
                me.$notify('Error al intentar leer la informacion de agencia!!!','error')   
            });
        },  
        informacionRegistro(){
         
            let me=this;
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header};
             
            me.$justiciarestaurativa.get('api/Envios/InformacionStatusAMPO/ '+ me.v_expedienteId+ '/' + me.v_envioId, configuracion).then(function(response){ 
                  
           
                    me.v_nuc= response.data.nuc;
                    me.v_noExpediente	= response.data.noExpediente; 
                    me.v_AutoridadqueDeriva = response.data.autoridadqueDeriva;
                    me.v_uqe_Distrito =response.data.uqe_Distrito;
                    me.v_uqe_DirSubProc= response.data.uqe_DirSubProc;
                    me.v_uqe_Agencia =response.data.uqe_Agencia;
                    me.v_uqe_Modulo = response.data.uqe_Modulo;
                    me.v_uqe_Nombre = response.data.uqe_Nombre;
                    me.v_uqe_Puesto = response.data.uqe_Puesto; 
                    me.v_statusAMPO=response.data.statusAMPO;
                    me.v_textoLibre=response.data.informaAMPO;
                    me.oficioAMPO= response.data.oficioAMPO;
                    
                if (response.data.statusAMPO !== 'No contestado')
                { 
                    me.statusInforme= true;                   
                }
                else
                {
                    me.statusInforme= false;
                }
                if (response.data.firmaInfoAMPO !== null && response.data.puestoFirmaAMPO !== null) {
                    me.nomVoBo = response.data.firmaInfoAMPO;
                    me.puestoFirmaAMPO = response.data.puestoFirmaAMPO;

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
        nuevaFirmaAMPO(){
         
         let me=this;
         let header={"Authorization" : "Bearer " + this.$store.state.token};
         let configuracion= {headers : header};
          
         me.$justiciarestaurativa.get('api/Envios/InformacionFirmaAMPO/ '+ me.v_envioId, configuracion).then(function(response){ 
               me.firma = response.data;         
                me.nomVoBo = response.data.firmaInfoAMPO;
                me.puestoVoBo = response.data.puestoFirmaAMPO;
            if (me.nomVoBo !== null && me.puestoVoBo !== null)
             {
               me.VoBo = true; 
             }
                me.imprimir();
             
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
        imprimir(){
            let me = this

            me.qrCode = ''

            me.docRemision = 'Reimpresión de registro de informe al AMPO'

            let fechaQR = new Date()

            me.vistaPreviaTF = false

            me.generarQR(me.docRemision, me.v_nuc, me.u_nombre, fechaQR, me.expedienteId)
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
            var contactoDSP = this.contactoDSP;
            var nombreDSP= this.nombreDSP;                        
            var dia = moment().format("DD"); 
            var mes = moment().format('MMMM'); 
            var año= moment().format("YYYY");  
            var hr= moment().format('h:mm a'); 

            var pdf_distrito=this.u_distrito;
            var pdf_dirsubproc = this.u_dirSubPro;
            var pdf_agencia =this.u_agencia;
            var pdf_usuario=this.u_nombre;
            var pdf_puesto=this.u_puesto;
            var pdf_modulo=this.u_modulo;  
            var fecha = dia + " de " + mes + " del " + año                           
            var html_texto  = htmlToPdfmake( 
                this.v_textoLibre
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
                                text: diragencia + "\n" + telagencia  + ' ' +  'www.hidalgo.gob.mx',
                                style: 'footertext', 
                                margin: [312,12,72,0],
                                alignment:'right',
                                absolutePosition: {x: 0, y: 30},
            
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
                content: [
                     {
                        text: pdf_dirsubproc+"\n"+pdf_agencia,
                        style: 'headertext',
                        absolutePosition: {x: 85, y: 95},
                    }, 
                    {
                        text:  'Número de oficio: ' + this.oficioAMPO, 
                        style: 'nuc'
                    },
                    '\n',
                    {
                        text:  'Número de expediente: ' + this.v_noExpediente, 
                        style: 'nuc'
                    },
                    '\n',
                      {
                        text:  'NUC: ' + this.v_nuc, 
                        style: 'nuc'
                    },
                    '\n',
                    {
                        text:  'Asunto: El que se informa', 
                        style: 'nuc'
                    },
                    '\n',
                    {
                        text:   pdf_distrito + ' , Hidalgo a '+ fecha,
                        style: 'fecha'
                    }, 
                    
                    '\n\n\n',
                    {
                        
                        text: this.v_uqe_Nombre + '\n' + this.v_uqe_Puesto+ '\n' + 'Presente.', 
                        style: 'DePara'
                    }, 
                    '\n\n',
                    {
                        text:  'Con fundamento en lo dispuesto por el artículo 17 párrafo III y V de la constitución Política ' + 
                               'de los Estados Unidos Mexicanos; 187, 188 y 189 Código Nacional de Procedimientos Penales; 1°,2°,3° ' + 
                               'fracción X, 4°,5°,6°,7° fracción VI, 10, 33, 34, 36, y 40, de la Ley Nacional de Mecanismos Alternativos' + 
                               'de Solución de Controverisas en Materia Penal; 11 fracción XI de la Ley Orgánica del Ministerio ' +
                               'Público vigente en el Estado y 1°, 8° inciso b) fracción I, inciso I fracción II, 20 VI inciso b) , ' + 
                               '38 inciso A), 40, 45 fraccion II y 55 del reglamento de la Ley Orgánica del Ministerio Público del '+ 
                               'Estado de Hidalgo; me permito informarle lo siguiente:',
                        style: 'texto',
                    },  
                    '\n\n', 
                    {
                        text: html_texto,
                        style: 'texto'
                    },  
                     '\n\n',
                    {
                        text:  'Lo anterior en seguimiento de la derivación realizada y para los fines legales a que haya lugar.',
                        style: 'texto',
                    },    
                               
                    '\n\n\n',
                    this.VoBo == true?{
                       
                       text:  'Atentamente \n\n\n\n\n' + this.nomVoBo + '\n' + this.puestoVoBo,
                       style: 'ampo'
                           
                   }
                    :{
                       
                       text:  'Atentamente \n\n\n\n\n' + pdf_usuario + '\n' + pdf_puesto,
                       style: 'ampo'
                           
                   }
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
                        alignment: 'left',
                    },
                    cargo:{
                        fontSize: 11, 
                        regular: true,
                        alignment: 'left',
                    },
                
                }
    
            }
                
                return dd;      
        }, 
        mostrarpdf()
        { 
            let me = this;

            if(me.v_textoLibre == null || me.v_textoLibre == '') {
                 alert('No puedes guardar el registro sin el cuerpo del documento, redacta su contenido, por favor');
             } else {
                me.$validator
                    .validate()
                    .then((result) => {
                        if (result) {

                            me.qrCode = ''

                            me.docRemision = 'Registro de informe al AMPO'

                            let fechaQR = new Date()

                            me.vistaPreviaTF = true

                            me.generarQR(me.docRemision,me.v_nuc,me.u_nombre,fechaQR,me.expedienteId)                            
                        }
                    });    
             }
            
        },          
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
    }       
} 
</script>