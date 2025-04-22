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
      <v-flex >
          <v-toolbar flat color="white" class="pa-2">
              <v-toolbar-title class="font-weight-regular" >Agenda de seguimientos.</v-toolbar-title>
              
                  <v-divider class="mx-2" inset vertical></v-divider>
                  <v-tooltip bottom> 
                      <template v-slot:activator="{ on }"> 
                        <v-btn fab v-on="on"   small  color="success"  @click="$refs.calendar.prev()" >
                            <v-icon dark>
                              keyboard_arrow_left
                            </v-icon>
                        </v-btn>
                      </template>
                      <span>Anterior</span>
                  </v-tooltip>
                  <v-tooltip bottom> 
                      <template v-slot:activator="{ on }"> 
                          <v-btn fab v-on="on"   small   color="success" @click="$refs.calendar.next()"  >
                            <v-icon >
                              keyboard_arrow_right
                            </v-icon>
                          </v-btn>
                      </template>
                      <span>Siguiente</span>
                  </v-tooltip> 
                  <v-divider class="mx-2" inset vertical></v-divider>
                  <v-tooltip bottom> 
                      <template v-slot:activator="{ on }"> 
                          <v-btn outline v-on="on"   small  color="primary"  @click="today()" > 
                            HOY
                          </v-btn>
                      </template>
                      <span>Cargar al dia de hoy</span>
                  </v-tooltip> 

                  <v-menu bottom offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn  v-on="on"  fab small  class="primary"><v-icon>filter_list</v-icon></v-btn>
          
                    </template>
                    <v-list>
                      <v-list-tile v-for="(item, i) in statusseguimiento" :key="i" @click="listarStatusSeguimiento(item, i)">
                        <v-list-tile-action>
                          <v-icon   :color="item.color">brightness_1</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>{{ item.titulo }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu> 

                  <div class="justify-center layout px-0" > 
                      <a class="headline font-weight-light"> 
                      {{ formatearfecha(start) }}
                      </a> 
                  </div>
        
                   

               
                  <v-divider class="mx-2" inset vertical></v-divider>
                  
                  <v-text-field 
                        class="mx-1"  
                        hint="PREFIJO / #### - AÑO / DISTRITO" 
                        v-model="searchexpediente"  
                        label="Expediente"  >
                  </v-text-field>
                  <v-btn @click="buscarexpediente()"   tile large  icon>
                    <v-icon>search</v-icon>
                  </v-btn>
                  <v-divider class="mx-2" inset vertical></v-divider>
                  <v-select
                    class="mx-3"
                    :items="typeOptions"
                    v-model="type"  
                    small 
                    height="30" 
                  ></v-select>
 


                  
          </v-toolbar> 

          <v-card> 
              <v-container fluid> 
                  <v-layout row>
                      <v-flex shrink pa-1 >
                          <v-card elevation="0" >
                              
                              <v-card-text>
                              
                      
                            
                            
                              </v-card-text>
                          </v-card>
                      </v-flex>

                      
                      <v-flex grow pa-1>
                          <v-card elevation="0"> 
                              <v-card-text> 
                                  <v-card elevation="0" >
                                      <v-card-text class="px-0">

          

                                        <v-sheet height="650">
                                          <v-calendar
                                            ref="calendar" 
                                            locale="es"   
                                            v-model="start"
                                            :type="type" 
                                            color="primary">



                                            <template v-slot:day="{ date }">
                                              <template v-for="event in eventsMap[date]">
                                                <v-menu
                                                  :key="event.idS" 
                                                  full-width   
                                                  offset-x>
                                                  <template  v-slot:activator="{ on }">
                                                    <div
                                                      v-if="event.time"
                                                      v-ripple  
                                                      @click="open(event)"
                                                      :class="event.color1"
                                                      v-on="on"
                                                      v-html="event.expediente"> 
                                                      </div>
                                                      
                                                  </template> 
                                                  
                                                  <v-card
                                                    color="grey lighten-4"
                                                    min-width="500px"
                                                    flat>
                                                    <v-toolbar
                                                      :color="event.color1"
                                                      dark>
                                                      <v-btn icon>
                                                        <v-icon>info</v-icon>
                                                      </v-btn>
                                                      <v-toolbar-title v-html="event.expediente"> 
                                                      </v-toolbar-title>
                                                      <v-spacer></v-spacer> 
                                                      <v-btn icon>
                                                        <v-icon>close</v-icon>
                                                      </v-btn>
                                                    </v-toolbar>
                                                      <v-list two-line subheader>
                                                                <v-subheader class="title" inset>Información:</v-subheader>
                                                      
                                                                <v-list-tile  avatar   >
                                                                  <v-list-tile-avatar>
                                                                    <v-icon >info</v-icon>
                                                                  </v-list-tile-avatar>
                                                      
                                                                  <v-list-tile-content>
                                                                    <v-list-tile-title>{{ 'Requerido: '+event.nombreSolicitante }}</v-list-tile-title>
                                                                    <v-list-tile-sub-title>{{'Fecha y hora de la cita: '+ event.fechaCita}}</v-list-tile-sub-title>
                                                                  </v-list-tile-content>
                                                      
                                                                  
                                                                </v-list-tile>
                                                      
                                                                <v-divider inset></v-divider>
                                                      
                                                                 
                                                                <v-list-tile  avatar>
                                                                  <v-list-tile-avatar>
                                                                    <v-icon >check</v-icon>
                                                                  </v-list-tile-avatar> 
                                                                  <v-list-tile-content>
                                                                    <v-list-tile-title>
                                                                          {{'Estatus de pago: '+ event.statusPago}}
                                                                    </v-list-tile-title> 
                                                                     <v-list-tile-title>
                                                                          {{'Fecha de prorroga: '+ event.fechaProrroga}}
                                                                    </v-list-tile-title>
                                                                  </v-list-tile-content> 
                                                                </v-list-tile>
                                                                 
                                                                 <v-list-tile  avatar>
                                                                  <v-list-tile-avatar>
                                                                    <v-icon >attach_money</v-icon>
                                                                  </v-list-tile-avatar> 
                                                                  <v-list-tile-content>
                                                                    <v-list-tile-title>
                                                                          {{'Cantidad a pagar: $'+ event.cantidadAPagar}}
                                                                    </v-list-tile-title>
                                                                    <v-list-tile-title>
                                                                          {{'No parcialidad: '+ event.noParcialidad}}
                                                                    </v-list-tile-title>
                                                                    <v-list-tile-title>
                                                                          {{'Tipo pago: '+ event.tipoPago}}
                                                                    </v-list-tile-title> 
                                                                  </v-list-tile-content> 
                                                                </v-list-tile>
                                                                 <v-list-tile  avatar>
                                                                  <v-list-tile-avatar>
                                                                    <v-icon >user</v-icon>
                                                                  </v-list-tile-avatar> 
                                                                  <v-list-tile-content>
                                                                    <v-list-tile-title>
                                                                          {{'Facilitador: '+ event.uf_Nombre}}
                                                                    </v-list-tile-title>
                                                                     
                                                                  </v-list-tile-content> 
                                                                </v-list-tile>
                                                              </v-list> 
                                                      
                                                    <v-card-actions>
                                                      <v-btn
                                                        flat
                                                        color="secondary">
                                                        Cerrar
                                                      </v-btn>
                                                    </v-card-actions>
                                                  </v-card>

                                                </v-menu>
                                              
                                              </template>
                                            </template>


                                          <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
                                              <template v-for="event in eventsMap[date]">
                                              <!-- timed events -->  
                                                <v-menu
                                                  :key="event.idS" 
                                                  full-width   
                                                  offset-x>
                                                  <template  v-slot:activator="{ on }">
                                                    <div
                                                      v-if="event.time"
                                                      :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                                                      v-ripple
                                                      :class="event.color2"
                                                      v-on="on"
                                                      v-html="event.expediente"> 
                                                    </div>
                                                      
                                                  </template>
                                                  
                                                  
                                                  <v-card
                                                    color="grey lighten-4"
                                                    min-width="500px"
                                                    flat>
                                                    <v-toolbar
                                                      :color="event.color1"
                                                      dark>
                                                      <v-btn icon>
                                                        <v-icon>info</v-icon>
                                                      </v-btn>
                                                      <v-toolbar-title v-html="event.expediente"></v-toolbar-title>
                                                      <v-spacer></v-spacer> 
                                                      <v-btn icon>
                                                        <v-icon>close</v-icon>
                                                      </v-btn>
                                                    </v-toolbar>
                                              
                                                              <v-list two-line subheader>
                                                                <v-subheader class="title" inset>Información:</v-subheader>
                                                      
                                                                <v-list-tile  avatar   >
                                                                  <v-list-tile-avatar>
                                                                    <v-icon >info</v-icon>
                                                                  </v-list-tile-avatar>
                                                      
                                                                  <v-list-tile-content>
                                                                    <v-list-tile-title>{{ 'Requerido: '+event.nombreSolicitante }}</v-list-tile-title>
                                                                    <v-list-tile-sub-title>{{'Fecha y hora de la cita: '+ event.fechaCita}}</v-list-tile-sub-title>
                                                                  </v-list-tile-content>
                                                      
                                                                  
                                                                </v-list-tile>
                                                      
                                                                <v-divider inset></v-divider>
                                                      
                                                                 
                                                                <v-list-tile  avatar>
                                                                  <v-list-tile-avatar>
                                                                    <v-icon >check</v-icon>
                                                                  </v-list-tile-avatar> 
                                                                  <v-list-tile-content>
                                                                    <v-list-tile-title>
                                                                          {{'Estatus de pago: '+ event.statusPago}}
                                                                    </v-list-tile-title> 
                                                                     <v-list-tile-title>
                                                                          {{'Fecha de prorroga: '+ event.fechaProrroga}}
                                                                    </v-list-tile-title>
                                                                  </v-list-tile-content> 
                                                                </v-list-tile>
                                                                 
                                                                 <v-list-tile  avatar>
                                                                  <v-list-tile-avatar>
                                                                    <v-icon >attach_money</v-icon>
                                                                  </v-list-tile-avatar> 
                                                                  <v-list-tile-content>
                                                                    <v-list-tile-title>
                                                                          {{'Cantidad a pagar: $'+ event.cantidadAPagar}}
                                                                    </v-list-tile-title>
                                                                    <v-list-tile-title>
                                                                          {{'No parcialidad: '+ event.noParcialidad}}
                                                                    </v-list-tile-title>
                                                                    <v-list-tile-title>
                                                                          {{'Tipo pago: '+ event.tipoPago}}
                                                                    </v-list-tile-title> 
                                                                  </v-list-tile-content> 
                                                                </v-list-tile>
                                                                 <v-list-tile  avatar>
                                                                  <v-list-tile-avatar>
                                                                    <v-icon >user</v-icon>
                                                                  </v-list-tile-avatar> 
                                                                  <v-list-tile-content>
                                                                    <v-list-tile-title>
                                                                          {{'Facilitador: '+ event.uf_Nombre}}
                                                                    </v-list-tile-title>
                                                                     
                                                                  </v-list-tile-content> 
                                                                </v-list-tile>
                                                              </v-list> 
                                                      
                                                    
                                                    <v-card-actions>
                                                      <v-btn
                                                        flat
                                                        color="secondary">
                                                        Cerrar
                                                      </v-btn>
                                                    </v-card-actions>
                                                  </v-card>
                                                </v-menu> 
                                              </template>
                                          </template>


                                          
                                          </v-calendar> 
                                        </v-sheet>
                                      </v-card-text>
                                  </v-card>
                              </v-card-text>
                          </v-card>
                      </v-flex>
                  </v-layout>
                
              </v-container>
          </v-card>
  
      </v-flex> 
    </v-layout>   
</template>
   

<script>
  import axios from 'axios'  
  import moment from 'moment'
  import 'moment/locale/es';
  import { hostname } from 'os';
  import { error } from 'util';

 

  export default {
    data: () => ({
        type: 'month',  
        start:'', 
        typeOptions: [
          { text: 'Dia', value: 'day' }, 
          { text: 'Semana', value: 'week' },
          { text: 'Mes', value: 'month' }, 
        ],
        events: [],
        listaC:[],
        //************************************* */
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
        mask:'AAAA/####-####/AAAAAAAAAAAAAAA', 

        searchexpediente:'',




        statusseguimiento:[
          {color:'#795548',titulo:'Mostrar todos'},
          {color:'#C00100',titulo:'Pendiente'},
          {color:'#9C27B0',titulo:'No pagado'},
          {color:'#3F51B5',titulo:'Pagado'},
          {color:'#00ACC1',titulo:'Prorroga'},
          {color:'#4CAF50',titulo:'Anticipado'},
         
        ],

    }),
    created(){ 
      let me= this;
     
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
      me.listar();
      var currentDate = new Date();
      this.start= moment(new Date).format('YYYY-MM-DD');

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
      // convert the list of events into a map of lists keyed by date
    eventsMap () {   
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        return map
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
    methods: {
      listar(){
          let me = this; 
           me.events=[];
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header};
      
          var eventsarray=[];  
          me.$justiciarestaurativa.get('api/SeguimientoCumplimientoes/ListarTodosDistrito/'+ me.u_distrito, configuracion).then(function(response){ 
             
              eventsarray=response.data;
              eventsarray.map(function(x){ 
                  me.events.push({ 
                                fechaCita: moment(x.fecha).format('MMMM DD YYYY, h:mm:ss a'), 
                                date: moment(x.fecha).format('YYYY-MM-DD'), 
                                time: moment(x.fecha).format('hh:mm'), 
                                duration: '30', 
                                sesion: x.idSeguimientoCumplimiento,
                                idS: x.idSeguimientoCumplimiento,
                                acuerdoReparatorioId : x.acuerdoReparatorioId,
                                noParcialidad : x.noParcialidad,
                                fecha : x.fecha,
                                fechaProrroga : x.fechaProrroga,
                                cantidadAPagar : x.cantidadAPagar,
                                tipoPago : x.tipoPago,
                                objectoEspecie : x.objectoEspecie,
                                color1: me.consultarColor1(x.statusPago), 
                                color2: me.consultarColor2(x.statusPago), 
                                statusPago : x.statusPago, 
                                titulo : x.titulo,
                                dirigidoa : x.dirigidoa,
                                direccion : x.direccion,
                                solicitantes : x.solicitantes,
                                requeridos : x.requeridos,  
                                texto : x.texto, 
                                uf_Distrito : x.uf_Distrito,
                                uf_DirSubProc : x.uf_DirSubProc,
                                uf_Agencia : x.uf_Agencia,
                                uf_Modulo : x.uf_Modulo,
                                uf_Nombre : x.uf_Nombre,
                                uf_Puesto : x.uf_Puesto,

                                envioId : x.envioId,
                                nombreSolicitante : x.nombreSolicitante,
                                nombreRequerdio : x.nombreRequerdio,
                                delitos : x.delitos,
                                nuc : x.nuc,
                                expediente : x.noExpediente,
                                statusConclusion : x.statusConclusion,
                                statusCumplimiento : x.statusCumplimiento,
                                tipoPagoA : x.tipoPago,
                                metodoUtilizado : x.metodoUtilizado,
                                montoTotal : x.montoTotal,
                                objectoEspecieA : x.objectoEspecie,
                                noTotalParcialidades : x.noTotalParcialidades,
                                periodo : x.periodo,
                                fechaCelebracionAcuerdo : x.fechaCelebracionAcuerdo,
                                fechaLimiteCumplimiento : x.fechaLimiteCumplimiento,
                                ftatusRespuestaCoordinadorJuridico : x.statusRespuestaCoordinadorJuridico,
                                fespuestaCoordinadorJuridico : x.statusRespuestaCoordinadorJuridico,
                                fechaHoraRespuestaCoordinadorJuridico : x.fechaHoraRespuestaCoordinadorJuridico,
                                ftatusRespuestaAMP : x.statusRespuestaAMP,
                                fespuestaAMP : x.respuestaAMP,
                                fechaRespuestaAMP : x.fechaRespuestaAMP, 
                               });    
              }); 
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
      listarStatusSeguimiento(status){ 
         

          let me = this; 
          if (status.titulo =='Mostrar todos')
          {
            me.listar();
          }
          else{
            me.events=[];
            let header={"Authorization" : "Bearer " + this.$store.state.token};
            let configuracion= {headers : header}; 
            var eventsarray=[];  
            me.$justiciarestaurativa.get('api/SeguimientoCumplimientoes/ListarTodosDistritoStatus/'+ me.u_distrito + '/'+ status.titulo, configuracion).then(function(response){ 
             
              eventsarray=response.data;
              eventsarray.map(function(x){ 
                  me.events.push({ 
                                fechaCita: moment(x.fecha).format('MMMM Do YYYY, h:mm:ss a'), 
                                date: moment(x.fecha).format('YYYY-MM-DD'), 
                                time: moment(x.fecha).format('hh:mm'), 
                                duration: '30', 
                                sesion: x.idSeguimientoCumplimiento,
                                idS: x.idSeguimientoCumplimiento,
                                acuerdoReparatorioId : x.acuerdoReparatorioId,
                                noParcialidad : x.noParcialidad,
                                fecha : x.fecha,
                                fechaProrroga : x.fechaProrroga,
                                cantidadAPagar : x.cantidadAPagar,
                                tipoPago : x.tipoPago,
                                objectoEspecie : x.objectoEspecie,
                                color1: me.consultarColor1(x.statusPago), 
                                color2: me.consultarColor2(x.statusPago), 
                                statusPago : x.statusPago, 
                                titulo : x.titulo,
                                dirigidoa : x.dirigidoa,
                                direccion : x.direccion,
                                solicitantes : x.solicitantes,
                                requeridos : x.requeridos,  
                                texto : x.texto, 
                                uf_Distrito : x.uf_Distrito,
                                uf_DirSubProc : x.uf_DirSubProc,
                                uf_Agencia : x.uf_Agencia,
                                uf_Modulo : x.uf_Modulo,
                                uf_Nombre : x.uf_Nombre,
                                uf_Puesto : x.uf_Puesto,

                                envioId : x.envioId,
                                nombreSolicitante : x.nombreSolicitante,
                                nombreRequerdio : x.nombreRequerdio,
                                delitos : x.delitos,
                                nuc : x.nuc,
                                expediente : x.noExpediente,
                                statusConclusion : x.statusConclusion,
                                statusCumplimiento : x.statusCumplimiento,
                                tipoPagoA : x.tipoPago,
                                metodoUtilizado : x.metodoUtilizado,
                                montoTotal : x.montoTotal,
                                objectoEspecieA : x.objectoEspecie,
                                noTotalParcialidades : x.noTotalParcialidades,
                                periodo : x.periodo,
                                fechaCelebracionAcuerdo : x.fechaCelebracionAcuerdo,
                                fechaLimiteCumplimiento : x.fechaLimiteCumplimiento,
                                ftatusRespuestaCoordinadorJuridico : x.statusRespuestaCoordinadorJuridico,
                                fespuestaCoordinadorJuridico : x.statusRespuestaCoordinadorJuridico,
                                fechaHoraRespuestaCoordinadorJuridico : x.fechaHoraRespuestaCoordinadorJuridico,
                                ftatusRespuestaAMP : x.statusRespuestaAMP,
                                fespuestaAMP : x.respuestaAMP,
                                fechaRespuestaAMP : x.fechaRespuestaAMP, 
                               });

              }); 
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
          }
          
      },
      buscarexpediente(){ 
        let me= this;  
        me.events=[];
        let header={"Authorization" : "Bearer " + this.$store.state.token};
        let configuracion= {headers : header}; 
        var eventsarray=[]; 
        debugger
        var expedienteHex = me.hexa(me.searchexpediente); 
        me.$justiciarestaurativa.get('api/SeguimientoCumplimientoes/ListarTodosDistritoExpediente/'+ me.u_distrito + '/'+ expedienteHex, configuracion).then(function(response){ 
          
          eventsarray=response.data;
          eventsarray.map(function(x){ 
              me.events.push({ 
                            fechaCita: moment(x.fecha).format('MMMM Do YYYY, h:mm:ss a'), 
                            date: moment(x.fecha).format('YYYY-MM-DD'), 
                            time: moment(x.fecha).format('hh:mm'), 
                            duration: '30', 
                            sesion: x.idSeguimientoCumplimiento,
                            idS: x.idSeguimientoCumplimiento,
                            acuerdoReparatorioId : x.acuerdoReparatorioId,
                            noParcialidad : x.noParcialidad,
                            fecha : x.fecha,
                            fechaProrroga : x.fechaProrroga,
                            cantidadAPagar : x.cantidadAPagar,
                            tipoPago : x.tipoPago,
                            objectoEspecie : x.objectoEspecie,
                            color1: me.consultarColor1(x.statusPago), 
                            color2: me.consultarColor2(x.statusPago), 
                            statusPago : x.statusPago, 
                            titulo : x.titulo,
                            dirigidoa : x.dirigidoa,
                            direccion : x.direccion,
                            solicitantes : x.solicitantes,
                            requeridos : x.requeridos,  
                            texto : x.texto, 
                            uf_Distrito : x.uf_Distrito,
                            uf_DirSubProc : x.uf_DirSubProc,
                            uf_Agencia : x.uf_Agencia,
                            uf_Modulo : x.uf_Modulo,
                            uf_Nombre : x.uf_Nombre,
                            uf_Puesto : x.uf_Puesto,

                            envioId : x.envioId,
                            nombreSolicitante : x.nombreSolicitante,
                            nombreRequerdio : x.nombreRequerdio,
                            delitos : x.delitos,
                            nuc : x.nuc,
                            expediente : x.noExpediente,
                            statusConclusion : x.statusConclusion,
                            statusCumplimiento : x.statusCumplimiento,
                            tipoPagoA : x.tipoPago,
                            metodoUtilizado : x.metodoUtilizado,
                            montoTotal : x.montoTotal,
                            objectoEspecieA : x.objectoEspecie,
                            noTotalParcialidades : x.noTotalParcialidades,
                            periodo : x.periodo,
                            fechaCelebracionAcuerdo : x.fechaCelebracionAcuerdo,
                            fechaLimiteCumplimiento : x.fechaLimiteCumplimiento,
                            ftatusRespuestaCoordinadorJuridico : x.statusRespuestaCoordinadorJuridico,
                            fespuestaCoordinadorJuridico : x.statusRespuestaCoordinadorJuridico,
                            fechaHoraRespuestaCoordinadorJuridico : x.fechaHoraRespuestaCoordinadorJuridico,
                            ftatusRespuestaAMP : x.statusRespuestaAMP,
                            fespuestaAMP : x.respuestaAMP,
                            fechaRespuestaAMP : x.fechaRespuestaAMP, 
                            });

          }); 
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
      consultarColor1(status){
             
            switch(status){
                case 'Pendiente':
                  var statusPago='my-event1';
                  return statusPago;
                  break;
                case 'No pagado':
                  var statusPago='my-event2';
                  return statusPago;
                  break;
                case 'Pagado':
                  var statusPago='my-event3'; 
                  return statusPago;
                  break;
                case 'Prorroga':
                  var statusPago='my-event4'; 
                  return statusPago;
                  break;
                case 'Anticipado':
                  var statusPago='my-event5'; 
                  return statusPago;
                  break;
                   
            }
      },
      consultarColor2(status){
             
             switch(status){
                case 'Pendiente': 
                  var withtime ='with-time1';
                  return withtime ;
                  break;
                case 'No pagado': 
                  var withtime ='with-time2';
                  return withtime ;
                  break;
                case 'Pagado': 
                  var withtime ='with-time3';
                  return withtime ;
                  break;
                case 'Prorroga': 
                  var withtime ='with-time4';
                  return withtime ;
                  break;
                case 'Anticipado': 
                  var withtime ='with-time5';
                  return withtime ;
                  break;
                   
              }
      },  
      open (event) {
    
          let me = this; 
          this.listaC=[];
          let header={"Authorization" : "Bearer " + this.$store.state.token};
          let configuracion= {headers : header};
          var idseguimiento = event.sesion;
          var listaCitasarray=[];  
          me.$justiciarestaurativa.get('api/SeguimientoCumplimientoes/ListarTodosDistritoIdSeg/'+ me.u_distrito + '/'+ idseguimiento, configuracion).then(function(response){ 
             
              eventsarray=response.data
              eventsarray.map(function(x){ 
                  me.listaC.push({ 
                                fechaCita: moment(x.fecha).format('MMMM Do YYYY, h:mm:ss a'), 
                                date: moment(x.fecha).format('YYYY-MM-DD'), 
                                time: moment(x.fecha).format('hh:mm'), 
                                duration: '30', 
                                sesion: x.idSeguimientoCumplimiento,
                                idS: x.idSeguimientoCumplimiento,
                                acuerdoReparatorioId : x.acuerdoReparatorioId,
                                noParcialidad : x.noParcialidad,
                                fecha : x.fecha,
                                fechaProrroga : x.fechaProrroga,
                                cantidadAPagar : x.cantidadAPagar,
                                tipoPago : x.tipoPago,
                                objectoEspecie : x.objectoEspecie,
                                color1: me.consultarColor1(x.statusPago), 
                                color2: me.consultarColor2(x.statusPago), 
                                statusPago : x.statusPago, 
                                titulo : x.titulo,
                                dirigidoa : x.dirigidoa,
                                direccion : x.direccion,
                                solicitantes : x.solicitantes,
                                requeridos : x.requeridos,  
                                texto : x.texto, 
                                uf_Distrito : x.uf_Distrito,
                                uf_DirSubProc : x.uf_DirSubProc,
                                uf_Agencia : x.uf_Agencia,
                                uf_Modulo : x.uf_Modulo,
                                uf_Nombre : x.uf_Nombre,
                                uf_Puesto : x.uf_Puesto,

                                envioId : x.envioId,
                                nombreSolicitante : x.nombreSolicitante,
                                nombreRequerdio : x.nombreRequerdio,
                                delitos : x.delitos,
                                nuc : x.nuc,
                                expediente : x.noExpediente,
                                statusConclusion : x.statusConclusion,
                                statusCumplimiento : x.statusCumplimiento,
                                tipoPagoA : x.tipoPago,
                                metodoUtilizado : x.metodoUtilizado,
                                montoTotal : x.montoTotal,
                                objectoEspecieA : x.objectoEspecie,
                                noTotalParcialidades : x.noTotalParcialidades,
                                periodo : x.periodo,
                                fechaCelebracionAcuerdo : x.fechaCelebracionAcuerdo,
                                fechaLimiteCumplimiento : x.fechaLimiteCumplimiento,
                                ftatusRespuestaCoordinadorJuridico : x.statusRespuestaCoordinadorJuridico,
                                fespuestaCoordinadorJuridico : x.statusRespuestaCoordinadorJuridico,
                                fechaHoraRespuestaCoordinadorJuridico : x.fechaHoraRespuestaCoordinadorJuridico,
                                ftatusRespuestaAMP : x.statusRespuestaAMP,
                                fespuestaAMP : x.respuestaAMP,
                                fechaRespuestaAMP : x.fechaRespuestaAMP, 
                               });     
              }); 
          }, configuracion).catch(function(error){
              if (error.response.status==400){
                  me.$notify("No es un usuario válido", 'error')
              } else if (error.response.status==401){
                  me.$notify("Por favor inicie sesion para poder navegar en la aplicacion", 'error')
                  me.e401 = true,
                  me.showpage= false
              } else if (error.response.status==403){ 
                  me.$notify("No esta autorizado para ver esta pagina", 'error')
                  me.e403= true
                  me.showpage= false 
              } else if (error.response.status==404){
                  me.$notify("El recuso no ha sido encontrado", 'error')
              }else{
                  me.$notify('Error al intentar listar los registros!!!','error')  
              } 
          }); 
         
      },
      today(){
          var currentDate = new Date();
          this.start= moment(new Date).format('YYYY-MM-DD');
      },
      formatearfecha: function(fecha){
            return moment(fecha).format('MMMM , YYYY');
      },
      formatearfechaCita: function(fecha){
            return moment(fecha).format('MMMM , YYYY');
      },
    }
  }
</script>



<style scoped>
.my-event1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #C00100;
  color: #ffffff;
  border: 1px solid #C00100;
  width: 100%;
  font-size: 12px;
  padding: 12px;
  cursor: pointer;
  margin-bottom: 1px;
}
.with-time1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #C00100;
  color: #ffffff;
  border: 1px solid #C00100;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;



    position: absolute;
    right: 0px;
    margin-right: 0px;
  }
 
.my-event2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #9C27B0;
  color: #ffffff;
  border: 1px solid #9C27B0;
  width: 100%;
  font-size: 12px;
  padding: 12px;
  cursor: pointer;
  margin-bottom: 1px;
}
.with-time2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #9C27B0;
  color: #ffffff;
  border: 1px solid #9C27B0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;



    position: absolute;
    right: 0px;
    margin-right: 0px;
  }

.my-event3 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #3F51B5;
  color: #ffffff;
  border: 1px solid #3F51B5;
  width: 100%;
  font-size: 12px;
  padding: 12px;
  cursor: pointer;
  margin-bottom: 1px;
}
.with-time3 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #3F51B5;
  color: #ffffff;
  border: 1px solid #3F51B5;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;



    position: absolute;
    right: 0px;
    margin-right: 0px;
  }

.my-event4 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #00ACC1;
  color: #ffffff;
  border: 1px solid #00ACC1;
  width: 100%;
  font-size: 12px;
  padding: 12px;
  cursor: pointer;
  margin-bottom: 1px;
}
.with-time4 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #00ACC1;
  color: #ffffff;
  border: 1px solid #00ACC1;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;



    position: absolute;
    right: 0px;
    margin-right: 0px;
  }

.my-event5 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #4CAF50;
  color: #ffffff;
  border: 1px solid #4CAF50;
  width: 100%;
  font-size: 12px;
  padding: 12px;
  cursor: pointer;
  margin-bottom: 1px;
}
.with-time5 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #4CAF50;
  color: #ffffff;
  border: 1px solid #4CAF50;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;



    position: absolute;
    right: 0px;
    margin-right: 0px;
  }


</style>