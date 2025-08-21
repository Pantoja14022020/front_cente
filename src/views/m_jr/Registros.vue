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
            <v-toolbar-title class="font-weight-regular" >Registros</v-toolbar-title>            
            <v-divider class="mx-2" inset vertical></v-divider>            
            <v-spacer></v-spacer>        
            <v-flex xs12 sm6 md3> 
                <v-text-field class="font-weight-regular"
                    v-model="v_noExpediente" 
                    disabled     
                    prepend-icon="folder"
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
            <v-tooltip bottom>
                <template v-slot:activator="{ on }"> 
                    <v-btn class="mx-2 py-2" slot="activator" v-on="on" @click.native="agregar()" fab dark small color="success">
                        <v-icon class="mt-1" dark>add</v-icon>
                    </v-btn>
                </template>
                <span>Agregar registro</span>
            </v-tooltip>              
        </v-toolbar>
        <v-data-table
            :headers="headers"
            :items="registros"
            :search="search"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            >
            <template slot="items" class="white" slot-scope="props">
                <td>{{ props.item.tipo }}</td>
                <td>{{ props.item.quienPorRegistro }}</td>
                <td>{{ formatearfechahora(props.item.fechasis) }}</td>
                <td class="justify-center layout px-0">
                    <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon
                        class="mr-2 mt-2"
                        v-on="on"
                        color="warning"
                        @click="imprimir(props.item)"
                        >
                        print
                        </v-icon>
                    </template>
                    <span>Imprimir registro</span>
                    </v-tooltip>
                </td>
            </template>
            <template slot="no-data">
                <v-btn color="primary"  @click="listar" >Resetear</v-btn>
            </template>
        </v-data-table>
        <v-dialog v-model="modalAdd" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Registros.</v-toolbar-title>
                    <v-spacer />
                    <v-toolbar-items>
                    <v-btn color="success" text @click="esperarQR()">VISTA PREVIA</v-btn>
                    <v-btn icon @click="closeModal()">
                        <v-icon>close</v-icon>
                    </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-flex mx-5>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout row wrap>
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-text-field
                                    name="tipo de registro"
                                    v-model="tipo"
                                    v-validate="'required'"
                                    label="Tipo de registro:"
                                    :error-messages="errors.collect('tipo de registro')"
                                    />
                                </v-flex>
                                <v-flex class="espaciado" xs12 sm12 md6 lg6>
                                    <v-text-field
                                    name="detalles"
                                    v-model="quienPor"
                                    label="Detalles simples:"
                                    />
                                </v-flex>                                
                                <v-flex class="espaciado" xs12 sm12 md12 lg612>
                                    <vue-editor
                                    name="texto registro"
                                    v-validate="'required'"
                                    :editorToolbar="customToolbar"
                                    v-model="textolibre"
                                    :error-messages="errors.collect('texto registro')"
                                    />
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-divider/>
                </v-flex>
            </v-card>
        </v-dialog>
    </v-flex>
    <v-dialog v-model="modal_Bitacora" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="primary">
                <v-toolbar-title>Documento.</v-toolbar-title>
                <v-spacer />
                <v-toolbar-items>
                <v-btn color="success" text @click.native="guardarImprimirRegistro">
                    {{ btntitle }}
                </v-btn>
                <v-btn icon @click="modal_Bitacora = false">
                    <v-icon>close</v-icon>
                </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
                <iframe id="iframepdf1" type="application/pdf" width="100%" height="835" frameborder="0" scrolling="no"/>
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
   import n401 from '../../components/m_jr/401'
   import n403 from '../../components/m_jr/403'  
   import moment from 'moment'
   import 'moment/locale/es';
   import alertify from 'alertifyjs';
   import { VueEditor } from "vue2-editor";   
   import DualListBox from "dual-listbox-vue";
   import "dual-listbox-vue/dist/dual-listbox.css";
   import QRCode from "qrcode";
   import { generarQRCodeBase64 } from './crearQR'; 
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
                { text: "Tipo de registro", value: "tipo" },
                { text: "Mas detalles", value: "QuienPorRegistro" },
                { text: "Fecha", value: "nombre" },
                { text: "Opciones", value: "opciones", sortable: false },
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
             v_uqe_Puesto:'',
             v_statusAMPO:'',
             v_textoLibre: '',
             u_nombre: '',
             //*************** */
             direccionAgencia:'',
             telefonosAgencia:'',
             contactoDSP:'',
             nombreDSP:'',
             noOficioAMPO:'',
             //-----------------
             modalAdd: false,
             search: "",
             rowsPerPageItems: [10, 20, 30, 40, 50],
             pagination: {
                rowsPerPage: 20,
             },
             tipo: "",
             quienPor:"",
             textolibre: "",
             modal_Bitacora: false,
             registros:[],
             texto: 'hola',
             qrCode: '',
             vl_nombre:"",                      
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
    created () 
    {
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

        if (me.expedienteId== null)
        {
        me.$alert('Notificación', 'Aun no ha abierto ninguna expediente por favor ingrese al menu Mis expedientes y luego en Mi lista de expedientes asignados y  ahi abra la expediente que usted elija!. En este momento sera redireccionado al menu correspondiente.', 
        function(){  
        
                me.$router.push('./jr-expedientesaceptados') 
        
        })
        }
        else
        {
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
        me.u_subproc = me.$store.state.usuario.subProc;
        me.u_email=me.$store.state.usuario.email;

        //*********************************************** */
        me.v_expedienteId = me.$store.state.idExpediente; 
        me.v_envioId= me.$store.state.idEnvio; 
        me.v_noExpediente= me.$store.state.noExpediente;
        
        //*********************************************** */ 
        me.listarLogo();
        me.listar();
        me.informacionagencia();
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
    computed: 
    {
        btntitle() {
            return this.editedIndex === -1 ? "Registro" : "Guardar e imprimir";
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
     watch: 
     {
         
     },
     methods:
     { 
        //API para el listado de logos en el Pdf
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
        informacionagencia(){
            let me=this;
            me.$conf.get('api/Agencias/Listarporid/'+ me.u_idagencia).then(function(response){
                me.direccionAgencia=response.data.direccion;
                me.telefonosAgencia= response.data.telefono;
            }).catch(function(error){
                me.$notify('Error al intentar leer la informacion de agencia!!!','error')
            });
        },
        //listado de los registros, se agrego un nuevo controlador para seccionar su propio espacio a registros
        listar(){
             let me=this; 
             let header={"Authorization" : "Bearer " + this.$store.state.token};
             let configuracion= {headers : header};  
             //Los expedientes son de todo el expediente, por eso solo lista conm respecto del id del envio
             me.$justiciarestaurativa.get('api/Registros/ListarRegistros/'+ me.v_envioId, configuracion).then(function(response){
                 
                me.registros = response.data;

             }).catch(function(error){
                 me.$notify('Error al intentar leer la informacion de agencia!!!','error')   
             });
         },            
        //Funcion para activar los modals para dar de alta un registro
        agregar() {
            let me=this; 

            this.modalAdd = true;
            this.editedIndex = -1;
        },        
        esperarQR()
        {
            let me=this;
            if(me.textolibre == null || me.textolibre == '')
            {
                alert('No puedes guardar el registro sin el cuerpo del documento, redacta su contenido, por favor');
            }
            else
            { 
                this.$validator.validate().then((result) => 
                {
                    if (result) 
                    {
                        me.qrCode = ''

                        me.docRemision = `Registro para expediente ${me.v_noExpediente}`

                        let fechaQR = new Date()

                        me.vistaPreviaTF = true

                        me.generarQR(me.docRemision, '', me.u_nombre, fechaQR, me.v_expedienteId)

                        //Un segundo de espera para que tenga valor el QR
                        setTimeout(() => {
                            me.mostrarpdf_Bitacora();
                        }, 500);
                    }
                });
            }
        },
        //Contrario a la de arriba, cierra el modal y limpia los coomponentes
        closeModal()
        {
            let me=this; 

            this.modalAdd = false;
            me.tipo = '';
            me.quienPor = '';
            me.textolibre = '';
        },
        formatearfechahora: function (fecha) {
            return moment(fecha).format("DD/MM/YYYY hh:mm:ss a");
        },
        //Cierre de expediente
        cerrarexpediente () 
        { 
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
        //A partir de aqui funciones para la crecion del PDF
        mostrarpdf_Bitacora() 
        {
            
            var dd = this.crearPdf_Bitacora();
            var pdfMake = require("pdfmake/build/pdfmake.js");
            var htmlToPdfmake = require("html-to-pdfmake");
            if (pdfMake.vfs == undefined) {
                var pdfFonts = require("pdfmake/build/vfs_fonts.js");
                pdfMake.vfs = pdfFonts.vfs;
            }
            var doc = pdfMake.createPdf(dd);
            var f = document.getElementById("iframepdf1");
            var callback = function (url) {
                f.setAttribute("src", url);
            };
            doc.getDataUrl(callback, doc);
            this.modal_Bitacora = true;
        },
        imprimir(item) 
        {
            let me = this;
            me.tipo = item.tipo;
            me.numerooficio = item.numerooficio;
            me.textolibre = item.descripcion;
            me.vl_fechasys = item.fechasis;
            me.vl_distrito = item.distrito;
            me.vl_dirSubProc = item.dirsubproc;
            me.vl_agencia = item.agencia;
            me.vl_nombre = item.usuario;
            me.vl_puesto = item.puesto;
            me.tipo = item.tipo;
            me.editedIndex = 1;
            me.qrCode = ''

            me.docRemision = `Reimpresión de registro para expediente ${me.v_noExpediente}`

            let fechaQR = new Date()

            me.vistaPreviaTF = false

            me.generarQR(me.docRemision, '', me.vl_nombre, fechaQR, me.v_expedienteId)

            //Un segundo de espera para que tenga valor el QR
            setTimeout(() => {
                me.guardarImprimirRegistro();
            }, 1000);
            
        },
        //Cuerpo del PDF
        crearPdf_Bitacora() {
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
            if (this.editedIndex == -1) {
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

            var dd = {
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
                    margin: [312,12,72,0],
                                alignment:'right',        
                    },
                    me.vistaPreviaTF == false ? 
                    {
                        image: me.qrCode,
                        width: 80, // Ajusta el ancho según tu diseño
                        height: 80, // Ajusta la altura según tu diseño
                        absolutePosition: { x: 5, y: -80 }, // Ajusta las coordenadas según tu diseño

                    }
                    : "",
                ];


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
                    text: "Número de expediente: " + exp,
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
                pdfMake.vfs = pdfFonts.vfs;
            }
            var doc = pdfMake.createPdf(dd).print();
            me.closeModal();
        } 
        else 
        {
            me.vistaPreviaTF = false
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
                    pdfMake.vfs = pdfFonts.vfs;
                    }
                    var doc = pdfMake.createPdf(dd).print();

                    me.$notify("¡La información se guardo correctamente!","success");
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
                        "No esta autorizado para ver esta página",
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
         async generarQR(tipodo,nuc,nombrefirma,fechadoc,id) {            
             let me = this; 
            
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