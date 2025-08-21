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
                    <v-toolbar-title class="font-weight-regular" >Gestión de seguimientos.</v-toolbar-title>
                   
                    <v-divider class="mx-2" inset vertical></v-divider> 
                    
                    <v-spacer></v-spacer>
                    
                    <v-btn  @click="filtrar()" fab small  class="mb-2 primary"><v-icon>filter_list</v-icon></v-btn>
                   

            
                    
                </v-toolbar>
                

                               <v-card>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout elevation="0" row wrap>
           

             <v-flex xs4>
              <v-card elevation="0" >
                 <v-card-title >
                    <v-icon  class="mx-3 ">format_list_numbered</v-icon>
                    <div class="subheading">Resumen</div>
                  </v-card-title >
                   <v-divider  color="cyan"  light></v-divider>
                    <v-data-table
                        :headers="headers2"
                        hide-actions
                        :items="gruposeguimientos" >
                
                        <template slot="items" class="white" slot-scope="props">
                            
                            <td>{{ props.item.statusPago }}</td> 
                            <td>{{ props.item.sumaTotal }}</td>  
                            
                        
                        </template>
                        
                    </v-data-table> 
              </v-card>
            </v-flex>

             <v-flex xs4>
              <v-card elevation="0">
                  <v-card-title >
                      <v-icon  class="mx-3 ">attach_money</v-icon>
                      <div class="subheading">Totales</div>
                  </v-card-title >
                   <v-divider color="cyan" light></v-divider> 
                      <div>
                        <div color="grey" class="headline">$ {{ totaltotal=(calcularTotal).toFixed(2)}}</div>
                         <span color="grey">Total del periodo</span>
                        <div color="grey" class="headline">$ {{ totalfaltante=(calcularFaltante).toFixed(2)}} </div>
                         <span color="grey">Total faltante</span>
                        <div color="grey" class="headline">{{  (( (totaltotal-  totalfaltante)/ totaltotal)*100).toFixed(2) }} %</div>
                         <span color="grey">Porcentaje pagado</span>
                           <v-divider light></v-divider>
                        <div color="grey" class="display-2">$ {{ (totaltotal-  totalfaltante).toFixed(2)}}</div>
                        <span color="grey">Total pagado en el periodo</span>
                         <v-divider light></v-divider>
                        
                        
                      </div> 
               
              </v-card>
            </v-flex>


            <v-flex xs4>
              <v-card  elevation="0"  >
                  <v-card-title >
                      <v-icon  class="mx-3 ">bar_chart</v-icon>
                      <div class="subheading">Gráfica</div>
                  </v-card-title >
                   <v-divider color="cyan" light></v-divider> 
               
                 
                         <canvas  id="chart" height="200px"> </canvas>  
                  
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card>
            <v-toolbar flat color="white"> 
                <v-toolbar-title class="font-weight-regular" >Total de registros del periodo.</v-toolbar-title>
                   
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
                 <v-btn  @click="download()" fab small  class="mb-2 primary"><v-icon>cloud_download</v-icon></v-btn>
                  
            </v-toolbar>
                 
            <v-data-table
                :headers="headers"
                :items="seguimientos"
                :search="search" 
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                return-object  >
                
                <template slot="items" class="white" slot-scope="props">
                    
                    <td>{{ props.item.noExpediente }}</td> 
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
                    <td>
                                            <template v-if="props.item.statusPago=='Pendiente'">
                                                <v-icon
                                                color="default" 
                                                >
                                                remove
                                                </v-icon>
                                            </template>
                                            <template v-if="props.item.statusPago=='Pagado'">
                                                <v-icon
                                                color="success"
                                                @click="activarDesactivarMostrar(2,props.item)"
                                                >
                                                check_circle
                                                </v-icon>
                                            </template> 
                                            <template v-if="props.item.statusPago=='Anticipado'">
                                                <v-icon
                                                color="success"
                                                @click="activarDesactivarMostrar(2,props.item)"
                                                >
                                                check_circle
                                                </v-icon>
                                            </template> 
                                            <template v-if="props.item.statusPago=='No pagado'">
                                                <v-icon
                                                color="error"
                                                @click="activarDesactivarMostrar(2,props.item)"
                                                >
                                                cancel
                                                </v-icon>
                                            </template>
                                                <template v-if="props.item.statusPago=='Prorroga'">
                                                <v-icon
                                                color="warning"
                                                @click="activarDesactivarMostrar(2,props.item)"
                                                >
                                                timelapse
                                                </v-icon>
                                            </template> 
                    </td>
                  
                </template>
                 
            </v-data-table> 
            </v-card>
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

                                  <v-autocomplete name="Status de conclusión"
                                                    :items="statusConclusiones"
                                                    v-model="statusConclusion" 
                                                    label="Status de conclusión:"   
                                    ></v-autocomplete>
                                
                
                </v-card-text> 
                    <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click.native="filtros=false" >Cancelar</v-btn>
                            <v-btn @click.native="listarSeguimientos()" class="success" >Consultar</v-btn>
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
    import Chart from 'chart.js'
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
                    { text: 'Expediente', value: 'noExpediente' },
                    { text: 'No parcialidad', value: 'noParcialidad' }, 
                    { text: 'Fecha', value: 'fecha' },
                    { text: 'Prorroga', value: 'fechaProrroga' }, 
                    { text: 'Cantidad', value: 'cantidadAPagar' },
                    { text: 'Tipo de pago', value: 'tipoPago' },
                    { text: 'Objeto especie', value: 'objectoEspecie' }, 
                    { text: 'Status', value: 'statusPago' },     
                                                
                ],
                 headers2: [ 
                    { text: 'Stauts de pago', value: 'statusPago' },
                    { text: 'Total', value: 'sumaTotal' }, 
                    
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
                 
                seguimientos:[],
                gruposeguimientos:[],
                //*************** */
              
                
                filtros:false,


                v_menu1:false,
                v_fechaInicial:'',
                v_fechaI:'',

                v_menu2:false,
                v_fechaFinal:'',
                v_fechaF:'',
                contador:0,
               
                 


                status:[],
                totales:[], 
                totaltotal:'0.00',
                totalfaltante:'0.00',
                porcentale:'0.00',

                statusConclusiones:['Diferido', 'Inmediato'],
                statusConclusion:'Diferido',
           
            }
        }, 
        watch: {  
        }, 
        computed:{
            calcularTotal:function(){
                let me= this;
                var resultado=0.0;
                for(var i=0;i<me.gruposeguimientos.length;i++){
                    resultado=resultado+(me.gruposeguimientos[i].sumaTotal);
                    me.totaltotal = resultado;
                
                }
                return resultado;
            },
            calcularFaltante:function(){
                let me= this;
                var resultado=0.0;
                for(var i=0;i<me.gruposeguimientos.length;i++){
                    if(me.gruposeguimientos[i].statusPago != 'Pagado' )
                    {
                        resultado=resultado+(me.gruposeguimientos[i].sumaTotal);
                        me.totalfaltante = resultado;
                    }
                   
                
                }
                return resultado;
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

            //*********************************************** */ 
            me.v_fechaI= moment(new Date()).format("YYYY-MM-DD");
            me.v_fechaF=  moment(new Date()).format("YYYY-MM-DD");
           

            me.grafica();
    
    
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
            listarSeguimientos(){
                
                let me = this; 
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};


                axios.all([ 
                me.$justiciarestaurativa.get('api/SeguimientoCumplimientoes/ListarSeguimientoDistrito/'+ me.u_distrito+ '/'+ me.v_fechaI +" 00:00:00"+'/'+me.v_fechaF+" 23:59:59" +'/'+ me.statusConclusion, configuracion), 
                me.$justiciarestaurativa.get('api/SeguimientoCumplimientoes/ListarSeguimientoDistritoGrupo/'+ me.u_distrito + '/'+ me.v_fechaI +" 00:00:00"+'/'+me.v_fechaF+" 23:59:59"+'/'+ me.statusConclusion, configuracion)
                ]).then(responseArr => {
                    me.seguimientos = responseArr[0].data;
                    me.gruposeguimientos =responseArr[1].data;
                    me.filtros=false;
                    me.contador = responseArr[0].data.length; 
                    me.grafica();
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
            download : function() {
                const data = XLSX.utils.json_to_sheet(this.seguimientos)
                const wb = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(wb, data, 'data')
                XLSX.writeFile(wb,'lista.xlsx')
            },
            formatearfecha: function(fecha){
                  return moment(fecha).format('DD/MM/YYYY')
            },
            formatearfechahora: function(fecha){
                  return moment(fecha).format('DD/MM/YYYY hh:mm A')
            },
            
            filtrar(){
                let me=this;
                me.filtros =true;

            },
            grafica(){
                debugger
                let me = this;
                let lbl=''; 
                me.status = [];
                me.totales =[]; 
                
                me.gruposeguimientos.map(function(x){  
                    me.status.push(x.statusPago);
                    me.totales.push(x.sumaTotal);  
                }); 


                var ctx = document.getElementById('chart').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels:me.status,
                        datasets: [{
                            label: 'Total $',
                            data: me.totales,
                            backgroundColor: [
                                'rgba(202,242,112, 1)',
                                'rgba(49,84,104, 1)',
                                'rgba(223,223,223, 1)',  
                                'rgba(1,146,117, 1)',
                                 
                                 
                            ],
                            borderColor: [
                                'rgba(202,242,112, 1)',
                                'rgba(49,84,104, 1)',
                                'rgba(223,223,223, 1)',  
                                'rgba(1,146,117, 1)',
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Estadística general de Acuerdos'
                        },
                        legend:{
                            display:false, 
                        },
                        tooltips: {
                            enabled: true,
                            mode: 'single',
                            callbacks: {   
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });

    
     
            
        
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

 